import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Headphones, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  Eye,
  EyeOff,
  UserCheck,
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';

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
    // Ignore audio context autoplay restriction
  }
}

export default function SpeakingModule({ test, answers, onAnswerChange }) {
  const content = test.content || {};
  const isListenAndRepeat = test.task_type === 'listen_and_repeat' || test.task_type === 'listen_repeat' || !!content.items;
  const isInterview = test.task_type === 'take_an_interview' || test.task_type === 'interview' || !!content.questions;

  if (isListenAndRepeat) {
    return <ListenAndRepeatTask test={test} answers={answers} onAnswerChange={onAnswerChange} />;
  }

  if (isInterview) {
    return <TakeAnInterviewTask test={test} answers={answers} onAnswerChange={onAnswerChange} />;
  }

  // Fallback nếu bài đơn lẻ cũ
  return <TakeAnInterviewTask test={test} answers={answers} onAnswerChange={onAnswerChange} />;
}

// =====================================================================
// TASK 1: LISTEN AND REPEAT (7 CÂU - NO PREP TIME - PHẢN XẠ TỨC THÌ)
// =====================================================================
function ListenAndRepeatTask({ test, answers, onAnswerChange }) {
  const content = test.content || {};
  const items = content.items || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = items[currentIndex] || items[0] || {};

  // Phases: 'idle' | 'playing_audio' | 'speaking' | 'completed'
  const [phase, setPhase] = useState('idle');
  const [timeLeft, setTimeLeft] = useState(currentItem.speak_seconds || 10);
  const [recordings, setRecordings] = useState({});
  const [showTargetText, setShowTargetText] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Dọn dẹp micro và TTS khi rời trang
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  // Cập nhật thời gian khi đổi câu
  useEffect(() => {
    setPhase('idle');
    setShowTargetText(false);
    setTimeLeft(currentItem.speak_seconds || 10);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }, [currentIndex]);

  // Bộ đếm ngược thời gian nói
  useEffect(() => {
    let timer = null;
    if (phase === 'speaking') {
      if (timeLeft <= 0) {
        handleStopRecording();
        return;
      }
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [phase, timeLeft]);

  // 1. Phát câu thoại (Không hiện chữ)
  const handlePlayAudio = () => {
    if (!window.speechSynthesis) {
      alert('Trình duyệt không hỗ trợ Web Speech API.');
      return;
    }
    window.speechSynthesis.cancel();

    setPhase('playing_audio');
    const utterance = new SpeechSynthesisUtterance(currentItem.audio_text);
    utterance.lang = 'en-US';
    utterance.rate = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const usVoice = voices.find(v => v.lang === 'en-US' && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (usVoice) utterance.voice = usVoice;

    // Khi người bản xứ đọc xong -> Bíp -> Chuyển sang thu âm ngay (No Prep Time)
    utterance.onend = () => {
      playExamBeep();
      setTimeout(() => {
        startMicroRecording();
      }, 350);
    };

    utterance.onerror = () => {
      setPhase('idle');
    };

    window.speechSynthesis.speak(utterance);
  };

  // 2. Bắt đầu thu âm
  const startMicroRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        setRecordings((prev) => ({ ...prev, [currentItem.id]: audioUrl }));
        onAnswerChange(`spoken_repeat_${currentItem.id}`, audioUrl);
        onAnswerChange('spoken_audio', audioUrl); // Fallback

        // Tắt micro stream
        stream.getTracks().forEach((t) => t.stop());
      };

      recorder.start();
      setPhase('speaking');
      setTimeLeft(currentItem.speak_seconds || 10);
    } catch (err) {
      console.warn('Microphone access denied:', err);
      // Vẫn đếm giờ để người dùng tự luyện nói
      setPhase('speaking');
      setTimeLeft(currentItem.speak_seconds || 10);
    }
  };

  // 3. Dừng thu âm
  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setPhase('completed');

    // Tự động chuyển câu nếu người dùng bật
    if (autoAdvance && currentIndex < items.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 1500);
    }
  };

  const currentAudioUrl = recordings[currentItem.id] || answers[`spoken_repeat_${currentItem.id}`];

  return (
    <div className="space-y-6">
      
      {/* 1. Thanh tiêu đề & tiến trình 7 câu */}
      <div className="bg-white rounded-2xl border border-[#e2dcd2] p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                TASK 1: LISTEN AND REPEAT
              </span>
              <span className="text-xs font-bold text-slate-500">
                Format ETS 2026 • Độ khó tăng dần (7 câu)
              </span>
            </div>
            <h2 className="text-lg font-black text-slate-900">
              {test.title}
            </h2>
          </div>

          {/* Stepper 7 câu */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {items.map((it, idx) => {
              const isDone = !!recordings[it.id] || !!answers[`spoken_repeat_${it.id}`];
              const isCurrent = idx === currentIndex;

              return (
                <button
                  key={it.id || idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-8 h-8 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center ${
                    isCurrent
                      ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-300'
                      : isDone
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  title={`Câu ${idx + 1}: ${it.context}`}
                >
                  {isDone ? '✓' : idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hướng dẫn phòng thi chuẩn ETS */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Quy chế thi ETS 2026:</strong> Bạn sẽ nghe câu nói một lần duy nhất (không có chữ trên màn hình). Ngay sau tiếng bíp, hãy lặp lại chính xác từng từ vừa nghe vào micro. <strong>Không có thời gian chuẩn bị (No Prep Time)</strong>.
          </div>
        </div>
      </div>

      {/* 2. Thẻ Ngữ Cảnh & Máy Phát Audio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Cột trái: Thẻ ngữ cảnh hình ảnh & Trạng thái phát */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#e2dcd2] p-6 shadow-xs">
          
          {/* Header ngữ cảnh */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              CÂU {currentIndex + 1} / {items.length}
            </span>
            <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Ngữ cảnh: {currentItem.context || 'Campus Life'}
            </span>
          </div>

          {/* Visual Scene Card (Mô phỏng hình ảnh gợi ý khuôn viên trường) */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 text-white text-center shadow-inner relative overflow-hidden mb-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mx-auto mb-3 text-emerald-300">
              <Headphones className="w-8 h-8" />
            </div>

            <h3 className="font-bold text-base text-white mb-1">
              {currentItem.context}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-5">
              Độ dài: <span className="text-emerald-400 font-bold">{currentItem.word_count || 8} từ</span> • Thời gian nói: <span className="text-emerald-400 font-bold">{currentItem.speak_seconds || 10}s</span>
            </p>

            {/* Equalizer animation */}
            <div className="flex items-center justify-center gap-1.5 h-10 mb-5">
              {[40, 75, 35, 90, 60, 85, 45, 95, 65, 35, 75, 50].map((h, i) => (
                <span
                  key={i}
                  style={{ height: phase === 'playing_audio' ? `${h}%` : '15%' }}
                  className={`w-1.5 rounded-full transition-all duration-300 ${
                    phase === 'playing_audio' ? 'bg-emerald-400' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>

            {/* Nút hành động */}
            {phase === 'idle' && (
              <button
                onClick={handlePlayAudio}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 cursor-pointer flex items-center gap-2 mx-auto active:scale-95 transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Bắt đầu nghe câu {currentIndex + 1}</span>
              </button>
            )}

            {phase === 'playing_audio' && (
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold animate-pulse">
                <Volume2 className="w-4 h-4" />
                <span>Đang nghe người bản xứ phát âm... (Lắng nghe cẩn thận)</span>
              </div>
            )}

            {phase === 'speaking' && (
              <div className="p-4 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-300">
                <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span>🎙️ ĐANG GHI ÂM (SPEAK NOW!)</span>
                </div>
                <div className="text-4xl font-mono font-black text-white">
                  {timeLeft}s
                </div>
              </div>
            )}

            {phase === 'completed' && (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold">
                ✓ Đã hoàn thành thu âm câu {currentIndex + 1}!
              </div>
            )}
          </div>

          {/* Cài đặt tự động chuyển câu */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={autoAdvance}
                onChange={(e) => setAutoAdvance(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Tự động chuyển câu tiếp theo sau khi thu âm xong</span>
            </label>

            {phase === 'speaking' && (
              <button
                onClick={handleStopRecording}
                className="text-xs font-bold text-rose-600 hover:text-rose-800 cursor-pointer"
              >
                Dừng nói sớm
              </button>
            )}
          </div>
        </div>

        {/* Cột phải: Nghe lại bản thu âm & Chế độ ôn luyện (Transcript) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Thẻ bản thu âm của thí sinh */}
          <div className="bg-white rounded-3xl border border-[#e2dcd2] p-5 shadow-xs">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Mic className="w-4 h-4 text-emerald-600" />
              <span>Bản Thu Âm Của Bạn (Câu {currentIndex + 1})</span>
            </h4>

            {currentAudioUrl ? (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-500 block mb-2 font-medium">
                  Nghe lại câu trả lời vừa thu:
                </span>
                <audio controls src={currentAudioUrl} className="w-full h-10" />
                <div className="mt-3 flex justify-between items-center">
                  <button
                    onClick={handlePlayAudio}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Thu âm lại câu này</span>
                  </button>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Đã lưu
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Mic className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                <p className="text-xs">Chưa có bản thu âm cho câu này.</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Bấm nút "Bắt đầu nghe câu {currentIndex + 1}" để làm bài.</p>
              </div>
            )}
          </div>

          {/* Chế độ xem đáp án & Phiên âm (Chế độ tự học ôn luyện) */}
          <div className="bg-white rounded-3xl border border-[#e2dcd2] p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
                Chế độ ôn luyện (Transcript)
              </span>
              <button
                onClick={() => setShowTargetText(!showTargetText)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
              >
                {showTargetText ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showTargetText ? 'Ẩn câu nói' : 'Hiện câu nói'}</span>
              </button>
            </div>

            {showTargetText ? (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-slate-800 space-y-2 animate-in fade-in">
                <div>
                  <span className="text-[10px] font-bold uppercase text-amber-800 block">Câu nói chuẩn (Target Sentence):</span>
                  <p className="text-sm font-serif font-bold text-slate-900 leading-snug mt-0.5">
                    "{currentItem.audio_text}"
                  </p>
                </div>
                {currentItem.phonetic_guide && (
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Phiên âm IPA:</span>
                    <p className="text-xs font-mono text-slate-600 mt-0.5">
                      /{currentItem.phonetic_guide}/
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500 leading-relaxed">
                Đúng theo format ETS, câu nói sẽ bị ẩn trong lúc thi. Bạn có thể bật xem sau khi nói để tự so sánh độ chuẩn xác.
              </p>
            )}
          </div>

          {/* Nút chuyển câu kế tiếp */}
          <div className="flex justify-between items-center pt-2">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
            >
              ← Câu trước
            </button>

            <button
              disabled={currentIndex === items.length - 1}
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white disabled:opacity-30 cursor-pointer shadow-xs flex items-center gap-1"
            >
              <span>Câu tiếp theo</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

// =====================================================================
// TASK 2: TAKE AN INTERVIEW (4 CÂU - PHỎNG VẤN 45S - NO PREP TIME)
// =====================================================================
function TakeAnInterviewTask({ test, answers, onAnswerChange }) {
  const content = test.content || {};
  const questions = content.questions || [];
  const interviewer = content.interviewer || { name: 'Dr. Karen Mitchell', title: 'Dean of Student Affairs', avatar_initials: 'KM' };

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const currentQ = questions[currentQIndex] || questions[0] || {};

  // Phases: 'idle' | 'interviewer_speaking' | 'recording' | 'completed'
  const [phase, setPhase] = useState('idle');
  const [timeLeft, setTimeLeft] = useState(currentQ.speak_seconds || 45);
  const [recordings, setRecordings] = useState({});
  const [showSample, setShowSample] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Cleanup micro & TTS
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  // Đổi câu hỏi
  useEffect(() => {
    setPhase('idle');
    setShowSample(false);
    setTimeLeft(currentQ.speak_seconds || 45);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }, [currentQIndex]);

  // Đếm ngược 45 giây nói
  useEffect(() => {
    let timer = null;
    if (phase === 'recording') {
      if (timeLeft <= 0) {
        handleStopRecording();
        return;
      }
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [phase, timeLeft]);

  // 1. Phỏng vấn viên đặt câu hỏi
  const handleStartQuestion = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    setPhase('interviewer_speaking');
    const utterance = new SpeechSynthesisUtterance(currentQ.audio_text || currentQ.prompt || currentQ.question);
    utterance.lang = 'en-US';
    utterance.rate = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const usVoice = voices.find(v => v.lang === 'en-US' && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (usVoice) utterance.voice = usVoice;

    // Đọc xong -> Bíp -> Kích hoạt micro 45s nói ngay lập tức (No Prep Time)
    utterance.onend = () => {
      playExamBeep();
      setTimeout(() => {
        startRecordingInterview();
      }, 400);
    };

    utterance.onerror = () => {
      setPhase('idle');
    };

    window.speechSynthesis.speak(utterance);
  };

  // 2. Kích hoạt thu âm câu trả lời phỏng vấn
  const startRecordingInterview = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);

        setRecordings((prev) => ({ ...prev, [currentQ.id]: audioUrl }));
        onAnswerChange(`spoken_interview_${currentQ.id}`, audioUrl);
        onAnswerChange('spoken_audio', audioUrl); // Fallback

        stream.getTracks().forEach((t) => t.stop());
      };

      recorder.start();
      setPhase('recording');
      setTimeLeft(currentQ.speak_seconds || 45);
    } catch (err) {
      console.warn('Microphone error:', err);
      setPhase('recording');
      setTimeLeft(currentQ.speak_seconds || 45);
    }
  };

  // 3. Dừng thu âm
  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setPhase('completed');
  };

  const currentAudioUrl = recordings[currentQ.id] || answers[`spoken_interview_${currentQ.id}`];

  return (
    <div className="space-y-6">
      
      {/* 1. Header & Tiến trình 4 câu phỏng vấn */}
      <div className="bg-white rounded-2xl border border-[#e2dcd2] p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300">
                TASK 2: TAKE AN INTERVIEW
              </span>
              <span className="text-xs font-bold text-slate-500">
                Chủ đề: {content.topic || 'Campus Life'}
              </span>
            </div>
            <h2 className="text-lg font-black text-slate-900">
              {test.title}
            </h2>
          </div>

          {/* Stepper 4 câu hỏi */}
          <div className="flex items-center gap-2">
            {questions.map((q, idx) => {
              const isDone = !!recordings[q.id] || !!answers[`spoken_interview_${q.id}`];
              const isCurrent = idx === currentQIndex;

              return (
                <button
                  key={q.id || idx}
                  onClick={() => setCurrentQIndex(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isCurrent
                      ? 'bg-blue-800 text-white shadow-sm ring-2 ring-blue-300'
                      : isDone
                      ? 'bg-blue-50 text-blue-800 border border-blue-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>Câu {idx + 1}</span>
                  {isDone && <span className="text-[10px]">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cảnh báo không có thời gian chuẩn bị */}
        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3 text-xs text-blue-950 flex items-start gap-2.5">
          <Clock className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Mô phỏng phỏng vấn thực tế:</strong> Người phỏng vấn sẽ đặt câu hỏi qua audio. Sau khi câu hỏi kết thúc, bạn có <strong>45 giây để trả lời ngay lập tức (hoàn toàn không có thời gian chuẩn bị)</strong>.
          </div>
        </div>
      </div>

      {/* 2. Khung Tương Tác Phỏng Vấn Viên & Thí Sinh */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Cột trái: Phỏng vấn viên ảo (Simulated Interviewer Card) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#e2dcd2] p-6 shadow-xs">
          
          {/* Card phỏng vấn viên */}
          <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-800 text-white flex items-center justify-center font-black text-sm shadow-md">
              {interviewer.avatar_initials || 'IN'}
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">
                {interviewer.name}
              </h4>
              <span className="text-xs text-slate-500 font-medium">
                {interviewer.title}
              </span>
            </div>
          </div>

          {/* Khung câu hỏi của người phỏng vấn */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6 relative">
            <span className="text-[10px] font-black uppercase text-blue-800 tracking-wider block mb-2">
              Câu hỏi {currentQIndex + 1} / {questions.length}:
            </span>
            <p className="text-base font-serif font-semibold text-slate-900 leading-relaxed">
              "{currentQ.audio_text || currentQ.prompt || currentQ.question}"
            </p>

            {phase === 'interviewer_speaking' && (
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-100/70 p-2.5 rounded-xl animate-pulse">
                <Volume2 className="w-4 h-4" />
                <span>Người phỏng vấn đang đặt câu hỏi... Hãy chú ý lắng nghe!</span>
              </div>
            )}
          </div>

          {/* Bảng điều khiển thu âm */}
          <div className="text-center py-4">
            {phase === 'idle' && (
              <div>
                <p className="text-xs text-slate-500 mb-4">
                  Bấm nút bên dưới để nghe người phỏng vấn đọc câu hỏi và bắt đầu 45 giây nói ngay lập tức:
                </p>
                <button
                  onClick={handleStartQuestion}
                  className="px-8 py-3.5 bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs rounded-2xl shadow-lg shadow-blue-800/25 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Bắt đầu câu hỏi {currentQIndex + 1}</span>
                </button>
              </div>
            )}

            {phase === 'recording' && (
              <div className="p-6 rounded-3xl bg-rose-50 border border-rose-300 ring-4 ring-rose-200 animate-in zoom-in-95">
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-rose-800 uppercase tracking-widest mb-2">
                  <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping" />
                  <span>ĐANG GHI ÂM CÂU TRẢ LỜI (45S SPEAKING)</span>
                </div>
                <div className="text-6xl font-mono font-black text-rose-700 my-2">
                  {timeLeft}s
                </div>
                <p className="text-xs text-rose-900 max-w-sm mx-auto mb-4">
                  Hãy trình bày rõ ràng, sử dụng luận điểm và ví dụ cá nhân để trả lời câu hỏi của người phỏng vấn.
                </p>
                <button
                  onClick={handleStopRecording}
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer shadow-xs"
                >
                  Hoàn thành câu trả lời sớm
                </button>
              </div>
            )}

            {phase === 'completed' && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center justify-center gap-2 text-emerald-800 font-bold text-sm mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Đã ghi âm câu trả lời cho Câu {currentQIndex + 1}!</span>
                </div>
                <p className="text-xs text-slate-500">
                  Bạn có thể nghe lại bên phải hoặc bấm câu tiếp theo để tiếp tục buổi phỏng vấn.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Cột phải: Nghe lại bản ghi âm & Lời giải mẫu Band 6.0 */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Bản thu âm của bạn */}
          <div className="bg-white rounded-3xl border border-[#e2dcd2] p-5 shadow-xs">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Mic className="w-4 h-4 text-blue-700" />
              <span>Bản Thu Âm Phỏng Vấn (Câu {currentQIndex + 1})</span>
            </h4>

            {currentAudioUrl ? (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-500 block mb-2 font-medium">
                  Nghe lại câu trả lời phỏng vấn:
                </span>
                <audio controls src={currentAudioUrl} className="w-full h-10" />
                <div className="mt-3 flex justify-between items-center">
                  <button
                    onClick={handleStartQuestion}
                    className="text-xs font-bold text-blue-800 hover:text-blue-950 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Luyện nói lại câu này</span>
                  </button>
                  <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full">
                    Đã lưu câu trả lời
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Mic className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                <p className="text-xs">Chưa có bản thu âm cho câu hỏi này.</p>
              </div>
            )}
          </div>

          {/* Câu trả lời mẫu Band 6.0 tham khảo */}
          <div className="bg-white rounded-3xl border border-[#e2dcd2] p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Câu Trả Lời Mẫu (Band 6.0)</span>
              </span>
              <button
                onClick={() => setShowSample(!showSample)}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 cursor-pointer"
              >
                {showSample ? 'Ẩn câu trả lời' : 'Xem câu trả lời'}
              </button>
            </div>

            {showSample ? (
              <div className="space-y-3 animate-in fade-in">
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-slate-800 text-xs leading-relaxed font-serif italic">
                  "{currentQ.sample_answer}"
                </div>

                {currentQ.key_points && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1.5">
                      Checklist tiêu chí cần đạt:
                    </span>
                    <ul className="space-y-1 text-slate-700">
                      {currentQ.key_points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500 leading-relaxed">
                Xem gợi ý bài nói đạt điểm tối đa (Band 6.0) cùng các tiêu chí chấm điểm ngữ pháp và tính mạch lạc.
              </p>
            )}
          </div>

          {/* Nút chuyển câu hỏi phỏng vấn */}
          <div className="flex justify-between items-center pt-2">
            <button
              disabled={currentQIndex === 0}
              onClick={() => setCurrentQIndex((prev) => prev - 1)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
            >
              ← Câu trước
            </button>

            <button
              disabled={currentQIndex === questions.length - 1}
              onClick={() => setCurrentQIndex((prev) => prev + 1)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-800 hover:bg-blue-900 text-white disabled:opacity-30 cursor-pointer shadow-xs flex items-center gap-1"
            >
              <span>Câu hỏi tiếp theo</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
