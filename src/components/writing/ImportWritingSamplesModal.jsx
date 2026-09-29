import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  Upload,
  Copy,
  Check,
  FileCode,
  AlertCircle,
  Info,
  Wand2,
  Mail,
  MessageSquare,
  CheckCircle2,
  BookOpen,
  Layers,
  ArrowRight,
  RefreshCw,
  FolderOpen
} from 'lucide-react';
import { jsonrepair } from 'jsonrepair';
import {
  getWritingSamplesHubPrompt,
  SAMPLE_WRITING_EMAIL_SAMPLES_PROMPT,
  SAMPLE_WRITING_DISCUSSION_SAMPLES_PROMPT
} from '../../lib/examPrompts';
import { importBatchWritingSamples } from '../../lib/writingSamplesStorage';
import { getGeminiApiKeys, DEFAULT_GEMINI_MODEL, isGeminiConfigured } from '../../lib/gemini';

// Helper làm sạch và tự động sửa lỗi cú pháp JSON
function cleanAndParseJson(rawInput) {
  if (!rawInput || !rawInput.trim()) {
    throw new Error('Dữ liệu JSON rỗng. Vui lòng dán mã JSON hoặc chọn file .json.');
  }

  let text = rawInput.trim();

  // 1. Bóc tách markdown ```json ... ```
  if (text.includes('```')) {
    const blockMatch = text.match(/```(?:json)?\s*([\s\S]*?)(?:```|$)/i);
    if (blockMatch) {
      text = blockMatch[1].trim();
    } else {
      text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
    }
  }

  // 2. Chuyển đổi ngoặc kép cong thông minh (“ ”) sang (" ") và ngoặc đơn cong (‘ ’) sang (')
  text = text.replace(/[\u201C\u201D]/g, '"').replace(/[\u2018\u2019]/g, "'");

  // 3. Parse trực tiếp
  try {
    return JSON.parse(text);
  } catch (err1) {
    // 4. Tự động sửa lỗi với jsonrepair
    try {
      const repaired = jsonrepair(text);
      return JSON.parse(repaired);
    } catch (err2) {
      try {
        const preprocessed = text.replace(/,\s*([\]}])/g, '$1');
        const repaired2 = jsonrepair(preprocessed);
        return JSON.parse(repaired2);
      } catch (err3) {
        throw new Error(
          'Định dạng JSON không hợp lệ: ' + err1.message +
          '\n💡 Gợi ý: Hãy kiểm tra xem đoạn JSON bạn copy từ AI có bị cắt ngang giữa chừng không, hoặc bên trong có dấu ngoặc kép lồng nhau không.'
        );
      }
    }
  }
}

export default function ImportWritingSamplesModal({
  isOpen,
  onClose,
  defaultType = 'email',
  onImportSuccess
}) {
  const [activeTab, setActiveTab] = useState('prompt'); // 'prompt' | 'upload' | 'ai'
  const [sampleType, setSampleType] = useState(defaultType); // 'email' | 'discussion'
  
  // Tab Prompt options
  const [sampleCount, setSampleCount] = useState(3);
  const [customTopic, setCustomTopic] = useState('');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  
  // Tab Upload options
  const [jsonInput, setJsonInput] = useState('');
  const [parsedPreview, setParsedPreview] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successInfo, setSuccessInfo] = useState(null);
  const fileInputRef = useRef(null);

  // Tab AI Generator
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiStatus, setAiStatus] = useState('');

  // Đồng bộ sampleType khi defaultType thay đổi
  useEffect(() => {
    if (defaultType) {
      setSampleType(defaultType === 'discussion' ? 'discussion' : 'email');
    }
  }, [defaultType, isOpen]);

  // Reset errors khi chuyển tab
  useEffect(() => {
    setErrorMessage('');
    setSuccessInfo(null);
  }, [activeTab, sampleType]);

  // Tạo nội dung Prompt hiện thời
  const currentPromptText = getWritingSamplesHubPrompt(sampleType, sampleCount, customTopic);

  // Copy Prompt vào Clipboard
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(currentPromptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  // Xử lý chọn file .json
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        setJsonInput(content);
        handlePreviewJson(content);
      }
    };
    reader.readAsText(file);
  };

  // Nạp nhanh bộ đề TOEFL 2026 có sẵn
  const handleLoadPresetSamples = async () => {
    try {
      setIsParsing(true);
      setErrorMessage('');
      const url = sampleType === 'discussion'
        ? '/writing_discussion_samples_toefl_2026.json'
        : '/writing_discussion_samples_1_50.json';
      const res = await fetch(url);
      if (!res.ok) throw new Error('Không tìm thấy file mẫu có sẵn trên hệ thống.');
      const text = await res.text();
      setJsonInput(text);
      handlePreviewJson(text);
    } catch (err) {
      setErrorMessage('Lỗi khi nạp bài mẫu có sẵn: ' + err.message);
    } finally {
      setIsParsing(false);
    }
  };

  // Preview và validate JSON ngay khi người dùng dán hoặc nhập
  const handlePreviewJson = (rawContent) => {
    setErrorMessage('');
    setParsedPreview(null);
    if (!rawContent || !rawContent.trim()) return;

    try {
      setIsParsing(true);
      const data = cleanAndParseJson(rawContent);
      let list = [];
      if (Array.isArray(data)) {
        list = data;
      } else if (data && Array.isArray(data.samples)) {
        list = data.samples;
      } else if (data && Array.isArray(data.data)) {
        list = data.data;
      } else if (data && typeof data === 'object') {
        list = [data];
      }

      const validList = list.filter(item => item && (item.modelEssay || item.model_essay || item.essay));
      if (validList.length === 0) {
        throw new Error('Dữ liệu JSON hợp lệ nhưng không tìm thấy trường "modelEssay" hoặc "essay" của bài viết mẫu.');
      }

      setParsedPreview(validList);
    } catch (err) {
      setErrorMessage(err.message || 'Lỗi cú pháp JSON.');
    } finally {
      setIsParsing(false);
    }
  };

  // Lưu danh sách bài mẫu vào Storage
  const handleCommitImport = () => {
    if (!parsedPreview || parsedPreview.length === 0) {
      setErrorMessage('Chưa có dữ liệu bài mẫu hợp lệ để nhập.');
      return;
    }

    try {
      const result = importBatchWritingSamples(parsedPreview, sampleType);
      setSuccessInfo(`Đã nhập thành công ${result.count} bài mẫu vào Kho Bài Mẫu ${sampleType === 'email' ? 'Email' : 'Discussion'}!`);
      if (onImportSuccess) {
        onImportSuccess(result.samples, sampleType);
      }
      setTimeout(() => {
        onClose();
      }, 1400);
    } catch (err) {
      setErrorMessage(err.message || 'Lỗi khi lưu bài mẫu.');
    }
  };

  // Tự động sinh bài mẫu bằng AI trực tiếp
  const handleGenerateWithAiDirect = async () => {
    setIsAiGenerating(true);
    setErrorMessage('');
    setAiStatus('Đang kết nối tới mô hình AI để nghiên cứu đề thi thật TOEFL 2026...');

    try {
      const promptText = getWritingSamplesHubPrompt(sampleType, sampleCount, customTopic);
      let rawJson = '';

      if (import.meta.env.PROD) {
        setAiStatus('AI đang phân tích và biên soạn các bài mẫu Band 5.5+...');
        const response = await fetch('/api/ai-proxy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: promptText,
            systemInstruction: 'You are an elite ETS TOEFL iBT 2026 test designer. Strictly respond with raw valid JSON array of model essays matching the schema.',
            temperature: 0.3,
            responseType: 'json'
          })
        });
        if (!response.ok) {
          const err = await response.json().catch(() => ({}));
          throw new Error(err?.error || `Lỗi AI Proxy: HTTP ${response.status}`);
        }
        const data = await response.json();
        rawJson = data?.text || '';
      } else {
        const keys = getGeminiApiKeys();
        if (!keys || keys.length === 0) {
          throw new Error('Chưa cấu hình Gemini API Key. Bạn có thể sao chép Prompt ở Tab bên cạnh dán vào ChatGPT / Claude hoặc cấu hình Key trong Cài Đặt.');
        }
        const key = keys[0];
        setAiStatus('Gemini 2.5 Flash đang biên soạn danh sách bài mẫu văn phong đơn giản, dễ nhớ...');
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${DEFAULT_GEMINI_MODEL}:generateContent?key=${key}`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: promptText }] }],
            generationConfig: {
              temperature: 0.3,
              response_mime_type: 'application/json'
            }
          })
        });

        if (!response.ok) {
          const err = await response.json().catch(() => ({}));
          throw new Error(err?.error?.message || `HTTP ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        rawJson = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      }

      setAiStatus('Đang kiểm tra và nhập bài mẫu vào kho...');
      const parsedData = cleanAndParseJson(rawJson);
      const result = importBatchWritingSamples(parsedData, sampleType);
      
      setSuccessInfo(`✨ Thành công! Đã tự động tạo và nhập ${result.count} bài mẫu mới vào kho.`);
      if (onImportSuccess) {
        onImportSuccess(result.samples, sampleType);
      }
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Lỗi AI generate writing samples:', err);
      setErrorMessage(err.message || 'Không thể sinh bài mẫu tự động.');
    } finally {
      setIsAiGenerating(false);
      setAiStatus('');
    }
  };

  if (!isOpen) return null;

  const isEmail = sampleType === 'email';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* HEADER */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-[#153e75] to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Tạo & Nhập Kho Bài Mẫu Writing Bằng AI
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase">
                  ETS TOEFL 2026 • BAND 5.5+
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Sinh một list bài mẫu chuẩn format thật, câu từ đơn giản, dễ hiểu, dễ nhớ và nạp nhanh vào kho.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SUBHEADER: CHỌN DẠNG BÀI (EMAIL HOẶC DISCUSSION) */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">Dạng bài mẫu:</span>
            <div className="flex items-center p-1 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <button
                type="button"
                onClick={() => setSampleType('email')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isEmail
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Task 2: Academic Email</span>
              </button>

              <button
                type="button"
                onClick={() => setSampleType('discussion')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  !isEmail
                    ? 'bg-sky-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Task 3: Academic Discussion</span>
              </button>
            </div>
          </div>

          {/* 3 TABS ĐIỀU HƯỚNG */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('prompt')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'prompt'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Copy className="w-3.5 h-3.5 text-amber-400" />
              <span>1. Copy Prompt Cho AI</span>
            </button>

            <button
              onClick={() => setActiveTab('upload')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Upload className="w-3.5 h-3.5 text-emerald-400" />
              <span>2. Nhập JSON / Tải File</span>
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'ai'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5 text-sky-400" />
              <span>3. AI Tự Sinh Trực Tiếp</span>
            </button>
          </div>
        </div>

        {/* THÔNG BÁO THÀNH CÔNG HOẶC LỖI */}
        {successInfo && (
          <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successInfo}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs font-medium flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="whitespace-pre-line leading-relaxed">{errorMessage}</div>
          </div>
        )}

        {/* NỘI DUNG CHÍNH CÁC TAB */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* ========================================================================= */}
          {/* TAB 1: SAO CHÉP PROMPT MẪU CHO AI (CHATGPT / CLAUDE / GEMINI)              */}
          {/* ========================================================================= */}
          {activeTab === 'prompt' && (
            <div className="space-y-4">
              
              {/* Card 5 Nguyên tắc vàng của Prompt */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-900">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>5 Yêu Cầu Vàng Tích Hợp Sẵn Trong Prompt:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700">
                  <div className="flex items-start gap-1.5">
                    <span className="text-amber-700 font-bold">✓</span>
                    <span><strong>Cấu trúc chuẩn 2026:</strong> Bám sát đề thi thật ETS ({isEmail ? 'Email 7p, 100-130 từ, 3 yêu cầu' : 'Discussion 10p, 120-150 từ, 2 bạn học'}).</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-amber-700 font-bold">✓</span>
                    <span><strong>Khảo sát đề thi thật:</strong> Tự động tra cứu trang chính thống ETS, TOEFL Resources.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-amber-700 font-bold">✓</span>
                    <span><strong>Không paraphrase ví dụ:</strong> Prompt JSON chỉ là schema khung, tạo nội dung mới 100%.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-amber-700 font-bold">✓</span>
                    <span><strong>Band 5.5+ câu từ đơn giản:</strong> Rõ ràng, dễ hiểu, dễ nhớ, KHÔNG phức tạp máy móc.</span>
                  </div>
                </div>
              </div>

              {/* Tùy chỉnh tham số sinh bài */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="sm:col-span-8 space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Chủ đề gợi ý đặc biệt (Tùy chọn):
                  </label>
                  <input
                    type="text"
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    placeholder={
                      isEmail
                        ? "Ví dụ: Xin đổi ca thí nghiệm, Thắc mắc điểm giữa kỳ, Xin thư giới thiệu..."
                        : "Ví dụ: AI trong giáo dục, Làm việc từ xa vs Văn phòng, Năng lượng tái tạo..."
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 text-xs text-slate-800 bg-white"
                  />
                  <p className="text-[11px] text-slate-400">
                    💡 Để trống để AI tự động quét và lựa chọn các chủ đề thực tế từ đề thi thật TOEFL iBT.
                  </p>
                </div>

                <div className="sm:col-span-4 space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Số lượng bài mẫu cần sinh:
                  </label>
                  <select
                    value={sampleCount}
                    onChange={(e) => setSampleCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 text-xs font-bold text-slate-800 bg-white cursor-pointer"
                  >
                    <option value={3}>3 bài mẫu (Đề xuất - Nhanh, đủ chi tiết)</option>
                    <option value={5}>5 bài mẫu (Bộ đề đa dạng)</option>
                    <option value={8}>8 bài mẫu (Ngân hàng chuyên sâu)</option>
                  </select>
                  <p className="text-[11px] text-slate-400">
                    3 bài giúp AI tập trung viết sâu, không bị ngắt token.
                  </p>
                </div>
              </div>

              {/* Khung xem trước Prompt */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <FileCode className="w-4 h-4 text-slate-500" />
                    <span>Nội dung Master Prompt (Sẵn sàng copy):</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {currentPromptText.length} ký tự
                  </span>
                </div>

                <div className="relative">
                  <textarea
                    readOnly
                    value={currentPromptText}
                    rows={12}
                    className="w-full p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed border border-slate-800 focus:outline-hidden select-all resize-y shadow-inner"
                  />

                  {/* Nút Copy nổi bật */}
                  <div className="absolute top-3 right-3">
                    <button
                      type="button"
                      onClick={handleCopyPrompt}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md active:scale-95 ${
                        copiedPrompt
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-black'
                      }`}
                    >
                      {copiedPrompt ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Đã sao chép vào Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Sao chép Prompt Master</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Hướng dẫn các bước */}
              <div className="p-4 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs text-slate-700 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">👉 Bước kế tiếp:</span>
                  <span>Dán prompt vào ChatGPT/Claude/Gemini, copy mã JSON kết quả rồi chuyển sang tab bên cạnh:</span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('upload')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all cursor-pointer active:scale-95 shrink-0"
                >
                  <span>Chuyển sang Tab Nhập JSON</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: NHẬP MÃ JSON & TẢI FILE .JSON                                      */}
          {/* ========================================================================= */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              
              {/* Khu vực Tải file hoặc Dán */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-2xs">
                    <FolderOpen className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">
                      Tải lên file JSON từ máy tính hoặc dán mã trực tiếp
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      Hệ thống tự động phát hiện mảng dạng [ ... ] hoặc &#123; "samples": [ ... ] &#125; và tự sửa lỗi cú pháp.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={handleLoadPresetSamples}
                    disabled={isParsing}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Nạp bộ 200 bài mẫu có sẵn</span>
                  </button>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".json,application/json"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
                  >
                    <Upload className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Chọn file .json</span>
                  </button>
                </div>
              </div>

              {/* Textarea dán JSON */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <label>Dán nội dung JSON vào đây:</label>
                  {jsonInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setJsonInput('');
                        setParsedPreview(null);
                        setErrorMessage('');
                      }}
                      className="text-[11px] text-rose-600 hover:underline cursor-pointer"
                    >
                      Xóa trắng
                    </button>
                  )}
                </div>

                <textarea
                  value={jsonInput}
                  onChange={(e) => {
                    setJsonInput(e.target.value);
                    handlePreviewJson(e.target.value);
                  }}
                  rows={10}
                  placeholder={`[
  {
    "title": "Request for Lab Make-Up Session",
    "topicCategory": "Sciences & Laboratory Work",
    "type": "${sampleType}",
    "targetBand": "Band 5.5+ / 6.0",
    "prompt": { ... },
    "modelEssay": "Dear Professor Higgins, ...",
    "vocabularyHighlights": [ ... ],
    "structureAnalysis": "..."
  }
]`}
                  className="w-full p-4 rounded-2xl bg-white border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 font-mono text-xs text-slate-800 resize-y leading-relaxed outline-hidden"
                />
              </div>

              {/* Xem trước kết quả bóc tách */}
              {parsedPreview && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-black uppercase text-emerald-900">
                        Đã nhận diện thành công {parsedPreview.length} bài mẫu sẵn sàng nhập
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCommitImport}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer active:scale-95"
                    >
                      <Check className="w-4 h-4" />
                      <span>Xác nhận lưu {parsedPreview.length} bài vào kho ngay</span>
                    </button>
                  </div>

                  {/* Danh sách thẻ bài mẫu xem trước */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                    {parsedPreview.map((s, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white border border-emerald-200 shadow-2xs space-y-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold text-emerald-700 uppercase">
                            #{idx + 1} • {s.topicCategory || 'Học thuật'}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-slate-400">
                            ~{s.wordCount || s.modelEssay?.split(/\s+/).length || 0} từ
                          </span>
                        </div>
                        <h6 className="text-xs font-black text-slate-800 truncate">
                          {s.title || `Bài mẫu #${idx + 1}`}
                        </h6>
                        <p className="text-[11px] text-slate-500 italic font-serif line-clamp-2">
                          "{s.modelEssay}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: TRỢ LÝ AI TỰ SINH TRỰC TIẾP (ONE-CLICK AI GENERATOR)               */}
          {/* ========================================================================= */}
          {activeTab === 'ai' && (
            <div className="space-y-4">
              
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0f2e59] text-white space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center shrink-0">
                    <Wand2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black tracking-tight text-white">
                      Sinh Tự Động Danh Sách Bài Mẫu Bằng Gemini AI
                    </h4>
                    <p className="text-xs text-slate-300">
                      Tự động tra cứu format đề thi thật TOEFL iBT 2026, áp dụng tiêu chí văn phong đơn giản, dễ nhớ và nhập thẳng vào kho của bạn.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/10 border border-white/10 space-y-1">
                    <span className="text-[11px] font-bold text-amber-300 block">Dạng bài cần tạo:</span>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      {isEmail ? <Mail className="w-4 h-4 text-orange-400" /> : <MessageSquare className="w-4 h-4 text-sky-400" />}
                      <span>{isEmail ? 'Task 2: Academic Email' : 'Task 3: Academic Discussion'}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/10 border border-white/10 space-y-1">
                    <span className="text-[11px] font-bold text-emerald-300 block">Số lượng bài:</span>
                    <div className="text-xs font-bold text-white">
                      {sampleCount} bài mẫu chuẩn Band 5.5+
                    </div>
                  </div>
                </div>
              </div>

              {/* Tùy chỉnh chủ đề cho AI */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Định hướng chủ đề (Để trống để AI tự quét đề thi thật):
                </label>
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder={
                    isEmail
                      ? "Ví dụ: Tình huống phòng thí nghiệm, đăng ký môn quá tải, xin học bổng..."
                      : "Ví dụ: Tranh luận làm việc từ xa, học đại học trực tuyến, ngân sách công..."
                  }
                  disabled={isAiGenerating}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-200 text-xs text-slate-800 bg-white"
                />
              </div>

              {/* Trạng thái Loading hoặc Nút Bấm */}
              {isAiGenerating ? (
                <div className="p-8 text-center bg-sky-50/70 border border-sky-200 rounded-2xl space-y-3 animate-in fade-in">
                  <div className="w-10 h-10 border-3 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <div className="space-y-1">
                    <h5 className="text-xs font-black text-slate-900">
                      AI Đang Nghiên Cứu Đề Thi & Biên Soạn {sampleCount} Bài Mẫu...
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      {aiStatus || 'Đang bóc tách tiêu chuẩn barem điểm ETS 2026 và câu từ tối giản...'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-slate-500">
                    💡 Mẹo: Quá trình tạo có thể mất 5 - 10 giây để đảm bảo độ chuẩn xác và chất lượng Band 5.5+.
                  </p>

                  <button
                    type="button"
                    onClick={handleGenerateWithAiDirect}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer active:scale-95"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Bắt đầu sinh {sampleCount} bài mẫu ngay</span>
                  </button>
                </div>
              )}

            </div>
          )}

        </div>

        {/* FOOTER */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <Info className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              Bài mẫu nhập vào sẽ tự động lưu trên thiết bị của bạn và đồng bộ lên Supabase nếu có cấu hình.
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-200 text-xs font-bold transition-all cursor-pointer"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
}
