-- ====================================================================
-- TOEFL SMART 2026 - SUPABASE DATABASE SCHEMA
-- Hướng dẫn: Dán toàn bộ nội dung file này vào SQL Editor trên Supabase và bấm Run
-- ====================================================================

-- 1. Bảng lưu danh sách Đề thi (tests)
-- Cột 'content' lưu cấu trúc JSON linh hoạt của từng dạng bài (Reading, Listening, Writing, Speaking, Full Test)
CREATE TABLE IF NOT EXISTS tests (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  skill TEXT NOT NULL CHECK (skill IN ('listening', 'reading', 'speaking', 'writing', 'full', 'full_test')),
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

-- Cho phép cập nhật đề thi công khai (bắt buộc để lệnh upsert hoạt động)
CREATE POLICY "Allow public update tests" 
ON tests FOR UPDATE 
USING (true);

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

-- 4. Bảng lưu lịch sử luyện tập Speaking & Luyện đề nhỏ (exam_history)
CREATE TABLE IF NOT EXISTS exam_history (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  test_id TEXT NOT NULL,
  score NUMERIC,
  total NUMERIC,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Cấu hình Row Level Security (RLS) cho exam_history
ALTER TABLE exam_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read exam_history" 
ON exam_history FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert exam_history" 
ON exam_history FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update exam_history" 
ON exam_history FOR UPDATE 
USING (true);

CREATE POLICY "Allow public delete exam_history" 
ON exam_history FOR DELETE 
USING (true);

-- 6. Bảng lưu ngân hàng câu hỏi Từ vựng theo ngữ cảnh (context_vocab_questions)
CREATE TABLE IF NOT EXISTS context_vocab_questions (
  id TEXT PRIMARY KEY,
  title TEXT,
  topic TEXT,
  target_word TEXT,
  paragraph_index INTEGER,
  passage TEXT,
  question TEXT,
  options JSONB,
  correct_answer TEXT,
  clue_type TEXT,
  clue_signal TEXT,
  explanation TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE context_vocab_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read context_vocab_questions" 
ON context_vocab_questions FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert context_vocab_questions" 
ON context_vocab_questions FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update context_vocab_questions" 
ON context_vocab_questions FOR UPDATE 
USING (true);

CREATE POLICY "Allow public delete context_vocab_questions" 
ON context_vocab_questions FOR DELETE 
USING (true);

-- 7. Bảng lưu Sổ tay ghi chú học tập & cheatsheets (study_notes)
CREATE TABLE IF NOT EXISTS study_notes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  summary TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  original_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE study_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read study_notes" 
ON study_notes FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert study_notes" 
ON study_notes FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update study_notes" 
ON study_notes FOR UPDATE 
USING (true);

CREATE POLICY "Allow public delete study_notes" 
ON study_notes FOR DELETE 
USING (true);

-- 8. Bảng lưu Kho Bài Viết Mẫu Writing (writing_samples)
CREATE TABLE IF NOT EXISTS writing_samples (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('email', 'discussion')),
  title TEXT NOT NULL,
  topic_category TEXT,
  source_type TEXT DEFAULT 'external_upload',
  target_band TEXT DEFAULT '5.5+ / 6.0',
  prompt JSONB NOT NULL,
  model_essay TEXT NOT NULL,
  word_count INTEGER,
  vocabulary_highlights JSONB DEFAULT '[]'::jsonb,
  structure_analysis TEXT,
  user_original_response JSONB,
  personal_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE writing_samples ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read writing_samples" 
ON writing_samples FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert writing_samples" 
ON writing_samples FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update writing_samples" 
ON writing_samples FOR UPDATE 
USING (true);

CREATE POLICY "Allow public delete writing_samples" 
ON writing_samples FOR DELETE 
USING (true);

-- ====================================================================
-- ĐÃ XONG! Giờ bạn có thể import đề thi, từ vựng, sổ tay & kho bài mẫu vào Supabase.
-- ====================================================================

