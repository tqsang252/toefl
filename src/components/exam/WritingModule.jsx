import React, { useState, useEffect } from 'react';
import { PenTool, MessageSquare, Mail, CheckCircle2, RotateCcw, ChevronLeft, ChevronRight, HelpCircle, GripVertical, Check, Sparkles, BookOpen, Wand2, Target } from 'lucide-react';
import QuickVocabPopover, { useTextSelectionLookup } from '../dictionary/QuickVocabPopover';
import SentenceEnhancerModal from '../writing/SentenceEnhancerModal';
import SentencePatternsDrawer from '../writing/SentencePatternsDrawer';
import { detectSentencePatternWithAi } from '../../lib/gemini';

// =================================================================
// SUB-COMPONENT 1: BUILD A SENTENCE (FORMAT ETS 2026 - 10 ITEMS)
// =================================================================
function BuildSentenceTask({ test, answers, onAnswerChange }) {
  const content = test.content || {};
  const items = content.items || [];
  const totalItems = items.length;

  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const currentItem = items[activeItemIndex] || items[0] || {};
  const currentSelected = answers[currentItem.id] || [];

  // Trợ lý Sổ tay 25 Cấu trúc câu & AI Gợi ý
  const [isPatternsOpen, setIsPatternsOpen] = useState(false);
  const [aiPatternSuggestion, setAiPatternSuggestion] = useState(null);
  const [isLoadingAiPattern, setIsLoadingAiPattern] = useState(false);
  const [patternCache, setPatternCache] = useState({});

  const handleRequestAiSuggestion = async () => {
    setIsPatternsOpen(true);
    if (!currentItem?.id) return;

    if (patternCache[currentItem.id]) {
      setAiPatternSuggestion(patternCache[currentItem.id]);
      return;
    }

    setIsLoadingAiPattern(true);
    try {
      const res = await detectSentencePatternWithAi({
        context: currentItem.context,
        scrambledWords: currentItem.scrambled,
        targetPrompt: currentItem.target_prompt,
        correctSentenceHint: currentItem.correct_sentence
      });
      setAiPatternSuggestion(res);
      setPatternCache((prev) => ({ ...prev, [currentItem.id]: res }));
    } catch (err) {
      console.error('Lỗi detectSentencePatternWithAi:', err);
    } finally {
      setIsLoadingAiPattern(false);
    }
  };

  useEffect(() => {
    if (currentItem?.id && patternCache[currentItem.id]) {
      setAiPatternSuggestion(patternCache[currentItem.id]);
    } else {
      setAiPatternSuggestion(null);
    }
  }, [currentItem?.id]);

  const cleanWord = (token) =>
    String(token || '')
      .trim()
      .replace(/^[^a-zA-Z0-9$€£%]+|[^a-zA-Z0-9$€£%]+$/g, '')
      .toLowerCase();

  // 1. Chuẩn hóa danh sách từ trong đáp án đúng (loại bỏ dấu câu đứng riêng như '.', '?')
  const validCorrectOrder = (currentItem.correct_order || [])
    .map(cleanWord)
    .filter((w) => w.length > 0);

  // 2. Chuẩn hóa kho từ scrambled
  let scrambledList = (currentItem.scrambled || [])
    .map(cleanWord)
    .filter((w) => w.length > 0);

  // 3. Cơ chế tự động bù từ thiếu (Self-healing):
  // Nếu kho từ scrambled bị thiếu từ so với correct_order (do AI vô tình sót từ),
  // tự động bù các từ bị thiếu vào scrambledList để học viên LUÔN có đủ từ ghép!
  const scrambledCounts = {};
  scrambledList.forEach((w) => {
    scrambledCounts[w] = (scrambledCounts[w] || 0) + 1;
  });

  const correctCounts = {};
  validCorrectOrder.forEach((w) => {
    correctCounts[w] = (correctCounts[w] || 0) + 1;
  });

  Object.entries(correctCounts).forEach(([word, neededCount]) => {
    const currentCount = scrambledCounts[word] || 0;
    if (currentCount < neededCount) {
      for (let i = 0; i < neededCount - currentCount; i++) {
        scrambledList.push(word);
      }
    }
  });

  // 4. Số vị trí gạch cần điền:
  // Luôn bằng đúng số từ trong câu hoàn chỉnh (validCorrectOrder.length)
  const targetSlotCount = validCorrectOrder.length > 0
    ? validCorrectOrder.length
    : Math.max(1, scrambledList.length - (currentItem.decoys?.length || 0));

  // 5. Xác định các từ còn lại trong kho từ (Word Bank)
  // Xử lý cả trường hợp từ trùng lặp
  const availableWords = scrambledList.filter((w, idx) => {
    const totalCountInScrambled = scrambledList.slice(0, idx + 1).filter((x) => x === w).length;
    const countInSelected = currentSelected.filter((x) => x === w).length;
    return countInSelected < totalCountInScrambled;
  });

  // Xử lý thêm từ vào câu
  const handleAddWord = (word) => {
    const updated = [...currentSelected, word];
    onAnswerChange(currentItem.id, updated);
  };

  // Xử lý bỏ từ ra khỏi câu
  const handleRemoveWord = (wordIndex) => {
    const updated = currentSelected.filter((_, idx) => idx !== wordIndex);
    onAnswerChange(currentItem.id, updated);
  };

  // Xử lý làm lại câu này
  const handleResetCurrent = () => {
    onAnswerChange(currentItem.id, []);
  };

  // HTML5 Drag & Drop
  const handleDragStart = (e, data) => {
    e.dataTransfer.setData('application/json', JSON.stringify(data));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDropOnZone = (e) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data.source === 'bank') {
        handleAddWord(data.word);
      }
    } catch (err) {
      console.error('Lỗi drop từ:', err);
    }
  };

  const handleDropOnPlacedWord = (e, targetIdx) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data.source === 'placed') {
        const fromIdx = data.index;
        if (fromIdx === targetIdx) return;
        const updated = [...currentSelected];
        const [movedItem] = updated.splice(fromIdx, 1);
        updated.splice(targetIdx, 0, movedItem);
        onAnswerChange(currentItem.id, updated);
      } else if (data.source === 'bank') {
        const updated = [...currentSelected];
        updated.splice(targetIdx, 0, data.word);
        onAnswerChange(currentItem.id, updated);
      }
    } catch (err) {
      console.error('Lỗi reorder từ:', err);
    }
  };

  const handleDropOnEmptySlot = (e, targetIdx) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data.source === 'bank') {
        handleAddWord(data.word);
      } else if (data.source === 'placed') {
        const fromIdx = data.index;
        const updated = [...currentSelected];
        const [movedItem] = updated.splice(fromIdx, 1);
        updated.push(movedItem);
        onAnswerChange(currentItem.id, updated);
      }
    } catch (err) {
      console.error('Lỗi drop trên gạch vị trí:', err);
    }
  };

  // Chuyển câu hỏi & tự động đồng bộ thời gian thao tác cho câu vừa rời đi
  const handleSwitchItem = (targetIdx) => {
    if (targetIdx === activeItemIndex || targetIdx < 0 || targetIdx >= totalItems) return;
    if (currentItem?.id) {
      onAnswerChange(currentItem.id, currentSelected);
    }
    setActiveItemIndex(targetIdx);
  };

  const slots = Array.from({ length: targetSlotCount }).map((_, slotIdx) => ({
    slotIdx,
    isFilled: slotIdx < currentSelected.length,
    word: currentSelected[slotIdx]
  }));

  // Đếm số câu đã làm
  const completedCount = items.filter((it) => (answers[it.id] || []).length > 0).length;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm max-w-4xl mx-auto">
      
      {/* 1. Header Dạng bài */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-6">
        <div className="flex items-center gap-2.5 text-rose-800 font-bold text-sm uppercase">
          <PenTool className="w-5 h-5 text-rose-700" />
          <span>WRITING: BUILD A SENTENCE (FORMAT 2026)</span>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Nút Sổ tay 25 Cấu trúc */}
          <button
            type="button"
            onClick={() => setIsPatternsOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 shadow-2xs cursor-pointer active:scale-95 transition-all"
            title="Mở bảng tra cứu 25 công thức cấu trúc câu ETS TOEFL"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-700" />
            <span>25 Cấu trúc mẫu</span>
          </button>

          {/* Nút AI Gợi ý Cấu trúc */}
          <button
            type="button"
            onClick={handleRequestAiSuggestion}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs shadow-2xs cursor-pointer active:scale-95 transition-all animate-pulse hover:animate-none"
            title="AI phân tích câu này và tô màu cấu trúc phù hợp trong bảng 25 pattern"
          >
            <Sparkles className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
            <span>AI Gợi ý cấu trúc</span>
          </button>

          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
            Tiến độ: {completedCount} / {totalItems} câu
          </span>
        </div>
      </div>

      {/* 2. Thanh điều hướng nhanh 10 câu (Quick Stepper) */}
      <div className="mb-6 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Danh sách 10 câu (Bấm để chuyển nhanh):
          </span>
          <span className="text-[11px] font-semibold text-rose-700">
            Câu {activeItemIndex + 1} / {totalItems}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {items.map((it, idx) => {
            const isAnswered = (answers[it.id] || []).length > 0;
            const isCurrent = idx === activeItemIndex;

            return (
              <button
                key={it.id || idx}
                onClick={() => handleSwitchItem(idx)}
                className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-rose-700 text-white shadow-xs ring-2 ring-rose-300'
                    : isAnswered
                    ? 'bg-teal-100 text-teal-800 border border-teal-300'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
                title={`Câu ${idx + 1}: ${isAnswered ? 'Đã ghép' : 'Chưa hoàn thành'}`}
              >
                {isAnswered && !isCurrent ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : (
                  idx + 1
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Khung Ngữ cảnh ban đầu (Conversational / Initial Context) */}
      <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90 mb-6">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wide">
            <HelpCircle className="w-4 h-4 text-amber-700" />
            <span>CÂU NGỮ CẢNH BAN ĐẦU (INITIAL CONTEXT)</span>
          </div>
          <button
            type="button"
            onClick={handleRequestAiSuggestion}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-200/90 hover:bg-amber-300 text-amber-950 font-bold text-[11px] border border-amber-300 transition-all cursor-pointer shadow-2xs hover:scale-102 active:scale-95"
            title="Nhờ AI gợi ý cấu trúc câu phù hợp từ bảng 25 pattern"
          >
            <Sparkles className="w-3 h-3 text-amber-800" />
            <span>Gợi ý cấu trúc câu này</span>
          </button>
        </div>
        <p className="text-base sm:text-lg font-serif italic text-slate-900 leading-relaxed pl-1">
          {currentItem.context || "No context provided."}
        </p>
      </div>

      {/* 4. Yêu cầu làm bài & Chỉ báo vị trí gạch */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs font-bold text-slate-700 uppercase tracking-wide">
        <div className="flex items-center gap-2">
          <span>{currentItem.target_prompt || "Hoàn thiện câu phản hồi:"}</span>
          <span className="text-[11px] font-semibold text-rose-700 normal-case bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200">
            Cần ghép đúng {targetSlotCount} từ vào {targetSlotCount} gạch vị trí
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border transition-all ${
            currentSelected.length === targetSlotCount
              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
              : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}>
            Đã điền: {currentSelected.length} / {targetSlotCount} gạch {currentSelected.length === targetSlotCount && "✓"}
          </span>

          {currentSelected.length > 0 && (
            <button
              onClick={handleResetCurrent}
              className="text-slate-400 hover:text-rose-600 flex items-center gap-1 font-semibold cursor-pointer normal-case"
            >
              <RotateCcw className="w-3 h-3" />
              Làm lại
            </button>
          )}
        </div>
      </div>

      {/* 5. Khung ghép câu có ĐÚNG SỐ GẠCH VỊ TRÍ TƯƠNG ỨNG VỚI SỐ TỪ CẦN GHÉP */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropOnZone}
        className="min-h-[110px] p-5 sm:p-6 rounded-2xl bg-[#faf9f5] border-2 border-rose-300/80 shadow-inner flex flex-wrap items-center gap-3 mb-6 transition-all"
      >
        {slots.map(({ slotIdx, isFilled, word }) => {
          if (isFilled) {
            return (
              <div
                key={slotIdx}
                draggable
                onDragStart={(e) => handleDragStart(e, { source: 'placed', index: slotIdx, word })}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDropOnPlacedWord(e, slotIdx)}
                onClick={() => handleRemoveWord(slotIdx)}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white text-slate-900 font-serif text-sm font-bold border-2 border-rose-400 shadow-xs hover:border-rose-600 hover:shadow-sm cursor-grab active:cursor-grabbing transition-all group select-none"
                title="Bấm để đưa từ này trở lại kho từ, hoặc kéo để đổi vị trí"
              >
                <GripVertical className="w-3.5 h-3.5 text-slate-300 group-hover:text-rose-500 shrink-0" />
                <span>{word}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveWord(slotIdx);
                  }}
                  className="w-4 h-4 rounded-full text-slate-400 hover:text-rose-700 hover:bg-rose-100 flex items-center justify-center text-xs ml-1 cursor-pointer"
                  title="Gỡ từ"
                >
                  ✕
                </button>
              </div>
            );
          }

          const isNextSlot = slotIdx === currentSelected.length;

          return (
            <div
              key={slotIdx}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDropOnEmptySlot(e, slotIdx)}
              className={`h-12 min-w-[100px] px-3.5 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all select-none ${
                isNextSlot
                  ? 'border-rose-400 bg-rose-50/70 ring-2 ring-rose-200/80 shadow-xs'
                  : 'border-slate-300 bg-white/70 hover:border-slate-400 hover:bg-slate-50'
              }`}
              title={`Gạch vị trí ${slotIdx + 1}: Kéo hoặc bấm từ để điền vào đây`}
            >
              <span className={`text-[10px] font-bold font-mono uppercase tracking-wider mb-0.5 ${
                isNextSlot ? 'text-rose-700 font-bold' : 'text-slate-400'
              }`}>
                Vị trí {slotIdx + 1}
              </span>
              <div className={`h-[3px] w-14 rounded-full transition-all ${
                isNextSlot ? 'bg-rose-500 animate-pulse' : 'bg-slate-400'
              }`} />
            </div>
          );
        })}

        {/* Dấu chấm câu kết thúc */}
        <span className="text-3xl font-serif font-black text-slate-700 select-none self-center ml-1">
          {currentItem.correct_sentence?.trim().endsWith('?') ? '?' : '.'}
        </span>
      </div>

      {/* 6. Kho từ cho trước (Word Bank) */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
            Kho từ vựng (Word Bank):
          </span>
          <span className="text-[11px] text-slate-400 italic">
            (Có thể có từ bẫy không sử dụng)
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {availableWords.map((word, wIdx) => (
            <button
              key={wIdx}
              draggable
              onDragStart={(e) => handleDragStart(e, { source: 'bank', index: wIdx, word })}
              onClick={() => handleAddWord(word)}
              className="px-4 py-2 rounded-xl bg-white hover:bg-rose-50 text-slate-800 hover:text-rose-900 font-serif text-sm font-semibold border border-slate-300 hover:border-rose-300 shadow-2xs hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>{word}</span>
            </button>
          ))}

          {availableWords.length === 0 && (
            <span className="text-xs text-emerald-700 font-semibold italic flex items-center gap-1.5 py-1">
              <CheckCircle2 className="w-4 h-4" />
              Bạn đã sử dụng hết các từ trong kho!
            </span>
          )}
        </div>
      </div>

      {/* 7. Điều hướng giữa 10 câu */}
      <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
        <button
          disabled={activeItemIndex === 0}
          onClick={() => handleSwitchItem(activeItemIndex - 1)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Câu trước</span>
        </button>

        <span className="text-xs font-bold text-slate-400">
          Câu {activeItemIndex + 1} / {totalItems}
        </span>

        <button
          disabled={activeItemIndex === totalItems - 1}
          onClick={() => handleSwitchItem(activeItemIndex + 1)}
          className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-rose-700 hover:bg-rose-800 text-white disabled:opacity-30 shadow-2xs cursor-pointer transition-all active:scale-95"
        >
          <span>Câu tiếp theo</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Quick Tab Button on Right Edge */}
      <button
        type="button"
        onClick={() => setIsPatternsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-slate-900/95 hover:bg-rose-900 text-white px-2.5 py-3.5 rounded-l-2xl shadow-2xl flex flex-col items-center gap-2 border-l-2 border-y-2 border-amber-400 cursor-pointer transition-all hover:scale-105 active:scale-95 group"
        title="Mở Sổ tay 25 Cấu trúc câu TOEFL"
      >
        <BookOpen className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
        <span className="text-[10px] font-black tracking-widest uppercase [writing-mode:vertical-lr] text-amber-200 group-hover:text-white">
          25 Cấu Trúc
        </span>
      </button>

      {/* Drawer Tra cứu & AI Gợi ý 25 Cấu trúc */}
      <SentencePatternsDrawer
        isOpen={isPatternsOpen}
        onClose={() => setIsPatternsOpen(false)}
        currentItem={currentItem}
        aiSuggestion={aiPatternSuggestion}
        isLoadingAi={isLoadingAiPattern}
        onRequestAiSuggestion={handleRequestAiSuggestion}
      />

    </div>
  );
}

// =================================================================
// SUB-COMPONENT 2: WRITE AN EMAIL (FORMAT ETS 2026)
// =================================================================
function WriteEmailTask({ test, answers, onAnswerChange }) {
  const content = test.content || {};
  const { selectionData, clearSelection, handleTextMouseUp } = useTextSelectionLookup();
  const [isEnhancerOpen, setIsEnhancerOpen] = useState(false);
  const requirements = content.requirements || [
    "Apologize for your absence and state the reason",
    "Inquire about review notes or slides",
    "Request an appointment during office hours"
  ];

  // Lưu riêng theo ID của test để không bị trùng lặp với dạng bài khác
  const answerKey = test.id ? `email_${test.id}` : 'email_essay';
  const textVal = answers[answerKey] || answers['email_essay'] || (test.id && answers[test.id]) || '';
  const wordCount = textVal.trim() ? textVal.trim().split(/\s+/).length : 0;
  const minWords = content.min_words || 80;
  const isTargetMet = wordCount >= minWords;

  const handleAdoptSentence = (sentence) => {
    const updated = textVal ? `${textVal.trim()} ${sentence}` : sentence;
    onAnswerChange(answerKey, updated);
    onAnswerChange('email_essay', updated);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-6xl mx-auto">
      
      {/* Cột trái: Tình huống & Yêu cầu đề bài */}
      <div 
        onMouseUp={handleTextMouseUp}
        className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5"
      >
        <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase border-b pb-3">
          <Mail className="w-4 h-4 text-rose-700" />
          <span>TASK TYPE: WRITE AN EMAIL (FORMAT 2026)</span>
        </div>

        {/* Tình huống (Scenario) */}
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Tình huống giao tiếp (Scenario):
          </span>
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-950 font-serif leading-relaxed">
            {content.scenario || "You need to write an email to your professor regarding an upcoming absence."}
          </div>
        </div>

        {/* Các yêu cầu bắt buộc (Requirements) */}
        <div>
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2.5">
            Các điểm bắt buộc phải có trong email:
          </span>
          <div className="space-y-2">
            {requirements.map((req, idx) => (
              <div key={idx} className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-100/70 text-[11px] text-slate-600 leading-relaxed">
          💡 <strong>Mục tiêu:</strong> Viết từ <strong>{content.recommended_words || "100 - 130 từ"}</strong>. Đảm bảo ngôn từ lịch sự, cấu trúc mở đầu và kết thúc chuyên nghiệp.
        </div>
      </div>

      {/* Cột phải: Khung soạn thảo Email */}
      <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        
        {/* Thanh trạng thái số từ & Nút Nâng cấp câu */}
        <div className="flex items-center justify-between border-b pb-4 mb-4 gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 uppercase">Soạn thảo Email</span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">• Thời gian đề xuất: ~7 phút</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsEnhancerOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-2xs cursor-pointer active:scale-95 transition-all"
              title="Nâng cấp câu văn tiếng Anh theo 3 cấp độ chuẩn ETS"
            >
              <Sparkles className="w-3.5 h-3.5 fill-white" />
              <span>Nâng cấp câu (3 Cấp độ)</span>
            </button>

            <span className={`text-xs font-bold px-3 py-1 rounded-full border transition-all ${
              isTargetMet
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-amber-50 text-amber-700 border-amber-300'
            }`}>
              Số từ: {wordCount} / {minWords} từ tối thiểu {isTargetMet && "✓"}
            </span>
          </div>
        </div>

        {/* Form mô phỏng Client Email */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-xs border-b border-slate-100 pb-2">
            <span className="w-16 font-bold text-slate-500 uppercase">To:</span>
            <span className="font-semibold text-slate-800">{content.recipient || "Professor Dr. Vance"}</span>
          </div>
          <div className="flex items-center gap-2 text-xs border-b border-slate-100 pb-2">
            <span className="w-16 font-bold text-slate-500 uppercase">Subject:</span>
            <span className="text-slate-600 font-medium">{content.subject_hint || "Absence Inquiry & Consultation Request"}</span>
          </div>
        </div>

        {/* Textarea nhập nội dung */}
        <textarea
          value={textVal}
          onChange={(e) => {
            onAnswerChange(answerKey, e.target.value);
            onAnswerChange('email_essay', e.target.value);
          }}
          placeholder="Dear Professor Vance,&#10;&#10;I am writing to respectfully inform you that..."
          className="w-full h-80 p-4 rounded-2xl border border-slate-300 focus:border-rose-600 focus:ring-2 focus:ring-rose-200 font-serif text-sm text-slate-800 resize-none leading-relaxed outline-hidden bg-[#fdfdfc]"
        />

        <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
          <span>Gợi ý: Mở đầu bằng lời chào kính trọng và kết thúc bằng lời cảm ơn.</span>
        </div>

      </div>

      {/* Pop-up Tra & Lưu từ vựng 1-chạm khi bôi đen */}
      {selectionData && (
        <QuickVocabPopover
          selection={selectionData}
          onClose={clearSelection}
        />
      )}

      {/* Modal Nâng Cấp Câu Văn 3 Cấp Độ */}
      <SentenceEnhancerModal
        isOpen={isEnhancerOpen}
        onClose={() => setIsEnhancerOpen(false)}
        taskContext="TOEFL Writing Task 2: Write an Email"
        onAdoptSentence={handleAdoptSentence}
      />

    </div>
  );
}

// =================================================================
// SUB-COMPONENT 3: ACADEMIC DISCUSSION BOARD (FORMAT ETS 2026)
// =================================================================
function AcademicDiscussionTask({ test, answers, onAnswerChange }) {
  const content = test.content || {};
  const { selectionData, clearSelection, handleTextMouseUp } = useTextSelectionLookup();
  const [isEnhancerOpen, setIsEnhancerOpen] = useState(false);

  // Fallback thông minh để không bao giờ bị trắng thẻ bên trái
  const profObj = content.professor_prompt || content.professor || {};
  const profName = profObj.name || "Dr. Eleanor Robinson";
  const profTitle = profObj.title || "Professor";
  const profQuestion = profObj.question || content.question || content.prompt || content.topic || 
    "Many universities are debating whether generative AI tools should be integrated into coursework or banned from academic assignments. In your post, express your perspective on whether AI enhances or hinders students' critical thinking skills. Explain your reasons clearly.";
  const courseTopic = content.topic || content.course || "Academic Discussion Board";

  const rawPeers = content.peer_posts || content.peers || content.students || [];
  const peers = rawPeers.length > 0 ? rawPeers : [
    {
      student: "Michael",
      avatar_bg: "bg-blue-600",
      stance: "AI is essentially a cognitive shortcut that makes students passive learners and undermines genuine problem-solving and critical analysis skills."
    },
    {
      student: "Sarah",
      avatar_bg: "bg-emerald-600",
      stance: "When used responsibly as a research partner, AI accelerates learning and allows students to focus on higher-level conceptual synthesis."
    }
  ];

  const minWords = content.min_words || 100;

  // Lưu riêng theo ID của test để không bị trùng lặp với Email
  const answerKey = test.id ? `discussion_${test.id}` : 'discussion_essay';
  const textVal = answers[answerKey] || answers['discussion_essay'] || (test.id && answers[test.id]) || '';
  const wordCount = textVal.trim() ? textVal.trim().split(/\s+/).length : 0;
  const isTargetMet = wordCount >= minWords;

  const handleAdoptSentence = (sentence) => {
    const updated = textVal ? `${textVal.trim()} ${sentence}` : sentence;
    onAnswerChange(answerKey, updated);
    onAnswerChange('discussion_essay', updated);
    onAnswerChange('essay_discussion', updated);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-6xl mx-auto">
      
      {/* Cột trái: Diễn đàn lớp học với Giáo sư & Bạn học (ĐẢM BẢO KHÔNG BAO GIỜ BỊ TRẮNG) */}
      <div 
        onMouseUp={handleTextMouseUp}
        className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4 max-h-[640px] overflow-y-auto"
      >
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase">
            <MessageSquare className="w-4 h-4 text-rose-700" />
            <span>ACADEMIC DISCUSSION BOARD</span>
          </div>
        </div>

        {/* Bài đăng của Giáo sư */}
        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-2xs">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-700 text-white flex items-center justify-center font-bold text-sm shadow-2xs">
              👨‍🏫
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm block">
                {profName}
              </span>
              <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">
                {profTitle} • Course Instructor
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-serif pt-1">
            {profQuestion}
          </p>
        </div>

        {/* Ý kiến của các sinh viên trong lớp */}
        <div className="space-y-3 pt-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Bài thảo luận của bạn học (Classmate Responses):
          </span>

          {peers.map((peer, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs shadow-2xs">
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`w-6 h-6 rounded-full ${peer.avatar_bg || 'bg-slate-700'} text-white flex items-center justify-center text-[10px] font-bold`}>
                  {peer.student ? peer.student.charAt(0) : `S${idx + 1}`}
                </div>
                <span className="font-bold text-slate-800">{peer.student || `Student ${idx + 1}`}</span>
              </div>
              <p className="text-slate-700 font-serif leading-relaxed italic pl-1">
                "{peer.stance || peer.opinion || peer.response}"
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Cột phải: Khung gõ bài của thí sinh */}
      <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        
        <div className="flex items-center justify-between border-b pb-4 mb-4 gap-2 flex-wrap">
          <div>
            <span className="text-xs font-bold text-slate-700 uppercase block">Bài đóng góp của bạn</span>
            <span className="text-[11px] text-slate-400">Thời gian đề xuất: ~10 phút</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsEnhancerOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-2xs cursor-pointer active:scale-95 transition-all"
              title="Nâng cấp câu văn tiếng Anh theo 3 cấp độ chuẩn ETS"
            >
              <Sparkles className="w-3.5 h-3.5 fill-white" />
              <span>Nâng cấp câu (3 Cấp độ)</span>
            </button>

            <span className={`text-xs font-bold px-3 py-1 rounded-full border transition-all ${
              isTargetMet 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                : 'bg-amber-50 text-amber-700 border-amber-300'
            }`}>
              Số từ: {wordCount} / {minWords} từ tối thiểu {isTargetMet && "✓"}
            </span>
          </div>
        </div>

        <textarea
          value={textVal}
          onChange={(e) => {
            onAnswerChange(answerKey, e.target.value);
            onAnswerChange('discussion_essay', e.target.value);
            onAnswerChange('essay_discussion', e.target.value);
          }}
          placeholder="In my view, while both viewpoints raise valid points, I believe that..."
          className="w-full h-80 p-4 rounded-2xl border border-slate-300 focus:border-rose-600 focus:ring-2 focus:ring-rose-200 font-serif text-sm text-slate-800 resize-none leading-relaxed outline-hidden bg-[#fdfdfc]"
        />

        <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
          📌 <strong>Tiêu chuẩn ETS 2026:</strong> Tối thiểu <strong>{minWords} từ</strong>. Nêu rõ lập trường cá nhân, liên hệ và phản biện ý kiến của các bạn học trong lớp để bảo vệ luận điểm.
        </div>

      </div>

      {/* Pop-up Tra & Lưu từ vựng 1-chạm khi bôi đen */}
      {selectionData && (
        <QuickVocabPopover
          selection={selectionData}
          onClose={clearSelection}
        />
      )}

      {/* Modal Nâng Cấp Câu Văn 3 Cấp Độ */}
      <SentenceEnhancerModal
        isOpen={isEnhancerOpen}
        onClose={() => setIsEnhancerOpen(false)}
        taskContext="TOEFL Writing Task 3: Academic Discussion Board"
        onAdoptSentence={handleAdoptSentence}
      />

    </div>
  );
}

// =================================================================
// MAIN WRITING MODULE COMPONENT (DISPATCHER)
// =================================================================
export default function WritingModule({ test, answers, onAnswerChange }) {
  if (test.task_type === 'build_sentence') {
    return <BuildSentenceTask test={test} answers={answers} onAnswerChange={onAnswerChange} />;
  }

  if (test.task_type === 'write_email') {
    return <WriteEmailTask test={test} answers={answers} onAnswerChange={onAnswerChange} />;
  }

  // Dạng 3 (hoặc fallback mặc định): Academic Discussion
  return <AcademicDiscussionTask test={test} answers={answers} onAnswerChange={onAnswerChange} />;
}
