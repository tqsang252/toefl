import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Target,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Star,
  BookOpen,
  Filter,
  Sparkles,
  HelpCircle,
  Award,
  ChevronRight,
  Zap,
  TrendingUp,
  Volume2,
  Pause,
  Play,
  Share2,
  Check,
  AlertCircle
} from 'lucide-react';
import {
  getContextVocabQuestions,
  saveContextVocabHistory,
  saveStarredContextWord
} from '../../lib/supabase';

// Thời gian tiêu chuẩn cho 1 câu hỏi từ vựng TOEFL (45 giây)
const QUESTION_TIME_LIMIT = 45;

export default function ContextVocabTrainer() {
  // --- States ---
  const [bank, setBank] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSetSize, setActiveSetSize] = useState(10); // 10, 25, 50
  const [selectedTopic, setSelectedTopic] = useState('ALL');
  const [activeItems, setActiveItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Câu hỏi hiện tại
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [timeSpentOnCurrent, setTimeSpentOnCurrent] = useState(0);

  // Lịch sử trả lời trong set hiện tại: { [itemId]: { answer, isCorrect, timeSpent } }
  const [userAnswers, setUserAnswers] = useState({});
  const [isSetFinished, setIsSetFinished] = useState(false);
  const [starredWordsMap, setStarredWordsMap] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  const timerRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  // --- Load Ngân Hàng Câu Hỏi ---
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const questions = await getContextVocabQuestions();
        setBank(questions || []);
      } catch (err) {
        console.error('Lỗi khi tải câu hỏi context vocab:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();

    // Load trạng thái starred words từ localStorage
    try {
      const raw = localStorage.getItem('toefl_starred_words');
      if (raw) {
        const list = JSON.parse(raw);
        const map = {};
        list.forEach((item) => {
          const w = typeof item === 'string' ? item : item?.word;
          if (w) map[w.toLowerCase()] = true;
        });
        setStarredWordsMap(map);
      }
    } catch (e) {
      console.warn(e);
    }
  }, []);

  // --- Khởi tạo Set làm bài khi bank hoặc setSize/topic thay đổi ---
  const initializeSet = (size = activeSetSize, topic = selectedTopic, customItems = null) => {
    if (!bank || bank.length === 0) return;

    let pool = [...bank];
    if (topic !== 'ALL') {
      pool = pool.filter((q) => q.topic === topic);
    }

    // Xáo trộn ngẫu nhiên
    const shuffled = customItems || pool.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(size, shuffled.length));

    setActiveItems(selected);
    setCurrentIndex(0);
    setUserAnswers({});
    setIsSetFinished(false);
    resetQuestionState();
  };

  useEffect(() => {
    if (bank.length > 0) {
      initializeSet(activeSetSize, selectedTopic);
    }
  }, [bank, activeSetSize, selectedTopic]);

  // --- Reset trạng thái cho từng câu hỏi mới ---
  const resetQuestionState = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setIsTimedOut(false);
    setTimeLeft(QUESTION_TIME_LIMIT);
    setIsTimerPaused(false);
    setTimeSpentOnCurrent(0);
  };

  const currentItem = activeItems[currentIndex] || null;

  // --- Countdown Timer ---
  useEffect(() => {
    if (isSetFinished || isSubmitted || !currentItem || isTimerPaused) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
      setTimeSpentOnCurrent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentIndex, isSubmitted, isSetFinished, isTimerPaused, currentItem]);

  // --- Xử lý khi Hết giờ (Timeout) ---
  const handleTimeOut = () => {
    if (isSubmitted) return;
    setIsTimedOut(true);
    setIsSubmitted(true);

    const isCorrect = false;
    const answerRecord = {
      selected: null,
      isCorrect: false,
      correctAnswer: currentItem.correct_answer,
      timeSpent: QUESTION_TIME_LIMIT,
      timedOut: true
    };

    setUserAnswers((prev) => ({
      ...prev,
      [currentItem.id]: answerRecord
    }));
  };

  // --- Xử lý khi Nộp bài (Submit) ---
  const handleSubmitAnswer = () => {
    if (!selectedOption || isSubmitted) return;

    clearInterval(timerRef.current);
    setIsSubmitted(true);

    const isCorrect = selectedOption === currentItem.correct_answer;
    const answerRecord = {
      selected: selectedOption,
      isCorrect,
      correctAnswer: currentItem.correct_answer,
      timeSpent: timeSpentOnCurrent,
      timedOut: false
    };

    setUserAnswers((prev) => ({
      ...prev,
      [currentItem.id]: answerRecord
    }));
  };

  // --- Chuyển sang Câu tiếp theo (Chỉ khi học viên bấm nút Tiếp tục) ---
  const handleNextQuestion = () => {
    if (currentIndex < activeItems.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);

      // Nếu câu kế tiếp đã làm từ trước (khi học viên navigate vòng lại), nạp lại trạng thái
      const existing = userAnswers[activeItems[nextIdx]?.id];
      if (existing) {
        setSelectedOption(existing.selected);
        setIsSubmitted(true);
        setIsTimedOut(existing.timedOut);
        setTimeSpentOnCurrent(existing.timeSpent);
      } else {
        resetQuestionState();
      }
    } else {
      // Đã hoàn thành hết các câu trong set
      handleFinishSet();
    }
  };

  // --- Kết thúc Set và Lưu kết quả ---
  const handleFinishSet = async () => {
    setIsSetFinished(true);
    clearInterval(timerRef.current);

    // Tính toán kết quả
    const answersList = Object.values(userAnswers);
    const score = answersList.filter((a) => a.isCorrect).length;
    const total = activeItems.length;
    const totalTimeSpent = answersList.reduce((acc, curr) => acc + (curr.timeSpent || 0), 0);
    const avgTime = answersList.length > 0 ? Math.round(totalTimeSpent / answersList.length) : 0;

    const mistakes = activeItems
      .filter((item) => userAnswers[item.id] && !userAnswers[item.id].isCorrect)
      .map((item) => ({
        id: item.id,
        target_word: item.target_word,
        topic: item.topic,
        userSelected: userAnswers[item.id]?.selected,
        correctAnswer: item.correct_answer,
        clueType: item.clue_type
      }));

    try {
      await saveContextVocabHistory({
        score,
        total,
        timeSpent: totalTimeSpent,
        avgTimePerQuestion: avgTime,
        answers: userAnswers,
        mistakes
      });
    } catch (e) {
      console.warn('Lỗi lưu lịch sử làm bài context vocab:', e);
    }
  };

  // --- Nhảy trực tiếp đến 1 câu hỏi bất kỳ ---
  const handleJumpToQuestion = (idx) => {
    if (idx === currentIndex) return;
    clearInterval(timerRef.current);
    setCurrentIndex(idx);

    const existing = userAnswers[activeItems[idx]?.id];
    if (existing) {
      setSelectedOption(existing.selected);
      setIsSubmitted(true);
      setIsTimedOut(existing.timedOut);
      setTimeSpentOnCurrent(existing.timeSpent);
    } else {
      resetQuestionState();
    }
  };

  // --- Lưu Từ Vựng vào Flashcards (1-click) ---
  const handleSaveToFlashcard = async (item) => {
    if (!item) return;
    const wordKey = item.target_word.toLowerCase();
    const alreadyStarred = !!starredWordsMap[wordKey];

    if (!alreadyStarred) {
      await saveStarredContextWord(item);
      setStarredWordsMap((prev) => ({ ...prev, [wordKey]: true }));
      showToast(`Đã lưu "${item.target_word}" vào bộ từ vựng & Flashcards!`);
    } else {
      showToast(`"${item.target_word}" đã có trong danh sách từ vựng của bạn.`);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // --- Danh sách Chủ đề độc nhất ---
  const topicsList = useMemo(() => {
    const set = new Set(bank.map((q) => q.topic).filter(Boolean));
    return ['ALL', ...Array.from(set)];
  }, [bank]);

  // --- Render Đoạn văn & Highlight Từ vựng ---
  const renderPassageWithHighlight = (passage, targetWord, targetParagraphIdx, clueSignal = null, showClue = false) => {
    if (!passage) return null;
    const paragraphs = passage.split(/\n\s*\n|\n/);

    return (
      <div className="space-y-4 text-[15px] sm:text-[16px] leading-relaxed text-slate-800 font-serif">
        {paragraphs.map((para, pIdx) => {
          const isTargetParagraph = pIdx + 1 === targetParagraphIdx;

          if (!isTargetParagraph) {
            return (
              <p key={pIdx} className="text-justify text-slate-700">
                {para}
              </p>
            );
          }

          // Đoạn chứa từ cần đoán nghĩa: Highlight từ khóa nổi bật
          // Tạo regex an toàn không phân biệt hoa thường
          const escapedWord = targetWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`\\b(${escapedWord})\\b`, 'gi');
          const parts = para.split(regex);

          return (
            <p
              key={pIdx}
              className="text-justify bg-amber-50/40 p-3 rounded-xl border-l-4 border-amber-500 transition-colors shadow-2xs"
            >
              <span className="inline-block text-[11px] font-sans font-bold uppercase tracking-wider text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded mr-2 mb-1">
                Paragraph {targetParagraphIdx}
              </span>
              {parts.map((chunk, cIdx) => {
                if (chunk.toLowerCase() === targetWord.toLowerCase()) {
                  return (
                    <mark
                      key={cIdx}
                      className="bg-amber-200/90 text-amber-950 font-bold px-1.5 py-0.5 rounded border-b-2 border-amber-600 shadow-2xs ring-2 ring-amber-400/40 cursor-help"
                      title={`Từ cần đoán nghĩa: "${chunk}"`}
                    >
                      {chunk}
                    </mark>
                  );
                }
                return <span key={cIdx}>{chunk}</span>;
              })}
            </p>
          );
        })}
      </div>
    );
  };

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl border border-[#e5dfd5] p-16 text-center shadow-xs my-6 max-w-5xl mx-auto">
        <div className="w-10 h-10 border-3 border-teal-700 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <h3 className="text-base font-bold text-slate-800">Đang chuẩn bị 50 bài đọc & câu hỏi Context Vocab...</h3>
        <p className="text-xs text-slate-500 mt-1">Đồng bộ từ Supabase và ETS Past Papers</p>
      </div>
    );
  }

  // --- Màn hình Tổng kết khi hoàn thành set (Set Summary View) ---
  if (isSetFinished) {
    const answersList = Object.values(userAnswers);
    const score = answersList.filter((a) => a.isCorrect).length;
    const total = activeItems.length;
    const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;
    const totalTime = answersList.reduce((acc, c) => acc + (c.timeSpent || 0), 0);
    const avgTime = answersList.length > 0 ? Math.round(totalTime / answersList.length) : 0;

    const wrongItems = activeItems.filter(
      (item) => userAnswers[item.id] && !userAnswers[item.id].isCorrect
    );

    return (
      <div className="max-w-4xl mx-auto my-6 space-y-6 animate-fadeIn">
        {/* Banner Kết quả */}
        <div className="bg-white rounded-3xl border border-teal-200 p-8 text-center shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl -z-10" />

          <div className="inline-flex p-4 rounded-full bg-teal-100/80 text-teal-800 mb-4 ring-8 ring-teal-50">
            <Award className="w-12 h-12" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Hoàn Thành Set Vocabulary In Context!
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
            Luyện đoán nghĩa từ vựng học thuật dựa vào cấu trúc và manh mối ngữ cảnh chuẩn ETS TOEFL.
          </p>

          {/* 3 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Điểm số</span>
              <div className="text-3xl font-extrabold text-teal-700 mt-1">
                {score} / {total}
              </div>
              <span className="text-xs text-slate-400 font-medium">Chính xác {accuracy}%</span>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pacing Trung Bình</span>
              <div className="text-3xl font-extrabold text-amber-700 mt-1">{avgTime}s</div>
              <span className="text-xs text-slate-400 font-medium">Chuẩn ETS: 30s - 45s</span>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Đánh giá tốc độ</span>
              <div className="text-sm font-bold mt-2">
                {avgTime <= 30 ? (
                  <span className="text-emerald-700 flex items-center justify-center gap-1">
                    <Zap className="w-4 h-4" /> Siêu tốc & Tự tin
                  </span>
                ) : avgTime <= 45 ? (
                  <span className="text-teal-700 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Đạt chuẩn TOEFL
                  </span>
                ) : (
                  <span className="text-rose-700 flex items-center justify-center gap-1">
                    <Clock className="w-4 h-4" /> Cần đẩy nhanh nhịp độ
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-400 mt-1 block">Tối đa 45s cho câu từ</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {wrongItems.length > 0 && (
              <button
                onClick={() => initializeSet(wrongItems.length, 'ALL', wrongItems)}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Luyện lại {wrongItems.length} câu đã sai
              </button>
            )}

            <button
              onClick={() => initializeSet(10, selectedTopic)}
              className="px-5 py-2.5 bg-teal-800 hover:bg-teal-900 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> Làm Set 10 câu mới
            </button>

            <button
              onClick={() => initializeSet(50, 'ALL')}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4" /> Thử thách Full 50 bài
            </button>
          </div>
        </div>

        {/* Danh sách câu hỏi cần Review */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-teal-700" /> Bảng Tổng Hợp Chi Tiết Từng Câu
          </h3>

          <div className="divide-y divide-slate-100">
            {activeItems.map((item, idx) => {
              const res = userAnswers[item.id];
              const isCorrect = res?.isCorrect;
              const isStarred = !!starredWordsMap[item.target_word.toLowerCase()];

              return (
                <div key={item.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {idx + 1}
                    </span>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-slate-900 text-base">
                          {item.target_word}
                        </span>
                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
                          {item.topic}
                        </span>
                        <span className="text-xs text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                          {item.clue_type}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 mt-1">
                        Đáp án đúng: <strong className="text-emerald-700 font-bold">{item.correct_answer} ({item.options[item.correct_answer]})</strong>
                        {res?.selected && !isCorrect && (
                          <span className="text-rose-600 ml-2">
                            • Bạn chọn: {res.selected} ({item.options[res.selected]})
                          </span>
                        )}
                        {res?.timedOut && <span className="text-amber-600 ml-2 font-semibold">• Hết 45s</span>}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="text-xs text-slate-400 font-mono">
                      ⏱️ {res?.timeSpent || 0}s
                    </span>

                    <button
                      onClick={() => handleSaveToFlashcard(item)}
                      className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                        isStarred
                          ? 'bg-amber-50 text-amber-700 border-amber-300'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300'
                      }`}
                      title="Lưu vào Flashcards"
                    >
                      <Star className={`w-3.5 h-3.5 ${isStarred ? 'fill-amber-500 text-amber-500' : ''}`} />
                      {isStarred ? 'Đã lưu' : 'Lưu'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // --- Main Trainer Interface (Split-Screen Layout) ---
  return (
    <div className="max-w-7xl mx-auto my-4 space-y-4 animate-fadeIn">
      {/* 1. Thanh Công Cụ / Top Header Bar */}
      <div className="bg-white rounded-2xl border border-[#e5dfd5] p-3.5 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Bên trái: Tiêu đề + Huy hiệu Set Size */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-teal-800 text-white flex items-center justify-center shadow-xs">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                TOEFL VOCABULARY IN CONTEXT
              </h2>
              <p className="text-[11px] text-slate-500">
                Luyện đoán nghĩa từ vựng qua bài đọc trọn vẹn (Ngân hàng 50 đề ETS)
              </p>
            </div>
          </div>

          {/* Chọn Chế Độ Set: 10, 25, 50 */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            {[10, 25, 50].map((size) => (
              <button
                key={size}
                onClick={() => {
                  setActiveSetSize(size);
                  initializeSet(size, selectedTopic);
                }}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  activeSetSize === size
                    ? 'bg-teal-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {size === 50 ? 'Full 50' : `${size} câu`}
              </button>
            ))}
          </div>
        </div>

        {/* Bên phải: Lọc Topic + Đồng hồ + Nút kết thúc */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Lọc Chủ Đề */}
          <div className="relative">
            <select
              value={selectedTopic}
              onChange={(e) => {
                setSelectedTopic(e.target.value);
                initializeSet(activeSetSize, e.target.value);
              }}
              className="text-xs bg-slate-50 border border-slate-200 text-slate-700 py-1.5 pl-2.5 pr-7 rounded-xl font-medium focus:outline-teal-700 cursor-pointer appearance-none"
            >
              {topicsList.map((t) => (
                <option key={t} value={t}>
                  {t === 'ALL' ? 'Tất cả chủ đề' : t}
                </option>
              ))}
            </select>
            <Filter className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Đổi đề / Shuffle */}
          <button
            onClick={() => initializeSet(activeSetSize, selectedTopic)}
            className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
            title="Xáo trộn câu hỏi mới"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Nút Kết Thúc Set Sớm */}
          <button
            onClick={handleFinishSet}
            className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            Nộp bài & Kết thúc
          </button>
        </div>
      </div>

      {/* 2. Thanh Tiến Trình Câu Hỏi & Pacing Indicator */}
      <div className="bg-white rounded-2xl border border-[#e5dfd5] px-4 py-2.5 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Tiến trình:</span>
          <span className="text-xs font-extrabold text-teal-800">
            Câu {currentIndex + 1} / {activeItems.length}
          </span>
        </div>

        {/* Grid Navigator (Nhảy nhanh giữa các câu) */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-[50vw]">
          {activeItems.map((it, idx) => {
            const res = userAnswers[it.id];
            const isCurrent = idx === currentIndex;
            let btnClass = 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200';

            if (res) {
              btnClass = res.isCorrect
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-rose-600 text-white border-rose-600';
            } else if (isCurrent) {
              btnClass = 'bg-teal-800 text-white border-teal-800 ring-2 ring-teal-400/40';
            }

            return (
              <button
                key={it.id}
                onClick={() => handleJumpToQuestion(idx)}
                className={`w-6 h-6 rounded-md text-[11px] font-bold border transition-transform active:scale-95 shrink-0 flex items-center justify-center cursor-pointer ${btnClass}`}
                title={`Câu ${idx + 1}: ${it.target_word}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* 45s Countdown Timer */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-mono text-xs font-bold border transition-colors ${
              timeLeft <= 10 && !isSubmitted
                ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                : 'bg-slate-50 text-slate-700 border-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>00:{String(timeLeft).padStart(2, '0')}</span>
          </div>

          {!isSubmitted && (
            <button
              onClick={() => setIsTimerPaused(!isTimerPaused)}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
              title={isTimerPaused ? 'Tiếp tục đếm giờ' : 'Tạm dừng đồng hồ'}
            >
              {isTimerPaused ? <Play className="w-3.5 h-3.5 text-emerald-600" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* 3. MÀN HÌNH CHÍNH: 2 CỘT SPLIT SCREEN */}
      {currentItem && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* CỘT TRÁI (7 Cột): BÀI ĐỌC TOÀN VĂN (FULL READING PASSAGE) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#e5dfd5] p-6 sm:p-8 shadow-xs flex flex-col min-h-[580px]">
            {/* Header bài đọc */}
            <div className="border-b border-slate-100 pb-4 mb-5 flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200/80 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                  {currentItem.topic}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {currentItem.title}
                </h3>
              </div>

              <div className="shrink-0 text-right">
                <span className="text-[11px] text-slate-400 block font-medium">Từ khóa kiểm tra</span>
                <span className="text-sm font-black text-amber-900 bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300 inline-block mt-0.5">
                  "{currentItem.target_word}"
                </span>
              </div>
            </div>

            {/* Nội dung bài đọc đầy đủ */}
            <div className="flex-1 overflow-y-auto max-h-[620px] pr-2 scrollbar-thin">
              {renderPassageWithHighlight(
                currentItem.passage,
                currentItem.target_word,
                currentItem.paragraph_index,
                currentItem.clue_signal,
                isSubmitted
              )}
            </div>

            {/* Ghi chú chân trang bài đọc */}
            <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>Đoạn văn học thuật chuẩn ETS TOEFL iBT</span>
              <span className="text-[11px] text-slate-500">
                Tìm từ <strong>"{currentItem.target_word}"</strong> ở Paragraph {currentItem.paragraph_index}
              </span>
            </div>
          </div>

          {/* CỘT PHẢI (5 Cột): CÂU HỎI TRẮC NGHIỆM + PHÂN TÍCH MANH MỐI SAU KHI NỘP */}
          <div className="lg:col-span-5 space-y-4">
            {/* HỘP CÂU HỎI & 4 LỰA CHỌN */}
            <div className="bg-white rounded-3xl border border-[#e5dfd5] p-6 shadow-xs space-y-5">
              {/* Question Text */}
              <div>
                <span className="text-xs font-bold text-teal-800 tracking-wider uppercase block mb-1">
                  Vocabulary Question
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {currentItem.question}
                </h4>
              </div>

              {/* 4 Lựa chọn A, B, C, D */}
              <div className="space-y-2.5">
                {Object.entries(currentItem.options).map(([key, label]) => {
                  const isSelected = selectedOption === key;
                  const isCorrect = key === currentItem.correct_answer;

                  // Màu sắc và trạng thái theo từng giai đoạn
                  let cardStyle = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 bg-white';
                  let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-300';

                  if (!isSubmitted) {
                    if (isSelected) {
                      cardStyle = 'border-teal-700 bg-teal-50/50 ring-2 ring-teal-600/30';
                      badgeStyle = 'bg-teal-700 text-white border-teal-700';
                    }
                  } else {
                    // Đã nộp bài: Hiển thị đúng / sai
                    if (isCorrect) {
                      cardStyle = 'border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-500/30 text-emerald-950 font-bold';
                      badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
                    } else if (isSelected && !isCorrect) {
                      cardStyle = 'border-rose-400 bg-rose-50/80 text-rose-950 font-medium';
                      badgeStyle = 'bg-rose-600 text-white border-rose-600';
                    } else {
                      cardStyle = 'border-slate-200 bg-slate-50/40 text-slate-400 opacity-60';
                      badgeStyle = 'bg-slate-100 text-slate-400 border-slate-200';
                    }
                  }

                  return (
                    <button
                      key={key}
                      disabled={isSubmitted}
                      onClick={() => setSelectedOption(key)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${cardStyle} ${
                        isSubmitted ? 'cursor-default' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 border ${badgeStyle}`}
                        >
                          {key}
                        </span>
                        <span className="text-sm font-semibold">{label}</span>
                      </div>

                      {/* Icon Đúng / Sai khi đã submit */}
                      {isSubmitted && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {isSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Nút Hành Động Trước Khi Nộp */}
              {!isSubmitted ? (
                <button
                  disabled={!selectedOption}
                  onClick={handleSubmitAnswer}
                  className={`w-full py-3 rounded-2xl font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 ${
                    selectedOption
                      ? 'bg-teal-800 hover:bg-teal-900 text-white cursor-pointer active:scale-98'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Check className="w-4 h-4" /> Xác nhận & Nộp bài
                </button>
              ) : (
                /* Nút TIẾP TỤC (Chỉ người dùng bấm mới chuyển câu) */
                <button
                  onClick={handleNextQuestion}
                  className="w-full py-3.5 rounded-2xl font-extrabold text-sm text-white bg-teal-800 hover:bg-teal-900 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  {currentIndex < activeItems.length - 1 ? (
                    <>
                      <span>Tiếp tục (Câu tiếp theo)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>Hoàn thành & Xem Tổng kết</span>
                      <Award className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>

            {/* KHỐI GIẢI MÃ & PHÂN TÍCH MANH MỐI (CHỈ HIỆN SAU KHI NỘP BÀI HOẶC HẾT GIỜ) */}
            {isSubmitted && (
              <div className="bg-white rounded-3xl border border-teal-200/90 p-5 sm:p-6 shadow-sm space-y-4 animate-fadeIn">
                {/* Banner Trạng thái Đúng / Sai */}
                <div
                  className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                    userAnswers[currentItem.id]?.isCorrect
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                      : isTimedOut
                      ? 'bg-amber-50 text-amber-900 border-amber-300'
                      : 'bg-rose-50 text-rose-900 border-rose-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {userAnswers[currentItem.id]?.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : isTimedOut ? (
                      <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                    <span className="text-xs sm:text-sm font-bold">
                      {userAnswers[currentItem.id]?.isCorrect
                        ? 'Chính xác! (+1 Điểm)'
                        : isTimedOut
                        ? 'Hết thời gian 45 giây!'
                        : `Chưa chính xác (Đáp án đúng là ${currentItem.correct_answer})`}
                    </span>
                  </div>

                  {/* Nút 1-click Lưu từ vựng */}
                  <button
                    onClick={() => handleSaveToFlashcard(currentItem)}
                    className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      starredWordsMap[currentItem.target_word.toLowerCase()]
                        ? 'bg-amber-100 text-amber-900 border-amber-400'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-amber-50 hover:text-amber-800'
                    }`}
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${
                        starredWordsMap[currentItem.target_word.toLowerCase()]
                          ? 'fill-amber-500 text-amber-500'
                          : ''
                      }`}
                    />
                    {starredWordsMap[currentItem.target_word.toLowerCase()] ? 'Đã lưu từ' : 'Lưu Flashcard'}
                  </button>
                </div>

                {/* 1. Phân loại Manh mối (Clue Classification) */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1.5">
                  <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">
                    Phân Loại Manh Mối (Clue Type):
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-teal-100/80 text-teal-900 font-extrabold text-xs border border-teal-300">
                      {currentItem.clue_type}
                    </span>
                  </div>
                  {currentItem.clue_signal && (
                    <p className="text-xs text-slate-700 italic pt-1 border-t border-slate-200/60 mt-2">
                      <strong className="text-slate-900 not-italic font-semibold">Tín hiệu trong bài: </strong>
                      "{currentItem.clue_signal}"
                    </p>
                  )}
                </div>

                {/* 2. Thử nghiệm Thay thế (Substitution Test) */}
                {currentItem.explanation?.substitution && (
                  <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-2xl p-4">
                    <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                      Phương Pháp Thế Chỗ (Substitution Test):
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {currentItem.explanation.substitution}
                    </p>
                  </div>
                )}

                {/* 3. Giải Nghĩa Chi Tiết & Bóc Trần Bẫy Đề Thi */}
                <div className="space-y-2 text-xs">
                  {currentItem.explanation?.meaning && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                      <strong className="text-slate-900 block font-bold mb-1">Định nghĩa ngữ cảnh:</strong>
                      <p className="text-slate-700 leading-relaxed">{currentItem.explanation.meaning}</p>
                    </div>
                  )}

                  {/* Phân tích bẫy các phương án gây nhiễu */}
                  {currentItem.explanation?.trap_breakdown && (
                    <div className="p-3.5 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-1.5">
                      <strong className="text-amber-950 block font-bold mb-1">
                        Bóc trần bẫy đề thi ETS (Distractor Analysis):
                      </strong>
                      {Object.entries(currentItem.explanation.trap_breakdown).map(([opt, desc]) => (
                        <div key={opt} className="text-slate-700 leading-relaxed text-[11px]">
                          <strong className="font-semibold text-slate-900">{opt}: </strong>
                          {desc}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Từ đồng nghĩa học thuật */}
                  {currentItem.explanation?.synonyms && currentItem.explanation.synonyms.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      <span className="text-[11px] font-semibold text-slate-500">Từ đồng nghĩa:</span>
                      {currentItem.explanation.synonyms.map((syn, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200"
                        >
                          {syn}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Toast Thông Báo */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white px-5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-bounce">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
