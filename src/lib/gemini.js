import { jsonrepair } from 'jsonrepair';

// ====================================================================
// GEMINI AI WRITING EVALUATION SERVICE (ETS TOEFL 2026 RUBRIC)
// ====================================================================

// Lấy API Key từ biến môi trường Vite (.env hoặc Vercel)
export function getGeminiApiKey() {
  return (
    import.meta.env?.VITE_GEMINI_API_KEY ||
    import.meta.env?.GEMINI_API_KEY ||
    ''
  ).trim();
}

// Kiểm tra xem đã cấu hình API Key chưa
export function isGeminiConfigured() {
  return Boolean(getGeminiApiKey());
}

// Model mặc định theo chuẩn Google Gen AI hiện hành
export const DEFAULT_GEMINI_MODEL = 'gemini-3.8-flash';
export const FALLBACK_MODELS = ['gemini-flash-latest', 'gemini-3.5-flash-lite'];

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
 * Gọi API Gemini để chấm điểm 1 bài viết đơn lẻ
 */
export async function evaluateSingleWritingEssay({ taskType, taskData, essayText }) {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error('Chưa cấu hình VITE_GEMINI_API_KEY trong file .env hoặc Vercel Environment Variables.');
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

  // Thử gọi các model theo thứ tự ưu tiên
  const modelsToTry = [DEFAULT_GEMINI_MODEL, ...FALLBACK_MODELS];
  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      
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
      // Thử model tiếp theo trong danh sách
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
 * Hàm chung gọi Gemini API an toàn với cơ chế thử lại model dự phòng
 */
export async function generateGeminiJson(parts, systemInstruction = '') {
  const apiKey = getGeminiApiKey();
  if (!apiKey) throw new Error('Chưa cấu hình Gemini API Key.');

  const modelsToTry = [DEFAULT_GEMINI_MODEL, ...FALLBACK_MODELS];
  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
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
  const scaledPrelim = convertRawToScale30(scoreRaw, totalQuestions, normSkill);
  const bandPrelim = convert30ToBand6(scaledPrelim);

  const itemsList = [];
  if (Array.isArray(userSubmission)) {
    userSubmission.forEach((mod) => {
      if (Array.isArray(mod.items)) {
        mod.items.forEach((it) => {
          itemsList.push({
            index: itemsList.length + 1,
            module: mod.module_title || '',
            prompt: String(it.prompt || '').slice(0, 150),
            user_choice: it.user_choice || '',
            correct_answer: it.correct_answer || '',
            is_correct: Boolean(it.is_correct)
          });
        });
      }
    });
  }

  const promptText = `
You are an expert official ETS TOEFL iBT Test Examiner evaluating a student on the TOEFL iBT 2026 ${normSkill.toUpperCase()} section.
Test Title: "${testTitle || 'TOEFL iBT 2026 Practice'}"
- Total Questions: ${totalQuestions}
- Correct Answers: ${scoreRaw}
- Accuracy Rate: ${totalQuestions > 0 ? ((scoreRaw / totalQuestions) * 100).toFixed(1) : 0}%
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
  "accuracy_rate": ${totalQuestions > 0 ? Number(((scoreRaw / totalQuestions) * 100).toFixed(1)) : 0},
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
    return parsed;
  } catch (err) {
    console.warn(`Fallback to calibrated score for ${normSkill}:`, err);
    return {
      skill: normSkill,
      scaled_score_30: scaledPrelim,
      toefl_band_6: bandPrelim,
      accuracy_rate: totalQuestions > 0 ? Number(((scoreRaw / totalQuestions) * 100).toFixed(1)) : 0,
      summary_assessment: `Thí sinh đạt ${scoreRaw}/${totalQuestions} câu đúng (${((scoreRaw / (totalQuestions || 1)) * 100).toFixed(0)}%). Quy đổi thang điểm TOEFL 2026 đạt ${scaledPrelim}/30 (Band ${bandPrelim.toFixed(1)}).`,
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
