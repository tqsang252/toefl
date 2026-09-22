import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, Upload, AlertCircle, CheckCircle2, Layers } from 'lucide-react';
import { jsonrepair } from 'jsonrepair';
import { importVocabularyBatch } from '../../lib/supabase';

const SAMPLE_VOCABULARY_PROMPT = `Hãy đóng vai là chuyên gia biên soạn từ vựng học thuật TOEFL iBT 2026. Tạo cho tôi danh sách từ vựng theo chủ đề: [TÊN CHỦ ĐỀ Ở ĐÂY, VÍ DỤ: Environment / Education / Economy] gồm 10 từ vựng cốt lõi.

YÊU CẦU BẮT BUỘC:
Mỗi từ phải có đầy đủ các trường thông tin song ngữ Anh - Việt theo đúng định dạng JSON sau:
[
  {
    "word": "significant",
    "phonetic": "/sɪɡ'nɪfɪkənt/",
    "part_of_speech": "Adjective",
    "meaning_en": "large or important enough to be noticed",
    "meaning_vi": "đáng kể, quan trọng",
    "paraphrases": ["considerable", "substantial", "notable", "important"],
    "collocations": ["significant increase", "significant impact", "significant difference"],
    "example": "The study found a significant increase in productivity.",
    "example_translation": "Nghiên cứu cho thấy năng suất tăng đáng kể.",
    "sentence_paraphrase": "The study found a substantial rise in productivity.",
    "word_family": ["significance (n.)", "significant (adj.)", "significantly (adv.)"],
    "memory_tip": "significant = big/important enough to notice"
  }
]

QUY TẮC:
1. Chỉ trả về JSON thuần túy, không kèm văn bản giải thích.
2. Tuyệt đối không dùng dấu ngoặc kép đôi "" bên trong các chuỗi văn bản (dùng ngoặc đơn ').`;

export default function ImportVocabularyModal({ isOpen, onClose, onImportSuccess, categories = [] }) {
  const [targetCategory, setTargetCategory] = useState(categories[0] || 'Academic Life & Higher Education');
  const [customCategory, setCustomCategory] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [jsonText, setJsonText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [resultMessage, setResultMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  if (!isOpen) return null;

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(SAMPLE_VOCABULARY_PROMPT);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleImport = async () => {
    if (!jsonText.trim()) {
      setErrorMessage('Vui lòng dán nội dung JSON danh sách từ vựng vào ô bên dưới.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setResultMessage(null);

    const activeCategory = isCustomCategory && customCategory.trim() 
      ? customCategory.trim() 
      : targetCategory;

    try {
      let parsedData;
      // Làm sạch markdown nếu có
      let cleaned = jsonText.trim();
      if (cleaned.startsWith('```json')) cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      else if (cleaned.startsWith('```')) cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');

      try {
        parsedData = JSON.parse(cleaned);
      } catch (e1) {
        // Tự động sửa lỗi cú pháp JSON bằng jsonrepair
        try {
          const repaired = jsonrepair(cleaned);
          parsedData = JSON.parse(repaired);
        } catch (e2) {
          throw new Error('Dữ liệu JSON không hợp lệ. Vui lòng kiểm tra lại dấu ngoặc hoặc dấu phẩy.');
        }
      }

      // Hỗ trợ cả trường hợp mảng trực tiếp hoặc object có chứa words/vocabulary/items
      let wordsArray = [];
      if (Array.isArray(parsedData)) {
        wordsArray = parsedData;
      } else if (parsedData.words && Array.isArray(parsedData.words)) {
        wordsArray = parsedData.words;
      } else if (parsedData.vocabulary && Array.isArray(parsedData.vocabulary)) {
        wordsArray = parsedData.vocabulary;
      } else if (parsedData.items && Array.isArray(parsedData.items)) {
        wordsArray = parsedData.items;
      } else {
        wordsArray = [parsedData];
      }

      if (wordsArray.length === 0) {
        throw new Error('Không tìm thấy từ vựng nào trong dữ liệu JSON.');
      }

      // Tiến hành import và check trùng từ tự động
      const res = await importVocabularyBatch(wordsArray, activeCategory);

      if (res.success) {
        setResultMessage({
          title: 'Import hoàn tất!',
          desc: `Đã thêm ${res.insertedCount} từ mới vào chủ đề "${activeCategory}". Đã tự động bỏ qua ${res.skippedCount} từ đã có sẵn trong cơ sở dữ liệu.`,
          destination: res.destination
        });
        setJsonText('');
        if (onImportSuccess) onImportSuccess();
      } else {
        throw new Error(res.message || 'Lỗi không xác định khi lưu vào database.');
      }

    } catch (err) {
      setErrorMessage(err.message || 'Đã có lỗi xảy ra trong quá trình xử lý.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Import Từ Vựng Flashcards (TOEFL 2026)
              </h2>
              <p className="text-xs text-slate-500">
                Tự động kiểm tra trùng từ (nếu có rồi sẽ tự động bỏ qua).
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thông báo kết quả / lỗi */}
        {resultMessage && (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl mb-5 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-emerald-900">{resultMessage.title}</h4>
              <p className="text-xs text-emerald-700 mt-0.5 leading-relaxed">{resultMessage.desc}</p>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-2">
                Nơi lưu trữ: {resultMessage.destination}
              </span>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl mb-5 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs text-rose-800 leading-relaxed font-semibold">
              {errorMessage}
            </div>
          </div>
        )}

        {/* 1. Chọn hoặc tạo Chủ đề (Category) */}
        <div className="mb-5">
          <label className="text-xs font-bold text-slate-700 block mb-2 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-purple-600" />
            <span>Chủ đề từ vựng (Category / Topic):</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {!isCustomCategory ? (
              <select
                value={targetCategory}
                onChange={(e) => {
                  if (e.target.value === '__custom__') {
                    setIsCustomCategory(true);
                  } else {
                    setTargetCategory(e.target.value);
                  }
                }}
                className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
                <option value="__custom__">+ Tạo chủ đề mới...</option>
              </select>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Nhập tên chủ đề mới (ví dụ: Climate Change)"
                  className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-purple-300 bg-purple-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button
                  onClick={() => setIsCustomCategory(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 px-2 py-1 cursor-pointer shrink-0"
                >
                  Hủy
                </button>
              </div>
            )}

            <button
              onClick={handleCopyPrompt}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl text-xs font-bold border border-purple-200 transition-all cursor-pointer shadow-2xs"
            >
              {copiedPrompt ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedPrompt ? 'Đã copy Prompt AI!' : 'Copy Prompt AI chuẩn 7 mục'}</span>
            </button>
          </div>
        </div>

        {/* 2. Ô nhập JSON từ vựng */}
        <div className="mb-5">
          <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center justify-between">
            <span>Nội dung JSON từ vựng:</span>
            <span className="text-[11px] font-normal text-slate-400">
              Hỗ trợ đầy đủ 7 trường thông tin (Nghĩa, Paraphrases, Collocations, Ví dụ...)
            </span>
          </label>
          <textarea
            rows={10}
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder={`[\n  {\n    "word": "significant",\n    "phonetic": "/sɪɡ'nɪfɪkənt/",\n    "part_of_speech": "Adjective",\n    "meaning": "đáng kể, quan trọng",\n    "paraphrases": ["considerable", "substantial", "notable", "important"],\n    "collocations": ["significant increase", "significant impact"],\n    "example": "The study found a significant increase in productivity.",\n    "example_translation": "Nghiên cứu cho thấy năng suất tăng đáng kể.",\n    "sentence_paraphrase": "The study found a substantial rise in productivity.",\n    "word_family": ["significance (n.)", "significant (adj.)", "significantly (adv.)"],\n    "memory_tip": "significant = big/important enough to notice"\n  }\n]`}
            className="w-full text-xs font-mono p-3.5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50 focus:bg-white resize-y"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            Đóng
          </button>

          <button
            disabled={isSubmitting || !jsonText.trim()}
            onClick={handleImport}
            className="px-6 py-2.5 bg-purple-700 hover:bg-purple-800 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Đang xử lý & kiểm tra...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Tiến hành Import Từ Vựng</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
