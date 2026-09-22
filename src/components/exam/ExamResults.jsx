import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, Clock, RotateCcw, Home, HelpCircle, Layers, BookOpen, Headphones, PenTool, Mic, Zap } from 'lucide-react';

export default function ExamResults({ test, results, onRetake, onBackHome }) {
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
  const isFullExam = is_full_test || test.skill === 'full' || skill === 'full';

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
        const modSkill = (mod.module_skill || mod.skill || '').toLowerCase();
        return modSkill === selectedSkillFilter;
      })
    : [];

  const getSkillColor = (s) => {
    switch ((s || '').toLowerCase()) {
      case 'reading': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'listening': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'writing': return 'text-rose-700 bg-rose-50 border-rose-200';
      case 'speaking': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      default: return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

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
                <div className="text-4xl sm:text-5xl font-black text-white">
                  {skill_scores?.total || score_raw}
                  <span className="text-base text-slate-300 font-medium ml-1">/ 120</span>
                </div>
                <span className="text-[10px] text-slate-300 font-medium block mt-1.5">
                  Thang điểm chuẩn ETS toàn cầu
                </span>
              </div>

              {/* Band Score 2026 */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-teal-50 to-emerald-50/50 border border-teal-200">
                <span className="text-[11px] font-bold text-teal-800 uppercase block mb-1">
                  TOEFL Band (2026)
                </span>
                <div className="text-4xl sm:text-5xl font-black text-teal-700">
                  {score_band?.toFixed(1) || '5.5'}
                  <span className="text-base text-teal-600 font-medium ml-1">/ 6.0</span>
                </div>
                <span className="text-[10px] text-teal-600 font-semibold block mt-1.5">
                  Thang đo năng lực 6 bậc mới
                </span>
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
                  {skill_scores?.reading ?? 26}
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
                  {skill_scores?.listening ?? 25}
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
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                    23 Phút
                  </span>
                </div>
                <div className="text-2xl font-black text-rose-900">
                  {skill_scores?.writing ?? 27}
                  <span className="text-xs text-rose-700 font-semibold ml-0.5">/ 30</span>
                </div>
                <span className="text-[10px] text-rose-700 block mt-1">
                  3 Tasks (Sentence, Email, Discuss)
                </span>
              </div>

              {/* Speaking */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="flex items-center gap-1.5 text-xs font-black text-emerald-900 uppercase">
                    <Mic className="w-4 h-4 text-emerald-600" />
                    <span>Speaking</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                    8 Phút
                  </span>
                </div>
                <div className="text-2xl font-black text-emerald-900">
                  {skill_scores?.speaking ?? 26}
                  <span className="text-xs text-emerald-700 font-semibold ml-0.5">/ 30</span>
                </div>
                <span className="text-[10px] text-emerald-700 block mt-1">
                  2 Tasks (Repeat + Interview)
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================
             GIAO DIỆN BẢNG ĐIỂM CHO BÀI LUYỆN TẬP ĐƠN KỸ NĂNG
             ======================================================== */
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto mb-8">
            {/* Band Score 2026 */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-teal-50 to-emerald-50/50 border border-teal-200">
              <span className="text-[11px] font-bold text-teal-800 uppercase block mb-1">
                TOEFL Band (2026)
              </span>
              <div className="text-4xl font-black text-teal-700">
                {score_band?.toFixed(1) || '5.5'}
                <span className="text-sm text-teal-600 font-medium ml-1">/ 6.0</span>
              </div>
              <span className="text-[10px] text-teal-600 font-semibold block mt-1">
                Điểm toàn phần {skill?.toUpperCase()}
              </span>
            </div>

            {/* Quy đổi thang 30 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-600 uppercase block mb-1">
                Quy đổi thang 0 - 30
              </span>
              <div className="text-4xl font-black text-slate-800">
                {legacyScore30}
                <span className="text-sm text-slate-400 font-medium ml-1">/ 30</span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium block mt-1">
                Thang điểm truyền thống
              </span>
            </div>

            {/* Thời gian làm bài */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-600 uppercase block mb-1">
                Tổng số câu đúng
              </span>
              <div className="text-4xl font-black text-slate-800 mt-0.5">
                {score_raw}
                <span className="text-sm text-slate-400 font-medium ml-1">/ {total_questions}</span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium block mt-1">
                Thời gian: {timeFormatted}
              </span>
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

      {/* Bộ lọc kỹ năng nếu là Full Test */}
      {isFullExam && isModuleGrouped && (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-600" />
            <span>Xem lại chi tiết từng phần thi:</span>
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

                <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                  Đúng: {mod.score_raw} / {mod.total_questions}
                </span>
              </div>

              {/* Danh sách câu hỏi trong module này */}
              <div className="space-y-4">
                {mod.items && mod.items.map((item, itemIdx) => {
                  const isCorrect = item.is_correct;
                  return (
                    <div 
                      key={itemIdx}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                        isCorrect 
                          ? 'bg-emerald-50/40 border-emerald-200' 
                          : 'bg-rose-50/40 border-rose-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-slate-500">
                          Câu {itemIdx + 1}
                        </span>
                        {isCorrect ? (
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
                            {item.audio_url ? 'Bài nói của bạn:' : 'Đáp án của bạn:'}
                          </span>
                          <span className={`font-bold ${isCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>
                            {item.user_choice || '(Bỏ trống)'}
                          </span>
                        </div>

                        <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                          <span className="text-slate-500 block text-[10px] uppercase font-bold">
                            {item.audio_url ? 'Nội dung câu nói / Đáp án mẫu:' : 'Đáp án chuẩn:'}
                          </span>
                          <span className="font-bold text-emerald-700">
                            {item.correct_answer && item.correct_answer !== 'undefined' ? item.correct_answer : '(Theo hướng dẫn đề bài)'}
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
