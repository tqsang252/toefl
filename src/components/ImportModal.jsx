import React, { useState, useEffect } from 'react';
import { X, Sparkles, Upload, Copy, Check, FileCode, AlertCircle, Info, Wand2, Database } from 'lucide-react';
import { jsonrepair } from 'jsonrepair';
import { importBatchTests } from '../lib/supabase';
import { generateExamWithGemini, isGeminiConfigured, isOpenRouterConfigured } from '../lib/gemini';

const SAMPLE_READING_PROMPT = `Hãy đóng vai là chuyên gia luyện thi TOEFL iBT 2026. Tạo cho tôi 1 bộ đề FULL READING gồm 2 Module thích ứng (Module 1 và Module 2), mỗi Module có đủ: Complete the Words (1-2 đoạn), Read in Daily Life (1 bài), và Academic Passage (1 bài).

⚠️ QUY TẮC BẮT BUỘC ĐỂ ĐỀ THI ĐẠT CHUẨN THI THẬT ETS:
1. ĐÁP ÁN TRẮC NGHIỆM PHẢI PHÂN BỐ ĐỀU VÀ NGẪU NHIÊN:
   - Các đáp án đúng ('correct_answer') BẮT BUỘC phải phân bố đều và ngẫu nhiên giữa các phương án A, B, C, D (mỗi phương án chiếm khoảng 25%).
   - TUYỆT ĐỐI KHÔNG để tất cả hoặc đa số câu hỏi đều có đáp án là A. Phải xáo trộn ngẫu nhiên vị trí đáp án đúng vào B, C, D, A.
2. VỚI DẠNG COMPLETE THE WORDS:
   - Trong 'paragraph', các từ khuyết chữ cái PHẢI viết kèm ngoặc vuông [phần_đuôi_khuyết] (ví dụ: 'Solar energy is becom[ing] the most popu[lar] altern[ative] res[ources]...').

Cấu trúc JSON chuẩn:
[
  {
    "title": "Reading Full Test 02",
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
              "paragraph": "Solar energy is becom[ing] the most popu[lar] altern[ative] res[ources]...",
              "blanks": [
                { "id": "b1", "prefix": "becom", "missing": "ing", "full": "becoming" },
                { "id": "b2", "prefix": "popu", "missing": "lar", "full": "popular" }
              ]
            }
          },
          {
            "id": "s1_t2",
            "title": "Task 2: Read in Daily Life",
            "task_type": "daily_life",
            "content": {
              "document_type": "Campus Housing Notice",
              "passage": "Library hours during holiday...",
              "questions": [
                {
                  "id": "q1",
                  "prompt": "When does the library close?",
                  "options": { "A": "Midnight", "B": "5 PM", "C": "10 PM", "D": "8 PM" },
                  "correct_answer": "B",
                  "explanation": "Paragraph 1 mentions 5 PM."
                }
              ]
            }
          },
          {
            "id": "s1_t3",
            "title": "Task 3: Academic Passage",
            "task_type": "academic_passage",
            "content": {
              "document_type": "Geology Passage",
              "passage": "Volcanic eruptions along tectonic plates...",
              "questions": [
                {
                  "id": "q2",
                  "prompt": "What triggers magma ascent?",
                  "options": { "A": "Tidal waves", "B": "Wind currents", "C": "Solar flares", "D": "Pressure differences" },
                  "correct_answer": "D",
                  "explanation": "Magma rises due to buoyancy and pressure differences."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "stage_2",
        "title": "Reading - Module 2 (Stage 2 - Adaptive)",
        "duration_seconds": 900,
        "tasks": [
          {
            "id": "s2_t1",
            "title": "Task 1: Complete the Words",
            "task_type": "complete_words",
            "content": {
              "paragraph": "Ancient civil[izations] built monumental archit[ecture]...",
              "blanks": [
                { "id": "b3", "prefix": "civil", "missing": "izations", "full": "civilizations" }
              ]
            }
          },
          {
            "id": "s2_t2",
            "title": "Task 2: Read in Daily Life",
            "task_type": "daily_life",
            "content": {
              "passage": "Gym membership policies...",
              "questions": [
                {
                  "id": "q3",
                  "prompt": "Who is eligible?",
                  "options": { "A": "Only faculty", "B": "Alumni only", "C": "Full-time students", "D": "Visitors" },
                  "correct_answer": "C",
                  "explanation": "Eligible for all full-time registered students."
                }
              ]
            }
          },
          {
            "id": "s2_t3",
            "title": "Task 3: Academic Passage",
            "task_type": "academic_passage",
            "content": {
              "passage": "Neural plasticity in adult primates...",
              "questions": [
                {
                  "id": "q4",
                  "prompt": "What is neuroplasticity?",
                  "options": { "A": "Brain adaptation and neural rewiring", "B": "Bone growth", "C": "Blood flow", "D": "Muscle contraction" },
                  "correct_answer": "A",
                  "explanation": "Ability of neural networks to rewire."
                }
              ]
            }
          }
        ]
      }
    ]
  }
]
QUY TẮC BẮT BUỘC:
1. Chỉ trả về JSON thuần túy, không kèm văn bản nào khác.
2. Tuyệt đối KHÔNG dùng ngoặc kép đôi "" bên trong chuỗi (dùng ngoặc đơn ').
3. Đáp án trắc nghiệm A, B, C, D phải phân bố đều và ngẫu nhiên (~25% mỗi chữ cái).`;

const SAMPLE_WRITING_PROMPT = `Hãy đóng vai là chuyên gia luyện thi TOEFL iBT 2026. Tạo cho tôi 1 bộ đề FULL WRITING chuẩn ETS 2026 gồm đúng 3 bài (Task 1: Build a Sentence 10 câu có câu ngữ cảnh ban đầu và từ bẫy, Task 2: Write an Email với 3 yêu cầu, và Task 3: Academic Discussion có ý kiến giáo sư và 2 sinh viên đối lập).

⚠️ CÁC QUY TẮC BẮT BUỘC ĐỂ ĐỀ THI ĐẠT CHUẨN THI THẬT ETS:
1. QUY TẮC BẮT BUỘC CHO TASK 1 (BUILD A SENTENCE):
   - TẤT CẢ các từ trong 'scrambled', 'correct_order', 'decoys' BẮT BUỘC PHẢI VIẾT THƯỜNG TOÀN BỘ (lowercase).
   - TUYỆT ĐỐI KHÔNG viết hoa chữ cái đầu tiên của câu (ví dụ: viết 'the', 'she', 'because', 'although' chứ KHÔNG viết 'The', 'She', 'Because', 'Although') để không làm lộ từ mở đầu cho thí sinh!
   - Thứ tự các từ trong mảng 'scrambled' BẮT BUỘC PHẢI ĐẢO LỘN XỘN NGẪU NHIÊN HOÀN TOÀN, TUYỆT ĐỐI KHÔNG được để các từ theo đúng thứ tự câu hay gần đúng thứ tự câu.
   - Mỗi câu phải kèm 2-3 từ bẫy ('decoys') viết thường, có ngữ pháp hoặc nghĩa tương tự để thử thách học viên.
2. CÚ PHÁP:
   - Chỉ trả về JSON thuần túy, không kèm giải thích bên ngoài.
   - Tuyệt đối KHÔNG dùng ngoặc kép đôi "" bên trong các chuỗi giá trị (nếu có câu thoại ngữ cảnh hãy dùng ngoặc đơn '...').

Cấu trúc JSON chuẩn:
[
  {
    "title": "Writing Full Test 02",
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
              "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu. Kéo thả hoặc bấm chọn các từ để ghép thành câu hoàn chỉnh đúng ngữ pháp.",
              "items": [
                {
                  "id": "item1",
                  "context": "Professor: 'Why were several questions on the biology midterm exam revised this morning?'",
                  "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                  "scrambled": ["ambiguous", "contain", "the", "wording", "materials", "contained", "questions", "a"],
                  "correct_order": ["the", "questions", "contained", "ambiguous", "wording"],
                  "correct_sentence": "the questions contained ambiguous wording.",
                  "decoys": ["contain", "materials", "a"]
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
              "subject_hint": "Request for Research Assistantship",
              "scenario": "You want to apply for an undergraduate research assistant position in Dr. Miller's evolutionary biology laboratory for the upcoming summer semester.",
              "requirements": [
                "Express your strong interest in the lab's current projects",
                "Highlight your relevant lab skills and coursework experience",
                "Request a brief meeting to discuss potential openings"
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
              "topic": "Remote Work and Team Collaboration",
              "professor_prompt": {
                "name": "Dr. Angela Davies",
                "title": "Professor of Organizational Behavior",
                "question": "Some organizations are insisting on a full-time return to the physical office, while others maintain flexible hybrid or remote policies. Do you believe remote work primarily fosters or weakens team innovation and company culture? Support your viewpoint."
              },
              "peer_posts": [
                {
                  "student": "David",
                  "stance": "Face-to-face interaction is indispensable for spontaneous brainstorming, mentoring junior members, and building informal trust."
                },
                {
                  "student": "Jessica",
                  "stance": "Remote flexibility minimizes commuting burnout and empowers employees to deliver deeper focus work while collaborating effectively via cloud tools."
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
QUY TẮC BẮT BUỘC:
1. Chỉ trả về JSON thuần túy, không kèm giải thích.
2. Tuyệt đối KHÔNG dùng ngoặc kép đôi "" bên trong các chuỗi giá trị (nếu có câu thoại ngữ cảnh hãy dùng ngoặc đơn '...').
3. Task 1 Build a Sentence: 100% từ trong scrambled, correct_order, decoys PHẢI viết thường, và scrambled PHẢI đảo lộn xộn.`;

const SAMPLE_LISTENING_PROMPT = `Hãy đóng vai là chuyên gia luyện thi TOEFL iBT 2026. Tạo cho tôi 1 bộ đề FULL LISTENING chuẩn ETS 2026 gồm đúng 2 Module thích ứng (Module 1 và Module 2), mỗi Module đếm ngược 14.5 phút (870s), gồm đủ 4 dạng bài:
- Task 1: Listen & Choose a Response (5 câu hỏi phản xạ với audio_text, prompt, options A-D)
- Task 2: Campus Announcement (1 bài thông báo khuôn viên với audio_text, 2 câu hỏi)
- Task 3: Campus Conversation (1 cuộc hội thoại sinh viên & giáo sư/cố vấn với audio_text, 3 câu hỏi)
- Task 4: Academic Talk (1 bài giảng học thuật ngắn 120-200 từ với audio_text, 3 câu hỏi)

⚠️ QUY TẮC BẮT BUỘC ĐỂ ĐỀ THI ĐẠT CHUẨN THI THẬT ETS:
1. ĐÁP ÁN TRẮC NGHIỆM PHẢI PHÂN BỐ ĐỀU VÀ NGẪU NHIÊN:
   - Các đáp án đúng ('correct_answer') BẮT BUỘC phải phân bố đều và ngẫu nhiên giữa các phương án A, B, C, D (mỗi phương án chiếm khoảng 25%).
   - TUYỆT ĐỐI KHÔNG để tất cả hoặc đa số câu hỏi đều có đáp án là A. Phải xáo trộn ngẫu nhiên vị trí đáp án đúng vào B, C, D, A.
2. CÚ PHÁP:
   - Chỉ trả về JSON thuần túy, không kèm giải thích bên ngoài.
   - Tuyệt đối KHÔNG dùng ngoặc kép đôi "" bên trong các chuỗi giá trị (nếu có câu thoại ngữ cảnh hãy dùng ngoặc đơn '...').

Cấu trúc JSON chuẩn:
[
  {
    "title": "Listening Full Test 02",
    "skill": "listening",
    "duration_seconds": 1740,
    "stages": [
      {
        "id": "list_stage_1",
        "title": "Listening - Module 1 (Stage 1)",
        "duration_seconds": 870,
        "tasks": [
          {
            "id": "l2_t1",
            "title": "Task 1: Listen & Choose a Response (5 câu)",
            "task_type": "choose_response",
            "content": {
              "questions": [
                {
                  "id": "l2_q1",
                  "type": "choose_response",
                  "audio_text": "Do you know if the campus shuttle still stops at the north dormitory after 8 PM?",
                  "prompt": "Select the most appropriate response to what you heard:",
                  "options": {
                    "A": "The shuttle bus was purchased three years ago.",
                    "B": "Yes, but it only runs every thirty minutes after eight.",
                    "C": "The north dormitory has single and double rooms.",
                    "D": "I usually walk to the library in the morning."
                  },
                  "correct_answer": "B",
                  "explanation": "Hỏi về lịch trình xe buýt sau 8 giờ tối ('shuttle stops... after 8 PM?'), câu trả lời thích hợp là 'Yes, but it only runs every thirty minutes after eight'."
                }
              ]
            }
          },
          {
            "id": "l2_t2",
            "title": "Task 2: Campus Announcement",
            "task_type": "announcement",
            "content": {
              "context_title": "Campus Notice: University Library Maintenance",
              "speaker": "Campus Facilities Director",
              "audio_text": "Attention students, the second floor reading room will be closed for routine electrical maintenance this Saturday...",
              "questions": [
                {
                  "id": "l2_t2_q1",
                  "prompt": "What is the primary purpose of the announcement?",
                  "options": {
                    "A": "To recruit student library assistants",
                    "B": "To announce new book acquisition policies",
                    "C": "To notify students about temporary facility maintenance",
                    "D": "To cancel upcoming final exams"
                  },
                  "correct_answer": "C",
                  "explanation": "Thông báo thông tin về việc đóng cửa tạm thời một phần thư viện để bảo trì."
                }
              ]
            }
          },
          {
            "id": "l2_t3",
            "title": "Task 3: Campus Conversation",
            "task_type": "conversation",
            "content": {
              "context_title": "Student & Academic Advisor: Internship Credit",
              "speaker": "Student & Academic Advisor",
              "audio_text": "Student: Hi, Mr. Thompson. I have a question about getting academic credits for my summer research internship...",
              "questions": [
                {
                  "id": "l2_t3_q1",
                  "prompt": "Why did the student arrange the meeting with the advisor?",
                  "options": {
                    "A": "To withdraw from university classes",
                    "B": "To change their academic major",
                    "C": "To apply for campus housing",
                    "D": "To inquire about receiving academic credit for an internship"
                  },
                  "correct_answer": "D",
                  "explanation": "Sinh viên đến hỏi về thủ tục đổi tín chỉ học thuật từ kỳ thực tập mùa hè."
                }
              ]
            }
          },
          {
            "id": "l2_t4",
            "title": "Task 4: Academic Talk (Environmental Science)",
            "task_type": "academic_talk",
            "content": {
              "context_title": "Lecture: Urban Heat Island Effect",
              "speaker": "Professor of Urban Climatology",
              "audio_text": "Good morning. Today we will explore the urban heat island effect, a phenomenon where metropolitan areas experience significantly warmer temperatures than surrounding rural regions...",
              "questions": [
                {
                  "id": "l2_t4_q1",
                  "prompt": "What is the main topic of the lecture?",
                  "options": {
                    "A": "Factors causing elevated temperatures in metropolitan areas",
                    "B": "Methods for forecasting winter blizzards",
                    "C": "Architectural styles of medieval European towns",
                    "D": "Agricultural irrigation techniques in arid climates"
                  },
                  "correct_answer": "A",
                  "explanation": "Bài giảng phân tích hiện tượng đảo nhiệt đô thị (Urban Heat Island Effect) và các nguyên nhân dẫn đến nhiệt độ cao ở thành phố."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "list_stage_2",
        "title": "Listening - Module 2 (Stage 2 - Adaptive)",
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
                  "audio_text": "Has Professor Miller returned your draft for the economics thesis yet?",
                  "prompt": "Select the most appropriate response to what you heard:",
                  "options": {
                    "A": "Economics is a challenging subject for many undergraduates.",
                    "B": "The textbook is available in the university bookstore.",
                    "C": "Not yet, she said she would send feedback by tomorrow afternoon.",
                    "D": "I wrote forty pages on international trade."
                  },
                  "correct_answer": "C",
                  "explanation": "Hỏi về phản hồi bài luận ('returned your draft yet?'), câu trả lời phù hợp là 'Not yet, she said she would send feedback by tomorrow afternoon'."
                }
              ]
            }
          },
          {
            "id": "l2_m2_t2",
            "title": "Task 2: Campus Announcement",
            "task_type": "announcement",
            "content": {
              "context_title": "Campus Notice: Career Fair Registration",
              "speaker": "Director of Career Development",
              "audio_text": "Good morning students, our annual Spring Career Fair will take place next Wednesday in the Grand Ballroom...",
              "questions": [
                {
                  "id": "l2_m2_t2_q1",
                  "prompt": "What should students bring to the career fair?",
                  "options": {
                    "A": "Their official high school graduation diplomas",
                    "B": "Updated printed copies of their resumes and student IDs",
                    "C": "Receipts for their dormitory meal plan",
                    "D": "Letters of recommendation from their parents"
                  },
                  "correct_answer": "B",
                  "explanation": "Học sinh được khuyên mang theo bản in CV và thẻ sinh viên khi đến hội chợ việc làm."
                }
              ]
            }
          },
          {
            "id": "l2_m2_t3",
            "title": "Task 3: Campus Conversation",
            "task_type": "conversation",
            "content": {
              "context_title": "Student & Lab Manager: Chemistry Equipment",
              "speaker": "Student & Chemistry Lab Manager",
              "audio_text": "Student: Excuse me, Dr. Vance. I am working on the titration experiment, but the digital spectrometer is displaying an error code...",
              "questions": [
                {
                  "id": "l2_m2_t3_q1",
                  "prompt": "What problem is the student facing?",
                  "options": {
                    "A": "They forgot the combination to their lab locker",
                    "B": "The chemical solutions have all evaporated",
                    "C": "They arrived two hours late for lab section",
                    "D": "A laboratory instrument is showing an error message"
                  },
                  "correct_answer": "D",
                  "explanation": "Máy quang phổ số trong phòng thí nghiệm hiện mã lỗi khiến thí sinh không thể đo kết quả."
                }
              ]
            }
          },
          {
            "id": "l2_m2_t4",
            "title": "Task 4: Academic Talk (Astrophysics)",
            "task_type": "academic_talk",
            "content": {
              "context_title": "Lecture: Exoplanet Detection via Radial Velocity",
              "speaker": "Professor of Astrophysics",
              "audio_text": "Today we will examine the radial velocity method, one of the foundational techniques astronomers use to discover extrasolar planets orbiting distant stars...",
              "questions": [
                {
                  "id": "l2_m2_t4_q1",
                  "prompt": "How does the radial velocity method detect extrasolar planets?",
                  "options": {
                    "A": "By sending robotic probes directly to the alien planets",
                    "B": "By detecting tiny Doppler shifts in the parent star's spectrum caused by gravitational wobble",
                    "C": "By observing changes in the planet's atmospheric weather patterns",
                    "D": "By recording radio broadcast signals sent from the planet"
                  },
                  "correct_answer": "B",
                  "explanation": "Phương pháp vận tốc xuyên tâm phát hiện hành tinh bằng cách đo độ lệch Doppler trong quang phổ của ngôi sao mẹ do dao động trọng lực."
                }
              ]
            }
          }
        ]
      }
    ]
  }
]
QUY TẮC BẮT BUỘC:
1. Chỉ trả về JSON thuần túy, không kèm giải thích.
2. Tuyệt đối KHÔNG dùng ngoặc kép đôi "" bên trong các chuỗi giá trị (nếu có câu thoại ngữ cảnh hãy dùng ngoặc đơn '...').
3. Đáp án trắc nghiệm A, B, C, D BẮT BUỘC phải phân bố đều và ngẫu nhiên (~25% mỗi chữ cái), không được để đáp án luôn ở A.`;

const SAMPLE_SPEAKING_PROMPT = `Hãy đóng vai là chuyên gia luyện thi TOEFL iBT 2026. Tạo cho tôi 1 bộ đề FULL SPEAKING chuẩn ETS 2026 gồm 8 phút, 11 câu hỏi chia làm đúng 2 dạng bài:
- Task 1: Listen and Repeat (7 câu tăng dần độ dài từ 6 đến 15 từ, không có thời gian chuẩn bị)
- Task 2: Take an Interview (4 câu hỏi phỏng vấn xoay quanh 1 chủ đề quen thuộc, 45 giây trả lời ngay lập tức, không có thời gian chuẩn bị)

Cấu trúc JSON chuẩn:
[
  {
    "title": "Speaking Full Test 02",
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
                  "sample_answer": "I would be most interested in working as a peer tutor in the university writing center. This position would allow me to assist fellow students with essay structuring while simultaneously reinforcing my own analytical and communication skills.",
                  "key_points": ["Nêu công việc cụ thể", "Giải thích lý do cá nhân"]
                }
              ]
            }
          }
        ]
      }
    ]
  }
]
QUY TẮC BẮT BUỘC ĐỂ JSON KHÔNG BỊ LỖI CÚ PHÁP:
1. Chỉ trả về JSON thuần túy, không kèm giải thích.
2. Tuyệt đối KHÔNG dùng ngoặc kép đôi "" bên trong các chuỗi giá trị (nếu có câu thoại ngữ cảnh hãy dùng ngoặc đơn '...').`;

const SAMPLE_FULL_TEST_PROMPT = `Hãy đóng vai là chuyên gia luyện thi TOEFL iBT 2026. Tạo cho tôi 1 bộ đề FULL TEST TOEFL iBT (4 Kỹ năng liên tục trong ~90 phút, theo đúng thứ tự: Reading -> Listening -> Writing -> Speaking), theo đúng cấu trúc JSON sau.

⚠️ CÁC QUY TẮC BẮT BUỘC ĐỂ ĐỀ THI ĐẠT CHUẨN THI THẬT ETS 2026:
1. ĐÁP ÁN TRẮC NGHIỆM (READING & LISTENING) PHẢI PHÂN BỐ ĐỀU VÀ NGẪU NHIÊN:
   - Các đáp án đúng ('correct_answer') BẮT BUỘC phải phân bố đều và ngẫu nhiên giữa A, B, C, D (mỗi phương án chiếm khoảng 25%).
   - TUYỆT ĐỐI KHÔNG để tất cả hoặc đa số câu hỏi đều có đáp án là A. Phải xáo trộn ngẫu nhiên vị trí đáp án đúng vào B, C, D, A.
2. QUY TẮC BẮT BUỘC CHO WRITING TASK 1 (BUILD A SENTENCE):
   - TẤT CẢ các từ trong 'scrambled', 'correct_order', 'decoys' BẮT BUỘC PHẢI VIẾT THƯỜNG TOÀN BỘ (lowercase).
   - TUYỆT ĐỐI KHÔNG viết hoa chữ cái đầu tiên của câu (ví dụ: viết 'the', 'she', 'because', 'although' chứ KHÔNG viết 'The', 'She', 'Because', 'Although') để không làm lộ đáp án cho thí sinh!
   - Thứ tự các từ trong mảng 'scrambled' BẮT BUỘC PHẢI ĐẢO LỘN XỘN NGẪU NHIÊN HOÀN TOÀN, TUYỆT ĐỐI KHÔNG được để các từ theo đúng thứ tự câu hay gần đúng thứ tự câu.
3. VỚI DẠNG COMPLETE THE WORDS (READING):
   - Trong 'paragraph', các từ khuyết chữ cái PHẢI viết kèm ngoặc vuông [phần_đuôi_khuyết] (ví dụ: 'Marine biolog[ists] study how ocean ecosys[tems] adap[t]...').

Cấu trúc JSON chuẩn:
[
  {
    "title": "TOEFL iBT Full Mock Test 02 (2026 Format)",
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
              "paragraph": "Marine biolog[ists] study how ocean ecosys[tems] adap[t] to environmental variations...",
              "blanks": [
                { "id": "b1", "prefix": "biolog", "missing": "ists", "full": "biologists" },
                { "id": "b2", "prefix": "ecosys", "missing": "tems", "full": "ecosystems" }
              ]
            }
          },
          {
            "id": "f_r1_t2",
            "title": "Task 2: Read in Daily Life",
            "task_type": "daily_life",
            "content": {
              "document_type": "Campus Recreation Notice",
              "passage": "Intramural sports registration will close this Friday at 5 PM. Team captains must submit roster forms.",
              "questions": [
                {
                  "id": "f_r1_q1",
                  "prompt": "When is the team registration deadline?",
                  "options": { "A": "Tomorrow morning", "B": "Friday at 5 PM", "C": "Next month", "D": "Sunday noon" },
                  "correct_answer": "B",
                  "explanation": "Notice explicitly specifies Friday 5 PM."
                }
              ]
            }
          },
          {
            "id": "f_r1_t3",
            "title": "Task 3: Academic Passage",
            "task_type": "academic_passage",
            "content": {
              "document_type": "Paleontology Text",
              "passage": "The Cambrian explosion represents a pivotal geological epoch characterized by the rapid emergence of major animal phyla...",
              "questions": [
                {
                  "id": "f_r1_q2",
                  "prompt": "What characterized the Cambrian period?",
                  "options": { "A": "Extinction of marine life", "B": "Prolonged ice age", "C": "Disappearance of oceans", "D": "Rapid diversification of major animal phyla" },
                  "correct_answer": "D",
                  "explanation": "Text highlights rapid appearance of major animal phyla."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "full_s2_read_m2",
        "title": "Stage 2: Reading - Module 2 (Adaptive)",
        "skill": "reading",
        "duration_seconds": 900,
        "tasks": [
          {
            "id": "f_r2_t1",
            "title": "Task 1: Complete the Words",
            "task_type": "complete_words",
            "content": {
              "paragraph": "Cognitive psy[chology] expl[ores] how long-term memory is consol[idated]...",
              "blanks": [
                { "id": "b3", "prefix": "psy", "missing": "chology", "full": "psychology" }
              ]
            }
          },
          {
            "id": "f_r2_t2",
            "title": "Task 2: Read in Daily Life",
            "task_type": "daily_life",
            "content": {
              "passage": "Campus dining services have implemented digital QR allergen tags at all hot food stations.",
              "questions": [
                {
                  "id": "f_r2_q1",
                  "prompt": "Where can dietary allergen information be verified?",
                  "options": { "A": "At the campus police office", "B": "Via postal catalog", "C": "On the digital QR allergen tags", "D": "In the local newspaper" },
                  "correct_answer": "C",
                  "explanation": "Verified via QR allergen tags at each station."
                }
              ]
            }
          },
          {
            "id": "f_r2_t3",
            "title": "Task 3: Academic Passage",
            "task_type": "academic_passage",
            "content": {
              "passage": "Geomagnetic reversals occur when Earth inner dynamo flips orientation, altering solar radiation shielding...",
              "questions": [
                {
                  "id": "f_r2_q2",
                  "prompt": "What triggers geomagnetic reversals?",
                  "options": { "A": "Dynamic fluctuations within Earth liquid outer core", "B": "Meteor impacts on the moon", "C": "Ocean tidal shifts", "D": "Atmospheric jet streams" },
                  "correct_answer": "A",
                  "explanation": "Driven by dynamic convective dynamo action in the core."
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
            "title": "Task 1: Listen & Choose a Response",
            "task_type": "choose_response",
            "content": {
              "questions": [
                {
                  "id": "f_l1_q1",
                  "audio_text": "Could you let me know if the biology lab write-up is due before or after the spring break?",
                  "prompt": "Select the most appropriate response:",
                  "options": { "A": "Biology is taught on the third floor.", "B": "Professor Davis announced it is due the Monday after break.", "C": "I bought five test tubes yesterday.", "D": "The spring vacation lasts ten days." },
                  "correct_answer": "B",
                  "explanation": "Accurately answers the due date inquiry."
                }
              ]
            }
          },
          {
            "id": "f_l1_t2",
            "title": "Task 2: Campus Announcement",
            "task_type": "announcement",
            "content": {
              "context_title": "Student Union Renovations",
              "speaker": "Campus Dean",
              "audio_text": "Starting next Monday, the student lounge on the lower level will undergo a three-week renovation...",
              "questions": [
                {
                  "id": "f_l1_q2",
                  "prompt": "What is the reason for the closure?",
                  "options": { "A": "An unscheduled water leak", "B": "Permanent department relocation", "C": "Scheduled facility upgrade and furniture renovation", "D": "Student protest" },
                  "correct_answer": "C",
                  "explanation": "Announcement mentions scheduled three-week renovation."
                }
              ]
            }
          },
          {
            "id": "f_l1_t3",
            "title": "Task 3: Campus Conversation",
            "task_type": "conversation",
            "content": {
              "context_title": "Student & Registrar: Transcript Request",
              "speaker": "Student & Registrar Assistant",
              "audio_text": "Student: Hello, I need an official electronic transcript sent to a graduate admissions office...",
              "questions": [
                {
                  "id": "f_l1_q3",
                  "prompt": "Why is the student visiting the registrar?",
                  "options": { "A": "To drop out of university", "B": "To pay dorm fines", "C": "To change degree programs", "D": "To request an official transcript transmission" },
                  "correct_answer": "D",
                  "explanation": "The student requested an official electronic transcript."
                }
              ]
            }
          },
          {
            "id": "f_l1_t4",
            "title": "Task 4: Academic Talk (Archaeology)",
            "task_type": "academic_talk",
            "content": {
              "context_title": "Lecture: Radiocarbon Dating",
              "speaker": "Professor of Archaeology",
              "audio_text": "Radiocarbon dating measures the exponential decay of carbon-14 in organic materials to estimate their historical age...",
              "questions": [
                {
                  "id": "f_l1_q4",
                  "prompt": "What is the primary utility of carbon-14 dating?",
                  "options": { "A": "Determining the chronological age of organic artifacts", "B": "Locating crude oil deposits", "C": "Forecasting volcanic eruptions", "D": "Manufacturing synthetic fabrics" },
                  "correct_answer": "A",
                  "explanation": "Used to establish dates for organic remnants."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "full_s4_list_m2",
        "title": "Stage 4: Listening - Module 2 (Adaptive)",
        "skill": "listening",
        "duration_seconds": 870,
        "tasks": [
          {
            "id": "f_l2_t1",
            "title": "Task 1: Listen & Choose a Response",
            "task_type": "choose_response",
            "content": {
              "questions": [
                {
                  "id": "f_l2_q1",
                  "audio_text": "Did you manage to reserve a private study room in the science library?",
                  "prompt": "Select the most appropriate response:",
                  "options": { "A": "The science building was built fifty years ago.", "B": "Chemistry textbooks are expensive.", "C": "Yes, I booked room 304 from two to four this afternoon.", "D": "I enjoy studying with four friends." },
                  "correct_answer": "C",
                  "explanation": "Direct response specifying the reserved study room and time."
                }
              ]
            }
          },
          {
            "id": "f_l2_t2",
            "title": "Task 2: Campus Announcement",
            "task_type": "announcement",
            "content": {
              "context_title": "Campus Health Center Flu Clinic",
              "speaker": "Health Center Coordinator",
              "audio_text": "Free annual flu vaccinations will be administered at the Student Center this Thursday and Friday from 9 AM to 3 PM...",
              "questions": [
                {
                  "id": "f_l2_q2",
                  "prompt": "What event is announced?",
                  "options": { "A": "A campus marathon", "B": "Free seasonal influenza immunization clinic", "C": "Nutrition cooking class", "D": "Medical school open house" },
                  "correct_answer": "B",
                  "explanation": "Free flu vaccination clinic at Student Center."
                }
              ]
            }
          },
          {
            "id": "f_l2_t3",
            "title": "Task 3: Campus Conversation",
            "task_type": "conversation",
            "content": {
              "context_title": "Student & Lab Instructor: Titration Equipment",
              "speaker": "Student & Lab Instructor",
              "audio_text": "Student: Professor, our team titration burette has a hairline crack near the stopcock...",
              "questions": [
                {
                  "id": "f_l2_q3",
                  "prompt": "What issue did the student report?",
                  "options": { "A": "A missing lab textbook", "B": "Early departure from class", "C": "An incorrect homework grade", "D": "Damaged laboratory glassware needing replacement" },
                  "correct_answer": "D",
                  "explanation": "Student reported cracked glassware."
                }
              ]
            }
          },
          {
            "id": "f_l2_t4",
            "title": "Task 4: Academic Talk (Marine Ecology)",
            "task_type": "academic_talk",
            "content": {
              "context_title": "Lecture: Coral Bleaching Mechanisms",
              "speaker": "Professor of Marine Ecology",
              "audio_text": "Prolonged thermal anomalies induce symbiotic zooxanthellae to depart coral tissue, precipitating widespread coral bleaching...",
              "questions": [
                {
                  "id": "f_l2_q4",
                  "prompt": "What triggers coral bleaching?",
                  "options": { "A": "Elevated sea temperatures expelling symbiotic microalgae", "B": "Overfishing of coastal reefs", "C": "Lack of ocean salinity", "D": "Deep water currents" },
                  "correct_answer": "A",
                  "explanation": "Algae expulsion due to elevated ocean heat."
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
              "instructions": "Sắp xếp từ thành câu hoàn chỉnh phù hợp ngữ cảnh ban đầu.",
              "items": [
                {
                  "id": "f_w_item1",
                  "context": "Professor: 'Why were several questions on the midterm revised?'",
                  "target_prompt": "Hoàn thiện câu trả lời:",
                  "scrambled": ["ambiguous", "contain", "the", "wording", "materials", "contained", "questions", "a"],
                  "correct_order": ["the", "questions", "contained", "ambiguous", "wording"],
                  "correct_sentence": "the questions contained ambiguous wording.",
                  "decoys": ["contain", "materials", "a"]
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
              "subject_hint": "Request for Summer Research Assistantship",
              "scenario": "You want to apply for a research assistantship in Dr. Miller laboratory for the summer.",
              "requirements": [
                "Express strong interest in the lab current projects",
                "Highlight your lab coursework experience",
                "Request a meeting to discuss potential openings"
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
              "topic": "Remote Work and Team Innovation",
              "professor_prompt": {
                "name": "Dr. Angela Davies",
                "title": "Professor of Organizational Behavior",
                "question": "Do you believe remote work primarily fosters or weakens team innovation? Support your stance."
              },
              "peer_posts": [
                { "student": "David", "stance": "In-person interaction builds informal trust and spontaneous ideas." },
                { "student": "Jessica", "stance": "Remote flexibility eliminates commute stress and aids deep focus." }
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
              "instructions": "Nghe 7 câu và lặp lại chính xác từng từ vào micro.",
              "items": [
                {
                  "id": "f_sp_i1",
                  "context": "University Bookstore",
                  "audio_text": "Textbooks for the semester can be purchased online.",
                  "word_count": 8,
                  "speak_seconds": 8,
                  "phonetic_guide": "ˈtɛkstbʊks fɔː ðə sɪˈmɛstər kæn biː ˈpɜːtʃəst ˈɒnˌlaɪn."
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
                  "sample_answer": "I would be most interested in working as a peer tutor in the writing center to guide other students while polishing my own communication skills.",
                  "key_points": ["Nêu công việc cụ thể", "Lý do và lợi ích cá nhân"]
                }
              ]
            }
          }
        ]
      }
    ]
  }
]
QUY TẮC BẮT BUỘC ĐỂ JSON KHÔNG BỊ LỖI CÚ PHÁP:
1. Chỉ trả về JSON thuần túy, không kèm giải thích bên ngoài.
2. Tuyệt đối KHÔNG dùng ngoặc kép đôi "" bên trong các chuỗi giá trị (nếu có câu thoại ngữ cảnh hãy dùng ngoặc đơn '...').
3. TUYỆT ĐỐI KHÔNG xuống dòng thực tế bên trong chuỗi text (dùng \\n nếu muốn xuống dòng trong passage).
4. Đúng 6 stages theo thứ tự: Reading M1 -> Reading M2 -> Listening M1 -> Listening M2 -> Writing -> Speaking.
5. Đáp án trắc nghiệm A, B, C, D BẮT BUỘC phải phân bố đều và ngẫu nhiên (~25% mỗi chữ cái), không được để đáp án luôn ở A.
6. Task 1 Build a Sentence: 100% từ trong scrambled, correct_order, decoys PHẢI viết thường, và scrambled PHẢI đảo lộn xộn.
7. Với dạng complete_words: Trong 'paragraph', các từ khuyết chữ cái PHẢI viết kèm ngoặc vuông [phần_đuôi_khuyết] (ví dụ: 'Marine biolog[ists] study how ocean ecosys[tems] adap[t]...').
8. Đảm bảo đóng đủ tất cả các dấu ngoặc nhọn } và ngoặc vuông ] trước khi kết thúc câu trả lời.`;

// Hàm làm sạch và tự động sửa lỗi cú pháp JSON thông minh
function cleanAndParseJson(rawInput) {
  if (!rawInput || !rawInput.trim()) {
    throw new Error('Dữ liệu JSON rỗng. Vui lòng dán mã JSON vào ô nhập.');
  }

  let text = rawInput.trim();

  // 1. Gỡ bỏ khối markdown ```json ... ``` (hỗ trợ cả trường hợp AI bị ngắt không kịp đóng ```)
  if (text.includes('```')) {
    const blockMatch = text.match(/```(?:json)?\s*([\s\S]*?)(?:```|$)/i);
    if (blockMatch) {
      text = blockMatch[1].trim();
    } else {
      text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
    }
  }

  // 2. Chuyển đổi ngoặc kép cong thông minh (“ ”) sang (" ") và ngoặc đơn cong (‘ ’) sang (')
  text = text.replace(/[\u201C\u201D]/g, '"').replace(/[\u2018\u2019]/g, "'");

  // 3. Thử parse trực tiếp tiêu chuẩn
  try {
    return { data: JSON.parse(text), repaired: false, truncated: false };
  } catch (err1) {
    // 4. Tự động sửa lỗi với jsonrepair (xử lý: unescaped newlines, trailing commas, unescaped quotes, thiếu ngoặc đóng do AI ngắt dòng)
    try {
      const repairedText = jsonrepair(text);
      const parsed = JSON.parse(repairedText);
      const isTruncated = !text.endsWith('}') && !text.endsWith(']');
      return { data: parsed, repaired: true, truncated: isTruncated };
    } catch (err2) {
      // 5. Thử tiền xử lý: bỏ dấu phẩy thừa trước khi repair
      try {
        const preprocessed = text.replace(/,\s*([\]}])/g, '$1');
        const repairedText2 = jsonrepair(preprocessed);
        const parsed2 = JSON.parse(repairedText2);
        return { data: parsed2, repaired: true, truncated: true };
      } catch (err3) {
        const isUnterminated = err1.message.includes('Unterminated string') || err1.message.includes('Unexpected end of JSON');
        let hint = '';
        if (isUnterminated) {
          hint = '\n\n💡 NGUYÊN NHÂN LỖI:\nĐoạn JSON bạn copy bị AI (ChatGPT/Claude/Gemini) cắt ngang giữa chừng do quá dài, chạm giới hạn ký tự (token limit) của AI.\n\n👉 CÁCH KHẮC PHỤC HIỆU QUẢ:\n1. Vào lại ChatGPT/Claude, gõ: "viết tiếp từ đoạn bị cắt" hoặc "continue" rồi copy nối tiếp vào.\n2. HOẶC TỐT NHẤT: Tạo đề theo từng Kỹ năng riêng (Tab Reading 2M, Listening 2M, Writing 3T, Speaking) rồi import từng đề vào. Khi chia theo từng kỹ năng, AI sẽ không bao giờ bị cắt ngắn!';
        } else {
          hint = '\n\n💡 GỢI Ý:\nHãy kiểm tra xem bên trong các câu thoại, đoạn văn có bị lồng dấu ngoặc kép "" không (hãy đổi thành dấu ngoặc đơn \'\').';
        }
        throw new Error(`${err1.message}.${hint}`);
      }
    }
  }
}

export default function ImportModal({ isOpen, onClose, onImportSuccess, defaultSkill = 'full' }) {
  const [jsonInput, setJsonInput] = useState('');
  const [selectedPromptType, setSelectedPromptType] = useState(defaultSkill || 'full');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiProgressStatus, setAiProgressStatus] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (defaultSkill) {
      setSelectedPromptType(defaultSkill);
    }
  }, [defaultSkill, isOpen]);

  if (!isOpen) return null;

  const currentPromptText = selectedPromptType === 'full'
    ? SAMPLE_FULL_TEST_PROMPT
    : selectedPromptType === 'listening' 
    ? SAMPLE_LISTENING_PROMPT 
    : selectedPromptType === 'writing' 
    ? SAMPLE_WRITING_PROMPT 
    : selectedPromptType === 'speaking'
    ? SAMPLE_SPEAKING_PROMPT
    : SAMPLE_READING_PROMPT;

  const getSkillTitle = () => {
    switch (selectedPromptType) {
      case 'reading': return 'Reading (2 Module)';
      case 'listening': return 'Listening (2 Module)';
      case 'writing': return 'Writing (3 Bài)';
      case 'speaking': return 'Speaking (2 Bài)';
      default: return 'Full Test (4 Kỹ Năng)';
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(currentPromptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setJsonInput(event.target.result);
      setErrorMsg('');
    };
    reader.readAsText(file);
  };

  // 1-Click: Tự động sinh đề bằng Gemini AI (Dự phòng OpenRouter) và đẩy thẳng lên Database
  const handleGenerateWithAI = async () => {
    if (!isGeminiConfigured() && !isOpenRouterConfigured()) {
      setErrorMsg('Chưa cấu hình API Key (Gemini hoặc OpenRouter)! Vui lòng thêm trong file .env hoặc vào mục Cài Đặt (góc phải dưới) để kích hoạt sinh đề AI.');
      return;
    }

    try {
      setIsAiGenerating(true);
      setErrorMsg('');
      setAiProgressStatus('Đang kết nối AI chuẩn bị sinh đề thi...');

      const result = await generateExamWithGemini({
        skillType: selectedPromptType,
        promptText: currentPromptText,
        customTopic: customTopic.trim(),
        onProgress: (status) => setAiProgressStatus(status)
      });

      if (result.rawJson) {
        setJsonInput(result.rawJson);
      }

      const generatedTitle = result.tests?.[0]?.title || 'Bộ đề thi mới';
      const providerLabel = result.provider === 'openrouter' ? 'OpenRouter (Dự phòng thông minh)' : 'Google Gemini';
      alert(`🎉 Đã sinh thành công đề thi: "${generatedTitle}" qua ${providerLabel} và tự động lưu vào ${result.destination}!`);

      if (onImportSuccess) {
        onImportSuccess();
      }
      onClose();
    } catch (err) {
      console.error('Lỗi sinh đề bằng AI:', err);
      setErrorMsg(`Lỗi khi sinh đề AI: ${err.message}`);
    } finally {
      setIsAiGenerating(false);
      setAiProgressStatus('');
    }
  };

  const handleProcessImport = async () => {
    if (!jsonInput.trim()) {
      setErrorMsg('Vui lòng dán dữ liệu JSON hoặc tải file lên!');
      return;
    }

    try {
      setIsImporting(true);
      setErrorMsg('');
      const parseResult = cleanAndParseJson(jsonInput);
      const parsed = parseResult.data !== undefined ? parseResult.data : parseResult;
      const testsArray = Array.isArray(parsed) ? parsed : [parsed];

      // Validate cấu trúc tối thiểu
      for (const t of testsArray) {
        if (!t || typeof t !== 'object') {
          throw new Error('Định dạng đề thi không hợp lệ (cần là Object hoặc mảng [Object])');
        }
        if (!t.title || !t.skill) {
          throw new Error('Đề thi thiếu trường title hoặc skill (full, reading, listening, writing, speaking)');
        }
      }

      const result = await importBatchTests(testsArray);
      let successMsg = `🎉 Đã import thành công ${result.count} đề thi vào ${result.destination}!`;
      if (parseResult.repaired) {
        if (parseResult.truncated) {
          successMsg += `\n\n⚠️ Lưu ý: Đoạn JSON do AI tạo có dấu hiệu bị cắt ngắn giữa chừng do chạm giới hạn token của AI (hệ thống đã tự động đóng ngoặc và khôi phục các phần đã tạo). Hãy kiểm tra lại số lượng câu hỏi trong đề!`;
        } else {
          successMsg += `\n\n✨ Hệ thống đã tự động sửa các lỗi cú pháp (dấu ngoặc, dòng ngắt) trong mã JSON do AI tạo.`;
        }
      }
      alert(successMsg);
      onImportSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message.startsWith('Lỗi JSON:') ? err.message : `Lỗi JSON: ${err.message}`);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header Modal */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-teal-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <span>Tạo & Import Đề Thi AI (TOEFL 2026)</span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
                  Auto AI
                </span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Tự động sinh đề bằng Gemini AI hoặc dán mã JSON theo chuẩn đề thi ETS 2026
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nội dung Modal */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* Thanh chọn kỹ năng */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
              <span>Chọn dạng bài thi:</span>
            </span>

            <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-bold">
              {[
                { id: 'full', label: 'Full Mock (4 KN)' },
                { id: 'reading', label: 'Reading (2M)' },
                { id: 'listening', label: 'Listening (2M)' },
                { id: 'writing', label: 'Writing (3T)' },
                { id: 'speaking', label: 'Speaking (2T)' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedPromptType(tab.id)}
                  disabled={isAiGenerating}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    selectedPromptType === tab.id 
                      ? 'bg-indigo-600 text-white shadow-2xs font-extrabold' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* KHỐI 1-CLICK TỰ ĐỘNG SINH ĐỀ BẰNG GEMINI AI */}
          <div className="bg-gradient-to-br from-[#0f1f38] via-[#153e75] to-[#0f2e59] rounded-2xl p-5 text-white shadow-md border border-indigo-500/30 relative overflow-hidden">
            <div className="relative z-10 space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-950 flex items-center justify-center font-black shadow-md shrink-0">
                    <Sparkles className="w-5 h-5 text-amber-950" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-black tracking-tight text-white uppercase">
                        Tự Động Sinh Đề {getSkillTitle()}
                      </h4>
                      <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-400/20 text-teal-300 border border-teal-400/30">
                        Gemini 2.5 Flash
                      </span>
                      {isOpenRouterConfigured() && (
                        <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-400/20 text-purple-300 border border-purple-400/30 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                          OpenRouter Auto-Fallback
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-indigo-200">
                      Ưu tiên Google Gemini AI, tự động chuyển sang OpenRouter khi Gemini quá tải/hết quota và lưu thẳng vào Database
                    </p>
                  </div>
                </div>

                {/* Nút bấm Tạo Đề Bằng AI */}
                <button
                  onClick={handleGenerateWithAI}
                  disabled={isAiGenerating || isImporting}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-102 active:scale-98 disabled:opacity-50 shrink-0 border border-teal-200"
                >
                  <Sparkles className={`w-3.5 h-3.5 text-slate-900 ${isAiGenerating ? 'animate-spin' : ''}`} />
                  <span>
                    {isAiGenerating 
                      ? 'AI Đang Sinh Đề & Lưu DB...' 
                      : `✨ Sinh Đề ${selectedPromptType === 'full' ? 'Full Test (4 KN)' : selectedPromptType.toUpperCase()} Ngay`}
                  </span>
                </button>
              </div>

              {/* Ô nhập chủ đề tùy chọn (Optional) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1 border-t border-indigo-600/40">
                <label className="text-[11px] font-bold text-indigo-200 shrink-0">
                  Chủ đề tùy chọn (không bắt buộc):
                </label>
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  disabled={isAiGenerating}
                  placeholder="VD: Khoa học môi trường, Tâm lý học, Đời sống sinh viên... (để trống: AI tự chọn)"
                  className="flex-1 px-3 py-1.5 rounded-lg bg-indigo-950/60 border border-indigo-500/50 text-white placeholder-indigo-300/50 text-xs focus:outline-hidden focus:border-teal-400 transition-colors"
                />
              </div>

              {/* Thanh tiến trình thời gian thực khi AI đang sinh đề */}
              {isAiGenerating && (
                <div className="p-3 rounded-xl bg-indigo-950/90 border border-teal-400/50 flex items-center gap-3 animate-pulse">
                  <div className="w-4 h-4 border-2 border-teal-400 border-t-transparent rounded-full animate-spin shrink-0" />
                  <div className="text-xs text-teal-300 font-semibold flex-1">
                    {aiProgressStatus || 'Gemini AI đang soạn bộ đề theo format ETS 2026...'}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Box Mẫu Prompt cho ChatGPT / Gemini (Tùy chọn thủ công) */}
          <div className="bg-indigo-50/60 border border-indigo-200 rounded-2xl p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <FileCode className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-xs font-bold text-indigo-900">
                  Tùy chọn thủ công: Copy Prompt để dán vào ChatGPT/Gemini
                </span>
              </div>

              <button
                onClick={handleCopyPrompt}
                className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1 cursor-pointer transition-all active:scale-95"
              >
                {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPrompt ? "Đã sao chép!" : "Copy Prompt"}</span>
              </button>
            </div>

            <p className="text-[11px] text-indigo-950/80 leading-relaxed font-mono line-clamp-2 bg-white/70 p-2.5 rounded-lg border border-indigo-100">
              {currentPromptText}
            </p>
          </div>

          {/* Dán JSON */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Dán mã JSON đề thi:
              </label>

              <label className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 cursor-pointer flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" />
                <span>Hoặc chọn file .json</span>
                <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            <textarea
              value={jsonInput}
              onChange={(e) => {
                setJsonInput(e.target.value);
                setErrorMsg('');
              }}
              placeholder='[ { "title": "...", "skill": "reading", ... } ]'
              rows={6}
              className="w-full p-3 font-mono text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:border-indigo-600 focus:bg-white focus:outline-hidden leading-relaxed"
            />
          </div>

          {errorMsg && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs whitespace-pre-line leading-relaxed shadow-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <div className="flex-1 font-sans">{errorMsg}</div>
            </div>
          )}

        </div>

        {/* Footer Modal */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50">
          <div className="text-[11px] text-slate-500 font-medium hidden sm:block">
            {isAiGenerating ? 'Đang thực thi lệnh sinh đề qua AI...' : 'Chọn sinh bằng AI hoặc bấm nút bên phải để import JSON thủ công'}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              disabled={isAiGenerating}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer disabled:opacity-50"
            >
              Đóng
            </button>

            <button
              disabled={isImporting || isAiGenerating}
              onClick={handleProcessImport}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer active:scale-95 transition-all flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>{isImporting ? 'Đang lưu vào Database...' : 'Import JSON Thủ Công'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
