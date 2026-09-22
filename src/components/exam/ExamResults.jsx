import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, Clock, RotateCcw, Home, HelpCircle, Layers, BookOpen, Headphones, PenTool, Mic, Zap, Sparkles } from 'lucide-react';
import WritingAIEvaluation from './WritingAIEvaluation';
import SpeakingAIEvaluation from './SpeakingAIEvaluation';
import ObjectiveAIEvaluation from './ObjectiveAIEvaluation';
import FullExamAIEvaluation from './FullExamAIEvaluation';
import { convert30ToBand6, convertRawToScale30, isGeminiConfigured } from '../../lib/gemini';
import { saveExamResult, getStoredAIEvaluation, storeAIEvaluation } from '../../lib/supabase';

// Component hiển thị dòng chữ Processing chạy động khi AI đang tính toán
function ProcessingScoreBadge({ color = 'teal', subtitle = 'AI đang tính toán chuẩn ETS 2026...' }) {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '.' : prev + '.'));
    }, 450);
    return () => clearInterval(interval);
  }, []);

  const colorStyles = {
    teal: {
      text: 'text-teal-700',
      dot: 'bg-teal-500',
      icon: 'text-teal-600',
      sub: 'text-teal-700'
    },
    slate: {
      text: 'text-slate-700',
      dot: 'bg-slate-500',
      icon: 'text-slate-600',
      sub: 'text-slate-500'
    },
    rose: {
      text: 'text-rose-700',
      dot: 'bg-rose-500',
      icon: 'text-rose-600',
      sub: 'text-rose-600'
    },
    white: {
      text: 'text-white',
      dot: 'bg-teal-300',
      icon: 'text-teal-300',
      sub: 'text-teal-200'
    }
  };

  const style = colorStyles[color] || colorStyles.teal;

  return (
    <div className="py-2 flex flex-col items-center justify-center">
      <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl transition-all">
        <Sparkles className={`w-5 h-5 ${style.icon} animate-spin`} />
        <span className={`text-2xl sm:text-3xl font-black font-mono tracking-wider uppercase ${style.text}`}>
          Processing{dots}
        </span>
        <span className="flex items-center gap-1 ml-0.5">
          <span className={`w-1.5 h-1.5 rounded-full ${style.dot} animate-bounce`} style={{ animationDelay: '0ms' }} />
          <span className={`w-1.5 h-1.5 rounded-full ${style.dot} animate-bounce`} style={{ animationDelay: '150ms' }} />
          <span className={`w-1.5 h-1.5 rounded-full ${style.dot} animate-bounce`} style={{ animationDelay: '300ms' }} />
        </span>
      </div>
      {subtitle && (
        <span className={`text-[10px] sm:text-[11px] font-semibold block mt-1 text-center animate-pulse ${style.sub}`}>
          {subtitle}
        </span>
      )}
    </div>
  );
}

export default function ExamResults({ test, results, onRetake, onBackHome, isReviewMode = false }) {
  const [selectedSkillFilter, setSelectedSkillFilter] = useState('all');

  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const { score_band, score_raw, total_questions, time_spent_seconds, user_submission, skill, is_full_test, skill_scores } = results;
  const currentSkill = (skill || test.skill || '').toLowerCase();
  const isFullExam = is_full_test || currentSkill === 'full';
  const isWritingExam = currentSkill === 'writing';
  const isSpeakingExam = currentSkill === 'speaking';
  const isReadingExam = currentSkill === 'reading';
  const isListeningExam = currentSkill === 'listening';

  const minutes = Math.floor((time_spent_seconds || 0) / 60);
  const seconds = (time_spent_seconds || 0) % 60;
  const timeFormatted = `${minutes}m ${seconds}s`;

  const legacyScore30 = total_questions > 0 ? Math.round((score_raw / total_questions) * 30) : 26;

  // Kiểm tra cấu trúc module
  const isModuleGrouped = Array.isArray(user_submission) && user_submission.length > 0 && (user_submission[0]?.module_title || user_submission[0]?.title);

  // Lọc module theo filter kỹ năng (nếu là full test)
  const filteredModules = isModuleGrouped
    ? user_submission.filter((mod) => {
        if (selectedSkillFilter === 'all') return true;
        const modSkill = (mod.skill || '').toLowerCase();
        return modSkill === selectedSkillFilter;
      })
    : user_submission;

  const getSkillColor = (s) => {
    switch ((s || '').toLowerCase()) {
      case 'reading': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'listening': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'writing': return 'text-rose-700 bg-rose-50 border-rose-200';
      case 'speaking': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      default: return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  // Trích xuất bài viết Writing (Email & Academic Discussion)
  const writingSubmissions = results.writing_submissions || (() => {
    const found = { email: null, discussion: null };
    const scanItems = (items) => {
      if (!Array.isArray(items)) return;
      items.forEach((it) => {
        if (it.task_type === 'write_email' || it.task_data?.scenario) {
          found.email = it.task_data || { essay_text: it.essay_text };
        } else if (it.task_type === 'academic_discussion' || it.task_data?.professor_question) {
          found.discussion = it.task_data || { essay_text: it.essay_text };
        }
      });
    };

    if (Array.isArray(user_submission)) {
      user_submission.forEach((mod) => {
        scanItems(mod.items);
      });
    }
    return found;
  })();

  // Trích xuất bài nói Speaking (Listen & Repeat + Interview)
  const speakingSubmissions = results.speaking_submissions || (() => {
    const found = { repeat_items: [], interview_items: [] };
    const scanItems = (items) => {
      if (!Array.isArray(items)) return;
      items.forEach((it) => {
        if (it.prompt?.includes('Listen & Repeat') || it.phonetic_guide) {
          found.repeat_items.push({ text: it.correct_answer || it.prompt, audio_url: it.audio_url, is_recorded: !!it.audio_url });
        } else if (it.audio_url || it.prompt?.includes('phỏng vấn')) {
          found.interview_items.push({ question: it.prompt, audio_url: it.audio_url, is_recorded: !!it.audio_url });
        }
      });
    };
    if (Array.isArray(user_submission)) {
      user_submission.forEach((mod) => scanItems(mod.items));
    }
    return found;
  })();

  const hasWritingContent = Boolean(
    (writingSubmissions?.email?.essay_text && writingSubmissions.email.essay_text.trim()) ||
    (writingSubmissions?.discussion?.essay_text && writingSubmissions.discussion.essay_text.trim())
  );

  const isConfigured = isGeminiConfigured();

  // Lấy cache AI nếu có (bảo vệ trường hợp Supabase chưa kịp sync hoặc xem lại bài làm đã chấm)
  const cachedAi = getStoredAIEvaluation(test?.id, results?.id, results?.completed_at);

  const [aiWritingResult, setAiWritingResult] = useState(
    results.ai_writing_result || results.skill_scores?.ai_writing_result || cachedAi?.ai_writing_result || null
  );
  const [aiSpeakingResult, setAiSpeakingResult] = useState(
    results.ai_speaking_result || results.skill_scores?.ai_speaking_result || cachedAi?.ai_speaking_result || null
  );
  const [aiObjectiveResult, setAiObjectiveResult] = useState(
    results.ai_objective_result || results.skill_scores?.ai_objective_result || cachedAi?.ai_objective_result || null
  );
  const [aiFullResult, setAiFullResult] = useState(
    results.ai_full_result || results.skill_scores?.ai_full_result || cachedAi?.ai_full_result || null
  );

  const hasStoredWriting = Boolean(results.ai_writing_result || results.skill_scores?.ai_writing_result || cachedAi?.ai_writing_result);
  const hasStoredSpeaking = Boolean(results.ai_speaking_result || results.skill_scores?.ai_speaking_result || cachedAi?.ai_speaking_result);
  const hasStoredObjective = Boolean(results.ai_objective_result || results.skill_scores?.ai_objective_result || cachedAi?.ai_objective_result);
  const hasStoredFull = Boolean(results.ai_full_result || results.skill_scores?.ai_full_result || cachedAi?.ai_full_result);

  const [isAiGradingWriting, setIsAiGradingWriting] = useState(
    !isReviewMode && !hasStoredWriting && (isWritingExam || (isFullExam && hasWritingContent)) && isConfigured
  );
  const [isAiGradingSpeaking, setIsAiGradingSpeaking] = useState(
    !isReviewMode && !hasStoredSpeaking && (isSpeakingExam || isFullExam) && (speakingSubmissions.repeat_items?.length > 0 || speakingSubmissions.interview_items?.length > 0) && isConfigured
  );
  const [isAiGradingObjective, setIsAiGradingObjective] = useState(
    !isReviewMode && !hasStoredObjective && (isReadingExam || isListeningExam) && total_questions > 0 && isConfigured
  );
  const [isAiGradingFull, setIsAiGradingFull] = useState(
    !isReviewMode && !hasStoredFull && isFullExam && isConfigured
  );

  // Khởi tạo điểm số chuẩn ETS cho 4 kỹ năng (hỗ trợ cập nhật động khi AI chấm xong hoặc lấy từ kết quả đã lưu)
  const [aiScores, setAiScores] = useState({
    reading: results.skill_scores?.reading ?? (isReadingExam ? ((results.ai_objective_result || cachedAi?.ai_objective_result)?.scaled_score_30 ?? convertRawToScale30(score_raw, total_questions, 'reading')) : 26),
    listening: results.skill_scores?.listening ?? (isListeningExam ? ((results.ai_objective_result || cachedAi?.ai_objective_result)?.scaled_score_30 ?? convertRawToScale30(score_raw, total_questions, 'listening')) : 25),
    writing: results.skill_scores?.writing ?? (isWritingExam ? ((results.ai_writing_result || cachedAi?.ai_writing_result)?.combined_score_30 ?? legacyScore30) : 26),
    speaking: results.skill_scores?.speaking ?? (isSpeakingExam ? ((results.ai_speaking_result || cachedAi?.ai_speaking_result)?.score_30 ?? 25) : 25),
  });

  const handleSkillScoreUpdate = async (skillKey, newScore30, fullObj = null) => {
    setAiScores((prev) => {
      const next = { ...prev };
      if (newScore30 !== null && newScore30 !== undefined) {
        next[skillKey] = newScore30;
      }
      return next;
    });

    let updatedWriting = aiWritingResult;
    let updatedSpeaking = aiSpeakingResult;
    let updatedObjective = aiObjectiveResult;
    let updatedFull = aiFullResult;

    if (skillKey === 'writing') {
      updatedWriting = fullObj;
      setAiWritingResult(fullObj);
      setIsAiGradingWriting(false);
    } else if (skillKey === 'speaking') {
      updatedSpeaking = fullObj;
      setAiSpeakingResult(fullObj);
      setIsAiGradingSpeaking(false);
    } else if (skillKey === 'reading' || skillKey === 'listening') {
      updatedObjective = fullObj;
      setAiObjectiveResult(fullObj);
      setIsAiGradingObjective(false);
    } else if (skillKey === 'full') {
      updatedFull = fullObj;
      setAiFullResult(fullObj);
      setIsAiGradingFull(false);
    }

    // Lưu ngay vào localStorage cache độc lập để bất kể Supabase RLS có bị chặn thì dữ liệu AI vẫn không mất
    storeAIEvaluation(test?.id, results?.id, results?.completed_at, {
      ai_writing_result: updatedWriting,
      ai_speaking_result: updatedSpeaking,
      ai_objective_result: updatedObjective,
      ai_full_result: updatedFull
    });

    try {
      if (isFullExam) {
        const r = skillKey === 'reading' ? (newScore30 ?? aiScores.reading) : (aiScores.reading ?? results.skill_scores?.reading ?? 26);
        const l = skillKey === 'listening' ? (newScore30 ?? aiScores.listening) : (aiScores.listening ?? results.skill_scores?.listening ?? 25);
        const w = skillKey === 'writing' ? (newScore30 ?? aiScores.writing) : (aiScores.writing ?? results.skill_scores?.writing ?? 26);
        const s = skillKey === 'speaking' ? (newScore30 ?? aiScores.speaking) : (aiScores.speaking ?? results.skill_scores?.speaking ?? 25);
        const total = r + l + w + s;
        const band = convert30ToBand6(total / 4);

        await saveExamResult({
          ...results,
          id: results.id,
          score_band: band,
          score_raw: total,
          skill_scores: { reading: r, listening: l, writing: w, speaking: s, total },
          ai_writing_result: updatedWriting,
          ai_speaking_result: updatedSpeaking,
          ai_objective_result: updatedObjective,
          ai_full_result: updatedFull,
          speaking_submissions: speakingSubmissions,
          writing_submissions: writingSubmissions
        });
      } else {
        const score30 = (newScore30 !== null && newScore30 !== undefined) ? newScore30 : (aiScores[currentSkill] ?? score_raw);
        const band = (fullObj && fullObj.toefl_band_6) ? fullObj.toefl_band_6 : convert30ToBand6(score30);

        await saveExamResult({
          ...results,
          id: results.id,
          score_band: band,
          score_raw: score30,
          ai_writing_result: updatedWriting,
          ai_speaking_result: updatedSpeaking,
          ai_objective_result: updatedObjective,
          ai_full_result: updatedFull,
          speaking_submissions: speakingSubmissions,
          writing_submissions: writingSubmissions
        });
      }
    } catch (e) {
      console.warn('Lỗi khi cập nhật kết quả thi lên database:', e);
    }
  };

  const handleGradingStart = () => {
    setIsAiGradingWriting(true);
  };

  const handleEvaluationComplete = (evalResult) => {
    handleSkillScoreUpdate('writing', evalResult.combined_score_30, evalResult);
    setIsAiGradingWriting(false);
  };

  // Điểm cho Full Test khi tính cả 4 kỹ năng do AI chấm
  const effectiveTotal120 = (aiScores.reading ?? 26) 
    + (aiScores.listening ?? 25) 
    + (aiScores.writing ?? 26) 
    + (aiScores.speaking ?? 25);

  const effectiveBand6 = convert30ToBand6(effectiveTotal120 / 4);

  // Điểm cho Single Writing Test
  const finalWritingBand6 = aiWritingResult 
    ? (aiWritingResult.toefl_band_6 || convert30ToBand6(aiWritingResult.combined_score_30))
    : convert30ToBand6(aiScores.writing);

  const finalWritingScore30 = aiWritingResult 
    ? aiWritingResult.combined_score_30 
    : aiScores.writing;

  // Điểm cho Single Speaking Test
  const finalSpeakingBand6 = aiSpeakingResult 
    ? (aiSpeakingResult.toefl_band_6 || convert30ToBand6(aiSpeakingResult.score_30))
    : convert30ToBand6(aiScores.speaking);

  const finalSpeakingScore30 = aiSpeakingResult 
    ? aiSpeakingResult.score_30 
    : aiScores.speaking;

  // Điểm cho Single Reading / Listening Test
  const objectiveScore = aiScores[currentSkill] ?? convertRawToScale30(score_raw, total_questions, currentSkill);
  const finalObjectiveBand6 = aiObjectiveResult 
    ? (aiObjectiveResult.toefl_band_6 || convert30ToBand6(aiObjectiveResult.scaled_score_30))
    : convert30ToBand6(objectiveScore);

  const finalObjectiveScore30 = aiObjectiveResult 
    ? aiObjectiveResult.scaled_score_30 
    : objectiveScore;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      
      {/* 1. Banner Điểm số Tổng kết */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-blue-500 via-rose-500 to-emerald-500" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>
            {isFullExam 
              ? 'ĐÃ HOÀN THÀNH TOÀN BỘ 4 KỸ NĂNG (FULL SIMULATION)' 
              : `ĐÃ HOÀN THÀNH TẤT CẢ CÁC MODULE CỦA PHẦN THI (${(skill || test.skill)?.toUpperCase()})`}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
          {test.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mb-8 uppercase tracking-wider font-semibold">
          {isFullExam 
            ? 'Báo Cáo Điểm Tổng Hợp 4 Kỹ Năng • Format TOEFL iBT 2026' 
            : 'Tổng điểm toàn kỹ năng • Format TOEFL iBT 2026'}
        </p>

        {isFullExam ? (
          /* ========================================================
             GIAO DIỆN BẢNG ĐIỂM CHUẨN ETS CHO FULL TEST (0 - 120)
             ======================================================== */
          <div className="space-y-6 mb-8">
            {/* Hàng trên: Tổng điểm 120 & Band 6.0 & Thời gian */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {/* Tổng điểm 0 - 120 */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0f2e59] to-[#153e75] text-white shadow-md">
                <span className="text-[11px] font-extrabold text-teal-300 uppercase tracking-wider block mb-1">
                  Tổng Điểm TOEFL (0 - 120)
                </span>
                {(isAiGradingWriting || isAiGradingSpeaking || isAiGradingFull) && !aiFullResult ? (
                  <ProcessingScoreBadge 
                    color="white" 
                    subtitle="AI đang phân tích & tổng hợp 4 kỹ năng..." 
                  />
                ) : (
                  <div>
                    <div className="text-4xl sm:text-5xl font-black text-white">
                      {effectiveTotal120}
                      <span className="text-base text-slate-300 font-medium ml-1">/ 120</span>
                    </div>
                    <span className="text-[10px] text-slate-300 font-medium block mt-1.5">
                      {aiFullResult ? '✨ AI Đã Hoàn Tất Báo Cáo 4 Kỹ Năng' : 'Thang điểm chuẩn ETS toàn cầu'}
                    </span>
                  </div>
                )}
              </div>

              {/* Band Score 2026 */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-teal-50 to-emerald-50/50 border border-teal-200 text-center shadow-xs">
                <span className="text-[11px] font-bold text-teal-800 uppercase block mb-1">
                  TOEFL Band (2026)
                </span>
                {(isAiGradingWriting || isAiGradingSpeaking || isAiGradingFull) && !aiFullResult ? (
                  <ProcessingScoreBadge 
                    color="teal" 
                    subtitle="Đang đánh giá khung CEFR 2026..." 
                  />
                ) : (
                  <div>
                    <div className="text-4xl sm:text-5xl font-black text-teal-700">
                      {effectiveBand6?.toFixed(1) || '5.5'}
                      <span className="text-base text-teal-600 font-medium ml-1">/ 6.0</span>
                    </div>
                    <span className="text-[10px] text-teal-600 font-semibold block mt-1.5">
                      Thang đo năng lực 6 bậc mới
                    </span>
                  </div>
                )}
              </div>

              {/* Thời gian làm bài */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-slate-600 uppercase block mb-1">
                  Thời Gian Hoàn Thành
                </span>
                <div className="text-3xl sm:text-4xl font-black text-slate-800 mt-1">
                  {timeFormatted}
                </div>
                <span className="text-[10px] text-slate-500 font-medium block mt-2">
                  Tổng thời lượng đề thi: ~90 phút
                </span>
              </div>
            </div>

            {/* 4 Thẻ Điểm Chi Tiết 4 Kỹ Năng (0 - 30 mỗi kỹ năng) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto pt-2">
              {/* Reading */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="flex items-center gap-1.5 text-xs font-black text-amber-900 uppercase">
                    <BookOpen className="w-4 h-4 text-amber-600" />
                    <span>Reading</span>
                  </span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                    30 Phút
                  </span>
                </div>
                <div className="text-2xl font-black text-amber-900">
                  {aiScores.reading ?? 26}
                  <span className="text-xs text-amber-700 font-semibold ml-0.5">/ 30</span>
                </div>
                <span className="text-[10px] text-amber-700 block mt-1">
                  2 Module MSAT thích ứng
                </span>
              </div>

              {/* Listening */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="flex items-center gap-1.5 text-xs font-black text-blue-900 uppercase">
                    <Headphones className="w-4 h-4 text-blue-600" />
                    <span>Listening</span>
                  </span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                    29 Phút
                  </span>
                </div>
                <div className="text-2xl font-black text-blue-900">
                  {aiScores.listening ?? 25}
                  <span className="text-xs text-blue-700 font-semibold ml-0.5">/ 30</span>
                </div>
                <span className="text-[10px] text-blue-700 block mt-1">
                  2 Module MSAT thích ứng
                </span>
              </div>

              {/* Writing (Thứ 3 theo yêu cầu) */}
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80 text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="flex items-center gap-1.5 text-xs font-black text-rose-900 uppercase">
                    <PenTool className="w-4 h-4 text-rose-600" />
                    <span>Writing</span>
                  </span>
                  {aiWritingResult ? (
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> AI Graded
                    </span>
                  ) : isAiGradingWriting ? (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded animate-pulse">
                      ✨ Đang chấm...
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                      23 Phút
                    </span>
                  )}
                </div>
                {isAiGradingWriting && !aiWritingResult ? (
                  <div className="text-sm font-black text-rose-700 animate-pulse flex items-center gap-1 font-mono uppercase py-1">
                    <Sparkles className="w-3 h-3 text-rose-600 animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="text-2xl font-black text-rose-900">
                    {finalWritingScore30}
                    <span className="text-xs text-rose-700 font-semibold ml-0.5">/ 30</span>
                  </div>
                )}
                <span className="text-[10px] text-rose-700 block mt-1 truncate">
                  {aiWritingResult 
                    ? `Email: ${aiWritingResult.email?.score_30 ?? '-'} | Discuss: ${aiWritingResult.discussion?.score_30 ?? '-'}` 
                    : '3 Tasks (Sentence, Email, Discuss)'}
                </span>
              </div>

              {/* Speaking */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="flex items-center gap-1.5 text-xs font-black text-emerald-900 uppercase">
                    <Mic className="w-4 h-4 text-emerald-600" />
                    <span>Speaking</span>
                  </span>
                  {aiSpeakingResult ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> AI Graded
                    </span>
                  ) : isAiGradingSpeaking ? (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded animate-pulse">
                      ✨ Đang chấm...
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                      8 Phút
                    </span>
                  )}
                </div>
                {isAiGradingSpeaking && !aiSpeakingResult ? (
                  <div className="text-sm font-black text-emerald-700 animate-pulse flex items-center gap-1 font-mono uppercase py-1">
                    <Sparkles className="w-3 h-3 text-emerald-600 animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="text-2xl font-black text-emerald-900">
                    {aiScores.speaking ?? 25}
                    <span className="text-xs text-emerald-700 font-semibold ml-0.5">/ 30</span>
                  </div>
                )}
                <span className="text-[10px] text-emerald-700 block mt-1">
                  2 Tasks (Repeat + Interview)
                </span>
              </div>
            </div>
          </div>
        ) : isWritingExam ? (
          /* ========================================================
             GIAO DIỆN BẢNG ĐIỂM CHUẨN ETS 2026 CHO BÀI THI WRITING (AI GRADED)
             ======================================================== */
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            {/* Band Score 2026 */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-teal-50 to-emerald-50/60 border border-teal-200 text-center shadow-xs">
              <div className="flex items-center justify-center gap-1.5 mb-1.5">
                <span className="text-[11px] font-extrabold text-teal-900 uppercase tracking-wider">
                  TOEFL Band (2026)
                </span>
                {aiWritingResult ? (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-teal-200/80 text-teal-900 text-[9px] font-black uppercase">
                    <Sparkles className="w-2.5 h-2.5 text-teal-700" />
                    AI Graded
                  </span>
                ) : isAiGradingWriting ? (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[9px] font-bold animate-pulse">
                    <Sparkles className="w-2.5 h-2.5 animate-spin" />
                    Processing...
                  </span>
                ) : null}
              </div>

              {isAiGradingWriting && !aiWritingResult ? (
                <ProcessingScoreBadge 
                  color="teal" 
                  subtitle="Gemini AI đang chấm theo barem ETS 2026..." 
                />
              ) : (
                <div>
                  <div className="text-4xl sm:text-5xl font-black text-teal-700">
                    {finalWritingBand6?.toFixed(1) || '5.0'}
                    <span className="text-sm text-teal-600 font-medium ml-1">/ 6.0</span>
                  </div>
                  <span className="text-[10px] text-teal-700 font-semibold block mt-1.5">
                    {aiWritingResult ? 'Thang đo năng lực 6 bậc TOEFL 2026' : 'Điểm toàn phần WRITING'}
                  </span>
                </div>
              )}
            </div>

            {/* Quy đổi thang 30 */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-50/50 to-white border border-rose-200 text-center shadow-xs">
              <span className="text-[11px] font-extrabold text-rose-900 uppercase tracking-wider block mb-1.5">
                Điểm Quy Đổi (0 - 30)
              </span>

              {isAiGradingWriting && !aiWritingResult ? (
                <ProcessingScoreBadge 
                  color="rose" 
                  subtitle="Đang tổng hợp Email (40%) + Thảo luận (60%)..." 
                />
              ) : (
                <div>
                  <div className="text-4xl sm:text-5xl font-black text-rose-700">
                    {finalWritingScore30}
                    <span className="text-sm text-rose-400 font-medium ml-1">/ 30</span>
                  </div>
                  <span className="text-[10px] text-rose-600 font-medium block mt-1.5">
                    {aiWritingResult 
                      ? `Email: ${aiWritingResult.email?.score_30 ?? '-'}đ • Thảo luận: ${aiWritingResult.discussion?.score_30 ?? '-'}đ` 
                      : 'Thang điểm TOEFL iBT truyền thống'}
                  </span>
                </div>
              )}
            </div>

            {/* Chi tiết 2 bài viết */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col justify-between shadow-xs">
              <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block mb-1">
                Chi Tiết 2 Bài Viết
              </span>

              {isAiGradingWriting && !aiWritingResult ? (
                <div className="py-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold animate-pulse">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                    Đang phân tích bài viết...
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium block mt-2">
                    Thời gian làm bài: {timeFormatted}
                  </span>
                </div>
              ) : aiWritingResult ? (
                <div>
                  <div className="flex items-center justify-center gap-2 my-1">
                    <span className="px-2 py-1 rounded-lg bg-white border border-rose-200 text-rose-800 text-xs font-black shadow-2xs">
                      Email: {aiWritingResult.email?.score_30 ?? '-'}/30
                    </span>
                    <span className="px-2 py-1 rounded-lg bg-white border border-indigo-200 text-indigo-800 text-xs font-black shadow-2xs">
                      Discuss: {aiWritingResult.discussion?.score_30 ?? '-'}/30
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium block mt-2">
                    Thời gian làm bài: {timeFormatted}
                  </span>
                </div>
              ) : (
                <div>
                  <div className="text-3xl font-black text-slate-800 mt-0.5">
                    {score_raw}
                    <span className="text-sm text-slate-400 font-medium ml-1">/ {total_questions}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium block mt-1.5">
                    Thời gian: {timeFormatted}
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : isSpeakingExam ? (
          /* ========================================================
             GIAO DIỆN BẢNG ĐIỂM CHUẨN ETS 2026 CHO BÀI THI SPEAKING (AI GRADED)
             ======================================================== */
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            {/* Band Score 2026 */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-teal-50 to-emerald-50/50 border border-teal-200 text-center shadow-xs">
              <span className="text-[11px] font-extrabold text-teal-800 uppercase tracking-wider block mb-1">
                TOEFL Band (2026)
              </span>
              {isAiGradingSpeaking && !aiSpeakingResult ? (
                <ProcessingScoreBadge 
                  color="teal" 
                  subtitle="AI đang nghe & chấm bài nói theo tiêu chí ETS..." 
                />
              ) : (
                <>
                  <div className="text-4xl sm:text-5xl font-black text-teal-700">
                    {finalSpeakingBand6?.toFixed(1) || '5.5'}
                    <span className="text-base text-teal-600 font-medium ml-1">/ 6.0</span>
                  </div>
                  <span className="text-[10px] text-teal-600 font-semibold block mt-1.5">
                    {aiSpeakingResult ? '✨ AI Đã Đánh Giá Chuẩn ETS' : 'Thang đo năng lực 6 bậc mới'}
                  </span>
                </>
              )}
            </div>

            {/* Quy đổi thang 0 - 30 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center shadow-xs">
              <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block mb-1">
                Điểm Quy Đổi (0 - 30)
              </span>
              {isAiGradingSpeaking && !aiSpeakingResult ? (
                <ProcessingScoreBadge 
                  color="slate" 
                  subtitle="Đang quy đổi thang điểm truyền thống ETS..." 
                />
              ) : (
                <>
                  <div className="text-4xl sm:text-5xl font-black text-slate-800">
                    {finalSpeakingScore30}
                    <span className="text-base text-slate-400 font-medium ml-1">/ 30</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium block mt-1.5">
                    Thang điểm truyền thống ETS
                  </span>
                </>
              )}
            </div>

            {/* Chi tiết dữ liệu thu âm */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col justify-between shadow-xs">
              <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block mb-1">
                Dữ Liệu Thu Âm
              </span>
              <div>
                <div className="flex items-center justify-center gap-2 my-1">
                  <span className="px-2 py-1 rounded-lg bg-white border border-teal-200 text-teal-800 text-xs font-black shadow-2xs">
                    Repeat: {speakingSubmissions.repeat_items?.length || 0}
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-white border border-indigo-200 text-indigo-800 text-xs font-black shadow-2xs">
                    Interview: {speakingSubmissions.interview_items?.length || 0}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium block mt-2">
                  Thời gian làm bài: {timeFormatted}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================
             GIAO DIỆN BẢNG ĐIỂM CHUẨN ETS 2026 CHO READING / LISTENING (ADAPTIVE MSAT)
             ======================================================== */
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            {/* Band Score 2026 */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-teal-50 to-emerald-50/50 border border-teal-200 text-center shadow-xs">
              <span className="text-[11px] font-extrabold text-teal-800 uppercase tracking-wider block mb-1">
                TOEFL Band (2026)
              </span>
              {isAiGradingObjective && !aiObjectiveResult ? (
                <ProcessingScoreBadge 
                  color="teal" 
                  subtitle="AI đang phân tích & chuẩn hóa Band điểm ETS 2026..." 
                />
              ) : (
                <>
                  <div className="text-4xl sm:text-5xl font-black text-teal-700">
                    {finalObjectiveBand6?.toFixed(1) || '5.5'}
                    <span className="text-base text-teal-600 font-medium ml-1">/ 6.0</span>
                  </div>
                  <span className="text-[10px] text-teal-600 font-semibold block mt-1.5">
                    {aiObjectiveResult ? '✨ AI Đã Chuẩn Hóa Phổ Điểm' : 'Thang đo năng lực 6 bậc mới'}
                  </span>
                </>
              )}
            </div>

            {/* Quy đổi thang 0 - 30 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center shadow-xs">
              <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block mb-1">
                Điểm Quy Đổi (0 - 30)
              </span>
              {isAiGradingObjective && !aiObjectiveResult ? (
                <ProcessingScoreBadge 
                  color="slate" 
                  subtitle="Đang hiệu chuẩn đường cong MSAT 2026..." 
                />
              ) : (
                <>
                  <div className="text-4xl sm:text-5xl font-black text-slate-800">
                    {finalObjectiveScore30}
                    <span className="text-base text-slate-400 font-medium ml-1">/ 30</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium block mt-1.5">
                    Hiệu chuẩn phi tuyến tính ETS
                  </span>
                </>
              )}
            </div>

            {/* Tổng số câu đúng */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col justify-between shadow-xs">
              <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block mb-1">
                Tổng Số Câu Đúng
              </span>
              <div>
                <div className="text-3xl font-black text-slate-800 mt-0.5">
                  {score_raw}
                  <span className="text-sm text-slate-400 font-medium ml-1">/ {total_questions}</span>
                  <span className="text-xs text-teal-600 font-bold ml-2">
                    ({Math.round((score_raw / (total_questions || 1)) * 100)}%)
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium block mt-2">
                  Thời gian: {timeFormatted}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Nút hành động */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onRetake}
            className="px-6 py-2.5 rounded-xl bg-[#153e75] hover:bg-[#0f2e59] text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm active:scale-95 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Làm lại toàn bộ bài thi này</span>
          </button>

          <button
            onClick={onBackHome}
            className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Về danh sách bài thi</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          CÁC KHỐI CHẤM ĐIỂM & ĐÁNH GIÁ CHUYÊN SÂU BẰNG GEMINI AI
          ======================================================== */}

      {/* 1. BÀI THI FULL TEST: BÁO CÁO TOÀN DIỆN 4 KỸ NĂNG VÀ TABS CHI TIẾT */}
      {isFullExam && (
        <FullExamAIEvaluation
          results={results}
          testTitle={test.title}
          autoStart={!isReviewMode && !hasStoredFull && !aiFullResult}
          isReviewMode={isReviewMode}
          existingEvaluation={aiFullResult}
          aiWritingResult={aiWritingResult}
          aiSpeakingResult={aiSpeakingResult}
          aiObjectiveResult={aiObjectiveResult}
          aiScores={aiScores}
          onSkillScoreUpdate={handleSkillScoreUpdate}
          onGradingStart={() => setIsAiGradingFull(true)}
        />
      )}

      {/* 2. BÀI THI WRITING ĐƠN LẺ: CHẤM 2 BÀI VIẾT (EMAIL + DISCUSSION) */}
      {isWritingExam && (
        <WritingAIEvaluation 
          writingSubmissions={writingSubmissions} 
          autoStart={!isReviewMode && !hasStoredWriting && !aiWritingResult}
          existingEvaluation={aiWritingResult}
          onGradingStart={() => setIsAiGradingWriting(true)}
          onEvaluationComplete={(evalResult) => {
            handleSkillScoreUpdate('writing', evalResult.combined_score_30, evalResult);
          }}
        />
      )}

      {/* 3. BÀI THI SPEAKING ĐƠN LẺ: CHẤM PHÁT ÂM, NGỮ PHÁP, Ý TƯỞNG THEO TIÊU CHÍ ETS */}
      {isSpeakingExam && (
        <SpeakingAIEvaluation
          speakingSubmissions={speakingSubmissions}
          autoStart={!isReviewMode && !hasStoredSpeaking && !aiSpeakingResult}
          existingEvaluation={aiSpeakingResult}
          onGradingStart={() => setIsAiGradingSpeaking(true)}
          onEvaluationComplete={(res) => handleSkillScoreUpdate('speaking', res.score_30, res)}
        />
      )}

      {/* 4. BÀI THI READING HOẶC LISTENING ĐƠN LẺ: MA TRẬN KỸ NĂNG & HIỆU CHUẨN MSAT */}
      {(isReadingExam || isListeningExam) && (
        <ObjectiveAIEvaluation
          skill={currentSkill}
          userSubmission={user_submission}
          scoreRaw={score_raw}
          totalQuestions={total_questions}
          timeSpentSeconds={time_spent_seconds}
          testTitle={test.title}
          autoStart={!isReviewMode && !hasStoredObjective && !aiObjectiveResult}
          existingEvaluation={aiObjectiveResult}
          onGradingStart={() => setIsAiGradingObjective(true)}
          onEvaluationComplete={(res) => handleSkillScoreUpdate(currentSkill, res.scaled_score_30, res)}
        />
      )}

      {/* Bộ lọc kỹ năng nếu là Full Test (để xem lại bài làm từng câu) */}
      {isFullExam && isModuleGrouped && (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-600" />
            <span>Xem lại chi tiết từng câu hỏi theo kỹ năng:</span>
          </span>

          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'Tất cả (6 Chặng)' },
              { id: 'reading', label: 'Reading (2 M)' },
              { id: 'listening', label: 'Listening (2 M)' },
              { id: 'writing', label: 'Writing (3 Tasks)' },
              { id: 'speaking', label: 'Speaking (2 Tasks)' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedSkillFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedSkillFilter === f.id
                    ? 'bg-[#153e75] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. Chi tiết kết quả từng Module (Grouped by Modules) */}
      {isModuleGrouped ? (
        <div className="space-y-6">
          {(isFullExam ? filteredModules : user_submission).map((mod, modIdx) => (
            <div key={modIdx} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-black text-xs">
                    {modIdx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-base">
                        {mod.module_title}
                      </h3>
                      {mod.module_skill && (
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${getSkillColor(mod.module_skill)}`}>
                          {mod.module_skill}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      {mod.task_type?.replace('_', ' ') || 'Stage Module'}
                    </span>
                  </div>
                </div>

                {mod.module_skill?.toLowerCase() === 'writing' && aiWritingResult ? (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 flex items-center gap-1.5 shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                    <span>Điểm AI: {aiWritingResult.combined_score_30} / 30</span>
                  </span>
                ) : (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                    Đúng: {mod.score_raw} / {mod.total_questions}
                  </span>
                )}
              </div>

              {/* Danh sách câu hỏi trong module này */}
              <div className="space-y-4">
                {mod.items && mod.items.map((item, itemIdx) => {
                  const isCorrect = item.is_correct;
                  const isWritingItem = item.task_type === 'write_email' || item.task_type === 'academic_discussion';
                  const writingItemEval = isWritingItem
                    ? (item.task_type === 'write_email' ? aiWritingResult?.email : aiWritingResult?.discussion)
                    : null;

                  return (
                    <div 
                      key={itemIdx}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                        isWritingItem
                          ? 'bg-rose-50/20 border-rose-200'
                          : isCorrect 
                            ? 'bg-emerald-50/40 border-emerald-200' 
                            : 'bg-rose-50/40 border-rose-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-slate-500">
                          {isWritingItem ? (item.task_type === 'write_email' ? 'Task 2 (Email)' : 'Task 3 (Discussion)') : `Câu ${itemIdx + 1}`}
                        </span>
                        {isWritingItem ? (
                          writingItemEval ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                              <Sparkles className="w-3 h-3 text-rose-600" />
                              Điểm AI: {writingItemEval.score_30} / 30 (Band {writingItemEval.score_band?.toFixed(1) || '0.0'})
                            </span>
                          ) : isAiGradingWriting ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full animate-pulse">
                              <Sparkles className="w-3 h-3 text-amber-600 animate-spin" />
                              Gemini đang chấm điểm...
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                              {item.user_choice}
                            </span>
                          )
                        ) : isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Đúng
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                            <XCircle className="w-3 h-3 text-rose-600" />
                            Chưa đúng
                          </span>
                        )}
                      </div>

                      <p className="text-sm font-semibold text-slate-900 mb-3">
                        {item.prompt}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                        <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                          <span className="text-slate-500 block text-[10px] uppercase font-bold">
                            {isWritingItem ? 'Bài viết của bạn:' : item.audio_url ? 'Bài nói của bạn:' : 'Đáp án của bạn:'}
                          </span>
                          <span className={`font-bold ${isWritingItem ? 'text-slate-800 line-clamp-3' : isCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>
                            {isWritingItem ? (item.essay_text || item.user_choice || '(Bỏ trống)') : (item.user_choice || '(Bỏ trống)')}
                          </span>
                        </div>

                        <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                          <span className="text-slate-500 block text-[10px] uppercase font-bold">
                            {isWritingItem ? 'Nhận xét từ AI Examiner:' : item.audio_url ? 'Nội dung câu nói / Đáp án mẫu:' : 'Đáp án chuẩn:'}
                          </span>
                          <span className={`font-bold ${isWritingItem ? 'text-rose-800 line-clamp-3 font-normal' : 'text-emerald-700'}`}>
                            {isWritingItem 
                              ? (writingItemEval?.summary_feedback || item.correct_answer || '(Theo hướng dẫn đề bài)')
                              : (item.correct_answer && item.correct_answer !== 'undefined' ? item.correct_answer : '(Theo hướng dẫn đề bài)')}
                          </span>
                        </div>
                      </div>

                      {/* Trình phát nghe lại bản thu âm của thí sinh (Speaking) */}
                      {item.audio_url && (
                        <div className="mb-3 p-3 bg-white rounded-xl border border-slate-200">
                          <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1.5 flex items-center gap-1.5">
                            <span>🎧 Nghe lại bài nói của bạn:</span>
                          </span>
                          <audio controls src={item.audio_url} className="w-full h-8" />
                        </div>
                      )}

                      {item.explanation && !item.explanation.includes('undefined') && (
                        <div className="text-xs text-slate-600 bg-white/80 p-3 rounded-lg border border-slate-200/80 leading-relaxed font-serif">
                          <strong className="text-slate-800 font-sans">Giải thích: </strong>
                          {item.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Fallback nếu kết quả là mảng phẳng */
        Array.isArray(user_submission) && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            {user_submission.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200">
                <span className="font-bold text-xs">{item.prompt}</span>
                <p className="text-xs text-teal-700 font-bold mt-1">Đáp án đúng: {item.correct_answer}</p>
              </div>
            ))}
          </div>
        )
      )}

    </div>
  );
}
