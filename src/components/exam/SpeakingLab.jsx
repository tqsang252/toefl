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
  FileText
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
import { getGeminiApiKey, evaluateSpeakingTest } from '../../lib/gemini.js';

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

          {/* Bảng Điều Khiển Âm Thanh: Nghe Bản Xứ & Thu Âm Giọng Học Viên */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Cụm Nút Nghe Câu Mẫu */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
              <button
                onClick={handlePlaySample}
                disabled={isPlayingAudio || isRecording}
                className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 shadow-sm ${
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

            {/* Cụm Nút Thu Âm Micro */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
              {!isRecording ? (
                <button
                  onClick={startUserRecording}
                  disabled={isPlayingAudio}
                  className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm shadow-sm transition-all cursor-pointer active:scale-95 flex items-center gap-2"
                >
                  <Mic className="w-4 h-4" />
                  <span>2. Bắt đầu đọc lại (Ghi âm)</span>
                </button>
              ) : (
                <button
                  onClick={() => stopUserRecording(true)}
                  className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-black text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 animate-pulse"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span>Dừng thu âm ({recordSeconds}s)</span>
                </button>
              )}
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
                  <span className="text-slate-400 block mb-1 font-bold">Hệ thống AI nhận diện giọng nói:</span>
                  <p className="text-slate-800 font-semibold text-sm">
                    "{speechTranscript}"
                  </p>
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

  // 4. Phát audio bài mẫu chuẩn ETS
  const handlePlaySampleAudio = () => {
    if (!currentTask?.sample_answer || !window.speechSynthesis) return;
    if (isPlayingSampleAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingSampleAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    setIsPlayingSampleAudio(true);

    const utterance = new SpeechSynthesisUtterance(currentTask.sample_answer);
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

        {/* CỘT PHẢI (6 Cột): BÀI MẪU 26-30 ĐIỂM + PHÂN TÍCH TỪ VỰNG & DÀN Ý */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col min-h-[580px] space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="font-extrabold text-slate-900 text-base">
                Bài Mẫu Chuẩn ETS (Band 26–30/30)
              </h3>
            </div>

            <button
              onClick={() => setIsSampleOpen(!isSampleOpen)}
              className="text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-xl border border-emerald-200 cursor-pointer"
            >
              {isSampleOpen ? 'Thu gọn bài mẫu' : 'Xem chi tiết bài mẫu'}
            </button>
          </div>

          {/* Bài Mẫu Hoàn Chỉnh & Trình Phát Audio */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">
                Độ dài: <strong className="text-slate-800">{currentTask.word_count || 115} từ</strong> (~43 giây nói tự nhiên)
              </span>

              <button
                onClick={handlePlaySampleAudio}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  isPlayingSampleAudio
                    ? 'bg-emerald-700 text-white border-emerald-800 animate-pulse'
                    : 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isPlayingSampleAudio ? 'Đang đọc mẫu...' : 'Nghe audio bài mẫu'}</span>
              </button>
            </div>

            {/* Khung nội dung bài mẫu */}
            <div className="bg-amber-50/50 border border-amber-200/80 rounded-2xl p-5 text-slate-800 leading-relaxed text-sm font-medium">
              <p className="whitespace-pre-line">
                {currentTask.sample_answer}
              </p>
            </div>
          </div>

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
        </div>
      </div>
    </div>
  );
}
