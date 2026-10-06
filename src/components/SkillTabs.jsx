import React, { useState, useEffect } from 'react';
import { 
  Headphones, 
  BookOpen, 
  Mic, 
  PenTool, 
  GraduationCap, 
  Target, 
  Sparkles, 
  BookMarked, 
  PenLine, 
  Mail, 
  MessageSquare,
  Award,
  Layers,
  Flame,
  CheckCircle2
} from 'lucide-react';

// =========================================================================
// 1. BỐN KỸ NĂNG THI CHÍNH THỨC (TOEFL iBT Full Sections - Format 2026)
// =========================================================================
const EXAM_SKILLS = [
  {
    id: 'listening',
    label: 'LISTENING',
    subtitle: 'Đề thi nghe thích ứng ETS & YouTube',
    badge: 'Adaptive',
    icon: Headphones,
    borderColor: 'border-[#153e75]',
    activeBorder: 'border-[#153e75] ring-3 ring-blue-500/25 bg-blue-50/40 shadow-md',
    textColor: 'text-[#153e75]',
    iconBg: 'bg-[#153e75]',
    badgeBg: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'reading',
    label: 'READING',
    subtitle: 'Đề thi đọc hiểu 2 Modules thích ứng',
    badge: 'Module 1 & 2',
    icon: BookOpen,
    borderColor: 'border-[#b45309]',
    activeBorder: 'border-[#b45309] ring-3 ring-amber-500/25 bg-amber-50/40 shadow-md',
    textColor: 'text-[#b45309]',
    iconBg: 'bg-[#b45309]',
    badgeBg: 'bg-amber-100 text-amber-800'
  },
  {
    id: 'speaking',
    label: 'SPEAKING',
    subtitle: '13 Đề Full Test (Listen & Repeat + Interview)',
    badge: '8 Phút',
    icon: Mic,
    borderColor: 'border-[#15803d]',
    activeBorder: 'border-[#15803d] ring-3 ring-emerald-500/25 bg-emerald-50/40 shadow-md',
    textColor: 'text-[#15803d]',
    iconBg: 'bg-[#15803d]',
    badgeBg: 'bg-emerald-100 text-emerald-800'
  },
  {
    id: 'writing',
    label: 'WRITING (FULL TEST)',
    subtitle: '16 Đề Full Test (3 Tasks: Sentence + Email + Discussion)',
    badge: '23 Phút',
    icon: PenTool,
    borderColor: 'border-[#881337]',
    activeBorder: 'border-[#881337] ring-3 ring-rose-500/25 bg-rose-50/40 shadow-md',
    textColor: 'text-[#881337]',
    iconBg: 'bg-[#881337]',
    badgeBg: 'bg-rose-100 text-rose-800'
  }
];

// =========================================================================
// 2. SÁU TRUNG TÂM RÈN LUYỆN CHUYÊN SÂU (Mastery & Skills Labs)
// =========================================================================
const MASTERY_HUBS = [
  {
    id: 'complete_the_words',
    label: 'COMPLETE THE WORDS',
    subtitle: '100 Đề C-Test điền chữ cái chuẩn ETS 2026',
    badge: '100 Đề',
    icon: PenLine,
    borderColor: 'border-[#4338ca]',
    activeBorder: 'border-[#4338ca] ring-3 ring-indigo-500/25 bg-indigo-50/40 shadow-md',
    textColor: 'text-[#4338ca]',
    iconBg: 'bg-[#4338ca]',
    badgeBg: 'bg-indigo-100 text-indigo-800'
  },
  {
    id: 'vocabulary',
    label: 'VOCABULARY HUB',
    subtitle: '3,000 Từ vựng học thuật & Flashcards ghi nhớ',
    badge: '3,000 Từ',
    icon: GraduationCap,
    borderColor: 'border-[#6b21a8]',
    activeBorder: 'border-[#6b21a8] ring-3 ring-purple-500/25 bg-purple-50/40 shadow-md',
    textColor: 'text-[#6b21a8]',
    iconBg: 'bg-[#6b21a8]',
    badgeBg: 'bg-purple-100 text-purple-800'
  },
  {
    id: 'context_vocab',
    label: 'CONTEXT VOCAB TRAINER',
    subtitle: '100 Bài đọc TOEFL & Tra cứu manh mối ETS',
    badge: '100 Bài',
    icon: Target,
    borderColor: 'border-[#0f766e]',
    activeBorder: 'border-[#0f766e] ring-3 ring-teal-500/25 bg-teal-50/40 shadow-md',
    textColor: 'text-[#0f766e]',
    iconBg: 'bg-[#0f766e]',
    badgeBg: 'bg-teal-100 text-teal-800'
  },
  {
    id: 'speaking_lab',
    label: 'SPEAKING MASTERY LAB',
    subtitle: '1,000 Câu Shadowing & 50 Đề phỏng vấn 45s',
    badge: '1,000 Câu',
    icon: Mic,
    borderColor: 'border-[#047857]',
    activeBorder: 'border-[#047857] ring-3 ring-emerald-500/25 bg-emerald-50/40 shadow-md',
    textColor: 'text-[#047857]',
    iconBg: 'bg-[#047857]',
    badgeBg: 'bg-emerald-100 text-emerald-800'
  },
  {
    id: 'listen_repeat',
    label: 'LISTEN & REPEAT 2026',
    subtitle: '87 Đề Task 1 ETS • 609 Câu luyện phản xạ tức thì',
    badge: '87 Đề',
    icon: Headphones,
    borderColor: 'border-[#0284c7]',
    activeBorder: 'border-[#0284c7] ring-3 ring-sky-500/25 bg-sky-50/40 shadow-md',
    textColor: 'text-[#0284c7]',
    iconBg: 'bg-[#0284c7]',
    badgeBg: 'bg-sky-100 text-sky-800'
  },
  {
    id: 'skill_notes',
    label: 'SKILL NOTES HUB',
    subtitle: 'Sổ tay bí kíp & Số hóa tài liệu đề thi bằng AI',
    badge: 'AI Scanner',
    icon: BookMarked,
    borderColor: 'border-[#0891b2]',
    activeBorder: 'border-[#0891b2] ring-3 ring-cyan-500/25 bg-cyan-50/40 shadow-md',
    textColor: 'text-[#0891b2]',
    iconBg: 'bg-[#0891b2]',
    badgeBg: 'bg-cyan-100 text-cyan-800'
  }
];

// =========================================================================
// 3. BA DẠNG BÀI LUYỆN VIẾT CHUYÊN BIỆT (Writing Tasks Labs)
// =========================================================================
const WRITING_SKILLS_HUBS = [
  {
    id: 'writing_sentence',
    label: 'BUILD A SENTENCE',
    subtitle: 'Task 1: Ghép câu ngữ cảnh & Sổ tay 25 cấu trúc',
    badge: 'Task 1',
    icon: PenTool,
    borderColor: 'border-[#9f1239]',
    activeBorder: 'border-[#9f1239] ring-3 ring-rose-500/25 bg-rose-50/40 shadow-md',
    textColor: 'text-[#9f1239]',
    iconBg: 'bg-[#9f1239]',
    badgeBg: 'bg-rose-100 text-rose-800'
  },
  {
    id: 'writing_email',
    label: 'ACADEMIC EMAIL',
    subtitle: 'Task 2: Soạn email học thuật chuẩn ETS (7 phút)',
    badge: 'Task 2',
    icon: Mail,
    borderColor: 'border-[#c2410c]',
    activeBorder: 'border-[#c2410c] ring-3 ring-orange-500/25 bg-orange-50/40 shadow-md',
    textColor: 'text-[#c2410c]',
    iconBg: 'bg-[#c2410c]',
    badgeBg: 'bg-orange-100 text-orange-800'
  },
  {
    id: 'writing_discussion',
    label: 'ACADEMIC DISCUSSION',
    subtitle: 'Task 3: Viết thảo luận lớp học cùng GS (10 phút)',
    badge: 'Task 3',
    icon: MessageSquare,
    borderColor: 'border-[#0284c7]',
    activeBorder: 'border-[#0284c7] ring-3 ring-sky-500/25 bg-sky-50/40 shadow-md',
    textColor: 'text-[#0284c7]',
    iconBg: 'bg-[#0284c7]',
    badgeBg: 'bg-sky-100 text-sky-800'
  }
];

// =========================================================================
// 4. HAI KHO BÀI MẪU WRITING (Band 5.0 ETS Analysis & Practice)
// =========================================================================
const WRITING_SAMPLE_HUBS = [
  {
    id: 'writing_email_samples',
    label: 'KHO BÀI MẪU EMAIL',
    subtitle: 'Bộ sưu tập bài mẫu Band 5.0, phân tích từ vựng & thực hành viết (Task 2)',
    badge: 'Band 5.0 Mẫu',
    icon: Mail,
    borderColor: 'border-[#ea580c]',
    activeBorder: 'border-[#ea580c] ring-3 ring-orange-500/25 bg-orange-50/40 shadow-md',
    textColor: 'text-[#ea580c]',
    iconBg: 'bg-[#ea580c]',
    badgeBg: 'bg-amber-100 text-amber-800'
  },
  {
    id: 'writing_discussion_samples',
    label: 'KHO BÀI MẪU DISCUSSION',
    subtitle: 'Bộ sưu tập bài mẫu Band 5.0, cấu trúc câu đắt giá & thực hành thảo luận (Task 3)',
    badge: 'Band 5.0 Mẫu',
    icon: MessageSquare,
    borderColor: 'border-[#0284c7]',
    activeBorder: 'border-[#0284c7] ring-3 ring-sky-500/25 bg-sky-50/40 shadow-md',
    textColor: 'text-[#0284c7]',
    iconBg: 'bg-[#0284c7]',
    badgeBg: 'bg-sky-100 text-sky-800'
  }
];

export default function SkillTabs({ activeSkill, onSelectSkill }) {
  // Bộ lọc chuyên mục để giao diện luôn gọn gàng và dễ nhìn
  const [filterCategory, setFilterCategory] = useState('all');

  // Tự động nhận diện category của activeSkill
  useEffect(() => {
    if (filterCategory === 'all') return;

    const isExam = EXAM_SKILLS.some((s) => s.id === activeSkill);
    const isMastery = MASTERY_HUBS.some((s) => s.id === activeSkill);
    const isWriting = WRITING_SKILLS_HUBS.some((s) => s.id === activeSkill) || WRITING_SAMPLE_HUBS.some((s) => s.id === activeSkill);

    if (filterCategory === 'exam' && !isExam) setFilterCategory('all');
    if (filterCategory === 'mastery' && !isMastery) setFilterCategory('all');
    if (filterCategory === 'writing' && !isWriting) setFilterCategory('all');
  }, [activeSkill]);

  const showExam = filterCategory === 'all' || filterCategory === 'exam';
  const showMastery = filterCategory === 'all' || filterCategory === 'mastery';
  const showWriting = filterCategory === 'all' || filterCategory === 'writing';

  return (
    <div className="my-5 sm:my-6 space-y-6">
      
      {/* THANH ĐIỀU HƯỚNG NHANH CÁC NHÓM CHUYÊN ĐỀ (CATEGORY PILLS) */}
      <div className="flex items-center justify-between gap-2 flex-wrap border-b border-slate-200/80 pb-3">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setFilterCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterCategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tất cả các Tab</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${filterCategory === 'all' ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
              15
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilterCategory('exam')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterCategory === 'exam'
                ? 'bg-[#153e75] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>4 Kỹ năng thi chính thức</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${filterCategory === 'exam' ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-600'}`}>
              4
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilterCategory('mastery')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterCategory === 'mastery'
                ? 'bg-[#4338ca] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Rèn luyện chuyên sâu (Mastery Labs)</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${filterCategory === 'mastery' ? 'bg-indigo-900 text-white' : 'bg-slate-100 text-slate-600'}`}>
              6
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilterCategory('writing')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterCategory === 'writing'
                ? 'bg-[#881337] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Luyện viết & Kho bài mẫu</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${filterCategory === 'writing' ? 'bg-rose-900 text-white' : 'bg-slate-100 text-slate-600'}`}>
              5
            </span>
          </button>
        </div>

        <span className="text-[11px] font-semibold text-slate-400 hidden xl:inline">
          Ưu tiên hiển thị tên đầy đủ & rõ nghĩa mọi chuyên đề
        </span>
      </div>

      {/* =================================================================== */}
      {/* PHẦN 1: 4 KỸ NĂNG THI CHÍNH THỨC (LISTENING, READING, SPEAKING, WRITING) */}
      {/* =================================================================== */}
      {showExam && (
        <section className="space-y-2.5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-xs"></span>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                4 Kỹ năng thi chuẩn ETS (TOEFL Full Tests 2026)
              </h3>
            </div>
            <span className="text-[11px] font-bold text-slate-400">
              Có tính thời gian & chấm điểm đầy đủ
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {EXAM_SKILLS.map((skill) => {
              const Icon = skill.icon;
              const isActive = activeSkill === skill.id;

              return (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => onSelectSkill(skill.id)}
                  className={`group relative flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white border-2 transition-all duration-200 cursor-pointer text-left ${
                    isActive
                      ? `${skill.activeBorder} scale-[1.01]`
                      : 'border-[#dfd8cc] hover:border-slate-400 hover:shadow-md hover:bg-slate-50/50'
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-xl ${skill.iconBg} text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Nội dung text - Luôn hiện full tên, không cắt chữ */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1.5 mb-0.5">
                      <span className={`text-xs sm:text-sm font-black tracking-wide leading-tight ${skill.textColor}`}>
                        {skill.label}
                      </span>
                      {skill.badge && (
                        <span className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-md shrink-0 ${skill.badgeBg}`}>
                          {skill.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                      {skill.subtitle}
                    </p>
                  </div>

                  {/* Chỉ báo active */}
                  {isActive && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* =================================================================== */}
      {/* PHẦN 2: 6 TRUNG TÂM RÈN LUYỆN CHUYÊN SÂU (MASTERY LABS - LƯỚI 3x2 CÂN ĐỐI) */}
      {/* =================================================================== */}
      {showMastery && (
        <section className="space-y-2.5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 shadow-xs"></span>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                Trung tâm rèn luyện chuyên sâu (Mastery Labs)
              </h3>
            </div>
            <span className="text-[11px] font-bold text-slate-400">
              6 Kho kỹ năng bổ trợ từ vựng & phản xạ
            </span>
          </div>

          {/* Lưới 3 cột cân đối: Mỗi card rộng rãi, hiện trọn vẹn 100% tiêu đề không bao giờ bị cắt ngắn */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {MASTERY_HUBS.map((hub) => {
              const Icon = hub.icon;
              const isActive = activeSkill === hub.id;

              return (
                <button
                  key={hub.id}
                  type="button"
                  onClick={() => onSelectSkill(hub.id)}
                  className={`group relative flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white border-2 transition-all duration-200 cursor-pointer text-left ${
                    isActive
                      ? `${hub.activeBorder} scale-[1.01]`
                      : 'border-[#dfd8cc] hover:border-slate-400 hover:shadow-md hover:bg-slate-50/50'
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-xl ${hub.iconBg} text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Nội dung text - Hiện FULL TÊN KHÔNG RÚT GỌN */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1.5 mb-0.5">
                      <span className={`text-xs sm:text-sm font-black tracking-wide leading-tight ${hub.textColor}`}>
                        {hub.label}
                      </span>
                      {hub.badge && (
                        <span className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-md shrink-0 ${hub.badgeBg}`}>
                          {hub.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                      {hub.subtitle}
                    </p>
                  </div>

                  {/* Chỉ báo active */}
                  {isActive && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* =================================================================== */}
      {/* PHẦN 3: LUYỆN VIẾT TỪNG PHẦN & KHO BÀI MẪU WRITING ETS 2026 */}
      {/* =================================================================== */}
      {showWriting && (
        <section className="space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-700 shadow-xs"></span>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                Chuyên đề luyện viết & Kho bài mẫu Writing ETS 2026
              </h3>
            </div>
            <span className="text-[11px] font-bold text-slate-400">
              3 Dạng bài thi riêng biệt + 2 Kho bài mẫu Band 5.0
            </span>
          </div>

          {/* Hàng 3A: 3 Dạng bài luyện viết riêng biệt */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {WRITING_SKILLS_HUBS.map((hub) => {
              const Icon = hub.icon;
              const isActive = activeSkill === hub.id;

              return (
                <button
                  key={hub.id}
                  type="button"
                  onClick={() => onSelectSkill(hub.id)}
                  className={`group relative flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white border-2 transition-all duration-200 cursor-pointer text-left ${
                    isActive
                      ? `${hub.activeBorder} scale-[1.01]`
                      : 'border-[#dfd8cc] hover:border-slate-400 hover:shadow-md hover:bg-slate-50/50'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${hub.iconBg} text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1.5 mb-0.5">
                      <span className={`text-xs sm:text-sm font-black tracking-wide leading-tight ${hub.textColor}`}>
                        {hub.label}
                      </span>
                      {hub.badge && (
                        <span className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-md shrink-0 ${hub.badgeBg}`}>
                          {hub.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                      {hub.subtitle}
                    </p>
                  </div>

                  {isActive && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Hàng 3B: 2 Kho bài mẫu Writing cao cấp (Band 5.0) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-0.5">
            {WRITING_SAMPLE_HUBS.map((hub) => {
              const Icon = hub.icon;
              const isActive = activeSkill === hub.id;

              return (
                <button
                  key={hub.id}
                  type="button"
                  onClick={() => onSelectSkill(hub.id)}
                  className={`group relative flex items-start gap-3.5 p-4 rounded-2xl bg-white border-2 transition-all duration-200 cursor-pointer text-left ${
                    isActive
                      ? `${hub.activeBorder} scale-[1.01]`
                      : 'border-[#dfd8cc] hover:border-slate-400 hover:shadow-md hover:bg-slate-50/50'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${hub.iconBg} text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className={`text-xs sm:text-sm font-black tracking-wide leading-tight ${hub.textColor}`}>
                        {hub.label}
                      </span>
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shrink-0 border border-amber-300 ${hub.badgeBg}`}>
                        ★ {hub.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                      {hub.subtitle}
                    </p>
                  </div>

                  {isActive && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
}
