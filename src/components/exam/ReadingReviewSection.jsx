import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Languages, 
  Layers, 
  Bookmark, 
  BookmarkCheck, 
  ChevronRight,
  HelpCircle,
  FileText,
  Search
} from 'lucide-react';
import { normalizeCompleteWordsTask, importVocabularyBatch } from '../../lib/supabase';
import { translateTextWithAi, lookupWordWithAi, enrichBatchVocabularyWords } from '../../lib/gemini';
import { VOCABULARY_DECKS } from '../../data/vocabularyData';
import QuickVocabPopover, { useTextSelectionLookup } from '../dictionary/QuickVocabPopover';

// Chỉ mục tra cứu nhanh từ vựng có sẵn
function getLocalVocabDetails(rawWord) {
  if (!rawWord) return null;
  const clean = String(rawWord).trim().toLowerCase().replace(/^[^a-z]+|[^a-z]+$/gi, '');
  if (!clean) return null;

  // 1. Tra trong kho từ vựng VOCABULARY_DECKS (1,000+ từ chuẩn ETS)
  for (const deck of VOCABULARY_DECKS) {
    const found = deck.words?.find(w => w.word?.toLowerCase() === clean);
    if (found) {
      const fam = Array.isArray(found.wordFamily) ? found.wordFamily.join(', ') : (found.wordFamily || '');
      return {
        word: clean,
        phonetic: found.phonetic || '',
        partOfSpeech: found.partOfSpeech || '',
        meaningVi: found.meaningVi || found.meaning || '',
        wordFamily: fam,
        explanation: found.exampleTranslation || found.example || ''
      };
    }
  }

  // 2. Tra trong localStorage cache đã lưu từ trước
  try {
    const cache = JSON.parse(localStorage.getItem('toefl_word_dictionary_cache') || '{}');
    if (cache[clean]) return cache[clean];
  } catch {}

  return null;
}

// Helper tìm câu dẫn chứng chính xác trong bài đọc cho câu hỏi trắc nghiệm
function findEvidenceSentence(passage, qItem, qDef) {
  if (!passage) return null;
  const prompt = (qDef?.prompt || qDef?.question || qItem?.prompt || '').toLowerCase();
  const explanation = (qDef?.explanation || qItem?.explanation || '');
  const options = qDef?.options || qItem?.options || {};
  const correctAnsKey = String(qDef?.correct_answer || qDef?.answer || qItem?.correct_answer || '').trim();
  const correctOptText = (options[correctAnsKey] || options[correctAnsKey.toUpperCase()] || '').toLowerCase();

  // Tách bài đọc thành các câu riêng biệt (dựa vào dấu ., ?, !, hoặc ngắt dòng)
  const rawSentences = passage.match(/[^.!?\n]+[.!?]+(\s+|$)|[^.!?\n]+$/g) || [passage];
  const sentences = rawSentences.map(s => s.trim()).filter(Boolean);
  if (sentences.length === 0) return null;
  if (sentences.length === 1) return { sentence: sentences[0], index: 0 };

  // 1. Kiểm tra trích dẫn trực tiếp trong explanation (dấu nháy đơn hoặc nháy kép)
  const quotes = explanation.match(/['"“]([^'"”]{5,})['"”]/g);
  if (quotes) {
    for (const rawQuote of quotes) {
      const cleanQuote = rawQuote.replace(/['"“”]/g, '').trim().toLowerCase();
      const matchIdx = sentences.findIndex(s => s.toLowerCase().includes(cleanQuote));
      if (matchIdx !== -1) {
        return { sentence: sentences[matchIdx], index: matchIdx, quote: cleanQuote };
      }
    }
  }

  // 2. Trích xuất từ khóa quan trọng loại trừ stop words
  const stopWords = new Set([
    'what', 'when', 'where', 'which', 'whose', 'whom', 'that', 'this', 'these', 'those',
    'with', 'from', 'about', 'according', 'notice', 'passage', 'author', 'article',
    'could', 'should', 'would', 'might', 'must', 'does', 'have', 'been', 'their',
    'there', 'than', 'them', 'then', 'into', 'most', 'only', 'such', 'some', 'were', 'will',
    'stated', 'indicated', 'suggests', 'implies', 'following', 'true', 'except', 'purpose'
  ]);

  const extractTokens = (str) => {
    return str
      .replace(/[^a-zA-Z0-9\s-]/g, ' ')
      .split(/\s+/)
      .map(w => w.toLowerCase())
      .filter(w => w.length >= 4 && !stopWords.has(w));
  };

  const promptTokens = extractTokens(prompt);
  const correctTokens = extractTokens(correctOptText);
  const allTargetTokens = [...promptTokens, ...correctTokens];

  // Bonus cho câu đầu tiên nếu hỏi về mục đích chính hoặc ý chính
  const isMainIdeaQ = prompt.includes('primary purpose') || prompt.includes('main purpose') || prompt.includes('mainly about') || prompt.includes('best title') || prompt.includes('main topic');

  let bestScore = -1;
  let bestIdx = 0;

  sentences.forEach((sent, sIdx) => {
    const sLower = sent.toLowerCase();
    let score = 0;

    // Bonus cho câu mở đầu nếu là câu hỏi ý chính
    if (isMainIdeaQ && sIdx === 0) score += 12;

    // Đếm số từ khóa xuất hiện
    for (const tok of allTargetTokens) {
      if (sLower.includes(tok)) score += 2;
    }

    // Đếm cụm 2 từ (bigram) từ đáp án đúng
    for (let i = 0; i < correctTokens.length - 1; i++) {
      const bigram = `${correctTokens[i]} ${correctTokens[i+1]}`;
      if (sLower.includes(bigram)) score += 8;
    }

    // Đếm cụm 2 từ từ câu hỏi
    for (let i = 0; i < promptTokens.length - 1; i++) {
      const bigram = `${promptTokens[i]} ${promptTokens[i+1]}`;
      if (sLower.includes(bigram)) score += 6;
    }

    if (score > bestScore) {
      bestScore = score;
      bestIdx = sIdx;
    }
  });

  return { sentence: sentences[bestIdx], index: bestIdx };
}

// Trích xuất các từ vựng học thuật quan trọng trong bài đọc (Passage)
function extractPassageAcademicWords(passageText, questions = []) {
  if (!passageText) return [];
  const candidates = new Set();

  // 1. Lấy từ vựng được hỏi trực tiếp trong câu hỏi nếu có
  questions.forEach(q => {
    const match = String(q.prompt || q.question || '').match(/['"“]([a-zA-Z]{3,20})['"”]/);
    if (match && match[1]) candidates.add(match[1].toLowerCase());
  });

  // 2. Danh sách stopwords tiếng Anh phổ biến cần loại trừ
  const commonWords = new Set([
    'about', 'above', 'after', 'again', 'against', 'allow', 'almost', 'along', 'already', 'also', 'always', 'among',
    'another', 'around', 'because', 'before', 'begin', 'between', 'both', 'center', 'close', 'could', 'during',
    'each', 'every', 'first', 'final', 'floor', 'follow', 'found', 'from', 'great', 'have', 'having', 'host',
    'house', 'into', 'just', 'know', 'large', 'later', 'learn', 'leave', 'light', 'little', 'make', 'meet',
    'meeting', 'might', 'must', 'need', 'never', 'next', 'night', 'notice', 'number', 'often', 'online', 'other',
    'people', 'place', 'point', 'provide', 'provided', 'right', 'room', 'same', 'school', 'second', 'session',
    'should', 'since', 'small', 'start', 'starting', 'state', 'still', 'study', 'student', 'students', 'their',
    'there', 'these', 'think', 'third', 'those', 'three', 'through', 'time', 'under', 'until', 'used', 'using',
    'very', 'want', 'water', 'week', 'well', 'were', 'what', 'when', 'where', 'which', 'while', 'white',
    'will', 'with', 'without', 'word', 'work', 'workshop', 'world', 'would', 'year', 'years', 'attend', 'within'
  ]);

  // Tách các từ trong bài đọc
  const words = passageText
    .replace(/[^a-zA-Z\s-]/g, ' ')
    .split(/\s+/)
    .map(w => w.toLowerCase().trim())
    .filter(w => w.length >= 6 && !commonWords.has(w));

  const priorityWords = [];
  const otherAcademicWords = [];

  const uniqueWords = Array.from(new Set(words));
  for (const w of uniqueWords) {
    if (candidates.has(w)) continue;
    const local = getLocalVocabDetails(w);
    if (local) {
      priorityWords.push(w);
    } else {
      otherAcademicWords.push(w);
    }
  }

  // Sắp xếp các từ học thuật theo độ dài
  otherAcademicWords.sort((a, b) => b.length - a.length);

  const combined = [
    ...Array.from(candidates),
    ...priorityWords,
    ...otherAcademicWords
  ];

  return Array.from(new Set(combined)).slice(0, 6);
}

export default function ReadingReviewSection({ moduleData, test }) {
  // 1. Thu thập danh sách tasks trong module này
  const tasks = React.useMemo(() => {
    if (moduleData.tasks && Array.isArray(moduleData.tasks) && moduleData.tasks.length > 0) {
      return moduleData.tasks.map(t => {
        // Nếu task thiếu content thì tìm trong test
        if (!t.task_content || Object.keys(t.task_content).length === 0) {
          const normStages = test?.stages || test?.content?.stages || [];
          const matchedStage = normStages.find(s => s.id === moduleData.module_id);
          const matchedTask = matchedStage?.tasks?.find(st => st.id === t.task_id);
          if (matchedTask) {
            return {
              ...t,
              task_content: matchedTask.content || {},
              task_title: matchedTask.title || t.task_title,
              task_type: matchedTask.task_type || t.task_type
            };
          }
        }
        return t;
      });
    }

    // Fallback: Tìm từ test.stages nếu moduleData.tasks chưa có
    const normStages = test?.stages || test?.content?.stages || [];
    const matchedStage = normStages.find(s => s.id === moduleData.module_id) || normStages[0];
    if (matchedStage?.tasks) {
      return matchedStage.tasks.map(st => ({
        task_id: st.id,
        task_title: st.title,
        task_type: st.task_type,
        task_content: st.content || {},
        items: moduleData.items || []
      }));
    }

    return [];
  }, [moduleData, test]);

  // Tab đang chọn trong module (Task 1, Task 2, ...)
  const [activeTaskIdx, setActiveTaskIdx] = useState(0);
  const currentTask = tasks[activeTaskIdx] || tasks[0];

  // Câu hỏi / từ đang được active highlight
  const [activeItemIdx, setActiveItemIdx] = useState(0);

  // Hook tra cứu và lưu từ vựng 1-chạm khi bôi đen văn bản
  const { selectionData, clearSelection, handleTextMouseUp } = useTextSelectionLookup();

  // Trạng thái dịch thuật (Task ID -> Chuỗi tiếng Việt)
  const [translations, setTranslations] = useState({});
  const [isTranslating, setIsTranslating] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  // Trạng thái Text-to-Speech (TTS)
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Từ vựng đã lưu vào Sổ từ vựng
  const [savedWords, setSavedWords] = useState(new Set());

  // Bản đồ từ điển chi tiết phân tách theo từng Task ID: { [taskId]: { [word]: details } }
  const [taskVocabMap, setTaskVocabMap] = useState({});

  // Lấy từ điển của riêng task hiện tại
  const currentTaskVocab = taskVocabMap[currentTask?.task_id] || {};

  // Refs để cuộn tới card bên phải và câu dẫn chứng bên trái
  const cardRefs = useRef({});
  const evidenceRefs = useRef({});
  const blankRefs = useRef({});

  // Tự động cuộn tới câu dẫn chứng khi activeItemIdx thay đổi
  useEffect(() => {
    if (evidenceRefs.current[activeItemIdx]) {
      evidenceRefs.current[activeItemIdx].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeItemIdx]);

  // Tự động làm giàu dữ liệu từ điển cho bài đọc hiện tại theo từng Task độc lập
  useEffect(() => {
    setActiveItemIdx(0);
    setShowTranslation(false);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    if (!currentTask) return;
    const taskId = currentTask.task_id;

    // Nếu task này đã có từ điển rồi thì không cần quét lại
    if (taskVocabMap[taskId] && Object.keys(taskVocabMap[taskId]).length > 0) return;

    // 1. Trích xuất danh sách từ cần tra từ điển theo đúng loại task
    let wordsToLookup = [];
    if (currentTask.task_type === 'complete_words') {
      const norm = normalizeCompleteWordsTask({ ...currentTask, content: currentTask.task_content }, taskId);
      const blanks = norm.content?.blanks || currentTask.task_content?.blanks || [];
      blanks.forEach(b => {
        const fullWord = b.full || `${b.prefix || ''}${b.missing || ''}`;
        if (fullWord) wordsToLookup.push(fullWord);
      });
    } else {
      // Đối với Passage: trích xuất các từ vựng học thuật cốt lõi trong bài đọc
      const pText = currentTask.task_content?.passage || "";
      const pQuestions = currentTask.task_content?.questions || [];
      wordsToLookup = extractPassageAcademicWords(pText, pQuestions);
    }

    if (wordsToLookup.length === 0) return;

    // 2. Điền ngay lập tức các từ có sẵn trong từ điển nội bộ
    const immediateMap = {};
    const missingWords = [];

    wordsToLookup.forEach(w => {
      const clean = w.toLowerCase().trim();
      const localData = getLocalVocabDetails(clean);
      if (localData && localData.phonetic && localData.meaningVi) {
        immediateMap[clean] = localData;
      } else {
        missingWords.push(clean);
        if (localData) immediateMap[clean] = localData;
      }
    });

    setTaskVocabMap(prev => ({
      ...prev,
      [taskId]: { ...(prev[taskId] || {}), ...immediateMap }
    }));

    // 3. Nếu còn từ chưa có hoặc thiếu thông tin, tự động gọi AI tra cứu song song trong nền
    if (missingWords.length > 0) {
      enrichBatchVocabularyWords(missingWords).then(enriched => {
        if (enriched && typeof enriched === 'object' && Object.keys(enriched).length > 0) {
          setTaskVocabMap(prev => ({
            ...prev,
            [taskId]: { ...(prev[taskId] || {}), ...enriched }
          }));
        }
      }).catch(err => {
        console.warn('Lỗi tự động tra từ vựng:', err);
      });
    }
  }, [activeTaskIdx, currentTask]);

  // Hàm đọc phát âm tiếng Anh chuẩn
  const handleToggleSpeak = (textToSpeak) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Trình duyệt của bạn không hỗ trợ tính năng đọc âm thanh (Speech Synthesis).');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = textToSpeak.replace(/\[\s*✓\s*|\s*✗\s*|\]/g, ' ').replace(/_/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-US';
    utterance.rate = 0.92;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Hàm dịch đoạn văn sang tiếng Việt bằng AI
  const handleToggleTranslate = async (sourceText, taskId) => {
    if (showTranslation) {
      setShowTranslation(false);
      return;
    }

    if (translations[taskId]) {
      setShowTranslation(true);
      return;
    }

    try {
      setIsTranslating(true);
      const res = await translateTextWithAi(sourceText);
      if (res && res.translatedText) {
        setTranslations(prev => ({ ...prev, [taskId]: res.translatedText }));
        setShowTranslation(true);
      }
    } catch (err) {
      alert('Không thể tải bản dịch tự động: ' + (err.message || 'Lỗi mạng'));
    } finally {
      setIsTranslating(false);
    }
  };

  // Hàm lưu nhanh từ vựng vào Sổ từ vựng cá nhân
  const handleSaveToVocab = async (word, meaning = '', category = 'Reading Review') => {
    if (!word) return;
    try {
      await importVocabularyBatch([{
        word: word.trim(),
        meaning: meaning.trim() || 'Từ vựng trong bài đọc TOEFL',
        category: category,
        part_of_speech: 'Academic Word'
      }], category);
      setSavedWords(prev => new Set([...prev, word.toLowerCase()]));
    } catch (e) {
      console.warn('Lỗi lưu từ vựng:', e);
    }
  };

  // Cuộn tới câu hỏi khi bấm vào chip trong đoạn văn (Complete the Words)
  const handleSelectBlank = (idx) => {
    setActiveItemIdx(idx);
    if (cardRefs.current[idx]) {
      cardRefs.current[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleSelectCardBlank = (idx) => {
    setActiveItemIdx(idx);
    if (blankRefs.current[idx]) {
      blankRefs.current[idx].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Chọn câu hỏi trong bài đọc hiểu (Passage) - đồng bộ 2 chiều
  const handleSelectQuestion = (idx) => {
    setActiveItemIdx(idx);
    if (cardRefs.current[idx]) {
      cardRefs.current[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    if (evidenceRefs.current[idx]) {
      evidenceRefs.current[idx].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (!currentTask) {
    return (
      <div className="p-6 text-center text-slate-500 text-xs">
        Không có dữ liệu bài đọc cho module này.
      </div>
    );
  }

  const isCompleteWords = currentTask.task_type === 'complete_words';
  const taskContent = currentTask.task_content || {};

  // ===================================================================
  // 1. XỬ LÝ DỮ LIỆU COMPLETE THE WORDS
  // ===================================================================
  let cwTokens = [];
  let cwBlanks = [];
  let cwItems = currentTask.items || [];

  if (isCompleteWords) {
    const norm = normalizeCompleteWordsTask({ ...currentTask, content: taskContent }, currentTask.task_id);
    const paragraph = norm.content?.paragraph || taskContent.paragraph || "";
    cwBlanks = norm.content?.blanks || taskContent.blanks || [];

    const bracketRegex = /([A-Za-z]+)\[([A-Za-z]+)\]/g;
    let lastIndex = 0;
    let match;
    let bIdx = 0;

    while ((match = bracketRegex.exec(paragraph)) !== null) {
      if (match.index > lastIndex) {
        cwTokens.push({
          type: 'text',
          content: paragraph.substring(lastIndex, match.index)
        });
      }

      const prefix = match[1];
      const missing = match[2];
      const fullWord = `${prefix}${missing}`;
      const matchedItem = cwItems[bIdx] || {};

      cwTokens.push({
        type: 'blank',
        index: bIdx,
        prefix,
        missing,
        full: fullWord,
        userChoice: matchedItem.user_choice || '(Chưa điền)',
        correctAnswer: matchedItem.correct_answer || fullWord,
        isCorrect: matchedItem.is_correct ?? false,
        explanation: matchedItem.explanation || `Chữ cái còn thiếu là "${missing}" để tạo thành từ "${fullWord}".`
      });

      bIdx++;
      lastIndex = bracketRegex.lastIndex;
    }

    if (lastIndex < paragraph.length) {
      cwTokens.push({
        type: 'text',
        content: paragraph.substring(lastIndex)
      });
    }
  }

  // ===================================================================
  // 2. XỬ LÝ DỮ LIỆU PASSAGE (DAILY LIFE & ACADEMIC PASSAGE)
  // ===================================================================
  const passageText = taskContent.passage || "";
  const passageDocType = taskContent.document_type || (currentTask.task_type === 'daily_life' ? 'Read in Daily Life' : 'Academic Reading Passage');
  const passageQuestions = taskContent.questions || [];
  const passageItems = currentTask.items || [];
  const questionsList = passageQuestions.length > 0 ? passageQuestions : passageItems;

  // Tính toán trước bản đồ dẫn chứng cho từng câu hỏi trong bài đọc
  const evidenceMap = React.useMemo(() => {
    const map = {};
    questionsList.forEach((q, idx) => {
      const qItem = passageItems[idx] || {};
      const qDef = passageQuestions[idx] || q;
      map[idx] = findEvidenceSentence(passageText, qItem, qDef);
    });
    return map;
  }, [passageText, questionsList, passageItems, passageQuestions]);

  const activeEvidence = evidenceMap[activeItemIdx] || null;
  const activeQuestionItem = passageItems[activeItemIdx] || {};
  const activeQuestionDef = passageQuestions[activeItemIdx] || {};

  return (
    <div className="space-y-5">
      
      {/* THANH ĐIỀU HƯỚNG TỪNG TASK TRONG READING MODULE */}
      {tasks.length > 1 && (
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200 overflow-x-auto">
          {tasks.map((t, idx) => {
            const isActive = idx === activeTaskIdx;
            const taskLabel = t.task_title || (t.task_type === 'complete_words' ? `Task ${idx + 1}: Complete Words` : `Task ${idx + 1}: Passage`);
            
            return (
              <button
                key={idx}
                onClick={() => setActiveTaskIdx(idx)}
                className={`py-2 px-3.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  isActive 
                    ? 'bg-white text-teal-900 shadow-xs border border-slate-200' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <BookOpen className={`w-3.5 h-3.5 ${isActive ? 'text-teal-700' : 'text-slate-400'}`} />
                <span>{taskLabel}</span>
                {t.total_questions > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    isActive ? 'bg-teal-50 text-teal-800' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {t.score_raw} / {t.total_questions}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* =============================================================== */}
      {/* TRƯỜNG HỢP 1: GIAO DIỆN XEM ĐÁP ÁN COMPLETE THE WORDS             */}
      {/* =============================================================== */}
      {isCompleteWords ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* CỘT TRÁI (7/12): ĐOẠN VĂN GỐC & TỪ VỰNG TRONG NGỮ CẢNH */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xs lg:sticky lg:top-24 max-h-[calc(100vh-140px)] flex flex-col overflow-hidden">
            
            {/* Header Cột trái - CỐ ĐỊNH Ở TRÊN CÙNG */}
            <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 shrink-0 bg-white z-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                      Đoạn văn gốc & Từ vựng trong ngữ cảnh
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Bấm vào từng từ để đối chiếu • Bôi đen để tra & lưu từ vựng 1-chạm
                    </p>
                  </div>
                </div>

                {/* Action Toolbar */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleToggleTranslate(taskContent.paragraph || '', currentTask.task_id)}
                    disabled={isTranslating}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      showTranslation 
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-2xs' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                    title="Dịch toàn bộ đoạn văn sang tiếng Việt"
                  >
                    <Languages className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{isTranslating ? 'Đang dịch...' : showTranslation ? 'Ẩn bản dịch' : 'Dịch đoạn văn'}</span>
                  </button>

                  <button
                    onClick={() => handleToggleSpeak(taskContent.paragraph || '')}
                    className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                      isSpeaking 
                        ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                    title={isSpeaking ? 'Dừng đọc' : 'Nghe phát âm toàn bài'}
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4 text-slate-600" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Thân bài đọc cuộn độc lập */}
            <div 
              onMouseUp={handleTextMouseUp}
              className="flex-1 overflow-y-auto p-5 sm:p-6 custom-scrollbar min-h-0 space-y-4"
            >
              <div className="text-slate-800 font-serif text-sm sm:text-base leading-loose p-4 rounded-2xl bg-[#faf9f5] border border-amber-900/10 shadow-2xs">
                {cwTokens.map((token, tIdx) => {
                  if (token.type === 'text') {
                    return <span key={tIdx}>{token.content}</span>;
                  }

                  const isSelected = activeItemIdx === token.index;
                  const isCorrect = token.isCorrect;

                  return (
                    <button
                      key={tIdx}
                      ref={el => blankRefs.current[token.index] = el}
                      onClick={() => handleSelectBlank(token.index)}
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 mx-1 my-0.5 rounded-xl text-xs sm:text-sm font-bold font-sans transition-all cursor-pointer border ${
                        isSelected 
                          ? 'ring-3 ring-indigo-400 shadow-md scale-105 z-10' 
                          : 'shadow-2xs hover:scale-102'
                      } ${
                        isCorrect 
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                          : 'bg-rose-50 text-rose-800 border-rose-300'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{token.full}</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span className="line-through text-rose-600 font-normal">{token.userChoice}</span>
                          <span className="text-slate-400 text-[10px]">→</span>
                          <span className="text-emerald-700 font-black">{token.full}</span>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Khung hiển thị bản dịch tiếng Việt nếu được bật */}
              {showTranslation && (
                <div className="mt-4 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-indigo-950">
                    <Languages className="w-4 h-4 text-indigo-600" />
                    <span>Bản dịch tiếng Việt tham khảo (Song ngữ):</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                    {translations[currentTask.task_id] || 'Đang tải bản dịch...'}
                  </p>
                </div>
              )}
            </div>

            {/* Footer Mẹo học tập - CỐ ĐỊNH Ở DƯỚI CÙNG */}
            <div className="p-4 sm:p-5 pt-3 border-t border-slate-100 shrink-0 bg-white z-10 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Đúng: {cwTokens.filter(t => t.type === 'blank' && t.isCorrect).length} từ
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Chưa đúng: {cwTokens.filter(t => t.type === 'blank' && !t.isCorrect).length} từ
              </span>
            </div>

          </div>

          {/* CỘT PHẢI (5/12): CHI TIẾT TỪNG TỪ & HỌC TỪ VỰNG - THANH CUỘN ĐỘC LẬP */}
          <div className="lg:col-span-5 flex flex-col lg:sticky lg:top-24 max-h-[calc(100vh-140px)]">
            <div className="flex items-center justify-between px-1 pb-2.5 shrink-0">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Chi tiết đáp án & Học từ vựng ({cwTokens.filter(t => t.type === 'blank').length} câu)</span>
              </h4>
            </div>

            <div className="space-y-3 overflow-y-auto pr-1.5 custom-scrollbar flex-1">
              {cwTokens.filter(t => t.type === 'blank').map((token) => {
                const isSelected = activeItemIdx === token.index;
                const isCorrect = token.isCorrect;
                const isSaved = savedWords.has(token.full.toLowerCase());

                return (
                  <div
                    key={token.index}
                    ref={el => cardRefs.current[token.index] = el}
                    onClick={() => handleSelectCardBlank(token.index)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-white border-indigo-400 ring-2 ring-indigo-200 shadow-md' 
                        : isCorrect 
                          ? 'bg-white hover:bg-slate-50 border-slate-200' 
                          : 'bg-rose-50/20 hover:bg-rose-50/40 border-rose-200'
                    }`}
                  >
                    {/* Header Thẻ: Số câu + Tiêu đề từ + Status Badge */}
                    {(() => {
                      const cleanWord = token.full.toLowerCase().trim();
                      const dictInfo = currentTaskVocab[cleanWord] || getLocalVocabDetails(cleanWord);

                      return (
                        <>
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center shrink-0">
                                {token.index + 1}
                              </span>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-xs sm:text-sm font-black text-slate-900">
                                  {token.full}
                                </span>
                                {isCorrect ? (
                                  <span className="text-emerald-700 text-[11px] font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                    [✓ Đúng]
                                  </span>
                                ) : (
                                  <span className="text-rose-700 text-[11px] font-bold bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                                    (sai) → <span className="text-emerald-700 font-black">{token.full}</span>
                                  </span>
                                )}
                              </div>
                            </div>

                            {isCorrect ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full shrink-0">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                Đúng
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full shrink-0">
                                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                                Chưa đúng
                              </span>
                            )}
                          </div>

                          {/* Lưới 2x2: Câu trả lời vs Đáp án chuẩn | Phiên âm quốc tế vs Nghĩa tiếng Việt */}
                          <div className="grid grid-cols-2 gap-2 text-xs mb-2.5">
                            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
                                Câu trả lời của bạn:
                              </span>
                              <span className={`font-bold ${isCorrect ? 'text-emerald-700' : 'text-rose-600 line-through'}`}>
                                {token.userChoice}
                              </span>
                            </div>

                            <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200">
                              <span className="text-[10px] uppercase font-bold text-emerald-800 block mb-0.5">
                                Đáp án chuẩn:
                              </span>
                              <span className="font-black text-emerald-800 text-sm">
                                {token.full}
                              </span>
                            </div>

                            {/* Phiên âm quốc tế IPA */}
                            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
                                Phiên âm quốc tế:
                              </span>
                              <span className="font-mono font-bold text-indigo-700 text-xs">
                                {dictInfo?.phonetic ? `IPA: ${dictInfo.phonetic}` : 'IPA: /.../'}
                              </span>
                            </div>

                            {/* Nghĩa tiếng Việt */}
                            <div className="p-2.5 rounded-xl bg-indigo-50/50 border border-indigo-100">
                              <span className="text-[10px] uppercase font-bold text-indigo-900 block mb-0.5">
                                Nghĩa tiếng Việt:
                              </span>
                              <span className="font-bold text-slate-800 text-xs line-clamp-2">
                                {dictInfo?.meaningVi || dictInfo?.meaning || 'Đang tra nghĩa học thuật...'}
                              </span>
                            </div>
                          </div>

                          {/* Từ gia đình (Word Family) */}
                          {dictInfo?.wordFamily && (
                            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 mb-2.5 text-xs">
                              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
                                Từ gia đình (Word Family):
                              </span>
                              <span className="text-slate-700 font-medium">
                                {dictInfo.wordFamily}
                              </span>
                            </div>
                          )}

                          {/* Lời giải thích */}
                          <div className="text-xs text-slate-600 leading-relaxed bg-slate-50/70 p-2.5 rounded-xl border border-slate-200/80 mb-2.5">
                            <strong className="text-slate-800 font-semibold">Giải thích chi tiết: </strong>
                            {dictInfo?.explanation && dictInfo.explanation !== token.explanation 
                              ? `${token.explanation} ${dictInfo.explanation}`
                              : token.explanation}
                          </div>
                        </>
                      );
                    })()}

                    {/* Action: Lưu từ vựng & Phát âm từ */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleSpeak(token.full);
                        }}
                        className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-bold transition-colors cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-slate-500" />
                        <span>Nghe từ</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveToVocab(token.full, token.explanation);
                        }}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer border ${
                          isSaved 
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                            : 'bg-white hover:bg-indigo-50 text-indigo-700 border-indigo-200'
                        }`}
                      >
                        {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Bookmark className="w-3.5 h-3.5 text-indigo-600" />}
                        <span>{isSaved ? 'Đã lưu vào Sổ từ' : '+ Lưu vào Sổ từ vựng'}</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>
      ) : (
        /* =============================================================== */
        /* TRƯỜNG HỢP 2: GIAO DIỆN XEM ĐÁP ÁN BÀI ĐỌC HIỂU (PASSAGES)       */
        /* =============================================================== */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* CỘT TRÁI (7/12): BÀI ĐỌC HỌC THUẬT & DẪN CHỨNG */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xs lg:sticky lg:top-24 max-h-[calc(100vh-140px)] flex flex-col overflow-hidden">
            
            {/* Header bài đọc - CỐ ĐỊNH Ở TRÊN CÙNG, KHÔNG BAO GIỜ BỊ ĐÈ */}
            <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 shrink-0 bg-white z-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                        {passageDocType}
                      </span>
                      <span className="text-[10px] text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 hidden sm:inline">
                        💡 Bôi đen từ bất kỳ để tra & lưu 1-chạm
                      </span>
                    </div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mt-1">
                      Bài đọc học thuật & Dẫn chứng
                    </h4>
                  </div>
                </div>

                {/* Action Toolbar */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleToggleTranslate(passageText, currentTask.task_id)}
                    disabled={isTranslating}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      showTranslation 
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-2xs' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                    title="Dịch bài đọc sang tiếng Việt"
                  >
                    <Languages className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{isTranslating ? 'Đang dịch...' : showTranslation ? 'Ẩn bản dịch' : 'Dịch bài đọc'}</span>
                  </button>

                  <button
                    onClick={() => handleToggleSpeak(passageText)}
                    className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                      isSpeaking 
                        ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                    title={isSpeaking ? 'Dừng đọc' : 'Nghe phát âm bài đọc'}
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4 text-slate-600" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Vùng bài đọc có thanh cuộn riêng - CÁCH BIỆT HOÀN TOÀN KHỎI HEADER VÀ FOOTER */}
            <div 
              onMouseUp={handleTextMouseUp}
              className="flex-1 overflow-y-auto p-5 sm:p-6 custom-scrollbar min-h-0 space-y-4"
            >
              <div className="p-4 sm:p-5 rounded-2xl bg-[#faf9f5] border border-amber-900/10 shadow-2xs space-y-4">
                {passageText.split('\n\n').map((para, pIdx) => {
                  if (!para.trim()) return null;

                  // Tách đoạn văn thành từng câu để highlight chính xác câu dẫn chứng
                  const sentences = para.match(/[^.!?\n]+[.!?]+(\s+|$)|[^.!?\n]+$/g) || [para];

                  // Kiểm tra xem đoạn này có chứa dẫn chứng của câu đang chọn không
                  const hasCurrentActiveEvidence = activeEvidence && activeEvidence.sentence && sentences.some(s => {
                    const sTrim = s.trim().toLowerCase();
                    const evTrim = activeEvidence.sentence.trim().toLowerCase();
                    return sTrim === evTrim || sTrim.includes(evTrim) || evTrim.includes(sTrim);
                  });

                  return (
                    <div key={pIdx} className="relative group">
                      <p className={`font-serif text-sm sm:text-base leading-relaxed text-slate-800 transition-all p-3 rounded-2xl ${
                        hasCurrentActiveEvidence ? 'bg-amber-100/50 ring-1 ring-amber-300' : ''
                      }`}>
                        <span className="font-sans font-bold text-xs text-slate-400 mr-2 select-none">
                          [{pIdx + 1}]
                        </span>

                        {sentences.map((rawSentence, sIdx) => {
                          const s = rawSentence.trim();
                          if (!s) return null;

                          const sLower = s.toLowerCase();
                          const isCurrent = activeEvidence && activeEvidence.sentence && (
                            sLower === activeEvidence.sentence.toLowerCase() ||
                            sLower.includes(activeEvidence.sentence.toLowerCase()) ||
                            activeEvidence.sentence.toLowerCase().includes(sLower)
                          );

                          // Tìm xem câu này có là dẫn chứng cho câu hỏi nào khác không
                          const otherMatches = [];
                          Object.entries(evidenceMap).forEach(([idxStr, ev]) => {
                            const numIdx = Number(idxStr);
                            if (numIdx !== activeItemIdx && ev && ev.sentence) {
                              const otherEvLower = ev.sentence.toLowerCase();
                              if (sLower === otherEvLower || sLower.includes(otherEvLower) || otherEvLower.includes(sLower)) {
                                otherMatches.push(numIdx);
                              }
                            }
                          });

                          if (isCurrent) {
                            return (
                              <span
                                key={sIdx}
                                ref={el => evidenceRefs.current[activeItemIdx] = el}
                                className="bg-amber-200/90 text-amber-950 font-medium px-2 py-1 my-0.5 rounded-xl ring-2 ring-amber-400 shadow-xs inline transition-all duration-300 animate-in fade-in"
                              >
                                <span className="font-semibold underline decoration-amber-500 decoration-2">
                                  {s}
                                </span>
                                <span className="inline-flex items-center gap-1 mx-1.5 px-2 py-0.5 rounded-md bg-amber-600 text-white text-[10px] font-black align-middle shadow-xs select-none">
                                  <CheckCircle2 className="w-3 h-3 text-amber-100" />
                                  📍 Dẫn chứng Câu {activeItemIdx + 1}
                                </span>
                                {' '}
                              </span>
                            );
                          }

                          if (otherMatches.length > 0) {
                            return (
                              <span key={sIdx} className="inline">
                                <span>{s}</span>
                                {otherMatches.map(oIdx => (
                                  <button
                                    key={oIdx}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSelectQuestion(oIdx);
                                    }}
                                    title={`Bấm để chuyển sang đối chiếu Câu ${oIdx + 1}`}
                                    className="inline-flex items-center gap-0.5 mx-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-100/80 hover:bg-amber-300 text-amber-900 border border-amber-300 cursor-pointer transition-colors align-middle shadow-2xs select-none"
                                  >
                                    <span>📍 C{oIdx + 1}</span>
                                  </button>
                                ))}
                                {' '}
                              </span>
                            );
                          }

                          return <span key={sIdx}>{rawSentence} </span>;
                        })}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Khung bản dịch tiếng Việt */}
              {showTranslation && (
                <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-indigo-950">
                    <Languages className="w-4 h-4 text-indigo-600" />
                    <span>Bản dịch tiếng Việt bài đọc:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans whitespace-pre-line">
                    {translations[currentTask.task_id] || 'Đang tải bản dịch...'}
                  </p>
                </div>
              )}
            </div>

            {/* THANH ĐIỀU HƯỚNG VÀ TRẠNG THÁI ĐỐI CHIẾU DẪN CHỨNG - CỐ ĐỊNH Ở DƯỚI CÙNG */}
            <div className="p-3 sm:p-4 border-t border-slate-100 shrink-0 bg-white z-10">
              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                    {activeItemIdx + 1}
                  </div>
                  <div>
                    <span className="font-bold text-amber-950 block">
                      Đang đối chiếu: Câu {activeItemIdx + 1}
                    </span>
                    <span className="text-[11px] text-amber-800">
                      Dẫn chứng được tô sáng màu vàng trong bài đọc ở trên
                    </span>
                  </div>
                </div>

                {/* Nút bấm chuyển nhanh từng câu hỏi */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-slate-500 font-bold mr-1">Chuyển câu:</span>
                  {questionsList.map((q, qIdx) => {
                    const isSelected = activeItemIdx === qIdx;
                    const matchedItem = passageItems[qIdx] || {};
                    const isCorrect = matchedItem.is_correct ?? (matchedItem.user_choice === (q.correct_answer || q.answer));

                    return (
                      <button
                        key={qIdx}
                        type="button"
                        onClick={() => handleSelectQuestion(qIdx)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                          isSelected
                            ? 'bg-amber-500 text-white border-amber-600 shadow-xs ring-2 ring-amber-200'
                            : isCorrect
                              ? 'bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50'
                              : 'bg-white text-rose-800 border-rose-200 hover:bg-rose-50'
                        }`}
                        title={`Xem phân tích và dẫn chứng Câu ${qIdx + 1}`}
                      >
                        <span>Câu {qIdx + 1}</span>
                        {isCorrect ? (
                          <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-600'}`} />
                        ) : (
                          <XCircle className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-rose-600'}`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

          {/* CỘT PHẢI (5/12): CÂU HỎI TRẮC NGHIỆM & PHÂN TÍCH ĐÁP ÁN - THANH CUỘN ĐỘC LẬP */}
          <div className="lg:col-span-5 flex flex-col lg:sticky lg:top-24 max-h-[calc(100vh-140px)]">
            <div className="flex items-center justify-between px-1 pb-2.5 shrink-0">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>Câu hỏi trắc nghiệm & Giải thích ({passageQuestions.length || passageItems.length} câu)</span>
              </h4>
            </div>

            <div className="space-y-4 overflow-y-auto pr-1.5 custom-scrollbar flex-1">
              {(passageQuestions.length > 0 ? passageQuestions : passageItems).map((q, qIdx) => {
                const isSelected = activeItemIdx === qIdx;
                const matchedItem = passageItems[qIdx] || {};
                const isCorrect = matchedItem.is_correct ?? (matchedItem.user_choice === (q.correct_answer || q.answer));

                const promptText = q.prompt || q.question || matchedItem.prompt || 'Câu hỏi';
                const options = q.options || matchedItem.options || null;
                const userChoice = String(matchedItem.user_choice || '(Bỏ trống)').trim();
                const correctAns = String(q.correct_answer || q.answer || matchedItem.correct_answer || '').trim();
                const explanation = q.explanation || matchedItem.explanation || '';

                return (
                  <div
                    key={qIdx}
                    ref={el => cardRefs.current[qIdx] = el}
                    onClick={() => handleSelectQuestion(qIdx)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-white border-amber-400 ring-2 ring-amber-300 shadow-md' 
                        : isCorrect 
                          ? 'bg-white hover:bg-slate-50 border-slate-200' 
                          : 'bg-rose-50/20 hover:bg-rose-50/40 border-rose-200'
                    }`}
                  >
                    {/* Banner hiển thị trạng thái đang chọn đối chiếu */}
                    {isSelected && (
                      <div className="mb-3 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold flex items-center justify-between animate-in fade-in">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>Đang xem phân tích câu này • Dẫn chứng đã tô sáng bên trái</span>
                        </span>
                        <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded font-black shrink-0">
                          Đang chọn
                        </span>
                      </div>
                    )}

                    {/* Header câu hỏi */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-xs font-black text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg">
                        Câu {qIdx + 1}
                      </span>

                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Đúng
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          Chưa đúng
                        </span>
                      )}
                    </div>

                    {/* Đề bài câu hỏi */}
                    <p className="text-xs sm:text-sm font-bold text-slate-900 mb-3.5 leading-snug">
                      {promptText}
                    </p>

                    {/* Hiển thị 4 lựa chọn A, B, C, D nếu có */}
                    {options && typeof options === 'object' ? (
                      <div className="space-y-2 mb-3.5">
                        {Object.entries(options).map(([optKey, optVal]) => {
                          const isThisCorrect = optKey.toUpperCase() === correctAns.toUpperCase();
                          const isThisUserChoice = optKey.toUpperCase() === userChoice.toUpperCase();

                          let optStyle = "bg-slate-50/60 border-slate-200 text-slate-700";

                          if (isThisCorrect) {
                            optStyle = "bg-emerald-50 text-emerald-950 border-emerald-300 font-bold ring-1 ring-emerald-300";
                          } else if (isThisUserChoice && !isCorrect) {
                            optStyle = "bg-rose-50 text-rose-950 border-rose-300 font-bold ring-1 ring-rose-300";
                          }

                          return (
                            <div
                              key={optKey}
                              className={`p-2.5 rounded-xl border text-xs flex items-center gap-2.5 transition-all ${optStyle}`}
                            >
                              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 ${
                                isThisCorrect 
                                  ? 'bg-emerald-600 text-white' 
                                  : isThisUserChoice && !isCorrect 
                                    ? 'bg-rose-600 text-white' 
                                    : 'bg-slate-200 text-slate-700'
                              }`}>
                                {optKey}
                              </span>
                              <span className="leading-snug flex-1">{optVal}</span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      /* Fallback nếu không có options phân tách */
                      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
                            Bạn chọn:
                          </span>
                          <span className={`font-bold ${isCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>
                            {userChoice}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200">
                          <span className="text-[10px] uppercase font-bold text-emerald-800 block mb-0.5">
                            Đáp án chuẩn:
                          </span>
                          <span className="font-bold text-emerald-800">
                            {correctAns}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Dẫn chứng & Lời giải thích */}
                    {explanation && (
                      <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 leading-relaxed font-sans space-y-2">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <strong className="text-amber-900 font-bold flex items-center gap-1.5">
                            <BookOpen className="w-4 h-4 text-amber-700" />
                            Dẫn chứng & Giải thích chi tiết:
                          </strong>

                          {evidenceMap[qIdx]?.sentence && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleSpeak(evidenceMap[qIdx].sentence);
                              }}
                              className="flex items-center gap-1 text-[11px] font-bold text-amber-800 hover:text-amber-950 bg-amber-100/70 hover:bg-amber-200 px-2 py-0.5 rounded-lg transition-colors cursor-pointer"
                              title="Nghe phát âm câu dẫn chứng trong bài đọc"
                            >
                              <Volume2 className="w-3 h-3 text-amber-700" />
                              <span>Nghe câu dẫn chứng</span>
                            </button>
                          )}
                        </div>

                        {/* Trích dẫn câu gốc tiếng Anh trong bài đọc */}
                        {evidenceMap[qIdx]?.sentence && (
                          <div className="p-2.5 rounded-lg bg-white/80 border border-amber-200/80 font-serif italic text-slate-800 text-[11px] sm:text-xs leading-relaxed">
                            <span className="font-sans font-bold not-italic text-amber-800 text-[10px] uppercase block mb-0.5">
                              Trích câu gốc trong bài đọc:
                            </span>
                            "{evidenceMap[qIdx].sentence}"
                          </div>
                        )}

                        <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                          {explanation}
                        </p>
                      </div>
                    )}

                  </div>
                );
              })}

              {/* THẺ TỪ VỰNG CỐT LÕI CỦA BÀI ĐỌC (ACADEMIC VOCABULARY IN PASSAGE) */}
              {(() => {
                const vocabList = Object.values(currentTaskVocab).filter(w => w && w.word);
                if (vocabList.length === 0) return null;

                return (
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/60 to-orange-50/40 border border-amber-200 shadow-2xs">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <h5 className="text-xs font-black uppercase tracking-wider text-amber-950">
                        Từ vựng cốt lõi cần nhớ trong bài đọc
                      </h5>
                    </div>

                    <div className="space-y-2.5">
                      {vocabList.map((vItem, vIdx) => {
                        return (
                          <div key={vIdx} className="p-3 rounded-xl bg-white border border-amber-200/80 text-xs shadow-2xs hover:border-amber-300 transition-colors">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="font-black text-slate-900 text-xs sm:text-sm">{vItem.word}</span>
                              {vItem.phonetic && (
                                <span className="font-mono text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100 whitespace-nowrap">
                                  {vItem.phonetic}
                                </span>
                              )}
                              {vItem.partOfSpeech && (
                                <span className="text-[10px] text-slate-500 font-semibold italic">
                                  ({vItem.partOfSpeech})
                                </span>
                              )}
                              <button
                                type="button"
                                onClick={() => handleToggleSpeak(vItem.word)}
                                className="p-1 text-slate-400 hover:text-indigo-600 rounded-md hover:bg-slate-100 transition-colors cursor-pointer ml-auto"
                                title="Nghe phát âm từ này"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <p className="text-[11px] sm:text-xs text-slate-700 font-medium leading-relaxed">
                              {vItem.meaningVi || vItem.meaning}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

        </div>
      )}

      {/* 4. Pop-up Tra cứu & 1-Chạm Lưu Từ Vựng khi Bôi Đen Văn Bản */}
      {selectionData && (
        <QuickVocabPopover
          selection={selectionData}
          onClose={clearSelection}
        />
      )}

    </div>
  );
}
