import React, { useState, useEffect } from 'react';
import { X, Sparkles, Upload, Copy, Check, FileCode, AlertCircle, Info, Wand2, Database, PenTool, CheckCircle2 } from 'lucide-react';
import { jsonrepair } from 'jsonrepair';
import { importBatchTests } from '../lib/supabase';
import { generateExamWithGemini, isGeminiConfigured, isOpenRouterConfigured, formatExamTitle } from '../lib/gemini';
import {
  SAMPLE_READING_PROMPT,
  SAMPLE_LISTENING_PROMPT,
  SAMPLE_WRITING_PROMPT,
  SAMPLE_WRITING_SENTENCE_PROMPT,
  SAMPLE_WRITING_EMAIL_PROMPT,
  SAMPLE_WRITING_DISCUSSION_PROMPT,
  SAMPLE_SPEAKING_PROMPT,
  SAMPLE_FULL_TEST_PROMPT,
  getExamPrompt
} from '../lib/examPrompts';


// Hàm làm sạch và tự động sửa lỗi cú pháp JSON thông minh
function cleanAndParseJson(rawInput) {
  if (!rawInput || !rawInput.trim()) {
    throw new Error('Dữ liệu JSON rỗng. Vui lòng dán mã JSON vào ô nhập.');
  }

  let text = rawInput.trim();

  // 1. Gỡ bỏ khối markdown ```json ... ``` (hỗ trợ cả trường hợp AI bị ngắt không kịp đóng ```)
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

  // 3. Thử parse trực tiếp tiêu chuẩn
  try {
    return { data: JSON.parse(text), repaired: false, truncated: false };
  } catch (err1) {
    // 4. Tự động sửa lỗi với jsonrepair (xử lý: unescaped newlines, trailing commas, unescaped quotes, thiếu ngoặc đóng do AI ngắt dòng)
    try {
      const repairedText = jsonrepair(text);
      const parsed = JSON.parse(repairedText);
      const isTruncated = !text.endsWith('}') && !text.endsWith(']');
      return { data: parsed, repaired: true, truncated: isTruncated };
    } catch (err2) {
      // 5. Thử tiền xử lý: bỏ dấu phẩy thừa trước khi repair
      try {
        const preprocessed = text.replace(/,\s*([\]}])/g, '$1');
        const repairedText2 = jsonrepair(preprocessed);
        const parsed2 = JSON.parse(repairedText2);
        return { data: parsed2, repaired: true, truncated: true };
      } catch (err3) {
        const isUnterminated = err1.message.includes('Unterminated string') || err1.message.includes('Unexpected end of JSON');
        let hint = '';
        if (isUnterminated) {
          hint = '\n\n💡 NGUYÊN NHÂN LỖI:\nĐoạn JSON bạn copy bị AI (ChatGPT/Claude/Gemini) cắt ngang giữa chừng do quá dài, chạm giới hạn ký tự (token limit) của AI.\n\n👉 CÁCH KHẮC PHỤC HIỆU QUẢ:\n1. Vào lại ChatGPT/Claude, gõ: "viết tiếp từ đoạn bị cắt" hoặc "continue" rồi copy nối tiếp vào.\n2. HOẶC TỐT NHẤT: Tạo đề theo từng Kỹ năng riêng (Tab Reading 2M, Listening 2M, Writing 3T, Speaking) rồi import từng đề vào. Khi chia theo từng kỹ năng, AI sẽ không bao giờ bị cắt ngắn!';
        } else {
          hint = '\n\n💡 GỢI Ý:\nHãy kiểm tra xem bên trong các câu thoại, đoạn văn có bị lồng dấu ngoặc kép "" không (hãy đổi thành dấu ngoặc đơn \'\').';
        }
        throw new Error(`${err1.message}.${hint}`);
      }
    }
  }
}

export default function ImportModal({ isOpen, onClose, onImportSuccess, defaultSkill = 'full' }) {
  const sanitizeSkill = (s) => (typeof s === 'string' && s ? s.toLowerCase() : 'full');
  const [jsonInput, setJsonInput] = useState('');
  const [selectedPromptType, setSelectedPromptType] = useState(() => sanitizeSkill(defaultSkill));
  const [selectedWritingSubtype, setSelectedWritingSubtype] = useState('full'); // 'full' | 'sentence' | 'email' | 'discussion'
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiProgressStatus, setAiProgressStatus] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastImportedSkill, setLastImportedSkill] = useState(null);

  const activePromptType = typeof selectedPromptType === 'string' ? selectedPromptType.toLowerCase() : 'full';

  const handleCloseSuccess = () => {
    const targetSkill = lastImportedSkill || effectiveSkillType || activePromptType;
    setShowSuccessModal(false);
    if (onImportSuccess) {
      onImportSuccess(targetSkill);
    }
    onClose();
  };

  const handleModalClose = () => {
    if (lastImportedSkill && onImportSuccess) {
      onImportSuccess(lastImportedSkill);
    }
    onClose();
  };

  useEffect(() => {
    if (typeof defaultSkill === 'string' && defaultSkill) {
      setSelectedPromptType(defaultSkill.toLowerCase());
    }
  }, [defaultSkill, isOpen]);

  if (!isOpen) return null;

  let currentPromptText = SAMPLE_READING_PROMPT;
  let effectiveSkillType = activePromptType;

  if (activePromptType === 'full') {
    currentPromptText = SAMPLE_FULL_TEST_PROMPT;
  } else if (activePromptType === 'listening') {
    currentPromptText = SAMPLE_LISTENING_PROMPT;
  } else if (activePromptType === 'speaking') {
    currentPromptText = SAMPLE_SPEAKING_PROMPT;
  } else if (activePromptType === 'writing') {
    if (selectedWritingSubtype === 'sentence') {
      currentPromptText = SAMPLE_WRITING_SENTENCE_PROMPT;
      effectiveSkillType = 'writing_sentence';
    } else if (selectedWritingSubtype === 'email') {
      currentPromptText = SAMPLE_WRITING_EMAIL_PROMPT;
      effectiveSkillType = 'writing_email';
    } else if (selectedWritingSubtype === 'discussion') {
      currentPromptText = SAMPLE_WRITING_DISCUSSION_PROMPT;
      effectiveSkillType = 'writing_discussion';
    } else {
      currentPromptText = SAMPLE_WRITING_PROMPT;
      effectiveSkillType = 'writing';
    }
  }

  const getSkillTitle = () => {
    switch (activePromptType) {
      case 'reading': return 'Reading (2 Module)';
      case 'listening': return 'Listening (2 Module)';
      case 'writing': 
        if (selectedWritingSubtype === 'sentence') return 'Writing: Hoàn Thiện Câu (7 Phút)';
        if (selectedWritingSubtype === 'email') return 'Writing: Viết Email (7 Phút)';
        if (selectedWritingSubtype === 'discussion') return 'Writing: Academic Discussion (10 Phút)';
        return 'Writing Full (3 Bài - 23 Phút)';
      case 'speaking': return 'Speaking (2 Bài)';
      default: return 'Full Test (4 Kỹ Năng)';
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(currentPromptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setJsonInput(event.target.result);
      setErrorMsg('');
    };
    reader.readAsText(file);
  };

  // 1-Click: Tự động sinh đề và đẩy thẳng lên Database
  const handleGenerateWithAI = async () => {
    if (!isGeminiConfigured() && !isOpenRouterConfigured()) {
      setErrorMsg('Chưa cấu hình API Key! Vui lòng cấu hình API Key trong file .env hoặc vào mục Cài Đặt (chân trang) để kích hoạt tính năng sinh đề tự động.');
      return;
    }

    try {
      setIsAiGenerating(true);
      setErrorMsg('');
      setAiProgressStatus('Đang kết nối chuẩn bị sinh đề thi...');

      const result = await generateExamWithGemini({
        skillType: effectiveSkillType,
        promptText: currentPromptText,
        customTopic: customTopic.trim(),
        onProgress: (status) => setAiProgressStatus(status)
      });

      setJsonInput('');
      setLastImportedSkill(effectiveSkillType);
      setShowSuccessModal(true);
    } catch (err) {
      console.error('Lỗi sinh đề bằng AI:', err);
      setErrorMsg(`Lỗi khi sinh đề: ${err.message}`);
    } finally {
      setIsAiGenerating(false);
      setAiProgressStatus('');
    }
  };

  const handleProcessImport = async () => {
    if (!jsonInput.trim()) {
      setErrorMsg('Vui lòng dán dữ liệu JSON hoặc tải file lên!');
      return;
    }

    try {
      setIsImporting(true);
      setErrorMsg('');
      const parseResult = cleanAndParseJson(jsonInput);
      let parsed = parseResult.data !== undefined ? parseResult.data : parseResult;

      // Hỗ trợ tự động giải nén cấu trúc JSON bị lồng trong các key wrapper
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        if (Array.isArray(parsed.tests)) parsed = parsed.tests;
        else if (parsed.test && typeof parsed.test === 'object') parsed = [parsed.test];
        else if (Array.isArray(parsed.data)) parsed = parsed.data;
        else if (parsed.practice_test && typeof parsed.practice_test === 'object') parsed = [parsed.practice_test];
        else if (parsed.exam && typeof parsed.exam === 'object') parsed = [parsed.exam];
      }

      const rawArray = Array.isArray(parsed) ? parsed : [parsed];

      // Validate cấu trúc tối thiểu
      for (const t of rawArray) {
        if (!t || typeof t !== 'object') {
          throw new Error('Định dạng đề thi không hợp lệ (cần là Object hoặc mảng [Object])');
        }
        if (!t.title || !t.skill) {
          throw new Error('Đề thi thiếu trường title hoặc skill (full, reading, listening, writing, speaking)');
        }
      }

      // Đảm bảo lấy timestamp trực tiếp từ máy tính của người dùng
      const clientNow = Date.now();
      const clientIso = new Date(clientNow).toISOString();
      const testsArray = rawArray.map((t, idx) => {
        const itemCreatedAt = t.created_at || clientIso;
        const itemCreatedAtMs = t.created_at_ms || (clientNow + idx);
        const itemSkill = (t.skill || selectedPromptType || 'reading').toLowerCase();
        const itemTaskType = t.task_type || effectiveSkillType;

        let itemTitle = t.title;
        // Nếu title chung chung hoặc là placeholder mẫu của prompt, chuẩn hóa thành: [Kỹ năng] Full Test - Ngày tạo - Giờ và phút tạo
        if (!itemTitle || itemTitle.toLowerCase().includes('full test 02') || itemTitle.toLowerCase().includes('practice exam') || itemTitle.toLowerCase().includes('practice test') || itemTitle.toLowerCase().includes('sample')) {
          itemTitle = formatExamTitle(itemSkill, itemTaskType, itemCreatedAtMs);
        }

        return {
          ...t,
          id: t.id || `test_import_${clientNow}_${idx + 1}`,
          title: itemTitle,
          skill: itemSkill,
          task_type: itemTaskType,
          created_at: itemCreatedAt,
          created_at_ms: itemCreatedAtMs,
          content: {
            ...(t.content || {}),
            created_at: itemCreatedAt,
            created_at_ms: itemCreatedAtMs
          }
        };
      });

      await importBatchTests(testsArray);
      setLastImportedSkill(testsArray[0]?.skill || selectedPromptType);
      setShowSuccessModal(true);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message.startsWith('Lỗi JSON:') ? err.message : `Lỗi JSON: ${err.message}`);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header Modal */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-teal-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <span>Tạo & Import Đề Thi AI (TOEFL 2026)</span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
                  Auto AI
                </span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Tự động biên soạn bộ đề chuẩn ETS 2026 hoặc nhập mã JSON vào hệ thống
              </p>
            </div>
          </div>

          <button
            onClick={handleModalClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nội dung Modal */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* Thanh chọn kỹ năng */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
              <span>Chọn dạng bài thi:</span>
            </span>

            <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-bold">
              {[
                { id: 'full', label: 'Full Mock (4 KN)' },
                { id: 'reading', label: 'Reading (2M)' },
                { id: 'listening', label: 'Listening (2M)' },
                { id: 'writing', label: 'Writing (3T)' },
                { id: 'speaking', label: 'Speaking (2T)' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedPromptType(tab.id)}
                  disabled={isAiGenerating}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    selectedPromptType === tab.id 
                      ? 'bg-indigo-600 text-white shadow-2xs font-extrabold' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sub-tabs riêng cho kỹ năng Writing để luyện tập từng phần */}
          {selectedPromptType === 'writing' && (
            <div className="flex items-center gap-1.5 p-1.5 bg-rose-50/80 border border-rose-200 rounded-2xl overflow-x-auto text-xs font-bold animate-in fade-in duration-150">
              <span className="text-rose-900 px-2 flex items-center gap-1.5 shrink-0">
                <PenTool className="w-3.5 h-3.5 text-rose-600" />
                <span className="font-extrabold uppercase text-[11px] tracking-wide">Phần luyện tập:</span>
              </span>
              {[
                { id: 'full', label: 'Full Test (3 Bài - 23p)' },
                { id: 'sentence', label: '1. Ghép câu (10 câu - 7p)' },
                { id: 'email', label: '2. Viết Email (7p)' },
                { id: 'discussion', label: '3. Academic Discussion (10p)' }
              ].map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setSelectedWritingSubtype(sub.id)}
                  disabled={isAiGenerating}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap text-xs ${
                    selectedWritingSubtype === sub.id
                      ? 'bg-rose-600 text-white shadow-xs font-black ring-2 ring-rose-300'
                      : 'text-rose-800 hover:bg-rose-100/70 font-semibold'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          )}

          {/* KHỐI 1-CLICK TỰ ĐỘNG TẠO BỘ ĐỀ */}
          <div className="bg-gradient-to-br from-[#0b1728] via-[#102a4e] to-[#0c1e38] rounded-2xl p-5 text-white shadow-lg border border-indigo-500/25 relative overflow-hidden">
            {/* Hiệu ứng ánh sáng nền tinh tế */}
            <div className="absolute -top-12 -right-12 w-44 h-44 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-950 flex items-center justify-center font-black shadow-md shrink-0 ring-2 ring-amber-400/20">
                    <Sparkles className="w-5 h-5 text-amber-950" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black tracking-tight text-white uppercase flex items-center gap-2">
                      Tự Động Tạo Đề {getSkillTitle()}
                    </h4>
                    <p className="text-[12px] text-slate-300 mt-0.5 leading-snug">
                      Hệ thống tự động biên soạn bộ đề chuẩn cấu trúc ETS TOEFL iBT và lưu trực tiếp vào cơ sở dữ liệu.
                    </p>
                  </div>
                </div>

                {/* Nút bấm Tạo Đề Bằng AI */}
                <button
                  onClick={handleGenerateWithAI}
                  disabled={isAiGenerating || isImporting}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-102 active:scale-98 disabled:opacity-50 shrink-0 border border-teal-200"
                >
                  <Sparkles className={`w-3.5 h-3.5 text-slate-900 ${isAiGenerating ? 'animate-spin' : ''}`} />
                  <span>
                    {isAiGenerating 
                      ? 'Đang tạo bài thi thử & Lưu...' 
                      : `Tạo bài thi thử ${activePromptType === 'full' ? 'Full Test' : (activePromptType.charAt(0).toUpperCase() + activePromptType.slice(1).toLowerCase())}`}
                  </span>
                </button>
              </div>

              {/* Ô nhập chủ đề tùy chọn (Optional) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2 border-t border-indigo-600/30">
                <label className="text-[11px] font-bold text-indigo-200 shrink-0">
                  Chủ đề tùy chọn (không bắt buộc):
                </label>
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  disabled={isAiGenerating}
                  placeholder="VD: Khoa học môi trường, Tâm lý học, Đời sống sinh viên... (để trống: ngẫu nhiên)"
                  className="flex-1 px-3 py-1.5 rounded-lg bg-indigo-950/60 border border-indigo-500/50 text-white placeholder-indigo-300/50 text-xs focus:outline-hidden focus:border-teal-400 transition-colors"
                />
              </div>

              {/* Thanh tiến trình thời gian thực khi AI đang sinh đề */}
              {isAiGenerating && (
                <div className="p-3 rounded-xl bg-indigo-950/90 border border-teal-400/50 flex items-center gap-3 animate-pulse">
                  <div className="w-4 h-4 border-2 border-teal-400 border-t-transparent rounded-full animate-spin shrink-0" />
                  <div className="text-xs text-teal-300 font-semibold flex-1">
                    {aiProgressStatus || 'Hệ thống đang soạn bộ đề theo format ETS 2026...'}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Box Mẫu Prompt (Tùy chọn thủ công) */}
          <div className="bg-indigo-50/60 border border-indigo-200 rounded-2xl p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <FileCode className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-xs font-bold text-indigo-900">
                  Tùy chọn thủ công: Copy Prompt để dán vào công cụ AI
                </span>
              </div>

              <button
                onClick={handleCopyPrompt}
                className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1 cursor-pointer transition-all active:scale-95"
              >
                {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPrompt ? "Đã sao chép!" : "Copy Prompt"}</span>
              </button>
            </div>

            <p className="text-[11px] text-indigo-950/80 leading-relaxed font-mono line-clamp-2 bg-white/70 p-2.5 rounded-lg border border-indigo-100">
              {currentPromptText}
            </p>
          </div>

          {/* Dán JSON */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Dán mã JSON đề thi:
              </label>

              <label className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 cursor-pointer flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" />
                <span>Hoặc chọn file .json</span>
                <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            <textarea
              value={jsonInput}
              onChange={(e) => {
                setJsonInput(e.target.value);
                setErrorMsg('');
              }}
              placeholder='[ { "title": "...", "skill": "reading", ... } ]'
              rows={6}
              className="w-full p-3 font-mono text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:border-indigo-600 focus:bg-white focus:outline-hidden leading-relaxed"
            />
          </div>

          {errorMsg && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs whitespace-pre-line leading-relaxed shadow-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <div className="flex-1 font-sans">{errorMsg}</div>
            </div>
          )}

        </div>

        {/* Footer Modal */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50">
          <div className="text-[11px] text-slate-500 font-medium hidden sm:block">
            {isAiGenerating ? 'Đang thực thi lệnh sinh đề qua AI...' : 'Chọn sinh bằng AI hoặc bấm nút bên phải để import JSON thủ công'}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleModalClose}
              disabled={isAiGenerating}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer disabled:opacity-50"
            >
              Đóng
            </button>

            <button
              disabled={isImporting || isAiGenerating}
              onClick={handleProcessImport}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer active:scale-95 transition-all flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>{isImporting ? 'Đang lưu vào Database...' : 'Import JSON Thủ Công'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Modal Popup Tạo Thành Công (Đặt chính giữa trang web, bỏ hoàn toàn alert trình duyệt) */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[70] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-7 shadow-2xl border border-slate-100 text-center space-y-5 animate-in zoom-in-95 duration-200">
            
            {/* Biểu tượng thành công đẹp mắt */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center mx-auto shadow-lg shadow-teal-500/25">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>

            {/* Tiêu đề ngắn gọn theo đúng yêu cầu người dùng: chỉ cần ghi Tạo thành công */}
            <div className="space-y-1.5">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Tạo thành công
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Đề thi mới đã sẵn sàng trong danh sách bài luyện tập của bạn.
              </p>
            </div>

            {/* Nút OK */}
            <div className="pt-1">
              <button
                type="button"
                autoFocus
                onClick={handleCloseSuccess}
                className="w-full py-3 px-6 bg-gradient-to-r from-teal-700 via-[#153e75] to-indigo-800 hover:opacity-95 text-white font-black text-sm rounded-2xl shadow-md cursor-pointer transition-all active:scale-95"
              >
                OK
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
