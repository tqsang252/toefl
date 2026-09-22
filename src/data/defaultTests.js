// Dữ liệu bộ đề thi TOEFL 2026 chuẩn ETS:
// Reading & Listening có cấu trúc Multistage Adaptive (Module 1 -> Module 2)
// Mỗi Module là 1 bài thi hoàn chỉnh gồm: Complete the Words (1-2 đoạn) + Daily Life + Academic Passage

// =================================================================
// 1. FULL READING SECTION (MULTISTAGE ADAPTIVE: MODULE 1 & MODULE 2)
// =================================================================
const readingTest01 = {
    id: "reading-full-01",
    title: "Reading Full Test 01 (Format 2026)",
    skill: "reading",
    duration_seconds: 1800, // 30 phút tổng
    description: "TOEFL iBT 2026 chuẩn ETS: Mỗi Module gồm đầy đủ các phần Complete the Words (2 đoạn), Read in Daily Life, và Academic Passage.",
    stages: [
      // ----------------- MODULE 1 -----------------
      {
        id: "read_stage_1",
        title: "Reading - Module 1 (Stage 1)",
        duration_seconds: 900, // 15 phút đếm ngược riêng cho Module 1
        description: "Module 1 gồm 4 thành phần. Hãy hoàn thành trước khi hết 15 phút.",
        tasks: [
          {
            id: "m1_t1",
            title: "Task 1: Complete the Words (Đoạn 1)",
            task_type: "complete_words",
            content: {
              instructions: "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn học thuật dưới đây.",
              paragraph: "Modern environmental science plac[es] great import[ance] on sustainable renewable res[ources]. Wind and solar technol[ogies] have experien[ced] exponential gr[owth] over the past dec[ade]. As battery stor[age] improves, clean power will bec[ome] the dominant source of electr[icity] across the gl[obe].",
              blanks: [
                { id: "m1_t1_b1", prefix: "plac", missing: "es", full: "places" },
                { id: "m1_t1_b2", prefix: "import", missing: "ance", full: "importance" },
                { id: "m1_t1_b3", prefix: "res", missing: "ources", full: "resources" },
                { id: "m1_t1_b4", prefix: "technol", missing: "ogies", full: "technologies" },
                { id: "m1_t1_b5", prefix: "experien", missing: "ced", full: "experienced" },
                { id: "m1_t1_b6", prefix: "gr", missing: "owth", full: "growth" },
                { id: "m1_t1_b7", prefix: "dec", missing: "ade", full: "decade" },
                { id: "m1_t1_b8", prefix: "stor", missing: "age", full: "storage" },
                { id: "m1_t1_b9", prefix: "bec", missing: "ome", full: "become" },
                { id: "m1_t1_b10", prefix: "electr", missing: "icity", full: "electricity" },
                { id: "m1_t1_b11", prefix: "gl", missing: "obe", full: "globe" }
              ]
            }
          },
          {
            id: "m1_t2",
            title: "Task 2: Complete the Words (Đoạn 2)",
            task_type: "complete_words",
            content: {
              instructions: "Điền các chữ cái còn thiếu vào đoạn văn tâm lý học nhận thức dưới đây.",
              paragraph: "Cognitive psychol[ogists] have cond[ucted] extens[ive] research into hum[an] attent[ion] spans. Constant digit[al] notif[ications] signifi[cantly] reduce a person's abil[ity] to sust[ain] deep foc[us] during comp[lex] cognitive tas[ks].",
              blanks: [
                { id: "m1_t2_b1", prefix: "psychol", missing: "ogists", full: "psychologists" },
                { id: "m1_t2_b2", prefix: "cond", missing: "ucted", full: "conducted" },
                { id: "m1_t2_b3", prefix: "extens", missing: "ive", full: "extensive" },
                { id: "m1_t2_b4", prefix: "hum", missing: "an", full: "human" },
                { id: "m1_t2_b5", prefix: "attent", missing: "ion", full: "attention" },
                { id: "m1_t2_b6", prefix: "digit", missing: "al", full: "digital" },
                { id: "m1_t2_b7", prefix: "notif", missing: "ications", full: "notifications" },
                { id: "m1_t2_b8", prefix: "signifi", missing: "cantly", full: "significantly" },
                { id: "m1_t2_b9", prefix: "abil", missing: "ity", full: "ability" },
                { id: "m1_t2_b10", prefix: "sust", missing: "ain", full: "sustain" },
                { id: "m1_t2_b11", prefix: "foc", missing: "us", full: "focus" },
                { id: "m1_t2_b12", prefix: "comp", missing: "lex", full: "complex" },
                { id: "m1_t2_b13", prefix: "tas", missing: "ks", full: "tasks" }
              ]
            }
          },
          {
            id: "m1_t3",
            title: "Task 3: Read in Daily Life",
            task_type: "daily_life",
            content: {
              document_type: "Campus Housing Bulletin",
              passage: "CAMPUS HOUSING BULLETIN - FALL RECYCLING INITIATIVE\n\nDate: September 18\nTo: All West Campus Dormitory Residents\nFrom: Office of Residential Life\n\nStarting October 1, new color-coded recycling receptacles will be installed on each dormitory floor. Blue bins are reserved exclusively for paper and cardboard products. Green bins are designated for clean plastic containers and aluminum beverage cans. Please note that food-contaminated containers, such as greasy pizza boxes, must be placed in the black trash bins to avoid contaminating entire recycling batches. Students violating waste segregation guidelines may incur a warning or community service fee.",
              questions: [
                {
                  id: "m1_q1",
                  type: "multiple_choice",
                  prompt: "Where should students discard a greasy pizza box according to the notice?",
                  options: {
                    A: "In the blue bin for cardboard",
                    B: "In the green bin with plastic containers",
                    C: "In the black trash bin",
                    D: "Leave it outside the resident advisor's door"
                  },
                  correct_answer: "C",
                  explanation: "Thông báo nêu rõ: 'food-contaminated containers, such as greasy pizza boxes, must be placed in the black trash bins'."
                },
                {
                  id: "m1_q2",
                  type: "multiple_choice",
                  prompt: "What consequence may occur if students violate waste guidelines?",
                  options: {
                    A: "Immediate dorm lease termination",
                    B: "A warning or community service fee",
                    C: "Loss of student visa status",
                    D: "Suspension from exams"
                  },
                  correct_answer: "B",
                  explanation: "Câu cuối nói: 'Students violating waste segregation guidelines may incur a warning or community service fee'."
                }, 
                                {
                  id: "m1_q2",
                  type: "multiple_choice",
                  prompt: "What consequence may occur if students violate waste guidelines?",
                  options: {
                    A: "Immediate dorm lease termination",
                    B: "A warning or community service fee",
                    C: "Loss of student visa status",
                    D: "Suspension from exams"
                  },
                  correct_answer: "B",
                  explanation: "Câu cuối nói: 'Students violating waste segregation guidelines may incur a warning or community service fee'."
                }
              ]
            }
          },
          {
            id: "m1_t4",
            title: "Task 4: Academic Passage",
            task_type: "academic_passage",
            content: {
              document_type: "Biology & Earth Science Passage",
              passage: "Until the late 1970s, marine biologists assumed that almost all life on Earth fundamentally relied on photosynthesis powered by sunlight. This paradigm was upended in 1977 with the discovery of deep-sea hydrothermal vents along the Galapagos Rift, miles beneath the surface where sunlight cannot penetrate.\n\nAround these geothermal chimneys spewing mineral-rich superheated water, researchers discovered thriving ecosystems populated by giant tube worms, blind shrimp, and ghost crabs. The foundation of this unique food web is chemosynthetic bacteria. Instead of using solar energy to fix carbon into sugars, these autotrophic microbes oxidize toxic hydrogen sulfide compounds emitted from the vents to produce organic sustenance.",
              questions: [
                {
                  id: "m1_q3",
                  type: "multiple_choice",
                  prompt: "The word 'upended' in paragraph 1 is closest in meaning to:",
                  options: {
                    A: "Overturned",
                    B: "Supported",
                    C: "Expanded",
                    D: "Ignored"
                  },
                  correct_answer: "A",
                  explanation: "'Upended' nghĩa là làm đảo lộn, lật ngược một quan niệm cũ, đồng nghĩa với 'Overturned'."
                },
                {
                  id: "m1_q4",
                  type: "multiple_choice",
                  prompt: "What serves as the primary energy source for chemosynthetic bacteria?",
                  options: {
                    A: "Sunlight filtering through deep currents",
                    B: "Hydrogen sulfide compounds emitted by vents",
                    C: "Decaying organic matter falling from the surface",
                    D: "Thermal radiation from magma"
                  },
                  correct_answer: "B",
                  explanation: "Đoạn 2 nêu rõ: 'these autotrophic microbes oxidize toxic hydrogen sulfide compounds emitted from the vents'."
                }
              ]
            }
          }
        ]
      },

      // ----------------- MODULE 2 -----------------
      {
        id: "read_stage_2",
        title: "Reading - Module 2 (Stage 2 - Adaptive)",
        duration_seconds: 900, // 15 phút riêng cho Module 2
        description: "Module 2 thích ứng gồm đầy đủ Complete the Words, Daily Life, và Academic Passage.",
        tasks: [
          {
            id: "m2_t1",
            title: "Task 1: Complete the Words (Đoạn 1)",
            task_type: "complete_words",
            content: {
              instructions: "Điền các chữ cái còn thiếu vào đoạn văn lịch sử khảo cổ học sau:",
              paragraph: "Archaeological discov[eries] in Mesopot[amia] reveal that early civil[izations] developed sophis[ticated] irrig[ation] syst[ems]. These innov[ations] allowed farm[ers] to prod[uce] surplus cr[ops] and supp[ort] grow[ing] urban popul[ations].",
              blanks: [
                { id: "m2_t1_b1", prefix: "discov", missing: "eries", full: "discoveries" },
                { id: "m2_t1_b2", prefix: "Mesopot", missing: "amia", full: "Mesopotamia" },
                { id: "m2_t1_b3", prefix: "civil", missing: "izations", full: "civilizations" },
                { id: "m2_t1_b4", prefix: "sophis", missing: "ticated", full: "sophisticated" },
                { id: "m2_t1_b5", prefix: "irrig", missing: "ation", full: "irrigation" },
                { id: "m2_t1_b6", prefix: "syst", missing: "ems", full: "systems" },
                { id: "m2_t1_b7", prefix: "innov", missing: "ations", full: "innovations" },
                { id: "m2_t1_b8", prefix: "farm", missing: "ers", full: "farmers" },
                { id: "m2_t1_b9", prefix: "prod", missing: "uce", full: "produce" },
                { id: "m2_t1_b10", prefix: "cr", missing: "ops", full: "crops" },
                { id: "m2_t1_b11", prefix: "supp", missing: "ort", full: "support" },
                { id: "m2_t1_b12", prefix: "grow", missing: "ing", full: "growing" },
                { id: "m2_t1_b13", prefix: "popul", missing: "ations", full: "populations" }
              ]
            }
          },
          {
            id: "m2_t2",
            title: "Task 2: Read in Daily Life",
            task_type: "daily_life",
            content: {
              document_type: "University Health Center Announcement",
              passage: "STUDENT HEALTH CENTER - ANNUAL INFLUENZA VACCINATION CLINIC\n\nDate: October 5\nTo: All Registered Undergraduate and Graduate Students\nFrom: Campus Health Services\n\nAnnual seasonal influenza vaccinations will be administered free of charge at the Student Union Ballroom from October 12 to October 16, between 9:00 AM and 4:00 PM daily. No prior appointments are necessary; walk-ins will be serviced on a first-come, first-served basis. Please bring your physical student ID card and Wear clothing with loose sleeves to expedite inoculation. Students experiencing fever or acute respiratory symptoms are advised to reschedule their visit.",
              questions: [
                {
                  id: "m2_q1",
                  type: "multiple_choice",
                  prompt: "What is required for students to receive the vaccine?",
                  options: {
                    A: "A pre-scheduled online reservation",
                    B: "Their physical student ID card",
                    C: "A written referral letter from a family physician",
                    D: "Payment receipt of health insurance fee"
                  },
                  correct_answer: "B",
                  explanation: "Thông báo ghi rõ: 'Please bring your physical student ID card'."
                },
                {
                  id: "m2_q2",
                  type: "multiple_choice",
                  prompt: "Who should NOT come to the clinic according to the notice?",
                  options: {
                    A: "Graduate students",
                    B: "Students with loose-sleeved shirts",
                    C: "Students experiencing a fever or respiratory symptoms",
                    D: "First-year international students"
                  },
                  correct_answer: "C",
                  explanation: "Đoạn cuối lưu ý: 'Students experiencing fever or acute respiratory symptoms are advised to reschedule'."
                }
              ]
            }
          },
          {
            id: "m2_t3",
            title: "Task 3: Academic Passage",
            task_type: "academic_passage",
            content: {
              document_type: "Astrophysics & Planetary Geology Passage",
              passage: "Among the Galilean moons orbiting Jupiter, Europa has captured profound scientific fascination due to compelling evidence of a global subsurface ocean beneath its fractured icy crust. Data collected by the Galileo and Juno spacecraft demonstrate that despite surface temperatures plunging below minus one hundred sixty degrees Celsius, tidal forces exerted by Jupiter's massive gravitational pull generate continuous internal frictional heat.\n\nThis gravitational kneading, termed tidal flexing, prevents Europa's deep water reservoir from freezing solid. Astrobiologists hypothesize that hydrothermal vents at the floor of Europa's extraterrestrial ocean could supply chemical energy essential for microbial life, mirroring the chemosynthetic biospheres discovered along Earth's mid-ocean ridges.",
              questions: [
                {
                  id: "m2_q3",
                  type: "multiple_choice",
                  prompt: "What keeps the ocean beneath Europa's ice shell from freezing?",
                  options: {
                    A: "Solar heating penetrating the thin ice crust",
                    B: "Frictional heat generated by tidal flexing from Jupiter's gravity",
                    C: "Artificial satellites orbiting the moon",
                    D: "Radioactive dust particles on the lunar surface"
                  },
                  correct_answer: "B",
                  explanation: "Bài đọc nêu rõ nhiệt ma sát sinh ra từ hiện tượng 'tidal flexing' do lực hấp dẫn khổng lồ của Sao Mộc."
                },
                {
                  id: "m2_q4",
                  type: "multiple_choice",
                  prompt: "Why are astrobiologists particularly interested in Europa's ocean floor?",
                  options: {
                    A: "It might feature hydrothermal vents capable of supporting chemosynthetic life",
                    B: "It is covered in liquid methane lakes",
                    C: "It has the exact same atmospheric pressure as Earth",
                    D: "It contains fossilized ancient marine reptiles"
                  },
                  correct_answer: "A",
                  explanation: "Các nhà sinh học vũ trụ giả thuyết rằng các miệng phun thủy nhiệt tại đáy đại dương Europa có thể cung cấp hóa năng nuôi dưỡng sự sống vi sinh."
                }
              ]
            }
          }
        ]
      }
    ]
};

// =================================================================
// 2. FULL LISTENING SECTION (MULTISTAGE ADAPTIVE: MODULE 1 & MODULE 2)
// =================================================================
const listeningTest01 = {
    id: "listening-full-01",
    title: "Listening Full Test 01 (Format 2026)",
    skill: "listening",
    duration_seconds: 1740, // 29 phút tổng chuẩn ETS 2026
    description: "Bộ đề TOEFL iBT 2026 chuẩn ETS: Module 1 (14.5 phút) và Module 2 (14.5 phút). Mỗi Module đều gồm đầy đủ 4 dạng bài: Phản xạ hội thoại (Choose a Response), Thông báo (Announcement), Hội thoại (Conversation) và Bài giảng (Academic Talk).",
    stages: [
      // ----------------- MODULE 1 -----------------
      {
        id: "list_stage_1",
        title: "Listening - Module 1 (Stage 1)",
        duration_seconds: 870, // 14.5 phút riêng cho Module 1
        description: "Module 1 gồm 4 dạng bài thi. Đồng hồ đếm ngược 14.5 phút độc lập.",
        tasks: [
          {
            id: "l1_t1",
            title: "Task 1: Listen & Choose a Response (5 câu)",
            task_type: "choose_response",
            content: {
              instructions: "Lắng nghe câu nói ngắn và chọn phản xạ trả lời phù hợp nhất theo chuẩn giao tiếp đại học Bắc Mỹ.",
              questions: [
                {
                  id: "l1_q1",
                  type: "choose_response",
                  audio_text: "Excuse me, do you know where Professor Lee's office is located?",
                  prompt: "Select the most appropriate response to what you heard:",
                  options: {
                    A: "Yes, it is on the third floor of Hall B, room 302.",
                    B: "Professor Lee teaches modern biology this semester.",
                    C: "I have already submitted my homework yesterday.",
                    D: "The class will begin at ten in the morning."
                  },
                  correct_answer: "A",
                  explanation: "Câu hỏi hỏi vị trí phòng ('where... office is located'), câu trả lời thích hợp là chỉ dẫn phòng: 'third floor of Hall B, room 302'."
                },
                {
                  id: "l1_q2",
                  type: "choose_response",
                  audio_text: "Would you mind if I borrowed your notes from yesterday's history lecture?",
                  prompt: "Select the most appropriate response to what you heard:",
                  options: {
                    A: "History is my favorite major subject.",
                    B: "Not at all, here you go. Just make sure to return them tomorrow.",
                    C: "Yes, I didn't attend the lecture yesterday either.",
                    D: "The professor canceled the lecture for today."
                  },
                  correct_answer: "B",
                  explanation: "'Would you mind...' trả lời lịch sự bằng 'Not at all, here you go'."
                },
                {
                  id: "l1_q3",
                  type: "choose_response",
                  audio_text: "Could you tell me what the absolute deadline is for submitting the sociology term paper?",
                  prompt: "Select the most appropriate response to what you heard:",
                  options: {
                    A: "The professor assigned twenty pages of reading.",
                    B: "It is this coming Friday at five o'clock in the afternoon.",
                    C: "Sociology is taught in the main auditorium.",
                    D: "I will buy the textbook this weekend."
                  },
                  correct_answer: "B",
                  explanation: "Câu hỏi hỏi thời hạn nộp bài ('deadline for submitting...'), đáp án nêu rõ thời gian: 'this coming Friday at five o'clock'."
                },
                {
                  id: "l1_q4",
                  type: "choose_response",
                  audio_text: "I'm really struggling to understand the concept of opportunity cost discussed in economics today.",
                  prompt: "Select the most appropriate response to what you heard:",
                  options: {
                    A: "I can walk you through the lecture examples after lunch if you'd like.",
                    B: "The economics final exam was taken last month.",
                    C: "Tuition fees increased by five percent this year.",
                    D: "The bookstore is sold out of notebooks."
                  },
                  correct_answer: "A",
                  explanation: "Bày tỏ khó khăn khi hiểu bài ('really struggling to understand'), phản hồi tự nhiên là đề nghị giúp đỡ giải thích ví dụ: 'I can walk you through the lecture examples'."
                },
                {
                  id: "l1_q5",
                  type: "choose_response",
                  audio_text: "Do you happen to know if the campus bookstore offers a discount on used textbooks?",
                  prompt: "Select the most appropriate response to what you heard:",
                  options: {
                    A: "The novel was written in the nineteenth century.",
                    B: "Yes, show your student ID card at the register for ten percent off.",
                    C: "The library is closed on public holidays.",
                    D: "I prefer reading printed newspapers."
                  },
                  correct_answer: "B",
                  explanation: "Hỏi về chính sách giảm giá giáo trình cũ ('discount on used textbooks'), câu trả lời thích hợp là 'show your student ID card for ten percent off'."
                }
              ]
            }
          },
          {
            id: "l1_t2",
            title: "Task 2: Campus Announcement",
            task_type: "announcement",
            content: {
              context_title: "Central Library Renovation Announcement",
              speaker: "Campus Facilities Coordinator",
              audio_text: "Attention all university students and faculty members. Starting next Monday, October 15th, the Central Library will begin extensive HVAC and lighting renovations on the third and fourth floors. During this three-week construction period, quiet individual study areas will be temporarily relocated to the Student Center Annex, rooms 201 through 205. The digital media lab on the second floor will remain open twenty-four hours a day as usual. Please note that course reserve textbooks will temporarily be checked out from the first-floor circulation desk. We apologize for the noise and inconvenience, and we thank you for your cooperation.",
              questions: [
                {
                  id: "l1_t2_q1",
                  type: "multiple_choice",
                  prompt: "What is the primary purpose of the campus announcement?",
                  options: {
                    A: "To celebrate the grand opening of a new student center",
                    B: "To notify the campus community about library renovation work and relocated study areas",
                    C: "To remind faculty members to submit their course reserve textbook lists",
                    D: "To announce the permanent closure of the digital media laboratory"
                  },
                  correct_answer: "B",
                  explanation: "Mục đích chính là thông báo về việc tu sửa tầng 3-4 của thư viện và chuyển tạm thời khu tự học sang Student Center Annex."
                },
                {
                  id: "l1_t2_q2",
                  type: "multiple_choice",
                  prompt: "Where should students go if they need quiet individual study spaces during the renovation?",
                  options: {
                    A: "The third floor of the Central Library",
                    B: "The Student Center Annex, rooms 201 through 205",
                    C: "Professor Lee's faculty laboratory",
                    D: "The ground floor campus cafeteria"
                  },
                  correct_answer: "B",
                  explanation: "Bài thông báo nêu rõ: 'quiet individual study areas will be temporarily relocated to the Student Center Annex, rooms 201 through 205'."
                }
              ]
            }
          },
          {
            id: "l1_t3",
            title: "Task 3: Conversation with Advisor",
            task_type: "conversation",
            content: {
              context_title: "Academic Advising Consultation",
              speaker: "Student & Academic Advisor (Dr. Miller)",
              audio_text: "Student: Hi Dr. Miller, thank you for meeting with me today. I'm finalizing my course schedule for the upcoming spring term, and I was hoping to register for Advanced Biochemistry, but the university registration portal says I have not fulfilled the prerequisite requirements.\nAdvisor: Let me pull up your academic transcript on my screen... Well, I see you took Organic Chemistry I last semester and received an A, which is excellent. However, Advanced Biochemistry strictly requires Organic Chemistry II as well, which is offered every spring.\nStudent: Is there any possibility I could enroll in both of them concurrently? I really want to stay on track for my pre-med requirements.\nAdvisor: Unfortunately, department regulations strictly prohibit concurrent enrollment. The laboratory techniques and metabolic pathway analysis in Advanced Biochemistry directly build on the synthesis mechanisms taught in Organic Chem II. If you take them together, you would be at a significant disadvantage in the lab sessions.",
              questions: [
                {
                  id: "l1_t3_q1",
                  type: "multiple_choice",
                  prompt: "Why is the student currently unable to register for Advanced Biochemistry?",
                  options: {
                    A: "The course has reached its maximum enrollment capacity",
                    B: "The student has not yet completed Organic Chemistry II",
                    C: "The student failed the laboratory safety certification exam",
                    D: "The student's tuition fees have not been received by the registrar"
                  },
                  correct_answer: "B",
                  explanation: "Cố vấn Dr. Miller chỉ ra môn học yêu cầu tiên quyết phải hoàn thành Organic Chemistry II."
                },
                {
                  id: "l1_t3_q2",
                  type: "multiple_choice",
                  prompt: "What reason does the academic advisor give for prohibiting concurrent enrollment?",
                  options: {
                    A: "Both courses are scheduled at the exact same lecture time",
                    B: "Laboratory techniques in Biochemistry directly rely on concepts taught in Organic Chemistry II",
                    C: "The professor for Advanced Biochemistry does not accept undergraduate students",
                    D: "University financial aid policies do not cover two science labs in the same term"
                  },
                  correct_answer: "B",
                  explanation: "Cố vấn giải thích kỹ thuật phòng thí nghiệm và cơ chế tổng hợp của môn Hóa Sinh dựa trực tiếp vào kiến thức môn Organic Chem II."
                },
                {
                  id: "l1_t3_q3",
                  type: "multiple_choice",
                  prompt: "What will the student most likely do for the upcoming semester?",
                  options: {
                    A: "Drop all science courses and change their major",
                    B: "Register for Organic Chemistry II and postpone Advanced Biochemistry",
                    C: "Submit a formal complaint to the dean of students",
                    D: "Transfer to a different university"
                  },
                  correct_answer: "B",
                  explanation: "Giải pháp hợp lý nhất là đăng ký học Organic Chemistry II vào kỳ xuân và hoãn môn Advanced Biochemistry sang kỳ sau."
                }
              ]
            }
          },
          {
            id: "l1_t4",
            title: "Task 4: Academic Talk (Marine Biology)",
            task_type: "academic_talk",
            content: {
              context_title: "Lecture: Coral Bleaching Mechanisms",
              speaker: "Professor of Marine Ecology",
              audio_text: "Good afternoon, class. Today we will examine one of the most critical marine ecological crises: coral bleaching. Corals may look like rocks or plants, but they are actually colonies of tiny marine animals called polyps. In healthy reef systems, coral polyps exist in an obligate symbiotic partnership with microscopic photosynthetic algae called zooxanthellae, which live inside the coral tissues. These algae provide up to ninety percent of the coral's energy through photosynthesis, while also giving reefs their vibrant colors. However, when ocean surface temperatures rise by as little as one to two degrees Celsius above historical summer averages, the zooxanthellae become cellularly stressed and produce toxic reactive oxygen molecules. In response, the coral host is forced to expel the algae. Without the algae, the coral turns completely white and begins to starve. If cooler temperatures return within a few weeks, corals can reabsorb zooxanthellae and recover; but prolonged marine heatwaves lead to mass coral mortality.",
              questions: [
                {
                  id: "l1_t4_q1",
                  type: "multiple_choice",
                  prompt: "What is the primary topic of the professor's lecture?",
                  options: {
                    A: "Commercial fishing regulations in tropical coastal waters",
                    B: "The physiological mechanism and consequences of coral bleaching",
                    C: "The evolutionary history of deep-sea hydrothermal vent organisms",
                    D: "Techniques for harvesting microscopic algae for biofuel production"
                  },
                  correct_answer: "B",
                  explanation: "Bài giảng tập trung giải thích cơ chế sinh lý và hậu quả của hiện tượng tẩy trắng rạn san hô do biến đổi nhiệt độ nước biển."
                },
                {
                  id: "l1_t4_q2",
                  type: "multiple_choice",
                  prompt: "According to the professor, what role do zooxanthellae play in healthy coral reefs?",
                  options: {
                    A: "They construct the calcium carbonate skeleton of the reef",
                    B: "They supply up to ninety percent of the coral's energy through photosynthesis",
                    C: "They defend coral polyps against predatory starfish",
                    D: "They filter harmful plastics from the surrounding seawater"
                  },
                  correct_answer: "B",
                  explanation: "Giáo sư nêu rõ tảo zooxanthellae quang hợp cung cấp tới 90% năng lượng cần thiết cho san hô."
                },
                {
                  id: "l1_t4_q3",
                  type: "multiple_choice",
                  prompt: "What happens when corals experience sustained elevated seawater temperatures?",
                  options: {
                    A: "The corals immediately migrate to colder polar oceans",
                    B: "The corals expel their symbiotic algae, turn white, and face starvation",
                    C: "The corals absorb toxic mercury from deep seabed trenches",
                    D: "The corals reproduce at unprecedented exponential rates"
                  },
                  correct_answer: "B",
                  explanation: "Khi nước nóng lên kéo dài, san hô đào thải tảo cộng sinh, biến thành màu trắng và chết dần do thiếu thức ăn."
                }
              ]
            }
          }
        ]
      },

      // ----------------- MODULE 2 -----------------
      {
        id: "list_stage_2",
        title: "Listening - Module 2 (Stage 2 - Adaptive)",
        duration_seconds: 870, // 14.5 phút riêng cho Module 2
        description: "Module 2 (Adaptive Stage 2) gồm 4 dạng bài tương tự. Đếm ngược 14.5 phút.",
        tasks: [
          {
            id: "l2_t1",
            title: "Task 1: Listen & Choose a Response (5 câu)",
            task_type: "choose_response",
            content: {
              instructions: "Lắng nghe câu nói ngắn và chọn phản xạ trả lời phù hợp nhất theo chuẩn giao tiếp đại học Bắc Mỹ.",
              questions: [
                {
                  id: "l2_q1",
                  type: "choose_response",
                  audio_text: "Are you planning to attend the career center's resume workshop this Thursday evening?",
                  prompt: "Select the most appropriate response to what you heard:",
                  options: {
                    A: "Yes, I need someone to review my internship application draft.",
                    B: "The career center was constructed twenty years ago.",
                    C: "I have already graduated from secondary school.",
                    D: "The weather forecast predicted rain for Thursday."
                  },
                  correct_answer: "A",
                  explanation: "Hỏi về việc tham dự hội thảo sửa CV ('resume workshop'), phản hồi tự nhiên là 'Yes, I need someone to review my internship application'."
                },
                {
                  id: "l2_q2",
                  type: "choose_response",
                  audio_text: "I left my black umbrella in the lecture hall after the chemistry exam. Did anyone turn it in?",
                  prompt: "Select the most appropriate response to what you heard:",
                  options: {
                    A: "Chemistry was a very difficult test today.",
                    B: "Check with the campus lost and found desk on the first floor.",
                    C: "The umbrellas are sold at the hardware store.",
                    D: "Rain is common during the spring semester."
                  },
                  correct_answer: "B",
                  explanation: "Hỏi tìm đồ bỏ quên ('left my umbrella... did anyone turn it in?'), câu trả lời thích hợp là chỉ dẫn đến bàn đồ thất lạc: 'Check with the campus lost and found desk'."
                },
                {
                  id: "l2_q3",
                  type: "choose_response",
                  audio_text: "Would it be possible to reschedule our biology group study session from Friday afternoon to Saturday morning?",
                  prompt: "Select the most appropriate response to what you heard:",
                  options: {
                    A: "Biology is taught by Professor Rodriguez.",
                    B: "That works much better for me because I have a work shift on Friday.",
                    C: "Saturday is the weekend in most countries.",
                    D: "We finished writing the group report last month."
                  },
                  correct_answer: "B",
                  explanation: "Đề xuất đổi lịch học nhóm ('reschedule... to Saturday morning'), phản hồi đồng thuận lịch sự: 'That works much better for me'."
                },
                {
                  id: "l2_q4",
                  type: "choose_response",
                  audio_text: "Has the psychology department announced the recipients of this year's undergraduate research awards yet?",
                  prompt: "Select the most appropriate response to what you heard:",
                  options: {
                    A: "Not yet, they said the official email list will go out by Friday.",
                    B: "The psychology building is undergoing window replacement.",
                    C: "I chose psychology as my minor elective.",
                    D: "Undergraduate tuition was paid in full."
                  },
                  correct_answer: "A",
                  explanation: "Hỏi kết quả giải thưởng đã công bố chưa ('announced... yet?'), phản hồi chuẩn xác là 'Not yet, they said the email will go out by Friday'."
                },
                {
                  id: "l2_q5",
                  type: "choose_response",
                  audio_text: "The network printer in the computer lab is completely out of paper and toner again.",
                  prompt: "Select the most appropriate response to what you heard:",
                  options: {
                    A: "I will notify the lab technician at the help desk right away.",
                    B: "Computers have become indispensable for modern research.",
                    C: "The library purchases paper in large cardboard boxes.",
                    D: "My assignment is due in three weeks."
                  },
                  correct_answer: "A",
                  explanation: "Thông báo máy in hết giấy và mực ('out of paper and toner'), phản hồi phù hợp là báo nhân viên kỹ thuật: 'I will notify the lab technician at the help desk'."
                }
              ]
            }
          },
          {
            id: "l2_t2",
            title: "Task 2: Campus Announcement",
            task_type: "announcement",
            content: {
              context_title: "Campus Transportation & Parking Policy Update",
              speaker: "Director of Campus Transit Services",
              audio_text: "Good morning, students and staff. Due to the upcoming final examination period and heavy winter weather conditions, Campus Transit Services will adjust the shuttle schedule starting this Friday. The Blue and Gold express lines connecting the North Dormitories to the Academic Quad will operate with double frequency, departing every ten minutes between 7:00 AM and 11:00 PM. Additionally, overnight parking restrictions in Lot C and Lot D will be waived throughout exam week to accommodate commuter students studying late in the library. Please download the university transit smartphone app for real-time GPS vehicle tracking and service alerts.",
              questions: [
                {
                  id: "l2_t2_q1",
                  type: "multiple_choice",
                  prompt: "What changes will Campus Transit Services implement during final exam week?",
                  options: {
                    A: "Canceling all weekend shuttle routes across campus",
                    B: "Increasing shuttle bus frequency and waiving overnight parking restrictions",
                    C: "Charging students a fee for using the mobile transit application",
                    D: "Relocating the main transit station to the city center"
                  },
                  correct_answer: "B",
                  explanation: "Thông báo nêu rõ tăng tần suất xe buýt chạy mỗi 10 phút và miễn trừ quy định cấm đỗ xe qua đêm tại bãi C và D."
                },
                {
                  id: "l2_t2_q2",
                  type: "multiple_choice",
                  prompt: "How can students check the real-time arrival times of campus shuttles?",
                  options: {
                    A: "By calling the transit office dispatch telephone",
                    B: "By downloading and checking the university transit mobile application",
                    C: "By reading the printed timetable posted on bus stop benches",
                    D: "By asking the library circulation staff"
                  },
                  correct_answer: "B",
                  explanation: "Thông báo khuyến khích sinh viên tải ứng dụng transit trên smartphone để theo dõi GPS thời gian thực."
                }
              ]
            }
          },
          {
            id: "l2_t3",
            title: "Task 3: Conversation with Professor",
            task_type: "conversation",
            content: {
              context_title: "Ecology Research Methodology Discussion",
              speaker: "Student (Mark) & Ecology Professor (Dr. Henderson)",
              audio_text: "Student: Professor Henderson, thanks for meeting with me during your office hours. I'm finalizing the methodology section for my undergraduate honors thesis on urban bird biodiversity, and I had a question about my sampling protocol.\nProfessor: Of course, Mark. What specific issue are you running into?\nStudent: Well, I've been conducting twenty-minute point counts at five urban parks at sunrise. But on rainy mornings, the bird activity drops dramatically, and my counts are almost zero. Should I exclude those rainy days from my final dataset, or keep them in to reflect natural variance?\nProfessor: That is a classic dilemma in field ecology. If your primary research question is assessing species richness—the maximum number of species utilizing each park—then weather-induced inactivity creates an artificial bias. You should standardize your survey conditions by only surveying on clear or partly cloudy mornings with wind speeds under ten miles per hour. However, you must explicitly document this meteorological criterion in your methodology chapter so future researchers can replicate your findings.",
              questions: [
                {
                  id: "l2_t3_q1",
                  type: "multiple_choice",
                  prompt: "What problem is the student experiencing with his field research?",
                  options: {
                    A: "He cannot secure permission to access the municipal parks",
                    B: "Inclement weather causes bird activity to drop, producing unrepresentative data",
                    C: "His recording equipment was damaged by heavy rainfall",
                    D: "Other researchers have already published identical findings"
                  },
                  correct_answer: "B",
                  explanation: "Sinh viên gặp vấn đề: vào những ngày mưa hoạt động của chim giảm mạnh khiến dữ liệu đếm gần như bằng 0."
                },
                {
                  id: "l2_t3_q2",
                  type: "multiple_choice",
                  prompt: "What advice does Professor Henderson give regarding the survey protocol?",
                  options: {
                    A: "Collect all bird data exclusively during evening hours",
                    B: "Standardize sampling by only surveying under calm, clear weather conditions",
                    C: "Abandon the bird study and switch to urban plant sampling",
                    D: "Increase the count duration from twenty minutes to two hours"
                  },
                  correct_answer: "B",
                  explanation: "Giáo sư khuyên chuẩn hóa điều kiện lấy mẫu: chỉ đo đạc vào các buổi sáng trời trong, gió dưới 10 dặm/giờ."
                },
                {
                  id: "l2_t3_q3",
                  type: "multiple_choice",
                  prompt: "What must the student include in his methodology chapter?",
                  options: {
                    A: "A receipt of all purchased field equipment",
                    B: "The specific meteorological criteria used to filter observation days",
                    C: "Photographs of every individual bird observed",
                    D: "A letter of recommendation from the municipal park director"
                  },
                  correct_answer: "B",
                  explanation: "Giáo sư nhấn mạnh sinh viên phải ghi rõ tiêu chí thời tiết (meteorological criterion) trong chương phương pháp nghiên cứu."
                }
              ]
            }
          },
          {
            id: "l2_t4",
            title: "Task 4: Academic Talk (Planetary Geology)",
            task_type: "academic_talk",
            content: {
              context_title: "Lecture: The Subsurface Ocean of Europa",
              speaker: "Professor of Planetary Science",
              audio_text: "Good morning, class. Today we will explore Europa, one of Jupiter's four Galilean moons. From the outside, Europa appears as a frozen sphere crisscrossed by dark reddish fractures, with surface temperatures never rising above minus one hundred and sixty degrees Celsius. Yet, planetary scientists possess overwhelming magnetometer and spectroscopic evidence that beneath Europa's fifteen-kilometer-thick ice shell lies a global liquid water ocean containing more water than all of Earth's oceans combined. What generates the tremendous thermal energy required to prevent this vast ocean from freezing solid in deep space? The answer is tidal flexing. Europa orbits Jupiter in an eccentric, slightly elliptical orbit while being gravitationally pulled by two neighboring moons, Io and Ganymede. This gravitational tug-of-war causes Europa's rocky interior to continuously stretch and compress like a squeezed rubber ball. This constant friction produces continuous geothermal heat at the seafloor, potentially supporting hydrothermal vent ecosystems independent of sunlight.",
              questions: [
                {
                  id: "l2_t4_q1",
                  type: "multiple_choice",
                  prompt: "What is the primary scientific focus of the lecture?",
                  options: {
                    A: "The chemical composition of Jupiter's Great Red Spot",
                    B: "The geological mechanism maintaining a liquid ocean beneath Europa's ice shell",
                    C: "The history of robotic spacecraft missions to Saturn's rings",
                    D: "Methods for mining rare minerals from asteroids"
                  },
                  correct_answer: "B",
                  explanation: "Bài giảng tập trung giải thích cơ chế địa chất (lực thủy triều) giữ cho đại dương ngầm dưới lớp băng của Europa ở thể lỏng."
                },
                {
                  id: "l2_t4_q2",
                  type: "multiple_choice",
                  prompt: "According to the professor, what causes tidal flexing on Europa?",
                  options: {
                    A: "High concentrations of radioactive decay in the icy crust",
                    B: "Gravitational interactions between Jupiter and neighboring moons Io and Ganymede",
                    C: "Direct solar radiation warming the ice fractures",
                    D: "Volcanic eruptions originating from Jupiter's core"
                  },
                  correct_answer: "B",
                  explanation: "Lực thủy triều sinh ra do tương tác hấp dẫn giữa Sao Mộc và các mặt trăng lân cận Io và Ganymede khi Europa di chuyển theo quỹ đạo elip."
                },
                {
                  id: "l2_t4_q3",
                  type: "multiple_choice",
                  prompt: "Why are astrobiologists particularly intrigued by Europa's seafloor?",
                  options: {
                    A: "It is covered in fossilized ancient alien structures",
                    B: "Geothermal heat from tidal friction could support hydrothermal vent ecosystems without sunlight",
                    C: "It is completely dry and suitable for human colonization bases",
                    D: "It possesses an atmosphere richer in oxygen than Earth"
                  },
                  correct_answer: "B",
                  explanation: "Nhiệt địa nhiệt sinh ra từ ma sát thủy triều có thể tạo ra các miệng phun thủy nhiệt dưới đáy biển, duy trì sự sống mà không cần ánh sáng mặt trời."
                }
              ]
            }
          }
        ]
      }
    ]
};

// =================================================================
// 3. FULL WRITING SECTION (LINEAR: 23 PHÚT)
// =================================================================
const writingTest01 = {
    id: "writing-full-01",
    title: "Writing Full Test 01 (Format 2026)",
    skill: "writing",
    duration_seconds: 1380, // 23 phút chuẩn TOEFL 2026
    description: "Cấu trúc TOEFL 2026 chuẩn ETS: Task 1 (10 câu Build a Sentence kéo thả có ngữ cảnh), Task 2 (Write an Email), và Task 3 (Academic Discussion).",
    stages: [
      {
        id: "write_stage_1",
        title: "Writing Section (Linear - 23 Mins)",
        duration_seconds: 1380,
        tasks: [
          {
            id: "w1_t1_build_sentence",
            title: "Task 1: Build a Sentence (10 câu)",
            task_type: "build_sentence",
            content: {
              instructions: "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational / Situational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có thể có từ bẫy không được dùng.",
              items: [
                {
                  id: "w1_t1_item1",
                  context: "Roommate: \"I'm planning to reserve a group study room in the main library for our biology project meeting this afternoon.\"",
                  target_prompt: "Hoàn thiện câu phản hồi của bạn:",
                  scrambled: ["prevents", "from", "conflict", "prevent", "my", "attending", "me", "scheduling"],
                  correct_order: ["my", "scheduling", "conflict", "prevents", "me", "from", "attending"],
                  correct_sentence: "my scheduling conflict prevents me from attending.",
                  decoys: ["prevent"]
                },
                {
                  id: "w1_t1_item2",
                  context: "Classmate: \"Do you know whether the professor has posted the required reading list for next week's seminar?\"",
                  target_prompt: "Hoàn thiện câu phản hồi của bạn:",
                  scrambled: ["tonight", "would", "be", "that", "mentioned", "updated", "will", "the", "she", "by", "syllabus"],
                  correct_order: ["she", "mentioned", "that", "the", "syllabus", "would", "be", "updated", "by", "tonight"],
                  correct_sentence: "she mentioned that the syllabus would be updated by tonight.",
                  decoys: ["will"]
                },
                {
                  id: "w1_t1_item3",
                  context: "Student: \"Why did so few people show up for the guest lecture on renewable energy yesterday?\"",
                  target_prompt: "Hoàn thiện câu phản hồi của bạn:",
                  scrambled: ["connecting", "flight", "the", "was", "because", "postpone", "speaker", "his", "postponed", "event", "missed"],
                  correct_order: ["the", "event", "was", "postponed", "because", "the", "speaker", "missed", "his", "connecting", "flight"],
                  correct_sentence: "the event was postponed because the speaker missed his connecting flight.",
                  decoys: ["postpone"]
                },
                {
                  id: "w1_t1_item4",
                  context: "Friend: \"Are you still trying to get special permission to register for Advanced Biochemistry this term?\"",
                  target_prompt: "Hoàn thiện câu phản hồi của bạn:",
                  scrambled: ["organic", "advisor", "completing", "complete", "advised", "the", "me", "chemistry", "first", "to", "academic"],
                  correct_order: ["the", "academic", "advisor", "advised", "me", "to", "complete", "organic", "chemistry", "first"],
                  correct_sentence: "the academic advisor advised me to complete organic chemistry first.",
                  decoys: ["completing"]
                },
                {
                  id: "w1_t1_item5",
                  context: "Driver: \"I couldn't find any available parking spots near the engineering laboratory this morning.\"",
                  target_prompt: "Hoàn thiện câu phản hồi của bạn:",
                  scrambled: ["drive", "take", "to", "the", "driving", "are", "students", "campus", "shuttle", "encouraged", "of", "instead"],
                  correct_order: ["students", "are", "encouraged", "to", "take", "the", "campus", "shuttle", "instead", "of", "driving"],
                  correct_sentence: "students are encouraged to take the campus shuttle instead of driving.",
                  decoys: ["drive"]
                },
                {
                  id: "w1_t1_item6",
                  context: "Professor: \"How did your research team manage to collect so many soil samples in just one weekend?\"",
                  target_prompt: "Hoàn thiện câu phản hồi của bạn:",
                  scrambled: ["the", "field", "data", "several", "volunteers", "undergraduate", "with", "assisted", "assisting", "collection"],
                  correct_order: ["several", "undergraduate", "volunteers", "assisted", "with", "the", "field", "data", "collection"],
                  correct_sentence: "several undergraduate volunteers assisted with the field data collection.",
                  decoys: ["assisting"]
                },
                {
                  id: "w1_t1_item7",
                  context: "Organizer: \"Has the department committee decided where the annual psychology symposium will take place?\"",
                  target_prompt: "Hoàn thiện câu phản hồi của bạn:",
                  scrambled: ["reservation", "has", "not", "the", "yet", "auditorium", "committee", "the", "finalized", "finalize"],
                  correct_order: ["the", "committee", "has", "not", "yet", "finalized", "the", "auditorium", "reservation"],
                  correct_sentence: "the committee has not yet finalized the auditorium reservation.",
                  decoys: ["finalize"]
                },
                {
                  id: "w1_t1_item8",
                  context: "Peer: \"I'm really worried I won't have enough time to finish both lab reports before Friday's deadline.\"",
                  target_prompt: "Hoàn thiện câu phản hồi của bạn:",
                  scrambled: ["stress", "assignment", "help", "reduces", "reduce", "will", "the", "prioritizing", "your", "urgent"],
                  correct_order: ["prioritizing", "the", "urgent", "assignment", "will", "help", "reduce", "your", "stress"],
                  correct_sentence: "prioritizing the urgent assignment will help reduce your stress.",
                  decoys: ["reduces"]
                },
                {
                  id: "w1_t1_item9",
                  context: "Dorm resident: \"Did the campus dining hall change its operating hours for the upcoming exam period?\"",
                  target_prompt: "Hoàn thiện câu phản hồi của bạn:",
                  scrambled: ["announced", "hours", "late", "extended", "studying", "accommodate", "students", "to", "they", "accommodating"],
                  correct_order: ["they", "announced", "extended", "hours", "to", "accommodate", "students", "studying", "late"],
                  correct_sentence: "they announced extended hours to accommodate students studying late.",
                  decoys: ["accommodating"]
                },
                {
                  id: "w1_t1_item10",
                  context: "Lab Partner: \"What should we do if our experimental results contradict our initial hypothesis?\"",
                  target_prompt: "Hoàn thiện câu phản hồi của bạn:",
                  scrambled: ["analyzing", "in", "data", "must", "discrepancies", "we", "unexpected", "carefully", "analyze", "the", "the"],
                  correct_order: ["we", "must", "carefully", "analyze", "the", "unexpected", "discrepancies", "in", "the", "data"],
                  correct_sentence: "we must carefully analyze the unexpected discrepancies in the data.",
                  decoys: ["analyzing"]
                }
              ]
            }
          },
          {
            id: "w1_t2_write_email",
            title: "Task 2: Write an Email",
            task_type: "write_email",
            content: {
              recipient: "Professor Dr. Vance",
              subject_hint: "Absence from Midterm Review Session",
              scenario: "You are enrolled in an American History course taught by Professor Dr. Vance. Due to an urgent and unexpected family emergency, you will be unable to attend the mandatory midterm review session scheduled for tomorrow afternoon.",
              requirements: [
                "Apologize for your upcoming absence and clearly state the reason",
                "Inquire whether the professor will provide lecture slides, audio recordings, or handout notes",
                "Politely request a brief appointment during next week's office hours to ask follow-up questions"
              ],
              min_words: 80,
              recommended_words: "100 - 130 words"
            }
          },
          {
            id: "w1_t3_academic_discussion",
            title: "Task 3: Academic Discussion",
            task_type: "academic_discussion",
            content: {
              course: "EDUC 305: Emerging Technologies in Higher Education",
              topic: "Artificial Intelligence in University Coursework",
              professor_prompt: {
                name: "Dr. Eleanor Robinson",
                title: "Professor of Educational Technology",
                question: "Many universities are currently debating whether generative AI writing assistants should be fully integrated into undergraduate coursework or strictly prohibited from academic assignments. In your post, express your perspective on whether AI enhances or hinders students' critical thinking skills. Explain your reasons clearly with relevant examples."
              },
              peer_posts: [
                {
                  student: "Michael",
                  avatar_bg: "bg-blue-600",
                  stance: "AI serves as a dangerous cognitive shortcut. When students rely on software to generate essays and solve complex problems, they fail to develop core skills like independent analysis and deep critical thinking."
                },
                {
                  student: "Sarah",
                  avatar_bg: "bg-emerald-600",
                  stance: "When used responsibly as a research sounding board, AI accelerates learning. It frees students from mundane formatting tasks so they can focus on high-level synthesis, comparative evaluation, and conceptual innovation."
                }
              ],
              min_words: 100,
              recommended_words: "100 - 150 words"
            }
          }
        ]
      }
    ]
};

// =================================================================
// 4. FULL SPEAKING SECTION (ETS 2026: 8 PHÚT - 11 CÂU HỎI)
// =================================================================
const speakingTest01 = {
    id: "speaking-full-01",
    title: "Speaking Full Test 01 (Format 2026)",
    skill: "speaking",
    duration_seconds: 480, // 8 phút chuẩn ETS 2026
    description: "Bộ đề Full Speaking chuẩn ETS 2026 gồm 2 dạng bài: Listen and Repeat (7 câu) và Take an Interview (4 câu). Hoàn toàn không có thời gian chuẩn bị (No Prep Time).",
    stages: [
      {
        id: "speak_stage_1",
        title: "Speaking Section (Linear - 8 Mins)",
        duration_seconds: 480,
        tasks: [
          {
            id: "spk_t1",
            title: "Task 1: Listen and Repeat (7 câu)",
            task_type: "listen_and_repeat",
            content: {
              instructions: "Bạn sẽ nghe 7 câu nói một lần duy nhất với ngữ cảnh trường học. Ngay sau tiếng bíp, hãy lặp lại chính xác từng từ vừa nghe vào micro trong thời gian quy định (không có thời gian chuẩn bị).",
              items: [
                {
                  id: "spk_t1_i1",
                  context: "Lecture Hall Notice",
                  audio_text: "Please silence all cell phones during the lecture.",
                  word_count: 7,
                  speak_seconds: 8,
                  sample_audio: null,
                  phonetic_guide: "pliːz ˈsaɪləns ɔːl sɛl fəʊnz ˈdjʊərɪŋ ðə ˈlɛktʃər."
                },
                {
                  id: "spk_t1_i2",
                  context: "Dining Hall Schedule",
                  audio_text: "The campus dining hall closes early on Sunday evenings.",
                  word_count: 9,
                  speak_seconds: 8,
                  sample_audio: null,
                  phonetic_guide: "ðə ˈkæmpəs ˈdaɪnɪŋ hɔːl ˈkləʊzɪz ˈɜːli ɒn ˈsʌndeɪ ˈiːvnɪŋz."
                },
                {
                  id: "spk_t1_i3",
                  context: "Chemistry Laboratory Assignment",
                  audio_text: "Remember to submit your laboratory reports by midnight tonight.",
                  word_count: 9,
                  speak_seconds: 10,
                  sample_audio: null,
                  phonetic_guide: "rɪˈmɛmbər tuː səbˈmɪt jɔːr ləˈbɒrətəri rɪˈpɔːts baɪ ˈmɪdnaɪt təˈnaɪt."
                },
                {
                  id: "spk_t1_i4",
                  context: "Academic Course Enrollment",
                  audio_text: "Students can register for academic courses through the university portal.",
                  word_count: 10,
                  speak_seconds: 10,
                  sample_audio: null,
                  phonetic_guide: "ˈstjuːdənts kæn ˈrɛʤɪstər fɔːr ˌækəˈdɛmɪk ˈkɔːsɪz θruː ðə ˌjuːnɪˈvɜːsɪti ˈpɔːtl."
                },
                {
                  id: "spk_t1_i5",
                  context: "Career Services Event",
                  audio_text: "The career counseling center is hosting an internship fair on Wednesday.",
                  word_count: 11,
                  speak_seconds: 11,
                  sample_audio: null,
                  phonetic_guide: "ðə kəˈrɪər ˈkaʊnsəlɪŋ ˈsɛntər ɪz ˈhəʊstɪŋ ən ˈɪntɜːnʃɪp feər ɒn ˈwɛnzdeɪ."
                },
                {
                  id: "spk_t1_i6",
                  context: "Seminar Preparation",
                  audio_text: "Professor Davis asked everyone to review the introductory chapter before tomorrow's seminar.",
                  word_count: 12,
                  speak_seconds: 12,
                  sample_audio: null,
                  phonetic_guide: "prəˈfɛsər ˈdeɪvɪs ɑːskt ˈɛvrɪwʌn tuː rɪˈvjuː ðə ˌɪntrəˈdʌktəri ˈtʃæptər bɪˈfɔː təˈmɒrəʊz ˈsɛmɪnɑː."
                },
                {
                  id: "spk_t1_i7",
                  context: "Campus Transportation Policy",
                  audio_text: "Although the campus shuttle runs regularly on weekdays, service is suspended on holidays.",
                  word_count: 13,
                  speak_seconds: 12,
                  sample_audio: null,
                  phonetic_guide: "ɔːlˈðəʊ ðə ˈkæmpəs ˈʃʌtl rʌnz ˈrɛɡjʊləli ɒn ˈwiːkdeɪz, ˈsɜːvɪs ɪz səsˈpɛndɪd ɒn ˈhɒlɪdeɪz."
                }
              ]
            }
          },
          {
            id: "spk_t2",
            title: "Task 2: Take an Interview (4 câu)",
            task_type: "take_an_interview",
            content: {
              topic: "Campus Student Organizations & Leadership",
              interviewer: {
                name: "Dr. Karen Mitchell",
                title: "Dean of Student Affairs",
                avatar_initials: "KM"
              },
              instructions: "Người phỏng vấn sẽ lần lượt đặt 4 câu hỏi về một chủ đề quen thuộc. Sau mỗi câu hỏi, hãy trả lời ngay lập tức trong 45 giây. Hoàn toàn không có thời gian chuẩn bị.",
              questions: [
                {
                  id: "spk_t2_q1",
                  question_number: 1,
                  audio_text: "Hello and welcome! To begin our conversation, could you tell me about a student club or extracurricular activity you are currently involved in, or one you would like to join at university?",
                  prompt: "Tell the interviewer about a student club or extracurricular activity you are involved in or would like to join:",
                  speak_seconds: 45,
                  sample_answer: "Currently, I am an active member of the university Debate Society. Every Tuesday evening, we gather to discuss pressing global topics ranging from climate policies to artificial intelligence ethics. Participating in this club allows me to sharpen my public speaking skills, learn to build logical arguments under pressure, and engage with peers from diverse academic disciplines.",
                  key_points: [
                    "Nêu rõ tên câu lạc bộ hoặc hoạt động ngoại khóa cụ thể",
                    "Mô tả thời gian hoặc tần suất sinh hoạt",
                    "Nêu lợi ích cá nhân nhận được (kỹ năng nói, tư duy phản biện, giao lưu bạn bè)"
                  ]
                },
                {
                  id: "spk_t2_q2",
                  question_number: 2,
                  audio_text: "In your view, what are some of the main benefits of participating in campus extracurricular activities alongside your academic studies?",
                  prompt: "Explain the main benefits of participating in campus extracurricular activities:",
                  speak_seconds: 45,
                  sample_answer: "Participating in extracurriculars offers two key benefits. First, it serves as a healthy stress reliever from rigorous academic lectures and exams. Second, it cultivates essential soft skills that cannot be learned from textbooks alone, such as teamwork, conflict resolution, and leadership. These practical experiences substantially strengthen a student's resume when applying for future internships.",
                  key_points: [
                    "Đưa ra 2 luận điểm rõ ràng (giảm căng thẳng, phát triển kỹ năng mềm)",
                    "Giải thích tác động đến việc làm và hồ sơ xin thực tập sau này",
                    "Sử dụng từ nối chuyển ý mượt mà (First, Second, Furthermore)"
                  ]
                },
                {
                  id: "spk_t2_q3",
                  question_number: 3,
                  audio_text: "Managing both demanding coursework and extracurricular commitments can be challenging. How do you prioritize your time when deadlines conflict?",
                  prompt: "Explain how you prioritize your time when academic deadlines and club duties conflict:",
                  speak_seconds: 45,
                  sample_answer: "When deadlines clash, I always prioritize academic coursework because degree progress is my primary purpose at university. To manage this effectively, I maintain a digital calendar with color-coded deadlines and break large projects into daily manageable milestones. Furthermore, if club duties become overwhelming during midterms, I communicate proactively with team leaders to delegate tasks in advance.",
                  key_points: [
                    "Khẳng định rõ ưu tiên hàng đầu (học tập là cốt lõi)",
                    "Nêu công cụ và phương pháp cụ thể (lịch điện tử, chia nhỏ nhiệm vụ)",
                    "Nhắc đến kỹ năng giao tiếp và ủy quyền công việc khi bận rộn"
                  ]
                },
                {
                  id: "spk_t2_q4",
                  question_number: 4,
                  audio_text: "Finally, what qualities or skills do you think make a student leader effective in motivating other members and organizing successful campus events?",
                  prompt: "Describe what qualities make an effective student leader:",
                  speak_seconds: 45,
                  sample_answer: "In my opinion, empathy and clear communication are the defining qualities of an exceptional student leader. An effective leader listens actively to team members' feedback and recognizes their individual strengths rather than just issuing top-down orders. In addition, remaining calm and adaptable during unexpected event logistics ensures the entire committee stays confident and focused on the shared goal.",
                  key_points: [
                    "Nêu 2 phẩm chất then chốt (thấu hiểu/empathy, giao tiếp rõ ràng)",
                    "Giải thích cách tạo động lực (lắng nghe, công nhận năng lực)",
                    "Khả năng thích ứng khi sự kiện gặp sự cố bất ngờ"
                  ]
                }
              ]
            }
          }
        ]
      }
    ]
};

// =================================================================
// 5. TOEFL iBT FULL MOCK EXAM (90 PHÚT - 4 KỸ NĂNG LIÊN TỤC)
// THỨ TỰ THI CHUẨN: Reading (30m) ➔ Listening (29m) ➔ Writing (23m) ➔ Speaking (8m)
// =================================================================
const fullMockTest01 = {
  id: "toefl-full-mock-01",
  title: "TOEFL iBT Full Mock Exam 01 (Official 2026 Simulation)",
  skill: "full",
  duration_seconds: 5400, // 90 phút (Reading 30m + Listening 29m + Writing 23m + Speaking 8m)
  description: "Thi thử trọn vẹn 4 kỹ năng chuẩn ETS 2026: Reading (30m) ➔ Listening (29m) ➔ Writing (23m) ➔ Speaking (8m). Đếm ngược độc lập từng phần, chấm điểm tổng 0 - 120 và Band 6.0.",
  stages: [
    // 1. Reading Module 1 (15m - 900s)
    {
      ...readingTest01.stages[0],
      id: "full_s1_read_m1",
      skill: "reading",
      title: "1. Reading - Module 1 (Stage 1)",
      duration_seconds: 900,
      tasks: readingTest01.stages[0].tasks.map((t) => ({ ...t, skill: "reading" }))
    },
    // 2. Reading Module 2 (15m - 900s)
    {
      ...readingTest01.stages[1],
      id: "full_s2_read_m2",
      skill: "reading",
      title: "1. Reading - Module 2 (Stage 2 - Adaptive)",
      duration_seconds: 900,
      tasks: readingTest01.stages[1].tasks.map((t) => ({ ...t, skill: "reading" }))
    },
    // 3. Listening Module 1 (14.5m - 870s)
    {
      ...listeningTest01.stages[0],
      id: "full_s3_list_m1",
      skill: "listening",
      title: "2. Listening - Module 1 (Stage 1)",
      duration_seconds: 870,
      tasks: listeningTest01.stages[0].tasks.map((t) => ({ ...t, skill: "listening" }))
    },
    // 4. Listening Module 2 (14.5m - 870s)
    {
      ...listeningTest01.stages[1],
      id: "full_s4_list_m2",
      skill: "listening",
      title: "2. Listening - Module 2 (Stage 2 - Adaptive)",
      duration_seconds: 870,
      tasks: listeningTest01.stages[1].tasks.map((t) => ({ ...t, skill: "listening" }))
    },
    // 5. Writing Section (23m - 1380s) - Theo yêu cầu: Writing trước Speaking
    {
      ...writingTest01.stages[0],
      id: "full_s5_writing",
      skill: "writing",
      title: "3. Writing Section (Linear - 23 Mins)",
      duration_seconds: 1380,
      tasks: writingTest01.stages[0].tasks.map((t) => ({ ...t, skill: "writing" }))
    },
    // 6. Speaking Section (8m - 480s)
    {
      ...speakingTest01.stages[0],
      id: "full_s6_speaking",
      skill: "speaking",
      title: "4. Speaking Section (Linear - 8 Mins)",
      duration_seconds: 480,
      tasks: speakingTest01.stages[0].tasks.map((t) => ({ ...t, skill: "speaking" }))
    }
  ]
};

export const DEFAULT_TESTS = [
  fullMockTest01,
  readingTest01,
  listeningTest01,
  writingTest01,
  speakingTest01
];

