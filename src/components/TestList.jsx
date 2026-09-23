import React, { useState } from 'react';
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
  ChevronDown
} from 'lucide-react';

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

  const filteredTests = skill === 'writing' && writingFilter !== 'all'
    ? tests.filter((t) => getWritingCategory(t) === writingFilter)
    : tests;

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
      
      {/* Header matching original screenshot */}
      <div className="px-6 py-4 border-b border-[#eee8df] bg-[#faf8f4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-slate-800 uppercase flex items-center gap-2">
          <span>PRACTICE EXAMS FOR CURRENT SKILL</span>
          <span className="text-teal-700">({skillNameUpper})</span>
        </h2>

        {onOpenImport && (
          <button
            onClick={onOpenImport}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-all cursor-pointer shadow-2xs self-start sm:self-auto"
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
        {filteredTests.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <p className="text-base font-medium">Chưa có đề thi nào phù hợp với bộ lọc.</p>
            <p className="text-xs text-slate-400 mt-1">Bấm "Tạo bài thi thử {skillCapitalized}" để biên soạn bộ đề mới ngay.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {filteredTests.map((test) => {
              const durationMin = Math.round((test.duration_seconds || 600) / 60);
              const testHistoryList = Array.isArray(testHistories[test.id])
                ? testHistories[test.id]
                : testHistories[test.id] ? [testHistories[test.id]] : [];
              const historyCount = testHistoryList.length;
              const latest = testHistoryList[0];

              const writingCat = skill === 'writing' ? getWritingCategory(test) : null;
              const isFullWriting = skill === 'writing' && writingCat === 'full';

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

    </div>
  );
}
