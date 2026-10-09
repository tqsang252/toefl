import React, { useState, useEffect, useRef } from 'react';
import { 
  Headphones, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  FileText, 
  Edit3, 
  CheckCircle2, 
  Radio, 
  Sparkles,
  Info,
  Trash2,
  ListPlus
} from 'lucide-react';

export default function ListeningModule({ test, answers, onAnswerChange }) {
  const content = test.content || {};
  const questions = content.questions || [];
  const isChooseResponse = test.task_type === 'choose_response';

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const currentQ = questions[currentQIndex] || questions[0];

  // Audio Playback State (Supports MP3 file or Browser SpeechSynthesis TTS)
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState(null); // 'Narrator' | 'Man' | 'Woman' | null
  const [playbackRate, setPlaybackRate] = useState(0.95); // Chuẩn tốc độ ETS
  const [showTranscript, setShowTranscript] = useState(false);
  const [autoPlayPrompt, setAutoPlayPrompt] = useState(true);

  // Scratchpad Note-taking state (Được phép ghi chú trong bài thi TOEFL)
  const [scratchNotes, setScratchNotes] = useState(() => {
    return localStorage.getItem(`toefl_notes_${test.id}`) || '';
  });

  const audioRef = useRef(null);
  const isPlayingRef = useRef(false);
  const turnTimeoutRef = useRef(null);

  // Lưu ghi chú nháp vào localStorage để không bị mất khi chuyển câu
  const handleNotesChange = (val) => {
    setScratchNotes(val);
    try {
      localStorage.setItem(`toefl_notes_${test.id}`, val);
    } catch (e) {}
  };

  const handleInsertBullet = () => {
    const updated = scratchNotes ? `${scratchNotes}\n• ` : '• ';
    handleNotesChange(updated);
  };

  const handleClearNotes = () => {
    if (scratchNotes && confirm('Bạn có muốn xóa toàn bộ ghi chú nháp của phần này không?')) {
      handleNotesChange('');
    }
  };

  // Xác định văn bản audio cần phát:
  // - Với choose_response: mỗi câu có prompt audio ngắn riêng (currentQ.audio_text)
  // - Với conversation / announcement / academic_talk: audio phát xuyên suốt cả bài (content.audio_text), không bị ngắt khi đổi câu
  const currentAudioText = isChooseResponse 
    ? (currentQ?.audio_text || '') 
    : (content.audio_text || '');
  const hasAudioSource = !!(content.audio_url || currentAudioText);

  // Phân tích lượt hội thoại (Narrator, Man, Woman)
  const parseDialogueTurns = (rawText, taskType) => {
    if (!rawText) return [];

    // 1. Kiểm tra nếu văn bản đã có nhãn người nói rõ ràng (Man:, Woman:, Narrator:...)
    const hasLabels = /(?:^|\n)(Narrator|Man|Woman|Male|Female|Student|Professor|Speaker \d+):\s*/i.test(rawText);
    if (hasLabels) {
      const lines = rawText.split(/\n+/);
      const turns = [];
      let activeSpeaker = 'Narrator';
      let currentBuffer = [];

      for (const line of lines) {
        const match = line.match(/^(Narrator|Man|Woman|Male|Female|Student|Professor|Speaker \d+):\s*(.*)/i);
        if (match) {
          if (currentBuffer.length > 0) {
            turns.push({ speaker: activeSpeaker, text: currentBuffer.join(' ').trim() });
            currentBuffer = [];
          }
          activeSpeaker = match[1];
          if (match[2].trim()) {
            currentBuffer.push(match[2].trim());
          }
        } else if (line.trim()) {
          currentBuffer.push(line.trim());
        }
      }
      if (currentBuffer.length > 0) {
        turns.push({ speaker: activeSpeaker, text: currentBuffer.join(' ').trim() });
      }
      return turns.filter(t => t.text);
    }

    // 2. Nếu là dạng conversation mà chưa có nhãn, tự động phân tách thông minh
    if (taskType === 'conversation') {
      let text = rawText.trim();
      const turns = [];

      // Dẫn nhập Narrator
      const introMatch = text.match(/^(Listen to a conversation(?:\s+[^.]+)?\.)\s*(.*)/i);
      if (introMatch) {
        turns.push({ speaker: 'Narrator', text: introMatch[1].trim() });
        text = introMatch[2].trim();
      }

      // Tách câu theo dấu ngắt
      const sentences = text.match(/[^.!?]+[.!?]+(?:\s+|$)/g) || [text];
      let activeSpeaker = 'Man';
      let currentText = '';

      for (let i = 0; i < sentences.length; i++) {
        const s = sentences[i].trim();
        if (!s) continue;

        if (!currentText) {
          currentText = s;
        } else {
          if (currentText.endsWith('?') || s.endsWith('?') || currentText.length > 80) {
            turns.push({ speaker: activeSpeaker, text: currentText });
            activeSpeaker = activeSpeaker === 'Man' ? 'Woman' : 'Man';
            currentText = s;
          } else {
            currentText += ' ' + s;
          }
        }
      }
      if (currentText) {
        turns.push({ speaker: activeSpeaker, text: currentText });
      }
      return turns;
    }

    return [{ speaker: 'Narrator', text: rawText }];
  };

  const dialogueTurns = parseDialogueTurns(currentAudioText, test.task_type);

  // Stop audio on unmount or question change
  const stopAudio = () => {
    isPlayingRef.current = false;
    if (turnTimeoutRef.current) {
      clearTimeout(turnTimeoutRef.current);
      turnTimeoutRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentSpeaker(null);
  };

  // Dừng audio khi unmount hoặc khi chuyển sang Task/Module khác
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, [test.id]);

  // CHỈ dừng và phát lại audio khi chuyển câu ở dạng CHOOSE_RESPONSE (vì mỗi câu có 1 audio riêng)
  // Ở dạng Conversation, Announcement, Academic Talk: Cho phép thí sinh chuyển qua lại giữa các câu hỏi 1, 2, 3... trong lúc bài nghe vẫn tiếp tục phát liền mạch!
  useEffect(() => {
    if (isChooseResponse) {
      stopAudio();
      if (autoPlayPrompt && currentQ?.audio_text) {
        const timer = setTimeout(() => {
          playAudio(currentQ.audio_text);
        }, 300);
        return () => {
          clearTimeout(timer);
          stopAudio();
        };
      }
    }
  }, [currentQIndex, isChooseResponse, autoPlayPrompt]);

  // State danh sách giọng đọc từ trình duyệt
  const [systemVoices, setSystemVoices] = useState([]);
  useEffect(() => {
    const loadVoices = () => {
      if (window.speechSynthesis) {
        setSystemVoices(window.speechSynthesis.getVoices());
      }
    };
    loadVoices();
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Chọn 2 giọng đọc riêng biệt (Nam và Nữ) từ hệ thống
  const getDistinctVoices = () => {
    const allVoices = systemVoices.length > 0 ? systemVoices : (window.speechSynthesis ? window.speechSynthesis.getVoices() : []);
    const enVoices = allVoices.filter(v => v.lang && v.lang.startsWith('en'));

    const isMale = (name = '') => /david|guy|mark|george|christopher|male|richard|james|alex|fred/i.test(name);
    const isFemale = (name = '') => /zira|jenny|samantha|aria|female|susan|victoria|karen|catherine|stephanie|google us/i.test(name);

    let maleVoice = enVoices.find(v => isMale(v.name));
    let femaleVoice = enVoices.find(v => isFemale(v.name));

    // Nếu không tìm thấy tên khớp, chọn 2 voice tiếng Anh khác nhau
    if (!maleVoice && enVoices.length > 0) maleVoice = enVoices[0];
    if (!femaleVoice && enVoices.length > 1) {
      femaleVoice = enVoices.find(v => v !== maleVoice) || enVoices[1];
    } else if (!femaleVoice && enVoices.length > 0) {
      femaleVoice = enVoices[0];
    }

    return { maleVoice, femaleVoice, narratorVoice: enVoices[0] || null };
  };

  // Tính khoảng nghỉ đàm thoại tự nhiên theo ngữ cảnh bài nghe
  const calculatePauseDuration = (currentTurn, nextTurn) => {
    if (!currentTurn) return 800;

    // 1. Sau lời dẫn đề của Narrator: nghỉ 1.2s để thí sinh chuẩn bị bước vào hội thoại
    if (/^narrator/i.test(currentTurn.speaker)) {
      return 1200;
    }

    const text = (currentTurn.text || '').trim();

    // 2. Sau câu hỏi (?): người đối thoại cần 1 giây để tiếp nhận và phản hồi
    if (text.endsWith('?') || text.includes('?')) {
      return 950;
    }

    // 3. Khi đổi người nói giữa Man và Woman: khoảng nghỉ chuyển lượt tự nhiên 850ms
    if (nextTurn && currentTurn.speaker !== nextTurn.speaker) {
      return 850;
    }

    // 4. Khoảng nghỉ thông thường giữa các câu nói
    return 750;
  };

  // Phát từng lượt đối thoại luân phiên giữa 2 giọng đọc thật sự khác nhau
  const playDialogueSequence = (turns, turnIndex = 0) => {
    if (!window.speechSynthesis) return;
    if (turnIndex >= turns.length || !isPlayingRef.current) {
      setIsPlaying(false);
      setCurrentSpeaker(null);
      isPlayingRef.current = false;
      return;
    }

    const turn = turns[turnIndex];
    const nextTurn = turns[turnIndex + 1];
    setCurrentSpeaker(turn.speaker);

    const utterance = new SpeechSynthesisUtterance(turn.text);
    utterance.lang = 'en-US';

    const { maleVoice, femaleVoice, narratorVoice } = getDistinctVoices();
    const isMan = /^man|^male/i.test(turn.speaker);
    const isWoman = /^woman|^female/i.test(turn.speaker);

    if (isMan) {
      // 👨 GIỌNG NAM: Trầm ấm, nhịp điệu từ tốn (pitch 0.72)
      if (maleVoice) utterance.voice = maleVoice;
      utterance.pitch = 0.72; // Trầm ấm nam giới rõ rệt
      utterance.rate = playbackRate * 0.88; // Đĩnh đạc, tự nhiên, không vội vã
    } else if (isWoman) {
      // 👩 GIỌNG NỮ: Thanh thoát, tự nhiên (pitch 1.42)
      if (femaleVoice) utterance.voice = femaleVoice;
      utterance.pitch = 1.42; // Cao trong trẻo nữ giới rõ rệt
      utterance.rate = playbackRate * 0.92; // Tươi tắn, rõ từng từ
    } else {
      // 📢 DẪN ĐỀ (Narrator): Trang trọng, rõ ràng
      if (narratorVoice) utterance.voice = narratorVoice;
      utterance.pitch = 1.0;
      utterance.rate = playbackRate * 0.90;
    }

    utterance.onend = () => {
      if (!isPlayingRef.current) return;
      // Khoảng nghỉ tự nhiên theo ngữ cảnh (750ms - 1200ms) thay vì nhảy câu tức thì
      const pauseMs = calculatePauseDuration(turn, nextTurn);
      turnTimeoutRef.current = setTimeout(() => {
        playDialogueSequence(turns, turnIndex + 1);
      }, pauseMs);
    };

    utterance.onerror = () => {
      if (isPlayingRef.current && turnIndex + 1 < turns.length) {
        playDialogueSequence(turns, turnIndex + 1);
      } else {
        setIsPlaying(false);
        setCurrentSpeaker(null);
        isPlayingRef.current = false;
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const playAudio = (textToPlay) => {
    if (content.audio_url) {
      if (audioRef.current) {
        audioRef.current.playbackRate = playbackRate;
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else if (textToPlay) {
      if (!window.speechSynthesis) {
        alert('Trình duyệt của bạn không hỗ trợ đọc âm thanh Web Speech API.');
        return;
      }
      stopAudio();

      const turns = parseDialogueTurns(textToPlay, test.task_type);
      isPlayingRef.current = true;
      setIsPlaying(true);

      if (turns.length > 1) {
        playDialogueSequence(turns, 0);
      } else {
        const utterance = new SpeechSynthesisUtterance(textToPlay);
        utterance.lang = 'en-US';
        utterance.rate = playbackRate;

        const voices = window.speechSynthesis.getVoices();
        const usVoice = voices.find(v => v.lang === 'en-US' && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Jenny') || v.name.includes('Guy')));
        if (usVoice) utterance.voice = usVoice;

        utterance.onend = () => {
          setIsPlaying(false);
          isPlayingRef.current = false;
        };
        utterance.onerror = () => {
          setIsPlaying(false);
          isPlayingRef.current = false;
        };

        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleToggleAudio = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio(currentAudioText);
    }
  };

  // Badge loại bài thi
  const getTaskTypeBadge = () => {
    switch (test.task_type) {
      case 'choose_response':
        return { label: 'Listen & Choose a Response', color: 'bg-amber-100 text-amber-900 border-amber-300' };
      case 'announcement':
        return { label: 'Campus Announcement', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
      case 'conversation':
        return { label: 'Campus Conversation', color: 'bg-blue-100 text-blue-900 border-blue-300' };
      case 'academic_talk':
        return { label: 'Academic Lecture', color: 'bg-purple-100 text-purple-900 border-purple-300' };
      default:
        return { label: 'Listening Practice', color: 'bg-slate-100 text-slate-800 border-slate-300' };
    }
  };

  const typeBadge = getTaskTypeBadge();

  return (
    <div className="space-y-6">
      
      {/* 1. Header Chỉ Dẫn Định Dạng Chuẩn TOEFL 2026 */}
      <div className="bg-white rounded-2xl border border-[#e2dcd2] p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${typeBadge.color}`}>
              {typeBadge.label}
            </span>
            <span className="text-xs font-bold text-slate-500">
              {isChooseResponse ? 'Phần phản xạ giao tiếp nhanh' : 'Nghe và ghi chú để trả lời'}
            </span>
          </div>
          <h2 className="text-lg font-black text-slate-900">
            {test.title}
          </h2>
          {content.context_title && (
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              📌 Tình huống: <span className="font-semibold text-slate-800">{content.context_title}</span>
              {content.speaker && <span className="text-slate-500"> • Người phát biểu: {content.speaker}</span>}
            </p>
          )}
        </div>

        {/* Cụm điều chỉnh tốc độ & tự động phát */}
        <div className="flex items-center gap-2 shrink-0 bg-slate-50 p-2 rounded-xl border border-slate-200">
          <span className="text-[11px] font-bold text-slate-500">Tốc độ:</span>
          {[0.9, 0.95, 1.0, 1.15].map((rate) => (
            <button
              key={rate}
              onClick={() => {
                setPlaybackRate(rate);
                if (isPlaying) {
                  stopAudio();
                  setTimeout(() => playAudio(currentAudioText), 150);
                }
              }}
              className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                playbackRate === rate
                  ? 'bg-[#153e75] text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {rate}x
            </button>
          ))}
        </div>
      </div>

      {/* 2. Nội dung chính: Cột Trái (Audio + Notepad) & Cột Phải (Câu hỏi trắc nghiệm) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ========================================================= */}
        {/* CỘT TRÁI: MÁY PHÁT AUDIO & SỔ TAY GHI CHÚ (SCRATCHPAD) */}
        {/* ========================================================= */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Audio Visualizer Card */}
          <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-3xl p-6 text-white text-center shadow-md border border-slate-700 relative overflow-hidden">
            {/* Hiệu ứng tia sáng nền */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-teal-500/10 rounded-full blur-2xl" />

            {/* Trạng thái Audio */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-4 px-2">
              <span className="flex items-center gap-1.5 font-semibold">
                <Headphones className="w-3.5 h-3.5 text-teal-400" />
                {isChooseResponse ? `Prompt Câu ${currentQIndex + 1}` : (content.speaker || 'Official Audio')}
              </span>
              <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                isPlaying 
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse' 
                  : 'bg-slate-700/60 text-slate-300'
              }`}>
                {isPlaying ? '● Đang phát âm thanh...' : 'Sẵn sàng phát'}
              </span>
            </div>

            {/* Icon Tai Nghe trung tâm */}
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 ${
              isPlaying 
                ? 'bg-teal-500/20 text-teal-300 ring-4 ring-teal-500/30 scale-105' 
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}>
              <Headphones className="w-8 h-8" />
            </div>

            <h3 className="font-bold text-base tracking-wide text-white mb-1">
              {isChooseResponse 
                ? `Câu ${currentQIndex + 1} / ${questions.length}: Lắng nghe câu nói`
                : (content.context_title || test.title)}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-5 leading-relaxed">
              {isChooseResponse
                ? 'Lắng nghe phản xạ và chọn câu đáp lại hợp lý nhất theo chuẩn ngữ cảnh đại học.'
                : 'Hãy vừa nghe vừa ghi chú nhanh các thông tin quan trọng vào sổ tay bên dưới.'}
            </p>

            {/* Hiển thị vai người đang nói (Speaker Live Indicator) */}
            {isPlaying && currentSpeaker && (
              <div className="flex items-center justify-center gap-2 mb-3">
                {/^man|^male/i.test(currentSpeaker) ? (
                  <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/40 flex items-center gap-1.5 shadow-sm animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    👨 Đang nói: <strong>Man (Người nam • Giọng trầm)</strong>
                  </span>
                ) : /^woman|^female/i.test(currentSpeaker) ? (
                  <span className="px-3.5 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold border border-pink-400/40 flex items-center gap-1.5 shadow-sm animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                    👩 Đang nói: <strong>Woman (Người nữ • Giọng thanh)</strong>
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700 flex items-center gap-1.5">
                    📢 Đang nói: <strong>Narrator (Dẫn đề)</strong>
                  </span>
                )}
              </div>
            )}

            {/* Sóng âm thanh động (Equalizer Animation) */}
            <div className="flex items-center justify-center gap-1.5 h-12 mb-6 px-4">
              {[35, 75, 45, 95, 60, 85, 40, 90, 70, 50, 80, 55, 92, 65, 38, 72].map((height, i) => (
                <span
                  key={i}
                  style={{ 
                    height: isPlaying ? `${height}%` : '16%',
                    animationDuration: `${0.4 + (i % 5) * 0.15}s`
                  }}
                  className={`w-1.5 rounded-full transition-all duration-200 ${
                    isPlaying ? 'bg-gradient-to-t from-teal-400 to-blue-400' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>

            {/* Bộ phím điều khiển Play / Pause */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleToggleAudio}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg active:scale-95 ${
                  isPlaying
                    ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/30'
                    : 'bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white shadow-blue-500/25'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Tạm dừng âm thanh</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>{isChooseResponse ? 'Nghe lại câu hỏi này' : 'Bắt đầu nghe bài'}</span>
                  </>
                )}
              </button>

              {isPlaying && (
                <button
                  onClick={stopAudio}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer"
                  title="Dừng hẳn và tua lại từ đầu"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Tùy chọn tự động phát khi đổi câu (chỉ hiện ở dạng choose_response) */}
            {isChooseResponse && (
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-center gap-2 text-slate-400 text-xs">
                <input
                  type="checkbox"
                  id="autoplay-cb"
                  checked={autoPlayPrompt}
                  onChange={(e) => setAutoPlayPrompt(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
                />
                <label htmlFor="autoplay-cb" className="cursor-pointer select-none">
                  Tự động phát âm thanh khi chuyển sang câu tiếp theo
                </label>
              </div>
            )}

            {content.audio_url && (
              <audio
                ref={audioRef}
                src={content.audio_url}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />
            )}
          </div>

          {/* ========================================================= */}
          {/* SỔ TAY GHI CHÚ NHÁP (SCRATCHPAD) - CHUẨN THI TOEFL */}
          {/* ========================================================= */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Edit3 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Scratch Notepad (Sổ ghi chú nháp)
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    Được phép ghi chép trong phòng thi TOEFL iBT thật
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleInsertBullet}
                  className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  title="Thêm gạch đầu dòng"
                >
                  <ListPlus className="w-3 h-3" />
                  <span>+ Ý</span>
                </button>
                {scratchNotes && (
                  <button
                    type="button"
                    onClick={handleClearNotes}
                    className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                    title="Xóa toàn bộ ghi chú"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <textarea
              value={scratchNotes}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder="Ghi lại các mốc sự kiện, từ khóa, lập luận chính của người nói vào đây trong lúc nghe..."
              rows={isChooseResponse ? 3 : 6}
              className="w-full p-3 rounded-xl border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-xs text-slate-800 font-sans leading-relaxed resize-y bg-[#fffdfa]"
            />
            <div className="flex justify-between items-center mt-2 text-[10px] text-slate-400 font-medium">
              <span>💡 Gợi ý: Ghi ngắn gọn danh từ, số liệu & thái độ người nói.</span>
              <span>Đã lưu tự động</span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* CHẾ ĐỘ XEM TRANSCRIPT (LUYỆN TẬP) */}
          {/* ========================================================= */}
          {currentAudioText && (
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
              <button
                type="button"
                onClick={() => setShowTranscript(!showTranscript)}
                className="flex items-center justify-between w-full text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>{showTranscript ? 'Ẩn Transcript bài nghe' : 'Xem Transcript bài nghe (Chế độ ôn luyện)'}</span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                  {showTranscript ? 'Đang mở' : 'Bấm để xem'}
                </span>
              </button>

              {showTranscript && (
                <div className="mt-3 p-4 bg-amber-50/50 rounded-xl border border-amber-200/80 text-xs text-slate-800 leading-relaxed max-h-64 overflow-y-auto selection:bg-amber-200">
                  <div className="flex items-center justify-between border-b border-amber-200/60 pb-2 mb-3">
                    <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                      <span>Audio Transcript:</span>
                      {dialogueTurns.length > 1 && (
                        <span className="bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded text-[9px] font-extrabold">
                          Phân vai hội thoại
                        </span>
                      )}
                    </div>
                    {dialogueTurns.length > 1 && (
                      <span className="text-[10px] text-slate-500 font-medium">
                        👨 Xanh = Man • 👩 Hồng = Woman
                      </span>
                    )}
                  </div>

                  {dialogueTurns.length > 1 ? (
                    <div className="space-y-2.5">
                      {dialogueTurns.map((turn, tIdx) => {
                        const isMan = /^man|^male/i.test(turn.speaker);
                        const isWoman = /^woman|^female/i.test(turn.speaker);

                        if (isMan) {
                          return (
                            <div key={tIdx} className="flex items-start gap-2.5 bg-blue-50/90 p-2.5 rounded-xl border border-blue-200 text-slate-900">
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-[#153e75] text-white shrink-0 flex items-center gap-1">
                                👨 Man
                              </span>
                              <span className="text-xs leading-relaxed font-medium">{turn.text}</span>
                            </div>
                          );
                        }
                        if (isWoman) {
                          return (
                            <div key={tIdx} className="flex items-start gap-2.5 bg-pink-50/90 p-2.5 rounded-xl border border-pink-200 text-slate-900">
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-pink-700 text-white shrink-0 flex items-center gap-1">
                                👩 Woman
                              </span>
                              <span className="text-xs leading-relaxed font-medium">{turn.text}</span>
                            </div>
                          );
                        }
                        return (
                          <div key={tIdx} className="text-[11px] italic text-slate-600 bg-slate-100/90 p-2 rounded-lg border border-slate-200">
                            📢 <strong>{turn.speaker}:</strong> {turn.text}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="whitespace-pre-line font-serif">{currentAudioText}</div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>

        {/* ========================================================= */}
        {/* CỘT PHẢI: CÂU HỎI TRẮC NGHIỆM & PHƯƠNG ÁN A, B, C, D */}
        {/* ========================================================= */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-[#e2dcd2] p-6 sm:p-7 shadow-xs">
          
          {/* Thanh chuyển số câu hỏi */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
            <div>
              <span className="text-xs font-black text-slate-900 uppercase tracking-wide">
                CÂU HỎI {currentQIndex + 1} / {questions.length}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5 font-medium">
                {answers[currentQ?.id] ? '✓ Đã chọn đáp án' : 'Chưa có câu trả lời'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {questions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                const isCurrent = idx === currentQIndex;

                return (
                  <button
                    key={q.id || idx}
                    type="button"
                    onClick={() => setCurrentQIndex(idx)}
                    className={`w-8 h-8 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center ${
                      isCurrent
                        ? 'bg-[#153e75] text-white shadow-sm ring-2 ring-blue-300'
                        : isAnswered
                        ? 'bg-teal-50 text-teal-800 border border-teal-300 font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    title={`Câu ${idx + 1}${isAnswered ? ' (Đã làm)' : ''}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nội dung câu hỏi đang chọn */}
          {currentQ ? (
            <div>
              
              {/* Prompt câu hỏi */}
              <div className="mb-6">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 inline-block mb-2">
                  {isChooseResponse ? 'Choose Response' : 'Multiple Choice'}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {currentQ.prompt || currentQ.question}
                </h3>
              </div>

              {/* Các phương án A, B, C, D */}
              <div className="space-y-3">
                {Object.entries(currentQ.options || {}).map(([key, label]) => {
                  const isSelected = answers[currentQ.id] === key;

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => onAnswerChange(currentQ.id, key)}
                      className={`w-full flex items-start gap-3.5 p-4 rounded-2xl border text-left text-sm transition-all cursor-pointer group ${
                        isSelected
                          ? 'border-[#153e75] bg-blue-50/70 text-slate-900 ring-2 ring-blue-400/30 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-[#faf9f6] text-slate-700'
                      }`}
                    >
                      {/* Vòng tròn chữ cái A, B, C, D */}
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 font-black text-xs transition-colors ${
                        isSelected 
                          ? 'bg-[#153e75] text-white shadow-2xs' 
                          : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                      }`}>
                        {key}
                      </span>

                      {/* Nội dung phương án */}
                      <span className="flex-1 pt-0.5 leading-relaxed font-medium">
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Điều hướng Câu trước / Câu tiếp theo */}
              <div className="flex justify-between items-center mt-8 pt-5 border-t border-slate-100">
                <button
                  type="button"
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex((prev) => prev - 1)}
                  className="text-xs font-bold px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors flex items-center gap-1.5"
                >
                  <span>← Câu trước</span>
                </button>

                <div className="text-[11px] font-semibold text-slate-400">
                  Câu {currentQIndex + 1} trên {questions.length}
                </div>

                <button
                  type="button"
                  disabled={currentQIndex === questions.length - 1}
                  onClick={() => setCurrentQIndex((prev) => prev + 1)}
                  className="text-xs font-bold px-5 py-2 rounded-xl bg-[#153e75] hover:bg-[#0f2e59] text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-all shadow-xs flex items-center gap-1.5 active:scale-95"
                >
                  <span>Câu tiếp theo →</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              <Info className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-xs font-semibold">Không tìm thấy câu hỏi nào cho bài thi này.</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
