/**
 * ====================================================================
 * TOEFL iBT 2026 AI EXAM GENERATION MASTER PROMPTS
 * Bộ Prompts Chuẩn ETS 2026 Tối Ưu Hóa Chuyên Sâu Cho Việc Tạo Đề AI
 * ====================================================================
 */

// ====================================================================
// 1. READING FULL TEST PROMPT (2 ADAPTIVE MODULES - 30 MINS)
// ====================================================================
export const SAMPLE_READING_PROMPT = `Hãy đóng vai **chuyên gia thiết kế và luyện thi TOEFL iBT 2026 ở cấp độ chuyên sâu**, có nhiệm vụ tạo một bài **FULL TOEFL iBT Reading Practice Test** mô phỏng bài thi thật ở mức cao nhất có thể.

## MỤC TIÊU QUAN TRỌNG NHẤT

Đề được tạo ra phải mô phỏng **FORMAT + DIFFICULTY + QUESTION DESIGN + LANGUAGE LEVEL + TIME PRESSURE** của bài thi TOEFL iBT 2026 thực tế.

Tuyệt đối KHÔNG tạo một bài Reading chỉ mang phong cách TOEFL chung chung hoặc dễ hơn đề thật.

---

## BƯỚC 1 — BẮT BUỘC NGHIÊN CỨU FORMAT TOEFL iBT 2026 TRƯỚC KHI RA ĐỀ

Cấu trúc TOEFL iBT Reading áp dụng trong năm 2026:
* 2 Adaptive Modules: Module 1 (15 phút / 900 giây) và Module 2 (15 phút / 900 giây), tổng 30 phút (1800 giây).
* Mỗi Module gồm đúng 3 tasks theo đúng thứ tự:
  1. Task 1: Complete the Words (C-Test học thuật)
  2. Task 2: Read in Daily Life (Văn bản thông báo khuôn viên đại học)
  3. Task 3: Academic Passage (Bài đọc học thuật chuyên sâu)

---

# BƯỚC 2 — TIÊU CHUẨN ĐỊNH LƯỢNG & NGUYÊN TẮC CỐT LÕI (BẮT BUỘC TUÂN THỦ 100%)

⚠️ ĐÂY LÀ QUY TẮC SỐNG CÒN ĐỂ ĐỀ KHÔNG BỊ QUÁ DỄ HOẶC QUÁ NGẮN:

### 1. TASK 1: COMPLETE THE WORDS (C-TEST HỌC THUẬT)
* **Độ dài đoạn văn**: BẮT BUỘC từ **80 đến 110 từ** (khoảng 4 đến 6 câu phức học thuật liên kết chặt chẽ).
* **CÂU ĐẦU TIÊN CỦA ĐOẠN VĂN: BẮT BUỘC 100% NGUYÊN VẸN, KHÔNG CÓ BẤT KỲ BLANK NÀO (0 BLANKS)** để thiết lập chủ đề và bối cảnh học thuật cho thí sinh.
* **TỪ CÂU THỨ 2 ĐẾN CÂU CUỐI**: Phải tạo **CHÍNH XÁC từ 10 đến 12 blanks** ('b1' đến 'b10' hoặc 'b12'). TUYỆT ĐỐI KHÔNG CHỈ TẠO 2-3 CÂU ĐƠN GIẢN!
* **Quy tắc xóa từ**: Xóa nửa sau của từ nội dung: 'prefix[missing]' (ví dụ: 'gla[cial]', 'pro[vide]', 'insi[ghts]', 'compo[sition]', 'temper[ature]', 'extraor[dinary]').
* **Loại từ được chọn**: CHỈ chọn từ vựng nội dung học thuật (Academic Word List - AWL C1/C2) gồm danh từ, động từ, tính từ, trạng từ. TUYỆT ĐỐI KHÔNG xóa hư từ ngữ pháp ngắn ('in', 'of', 'to', 'is', 'the', 'at', 'on', 'by').
* **NGHIÊM CẤM CHỦ ĐỀ SƠ CẤP**: TUYỆT ĐỐI KHÔNG dùng chủ đề khoa học cấp 2 phổ thông (quang hợp/photosynthesis, chu trình nước/water cycle, pin mặt trời gia đình). PHẢI chọn chủ đề học thuật chuyên sâu đại học (Cổ khí hậu học - Paleoclimatology, Thần kinh học nhận thức - Cognitive Neuroscience, Địa hóa sinh - Geochemistry, Tiến hóa phôi học, Kinh tế học hành vi).
* 'paragraph', 'prefix', 'missing', và 'full' trong mảng 'blanks' phải hoàn toàn khớp chính xác 100%.

### 2. TASK 2: READ IN DAILY LIFE (VĂN BẢN KHUÔN VIÊN ĐẠI HỌC)
* **Độ dài văn bản**: BẮT BUỘC từ **120 đến 160 từ**.
* **Bối cảnh**: Văn bản quy chuẩn trong khuôn viên đại học Bắc Mỹ thực tế (Quy định an toàn sinh học phòng thí nghiệm, chính sách rút môn / hoàn học phí của phòng đào tạo, quy chế lưu chiểu luận văn sau đại học, thông báo bảo trì cơ sở hạ tầng nghiên cứu).
* **Số lượng câu hỏi**: BẮT BUỘC có **từ 3 đến 4 câu hỏi trắc nghiệm** (mỗi câu có 4 options A, B, C, D) bao gồm:
  - 1 câu hỏi Mục đích chính (Primary Communicative Purpose)
  - 1 câu hỏi Chi tiết quy định / Điều kiện tiên quyết (Specific Operational Detail / Requirement)
  - 1 câu hỏi Phủ định / Loại trừ (Negative Factual: "Which of the following is NOT required / prohibited...")
  - 1 câu hỏi Suy luận thực tế (Practical Implication / Next Step)

### 3. TASK 3: ACADEMIC PASSAGE (BÀI ĐỌC HỌC THUẬT CHUYÊN SÂU)
* **Độ dài văn bản**: BẮT BUỘC từ **250 đến 320 từ** (chia thành 2-3 đoạn văn học thuật đa tầng, có lập luận, dẫn chứng và luận điểm phản biện).
* **Văn phong**: Ngôn ngữ học thuật chuẩn mực (CEFR C1/C2), cấu trúc câu phức tạp (mệnh đề quan hệ, đảo ngữ, cấu trúc nhượng bộ, bị động nâng cao).
* **Số lượng câu hỏi**: BẮT BUỘC có **từ 5 đến 6 câu hỏi trắc nghiệm** (mỗi câu 4 options A, B, C, D) bao gồm các dạng ETS kinh điển:
  - 1 câu hỏi Ý chính toàn bài (Main Idea / Central Argument)
  - 2 câu hỏi Thông tin thực tế (Factual Information có paraphrasing cao, không chép nguyên văn)
  - 1 câu hỏi Phủ định thực tế (Negative Factual: "EXCEPT" hoặc "NOT mentioned")
  - 1 câu hỏi Từ vựng học thuật theo ngữ cảnh (Academic Vocabulary in Context)
  - 1 câu hỏi Suy luận sâu / Mục đích tu từ (Deep Inference hoặc Rhetorical Purpose: "Why does the author mention X in paragraph 2?")

---

# BƯỚC 3 — ADAPTIVE DESIGN: MODULE 1 & MODULE 2

### Module 1 (Chuẩn phân hóa - CEFR B2/C1)
* Độ khó chuẩn ETS, phân loại rõ rệt học viên. Đủ 3 tasks theo đúng định lượng ở Bước 2.

### Module 2 (Nhánh khó - Higher-Difficulty Route - CEFR C1/C2)
* Dành cho thí sinh đạt điểm cao ở Module 1.
* Phải thực sự khó hơn Module 1 thông qua:
  * Từ vựng C1-C2 học thuật trừu tượng hơn;
  * Cấu trúc câu có nhiều tầng phụ thuộc (syntactic complexity);
  * Mật độ thông tin dày đặc hơn (information density);
  * Câu hỏi suy luận đòi hỏi xâu chuỗi thông tin giữa các đoạn văn;
  * Phương án nhiễu (distractors) tinh vi hơn nhiều.

---

# BƯỚC 4 — DISTRACTOR QUALITY & PHÂN BỐ ĐÁP ÁN

* Các phương án sai (distractors) phải là **PLAUSIBLE DISTRACTORS** giống ETS thật:
  - Bẫy thông tin có thật trong bài nhưng không trả lời trọng tâm câu hỏi;
  - Bẫy khái quát hóa quá mức (overgeneralization: always, never, completely);
  - Bẫy đảo ngược quan hệ nhân quả (reversed cause-effect);
  - Bẫy paraphrase bị bóp méo ý nghĩa gốc;
  - Bẫy nhầm lẫn giữa hai chi tiết nằm gần nhau trong văn bản.
* **Phân bố đáp án**: 'correct_answer' phải được phân bố cân bằng giữa A, B, C, D (~25% mỗi chữ cái). Tuyệt đối không để toàn A hoặc B, không tạo pattern lặp lại.

---

# BƯỚC 4.5 — ⚠️ QUY TẮC TỐI QUAN TRỌNG: CHỦ ĐỀ & NỘI DUNG PHẢI HOÀN TOÀN MỚI

## 🚨 JSON MẪU DƯỚI ĐÂY CHỈ LÀ THAM CHIẾU CẤU TRÚC SCHEMA — TUYỆT ĐỐI KHÔNG ĐƯỢC SAO CHÉP, PARAPHRASE, HAY VIẾT LẠI NỘI DUNG TỪ JSON MẪU

* Nội dung JSON mẫu bên dưới (đoạn văn về Paleoclimatology, Ice cores, v.v.) **CHỈ để bạn hiểu định dạng dữ liệu cần trả về**, KHÔNG phải nguồn nội dung đề bài.
* **Mọi đoạn văn, câu hỏi, đáp án bạn tạo ra phải hoàn toàn khác biệt, độc lập, không liên quan đến bất kỳ chủ đề nào trong JSON mẫu.**

## 📚 NGÂN HÀNG CHỦ ĐỀ ĐA DẠNG — BẮT BUỘC TỰ CHỌN NGẪU NHIÊN

Bạn PHẢI tự nghiên cứu và lựa chọn **CHỦ ĐỀ HOÀN TOÀN MỚI** từ ngân hàng chủ đề đề thi TOEFL thực tế dưới đây (chọn ngẫu nhiên, KHÔNG lặp lại chủ đề giữa Task 1, 2, 3):

### Khoa học Tự nhiên & Vật lý:
Vật lý thiên văn (dark matter, neutron stars, gravitational lensing), Cơ học lượng tử ứng dụng, Địa chấn học & cấu trúc vỏ Trái Đất, Khí hậu học đại dương (thermohaline circulation), Sinh học tiến hóa phân tử (horizontal gene transfer), Sinh thái học vùng cực, Địa chất học magma

### Khoa học Nhận thức & Thần kinh học:
Neuroplasticity và học ngôn ngữ thứ hai, Cognitive load theory, Memory consolidation during sleep, Embodied cognition, Decision-making under uncertainty (Kahneman), Mirror neurons controversy

### Lịch sử, Khảo cổ & Nhân học:
Sụp đổ các nền văn minh cổ đại (Bronze Age Collapse, Maya, Angkor), Khảo cổ học dưới nước, Nguồn gốc nông nghiệp ở nhiều trung tâm độc lập, Di cư của người Homo sapiens ra khỏi châu Phi, Giao thương Silk Road và truyền bá công nghệ

### Kinh tế học & Xã hội học:
Behavioral economics (nudge theory, loss aversion), Urban economics (gentrification, housing policy), Vốn xã hội và mạng lưới cộng đồng, Game theory ứng dụng chính sách công, Kinh tế học thể chế (Acemoglu - inclusive vs extractive institutions)

### Triết học Khoa học & Lịch sử Tư tưởng:
Scientific revolutions (Kuhn's paradigm shifts), Falsificationism (Popper), Ethics of AI and algorithmic decision-making, Philosophy of language (Chomsky vs Skinner), Logic of discovery vs justification

### Nghệ thuật, Âm nhạc & Kiến trúc:
Nguồn gốc ngôn ngữ âm nhạc phổ quát, Kiến trúc gothic và không gian thiêng liêng, Hội họa trừu tượng và nhận thức thẩm mỹ, Truyền thống truyền miệng và ký ức tập thể

### Công nghệ & Đổi mới:
History of cryptography, CRISPR-Cas9 ethics, Renewable energy grid stability (intermittency problem), Machine learning bias in judicial systems, History of the internet protocol stack

**YÊU CẦU BẮT BUỘC**: Hãy chọn **3 chủ đề khác nhau hoàn toàn** cho Module 1 (Task 1, 2, 3) và **3 chủ đề khác nhau hoàn toàn** cho Module 2. Đảm bảo 6 chủ đề được chọn không trùng lặp nhau.

---

# BƯỚC 5 — JSON SCHEMA CHUẨN XÁC

⚠️ JSON bên dưới là **MẪU CẤU TRÚC DỮ LIỆU THUẦN TÚY** — bạn phải tuân theo đúng format keys/fields nhưng phải tự sáng tạo toàn bộ nội dung từ đầu với chủ đề bạn đã chọn ở Bước 4.5.

Xuất kết quả theo cấu trúc JSON chuẩn sau (Đảm bảo đầy đủ số câu và nội dung học thuật, KHÔNG ĐƯỢC CẮT BỚT):

[
  {
    "title": "Reading Full Test - DD/MM/YYYY - HH:mm",
    "skill": "reading",
    "duration_seconds": 1800,
    "stages": [
      {
        "id": "stage_1",
        "title": "Reading - Module 1 (Stage 1)",
        "duration_seconds": 900,
        "tasks": [
          {
            "id": "s1_t1",
            "title": "Task 1: Complete the Words",
            "task_type": "complete_words",
            "content": {
              "paragraph": "Paleoclimatologists reconstruct historical atmospheric patterns by extracting cylindrical ice cores from polar ice sheets. These gla[cial] records pro[vide] valuable insi[ghts] into anc[ient] atmospheric compo[sition] through trapped air bub[bles]. By meas[uring] isotope concen[trations], researchers can determ[ine] historical temper[ature] fluctuations with extraor[dinary] precision across millennia.",
              "blanks": [
                { "id": "b1", "prefix": "gla", "missing": "cial", "full": "glacial" },
                { "id": "b2", "prefix": "pro", "missing": "vide", "full": "provide" },
                { "id": "b3", "prefix": "insi", "missing": "ghts", "full": "insights" },
                { "id": "b4", "prefix": "anc", "missing": "ient", "full": "ancient" },
                { "id": "b5", "prefix": "compo", "missing": "sition", "full": "composition" },
                { "id": "b6", "prefix": "bub", "missing": "bles", "full": "bubbles" },
                { "id": "b7", "prefix": "meas", "missing": "uring", "full": "measuring" },
                { "id": "b8", "prefix": "concen", "missing": "trations", "full": "concentrations" },
                { "id": "b9", "prefix": "determ", "missing": "ine", "full": "determine" },
                { "id": "b10", "prefix": "temper", "missing": "ature", "full": "temperature" },
                { "id": "b11", "prefix": "extraor", "missing": "dinary", "full": "extraordinary" }
              ]
            }
          },
          {
            "id": "s1_t2",
            "title": "Task 2: Read in Daily Life",
            "task_type": "daily_life",
            "content": {
              "document_type": "University Laboratory Safety Protocol",
              "passage": "All researchers and postgraduate students utilizing the Molecular Chemistry Facility must complete mandatory annual hazardous materials certification prior to gaining swipe-card access. Laboratory sessions scheduled after 8:00 PM require a registered secondary researcher present on site under the departmental 'buddy system' policy. Chemical waste containers must be clearly labeled with structural formulas and dated immediately upon initial deposit. Non-compliance with solvent disposal protocols will result in a mandatory two-week suspension of bench privileges, and repeated infractions will be formally referred to the Academic Ethics Committee for administrative review.",
              "questions": [
                {
                  "id": "s1_t2_q1",
                  "prompt": "What is the primary operational objective of this document?",
                  "options": {
                    "A": "To announce new funding grants for postgraduate chemistry research",
                    "B": "To outline safety certification and compliance protocols for facility access",
                    "C": "To schedule dates for the upcoming Academic Ethics Committee hearings",
                    "D": "To recruit volunteer lab partners for evening experimental sessions"
                  },
                  "correct_answer": "B",
                  "explanation": "Văn bản quy định bắt buộc về chứng chỉ an toàn, quy chế làm việc buổi tối và hình thức kỷ luật khi vi phạm."
                },
                {
                  "id": "s1_t2_q2",
                  "prompt": "According to the protocol, under what circumstance is a researcher permitted to conduct experiments after 8:00 PM?",
                  "options": {
                    "A": "Only when working in solitary isolation to avoid noise distractions",
                    "B": "Only if accompanied by another registered researcher on the premises",
                    "C": "Provided they obtain verbal permission from campus security",
                    "D": "Whenever their annual certification exam has received top honors"
                  },
                  "correct_answer": "B",
                  "explanation": "Quy định nêu rõ phiên nghiên cứu sau 8:00 PM bắt buộc phải có 'registered secondary researcher present on site'."
                },
                {
                  "id": "s1_t2_q3",
                  "prompt": "Which of the following consequences directly results from an initial violation of solvent disposal rules?",
                  "options": {
                    "A": "Immediate expulsion from the graduate degree program",
                    "B": "A temporary two-week revocation of laboratory bench privileges",
                    "C": "A mandatory monetary penalty deducted from research stipends",
                    "D": "Permanent confiscation of building swipe-card credentials"
                  },
                  "correct_answer": "B",
                  "explanation": "Đoạn văn nêu rõ vi phạm lần đầu dẫn đến 'mandatory two-week suspension of bench privileges'."
                }
              ]
            }
          },
          {
            "id": "s1_t3",
            "title": "Task 3: Academic Passage",
            "task_type": "academic_passage",
            "content": {
              "document_type": "Paleontology & Evolutionary Biology",
              "passage": "The Cambrian explosion, occurring approximately 541 million years ago, denotes a seminal geochronological interval marked by the unprecedented morphological diversification of multicellular life. Prior to this epoch, the fossil record was dominated by the Ediacaran biota—predominantly soft-bodied, radially symmetrical organisms exhibiting limited locomotory capacity. Within a remarkably condensed geological timespan, nearly all contemporary animal body plans, including arthropods, chordates, and mollusks, emerged in marine strata. Evolutionary paleobiologists propose several synergistic hypotheses to account for this evolutionary acceleration. Geochemical analyses demonstrate a marked surge in atmospheric oxygen concentrations during the late Neoproterozoic, which likely satisfied the elevated metabolic demands essential for predatory active foraging and large-scale collagen synthesis. Furthermore, the advent of visual predatory mechanisms triggered an evolutionary 'arms race,' compelling prey species to develop protective biomineralized exoskeletons, which concurrently dramatically augmented their fossil preservation potential.",
              "questions": [
                {
                  "id": "s1_t3_q1",
                  "prompt": "Which of the following best expresses the main idea of the passage?",
                  "options": {
                    "A": "The Ediacaran biota possessed far more advanced predatory adaptations than previously acknowledged.",
                    "B": "The Cambrian explosion represented a sudden emergence of diverse anatomical forms driven by environmental and biological factors.",
                    "C": "Rising oceanic temperatures during the late Neoproterozoic caused widespread extinction among marine species.",
                    "D": "Fossil preservation remained relatively constant between the Ediacaran and Cambrian geological intervals."
                  },
                  "correct_answer": "B",
                  "explanation": "Bài đọc tổng kết sự xuất hiện đột ngột của các cấu trúc cơ thể động vật đa dạng nhờ sự kết hợp giữa oxy tăng và áp lực tiến hóa."
                },
                {
                  "id": "s1_t3_q2",
                  "prompt": "According to paragraph 1, how did Ediacaran organisms differ fundamentally from Cambrian organisms?",
                  "options": {
                    "A": "Ediacaran creatures possessed rigid biomineralized exoskeletons for armor.",
                    "B": "Ediacaran fauna were largely soft-bodied organisms with limited motility.",
                    "C": "Ediacaran species were active visual predators requiring vast oxygen stores.",
                    "D": "Ediacaran organisms were terrestrial rather than marine inhabitants."
                  },
                  "correct_answer": "B",
                  "explanation": "Đoạn 1 nêu sinh vật Ediacaran chủ yếu là 'predominantly soft-bodied, radially symmetrical organisms exhibiting limited locomotory capacity'."
                },
                {
                  "id": "s1_t3_q3",
                  "prompt": "The word 'synergistic' in the passage is closest in meaning to:",
                  "options": {
                    "A": "contradictory",
                    "B": "combined and mutually reinforcing",
                    "C": "unsubstantiated",
                    "D": "chronologically sequential"
                  },
                  "correct_answer": "B",
                  "explanation": "'Synergistic' nghĩa là có tính tương hỗ, cùng phối hợp tác động mạnh hơn tác động riêng lẻ."
                },
                {
                  "id": "s1_t3_q4",
                  "prompt": "Why does the author discuss the surge in atmospheric oxygen concentrations?",
                  "options": {
                    "A": "To prove that terrestrial animal life evolved before marine organisms",
                    "B": "To explain a physiological prerequisite for heightened metabolic and locomotory demands",
                    "C": "To refute the hypothesis that predation influenced evolutionary rates",
                    "D": "To show why biomineralized shells decayed rapidly in ancient oceans"
                  },
                  "correct_answer": "B",
                  "explanation": "Oxy tăng được nhắc đến để giải thích tiền đề chuyển hóa cho hoạt động săn mồi và tổng hợp collagen."
                },
                {
                  "id": "s1_t3_q5",
                  "prompt": "Which of the following can be inferred from the final sentence regarding biomineralized exoskeletons?",
                  "options": {
                    "A": "Organisms without biomineralized skeletons were less likely to leave enduring fossil evidence.",
                    "B": "Biomineralized armor rendered prey animals completely immune to predation.",
                    "C": "Predators developed exoskeletons long before prey species perceived any threat.",
                    "D": "The development of exoskeletons depleted the ocean of dissolved minerals."
                  },
                  "correct_answer": "A",
                  "explanation": "Câu cuối nêu bộ giáp khoáng hóa gia tăng đáng kể khả năng lưu trữ hóa thạch, suy ra sinh vật không có giáp ít được bảo tồn hơn."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "stage_2",
        "title": "Reading - Module 2 (Stage 2 - Adaptive Higher-Difficulty Route)",
        "duration_seconds": 900,
        "tasks": [
          {
            "id": "s2_t1",
            "title": "Task 1: Complete the Words",
            "task_type": "complete_words",
            "content": {
              "paragraph": "Cognitive neuroscientists investigate how synaptic plasticity underpins memory formation in the hippocampus. During memory consol[idation], persistent pat[terns] of synap[tic] firing stren[gthen] dendritic connec[tions] through long-term poten[tiation]. This neurobiol[ogical] mech[anism] ena[bles] the cerebral cor[tex] to store stabi[lized] representations indepen[dent] of immediate sensory sti[muli].",
              "blanks": [
                { "id": "b1", "prefix": "consol", "missing": "idation", "full": "consolidation" },
                { "id": "b2", "prefix": "pat", "missing": "terns", "full": "patterns" },
                { "id": "b3", "prefix": "synap", "missing": "tic", "full": "synaptic" },
                { "id": "b4", "prefix": "stren", "missing": "gthen", "full": "strengthen" },
                { "id": "b5", "prefix": "connec", "missing": "tions", "full": "connections" },
                { "id": "b6", "prefix": "poten", "missing": "tiation", "full": "potentiation" },
                { "id": "b7", "prefix": "neurobiol", "missing": "ogical", "full": "neurobiological" },
                { "id": "b8", "prefix": "mech", "missing": "anism", "full": "mechanism" },
                { "id": "b9", "prefix": "ena", "missing": "bles", "full": "enables" },
                { "id": "b10", "prefix": "cor", "missing": "tex", "full": "cortex" },
                { "id": "b11", "prefix": "stabi", "missing": "lized", "full": "stabilized" },
                { "id": "b12", "prefix": "indepen", "missing": "dent", "full": "independent" },
                { "id": "b13", "prefix": "sti", "missing": "muli", "full": "stimuli" }
              ]
            }
          },
          {
            "id": "s2_t2",
            "title": "Task 2: Read in Daily Life",
            "task_type": "daily_life",
            "content": {
              "document_type": "Graduate Thesis Archival & Embargo Directive",
              "passage": "All doctoral candidates must submit the finalized defense manuscript to the Institutional Repository no later than fourteen calendar days prior to the conferral ceremony. Candidates intending to file patent applications or commercialize intellectual property derived from their doctoral research may petition the Graduate Dean for a non-renewable twenty-four-month publication embargo. Such requests require written concurrence from the supervising faculty chair and must be formally endorsed prior to the final repository upload. Under no circumstance may an embargo request be retroactive once open-access digital dissemination has transpired. The metadata, including the dissertation abstract, will remain searchable unless explicit national security exemptions are granted by the University Office of General Counsel.",
              "questions": [
                {
                  "id": "s2_t2_q1",
                  "prompt": "What is the primary purpose of the directive?",
                  "options": {
                    "A": "To outline repository submission deadlines and procedures for intellectual property publication embargos",
                    "B": "To recruit peer reviewers for university doctoral defense panels",
                    "C": "To establish licensing fees for undergraduate commercial research ventures",
                    "D": "To cancel open-access academic repositories across university faculties"
                  },
                  "correct_answer": "A",
                  "explanation": "Văn bản hướng dẫn thời hạn nộp luận văn tiến sĩ và điều kiện xin tạm hoãn công khai (embargo) để bảo hộ sáng chế."
                },
                {
                  "id": "s2_t2_q2",
                  "prompt": "Which condition is strictly required to establish a 24-month publication embargo?",
                  "options": {
                    "A": "An endorsement submitted after the digital manuscript has been publicly disseminated",
                    "B": "Written concurrence from the supervising department chair prior to manuscript upload",
                    "C": "A minimum five-year extension granted by the undergraduate council",
                    "D": "Complete redaction of the thesis title and candidate name from library records"
                  },
                  "correct_answer": "B",
                  "explanation": "Quy chế nêu rõ cần 'written concurrence from the supervising faculty chair and must be formally endorsed prior to the final repository upload'."
                },
                {
                  "id": "s2_t2_q3",
                  "prompt": "According to the passage, under what condition would a dissertation abstract be concealed from public search?",
                  "options": {
                    "A": "Whenever a standard commercial embargo is granted",
                    "B": "Only if national security exemptions are authorized by the Office of General Counsel",
                    "C": "Upon request by any doctoral committee member",
                    "D": "Automatically whenever patent applications are pending"
                  },
                  "correct_answer": "B",
                  "explanation": "Bài đọc ghi: 'metadata, including abstract, will remain searchable unless explicit national security exemptions are granted'."
                }
              ]
            }
          },
          {
            "id": "s2_t3",
            "title": "Task 3: Academic Passage",
            "task_type": "academic_passage",
            "content": {
              "document_type": "Geochemistry & Planetary Science",
              "passage": "Planetary geochemists have long investigated the mechanisms that initiated Earth liquid outer core geodynamo, the convective process responsible for sustaining our geomagnetic protective shield. Conventional models posited that thermal convection alone, driven by initial planetary accretion heat, sufficed to drive the early dynamo. However, modern thermodynamic recalculations indicate that the core mantle boundary heat flux would have caused the liquid iron outer core to stratify, quenching thermal convection prematurely without an alternative energy driver. Recent experimental high-pressure diamond-anvil cell studies suggest that chemical exsolution of light elements provided the requisite buoyant forces. As the early core cooled, silicon and magnesium dissolved within molten iron exsolved at the core-mantle interface, precipitating upward into the lower mantle. This compositional buoyance propelled vigorous mechanical convection billions of years prior to the crystallization of the solid inner core. Consequently, this persistent chemical geodynamo shielded Earth early atmosphere from destructive solar wind ablation during the sun luminous adolescent phase.",
              "questions": [
                {
                  "id": "s2_t3_q1",
                  "prompt": "What primary discrepancy prompted scientists to reevaluate traditional geodynamo models?",
                  "options": {
                    "A": "Evidence that the solar wind was entirely absent in the early solar system",
                    "B": "Calculations revealing that thermal convection alone would have halted due to core stratification",
                    "C": "The discovery that the inner core crystallized immediately upon planetary accretion",
                    "D": "Inconsistencies in the fossil records of Ediacaran marine species"
                  },
                  "correct_answer": "B",
                  "explanation": "Đoạn văn chỉ rõ các tính toán nhiệt động lực học hiện đại cho thấy sự đối lưu nhiệt đơn thuần sẽ bị triệt tiêu do sự phân tầng của lõi sắt lỏng."
                },
                {
                  "id": "s2_t3_q2",
                  "prompt": "According to the passage, how did the exsolution of silicon and magnesium facilitate core convection?",
                  "options": {
                    "A": "By cooling the outer core to temperatures below absolute zero",
                    "B": "By generating compositional buoyancy as lighter elements separated and ascended toward the mantle",
                    "C": "By converting iron into gaseous isotopes that dissipated through the crust",
                    "D": "By permanently stopping all physical movement within the lower mantle"
                  },
                  "correct_answer": "B",
                  "explanation": "Bài đọc giải thích rằng sự tách của các nguyên tố nhẹ (silicon, magnesium) tạo ra lực nổi thành phần (compositional buoyance) đẩy dòng đối lưu cơ học."
                },
                {
                  "id": "s2_t3_q3",
                  "prompt": "The word 'quenching' in the passage is closest in meaning to:",
                  "options": {
                    "A": "suppressing or extinguishing",
                    "B": "accelerating uncontrollably",
                    "C": "magnifying substantially",
                    "D": "igniting spontaneously"
                  },
                  "correct_answer": "A",
                  "explanation": "'Quenching' trong ngữ cảnh này mang nghĩa dập tắt, triệt tiêu (suppressing or extinguishing) dòng đối lưu."
                },
                {
                  "id": "s2_t3_q4",
                  "prompt": "Which of the following is NOT supported by the passage regarding the early geodynamo?",
                  "options": {
                    "A": "It protected the primordial atmosphere from solar wind degradation.",
                    "B": "It operated long before the crystallization of the solid inner core occurred.",
                    "C": "It depended exclusively on thermal convection driven by planetary accretion heat throughout Earth history.",
                    "D": "It relied upon light element exsolution occurring at the core-mantle interface."
                  },
                  "correct_answer": "C",
                  "explanation": "Phương án C sai vì bài đọc nhấn mạnh đối lưu nhiệt đơn thuần KHÔNG THỂ duy trì liên tục và phải cần đối lưu hóa học bổ trợ."
                },
                {
                  "id": "s2_t3_q5",
                  "prompt": "What can be inferred about Earth early atmosphere if the chemical geodynamo had failed to operate?",
                  "options": {
                    "A": "It would have expanded exponentially into interplanetary space without restriction.",
                    "B": "It likely would have suffered extensive stripping and depletion due to intense solar radiation.",
                    "C": "It would have transformed instantly into pure liquid iron.",
                    "D": "It would have remained entirely unaffected by solar phenomena."
                  },
                  "correct_answer": "B",
                  "explanation": "Câu cuối nói nhờ có từ trường bảo vệ nên khí quyển không bị tước đi ('shielded atmosphere from destructive solar wind ablation'). Nếu không có, khí quyển sẽ bị bào mòn."
                }
              ]
            }
          }
        ]
      }
    ]
  }
]

---

# OUTPUT RULES — BẮT BUỘC

1. Chỉ trả về **JSON thuần túy**.
2. Không Markdown, không dùng \`\`\`json.
3. Không giải thích, không citation trong output.
4. JSON phải parse được trực tiếp.
5. Không được sử dụng ngoặc kép đôi " bên trong chuỗi text (dùng ngoặc đơn ').
6. 'correct_answer' phải được phân bố đều ~25% cho A, B, C, D.`;

// ====================================================================
// 2. LISTENING FULL TEST PROMPT (2 ADAPTIVE MODULES - 29 MINS)
// ====================================================================
export const SAMPLE_LISTENING_PROMPT = `Hãy đóng vai **chuyên gia thiết kế và luyện thi TOEFL iBT 2026 ở cấp độ chuyên sâu**, có nhiệm vụ tạo một bài **FULL TOEFL iBT Listening Practice Test** mô phỏng bài thi thật ở mức cao nhất có thể.

## MỤC TIÊU QUAN TRỌNG NHẤT

Đề được tạo ra phải mô phỏng **FORMAT + DIFFICULTY + QUESTION DESIGN + AUDIO SCRIPT AUTHENTICITY + TIME PRESSURE** của bài thi TOEFL iBT 2026 thực tế (2 Adaptive Modules - 29 phút / 1740 giây, 870s mỗi module).

Tuyệt đối KHÔNG tạo một bài Listening chỉ mang phong cách TOEFL chung chung hoặc dễ hơn đề thật.

---

## BƯỚC 1 — CẤU TRÚC 2 MODULE THÍCH ỨNG & ĐỊNH LƯỢNG BẮT BUỘC (MỖI MODULE ĐỦ 13 CÂU)

Mỗi Module (Module 1 và Module 2) BẮT BUỘC gồm đúng 4 tasks theo đúng thứ tự:
1. **Task 1: Listen & Choose a Response**: Đúng **5 câu trắc nghiệm** phản xạ giao tiếp ngắn trong khuôn viên đại học ('choose_response').
2. **Task 2: Campus Announcement**: Đúng **1 bài thông báo** khuôn viên trường ('announcement') kèm **2 câu hỏi trắc nghiệm**.
3. **Task 3: Campus Conversation**: Đúng **1 cuộc đối thoại học thuật** đa lượt giữa sinh viên và giáo sư / cố vấn ('conversation') kèm **3 câu hỏi trắc nghiệm**.
4. **Task 4: Academic Talk**: Đúng **1 bài giảng học thuật** của giáo sư ('academic_talk') kèm **3 câu hỏi trắc nghiệm**.

👉 **TỔNG CỘNG MỖI MODULE: ĐÚNG 13 CÂU HỎI. TOÀN BÀI 2 MODULES: ĐÚNG 26 CÂU HỎI.**
⚠️ TUYỆT ĐỐI KHÔNG ĐƯỢC RÚT GỌN CHỈ CÒN 1 CÂU MỖI TASK TRONG KẾT QUẢ ĐẦU RA!

---

# BƯỚC 2 — TIÊU CHUẨN ĐỘ DÀI & ĐỘ SÂU NỘI DUNG AUDIO SCRIPT

### 1. Task 1: Choose a Response (5 câu mỗi module)
* Mỗi câu là một phát ngôn ngắn (audio_text) tự nhiên của sinh viên hoặc cán bộ trường (thắc mắc về giờ mượn sách chuyên khảo, chính sách bảo lưu điểm môn học, thủ tục đăng ký seminar, quy định sử dụng máy tính phòng lab).
* Đáp án đúng: Phản hồi chuẩn mực ngữ dụng (pragmatic competence), tự nhiên, trực tiếp hoặc gián tiếp logic.
* 3 Distractors: Bẫy từ đồng âm, bẫy lặp lại từ khóa nhưng trả lời sai trọng tâm, hoặc phản hồi bất lịch sự / sai ngữ cảnh.

### 2. Task 2: Campus Announcement (2 câu mỗi module)
* **Độ dài audio_text**: BẮT BUỘC từ **90 đến 130 từ**.
* Người phát biểu ('speaker'): Trưởng phòng đào tạo, giám đốc cơ sở vật chất, thủ thư trưởng, điều phối viên y tế học đường.
* Câu hỏi 1: Mục đích chính của thông báo (Primary communicative purpose).
* Câu hỏi 2: Chi tiết hành động / Thời hạn / Điều kiện bắt buộc (Specific actionable requirement / deadline).

### 3. Task 3: Campus Conversation (3 câu mỗi module)
* **Độ dài audio_text**: BẮT BUỘC từ **180 đến 250 từ** (đối thoại đa lượt có chiều sâu giữa Sinh viên và Giáo sư / Cố vấn học thuật).
* Nội dung: Xử lý tình huống học thuật thực tế (thắc mắc tiêu chí chấm bài nghiên cứu, xin thư giới thiệu thực tập viện nghiên cứu, giải quyết vấn đề trùng lịch thi thực hành hóa sinh).
* Câu hỏi 1: Lý do sinh viên đến gặp giáo sư / Vấn đề cốt lõi.
* Câu hỏi 2: Giải pháp hoặc lời khuyên cụ thể mà giáo sư đưa ra.
* Câu hỏi 3: Thái độ của nhân vật hoặc suy luận bước tiếp theo (Inference / Attitude).

### 4. Task 4: Academic Talk (3 câu mỗi module)
* **Độ dài audio_text**: BẮT BUỘC từ **180 đến 260 từ** (bài giảng học thuật cô đọng của giáo sư đại học).
* Chủ đề học thuật chuẩn ETS: Sinh học biển (Marine Ecology), Cổ sinh vật học, Thiên văn vật lý (Astrophysics), Khảo cổ học thực nghiệm, Khoa học nhận thức.
* Câu hỏi 1: Ý chính / Hiện tượng khoa học trung tâm của bài giảng.
* Câu hỏi 2: Cơ chế vận hành hoặc giải thích bằng chứng thực nghiệm.
* Câu hỏi 3: Mục đích tu từ của giáo sư khi đưa ra một ví dụ cụ thể (Rhetorical purpose / Function).

---

# BƯỚC 3 — ADAPTIVE DESIGN & DISTRACTOR QUALITY

* **Module 1**: Chuẩn CEFR B2/C1, tốc độ nói tự nhiên, câu hỏi rõ ràng.
* **Module 2 (Nhánh khó - Higher Route)**: Đạt chuẩn CEFR C1/C2. Mật độ thông tin bài giảng dày đặc hơn, hàm ý hội thoại tinh tế hơn, và các phương án nhiễu có bẫy bắt từ khóa (word-spotting traps) cực kỳ khéo léo. Thí sinh chỉ nghe lướt từ khóa mà không hiểu ý toàn câu chắc chắn sẽ chọn sai.
* **Phân bố đáp án**: 'correct_answer' phải được phân bố cân bằng giữa A, B, C, D (~25% mỗi chữ cái).

---

# BƯỚC 3.5 — ⚠️ QUY TẮC TỐI QUAN TRỌNG: CHỦ ĐỀ & NỘI DUNG PHẢI HOÀN TOÀN MỚI

## 🚨 JSON MẪU DƯỚI ĐÂY CHỈ LÀ THAM CHIẾU CẤU TRÚC SCHEMA — TUYỆT ĐỐI KHÔNG SAO CHÉP, PARAPHRASE HAY VIẾT LẠI NỘI DUNG TỪ JSON MẪU

* Nội dung JSON mẫu bên dưới (hội thoại về thư viện, autoclave, history seminar...) **CHỈ để bạn hiểu định dạng dữ liệu keys/fields**, KHÔNG phải nội dung đề bài.
* **Mọi audio_text, hội thoại, bài giảng và câu hỏi phải hoàn toàn khác biệt, mới mẻ, không liên quan đến bất kỳ chủ đề hay tình huống nào trong JSON mẫu.**

## 📚 NGÂN HÀNG CHỦ ĐỀ LISTENING ĐA DẠNG — BẮT BUỘC TỰ CHỌN NGẪU NHIÊN

Tạo nội dung mới từ ngân hàng chủ đề đề thi TOEFL Listening thực tế:

### Task 1 - Choose a Response (Tình huống khuôn viên đại học):
Xin tư vấn về chuyên ngành kép, hoàn phí học bổng, lịch bảo vệ đề cương, nộp đơn học bổng nghiên cứu, hoãn thi vì lý do y tế, sử dụng phần mềm chuyên ngành, đăng ký thực tập, kỹ thuật thiết bị nghiên cứu, đặt chỗ phòng hội thảo, hỏi về quyền sử dụng dữ liệu nghiên cứu

### Task 2 - Campus Announcement (Thông báo đa dạng):
Chính sách mới thư viện liên quan AI tools, khai trương trung tâm hỗ trợ nghiên cứu sinh, thay đổi lịch phòng lab chia sẻ, chương trình mentoring ngang hàng, cải tạo không gian làm việc nhóm, hội chợ nghề nghiệp theo ngành, chính sách an toàn sinh học phòng lab, khai trương dịch vụ hỗ trợ sức khỏe tâm thần, thông báo chương trình trao đổi sinh viên quốc tế

### Task 3 - Campus Conversation (Hội thoại học thuật):
Thảo luận phương pháp luận nghiên cứu với giáo sư, tư vấn lộ trình học sau đại học, diễn giải số liệu thống kê với trợ giảng, xung đột giữa kết quả thực nghiệm và lý thuyết, submit paper hội nghị khoa học, tính hợp lệ nguồn trích dẫn trong luận văn, thương lượng gia hạn nộp luận văn, xin tham gia nhóm nghiên cứu của giáo sư

### Task 4 - Academic Talk (Bài giảng đại học đa ngành — chọn ngẫu nhiên hoàn toàn):
Khoa học thần kinh về cơ chế quên có chọn lọc, nguồn gốc ngôn ngữ loài người, kiến tạo mảng và subduction zone, cognitive biases trong kinh tế hành vi, sự xuất hiện tính đa bào, xác định niên đại carbon, vật chất tối và năng lượng tối, nghi lễ ghi nhớ văn hóa, cách mạng Copernicus, biomimicry trong công nghệ vật liệu, quang học lượng tử, lịch sử dịch tễ học, nền kinh tế sáng tạo, đạo đức triết học về trí tuệ nhân tạo

**YÊU CẦU BẮT BUỘC**: Chủ đề Task 4 của Module 1 và Module 2 phải hoàn toàn khác nhau. Mỗi tình huống Task 1 trong cùng một module phải xoay quanh các vấn đề khác nhau.

---

# BƯỚC 4 — JSON SCHEMA CHUẨN XÁC

⚠️ JSON bên dưới là **MẪU CẤU TRÚC DỮ LIỆU THUẦN TÚY** — tuân theo đúng format keys/fields nhưng phải tự sáng tạo toàn bộ nội dung từ đầu với chủ đề bạn đã chọn ở Bước 3.5.

Xuất kết quả theo cấu trúc JSON chuẩn sau:

[
  {
    "title": "Listening Full Test - DD/MM/YYYY - HH:mm",
    "skill": "listening",
    "duration_seconds": 1740,
    "stages": [
      {
        "id": "list_stage_1",
        "title": "Listening - Module 1 (Stage 1)",
        "duration_seconds": 870,
        "tasks": [
          {
            "id": "l1_t1",
            "title": "Task 1: Listen & Choose a Response (5 câu)",
            "task_type": "choose_response",
            "content": {
              "questions": [
                {
                  "id": "l1_q1",
                  "type": "choose_response",
                  "audio_text": "Do you happen to know whether the biology department library is open over the holiday weekend?",
                  "prompt": "Select the most appropriate response to what you heard:",
                  "options": {
                    "A": "Biology reference texts are located on the mezzanine level.",
                    "B": "Yes, but they are operating on reduced hours from noon to five.",
                    "C": "I usually borrow three books at a time for my coursework.",
                    "D": "The chemistry lab was completely renovated last semester."
                  },
                  "correct_answer": "B",
                  "explanation": "Câu hỏi hỏi về giờ mở cửa dịp lễ. Câu B trả lời trực tiếp và chính xác."
                },
                {
                  "id": "l1_q2",
                  "type": "choose_response",
                  "audio_text": "I was wondering if Professor Vance accepts walk-ins during office hours or if appointments are mandatory?",
                  "prompt": "Select the most appropriate response to what you heard:",
                  "options": {
                    "A": "She prefers students to book online, but she will see you if no one is waiting.",
                    "B": "The lecture hall accommodates approximately three hundred students.",
                    "C": "Her syllabus was distributed during the introductory lecture.",
                    "D": "She has been teaching organic chemistry for nearly a decade."
                  },
                  "correct_answer": "A",
                  "explanation": "Câu A giải đáp thỏa đáng thắc mắc về quy định gặp mặt của giáo sư."
                },
                {
                  "id": "l1_q3",
                  "type": "choose_response",
                  "audio_text": "Has anyone submitted the group project proposal to the departmental portal yet?",
                  "prompt": "Select the most appropriate response to what you heard:",
                  "options": {
                    "A": "The departmental office is situated on the second floor.",
                    "B": "Elena uploaded the finalized draft right before the midnight deadline.",
                    "C": "Our group consists of four undergraduate researchers.",
                    "D": "The project rubric requires at least fifteen academic citations."
                  },
                  "correct_answer": "B",
                  "explanation": "Câu B xác nhận tình trạng đã nộp bản thảo dự án nhóm."
                },
                {
                  "id": "l1_q4",
                  "type": "choose_response",
                  "audio_text": "Could you help me troubleshoot why the laboratory autoclave keeps displaying an error code?",
                  "prompt": "Select the most appropriate response to what you heard:",
                  "options": {
                    "A": "We sterilize glassware every Tuesday morning.",
                    "B": "You probably forgot to seal the secondary pressure release valve tightly.",
                    "C": "The autoclave was purchased from a medical equipment supplier.",
                    "D": "Laboratory coats are compulsory in all testing facilities."
                  },
                  "correct_answer": "B",
                  "explanation": "Câu B giải thích nguyên nhân kỹ thuật gây ra mã lỗi trên thiết bị."
                },
                {
                  "id": "l1_q5",
                  "type": "choose_response",
                  "audio_text": "Would you mind if I borrowed your lecture notes from yesterday modern European history seminar?",
                  "prompt": "Select the most appropriate response to what you heard:",
                  "options": {
                    "A": "The history seminar meets twice weekly in Wilson Hall.",
                    "B": "Not at all, provided you return them before our study group session tonight.",
                    "C": "The midterm exam covers chapters five through eight.",
                    "D": "I am majoring in international relations and political philosophy."
                  },
                  "correct_answer": "B",
                  "explanation": "Câu B đưa ra phản hồi đồng ý lịch sự kèm điều kiện trả trước buổi học nhóm."
                }
              ]
            }
          },
          {
            "id": "l1_t2",
            "title": "Task 2: Campus Announcement",
            "task_type": "announcement",
            "content": {
              "context_title": "Campus Notice: Molecular Biology Laboratory Ventilation Maintenance",
              "speaker": "Director of Campus Facilities & Laboratory Safety",
              "audio_text": "Attention all researchers and graduate students using the Molecular Biology Complex in the North Wing. Beginning this Friday at 6:00 PM, the central chemical fume hood exhaust ventilation system will undergo comprehensive diagnostic recalibration and filter replacement. Consequently, all experimental procedures involving volatile reagents, organic solvents, or biohazardous aerosols must cease promptly by 5:00 PM on Friday. The facility will remain under complete containment shutdown throughout the entire weekend. Swipe-card door access will be temporarily deactivated until Monday at 7:00 AM, when normal operations resume following air purity validation. We apologize for the scheduled disruption and request that all active cell cultures be safely incubated beforehand.",
              "questions": [
                {
                  "id": "l1_t2_q1",
                  "prompt": "What is the primary purpose of the announcement?",
                  "options": {
                    "A": "To recruit graduate students for air quality testing positions",
                    "B": "To announce a temporary weekend closure for laboratory ventilation maintenance",
                    "C": "To solicit funding for advanced molecular biology research equipment",
                    "D": "To introduce new protocols for permanent biohazard disposal"
                  },
                  "correct_answer": "B",
                  "explanation": "Thông báo thông tin về việc đóng cửa phòng thí nghiệm cuối tuần để bảo trì hệ thống thông gió."
                },
                {
                  "id": "l1_t2_q2",
                  "prompt": "What mandatory requirement must researchers fulfill by Friday at 5:00 PM?",
                  "options": {
                    "A": "Permanently discard all ongoing bacterial cell cultures",
                    "B": "Cease all experimental procedures involving volatile or hazardous materials",
                    "C": "Submit a formal petition to the facilities management office",
                    "D": "Surrender their physical swipe-card access credentials"
                  },
                  "correct_answer": "B",
                  "explanation": "Thông báo yêu cầu dừng mọi thí nghiệm sử dụng hóa chất bay hơi hoặc sol khí trước 5:00 PM."
                }
              ]
            }
          },
          {
            "id": "l1_t3",
            "title": "Task 3: Campus Conversation",
            "task_type": "conversation",
            "content": {
              "context_title": "Student & Professor: Honors Thesis Methodology Revision",
              "speaker": "Student (Marcus) & Professor Davies",
              "audio_text": "Student: Professor Davies, thank you for meeting with me on short notice. I have hit a significant obstacle with my honors thesis methodology. Originally, I planned to collect longitudinal survey data from undergraduate volunteers regarding digital media consumption and sleep quality. But after three weeks, only twenty-five participants completed the daily sleep logs.\n\nProfessor Davies: That is a common hurdle with longitudinal self-reporting, Marcus. Twenty-five subjects will not provide sufficient statistical power for regression modeling. What alternatives have you considered?\n\nStudent: Well, I could either extend the data collection period into the spring semester, which might delay my graduation defense, or pivot toward analyzing an existing open-access epidemiological dataset, like the National Adolescent Health database.\n\nProfessor Davies: I strongly recommend utilizing the open-access database. It already contains verified biometric sleep tracking data from over two thousand subjects. You can adapt your original hypothesis and focus your analytical skills on multivariate statistical analysis. You would still finish your thesis well ahead of the May defense deadline.\n\nStudent: That is a tremendous relief! I will download the codebook today and revise my methodology chapter accordingly.",
              "questions": [
                {
                  "id": "l1_t3_q1",
                  "prompt": "What is the primary problem the student brings to Professor Davies?",
                  "options": {
                    "A": "His thesis topic was formally rejected by the department head.",
                    "B": "Low volunteer participation resulted in an inadequate sample size for his methodology.",
                    "C": "He failed to register for graduation before the official spring deadline.",
                    "D": "The statistical software on his computer corrupted his survey responses."
                  },
                  "correct_answer": "B",
                  "explanation": "Sinh viên gặp khó khăn vì lượng người tham gia khảo sát quá ít (25 người), không đủ quy mô mẫu để phân tích thống kê."
                },
                {
                  "id": "l1_t3_q2",
                  "prompt": "What course of action does Professor Davies recommend?",
                  "options": {
                    "A": "Postponing graduation until additional survey responses are collected",
                    "B": "Transitioning to analyze an existing public epidemiological dataset",
                    "C": "Discarding biometric sleep metrics entirely to write a purely theoretical paper",
                    "D": "Conducting in-person interviews with the current twenty-five participants"
                  },
                  "correct_answer": "B",
                  "explanation": "Giáo sư khuyên chuyển sang khai thác bộ dữ liệu dịch tễ học công khai có sẵn hơn 2000 mẫu để kịp tiến độ tốt nghiệp."
                },
                {
                  "id": "l1_t3_q3",
                  "prompt": "How does the student feel about the professor recommendation at the end of the meeting?",
                  "options": {
                    "A": "Skeptical that the proposed dataset will answer his original questions",
                    "B": "Relieved and eager to immediately review the new dataset documentation",
                    "C": "Disappointed that his original experimental survey cannot continue",
                    "D": "Confused about how multivariate statistical models operate"
                  },
                  "correct_answer": "B",
                  "explanation": "Sinh viên thốt lên 'That is a tremendous relief!' và dự định tải tài liệu hướng dẫn mã dữ liệu ngay trong ngày."
                }
              ]
            }
          },
          {
            "id": "l1_t4",
            "title": "Task 4: Academic Talk (Marine Ecology)",
            "task_type": "academic_talk",
            "content": {
              "context_title": "Lecture: Chemosynthesis in Deep-Sea Hydrothermal Vent Ecosystems",
              "speaker": "Professor of Biological Oceanography",
              "audio_text": "Good afternoon, class. Today we will explore hydrothermal vent ecosystems along tectonic mid-ocean ridges. Until their discovery in 1977, biological dogma asserted that virtually all complex life ultimately derived metabolic energy from solar radiation via photosynthesis. Hydrothermal vents shattered that assumption completely. In these aphotic abyssal zones, where sunlight cannot penetrate, vibrant biotic communities thrive around fissures discharging superheated mineral-rich fluids. The trophic foundation of this entire biome rests not on sunlight, but on chemosynthesis executed by specialized autotrophic bacteria. These microbes oxidize toxic hydrogen sulfide emitting from the vents, transforming chemical bond energy into organic carbohydrates. Remarkable symbiotic relationships have evolved around this process. For instance, the giant tube worm, Riftia pachyptila, possesses neither a mouth nor a digestive tract. Instead, its specialized organ—the trophosome—is densely packed with billions of sulfur-oxidizing bacteria. The worm vascular system transports sulfide and oxygen to the bacteria, which in return synthesize the nutrients essential for the worm survival. This represents an astonishing metabolic adaptation to an extreme environment.",
              "questions": [
                {
                  "id": "l1_t4_q1",
                  "prompt": "What long-standing biological assumption did the discovery of hydrothermal vents disprove?",
                  "options": {
                    "A": "That marine organisms could survive without dissolved oxygen",
                    "B": "That all complex biological communities ultimately rely on solar energy",
                    "C": "That tectonic mid-ocean ridges remain completely geologically dormant",
                    "D": "That bacterial symbiosis is impossible in high-pressure environments"
                  },
                  "correct_answer": "B",
                  "explanation": "Bài giảng nhấn mạnh phát hiện miệng phun thủy nhiệt đã bác bỏ quan niệm sinh học lâu đời rằng mọi sự sống phức tạp đều bắt nguồn từ năng lượng mặt trời."
                },
                {
                  "id": "l1_t4_q2",
                  "prompt": "How do autotrophic bacteria at hydrothermal vents produce organic compounds?",
                  "options": {
                    "A": "By filtering ambient nutrients drifting downward from the ocean surface",
                    "B": "By oxidizing hydrogen sulfide emitted from geothermal fissures",
                    "C": "By absorbing infrared radiation emitted by superheated basalt rock",
                    "D": "By decomposing skeletal remnants of prehistoric marine reptiles"
                  },
                  "correct_answer": "B",
                  "explanation": "Vi khuẩn hóa tự dưỡng oxy hóa khí độc hydrogen sulfide từ miệng phun thủy nhiệt để tổng hợp chất hữu cơ."
                },
                {
                  "id": "l1_t4_q3",
                  "prompt": "Why does the professor describe the anatomy of the giant tube worm Riftia pachyptila?",
                  "options": {
                    "A": "To illustrate a specialized symbiotic reliance on internal chemosynthetic microbes",
                    "B": "To argue that tube worms are primitive ancestors of terrestrial annelids",
                    "C": "To demonstrate the harmful effects of volcanic sulfur on marine invertebrates",
                    "D": "To show how deep-sea predators consume hydrothermal mineral deposits"
                  },
                  "correct_answer": "A",
                  "explanation": "Giáo sư lấy ví dụ giun ống khổng lồ không có miệng hay dạ dày mà phụ thuộc hoàn toàn vào vi khuẩn trong thể trophosome để minh họa cho mối quan hệ cộng sinh đặc biệt."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "list_stage_2",
        "title": "Listening - Module 2 (Stage 2 - Adaptive Higher-Difficulty Route)",
        "duration_seconds": 870,
        "tasks": [
          {
            "id": "l2_m2_t1",
            "title": "Task 1: Listen & Choose a Response (5 câu)",
            "task_type": "choose_response",
            "content": {
              "questions": [
                {
                  "id": "l2_m2_q1",
                  "type": "choose_response",
                  "audio_text": "Do you know if the department fellowship application requires three letters of recommendation or two?",
                  "prompt": "Select the most appropriate response to what you heard:",
                  "options": {
                    "A": "Fellowship awards are disbursed during the autumn semester.",
                    "B": "The portal specifies two academic references and one professional endorsement.",
                    "C": "Letters of recommendation must be printed on official letterhead.",
                    "D": "The application portal was designed by computer engineering students."
                  },
                  "correct_answer": "B",
                  "explanation": "Câu B trả lời chính xác và chi tiết yêu cầu về thư giới thiệu."
                },
                {
                  "id": "l2_m2_q2",
                  "type": "choose_response",
                  "audio_text": "I am concerned that our spectrophotometer calibration curve might be skewed due to solvent contamination.",
                  "prompt": "Select the most appropriate response to what you heard:",
                  "options": {
                    "A": "Let us prepare a fresh blank standard solution and re-measure the baseline absorbance.",
                    "B": "The chemistry laboratory was built forty years ago.",
                    "C": "The spectrophotometer weighs approximately twenty kilograms.",
                    "D": "Analytical chemistry courses are offered every spring semester."
                  },
                  "correct_answer": "A",
                  "explanation": "Câu A đưa ra giải pháp kỹ thuật phù hợp với sự cố lệch đường cong hiệu chuẩn."
                },
                {
                  "id": "l2_m2_q3",
                  "type": "choose_response",
                  "audio_text": "Were you able to obtain permission from the institutional review board for your psychology experiment?",
                  "prompt": "Select the most appropriate response to what you heard:",
                  "options": {
                    "A": "Psychology majors must complete sixty semester hours of core coursework.",
                    "B": "Yes, we received expedited approval after modifying our participant debriefing protocol.",
                    "C": "The review board convenes on the third Wednesday of every month.",
                    "D": "Our experimental cohort consists entirely of senior undergraduates."
                  },
                  "correct_answer": "B",
                  "explanation": "Câu B thông báo kết quả phê duyệt đạo đức nghiên cứu kèm chi tiết điều chỉnh."
                },
                {
                  "id": "l2_m2_q4",
                  "type": "choose_response",
                  "audio_text": "Should we reserve the seminar room for two hours or extend it to three for the thesis defense?",
                  "prompt": "Select the most appropriate response to what you heard:",
                  "options": {
                    "A": "Three hours is safer because faculty deliberations can frequently take longer than anticipated.",
                    "B": "The seminar room is equipped with an overhead digital projector.",
                    "C": "Thesis defense presentations are open to all department graduate students.",
                    "D": "Dr. Anderson serves as the chair of the thesis evaluation committee."
                  },
                  "correct_answer": "A",
                  "explanation": "Câu A đưa ra nhận định thực tế hợp lý về thời gian kéo dài phiên hội đồng chấm luận văn."
                },
                {
                  "id": "l2_m2_q5",
                  "type": "choose_response",
                  "audio_text": "Do you happen to recall whether Dr. Henderson posted the supplementary readings on the course dashboard?",
                  "prompt": "Select the most appropriate response to what you heard:",
                  "options": {
                    "A": "He announced he would upload the journal articles by five this afternoon.",
                    "B": "The bookstore charges twenty dollars for the course syllabus packet.",
                    "C": "Supplementary readings are optional for non-degree seeking students.",
                    "D": "The course dashboard is hosted on a secure cloud server."
                  },
                  "correct_answer": "A",
                  "explanation": "Câu A cung cấp thông tin cập nhật về thời gian tải tài liệu đọc thêm."
                }
              ]
            }
          },
          {
            "id": "l2_m2_t2",
            "title": "Task 2: Campus Announcement",
            "task_type": "announcement",
            "content": {
              "context_title": "Campus Notice: High-Performance Computing Cluster Scheduled Migration",
              "speaker": "Chief Information Officer & Research Infrastructure Director",
              "audio_text": "Attention all faculty, postdoctoral scholars, and graduate researchers utilizing the university High-Performance Computing cluster, known as Orion. To accommodate escalating computational modeling demands across computational biology, astrophysics, and climate modeling, Orion will undergo complete system architecture migration starting Saturday, October 14th at 8:00 AM through Sunday at 11:59 PM. During this 40-hour maintenance window, all active batch processing jobs will be forcefully terminated unless checkpointed in advance. Researchers must ensure that iterative simulations write checkpoint state files prior to Friday midnight to prevent catastrophic data loss. Furthermore, the external file transfer protocol nodes will be entirely inaccessible. Normal computational batch queues will reopen on Monday at 6:00 AM with double the existing GPU processing nodes available. We appreciate your cooperation in facilitating this critical infrastructure enhancement.",
              "questions": [
                {
                  "id": "l2_m2_t2_q1",
                  "prompt": "What is the primary purpose of the computing cluster shutdown?",
                  "options": {
                    "A": "To terminate all unauthorized research simulation programs permanently",
                    "B": "To perform system migration and install expanded high-performance computational hardware",
                    "C": "To reassign computing resources exclusively to undergraduate coursework",
                    "D": "To audit energy consumption metrics across university server centers"
                  },
                  "correct_answer": "B",
                  "explanation": "Mục đích chính là chuyển đổi kiến trúc hệ thống và nâng cấp cụm máy tính hiệu năng cao."
                },
                {
                  "id": "l2_m2_t2_q2",
                  "prompt": "What precaution must researchers take before Friday midnight to protect their active simulations?",
                  "options": {
                    "A": "Transfer all program scripts to physical external hard drives",
                    "B": "Ensure iterative calculations write checkpoint state files before the cutoff",
                    "C": "Request an individualized exemption from the Chief Information Officer",
                    "D": "Relocate their simulation queues to external university servers"
                  },
                  "correct_answer": "B",
                  "explanation": "Nhà nghiên cứu bắt buộc phải lưu file checkpoint trước nửa đêm thứ 6 để tránh mất dữ liệu khi hệ thống ngắt đột ngột."
                }
              ]
            }
          },
          {
            "id": "l2_m2_t3",
            "title": "Task 3: Campus Conversation",
            "task_type": "conversation",
            "content": {
              "context_title": "Student & Senior Lab Director: Mass Spectrometry Anomaly & Protocol Revision",
              "speaker": "Graduate Student (Chloe) & Dr. Ramirez (Senior Lab Director)",
              "audio_text": "Student: Dr. Ramirez, do you have a few minutes? During our isotopic chromatography runs this morning, our mass spectrometer produced erratic baseline drift and anomalous retention peaks across our synthesized organic samples.\n\nDr. Ramirez: That sounds concerning, Chloe. Did you inspect the ionization chamber before injecting the batch, or did you rely on yesterday calibration baseline?\n\nStudent: Well, we performed the automatic diagnostic wash, but we did not manually clean the electrospray ionization needle. We were rushing to complete the batch before our afternoon seminar.\n\nDr. Ramirez: Ah, that explains the anomaly. Residual non-volatile polymers from yesterday synthetic peptide trial likely precipitated onto the capillary emitter, interfering with ion desorption and producing those ghost retention peaks. Rushing complex instrumentation protocol always costs more time in the long run.\n\nStudent: I see... So our current spectral readings are completely compromised?\n\nDr. Ramirez: Unfortunately, yes. You will need to disassemble the ion source, sonicate the emitter needle in high-purity methanol, and re-run a five-point standard calibration before testing any further samples. Take your time and document every step in the equipment logbook.\n\nStudent: Understood, Dr. Ramirez. I will cancel our afternoon testing schedule and overhaul the ionization source immediately.",
              "questions": [
                {
                  "id": "l2_m2_t3_q1",
                  "prompt": "What caused the erroneous readings on the mass spectrometer?",
                  "options": {
                    "A": "A sudden mechanical malfunction in the laboratory refrigeration unit",
                    "B": "Contaminant residue left on the ionization needle due to an omitted manual cleaning step",
                    "C": "Incompatible software updates installed on the analytical computer",
                    "D": "Expired chemical reagent bottles utilized during sample synthesis"
                  },
                  "correct_answer": "B",
                  "explanation": "Nguyên nhân do cặn polyme từ thí nghiệm hôm trước bám vào kim phun ion do sinh viên bỏ qua bước lau rửa thủ công."
                },
                {
                  "id": "l2_m2_t3_q2",
                  "prompt": "What does Dr. Ramirez advise Chloe to do with her current experimental data?",
                  "options": {
                    "A": "Use statistical algorithms to smooth out the anomalous baseline peaks",
                    "B": "Discard the contaminated readings and rerun the trials after thorough equipment maintenance",
                    "C": "Submit the preliminary results immediately to the department evaluation committee",
                    "D": "Transfer the samples to another university testing facility without modification"
                  },
                  "correct_answer": "B",
                  "explanation": "Giáo sư khẳng định dữ liệu hiện tại bị hỏng hoàn toàn ('completely compromised') và yêu cầu làm sạch máy rồi đo lại từ đầu."
                },
                {
                  "id": "l2_m2_t3_q3",
                  "prompt": "What broader lesson does Dr. Ramirez emphasize regarding laboratory conduct?",
                  "options": {
                    "A": "Advanced instrumentation should only be operated by tenured faculty members.",
                    "B": "Rushing instrument protocols inevitably wastes more time than it saves.",
                    "C": "Diagnostic software washes are completely useless in chemical research.",
                    "D": "Seminars should take priority over daily laboratory experimental duties."
                  },
                  "correct_answer": "B",
                  "explanation": "Tiến sĩ Ramirez nhấn mạnh: 'Rushing complex instrumentation protocol always costs more time in the long run'."
                }
              ]
            }
          },
          {
            "id": "l2_m2_t4",
            "title": "Task 4: Academic Talk (Astrophysics)",
            "task_type": "academic_talk",
            "content": {
              "context_title": "Lecture: Gravitational Lensing as a Probe for Dark Matter Mapping",
              "speaker": "Professor of Astrophysics",
              "audio_text": "Welcome back. Today we delve into gravitational lensing, an observational phenomenon originating directly from Einstein general theory of relativity. Einstein posited that mass curves spacetime; consequently, when light emitted from a distant luminous source—such as a background quasar—traverses the gravitational potential well of an intervening massive object, its trajectory deflects. When the intervening lens is a massive galaxy cluster, this deflection produces distinct observational manifestations: distorted arclets, magnified multiple images, and luminous Einstein rings. What makes gravitational lensing extraordinary for contemporary cosmology is its utility as an impartial cosmic balance scale. Luminous matter—stars, interstellar dust, and ionized gas—accounts for merely fifteen percent of the total gravitational mass observed in galaxy clusters. By mathematically reconstructing the deflection geometry of lensed background light, astrophysicists can map the spatial distribution of the remaining eighty-five percent: elusive, non-baryonic dark matter. A seminal illustration is the Bullet Cluster. When two massive clusters collided, X-ray imaging demonstrated that normal baryonic gas collided and decelerated in the center due to electromagnetic friction. However, gravitational lensing revealed that the center of mass passed straight through unhindered, proving that dark matter interacts almost exclusively via gravity.",
              "questions": [
                {
                  "id": "l2_m2_t4_q1",
                  "prompt": "According to the lecture, what physical mechanism causes gravitational lensing?",
                  "options": {
                    "A": "Electromagnetic absorption of light waves passing through interstellar gas clouds",
                    "B": "The curvature of spacetime induced by the mass of an intervening cosmic object",
                    "C": "Intense nuclear fusion reactions occurring on the surfaces of background quasars",
                    "D": "Thermal fluctuations within the cosmic microwave background radiation"
                  },
                  "correct_answer": "B",
                  "explanation": "Cơ chế là do độ cong không thời gian (curvature of spacetime) sinh ra bởi khối lượng của thiên hà/cụm thiên hà chắn giữa đường đi của ánh sáng."
                },
                {
                  "id": "l2_m2_t4_q2",
                  "prompt": "Why is gravitational lensing uniquely valuable for investigating dark matter?",
                  "options": {
                    "A": "It converts non-baryonic particles into observable visual spectrum light.",
                    "B": "It allows astrophysicists to determine total mass distribution independent of whether matter emits light.",
                    "C": "It demonstrates that dark matter is composed entirely of ionized interstellar gas.",
                    "D": "It accelerates cosmic expansion within distant elliptical galaxies."
                  },
                  "correct_answer": "B",
                  "explanation": "Thấu kính hấp dẫn giúp đo lường và vẽ bản đồ phân bố tổng khối lượng độc lập với việc vật chất đó có phát sáng hay không."
                },
                {
                  "id": "l2_m2_t4_q3",
                  "prompt": "What key insight was derived from observations of the Bullet Cluster collision?",
                  "options": {
                    "A": "Baryonic gas and dark matter collided and fused together in the center.",
                    "B": "Dark matter exhibited no electromagnetic drag, passing unhindered past the decelerated baryonic gas.",
                    "C": "Gravitational lensing effects disappeared completely during galactic collisions.",
                    "D": "General relativity fails to predict gravitational interactions at cluster scales."
                  },
                  "correct_answer": "B",
                  "explanation": "Quan sát Bullet Cluster cho thấy khí thường bị hãm lại do ma sát điện từ, trong khi vật chất tối đi xuyên qua tự do mà không bị cản trở."
                }
              ]
            }
          }
        ]
      }
    ]
  }
]

---

# OUTPUT RULES — BẮT BUỘC

1. Chỉ trả về **JSON thuần túy**.
2. Không Markdown, không dùng \`\`\`json.
3. Không giải thích, không citation trong output.
4. JSON phải parse được trực tiếp.
5. Không được sử dụng ngoặc kép đôi " bên trong chuỗi text (dùng ngoặc đơn ').
6. Mỗi module BẮT BUỘC đủ 13 câu (5 choose_response, 2 announcement, 3 conversation, 3 academic_talk).
7. 'correct_answer' phải được phân bố đều ~25% cho A, B, C, D.`;

// ====================================================================
// 3. WRITING FULL TEST PROMPT (LINEAR - 3 TASKS - 23 MINS)
// ====================================================================
export const SAMPLE_WRITING_PROMPT = `Hãy đóng vai **chuyên gia thiết kế và luyện thi TOEFL iBT 2026 ở cấp độ chuyên sâu**, có nhiệm vụ tạo một bài **FULL TOEFL iBT Writing Practice Test** chuẩn ETS 2026 mô phỏng bài thi thật ở mức cao nhất có thể.

## MỤC TIÊU QUAN TRỌNG NHẤT

Đề được tạo ra phải mô phỏng **FORMAT + DIFFICULTY + TASK RUBRIC + LANGUAGE LEVEL + TIME PRESSURE** của bài thi TOEFL iBT Writing 2026 thực tế (Linear - 23 phút / 1380 giây, gồm đúng 3 tasks).

Tuyệt đối KHÔNG tạo một bài Writing chỉ mang phong cách TOEFL chung chung hoặc dễ hơn đề thật.

---

## BƯỚC 1 — CẤU TRÚC 3 TASKS BẮT BUỘC (23 PHÚT / 1380 GIÂY)

* **Task 1: Build a Sentence** (Hoàn thiện câu / Ghép câu: BẮT BUỘC ĐỦ **10 câu trắc nghiệm** tương tác sắp xếp từ, có câu thoại ngữ cảnh ban đầu và các từ bẫy decoys, thời lượng đề xuất ~7 phút).
* **Task 2: Write an Email** (Viết email phản hồi tình huống học thuật/khuôn viên trường, bắt buộc có đúng **3 yêu cầu cụ thể**, độ dài tối thiểu 80 từ, khuyến nghị 100 - 130 từ, thời lượng đề xuất ~7 phút).
* **Task 3: Academic Discussion** (Thảo luận học thuật trực tuyến: có giáo sư nêu câu hỏi kích thích tư duy phản biện và **2 sinh viên** nêu quan điểm đối lập, độ dài tối thiểu 100 từ, khuyến nghị 100 - 150 từ, thời lượng đề xuất ~10 phút).

---

# BƯỚC 2 — QUY TẮC BẮT BUỘC KHẮC KHE CHO TASK 1: BUILD A SENTENCE (10 ITEMS)

⚠️ TUYỆT ĐỐI TUÂN THỦ CÁC QUY TẮC SAU ĐỂ HỆ THỐNG GIAO DIỆN HOẠT ĐỘNG HOÀN HẢO:
1. **BẮT BUỘC TẠO ĐỦ 10 CÂU TỪ 'item1' ĐẾN 'item10'**. Không được dừng lại sau 1-2 câu!
2. **TẤT CẢ các từ trong 'scrambled', 'correct_order', 'decoys' BẮT BUỘC PHẢI VIẾT THƯỜNG TOÀN BỘ (lowercase)**.
3. **TUYỆT ĐỐI KHÔNG viết hoa chữ cái đầu tiên của câu** (ví dụ: viết 'the', 'she', 'because', 'although' chứ KHÔNG ĐƯỢC viết 'The', 'She', 'Because', 'Although') để không làm lộ từ mở đầu cho thí sinh!
4. **Thứ tự các từ trong mảng 'scrambled' BẮT BUỘC PHẢI ĐẢO LỘN XỘN NGẪU NHIÊN HOÀN TOÀN**, tuyệt đối không để các từ theo thứ tự câu.
5. **Mỗi câu phải kèm 2-3 từ bẫy ('decoys') viết thường**, có ngữ pháp hoặc nghĩa tương tự để thử thách học viên.
6. **Các phần tử trong 'scrambled', 'correct_order', 'decoys' CHỈ LÀ TỪ VỰNG THUẦN TÚY, TUYỆT ĐỐI KHÔNG chứa dấu câu** (không kèm '.', '?', '!', ',', '"').
7. **TẤT CẢ các từ trong 'correct_order' BẮT BUỘC PHẢI CÓ MẶT trong mảng 'scrambled'** (tổng số lượng từ trong 'scrambled' = số từ trong 'correct_order' + số từ trong 'decoys').
8. **10 CÂU PHẢI BAO GỒM 10 CẤU TRÚC NGỮ PHÁP HỌC THUẬT NÂNG CAO (CEFR B2-C1)**:
   - Câu 1: Mệnh đề quan hệ / Noun clause ('what surprised the researchers was...')
   - Câu 2: Đảo ngữ với phó từ phủ định ('seldom have scientists observed such...')
   - Câu 3: Mệnh đề phân từ rút gọn ('having analyzed the chromatographic data thoroughly, she...')
   - Câu 4: Đảo ngữ câu điều kiện không dùng if ('had the equipment been calibrated accurately...')
   - Câu 5: Cleft sentence nhấn mạnh ('it was the sudden atmospheric pressure drop that...')
   - Câu 6: Câu bị động phức với động từ tường thuật ('the artifact is widely considered to represent...')
   - Câu 7: Cấu trúc so sánh kép ('the more rigorous the methodology, the more reliable...')
   - Câu 8: Mệnh đề nhượng bộ nâng cao ('despite having encountered severe budget restrictions...')
   - Câu 9: Cụm danh động từ / phân từ làm chủ ngữ ('mastering multivariate regression models requires...')
   - Câu 10: Mệnh đề danh từ làm bổ ngữ ('the committee reached the consensus that...')

---

# BƯỚC 3 — QUY TẮC CHO TASK 2 (EMAIL) & TASK 3 (DISCUSSION)

* **Task 2 (Write an Email)**:
  - Bối cảnh: Giao tiếp đại học trang trọng, có tính cấp bách (xin gia hạn luận văn vì hỏng thiết bị lab, đề nghị miễn môn điều kiện tiên quyết, nộp đơn xin tài trợ nghiên cứu sinh).
  - Có 'recipient' (chức danh trang trọng), 'subject_hint', 'scenario', và **đúng 3 gạch đầu dòng requirements**.
  - 'min_words: 80', 'recommended_words: "100 - 130 words"'.
* **Task 3 (Academic Discussion)**:
  - Bối cảnh: Seminar đại học về vấn đề đương đại gây tranh cãi (Trí tuệ nhân tạo trong tuyển dụng, Kinh tế tuần hoàn vs Chi phí sản xuất, Chính sách làm việc từ xa vs Văn hóa công ty).
  - Có 'topic', 'course', 'professor_prompt' (tên giáo sư, học hàm, câu hỏi gợi mở sâu sắc), và **đúng 2 bài peer_posts của 2 sinh viên đại diện 2 góc nhìn đối lập sắc bén (40-60 từ mỗi bạn)**.
  - 'min_words: 100', 'recommended_words: "100 - 150 words"'.

---

# BƯỚC 3.5 — ⚠️ QUY TẮC TỐI QUAN TRỌNG: CHỦ ĐỀ & NỘI DUNG PHẢI HOÀN TOÀN MỚI

## 🚨 JSON MẪU DƯỚI ĐÂY CHỈ LÀ THAM CHIẾU CẤU TRÚC SCHEMA — TUYỆT ĐỐI KHÔNG SAO CHÉP, PARAPHRASE HAY VIẾT LẠI NỘI DUNG TỪ JSON MẪU

* Nội dung JSON mẫu bên dưới (các câu ghép từ, email mẫu, bài thảo luận mẫu...) **CHỈ để bạn hiểu định dạng dữ liệu keys/fields**, KHÔNG phải nội dung đề bài.
* **Mọi câu ghép từ, đề email, câu hỏi thảo luận và bài mẫu phải hoàn toàn khác biệt, mới mẻ, không liên quan đến bất kỳ chủ đề hay tình huống nào trong JSON mẫu.**

## 📚 NGÂN HÀNG CHỦ ĐỀ WRITING ĐA DẠNG — BẮT BUỘC TỰ CHỌN NGẪU NHIÊN

### Task 1 - Build a Sentence (Chủ đề câu đa dạng cấu trúc nâng cao):
Phát triển bền vững và chính sách môi trường, công nghệ AI trong giáo dục, bất bình đẳng thu nhập và chính sách tái phân phối, khủng hoảng nhà ở đô thị, đạo đức nghiên cứu khoa học, biến đổi khí hậu và thích ứng xã hội, di cư quốc tế và hội nhập văn hóa, tự động hóa và thị trường lao động, quyền riêng tư kỹ thuật số, kinh tế tuần hoàn

### Task 2 - Write an Email (Bối cảnh email học thuật đa dạng):
Email xin gia hạn nộp bài nghiên cứu vì lý do học thuật chính đáng, Email phản hồi điểm số không chính xác và yêu cầu xem lại, Email đề xuất chủ đề luận văn cho giáo sư hướng dẫn, Email xin thư giới thiệu cho chương trình học bổng, Email thông báo rút môn và xin tư vấn lộ trình thay thế, Email báo cáo sự cố thiết bị phòng thí nghiệm, Email đề xuất tổ chức sự kiện học thuật cho khoa, Email xin lịch gặp để thảo luận đề cương nghiên cứu

### Task 3 - Academic Discussion (Chủ đề thảo luận học thuật sâu):
Trí tuệ nhân tạo có nên thay thế giám khảo con người trong nghệ thuật, Chính sách giáo dục đại học miễn phí: ưu và nhược điểm, Công nghệ gen CRISPR: cơ hội hay mối đe dọa đạo đức, Remote work và tác động lên năng suất và sức khỏe, Nên ưu tiên tăng trưởng kinh tế hay bảo vệ môi trường, Vai trò của mạng xã hội trong phong trào xã hội hiện đại, Đạo đức của du lịch không gian thương mại, Nên bắt buộc tiêm vaccine hay để tự nguyện

**YÊU CẦU BẮT BUỘC**: Chọn 3 chủ đề hoàn toàn khác nhau cho Task 1, Task 2 và Task 3. Giáo sư và hai sinh viên trong Task 3 phải có quan điểm đối lập rõ ràng, sắc bén.

---

# BƯỚC 4 — JSON SCHEMA CHUẨN XÁC

⚠️ JSON bên dưới là **MẪU CẤU TRÚC DỮ LIỆU THUẦN TÚY** — tuân theo đúng format keys/fields nhưng phải tự sáng tạo toàn bộ nội dung từ đầu với chủ đề bạn đã chọn ở Bước 3.5.

Xuất kết quả theo cấu trúc JSON chuẩn sau:

[
  {
    "title": "Writing Full Test - DD/MM/YYYY - HH:mm",
    "skill": "writing",
    "duration_seconds": 1380,
    "stages": [
      {
        "id": "write_stage_1",
        "title": "Writing Section (Linear - 23 Mins)",
        "duration_seconds": 1380,
        "tasks": [
          {
            "id": "w2_t1",
            "title": "Task 1: Build a Sentence (10 câu)",
            "task_type": "build_sentence",
            "content": {
              "instructions": "Mỗi câu có 1 câu thoại ngữ cảnh ban đầu. Kéo thả hoặc bấm chọn các từ để ghép thành câu phản hồi hoàn chỉnh đúng ngữ pháp.",
              "items": [
                {
                  "id": "item1",
                  "context": "Professor: 'Why were several questions on the biology midterm exam revised this morning?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["ambiguous", "contain", "the", "wording", "materials", "contained", "questions", "a"],
                  "correct_order": ["the", "questions", "contained", "ambiguous", "wording"],
                  "correct_sentence": "the questions contained ambiguous wording.",
                  "decoys": ["contain", "materials", "a"]
                },
                {
                  "id": "item2",
                  "context": "Lab Partner: 'Did the chemistry research team expect such an immediate reaction from the catalyst?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["witnessed", "such", "chemists", "have", "seldom", "rates", "accelerated", "reaction", "witnessing"],
                  "correct_order": ["seldom", "have", "chemists", "witnessed", "such", "accelerated", "reaction", "rates"],
                  "correct_sentence": "seldom have chemists witnessed such accelerated reaction rates.",
                  "decoys": ["rates", "witnessing"]
                },
                {
                  "id": "item3",
                  "context": "Advisor: 'How did Elena manage to identify the data anomaly so rapidly?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["the", "the", "discrepancy", "analyzed", "having", "spreadsheet", "thoroughly", "she", "spotted", "analyzing"],
                  "correct_order": ["having", "analyzed", "the", "spreadsheet", "thoroughly", "she", "spotted", "the", "discrepancy"],
                  "correct_sentence": "having analyzed the spreadsheet thoroughly she spotted the discrepancy.",
                  "decoys": ["analyzing"]
                },
                {
                  "id": "item4",
                  "context": "Dean: 'What prevented the department from expanding undergraduate research funding this term?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["allocated", "been", "were", "had", "adequate", "resources", "fellowships", "more", "offered", "would", "be", "allocating"],
                  "correct_order": ["had", "adequate", "resources", "been", "allocated", "more", "fellowships", "would", "be", "offered"],
                  "correct_sentence": "had adequate resources been allocated more fellowships would be offered.",
                  "decoys": ["were", "allocating"]
                },
                {
                  "id": "item5",
                  "context": "Investigator: 'What caused the power failure throughout the entire engineering wing?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["the", "grid", "thermal", "overload", "that", "tripped", "was", "it", "circuit", "trip"],
                  "correct_order": ["it", "was", "the", "thermal", "overload", "that", "tripped", "the", "circuit"],
                  "correct_sentence": "it was the thermal overload that tripped the circuit.",
                  "decoys": ["grid", "trip"]
                },
                {
                  "id": "item6",
                  "context": "Colleague: 'Why is Dr. Vance fossil discovery attracting so much international attention?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["to", "have", "proven", "the", "specimen", "is", "transitional", "widely", "considered", "proves", "specimens"],
                  "correct_order": ["the", "specimen", "is", "widely", "considered", "to", "have", "proven", "transitional"],
                  "correct_sentence": "the specimen is widely considered to have proven transitional.",
                  "decoys": ["proves", "specimens"]
                },
                {
                  "id": "item7",
                  "context": "Mentor: 'What determines the credibility of an environmental impact study?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["the", "the", "methodology", "more", "rigorous", "findings", "reliable", "the", "more", "become", "became"],
                  "correct_order": ["the", "more", "rigorous", "the", "methodology", "the", "more", "reliable", "findings", "become"],
                  "correct_sentence": "the more rigorous the methodology the more reliable findings become.",
                  "decoys": ["became"]
                },
                {
                  "id": "item8",
                  "context": "Director: 'Did the field team complete the geological survey on schedule?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["severe", "blizzards", "despite", "facing", "mapping", "finished", "they", "the", "boundary", "faced", "blizzard"],
                  "correct_order": ["despite", "facing", "severe", "blizzards", "they", "finished", "the", "boundary", "mapping"],
                  "correct_sentence": "despite facing severe blizzards they finished the boundary mapping.",
                  "decoys": ["faced", "blizzard"]
                },
                {
                  "id": "item9",
                  "context": "Instructor: 'What is the most difficult aspect of the computational modeling seminar?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["algorithmic", "mastering", "patience", "statistical", "enormous", "simulations", "requires", "mastered", "require"],
                  "correct_order": ["mastering", "algorithmic", "statistical", "simulations", "requires", "enormous", "patience"],
                  "correct_sentence": "mastering algorithmic statistical simulations requires enormous patience.",
                  "decoys": ["mastered", "require"]
                },
                {
                  "id": "item10",
                  "context": "Librarian: 'What did the archival committee decide concerning rare historical manuscripts?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["be", "manuscripts", "they", "fragile", "agreed", "must", "digitized", "promptly", "agreeing", "digitize"],
                  "correct_order": ["they", "agreed", "fragile", "manuscripts", "must", "be", "digitized", "promptly"],
                  "correct_sentence": "they agreed fragile manuscripts must be digitized promptly.",
                  "decoys": ["agreeing", "digitize"]
                }
              ]
            }
          },
          {
            "id": "w2_t2",
            "title": "Task 2: Write an Email",
            "task_type": "write_email",
            "content": {
              "recipient": "Professor Dr. Miller",
              "subject_hint": "Request for Research Assistantship in Evolutionary Biology",
              "scenario": "You want to apply for an undergraduate research assistant position in Dr. Miller's evolutionary biology laboratory for the upcoming summer semester.",
              "requirements": [
                "Express your strong interest in the laboratory's ongoing paleogenomics projects",
                "Highlight your relevant lab skills, analytical coursework, and PCR sequencing experience",
                "Request a brief in-person or virtual meeting to discuss potential openings"
              ],
              "min_words": 80,
              "recommended_words": "100 - 130 words"
            }
          },
          {
            "id": "w2_t3",
            "title": "Task 3: Academic Discussion",
            "task_type": "academic_discussion",
            "content": {
              "topic": "Remote Work and Corporate Innovation",
              "course": "MGMT 320: Organizational Behavior",
              "professor_prompt": {
                "name": "Dr. Angela Davies",
                "title": "Professor of Organizational Behavior",
                "question": "Some corporations are requiring employees to return full-time to the physical office, arguing that in-person collaboration drives breakthroughs, while others champion flexible hybrid models. In your opinion, does remote work primarily foster or hinder innovation and collaborative culture? State your position and defend it."
              },
              "peer_posts": [
                {
                  "student": "David",
                  "stance": "Face-to-face interaction is indispensable for spontaneous brainstorming, mentoring junior colleagues, and cultivating organic camaraderie that digital screens simply cannot replicate."
                },
                {
                  "student": "Jessica",
                  "stance": "Remote flexibility dramatically reduces commuting fatigue and empowers employees to engage in sustained deep focus work, while asynchronous cloud collaboration tools connect global talents effortlessly."
                }
              ],
              "min_words": 100,
              "recommended_words": "100 - 150 words"
            }
          }
        ]
      }
    ]
  }
]

---

# OUTPUT RULES — BẮT BUỘC

1. Chỉ trả về **JSON thuần túy**.
2. Không Markdown, không dùng \`\`\`json.
3. Không giải thích.
4. JSON phải parse được trực tiếp.
5. Task 1 Build a Sentence: BẮT BUỘC đủ 10 items (item1 đến item10), 100% từ trong scrambled, correct_order, decoys VIẾT THƯỜNG TOÀN BỘ, không có dấu câu trong từ, mảng scrambled đảo lộn xộn.
6. Task 2 Write an Email có đúng 3 yêu cầu cụ thể.
7. Task 3 Academic Discussion có câu hỏi giáo sư và 2 sinh viên đối lập.`;

// ====================================================================
// 4. MODULAR WRITING TASK 1: BUILD A SENTENCE (10 ITEMS - 7 MINS)
// ====================================================================
export const SAMPLE_WRITING_SENTENCE_PROMPT = `Hãy đóng vai **chuyên gia thiết kế và luyện thi TOEFL iBT 2026 ở cấp độ chuyên sâu**, có nhiệm vụ tạo 1 bộ đề luyện tập riêng **TASK 1: BUILD A SENTENCE (HOÀN THIỆN CÂU - ĐÚNG 10 CÂU)** chuẩn ETS 2026 đếm ngược 7 phút (420 giây).

## MỤC TIÊU VÀ QUY TẮC BẮT BUỘC CHO 10 CÂU (item1 đến item10):
1. **BẮT BUỘC TẠO ĐỦ 10 CÂU TỪ 'item1' ĐẾN 'item10'**.
2. **TẤT CẢ các từ trong 'scrambled', 'correct_order', 'decoys' BẮT BUỘC PHẢI VIẾT THƯỜNG TOÀN BỘ (lowercase)**.
3. **TUYỆT ĐỐI KHÔNG viết hoa chữ cái đầu tiên** (viết 'the', 'she', 'because' chứ KHÔNG ĐƯỢC viết 'The', 'She', 'Because') để không làm lộ từ mở đầu!
4. **Thứ tự các từ trong mảng 'scrambled' BẮT BUỘC PHẢI ĐẢO LỘN XỘN NGẪU NHIÊN HOÀN TOÀN**.
5. **Mỗi câu phải kèm 2-3 từ bẫy ('decoys') viết thường**, có ngữ pháp hoặc nghĩa tương tự để thử thách học viên.
6. **Các từ CHỈ LÀ TỪ VỰNG THUẦN TÚY, TUYỆT ĐỐI KHÔNG chứa dấu câu** (không '.', '?', '!', ',', '"').
7. **TẤT CẢ các từ trong 'correct_order' BẮT BUỘC PHẢI CÓ MẶT trong 'scrambled'**.
8. **10 câu phải đa dạng cấu trúc ngữ pháp học thuật (C1)**: Noun clauses, negative inversion, participle clauses, conditional inversion without if, cleft sentences, complex passives, double comparatives, concession clauses, gerund subjects.

Cấu trúc JSON chuẩn:
[
  {
    "title": "Writing: Hoàn Thiện Câu (Build a Sentence - 10 câu)",
    "skill": "writing",
    "task_type": "build_sentence",
    "duration_seconds": 420,
    "stages": [
      {
        "id": "stage_sentence",
        "title": "Task 1: Build a Sentence (10 câu - 7 Phút)",
        "duration_seconds": 420,
        "tasks": [
          {
            "id": "w_t1_build_sentence",
            "title": "Task 1: Build a Sentence (10 câu)",
            "task_type": "build_sentence",
            "content": {
              "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu. Kéo thả hoặc bấm chọn các từ để ghép thành câu phản hồi hoàn chỉnh đúng ngữ pháp.",
              "items": [
                {
                  "id": "item1",
                  "context": "Professor: 'Why were several questions on the biology midterm exam revised this morning?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["ambiguous", "contain", "the", "wording", "materials", "contained", "questions", "a"],
                  "correct_order": ["the", "questions", "contained", "ambiguous", "wording"],
                  "correct_sentence": "the questions contained ambiguous wording.",
                  "decoys": ["contain", "materials", "a"]
                },
                {
                  "id": "item2",
                  "context": "Lab Partner: 'Did the chemistry research team expect such an immediate reaction from the catalyst?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["witnessed", "such", "chemists", "have", "seldom", "rates", "accelerated", "reaction", "witnessing"],
                  "correct_order": ["seldom", "have", "chemists", "witnessed", "such", "accelerated", "reaction", "rates"],
                  "correct_sentence": "seldom have chemists witnessed such accelerated reaction rates.",
                  "decoys": ["rates", "witnessing"]
                },
                {
                  "id": "item3",
                  "context": "Advisor: 'How did Elena manage to identify the data anomaly so rapidly?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["the", "the", "discrepancy", "analyzed", "having", "spreadsheet", "thoroughly", "she", "spotted", "analyzing"],
                  "correct_order": ["having", "analyzed", "the", "spreadsheet", "thoroughly", "she", "spotted", "the", "discrepancy"],
                  "correct_sentence": "having analyzed the spreadsheet thoroughly she spotted the discrepancy.",
                  "decoys": ["analyzing"]
                },
                {
                  "id": "item4",
                  "context": "Dean: 'What prevented the department from expanding undergraduate research funding this term?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["allocated", "been", "were", "had", "adequate", "resources", "fellowships", "more", "offered", "would", "be", "allocating"],
                  "correct_order": ["had", "adequate", "resources", "been", "allocated", "more", "fellowships", "would", "be", "offered"],
                  "correct_sentence": "had adequate resources been allocated more fellowships would be offered.",
                  "decoys": ["were", "allocating"]
                },
                {
                  "id": "item5",
                  "context": "Investigator: 'What caused the power failure throughout the entire engineering wing?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["the", "grid", "thermal", "overload", "that", "tripped", "was", "it", "circuit", "trip"],
                  "correct_order": ["it", "was", "the", "thermal", "overload", "that", "tripped", "the", "circuit"],
                  "correct_sentence": "it was the thermal overload that tripped the circuit.",
                  "decoys": ["grid", "trip"]
                },
                {
                  "id": "item6",
                  "context": "Colleague: 'Why is Dr. Vance fossil discovery attracting so much international attention?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["to", "have", "proven", "the", "specimen", "is", "transitional", "widely", "considered", "proves", "specimens"],
                  "correct_order": ["the", "specimen", "is", "widely", "considered", "to", "have", "proven", "transitional"],
                  "correct_sentence": "the specimen is widely considered to have proven transitional.",
                  "decoys": ["proves", "specimens"]
                },
                {
                  "id": "item7",
                  "context": "Mentor: 'What determines the credibility of an environmental impact study?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["the", "the", "methodology", "more", "rigorous", "findings", "reliable", "the", "more", "become", "became"],
                  "correct_order": ["the", "more", "rigorous", "the", "methodology", "the", "more", "reliable", "findings", "become"],
                  "correct_sentence": "the more rigorous the methodology the more reliable findings become.",
                  "decoys": ["became"]
                },
                {
                  "id": "item8",
                  "context": "Director: 'Did the field team complete the geological survey on schedule?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["severe", "blizzards", "despite", "facing", "mapping", "finished", "they", "the", "boundary", "faced", "blizzard"],
                  "correct_order": ["despite", "facing", "severe", "blizzards", "they", "finished", "the", "boundary", "mapping"],
                  "correct_sentence": "despite facing severe blizzards they finished the boundary mapping.",
                  "decoys": ["faced", "blizzard"]
                },
                {
                  "id": "item9",
                  "context": "Instructor: 'What is the most difficult aspect of the computational modeling seminar?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["algorithmic", "mastering", "patience", "statistical", "enormous", "simulations", "requires", "mastered", "require"],
                  "correct_order": ["mastering", "algorithmic", "statistical", "simulations", "requires", "enormous", "patience"],
                  "correct_sentence": "mastering algorithmic statistical simulations requires enormous patience.",
                  "decoys": ["mastered", "require"]
                },
                {
                  "id": "item10",
                  "context": "Librarian: 'What did the archival committee decide concerning rare historical manuscripts?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["be", "manuscripts", "they", "fragile", "agreed", "must", "digitized", "promptly", "agreeing", "digitize"],
                  "correct_order": ["they", "agreed", "fragile", "manuscripts", "must", "be", "digitized", "promptly"],
                  "correct_sentence": "they agreed fragile manuscripts must be digitized promptly.",
                  "decoys": ["agreeing", "digitize"]
                }
              ]
            }
          }
        ]
      }
    ]
  }
]

OUTPUT RULES: Chỉ trả về JSON thuần túy, không kèm giải thích, không markdown.`;

// ====================================================================
// 5. MODULAR WRITING TASK 2: WRITE AN EMAIL (7 MINS)
// ====================================================================
export const SAMPLE_WRITING_EMAIL_PROMPT = `Hãy đóng vai **chuyên gia thiết kế và luyện thi TOEFL iBT 2026 ở cấp độ chuyên sâu**, có nhiệm vụ tạo 1 bộ đề luyện tập riêng **TASK 2: WRITE AN EMAIL (VIẾT EMAIL)** chuẩn ETS 2026 đếm ngược 7 phút (420 giây).

## MỤC TIÊU VÀ QUY TẮC BẮT BUỘC:
1. Tình huống giao tiếp thực tế học thuật hoặc khuôn viên trường đại học (giáo sư, cố vấn học tập, văn phòng hỗ trợ tài chính, quản lý phòng lab).
2. Phải có đúng **3 yêu cầu bắt buộc ('requirements')** rõ ràng mà thí sinh phải giải quyết trong email.
3. Người nhận ('recipient') và gợi ý tiêu đề ('subject_hint') cụ thể, trang trọng.
4. Yêu cầu độ dài: 'min_words: 80', 'recommended_words: "100 - 130 words"'.

Cấu trúc JSON chuẩn:
[
  {
    "title": "Writing: Viết Email (Write an Email - 7 Phút)",
    "skill": "writing",
    "task_type": "write_email",
    "duration_seconds": 420,
    "stages": [
      {
        "id": "stage_email",
        "title": "Task 2: Write an Email (7 Phút)",
        "duration_seconds": 420,
        "tasks": [
          {
            "id": "w_t2_email",
            "title": "Task 2: Write an Email",
            "task_type": "write_email",
            "content": {
              "recipient": "Professor Dr. Miller",
              "subject_hint": "Request for Research Assistantship in Evolutionary Biology",
              "scenario": "You want to apply for an undergraduate research assistant position in Dr. Miller's evolutionary biology laboratory for the upcoming summer semester.",
              "requirements": [
                "Express your strong interest in the laboratory's ongoing paleogenomics projects",
                "Highlight your relevant lab skills, analytical coursework, and PCR sequencing experience",
                "Request a brief in-person or virtual meeting to discuss potential openings"
              ],
              "min_words": 80,
              "recommended_words": "100 - 130 words"
            }
          }
        ]
      }
    ]
  }
]

OUTPUT RULES: Chỉ trả về JSON thuần túy, không kèm giải thích, không markdown.`;

// ====================================================================
// 6. MODULAR WRITING TASK 3: ACADEMIC DISCUSSION (10 MINS)
// ====================================================================
export const SAMPLE_WRITING_DISCUSSION_PROMPT = `Hãy đóng vai **chuyên gia thiết kế và luyện thi TOEFL iBT 2026 ở cấp độ chuyên sâu**, có nhiệm vụ tạo 1 bộ đề luyện tập riêng **TASK 3: ACADEMIC DISCUSSION (VIẾT BÀI THẢO LUẬN HỌC THUẬT)** chuẩn ETS 2026 đếm ngược 10 phút (600 giây).

## MỤC TIÊU VÀ QUY TẮC BẮT BUỘC:
1. Chủ đề thảo luận mang tính học thuật xã hội sâu sắc (công nghệ, giáo dục, môi trường, kinh tế, tâm lý học...).
2. Có giáo sư ('professor_prompt': name, title, question) nêu câu hỏi thảo luận kích thích tư duy phản biện.
3. Có đúng **2 sinh viên ('peer_posts')** đưa ra 2 lập trường đối lập nhau (khoảng 40-60 từ mỗi bạn).
4. Yêu cầu độ dài: 'min_words: 100', 'recommended_words: "100 - 150 words"'.


⚠️ **QUY TẮc TỐI QUAN TRỌNG — CHỦ ĐỀ & NỘI DUNG PHẢI HOÀN TOÀN MỚI**:
- JSON mẩu dưới đây **CHỈ là tham chiếu cấu trúc schema keys/fields**. TUYỆT ĐỐI không sao chép hay paraphrase câu hỏi giáo sư hay bài viết sinh viên mẩu.
- **Tự chọn ngẫu nhiên 1 chủ đề tranh luận học thuật mới** từ danh sách: AI thay thế giám khảo nghệ thuật, đại học miễn phí, công nghệ gen CRISPR, remote work vs văn phòng, tăng trưởng kinh tế vs bảo vệ môi trường, mạng xã hội và sức khỏe tâm thần, du lịch không gian thương mại, tiêm chủng bắt buộc, AI trong xét xử pháp luật, nghĩa vụ quân sự bắt buộc, quyền riêng tư kỹ thuật số vs an ninh quốc gia, học phí đại học và công bằng xã hội.
- Giáo sư đặt câu hỏi mở kích thích tư duy phân tích bậc cao. 2 sinh viên phải có quan điểm đối lập sắc bén, lập luận học thuật thực chất.

Cấu trúc JSON chuẩn:
[
  {
    "title": "Writing: Academic Discussion (10 Phút)",
    "skill": "writing",
    "task_type": "academic_discussion",
    "duration_seconds": 600,
    "stages": [
      {
        "id": "stage_discussion",
        "title": "Task 3: Academic Discussion (10 Phút)",
        "duration_seconds": 600,
        "tasks": [
          {
            "id": "w_t3_discussion",
            "title": "Task 3: Academic Discussion",
            "task_type": "academic_discussion",
            "content": {
              "topic": "Remote Work and Corporate Innovation",
              "course": "MGMT 320: Organizational Behavior",
              "professor_prompt": {
                "name": "Dr. Angela Davies",
                "title": "Professor of Organizational Behavior",
                "question": "Some corporations are requiring employees to return full-time to the physical office, arguing that in-person collaboration drives breakthroughs, while others champion flexible hybrid models. In your opinion, does remote work primarily foster or hinder innovation and collaborative culture? State your position and defend it."
              },
              "peer_posts": [
                {
                  "student": "David",
                  "stance": "Face-to-face interaction is indispensable for spontaneous brainstorming, mentoring junior colleagues, and cultivating organic camaraderie that digital screens simply cannot replicate."
                },
                {
                  "student": "Jessica",
                  "stance": "Remote flexibility dramatically reduces commuting fatigue and empowers employees to engage in sustained deep focus work, while asynchronous cloud collaboration tools connect global talents effortlessly."
                }
              ],
              "min_words": 100,
              "recommended_words": "100 - 150 words"
            }
          }
        ]
      }
    ]
  }
]

OUTPUT RULES: Chỉ trả về JSON thuần túy, không kèm giải thích, không markdown.`;

// ====================================================================
// 7. SPEAKING FULL TEST PROMPT (LINEAR - 11 QUESTIONS - 8 MINS)
// ====================================================================
export const SAMPLE_SPEAKING_PROMPT = `Hãy đóng vai **chuyên gia thiết kế và luyện thi TOEFL iBT 2026 ở cấp độ chuyên sâu**, có nhiệm vụ tạo một bài **FULL TOEFL iBT Speaking Practice Test** chuẩn ETS 2026 (Linear - 8 phút / 480 giây, gồm đúng 11 câu hỏi chia làm 2 tasks).

## MỤC TIÊU QUAN TRỌNG NHẤT

Đề được tạo ra phải mô phỏng **FORMAT + DIFFICULTY + TIMING ACCURACY + REALISTIC CAMPUS LEVEL** của bài thi TOEFL iBT Speaking 2026 thực tế.

Tuyệt đối KHÔNG tạo một bài Speaking chỉ mang phong cách TOEFL chung chung hoặc dễ hơn đề thật.

---

## BƯỚC 1 — CẤU TRÚC 2 TASKS BẮT BUỘC THEO THỨ TỰ THI THẬT ETS 2026

1. **Task 1: Listen and Repeat (ĐÚNG 7 CÂU)**:
   - Thí sinh nghe một câu ngắn một lần duy nhất và lặp lại chính xác từng từ vào micro.
   - **KHÔNG CÓ THỜI GIAN CHUẨN BỊ (No preparation time)**.
   - Độ dài câu tăng dần tuần tự từ 6 đến 15 từ:
     * Câu 1-2: 6 - 8 từ (đơn giản, rõ ràng).
     * Câu 3-4: 9 - 11 từ (cụm danh từ, liên từ).
     * Câu 5-7: 12 - 15 từ (câu phức, mệnh đề quan hệ, từ vựng học thuật).
   - Thời gian nói cho mỗi câu tương ứng từ 7 đến 12 giây ('speak_seconds').
   - Kèm phiên âm chuẩn quốc tế IPA ('phonetic_guide') có trọng âm để hệ thống đánh giá ngữ âm.
2. **Task 2: Take an Interview (ĐÚNG 4 CÂU HỎI LIÊN TIẾP)**:
   - Thí sinh tham gia một cuộc phỏng vấn liên tiếp xoay quanh 1 chủ đề học thuật / nghề nghiệp khuôn viên trường (việc làm thêm, dự án cộng đồng, kỹ năng lãnh đạo, nghiên cứu khoa học sinh viên).
   - Người phỏng vấn có tên, chức danh và avatar initials.
   - **KHÔNG CÓ THỜI GIAN CHUẨN BỊ**. Thí sinh phải trả lời ngay lập tức trong **45 giây** cho mỗi câu ('speak_seconds: 45').
   - 4 câu hỏi có tính liên kết và đào sâu dần:
     * Câu 1: Giới thiệu lựa chọn / trải nghiệm cá nhân.
     * Câu 2: Phân tích lợi ích / lý do sâu xa.
     * Câu 3: Cách giải quyết mâu thuẫn / tình huống khó khăn cụ thể.
     * Câu 4: Phẩm chất quan trọng / góc nhìn tổng quan dài hạn.
   - Kèm câu trả lời mẫu xuất sắc ('sample_answer' 80-110 từ) chuẩn band 5.5 - 6.0 và các ý chính ('key_points').

---

# BƯỚC 1.5 — ⚠️ QUY TẮC TỐI QUAN TRỌNG: CHỦ ĐỀ & NỘI DUNG PHẢI HOÀN TOÀN MỚI

## 🚨 JSON MẪU DƯỚI ĐÂY CHỈ LÀ THAM CHIẾU CẤU TRÚC SCHEMA — TUYỆT ĐỐI KHÔNG SAO CHÉP, PARAPHRASE HAY VIẾT LẠI NỘI DUNG TỪ JSON MẪU

* Nội dung JSON mẫu bên dưới (câu lặp lại mẫu, câu hỏi phỏng vấn mẫu...) **CHỈ để bạn hiểu định dạng dữ liệu keys/fields**, KHÔNG phải nội dung đề bài.
* **Mọi câu phát âm, câu hỏi phỏng vấn, câu trả lời mẫu và ý chính phải hoàn toàn khác biệt, mới mẻ, không liên quan đến bất kỳ chủ đề hay tình huống nào trong JSON mẫu.**

## 📚 NGÂN HÀNG CHỦ ĐỀ SPEAKING ĐA DẠNG — BẮT BUỘC TỰ CHỌN NGẪU NHIÊN

### Task 1 - Listen and Repeat (Các lĩnh vực câu đa dạng):
Phát biểu học thuật về môi trường, kinh tế học, y tế công cộng, công nghệ, giáo dục, xã hội học, lịch sử văn minh, nhân quyền, biến đổi khí hậu, quản trị đô thị
Sử dụng cấu trúc phức tạp: mệnh đề quan hệ phi hạn định, đảo ngữ nhấn mạnh, cấu trúc nhượng bộ (Although/Despite/While), câu điều kiện hỗn hợp, cụm động từ phân từ

### Task 2 - Take an Interview (Chủ đề phỏng vấn đa dạng):
Trải nghiệm làm việc nhóm trong dự án học thuật, tham gia câu lạc bộ hoặc tổ chức sinh viên, quản lý thời gian trong học kỳ bận rộn, vai trò lãnh đạo nhóm bạn đã từng đảm nhận, kinh nghiệm tình nguyện hoặc phục vụ cộng đồng, cách tiếp cận học kỹ năng mới, quyết định lựa chọn chuyên ngành, xử lý bất đồng quan điểm với bạn học, dự án nghiên cứu độc lập ấn tượng nhất, kế hoạch sự nghiệp và mục tiêu nghề nghiệp

**YÊU CẦU BẮT BUỘC**:
- Task 1: 7 câu, độ dài tăng dần từ 6-8 từ đến 13-15 từ, phải dùng từ vựng C1/C2 thực sự, có phonetic_guide IPA chính xác.
- Task 2: 4 câu hỏi liên kết logic theo một chủ đề thống nhất (trải nghiệm -> ý nghĩa -> thách thức -> bài học/phẩm chất).

---

# BƯỚC 2 — JSON SCHEMA CHUẨN XÁC

⚠️ JSON bên dưới là **MẪU CẤU TRÚC DỮ LIỆU THUẦN TÚY** — tuân theo đúng format keys/fields nhưng phải tự sáng tạo toàn bộ nội dung từ đầu với chủ đề bạn đã chọn ở Bước 1.5.

Xuất kết quả theo cấu trúc JSON chuẩn sau:

[
  {
    "title": "Speaking Full Test - DD/MM/YYYY - HH:mm",
    "skill": "speaking",
    "duration_seconds": 480,
    "stages": [
      {
        "id": "speak_stage_1",
        "title": "Speaking Section (Linear - 8 Mins)",
        "duration_seconds": 480,
        "tasks": [
          {
            "id": "s2_t1",
            "title": "Task 1: Listen and Repeat (7 câu)",
            "task_type": "listen_and_repeat",
            "content": {
              "instructions": "Lắng nghe 7 câu nói một lần duy nhất và lặp lại chính xác từng từ vào micro. Không có thời gian chuẩn bị.",
              "items": [
                {
                  "id": "s2_t1_i1",
                  "context": "University Bookstore",
                  "audio_text": "Textbooks for the semester can be purchased online.",
                  "word_count": 8,
                  "speak_seconds": 8,
                  "phonetic_guide": "ˈtɛkstbʊks fɔː ðə sɪˈmɛstər kæn biː ˈpɜːtʃəst ˈɒnˌlaɪn."
                },
                {
                  "id": "s2_t1_i2",
                  "context": "Campus Transportation",
                  "audio_text": "The campus shuttle operates between student dormitories every fifteen minutes.",
                  "word_count": 10,
                  "speak_seconds": 9,
                  "phonetic_guide": "ðə ˈkæmpəs ˈʃʌtl ˈɒpəreɪts bɪˈtwiːn ˈstjuːdnt ˈdɔːmɪtriz ˈɛvri ˈfɪfˈtiːn ˈmɪnɪts."
                },
                {
                  "id": "s2_t1_i3",
                  "context": "Science Laboratory",
                  "audio_text": "Please return all protective safety goggles to the designated storage cabinet.",
                  "word_count": 11,
                  "speak_seconds": 10,
                  "phonetic_guide": "pliːz rɪˈtɜːn ɔːl prəˈtɛktɪv ˈseɪfti ˈɡɒɡlz tuː ðə ˈdɛzɪɡneɪtɪd ˈstɔːrɪdʒ ˈkæbɪnɪt."
                },
                {
                  "id": "s2_t1_i4",
                  "context": "Registrar Office",
                  "audio_text": "Graduate teaching assistants must submit their midterm grade evaluations before noon tomorrow.",
                  "word_count": 12,
                  "speak_seconds": 11,
                  "phonetic_guide": "ˈɡrædʒueɪt ˈtiːtʃɪŋ əˈsɪstənts mʌst səbˈmɪt ðeər ˈmɪdtɜːm ɡreɪd ɪˌvæljuˈeɪʃənz bɪˈfɔː nuːn təˈmɒrəʊ."
                },
                {
                  "id": "s2_t1_i5",
                  "context": "Academic Advising",
                  "audio_text": "Students who fail to verify their prerequisite courses will forfeit their laboratory access credentials.",
                  "word_count": 14,
                  "speak_seconds": 12,
                  "phonetic_guide": "ˈstjuːdnts huː feɪl tuː ˈvɛrɪfaɪ ðeər ˌpriːˈrɛkwɪzɪt ˈkɔːsɪz wɪl ˈfɔːfɪt ðeər ləˈbɒrətri ˈæksɛs krɪˈdɛnʃəlz."
                },
                {
                  "id": "s2_t1_i6",
                  "context": "Archaeology Seminar",
                  "audio_text": "Recent archaeological excavations have revealed unexpected evidence regarding prehistoric trade networks throughout the Mediterranean.",
                  "word_count": 14,
                  "speak_seconds": 12,
                  "phonetic_guide": "ˈriːsnt ˌɑːkiəˈlɒdʒɪkl ˌɛkskəˈveɪʃənz hæv rɪˈviːld ˌʌnɪkˈspɛktɪd ˈɛvɪdəns rɪˈɡɑːdɪŋ ˌpriːhɪsˈtɒrɪk treɪd ˈnɛtwɜːks θruːˈaʊt ðə ˌmɛdɪtəˈreɪniən."
                },
                {
                  "id": "s2_t1_i7",
                  "context": "University Administration",
                  "audio_text": "The university administration announced a comprehensive renovation plan for the undergraduate physical sciences research facility.",
                  "word_count": 15,
                  "speak_seconds": 12,
                  "phonetic_guide": "ðə ˌjuːnɪˈvɜːsɪti ədˌmɪnɪˈstreɪʃn əˈnaʊnst ə ˌkɒmprɪˈhɛnsɪv ˌrɛnəˈveɪʃn plæn fɔː ðə ˌʌndəˈɡrædʒueɪt ˈfɪzɪkl ˈsaɪənsɪz rɪˈsɜːtʃ fəˈsɪlɪti."
                }
              ]
            }
          },
          {
            "id": "s2_t2",
            "title": "Task 2: Take an Interview (4 câu)",
            "task_type": "take_an_interview",
            "content": {
              "topic": "Campus Jobs and Professional Development",
              "interviewer": {
                "name": "Prof. David Clark",
                "title": "Director of Career Advising",
                "avatar_initials": "DC"
              },
              "questions": [
                {
                  "id": "s2_t2_q1",
                  "question_number": 1,
                  "audio_text": "Welcome! Could you share what type of on-campus job you would be most interested in having, and why?",
                  "speak_seconds": 45,
                  "sample_answer": "I would be most interested in working as a peer tutor in the university writing center. This position would allow me to assist fellow students with essay structuring and argumentation while simultaneously reinforcing my own analytical thinking and academic communication skills.",
                  "key_points": ["Nêu công việc cụ thể (peer tutor tại writing center)", "Giải thích lý do hỗ trợ sinh viên và rèn luyện tư duy phân tích"]
                },
                {
                  "id": "s2_t2_q2",
                  "question_number": 2,
                  "audio_text": "In your opinion, what is the most significant benefit students gain from working part-time while attending university?",
                  "speak_seconds": 45,
                  "sample_answer": "In my view, the most significant benefit is mastering practical time management. Balancing shift responsibilities with rigorous academic coursework forces students to prioritize deadlines systematically, eliminate procrastination, and build professional accountability that textbooks alone cannot teach.",
                  "key_points": ["Khẳng định lợi ích hàng đầu là quản lý thời gian thực tiễn", "Dẫn chứng cân bằng giữa ca làm và bài vở giúp xây dựng tính kỷ luật"]
                },
                {
                  "id": "s2_t2_q3",
                  "question_number": 3,
                  "audio_text": "How would you handle a situation where an urgent work assignment conflicts with a major exam deadline?",
                  "speak_seconds": 45,
                  "sample_answer": "If an urgent work duty coincided with a major exam, I would immediately communicate proactively with my supervisor to explain the conflict well in advance. I would propose rescheduling my work shift or delegating non-critical tasks to a colleague, ensuring academic priorities remain uncompromised while fulfilling job commitments responsibly.",
                  "key_points": ["Giao tiếp chủ động và sớm với cấp trên", "Đưa ra giải pháp thương lượng đổi ca hoặc bàn giao công việc"]
                },
                {
                  "id": "s2_t2_q4",
                  "question_number": 4,
                  "audio_text": "What key personal quality do you believe is most essential for someone to succeed in a student leadership role?",
                  "speak_seconds": 45,
                  "sample_answer": "I firmly believe that empathy combined with active listening is the single most essential quality. An effective student leader must understand diverse perspectives, foster inclusive consensus, and empower team members rather than simply issuing top-down directives.",
                  "key_points": ["Nêu phẩm chất cốt lõi: thấu cảm và lắng nghe tích cực", "Giải thích vì sao giúp kết nối và khích lệ các thành viên hiệu quả"]
                }
              ]
            }
          }
        ]
      }
    ]
  }
]

---

# OUTPUT RULES — BẮT BUỘC

1. Chỉ trả về **JSON thuần túy**.
2. Không Markdown, không \`\`\`json, không giải thích.
3. Task 1: BẮT BUỘC đủ 7 items (i1 đến i7), độ dài tăng dần từ 6 đến 15 từ, kèm phonetic_guide IPA chuẩn.
4. Task 2: BẮT BUỘC đủ 4 câu hỏi, speak_seconds: 45, kèm sample_answer chuẩn và key_points.
5. Không dùng ngoặc kép đôi " bên trong chuỗi văn bản (dùng ngoặc đơn ').`;

// ====================================================================
// 8. FULL TEST PROMPT (4 SKILLS - 6 STAGES - ~90 MINS)
// ====================================================================
export const SAMPLE_FULL_TEST_PROMPT = `Hãy đóng vai **chuyên gia thiết kế và luyện thi TOEFL iBT 2026 ở cấp độ chuyên sâu**, có nhiệm vụ tạo một bài **FULL MOCK TEST TOEFL iBT (4 KỸ NĂNG LIÊN TỤC ~90 PHÚT / 5400 GIÂY)** mô phỏng kỳ thi thật ETS 2026 ở mức cao nhất có thể.

## MỤC TIÊU QUAN TRỌNG NHẤT

Đề được tạo ra phải mô phỏng **FORMAT + DIFFICULTY + QUESTION DESIGN + LANGUAGE LEVEL + TIME PRESSURE** của toàn bộ bài thi TOEFL iBT 2026 thực tế qua 4 kỹ năng theo đúng thứ tự:
**Reading (2 Module thích ứng) -> Listening (2 Module thích ứng) -> Writing (3 Tasks) -> Speaking (2 Tasks)**.

Tuyệt đối KHÔNG tạo một bài thi chung chung hoặc dễ hơn đề thật.

---

## CẤU TRÚC 6 STAGES BẮT BUỘC THEO THỨ TỰ THI THẬT ETS 2026:

1. **Stage 1: Reading - Module 1** (900s / 15p) - Gồm Task 1: Complete the Words (80-110 từ, câu đầu nguyên vẹn, 10-12 blanks), Task 2: Read in Daily Life (120-160 từ, 3 câu hỏi), Task 3: Academic Passage (250-320 từ, 5 câu hỏi).
2. **Stage 2: Reading - Module 2 (Adaptive Higher Route)** (900s / 15p) - Thích ứng nhánh khó C1/C2 với cùng 3 tasks tương tự.
3. **Stage 3: Listening - Module 1** (870s / 14.5p) - Gồm Task 1: Choose Response (5 câu), Task 2: Announcement (90-130 từ, 2 câu hỏi), Task 3: Conversation (180-250 từ, 3 câu hỏi), Task 4: Academic Talk (180-260 từ, 3 câu hỏi). Tổng 13 câu.
4. **Stage 4: Listening - Module 2 (Adaptive Higher Route)** (870s / 14.5p) - Thích ứng nhánh khó C1/C2 với đủ 4 tasks tương tự (13 câu).
5. **Stage 5: Writing Section (Linear - 23 Mins)** (1380s / 23p) - Gồm Task 1: Build a Sentence (ĐÚNG 10 CÂU, 100% lowercase, scrambled, decoys, cấu trúc ngữ pháp nâng cao), Task 2: Write an Email (3 requirements), Task 3: Academic Discussion (Professor + 2 peers).
6. **Stage 6: Speaking Section (Linear - 8 Mins)** (480s / 8p) - Gồm Task 1: Listen and Repeat (ĐÚNG 7 CÂU tăng dần 6-15 từ + IPA), Task 2: Take an Interview (ĐÚNG 4 CÂU phỏng vấn 45s + sample answers + key points).

---

## CÁC QUY TẮC VÀNG BẮT BUỘC ĐỂ ĐỀ THI ĐẠT CHUẨN THI THẬT ETS:

1. **KHÔNG ĐƯỢC RÚT GỌN HOẶC DÙNG PLACEHOLDER**:
   - Tất cả các tasks phải sinh đầy đủ số lượng câu hỏi và nội dung văn bản thực tế.
2. **ĐÁP ÁN TRẮC NGHIỆM (READING & LISTENING) PHẢI PHÂN BỐ ĐỀU VÀ NGẪU NHIÊN**:
   - 'correct_answer' BẮT BUỘC phải phân bố đều và ngẫu nhiên giữa A, B, C, D (mỗi phương án chiếm ~25%).
   - TUYỆT ĐỐI KHÔNG để tất cả hoặc đa số câu hỏi đều có đáp án là A hoặc B. Phải xáo trộn tự nhiên.
3. **PLAUSIBLE DISTRACTORS**:
   - Mọi phương án sai phải có vẻ rất hợp lý, bẫy được thí sinh đọc/nghe hời hợt (word-spotting traps, reversed logic, overgeneralization).
4. **COMPLETE THE WORDS (READING)**:
   - Trong 'paragraph', các từ khuyết chữ cái PHẢI viết kèm ngoặc vuông 'prefix[missing]'.
   - Câu đầu tiên của đoạn văn 100% nguyên vẹn (0 blank).
   - Từ câu 2 trở đi có đúng 10 đến 12 blanks trên các từ vựng học thuật C1/C2 (không xóa hư từ).
   - 'blanks' phải có đủ id, prefix, missing, full khớp 100% với đoạn văn.
5. **BUILD A SENTENCE (WRITING TASK 1)**:
   - Bắt buộc tạo đủ 10 items từ 'item1' đến 'item10'.
   - 100% từ trong 'scrambled', 'correct_order', 'decoys' BẮT BUỘC PHẢI VIẾT THƯỜNG TOÀN BỘ (lowercase).
   - TUYỆT ĐỐI KHÔNG viết hoa chữ cái đầu tiên (không viết 'the', chứ không viết 'The').
   - Thứ tự các từ trong 'scrambled' BẮT BUỘC PHẢI ĐẢO LỘN XỘN NGẪU NHIÊN HOÀN TOÀN.
   - Các từ CHỈ LÀ TỪ VỰNG THUẦN TÚY, TUYỆT ĐỐI KHÔNG chứa dấu câu.
6. **SPEAKING**:
   - Task 1: Đủ đúng 7 câu tăng dần từ 6 đến 15 từ kèm 'phonetic_guide'.
   - Task 2: Đủ đúng 4 câu hỏi 45s kèm 'sample_answer' và 'key_points'.

---

## QUY TẮc TỐI QUAN TRỌNG — CHỦ ĐỀ & NỘI DUNG PHẢI HOÀN TOÀN MỚI CHO TẤT CẢ 6 STAGES

🚨 **JSON MẦU DƯỚI ĐÂY CHỈ LÀ THAM CHIẾu CẤU TRÚC SCHEMA — TUYỆT ĐỐI KHÔNG SAO CHÉP, PARAPHRASE HAY DÙNG LẠI BẤT KỲ ĐOẠN VĂN, HỘI THOẠI, BÀI GIẢNG HAY CÂU Hỏi NÀO TỪ JSON MẦU**

* Mọi stage, task, đoạn văn, hội thoại, bài giảng, câu hỏi, đáp án phải hoàn toàn nguyên bản, khác biệt hoàn toàn với mọi nội dung trong JSON mẩu.
* **Phân bổ 6 chủ đề hoàn toàn khác nhau** cho 6 stages, không lặp lại chủ đề giữa bất kỳ 2 stage nào:
  - **Reading M1**: Chọn từ thiên văn vật lý, nhân học khảo cổ, hoặc kinh tế học thể chế
  - **Reading M2**: Chọn từ thần kinh học nhận thức, sinh thái học biển, hoặc triết học khoa học
  - **Listening M1**: Academic Talk về một lĩnh vực khoa học tự nhiên (chọn ngẫu nhiên)
  - **Listening M2**: Academic Talk về một lĩnh vực khoa học xã hội / nhân văn (chọn ngẫu nhiên)
  - **Writing**: 3 tasks với 3 chủ đề riêng biệt (cấu trúc ngữ pháp, bối cảnh email, chủ đề thảo luận)
  - **Speaking**: 7 câu lặp lại đa dạng lĩnh vực, 4 câu phỏng vấn liên kết theo 1 chủ đề mới hoàn toàn

## CẤU TRÚC JSON CHUẨN:

[
  {
    "title": "Full Test - DD/MM/YYYY - HH:mm",
    "skill": "full",
    "duration_seconds": 5400,
    "stages": [
      {
        "id": "full_s1_read_m1",
        "title": "Stage 1: Reading - Module 1",
        "skill": "reading",
        "duration_seconds": 900,
        "tasks": [
          {
            "id": "f_r1_t1",
            "title": "Task 1: Complete the Words",
            "task_type": "complete_words",
            "content": {
              "paragraph": "Paleoclimatologists reconstruct historical atmospheric patterns by extracting cylindrical ice cores from polar ice sheets. These gla[cial] records pro[vide] valuable insi[ghts] into anc[ient] atmospheric compo[sition] through trapped air bub[bles]. By meas[uring] isotope concen[trations], researchers can determ[ine] historical temper[ature] fluctuations with extraor[dinary] precision across millennia.",
              "blanks": [
                { "id": "b1", "prefix": "gla", "missing": "cial", "full": "glacial" },
                { "id": "b2", "prefix": "pro", "missing": "vide", "full": "provide" },
                { "id": "b3", "prefix": "insi", "missing": "ghts", "full": "insights" },
                { "id": "b4", "prefix": "anc", "missing": "ient", "full": "ancient" },
                { "id": "b5", "prefix": "compo", "missing": "sition", "full": "composition" },
                { "id": "b6", "prefix": "bub", "missing": "bles", "full": "bubbles" },
                { "id": "b7", "prefix": "meas", "missing": "uring", "full": "measuring" },
                { "id": "b8", "prefix": "concen", "missing": "trations", "full": "concentrations" },
                { "id": "b9", "prefix": "determ", "missing": "ine", "full": "determine" },
                { "id": "b10", "prefix": "temper", "missing": "ature", "full": "temperature" },
                { "id": "b11", "prefix": "extraor", "missing": "dinary", "full": "extraordinary" }
              ]
            }
          },
          {
            "id": "f_r1_t2",
            "title": "Task 2: Read in Daily Life",
            "task_type": "daily_life",
            "content": {
              "document_type": "University Laboratory Safety Protocol",
              "passage": "All researchers and postgraduate students utilizing the Molecular Chemistry Facility must complete mandatory annual hazardous materials certification prior to gaining swipe-card access. Laboratory sessions scheduled after 8:00 PM require a registered secondary researcher present on site under the departmental buddy system policy. Chemical waste containers must be clearly labeled with structural formulas and dated immediately upon initial deposit. Non-compliance with solvent disposal protocols will result in a mandatory two-week suspension of bench privileges, and repeated infractions will be formally referred to the Academic Ethics Committee for administrative review.",
              "questions": [
                {
                  "id": "f_r1_q1",
                  "prompt": "What is the primary operational objective of this document?",
                  "options": {
                    "A": "To announce new funding grants for postgraduate chemistry research",
                    "B": "To outline safety certification and compliance protocols for facility access",
                    "C": "To schedule dates for upcoming Academic Ethics Committee hearings",
                    "D": "To recruit volunteer lab partners for evening experimental sessions"
                  },
                  "correct_answer": "B",
                  "explanation": "Văn bản quy định thủ tục an toàn bắt buộc và chế tài xử lý vi phạm trong phòng thí nghiệm."
                },
                {
                  "id": "f_r1_q2",
                  "prompt": "According to the protocol, under what circumstance is a researcher permitted to conduct experiments after 8:00 PM?",
                  "options": {
                    "A": "Only when working in solitary isolation to avoid noise distractions",
                    "B": "Only if accompanied by another registered researcher on the premises",
                    "C": "Provided they obtain verbal permission from campus security",
                    "D": "Whenever their annual certification exam has received top honors"
                  },
                  "correct_answer": "B",
                  "explanation": "Quy chế quy định bắt buộc phải có đồng nghiệp cùng đăng ký có mặt theo chính sách 'buddy system'."
                },
                {
                  "id": "f_r1_q3",
                  "prompt": "Which of the following consequences directly results from an initial violation of solvent disposal rules?",
                  "options": {
                    "A": "Immediate expulsion from the graduate degree program",
                    "B": "A temporary two-week revocation of laboratory bench privileges",
                    "C": "A mandatory monetary penalty deducted from research stipends",
                    "D": "Permanent confiscation of building swipe-card credentials"
                  },
                  "correct_answer": "B",
                  "explanation": "Vi phạm lần đầu bị đình chỉ quyền sử dụng bàn thí nghiệm trong 2 tuần."
                }
              ]
            }
          },
          {
            "id": "f_r1_t3",
            "title": "Task 3: Academic Passage",
            "task_type": "academic_passage",
            "content": {
              "document_type": "Paleontology & Evolutionary Biology",
              "passage": "The Cambrian explosion, occurring approximately 541 million years ago, denotes a seminal geochronological interval marked by the unprecedented morphological diversification of multicellular life. Prior to this epoch, the fossil record was dominated by the Ediacaran biota—predominantly soft-bodied, radially symmetrical organisms exhibiting limited locomotory capacity. Within a remarkably condensed geological timespan, nearly all contemporary animal body plans, including arthropods, chordates, and mollusks, emerged in marine strata. Evolutionary paleobiologists propose several synergistic hypotheses to account for this evolutionary acceleration. Geochemical analyses demonstrate a marked surge in atmospheric oxygen concentrations during the late Neoproterozoic, which likely satisfied the elevated metabolic demands essential for predatory active foraging and large-scale collagen synthesis. Furthermore, the advent of visual predatory mechanisms triggered an evolutionary arms race, compelling prey species to develop protective biomineralized exoskeletons, which concurrently dramatically augmented their fossil preservation potential.",
              "questions": [
                {
                  "id": "f_r1_q4",
                  "prompt": "Which of the following best expresses the main idea of the passage?",
                  "options": {
                    "A": "The Ediacaran biota possessed far more advanced predatory adaptations than previously acknowledged.",
                    "B": "The Cambrian explosion represented a sudden emergence of diverse anatomical forms driven by environmental and biological factors.",
                    "C": "Rising oceanic temperatures during the late Neoproterozoic caused widespread extinction among marine species.",
                    "D": "Fossil preservation remained relatively constant between the Ediacaran and Cambrian geological intervals."
                  },
                  "correct_answer": "B",
                  "explanation": "Bài đọc tổng kết sự bùng nổ các cấu trúc cơ thể động vật trong kỷ Cambri do tác động môi trường và sinh học."
                },
                {
                  "id": "f_r1_q5",
                  "prompt": "According to paragraph 1, how did Ediacaran organisms differ fundamentally from Cambrian organisms?",
                  "options": {
                    "A": "Ediacaran creatures possessed rigid biomineralized exoskeletons for armor.",
                    "B": "Ediacaran fauna were largely soft-bodied organisms with limited motility.",
                    "C": "Ediacaran species were active visual predators requiring vast oxygen stores.",
                    "D": "Ediacaran organisms were terrestrial rather than marine inhabitants"
                  },
                  "correct_answer": "B",
                  "explanation": "Sinh vật Ediacaran chủ yếu có thân mềm và khả năng vận động hạn chế."
                },
                {
                  "id": "f_r1_q6",
                  "prompt": "Why does the author discuss the surge in atmospheric oxygen concentrations?",
                  "options": {
                    "A": "To prove that terrestrial animal life evolved before marine organisms",
                    "B": "To explain a physiological prerequisite for heightened metabolic and locomotory demands",
                    "C": "To refute the hypothesis that predation influenced evolutionary rates",
                    "D": "To show why biomineralized shells decayed rapidly in ancient oceans"
                  },
                  "correct_answer": "B",
                  "explanation": "Oxy tăng cung cấp năng lượng chuyển hóa cần thiết cho sinh vật săn mồi chủ động."
                },
                {
                  "id": "f_r1_q7",
                  "prompt": "The word 'synergistic' in the passage is closest in meaning to:",
                  "options": {
                    "A": "contradictory",
                    "B": "combined and mutually reinforcing",
                    "C": "unsubstantiated",
                    "D": "chronologically sequential"
                  },
                  "correct_answer": "B",
                  "explanation": "'Synergistic' nghĩa là có tính tương hỗ, kết hợp cùng tăng cường hiệu quả."
                },
                {
                  "id": "f_r1_q8",
                  "prompt": "Which of the following can be inferred regarding biomineralized exoskeletons?",
                  "options": {
                    "A": "Organisms without biomineralized skeletons were less likely to leave enduring fossil evidence.",
                    "B": "Biomineralized armor rendered prey animals completely immune to predation.",
                    "C": "Predators developed exoskeletons long before prey species perceived any threat.",
                    "D": "The development of exoskeletons depleted the ocean of dissolved minerals."
                  },
                  "correct_answer": "A",
                  "explanation": "Bộ giáp khoáng hóa gia tăng khả năng lưu giữ hóa thạch, suy ra sinh vật không có giáp ít được bảo tồn hơn."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "full_s2_read_m2",
        "title": "Stage 2: Reading - Module 2 (Adaptive Higher Route)",
        "skill": "reading",
        "duration_seconds": 900,
        "tasks": [
          {
            "id": "f_r2_t1",
            "title": "Task 1: Complete the Words",
            "task_type": "complete_words",
            "content": {
              "paragraph": "Cognitive neuroscientists investigate how synaptic plasticity underpins memory formation in the hippocampus. During memory consol[idation], persistent pat[terns] of synap[tic] firing stren[gthen] dendritic connec[tions] through long-term poten[tiation]. This neurobiol[ogical] mech[anism] ena[bles] the cerebral cor[tex] to store stabi[lized] representations indepen[dent] of immediate sensory sti[muli].",
              "blanks": [
                { "id": "b1", "prefix": "consol", "missing": "idation", "full": "consolidation" },
                { "id": "b2", "prefix": "pat", "missing": "terns", "full": "patterns" },
                { "id": "b3", "prefix": "synap", "missing": "tic", "full": "synaptic" },
                { "id": "b4", "prefix": "stren", "missing": "gthen", "full": "strengthen" },
                { "id": "b5", "prefix": "connec", "missing": "tions", "full": "connections" },
                { "id": "b6", "prefix": "poten", "missing": "tiation", "full": "potentiation" },
                { "id": "b7", "prefix": "neurobiol", "missing": "ogical", "full": "neurobiological" },
                { "id": "b8", "prefix": "mech", "missing": "anism", "full": "mechanism" },
                { "id": "b9", "prefix": "ena", "missing": "bles", "full": "enables" },
                { "id": "b10", "prefix": "cor", "missing": "tex", "full": "cortex" },
                { "id": "b11", "prefix": "stabi", "missing": "lized", "full": "stabilized" },
                { "id": "b12", "prefix": "indepen", "missing": "dent", "full": "independent" }
              ]
            }
          },
          {
            "id": "f_r2_t2",
            "title": "Task 2: Read in Daily Life",
            "task_type": "daily_life",
            "content": {
              "document_type": "Graduate Thesis Archival & Embargo Directive",
              "passage": "All doctoral candidates must submit the finalized defense manuscript to the Institutional Repository no later than fourteen calendar days prior to the conferral ceremony. Candidates intending to file patent applications or commercialize intellectual property derived from their doctoral research may petition the Graduate Dean for a non-renewable twenty-four-month publication embargo. Such requests require written concurrence from the supervising faculty chair and must be formally endorsed prior to the final repository upload. Under no circumstance may an embargo request be retroactive once open-access digital dissemination has transpired.",
              "questions": [
                {
                  "id": "f_r2_q1",
                  "prompt": "What is the primary purpose of the directive?",
                  "options": {
                    "A": "To outline repository submission deadlines and procedures for intellectual property publication embargos",
                    "B": "To recruit peer reviewers for university doctoral defense panels",
                    "C": "To establish licensing fees for undergraduate commercial research ventures",
                    "D": "To cancel open-access academic repositories across university faculties"
                  },
                  "correct_answer": "A",
                  "explanation": "Văn bản hướng dẫn thời hạn nộp luận văn và thủ tục xin bảo mật ấn phẩm để bảo hộ sáng chế."
                },
                {
                  "id": "f_r2_q2",
                  "prompt": "Which condition is strictly required to establish a 24-month publication embargo?",
                  "options": {
                    "A": "An endorsement submitted after the digital manuscript has been publicly disseminated",
                    "B": "Written concurrence from the supervising department chair prior to manuscript upload",
                    "C": "A minimum five-year extension granted by the undergraduate council",
                    "D": "Complete redaction of the thesis title and candidate name from library records"
                  },
                  "correct_answer": "B",
                  "explanation": "Cần có sự đồng thuận bằng văn bản của giáo sư hướng dẫn trước khi tải tài liệu lên kho lưu trữ."
                },
                {
                  "id": "f_r2_q3",
                  "prompt": "According to the passage, when is an embargo request strictly prohibited?",
                  "options": {
                    "A": "Whenever submitted alongside doctoral defense forms",
                    "B": "After open-access digital dissemination has already transpired",
                    "C": "When sponsored by an external grant provider",
                    "D": "Prior to the fourteen-day pre-commencement deadline"
                  },
                  "correct_answer": "B",
                  "explanation": "Không được xin embargo khi luận văn đã được phổ biến công khai trên mạng số."
                }
              ]
            }
          },
          {
            "id": "f_r2_t3",
            "title": "Task 3: Academic Passage",
            "task_type": "academic_passage",
            "content": {
              "document_type": "Geochemistry & Planetary Science",
              "passage": "Planetary geochemists have long investigated the mechanisms that initiated Earth liquid outer core geodynamo, the convective process responsible for sustaining our geomagnetic protective shield. Conventional models posited that thermal convection alone, driven by initial planetary accretion heat, sufficed to drive the early dynamo. However, modern thermodynamic recalculations indicate that the core mantle boundary heat flux would have caused the liquid iron outer core to stratify, quenching thermal convection prematurely without an alternative energy driver. Recent experimental high-pressure diamond-anvil cell studies suggest that chemical exsolution of light elements provided the requisite buoyant forces. As the early core cooled, silicon and magnesium dissolved within molten iron exsolved at the core-mantle interface, precipitating upward into the lower mantle. This compositional buoyance propelled vigorous mechanical convection billions of years prior to the crystallization of the solid inner core. Consequently, this persistent chemical geodynamo shielded Earth early atmosphere from destructive solar wind ablation during the sun luminous adolescent phase.",
              "questions": [
                {
                  "id": "f_r2_q4",
                  "prompt": "What primary discrepancy prompted scientists to reevaluate traditional geodynamo models?",
                  "options": {
                    "A": "Evidence that the solar wind was entirely absent in the early solar system",
                    "B": "Calculations revealing that thermal convection alone would have halted due to core stratification",
                    "C": "The discovery that the inner core crystallized immediately upon planetary accretion",
                    "D": "Inconsistencies in the fossil records of Ediacaran marine species"
                  },
                  "correct_answer": "B",
                  "explanation": "Tính toán nhiệt động lực học cho thấy đối lưu nhiệt đơn thuần sẽ bị dập tắt do lõi bị phân tầng."
                },
                {
                  "id": "f_r2_q5",
                  "prompt": "According to the passage, how did the exsolution of silicon and magnesium facilitate core convection?",
                  "options": {
                    "A": "By cooling the outer core to temperatures below absolute zero",
                    "B": "By generating compositional buoyancy as lighter elements separated and ascended toward the mantle",
                    "C": "By converting iron into gaseous isotopes that dissipated through the crust",
                    "D": "By permanently stopping all physical movement within the lower mantle"
                  },
                  "correct_answer": "B",
                  "explanation": "Sự tách các nguyên tố nhẹ tạo lực nổi thành phần đẩy dòng đối lưu cơ học trong lõi."
                },
                {
                  "id": "f_r2_q6",
                  "prompt": "The word 'quenching' in the passage is closest in meaning to:",
                  "options": {
                    "A": "suppressing or extinguishing",
                    "B": "accelerating uncontrollably",
                    "C": "magnifying substantially",
                    "D": "igniting spontaneously"
                  },
                  "correct_answer": "A",
                  "explanation": "'Quenching' mang nghĩa dập tắt, triệt tiêu dòng đối lưu."
                },
                {
                  "id": "f_r2_q7",
                  "prompt": "Which of the following is NOT supported by the passage regarding the early geodynamo?",
                  "options": {
                    "A": "It protected the primordial atmosphere from solar wind degradation.",
                    "B": "It operated long before the crystallization of the solid inner core occurred.",
                    "C": "It depended exclusively on thermal convection driven by planetary accretion heat throughout Earth history.",
                    "D": "It relied upon light element exsolution occurring at the core-mantle interface."
                  },
                  "correct_answer": "C",
                  "explanation": "Phương án C sai vì bài đọc nhấn mạnh đối lưu nhiệt đơn thuần không thể duy trì liên tục."
                },
                {
                  "id": "f_r2_q8",
                  "prompt": "What can be inferred about Earth early atmosphere if the chemical geodynamo had failed to operate?",
                  "options": {
                    "A": "It would have expanded exponentially into interplanetary space without restriction.",
                    "B": "It likely would have suffered extensive stripping and depletion due to intense solar radiation.",
                    "C": "It would have transformed instantly into pure liquid iron.",
                    "D": "It would have remained entirely unaffected by solar phenomena."
                  },
                  "correct_answer": "B",
                  "explanation": "Nếu không có từ trường hóa học bảo vệ, khí quyển sẽ bị gió mặt trời bào mòn."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "full_s3_list_m1",
        "title": "Stage 3: Listening - Module 1",
        "skill": "listening",
        "duration_seconds": 870,
        "tasks": [
          {
            "id": "f_l1_t1",
            "title": "Task 1: Listen & Choose a Response (5 câu)",
            "task_type": "choose_response",
            "content": {
              "questions": [
                {
                  "id": "f_l1_q1",
                  "type": "choose_response",
                  "audio_text": "Do you happen to know whether the biology department library is open over the holiday weekend?",
                  "prompt": "Select the most appropriate response to what you heard:",
                  "options": {
                    "A": "Biology reference texts are located on the mezzanine level.",
                    "B": "Yes, but they are operating on reduced hours from noon to five.",
                    "C": "I usually borrow three books at a time for my coursework.",
                    "D": "The chemistry lab was completely renovated last semester."
                  },
                  "correct_answer": "B",
                  "explanation": "Câu B trả lời trực tiếp về giờ mở cửa dịp lễ."
                },
                {
                  "id": "f_l1_q2",
                  "type": "choose_response",
                  "audio_text": "I was wondering if Professor Vance accepts walk-ins during office hours or if appointments are mandatory?",
                  "prompt": "Select the most appropriate response to what you heard:",
                  "options": {
                    "A": "She prefers students to book online, but she will see you if no one is waiting.",
                    "B": "The lecture hall accommodates approximately three hundred students.",
                    "C": "Her syllabus was distributed during the introductory lecture.",
                    "D": "She has been teaching organic chemistry for nearly a decade."
                  },
                  "correct_answer": "A",
                  "explanation": "Câu A giải thích đúng quy định gặp mặt của giáo sư."
                },
                {
                  "id": "f_l1_q3",
                  "type": "choose_response",
                  "audio_text": "Has anyone submitted the group project proposal to the departmental portal yet?",
                  "prompt": "Select the most appropriate response to what you heard:",
                  "options": {
                    "A": "The departmental office is situated on the second floor.",
                    "B": "Elena uploaded the finalized draft right before the midnight deadline.",
                    "C": "Our group consists of four undergraduate researchers.",
                    "D": "The project rubric requires at least fifteen academic citations."
                  },
                  "correct_answer": "B",
                  "explanation": "Câu B xác nhận tình trạng đã nộp đề án nhóm."
                },
                {
                  "id": "f_l1_q4",
                  "type": "choose_response",
                  "audio_text": "Could you help me troubleshoot why the laboratory autoclave keeps displaying an error code?",
                  "prompt": "Select the most appropriate response to what you heard:",
                  "options": {
                    "A": "We sterilize glassware every Tuesday morning.",
                    "B": "You probably forgot to seal the secondary pressure release valve tightly.",
                    "C": "The autoclave was purchased from a medical equipment supplier.",
                    "D": "Laboratory coats are compulsory in all testing facilities."
                  },
                  "correct_answer": "B",
                  "explanation": "Câu B hướng dẫn giải quyết sự cố kỹ thuật trên thiết bị."
                },
                {
                  "id": "f_l1_q5",
                  "type": "choose_response",
                  "audio_text": "Would you mind if I borrowed your lecture notes from yesterday modern European history seminar?",
                  "prompt": "Select the most appropriate response to what you heard:",
                  "options": {
                    "A": "The history seminar meets twice weekly in Wilson Hall.",
                    "B": "Not at all, provided you return them before our study group session tonight.",
                    "C": "The midterm exam covers chapters five through eight.",
                    "D": "I am majoring in international relations and political philosophy."
                  },
                  "correct_answer": "B",
                  "explanation": "Câu B đồng ý cho mượn vở kèm điều kiện hợp lý."
                }
              ]
            }
          },
          {
            "id": "f_l1_t2",
            "title": "Task 2: Campus Announcement",
            "task_type": "announcement",
            "content": {
              "context_title": "Campus Notice: Molecular Biology Laboratory Ventilation Maintenance",
              "speaker": "Director of Campus Facilities & Laboratory Safety",
              "audio_text": "Attention all researchers and graduate students using the Molecular Biology Complex in the North Wing. Beginning this Friday at 6:00 PM, the central chemical fume hood exhaust ventilation system will undergo comprehensive diagnostic recalibration and filter replacement. Consequently, all experimental procedures involving volatile reagents, organic solvents, or biohazardous aerosols must cease promptly by 5:00 PM on Friday. The facility will remain under complete containment shutdown throughout the entire weekend. Swipe-card door access will be temporarily deactivated until Monday at 7:00 AM, when normal operations resume following air purity validation. We apologize for the scheduled disruption and request that all active cell cultures be safely incubated beforehand.",
              "questions": [
                {
                  "id": "f_l1_q6",
                  "prompt": "What is the primary purpose of the announcement?",
                  "options": {
                    "A": "To recruit graduate students for air quality testing positions",
                    "B": "To announce a temporary weekend closure for laboratory ventilation maintenance",
                    "C": "To solicit funding for advanced molecular biology research equipment",
                    "D": "To introduce new protocols for permanent biohazard disposal"
                  },
                  "correct_answer": "B",
                  "explanation": "Thông báo việc đóng cửa bảo trì hệ thống thông gió."
                },
                {
                  "id": "f_l1_q7",
                  "prompt": "What mandatory requirement must researchers fulfill by Friday at 5:00 PM?",
                  "options": {
                    "A": "Permanently discard all ongoing bacterial cell cultures",
                    "B": "Cease all experimental procedures involving volatile or hazardous materials",
                    "C": "Submit a formal petition to the facilities management office",
                    "D": "Surrender their physical swipe-card access credentials"
                  },
                  "correct_answer": "B",
                  "explanation": "Dừng mọi thí nghiệm với hóa chất bay hơi trước 5 giờ chiều thứ Sáu."
                }
              ]
            }
          },
          {
            "id": "f_l1_t3",
            "title": "Task 3: Campus Conversation",
            "task_type": "conversation",
            "content": {
              "context_title": "Student & Professor: Honors Thesis Methodology Revision",
              "speaker": "Student (Marcus) & Professor Davies",
              "audio_text": "Student: Professor Davies, thank you for meeting with me on short notice. I have hit a significant obstacle with my honors thesis methodology. Originally, I planned to collect longitudinal survey data from undergraduate volunteers regarding digital media consumption and sleep quality. But after three weeks, only twenty-five participants completed the daily sleep logs.\n\nProfessor Davies: That is a common hurdle with longitudinal self-reporting, Marcus. Twenty-five subjects will not provide sufficient statistical power for regression modeling. What alternatives have you considered?\n\nStudent: Well, I could either extend the data collection period into the spring semester, which might delay my graduation defense, or pivot toward analyzing an existing open-access epidemiological dataset, like the National Adolescent Health database.\n\nProfessor Davies: I strongly recommend utilizing the open-access database. It already contains verified biometric sleep tracking data from over two thousand subjects. You can adapt your original hypothesis and focus your analytical skills on multivariate statistical analysis. You would still finish your thesis well ahead of the May defense deadline.\n\nStudent: That is a tremendous relief! I will download the codebook today and revise my methodology chapter accordingly.",
              "questions": [
                {
                  "id": "f_l1_q8",
                  "prompt": "What is the primary problem the student brings to Professor Davies?",
                  "options": {
                    "A": "His thesis topic was formally rejected by the department head.",
                    "B": "Low volunteer participation resulted in an inadequate sample size for his methodology.",
                    "C": "He failed to register for graduation before the official spring deadline.",
                    "D": "The statistical software on his computer corrupted his survey responses."
                  },
                  "correct_answer": "B",
                  "explanation": "Cỡ mẫu khảo sát quá nhỏ do ít sinh viên tham gia."
                },
                {
                  "id": "f_l1_q9",
                  "prompt": "What course of action does Professor Davies recommend?",
                  "options": {
                    "A": "Postponing graduation until additional survey responses are collected",
                    "B": "Transitioning to analyze an existing public epidemiological dataset",
                    "C": "Discarding biometric sleep metrics entirely to write a purely theoretical paper",
                    "D": "Conducting in-person interviews with the current twenty-five participants"
                  },
                  "correct_answer": "B",
                  "explanation": "Giáo sư khuyên chuyển sang dùng dữ liệu dịch tễ học công khai có sẵn."
                },
                {
                  "id": "f_l1_q10",
                  "prompt": "How does the student feel about the professor recommendation at the end of the meeting?",
                  "options": {
                    "A": "Skeptical that the proposed dataset will answer his original questions",
                    "B": "Relieved and eager to immediately review the new dataset documentation",
                    "C": "Disappointed that his original experimental survey cannot continue",
                    "D": "Confused about how multivariate statistical models operate"
                  },
                  "correct_answer": "B",
                  "explanation": "Sinh viên cảm thấy nhẹ nhõm và hào hứng bắt tay nghiên cứu dữ liệu mới."
                }
              ]
            }
          },
          {
            "id": "f_l1_t4",
            "title": "Task 4: Academic Talk (Marine Ecology)",
            "task_type": "academic_talk",
            "content": {
              "context_title": "Lecture: Chemosynthesis in Deep-Sea Hydrothermal Vent Ecosystems",
              "speaker": "Professor of Biological Oceanography",
              "audio_text": "Good afternoon, class. Today we will explore hydrothermal vent ecosystems along tectonic mid-ocean ridges. Until their discovery in 1977, biological dogma asserted that virtually all complex life ultimately derived metabolic energy from solar radiation via photosynthesis. Hydrothermal vents shattered that assumption completely. In these aphotic abyssal zones, where sunlight cannot penetrate, vibrant biotic communities thrive around fissures discharging superheated mineral-rich fluids. The trophic foundation of this entire biome rests not on sunlight, but on chemosynthesis executed by specialized autotrophic bacteria. These microbes oxidize toxic hydrogen sulfide emitting from the vents, transforming chemical bond energy into organic carbohydrates. Remarkable symbiotic relationships have evolved around this process. For instance, the giant tube worm, Riftia pachyptila, possesses neither a mouth nor a digestive tract. Instead, its specialized organ—the trophosome—is densely packed with billions of sulfur-oxidizing bacteria. The worm vascular system transports sulfide and oxygen to the bacteria, which in return synthesize the nutrients essential for the worm survival. This represents an astonishing metabolic adaptation to an extreme environment.",
              "questions": [
                {
                  "id": "f_l1_q11",
                  "prompt": "What long-standing biological assumption did the discovery of hydrothermal vents disprove?",
                  "options": {
                    "A": "That marine organisms could survive without dissolved oxygen",
                    "B": "That all complex biological communities ultimately rely on solar energy",
                    "C": "That tectonic mid-ocean ridges remain completely geologically dormant",
                    "D": "That bacterial symbiosis is impossible in high-pressure environments"
                  },
                  "correct_answer": "B",
                  "explanation": "Bác bỏ quan niệm mọi sự sống đều phụ thuộc vào năng lượng mặt trời."
                },
                {
                  "id": "f_l1_q12",
                  "prompt": "How do autotrophic bacteria at hydrothermal vents produce organic compounds?",
                  "options": {
                    "A": "By filtering ambient nutrients drifting downward from the ocean surface",
                    "B": "By oxidizing hydrogen sulfide emitted from geothermal fissures",
                    "C": "By absorbing infrared radiation emitted by superheated basalt rock",
                    "D": "By decomposing skeletal remnants of prehistoric marine reptiles"
                  },
                  "correct_answer": "B",
                  "explanation": "Oxy hóa hydrogen sulfide để sản xuất hợp chất hữu cơ."
                },
                {
                  "id": "f_l1_q13",
                  "prompt": "Why does the professor describe the anatomy of the giant tube worm Riftia pachyptila?",
                  "options": {
                    "A": "To illustrate a specialized symbiotic reliance on internal chemosynthetic microbes",
                    "B": "To argue that tube worms are primitive ancestors of terrestrial annelids",
                    "C": "To demonstrate the harmful effects of volcanic sulfur on marine invertebrates",
                    "D": "To show how deep-sea predators consume hydrothermal mineral deposits"
                  },
                  "correct_answer": "A",
                  "explanation": "Minh họa mối quan hệ cộng sinh đặc biệt với vi khuẩn hóa tổng hợp."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "full_s4_list_m2",
        "title": "Stage 4: Listening - Module 2 (Adaptive Higher Route)",
        "skill": "listening",
        "duration_seconds": 870,
        "tasks": [
          {
            "id": "f_l2_t1",
            "title": "Task 1: Listen & Choose a Response (5 câu)",
            "task_type": "choose_response",
            "content": {
              "questions": [
                {
                  "id": "f_l2_q1",
                  "type": "choose_response",
                  "audio_text": "Do you know if the department fellowship application requires three letters of recommendation or two?",
                  "prompt": "Select the most appropriate response to what you heard:",
                  "options": {
                    "A": "Fellowship awards are disbursed during the autumn semester.",
                    "B": "The portal specifies two academic references and one professional endorsement.",
                    "C": "Letters of recommendation must be printed on official letterhead.",
                    "D": "The application portal was designed by computer engineering students."
                  },
                  "correct_answer": "B",
                  "explanation": "Câu B trả lời chính xác và đầy đủ yêu cầu hồ sơ."
                },
                {
                  "id": "f_l2_q2",
                  "type": "choose_response",
                  "audio_text": "I am concerned that our spectrophotometer calibration curve might be skewed due to solvent contamination.",
                  "prompt": "Select the most appropriate response to what you heard:",
                  "options": {
                    "A": "Let us prepare a fresh blank standard solution and re-measure the baseline absorbance.",
                    "B": "The chemistry laboratory was built forty years ago.",
                    "C": "The spectrophotometer weighs approximately twenty kilograms.",
                    "D": "Analytical chemistry courses are offered every spring semester."
                  },
                  "correct_answer": "A",
                  "explanation": "Câu A đề xuất biện pháp xử lý chuẩn."
                },
                {
                  "id": "f_l2_q3",
                  "type": "choose_response",
                  "audio_text": "Were you able to obtain permission from the institutional review board for your psychology experiment?",
                  "prompt": "Select the most appropriate response to what you heard:",
                  "options": {
                    "A": "Psychology majors must complete sixty semester hours of core coursework.",
                    "B": "Yes, we received expedited approval after modifying our participant debriefing protocol.",
                    "C": "The review board convenes on the third Wednesday of every month.",
                    "D": "Our experimental cohort consists entirely of senior undergraduates."
                  },
                  "correct_answer": "B",
                  "explanation": "Câu B trả lời đúng tình trạng phê duyệt đạo đức."
                },
                {
                  "id": "f_l2_q4",
                  "type": "choose_response",
                  "audio_text": "Should we reserve the seminar room for two hours or extend it to three for the thesis defense?",
                  "prompt": "Select the most appropriate response to what you heard:",
                  "options": {
                    "A": "Three hours is safer because faculty deliberations can frequently take longer than anticipated.",
                    "B": "The seminar room is equipped with an overhead digital projector.",
                    "C": "Thesis defense presentations are open to all department graduate students.",
                    "D": "Dr. Anderson serves as the chair of the thesis evaluation committee."
                  },
                  "correct_answer": "A",
                  "explanation": "Câu A giải thích lý do nên dự phòng thêm thời gian."
                },
                {
                  "id": "f_l2_q5",
                  "type": "choose_response",
                  "audio_text": "Do you happen to recall whether Dr. Henderson posted the supplementary readings on the course dashboard?",
                  "prompt": "Select the most appropriate response to what you heard:",
                  "options": {
                    "A": "He announced he would upload the journal articles by five this afternoon.",
                    "B": "The bookstore charges twenty dollars for the course syllabus packet.",
                    "C": "Supplementary readings are optional for non-degree seeking students.",
                    "D": "The course dashboard is hosted on a secure cloud server."
                  },
                  "correct_answer": "A",
                  "explanation": "Câu A cung cấp thông tin chính xác về thời gian đăng tải."
                }
              ]
            }
          },
          {
            "id": "f_l2_t2",
            "title": "Task 2: Campus Announcement",
            "task_type": "announcement",
            "content": {
              "context_title": "Campus Notice: High-Performance Computing Cluster Scheduled Migration",
              "speaker": "Chief Information Officer & Research Infrastructure Director",
              "audio_text": "Attention all faculty, postdoctoral scholars, and graduate researchers utilizing the university High-Performance Computing cluster, known as Orion. To accommodate escalating computational modeling demands across computational biology, astrophysics, and climate modeling, Orion will undergo complete system architecture migration starting Saturday, October 14th at 8:00 AM through Sunday at 11:59 PM. During this 40-hour maintenance window, all active batch processing jobs will be forcefully terminated unless checkpointed in advance. Researchers must ensure that iterative simulations write checkpoint state files prior to Friday midnight to prevent catastrophic data loss. Furthermore, the external file transfer protocol nodes will be entirely inaccessible. Normal computational batch queues will reopen on Monday at 6:00 AM with double the existing GPU processing nodes available. We appreciate your cooperation in facilitating this critical infrastructure enhancement.",
              "questions": [
                {
                  "id": "f_l2_q6",
                  "prompt": "What is the primary purpose of the computing cluster shutdown?",
                  "options": {
                    "A": "To terminate all unauthorized research simulation programs permanently",
                    "B": "To perform system migration and install expanded high-performance computational hardware",
                    "C": "To reassign computing resources exclusively to undergraduate coursework",
                    "D": "To audit energy consumption metrics across university server centers"
                  },
                  "correct_answer": "B",
                  "explanation": "Nâng cấp kiến trúc phần cứng máy tính hiệu năng cao."
                },
                {
                  "id": "f_l2_q7",
                  "prompt": "What precaution must researchers take before Friday midnight to protect their active simulations?",
                  "options": {
                    "A": "Transfer all program scripts to physical external hard drives",
                    "B": "Ensure iterative calculations write checkpoint state files before the cutoff",
                    "C": "Request an individualized exemption from the Chief Information Officer",
                    "D": "Relocate their simulation queues to external university servers"
                  },
                  "correct_answer": "B",
                  "explanation": "Lưu file checkpoint để tránh mất dữ liệu tính toán."
                }
              ]
            }
          },
          {
            "id": "f_l2_t3",
            "title": "Task 3: Campus Conversation",
            "task_type": "conversation",
            "content": {
              "context_title": "Student & Senior Lab Director: Mass Spectrometry Anomaly & Protocol Revision",
              "speaker": "Graduate Student (Chloe) & Dr. Ramirez (Senior Lab Director)",
              "audio_text": "Student: Dr. Ramirez, do you have a few minutes? During our isotopic chromatography runs this morning, our mass spectrometer produced erratic baseline drift and anomalous retention peaks across our synthesized organic samples.\n\nDr. Ramirez: That sounds concerning, Chloe. Did you inspect the ionization chamber before injecting the batch, or did you rely on yesterday calibration baseline?\n\nStudent: Well, we performed the automatic diagnostic wash, but we did not manually clean the electrospray ionization needle. We were rushing to complete the batch before our afternoon seminar.\n\nDr. Ramirez: Ah, that explains the anomaly. Residual non-volatile polymers from yesterday synthetic peptide trial likely precipitated onto the capillary emitter, interfering with ion desorption and producing those ghost retention peaks. Rushing complex instrumentation protocol always costs more time in the long run.\n\nStudent: I see... So our current spectral readings are completely compromised?\n\nDr. Ramirez: Unfortunately, yes. You will need to disassemble the ion source, sonicate the emitter needle in high-purity methanol, and re-run a five-point standard calibration before testing any further samples. Take your time and document every step in the equipment logbook.\n\nStudent: Understood, Dr. Ramirez. I will cancel our afternoon testing schedule and overhaul the ionization source immediately.",
              "questions": [
                {
                  "id": "f_l2_q8",
                  "prompt": "What caused the erroneous readings on the mass spectrometer?",
                  "options": {
                    "A": "A sudden mechanical malfunction in the laboratory refrigeration unit",
                    "B": "Contaminant residue left on the ionization needle due to an omitted manual cleaning step",
                    "C": "Incompatible software updates installed on the analytical computer",
                    "D": "Expired chemical reagent bottles utilized during sample synthesis"
                  },
                  "correct_answer": "B",
                  "explanation": "Cặn polyme tích tụ trên kim phun ion do bỏ qua bước rửa thủ công."
                },
                {
                  "id": "f_l2_q9",
                  "prompt": "What does Dr. Ramirez advise Chloe to do with her current experimental data?",
                  "options": {
                    "A": "Use statistical algorithms to smooth out the anomalous baseline peaks",
                    "B": "Discard the contaminated readings and rerun the trials after thorough equipment maintenance",
                    "C": "Submit the preliminary results immediately to the department evaluation committee",
                    "D": "Transfer the samples to another university testing facility without modification"
                  },
                  "correct_answer": "B",
                  "explanation": "Hủy bỏ kết quả hỏng và đo lại sau khi vệ sinh máy móc."
                },
                {
                  "id": "f_l2_q10",
                  "prompt": "What broader lesson does Dr. Ramirez emphasize regarding laboratory conduct?",
                  "options": {
                    "A": "Advanced instrumentation should only be operated by tenured faculty members.",
                    "B": "Rushing instrument protocols inevitably wastes more time than it saves.",
                    "C": "Diagnostic software washes are completely useless in chemical research.",
                    "D": "Seminars should take priority over daily laboratory experimental duties"
                  },
                  "correct_answer": "B",
                  "explanation": "Hấp tấp bỏ qua quy trình chỉ làm tốn nhiều thời gian hơn."
                }
              ]
            }
          },
          {
            "id": "f_l2_t4",
            "title": "Task 4: Academic Talk (Astrophysics)",
            "task_type": "academic_talk",
            "content": {
              "context_title": "Lecture: Gravitational Lensing as a Probe for Dark Matter Mapping",
              "speaker": "Professor of Astrophysics",
              "audio_text": "Welcome back. Today we delve into gravitational lensing, an observational phenomenon originating directly from Einstein general theory of relativity. Einstein posited that mass curves spacetime; consequently, when light emitted from a distant luminous source—such as a background quasar—traverses the gravitational potential well of an intervening massive object, its trajectory deflects. When the intervening lens is a massive galaxy cluster, this deflection produces distinct observational manifestations: distorted arclets, magnified multiple images, and luminous Einstein rings. What makes gravitational lensing extraordinary for contemporary cosmology is its utility as an impartial cosmic balance scale. Luminous matter—stars, interstellar dust, and ionized gas—accounts for merely fifteen percent of the total gravitational mass observed in galaxy clusters. By mathematically reconstructing the deflection geometry of lensed background light, astrophysicists can map the spatial distribution of the remaining eighty-five percent: elusive, non-baryonic dark matter. A seminal illustration is the Bullet Cluster. When two massive clusters collided, X-ray imaging demonstrated that normal baryonic gas collided and decelerated in the center due to electromagnetic friction. However, gravitational lensing revealed that the center of mass passed straight through unhindered, proving that dark matter interacts almost exclusively via gravity.",
              "questions": [
                {
                  "id": "f_l2_q11",
                  "prompt": "According to the lecture, what physical mechanism causes gravitational lensing?",
                  "options": {
                    "A": "Electromagnetic absorption of light waves passing through interstellar gas clouds",
                    "B": "The curvature of spacetime induced by the mass of an intervening cosmic object",
                    "C": "Intense nuclear fusion reactions occurring on the surfaces of background quasars",
                    "D": "Thermal fluctuations within the cosmic microwave background radiation"
                  },
                  "correct_answer": "B",
                  "explanation": "Độ cong của không thời gian làm bẻ cong đường đi của ánh sáng."
                },
                {
                  "id": "f_l2_q12",
                  "prompt": "Why is gravitational lensing uniquely valuable for investigating dark matter?",
                  "options": {
                    "A": "It converts non-baryonic particles into observable visual spectrum light.",
                    "B": "It allows astrophysicists to determine total mass distribution independent of whether matter emits light.",
                    "C": "It demonstrates that dark matter is composed entirely of ionized interstellar gas.",
                    "D": "It accelerates cosmic expansion within distant elliptical galaxies."
                  },
                  "correct_answer": "B",
                  "explanation": "Đo lường tổng phân bố khối lượng độc lập với sự phát sáng của vật chất."
                },
                {
                  "id": "f_l2_q13",
                  "prompt": "What key insight was derived from observations of the Bullet Cluster collision?",
                  "options": {
                    "A": "Baryonic gas and dark matter collided and fused together in the center.",
                    "B": "Dark matter exhibited no electromagnetic drag, passing unhindered past the decelerated baryonic gas.",
                    "C": "Gravitational lensing effects disappeared completely during galactic collisions.",
                    "D": "General relativity fails to predict gravitational interactions at cluster scales."
                  },
                  "correct_answer": "B",
                  "explanation": "Vật chất tối không chịu lực ma sát điện từ nên di chuyển tự do xuyên qua va chạm."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "full_s5_writing",
        "title": "Stage 5: Writing Section (Linear - 23 Mins)",
        "skill": "writing",
        "duration_seconds": 1380,
        "tasks": [
          {
            "id": "f_w_t1",
            "title": "Task 1: Build a Sentence (10 câu)",
            "task_type": "build_sentence",
            "content": {
              "instructions": "Sắp xếp các từ thành câu hoàn chỉnh đúng ngữ pháp. 100% từ viết thường, không có dấu câu.",
              "items": [
                {
                  "id": "f_w_item1",
                  "context": "Professor: 'Why were several questions on the biology midterm exam revised this morning?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["ambiguous", "contain", "the", "wording", "materials", "contained", "questions", "a"],
                  "correct_order": ["the", "questions", "contained", "ambiguous", "wording"],
                  "correct_sentence": "the questions contained ambiguous wording.",
                  "decoys": ["contain", "materials", "a"]
                },
                {
                  "id": "f_w_item2",
                  "context": "Lab Partner: 'Did the chemistry research team expect such an immediate reaction from the catalyst?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["witnessed", "such", "chemists", "have", "seldom", "rates", "accelerated", "reaction", "witnessing"],
                  "correct_order": ["seldom", "have", "chemists", "witnessed", "such", "accelerated", "reaction", "rates"],
                  "correct_sentence": "seldom have chemists witnessed such accelerated reaction rates.",
                  "decoys": ["rates", "witnessing"]
                },
                {
                  "id": "f_w_item3",
                  "context": "Advisor: 'How did Elena manage to identify the data anomaly so rapidly?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["the", "the", "discrepancy", "analyzed", "having", "spreadsheet", "thoroughly", "she", "spotted", "analyzing"],
                  "correct_order": ["having", "analyzed", "the", "spreadsheet", "thoroughly", "she", "spotted", "the", "discrepancy"],
                  "correct_sentence": "having analyzed the spreadsheet thoroughly she spotted the discrepancy.",
                  "decoys": ["analyzing"]
                },
                {
                  "id": "f_w_item4",
                  "context": "Dean: 'What prevented the department from expanding undergraduate research funding this term?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["allocated", "been", "were", "had", "adequate", "resources", "fellowships", "more", "offered", "would", "be", "allocating"],
                  "correct_order": ["had", "adequate", "resources", "been", "allocated", "more", "fellowships", "would", "be", "offered"],
                  "correct_sentence": "had adequate resources been allocated more fellowships would be offered.",
                  "decoys": ["were", "allocating"]
                },
                {
                  "id": "f_w_item5",
                  "context": "Investigator: 'What caused the power failure throughout the entire engineering wing?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["the", "grid", "thermal", "overload", "that", "tripped", "was", "it", "circuit", "trip"],
                  "correct_order": ["it", "was", "the", "thermal", "overload", "that", "tripped", "the", "circuit"],
                  "correct_sentence": "it was the thermal overload that tripped the circuit.",
                  "decoys": ["grid", "trip"]
                },
                {
                  "id": "f_w_item6",
                  "context": "Colleague: 'Why is Dr. Vance fossil discovery attracting so much international attention?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["to", "have", "proven", "the", "specimen", "is", "transitional", "widely", "considered", "proves", "specimens"],
                  "correct_order": ["the", "specimen", "is", "widely", "considered", "to", "have", "proven", "transitional"],
                  "correct_sentence": "the specimen is widely considered to have proven transitional.",
                  "decoys": ["proves", "specimens"]
                },
                {
                  "id": "f_w_item7",
                  "context": "Mentor: 'What determines the credibility of an environmental impact study?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["the", "the", "methodology", "more", "rigorous", "findings", "reliable", "the", "more", "become", "became"],
                  "correct_order": ["the", "more", "rigorous", "the", "methodology", "the", "more", "reliable", "findings", "become"],
                  "correct_sentence": "the more rigorous the methodology the more reliable findings become.",
                  "decoys": ["became"]
                },
                {
                  "id": "f_w_item8",
                  "context": "Director: 'Did the field team complete the geological survey on schedule?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["severe", "blizzards", "despite", "facing", "mapping", "finished", "they", "the", "boundary", "faced", "blizzard"],
                  "correct_order": ["despite", "facing", "severe", "blizzards", "they", "finished", "the", "boundary", "mapping"],
                  "correct_sentence": "despite facing severe blizzards they finished the boundary mapping.",
                  "decoys": ["faced", "blizzard"]
                },
                {
                  "id": "f_w_item9",
                  "context": "Instructor: 'What is the most difficult aspect of the computational modeling seminar?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["algorithmic", "mastering", "patience", "statistical", "enormous", "simulations", "requires", "mastered", "require"],
                  "correct_order": ["mastering", "algorithmic", "statistical", "simulations", "requires", "enormous", "patience"],
                  "correct_sentence": "mastering algorithmic statistical simulations requires enormous patience.",
                  "decoys": ["mastered", "require"]
                },
                {
                  "id": "f_w_item10",
                  "context": "Librarian: 'What did the archival committee decide concerning rare historical manuscripts?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["be", "manuscripts", "they", "fragile", "agreed", "must", "digitized", "promptly", "agreeing", "digitize"],
                  "correct_order": ["they", "agreed", "fragile", "manuscripts", "must", "be", "digitized", "promptly"],
                  "correct_sentence": "they agreed fragile manuscripts must be digitized promptly.",
                  "decoys": ["agreeing", "digitize"]
                }
              ]
            }
          },
          {
            "id": "f_w_t2",
            "title": "Task 2: Write an Email",
            "task_type": "write_email",
            "content": {
              "recipient": "Professor Dr. Miller",
              "subject_hint": "Request for Research Assistantship in Evolutionary Biology",
              "scenario": "You want to apply for an undergraduate research assistant position in Dr. Miller's evolutionary biology laboratory for the upcoming summer semester.",
              "requirements": [
                "Express your strong interest in the laboratory's ongoing paleogenomics projects",
                "Highlight your relevant lab skills, analytical coursework, and PCR sequencing experience",
                "Request a brief in-person or virtual meeting to discuss potential openings"
              ],
              "min_words": 80,
              "recommended_words": "100 - 130 words"
            }
          },
          {
            "id": "f_w_t3",
            "title": "Task 3: Academic Discussion",
            "task_type": "academic_discussion",
            "content": {
              "topic": "Remote Work and Corporate Innovation",
              "course": "MGMT 320: Organizational Behavior",
              "professor_prompt": {
                "name": "Dr. Angela Davies",
                "title": "Professor of Organizational Behavior",
                "question": "Some corporations are requiring employees to return full-time to the physical office, arguing that in-person collaboration drives breakthroughs, while others champion flexible hybrid models. In your opinion, does remote work primarily foster or hinder innovation and collaborative culture? State your position and defend it."
              },
              "peer_posts": [
                {
                  "student": "David",
                  "stance": "Face-to-face interaction is indispensable for spontaneous brainstorming, mentoring junior colleagues, and cultivating organic camaraderie that digital screens simply cannot replicate."
                },
                {
                  "student": "Jessica",
                  "stance": "Remote flexibility dramatically reduces commuting fatigue and empowers employees to deliver deeper focus work, while asynchronous cloud collaboration tools connect global talents effortlessly."
                }
              ],
              "min_words": 100,
              "recommended_words": "100 - 150 words"
            }
          }
        ]
      },
      {
        "id": "full_s6_speaking",
        "title": "Stage 6: Speaking Section (Linear - 8 Mins)",
        "skill": "speaking",
        "duration_seconds": 480,
        "tasks": [
          {
            "id": "f_sp_t1",
            "title": "Task 1: Listen and Repeat (7 câu)",
            "task_type": "listen_and_repeat",
            "content": {
              "instructions": "Lắng nghe 7 câu nói và lặp lại chính xác từng từ vào micro. Không có thời gian chuẩn bị.",
              "items": [
                {
                  "id": "f_sp_i1",
                  "context": "University Bookstore",
                  "audio_text": "Textbooks for the semester can be purchased online.",
                  "word_count": 8,
                  "speak_seconds": 8,
                  "phonetic_guide": "ˈtɛkstbʊks fɔː ðə sɪˈmɛstər kæn biː ˈpɜːtʃəst ˈɒnˌlaɪn."
                },
                {
                  "id": "f_sp_i2",
                  "context": "Campus Transportation",
                  "audio_text": "The campus shuttle operates between student dormitories every fifteen minutes.",
                  "word_count": 10,
                  "speak_seconds": 9,
                  "phonetic_guide": "ðə ˈkæmpəs ˈʃʌtl ˈɒpəreɪts bɪˈtwiːn ˈstjuːdnt ˈdɔːmɪtriz ˈɛvri ˈfɪfˈtiːn ˈmɪnɪts."
                },
                {
                  "id": "f_sp_i3",
                  "context": "Science Laboratory",
                  "audio_text": "Please return all protective safety goggles to the designated storage cabinet.",
                  "word_count": 11,
                  "speak_seconds": 10,
                  "phonetic_guide": "pliːz rɪˈtɜːn ɔːl prəˈtɛktɪv ˈseɪfti ˈɡɒɡlz tuː ðə ˈdɛzɪɡneɪtɪd ˈstɔːrɪdʒ ˈkæbɪnɪt."
                },
                {
                  "id": "f_sp_i4",
                  "context": "Registrar Office",
                  "audio_text": "Graduate teaching assistants must submit their midterm grade evaluations before noon tomorrow.",
                  "word_count": 12,
                  "speak_seconds": 11,
                  "phonetic_guide": "ˈɡrædʒueɪt ˈtiːtʃɪŋ əˈsɪstənts mʌst səbˈmɪt ðeər ˈmɪdtɜːm ɡreɪd ɪˌvæljuˈeɪʃənz bɪˈfɔː nuːn təˈmɒrəʊ."
                },
                {
                  "id": "f_sp_i5",
                  "context": "Academic Advising",
                  "audio_text": "Students who fail to verify their prerequisite courses will forfeit their laboratory access credentials.",
                  "word_count": 14,
                  "speak_seconds": 12,
                  "phonetic_guide": "ˈstjuːdnts huː feɪl tuː ˈvɛrɪfaɪ ðeər ˌpriːˈrɛkwɪzɪt ˈkɔːsɪz wɪl ˈfɔːfɪt ðeər ləˈbɒrətri ˈæksɛs krɪˈdɛnʃəlz."
                },
                {
                  "id": "f_sp_i6",
                  "context": "Archaeology Seminar",
                  "audio_text": "Recent archaeological excavations have revealed unexpected evidence regarding prehistoric trade networks throughout the Mediterranean.",
                  "word_count": 14,
                  "speak_seconds": 12,
                  "phonetic_guide": "ˈriːsnt ˌɑːkiəˈlɒdʒɪkl ˌɛkskəˈveɪʃənz hæv rɪˈviːld ˌʌnɪkˈspɛktɪd ˈɛvɪdəns rɪˈɡɑːdɪŋ ˌpriːhɪsˈtɒrɪk treɪd ˈnɛtwɜːks θruːˈaʊt ðə ˌmɛdɪtəˈreɪniən."
                },
                {
                  "id": "f_sp_i7",
                  "context": "University Administration",
                  "audio_text": "The university administration announced a comprehensive renovation plan for the undergraduate physical sciences research facility.",
                  "word_count": 15,
                  "speak_seconds": 12,
                  "phonetic_guide": "ðə ˌjuːnɪˈvɜːsɪti ədˌmɪnɪˈstreɪʃn əˈnaʊnst ə ˌkɒmprɪˈhɛnsɪv ˌrɛnəˈveɪʃn plæn fɔː ðə ˌʌndəˈɡrædʒueɪt ˈfɪzɪkl ˈsaɪənsɪz rɪˈsɜːtʃ fəˈsɪlɪti."
                }
              ]
            }
          },
          {
            "id": "f_sp_t2",
            "title": "Task 2: Take an Interview (4 câu)",
            "task_type": "take_an_interview",
            "content": {
              "topic": "Campus Jobs and Professional Development",
              "interviewer": {
                "name": "Prof. David Clark",
                "title": "Director of Career Advising",
                "avatar_initials": "DC"
              },
              "questions": [
                {
                  "id": "f_sp_q1",
                  "question_number": 1,
                  "audio_text": "Welcome! Could you share what type of on-campus job you would be most interested in having, and why?",
                  "speak_seconds": 45,
                  "sample_answer": "I would be most interested in working as a peer tutor in the university writing center. This position would allow me to assist fellow students with essay structuring and argumentation while simultaneously reinforcing my own analytical thinking and academic communication skills.",
                  "key_points": ["Nêu công việc cụ thể (peer tutor)", "Lý do hỗ trợ sinh viên và rèn luyện kỹ năng phân tích"]
                },
                {
                  "id": "f_sp_q2",
                  "question_number": 2,
                  "audio_text": "In your opinion, what is the most significant benefit students gain from working part-time while attending university?",
                  "speak_seconds": 45,
                  "sample_answer": "In my view, the most significant benefit is mastering practical time management. Balancing shift responsibilities with rigorous academic coursework forces students to prioritize deadlines systematically, eliminate procrastination, and build professional accountability that textbooks alone cannot teach.",
                  "key_points": ["Khẳng định lợi ích quản lý thời gian", "Dẫn chứng tính kỷ luật từ thực tế cân bằng việc học và việc làm"]
                },
                {
                  "id": "f_sp_q3",
                  "question_number": 3,
                  "audio_text": "How would you handle a situation where an urgent work assignment conflicts with a major exam deadline?",
                  "speak_seconds": 45,
                  "sample_answer": "If an urgent work duty coincided with a major exam, I would immediately communicate proactively with my supervisor to explain the conflict well in advance. I would propose rescheduling my work shift or delegating non-critical tasks to a colleague, ensuring academic priorities remain uncompromised while fulfilling job commitments responsibly.",
                  "key_points": ["Giao tiếp chủ động và sớm", "Đề xuất đổi ca hoặc bàn giao công việc hợp lý"]
                },
                {
                  "id": "f_sp_q4",
                  "question_number": 4,
                  "audio_text": "What key personal quality do you believe is most essential for someone to succeed in a student leadership role?",
                  "speak_seconds": 45,
                  "sample_answer": "I firmly believe that empathy combined with active listening is the single most essential quality. An effective student leader must understand diverse perspectives, foster inclusive consensus, and empower team members rather than simply issuing top-down directives.",
                  "key_points": ["Nêu phẩm chất cốt lõi: thấu cảm và lắng nghe", "Giải thích vì sao giúp lãnh đạo đoàn kết và hiệu quả"]
                }
              ]
            }
          }
        ]
      }
    ]
  }
]

---

# OUTPUT RULES — BẮT BUỘC

1. Chỉ trả về **JSON thuần túy**.
2. Không Markdown, không \`\`\`json, không giải thích.
3. Đúng 6 stages theo thứ tự: Reading M1 -> Reading M2 -> Listening M1 -> Listening M2 -> Writing -> Speaking.
4. ĐẦY ĐỦ 100% CÁC CÂU HỎI VÀ ĐOẠN VĂN THEO ĐÚNG ĐỊNH LƯỢNG ĐÃ NÊU, TUYỆT ĐỐI KHÔNG CẮT BỚT.
5. Đáp án trắc nghiệm A, B, C, D BẮT BUỘC phải phân bố đều và ngẫu nhiên (~25% mỗi chữ cái).
6. Task 1 Build a Sentence: BẮT BUỘC đủ 10 items (item1 đến item10), 100% từ trong scrambled, correct_order, decoys PHẢI viết thường, và scrambled PHẢI đảo lộn xộn.
7. Complete the Words: Đoạn văn 80-110 từ, câu đầu nguyên vẹn, 10-12 blanks, từ khuyết chữ cái PHẢI viết kèm ngoặc vuông prefix[missing].
8. Speaking Task 1 đủ 7 items (tăng dần 6-15 từ + IPA), Task 2 đủ 4 câu hỏi 45s.`;

/**
 * Trả về prompt chuẩn ETS 2026 dựa theo skillType và subType
 */
export function getExamPrompt(skillType = 'full', writingSubtype = 'full') {
  const normSkill = (skillType || 'full').toLowerCase();
  
  if (normSkill === 'reading') {
    return SAMPLE_READING_PROMPT;
  }
  
  if (normSkill === 'listening') {
    return SAMPLE_LISTENING_PROMPT;
  }
  
  if (normSkill === 'speaking') {
    return SAMPLE_SPEAKING_PROMPT;
  }
  
  if (normSkill === 'writing' || normSkill.startsWith('writing_')) {
    const sub = normSkill.startsWith('writing_') ? normSkill.replace('writing_', '') : writingSubtype;
    if (sub === 'sentence' || sub === 'build_sentence') {
      return SAMPLE_WRITING_SENTENCE_PROMPT;
    }
    if (sub === 'email' || sub === 'write_email') {
      return SAMPLE_WRITING_EMAIL_PROMPT;
    }
    if (sub === 'discussion' || sub === 'academic_discussion') {
      return SAMPLE_WRITING_DISCUSSION_PROMPT;
    }
    return SAMPLE_WRITING_PROMPT;
  }
  
  return SAMPLE_FULL_TEST_PROMPT;
}
