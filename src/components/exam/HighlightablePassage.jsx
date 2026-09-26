import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Highlighter, Trash2, Check } from 'lucide-react';
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

  // BÔI ĐEN VĂN BẢN:
  // - Khi Bút highlight BẬT: CHỈ chạy function tô màu (không mở pop-up dịch nghĩa)
  // - Khi Bút highlight TẮT: CHỈ mở pop-up dịch nghĩa / tra từ vựng (không tô màu)
  const handleMouseUp = () => {
    setTimeout(() => {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed || !passageRef.current) return;

      const range = sel.getRangeAt(0);
      if (!passageRef.current.contains(range.startContainer) || !passageRef.current.contains(range.endContainer)) {
        return;
      }

      const raw = sel.toString().trim();
      if (!raw || raw.length < 2 || raw.length > 180) return;
      const words = raw.split(/\s+/).filter(Boolean);
      if (words.length > 16) return;

      const rect = range.getBoundingClientRect();
      if (!rect || (rect.width === 0 && rect.height === 0)) return;

      const cleanWord = raw.replace(/^['"“‘.,;:!?()\[\]{}]+|['"”’.,;:!?()\[\]{}]+$/g, '').trim();
      if (!cleanWord) return;

      if (isHighlightEnabled) {
        // 1. KHI ĐANG BẬT HIGHLIGHT: CHỈ chạy function tô màu, KHÔNG kích hoạt dịch nghĩa
        setSelectionData(null);
        const offsets = getSelectionOffsets();
        if (offsets && offsets.start < offsets.end) {
          const newHighlight = {
            id: `hl_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
            start: offsets.start,
            end: offsets.end,
            color: selectedColor
          };
          setHighlights((prev) => addHighlightRange(prev, newHighlight));
          // Xóa vùng bôi đen xanh của trình duyệt sau khi tô màu để hiển thị màu highlight trực tiếp
          try {
            window.getSelection()?.removeAllRanges();
          } catch (e) {
            // ignore
          }
        }
      } else {
        // 2. KHI ĐÃ TẮT HIGHLIGHT: MỚI kích hoạt bôi đen tra cứu & dịch nghĩa từ vựng
        setSelectionData({
          rawText: raw,
          cleanText: cleanWord,
          rect
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
      
      {/* 1. Header Toolbar cho Bài đọc & Công cụ Highlight */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-4">
        
        {/* Nhãn loại bài đọc & Chủ đề */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100/80 px-2.5 py-1 rounded-lg border border-amber-200">
            {documentType || "Reading Passage"}
          </span>
          {topicTitle && (
            <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
              {topicTitle}
            </span>
          )}
        </div>

        {/* Thanh công cụ Bút dạ quang (Highlighter Tools) */}
        <div className="flex items-center gap-2">
          
          {/* Nút bật/tắt bút dạ quang */}
          <button
            onClick={() => {
              setIsHighlightEnabled((prev) => {
                const next = !prev;
                if (next) setSelectionData(null); // Đóng ngay popup dịch nghĩa khi bật highlight
                return next;
              });
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              isHighlightEnabled
                ? 'bg-amber-100/90 text-amber-900 border-amber-300 shadow-2xs'
                : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
            }`}
            title={isHighlightEnabled ? 'Bút highlight đang BẬT: Bôi đen để tô màu. Tắt bút để chuyển sang chế độ bôi đen dịch nghĩa.' : 'Bút highlight đang TẮT: Bôi đen để dịch nghĩa & tra từ. Bật bút để chuyển sang tô màu.'}
          >
            <Highlighter className={`w-3.5 h-3.5 ${isHighlightEnabled ? 'text-amber-700' : 'text-slate-400'}`} />
            <span>{isHighlightEnabled ? 'Bút highlight: BẬT' : 'Bút: TẮT'}</span>
          </button>

          {/* Bảng chọn màu tô */}
          {isHighlightEnabled && (
            <div className="flex items-center bg-slate-100/80 rounded-xl p-1 border border-slate-200 gap-1 animate-in fade-in duration-150">
              {Object.values(HIGHLIGHT_COLORS).map((c) => {
                const isSelected = selectedColor === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c.id)}
                    title={`Màu ${c.name} (Bôi đen từ sẽ tự tô màu này)`}
                    className={`w-5 h-5 rounded-full ${c.dotClass} flex items-center justify-center transition-all cursor-pointer ${
                      isSelected ? `ring-2 ${c.ringClass} scale-110 shadow-xs` : 'opacity-60 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-slate-900 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Nút xóa toàn bộ highlight nếu đang có */}
          {highlights.length > 0 && (
            <button
              onClick={handleClearAllHighlights}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors cursor-pointer"
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
