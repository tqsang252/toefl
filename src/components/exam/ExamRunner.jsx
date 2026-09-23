import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Send, CheckCircle2, ArrowRight, ArrowLeft, Lock, Layers, AlertCircle, Clock } from 'lucide-react';
import ExamTimer from './ExamTimer';
import ReadingModule from './ReadingModule';
import ListeningModule from './ListeningModule';
import WritingModule from './WritingModule';
import SpeakingModule from './SpeakingModule';
import ExamResults from './ExamResults';
import { saveExamResult, normalizeTest, normalizeCompleteWordsTask } from '../../lib/supabase';
import { convertRawToScale30, convert30ToBand6 } from '../../lib/gemini';

export default function ExamRunner({ test, onExit }) {
  // Chuẩn hóa bài thi thành các Stage (Module 1, Module 2...) theo quy chế ETS 2026
  const normalizedTest = normalizeTest(test);
  const stages = normalizedTest.stages || [];

  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [lockedStageIndices, setLockedStageIndices] = useState([]);
  const [transitionMessage, setTransitionMessage] = useState(null);

  const [answers, setAnswers] = useState({});
  const [startTime] = useState(Date.now());
  const [isCompleted, setIsCompleted] = useState(false);
  const [examResults, setExamResults] = useState(null);

  const currentStage = stages[currentStageIndex] || stages[0];
  const currentTasks = currentStage?.tasks || [];
  const currentTask = currentTasks[currentTaskIndex] || currentTasks[0];

  const totalStages = stages.length;
  const totalTasksInStage = currentTasks.length;

  const isFirstTaskInStage = currentTaskIndex === 0;
  const isLastTaskInStage = currentTaskIndex === totalTasksInStage - 1;
  const isLastStage = currentStageIndex === totalStages - 1;

  // Thời gian riêng của Module hiện tại (ví dụ: 15 phút = 900 giây)
  const stageDurationSeconds = currentStage?.duration_seconds || 900;

  // Cập nhật câu trả lời
  const handleAnswerChange = (key, value) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  // =================================================================
  // ĐIỀU HƯỚNG GIỮA CÁC THÀNH PHẦN TRONG CÙNG 1 MODULE
  // =================================================================
  const handleNextTask = () => {
    if (!isLastTaskInStage) {
      setCurrentTaskIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevTask = () => {
    if (!isFirstTaskInStage) {
      setCurrentTaskIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // =================================================================
  // CHUYỂN MODULE (MODULE 1 -> MODULE 2)
  // Khi chuyển sang Module 2, Module 1 sẽ bị KHÓA theo chuẩn ETS
  // =================================================================
  const advanceToNextModule = (reason = 'manual') => {
    if (currentStageIndex < totalStages - 1) {
      const nextStageIndex = currentStageIndex + 1;
      const nextStage = stages[nextStageIndex];

      // Khóa module hiện tại
      setLockedStageIndices((prev) => [...prev, currentStageIndex]);

      if (reason === 'timeup') {
        setTransitionMessage({
          title: `⏱️ Hết giờ ${currentStage.title}!`,
          desc: `Theo quy chế thi ETS, ${currentStage.title} đã được khóa lại. Hệ thống đang chuyển sang ${nextStage.title}.`
        });
      }

      setCurrentStageIndex(nextStageIndex);
      setCurrentTaskIndex(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Khi bấm nút thủ công chuyển Module
  const handleConfirmNextModule = () => {
    const nextStage = stages[currentStageIndex + 1];
    if (confirm(`Bạn có chắc muốn kết thúc ${currentStage.title} để chuyển sang ${nextStage.title}?\n\n⚠️ LƯU Ý: Sau khi chuyển sang ${nextStage.title}, bạn sẽ KHÔNG thể quay lại sửa các câu trả lời ở ${currentStage.title} (đúng theo quy chế thi TOEFL thật).`)) {
      advanceToNextModule('manual');
    }
  };

  // =================================================================
  // XỬ LÝ KHI ĐỒNG HỒ ĐẾM NGƯỢC HẾT GIỜ (TIME UP)
  // =================================================================
  const handleStageTimeUp = () => {
    if (!isLastStage) {
      // Hết giờ Module 1 -> TỰ ĐỘNG CHUYỂN SANG MODULE 2 (KHÔNG NỘP BÀI)
      advanceToNextModule('timeup');
    } else {
      // Hết giờ Module cuối cùng -> MỚI NỘP BÀI VÀ CHẤM ĐIỂM
      alert(`⏱️ Hết giờ làm bài của ${currentStage.title}! Toàn bộ bài thi đã kết thúc. Hệ thống đang tiến hành chấm điểm...`);
      handleSubmitFullExam();
    }
  };

  // =================================================================
  // CHẤM ĐIỂM TỔNG HỢP TẤT CẢ CÁC MODULE VÀ THÀNH PHẦN
  // =================================================================
  const handleSubmitFullExam = async () => {
    const timeSpentSeconds = Math.round((Date.now() - startTime) / 1000);
    
    let totalScoreRaw = 0;
    let totalQuestionsCount = 0;
    let stageResults = [];

    let skillCounters = {
      reading: { raw: 0, total: 0 },
      listening: { raw: 0, total: 0 },
      writing: { raw: 0, total: 0 },
      speaking: { raw: 0, total: 0 }
    };

    let writingSubmissions = {
      email: null,
      discussion: null
    };

    let speakingSubmissions = {
      repeat_items: [],
      interview_items: []
    };

    // Duyệt qua tất cả các Stage và các Task bên trong
    stages.forEach((stage, sIdx) => {
      let stageRaw = 0;
      let stageTotal = 0;
      let taskBreakdowns = [];

      stage.tasks.forEach((task) => {
        const content = task.content || {};
        let taskRaw = 0;
        let taskTotal = 0;
        let taskItems = [];

        // 1. Dạng Speaking (Format ETS 2026: Listen & Repeat + Take an Interview)
        // Ưu tiên xử lý Speaking trước để tránh bị nuốt bởi content.questions của Interview
        if (task.skill === 'speaking' || stage.skill === 'speaking' || test.skill === 'speaking' || task.task_type === 'listen_and_repeat' || task.task_type === 'take_an_interview' || task.task_type === 'interview') {
          // A. Task 1: Listen and Repeat (7 câu)
          if (task.task_type === 'listen_and_repeat' || task.task_type === 'listen_repeat' || content.items) {
            const items = content.items || [];
            taskTotal = items.length;
            items.forEach((it, idx) => {
              const audioUrl = answers[`spoken_repeat_${it.id}`] || (idx === 0 ? answers['spoken_audio'] : null);
              const isAnswered = !!audioUrl;
              if (isAnswered) taskRaw++;

              speakingSubmissions.repeat_items.push({
                id: it.id,
                text: it.audio_text,
                prompt: it.audio_text,
                phonetic_guide: it.phonetic_guide,
                audio_url: audioUrl,
                is_recorded: isAnswered
              });

              taskItems.push({
                prompt: `Câu ${idx + 1} (${it.context || 'Listen & Repeat'}): "${it.audio_text}"`,
                user_choice: isAnswered ? 'Đã ghi âm lặp lại câu nói' : '(Chưa thu âm)',
                audio_url: audioUrl,
                correct_answer: it.audio_text,
                is_correct: isAnswered,
                explanation: it.phonetic_guide 
                  ? `Phiên âm chuẩn: /${it.phonetic_guide}/. Cần lặp lại chính xác từng từ và ngữ điệu tự nhiên.`
                  : 'Yêu cầu lặp lại đúng 100% từ ngữ trong câu.'
              });
            });

          // B. Task 2: Take an Interview (4 câu)
          } else if (task.task_type === 'take_an_interview' || task.task_type === 'interview' || content.questions) {
            const questions = content.questions || [];
            taskTotal = questions.length;
            questions.forEach((q, idx) => {
              const audioUrl = answers[`spoken_interview_${q.id}`] || (idx === 0 ? answers['spoken_audio'] : null);
              const isAnswered = !!audioUrl;
              if (isAnswered) taskRaw++;

              speakingSubmissions.interview_items.push({
                id: q.id,
                question: q.audio_text || q.prompt || q.question,
                sample_answer: q.sample_answer,
                key_points: q.key_points,
                audio_url: audioUrl,
                is_recorded: isAnswered
              });

              taskItems.push({
                prompt: `Câu phỏng vấn ${idx + 1}: "${q.audio_text || q.prompt || q.question}"`,
                user_choice: isAnswered ? 'Đã hoàn thành 45s phỏng vấn' : '(Chưa thu âm)',
                audio_url: audioUrl,
                correct_answer: q.sample_answer || 'Phát âm chuẩn xác, cấu trúc luận điểm rõ ràng trong 45 giây',
                is_correct: isAnswered,
                explanation: q.key_points && q.key_points.length > 0
                  ? `Tiêu chí chấm điểm: ${q.key_points.join(' • ')}`
                  : 'Phản xạ trả lời tự nhiên, trôi chảy, bám sát câu hỏi của người phỏng vấn.'
              });
            });

          // C. Fallback nếu đề cũ
          } else {
            taskTotal = 1;
            taskRaw = answers['spoken_audio'] ? 1 : 0;
            taskItems.push({
              prompt: `Phần thi nói: ${task.title}`,
              user_choice: answers['spoken_audio'] ? 'Đã ghi âm bài nói' : '(Chưa thu âm)',
              audio_url: answers['spoken_audio'],
              correct_answer: 'Phát âm chuẩn xác, trôi chảy',
              is_correct: !!answers['spoken_audio'],
              explanation: 'Đã hoàn thành lượt nói.'
            });
          }

        // 2. Dạng Build a Sentence (Writing - 10 câu nhị phân 1/0)
        } else if (task.task_type === 'build_sentence' && content.items) {
          taskTotal = content.items.length;
          content.items.forEach((item, idx) => {
            const userOrder = answers[item.id] || [];
            const normUser = userOrder.map((w) => String(w).trim().toLowerCase());
            const normCorrect = (item.correct_order || []).map((w) => String(w).trim().toLowerCase());
            const isCorrect = normUser.length > 0 && JSON.stringify(normUser) === JSON.stringify(normCorrect);
            if (isCorrect) taskRaw++;

            taskItems.push({
              prompt: `Câu ${idx + 1}: ${item.context}`,
              user_choice: userOrder.join(' ') || '(Chưa làm)',
              correct_answer: item.correct_sentence,
              is_correct: isCorrect,
              explanation: isCorrect 
                ? 'Chính xác! Thứ tự từ và cấu trúc ngữ pháp chuẩn.' 
                : `Thứ tự đúng: ${item.correct_sentence}`
            });
          });

        // 3. Dạng Viết Email (Writing Task 2)
        } else if (task.task_type === 'write_email') {
          const emailText = answers[`email_${task.id}`] || answers['email_essay'] || (task.id && answers[task.id]) || answers['email'] || answers['essay'] || '';
          const wordCount = emailText.trim() ? emailText.trim().split(/\s+/).length : 0;
          const targetWords = content.min_words || 80;
          
          taskTotal = 1;
          taskRaw = wordCount >= targetWords ? 1 : wordCount > 0 ? Number((wordCount / targetWords).toFixed(2)) : 0;

          const emailObj = {
            task_id: task.id,
            title: task.title || 'Task 2: Write an Email',
            scenario: content.scenario,
            requirements: content.requirements || [],
            recipient: content.recipient,
            min_words: targetWords,
            essay_text: emailText,
            word_count: wordCount
          };
          writingSubmissions.email = emailObj;

          taskItems.push({
            prompt: `Email gửi ${content.recipient || 'Professor'}`,
            user_choice: `${wordCount} từ (Yêu cầu: ${targetWords} từ)`,
            correct_answer: `Đạt độ dài tối thiểu ${targetWords} từ và đủ 3 yêu cầu`,
            is_correct: wordCount >= targetWords,
            explanation: wordCount >= targetWords 
              ? `Bài viết đạt yêu cầu độ dài (${wordCount} từ).` 
              : `Chưa đạt số từ tối thiểu (${wordCount} / ${targetWords} từ).`,
            essay_text: emailText,
            task_type: 'write_email',
            task_data: emailObj
          });

        // 4. Dạng Academic Discussion (Writing Task 3)
        } else if (task.task_type === 'academic_discussion') {
          const discussText = answers[`discussion_${task.id}`] || answers['discussion_essay'] || answers['essay_discussion'] || (task.id && answers[task.id]) || '';
          const wordCount = discussText.trim() ? discussText.trim().split(/\s+/).length : 0;
          const targetWords = content.min_words || 100;

          taskTotal = 1;
          taskRaw = wordCount >= targetWords ? 1 : wordCount > 0 ? Number((wordCount / targetWords).toFixed(2)) : 0;

          const discussObj = {
            task_id: task.id,
            title: task.title || 'Task 3: Academic Discussion',
            topic: content.topic,
            course: content.course,
            professor_name: content.professor_prompt?.name,
            professor_question: content.professor_prompt?.question || content.question || content.prompt,
            peer_posts: content.peer_posts || content.peers || [],
            min_words: targetWords,
            essay_text: discussText,
            word_count: wordCount
          };
          writingSubmissions.discussion = discussObj;

          taskItems.push({
            prompt: `Thảo luận: ${content.topic || 'Academic Discussion Board'}`,
            user_choice: `${wordCount} từ (Yêu cầu: ${targetWords} từ)`,
            correct_answer: `Đạt tối thiểu ${targetWords} từ, nêu rõ lập trường và phản biện ý kiến bạn học`,
            is_correct: wordCount >= targetWords,
            explanation: wordCount >= targetWords 
              ? `Bài viết đạt chuẩn độ dài (${wordCount} từ).` 
              : `Chưa đạt số từ tối thiểu (${wordCount} / ${targetWords} từ).`,
            essay_text: discussText,
            task_type: 'academic_discussion',
            task_data: discussObj
          });

        // 5. Dạng Complete the Words (Reading)
        } else if (task.task_type === 'complete_words') {
          const normTask = normalizeCompleteWordsTask(task, task.id);
          const taskContent = normTask.content || {};
          let blanks = taskContent.blanks || [];

          taskTotal = blanks.length;
          blanks.forEach((b, bIdx) => {
            const uniqueBlankId = `${task.id}_b${bIdx + 1}`;
            const userVal = (answers[uniqueBlankId] || answers[b.id] || '').trim().toLowerCase();
            const correctVal = (b.missing || '').trim().toLowerCase();
            const isCorrect = !!userVal && userVal === correctVal;
            if (isCorrect) taskRaw++;

            taskItems.push({
              prompt: `Từ hoàn chỉnh: ${b.prefix}[${b.missing}]`,
              user_choice: userVal ? `${b.prefix}${userVal}` : '(Chưa điền)',
              correct_answer: b.full || `${b.prefix}${b.missing}`,
              is_correct: isCorrect,
              explanation: `Chữ cái còn thiếu là "${b.missing}" để tạo thành từ "${b.full || b.prefix + b.missing}".`
            });
          });

        // 6. Dạng Trắc nghiệm Đọc / Nghe (Daily Life, Academic Passage, Choose Response, Announcement, Conversation, Talk)
        } else if (content.questions && content.questions.length > 0) {
          taskTotal = content.questions.length;
          content.questions.forEach((q) => {
            const rawCorrect = q.correct_answer || q.answer || q.correctAnswer || q.correct || '';
            const correctAns = String(rawCorrect).trim();
            const rawChoice = answers[q.id] || '';
            const userChoice = String(rawChoice).trim();
            
            // CHỈ tính là đúng khi thí sinh CÓ chọn và trùng khớp đáp án chuẩn (không thể đúng nếu bỏ trống hoặc thiếu đáp án)
            const isCorrect = !!userChoice && !!correctAns && userChoice.toUpperCase() === correctAns.toUpperCase();
            if (isCorrect) taskRaw++;

            taskItems.push({
              prompt: q.prompt || q.question || 'Câu hỏi',
              user_choice: userChoice || '(Bỏ trống)',
              correct_answer: correctAns || '(Chưa có đáp án)',
              is_correct: isCorrect,
              explanation: q.explanation || (correctAns ? `Đáp án đúng là ${correctAns}.` : 'Không có giải thích.')
            });
          });
        }

        // Tích lũy điểm vào kỹ năng tương ứng (Reading, Listening, Writing, Speaking)
        const taskSkill = task.skill || stage.skill || test.skill;
        if (skillCounters[taskSkill]) {
          skillCounters[taskSkill].raw += taskRaw;
          skillCounters[taskSkill].total += taskTotal;
        }

        stageRaw += taskRaw;
        stageTotal += taskTotal;

        taskBreakdowns.push({
          task_id: task.id,
          task_title: task.title,
          task_type: task.task_type,
          task_skill: taskSkill,
          score_raw: taskRaw,
          total_questions: taskTotal,
          items: taskItems
        });
      });

      totalScoreRaw += stageRaw;
      totalQuestionsCount += stageTotal;

      stageResults.push({
        module_id: stage.id,
        module_title: stage.title,
        module_skill: stage.skill || test.skill,
        score_raw: stageRaw,
        total_questions: stageTotal,
        tasks: taskBreakdowns,
        items: taskBreakdowns.flatMap(t => t.items) // Để tương thích
      });
    });

    const isFullTest = test.skill === 'full';

    // Điểm quy đổi thang 0 - 30 cho từng kỹ năng chuẩn ETS TOEFL 2026
    const readingScore = skillCounters.reading.total > 0 
      ? convertRawToScale30(skillCounters.reading.raw, skillCounters.reading.total, 'reading')
      : 26;
    const listeningScore = skillCounters.listening.total > 0 
      ? convertRawToScale30(skillCounters.listening.raw, skillCounters.listening.total, 'listening')
      : 25;
    const writingScore = skillCounters.writing.total > 0 
      ? convertRawToScale30(skillCounters.writing.raw, skillCounters.writing.total, 'writing')
      : 27;
    const speakingScore = skillCounters.speaking.total > 0 
      ? convertRawToScale30(skillCounters.speaking.raw, skillCounters.speaking.total, 'speaking')
      : 26;

    const totalToefl120 = readingScore + listeningScore + writingScore + speakingScore;

    // Quy đổi điểm Band (1.0 đến 6.0) theo chuẩn ETS TOEFL 2026
    const scoreBand = isFullTest 
      ? convert30ToBand6(totalToefl120 / 4)
      : convert30ToBand6(
          test.skill === 'reading' ? readingScore :
          test.skill === 'listening' ? listeningScore :
          test.skill === 'writing' ? writingScore :
          test.skill === 'speaking' ? speakingScore :
          convertRawToScale30(totalScoreRaw, totalQuestionsCount)
        );

    const payload = {
      test_id: test.id,
      skill: test.skill,
      score_band: scoreBand,
      score_raw: isFullTest ? totalToefl120 : Math.round(totalScoreRaw),
      total_questions: isFullTest ? 120 : totalQuestionsCount,
      is_full_test: isFullTest,
      skill_scores: isFullTest ? {
        reading: readingScore,
        listening: listeningScore,
        writing: writingScore,
        speaking: speakingScore,
        total: totalToefl120
      } : {
        [test.skill]: (
          test.skill === 'reading' ? readingScore :
          test.skill === 'listening' ? listeningScore :
          test.skill === 'writing' ? writingScore :
          test.skill === 'speaking' ? speakingScore :
          26
        )
      },
      user_submission: stageResults, // Chi tiết theo từng Stage & Task
      writing_submissions: writingSubmissions,
      speaking_submissions: speakingSubmissions,
      time_spent_seconds: timeSpentSeconds
    };

    const savedRecord = await saveExamResult(payload);
    setExamResults(savedRecord || payload);
    setIsCompleted(true);
  };

  // Màn hình kết quả sau khi hoàn thành tất cả module
  if (isCompleted && examResults) {
    return (
      <ExamResults
        test={test}
        results={examResults}
        onRetake={() => {
          setAnswers({});
          setCurrentStageIndex(0);
          setCurrentTaskIndex(0);
          setLockedStageIndices([]);
          setIsCompleted(false);
          setExamResults(null);
        }}
        onBackHome={onExit}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0] pb-28">
      
      {/* 1. Header Bar: Timer theo Module & Nút điều hướng */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Nút thoát */}
          <button
            onClick={() => {
              if (confirm("Bạn có chắc muốn thoát bài thi này? Kết quả đang làm sẽ không được lưu.")) {
                onExit();
              }
            }}
            className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Thoát bài thi</span>
          </button>

          {/* Tiêu đề phần thi & Module hiện tại */}
          <div className="text-center">
            <h1 className="text-xs font-semibold text-slate-500 uppercase tracking-wider m-0">
              {test.title}
            </h1>
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm font-black text-teal-800">
                {currentStage.title}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                Phần {currentTaskIndex + 1}/{totalTasksInStage}
              </span>
            </div>
          </div>

          {/* Đồng hồ đếm ngược của Module hiện tại & Nút nộp */}
          <div className="flex items-center gap-3">
            {/* Đồng hồ có key để tự reset đếm ngược mỗi khi sang Module mới */}
            <div className="flex items-center gap-1.5">
              <ExamTimer
                key={`timer_stage_${currentStageIndex}`}
                durationSeconds={stageDurationSeconds}
                onTimeUp={handleStageTimeUp}
              />
            </div>

            {isLastStage ? (
              <button
                onClick={() => {
                  if (confirm("Bạn đang ở Module cuối cùng. Bạn có chắc muốn nộp toàn bộ bài thi để chấm điểm không?")) {
                    handleSubmitFullExam();
                  }
                }}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Nộp bài</span>
              </button>
            ) : (
              <button
                onClick={handleConfirmNextModule}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1"
                title={`Kết thúc ${currentStage.title} và chuyển sang phần tiếp theo`}
              >
                <span>Sang: {stages[currentStageIndex + 1]?.title?.split('(')[0]?.trim() || 'Phần tiếp theo'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* 2. Thanh hiển thị các Stage (Module 1, Module 2) và các Task bên trong */}
        <div className="bg-[#faf8f4] border-t border-slate-100 px-4 py-2.5">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            
            {/* Các Module (Stages) */}
            <div className="flex items-center gap-2 overflow-x-auto">
              {stages.map((stage, idx) => {
                const isActive = idx === currentStageIndex;
                const isLocked = lockedStageIndices.includes(idx);

                return (
                  <div
                    key={stage.id || idx}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      isActive
                        ? 'bg-teal-700 text-white shadow-xs'
                        : isLocked
                        ? 'bg-slate-200/80 text-slate-500 border border-slate-300'
                        : 'bg-white text-slate-600 border border-slate-200 opacity-60'
                    }`}
                  >
                    {isLocked ? (
                      <Lock className="w-3.5 h-3.5 text-slate-500" />
                    ) : (
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        isActive ? 'bg-white text-teal-800' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {idx + 1}
                      </span>
                    )}
                    <span>{stage.title}</span>
                    {isLocked && <span className="text-[10px] font-normal text-slate-400">(Đã khóa)</span>}
                  </div>
                );
              })}
            </div>

            {/* Các Task bên trong Module hiện tại */}
            {totalTasksInStage > 1 && (
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <span className="text-[11px] font-bold text-slate-400 mr-1 hidden md:inline">
                  Thành phần trong Module:
                </span>
                {currentTasks.map((t, tIdx) => {
                  const isCurrentTask = tIdx === currentTaskIndex;
                  return (
                    <button
                      key={t.id || tIdx}
                      onClick={() => setCurrentTaskIndex(tIdx)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isCurrentTask
                          ? 'bg-amber-600 text-white shadow-2xs'
                          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {t.title}
                    </button>
                  );
                })}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* 3. Modal thông báo chuyển Module khi hết giờ */}
      {transitionMessage && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">
              {transitionMessage.title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              {transitionMessage.desc}
            </p>
            <button
              onClick={() => setTransitionMessage(null)}
              className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Bắt đầu làm {stages[currentStageIndex]?.title} ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 4. Hiển thị Thành phần hiện tại theo kỹ năng động */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        {(() => {
          const activeSkill = currentTask?.skill || currentStage?.skill || test.skill;

          if (activeSkill === 'reading' && currentTask) {
            return (
              <ReadingModule
                key={`s${currentStageIndex}_${currentTask.id || currentTaskIndex}`}
                test={currentTask}
                stageId={currentStage?.id}
                answers={answers}
                onAnswerChange={handleAnswerChange}
              />
            );
          }
          if (activeSkill === 'listening' && currentTask) {
            return (
              <ListeningModule
                key={`s${currentStageIndex}_${currentTask.id || currentTaskIndex}`}
                test={currentTask}
                answers={answers}
                onAnswerChange={handleAnswerChange}
              />
            );
          }
          if (activeSkill === 'writing' && currentTask) {
            return (
              <WritingModule
                key={`s${currentStageIndex}_${currentTask.id || currentTaskIndex}`}
                test={currentTask}
                answers={answers}
                onAnswerChange={handleAnswerChange}
              />
            );
          }
          if (activeSkill === 'speaking' && currentTask) {
            return (
              <SpeakingModule
                key={`s${currentStageIndex}_${currentTask.id || currentTaskIndex}`}
                test={currentTask}
                answers={answers}
                onAnswerChange={handleAnswerChange}
              />
            );
          }
          return null;
        })()}

        {/* 5. Thanh điều hướng cuối trang */}
        <div className="mt-8 flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          
          {/* Nút quay lại Task trước (trong cùng Module) */}
          <button
            disabled={isFirstTaskInStage}
            onClick={handlePrevTask}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl text-slate-600 hover:bg-slate-100 disabled:opacity-25 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Phần trước trong Module</span>
          </button>

          <span className="text-xs text-slate-500 font-bold hidden sm:inline">
            {currentStage.title} • {currentTask.title}
          </span>

          {/* Nút tiếp theo hoặc hoàn thành Module */}
          {!isLastTaskInStage ? (
            <button
              onClick={handleNextTask}
              className="flex items-center gap-2 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer transition-all active:scale-95"
            >
              <span>Tiếp theo: {currentTasks[currentTaskIndex + 1]?.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : isLastStage ? (
            <button
              onClick={() => {
                if (confirm("Bạn đã hoàn thành các Module. Bạn có chắc muốn nộp bài thi để chấm điểm không?")) {
                  handleSubmitFullExam();
                }
              }}
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Hoàn thành tất cả & Chấm điểm</span>
            </button>
          ) : (
            <button
              onClick={handleConfirmNextModule}
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
            >
              <span>Hoàn thành {currentStage.title} → Sang {stages[currentStageIndex + 1]?.title || 'Module tiếp theo'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

        </div>

      </main>

    </div>
  );
}
