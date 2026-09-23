import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Headphones, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Award, 
  Lightbulb, 
  TrendingUp, 
  Layers, 
  Target 
} from 'lucide-react';
import { isGeminiConfigured, evaluateObjectiveSkillTest } from '../../lib/gemini';

export default function ObjectiveAIEvaluation({
  skill = 'reading',
  userSubmission = [],
  scoreRaw = 0,
  totalQuestions = 0,
  timeSpentSeconds = 0,
  testTitle = '',
  autoStart = true,
  existingEvaluation = null,
  onEvaluationComplete,
  onGradingStart
}) {
  const isConfigured = isGeminiConfigured();
  const isReading = (skill || '').toLowerCase() === 'reading';

  // Kiểm tra nếu evaluation truyền vào bị lệch quá xa so với scoreRaw thực tế (do bug phiên bản trước lưu sai 100%)
  const isStaleEvaluation = Boolean(
    existingEvaluation &&
    totalQuestions > 0 &&
    typeof existingEvaluation.accuracy_rate === 'number' &&
    Math.abs(existingEvaluation.accuracy_rate - (scoreRaw / totalQuestions) * 100) > 15
  );

  const [evaluation, setEvaluation] = useState(isStaleEvaluation ? null : existingEvaluation);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (existingEvaluation) {
      if (isStaleEvaluation) {
        setEvaluation(null);
      } else {
        setEvaluation(existingEvaluation);
      }
    }
  }, [existingEvaluation, isStaleEvaluation]);

  useEffect(() => {
    if (!autoStart || !isConfigured || evaluation || (existingEvaluation && !isStaleEvaluation) || isLoading) return;

    if (totalQuestions > 0) {
      runGrading();
    }
  }, [skill, scoreRaw, totalQuestions, isConfigured, autoStart, existingEvaluation, isStaleEvaluation]);

  const runGrading = async () => {
    setIsLoading(true);
    setErrorMessage('');
    if (onGradingStart) onGradingStart();

    try {
      const result = await evaluateObjectiveSkillTest({
        skill,
        userSubmission,
        scoreRaw,
        totalQuestions,
        timeSpentSeconds,
        testTitle
      });

      setEvaluation(result);
      if (onEvaluationComplete) onEvaluationComplete(result);
    } catch (err) {
      console.error(`${skill} AI Grading Error:`, err);
      setErrorMessage(err.message || `Lỗi khi gọi AI chấm phần thi ${skill}.`);
    } finally {
      setIsLoading(false);
    }
  };

  const skillNameVi = isReading ? 'Đọc Hiểu (Reading)' : 'Nghe Hiểu (Listening)';
  const SkillIcon = isReading ? BookOpen : Headphones;
  const colorTheme = isReading ? 'amber' : 'blue';

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md ${
            isReading ? 'bg-gradient-to-tr from-amber-500 to-orange-400' : 'bg-gradient-to-tr from-blue-600 to-indigo-400'
          }`}>
            <SkillIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-900">
                TOEFL {isReading ? 'Reading' : 'Listening'} 2026 AI Examiner
              </h3>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                isReading ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
              }`}>
                <Sparkles className="w-3 h-3" />
                Adaptive MSAT Diagnostic
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Phân tích chuyên sâu độ chính xác 2 Module thích ứng, bẫy đề thi và giải pháp tối ưu điểm
            </p>
          </div>
        </div>

        {/* Nút chấm lại */}
        {evaluation && (
          <button
            onClick={runGrading}
            disabled={isLoading}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Phân tích lại AI</span>
          </button>
        )}
      </div>

      {/* Thông báo nếu chưa có API Key */}
      {!isConfigured && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-3 mb-6">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <p>
            Vui lòng cấu hình <strong>VITE_GEMINI_API_KEY</strong> trong file <code>.env</code> để kích hoạt chẩn đoán năng lực {skillNameVi} từ AI Examiner.
          </p>
        </div>
      )}

      {/* Trạng thái đang tải */}
      {isLoading && (
        <div className="p-8 text-center bg-slate-50/70 rounded-2xl border border-slate-200/80 mb-6">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3 animate-bounce ${
            isReading ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
          }`}>
            <SkillIcon className="w-6 h-6 animate-pulse" />
          </div>
          <h4 className="text-sm font-black text-slate-800 mb-1">
            Hệ thống AI đang phân tích toàn bộ câu hỏi và tính điểm chuẩn ETS 2026...
          </h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Đang phân loại các câu hỏi theo dạng bài (Từ vựng, Ý chính, Suy luận, Chi tiết) để tìm ra điểm mạnh và lỗ hổng kiến thức.
          </p>
        </div>
      )}

      {/* Thông báo lỗi */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 mb-6">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Báo cáo phân tích AI */}
      {evaluation && !isLoading && (
        <div className="space-y-6">
          {/* 3 Thẻ Điểm Số Nhanh */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl border ${
            isReading ? 'bg-amber-50/50 border-amber-200/80' : 'bg-blue-50/50 border-blue-200/80'
          }`}>
            <div className={`text-center p-2 sm:border-r ${isReading ? 'border-amber-200/60' : 'border-blue-200/60'}`}>
              <span className={`text-[10px] font-bold uppercase block ${isReading ? 'text-amber-800' : 'text-blue-800'}`}>
                Điểm Chuẩn ETS 2026
              </span>
              <span className={`text-3xl font-black ${isReading ? 'text-amber-800' : 'text-blue-800'}`}>
                {evaluation.scaled_score_30} <span className="text-sm font-normal text-slate-500">/ 30</span>
              </span>
            </div>

            <div className={`text-center p-2 sm:border-r ${isReading ? 'border-amber-200/60' : 'border-blue-200/60'}`}>
              <span className={`text-[10px] font-bold uppercase block ${isReading ? 'text-amber-800' : 'text-blue-800'}`}>
                TOEFL Band (2026)
              </span>
              <span className={`text-3xl font-black ${isReading ? 'text-amber-700' : 'text-blue-700'}`}>
                {evaluation.toefl_band_6?.toFixed(1) || '5.0'} <span className="text-sm font-normal text-slate-500">/ 6.0</span>
              </span>
            </div>

            <div className="text-center p-2">
              <span className={`text-[10px] font-bold uppercase block ${isReading ? 'text-amber-800' : 'text-blue-800'}`}>
                Độ Chính Xác Thô
              </span>
              <span className="text-3xl font-black text-slate-800">
                {scoreRaw} <span className="text-sm font-normal text-slate-500">/ {totalQuestions}</span>
                <span className="text-xs font-bold text-slate-400 ml-1">
                  ({evaluation.accuracy_rate ?? (totalQuestions > 0 ? Math.round((scoreRaw / totalQuestions) * 100) : 0)}%)
                </span>
              </span>
            </div>
          </div>

          {/* Nhận xét của Giám khảo AI */}
          {evaluation.summary_assessment && (
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-xs font-black text-slate-800 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <Sparkles className={`w-4 h-4 ${isReading ? 'text-amber-600' : 'text-blue-600'}`} />
                <span>Đánh giá năng lực từ Giám khảo AI:</span>
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                {evaluation.summary_assessment}
              </p>
            </div>
          )}

          {/* Phân loại mức độ thuần thục theo dạng câu hỏi */}
          {evaluation.question_type_mastery && evaluation.question_type_mastery.length > 0 && (
            <div>
              <span className="text-xs font-black text-slate-800 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-emerald-600" />
                <span>Mức độ thuần thục theo từng dạng câu hỏi:</span>
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {evaluation.question_type_mastery.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-800">
                        {item.type}
                      </span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        item.status?.toLowerCase().includes('tốt') || item.status?.toLowerCase().includes('xuất sắc')
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    {item.advice && (
                      <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
                        {item.advice}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Điểm mạnh & Điểm cần khắc phục */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {evaluation.strengths && evaluation.strengths.length > 0 && (
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80">
                <span className="text-xs font-bold text-emerald-900 uppercase block mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Điểm mạnh nổi bật:</span>
                </span>
                <ul className="space-y-1.5">
                  {evaluation.strengths.map((str, idx) => (
                    <li key={idx} className="text-xs text-emerald-900 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {evaluation.weaknesses && evaluation.weaknesses.length > 0 && (
              <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200/80">
                <span className="text-xs font-bold text-rose-900 uppercase block mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>Lỗ hổng cần khắc phục:</span>
                </span>
                <ul className="space-y-1.5">
                  {evaluation.weaknesses.map((weak, idx) => (
                    <li key={idx} className="text-xs text-rose-900 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span>{weak}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Lời khuyên & Chiến lược bứt phá điểm số */}
          {evaluation.actionable_tips && evaluation.actionable_tips.length > 0 && (
            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200">
              <span className="text-xs font-bold text-indigo-900 uppercase block mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-indigo-600" />
                <span>Chiến thuật bứt phá điểm {skillNameVi}:</span>
              </span>
              <ul className="space-y-1.5">
                {evaluation.actionable_tips.map((tip, idx) => (
                  <li key={idx} className="text-xs text-indigo-900 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
