import { createClient } from '@supabase/supabase-js';
import { DEFAULT_TESTS } from '../data/defaultTests.js';

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
// 2. Đảo lộn xộn ngẫu nhiên mảng scrambled nếu AI trả về đúng thứ tự hoặc gần đúng thứ tự.
// =================================================================
export function normalizeBuildSentenceTask(task, taskUniqueId) {
  if (!task || task.task_type !== 'build_sentence') return task;
  const taskId = taskUniqueId || task.id || 'bs';
  const content = task.content || {};
  const items = content.items || [];
  if (!Array.isArray(items) || items.length === 0) return task;

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

    // 1. Chuyển tất cả về lowercase
    const correctOrder = (item.correct_order || []).map((w) => String(w).trim().toLowerCase());
    const decoys = (item.decoys || []).map((w) => String(w).trim().toLowerCase());
    
    let rawScrambled = (item.scrambled && item.scrambled.length > 0)
      ? item.scrambled.map((w) => String(w).trim().toLowerCase())
      : [...correctOrder, ...decoys];

    // 2. Luôn xáo trộn ngẫu nhiên toàn bộ mảng scrambled
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

  return {
    ...t,
    stages: normalizedStages,
    content: {
      ...(t.content || {}),
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
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseInstance
        .from('tests')
        .select('*')
        .eq('skill', skill)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map(normalizeTest);
      }
    } catch (e) {
      console.warn('Không thể kết nối Supabase, chuyển sang chế độ offline:', e);
    }
  }

  // Fallback: Lấy từ LocalStorage kết hợp bộ đề mẫu chuẩn (luôn ưu tiên bản mới nhất của DEFAULT_TESTS)
  const local = JSON.parse(localStorage.getItem('toefl_local_tests') || '[]');
  const testsMap = new Map(local.map((item) => [item.id, item]));
  // Ghi đè bộ đề chuẩn ETS 2026 mới nhất để cập nhật dữ liệu nếu browser còn cache bản cũ
  DEFAULT_TESTS.forEach((d) => testsMap.set(d.id, d));
  const allTests = Array.from(testsMap.values());
  const filtered = allTests.filter((t) => t.skill === skill);
  return filtered.map(normalizeTest);
}

// 2. Import hàng loạt đề thi (hỗ trợ cả đề Full Section nhiều modules và bài đơn)
export async function importBatchTests(testsArray) {
  const preparedTests = testsArray.map((t) => {
    const norm = normalizeTest(t);
    const taskType = t.task_type || (norm.stages[0]?.tasks[0]?.task_type) || 'multistage';
    const content = t.content || { stages: norm.stages, modules: norm.modules };

    return {
      title: t.title,
      skill: t.skill,
      task_type: taskType,
      duration_seconds: t.duration_seconds || 1800,
      content: { ...content, stages: norm.stages },
      created_at: new Date().toISOString()
    };
  });

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseInstance
        .from('tests')
        .insert(preparedTests)
        .select();

      if (error) throw error;
      return { success: true, count: preparedTests.length, destination: 'Supabase Cloud' };
    } catch (e) {
      console.error('Lỗi khi đẩy lên Supabase:', e);
    }
  }

  // Lưu vào LocalStorage
  const local = JSON.parse(localStorage.getItem('toefl_local_tests') || '[]');
  const updated = [...preparedTests, ...local];
  localStorage.setItem('toefl_local_tests', JSON.stringify(updated));
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
  return true;
}

// 4. Lưu kết quả thi (Tự động lưu song song lên Cloud Database và LocalStorage)
export async function saveExamResult(resultPayload) {
  const resultRecord = {
    ...resultPayload,
    id: resultPayload.id || `res_${Date.now()}`,
    completed_at: new Date().toISOString()
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

  // 2. Đồng bộ lên Cloud Supabase nếu người dùng đã cấu hình Project URL và Key
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabaseInstance.from('test_results').insert([resultRecord]);
      if (error) {
        console.warn('Lỗi khi lưu kết quả lên Supabase (đã lưu dự phòng trên LocalStorage):', error);
      }
    } catch (e) {
      console.warn('Không thể kết nối Supabase khi lưu kết quả:', e);
    }
  }

  return resultRecord;
}

// 5. Lấy lịch sử làm bài của 1 đề thi
export async function getExamHistory(testId) {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseInstance
        .from('test_results')
        .select('*')
        .eq('test_id', testId)
        .order('completed_at', { ascending: false });

      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Lỗi lấy lịch sử từ Supabase, chuyển sang đọc LocalStorage:', e);
    }
  }

  const results = JSON.parse(localStorage.getItem('toefl_exam_results') || '[]');
  return results.filter((r) => r.test_id === testId);
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
