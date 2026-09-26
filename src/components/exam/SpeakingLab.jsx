import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  ChevronLeft,
  Filter,
  Search,
  Shuffle,
  Bookmark,
  BookmarkCheck,
  Eye,
  EyeOff,
  UploadCloud,
  Headphones,
  Check,
  X,
  FastForward,
  BookOpen,
  ArrowRight,
  HelpCircle,
  FileText,
  Edit3,
  Save,
  Copy,
  Trash2
} from 'lucide-react';
import SPEAKING_REPEAT_BANK from '../../data/speakingRepeatData.js';
import SPEAKING_45S_BANK from '../../data/speaking45sData.js';
import {
  getSpeakingRepeatBank,
  getSpeaking45sBank,
  seedSpeakingLabToSupabase,
  saveSpeakingPracticeHistory,
  isSupabaseConfigured
} from '../../lib/supabase.js';
import {
  getGeminiApiKey,
  evaluateSpeakingTest,
  evaluateSentencePronunciationAndStress,
  analyzeAndEnrichCustomSpeakingSample
} from '../../lib/gemini.js';

// Âm thanh tiếng bíp chuẩn phòng thi ETS
function playExamBeep(freq = 650, duration = 300) {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration / 1000);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration / 1000);
  } catch (e) {
    // Ignore autoplay policy restrictions
  }
}

export default function SpeakingLab() {
  const [activeTab, setActiveTab] = useState('repeat'); // 'repeat' | '45s'

  // Data banks
  const [repeatBank, setRepeatBank] = useState(SPEAKING_REPEAT_BANK);
  const [tasks45sBank, setTasks45sBank] = useState(SPEAKING_45S_BANK);
  const [isCloudLoading, setIsCloudLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState('');

  // Tải dữ liệu ưu tiên từ Supabase khi mở component
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      if (isSupabaseConfigured()) {
        try {
          setIsCloudLoading(true);
          const [repData, t45Data] = await Promise.all([
            getSpeakingRepeatBank(),
            getSpeaking45sBank()
          ]);
          if (isMounted) {
            if (repData && repData.length > 0) setRepeatBank(repData);
            if (t45Data && t45Data.length > 0) setTasks45sBank(t45Data);
          }
        } catch (e) {
          console.warn('Lỗi khi tải dữ liệu Speaking Lab từ Cloud:', e);
        } finally {
          if (isMounted) setIsCloudLoading(false);
        }
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, []);

  // Nút đồng bộ nhanh lên Supabase
  const handleQuickSyncToCloud = async () => {
    if (!isSupabaseConfigured()) {
      alert('Vui lòng cấu hình Supabase URL và Key trong Cài đặt trước khi đồng bộ!');
      return;
    }
    try {
      setSyncStatus('Đang đồng bộ 1,000 câu + 50 đề 45s lên Supabase...');
      const res = await seedSpeakingLabToSupabase((msg) => setSyncStatus(msg));
      if (res && res.success) {
        setSyncStatus(`✓ Đã nạp thành công 1,000 câu & 50 đề 45s lên Supabase!`);
      } else {
        setSyncStatus('Lỗi: ' + (res?.error || 'Không thể đồng bộ'));
      }
      setTimeout(() => setSyncStatus(''), 4500);
    } catch (err) {
      alert('Lỗi đồng bộ: ' + err.message);
      setSyncStatus('');
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Trung tâm Luyện Nói Chuyên Sâu */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Glow decorations */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-40 h-40 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-3 tracking-wide">
              <Mic className="w-3.5 h-3.5 text-emerald-300" />
              <span>TOEFL SPEAKING MASTERY LAB</span>
              {isCloudLoading && <span className="text-[10px] text-teal-200 animate-pulse">(Đang nạp Cloud...)</span>}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
              Phòng Luyện Nói Chuyên Sâu Chuẩn ETS
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl leading-relaxed">
              Rèn luyện toàn diện với <strong>1,000 câu Listen & Repeat</strong> (nhại giọng, phản xạ ngữ điệu, ghi âm đối chiếu STT) và <strong>50 đề thi 45s Independent Speaking</strong> bao trọn 6 chủ đề kèm bài mẫu 26–30 điểm.
            </p>
          </div>

          {/* Nút đồng bộ Cloud */}
          <div className="shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
            <button
              onClick={handleQuickSyncToCloud}
              className="px-4 py-2.5 bg-emerald-700/80 hover:bg-emerald-600 border border-emerald-400/40 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
              title="Đẩy 1,000 câu Listen & Repeat và 50 đề 45s lên cơ sở dữ liệu Supabase"
            >
              <UploadCloud className="w-4 h-4 text-emerald-200" />
              <span>Đồng bộ lên Database</span>
            </button>
          </div>
        </div>

        {syncStatus && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-medium flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>{syncStatus}</span>
          </div>
        )}

        {/* Sub-Tabs Switcher */}
        <div className="mt-7 pt-5 border-t border-emerald-800/60 flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab('repeat')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2.5 ${
              activeTab === 'repeat'
                ? 'bg-white text-emerald-950 shadow-lg scale-102 ring-2 ring-emerald-300'
                : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800/80 border border-emerald-700/50'
            }`}
          >
            <Headphones className="w-4 h-4" />
            <span>1. Listen and Repeat (1,000 Câu Chuẩn)</span>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
              activeTab === 'repeat' ? 'bg-emerald-100 text-emerald-900' : 'bg-emerald-950 text-emerald-300'
            }`}>
              {repeatBank.length} items
            </span>
          </button>

          <button
            onClick={() => setActiveTab('45s')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2.5 ${
              activeTab === '45s'
                ? 'bg-white text-emerald-950 shadow-lg scale-102 ring-2 ring-emerald-300'
                : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800/80 border border-emerald-700/50'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>2. Câu Hỏi Trả Lời 45s (ETS Topics & Samples)</span>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
              activeTab === '45s' ? 'bg-emerald-100 text-emerald-900' : 'bg-emerald-950 text-emerald-300'
            }`}>
              {tasks45sBank.length} đề thi
            </span>
          </button>
        </div>
      </div>

      {/* 2. Nội dung chi tiết từng phân hệ */}
      {activeTab === 'repeat' ? (
        <ListenAndRepeatLab bank={repeatBank} />
      ) : (
        <IndependentSpeakingStudio bank={tasks45sBank} />
      )}
    </div>
  );
}

// =========================================================================
// PHÂN HỆ 1: LISTEN AND REPEAT LAB (1,000 CÂU CHUẨN TOEFL ETS)
// =========================================================================
function ListenAndRepeatLab({ bank }) {
  // Lọc & Tìm kiếm
  const [levelFilter, setLevelFilter] = useState('all'); // 'all' | '1' | '2' | '3'
  const [topicFilter, setTopicFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [starredOnly, setStarredOnly] = useState(false);
  const [starredIds, setStarredIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('toefl_repeat_starred') || '[]');
    } catch {
      return [];
    }
  });

  // Tốc độ phát âm
  const [speechRate, setSpeechRate] = useState(1.0); // 0.85 | 1.0 | 1.15
  const [showText, setShowText] = useState(true);
  const [showIpa, setShowIpa] = useState(true);
  const [showMeaning, setShowMeaning] = useState(true);

  // Danh sách đã lọc
  const filteredList = useMemo(() => {
    return bank.filter((item) => {
      if (levelFilter !== 'all' && String(item.level) !== String(levelFilter)) return false;
      if (topicFilter !== 'all' && item.topic !== topicFilter) return false;
      if (starredOnly && !starredIds.includes(item.id)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchText = item.text.toLowerCase().includes(q);
        const matchVi = (item.meaning_vi || '').toLowerCase().includes(q);
        const matchCat = (item.category || '').toLowerCase().includes(q);
        if (!matchText && !matchVi && !matchCat) return false;
      }
      return true;
    });
  }, [bank, levelFilter, topicFilter, starredOnly, starredIds, searchQuery]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = filteredList[currentIndex] || filteredList[0] || bank[0];

  // Trạng thái thu âm & phát âm
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [userAudioUrl, setUserAudioUrl] = useState(null);
  const [speechTranscript, setSpeechTranscript] = useState('');
  const [accuracyScore, setAccuracyScore] = useState(null);

  // Trạng thái Chấm phát âm & Nhấn âm bằng AI
  const [isAiEvaluating, setIsAiEvaluating] = useState(false);
  const [aiEvaluationResult, setAiEvaluationResult] = useState(null);
  const [aiEvaluationError, setAiEvaluationError] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const speechRecognizerRef = useRef(null);
  const timerRef = useRef(null);

  // Bookmark câu khó
  const toggleStar = (id) => {
    setStarredIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem('toefl_repeat_starred', JSON.stringify(next));
      return next;
    });
  };

  // Reset khi đổi câu
  useEffect(() => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    stopUserRecording(false);
    setUserAudioUrl(null);
    setSpeechTranscript('');
    setAccuracyScore(null);
    setAiEvaluationResult(null);
    setAiEvaluationError(null);
    setIsAiEvaluating(false);
  }, [currentIndex, currentItem?.id]);

  // Clean-up khi unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      stopUserRecording(false);
    };
  }, []);

  // 1. Phát âm câu mẫu (Web Speech API)
  const handlePlaySample = () => {
    if (!currentItem || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setIsPlayingAudio(true);

    const utterance = new SpeechSynthesisUtterance(currentItem.text);
    utterance.lang = 'en-US';
    utterance.rate = speechRate;

    const voices = window.speechSynthesis.getVoices();
    const usVoice = voices.find(
      (v) => v.lang === 'en-US' && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha'))
    );
    if (usVoice) utterance.voice = usVoice;

    utterance.onend = () => {
      setIsPlayingAudio(false);
    };
    utterance.onerror = () => {
      setIsPlayingAudio(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // 2. Bắt đầu thu âm giọng người học & kích hoạt STT
  const startUserRecording = async () => {
    try {
      setUserAudioUrl(null);
      setSpeechTranscript('');
      setAccuracyScore(null);

      // Kích hoạt Micro
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setUserAudioUrl(url);
        stream.getTracks().forEach((t) => t.stop());
      };

      recorder.start();
      setIsRecording(true);
      setRecordSeconds(0);
      playExamBeep(700, 200);

      // Bộ đếm giây
      timerRef.current = setInterval(() => {
        setRecordSeconds((p) => p + 1);
      }, 1000);

      // Khởi động SpeechRecognition (Nhận diện giọng nói STT)
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognizer = new SpeechRecognition();
        recognizer.lang = 'en-US';
        recognizer.continuous = false;
        recognizer.interimResults = false;

        recognizer.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setSpeechTranscript(transcript);
          evaluateAccuracy(transcript, currentItem.text);
        };

        recognizer.onerror = (err) => {
          console.warn('SpeechRecognition error:', err);
        };

        recognizer.start();
        speechRecognizerRef.current = recognizer;
      }
    } catch (err) {
      alert('Không thể truy cập Microphone: ' + err.message);
      setIsRecording(false);
    }
  };

  // 3. Dừng thu âm
  const stopUserRecording = (playSound = true) => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (speechRecognizerRef.current) {
      try { speechRecognizerRef.current.stop(); } catch (e) {}
    }
    setIsRecording(false);
    if (playSound) playExamBeep(450, 250);
  };

  // 4. So khớp độ chính xác giữa giọng đọc của người học và câu gốc
  const evaluateAccuracy = (spokenText, originalText) => {
    if (!spokenText || !originalText) return;
    const cleanOrig = originalText.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().split(/\s+/);
    const cleanSpok = spokenText.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().split(/\s+/);

    let matchCount = 0;
    cleanOrig.forEach((word) => {
      if (cleanSpok.includes(word)) matchCount++;
    });

    const percent = Math.min(100, Math.round((matchCount / cleanOrig.length) * 100));
    setAccuracyScore(percent);

    // Lưu vào lịch sử
    saveSpeakingPracticeHistory({
      type: 'repeat',
      itemId: currentItem.id,
      text: currentItem.text,
      accuracy: percent,
      audioDuration: recordSeconds
    });
  };

  // 5. Chấm Phát Âm & Nhấn Trọng Âm bằng AI (Gemini Acoustic & Phonetic Analysis)
  const handleAiSentenceEvaluation = async () => {
    if (!userAudioUrl) {
      alert('Vui lòng đọc và ghi âm câu trước khi bấm chấm điểm bằng AI!');
      return;
    }

    try {
      setIsAiEvaluating(true);
      setAiEvaluationError(null);

      const result = await evaluateSentencePronunciationAndStress({
        targetSentence: currentItem.text,
        targetIpa: currentItem.ipa,
        meaningVi: currentItem.meaning_vi,
        audioUrl: userAudioUrl,
        spokenTranscript: speechTranscript,
        durationSeconds: recordSeconds
      });

      setAiEvaluationResult(result);

      // Lưu kết quả chấm AI vào lịch sử
      saveSpeakingPracticeHistory({
        type: 'repeat_ai_audit',
        itemId: currentItem.id,
        text: currentItem.text,
        accuracy: result.overall_score || result.pronunciation_score || 85,
        aiFeedback: result,
        audioDuration: recordSeconds
      });
    } catch (err) {
      console.error('Lỗi khi chấm AI phát âm:', err);
      setAiEvaluationError(err.message || 'Không thể kết nối với dịch vụ AI. Vui lòng kiểm tra API Key.');
    } finally {
      setIsAiEvaluating(false);
    }
  };

  // Điều hướng
  const handleNext = () => {
    if (currentIndex < filteredList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleShuffle = () => {
    const randomIdx = Math.floor(Math.random() * filteredList.length);
    setCurrentIndex(randomIdx);
  };

  const isStarred = currentItem ? starredIds.includes(currentItem.id) : false;

  return (
    <div className="space-y-5">
      {/* Thanh Bộ Lọc & Tìm Kiếm */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Lọc theo Cấp độ */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-700">
            <span className="px-2 py-0.5 text-slate-400">Level:</span>
            {[
              { id: 'all', label: 'Tất cả' },
              { id: '1', label: 'Level 1 (Dễ)' },
              { id: '2', label: 'Level 2 (Trung)' },
              { id: '3', label: 'Level 3 (Khó)' }
            ].map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => { setLevelFilter(lvl.id); setCurrentIndex(0); }}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  levelFilter === lvl.id
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'hover:bg-slate-200 text-slate-600'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>

          {/* Lọc theo Chủ đề */}
          <select
            value={topicFilter}
            onChange={(e) => { setTopicFilter(e.target.value); setCurrentIndex(0); }}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white cursor-pointer"
          >
            <option value="all">Mọi chủ đề (Campus & Science)</option>
            <option value="Campus Life">Campus Life (Đời sống trường học)</option>
            <option value="Natural Sciences">Natural Sciences (Khoa học tự nhiên)</option>
            <option value="Social Sciences">Social Sciences (Khoa học xã hội)</option>
            <option value="Arts & Humanities">Arts & Humanities (Nghệ thuật & Lịch sử)</option>
          </select>

          {/* Lọc câu đã gắn sao */}
          <button
            onClick={() => { setStarredOnly(!starredOnly); setCurrentIndex(0); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              starredOnly
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${starredOnly ? 'fill-amber-600 text-amber-600' : ''}`} />
            <span>Câu khó ({starredIds.length})</span>
          </button>
        </div>

        {/* Tìm kiếm & Xáo trộn */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm từ khóa..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentIndex(0); }}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            onClick={handleShuffle}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all cursor-pointer"
            title="Ngẫu nhiên chọn một câu"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Thẻ Luyện Nói Chính (Interactive Flash Card) */}
      {currentItem ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Header Card: Vị trí, Chủ đề, Nút lưu sao */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                CÂU {currentIndex + 1} / {filteredList.length}
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                {currentItem.topic}
              </span>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                {currentItem.category}
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                Level {currentItem.level} ({currentItem.word_count} từ)
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Nút bật tắt hiển thị chữ để tự thử thách */}
              <button
                onClick={() => setShowText(!showText)}
                className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  showText
                    ? 'bg-slate-100 text-slate-700 border-slate-200'
                    : 'bg-amber-100 text-amber-900 border-amber-300'
                }`}
                title={showText ? 'Bấm để ẩn chữ (Luyện nghe phản xạ như thi thật)' : 'Bấm để hiện chữ'}
              >
                {showText ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{showText ? 'Đang hiện chữ' : 'Đang ẩn chữ (Thi thật)'}</span>
              </button>

              <button
                onClick={() => toggleStar(currentItem.id)}
                className={`p-2 rounded-xl transition-all cursor-pointer border ${
                  isStarred
                    ? 'bg-amber-100 text-amber-700 border-amber-300 shadow-2xs'
                    : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-amber-500'
                }`}
                title={isStarred ? 'Bỏ lưu câu khó' : 'Lưu vào danh sách câu khó'}
              >
                <Bookmark className={`w-4 h-4 ${isStarred ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Vùng Câu Nói Tiếng Anh & Phiên Âm */}
          <div className="py-4 text-center space-y-3">
            {showText ? (
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug tracking-tight max-w-3xl mx-auto">
                {currentItem.text}
              </h2>
            ) : (
              <div className="py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300 max-w-xl mx-auto text-slate-500 text-sm">
                <Headphones className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="font-bold text-slate-800">Chế độ Nghe Phản Xạ Ẩn Chữ (Exam Mode)</p>
                <p className="text-xs text-slate-400 mt-1">Bấm nút "Nghe câu mẫu" bên dưới để nghe người bản xứ đọc, sau đó bấm Micro để lặp lại!</p>
              </div>
            )}

            {showText && showIpa && currentItem.ipa && (
              <p className="text-sm sm:text-base font-mono text-emerald-700 font-medium">
                {currentItem.ipa}
              </p>
            )}

            {showText && showMeaning && currentItem.meaning_vi && (
              <p className="text-xs sm:text-sm text-slate-500 italic max-w-2xl mx-auto">
                "{currentItem.meaning_vi}"
              </p>
            )}
          </div>

          {/* Bảng Điều Khiển Âm Thanh: Nghe Bản Xứ & Thu Âm Giọng Học Viên & AI Chấm */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Cụm 1: Nghe Câu Mẫu */}
            <div className="flex items-center gap-2.5 w-full lg:w-auto justify-center">
              <button
                onClick={handlePlaySample}
                disabled={isPlayingAudio || isRecording}
                className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 shadow-sm ${
                  isPlayingAudio
                    ? 'bg-blue-600 text-white animate-pulse'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white active:scale-95'
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>{isPlayingAudio ? 'Đang phát âm...' : '1. Nghe câu mẫu (Native)'}</span>
              </button>

              {/* Chỉnh tốc độ */}
              <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 text-xs font-bold text-slate-600">
                {[0.85, 1.0, 1.15].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setSpeechRate(rate)}
                    className={`px-2 py-0.5 rounded-lg cursor-pointer transition-all ${
                      speechRate === rate ? 'bg-slate-800 text-white' : 'hover:bg-slate-100'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>

            {/* Cụm 2: Nút Thu Âm Micro */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-center">
              {!isRecording ? (
                <button
                  onClick={startUserRecording}
                  disabled={isPlayingAudio}
                  className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm shadow-sm transition-all cursor-pointer active:scale-95 flex items-center gap-2"
                >
                  <Mic className="w-4 h-4" />
                  <span>2. Bắt đầu đọc lại (Ghi âm)</span>
                </button>
              ) : (
                <button
                  onClick={() => stopUserRecording(true)}
                  className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-black text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 animate-pulse"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span>Dừng thu âm ({recordSeconds}s)</span>
                </button>
              )}
            </div>

            {/* Cụm 3: Nút Chấm bằng AI (Phát âm & Nhấn âm) */}
            <div className="flex items-center gap-2 w-full lg:w-auto justify-center">
              <button
                onClick={handleAiSentenceEvaluation}
                disabled={isAiEvaluating || !userAudioUrl}
                className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm ${
                  !userAudioUrl
                    ? 'bg-slate-200 text-slate-400 border border-slate-300/60 cursor-not-allowed'
                    : isAiEvaluating
                    ? 'bg-purple-800 text-white animate-pulse cursor-wait'
                    : 'bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 hover:from-purple-600 hover:to-indigo-600 text-white cursor-pointer active:scale-95 shadow-purple-900/20 ring-2 ring-purple-300'
                }`}
                title={userAudioUrl ? 'Nhờ AI phân tích chi tiết lỗi phát âm và nhấn trọng âm' : 'Vui lòng đọc và ghi âm trước khi nhờ AI chấm'}
              >
                <Sparkles className={`w-4 h-4 ${userAudioUrl ? 'text-amber-300' : 'text-slate-400'}`} />
                <span>{isAiEvaluating ? 'AI đang phân tích...' : '3. Chấm bằng AI (Phát âm & Nhấn âm)'}</span>
              </button>
            </div>
          </div>

          {/* Vùng Hiển Thị Kết Quả Đọc Lại & So Sánh STT */}
          {(userAudioUrl || accuracyScore !== null || speechTranscript) && (
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
                <span className="text-xs font-black text-emerald-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>KẾT QUẢ GHI ÂM CỦA BẠN</span>
                </span>

                <div className="flex items-center gap-2">
                  {accuracyScore !== null && (
                    <span className={`text-xs font-black px-3 py-1 rounded-full border shadow-2xs ${
                      accuracyScore >= 85
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : accuracyScore >= 60
                        ? 'bg-amber-500 text-white border-amber-600'
                        : 'bg-rose-500 text-white border-rose-600'
                    }`}>
                      Độ chính xác: {accuracyScore}% {accuracyScore >= 85 ? '🌟 Xuất sắc!' : accuracyScore >= 60 ? '👍 Khá tốt' : '💪 Cần luyện thêm'}
                    </span>
                  )}

                  {!aiEvaluationResult && (
                    <button
                      onClick={handleAiSentenceEvaluation}
                      disabled={isAiEvaluating}
                      className="px-3 py-1 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>{isAiEvaluating ? 'Đang chấm...' : 'Chấm chi tiết bằng AI'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Nghe lại file ghi âm của học viên */}
              {userAudioUrl && (
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <span className="text-xs font-bold text-slate-700">Nghe lại giọng đọc của bạn:</span>
                  <audio src={userAudioUrl} controls className="h-9 w-full sm:w-72" />
                  <button
                    onClick={handlePlaySample}
                    className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
                  >
                    Nghe lại câu mẫu để so sánh ➔
                  </button>
                </div>
              )}

              {/* Transcription nhận diện giọng nói */}
              {speechTranscript && (
                <div className="bg-white rounded-xl p-3 border border-emerald-200/80 text-xs">
                  <span className="text-slate-400 block mb-1 font-bold">Hệ thống nhận diện giọng nói (STT):</span>
                  <p className="text-slate-800 font-semibold text-sm">
                    "{speechTranscript}"
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Vùng Loading khi AI đang chấm */}
          {isAiEvaluating && (
            <div className="bg-purple-50/90 border border-purple-200 rounded-3xl p-6 text-center space-y-3 animate-pulse">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-700 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6 animate-spin text-purple-600" />
              </div>
              <h4 className="font-extrabold text-sm text-purple-950">
                AI đang lắng nghe và phân tích âm vị, trọng âm và ngữ điệu câu...
              </h4>
              <p className="text-xs text-purple-700 max-w-md mx-auto">
                Hệ thống chuyên gia ngữ âm ETS đang bóc tách từng từ, kiểm tra trọng âm (stress), âm đuôi (ending sounds) và độ nối âm tự nhiên.
              </p>
            </div>
          )}

          {/* Báo lỗi nếu AI chấm thất bại */}
          {aiEvaluationError && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs text-rose-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{aiEvaluationError}</span>
              </div>
              <button
                onClick={handleAiSentenceEvaluation}
                className="px-3 py-1 bg-rose-700 text-white rounded-lg font-bold text-xs cursor-pointer hover:bg-rose-800"
              >
                Thử lại
              </button>
            </div>
          )}

          {/* BÁO CÁO PHÂN TÍCH CHI TIẾT TỪ AI (PHÁT ÂM & NHẤN TRỌNG ÂM) */}
          {aiEvaluationResult && (
            <div className="bg-gradient-to-br from-purple-50/70 via-white to-indigo-50/70 border-2 border-purple-200 rounded-3xl p-6 shadow-xs space-y-5 animate-fadeIn">
              {/* Header & Điểm Tổng Kết */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-100 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-300 text-xs font-black uppercase mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                    <span>KẾT QUẢ PHÂN TÍCH PHÁT ÂM & TRỌNG ÂM AI (ETS COACH)</span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Báo Cáo Chi Tiết Âm Vị & Nhấn Âm
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block font-medium">Điểm Tổng Thể</span>
                  <span className={`text-xl font-black px-3.5 py-1 rounded-xl border inline-block shadow-2xs ${
                    (aiEvaluationResult.overall_score || 80) >= 85
                      ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                      : (aiEvaluationResult.overall_score || 80) >= 70
                      ? 'bg-amber-100 text-amber-950 border-amber-300'
                      : 'bg-rose-100 text-rose-950 border-rose-300'
                  }`}>
                    {aiEvaluationResult.overall_score || 85} / 100
                  </span>
                </div>
              </div>

              {/* 3 Thẻ Điểm Số Chi Tiết */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white rounded-2xl p-3.5 border border-purple-100 shadow-2xs">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-600">🎯 Điểm Phát Âm</span>
                    <span className="font-black text-purple-800">{aiEvaluationResult.pronunciation_score || 85}%</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Nguyên âm, phụ âm & âm đuôi</p>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-purple-600 h-full rounded-full" style={{ width: `${aiEvaluationResult.pronunciation_score || 85}%` }} />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-3.5 border border-purple-100 shadow-2xs">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-600">🎵 Nhấn Âm & Trọng Âm</span>
                    <span className="font-black text-amber-700">{aiEvaluationResult.stress_score || 80}%</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Trọng âm từ & từ mang nghĩa</p>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${aiEvaluationResult.stress_score || 80}%` }} />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-3.5 border border-purple-100 shadow-2xs">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-600">🌊 Lưu Loát & Nối Âm</span>
                    <span className="font-black text-teal-700">{aiEvaluationResult.fluency_score || 85}%</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Ngắt nhịp & ngữ điệu lên xuống</p>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-teal-600 h-full rounded-full" style={{ width: `${aiEvaluationResult.fluency_score || 85}%` }} />
                  </div>
                </div>
              </div>

              {/* Trực Quan Hóa Từng Từ Trong Câu (Word-by-word Visualizer) */}
              {aiEvaluationResult.words_analysis && aiEvaluationResult.words_analysis.length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-purple-100 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-800 uppercase tracking-wide">
                      Đánh giá chi tiết từng từ trong câu:
                    </span>
                    <div className="flex items-center gap-3 text-[11px] font-medium text-slate-500">
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Chuẩn</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Nhấn sai</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Sai âm</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {aiEvaluationResult.words_analysis.map((w, idx) => {
                      const isCorrect = w.status === 'correct';
                      const isStressErr = w.status === 'stress_error';
                      const isPronErr = w.status === 'pronunciation_error' || w.status === 'missing';

                      return (
                        <div
                          key={idx}
                          className={`px-3 py-1.5 rounded-xl border text-xs flex flex-col items-center gap-0.5 transition-all ${
                            isCorrect
                              ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                              : isStressErr
                              ? 'bg-amber-50 text-amber-950 border-amber-300 shadow-xs'
                              : 'bg-rose-50 text-rose-950 border-rose-300 shadow-xs'
                          }`}
                          title={w.error_detail || (isCorrect ? 'Phát âm chuẩn' : '')}
                        >
                          <span className="font-extrabold text-sm">{w.word}</span>
                          <span className="text-[10px] font-mono opacity-75">{w.target_ipa || ''}</span>
                          {isStressErr && <span className="text-[9px] font-black text-amber-800 bg-amber-200/80 px-1.5 rounded-md mt-0.5">⚡ Nhấn sai</span>}
                          {isPronErr && <span className="text-[9px] font-black text-rose-800 bg-rose-200/80 px-1.5 rounded-md mt-0.5">⚠️ Sai âm</span>}
                          {isCorrect && <span className="text-[9px] font-black text-emerald-700">✓ Đạt</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bảng Chi Tiết: Lỗi Nhấn Trọng Âm (Stress Errors) */}
              {aiEvaluationResult.stress_errors && aiEvaluationResult.stress_errors.length > 0 && (
                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-2.5">
                  <span className="text-xs font-black uppercase text-amber-900 flex items-center gap-1.5 tracking-wide">
                    <span>⚡ LỖI NHẤN TRỌNG ÂM ({aiEvaluationResult.stress_errors.length} TỪ)</span>
                  </span>
                  <div className="space-y-2">
                    {aiEvaluationResult.stress_errors.map((err, i) => (
                      <div key={i} className="bg-white rounded-xl p-3 border border-amber-200 text-xs space-y-1">
                        <div className="flex items-center justify-between font-bold text-amber-950">
                          <span className="text-sm font-black">"{err.word}"</span>
                          <span className="text-[11px] text-amber-800 font-semibold bg-amber-100 px-2 py-0.5 rounded-md">{err.issue}</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed font-medium">
                          <strong className="text-amber-900">Cách sửa:</strong> {err.fix}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bảng Chi Tiết: Lỗi Phát Âm & Âm Đuôi (Pronunciation Errors) */}
              {aiEvaluationResult.pronunciation_errors && aiEvaluationResult.pronunciation_errors.length > 0 && (
                <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4 space-y-2.5">
                  <span className="text-xs font-black uppercase text-rose-900 flex items-center gap-1.5 tracking-wide">
                    <span>⚠️ LỖI PHÁT ÂM & ÂM ĐUÔI ({aiEvaluationResult.pronunciation_errors.length} TỪ)</span>
                  </span>
                  <div className="space-y-2">
                    {aiEvaluationResult.pronunciation_errors.map((err, i) => (
                      <div key={i} className="bg-white rounded-xl p-3 border border-rose-200 text-xs space-y-1">
                        <div className="flex items-center justify-between font-bold text-rose-950">
                          <span className="text-sm font-black">"{err.word}"</span>
                          <span className="text-[11px] text-rose-800 font-semibold bg-rose-100 px-2 py-0.5 rounded-md">{err.issue}</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed font-medium">
                          <strong className="text-rose-900">Hướng dẫn khẩu hình:</strong> {err.fix}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Nhận Xét Ngữ Điệu & Mẹo Nối Âm Bản Xứ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {aiEvaluationResult.intonation_analysis && (
                  <div className="bg-purple-50/60 border border-purple-200 rounded-2xl p-3.5 space-y-1">
                    <span className="font-extrabold text-purple-950 block">🎼 Phân tích ngữ điệu câu:</span>
                    <p className="text-slate-700 leading-relaxed">{aiEvaluationResult.intonation_analysis}</p>
                  </div>
                )}

                {aiEvaluationResult.native_pacing_tip && (
                  <div className="bg-teal-50/60 border border-teal-200 rounded-2xl p-3.5 space-y-1">
                    <span className="font-extrabold text-teal-950 block">💡 Mẹo nối âm người bản xứ:</span>
                    <p className="text-slate-700 leading-relaxed">{aiEvaluationResult.native_pacing_tip}</p>
                  </div>
                )}
              </div>

              {aiEvaluationResult.coach_feedback && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-800 font-medium">
                  <strong className="text-slate-900">Lời khuyên của Huấn Luyện Viên AI:</strong> {aiEvaluationResult.coach_feedback}
                </div>
              )}
            </div>
          )}

          {/* Thanh Chuyển Câu (Navigation Footer) */}
          <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                currentIndex === 0
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Câu trước</span>
            </button>

            <span className="text-xs font-bold text-slate-500">
              Tiến trình: {currentIndex + 1} / {filteredList.length}
            </span>

            <button
              onClick={handleNext}
              disabled={currentIndex >= filteredList.length - 1}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                currentIndex >= filteredList.length - 1
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
              }`}
            >
              <span>Câu tiếp theo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 text-slate-500">
          <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-400" />
          <p className="font-bold">Không tìm thấy câu nào phù hợp với bộ lọc hiện tại.</p>
          <button
            onClick={() => { setLevelFilter('all'); setTopicFilter('all'); setSearchQuery(''); setStarredOnly(false); }}
            className="mt-3 px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            Đặt lại tất cả bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// PHÂN HỆ 2: 45S INDEPENDENT SPEAKING STUDIO (50 ĐỀ THI ETS & SAMPLE 26-30)
// =========================================================================
function IndependentSpeakingStudio({ bank }) {
  const [topicFilter, setTopicFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredTasks = useMemo(() => {
    return bank.filter((t) => {
      if (topicFilter !== 'all' && t.topic !== topicFilter) return false;
      if (typeFilter !== 'all' && t.question_type !== typeFilter) return false;
      return true;
    });
  }, [bank, topicFilter, typeFilter]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTask = filteredTasks[currentIndex] || filteredTasks[0] || bank[0];

  // Quản lý bài mẫu tùy chỉnh (Custom Samples do người dùng tự soạn/thay thế)
  const [customSamples, setCustomSamples] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('toefl_custom_speaking_samples') || '{}');
    } catch {
      return {};
    }
  });

  const [isEditingSample, setIsEditingSample] = useState(false);
  const [customTextDraft, setCustomTextDraft] = useState('');
  const [isAnalyzingCustomSample, setIsAnalyzingCustomSample] = useState(false);
  const [customSampleError, setCustomSampleError] = useState(null);
  const [appliedPolishedNotice, setAppliedPolishedNotice] = useState(false);

  const currentCustomSample = currentTask ? customSamples[currentTask.id] : null;
  const isUsingCustom = Boolean(currentCustomSample?.custom_answer);
  const activeSampleText = isUsingCustom ? currentCustomSample.custom_answer : (currentTask?.sample_answer || '');
  const activeWordCount = activeSampleText ? activeSampleText.trim().split(/\s+/).length : 0;

  // Trạng thái Bộ bấm giờ chuẩn ETS: 'idle' | 'prep' (15s) | 'speaking' (45s) | 'finished'
  const [examPhase, setExamPhase] = useState('idle');
  const [prepSecondsLeft, setPrepSecondsLeft] = useState(15);
  const [speakSecondsLeft, setSpeakSecondsLeft] = useState(45);
  const [userAudioUrl, setUserAudioUrl] = useState(null);
  const [isSampleOpen, setIsSampleOpen] = useState(false);
  const [isPlayingSampleAudio, setIsPlayingSampleAudio] = useState(false);

  // AI Evaluation states
  const [isAiEvaluating, setIsAiEvaluating] = useState(false);
  const [aiFeedback, setAiFeedback] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  // Đổi đề thi -> reset trạng thái
  useEffect(() => {
    resetExam();
  }, [currentIndex, currentTask?.id]);

  // Clean-up khi unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const resetExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      try { mediaRecorderRef.current.stop(); } catch (e) {}
    }
    setExamPhase('idle');
    setPrepSecondsLeft(15);
    setSpeakSecondsLeft(45);
    setUserAudioUrl(null);
    setAiFeedback(null);
    setIsPlayingSampleAudio(false);
    setIsEditingSample(false);
    setCustomSampleError(null);
    setAppliedPolishedNotice(false);
  };

  // 1. Bắt đầu quy trình thi ETS: 15s Chuẩn bị -> 45s Nói
  const handleStartExamSimulation = () => {
    resetExam();
    setExamPhase('prep');
    setPrepSecondsLeft(15);
    playExamBeep(650, 300);

    timerRef.current = setInterval(() => {
      setPrepSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          startSpeakingPhase();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 2. Chuyển sang 45s nói & Ghi âm Micro
  const startSpeakingPhase = async () => {
    setExamPhase('speaking');
    setSpeakSecondsLeft(45);
    playExamBeep(850, 400); // Beep to start speaking

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setUserAudioUrl(url);
        stream.getTracks().forEach((t) => t.stop());
      };

      recorder.start();

      timerRef.current = setInterval(() => {
        setSpeakSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            finishSpeakingPhase();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      alert('Không thể mở micro để ghi âm: ' + err.message);
      setExamPhase('idle');
    }
  };

  // 3. Kết thúc 45s nói
  const finishSpeakingPhase = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    playExamBeep(500, 500); // Beep to end speaking
    setExamPhase('finished');
    setIsSampleOpen(true); // Tự động mở bài mẫu sau khi nộp bài

    // Lưu kết quả làm bài
    saveSpeakingPracticeHistory({
      type: '45s',
      itemId: currentTask.id,
      prompt: currentTask.prompt,
      audioDuration: 45
    });
  };

  // 4. Phát audio bài mẫu (chuẩn ETS hoặc bài mẫu tùy chỉnh của học viên)
  const handlePlaySampleAudio = (textToPlay = null) => {
    const text = textToPlay || activeSampleText;
    if (!text || !window.speechSynthesis) return;
    if (isPlayingSampleAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingSampleAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    setIsPlayingSampleAudio(true);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const usVoice = voices.find(
      (v) => v.lang === 'en-US' && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha'))
    );
    if (usVoice) utterance.voice = usVoice;

    utterance.onend = () => setIsPlayingSampleAudio(false);
    utterance.onerror = () => setIsPlayingSampleAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  // Mở form chỉnh sửa / đưa bài của người dùng vào làm bài mẫu
  const handleOpenEditSample = () => {
    setCustomTextDraft(isUsingCustom ? currentCustomSample.custom_answer : (currentTask?.sample_answer || ''));
    setCustomSampleError(null);
    setIsEditingSample(true);
    setIsSampleOpen(true);
  };

  // Lưu bài của người dùng làm bài mẫu (không gọi AI)
  const handleSaveCustomSampleOnly = () => {
    if (!customTextDraft.trim()) {
      alert('Vui lòng nhập nội dung bài nói của bạn.');
      return;
    }
    const updated = {
      ...customSamples,
      [currentTask.id]: {
        custom_answer: customTextDraft.trim(),
        ai_analysis: currentCustomSample?.ai_analysis || null,
        updated_at: new Date().toISOString()
      }
    };
    setCustomSamples(updated);
    localStorage.setItem('toefl_custom_speaking_samples', JSON.stringify(updated));
    setIsEditingSample(false);
  };

  // Lưu bài của người dùng & nhờ AI phân tích, ước tính điểm và gợi ý từ vựng
  const handleSaveAndAnalyzeCustomSample = async () => {
    if (!customTextDraft.trim()) {
      alert('Vui lòng nhập nội dung bài nói của bạn trước khi nhờ AI phân tích.');
      return;
    }

    try {
      setIsAnalyzingCustomSample(true);
      setCustomSampleError(null);

      const aiAnalysis = await analyzeAndEnrichCustomSpeakingSample({
        prompt: currentTask.prompt,
        questionType: currentTask.question_type,
        userSampleText: customTextDraft.trim()
      });

      const updated = {
        ...customSamples,
        [currentTask.id]: {
          custom_answer: customTextDraft.trim(),
          ai_analysis: aiAnalysis,
          updated_at: new Date().toISOString()
        }
      };

      setCustomSamples(updated);
      localStorage.setItem('toefl_custom_speaking_samples', JSON.stringify(updated));
      setIsEditingSample(false);
    } catch (err) {
      console.error('Lỗi khi phân tích bài mẫu tùy chỉnh:', err);
      setCustomSampleError(err.message || 'Không thể kết nối AI để phân tích bài mẫu.');
    } finally {
      setIsAnalyzingCustomSample(false);
    }
  };

  // Khôi phục bài mẫu gốc ban đầu của ETS
  const handleResetToDefaultSample = () => {
    if (window.confirm('Bạn có chắc muốn khôi phục lại bài mẫu gốc của ETS cho đề thi này?')) {
      const updated = { ...customSamples };
      delete updated[currentTask.id];
      setCustomSamples(updated);
      localStorage.setItem('toefl_custom_speaking_samples', JSON.stringify(updated));
      setIsEditingSample(false);
    }
  };

  // Áp dụng phiên bản nâng cao Band 30 do AI trau chuốt làm bài mẫu
  const handleApplyPolishedVersion = () => {
    if (!currentCustomSample?.ai_analysis?.polished_band30_version) return;
    const updated = {
      ...customSamples,
      [currentTask.id]: {
        ...currentCustomSample,
        custom_answer: currentCustomSample.ai_analysis.polished_band30_version,
        updated_at: new Date().toISOString()
      }
    };
    setCustomSamples(updated);
    localStorage.setItem('toefl_custom_speaking_samples', JSON.stringify(updated));
    setAppliedPolishedNotice(true);
    setTimeout(() => setAppliedPolishedNotice(false), 4000);
  };

  // 5. Gửi Gemini AI chấm điểm & feedback
  const handleAiEvaluation = async () => {
    const geminiKey = getGeminiApiKey();
    if (!geminiKey) {
      alert('Vui lòng nhập API Key Google Gemini trong mục Cài đặt để sử dụng tính năng AI chấm điểm.');
      return;
    }

    try {
      setIsAiEvaluating(true);
      const res = await evaluateSpeakingTest({
        interviewItems: [
          {
            id: currentTask.id,
            question: currentTask.prompt,
            sample_answer: currentTask.sample_answer,
            spoken_transcript: 'Student practiced 45s simulation response for task: ' + currentTask.prompt
          }
        ]
      });
      setAiFeedback(res);
    } catch (e) {
      alert('Lỗi chấm bài AI: ' + e.message);
    } finally {
      setIsAiEvaluating(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Bộ Lọc Chủ Đề & Dạng Câu Hỏi */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Lọc theo 6 Chủ đề */}
          <select
            value={topicFilter}
            onChange={(e) => { setTopicFilter(e.target.value); setCurrentIndex(0); }}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white cursor-pointer"
          >
            <option value="all">Mọi nhóm chủ đề (6 Chủ đề lớn)</option>
            <option value="Education & Academics">1. Education & Academics</option>
            <option value="Campus Life & Policies">2. Campus Life & Policies</option>
            <option value="Technology & AI">3. Technology & AI</option>
            <option value="Career & Work">4. Career & Work</option>
            <option value="Lifestyle & Habits">5. Lifestyle & Habits</option>
            <option value="Society & Environment">6. Society & Environment</option>
          </select>

          {/* Lọc theo 4 Dạng câu hỏi */}
          <select
            value={typeFilter}
            onChange={(e) => { setTypeFilter(e.target.value); setCurrentIndex(0); }}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white cursor-pointer"
          >
            <option value="all">Mọi dạng đề ETS (4 Formats)</option>
            <option value="Paired Choice">Paired Choice / Preference</option>
            <option value="Agree / Disagree">Agree / Disagree</option>
            <option value="Good Idea / Bad Idea">Good Idea / Bad Idea</option>
            <option value="Three Options">Three Options</option>
          </select>
        </div>

        {/* Stepper danh sách câu */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentIndex((p) => Math.max(0, p - 1))}
            disabled={currentIndex === 0}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-black text-slate-700 px-2">
            Đề {currentIndex + 1} / {filteredTasks.length}
          </span>
          <button
            onClick={() => setCurrentIndex((p) => Math.min(filteredTasks.length - 1, p + 1))}
            disabled={currentIndex >= filteredTasks.length - 1}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-30 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Giao Diện 2 Cột: Cột Trái (Phòng thi 45s) - Cột Phải (Bài mẫu & Phân tích) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* CỘT TRÁI (6 Cột): PHÒNG THI MÔ PHỎNG ETS (15s Prep -> 45s Speak) */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between min-h-[580px]">
          <div>
            {/* Header Đề thi */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                  {currentTask.topic}
                </span>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  {currentTask.question_type}
                </span>
              </div>

              <span className="text-xs font-bold text-slate-400">
                15s Prep • 45s Speak
              </span>
            </div>

            {/* Prompt Câu hỏi thi thật ETS */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/90 mb-6">
              <span className="text-[11px] font-black uppercase text-emerald-800 tracking-wider block mb-1.5">
                TOEFL iBT Speaking Task 1 Question:
              </span>
              <p className="text-base sm:text-lg font-extrabold text-slate-900 leading-relaxed">
                "{currentTask.prompt}"
              </p>
            </div>

            {/* Bộ Đếm Thời Gian & Trạng Thái Thi */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 text-white text-center shadow-inner relative overflow-hidden mb-6">
              {examPhase === 'idle' && (
                <div className="py-4 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mx-auto text-emerald-300">
                    <Clock className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base text-white">Sẵn sàng làm bài thi thử ETS?</h4>
                    <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
                      Sau khi bấm bắt đầu: Bạn có <strong>15 giây suy nghĩ</strong> (chuông báo bíp), sau đó micro tự động ghi âm câu trả lời trong đúng <strong>45 giây</strong>.
                    </p>
                  </div>

                  <button
                    onClick={handleStartExamSimulation}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-600/30 cursor-pointer active:scale-95 transition-all flex items-center gap-2 mx-auto"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Bắt đầu tính giờ thi thử (15s + 45s)</span>
                  </button>
                </div>
              )}

              {examPhase === 'prep' && (
                <div className="py-4 space-y-3 animate-fadeIn">
                  <span className="text-xs font-black uppercase text-amber-400 tracking-widest block">
                    ⏳ THỜI GIAN CHUẨN BỊ (PREPARATION TIME)
                  </span>
                  <div className="text-5xl sm:text-6xl font-black font-mono text-amber-300 tracking-tight">
                    00:{String(prepSecondsLeft).padStart(2, '0')}
                  </div>
                  <p className="text-xs text-slate-300 max-w-xs mx-auto">
                    Hãy phác thảo nhanh dàn ý trong đầu: Lập trường + 2 lý do cốt lõi!
                  </p>
                </div>
              )}

              {examPhase === 'speaking' && (
                <div className="py-4 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-center gap-2 text-xs font-black uppercase text-rose-400 tracking-widest">
                    <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                    <span>🎙️ ĐANG GHI ÂM TRẢ LỜI (SPEAK NOW!)</span>
                  </div>

                  <div className="text-5xl sm:text-6xl font-black font-mono text-rose-400 tracking-tight">
                    00:{String(speakSecondsLeft).padStart(2, '0')}
                  </div>

                  {/* Thanh tiến trình 45s */}
                  <div className="w-full bg-slate-700/60 h-2.5 rounded-full overflow-hidden max-w-xs mx-auto">
                    <div
                      className="bg-rose-500 h-full transition-all duration-1000 ease-linear"
                      style={{ width: `${((45 - speakSecondsLeft) / 45) * 100}%` }}
                    />
                  </div>

                  <button
                    onClick={finishSpeakingPhase}
                    className="mt-2 text-xs text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    Hoàn thành sớm và dừng ghi âm
                  </button>
                </div>
              )}

              {examPhase === 'finished' && (
                <div className="py-4 space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-base text-white">Đã hoàn thành 45s trả lời!</h4>
                  <p className="text-xs text-slate-300">
                    Bản ghi âm của bạn đã được lưu lại. Hãy nghe lại và đối chiếu với bài mẫu chuẩn band 26–30 ở cột bên phải.
                  </p>
                  <button
                    onClick={handleStartExamSimulation}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-xl cursor-pointer flex items-center gap-1.5 mx-auto"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Thu âm lại lần nữa</span>
                  </button>
                </div>
              )}
            </div>

            {/* Nghe lại file ghi âm của thí sinh & Nút AI Chấm điểm */}
            {userAudioUrl && (
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-3">
                <span className="text-xs font-black text-emerald-900 uppercase tracking-wide block">
                  Bản thu âm của bạn (45s):
                </span>
                <audio src={userAudioUrl} controls className="w-full h-9" />

                <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                  <button
                    onClick={handleAiEvaluation}
                    disabled={isAiEvaluating}
                    className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                    <span>{isAiEvaluating ? 'AI đang phân tích bài nói...' : 'Nhờ AI Chấm Điểm & Feedback'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Hiển thị Nhận xét từ AI */}
            {aiFeedback && (
              <div className="mt-4 bg-purple-50 border border-purple-200 rounded-2xl p-4 text-xs space-y-2">
                <div className="flex items-center justify-between font-black text-purple-950">
                  <span>KẾT QUẢ ĐÁNH GIÁ CHUẨN ETS RUBRIC</span>
                  <span>Band: {aiFeedback.scaled_score || 25}/30</span>
                </div>
                <p className="text-slate-700 leading-relaxed">{aiFeedback.diagnostic_feedback || 'Bài nói có cấu trúc mạch lạc, ý tứ rõ ràng.'}</p>
              </div>
            )}
          </div>

          {/* Ghi chú chân trang */}
          <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between text-xs text-slate-400">
            <span>TOEFL iBT Speaking Task 1 Simulation</span>
            <span>ETS Rubric 2026</span>
          </div>
        </div>

        {/* CỘT PHẢI (6 Cột): BÀI MẪU (CHUẨN ETS HOẶC BÀI CỦA NGƯỜI DÙNG) + PHÂN TÍCH AI */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col min-h-[580px] space-y-5">
          {/* Header Thẻ Bài Mẫu */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              {isUsingCustom ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300 text-xs font-black shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>Bài Mẫu Của Bạn (Đã Lưu)</span>
                </span>
              ) : (
                <div className="flex items-center gap-1.5">
                  <Award className="w-5 h-5 text-amber-500" />
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Bài Mẫu Chuẩn ETS (Band 26–30/30)
                  </h3>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {isUsingCustom && !isEditingSample && (
                <button
                  onClick={handleResetToDefaultSample}
                  className="text-xs font-semibold text-slate-500 hover:text-rose-600 px-2.5 py-1 rounded-lg border border-slate-200 hover:border-rose-200 cursor-pointer transition-all"
                  title="Khôi phục lại bài mẫu chuẩn ban đầu của ETS"
                >
                  Khôi phục gốc ETS
                </button>
              )}

              {!isEditingSample && (
                <button
                  onClick={handleOpenEditSample}
                  className="text-xs font-bold text-purple-800 bg-purple-50 hover:bg-purple-100 px-3 py-1 rounded-xl border border-purple-200 cursor-pointer flex items-center gap-1 transition-all shadow-2xs"
                  title="Thay thế bằng bài của bạn để lưu mẫu và nhờ AI phân tích"
                >
                  <Edit3 className="w-3.5 h-3.5 text-purple-600" />
                  <span>{isUsingCustom ? 'Sửa bài của tôi' : 'Thay thế bằng bài của tôi'}</span>
                </button>
              )}

              <button
                onClick={() => setIsSampleOpen(!isSampleOpen)}
                className="text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-xl border border-emerald-200 cursor-pointer"
              >
                {isSampleOpen ? 'Thu gọn' : 'Chi tiết'}
              </button>
            </div>
          </div>

          {/* FORM CHỈNH SỬA / NHẬP BÀI CỦA NGƯỜI DÙNG */}
          {isEditingSample ? (
            <div className="bg-purple-50/70 border-2 border-purple-300 rounded-2xl p-5 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-purple-200/80 pb-3">
                <div>
                  <h4 className="font-extrabold text-sm text-purple-950 flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-purple-700" />
                    <span>Tùy Chỉnh Bài Mẫu Của Bạn</span>
                  </h4>
                  <p className="text-[11px] text-purple-700 mt-0.5">
                    Nhập bài nói của bạn vào đây. Sau khi lưu, hệ thống sẽ dùng bài này làm bài mẫu chính thức cho câu hỏi này.
                  </p>
                </div>
                <button
                  onClick={() => setIsEditingSample(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Textarea nhập bài */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Nội dung bài nói của bạn:</span>
                  {speechTranscript && (
                    <button
                      onClick={() => setCustomTextDraft(speechTranscript)}
                      className="text-[11px] font-bold text-purple-700 hover:text-purple-900 underline cursor-pointer"
                    >
                      Điền từ bản ghi âm vừa rồi ➔
                    </button>
                  )}
                </div>

                <textarea
                  value={customTextDraft}
                  onChange={(e) => setCustomTextDraft(e.target.value)}
                  placeholder="Nhập hoặc dán bài nói của bạn vào đây (khoảng 100 - 130 từ để vừa vặn 45 giây nói)..."
                  rows={6}
                  className="w-full p-4 rounded-xl border border-purple-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium leading-relaxed resize-y"
                />

                <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                  <span>
                    Độ dài: <strong className="text-purple-950 font-bold">{customTextDraft.trim() ? customTextDraft.trim().split(/\s+/).length : 0} từ</strong>
                    {' '}(Ước tính nói trong ~{Math.round(((customTextDraft.trim() ? customTextDraft.trim().split(/\s+/).length : 0) / 120) * 45)}s)
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Mục tiêu chuẩn 45s: 110 – 125 từ
                  </span>
                </div>
              </div>

              {/* Nút hành động */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-purple-200/60">
                <button
                  onClick={() => setIsEditingSample(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-purple-100 cursor-pointer"
                >
                  Hủy
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveCustomSampleOnly}
                    disabled={isAnalyzingCustomSample}
                    className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-xs rounded-xl shadow-2xs cursor-pointer flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5 text-slate-500" />
                    <span>Chỉ Lưu Bài</span>
                  </button>

                  <button
                    onClick={handleSaveAndAnalyzeCustomSample}
                    disabled={isAnalyzingCustomSample}
                    className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>{isAnalyzingCustomSample ? 'AI đang phân tích & gợi ý...' : 'Lưu & AI Phân Tích Gợi Ý'}</span>
                  </button>
                </div>
              </div>

              {customSampleError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{customSampleError}</span>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Thông báo khi áp dụng thành công bản nâng cao */}
              {appliedPolishedNotice && (
                <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>✓ Đã cập nhật bài mẫu của bạn thành phiên bản Band 30 do AI nâng cấp!</span>
                </div>
              )}

              {/* Bài Mẫu Đang Hoạt Động & Nút Nghe Audio */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">
                    Độ dài: <strong className="text-slate-800">{activeWordCount} từ</strong> (~{Math.round((activeWordCount / 120) * 45)} giây nói tự nhiên)
                  </span>

                  <button
                    onClick={() => handlePlaySampleAudio()}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      isPlayingSampleAudio
                        ? 'bg-emerald-700 text-white border-emerald-800 animate-pulse'
                        : isUsingCustom
                        ? 'bg-purple-50 text-purple-900 border-purple-300 hover:bg-purple-100'
                        : 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isPlayingSampleAudio ? 'Đang đọc...' : isUsingCustom ? 'Nghe audio bài của bạn' : 'Nghe audio bài mẫu'}</span>
                  </button>
                </div>

                {/* Khung nội dung bài mẫu */}
                <div className={`rounded-2xl p-5 text-slate-800 leading-relaxed text-sm font-medium border ${
                  isUsingCustom
                    ? 'bg-purple-50/40 border-purple-200/90 shadow-2xs'
                    : 'bg-amber-50/50 border-amber-200/80'
                }`}>
                  <p className="whitespace-pre-line">
                    {activeSampleText}
                  </p>
                </div>
              </div>

              {/* PHÂN TÍCH & GỢI Ý NÂNG CẤP TỪ AI DÀNH CHO BÀI CỦA NGƯỜI DÙNG */}
              {isUsingCustom && currentCustomSample?.ai_analysis ? (
                <div className="space-y-4 animate-fadeIn">
                  {/* 1. Thẻ Điểm Ước Tính & Nhịp Điệu */}
                  <div className="bg-gradient-to-r from-purple-900 to-indigo-950 rounded-2xl p-5 text-white space-y-3 shadow-sm">
                    <div className="flex items-center justify-between border-b border-purple-800 pb-2.5">
                      <span className="text-xs font-black uppercase text-purple-200 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>AI ĐÁNH GIÁ BÀI MẪU CỦA BẠN</span>
                      </span>

                      <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-400 text-slate-900 shadow-2xs">
                        Điểm ước tính: ~{currentCustomSample.ai_analysis.estimated_score || 26}/30 ({currentCustomSample.ai_analysis.estimated_band || 'Band 5.0'})
                      </span>
                    </div>

                    {currentCustomSample.ai_analysis.pacing_evaluation && (
                      <p className="text-xs text-purple-100 leading-relaxed">
                        ⏱️ <strong className="text-amber-300">Đánh giá thời lượng:</strong> {currentCustomSample.ai_analysis.pacing_evaluation}
                      </p>
                    )}

                    {currentCustomSample.ai_analysis.strengths && currentCustomSample.ai_analysis.strengths.length > 0 && (
                      <div className="pt-1">
                        <span className="text-[11px] font-bold text-emerald-300 block mb-1">🌟 Điểm mạnh nổi bật:</span>
                        <ul className="text-xs space-y-1 text-slate-200">
                          {currentCustomSample.ai_analysis.strengths.map((str, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-emerald-400">✓</span>
                              <span>{str}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* 2. Bảng Gợi Ý Nâng Cấp Từ Vựng (Vocabulary Upgrades) */}
                  {currentCustomSample.ai_analysis.vocabulary_upgrades && currentCustomSample.ai_analysis.vocabulary_upgrades.length > 0 && (
                    <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-2.5">
                      <span className="text-xs font-black uppercase text-amber-900 flex items-center gap-1.5 tracking-wide">
                        <span>💎 GỢI Ý NÂNG CẤP TỪ VỰNG & COLLOCATIONS BAND 28-30:</span>
                      </span>

                      <div className="space-y-2">
                        {currentCustomSample.ai_analysis.vocabulary_upgrades.map((upg, i) => (
                          <div key={i} className="bg-white rounded-xl p-3 border border-amber-200 text-xs space-y-1">
                            <div className="flex items-center justify-between font-bold">
                              <span className="text-slate-600 line-through">"{upg.original}"</span>
                              <span className="text-emerald-700 font-extrabold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                                ➔ "{upg.suggested}"
                              </span>
                            </div>
                            <p className="text-slate-600 text-[11px] leading-relaxed">
                              {upg.reason}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. Phiên Bản Nâng Cao Trau Chuốt Band 30 (Polished Version) */}
                  {currentCustomSample.ai_analysis.polished_band30_version && (
                    <div className="bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/80 border-2 border-indigo-200 rounded-2xl p-5 space-y-3 shadow-2xs">
                      <div className="flex items-center justify-between border-b border-indigo-100 pb-2.5 flex-wrap gap-2">
                        <div>
                          <span className="text-xs font-black uppercase text-indigo-950 flex items-center gap-1.5">
                            <Award className="w-4 h-4 text-indigo-600" />
                            <span>PHIÊN BẢN TRAU CHUỐT BAND 30 (AI POLISHED VERSION)</span>
                          </span>
                          <span className="text-[11px] text-slate-500 block">
                            (Giữ nguyên 100% ý tưởng của bạn nhưng từ ngữ mượt mà và học thuật hơn)
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handlePlaySampleAudio(currentCustomSample.ai_analysis.polished_band30_version)}
                            className="px-3 py-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-900 font-bold text-xs rounded-xl border border-indigo-300 cursor-pointer flex items-center gap-1.5"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Nghe đọc bản này</span>
                          </button>

                          <button
                            onClick={handleApplyPolishedVersion}
                            className="px-3 py-1 bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
                            title="Áp dụng bản này thành bài mẫu chính thức của bạn"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Áp dụng làm bài mẫu</span>
                          </button>
                        </div>
                      </div>

                      <p className="text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-white/80 p-3.5 rounded-xl border border-indigo-100">
                        {currentCustomSample.ai_analysis.polished_band30_version}
                      </p>
                    </div>
                  )}

                  {/* 4. Dàn Ý Triển Khai Logic Của Bạn */}
                  {currentCustomSample.ai_analysis.outline_breakdown && (
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                      <span className="text-[11px] font-black uppercase text-slate-600 tracking-wider block">
                        🧠 DÀN Ý LẬP LUẬN BÀI NÓI CỦA BẠN:
                      </span>
                      <ul className="text-xs space-y-1.5 text-slate-700">
                        {currentCustomSample.ai_analysis.outline_breakdown.stance && (
                          <li className="flex items-start gap-2">
                            <span className="font-bold text-purple-800 shrink-0">1. Stance:</span>
                            <span>{currentCustomSample.ai_analysis.outline_breakdown.stance}</span>
                          </li>
                        )}
                        {currentCustomSample.ai_analysis.outline_breakdown.reason1 && (
                          <li className="flex items-start gap-2">
                            <span className="font-bold text-purple-800 shrink-0">2. Reason 1:</span>
                            <span>{currentCustomSample.ai_analysis.outline_breakdown.reason1}</span>
                          </li>
                        )}
                        {currentCustomSample.ai_analysis.outline_breakdown.reason2 && (
                          <li className="flex items-start gap-2">
                            <span className="font-bold text-purple-800 shrink-0">3. Reason 2:</span>
                            <span>{currentCustomSample.ai_analysis.outline_breakdown.reason2}</span>
                          </li>
                        )}
                        {currentCustomSample.ai_analysis.outline_breakdown.conclusion && (
                          <li className="flex items-start gap-2">
                            <span className="font-bold text-purple-800 shrink-0">4. Wrap-up:</span>
                            <span>{currentCustomSample.ai_analysis.outline_breakdown.conclusion}</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* 5. Mẹo Phân Bổ Thời Gian */}
                  {currentCustomSample.ai_analysis.delivery_tips && (
                    <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 text-xs text-blue-950 flex items-start gap-2.5">
                      <HelpCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        <strong>Mẹo cho bài nói của bạn:</strong> {currentCustomSample.ai_analysis.delivery_tips}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* HIỂN THỊ NỘI DUNG MẶC ĐỊNH ETS (DÀN Ý, TỪ VỰNG, MẸO PHÒNG THI) */
                <>
                  {/* Dàn Ý Lập Luận (Outline Breakdown) */}
                  {currentTask.outline && (
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2.5">
                      <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider block">
                        🧠 DÀN Ý LẬP LUẬN LOGIC (OUTLINE STRATEGY):
                      </span>
                      <ul className="text-xs space-y-1.5 text-slate-700">
                        <li className="flex items-start gap-2">
                          <span className="font-bold text-emerald-700 shrink-0">1. Stance:</span>
                          <span>{currentTask.outline.stance}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-bold text-emerald-700 shrink-0">2. Reason 1:</span>
                          <span>{currentTask.outline.reason1} (<em>{currentTask.outline.example1}</em>)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-bold text-emerald-700 shrink-0">3. Reason 2:</span>
                          <span>{currentTask.outline.reason2} (<em>{currentTask.outline.example2}</em>)</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {/* Từ Vựng & Collocations Đắt Giá */}
                  {currentTask.vocabulary_highlights && currentTask.vocabulary_highlights.length > 0 && (
                    <div className="border-t border-slate-100 pt-3 space-y-2">
                      <span className="text-[11px] font-black uppercase text-teal-800 tracking-wider block">
                        ✨ TỪ VỰNG & COLLOCATIONS GHI ĐIỂM CAO:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentTask.vocabulary_highlights.map((voc, i) => (
                          <div key={i} className="bg-teal-50/60 border border-teal-200 rounded-xl p-2.5 text-xs">
                            <span className="font-bold text-teal-950 block">"{voc.phrase}"</span>
                            <span className="text-slate-500 text-[11px]">{voc.meaning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mẹo Phân Bổ Thời Gian Chuẩn ETS */}
                  <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-4 text-xs text-blue-950 flex items-start gap-2.5">
                    <HelpCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <div className="leading-relaxed">
                      <strong>Mẹo phòng thi ETS:</strong> {currentTask.delivery_tips || 'Dành 6-8s mở đầu nêu trực diện lập trường, 15-18s cho mỗi luận điểm có kèm ví dụ cụ thể, và 3-5s chốt lại.'}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
