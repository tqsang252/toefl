import React from 'react';
import { Headphones, BookOpen, Mic, PenTool, GraduationCap, Target, Sparkles, BookMarked } from 'lucide-react';

// 4 Kỹ năng làm bài thi chính thức (TOEFL iBT Test Sections)
const EXAM_SKILLS = [
  {
    id: 'listening',
    label: 'LISTENING',
    icon: Headphones,
    borderColor: 'border-[#153e75]',
    activeBorder: 'border-[#153e75] ring-3 ring-blue-400/30 shadow-lg',
    textColor: 'text-[#153e75]',
    iconBg: 'bg-[#153e75]',
    glow: 'shadow-blue-500/10'
  },
  {
    id: 'reading',
    label: 'READING',
    icon: BookOpen,
    borderColor: 'border-[#b45309]',
    activeBorder: 'border-[#b45309] ring-3 ring-amber-400/30 shadow-lg',
    textColor: 'text-[#b45309]',
    iconBg: 'bg-[#b45309]',
    glow: 'shadow-amber-500/10'
  },
  {
    id: 'speaking',
    label: 'SPEAKING',
    icon: Mic,
    borderColor: 'border-[#4d7c0f]',
    activeBorder: 'border-[#4d7c0f] ring-3 ring-emerald-400/30 shadow-lg',
    textColor: 'text-[#4d7c0f]',
    iconBg: 'bg-[#4d7c0f]',
    glow: 'shadow-emerald-500/10'
  },
  {
    id: 'writing',
    label: 'WRITING',
    icon: PenTool,
    borderColor: 'border-[#881337]',
    activeBorder: 'border-[#881337] ring-3 ring-rose-400/30 shadow-lg',
    textColor: 'text-[#881337]',
    iconBg: 'bg-[#881337]',
    glow: 'shadow-rose-500/10'
  }
];

// 2 Trung tâm rèn luyện từ vựng & ngữ cảnh chuyên sâu (Mastery Labs)
const MASTERY_HUBS = [
  {
    id: 'vocabulary',
    label: 'VOCABULARY HUB',
    subtitle: '3,000 Từ vựng học thuật & Flashcards',
    badge: 'Flashcards',
    badgeBg: 'bg-purple-100/80 text-purple-900 border-purple-200',
    icon: GraduationCap,
    borderColor: 'border-[#6b21a8]',
    activeBorder: 'border-[#6b21a8] ring-3 ring-purple-400/30 shadow-lg',
    textColor: 'text-[#6b21a8]',
    iconBg: 'bg-[#6b21a8]',
    glow: 'shadow-purple-500/10'
  },
  {
    id: 'context_vocab',
    label: 'CONTEXT VOCAB TRAINER',
    subtitle: '50 Bài đọc TOEFL & Giải mã manh mối',
    badge: '50 Đề ETS',
    badgeBg: 'bg-teal-100/80 text-teal-900 border-teal-200',
    icon: Target,
    borderColor: 'border-[#0f766e]',
    activeBorder: 'border-[#0f766e] ring-3 ring-teal-500/30 shadow-lg',
    textColor: 'text-[#0f766e]',
    iconBg: 'bg-[#0f766e]',
    glow: 'shadow-teal-500/10'
  }
];

export default function SkillTabs({ activeSkill, onSelectSkill }) {
  return (
    <div className="my-5 sm:my-6 space-y-3 sm:space-y-3.5">
      {/* HÀNG 1: 4 KỸ NĂNG THI CHÍNH THỨC (LISTENING, READING, SPEAKING, WRITING) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
        {EXAM_SKILLS.map((skill) => {
          const Icon = skill.icon;
          const isActive = activeSkill === skill.id;

          return (
            <button
              key={skill.id}
              onClick={() => onSelectSkill(skill.id)}
              className={`flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-2xl bg-white border-2 transition-all duration-200 cursor-pointer text-left ${
                isActive
                  ? `${skill.activeBorder} scale-[1.02] bg-white`
                  : 'border-[#dfd8cc] hover:border-slate-400 hover:shadow-md opacity-85 hover:opacity-100'
              }`}
            >
              {/* Icon tròn đồng bộ */}
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${skill.iconBg} text-white flex items-center justify-center shrink-0 shadow-xs`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              {/* Tên Kỹ năng (1 dòng duy nhất, không bao giờ bị tràn/gãy chữ) */}
              <div className="flex-1 min-w-0">
                <span
                  className={`text-xs sm:text-sm font-black tracking-wider block whitespace-nowrap truncate ${skill.textColor}`}
                >
                  {skill.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* HÀNG 2: 2 TRUNG TÂM LUYỆN TẬP TỪ VỰNG CHUYÊN SÂU (VOCABULARY HUB & CONTEXT VOCAB) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
        {MASTERY_HUBS.map((hub) => {
          const Icon = hub.icon;
          const isActive = activeSkill === hub.id;

          return (
            <button
              key={hub.id}
              onClick={() => onSelectSkill(hub.id)}
              className={`flex items-center justify-between gap-3 px-4 py-3 sm:py-3.5 rounded-2xl bg-white border-2 transition-all duration-200 cursor-pointer text-left ${
                isActive
                  ? `${hub.activeBorder} scale-[1.01] bg-white`
                  : 'border-[#dfd8cc] hover:border-slate-400 hover:shadow-md opacity-90 hover:opacity-100'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Icon tròn */}
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${hub.iconBg} text-white flex items-center justify-center shrink-0 shadow-xs`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>

                {/* Tiêu đề & Phụ đề giải thích */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs sm:text-sm font-black tracking-wider whitespace-nowrap ${hub.textColor}`}>
                      {hub.label}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate mt-0.5">
                    {hub.subtitle}
                  </p>
                </div>
              </div>

              {/* Huy hiệu định danh góc phải */}
              <span
                className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border shrink-0 hidden sm:inline-block ${hub.badgeBg}`}
              >
                {hub.badge}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
