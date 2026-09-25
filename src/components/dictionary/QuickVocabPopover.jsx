import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Volume2, 
  Star, 
  Bookmark, 
  BookmarkCheck, 
  X, 
  Copy, 
  Check, 
  Sparkles, 
  BookOpen, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { lookupWordInDatabase, importVocabularyBatch } from '../../lib/supabase';
import { lookupWordWithAi, translateTextWithAi, isAiConfigured } from '../../lib/gemini';

/**
 * Hook bắt sự kiện bôi đen (selection) trên đoạn văn bản
 */
export function useTextSelectionLookup() {
  const [selectionData, setSelectionData] = useState(null);

  const handleTextMouseUp = (e) => {
    // Không kích hoạt nếu bấm vào input, textarea, button hoặc các thành phần tương tác
    if (e?.target && ['INPUT', 'TEXTAREA', 'BUTTON', 'SELECT'].includes(e.target.tagName)) {
      return;
    }

    setTimeout(() => {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
        return;
      }

      const raw = sel.toString().trim();
      if (!raw || raw.length < 2 || raw.length > 180) {
        return;
      }

      const words = raw.split(/\s+/).filter(Boolean);
      if (words.length > 16) {
        return;
      }

      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (!rect || (rect.width === 0 && rect.height === 0)) return;

      // Trích xuất câu văn ngữ cảnh bao quanh từ được chọn
      let contextSentence = '';
      try {
        const fullNodeText = range.startContainer?.textContent || '';
        if (fullNodeText) {
          const offset = range.startOffset;
          const prevStop = Math.max(
            0,
            fullNodeText.lastIndexOf('.', offset),
            fullNodeText.lastIndexOf('?', offset),
            fullNodeText.lastIndexOf('!', offset)
          );
          let nextStop = fullNodeText.indexOf('.', offset + raw.length);
          if (nextStop === -1) nextStop = fullNodeText.indexOf('?', offset + raw.length);
          if (nextStop === -1) nextStop = fullNodeText.indexOf('!', offset + raw.length);
          if (nextStop === -1) nextStop = fullNodeText.length;
          contextSentence = fullNodeText.substring(prevStop === 0 ? 0 : prevStop + 1, nextStop + 1).trim();
        }
      } catch (err) {
        // fallback
      }

      const cleanWord = raw.replace(/^['"“‘.,;:!?()\[\]{}]+|['"”’.,;:!?()\[\]{}]+$/g, '').trim();
      if (!cleanWord) return;

      setSelectionData({
        rawText: raw,
        cleanText: cleanWord,
        contextSentence: contextSentence || raw,
        rect
      });
    }, 20);
  };

  const clearSelection = () => {
    setSelectionData(null);
  };

  return {
    selectionData,
    clearSelection,
    handleTextMouseUp
  };
}

/**
 * Component Popover hiển thị định nghĩa, phiên âm và 1-click lưu từ vựng
 */
export function QuickVocabPopover({ selection, onClose, onSaveSuccess }) {
  const popoverRef = useRef(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const cleanText = selection?.cleanText || '';
  const contextSentence = selection?.contextSentence || '';
  const rect = selection?.rect;

  // Kiểm tra từ đã từng được lưu vào Sổ từ / Starred Words chưa
  useEffect(() => {
    if (!cleanText) return;
    try {
      const key = cleanText.toLowerCase();
      const starred = JSON.parse(localStorage.getItem('toefl_starred_words') || '[]');
      if (starred.includes(key)) {
        setIsSaved(true);
        return;
      }
      const customVocab = JSON.parse(localStorage.getItem('toefl_custom_vocabulary') || '[]');
      if (customVocab.some(w => (w.word || '').toLowerCase() === key)) {
        setIsSaved(true);
      }
    } catch (e) {
      // ignore
    }
  }, [cleanText]);

  // Thực hiện tra cứu từ hoặc dịch cụm từ
  useEffect(() => {
    let isCancelled = false;

    async function executeLookup() {
      if (!cleanText) return;
      setIsLoading(true);
      setError(null);

      const words = cleanText.split(/\s+/).filter(Boolean);
      const isSingleWord = words.length === 1 && cleanText.length <= 45;

      try {
        if (isSingleWord) {
          // BƯỚC 1: Tra cứu trong Database cục bộ / 1.000+ từ chuẩn có sẵn (Tốc độ < 50ms)
          const dbResult = await lookupWordInDatabase(cleanText);
          if (!isCancelled && dbResult && dbResult.found) {
            setData({
              type: 'word',
              source: 'database',
              word: dbResult.word || cleanText,
              phonetic: dbResult.phonetic || '',
              partOfSpeech: dbResult.partOfSpeech || 'Word',
              meaningVi: dbResult.meaningVi || dbResult.meaning || '',
              meaningEn: dbResult.meaningEn || '',
              example: dbResult.example || contextSentence,
              exampleTranslation: dbResult.exampleTranslation || '',
              wordFamily: dbResult.wordFamily || ''
            });
            setIsLoading(false);
            return;
          }

          // BƯỚC 2: Từ mới chưa có trong DB -> Tự động dùng AI tra nghĩa
          const aiResult = await lookupWordWithAi(cleanText);
          if (!isCancelled) {
            setData({
              type: 'word',
              source: 'ai',
              word: aiResult.word || cleanText,
              phonetic: aiResult.phonetic || '',
              partOfSpeech: aiResult.partOfSpeech || 'Word',
              meaningVi: aiResult.meaningVi || '',
              meaningEn: aiResult.meaningEn || '',
              example: aiResult.example || contextSentence,
              exampleTranslation: aiResult.exampleTranslation || '',
              wordFamily: ''
            });
            setIsLoading(false);
          }
        } else {
          // BƯỚC 3: Cụm từ hoặc mệnh đề -> Dịch thuật AI
          const aiTranslation = await translateTextWithAi(cleanText);
          if (!isCancelled) {
            setData({
              type: 'phrase',
              source: 'ai',
              word: cleanText,
              translatedText: aiTranslation.translatedText || '',
              note: aiTranslation.note || '',
              meaningVi: aiTranslation.translatedText || '',
              context: contextSentence
            });
            setIsLoading(false);
          }
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('QuickVocabPopover lookup error:', err);
          setError(
            !isAiConfigured()
              ? 'Chưa cấu hình API Key. Bạn có thể bổ sung API Key trong phần Cài Đặt để tra từ bằng AI.'
              : (err.message || 'Không thể tra cứu từ vựng vào lúc này.')
          );
          setIsLoading(false);
        }
      }
    }

    executeLookup();

    return () => {
      isCancelled = true;
    };
  }, [cleanText, contextSentence]);

  // Đóng popover khi click ra ngoài hoặc bấm Escape
  useEffect(() => {
    const handleMouseDownOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleMouseDownOutside);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDownOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Phát âm tiếng Anh (US Audio)
  const handlePronounce = (textToSpeak) => {
    const phrase = textToSpeak || cleanText;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && phrase) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // 1-Chạm Lưu vào Sổ từ vựng cá nhân
  const handleSaveWord = async () => {
    if (isSaved || isSaving || !cleanText) return;
    setIsSaving(true);

    try {
      const targetCategory = '📖 Saved from Reading & Writing';
      const wordToSave = {
        word: data?.word || cleanText,
        phonetic: data?.phonetic || '',
        partOfSpeech: data?.partOfSpeech || (cleanText.includes(' ') ? 'Academic Phrase' : 'Word'),
        meaningVi: data?.meaningVi || data?.translatedText || '',
        meaningEn: data?.meaningEn || '',
        example: contextSentence || data?.example || '',
        exampleTranslation: data?.exampleTranslation || '',
        category: targetCategory,
        memoryTip: `Lưu từ bài đọc/bài viết TOEFL iBT 2026: "${contextSentence.substring(0, 80)}..."`
      };

      // 1. Thêm vào danh sách Starred Words trong localStorage
      const key = cleanText.toLowerCase();
      try {
        const starred = JSON.parse(localStorage.getItem('toefl_starred_words') || '[]');
        if (!starred.includes(key)) {
          const updatedStarred = [...starred, key];
          localStorage.setItem('toefl_starred_words', JSON.stringify(updatedStarred));
        }
      } catch (e) {
        console.error('Lỗi lưu starred words:', e);
      }

      // 2. Lưu vào database (LocalStorage & Supabase)
      await importVocabularyBatch([wordToSave], targetCategory);

      // 3. Bắn event đồng bộ để các tab khác (VocabularyHub) cập nhật ngay
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('toefl_vocab_updated', { detail: { word: cleanText } }));
      }

      setIsSaved(true);
      onSaveSuccess?.(wordToSave);
    } catch (err) {
      console.error('Lỗi khi lưu từ:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // Sao chép nghĩa vào Clipboard
  const handleCopy = () => {
    const textToCopy = data?.meaningVi || data?.translatedText || cleanText;
    navigator.clipboard.writeText(`${cleanText}: ${textToCopy}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Tính toán vị trí Popover nổi (Floating Coordinates)
  const popoverWidth = 360;
  const popoverEstimatedHeight = 280;

  let left = rect ? rect.left + rect.width / 2 - popoverWidth / 2 : window.innerWidth / 2 - popoverWidth / 2;
  left = Math.max(12, Math.min(window.innerWidth - popoverWidth - 12, left));

  let top = 100;
  let isPlacedAbove = false;
  if (rect) {
    if (rect.bottom + popoverEstimatedHeight + 16 <= window.innerHeight) {
      // Đủ chỗ bên dưới: đặt bên dưới
      top = rect.bottom + 8;
      isPlacedAbove = false;
    } else if (rect.top - popoverEstimatedHeight - 16 >= 0) {
      // Không đủ chỗ bên dưới nhưng đủ chỗ bên trên: đặt bên trên
      top = rect.top - popoverEstimatedHeight - 8;
      isPlacedAbove = true;
    } else {
      // Màn hình hẹp: đặt giữa viewport an toàn
      top = Math.max(12, (window.innerHeight - popoverEstimatedHeight) / 2);
    }
  }

  return createPortal(
    <div
      ref={popoverRef}
      style={{
        position: 'fixed',
        top: `${top}px`,
        left: `${left}px`,
        width: `${popoverWidth}px`,
        zIndex: 99999
      }}
      className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col text-slate-800 animate-in fade-in zoom-in-95 duration-150 select-none"
    >
      {/* 1. Header Popover: Từ vựng + Nút Loa + IPA + Nút Đóng */}
      <div className="px-4 py-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between border-b border-slate-700/80">
        <div className="flex items-center gap-2 min-w-0 pr-2">
          <span className="font-extrabold text-base tracking-tight truncate max-w-[200px]" title={cleanText}>
            {cleanText}
          </span>
          <button
            onClick={() => handlePronounce()}
            className="p-1 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
            title="Nghe phát âm chuẩn Mỹ (US)"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {data?.partOfSpeech && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
              {data.partOfSpeech}
            </span>
          )}
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            title="Đóng (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Body Nội dung tra cứu */}
      <div className="p-3.5 space-y-3 max-h-[320px] overflow-y-auto bg-slate-50/50">
        {isLoading ? (
          <div className="py-6 flex flex-col items-center justify-center space-y-2 text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
            </div>
            <span className="text-[11px] font-semibold text-slate-400">Đang tra cứu từ điển học thuật...</span>
          </div>
        ) : error ? (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold">{error}</span>
            </div>
          </div>
        ) : (
          <>
            {/* Phiên âm IPA & Nguồn tra cứu */}
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              {data?.phonetic ? (
                <span className="font-mono text-slate-700 font-semibold">{data.phonetic}</span>
              ) : (
                <span className="italic text-slate-400">Tiếng Anh học thuật TOEFL</span>
              )}
              <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                {data?.source === 'database' ? '⚡ Kho từ ETS' : '✨ AI Smart Lookup'}
              </span>
            </div>

            {/* Nghĩa Tiếng Việt chính */}
            <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-200/90 text-slate-900 shadow-2xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 mb-0.5">
                Nghĩa tiếng Việt:
              </div>
              <div className="text-xs sm:text-[13px] font-bold leading-snug">
                {data?.meaningVi || data?.translatedText || 'Chưa có bản dịch'}
              </div>
            </div>

            {/* Định nghĩa tiếng Anh hoặc Ghi chú ngữ cảnh nếu có */}
            {data?.meaningEn && (
              <div className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-700">En: </span>
                <span>{data.meaningEn}</span>
              </div>
            )}

            {/* Ngữ cảnh từ bài đọc thực tế */}
            {contextSentence && contextSentence !== cleanText && (
              <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 text-[11px] space-y-1">
                <div className="text-[10px] font-bold text-blue-800 flex items-center gap-1">
                  <span>📌 Ngữ cảnh trong bài thi:</span>
                </div>
                <p className="text-slate-700 italic font-serif leading-relaxed line-clamp-2">
                  "{contextSentence}"
                </p>
              </div>
            )}

            {/* Ghi chú ngữ pháp nếu có */}
            {data?.note && (
              <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-[10px] text-slate-600">
                💡 <span className="font-bold">Lưu ý:</span> {data.note}
              </div>
            )}
          </>
        )}
      </div>

      {/* 3. Footer Thao tác: 1-Chạm Lưu vào Sổ từ & Sao chép */}
      <div className="px-3.5 py-2.5 bg-white border-t border-slate-200 flex items-center justify-between gap-2">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-[11px] font-bold transition-all cursor-pointer border border-slate-200"
          title="Sao chép từ & nghĩa"
        >
          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{isCopied ? 'Đã chép' : 'Chép'}</span>
        </button>

        <button
          onClick={handleSaveWord}
          disabled={isSaved || isSaving || isLoading}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer shadow-xs active:scale-95 ${
            isSaved
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
              : isSaving
              ? 'bg-amber-100 text-amber-800 border border-amber-300 opacity-80 cursor-wait'
              : 'bg-[#153e75] hover:bg-[#0f2e59] text-white'
          }`}
          title={isSaved ? 'Từ này đã được lưu trong Sổ từ vựng của bạn' : 'Lưu từ này vào Sổ từ vựng (Starred Words)'}
        >
          {isSaved ? (
            <>
              <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>✓ Đã lưu vào Sổ từ</span>
            </>
          ) : (
            <>
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-400" />
              <span>{isSaving ? 'Đang lưu...' : '1-Chạm Lưu Từ'}</span>
            </>
          )}
        </button>
      </div>
    </div>,
    document.body
  );
}

export default QuickVocabPopover;
