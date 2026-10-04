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
  Shuffle,
  Loader2,
  Trophy,
  X,
  FileText,
  Activity,
  Flame,
  HelpCircle
} from 'lucide-react';
import { SPEAKING_87_PRACTICES, SPEAKING_REPEAT_GABBLE_609 } from '../../data/speaking87PracticesData.js';
import {
  evaluateSentencePronunciationAndStress,
  evaluateListenRepeatFullPractice
} from '../../lib/gemini.js';

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

  // Per-sentence recording & AI evaluations cache:
  // { [sentenceIndex]: { userTranscript, recognitionScore, audioUrl, audioBlob, durationSeconds, aiEvaluation } }
  const [practiceRecordings, setPracticeRecordings] = useState({});

  // Current sentence live Speech Recognition & Recording states
  const [isRecording, setIsRecording] = useState(false);
  const [userTranscript, setUserTranscript] = useState('');
  const [recognitionScore, setRecognitionScore] = useState(null);
  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingStreamRef = useRef(null);
  const recordingStartTimeRef = useRef(0);

  // Playback of user's recorded audio
  const [isPlayingUserAudio, setIsPlayingUserAudio] = useState(false);
  const userAudioElementRef = useRef(null);

  // Single Sentence AI Evaluation States
  const [isEvaluatingSentence, setIsEvaluatingSentence] = useState(false);
  const [sentenceAiError, setSentenceAiError] = useState(null);

  // Full 7-Sentence Test AI Evaluation States
  const [isEvaluatingFullTest, setIsEvaluatingFullTest] = useState(false);
  const [fullTestAiReport, setFullTestAiReport] = useState(null);
  const [isFullReportModalOpen, setIsFullReportModalOpen] = useState(false);
  const [fullTestAiError, setFullTestAiError] = useState(null);

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
      if (selectedTopic !== 'All Topics' && p.topic !== selectedTopic) {
        return false;
      }
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

    const voices = window.speechSynthesis.getVoices();
    const usVoice = voices.find(
      (v) =>
        v.lang === 'en-US' &&
        (v.name.includes('Natural') ||
          v.name.includes('Google') ||
          v.name.includes('Samantha') ||
          v.name.includes('Zira'))
    );
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

  // --- Play recorded voice ---
  const playUserRecording = (url) => {
    if (!url) return;
    if (userAudioElementRef.current) {
      userAudioElementRef.current.pause();
    }
    const audio = new Audio(url);
    userAudioElementRef.current = audio;
    setIsPlayingUserAudio(true);
    audio.onended = () => setIsPlayingUserAudio(false);
    audio.onerror = () => setIsPlayingUserAudio(false);
    audio.play();
  };

  const stopUserRecording = () => {
    if (userAudioElementRef.current) {
      userAudioElementRef.current.pause();
      setIsPlayingUserAudio(false);
    }
  };

  // Release all hardware microphone tracks immediately
  const releaseMicrophoneStream = () => {
    if (recordingStreamRef.current) {
      try {
        recordingStreamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      } catch (err) {
        console.warn('Error stopping microphone track:', err);
      }
      recordingStreamRef.current = null;
    }
  };

  const autoStopTimerRef = useRef(null);

  // --- Speech Recognition & MediaRecorder ---
  const stopRecording = () => {
    if (autoStopTimerRef.current) {
      clearTimeout(autoStopTimerRef.current);
      autoStopTimerRef.current = null;
    }

    setIsRecording(false);

    // 1. Stop and abort Web Speech Recognition immediately
    if (recognitionRef.current) {
      const rec = recognitionRef.current;
      recognitionRef.current = null;
      try { rec.stop(); } catch (e) {}
      try { rec.abort(); } catch (e) {}
    }

    // 2. Stop MediaRecorder
    if (mediaRecorderRef.current) {
      const mr = mediaRecorderRef.current;
      mediaRecorderRef.current = null;
      if (mr.state === 'recording' || mr.state === 'paused') {
        try {
          mr.stop();
        } catch (e) {
          releaseMicrophoneStream();
        }
      } else {
        releaseMicrophoneStream();
      }
    } else {
      releaseMicrophoneStream();
    }

    // Safety timeout: Ensure all tracks are definitely ended
    setTimeout(() => {
      releaseMicrophoneStream();
    }, 250);
  };

  const startRecording = async () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast('Trình duyệt chưa hỗ trợ ghi âm trực tiếp. Hãy dùng Chrome hoặc Edge.');
      return;
    }

    // Clear previous sessions/hardware connections first
    stopRecording();
    releaseMicrophoneStream();

    try {
      // 1. Microphone MediaRecorder
      if (navigator.mediaDevices?.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          recordingStreamRef.current = stream;
          const mr = new MediaRecorder(stream);
          audioChunksRef.current = [];
          mr.ondataavailable = (e) => {
            if (e.data.size > 0) audioChunksRef.current.push(e.data);
          };
          mr.onstop = () => {
            const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            const url = URL.createObjectURL(blob);
            const duration = Math.max(1, Math.round((Date.now() - recordingStartTimeRef.current) / 1000));
            
            setPracticeRecordings((prev) => {
              const currentRec = prev[activeSentenceIndex] || {};
              return {
                ...prev,
                [activeSentenceIndex]: {
                  ...currentRec,
                  audioUrl: url,
                  audioBlob: blob,
                  durationSeconds: duration
                }
              };
            });

            // Cleanly kill audio stream tracks once recording blob is assembled
            releaseMicrophoneStream();
          };
          mediaRecorderRef.current = mr;
          recordingStartTimeRef.current = Date.now();
          mr.start();
        } catch (mErr) {
          console.warn('Microphone stream warning:', mErr);
        }
      }

      // 2. SpeechRecognition
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;

      setUserTranscript('');
      setRecognitionScore(null);
      setSentenceAiError(null);
      setIsRecording(true);

      recognition.onresult = (event) => {
        let currentText = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript;
        }
        setUserTranscript(currentText);
      };

      recognition.onend = () => {
        // Automatically shut down MediaRecorder and release browser microphone
        stopRecording();
      };

      recognition.onerror = (err) => {
        console.warn('Speech recognition error:', err);
        stopRecording();
      };

      recognitionRef.current = recognition;
      recognition.start();

      // Auto-stop timeout safety (15s max per sentence)
      if (autoStopTimerRef.current) clearTimeout(autoStopTimerRef.current);
      autoStopTimerRef.current = setTimeout(() => {
        stopRecording();
      }, 15000);
    } catch (err) {
      console.error('Failed to start recording:', err);
      stopRecording();
    }
  };

  // Evaluate user transcript against current target sentence
  const currentSentence = activePractice?.sentences?.[activeSentenceIndex];

  useEffect(() => {
    if (!userTranscript || !currentSentence) {
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
    const scoreObj = {
      percent,
      matched,
      total: targetWords.length,
      targetWords,
      spokenWords
    };
    setRecognitionScore(scoreObj);

    // Save to practice recordings store
    setPracticeRecordings((prev) => ({
      ...prev,
      [activeSentenceIndex]: {
        ...(prev[activeSentenceIndex] || {}),
        userTranscript,
        recognitionScore: scoreObj
      }
    }));
  }, [userTranscript, currentSentence, activeSentenceIndex]);

  // Switch between sentences and restore previous work
  const navigateToSentence = (idx) => {
    if (!activePractice || idx < 0 || idx >= activePractice.sentences.length) return;
    stopAudio();
    stopRecording();
    stopUserRecording();
    setActiveSentenceIndex(idx);
    const saved = practiceRecordings[idx];
    if (saved) {
      setUserTranscript(saved.userTranscript || '');
      setRecognitionScore(saved.recognitionScore || null);
    } else {
      setUserTranscript('');
      setRecognitionScore(null);
    }
    setSentenceAiError(null);
  };

  // Clean up audio/timers when switching practice or unmounting
  useEffect(() => {
    return () => {
      stopAudio();
      stopUserRecording();
      stopRecording();
      releaseMicrophoneStream();
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, []);

  // Open Practice Studio
  const handleOpenPractice = (practice) => {
    stopAudio();
    stopUserRecording();
    stopRecording();
    releaseMicrophoneStream();
    setActivePractice(practice);
    setActiveSentenceIndex(0);
    setUserTranscript('');
    setRecognitionScore(null);
    setPracticeRecordings({});
    setFullTestAiReport(null);
    setIsFullReportModalOpen(false);
    setIsTextHidden(false);
    setIsContinuousExam(false);
    setSentenceAiError(null);
    setFullTestAiError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitPractice = () => {
    stopAudio();
    stopUserRecording();
    stopRecording();
    releaseMicrophoneStream();
    setActivePractice(null);
    setIsContinuousExam(false);
  };

  // Step between sentences
  const handleNextSentence = () => {
    if (!activePractice) return;
    if (activeSentenceIndex < activePractice.sentences.length - 1) {
      navigateToSentence(activeSentenceIndex + 1);
    }
  };

  const handlePrevSentence = () => {
    if (!activePractice) return;
    if (activeSentenceIndex > 0) {
      navigateToSentence(activeSentenceIndex - 1);
    }
  };

  // Continuous Full-Test Mode Runner
  const handleStartContinuousExam = () => {
    if (!activePractice) return;
    setIsContinuousExam(true);
    navigateToSentence(0);
    runContinuousStep(0);
  };

  const runContinuousStep = (sIdx) => {
    const s = activePractice?.sentences?.[sIdx];
    if (!s) {
      setIsContinuousExam(false);
      showToast('Đã hoàn thành toàn bộ 7 câu của đề thi! 🎉 Bấm "Chấm Toàn Bộ 7 Câu Bằng AI" để xem điểm!');
      return;
    }
    navigateToSentence(sIdx);
    setContinuousExamPhase('listening');

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

          // Pause 2.5s to review sentence score, then advance
          setTimeout(() => {
            if (sIdx + 1 < activePractice.sentences.length) {
              runContinuousStep(sIdx + 1);
            } else {
              setIsContinuousExam(false);
              showToast('Đã hoàn thành xuất sắc toàn bộ 7 câu! 🎉 Bấm "Chấm Toàn Bộ 7 Câu Bằng AI" ngay!');
            }
          }, 2500);
        }
      }, 1000);
    });
  };

  // =========================================================================
  // AI EVALUATION 1: SINGLE SENTENCE (CHẤM PHÁT ÂM VÀ NGỮ ĐIỆU TỪNG CÂU)
  // =========================================================================
  const handleEvaluateSingleSentence = async () => {
    if (!currentSentence) return;
    const currentRec = practiceRecordings[activeSentenceIndex] || {};
    const textToEvaluate = userTranscript || currentRec.userTranscript || '';
    const audioUrlToEvaluate = currentRec.audioUrl || null;
    const duration = currentRec.durationSeconds || 0;

    if (!textToEvaluate && !audioUrlToEvaluate) {
      showToast('Vui lòng ghi âm câu trước khi bấm chấm điểm AI.');
      return;
    }

    setIsEvaluatingSentence(true);
    setSentenceAiError(null);
    try {
      const result = await evaluateSentencePronunciationAndStress({
        targetSentence: currentSentence.text,
        audioUrl: audioUrlToEvaluate,
        spokenTranscript: textToEvaluate,
        durationSeconds: duration
      });

      setPracticeRecordings((prev) => ({
        ...prev,
        [activeSentenceIndex]: {
          ...(prev[activeSentenceIndex] || {}),
          userTranscript: textToEvaluate,
          aiEvaluation: result
        }
      }));
      showToast('Đã có kết quả AI chấm điểm phát âm câu này! 🎉');
    } catch (err) {
      console.error('Lỗi AI chấm điểm câu:', err);
      setSentenceAiError(err.message || 'Không thể chấm điểm lúc này. Vui lòng kiểm tra API Key hoặc thử lại.');
    } finally {
      setIsEvaluatingSentence(false);
    }
  };

  // =========================================================================
  // AI EVALUATION 2: FULL 7-SENTENCE PRACTICE (CHẤM TOÀN BỘ 7 CÂU BẰNG AI)
  // =========================================================================
  const recordedSentencesCount = useMemo(() => {
    if (!activePractice) return 0;
    return activePractice.sentences.filter((_, idx) => {
      const rec = practiceRecordings[idx];
      return Boolean(rec?.userTranscript || rec?.audioUrl);
    }).length;
  }, [activePractice, practiceRecordings]);

  const handleEvaluateFullTest = async () => {
    if (!activePractice) return;

    if (recordedSentencesCount === 0) {
      showToast('Bạn chưa ghi âm câu nào. Hãy ghi âm ít nhất một vài câu để AI chấm điểm!');
      return;
    }

    setIsEvaluatingFullTest(true);
    setFullTestAiError(null);
    try {
      const sentenceResults = activePractice.sentences.map((s, idx) => {
        const rec = practiceRecordings[idx] || {};
        return {
          index: s.index || idx + 1,
          text: s.text,
          level: s.level,
          word_count: s.word_count,
          userTranscript: rec.userTranscript || '',
          audioUrl: rec.audioUrl || null,
          sentenceScore: rec.recognitionScore || null,
          aiEvaluation: rec.aiEvaluation || null
        };
      });

      const report = await evaluateListenRepeatFullPractice({
        practiceNumber: activePractice.practice_number,
        practiceTitle: activePractice.title,
        topic: activePractice.topic,
        scenario: activePractice.scenario,
        sentenceResults
      });

      setFullTestAiReport(report);
      setIsFullReportModalOpen(true);
      showToast('Đã hoàn thành chấm điểm toàn bộ 7 câu bằng AI! 🏆');
    } catch (err) {
      console.error('Lỗi chấm full test:', err);
      setFullTestAiError(err.message || 'Có lỗi khi chấm điểm toàn bài. Vui lòng thử lại.');
      showToast('Lỗi khi chấm điểm AI toàn bài. Vui lòng kiểm tra API Key hoặc thử lại.');
    } finally {
      setIsEvaluatingFullTest(false);
    }
  };

  const currentSentenceRec = practiceRecordings[activeSentenceIndex] || {};
  const currentSentenceAi = currentSentenceRec.aiEvaluation;

  return (
    <div className="space-y-6 pb-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-bold flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
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
              Luyện nghe và nhắc lại chuẩn ngữ điệu & trọng âm với 87 tình huống giao tiếp đời sống và học thuật thực tế. Tích hợp AI chấm điểm phát âm từng câu & toàn bộ 7 câu chuẩn thang điểm TOEFL 2026.
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

            {/* Top Action Controls: AI Grade Full Test & Manual Star */}
            <div className="flex items-center gap-2.5 flex-wrap self-end md:self-auto">
              {/* NÚT CHẤM TOÀN BỘ 7 CÂU BẰNG AI */}
              <button
                onClick={handleEvaluateFullTest}
                disabled={isEvaluatingFullTest}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-black transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-60"
                title="Gửi bài thi gồm 7 câu để AI chấm điểm quy đổi theo thang 30 ETS"
              >
                {isEvaluatingFullTest ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>AI đang chấm 7 câu...</span>
                  </>
                ) : (
                  <>
                    <Trophy className="w-4 h-4 text-amber-300" />
                    <span>Chấm Toàn Bộ 7 Câu AI</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px]">
                      {recordedSentencesCount}/7
                    </span>
                  </>
                )}
              </button>

              {/* Xem lại báo cáo full test nếu đã có */}
              {fullTestAiReport && (
                <button
                  onClick={() => setIsFullReportModalOpen(true)}
                  className="px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Xem Báo Cáo AI ({fullTestAiReport.score_30}/30)</span>
                </button>
              )}

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
                <span>YouTube gốc</span>
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

            {/* 7-Step Navigation Indicator with Recording & AI status */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
                <span>Chọn câu luyện tập:</span>
                <span className="text-sky-700 font-extrabold">
                  Câu {activeSentenceIndex + 1} / 7 • Đã ghi âm: {recordedSentencesCount}/7 câu
                </span>
              </div>
              <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                {activePractice.sentences.map((sent, idx) => {
                  const isActive = idx === activeSentenceIndex;
                  const rec = practiceRecordings[idx];
                  const hasRecorded = Boolean(rec?.userTranscript || rec?.audioUrl);
                  const hasAi = Boolean(rec?.aiEvaluation);

                  return (
                    <button
                      key={sent.index}
                      onClick={() => navigateToSentence(idx)}
                      className={`relative py-2.5 px-1 rounded-xl text-center text-xs font-extrabold transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-sky-700 text-white border-sky-700 shadow-md ring-2 ring-sky-300'
                          : hasRecorded
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                          : sent.level === 1
                          ? 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          : sent.level === 2
                          ? 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1 truncate">
                        <span>Câu {sent.index}</span>
                        {hasRecorded && <Check className="w-3 h-3 text-emerald-500 shrink-0" />}
                      </div>
                      <div className="text-[10px] opacity-80 font-medium">
                        L{sent.level} • {sent.word_count}w
                      </div>
                      {hasAi && (
                        <span className="absolute -top-1.5 -right-1.5 px-1 py-0.2 rounded-full bg-purple-600 text-[9px] text-white font-black shadow-xs">
                          AI
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ========================================================================= */}
            {/* ACTIVE SENTENCE STUDIO (DARK MODE CARD) */}
            {/* ========================================================================= */}
            {currentSentence && (
              <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white space-y-6 relative overflow-hidden shadow-2xl border border-slate-800">
                <div className="absolute top-0 right-0 w-80 h-80 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

                {/* Question Info Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase ${
                        currentSentence.level === 1
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : currentSentence.level === 2
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      Level {currentSentence.level} ({currentSentence.word_count} từ)
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">
                      {currentSentence.level === 1
                        ? 'Câu ngắn (4-6 từ) • Phản xạ nhanh'
                        : currentSentence.level === 2
                        ? 'Câu vừa (7-11 từ) • Trọng âm & nối từ'
                        : 'Câu dài (12-25 từ) • Cấu trúc phức & trí nhớ thính giác'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
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
                <div className="py-4 space-y-2 text-center">
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

                {/* ========================================================================= */}
                {/* USER RECORDING FEEDBACK & AI CHẤM TỪNG CÂU */}
                {/* ========================================================================= */}
                {(userTranscript || currentSentenceRec.audioUrl) && (
                  <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 text-left space-y-4 max-w-3xl mx-auto shadow-inner">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <span>Kết quả giọng nói của bạn:</span>
                      </span>

                      <div className="flex items-center gap-2">
                        {/* Play recorded voice */}
                        {currentSentenceRec.audioUrl && (
                          <button
                            onClick={() => {
                              if (isPlayingUserAudio) stopUserRecording();
                              else playUserRecording(currentSentenceRec.audioUrl);
                            }}
                            className="px-3 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
                          >
                            {isPlayingUserAudio ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                            <span>{isPlayingUserAudio ? 'Dừng phát' : 'Nghe lại giọng bạn'}</span>
                          </button>
                        )}

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
                            Độ khớp: {recognitionScore.percent}% ({recognitionScore.matched}/{recognitionScore.total} từ)
                          </span>
                        )}
                      </div>
                    </div>

                    {userTranscript && (
                      <div className="bg-slate-950/80 p-3.5 rounded-xl text-xs sm:text-sm font-bold text-slate-200 leading-relaxed border border-slate-800">
                        "{userTranscript}"
                      </div>
                    )}

                    {/* Word-by-word Match Highlight */}
                    {recognitionScore && (
                      <div className="text-xs space-y-1.5">
                        <div className="text-slate-400 text-[11px] font-semibold">Đối chiếu với câu gốc:</div>
                        <div className="flex flex-wrap gap-1.5 p-2.5 bg-slate-900 rounded-xl">
                          {recognitionScore.targetWords.map((word, wIdx) => {
                            const isMatched = recognitionScore.spokenWords.includes(word);
                            return (
                              <span
                                key={wIdx}
                                className={`px-2 py-0.5 rounded text-xs font-extrabold ${
                                  isMatched
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                }`}
                              >
                                {word}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Action Bar for AI Grading of this sentence */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-700/60">
                      <div className="text-[11px] text-slate-400">
                        Chấm điểm chuyên sâu ngữ âm, trọng âm và ngữ điệu bằng AI:
                      </div>

                      <button
                        onClick={handleEvaluateSingleSentence}
                        disabled={isEvaluatingSentence}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                      >
                        {isEvaluatingSentence ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                            <span>AI đang phân tích câu...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 text-amber-300" />
                            <span>Chấm Phát Âm Câu Này Bằng AI</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* AI Error Alert */}
                    {sentenceAiError && (
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                        <span>{sentenceAiError}</span>
                      </div>
                    )}

                    {/* AI Sentence Result Box */}
                    {currentSentenceAi && (
                      <div className="mt-4 p-5 rounded-2xl bg-gradient-to-b from-purple-950/40 to-slate-900 border-2 border-purple-500/30 space-y-4 shadow-xl animate-fadeIn">
                        {/* Title & 4 Metrics */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-purple-500/20">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center font-black text-sm">
                              AI
                            </div>
                            <div>
                              <h5 className="text-sm font-black text-purple-200">
                                Báo Cáo Chấm Phát Âm Chuẩn ETS (Câu {currentSentence.index})
                              </h5>
                              <p className="text-[11px] text-slate-400">
                                Phân tích phổ âm học, trọng âm và nối từ
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs text-purple-300 font-bold">Điểm tổng câu:</span>
                            <span className="px-3 py-1 rounded-xl bg-purple-600 text-white font-black text-base shadow-sm">
                              {currentSentenceAi.overall_score || 0}/100
                            </span>
                          </div>
                        </div>

                        {/* 3 Metric Cards */}
                        <div className="grid grid-cols-3 gap-2.5 text-center">
                          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                            <div className="text-[10px] text-slate-400 font-bold uppercase">Phát Âm</div>
                            <div className="text-lg font-black text-emerald-400">
                              {currentSentenceAi.pronunciation_score || 0}%
                            </div>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                            <div className="text-[10px] text-slate-400 font-bold uppercase">Trọng Âm</div>
                            <div className="text-lg font-black text-sky-400">
                              {currentSentenceAi.stress_score || 0}%
                            </div>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                            <div className="text-[10px] text-slate-400 font-bold uppercase">Độ Lưu Loát</div>
                            <div className="text-lg font-black text-amber-400">
                              {currentSentenceAi.fluency_score || 0}%
                            </div>
                          </div>
                        </div>

                        {/* Intonation Analysis */}
                        {currentSentenceAi.intonation_analysis && (
                          <div className="p-3.5 rounded-xl bg-sky-950/30 border border-sky-800/40 space-y-1">
                            <div className="text-xs font-black text-sky-300 flex items-center gap-1.5">
                              <Activity className="w-3.5 h-3.5 text-sky-400" />
                              <span>Ngữ Điệu & Cao Độ (Intonation Contour):</span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              {currentSentenceAi.intonation_analysis}
                            </p>
                          </div>
                        )}

                        {/* Words Breakdown Grid */}
                        {currentSentenceAi.words_analysis && currentSentenceAi.words_analysis.length > 0 && (
                          <div className="space-y-2">
                            <div className="text-xs font-black text-slate-300 flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                              <span>Chi tiết từng từ trong câu:</span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                              {currentSentenceAi.words_analysis.map((w, wIdx) => {
                                const isCorrect = w.status === 'correct';
                                return (
                                  <div
                                    key={wIdx}
                                    className={`p-2 rounded-xl text-left border ${
                                      isCorrect
                                        ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-200'
                                        : 'bg-rose-950/40 border-rose-800/50 text-rose-200'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between text-xs font-black">
                                      <span>{w.word}</span>
                                      <span>{isCorrect ? '✓' : '✗'}</span>
                                    </div>
                                    {w.target_ipa && (
                                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                                        {w.target_ipa}
                                      </div>
                                    )}
                                    {w.error_detail && (
                                      <div className="text-[10px] text-rose-300 font-medium mt-1 leading-tight">
                                        {w.error_detail}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Pronunciation & Stress Errors (if any) */}
                        {((currentSentenceAi.pronunciation_errors && currentSentenceAi.pronunciation_errors.length > 0) ||
                          (currentSentenceAi.stress_errors && currentSentenceAi.stress_errors.length > 0)) && (
                          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 space-y-2">
                            <div className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                              <span>Các điểm cần sửa khẩu hình & trọng âm:</span>
                            </div>
                            <div className="space-y-1.5 text-xs text-slate-300">
                              {currentSentenceAi.pronunciation_errors?.map((err, eIdx) => (
                                <div key={eIdx} className="bg-slate-900/60 p-2 rounded-lg">
                                  <span className="font-bold text-amber-200">Từ "{err.word}": </span>
                                  <span>{err.issue} → </span>
                                  <span className="text-emerald-300 font-medium">{err.fix}</span>
                                </div>
                              ))}
                              {currentSentenceAi.stress_errors?.map((err, eIdx) => (
                                <div key={eIdx} className="bg-slate-900/60 p-2 rounded-lg">
                                  <span className="font-bold text-sky-200">Trọng âm "{err.word}": </span>
                                  <span>{err.issue} → </span>
                                  <span className="text-emerald-300 font-medium">{err.fix}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Coach Feedback & Native Pacing */}
                        {currentSentenceAi.coach_feedback && (
                          <div className="p-3 rounded-xl bg-purple-900/30 border border-purple-800/30 text-xs text-purple-200 leading-relaxed">
                            <span className="font-black text-purple-300">💡 Huấn luyện viên nhận xét: </span>
                            {currentSentenceAi.coach_feedback}
                          </div>
                        )}

                        {currentSentenceAi.native_pacing_tip && (
                          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/30 text-xs text-emerald-200 leading-relaxed">
                            <span className="font-black text-emerald-300">🎙️ Mẹo nối âm người bản xứ: </span>
                            {currentSentenceAi.native_pacing_tip}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Continuous Exam Status Banner */}
                {isContinuousExam && (
                  <div className="p-4 rounded-2xl bg-indigo-950 border border-indigo-700/60 text-center space-y-2 animate-pulse">
                    <div className="text-xs font-black text-indigo-300 uppercase tracking-widest">
                      CHẾ ĐỘ THI LIÊN TỤC (EXAM RUNNER)
                    </div>
                    <div className="text-sm font-bold text-white">
                      {continuousExamPhase === 'listening' && '🔊 Đang phát âm câu mẫu... Hãy chú ý lắng nghe!'}
                      {continuousExamPhase === 'speaking' && `🎙️ HÃY NHẮC LẠI NGAY! (Còn ${countdownSeconds}s)`}
                      {continuousExamPhase === 'feedback' && '✨ Hoàn tất câu này, chuẩn bị chuyển sang câu tiếp theo...'}
                    </div>
                    <div className="flex justify-center pt-1">
                      <button
                        onClick={() => {
                          setIsContinuousExam(false);
                          stopRecording();
                          stopAudio();
                        }}
                        className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer transition-all"
                      >
                        Dừng chế độ thi
                      </button>
                    </div>
                  </div>
                )}

                {/* Bottom Step Navigators & Action to grade full test */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
                  <button
                    onClick={handlePrevSentence}
                    disabled={activeSentenceIndex === 0}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-bold text-xs hover:bg-slate-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Câu trước</span>
                  </button>

                  {/* Button to grade all 7 sentences */}
                  <button
                    onClick={handleEvaluateFullTest}
                    disabled={isEvaluatingFullTest}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isEvaluatingFullTest ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Đang chấm 7 câu...</span>
                      </>
                    ) : (
                      <>
                        <Trophy className="w-4 h-4 text-amber-300" />
                        <span>Chấm Điểm Toàn Bộ 7 Câu Bằng AI</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleNextSentence}
                    disabled={activeSentenceIndex === activePractice.sentences.length - 1}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-black text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span>Câu tiếp theo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
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
                  <option value="starred">Đã luyện xong (⭐)</option>
                  <option value="unstarred">Chưa hoàn thành</option>
                </select>
              ) : (
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
                >
                  <option value="all">Tất cả độ dài (Level 1-3)</option>
                  <option value="1">Level 1 (4-6 từ - Ngắn)</option>
                  <option value="2">Level 2 (7-11 từ - Vừa)</option>
                  <option value="3">Level 3 (12-25 từ - Dài)</option>
                </select>
              )}
            </div>

            {/* View Switcher: 87 Practices vs 609 Sentences */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold shrink-0">
              <button
                onClick={() => setActiveView('practices')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeView === 'practices'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>87 Đề Thực Hành</span>
              </button>
              <button
                onClick={() => setActiveView('sentences')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
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
                          <span>Vào luyện ngay</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
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
                            navigateToSentence(sent.sentence_index - 1);
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

      {/* ========================================================================= */}
      {/* 4. MODAL: FULL 7-SENTENCE AI EVALUATION REPORT */}
      {/* ========================================================================= */}
      {isFullReportModalOpen && fullTestAiReport && activePractice && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 space-y-6 p-6 sm:p-8">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 text-[11px] font-black uppercase">
                    BÁO CÁO GIÁM KHẢO ETS 2026
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold">
                    Practice {activePractice.practice_number}
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Kết Quả Chấm Điểm AI: {activePractice.title}
                </h3>
              </div>

              <button
                onClick={() => setIsFullReportModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Hero Scaled Score Box */}
            <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white rounded-2xl p-6 sm:p-7 relative overflow-hidden shadow-lg">
              <div className="absolute right-0 top-0 w-60 h-60 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left items-center">
                <div className="space-y-1">
                  <div className="text-xs uppercase font-extrabold text-purple-300 tracking-wider">
                    Điểm Task 1 (Quy đổi 30)
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-amber-300">
                    {fullTestAiReport.score_30 || 25}
                    <span className="text-xl text-slate-400 font-bold"> / 30</span>
                  </div>
                  <div className="text-xs text-slate-300 font-semibold">
                    Thang điểm chuẩn TOEFL iBT
                  </div>
                </div>

                <div className="space-y-1 sm:border-x sm:border-white/10 sm:px-6">
                  <div className="text-xs uppercase font-extrabold text-sky-300 tracking-wider">
                    TOEFL Speaking Band
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-300">
                    Band {fullTestAiReport.toefl_band_6 ? Number(fullTestAiReport.toefl_band_6).toFixed(1) : '5.0'}
                  </div>
                  <div className="text-xs text-slate-300 font-semibold">
                    Thang điểm 6.0 mới ETS 2026
                  </div>
                </div>

                <div className="space-y-1 sm:pl-4">
                  <div className="text-xs uppercase font-extrabold text-emerald-300 tracking-wider">
                    Độ chuẩn xác âm học
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-sky-300">
                    {fullTestAiReport.accuracy_percentage || 85}%
                  </div>
                  <div className="text-xs text-slate-300 font-semibold">
                    Tỷ lệ khớp phụ âm & ngữ điệu
                  </div>
                </div>
              </div>
            </div>

            {/* Rubric Breakdown (3 Core Criteria) */}
            {fullTestAiReport.rubric_breakdown && (
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-purple-600" />
                  <span>3 Tiêu Chí Chấm Điểm Âm Học ETS:</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-black">
                      <span className="text-slate-700">Độ Rõ Âm Tiết</span>
                      <span className="text-purple-700">{fullTestAiReport.rubric_breakdown.acoustic_clarity?.score}/5.0</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {fullTestAiReport.rubric_breakdown.acoustic_clarity?.feedback}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-black">
                      <span className="text-slate-700">Trọng Âm & Ngữ Điệu</span>
                      <span className="text-sky-700">{fullTestAiReport.rubric_breakdown.stress_intonation?.score}/5.0</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {fullTestAiReport.rubric_breakdown.stress_intonation?.feedback}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-black">
                      <span className="text-slate-700">Trí Nhớ Thính Giác</span>
                      <span className="text-emerald-700">{fullTestAiReport.rubric_breakdown.working_memory_recall?.score}/5.0</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {fullTestAiReport.rubric_breakdown.working_memory_recall?.feedback}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Level Breakdown (L1, L2, L3) */}
            {fullTestAiReport.level_breakdown && (
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-sky-600" />
                  <span>Hiệu Suất Theo 3 Cấp Độ Câu:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                    <div className="flex items-center justify-between text-xs font-black text-emerald-900">
                      <span>Level 1 (Câu ngắn)</span>
                      <span>{fullTestAiReport.level_breakdown.level_1?.score}%</span>
                    </div>
                    <div className="text-[11px] font-bold text-emerald-700">
                      {fullTestAiReport.level_breakdown.level_1?.status}
                    </div>
                    <p className="text-[11px] text-emerald-800 leading-relaxed">
                      {fullTestAiReport.level_breakdown.level_1?.feedback}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 space-y-1">
                    <div className="flex items-center justify-between text-xs font-black text-sky-900">
                      <span>Level 2 (Câu vừa)</span>
                      <span>{fullTestAiReport.level_breakdown.level_2?.score}%</span>
                    </div>
                    <div className="text-[11px] font-bold text-sky-700">
                      {fullTestAiReport.level_breakdown.level_2?.status}
                    </div>
                    <p className="text-[11px] text-sky-800 leading-relaxed">
                      {fullTestAiReport.level_breakdown.level_2?.feedback}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                    <div className="flex items-center justify-between text-xs font-black text-amber-900">
                      <span>Level 3 (Câu dài)</span>
                      <span>{fullTestAiReport.level_breakdown.level_3?.score}%</span>
                    </div>
                    <div className="text-[11px] font-bold text-amber-700">
                      {fullTestAiReport.level_breakdown.level_3?.status}
                    </div>
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      {fullTestAiReport.level_breakdown.level_3?.feedback}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Sentence Details List */}
            {fullTestAiReport.sentence_details && fullTestAiReport.sentence_details.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Chi Tiết Đánh Giá Cả 7 Câu:</span>
                </h4>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {fullTestAiReport.sentence_details.map((sd, sIdx) => {
                    const originalSentence = activePractice.sentences?.[sIdx];
                    const rec = practiceRecordings[sIdx];
                    return (
                      <div
                        key={sIdx}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between font-black">
                          <span className="text-sky-800">
                            Câu {sd.index || sIdx + 1} ({originalSentence?.word_count} từ):
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white text-slate-800 border border-slate-200">
                            Điểm: {sd.score}%
                          </span>
                        </div>
                        <div className="text-slate-800 font-semibold">
                          Gốc: "{originalSentence?.text}"
                        </div>
                        {rec?.userTranscript && (
                          <div className="text-slate-600">
                            Bạn nói: <span className="italic">"{rec.userTranscript}"</span>
                          </div>
                        )}
                        <p className="text-purple-800 font-medium">
                          Nhận xét: {sd.feedback}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Recurring Phonetic Issues & Strengths */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fullTestAiReport.key_strengths && (
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                  <div className="text-xs font-black text-emerald-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Điểm Mạnh Ghi Nhận:</span>
                  </div>
                  <ul className="text-xs text-emerald-800 space-y-1 list-disc pl-4">
                    {fullTestAiReport.key_strengths.map((str, idx) => (
                      <li key={idx}>{str}</li>
                    ))}
                  </ul>
                </div>
              )}

              {fullTestAiReport.recurring_phonetic_issues && (
                <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 space-y-2">
                  <div className="text-xs font-black text-rose-900 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Các Lỗi Cần Khắc Phục:</span>
                  </div>
                  <ul className="text-xs text-rose-800 space-y-1 list-disc pl-4">
                    {fullTestAiReport.recurring_phonetic_issues.map((iss, idx) => (
                      <li key={idx}>{iss}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Coach Recommendation */}
            {fullTestAiReport.coach_recommendation && (
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-1.5">
                <div className="text-xs font-black text-purple-900 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-purple-600" />
                  <span>Lời Khuyên Chiến Lược Từ Trưởng Ban Giám Khảo ETS:</span>
                </div>
                <p className="text-xs text-purple-800 leading-relaxed">
                  {fullTestAiReport.coach_recommendation}
                </p>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  handleToggleStar(activePractice.practice_number);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                  starredPractices[activePractice.practice_number]
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-amber-400'
                }`}
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
                    ? 'Đã đánh dấu hoàn thành ⭐'
                    : 'Đánh dấu sao hoàn thành đề này'}
                </span>
              </button>

              <button
                onClick={() => setIsFullReportModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
              >
                Đóng Báo Cáo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
