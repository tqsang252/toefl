import React from 'react';
import { Clock, Award, Trash2, ArrowRight, Play, CheckCircle2, History } from 'lucide-react';

export default function TestList({ 
  skill, 
  tests, 
  onStartTest, 
  onDeleteTest,
  onOpenHistory,
  testHistories = {} 
}) {
  const skillNameUpper = skill.toUpperCase();

  return (
    <div className="bg-white rounded-2xl border border-[#e5dfd5] shadow-sm overflow-hidden my-6">
      
      {/* Header matching original screenshot */}
      <div className="px-6 py-5 border-b border-[#eee8df] bg-[#faf8f4]">
        <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-slate-800 uppercase flex items-center gap-2">
          <span>PRACTICE EXAMS FOR CURRENT SKILL</span>
          <span className="text-teal-700">({skillNameUpper})</span>
        </h2>
      </div>

      {/* Tests Grid */}
      <div className="p-6">
        {tests.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <p className="text-base font-medium">Chưa có đề thi nào cho phần này.</p>
            <p className="text-xs text-slate-400 mt-1">Bấm "Import Đề AI" để thêm đề thi mới nhanh chóng.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {tests.map((test) => {
              const durationMin = Math.round((test.duration_seconds || 600) / 60);
              const testHistoryList = Array.isArray(testHistories[test.id])
                ? testHistories[test.id]
                : testHistories[test.id] ? [testHistories[test.id]] : [];
              const historyCount = testHistoryList.length;
              const latest = testHistoryList[0];

              return (
                <div 
                  key={test.id} 
                  className="flex items-start justify-between gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50/50 transition-all group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors">
                        {test.title}
                      </h3>

                      {test.stages && test.stages.length > 0 ? (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-teal-100 text-teal-800 border border-teal-300">
                          {test.stages.length} Modules (Stage 1 & 2)
                        </span>
                      ) : test.modules && test.modules.length > 0 ? (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-teal-100 text-teal-800 border border-teal-300">
                          {test.modules.length} Modules
                        </span>
                      ) : test.task_type ? (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          {test.task_type.replace('_', ' ')}
                        </span>
                      ) : null}
                    </div>

                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {test.description || test.content?.instructions || 'Comprehensive TOEFL 2026 practice test.'}
                    </p>

                    <div className="flex items-center gap-3 mt-3 text-[11px] text-slate-500 flex-wrap">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {durationMin} mins
                      </span>

                      {historyCount > 0 ? (
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Đã thi {historyCount} lần (Band {latest?.score_band ? Number(latest.score_band).toFixed(1) : '5.5'})
                          </span>

                          {onOpenHistory && (
                            <button
                              onClick={() => onOpenHistory(test)}
                              className="flex items-center gap-1 text-teal-800 font-bold bg-teal-50 hover:bg-teal-100 px-2 py-0.5 rounded border border-teal-200 text-[11px] transition-colors cursor-pointer shadow-2xs"
                              title="Xem lại các lần làm bài và đáp án cũ"
                            >
                              <History className="w-3 h-3 text-teal-700" />
                              <span>Lịch sử ({historyCount})</span>
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400 font-medium">
                          Chưa thi lần nào
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => onStartTest(test)}
                      className="px-4 py-2 bg-[#153e75] hover:bg-[#0f2e59] active:scale-95 text-white text-xs font-bold rounded-lg shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>[Take Practice Test]</span>
                    </button>

                    {/* Delete button if user added */}
                    {onDeleteTest && (
                      <button
                        onClick={() => {
                          if (confirm(`Bạn có chắc muốn xóa đề thi "${test.title}"?`)) {
                            onDeleteTest(test.id);
                          }
                        }}
                        className="text-slate-300 hover:text-rose-500 p-1 rounded transition-colors text-xs"
                        title="Xóa đề này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
