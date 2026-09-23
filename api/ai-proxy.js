/**
 * ====================================================================
 * VERCEL SERVERLESS FUNCTION — UNIVERSAL AI PROXY
 * File: api/ai-proxy.js
 *
 * Xử lý mọi yêu cầu AI trong hệ thống:
 * 1. Sinh đề thi tự động (Reading, Listening, Writing, Speaking, Full Test)
 * 2. Tra từ điển & dịch thuật học thuật (DictionaryWidget)
 * 3. Chấm điểm & phân tích bài viết / bài nói / đề trắc nghiệm
 *
 * Bí mật API Key trên server: VITE_GEMINI_API_KEY / VITE_OPENROUTER_API_KEY
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
      effectivePrompt = parts.map(p => typeof p === 'string' ? p : p.text || '').join('\n');
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

  const geminiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
  const openRouterKey = process.env.VITE_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY || '';

  if (!geminiKey && !openRouterKey) {
    return res.status(500).json({
      error: 'Server chưa cấu hình AI API Key. Vui lòng cấu hình VITE_GEMINI_API_KEY trên Vercel Dashboard.'
    });
  }

  let rawText = '';
  let lastError = null;

  // ── 1. Thử Gemini trước ───────────────────────────────────────────
  if (geminiKey) {
    for (const model of GEMINI_MODELS) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
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
        if (rawText) break;
        throw new Error('Gemini trả về nội dung rỗng.');
      } catch (err) {
        lastError = err;
        console.warn(`[ai-proxy] Gemini model ${model} lỗi:`, err.message);
      }
    }
  }

  // ── 2. Dự phòng OpenRouter ────────────────────────────────────────
  if (!rawText && openRouterKey) {
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
            Authorization: `Bearer ${openRouterKey}`,
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
        if (rawText) break;
        throw new Error('OpenRouter trả về nội dung rỗng.');
      } catch (err) {
        lastError = err;
        console.warn(`[ai-proxy] OpenRouter model ${model} lỗi:`, err.message);
      }
    }
  }

  // ── 3. Trả kết quả ────────────────────────────────────────────────
  if (!rawText) {
    const errMsg = lastError?.message || 'Không thể kết nối AI để xử lý yêu cầu.';
    console.error('[ai-proxy] Tất cả providers thất bại:', errMsg);
    return res.status(502).json({ error: errMsg });
  }

  return res.status(200).json({ text: rawText });
}
