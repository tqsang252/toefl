import { jsonrepair } from 'jsonrepair';
import { importBatchTests } from './supabase.js';
import { getExamPrompt } from './examPrompts.js';

// ====================================================================
// GEMINI AI WRITING EVALUATION SERVICE (ETS TOEFL 2026 RUBRIC)
// ====================================================================

// ====================================================================
// API KEYS & PROVIDER MANAGEMENT (GEMINI PRIMARY + OPENROUTER FALLBACK)
// ====================================================================

// Lấy API Key Gemini từ LocalStorage hoặc Biến môi trường Vite (.env hoặc Vercel)
export function getGeminiApiKey() {
  const localKey = typeof localStorage !== 'undefined' ? localStorage.getItem('toefl_gemini_api_key') : '';
  if (localKey && localKey.trim()) return localKey.trim();

  return (
    import.meta.env?.VITE_GEMINI_API_KEY ||
    import.meta.env?.GEMINI_API_KEY ||
    ''
  ).trim();
}

// Lưu / Xóa Gemini API Key trong LocalStorage
export function saveGeminiApiKey(key) {
  if (typeof localStorage !== 'undefined') {
    if (key && key.trim()) {
      localStorage.setItem('toefl_gemini_api_key', key.trim());
    } else {
      localStorage.removeItem('toefl_gemini_api_key');
    }
  }
}

// Lấy API Key OpenRouter dự phòng từ LocalStorage hoặc Biến môi trường Vite (.env hoặc Vercel)
export function getOpenRouterApiKey() {
  const localKey = typeof localStorage !== 'undefined' ? localStorage.getItem('toefl_openrouter_api_key') : '';
  if (localKey && localKey.trim()) return localKey.trim();

  return (
    import.meta.env?.VITE_OPENROUTER_API_KEY ||
    import.meta.env?.OPENROUTER_API_KEY ||
    ''
  ).trim();
}

// Lưu / Xóa OpenRouter API Key trong LocalStorage
export function saveOpenRouterApiKey(key) {
  if (typeof localStorage !== 'undefined') {
    if (key && key.trim()) {
      localStorage.setItem('toefl_openrouter_api_key', key.trim());
    } else {
      localStorage.removeItem('toefl_openrouter_api_key');
    }
  }
}

// Kiểm tra xem OpenRouter đã được cấu hình chưa
export function isOpenRouterConfigured() {
  return Boolean(getOpenRouterApiKey());
}

// Kiểm tra xem đã cấu hình ít nhất 1 AI Provider (Gemini hoặc OpenRouter) chưa
export function isGeminiConfigured() {
  return Boolean(getGeminiApiKey() || getOpenRouterApiKey());
}

export function isAiConfigured() {
  return isGeminiConfigured();
}

// Model Gemini Google mặc định
export const DEFAULT_GEMINI_MODEL = 'gemini-2.5-flash';
export const FALLBACK_MODELS = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-2.5-flash-lite', 'gemini-flash-latest'];

// Model OpenRouter dự phòng (ưu tiên Gemini qua OpenRouter Vertex, sau đó là DeepSeek & GPT)
export const OPENROUTER_MODELS = [
  'google/gemini-2.0-flash-001',
  'google/gemini-flash-1.5',
  'deepseek/deepseek-chat',
  'openai/gpt-4o-mini',
  'meta-llama/llama-3.3-70b-instruct'
];

/**
 * Gọi OpenRouter API dự phòng khi Google Gemini bị quá tải, hết hạn mức hoặc lỗi 503
 */
export async function callOpenRouterChat({
  prompt,
  systemInstruction = '',
  maxTokens = 8192,
  temperature = 0.3,
  responseFormatJson = true,
  onProgress = null
}) {
  const apiKey = getOpenRouterApiKey();
  if (!apiKey) {
    throw new Error('Chưa cấu hình OpenRouter API Key dự phòng.');
  }

  let lastError = null;

  for (const model of OPENROUTER_MODELS) {
    try {
      onProgress?.('Đang kết nối luồng xử lý dự phòng...');

      const messages = [];
      if (systemInstruction) {
        messages.push({ role: 'system', content: systemInstruction });
      }
      messages.push({ role: 'user', content: prompt });

      const bodyPayload = {
        model,
        messages,
        temperature,
        max_tokens: maxTokens
      };

      if (responseFormatJson) {
        bodyPayload.response_format = { type: 'json_object' };
      }

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173',
          'X-Title': 'TOEFL iBT 2026 Simulator',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyPayload)
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        const msg = errJson?.error?.message || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(`OpenRouter Error (${modelDisplayName}): ${msg}`);
      }

      const resData = await response.json();
      const content = resData?.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error(`OpenRouter (${modelDisplayName}) không trả về nội dung.`);
      }

      return content;
    } catch (err) {
      lastError = err;
      console.warn(`Lỗi khi gọi OpenRouter model ${model}:`, err.message);
    }
  }

  throw lastError || new Error('Không thể kết nối đến OpenRouter API.');
}

/**
 * Quy đổi điểm Band (0.0 - 5.0) sang thang điểm TOEFL (0 - 30)
 */
export function convertBandTo30(bandScore) {
  const b = Number(bandScore) || 0;
  if (b >= 5.0) return 30;
  if (b >= 4.5) return 28;
  if (b >= 4.0) return 25;
  if (b >= 3.5) return 22;
  if (b >= 3.0) return 19;
  if (b >= 2.5) return 15;
  if (b >= 2.0) return 11;
  if (b >= 1.5) return 8;
  if (b >= 1.0) return 5;
  return 0;
}

/**
 * Quy đổi thang điểm TOEFL Writing (0 - 30) sang Band Score ETS 2026 (1.0 - 6.0)
 */
export function convert30ToBand6(score30) {
  const s = Math.round(Number(score30) || 0);
  if (s >= 29) return 6.0;
  if (s >= 27) return 5.5;
  if (s >= 24) return 5.0;
  if (s >= 21) return 4.5;
  if (s >= 18) return 4.0;
  if (s >= 14) return 3.5;
  if (s >= 10) return 3.0;
  if (s >= 6) return 2.5;
  if (s >= 1) return 2.0;
  return 1.0;
}

/**
 * Quy đổi điểm thô (số câu đúng / tổng câu) sang thang điểm ETS TOEFL (0 - 30)
 * theo đường cong đánh giá thích ứng MSAT 2026
 */
export function convertRawToScale30(rawScore, totalQuestions, skill = 'reading') {
  if (!totalQuestions || totalQuestions <= 0) return 26;
  const ratio = Math.max(0, Math.min(1, Number(rawScore || 0) / Number(totalQuestions)));
  
  // Phân bổ điểm theo chuẩn ETS TOEFL 2026
  if (ratio >= 0.96) return 30;
  if (ratio >= 0.92) return 29;
  if (ratio >= 0.88) return 28;
  if (ratio >= 0.84) return 27;
  if (ratio >= 0.80) return 26;
  if (ratio >= 0.75) return 25;
  if (ratio >= 0.70) return 24;
  if (ratio >= 0.65) return 22;
  if (ratio >= 0.60) return 20;
  if (ratio >= 0.55) return 18;
  if (ratio >= 0.50) return 16;
  if (ratio >= 0.45) return 14;
  if (ratio >= 0.40) return 12;
  if (ratio >= 0.30) return 10;
  if (ratio >= 0.20) return 7;
  if (ratio > 0) return 5;
  return 0;
}

/**
 * Chuyển đổi blob URL audio sang base64 data để gửi qua Gemini API
 */
export async function blobUrlToBase64(blobUrl) {
  if (!blobUrl || typeof blobUrl !== 'string' || !blobUrl.startsWith('blob:')) {
    return null;
  }
  try {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result || '';
        const base64 = String(result).split(',')[1];
        resolve(base64 || null);
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.warn('Lỗi khi chuyển audio blob URL sang base64:', err);
    return null;
  }
}

/**
 * Xây dựng Prompt chuẩn ETS TOEFL 2026 cho từng dạng bài Writing
 */
function buildEvaluationPrompt(taskType, taskData, essayText) {
  const isEmail = taskType === 'write_email';

  if (isEmail) {
    const scenario = taskData?.scenario || 'Write an email to your professor regarding an absence.';
    const requirements = Array.isArray(taskData?.requirements) 
      ? taskData.requirements.map((r, i) => `${i + 1}. ${r}`).join('\n')
      : 'Cover all required communication points.';
    const recipient = taskData?.recipient || 'Professor';
    const minWords = taskData?.min_words || 80;

    return `
You are an expert official ETS TOEFL iBT Writing Examiner with over 15 years of experience evaluating essays under the latest TOEFL 2026 scoring rubrics.

You must rigorously grade and analyze the following student submission for:
TASK TYPE: WRITE AN EMAIL (TOEFL 2026 Task 2)

[TASK CONTEXT & PROMPT]
Recipient: ${recipient}
Scenario: ${scenario}
Required Bullet Points:
${requirements}
Minimum Word Requirement: ${minWords} words

[STUDENT SUBMISSION]
"${essayText || '(Thí sinh không nộp bài / bài viết trống)'}"

[EVALUATION GUIDELINES ACCORDING TO ETS RUBRIC 2026]
1. Task Achievement (0 - 5.0): Did the student address all 3 bullet points thoroughly? Is the tone appropriately formal/respectful (salutation, body, polite closing)?
2. Coherence & Cohesion (0 - 5.0): Is the structure clear and logical with smooth transitions between points?
3. Lexical Resource (0 - 5.0): Range and precision of vocabulary, proper academic/formal collocations, avoidance of awkward phrasing.
4. Grammatical Range & Accuracy (0 - 5.0): Sentence complexity, correct verb tenses, prepositions, articles, punctuation, and clause structures.

You MUST respond strictly with a valid JSON object following this exact schema without any Markdown formatting or comments outside the JSON:
{
  "task_type": "write_email",
  "score_band": 4.5,
  "score_30": 28,
  "summary_feedback": "Nhận xét tổng quan bằng tiếng Việt về điểm mạnh và điểm cần cải thiện của bài viết.",
  "rubric_scores": {
    "task_achievement": {
      "score": 4.5,
      "feedback": "Nhận xét tiếng Việt về mức độ đáp ứng 3 yêu cầu đề bài và văn phong thư."
    },
    "coherence_cohesion": {
      "score": 4.0,
      "feedback": "Nhận xét tiếng Việt về bố cục và tính liên kết giữa các câu."
    },
    "lexical_resource": {
      "score": 4.5,
      "feedback": "Nhận xét tiếng Việt về vốn từ vựng và độ trang trọng."
    },
    "grammatical_accuracy": {
      "score": 4.0,
      "feedback": "Nhận xét tiếng Việt về độ chính xác và đa dạng ngữ pháp."
    }
  },
  "error_corrections": [
    {
      "original": "câu hoặc cụm từ gốc chứa lỗi trong bài của thí sinh",
      "type": "Grammar" or "Vocabulary" or "Punctuation" or "Style",
      "corrected": "câu đã được sửa lại chuẩn xác, tự nhiên",
      "explanation": "Giải thích chi tiết bằng tiếng Việt vì sao sai và quy tắc ngữ pháp liên quan"
    }
  ],
  "actionable_improvements": [
    "Lời khuyên cụ thể 1 bằng tiếng Việt để nâng điểm",
    "Lời khuyên cụ thể 2 bằng tiếng Việt...",
    "Lời khuyên cụ thể 3 bằng tiếng Việt..."
  ],
  "vocabulary_upgrades": [
    {
      "original": "từ/cụm từ thí sinh đã dùng",
      "upgrade": "từ/cụm từ nâng cao học thuật hơn",
      "context": "Ví dụ câu sử dụng từ nâng cao này"
    }
  ],
  "model_revision": "Bản viết lại hoàn chỉnh toàn bộ bức email đạt điểm tuyệt đối Band 5.0 (30/30) giữ nguyên toàn bộ ý tưởng của thí sinh nhưng nâng cấp từ vựng, ngữ pháp và cấu trúc."
}
`;
  }

  // Academic Discussion Task
  const topic = taskData?.topic || taskData?.course || 'Academic Discussion';
  const profName = taskData?.professor_name || 'Dr. Eleanor Robinson';
  const profQuestion = taskData?.professor_question || taskData?.question || 'Discuss your perspective on the topic.';
  const peers = Array.isArray(taskData?.peer_posts)
    ? taskData.peer_posts.map((p) => `- ${p.student || 'Classmate'}: "${p.stance || p.opinion || ''}"`).join('\n')
    : '- Michael: Expressed skepticism\n- Sarah: Expressed optimism';
  const minWords = taskData?.min_words || 100;

  return `
You are an expert official ETS TOEFL iBT Writing Examiner with over 15 years of experience evaluating essays under the latest TOEFL 2026 scoring rubrics.

You must rigorously grade and analyze the following student submission for:
TASK TYPE: ACADEMIC DISCUSSION (TOEFL 2026 Task 3)

[COURSE & TOPIC]
Topic: ${topic}
Professor: ${profName}
Professor's Question:
"${profQuestion}"

Classmate Posts:
${peers}

Minimum Word Requirement: ${minWords} words

[STUDENT SUBMISSION]
"${essayText || '(Thí sinh không nộp bài / bài viết trống)'}"

[EVALUATION GUIDELINES ACCORDING TO ETS RUBRIC 2026]
1. Task Achievement (0 - 5.0): Did the student clearly state their position, directly address the professor's question, and meaningfully engage with / synthesize or critique the classmates' ideas with well-supported original arguments?
2. Coherence & Cohesion (0 - 5.0): Is the response well-developed with logical progression, appropriate discourse markers, and clear paragraph transitions?
3. Lexical Resource (0 - 5.0): Use of advanced academic vocabulary, idiomatic collocations, precision, and stylistic sophistication.
4. Grammatical Range & Accuracy (0 - 5.0): Variety of complex syntactic structures (inversion, passive voice, relative clauses), control of agreement, mechanics, and spelling.

You MUST respond strictly with a valid JSON object following this exact schema without any Markdown formatting or comments outside the JSON:
{
  "task_type": "academic_discussion",
  "score_band": 4.5,
  "score_30": 28,
  "summary_feedback": "Nhận xét tổng quan bằng tiếng Việt về lập luận, phản biện và chất lượng bài viết.",
  "rubric_scores": {
    "task_achievement": {
      "score": 4.5,
      "feedback": "Nhận xét tiếng Việt về luận điểm cá nhân và mức độ phản biện ý kiến bạn học."
    },
    "coherence_cohesion": {
      "score": 4.0,
      "feedback": "Nhận xét tiếng Việt về tính mạch lạc và liên kết ý tưởng."
    },
    "lexical_resource": {
      "score": 4.5,
      "feedback": "Nhận xét tiếng Việt về từ vựng học thuật và độ chuẩn xác ngữ nghĩa."
    },
    "grammatical_accuracy": {
      "score": 4.0,
      "feedback": "Nhận xét tiếng Việt về cấu trúc câu phức và độ chuẩn xác ngữ pháp."
    }
  },
  "error_corrections": [
    {
      "original": "câu hoặc cụm từ gốc chứa lỗi trong bài của thí sinh",
      "type": "Grammar" or "Vocabulary" or "Punctuation" or "Style",
      "corrected": "câu đã được sửa lại chuẩn xác, tự nhiên",
      "explanation": "Giải thích chi tiết bằng tiếng Việt vì sao sai và quy tắc ngữ pháp liên quan"
    }
  ],
  "actionable_improvements": [
    "Lời khuyên cụ thể 1 bằng tiếng Việt để nâng điểm",
    "Lời khuyên cụ thể 2 bằng tiếng Việt...",
    "Lời khuyên cụ thể 3 bằng tiếng Việt..."
  ],
  "vocabulary_upgrades": [
    {
      "original": "từ/cụm từ thí sinh đã dùng",
      "upgrade": "từ/cụm từ học thuật cao cấp hơn",
      "context": "Ví dụ câu sử dụng từ nâng cao này trong bài thảo luận"
    }
  ],
  "model_revision": "Bản viết lại hoàn chỉnh đạt điểm tuyệt đối Band 5.0 (30/30) giữ nguyên toàn bộ lập luận cốt lõi của thí sinh nhưng trau chuốt ngôn từ học thuật cao cấp và cấu trúc câu sắc bén."
}
`;
}

/**
 * Gọi API Gemini để chấm điểm 1 bài viết đơn lẻ (Có tự động dự phòng sang OpenRouter)
 */
export async function evaluateSingleWritingEssay({ taskType, taskData, essayText }) {
  const geminiKey = getGeminiApiKey();
  const openRouterKey = getOpenRouterApiKey();
  if (!geminiKey && !openRouterKey) {
    throw new Error('Chưa cấu hình API Key (Gemini hoặc OpenRouter trong .env hoặc Cài đặt).');
  }

  // Nếu bài viết trống
  if (!essayText || !essayText.trim()) {
    return {
      task_type: taskType,
      score_band: 0,
      score_30: 0,
      summary_feedback: 'Bạn chưa nhập bài viết cho phần thi này nên hệ thống không thể chấm điểm.',
      rubric_scores: {
        task_achievement: { score: 0, feedback: 'Chưa có nội dung nộp bài.' },
        coherence_cohesion: { score: 0, feedback: 'Chưa có nội dung nộp bài.' },
        lexical_resource: { score: 0, feedback: 'Chưa có nội dung nộp bài.' },
        grammatical_accuracy: { score: 0, feedback: 'Chưa có nội dung nộp bài.' }
      },
      error_corrections: [],
      actionable_improvements: [
        'Hãy luyện tập viết đầy đủ nội dung theo yêu cầu đề bài.',
        'Đảm bảo đạt số lượng từ tối thiểu quy định.'
      ],
      vocabulary_upgrades: [],
      model_revision: 'Chưa có bài nộp để tạo bản nâng cấp.'
    };
  }

  const prompt = buildEvaluationPrompt(taskType, taskData, essayText);

  // 1. Thử gọi Google Gemini trước (nếu có key)
  let lastError = null;
  if (geminiKey) {
    const modelsToTry = [DEFAULT_GEMINI_MODEL, ...FALLBACK_MODELS];
    for (const model of modelsToTry) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
        
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: prompt }]
              }
            ],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.2
            }
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errMessage = errorData?.error?.message || `HTTP ${response.status}: ${response.statusText}`;
          throw new Error(`Gemini API Error (${model}): ${errMessage}`);
        }

        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!rawText) {
          throw new Error('Gemini API không trả về nội dung đánh giá.');
        }

        // Xử lý chuỗi JSON an toàn với jsonrepair
        const repaired = jsonrepair(rawText);
        const parsed = JSON.parse(repaired);

        // Đảm bảo có trường điểm thang 30
        if (parsed.score_band && !parsed.score_30) {
          parsed.score_30 = convertBandTo30(parsed.score_band);
        }

        return parsed;
      } catch (err) {
        lastError = err;
        console.warn(`Lỗi khi gọi model ${model}:`, err.message);
      }
    }
  }

  // 2. Dự phòng: Nếu Gemini lỗi (hoặc không có key) mà có OpenRouter Key -> Gọi OpenRouter
  if (openRouterKey) {
    console.info('⚠️ Gemini Writing Evaluation gặp sự cố, tự động chuyển sang OpenRouter dự phòng...');
    try {
      const rawContent = await callOpenRouterChat({
        prompt,
        systemInstruction: 'You are an expert official ETS TOEFL iBT Writing Examiner. You must respond strictly with a valid JSON object matching the requested schema without any markdown formatting or commentary outside JSON.',
        temperature: 0.2,
        responseFormatJson: true
      });
      let cleaned = rawContent.trim();
      if (cleaned.includes('```')) {
        const blockMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)(?:```|$)/i);
        if (blockMatch) cleaned = blockMatch[1].trim();
      }
      cleaned = cleaned.replace(/[\u201C\u201D]/g, '"').replace(/[\u2018\u2019]/g, "'");
      const parsed = JSON.parse(jsonrepair(cleaned));
      if (parsed.score_band && !parsed.score_30) {
        parsed.score_30 = convertBandTo30(parsed.score_band);
      }
      return parsed;
    } catch (openRouterErr) {
      console.error('Lỗi khi gọi OpenRouter chấm bài:', openRouterErr);
      throw new Error(`Không thể chấm bài viết: Gemini gặp sự cố ("${lastError?.message || 'Quá tải'}"), và OpenRouter gặp lỗi ("${openRouterErr.message}").`);
    }
  }

  throw lastError || new Error('Không thể kết nối đến Gemini API.');
}

/**
 * Tự động chấm điểm song song cả 2 bài viết (Email & Academic Discussion)
 */
export async function evaluateBothWritingSubmissions({ emailSubmission, discussionSubmission }) {
  const results = {
    email: null,
    discussion: null,
    combined_score_30: 0,
    combined_band: 0,
    evaluated_at: new Date().toISOString()
  };

  const promises = [];

  if (emailSubmission) {
    promises.push(
      evaluateSingleWritingEssay({
        taskType: 'write_email',
        taskData: emailSubmission,
        essayText: emailSubmission.essay_text
      }).then((res) => {
        results.email = res;
      })
    );
  }

  if (discussionSubmission) {
    promises.push(
      evaluateSingleWritingEssay({
        taskType: 'academic_discussion',
        taskData: discussionSubmission,
        essayText: discussionSubmission.essay_text
      }).then((res) => {
        results.discussion = res;
      })
    );
  }

  // Chờ cả 2 bài chấm xong
  await Promise.all(promises);

  // Tính điểm tổng hợp theo barem chuẩn ETS TOEFL 2026:
  // Task 2 (Write an Email: 40%) & Task 3 (Academic Discussion: 60%)
  const emailScore = results.email?.score_30;
  const discussScore = results.discussion?.score_30;

  let final30 = 0;
  if (emailScore !== undefined && discussScore !== undefined) {
    final30 = Math.round(emailScore * 0.4 + discussScore * 0.6);
  } else if (emailScore !== undefined) {
    final30 = emailScore;
  } else if (discussScore !== undefined) {
    final30 = discussScore;
  }

  results.combined_score_30 = Math.max(0, Math.min(30, final30));
  results.toefl_band_6 = convert30ToBand6(results.combined_score_30);
  results.combined_band = Number(((results.combined_score_30 / 30) * 5.0).toFixed(1)); // Thang ETS Band 5.0

  return results;
}

/**
 * Hàm chung gọi AI JSON an toàn với cơ chế thử lại model dự phòng & OpenRouter Fallback
 */
export async function generateGeminiJson(parts, systemInstruction = '') {
  const geminiKey = getGeminiApiKey();
  const openRouterKey = getOpenRouterApiKey();

  if (!geminiKey && !openRouterKey) {
    throw new Error('Chưa cấu hình API Key (Gemini hoặc OpenRouter trong .env hoặc Cài đặt).');
  }

  let lastError = null;

  // 1. Thử gọi Google Gemini trước nếu có key
  if (geminiKey) {
    const modelsToTry = [DEFAULT_GEMINI_MODEL, ...FALLBACK_MODELS];
    for (const model of modelsToTry) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
        const bodyPayload = {
          contents: [
            {
              role: 'user',
              parts: Array.isArray(parts) ? parts : [{ text: String(parts) }]
            }
          ],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.2
          }
        };

        if (systemInstruction) {
          bodyPayload.systemInstruction = {
            parts: [{ text: systemInstruction }]
          };
        }

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyPayload)
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData?.error?.message || `HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!rawText) throw new Error('Gemini API không trả về nội dung.');

        const repaired = jsonrepair(rawText);
        return JSON.parse(repaired);
      } catch (err) {
        lastError = err;
        console.warn(`Lỗi khi gọi model ${model}:`, err.message);
      }
    }
  }

  // 2. Dự phòng OpenRouter khi Gemini lỗi hoặc quá tải
  if (openRouterKey) {
    console.info('⚠️ Gemini JSON generation gặp sự cố, tự động chuyển sang OpenRouter dự phòng...');
    try {
      let textPrompt = '';
      if (Array.isArray(parts)) {
        textPrompt = parts.map(p => (typeof p === 'string' ? p : p.text || '')).filter(Boolean).join('\n\n');
      } else {
        textPrompt = String(parts);
      }

      const rawContent = await callOpenRouterChat({
        prompt: textPrompt,
        systemInstruction,
        temperature: 0.2,
        responseFormatJson: true
      });

      let cleaned = rawContent.trim();
      if (cleaned.includes('```')) {
        const blockMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)(?:```|$)/i);
        if (blockMatch) cleaned = blockMatch[1].trim();
      }
      cleaned = cleaned.replace(/[\u201C\u201D]/g, '"').replace(/[\u2018\u2019]/g, "'");
      return JSON.parse(jsonrepair(cleaned));
    } catch (openRouterErr) {
      console.error('Lỗi khi gọi OpenRouter:', openRouterErr);
      throw new Error(`AI xử lý thất bại: Gemini ("${lastError?.message || 'Quá tải'}"), OpenRouter ("${openRouterErr.message}").`);
    }
  }

  throw lastError || new Error('Không thể kết nối đến Gemini API.');
}

/**
 * ====================================================================
 * GEMINI AI SPEAKING EVALUATION SERVICE (ETS TOEFL 2026 RUBRIC)
 * ====================================================================
 */
export async function evaluateSpeakingTest({ repeatItems = [], interviewItems = [] }) {
  const hasAnyRecording = [...repeatItems, ...interviewItems].some((it) => it.audio_url || it.is_recorded);

  if (!hasAnyRecording) {
    return {
      skill: 'speaking',
      score_30: 0,
      toefl_band_6: 1.0,
      rubric_scores: {
        delivery: { score: 0, feedback: 'Thí sinh chưa thực hiện lượt ghi âm nào.' },
        language_use: { score: 0, feedback: 'Chưa có dữ liệu bài nói để đánh giá từ vựng và ngữ pháp.' },
        topic_development: { score: 0, feedback: 'Chưa hoàn thành lượt trả lời phỏng vấn.' }
      },
      task_breakdown: {
        repeat: { score_30: 0, feedback: 'Chưa ghi âm phần Listen & Repeat.' },
        interview: { score_30: 0, feedback: 'Chưa ghi âm phần Take an Interview.' }
      },
      summary_feedback: 'Bài thi nói chưa có dữ liệu ghi âm. Hãy đảm bảo cấp quyền Microphone cho trình duyệt và thực hiện các lượt nói để được AI chấm điểm chuẩn xác.',
      pronunciation_tips: [
        'Kiểm tra micro trước khi làm bài thi Nói.',
        'Luyện tập phát âm to, rõ ràng và dứt khoát.'
      ],
      sample_ideal_response: 'Hãy hoàn thành đầy đủ 7 câu lặp lại và 4 câu hỏi phỏng vấn trong thời lượng 45 giây quy định.'
    };
  }

  const repeatSummary = repeatItems.map((it, idx) => ({
    question_num: idx + 1,
    target_sentence: it.text || it.prompt,
    phonetic_guide: it.phonetic_guide || '',
    recorded: Boolean(it.audio_url || it.is_recorded)
  }));

  const interviewSummary = interviewItems.map((q, idx) => ({
    question_num: idx + 1,
    interviewer_question: q.question || q.prompt,
    sample_answer: q.sample_answer || '',
    key_points: q.key_points || [],
    recorded: Boolean(q.audio_url || q.is_recorded)
  }));

  // Gửi audio base64 mẫu nếu có
  const audioParts = [];
  try {
    for (const it of [...interviewItems, ...repeatItems]) {
      if (it.audio_url && typeof it.audio_url === 'string' && it.audio_url.startsWith('blob:')) {
        const b64 = await blobUrlToBase64(it.audio_url);
        if (b64) {
          audioParts.push({
            inline_data: {
              mime_type: 'audio/webm',
              data: b64
            }
          });
          break; // Đính kèm 1 sample audio đại diện
        }
      }
    }
  } catch (e) {
    console.warn('Cannot attach audio inline data:', e);
  }

  const promptText = `
You are an expert official ETS TOEFL iBT Speaking Examiner grading according to the latest TOEFL 2026 scoring scale.

Evaluate the student's speaking performance:
TASK 1: LISTEN & REPEAT (7 tasks - tests pronunciation, acoustic precision, phonetic fidelity)
${JSON.stringify(repeatSummary, null, 2)}

TASK 2: TAKE AN INTERVIEW (4 tasks - 45s each, tests delivery, language use, spontaneous topic development)
${JSON.stringify(interviewSummary, null, 2)}

[ETS TOEFL 2026 SPEAKING RUBRIC GUIDELINES]
1. Delivery (0 - 5.0): Intonation, natural pauses, speech rate, clarity, minimal hesitation.
2. Language Use (0 - 5.0): Vocabulary range, idiomatic expressions, grammatical accuracy.
3. Topic Development (0 - 5.0): Addressing the question directly, coherent support, logical transitions within 45s.
4. Scaled Score (0 - 30): Standard ETS TOEFL scaled score based on the rubric.
5. TOEFL Band (1.0 - 6.0): 29-30 -> 6.0, 27-28 -> 5.5, 24-26 -> 5.0, 21-23 -> 4.5, 18-20 -> 4.0, 14-17 -> 3.5, 10-13 -> 3.0, 6-9 -> 2.5, 1-5 -> 2.0.

Respond strictly with valid JSON:
{
  "skill": "speaking",
  "score_30": 25,
  "toefl_band_6": 5.0,
  "rubric_scores": {
    "delivery": { "score": 4.0, "feedback": "Nhận xét tiếng Việt về phát âm, ngữ điệu, ngắt nhịp..." },
    "language_use": { "score": 4.5, "feedback": "Nhận xét tiếng Việt về cấu trúc câu, từ vựng học thuật..." },
    "topic_development": { "score": 4.0, "feedback": "Nhận xét tiếng Việt về tính mạch lạc và phát triển ý..." }
  },
  "task_breakdown": {
    "repeat": { "score_30": 26, "feedback": "Đánh giá phần lặp lại câu..." },
    "interview": { "score_30": 24, "feedback": "Đánh giá 4 câu phỏng vấn..." }
  },
  "summary_feedback": "Nhận xét tổng thể năng lực giao tiếp học thuật tiếng Anh bằng tiếng Việt...",
  "pronunciation_tips": [
    "Lưu ý 1 về trọng âm từ hoặc nối âm...",
    "Lưu ý 2 về ngữ điệu lên xuống..."
  ],
  "sample_ideal_response": "Gợi ý câu trả lời mẫu đạt band 6.0 cho một trong các câu hỏi phỏng vấn."
}
`;

  const parts = [...audioParts, { text: promptText }];
  const parsed = await generateGeminiJson(parts);

  if (parsed.score_30 && !parsed.toefl_band_6) {
    parsed.toefl_band_6 = convert30ToBand6(parsed.score_30);
  }
  return parsed;
}

/**
 * ====================================================================
 * GEMINI AI READING & LISTENING EVALUATION SERVICE (ETS MSAT 2026)
 * ====================================================================
 */
export async function evaluateObjectiveSkillTest({
  skill = 'reading',
  userSubmission = [],
  scoreRaw = 0,
  totalQuestions = 0,
  timeSpentSeconds = 0,
  testTitle = ''
}) {
  const normSkill = skill.toLowerCase();

  // Tự động tính toán lại số câu đúng chính xác từ userSubmission nếu có để đảm bảo 100% không lệch
  let actualRaw = 0;
  let actualTotal = 0;
  let hasValidSubmission = false;

  const itemsList = [];
  if (Array.isArray(userSubmission)) {
    userSubmission.forEach((mod) => {
      if (typeof mod.score_raw === 'number' && typeof mod.total_questions === 'number') {
        actualRaw += mod.score_raw;
        actualTotal += mod.total_questions;
        hasValidSubmission = true;
      }
      if (Array.isArray(mod.items)) {
        mod.items.forEach((it) => {
          if (!hasValidSubmission) {
            if (it.is_correct) actualRaw++;
            actualTotal++;
          }
          itemsList.push({
            index: itemsList.length + 1,
            module: mod.module_title || '',
            prompt: String(it.prompt || '').slice(0, 150),
            user_choice: it.user_choice || '',
            correct_answer: it.correct_answer || '',
            is_correct: Boolean(it.is_correct)
          });
        });
        if (!hasValidSubmission && mod.items.length > 0) {
          hasValidSubmission = true;
        }
      }
    });
  }

  const effectiveScoreRaw = hasValidSubmission ? actualRaw : scoreRaw;
  const effectiveTotalQuestions = hasValidSubmission && actualTotal > 0 ? actualTotal : totalQuestions;

  const scaledPrelim = convertRawToScale30(effectiveScoreRaw, effectiveTotalQuestions, normSkill);
  const bandPrelim = convert30ToBand6(scaledPrelim);

  const promptText = `
You are an expert official ETS TOEFL iBT Test Examiner evaluating a student on the TOEFL iBT 2026 ${normSkill.toUpperCase()} section.
Test Title: "${testTitle || 'TOEFL iBT 2026 Practice'}"
- Total Questions: ${effectiveTotalQuestions}
- Correct Answers: ${effectiveScoreRaw}
- Accuracy Rate: ${effectiveTotalQuestions > 0 ? ((effectiveScoreRaw / effectiveTotalQuestions) * 100).toFixed(1) : 0}%
- Time Spent: ${Math.floor(timeSpentSeconds / 60)}m ${timeSpentSeconds % 60}s

[STUDENT PERFORMANCE DETAILS]
${JSON.stringify(itemsList.slice(0, 35), null, 2)}

[ETS 2026 SCORING INSTRUCTIONS]
1. Grade the student on the official TOEFL iBT 2026 scaled score (0 - 30) taking into account MSAT adaptive stage weighting.
2. Determine TOEFL Band (1.0 - 6.0) according to ETS 2026 standards.
3. Diagnose question-type mastery (Vocabulary in context, Details, Negative factual, Inference, Rhetorical purpose, Main idea, Tone).
4. Identify why the student made mistakes and give targeted advice in Vietnamese.

Respond strictly with valid JSON:
{
  "skill": "${normSkill}",
  "scaled_score_30": ${scaledPrelim},
  "toefl_band_6": ${bandPrelim},
  "accuracy_rate": ${effectiveTotalQuestions > 0 ? Number(((effectiveScoreRaw / effectiveTotalQuestions) * 100).toFixed(1)) : 0},
  "summary_assessment": "Nhận xét tổng quan bằng tiếng Việt về kỹ năng ${normSkill} của thí sinh...",
  "strengths": ["Điểm mạnh 1", "Điểm mạnh 2"],
  "weaknesses": ["Điểm cần khắc phục 1", "Điểm cần khắc phục 2"],
  "question_type_mastery": [
    { "type": "Từ vựng học thuật", "status": "Tốt", "advice": "..." },
    { "type": "Suy luận & Ý chính", "status": "Cần lưu ý", "advice": "..." }
  ],
  "actionable_tips": [
    "Chiến thuật 1...",
    "Chiến thuật 2..."
  ]
}
`;

  try {
    const parsed = await generateGeminiJson(promptText);
    if (parsed.scaled_score_30 === undefined) parsed.scaled_score_30 = scaledPrelim;
    if (!parsed.toefl_band_6) parsed.toefl_band_6 = convert30ToBand6(parsed.scaled_score_30);
    if (parsed.accuracy_rate === undefined) {
      parsed.accuracy_rate = effectiveTotalQuestions > 0 ? Number(((effectiveScoreRaw / effectiveTotalQuestions) * 100).toFixed(1)) : 0;
    }
    return parsed;
  } catch (err) {
    console.warn(`Fallback to calibrated score for ${normSkill}:`, err);
    return {
      skill: normSkill,
      scaled_score_30: scaledPrelim,
      toefl_band_6: bandPrelim,
      accuracy_rate: effectiveTotalQuestions > 0 ? Number(((effectiveScoreRaw / effectiveTotalQuestions) * 100).toFixed(1)) : 0,
      summary_assessment: `Thí sinh đạt ${effectiveScoreRaw}/${effectiveTotalQuestions} câu đúng (${((effectiveScoreRaw / (effectiveTotalQuestions || 1)) * 100).toFixed(0)}%). Quy đổi thang điểm TOEFL 2026 đạt ${scaledPrelim}/30 (Band ${bandPrelim.toFixed(1)}).`,
      strengths: ['Đã hoàn thành toàn bộ các module trong thời gian quy định.'],
      weaknesses: ['Cần rà soát các câu hỏi chưa chính xác để nâng band điểm.'],
      question_type_mastery: [
        { type: 'Tổng quát', status: scaledPrelim >= 24 ? 'Tốt' : 'Trung bình', advice: 'Tiếp tục luyện tập đề thi thử.' }
      ],
      actionable_tips: ['Tập trung ôn luyện các dạng câu hỏi có tỷ lệ sai cao.']
    };
  }
}

/**
 * ====================================================================
 * GEMINI AI FULL 4-SKILL COMPREHENSIVE EVALUATION (TOEFL 2026 120 SCALE)
 * ====================================================================
 */
export async function evaluateFullExamTest({
  readingScore = 26,
  listeningScore = 25,
  writingScore = 26,
  speakingScore = 25,
  testTitle = 'TOEFL iBT Full Simulation'
}) {
  const total120 = readingScore + listeningScore + writingScore + speakingScore;
  const overallBand = convert30ToBand6(total120 / 4);

  const promptText = `
You are an official ETS TOEFL Senior Assessment Director evaluating a student's complete TOEFL iBT 2026 Full Simulation Exam (All 4 Skills: Reading, Listening, Writing, Speaking).
Test Title: "${testTitle}"

[OFFICIAL SECTION SCORES]
- Reading: ${readingScore} / 30
- Listening: ${listeningScore} / 30
- Writing: ${writingScore} / 30
- Speaking: ${speakingScore} / 30
- Total Composite: ${total120} / 120
- Overall Band (2026): ${overallBand.toFixed(1)} / 6.0

Provide a high-level, comprehensive executive diagnostic report in Vietnamese:
{
  "total_score_120": ${total120},
  "overall_band_6": ${overallBand},
  "cefr_level": "${total120 >= 100 ? 'C1 (Advanced)' : total120 >= 80 ? 'B2 (Vantage)' : 'B1 (Threshold)'}",
  "executive_summary": "Đánh giá tổng quan năng lực 4 kỹ năng của thí sinh...",
  "receptive_vs_productive": {
    "receptive_score": ${readingScore + listeningScore},
    "productive_score": ${writingScore + speakingScore},
    "analysis": "So sánh giữa kỹ năng tiếp nhận (Reading + Listening) và sản sinh (Writing + Speaking)..."
  },
  "top_strengths": ["...", "..."],
  "critical_improvements": ["...", "..."],
  "study_roadmap_4_weeks": [
    { "week": "Tuần 1", "focus": "..." },
    { "week": "Tuần 2", "focus": "..." },
    { "week": "Tuần 3", "focus": "..." },
    { "week": "Tuần 4", "focus": "..." }
  ]
}
`;

  try {
    const parsed = await generateGeminiJson(promptText);
    parsed.total_score_120 = total120;
    parsed.overall_band_6 = overallBand;
    return parsed;
  } catch (err) {
    return {
      total_score_120: total120,
      overall_band_6: overallBand,
      cefr_level: total120 >= 100 ? 'C1 (Advanced)' : total120 >= 80 ? 'B2 (Vantage)' : 'B1 (Threshold)',
      executive_summary: `Thí sinh hoàn thành bài thi 4 kỹ năng với tổng điểm ${total120}/120 (Band ${overallBand.toFixed(1)}/6.0).`,
      receptive_vs_productive: {
        receptive_score: readingScore + listeningScore,
        productive_score: writingScore + speakingScore,
        analysis: 'Điểm số giữa các kỹ năng khá đồng đều.'
      },
      top_strengths: ['Hoàn thành đầy đủ 4 kỹ năng theo đúng chuẩn thời lượng ETS.'],
      critical_improvements: ['Cần tập trung củng cố kỹ năng có điểm số thấp nhất để kéo điểm tổng.'],
      study_roadmap_4_weeks: [
        { week: 'Tuần 1', focus: 'Rà soát lỗi sai từ bài thi.' },
        { week: 'Tuần 2', focus: 'Tăng tốc độ đọc hiểu và nghe học thuật.' },
        { week: 'Tuần 3', focus: 'Luyện đề nói và viết theo tiêu chí chấm ETS 2026.' },
        { week: 'Tuần 4', focus: 'Làm bài thi thử 4 kỹ năng hoàn chỉnh.' }
      ]
    };
  }
}

/**
 * Chuẩn hóa Title của đề thi theo yêu cầu: [Reading,Speaking...] Full Test - Ngày tạo - Giờ và phút tạo
 * Ví dụ: "Reading Full Test - 23/09/2026 - 12:10"
 */
export function formatExamTitle(skill = 'reading', taskType = '', dateVal = Date.now()) {
  const d = dateVal ? new Date(dateVal) : new Date();
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const dateStr = `${day}/${month}/${year}`;
  const timeStr = `${hours}:${minutes}`;

  const s = (skill || '').toLowerCase();
  
  if (s === 'full' || s === 'full_test') {
    return `Full Test - ${dateStr} - ${timeStr}`;
  }
  if (s === 'reading') {
    return `Reading Full Test - ${dateStr} - ${timeStr}`;
  }
  if (s === 'listening') {
    return `Listening Full Test - ${dateStr} - ${timeStr}`;
  }
  if (s === 'speaking') {
    return `Speaking Full Test - ${dateStr} - ${timeStr}`;
  }
  if (s === 'writing') {
    if (taskType === 'build_sentence' || taskType === 'sentence' || taskType === 'writing_sentence') {
      return `Writing (Ghép câu) Full Test - ${dateStr} - ${timeStr}`;
    }
    if (taskType === 'write_email' || taskType === 'email' || taskType === 'writing_email') {
      return `Writing (Email) Full Test - ${dateStr} - ${timeStr}`;
    }
    if (taskType === 'academic_discussion' || taskType === 'discussion' || taskType === 'writing_discussion') {
      return `Writing (Discussion) Full Test - ${dateStr} - ${timeStr}`;
    }
    return `Writing Full Test - ${dateStr} - ${timeStr}`;
  }

  const capitalized = s.charAt(0).toUpperCase() + s.slice(1);
  return `${capitalized} Full Test - ${dateStr} - ${timeStr}`;
}

/**
 * ====================================================================
 * GEMINI AI AUTOMATIC EXAM GENERATOR SERVICE (ETS TOEFL 2026)
 * Tự động tạo bộ đề thi TOEFL 2026 bằng Gemini AI và tự động lưu vào Database
 * ====================================================================
 */
export async function generateExamWithGemini({
  skillType = 'full',
  promptText = '',
  customTopic = '',
  onProgress = null
}) {
  const geminiKey = getGeminiApiKey();
  const openRouterKey = getOpenRouterApiKey();

  if (!geminiKey && !openRouterKey) {
    throw new Error('Chưa cấu hình API Key (Gemini hoặc OpenRouter trong .env hoặc Cài đặt).');
  }

  onProgress?.('Đang chuẩn bị prompt chuẩn ETS 2026...');

  let finalPrompt = promptText;
  if (!finalPrompt || !finalPrompt.trim()) {
    finalPrompt = getExamPrompt(skillType);
  }

  if (customTopic && customTopic.trim()) {
    finalPrompt += `\n\n⚠️ YÊU CẦU ĐẶC BIỆT VỀ CHỦ ĐỀ NỘI DUNG:
Hãy xây dựng các bối cảnh, câu hỏi và bài đọc/nghe/nói/viết xoay quanh chủ đề: "${customTopic.trim()}".`;
  }

  const isWritingSub = skillType.startsWith('writing_');
  const actualSkill = isWritingSub ? 'writing' : skillType;

  let lastError = null;
  let rawJsonText = '';
  let providerUsed = 'gemini';

  // 1. Thử gọi Google Gemini trước nếu có key
  if (geminiKey) {
    onProgress?.('Hệ thống đang soạn thảo nội dung đề thi & câu hỏi...');
    const modelsToTry = [DEFAULT_GEMINI_MODEL, ...FALLBACK_MODELS];

    for (const model of modelsToTry) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: finalPrompt }]
              }
            ],
            systemInstruction: {
              parts: [{ text: 'You are an elite ETS TOEFL iBT 2026 test developer and psychometrician. Your task is to produce strictly valid, raw JSON tests matching the requested schema with 100% fidelity to ETS difficulty, structure, and quality standards (CEFR C1/C2 academic register). NEVER truncate, omit, abbreviate, or use placeholders (such as "..." or shortened samples). Generate EVERY single blank, question, option, decoy, and passage in full as mandated by the quantitative criteria. Output strictly raw valid JSON only without markdown code blocks, preamble, or outside commentary.' }]
            },
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.3,
              maxOutputTokens: skillType === 'full' ? 16384 : 8192
            }
          })
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData?.error?.message || `HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        rawJsonText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!rawJsonText) {
          throw new Error('API không trả về nội dung đề thi.');
        }
        break;
      } catch (err) {
        lastError = err;
        console.warn(`Lỗi khi gọi model ${model} để sinh đề:`, err.message);
      }
    }
  }

  // 2. Dự phòng OpenRouter: Khi Gemini quá tải (503 High demand/429 Quota) hoặc không có key
  if (!rawJsonText && openRouterKey) {
    onProgress?.('Đang tự động chuyển sang luồng xử lý dự phòng...');
    providerUsed = 'openrouter';
    try {
      rawJsonText = await callOpenRouterChat({
        prompt: finalPrompt,
        systemInstruction: 'You are an elite ETS TOEFL iBT 2026 test developer and psychometrician. Adhere strictly to CEFR C1/C2 academic standards. NEVER truncate, omit, abbreviate, or use placeholders. Generate EVERY single blank, question, option, decoy, and passage in full as mandated by the quantitative criteria. Respond strictly with raw valid JSON matching the requested schema without any markdown formatting or commentary outside JSON.',
        maxTokens: skillType === 'full' ? 16384 : 8192,
        temperature: 0.3,
        responseFormatJson: true,
        onProgress
      });
    } catch (openRouterErr) {
      console.error('Lỗi khi gọi OpenRouter sinh đề:', openRouterErr);
      throw new Error(`Không thể sinh đề thi do sự cố kết nối: ${openRouterErr.message}`);
    }
  }

  if (!rawJsonText) {
    throw new Error(lastError?.message || 'Không thể kết nối đến hệ thống AI để sinh đề.');
  }

  onProgress?.('Đang đối soát cấu trúc đề thi và ma trận câu hỏi...');

  let cleaned = rawJsonText.trim();
  if (cleaned.includes('```')) {
    const blockMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)(?:```|$)/i);
    if (blockMatch) {
      cleaned = blockMatch[1].trim();
    } else {
      cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
    }
  }
  cleaned = cleaned.replace(/[\u201C\u201D]/g, '"').replace(/[\u2018\u2019]/g, "'");

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e1) {
    try {
      parsed = JSON.parse(jsonrepair(cleaned));
    } catch (e2) {
      const pre = cleaned.replace(/,\s*([\]}])/g, '$1');
      parsed = JSON.parse(jsonrepair(pre));
    }
  }

  let actualData = parsed;
  if (actualData && typeof actualData === 'object' && !Array.isArray(actualData)) {
    if (Array.isArray(actualData.tests)) actualData = actualData.tests;
    else if (actualData.test && typeof actualData.test === 'object') actualData = [actualData.test];
    else if (Array.isArray(actualData.data)) actualData = actualData.data;
    else if (actualData.practice_test && typeof actualData.practice_test === 'object') actualData = [actualData.practice_test];
    else if (actualData.exam && typeof actualData.exam === 'object') actualData = [actualData.exam];
  }

  let testsArray = Array.isArray(actualData) ? actualData : [actualData];
  if (testsArray.length === 0) {
    throw new Error('Dữ liệu AI trả về không chứa đề thi hợp lệ.');
  }

  const timestamp = Date.now();
  testsArray = testsArray.map((t, idx) => {
    let s = (t.skill || actualSkill || 'full').toLowerCase();
    if (s.startsWith('writing_')) s = 'writing';

    let defaultDuration = 1800;
    if (s === 'full') defaultDuration = 5400;
    else if (t.task_type === 'build_sentence' || skillType === 'writing_sentence') defaultDuration = 420;
    else if (t.task_type === 'write_email' || skillType === 'writing_email') defaultDuration = 420;
    else if (t.task_type === 'academic_discussion' || skillType === 'writing_discussion') defaultDuration = 600;
    else if (s === 'writing') defaultDuration = 1380;
    else if (s === 'speaking') defaultDuration = 480;

    let subLabel = '';
    let determinedTaskType = t.task_type;
    if (skillType === 'writing_sentence' || t.task_type === 'build_sentence') {
      subLabel = ' (Ghép câu 7p)';
      determinedTaskType = 'build_sentence';
    } else if (skillType === 'writing_email' || t.task_type === 'write_email') {
      subLabel = ' (Viết Email 7p)';
      determinedTaskType = 'write_email';
    } else if (skillType === 'writing_discussion' || t.task_type === 'academic_discussion') {
      subLabel = ' (Discussion 10p)';
      determinedTaskType = 'academic_discussion';
    }

    const clientTimestamp = Date.now();
    const clientIso = new Date(clientTimestamp).toISOString();
    const testStages = t.stages || t.content?.stages;
    const testModules = t.modules || t.content?.modules;

    const formattedTitle = formatExamTitle(s, determinedTaskType, clientTimestamp);

    return {
      ...t,
      id: t.id || `test_ai_${clientTimestamp}_${idx + 1}`,
      title: formattedTitle,
      skill: s,
      task_type: determinedTaskType,
      duration_seconds: t.duration_seconds || defaultDuration,
      stages: testStages,
      modules: testModules,
      created_at: clientIso,
      created_at_ms: clientTimestamp,
      content: {
        ...(t.content || {}),
        stages: testStages,
        modules: testModules,
        created_at: clientIso,
        created_at_ms: clientTimestamp
      }
    };
  });

  onProgress?.('Đang tự động đẩy đề thi lên Database...');

  const importResult = await importBatchTests(testsArray);

  return {
    success: true,
    count: testsArray.length,
    tests: testsArray,
    provider: providerUsed,
    destination: importResult.destination,
    rawJson: JSON.stringify(testsArray, null, 2)
  };
}

/**
 * ====================================================================
 * TỪ ĐIỂN & DỊCH THUẬT AI (SMART DICTIONARY & TRANSLATOR)
 * Hỗ trợ dịch tự động dự phòng: Google Gemini -> OpenRouter
 * ====================================================================
 */

/**
 * Tra cứu nghĩa từ vựng tiếng Anh đơn lẻ bằng AI khi database chưa có
 */
export async function lookupWordWithAi(word) {
  const cleanWord = (word || '').trim().replace(/^['"“‘.,;!?()\[\]{}]+|['"”’.,;!?()\[\]{}]+$/g, '');
  if (!cleanWord) throw new Error('Từ vựng cần tra cứu không hợp lệ.');

  const prompt = `Bạn là chuyên gia từ điển học thuật và luyện thi TOEFL iBT 2026.
Hãy tra nghĩa và giải nghĩa từ tiếng Anh sau sang tiếng Việt:
Từ vựng: "${cleanWord}"

YÊU CẦU:
1. Trả về đúng 1 đối tượng JSON duy nhất theo schema:
{
  "word": "${cleanWord}",
  "phonetic": "/.../ (phiên âm chuẩn quốc tế IPA)",
  "partOfSpeech": "loại từ (danh từ, động từ, tính từ, trạng từ...)",
  "meaningVi": "Nghĩa tiếng Việt rõ ràng, chuẩn xác, ưu tiên ngữ cảnh học thuật nếu có",
  "meaningEn": "Định nghĩa tiếng Anh ngắn gọn",
  "example": "Một câu ví dụ học thuật tiếng Anh tự nhiên",
  "exampleTranslation": "Bản dịch tiếng Việt của câu ví dụ"
}
2. TUYỆT ĐỐI không viết bất kỳ ký tự nào ngoài JSON hợp lệ.`;

  const result = await generateGeminiJson(prompt, 'You are an expert bilingual academic English-Vietnamese dictionary. Respond strictly with a single JSON object.');
  return {
    found: true,
    word: result.word || cleanWord,
    phonetic: result.phonetic || '',
    partOfSpeech: result.partOfSpeech || '',
    meaningVi: result.meaningVi || result.meaning || '',
    meaningEn: result.meaningEn || '',
    example: result.example || '',
    exampleTranslation: result.exampleTranslation || '',
    source: 'ai'
  };
}

/**
 * Dịch cụm từ hoặc đoạn văn bản tiếng Anh sang tiếng Việt bằng AI
 */
export async function translateTextWithAi(text) {
  const cleanText = (text || '').trim();
  if (!cleanText) throw new Error('Văn bản cần dịch không được để trống.');

  const prompt = `Bạn là chuyên gia dịch thuật Anh - Việt cao cấp, chuyên sâu học thuật và kỳ thi TOEFL.
Hãy dịch cụm từ hoặc đoạn văn bản sau sang tiếng Việt tự nhiên, chuẩn xác, lưu loát và đúng văn phong:
"${cleanText}"

YÊU CẦU:
1. Trả về đúng 1 đối tượng JSON duy nhất theo schema:
{
  "translatedText": "Nội dung bản dịch tiếng Việt hoàn chỉnh, tự nhiên",
  "note": "Ghi chú ngắn về thành ngữ, thuật ngữ học thuật hoặc ngữ pháp đáng chú ý nếu có (để rỗng nếu không có)"
}
2. TUYỆT ĐỐI không viết bất kỳ ký tự nào ngoài JSON hợp lệ.`;

  const result = await generateGeminiJson(prompt, 'You are an expert academic English-Vietnamese translator. Respond strictly with a single JSON object.');
  return {
    originalText: cleanText,
    translatedText: result.translatedText || '',
    note: result.note || '',
    source: 'ai'
  };
}


