import React from 'react';
import { Headphones, BookOpen, Mic, PenTool, GraduationCap, Target } from 'lucide-react';

const SKILLS = [
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
  },
  {
    id: 'vocabulary',
    label: 'VOCABULARY',
    icon: GraduationCap,
    borderColor: 'border-[#6b21a8]',
    activeBorder: 'border-[#6b21a8] ring-3 ring-purple-400/30 shadow-lg',
    textColor: 'text-[#6b21a8]',
    iconBg: 'bg-[#6b21a8]',
    glow: 'shadow-purple-500/10'
  },
  {
    id: 'context_vocab',
    label: 'CONTEXT VOCAB',
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
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 my-6">
      {SKILLS.map((skill) => {
        const Icon = skill.icon;
        const isActive = activeSkill === skill.id;

        return (
          <button
            key={skill.id}
            onClick={() => onSelectSkill(skill.id)}
            className={`flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-4 rounded-2xl bg-white border-2 transition-all duration-200 cursor-pointer text-left ${
              isActive 
                ? `${skill.activeBorder} scale-[1.02] bg-white` 
                : 'border-[#dfd8cc] hover:border-slate-400 hover:shadow-md opacity-85 hover:opacity-100'
            }`}
          >
            {/* Round Icon matching original design */}
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${skill.iconBg} text-white flex items-center justify-center shrink-0 shadow-xs`}>
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>

            {/* Title */}
            <div className="flex-1 min-w-0">
              <span className={`text-xs sm:text-sm lg:text-sm xl:text-base font-black tracking-wider ${skill.textColor}`}>
                {skill.label}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
