import React from 'react';
import { 
  X, 
  History, 
  Calendar, 
  Clock, 
  Award, 
  Eye, 
  CheckCircle2, 
  BookOpen, 
  Headphones, 
  PenTool, 
  Mic,
  ChevronRight
} from 'lucide-react';

export default function ExamHistoryModal({ 
  isOpen, 
  onClose, 
  test, 
  histories = [], 
  onViewResultDetail 
}) {
  if (!isOpen || !test) return null;

  const totalAttempts = histories.length;
  const isFullTest = test.skill === 'full';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header Modal */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center shadow-2xs">
              <History className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                  Lịch Sử Bài Làm ({totalAttempts} lần thi)
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                  {test.skill?.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium truncate max-w-md">
                {test.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Danh sách các lần thi (Timeline) */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {totalAttempts === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <History className="w-12 h-12 mx-auto mb-3 text-slate-300 stroke-1" />
              <p className="text-sm font-semibold text-slate-600">Bạn chưa làm bài thi này lần nào</p>
              <p className="text-xs text-slate-400 mt-1">Hãy bấm bắt đầu làm bài để ghi nhận kết quả và chấm điểm.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {histories.map((hist, idx) => {
                const attemptNum = totalAttempts - idx; // Đếm ngược: Lần mới nhất có số lớn nhất
                const completedDate = hist.completed_at 
                  ? new Date(hist.completed_at).toLocaleString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit',
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })
                  : 'Vừa xong';

                const minutes = Math.floor((hist.time_spent_seconds || 0) / 60);
                const seconds = (hist.time_spent_seconds || 0) % 60;
                const timeStr = `${minutes}m ${seconds}s`;

                const isFull = hist.is_full_test || test.skill === 'full';
                const skillScores = hist.skill_scores;

                return (
                  <div
                    key={hist.id || idx}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white hover:border-teal-300 hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  >
                    {/* Cột trái: Thông tin lần thi & Ngày giờ */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-[#153e75] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                          {attemptNum}
                        </span>
                        <span className="font-extrabold text-slate-900 text-sm">
                          Lần thi thứ {attemptNum}
                        </span>
                        {idx === 0 && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            Mới nhất
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{completedDate}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{timeStr}</span>
                        </span>
                      </div>

                      {/* Điểm chi tiết 4 kỹ năng (nếu là full test) */}
                      {isFull && skillScores && (
                        <div className="flex items-center gap-2 text-[11px] font-bold pt-1 flex-wrap">
                          <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            <span>R: {skillScores.reading}/30</span>
                          </span>
                          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1">
                            <Headphones className="w-3 h-3" />
                            <span>L: {skillScores.listening}/30</span>
                          </span>
                          <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200 flex items-center gap-1">
                            <PenTool className="w-3 h-3" />
                            <span>W: {skillScores.writing}/30</span>
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                            <Mic className="w-3 h-3" />
                            <span>S: {skillScores.speaking}/30</span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Cột phải: Điểm số & Nút xem chi tiết */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      {/* Box Điểm */}
                      <div className="text-right">
                        <div className="flex items-baseline justify-end gap-1">
                          <span className="text-xl sm:text-2xl font-black text-slate-900">
                            {isFull ? (hist.score_raw || skillScores?.total || 0) : hist.score_raw}
                          </span>
                          <span className="text-xs font-semibold text-slate-400">
                            /{isFull ? '120' : (hist.total_questions || '30')}
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 inline-block mt-0.5">
                          Band {hist.score_band ? Number(hist.score_band).toFixed(1) : '5.5'}
                        </span>
                      </div>

                      {/* Nút Xem Lại Chi Tiết Đáp Án */}
                      <button
                        onClick={() => onViewResultDetail(test, hist)}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-[#153e75] hover:text-white text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
                        title="Xem lại từng câu hỏi và đáp án bạn đã làm lần này"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Xem lại bài làm</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Modal */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50 text-xs text-slate-500">
          <span>
            💡 Bạn có thể xem lại chi tiết mọi câu hỏi, bài viết và file ghi âm của từng lần thi.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 font-bold text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
}
