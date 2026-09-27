import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  X, 
  Volume2, 
  Search, 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  Printer, 
  Sparkles, 
  Image as ImageIcon, 
  Check, 
  Copy,
  PenLine,
  HelpCircle,
  Award
} from 'lucide-react';
import QuickVocabPopover, { useTextSelectionLookup } from '../dictionary/QuickVocabPopover';

export default function NoteStudyModal({ note, isOpen, onClose, onUpdateNote }) {
  const [activeTab, setActiveTab] = useState('cheatsheet'); // 'cheatsheet' | 'flashcards' | 'quiz' | 'original'
  const [searchFilter, setSearchFilter] = useState('');
  
  // Flashcard state
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      try {
        const raw = localStorage.getItem(`note_mastered_${note?.id}`);
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // Hook tra từ khi bôi đen văn bản trong Cheatsheet
  const { selectionData, handleTextMouseUp, clearSelection } = useTextSelectionLookup();

  useEffect(() => {
    if (note?.id) {
      setCurrentCardIdx(0);
      setIsFlipped(false);
      setQuizIdx(0);
      setQuizSelectedOption(null);
      setQuizAnswered(false);
      setQuizScore(0);
      setQuizFinished(false);
      setSearchFilter('');
    }
  }, [note?.id, isOpen]);

  // Bắt phím tắt khi học Flashcards (Space để lật thẻ, Mũi tên trái/phải để chuyển thẻ)
  useEffect(() => {
    if (!isOpen || activeTab !== 'flashcards') return;

    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        e.preventDefault();
        setCurrentCardIdx((prev) => (prev + 1 < items.length ? prev + 1 : 0));
        setIsFlipped(false);
      } else if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        e.preventDefault();
        setCurrentCardIdx((prev) => (prev > 0 ? prev - 1 : items.length - 1));
        setIsFlipped(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeTab, items.length]);

  // Lưu trạng thái thẻ đã thuộc vào localStorage
  const toggleMastered = (itemId) => {
    setMasteredIds((prev) => {
      const next = prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId];
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`note_mastered_${note?.id}`, JSON.stringify(next));
      }
      return next;
    });
  };

  // Phát âm tiếng Anh
  const playPronunciation = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && text) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isOpen || !note) return null;

  const items = Array.isArray(note.items) ? note.items : [];

  // Lọc bảng cheatsheet
  const filteredItems = items.filter((it) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      it.term?.toLowerCase().includes(q) ||
      it.meaning?.toLowerCase().includes(q) ||
      it.example?.toLowerCase().includes(q)
    );
  });

  // Xử lý Quiz
  const currentQuizItem = items[quizIdx];
  const handleSelectQuizOption = (opt) => {
    if (quizAnswered) return;
    setQuizSelectedOption(opt);
    setQuizAnswered(true);

    const isCorrect = String(opt).trim().toLowerCase() === String(currentQuizItem?.correct_answer).trim().toLowerCase();
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    if (quizIdx + 1 < items.length) {
      setQuizIdx((prev) => prev + 1);
      setQuizSelectedOption(null);
      setQuizAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizIdx(0);
    setQuizSelectedOption(null);
    setQuizAnswered(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  const currentFlashcard = items[currentCardIdx];
  const isCurrentMastered = masteredIds.includes(currentFlashcard?.id);

  const handleCopyMarkdown = () => {
    const mdLines = [
      `# ${note.title}`,
      `> ${note.summary || ''}`,
      '',
      '| STT | Cụm từ | Loại từ | Nghĩa tiếng Việt | Ví dụ học thuật TOEFL |',
      '|---|---|---|---|---|',
      ...items.map((it, idx) => 
        `| ${idx + 1} | **${it.term}** | \`${it.type || ''}\` | ${it.meaning} | ${it.example || ''} |`
      )
    ];
    navigator.clipboard.writeText(mdLines.join('\n'));
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div 
        onMouseUp={handleTextMouseUp}
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[94vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
      >
        
        {/* Header Modal */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-sky-50/90 via-white to-sky-50/50">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-300">
                {note.category || 'Skill Note'}
              </span>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {items.length} mục kiến thức
              </span>
              {masteredIds.length > 0 && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Đã thuộc {masteredIds.length}/{items.length}
                </span>
              )}
            </div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 truncate">
              {note.title}
            </h2>
          </div>

          {/* Action buttons on header */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors cursor-pointer shadow-2xs"
              title="Sao chép bảng Markdown ra clipboard"
            >
              {copiedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span className="hidden sm:inline">{copiedSuccess ? 'Đã sao chép!' : 'Sao chép bảng'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors cursor-pointer shadow-2xs"
              title="In ra giấy hoặc lưu PDF"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">In / Xuất PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 4 Chế độ học tập (Tabs) */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 bg-slate-50 border-b border-slate-200 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('cheatsheet')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'cheatsheet'
                ? 'bg-sky-600 text-white shadow-xs font-black'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. Bảng Tra Cứu (Cheatsheet)</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'flashcards'
                ? 'bg-sky-600 text-white shadow-xs font-black'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>2. Lật Thẻ Nhớ (Flashcards)</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-sky-600 text-white shadow-xs font-black'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <PenLine className="w-4 h-4" />
            <span>3. Luyện Tập (Practice Quiz)</span>
          </button>

          {note.original_image_url && (
            <button
              onClick={() => setActiveTab('original')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'original'
                  ? 'bg-sky-600 text-white shadow-xs font-black'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>4. Ảnh Gốc / Tài Liệu</span>
            </button>
          )}
        </div>

        {/* Nội dung theo Tab */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/40">
          
          {/* ========================================================
              TAB 1: BẢNG TRA CỨU CHEATSHEET
             ======================================================== */}
          {activeTab === 'cheatsheet' && (
            <div className="space-y-4">
              {/* Thanh tìm kiếm & Gợi ý bôi đen */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Tìm kiếm cụm từ, nghĩa tiếng Việt hoặc câu ví dụ..."
                    className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                  {searchFilter && (
                    <button
                      onClick={() => setSearchFilter('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-1.5 bg-sky-50/80 px-3 py-1.5 rounded-xl border border-sky-200/60">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  <span>Mẹo: Bạn có thể <b>bôi đen bất kỳ từ nào</b> trong bảng để mở từ điển dịch nghĩa ngay!</span>
                </div>
              </div>

              {/* Bảng Cheatsheet */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-600 uppercase font-black tracking-wider text-[11px]">
                        <th className="py-3 px-3.5 w-12 text-center">STT</th>
                        <th className="py-3 px-4 w-44">Cụm từ / Thuật ngữ</th>
                        <th className="py-3 px-3.5 w-28">Loại từ</th>
                        <th className="py-3 px-4 w-48">Nghĩa tiếng Việt</th>
                        <th className="py-3 px-4">Ví dụ học thuật chuẩn TOEFL iBT</th>
                        <th className="py-3 px-3 w-16 text-center">Âm thanh</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredItems.map((item, idx) => {
                        const isMastered = masteredIds.includes(item.id);
                        return (
                          <tr 
                            key={item.id || idx}
                            className={`hover:bg-sky-50/50 transition-colors ${
                              isMastered ? 'bg-emerald-50/30' : ''
                            }`}
                          >
                            <td className="py-3 px-3.5 text-center font-bold text-slate-400">
                              {idx + 1}
                            </td>

                            <td className="py-3 px-4 font-black text-slate-900 text-sm">
                              <span className="text-sky-900">{item.term}</span>
                            </td>

                            <td className="py-3 px-3.5">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                                {item.type || 'phrase'}
                              </span>
                            </td>

                            <td className="py-3 px-4 font-bold text-slate-700">
                              {item.meaning}
                            </td>

                            <td className="py-3 px-4 text-slate-600 font-serif leading-relaxed text-xs">
                              {item.example}
                            </td>

                            <td className="py-3 px-3 text-center">
                              <button
                                onClick={() => playPronunciation(item.term)}
                                className="w-7 h-7 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 flex items-center justify-center transition-colors cursor-pointer mx-auto"
                                title={`Nghe phát âm: ${item.term}`}
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {filteredItems.length === 0 && (
                  <div className="p-8 text-center text-slate-400 text-xs">
                    Không tìm thấy mục nào khớp với từ khóa "{searchFilter}".
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 2: FLASHCARDS (LẬT THẺ 3D)
             ======================================================== */}
          {activeTab === 'flashcards' && (
            <div className="max-w-xl mx-auto py-4 space-y-5">
              
              {/* Thanh tiến trình Flashcard */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Thẻ {currentCardIdx + 1} / {items.length}</span>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Đã thuộc: {masteredIds.length}
                  </span>
                  <button
                    onClick={() => {
                      const randIdx = Math.floor(Math.random() * items.length);
                      setCurrentCardIdx(randIdx);
                      setIsFlipped(false);
                    }}
                    className="flex items-center gap-1 text-slate-600 hover:text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 cursor-pointer"
                    title="Xáo trộn thẻ ngẫu nhiên"
                  >
                    <Shuffle className="w-3 h-3" />
                    <span>Xáo trộn</span>
                  </button>
                </div>
              </div>

              {/* Thẻ 3D Flip Container */}
              <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-full h-72 sm:h-80 cursor-pointer select-none group"
                style={{ perspective: '1200px' }}
              >
                <div 
                  className="relative w-full h-full"
                  style={{
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Mặt trước (Front Face) */}
                  <div 
                    className="absolute inset-0 w-full h-full rounded-3xl bg-white border-2 border-slate-200 shadow-xl p-6 sm:p-8 flex flex-col justify-between hover:border-sky-300 transition-colors"
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                  >
                    {/* Góc trên */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                        {currentFlashcard?.type || 'Phrase'}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playPronunciation(currentFlashcard?.term);
                        }}
                        className="w-8 h-8 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-700 flex items-center justify-center transition-colors cursor-pointer"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Nội dung giữa */}
                    <div className="text-center my-auto space-y-2">
                      <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        {currentFlashcard?.term}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-medium">
                        (Bấm vào thẻ hoặc nhấn phím Space để xem nghĩa)
                      </p>
                    </div>

                    {/* Góc dưới */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Mặt trước (Cụm từ)</span>
                      <span className="font-bold text-sky-600 group-hover:underline">
                        Nhấn để lật nghĩa →
                      </span>
                    </div>
                  </div>

                  {/* Mặt sau (Back Face) */}
                  <div 
                    className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-b from-white to-sky-50/40 border-2 border-sky-300 shadow-xl p-6 sm:p-7 flex flex-col justify-between hover:border-sky-400 transition-colors"
                    style={{ 
                      backfaceVisibility: 'hidden', 
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)' 
                    }}
                  >
                    {/* Góc trên */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 bg-sky-100 px-2.5 py-1 rounded-full">
                        {currentFlashcard?.type || 'Phrase'}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playPronunciation(currentFlashcard?.term);
                        }}
                        className="w-8 h-8 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-700 flex items-center justify-center transition-colors cursor-pointer"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Nội dung giữa: Nghĩa + Khung ví dụ TOEFL chữ nhỏ gọn */}
                    <div className="my-auto space-y-2.5 text-center">
                      <div className="text-xl sm:text-2xl font-black text-sky-700">
                        {currentFlashcard?.meaning}
                      </div>

                      {/* Khung ví dụ TOEFL: chữ nhỏ vừa vặn, padding gọn gàng */}
                      <div className="p-3 sm:p-3.5 rounded-2xl bg-white/95 border border-sky-200/80 shadow-2xs text-left space-y-1">
                        <span className="font-black text-sky-900 block text-[10px] uppercase tracking-wider">
                          Ví dụ TOEFL:
                        </span>
                        <p className="text-[11.5px] sm:text-xs font-serif text-slate-600 leading-relaxed">
                          {currentFlashcard?.example}
                        </p>
                      </div>
                    </div>

                    {/* Góc dưới */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Mặt sau (Nghĩa & Ví dụ)</span>
                      <span className="font-bold text-sky-600 group-hover:underline">
                        Nhấn để lật lại ↺
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nút điều hướng & Đánh dấu thuộc */}
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setCurrentCardIdx((prev) => (prev > 0 ? prev - 1 : items.length - 1));
                    setIsFlipped(false);
                  }}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 cursor-pointer shadow-xs active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Thẻ trước</span>
                </button>

                <button
                  onClick={() => toggleMastered(currentFlashcard?.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-xs active:scale-95 ${
                    isCurrentMastered
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isCurrentMastered ? 'Đã Thuộc ✓' : 'Đánh dấu Đã Thuộc'}</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentCardIdx((prev) => (prev + 1 < items.length ? prev + 1 : 0));
                    setIsFlipped(false);
                  }}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 cursor-pointer shadow-xs active:scale-95"
                >
                  <span>Thẻ kế tiếp</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* ========================================================
              TAB 3: PRACTICE QUIZ (BÀI TẬP ĐIỀN TỪ & TRẮC NGHIỆM)
             ======================================================== */}
          {activeTab === 'quiz' && (
            <div className="max-w-2xl mx-auto py-4 space-y-5">
              
              {!quizFinished ? (
                <>
                  {/* Thanh tiến độ câu hỏi */}
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>Câu hỏi {quizIdx + 1} / {items.length}</span>
                    <span className="text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                      Điểm: {quizScore} / {quizIdx + (quizAnswered ? 1 : 0)}
                    </span>
                  </div>

                  {/* Thẻ câu hỏi */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                          Điền từ / Giới từ thích hợp
                        </span>
                        <span className="text-xs text-slate-400">
                          (Nghĩa: {currentQuizItem?.meaning})
                        </span>
                      </div>

                      <p className="text-base sm:text-lg font-serif text-slate-900 leading-relaxed">
                        {currentQuizItem?.blank_sentence || currentQuizItem?.example}
                      </p>
                    </div>

                    {/* 4 Lựa chọn trả lời */}
                    <div className="grid grid-cols-2 gap-3">
                      {(currentQuizItem?.options || [currentQuizItem?.correct_answer, 'in', 'of', 'for']).map((opt, oIdx) => {
                        const isSelected = quizSelectedOption === opt;
                        const isCorrect = String(opt).trim().toLowerCase() === String(currentQuizItem?.correct_answer).trim().toLowerCase();

                        let btnStyle = 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800';
                        if (quizAnswered) {
                          if (isCorrect) {
                            btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-black ring-2 ring-emerald-300';
                          } else if (isSelected) {
                            btnStyle = 'border-rose-500 bg-rose-50 text-rose-800 font-black ring-2 ring-rose-300';
                          } else {
                            btnStyle = 'border-slate-100 bg-slate-50/50 text-slate-400 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectQuizOption(opt)}
                            disabled={quizAnswered}
                            className={`p-4 rounded-2xl border text-sm font-bold text-center transition-all cursor-pointer ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {/* Giải thích sau khi trả lời */}
                    {quizAnswered && (
                      <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs space-y-1.5 animate-in fade-in">
                        <div className="flex items-center gap-1.5 font-bold text-sky-950">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Đáp án đúng: <b>{currentQuizItem?.term}</b> ({currentQuizItem?.meaning})</span>
                        </div>
                        <p className="text-slate-600 font-serif leading-relaxed">
                          <b>Ví dụ chuẩn:</b> {currentQuizItem?.example}
                        </p>
                      </div>
                    )}

                    {/* Nút Câu kế tiếp */}
                    {quizAnswered && (
                      <button
                        onClick={handleNextQuiz}
                        className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer active:scale-98"
                      >
                        {quizIdx + 1 < items.length ? 'Câu Tiếp Theo →' : 'Xem Kết Quả Tổng Kết 🏆'}
                      </button>
                    )}
                  </div>
                </>
              ) : (
                /* Kết quả Quiz */
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-md">
                    <Award className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    Hoàn Thành Bài Luyện Tập!
                  </h3>
                  <p className="text-sm text-slate-600">
                    Bạn đã trả lời đúng <b className="text-sky-700 text-base">{quizScore}</b> / {items.length} câu hỏi ({Math.round((quizScore / items.length) * 100)}%).
                  </p>
                  <button
                    onClick={handleRestartQuiz}
                    className="flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-black rounded-xl mx-auto shadow-md transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Luyện Tập Lại Từ Đầu</span>
                  </button>
                </div>
              )}

            </div>
          )}

          {/* ========================================================
              TAB 4: ẢNH GỐC / TÀI LIỆU
             ======================================================== */}
          {activeTab === 'original' && note.original_image_url && (
            <div className="max-w-3xl mx-auto py-4 space-y-3">
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs text-center">
                <img 
                  src={note.original_image_url} 
                  alt="Tài liệu gốc" 
                  className="max-w-full h-auto mx-auto rounded-xl shadow-sm"
                />
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Floating dictionary popover when highlighting text */}
      {selectionData && (
        <QuickVocabPopover
          selectionData={selectionData}
          onClose={clearSelection}
        />
      )}
    </div>
  );
}
