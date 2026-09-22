import React, { useState, useRef } from 'react';
import { BookOpen, RotateCcw } from 'lucide-react';
import { normalizeCompleteWordsTask } from '../../lib/supabase';

// =================================================================
// SUB-COMPONENT 1: COMPLETE THE WORDS TASK
// =================================================================
function CompleteWordsTask({ test, answers, onAnswerChange }) {
  const normTask = normalizeCompleteWordsTask(test);
  const content = normTask.content || {};
  const paragraph = content.paragraph || "";
  const blanks = content.blanks || [];
  const inputRefs = useRef([]);
  const [focusedIndex, setFocusedIndex] = useState(null);

  // Phân tách đoạn văn thành các phần text thường và các từ khuyết chữ cái
  const parseParagraph = () => {
    if (!paragraph) return [];

    const bracketRegex = /([A-Za-z]+)\[([A-Za-z]+)\]/g;
    const tokens = [];
    let lastIndex = 0;
    let match;
    let blankIdx = 0;

    while ((match = bracketRegex.exec(paragraph)) !== null) {
      if (match.index > lastIndex) {
        tokens.push({
          type: 'text',
          content: paragraph.substring(lastIndex, match.index)
        });
      }

      const prefix = match[1];
      const missing = match[2];
      const blankMeta = blanks[blankIdx] || {
        id: `b_${normTask.id || test.id}_${blankIdx + 1}`,
        prefix,
        missing,
        full: `${prefix}${missing}`
      };

      tokens.push({
        type: 'blank',
        id: blankMeta.id,
        prefix: blankMeta.prefix || prefix,
        missing: blankMeta.missing || missing,
        full: blankMeta.full || `${prefix}${missing}`,
        index: blankIdx
      });

      blankIdx++;
      lastIndex = bracketRegex.lastIndex;
    }

    if (lastIndex < paragraph.length) {
      tokens.push({
        type: 'text',
        content: paragraph.substring(lastIndex)
      });
    }

    return tokens;
  };

  const tokens = parseParagraph();
  const totalBlanks = tokens.filter((t) => t.type === 'blank').length;
  const filledCount = tokens
    .filter((t) => t.type === 'blank')
    .filter((t) => (answers[t.id] || '').length === t.missing.length).length;

  const handleCharChange = (token, val) => {
    const sanitized = val.replace(/[^a-zA-Z]/g, '').toLowerCase();
    onAnswerChange(token.id, sanitized);

    if (sanitized.length === token.missing.length) {
      if (inputRefs.current[token.index + 1]) {
        inputRefs.current[token.index + 1].focus();
      }
    }
  };

  const handleKeyDown = (token, e) => {
    const currentVal = answers[token.id] || '';

    if (e.key === 'Backspace' && currentVal.length === 0) {
      if (token.index > 0 && inputRefs.current[token.index - 1]) {
        inputRefs.current[token.index - 1].focus();
      }
    } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
      if (inputRefs.current[token.index + 1]) {
        inputRefs.current[token.index + 1].focus();
      }
    } else if (e.key === 'ArrowLeft') {
      if (token.index > 0 && inputRefs.current[token.index - 1]) {
        inputRefs.current[token.index - 1].focus();
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm max-w-4xl mx-auto">
      
      {/* Header Dạng bài */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-6">
        <div className="flex items-center gap-2.5 text-amber-800 font-bold text-sm uppercase">
          <BookOpen className="w-5 h-5 text-amber-700" />
          <span>READING: COMPLETE THE WORDS (FORMAT 2026)</span>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
          Tiến độ: {filledCount} / {totalBlanks} từ hoàn chỉnh
        </span>
      </div>

      {/* Hướng dẫn làm bài */}
      <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80 mb-6 text-xs text-amber-950 leading-relaxed">
        <strong>Hướng dẫn:</strong> Trong đoạn văn học thuật dưới đây, một số từ bị khuyết các chữ cái ở cuối. 
        Các chữ cái còn thiếu được tượng trưng bằng dấu gạch dưới <strong>`_`</strong>.
        Nhấp vào các dấu gạch dưới để gõ chữ cái còn thiếu (1 gạch là thiếu 1 chữ, 2 gạch là thiếu 2 chữ). Con trỏ sẽ tự động chuyển sang từ tiếp theo khi bạn điền đủ.
      </div>

      {/* ĐOẠN VĂN CHÍNH (ĐIỀN TRỰC TIẾP VÀO CÁC GẠCH DƯỚI) */}
      <div className="p-8 rounded-2xl bg-[#faf9f5] border border-[#e8e4dc] shadow-inner text-slate-800 font-serif text-lg leading-[3rem]">
        {tokens.map((token, idx) => {
          if (token.type === 'text') {
            return (
              <span key={idx} className="whitespace-pre-wrap">
                {token.content}
              </span>
            );
          }

          const userVal = answers[token.id] || '';
          const missingLen = token.missing.length;
          const isFocused = focusedIndex === token.index;

          return (
            <span 
              key={token.id} 
              className={`inline-flex items-baseline mx-1 px-1.5 py-0.5 rounded-lg transition-all ${
                isFocused ? 'bg-amber-100/70 ring-2 ring-amber-400/50' : 'bg-white/80 border border-slate-200 shadow-2xs'
              }`}
              onClick={() => inputRefs.current[token.index]?.focus()}
            >
              <span className="font-bold text-slate-900 font-serif">
                {token.prefix}
              </span>

              <span className="inline-flex items-center gap-1 ml-0.5 relative cursor-text select-none align-baseline">
                {Array.from({ length: missingLen }).map((_, charIdx) => {
                  const char = userVal[charIdx];
                  const isCurrentSlot = isFocused && (userVal.length === charIdx || (charIdx === missingLen - 1 && userVal.length === missingLen));

                  return (
                    <span
                      key={charIdx}
                      className={`inline-flex items-center justify-center w-[18px] h-[26px] font-mono font-bold text-base transition-all select-none border-b-2 ${
                        char
                          ? 'border-teal-700 text-teal-800 bg-teal-50/70'
                          : isCurrentSlot
                          ? 'border-amber-600 bg-amber-100/70 ring-1 ring-amber-400/40'
                          : 'border-slate-700 bg-slate-100/40'
                      }`}
                    >
                      {char || ''}
                    </span>
                  );
                })}

                <input
                  ref={(el) => (inputRefs.current[token.index] = el)}
                  type="text"
                  value={userVal}
                  maxLength={missingLen}
                  onChange={(e) => handleCharChange(token, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(token, e)}
                  onFocus={() => setFocusedIndex(token.index)}
                  onBlur={() => setFocusedIndex(null)}
                  className="absolute inset-0 opacity-0 cursor-text w-full h-full text-transparent"
                  autoCapitalize="none"
                  autoComplete="off"
                  spellCheck="false"
                />
              </span>
            </span>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
        <span>
          💡 Mẹo: Bạn có thể dùng phím <strong>Tab</strong> hoặc <strong>Mũi tên</strong> để chuyển nhanh giữa các từ.
        </span>

        <button
          onClick={() => {
            if (confirm("Bạn có muốn xóa toàn bộ các từ đã điền để làm lại?")) {
              tokens.filter((t) => t.type === 'blank').forEach((t) => onAnswerChange(t.id, ''));
            }
          }}
          className="flex items-center gap-1 font-semibold text-slate-400 hover:text-rose-600 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Làm lại từ đầu</span>
        </button>
      </div>

    </div>
  );
}

// =================================================================
// SUB-COMPONENT 2: PASSAGE QUESTIONS TASK (DAILY LIFE & ACADEMIC)
// =================================================================
function PassageQuestionsTask({ test, answers, onAnswerChange }) {
  const content = test.content || {};
  const questions = content.questions || [];
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const currentQ = questions[currentQIndex] || questions[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* Cột trái: Văn bản bài đọc */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-h-[600px] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded">
            {content.document_type || test.title || "Reading Passage"}
          </span>
          <span className="text-xs text-slate-400 font-medium">Cuộn để đọc toàn bộ</span>
        </div>

        <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed whitespace-pre-line font-serif">
          {content.passage || content.text || content.paragraph || "No passage provided."}
        </div>
      </div>

      {/* Cột phải: Câu hỏi & 4 lựa chọn */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        
        {/* Navigation số câu */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <span className="text-xs font-bold text-slate-500">
            CÂU HỎI {currentQIndex + 1} TRÊN {questions.length}
          </span>
          <div className="flex gap-1.5 flex-wrap">
            {questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isCurrent = idx === currentQIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQIndex(idx)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-amber-600 text-white ring-2 ring-amber-300'
                      : isAnswered
                      ? 'bg-teal-50 text-teal-700 border border-teal-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Nội dung câu hỏi */}
        {currentQ ? (
          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-5 leading-snug">
              {currentQ.prompt || currentQ.question}
            </h3>

            {/* Các lựa chọn A, B, C, D */}
            <div className="space-y-3">
              {Object.entries(currentQ.options || {}).map(([key, label]) => {
                const isSelected = answers[currentQ.id] === key;
                return (
                  <button
                    key={key}
                    onClick={() => onAnswerChange(currentQ.id, key)}
                    className={`w-full flex items-start gap-3 p-3.5 rounded-xl border text-left text-sm transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50/70 text-amber-950 ring-2 ring-amber-400/30'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                      isSelected ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {key}
                    </span>
                    <span className="flex-1 pt-0.5 leading-relaxed">{label}</span>
                  </button>
                );
              })}
            </div>

            {/* Next / Prev câu hỏi */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
              <button
                disabled={currentQIndex === 0}
                onClick={() => setCurrentQIndex((prev) => prev - 1)}
                className="text-xs font-semibold px-3 py-1.5 rounded text-slate-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
              >
                ← Câu trước
              </button>
              <button
                disabled={currentQIndex === questions.length - 1}
                onClick={() => setCurrentQIndex((prev) => prev + 1)}
                className="text-xs font-semibold px-4 py-1.5 rounded bg-amber-600 hover:bg-amber-700 text-white disabled:opacity-30 cursor-pointer"
              >
                Câu tiếp theo →
              </button>
            </div>
          </div>
        ) : (
          <p className="text-slate-400 text-sm">Không tìm thấy câu hỏi.</p>
        )}

      </div>

    </div>
  );
}

// =================================================================
// MAIN COMPONENT: DISPATCHES TO SUB-COMPONENTS TO PREVENT HOOK ERRORS
// =================================================================
export default function ReadingModule(props) {
  if (props.test?.task_type === 'complete_words') {
    return <CompleteWordsTask key={props.test.id} {...props} />;
  }
  return <PassageQuestionsTask key={props.test?.id} {...props} />;
}
