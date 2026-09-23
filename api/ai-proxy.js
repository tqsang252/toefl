/**
 * ====================================================================
 * VERCEL SERVERLESS FUNCTION — AI EXAM GENERATION PROXY
 * File: api/ai-proxy.js
 *
 * Mục đích: Ẩn API key khỏi browser. Key chỉ tồn tại trên Vercel server.
 * Browser gọi POST /api/ai-proxy → Vercel Function → Gemini / OpenRouter
 *
 * Setup Vercel Environment Variables (dashboard.vercel.com):
 *   GEMINI_API_KEY     = AIza...
 *   OPENROUTER_API_KEY = sk-or-...
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

const SYSTEM_INSTRUCTION =
  'You are an elite ETS TOEFL iBT 2026 test developer and psychometrician. ' +
  'Your task is to produce strictly valid, raw JSON tests matching the requested schema ' +
  'with 100% fidelity to ETS difficulty, structure, and quality standards (CEFR C1/C2 academic register). ' +
  'NEVER truncate, omit, abbreviate, or use placeholders (such as "..." or shortened samples). ' +
  'Generate EVERY single blank, question, option, decoy, and passage in full as mandated ' +
  'by the quantitative criteria. Output strictly raw valid JSON only without markdown code ' +
  'blocks, preamble, or outside commentary.';

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
  const { prompt, skillType = 'full' } = req.body || {};

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: 'Thiếu tham số: prompt' });
  }

  const maxOutputTokens = skillType === 'full' ? 16384 : 8192;
  const geminiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
  const openRouterKey = process.env.VITE_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY || '';

  if (!geminiKey && !openRouterKey) {
    return res.status(500).json({
      error: 'Server chưa cấu hình AI API Key. Liên hệ quản trị viên.'
    });
  }

  let rawText = '';
  let lastError = null;

  // ── 1. Thử Gemini trước ───────────────────────────────────────────
  if (geminiKey) {
    for (const model of GEMINI_MODELS) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.7,
              maxOutputTokens
            }
          })
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
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openRouterKey}`,
            'HTTP-Referer': 'https://toefl-smart.vercel.app',
            'X-Title': 'TOEFL Smart 2026'
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: SYSTEM_INSTRUCTION },
              { role: 'user', content: prompt }
            ],
            max_tokens: maxOutputTokens,
            temperature: 0.7,
            response_format: { type: 'json_object' }
          })
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
    const errMsg = lastError?.message || 'Không thể kết nối AI để sinh đề thi.';
    console.error('[ai-proxy] Tất cả providers thất bại:', errMsg);
    return res.status(502).json({ error: errMsg });
  }

  return res.status(200).json({ text: rawText });
}
