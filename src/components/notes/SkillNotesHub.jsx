import React, { useState, useEffect } from 'react';
import { 
  BookMarked, 
  Sparkles, 
  Search, 
  Plus, 
  Layers, 
  BookOpen, 
  PenLine, 
  Trash2, 
  Calendar, 
  Tag, 
  CheckCircle2, 
  FileText, 
  Image as ImageIcon,
  RotateCcw,
  Volume2
} from 'lucide-react';
import { 
  getStoredNotes, 
  saveStudyNote, 
  deleteStudyNote, 
  resetStudyNotes,
  syncNotesFromSupabase
} from '../../lib/notesStorage';
import AddNoteModal from './AddNoteModal';
import NoteStudyModal from './NoteStudyModal';

const CATEGORIES = [
  'Tất cả',
  'Grammar & Prepositions',
  'Vocabulary & Collocations',
  'Writing Templates',
  'Speaking Idioms',
  'Reading & Listening Tips'
];

export default function SkillNotesHub() {
  const [notes, setNotes] = useState(() => getStoredNotes());
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [studyingNote, setStudyingNote] = useState(null);
  const [activeStudyTab, setActiveStudyTab] = useState('cheatsheet');

  const handleOpenStudy = (note, tab = 'cheatsheet') => {
    setActiveStudyTab(tab);
    setStudyingNote(note);
  };

  // Tải lại ghi chú khi mở và đồng bộ nền từ Supabase nếu có
  useEffect(() => {
    setNotes(getStoredNotes());
    syncNotesFromSupabase().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setNotes(data);
      }
    });
  }, []);

  const handleNoteCreated = (newNote) => {
    const updated = saveStudyNote(newNote);
    setNotes(updated);
    handleOpenStudy(newNote, 'cheatsheet');
  };

  const handleDelete = (noteId, title) => {
    if (confirm(`Bạn có chắc muốn xóa sổ tay "${title}"?`)) {
      const updated = deleteStudyNote(noteId);
      setNotes(updated);
      if (studyingNote?.id === noteId) {
        setStudyingNote(null);
      }
    }
  };

  const handleReset = () => {
    if (confirm('Khôi phục lại sổ tay mẫu mặc định (62 Cụm từ đi với giới từ)?')) {
      const updated = resetStudyNotes();
      setNotes(updated);
    }
  };

  // Lọc ghi chú theo chuyên mục và tìm kiếm
  const filteredNotes = notes.filter((n) => {
    const matchCategory = selectedCategory === 'Tất cả' || n.category === selectedCategory;
    if (!matchCategory) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchTitle = n.title?.toLowerCase().includes(q);
    const matchSummary = n.summary?.toLowerCase().includes(q);
    const matchTags = Array.isArray(n.tags) && n.tags.some(t => t.toLowerCase().includes(q));
    const matchItems = Array.isArray(n.items) && n.items.some(it => 
      it.term?.toLowerCase().includes(q) || it.meaning?.toLowerCase().includes(q)
    );
    return matchTitle || matchSummary || matchTags || matchItems;
  });

  const totalItemsCount = notes.reduce((acc, curr) => acc + (curr.items?.length || 0), 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-sky-900 via-sky-800 to-indigo-900 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Nền hiệu ứng mờ */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-sky-400/20 text-sky-200 border border-sky-400/30">
                Knowledge & Cheat Sheets Hub
              </span>
              <span className="text-[10px] font-bold text-sky-300">
                Số hóa tài liệu AI Vision
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-serif">
              SKILL NOTES & CHEAT SHEETS
            </h1>
            <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed font-normal">
              Lưu trữ mọi bí kíp học tập, mẹo thi TOEFL và tài liệu ảnh/PDF sưu tầm trên mạng. Hệ thống AI Vision tự động nhận diện chữ, tạo bảng tra cứu, bộ flashcards và câu hỏi thực hành tương tác.
            </p>

            <div className="flex items-center gap-4 pt-1 text-xs text-sky-200/80 font-medium">
              <div>📚 <b>{notes.length}</b> bộ sổ tay</div>
              <div>•</div>
              <div>✨ <b>{totalItemsCount}</b> mục kiến thức đã số hóa</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col items-center sm:items-end gap-1.5 shrink-0">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-sky-900 hover:bg-sky-50 active:scale-95 text-xs font-black shadow-lg transition-all cursor-pointer w-full sm:w-auto"
            >
              <Sparkles className="w-4 h-4 text-sky-600 animate-pulse" />
              <span>+ Số Hóa Tài Liệu (Ảnh / PDF / Ctrl+V)</span>
            </button>
            <p className="text-[11px] text-sky-100/90 font-medium text-center sm:text-right">
              Hỗ trợ: <span className="font-bold text-white">Ảnh &lt; 10MB</span> • <span className="font-bold text-white">PDF &lt; 4MB</span>
            </p>
          </div>
        </div>
      </div>

      {/* 2. Thanh lọc chuyên mục & Tìm kiếm */}
      <div className="bg-white rounded-2xl p-4 border border-[#e2ddd3] shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-bold scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-sky-600 text-white shadow-2xs font-black'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm trong toàn bộ sổ tay..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* 3. Lưới danh sách Note Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((note) => {
          const itemCount = note.items?.length || 0;
          return (
            <div
              key={note.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Header card */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200 truncate">
                    {note.category || 'General'}
                  </span>

                  <div className="flex items-center gap-1">
                    {note.original_image_url && (
                      <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded flex items-center gap-1" title="Có ảnh gốc đính kèm">
                        <ImageIcon className="w-3 h-3" />
                      </span>
                    )}
                    <button
                      onClick={() => handleDelete(note.id, note.title)}
                      className="text-slate-300 hover:text-rose-500 p-1 rounded transition-colors text-xs cursor-pointer opacity-0 group-hover:opacity-100"
                      title="Xóa sổ tay này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Tiêu đề & Tóm tắt */}
                <div>
                  <h3 
                    onClick={() => handleOpenStudy(note, 'cheatsheet')}
                    className="font-extrabold text-slate-900 text-base group-hover:text-sky-700 transition-colors cursor-pointer line-clamp-2"
                  >
                    {note.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {note.summary || 'Tài liệu học thuật hữu ích cho quá trình luyện thi TOEFL.'}
                  </p>
                </div>

                {/* Thống kê mục con */}
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <BookOpen className="w-4 h-4 text-sky-600" />
                  <span>{itemCount} mục từ vựng / cụm từ</span>
                </div>
              </div>

              {/* 3 Nút chọn chế độ học */}
              <div className="grid grid-cols-3 gap-1.5 mt-4 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleOpenStudy(note, 'cheatsheet')}
                  className="px-2 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 text-[11px] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-1 text-center"
                >
                  <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                  <span>Tra Cứu</span>
                </button>

                <button
                  onClick={() => handleOpenStudy(note, 'flashcards')}
                  className="px-2 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 text-[11px] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-1 text-center"
                >
                  <Layers className="w-3.5 h-3.5 text-sky-600" />
                  <span>Flashcards</span>
                </button>

                <button
                  onClick={() => handleOpenStudy(note, 'quiz')}
                  className="px-2 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-[11px] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-1 text-center shadow-xs"
                >
                  <PenLine className="w-3.5 h-3.5" />
                  <span>Luyện Tập</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {filteredNotes.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <BookMarked className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-700 text-base">Không tìm thấy tài liệu phù hợp</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Không có sổ tay nào khớp với từ khóa tìm kiếm hoặc chuyên mục này. Hãy bấm nút bên dưới để tạo hoặc số hóa tài liệu mới!
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 bg-sky-600 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer hover:bg-sky-700"
          >
            + Số Hóa Tài Liệu Bằng AI
          </button>
        </div>
      )}

      {/* Footer Helper: Reset to sample */}
      <div className="text-center pt-4">
        <button
          onClick={handleReset}
          className="text-xs text-slate-400 hover:text-slate-600 underline cursor-pointer flex items-center justify-center gap-1 mx-auto"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Khôi phục lại sổ tay mẫu "62 Cụm từ đi với giới từ xịn"</span>
        </button>
      </div>

      {/* Modal Thêm Note Mới */}
      <AddNoteModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onNoteCreated={handleNoteCreated}
      />

      {/* Modal Học Tập Chi Tiết */}
      {studyingNote && (
        <NoteStudyModal
          note={studyingNote}
          isOpen={!!studyingNote}
          initialTab={activeStudyTab}
          onClose={() => setStudyingNote(null)}
          onUpdateNote={(updated) => {
            saveStudyNote(updated);
            setStudyingNote(updated);
            setNotes(getStoredNotes());
          }}
        />
      )}

    </div>
  );
}
