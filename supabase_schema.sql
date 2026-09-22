-- ====================================================================
-- TOEFL SMART 2026 - SUPABASE DATABASE SCHEMA
-- Hướng dẫn: Dán toàn bộ nội dung file này vào SQL Editor trên Supabase và bấm Run
-- ====================================================================

-- 1. Bảng lưu danh sách Đề thi (tests)
-- Cột 'content' lưu cấu trúc JSON linh hoạt của từng dạng bài (Reading, Listening, Writing, Speaking, Full Test)
CREATE TABLE IF NOT EXISTS tests (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  skill TEXT NOT NULL CHECK (skill IN ('listening', 'reading', 'speaking', 'writing', 'full')),
  task_type TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL DEFAULT 600,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Bảng lưu kết quả thi & chấm điểm (test_results)
CREATE TABLE IF NOT EXISTS test_results (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  test_id TEXT NOT NULL,
  skill TEXT NOT NULL,
  score_band NUMERIC(2,1) NOT NULL, -- Thang điểm 1.0 - 6.0 theo chuẩn TOEFL 2026
  score_raw INTEGER NOT NULL,       -- Điểm số (0 - 120 đối với Full Test hoặc số câu đúng)
  total_questions INTEGER NOT NULL,  -- Tổng số câu (120 đối với Full Test)
  is_full_test BOOLEAN DEFAULT false,
  skill_scores JSONB,               -- Điểm chi tiết 4 kỹ năng {reading, listening, writing, speaking, total}
  user_submission JSONB NOT NULL,    -- Chi tiết bài làm / đáp án của học viên
  time_spent_seconds INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Cấu hình Row Level Security (RLS) để React gọi trực tiếp không cần backend
ALTER TABLE tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;

-- Cho phép đọc đề thi công khai
CREATE POLICY "Allow public read tests" 
ON tests FOR SELECT 
USING (true);

-- Cho phép thêm đề thi công khai (hoặc qua Import AI)
CREATE POLICY "Allow public insert tests" 
ON tests FOR INSERT 
WITH CHECK (true);

-- Cho phép xóa đề thi (nếu cần quản lý)
CREATE POLICY "Allow public delete tests" 
ON tests FOR DELETE 
USING (true);

-- Cho phép lưu, cập nhật và đọc kết quả bài làm
CREATE POLICY "Allow public insert results" 
ON test_results FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public select results" 
ON test_results FOR SELECT 
USING (true);

CREATE POLICY "Allow public update results" 
ON test_results FOR UPDATE 
USING (true);

-- 3. Bảng lưu từ vựng Flashcards theo chủ đề (vocabulary_words)
CREATE TABLE IF NOT EXISTS vocabulary_words (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  category TEXT NOT NULL,          -- Chủ đề từ vựng (ví dụ: Academic Life, Ecology, History...)
  word TEXT NOT NULL,              -- Từ vựng tiếng Anh (ví dụ: significant)
  phonetic TEXT,                   -- Phiên âm IPA (ví dụ: /sɪɡˈnɪfɪkənt/)
  part_of_speech TEXT,             -- Loại từ (Word, noun, adj, verb...)
  meaning TEXT NOT NULL,           -- Nghĩa dễ nhớ (ví dụ: đáng kể, quan trọng)
  paraphrases JSONB,               -- Danh sách từ paraphrase (considerable, substantial...)
  collocations JSONB,              -- Cụm từ thường gặp (significant increase, significant impact...)
  example TEXT,                    -- Ví dụ TOEFL (The study found a significant increase in productivity.)
  example_translation TEXT,        -- Bản dịch ví dụ tiếng Việt
  sentence_paraphrase TEXT,        -- Paraphrase cả câu
  word_family JSONB,               -- Gia đình từ (significance (n.), significant (adj.)...)
  memory_tip TEXT,                 -- Mẹo nhớ
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(category, word)            -- Ràng buộc duy nhất: Chống trùng lặp từ trong cùng 1 chủ đề
);

-- Cấu hình Row Level Security (RLS) cho vocabulary_words
ALTER TABLE vocabulary_words ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read vocabulary_words" 
ON vocabulary_words FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert vocabulary_words" 
ON vocabulary_words FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update vocabulary_words" 
ON vocabulary_words FOR UPDATE 
USING (true);

CREATE POLICY "Allow public delete vocabulary_words" 
ON vocabulary_words FOR DELETE 
USING (true);

-- Cập nhật thêm các cột AI evaluations (chạy lệnh này nếu bảng test_results đã tạo từ trước)
ALTER TABLE test_results ADD COLUMN IF NOT EXISTS ai_writing_result JSONB;
ALTER TABLE test_results ADD COLUMN IF NOT EXISTS ai_speaking_result JSONB;
ALTER TABLE test_results ADD COLUMN IF NOT EXISTS ai_objective_result JSONB;
ALTER TABLE test_results ADD COLUMN IF NOT EXISTS ai_full_result JSONB;
ALTER TABLE test_results ADD COLUMN IF NOT EXISTS speaking_submissions JSONB;
ALTER TABLE test_results ADD COLUMN IF NOT EXISTS writing_submissions JSONB;

-- ====================================================================
-- ĐÃ XONG! Giờ bạn có thể import đề thi & từ vựng trực tiếp vào Supabase.
-- ====================================================================

