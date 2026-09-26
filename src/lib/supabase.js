import { createClient } from '@supabase/supabase-js';
import { DEFAULT_TESTS } from '../data/defaultTests.js';
import { VOCABULARY_DECKS } from '../data/vocabularyData.js';
import EXTENDED_CONTEXT_VOCAB_BANK from '../data/contextVocabData.js';
import SPEAKING_REPEAT_BANK from '../data/speakingRepeatData.js';
import SPEAKING_45S_BANK from '../data/speaking45sData.js';

// Lấy config từ biến môi trường Vercel / Vite
// Hỗ trợ cả tiền tố VITE_ (chuẩn Vite) và không có VITE_ (khi kết nối Supabase qua Vercel Integration)
export const getEnvUrl = () => 
  (import.meta.env?.VITE_SUPABASE_URL || import.meta.env?.SUPABASE_URL || '').trim();

export const getEnvKey = () => 
  (import.meta.env?.VITE_SUPABASE_ANON_KEY || 
   import.meta.env?.VITE_SUPABASE_KEY || 
   import.meta.env?.SUPABASE_ANON_KEY || 
   import.meta.env?.SUPABASE_KEY || 
   '').trim();

export function isEnvConfigured() {
  return !!getEnvUrl() && !!getEnvKey();
}

// Thứ tự ưu tiên:
// 1. Nếu người dùng tự cấu hình ghi đè trong SettingsModal (localStorage)
// 2. Nếu không, tự động đọc từ Biến môi trường Vercel (import.meta.env)
const getStoredUrl = () => {
  if (typeof localStorage !== 'undefined') {
    const local = localStorage.getItem('toefl_supabase_url');
    if (local && local.trim()) return local.trim();
  }
  return getEnvUrl();
};

const getStoredKey = () => {
  if (typeof localStorage !== 'undefined') {
    const local = localStorage.getItem('toefl_supabase_key');
    if (local && local.trim()) return local.trim();
  }
  return getEnvKey();
};

let supabaseInstance = null;

export function initSupabase(url, key) {
  if (url && key) {
    try {
      supabaseInstance = createClient(url, key);
      return supabaseInstance;
    } catch (e) {
      console.error('Lỗi khởi tạo Supabase client:', e);
      return null;
    }
  }
  return null;
}

// Khởi tạo ban đầu (ưu tiên Biến môi trường Vercel nếu không có ghi đè ở local)
initSupabase(getStoredUrl(), getStoredKey());

export function isSupabaseConfigured() {
  return !!supabaseInstance && !!getStoredUrl() && !!getStoredKey();
}

export function saveSupabaseConfig(url, key) {
  if (url && key) {
    localStorage.setItem('toefl_supabase_url', url.trim());
    localStorage.setItem('toefl_supabase_key', key.trim());
    initSupabase(url.trim(), key.trim());
  } else {
    // Xóa ghi đè thủ công
    localStorage.removeItem('toefl_supabase_url');
    localStorage.removeItem('toefl_supabase_key');
    
    // Nếu có biến môi trường Vercel thì tự động khôi phục về biến môi trường
    const envUrl = getEnvUrl();
    const envKey = getEnvKey();
    if (envUrl && envKey) {
      initSupabase(envUrl, envKey);
    } else {
      supabaseInstance = null;
    }
  }
}

export function getSupabaseConfig() {
  const localUrl = localStorage.getItem('toefl_supabase_url');
  const localKey = localStorage.getItem('toefl_supabase_key');
  const hasLocalOverride = !!(localUrl && localUrl.trim() && localKey && localKey.trim());
  
  return {
    url: getStoredUrl(),
    key: getStoredKey(),
    isFromEnv: isEnvConfigured() && !hasLocalOverride,
    hasLocalOverride,
    envConfigured: isEnvConfigured()
  };
}

// =================================================================
// CÁC HÀM XỬ LÝ DỮ LIỆU (TỰ ĐỘNG CHUYỂN GIỮA SUPABASE VÀ LOCALSTORAGE)
// =================================================================

// =================================================================
// CHUẨN HÓA DẠNG BÀI COMPLETE THE WORDS (FORMAT ETS 2026)
// Tự động nhận diện hoặc tạo ô trống prefix[missing] cho mọi trường hợp:
// 1. Đã có ngoặc [missing]
// 2. Có mảng blanks nhưng đoạn văn là chữ thường
// 3. Đoạn văn thuần chưa có blanks: Tự động trích xuất theo quy chế ETS 2026
// =================================================================
export function normalizeCompleteWordsTask(task, taskUniqueId) {
  if (!task || task.task_type !== 'complete_words') return task;
  const taskId = taskUniqueId || task.id || 'cw';

  const content = task.content || {};
  let paragraph = content.paragraph || content.text || content.passage || '';
  let blanks = content.blanks ? [...content.blanks] : [];

  const bracketRegex = /([A-Za-z]+)\[([A-Za-z]+)\]/g;
  let matches = [...paragraph.matchAll(bracketRegex)];

  if (matches.length > 0) {
    // Luôn tạo danh sách blanks khớp 100% với số lượng ô trống [missing] thực tế trong đoạn văn
    blanks = matches.map((m, idx) => ({
      id: `${taskId}_b${idx + 1}`,
      prefix: m[1],
      missing: m[2],
      full: `${m[1]}${m[2]}`
    }));
  } else if (blanks && blanks.length > 0) {
    // Có mảng blanks nhưng đoạn văn chưa gắn dấu ngoặc [missing]
    blanks = blanks.map((b, idx) => {
      const rawId = b.id || `b${idx + 1}`;
      const id = rawId.startsWith(`${taskId}_`) ? rawId : `${taskId}_${rawId}`;
      const fullWord = b.full || (b.prefix && b.missing ? `${b.prefix}${b.missing}` : '');
      const prefix = b.prefix || (fullWord ? fullWord.slice(0, Math.ceil(fullWord.length / 2)) : '');
      const missing = b.missing || (fullWord && prefix ? fullWord.slice(prefix.length) : '');
      const full = fullWord || `${prefix}${missing}`;

      if (full && paragraph) {
        // Tìm từ nguyên vẹn trong đoạn văn
        const wordRegex = new RegExp(`\\b${full}\\b`, 'i');
        if (wordRegex.test(paragraph)) {
          paragraph = paragraph.replace(wordRegex, `${prefix}[${missing}]`);
        } else if (prefix) {
          // Hoặc tìm prefix kèm dấu gạch dưới / chấm (ví dụ biolog___)
          const prefixRegex = new RegExp(`\\b${prefix}(?:_+|\\.+|[A-Za-z]*)\\b`, 'i');
          if (prefixRegex.test(paragraph)) {
            paragraph = paragraph.replace(prefixRegex, `${prefix}[${missing}]`);
          }
        }
      }

      return { id, prefix, missing, full };
    });
  } else if (paragraph) {
    // Tự động tạo ô trống theo chuẩn ETS 2026 nếu đoạn văn thuần không có ngoặc và không có blanks
    const stopWords = new Set([
      'their', 'there', 'about', 'other', 'after', 'these', 'those', 'would', 'could', 'should',
      'where', 'which', 'while', 'under', 'between', 'during', 'through', 'before', 'because', 'often'
    ]);
    const sentences = paragraph.split(/(?<=[.?!])\s+/);
    let blankIdx = 0;
    const newBlanks = [];

    const processedSentences = sentences.map((sent, sIdx) => {
      if (sIdx === 0 && sentences.length > 1) return sent; // Giữ nguyên câu mở đầu làm ngữ cảnh
      const words = sent.split(/(\s+)/);
      let contentWordCount = 0;

      const processedWords = words.map((chunk) => {
        const m = chunk.match(/^([^A-Za-z]*)([A-Za-z]+)([^A-Za-z]*)$/);
        if (!m) return chunk;
        const leading = m[1];
        const word = m[2];
        const trailing = m[3];

        if (word.length >= 5 && !stopWords.has(word.toLowerCase())) {
          contentWordCount++;
          if (contentWordCount % 2 === 1) { // Chọn cách từ để tạo ô trống
            blankIdx++;
            const prefixLen = Math.ceil(word.length / 2);
            const prefix = word.slice(0, prefixLen);
            const missing = word.slice(prefixLen);
            newBlanks.push({
              id: `${taskId}_b${blankIdx}`,
              prefix,
              missing,
              full: word
            });
            return `${leading}${prefix}[${missing}]${trailing}`;
          }
        }
        return chunk;
      });

      return processedWords.join('');
    });

    paragraph = processedSentences.join(' ');
    blanks = newBlanks;
  }

  return {
    ...task,
    id: taskId,
    content: {
      ...content,
      paragraph,
      blanks
    }
  };
}

// =================================================================
// CHUẨN HÓA DẠNG BÀI BUILD A SENTENCE (WRITING TASK 1)
// 1. Chuyển tất cả các từ trong scrambled, correct_order, decoys sang chữ thường (lowercase)
//    để không lộ từ viết hoa đầu câu theo đúng yêu cầu đề thi TOEFL.
// 2. Loại bỏ sạch dấu câu thừa (như '.', '?', '!', ',', '"') khỏi các phần tử từ vựng (dấu kết câu đã có sẵn ở UI).
// 3. ĐẢM BẢO TUYỆT ĐỐI: Toàn bộ các từ trong correct_order BẮT BUỘC phải có mặt trong kho từ (scrambled).
//    Nếu AI bị sót từ trong scrambled, hệ thống tự động bù từ thiếu vào scrambled để không bị thiếu từ ghép.
// 4. Đảo lộn xộn ngẫu nhiên mảng scrambled nếu AI trả về đúng thứ tự hoặc gần đúng thứ tự.
// =================================================================
export function normalizeBuildSentenceTask(task, taskUniqueId) {
  if (!task || task.task_type !== 'build_sentence') return task;
  const taskId = taskUniqueId || task.id || 'bs';
  const content = task.content || {};
  const items = content.items || [];
  if (!Array.isArray(items) || items.length === 0) return task;

  const cleanToken = (token) => {
    if (!token || typeof token !== 'string') return '';
    return token
      .trim()
      .replace(/^[^a-zA-Z0-9$€£%]+|[^a-zA-Z0-9$€£%]+$/g, '')
      .toLowerCase();
  };

  const shuffleArray = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const normalizedItems = items.map((item, idx) => {
    const baseId = item.id || `item${idx + 1}`;
    const uniqueId = baseId.startsWith(`${taskId}_`) ? baseId : `${taskId}_${baseId}`;

    // 1. Chuẩn hóa correct_order (lọc bỏ dấu câu đứng riêng lẻ như '.', '?')
    let correctOrder = (item.correct_order || [])
      .map(cleanToken)
      .filter((w) => w.length > 0);

    // Fallback nếu correct_order rỗng nhưng có correct_sentence
    if (correctOrder.length === 0 && item.correct_sentence) {
      correctOrder = item.correct_sentence
        .split(/\s+/)
        .map(cleanToken)
        .filter((w) => w.length > 0);
    }

    // 2. Chuẩn hóa decoys
    const decoys = (item.decoys || [])
      .map(cleanToken)
      .filter((w) => w.length > 0);

    // 3. Chuẩn hóa scrambled (kho từ)
    let rawScrambled = (item.scrambled && item.scrambled.length > 0)
      ? item.scrambled.map(cleanToken).filter((w) => w.length > 0)
      : [...correctOrder, ...decoys];

    // 4. KIỂM SOÁT TÍNH TOÀN VẸN: Đảm bảo kho từ rawScrambled chứa ĐẦY ĐỦ mọi từ trong correctOrder
    const scrambledCounts = {};
    rawScrambled.forEach((w) => {
      scrambledCounts[w] = (scrambledCounts[w] || 0) + 1;
    });

    const correctCounts = {};
    correctOrder.forEach((w) => {
      correctCounts[w] = (correctCounts[w] || 0) + 1;
    });

    Object.entries(correctCounts).forEach(([word, neededCount]) => {
      const currentCount = scrambledCounts[word] || 0;
      if (currentCount < neededCount) {
        for (let i = 0; i < neededCount - currentCount; i++) {
          rawScrambled.push(word);
        }
      }
    });

    // Bổ sung các từ bẫy (decoys) nếu chưa có trong rawScrambled
    decoys.forEach((decoy) => {
      if (!rawScrambled.includes(decoy)) {
        rawScrambled.push(decoy);
      }
    });

    // 5. Luôn xáo trộn ngẫu nhiên toàn bộ mảng scrambled
    let shuffled = shuffleArray(rawScrambled);
    // Nếu vô tình xáo trộn mà vẫn giống thứ tự câu thì đảo lại
    if (correctOrder.length > 1 && JSON.stringify(shuffled.slice(0, correctOrder.length)) === JSON.stringify(correctOrder)) {
      shuffled = shuffleArray(rawScrambled);
    }

    return {
      ...item,
      id: uniqueId,
      scrambled: shuffled,
      correct_order: correctOrder,
      decoys: decoys
    };
  });

  return {
    ...task,
    id: taskId,
    content: {
      ...content,
      items: normalizedItems
    }
  };
}

// Helper định dạng tiêu đề bài thi theo chuẩn ETS 2026: [Reading,Speaking...] Full Test - Ngày tạo - Giờ và phút tạo
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

// Helper chuẩn hóa cấu trúc đề thi thành Stages (Module 1, Module 2...)
export function normalizeTest(t) {
  let stages = t.stages || t.content?.stages;
  
  // Hỗ trợ cấu trúc Full Test có chứa các sections (Reading, Listening, Writing, Speaking)
  if (t.skill === 'full' && t.sections && !stages) {
    stages = t.sections.flatMap((sec) => {
      const secNorm = normalizeTest(sec);
      return (secNorm.stages || []).map((st) => ({
        ...st,
        skill: sec.skill,
        tasks: (st.tasks || []).map((task) => ({ ...task, skill: sec.skill }))
      }));
    });
  }

  if (!stages) {
    const rawModules = t.modules || t.content?.modules;
    if (rawModules && rawModules.length > 0) {
      if ((t.skill === 'reading' || t.skill === 'listening') && rawModules.length >= 2) {
        const mid = Math.ceil(rawModules.length / 2);
        const halfDur = Math.round((t.duration_seconds || 1800) / 2);
        stages = [
          {
            id: 'stage_1',
            title: `${t.skill === 'reading' ? 'Reading' : 'Listening'} - Module 1 (Stage 1)`,
            duration_seconds: halfDur,
            tasks: rawModules.slice(0, mid)
          },
          {
            id: 'stage_2',
            title: `${t.skill === 'reading' ? 'Reading' : 'Listening'} - Module 2 (Stage 2)`,
            duration_seconds: halfDur,
            tasks: rawModules.slice(mid)
          }
        ];
      } else {
        stages = [
          {
            id: 'stage_1',
            title: t.title || 'Module 1',
            duration_seconds: t.duration_seconds || 900,
            tasks: rawModules
          }
        ];
      }
    } else {
      stages = [
        {
          id: 'stage_1',
          title: t.title || 'Task Practice',
          duration_seconds: t.duration_seconds || 600,
          tasks: [t]
        }
      ];
    }
  }

  // Chuẩn hóa tất cả các tasks trong từng stage (Complete the Words, Build a Sentence, Multiple Choice...)
  const normalizedStages = (stages || []).map((st, sIdx) => {
    const stageId = st.id && st.id.includes(String(sIdx + 1)) ? st.id : `stage_${sIdx + 1}_${st.id || 'module'}`;
    const stageTasks = st.tasks || [];

    return {
      ...st,
      id: stageId,
      tasks: stageTasks.map((task, tIdx) => {
        // Đảm bảo taskId là DUY NHẤT tuyệt đối giữa các stage và task
        const baseTaskId = task.id || `task_${tIdx + 1}`;
        const uniqueTaskId = baseTaskId.startsWith(`${stageId}_`) ? baseTaskId : `${stageId}_${baseTaskId}`;

        let normalizedTask = {
          ...task,
          id: uniqueTaskId
        };

        if (normalizedTask.task_type === 'complete_words') {
          normalizedTask = normalizeCompleteWordsTask(normalizedTask, uniqueTaskId);
        } else if (normalizedTask.task_type === 'build_sentence') {
          normalizedTask = normalizeBuildSentenceTask(normalizedTask, uniqueTaskId);
        }

        // Chuẩn hóa questions trong task (nếu có: Daily Life, Academic Passage, Choose Response, Announcement, Conversation, Talk, Interview)
        const content = normalizedTask.content || {};
        if (content.questions && Array.isArray(content.questions)) {
          normalizedTask.content = {
            ...content,
            questions: content.questions.map((q, qIdx) => {
              const baseQId = q.id || `q${qIdx + 1}`;
              const uniqueQId = baseQId.startsWith(`${uniqueTaskId}_`) ? baseQId : `${uniqueTaskId}_${baseQId}`;
              return {
                ...q,
                id: uniqueQId
              };
            })
          };
        }

        // Chuẩn hóa items trong task (nếu có: Listen & Repeat...)
        if (content.items && Array.isArray(content.items) && normalizedTask.task_type !== 'build_sentence') {
          normalizedTask.content = {
            ...normalizedTask.content,
            items: content.items.map((it, iIdx) => {
              const baseItId = it.id || `it${iIdx + 1}`;
              const uniqueItId = baseItId.startsWith(`${uniqueTaskId}_`) ? baseItId : `${uniqueTaskId}_${baseItId}`;
              return {
                ...it,
                id: uniqueItId
              };
            })
          };
        }

        return normalizedTask;
      })
    };
  });

  const clientCreatedAt = t.created_at || t.content?.created_at;
  const clientCreatedAtMs = t.created_at_ms || t.content?.created_at_ms;

  let title = t.title;
  if (!t.is_default && title && (title.includes('Practice Exam (#') || title.includes('Full Test 02') || (title.includes('Practice Exam') && title.includes('(#')))) {
    title = formatExamTitle(t.skill, t.task_type, clientCreatedAtMs || clientCreatedAt);
  }

  return {
    ...t,
    title,
    created_at: clientCreatedAt,
    created_at_ms: clientCreatedAtMs,
    stages: normalizedStages,
    content: {
      ...(t.content || {}),
      title,
      created_at: clientCreatedAt,
      created_at_ms: clientCreatedAtMs,
      stages: normalizedStages
    },
    modules: t.modules || t.content?.modules || []
  };
}

// Lấy danh sách đề thi Full Test (4 kỹ năng liên tục)
export async function getFullTests() {
  return getTestsBySkill('full');
}

// 1. Lấy danh sách đề thi theo kỹ năng
export async function getTestsBySkill(skill) {
  let cloudTests = [];
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseInstance
        .from('tests')
        .select('*')
        .eq('skill', skill)
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data)) {
        cloudTests = data;
      }
    } catch (e) {
      console.warn('Không thể kết nối Supabase, chuyển sang chế độ offline:', e);
    }
  }

  // Kết hợp LocalStorage + Cloud Tests + Default Tests
  const local = JSON.parse(localStorage.getItem('toefl_local_tests') || '[]');
  const testsMap = new Map();

  // 1. Nạp từ local storage trước
  local.forEach((t) => {
    if (t && t.id) testsMap.set(t.id, t);
  });

  // 2. Nạp từ Supabase Cloud (đồng bộ / ghi đè nếu mới hơn)
  cloudTests.forEach((t) => {
    if (t && t.id) testsMap.set(t.id, t);
  });

  // 3. Bổ sung bộ đề chuẩn ETS 2026 nếu chưa có và chưa bị xóa
  const deletedTests = new Set(JSON.parse(localStorage.getItem('toefl_deleted_tests') || '[]'));
  DEFAULT_TESTS.forEach((d) => {
    if (!testsMap.has(d.id) && !deletedTests.has(d.id)) {
      testsMap.set(d.id, d);
    }
  });

  const allTests = Array.from(testsMap.values()).filter((t) => !deletedTests.has(t.id));
  const filtered = allTests.filter((t) => {
    const s = (t.skill || '').toLowerCase();
    const target = (skill || '').toLowerCase();
    if (target === 'full') {
      return s === 'full' || s === 'full_test';
    }
    return s === target;
  });

  // Sắp xếp bài thi mới nhất lên đầu danh sách để học viên nhìn thấy ngay
  filtered.sort((a, b) => {
    const timeA = a.created_at_ms || a.content?.created_at_ms || (a.created_at ? new Date(a.created_at).getTime() : 0);
    const timeB = b.created_at_ms || b.content?.created_at_ms || (b.created_at ? new Date(b.created_at).getTime() : 0);
    return timeB - timeA;
  });

  return filtered.map(normalizeTest);
}

// 2. Import hàng loạt đề thi (hỗ trợ cả đề Full Section nhiều modules và bài đơn)
export async function importBatchTests(testsArray) {
  const nowMs = Date.now();
  const nowIso = new Date(nowMs).toISOString();

  const preparedTests = testsArray.map((t, idx) => {
    const norm = normalizeTest(t);
    const taskType = t.task_type || (norm.stages[0]?.tasks[0]?.task_type) || 'multistage';
    const createdAt = t.created_at || nowIso;
    const createdAtMs = t.created_at_ms || (nowMs + idx);
    const testId = t.id || `test_${createdAtMs}_${Math.random().toString(36).substr(2, 5)}`;
    const content = t.content || { stages: norm.stages, modules: norm.modules };

    const skill = (t.skill || 'reading').toLowerCase();

    let title = t.title;
    if (!title || title.includes('Practice Exam (#') || title.includes('Full Test 02')) {
      title = formatExamTitle(skill, taskType, createdAtMs);
    }

    return {
      id: testId,
      title: title,
      skill: skill,
      task_type: taskType,
      duration_seconds: t.duration_seconds || 1800,
      stages: norm.stages,
      modules: norm.modules,
      content: { 
        ...content, 
        stages: norm.stages,
        created_at: createdAt,
        created_at_ms: createdAtMs
      },
      created_at: createdAt,
      created_at_ms: createdAtMs
    };
  });

  // 1. Luôn lưu vào LocalStorage để đảm bảo có đề ngay lập tức
  const local = JSON.parse(localStorage.getItem('toefl_local_tests') || '[]');
  const localMap = new Map(local.map((item) => [item.id, item]));
  preparedTests.forEach((t) => localMap.set(t.id, t));
  const updated = Array.from(localMap.values());
  localStorage.setItem('toefl_local_tests', JSON.stringify(updated));

  // 2. Nếu có cấu hình Supabase Cloud, đồng bộ lên Cloud Database
  if (isSupabaseConfigured()) {
    try {
      const preparedForSupabase = preparedTests.map((t) => {
        let skill = (t.skill || 'reading').toLowerCase();
        if (skill === 'full_test') skill = 'full';
        return {
          id: t.id,
          title: t.title,
          skill: skill,
          task_type: t.task_type,
          duration_seconds: t.duration_seconds,
          content: t.content,
          created_at: t.created_at
        };
      });

      let { data, error } = await supabaseInstance
        .from('tests')
        .upsert(preparedForSupabase)
        .select();

      if (error) {
        console.warn('Lỗi khi upsert lên Supabase (thử chèn bằng insert nếu thiếu quyền update):', error.message);
        // Fallback: Thử insert trực tiếp
        const insertRes = await supabaseInstance
          .from('tests')
          .insert(preparedForSupabase)
          .select();
        if (!insertRes.error) {
          data = insertRes.data;
          error = null;
        }
      }

      if (!error) {
        seedContextVocabToSupabase().catch(() => {});
        return { success: true, count: preparedTests.length, destination: 'Supabase Cloud & Local' };
      }
      console.warn('Lỗi khi đẩy lên Supabase (đã lưu local an toàn):', error);
    } catch (e) {
      console.error('Lỗi kết nối Supabase (đã lưu local an toàn):', e);
    }
  }

  return { success: true, count: preparedTests.length, destination: 'Local Storage' };
}

// 3. Xóa đề thi
export async function deleteTest(testId) {
  if (isSupabaseConfigured()) {
    try {
      await supabaseInstance.from('tests').delete().eq('id', testId);
    } catch (e) {
      console.error('Lỗi khi xóa đề trên Supabase:', e);
    }
  }

  const local = JSON.parse(localStorage.getItem('toefl_local_tests') || '[]');
  const updated = local.filter((t) => t.id !== testId);
  localStorage.setItem('toefl_local_tests', JSON.stringify(updated));

  // Ghi nhận ID đã xóa để không bị bộ đề mặc định nạp lại
  const deleted = JSON.parse(localStorage.getItem('toefl_deleted_tests') || '[]');
  if (!deleted.includes(testId)) {
    deleted.push(testId);
    localStorage.setItem('toefl_deleted_tests', JSON.stringify(deleted));
  }
  return true;
}

// Quản lý Dedicated Cache cho kết quả AI chấm điểm (Bảo đảm không bao giờ mất kết quả AI đã chấm)
export function getStoredAIEvaluation(testId, resultId, completedAt) {
  try {
    const cache = JSON.parse(localStorage.getItem('toefl_ai_eval_cache') || '{}');
    if (resultId && cache[resultId]) return cache[resultId];
    if (testId && completedAt && cache[`${testId}_${completedAt}`]) return cache[`${testId}_${completedAt}`];
    // CHỈ dùng fallback latest khi KHÔNG truyền resultId và KHÔNG truyền completedAt (ví dụ tra cứu chung cho đề).
    // Tuyệt đối không trả về latest khi đang tra cứu một lượt thi cụ thể (để lượt làm bài mới lần 2, lần 3 không bị gán kết quả cũ của lần 1).
    if (testId && !resultId && !completedAt && cache[`${testId}_latest`]) return cache[`${testId}_latest`];
  } catch (e) {
    // ignore
  }
  return null;
}

export function storeAIEvaluation(testId, resultId, completedAt, evaluations) {
  try {
    const cache = JSON.parse(localStorage.getItem('toefl_ai_eval_cache') || '{}');
    if (resultId) {
      cache[resultId] = { ...(cache[resultId] || {}), ...evaluations };
    }
    if (testId && completedAt) {
      cache[`${testId}_${completedAt}`] = { ...(cache[`${testId}_${completedAt}`] || {}), ...evaluations };
    }
    if (testId) {
      cache[`${testId}_latest`] = { ...(cache[`${testId}_latest`] || {}), ...evaluations };
    }
    localStorage.setItem('toefl_ai_eval_cache', JSON.stringify(cache));
  } catch (e) {
    console.error('Lỗi khi lưu toefl_ai_eval_cache:', e);
  }
}

// 4. Lưu kết quả thi (Tự động lưu song song lên Cloud Database, LocalStorage và AI Cache)
export async function saveExamResult(resultPayload) {
  const resultRecord = {
    ...resultPayload,
    id: resultPayload.id || `res_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    completed_at: resultPayload.completed_at || new Date().toISOString()
  };

  // 1. Luôn lưu vào LocalStorage để đảm bảo kết quả không bao giờ bị mất (kể cả khi mất mạng)
  try {
    const results = JSON.parse(localStorage.getItem('toefl_exam_results') || '[]');
    const filtered = results.filter((r) => r.id !== resultRecord.id);
    filtered.unshift(resultRecord);
    localStorage.setItem('toefl_exam_results', JSON.stringify(filtered));
  } catch (e) {
    console.error('Lỗi khi lưu kết quả vào LocalStorage:', e);
  }

  // 2. Lưu vào Dedicated AI Cache nếu có trường kết quả AI
  const aiPayload = {
    ai_writing_result: resultRecord.ai_writing_result || null,
    ai_speaking_result: resultRecord.ai_speaking_result || null,
    ai_objective_result: resultRecord.ai_objective_result || null,
    ai_full_result: resultRecord.ai_full_result || null
  };
  if (aiPayload.ai_writing_result || aiPayload.ai_speaking_result || aiPayload.ai_objective_result || aiPayload.ai_full_result) {
    storeAIEvaluation(resultRecord.test_id, resultRecord.id, resultRecord.completed_at, aiPayload);
  }

  // 3. Đồng bộ lên Cloud Supabase nếu người dùng đã cấu hình Project URL và Key (chạy ngầm không chặn UI)
  if (isSupabaseConfigured()) {
    (async () => {
      try {
        const sanitizedRecord = {
          ...resultRecord,
          skill_scores: {
            ...(typeof resultRecord.skill_scores === 'object' && resultRecord.skill_scores !== null ? resultRecord.skill_scores : {}),
            ai_writing_result: resultRecord.ai_writing_result || null,
            ai_speaking_result: resultRecord.ai_speaking_result || null,
            ai_objective_result: resultRecord.ai_objective_result || null,
            ai_full_result: resultRecord.ai_full_result || null,
            speaking_submissions: resultRecord.speaking_submissions || null,
            writing_submissions: resultRecord.writing_submissions || null
          }
        };

        // Thử upsert toàn bộ record lên Supabase
        const { error } = await supabaseInstance
          .from('test_results')
          .upsert([sanitizedRecord], { onConflict: 'id' });

        if (error) {
          console.warn('Lỗi khi upsert kết quả lên Supabase, thử fallback cột chuẩn:', error.message);
          // Fallback: Chỉ gửi các cột chuẩn có trong schema gốc của test_results
          const standardRecord = {
            id: sanitizedRecord.id,
            test_id: sanitizedRecord.test_id,
            skill: sanitizedRecord.skill,
            score_band: sanitizedRecord.score_band,
            score_raw: sanitizedRecord.score_raw,
            total_questions: sanitizedRecord.total_questions,
            is_full_test: sanitizedRecord.is_full_test || false,
            skill_scores: sanitizedRecord.skill_scores,
            user_submission: sanitizedRecord.user_submission,
            time_spent_seconds: sanitizedRecord.time_spent_seconds,
            completed_at: sanitizedRecord.completed_at
          };
          const { error: retryError } = await supabaseInstance
            .from('test_results')
            .upsert([standardRecord], { onConflict: 'id' });
          if (retryError) {
            console.warn('Fallback upsert Supabase cũng gặp lỗi:', retryError.message);
          }
        }
      } catch (e) {
        console.warn('Không thể kết nối Supabase khi lưu kết quả:', e);
      }
    })();
  }

  return resultRecord;
}

// 5. Lấy lịch sử làm bài của 1 đề thi (Hợp nhất thông minh Supabase + LocalStorage + AI Cache)
export async function getExamHistory(testId) {
  let supabaseRecords = [];

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseInstance
        .from('test_results')
        .select('*')
        .eq('test_id', testId)
        .order('completed_at', { ascending: false });

      if (!error && data && data.length > 0) {
        supabaseRecords = data;
      }
    } catch (e) {
      console.warn('Lỗi lấy lịch sử từ Supabase, chuyển sang đọc LocalStorage:', e);
    }
  }

  const localResults = JSON.parse(localStorage.getItem('toefl_exam_results') || '[]');
  const localRecords = localResults.filter((r) => r.test_id === testId);

  // Hợp nhất thông minh theo Map ID
  const recordMap = new Map();

  // 1. Nạp từ Supabase
  supabaseRecords.forEach((r) => {
    const aiCached = getStoredAIEvaluation(testId, r.id, r.completed_at);
    recordMap.set(r.id, {
      ...r,
      ai_writing_result: r.ai_writing_result || r.skill_scores?.ai_writing_result || aiCached?.ai_writing_result || null,
      ai_speaking_result: r.ai_speaking_result || r.skill_scores?.ai_speaking_result || aiCached?.ai_speaking_result || null,
      ai_objective_result: r.ai_objective_result || r.skill_scores?.ai_objective_result || aiCached?.ai_objective_result || null,
      ai_full_result: r.ai_full_result || r.skill_scores?.ai_full_result || aiCached?.ai_full_result || null,
      speaking_submissions: r.speaking_submissions || r.skill_scores?.speaking_submissions || null,
      writing_submissions: r.writing_submissions || r.skill_scores?.writing_submissions || null
    });
  });

  // 2. Gộp từ LocalStorage (bổ sung hoặc cập nhật trường AI nếu LocalStorage có dữ liệu mới hơn)
  localRecords.forEach((lr) => {
    const existing = recordMap.get(lr.id);
    const aiCached = getStoredAIEvaluation(testId, lr.id, lr.completed_at);
    if (!existing) {
      recordMap.set(lr.id, {
        ...lr,
        ai_writing_result: lr.ai_writing_result || aiCached?.ai_writing_result || null,
        ai_speaking_result: lr.ai_speaking_result || aiCached?.ai_speaking_result || null,
        ai_objective_result: lr.ai_objective_result || aiCached?.ai_objective_result || null,
        ai_full_result: lr.ai_full_result || aiCached?.ai_full_result || null
      });
    } else {
      recordMap.set(lr.id, {
        ...existing,
        ...lr,
        ai_writing_result: lr.ai_writing_result || existing.ai_writing_result || aiCached?.ai_writing_result || null,
        ai_speaking_result: lr.ai_speaking_result || existing.ai_speaking_result || aiCached?.ai_speaking_result || null,
        ai_objective_result: lr.ai_objective_result || existing.ai_objective_result || aiCached?.ai_objective_result || null,
        ai_full_result: lr.ai_full_result || existing.ai_full_result || aiCached?.ai_full_result || null,
        score_band: lr.score_band || existing.score_band,
        score_raw: lr.score_raw || existing.score_raw
      });
    }
  });

  const merged = Array.from(recordMap.values());
  merged.sort((a, b) => new Date(b.completed_at || 0) - new Date(a.completed_at || 0));
  return merged;
}

// 6. Đẩy toàn bộ bộ đề mẫu lên Supabase (Seed)
export async function seedDefaultsToSupabase() {
  if (!isSupabaseConfigured()) throw new Error('Chưa cấu hình Supabase!');
  
  const prepared = DEFAULT_TESTS.map((t) => ({
    title: t.title,
    skill: t.skill,
    task_type: t.task_type || (t.modules ? 'full_section' : 'practice'),
    duration_seconds: t.duration_seconds || 1800,
    content: t.content || { modules: t.modules },
    created_at: new Date().toISOString()
  }));

  const { data, error } = await supabaseInstance
    .from('tests')
    .insert(prepared)
    .select();

  if (error) throw error;
  return data.length;
}

// 7. Đẩy toàn bộ đề thi hiện có trong LocalStorage (đề tự tạo + AI sinh) lên Supabase
export async function syncAllLocalTestsToSupabase() {
  if (!isSupabaseConfigured()) throw new Error('Chưa cấu hình Supabase! Vui lòng kiểm tra cài đặt kết nối.');

  const local = JSON.parse(localStorage.getItem('toefl_local_tests') || '[]');
  if (!local || local.length === 0) {
    return { count: 0, total: 0 };
  }

  const prepared = local.map((t) => {
    let skill = (t.skill || 'reading').toLowerCase();
    if (skill === 'full_test') skill = 'full';
    return {
      id: t.id,
      title: t.title,
      skill: skill,
      task_type: t.task_type || 'practice',
      duration_seconds: t.duration_seconds || 1800,
      content: t.content || { stages: t.stages, modules: t.modules },
      created_at: t.created_at || new Date().toISOString()
    };
  });

  // Thử upsert trước
  const { data, error } = await supabaseInstance
    .from('tests')
    .upsert(prepared)
    .select();

  if (!error) {
    return { count: data?.length || prepared.length, total: prepared.length };
  }

  console.warn('Lỗi upsert hàng loạt lên Supabase, chuyển sang chèn từng đề:', error);
  let successCount = 0;
  let lastErrorMessage = error.message;
  for (const item of prepared) {
    const { error: insErr } = await supabaseInstance
      .from('tests')
      .upsert([item]);
    if (!insErr) {
      successCount++;
    } else {
      lastErrorMessage = insErr.message;
      // Thử insert nếu upsert bị lỗi RLS do thiếu quyền UPDATE
      const { error: pureInsErr } = await supabaseInstance
        .from('tests')
        .insert([item]);
      if (!pureInsErr) {
        successCount++;
      } else {
        lastErrorMessage = pureInsErr.message;
      }
    }
  }

  if (successCount === 0 && prepared.length > 0) {
    throw new Error(lastErrorMessage || 'Không thể lưu đề thi vào Supabase.');
  }

  return { count: successCount, total: prepared.length };
}

// Đẩy toàn bộ 1000+ từ vựng học thuật lên Supabase theo từng đợt (chunks)
export async function seedVocabularyToSupabase(onProgress) {
  if (!isSupabaseConfigured()) throw new Error('Chưa cấu hình Supabase! Vui lòng kiểm tra cài đặt kết nối.');

  // Lấy toàn bộ từ vựng từ VOCABULARY_DECKS
  const allDecksWords = VOCABULARY_DECKS.flatMap((d) =>
    d.words.map((w) => {
      const en = String(w.meaningEn || w.meaning || '').trim();
      const vi = String(w.meaningVi || '').trim();
      const combinedMeaning = (en && vi) ? `${en} [VI: ${vi}]` : (en || vi);

      return {
        category: d.title,
        word: w.word,
        phonetic: w.phonetic || '',
        part_of_speech: w.partOfSpeech || 'Word',
        meaning: combinedMeaning,
        example: w.example || '',
        example_translation: w.exampleTranslation || '',
        sentence_paraphrase: w.sentenceParaphrase || '',
        paraphrases: w.paraphrases || [],
        collocations: w.collocations || [],
        word_family: w.wordFamily || [],
        memory_tip: w.memoryTip || '',
        created_at: new Date().toISOString()
      };
    })
  );

  const total = allDecksWords.length;
  const chunkSize = 50;
  let inserted = 0;

  for (let i = 0; i < total; i += chunkSize) {
    const chunk = allDecksWords.slice(i, i + chunkSize);
    const { error } = await supabaseInstance
      .from('vocabulary_words')
      .upsert(chunk, { onConflict: 'category,word', ignoreDuplicates: false });

    if (error) {
      console.error('Lỗi khi seed từ vựng lên Supabase:', error);
      throw error;
    }

    inserted += chunk.length;
    if (typeof onProgress === 'function') {
      onProgress(inserted, total);
    }
  }

  return { success: true, totalInserted: inserted, total };
}

// =================================================================
// 7. QUẢN LÝ TỪ VỰNG FLASHCARDS THEO CHỦ ĐỀ (VOCABULARY DATABASE)
// =================================================================

// Chuẩn hóa 1 mục từ vựng đảm bảo đủ 7 trường thông tin theo chuẩn thiết kế
export function normalizeVocabularyWord(w, defaultCategory = 'Academic Life & Higher Education') {
  const word = String(w.word || w.term || '').trim();
  const category = String(w.category || defaultCategory).trim();
  const phonetic = String(w.phonetic || w.ipa || '').trim();
  const partOfSpeech = String(w.part_of_speech || w.partOfSpeech || w.pos || 'Word').trim();
  
  // 1. Nghĩa dễ nhớ: Tiếng Anh + Tiếng Việt
  const rawMeaning = String(w.meaning || '').trim();
  let meaningEn = String(w.meaning_en || w.meaningEn || w.definition || '').trim();
  let meaningVi = String(w.meaning_vi || w.meaningVi || w.vietnamese || '').trim();

  if (!meaningEn || !meaningVi) {
    const viMatch = rawMeaning.match(/^(.*?)\s*(?:\[VI:\s*|\|\|\|\s*)(.*?)(?:\])?$/s);
    if (viMatch && viMatch[2]) {
      if (!meaningEn) meaningEn = viMatch[1].trim();
      if (!meaningVi) meaningVi = viMatch[2].trim();
    } else if (!meaningEn && !meaningVi) {
      if (/[\u00C0-\u1EF9]/.test(rawMeaning)) {
        meaningVi = rawMeaning;
      } else {
        meaningEn = rawMeaning;
      }
    }
  }
  const meaning = meaningEn || meaningVi || rawMeaning;
  
  // 2. Paraphrases
  let paraphrases = w.paraphrases || w.synonyms || [];
  if (typeof paraphrases === 'string') {
    paraphrases = paraphrases.split(/\s*[\/,;•]\s*/).filter(Boolean);
  }
  
  // 3. Cụm thường gặp (Collocations)
  let collocations = w.collocations || [];
  if (typeof collocations === 'string') {
    collocations = collocations.split(/\s*[,;\n•]\s*/).filter(Boolean);
  }
  
  // 4. Ví dụ TOEFL & Bản dịch tiếng Việt
  const example = String(w.example || w.sentence || '').trim();
  const exampleTranslation = String(w.example_translation || w.exampleTranslation || w.translation || w.example_vi || '').trim();
  
  // 5. Paraphrase cả câu
  const sentenceParaphrase = String(w.sentence_paraphrase || w.sentenceParaphrase || w.sentence_paraphrased || '').trim();
  
  // 6. Word family
  let wordFamily = w.word_family || w.wordFamily || [];
  if (typeof wordFamily === 'string') {
    wordFamily = wordFamily.split(/\s*[,;\n•]\s*/).filter(Boolean);
  }
  
  // 7. Mẹo nhớ
  const memoryTip = String(w.memory_tip || w.memoryTip || w.toeflTip || w.tip || '').trim();

  return {
    id: w.id || `voc_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    category,
    word,
    phonetic,
    partOfSpeech,
    meaning,
    meaningEn: meaningEn || meaning,
    meaningVi,
    paraphrases: Array.isArray(paraphrases) ? paraphrases : [paraphrases],
    collocations: Array.isArray(collocations) ? collocations : [collocations],
    example,
    exampleTranslation,
    sentenceParaphrase,
    wordFamily: Array.isArray(wordFamily) ? wordFamily : [wordFamily],
    memoryTip,
    created_at: w.created_at || new Date().toISOString()
  };
}

// Lấy danh sách toàn bộ từ vựng (kết hợp Supabase + LocalStorage + Bộ từ vựng mặc định)
export async function getStoredVocabulary() {
  let cloudWords = [];
  
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseInstance
        .from('vocabulary_words')
        .select('*')
        .order('created_at', { ascending: true });

      if (!error && data && data.length > 0) {
        cloudWords = data.map((item) => normalizeVocabularyWord({
          ...item,
          partOfSpeech: item.part_of_speech,
          exampleTranslation: item.example_translation,
          sentenceParaphrase: item.sentence_paraphrase,
          wordFamily: item.word_family,
          memoryTip: item.memory_tip
        }));
      }
    } catch (e) {
      console.warn('Không thể load từ vựng từ Supabase, chuyển sang chế độ LocalStorage:', e);
    }
  }

  // Từ vựng tùy chỉnh người dùng đã import ở LocalStorage
  let localCustomWords = [];
  try {
    const local = JSON.parse(localStorage.getItem('toefl_custom_vocabulary') || '[]');
    localCustomWords = local.map((w) => normalizeVocabularyWord(w));
  } catch (e) {
    console.error(e);
  }

  // Từ vựng mặc định chất lượng cao có sẵn
  const defaultWords = VOCABULARY_DECKS.flatMap((d) => 
    d.words.map((w) => normalizeVocabularyWord({ ...w, category: d.title }))
  );

  // Gộp lại bằng Map để đảm bảo không bị trùng lặp và giữ nguyên đầy đủ nghĩa song ngữ
  const wordsMap = new Map();
  defaultWords.forEach((w) => wordsMap.set(`${(w.category || '').toLowerCase()}:::${w.word.toLowerCase()}`, w));
  localCustomWords.forEach((w) => {
    const key = `${(w.category || '').toLowerCase()}:::${w.word.toLowerCase()}`;
    const existing = wordsMap.get(key);
    wordsMap.set(key, existing ? { 
      ...existing, 
      ...w, 
      meaningEn: w.meaningEn || existing.meaningEn,
      meaningVi: w.meaningVi || existing.meaningVi, 
      exampleTranslation: w.exampleTranslation || existing.exampleTranslation 
    } : w);
  });
  cloudWords.forEach((w) => {
    const key = `${(w.category || '').toLowerCase()}:::${w.word.toLowerCase()}`;
    const existing = wordsMap.get(key);
    wordsMap.set(key, existing ? { 
      ...existing, 
      ...w, 
      meaningEn: w.meaningEn || existing.meaningEn,
      meaningVi: w.meaningVi || existing.meaningVi, 
      exampleTranslation: w.exampleTranslation || existing.exampleTranslation 
    } : w);
  });

  return Array.from(wordsMap.values());
}

// Import hàng loạt từ vựng (Tự động CHECK nếu có từ đó rồi thì BỎ QUA không import lại)
export async function importVocabularyBatch(wordsArray, defaultCategory = 'Academic Life & Higher Education') {
  if (!Array.isArray(wordsArray) || wordsArray.length === 0) {
    return { success: false, message: 'Danh sách từ vựng trống' };
  }

  // Lấy danh sách từ vựng hiện có để đối chiếu
  const currentList = await getStoredVocabulary();
  const existingSet = new Set(
    currentList.map((item) => `${(item.category || '').trim().toLowerCase()}:::${(item.word || '').trim().toLowerCase()}`)
  );

  const toInsert = [];
  let skippedCount = 0;

  for (const raw of wordsArray) {
    const norm = normalizeVocabularyWord(raw, raw.category || defaultCategory);
    if (!norm.word) continue;

    const key = `${(norm.category || '').toLowerCase()}:::${norm.word.toLowerCase()}`;
    if (existingSet.has(key)) {
      skippedCount++;
    } else {
      existingSet.add(key);
      toInsert.push(norm);
    }
  }

  if (toInsert.length > 0) {
    // 1. Lưu vào LocalStorage
    try {
      const local = JSON.parse(localStorage.getItem('toefl_custom_vocabulary') || '[]');
      const updated = [...toInsert, ...local];
      localStorage.setItem('toefl_custom_vocabulary', JSON.stringify(updated));
    } catch (e) {
      console.error('Lỗi khi lưu từ vựng vào LocalStorage:', e);
    }

    // 2. Lưu lên Supabase nếu có cấu hình
    if (isSupabaseConfigured()) {
      try {
        const prepared = toInsert.map((w) => {
          const en = String(w.meaningEn || w.meaning || '').trim();
          const vi = String(w.meaningVi || '').trim();
          const combinedMeaning = (en && vi) ? `${en} [VI: ${vi}]` : (en || vi);
          return {
            category: w.category,
            word: w.word,
            phonetic: w.phonetic,
            part_of_speech: w.partOfSpeech,
            meaning: combinedMeaning,
            paraphrases: w.paraphrases,
            collocations: w.collocations,
            example: w.example,
            example_translation: w.exampleTranslation,
            sentence_paraphrase: w.sentenceParaphrase,
            word_family: w.wordFamily,
            memory_tip: w.memoryTip,
            created_at: new Date().toISOString()
          };
        });

        const { error } = await supabaseInstance
          .from('vocabulary_words')
          .upsert(prepared, { onConflict: 'category,word', ignoreDuplicates: true });

        if (error) {
          console.warn('Lỗi lưu từ vựng lên Supabase (đã lưu dự phòng LocalStorage):', error);
        }
      } catch (e) {
        console.warn('Không thể kết nối Supabase khi lưu từ vựng:', e);
      }
    }
  }

  invalidateVocabularyCache();

  return {
    success: true,
    insertedCount: toInsert.length,
    skippedCount,
    total: wordsArray.length,
    destination: isSupabaseConfigured() ? 'Supabase Cloud & Local Storage' : 'Local Storage'
  };
}

// Xóa 1 từ vựng
export async function deleteVocabularyWord(wordId, wordText, category) {
  // Xóa khỏi LocalStorage
  try {
    const local = JSON.parse(localStorage.getItem('toefl_custom_vocabulary') || '[]');
    const updated = local.filter((w) => w.id !== wordId && !(w.word === wordText && w.category === category));
    localStorage.setItem('toefl_custom_vocabulary', JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }

  // Xóa khỏi Supabase
  if (isSupabaseConfigured()) {
    try {
      await supabaseInstance.from('vocabulary_words').delete().match({ id: wordId });
      if (wordText && category) {
        await supabaseInstance.from('vocabulary_words').delete().match({ word: wordText, category });
      }
    } catch (e) {
      console.warn('Lỗi xóa trên Supabase:', e);
    }
  }

  invalidateVocabularyCache();
  return true;
}

// ====================================================================
// TRA CỨU TỪ ĐIỂN TỪ DATABASE (SUPABASE + LOCAL STORAGE + DEFAULT DECKS)
// ====================================================================
let cachedVocabularyMap = null;

export function invalidateVocabularyCache() {
  cachedVocabularyMap = null;
}

export async function lookupWordInDatabase(rawWord) {
  if (!rawWord || typeof rawWord !== 'string') return { found: false, word: '' };
  const clean = rawWord.trim().toLowerCase().replace(/^['"“‘.,;!?()\[\]{}]+|['"”’.,;!?()\[\]{}]+$/g, '');
  if (!clean) return { found: false, word: '' };

  // 1. Nạp cache nếu chưa có trong bộ nhớ
  if (!cachedVocabularyMap) {
    try {
      const allWords = await getStoredVocabulary();
      const map = new Map();
      allWords.forEach((w) => {
        if (w.word) {
          const wLower = w.word.trim().toLowerCase();
          if (!map.has(wLower)) {
            map.set(wLower, w);
          }
        }
      });
      cachedVocabularyMap = map;
    } catch (e) {
      console.warn('Lỗi nạp cache từ điển:', e);
      cachedVocabularyMap = new Map();
    }
  }

  // A. So khớp chính xác 100%
  let match = cachedVocabularyMap.get(clean);

  // B. So khớp phái sinh hoặc biến thể từ ngữ pháp (s, es, ed, ing, ly)
  if (!match) {
    const candidates = [
      clean.replace(/s$/, ''),
      clean.replace(/es$/, ''),
      clean.replace(/ed$/, ''),
      clean.replace(/ing$/, ''),
      clean.replace(/ly$/, '')
    ].filter((c) => c && c.length >= 3 && c !== clean);

    for (const cand of candidates) {
      if (cachedVocabularyMap.has(cand)) {
        match = cachedVocabularyMap.get(cand);
        break;
      }
    }
  }

  // 2. Nếu vẫn chưa thấy và Supabase đang kết nối, thử query trực tiếp bảng vocabulary_words
  if (!match && isSupabaseConfigured() && supabaseInstance) {
    try {
      const { data, error } = await supabaseInstance
        .from('vocabulary_words')
        .select('*')
        .ilike('word', clean)
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        match = normalizeVocabularyWord({
          ...data,
          partOfSpeech: data.part_of_speech,
          exampleTranslation: data.example_translation,
          sentenceParaphrase: data.sentence_paraphrase,
          wordFamily: data.word_family,
          memoryTip: data.memory_tip
        });
        if (match && match.word) {
          cachedVocabularyMap.set(match.word.toLowerCase(), match);
        }
      }
    } catch (err) {
      console.warn('Lỗi query trực tiếp Supabase từ điển:', err);
    }
  }

  if (match) {
    return {
      found: true,
      word: match.word,
      phonetic: match.phonetic || '',
      partOfSpeech: match.partOfSpeech || '',
      meaningVi: match.meaningVi || match.meaning || '',
      meaningEn: match.meaningEn || match.meaning || '',
      example: match.example || '',
      exampleTranslation: match.exampleTranslation || '',
      category: match.category || 'Academic Vocabulary',
      source: 'database'
    };
  }

  return { found: false, word: rawWord.trim() };
}

// =================================================================
// TỪ VỰNG TRONG NGỮ CẢNH (VOCABULARY IN CONTEXT - VIC)
// Quản lý ngân hàng 50 bài đọc & câu hỏi context vocab chuẩn ETS TOEFL
// Đồng bộ giữa Supabase và LocalStorage
// =================================================================

/**
 * Lấy toàn bộ 50 câu hỏi Từ vựng trong Ngữ cảnh (kèm bài đọc hoàn chỉnh)
 * Tự động đồng bộ Supabase Cloud + LocalStorage + Bộ đề chuẩn EXTENDED_CONTEXT_VOCAB_BANK
 */
export async function getContextVocabQuestions() {
  let cloudItems = [];

  if (isSupabaseConfigured() && supabaseInstance) {
    try {
      // 1. Thử lấy từ bảng riêng context_vocab_questions nếu đã tạo
      const { data, error } = await supabaseInstance
        .from('context_vocab_questions')
        .select('*')
        .order('id', { ascending: true });

      if (!error && Array.isArray(data) && data.length > 0) {
        cloudItems = data;
      } else {
        // 2. Fallback: Kiểm tra bảng tests với skill = 'context_vocab'
        const { data: testData, error: testErr } = await supabaseInstance
          .from('tests')
          .select('content')
          .eq('skill', 'context_vocab')
          .limit(1);

        if (!testErr && testData && testData[0]?.content?.items) {
          cloudItems = testData[0].content.items;
        }
      }
    } catch (err) {
      console.warn('Lỗi đọc ngân hàng Context Vocab từ Supabase:', err);
    }
  }

  // 3. Đọc từ LocalStorage (nếu có tùy biến/offline)
  let localItems = [];
  if (typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem('toefl_context_vocab_bank');
      if (raw) localItems = JSON.parse(raw);
    } catch (err) {
      console.warn('Lỗi đọc LocalStorage context vocab:', err);
    }
  }

  // 4. Kết hợp dữ liệu: EXTENDED_CONTEXT_VOCAB_BANK làm nền móng vững chắc, merge cloud/local
  const map = new Map();
  // Nạp 50 bài đọc chuẩn
  EXTENDED_CONTEXT_VOCAB_BANK.forEach((item) => {
    if (item && item.id) map.set(item.id, item);
  });
  // Ghi đè hoặc bổ sung từ local
  localItems.forEach((item) => {
    if (item && item.id) map.set(item.id, { ...map.get(item.id), ...item });
  });
  // Ghi đè hoặc bổ sung từ cloud
  cloudItems.forEach((item) => {
    if (item && item.id) map.set(item.id, { ...map.get(item.id), ...item });
  });

  return Array.from(map.values());
}

/**
 * Đẩy ngân hàng câu hỏi lên Supabase và lưu offline vào LocalStorage
 */
export async function seedContextVocabToSupabase(customItems = null) {
  const itemsToSeed = Array.isArray(customItems) && customItems.length > 0
    ? customItems
    : EXTENDED_CONTEXT_VOCAB_BANK;

  // 1. Luôn lưu vào LocalStorage
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem('toefl_context_vocab_bank', JSON.stringify(itemsToSeed));
    } catch (e) {
      console.error('Lỗi lưu LocalStorage toefl_context_vocab_bank:', e);
    }
  }

  // 2. Đẩy lên Supabase nếu có cấu hình
  if (isSupabaseConfigured() && supabaseInstance) {
    try {
      // Thử upsert vào bảng context_vocab_questions
      const { error } = await supabaseInstance
        .from('context_vocab_questions')
        .upsert(
          itemsToSeed.map((item) => ({
            id: item.id,
            title: item.title,
            topic: item.topic,
            target_word: item.target_word,
            paragraph_index: item.paragraph_index,
            passage: item.passage,
            question: item.question,
            options: item.options,
            correct_answer: item.correct_answer,
            clue_type: item.clue_type,
            clue_signal: item.clue_signal,
            explanation: item.explanation,
            updated_at: new Date().toISOString()
          })),
          { onConflict: 'id' }
        );

      if (error) {
        // Nếu chưa tạo bảng context_vocab_questions, lưu dưới dạng 1 bản ghi trong bảng tests
        console.warn('Bảng context_vocab_questions chưa tồn tại hoặc lỗi, lưu vào tests table:', error.message);
        await supabaseInstance
          .from('tests')
          .upsert({
            id: 'context_vocab_master_bank_50',
            title: 'TOEFL Vocabulary-in-Context Bank (50 Questions)',
            skill: 'context_vocab',
            task_type: 'context_vocab_drill',
            content: {
              items: itemsToSeed,
              count: itemsToSeed.length,
              updated_at: new Date().toISOString()
            }
          }, { onConflict: 'id' });
      }
      return { success: true, count: itemsToSeed.length };
    } catch (err) {
      console.error('Lỗi khi seed context vocab lên Supabase:', err);
      return { success: false, error: err.message };
    }
  }

  return { success: true, count: itemsToSeed.length, mode: 'local' };
}

/**
 * Lưu lịch sử kết quả ôn luyện Vocabulary in Context
 */
export async function saveContextVocabHistory(sessionData) {
  const record = {
    id: `vic_hist_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
    score: sessionData.score || 0,
    total: sessionData.total || 0,
    accuracy: sessionData.total > 0 ? Math.round((sessionData.score / sessionData.total) * 100) : 0,
    avgTimePerQuestion: sessionData.avgTimePerQuestion || 0,
    timeSpent: sessionData.timeSpent || 0,
    answers: sessionData.answers || {},
    mistakes: sessionData.mistakes || []
  };

  // 1. Lưu LocalStorage
  if (typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem('toefl_context_vocab_history');
      const list = raw ? JSON.parse(raw) : [];
      list.unshift(record);
      localStorage.setItem('toefl_context_vocab_history', JSON.stringify(list.slice(0, 50)));
    } catch (err) {
      console.error('Lỗi lưu lịch sử context vocab vào LocalStorage:', err);
    }
  }

  // 2. Lưu Supabase nếu có cấu hình
  if (isSupabaseConfigured() && supabaseInstance) {
    try {
      await supabaseInstance.from('exam_history').insert({
        test_id: 'context_vocab_drill',
        created_at: record.timestamp,
        score: record.score,
        total: record.total,
        details: record
      });
    } catch (e) {
      // Bỏ qua nếu bảng không khớp schema
    }
  }

  return record;
}

/**
 * Lấy lịch sử làm bài Context Vocab
 */
export function getContextVocabHistory() {
  if (typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem('toefl_context_vocab_history');
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error(err);
      return [];
    }
  }
  return [];
}

/**
 * 1-click lưu từ vựng đang làm vào Danh sách Starred & Thư viện Flashcards
 */
export async function saveStarredContextWord(item) {
  if (!item || !item.target_word) return false;

  const word = item.target_word.trim();
  const meaningVi = item.explanation?.meaning || '';
  const clueSignal = item.clue_signal || '';
  const synonyms = item.explanation?.synonyms || [];

  // 1. Lưu vào toefl_starred_words
  if (typeof localStorage !== 'undefined') {
    try {
      const rawStarred = localStorage.getItem('toefl_starred_words');
      const starredList = rawStarred ? JSON.parse(rawStarred) : [];
      const exists = starredList.some((w) => (typeof w === 'string' ? w : w.word).toLowerCase() === word.toLowerCase());
      
      if (!exists) {
        starredList.unshift({
          word,
          meaningVi,
          clueType: item.clue_type,
          clueSignal,
          topic: item.topic,
          synonyms,
          dateAdded: new Date().toISOString()
        });
        localStorage.setItem('toefl_starred_words', JSON.stringify(starredList));
      }
    } catch (e) {
      console.error('Lỗi lưu toefl_starred_words:', e);
    }
  }

  // 2. Lưu vào kho từ vựng cá nhân Flashcards (toefl_custom_vocabulary + Supabase)
  try {
    await saveVocabularyWords([{
      category: `Context Vocab: ${item.topic || 'General Academic'}`,
      word,
      meaningVi,
      meaningEn: item.question || '',
      paraphrases: synonyms,
      example: clueSignal,
      exampleTranslation: `[Manh mối: ${item.clue_type}] ${clueSignal}`,
      memoryTip: `Phương pháp thế: ${item.explanation?.substitution || ''}`
    }]);
  } catch (e) {
    console.warn('Lỗi lưu từ vựng vào custom vocabulary:', e);
  }

  return true;
}

// =========================================================================
// 8. QUẢN LÝ SPEAKING MASTERY LAB TRÊN SUPABASE (1,000 CÂU & 50 ĐỀ 45S)
// =========================================================================

/**
 * Lấy ngân hàng 1,000 câu Listen & Repeat (Ưu tiên Supabase -> fallback Local)
 */
export async function getSpeakingRepeatBank() {
  if (isSupabaseConfigured() && supabaseInstance) {
    try {
      const { data, error } = await supabaseInstance
        .from('tests')
        .select('*')
        .eq('id', 'speaking_repeat_1000_bank')
        .maybeSingle();

      if (!error && data && data.content?.items && data.content.items.length > 0) {
        return data.content.items;
      }
    } catch (e) {
      console.warn('Lỗi lấy câu Listen & Repeat từ Supabase, chuyển sang cục bộ:', e);
    }
  }
  return SPEAKING_REPEAT_BANK;
}

/**
 * Lấy ngân hàng 50 đề thi 45s Speaking & Sample Answers (Ưu tiên Supabase -> fallback Local)
 */
export async function getSpeaking45sBank() {
  if (isSupabaseConfigured() && supabaseInstance) {
    try {
      const { data, error } = await supabaseInstance
        .from('tests')
        .select('*')
        .eq('id', 'speaking_45s_50_bank')
        .maybeSingle();

      if (!error && data && data.content?.items && data.content.items.length > 0) {
        return data.content.items;
      }
    } catch (e) {
      console.warn('Lỗi lấy đề thi 45s từ Supabase, chuyển sang cục bộ:', e);
    }
  }
  return SPEAKING_45S_BANK;
}

/**
 * Đẩy toàn bộ dữ liệu Speaking Lab (1,000 câu + 50 đề 45s) lên Supabase
 */
export async function seedSpeakingLabToSupabase(onProgress) {
  if (!isSupabaseConfigured()) throw new Error('Chưa cấu hình Supabase! Vui lòng kiểm tra cài đặt kết nối.');

  const total = 2;

  // 1. Đẩy 1,000 câu Listen & Repeat
  if (typeof onProgress === 'function') onProgress('Đang tải 1,000 câu Listen & Repeat lên Cloud...', 1, total);
  const { error: err1 } = await supabaseInstance
    .from('tests')
    .upsert({
      id: 'speaking_repeat_1000_bank',
      title: 'TOEFL Speaking Lab: 1,000 Listen & Repeat Sentences (ETS Standards)',
      skill: 'speaking',
      task_type: 'listen_repeat_bank',
      content: {
        items: SPEAKING_REPEAT_BANK,
        count: SPEAKING_REPEAT_BANK.length,
        levels: { l1: 300, l2: 400, l3: 300 },
        updated_at: new Date().toISOString()
      },
      duration_seconds: 3600
    }, { onConflict: 'id' });

  if (err1) throw err1;

  // 2. Đẩy 50 đề 45s Independent Speaking
  if (typeof onProgress === 'function') onProgress('Đang tải 50 đề thi 45s & Sample Answers lên Cloud...', 2, total);
  const { error: err2 } = await supabaseInstance
    .from('tests')
    .upsert({
      id: 'speaking_45s_50_bank',
      title: 'TOEFL Speaking Lab: 50 Independent Speaking Tasks & Band 26-30 Samples',
      skill: 'speaking',
      task_type: 'independent_speaking_45s',
      content: {
        items: SPEAKING_45S_BANK,
        count: SPEAKING_45S_BANK.length,
        updated_at: new Date().toISOString()
      },
      duration_seconds: 2250
    }, { onConflict: 'id' });

  if (err2) throw err2;

  return { success: true, repeatCount: SPEAKING_REPEAT_BANK.length, taskCount: SPEAKING_45S_BANK.length };
}

/**
 * Lưu lịch sử luyện nói Speaking Lab vào LocalStorage và Supabase
 */
export async function saveSpeakingPracticeHistory(practiceData) {
  const record = {
    id: `spk_hist_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    type: practiceData.type || 'repeat', // 'repeat' | '45s'
    itemId: practiceData.itemId || '',
    prompt: practiceData.prompt || practiceData.text || '',
    audioDuration: practiceData.audioDuration || 0,
    accuracy: practiceData.accuracy || null,
    aiFeedback: practiceData.aiFeedback || null,
    timestamp: new Date().toISOString()
  };

  if (typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem('toefl_speaking_practice_history');
      const list = raw ? JSON.parse(raw) : [];
      list.unshift(record);
      localStorage.setItem('toefl_speaking_practice_history', JSON.stringify(list.slice(0, 100)));
    } catch (e) {
      console.warn('Lỗi lưu lịch sử speaking vào LocalStorage:', e);
    }
  }

  if (isSupabaseConfigured() && supabaseInstance) {
    try {
      await supabaseInstance.from('exam_history').insert({
        test_id: practiceData.type === 'repeat' ? 'speaking_repeat_practice' : 'speaking_45s_practice',
        created_at: record.timestamp,
        score: record.accuracy || 100,
        total: 100,
        details: record
      });
    } catch (e) {
      // Ignore schema mismatch
    }
  }

  return record;
}



