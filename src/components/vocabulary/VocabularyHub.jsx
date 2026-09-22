import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  Volume2, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  EyeOff, 
  Upload, 
  Sparkles, 
  Search,
  ChevronDown,
  GraduationCap,
  Leaf,
  Compass,
  Brain,
  Cpu,
  FileText,
  ArrowRight,
  Layers,
  CloudUpload,
  Star
} from 'lucide-react';
import { getStoredVocabulary, seedVocabularyToSupabase, isSupabaseConfigured } from '../../lib/supabase';
import { VOCABULARY_DECKS } from '../../data/vocabularyData';
import ImportVocabularyModal from '../modals/ImportVocabularyModal';

export default function VocabularyHub() {
  const [allWords, setAllWords] = useState([]);
  const [viewMode, setViewMode] = useState('decks'); // 'decks' (khung chủ đề ban đầu) | 'study' (màn hình flashcard chi tiết)
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'meaning' | 'collocations' | 'example' | 'family' | 'tip'
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deckSearchQuery, setDeckSearchQuery] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(null); // { current, total }
  const [syncMessage, setSyncMessage] = useState('');
  const [starredWordsList, setStarredWordsList] = useState(() => {
    try {
      const saved = localStorage.getItem('toefl_starred_words');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Lỗi khi tải danh sách từ đánh dấu sao:', e);
      return [];
    }
  });

  // Đánh dấu sao / Bỏ đánh dấu sao 1 từ vựng
  const toggleStarWord = (wordObj) => {
    if (!wordObj?.word) return;
    const key = wordObj.word.trim().toLowerCase();
    setStarredWordsList((prev) => {
      const isStarred = prev.includes(key);
      const next = isStarred ? prev.filter((k) => k !== key) : [...prev, key];
      try {
        localStorage.setItem('toefl_starred_words', JSON.stringify(next));
      } catch (e) {
        console.error('Lỗi khi lưu danh sách từ đánh dấu sao:', e);
      }
      return next;
    });
  };

  // Kiểm tra từ có đang được đánh dấu sao không
  const isWordStarred = (wordObj) => {
    if (!wordObj?.word) return false;
    const key = wordObj.word.trim().toLowerCase();
    return starredWordsList.includes(key);
  };

  // Danh sách các từ được đánh dấu sao (lấy object chi tiết từ allWords)
  const starredWords = useMemo(() => {
    if (!starredWordsList.length || !allWords.length) return [];
    const set = new Set(starredWordsList);
    const seen = new Set();
    const result = [];
    for (const w of allWords) {
      const k = (w.word || '').trim().toLowerCase();
      if (k && set.has(k) && !seen.has(k)) {
        seen.add(k);
        result.push(w);
      }
    }
    return result;
  }, [allWords, starredWordsList]);

  // Load từ vựng từ Supabase & LocalStorage
  const loadVocabulary = async () => {
    setIsLoading(true);
    try {
      const words = await getStoredVocabulary();
      setAllWords(words || []);
    } catch (e) {
      console.error('Lỗi load vocabulary:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // Đồng bộ 1000+ từ vựng lên Supabase
  const handleSyncToSupabase = async () => {
    if (!isSupabaseConfigured()) {
      alert('Vui lòng vào phần Cài đặt (biểu tượng bánh răng ở thanh trên cùng) để nhập Supabase URL và API Key trước khi đồng bộ lên đám mây.');
      return;
    }

    const confirmed = window.confirm(
      'Bạn có muốn đồng bộ hơn 1,000 từ vựng TOEFL 2026 (12 chủ đề song ngữ hoàn chỉnh) lên database Supabase của bạn không?'
    );
    if (!confirmed) return;

    try {
      setIsSyncing(true);
      setSyncMessage('Đang kết nối Supabase...');
      setSyncProgress({ current: 0, total: 1036 });

      await seedVocabularyToSupabase((current, total) => {
        setSyncProgress({ current, total });
        setSyncMessage(`Đang tải lên Supabase: ${current}/${total} từ vựng...`);
      });

      setSyncMessage('✓ Đã đồng bộ thành công hơn 1,000 từ vựng lên Supabase!');
      await loadVocabulary();
      setTimeout(() => {
        setSyncProgress(null);
        setSyncMessage('');
      }, 4000);
    } catch (err) {
      console.error('Sync error:', err);
      alert(`Lỗi khi đồng bộ lên Supabase: ${err.message || err}`);
      setSyncMessage('');
      setSyncProgress(null);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    loadVocabulary();
  }, []);

  // Tổng hợp danh sách Decks (kết hợp các chủ đề chuẩn và các chủ đề custom người dùng đã import)
  const decks = useMemo(() => {
    const deckMap = new Map();

    // 1. Khởi tạo danh sách chủ đề chuẩn từ VOCABULARY_DECKS
    VOCABULARY_DECKS.forEach((d) => {
      deckMap.set(d.title, {
        id: d.id,
        title: d.title,
        description: d.description,
        level: d.level || 'B2 - C1 Advanced',
        iconName: d.iconName || 'BookOpen',
        colorTheme: d.colorTheme || 'blue',
        badgeBg: d.badgeBg || 'bg-blue-100 text-blue-800 border-blue-200',
        words: []
      });
    });

    // 2. Phân loại từ vựng vào từng chủ đề tương ứng
    allWords.forEach((word) => {
      const cat = word.category || 'Academic Life & Higher Education';
      if (!deckMap.has(cat)) {
        deckMap.set(cat, {
          id: `custom_${cat.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
          title: cat,
          description: `Custom vocabulary topic created from imports (${cat}).`,
          level: 'Custom Deck',
          iconName: 'Sparkles',
          colorTheme: 'indigo',
          badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
          words: []
        });
      }
      deckMap.get(cat).words.push(word);
    });

    // 3. Deck chuyên biệt dành riêng cho các từ đánh dấu sao (⭐ Starred Words)
    const starredDeck = {
      id: 'deck_starred_words',
      title: '⭐ Starred Words',
      description: 'Your personal collection of bookmarked vocabulary. Review difficult words anytime to boost retention.',
      level: `${starredWords.length} Saved Words`,
      iconName: 'Star',
      colorTheme: 'amber',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
      isStarredDeck: true,
      words: starredWords
    };

    return [starredDeck, ...Array.from(deckMap.values())];
  }, [allWords, starredWords]);

  // Cập nhật selectedDeck khi allWords thay đổi (ví dụ sau khi Import)
  useEffect(() => {
    if (selectedCategory && decks.length > 0) {
      const found = decks.find((d) => d.title === selectedCategory);
      if (found) {
        setSelectedDeck(found);
      }
    }
  }, [decks, selectedCategory]);

  // Khi bấm vào 1 chủ đề từ danh sách -> Chuyển sang Flashcard Player với tên chủ đề đó
  const handleSelectDeck = (deck) => {
    setSelectedDeck(deck);
    setSelectedCategory(deck.title);
    setCurrentWordIndex(0);
    setShowAnswer(true);
    setActiveTab('all');
    setViewMode('study');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Quay lại danh sách chủ đề
  const handleBackToDecks = () => {
    setViewMode('decks');
    setSelectedDeck(null);
  };

  // Lọc từ vựng của chủ đề đang học
  const activeDeckWords = selectedDeck?.words || [];
  const currentWord = activeDeckWords[currentWordIndex] || activeDeckWords[0] || null;
  const totalCount = activeDeckWords.length;

  // Đảm bảo chỉ số từ luôn an toàn khi danh sách thay đổi (ví dụ khi bỏ sao từ)
  useEffect(() => {
    if (totalCount > 0 && currentWordIndex >= totalCount) {
      setCurrentWordIndex(Math.max(0, totalCount - 1));
    }
  }, [totalCount, currentWordIndex]);

  // Điều hướng từ vựng (Previous / Next)
  const handlePrev = () => {
    if (totalCount === 0) return;
    setCurrentWordIndex((prev) => (prev - 1 + totalCount) % totalCount);
  };

  const handleNext = () => {
    if (totalCount === 0) return;
    setCurrentWordIndex((prev) => (prev + 1) % totalCount);
  };

  // Hỗ trợ phím tắt bàn phím khi đang ở chế độ study
  useEffect(() => {
    if (viewMode !== 'study') return;

    const handleKeyDown = (e) => {
      if (isImportModalOpen || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.code === 'Space') {
        e.preventDefault();
        setShowAnswer((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalCount, isImportModalOpen, viewMode]);

  // Phát âm tiếng Anh chuẩn Mỹ (US Accent)
  const speakWord = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.88;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Helper render các mảng hoặc chuỗi
  const renderList = (items) => {
    if (!items) return [];
    if (Array.isArray(items)) {
      return items.filter(Boolean);
    }
    if (typeof items === 'string') {
      return items.split(/\s*[,;\n•]\s*/).filter(Boolean);
    }
    return [];
  };

  const paraphrasesList = renderList(currentWord?.paraphrases);
  const collocationsList = renderList(currentWord?.collocations);
  const wordFamilyList = renderList(currentWord?.wordFamily);

  // Helper render icon chủ đề
  const renderDeckIcon = (iconName, className = "w-6 h-6") => {
    switch (iconName) {
      case 'Star':
        return <Star className={`${className} fill-amber-400 text-amber-500`} />;
      case 'GraduationCap':
        return <GraduationCap className={className} />;
      case 'Leaf':
        return <Leaf className={className} />;
      case 'Compass':
        return <Compass className={className} />;
      case 'Brain':
        return <Brain className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'FileText':
        return <FileText className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Layers':
        return <Layers className={className} />;
      default:
        return <BookOpen className={className} />;
    }
  };

  // Helper lấy màu sắc phong cách chủ đề
  const getDeckColorStyle = (theme) => {
    switch (theme) {
      case 'purple':
        return {
          iconBox: 'bg-purple-50 text-purple-600 border-purple-100',
          badge: 'bg-purple-50 text-purple-700 border-purple-200',
          hoverBorder: 'hover:border-purple-300'
        };
      case 'emerald':
        return {
          iconBox: 'bg-emerald-50 text-emerald-600 border-emerald-100',
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          hoverBorder: 'hover:border-emerald-300'
        };
      case 'amber':
        return {
          iconBox: 'bg-amber-50 text-amber-600 border-amber-100',
          badge: 'bg-amber-50 text-amber-700 border-amber-200',
          hoverBorder: 'hover:border-amber-300'
        };
      case 'blue':
        return {
          iconBox: 'bg-blue-50 text-blue-600 border-blue-100',
          badge: 'bg-blue-50 text-blue-700 border-blue-200',
          hoverBorder: 'hover:border-blue-300'
        };
      case 'rose':
        return {
          iconBox: 'bg-rose-50 text-rose-600 border-rose-100',
          badge: 'bg-rose-50 text-rose-700 border-rose-200',
          hoverBorder: 'hover:border-rose-300'
        };
      case 'teal':
        return {
          iconBox: 'bg-teal-50 text-teal-600 border-teal-100',
          badge: 'bg-teal-50 text-teal-700 border-teal-200',
          hoverBorder: 'hover:border-teal-300'
        };
      default:
        return {
          iconBox: 'bg-indigo-50 text-indigo-600 border-indigo-100',
          badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          hoverBorder: 'hover:border-indigo-300'
        };
    }
  };

  // Lọc chủ đề theo tìm kiếm
  const filteredDecks = decks.filter((d) => {
    if (!deckSearchQuery.trim()) return true;
    const query = deckSearchQuery.toLowerCase();
    return (
      d.title.toLowerCase().includes(query) ||
      d.description.toLowerCase().includes(query)
    );
  });

  // =========================================================================
  // VIEW 1: KHUNG CHỦ ĐỀ FLASHCARDS BAN ĐẦU (TOPIC DECKS HUB)
  // =========================================================================
  if (viewMode === 'decks') {
    return (
      <div className="max-w-6xl mx-auto my-6 px-2 sm:px-4 space-y-6">
        
        {/* Hero Header của Hub Chủ Đề */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
              <Layers className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>TOEFL iBT 2026 Academic Decks</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                TOEFL Academic Vocabulary
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 max-w-xl leading-relaxed">
                Select a topic deck below to start learning high-frequency academic vocabulary with 7-field deep-learning flashcards.
              </p>
            </div>
          </div>

          {/* Cụm công cụ: Starred Words quick-access + Tìm kiếm + Nút Import */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap shrink-0">
            <button
              onClick={() => {
                const starDeck = decks.find((d) => d.isStarredDeck);
                if (starDeck) handleSelectDeck(starDeck);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/80 text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-95 shrink-0"
              title="Truy cập nhanh bộ Flashcard các từ đã đánh dấu sao"
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>Starred Words ({starredWords.length})</span>
            </button>

            <div className="relative min-w-[200px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search topics..."
                value={deckSearchQuery}
                onChange={(e) => setDeckSearchQuery(e.target.value)}
                className="w-full bg-slate-50 hover:bg-white focus:bg-white text-xs font-semibold text-slate-800 pl-9 pr-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-2xs"
              />
            </div>

            <button
              onClick={() => setIsImportModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
              title="Import thêm từ vựng mới"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>+ Import Words</span>
            </button>
          </div>
        </div>

        {/* Banner hiển thị tiến độ đồng bộ Supabase */}
        {syncMessage && (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5 text-xs font-bold text-emerald-900">
              <CloudUpload className={`w-4 h-4 text-emerald-600 ${isSyncing ? 'animate-bounce' : ''}`} />
              <span>{syncMessage}</span>
            </div>
            {syncProgress && (
              <div className="flex items-center gap-3 w-full sm:w-64">
                <div className="flex-1 bg-emerald-200/70 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-emerald-600 h-full transition-all duration-200 rounded-full"
                    style={{ width: `${Math.min(100, Math.round((syncProgress.current / syncProgress.total) * 100))}%` }}
                  />
                </div>
                <span className="text-[11px] font-mono font-bold text-emerald-800 shrink-0">
                  {Math.round((syncProgress.current / syncProgress.total) * 100)}%
                </span>
              </div>
            )}
          </div>
        )}

        {/* Lưới danh sách các chủ đề (Topic Decks Grid) */}
        {isLoading ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-xs">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-slate-500 font-bold">Loading topic decks...</p>
          </div>
        ) : filteredDecks.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-xs">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-black text-slate-800 mb-1">No topic found</h3>
            <p className="text-xs text-slate-500 mb-4">Try searching another keyword or import new words.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDecks.map((deck) => {
              const isStar = deck.isStarredDeck;
              const styles = isStar
                ? {
                    iconBox: 'bg-amber-100 text-amber-600 border-amber-300 shadow-2xs',
                    badge: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
                    hoverBorder: 'hover:border-amber-400'
                  }
                : getDeckColorStyle(deck.colorTheme);

              return (
                <div
                  key={deck.id}
                  onClick={() => handleSelectDeck(deck)}
                  className={`rounded-3xl border p-6 flex flex-col justify-between transition-all duration-200 cursor-pointer group relative ${
                    isStar
                      ? 'bg-gradient-to-br from-amber-50/70 via-white to-amber-50/30 border-amber-300/90 shadow-xs hover:shadow-md hover:border-amber-400'
                      : `bg-white border-slate-200/80 shadow-xs hover:shadow-md ${styles.hoverBorder}`
                  }`}
                >
                  <div>
                    {/* Hàng trên: Icon + Level Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-2xs ${styles.iconBox}`}>
                        {renderDeckIcon(deck.iconName)}
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${styles.badge}`}>
                        {deck.level}
                      </span>
                    </div>

                    {/* Tiêu đề chủ đề */}
                    <h3 className={`text-lg font-black tracking-tight line-clamp-1 mb-2 transition-colors ${
                      isStar ? 'text-amber-950 group-hover:text-amber-700' : 'text-slate-900 group-hover:text-blue-600'
                    }`}>
                      {deck.title}
                    </h3>

                    {/* Mô tả chủ đề */}
                    <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-3 mb-6">
                      {deck.description}
                    </p>
                  </div>

                  {/* Thanh dưới: Số lượng từ + Nút Study Deck */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                      {isStar ? (
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      ) : (
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      <span>{deck.words.length} words</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectDeck(deck);
                      }}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                        isStar
                          ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-xs'
                          : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                      }`}
                    >
                      <span>Study Deck</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal Import Từ Vựng */}
        <ImportVocabularyModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
          onImportSuccess={() => {
            loadVocabulary();
          }}
          categories={decks.map((d) => d.title)}
        />

      </div>
    );
  }

  // =========================================================================
  // VIEW 2: MÀN HÌNH FLASHCARD CHI TIẾT (CHUẨN HÌNH ẢNH CỦA BẠN VÀ TIÊU ĐỀ = TÊN CHỦ ĐỀ)
  // =========================================================================
  return (
    <div className="max-w-5xl mx-auto my-6 px-2 sm:px-4 space-y-6">
      
      {/* 1. HEADER CHỦ ĐỀ FLASHCARD: Bố cục thanh lịch, thoáng đãng, không bị chèn ép chữ */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        
        {/* Hàng 1: Điều hướng Back + Badges bên trái | Dropdown chuyển chủ đề + Nút Import bên phải */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleBackToDecks}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-blue-600 text-xs font-bold border border-slate-200 transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Topics</span>
            </button>

            {selectedDeck?.level && (
              <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${selectedDeck.badgeBg || 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                {selectedDeck.level}
              </span>
            )}

            <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border flex items-center gap-1 ${
              selectedDeck?.isStarredDeck ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}>
              {selectedDeck?.isStarredDeck ? (
                <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
              ) : (
                <BookOpen className="w-3 h-3 text-slate-400" />
              )}
              <span>{totalCount} words</span>
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            {/* Dropdown chuyển nhanh chủ đề - Thiết kế gọn gàng có truncate chống tràn chữ */}
            <div className="relative w-48 sm:w-60">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  const targetCat = e.target.value;
                  setSelectedCategory(targetCat);
                  const found = decks.find((d) => d.title === targetCat);
                  if (found) setSelectedDeck(found);
                  setCurrentWordIndex(0);
                }}
                className="w-full appearance-none bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 py-2 pl-3 pr-8 rounded-xl border border-slate-200 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer truncate shadow-2xs transition-all"
                title="Chuyển sang chủ đề khác"
              >
                {decks.map((d) => (
                  <option key={d.id} value={d.title}>
                    {d.title} ({d.words.length})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Nút Import Từ Vựng Mới */}
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
              title="Import thêm từ vựng vào chủ đề"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>+ Import Words</span>
            </button>
          </div>

        </div>

        {/* Hàng 2: Icon lớn đồng bộ màu chủ đề + Tên chủ đề trọn vẹn bề ngang + Mô tả */}
        <div className="flex items-start gap-4 pt-1">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border shadow-2xs ${
            getDeckColorStyle(selectedDeck?.colorTheme).iconBox
          }`}>
            {renderDeckIcon(selectedDeck?.iconName || 'BookOpen', "w-7 h-7 stroke-[2.2]")}
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              {selectedDeck?.title || selectedCategory || 'Vocabulary Deck'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed mt-1">
              {selectedDeck?.description || 'Build your vocabulary. Master the paraphrases. Ace the TOEFL.'}
            </p>
          </div>
        </div>

      </div>

      {isLoading ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-xs">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-500 font-bold">Loading vocabulary...</p>
        </div>
      ) : !currentWord ? (
        selectedDeck?.isStarredDeck ? (
          <div className="bg-white rounded-3xl border border-amber-200/90 p-12 sm:p-16 text-center shadow-xs">
            <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-500 border border-amber-200 flex items-center justify-center mx-auto mb-4 shadow-2xs">
              <Star className="w-8 h-8 fill-amber-400 stroke-amber-500" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">No Starred Words Yet</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
              You haven't bookmarked any vocabulary words yet. When learning any topic, click the <span className="font-bold text-amber-600">⭐ Star</span> button on any flashcard to save it here for quick review!
            </p>
            <button
              onClick={handleBackToDecks}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl shadow-xs cursor-pointer active:scale-95 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Explore Vocabulary Decks</span>
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black text-slate-800 mb-1">Chưa có từ vựng trong chủ đề này</h3>
            <p className="text-xs text-slate-500 mb-4">Hãy bấm nút "+ Import Words" để bổ sung từ vựng vào chủ đề này.</p>
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="px-5 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-2xl shadow-xs cursor-pointer active:scale-95"
            >
              + Import Words Now
            </button>
          </div>
        )
      ) : (
        <>
          {/* 2. KHUNG FLASHCARD CHÍNH (THIẾT KẾ Y HỆT ẢNH CHỤP CỦA BẠN) */}
          <div className="bg-white rounded-3xl border border-blue-100/90 p-8 sm:p-12 shadow-sm text-center relative overflow-hidden transition-all duration-300">
            
            {/* Top row: Counter '1 / 15' bên trái và Cụm Star + Badge 'Word' bên phải */}
            <div className="flex items-center justify-between w-full mb-6">
              <span className="px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                {currentWordIndex + 1} / {totalCount}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleStarWord(currentWord)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer border active:scale-95 shadow-2xs ${
                    isWordStarred(currentWord)
                      ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                      : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200'
                  }`}
                  title={isWordStarred(currentWord) ? "Bỏ đánh dấu sao (Unstar)" : "Đánh dấu sao từ vựng này (Star word)"}
                >
                  <Star className={`w-3.5 h-3.5 ${isWordStarred(currentWord) ? 'fill-amber-400 text-amber-500' : 'text-slate-400'}`} />
                  <span>{isWordStarred(currentWord) ? 'Starred' : 'Star'}</span>
                </button>

                <span className="px-3.5 py-1 rounded-full bg-slate-100 text-blue-600 text-xs font-bold tracking-wide">
                  {currentWord.partOfSpeech || 'Word'}
                </span>
              </div>
            </div>

            {/* Từ vựng chính (Word) + Nút Loa + Nút Star tròn + Phiên âm IPA */}
            <div className="py-6 sm:py-8 my-auto">
              
              <div className="inline-flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#153e75] tracking-tight font-sans">
                  {currentWord.word}
                </h2>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => speakWord(currentWord.word)}
                    className="w-11 h-11 rounded-full bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white flex items-center justify-center transition-all duration-150 cursor-pointer shadow-xs active:scale-90"
                    title="Nghe phát âm chuẩn Mỹ (US Audio)"
                  >
                    <Volume2 className="w-6 h-6 stroke-[2.2]" />
                  </button>

                  <button
                    onClick={() => toggleStarWord(currentWord)}
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-150 cursor-pointer shadow-xs active:scale-90 border ${
                      isWordStarred(currentWord)
                        ? 'bg-amber-500 text-white border-amber-500 hover:bg-amber-600 shadow-amber-200'
                        : 'bg-slate-50 hover:bg-amber-50 text-slate-400 hover:text-amber-500 border-slate-200 hover:border-amber-300'
                    }`}
                    title={isWordStarred(currentWord) ? "Bỏ đánh dấu sao (Unstar)" : "Đánh dấu sao từ vựng này (Star word)"}
                  >
                    <Star className={`w-5 h-5 ${isWordStarred(currentWord) ? 'fill-white stroke-[2.2]' : 'stroke-[2.2]'}`} />
                  </button>
                </div>
              </div>

              {currentWord.phonetic && (
                <div className="mt-2 text-slate-500 font-mono text-base sm:text-lg font-medium">
                  {currentWord.phonetic}
                </div>
              )}

              {/* Dòng chữ gợi ý: Click to see the meaning and more details */}
              <p 
                onClick={() => setShowAnswer((prev) => !prev)}
                className="mt-6 text-xs text-slate-400 font-medium cursor-pointer hover:text-blue-600 transition-colors select-none"
              >
                {showAnswer ? "Click to toggle meaning and more details" : "Click to see the meaning and more details"}
              </p>

            </div>

          </div>

          {/* 3. THANH ĐIỀU HƯỚNG NÚT: < Previous | 👁️ Show Answer | Next > */}
          <div className="flex items-center justify-between gap-4">
            
            <button
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-blue-600 font-bold text-xs sm:text-sm border border-slate-200 shadow-2xs transition-all active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => setShowAnswer((prev) => !prev)}
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer min-w-[160px]"
            >
              {showAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showAnswer ? "Hide Answer" : "Show Answer"}</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-blue-600 font-bold text-xs sm:text-sm border border-slate-200 shadow-2xs transition-all active:scale-95 cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>

          </div>

          {/* 4. PHẦN CHI TIẾT 7 KHUNG BENTO (HIỂN THỊ Y HỆT HÌNH ẢNH CỦA BẠN) */}
          {showAnswer && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs animate-in fade-in zoom-in-98 duration-200">
              
              {/* Tab navigation phía trên */}
              <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-100 pb-3 mb-6 text-xs font-bold text-slate-500">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer shrink-0 ${
                    activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'hover:text-slate-900'
                  }`}
                >
                  All Details (7 Sections)
                </button>
                <button
                  onClick={() => setActiveTab('meaning')}
                  className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer shrink-0 ${
                    activeTab === 'meaning' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'hover:text-slate-900'
                  }`}
                >
                  Meaning & Paraphrases
                </button>
                <button
                  onClick={() => setActiveTab('collocations')}
                  className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer shrink-0 ${
                    activeTab === 'collocations' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'hover:text-slate-900'
                  }`}
                >
                  Collocations
                </button>
                <button
                  onClick={() => setActiveTab('example')}
                  className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer shrink-0 ${
                    activeTab === 'example' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'hover:text-slate-900'
                  }`}
                >
                  Example
                </button>
                <button
                  onClick={() => setActiveTab('family')}
                  className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer shrink-0 ${
                    activeTab === 'family' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'hover:text-slate-900'
                  }`}
                >
                  Word Family
                </button>
                <button
                  onClick={() => setActiveTab('tip')}
                  className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer shrink-0 ${
                    activeTab === 'tip' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'hover:text-slate-900'
                  }`}
                >
                  Memory Tip
                </button>
              </div>

              {/* LƯỚI 7 KHUNG THÔNG TIN CHUẨN TỪNG Ô NHƯ HÌNH */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
                
                {/* CỘT TRÁI (Lg: 7 cols): Khung 1, 2, 7, 3 */}
                <div className="lg:col-span-7 space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* KHUNG 1: 📖 1. Nghĩa dễ nhớ (Xanh lá) */}
                    {(activeTab === 'all' || activeTab === 'meaning') && (
                      <div className="p-4 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0] text-slate-800">
                        <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800 mb-2">
                          <span>📖</span>
                          <span>1. Nghĩa dễ nhớ</span>
                        </div>
                        <div className="space-y-1.5">
                          <p className="text-sm font-bold text-slate-900 leading-snug">
                            <span className="text-emerald-900">{currentWord.word}</span> = {currentWord.meaningEn || currentWord.meaning || currentWord.definition || 'Chưa có định nghĩa'}
                          </p>
                          {(currentWord.meaningVi || (currentWord.meaning && currentWord.meaning !== currentWord.meaningEn)) && (
                            <p className="text-xs sm:text-sm font-semibold text-emerald-800 leading-snug flex items-center gap-1.5 pt-1.5 border-t border-emerald-200/60">
                              <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 shrink-0">VI</span>
                              <span>= {currentWord.meaningVi || currentWord.meaning}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* KHUNG 2: 🔄 2. Paraphrases (Xanh dương) */}
                    {(activeTab === 'all' || activeTab === 'meaning') && (
                      <div className="p-4 rounded-2xl bg-[#eff6ff] border border-[#bfdbfe] text-slate-800">
                        <div className="flex items-center gap-1.5 text-xs font-black text-blue-800 mb-2">
                          <span>🔄</span>
                          <span>2. Paraphrases</span>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                          {paraphrasesList.length > 0 ? paraphrasesList.join(' / ') : 'considerable / substantial / notable / important'}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* KHUNG 7: 🧠 7. Mẹo nhớ (Tím) */}
                    {(activeTab === 'all' || activeTab === 'tip') && (
                      <div className="p-4 rounded-2xl bg-[#faf5ff] border border-[#e9d5ff] text-slate-800">
                        <div className="flex items-center gap-1.5 text-xs font-black text-purple-800 mb-2">
                          <span>🧠</span>
                          <span>7. Mẹo nhớ</span>
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                          {currentWord.memoryTip || currentWord.toeflTip || `${currentWord.word} = big/important enough to notice`}
                        </p>
                      </div>
                    )}

                    {/* KHUNG 3: 🔗 3. Cụm thường gặp (Vàng) */}
                    {(activeTab === 'all' || activeTab === 'collocations') && (
                      <div className="p-4 rounded-2xl bg-[#fffbeb] border border-[#fde68a] text-slate-800">
                        <div className="flex items-center gap-1.5 text-xs font-black text-amber-900 mb-2">
                          <span>🔗</span>
                          <span>3. Cụm thường gặp</span>
                        </div>
                        <ul className="text-xs sm:text-sm font-semibold text-slate-800 space-y-1">
                          {collocationsList.length > 0 ? (
                            collocationsList.map((c, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-amber-600 font-bold">•</span>
                                <span>{c}</span>
                              </li>
                            ))
                          ) : (
                            <>
                              <li className="flex items-start gap-1.5"><span className="text-amber-600 font-bold">•</span><span>{currentWord.word} increase</span></li>
                              <li className="flex items-start gap-1.5"><span className="text-amber-600 font-bold">•</span><span>{currentWord.word} impact</span></li>
                            </>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                </div>

                {/* CỘT PHẢI (Lg: 5 cols): Khung 4, 5, 6 */}
                <div className="lg:col-span-5 space-y-4">
                  
                  {/* KHUNG 4: 📄 4. Ví dụ TOEFL (Hồng nhạt) */}
                  {(activeTab === 'all' || activeTab === 'example') && (
                    <div className="p-4 rounded-2xl bg-[#fff1f2] border border-[#fecdd3] text-slate-800">
                      <div className="flex items-center gap-1.5 text-xs font-black text-rose-800 mb-2">
                        <span>📄</span>
                        <span>4. Ví dụ TOEFL</span>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-slate-900 leading-relaxed font-serif">
                        {currentWord.example ? (
                          <span>"{currentWord.example}"</span>
                        ) : (
                          <span>"The study found a <strong>{currentWord.word}</strong> increase in productivity."</span>
                        )}
                      </p>
                      {currentWord.exampleTranslation && (
                        <p className="text-xs sm:text-sm text-slate-600 italic mt-2 font-serif pt-1.5 border-t border-rose-200/60">
                          {currentWord.exampleTranslation}
                        </p>
                      )}
                    </div>
                  )}

                  {/* KHUNG 5: 🔄 5. Paraphrase cả câu (Xanh ngọc) */}
                  {(activeTab === 'all' || activeTab === 'example') && (
                    <div className="p-4 rounded-2xl bg-[#f0fdfa] border border-[#99f6e4] text-slate-800">
                      <div className="flex items-center gap-1.5 text-xs font-black text-teal-800 mb-2">
                        <span>🔄</span>
                        <span>5. Paraphrase cả câu</span>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-slate-900 leading-relaxed font-serif">
                        {currentWord.sentenceParaphrase || `The research identified a substantial rise in performance.`}
                      </p>
                    </div>
                  )}

                  {/* KHUNG 6: 👥 6. Word family (Xanh xám) */}
                  {(activeTab === 'all' || activeTab === 'family') && (
                    <div className="p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] text-slate-800">
                      <div className="flex items-center gap-1.5 text-xs font-black text-slate-700 mb-2">
                        <span>👥</span>
                        <span>6. Word family</span>
                      </div>
                      <ul className="text-xs sm:text-sm font-semibold text-slate-700 space-y-1">
                        {wordFamilyList.length > 0 ? (
                          wordFamilyList.map((wf, idx) => (
                            <li key={idx} className="flex items-center gap-1.5">
                              <span className="text-blue-500 font-bold">•</span>
                              <span>{wf}</span>
                            </li>
                          ))
                        ) : (
                          <>
                            <li className="flex items-center gap-1.5"><span className="text-blue-500 font-bold">•</span><span>{currentWord.word} (base)</span></li>
                          </>
                        )}
                      </ul>
                    </div>
                  )}

                </div>

              </div>

            </div>
          )}
        </>
      )}

      {/* MODAL IMPORT TỪ VỰNG */}
      <ImportVocabularyModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportSuccess={() => {
          loadVocabulary();
        }}
        categories={decks.map((d) => d.title)}
      />

    </div>
  );
}
