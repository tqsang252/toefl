import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Award, 
  BookOpen, 
  Headphones, 
  PenTool, 
  Mic, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Calendar, 
  TrendingUp, 
  Layers, 
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { isGeminiConfigured, evaluateFullExamTest } from '../../lib/gemini';
import WritingAIEvaluation from './WritingAIEvaluation';
import SpeakingAIEvaluation from './SpeakingAIEvaluation';
import ObjectiveAIEvaluation from './ObjectiveAIEvaluation';

export default function FullExamAIEvaluation({
  results,
  testTitle = 'TOEFL iBT Full Simulation Exam',
  autoStart = true,
  isReviewMode = false,
  existingEvaluation = null,
  aiWritingResult = null,
  aiSpeakingResult = null,
  aiObjectiveResult = null,
  aiScores = {},
  onSkillScoreUpdate,
  onGradingStart
}) {
  const isConfigured = isGeminiConfigured();

  const [activeTab, setActiveTab] = useState('executive'); // 'executive' | 'writing' | 'speaking' | 'reading' | 'listening'
  const [executiveReport, setExecutiveReport] = useState(existingEvaluation || results.ai_full_result || null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const readingScore = aiScores.reading ?? results.skill_scores?.reading ?? 26;
  const listeningScore = aiScores.listening ?? results.skill_scores?.listening ?? 25;
  const writingScore = aiScores.writing ?? results.skill_scores?.writing ?? 26;
  const speakingScore = aiScores.speaking ?? results.skill_scores?.speaking ?? 25;

  useEffect(() => {
    if (existingEvaluation && !executiveReport) {
      setExecutiveReport(existingEvaluation);
    }
  }, [existingEvaluation]);

  useEffect(() => {
    if (!autoStart || isReviewMode || !isConfigured || executiveReport || existingEvaluation || isLoading) return;
    runExecutiveGrading();
  }, [isConfigured, autoStart, isReviewMode, readingScore, listeningScore, writingScore, speakingScore, executiveReport, existingEvaluation]);

  const runExecutiveGrading = async () => {
    setIsLoading(true);
    setErrorMessage('');
    if (onGradingStart) onGradingStart();

    try {
      const res = await evaluateFullExamTest({
        readingScore,
        listeningScore,
        writingScore,
        speakingScore,
        testTitle
      });

      setExecutiveReport(res);
      if (onSkillScoreUpdate) onSkillScoreUpdate('full', null, res);
    } catch (err) {
      console.error('Full Exam Executive Grading Error:', err);
      setErrorMessage(err.message || 'Lỗi khi tạo báo cáo tổng quan 4 kỹ năng.');
    } finally {
      setIsLoading(false);
    }
  };

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
    if (Array.isArray(results.user_submission)) {
      results.user_submission.forEach((mod) => scanItems(mod.items));
    }
    return found;
  })();

  const speakingSubmissions = results.speaking_submissions || (() => {
    const found = { repeat_items: [], interview_items: [] };
    if (Array.isArray(results.user_submission)) {
      results.user_submission.forEach((mod) => {
        if (Array.isArray(mod.items)) {
          mod.items.forEach((it) => {
            if (it.prompt?.includes('Listen & Repeat') || it.phonetic_guide) {
              found.repeat_items.push({ text: it.correct_answer || it.prompt, audio_url: it.audio_url, is_recorded: !!it.audio_url });
            } else if (it.audio_url || it.prompt?.includes('phỏng vấn')) {
              found.interview_items.push({ question: it.prompt, audio_url: it.audio_url, is_recorded: !!it.audio_url });
            }
          });
        }
      });
    }
    return found;
  })();

  const filterSubmissionBySkill = (targetSkill) => {
    if (!Array.isArray(results.user_submission)) return [];
    return results.user_submission.filter((m) => (m.module_skill || m.skill || '').toLowerCase() === targetSkill.toLowerCase());
  };

  const readingModules = filterSubmissionBySkill('reading');
  const listeningModules = filterSubmissionBySkill('listening');

  const readingRaw = readingModules.reduce((acc, m) => acc + (m.score_raw || 0), 0);
  const readingTotal = readingModules.reduce((acc, m) => acc + (m.total_questions || 0), 0);

  const listeningRaw = listeningModules.reduce((acc, m) => acc + (m.score_raw || 0), 0);
  const listeningTotal = listeningModules.reduce((acc, m) => acc + (m.total_questions || 0), 0);

  return (
    <div className="space-y-6 mb-8">
      {/* Tab Navigation Thanh Điều Hướng 4 Kỹ Năng */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 pl-2">
          <Sparkles className="w-4 h-4 text-teal-600" />
          <span>Báo Cáo AI Giám Khảo 4 Kỹ Năng:</span>
        </span>

        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'executive', label: '🌟 Tổng Quan CEFR', color: 'bg-[#153e75]' },
            { id: 'writing', label: '✍️ Writing AI', color: 'bg-rose-700' },
            { id: 'speaking', label: '🗣️ Speaking AI', color: 'bg-emerald-700' },
            { id: 'reading', label: '📖 Reading AI', color: 'bg-amber-700' },
            { id: 'listening', label: '🎧 Listening AI', color: 'bg-blue-700' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? `${tab.color} text-white shadow-2xs`
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Nội dung Tab Executive: Tổng Quan 4 Kỹ Năng */}
      {activeTab === 'executive' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-black text-slate-900">
                  Báo Cáo Toàn Diện 4 Kỹ Năng (TOEFL iBT 2026)
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900 text-xs font-black uppercase">
                  {executiveReport?.cefr_level || 'CEFR C1'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Đánh giá chuẩn hóa phối hợp 4 kỹ năng Receptive & Productive theo tiêu chuẩn ETS toàn cầu
              </p>
            </div>

            {executiveReport && (
              <button
                onClick={runExecutiveGrading}
                disabled={isLoading}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Cập nhật phân tích</span>
              </button>
            )}
          </div>

          {isLoading && (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 animate-pulse">
              <Sparkles className="w-8 h-8 text-teal-600 mx-auto mb-2 animate-spin" />
              <p className="text-sm font-bold text-slate-800">
                Gemini AI đang tổng hợp dữ liệu 4 kỹ năng và xây dựng lộ trình học...
              </p>
            </div>
          )}

          {executiveReport && !isLoading && (
            <div className="space-y-6">
              {/* Nhận xét tổng quan */}
              <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/60 border border-teal-200/80">
                <span className="text-xs font-extrabold text-teal-900 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-teal-700" />
                  <span>Đánh giá từ Hội đồng Khảo thí AI:</span>
                </span>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                  {executiveReport.executive_summary}
                </p>
              </div>

              {/* Tương quan Receptive (Đọc + Nghe) vs Productive (Viết + Nói) */}
              {executiveReport.receptive_vs_productive && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold text-slate-600 uppercase block mb-1">
                      Kỹ Năng Tiếp Nhận (Receptive)
                    </span>
                    <div className="text-2xl font-black text-slate-900 mb-1">
                      {executiveReport.receptive_vs_productive.receptive_score} <span className="text-sm font-normal text-slate-500">/ 60</span>
                    </div>
                    <span className="text-xs text-slate-600">
                      Reading ({readingScore}đ) + Listening ({listeningScore}đ)
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold text-slate-600 uppercase block mb-1">
                      Kỹ Năng Sản Sinh (Productive)
                    </span>
                    <div className="text-2xl font-black text-slate-900 mb-1">
                      {executiveReport.receptive_vs_productive.productive_score} <span className="text-sm font-normal text-slate-500">/ 60</span>
                    </div>
                    <span className="text-xs text-slate-600">
                      Writing ({writingScore}đ) + Speaking ({speakingScore}đ)
                    </span>
                  </div>
                </div>
              )}

              {/* Điểm mạnh & Điểm cần cải thiện */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {executiveReport.top_strengths && (
                  <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80">
                    <span className="text-xs font-bold text-emerald-900 uppercase block mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Thế mạnh vượt trội:</span>
                    </span>
                    <ul className="space-y-1.5">
                      {executiveReport.top_strengths.map((s, idx) => (
                        <li key={idx} className="text-xs text-emerald-900 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {executiveReport.critical_improvements && (
                  <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200/80">
                    <span className="text-xs font-bold text-rose-900 uppercase block mb-2 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      <span>Trọng tâm bứt phá điểm:</span>
                    </span>
                    <ul className="space-y-1.5">
                      {executiveReport.critical_improvements.map((c, idx) => (
                        <li key={idx} className="text-xs text-rose-900 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Lộ trình học 4 tuần do AI thiết kế */}
              {executiveReport.study_roadmap_4_weeks && (
                <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200">
                  <span className="text-xs font-black text-indigo-900 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    <span>Lộ trình ôn luyện 4 tuần cá nhân hóa để đạt mục tiêu:</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {executiveReport.study_roadmap_4_weeks.map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-white border border-indigo-100 shadow-2xs">
                        <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md inline-block mb-1.5">
                          {item.week || `Tuần ${idx + 1}`}
                        </span>
                        <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                          {item.focus}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Nội dung Tab Writing */}
      {activeTab === 'writing' && (
        <WritingAIEvaluation
          writingSubmissions={writingSubmissions}
          autoStart={!isReviewMode && !aiWritingResult && !results.ai_writing_result}
          existingEvaluation={aiWritingResult || results.ai_writing_result}
          onEvaluationComplete={(res) => {
            if (onSkillScoreUpdate) onSkillScoreUpdate('writing', res.combined_score_30, res);
          }}
        />
      )}

      {/* Nội dung Tab Speaking */}
      {activeTab === 'speaking' && (
        <SpeakingAIEvaluation
          speakingSubmissions={speakingSubmissions}
          autoStart={!isReviewMode && !aiSpeakingResult && !results.ai_speaking_result}
          existingEvaluation={aiSpeakingResult || results.ai_speaking_result}
          onEvaluationComplete={(res) => {
            if (onSkillScoreUpdate) onSkillScoreUpdate('speaking', res.score_30, res);
          }}
        />
      )}

      {/* Nội dung Tab Reading */}
      {activeTab === 'reading' && (
        <ObjectiveAIEvaluation
          skill="reading"
          userSubmission={readingModules}
          scoreRaw={readingRaw}
          totalQuestions={readingTotal || 30}
          testTitle={testTitle}
          autoStart={!isReviewMode && !aiObjectiveResult && !results.ai_objective_result}
          existingEvaluation={aiObjectiveResult || results.ai_objective_result}
          onEvaluationComplete={(res) => {
            if (onSkillScoreUpdate) onSkillScoreUpdate('reading', res.scaled_score_30, res);
          }}
        />
      )}

      {/* Nội dung Tab Listening */}
      {activeTab === 'listening' && (
        <ObjectiveAIEvaluation
          skill="listening"
          userSubmission={listeningModules}
          scoreRaw={listeningRaw}
          totalQuestions={listeningTotal || 28}
          testTitle={testTitle}
          autoStart={!isReviewMode && !aiObjectiveResult && !results.ai_objective_result}
          existingEvaluation={aiObjectiveResult || results.ai_objective_result}
          onEvaluationComplete={(res) => {
            if (onSkillScoreUpdate) onSkillScoreUpdate('listening', res.scaled_score_30, res);
          }}
        />
      )}
    </div>
  );
}
