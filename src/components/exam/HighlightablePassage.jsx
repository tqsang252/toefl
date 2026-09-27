import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Highlighter, Trash2, Check, Sparkles } from 'lucide-react';
import QuickVocabPopover from '../dictionary/QuickVocabPopover';

const HIGHLIGHT_COLORS = {
  yellow: {
    id: 'yellow',
    name: 'Vàng',
    bgClass: 'bg-amber-200/90 text-slate-950 border-b-2 border-amber-400',
    hoverClass: 'hover:bg-amber-300',
    dotClass: 'bg-amber-400',
    ringClass: 'ring-amber-500'
  },
  green: {
    id: 'green',
    name: 'Xanh lá',
    bgClass: 'bg-emerald-200/90 text-slate-950 border-b-2 border-emerald-400',
    hoverClass: 'hover:bg-emerald-300',
    dotClass: 'bg-emerald-400',
    ringClass: 'ring-emerald-500'
  },
  blue: {
    id: 'blue',
    name: 'Xanh lam',
    bgClass: 'bg-sky-200/90 text-slate-950 border-b-2 border-sky-400',
    hoverClass: 'hover:bg-sky-300',
    dotClass: 'bg-sky-400',
    ringClass: 'ring-sky-500'
  },
  pink: {
    id: 'pink',
    name: 'Hồng',
    bgClass: 'bg-rose-200/90 text-slate-950 border-b-2 border-rose-400',
    hoverClass: 'hover:bg-rose-300',
    dotClass: 'bg-rose-400',
    ringClass: 'ring-rose-500'
  }
};

// Thuật toán gộp & cắt lát các dải highlight không trùng lặp
function addHighlightRange(ranges, newR) {
  const result = [];
  for (const r of ranges) {
    if (r.end <= newR.start || r.start >= newR.end) {
      result.push(r);
    } else if (r.start < newR.start && r.end > newR.end) {
      result.push({ ...r, id: `${r.id}_1`, end: newR.start });
      result.push({ ...r, id: `${r.id}_2`, start: newR.end });
    } else if (r.start < newR.start && r.end <= newR.end) {
      result.push({ ...r, end: newR.start });
    } else if (r.start >= newR.start && r.end > newR.end) {
      result.push({ ...r, start: newR.end });
    }
  }
  result.push(newR);
  result.sort((a, b) => a.start - b.start);
  return result;
}

export default function HighlightablePassage({
  passageText,
  documentType,
  testId,
  targetWord = null,
  targetParagraph = null,
  topicTitle = null
}) {
  const rawText = (passageText || '').replace(/\r\n/g, '\n');
  const passageRef = useRef(null);
  
  // Lưu danh sách highlight theo testId để không bị mất khi chuyển câu hỏi
  const [highlights, setHighlights] = useState([]);
  const [selectedColor, setSelectedColor] = useState('yellow');
  const [isHighlightEnabled, setIsHighlightEnabled] = useState(true);
  const [isTranslateEnabled, setIsTranslateEnabled] = useState(true);

  // Trạng thái hiển thị Pop-up Từ điển Tra & Lưu 1-chạm
  const [selectionData, setSelectionData] = useState(null);

  // Xác định vị trí của targetWord trong rawText (nếu có)
  const targetWordRange = useMemo(() => {
    if (!targetWord || !rawText) return null;
    const cleanWord = targetWord.trim();
    if (!cleanWord) return null;

    const escaped = cleanWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');

    if (targetParagraph && typeof targetParagraph === 'number') {
      const paras = rawText.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
      let offset = 0;
      for (let i = 0; i < paras.length; i++) {
        const p = paras[i];
        const pNum = i + 1;
        const pIdx = rawText.indexOf(p, offset);
        if (pNum === targetParagraph) {
          const match = regex.exec(p);
          if (match) {
            return {
              start: pIdx + match.index,
              end: pIdx + match.index + match[0].length,
              text: match[0]
            };
          }
        }
        offset = pIdx + p.length;
      }
    }

    const match = regex.exec(rawText);
    if (match) {
      return {
        start: match.index,
        end: match.index + match[0].length,
        text: match[0]
      };
    }
    return null;
  }, [rawText, targetWord, targetParagraph]);

  // Khi đổi bài đọc (testId đổi) -> reset lại highlight & đóng pop-up
  useEffect(() => {
    setHighlights([]);
    setSelectionData(null);
  }, [testId]);

  // Tính toán vị trí ký tự (character offset) của vùng bôi đen bên trong passageRef
  const getSelectionOffsets = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed || !passageRef.current) return null;

    const range = sel.getRangeAt(0);
    if (!passageRef.current.contains(range.startContainer) || !passageRef.current.contains(range.endContainer)) {
      return null;
    }

    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(passageRef.current);
    preCaretRange.setEnd(range.startContainer, range.startOffset);
    const start = preCaretRange.toString().length;
    const end = start + range.toString().length;

    return { start, end };
  };

  // BÔI ĐEN VĂN BẢN (Hỗ trợ cả từ đơn, cụm từ & câu học thuật dài):
  // - Nếu Bút highlight BẬT: Tự động tô màu đoạn đã chọn
  // - Nếu Dịch nhanh BẬT (Mặc định): Mở ngay Pop-up tra từ & dịch nghĩa AI
  const handleMouseUp = () => {
    setTimeout(() => {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed || !passageRef.current) return;

      const range = sel.getRangeAt(0);
      if (!passageRef.current.contains(range.startContainer) || !passageRef.current.contains(range.endContainer)) {
        return;
      }

      const raw = sel.toString().trim();
      // Hỗ trợ từ đơn lẻ đến cả câu văn học thuật dài (lên đến 1500 ký tự và 150 từ)
      if (!raw || raw.length < 2 || raw.length > 1500) return;
      const words = raw.split(/\s+/).filter(Boolean);
      if (words.length > 150) return;

      const rect = range.getBoundingClientRect();
      if (!rect || (rect.width === 0 && rect.height === 0)) return;

      const cleanWord = raw.replace(/^['"“‘.,;:!?()\[\]{}]+|['"”’.,;:!?()\[\]{}]+$/g, '').trim();
      if (!cleanWord) return;

      // Trích xuất câu văn ngữ cảnh bao quanh từ/cụm được chọn
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

      // 1. KHI BÚT HIGHLIGHT BẬT: Tô màu vùng chọn
      if (isHighlightEnabled) {
        const offsets = getSelectionOffsets();
        if (offsets && offsets.start < offsets.end) {
          const newHighlight = {
            id: `hl_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
            start: offsets.start,
            end: offsets.end,
            color: selectedColor
          };
          setHighlights((prev) => addHighlightRange(prev, newHighlight));
        }
      }

      // 2. KHI TÍNH NĂNG DỊCH BẬT (Mặc định BẬT): Kích hoạt Popover tra cứu từ / dịch câu AI
      if (isTranslateEnabled) {
        setSelectionData({
          rawText: raw,
          cleanText: cleanWord,
          contextSentence: contextSentence || raw,
          rect: {
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            width: rect.width,
            height: rect.height
          }
        });
      }
    }, 20);
  };

  // Xóa trực tiếp 1 highlight khi nhấp vào từ đó
  const handleRemoveSingleHighlight = (id) => {
    setHighlights((prev) => prev.filter((h) => h.id !== id));
    setSelectionData(null);
  };

  // Xóa toàn bộ highlight của bài đọc
  const handleClearAllHighlights = () => {
    if (confirm('Bạn có muốn xóa toàn bộ các từ đã tô sáng trong bài đọc này?')) {
      setHighlights([]);
    }
  };

  // Kết hợp dải highlight của người dùng và từ khóa mục tiêu (nếu có)
  const allRanges = useMemo(() => {
    const list = [...highlights];
    if (targetWordRange) {
      const nonOverlapping = [];
      for (const h of list) {
        if (h.end <= targetWordRange.start || h.start >= targetWordRange.end) {
          nonOverlapping.push(h);
        } else {
          if (h.start < targetWordRange.start) {
            nonOverlapping.push({ ...h, id: `${h.id}_pre`, end: targetWordRange.start });
          }
          if (h.end > targetWordRange.end) {
            nonOverlapping.push({ ...h, id: `${h.id}_post`, start: targetWordRange.end });
          }
        }
      }
      nonOverlapping.push({
        id: '__target_word__',
        start: targetWordRange.start,
        end: targetWordRange.end,
        isTargetWord: true
      });
      nonOverlapping.sort((a, b) => a.start - b.start);
      return nonOverlapping;
    }
    list.sort((a, b) => a.start - b.start);
    return list;
  }, [highlights, targetWordRange]);

  // Render văn bản kèm các thẻ <mark> tô màu
  const renderHighlightedContent = () => {
    if (!allRanges || allRanges.length === 0) {
      return rawText;
    }

    const elements = [];
    let cur = 0;

    for (let i = 0; i < allRanges.length; i++) {
      const h = allRanges[i];
      if (h.start > cur) {
        elements.push(rawText.substring(cur, h.start));
      }

      const textPiece = rawText.substring(h.start, h.end);

      if (h.isTargetWord) {
        elements.push(
          <mark
            key="__target_word__"
            className="bg-amber-200/95 text-amber-950 font-bold px-1.5 py-0.5 rounded border-b-2 border-amber-600 shadow-2xs ring-2 ring-amber-400/40 select-text cursor-help inline"
            title={`Từ vựng câu hỏi: "${textPiece}"`}
          >
            {textPiece}
          </mark>
        );
      } else {
        const colorCfg = HIGHLIGHT_COLORS[h.color] || HIGHLIGHT_COLORS.yellow;
        elements.push(
          <mark
            key={h.id || `hl_${h.start}_${h.end}`}
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveSingleHighlight(h.id);
            }}
            title="Nhấp để xóa highlight này"
            className={`${colorCfg.bgClass} ${colorCfg.hoverClass} rounded-xs px-0.5 py-0.5 cursor-pointer transition-all duration-150 inline font-serif select-text hover:opacity-85`}
          >
            {textPiece}
          </mark>
        );
      }

      cur = h.end;
    }

    if (cur < rawText.length) {
      elements.push(rawText.substring(cur));
    }

    return elements;
  };

  return (
    <div className="relative">
      
      {/* 1. Header Toolbar cho Bài đọc & Công cụ Highlight (Cố định vị trí, không nhảy dòng) */}
      <div className="border-b border-slate-100 pb-3 mb-4 space-y-2.5">
        
        {/* Hàng 1: Nhãn loại bài đọc & Chủ đề */}
        <div className="flex items-center gap-2 flex-wrap min-h-[26px]">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100/80 px-2.5 py-1 rounded-lg border border-amber-200 shrink-0">
            {documentType || "Reading Passage"}
          </span>
          {topicTitle && (
            <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200 truncate max-w-[320px]" title={topicTitle}>
              {topicTitle}
            </span>
          )}
        </div>

        {/* Hàng 2: Thanh công cụ cố định hoàn toàn - không bị nhảy dòng hay co giật khung hình */}
        <div className="flex items-center gap-2 bg-slate-50/90 rounded-2xl p-1.5 border border-slate-200/80 min-h-[42px] select-none">
          
          {/* Nút bật/tắt dịch nhanh AI khi bôi đen (Cố định kích thước w-[110px]) */}
          <button
            type="button"
            onClick={() => {
              setIsTranslateEnabled((prev) => {
                const next = !prev;
                if (!next) setSelectionData(null);
                return next;
              });
            }}
            className={`w-[110px] h-8 flex items-center justify-center gap-1.5 px-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border shrink-0 ${
              isTranslateEnabled
                ? 'bg-teal-50 text-teal-800 border-teal-300 shadow-2xs'
                : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-100 hover:text-slate-600'
            }`}
            title={isTranslateEnabled ? 'Dịch nhanh AI đang BẬT: Bôi đen để hiện khung tra nghĩa & dịch tự động.' : 'Dịch nhanh AI đang TẮT: Bấm để bật tính năng bôi đen dịch tự động.'}
          >
            <Sparkles className={`w-3.5 h-3.5 shrink-0 ${isTranslateEnabled ? 'text-teal-600' : 'text-slate-400'}`} />
            <span>Dịch: {isTranslateEnabled ? 'BẬT' : 'TẮT'}</span>
          </button>

          {/* Nút bật/tắt bút dạ quang (Cố định kích thước w-[124px]) */}
          <button
            type="button"
            onClick={() => {
              setIsHighlightEnabled((prev) => !prev);
            }}
            className={`w-[124px] h-8 flex items-center justify-center gap-1.5 px-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border shrink-0 ${
              isHighlightEnabled
                ? 'bg-amber-100/90 text-amber-900 border-amber-300 shadow-2xs'
                : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-100 hover:text-slate-600'
            }`}
            title={isHighlightEnabled ? 'Bút highlight đang BẬT: Bôi đen để tô màu bài đọc.' : 'Bút highlight đang TẮT: Bấm để bật chế độ tô màu dạ quang.'}
          >
            <Highlighter className={`w-3.5 h-3.5 shrink-0 ${isHighlightEnabled ? 'text-amber-700' : 'text-slate-400'}`} />
            <span>Highlight: {isHighlightEnabled ? 'BẬT' : 'TẮT'}</span>
          </button>

          {/* Bảng chọn màu tô (Luôn hiển thị cố định vị trí; nhấp màu sẽ tự kích hoạt bút) */}
          <div 
            className={`flex items-center bg-white rounded-xl p-1 border border-slate-200 gap-1 shrink-0 transition-opacity ${
              isHighlightEnabled ? 'opacity-100' : 'opacity-40 hover:opacity-80'
            }`}
            title={isHighlightEnabled ? 'Bảng màu dạ quang (Đang dùng)' : 'Bút đang tắt - Nhấp vào màu để bật bút highlight'}
          >
            {Object.values(HIGHLIGHT_COLORS).map((c) => {
              const isSelected = selectedColor === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setSelectedColor(c.id);
                    if (!isHighlightEnabled) setIsHighlightEnabled(true);
                  }}
                  title={`Màu ${c.name}${!isHighlightEnabled ? ' (Nhấp để bật highlight)' : ''}`}
                  className={`w-5 h-5 rounded-full ${c.dotClass} flex items-center justify-center transition-transform cursor-pointer shrink-0 ${
                    isSelected && isHighlightEnabled ? `ring-2 ${c.ringClass} scale-110 shadow-xs` : 'opacity-75 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  {isSelected && isHighlightEnabled && <Check className="w-3 h-3 text-slate-900 stroke-[3]" />}
                </button>
              );
            })}
          </div>

          {/* Nút xóa toàn bộ highlight nếu đang có (nằm sát lề phải, không đẩy các nút bên trái) */}
          {highlights.length > 0 && (
            <button
              type="button"
              onClick={handleClearAllHighlights}
              className="ml-auto flex items-center gap-1 px-2.5 h-7 text-[11px] font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors cursor-pointer shrink-0"
              title="Xóa tất cả các đoạn đã tô sáng"
            >
              <Trash2 className="w-3 h-3" />
              <span>Xóa ({highlights.length})</span>
            </button>
          )}

        </div>

      </div>

      {/* 2. Khung bài đọc chính (Hỗ trợ bôi đen tự tô màu & click xóa) */}
      <div
        ref={passageRef}
        onMouseUp={handleMouseUp}
        className="prose prose-slate max-w-none text-slate-800 text-[15px] sm:text-[16px] leading-relaxed whitespace-pre-wrap font-serif select-text relative focus:outline-none"
      >
        {renderHighlightedContent()}
      </div>

      {/* 3. Pop-up Tra cứu & 1-Chạm Lưu từ vựng */}
      {selectionData && (
        <QuickVocabPopover
          selection={selectionData}
          onClose={() => setSelectionData(null)}
        />
      )}

    </div>
  );
}
