# 🚀 LỘ TRÌNH PHÁT TRIỂN TÍNH NĂNG NỀN TẢNG TOEFL SMART 2026
*(Được tổng hợp từ nghiên cứu các nền tảng hàng đầu: TestGlider, ETS TestReady, TST Prep, KMF TOEFL & ELSA Speak)*

---

## 📌 MỤC TIÊU PHÁT TRIỂN
Xây dựng **TOEFL SMART 2026** trở thành hệ sinh thái luyện thi thông minh toàn diện, tập trung vào:
1. **Mô phỏng 100% định dạng đề thi TOEFL iBT 2026** (kỳ thi rút gọn 90 phút, cấu trúc câu hỏi mới).
2. **AI Chẩn đoán & Huấn luyện viên cá nhân hóa** (chữa lỗi câu văn, sửa phát âm, định hướng chiến thuật).
3. **Phương pháp học khoa học & chống quá tải** (Spaced Repetition, Micro-learning 5 phút, bài tập đúng trọng tâm).

---

## 🌟 TÍNH NĂNG TRỌNG TÂM ĐANG TRIỂN KHAI
### 🎯 Sổ Tay Lỗi Sai Thông Minh & Mini-Quiz 5 Phút (Smart Error Notebook & Mini-Quiz)
- **Cơ chế thu thập:** Tự động 100% trích xuất các câu làm sai sau mỗi bài thi Reading / Listening đưa vào Sổ tay.
- **AI Phân tích bẫy ETS:** Bóc tách nguyên nhân sai (bẫy từ đồng âm, bẫy suy diễn quá đà, bẫy thông tin đối lập) và đưa ra 1 câu quy tắc bỏ túi (Takeaway Rule).
- **Thuật toán Spaced Repetition (SRS):** Phân cấp 4 mức làm chủ (Level 0 → Level 3). Câu nào làm đúng 3 lần liên tiếp trong Mini-Quiz sẽ được đánh dấu `Đã làm chủ` và tự động ẩn đi, giúp danh sách cần ôn luôn tinh gọn (10 - 20 câu).
- **Mini-Quiz 5 phút:** 5 câu/lượt ôn nhanh mỗi ngày, có thể chọn chế độ ngẫu nhiên hoặc tập trung theo dạng bài yếu nhất.

---

## 📋 TOP 10 TÍNH NĂNG ĐỀ XUẤT NÂNG CẤP TIẾP THEO

### 🏛️ NHÓM 1: AI CHẨN ĐOÁN & PHÂN TÍCH CHUYÊN SÂU

#### 1. Heatmap Phát Âm & Tốc Độ Nói Speaking (Pronunciation & Fluency Heatmap)
- **Nguồn cảm hứng:** *TestGlider AI Speaking & ELSA Speak.*
- **Mô tả chi tiết:**
  - **Tô màu từng từ theo thang nhiệt độ (Heatmap):** Xanh lá *(chuẩn xác)*, Vàng *(chưa rõ âm đuôi / trọng âm lệch)*, Đỏ *(phát âm sai / nuốt âm)*.
  - **Đo tốc độ nói WPM (Words Per Minute):** Chuẩn ETS TOEFL dao động từ 120 – 150 từ/phút; cảnh báo nếu nói quá chậm (< 100 WPM) hoặc quá vội (> 170 WPM).
  - **Đếm từ ậm ừ (Filler Words Counter):** Thống kê số lần dùng *"uhm, ah, you know, like"* làm giảm điểm trôi chảy.

#### 2. Dự Đoán Điểm Thi Thật & Biểu Đồ Mạng Nhện (AI Score Predictor & Readiness Radar)
- **Nguồn cảm hứng:** *ETS TestReady (Score Range & Diagnostic Insights).*
- **Mô tả chi tiết:**
  - AI phân tích lịch sử các bài thi gần nhất để dự phóng **Khoảng điểm thi thật** (Ví dụ: `Overall 98 - 105 / 120` | R: 27, L: 26, W: 25, S: 24).
  - **Biểu đồ Radar (Mạng nhện) 6 trục:**
    1. Tốc độ đọc hiểu (Reading Speed)
    2. Năng lực bắt chi tiết bài nghe (Listening Details)
    3. Ngữ pháp & Cấu trúc câu viết (Grammar Accuracy)
    4. Độ phong phú vốn từ học thuật (Lexical Resource)
    5. Độ chuẩn xác phát âm & Ngữ điệu (Pronunciation & Intonation)
    6. Tư duy lập luận & Bố cục ý (Logical Coherence)

#### 3. Trợ Lý AI Gia Sư Đồng Hành Khi Chữa Đề (AI "Sidekick" Tutor - Chat with Passage)
- **Nguồn cảm hứng:** *GLIDY AI Chatbot trên TestGlider.*
- **Mô tả chi tiết:**
  - Khi xem lại bài đọc Reading hoặc Script bài nghe Listening, bên cạnh mỗi đoạn văn / câu hỏi xuất hiện nút **`[💬 Hỏi gia sư AI]`**.
  - Học viên có thể hỏi trực tiếp:
    - *"Tại sao câu này chọn B mà không phải C?"*
    - *"Dịch câu phức này sang tiếng Việt tự nhiên giúp tôi."*
    - *"Giải thích cấu trúc đảo ngữ trong đoạn 2."*
  - AI trả lời giải thích chi tiết tức thì trong 1 slide-over panel bên phải màn hình.

---

### 🎯 NHÓM 2: CÔNG CỤ LUYỆN TẬP THỰC CHIẾN & CHIẾN THUẬT

#### 4. Chế Độ Luyện Đề Tập Trung Theo Dạng Bài (Targeted Question-Type Drills)
- **Nguồn cảm hứng:** *KMF TOEFL & Magoosh Section Practice.*
- **Mô tả chi tiết:**
  - Cho phép học viên "cày sâu" đúng dạng bài mình đang yếu mà không phải giải cả bài thi 30 phút:
    - **Reading:** Luyện riêng 15 câu *Inference (Suy luận)* hoặc *Vocabulary in Context*.
    - **Listening:** Luyện riêng 10 câu dạng *Speaker's Attitude / Purpose*.
    - **Writing:** Luyện riêng 5 đề *Write an Email (7 phút)* hoặc *Academic Discussion (10 phút)*.
    - **Speaking:** Luyện riêng 15 câu *Repeat a sentence*.

#### 5. Kho Template Tương Tác & Cụm Từ "Ăn Điểm" (Interactive Template & Phrase Bank)
- **Nguồn cảm hứng:** *TST Prep Emergency Templates.*
- **Mô tả chi tiết:**
  - Cung cấp sẵn các bộ khung bài chuẩn điểm cao của cựu giám khảo ETS cho:
    - Writing Task 2 (Email): Mở đầu, Trình bày lý do, Đề xuất giải pháp, Lời kết lịch sự.
    - Writing Task 3 (Academic Discussion): Ghi nhận ý kiến bạn cùng lớp, Khẳng định quan điểm bản thân, Triển khai dẫn chứng cá nhân.
    - Speaking Task 2 (Interview): Công thức 3 bước trả lời phỏng vấn.
  - Cho phép học viên click chọn nhanh các cụm từ kết nối và dàn ý mẫu để ghép vào bài một cách trực quan.

#### 6. Chế Độ Luyện Nghe Chép Chính Tả Từng Câu (Dictation & Audio Shadowing)
- **Nguồn cảm hứng:** *KMF Listening & DailyDictation.*
- **Mô tả chi tiết:**
  - Cắt audio bài nghe Listening thành từng câu ngắn (3 - 8 giây).
  - Học viên nghe và gõ lại trên bàn phím; hệ thống đối chiếu từng chữ cái theo thời gian thực và bôi đỏ những từ nghe sót / nghe nhầm.
  - Hỗ trợ công cụ **Lặp lại đoạn A-B** và tùy chỉnh tốc độ phát (0.8x, 1.0x, 1.2x).

#### 7. Thư Viện Bài Mẫu Điểm Tuyệt Đối & So Sánh Song Song (Band 30/30 Benchmark Library)
- **Nguồn cảm hứng:** *BestMyTest & TST Prep.*
- **Mô tả chi tiết:**
  - Mỗi đề Writing và Speaking trong hệ thống đi kèm 1 bài làm mẫu đạt Band 5.0 - 6.0 (30/30).
  - Cung cấp chế độ **Split-Screen (So sánh song song)**:
    - Cột trái: Bài làm thực tế của học viên.
    - Cột phải: Bản viết mẫu Band 30/30 cùng nhận xét của AI chỉ rõ những điểm khác biệt về từ vựng, độ mượt mà và cách lập luận.

---

### 📈 NHÓM 3: QUẢN LÝ TIẾN TRÌNH & DUY TRÌ ĐỘNG LỰC

#### 8. Phân Tích Tốc Độ Làm Bài Từng Câu (Pacing & Time Analytics)
- **Nguồn cảm hứng:** *Magoosh & PrepScholar.*
- **Mô tả chi tiết:**
  - Barem TOEFL 2026 tạo áp lực thời gian lớn (~1.5 phút/câu Reading).
  - Hệ thống tự động ghi nhận số giây học viên dừng lại ở từng câu hỏi:
    - Gắn nhãn cảnh báo: *Câu làm đúng nhưng mất > 2.5 phút (Tốn quá nhiều thời gian)* hoặc *Câu làm sai chỉ sau 15 giây (Đọc ẩu / Chọn bừa)*.
    - Cung cấp biểu đồ nhịp độ thời gian để học viên rèn luyện phân bổ thời gian hợp lý.

#### 9. Lộ Trình Ôn Thi Cá Nhân Hóa & Chuỗi Ngày Học (Daily Study Mission & Streak)
- **Nguồn cảm hứng:** *ETS TestReady "Activity of the Day" & Duolingo/Magoosh Streak.*
- **Mô tả chi tiết:**
  - Học viên nhập: *Mục tiêu điểm (ví dụ: 100+), Ngày thi thật (ví dụ: còn 40 ngày), Thời gian học/ngày*.
  - Mỗi ngày vào web, trang chủ xuất hiện thẻ: **"Nhiệm vụ hôm nay (Today's Mission)"** gồm 3 việc nhỏ:
    - *1 bài Reading ngắn (10 phút)*
    - *1 Mini-quiz 5 câu sai (5 phút)*
    - *Học 15 từ vựng mới (5 phút)*
  - Hiển thị chuỗi ngày học liên tục (Streak 🔥) tạo thói quen học tập bền bỉ hàng ngày.

#### 10. Xuất Báo Cáo Kết Quả & Kế Hoạch Ôn Tập Sang File PDF (1-Click PDF Report Export)
- **Nguồn cảm hứng:** *Hệ thống báo cáo thi thử khảo thí chuyên nghiệp.*
- **Mô tả chi tiết:**
  - Tại trang kết quả thi hoặc trang cá nhân, học viên bấm nút **`[📄 Xuất báo cáo PDF]`**.
  - Hệ thống tự động biên soạn 1 file PDF được định dạng đẹp mắt gồm:
    - Bảng điểm chuẩn ETS từng kỹ năng.
    - 4 tiêu chí rubric và phân tích điểm mạnh / lỗ hổng.
    - Danh sách câu hỏi sai quan trọng kèm giải thích.
    - Lời khuyên chiến thuật từ AI Examiner để in ra giấy hoặc gửi cho giáo viên xem xét.

---

## 📊 BẢNG MA TRẬN ĐÁNH GIÁ & LỘ TRÌNH ĐỀ XUẤT

| STT | Tính năng | Độ phức tạp kỹ thuật | Mức độ ưu tiên | Giá trị trực tiếp cho người học |
| :---: | :--- | :---: | :---: | :--- |
| **0** | **Sổ tay lỗi sai & Mini-Quiz** | Vừa | **P0 (Đang làm)** | ⭐⭐⭐⭐⭐ Sửa triệt để các lỗi sai thường gặp |
| **1** | **AI Sidekick Tutor (Hỏi gia sư AI)** | Nhẹ | **P1 (Nên làm sớm)** | ⭐⭐⭐⭐⭐ Giải đáp thắc mắc tức thì trong bài đọc/nghe |
| **2** | **Luyện tập theo dạng bài (Targeted Drills)** | Vừa | **P1 (Nên làm sớm)** | ⭐⭐⭐⭐⭐ Tập trung cày dạng bài còn yếu |
| **3** | **Kho Template tương tác Writing/Speaking** | Nhẹ | **P2** | ⭐⭐⭐⭐ Cung cấp khung sườn ăn điểm nhanh |
| **4** | **Heatmap Phát âm & Tốc độ Speaking** | Nâng cao | **P2** | ⭐⭐⭐⭐ Đột phá cho kỹ năng nói tự học |
| **5** | **Dự đoán điểm thi thật & Radar năng lực** | Vừa | **P2** | ⭐⭐⭐⭐ Định hướng mục tiêu rõ ràng |
| **6** | **Chép chính tả & Shadowing từng câu** | Vừa | **P3** | ⭐⭐⭐⭐ Tăng phản xạ nghe sâu cho bài Listening |
| **7** | **Thư viện bài mẫu 30/30 song song** | Nhẹ | **P3** | ⭐⭐⭐ Tham khảo cách hành văn chuẩn bản xứ |
| **8** | **Phân tích tốc độ làm bài (Pacing)** | Nhẹ | **P3** | ⭐⭐⭐ Rèn luyện chiến thuật phân bổ thời gian |
| **9** | **Lộ trình cá nhân hóa & Daily Streak** | Vừa | **P4** | ⭐⭐⭐ Duy trì động lực học tập mỗi ngày |
| **10** | **Xuất báo cáo kết quả sang PDF** | Nhẹ | **P4** | ⭐⭐⭐ Lưu trữ và chia sẻ tiện lợi |

---
*Tài liệu được cập nhật ngày: 25/09/2026 vào thư mục dự án TOEFL SMART.*
