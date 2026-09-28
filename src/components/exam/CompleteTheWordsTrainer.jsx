import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  BookOpen,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Star,
  Filter,
  Sparkles,
  Award,
  Zap,
  Volume2,
  VolumeX,
  Pause,
  Play,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  ChevronDown,
  Layers,
  HelpCircle,
  TrendingUp,
  BookmarkPlus
} from 'lucide-react';
import { COMPLETE_THE_WORDS_BANK, CTW_DOMAINS } from '../../data/completeTheWordsData';
import QuickVocabPopover, { useTextSelectionLookup } from '../dictionary/QuickVocabPopover';

// Thời gian tiêu chuẩn cho 1 bài C-Test TOEFL iBT 2026: 90 giây (1.5 phút)
const STANDARD_TIME_LIMIT = 90;

export default function CompleteTheWordsTrainer() {
  // --- States ---
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [currentPassageId, setCurrentPassageId] = useState('ctw_01');
  const [userInputs, setUserInputs] = useState({}); // { [blankIndex]: string }
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showOriginalText, setShowOriginalText] = useState(false);
  const [showHints, setShowHints] = useState(false);
  
  // Timer States
  const [timeLeft, setTimeLeft] = useState(STANDARD_TIME_LIMIT);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isUntimedMode, setIsUntimedMode] = useState(false);
  const timerRef = useRef(null);
  
  // Audio TTS State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
  // Progress & LocalStorage
  const [history, setHistory] = useState({}); // { [passageId]: { score, total, completedAt } }
  const [starredWords, setStarredWords] = useState({});
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimeoutRef = useRef(null);

  // Input refs for smooth auto-advance
  const inputRefs = useRef([]);
  const [focusedBlankIdx, setFocusedBlankIdx] = useState(null);

  // Hook tra cứu từ điển khi bôi đen văn bản
  const { selectionData, clearSelection, handleTextMouseUp } = useTextSelectionLookup();

  // Load history & starred words from localStorage
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('toefl_ctw_results');
      let hist = {};
      if (savedHistory) {
        hist = JSON.parse(savedHistory);
        setHistory(hist);
      }

      // Tự động tìm bài tiếp theo chưa làm để người dùng tiếp tục luyện tập
      const lastActive = localStorage.getItem('toefl_ctw_last_active_id');
      if (lastActive && !hist[lastActive] && COMPLETE_THE_WORDS_BANK.some((p) => p.id === lastActive)) {
        setCurrentPassageId(lastActive);
      } else {
        const nextUncompleted = COMPLETE_THE_WORDS_BANK.find((p) => !hist[p.id]);
        if (nextUncompleted) {
          setCurrentPassageId(nextUncompleted.id);
        } else if (lastActive && COMPLETE_THE_WORDS_BANK.some((p) => p.id === lastActive)) {
          setCurrentPassageId(lastActive);
        }
      }

      const rawStarred = localStorage.getItem('toefl_starred_words');
      if (rawStarred) {
        const list = JSON.parse(rawStarred);
        const map = {};
        list.forEach((item) => {
          const w = typeof item === 'string' ? item : item?.word;
          if (w) map[w.toLowerCase()] = true;
        });
        setStarredWords(map);
      }
    } catch (e) {
      console.warn('Could not load CTW history from localStorage', e);
    }
  }, []);

  // Filtered passages based on domain
  const filteredPassages = useMemo(() => {
    if (selectedDomain === 'All Domains') {
      return COMPLETE_THE_WORDS_BANK;
    }
    return COMPLETE_THE_WORDS_BANK.filter((p) => p.category === selectedDomain);
  }, [selectedDomain]);

  // Current passage
  const currentPassage = useMemo(() => {
    const found = COMPLETE_THE_WORDS_BANK.find((p) => p.id === currentPassageId);
    return found || COMPLETE_THE_WORDS_BANK[0];
  }, [currentPassageId]);

  // Reset inputs & timer on passage change + lưu lại bài đang làm vào localStorage
  useEffect(() => {
    setUserInputs({});
    setIsSubmitted(false);
    setShowOriginalText(false);
    setShowHints(false);
    setTimeLeft(STANDARD_TIME_LIMIT);
    setIsTimerRunning(true);
    stopAudio();

    if (currentPassageId) {
      localStorage.setItem('toefl_ctw_last_active_id', currentPassageId);
    }

    // Auto-focus first blank after mount
    setTimeout(() => {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, 150);
  }, [currentPassageId]);

  // Countdown Timer
  useEffect(() => {
    if (isUntimedMode || isSubmitted || !isTimerRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, isSubmitted, isUntimedMode, currentPassageId]);

  // Toast Helper
  const showToast = (msg) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Audio Playback
  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  };

  const toggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      showToast('Trình duyệt không hỗ trợ phát âm (Web Speech API)');
      return;
    }

    if (isPlayingAudio) {
      stopAudio();
    } else {
      stopAudio();
      const textToRead = currentPassage.fullText;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'en-US';
      utterance.rate = 0.95;

      // Select natural US voice if available
      const voices = window.speechSynthesis.getVoices();
      const usVoice = voices.find((v) => v.lang === 'en-US' && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('David')));
      if (usVoice) utterance.voice = usVoice;

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  // Input Change handler with smart auto-advance
  const handleInputChange = (blankIdx, value) => {
    if (isSubmitted) return;

    // Filter characters to alphabetic only
    const cleaned = value.replace(/[^a-zA-Z]/g, '');
    const blank = currentPassage.blanks[blankIdx];
    const maxLen = blank.missingLength;
    const truncated = cleaned.slice(0, maxLen);

    setUserInputs((prev) => ({
      ...prev,
      [blankIdx]: truncated
    }));

    // Auto advance focus if user finished typing the required letters
    if (truncated.length === maxLen && blankIdx < currentPassage.blanks.length - 1) {
      if (inputRefs.current[blankIdx + 1]) {
        inputRefs.current[blankIdx + 1].focus();
      }
    }
  };

  // Keyboard navigation between blanks (Backspace, Arrow keys, Enter)
  const handleKeyDown = (e, blankIdx) => {
    if (e.key === 'Backspace' && (!userInputs[blankIdx] || userInputs[blankIdx].length === 0)) {
      if (blankIdx > 0 && inputRefs.current[blankIdx - 1]) {
        e.preventDefault();
        inputRefs.current[blankIdx - 1].focus();
      }
    } else if (e.key === 'ArrowRight' && blankIdx < currentPassage.blanks.length - 1) {
      const input = inputRefs.current[blankIdx];
      if (input && input.selectionStart === input.value.length) {
        inputRefs.current[blankIdx + 1].focus();
      }
    } else if (e.key === 'ArrowLeft' && blankIdx > 0) {
      const input = inputRefs.current[blankIdx];
      if (input && input.selectionStart === 0) {
        inputRefs.current[blankIdx - 1].focus();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Submit test
  const handleSubmit = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    setIsTimerRunning(false);
    stopAudio();

    // Calculate score
    let score = 0;
    currentPassage.blanks.forEach((b, idx) => {
      const entered = (userInputs[idx] || '').trim().toLowerCase();
      const expected = b.missing.toLowerCase();
      if (entered === expected) {
        score++;
      }
    });

    // Save to history in localStorage
    const newRecord = {
      score,
      total: currentPassage.blanks.length,
      completedAt: new Date().toISOString()
    };

    const updated = {
      ...history,
      [currentPassage.id]: newRecord
    };
    setHistory(updated);
    try {
      localStorage.setItem('toefl_ctw_results', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save CTW results to localStorage', e);
    }

    if (score === 10) {
      showToast('🎉 Tuyệt đối 10/10! Xuất sắc đạt chuẩn C2!');
    } else if (score >= 8) {
      showToast(`✨ Rất tốt! Đạt ${score}/10 từ chính xác (Band 5.5 - 6.0)`);
    } else {
      showToast(`Hoàn thành: ${score}/10 từ. Hãy xem giải thích chi tiết bên dưới!`);
    }
  };

  const handleAutoSubmit = () => {
    showToast('⏱️ Hết giờ 90 giây! Hệ thống đã tự động nộp bài.');
    handleSubmit();
  };

  // Reset current passage
  const handleReset = () => {
    setUserInputs({});
    setIsSubmitted(false);
    setShowOriginalText(false);
    setTimeLeft(STANDARD_TIME_LIMIT);
    setIsTimerRunning(true);
    stopAudio();
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  };

  // Next & Previous navigation
  const currentIndexInFiltered = filteredPassages.findIndex((p) => p.id === currentPassage.id);
  const handleNextPassage = () => {
    if (currentIndexInFiltered < filteredPassages.length - 1) {
      setCurrentPassageId(filteredPassages[currentIndexInFiltered + 1].id);
    } else {
      showToast('Bạn đã làm hết bài trong danh mục này!');
    }
  };

  const handleNextUncompletedPassage = () => {
    // Tìm bài chưa làm tiếp theo từ vị trí hiện tại
    const currIdx = filteredPassages.findIndex((p) => p.id === currentPassage.id);
    let nextUncompleted = filteredPassages.slice(currIdx + 1).find((p) => !history[p.id]);
    if (!nextUncompleted) {
      // Tìm từ đầu danh sách nếu sau vị trí hiện tại đã hết
      nextUncompleted = filteredPassages.find((p) => !history[p.id]);
    }

    if (nextUncompleted) {
      setCurrentPassageId(nextUncompleted.id);
      showToast(`Chuyển đến: ${nextUncompleted.title}`);
    } else {
      showToast('🎉 Xuất sắc! Bạn đã làm xong tất cả các bài trong danh mục này!');
    }
  };

  const handlePrevPassage = () => {
    if (currentIndexInFiltered > 0) {
      setCurrentPassageId(filteredPassages[currentIndexInFiltered - 1].id);
    }
  };

  const handleRandomPassage = () => {
    const randomIndex = Math.floor(Math.random() * filteredPassages.length);
    setCurrentPassageId(filteredPassages[randomIndex].id);
  };

  // Star / Bookmark word to Flashcards
  const toggleStarWord = (wordObj) => {
    const wordKey = wordObj.fullWord.toLowerCase();
    const newStatus = !starredWords[wordKey];

    const updatedMap = { ...starredWords, [wordKey]: newStatus };
    setStarredWords(updatedMap);

    try {
      const raw = localStorage.getItem('toefl_starred_words');
      let list = raw ? JSON.parse(raw) : [];

      if (newStatus) {
        // Add
        if (!list.some((item) => (typeof item === 'string' ? item : item?.word).toLowerCase() === wordKey)) {
          list.push({
            id: `ctw_${wordKey}_${Date.now()}`,
            word: wordObj.fullWord,
            meaning: wordObj.hint,
            pos: wordObj.pos,
            context: currentPassage.title,
            example: currentPassage.leadSentence,
            source: 'TOEFL iBT 2026 Complete the Words',
            starredAt: new Date().toISOString()
          });
        }
        showToast(`Đã lưu "${wordObj.fullWord}" vào Vocabulary Hub Flashcards!`);
      } else {
        // Remove
        list = list.filter((item) => (typeof item === 'string' ? item : item?.word).toLowerCase() !== wordKey);
        showToast(`Đã bỏ lưu "${wordObj.fullWord}"`);
      }

      localStorage.setItem('toefl_starred_words', JSON.stringify(list));
    } catch (e) {
      console.warn('Could not update starred words', e);
    }
  };

  // Score stats for current passage if submitted
  const currentResult = useMemo(() => {
    if (!isSubmitted) return null;
    let correctCount = 0;
    const blankResults = currentPassage.blanks.map((b, idx) => {
      const userVal = (userInputs[idx] || '').trim();
      const isCorrect = userVal.toLowerCase() === b.missing.toLowerCase();
      if (isCorrect) correctCount++;
      return {
        ...b,
        userVal,
        isCorrect
      };
    });
    return {
      correctCount,
      total: currentPassage.blanks.length,
      percentage: Math.round((correctCount / currentPassage.blanks.length) * 100),
      blankResults
    };
  }, [isSubmitted, userInputs, currentPassage]);

  // Overall Statistics across all 100 passages
  const stats = useMemo(() => {
    const totalPassages = COMPLETE_THE_WORDS_BANK.length;
    const completedIds = Object.keys(history);
    const completedCount = completedIds.length;
    let totalScore = 0;
    let totalPossible = completedCount * 10;

    completedIds.forEach((id) => {
      totalScore += history[id]?.score || 0;
    });

    const avgScore = completedCount > 0 ? (totalScore / completedCount).toFixed(1) : '0.0';
    const accuracy = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

    return {
      totalPassages,
      completedCount,
      avgScore,
      accuracy
    };
  }, [history]);

  // Parse bodyTemplate into renderable tokens
  const parsedBodyElements = useMemo(() => {
    const template = currentPassage.bodyTemplate;
    // Regex splits on [prefix|missing]
    const parts = template.split(/(\[[a-zA-Z]+\|[a-zA-Z]+\])/g);
    let blankCounter = 0;

    return parts.map((part, pIdx) => {
      const match = part.match(/^\[([a-zA-Z]+)\|([a-zA-Z]+)\]$/);
      if (!match) {
        return <span key={pIdx}>{part}</span>;
      }

      const blankIdx = blankCounter++;
      const blankInfo = currentPassage.blanks[blankIdx];
      const prefix = match[1];
      const missing = match[2];
      const entered = userInputs[blankIdx] || '';
      const isCorrect = isSubmitted && entered.toLowerCase() === missing.toLowerCase();
      const isWrong = isSubmitted && !isCorrect;
      const isFocused = focusedBlankIdx === blankIdx;

      // Khi đã nộp bài (Post-submission Review)
      if (isSubmitted) {
        if (isCorrect) {
          return (
            <span
              key={`blank_${blankIdx}_${pIdx}`}
              className="inline-flex items-center align-baseline whitespace-nowrap mx-1 px-2 py-0.5 rounded-lg border border-emerald-400 bg-emerald-50 text-emerald-950 font-mono text-[16px] sm:text-[17px] font-bold shadow-2xs"
            >
              <span className="text-slate-800">{prefix}</span>
              <span className="text-emerald-700 font-black">{entered}</span>
              <span className="ml-1 text-emerald-600 text-xs font-black">✓</span>
            </span>
          );
        }

        // Trường hợp sai (isWrong)
        return (
          <span
            key={`blank_${blankIdx}_${pIdx}`}
            className="inline-flex items-center align-baseline whitespace-nowrap mx-1 px-1.5 py-0.5 rounded-lg border border-rose-300 bg-rose-50/70 text-slate-800 font-mono text-[16px] sm:text-[17px] shadow-2xs"
          >
            <span className="font-bold text-slate-700">{prefix}</span>
            {entered ? (
              <span className="ml-1 text-rose-600 font-bold line-through">
                {entered}
              </span>
            ) : null}
            <span className="ml-1.5 px-1.5 py-0.2 bg-emerald-600 text-white rounded font-mono font-bold text-xs shadow-2xs">
              {missing}
            </span>
          </span>
        );
      }

      // Khi đang làm bài (Active test taking mode)
      return (
        <span
          key={`blank_${blankIdx}_${pIdx}`}
          className={`inline-flex items-center align-baseline whitespace-nowrap mx-1 px-1.5 py-0.5 rounded-lg border transition-all duration-150 relative cursor-text select-none ${
            isFocused
              ? 'bg-indigo-50/90 border-indigo-500 ring-2 ring-indigo-400/40 shadow-xs'
              : 'bg-white border-slate-300 hover:border-slate-400 hover:bg-slate-50'
          }`}
          onClick={() => {
            if (inputRefs.current[blankIdx]) {
              inputRefs.current[blankIdx].focus();
            }
          }}
        >
          {/* Prefix (Provided letters) */}
          <span className="font-extrabold text-slate-900 font-mono text-[16px] sm:text-[17px] tracking-tight">
            {prefix}
          </span>

          {/* Invisible real input that captures typing and keyboard navigation */}
          <input
            ref={(el) => (inputRefs.current[blankIdx] = el)}
            type="text"
            value={entered}
            onChange={(e) => handleInputChange(blankIdx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, blankIdx)}
            onFocus={() => setFocusedBlankIdx(blankIdx)}
            onBlur={() => setFocusedBlankIdx((prev) => (prev === blankIdx ? null : prev))}
            maxLength={blankInfo.missingLength}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
            autoComplete="off"
            className="absolute inset-0 w-full h-full opacity-0 cursor-text pointer-events-auto z-10"
          />

          {/* Visible character slots with exact number of _ _ _ (1 single line per missing letter) */}
          <span className="inline-flex items-center gap-1 sm:gap-1.5 ml-1 font-mono text-[16px] sm:text-[17px] font-bold">
            {Array.from({ length: blankInfo.missingLength }).map((_, charIdx) => {
              const char = entered[charIdx];
              const isCharSlotActive = isFocused && entered.length === charIdx;

              return (
                <span
                  key={charIdx}
                  className={`inline-flex items-center justify-center min-w-[13px] sm:min-w-[15px] h-6 leading-none transition-all ${
                    char
                      ? 'text-slate-900 font-extrabold'
                      : isCharSlotActive
                      ? 'text-indigo-600 font-black animate-pulse'
                      : 'text-slate-400 font-bold'
                  }`}
                >
                  {char || '_'}
                </span>
              );
            })}
          </span>

          {/* Interactive Hint tooltip when enabled */}
          {showHints && (
            <span className="absolute -top-7 left-0 whitespace-nowrap bg-slate-800 text-amber-300 text-[10px] font-medium px-2 py-0.5 rounded shadow-md pointer-events-none z-20">
              {blankInfo.pos}: {blankInfo.hint.slice(0, 24)}...
            </span>
          )}
        </span>
      );
    });
  }, [currentPassage, userInputs, isSubmitted, showHints, focusedBlankIdx]);

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-slideUp text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. TOP HEADER & PERFORMANCE STATS */}
      <div className="bg-gradient-to-r from-[#1e1b4b] via-[#2e1065] to-[#1e1b4b] text-white rounded-3xl p-5 sm:p-7 shadow-lg border border-indigo-900/60 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-full text-[11px] font-black tracking-widest uppercase bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                TOEFL iBT 2026 OFFICIAL FORMAT
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" /> C-Test 100 Đề Chuẩn ETS
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              Complete the Words Trainer
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200/90 max-w-2xl leading-relaxed">
              Dạng bài kiểm tra từ vựng tích hợp mới nhất trong phần Reading: Câu đầu giữ nguyên ngữ cảnh, từ câu 2 khuyết đúng 50% độ dài của 10 từ học thuật.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/15 self-start md:self-center shrink-0">
            <div className="text-center px-2">
              <div className="text-xs text-indigo-200 font-medium">Đã luyện</div>
              <div className="text-lg font-black text-white">{stats.completedCount} / {stats.totalPassages}</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center px-2">
              <div className="text-xs text-indigo-200 font-medium">Điểm TB</div>
              <div className="text-lg font-black text-amber-300">{stats.avgScore} / 10</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center px-2">
              <div className="text-xs text-indigo-200 font-medium">Độ chính xác</div>
              <div className="text-lg font-black text-emerald-400">{stats.accuracy}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FILTER & NAVIGATION CONTROLS */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#dfd8cc] shadow-xs space-y-4">
        {/* Domain Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Chủ đề:
          </span>
          {CTW_DOMAINS.map((domain) => {
            const isSelected = selectedDomain === domain;
            const matching = domain === 'All Domains' 
              ? COMPLETE_THE_WORDS_BANK 
              : COMPLETE_THE_WORDS_BANK.filter((p) => p.category === domain);
            const count = matching.length;
            const completedInDomain = matching.filter((p) => !!history[p.id]).length;

            return (
              <button
                key={domain}
                onClick={() => {
                  setSelectedDomain(domain);
                  const matchingDomain = domain === 'All Domains' 
                    ? COMPLETE_THE_WORDS_BANK 
                    : COMPLETE_THE_WORDS_BANK.filter((p) => p.category === domain);
                  if (matchingDomain.length > 0 && !matchingDomain.some((m) => m.id === currentPassageId)) {
                    // Ưu tiên nhảy vào bài chưa làm đầu tiên trong domain này
                    const nextUncompleted = matchingDomain.find((p) => !history[p.id]);
                    setCurrentPassageId(nextUncompleted ? nextUncompleted.id : matchingDomain[0].id);
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-indigo-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                <span>{domain}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-indigo-800 text-indigo-200' : 'bg-slate-200 text-slate-500'}`}>
                  {completedInDomain > 0 ? `${completedInDomain}/${count}` : count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Passage Selector Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {/* Previous Button */}
            <button
              onClick={handlePrevPassage}
              disabled={currentIndexInFiltered === 0}
              className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0"
              title="Bài trước"
            >
              <ArrowLeft className="w-4 h-4 text-slate-700" />
            </button>

            {/* Passage Select Dropdown */}
            <div className="relative flex-1 min-w-0">
              <select
                value={currentPassage.id}
                onChange={(e) => setCurrentPassageId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-hidden transition-all truncate pr-8 cursor-pointer"
              >
                {filteredPassages.map((p, idx) => {
                  const passHistory = history[p.id];
                  const statusTag = passHistory 
                    ? `[✓ ĐÃ LÀM: ${passHistory.score}/10] ` 
                    : `[CHƯA LÀM] `;
                  return (
                    <option key={p.id} value={p.id}>
                      {statusTag}Bài {idx + 1}: {p.title} ({p.topic})
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextPassage}
              disabled={currentIndexInFiltered === filteredPassages.length - 1}
              className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0"
              title="Bài kế tiếp"
            >
              <ArrowRight className="w-4 h-4 text-slate-700" />
            </button>

            {/* Next Uncompleted Button */}
            <button
              onClick={handleNextUncompletedPassage}
              className="px-2.5 py-2 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-xs font-bold text-indigo-700 transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
              title="Nhảy nhanh đến đề tiếp theo chưa hoàn thành"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Bài chưa làm kế tiếp</span>
            </button>

            {/* Random Button */}
            <button
              onClick={handleRandomPassage}
              className="px-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-all cursor-pointer shrink-0 flex items-center gap-1"
              title="Chọn ngẫu nhiên bài khác"
            >
              <span>🎲</span>
              <span className="hidden sm:inline">Ngẫu nhiên</span>
            </button>
          </div>

          {/* Timer & Pacing Widget */}
          <div className="flex items-center gap-2 justify-end shrink-0">
            {!isUntimedMode ? (
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono font-bold text-xs sm:text-sm transition-all ${
                  timeLeft <= 20
                    ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                    : 'bg-indigo-50 text-indigo-900 border-indigo-200'
                }`}
              >
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {Math.floor(timeLeft / 60)}:
                  {(timeLeft % 60).toString().padStart(2, '0')}
                </span>
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  disabled={isSubmitted}
                  className="p-0.5 text-slate-500 hover:text-slate-800 cursor-pointer disabled:opacity-40"
                  title={isTimerRunning ? 'Tạm dừng đồng hồ' : 'Tiếp tục'}
                >
                  {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>
              </div>
            ) : (
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                Không giới hạn thời gian
              </span>
            )}

            {/* Untimed toggle */}
            <button
              onClick={() => setIsUntimedMode(!isUntimedMode)}
              className="text-[11px] font-bold text-slate-500 hover:text-slate-800 underline px-1 cursor-pointer"
            >
              {isUntimedMode ? 'Bật 90s' : 'Tắt giờ'}
            </button>
          </div>
        </div>
      </div>

      {/* 3. MAIN PASSAGE CARD (C-TEST EXAM VIEW) */}
      <div className="bg-white rounded-3xl p-6 sm:p-9 border border-[#dfd8cc] shadow-sm space-y-6">
        {/* Passage Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-indigo-100 text-indigo-900 border border-indigo-200">
                {currentPassage.category}
              </span>
              <span className="text-xs text-slate-500 font-bold">
                • {currentPassage.topic}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                (Mã đề: {currentPassage.id.toUpperCase()})
              </span>
              {history[currentPassage.id] ? (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Đã làm ({history[currentPassage.id].score}/10 điểm)
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                  Chưa làm
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {currentPassage.title}
            </h2>
          </div>

          {/* Quick Action Tools */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Audio Read-aloud TTS */}
            <button
              onClick={toggleAudio}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                isPlayingAudio
                  ? 'bg-rose-50 text-rose-700 border-rose-300 ring-2 ring-rose-200'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
              title="Nghe giọng đọc bản ngữ chuẩn US"
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4 text-rose-600 animate-pulse" />
                  <span>Dừng đọc</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-indigo-600" />
                  <span>Nghe bài đọc</span>
                </>
              )}
            </button>

            {/* Hint toggle */}
            <button
              onClick={() => setShowHints(!showHints)}
              className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                showHints
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
              title={showHints ? 'Ẩn gợi ý nghĩa' : 'Hiện gợi ý nghĩa từ vựng'}
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* View Full Original Text Toggle */}
            <button
              onClick={() => setShowOriginalText(!showOriginalText)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                showOriginalText
                  ? 'bg-teal-50 text-teal-800 border-teal-300'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
              title="Đối chiếu bài đọc hoàn chỉnh gốc"
            >
              {showOriginalText ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Bài gốc</span>
            </button>
          </div>
        </div>

        {/* Full Text Modal / Collapsible if enabled */}
        {showOriginalText && (
          <div 
            onMouseUp={handleTextMouseUp}
            className="bg-teal-50/80 rounded-2xl p-4 border border-teal-200 text-teal-950 text-sm leading-relaxed animate-fadeIn select-text"
          >
            <div className="text-xs font-black text-teal-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-teal-700" /> Bản gốc hoàn chỉnh để đối chiếu:
            </div>
            <p className="font-serif italic text-[15px]">{currentPassage.fullText}</p>
          </div>
        )}

        {/* C-Test Reading Area - Unified single continuous passage */}
        <div 
          onMouseUp={handleTextMouseUp}
          className="p-5 sm:p-8 rounded-2xl bg-slate-50/60 border border-slate-200 text-slate-900 leading-[2.8] font-serif text-[17px] sm:text-[18px] select-text"
        >
          <span className="text-slate-900 font-normal">{currentPassage.leadSentence} </span>
          {parsedBodyElements}
        </div>

        {/* Action Buttons: Submit / Retry / Next */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
          <div className="text-xs text-slate-500 font-medium">
            💡 <span className="font-bold">Mẹo làm bài:</span> Nhập đủ số chữ cái hệ thống sẽ tự nhảy sang ô tiếp theo. Phím <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[10px]">Enter</kbd> để nộp bài.
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {isSubmitted ? (
              <>
                <button
                  onClick={handleReset}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm lại bài này</span>
                </button>
                <button
                  onClick={handleNextUncompletedPassage}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <span>Làm tiếp bài tiếp theo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <button
                onClick={handleSubmit}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 active:scale-98 text-white text-xs sm:text-sm font-black tracking-wide shadow-md transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Kiểm tra & Nộp bài</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4. POST-SUBMISSION DETAILED SCORE & BREAKDOWN */}
      {isSubmitted && currentResult && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#dfd8cc] shadow-sm space-y-6 animate-fadeIn">
          {/* Result Banner with TOEFL Band prediction */}
          <div
            className={`rounded-2xl p-5 sm:p-6 border flex flex-col md:flex-row items-center justify-between gap-5 ${
              currentResult.correctCount >= 8
                ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                : currentResult.correctCount >= 5
                ? 'bg-amber-50/90 border-amber-300 text-amber-950'
                : 'bg-rose-50/90 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                  currentResult.correctCount >= 8
                    ? 'bg-emerald-600 text-white'
                    : currentResult.correctCount >= 5
                    ? 'bg-amber-600 text-white'
                    : 'bg-rose-600 text-white'
                }`}
              >
                <Award className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black">
                    {currentResult.correctCount} / {currentResult.total} từ chính xác ({currentResult.percentage}%)
                  </span>
                </div>
                <p className="text-xs sm:text-sm mt-0.5 opacity-90 font-medium">
                  {currentResult.correctCount === 10
                    ? '🎯 Xuất sắc! Năng lực từ vựng & ngữ pháp tuyệt đối (Band 6.0 / C2 Mastery).'
                    : currentResult.correctCount >= 8
                    ? '👏 Rất tốt! Khả năng suy luận ngữ cảnh vững vàng (Band 5.5 - 6.0 / C1 Advanced).'
                    : currentResult.correctCount >= 5
                    ? '📈 Khá tốt! Đạt ngưỡng Intermediate (Band 4.5 - 5.0). Hãy củng cố các từ bị sai.'
                    : '💪 Hãy ghi nhớ từ loại (POS) và manh mối từ câu trước để cải thiện điểm số.'}
                </p>
              </div>
            </div>

            {/* Next button shortcut */}
            <button
              onClick={handleNextPassage}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Luyện bài tiếp</span>
              <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
            </button>
          </div>

          {/* Detailed 10 Words Breakdown Table */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-700" />
                Giải mã chi tiết 10 từ vựng khuyết (Target Words Breakdown)
              </h3>
              <span className="text-xs font-bold text-slate-500">
                Nhấn 🌟 để lưu vào Flashcards ôn tập
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {currentResult.blankResults.map((item) => {
                const isStar = !!starredWords[item.fullWord.toLowerCase()];

                return (
                  <div
                    key={item.index}
                    className={`rounded-2xl p-4 border transition-all ${
                      item.isCorrect
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : 'bg-rose-50/40 border-rose-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-black px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 font-mono">
                            #{item.index}
                          </span>
                          <span className="text-base font-black text-slate-900 font-mono">
                            <span className="text-slate-500 font-semibold">{item.prefix}</span>
                            <span className="text-indigo-700 underline decoration-indigo-400 font-black">
                              {item.missing}
                            </span>
                            <span className="text-xs text-slate-500 font-normal ml-1">
                              ({item.fullWord})
                            </span>
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-slate-100 text-slate-600 border border-slate-300">
                            {item.pos}
                          </span>
                        </div>

                        {/* User Answer vs Expected */}
                        <div className="text-xs flex items-center gap-2 pt-1 font-mono">
                          <span className="text-slate-500">Bạn gõ:</span>
                          <span
                            className={`font-black px-1.5 py-0.5 rounded ${
                              item.isCorrect
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800 line-through'
                            }`}
                          >
                            {item.userVal || '(bỏ trống)'}
                          </span>
                          {!item.isCorrect && (
                            <>
                              <span className="text-slate-400">→ Chuẩn:</span>
                              <span className="bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded">
                                {item.missing}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Vietnamese Explanation */}
                        <p className="text-xs text-slate-700 pt-1 font-medium leading-relaxed">
                          {item.hint}
                        </p>
                      </div>

                      {/* Star Button */}
                      <button
                        onClick={() => toggleStarWord(item)}
                        className={`p-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                          isStar
                            ? 'text-amber-500 hover:text-amber-600 bg-amber-50 border border-amber-200'
                            : 'text-slate-400 hover:text-amber-500 bg-white border border-slate-200 hover:border-amber-300'
                        }`}
                        title={isStar ? 'Bỏ lưu từ này' : 'Lưu vào Vocabulary Hub & Flashcard'}
                      >
                        <Star className={`w-4 h-4 ${isStar ? 'fill-amber-400' : ''}`} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 5. Pop-up Từ Điển Tra Cứu & 1-Chạm Lưu Từ khi Bôi Đen Văn Bản */}
      {selectionData && (
        <QuickVocabPopover
          selection={selectionData}
          onClose={clearSelection}
          onSaveSuccess={(word) => {
            showToast(`Đã lưu "${word}" vào Flashcards!`);
          }}
        />
      )}
    </div>
  );
}
