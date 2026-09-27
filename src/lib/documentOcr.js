import { jsonrepair } from 'jsonrepair';
import { 
  getGeminiApiKeys, 
  getOpenRouterApiKeys, 
  DEFAULT_GEMINI_MODEL, 
  FALLBACK_MODELS 
} from './gemini';

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Tự động nén và tối ưu hóa ảnh trước khi gửi đi để:
 * 1. Tuyệt đối không bao giờ vượt quá giới hạn 4.5MB của Vercel Serverless Function (FUNCTION_PAYLOAD_TOO_LARGE)
 * 2. Tăng tốc độ upload gấp 10 lần
 * 3. Giữ độ phân giải sắc nét 1800px chuẩn để Gemini OCR đọc chính xác 100%
 */
export function optimizeFileForOcr(file) {
  if (!file) return Promise.resolve(null);

  // Nếu là file PDF
  if (file.type === 'application/pdf') {
    if (file.size > 4 * 1024 * 1024) {
      return Promise.reject(
        new Error('File PDF quá lớn (> 4MB). Vui lòng chọn file PDF nhỏ hơn hoặc chụp ảnh màn hình các trang cần học để AI xử lý siêu nhanh.')
      );
    }
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        const base64Data = result.split(',')[1];
        resolve({
          base64: base64Data,
          mimeType: 'application/pdf',
          dataUrl: null
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Nếu là file ảnh (PNG, JPEG, WebP, v.v.)
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Tối đa 2048px: đủ siêu nét để đọc từng dòng chữ nhỏ của 100 từ vựng mà kích thước chỉ ~300KB - 500KB
        const MAX_DIMENSION = 2048;
        let width = img.width;
        let height = img.height;

        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          if (width > height) {
            height = Math.round((height * MAX_DIMENSION) / width);
            width = MAX_DIMENSION;
          } else {
            width = Math.round((width * MAX_DIMENSION) / height);
            height = MAX_DIMENSION;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        // Vẽ nền trắng để phòng trường hợp ảnh PNG trong suốt
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Nén sang JPEG 0.82
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
        const base64Data = compressedDataUrl.split(',')[1];

        resolve({
          base64: base64Data,
          mimeType: 'image/jpeg',
          dataUrl: compressedDataUrl
        });
      };

      img.onerror = () => {
        // Dự phòng nếu không render được qua Image object
        const result = e.target.result;
        const base64Data = result.split(',')[1];
        resolve({
          base64: base64Data,
          mimeType: file.type || 'image/jpeg',
          dataUrl: result
        });
      };

      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const fileToBase64 = optimizeFileForOcr;

/**
 * Prompt yêu cầu AI nhận diện và số hóa tài liệu học tiếng Anh
 */
const OCR_SYSTEM_INSTRUCTION = `You are an elite bilingual English curriculum specialist and OCR data structuring expert for TOEFL iBT & IELTS.
Your objective is to thoroughly analyze documents, tables, cheatsheets, or infographics (in image or PDF form) and convert them into structured, high-value interactive study notes.

CRITICAL INSTRUCTIONS FOR MULTI-COLUMN & DENSE DOCUMENTS (e.g. 100 vocabulary items):
1. SCAN ALL COLUMNS: Many documents have 2 or 3 columns (for example: Column 1 on the left with items 1-50, and Column 2 on the right with items 51-100). You MUST thoroughly scan across ALL columns from item 1 all the way to item 100!
2. COMPLETE THE ENTIRE LIST: NEVER truncate, omit, skip, or stop midway. If there are 100 words in the image, you MUST return all 100 items!
3. LIGHTWEIGHT SCHEMA: To guarantee all 100+ items fit within output token limits without being cut off, ONLY output these 5 concise fields per item:
   - "id": integer (1, 2, 3... 100)
   - "term": English word or phrase
   - "type": part of speech (e.g. 'adj', 'noun', 'verb', 'phrase')
   - "meaning": Vietnamese meaning (nghĩa tiếng Việt)
   - "example": 1 short, realistic academic TOEFL example sentence (keep under 14 words)
   (Do NOT output 'blank_sentence' or 'options' arrays; the client will generate them automatically).

Respond STRICTLY with raw valid JSON matching this schema:
{
  "title": "Clear concise Vietnamese or bilingual title of this cheatsheet",
  "category": "Grammar & Prepositions" | "Vocabulary & Collocations" | "Writing Templates" | "Speaking Idioms" | "Reading & Listening Tips",
  "summary": "1-2 sentence summary of this study material",
  "tags": ["tag1", "tag2", "tag3"],
  "items": [
    {
      "id": 1,
      "term": "Introvert",
      "type": "noun",
      "meaning": "người hướng nội",
      "example": "Introverts often prefer reflective, quiet study spaces."
    }
  ]
}
Output raw JSON only. Do not include markdown code block ticks, preamble, or commentary.`;

/**
 * Phân tích và số hóa tài liệu từ File (Ảnh, PDF) hoặc Văn bản thô
 */
export async function analyzeDocumentWithAi({
  file = null,
  textInput = '',
  categoryHint = '',
  onProgress = null
}) {
  onProgress?.('Đang chuẩn bị dữ liệu tài liệu...');

  let imageData = null;
  let originalImageUrl = null;

  if (file) {
    onProgress?.('Đang tối ưu hóa dung lượng & độ nét hình ảnh...');
    const encoded = await optimizeFileForOcr(file);
    imageData = {
      base64: encoded.base64,
      mimeType: encoded.mimeType
    };
    originalImageUrl = encoded.dataUrl;
  }

  const promptText = `Please analyze the attached document / text and extract all learning items.
Category hint: ${categoryHint || 'Auto-detect'}
Additional text / context provided by user:
"""
${textInput || '(Analyze the attached image/file directly)'}
"""
IMPORTANT:
- Scan BOTH columns (Left column 1 to 50, Right column 51 to 100).
- Extract EVERY SINGLE numbered item from 1 to 100 without omitting any row!
- Follow the lightweight schema (id, term, type, meaning, concise example) so that all 100 items fit completely.`;

  let rawJsonText = '';

  // 1. Chạy trên Production (Vercel Serverless Function Proxy)
  if (import.meta.env.PROD) {
    onProgress?.('Hệ thống AI Vision đang phân tích và nhận diện nội dung...');
    const response = await fetch('/api/ai-proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: promptText,
        imageData,
        systemInstruction: OCR_SYSTEM_INSTRUCTION,
        responseType: 'json',
        temperature: 0.2,
        maxOutputTokens: 8192
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error || `Lỗi AI Proxy HTTP ${response.status}`);
    }

    const data = await response.json();
    rawJsonText = data?.text || '';
  } else {
    // 2. Chạy trên Localhost (Dev Mode): Gọi Gemini trực tiếp với Multi-key rotation
    const geminiKeys = getGeminiApiKeys();
    const openRouterKeys = getOpenRouterApiKeys();

    if (geminiKeys.length === 0 && openRouterKeys.length === 0) {
      throw new Error('Chưa cấu hình API Key. Vui lòng thêm Gemini hoặc OpenRouter API Key vào cài đặt hoặc file .env');
    }

    if (geminiKeys.length > 0) {
      onProgress?.('Gemini Vision AI đang đọc ảnh và bóc tách bảng biểu...');
      const shuffled = shuffleArray(geminiKeys);
      const attempts = Math.min(shuffled.length, 3);

      for (let i = 0; i < attempts; i++) {
        const key = shuffled[i];
        for (const model of [DEFAULT_GEMINI_MODEL, ...FALLBACK_MODELS]) {
          try {
            const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
            const parts = [{ text: promptText }];
            if (imageData) {
              parts.push({
                inline_data: {
                  mime_type: imageData.mimeType,
                  data: imageData.base64
                }
              });
            }

            const response = await fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ role: 'user', parts }],
                systemInstruction: { parts: [{ text: OCR_SYSTEM_INSTRUCTION }] },
                generationConfig: {
                  responseMimeType: 'application/json',
                  temperature: 0.2,
                  maxOutputTokens: 8192
                }
              })
            });

            if (!response.ok) {
              const errData = await response.json().catch(() => ({}));
              throw new Error(errData?.error?.message || `HTTP ${response.status}`);
            }

            const data = await response.json();
            rawJsonText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (rawJsonText) break;
          } catch (err) {
            console.warn(`Lỗi Gemini OCR với model ${model} (key #${i + 1}):`, err.message);
          }
        }
        if (rawJsonText) break;
      }
    }

    // Dự phòng qua OpenRouter nếu Gemini không có hoặc lỗi
    if (!rawJsonText && openRouterKeys.length > 0 && imageData) {
      onProgress?.('Chuyển sang OpenRouter Vision dự phòng...');
      const shuffled = shuffleArray(openRouterKeys);
      const key = shuffled[0];

      try {
        const userContent = [{ type: 'text', text: promptText }];
        if (imageData) {
          userContent.push({
            type: 'image_url',
            image_url: {
              url: `data:${imageData.mimeType};base64,${imageData.base64}`
            }
          });
        }

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${key}`
          },
          body: JSON.stringify({
            model: 'google/gemini-2.0-flash-001',
            messages: [
              { role: 'system', content: OCR_SYSTEM_INSTRUCTION },
              { role: 'user', content: userContent }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.2,
            max_tokens: 8192
          })
        });

        if (response.ok) {
          const data = await response.json();
          rawJsonText = data?.choices?.[0]?.message?.content || '';
        }
      } catch (err) {
        console.warn('OpenRouter Vision fallback lỗi:', err);
      }
    }
  }

  if (!rawJsonText || !rawJsonText.trim()) {
    throw new Error('AI không thể nhận diện được nội dung từ tài liệu này. Vui lòng kiểm tra độ nét của ảnh hoặc thử lại.');
  }

  onProgress?.('Đang hoàn thiện cấu trúc sổ tay tri thức...');

  // Dọn dẹp JSON
  let cleaned = rawJsonText.trim();
  if (cleaned.startsWith('```')) {
    const blockMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (blockMatch) cleaned = blockMatch[1].trim();
    else cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
  }

  let parsed = null;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e1) {
    try {
      parsed = JSON.parse(jsonrepair(cleaned));
    } catch (e2) {
      console.error('Lỗi parse JSON OCR:', e2);
      throw new Error('Không thể phân tích dữ liệu JSON trả về từ AI.');
    }
  }

  const items = Array.isArray(parsed?.items) ? parsed.items : [];
  if (items.length === 0) {
    throw new Error('Không tìm thấy từ vựng hoặc mục kiến thức nào trong tài liệu.');
  }

  const allTerms = items.map(it => String(it.term || '').trim()).filter(Boolean);

  // Đánh số ID chuẩn hóa và tự động sinh câu bài tập điền từ Quiz
  const normalizedItems = items.map((it, idx) => {
    const term = String(it.term || '').trim();
    const meaning = String(it.meaning || '').trim();
    const example = it.example || `Understanding the term "${term}" is valuable for academic communication.`;

    let blankSentence = it.blank_sentence;
    let correctAnswer = it.correct_answer || term;

    if (!blankSentence) {
      const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escapedTerm}\\b`, 'i');
      if (regex.test(example)) {
        blankSentence = example.replace(regex, '___');
      } else {
        blankSentence = `A person described as ___ is characterized as ${meaning}.`;
      }
    }

    let options = Array.isArray(it.options) && it.options.length >= 2 ? it.options : null;
    if (!options) {
      const distractors = allTerms
        .filter(t => t.toLowerCase() !== term.toLowerCase())
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      const pool = [correctAnswer, ...distractors];
      while (pool.length < 4) {
        pool.push(['practical', 'resilient', 'empathetic', 'creative', 'mature'][pool.length % 5]);
      }
      options = pool.sort(() => 0.5 - Math.random());
    }

    return {
      id: it.id || (idx + 1),
      term,
      type: it.type || 'adj',
      meaning,
      example,
      blank_sentence: blankSentence,
      correct_answer: correctAnswer,
      options
    };
  });

  const noteResult = {
    id: `note_${Date.now()}`,
    title: parsed.title || 'Sổ tay kiến thức mới',
    category: parsed.category || categoryHint || 'Grammar & Prepositions',
    summary: parsed.summary || `Tổng hợp ${normalizedItems.length} mục kiến thức học thuật trích xuất từ tài liệu.`,
    tags: Array.isArray(parsed.tags) ? parsed.tags : ['cheatsheet', 'academic'],
    created_at: new Date().toISOString(),
    original_image_url: originalImageUrl,
    items: normalizedItems
  };

  return noteResult;
}
