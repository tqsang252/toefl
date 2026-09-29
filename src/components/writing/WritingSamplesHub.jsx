import React, { useState, useEffect, useMemo } from 'react';
import {
  Mail,
  MessageSquare,
  Sparkles,
  Search,
  Plus,
  Filter,
  Play,
  Copy,
  Check,
  Volume2,
  VolumeX,
  BookmarkCheck,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Award,
  Layers,
  Trash2,
  Calendar,
  X,
  AlertTriangle
} from 'lucide-react';
import {
  getStoredSamples,
  saveWritingSample,
  deleteWritingSample,
  resetWritingSamples,
  clearAllWritingSamples,
  syncWritingSamplesFromSupabase,
  loadSamplesFromIndexedDB
} from '../../lib/writingSamplesStorage';
import WritingSampleDetailModal from './WritingSampleDetailModal';
import AddWritingSampleModal from './AddWritingSampleModal';
import ImportWritingSamplesModal from './ImportWritingSamplesModal';

export default function WritingSamplesHub({
  initialType = 'email',
  onStartPractice,
  onNavigateToPracticeList
}) {
  const [activeType, setActiveType] = useState(initialType); // 'email' | 'discussion'
  const [samples, setSamples] = useState(() => getStoredSamples(initialType));
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState('all'); // 'all' | 'user_exam' | 'ets_curated' | 'external_upload'
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modals
  const [selectedSample, setSelectedSample] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // Sync state when activeType or initialType changes (Local + IndexedDB + Supabase Cloud)
  useEffect(() => {
    const local = getStoredSamples(activeType);
    setSamples(local);
    setSelectedCategory('All');
    setSearchQuery('');

    // Kiểm tra IndexedDB nếu có nhiều dữ liệu hơn localStorage
    loadSamplesFromIndexedDB(activeType).then(idbItems => {
      if (Array.isArray(idbItems) && idbItems.length > local.length) {
        setSamples(idbItems);
      }
    });

    // Đồng bộ hai chiều từ Supabase Cloud nếu có cấu hình
    syncWritingSamplesFromSupabase(activeType).then(synced => {
      if (Array.isArray(synced)) {
        setSamples(synced);
      }
    });
  }, [activeType]);

  const isEmail = activeType === 'email';

  // Categories extraction
  const categoriesList = useMemo(() => {
    const set = new Set();
    samples.forEach(s => {
      if (s.topicCategory) set.add(s.topicCategory);
    });
    return ['All', ...Array.from(set)];
  }, [samples]);

  // Statistics
  const stats = useMemo(() => {
    const total = samples.length;
    const band5Count = samples.filter(s => s.targetBand?.includes('5.0')).length;
    const fromMyTests = samples.filter(s => s.sourceType === 'user_exam').length;
    return { total, band5Count, fromMyTests };
  }, [samples]);

  // Filtered samples
  const filteredSamples = useMemo(() => {
    return samples.filter(s => {
      // Source filter
      if (selectedSource !== 'all' && s.sourceType !== selectedSource) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && s.topicCategory !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = s.title?.toLowerCase().includes(q);
        const matchEssay = s.modelEssay?.toLowerCase().includes(q);
        const matchPrompt = (s.prompt?.scenario || s.prompt?.professorQuestion || '').toLowerCase().includes(q);
        const matchVocab = Array.isArray(s.vocabularyHighlights) && s.vocabularyHighlights.some(v => 
          v.term?.toLowerCase().includes(q) || v.meaning?.toLowerCase().includes(q)
        );
        return matchTitle || matchEssay || matchPrompt || matchVocab;
      }

      return true;
    });
  }, [samples, selectedSource, selectedCategory, searchQuery]);

  // Quick Copy
  const handleQuickCopy = (e, sample) => {
    e.stopPropagation();
    navigator.clipboard.writeText(sample.modelEssay);
    setCopiedId(sample.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // Launch Practice
  const handlePracticeFromCard = (e, sample) => {
    e.stopPropagation();
    if (isEmail) {
      const practiceTest = {
        id: `practice_from_sample_${sample.id}_${Date.now()}`,
        title: sample.title || 'Luyện tập theo bài mẫu Email',
        skill: 'writing_email',
        task_type: 'write_email',
        duration_seconds: 420,
        content: {
          scenario: sample.prompt?.scenario || sample.title,
          requirements: Array.isArray(sample.prompt?.requirements) && sample.prompt.requirements.length > 0
            ? sample.prompt.requirements
            : [
                'State your primary reason for writing clearly in the opening',
                'Elaborate on specific circumstances with supporting reasons',
                'Propose a polite and actionable next step or solution'
              ],
          recommended_words: '100 - 130 từ',
          min_words: 80
        }
      };
      if (onStartPractice) onStartPractice(practiceTest);
    } else {
      const practiceTest = {
        id: `practice_from_sample_${sample.id}_${Date.now()}`,
        title: sample.title || 'Luyện tập theo bài mẫu Academic Discussion',
        skill: 'writing_discussion',
        task_type: 'academic_discussion',
        duration_seconds: 600,
        content: {
          professor: {
            name: sample.prompt?.professorName || 'Dr. Katherine Miller',
            title: sample.prompt?.professorTitle || 'Professor of Academic Studies',
            question: sample.prompt?.professorQuestion || sample.prompt?.scenario || sample.title
          },
          peer_posts: Array.isArray(sample.prompt?.studentOpinions) && sample.prompt.studentOpinions.length > 0
            ? sample.prompt.studentOpinions.map((p, idx) => ({
                student: p.student || `Student ${idx + 1}`,
                avatar_bg: p.avatar_bg || (idx === 0 ? 'bg-blue-600' : 'bg-emerald-600'),
                stance: p.opinion || p.stance
              }))
            : [
                {
                  student: 'Michael',
                  avatar_bg: 'bg-blue-600',
                  stance: 'Individual responsibility and foundational core discipline are the most critical factors.'
                },
                {
                  student: 'Sarah',
                  avatar_bg: 'bg-emerald-600',
                  stance: 'Institutional support and technological adaptation must be embraced for systemic equity.'
                }
              ],
          min_words: 100
        }
      };
      if (onStartPractice) onStartPractice(practiceTest);
    }
  };

  // Delete sample
  const handleDeleteSample = (sampleId, type) => {
    const updated = deleteWritingSample(sampleId, type);
    setSamples(updated);
  };

  // Add sample success
  const handleSampleCreated = (newSample) => {
    const updated = saveWritingSample(newSample);
    if (newSample.type === activeType) {
      setSamples(updated);
    } else {
      setActiveType(newSample.type);
    }
    setSelectedSample(newSample);
  };

  // Batch imported success
  const handleBatchImported = (importedList, targetType) => {
    const typeToLoad = targetType || activeType;
    const updated = getStoredSamples(typeToLoad);
    if (targetType && targetType !== activeType) {
      setActiveType(targetType);
    }
    setSamples(updated);
  };

  // Clear all samples handler
  const handleConfirmClear = async (keepDefaultsOnly = true) => {
    setIsClearing(true);
    try {
      const updated = await clearAllWritingSamples(activeType, keepDefaultsOnly);
      setSamples(updated);
      setIsClearModalOpen(false);
    } catch (err) {
      console.error('Clear writing samples error:', err);
    } finally {
      setIsClearing(false);
    }
  };

  // Reset to default
  const handleReset = () => {
    setIsClearModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. HERO BANNER */}
      <div className={`rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden transition-all duration-300 ${
        isEmail 
          ? 'bg-gradient-to-br from-amber-900 via-orange-900 to-rose-950' 
          : 'bg-gradient-to-br from-sky-950 via-indigo-900 to-slate-900'
      }`}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            {/* Type badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-xs">
                TOEFL iBT 2026 Model Essays
              </span>
              <span className="text-[10px] font-bold text-amber-200">
                {isEmail ? 'Task 2: Academic Email' : 'Task 3: Academic Discussion'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {isEmail 
                ? 'Kho Bài Mẫu Academic Email (Band 5.0+)' 
                : 'Kho Bài Mẫu Academic Discussion (Band 5.0+)'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
              {isEmail
                ? 'Tổng hợp các bài mẫu viết email học thuật chuẩn cấu trúc, ngôn phong lịch thiệp và collocations nâng cao. Bấm "Thực hành ngay" để tự viết lại đề bài vừa học.'
                : 'Thư viện bài thảo luận học thuật phản biện sắc sảo, cấu trúc đối chiếu quan điểm và phát triển luận điểm độc lập đạt điểm tuyệt đối Band 5.0.'}
            </p>

            {/* Stats Summary */}
            <div className="flex items-center gap-3 pt-2 text-xs font-semibold text-slate-200 flex-wrap">
              <div className="bg-white/10 px-3 py-1 rounded-xl border border-white/15">
                📚 <b>{stats.total}</b> bài mẫu
              </div>
              <div className="bg-white/10 px-3 py-1 rounded-xl border border-white/15 text-amber-300">
                ⭐ <b>{stats.band5Count}</b> bài Band 5.0
              </div>
              <div className="bg-white/10 px-3 py-1 rounded-xl border border-white/15 text-emerald-300">
                🔗 <b>{stats.fromMyTests}</b> bài từ bài thi của bạn
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:items-end gap-2.5 shrink-0">
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsImportModalOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg transition-all cursor-pointer active:scale-95 flex-1 sm:flex-initial"
                title="Nhập danh sách bài mẫu từ JSON hoặc lấy Prompt cho AI sinh đề"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>📥 Upload JSON / AI Prompt</span>
              </button>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 active:scale-95 text-xs font-black shadow-lg transition-all cursor-pointer flex-1 sm:flex-initial"
              >
                <Plus className="w-4 h-4 text-indigo-600" />
                <span>+ Thêm Thủ Công / OCR</span>
              </button>
            </div>

            {onNavigateToPracticeList && (
              <button
                onClick={() => onNavigateToPracticeList(isEmail ? 'writing_email' : 'writing_discussion')}
                className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold border border-white/20 transition-all cursor-pointer w-full sm:w-auto"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Xem danh sách đề thi luyện tập →</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. SUBTAB SWITCHER: EMAIL SAMPLES VS DISCUSSION SAMPLES */}
      <div className="bg-white rounded-2xl p-2 border border-[#dfd8cc] shadow-xs flex items-center gap-2">
        <button
          onClick={() => setActiveType('email')}
          className={`flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
            isEmail
              ? 'bg-orange-600 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Kho Bài Mẫu Academic Email (Task 2)</span>
        </button>

        <button
          onClick={() => setActiveType('discussion')}
          className={`flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
            !isEmail
              ? 'bg-sky-700 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Kho Bài Mẫu Academic Discussion (Task 3)</span>
        </button>
      </div>

      {/* 3. FILTER BAR & SEARCH */}
      <div className="bg-white rounded-2xl p-4 border border-[#dfd8cc] shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Source Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs font-bold scrollbar-none">
            <span className="text-slate-400 flex items-center gap-1 mr-1 shrink-0">
              <Filter className="w-3.5 h-3.5" /> Nguồn:
            </span>

            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'user_exam', label: '🔗 Từ bài thi của tôi' },
              { id: 'ets_curated', label: '⭐ Mẫu chuẩn ETS' },
              { id: 'external_upload', label: '📁 Upload bên ngoài' }
            ].map((src) => (
              <button
                key={src.id}
                onClick={() => setSelectedSource(src.id)}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  selectedSource === src.id
                    ? isEmail ? 'bg-orange-600 text-white shadow-xs' : 'bg-sky-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                {src.label}
              </button>
            ))}
          </div>

          {/* Search Input & Quick Clear */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm bài mẫu, từ khóa..."
                className="w-full pl-9 pr-4 py-2 text-xs font-medium rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
              />
            </div>
            <button
              type="button"
              onClick={() => setIsClearModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 hover:text-rose-700 border border-rose-200 rounded-xl cursor-pointer transition-all shrink-0 active:scale-95 shadow-2xs"
              title="Dọn sạch bài mẫu đã nạp sai hoặc khôi phục về ban đầu"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Dọn sạch bài nạp</span>
              <span className="sm:hidden">Dọn sạch</span>
            </button>
          </div>

        </div>

        {/* Category Filter Pills (if any) */}
        {categoriesList.length > 2 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 scrollbar-none text-[11px] font-semibold text-slate-600">
            <span className="text-slate-400 shrink-0">Chủ đề:</span>
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-slate-800 text-white font-bold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 4. GRID DANH SÁCH BÀI MẪU */}
      {filteredSamples.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-xs space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="text-base font-bold text-slate-700">
            Không tìm thấy bài mẫu nào phù hợp
          </h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Hãy thử tìm với từ khóa khác hoặc bấm nút bên dưới để thêm bài mẫu mới vào kho lưu trữ!
          </p>
          <div className="flex items-center justify-center gap-2.5 pt-2 flex-wrap">
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>📥 Upload JSON / AI Prompt</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>+ Thêm Thủ Công / OCR</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSamples.map((sample) => {
            const isUserOrigin = sample.sourceType === 'user_exam';
            const wordCount = sample.wordCount || sample.modelEssay?.trim().split(/\s+/).length || 0;
            const promptSnippet = sample.prompt?.scenario || sample.prompt?.professorQuestion || '';
            const essaySnippet = sample.modelEssay?.replace(/\n+/g, ' ') || '';

            return (
              <div
                key={sample.id}
                onClick={() => setSelectedSample(sample)}
                className="bg-white rounded-2xl border border-slate-200 hover:border-slate-400 hover:shadow-lg transition-all duration-200 p-5 flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-3">
                  
                  {/* Card Header Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 truncate">
                      {sample.topicCategory || 'General'}
                    </span>

                    {isUserOrigin && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 shrink-0" title="Được liên kết từ bài làm thực tế của bạn">
                        🔗 Bài làm
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {sample.title}
                  </h3>

                  {/* Prompt Preview */}
                  <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/80 text-[11px] text-amber-950 font-serif leading-relaxed line-clamp-2">
                    <span className="font-bold">Đề bài: </span>
                    {promptSnippet}
                  </div>

                  {/* Model Essay Snippet */}
                  <p className="text-xs font-serif text-slate-600 italic leading-relaxed line-clamp-3 pl-1 border-l-2 border-slate-200">
                    "{essaySnippet}"
                  </p>

                  {/* Collocations badges */}
                  {Array.isArray(sample.vocabularyHighlights) && sample.vocabularyHighlights.length > 0 && (
                    <div className="flex items-center gap-1 flex-wrap pt-1">
                      {sample.vocabularyHighlights.slice(0, 2).map((v, i) => (
                        <span key={i} className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md border border-indigo-100 truncate max-w-[160px]">
                          ✨ {v.term}
                        </span>
                      ))}
                      {sample.vocabularyHighlights.length > 2 && (
                        <span className="text-[10px] text-slate-400 font-medium">
                          +{sample.vocabularyHighlights.length - 2}
                        </span>
                      )}
                    </div>
                  )}

                </div>

                {/* Card Footer: Actions */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {wordCount} từ
                  </span>

                  <div className="flex items-center gap-1.5">
                    {/* Quick Copy */}
                    <button
                      onClick={(e) => handleQuickCopy(e, sample)}
                      className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                      title="Sao chép bài mẫu"
                    >
                      {copiedId === sample.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    {/* NÚT THỰC HÀNH ĐỀ NÀY (1-CLICK INSTANT PRACTICE) */}
                    <button
                      onClick={(e) => handlePracticeFromCard(e, sample)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-black shadow-2xs transition-all cursor-pointer"
                      title={`Vào phòng thi thực hành ngay đề này (${isEmail ? '7 phút' : '10 phút'})`}
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Thực hành ngay</span>
                    </button>

                    {/* View Detail */}
                    <button
                      onClick={() => setSelectedSample(sample)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition-colors cursor-pointer"
                    >
                      Xem chi tiết →
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* 5. FOOTER HELPER */}
      <div className="text-center pt-4">
        <button
          onClick={handleReset}
          className="text-xs text-slate-400 hover:text-slate-600 underline cursor-pointer flex items-center justify-center gap-1 mx-auto"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Khôi phục lại các bài mẫu mặc định của {isEmail ? 'Academic Email' : 'Academic Discussion'}</span>
        </button>
      </div>

      {/* DETAIL MODAL */}
      <WritingSampleDetailModal
        sample={selectedSample}
        isOpen={!!selectedSample}
        onClose={() => setSelectedSample(null)}
        onStartPractice={onStartPractice}
        onDelete={handleDeleteSample}
      />

      {/* ADD SAMPLE MODAL */}
      <AddWritingSampleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        defaultType={activeType}
        onSampleCreated={handleSampleCreated}
      />

      {/* IMPORT JSON / AI PROMPT MODAL */}
      <ImportWritingSamplesModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        defaultType={activeType}
        onImportSuccess={handleBatchImported}
      />

      {/* CLEAR CONFIRMATION MODAL */}
      {isClearModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-800">
                    Dọn dẹp bài mẫu {isEmail ? 'Academic Email' : 'Academic Discussion'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Xóa nhanh các bài mẫu bạn đã upload nhầm hoặc muốn dọn sạch kho bài
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsClearModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 pt-1">
              {/* Option 1: Keep ETS defaults, remove all uploads (Recommended) */}
              <button
                type="button"
                disabled={isClearing}
                onClick={() => handleConfirmClear(true)}
                className="w-full text-left p-4 rounded-2xl border-2 border-orange-200 bg-orange-50/60 hover:bg-orange-100/70 hover:border-orange-400 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-orange-950 flex items-center gap-1.5">
                    <span>✨</span> Khôi phục 3 bài mẫu gốc ETS (Khuyên dùng)
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-orange-200 text-orange-800">
                    Khuyên dùng
                  </span>
                </div>
                <p className="text-[11px] text-orange-800/90 mt-1 font-medium leading-relaxed">
                  Xóa sạch toàn bộ các bài bạn đã upload nhầm hoặc nhập từ file JSON lỗi (đồng bộ xóa cả trên Cloud nếu có). Giữ lại nguyên vẹn 3 bài mẫu chuẩn ETS ban đầu.
                </p>
              </button>

              {/* Option 2: Wipe all 100% */}
              <button
                type="button"
                disabled={isClearing}
                onClick={() => handleConfirmClear(false)}
                className="w-full text-left p-4 rounded-2xl border border-rose-200 bg-rose-50/40 hover:bg-rose-100/60 hover:border-rose-300 transition-all cursor-pointer group"
              >
                <div className="text-xs font-black text-rose-900 flex items-center gap-1.5">
                  <Trash2 className="w-3.5 h-3.5 text-rose-600" /> Xóa sạch toàn bộ (Về 0 bài)
                </div>
                <p className="text-[11px] text-rose-700/80 mt-1 font-medium leading-relaxed">
                  Xóa tất cả các bài mẫu hiện có trong tab này.
                </p>
              </button>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                disabled={isClearing}
                onClick={() => setIsClearModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer transition-all"
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
