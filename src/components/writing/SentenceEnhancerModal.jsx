import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  X, 
  Copy, 
  Check, 
  Volume2, 
  ArrowRight, 
  Send, 
  RotateCcw, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle,
  Zap,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { enhanceSentenceWithAi, isAiConfigured } from '../../lib/gemini';

const SAMPLE_SENTENCES = [
  {
    label: "Công nghệ trong giáo dục",
    text: "In my opinion, technology is good because it helps students study easier."
  },
  {
    label: "Giao thông công cộng & Môi trường",
    text: "I think governments should spend more money on public transport to reduce pollution."
  },
  {
    label: "Thư xin phép vắng mặt",
    text: "I am writing to tell you that I cannot attend class tomorrow because I have a doctor appointment."
  }
];

export default function SentenceEnhancerModal({
  isOpen,
  onClose,
  initialSentence = '',
  taskContext = '',
  onAdoptSentence = null
}) {
  const [inputText, setInputText] = useState(initialSentence || '');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copiedLevel, setCopiedLevel] = useState(null);
  const [adoptedLevel, setAdoptedLevel] = useState(null);
  const textareaRef = useRef(null);

  // Cập nhật khi mở modal với câu khởi tạo
  useEffect(() => {
    if (isOpen) {
      if (initialSentence) {
        setInputText(initialSentence.trim());
      }
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    } else {
      setError(null);
      setCopiedLevel(null);
      setAdoptedLevel(null);
    }
  }, [isOpen, initialSentence]);

  // Đóng khi bấm Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Thực hiện phân tích & nâng cấp câu
  const handleEnhance = async (sentenceToRun) => {
    const target = (sentenceToRun || inputText).trim();
    if (!target || isLoading) return;

    setIsLoading(true);
    setError(null);
    setCopiedLevel(null);
    setAdoptedLevel(null);

    try {
      const data = await enhanceSentenceWithAi(target, taskContext);
      setResult(data);
    } catch (err) {
      console.error('Lỗi khi nâng cấp câu:', err);
      setError(
        !isAiConfigured()
          ? 'Chưa cấu hình API Key. Vui lòng thêm Gemini API Key trong phần Cài đặt để sử dụng tính năng này.'
          : (err.message || 'Không thể kết nối hệ thống AI để nâng cấp câu văn.')
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Phát âm giọng đọc chuẩn Mỹ
  const handleSpeak = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && text) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Sao chép nội dung vào Clipboard
  const handleCopy = (text, level) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedLevel(level);
    setTimeout(() => setCopiedLevel(null), 2000);
  };

  // Áp dụng câu văn vào bài viết chính
  const handleAdopt = (sentence, level) => {
    if (!sentence) return;
    if (typeof onAdoptSentence === 'function') {
      onAdoptSentence(sentence);
      setAdoptedLevel(level);
      setTimeout(() => {
        setAdoptedLevel(null);
        onClose();
      }, 800);
    } else {
      handleCopy(sentence, level);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-5xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* 1. Header Modal */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between border-b border-slate-700/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center font-black shadow-xs">
              <Sparkles className="w-5 h-5 fill-slate-950 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Nâng Cấp Câu Văn Writing 3 Cấp Độ
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400/20 text-amber-300 border border-amber-400/40 uppercase tracking-wider">
                  ETS Benchmark 2026
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Nâng tầm câu văn tự nhiên, gãy gọn, dễ nhớ mà vẫn đạt điểm tối đa (Band 4.0 → Band 5.0 → Band 6.0)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/80 rounded-xl transition-colors cursor-pointer"
            title="Đóng (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Thân Modal (Cuộn mượt mà) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 bg-slate-50/60 custom-scrollbar">
          
          {/* Khung Nhập Câu Văn Bản Gốc */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span>Câu nháp của bạn (Student's draft sentence):</span>
              </label>

              {/* Gợi ý câu mẫu nhanh */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] text-slate-400 font-medium hidden md:inline">Thử nhanh câu mẫu:</span>
                {SAMPLE_SENTENCES.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setInputText(s.text);
                      handleEnhance(s.text);
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 hover:bg-amber-50 hover:text-amber-900 border border-slate-200 transition-colors cursor-pointer"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    handleEnhance();
                  }
                }}
                disabled={isLoading}
                rows={3}
                placeholder="Nhập hoặc dán câu tiếng Anh của bạn vào đây (Ví dụ: In my opinion, technology is good because it helps students study easier)..."
                className="w-full text-sm p-3.5 pr-24 bg-slate-50/70 hover:bg-slate-50 focus:bg-white rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 font-serif text-slate-800 resize-none transition-all placeholder:text-slate-400 outline-none leading-relaxed"
              />

              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                {inputText.trim() && (
                  <button
                    type="button"
                    onClick={() => setInputText('')}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                    title="Xóa nội dung"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleEnhance()}
                  disabled={!inputText.trim() || isLoading}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-xs ${
                    !inputText.trim() || isLoading
                      ? 'bg-slate-300 text-white opacity-60 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white active:scale-95'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Đang nâng cấp...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Nâng cấp 3 Cấp độ</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Phím tắt: Bấm <strong>Ctrl + Enter</strong> để phân tích tức thì.</span>
              {taskContext && (
                <span className="italic text-slate-500">Ngữ cảnh: {taskContext}</span>
              )}
            </div>

            <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Bí quyết điểm cao ETS 2026:</strong> Ưu tiên câu văn mạch lạc, tự nhiên, gãy gọn và dễ nhớ. Tránh dùng từ ngữ quá hàn lâm, rườm rà gây khó nhớ khi vào phòng thi.
              </span>
            </div>
          </div>

          {/* Lỗi nếu có */}
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs flex items-start gap-2.5 shadow-2xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Trạng thái đang tải */}
          {isLoading && (
            <div className="py-12 bg-white rounded-3xl border border-slate-200 text-center space-y-3 shadow-2xs">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto shadow-2xs animate-pulse">
                <Sparkles className="w-5 h-5 animate-spin-slow" />
              </div>
              <h4 className="font-extrabold text-slate-800 text-sm">
                AI đang biên soạn 3 nấc thang học thuật ETS...
              </h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Tối ưu hóa ngữ pháp, bổ sung liên từ học thuật và nâng cấp cấu trúc câu lên chuẩn Band 6.0 Collocations.
              </p>
            </div>
          )}

          {/* 3. LƯỚI 3 CẤP ĐỘ NÂNG CẤP (SIDE-BY-SIDE 3 TIERS) */}
          {result && !isLoading && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <span>Kết quả nâng cấp 3 cấp độ chuẩn ETS 2026:</span>
                </h4>
                <span className="text-[11px] text-slate-400">
                  Chọn câu phù hợp với trình độ mục tiêu của bạn
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
                
                {/* ========================================================= */}
                {/* CẤP ĐỘ 1: BAND 3.5 - 4.0 (CLEAR & ACCURATE)                */}
                {/* ========================================================= */}
                <div className="bg-white rounded-3xl border border-sky-200 shadow-xs p-5 flex flex-col justify-between transition-all hover:shadow-md hover:border-sky-300 relative group">
                  <div className="space-y-4">
                    {/* Header Cấp độ */}
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-sky-100 text-sky-800 border border-sky-200">
                        Level 1
                      </span>
                      <div className="text-right">
                        <span className="text-xs font-black text-sky-900 block">
                          {result.level1?.band || 'Band 3.5 - 4.0'}
                        </span>
                        <span className="text-[10px] text-sky-600 font-semibold">
                          {result.level1?.title || 'Clear & Accurate'}
                        </span>
                      </div>
                    </div>

                    {/* Câu văn hoàn thiện */}
                    <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-100 font-serif text-sm text-slate-800 leading-relaxed min-h-[70px]">
                      "{result.level1?.sentence}"
                    </div>

                    {/* Phân tích Ngữ pháp & Từ vựng */}
                    <div className="space-y-2 text-xs">
                      {result.level1?.grammar_notes && result.level1.grammar_notes.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-sky-800 uppercase tracking-wider block">
                            ✓ Ngữ pháp & Cú pháp:
                          </span>
                          <ul className="space-y-1 text-[11px] text-slate-600 pl-3">
                            {result.level1.grammar_notes.map((note, nIdx) => (
                              <li key={nIdx} className="list-disc leading-relaxed">
                                {note}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {result.level1?.vocab_changes && result.level1.vocab_changes.length > 0 && (
                        <div className="pt-2 border-t border-slate-100 space-y-1">
                          <span className="text-[10px] font-bold text-sky-800 uppercase tracking-wider block">
                            ✓ Từ vựng thay thế:
                          </span>
                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            {result.level1.vocab_changes.map((v, vIdx) => (
                              <span key={vIdx} className="px-2 py-0.5 rounded-lg bg-sky-50 border border-sky-100 text-[10px] text-sky-900 font-medium">
                                <span className="line-through text-slate-400">{v.from}</span> → <strong>{v.to}</strong>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Nút Hành động */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleSpeak(result.level1?.sentence)}
                      className="p-2 text-slate-400 hover:text-sky-700 hover:bg-sky-50 rounded-xl transition-colors cursor-pointer"
                      title="Nghe phát âm chuẩn Mỹ"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleCopy(result.level1?.sentence, 1)}
                        className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                        title="Sao chép câu này"
                      >
                        {copiedLevel === 1 ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAdopt(result.level1?.sentence, 1)}
                        className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          adoptedLevel === 1 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-sky-600 hover:bg-sky-700 text-white shadow-2xs active:scale-95'
                        }`}
                      >
                        {adoptedLevel === 1 ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
                        <span>{adoptedLevel === 1 ? 'Đã áp dụng' : onAdoptSentence ? 'Áp dụng câu này' : 'Sao chép'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* ========================================================= */}
                {/* CẤP ĐỘ 2: BAND 4.5 - 5.0 (ACADEMIC & COMPOUND)             */}
                {/* ========================================================= */}
                <div className="bg-white rounded-3xl border-2 border-indigo-200/90 shadow-sm p-5 flex flex-col justify-between transition-all hover:shadow-md hover:border-indigo-300 relative group">
                  <div className="space-y-4">
                    {/* Header Cấp độ */}
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-indigo-100 text-indigo-800 border border-indigo-200">
                        Level 2
                      </span>
                      <div className="text-right">
                        <span className="text-xs font-black text-indigo-900 block">
                          {result.level2?.band || 'Band 4.5 - 5.0'}
                        </span>
                        <span className="text-[10px] text-indigo-600 font-semibold">
                          {result.level2?.title || 'Gãy gọn & Thuyết phục'}
                        </span>
                      </div>
                    </div>

                    {/* Câu văn hoàn thiện */}
                    <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 font-serif text-sm text-slate-800 leading-relaxed min-h-[70px]">
                      "{result.level2?.sentence}"
                    </div>

                    {/* Phân tích Ngữ pháp & Từ vựng */}
                    <div className="space-y-2 text-xs">
                      {result.level2?.grammar_notes && result.level2.grammar_notes.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-indigo-800 uppercase tracking-wider block">
                            ✓ Cách nối ý & Cấu trúc gãy gọn:
                          </span>
                          <ul className="space-y-1 text-[11px] text-slate-600 pl-3">
                            {result.level2.grammar_notes.map((note, nIdx) => (
                              <li key={nIdx} className="list-disc leading-relaxed">
                                {note}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {result.level2?.vocab_changes && result.level2.vocab_changes.length > 0 && (
                        <div className="pt-2 border-t border-slate-100 space-y-1">
                          <span className="text-[10px] font-bold text-indigo-800 uppercase tracking-wider block">
                            ✓ Từ vựng thực tế & đắt giá:
                          </span>
                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            {result.level2.vocab_changes.map((v, vIdx) => (
                              <span key={vIdx} className="px-2 py-0.5 rounded-lg bg-indigo-50 border border-indigo-100 text-[10px] text-indigo-900 font-medium">
                                <span className="line-through text-slate-400">{v.from}</span> → <strong>{v.to}</strong>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Nút Hành động */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleSpeak(result.level2?.sentence)}
                      className="p-2 text-slate-400 hover:text-indigo-700 hover:bg-indigo-50 rounded-xl transition-colors cursor-pointer"
                      title="Nghe phát âm chuẩn Mỹ"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleCopy(result.level2?.sentence, 2)}
                        className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                        title="Sao chép câu này"
                      >
                        {copiedLevel === 2 ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAdopt(result.level2?.sentence, 2)}
                        className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          adoptedLevel === 2 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-indigo-700 hover:bg-indigo-800 text-white shadow-2xs active:scale-95'
                        }`}
                      >
                        {adoptedLevel === 2 ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
                        <span>{adoptedLevel === 2 ? 'Đã áp dụng' : onAdoptSentence ? 'Áp dụng câu này' : 'Sao chép'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* ========================================================= */}
                {/* CẤP ĐỘ 3: BAND 5.5 - 6.0 (ĐẮT GIÁ & DỄ NHỚ - NATIVE FLOW) */}
                {/* ========================================================= */}
                <div className="bg-gradient-to-br from-amber-50/50 via-white to-amber-50/20 rounded-3xl border-2 border-amber-300/90 shadow-sm p-5 flex flex-col justify-between transition-all hover:shadow-md hover:border-amber-400 relative group">
                  <div className="space-y-4">
                    {/* Header Cấp độ */}
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-2xs">
                        Level 3 ★
                      </span>
                      <div className="text-right">
                        <span className="text-xs font-black text-amber-950 block">
                          {result.level3?.band || 'Band 5.5 - 6.0'}
                        </span>
                        <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">
                          {result.level3?.title || 'Đắt giá & Dễ nhớ (Native)'}
                        </span>
                      </div>
                    </div>

                    {/* Câu văn hoàn thiện */}
                    <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/90 font-serif text-sm text-slate-900 leading-relaxed font-semibold min-h-[70px]">
                      "{result.level3?.sentence}"
                    </div>

                    {/* Phân tích Ngữ pháp & Từ vựng */}
                    <div className="space-y-2 text-xs">
                      {result.level3?.grammar_notes && result.level3.grammar_notes.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block">
                            ★ Kỹ thuật diễn đạt thanh thoát & Tự nhiên:
                          </span>
                          <ul className="space-y-1 text-[11px] text-slate-700 pl-3">
                            {result.level3.grammar_notes.map((note, nIdx) => (
                              <li key={nIdx} className="list-disc leading-relaxed">
                                {note}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {result.level3?.vocab_changes && result.level3.vocab_changes.length > 0 && (
                        <div className="pt-2 border-t border-amber-200/60 space-y-1">
                          <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block">
                            ★ Cụm từ tự nhiên, dễ nhớ (Collocations):
                          </span>
                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            {result.level3.vocab_changes.map((v, vIdx) => (
                              <span key={vIdx} className="px-2 py-0.5 rounded-lg bg-amber-100/80 border border-amber-300/80 text-[10px] text-amber-950 font-bold">
                                <span className="line-through text-slate-400 font-normal">{v.from}</span> → {v.to}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Nút Hành động */}
                  <div className="pt-4 mt-4 border-t border-amber-200/60 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleSpeak(result.level3?.sentence)}
                      className="p-2 text-amber-700 hover:text-amber-900 hover:bg-amber-100 rounded-xl transition-colors cursor-pointer"
                      title="Nghe phát âm chuẩn Mỹ"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleCopy(result.level3?.sentence, 3)}
                        className="p-2 text-slate-500 hover:text-slate-800 hover:bg-amber-100 rounded-xl transition-colors cursor-pointer"
                        title="Sao chép câu này"
                      >
                        {copiedLevel === 3 ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAdopt(result.level3?.sentence, 3)}
                        className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          adoptedLevel === 3 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-2xs active:scale-95'
                        }`}
                      >
                        {adoptedLevel === 3 ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
                        <span>{adoptedLevel === 3 ? 'Đã áp dụng' : onAdoptSentence ? 'Áp dụng câu này' : 'Sao chép'}</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* 4. Footer Modal */}
        <div className="px-6 py-3.5 bg-white border-t border-slate-200 flex items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-medium text-slate-600">
              Chuẩn Rubric ETS 2026: Đạt điểm tối đa tiêu chí Lexical Resource & Grammatical Range.
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
}
