import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Target, 
  Clock, 
  Edit3, 
  Check, 
  X, 
  Sparkles, 
  Flame, 
  RotateCcw,
  Trophy,
  Globe
} from 'lucide-react';

// Múi giờ Oklahoma, Hoa Kỳ (Central Time - America/Chicago)
const OKLAHOMA_TZ = 'America/Chicago';

// Danh sách các mốc điểm mục tiêu theo thang điểm 6.0 ETS TOEFL
const TARGET_BAND_OPTIONS = [
  { value: '3.5', label: 'Band 3.5', sub: 'Cơ bản' },
  { value: '4.0', label: 'Band 4.0', sub: 'Đạt chuẩn' },
  { value: '4.5', label: 'Band 4.5', sub: 'Khá giỏi' },
  { value: '5.0', label: 'Band 5.0', sub: 'Mục tiêu' },
  { value: '5.5', label: 'Band 5.5', sub: 'Xuất sắc' },
  { value: '6.0', label: 'Band 6.0', sub: 'Tối đa' }
];

// Lấy ngày hôm nay theo múi giờ Oklahoma (YYYY-MM-DD)
const getOklahomaTodayStr = () => {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: OKLAHOMA_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date());
};

// Lấy thời gian hiện tại theo múi giờ Oklahoma
const getOklahomaNow = () => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: OKLAHOMA_TZ,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  }).formatToParts(new Date());

  const m = {};
  for (const p of parts) m[p.type] = p.value;
  let h = Number(m.hour);
  if (h === 24) h = 0;
  return new Date(
    Number(m.year),
    Number(m.month) - 1,
    Number(m.day),
    h,
    Number(m.minute),
    Number(m.second)
  );
};

// Định dạng ngày giờ Oklahoma dễ đọc
const formatOklahomaDateTime = (date = new Date()) => {
  return new Intl.DateTimeFormat('vi-VN', {
    timeZone: OKLAHOMA_TZ,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

export default function ExamCountdown() {
  const [targetDate, setTargetDate] = useState(() => {
    try {
      return localStorage.getItem('toefl_target_exam_date') || '';
    } catch (e) {
      return '';
    }
  });

  const [targetScore, setTargetScore] = useState(() => {
    try {
      const saved = localStorage.getItem('toefl_target_score');
      // Chuyển đổi dữ liệu cũ nếu trước đó lưu thang 100
      if (saved && TARGET_BAND_OPTIONS.some(opt => opt.value === saved || opt.label === saved)) {
        return saved.replace('Band ', '');
      }
      return '5.0'; // Mặc định Band 5.0 theo thang 6.0
    } catch (e) {
      return '5.0';
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempDate, setTempDate] = useState(targetDate || '');
  const [tempScore, setTempScore] = useState(targetScore || '5.0');
  const [currentOkTime, setCurrentOkTime] = useState(() => formatOklahomaDateTime());

  // Tính toán số ngày còn lại theo lịch Oklahoma, US
  const calculateDaysRemaining = (dateStr) => {
    if (!dateStr) return null;
    const okTodayStr = getOklahomaTodayStr();

    if (dateStr === okTodayStr) {
      return { isToday: true, isPassed: false, days: 0 };
    }

    const [tY, tM, tD] = dateStr.split('-').map(Number);
    const [oY, oM, oD] = okTodayStr.split('-').map(Number);

    const targetUtc = Date.UTC(tY, tM - 1, tD);
    const todayUtc = Date.UTC(oY, oM - 1, oD);

    const diffDays = Math.round((targetUtc - todayUtc) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { isToday: false, isPassed: true, days: 0 };
    }

    return { isToday: false, isPassed: false, days: diffDays };
  };

  const [timeLeft, setTimeLeft] = useState(() => calculateDaysRemaining(targetDate));

  // Cập nhật khi targetDate thay đổi hoặc định kỳ kiểm tra theo giờ Oklahoma
  useEffect(() => {
    if (targetDate) {
      setTimeLeft(calculateDaysRemaining(targetDate));
    } else {
      setTimeLeft(null);
    }

    const timer = setInterval(() => {
      setCurrentOkTime(formatOklahomaDateTime());
      if (targetDate) {
        setTimeLeft(calculateDaysRemaining(targetDate));
      }
    }, 10000); // Mỗi 10s kiểm tra cập nhật

    return () => clearInterval(timer);
  }, [targetDate]);

  // Mở modal cài đặt ngày thi
  const handleOpenModal = () => {
    setTempDate(targetDate || '');
    setTempScore(targetScore || '5.0');
    setCurrentOkTime(formatOklahomaDateTime());
    setIsModalOpen(true);
  };

  // Lưu ngày thi mới
  const handleSave = (e) => {
    e.preventDefault();
    if (!tempDate) return;

    setTargetDate(tempDate);
    setTargetScore(tempScore);
    setTimeLeft(calculateDaysRemaining(tempDate));
    try {
      localStorage.setItem('toefl_target_exam_date', tempDate);
      localStorage.setItem('toefl_target_score', tempScore);
    } catch (err) {
      // ignore
    }
    setIsModalOpen(false);
  };

  // Xóa ngày thi đã đặt
  const handleClear = () => {
    if (window.confirm('Bạn có chắc muốn hủy đặt ngày thi đếm ngược không?')) {
      setTargetDate('');
      setTimeLeft(null);
      try {
        localStorage.removeItem('toefl_target_exam_date');
      } catch (err) {
        // ignore
      }
      setIsModalOpen(false);
    }
  };

  // Chọn nhanh ngày theo mốc thời gian (+30, +60, +90 ngày tính từ giờ Oklahoma)
  const handleSetQuickDays = (addedDays) => {
    const [year, month, day] = getOklahomaTodayStr().split('-').map(Number);
    const future = new Date(year, month - 1, day + addedDays);
    const y = future.getFullYear();
    const m = String(future.getMonth() + 1).padStart(2, '0');
    const d = String(future.getDate()).padStart(2, '0');
    setTempDate(`${y}-${m}-${d}`);
  };

  const todayOkStr = getOklahomaTodayStr();

  // Định dạng hiển thị ngày DD/MM/YYYY
  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  return (
    <>
      {/* 1. HIỂN THỊ ĐỒNG HỒ ĐẾM NGƯỢC CHÍNH GIỮA FOOTER */}
      {!targetDate || !timeLeft ? (
        /* Trạng thái ban đầu: Chưa chọn ngày thi */
        <button
          onClick={handleOpenModal}
          className="group flex items-center gap-2 px-3.5 py-1.5 bg-white hover:bg-amber-50/70 border border-dashed border-amber-300 hover:border-amber-500 rounded-2xl shadow-2xs transition-all hover:scale-102 active:scale-98 cursor-pointer"
          title="Bấm để chọn ngày thi TOEFL (Theo múi giờ Oklahoma, US)"
        >
          <div className="w-5 h-5 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
            <Calendar className="w-3 h-3" />
          </div>
          <span className="text-xs font-bold text-slate-800 tracking-tight">
            Chọn ngày thi TOEFL
          </span>
          <span className="px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-800 font-extrabold text-[9px] uppercase tracking-wider">
            Oklahoma US
          </span>
        </button>
      ) : timeLeft.isToday ? (
        /* Ngày thi là hôm nay theo giờ Oklahoma! */
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl shadow-sm transition-all hover:scale-102 active:scale-98 cursor-pointer animate-pulse"
          title="Hôm nay là ngày thi TOEFL (Giờ Oklahoma, US) - Bấm để xem chi tiết"
        >
          <Trophy className="w-4 h-4 text-amber-300" />
          <span className="text-xs font-black tracking-tight">
            Hôm nay là ngày thi TOEFL! Chúc bạn tự tin đạt điểm cao!
          </span>
        </button>
      ) : timeLeft.isPassed ? (
        /* Ngày thi đã trôi qua */
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-2xl text-xs font-semibold text-slate-600 transition-all cursor-pointer"
        >
          <span>Kỳ thi đã qua</span>
          <span className="text-teal-700 font-bold hover:underline">Đặt ngày thi mới</span>
        </button>
      ) : (
        /* Trạng thái đếm ngược trực tiếp từng ngày theo giờ Oklahoma US */
        <div 
          onClick={handleOpenModal}
          className="group flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-white via-amber-50/50 to-orange-50/60 hover:from-amber-50 hover:to-orange-100/70 border border-amber-200/90 hover:border-amber-300 rounded-2xl shadow-2xs transition-all hover:scale-102 active:scale-98 cursor-pointer select-none"
          title={`Ngày thi: ${formatDateDisplay(targetDate)} (Theo lịch Oklahoma, Hoa Kỳ) - Bấm để thay đổi`}
        >
          {/* Icon ngọn lửa mục tiêu */}
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-400 text-white flex items-center justify-center shadow-xs shrink-0">
            <Flame className="w-3.5 h-3.5 text-white animate-pulse" />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 tracking-tight hidden sm:inline">
              Kỳ thi TOEFL:
            </span>

            {/* Số ngày đếm ngược to nổi bật */}
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-extrabold text-amber-900">Còn</span>
              <span className="text-base sm:text-lg font-black text-amber-600 tracking-tight">
                {timeLeft.days}
              </span>
              <span className="text-xs font-extrabold text-amber-900">ngày</span>
            </div>

            {/* Mục tiêu Band điểm thang 6.0 */}
            {targetScore && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200 rounded-md text-[10px] font-black shadow-2xs">
                <Target className="w-2.5 h-2.5 text-emerald-600" />
                <span>Band {targetScore}/6.0</span>
              </span>
            )}
          </div>

          {/* Biểu tượng sửa nhỏ */}
          <Edit3 className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-700 transition-colors shrink-0 ml-0.5" />
        </div>
      )}

      {/* 2. MODAL CÀI ĐẶT / LỰA CHỌN NGÀY THI TOEFL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-150">
            
            {/* Header Modal */}
            <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#c6764d] flex items-center justify-center text-white shadow-xs">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Đặt Ngày Thi TOEFL iBT</h3>
                  <p className="text-[10px] text-slate-300 flex items-center gap-1 mt-0.5">
                    <Globe className="w-3 h-3 text-amber-400 inline" />
                    <span>Múi giờ Oklahoma, US (Central Time)</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700/60 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Thông báo giờ hiện tại tại Oklahoma */}
            <div className="px-6 py-2.5 bg-amber-50/70 border-b border-amber-100 flex items-center justify-between text-[11px]">
              <span className="font-semibold text-amber-900 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                Giờ hiện tại tại Oklahoma:
              </span>
              <span className="font-mono font-bold text-amber-800">
                {currentOkTime}
              </span>
            </div>

            {/* Form chọn ngày & mục tiêu */}
            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  1. Chọn ngày bạn dự định thi TOEFL (Giờ Oklahoma):
                </label>
                <input
                  type="date"
                  value={tempDate}
                  min={todayOkStr}
                  onChange={(e) => setTempDate(e.target.value)}
                  required
                  className="w-full text-sm font-semibold p-3 bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white rounded-xl outline-hidden transition-all cursor-pointer text-slate-900"
                />
              </div>

              {/* Mốc chọn nhanh */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Chọn nhanh thời gian ôn luyện:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleSetQuickDays(30)}
                    className="px-3 py-2 bg-slate-100 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-xl text-xs font-bold text-slate-700 transition-all cursor-pointer active:scale-95"
                  >
                    +30 ngày (1 tháng)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSetQuickDays(60)}
                    className="px-3 py-2 bg-slate-100 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-xl text-xs font-bold text-slate-700 transition-all cursor-pointer active:scale-95"
                  >
                    +60 ngày (2 tháng)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSetQuickDays(90)}
                    className="px-3 py-2 bg-slate-100 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-xl text-xs font-bold text-slate-700 transition-all cursor-pointer active:scale-95"
                  >
                    +90 ngày (3 tháng)
                  </button>
                </div>
              </div>

              {/* Mục tiêu điểm số thang điểm 6.0 */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    2. Mục tiêu Band điểm (Thang điểm 6.0 ETS):
                  </label>
                  <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    ETS Band 1.0 - 6.0
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {TARGET_BAND_OPTIONS.map((opt) => {
                    const isSelected = tempScore === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setTempScore(opt.value)}
                        className={`py-2 px-1 rounded-xl text-xs font-black transition-all cursor-pointer border flex flex-col items-center justify-center gap-0.5 ${
                          isSelected
                            ? 'bg-amber-500 text-white border-amber-600 shadow-xs ring-2 ring-amber-400/40'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span>{opt.label}</span>
                        <span className={`text-[9px] font-medium ${isSelected ? 'text-amber-100' : 'text-slate-400'}`}>
                          {opt.sub}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Buttons hành động */}
              <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
                {targetDate ? (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="flex items-center gap-1.5 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Hủy đặt ngày
                  </button>
                ) : <div />}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Đóng
                  </button>
                  <button
                    type="submit"
                    disabled={!tempDate}
                    className="px-5 py-2 bg-[#c6764d] hover:bg-[#b5653c] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                  >
                    Bắt đầu đếm ngược
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
}
