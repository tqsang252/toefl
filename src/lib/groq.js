/**
 * TOEFL SMART 2026 - GROQ CLOUD CLIENT
 * Hỗ trợ nhận diện giọng nói siêu tốc bằng Whisper Large v3 (STT) 
 * và mô hình ngôn ngữ Llama 3.3 70B Versatile với độ trễ siêu thấp.
 */

// Hàm bóc tách chuỗi API keys (hỗ trợ 1 key, [key], JSON array ["key"], hoặc phân tách bằng dấu phẩy)
function parseApiKeys(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return Array.from(
      new Set(
        raw
          .map((k) => String(k).trim().replace(/^['"`\[\]\s]+|['"`\[\]\s]+$/g, ''))
          .filter(Boolean)
      )
    );
  }

  let str = String(raw).trim();
  if (!str) return [];

  // Nếu người dùng nhập dạng mảng [key] hoặc ["key"]
  if (str.startsWith('[') && str.endsWith(']')) {
    try {
      const parsed = JSON.parse(str);
      if (Array.isArray(parsed)) {
        return Array.from(
          new Set(
            parsed
              .map((k) => String(k).trim().replace(/^['"`\[\]\s]+|['"`\[\]\s]+$/g, ''))
              .filter(Boolean)
          )
        );
      }
    } catch {
      // Nếu không phải JSON chuẩn (ví dụ: [gsk_abc...]), gỡ bỏ cặp ngoặc vuông
      str = str.slice(1, -1).trim();
    }
  }

  // Tách theo dấu phẩy, chấm phẩy hoặc xuống dòng và làm sạch các ký tự thừa
  return Array.from(
    new Set(
      str
        .split(/[\n,;]+/)
        .map((k) => String(k).trim().replace(/^['"`\[\]\s]+|['"`\[\]\s]+$/g, ''))
        .filter((k) => Boolean(k) && !k.startsWith('#'))
    )
  );
}

// Lấy danh sách tất cả các Groq API Keys có sẵn (Hỗ trợ cả môi trường Local & Vercel Production)
export function getGroqApiKeys() {
  const localKey = typeof localStorage !== 'undefined' ? (localStorage.getItem('toefl_groq_api_key') || '') : '';
  const envKey = import.meta.env?.VITE_GROQ_API_KEY || import.meta.env?.GROQ_API_KEY || '';
  const parsedLocal = parseApiKeys(localKey);
  const parsedEnv = parseApiKeys(envKey);
  return Array.from(new Set([...parsedLocal, ...parsedEnv]));
}

// Lấy ngẫu nhiên 1 Groq API Key (Hỗ trợ Key Rotation cân bằng tải)
export function getGroqApiKey() {
  const keys = getGroqApiKeys();
  if (keys.length === 0) return '';
  return keys[Math.floor(Math.random() * keys.length)];
}

// Lưu / Xóa Groq API Key trong LocalStorage
export function saveGroqApiKey(key) {
  if (typeof localStorage !== 'undefined') {
    if (key && String(key).trim()) {
      localStorage.setItem('toefl_groq_api_key', String(key).trim());
    } else {
      localStorage.removeItem('toefl_groq_api_key');
    }
  }
}

// Kiểm tra xem Groq đã được cấu hình chưa
export function isGroqConfigured() {
  return getGroqApiKeys().length > 0;
}

// Danh sách model STT và Chat mặc định & dự phòng
export const GROQ_WHISPER_MODELS = ['whisper-large-v3', 'whisper-large-v3-turbo'];
export const DEFAULT_GROQ_STT_MODEL = 'whisper-large-v3';

export const GROQ_CHAT_MODELS = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant'];
export const DEFAULT_GROQ_CHAT_MODEL = 'llama-3.3-70b-versatile';

/**
 * 1. BÓC TÁCH GIỌNG NÓI SIÊU CHÍNH XÁC BẰNG WHISPER (TỰ ĐỘNG CHUYỂN MODEL NẾU NGHẼN)
 * Chuyển đổi audio blob (WebM/WAV) thành văn bản tiếng Anh với độ trễ < 0.5s.
 */
export async function transcribeAudioWithGroq({ audioBlob, prompt = '', language = 'en' }) {
  const apiKey = getGroqApiKey();
  if (!apiKey) {
    throw new Error('Chưa cấu hình Groq API Key. Vui lòng vào Cài đặt để thêm key.');
  }

  if (!audioBlob) {
    throw new Error('Không tìm thấy dữ liệu âm thanh để nhận diện.');
  }

  let lastError = null;

  // Tự động thử qua các model Whisper (whisper-large-v3 -> whisper-large-v3-turbo)
  for (const modelName of GROQ_WHISPER_MODELS) {
    try {
      const formData = new FormData();
      const file = new File([audioBlob], 'recording.webm', { type: audioBlob.type || 'audio/webm' });
      formData.append('file', file);
      formData.append('model', modelName);
      formData.append('language', language);
      formData.append('response_format', 'verbose_json');
      formData.append('temperature', '0.0');

      if (prompt && prompt.trim()) {
        formData.append('prompt', prompt.slice(0, 400));
      }

      const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: formData,
      });

      if (!response.ok) {
        let errMsg = `Groq Whisper API error (${response.status}) on model ${modelName}`;
        try {
          const errJson = await response.json();
          if (errJson?.error?.message) {
            errMsg = errJson.error.message;
          }
        } catch {}
        lastError = new Error(errMsg);
        // Nếu lỗi 429 hoặc model bận -> thử model tiếp theo trong danh sách
        console.warn(`[Groq] Model ${modelName} gặp sự cố, tự động thử model dự phòng...`, errMsg);
        continue;
      }

      const data = await response.json();
      return {
        text: (data.text || '').trim(),
        duration: data.duration || 0,
        language: data.language || 'en',
        segments: data.segments || [],
        words: data.words || [],
        model_used: modelName
      };
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('Không thể nhận diện âm thanh qua Groq Whisper.');
}

/**
 * 2. GỌI MÔ HÌNH CHAT LLAMA 3.3 70B QUA GROQ (SIÊU TỐC > 300 TOKENS/S)
 */
export async function callGroqChat({
  messages,
  model = DEFAULT_GROQ_CHAT_MODEL,
  temperature = 0.5,
  max_tokens = 4096,
  jsonMode = false,
}) {
  const apiKey = getGroqApiKey();
  if (!apiKey) {
    throw new Error('Chưa cấu hình Groq API Key.');
  }

  const bodyPayload = {
    model,
    messages,
    temperature,
    max_tokens,
  };

  if (jsonMode) {
    bodyPayload.response_format = { type: 'json_object' };
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(bodyPayload),
  });

  if (!response.ok) {
    let errMsg = `Groq Chat API error (${response.status})`;
    try {
      const errJson = await response.json();
      if (errJson?.error?.message) {
        errMsg = errJson.error.message;
      }
    } catch {}
    throw new Error(errMsg);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content || '';
  return text;
}

/**
 * 3. HỖ TRỢ CHỮA LỖI & NÂNG CẤP TỪ VỰNG TỨC THÌ (FAST WRITING COACH)
 */
export async function quickGrammarCheckWithGroq({ text, topic = '' }) {
  if (!text || text.trim().length < 5) return null;

  const systemPrompt = `You are a high-speed TOEFL iBT Writing tutor. Analyze the student's text for grammar, phrasing, and C1/C2 academic vocabulary upgrades.
Respond ONLY with a valid JSON object matching this schema:
{
  "has_errors": boolean,
  "corrections": [
    {
      "original": "string",
      "improved": "string",
      "explanation": "concise explanation in Vietnamese"
    }
  ],
  "vocabulary_upgrades": [
    {
      "original_word": "string",
      "advanced_alternative": "string",
      "reason": "concise rationale in Vietnamese"
    }
  ],
  "overall_comment": "1-sentence encouragement in Vietnamese"
}`;

  const userMessage = topic 
    ? `Topic: ${topic}\nStudent's Draft:\n${text}`
    : `Student's Draft:\n${text}`;

  const resText = await callGroqChat({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ],
    temperature: 0.2,
    jsonMode: true,
  });

  try {
    return JSON.parse(resText);
  } catch {
    return null;
  }
}
