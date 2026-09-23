import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Volume2, 
  BookOpen, 
  Sparkles, 
  Copy, 
  Check, 
  CheckCircle2, 
  Trash2, 
  Clipboard, 
  Languages, 
  Bookmark, 
  BookmarkCheck,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { lookupWordInDatabase, importVocabularyBatch } from '../../lib/supabase';
import { lookupWordWithAi, translateTextWithAi, isAiConfigured } from '../../lib/gemini';

export default function DictionaryWidget({ isOpen, onClose, onOpenSettings }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState(() => {
    try {
      const saved = sessionStorage.getItem('toefl_dictionary_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [copiedId, setCopiedId] = useState(null);
  const [savedWordMap, setSavedWordMap] = useState({});
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Lưu lịch sử tra cứu vào sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('toefl_dictionary_history', JSON.stringify(history));
    } catch (e) {
      // ignore
    }
  }, [history]);

  // Đưa màn hình ngay lập tức về dưới cùng để hiện tin nhắn mới nhất, không cuộn chạy từ trên xuống
  const scrollToBottomInstant = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Khi mở khung chat, hiển thị mặc định ngay ở dưới cùng trước khi render giao diện
  useLayoutEffect(() => {
    if (isOpen) {
      scrollToBottomInstant();
    }
  }, [isOpen]);

  // Đảm bảo luôn ở dưới cùng khi có tin nhắn mới hoặc vừa mở mà không bị hiệu ứng cuộn chạy
  useEffect(() => {
    if (isOpen) {
      scrollToBottomInstant();
      const timer = setTimeout(scrollToBottomInstant, 40);
      return () => clearTimeout(timer);
    }
  }, [isOpen, history, isLoading]);

  // Tự động focus vào ô nhập khi mở
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Phát âm từ tiếng Anh bằng SpeechSynthesis API của trình duyệt
  const handlePronounce = (wordText) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && wordText) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(wordText);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Sao chép nội dung vào Clipboard
  const handleCopy = (id, textToCopy) => {
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Lưu từ dịch bởi AI vào kho từ vựng
  const handleSaveToVocabulary = async (wordData) => {
    if (!wordData || !wordData.word) return;
    const key = wordData.word.trim().toLowerCase();
    if (savedWordMap[key]) return;

    try {
      await importVocabularyBatch([
        {
          word: wordData.word,
          phonetic: wordData.phonetic || '',
          partOfSpeech: wordData.partOfSpeech || '',
          meaningVi: wordData.meaningVi || '',
          meaningEn: wordData.meaningEn || '',
          example: wordData.example || '',
          exampleTranslation: wordData.exampleTranslation || '',
          category: 'Tra cứu Từ điển AI'
        }
      ], 'Tra cứu Từ điển AI');

      setSavedWordMap((prev) => ({ ...prev, [key]: true }));
    } catch (err) {
      console.error('Lỗi khi lưu từ vựng:', err);
    }
  };

  // Xử lý truy vấn tra từ hoặc dịch văn bản
  const executeLookupOrTranslate = async (rawQuery) => {
    const query = (rawQuery || '').trim();
    if (!query || isLoading) return;

    setInputText('');
    const queryId = `query_${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

    // Kiểm tra là từ đơn hay cụm từ / đoạn văn
    const words = query.split(/\s+/).filter(Boolean);
    const isSingleWord = words.length === 1 && query.length <= 45;

    setIsLoading(true);

    try {
      if (isSingleWord) {
        // BƯỚC 1: Tra cứu trong Database (Supabase + LocalStorage + 1000+ từ có sẵn)
        const dbResult = await lookupWordInDatabase(query);

        if (dbResult && dbResult.found) {
          // Tìm thấy trong Database
          setHistory((prev) => [
            ...prev,
            {
              id: queryId,
              query,
              timestamp,
              type: 'word',
              source: 'database',
              data: dbResult
            }
          ]);
          setIsLoading(false);
          return;
        }

        // BƯỚC 2: Chưa có trong Database -> Tự động chuyển qua AI dịch
        const aiResult = await lookupWordWithAi(query);
        setHistory((prev) => [
          ...prev,
          {
            id: queryId,
            query,
            timestamp,
            type: 'word',
            source: 'ai',
            data: aiResult
          }
        ]);
      } else {
        // BƯỚC 3: Dán cụm từ hoặc đoạn văn bản -> Tự động dùng AI dịch
        const aiTranslation = await translateTextWithAi(query);
        setHistory((prev) => [
          ...prev,
          {
            id: queryId,
            query,
            timestamp,
            type: 'text',
            source: 'ai',
            data: aiTranslation
          }
        ]);
      }
    } catch (err) {
      console.error('Lỗi tra cứu / dịch thuật:', err);
      const isConfigError = !isAiConfigured() || err.message?.toLowerCase().includes('api key');

      setHistory((prev) => [
        ...prev,
        {
          id: queryId,
          query,
          timestamp,
          type: isSingleWord ? 'word' : 'text',
          error: isConfigError 
            ? 'Chưa cấu hình API Key để thực hiện tính năng dịch AI. Hãy bổ sung API Key trong phần Cài đặt.'
            : (err.message || 'Đã xảy ra lỗi khi kết nối hệ thống AI. Vui lòng thử lại.')
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Dán từ bộ nhớ tạm (Clipboard) vào ô nhập (chờ người dùng nhấn Enter hoặc bấm Tra cứu)
  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && text.trim()) {
        setInputText(text.trim());
        setTimeout(() => {
          textareaRef.current?.focus();
        }, 50);
      }
    } catch (err) {
      textareaRef.current?.focus();
    }
  };

  // Xử lý gõ phím Enter (Enter gửi, Shift+Enter xuống dòng)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      executeLookupOrTranslate(inputText);
    }
  };

  // Xóa toàn bộ lịch sử tra cứu
  const handleClearHistory = () => {
    if (window.confirm('Bạn có chắc muốn xóa toàn bộ lịch sử tra cứu này không?')) {
      setHistory([]);
      try {
        sessionStorage.removeItem('toefl_dictionary_history');
      } catch (e) {
        // ignore
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[440px] max-w-[460px] h-[580px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden z-[60] animate-in fade-in slide-in-from-bottom-5 duration-200">
      
      {/* 1. Header Cửa sổ Từ điển */}
      <div className="px-5 py-3.5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between border-b border-slate-700 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#c6764d] flex items-center justify-center text-white shadow-xs">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              Từ điển & Dịch thuật
            </h3>
            <p className="text-[10px] text-slate-300 font-medium">
              Tra cứu & Dịch thuật thông minh
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {history.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-700/60 rounded-lg transition-colors cursor-pointer"
              title="Xóa lịch sử tra cứu"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700/60 rounded-lg transition-colors cursor-pointer"
            title="Đóng cửa sổ"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Danh sách tin nhắn / Kết quả tra cứu (Chat Feed) */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#faf9f6]/80 text-xs">
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100/80 border border-amber-200 flex items-center justify-center text-[#c6764d] shadow-xs">
              <Languages className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm mb-1">Cửa sổ Tra Từ & Dịch Thuật</h4>
              <p className="text-slate-500 text-[11px] leading-relaxed max-w-xs">
                Dán bất kỳ từ vựng, cụm từ hoặc đoạn văn tiếng Anh nào vào đây để tra cứu tức thì:
              </p>
            </div>

            <div className="w-full bg-white rounded-2xl border border-slate-200 p-3.5 text-left space-y-2 shadow-xs text-[11px] text-slate-600">
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                <span><strong>Từ đơn:</strong> Tự động tra nghĩa trong Database (hơn 1.000 từ học thuật).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                <span><strong>Từ mới:</strong> Tự động tra nghĩa nếu từ chưa có trong Database.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                <span><strong>Cụm từ / Đoạn văn:</strong> Tự động dịch chuẩn xác văn phong học thuật TOEFL.</span>
              </div>
            </div>

            {/* Gợi ý tra cứu nhanh */}
            <div className="flex flex-wrap gap-1.5 justify-center pt-1">
              <button
                onClick={() => executeLookupOrTranslate('Advocate')}
                className="px-2.5 py-1 bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-lg text-slate-700 font-semibold text-[11px] transition-all cursor-pointer shadow-2xs"
              >
                🔍 Advocate
              </button>
              <button
                onClick={() => executeLookupOrTranslate('Substantiate')}
                className="px-2.5 py-1 bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-lg text-slate-700 font-semibold text-[11px] transition-all cursor-pointer shadow-2xs"
              >
                🔍 Substantiate
              </button>
              <button
                onClick={() => executeLookupOrTranslate('Although experimental findings support the hypothesis, further empirical validation remains necessary.')}
                className="px-2.5 py-1 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg text-slate-700 font-semibold text-[11px] transition-all cursor-pointer shadow-2xs"
              >
                📝 Dịch thử 1 câu mẫu
              </button>
            </div>
          </div>
        ) : (
          history.map((item) => (
            <div key={item.id} className="space-y-2">
              {/* Bong bóng truy vấn của người dùng */}
              <div className="flex justify-end">
                <div className="max-w-[85%] bg-slate-800 text-white rounded-2xl rounded-br-xs px-3.5 py-2 shadow-xs">
                  <div className="text-[12px] font-medium break-words leading-relaxed whitespace-pre-wrap">
                    {item.query}
                  </div>
                  <div className="text-[9px] text-slate-400 text-right mt-0.5">
                    {item.timestamp}
                  </div>
                </div>
              </div>

              {/* Bong bóng kết quả từ hệ thống */}
              <div className="flex justify-start">
                <div className="max-w-[92%] w-full bg-white rounded-2xl rounded-bl-xs p-3.5 border border-slate-200 shadow-sm space-y-2.5">
                  {item.error ? (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 space-y-2">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span className="font-semibold text-[11px]">{item.error}</span>
                      </div>
                      {onOpenSettings && item.error.includes('API Key') && (
                        <button
                          onClick={onOpenSettings}
                          className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-[10px] transition-all cursor-pointer shadow-2xs"
                        >
                          Mở Cài Đặt API Key
                        </button>
                      )}
                    </div>
                  ) : item.type === 'word' ? (
                    /* KẾT QUẢ TRA CỨU TỪ ĐƠN */
                    <div className="space-y-2">
                      {/* Header từ vựng + Nguồn */}
                      <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-base font-extrabold text-slate-900 tracking-tight">
                              {item.data.word}
                            </span>
                            <button
                              onClick={() => handlePronounce(item.data.word)}
                              className="p-1 text-slate-400 hover:text-[#c6764d] hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                              title="Nghe phát âm chuẩn"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                            {item.data.phonetic && (
                              <span className="font-mono text-slate-600">{item.data.phonetic}</span>
                            )}
                            {item.data.partOfSpeech && (
                              <span className="italic bg-slate-100 px-1.5 py-0.5 rounded text-[10px] text-slate-600 font-medium">
                                {item.data.partOfSpeech}
                              </span>
                            )}
                          </div>
                        </div>

                      </div>

                      {/* Khối hiển thị nghĩa tiếng Việt */}
                      <div className="relative p-3 bg-amber-50/80 border border-amber-200/90 rounded-xl">
                        <div className="text-xs font-bold text-slate-900 leading-snug pr-6">
                          {item.data.meaningVi || 'Đang cập nhật'}
                        </div>
                        <button
                          onClick={() => handleCopy(item.id, item.data.meaningVi)}
                          className="absolute top-2.5 right-2.5 p-1 text-amber-700/60 hover:text-amber-900 hover:bg-amber-100/50 rounded-md transition-colors cursor-pointer"
                          title="Sao chép nghĩa"
                        >
                          {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Ví dụ học thuật (nếu có) */}
                      {item.data.example && (
                        <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1 text-[11px]">
                          <p className="text-slate-700 italic font-medium leading-relaxed">
                            "{item.data.example}"
                          </p>
                          {item.data.exampleTranslation && (
                            <p className="text-slate-500 text-[10px]">
                              → {item.data.exampleTranslation}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Nút lưu vào sổ từ vựng nếu là từ AI dịch */}
                      {item.source === 'ai' && (
                        <div className="pt-1 flex justify-end">
                          <button
                            onClick={() => handleSaveToVocabulary(item.data)}
                            disabled={Boolean(savedWordMap[item.data.word?.toLowerCase()])}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                              savedWordMap[item.data.word?.toLowerCase()]
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 active:scale-95'
                            }`}
                          >
                            {savedWordMap[item.data.word?.toLowerCase()] ? (
                              <>
                                <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" /> Đã lưu vào sổ từ
                              </>
                            ) : (
                              <>
                                <Bookmark className="w-3.5 h-3.5" /> Lưu vào sổ từ vựng
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* KẾT QUẢ DỊCH CỤM TỪ / ĐOẠN VĂN */
                    <div className="space-y-2">
                      {/* Nội dung bản dịch tiếng Việt */}
                      <div className="relative p-3 bg-blue-50/60 border border-blue-100 rounded-xl">
                        <div className="text-xs font-semibold text-slate-900 leading-relaxed whitespace-pre-wrap pr-6">
                          {item.data.translatedText}
                        </div>
                        <button
                          onClick={() => handleCopy(item.id, item.data.translatedText)}
                          className="absolute top-2.5 right-2.5 p-1 text-slate-400 hover:text-blue-700 hover:bg-blue-100/50 rounded-md transition-colors cursor-pointer"
                          title="Sao chép"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Ghi chú ngữ cảnh học thuật nếu có */}
                      {item.data.note && (
                        <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-[10px] text-slate-600">
                          <span className="font-bold text-slate-700">💡 Ghi chú: </span>
                          <span>{item.data.note}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}

        {/* Trạng thái AI đang xử lý: 3 dấu chấm chạy sóng đúng yêu cầu của bạn (không chữ PROCESSING) */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-bl-xs px-4 py-3 border border-slate-200 shadow-sm flex items-center gap-1.5 w-fit">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-bounce"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Ô nhập văn bản & Thanh công cụ (Input Area) */}
      <div className="p-3 bg-white border-t border-slate-200 space-y-2">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            rows={2}
            placeholder="Dán từ vựng, cụm từ hoặc đoạn văn tiếng Anh vào đây..."
            className="w-full text-xs p-2.5 pr-9 bg-slate-50 hover:bg-slate-50/80 focus:bg-white rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 outline-hidden transition-all resize-none font-sans text-slate-800 placeholder:text-slate-400"
          />

          {inputText.trim() && (
            <button
              onClick={() => setInputText('')}
              className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
              title="Xóa nội dung"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePasteClipboard}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors cursor-pointer active:scale-95"
              title="Dán nhanh nội dung đang copy"
            >
              <Clipboard className="w-3 h-3 text-slate-500" /> Dán nhanh
            </button>

            {inputText.trim() && (
              <span className="text-[10px] text-slate-400 font-medium">
                {inputText.trim().split(/\s+/).filter(Boolean).length === 1 ? '1 từ (Tra từ điển)' : `${inputText.trim().split(/\s+/).filter(Boolean).length} từ (Dịch AI)`}
              </span>
            )}
          </div>

          <button
            onClick={() => executeLookupOrTranslate(inputText)}
            disabled={!inputText.trim() || isLoading}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-bold text-white transition-all cursor-pointer shadow-xs ${
              !inputText.trim() || isLoading
                ? 'bg-slate-300 opacity-60 cursor-not-allowed'
                : 'bg-[#c6764d] hover:bg-[#b5653c] active:scale-95'
            }`}
          >
            <span>Tra cứu</span>
            <Send className="w-3 h-3" />
          </button>
        </div>
      </div>

    </div>
  );
}
