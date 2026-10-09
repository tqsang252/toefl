import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Headphones, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  FileText, 
  Clock, 
  Languages, 
  Layers, 
  Info, 
  ChevronRight,
  Check
} from 'lucide-react';
import { translateTextWithAi } from '../../lib/gemini';

// Helper tách câu từ bài nghe
function splitIntoSentences(text) {
  if (!text) return [];
  // Nếu có phân vai sẵn theo dòng (Narrator:, Man:, Woman:...)
  if (/(?:^|\n)(Narrator|Man|Woman|Male|Female|Student|Professor):\s*/i.test(text)) {
    return text.split(/\n+/).map(l => l.trim()).filter(Boolean);
  }
  // Tách theo dấu chấm câu
  const matches = text.match(/[^.!?]+[.!?]+(?:\s+|$)/g);
  if (matches && matches.length > 0) {
    return matches.map(s => s.trim()).filter(Boolean);
  }
  return [text.trim()];
}

// Helper tìm câu dẫn chứng trong bài nghe cho từng câu hỏi
function findEvidenceInScript(scriptText, qItem, qIndex) {
  if (!scriptText) return null;
  const explanation = (qItem.explanation || '').trim();
  const correctKey = String(qItem.correct_answer || '').trim();
  const options = qItem.options || {};
  const correctText = (options[correctKey] || options[correctKey.toUpperCase()] || '').toLowerCase();

  const lines = splitIntoSentences(scriptText);
  if (lines.length === 0) return null;

  // 1. Tìm trích dẫn trực tiếp trong ngoặc kép của explanation
  const quotes = explanation.match(/['"“]([^'"”]{4,})['"”]/g);
  if (quotes) {
    for (const rawQ of quotes) {
      const cleanQ = rawQ.replace(/['"“”]/g, '').trim().toLowerCase();
      // Bỏ qua nếu trích dẫn chính là chữ cái đáp án như "A" hoặc "B"
      if (cleanQ.length <= 2) continue;

      const idx = lines.findIndex(line => line.toLowerCase().includes(cleanQ));
      if (idx !== -1) {
        return { index: idx, sentence: lines[idx], quote: cleanQ };
      }
    }
  }

  // 2. Tìm dựa trên từ khóa quan trọng của đáp án đúng & câu hỏi
  const stopWords = new Set([
    'what', 'when', 'where', 'which', 'whose', 'whom', 'that', 'this', 'these', 'those',
    'with', 'from', 'about', 'according', 'author', 'speaker', 'could', 'should', 'would',
    'have', 'been', 'there', 'their', 'them', 'into', 'most', 'such', 'were', 'will', 'does'
  ]);

  const extractKeywords = (str) => {
    return str
      .replace(/[^a-zA-Z0-9\s-]/g, ' ')
      .split(/\s+/)
      .map(w => w.toLowerCase())
      .filter(w => w.length >= 4 && !stopWords.has(w));
  };

  const correctKeywords = extractKeywords(correctText);
  const expKeywords = extractKeywords(explanation);
  const targetKeywords = Array.from(new Set([...correctKeywords, ...expKeywords]));

  if (targetKeywords.length > 0) {
    let bestIdx = -1;
    let maxMatch = 0;

    lines.forEach((line, idx) => {
      const lower = line.toLowerCase();
      let matchCount = 0;
      targetKeywords.forEach(kw => {
        if (lower.includes(kw)) matchCount++;
      });
      if (matchCount > maxMatch) {
        maxMatch = matchCount;
        bestIdx = idx;
      }
    });

    if (bestIdx !== -1 && maxMatch >= 1) {
      return { index: bestIdx, sentence: lines[bestIdx] };
    }
  }

  // Fallback: nếu bài có số câu hỏi tương ứng từng phần
  return null;
}

export default function ListeningReviewSection({ moduleData, test }) {
  // 1. Chuẩn hóa danh sách các task trong module
  const tasks = useMemo(() => {
    if (moduleData.tasks && Array.isArray(moduleData.tasks) && moduleData.tasks.length > 0) {
      return moduleData.tasks.map(t => {
        // Bổ sung task_content nếu thiếu từ test.stages
        if (!t.task_content || Object.keys(t.task_content).length === 0 || !t.task_content.questions) {
          const normStages = test?.stages || test?.content?.stages || [];
          const matchedStage = normStages.find(s => s.id === moduleData.module_id);
          const matchedTask = matchedStage?.tasks?.find(st => st.id === t.task_id);
          if (matchedTask) {
            return {
              ...t,
              task_content: matchedTask.content || {},
              task_title: matchedTask.title || t.task_title,
              task_type: matchedTask.task_type || t.task_type,
              // Merge items với questions để luôn có options & audio_text
              items: (t.items || []).map((it, idx) => {
                const qDef = matchedTask.content?.questions?.[idx] || {};
                return {
                  ...it,
                  options: it.options && Object.keys(it.options).length > 0 ? it.options : (qDef.options || {}),
                  audio_text: it.audio_text || qDef.audio_text || '',
                  prompt: it.prompt || qDef.prompt || qDef.question || 'Câu hỏi'
                };
              })
            };
          }
        }
        return t;
      });
    }

    // Fallback: Tìm từ test.stages
    const normStages = test?.stages || test?.content?.stages || [];
    const matchedStage = normStages.find(s => s.id === moduleData.module_id) || normStages[0];
    if (matchedStage?.tasks) {
      return matchedStage.tasks.map(st => {
        const qList = st.content?.questions || [];
        const matchedItems = (moduleData.items || []).filter(it => 
          qList.some(q => q.id === it.id)
        );

        return {
          task_id: st.id,
          task_title: st.title,
          task_type: st.task_type,
          task_content: st.content || {},
          items: matchedItems.length > 0 ? matchedItems.map((it, idx) => {
            const qDef = qList[idx] || {};
            return {
              ...it,
              options: it.options && Object.keys(it.options).length > 0 ? it.options : (qDef.options || {}),
              audio_text: it.audio_text || qDef.audio_text || '',
              prompt: it.prompt || qDef.prompt || qDef.question || 'Câu hỏi'
            };
          }) : qList.map(q => ({
            id: q.id,
            prompt: q.prompt || q.question,
            options: q.options || {},
            audio_text: q.audio_text || '',
            correct_answer: q.correct_answer,
            user_choice: '(Chưa lưu)',
            is_correct: false,
            explanation: q.explanation
          }))
        };
      });
    }

    return [];
  }, [moduleData, test]);

  // Tab Task đang chọn (Task 1: Choose Response, Task 2: Conversation...)
  const [activeTaskIdx, setActiveTaskIdx] = useState(0);
  const currentTask = tasks[activeTaskIdx] || tasks[0];

  // Câu hỏi đang được focus (để highlight và cuộn tới dẫn chứng)
  const [focusedQuestionIdx, setFocusedQuestionIdx] = useState(0);

  // Trạng thái phát âm thanh
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSpeakingSentence, setActiveSpeakingSentence] = useState(null);
  const [currentSpeaker, setCurrentSpeaker] = useState(null);
  const isPlayingRef = useRef(false);
  const turnTimeoutRef = useRef(null);

  // Trạng thái dịch thuật (Task ID -> Chuỗi tiếng Việt)
  const [translations, setTranslations] = useState({});
  const [isTranslating, setIsTranslating] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  // Ref container để tự động scroll đến câu dẫn chứng
  const scriptContainerRef = useRef(null);
  const sentenceRefs = useRef([]);

  // Nội dung văn bản bài nghe của Task hiện tại
  const taskContent = currentTask?.task_content || {};
  const isChooseResponse = currentTask?.task_type === 'choose_response';
  const scriptText = taskContent.audio_text || '';
  const taskQuestions = currentTask?.items || [];

  // Tách script thành các câu
  const scriptLines = useMemo(() => {
    return splitIntoSentences(scriptText);
  }, [scriptText]);

  // Ánh xạ câu dẫn chứng: index câu thoại -> Danh sách câu hỏi có dẫn chứng ở đây
  const evidenceMap = useMemo(() => {
    const map = {};
    if (!isChooseResponse && scriptText) {
      taskQuestions.forEach((qItem, qIdx) => {
        const ev = findEvidenceInScript(scriptText, qItem, qIdx);
        if (ev && ev.index !== undefined) {
          if (!map[ev.index]) map[ev.index] = [];
          map[ev.index].push({ qNumber: qIdx + 1, qItem });
        }
      });
    }
    return map;
  }, [scriptText, taskQuestions, isChooseResponse]);

  // Dừng phát âm thanh
  const stopAudio = () => {
    isPlayingRef.current = false;
    if (turnTimeoutRef.current) {
      clearTimeout(turnTimeoutRef.current);
      turnTimeoutRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setActiveSpeakingSentence(null);
    setCurrentSpeaker(null);
  };

  useEffect(() => {
    return () => stopAudio();
  }, [activeTaskIdx]);

  // Cuộn đến câu dẫn chứng khi người dùng click vào câu hỏi
  const scrollToQuestionEvidence = (qIdx) => {
    setFocusedQuestionIdx(qIdx);

    if (isChooseResponse) return;

    // Tìm index câu thoại tương ứng với câu hỏi này
    const targetSentenceIdx = Object.keys(evidenceMap).find(sIdx => 
      evidenceMap[sIdx].some(ev => ev.qNumber === qIdx + 1)
    );

    if (targetSentenceIdx !== undefined && sentenceRefs.current[targetSentenceIdx]) {
      sentenceRefs.current[targetSentenceIdx].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  // State danh sách giọng đọc từ trình duyệt
  const [systemVoices, setSystemVoices] = useState([]);
  useEffect(() => {
    const loadVoices = () => {
      if (window.speechSynthesis) {
        setSystemVoices(window.speechSynthesis.getVoices());
      }
    };
    loadVoices();
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const getDistinctVoices = () => {
    const allVoices = systemVoices.length > 0 ? systemVoices : (window.speechSynthesis ? window.speechSynthesis.getVoices() : []);
    const enVoices = allVoices.filter(v => v.lang && v.lang.startsWith('en'));

    const isMale = (name = '') => /david|guy|mark|george|christopher|male|richard|james|alex|fred/i.test(name);
    const isFemale = (name = '') => /zira|jenny|samantha|aria|female|susan|victoria|karen|catherine|stephanie|google us/i.test(name);

    let maleVoice = enVoices.find(v => isMale(v.name));
    let femaleVoice = enVoices.find(v => isFemale(v.name));

    if (!maleVoice && enVoices.length > 0) maleVoice = enVoices[0];
    if (!femaleVoice && enVoices.length > 1) {
      femaleVoice = enVoices.find(v => v !== maleVoice) || enVoices[1];
    } else if (!femaleVoice && enVoices.length > 0) {
      femaleVoice = enVoices[0];
    }

    return { maleVoice, femaleVoice, narratorVoice: enVoices[0] || null };
  };

  // Đọc riêng 1 câu thoại bất kỳ
  const playSingleSentence = (text, speaker = 'Narrator') => {
    if (!window.speechSynthesis) return;
    stopAudio();

    isPlayingRef.current = true;
    setIsPlaying(true);
    setActiveSpeakingSentence(text);
    setCurrentSpeaker(speaker);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';

    const { maleVoice, femaleVoice, narratorVoice } = getDistinctVoices();
    const isMan = /^man|^male/i.test(speaker);
    const isWoman = /^woman|^female/i.test(speaker);

    if (isMan) {
      if (maleVoice) utterance.voice = maleVoice;
      utterance.pitch = 0.72; // Giọng nam trầm ấm
      utterance.rate = 0.93;
    } else if (isWoman) {
      if (femaleVoice) utterance.voice = femaleVoice;
      utterance.pitch = 1.42; // Giọng nữ cao trong
      utterance.rate = 1.0;
    } else {
      if (narratorVoice) utterance.voice = narratorVoice;
      utterance.pitch = 1.0;
      utterance.rate = 0.95;
    }

    utterance.onend = () => {
      setIsPlaying(false);
      setActiveSpeakingSentence(null);
      setCurrentSpeaker(null);
      isPlayingRef.current = false;
    };
    utterance.onerror = () => {
      setIsPlaying(false);
      setActiveSpeakingSentence(null);
      setCurrentSpeaker(null);
      isPlayingRef.current = false;
    };

    window.speechSynthesis.speak(utterance);
  };

  // Tính khoảng nghỉ đàm thoại tự nhiên theo ngữ cảnh bài nghe
  const calculatePauseDuration = (rawLine, nextLine) => {
    if (!rawLine) return 800;

    // 1. Sau lời dẫn đề của Narrator: nghỉ 1.2s để chuẩn bị vào hội thoại
    if (/^narrator/i.test(rawLine)) {
      return 1200;
    }

    const text = rawLine.trim();

    // 2. Sau câu hỏi (?): nghỉ 950ms để tiếp nhận và phản hồi
    if (text.endsWith('?') || text.includes('?')) {
      return 950;
    }

    // 3. Khi đổi người nói: nghỉ 850ms
    if (nextLine && ((rawLine.includes('Man:') && nextLine.includes('Woman:')) || (rawLine.includes('Woman:') && nextLine.includes('Man:')))) {
      return 850;
    }

    return 750;
  };

  // Phát toàn bộ bài nghe từ đầu đến cuối luân phiên 2 giọng đọc
  const playFullScript = () => {
    if (isPlaying) {
      stopAudio();
      return;
    }
    if (!scriptLines || scriptLines.length === 0) return;

    stopAudio();
    isPlayingRef.current = true;
    setIsPlaying(true);

    const playLineIdx = (idx) => {
      if (!isPlayingRef.current || idx >= scriptLines.length) {
        stopAudio();
        return;
      }

      const rawLine = scriptLines[idx];
      const nextLine = scriptLines[idx + 1];
      let speaker = 'Narrator';
      let spokenText = rawLine;

      const spkMatch = rawLine.match(/^(Narrator|Man|Woman|Male|Female|Student|Professor):\s*(.*)/i);
      if (spkMatch) {
        speaker = spkMatch[1];
        spokenText = spkMatch[2];
      }

      setActiveSpeakingSentence(rawLine);
      setCurrentSpeaker(speaker);

      const utterance = new SpeechSynthesisUtterance(spokenText || rawLine);
      utterance.lang = 'en-US';

      const { maleVoice, femaleVoice, narratorVoice } = getDistinctVoices();
      const isMan = /^man|^male/i.test(speaker);
      const isWoman = /^woman|^female/i.test(speaker);

      if (isMan) {
        if (maleVoice) utterance.voice = maleVoice;
        utterance.pitch = 0.72; // Giọng nam trầm ấm
        utterance.rate = 0.88; // Đĩnh đạc, tự nhiên
      } else if (isWoman) {
        if (femaleVoice) utterance.voice = femaleVoice;
        utterance.pitch = 1.42; // Giọng nữ cao trong
        utterance.rate = 0.92; // Tươi tắn, rõ từng từ
      } else {
        if (narratorVoice) utterance.voice = narratorVoice;
        utterance.pitch = 1.0;
        utterance.rate = 0.90;
      }

      utterance.onend = () => {
        if (!isPlayingRef.current) return;
        const pauseMs = calculatePauseDuration(rawLine, nextLine);
        turnTimeoutRef.current = setTimeout(() => {
          playLineIdx(idx + 1);
        }, pauseMs);
      };

      utterance.onerror = () => {
        if (isPlayingRef.current && idx + 1 < scriptLines.length) {
          playLineIdx(idx + 1);
        } else {
          stopAudio();
        }
      };

      window.speechSynthesis.speak(utterance);
    };

    playLineIdx(0);
  };

  // Dịch Script sang tiếng Việt
  const handleToggleTranslation = async () => {
    if (showTranslation) {
      setShowTranslation(false);
      return;
    }

    const taskId = currentTask?.task_id || `task_${activeTaskIdx}`;
    if (translations[taskId]) {
      setShowTranslation(true);
      return;
    }

    if (!scriptText) return;

    try {
      setIsTranslating(true);
      const vi = await translateTextWithAi(scriptText, 'vi');
      setTranslations(prev => ({ ...prev, [taskId]: vi }));
      setShowTranslation(true);
    } catch (e) {
      console.warn('Translation failed:', e);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* ========================================================= */}
      {/* 1. THANH ĐIỀU HƯỚNG TỪNG TASK TRONG MODULE LISTENING */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
          {tasks.map((task, idx) => {
            const isActive = idx === activeTaskIdx;
            const taskItems = task.items || [];
            const correctCount = taskItems.filter(it => it.is_correct).length;
            const totalCount = taskItems.length;

            return (
              <button
                key={task.task_id || idx}
                type="button"
                onClick={() => {
                  setActiveTaskIdx(idx);
                  setFocusedQuestionIdx(0);
                  setShowTranslation(false);
                }}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#153e75] text-white shadow-sm ring-2 ring-blue-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Headphones className={`w-3.5 h-3.5 ${isActive ? 'text-teal-300' : 'text-slate-500'}`} />
                <span>{task.task_title || `Task ${idx + 1}`}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                  isActive 
                    ? 'bg-blue-900/60 text-teal-200' 
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}>
                  {correctCount}/{totalCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. KHU VỰC CHI TIẾT: CỘT TRÁI (SCRIPT & EVIDENCE) - CỘT PHẢI (CÂU HỎI) */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ========================================================= */}
        {/* CỘT TRÁI: KỊCH BẢN BÀI NGHE (AUDIO SCRIPT) & VỊ TRÍ ĐÁP ÁN */}
        {/* ========================================================= */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-3xl border border-[#e2dcd2] p-5 sm:p-6 shadow-xs sticky top-4">
            
            {/* Header Audio Script */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#153e75] flex items-center justify-center">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                    Audio Transcript & Dẫn Chứng
                  </h3>
                  <span className="text-[10px] text-slate-400 block font-medium">
                    {isChooseResponse 
                      ? 'Nội dung câu nói gốc của bài phản xạ' 
                      : (taskContent.context_title || 'Đối chiếu manh mối đáp án trực tiếp')}
                  </span>
                </div>
              </div>

              {/* Cụm nút Play toàn bài & Dịch tiếng Việt */}
              <div className="flex items-center gap-1.5">
                {!isChooseResponse && scriptText && (
                  <>
                    <button
                      type="button"
                      onClick={playFullScript}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-xs ${
                        isPlaying
                          ? 'bg-rose-500 hover:bg-rose-600 text-white'
                          : 'bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white'
                      }`}
                      title={isPlaying ? 'Tạm dừng nghe' : 'Nghe toàn bộ bài từ đầu'}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>Tạm dừng</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Nghe toàn bài</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleToggleTranslation}
                      disabled={isTranslating}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                      title="Bật / tắt bản dịch tiếng Việt cho đoạn nghe này"
                    >
                      <Languages className="w-3.5 h-3.5 text-teal-600" />
                      <span>{isTranslating ? 'Đang dịch...' : showTranslation ? 'Ẩn dịch' : 'Dịch TV'}</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Chỉ báo giọng đọc đang nói (nếu đang phát) */}
            {isPlaying && currentSpeaker && (
              <div className="mb-3 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center justify-between animate-fade-in shadow-xs">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                  <span>Đang đọc:</span>
                  <span className="text-teal-300">
                    {/^man|^male/i.test(currentSpeaker) ? '👨 Man (Người nam)' : /^woman|^female/i.test(currentSpeaker) ? '👩 Woman (Người nữ)' : '📢 Narrator'}
                  </span>
                </span>
                <span className="text-[10px] text-slate-400 font-normal">Tự động chuyển câu thoại</span>
              </div>
            )}

            {/* Hướng dẫn nhận diện */}
            <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-2.5 mb-4 text-[11px] text-amber-900 flex items-start gap-2">
              <span className="text-base shrink-0">💡</span>
              <div className="leading-relaxed">
                {isChooseResponse ? (
                  <span><strong>Gợi ý ôn luyện:</strong> Đọc kỹ câu nói gốc ở bên dưới để hiểu vì sao phương án đáp lại được chọn là chính xác nhất trong ngữ cảnh đại học.</span>
                ) : (
                  <span><strong>Chỉ dẫn đáp án:</strong> Các câu thoại có viền vàng và biểu tượng <strong className="text-amber-800">🎯 Manh mối Câu X</strong> là nơi chứa thông tin trực tiếp quyết định đáp án chuẩn của câu hỏi đó.</span>
                )}
              </div>
            </div>

            {/* KHUNG HIỂN THỊ NỘI DUNG SCRIPT BÀI NGHE */}
            <div 
              ref={scriptContainerRef}
              className="max-h-[520px] overflow-y-auto space-y-3 pr-1 scrollbar-thin font-sans"
            >
              {isChooseResponse ? (
                /* Dạng Task 1: Choose Response - Hiển thị danh sách các câu nói gốc */
                <div className="space-y-3">
                  {taskQuestions.map((q, qIdx) => {
                    const isFocused = qIdx === focusedQuestionIdx;
                    return (
                      <div
                        key={q.id || qIdx}
                        onClick={() => setFocusedQuestionIdx(qIdx)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          isFocused
                            ? 'bg-blue-50/90 border-[#153e75] ring-2 ring-blue-300 shadow-xs'
                            : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/70'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-black uppercase text-blue-900 bg-blue-100 px-2 py-0.5 rounded-full">
                            Câu {qIdx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              playSingleSentence(q.audio_text || '', 'Narrator');
                            }}
                            className="p-1 rounded-md bg-white hover:bg-teal-50 text-slate-600 hover:text-teal-700 border border-slate-200 cursor-pointer shadow-2xs"
                            title="Nghe lại câu nói này"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs font-bold text-slate-900 leading-relaxed font-serif">
                          🎙️ "{q.audio_text || '(Chưa có văn bản audio)'}"
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Dạng Conversation, Announcement, Academic Talk */
                scriptLines.map((line, lIdx) => {
                  const evList = evidenceMap[lIdx] || [];
                  const isEvidence = evList.length > 0;
                  const isSpeakingThis = activeSpeakingSentence === line;

                  // Tách người nói nếu có
                  const spkMatch = line.match(/^(Narrator|Man|Woman|Male|Female|Student|Professor):\s*(.*)/i);
                  const speaker = spkMatch ? spkMatch[1] : null;
                  const textContent = spkMatch ? spkMatch[2] : line;
                  const isMan = speaker && /^man|^male/i.test(speaker);
                  const isWoman = speaker && /^woman|^female/i.test(speaker);

                  return (
                    <div
                      key={lIdx}
                      ref={el => sentenceRefs.current[lIdx] = el}
                      className={`p-3 rounded-2xl border transition-all ${
                        isEvidence
                          ? 'bg-amber-50/90 border-amber-300 ring-2 ring-amber-300/50 shadow-xs'
                          : isSpeakingThis
                          ? 'bg-teal-50/80 border-teal-300'
                          : isMan
                          ? 'bg-blue-50/50 border-blue-200/70'
                          : isWoman
                          ? 'bg-pink-50/50 border-pink-200/70'
                          : 'bg-slate-50/60 border-slate-200'
                      }`}
                    >
                      {/* Tiêu đề vai / Huy hiệu dẫn chứng */}
                      <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1.5">
                        <div className="flex items-center gap-1.5">
                          {speaker ? (
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold flex items-center gap-1 ${
                              isMan 
                                ? 'bg-[#153e75] text-white' 
                                : isWoman 
                                ? 'bg-pink-700 text-white' 
                                : 'bg-slate-700 text-white'
                            }`}>
                              {isMan ? '👨 Man' : isWoman ? '👩 Woman' : `📢 ${speaker}`}
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-400">Đoạn {lIdx + 1}</span>
                          )}

                          {/* Huy hiệu Dẫn chứng nếu câu này chứa đáp án */}
                          {evList.map((ev, i) => (
                            <span 
                              key={i}
                              className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-200 text-amber-950 border border-amber-400 flex items-center gap-1 animate-pulse"
                            >
                              <span>🎯 Manh mối Câu {ev.qNumber}</span>
                            </span>
                          ))}
                        </div>

                        {/* Nút nghe lại riêng câu thoại này */}
                        <button
                          type="button"
                          onClick={() => playSingleSentence(textContent, speaker || 'Narrator')}
                          className="p-1 rounded-md bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 cursor-pointer shadow-2xs transition-colors"
                          title="Nghe lại câu nói này"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Nội dung câu thoại */}
                      <p className={`text-xs leading-relaxed ${isEvidence ? 'font-semibold text-slate-950' : 'text-slate-800 font-normal'}`}>
                        {textContent}
                      </p>
                    </div>
                  );
                })
              )}
            </div>

            {/* Khung bản dịch tiếng Việt nếu được bật */}
            {showTranslation && translations[currentTask?.task_id || `task_${activeTaskIdx}`] && (
              <div className="mt-4 p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-xs text-emerald-950 leading-relaxed font-serif animate-fade-in max-h-48 overflow-y-auto whitespace-pre-line">
                <div className="text-[10px] font-bold text-emerald-800 uppercase mb-1.5 flex items-center gap-1">
                  <span>🌐 Bản dịch tham khảo tiếng Việt:</span>
                </div>
                {translations[currentTask?.task_id || `task_${activeTaskIdx}`]}
              </div>
            )}

          </div>
        </div>

        {/* ========================================================= */}
        {/* CỘT PHẢI: DANH SÁCH CÂU HỎI & ĐÁP ÁN ĐỐI CHIẾU */}
        {/* ========================================================= */}
        <div className="lg:col-span-6 space-y-4">
          {taskQuestions.map((item, itemIdx) => {
            const isCorrect = item.is_correct;
            const isFocused = itemIdx === focusedQuestionIdx;
            const options = item.options || {};
            const correctKey = String(item.correct_answer || '').trim();
            const userKey = String(item.user_choice || '').trim();

            // Tìm câu dẫn chứng trong script cho câu hỏi này
            const evidence = !isChooseResponse ? findEvidenceInScript(scriptText, item, itemIdx) : null;

            return (
              <div
                key={item.id || itemIdx}
                onClick={() => scrollToQuestionEvidence(itemIdx)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                  isFocused
                    ? 'ring-2 ring-blue-400 bg-white shadow-sm'
                    : isCorrect
                    ? 'bg-emerald-50/20 border-emerald-200/80 hover:bg-emerald-50/40'
                    : 'bg-rose-50/20 border-rose-200/80 hover:bg-rose-50/40'
                }`}
              >
                
                {/* Header Câu hỏi */}
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-800 uppercase">
                      Câu {itemIdx + 1} / {taskQuestions.length}
                    </span>
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Đúng
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                        <XCircle className="w-3 h-3 text-rose-600" />
                        Chưa đúng
                      </span>
                    )}
                  </div>

                  {/* Thời gian làm bài */}
                  {item.time_spent_seconds && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      <Clock className="w-3 h-3" />
                      <span>{item.time_spent_seconds < 60 ? `${item.time_spent_seconds}s` : `${Math.floor(item.time_spent_seconds / 60)}m ${item.time_spent_seconds % 60}s`}</span>
                    </span>
                  )}
                </div>

                {/* Nội dung câu hỏi (prompt) */}
                <h4 className="text-sm font-bold text-slate-900 mb-3 leading-snug">
                  {item.prompt}
                </h4>

                {/* Nếu là dạng Choose Response: Hiển thị câu nói đã phát */}
                {isChooseResponse && item.audio_text && (
                  <div className="mb-3.5 p-3 rounded-xl bg-blue-50/80 border border-blue-200/80 text-xs text-blue-950 flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-blue-800 block mb-0.5">
                        🎙️ Câu nói bạn đã nghe trong bài:
                      </span>
                      <p className="font-semibold font-serif text-slate-900">"{item.audio_text}"</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playSingleSentence(item.audio_text, 'Narrator');
                      }}
                      className="p-1.5 rounded-lg bg-white text-blue-700 border border-blue-200 hover:bg-blue-100 cursor-pointer shrink-0"
                      title="Nghe lại câu này"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* DANH SÁCH 4 PHƯƠNG ÁN A, B, C, D */}
                <div className="space-y-2 mb-4">
                  {Object.entries(options).map(([optKey, optText]) => {
                    const isUserPick = userKey.toUpperCase() === optKey.toUpperCase();
                    const isCorrectOpt = correctKey.toUpperCase() === optKey.toUpperCase();

                    return (
                      <div
                        key={optKey}
                        className={`p-3 rounded-xl border text-xs flex items-start gap-3 transition-all ${
                          isCorrectOpt
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold ring-1 ring-emerald-300'
                            : isUserPick && !isCorrect
                            ? 'bg-rose-50 border-rose-300 text-rose-950 font-medium'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        {/* Vòng tròn ký tự A, B, C, D */}
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                          isCorrectOpt
                            ? 'bg-emerald-600 text-white'
                            : isUserPick && !isCorrect
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {optKey}
                        </span>

                        {/* Nội dung phương án */}
                        <div className="flex-1 pt-0.5 leading-relaxed">
                          <span>{optText}</span>
                        </div>

                        {/* Nhãn trạng thái */}
                        <div className="shrink-0 pt-0.5">
                          {isCorrectOpt && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                              <Check className="w-3 h-3 text-emerald-700" />
                              Đáp án chuẩn ETS
                            </span>
                          )}
                          {isUserPick && !isCorrectOpt && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                              Lựa chọn của bạn
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* HỘP DẪN CHỨNG MANH MỐI TỪ BÀI NGHE (EVIDENCE BOX) */}
                {evidence && evidence.sentence && (
                  <div className="mb-3 p-3 bg-amber-50/90 rounded-2xl border border-amber-300 text-xs text-amber-950">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-black uppercase text-amber-900 tracking-wider flex items-center gap-1">
                        <span>🎯 Manh mối trong bài nghe:</span>
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          playSingleSentence(evidence.sentence);
                        }}
                        className="px-2 py-0.5 rounded bg-amber-200/80 hover:bg-amber-300 text-amber-900 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                        title="Nghe câu dẫn chứng này"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Nghe dẫn chứng</span>
                      </button>
                    </div>
                    <blockquote className="italic font-serif pl-2.5 border-l-2 border-amber-400 text-slate-900 leading-relaxed font-medium">
                      "{evidence.sentence}"
                    </blockquote>
                  </div>
                )}

                {/* GIẢI THÍCH CHI TIẾT */}
                {item.explanation && !item.explanation.includes('undefined') && (
                  <div className="text-xs text-slate-700 bg-white/90 p-3.5 rounded-2xl border border-slate-200/90 leading-relaxed font-serif">
                    <strong className="text-slate-900 font-sans block mb-1">💡 Phân tích & Giải thích:</strong>
                    {item.explanation}
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
