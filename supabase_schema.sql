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

-- Cho phép lưu và đọc kết quả bài làm
CREATE POLICY "Allow public insert results" 
ON test_results FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public select results" 
ON test_results FOR SELECT 
USING (true);

-- ====================================================================
-- ĐÃ XONG! Giờ bạn có thể import đề thi trực tiếp từ web vào Supabase.
-- ====================================================================
