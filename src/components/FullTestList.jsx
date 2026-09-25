import React, { useState, useMemo, useEffect } from 'react';
import { 
  Play, 
  Clock, 
  Award, 
  Trash2, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  BookOpen, 
  Headphones, 
  PenTool, 
  Mic,
  ShieldCheck,
  Zap,
  History,
  Search,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const getTestTimestamp = (t) => {
  if (!t) return 0;
  const ms = t.created_at_ms || t.content?.created_at_ms;
  if (ms && typeof ms === 'number') return ms;

  const match = String(t.id || '').match(/(\d{13})/);
  if (match) {
    const ts = parseInt(match[1], 10);
    if (!isNaN(ts) && ts > 1600000000000 && ts < 2500000000000) {
      return ts;
    }
  }

  const rawDate = t.content?.created_at || t.created_at;
  if (rawDate && rawDate !== '2026-09-22T08:00:00.000Z') {
    const d = new Date(rawDate);
    if (!isNaN(d.getTime())) {
      return d.getTime();
    }
  }

  const numMatch = String(t.id || '').match(/(\d+)/);
  if (numMatch) {
    return parseInt(numMatch[1], 10);
  }

  return 0;
};

export default function FullTestList({ 
  tests = [], 
  onStartTest, 
  onDeleteTest, 
  onOpenImport,
  onOpenHistory,
  testHistories = {} 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 8;

  // Sắp xếp bài thi theo thời gian tạo gần nhất (Newest first)
  const sortedTests = useMemo(() => {
    return [...(tests || [])].sort((a, b) => {
      const timeA = getTestTimestamp(a);
      const timeB = getTestTimestamp(b);
      if (timeB !== timeA) {
        return timeB - timeA;
      }
      return String(b.id || '').localeCompare(String(a.id || ''));
    });
  }, [tests]);

  // Lọc theo từ khóa tìm kiếm (Title)
  const filteredTests = useMemo(() => {
    if (!searchQuery.trim()) return sortedTests;
    const query = searchQuery.trim().toLowerCase();
    return sortedTests.filter((t) => {
      const titleMatch = (t.title || '').toLowerCase().includes(query);
      const descMatch = (t.description || '').toLowerCase().includes(query);
      return titleMatch || descMatch;
    });
  }, [sortedTests, searchQuery]);

  // Reset trang khi thay đổi từ khóa tìm kiếm
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Phân trang
  const totalItems = filteredTests.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const paginatedTests = filteredTests.slice(startIndex, startIndex + PAGE_SIZE);
  return (
    <div className="space-y-6 my-6">
      
      {/* 1. Banner Giới Thiệu Quy Trình Thi Thử Chuẩn ETS 2026 */}
      <div className="bg-gradient-to-br from-[#0f1f38] via-[#153e75] to-[#0f2e59] rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        {/* Glow effects */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[11px] font-black uppercase px-3 py-1 rounded-full bg-teal-400/20 text-teal-300 border border-teal-400/30 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>TOEFL iBT 2026 OFFICIAL FULL SIMULATION</span>
            </span>
            <span className="text-xs text-slate-300 font-medium">
              4 Kỹ Năng Liên Tục • ~90 Phút • Thang Điểm 0 - 120
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            Trung Tâm Thi Thử Toàn Phần (Take Full Test)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed mb-6">
            Mô phỏng trải nghiệm thi thật 100%: Thứ tự các phần thi được điều phối tự động, đồng hồ đếm ngược độc lập cho từng module, khóa phần thi khi chuyển tiếp và chấm điểm tổng hợp 4 kỹ năng chuẩn ETS.
          </p>

          {/* Sơ đồ 4 chặng thi liên tục: Reading -> Listening -> Writing -> Speaking */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            
            {/* Chặng 1: Reading */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15">
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-black text-xs">
                  1
                </span>
                <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded">
                  30 phút
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-sm text-white mb-0.5">
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>Reading</span>
              </div>
              <p className="text-[11px] text-slate-300">
                2 Module MSAT (Words, Daily Life, Academic)
              </p>
            </div>

            {/* Chặng 2: Listening */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15">
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center font-black text-xs">
                  2
                </span>
                <span className="text-[10px] font-bold text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded">
                  29 phút
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-sm text-white mb-0.5">
                <Headphones className="w-4 h-4 text-blue-300" />
                <span>Listening</span>
              </div>
              <p className="text-[11px] text-slate-300">
                2 Module MSAT (Response, Notice, Talk)
              </p>
            </div>

            {/* Chặng 3: Writing (Đứng trước Speaking theo yêu cầu) */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15">
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center font-black text-xs">
                  3
                </span>
                <span className="text-[10px] font-bold text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded">
                  23 phút
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-sm text-white mb-0.5">
                <PenTool className="w-4 h-4 text-rose-300" />
                <span>Writing</span>
              </div>
              <p className="text-[11px] text-slate-300">
                3 Tasks (Sentence, Email, Discussion)
              </p>
            </div>

            {/* Chặng 4: Speaking */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15">
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-black text-xs">
                  4
                </span>
                <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded">
                  8 phút
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-sm text-white mb-0.5">
                <Mic className="w-4 h-4 text-emerald-300" />
                <span>Speaking</span>
              </div>
              <p className="text-[11px] text-slate-300">
                2 Tasks (Repeat 7 câu + Interview 4 câu)
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Tiêu Đề Danh Sách Đề Full Test & Nút Import */}
      <div className="bg-white rounded-2xl border border-[#e5dfd5] shadow-xs overflow-hidden">
        
        <div className="px-6 py-4 border-b border-[#eee8df] bg-[#faf8f4] flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-teal-600" />
            <h2 className="text-base font-extrabold text-slate-800 uppercase tracking-tight">
              DANH SÁCH BỘ ĐỀ FULL TEST MÔ PHỎNG (4 KỸ NĂNG)
            </h2>
          </div>

          {/* Khung tìm kiếm ở vị trí khung đỏ */}
          <div className="flex-1 max-w-sm w-full relative">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm tên bài thi Full Test..."
                className="w-full pl-9 pr-8 py-2 text-xs font-medium rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 text-slate-800 placeholder:text-slate-400 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
                  title="Xóa tìm kiếm"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <button
            onClick={onOpenImport}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-all cursor-pointer shadow-2xs self-start md:self-auto shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span>Tạo bài thi thử Full Test</span>
          </button>
        </div>

        {/* Lưới các đề Full Test */}
        <div className="p-6">
          {totalItems === 0 ? (
            <div className="text-center py-12 text-slate-500">
              {searchQuery.trim() ? (
                <div className="space-y-2">
                  <Search className="w-8 h-8 mx-auto text-slate-300" />
                  <p className="text-base font-semibold text-slate-700">
                    Không tìm thấy bài thi Full Test nào phù hợp với từ khóa "{searchQuery}"
                  </p>
                  <p className="text-xs text-slate-400">
                    Hãy thử kiểm tra lại chính tả hoặc tìm với từ khóa ngắn hơn.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="mt-2 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                  >
                    Xóa tìm kiếm
                  </button>
                </div>
              ) : (
                <div>
                  <Layers className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                  <p className="text-sm font-semibold">Chưa có đề Full Test nào trong danh sách.</p>
                  <p className="text-xs text-slate-400 mt-1">Bấm "Tạo bài thi thử Full Test" để tự động tạo bộ đề thi thử mới ngay.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {paginatedTests.map((test) => {
                const totalMinutes = Math.round((test.duration_seconds || 5400) / 60);
                const history = testHistories[test.id];

              return (
                <div
                  key={test.id}
                  className="p-6 rounded-2xl border border-slate-200 hover:border-teal-600 hover:shadow-md transition-all bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-6 group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap mb-2">
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-300">
                        Full 4 Skills
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                        ETS 2026 Flow
                      </span>
                      <h3 className="font-black text-slate-900 text-lg group-hover:text-teal-700 transition-colors">
                        {test.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed max-w-2xl mb-4">
                      {test.description || 'Bài thi thử TOEFL iBT 4 kỹ năng liên tục với đồng hồ đếm ngược và tổng kết thang điểm 0 - 120.'}
                    </p>

                    {/* Trình tự 4 phần thi hiển thị trực quan */}
                    <div className="flex items-center gap-2 text-xs flex-wrap font-semibold text-slate-500">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>1. Reading (30m)</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
                        <Headphones className="w-3.5 h-3.5" />
                        <span>2. Listening (29m)</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200">
                        <PenTool className="w-3.5 h-3.5" />
                        <span>3. Writing (23m)</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <Mic className="w-3.5 h-3.5" />
                        <span>4. Speaking (8m)</span>
                      </span>
                    </div>
                  </div>

                  {/* Khối Nút Bắt Đầu & Điểm Lịch Sử */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-2.5 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    
                    {(() => {
                      const testHistoryList = Array.isArray(testHistories[test.id]) 
                        ? testHistories[test.id] 
                        : testHistories[test.id] ? [testHistories[test.id]] : [];
                      const historyCount = testHistoryList.length;
                      const latest = testHistoryList[0];

                      return historyCount > 0 ? (
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Đã thi {historyCount} lần (Gần nhất: {latest?.score_raw || 0}/120 • Band {latest?.score_band ? Number(latest.score_band).toFixed(1) : '5.5'})</span>
                          </div>

                          {onOpenHistory && (
                            <button
                              onClick={() => onOpenHistory(test)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                              title="Xem chi tiết các lần làm bài và đáp án cũ"
                            >
                              <History className="w-3.5 h-3.5 text-teal-700" />
                              <span>Lịch sử & đáp án ({historyCount})</span>
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                          Chưa thi lần nào
                        </span>
                      );
                    })()}

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onStartTest(test)}
                          className="px-6 py-3 bg-[#153e75] hover:bg-[#0f2e59] active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-900/20 transition-all cursor-pointer flex items-center gap-2"
                        >
                          <Play className="w-4 h-4 fill-current" />
                          <span>Bắt đầu thi Full Mock ({totalMinutes} Phút)</span>
                        </button>

                        {onDeleteTest && test.id !== 'toefl-full-mock-01' && (
                          <button
                            onClick={() => {
                              if (confirm(`Bạn có chắc muốn xóa đề thi thử "${test.title}"?`)) {
                                onDeleteTest(test.id);
                              }
                            }}
                            className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer border border-slate-200"
                            title="Xóa đề này"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Phân trang (Pagination) */}
        {totalItems > 0 && (
          <div className="px-6 py-4 bg-[#faf8f4] border-t border-[#eee8df] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-500 font-medium">
              Hiển thị <span className="font-bold text-slate-800">{startIndex + 1} - {Math.min(startIndex + PAGE_SIZE, totalItems)}</span> trên tổng số <span className="font-bold text-slate-800">{totalItems}</span> bài thi {searchQuery.trim() && `(khớp với "${searchQuery.trim()}")`}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={safePage === 1}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-white hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Trước</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    if (totalPages > 7) {
                      if (
                        pageNum !== 1 && 
                        pageNum !== totalPages && 
                        Math.abs(pageNum - safePage) > 1
                      ) {
                        if (pageNum === 2 && safePage > 3) return <span key={pageNum} className="px-1 text-slate-400 text-xs">...</span>;
                        if (pageNum === totalPages - 1 && safePage < totalPages - 2) return <span key={pageNum} className="px-1 text-slate-400 text-xs">...</span>;
                        return null;
                      }
                    }

                    const isActive = pageNum === safePage;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                          isActive
                            ? 'bg-teal-700 text-white shadow-xs'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={safePage === totalPages}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-white hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  <span>Sau</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
