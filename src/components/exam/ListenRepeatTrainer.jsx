import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Headphones,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Star,
  Search,
  Filter,
  Eye,
  EyeOff,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Award,
  Layers,
  ArrowLeft,
  Check,
  TrendingUp,
  Clock,
  BookOpen,
  Shuffle
} from 'lucide-react';
import { SPEAKING_87_PRACTICES, SPEAKING_REPEAT_GABBLE_609 } from '../../data/speaking87PracticesData.js';

// Local storage key for manual star markings
const STARRED_STORAGE_KEY = 'toefl_listen_repeat_starred_practices';

// ETS Beep generator using Web Audio API
function playETSBeep(freq = 650, duration = 250) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration / 1000);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration / 1000);
  } catch (err) {
    console.warn('AudioContext beep error:', err);
  }
}

export default function ListenRepeatTrainer() {
  // --- Global States ---
  const [activeView, setActiveView] = useState('practices'); // 'practices' | 'sentences'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [selectedStatus, setSelectedStatus] = useState('all'); // 'all' | 'starred' | 'unstarred'
  const [selectedLevel, setSelectedLevel] = useState('all'); // for sentences view: 'all' | 1 | 2 | 3
  
  // Starred practices map: { [practiceNumber]: true }
  const [starredPractices, setStarredPractices] = useState(() => {
    try {
      const saved = localStorage.getItem(STARRED_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Toast notification
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimeoutRef = useRef(null);

  const showToast = (msg) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => setToastMessage(null), 3000);
  };

  // Star toggle handler (STRICTLY MANUAL)
  const handleToggleStar = (practiceNum, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setStarredPractices((prev) => {
      const next = { ...prev };
      if (next[practiceNum]) {
        delete next[practiceNum];
        showToast(`Đã bỏ đánh dấu Practice ${practiceNum}`);
      } else {
        next[practiceNum] = true;
        showToast(`Đã đánh dấu hoàn thành Practice ${practiceNum} ⭐`);
      }
      try {
        localStorage.setItem(STARRED_STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.warn('Failed to save to localStorage:', err);
      }
      return next;
    });
  };

  // --- Active Practice Studio State ---
  const [activePractice, setActivePractice] = useState(null);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(0);
  const [isTextHidden, setIsTextHidden] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Speech Recognition (Microphone) States
  const [isRecording, setIsRecording] = useState(false);
  const [userTranscript, setUserTranscript] = useState('');
  const [recognitionScore, setRecognitionScore] = useState(null);
  const recognitionRef = useRef(null);

  // Auto exam runner state (continuous 7-question exam mode)
  const [isContinuousExam, setIsContinuousExam] = useState(false);
  const [continuousExamPhase, setContinuousExamPhase] = useState('idle'); // 'listening' | 'speaking' | 'feedback'
  const [countdownSeconds, setCountdownSeconds] = useState(0);
  const countdownIntervalRef = useRef(null);

  // List of all distinct topics
  const topicsList = useMemo(() => {
    const set = new Set();
    SPEAKING_87_PRACTICES.forEach((p) => {
      if (p.topic) set.add(p.topic);
    });
    return ['All Topics', ...Array.from(set).sort()];
  }, []);

  // Filtered Practices
  const filteredPractices = useMemo(() => {
    return SPEAKING_87_PRACTICES.filter((p) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchTopic = p.topic.toLowerCase().includes(q);
        const matchScenario = p.scenario.toLowerCase().includes(q);
        const matchNum = `practice ${p.practice_number}`.includes(q) || `${p.practice_number}` === q;
        const matchSentences = p.sentences.some((s) => s.text.toLowerCase().includes(q));
        if (!matchTitle && !matchTopic && !matchScenario && !matchNum && !matchSentences) {
          return false;
        }
      }

      // 2. Topic
      if (selectedTopic !== 'All Topics' && p.topic !== selectedTopic) {
        return false;
      }

      // 3. Status
      const isStarred = Boolean(starredPractices[p.practice_number]);
      if (selectedStatus === 'starred' && !isStarred) return false;
      if (selectedStatus === 'unstarred' && isStarred) return false;

      return true;
    });
  }, [searchQuery, selectedTopic, selectedStatus, starredPractices]);

  // Filtered Sentences (Flat Bank)
  const filteredSentences = useMemo(() => {
    return SPEAKING_REPEAT_GABBLE_609.filter((s) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchText = s.text.toLowerCase().includes(q);
        const matchTopic = s.topic.toLowerCase().includes(q);
        const matchPractice = `practice ${s.practice_number}`.includes(q);
        if (!matchText && !matchTopic && !matchPractice) return false;
      }
      if (selectedLevel !== 'all' && s.level !== Number(selectedLevel)) return false;
      if (selectedTopic !== 'All Topics' && s.topic !== selectedTopic) return false;
      return true;
    });
  }, [searchQuery, selectedLevel, selectedTopic]);

  // Total completed count
  const completedCount = useMemo(() => {
    return Object.keys(starredPractices).length;
  }, [starredPractices]);

  // --- TTS Audio Player ---
  const playNativeTTS = (text, rate = 1.0, onEndCallback = null) => {
    if (!('speechSynthesis' in window)) {
      showToast('Trình duyệt không hỗ trợ Web Speech TTS.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate;

    // Try finding US English voices
    const voices = window.speechSynthesis.getVoices();
    const usVoice = voices.find((v) => v.lang === 'en-US' && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Zira')));
    if (usVoice) utterance.voice = usVoice;

    setIsPlayingAudio(true);
    utterance.onend = () => {
      setIsPlayingAudio(false);
      if (onEndCallback) onEndCallback();
    };
    utterance.onerror = () => {
      setIsPlayingAudio(false);
      if (onEndCallback) onEndCallback();
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  };

  // --- Speech Recognition ---
  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast('Trình duyệt chưa hỗ trợ ghi âm trực tiếp. Hãy dùng Chrome hoặc Edge.');
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;

      setUserTranscript('');
      setRecognitionScore(null);
      setIsRecording(true);

      recognition.onresult = (event) => {
        let currentText = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript;
        }
        setUserTranscript(currentText);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.onerror = (err) => {
        console.warn('Speech recognition error:', err);
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  // Evaluate user transcript against current target sentence
  const currentSentence = activePractice?.sentences?.[activeSentenceIndex];

  useEffect(() => {
    if (!userTranscript || !currentSentence) {
      setRecognitionScore(null);
      return;
    }

    const clean = (str) =>
      str
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    const targetWords = clean(currentSentence.text);
    const spokenWords = clean(userTranscript);

    if (targetWords.length === 0) return;

    let matched = 0;
    const spokenSet = new Set(spokenWords);
    targetWords.forEach((tw) => {
      if (spokenSet.has(tw)) matched++;
    });

    const percent = Math.min(100, Math.round((matched / targetWords.length) * 100));
    setRecognitionScore({
      percent,
      matched,
      total: targetWords.length,
      targetWords,
      spokenWords
    });
  }, [userTranscript, currentSentence]);

  // Clean up audio/timers when switching practice or unmounting
  useEffect(() => {
    return () => {
      stopAudio();
      if (recognitionRef.current) recognitionRef.current.abort();
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, []);

  // Open Practice Studio
  const handleOpenPractice = (practice) => {
    stopAudio();
    setActivePractice(practice);
    setActiveSentenceIndex(0);
    setUserTranscript('');
    setRecognitionScore(null);
    setIsTextHidden(false);
    setIsContinuousExam(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitPractice = () => {
    stopAudio();
    setActivePractice(null);
    setIsContinuousExam(false);
  };

  // Step between sentences
  const handleNextSentence = () => {
    if (!activePractice) return;
    stopAudio();
    setUserTranscript('');
    setRecognitionScore(null);
    if (activeSentenceIndex < activePractice.sentences.length - 1) {
      setActiveSentenceIndex((prev) => prev + 1);
    }
  };

  const handlePrevSentence = () => {
    if (!activePractice) return;
    stopAudio();
    setUserTranscript('');
    setRecognitionScore(null);
    if (activeSentenceIndex > 0) {
      setActiveSentenceIndex((prev) => prev - 1);
    }
  };

  // Continuous Full-Test Mode Runner
  const handleStartContinuousExam = () => {
    if (!activePractice) return;
    setIsContinuousExam(true);
    setActiveSentenceIndex(0);
    setUserTranscript('');
    setRecognitionScore(null);
    runContinuousStep(0);
  };

  const runContinuousStep = (sIdx) => {
    const s = activePractice?.sentences?.[sIdx];
    if (!s) {
      setIsContinuousExam(false);
      showToast('Đã hoàn thành toàn bộ 7 câu của đề thi! 🎉');
      return;
    }
    setActiveSentenceIndex(sIdx);
    setContinuousExamPhase('listening');
    setUserTranscript('');
    setRecognitionScore(null);

    // 1. Play native audio
    playNativeTTS(s.text, playbackRate, () => {
      // 2. Play ETS Beep
      playETSBeep(700, 300);
      setContinuousExamPhase('speaking');

      // 3. Start recording & countdown
      startRecording();
      const durationAllowed = s.level === 1 ? 8 : s.level === 2 ? 10 : 12;
      setCountdownSeconds(durationAllowed);

      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      let remain = durationAllowed;

      countdownIntervalRef.current = setInterval(() => {
        remain -= 1;
        setCountdownSeconds(remain);
        if (remain <= 0) {
          clearInterval(countdownIntervalRef.current);
          stopRecording();
          playETSBeep(450, 200); // End beep
          setContinuousExamPhase('feedback');

          // Pause 2s to view score, then advance
          setTimeout(() => {
            if (sIdx + 1 < activePractice.sentences.length) {
              runContinuousStep(sIdx + 1);
            } else {
              setIsContinuousExam(false);
              showToast('Đã hoàn thành xuất sắc toàn bộ 7 câu! 🎉');
            }
          }, 2500);
        }
      }, 1000);
    });
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-bold flex items-center gap-2 animate-bounce">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. TOP HERO BANNER */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-400/20 text-sky-300 text-xs font-black tracking-wider uppercase border border-sky-400/30">
              <Headphones className="w-3.5 h-3.5" />
              <span>TOEFL iBT 2026 Speaking Task 1 Official Format</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>LISTEN AND REPEAT HUB</span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                87 Đề Thực Hành
              </span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Luyện nghe và nhắc lại chuẩn ngữ điệu & trọng âm với 87 tình huống giao tiếp đời sống và học thuật thực tế. Mỗi đề bài gồm 7 câu có độ khó tăng dần từ Level 1 đến Level 3.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 w-full sm:w-auto text-center shrink-0">
            <div className="px-3">
              <div className="text-xl sm:text-2xl font-black text-sky-300">87</div>
              <div className="text-[10px] sm:text-xs text-slate-300 font-semibold uppercase tracking-wider">Bộ Đề ETS</div>
            </div>
            <div className="px-3 border-x border-white/10">
              <div className="text-xl sm:text-2xl font-black text-emerald-300">609</div>
              <div className="text-[10px] sm:text-xs text-slate-300 font-semibold uppercase tracking-wider">Câu Shadowing</div>
            </div>
            <div className="px-3">
              <div className="text-xl sm:text-2xl font-black text-amber-300">{completedCount}</div>
              <div className="text-[10px] sm:text-xs text-slate-300 font-semibold uppercase tracking-wider">Đã Luyện (⭐)</div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MODE A: PRACTICE STUDIO (NẾU ĐANG CHỌN 1 ĐỀ) */}
      {/* ========================================================================= */}
      {activePractice ? (
        <div className="bg-white rounded-3xl border-2 border-sky-600/30 shadow-xl overflow-hidden space-y-0 transition-all">
          {/* Studio Header */}
          <div className="bg-gradient-to-r from-sky-50 via-indigo-50 to-slate-50 border-b border-sky-100 p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleExitPractice}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Về danh sách đề</span>
                </button>
                <span className="px-2.5 py-1 rounded-md bg-sky-700 text-white text-[11px] font-black uppercase">
                  Practice {activePractice.practice_number}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-sky-100 text-sky-800 text-[11px] font-extrabold">
                  {activePractice.topic}
                </span>
              </div>
              <h2 className="text-lg font-black text-slate-900 pt-1">
                {activePractice.title}
              </h2>
            </div>

            {/* Top Controls: Manual Star & Video Link */}
            <div className="flex items-center gap-2.5 flex-wrap self-end md:self-auto">
              {/* Star toggle */}
              <button
                onClick={(e) => handleToggleStar(activePractice.practice_number, e)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs border ${
                  starredPractices[activePractice.practice_number]
                    ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-amber-400'
                }`}
                title="Bấm để chủ động đánh dấu đã hoàn thành đề này"
              >
                <Star
                  className={`w-4 h-4 ${
                    starredPractices[activePractice.practice_number]
                      ? 'fill-amber-400 text-amber-500'
                      : 'text-slate-400'
                  }`}
                />
                <span>
                  {starredPractices[activePractice.practice_number]
                    ? 'Đã thực hành đề này'
                    : 'Đánh dấu đã làm bài'}
                </span>
              </button>

              {/* YouTube Link */}
              <a
                href={activePractice.youtube_url}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Xem clip YouTube gốc</span>
              </a>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Scenario Box */}
            <div className="bg-sky-50/80 border border-sky-200 rounded-2xl p-4 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center text-lg font-black shrink-0 shadow-xs">
                🏢
              </div>
              <div className="space-y-1">
                <div className="text-[11px] font-black text-sky-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  <span>Tình Huống Giao Tiếp (Scenario)</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
                  "{activePractice.scenario}"
                </p>
              </div>
            </div>

            {/* 7-Step Navigation Indicator */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
                <span>Chọn câu luyện tập:</span>
                <span className="text-sky-700 font-extrabold">
                  Câu {activeSentenceIndex + 1} / 7
                </span>
              </div>
              <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                {activePractice.sentences.map((sent, idx) => {
                  const isActive = idx === activeSentenceIndex;
                  return (
                    <button
                      key={sent.index}
                      onClick={() => {
                        stopAudio();
                        setUserTranscript('');
                        setRecognitionScore(null);
                        setActiveSentenceIndex(idx);
                      }}
                      className={`py-2 px-1 rounded-xl text-center text-xs font-extrabold transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-sky-700 text-white border-sky-700 shadow-md ring-2 ring-sky-300'
                          : sent.level === 1
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                          : sent.level === 2
                          ? 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100'
                          : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                      }`}
                    >
                      <div className="truncate">Câu {sent.index}</div>
                      <div className="text-[10px] opacity-75 font-medium">{sent.word_count}w</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ========================================================================= */}
            {/* ACTIVE SENTENCE STUDIO (DARK MODE CARD) */}
            {/* ========================================================================= */}
            {currentSentence && (
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 text-center relative overflow-hidden shadow-2xl border border-slate-800">
                {/* Level Header & Text Controls */}
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold border-b border-slate-800 pb-3 flex-wrap gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase ${
                      currentSentence.level === 1
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : currentSentence.level === 2
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    Level {currentSentence.level} • {currentSentence.word_count} Từ
                  </span>

                  <div className="flex items-center gap-2">
                    {/* Hide Text Toggle */}
                    <button
                      onClick={() => setIsTextHidden(!isTextHidden)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
                      title="Ẩn câu để thử thách nghe phản xạ"
                    >
                      {isTextHidden ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{isTextHidden ? 'Hiện câu chữ' : 'Ẩn câu (Nghe chay)'}</span>
                    </button>

                    {/* Speed Selector */}
                    <div className="flex items-center bg-slate-800 rounded-xl p-0.5 border border-slate-700 text-xs font-bold">
                      {[0.8, 1.0, 1.2].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => setPlaybackRate(rate)}
                          className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                            playbackRate === rate ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sentence Display Area */}
                <div className="py-4 space-y-2">
                  <div className="text-xs text-sky-400 font-black tracking-widest uppercase">
                    Câu số {currentSentence.index} trên 7 câu
                  </div>

                  {isTextHidden ? (
                    <div className="py-6 px-4 bg-slate-800/50 rounded-2xl border border-dashed border-slate-700 max-w-lg mx-auto">
                      <div className="text-slate-400 text-sm font-semibold flex items-center justify-center gap-2">
                        <Headphones className="w-5 h-5 text-sky-400 animate-bounce" />
                        <span>Chữ đang bị ẩn. Bấm "Nghe Mẫu" để luyện tai nghe phản xạ!</span>
                      </div>
                    </div>
                  ) : (
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug max-w-3xl mx-auto">
                      "{currentSentence.text}"
                    </h3>
                  )}
                </div>

                {/* Interactive Audio & Speech Controls */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  {/* Play Native TTS */}
                  <button
                    onClick={() => {
                      if (isPlayingAudio) stopAudio();
                      else playNativeTTS(currentSentence.text, playbackRate);
                    }}
                    className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer ${
                      isPlayingAudio
                        ? 'bg-amber-600 hover:bg-amber-500 text-white ring-4 ring-amber-500/30'
                        : 'bg-sky-600 hover:bg-sky-500 text-white ring-4 ring-sky-500/20'
                    }`}
                  >
                    {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    <span>{isPlayingAudio ? 'Dừng phát âm' : 'Nghe Mẫu (Native Audio)'}</span>
                  </button>

                  {/* Record User Speech */}
                  <button
                    onClick={() => {
                      if (isRecording) stopRecording();
                      else startRecording();
                    }}
                    className={`px-6 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer ${
                      isRecording
                        ? 'bg-rose-600 hover:bg-rose-500 text-white ring-4 ring-rose-500/30 animate-pulse'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white ring-4 ring-emerald-500/20'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    <span>{isRecording ? 'Đang Thu Âm (Bấm dừng)' : 'Bấm Thu Âm Nhắc Lại'}</span>
                  </button>

                  {/* Play ETS Beep */}
                  <button
                    onClick={() => playETSBeep(650, 250)}
                    className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-slate-700"
                    title="Phát tiếng bíp chuông thi ETS"
                  >
                    <span>🔔</span>
                    <span>Tiếng Bíp ETS</span>
                  </button>
                </div>

                {/* Real-time Recognition Speech Feedback Card */}
                {userTranscript && (
                  <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-700 text-left space-y-3 max-w-2xl mx-auto shadow-inner">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <span>Nhận diện giọng nói của bạn:</span>
                      </span>
                      {recognitionScore && (
                        <span
                          className={`font-black px-2.5 py-0.5 rounded-md ${
                            recognitionScore.percent >= 80
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : recognitionScore.percent >= 50
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          }`}
                        >
                          Chính xác: {recognitionScore.percent}% ({recognitionScore.matched}/{recognitionScore.total} từ)
                        </span>
                      )}
                    </div>

                    <div className="bg-slate-950/80 p-3 rounded-xl text-xs sm:text-sm font-bold text-slate-200 leading-relaxed border border-slate-800">
                      "{userTranscript}"
                    </div>

                    {/* Word-by-word Match Highlight */}
                    {recognitionScore && (
                      <div className="text-xs space-y-1">
                        <div className="text-slate-400 text-[11px] font-semibold">Đối chiếu với câu gốc:</div>
                        <div className="flex flex-wrap gap-1.5 p-2 bg-slate-900 rounded-lg">
                          {recognitionScore.targetWords.map((word, wIdx) => {
                            const isMatched = recognitionScore.spokenWords.includes(word);
                            return (
                              <span
                                key={wIdx}
                                className={`px-2 py-0.5 rounded text-xs font-extrabold ${
                                  isMatched
                                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-700/50'
                                    : 'bg-rose-950/80 text-rose-400 border border-rose-800/50'
                                }`}
                              >
                                {word}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Continuous Exam Runner Banner (Nút Chạy Thi Thật 7 Câu) */}
                <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-sky-400" />
                      <span>Chế độ mô phỏng phòng thi liên tục (Full 7 câu):</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Tự động phát âm, bíp chuông ETS, đếm ngược thời gian nói cho từng câu.
                    </div>
                  </div>

                  {isContinuousExam ? (
                    <button
                      onClick={() => setIsContinuousExam(false)}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer transition-all"
                    >
                      Dừng chế độ thi
                    </button>
                  ) : (
                    <button
                      onClick={handleStartContinuousExam}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shadow-md cursor-pointer transition-all flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Bắt đầu thi 7 câu liên tục</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Bottom Step Navigators */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handlePrevSentence}
                disabled={activeSentenceIndex === 0}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Câu trước</span>
              </button>

              <div className="text-xs text-slate-500 font-semibold text-center">
                Câu {activeSentenceIndex + 1} / {activePractice.sentences.length} • Practice {activePractice.practice_number}
              </div>

              <button
                onClick={handleNextSentence}
                disabled={activeSentenceIndex === activePractice.sentences.length - 1}
                className="px-5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-black text-xs transition-all shadow-xs flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>Câu tiếp theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* 3. MODE B: PRACTICE LIST DASHBOARD (DANH SÁCH 87 ĐỀ HOẶC 609 CÂU) */
        /* ========================================================================= */
        <div className="space-y-6">
          {/* Controls & Filter Bar */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search & Topic Filters */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto flex-1">
              {/* Search input */}
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm số đề, chủ đề, câu luyện..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                />
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              </div>

              {/* Topic Dropdown */}
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
              >
                {topicsList.map((t) => (
                  <option key={t} value={t}>
                    {t === 'All Topics' ? 'Tất cả chủ đề (87 đề)' : t}
                  </option>
                ))}
              </select>

              {/* Status Filter (Only in Practices view) */}
              {activeView === 'practices' ? (
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="starred">⭐ Đã thực hành rồi ({completedCount})</option>
                  <option value="unstarred">Chưa thực hành ({87 - completedCount})</option>
                </select>
              ) : (
                /* Level Filter (In Sentences Bank view) */
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
                >
                  <option value="all">Tất cả cấp độ (Level 1-3)</option>
                  <option value="1">Level 1: Câu ngắn (5-10 từ)</option>
                  <option value="2">Level 2: Câu vừa (8-16 từ)</option>
                  <option value="3">Level 3: Câu dài (15-25 từ)</option>
                </select>
              )}
            </div>

            {/* View Switcher: Practices vs Sentences */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl shrink-0 self-end md:self-auto">
              <button
                onClick={() => setActiveView('practices')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeView === 'practices'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>87 Bộ Đề Thi</span>
              </button>
              <button
                onClick={() => setActiveView('sentences')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeView === 'sentences'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>609 Câu Shadowing</span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* VIEW 1: 87 PRACTICES GRID */}
          {/* ========================================================================= */}
          {activeView === 'practices' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1">
                <span>
                  Hiển thị <span className="text-sky-700 font-extrabold">{filteredPractices.length}</span> / 87 đề bài
                </span>
                <span className="text-slate-400">
                  Tip: Bấm vào ngôi sao ⭐ để chủ động đánh dấu đề đã luyện xong
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPractices.map((p) => {
                  const isStarred = Boolean(starredPractices[p.practice_number]);
                  return (
                    <div
                      key={p.id}
                      onClick={() => handleOpenPractice(p)}
                      className={`bg-white rounded-2xl p-5 border shadow-xs hover:shadow-md transition-all space-y-3 cursor-pointer group flex flex-col justify-between ${
                        isStarred
                          ? 'border-amber-300 bg-amber-50/20 hover:border-amber-400'
                          : 'border-slate-200 hover:border-sky-400'
                      }`}
                    >
                      <div className="space-y-2">
                        {/* Card Top: Number & Manual Star */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="px-2.5 py-0.5 rounded-md bg-sky-100 text-sky-800 text-[11px] font-black uppercase">
                              Practice {p.practice_number}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                              {p.topic}
                            </span>
                          </div>

                          {/* Star Checkbox Button (NO AUTO FUNCTION) */}
                          <button
                            type="button"
                            onClick={(e) => handleToggleStar(p.practice_number, e)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 transition-all cursor-pointer"
                            title={isStarred ? 'Đã thực hành (Bấm để bỏ đánh dấu)' : 'Bấm để đánh dấu đã làm bài'}
                          >
                            <Star
                              className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                                isStarred ? 'fill-amber-400 text-amber-500' : 'text-slate-300 hover:text-amber-400'
                              }`}
                            />
                          </button>
                        </div>

                        {/* Title & Scenario */}
                        <h4 className="text-sm font-black text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-1">
                          {p.title.split('|')[1] ? p.title.split('|')[1].trim() : p.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          "{p.scenario}"
                        </p>
                      </div>

                      {/* Card Bottom Meta */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                        <span className="flex items-center gap-1 text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>7 câu chuẩn ETS</span>
                        </span>

                        <span className="text-sky-700 font-black group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                          <span>Luyện ngay</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredPractices.length === 0 && (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500 space-y-2">
                  <div className="text-3xl">🔍</div>
                  <div className="text-sm font-bold text-slate-800">Không tìm thấy đề thi phù hợp</div>
                  <div className="text-xs text-slate-400">Hãy thử thay đổi từ khóa hoặc bộ lọc của bạn.</div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 2: 609 SENTENCES BANK */}
          {/* ========================================================================= */}
          {activeView === 'sentences' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1">
                <span>
                  Hiển thị <span className="text-sky-700 font-extrabold">{filteredSentences.length}</span> / 609 câu luyện nói
                </span>
                <span className="text-slate-400">Bấm loa 🔊 để nghe phát âm mẫu</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredSentences.map((sent) => (
                  <div
                    key={sent.id}
                    className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-sky-300 transition-all space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-[10px] font-black uppercase">
                            P{sent.practice_number} • Câu {sent.sentence_index}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              sent.level === 1
                                ? 'bg-emerald-50 text-emerald-800'
                                : sent.level === 2
                                ? 'bg-sky-50 text-sky-800'
                                : 'bg-amber-50 text-amber-800'
                            }`}
                          >
                            Level {sent.level} ({sent.word_count}w)
                          </span>
                        </div>

                        {/* Quick Listen Button */}
                        <button
                          onClick={() => playNativeTTS(sent.text)}
                          className="p-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 transition-all cursor-pointer"
                          title="Nghe câu này"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        "{sent.text}"
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                      <span className="truncate max-w-[200px]">{sent.topic}</span>
                      <button
                        onClick={() => {
                          const target = SPEAKING_87_PRACTICES.find((p) => p.practice_number === sent.practice_number);
                          if (target) {
                            handleOpenPractice(target);
                            setActiveSentenceIndex(sent.sentence_index - 1);
                          }
                        }}
                        className="text-sky-700 font-bold hover:underline cursor-pointer"
                      >
                        Luyện cả đề này →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
