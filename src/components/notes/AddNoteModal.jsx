import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Upload, 
  Sparkles, 
  Image as ImageIcon, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  Clipboard,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { analyzeDocumentWithAi } from '../../lib/documentOcr';

const CATEGORIES = [
  'Grammar & Prepositions',
  'Vocabulary & Collocations',
  'Writing Templates',
  'Speaking Idioms',
  'Reading & Listening Tips'
];

export default function AddNoteModal({ isOpen, onClose, onNoteCreated }) {
  const [selectedCategory, setSelectedCategory] = useState('Grammar & Prepositions');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [rawText, setRawText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState('file'); // 'file' | 'text'
  const fileInputRef = useRef(null);

  // Lắng nghe sự kiện paste từ clipboard (Ctrl + V)
  useEffect(() => {
    if (!isOpen) return;

    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf('image') !== -1) {
          const blob = item.getAsFile();
          if (blob) {
            handleFileSelect(blob);
            setActiveTab('file');
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileSelect = (file) => {
    if (!file) return;

    // Kiểm tra dung lượng tối đa
    if (file.type === 'application/pdf' && file.size > 4 * 1024 * 1024) {
      setErrorMessage(`File PDF "${file.name}" (${(file.size / (1024 * 1024)).toFixed(1)}MB) vượt quá dung lượng tối đa cho phép (4MB). Vui lòng chọn file < 4MB hoặc chụp ảnh màn hình.`);
      return;
    }

    if (file.type.startsWith('image/') && file.size > 10 * 1024 * 1024) {
      setErrorMessage(`Ảnh "${file.name}" (${(file.size / (1024 * 1024)).toFixed(1)}MB) vượt quá dung lượng tối đa cho phép (10MB). Vui lòng chọn ảnh < 10MB.`);
      return;
    }

    setSelectedFile(file);
    setErrorMessage('');

    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile && !rawText.trim()) {
      setErrorMessage('Vui lòng tải lên file ảnh/PDF hoặc nhập nội dung văn bản!');
      return;
    }

    try {
      setIsAnalyzing(true);
      setErrorMessage('');
      setStatusMessage('Đang kết nối AI Vision để bóc tách tài liệu...');

      const result = await analyzeDocumentWithAi({
        file: selectedFile,
        textInput: rawText,
        categoryHint: selectedCategory,
        onProgress: (msg) => setStatusMessage(msg)
      });

      onNoteCreated(result);
      onClose();
    } catch (err) {
      console.error('Lỗi phân tích tài liệu:', err);
      setErrorMessage(err.message || 'Đã xảy ra lỗi khi phân tích tài liệu bằng AI.');
    } finally {
      setIsAnalyzing(false);
      setStatusMessage('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Modal */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-sky-50/80 via-white to-sky-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <span>Số Hóa Tài Liệu Học Bằng AI Vision</span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-300">
                  Multimodal OCR
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Tải ảnh chụp, PDF hoặc ấn <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px] font-mono text-slate-700">Ctrl + V</kbd> dán trực tiếp từ màn hình
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isAnalyzing}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">

          {/* Chọn Chuyên Mục */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
              1. Chọn danh mục sổ tay:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  disabled={isAnalyzing}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all text-left cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-sky-500 text-white border-sky-600 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tab chọn hình thức nhập */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
                2. Nguồn tài liệu:
              </span>
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveTab('file')}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    activeTab === 'file' ? 'bg-white text-slate-900 shadow-2xs font-black' : 'text-slate-500'
                  }`}
                >
                  Tải Ảnh / File PDF
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('text')}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    activeTab === 'text' ? 'bg-white text-slate-900 shadow-2xs font-black' : 'text-slate-500'
                  }`}
                >
                  Dán Đoạn Văn Bản / Text
                </button>
              </div>
            </div>

            {activeTab === 'file' ? (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  selectedFile
                    ? 'border-sky-400 bg-sky-50/50'
                    : 'border-slate-300 hover:border-sky-400 hover:bg-slate-50/80 bg-slate-50/40'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/webp, application/pdf"
                  onChange={(e) => handleFileSelect(e.target.files?.[0])}
                  className="hidden"
                />

                {selectedFile ? (
                  <div className="flex flex-col items-center gap-2">
                    {previewUrl ? (
                      <div className="relative max-h-48 overflow-hidden rounded-xl border border-sky-200 shadow-xs mb-2">
                        <img 
                          src={previewUrl} 
                          alt="Tài liệu tải lên" 
                          className="max-h-44 object-contain mx-auto"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-1">
                        <FileText className="w-6 h-6" />
                      </div>
                    )}
                    <div className="text-xs font-bold text-slate-800">
                      Đã chọn: <span className="text-sky-700">{selectedFile.name}</span>{' '}
                      <span className="text-slate-400 font-semibold text-[11px]">
                        ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Bấm để đổi file khác hoặc ấn nút phân tích bên dưới
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 py-4">
                    <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shadow-xs">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-bold text-slate-800">
                      Kéo thả ảnh hoặc tài liệu PDF vào đây
                    </div>
                    <p className="text-xs text-slate-500 max-w-sm">
                      Hỗ trợ ảnh <span className="font-semibold text-slate-700">PNG, JPG, WebP</span> (&lt; 10MB) hoặc <span className="font-semibold text-slate-700">PDF</span> (&lt; 4MB). Bạn có thể chụp màn hình rồi bấm <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-mono text-slate-800 shadow-2xs">Ctrl + V</kbd> dán trực tiếp!
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <textarea
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="Dán danh sách từ vựng, mẹo làm bài, quy tắc ngữ pháp hoặc ghi chú vào đây..."
                  rows={6}
                  className="w-full p-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-xs font-mono leading-relaxed"
                />
              </div>
            )}
          </div>

          {/* Lỗi nếu có */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}

          {/* Trạng thái AI đang chạy */}
          {isAnalyzing && (
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-center gap-3 animate-in fade-in">
              <Loader2 className="w-5 h-5 text-sky-600 animate-spin shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-bold text-sky-900">{statusMessage || 'Đang xử lý...'}</p>
                <p className="text-[11px] text-sky-600 mt-0.5">
                  Gemini Vision đang quét toàn bộ văn bản và tự động tạo ví dụ học thuật...
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer Modal */}
        <div className="p-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/70">
          <button
            type="button"
            onClick={onClose}
            disabled={isAnalyzing}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 cursor-pointer disabled:opacity-50"
          >
            Hủy bỏ
          </button>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={isAnalyzing || (!selectedFile && !rawText.trim())}
            className="flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-black rounded-xl shadow-md transition-all cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang Số Hóa Bằng AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Bắt Đầu Số Hóa & Lưu Vào Sổ Tay</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
