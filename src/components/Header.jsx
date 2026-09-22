import React from 'react';
import { Database, Sparkles, GraduationCap, CheckCircle2, HardDrive } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

export default function Header({ currentView, setCurrentView, onOpenImport, onOpenSettings }) {
  const isConnected = isSupabaseConfigured();

  return (
    <header className="bg-[#f7f5f0]/90 backdrop-blur-sm sticky top-0 z-40 border-b border-[#e2ddd3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentView('practice')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-xl bg-slate-800 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <span className="text-2xl">🦉</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-slate-800 font-serif">
                TOEFL SMART
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                2026 FORMAT
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Hệ thống tự luyện thi TOEFL iBT thích ứng 90 phút
            </p>
          </div>
        </div>

        {/* Navigation Tabs matching screenshot */}
        <nav className="flex items-center gap-6 sm:gap-8">
          <button 
            onClick={() => setCurrentView('practice')}
            className={`font-semibold text-sm transition-all pb-1.5 relative cursor-pointer ${
              currentView === 'home' || currentView === 'practice'
                ? 'text-teal-700 font-bold' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Practice by Skill</span>
            {(currentView === 'home' || currentView === 'practice') && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />
            )}
          </button>

          <button 
            onClick={() => setCurrentView('full_test')}
            className={`font-semibold text-sm transition-all pb-1.5 relative cursor-pointer flex items-center gap-1.5 ${
              currentView === 'full_test'
                ? 'text-teal-700 font-bold' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Take Full Test (90 Mins)</span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
              4 Skills
            </span>
            {currentView === 'full_test' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />
            )}
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* AI Import Button */}
          <button
            onClick={onOpenImport}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg shadow-xs transition-all cursor-pointer"
            title="Import đề thi tạo từ AI"
          >
            <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
            <span className="hidden sm:inline">Import Đề AI</span>
          </button>

          {/* Database Status / Settings Button */}
          <button
            onClick={onOpenSettings}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border shadow-xs transition-all cursor-pointer ${
              isConnected
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
            }`}
            title="Cấu hình kết nối Supabase Database"
          >
            {isConnected ? (
              <>
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">Supabase Connected</span>
              </>
            ) : (
              <>
                <HardDrive className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">Local Mode</span>
              </>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
