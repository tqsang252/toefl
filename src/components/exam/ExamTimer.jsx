import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

export default function ExamTimer({ durationSeconds = 600, onTimeUp, isPaused = false }) {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);

  useEffect(() => {
    setTimeLeft(durationSeconds);
  }, [durationSeconds]);

  useEffect(() => {
    if (isPaused) return;

    if (timeLeft <= 0) {
      if (onTimeUp) onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (onTimeUp) onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isPaused, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isUrgent = timeLeft <= 30;
  const isWarning = timeLeft <= 120 && !isUrgent;

  return (
    <div className="flex items-center gap-2">
      <div 
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono font-bold text-sm tracking-wider border transition-all ${
          isUrgent 
            ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse ring-2 ring-rose-400/40' 
            : isWarning 
            ? 'bg-amber-50 text-amber-800 border-amber-300' 
            : 'bg-slate-100 text-slate-700 border-slate-200'
        }`}
      >
        <Clock className={`w-4 h-4 ${isUrgent ? 'text-rose-600' : 'text-slate-500'}`} />
        <span>{formatted}</span>
      </div>

      {isUrgent && (
        <span className="text-[11px] font-semibold text-rose-600 hidden sm:inline animate-bounce">
          Sắp hết giờ!
        </span>
      )}
    </div>
  );
}
