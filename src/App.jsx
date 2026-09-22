import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SkillTabs from './components/SkillTabs';
import TestList from './components/TestList';
import FullTestList from './components/FullTestList';
import ImportModal from './components/ImportModal';
import SettingsModal from './components/SettingsModal';
import ExamRunner from './components/exam/ExamRunner';
import ExamResults from './components/exam/ExamResults';
import ExamHistoryModal from './components/ExamHistoryModal';
import VocabularyHub from './components/vocabulary/VocabularyHub';
import { getTestsBySkill, getFullTests, deleteTest, getExamHistory } from './lib/supabase';
import { MessageCircle, User } from 'lucide-react';

export default function App() {
  const [activeSkill, setActiveSkill] = useState('listening'); // Default to listening like screenshot
  const [currentView, setCurrentView] = useState('practice'); // 'practice' | 'full_test' | 'exam'
  const [lastViewBeforeExam, setLastViewBeforeExam] = useState('practice');
  const [currentTest, setCurrentTest] = useState(null);
  
  const [tests, setTests] = useState([]);
  const [testHistories, setTestHistories] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Modals
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [historyModalTest, setHistoryModalTest] = useState(null);
  const [reviewingTest, setReviewingTest] = useState(null);
  const [reviewingResult, setReviewingResult] = useState(null);

  // Load danh sách đề thi theo chế độ hiện tại (Practice skill hoặc Full Test)
  const loadTests = async () => {
    if (activeSkill === 'vocabulary' && currentView === 'practice') {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      let data = [];
      if (currentView === 'full_test') {
        data = await getFullTests();
      } else {
        data = await getTestsBySkill(activeSkill);
      }
      setTests(data);

      // Load lịch sử bài làm cho các đề (lưu toàn bộ các lần làm bài)
      const histories = {};
      for (const t of data) {
        const hist = await getExamHistory(t.id);
        histories[t.id] = hist || [];
      }
      setTestHistories(histories);
    } catch (err) {
      console.error('Lỗi load đề thi:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentView === 'practice' || currentView === 'full_test') {
      loadTests();
    }
  }, [activeSkill, currentView]);

  // Bắt đầu làm bài thi
  const handleStartTest = (test) => {
    setLastViewBeforeExam(currentView);
    setCurrentTest(test);
    setCurrentView('exam');
  };

  // Thoát khỏi phòng thi
  const handleExitExam = () => {
    setCurrentTest(null);
    setCurrentView(lastViewBeforeExam || 'practice');
    loadTests(); // Refresh lại lịch sử kết quả
  };

  // Xóa bài thi
  const handleDeleteTest = async (testId) => {
    await deleteTest(testId);
    loadTests();
  };

  // Mở màn hình xem lại chi tiết bài làm trong quá khứ
  const handleOpenReview = (test, hist) => {
    setReviewingTest(test);
    setReviewingResult(hist);
    setHistoryModalTest(null);
    setCurrentView('review');
  };

  // Thoát khỏi màn hình xem lại
  const handleExitReview = () => {
    setReviewingTest(null);
    setReviewingResult(null);
    setCurrentView(lastViewBeforeExam || 'practice');
  };

  // Nếu đang ở màn hình làm bài thi
  if (currentView === 'exam' && currentTest) {
    return <ExamRunner test={currentTest} onExit={handleExitExam} />;
  }

  // Nếu đang ở màn hình xem lại bài làm trong quá khứ
  if (currentView === 'review' && reviewingResult && reviewingTest) {
    return (
      <div className="min-h-screen bg-[#f7f5f0] pb-20">
        {/* Top bar cho chế độ xem lại */}
        <div className="bg-slate-900 text-white px-4 sm:px-6 py-3 sticky top-0 z-40 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleExitReview}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer border border-slate-700 active:scale-95"
            >
              ← Về danh sách đề thi
            </button>
            <span className="text-xs font-extrabold text-teal-400 hidden sm:inline">
              [CHẾ ĐỘ XEM LẠI BÀI LÀM & ĐÁP ÁN ĐÃ LÀM]
            </span>
          </div>
          <div className="text-xs text-slate-300 font-medium">
            Thời gian nộp: {reviewingResult.completed_at ? new Date(reviewingResult.completed_at).toLocaleString('vi-VN') : 'Gần đây'}
          </div>
        </div>

        <ExamResults
          test={reviewingTest}
          results={reviewingResult}
          isReviewMode={true}
          onRetake={() => {
            handleExitReview();
            handleStartTest(reviewingTest);
          }}
          onBackHome={handleExitReview}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen toefl-bg flex flex-col justify-between font-sans selection:bg-teal-100 selection:text-teal-900">
      
      {/* 1. Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenImport={() => setIsImportOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* 2. Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 flex-1 w-full py-6">
        
        {currentView === 'full_test' ? (
          /* Chế độ Take Full Test (4 Kỹ Năng) */
          isLoading ? (
            <div className="bg-white rounded-2xl border border-[#e5dfd5] p-12 text-center shadow-xs my-6">
              <div className="w-8 h-8 border-3 border-teal-700 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs text-slate-500 font-medium">Đang tải danh sách đề Full Test...</p>
            </div>
          ) : (
            <FullTestList
              tests={tests}
              onStartTest={handleStartTest}
              onDeleteTest={handleDeleteTest}
              onOpenImport={() => setIsImportOpen(true)}
              onOpenHistory={(t) => setHistoryModalTest(t)}
              testHistories={testHistories}
            />
          )
        ) : (
          /* Chế độ Luyện tập từng Kỹ năng (Practice by Skill) */
          <>
            <SkillTabs
              activeSkill={activeSkill}
              onSelectSkill={(skillId) => setActiveSkill(skillId)}
            />

            {activeSkill === 'vocabulary' ? (
              <VocabularyHub />
            ) : isLoading ? (
              <div className="bg-white rounded-2xl border border-[#e5dfd5] p-12 text-center shadow-xs my-6">
                <div className="w-8 h-8 border-3 border-teal-700 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-xs text-slate-500 font-medium">Đang tải danh sách đề thi...</p>
              </div>
            ) : (
              <TestList
                skill={activeSkill}
                tests={tests}
                onStartTest={handleStartTest}
                onDeleteTest={handleDeleteTest}
                onOpenHistory={(t) => setHistoryModalTest(t)}
                testHistories={testHistories}
              />
            )}
          </>
        )}

      </main>

      {/* 3. Footer matching screenshot layout */}
      <footer className="border-t border-[#e2ddd3] py-6 bg-[#f7f5f0]/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-6">
            <a href="#contact" onClick={(e) => { e.preventDefault(); alert("Liên hệ hỗ trợ: support@toeflsmart.com"); }} className="hover:text-slate-950 transition-colors">
              Contact
            </a>
            <a href="#about" onClick={(e) => { e.preventDefault(); alert("TOEFL SMART 2026: Nền tảng tự luyện thi thích ứng 90 phút."); }} className="hover:text-slate-950 transition-colors">
              About Us
            </a>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Chính sách bảo mật: Dữ liệu bài làm của bạn được lưu an toàn trên Supabase / thiết bị."); }} className="hover:text-slate-950 transition-colors">
              Privacy Policy
            </a>
          </div>

          <p className="text-slate-400 font-normal text-[11px]">
            © 2026 TOEFL SMART. Adaptive Practice Simulator.
          </p>
        </div>
      </footer>

      {/* Floating Bottom-Right Icons matching screenshot */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-30">
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="w-12 h-12 rounded-full bg-[#d7936a] hover:bg-[#c6825a] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          title="Tài khoản / Cấu hình"
        >
          <User className="w-6 h-6" />
        </button>

        <button 
          onClick={() => alert("Hộp thoại trợ giúp: Bạn có thể dán đề thi AI tạo vào mục 'Import Đề AI' để luyện tập bất kỳ dạng bài nào!")}
          className="w-12 h-12 rounded-full bg-[#c6764d] hover:bg-[#b5653c] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          title="Trợ giúp & Hướng dẫn"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Modals */}
      <ImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImportSuccess={loadTests}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onConfigSaved={loadTests}
      />

      <ExamHistoryModal
        isOpen={!!historyModalTest}
        onClose={() => setHistoryModalTest(null)}
        test={historyModalTest}
        histories={historyModalTest ? (testHistories[historyModalTest.id] || []) : []}
        onViewResultDetail={handleOpenReview}
      />

    </div>
  );
}
