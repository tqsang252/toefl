import React, { useState, useRef } from 'react';
import {
  X,
  Sparkles,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Mail,
  MessageSquare,
  BookOpen
} from 'lucide-react';
import { jsonrepair } from 'jsonrepair';
import { getGeminiApiKeys, DEFAULT_GEMINI_MODEL } from '../../lib/gemini';
import { optimizeFileForOcr } from '../../lib/documentOcr';

const CATEGORIES = [
  'Campus Life & Student Affairs',
  'Sciences & Laboratory Work',
  'Academic Advising & Research',
  'Technology & Digital Media',
  'Economics & Public Policy',
  'Environmental Science',
  'Arts & Humanities',
  'Sociology & Education'
];

export default function AddWritingSampleModal({
  isOpen,
  onClose,
  defaultType = 'email',
  onSampleCreated
}) {
  const [activeTab, setActiveTab] = useState('manual'); // 'manual' | 'ocr'
  const [sampleType, setSampleType] = useState(defaultType); // 'email' | 'discussion'
  
  // Form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [targetBand, setTargetBand] = useState('5.0 / 5.0');
  
  // Prompt fields
  const [scenario, setScenario] = useState('');
  const [emailRequirements, setEmailRequirements] = useState('');
  const [professorName, setProfessorName] = useState('Dr. Katherine Miller');
  const [peerStance1, setPeerStance1] = useState('');
  const [peerStance2, setPeerStance2] = useState('');

  // Essay & Highlights
  const [modelEssay, setModelEssay] = useState('');
  const [rawVocab, setRawVocab] = useState('');
  const [structureNotes, setStructureNotes] = useState('');

  // OCR state
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileSelect = (file) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File ảnh quá lớn (> 10MB). Vui lòng chọn ảnh nhỏ hơn.');
      return;
    }
    setSelectedFile(file);
    setErrorMessage('');
    if (file.type.startsWith('image/')) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Trích xuất tự động qua AI Vision OCR
  const handleOcrExtract = async () => {
    if (!selectedFile) {
      setErrorMessage('Vui lòng chọn file ảnh tài liệu bài mẫu cần trích xuất!');
      return;
    }

    setIsOcrProcessing(true);
    setStatusMessage('Đang nén và tối ưu hóa tài liệu...');
    setErrorMessage('');

    try {
      const optimized = await optimizeFileForOcr(selectedFile);
      setStatusMessage('AI Vision đang nhận diện cấu trúc đề bài và bài viết mẫu...');

      const promptText = `Bạn là chuyên gia khảo thí TOEFL iBT Writing 2026. 
Hãy đọc tài liệu ảnh được tải lên và trích xuất thành 1 bài viết mẫu chuẩn dưới dạng JSON chính xác:
{
  "title": "Tiêu đề ngắn gọn mô tả tình huống",
  "category": "Một trong các nhóm: Campus Life, Technology, Policy, Environmental Science, Education",
  "type": "${sampleType}",
  "scenario": "Đề bài / Tình huống / Câu hỏi của giáo sư",
  "requirements": ["Yêu cầu 1", "Yêu cầu 2"],
  "modelEssay": "Toàn bộ bài viết mẫu tiếng Anh chuẩn",
  "vocabulary": [
    { "term": "cụm từ học thuật tiếng Anh", "meaning": "nghĩa tiếng Việt" }
  ],
  "structureAnalysis": "Phân tích ngắn gọn chiến lược viết đạt điểm cao"
}
Chỉ xuất JSON hợp lệ, không bọc markdown hay lời giải thích.`;

      let raw = '';
      if (import.meta.env.PROD) {
        const response = await fetch('/api/ai-proxy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: promptText,
            imageData: {
              base64: optimized.base64,
              mimeType: optimized.mimeType || 'image/jpeg'
            },
            temperature: 0.2,
            responseType: 'json'
          })
        });
        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData?.error || `Lỗi AI Proxy: HTTP ${response.status}`);
        }
        const data = await response.json();
        raw = data?.text || '';
      } else {
        const apiKeys = getGeminiApiKeys();
        if (!apiKeys || apiKeys.length === 0) {
          throw new Error('Chưa cấu hình Gemini API Key trong .env hoặc Cài Đặt.');
        }
        const key = apiKeys[0];
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${DEFAULT_GEMINI_MODEL}:generateContent?key=${key}`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  { text: promptText },
                  {
                    inline_data: {
                      mime_type: optimized.mimeType || 'image/jpeg',
                      data: optimized.base64
                    }
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.2,
              response_mime_type: 'application/json'
            }
          })
        });
        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData?.error?.message || `HTTP ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      }
      const cleaned = raw.replace(/```json/gi, '').replace(/```/g, '').trim();
      const repaired = jsonrepair(cleaned);
      const parsed = JSON.parse(repaired);

      if (parsed.title) setTitle(parsed.title);
      if (parsed.category) setCategory(parsed.category);
      if (parsed.scenario) setScenario(parsed.scenario);
      if (Array.isArray(parsed.requirements)) setEmailRequirements(parsed.requirements.join('\n'));
      if (parsed.modelEssay) setModelEssay(parsed.modelEssay);
      if (Array.isArray(parsed.vocabulary)) {
        setRawVocab(parsed.vocabulary.map(v => `${v.term}: ${v.meaning}`).join('\n'));
      }
      if (parsed.structureAnalysis) setStructureNotes(parsed.structureAnalysis);

      setActiveTab('manual');
      setStatusMessage('');
      alert('✨ Đã trích xuất thành công nội dung bài mẫu! Bạn có thể xem lại và chỉnh sửa bên dưới.');
    } catch (err) {
      console.error('Lỗi OCR:', err);
      setErrorMessage(err.message || 'Không thể trích xuất tự động bằng AI.');
    } finally {
      setIsOcrProcessing(false);
      setStatusMessage('');
    }
  };

  const handleSave = () => {
    if (!title.trim() || !scenario.trim() || !modelEssay.trim()) {
      setErrorMessage('Vui lòng điền đầy đủ Tiêu đề, Đề bài và Bài viết mẫu!');
      return;
    }

    // Parse collocations list
    const vocabList = rawVocab
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map(line => {
        const parts = line.split(/[:–-]/);
        return {
          term: (parts[0] || '').trim(),
          meaning: (parts[1] || '').trim(),
          contextInEssay: ''
        };
      });

    const wordCount = modelEssay.trim().split(/\s+/).length;

    const newSample = {
      id: `sample_${sampleType}_manual_${Date.now()}`,
      type: sampleType,
      title: title.trim(),
      topicCategory: category,
      sourceType: 'external_upload',
      targetBand: targetBand || '5.0 / 5.0',
      prompt: {
        scenario: scenario.trim(),
        requirements: isEmail ? emailRequirements.split('\n').filter(Boolean) : undefined,
        professorName: !isEmail ? professorName : undefined,
        professorQuestion: !isEmail ? scenario.trim() : undefined,
        studentOpinions: !isEmail && (peerStance1 || peerStance2) ? [
          peerStance1 ? { student: 'Michael', opinion: peerStance1.trim() } : null,
          peerStance2 ? { student: 'Sarah', opinion: peerStance2.trim() } : null
        ].filter(Boolean) : undefined
      },
      modelEssay: modelEssay.trim(),
      wordCount,
      vocabularyHighlights: vocabList,
      structureAnalysis: structureNotes.trim() || 'Cấu trúc bài mẫu học thuật chuẩn mực.',
      created_at: new Date().toISOString()
    };

    onSampleCreated(newSample);
    onClose();
  };

  const isEmail = sampleType === 'email';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-slate-50">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md ${
              isEmail ? 'bg-orange-600' : 'bg-sky-600'
            }`}>
              {isEmail ? <Mail className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <span>Thêm Bài Viết Mẫu Mới</span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {isEmail ? 'Academic Email' : 'Academic Discussion'}
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Lưu trữ các bài viết Band 5.0 từ sách, mạng hoặc tài liệu sưu tầm
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection: Manual Input vs AI Vision OCR */}
        <div className="px-6 pt-4 flex items-center gap-2 border-b border-slate-100 bg-slate-50/50">
          <button
            onClick={() => setActiveTab('manual')}
            className={`px-4 py-2 rounded-t-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'manual'
                ? 'bg-white text-slate-900 border-t-2 border-indigo-600 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            ✍️ Nhập thông tin bài mẫu
          </button>

          <button
            onClick={() => setActiveTab('ocr')}
            className={`px-4 py-2 rounded-t-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'ocr'
                ? 'bg-white text-indigo-700 border-t-2 border-indigo-600 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Trích xuất từ ảnh bài mẫu (AI Vision)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {activeTab === 'ocr' ? (
            /* TAB OCR BÓC TÁCH TỰ ĐỘNG */
            <div className="space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-2xl p-6 text-center cursor-pointer bg-slate-50/50 transition-all"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={(e) => handleFileSelect(e.target.files?.[0])}
                  className="hidden"
                />

                {selectedFile ? (
                  <div className="space-y-2">
                    {previewUrl && (
                      <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto rounded-xl object-contain shadow-xs" />
                    )}
                    <p className="text-xs font-bold text-slate-800">
                      Đã chọn: <span className="text-indigo-600">{selectedFile.name}</span>
                    </p>
                    <p className="text-[11px] text-slate-500">Bấm để đổi ảnh khác</p>
                  </div>
                ) : (
                  <div className="space-y-2 py-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-xs">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-slate-800">
                      Tải lên ảnh chụp bài mẫu hoặc đề bài (PNG, JPG, WebP)
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Hệ thống AI sẽ tự động đọc chữ, phân tách đề bài, bài viết mẫu và cụm từ học thuật
                    </p>
                  </div>
                )}
              </div>

              {selectedFile && (
                <button
                  type="button"
                  onClick={handleOcrExtract}
                  disabled={isOcrProcessing}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isOcrProcessing ? statusMessage || 'Đang bóc tách bằng AI...' : 'Bắt đầu trích xuất bằng AI Vision'}</span>
                </button>
              )}
            </div>
          ) : (
            /* TAB NHẬP LIỆU THỦ CÔNG */
            <div className="space-y-4">
              {/* Loại bài & Chủ đề */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Dạng bài Writing:
                  </label>
                  <select
                    value={sampleType}
                    onChange={(e) => setSampleType(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="email">Task 2: Academic Email (7 phút)</option>
                    <option value="discussion">Task 3: Academic Discussion (10 phút)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Chủ đề / Chuyên mục:
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tiêu đề & Band điểm */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Tiêu đề bài mẫu:
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="vd: Request for Lab Equipment Replacement..."
                    className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Điểm số / Band:
                  </label>
                  <input
                    type="text"
                    value={targetBand}
                    onChange={(e) => setTargetBand(e.target.value)}
                    placeholder="5.0 / 5.0"
                    className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Đề bài (Prompt / Scenario) */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Đề bài / Tình huống (Scenario hoặc Câu hỏi Giáo sư):
                </label>
                <textarea
                  value={scenario}
                  onChange={(e) => setScenario(e.target.value)}
                  placeholder={
                    isEmail
                      ? "Nhập tình huống đề bài email: You need to write an email to your professor regarding..."
                      : "Nhập câu hỏi thảo luận của giáo sư: In your post, explain your perspective on whether..."
                  }
                  rows={3}
                  className="w-full px-3 py-2 text-xs font-serif border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                />
              </div>

              {/* Yêu cầu bắt buộc (Nếu là Email) */}
              {isEmail && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Các yêu cầu bắt buộc (Mỗi dòng 1 yêu cầu):
                  </label>
                  <textarea
                    value={emailRequirements}
                    onChange={(e) => setEmailRequirements(e.target.value)}
                    placeholder="Explain the technical problem that occurred&#10;Request a two-day extension&#10;Ask for permission to re-access the lab"
                    rows={2}
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                  />
                </div>
              )}

              {/* Ý kiến bạn học (Nếu là Discussion) */}
              {!isEmail && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Ý kiến Sinh viên 1 (Tùy chọn):
                    </label>
                    <textarea
                      value={peerStance1}
                      onChange={(e) => setPeerStance1(e.target.value)}
                      placeholder="Ý kiến sinh viên 1..."
                      rows={2}
                      className="w-full px-3 py-2 text-xs font-serif border border-slate-300 rounded-xl bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Ý kiến Sinh viên 2 (Tùy chọn):
                    </label>
                    <textarea
                      value={peerStance2}
                      onChange={(e) => setPeerStance2(e.target.value)}
                      placeholder="Ý kiến sinh viên 2..."
                      rows={2}
                      className="w-full px-3 py-2 text-xs font-serif border border-slate-300 rounded-xl bg-white"
                    />
                  </div>
                </div>
              )}

              {/* BÀI VIẾT MẪU (MODEL ESSAY) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-black text-slate-800 uppercase">
                    Bài viết mẫu chuẩn tiếng Anh:
                  </label>
                  <span className="text-[11px] text-slate-500 font-bold">
                    Số từ: {modelEssay.trim() ? modelEssay.trim().split(/\s+/).length : 0} từ
                  </span>
                </div>
                <textarea
                  value={modelEssay}
                  onChange={(e) => setModelEssay(e.target.value)}
                  placeholder="Dán toàn bộ bài viết mẫu tiếng Anh chuẩn Band 5.0 vào đây..."
                  rows={6}
                  className="w-full p-3.5 text-xs sm:text-sm font-serif border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                />
              </div>

              {/* TỪ VỰNG & COLLOCATIONS */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Cụm từ học thuật hay (Mỗi dòng: Cụm từ: Nghĩa tiếng Việt):
                </label>
                <textarea
                  value={rawVocab}
                  onChange={(e) => setRawVocab(e.target.value)}
                  placeholder="unforeseen technical difficulty: sự cố kỹ thuật ngoài dự kiến&#10;extremely grateful if you could grant: vô cùng biết ơn nếu có thể chấp thuận"
                  rows={3}
                  className="w-full p-2.5 text-xs font-mono border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                />
              </div>

              {/* PHÂN TÍCH CẤU TRÚC */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Ghi chú phân tích cấu trúc & chiến lược viết (Tùy chọn):
                </label>
                <textarea
                  value={structureNotes}
                  onChange={(e) => setStructureNotes(e.target.value)}
                  placeholder="Mở đầu nêu lý do trang trọng, thân bài phát triển luận điểm..."
                  rows={2}
                  className="w-full p-2.5 text-xs font-sans border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/80">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all cursor-pointer"
          >
            Hủy
          </button>

          {activeTab === 'manual' && (
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              Lưu Vào Kho Bài Mẫu
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
