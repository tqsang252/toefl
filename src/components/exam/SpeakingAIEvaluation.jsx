import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Mic, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Volume2, 
  Play, 
  RotateCcw, 
  Lightbulb, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  Check, 
  Copy 
} from 'lucide-react';
import { isGeminiConfigured, evaluateSpeakingTest } from '../../lib/gemini';

export default function SpeakingAIEvaluation({
  speakingSubmissions,
  autoStart = true,
  existingEvaluation = null,
  onEvaluationComplete,
  onGradingStart
}) {
  const isConfigured = isGeminiConfigured();

  const [evaluation, setEvaluation] = useState(existingEvaluation);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState('rubric'); // 'rubric' | 'repeat' | 'interview'
  const [copiedText, setCopiedText] = useState(false);

  useEffect(() => {
    if (existingEvaluation && !evaluation) {
      setEvaluation(existingEvaluation);
    }
  }, [existingEvaluation]);

  useEffect(() => {
    if (!autoStart || !isConfigured || evaluation || existingEvaluation || isLoading) return;

    const repeatItems = speakingSubmissions?.repeat_items || [];
    const interviewItems = speakingSubmissions?.interview_items || [];
    const hasAny = repeatItems.length > 0 || interviewItems.length > 0;

    if (hasAny) {
      runGrading();
    }
  }, [speakingSubmissions, isConfigured, autoStart, existingEvaluation]);

  const runGrading = async () => {
    setIsLoading(true);
    setErrorMessage('');
    if (onGradingStart) onGradingStart();

    try {
      const repeatItems = speakingSubmissions?.repeat_items || [];
      const interviewItems = speakingSubmissions?.interview_items || [];

      const result = await evaluateSpeakingTest({
        repeatItems,
        interviewItems
      });

      setEvaluation(result);
      if (onEvaluationComplete) onEvaluationComplete(result);
    } catch (err) {
      console.error('Speaking AI Grading Error:', err);
      setErrorMessage(err.message || 'Lỗi khi gọi Gemini AI chấm phần thi Speaking.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const repeatItems = speakingSubmissions?.repeat_items || [];
  const interviewItems = speakingSubmissions?.interview_items || [];

  const renderRubricCard = (title, rubricItem, colorClass, borderClass) => {
    if (!rubricItem) return null;
    const scoreVal = Number(rubricItem.score || 0);
    const percent = Math.min(100, Math.max(0, (scoreVal / 5.0) * 100));

    return (
      <div className={`p-4 rounded-2xl bg-white border ${borderClass} shadow-2xs`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            {title}
          </span>
          <span className={`text-sm font-black px-2 py-0.5 rounded-lg ${colorClass}`}>
            {scoreVal.toFixed(1)} / 5.0
          </span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2.5">
          <div 
            className="h-full bg-emerald-500 rounded-full transition-all duration-700" 
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-xs text-slate-600 leading-relaxed font-sans">
          {rubricItem.feedback}
        </p>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-md">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-900">
                TOEFL Speaking 2026 AI Examiner
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                Gemini Multi-Modal
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Chấm điểm phát âm, ngữ điệu, cấu trúc câu và phản xạ giao tiếp theo rubric chuẩn ETS 2026
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
            <span>Chấm lại Speaking</span>
          </button>
        )}
      </div>

      {/* Thông báo nếu chưa có API Key */}
      {!isConfigured && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-3 mb-6">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <p>
            Vui lòng cấu hình <strong>VITE_GEMINI_API_KEY</strong> trong file <code>.env</code> để kích hoạt tính năng AI Examiner chấm bài thi Speaking theo chuẩn ETS TOEFL 2026.
          </p>
        </div>
      )}

      {/* Trạng thái đang tải */}
      {isLoading && (
        <div className="p-8 text-center bg-slate-50/70 rounded-2xl border border-slate-200/80 mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 mb-3 animate-bounce">
            <Mic className="w-6 h-6 animate-pulse" />
          </div>
          <h4 className="text-sm font-black text-slate-800 mb-1">
            Gemini AI đang lắng nghe và chấm điểm bài nói của bạn...
          </h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Hệ thống đang phân tích ngữ âm, trọng âm, tính liên kết và độ trôi chảy theo 3 tiêu chí ETS TOEFL 2026.
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

      {/* Kết quả đánh giá chi tiết */}
      {evaluation && !isLoading && (
        <div className="space-y-6">
          {/* Tóm tắt điểm số nhanh */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80">
            <div className="text-center p-2 sm:border-r border-emerald-200/60">
              <span className="text-[10px] font-bold uppercase text-emerald-800 block">
                Điểm Nói ETS (0 - 30)
              </span>
              <span className="text-3xl font-black text-emerald-700">
                {evaluation.score_30} <span className="text-sm font-normal text-emerald-600">/ 30</span>
              </span>
            </div>

            <div className="text-center p-2 sm:border-r border-emerald-200/60">
              <span className="text-[10px] font-bold uppercase text-emerald-800 block">
                TOEFL Band (2026)
              </span>
              <span className="text-3xl font-black text-teal-700">
                {evaluation.toefl_band_6?.toFixed(1) || '5.0'} <span className="text-sm font-normal text-teal-600">/ 6.0</span>
              </span>
            </div>

            <div className="text-center p-2">
              <span className="text-[10px] font-bold uppercase text-emerald-800 block">
                Thành phần
              </span>
              <span className="text-xs font-bold text-slate-700 block mt-1">
                Lặp lại: <strong>{evaluation.task_breakdown?.repeat?.score_30 ?? '-'}đ</strong> • Phỏng vấn: <strong>{evaluation.task_breakdown?.interview?.score_30 ?? '-'}đ</strong>
              </span>
            </div>
          </div>

          {/* Nhận xét tổng thể */}
          {evaluation.summary_feedback && (
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-xs font-black text-slate-800 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Nhận xét tổng thể của giám khảo AI:</span>
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                {evaluation.summary_feedback}
              </p>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 gap-2">
            {[
              { id: 'rubric', label: '3 Tiêu chí Rubric (Delivery, Language, Topic)' },
              { id: 'repeat', label: `Task 1: Listen & Repeat (${repeatItems.length} câu)` },
              { id: 'interview', label: `Task 2: Take an Interview (${interviewItems.length} câu)` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-emerald-600 text-emerald-800'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Nội dung Tab 1: Rubric */}
          {activeTab === 'rubric' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {renderRubricCard(
                  '1. Delivery (Phát âm & Độ trôi chảy)',
                  evaluation.rubric_scores?.delivery,
                  'bg-emerald-100 text-emerald-800',
                  'border-emerald-200'
                )}
                {renderRubricCard(
                  '2. Language Use (Từ vựng & Ngữ pháp)',
                  evaluation.rubric_scores?.language_use,
                  'bg-blue-100 text-blue-800',
                  'border-blue-200'
                )}
                {renderRubricCard(
                  '3. Topic Development (Phát triển ý)',
                  evaluation.rubric_scores?.topic_development,
                  'bg-purple-100 text-purple-800',
                  'border-purple-200'
                )}
              </div>

              {/* Lời khuyên phát âm */}
              {evaluation.pronunciation_tips && evaluation.pronunciation_tips.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                  <span className="text-xs font-bold text-amber-900 uppercase block mb-2 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>Chiến thuật cải thiện ngữ âm & phát âm:</span>
                  </span>
                  <ul className="space-y-1.5">
                    {evaluation.pronunciation_tips.map((tip, idx) => (
                      <li key={idx} className="text-xs text-amber-900 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Nội dung Tab 2: Task 1 (Repeat) */}
          {activeTab === 'repeat' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 mb-3">
                <strong>Đánh giá Task 1 (Listen & Repeat): </strong>
                {evaluation.task_breakdown?.repeat?.feedback || 'Lặp lại chính xác nguyên văn câu nói với ngữ điệu tự nhiên.'}
              </div>

              {repeatItems.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700">
                      Câu {idx + 1}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.audio_url || item.is_recorded ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {item.audio_url || item.is_recorded ? 'Đã thu âm' : 'Chưa thu âm'}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 mb-1">
                    "{item.text || item.prompt}"
                  </p>
                  {item.phonetic_guide && (
                    <span className="text-xs text-emerald-700 font-mono block mb-2">
                      /{item.phonetic_guide}/
                    </span>
                  )}
                  {item.audio_url && (
                    <audio controls src={item.audio_url} className="w-full h-8 mt-2" />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Nội dung Tab 3: Task 2 (Interview) */}
          {activeTab === 'interview' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 mb-3">
                <strong>Đánh giá Task 2 (Interview): </strong>
                {evaluation.task_breakdown?.interview?.feedback || 'Phản xạ trả lời tự tin, mạch lạc trong thời gian 45 giây.'}
              </div>

              {interviewItems.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">
                      Câu hỏi {idx + 1}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.audio_url || item.is_recorded ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {item.audio_url || item.is_recorded ? 'Đã thu âm' : 'Chưa thu âm'}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">
                    "{item.question || item.prompt}"
                  </p>
                  {item.sample_answer && (
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                      <strong className="text-slate-900">Đáp án mẫu: </strong>
                      {item.sample_answer}
                    </div>
                  )}
                  {item.audio_url && (
                    <div className="pt-1">
                      <audio controls src={item.audio_url} className="w-full h-8" />
                    </div>
                  )}
                </div>
              ))}

              {evaluation.sample_ideal_response && (
                <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200 mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-indigo-900 uppercase flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span>Bài Nói Mẫu Điểm Tuyệt Đối (Band 6.0):</span>
                    </span>
                    <button
                      onClick={() => handleCopy(evaluation.sample_ideal_response)}
                      className="text-indigo-700 hover:text-indigo-900 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedText ? 'Đã chép' : 'Sao chép'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed font-serif italic">
                    "{evaluation.sample_ideal_response}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
