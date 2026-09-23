import React, { useState } from 'react';
import { X, Database, Check, AlertCircle, RefreshCw, UploadCloud, Sparkles, Key, ShieldCheck, Zap } from 'lucide-react';
import { getSupabaseConfig, saveSupabaseConfig, isSupabaseConfigured, seedDefaultsToSupabase, seedVocabularyToSupabase } from '../lib/supabase';
import { getGeminiApiKey, saveGeminiApiKey, getOpenRouterApiKey, saveOpenRouterApiKey, isOpenRouterConfigured } from '../lib/gemini';

export default function SettingsModal({ isOpen, onClose, onConfigSaved }) {
  const currentConfig = getSupabaseConfig();
  const [activeTab, setActiveTab] = useState('ai'); // 'ai' hoặc 'supabase'

  // Supabase states
  const [url, setUrl] = useState(currentConfig.url);
  const [key, setKey] = useState(currentConfig.key);
  const [isSeeding, setIsSeeding] = useState(false);

  // AI API Keys states
  const envGeminiKey = import.meta.env?.VITE_GEMINI_API_KEY || import.meta.env?.GEMINI_API_KEY || '';
  const localGeminiKey = typeof localStorage !== 'undefined' ? (localStorage.getItem('toefl_gemini_api_key') || '') : '';
  const [geminiKeyInput, setGeminiKeyInput] = useState(localGeminiKey);

  const envOpenRouterKey = import.meta.env?.VITE_OPENROUTER_API_KEY || import.meta.env?.OPENROUTER_API_KEY || '';
  const localOpenRouterKey = typeof localStorage !== 'undefined' ? (localStorage.getItem('toefl_openrouter_api_key') || '') : '';
  const [openRouterKeyInput, setOpenRouterKeyInput] = useState(localOpenRouterKey);

  const [statusMsg, setStatusMsg] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    // 1. Lưu Supabase
    saveSupabaseConfig(url, key);

    // 2. Lưu AI Keys
    saveGeminiApiKey(geminiKeyInput);
    saveOpenRouterApiKey(openRouterKeyInput);

    setStatusMsg('Đã lưu toàn bộ cấu hình Hệ thống & AI thành công!');
    setTimeout(() => {
      onConfigSaved?.();
      onClose();
    }, 800);
  };

  const handleClear = () => {
    // Xóa ghi đè cục bộ Supabase
    saveSupabaseConfig('', '');
    const newConfig = getSupabaseConfig();
    setUrl(newConfig.url);
    setKey(newConfig.key);

    // Xóa ghi đè cục bộ AI
    saveGeminiApiKey('');
    saveOpenRouterApiKey('');
    setGeminiKeyInput('');
    setOpenRouterKeyInput('');

    setStatusMsg('Đã khôi phục cài đặt về Biến môi trường .env / Vercel!');
    setTimeout(() => {
      onConfigSaved?.();
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

  const hasEffectiveGemini = Boolean(geminiKeyInput.trim() || envGeminiKey.trim());
  const hasEffectiveOpenRouter = Boolean(openRouterKeyInput.trim() || envOpenRouterKey.trim());

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-800 text-white flex items-center justify-center shadow-xs">
              <Zap className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-base">
                Cài Đặt Hệ Thống & AI Providers
              </h3>
              <p className="text-[11px] text-slate-500">
                Quản lý Google Gemini, OpenRouter dự phòng và Cloud Database
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

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 bg-slate-100/70 p-1 gap-1">
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'ai'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Provider (Gemini & OpenRouter)</span>
            {hasEffectiveOpenRouter && (
              <span className="w-2 h-2 rounded-full bg-emerald-500" title="Đã có OpenRouter dự phòng" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('supabase')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'supabase'
                ? 'bg-white text-teal-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Supabase Cloud Database</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          
          {/* TAB 1: AI CONFIGURATION */}
          {activeTab === 'ai' && (
            <div className="space-y-4">
              
              {/* Status Overview Card */}
              <div className="p-3.5 rounded-2xl border text-xs leading-relaxed bg-gradient-to-r from-indigo-50/80 to-purple-50/80 border-indigo-100">
                <div className="flex items-center gap-2 mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <strong className="text-indigo-950 font-bold">Cơ Chế Chuyển Đổi Dự Phòng Thông Minh (Auto-Fallback)</strong>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Hệ thống <strong>luôn ưu tiên sử dụng Google Gemini</strong>. Khi Gemini gặp lỗi quá tải (<strong>503 High Demand</strong>) hoặc hết hạn mức (<strong>429 Quota</strong>), hệ thống sẽ <strong>tự động chuyển sang OpenRouter</strong> để tiếp tục sinh đề và chấm bài mà không gây gián đoạn!
                </p>

                <div className="mt-2.5 pt-2.5 border-t border-indigo-100/80 flex flex-wrap items-center gap-2 text-[10px]">
                  <span className={`px-2 py-0.5 rounded-md font-bold flex items-center gap-1 ${
                    hasEffectiveGemini ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${hasEffectiveGemini ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    Gemini: {hasEffectiveGemini ? 'Sẵn sàng (Ưu tiên)' : 'Chưa cấu hình'}
                  </span>

                  <span className={`px-2 py-0.5 rounded-md font-bold flex items-center gap-1 ${
                    hasEffectiveOpenRouter ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${hasEffectiveOpenRouter ? 'bg-purple-500' : 'bg-amber-500'}`} />
                    OpenRouter: {hasEffectiveOpenRouter ? 'Sẵn sàng (Dự phòng)' : 'Chưa cấu hình (Khuyên dùng)'}
                  </span>
                </div>
              </div>

              {/* 1. Google Gemini Key */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-600" />
                    <span>1. Google Gemini API Key (Ưu tiên hàng đầu)</span>
                  </label>
                  {envGeminiKey && !geminiKeyInput.trim() && (
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      ✓ Đã có từ .env / Vercel
                    </span>
                  )}
                  {geminiKeyInput.trim() && (
                    <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      Đang ghi đè cục bộ
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-500">
                  Dùng model <code className="text-teal-700 font-mono font-bold">gemini-2.5-flash</code> chính thức để sinh đề và chấm bài chuẩn ETS 2026.
                </p>

                <input
                  type="password"
                  value={geminiKeyInput}
                  onChange={(e) => setGeminiKeyInput(e.target.value)}
                  placeholder={envGeminiKey ? "•••••••• (Đang dùng biến môi trường .env)" : "Nhập AIzaSy... (hoặc để trống nếu đã có trong .env)"}
                  className="w-full px-3 py-2 text-xs font-mono border rounded-xl border-slate-300 focus:outline-hidden focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                />
              </div>

              {/* 2. OpenRouter Key */}
              <div className="p-4 rounded-2xl border border-purple-200 bg-purple-50/20 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-600" />
                    <span>2. OpenRouter API Key (Dự phòng khi Gemini lỗi/hết limit)</span>
                  </label>
                  {envOpenRouterKey && !openRouterKeyInput.trim() && (
                    <span className="text-[10px] font-semibold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md border border-purple-200">
                      ✓ Đã có từ .env / Vercel
                    </span>
                  )}
                  {openRouterKeyInput.trim() && (
                    <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      Đang ghi đè cục bộ
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Khi Gemini trả về lỗi <em>"This model is currently experiencing high demand"</em> hoặc <em>429 Quota Exceeded</em>, ứng dụng sẽ ngay lập tức chuyển sang OpenRouter (hỗ trợ các model như Gemini Vertex, DeepSeek, GPT-4o-mini).
                </p>

                <input
                  type="password"
                  value={openRouterKeyInput}
                  onChange={(e) => setOpenRouterKeyInput(e.target.value)}
                  placeholder={envOpenRouterKey ? "•••••••• (Đang dùng biến môi trường .env)" : "Nhập sk-or-v1-... (Lấy từ openrouter.ai/keys)"}
                  className="w-full px-3 py-2 text-xs font-mono border rounded-xl border-purple-300 focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 bg-white"
                />
              </div>

            </div>
          )}

          {/* TAB 2: SUPABASE CONFIGURATION */}
          {activeTab === 'supabase' && (
            <div className="space-y-4">
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
          )}

          {statusMsg && (
            <div className="p-3 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-xl flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{statusMsg}</span>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <button
            onClick={handleClear}
            className="text-xs font-semibold text-rose-600 hover:text-rose-800 cursor-pointer"
          >
            {currentConfig.envConfigured ? "Khôi phục về .env / Vercel" : "Xóa cấu hình (Dùng Offline)"}
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
              className="px-5 py-2 bg-teal-800 hover:bg-teal-900 active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Lưu cấu hình
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
