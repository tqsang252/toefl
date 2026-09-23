/**
 * ====================================================================
 * VERCEL SERVERLESS FUNCTION — UNIVERSAL AI PROXY (MULTI-KEY ROTATION)
 * File: api/ai-proxy.js
 *
 * Tính năng nổi bật:
 * 1. Hỗ trợ mảng nhiều API Keys (VITE_GEMINI_API_KEY, VITE_OPENROUTER_API_KEY)
 *    theo định dạng mảng JSON: ["key1", "key2", "key3"] hoặc phân tách bằng dấu phẩy
 * 2. Chọn ngẫu nhiên (random shuffle) các key trong mảng để cân bằng tải và tránh rate limit
 * 3. Thử trước với mảng Gemini: nếu mảng có > 3 keys thì chỉ thử tối đa 3 lần với 3 key ngẫu nhiên khác nhau
 * 4. Nếu toàn bộ lượt thử Gemini thất bại -> Chuyển sang mảng OpenRouter dự phòng (thử tối đa 3 lần)
 * ====================================================================
 */

const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-flash-latest'
];

const OPENROUTER_MODELS = [
  'google/gemini-2.0-flash-001',
  'google/gemini-flash-1.5',
  'deepseek/deepseek-chat',
  'openai/gpt-4o-mini'
];

const DEFAULT_SYSTEM_INSTRUCTION =
  'You are an elite ETS TOEFL iBT 2026 test developer and psychometrician. ' +
  'Your task is to produce strictly valid, raw JSON tests matching the requested schema ' +
  'with 100% fidelity to ETS difficulty, structure, and quality standards (CEFR C1/C2 academic register). ' +
  'NEVER truncate, omit, abbreviate, or use placeholders. ' +
  'Output strictly raw valid JSON only without markdown code blocks, preamble, or outside commentary.';

/**
 * Phân tích chuỗi biến môi trường thành mảng các API Key hợp lệ
 * Hỗ trợ:
 * - JSON Array: ["key1", "key2", "key3"]
 * - Chuỗi phân tách bằng dấu phẩy / chấm phẩy / xuống dòng: key1, key2, key3
 * - Key đơn lẻ: key1
 */
function parseApiKeys(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return Array.from(new Set(raw.map(k => String(k).trim()).filter(Boolean)));
  }

  const str = String(raw).trim();
  if (!str) return [];

  // 1. Nếu là định dạng mảng JSON [ "key1", "key2" ]
  if (str.startsWith('[') && str.endsWith(']')) {
    try {
      const parsed = JSON.parse(str);
      if (Array.isArray(parsed)) {
        return Array.from(new Set(parsed.map(k => String(k).trim()).filter(Boolean)));
      }
    } catch {
      // Nếu parse JSON lỗi thì chuyển sang fallback split
    }
  }

  // 2. Tách theo dấu phẩy, chấm phẩy hoặc xuống dòng
  const items = str
    .split(/[\n,;]+/)
    .map(k => k.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean);

  return Array.from(new Set(items));
}

/**
 * Xáo trộn ngẫu nhiên một mảng (Fisher-Yates shuffle)
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Rút gọn hiển thị API Key trong log để bảo mật
 */
function maskKey(key) {
  if (!key || key.length < 8) return '***';
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
}

export default async function handler(req, res) {
  // ── CORS Headers ──────────────────────────────────────────────────
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // ── Đọc request body ──────────────────────────────────────────────
  const {
    prompt,
    parts,
    systemInstruction,
    skillType,
    temperature,
    maxOutputTokens: customMaxTokens,
    responseType = 'json'
  } = req.body || {};

  // Hỗ trợ cả text prompt hoặc mảng parts
  let effectivePrompt = prompt;
  if (!effectivePrompt && parts) {
    if (typeof parts === 'string') {
      effectivePrompt = parts;
    } else if (Array.isArray(parts)) {
      effectivePrompt = parts.map(p => (typeof p === 'string' ? p : p.text || '')).join('\n');
    }
  }

  if (!effectivePrompt || !effectivePrompt.trim()) {
    return res.status(400).json({ error: 'Thiếu nội dung yêu cầu (prompt/parts).' });
  }

  const effectiveSystemInstruction = systemInstruction || (skillType ? DEFAULT_SYSTEM_INSTRUCTION : '');

  // Xác định tokens và temperature phù hợp
  let effectiveMaxTokens = customMaxTokens;
  if (!effectiveMaxTokens) {
    if (skillType === 'full') effectiveMaxTokens = 16384;
    else if (skillType) effectiveMaxTokens = 8192;
    else effectiveMaxTokens = 4096;
  }

  const effectiveTemperature = temperature !== undefined 
    ? Number(temperature) 
    : (skillType ? 0.7 : 0.2);

  // ── Đọc và phân tích mảng API Keys ─────────────────────────────────
  const rawGeminiEnv = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
  const rawOpenRouterEnv = process.env.VITE_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY || '';

  const geminiKeys = parseApiKeys(rawGeminiEnv);
  const openRouterKeys = parseApiKeys(rawOpenRouterEnv);

  if (geminiKeys.length === 0 && openRouterKeys.length === 0) {
    return res.status(500).json({
      error: 'Server chưa cấu hình API Key. Vui lòng thêm VITE_GEMINI_API_KEY hoặc VITE_OPENROUTER_API_KEY trên Vercel Dashboard.'
    });
  }

  let rawText = '';
  const errorsLog = [];

  // ── 1. Thử trước với mảng Gemini (chọn ngẫu nhiên, tối đa 3 key) ──
  if (geminiKeys.length > 0) {
    const shuffledGemini = shuffleArray(geminiKeys);
    const geminiAttempts = Math.min(shuffledGemini.length, 3);

    console.info(`[ai-proxy] Có ${geminiKeys.length} Gemini keys. Sẽ thử ngẫu nhiên ${geminiAttempts} key...`);

    for (let i = 0; i < geminiAttempts; i++) {
      const activeKey = shuffledGemini[i];
      let keySucceeded = false;

      // Thử qua danh sách models với activeKey này
      for (const model of GEMINI_MODELS) {
        try {
          const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${activeKey}`;
          const payload = {
            contents: [{ role: 'user', parts: [{ text: effectivePrompt }] }],
            generationConfig: {
              temperature: effectiveTemperature,
              maxOutputTokens: effectiveMaxTokens
            }
          };

          if (responseType === 'json') {
            payload.generationConfig.responseMimeType = 'application/json';
          }

          if (effectiveSystemInstruction) {
            payload.systemInstruction = {
              parts: [{ text: effectiveSystemInstruction }]
            };
          }

          const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData?.error?.message || `HTTP ${response.status}`);
          }

          const data = await response.json();
          rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
          if (rawText) {
            keySucceeded = true;
            console.info(`[ai-proxy] Gemini thành công với key #${i + 1} (${maskKey(activeKey)}) và model ${model}`);
            break;
          }
        } catch (err) {
          const msg = `Gemini key #${i + 1} (${maskKey(activeKey)}) / ${model} lỗi: ${err.message}`;
          console.warn(`[ai-proxy] ${msg}`);
          errorsLog.push(msg);

          // Nếu lỗi là do quota/rate limit (429, ResourceExhausted, 503), thoát model loop để đổi key khác ngay
          const lower = err.message.toLowerCase();
          if (lower.includes('quota') || lower.includes('exhausted') || lower.includes('429') || lower.includes('503')) {
            break;
          }
        }
      }

      if (keySucceeded && rawText) {
        break; // Hoàn thành
      }
    }
  }

  // ── 2. Chuyển sang mảng OpenRouter nếu Gemini thất bại (tối đa 3 lần) ──
  if (!rawText && openRouterKeys.length > 0) {
    const shuffledOpenRouter = shuffleArray(openRouterKeys);
    const openRouterAttempts = Math.min(shuffledOpenRouter.length, 3);

    console.warn(`[ai-proxy] Gemini thất bại. Chuyển sang thử ngẫu nhiên ${openRouterAttempts}/${openRouterKeys.length} OpenRouter keys...`);

    for (let i = 0; i < openRouterAttempts; i++) {
      const activeKey = shuffledOpenRouter[i];
      let keySucceeded = false;

      for (const model of OPENROUTER_MODELS) {
        try {
          const messages = [];
          if (effectiveSystemInstruction) {
            messages.push({ role: 'system', content: effectiveSystemInstruction });
          }
          messages.push({ role: 'user', content: effectivePrompt });

          const openRouterPayload = {
            model,
            messages,
            max_tokens: effectiveMaxTokens,
            temperature: effectiveTemperature
          };

          if (responseType === 'json') {
            openRouterPayload.response_format = { type: 'json_object' };
          }

          const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${activeKey}`,
              'HTTP-Referer': 'https://toefl-smart.vercel.app',
              'X-Title': 'TOEFL Smart 2026'
            },
            body: JSON.stringify(openRouterPayload)
          });

          if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData?.error?.message || `HTTP ${response.status}`);
          }

          const data = await response.json();
          rawText = data?.choices?.[0]?.message?.content || '';
          if (rawText) {
            keySucceeded = true;
            console.info(`[ai-proxy] OpenRouter thành công với key #${i + 1} (${maskKey(activeKey)}) và model ${model}`);
            break;
          }
        } catch (err) {
          const msg = `OpenRouter key #${i + 1} (${maskKey(activeKey)}) / ${model} lỗi: ${err.message}`;
          console.warn(`[ai-proxy] ${msg}`);
          errorsLog.push(msg);

          const lower = err.message.toLowerCase();
          if (lower.includes('quota') || lower.includes('rate') || lower.includes('429') || lower.includes('credits')) {
            break;
          }
        }
      }

      if (keySucceeded && rawText) {
        break;
      }
    }
  }

  // ── 3. Trả kết quả ────────────────────────────────────────────────
  if (!rawText) {
    const errorDetails = errorsLog.slice(-3).join(' | ');
    const errMsg = `Tất cả các lượt thử API Key (Gemini & OpenRouter) đều thất bại. Chi tiết: ${errorDetails || 'Không có phản hồi'}`;
    console.error('[ai-proxy] Toàn bộ providers thất bại:', errMsg);
    return res.status(502).json({ error: errMsg });
  }

  return res.status(200).json({ text: rawText });
}
