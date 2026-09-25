import React, { useState, useMemo, useEffect } from 'react';
import { 
  Clock, 
  Award, 
  Trash2, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  History, 
  Sparkles,
  PenTool,
  Mail,
  MessageSquare,
  Layers,
  ChevronDown,
  Calendar,
  Search,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const formatDateTime = (dateVal) => {
  if (!dateVal) return null;
  try {
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return null;
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${hours}:${minutes} • ${day}/${month}/${year}`;
  } catch (e) {
    return null;
  }
};

const getTestTimestamp = (t) => {
  if (!t) return 0;

  // 1. Ưu tiên số timestamp mili-giây chính xác từ máy tính (created_at_ms)
  const ms = t.created_at_ms || t.content?.created_at_ms;
  if (ms && typeof ms === 'number') {
    return ms;
  }

  // 2. Trích xuất timestamp từ id nếu có dạng test_ai_1790139298569_1, test_1790139298569, v.v.
  const match = String(t.id || '').match(/(\d{13})/);
  if (match) {
    const ts = parseInt(match[1], 10);
    if (!isNaN(ts) && ts > 1600000000000 && ts < 2500000000000) {
      return ts;
    }
  }

  // 3. Nếu t.created_at hoặc t.content?.created_at hợp lệ
  const rawDate = t.content?.created_at || t.created_at;
  if (rawDate && rawDate !== '2026-09-22T08:00:00.000Z') {
    const d = new Date(rawDate);
    if (!isNaN(d.getTime())) {
      return d.getTime();
    }
  }

  // 4. Nếu có id có số thứ tự
  const numMatch = String(t.id || '').match(/(\d+)/);
  if (numMatch) {
    return parseInt(numMatch[1], 10);
  }

  return 0;
};

const getTestCreatedAt = (t) => {
  if (!t) return null;
  const ts = getTestTimestamp(t);
  if (ts > 1600000000000) {
    return new Date(ts).toISOString();
  }

  const rawDate = t.content?.created_at || t.created_at;
  if (rawDate && rawDate !== '2026-09-22T08:00:00.000Z') {
    const d = new Date(rawDate);
    if (!isNaN(d.getTime())) {
      return d.toISOString();
    }
  }

  if (typeof localStorage !== 'undefined') {
    let initTime = localStorage.getItem('toefl_system_tests_init_time');
    if (!initTime) {
      initTime = new Date().toISOString();
      localStorage.setItem('toefl_system_tests_init_time', initTime);
    }
    return initTime;
  }

  return new Date().toISOString();
};

export default function TestList({ 
  skill, 
  tests, 
  onStartTest, 
  onDeleteTest,
  onOpenHistory,
  testHistories = {},
  onOpenImport
}) {
  const skillNameUpper = skill.toUpperCase();
  const skillCapitalized = skill.charAt(0).toUpperCase() + skill.slice(1).toLowerCase();

  // Bộ lọc cho kỹ năng Writing: 'all' | 'sentence' | 'email' | 'discussion' | 'full'
  const [writingFilter, setWritingFilter] = useState('all');
  const [openSplitMenuTestId, setOpenSplitMenuTestId] = useState(null);

  // Phân loại dạng bài Writing
  const getWritingCategory = (t) => {
    const normStages = t.stages || t.content?.stages || [];
    const firstStageTasks = normStages[0]?.tasks || [];

    if (t.task_type === 'build_sentence' || (firstStageTasks.length === 1 && firstStageTasks[0]?.task_type === 'build_sentence')) {
      return 'sentence';
    }
    if (t.task_type === 'write_email' || (firstStageTasks.length === 1 && firstStageTasks[0]?.task_type === 'write_email')) {
      return 'email';
    }
    if (t.task_type === 'academic_discussion' || (firstStageTasks.length === 1 && firstStageTasks[0]?.task_type === 'academic_discussion')) {
      return 'discussion';
    }
    if (firstStageTasks.length >= 2 || t.duration_seconds >= 1200 || (t.title && t.title.toLowerCase().includes('full'))) {
      return 'full';
    }
    return 'other';
  };

  // Trích xuất 1 phần từ đề Full Writing để làm lẻ
  const handleStartSubTask = (parentTest, targetTaskType, targetDuration, targetTitle) => {
    const normStages = parentTest.stages || parentTest.content?.stages || [];
    const allTasks = normStages.flatMap((s) => s.tasks || []);
    const foundTask = allTasks.find((t) => t.task_type === targetTaskType);

    if (!foundTask) {
      alert(`Không tìm thấy phần thi này trong bộ đề.`);
      return;
    }

    const extractedTest = {
      ...parentTest,
      id: `${parentTest.id}_${targetTaskType}`,
      title: `${parentTest.title}: ${targetTitle || foundTask.title}`,
      skill: 'writing',
      task_type: targetTaskType,
      duration_seconds: targetDuration,
      stages: [
        {
          id: `stage_${targetTaskType}`,
          title: targetTitle || foundTask.title || 'Luyện tập kỹ năng',
          duration_seconds: targetDuration,
          tasks: [foundTask]
        }
      ]
    };

    onStartTest(extractedTest);
  };

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

  // Lọc theo dạng bài (Writing) và theo từ khóa tìm kiếm (Title)
  const filteredTests = useMemo(() => {
    return sortedTests.filter((t) => {
      if (skill === 'writing' && writingFilter !== 'all') {
        if (getWritingCategory(t) !== writingFilter) return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const title = (t.title || '').toLowerCase();
        const desc = (t.description || '').toLowerCase();
        return title.includes(query) || desc.includes(query);
      }

      return true;
    });
  }, [sortedTests, skill, writingFilter, searchQuery]);

  // Reset về trang 1 khi đổi kỹ năng, bộ lọc Writing hoặc nhập từ khóa tìm kiếm
  useEffect(() => {
    setCurrentPage(1);
  }, [skill, writingFilter, searchQuery]);

  // Phân trang
  const totalItems = filteredTests.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const paginatedTests = filteredTests.slice(startIndex, startIndex + PAGE_SIZE);

  // Đếm số lượng cho từng dạng bài Writing
  const writingCounts = {
    all: tests.length,
    sentence: tests.filter((t) => getWritingCategory(t) === 'sentence').length,
    email: tests.filter((t) => getWritingCategory(t) === 'email').length,
    discussion: tests.filter((t) => getWritingCategory(t) === 'discussion').length,
    full: tests.filter((t) => getWritingCategory(t) === 'full').length
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e5dfd5] shadow-sm overflow-hidden my-6">
      
      {/* Header matching original screenshot with search input at red box */}
      <div className="px-6 py-4 border-b border-[#eee8df] bg-[#faf8f4] flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-slate-800 uppercase flex items-center gap-2 shrink-0">
          <span>PRACTICE EXAMS FOR CURRENT SKILL</span>
          <span className="text-teal-700">({skillNameUpper})</span>
        </h2>

        {/* Khung tìm kiếm ở vị trí khung đỏ */}
        <div className="flex-1 max-w-sm w-full relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Tìm kiếm tên bài thi ${skillCapitalized}...`}
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

        {onOpenImport && (
          <button
            onClick={() => onOpenImport(skill)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-all cursor-pointer shadow-2xs self-start md:self-auto shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span>Tạo bài thi thử {skillCapitalized}</span>
          </button>
        )}
      </div>

      {/* Bộ lọc danh mục cho kỹ năng Writing */}
      {skill === 'writing' && (
        <div className="px-6 py-3 bg-[#fdfcfa] border-b border-[#eee8df] flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
            <PenTool className="w-3.5 h-3.5 text-rose-600" />
            Phần luyện:
          </span>

          {[
            { id: 'all', label: `Tất cả (${writingCounts.all})` },
            { id: 'sentence', label: `Ghép câu 7p (${writingCounts.sentence})`, icon: PenTool },
            { id: 'email', label: `Viết Email 7p (${writingCounts.email})`, icon: Mail },
            { id: 'discussion', label: `Discussion 10p (${writingCounts.discussion})`, icon: MessageSquare },
            { id: 'full', label: `Full Test 23p (${writingCounts.full})`, icon: Layers }
          ].map((tab) => {
            const isSelected = writingFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setWritingFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                  isSelected
                    ? 'bg-rose-700 text-white border-rose-800 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Tests Grid */}
      <div className="p-6">
        {totalItems === 0 ? (
          <div className="text-center py-12 text-slate-500">
            {searchQuery.trim() ? (
              <div className="space-y-2">
                <Search className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-base font-semibold text-slate-700">
                  Không tìm thấy bài thi nào phù hợp với từ khóa "{searchQuery}"
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
                <p className="text-base font-medium">Chưa có đề thi nào phù hợp với bộ lọc.</p>
                <p className="text-xs text-slate-400 mt-1">Bấm "Tạo bài thi thử {skillCapitalized}" để biên soạn bộ đề mới ngay.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {paginatedTests.map((test) => {
              const durationMin = Math.round((test.duration_seconds || 600) / 60);
              const testHistoryList = Array.isArray(testHistories[test.id])
                ? testHistories[test.id]
                : testHistories[test.id] ? [testHistories[test.id]] : [];
              const historyCount = testHistoryList.length;
              const latest = testHistoryList[0];

              const writingCat = skill === 'writing' ? getWritingCategory(test) : null;
              const isFullWriting = skill === 'writing' && writingCat === 'full';
              const createdAtFormatted = formatDateTime(getTestCreatedAt(test));

              return (
                <div 
                  key={test.id} 
                  className="flex flex-col justify-between p-4 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50/50 transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors">
                          {test.title}
                        </h3>

                        {/* Badges đặc thù theo dạng bài Writing */}
                        {skill === 'writing' ? (
                          writingCat === 'sentence' ? (
                            <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
                              Ghép câu (10 câu)
                            </span>
                          ) : writingCat === 'email' ? (
                            <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                              Viết Email
                            </span>
                          ) : writingCat === 'discussion' ? (
                            <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-200">
                              Discussion
                            </span>
                          ) : (
                            <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-200">
                              Full Test (3 Bài)
                            </span>
                          )
                        ) : test.stages && test.stages.length > 0 ? (
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

                        {createdAtFormatted && (
                          <span className="flex items-center gap-1 font-medium text-slate-400" title="Thời gian tạo đề thi">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{createdAtFormatted}</span>
                          </span>
                        )}

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
                        <span>{isFullWriting ? 'Làm Full Test' : '[Take Practice Test]'}</span>
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

                  {/* Tùy chọn luyện riêng từng phần đối với đề Full Writing */}
                  {isFullWriting && (
                    <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1 mr-1">
                        <Layers className="w-3 h-3 text-rose-600" />
                        Luyện riêng lẻ:
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartSubTask(test, 'build_sentence', 420, 'Task 1: Ghép câu (7p)');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 text-[11px] font-bold border border-rose-200 transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                        title="Chỉ làm phần Ghép câu (10 câu - 7 phút)"
                      >
                        <PenTool className="w-3 h-3 text-rose-600" />
                        <span>1. Ghép câu (7p)</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartSubTask(test, 'write_email', 420, 'Task 2: Viết Email (7p)');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 text-[11px] font-bold border border-blue-200 transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                        title="Chỉ làm bài Viết Email (7 phút)"
                      >
                        <Mail className="w-3 h-3 text-blue-600" />
                        <span>2. Viết Email (7p)</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartSubTask(test, 'academic_discussion', 600, 'Task 3: Thảo luận (10p)');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-[11px] font-bold border border-indigo-200 transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                        title="Chỉ làm bài Academic Discussion (10 phút)"
                      >
                        <MessageSquare className="w-3 h-3 text-indigo-600" />
                        <span>3. Thảo luận (10p)</span>
                      </button>
                    </div>
                  )}
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
  );
}
