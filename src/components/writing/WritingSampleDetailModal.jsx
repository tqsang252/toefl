import React, { useState } from 'react';
import {
  X,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Play,
  Sparkles,
  BookOpen,
  MessageSquare,
  Mail,
  Award,
  Layers,
  Clock,
  Trash2,
  BookmarkCheck,
  User,
  ArrowRight,
  ExternalLink,
  SplitSquareVertical
} from 'lucide-react';

export default function WritingSampleDetailModal({
  sample,
  isOpen,
  onClose,
  onStartPractice,
  onDelete
}) {
  const [activeTab, setActiveTab] = useState('model_essay'); // 'model_essay' | 'structure' | 'vocab' | 'comparison'
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !sample) return null;

  const isEmail = sample.type === 'email';
  const hasUserComparison = !!sample.userOriginalResponse;

  // TTS Audio playback
  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Trình duyệt của bạn không hỗ trợ Web Speech API.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(sample.modelEssay);
      utterance.lang = 'en-US';
      utterance.rate = 0.95;

      const voices = window.speechSynthesis.getVoices();
      const usVoice = voices.find(
        (v) => v.lang === 'en-US' && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('David'))
      );
      if (usVoice) utterance.voice = usVoice;

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(sample.modelEssay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Convert Sample Prompt into a real test session and launch ExamRunner
  const handleLaunchPractice = () => {
    window.speechSynthesis?.cancel();

    if (isEmail) {
      const practiceTest = {
        id: `practice_from_sample_${sample.id}_${Date.now()}`,
        title: sample.title || 'Luyện tập theo bài mẫu Email',
        skill: 'writing_email',
        task_type: 'write_email',
        duration_seconds: 420, // 7 phút chuẩn TOEFL iBT
        content: {
          scenario: sample.prompt?.scenario || sample.title,
          requirements: Array.isArray(sample.prompt?.requirements) && sample.prompt.requirements.length > 0
            ? sample.prompt.requirements
            : [
                'State your primary reason for writing clearly in the opening',
                'Elaborate on specific circumstances with supporting reasons',
                'Propose a polite and actionable next step or solution'
              ],
          recommended_words: '100 - 130 từ',
          min_words: 80
        }
      };

      onClose();
      if (onStartPractice) {
        onStartPractice(practiceTest);
      }
    } else {
      // Academic Discussion
      const practiceTest = {
        id: `practice_from_sample_${sample.id}_${Date.now()}`,
        title: sample.title || 'Luyện tập theo bài mẫu Academic Discussion',
        skill: 'writing_discussion',
        task_type: 'academic_discussion',
        duration_seconds: 600, // 10 phút chuẩn TOEFL iBT
        content: {
          professor: {
            name: sample.prompt?.professorName || 'Dr. Katherine Miller',
            title: sample.prompt?.professorTitle || 'Professor of Academic Studies',
            question: sample.prompt?.professorQuestion || sample.prompt?.scenario || sample.title
          },
          peer_posts: Array.isArray(sample.prompt?.studentOpinions) && sample.prompt.studentOpinions.length > 0
            ? sample.prompt.studentOpinions.map((p, idx) => ({
                student: p.student || `Student ${idx + 1}`,
                avatar_bg: p.avatar_bg || (idx === 0 ? 'bg-blue-600' : 'bg-emerald-600'),
                stance: p.opinion || p.stance
              }))
            : [
                {
                  student: 'Michael',
                  avatar_bg: 'bg-blue-600',
                  stance: 'Individual responsibility and foundational core discipline are the most critical factors.'
                },
                {
                  student: 'Sarah',
                  avatar_bg: 'bg-emerald-600',
                  stance: 'Institutional support and technological adaptation must be embraced for systemic equity.'
                }
              ],
          min_words: 100
        }
      };

      onClose();
      if (onStartPractice) {
        onStartPractice(practiceTest);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* HEADER MODAL */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between bg-gradient-to-r from-slate-50 via-white to-slate-50 gap-4">
          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                isEmail 
                  ? 'bg-orange-50 text-orange-800 border-orange-200' 
                  : 'bg-sky-50 text-sky-800 border-sky-200'
              }`}>
                {isEmail ? 'Task 2: Academic Email' : 'Task 3: Academic Discussion'}
              </span>

              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                ⭐ {(sample.targetBand || 'Band 5.5+').split('(')[0].trim()}
              </span>

              {sample.sourceType === 'user_exam' && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
                  <BookmarkCheck className="w-3 h-3 text-purple-600" />
                  Từ bài thi của bạn
                </span>
              )}

              <span className="text-xs text-slate-400 font-medium">
                • {sample.topicCategory || 'General Topic'}
              </span>
            </div>

            <h3 className="font-black text-slate-900 text-lg sm:text-xl truncate">
              {sample.title}
            </h3>
          </div>

          <button
            onClick={() => {
              window.speechSynthesis?.cancel();
              onClose();
            }}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TOP ACTION BAR: NÚT THỰC HÀNH ĐỀ NÀY & AUDIO & COPY */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* NÚT THỰC HÀNH ĐỀ NÀY (YÊU CẦU CỐT LÕI) */}
            <button
              onClick={handleLaunchPractice}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 active:scale-95 text-white text-xs font-black shadow-md transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Thực hành đề này ngay ({isEmail ? '7 phút' : '10 phút'})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Read-aloud TTS */}
            <button
              onClick={handleToggleAudio}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                isPlayingAudio
                  ? 'bg-rose-50 text-rose-700 border-rose-300 ring-2 ring-rose-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
              title="Nghe giọng đọc bản ngữ bài mẫu"
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                  <span>Dừng đọc</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Nghe bài đọc</span>
                </>
              )}
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-all cursor-pointer"
              title="Sao chép toàn bộ bài viết mẫu"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-black">Đã chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy</span>
                </>
              )}
            </button>

            {/* Delete button (if user created) */}
            {onDelete && (
              <button
                onClick={() => {
                  if (confirm(`Bạn có chắc muốn xóa bài mẫu "${sample.title}" khỏi kho lưu trữ?`)) {
                    window.speechSynthesis?.cancel();
                    onDelete(sample.id, sample.type);
                    onClose();
                  }
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all cursor-pointer"
                title="Xóa bài mẫu này"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* MODAL BODY (SCROLLABLE) */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* 1. KHUNG ĐỀ BÀI (PROMPT SECTION) */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider">
              {isEmail ? <Mail className="w-4 h-4 text-amber-800" /> : <MessageSquare className="w-4 h-4 text-amber-800" />}
              <span>ĐỀ BÀI & TÌNH HUỐNG (PROMPT):</span>
            </div>

            {isEmail ? (
              <div className="space-y-3">
                <p className="text-slate-800 font-serif text-sm leading-relaxed">
                  {sample.prompt?.scenario || sample.prompt}
                </p>

                {Array.isArray(sample.prompt?.requirements) && sample.prompt.requirements.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-black text-amber-950 uppercase tracking-wide block">
                      Các điểm bắt buộc phải có trong email:
                    </span>
                    <ul className="space-y-1">
                      {sample.prompt.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <span className="text-rose-600 font-bold">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {/* Giáo sư */}
                <div className="bg-white/80 p-3.5 rounded-xl border border-amber-200">
                  <div className="text-xs font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                    <span>👨‍🏫 {sample.prompt?.professorName || 'Professor'}</span>
                    <span className="text-[10px] text-slate-400">({sample.prompt?.professorTitle || 'Instructor'})</span>
                  </div>
                  <p className="text-xs sm:text-sm font-serif text-slate-800 leading-relaxed">
                    {sample.prompt?.professorQuestion || sample.prompt?.scenario || sample.prompt}
                  </p>
                </div>

                {/* Ý kiến sinh viên */}
                {Array.isArray(sample.prompt?.studentOpinions) && sample.prompt.studentOpinions.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {sample.prompt.studentOpinions.map((st, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white/70 border border-slate-200 text-xs">
                        <span className="font-black text-slate-800 block mb-0.5">👤 {st.student}:</span>
                        <p className="text-slate-600 italic font-serif">"{st.opinion || st.stance}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 2. NAVIGATION TABS TRONG BÀI MẪU */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none text-xs font-bold">
            <button
              onClick={() => setActiveTab('model_essay')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'model_essay'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              📄 Bài viết mẫu chuẩn Band 5.0
            </button>

            <button
              onClick={() => setActiveTab('vocab')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'vocab'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>✨ Cụm từ học thuật</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === 'vocab' ? 'bg-slate-700 text-slate-200' : 'bg-slate-200 text-slate-600'
              }`}>
                {sample.vocabularyHighlights?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('structure')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'structure'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              🧠 Phân tích cấu trúc & Chiến lược
            </button>

            {hasUserComparison && (
              <button
                onClick={() => setActiveTab('comparison')}
                className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'comparison'
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'text-purple-700 bg-purple-50 hover:bg-purple-100'
                }`}
              >
                <SplitSquareVertical className="w-3.5 h-3.5" />
                <span>So sánh với bài làm của bạn</span>
              </button>
            )}
          </div>

          {/* 3. NỘI DUNG TỪNG TAB */}

          {/* TAB 1: BÀI VIẾT MẪU (MODEL ESSAY) */}
          {activeTab === 'model_essay' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                <span>Nội dung bài viết mẫu:</span>
                <span className="text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                  Độ dài: <b>{sample.wordCount || sample.modelEssay.trim().split(/\s+/).length}</b> từ
                </span>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 text-slate-900 font-serif leading-[2.2] text-[15px] sm:text-[16px] whitespace-pre-line shadow-xs select-text">
                {sample.modelEssay}
              </div>
            </div>
          )}

          {/* TAB 2: CỤM TỪ HỌC THUẬT (VOCABULARY & COLLOCATIONS) */}
          {activeTab === 'vocab' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 font-medium">
                Các cụm từ kết hợp tự nhiên (collocations) và từ vựng học thuật ghi điểm cao trong bài mẫu này:
              </div>

              {Array.isArray(sample.vocabularyHighlights) && sample.vocabularyHighlights.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {sample.vocabularyHighlights.map((v, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-indigo-900">{v.term}</span>
                        <button
                          onClick={() => {
                            if ('speechSynthesis' in window) {
                              const utt = new SpeechSynthesisUtterance(v.term);
                              utt.lang = 'en-US';
                              window.speechSynthesis.speak(utt);
                            }
                          }}
                          className="p-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors cursor-pointer"
                          title="Nghe phát âm cụm từ này"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-xs font-bold text-slate-700">
                        {v.meaning}
                      </div>
                      {v.contextInEssay && (
                        <p className="text-[11px] text-slate-500 font-serif italic pt-1 border-t border-slate-200/80">
                          "{v.contextInEssay}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400 text-xs">
                  Chưa có danh sách từ vựng bóc tách riêng cho bài mẫu này.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PHÂN TÍCH CẤU TRÚC (STRUCTURE BREAKDOWN) */}
          {activeTab === 'structure' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 font-medium">
                Phân tích chiến thuật lập luận và cấu trúc chuẩn giúp bài viết đạt điểm tuyệt đối:
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium shadow-2xs">
                {sample.structureAnalysis || 'Bài viết tuân thủ chặt chẽ cấu trúc học thuật của TOEFL iBT, bao gồm phản hồi trực tiếp câu hỏi, bổ sung lập luận và minh chứng xác đáng, đồng thời sử dụng đa dạng các cấu trúc phức.'}
              </div>
            </div>
          )}

          {/* TAB 4: SO SÁNH VỚI BÀI LÀM CỦA BẠN (COMPARISON VIEW) */}
          {activeTab === 'comparison' && hasUserComparison && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-600 bg-purple-50 p-3 rounded-xl border border-purple-200">
                <span>
                  Bài thi bạn đã làm ngày: <b>{new Date(sample.userOriginalResponse.completedAt).toLocaleDateString('vi-VN')}</b>
                </span>
                <span className="font-black text-purple-900">
                  Điểm AI chấm: {sample.userOriginalResponse.userScore} / 5.0
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Bài bạn viết ban đầu */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                    1. Bài viết ban đầu của bạn:
                  </span>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-serif leading-relaxed text-slate-800 max-h-80 overflow-y-auto whitespace-pre-line">
                    {sample.userOriginalResponse.userDraft}
                  </div>
                </div>

                {/* Bài sửa Band 5.0 */}
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
                  <span className="text-xs font-black text-emerald-800 uppercase tracking-wider block">
                    2. Bài nâng cấp Band 5.0 của AI:
                  </span>
                  <div className="p-4 rounded-xl bg-white border border-emerald-200 text-xs sm:text-sm font-serif leading-relaxed text-slate-900 max-h-80 overflow-y-auto whitespace-pre-line">
                    {sample.modelEssay}
                  </div>
                </div>
              </div>

              {sample.userOriginalResponse.aiFeedbackSummary && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                  <span className="font-bold text-slate-800 block">Lời phê nhận xét của AI:</span>
                  <p>{sample.userOriginalResponse.aiFeedbackSummary}</p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 sm:p-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/80">
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            💡 Bạn có thể bấm <b>"Thực hành đề này ngay"</b> để tự viết lại đề bài vừa học!
          </span>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => {
                window.speechSynthesis?.cancel();
                onClose();
              }}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              Đóng
            </button>

            <button
              onClick={handleLaunchPractice}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <span>Thực hành đề này</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
