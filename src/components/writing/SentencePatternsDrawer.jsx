import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  X, 
  Search, 
  Sparkles, 
  BookOpen, 
  Check, 
  Copy, 
  HelpCircle, 
  ChevronRight, 
  ChevronDown,
  Info,
  Filter,
  Lightbulb,
  ExternalLink,
  Target,
  ArrowRight,
  Layers,
  Wand2
} from 'lucide-react';
import { TOEFL_SENTENCE_PATTERNS } from '../../data/sentencePatterns';

export default function SentencePatternsDrawer({
  isOpen,
  onClose,
  currentItem = null,
  aiSuggestion = null,
  isLoadingAi = false,
  onRequestAiSuggestion = null
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filterByCurrentWords, setFilterByCurrentWords] = useState(false);
  const [copiedFormulaId, setCopiedFormulaId] = useState(null);
  const [expandedPatternId, setExpandedPatternId] = useState(null);
  const activeRowRef = useRef(null);

  // Lấy danh sách từ trong kho từ câu hiện tại
  const currentWords = useMemo(() => {
    if (!currentItem?.scrambled) return [];
    return currentItem.scrambled.map(w => String(w).toLowerCase().trim());
  }, [currentItem]);

  // Các danh mục
  const categories = useMemo(() => {
    const set = new Set();
    TOEFL_SENTENCE_PATTERNS.forEach(p => {
      if (p.category) set.add(p.category);
    });
    return ['all', ...Array.from(set)];
  }, []);

  // Lọc danh sách patterns
  const filteredPatterns = useMemo(() => {
    return TOEFL_SENTENCE_PATTERNS.filter(p => {
      // 1. Theo category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // 2. Theo từ vựng câu hiện tại
      if (filterByCurrentWords && currentWords.length > 0) {
        const matchesWord = (p.keywords || []).some(kw => 
          currentWords.some(cw => kw.toLowerCase().includes(cw) || cw.includes(kw.toLowerCase()))
        );
        if (!matchesWord) return false;
      }

      // 3. Theo search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase().trim();
        const inName = p.pattern.toLowerCase().includes(term);
        const inFormula = p.formula.toLowerCase().includes(term);
        const inExample = p.example.toLowerCase().includes(term);
        const inDesc = p.desc.toLowerCase().includes(term);
        const inKeywords = (p.keywords || []).some(k => k.toLowerCase().includes(term));
        if (!inName && !inFormula && !inExample && !inDesc && !inKeywords) return false;
      }

      return true;
    });
  }, [searchTerm, selectedCategory, filterByCurrentWords, currentWords]);

  // Tự động cuộn đến hàng được AI gợi ý
  useEffect(() => {
    if (isOpen && aiSuggestion?.pattern_id) {
      setExpandedPatternId(aiSuggestion.pattern_id);
      setTimeout(() => {
        if (activeRowRef.current) {
          activeRowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 250);
    }
  }, [isOpen, aiSuggestion?.pattern_id]);

  // Copy công thức
  const handleCopyFormula = (id, formula) => {
    navigator.clipboard?.writeText(formula);
    setCopiedFormulaId(id);
    setTimeout(() => setCopiedFormulaId(null), 1800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200" 
      />

      {/* Main Drawer Container */}
      <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250">
        
        {/* 1. Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white flex items-center justify-between border-b border-rose-900/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 text-white flex items-center justify-center font-black shadow-xs shrink-0">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Sổ Tay 25 Cấu Trúc Câu (ETS Cheatsheet)
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-400/20 text-rose-300 border border-rose-400/40 uppercase">
                  Format 2026
                </span>
              </div>
              <p className="text-xs text-rose-200/80 mt-0.5">
                25 Pattern công thức câu kinh điển trong phần thi Build a Sentence
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
            title="Đóng bảng tra cứu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Khối AI Advisor Gợi Ý Cấu Trúc */}
        <div className="p-4 sm:p-5 bg-gradient-to-b from-amber-50/70 to-rose-50/30 border-b border-amber-200/80 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
              <span className="text-xs font-black text-amber-950 uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500" />
                <span>Trợ Lý AI Soi Cấu Trúc Câu Đang Làm</span>
              </span>
            </div>

            {onRequestAiSuggestion && (
              <button
                type="button"
                disabled={isLoadingAi}
                onClick={onRequestAiSuggestion}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-xs cursor-pointer active:scale-95 disabled:opacity-50 transition-all self-start sm:self-auto"
              >
                <Wand2 className={`w-3.5 h-3.5 ${isLoadingAi ? 'animate-spin' : ''}`} />
                <span>{isLoadingAi ? 'AI đang phân tích...' : 'Bấm AI Gợi Ý Cho Câu Này'}</span>
              </button>
            )}
          </div>

          {/* Nội dung AI gợi ý */}
          {isLoadingAi ? (
            <div className="p-3.5 rounded-xl bg-white/80 border border-amber-200 flex items-center gap-3">
              <div className="w-4 h-4 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
              <span className="text-xs font-semibold text-amber-900">
                AI đang đối chiếu kho từ vựng câu này với 25 Pattern chuẩn ETS...
              </span>
            </div>
          ) : aiSuggestion ? (
            <div className={`p-4 rounded-2xl border transition-all ${
              aiSuggestion.is_in_table 
                ? 'bg-amber-100/70 border-amber-300 ring-2 ring-amber-300/60 shadow-xs' 
                : 'bg-indigo-50/80 border-indigo-200 ring-2 ring-indigo-200 shadow-xs'
            }`}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {aiSuggestion.is_in_table ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-600 text-white shadow-2xs">
                      <Target className="w-3.5 h-3.5" />
                      <span>Khớp Pattern #{aiSuggestion.pattern_id}: {aiSuggestion.pattern_name}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-600 text-white shadow-2xs">
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>Cấu trúc tùy biến (Không nằm trong 25 mẫu cơ bản)</span>
                    </span>
                  )}

                  {aiSuggestion.formula && (
                    <code className="text-[11px] font-mono font-bold bg-white px-2 py-0.5 rounded-md border border-slate-300 text-slate-800">
                      {aiSuggestion.formula}
                    </code>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-800 font-medium leading-relaxed mb-2">
                {aiSuggestion.explanation}
              </p>

              {aiSuggestion.assembly_guide && (
                <div className="flex items-start gap-1.5 text-[11px] font-semibold text-slate-700 bg-white/90 p-2.5 rounded-xl border border-amber-200/80">
                  <ArrowRight className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Gợi ý ghép:</strong> {aiSuggestion.assembly_guide}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-white/70 border border-amber-200/60 text-xs text-slate-600 flex items-center justify-between">
              <span>
                💡 Bấm <strong>"Bấm AI Gợi Ý Cho Câu Này"</strong> để AI tự động phát hiện cấu trúc và tô màu hàng tương ứng bên dưới!
              </span>
            </div>
          )}
        </div>

        {/* 3. Thanh công cụ Tìm kiếm & Lọc */}
        <div className="p-4 border-b border-slate-200 bg-white space-y-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm theo tên pattern, công thức (S + V...), từ khóa..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:border-rose-600 focus:bg-white focus:ring-2 focus:ring-rose-200 outline-hidden transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {currentWords.length > 0 && (
              <button
                type="button"
                onClick={() => setFilterByCurrentWords(prev => !prev)}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer shrink-0 ${
                  filterByCurrentWords
                    ? 'bg-rose-100 text-rose-800 border-rose-300 shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
                title="Lọc các pattern có từ khóa xuất hiện trong kho từ của câu hiện tại"
              >
                <Filter className="w-3.5 h-3.5 text-rose-600" />
                <span>Khớp từ câu này ({currentWords.length})</span>
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs custom-scrollbar">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tất cả (25)
            </button>
            {categories.filter(c => c !== 'all').map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-rose-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Danh sách 25 Cấu Trúc (Table / Card view) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 custom-scrollbar">
          {filteredPatterns.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-xs font-semibold">Không tìm thấy cấu trúc nào phù hợp với bộ lọc.</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setFilterByCurrentWords(false); }}
                className="mt-3 px-3 py-1.5 rounded-lg text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 cursor-pointer"
              >
                Đặt lại tất cả bộ lọc
              </button>
            </div>
          ) : (
            filteredPatterns.map((pat) => {
              const isAiHighlighted = aiSuggestion?.pattern_id === pat.id;
              const isExpanded = expandedPatternId === pat.id || isAiHighlighted;

              return (
                <div
                  key={pat.id}
                  ref={isAiHighlighted ? activeRowRef : null}
                  className={`rounded-2xl border transition-all ${
                    isAiHighlighted
                      ? 'bg-amber-50/90 border-amber-400 ring-2 ring-amber-300 shadow-md scale-[1.01]'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200 shadow-2xs'
                  }`}
                >
                  {/* Pattern Header Card */}
                  <div 
                    onClick={() => setExpandedPatternId(prev => prev === pat.id ? null : pat.id)}
                    className="p-3.5 sm:p-4 flex items-start justify-between gap-3 cursor-pointer select-none"
                  >
                    <div className="flex items-start gap-3">
                      {/* ID Badge */}
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                        isAiHighlighted
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {pat.id}
                      </span>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h4 className="text-sm font-black text-slate-900 tracking-tight">
                            {pat.pattern}
                          </h4>
                          {pat.category && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                              {pat.category}
                            </span>
                          )}
                          {isAiHighlighted && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-black text-amber-900 bg-amber-300 px-2 py-0.5 rounded-full shadow-2xs animate-pulse">
                              <Target className="w-3 h-3" />
                              AI Khuyên dùng
                            </span>
                          )}
                        </div>

                        {/* Formula snippet */}
                        <div className="inline-flex items-center gap-1.5">
                          <code className="text-xs font-mono font-bold text-rose-800 bg-rose-50/80 px-2 py-0.5 rounded border border-rose-200">
                            {pat.formula}
                          </code>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 pt-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyFormula(pat.id, pat.formula);
                        }}
                        className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center text-xs transition-all cursor-pointer"
                        title="Sao chép công thức"
                      >
                        {copiedFormulaId === pat.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Body: Ví dụ & Giải thích */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 border-t border-slate-100/80 text-xs space-y-2.5 animate-in fade-in duration-150">
                      <p className="text-slate-700 leading-relaxed font-medium">
                        {pat.desc}
                      </p>

                      {/* Ví dụ mẫu */}
                      <div className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] leading-relaxed flex items-start gap-2 shadow-inner">
                        <span className="text-amber-400 font-bold shrink-0">Ví dụ:</span>
                        <span className="italic text-emerald-300">{pat.example}</span>
                      </div>

                      {/* Từ khóa nhận diện */}
                      {pat.keywords && pat.keywords.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Dấu hiệu nhận diện:</span>
                          {pat.keywords.map((kw, kwIdx) => (
                            <span 
                              key={kwIdx}
                              className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                                currentWords.some(cw => kw.toLowerCase().includes(cw) || cw.includes(kw.toLowerCase()))
                                  ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold ring-1 ring-amber-400'
                                  : 'bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* 5. Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Tổng số <strong>25</strong> cấu trúc chuẩn ETS TOEFL 2026</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl cursor-pointer text-xs"
          >
            Đã hiểu, quay lại làm bài
          </button>
        </div>

      </div>
    </div>
  );
}
