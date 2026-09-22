# 🦉 TOEFL SMART (Format 2026) - Web Luyện Thi Thích Ứng

Ứng dụng web tự luyện thi TOEFL iBT 4 kỹ năng (Listening, Reading, Writing, Speaking) theo chuẩn **TOEFL iBT 2026** mới nhất (thời lượng rút ngắn ~90 phút, thang điểm Band 1.0 – 6.0).

---

## 🌟 Tính Năng Nổi Bật

1. **Giao diện chuẩn TOEFL SMART:** 
   * 4 Card Kỹ năng nổi bật: Listening (Xanh dương), Reading (Cam gạch), Speaking (Xanh rêu), Writing (Đỏ mận).
   * Bố cục thẻ đề thi 2 cột kèm nút `[Take Practice Test]`.
2. **Đồng hồ đếm ngược theo từng Module:**
   * Tính giờ chính xác cho từng phần thi (cảnh báo đổi màu đỏ khi còn dưới 30 giây).
   * Tự động nộp bài và khóa thao tác khi hết thời gian quy định.
3. **Hỗ trợ đầy đủ các dạng bài mới 2026:**
   * **Reading:** Dạng bài *Complete the Words* (điền chữ cái còn thiếu vào từ) và *Academic Passage* (đọc hiểu 2 cột).
   * **Listening:** Dạng bài *Listen & Choose a Response* (phản xạ giao tiếp), *Announcement*, *Conversation* kèm trình phát âm thanh và sóng âm động.
   * **Writing:** Dạng bài *Build a Sentence* (ghép cụm từ thành câu chuẩn), *Write an Email* và *Academic Discussion* kèm bộ đếm số từ trực tiếp (Word Counter).
   * **Speaking:** Mô phỏng quy trình thi thật: Thời gian chuẩn bị (*Preparation Time: 15s*) $\rightarrow$ Tự động kích hoạt micro thu âm (*Speaking Time: 45s*) $\rightarrow$ Nghe lại bản thu âm của mình.
4. **Hệ thống Chấm điểm & Review chi tiết:**
   * Tự động quy đổi sang thang điểm **Band 1.0 – 6.0** (chuẩn 2026) và thang điểm truyền thống **0 – 30**.
   * Hiển thị bảng phân tích chi tiết: Đáp án bạn chọn, đáp án đúng, và lời giải thích chuyên sâu.
   * Hiệu ứng pháo hoa chúc mừng khi hoàn thành bài thi.
5. **Tích hợp Supabase (Không cần Backend):**
   * Lưu trữ đề thi và lịch sử làm bài vĩnh viễn trên Supabase Cloud.
   * Có chế độ dự phòng Offline (LocalStorage) để chạy ngay lập tức mà không cần cấu hình trước.
6. **Import Đề thi từ AI (Batch Import):**
   * Nhập 1 lần hàng chục đề thi dạng JSON do AI (ChatGPT, Gemini, Claude) tạo ra.
   * Cung cấp sẵn Prompt chuẩn để AI xuất đề đúng định dạng.

---

## 🚀 Hướng Dẫn Khởi Chạy Nhanh

### 1. Khởi động Web trên máy tính
Trong thư mục dự án, chạy lệnh:
```bash
npm run dev
```
Sau đó mở trình duyệt tại địa chỉ: `http://localhost:5173`

---

## 🗄️ Hướng Dẫn Kết Nối Supabase (0đ Chi Phí)

1. Truy cập [Supabase.com](https://supabase.com) và tạo một dự án miễn phí.
2. Vào mục **SQL Editor** trong bảng điều khiển Supabase, mở file `supabase_schema.sql` trong mã nguồn này, copy toàn bộ nội dung và bấm **Run**.
3. Vào mục **Project Settings** $\rightarrow$ **API** trên Supabase, lấy 2 thông tin:
   * **Project URL**
   * **anon public key**
4. Trên giao diện web TOEFL SMART, bấm vào nút **Local Mode / Cấu hình Supabase** (góc trên bên phải), dán URL và Key vào rồi bấm **Lưu cấu hình**.
5. Bấm nút **"Đồng bộ bộ đề mẫu 2026 lên Supabase"** để nạp sẵn đề vào database của bạn!

---

## 🤖 Hướng Dẫn Dùng AI Tạo Đề Thi Nhanh

Bấm vào nút **"Import Đề AI"** trên thanh menu, bấm **Copy Prompt**, dán vào ChatGPT hoặc Gemini. Sau khi AI xuất mã JSON, dán lại vào web và bấm **Import Đề** là bạn đã có ngay đề thi mới để luyện tập!
