import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Languages, 
  Layers, 
  Bookmark, 
  BookmarkCheck, 
  ChevronRight,
  HelpCircle,
  FileText,
  Search
} from 'lucide-react';
import { normalizeCompleteWordsTask, importVocabularyBatch } from '../../lib/supabase';
import { translateTextWithAi, lookupWordWithAi } from '../../lib/gemini';

export default function ReadingReviewSection({ moduleData, test }) {
  // 1. Thu thập danh sách tasks trong module này
  const tasks = React.useMemo(() => {
    if (moduleData.tasks && Array.isArray(moduleData.tasks) && moduleData.tasks.length > 0) {
      return moduleData.tasks.map(t => {
        // Nếu task thiếu content thì tìm trong test
        if (!t.task_content || Object.keys(t.task_content).length === 0) {
          const normStages = test?.stages || test?.content?.stages || [];
          const matchedStage = normStages.find(s => s.id === moduleData.module_id);
          const matchedTask = matchedStage?.tasks?.find(st => st.id === t.task_id);
          if (matchedTask) {
            return {
              ...t,
              task_content: matchedTask.content || {},
              task_title: matchedTask.title || t.task_title,
              task_type: matchedTask.task_type || t.task_type
            };
          }
        }
        return t;
      });
    }

    // Fallback: Tìm từ test.stages nếu moduleData.tasks chưa có
    const normStages = test?.stages || test?.content?.stages || [];
    const matchedStage = normStages.find(s => s.id === moduleData.module_id) || normStages[0];
    if (matchedStage?.tasks) {
      return matchedStage.tasks.map(st => ({
        task_id: st.id,
        task_title: st.title,
        task_type: st.task_type,
        task_content: st.content || {},
        items: moduleData.items || []
      }));
    }

    return [];
  }, [moduleData, test]);

  // Tab đang chọn trong module (Task 1, Task 2, ...)
  const [activeTaskIdx, setActiveTaskIdx] = useState(0);
  const currentTask = tasks[activeTaskIdx] || tasks[0];

  // Câu hỏi / từ đang được active highlight
  const [activeItemIdx, setActiveItemIdx] = useState(0);

  // Trạng thái dịch thuật (Task ID -> Chuỗi tiếng Việt)
  const [translations, setTranslations] = useState({});
  const [isTranslating, setIsTranslating] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  // Trạng thái Text-to-Speech (TTS)
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Từ vựng đã lưu vào Sổ từ vựng
  const [savedWords, setSavedWords] = useState(new Set());

  // Refs để cuộn tới card bên phải
  const cardRefs = useRef({});

  // Reset trạng thái khi đổi task
  useEffect(() => {
    setActiveItemIdx(0);
    setShowTranslation(false);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [activeTaskIdx]);

  // Hàm đọc phát âm tiếng Anh chuẩn
  const handleToggleSpeak = (textToSpeak) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Trình duyệt của bạn không hỗ trợ tính năng đọc âm thanh (Speech Synthesis).');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = textToSpeak.replace(/\[\s*✓\s*|\s*✗\s*|\]/g, ' ').replace(/_/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-US';
    utterance.rate = 0.92;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Hàm dịch đoạn văn sang tiếng Việt bằng AI
  const handleToggleTranslate = async (sourceText, taskId) => {
    if (showTranslation) {
      setShowTranslation(false);
      return;
    }

    if (translations[taskId]) {
      setShowTranslation(true);
      return;
    }

    try {
      setIsTranslating(true);
      const res = await translateTextWithAi(sourceText);
      if (res && res.translatedText) {
        setTranslations(prev => ({ ...prev, [taskId]: res.translatedText }));
        setShowTranslation(true);
      }
    } catch (err) {
      alert('Không thể tải bản dịch tự động: ' + (err.message || 'Lỗi mạng'));
    } finally {
      setIsTranslating(false);
    }
  };

  // Hàm lưu nhanh từ vựng vào Sổ từ vựng cá nhân
  const handleSaveToVocab = async (word, meaning = '', category = 'Reading Review') => {
    if (!word) return;
    try {
      await importVocabularyBatch([{
        word: word.trim(),
        meaning: meaning.trim() || 'Từ vựng trong bài đọc TOEFL',
        category: category,
        part_of_speech: 'Academic Word'
      }], category);
      setSavedWords(prev => new Set([...prev, word.toLowerCase()]));
    } catch (e) {
      console.warn('Lỗi lưu từ vựng:', e);
    }
  };

  // Cuộn tới câu hỏi khi bấm vào chip trong đoạn văn
  const handleSelectBlank = (idx) => {
    setActiveItemIdx(idx);
    if (cardRefs.current[idx]) {
      cardRefs.current[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  if (!currentTask) {
    return (
      <div className="p-6 text-center text-slate-500 text-xs">
        Không có dữ liệu bài đọc cho module này.
      </div>
    );
  }

  const isCompleteWords = currentTask.task_type === 'complete_words';
  const taskContent = currentTask.task_content || {};

  // ===================================================================
  // 1. XỬ LÝ DỮ LIỆU COMPLETE THE WORDS
  // ===================================================================
  let cwTokens = [];
  let cwBlanks = [];
  let cwItems = currentTask.items || [];

  if (isCompleteWords) {
    const norm = normalizeCompleteWordsTask({ ...currentTask, content: taskContent }, currentTask.task_id);
    const paragraph = norm.content?.paragraph || taskContent.paragraph || "";
    cwBlanks = norm.content?.blanks || taskContent.blanks || [];

    const bracketRegex = /([A-Za-z]+)\[([A-Za-z]+)\]/g;
    let lastIndex = 0;
    let match;
    let bIdx = 0;

    while ((match = bracketRegex.exec(paragraph)) !== null) {
      if (match.index > lastIndex) {
        cwTokens.push({
          type: 'text',
          content: paragraph.substring(lastIndex, match.index)
        });
      }

      const prefix = match[1];
      const missing = match[2];
      const fullWord = `${prefix}${missing}`;
      const matchedItem = cwItems[bIdx] || {};

      cwTokens.push({
        type: 'blank',
        index: bIdx,
        prefix,
        missing,
        full: fullWord,
        userChoice: matchedItem.user_choice || '(Chưa điền)',
        correctAnswer: matchedItem.correct_answer || fullWord,
        isCorrect: matchedItem.is_correct ?? false,
        explanation: matchedItem.explanation || `Chữ cái còn thiếu là "${missing}" để tạo thành từ "${fullWord}".`
      });

      bIdx++;
      lastIndex = bracketRegex.lastIndex;
    }

    if (lastIndex < paragraph.length) {
      cwTokens.push({
        type: 'text',
        content: paragraph.substring(lastIndex)
      });
    }
  }

  // ===================================================================
  // 2. XỬ LÝ DỮ LIỆU PASSAGE (DAILY LIFE & ACADEMIC PASSAGE)
  // ===================================================================
  const passageText = taskContent.passage || "";
  const passageDocType = taskContent.document_type || (currentTask.task_type === 'daily_life' ? 'Read in Daily Life' : 'Academic Reading Passage');
  const passageQuestions = taskContent.questions || [];
  const passageItems = currentTask.items || [];

  // Tìm câu dẫn chứng trong bài đọc tương ứng với câu hỏi đang chọn
  const activeQuestionItem = passageItems[activeItemIdx] || {};
  const activeQuestionDef = passageQuestions[activeItemIdx] || {};

  return (
    <div className="space-y-5">
      
      {/* THANH ĐIỀU HƯỚNG TỪNG TASK TRONG READING MODULE */}
      {tasks.length > 1 && (
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200 overflow-x-auto">
          {tasks.map((t, idx) => {
            const isActive = idx === activeTaskIdx;
            const taskLabel = t.task_title || (t.task_type === 'complete_words' ? `Task ${idx + 1}: Complete Words` : `Task ${idx + 1}: Passage`);
            
            return (
              <button
                key={idx}
                onClick={() => setActiveTaskIdx(idx)}
                className={`py-2 px-3.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  isActive 
                    ? 'bg-white text-teal-900 shadow-xs border border-slate-200' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <BookOpen className={`w-3.5 h-3.5 ${isActive ? 'text-teal-700' : 'text-slate-400'}`} />
                <span>{taskLabel}</span>
                {t.total_questions > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    isActive ? 'bg-teal-50 text-teal-800' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {t.score_raw} / {t.total_questions}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* =============================================================== */}
      {/* TRƯỜNG HỢP 1: GIAO DIỆN XEM ĐÁP ÁN COMPLETE THE WORDS             */}
      {/* =============================================================== */}
      {isCompleteWords ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* CỘT TRÁI (7/12): ĐOẠN VĂN GỐC & TỪ VỰNG TRONG NGỮ CẢNH */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs sticky top-24">
            
            {/* Header Cột trái */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                    Đoạn văn gốc & Từ vựng trong ngữ cảnh
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Bấm vào từng từ để xem chi tiết đối chiếu & học từ vựng
                  </p>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleToggleTranslate(taskContent.paragraph || '', currentTask.task_id)}
                  disabled={isTranslating}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    showTranslation 
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-2xs' 
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                  title="Dịch toàn bộ đoạn văn sang tiếng Việt"
                >
                  <Languages className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{isTranslating ? 'Đang dịch...' : showTranslation ? 'Ẩn bản dịch' : 'Dịch đoạn văn'}</span>
                </button>

                <button
                  onClick={() => handleToggleSpeak(taskContent.paragraph || '')}
                  className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                    isSpeaking 
                      ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse' 
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                  title={isSpeaking ? 'Dừng đọc' : 'Nghe phát âm toàn bài'}
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4 text-slate-600" />}
                </button>
              </div>
            </div>

            {/* Thân bài đọc với các Blanks nhúng trực tiếp */}
            <div className="text-slate-800 font-serif text-sm sm:text-base leading-loose p-4 rounded-2xl bg-[#faf9f5] border border-amber-900/10 shadow-2xs">
              {cwTokens.map((token, tIdx) => {
                if (token.type === 'text') {
                  return <span key={tIdx}>{token.content}</span>;
                }

                const isSelected = activeItemIdx === token.index;
                const isCorrect = token.isCorrect;

                return (
                  <button
                    key={tIdx}
                    onClick={() => handleSelectBlank(token.index)}
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 mx-1 my-0.5 rounded-xl text-xs sm:text-sm font-bold font-sans transition-all cursor-pointer border ${
                      isSelected 
                        ? 'ring-3 ring-indigo-400 shadow-md scale-105 z-10' 
                        : 'shadow-2xs hover:scale-102'
                    } ${
                      isCorrect 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                        : 'bg-rose-50 text-rose-800 border-rose-300'
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{token.full}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span className="line-through text-rose-600 font-normal">{token.userChoice}</span>
                        <span className="text-slate-400 text-[10px]">→</span>
                        <span className="text-emerald-700 font-black">{token.full}</span>
                      </>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Khung hiển thị bản dịch tiếng Việt nếu được bật */}
            {showTranslation && (
              <div className="mt-4 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-indigo-950">
                  <Languages className="w-4 h-4 text-indigo-600" />
                  <span>Bản dịch tiếng Việt tham khảo (Song ngữ):</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                  {translations[currentTask.task_id] || 'Đang tải bản dịch...'}
                </p>
              </div>
            )}

            {/* Mẹo học tập */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Đúng: {cwTokens.filter(t => t.type === 'blank' && t.isCorrect).length} từ
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Chưa đúng: {cwTokens.filter(t => t.type === 'blank' && !t.isCorrect).length} từ
              </span>
            </div>

          </div>

          {/* CỘT PHẢI (5/12): CHI TIẾT TỪNG TỪ & HỌC TỪ VỰNG */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="flex items-center justify-between px-1">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Chi tiết đáp án & Học từ vựng ({cwTokens.filter(t => t.type === 'blank').length} câu)</span>
              </h4>
            </div>

            <div className="space-y-3">
              {cwTokens.filter(t => t.type === 'blank').map((token) => {
                const isSelected = activeItemIdx === token.index;
                const isCorrect = token.isCorrect;
                const isSaved = savedWords.has(token.full.toLowerCase());

                return (
                  <div
                    key={token.index}
                    ref={el => cardRefs.current[token.index] = el}
                    onClick={() => setActiveItemIdx(token.index)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-white border-indigo-400 ring-2 ring-indigo-200 shadow-md' 
                        : isCorrect 
                          ? 'bg-white hover:bg-slate-50 border-slate-200' 
                          : 'bg-rose-50/20 hover:bg-rose-50/40 border-rose-200'
                    }`}
                  >
                    {/* Header Thẻ: Số câu + Status Badge */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center">
                          {token.index + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          Từ khuyết: <code className="font-mono text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded font-bold">{token.prefix}[...]</code>
                        </span>
                      </div>

                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Đúng
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          Chưa đúng
                        </span>
                      )}
                    </div>

                    {/* So sánh Đối chiếu đáp án */}
                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
                          Đáp án của bạn:
                        </span>
                        <span className={`font-bold ${isCorrect ? 'text-emerald-700' : 'text-rose-600 line-through'}`}>
                          {token.userChoice}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200">
                        <span className="text-[10px] uppercase font-bold text-emerald-800 block mb-0.5">
                          Đáp án chuẩn:
                        </span>
                        <span className="font-black text-emerald-800 text-sm">
                          {token.full}
                        </span>
                      </div>
                    </div>

                    {/* Lời giải thích */}
                    <div className="text-xs text-slate-600 leading-relaxed bg-slate-50/70 p-2.5 rounded-xl border border-slate-200/80 mb-2.5">
                      <strong className="text-slate-800 font-semibold">Giải thích: </strong>
                      {token.explanation}
                    </div>

                    {/* Action: Lưu từ vựng & Phát âm từ */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleSpeak(token.full);
                        }}
                        className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-bold transition-colors cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-slate-500" />
                        <span>Nghe từ</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveToVocab(token.full, token.explanation);
                        }}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer border ${
                          isSaved 
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                            : 'bg-white hover:bg-indigo-50 text-indigo-700 border-indigo-200'
                        }`}
                      >
                        {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Bookmark className="w-3.5 h-3.5 text-indigo-600" />}
                        <span>{isSaved ? 'Đã lưu vào Sổ từ' : '+ Lưu vào Sổ từ vựng'}</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>
      ) : (
        /* =============================================================== */
        /* TRƯỜNG HỢP 2: GIAO DIỆN XEM ĐÁP ÁN BÀI ĐỌC HIỂU (PASSAGES)       */
        /* =============================================================== */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* CỘT TRÁI (7/12): BÀI ĐỌC HỌC THUẬT & DẪN CHỨNG */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs sticky top-24">
            
            {/* Header bài đọc */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                    {passageDocType}
                  </span>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mt-1">
                    Bài đọc học thuật & Dẫn chứng
                  </h4>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleToggleTranslate(passageText, currentTask.task_id)}
                  disabled={isTranslating}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    showTranslation 
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-2xs' 
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                  title="Dịch bài đọc sang tiếng Việt"
                >
                  <Languages className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{isTranslating ? 'Đang dịch...' : showTranslation ? 'Ẩn bản dịch' : 'Dịch bài đọc'}</span>
                </button>

                <button
                  onClick={() => handleToggleSpeak(passageText)}
                  className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                    isSpeaking 
                      ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse' 
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                  title={isSpeaking ? 'Dừng đọc' : 'Nghe phát âm bài đọc'}
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4 text-slate-600" />}
                </button>
              </div>
            </div>

            {/* Nội dung bài đọc chia đoạn có số đoạn [1], [2] */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#faf9f5] border border-amber-900/10 shadow-2xs space-y-4 max-h-[65vh] overflow-y-auto">
              {passageText.split('\n\n').map((para, pIdx) => {
                if (!para.trim()) return null;

                // Kiểm tra xem đoạn này có chứa từ khóa hoặc dẫn chứng của câu hỏi đang chọn hay không
                const activePrompt = activeQuestionItem?.prompt || activeQuestionDef?.prompt || '';
                const activeExplanation = activeQuestionItem?.explanation || activeQuestionDef?.explanation || '';
                const hasEvidence = (activeExplanation && activeExplanation.length > 10 && para.toLowerCase().includes(activePrompt.substring(0, 15).toLowerCase())) || false;

                return (
                  <div key={pIdx} className="relative group">
                    <p className={`font-serif text-sm sm:text-base leading-relaxed text-slate-800 transition-all p-2 rounded-xl ${
                      hasEvidence ? 'bg-amber-100/60 ring-2 ring-amber-300' : ''
                    }`}>
                      <span className="font-sans font-bold text-xs text-slate-400 mr-2 select-none">
                        [{pIdx + 1}]
                      </span>
                      {para}
                    </p>

                    {hasEvidence && (
                      <span className="absolute -top-2.5 right-2 bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs animate-in zoom-in-95">
                        Dẫn chứng Câu {activeItemIdx + 1}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Khung bản dịch tiếng Việt */}
            {showTranslation && (
              <div className="mt-4 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-indigo-950">
                  <Languages className="w-4 h-4 text-indigo-600" />
                  <span>Bản dịch tiếng Việt bài đọc:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans whitespace-pre-line">
                  {translations[currentTask.task_id] || 'Đang tải bản dịch...'}
                </p>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium flex items-center justify-between">
              <span>💡 Gợi ý: Bấm vào từng câu hỏi bên phải để xem phân tích đáp án chi tiết</span>
            </div>

          </div>

          {/* CỘT PHẢI (5/12): CÂU HỎI TRẮC NGHIỆM & PHÂN TÍCH ĐÁP ÁN */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between px-1">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>Câu hỏi trắc nghiệm & Giải thích ({passageQuestions.length || passageItems.length} câu)</span>
              </h4>
            </div>

            <div className="space-y-4">
              {(passageQuestions.length > 0 ? passageQuestions : passageItems).map((q, qIdx) => {
                const isSelected = activeItemIdx === qIdx;
                const matchedItem = passageItems[qIdx] || {};
                const isCorrect = matchedItem.is_correct ?? (matchedItem.user_choice === (q.correct_answer || q.answer));

                const promptText = q.prompt || q.question || matchedItem.prompt || 'Câu hỏi';
                const options = q.options || matchedItem.options || null;
                const userChoice = String(matchedItem.user_choice || '(Bỏ trống)').trim();
                const correctAns = String(q.correct_answer || q.answer || matchedItem.correct_answer || '').trim();
                const explanation = q.explanation || matchedItem.explanation || '';

                return (
                  <div
                    key={qIdx}
                    ref={el => cardRefs.current[qIdx] = el}
                    onClick={() => setActiveItemIdx(qIdx)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-white border-amber-400 ring-2 ring-amber-200 shadow-md' 
                        : isCorrect 
                          ? 'bg-white hover:bg-slate-50 border-slate-200' 
                          : 'bg-rose-50/20 hover:bg-rose-50/40 border-rose-200'
                    }`}
                  >
                    {/* Header câu hỏi */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-xs font-black text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg">
                        Câu {qIdx + 1}
                      </span>

                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Đúng
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          Chưa đúng
                        </span>
                      )}
                    </div>

                    {/* Đề bài câu hỏi */}
                    <p className="text-xs sm:text-sm font-bold text-slate-900 mb-3.5 leading-snug">
                      {promptText}
                    </p>

                    {/* Hiển thị 4 lựa chọn A, B, C, D nếu có */}
                    {options && typeof options === 'object' ? (
                      <div className="space-y-2 mb-3.5">
                        {Object.entries(options).map(([optKey, optVal]) => {
                          const isThisCorrect = optKey.toUpperCase() === correctAns.toUpperCase();
                          const isThisUserChoice = optKey.toUpperCase() === userChoice.toUpperCase();

                          let optStyle = "bg-slate-50/60 border-slate-200 text-slate-700";
                          let badge = null;

                          if (isThisCorrect) {
                            optStyle = "bg-emerald-50 text-emerald-950 border-emerald-300 font-bold ring-1 ring-emerald-300";
                            badge = (
                              <span className="text-[10px] font-black text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded ml-auto flex items-center gap-1 shrink-0">
                                <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                                ĐÁP ÁN ĐÚNG
                              </span>
                            );
                          } else if (isThisUserChoice && !isCorrect) {
                            optStyle = "bg-rose-50 text-rose-950 border-rose-300 font-bold ring-1 ring-rose-300";
                            badge = (
                              <span className="text-[10px] font-black text-rose-800 bg-rose-200 px-2 py-0.5 rounded ml-auto flex items-center gap-1 shrink-0">
                                <XCircle className="w-3 h-3 text-rose-700" />
                                LỰA CHỌN CỦA BẠN - SAI
                              </span>
                            );
                          }

                          return (
                            <div
                              key={optKey}
                              className={`p-2.5 rounded-xl border text-xs flex items-center gap-2.5 transition-all ${optStyle}`}
                            >
                              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 ${
                                isThisCorrect 
                                  ? 'bg-emerald-600 text-white' 
                                  : isThisUserChoice && !isCorrect 
                                    ? 'bg-rose-600 text-white' 
                                    : 'bg-slate-200 text-slate-700'
                              }`}>
                                {optKey}
                              </span>
                              <span className="leading-snug">{optVal}</span>
                              {badge}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      /* Fallback nếu không có options phân tách */
                      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
                            Bạn chọn:
                          </span>
                          <span className={`font-bold ${isCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>
                            {userChoice}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200">
                          <span className="text-[10px] uppercase font-bold text-emerald-800 block mb-0.5">
                            Đáp án chuẩn:
                          </span>
                          <span className="font-bold text-emerald-800">
                            {correctAns}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Dẫn chứng & Lời giải thích */}
                    {explanation && (
                      <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-950 leading-relaxed font-sans">
                        <strong className="text-amber-900 block font-bold mb-1">
                          📖 Dẫn chứng & Giải thích:
                        </strong>
                        <p className="text-slate-700 leading-relaxed">
                          {explanation}
                        </p>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
