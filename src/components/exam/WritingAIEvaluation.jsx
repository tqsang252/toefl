import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Mail, 
  MessageSquare, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  ArrowRight,
  HelpCircle,
  Award,
  Layers,
  Zap
} from 'lucide-react';
import { 
  isGeminiConfigured, 
  evaluateBothWritingSubmissions 
} from '../../lib/gemini';
import QuickVocabPopover, { useTextSelectionLookup } from '../dictionary/QuickVocabPopover';

export default function WritingAIEvaluation({ 
  writingSubmissions, 
  autoStart = true,
  existingEvaluation = null,
  onEvaluationComplete,
  onGradingStart
}) {
  const isConfigured = isGeminiConfigured();

  // Kiểm tra xem existingEvaluation có đúng là chấm cho bài viết hiện tại không
  const isEvaluationMatchingCurrent = (evalObj) => {
    if (!evalObj) return false;
    const currentEmail = (writingSubmissions?.email?.essay_text || '').trim();
    const currentDiscuss = (writingSubmissions?.discussion?.essay_text || '').trim();

    // Nếu bài viết hiện tại có nội dung và kết quả cũ có lưu submitted_essay nhưng khác nhau
    // -> chứng tỏ đây là bài làm mới ở lần làm bài thứ 2, thứ 3! Bắt buộc phải chấm mới.
    if (currentEmail && evalObj.email?.submitted_essay) {
      if (evalObj.email.submitted_essay.trim() !== currentEmail) return false;
    }
    if (currentDiscuss && evalObj.discussion?.submitted_essay) {
      if (evalObj.discussion.submitted_essay.trim() !== currentDiscuss) return false;
    }
    return true;
  };

  const isMatching = isEvaluationMatchingCurrent(existingEvaluation);
  const [evaluation, setEvaluation] = useState(isMatching ? existingEvaluation : null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState('email'); // 'email' | 'discussion' | 'overview'
  const [isOriginalExpanded, setIsOriginalExpanded] = useState(false);
  const [copiedTask, setCopiedTask] = useState(null);
  const { selectionData, clearSelection, handleTextMouseUp } = useTextSelectionLookup();

  // Đồng bộ existingEvaluation nếu được truyền từ bên ngoài VÀ thực sự khớp với bài viết hiện tại
  useEffect(() => {
    if (existingEvaluation && isEvaluationMatchingCurrent(existingEvaluation) && !evaluation) {
      setEvaluation(existingEvaluation);
    }
  }, [existingEvaluation, writingSubmissions]);

  // Tự động kích hoạt chấm điểm ngay khi component mount (hoặc khi phát hiện bài làm mới chưa được chấm)
  useEffect(() => {
    if (!isConfigured || isLoading) return;

    // Nếu đã có kết quả và kết quả đó khớp với bài hiện tại -> không cần chấm lại
    const matchingExisting = isEvaluationMatchingCurrent(existingEvaluation);
    const matchingCurrent = isEvaluationMatchingCurrent(evaluation);
    if (evaluation && matchingCurrent) return;
    if (existingEvaluation && matchingExisting && !autoStart) return;

    const emailSub = writingSubmissions?.email;
    const discussSub = writingSubmissions?.discussion;

    const hasAnyContent = (emailSub?.essay_text && emailSub.essay_text.trim()) ||
                          (discussSub?.essay_text && discussSub.essay_text.trim());

    if (hasAnyContent) {
      runGrading();
    }
  }, [writingSubmissions, isConfigured, autoStart, existingEvaluation]);

  const runGrading = async () => {
    setIsLoading(true);
    setErrorMessage('');
    if (onGradingStart) onGradingStart();

    try {
      const emailSub = writingSubmissions?.email;
      const discussSub = writingSubmissions?.discussion;

      const result = await evaluateBothWritingSubmissions({
        emailSubmission: emailSub,
        discussionSubmission: discussSub
      });

      setEvaluation(result);
      if (onEvaluationComplete) onEvaluationComplete(result);
      // Mặc định hiển thị tab có bài viết
      if (emailSub?.essay_text && emailSub.essay_text.trim()) {
        setActiveTab('email');
      } else if (discussSub?.essay_text && discussSub.essay_text.trim()) {
        setActiveTab('discussion');
      } else {
        setActiveTab('overview');
      }
    } catch (err) {
      console.error('AI Grading Error:', err);
      setErrorMessage(err.message || 'Lỗi khi gọi Gemini AI chấm bài.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyModel = (text, taskKey) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedTask(taskKey);
    setTimeout(() => setCopiedTask(null), 2500);
  };

  const emailSub = writingSubmissions?.email;
  const discussSub = writingSubmissions?.discussion;
  const emailRes = evaluation?.email;
  const discussRes = evaluation?.discussion;

  // Render thanh tiêu chí Rubric
  const renderRubricBar = (label, rubricItem) => {
    if (!rubricItem) return null;
    const score = Number(rubricItem.score) || 0;
    const percentage = Math.min(100, Math.round((score / 5.0) * 100));

    let color = 'bg-emerald-500';
    let textColor = 'text-emerald-700';
    if (score < 3.0) {
      color = 'bg-rose-500';
      textColor = 'text-rose-700';
    } else if (score < 4.0) {
      color = 'bg-amber-500';
      textColor = 'text-amber-700';
    }

    return (
      <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-800">{label}</span>
          <span className={`${textColor} font-black font-mono`}>{score.toFixed(1)} / 5.0</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div 
            className={`${color} h-full rounded-full transition-all duration-500`} 
            style={{ width: `${percentage}%` }} 
          />
        </div>
        {rubricItem.feedback && (
          <p className="text-[11px] text-slate-600 font-medium leading-relaxed pt-1 border-t border-slate-100">
            {rubricItem.feedback}
          </p>
        )}
      </div>
    );
  };

  // Render chi tiết của 1 bài viết (Email hoặc Academic Discussion)
  const renderTaskEvaluation = (taskKey, subData, resData, title) => {
    if (!resData) {
      return (
        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-xs text-slate-500 font-medium">Chưa có kết quả phân tích cho phần thi này.</p>
        </div>
      );
    }

    const essayText = subData?.essay_text || '';
    const wordCount = essayText.trim() ? essayText.trim().split(/\s+/).length : 0;
    const minWords = subData?.min_words || (taskKey === 'email' ? 80 : 100);

    return (
      <div 
        onMouseUp={handleTextMouseUp}
        className="space-y-6 animate-in fade-in duration-300"
      >
        
        {/* Điểm tổng quan của Task này */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div>
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block mb-0.5">
              {title} • Báo Cáo Chấm Điểm Chuẩn ETS
            </span>
            <h4 className="text-lg font-black tracking-tight text-white">
              Đánh Giá Năng Lực Viết TOEFL iBT 2026
            </h4>
            <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
              {resData.summary_feedback}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Thang 0 - 30</span>
              <div className="text-3xl font-black text-amber-400 font-mono">
                {resData.score_30}
                <span className="text-sm text-slate-400 ml-1">/ 30</span>
              </div>
            </div>

            <div className="h-10 w-px bg-slate-700 mx-1" />

            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Band Score</span>
              <div className="text-3xl font-black text-emerald-400 font-mono">
                {resData.score_band?.toFixed(1) || '0.0'}
                <span className="text-sm text-slate-400 ml-1">/ 5.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Khung bài viết gốc của thí sinh (Thu gọn / Mở rộng) */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
            <div className="flex items-center gap-2">
              <span>Bài viết gốc của bạn</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] border ${
                wordCount >= minWords 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {wordCount} từ (Mục tiêu: ≥ {minWords} từ)
              </span>
            </div>

            <button
              onClick={() => setIsOriginalExpanded(!isOriginalExpanded)}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <span>{isOriginalExpanded ? 'Thu gọn' : 'Xem toàn bộ bài'}</span>
              {isOriginalExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          <p className={`text-xs sm:text-sm font-serif text-slate-800 leading-relaxed italic bg-white p-3 rounded-xl border border-slate-200/80 ${
            isOriginalExpanded ? '' : 'line-clamp-3'
          }`}>
            "{essayText || '(Bài viết trống)'}"
          </p>
        </div>

        {/* 4 Tiêu chí Rubric chuẩn ETS 2026 */}
        <div>
          <h5 className="text-xs font-black uppercase text-slate-700 tracking-wider mb-3 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Phân Tích 4 Tiêu Chí Barem Điểm ETS (Rubric Scores)</span>
          </h5>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {renderRubricBar('1. Task Achievement (Đáp ứng yêu cầu đề bài)', resData.rubric_scores?.task_achievement)}
            {renderRubricBar('2. Coherence & Cohesion (Bố cục & Tính liên kết)', resData.rubric_scores?.coherence_cohesion)}
            {renderRubricBar('3. Lexical Resource (Độ chuẩn & Phong phú từ vựng)', resData.rubric_scores?.lexical_resource)}
            {renderRubricBar('4. Grammatical Range & Accuracy (Ngữ pháp & Cấu trúc)', resData.rubric_scores?.grammatical_accuracy)}
          </div>
        </div>

        {/* Danh sách Chữa Lỗi Chi Tiết Từng Câu (Error Corrections) */}
        {Array.isArray(resData.error_corrections) && resData.error_corrections.length > 0 && (
          <div>
            <h5 className="text-xs font-black uppercase text-rose-800 tracking-wider mb-3 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>Chữa Lỗi Chi Tiết Từng Câu ({resData.error_corrections.length} Lỗi Phát Hiện)</span>
            </h5>

            <div className="space-y-3">
              {resData.error_corrections.map((err, eIdx) => {
                const badgeColor = 
                  err.type === 'Grammar' ? 'bg-rose-100 text-rose-800 border-rose-200' :
                  err.type === 'Vocabulary' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                  err.type === 'Style' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                  'bg-blue-100 text-blue-800 border-blue-200';

                return (
                  <div key={eIdx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-700">
                        Lỗi #{eIdx + 1}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold border uppercase ${badgeColor}`}>
                        {err.type || 'Grammar'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      {/* Câu gốc có lỗi */}
                      <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200 text-rose-950 font-serif">
                        <span className="block text-[10px] font-mono font-bold text-rose-700 uppercase mb-1">
                          ❌ Câu gốc của bạn:
                        </span>
                        <span className="line-through decoration-rose-400 font-medium">{err.original}</span>
                      </div>

                      {/* Câu sửa chuẩn */}
                      <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 font-serif">
                        <span className="block text-[10px] font-mono font-bold text-emerald-700 uppercase mb-1">
                          ✅ Sửa lại chuẩn xác:
                        </span>
                        <span className="font-bold">{err.corrected}</span>
                      </div>
                    </div>

                    {/* Giải thích tiếng Việt */}
                    {err.explanation && (
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 leading-relaxed font-sans">
                        <strong className="text-slate-800">💡 Giải thích: </strong>
                        {err.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Lời khuyên khắc phục & Bổ sung từ vựng */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Lời khuyên khắc phục */}
          {Array.isArray(resData.actionable_improvements) && resData.actionable_improvements.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2.5">
              <span className="text-xs font-black uppercase text-amber-900 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                <span>Cách Khắc Phục Để Đạt Band 28 - 30</span>
              </span>
              <ul className="space-y-1.5 text-xs text-slate-800 leading-relaxed">
                {resData.actionable_improvements.map((tip, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Bổ sung từ vựng nâng cao */}
          {Array.isArray(resData.vocabulary_upgrades) && resData.vocabulary_upgrades.length > 0 && (
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2.5">
              <span className="text-xs font-black uppercase text-blue-900 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>Từ Vựng Đắt Giá Nên Bổ Sung</span>
              </span>
              <div className="space-y-2 text-xs">
                {resData.vocabulary_upgrades.map((item, vIdx) => (
                  <div key={vIdx} className="p-2 rounded-xl bg-white border border-blue-100 text-slate-800 space-y-0.5">
                    <div className="flex items-center gap-1.5 font-bold">
                      <span className="text-slate-400 line-through">{item.original}</span>
                      <ArrowRight className="w-3 h-3 text-blue-500" />
                      <span className="text-blue-700 font-black">{item.upgrade}</span>
                    </div>
                    {item.context && (
                      <p className="text-[10px] text-slate-500 italic font-serif">"{item.context}"</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Bản Viết Mẫu Nâng Cấp Band 5.0 Tuyệt Đối (Model Revision) */}
        {resData.model_revision && (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0f2e59] to-[#153e75] text-white shadow-md space-y-3">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏆</span>
                <div>
                  <h6 className="text-sm font-black tracking-tight text-white">
                    Bản Viết Mẫu Nâng Cấp Band 5.0 Tuyệt Đối (30/30)
                  </h6>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                      Giữ nguyên ý tưởng của bạn nhưng nâng tầm văn phong học thuật
                    </span>
                    <span className="text-[10px] text-amber-200 font-semibold bg-white/10 px-2 py-0.5 rounded-md border border-white/20 hidden sm:inline normal-case">
                      💡 Bôi đen từ để tra & lưu
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleCopyModel(resData.model_revision, taskKey)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer active:scale-95 border border-white/20"
                title="Sao chép bài viết mẫu"
              >
                {copiedTask === taskKey ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Đã sao chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-300" />
                    <span>Sao chép bài mẫu</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-white/10 border border-white/10 font-serif text-xs sm:text-sm text-slate-100 leading-relaxed whitespace-pre-line shadow-inner">
              {resData.model_revision}
            </div>
          </div>
        )}

      </div>
    );
  };

  // =========================================================================
  // TRƯỜNG HỢP 1: CHƯA CẤU HÌNH API KEY TRONG .ENV
  // =========================================================================
  if (!isConfigured) {
    return (
      <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50/50 rounded-3xl border border-amber-200 p-6 sm:p-8 shadow-xs my-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 border border-amber-300 shadow-2xs">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 uppercase">
              AI Auto-Grader 2026
            </span>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              Tự Động Chấm Điểm & Chữa Lỗi Bài Viết Bằng AI
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              Để hệ thống tự động chấm điểm bài viết của bạn theo thang điểm ETS 2026, phân tích 4 tiêu chí rubric, chữa lỗi từng câu và đề xuất bài viết mẫu Band 5.0, bạn chỉ cần cấu hình biến môi trường:
            </p>
            <div className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs max-w-lg select-all">
              VITE_GEMINI_API_KEY=your_api_key_here
            </div>
            <p className="text-xs text-slate-500">
              💡 Thêm dòng trên vào file <code className="font-bold text-slate-700">.env</code> (máy local) hoặc trong <code className="font-bold text-slate-700">Cài Đặt</code> (chân trang).
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // TRƯỜNG HỢP 2: ĐANG TỰ ĐỘNG CHẤM ĐIỂM (LOADING STATE)
  // =========================================================================
  if (isLoading) {
    const emailSub = writingSubmissions?.email;
    const discussSub = writingSubmissions?.discussion;
    const isSingleEmail = emailSub?.essay_text && !discussSub?.essay_text;
    const isSingleDiscuss = !emailSub?.essay_text && discussSub?.essay_text;

    return (
      <div className="bg-white rounded-3xl border border-blue-200 p-8 sm:p-12 shadow-sm my-6 text-center space-y-4 animate-in fade-in duration-300">
        <div className="relative w-16 h-16 mx-auto">
          <div className="w-16 h-16 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-blue-600">
            <Sparkles className="w-7 h-7 animate-pulse" />
          </div>
        </div>

        <div className="space-y-1">
          <h4 className="text-lg font-black text-slate-900 tracking-tight">
            🤖 AI Đang Tự Động Chấm {isSingleEmail ? 'Bài Viết Email' : isSingleDiscuss ? 'Bài Thảo Luận Academic Discussion' : '2 Bài Viết Writing'} Của Bạn...
          </h4>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Đang đối chiếu bài làm với barem chuẩn ETS TOEFL 2026, phân tích 4 tiêu chí rubric, tìm lỗi ngữ pháp & biên soạn bài mẫu Band 5.0 - 6.0. Vui lòng chờ 2-3 giây...
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 pt-2">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="inline-block w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="inline-block w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    );
  }

  // =========================================================================
  // TRƯỜNG HỢP 3: CÓ LỖI KHI GỌI AI
  // =========================================================================
  if (errorMessage) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 sm:p-8 shadow-xs my-6 space-y-3">
        <div className="flex items-start gap-3 text-rose-800">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-black">Không Thể Hoàn Tất Chấm Điểm Bằng AI</h4>
            <p className="text-xs text-rose-700 mt-1">{errorMessage}</p>
          </div>
        </div>

        <button
          onClick={runGrading}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Thử chấm lại</span>
        </button>
      </div>
    );
  }

  // =========================================================================
  // TRƯỜNG HỢP 4: ĐÃ CÓ KẾT QUẢ CHẤM ĐIỂM (HIỂN THỊ ĐẦY ĐỦ)
  // =========================================================================
  if (evaluation) {
    const hasEmail = !!emailRes;
    const hasDiscuss = !!discussRes;
    const hasBoth = hasEmail && hasDiscuss;

    return (
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm my-6 space-y-6">
        
        {/* Header cụm AI Grader */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  AI Writing Grader (Chuẩn ETS 2026)
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                  AUTO GRADED
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {hasBoth 
                  ? 'Tự động phân tích điểm số, chữa lỗi chi tiết & bài viết mẫu cho 2 bài thi Writing'
                  : hasEmail 
                  ? 'Tự động phân tích điểm số, chữa lỗi chi tiết & bài viết mẫu cho bài thi Viết Email'
                  : 'Tự động phân tích điểm số, chữa lỗi chi tiết & bài viết mẫu cho bài thi Academic Discussion'}
              </p>
            </div>
          </div>

          {/* Nút Chấm Lại */}
          <button
            onClick={runGrading}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0 self-start sm:self-center"
            title="Gọi lại AI để chấm lại"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Chấm lại bằng AI</span>
          </button>
        </div>

        {/* Thanh chuyển đổi Tab (chỉ hiện khi có cả 2 bài) */}
        {hasBoth && (
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveTab('email')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                activeTab === 'email'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Mail className="w-4 h-4 text-blue-600" />
              <span>Task 2: Write an Email</span>
              {emailRes && (
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-100 text-blue-800 font-mono font-bold">
                  {emailRes.score_30}/30
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('discussion')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                activeTab === 'discussion'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              <span>Task 3: Academic Discussion</span>
              {discussRes && (
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-100 text-indigo-800 font-mono font-bold">
                  {discussRes.score_30}/30
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('overview')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                activeTab === 'overview'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Tổng Hợp Cả 2 Bài</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-mono font-bold">
                {evaluation.combined_score_30}/30
              </span>
            </button>
          </div>
        )}

        {/* Nội dung kết quả */}
        {hasBoth ? (
          activeTab === 'email' ? (
            renderTaskEvaluation('email', emailSub, emailRes, 'Task 2: Write an Email')
          ) : activeTab === 'discussion' ? (
            renderTaskEvaluation('discussion', discussSub, discussRes, 'Task 3: Academic Discussion')
          ) : (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Banner Tổng hợp */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-700 via-[#153e75] to-indigo-800 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-black text-teal-300 uppercase tracking-wider block mb-1">
                    Tổng Kết 2 Bài Viết TOEFL Writing (2026)
                  </span>
                  <h4 className="text-2xl font-black text-white">
                    Điểm Đánh Giá Toàn Kỹ Năng Viết
                  </h4>
                  <p className="text-xs text-slate-200 mt-1 max-w-md leading-relaxed">
                    Điểm trung bình được đối chiếu chuẩn xác theo thang điểm và tiêu chuẩn ETS (Task 2 Email 40% & Task 3 Academic Discussion 60%).
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center min-w-[110px]">
                    <span className="text-[10px] uppercase font-bold text-teal-300 block">Thang 0 - 30</span>
                    <div className="text-3xl font-black text-white font-mono">
                      {evaluation.combined_score_30}
                      <span className="text-sm text-slate-300 font-normal">/30</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center min-w-[110px]">
                    <span className="text-[10px] uppercase font-bold text-amber-300 block">Band Score</span>
                    <div className="text-3xl font-black text-amber-300 font-mono">
                      Band {evaluation.toefl_band_6 || evaluation.combined_band?.toFixed(1) || '5.0'}
                    </div>
                  </div>
                </div>
              </div>

              {/* So sánh 2 Task */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Thẻ Email */}
                <div 
                  onClick={() => setActiveTab('email')}
                  className="p-5 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <span className="font-bold text-slate-800 text-sm">Task 2: Write an Email</span>
                    </div>
                    <span className="text-lg font-black text-blue-700 font-mono">
                      {emailRes?.score_30 || 0} / 30
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                    {emailRes?.summary_feedback || 'Chưa có bài nộp hoặc chưa có đánh giá.'}
                  </p>
                  <span className="text-xs font-bold text-blue-600 group-hover:underline inline-flex items-center gap-1">
                    <span>Xem chi tiết chữa lỗi & bài mẫu</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Thẻ Academic Discussion */}
                <div 
                  onClick={() => setActiveTab('discussion')}
                  className="p-5 rounded-2xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-indigo-600" />
                      <span className="font-bold text-slate-800 text-sm">Task 3: Academic Discussion</span>
                    </div>
                    <span className="text-lg font-black text-indigo-700 font-mono">
                      {discussRes?.score_30 || 0} / 30
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                    {discussRes?.summary_feedback || 'Chưa có bài nộp hoặc chưa có đánh giá.'}
                  </p>
                  <span className="text-xs font-bold text-indigo-600 group-hover:underline inline-flex items-center gap-1">
                    <span>Xem chi tiết chữa lỗi & bài mẫu</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          )
        ) : hasEmail ? (
          renderTaskEvaluation('email', emailSub, emailRes, 'Task 2: Write an Email')
        ) : hasDiscuss ? (
          renderTaskEvaluation('discussion', discussSub, discussRes, 'Task 3: Academic Discussion')
        ) : null}

        {/* Pop-up Tra & Lưu từ vựng 1-chạm khi bôi đen */}
        {selectionData && (
          <QuickVocabPopover
            selection={selectionData}
            onClose={clearSelection}
          />
        )}

      </div>
    );
  }

  // Trường hợp chưa chấm và chưa có bài nộp
  return null;
}
