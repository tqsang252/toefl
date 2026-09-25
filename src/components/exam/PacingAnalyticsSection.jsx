import React, { useState } from 'react';
import { 
  Clock, 
  Timer, 
  AlertTriangle, 
  Zap, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  TrendingUp, 
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { calculatePacingAnalytics, formatSeconds } from '../../lib/pacingCalculator';

export default function PacingAnalyticsSection({ results, selectedSkill = 'all' }) {
  const analytics = calculatePacingAnalytics(results, selectedSkill);
  const [activeTooltipIndex, setActiveTooltipIndex] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);

  if (!analytics || analytics.questions.length === 0) {
    return null;
  }

  const {
    questions,
    totalQuestions,
    totalSeconds,
    avgSeconds,
    targetSeconds,
    pacingScore,
    scoreTitle,
    scoreColor,
    timeSinksCount,
    rushedWrongCount,
    slowCorrectCount,
    optimalCorrectCount,
    tips
  } = analytics;

  // Chiều cao tối đa trên biểu đồ (tối thiểu 150s để vạch target 75s nằm ở giữa)
  const maxTimeInChart = Math.max(160, ...questions.map(q => q.time_spent_seconds));

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden my-6">
      
      {/* 1. Header Khối Pacing */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center font-black shadow-xs shrink-0">
            <Timer className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                Phân Tích Tốc Độ Làm Bài Từng Câu (Pacing & Time Analytics)
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-teal-400/20 text-teal-300 border border-teal-400/40 uppercase tracking-wider">
                ETS Strategy
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Tổng thời gian: <strong>{formatSeconds(totalSeconds)}</strong> • {totalQuestions} câu hỏi • Mục tiêu chuẩn: ~{targetSeconds}s / câu
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          {/* Huy hiệu điểm Pacing Score */}
          <div className={`px-3 py-1.5 rounded-xl border text-xs font-black shadow-xs flex items-center gap-1.5 ${scoreColor}`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pacing Score: {pacingScore}/100</span>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/80 transition-colors cursor-pointer"
            title={isExpanded ? 'Thu gọn' : 'Mở rộng'}
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-5 sm:p-7 space-y-6">
          
          {/* 2. 4 Thẻ KPI Phân Loại Tốc Độ */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Thời gian trung bình / câu */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">Thời gian TB / Câu</span>
                <Clock className="w-4 h-4 text-slate-400" />
              </div>
              <div className="text-2xl font-black text-slate-800">
                {formatSeconds(avgSeconds)}
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">
                Mục tiêu ETS: {targetSeconds}s
              </span>
            </div>

            {/* Câu Sa Lầy (Time-sinks) */}
            <div className={`p-4 rounded-2xl border ${
              timeSinksCount > 0 ? 'bg-rose-50/70 border-rose-200 text-rose-900' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">Câu Sa Lầy (&gt; 1m45s)</span>
                <AlertTriangle className="w-4 h-4 text-rose-600" />
              </div>
              <div className="text-2xl font-black text-rose-700">
                {timeSinksCount} <span className="text-xs font-normal">câu</span>
              </div>
              <span className="text-[10px] text-rose-600 mt-0.5 block">
                {timeSinksCount > 0 ? 'Nguy cơ mất thời gian cuối giờ' : 'Rất tốt, không bị kẹt giờ'}
              </span>
            </div>

            {/* Câu Đọc Ẩu (Rushed & Wrong) */}
            <div className={`p-4 rounded-2xl border ${
              rushedWrongCount > 0 ? 'bg-amber-50/70 border-amber-200 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">Câu Đọc Ẩu (&lt; 25s)</span>
                <Zap className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-black text-amber-800">
                {rushedWrongCount} <span className="text-xs font-normal">câu</span>
              </div>
              <span className="text-[10px] text-amber-700 mt-0.5 block">
                {rushedWrongCount > 0 ? 'Chọn quá vội & mắc bẫy' : 'Không có câu chọn vội'}
              </span>
            </div>

            {/* Nhịp Độ Vàng (Optimal Pace) */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-900">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Nhịp Độ Vàng</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-emerald-800">
                {optimalCorrectCount} <span className="text-xs font-normal">/ {totalQuestions} câu</span>
              </div>
              <span className="text-[10px] text-emerald-700 mt-0.5 block">
                Hoàn thành chuẩn & đúng
              </span>
            </div>

          </div>

          {/* 3. BIỂU ĐỒ CỘT TƯƠNG TÁC (INTERACTIVE PACING BAR CHART) */}
          <div className="bg-slate-50/70 rounded-2xl border border-slate-200 p-4 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-slate-700" />
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-tight">
                  Biểu Đồ Thời Gian Chi Tiết Từng Câu Hỏi (Giây)
                </h4>
              </div>

              {/* Chú thích màu sắc */}
              <div className="flex items-center gap-3 text-[11px] font-medium text-slate-600 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-emerald-500" />
                  <span>Đúng nhịp & Đúng</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-amber-500" />
                  <span>Đúng nhưng Chậm</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-rose-500" />
                  <span>Sai / Sa lầy / Đọc ẩu</span>
                </div>
              </div>
            </div>

            {/* Khung vẽ biểu đồ */}
            <div className="relative pt-6 pb-2">
              
              {/* Vạch kẻ chuẩn ETS Target */}
              <div 
                className="absolute left-0 right-0 border-b-2 border-dashed border-slate-400 z-10 flex items-center justify-end pr-2 pointer-events-none"
                style={{
                  bottom: `${Math.round((targetSeconds / maxTimeInChart) * 200)}px`
                }}
              >
                <span className="text-[10px] font-bold bg-slate-700 text-white px-2 py-0.5 rounded shadow-2xs">
                  Vạch chuẩn ETS: {targetSeconds}s
                </span>
              </div>

              {/* Lưới các cột thanh */}
              <div className="h-[220px] flex items-end justify-between gap-1 sm:gap-2 px-2 border-b border-slate-300">
                {questions.map((q, idx) => {
                  const barHeightPx = Math.max(16, Math.round((q.time_spent_seconds / maxTimeInChart) * 200));
                  const isHovered = activeTooltipIndex === idx;

                  return (
                    <div 
                      key={q.id || idx}
                      className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer"
                      onClick={() => setActiveTooltipIndex(isHovered ? null : idx)}
                      onMouseEnter={() => setActiveTooltipIndex(idx)}
                      onMouseLeave={() => setActiveTooltipIndex(null)}
                    >
                      {/* Tooltip khi hover */}
                      {isHovered && (
                        <div className="absolute bottom-full mb-3 z-30 w-52 p-3 bg-slate-900 text-white rounded-xl shadow-xl text-left text-xs pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                          <div className="flex items-center justify-between border-b border-slate-700 pb-1.5 mb-1.5 font-bold">
                            <span>Câu #{q.number}</span>
                            <span className={q.is_correct ? 'text-emerald-400' : 'text-rose-400'}>
                              {q.is_correct ? 'ĐÚNG ✓' : 'SAI ✕'}
                            </span>
                          </div>
                          <div className="space-y-1 text-[11px] text-slate-300">
                            <div>Thời gian: <strong className="text-white">{formatSeconds(q.time_spent_seconds)}</strong></div>
                            <div>Đánh giá: <span className="font-semibold text-amber-300">{q.classification.label}</span></div>
                            <div className="text-[10px] text-slate-400 line-clamp-2 mt-1">
                              {q.prompt}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Nhãn thời gian trên đầu cột */}
                      <span className="text-[10px] font-bold text-slate-500 mb-1 opacity-80 group-hover:opacity-100 transition-opacity hidden sm:block">
                        {formatSeconds(q.time_spent_seconds)}
                      </span>

                      {/* Thanh cột */}
                      <div 
                        className="w-full max-w-[36px] rounded-t-lg transition-all transform group-hover:scale-y-105 duration-150 shadow-2xs relative flex items-center justify-center"
                        style={{
                          height: `${barHeightPx}px`,
                          backgroundColor: q.classification.barColor
                        }}
                      >
                        {/* Icon kết quả bên trong thanh cột */}
                        <span className="text-[10px] text-white font-black drop-shadow-xs">
                          {q.is_correct ? '✓' : '✕'}
                        </span>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Nhãn số câu trục hoành X */}
              <div className="flex items-center justify-between gap-1 sm:gap-2 px-2 mt-2">
                {questions.map((q, idx) => (
                  <div 
                    key={idx}
                    className="flex-1 text-center text-[10px] sm:text-[11px] font-bold text-slate-600 truncate"
                  >
                    #{q.number}
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* 4. THẺ LỜI KHUYÊN CHIẾN THUẬT AI (ACTIONABLE PACING ADVICE) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <h4 className="text-xs sm:text-sm font-black text-amber-900 uppercase tracking-tight">
                AI Chiến Thuật Quản Lý Thời Gian & Cắt Lỗ Barem ETS 2026
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tips.map((tip, tIdx) => {
                const isWarn = tip.type === 'warning';
                const isDanger = tip.type === 'danger';
                return (
                  <div 
                    key={tIdx} 
                    className="p-3.5 rounded-xl bg-white border border-amber-200/60 text-xs text-slate-700 space-y-1 shadow-2xs"
                  >
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <span>{isWarn ? '⚠️' : isDanger ? '🚨' : '💡'}</span>
                      <span>{tip.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {tip.content}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
