import React, { useState } from 'react';
import { X, Database, Check, AlertCircle, RefreshCw, UploadCloud } from 'lucide-react';
import { getSupabaseConfig, saveSupabaseConfig, isSupabaseConfigured, seedDefaultsToSupabase, seedVocabularyToSupabase } from '../lib/supabase';

export default function SettingsModal({ isOpen, onClose, onConfigSaved }) {
  const currentConfig = getSupabaseConfig();
  const [url, setUrl] = useState(currentConfig.url);
  const [key, setKey] = useState(currentConfig.key);
  const [isSeeding, setIsSeeding] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    saveSupabaseConfig(url, key);
    setStatusMsg('Đã lưu cấu hình Supabase thành công!');
    setTimeout(() => {
      onConfigSaved();
      onClose();
    }, 800);
  };

  const handleClear = () => {
    saveSupabaseConfig('', '');
    const newConfig = getSupabaseConfig();
    setUrl(newConfig.url);
    setKey(newConfig.key);
    setStatusMsg(newConfig.envConfigured 
      ? 'Đã khôi phục về Biến môi trường Vercel!' 
      : 'Đã chuyển về chế độ Local Storage (Offline).'
    );
    setTimeout(() => {
      onConfigSaved();
      onClose();
    }, 800);
  };

  const handleSeedDefaults = async () => {
    if (!isSupabaseConfigured()) {
      alert("Vui lòng lưu Supabase URL và Key trước khi tải đề mẫu lên Cloud!");
      return;
    }

    try {
      setIsSeeding(true);
      setStatusMsg("Đang đồng bộ bộ đề mẫu lên Supabase...");
      const count = await seedDefaultsToSupabase();
      setStatusMsg(`Đã nạp thành công ${count} bộ đề vào Supabase!`);
      setTimeout(() => setStatusMsg(''), 4000);
    } catch (e) {
      alert("Lỗi khi nạp dữ liệu lên Supabase: " + e.message);
      setStatusMsg("");
    } finally {
      setIsSeeding(false);
    }
  };

  const handleSeedVocabulary = async () => {
    if (!isSupabaseConfigured()) {
      alert("Vui lòng lưu Supabase URL và Key trước khi tải từ vựng lên Cloud!");
      return;
    }

    try {
      setIsSeeding(true);
      setStatusMsg("Đang đồng bộ hơn 1,000 từ vựng lên Supabase...");
      await seedVocabularyToSupabase((current, total) => {
        setStatusMsg(`Đang tải lên Supabase: ${current}/${total} từ vựng...`);
      });
      setStatusMsg("✓ Đã nạp thành công hơn 1,000 từ vựng vào Supabase!");
      setTimeout(() => setStatusMsg(''), 4000);
    } catch (e) {
      alert("Lỗi khi nạp từ vựng lên Supabase: " + e.message);
      setStatusMsg("");
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">
                Cấu hình Supabase Database
              </h3>
              <p className="text-[11px] text-slate-500">
                Lưu trữ đề thi và lịch sử làm bài vĩnh viễn trên Cloud
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {currentConfig.isFromEnv ? (
            <div className="bg-teal-50 p-3.5 rounded-xl border border-teal-200 text-xs text-teal-950 leading-relaxed flex items-start gap-2.5">
              <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-teal-900">Đang kết nối tự động từ Biến môi trường Vercel.</strong>
                <p className="text-[11px] text-teal-700 mt-0.5">
                  Ứng dụng đã tự động nhận diện Supabase URL và API Key được cấu hình trên Vercel. Bạn không cần phải nhập lại bằng tay.
                </p>
              </div>
            </div>
          ) : currentConfig.hasLocalOverride ? (
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>Bạn đang ghi đè cấu hình thủ công trên trình duyệt này.</span>
            </div>
          ) : (
            <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
              <strong>Hướng dẫn nhanh:</strong> Vào <strong>Project Settings → API</strong> trong Supabase Dashboard để copy <strong>Project URL</strong> và <strong>anon public key</strong>.
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Project URL:
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-project.supabase.co"
              className="w-full px-3 py-2 text-xs font-mono border rounded-xl border-slate-300 focus:outline-hidden focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Anon Public API Key:
            </label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsIn..."
              className="w-full px-3 py-2 text-xs font-mono border rounded-xl border-slate-300 focus:outline-hidden focus:border-emerald-600"
            />
          </div>

          {statusMsg && (
            <div className="p-3 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-xl flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{statusMsg}</span>
            </div>
          )}

          {/* Seed Defaults and Vocabulary Buttons */}
          <div className="pt-2">
            <button
              onClick={handleSeedDefaults}
              disabled={isSeeding}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 active:scale-98 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <UploadCloud className="w-4 h-4 text-slate-600" />
              <span>{isSeeding ? "Đang đồng bộ..." : "Đồng bộ bộ đề mẫu 2026 lên Supabase của bạn"}</span>
            </button>

            <button
              onClick={handleSeedVocabulary}
              disabled={isSeeding}
              className="w-full mt-2.5 py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 active:scale-98 text-emerald-900 font-bold text-xs rounded-xl border border-emerald-300 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <UploadCloud className="w-4 h-4 text-emerald-700" />
              <span>{isSeeding ? "Đang xử lý..." : "☁️ Đồng bộ 1,000+ từ vựng TOEFL 2026 (12 chủ đề) lên Supabase"}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <button
            onClick={handleClear}
            className="text-xs font-semibold text-rose-600 hover:text-rose-800 cursor-pointer"
          >
            {currentConfig.envConfigured ? "Khôi phục về Biến môi trường Vercel" : "Xóa cấu hình (Dùng Offline)"}
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Lưu cấu hình
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
