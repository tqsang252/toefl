import React, { useState, useRef, useEffect } from 'react';
import { Highlighter, Trash2, Check } from 'lucide-react';

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

export default function HighlightablePassage({ passageText, documentType, testId }) {
  const rawText = (passageText || '').replace(/\r\n/g, '\n');
  const passageRef = useRef(null);
  
  // Lưu danh sách highlight theo testId để không bị mất khi chuyển câu hỏi
  const [highlights, setHighlights] = useState([]);
  const [selectedColor, setSelectedColor] = useState('yellow');
  const [isHighlightEnabled, setIsHighlightEnabled] = useState(true);

  // Khi đổi bài đọc (testId đổi) -> reset lại highlight
  useEffect(() => {
    setHighlights([]);
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

  // TỰ ĐỘNG TÔ MÀU NGAY LẬP TỨC khi người dùng bôi đen văn bản
  const handleMouseUp = () => {
    if (!isHighlightEnabled) return;

    setTimeout(() => {
      const offsets = getSelectionOffsets();
      if (!offsets || offsets.start >= offsets.end) return;

      const text = rawText.substring(offsets.start, offsets.end).trim();
      if (!text) return;

      // Tô màu đã chọn LUÔN, không bắt người dùng bấm chọn lại
      const newHighlight = {
        id: `hl_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        start: offsets.start,
        end: offsets.end,
        color: selectedColor
      };

      setHighlights((prev) => addHighlightRange(prev, newHighlight));
      
      // Xóa vệt xanh bôi đen mặc định của trình duyệt để hiển thị màu highlight đẹp mắt
      window.getSelection()?.removeAllRanges();
    }, 20);
  };

  // Xóa trực tiếp 1 highlight khi nhấp vào từ đó
  const handleRemoveSingleHighlight = (id) => {
    setHighlights((prev) => prev.filter((h) => h.id !== id));
  };

  // Xóa toàn bộ highlight của bài đọc
  const handleClearAllHighlights = () => {
    if (confirm('Bạn có muốn xóa toàn bộ các từ đã tô sáng trong bài đọc này?')) {
      setHighlights([]);
    }
  };

  // Render văn bản kèm các thẻ <mark> tô màu
  const renderHighlightedContent = () => {
    if (!highlights || highlights.length === 0) {
      return rawText;
    }

    const elements = [];
    let cur = 0;

    for (let i = 0; i < highlights.length; i++) {
      const h = highlights[i];
      if (h.start > cur) {
        elements.push(rawText.substring(cur, h.start));
      }

      const colorCfg = HIGHLIGHT_COLORS[h.color] || HIGHLIGHT_COLORS.yellow;
      const textPiece = rawText.substring(h.start, h.end);

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
        
        {/* Nhãn loại bài đọc */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100/80 px-2.5 py-1 rounded-lg border border-amber-200">
            {documentType || "Reading Passage"}
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            (Bôi đen là tự tô màu • Nhấp vào từ để xóa)
          </span>
        </div>

        {/* Thanh công cụ Bút dạ quang (Highlighter Tools) */}
        <div className="flex items-center gap-2">
          
          {/* Nút bật/tắt bút dạ quang */}
          <button
            onClick={() => setIsHighlightEnabled((prev) => !prev)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              isHighlightEnabled
                ? 'bg-amber-100/90 text-amber-900 border-amber-300 shadow-2xs'
                : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
            }`}
            title={isHighlightEnabled ? 'Bút highlight đang BẬT: Bôi đen là tự tô màu' : 'Bút highlight đang TẮT (Chế độ chọn văn bản bình thường)'}
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
        className="prose prose-slate max-w-none text-slate-800 text-sm leading-relaxed whitespace-pre-wrap font-serif select-text relative focus:outline-none"
      >
        {renderHighlightedContent()}
      </div>

    </div>
  );
}
