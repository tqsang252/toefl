import { GPT_COMPLETE_WORDS_TESTS } from './gptCompleteWordsBank.js';
import {
  listeningPractice01,
  listeningPractice02,
  listeningPractice03,
  listeningPractice04,
  listeningPractice05,
  listeningPractice06,
  listeningPractice07,
  listeningPractice08,
  listeningPractice09,
  listeningPractice10,
  listeningPractice11,
  listeningPractice12,
  listeningPractice13,
  listeningPractice14,
  ALL_LISTENING_PRACTICE_TESTS
} from './listeningPracticeTests.js';
import {
  writingPractice01,
  writingPractice02,
  writingPractice03,
  writingPractice04,
  writingPractice05,
  writingPractice06,
  writingPractice07,
  writingPractice08,
  writingPractice09,
  writingPractice10,
  writingPractice11,
  writingPractice12,
  ALL_WRITING_PRACTICE_TESTS
} from './writingPracticeTests.js';
import {
  speakingPractice01,
  speakingPractice02,
  speakingPractice03,
  speakingPractice04,
  speakingPractice05,
  speakingPractice06,
  speakingPractice07,
  speakingPractice08,
  speakingPractice09,
  speakingPractice10,
  speakingPractice11,
  speakingPractice12,
  ALL_SPEAKING_PRACTICE_TESTS
} from './speakingPracticeTests.js';

export {
  listeningPractice01,
  listeningPractice02,
  listeningPractice03,
  listeningPractice04,
  listeningPractice05,
  listeningPractice06,
  listeningPractice07,
  listeningPractice08,
  listeningPractice09,
  listeningPractice10,
  listeningPractice11,
  listeningPractice12,
  listeningPractice13,
  listeningPractice14,
  writingPractice01,
  writingPractice02,
  writingPractice03,
  writingPractice04,
  writingPractice05,
  writingPractice06,
  writingPractice07,
  writingPractice08,
  writingPractice09,
  writingPractice10,
  writingPractice11,
  writingPractice12,
  ALL_WRITING_PRACTICE_TESTS,
  speakingPractice01,
  speakingPractice02,
  speakingPractice03,
  speakingPractice04,
  speakingPractice05,
  speakingPractice06,
  speakingPractice07,
  speakingPractice08,
  speakingPractice09,
  speakingPractice10,
  speakingPractice11,
  speakingPractice12,
  ALL_SPEAKING_PRACTICE_TESTS
};

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
    is_default: true,
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
// 1.2 READING PRACTICE TEST 02 (TOEFL 2026 OFFICIAL YOUTUBE PRACTICE 1)
// =================================================================
export const readingTest02 = {
  id: "reading-practice-02",
  title: "Reading Practice Test 02 (TOEFL 2026 - Amazon & Sunk Costs)",
  skill: "reading",
  is_default: true,
  duration_seconds: 1800, // 30 phút tổng
  source: "YouTube TOEFL 2026 Reading Practice 1",
  youtube_url: "https://www.youtube.com/watch?v=iAAuHU30Xns",
  description: "Bộ đề TOEFL iBT Reading 2026 chuẩn ETS: Module 1 (Complete the Words Rừng Amazon, Đổi trả hàng, Giảm rác thải văn phòng, Lý sinh định vị từ trường) & Module 2 (Complete the Words Ngôn ngữ và tư duy, Tình nguyện trạm cứu hộ, Hẹn cà phê, Chi phí chìm Sunk Costs).",
  stages: [
    {
      id: "read2_stage_1",
      title: "Reading - Module 1 (Stage 1)",
      duration_seconds: 900,
      description: "Module 1 gồm 4 thành phần: Complete the Words, Read a notice, Read an announcement, và Academic passage. Hãy hoàn thành trước khi hết 15 phút.",
      tasks: [
        {
          id: "read2_m1_t1",
          title: "Task 1: Complete the Words",
          task_type: "complete_words",
          content: {
            instructions: "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn học thuật dưới đây.",
            paragraph: "The Amazon rainforest is one of the most biodiverse regions on Earth. It produ[ces] a signi[ficant] amount o[f] the planet's ox[ygen] and regu[lates] global tempe[ratures]. However, defore[station] caused by logg[ing], agriculture, and ur[ban] expansion threa[tens] this delicate ecosystem. As trees are cut down, many species lose their habitats, and carbon dioxide levels rise. Conservation efforts focus on promoting sustainable practices, reforestation, and international cooperation to protect this vital natural resource for future generations.",
            blanks: [
              { id: "read2_m1_t1_b1", prefix: "produ", missing: "ces", full: "produces" },
              { id: "read2_m1_t1_b2", prefix: "signi", missing: "ficant", full: "significant" },
              { id: "read2_m1_t1_b3", prefix: "o", missing: "f", full: "of" },
              { id: "read2_m1_t1_b4", prefix: "ox", missing: "ygen", full: "oxygen" },
              { id: "read2_m1_t1_b5", prefix: "regu", missing: "lates", full: "regulates" },
              { id: "read2_m1_t1_b6", prefix: "tempe", missing: "ratures", full: "temperatures" },
              { id: "read2_m1_t1_b7", prefix: "defore", missing: "station", full: "deforestation" },
              { id: "read2_m1_t1_b8", prefix: "logg", missing: "ing", full: "logging" },
              { id: "read2_m1_t1_b9", prefix: "ur", missing: "ban", full: "urban" },
              { id: "read2_m1_t1_b10", prefix: "threa", missing: "tens", full: "threatens" }
            ]
          }
        },
        {
          id: "read2_m1_t2",
          title: "Task 2: Read a Notice",
          task_type: "daily_life",
          content: {
            document_type: "Customer Notice - Return Policy",
            passage: "Subject: Important update\n\nDear Customers,\nStarting October 20, all returns must be initiated within 14 days of delivery. Items must be unused, in their original packaging, and accompanied by the receipt. For your convenience, online purchases can now be returned directly to any of our physical stores. Refunds will be processed within 5-7 business days.\nWe appreciate your understanding as we continue to improve your shopping experience.",
            questions: [
              {
                id: "read2_m1_q11",
                type: "multiple_choice",
                prompt: "What is the main purpose of the notice?",
                options: {
                  A: "To clarify how to track shipped orders",
                  B: "To thank customers for their recent purchases",
                  C: "To inform customers about updated return procedures",
                  D: "To remind customers about online shopping benefits"
                },
                correct_answer: "C",
                explanation: "Thông báo cập nhật thủ tục và quy định đổi trả hàng mới (thời hạn 14 ngày, đổi trả trực tiếp tại cửa hàng, hoàn tiền trong 5-7 ngày)."
              },
              {
                id: "read2_m1_q12",
                type: "multiple_choice",
                prompt: "What new option is available to customers?",
                options: {
                  A: "They can return items after the 14-day period",
                  B: "They can exchange items without a receipt",
                  C: "They can request a refund by phone only",
                  D: "They can return online orders at store locations"
                },
                correct_answer: "D",
                explanation: "Thông báo nêu rõ: 'online purchases can now be returned directly to any of our physical stores'."
              }
            ]
          }
        },
        {
          id: "read2_m1_t3",
          title: "Task 3: Read an Announcement",
          task_type: "daily_life",
          content: {
            document_type: "Workplace Sustainability Announcement",
            passage: "Attention!\n\nIn an effort to reduce waste, our company is eliminating disposable cups and utensils in the break room. Employees are encouraged to bring reusable mugs and containers. Recycling bins for paper and plastic have also been added on each floor. These small steps will help us lower our environmental impact and create a more sustainable workplace.",
            questions: [
              {
                id: "read2_m1_q13",
                type: "multiple_choice",
                prompt: "What is the main goal of the new initiative?",
                options: {
                  A: "To make the office look more modern",
                  B: "To reduce the company's negative effect on the environment",
                  C: "To introduce new rules for employee behavior",
                  D: "To promote teamwork through shared spaces"
                },
                correct_answer: "B",
                explanation: "Mục tiêu trọng tâm nêu ở đầu và cuối: 'In an effort to reduce waste' và 'lower our environmental impact and create a more sustainable workplace'."
              },
              {
                id: "read2_m1_q14",
                type: "multiple_choice",
                prompt: "What are employees expected to do under the new policy?",
                options: {
                  A: "Use their own mugs and containers instead of disposable ones",
                  B: "Avoid eating in the office during work hours",
                  C: "Purchase all their meals from outside vendors",
                  D: "Bring extra utensils for their coworkers"
                },
                correct_answer: "A",
                explanation: "Thông báo nêu rõ: 'Employees are encouraged to bring reusable mugs and containers' thay cho cốc và dụng cụ dùng 1 lần bị loại bỏ."
              }
            ]
          }
        },
        {
          id: "read2_m1_t4",
          title: "Task 4: Academic Passage",
          task_type: "academic_passage",
          content: {
            document_type: "Biophysics & Animal Navigation Passage",
            passage: "The Enigma of Animal Magnetoreception\n\nMany species, from migratory birds to sea turtles, navigate vast distances with astonishing precision, a feat believed to be enabled by magnetoreception—the ability to detect Earth's magnetic field. The exact biological mechanism, however, remains one of science's most enduring mysteries.\n\nOne leading hypothesis posits the use of cryptochromes, light-sensitive proteins in the retina that may form a radical pair upon photon absorption, creating a quantum-entangled state whose chemistry is influenced by the geomagnetic field, effectively allowing the animal to \"see\" magnetic lines as visual patterns.\n\nA competing theory suggests the presence of magnetite, a magnetic iron oxide, in certain cells, which could act like a microscopic compass needle, translating magnetic information into neural signals.\n\nIntriguingly, these mechanisms are not necessarily mutually exclusive; an organism might employ both for different purposes, such as using a magnetite-based compass for a directional sense and a cryptochrome-based map for positional awareness. Unraveling this sensory modality not only illuminates animal behavior but also pushes the boundaries of biophysics and quantum biology.",
            questions: [
              {
                id: "read2_m1_q15",
                type: "multiple_choice",
                prompt: "What is the primary purpose of the passage?",
                options: {
                  A: "To argue for the superiority of the cryptochrome hypothesis over the magnetite theory.",
                  B: "To describe competing scientific explanations for a biological navigation ability.",
                  C: "To detail the migratory patterns of specific bird and turtle species.",
                  D: "To explain the quantum mechanical principles of radical pairs."
                },
                correct_answer: "B",
                explanation: "Bài đọc trình bày hai giả thuyết khoa học cạnh tranh (cryptochromes vs magnetite) giải thích cơ chế định vị từ trường ở động vật."
              },
              {
                id: "read2_m1_q16",
                type: "multiple_choice",
                prompt: "The word \"posits\" in the passage is closest in meaning to",
                options: {
                  A: "disproves.",
                  B: "questions.",
                  C: "proposes.",
                  D: "complicates."
                },
                correct_answer: "C",
                explanation: "Từ 'posits' mang nghĩa đề xuất, đưa ra giả thuyết (proposes)."
              },
              {
                id: "read2_m1_q17",
                type: "multiple_choice",
                prompt: "According to the passage, how might cryptochromes allow an animal to perceive magnetic fields?",
                options: {
                  A: "By creating a physical compass needle within the eye.",
                  B: "By converting magnetic signals directly into sound.",
                  C: "By influencing visual patterns through quantum chemistry.",
                  D: "By storing iron oxide particles in retinal cells."
                },
                correct_answer: "C",
                explanation: "Đoạn 2 giải thích phản ứng quang hóa lượng tử của cryptochrome tạo ra các họa tiết thị giác giúp con vật 'nhìn thấy' từ trường."
              },
              {
                id: "read2_m1_q18",
                type: "multiple_choice",
                prompt: "What can be inferred from the statement that the two mechanisms are \"not necessarily mutually exclusive\"?",
                options: {
                  A: "Most scientists now agree that magnetite is the primary mechanism.",
                  B: "An animal could potentially use both a magnetic map and a compass.",
                  C: "The cryptochrome theory has been definitively proven.",
                  D: "Magnetoreception is a simple, well-understood process."
                },
                correct_answer: "B",
                explanation: "'Not necessarily mutually exclusive' có nghĩa là hai cơ chế không loại trừ nhau mà một sinh vật có thể kết hợp cả hai."
              },
              {
                id: "read2_m1_q19",
                type: "multiple_choice",
                prompt: "The author mentions \"biophysics and quantum biology\" primarily to",
                options: {
                  A: "suggest that magnetoreception is an implausible phenomenon.",
                  B: "highlight the interdisciplinary significance of the research.",
                  C: "criticize the complexity of modern scientific theories.",
                  D: "list the only two fields capable of solving the mystery."
                },
                correct_answer: "B",
                explanation: "Tác giả nhắc đến hai ngành này để nhấn mạnh tầm quan trọng liên ngành (interdisciplinary significance) của việc giải mã bí ẩn."
              }
            ]
          }
        }
      ]
    },
    {
      id: "read2_stage_2",
      title: "Reading - Module 2 (Stage 2 - Adaptive)",
      duration_seconds: 900,
      description: "Module 2 gồm 4 thành phần: Complete the Words, Read a post, Read a chain of messages, và Academic passage. Hãy hoàn thành trước khi hết 15 phút.",
      tasks: [
        {
          id: "read2_m2_t1",
          title: "Task 1: Complete the Words",
          task_type: "complete_words",
          content: {
            instructions: "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn ngôn ngữ học dưới đây.",
            paragraph: "Language plays a crucial role in shaping how humans think and interact. Some lingu[ists] argue th[at] the stru[cture] of a lan[guage] influences the w[ay] its spea[kers] perceive the wo[rld]. For ex[ample], languages that have m[any] words f[or] colors may help speakers distinguish subtle shades more easily. Others claim that thought exists independently of language. Despite this debate, most researchers agree that language enables abstract thinking, social organization, and the transmission of culture across generations.",
            blanks: [
              { id: "read2_m2_t1_b1", prefix: "lingu", missing: "ists", full: "linguists" },
              { id: "read2_m2_t1_b2", prefix: "th", missing: "at", full: "that" },
              { id: "read2_m2_t1_b3", prefix: "stru", missing: "cture", full: "structure" },
              { id: "read2_m2_t1_b4", prefix: "lan", missing: "guage", full: "language" },
              { id: "read2_m2_t1_b5", prefix: "w", missing: "ay", full: "way" },
              { id: "read2_m2_t1_b6", prefix: "spea", missing: "kers", full: "speakers" },
              { id: "read2_m2_t1_b7", prefix: "wo", missing: "rld", full: "world" },
              { id: "read2_m2_t1_b8", prefix: "ex", missing: "ample", full: "example" },
              { id: "read2_m2_t1_b9", prefix: "m", missing: "any", full: "many" },
              { id: "read2_m2_t1_b10", prefix: "f", missing: "or", full: "for" }
            ]
          }
        },
        {
          id: "read2_m2_t2",
          title: "Task 2: Read a Post",
          task_type: "daily_life",
          content: {
            document_type: "Community Animal Shelter Post",
            passage: "Stella:\n\"Just finished my first day volunteering at the animal shelter — what an amazing experience! The staff were welcoming, and the animals are so full of energy. It's heartbreaking to see how many are waiting for adoption, but the team works hard to find each one a loving home. Can't wait to go back next weekend!\"",
            questions: [
              {
                id: "read2_m2_q11",
                type: "multiple_choice",
                prompt: "What is the writer's attitude toward volunteering at the shelter?",
                options: {
                  A: "She thinks the work is meaningful but too emotionally difficult.",
                  B: "She feels grateful for the experience and plans to continue.",
                  C: "She is still getting used to the new environment.",
                  D: "She believes the shelter could be better organized."
                },
                correct_answer: "B",
                explanation: "Stella cảm thấy trải nghiệm tuyệt vời và hào hứng mong chờ quay lại tuần sau ('Can't wait to go back next weekend!')."
              },
              {
                id: "read2_m2_q12",
                type: "multiple_choice",
                prompt: "What can be inferred about the animal shelter?",
                options: {
                  A: "It limits volunteer participation to special events.",
                  B: "It mainly focuses on providing medical treatment to animals.",
                  C: "It recently moved to a new location.",
                  D: "It depends on volunteers as part of its daily operations."
                },
                correct_answer: "D",
                explanation: "Trạm cứu hộ đón nhận các tình nguyện viên vào làm việc cùng đội ngũ nhân viên để hỗ trợ các hoạt động hàng ngày và tìm gia đình nhận nuôi."
              }
            ]
          }
        },
        {
          id: "read2_m2_t3",
          title: "Task 3: Read a Chain of Messages",
          task_type: "daily_life",
          content: {
            document_type: "Instant Message Exchange",
            passage: "Liam: Hey, are we still meeting at the café at 5?\n\nNora: Let's make it 5:30. Traffic is awful today.\n\nLiam: No problem. Should I get us a table?\n\nNora: Yes, please! I'll be there as soon as I can.",
            questions: [
              {
                id: "read2_m2_q13",
                type: "multiple_choice",
                prompt: "What does Liam agree to do?",
                options: {
                  A: "Arrive first to secure a place for them",
                  B: "Wait for Nora outside the café",
                  C: "Choose the best table",
                  D: "Change the meeting place"
                },
                correct_answer: "A",
                explanation: "Liam đề nghị vào lấy bàn trước ('Should I get us a table?') và Nora đồng ý."
              },
              {
                id: "read2_m2_q14",
                type: "multiple_choice",
                prompt: "Why is Nora going to arrive later than planned?",
                options: {
                  A: "She is worried about the traffic",
                  B: "She has another appointment before meeting Liam",
                  C: "She's running behind because of traffic",
                  D: "She had to take a different route to the café"
                },
                correct_answer: "C",
                explanation: "Nora giải thích: 'Traffic is awful today' dẫn đến việc cô ấy bị trễ và xin dời lịch sang 5:30."
              }
            ]
          }
        },
        {
          id: "read2_m2_t4",
          title: "Task 4: Academic Passage",
          task_type: "academic_passage",
          content: {
            document_type: "Cognitive Psychology & Behavioral Economics Passage",
            passage: "The Fallacy of Sunk Costs\n\nThe sunk cost fallacy is a cognitive bias where individuals continue a behavior or endeavor based on previously invested resources (time, money, effort) rather than a rational assessment of future outcomes. This fallacy arises from an emotional aversion to loss, leading people to \"throw good money after bad\" to avoid feeling that their initial investment was wasted. For instance, someone might sit through a terrible movie because they paid for the ticket, even though leaving would free up time for a more enjoyable activity.\n\nEconomists argue that rational decision-making requires ignoring sunk costs, as they are irrecoverable and should not factor into marginal decisions.\n\nThe fallacy has significant implications in business, where projects with diminishing returns are often prolonged due to substantial prior investment, and in public policy, where governments may continue funding failing initiatives to avoid political embarrassment. Overcoming this bias requires a conscious shift in focus from past expenditures to prospective costs and benefits.",
            questions: [
              {
                id: "read2_m2_q15",
                type: "multiple_choice",
                prompt: "Which of the following best summarizes the main idea of the passage?",
                options: {
                  A: "Financial investments should always be pursued to completion.",
                  B: "Emotional attachment to past investments can lead to irrational decisions.",
                  C: "Economists have successfully eliminated the sunk cost fallacy in business.",
                  D: "Public policy is immune to cognitive biases like the sunk cost fallacy."
                },
                correct_answer: "B",
                explanation: "Ý chính tóm tắt việc sự gắn bó cảm xúc với những nguồn lực đã bỏ ra khiến con người đưa ra các quyết định phi lý trí."
              },
              {
                id: "read2_m2_q16",
                type: "multiple_choice",
                prompt: "The phrase \"throw good money after bad\" in the passage refers to",
                options: {
                  A: "making a wise investment based on past success.",
                  B: "investing more in a failing venture due to prior losses.",
                  C: "donating money to a charitable cause.",
                  D: "carefully calculating future returns."
                },
                correct_answer: "B",
                explanation: "Thành ngữ 'throw good money after bad' chỉ hành động tiếp tục đổ thêm tiền bạc vào dự án thua lỗ vì tiếc tiền đã mất."
              },
              {
                id: "read2_m2_q17",
                type: "multiple_choice",
                prompt: "According to the passage, a rational economic decision is one that",
                options: {
                  A: "prioritizes the recovery of all initial costs.",
                  B: "is based solely on the amount of money already spent.",
                  C: "considers the emotional weight of past investments.",
                  D: "focuses on future outcomes, ignoring irrecoverable costs."
                },
                correct_answer: "D",
                explanation: "Quyết định kinh tế hợp lý đòi hỏi phớt lờ chi phí đã mất và chỉ tập trung đánh giá kết quả tương lai."
              },
              {
                id: "read2_m2_q18",
                type: "multiple_choice",
                prompt: "Why does the author mention public policy?",
                options: {
                  A: "To provide an example of a domain where the sunk cost fallacy is irrelevant.",
                  B: "To illustrate the broad applicability and negative consequences of the bias.",
                  C: "To argue that political embarrassment is a rational reason to continue projects.",
                  D: "To suggest that governments are better at avoiding the fallacy than businesses."
                },
                correct_answer: "B",
                explanation: "Tác giả nêu ví dụ về chính sách công để minh chứng sự ảnh hưởng sâu rộng và hậu quả tiêu cực của thiên kiến này ở cấp độ chính phủ."
              },
              {
                id: "read2_m2_q19",
                type: "multiple_choice",
                prompt: "It can be inferred from the passage that overcoming the sunk cost fallacy involves",
                options: {
                  A: "increasing one's emotional attachment to past decisions.",
                  B: "conducting a more thorough analysis of already-spent resources.",
                  C: "re-evaluating decisions based on their future potential.",
                  D: "avoiding any project that requires significant initial investment."
                },
                correct_answer: "C",
                explanation: "Đoạn cuối nhấn mạnh: vượt qua thiên kiến đòi hỏi chuyển hướng từ nhìn về chi phí quá khứ sang đánh giá tiềm năng và lợi ích tương lai."
              }
            ]
          }
        }
      ]
    }
  ]
};

// =================================================================
// 1.3 READING PRACTICE TEST 03 (TOEFL 2026 OFFICIAL YOUTUBE PRACTICE 2)
// =================================================================
export const readingTest03 = {
  id: "reading-practice-03",
  title: "Reading Practice Test 03 (TOEFL 2026 - Biomimicry & Dunning-Kruger)",
  skill: "reading",
  is_default: true,
  duration_seconds: 1800, // 30 phút tổng
  description: "Bộ đề TOEFL iBT 2026 Multistage Adaptive (YouTube Practice 2): Module 1 (Solar Energy, Community Lecture, Internship Info, Biomimicry) & Module 2 (Volcanoes, Mountain Lodge Resort, Lincoln Elementary Relocation, Dunning-Kruger Effect).",
  stages: [
    // ----------------- MODULE 1 -----------------
    {
      id: "read3_stage_1",
      title: "Reading - Module 1 (Stage 1)",
      duration_seconds: 900, // 15 phút
      description: "Module 1 gồm 4 phần (19 câu hỏi). Hãy hoàn thành trước khi hết 15 phút.",
      tasks: [
        {
          id: "read3_m1_t1",
          title: "Task 1: Complete the Words (Đoạn 1 - Solar Energy)",
          task_type: "complete_words",
          content: {
            instructions: "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn học thuật dưới đây.",
            paragraph: "Solar energy is a renewable resource that harnesses power from the sun using photovoltaic cells. These ce[lls] convert sunli[ght] directly in[to] electricity with[out] producing har[mful] emissions. Alt[hough] solar pan[els] can b[e] expensive to ins[tall], they signifi[cantly] reduce energy costs over time. In addition to powering homes and businesses, solar technology can provide electricity in remote areas where traditional grids are unavailable. Continued technological improvements are making solar energy more efficient, accessible, and essential for a sustainable future.",
            blanks: [
              { id: "read3_m1_t1_b1", prefix: "ce", missing: "lls", full: "cells" },
              { id: "read3_m1_t1_b2", prefix: "sunli", missing: "ght", full: "sunlight" },
              { id: "read3_m1_t1_b3", prefix: "in", missing: "to", full: "into" },
              { id: "read3_m1_t1_b4", prefix: "with", missing: "out", full: "without" },
              { id: "read3_m1_t1_b5", prefix: "har", missing: "mful", full: "harmful" },
              { id: "read3_m1_t1_b6", prefix: "Alt", missing: "hough", full: "Although" },
              { id: "read3_m1_t1_b7", prefix: "pan", missing: "els", full: "panels" },
              { id: "read3_m1_t1_b8", prefix: "b", missing: "e", full: "be" },
              { id: "read3_m1_t1_b9", prefix: "ins", missing: "tall", full: "install" },
              { id: "read3_m1_t1_b10", prefix: "signifi", missing: "cantly", full: "significantly" }
            ]
          }
        },
        {
          id: "read3_m1_t2",
          title: "Task 2: Read a Poster (Community Lecture Series)",
          task_type: "read_daily_life",
          content: {
            document_type: "Poster",
            passage: "Community Lecture Series\nTopic: The Future of Urban Transportation\nDate: Wednesday, October 12\nTime: 6:30 pm\nLocation: City Hall Auditorium\nAdmission: Free\n\nJoin urban planner Dr. Mei Chen for a discussion on how electric vehicles, bike lanes, and improved public transit systems are shaping the future of city living. Open to the public – no registration required.",
            questions: [
              {
                id: "read3_m1_q11",
                type: "multiple_choice",
                prompt: "What is the main purpose of this event?",
                options: {
                  A: "To promote new public transportation systems",
                  B: "To gather feedback on new government policies",
                  C: "To present a proposal for new city infrastructure",
                  D: "To discuss recent trends in city transportation"
                },
                correct_answer: "D",
                explanation: "Sự kiện được tổ chức để thảo luận về xu hướng tương lai của giao thông đô thị ('how electric vehicles, bike lanes, and improved public transit systems are shaping the future of city living')."
              },
              {
                id: "read3_m1_q12",
                type: "multiple_choice",
                prompt: "Who can attend the event?",
                options: {
                  A: "Only transportation professionals",
                  B: "Public speakers only",
                  C: "Anyone interested in the topic",
                  D: "Registered participants only"
                },
                correct_answer: "C",
                explanation: "Poster nêu rõ 'Open to the public – no registration required', nghĩa là bất kỳ ai quan tâm đều có thể tham dự mà không cần đăng ký."
              }
            ]
          }
        },
        {
          id: "read3_m1_t3",
          title: "Task 3: Read an Email (Internship Information Session)",
          task_type: "read_daily_life",
          content: {
            document_type: "Email Announcement",
            passage: "From: careercenter@unicitymail.edu\nSubject: Internship Information Session\n\nDear Students,\nAre you interested in gaining hands-on experience this summer? Join our internship information session this Friday at 2 p.m. in Room 204, where representatives from local companies will explain available positions and the application process. Attendance is free, but please register in advance using the link below.",
            questions: [
              {
                id: "read3_m1_q13",
                type: "multiple_choice",
                prompt: "What is the main purpose of this email?",
                options: {
                  A: "To inform students about an opportunity to learn more about internships",
                  B: "To encourage students to apply directly for summer internship positions",
                  C: "To collect student registration data for local company programs",
                  D: "To provide updates on changes to the summer internship schedule"
                },
                correct_answer: "A",
                explanation: "Email thông báo và mời sinh viên tham gia buổi thông tin nhằm tìm hiểu về các cơ hội thực tập mùa hè."
              },
              {
                id: "read3_m1_q14",
                type: "multiple_choice",
                prompt: "What are students asked to do before attending the session?",
                options: {
                  A: "Submit an internship application in advance",
                  B: "Confirm attendance by paying a small deposit",
                  C: "Bring a printed copy of their résumé",
                  D: "Complete the online registration form"
                },
                correct_answer: "D",
                explanation: "Email yêu cầu: 'Attendance is free, but please register in advance using the link below' (hoàn thành đăng ký trực tuyến trước)."
              }
            ]
          }
        },
        {
          id: "read3_m1_t4",
          title: "Task 4: Academic Passage (Biomimicry in Material Science)",
          task_type: "academic_passage",
          content: {
            document_type: "Material Science Passage",
            passage: "Biomimicry, the practice of emulating nature's models to solve human problems, has led to groundbreaking advances in material science.\n\nThe lotus leaf, for example, with its self-cleaning properties, has inspired superhydrophobic coatings. Its microscopic, wax-covered structures cause water to bead up and roll off, carrying dirt particles away.\n\nSimilarly, the incredibly strong yet lightweight structure of spider silk, a protein fiber, has spurred research into synthetic polymers for use in bulletproof vests and medical sutures.\n\nPerhaps one of the most celebrated examples is the gecko's foot. Geckos can scale vertical surfaces due to millions of microscopic hairs (setae) on their toes that exploit van der Waals forces – weak intermolecular attractions – providing strong adhesive power without liquid glue or suction. This principle has been adapted to create powerful yet reusable adhesive tapes.\n\nThese innovations demonstrate that nature, refined by billions of years of evolution, offers a vast repository of sustainable and efficient design solutions.",
            questions: [
              {
                id: "read3_m1_q15",
                type: "multiple_choice",
                prompt: "What is the main point the author makes about biomimicry?",
                options: {
                  A: "It is a recent fad that has yielded few practical results.",
                  B: "It provides a source of efficient and sustainable designs from nature.",
                  C: "Its primary application is in the development of new adhesives.",
                  D: "It is most useful for understanding biological processes rather than creating materials."
                },
                correct_answer: "B",
                explanation: "Ý chính của bài viết được kết luận ở câu cuối: thiên nhiên cung cấp nguồn ý tưởng thiết kế hiệu quả và bền vững (sustainable and efficient design solutions)."
              },
              {
                id: "read3_m1_q16",
                type: "multiple_choice",
                prompt: "The word \"exploit\" in the passage is closest in meaning to",
                options: {
                  A: "waste",
                  B: "generate",
                  C: "utilize",
                  D: "misunderstand"
                },
                correct_answer: "C",
                explanation: "'Exploit' trong ngữ cảnh tận dụng cơ chế vật lý (van der Waals forces) đồng nghĩa với 'utilize' (tận dụng, khai thác)."
              },
              {
                id: "read3_m1_q17",
                type: "multiple_choice",
                prompt: "According to the passage, what do the lotus leaf and gecko's foot have in common?",
                options: {
                  A: "Both rely on chemical secretions for their properties.",
                  B: "Both have inspired practical human applications through their physical structures.",
                  C: "Both are being used directly in commercial products.",
                  D: "Their properties are primarily due to their chemical composition."
                },
                correct_answer: "B",
                explanation: "Cả lá sen (cấu trúc vi mô phủ sáp) và chân tắc kè (hàng triệu sợi lông siêu vi) đều truyền cảm hứng ứng dụng thực tế thông qua các cấu trúc vật lý của chúng."
              },
              {
                id: "read3_m1_q18",
                type: "multiple_choice",
                prompt: "The author mentions \"billions of years of evolution\" primarily to",
                options: {
                  A: "suggest that biomimicry is a slow process.",
                  B: "highlight the proven efficacy of natural designs.",
                  C: "argue that human science is inferior to natural selection.",
                  D: "explain the complexity of van der Waals forces."
                },
                correct_answer: "B",
                explanation: "Tác giả nhắc đến hàng tỷ năm tiến hóa để nhấn mạnh rằng các thiết kế của tự nhiên đã được tôi luyện và chứng minh hiệu quả vượt trội qua thời gian."
              },
              {
                id: "read3_m1_q19",
                type: "multiple_choice",
                prompt: "Which of the following is NOT mentioned as an application of biomimicry?",
                options: {
                  A: "Self cleaning surfaces",
                  B: "Medical sutures",
                  C: "Energy generation",
                  D: "Reusable adhesives"
                },
                correct_answer: "C",
                explanation: "Bài đọc đề cập đến bề mặt tự làm sạch (lotus leaf), chỉ khâu y tế (spider silk), băng dính tái sử dụng (gecko's foot); không hề đề cập đến 'Energy generation'."
              }
            ]
          }
        }
      ]
    },

    // ----------------- MODULE 2 -----------------
    {
      id: "read3_stage_2",
      title: "Reading - Module 2 (Stage 2)",
      duration_seconds: 900, // 15 phút
      description: "Module 2 gồm 4 phần (19 câu hỏi). Hãy hoàn thành trước khi hết 15 phút.",
      tasks: [
        {
          id: "read3_m2_t1",
          title: "Task 1: Complete the Words (Đoạn 2 - Volcanoes)",
          task_type: "complete_words",
          content: {
            instructions: "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn học thuật dưới đây.",
            paragraph: "Volcanoes are geological structures that form when molten rock, or magma, rises from beneath the Earth's crust. Eruptions c[an] be b[oth] destructive and bene[ficial]. While th[ey] may dest[roy] nearby settle[ments] and alt[er] landscapes, they al[so] enrich the so[il] with mine[rals] and create new landforms. Scientists monitor volcanic activity to predict eruptions and reduce the risk to human life. Understanding volcanic behavior contributes to both safety and knowledge about the dynamic processes of our planet.",
            blanks: [
              { id: "read3_m2_t1_b1", prefix: "c", missing: "an", full: "can" },
              { id: "read3_m2_t1_b2", prefix: "b", missing: "oth", full: "both" },
              { id: "read3_m2_t1_b3", prefix: "bene", missing: "ficial", full: "beneficial" },
              { id: "read3_m2_t1_b4", prefix: "th", missing: "ey", full: "they" },
              { id: "read3_m2_t1_b5", prefix: "dest", missing: "roy", full: "destroy" },
              { id: "read3_m2_t1_b6", prefix: "settle", missing: "ments", full: "settlements" },
              { id: "read3_m2_t1_b7", prefix: "alt", missing: "er", full: "alter" },
              { id: "read3_m2_t1_b8", prefix: "al", missing: "so", full: "also" },
              { id: "read3_m2_t1_b9", prefix: "so", missing: "il", full: "soil" },
              { id: "read3_m2_t1_b10", prefix: "mine", missing: "rals", full: "minerals" }
            ]
          }
        },
        {
          id: "read3_m2_t2",
          title: "Task 2: Read an Ad (Weekend Getaway Deal)",
          task_type: "read_daily_life",
          content: {
            document_type: "Advertisement",
            passage: "Weekend Getaway Deal – Mountain Lodge Resort\n\nEscape city life and enjoy a peaceful weekend surrounded by nature!\n\nBook a two-night stay between Friday and Sunday and get 30% off spa treatments. Activities include guided hikes, yoga by the lake, and evening bonfires. Offer valid through November 30.",
            questions: [
              {
                id: "read3_m2_q11",
                type: "multiple_choice",
                prompt: "What is being advertised?",
                options: {
                  A: "A seasonal wellness retreat featuring yoga and hiking",
                  B: "A limited-time offer for weekend stays at a mountain resort",
                  C: "A promotional campaign for outdoor fitness programs",
                  D: "A special discount on luxury spa memberships"
                },
                correct_answer: "B",
                explanation: "Mẩu quảng cáo giới thiệu gói ưu đãi cuối tuần tại khu nghỉ dưỡng trên núi Mountain Lodge Resort ('Weekend Getaway Deal – Mountain Lodge Resort... Offer valid through November 30')."
              },
              {
                id: "read3_m2_q12",
                type: "multiple_choice",
                prompt: "Which benefit is offered to guests?",
                options: {
                  A: "Complimentary guided activities",
                  B: "Free room upgrades upon arrival",
                  C: "Reduced prices on spa services during eligible stays",
                  D: "Bonus nights for bookings over the weekend"
                },
                correct_answer: "C",
                explanation: "Quảng cáo ghi: 'Book a two-night stay between Friday and Sunday and get 30% off spa treatments' (giảm giá 30% dịch vụ spa)."
              }
            ]
          }
        },
        {
          id: "read3_m2_t3",
          title: "Task 3: Read an Announcement (School District Update)",
          task_type: "read_daily_life",
          content: {
            document_type: "School Announcement",
            passage: "School District Update\nDue to ongoing construction at Lincoln Elementary, classes will temporarily move to Jefferson Middle School starting next Monday. The schedule and bus routes will remain the same. Families will receive more details via email later this week.",
            questions: [
              {
                id: "read3_m2_q13",
                type: "multiple_choice",
                prompt: "What is the main purpose of the announcement?",
                options: {
                  A: "To inform parents about the completion of construction work",
                  B: "To explain new transportation procedures for Lincoln students",
                  C: "To announce improvements being made at Jefferson Middle School",
                  D: "To notify families about a short-term relocation of classes"
                },
                correct_answer: "D",
                explanation: "Mục đích chính là thông báo cho phụ huynh về việc chuyển tạm thời địa điểm học sang trường Jefferson Middle School trong thời gian thi công."
              },
              {
                id: "read3_m2_q14",
                type: "multiple_choice",
                prompt: "What can be inferred from the notice?",
                options: {
                  A: "Students will attend classes at a different site but follow their usual routine.",
                  B: "The construction work at Lincoln Elementary is nearly finished.",
                  C: "Parents must arrange private transportation for their children.",
                  D: "Classes at Jefferson Middle School are being suspended for Lincoln students to use the building."
                },
                correct_answer: "A",
                explanation: "Thông báo nêu: học sinh chuyển địa điểm sang trường khác, nhưng 'The schedule and bus routes will remain the same' (thời khóa biểu và lộ trình xe buýt vẫn như thường lệ)."
              }
            ]
          }
        },
        {
          id: "read3_m2_t4",
          title: "Task 4: Academic Passage (The Dunning-Kruger Effect)",
          task_type: "academic_passage",
          content: {
            document_type: "Cognitive Psychology Passage",
            passage: "The Dunning-Kruger effect is a cognitive bias wherein individuals with low ability at a task overestimate their ability. The postulated mechanism is a dual burden: these individuals not only perform poorly but also lack the metacognitive skill to accurately evaluate their performance, creating a cycle of ignorance and confidence.\n\nConversely, highly competent individuals may underestimate their relative competence, assuming that tasks which are easy for them are equally easy for others.\n\nThis creates a perverse cognitive landscape where the unskilled are buoyed by illusory superiority, while the expert is plagued by doubt. The effect has been demonstrated across domains from logical reasoning to emotional intelligence.\n\nMitigating it is challenging, as the very skills needed for accurate self-assessment are the ones lacking. Education and training that focus on metacognition – \"thinking about thinking\" – can help calibrate self-perception, but the bias remains a robust feature of human psychology.",
            questions: [
              {
                id: "read3_m2_q15",
                type: "multiple_choice",
                prompt: "The passage primarily discusses a cognitive bias that",
                options: {
                  A: "affects only experts in their respective fields.",
                  B: "causes everyone to overestimate their abilities.",
                  C: "creates a mismatch between ability and self-assessment.",
                  D: "is easily corrected through simple self-reflection."
                },
                correct_answer: "C",
                explanation: "Thiên kiến Dunning-Kruger tạo ra sự bất cân xứng, sai lệch lớn giữa năng lực thực tế và sự tự đánh giá của bản thân (người kém thì tự tin thái quá, người giỏi thì nghi ngờ năng lực)."
              },
              {
                id: "read3_m2_q16",
                type: "multiple_choice",
                prompt: "According to the passage, what is the \"dual burden\" experienced by low-ability individuals?",
                options: {
                  A: "High intelligence and low confidence",
                  B: "Poor performance and an inability to recognize it",
                  C: "A desire to learn and a lack of opportunity",
                  D: "Strong metacognitive skills and weak practical skills"
                },
                correct_answer: "B",
                explanation: "Đoạn 1 chỉ rõ: 'dual burden: these individuals not only perform poorly but also lack the metacognitive skill to accurately evaluate their performance'."
              },
              {
                id: "read3_m2_q17",
                type: "multiple_choice",
                prompt: "The word \"perverse\" in the passage is closest in meaning to",
                options: {
                  A: "straightforward",
                  B: "irrational",
                  C: "encouraging",
                  D: "temporary"
                },
                correct_answer: "B",
                explanation: "'Perverse' trong ngữ cảnh nghịch lý, trái ngược với lý lẽ thông thường (kẻ dốt thì kiêu ngạo, người tài lại hoài nghi) đồng nghĩa với 'irrational' (nghịch lý, phi lý)."
              },
              {
                id: "read3_m2_q18",
                type: "multiple_choice",
                prompt: "Why does the author mention that \"tasks which are easy for them are equally easy for others\" when discussing experts?",
                options: {
                  A: "To illustrate the experts' logical reasoning skills.",
                  B: "To explain why experts often fail simple tasks.",
                  C: "To describe the experts' tendency toward underestimation.",
                  D: "To show that experts are generally overconfident."
                },
                correct_answer: "C",
                explanation: "Tác giả nêu điều này để giải thích xu hướng tự đánh giá thấp (underestimation) của các chuyên gia khi cho rằng điều gì dễ với mình cũng dễ với người khác."
              },
              {
                id: "read3_m2_q19",
                type: "multiple_choice",
                prompt: "What does the passage suggest about mitigating the Dunning-Kruger effect?",
                options: {
                  A: "It is a simple process that requires minimal effort.",
                  B: "It is impossible because the bias is a fundamental part of human nature.",
                  C: "It can be addressed by focusing on metacognitive skills, though it is difficult.",
                  D: "It is best achieved by avoiding education and training altogether."
                },
                correct_answer: "C",
                explanation: "Đoạn cuối nhấn mạnh: việc giảm thiểu tuy thách thức nhưng có thể thực hiện thông qua đào tạo kỹ năng siêu nhận thức (metacognition – 'thinking about thinking')."
              }
            ]
          }
        }
      ]
    }
  ]
};

// =================================================================
// 1.4 READING PRACTICE TEST 04 (TOEFL 2026 OFFICIAL YOUTUBE PRACTICE 3)
// =================================================================
export const readingTest04 = {
  id: "reading-practice-04",
  title: "Reading Practice Test 04 (TOEFL 2026 - Linguistic Relativity & Epigenetics)",
  skill: "reading",
  is_default: true,
  duration_seconds: 1800, // 30 phút tổng
  description: "Bộ đề TOEFL iBT 2026 Multistage Adaptive (YouTube Practice 3): Module 1 (Printing Press, Lunch Menu, Campus IT, Linguistic Relativity) & Module 2 (Photosynthesis, City Library, Lunchtime Meditation, Epigenetics).",
  stages: [
    // ----------------- MODULE 1 -----------------
    {
      id: "read4_stage_1",
      title: "Reading - Module 1 (Stage 1)",
      duration_seconds: 900, // 15 phút
      description: "Module 1 gồm 4 phần (20 câu hỏi). Hãy hoàn thành trước khi hết 15 phút.",
      tasks: [
        {
          id: "read4_m1_t1",
          title: "Task 1: Complete the Words (Đoạn 1 - The Printing Press)",
          task_type: "complete_words",
          content: {
            instructions: "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn học thuật dưới đây.",
            paragraph: "The invention of the printing press by Johannes Gutenberg in the fifteenth century transformed human communication. Bef[ore] this inve[ntion], books we[re] copied b[y] hand, mak[ing] them expe[nsive] and ra[re]. The prin[ting] press allo[wed] ideas to spr[ead] rapidly, fueling the Renaissance and the Reformation. It also encouraged literacy and education among ordinary people. Today, Gutenberg's innovation is regarded as one of the most important developments in human history, laying the foundation for the modern knowledge-based society.",
            blanks: [
              { id: "read4_m1_t1_b1", prefix: "Bef", missing: "ore", full: "Before" },
              { id: "read4_m1_t1_b2", prefix: "inve", missing: "ntion", full: "invention" },
              { id: "read4_m1_t1_b3", prefix: "we", missing: "re", full: "were" },
              { id: "read4_m1_t1_b4", prefix: "b", missing: "y", full: "by" },
              { id: "read4_m1_t1_b5", prefix: "mak", missing: "ing", full: "making" },
              { id: "read4_m1_t1_b6", prefix: "expe", missing: "nsive", full: "expensive" },
              { id: "read4_m1_t1_b7", prefix: "ra", missing: "re", full: "rare" },
              { id: "read4_m1_t1_b8", prefix: "prin", missing: "ting", full: "printing" },
              { id: "read4_m1_t1_b9", prefix: "allo", missing: "wed", full: "allowed" },
              { id: "read4_m1_t1_b10", prefix: "spr", missing: "ead", full: "spread" }
            ]
          }
        },
        {
          id: "read4_m1_t2",
          title: "Task 2: Read a Restaurant Menu (Lunch Specials)",
          task_type: "read_daily_life",
          content: {
            document_type: "Restaurant Menu",
            passage: "MENU\nLunch Specials\n(11 a.m.–3 p.m.)\n\nGrilled Chicken Wrap – $10\n(served with chips)\nVegetarian Lasagna – $12\n(includes garlic bread)\nShrimp Tacos (3 pcs) – $14\n\nIncludes a drink of your choice: iced tea, coffee, or soda.\nAdd a side salad for $3 or upgrade your drink to fresh juice for $2.\nLunch specials are available Monday through Friday.",
            questions: [
              {
                id: "read4_m1_q11",
                type: "multiple_choice",
                prompt: "What is true about the lunch specials?",
                options: {
                  A: "They come with a side salad.",
                  B: "They are available every day of the week.",
                  C: "They are available only in the afternoon.",
                  D: "They are served with a drink included."
                },
                correct_answer: "D",
                explanation: "Thực đơn nêu rõ: 'Includes a drink of your choice: iced tea, coffee, or soda' (đã bao gồm đồ uống đi kèm)."
              },
              {
                id: "read4_m1_q12",
                type: "multiple_choice",
                prompt: "How much would a Shrimp Taco meal with a side salad and a coffee cost?",
                options: {
                  A: "$14",
                  B: "$16",
                  C: "$17",
                  D: "$19"
                },
                correct_answer: "C",
                explanation: "Món Shrimp Tacos có giá $14 (đã kèm cà phê) + thêm side salad $3 = $17."
              }
            ]
          }
        },
        {
          id: "read4_m1_t3",
          title: "Task 3: Read a Webpage Notice (Campus IT Services)",
          task_type: "read_daily_life",
          content: {
            document_type: "Webpage Notice",
            passage: "Update from Campus IT Services\n\nStarting this weekend, all university email passwords will automatically expire every 90 days.\nUsers will receive a reminder 10 days before expiration, containing a secure link to reset their passwords. Those who fail to reset their passwords in time may temporarily lose access to their email and online course platforms.\nThis new policy is part of the university's effort to enhance data protection and prevent unauthorized access to student information.",
            questions: [
              {
                id: "read4_m1_q13",
                type: "multiple_choice",
                prompt: "What is the reason for this policy update?",
                options: {
                  A: "To make logging in faster",
                  B: "To protect sensitive data",
                  C: "To simplify password recovery",
                  D: "To comply with university attendance rules"
                },
                correct_answer: "B",
                explanation: "Câu cuối nêu rõ mục đích: 'part of the university's effort to enhance data protection and prevent unauthorized access to student information'."
              },
              {
                id: "read4_m1_q14",
                type: "multiple_choice",
                prompt: "What will users receive before their passwords expire?",
                options: {
                  A: "A security code",
                  B: "A call from IT support",
                  C: "A warning message",
                  D: "A list of old passwords"
                },
                correct_answer: "C",
                explanation: "Thông báo nêu: 'Users will receive a reminder 10 days before expiration, containing a secure link to reset their passwords' (một lời nhắc / cảnh báo trước khi hết hạn)."
              },
              {
                id: "read4_m1_q15",
                type: "multiple_choice",
                prompt: "What may happen if users don't reset their passwords on time?",
                options: {
                  A: "Their accounts will be permanently deleted",
                  B: "They may be locked out of their accounts temporarily",
                  C: "Their passwords will reset automatically",
                  D: "They will need to create a new university email account"
                },
                correct_answer: "B",
                explanation: "Bài đọc nêu: 'Those who fail to reset their passwords in time may temporarily lose access to their email and online course platforms'."
              }
            ]
          }
        },
        {
          id: "read4_m1_t4",
          title: "Task 4: Academic Passage (The Concept of Linguistic Relativity)",
          task_type: "academic_passage",
          content: {
            document_type: "Linguistics & Cognitive Science Passage",
            passage: "The principle of linguistic relativity, often associated with the Sapir-Whorf hypothesis, posits that the structure of a language influences its speakers' worldview and cognition.\n\nThe strong version, linguistic determinism, argues that language determines thought and that linguistic categories limit cognitive categories. This view is largely discredited.\n\nHowever, a weaker, more tenable version suggests that language influences thought processes, such as memory, perception, and attention.\n\nFor example, speakers of languages that have multiple distinct words for blue (e.g., light blue vs. dark blue) may be faster at discriminating between these shades. Similarly, languages that use cardinal directions (north, south) instead of egocentric coordinates (left, right) require their speakers to maintain a constant, subconscious awareness of their orientation in space.\n\nWhile evidence for the strong version is scant, a growing body of research supports the weak version, indicating that the language we speak can shape, though not imprison, our cognitive habits.",
            questions: [
              {
                id: "read4_m1_q16",
                type: "multiple_choice",
                prompt: "What is the main idea of the passage?",
                options: {
                  A: "The strong version of the Sapir-Whorf hypothesis has been conclusively proven.",
                  B: "Language may influence how we think, but it does not strictly determine it.",
                  C: "All cognitive processes are entirely dependent on the language one speaks.",
                  D: "The concept of linguistic relativity has been rejected by modern science."
                },
                correct_answer: "B",
                explanation: "Ý chính của bài viết là ngôn ngữ có thể định hình và ảnh hưởng đến tư duy và nhận thức nhưng không quyết định hay trói buộc nó tuyệt đối (weak version được ủng hộ, strong version bị bác bỏ)."
              },
              {
                id: "read4_m1_q17",
                type: "multiple_choice",
                prompt: "The word \"tenable\" in the passage is closest in meaning to",
                options: {
                  A: "defensible",
                  B: "weak",
                  C: "outdated",
                  D: "radical"
                },
                correct_answer: "A",
                explanation: "'Tenable' có nghĩa là có thể bảo vệ được bằng lý lẽ hoặc chứng cứ thực tế, đồng nghĩa với 'defensible'."
              },
              {
                id: "read4_m1_q18",
                type: "multiple_choice",
                prompt: "According to the passage, how might a language that uses cardinal directions affect its speakers?",
                options: {
                  A: "It would make them worse at giving directions.",
                  B: "It would force them to think longer.",
                  C: "It would require them to be constantly aware of their spatial orientation.",
                  D: "It would limit their vocabulary for describing colors."
                },
                correct_answer: "C",
                explanation: "Đoạn 4 nêu rõ: 'require their speakers to maintain a constant, subconscious awareness of their orientation in space'."
              },
              {
                id: "read4_m1_q19",
                type: "multiple_choice",
                prompt: "The author discusses the example of words for blue primarily to",
                options: {
                  A: "prove the strong version of linguistic determinism.",
                  B: "illustrate a potential influence of language on perception.",
                  C: "argue that some languages are more descriptive than others.",
                  D: "show that color perception is universal across cultures."
                },
                correct_answer: "B",
                explanation: "Ví dụ về các từ chỉ màu xanh lam minh họa cho luận điểm phiên bản yếu: ngôn ngữ tác động đến quá trình tri giác thị giác (perception)."
              },
              {
                id: "read4_m1_q20",
                type: "multiple_choice",
                prompt: "What is the relationship between the strong and weak versions of linguistic relativity as described in the passage?",
                options: {
                  A: "The weak version is a more extreme form of the strong version.",
                  B: "The strong version is a widely accepted refinement of the weak version.",
                  C: "The weak version is a less absolute and more supported alternative to the strong version.",
                  D: "Both versions are considered equally valid by contemporary researchers."
                },
                correct_answer: "C",
                explanation: "Phiên bản yếu (weak version) là một sự thay thế bớt tuyệt đối đoan hơn và nhận được nhiều bằng chứng khoa học ủng hộ hơn so với phiên bản quyết định luận cứng nhắc (strong version)."
              }
            ]
          }
        }
      ]
    },

    // ----------------- MODULE 2 -----------------
    {
      id: "read4_stage_2",
      title: "Reading - Module 2 (Stage 2)",
      duration_seconds: 900, // 15 phút
      description: "Module 2 gồm 4 phần (20 câu hỏi). Hãy hoàn thành trước khi hết 15 phút.",
      tasks: [
        {
          id: "read4_m2_t1",
          title: "Task 1: Complete the Words (Đoạn 2 - Photosynthesis)",
          task_type: "complete_words",
          content: {
            instructions: "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn học thuật dưới đây.",
            paragraph: "Photosynthesis is the process by which green plants convert sunlight into chemical energy. Using chlorophyll, they abs[orb] light and trans[form] carbon diox[ide] and wat[er] into gluco[se] and oxy[gen]. This proc[ess] not on[ly] sustains pl[ant] life b[ut] also provides the oxygen that animals and humans breathe. Without photosynthesis, life on Earth would not exist in its current form. Scientists study this process to develop artificial methods of capturing solar energy efficiently for renewable power.",
            blanks: [
              { id: "read4_m2_t1_b1", prefix: "abs", missing: "orb", full: "absorb" },
              { id: "read4_m2_t1_b2", prefix: "trans", missing: "form", full: "transform" },
              { id: "read4_m2_t1_b3", prefix: "diox", missing: "ide", full: "dioxide" },
              { id: "read4_m2_t1_b4", prefix: "wat", missing: "er", full: "water" },
              { id: "read4_m2_t1_b5", prefix: "gluco", missing: "se", full: "glucose" },
              { id: "read4_m2_t1_b6", prefix: "oxy", missing: "gen", full: "oxygen" },
              { id: "read4_m2_t1_b7", prefix: "proc", missing: "ess", full: "process" },
              { id: "read4_m2_t1_b8", prefix: "on", missing: "ly", full: "only" },
              { id: "read4_m2_t1_b9", prefix: "pl", missing: "ant", full: "plant" },
              { id: "read4_m2_t1_b10", prefix: "b", missing: "ut", full: "but" }
            ]
          }
        },
        {
          id: "read4_m2_t2",
          title: "Task 2: Read a Sign (City Library Announcement)",
          task_type: "read_daily_life",
          content: {
            document_type: "Library Sign",
            passage: "City Library Announcement\n\nDue to maintenance, the City Library will close early at 5 p.m. from Monday to Thursday next week. Weekend hours remain unchanged.\n\nDuring this period, you can still return borrowed books using the drop box at the main entrance or access digital materials through the library's online portal. We apologize for any inconvenience.",
            questions: [
              {
                id: "read4_m2_q11",
                type: "multiple_choice",
                prompt: "What is the main purpose of this notice?",
                options: {
                  A: "To advertise the library's new online services",
                  B: "To inform users about temporary changes in operating hours",
                  C: "To announce the renovation of the entire building",
                  D: "To explain how to borrow books"
                },
                correct_answer: "B",
                explanation: "Thông báo nhằm cập nhật giờ mở cửa tạm thời (đóng cửa sớm lúc 5h chiều từ Thứ Hai đến Thứ Năm do bảo trì)."
              },
              {
                id: "read4_m2_q12",
                type: "multiple_choice",
                prompt: "What will remain the same during the maintenance period?",
                options: {
                  A: "The library's weekday closing time",
                  B: "The main entrance location",
                  C: "Access to physical books",
                  D: "The schedule for the weekend"
                },
                correct_answer: "D",
                explanation: "Thông báo chỉ rõ: 'Weekend hours remain unchanged' (giờ mở cửa vào cuối tuần vẫn giữ nguyên)."
              }
            ]
          }
        },
        {
          id: "read4_m2_t3",
          title: "Task 3: Read a Social Media Post (Lunchtime Meditation Group)",
          task_type: "read_daily_life",
          content: {
            document_type: "Social Media Post",
            passage: "Feeling overwhelmed at work? Take a mindful break and join our Lunchtime Meditation Group at Central Park, every Tuesday from 12:30 to 12:55 p.m.\n\nEach 25-minute session, led by a certified mindfulness coach, focuses on simple breathing and relaxation techniques that can help reduce stress and improve focus.\n\nParticipation is free, but please bring your own mat or towel. No prior experience is required – just come with an open mind and a calm spirit.",
            questions: [
              {
                id: "read4_m2_q13",
                type: "multiple_choice",
                prompt: "What is the main purpose of the post?",
                options: {
                  A: "To advertise yoga classes",
                  B: "To invite people to join short meditation sessions",
                  C: "To provide detailed instructions for meditation",
                  D: "To announce the opening of a new wellness center"
                },
                correct_answer: "B",
                explanation: "Bài đăng mời mọi người tham gia nhóm thiền ngắn vào giờ nghỉ trưa thứ Ba hàng tuần tại Công viên Trung tâm."
              },
              {
                id: "read4_m2_q14",
                type: "multiple_choice",
                prompt: "Who is most likely to attend these sessions?",
                options: {
                  A: "Employees looking for a quick way to unwind during lunch",
                  B: "People exercising in the park",
                  C: "People who have a towel",
                  D: "Students taking online meditation courses"
                },
                correct_answer: "A",
                explanation: "Đối tượng hướng tới là người đi làm muốn thư giãn đầu óc nhanh trong giờ nghỉ trưa ('Feeling overwhelmed at work? Take a mindful break and join our Lunchtime Meditation Group')."
              },
              {
                id: "read4_m2_q15",
                type: "multiple_choice",
                prompt: "What can be inferred about the sessions?",
                options: {
                  A: "They take place indoors during bad weather",
                  B: "They require participants to register in advance",
                  C: "They are mostly intended for experienced meditators",
                  D: "They are designed to fit into people's workday schedules"
                },
                correct_answer: "D",
                explanation: "Các buổi tập chỉ kéo dài 25 phút vào khung giờ nghỉ trưa 12:30 - 12:55, được thiết kế phù hợp với lịch làm việc bận rộn."
              }
            ]
          }
        },
        {
          id: "read4_m2_t4",
          title: "Task 4: Academic Passage (Epigenetics: Beyond the Genetic Code)",
          task_type: "academic_passage",
          content: {
            document_type: "Molecular Biology & Genetics Passage",
            passage: "The central dogma of biology long held that DNA sequence was the sole biological inheritance, a fixed blueprint for an organism.\n\nEpigenetics, however, has revolutionized this view. It refers to the study of heritable changes in gene expression that do not involve alterations to the underlying DNA sequence. These changes, such as DNA methylation or histone modification, act as \"switches\" that turn genes on or off in response to environmental factors like diet, stress, and toxin exposure.\n\nThis means that experiences can leave a molecular scar or a benefit that can be passed to subsequent generations. For instance, studies have shown that the nutritional status of grandparents can affect the health outcomes of their grandchildren, even in the absence of continued exposure.\n\nThis Lamarckian-like inheritance challenges the strict Darwinian model and has profound implications for our understanding of evolution, disease susceptibility, and the complex interplay between nature and nurture.",
            questions: [
              {
                id: "read4_m2_q16",
                type: "multiple_choice",
                prompt: "The primary purpose of the passage is to",
                options: {
                  A: "defend the central dogma of biology against new evidence.",
                  B: "describe a field that studies non-sequence-based genetic inheritance.",
                  C: "argue that DNA sequence is irrelevant to gene expression.",
                  D: "detail the specific biochemical processes of DNA methylation."
                },
                correct_answer: "B",
                explanation: "Mục đích chính của bài là giới thiệu và giải thích về biểu sinh học (epigenetics) - lĩnh vực nghiên cứu sự di truyền biểu hiện gen không làm biến đổi trình tự ADN gốc."
              },
              {
                id: "read4_m2_q17",
                type: "multiple_choice",
                prompt: "The word \"heritable\" in the passage is closest in meaning to",
                options: {
                  A: "temporary",
                  B: "observable",
                  C: "transmissible",
                  D: "harmful"
                },
                correct_answer: "C",
                explanation: "'Heritable' (có thể di truyền được sang các thế hệ sau) đồng nghĩa với 'transmissible' (có thể truyền lại)."
              },
              {
                id: "read4_m2_q18",
                type: "multiple_choice",
                prompt: "According to the passage, what is the role of environmental factors in epigenetics?",
                options: {
                  A: "They directly change the DNA sequence.",
                  B: "They have no impact on gene expression.",
                  C: "They can influence the chemical markers that control gene activity.",
                  D: "They only affect the individual exposed, not their offspring."
                },
                correct_answer: "C",
                explanation: "Yếu tố môi trường (dinh dưỡng, căng thẳng, độc chất) hoạt động như 'công tắc' làm thay đổi các dấu ấn hóa học điều khiển bật/tắt hoạt động của gen mà không thay đổi trình tự ADN."
              },
              {
                id: "read4_m2_q19",
                type: "multiple_choice",
                prompt: "The author mentions the \"nutritional status of grandparents\" to provide an example of",
                options: {
                  A: "the irrelevance of past generations to current health.",
                  B: "a purely genetic disease.",
                  C: "the transgenerational impact of epigenetic changes.",
                  D: "a flaw in epigenetic research methodology."
                },
                correct_answer: "C",
                explanation: "Tác giả dẫn chứng tình trạng dinh dưỡng của ông bà ảnh hưởng tới đời cháu để minh họa cho tác động di truyền qua nhiều thế hệ (transgenerational impact) của các biến đổi biểu sinh."
              },
              {
                id: "read4_m2_q20",
                type: "multiple_choice",
                prompt: "It can be inferred from the passage that epigenetics challenges traditional views by suggesting that",
                options: {
                  A: "acquired characteristics can never be inherited.",
                  B: "the environment can play a role in what is passed to offspring.",
                  C: "DNA is the only source of biological information.",
                  D: "Darwin's theory of evolution is entirely incorrect."
                },
                correct_answer: "B",
                explanation: "Biểu sinh học thách thức quan niệm truyền thống bằng việc chỉ ra rằng môi trường sống và trải nghiệm có thể đóng vai trò quyết định những gì được truyền sang thế hệ con cháu."
              }
            ]
          }
        }
      ]
    }
  ]
};

// =================================================================
// 1.5 READING PRACTICE TEST 05 (TOEFL 2026 OFFICIAL YOUTUBE PRACTICE 4)
// =================================================================
export const readingTest05 = {
  id: "reading-practice-05",
  title: "Reading Practice Test 05 (TOEFL 2026 - Keystone Species & Utilitarianism)",
  skill: "reading",
  is_default: true,
  duration_seconds: 1800, // 30 phút tổng
  description: "Bộ đề TOEFL iBT 2026 Multistage Adaptive (YouTube Practice 4): Module 1 (Great Wall of China, Orientation Reminder, SkyReach Language App, Keystone Species) & Module 2 (Water Resource, Mountain Peak Hotel, EcoSteps Volunteer, Utilitarianism).",
  stages: [
    // ----------------- MODULE 1 -----------------
    {
      id: "read5_stage_1",
      title: "Reading - Module 1 (Stage 1)",
      duration_seconds: 900, // 15 phút
      description: "Module 1 gồm 4 phần (20 câu hỏi). Hãy hoàn thành trước khi hết 15 phút.",
      tasks: [
        {
          id: "read5_m1_t1",
          title: "Task 1: Complete the Words (Đoạn 1 - The Great Wall of China)",
          task_type: "complete_words",
          content: {
            instructions: "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn học thuật dưới đây.",
            paragraph: "The Great Wall of China is one of the most iconic structures in the world. Built ov[er] centuries, it orig[inally] served a[s] a def[ence] system ag[ainst] invasions fr[om] northern tri[bes]. Stretching thou[sands] of kil[ometers], it demon[strates] remarkable engineering and human perseverance. Although no longer used for military purposes, it remains a symbol of Chinese history and culture. Today, it attracts millions of visitors each year, highlighting the importance of preserving historical monuments.",
            blanks: [
              { id: "read5_m1_t1_b1", prefix: "ov", missing: "er", full: "over" },
              { id: "read5_m1_t1_b2", prefix: "orig", missing: "inally", full: "originally" },
              { id: "read5_m1_t1_b3", prefix: "a", missing: "s", full: "as" },
              { id: "read5_m1_t1_b4", prefix: "def", missing: "ence", full: "defence" },
              { id: "read5_m1_t1_b5", prefix: "ag", missing: "ainst", full: "against" },
              { id: "read5_m1_t1_b6", prefix: "fr", missing: "om", full: "from" },
              { id: "read5_m1_t1_b7", prefix: "tri", missing: "bes", full: "tribes" },
              { id: "read5_m1_t1_b8", prefix: "thou", missing: "sands", full: "thousands" },
              { id: "read5_m1_t1_b9", prefix: "kil", missing: "ometers", full: "kilometers" },
              { id: "read5_m1_t1_b10", prefix: "demon", missing: "strates", full: "demonstrates" }
            ]
          }
        },
        {
          id: "read5_m1_t2",
          title: "Task 2: Read an Email (Orientation Reminder)",
          task_type: "read_daily_life",
          content: {
            document_type: "Email Reminder",
            passage: "From: StudentServices@modernuni.edu\nSubject: Orientation Reminder\n\nDear Students,\nWe look forward to welcoming you to campus! Please note that orientation will begin at 9:30 a.m. in the Main Hall this Friday. You'll receive your student ID, meet your academic advisor, and attend a brief tour of the campus. Light refreshments will be provided. Be sure to bring a valid photo ID.\nSincerely,\nStudent Services",
            questions: [
              {
                id: "read5_m1_q11",
                type: "multiple_choice",
                prompt: "What is the purpose of this email?",
                options: {
                  A: "To confirm the start of classes",
                  B: "To announce changes in the orientation schedule",
                  C: "To request missing student information",
                  D: "To invite students to attend an introductory event"
                },
                correct_answer: "D",
                explanation: "Email thông báo và mời sinh viên tham gia buổi định hướng chào đón tân sinh viên ('welcoming you to campus... orientation will begin at 9:30 a.m. in the Main Hall')."
              },
              {
                id: "read5_m1_q12",
                type: "multiple_choice",
                prompt: "What should students bring to the orientation?",
                options: {
                  A: "Student ID cards",
                  B: "Academic transcripts",
                  C: "A photo identification",
                  D: "Admission letters"
                },
                correct_answer: "C",
                explanation: "Email nhắc nhở rõ ràng: 'Be sure to bring a valid photo ID' (giấy tờ tùy thân có ảnh hợp lệ)."
              }
            ]
          }
        },
        {
          id: "read5_m1_t3",
          title: "Task 3: Read an Advertisement (SkyReach Language App)",
          task_type: "read_daily_life",
          content: {
            document_type: "App Advertisement",
            passage: "SkyReach Language App\n\nWant to learn a new language without feeling overwhelmed? SkyReach helps you practice in short, fun lessons designed by professional teachers. Track your progress, earn badges, and review tricky vocabulary anytime.\n\nStart your free 7-day trial today and experience how quickly you can improve!",
            questions: [
              {
                id: "read5_m1_q13",
                type: "multiple_choice",
                prompt: "What is being promoted in this advertisement?",
                options: {
                  A: "A study-abroad program",
                  B: "A digital learning platform",
                  C: "A live online course with teachers",
                  D: "A vocabulary book"
                },
                correct_answer: "B",
                explanation: "Quảng cáo giới thiệu ứng dụng học ngoại ngữ số SkyReach ('SkyReach Language App... Track your progress, earn badges...')."
              },
              {
                id: "read5_m1_q14",
                type: "multiple_choice",
                prompt: "Why might users find SkyReach appealing?",
                options: {
                  A: "It offers a 7-day free trial",
                  B: "It provides access to professional teachers",
                  C: "It allows flexible, short practice sessions",
                  D: "It guarantees fluency within a week"
                },
                correct_answer: "C",
                explanation: "Điểm thu hút được nhấn mạnh là các bài học ngắn và linh hoạt ('helps you practice in short, fun lessons... review tricky vocabulary anytime')."
              },
              {
                id: "read5_m1_q15",
                type: "multiple_choice",
                prompt: "What feature of SkyReach is emphasized as a way to support ongoing learning?",
                options: {
                  A: "Tracking progress and earning rewards",
                  B: "Personalized one-on-one lessons",
                  C: "Intensive daily homework assignments",
                  D: "Group discussion forums"
                },
                correct_answer: "A",
                explanation: "Tính năng hỗ trợ duy trì động lực học tập liên tục là theo dõi tiến độ và nhận huy hiệu thưởng ('Track your progress, earn badges')."
              }
            ]
          }
        },
        {
          id: "read5_m1_t4",
          title: "Task 4: Academic Passage (Trophic Cascades and Keystone Species)",
          task_type: "academic_passage",
          content: {
            document_type: "Ecology & Conservation Passage",
            passage: "The concept of a keystone species, one that exerts a disproportionate influence on its ecosystem relative to its abundance, is central to understanding ecological stability. The removal of such a species can trigger a trophic cascade – a series of indirect effects that ripple through the food web, dramatically altering ecosystem structure and function.\n\nThe classic example is the grey wolf in Yellowstone National Park. Following their extirpation in the 1920s, elk populations surged, leading to overgrazing of willow and aspen saplings. This denudation negatively impacted beaver populations, which rely on these trees for food and dam building. The loss of beaver dams reduced aquatic habitats, affecting fish, amphibians, and riverbank structure.\n\nUpon the wolves' reintroduction in 1995, a remarkable reversal began. The presence of wolves not only directly reduced elk numbers but also changed elk behavior, a phenomenon known as the \"ecology of fear\". Elk avoided vulnerable valleys and gorges, allowing riparian vegetation to recover. This, in turn, supported the return of beavers and the biodiversity associated with their wetlands.\n\nThis case illustrates that apex predators are not merely passengers in an ecosystem but are often fundamental architects, maintaining balance through both predation and the intimidation they inspire.",
            questions: [
              {
                id: "read5_m1_q16",
                type: "multiple_choice",
                prompt: "Which of the following best expresses the main idea of the passage?",
                options: {
                  A: "Elk are the most important species in the Yellowstone ecosystem.",
                  B: "The reintroduction of wolves was a controversial policy.",
                  C: "Beaver dams are the primary factor in maintaining riverbank health.",
                  D: "Keystone species can shape entire ecosystems through direct and indirect effects."
                },
                correct_answer: "D",
                explanation: "Ý chính của bài là các loài chủ chốt (keystone species) có thể định hình toàn bộ hệ sinh thái thông qua các tác động trực tiếp và gián tiếp nhiều tầng bậc (trophic cascade)."
              },
              {
                id: "read5_m1_q17",
                type: "multiple_choice",
                prompt: "The word \"denudation\" in the passage is closest in meaning to",
                options: {
                  A: "stripping",
                  B: "planting",
                  C: "fertilization",
                  D: "cultivation"
                },
                correct_answer: "A",
                explanation: "'Denudation' trong ngữ cảnh cây cối bị chăn thả quá mức dẫn đến trơ trụi đất đai đồng nghĩa với 'stripping' (làm trơ trụi, tước đoạt thảm thực vật)."
              },
              {
                id: "read5_m1_q18",
                type: "multiple_choice",
                prompt: "According to the passage, how did the reintroduction of wolves affect elk behavior?",
                options: {
                  A: "It caused elk to congregate in larger herds in open valleys.",
                  B: "It made elk less fearful of other predators.",
                  C: "It led elk to avoid certain areas, allowing plants to regrow.",
                  D: "It had no significant impact on elk behavior."
                },
                correct_answer: "C",
                explanation: "Đoạn 3 nêu: 'Elk avoided vulnerable valleys and gorges, allowing riparian vegetation to recover' (nai né tránh các thung lũng hiểm trở, tạo điều kiện cho thực vật ven bờ phục hồi)."
              },
              {
                id: "read5_m1_q19",
                type: "multiple_choice",
                prompt: "The author refers to the \"ecology of fear\" in order to",
                options: {
                  A: "describe a negative consequence of wolf reintroduction.",
                  B: "highlight a psychological problem in elk populations.",
                  C: "argue that fear is the most important factor in ecosystem management.",
                  D: "explain a mechanism by which wolves indirectly affect vegetation."
                },
                correct_answer: "D",
                explanation: "Thuật ngữ 'ecology of fear' giải thích cơ chế gián tiếp: nỗi sợ bị sói săn bắt làm thay đổi hành vi kiếm ăn của nai, từ đó gián tiếp giúp thảm thực vật phục hồi."
              },
              {
                id: "read5_m1_q20",
                type: "multiple_choice",
                prompt: "Based on the passage, what can be inferred about the role of beavers in this trophic cascade?",
                options: {
                  A: "They were the primary cause of the overgrazing problem.",
                  B: "Their population decline was a direct result of wolf predation.",
                  C: "Their return was a secondary effect of the wolves' influence on elk and vegetation.",
                  D: "They are considered the keystone species in Yellowstone."
                },
                correct_answer: "C",
                explanation: "Sự quay trở lại của hải ly là một hiệu ứng thứ cấp bắt nguồn từ việc sói kiểm soát đàn nai, giúp cây liễu mọc lại và cung cấp thức ăn cũng như vật liệu xây đập cho hải ly."
              }
            ]
          }
        }
      ]
    },

    // ----------------- MODULE 2 -----------------
    {
      id: "read5_stage_2",
      title: "Reading - Module 2 (Stage 2)",
      duration_seconds: 900, // 15 phút
      description: "Module 2 gồm 4 phần (20 câu hỏi). Hãy hoàn thành trước khi hết 15 phút.",
      tasks: [
        {
          id: "read5_m2_t1",
          title: "Task 1: Complete the Words (Đoạn 2 - Water Resource)",
          task_type: "complete_words",
          content: {
            instructions: "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn học thuật dưới đây.",
            paragraph: "Water is a vital resource for all living organisms. It suppo[rts] plant gro[wth], regulates clim[ate], and ena[bles] biological proce[sses] in ani[mals] and hu[mans]. Despite i[ts] abundance, on[ly] a small perce[ntage] of Earth's water is fresh and available for consumption. Increasing population and industrial pollution are putting this resource under pressure. Governments and scientists promote water conservation, improved infrastructure, and sustainable agriculture to ensure future generations have access to clean water.",
            blanks: [
              { id: "read5_m2_t1_b1", prefix: "suppo", missing: "rts", full: "supports" },
              { id: "read5_m2_t1_b2", prefix: "gro", missing: "wth", full: "growth" },
              { id: "read5_m2_t1_b3", prefix: "clim", missing: "ate", full: "climate" },
              { id: "read5_m2_t1_b4", prefix: "ena", missing: "bles", full: "enables" },
              { id: "read5_m2_t1_b5", prefix: "proce", missing: "sses", full: "processes" },
              { id: "read5_m2_t1_b6", prefix: "ani", missing: "mals", full: "animals" },
              { id: "read5_m2_t1_b7", prefix: "hu", missing: "mans", full: "humans" },
              { id: "read5_m2_t1_b8", prefix: "i", missing: "ts", full: "its" },
              { id: "read5_m2_t1_b9", prefix: "on", missing: "ly", full: "only" },
              { id: "read5_m2_t1_b10", prefix: "perce", missing: "ntage", full: "percentage" }
            ]
          }
        },
        {
          id: "read5_m2_t2",
          title: "Task 2: Read an Online Review (Mountain Peak Hotel)",
          task_type: "read_daily_life",
          content: {
            document_type: "Hotel Review",
            passage: "I stayed at the Mountain Peak Hotel last weekend. The location is perfect – just a short walk from the hiking trails. The staff were friendly, but the Wi-Fi connection was unreliable, and breakfast choices were limited. Overall, it's a comfortable place if you value peace and scenery more than modern facilities.",
            questions: [
              {
                id: "read5_m2_q11",
                type: "multiple_choice",
                prompt: "What aspect of the hotel does the reviewer praise most?",
                options: {
                  A: "The food options",
                  B: "The staff",
                  C: "The setting",
                  D: "The modern facilities"
                },
                correct_answer: "C",
                explanation: "Người đánh giá khen ngợi nhất về vị trí và khung cảnh thiên nhiên ('The location is perfect – just a short walk from the hiking trails... peace and scenery')."
              },
              {
                id: "read5_m2_q12",
                type: "multiple_choice",
                prompt: "What can be inferred about the hotel?",
                options: {
                  A: "It's more suitable for people who enjoy nature",
                  B: "It's mainly used for business trips",
                  C: "It offers luxury-level comfort",
                  D: "It's under renovation"
                },
                correct_answer: "A",
                explanation: "Khách sạn thích hợp nhất cho những người yêu thiên nhiên và sự yên tĩnh hơn là tiện nghi hiện đại ('suitable for people who enjoy nature')."
              }
            ]
          }
        },
        {
          id: "read5_m2_t3",
          title: "Task 3: Read a Web Announcement (Volunteer with EcoSteps)",
          task_type: "read_daily_life",
          content: {
            document_type: "Community Announcement",
            passage: "Volunteer with EcoSteps!\n\nEcoSteps is looking for enthusiastic volunteers for its annual river cleanup event. Participants will meet at the Riverside Park entrance at 8 a.m. on April 22. Gloves and trash bags will be provided, but please bring your own reusable water bottle. Help us protect wildlife habitats and make a tangible difference in your community!",
            questions: [
              {
                id: "read5_m2_q13",
                type: "multiple_choice",
                prompt: "What is the primary aim of the EcoSteps event?",
                options: {
                  A: "To educate participants about waste management",
                  B: "To fundraise for EcoSteps",
                  C: "To clean the river area",
                  D: "To provide reusable bottles to participants"
                },
                correct_answer: "C",
                explanation: "Mục đích chính của sự kiện là dọn sạch rác tại khu vực sông ('annual river cleanup event')."
              },
              {
                id: "read5_m2_q14",
                type: "multiple_choice",
                prompt: "What item are volunteers advised to bring?",
                options: {
                  A: "Gloves",
                  B: "A water bottle",
                  C: "Trash bags",
                  D: "Cleaning products"
                },
                correct_answer: "B",
                explanation: "Găng tay và túi đựng rác sẽ được cung cấp, tình nguyện viên được khuyên mang theo bình nước cá nhân ('please bring your own reusable water bottle')."
              },
              {
                id: "read5_m2_q15",
                type: "multiple_choice",
                prompt: "What additional benefit of volunteering is mentioned in the text?",
                options: {
                  A: "Building a supportive community",
                  B: "Gaining practical skills in environmental science",
                  C: "Meeting professional environmentalists",
                  D: "Making a visible difference in the community"
                },
                correct_answer: "D",
                explanation: "Thông báo nêu lợi ích thiết thực: 'Help us protect wildlife habitats and make a tangible difference in your community' (tạo nên sự khác biệt hữu hình cho cộng đồng)."
              }
            ]
          }
        },
        {
          id: "read5_m2_t4",
          title: "Task 4: Academic Passage (The Philosophical Underpinnings of Utilitarianism)",
          task_type: "academic_passage",
          content: {
            document_type: "Philosophy & Ethics Passage",
            passage: "Utilitarianism is an ethical theory that posits that the right action is the one that creates the most happiness and the least suffering for the greatest number of people. Philosophers like Jeremy Bentham and John Stuart Mill developed it to give a clear way to make moral decisions: compare the benefits and harms of different actions and choose the one that produces the best overall result.\n\nBentham suggested measuring happiness with a \"hedonic calculus,\" looking at how much pleasure an action brings and how long it lasts. Mill added that some pleasures, like intellectual ones, are better than simple physical pleasures. He argued that it is better to be a dissatisfied human than a satisfied pig. This idea responded to criticism that utilitarianism could justify wrong actions if they created more overall happiness.\n\nDespite being appealing and logical, utilitarianism faces significant challenges. It can be demanding to calculate the effects of every action. It also struggles with justice and rights, as it seems to allow sacrificing an innocent individual if it benefits the majority. These criticisms highlight that focusing only on outcomes can conflict with following moral rules.",
            questions: [
              {
                id: "read5_m2_q16",
                type: "multiple_choice",
                prompt: "What is the main purpose of the text?",
                options: {
                  A: "To argue that happiness is the only moral value.",
                  B: "To prove that Jeremy Bentham's ideas were superior to John Stuart Mill's.",
                  C: "To explain that utilitarianism is always wrong.",
                  D: "To trace the development and outline key criticisms of a philosophical theory."
                },
                correct_answer: "D",
                explanation: "Bài viết phác thảo nguồn gốc phát triển của thuyết vị lợi (Bentham, Mill) đồng thời chỉ ra những chỉ trích, thách thức cơ bản đối với thuyết này."
              },
              {
                id: "read5_m2_q17",
                type: "multiple_choice",
                prompt: "The word \"criticisms\" in paragraph 3 is closest in meaning to:",
                options: {
                  A: "praise",
                  B: "complaints",
                  C: "instructions",
                  D: "rules"
                },
                correct_answer: "B",
                explanation: "'Criticisms' (những lời chỉ trích, phê bình, phàn nàn về hạn chế của thuyết) đồng nghĩa với 'complaints'."
              },
              {
                id: "read5_m2_q18",
                type: "multiple_choice",
                prompt: "According to the passage, what was the key difference between Bentham's and Mill's versions of utilitarianism?",
                options: {
                  A: "Bentham focused on the quantity of pleasure, while Mill emphasized the quality of pleasures.",
                  B: "Mill rejected the idea of increasing happiness.",
                  C: "Mill focused only on physical pleasures.",
                  D: "Bentham believed only humans deserved moral consideration, while Mill included animals."
                },
                correct_answer: "A",
                explanation: "Bentham tập trung vào lượng khoái lạc qua 'hedonic calculus', trong khi Mill bổ sung yếu tố phẩm chất/chất lượng của khoái lạc (khoái lạc trí tuệ cao quý hơn khoái lạc thể xác đơn thuần)."
              },
              {
                id: "read5_m2_q19",
                type: "multiple_choice",
                prompt: "Why does the author mention the \"sacrificing of an innocent individual\"?",
                options: {
                  A: "To provide an example of a utilitarian successful decision.",
                  B: "To illustrate a potential problem with utilitarianism.",
                  C: "To demonstrate how utilitarianism protects individual rights.",
                  D: "To show that this scenario never happens in real life."
                },
                correct_answer: "B",
                explanation: "Tác giả dẫn ví dụ hy sinh người vô tội để minh họa cho lỗ hổng nghiêm trọng của thuyết vị lợi khi chỉ nhìn vào kết quả tổng thể mà bỏ qua công lý và quyền cơ bản của cá nhân."
              },
              {
                id: "read5_m2_q20",
                type: "multiple_choice",
                prompt: "What can be inferred about utilitarianism from the text?",
                options: {
                  A: "It is the easiest ethical theory to apply in daily life.",
                  B: "It was developed without any consideration for human happiness.",
                  C: "It may conflict with fairness or moral rules.",
                  D: "It is too concerned with individual rights and freedoms."
                },
                correct_answer: "C",
                explanation: "Câu cuối cùng của bài đọc kết luận: việc chỉ chăm chú vào kết quả có thể xung đột trực tiếp với các nguyên tắc đạo đức và sự công bằng ('conflict with following moral rules')."
              }
            ]
          }
        }
      ]
    }
  ]
};

// =================================================================
// 1.6 - 1.9 READING PRACTICE TESTS 06 - 09 (TOEFL 2026 OFFICIAL YOUTUBE)
// =================================================================

export const readingTest06 = {
  "id": "reading-practice-06",
  "title": "Reading Practice Test 06 (TOEFL 2026 - Migration & Green Revolution)",
  "skill": "reading",
  "is_default": true,
  "duration_seconds": 1800,
  "description": "Bộ đề TOEFL iBT 2026 Multistage Adaptive (YouTube Practice 5): Module 1 (Migration, Parking Policy Update, Coral Reefs, Green Revolution) & Module 2 (Electric Vehicles, GreenWays Travel Blog, Lakeview Admissions, Neuroplasticity).",
  "stages": [
    {
      "id": "read6_stage_1",
      "title": "Reading - Module 1 (Stage 1)",
      "duration_seconds": 900,
      "description": "Module 1 gồm 4 phần (20 câu hỏi). Hãy hoàn thành trước khi hết 15 phút.",
      "tasks": [
        {
          "id": "read6_m1_t1",
          "title": "Task 1: Complete the Words (Đoạn 1 - Migration)",
          "task_type": "complete_words",
          "content": {
            "instructions": "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn sau:",
            "paragraph": "Migration is a natural phenomenon observed throughout history in both humans and animals. People mo[ve] in sea[rch] of be[tter] opportunities, saf[ety], or climate cond[itions]. Similarly, ani[mals] migrate seaso[nally] to fi[nd] food or bree[ding] grounds. Wh[ile] migration promotes cultural exchange and genetic diversity, it can also cause social and political challenges. Understanding migration patterns helps societies develop fair policies and encourages cooperation between nations to manage movement responsibly.",
            "blanks": [
              {
                "id": "read6_m1_t1_b1",
                "prefix": "mo",
                "missing": "ve",
                "full": "move"
              },
              {
                "id": "read6_m1_t1_b2",
                "prefix": "sea",
                "missing": "rch",
                "full": "search"
              },
              {
                "id": "read6_m1_t1_b3",
                "prefix": "be",
                "missing": "tter",
                "full": "better"
              },
              {
                "id": "read6_m1_t1_b4",
                "prefix": "saf",
                "missing": "ety",
                "full": "safety"
              },
              {
                "id": "read6_m1_t1_b5",
                "prefix": "cond",
                "missing": "itions",
                "full": "conditions"
              },
              {
                "id": "read6_m1_t1_b6",
                "prefix": "ani",
                "missing": "mals",
                "full": "animals"
              },
              {
                "id": "read6_m1_t1_b7",
                "prefix": "seaso",
                "missing": "nally",
                "full": "seasonally"
              },
              {
                "id": "read6_m1_t1_b8",
                "prefix": "fi",
                "missing": "nd",
                "full": "find"
              },
              {
                "id": "read6_m1_t1_b9",
                "prefix": "bree",
                "missing": "ding",
                "full": "breeding"
              },
              {
                "id": "read6_m1_t1_b10",
                "prefix": "Wh",
                "missing": "ile",
                "full": "While"
              }
            ]
          }
        },
        {
          "id": "read6_m1_t2",
          "title": "Task 2: Read a Notice (Important: Parking Policy Update)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Notice",
            "passage": "Important: Parking Policy Update\n\nStarting next Monday, all employees must display a new parking permit on their vehicle dashboards. Old permits will no longer be valid. You can pick up your new permit from the Facilities Office before Friday. Vehicles without valid permits may be ticketed or towed.",
            "questions": [
              {
                "id": "read6_m1_q11",
                "type": "multiple_choice",
                "prompt": "What is the purpose of this notice?",
                "options": {
                  "A": "To announce the closure of the parking lot",
                  "B": "To inform employees of a new parking rule",
                  "C": "To advertise available parking spaces",
                  "D": "To remind employees to pay parking fees"
                },
                "correct_answer": "B",
                "explanation": "Thông báo nhắc nhở và thông tin đến nhân viên quy định mới về thẻ đỗ xe mới ('to inform employees of a new parking rule')."
              },
              {
                "id": "read6_m1_q12",
                "type": "multiple_choice",
                "prompt": "What will happen to vehicles without new permits?",
                "options": {
                  "A": "They will lose access to the building",
                  "B": "They will be allowed to park temporarily",
                  "C": "They will be relocated automatically",
                  "D": "They will be fined or removed"
                },
                "correct_answer": "D",
                "explanation": "Thông báo nêu rõ: 'Vehicles without valid permits may be ticketed or towed' (bị phạt vé hoặc bị cẩu xe đi)."
              }
            ]
          }
        },
        {
          "id": "read6_m1_t3",
          "title": "Task 3: Read a Short Article (Coral Reefs)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Short Article",
            "passage": "Many people associate coral reefs with tropical beauty, but few realize their vital ecological role. Reefs provide food and shelter for about 25% of all marine species, despite covering less than 1% of the ocean floor. Unfortunately, climate change and pollution are causing widespread coral bleaching. Scientists are now experimenting with coral \"gardening,\" where healthy fragments are grown and transplanted to restore damaged reefs.",
            "questions": [
              {
                "id": "read6_m1_q13",
                "type": "multiple_choice",
                "prompt": "What is the main purpose of this article?",
                "options": {
                  "A": "To promote tourism in tropical regions",
                  "B": "To compare coral reefs and forests",
                  "C": "To explain how coral forms naturally",
                  "D": "To describe the importance and threats to coral reefs"
                },
                "correct_answer": "D",
                "explanation": "Bài viết nêu rõ vai trò sinh thái quan trọng của rạn san hô cùng các hiểm họa (biến đổi khí hậu, ô nhiễm) đang đe dọa chúng."
              },
              {
                "id": "read6_m1_q14",
                "type": "multiple_choice",
                "prompt": "What does \"coral gardening\" involve?",
                "options": {
                  "A": "Cleaning coral with special equipment",
                  "B": "Building artificial reefs from plastic",
                  "C": "Growing coral in controlled environments and replanting it",
                  "D": "Monitoring coral growth from satellites"
                },
                "correct_answer": "C",
                "explanation": "Đoạn văn nêu rõ: 'where healthy fragments are grown and transplanted to restore damaged reefs'."
              },
              {
                "id": "read6_m1_q15",
                "type": "multiple_choice",
                "prompt": "What can be inferred about the future of coral reefs?",
                "options": {
                  "A": "They will recover naturally without human intervention.",
                  "B": "Restoration efforts may help reefs, but the main threats still need to be addressed.",
                  "C": "Coral reefs will disappear completely within a decade.",
                  "D": "Tourism is the main cause of coral reef destruction."
                },
                "correct_answer": "B",
                "explanation": "Các nỗ lực phục hồi (coral gardening) có ích nhưng hiểm họa cốt lõi (biến đổi khí hậu, ô nhiễm) vẫn cần được giải quyết triệt để."
              }
            ]
          }
        },
        {
          "id": "read6_m1_t4",
          "title": "Task 4: Academic Passage (The Complex Legacy of the Green Revolution)",
          "task_type": "academic_passage",
          "content": {
            "document_type": "Agriculture & History Passage",
            "passage": "The Green Revolution, a period of technological transfer initiatives from the 1940s to the late 1970s, dramatically increased agricultural production worldwide, particularly in the developing world. It centered on the development of high-yielding varieties of cereal grains, expansion of irrigation infrastructure, and the widespread distribution of synthetic fertilizers and pesticides.\n\nPioneers like Norman Borlaug are credited with saving over a billion people from starvation by introducing dwarf wheat varieties that allocated more energy to grain production. However, the revolution's legacy is deeply nuanced. The intensification of agriculture came with significant environmental costs, including soil degradation, water table depletion, and pollution from agrochemicals.\n\nFurthermore, the technological package was often most accessible to wealthier landowners, exacerbating socioeconomic disparities and consolidating land ownership. The focus on monocultures also reduced agricultural biodiversity, increasing vulnerability to pests and diseases.\n\nConsequently, while the Green Revolution stands as a monumental achievement in confronting Malthusian predictions of famine, it also serves as a cautionary tale about the unintended consequences of technological fixes, highlighting the need for sustainable approaches that balance productivity with ecological health and social equity.",
            "questions": [
              {
                "id": "read6_m1_q16",
                "type": "multiple_choice",
                "prompt": "What is the main point of the passage?",
                "options": {
                  "A": "The Green Revolution was an unqualified success that permanently solved world hunger.",
                  "B": "The Green Revolution had significant benefits but also serious negative consequences.",
                  "C": "Norman Borlaug's work was ultimately harmful to the environment.",
                  "D": "The technological innovations of the Green Revolution were only accessible to wealthy individuals."
                },
                "correct_answer": "B",
                "explanation": "Ý chính của bài là Cách mạng Xanh mang lại năng suất lương thực to lớn nhưng đi kèm nhiều hệ lụy tiêu cực về môi trường và xã hội."
              },
              {
                "id": "read6_m1_q17",
                "type": "multiple_choice",
                "prompt": "The word \"nuanced\" in the passage is closest in meaning to",
                "options": {
                  "A": "straightforward.",
                  "B": "positive.",
                  "C": "subtle and complex.",
                  "D": "negligible and forgotten."
                },
                "correct_answer": "C",
                "explanation": "'nuanced' có nghĩa là tinh tế, phức tạp nhiều khía cạnh ('subtle and complex')."
              },
              {
                "id": "read6_m1_q18",
                "type": "multiple_choice",
                "prompt": "According to the passage, one of the environmental costs of the Green Revolution was",
                "options": {
                  "A": "an increase in agricultural biodiversity.",
                  "B": "the consolidation of land ownership among the poor.",
                  "C": "the exhaustion of water resources.",
                  "D": "a decrease in the use of synthetic chemicals."
                },
                "correct_answer": "C",
                "explanation": "Đoạn 2 nêu rõ chi phí môi trường: 'water table depletion' (suy kiệt tầng nước ngầm / exhaustion of water resources)."
              },
              {
                "id": "read6_m1_q19",
                "type": "multiple_choice",
                "prompt": "The author mentions \"socioeconomic disparities\" in order to",
                "options": {
                  "A": "highlight a social problem that was worsened by the Green Revolution's implementation.",
                  "B": "argue that the Green Revolution successfully reduced poverty.",
                  "C": "suggest that environmental costs were more important than social ones.",
                  "D": "show that the revolution benefited only the poorest farmers."
                },
                "correct_answer": "A",
                "explanation": "Tác giả đề cập đến sự chênh lệch kinh tế xã hội để làm nổi bật vấn đề xã hội bị trầm trọng hóa do gói công nghệ ưu tiên người giàu."
              },
              {
                "id": "read6_m1_q20",
                "type": "multiple_choice",
                "prompt": "Why does the author refer to the Green Revolution as a \"cautionary tale\"?",
                "options": {
                  "A": "It demonstrates that increasing food production is impossible.",
                  "B": "It shows that technological solutions can create new problems even as they solve old ones.",
                  "C": "It proves that Malthusian predictions were correct.",
                  "D": "It suggests that sustainable agriculture is not a worthwhile goal."
                },
                "correct_answer": "B",
                "explanation": "'Cautionary tale' (bài học cảnh tỉnh) vì các giải pháp công nghệ có thể tạo ra hệ lụy mới ngoài ý muốn dù giải quyết được vấn đề cũ."
              }
            ]
          }
        }
      ]
    },
    {
      "id": "read6_stage_2",
      "title": "Reading - Module 2 (Stage 2 - Adaptive)",
      "duration_seconds": 900,
      "description": "Module 2 thích ứng gồm 4 phần (20 câu hỏi). Hãy hoàn thành trước khi hết 15 phút.",
      "tasks": [
        {
          "id": "read6_m2_t1",
          "title": "Task 1: Complete the Words (Đoạn 1 - Electric Vehicles)",
          "task_type": "complete_words",
          "content": {
            "instructions": "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn sau:",
            "paragraph": "Electric vehicles are becoming more popular as technology advances and environmental awareness grows. Unlike trad[itional] cars, th[ey] run o[n] electricity ra[ther] than gasol[ine], reducing green[house] gas emi[ssions]. Although t[he] initial co[st] can be hig[her], maintenance expenses are lower because electric engines have fewer moving parts. Governments around the world offer incentives to encourage their use. As charging infrastructure expands, electric vehicles are expected to play a major role in reducing pollution.",
            "blanks": [
              {
                "id": "read6_m2_t1_b1",
                "prefix": "trad",
                "missing": "itional",
                "full": "traditional"
              },
              {
                "id": "read6_m2_t1_b2",
                "prefix": "th",
                "missing": "ey",
                "full": "they"
              },
              {
                "id": "read6_m2_t1_b3",
                "prefix": "o",
                "missing": "n",
                "full": "on"
              },
              {
                "id": "read6_m2_t1_b4",
                "prefix": "ra",
                "missing": "ther",
                "full": "rather"
              },
              {
                "id": "read6_m2_t1_b5",
                "prefix": "gasol",
                "missing": "ine",
                "full": "gasoline"
              },
              {
                "id": "read6_m2_t1_b6",
                "prefix": "green",
                "missing": "house",
                "full": "greenhouse"
              },
              {
                "id": "read6_m2_t1_b7",
                "prefix": "emi",
                "missing": "ssions",
                "full": "emissions"
              },
              {
                "id": "read6_m2_t1_b8",
                "prefix": "t",
                "missing": "he",
                "full": "the"
              },
              {
                "id": "read6_m2_t1_b9",
                "prefix": "co",
                "missing": "st",
                "full": "cost"
              },
              {
                "id": "read6_m2_t1_b10",
                "prefix": "hig",
                "missing": "her",
                "full": "higher"
              }
            ]
          }
        },
        {
          "id": "read6_m2_t2",
          "title": "Task 2: Read an Online Post (GreenWays Travel Blog)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Blog Post",
            "passage": "GreenWays Travel Blog\n\nPlanning your next eco-friendly adventure? Choose destinations that prioritize sustainability, even if they require more research to find. Many accommodations now reduce their carbon footprint through renewable energy and by offering meals prepared with ingredients from nearby farms. When exploring natural areas, remain on established routes to avoid disturbing sensitive habitats. Ultimately, mindful travel not only lessens environmental impact but also deepens your connection to the places you visit.",
            "questions": [
              {
                "id": "read6_m2_q11",
                "type": "multiple_choice",
                "prompt": "What is the main purpose of the post?",
                "options": {
                  "A": "To encourage readers to adopt sustainable travel practices",
                  "B": "To persuade travelers to avoid popular destinations",
                  "C": "To promote energy-efficient hotels exclusively",
                  "D": "To highlight the dangers of exploring unfamiliar landscapes"
                },
                "correct_answer": "A",
                "explanation": "Mục đích chính của bài đăng là khuyến khích du khách thực hiện các thói quen du lịch bền vững và thân thiện môi trường."
              },
              {
                "id": "read6_m2_q12",
                "type": "multiple_choice",
                "prompt": "According to the post, what is one recommended practice for responsible travel?",
                "options": {
                  "A": "Choosing routes freely to discover untouched nature",
                  "B": "Avoiding locally sourced food to reduce spending",
                  "C": "Staying on official paths when exploring natural areas",
                  "D": "Relying on private vehicles for greater convenience"
                },
                "correct_answer": "C",
                "explanation": "Bài viết khuyến nghị: 'remain on established routes to avoid disturbing sensitive habitats' (đi theo tuyến đường định sẵn)."
              }
            ]
          }
        },
        {
          "id": "read6_m2_t3",
          "title": "Task 3: Read an Email (Your Interview Schedule)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Email Notice",
            "passage": "From: admissions@lakeviewcollege.edu\nSubject: Your Interview Schedule\n\nDear Applicant,\n\nThank you for your interest in Lakeview College. Your admissions interview has been scheduled for Thursday, June 14, at 10:00 a.m. in Room 212 of the Main Building. Please arrive 15 minutes early and bring a copy of your ID and your application confirmation email.\n\nIf you need to make any changes to the appointment, please respond to this message no later than Tuesday.\n\nBest regards,\nAdmissions Office",
            "questions": [
              {
                "id": "read6_m2_q13",
                "type": "multiple_choice",
                "prompt": "What is the main purpose of this email?",
                "options": {
                  "A": "To remind the applicant about documents needed after enrollment",
                  "B": "To confirm details of an upcoming interview",
                  "C": "To provide instructions for submitting a new application",
                  "D": "To inform the applicant that their interview has been cancelled"
                },
                "correct_answer": "B",
                "explanation": "Email gửi để xác nhận thời gian, địa điểm cụ thể của buổi phỏng vấn tuyển sinh ('Your admissions interview has been scheduled...')."
              },
              {
                "id": "read6_m2_q14",
                "type": "multiple_choice",
                "prompt": "What should the applicant do if they cannot attend the interview?",
                "options": {
                  "A": "Fill out a rescheduling form on the college website",
                  "B": "Call the main office on Thursday",
                  "C": "Reply to the email before Tuesday",
                  "D": "Arrive earlier than the scheduled time"
                },
                "correct_answer": "C",
                "explanation": "Email dặn dò: 'If you need to make any changes... please respond to this message no later than Tuesday'."
              },
              {
                "id": "read6_m2_q15",
                "type": "multiple_choice",
                "prompt": "Which of the following is explicitly required on the day of the interview?",
                "options": {
                  "A": "A printed copy of the applicant's academic transcripts",
                  "B": "A valid ID and the application confirmation email",
                  "C": "A letter of recommendation",
                  "D": "Proof of payment for the application fee"
                },
                "correct_answer": "B",
                "explanation": "Đoạn văn yêu cầu rõ: 'bring a copy of your ID and your application confirmation email'."
              }
            ]
          }
        },
        {
          "id": "read6_m2_t4",
          "title": "Task 4: Academic Passage (Neuroplasticity: Rewiring the Adult Brain)",
          "task_type": "academic_passage",
          "content": {
            "document_type": "Neuroscience Passage",
            "passage": "For much of the 20th century, a central dogma of neuroscience held that the adult brain was largely static and immutable, incapable of generating new neurons or fundamentally changing its structure after childhood. This doctrine has been completely overturned by the discovery of neuroplasticity — the brain's lifelong capacity to reorganize itself by forming new neural connections.\n\nThis plasticity manifests in several ways. Synaptic plasticity allows the strength of connections between neurons to change with experience, a process underlying learning and memory. Cortical remapping can occur on a larger scale; for instance, if a limb is amputated, the brain region that processed sensory input from that limb may be recruited for other functions. Even neurogenesis, the birth of new neurons, occurs in certain adult brain regions.\n\nThis dynamic nature is driven by experience and learning; complex activities like playing a musical instrument or learning a language can physically alter brain structure. The implications are profound, offering hope for recovery from stroke and brain injury through rehabilitative training that encourages the brain to rewire itself. It also suggests that cognitive decline in aging is not an inevitable, linear process but can be mitigated through continued mental engagement.",
            "questions": [
              {
                "id": "read6_m2_q16",
                "type": "multiple_choice",
                "prompt": "The passage primarily aims to",
                "options": {
                  "A": "describe the outdated belief that the brain is unchangeable.",
                  "B": "explain the concept of neuroplasticity and its significant implications.",
                  "C": "argue that brain injury recovery is impossible.",
                  "D": "detail the specific biochemical process of neurogenesis."
                },
                "correct_answer": "B",
                "explanation": "Bài đọc giải thích khái niệm tính dẻo của não bộ (neuroplasticity) và các ý nghĩa sâu sắc của nó trong phục hồi và học tập."
              },
              {
                "id": "read6_m2_q17",
                "type": "multiple_choice",
                "prompt": "The word \"immutable\" in the passage is closest in meaning to",
                "options": {
                  "A": "changeable.",
                  "B": "intelligent.",
                  "C": "unchangeable.",
                  "D": "complex."
                },
                "correct_answer": "C",
                "explanation": "'immutable' nghĩa là bất biến, không thể thay đổi ('unchangeable')."
              },
              {
                "id": "read6_m2_q18",
                "type": "multiple_choice",
                "prompt": "According to the passage, what is \"cortical remapping\"?",
                "options": {
                  "A": "The process of learning a new fact.",
                  "B": "The death of neurons due to aging.",
                  "C": "The large-scale reassignment of a brain area to a new function.",
                  "D": "The creation of new neurons in the hippocampus."
                },
                "correct_answer": "C",
                "explanation": "'Cortical remapping' là sự tái cấu trúc/phân công lại trên quy mô lớn của một vùng não sang chức năng mới (như ví dụ sau khi bị cắt cụt chi)."
              },
              {
                "id": "read6_m2_q19",
                "type": "multiple_choice",
                "prompt": "The author mentions \"playing a musical instrument\" to provide an example of an activity that",
                "options": {
                  "A": "can lead to physical changes in the brain's structure.",
                  "B": "is only effective for brain development in children.",
                  "C": "has no impact on synaptic plasticity.",
                  "D": "is the best way to recover from a stroke."
                },
                "correct_answer": "A",
                "explanation": "Tác giả nêu ví dụ chơi nhạc cụ hoặc học ngôn ngữ để minh họa hoạt động có thể làm thay đổi trực tiếp cấu trúc vật lý của não bộ."
              },
              {
                "id": "read6_m2_q20",
                "type": "multiple_choice",
                "prompt": "What is a key implication of neuroplasticity mentioned in the passage?",
                "options": {
                  "A": "The brain's structure is fixed by the age of 18.",
                  "B": "Cognitive decline in old age is an inevitable, linear process.",
                  "C": "Rehabilitation can help the brain recover lost functions after injury.",
                  "D": "Learning is solely a chemical process with no physical correlates."
                },
                "correct_answer": "C",
                "explanation": "Ý nghĩa then chốt là huấn luyện phục hồi chức năng có thể giúp não bộ tự tái kết nối dây thần kinh để hồi phục sau chấn thương."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const readingTest07 = {
  "id": "reading-practice-07",
  "title": "Reading Practice Test 07 (TOEFL 2026 - Flow & Freud's Superego - HARD M2)",
  "skill": "reading",
  "is_default": true,
  "duration_seconds": 1800,
  "description": "Bộ đề TOEFL iBT 2026 Multistage Adaptive (YouTube Practice 6 - HARD Module 2 C1): Module 1 (Bioluminescence, SmartPrint Maintenance, Online Education, State of Flow) & Module 2 (Papermaking, NASA Perseverance, Community Clean-Up, Freud's Superego).",
  "stages": [
    {
      "id": "read7_stage_1",
      "title": "Reading - Module 1 (Stage 1)",
      "duration_seconds": 900,
      "description": "Module 1 gồm 4 phần (20 câu hỏi). Hãy hoàn thành trước khi hết 15 phút.",
      "tasks": [
        {
          "id": "read7_m1_t1",
          "title": "Task 1: Complete the Words (Đoạn 1 - Bioluminescence)",
          "task_type": "complete_words",
          "content": {
            "instructions": "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn sau:",
            "paragraph": "Bioluminescence is the natural production of light by living organisms, found in species ranging from deep-sea fish to certain fungi. This li[ght] is cre[ated] through chemi[cal] reactions th[at] involve ox[ygen] and a molec[ule] called luciferin. Organ[isms] use biolumine[scence] for vari[ous] purposes, s[uch] as communication, camouflage, and attracting prey. In recent years, scientists have studied these organisms to develop new technologies, including medical imaging techniques. However, many bioluminescent species live in fragile ecosystems threatened by pollution and climate change, making conservation efforts essential.",
            "blanks": [
              {
                "id": "read7_m1_t1_b1",
                "prefix": "li",
                "missing": "ght",
                "full": "light"
              },
              {
                "id": "read7_m1_t1_b2",
                "prefix": "cre",
                "missing": "ated",
                "full": "created"
              },
              {
                "id": "read7_m1_t1_b3",
                "prefix": "chemi",
                "missing": "cal",
                "full": "chemical"
              },
              {
                "id": "read7_m1_t1_b4",
                "prefix": "th",
                "missing": "at",
                "full": "that"
              },
              {
                "id": "read7_m1_t1_b5",
                "prefix": "ox",
                "missing": "ygen",
                "full": "oxygen"
              },
              {
                "id": "read7_m1_t1_b6",
                "prefix": "molec",
                "missing": "ule",
                "full": "molecule"
              },
              {
                "id": "read7_m1_t1_b7",
                "prefix": "Organ",
                "missing": "isms",
                "full": "Organisms"
              },
              {
                "id": "read7_m1_t1_b8",
                "prefix": "biolumine",
                "missing": "scence",
                "full": "bioluminescence"
              },
              {
                "id": "read7_m1_t1_b9",
                "prefix": "vari",
                "missing": "ous",
                "full": "various"
              },
              {
                "id": "read7_m1_t1_b10",
                "prefix": "s",
                "missing": "uch",
                "full": "such"
              }
            ]
          }
        },
        {
          "id": "read7_m1_t2",
          "title": "Task 2: Read an Email (SmartPrint Maintenance Requirement)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Customer Service Email",
            "passage": "From: techsupport@smartprint.com\nSubject: Scheduled Maintenance Requirement\n\nDear Customer,\n\nAccording to our records, your SmartPrint 2500 printer is approaching its annual maintenance deadline. Routine servicing is essential to maintain optimal performance, reduce the likelihood of technical issues, and ensure consistent print quality.\n\nTo remain compliant with warranty conditions, please arrange maintenance through the SmartPrint app or by contacting our support line at 555-2345. Failure to complete the recommended service within the specified period may affect your warranty coverage.\n\nSincerely,\nSmartPrint Support Team",
            "questions": [
              {
                "id": "read7_m1_q11",
                "type": "multiple_choice",
                "prompt": "What is the primary purpose of this email?",
                "options": {
                  "A": "To warn customers that their printer is no longer functional",
                  "B": "To encourage customers to upgrade to a newer printer model",
                  "C": "To inform customers of a required maintenance procedure",
                  "D": "To announce changes to customer support services"
                },
                "correct_answer": "C",
                "explanation": "Mục đích chính của email là thông báo cho khách hàng về thủ tục bảo trì định kỳ bắt buộc ('inform customers of a required maintenance procedure')."
              },
              {
                "id": "read7_m1_q12",
                "type": "multiple_choice",
                "prompt": "What is implied if the customer does not follow the instructions in the email?",
                "options": {
                  "A": "The printer will immediately stop working",
                  "B": "Technical support will no longer be available",
                  "C": "The customer may lose warranty protection",
                  "D": "The company will charge an additional maintenance fee"
                },
                "correct_answer": "C",
                "explanation": "Email cảnh báo rõ: 'Failure to complete the recommended service... may affect your warranty coverage' (có thể mất quyền lợi bảo hành)."
              }
            ]
          }
        },
        {
          "id": "read7_m1_t3",
          "title": "Task 3: Read a Short Article (Online Education Platforms)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Short Article",
            "passage": "Online education platforms have significantly reshaped modern learning by offering flexible schedules and a wide variety of courses accessible from almost anywhere. This model allows learners to progress at their own pace and balance education with other responsibilities. However, the absence of fixed class times and direct supervision means that students must take greater responsibility for managing their learning. Research and experience suggest that individuals who establish clear goals and consistent study routines are more likely to succeed than those who rely solely on motivation.",
            "questions": [
              {
                "id": "read7_m1_q13",
                "type": "multiple_choice",
                "prompt": "What benefit of online education does the passage emphasize most strongly?",
                "options": {
                  "A": "Constant guidance from instructors",
                  "B": "Greater flexibility and accessibility",
                  "C": "Reduced academic workload",
                  "D": "Having a balanced life"
                },
                "correct_answer": "B",
                "explanation": "Lợi ích được nhấn mạnh nhất là tính linh hoạt và khả năng tiếp cận ('flexible schedules and a wide variety of courses accessible from almost anywhere')."
              },
              {
                "id": "read7_m1_q14",
                "type": "multiple_choice",
                "prompt": "According to the passage, why do some students perform better in online courses than others?",
                "options": {
                  "A": "They are more motivated",
                  "B": "They have stronger technical skills",
                  "C": "They apply effective self-management strategies",
                  "D": "They spend more time watching lectures"
                },
                "correct_answer": "C",
                "explanation": "Học viên thành công hơn là những người có chiến lược tự quản lý hiệu quả ('establish clear goals and consistent study routines')."
              },
              {
                "id": "read7_m1_q15",
                "type": "multiple_choice",
                "prompt": "What can be inferred about students who struggle with online learning environments?",
                "options": {
                  "A": "They lack interest in education altogether",
                  "B": "They may depend too heavily on external structure",
                  "C": "They prefer learning in isolation",
                  "D": "They are unwilling to set academic goals"
                },
                "correct_answer": "B",
                "explanation": "Những sinh viên gặp khó khăn thường phụ thuộc quá nhiều vào kỷ luật ngoại cảnh hoặc thời khóa biểu cố định sẵn có."
              }
            ]
          }
        },
        {
          "id": "read7_m1_t4",
          "title": "Task 4: Academic Passage (The Psychological Phenomenon of Flow)",
          "task_type": "academic_passage",
          "content": {
            "document_type": "Psychology Passage",
            "passage": "The concept of \"flow,\" a term coined by psychologist Mihaly Csikszentmihalyi, describes a state of intense, focused concentration on a present activity to the point of becoming fully absorbed and losing a sense of time and self. This optimal experience is characterized by a perfect balance between the perceived challenges of a task and one's perceived skills; the activity must be sufficiently difficult to avoid boredom but not so difficult as to cause anxiety.\n\nIn this state, action and awareness merge, self-consciousness disappears, and the individual exercises a sense of personal control over the situation. Common examples include artists lost in their work, athletes in \"the zone,\" or programmers deeply engaged in solving a complex problem.\n\nFlow is not merely a pleasurable state; it is linked to enhanced performance, creativity, and long-term personal growth. Achieving flow consistently is considered a cornerstone of a fulfilling life. However, it requires clear goals, immediate feedback, and an environment with few distractions. In an age of constant digital interruption, the ability to cultivate deep work and enter a flow state is becoming both more challenging and more valuable, representing a key differentiator in high-level cognitive and creative achievements.",
            "questions": [
              {
                "id": "read7_m1_q16",
                "type": "multiple_choice",
                "prompt": "Which of the following best states the main idea of the passage?",
                "options": {
                  "A": "Flow is a rare state that only a few people can ever achieve",
                  "B": "Mihaly Csikszentmihalyi discovered that flow is identical to relaxation",
                  "C": "The primary requirement for flow is a task that is extremely easy",
                  "D": "Flow is a state of deep absorption that enhances performance and fulfillment"
                },
                "correct_answer": "D",
                "explanation": "Ý chính của bài: Flow (dòng chảy tâm trí) là trạng thái tập trung sâu sắc giúp nâng cao hiệu suất và mang lại cảm giác thỏa mãn trong cuộc sống."
              },
              {
                "id": "read7_m1_q17",
                "type": "multiple_choice",
                "prompt": "The word \"optimal\" in the passage is closest in meaning to",
                "options": {
                  "A": "optional",
                  "B": "first",
                  "C": "best",
                  "D": "easiest"
                },
                "correct_answer": "C",
                "explanation": "'optimal' nghĩa là tối ưu, tốt nhất ('best')."
              },
              {
                "id": "read7_m1_q18",
                "type": "multiple_choice",
                "prompt": "According to the passage, what is necessary for a flow state to occur?",
                "options": {
                  "A": "A perfect match between the challenge of a task and one's skill level",
                  "B": "A task that is far beyond one's current abilities",
                  "C": "A high degree of self-consciousness and awareness of time",
                  "D": "A distracting environment to provide stimulation"
                },
                "correct_answer": "A",
                "explanation": "Bài đọc nêu rõ điều kiện cốt lõi: 'a perfect balance between the perceived challenges of a task and one's perceived skills'."
              },
              {
                "id": "read7_m1_q19",
                "type": "multiple_choice",
                "prompt": "The author mentions \"an age of constant digital interruption\" primarily to",
                "options": {
                  "A": "suggest that flow states are now impossible to achieve",
                  "B": "highlight a modern obstacle to achieving deep concentration",
                  "C": "argue that digital tools are the best way to achieve flow",
                  "D": "suggest that people in the past had easier lives"
                },
                "correct_answer": "B",
                "explanation": "Cụm từ này nhằm làm nổi bật trở ngại lớn của thời hiện đại (sự gián đoạn từ thiết bị số) đối với khả năng tập trung sâu."
              },
              {
                "id": "read7_m1_q20",
                "type": "multiple_choice",
                "prompt": "What is the relationship between the second and third paragraphs?",
                "options": {
                  "A": "The third paragraph shifts the discussion from descriptive illustration to broader implications and constraints",
                  "B": "The third paragraph challenges the validity of the situations described in the second paragraph",
                  "C": "The third paragraph narrows the focus of the passage to a single professional domain mentioned earlier",
                  "D": "The third paragraph provides a chronological account explaining how the examples in the second paragraph developed"
                },
                "correct_answer": "A",
                "explanation": "Đoạn 2 minh họa ví dụ thực tế (nghệ sĩ, vận động viên), còn đoạn 3 mở rộng sang các ý nghĩa rộng hơn về năng suất và các điều kiện ràng buộc để đạt được flow."
              }
            ]
          }
        }
      ]
    },
    {
      "id": "read7_stage_2",
      "title": "Reading - Module 2 (Stage 2 - HARD C1 Adaptive)",
      "duration_seconds": 900,
      "description": "Module 2 khó (C1) gồm 4 phần (20 câu hỏi). Hãy hoàn thành trước khi hết 15 phút.",
      "tasks": [
        {
          "id": "read7_m2_t1",
          "title": "Task 1: Complete the Words (Đoạn 1 - Ancient Papermaking)",
          "task_type": "complete_words",
          "content": {
            "instructions": "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn sau:",
            "paragraph": "Papermaking originated in ancient China around the second century CE and revolutionized the spread of knowledge. Tradition[ally], fibers f[rom] plants s[uch] as mulberry bark we[re] soaked, mash[ed], and pressed in[to] thin shee[ts]. As the techn[ique] spread ac[ross] continents, it contrib[uted] to the growth of literacy, education, and record-keeping. The Industrial Revolution introduced mechanized production, greatly increasing output and reducing costs. Today, digital media has reduced paper consumption in some areas, yet papermaking remains important for packaging, publishing, and cultural preservation.",
            "blanks": [
              {
                "id": "read7_m2_t1_b1",
                "prefix": "Tradition",
                "missing": "ally",
                "full": "Traditionally"
              },
              {
                "id": "read7_m2_t1_b2",
                "prefix": "f",
                "missing": "rom",
                "full": "from"
              },
              {
                "id": "read7_m2_t1_b3",
                "prefix": "s",
                "missing": "uch",
                "full": "such"
              },
              {
                "id": "read7_m2_t1_b4",
                "prefix": "we",
                "missing": "re",
                "full": "were"
              },
              {
                "id": "read7_m2_t1_b5",
                "prefix": "mash",
                "missing": "ed",
                "full": "mashed"
              },
              {
                "id": "read7_m2_t1_b6",
                "prefix": "in",
                "missing": "to",
                "full": "into"
              },
              {
                "id": "read7_m2_t1_b7",
                "prefix": "shee",
                "missing": "ts",
                "full": "sheets"
              },
              {
                "id": "read7_m2_t1_b8",
                "prefix": "techn",
                "missing": "ique",
                "full": "technique"
              },
              {
                "id": "read7_m2_t1_b9",
                "prefix": "ac",
                "missing": "ross",
                "full": "across"
              },
              {
                "id": "read7_m2_t1_b10",
                "prefix": "contrib",
                "missing": "uted",
                "full": "contributed"
              }
            ]
          }
        },
        {
          "id": "read7_m2_t2",
          "title": "Task 2: Read a Short Article (NASA's Perseverance Rover)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Short Science Article",
            "passage": "NASA's Perseverance rover has recently cached geological samples that scientists believe may preserve chemical signatures of ancient microbial activity. These materials are intended to be transported to Earth as part of a future sample-return mission, allowing researchers to apply analytical techniques that are currently impossible to conduct on Mars. Beyond the question of past life, the mission is expected to deepen scientific understanding of Mars's early climate and its potential parallels with primordial Earth.",
            "questions": [
              {
                "id": "read7_m2_q11",
                "type": "multiple_choice",
                "prompt": "What is the primary aim of the article?",
                "options": {
                  "A": "To confirm that microbial life once existed on Mars",
                  "B": "To explain the technological limitations of conducting research on Mars",
                  "C": "To report on a mission milestone and its broader scientific significance",
                  "D": "To argue that Mars and Earth followed identical evolutionary paths"
                },
                "correct_answer": "C",
                "explanation": "Mục tiêu chính của bài viết là tường thuật cột mốc lấy mẫu của robot tự hành Perseverance và ý nghĩa khoa học sâu rộng của nó."
              },
              {
                "id": "read7_m2_q12",
                "type": "multiple_choice",
                "prompt": "Why are the samples planned to be returned to Earth?",
                "options": {
                  "A": "Because the rover lacks the capability to preserve them on Mars",
                  "B": "Because Earth-based laboratories allow for more advanced analysis",
                  "C": "Because NASA intends to display them for public education",
                  "D": "Because Mars's environment may contaminate the samples over time"
                },
                "correct_answer": "B",
                "explanation": "Đoạn văn nêu rõ mang mẫu về Trái Đất giúp áp dụng các kỹ thuật phân tích hiện đại mà hiện không thể tiến hành trên Sao Hỏa ('analytical techniques that are currently impossible to conduct on Mars')."
              }
            ]
          }
        },
        {
          "id": "read7_m2_t3",
          "title": "Task 3: Read a Social Media Post (Community Clean-Up Day)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Social Media Announcement",
            "passage": "A huge thank you to everyone who took part in yesterday's Community Clean-Up Day! With collective effort and remarkable energy, volunteers removed more than 500 kilograms of waste from our parks and shoreline. Initiatives like this show what sustained community involvement can achieve. We're already preparing for our next event on June 10 — more information to follow soon.",
            "questions": [
              {
                "id": "read7_m2_q13",
                "type": "multiple_choice",
                "prompt": "What is the main communicative purpose of this post?",
                "options": {
                  "A": "To evaluate the long-term impact of environmental activism",
                  "B": "To express appreciation while encouraging continued participation",
                  "C": "To criticize the authorities responsible for waste management",
                  "D": "To announce a similar future event"
                },
                "correct_answer": "B",
                "explanation": "Mục đích chính là bày tỏ lòng biết ơn tới tình nguyện viên và khuyến khích mọi người tiếp tục tham gia trong tương lai."
              },
              {
                "id": "read7_m2_q14",
                "type": "multiple_choice",
                "prompt": "What can reasonably be inferred about the group behind the post?",
                "options": {
                  "A": "It operates primarily as a governmental environmental agency",
                  "B": "It focuses exclusively on short-term volunteer actions",
                  "C": "It engages in recurring community-based environmental initiatives",
                  "D": "It was established specifically for this single clean-up effort"
                },
                "correct_answer": "C",
                "explanation": "Nhóm tổ chức này thực hiện các hoạt động môi trường định kỳ tại cộng đồng ('We're already preparing for our next event on June 10')."
              },
              {
                "id": "read7_m2_q15",
                "type": "multiple_choice",
                "prompt": "What does the post suggest about the upcoming event on June 10?",
                "options": {
                  "A": "Its objectives differ significantly from the previous clean-up",
                  "B": "Its organization is already complete and finalized",
                  "C": "Some logistical details are still being arranged",
                  "D": "Participation will be limited to returning volunteers"
                },
                "correct_answer": "C",
                "explanation": "'more information to follow soon' hàm ý rằng một số chi tiết hậu cần vẫn đang được chuẩn bị hoàn tất."
              }
            ]
          }
        },
        {
          "id": "read7_m2_t4",
          "title": "Task 4: Academic Passage (The Superego and the Psychic Apparatus)",
          "task_type": "academic_passage",
          "content": {
            "document_type": "Psychoanalysis Passage",
            "passage": "Sigmund Freud's structural model of the psyche posits a tripartite division into the id, ego, and superego. While the id represents primal drives and the ego mediates with reality, the superego functions as the internalized moral arbiter, embodying the values and ideals of society as transmitted primarily by parental figures. Its development is a critical process in childhood, emerging from the resolution of the Oedipal complex.\n\nThe superego has two distinct subsystems: the conscience, which punishes transgressions with feelings of guilt and shame, and the ego-ideal, which rewards adherence to moral standards with feelings of pride. [A] A poorly integrated superego can lead to various psychopathologies. [B] An excessively harsh superego may result in crippling anxiety, obsessive self-reproach, and an inability to experience pleasure, as the individual is perpetually plagued by a sense of their own unworthiness. [C] Conversely, a weak or underdeveloped superego is associated with antisocial behavior, a lack of remorse, and an inability to conform to social norms. [D]\n\nFreud thus conceptualized the superego not as a benign guide but as a potentially tyrannical force, whose demands are often as irrational and uncompromising as the id's drives. Its formation represents the price of civilization — the installation of a permanent internal authority that both enables social cohesion and generates profound intrapsychic conflict.",
            "questions": [
              {
                "id": "read7_m2_q16",
                "type": "multiple_choice",
                "prompt": "The word \"arbiter\" in the passage is closest in meaning to",
                "options": {
                  "A": "follower",
                  "B": "student",
                  "C": "judge",
                  "D": "opponent"
                },
                "correct_answer": "C",
                "explanation": "'arbiter' là người phân xử, thẩm phán/người phán quyết đạo đức ('judge')."
              },
              {
                "id": "read7_m2_q17",
                "type": "multiple_choice",
                "prompt": "Where would the following sentence best fit: \"Both extremes reflect imbalances in the regulation of moral standards and self-evaluation.\"?",
                "options": {
                  "A": "Location A",
                  "B": "Location B",
                  "C": "Location C",
                  "D": "Location D"
                },
                "correct_answer": "D",
                "explanation": "Câu này kết luận cho cả 2 thái cực cực đoan được nêu trước đó (quá khắt khe ở [B]-[C] và quá yếu ớt ở [C]-[D]), do đó vị trí phù hợp nhất là [D]."
              },
              {
                "id": "read7_m2_q18",
                "type": "multiple_choice",
                "prompt": "Which of the following sentences best expresses the essential information in the highlighted sentence: \"Freud thus conceptualized the superego not as a benign guide but as a potentially tyrannical force, whose demands are often as irrational and uncompromising as the id's drives.\"?",
                "options": {
                  "A": "Freud viewed the superego as a helpful moral guide that regulates the irrational impulses of the id",
                  "B": "Freud argued that the superego can function as an oppressive internal authority with rigid and irrational demands, similar to those of the id",
                  "C": "Freud believed that the superego is less rational than the id and therefore incapable of guiding moral behavior",
                  "D": "Freud suggested that the superego becomes tyrannical only when it fails to control the id's instinctual drives"
                },
                "correct_answer": "B",
                "explanation": "Lựa chọn B truyền tải chính xác và đầy đủ ý cốt lõi: siêu tôi có thể đóng vai trò là một quyền lực nội tâm áp bức độc đoán với các đòi hỏi cứng nhắc và phi lý không kém gì bản năng (id)."
              },
              {
                "id": "read7_m2_q19",
                "type": "multiple_choice",
                "prompt": "The author describes the superego as a \"tyrannical force\" in order to emphasize its",
                "options": {
                  "A": "benevolent and guiding nature",
                  "B": "weakness compared to the ego",
                  "C": "role in promoting antisocial behavior",
                  "D": "potential for being irrational and oppressive"
                },
                "correct_answer": "D",
                "explanation": "Cụm từ 'tyrannical force' (lực lượng bạo quyền/chuyên chế) dùng để nhấn mạnh tính chất phi lý và áp bức nặng nề của siêu tôi đối với tâm trí."
              },
              {
                "id": "read7_m2_q20",
                "type": "multiple_choice",
                "prompt": "What can be inferred about the formation of the superego from the passage?",
                "options": {
                  "A": "It is a process that is entirely conscious and voluntary",
                  "B": "It is necessary for social living but can also be a source of internal conflict",
                  "C": "It completely eliminates the influence of the id",
                  "D": "It is fully formed at birth and does not develop over time"
                },
                "correct_answer": "B",
                "explanation": "Đoạn cuối khẳng định: sự hình thành siêu tôi là cái giá của nền văn minh, vừa giúp gắn kết xã hội nhưng đồng thời cũng tạo ra xung đột nội tâm sâu sắc ('both enables social cohesion and generates profound intrapsychic conflict')."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const readingTest08 = {
  "id": "reading-practice-08",
  "title": "Reading Practice Test 08 (TOEFL 2026 - Urban Heat & Neolithic Agriculture - HARD M2)",
  "skill": "reading",
  "is_default": true,
  "duration_seconds": 1800,
  "description": "Bộ đề TOEFL iBT 2026 Multistage Adaptive (YouTube Practice 7 - HARD Module 2 C1): Module 1 (Cultural Traditions, Campus Café, Professor Lewis Email, Urban Heat Islands) & Module 2 (Sleep Quality, Business Hotel Review, Fitness Center Announcement, Neolithic Agriculture).",
  "stages": [
    {
      "id": "read8_stage_1",
      "title": "Reading - Module 1 (Stage 1)",
      "duration_seconds": 900,
      "description": "Module 1 gồm 4 phần (20 câu hỏi). Hãy hoàn thành trước khi hết 15 phút.",
      "tasks": [
        {
          "id": "read8_m1_t1",
          "title": "Task 1: Complete the Words (Đoạn 1 - Cultural Traditions)",
          "task_type": "complete_words",
          "content": {
            "instructions": "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn sau:",
            "paragraph": "Cultural traditions help maintain social cohesion and collective identity. They a[re] transmitted thr[ough] shared practi[ces], language, and symb[ols] ac[ross] generations. Wh[ile] traditions prov[ide] continuity, th[ey] are n[ot] static and of[ten] evolve in response to social change. Globalization and modernization can weaken certain traditions, particularly among younger generations. However, cultural adaptation allows societies to preserve core values while remaining flexible. Studying cultural traditions helps explain how communities balance change and stability in a rapidly transforming world.",
            "blanks": [
              {
                "id": "read8_m1_t1_b1",
                "prefix": "a",
                "missing": "re",
                "full": "are"
              },
              {
                "id": "read8_m1_t1_b2",
                "prefix": "thr",
                "missing": "ough",
                "full": "through"
              },
              {
                "id": "read8_m1_t1_b3",
                "prefix": "practi",
                "missing": "ces",
                "full": "practices"
              },
              {
                "id": "read8_m1_t1_b4",
                "prefix": "symb",
                "missing": "ols",
                "full": "symbols"
              },
              {
                "id": "read8_m1_t1_b5",
                "prefix": "ac",
                "missing": "ross",
                "full": "across"
              },
              {
                "id": "read8_m1_t1_b6",
                "prefix": "Wh",
                "missing": "ile",
                "full": "While"
              },
              {
                "id": "read8_m1_t1_b7",
                "prefix": "prov",
                "missing": "ide",
                "full": "provide"
              },
              {
                "id": "read8_m1_t1_b8",
                "prefix": "th",
                "missing": "ey",
                "full": "they"
              },
              {
                "id": "read8_m1_t1_b9",
                "prefix": "n",
                "missing": "ot",
                "full": "not"
              },
              {
                "id": "read8_m1_t1_b10",
                "prefix": "of",
                "missing": "ten",
                "full": "often"
              }
            ]
          }
        },
        {
          "id": "read8_m1_t2",
          "title": "Task 2: Read a Social Media Post (New Campus Café)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Social Media Review",
            "passage": "I visited the new café near campus this afternoon and was pleasantly surprised by the overall experience. The coffee had a rich flavor and clearly tasted freshly prepared. In addition, the staff went out of their way to make customers feel welcome, which created a relaxed atmosphere. However, because the café is relatively small, it tends to become overcrowded during peak hours. Despite this inconvenience, I would still recommend it to others.",
            "questions": [
              {
                "id": "read8_m1_q11",
                "type": "multiple_choice",
                "prompt": "What problem does the writer mention?",
                "options": {
                  "A": "The drinks are overpriced",
                  "B": "The service is slow",
                  "C": "The café becomes too crowded",
                  "D": "The location is inconvenient"
                },
                "correct_answer": "C",
                "explanation": "Vấn đề duy nhất người viết nhắc đến là quán khá nhỏ nên thường quá đông đúc vào giờ cao điểm ('tends to become overcrowded during peak hours')."
              },
              {
                "id": "read8_m1_q12",
                "type": "multiple_choice",
                "prompt": "What can be inferred about the writer's opinion?",
                "options": {
                  "A": "The disadvantages outweigh the advantages",
                  "B": "The writer will probably return",
                  "C": "The café needs new management",
                  "D": "The coffee quality is inconsistent"
                },
                "correct_answer": "B",
                "explanation": "Người viết khen trải nghiệm nhìn chung và khẳng định vẫn sẽ giới thiệu quán cho người khác ('I would still recommend it to others'), ngụ ý rằng họ có khả năng sẽ quay lại."
              }
            ]
          }
        },
        {
          "id": "read8_m1_t3",
          "title": "Task 3: Read an Email from a Professor (Class Schedule Change)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Email Announcement",
            "passage": "Dear students,\n\nI am writing to inform you that tomorrow's class will start 15 minutes later than usual due to an important meeting that was scheduled unexpectedly. Although I do not anticipate a significant delay, the meeting may run slightly over time. Please adjust your plans accordingly and arrive at the new starting time. We will still cover all the planned material this week, so there is no need to worry about missing essential content.\n\nBest regards,\nProfessor Lewis",
            "questions": [
              {
                "id": "read8_m1_q13",
                "type": "multiple_choice",
                "prompt": "Why has the schedule changed?",
                "options": {
                  "A": "The classroom is unavailable",
                  "B": "The professor has another commitment",
                  "C": "Students requested a later time",
                  "D": "Technical equipment needs repair"
                },
                "correct_answer": "B",
                "explanation": "Lịch học dời lại vì giáo sư có một cuộc họp đột xuất ('due to an important meeting that was scheduled unexpectedly')."
              },
              {
                "id": "read8_m1_q14",
                "type": "multiple_choice",
                "prompt": "What does the professor suggest about the meeting?",
                "options": {
                  "A": "It will definitely end on time",
                  "B": "It might take longer than expected",
                  "C": "It has been canceled",
                  "D": "It will shorten the class"
                },
                "correct_answer": "B",
                "explanation": "Giáo sư lưu ý rằng cuộc họp có thể kéo dài hơn một chút ('the meeting may run slightly over time')."
              },
              {
                "id": "read8_m1_q15",
                "type": "multiple_choice",
                "prompt": "What are students expected to do?",
                "options": {
                  "A": "Arrive according to the revised schedule",
                  "B": "Come earlier than usual",
                  "C": "Skip the class if they are busy",
                  "D": "Prepare additional assignments"
                },
                "correct_answer": "A",
                "explanation": "Giáo sư đề nghị sinh viên điều chỉnh kế hoạch và đến lớp theo giờ mới muộn hơn 15 phút ('arrive at the new starting time')."
              }
            ]
          }
        },
        {
          "id": "read8_m1_t4",
          "title": "Task 4: Academic Passage (Urban Heat Islands)",
          "task_type": "academic_passage",
          "content": {
            "document_type": "Environmental Science Passage",
            "passage": "Cities tend to be significantly warmer than surrounding rural areas, a phenomenon known as the \"urban heat island\" effect. This temperature difference arises primarily from human-built surfaces such as asphalt and concrete, which absorb and retain heat more efficiently than vegetation-covered land. During the day, these materials store solar radiation and gradually release it at night, preventing cities from cooling down. In addition, reduced tree cover limits natural cooling through shade and evapotranspiration, further intensifying heat accumulation.\n\nBeyond altering temperature patterns, urban heat islands substantially increase energy consumption, as residents rely more heavily on air conditioning systems to maintain comfortable indoor environments. Higher temperatures can also worsen air pollution because heat accelerates chemical reactions that produce ground-level ozone. Consequently, public health risks rise, particularly for elderly individuals and those with respiratory conditions during prolonged heat waves.\n\nTo mitigate these effects, urban planners have introduced strategies such as green roofs, reflective building materials, expanded tree canopies, and redesigned public spaces. These interventions not only lower surface and air temperatures but also improve air quality, reduce energy demand, and enhance overall urban livability.",
            "questions": [
              {
                "id": "read8_m1_q16",
                "type": "multiple_choice",
                "prompt": "All of the following are mentioned as consequences of urban heat islands EXCEPT",
                "options": {
                  "A": "Higher electricity use",
                  "B": "Increased air pollution",
                  "C": "Greater risk during heat waves",
                  "D": "Expanded public transportation"
                },
                "correct_answer": "D",
                "explanation": "Bài đọc liệt kê tăng tiêu thụ điện, ô nhiễm ozone, nguy cơ sức khỏe trong đợt nắng nóng, nhưng không đề cập việc mở rộng giao thông công cộng."
              },
              {
                "id": "read8_m1_q17",
                "type": "multiple_choice",
                "prompt": "It can be inferred that green roofs are effective because they",
                "options": {
                  "A": "increase commercial profits",
                  "B": "replace heat-retaining surfaces with vegetation",
                  "C": "eliminate the need for electricity",
                  "D": "reduce urban population density"
                },
                "correct_answer": "B",
                "explanation": "Mái nhà xanh hiệu quả vì thay thế bê tông/nhựa đường giữ nhiệt bằng lớp thực vật có khả năng làm mát tự nhiên qua bóng râm và thoát hơi nước."
              },
              {
                "id": "read8_m1_q18",
                "type": "multiple_choice",
                "prompt": "What is the relationship between paragraphs 1 and 2?",
                "options": {
                  "A": "Paragraph 2 challenges the explanation in paragraph 1",
                  "B": "Paragraph 2 describes the historical origins of the phenomenon",
                  "C": "Paragraph 2 outlines the consequences of the process explained in paragraph 1",
                  "D": "Paragraph 2 presents an unrelated environmental issue"
                },
                "correct_answer": "C",
                "explanation": "Đoạn 1 giải thích nguyên nhân và cơ chế tạo ra đảo nhiệt đô thị, đoạn 2 phác thảo các hệ quả tiêu cực của hiện tượng đó đối với năng lượng, ô nhiễm và sức khỏe."
              },
              {
                "id": "read8_m1_q19",
                "type": "multiple_choice",
                "prompt": "In the passage, the word \"mitigate\" is closest in meaning to",
                "options": {
                  "A": "measure",
                  "B": "worsen",
                  "C": "reduce",
                  "D": "predict"
                },
                "correct_answer": "C",
                "explanation": "'mitigate' có nghĩa là giảm nhẹ, giảm bớt tác động ('reduce')."
              },
              {
                "id": "read8_m1_q20",
                "type": "multiple_choice",
                "prompt": "Which sentence best expresses the essential information in the following sentence: \"Beyond altering temperature patterns, urban heat islands substantially increase energy consumption, as residents rely more heavily on air conditioning systems to maintain comfortable indoor environments.\"?",
                "options": {
                  "A": "Urban heat islands change temperature patterns, which is uncomfortable.",
                  "B": "Because cities are warmer, people use more air conditioning, increasing energy use.",
                  "C": "Excessive air conditioning use results in creation of urban heat islands.",
                  "D": "Energy consumption reduces temperature differences, which has a positive influence on cities."
                },
                "correct_answer": "B",
                "explanation": "Lựa chọn B diễn đạt ngắn gọn và chính xác mối quan hệ nhân quả cốt lõi: thành phố nóng hơn khiến người dân dùng nhiều máy lạnh hơn, làm tăng tiêu thụ năng lượng."
              }
            ]
          }
        }
      ]
    },
    {
      "id": "read8_stage_2",
      "title": "Reading - Module 2 (Stage 2 - HARD C1 Adaptive)",
      "duration_seconds": 900,
      "description": "Module 2 khó (C1) gồm 4 phần (20 câu hỏi). Hãy hoàn thành trước khi hết 15 phút.",
      "tasks": [
        {
          "id": "read8_m2_t1",
          "title": "Task 1: Complete the Words (Đoạn 1 - Sleep Quality)",
          "task_type": "complete_words",
          "content": {
            "instructions": "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn sau:",
            "paragraph": "Sleep quality is essential for physical health, emotional regulation, and cognitive functioning. During sl[eep], the bo[dy] restores ene[rgy] and the br[ain] processes infor[mation] learned du[ring] the d[ay]. Insufficient sleep is assoc[iated] with redu[ced] concentration, weak[ened] immune response, and increased risk of chronic illness. Modern lifestyles, including screen use and irregular schedules, often disrupt healthy sleep patterns. As awareness of sleep science grows, individuals and institutions are emphasizing better sleep habits. Improving sleep quality supports long-term health and productivity.",
            "blanks": [
              {
                "id": "read8_m2_t1_b1",
                "prefix": "sl",
                "missing": "eep",
                "full": "sleep"
              },
              {
                "id": "read8_m2_t1_b2",
                "prefix": "bo",
                "missing": "dy",
                "full": "body"
              },
              {
                "id": "read8_m2_t1_b3",
                "prefix": "ene",
                "missing": "rgy",
                "full": "energy"
              },
              {
                "id": "read8_m2_t1_b4",
                "prefix": "br",
                "missing": "ain",
                "full": "brain"
              },
              {
                "id": "read8_m2_t1_b5",
                "prefix": "infor",
                "missing": "mation",
                "full": "information"
              },
              {
                "id": "read8_m2_t1_b6",
                "prefix": "du",
                "missing": "ring",
                "full": "during"
              },
              {
                "id": "read8_m2_t1_b7",
                "prefix": "d",
                "missing": "ay",
                "full": "day"
              },
              {
                "id": "read8_m2_t1_b8",
                "prefix": "assoc",
                "missing": "iated",
                "full": "associated"
              },
              {
                "id": "read8_m2_t1_b9",
                "prefix": "redu",
                "missing": "ced",
                "full": "reduced"
              },
              {
                "id": "read8_m2_t1_b10",
                "prefix": "weak",
                "missing": "ened",
                "full": "weakened"
              }
            ]
          }
        },
        {
          "id": "read8_m2_t2",
          "title": "Task 2: Read an Online Review (Hotel Business Stay)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Online Hotel Review",
            "passage": "I stayed at this hotel for one night while traveling on business. The room was spotless, and the staff was courteous and efficient, which certainly got the trip off to a good start. That said, the Wi-Fi was painfully slow, and when you are up against the clock preparing for an important meeting, that can be a deal-breaker. Although the stay was manageable in the short term, I would think twice before booking again if reliable internet access were essential.",
            "questions": [
              {
                "id": "read8_m2_q11",
                "type": "multiple_choice",
                "prompt": "What does the phrase \"up against the clock\" suggest?",
                "options": {
                  "A": "The reviewer had plenty of spare time",
                  "B": "The reviewer was working under time pressure",
                  "C": "The meeting was canceled",
                  "D": "The reviewer arrived too early"
                },
                "correct_answer": "B",
                "explanation": "'up against the clock' là thành ngữ chỉ tình trạng bị gấp rút, chịu áp lực thời gian lớn ('working under time pressure')."
              },
              {
                "id": "read8_m2_q12",
                "type": "multiple_choice",
                "prompt": "What overall evaluation does the reviewer imply?",
                "options": {
                  "A": "The hotel exceeded expectations",
                  "B": "The reviewer would strongly recommend it for long stays",
                  "C": "The stay was entirely unsatisfactory",
                  "D": "The experience was acceptable but limited"
                },
                "correct_answer": "D",
                "explanation": "Đánh giá chung: khách sạn tạm ổn cho chuyến đi ngắn (sạch sẽ, nhân viên lịch sự) nhưng bị hạn chế nghiêm trọng bởi Wi-Fi yếu ('acceptable but limited')."
              }
            ]
          }
        },
        {
          "id": "read8_m2_t3",
          "title": "Task 3: Read an Announcement (Fitness Center Schedule)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Facility Notice",
            "passage": "Beginning this month, the fitness center will close at 8 p.m. on Saturdays rather than 10 p.m. After reviewing attendance data, the administration concluded that keeping the facility open later was simply not worth the candle, as usage dropped off significantly in the late evening. By adjusting the schedule, the center aims to cut costs without compromising overall access. Weekday hours remain unchanged, and Sunday operations will continue as usual. Please plan your workouts accordingly to avoid being caught off guard.",
            "questions": [
              {
                "id": "read8_m2_q13",
                "type": "multiple_choice",
                "prompt": "What modification has been introduced?",
                "options": {
                  "A": "Saturday opening hours have been extended",
                  "B": "Saturday closing time has been brought forward",
                  "C": "Weekday hours have been reduced",
                  "D": "The center will temporarily suspend operations"
                },
                "correct_answer": "B",
                "explanation": "Giờ đóng cửa thứ Bảy được đẩy sớm lên 8 giờ tối thay vì 10 giờ tối ('Saturday closing time has been brought forward')."
              },
              {
                "id": "read8_m2_q14",
                "type": "multiple_choice",
                "prompt": "What rationale is provided for the decision?",
                "options": {
                  "A": "Members demanded shorter hours",
                  "B": "Staffing shortages made operation impossible",
                  "C": "Major renovations are about to begin",
                  "D": "Late-evening attendance was too low to justify costs"
                },
                "correct_answer": "D",
                "explanation": "Lý do: lượng người tập cuối buổi tối thứ Bảy sụt giảm mạnh, không bõ chi phí vận hành ('usage dropped off significantly... not worth the candle')."
              },
              {
                "id": "read8_m2_q15",
                "type": "multiple_choice",
                "prompt": "What tone does the announcement adopt?",
                "options": {
                  "A": "Apologetic and defensive",
                  "B": "Informal and humorous",
                  "C": "Practical and matter-of-fact",
                  "D": "Urgent and alarming"
                },
                "correct_answer": "C",
                "explanation": "Giọng văn thông báo mang tính thực tế, dựa trên số liệu và thẳng thắn ('practical and matter-of-fact')."
              }
            ]
          }
        },
        {
          "id": "read8_m2_t4",
          "title": "Task 4: Academic Passage (The Origins of Agriculture)",
          "task_type": "academic_passage",
          "content": {
            "document_type": "Anthropology & Archaeology Passage",
            "passage": "[A] For the vast majority of human history, communities sustained themselves through hunting wild animals and gathering edible plants. [B] However, approximately 10,000 years ago, certain populations began deliberately cultivating crops and domesticating animals, initiating a profound transformation commonly referred to as the Neolithic Revolution. [C] This shift did not occur uniformly across regions, yet wherever it emerged, it fundamentally altered patterns of social organization and human interaction with the environment. [D]\n\nThe development of agriculture generated more predictable food supplies, which in turn facilitated sustained population growth and the establishment of permanent settlements. As agricultural techniques improved, communities were able to produce surpluses that exceeded immediate subsistence needs. These surpluses enabled occupational specialization, allowing some individuals to devote themselves to crafts, trade, religious leadership, or governance. Over time, such differentiation contributed to increasingly hierarchical and administratively complex societies.\n\nNevertheless, agriculture also introduced significant challenges. Dependence on a limited number of crops heightened vulnerability to drought, pests, and disease, while densely populated settlements accelerated the transmission of infectious illnesses, reshaping demographic patterns in lasting ways.",
            "questions": [
              {
                "id": "read8_m2_q16",
                "type": "multiple_choice",
                "prompt": "Which of the following best captures the central argument of the passage?",
                "options": {
                  "A": "The adoption of agriculture marked a turning point that restructured human societies",
                  "B": "Early agricultural societies were more egalitarian than hunter-gatherer groups",
                  "C": "Infectious diseases were the primary driver of social hierarchy",
                  "D": "Nomadic lifestyles prevented technological innovation"
                },
                "correct_answer": "A",
                "explanation": "Luận điểm trung tâm: Việc chuyển sang canh tác nông nghiệp đánh dấu một bước ngoặt tái cấu trúc toàn diện xã hội loài người."
              },
              {
                "id": "read8_m2_q17",
                "type": "multiple_choice",
                "prompt": "The word \"subsistence\" in the second paragraph is closest in meaning to",
                "options": {
                  "A": "migration",
                  "B": "basic survival",
                  "C": "trade expansion",
                  "D": "political influence"
                },
                "correct_answer": "B",
                "explanation": "'subsistence' nghĩa là mức sinh kế / duy trì sự sống cơ bản ('basic survival')."
              },
              {
                "id": "read8_m2_q18",
                "type": "multiple_choice",
                "prompt": "What is the author's primary purpose in the third paragraph?",
                "options": {
                  "A": "To emphasize that agricultural societies were technologically advanced",
                  "B": "To qualify the earlier discussion by introducing the drawbacks of agriculture",
                  "C": "To argue that hunting and gathering was more sustainable",
                  "D": "To describe regional differences in farming practices"
                },
                "correct_answer": "B",
                "explanation": "Mục đích đoạn 3: Bổ sung góc nhìn đa chiều bằng cách phân tích những khó khăn và mặt trái mà nông nghiệp mang lại (dịch bệnh, hạn hán, mất mùa)."
              },
              {
                "id": "read8_m2_q19",
                "type": "multiple_choice",
                "prompt": "What is the relationship between paragraphs 1 and 2?",
                "options": {
                  "A": "Paragraph 2 challenges the historical interpretation introduced in paragraph 1",
                  "B": "Paragraph 2 shifts the focus to a different historical period",
                  "C": "Paragraph 2 provides specific consequences of the transformation outlined in paragraph 1",
                  "D": "Paragraph 2 presents a contrasting example from a separate civilization"
                },
                "correct_answer": "C",
                "explanation": "Đoạn 1 giới thiệu cuộc cách mạng đồ đá mới (bắt đầu trồng trọt, thuần hóa động vật), đoạn 2 nêu chi tiết các hệ quả cụ thể (dư thừa lương thực, phân công lao động, phân tầng xã hội)."
              },
              {
                "id": "read8_m2_q20",
                "type": "multiple_choice",
                "prompt": "Where would the following sentence best fit: \"This nomadic lifestyle required mobility and limited the accumulation of material possessions.\"?",
                "options": {
                  "A": "Location A",
                  "B": "Location B",
                  "C": "Location C",
                  "D": "Location D"
                },
                "correct_answer": "B",
                "explanation": "Câu này bổ sung chi tiết trực tiếp cho lối sống săn bắt hái lượm du mục được nhắc đến ở câu đầu tiên, ngay trước từ chuyển ý 'However' tại vị trí [B]."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const readingTest09 = {
  "id": "reading-practice-09",
  "title": "Reading Practice Test 09 (TOEFL 2026 - Attention Economy & AI - HARD M2)",
  "skill": "reading",
  "is_default": true,
  "duration_seconds": 1800,
  "description": "Bộ đề TOEFL iBT 2026 Multistage Adaptive (YouTube Practice 8 - HARD Module 2 C1): Module 1 (Critical Reading, Biking to Campus, Library Exam Week, The Economics of Attention) & Module 2 (Cultural Diversity, Plant-Based Milk, Winter Apparel Sale, Development of AI).",
  "stages": [
    {
      "id": "read9_stage_1",
      "title": "Reading - Module 1 (Stage 1)",
      "duration_seconds": 900,
      "description": "Module 1 gồm 4 phần (20 câu hỏi). Hãy hoàn thành trước khi hết 15 phút.",
      "tasks": [
        {
          "id": "read9_m1_t1",
          "title": "Task 1: Complete the Words (Đoạn 1 - Critical Reading)",
          "task_type": "complete_words",
          "content": {
            "instructions": "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn sau:",
            "paragraph": "Critical reading is the ability to understand not only what a text says but also how it communicates meaning through structure, tone, and evidence. Skilled rea[ders] examine the auth[or]'s purpose, assump[tions], and cho[ice] of examp[les]. They comp[are] arguments, iden[tify] bias, and evalu[ate] the streng[th] of suppor[ting] details. In academic contexts, this skill leads to deeper comprehension and more accurate interpretation of complex materials. Critical reading also encourages independence of thought. Instead of accepting information passively, readers learn to question ideas and form reasoned conclusions based on careful analysis.",
            "blanks": [
              {
                "id": "read9_m1_t1_b1",
                "prefix": "rea",
                "missing": "ders",
                "full": "readers"
              },
              {
                "id": "read9_m1_t1_b2",
                "prefix": "auth",
                "missing": "or",
                "full": "author"
              },
              {
                "id": "read9_m1_t1_b3",
                "prefix": "assump",
                "missing": "tions",
                "full": "assumptions"
              },
              {
                "id": "read9_m1_t1_b4",
                "prefix": "cho",
                "missing": "ice",
                "full": "choice"
              },
              {
                "id": "read9_m1_t1_b5",
                "prefix": "examp",
                "missing": "les",
                "full": "examples"
              },
              {
                "id": "read9_m1_t1_b6",
                "prefix": "comp",
                "missing": "are",
                "full": "compare"
              },
              {
                "id": "read9_m1_t1_b7",
                "prefix": "iden",
                "missing": "tify",
                "full": "identify"
              },
              {
                "id": "read9_m1_t1_b8",
                "prefix": "evalu",
                "missing": "ate",
                "full": "evaluate"
              },
              {
                "id": "read9_m1_t1_b9",
                "prefix": "streng",
                "missing": "th",
                "full": "strength"
              },
              {
                "id": "read9_m1_t1_b10",
                "prefix": "suppor",
                "missing": "ting",
                "full": "supporting"
              }
            ]
          }
        },
        {
          "id": "read9_m1_t2",
          "title": "Task 2: Read a Short Blog Entry (Biking to Campus)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Personal Blog",
            "passage": "Today I finally tried biking to campus instead of taking the bus, and it went much better than I expected. The whole ride took only 12 minutes, which is actually faster than my usual bus route. The only difficult part was the long hill near my dorm — I didn't realize how steep it was, and my legs were burning by the time I reached the top. Still, I think I'll bike more often now.",
            "questions": [
              {
                "id": "read9_m1_q11",
                "type": "multiple_choice",
                "prompt": "What is one benefit mentioned?",
                "options": {
                  "A": "It's cheaper than the bus",
                  "B": "Biking is faster than the bus",
                  "C": "Going up the hill provides exercise",
                  "D": "The road is very quiet"
                },
                "correct_answer": "B",
                "explanation": "Lợi ích được tác giả nêu: đạp xe chỉ mất 12 phút, nhanh hơn so với tuyến xe buýt thường ngày ('faster than my usual bus route')."
              },
              {
                "id": "read9_m1_q12",
                "type": "multiple_choice",
                "prompt": "How does the writer feel about the hill?",
                "options": {
                  "A": "It's exhausting",
                  "B": "It's fun",
                  "C": "It's dangerous",
                  "D": "It's boring"
                },
                "correct_answer": "A",
                "explanation": "Đoạn văn miêu tả: ngọn đồi quá dốc và 'my legs were burning' (chân mỏi nhừ/kiệt sức - exhausting) khi lên đến đỉnh."
              }
            ]
          }
        },
        {
          "id": "read9_m1_t3",
          "title": "Task 3: Read a Campus Library Update (Exam Week Extended Hours)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Library Announcement",
            "passage": "To support students during exam week, the campus library will extend its weekday hours until midnight. This change is intended to give everyone more time to study, especially those who prefer a quiet environment late at night. Study rooms must be reserved in advance through the online system because they fill up quickly. The café inside the library will also stay open until 10 p.m. to offer snacks and drinks.",
            "questions": [
              {
                "id": "read9_m1_q13",
                "type": "multiple_choice",
                "prompt": "Why are the hours being extended?",
                "options": {
                  "A": "To test a new system",
                  "B": "Because of exam week",
                  "C": "Because volunteers requested it",
                  "D": "Because the study rooms fill up quickly"
                },
                "correct_answer": "B",
                "explanation": "Thông báo ghi rõ: 'To support students during exam week, the campus library will extend its weekday hours until midnight'."
              },
              {
                "id": "read9_m1_q14",
                "type": "multiple_choice",
                "prompt": "What needs to be reserved?",
                "options": {
                  "A": "Computer use",
                  "B": "Café tables",
                  "C": "Study rooms",
                  "D": "Textbooks"
                },
                "correct_answer": "C",
                "explanation": "Đoạn văn yêu cầu: 'Study rooms must be reserved in advance through the online system'."
              },
              {
                "id": "read9_m1_q15",
                "type": "multiple_choice",
                "prompt": "What can be inferred about the café work hours?",
                "options": {
                  "A": "It will stay open until the library closes",
                  "B": "It is usually open until 10 p.m.",
                  "C": "It usually closes earlier",
                  "D": "It will not offer snacks in the evening"
                },
                "correct_answer": "C",
                "explanation": "Việc quán cà phê 'sẽ cũng mở cửa đến 10 giờ tối để phục vụ đồ ăn nhẹ' cho thấy bình thường quán đóng cửa sớm hơn thời điểm này."
              }
            ]
          }
        },
        {
          "id": "read9_m1_t4",
          "title": "Task 4: Academic Passage (The Economics of Attention)",
          "task_type": "academic_passage",
          "content": {
            "document_type": "Digital Economy & Media Studies Passage",
            "passage": "In modern digital environments, human attention has become a scarce and valuable resource. As a result, companies compete not only for consumers' money, but also for their time and focus. This shift has created what economists call the \"attention economy,\" in which platforms are designed to capture and retain user engagement for extended periods. Unlike traditional markets, where goods and services are exchanged, this system monetizes user behavior through advertising and data collection.\n\nMany digital services rely on sophisticated algorithms that personalize content based on user activity. These systems analyze patterns such as viewing history, clicks, and interaction time to predict what users are most likely to engage with next. They often prioritize emotionally engaging material because it increases sharing and interaction. Consequently, users may spend more time on platforms than they originally intended, often without fully realizing it.\n\nHowever, this model has significant implications for individuals and society. Critics argue that constant competition for attention can reduce concentration and encourage the spread of sensationalized or misleading information. Because engagement determines visibility, content creators may feel pressured to produce extreme or polarizing material. Despite these concerns, the attention economy continues to expand, influencing entertainment, news consumption, education, and even social relationships.",
            "questions": [
              {
                "id": "read9_m1_q16",
                "type": "multiple_choice",
                "prompt": "What is the main idea of the passage?",
                "options": {
                  "A": "Some digital platforms are losing popularity among users",
                  "B": "The attention economy is based on capturing and monetizing human attention",
                  "C": "Algorithms are unreliable tools for personalization",
                  "D": "Users are fully aware of how platforms influence them"
                },
                "correct_answer": "B",
                "explanation": "Ý chính của bài: Nền kinh tế chú ý dựa trên việc thu hút và kiếm tiền từ thời gian và sự chú ý của người dùng."
              },
              {
                "id": "read9_m1_q17",
                "type": "multiple_choice",
                "prompt": "The word \"sophisticated\" in the passage is closest in meaning to",
                "options": {
                  "A": "simple",
                  "B": "advanced",
                  "C": "unclear",
                  "D": "ineffective"
                },
                "correct_answer": "B",
                "explanation": "'sophisticated' nghĩa là tinh vi, tiên tiến, hiện đại ('advanced')."
              },
              {
                "id": "read9_m1_q18",
                "type": "multiple_choice",
                "prompt": "What can be inferred about personalized algorithms?",
                "options": {
                  "A": "They reduce user engagement over time",
                  "B": "They are controlled entirely by users",
                  "C": "They provide only factual information",
                  "D": "They aim to keep users on platforms longer"
                },
                "correct_answer": "D",
                "explanation": "Thuật toán cá nhân hóa phân tích dữ liệu để dự đoán và giữ chân người dùng ở lại nền tảng lâu hơn ('capture and retain user engagement for extended periods')."
              },
              {
                "id": "read9_m1_q19",
                "type": "multiple_choice",
                "prompt": "What is the relationship between the second and third paragraphs?",
                "options": {
                  "A": "The third paragraph provides consequences of the processes described in the second",
                  "B": "The third paragraph contradicts the second",
                  "C": "The second paragraph summarizes the third",
                  "D": "The paragraphs describe unrelated topics"
                },
                "correct_answer": "A",
                "explanation": "Đoạn 2 miêu tả cách thức hoạt động của thuật toán giữ chân người dùng; đoạn 3 trình bày các hệ quả và tác động tiêu cực của mô hình này đối với cá nhân và xã hội."
              },
              {
                "id": "read9_m1_q20",
                "type": "multiple_choice",
                "prompt": "What does \"this model\" in the third paragraph refer to?",
                "options": {
                  "A": "Traditional economic systems",
                  "B": "The use of algorithms to capture and monetize attention",
                  "C": "The decline of advertising",
                  "D": "The growth of education platforms"
                },
                "correct_answer": "B",
                "explanation": "'this model' ám chỉ mô hình sử dụng thuật toán cá nhân hóa để thu hút và thương mại hóa sự chú ý của người dùng được phân tích ở các đoạn trên."
              }
            ]
          }
        }
      ]
    },
    {
      "id": "read9_stage_2",
      "title": "Reading - Module 2 (Stage 2 - HARD C1 Adaptive)",
      "duration_seconds": 900,
      "description": "Module 2 khó (C1) gồm 4 phần (20 câu hỏi). Hãy hoàn thành trước khi hết 15 phút.",
      "tasks": [
        {
          "id": "read9_m2_t1",
          "title": "Task 1: Complete the Words (Đoạn 1 - Cultural Diversity)",
          "task_type": "complete_words",
          "content": {
            "instructions": "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn sau:",
            "paragraph": "Cultural diversity enriches societies by bringing together a wide range of perspectives, traditions, and values. Exposure to diffe[rent] cultures promo[tes] tolerance, empa[thy], and mutu[al] understanding amo[ng] community memb[ers]. Diverse environ[ments] often stimu[late] creativity bec[ause] people exch[ange] ideas shaped by varied experiences. At the same time, managing diversity requires inclusive policies, open dialogue, and respect for differences. When diversity is recognized and appreciated, it strengthens social cohesion. Communities that embrace cultural variety are often more dynamic, innovative, and resilient in the face of social change.",
            "blanks": [
              {
                "id": "read9_m2_t1_b1",
                "prefix": "diffe",
                "missing": "rent",
                "full": "different"
              },
              {
                "id": "read9_m2_t1_b2",
                "prefix": "promo",
                "missing": "tes",
                "full": "promotes"
              },
              {
                "id": "read9_m2_t1_b3",
                "prefix": "empa",
                "missing": "thy",
                "full": "empathy"
              },
              {
                "id": "read9_m2_t1_b4",
                "prefix": "mutu",
                "missing": "al",
                "full": "mutual"
              },
              {
                "id": "read9_m2_t1_b5",
                "prefix": "amo",
                "missing": "ng",
                "full": "among"
              },
              {
                "id": "read9_m2_t1_b6",
                "prefix": "memb",
                "missing": "ers",
                "full": "members"
              },
              {
                "id": "read9_m2_t1_b7",
                "prefix": "environ",
                "missing": "ments",
                "full": "environments"
              },
              {
                "id": "read9_m2_t1_b8",
                "prefix": "stimu",
                "missing": "late",
                "full": "stimulate"
              },
              {
                "id": "read9_m2_t1_b9",
                "prefix": "bec",
                "missing": "ause",
                "full": "because"
              },
              {
                "id": "read9_m2_t1_b10",
                "prefix": "exch",
                "missing": "ange",
                "full": "exchange"
              }
            ]
          }
        },
        {
          "id": "read9_m2_t2",
          "title": "Task 2: Read a Menu Notice (Campus Café Drink Menu Update)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Café Menu Announcement",
            "passage": "Starting next week, the campus café will expand its drink menu by offering several plant-based milk alternatives. Students ordering beverages will be able to choose oat, almond, or soy milk instead of regular dairy milk. Due to higher supplier costs, selecting one of these options will add 50 cents to the price of the drink. The café clarified that no other menu items will be affected by this change. Management hopes this update will better accommodate students with different dietary preferences and restrictions.",
            "questions": [
              {
                "id": "read9_m2_q11",
                "type": "multiple_choice",
                "prompt": "What change is being introduced?",
                "options": {
                  "A": "Alternative milk choices",
                  "B": "New dessert options",
                  "C": "Lower drink prices",
                  "D": "A modification of existing prices"
                },
                "correct_answer": "A",
                "explanation": "Thay đổi được áp dụng là bổ sung các lựa chọn sữa nguồn gốc thực vật ('offering several plant-based milk alternatives')."
              },
              {
                "id": "read9_m2_q12",
                "type": "multiple_choice",
                "prompt": "What can be understood about the rest of the menu?",
                "options": {
                  "A": "Some prices will increase",
                  "B": "Only drinks will be discounted",
                  "C": "Other items will remain unchanged",
                  "D": "One product will be removed"
                },
                "correct_answer": "C",
                "explanation": "Thông báo khẳng định rõ các món khác trong menu không bị ảnh hưởng: 'no other menu items will be affected by this change'."
              }
            ]
          }
        },
        {
          "id": "read9_m2_t3",
          "title": "Task 3: Read a Store Notice (Winter Apparel Sale)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Store Promotion Notice",
            "passage": "Due to an upcoming seasonal transition, the store will offer a 30% discount on all winter apparel this weekend only. The promotion applies to coats, knitwear, scarves, gloves, and other cold-weather garments. Because this is a limited-time clearance event, customers may not combine this offer with any other coupons, loyalty rewards, or ongoing promotions. The management anticipates a significant increase in customer traffic and advises shoppers to arrive early to ensure a wider selection of available sizes and styles.",
            "questions": [
              {
                "id": "read9_m2_q13",
                "type": "multiple_choice",
                "prompt": "What is the primary purpose of this sale?",
                "options": {
                  "A": "To introduce a new clothing collection",
                  "B": "To reduce prices for loyal customers",
                  "C": "To clear winter inventory before the season changes",
                  "D": "To test a new discount system"
                },
                "correct_answer": "C",
                "explanation": "Mục đích chính của đợt giảm giá là xả hàng tồn mùa đông trước khi chuyển mùa ('clear winter inventory before the season changes')."
              },
              {
                "id": "read9_m2_q14",
                "type": "multiple_choice",
                "prompt": "What restriction is placed on customers?",
                "options": {
                  "A": "Only certain items can be purchased",
                  "B": "They must arrive early",
                  "C": "Purchases must be made online",
                  "D": "Other discounts cannot be applied"
                },
                "correct_answer": "D",
                "explanation": "Hạn chế quy định rõ khách không được áp dụng đồng thời các phiếu giảm giá hay ưu đãi khác ('customers may not combine this offer with any other coupons...')."
              },
              {
                "id": "read9_m2_q15",
                "type": "multiple_choice",
                "prompt": "What can be inferred about product availability?",
                "options": {
                  "A": "All sizes will be fully stocked throughout the weekend",
                  "B": "Popular items may sell out quickly",
                  "C": "Winter clothing is rarely purchased",
                  "D": "The store will restock items during the sale"
                },
                "correct_answer": "B",
                "explanation": "Cửa hàng khuyên khách đến sớm để có nhiều lựa chọn kích cỡ và mẫu mã, ngụ ý các mặt hàng hot sẽ nhanh chóng hết hàng ('Popular items may sell out quickly')."
              }
            ]
          }
        },
        {
          "id": "read9_m2_t4",
          "title": "Task 4: Academic Passage (The Development of Artificial Intelligence)",
          "task_type": "academic_passage",
          "content": {
            "document_type": "Computer Science Passage",
            "passage": "[A] Artificial intelligence (Al) refers to the ability of machines to perform tasks that typically require human intelligence, such as learning, reasoning, and problem-solving. [B] Although the concept of intelligent machines has existed for decades, recent advances in computing power and data availability have significantly accelerated the development of Al technologies. [C] Today, Al systems are used in a wide range of applications, from medical diagnosis to language translation. [D]\n\nOne of the key factors behind this progress is the rise of machine learning, a method that allows computers to learn from data without being explicitly programmed for every task. By analyzing large datasets, these systems can identify patterns and make predictions with increasing accuracy. For example, Al models can detect diseases in medical images or recommend products based on user preferences. As these systems improve, they become more capable of performing complex and specialized tasks.\n\nDespite these benefits, the rapid growth of Al has raised important ethical and social concerns. Some experts worry about issues such as job displacement, privacy, and the potential misuse of Al technologies. In response, governments and organizations are working to establish guidelines and regulations to ensure that Al is developed and used responsibly. As Al continues to evolve, its impact on society will likely become even more significant.",
            "questions": [
              {
                "id": "read9_m2_q16",
                "type": "multiple_choice",
                "prompt": "What is the main idea of the passage?",
                "options": {
                  "A": "Al has no practical applications",
                  "B": "Al is developing rapidly and has both benefits and concerns",
                  "C": "Machine learning is no longer relevant",
                  "D": "Governogly opposes Al development"
                },
                "correct_answer": "B",
                "explanation": "Ý chính của bài: Trí tuệ nhân tạo đang phát triển nhanh chóng, mang lại nhiều lợi ích thực tế nhưng cũng dấy lên không ít quan ngại xã hội."
              },
              {
                "id": "read9_m2_q17",
                "type": "multiple_choice",
                "prompt": "The word \"accelerated\" in the passage is closest in meaning to",
                "options": {
                  "A": "slowed down",
                  "B": "stopped",
                  "C": "sped up",
                  "D": "ignored"
                },
                "correct_answer": "C",
                "explanation": "'accelerated' có nghĩa là thúc đẩy, đẩy nhanh tiến độ ('sped up')."
              },
              {
                "id": "read9_m2_q18",
                "type": "multiple_choice",
                "prompt": "What is the author's purpose in the third paragraph?",
                "options": {
                  "A": "To explain how Al systems are built",
                  "B": "To highlight concerns and responses related to Al",
                  "C": "To describe technical details of machine learning",
                  "D": "To argue against technological progress"
                },
                "correct_answer": "B",
                "explanation": "Mục đích đoạn 3: Nêu bật các quan ngại về việc mất việc làm, quyền riêng tư và các chính sách ứng phó từ chính phủ ('highlight concerns and responses related to AI')."
              },
              {
                "id": "read9_m2_q19",
                "type": "multiple_choice",
                "prompt": "Where would the following sentence best fit: \"This progress has allowed Al to move from theoretical research into practical, everyday use.\"?",
                "options": {
                  "A": "Location A",
                  "B": "Location B",
                  "C": "Location C",
                  "D": "Location D"
                },
                "correct_answer": "C",
                "explanation": "Câu này nối tiếp hoàn hảo luận điểm ở câu trước về sự tiến bộ gia tốc của công nghệ AI, và dẫn vào câu tiếp theo về các ứng dụng thực tế phong phú ngày nay (tại [C])."
              },
              {
                "id": "read9_m2_q20",
                "type": "multiple_choice",
                "prompt": "Which of the following is NOT mentioned in the passage as a concern related to the growth of AI?",
                "options": {
                  "A": "The loss of jobs due to automation",
                  "B": "Risks to personal privacy",
                  "C": "The possible misuse of Al technologies",
                  "D": "The high cost of developing Al systems"
                },
                "correct_answer": "D",
                "explanation": "Đoạn 3 đề cập đến mất việc làm ('job displacement'), quyền riêng tư ('privacy'), và nguy cơ lạm dụng ('misuse'), nhưng KHÔNG nhắc tới chi phí phát triển AI tốn kém."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const readingTest10 = {
  "id": "reading-practice-10",
  "title": "Reading Practice Test 10 (TOEFL 2026 - Time Management & Sleep Consolidation)",
  "skill": "reading",
  "is_default": true,
  "duration_seconds": 1800,
  "description": "Bộ đề TOEFL iBT 2026 Multistage Adaptive (YouTube Practice 9): Module 1 (Time Management, Classmate Email, Student Council, Cognitive Biases) & Module 2 (Lifelong Learning, Doctor SMS, Store Receipt, Sleep & Memory Consolidation).",
  "stages": [
    {
      "id": "read10_stage_1",
      "title": "Reading - Module 1 (Stage 1)",
      "duration_seconds": 900,
      "description": "Module 1 gồm 4 phần (20 câu hỏi). Hãy hoàn thành trước khi hết 15 phút.",
      "tasks": [
        {
          "id": "read10_m1_t1",
          "title": "Task 1: Complete the Words (Đoạn 1 - Time Management)",
          "task_type": "complete_words",
          "content": {
            "instructions": "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn sau:",
            "paragraph": "Time management is essential for productivity, organization, and stress reduction in daily life. Planning tas[ks] in adv[ance] and sett[ing] clear prior[ities] allow indivi[duals] to us[e] their ti[me] more effici[ently]. Without effec[tive] time manag[ement], people may miss deadlines and feel overwhelmed by unfinished responsibilities. Establishing routines, setting realistic goals, and minimizing distractions can significantly improve focus. Good time management habits are valuable in both academic and professional settings. They enable individuals to complete tasks on time while maintaining a healthier balance between work and personal activities.",
            "blanks": [
              {
                "id": "read10_m1_t1_b1",
                "prefix": "tas",
                "missing": "ks",
                "full": "tasks"
              },
              {
                "id": "read10_m1_t1_b2",
                "prefix": "adv",
                "missing": "ance",
                "full": "advance"
              },
              {
                "id": "read10_m1_t1_b3",
                "prefix": "sett",
                "missing": "ing",
                "full": "setting"
              },
              {
                "id": "read10_m1_t1_b4",
                "prefix": "prior",
                "missing": "ities",
                "full": "priorities"
              },
              {
                "id": "read10_m1_t1_b5",
                "prefix": "indivi",
                "missing": "duals",
                "full": "individuals"
              },
              {
                "id": "read10_m1_t1_b6",
                "prefix": "us",
                "missing": "e",
                "full": "use"
              },
              {
                "id": "read10_m1_t1_b7",
                "prefix": "ti",
                "missing": "me",
                "full": "time"
              },
              {
                "id": "read10_m1_t1_b8",
                "prefix": "effici",
                "missing": "ently",
                "full": "efficiently"
              },
              {
                "id": "read10_m1_t1_b9",
                "prefix": "effec",
                "missing": "tive",
                "full": "effective"
              },
              {
                "id": "read10_m1_t1_b10",
                "prefix": "manag",
                "missing": "ement",
                "full": "management"
              }
            ]
          }
        },
        {
          "id": "read10_m1_t2",
          "title": "Task 2: Read an Email from a Classmate (Presentation Preparation)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Classmate Email",
            "passage": "Hey! I just wanted to remind you that our group presentation is due this Friday. I've already finished the slides for the first two sections, but we still need to complete the conclusion and practice the timing. Could we meet tomorrow afternoon, either in the library or online? Just let me know what works for you. I want to make sure we're fully prepared.",
            "questions": [
              {
                "id": "read10_m1_q11",
                "type": "multiple_choice",
                "prompt": "Why is the writer contacting the reader?",
                "options": {
                  "A": "To cancel a meeting",
                  "B": "To plan work on a presentation",
                  "C": "To ask for lecture notes",
                  "D": "To complain about grades"
                },
                "correct_answer": "B",
                "explanation": "Người viết gửi email để thảo luận và lên kế hoạch hoàn thành bài thuyết trình nhóm trước hạn thứ Sáu (\"complete the conclusion and practice the timing... meet tomorrow afternoon\")."
              },
              {
                "id": "read10_m1_q12",
                "type": "multiple_choice",
                "prompt": "What is still unfinished?",
                "options": {
                  "A": "The introduction",
                  "B": "The conclusion",
                  "C": "The examples",
                  "D": "The slides' design"
                },
                "correct_answer": "B",
                "explanation": "Người viết đề cập hai phần đầu của slide đã xong, phần còn lại chưa hoàn thành là kết luận (\"still need to complete the conclusion\")."
              }
            ]
          }
        },
        {
          "id": "read10_m1_t3",
          "title": "Task 3: Read a Student Council Announcement (Open Forum Meeting)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Campus Announcement",
            "passage": "The student council will host an open meeting next Thursday evening to hear suggestions about improving campus life. Everyone is welcome to share ideas, whether they relate to academics, dorm life, or extracurricular activities. The council especially wants feedback about study spaces on campus, since many students have recently expressed concerns. Snacks will be provided, and students may attend for any portion of the meeting.",
            "questions": [
              {
                "id": "read10_m1_q13",
                "type": "multiple_choice",
                "prompt": "What is the main purpose of the meeting?",
                "options": {
                  "A": "To choose new council members",
                  "B": "To collect suggestions from students",
                  "C": "To raise money for events",
                  "D": "To announce rule changes"
                },
                "correct_answer": "B",
                "explanation": "Mục đích chính của buổi họp mở là lắng nghe các ý kiến, đề xuất của sinh viên để cải thiện đời sống khuôn viên (\"to hear suggestions about improving campus life\")."
              },
              {
                "id": "read10_m1_q14",
                "type": "multiple_choice",
                "prompt": "What topic is the council particularly interested in?",
                "options": {
                  "A": "Study spaces",
                  "B": "Cafeteria food",
                  "C": "Sports programs",
                  "D": "Library noise"
                },
                "correct_answer": "A",
                "explanation": "Hội đồng đặc biệt mong muốn nhận phản hồi về không gian học tập vì nhiều sinh viên vừa qua đã bày tỏ lo ngại (\"especially wants feedback about study spaces on campus\")."
              },
              {
                "id": "read10_m1_q15",
                "type": "multiple_choice",
                "prompt": "Why does the announcement mention that students may attend for any portion of the meeting?",
                "options": {
                  "A": "To limit the number of participants",
                  "B": "To encourage students to stay for the entire meeting",
                  "C": "To show that attendance is flexible",
                  "D": "To require students to register in advance"
                },
                "correct_answer": "C",
                "explanation": "Thông báo nêu rõ sinh viên có thể tham dự bất kỳ lúc nào trong cuộc họp (\"students may attend for any portion of the meeting\") nhằm tạo sự linh hoạt, phù hợp lịch trình bận rộn của mọi người."
              }
            ]
          }
        },
        {
          "id": "read10_m1_t4",
          "title": "Task 4: Academic Reading (Cognitive Biases in Decision-Making)",
          "task_type": "read_academic",
          "content": {
            "academic_area": "Psychology / Behavioral Science",
            "passage": "Human decision-making is often influenced by cognitive biases, which are systematic patterns of deviation from rational thinking. These biases can affect judgments in everyday situations, from financial decisions to social interactions. While they can sometimes function as useful mental shortcuts, allowing individuals to make quick decisions, they frequently lead to errors in reasoning and judgment. One well-known example is confirmation bias, in which individuals tend to seek out and interpret information in ways that support their existing beliefs. As a result, they may ignore or dismiss evidence that contradicts their views. This tendency can reinforce misconceptions and make it difficult for people to change their opinions, even when presented with strong evidence. Over time, such patterns can contribute to polarization in social and political contexts. Another important bias is the availability heuristic, which occurs when people estimate the likelihood of events based on how easily examples come to mind. For instance, individuals may overestimate the risk of rare but dramatic events, such as plane crashes, because they receive extensive media coverage. In contrast, more common but less visible risks may be underestimated. This demonstrates how cognitive biases can distort perception and influence decision-making. Understanding these biases is essential for improving critical thinking. By becoming aware of these tendencies, individuals can take steps to evaluate information more objectively and reduce the impact of bias on their decisions. This awareness is particularly important in fields such as science, business, and public policy, where accurate judgment is crucial.",
            "questions": [
              {
                "id": "read10_m1_q16",
                "type": "multiple_choice",
                "prompt": "What is the main idea of the passage?",
                "options": {
                  "A": "Cognitive biases have no effect on decisions",
                  "B": "Cognitive biases influence thinking and can lead to errors",
                  "C": "People always make rational choices",
                  "D": "Media coverage is unreliable"
                },
                "correct_answer": "B",
                "explanation": "Ý chính của bài đọc: Thiên kiến nhận thức định hình cách con người suy nghĩ và thường dẫn đến những sai lầm trong suy luận và phán đoán (\"influence thinking and can lead to errors\")."
              },
              {
                "id": "read10_m1_q17",
                "type": "multiple_choice",
                "prompt": "The word \"dismiss\" in the passage is closest in meaning to",
                "options": {
                  "A": "accept",
                  "B": "consider",
                  "C": "reject",
                  "D": "analyze"
                },
                "correct_answer": "C",
                "explanation": "Từ \"dismiss\" trong ngữ cảnh từ chối, bỏ qua bằng chứng trái chiều đồng nghĩa với \"reject\" (bác bỏ, gạt bỏ)."
              },
              {
                "id": "read10_m1_q18",
                "type": "multiple_choice",
                "prompt": "What can be inferred about the availability heuristic?",
                "options": {
                  "A": "It leads to accurate risk assessment",
                  "B": "It depends on how easily examples are recalled",
                  "C": "It prevents cognitive errors",
                  "D": "It is only relevant in science"
                },
                "correct_answer": "B",
                "explanation": "Quy tắc ngón tay cái về tính sẵn có (availability heuristic) ước tính khả năng xảy ra sự kiện dựa trên mức độ dễ dàng liên tưởng, nhớ lại các ví dụ (\"depends on how easily examples are recalled\")."
              },
              {
                "id": "read10_m1_q19",
                "type": "multiple_choice",
                "prompt": "What is the relationship between the second and third paragraphs?",
                "options": {
                  "A": "They describe different examples of cognitive biases",
                  "B": "The third paragraph contradicts the second",
                  "C": "The third paragraph summarizes the second",
                  "D": "They discuss unrelated topics"
                },
                "correct_answer": "A",
                "explanation": "Đoạn 2 (thiên kiến khẳng định) và Đoạn 3 (availability heuristic) trình bày các ví dụ cụ thể khác nhau về thiên kiến nhận thức."
              },
              {
                "id": "read10_m1_q20",
                "type": "multiple_choice",
                "prompt": "Why does the author mention plane crashes in the third paragraph?",
                "options": {
                  "A": "To argue that air travel is more dangerous than people think",
                  "B": "To describe a common cause of cognitive bias in politics",
                  "C": "To show that rare events do not receive much attention",
                  "D": "To provide an example of how media coverage influences risk perception"
                },
                "correct_answer": "D",
                "explanation": "Tác giả nhắc đến tai nạn máy bay như một ví dụ minh họa cho các sự kiện hiếm gặp nhưng gây ấn tượng mạnh, khiến con người dễ phóng đại rủi ro của chúng."
              }
            ]
          }
        }
      ]
    },
    {
      "id": "read10_stage_2",
      "title": "Reading - Module 2 (Stage 2 - HARD)",
      "duration_seconds": 900,
      "description": "Module 2 gồm 4 phần (20 câu hỏi). Hãy hoàn thành trước khi hết 15 phút.",
      "tasks": [
        {
          "id": "read10_m2_t1",
          "title": "Task 1: Complete the Words (Đoạn 2 - Lifelong Learning)",
          "task_type": "complete_words",
          "content": {
            "instructions": "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn sau:",
            "paragraph": "Lifelong learning refers to the continuous pursuit of knowledge and skills throughout a person's life. As techno[logy] and indust[ries] change rapi[dly], individuals mu[st] upd[ate] their abili[ties] to rema[in] competitive. Lear[ning] new ski[lls] regularly not on[ly] improves career opportunities but also contributes to personal growth and confidence. Online courses, digital libraries, and educational platforms make learning more accessible than ever before. A commitment to lifelong learning encourages curiosity and adaptability. People who continue learning are better prepared to face new challenges in a constantly evolving world.",
            "blanks": [
              {
                "id": "read10_m2_t1_b1",
                "prefix": "techno",
                "missing": "logy",
                "full": "technology"
              },
              {
                "id": "read10_m2_t1_b2",
                "prefix": "indust",
                "missing": "ries",
                "full": "industries"
              },
              {
                "id": "read10_m2_t1_b3",
                "prefix": "rapi",
                "missing": "dly",
                "full": "rapidly"
              },
              {
                "id": "read10_m2_t1_b4",
                "prefix": "mu",
                "missing": "st",
                "full": "must"
              },
              {
                "id": "read10_m2_t1_b5",
                "prefix": "upd",
                "missing": "ate",
                "full": "update"
              },
              {
                "id": "read10_m2_t1_b6",
                "prefix": "abili",
                "missing": "ties",
                "full": "abilities"
              },
              {
                "id": "read10_m2_t1_b7",
                "prefix": "rema",
                "missing": "in",
                "full": "remain"
              },
              {
                "id": "read10_m2_t1_b8",
                "prefix": "Lear",
                "missing": "ning",
                "full": "Learning"
              },
              {
                "id": "read10_m2_t1_b9",
                "prefix": "ski",
                "missing": "lls",
                "full": "skills"
              },
              {
                "id": "read10_m2_t1_b10",
                "prefix": "on",
                "missing": "ly",
                "full": "only"
              }
            ]
          }
        },
        {
          "id": "read10_m2_t2",
          "title": "Task 2: Read a SMS Reminder from Doctor's Office (Dental Appointment)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Medical Office SMS",
            "passage": "This is a reminder that you have a dental appointment scheduled for Monday at 10:30 a.m. Please plan to arrive at least 10 minutes early to complete the check-in process. If you need to reschedule, call our office by tomorrow afternoon. Failure to cancel in advance may result in a small fee. We look forward to seeing you.",
            "questions": [
              {
                "id": "read10_m2_q11",
                "type": "multiple_choice",
                "prompt": "What is the purpose of the message?",
                "options": {
                  "A": "To send test results",
                  "B": "To confirm an appointment",
                  "C": "To suggest a treatment",
                  "D": "To announce a new clinic"
                },
                "correct_answer": "B",
                "explanation": "Nội dung tin nhắn yêu cầu người nhận liên hệ phòng khám trước chiều mai nếu cần đổi lịch hẹn (\"If you need to reschedule, call our office by tomorrow afternoon\")."
              },
              {
                "id": "read10_m2_q12",
                "type": "multiple_choice",
                "prompt": "What happens if the person doesn't cancel in advance?",
                "options": {
                  "A": "They will lose dental insurance",
                  "B": "They may have to pay a charge",
                  "C": "They must book online",
                  "D": "They must arrive later"
                },
                "correct_answer": "B",
                "explanation": "Bệnh nhân được dặn đến sớm ít nhất 10 phút để hoàn tất thủ tục đăng ký khám (\"arrive at least 10 minutes early to complete the check-in process\")."
              }
            ]
          }
        },
        {
          "id": "read10_m2_t3",
          "title": "Task 3: Read a Store Receipt Message (Return Policy)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Store Policy Notice",
            "passage": "Thank you for shopping with us. This receipt confirms your purchase of three items: a hardcover notebook, a pack of gel pens, and a reusable stainless-steel water bottle. If you wish to return any product, please note that returns are accepted only within 14 days of purchase, provided the items remain unused and in their original packaging. Refunds will be processed using the same payment method selected at checkout. Please retain this receipt as proof of purchase. If you have any questions, you may contact customer service for assistance.",
            "questions": [
              {
                "id": "read10_m2_q13",
                "type": "multiple_choice",
                "prompt": "What does the message mainly explain?",
                "options": {
                  "A": "How to contact customer service",
                  "B": "The store's return policy",
                  "C": "How to use the items",
                  "D": "How to get store discounts"
                },
                "correct_answer": "B",
                "explanation": "Hóa đơn xác nhận việc mua ba món đồ: một cuốn sổ tay bìa cứng, một gói bút gel và một bình nước thép không gỉ (\"a pack of gel pens\")."
              },
              {
                "id": "read10_m2_q14",
                "type": "multiple_choice",
                "prompt": "What did the customer buy?",
                "options": {
                  "A": "Clothing items",
                  "B": "Electronics",
                  "C": "Stationery and a bottle",
                  "D": "Only one item"
                },
                "correct_answer": "C",
                "explanation": "Chính sách hoàn trả quy định rõ ràng rằng sản phẩm chỉ được đổi trả trong vòng 14 ngày kể từ ngày mua kèm hóa đơn gốc và trong tình trạng ban đầu (\"within 14 days of purchase\")."
              },
              {
                "id": "read10_m2_q15",
                "type": "multiple_choice",
                "prompt": "Why is the customer advised to keep the receipt?",
                "options": {
                  "A": "To exchange the items for different colors",
                  "B": "To show proof of purchase for returns",
                  "C": "To receive a future discount",
                  "D": "To register the products online"
                },
                "correct_answer": "B",
                "explanation": "Nếu khách hàng làm mất hóa đơn gốc hoặc quá thời hạn 14 ngày thì cửa hàng sẽ không chấp nhận hoàn trả sản phẩm."
              }
            ]
          }
        },
        {
          "id": "read10_m2_t4",
          "title": "Task 4: Academic Reading (The Role of Sleep in Memory Consolidation)",
          "task_type": "read_academic",
          "content": {
            "academic_area": "Neuroscience / Cognitive Psychology",
            "passage": "Sleep plays a fundamental role in memory consolidation, the process through which newly acquired information is stabilized and stored in the brain. During sleep, particularly in specific stages such as deep sleep and rapid eye movement (REM) sleep, the brain reactivates patterns of neural activity that occurred during waking hours. This process strengthens connections between neurons and helps transform short-term memories into long-term ones. Research indicates that both the quantity and quality of sleep are critical for effective learning. Individuals who do not get enough sleep often experience difficulties in recalling information and maintaining attention. In experimental settings, participants who were sleep-deprived performed significantly worse on cognitive tasks compared to those who had adequate rest. These findings suggest that sleep is not merely a passive state, but an active and essential component of cognitive functioning. Moreover, different types of memory appear to be influenced by different stages of sleep. For example, declarative memory, which involves facts and knowledge, is closely associated with deep sleep, while procedural memory, related to skills and actions, is linked to REM sleep. This distinction highlights the complexity of memory processes and the specialized roles that various sleep stages play. Overall, the study of sleep and memory continues to reveal important insights into how the brain processes information. Understanding these mechanisms can have practical applications in education, healthcare, and performance optimization.",
            "questions": [
              {
                "id": "read10_m2_q16",
                "type": "multiple_choice",
                "prompt": "What is the main idea of the passage?",
                "options": {
                  "A": "Sleep is unimportant for learning",
                  "B": "Memory is only formed during waking hours",
                  "C": "Sleep is essential for memory consolidation and cognitive function",
                  "D": "REM sleep is the only important stage"
                },
                "correct_answer": "C",
                "explanation": "Ý chính của bài đọc: Giấc ngủ đóng vai trò thiết yếu trong việc củng cố, ổn định và lưu giữ các ký ức mới vào não bộ (\"Sleep is essential for stabilizing and organizing memories\")."
              },
              {
                "id": "read10_m2_q17",
                "type": "multiple_choice",
                "prompt": "The word \"adequate\" in the passage is closest in meaning to",
                "options": {
                  "A": "insufficient",
                  "B": "excessive",
                  "C": "enough",
                  "D": "unusual"
                },
                "correct_answer": "C",
                "explanation": "Từ \"reactivates\" mang nghĩa kích hoạt lại, tái hiện lại, đồng nghĩa với \"replays\" / \"triggers again\"."
              },
              {
                "id": "read10_m2_q18",
                "type": "multiple_choice",
                "prompt": "What can be inferred about sleep deprivation?",
                "options": {
                  "A": "It enhances memory performance",
                  "B": "It undermines cognitive abilities",
                  "C": "It has no measurable impact",
                  "D": "It makes it difficult to sleep later"
                },
                "correct_answer": "B",
                "explanation": "Trong các giai đoạn ngủ sâu và ngủ REM, các mạng lưới thần kinh tái kích hoạt thông tin mới để chuyển dần từ lưu trữ ngắn hạn sang dài hạn."
              },
              {
                "id": "read10_m2_q19",
                "type": "multiple_choice",
                "prompt": "What is the relationship between the third and fourth paragraphs?",
                "options": {
                  "A": "The fourth paragraph summarizes and broadens the implications of the third",
                  "B": "The fourth paragraph contradicts the third",
                  "C": "The third paragraph introduces a problem that the fourth solves",
                  "D": "The paragraphs are unrelated"
                },
                "correct_answer": "A",
                "explanation": "Đoạn thứ hai giải thích chi tiết cơ chế thần kinh củng cố ký ức diễn ra như thế nào trong suốt giấc ngủ."
              },
              {
                "id": "read10_m2_q20",
                "type": "multiple_choice",
                "prompt": "Which of the following is NOT mentioned in the passage as a role or effect of sleep?",
                "options": {
                  "A": "Strengthening neural connections involved in memory",
                  "B": "Helping transform short-term memories into long-term ones",
                  "C": "Improving physical strength and muscle recovery",
                  "D": "Supporting attention and information recall"
                },
                "correct_answer": "C",
                "explanation": "Thiếu ngủ làm gián đoạn quá trình củng cố ký ức, khiến khả năng ghi nhớ và học tập suy giảm nghiêm trọng."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const readingTest11 = {
  "id": "reading-practice-11",
  "title": "Reading Practice Test 11 (TOEFL 2026 - Healthy Nutrition & Collective Memory)",
  "skill": "reading",
  "is_default": true,
  "duration_seconds": 1800,
  "description": "Bộ đề TOEFL iBT 2026 Multistage Adaptive (YouTube Practice 10): Module 1 (Healthy Eating, Campus Cafeteria, Shipping Update, Cultural Diffusion) & Module 2 (Public Transit, Travel Blog, Tutor Message, Collective Memory).",
  "stages": [
    {
      "id": "read11_stage_1",
      "title": "Reading - Module 1 (Stage 1)",
      "duration_seconds": 900,
      "description": "Module 1 gồm 4 phần (20 câu hỏi). Hãy hoàn thành trước khi hết 15 phút.",
      "tasks": [
        {
          "id": "read11_m1_t1",
          "title": "Task 1: Complete the Words (Đoạn 1 - Healthy Eating Habits)",
          "task_type": "complete_words",
          "content": {
            "instructions": "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn sau:",
            "paragraph": "Healthy eating habits contribute significantly to long-term physical and mental well-being. Balanced die[ts] provide essen[tial] nutrients th[at] support ene[rgy] levels, immu[ne] function, a[nd] overall he[alth]. Excessive consu[mption] of proce[ssed] foods, su[gar], and unhealthy fats can lead to chronic diseases such as diabetes and heart conditions. Awareness of nutrition helps individuals make informed food choices. Developing consistent healthy eating routines reduces health risks and improves quality of life. Proper nutrition also supports concentration, mood stability, and productivity in daily activities.",
            "blanks": [
              {
                "id": "read11_m1_t1_b1",
                "prefix": "die",
                "missing": "ts",
                "full": "diets"
              },
              {
                "id": "read11_m1_t1_b2",
                "prefix": "essen",
                "missing": "tial",
                "full": "essential"
              },
              {
                "id": "read11_m1_t1_b3",
                "prefix": "th",
                "missing": "at",
                "full": "that"
              },
              {
                "id": "read11_m1_t1_b4",
                "prefix": "ene",
                "missing": "rgy",
                "full": "energy"
              },
              {
                "id": "read11_m1_t1_b5",
                "prefix": "immu",
                "missing": "ne",
                "full": "immune"
              },
              {
                "id": "read11_m1_t1_b6",
                "prefix": "a",
                "missing": "nd",
                "full": "and"
              },
              {
                "id": "read11_m1_t1_b7",
                "prefix": "he",
                "missing": "alth",
                "full": "health"
              },
              {
                "id": "read11_m1_t1_b8",
                "prefix": "consu",
                "missing": "mption",
                "full": "consumption"
              },
              {
                "id": "read11_m1_t1_b9",
                "prefix": "proce",
                "missing": "ssed",
                "full": "processed"
              },
              {
                "id": "read11_m1_t1_b10",
                "prefix": "su",
                "missing": "gar",
                "full": "sugar"
              }
            ]
          }
        },
        {
          "id": "read11_m1_t2",
          "title": "Task 2: Read a Campus Cafeteria Notice (Menu Update)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Campus Dining Notice",
            "passage": "Due to a temporary shortage of staff, the cafeteria will provide a limited menu this week. Popular items like pasta bowls and custom sandwiches will still be available, but several specialty dishes will not be offered. We apologize for any inconvenience, and we expect to return to the full menu next Monday once additional staff members complete their training.",
            "questions": [
              {
                "id": "read11_m1_q11",
                "type": "multiple_choice",
                "prompt": "Why has the cafeteria reduced the number of food options?",
                "options": {
                  "A": "The cafeteria is undergoing renovations",
                  "B": "New employees are still in training",
                  "C": "The cafeteria has recently changed ownership",
                  "D": "Some kitchen equipment needs to be repaired"
                },
                "correct_answer": "B",
                "explanation": "Nhà ăn thông báo mở rộng các lựa chọn ăn uống lành mạnh và bổ dưỡng hơn cho sinh viên (\"introduce more nutritious options\")."
              },
              {
                "id": "read11_m1_q12",
                "type": "multiple_choice",
                "prompt": "What is the cafeteria administration expecting to happen next week?",
                "options": {
                  "A": "More specialty meals will be added gradually.",
                  "B": "Food prices will increase.",
                  "C": "The cafeteria will return to its usual menu.",
                  "D": "The cafeteria will close for maintenance."
                },
                "correct_answer": "C",
                "explanation": "Sinh viên có nhu cầu hoặc dị ứng thực phẩm có thể yêu cầu nhân viên cung cấp bảng thành phần chi tiết của các món ăn."
              }
            ]
          }
        },
        {
          "id": "read11_m1_t3",
          "title": "Task 3: Read an Online Shipping Update (Package Delivery)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Shipping Status Email",
            "passage": "Your package has left the distribution center and is currently making its way to the destination. According to the latest estimate, it should arrive sometime between Tuesday and Thursday. You can monitor its progress using the tracking link below. While most deliveries arrive on schedule, severe weather conditions or transportation disruptions may occasionally cause delays. If you expect to be unavailable during the delivery period, you may choose to have the package delivered to a nearby pickup location instead.",
            "questions": [
              {
                "id": "read11_m1_q13",
                "type": "multiple_choice",
                "prompt": "What does the notice suggest about the package?",
                "options": {
                  "A": "It has not yet been processed.",
                  "B": "It is currently being transported.",
                  "C": "It has already been delivered.",
                  "D": "It is being returned to the sender."
                },
                "correct_answer": "B",
                "explanation": "Thông báo cập nhật tình trạng đơn hàng đang được vận chuyển và dự kiến giao vào ngày làm việc tiếp theo."
              },
              {
                "id": "read11_m1_q14",
                "type": "multiple_choice",
                "prompt": "According to the notice, what could interfere with the expected arrival date?",
                "options": {
                  "A": "Technical problems with the tracking system.",
                  "B": "A shortage of delivery workers.",
                  "C": "Weather-related or transportation issues.",
                  "D": "Problems with the customer's payment."
                },
                "correct_answer": "C",
                "explanation": "Khách hàng có thể thay đổi địa chỉ giao hàng hoặc thời gian nhận thông qua cổng thông tin theo dõi trực tuyến."
              },
              {
                "id": "read11_m1_q15",
                "type": "multiple_choice",
                "prompt": "What can customers do if they are not available to receive the package?",
                "options": {
                  "A": "Cancel the shipment.",
                  "B": "Change the delivery address permanently.",
                  "C": "Request delivery to another nearby collection point.",
                  "D": "Extend the delivery period by one week."
                },
                "correct_answer": "C",
                "explanation": "Nếu không có người nhận tại nhà, bưu kiện sẽ được gửi an toàn tại bưu cục gần nhất để nhận sau."
              }
            ]
          }
        },
        {
          "id": "read11_m1_t4",
          "title": "Task 4: Academic Reading (Cultural Diffusion)",
          "task_type": "read_academic",
          "content": {
            "academic_area": "Anthropology / Sociology",
            "passage": "Cultural diffusion refers to the spread of ideas, beliefs, technologies, customs, and social practices from one society to another. This process has played a significant role throughout human history and has occurred through trade, migration, exploration, conquest, and communication. When people from different cultural backgrounds interact, they often exchange traditions, values, and knowledge that influence many aspects of daily life, including language, food, art, fashion, and social behavior. Although cultural diffusion frequently encourages innovation and broadens perspectives, it can also have negative consequences. In some situations, cultures with greater economic, political, or technological influence spread their practices more widely than others. As a result, smaller cultural groups may gradually lose traditional customs, languages, or beliefs. This trend can contribute to cultural homogenization, a process in which distinct cultural identities become less noticeable as societies adopt similar patterns and lifestyles. In the modern era, globalization has dramatically accelerated cultural diffusion. Improvements in transportation and digital technology allow information to travel across the world within seconds. Social media platforms, streaming services, and online communities enable individuals to share cultural content with international audiences almost instantly. While this increased connectivity creates opportunities for learning and cooperation, it also raises concerns about preserving cultural diversity in an increasingly interconnected world.",
            "questions": [
              {
                "id": "read11_m1_q16",
                "type": "multiple_choice",
                "prompt": "Which of the following best states the main idea of the passage?",
                "options": {
                  "A": "Cultural diffusion primarily creates negative consequences for societies",
                  "B": "Cultural diffusion spreads cultural elements and has both benefits and challenges",
                  "C": "Recently, globalization has been preventing cultural exchange",
                  "D": "Traditions usually don't change in most countries"
                },
                "correct_answer": "B",
                "explanation": "Ý chính của bài đọc: Sự khuếch tán văn hóa là quá trình các yếu tố văn hóa lan truyền từ xã hội này sang xã hội khác qua giao thương, di cư và truyền thông."
              },
              {
                "id": "read11_m1_q17",
                "type": "multiple_choice",
                "prompt": "The word \"homogenization\" in the passage is closest in meaning to",
                "options": {
                  "A": "diversification",
                  "B": "standardization",
                  "C": "isolation",
                  "D": "preservation"
                },
                "correct_answer": "B",
                "explanation": "Từ \"incorporate\" trong bài mang nghĩa kết hợp, tiếp thu các nét văn hóa mới vào nền văn hóa bản địa (\"integrate\" / \"adopt\")."
              },
              {
                "id": "read11_m1_q18",
                "type": "multiple_choice",
                "prompt": "What can be inferred from the passage about societies with less cultural influence?",
                "options": {
                  "A": "Their traditions may be more vulnerable to being replaced over time.",
                  "B": "They are unlikely to participate in cultural exchange.",
                  "C": "They benefit more from globalization than larger societies.",
                  "D": "They tend to adopt fewer technological innovations."
                },
                "correct_answer": "A",
                "explanation": "Thương mại và giao thương là một trong những phương thức chủ yếu thúc đẩy sự trao đổi văn hóa và công nghệ giữa các cộng đồng."
              },
              {
                "id": "read11_m1_q19",
                "type": "multiple_choice",
                "prompt": "According to the passage, all of the following are true EXCEPT",
                "options": {
                  "A": "Cultural diffusion can occur through migration and trade.",
                  "B": "Social media has increased the speed at which cultural content can spread.",
                  "C": "Smaller cultural groups may lose some traditional practices over time.",
                  "D": "Cultural diffusion only became possible after the development of digital technology."
                },
                "correct_answer": "D",
                "explanation": "Các xã hội tiếp nhận thường điều chỉnh những yếu tố văn hóa du nhập để phù hợp với các giá trị và tập quán truyền thống của riêng họ."
              },
              {
                "id": "read11_m1_q20",
                "type": "multiple_choice",
                "prompt": "Why does the author mention trade, migration, exploration, conquest, and communication in the first paragraph?",
                "options": {
                  "A": "To provide examples of the ways cultural diffusion occurs.",
                  "B": "To compare modern and historical societies.",
                  "C": "To identify the most effective method of spreading culture.",
                  "D": "To explain why cultural traditions disappear."
                },
                "correct_answer": "A",
                "explanation": "Quá trình khuếch tán văn hóa diễn ra hai chiều và làm phong phú thêm đời sống của cả các nền văn hóa tham gia tương tác."
              }
            ]
          }
        }
      ]
    },
    {
      "id": "read11_stage_2",
      "title": "Reading - Module 2 (Stage 2 - HARD)",
      "duration_seconds": 900,
      "description": "Module 2 gồm 4 phần (20 câu hỏi). Hãy hoàn thành trước khi hết 15 phút.",
      "tasks": [
        {
          "id": "read11_m2_t1",
          "title": "Task 1: Complete the Words (Đoạn 2 - Public Transportation)",
          "task_type": "complete_words",
          "content": {
            "instructions": "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn sau:",
            "paragraph": "Public transportation plays a key role in reducing traffic congestion, pollution, and travel costs in urban areas. Efficient sys[tems] allow la[rge] numbers o[f] people to mo[ve] quickly and reli[ably] across cit[ies]. Investments in bu[ses], trains, and subw[ays] contribute to environ[mental] sustainability by lowe[ring] the number of private vehicles on the road. Reliable transportation networks also improve access to employment, education, and healthcare. As cities grow, expanding and modernizing public transport becomes increasingly important. Well-planned systems enhance both economic activity and residents' quality of life.",
            "blanks": [
              {
                "id": "read11_m2_t1_b1",
                "prefix": "sys",
                "missing": "tems",
                "full": "systems"
              },
              {
                "id": "read11_m2_t1_b2",
                "prefix": "la",
                "missing": "rge",
                "full": "large"
              },
              {
                "id": "read11_m2_t1_b3",
                "prefix": "o",
                "missing": "f",
                "full": "of"
              },
              {
                "id": "read11_m2_t1_b4",
                "prefix": "mo",
                "missing": "ve",
                "full": "move"
              },
              {
                "id": "read11_m2_t1_b5",
                "prefix": "reli",
                "missing": "ably",
                "full": "reliably"
              },
              {
                "id": "read11_m2_t1_b6",
                "prefix": "cit",
                "missing": "ies",
                "full": "cities"
              },
              {
                "id": "read11_m2_t1_b7",
                "prefix": "bu",
                "missing": "ses",
                "full": "buses"
              },
              {
                "id": "read11_m2_t1_b8",
                "prefix": "subw",
                "missing": "ays",
                "full": "subways"
              },
              {
                "id": "read11_m2_t1_b9",
                "prefix": "environ",
                "missing": "mental",
                "full": "environmental"
              },
              {
                "id": "read11_m2_t1_b10",
                "prefix": "lowe",
                "missing": "ring",
                "full": "lowering"
              }
            ]
          }
        },
        {
          "id": "read11_m2_t2",
          "title": "Task 2: Read a Travel Blog Entry (Mountain Hiking Experience)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Travel Blog Entry",
            "passage": "Last weekend, I took a short trip to a coastal town located a couple of hours outside the city. What impressed me most was how relaxed and unspoiled the area felt compared to more popular tourist destinations. I spent much of my time browsing outdoor markets, where local craftspeople displayed handmade jewelry, ceramics, and artwork inspired by the region's history. Although the town itself was charming, getting around without a car proved somewhat inconvenient. Public transportation was infrequent, and I ended up waiting nearly an hour for the return bus. Even so, the town's quiet atmosphere and scenic surroundings more than compensated for the minor inconvenience.",
            "questions": [
              {
                "id": "read11_m2_q11",
                "type": "multiple_choice",
                "prompt": "What aspect of the trip did the writer find particularly appealing?",
                "options": {
                  "A": "The variety of entertainment options available after dark.",
                  "B": "The opportunity to explore locally produced crafts and artwork.",
                  "C": "The efficiency of the town's transportation network.",
                  "D": "The large number of modern shopping centers."
                },
                "correct_answer": "B",
                "explanation": "Tác giả bài blog chia sẻ trải nghiệm chinh phục cung đường leo núi và ngắm nhìn cảnh bình minh tuyệt đẹp từ đỉnh núi."
              },
              {
                "id": "read11_m2_q12",
                "type": "multiple_choice",
                "prompt": "Which challenge did the writer encounter during the visit?",
                "options": {
                  "A": "Reaching the town took significantly longer than expected.",
                  "B": "Accommodation costs were higher than anticipated.",
                  "C": "Popular tourist sites were overcrowded throughout the weekend.",
                  "D": "Limited transportation made traveling around the area less convenient."
                },
                "correct_answer": "D",
                "explanation": "Khó khăn lớn nhất trong chuyến đi là thời tiết lạnh giá và sương mù dày đặc vào sáng sớm."
              }
            ]
          }
        },
        {
          "id": "read11_m2_t3",
          "title": "Task 3: Read a Message from a Tutor (Session Rescheduling)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Tutor Advisory Notice",
            "passage": "Hello, Mark. This is your Science tutor with an update regarding our scheduled meeting. Due to a professional development workshop that I have been asked to attend tomorrow afternoon, I need to reschedule your appointment. Instead of meeting at 2:00 p.m., we'll meet at 4:00 p.m. in Room 314 as originally planned. If this revised time creates any conflicts with your schedule, please contact me at your earliest convenience so that we can discuss alternative arrangements.",
            "questions": [
              {
                "id": "read11_m2_q13",
                "type": "multiple_choice",
                "prompt": "What is the main purpose of the message?",
                "options": {
                  "A": "To explain changes to a classroom location.",
                  "B": "To notify a student about a scheduling change.",
                  "C": "To provide details about an upcoming workshop.",
                  "D": "To introduce a new tutoring program."
                },
                "correct_answer": "B",
                "explanation": "Gia sư gửi tin nhắn để thông báo về việc dời buổi học phụ đạo sang một khung giờ khác do có lịch đột xuất."
              },
              {
                "id": "read11_m2_q14",
                "type": "multiple_choice",
                "prompt": "What does the tutor ask the student to do if the new arrangement is unsuitable?",
                "options": {
                  "A": "Contact the department office to request a different room.",
                  "B": "Attend the session remotely instead.",
                  "C": "Contact the tutor to discuss other possible options.",
                  "D": "Arrive earlier and wait until the tutor is available."
                },
                "correct_answer": "C",
                "explanation": "Sinh viên được yêu cầu chuẩn bị trước các câu hỏi và bài tập chưa hiểu để buổi học diễn ra hiệu quả hơn."
              },
              {
                "id": "read11_m2_q15",
                "type": "multiple_choice",
                "prompt": "What can be inferred from the message?",
                "options": {
                  "A": "The tutor expects the workshop to end before 4:00 p.m.",
                  "B": "The meeting will take place online instead of in person.",
                  "C": "The student previously requested a different appointment time.",
                  "D": "The tutor will be unavailable for the rest of the week."
                },
                "correct_answer": "A",
                "explanation": "Buổi học bù sẽ được tổ chức qua phòng học trực tuyến nếu sinh viên không thể đến gặp trực tiếp."
              }
            ]
          }
        },
        {
          "id": "read11_m2_t4",
          "title": "Task 4: Academic Reading (Collective Memory and Social Identity)",
          "task_type": "read_academic",
          "content": {
            "academic_area": "Sociology / Social Psychology",
            "passage": "Collective memory refers to the shared understanding of the past held by a group, community, or society. Unlike individual memory, which is based on personal experiences, collective memory is shaped through stories, traditions, education, and public commemorations. Historical events that become part of a society's collective memory often influence how people understand their identity and their relationship to others. The formation of collective memory is not always a straightforward process. Different groups may remember the same event in different ways depending on their experiences and perspectives. Governments, educational institutions, and media organizations can also play a role in determining which events receive greater attention and how they are interpreted. As a result, collective memory is often selective rather than completely objective. Despite these limitations, collective memory serves important social functions. Shared memories can strengthen social bonds and provide communities with a sense of continuity across generations. At the same time, disagreements about historical events may lead to debates about how the past should be represented. Consequently, collective memory is best understood not as a perfect record of history but as an evolving interpretation of it.",
            "questions": [
              {
                "id": "read11_m2_q16",
                "type": "multiple_choice",
                "prompt": "Which of the following best states the main idea of the passage?",
                "options": {
                  "A": "Collective memory is an inaccurate form of historical record.",
                  "B": "Governments control all public understanding of history.",
                  "C": "Collective memory influences societies and is shaped by multiple factors.",
                  "D": "Historical events are generally remembered in the same way by all groups."
                },
                "correct_answer": "C",
                "explanation": "Ý chính của bài đọc: Ký ức tập thể là sự chia sẻ và ghi nhớ chung về quá khứ của một cộng đồng, định hình nên bản sắc xã hội của họ."
              },
              {
                "id": "read11_m2_q17",
                "type": "multiple_choice",
                "prompt": "The word \"continuity\" in the passage is closest in meaning to",
                "options": {
                  "A": "conflict",
                  "B": "stability",
                  "C": "uncertainty",
                  "D": "separation"
                },
                "correct_answer": "B",
                "explanation": "Từ \"transmitted\" nghĩa là truyền đạt, lưu truyền qua nhiều thế hệ (\"passed down\" / \"communicated\")."
              },
              {
                "id": "read11_m2_q18",
                "type": "multiple_choice",
                "prompt": "According to the passage, all of the following influence collective memory EXCEPT",
                "options": {
                  "A": "education",
                  "B": "public commemorations",
                  "C": "media organizations",
                  "D": "genetic inheritance"
                },
                "correct_answer": "D",
                "explanation": "Các di tích, lễ kỷ niệm và viện bảo tàng đóng vai trò duy trì và tái hiện ký ức tập thể trong ý thức cộng đồng."
              },
              {
                "id": "read11_m2_q19",
                "type": "multiple_choice",
                "prompt": "What is the relationship between paragraphs 2 and 3?",
                "options": {
                  "A": "Paragraph 3 discusses ways of eliminating the limitations described in paragraph 2 and shows the result it can lead to.",
                  "B": "Paragraph 3 contradicts the claim made in paragraph 2.",
                  "C": "Paragraph 3 explains the historical origins of the issues discussed in paragraph 2.",
                  "D": "Paragraph 3 acknowledges the limitations described in paragraph 2 and discusses the functions of the same concept."
                },
                "correct_answer": "D",
                "explanation": "Ký ức tập thể có thể được chọn lọc và diễn giải lại theo thời gian nhằm phục vụ các mục tiêu gắn kết xã hội hiện tại."
              },
              {
                "id": "read11_m2_q20",
                "type": "multiple_choice",
                "prompt": "Which of the following best expresses the essential information in the following sentence? Consequently, collective memory is best understood not as a perfect record of history but as an evolving interpretation of it.",
                "options": {
                  "A": "Collective memory provides a completely accurate account of historical events.",
                  "B": "Collective memory changes over time and reflects how people interpret the past.",
                  "C": "Collective memory becomes less important as societies develop.",
                  "D": "Collective memory is based entirely on personal experiences rather than shared events."
                },
                "correct_answer": "B",
                "explanation": "Ký ức tập thể khác với ký ức cá nhân ở chỗ nó phản ánh quan điểm chung được chia sẻ rộng rãi trong một nhóm xã hội."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const readingTest12 = {
  "id": "reading-practice-12",
  "title": "Reading Practice Test 12 (TOEFL 2026 - Healthy Nutrition & Collective Memory - Set B)",
  "skill": "reading",
  "is_default": true,
  "duration_seconds": 1800,
  "description": "Bộ đề TOEFL iBT 2026 Multistage Adaptive (YouTube Practice 11 - Trùng đề Practice 10): Module 1 (Healthy Eating, Campus Cafeteria, Shipping Update, Cultural Diffusion) & Module 2 (Public Transit, Travel Blog, Tutor Message, Collective Memory).",
  "stages": [
    {
      "id": "read12_stage_1",
      "title": "Reading - Module 1 (Stage 1)",
      "duration_seconds": 900,
      "description": "Module 1 gồm 4 phần (20 câu hỏi). Hãy hoàn thành trước khi hết 15 phút.",
      "tasks": [
        {
          "id": "read12_m1_t1",
          "title": "Task 1: Complete the Words (Đoạn 1 - Healthy Eating Habits)",
          "task_type": "complete_words",
          "content": {
            "instructions": "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn sau:",
            "paragraph": "Healthy eating habits contribute significantly to long-term physical and mental well-being. Balanced die[ts] provide essen[tial] nutrients th[at] support ene[rgy] levels, immu[ne] function, a[nd] overall he[alth]. Excessive consu[mption] of proce[ssed] foods, su[gar], and unhealthy fats can lead to chronic diseases such as diabetes and heart conditions. Awareness of nutrition helps individuals make informed food choices. Developing consistent healthy eating routines reduces health risks and improves quality of life. Proper nutrition also supports concentration, mood stability, and productivity in daily activities.",
            "blanks": [
              {
                "id": "read12_m1_t1_b1",
                "prefix": "die",
                "missing": "ts",
                "full": "diets"
              },
              {
                "id": "read12_m1_t1_b2",
                "prefix": "essen",
                "missing": "tial",
                "full": "essential"
              },
              {
                "id": "read12_m1_t1_b3",
                "prefix": "th",
                "missing": "at",
                "full": "that"
              },
              {
                "id": "read12_m1_t1_b4",
                "prefix": "ene",
                "missing": "rgy",
                "full": "energy"
              },
              {
                "id": "read12_m1_t1_b5",
                "prefix": "immu",
                "missing": "ne",
                "full": "immune"
              },
              {
                "id": "read12_m1_t1_b6",
                "prefix": "a",
                "missing": "nd",
                "full": "and"
              },
              {
                "id": "read12_m1_t1_b7",
                "prefix": "he",
                "missing": "alth",
                "full": "health"
              },
              {
                "id": "read12_m1_t1_b8",
                "prefix": "consu",
                "missing": "mption",
                "full": "consumption"
              },
              {
                "id": "read12_m1_t1_b9",
                "prefix": "proce",
                "missing": "ssed",
                "full": "processed"
              },
              {
                "id": "read12_m1_t1_b10",
                "prefix": "su",
                "missing": "gar",
                "full": "sugar"
              }
            ]
          }
        },
        {
          "id": "read12_m1_t2",
          "title": "Task 2: Read a Campus Cafeteria Notice (Menu Update)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Campus Dining Notice",
            "passage": "Due to a temporary shortage of staff, the cafeteria will provide a limited menu this week. Popular items like pasta bowls and custom sandwiches will still be available, but several specialty dishes will not be offered. We apologize for any inconvenience, and we expect to return to the full menu next Monday once additional staff members complete their training.",
            "questions": [
              {
                "id": "read12_m1_q11",
                "type": "multiple_choice",
                "prompt": "Why has the cafeteria reduced the number of food options?",
                "options": {
                  "A": "The cafeteria is undergoing renovations",
                  "B": "New employees are still in training",
                  "C": "The cafeteria has recently changed ownership",
                  "D": "Some kitchen equipment needs to be repaired"
                },
                "correct_answer": "B",
                "explanation": "Nhà ăn thông báo mở rộng các lựa chọn ăn uống lành mạnh và bổ dưỡng hơn cho sinh viên (\"introduce more nutritious options\")."
              },
              {
                "id": "read12_m1_q12",
                "type": "multiple_choice",
                "prompt": "What is the cafeteria administration expecting to happen next week?",
                "options": {
                  "A": "More specialty meals will be added gradually.",
                  "B": "Food prices will increase.",
                  "C": "The cafeteria will return to its usual menu.",
                  "D": "The cafeteria will close for maintenance."
                },
                "correct_answer": "C",
                "explanation": "Sinh viên có nhu cầu hoặc dị ứng thực phẩm có thể yêu cầu nhân viên cung cấp bảng thành phần chi tiết của các món ăn."
              }
            ]
          }
        },
        {
          "id": "read12_m1_t3",
          "title": "Task 3: Read an Online Shipping Update (Package Delivery)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Shipping Status Email",
            "passage": "Your package has left the distribution center and is currently making its way to the destination. According to the latest estimate, it should arrive sometime between Tuesday and Thursday. You can monitor its progress using the tracking link below. While most deliveries arrive on schedule, severe weather conditions or transportation disruptions may occasionally cause delays. If you expect to be unavailable during the delivery period, you may choose to have the package delivered to a nearby pickup location instead.",
            "questions": [
              {
                "id": "read12_m1_q13",
                "type": "multiple_choice",
                "prompt": "What does the notice suggest about the package?",
                "options": {
                  "A": "It has not yet been processed.",
                  "B": "It is currently being transported.",
                  "C": "It has already been delivered.",
                  "D": "It is being returned to the sender."
                },
                "correct_answer": "B",
                "explanation": "Thông báo cập nhật tình trạng đơn hàng đang được vận chuyển và dự kiến giao vào ngày làm việc tiếp theo."
              },
              {
                "id": "read12_m1_q14",
                "type": "multiple_choice",
                "prompt": "According to the notice, what could interfere with the expected arrival date?",
                "options": {
                  "A": "Technical problems with the tracking system.",
                  "B": "A shortage of delivery workers.",
                  "C": "Weather-related or transportation issues.",
                  "D": "Problems with the customer's payment."
                },
                "correct_answer": "C",
                "explanation": "Khách hàng có thể thay đổi địa chỉ giao hàng hoặc thời gian nhận thông qua cổng thông tin theo dõi trực tuyến."
              },
              {
                "id": "read12_m1_q15",
                "type": "multiple_choice",
                "prompt": "What can customers do if they are not available to receive the package?",
                "options": {
                  "A": "Cancel the shipment.",
                  "B": "Change the delivery address permanently.",
                  "C": "Request delivery to another nearby collection point.",
                  "D": "Extend the delivery period by one week."
                },
                "correct_answer": "C",
                "explanation": "Nếu không có người nhận tại nhà, bưu kiện sẽ được gửi an toàn tại bưu cục gần nhất để nhận sau."
              }
            ]
          }
        },
        {
          "id": "read12_m1_t4",
          "title": "Task 4: Academic Reading (Cultural Diffusion)",
          "task_type": "read_academic",
          "content": {
            "academic_area": "Anthropology / Sociology",
            "passage": "Cultural diffusion refers to the spread of ideas, beliefs, technologies, customs, and social practices from one society to another. This process has played a significant role throughout human history and has occurred through trade, migration, exploration, conquest, and communication. When people from different cultural backgrounds interact, they often exchange traditions, values, and knowledge that influence many aspects of daily life, including language, food, art, fashion, and social behavior. Although cultural diffusion frequently encourages innovation and broadens perspectives, it can also have negative consequences. In some situations, cultures with greater economic, political, or technological influence spread their practices more widely than others. As a result, smaller cultural groups may gradually lose traditional customs, languages, or beliefs. This trend can contribute to cultural homogenization, a process in which distinct cultural identities become less noticeable as societies adopt similar patterns and lifestyles. In the modern era, globalization has dramatically accelerated cultural diffusion. Improvements in transportation and digital technology allow information to travel across the world within seconds. Social media platforms, streaming services, and online communities enable individuals to share cultural content with international audiences almost instantly. While this increased connectivity creates opportunities for learning and cooperation, it also raises concerns about preserving cultural diversity in an increasingly interconnected world.",
            "questions": [
              {
                "id": "read12_m1_q16",
                "type": "multiple_choice",
                "prompt": "Which of the following best states the main idea of the passage?",
                "options": {
                  "A": "Cultural diffusion primarily creates negative consequences for societies",
                  "B": "Cultural diffusion spreads cultural elements and has both benefits and challenges",
                  "C": "Recently, globalization has been preventing cultural exchange",
                  "D": "Traditions usually don't change in most countries"
                },
                "correct_answer": "B",
                "explanation": "Ý chính của bài đọc: Sự khuếch tán văn hóa là quá trình các yếu tố văn hóa lan truyền từ xã hội này sang xã hội khác qua giao thương, di cư và truyền thông."
              },
              {
                "id": "read12_m1_q17",
                "type": "multiple_choice",
                "prompt": "The word \"homogenization\" in the passage is closest in meaning to",
                "options": {
                  "A": "diversification",
                  "B": "standardization",
                  "C": "isolation",
                  "D": "preservation"
                },
                "correct_answer": "B",
                "explanation": "Từ \"incorporate\" trong bài mang nghĩa kết hợp, tiếp thu các nét văn hóa mới vào nền văn hóa bản địa (\"integrate\" / \"adopt\")."
              },
              {
                "id": "read12_m1_q18",
                "type": "multiple_choice",
                "prompt": "What can be inferred from the passage about societies with less cultural influence?",
                "options": {
                  "A": "Their traditions may be more vulnerable to being replaced over time.",
                  "B": "They are unlikely to participate in cultural exchange.",
                  "C": "They benefit more from globalization than larger societies.",
                  "D": "They tend to adopt fewer technological innovations."
                },
                "correct_answer": "A",
                "explanation": "Thương mại và giao thương là một trong những phương thức chủ yếu thúc đẩy sự trao đổi văn hóa và công nghệ giữa các cộng đồng."
              },
              {
                "id": "read12_m1_q19",
                "type": "multiple_choice",
                "prompt": "According to the passage, all of the following are true EXCEPT",
                "options": {
                  "A": "Cultural diffusion can occur through migration and trade.",
                  "B": "Social media has increased the speed at which cultural content can spread.",
                  "C": "Smaller cultural groups may lose some traditional practices over time.",
                  "D": "Cultural diffusion only became possible after the development of digital technology."
                },
                "correct_answer": "D",
                "explanation": "Các xã hội tiếp nhận thường điều chỉnh những yếu tố văn hóa du nhập để phù hợp với các giá trị và tập quán truyền thống của riêng họ."
              },
              {
                "id": "read12_m1_q20",
                "type": "multiple_choice",
                "prompt": "Why does the author mention trade, migration, exploration, conquest, and communication in the first paragraph?",
                "options": {
                  "A": "To provide examples of the ways cultural diffusion occurs.",
                  "B": "To compare modern and historical societies.",
                  "C": "To identify the most effective method of spreading culture.",
                  "D": "To explain why cultural traditions disappear."
                },
                "correct_answer": "A",
                "explanation": "Quá trình khuếch tán văn hóa diễn ra hai chiều và làm phong phú thêm đời sống của cả các nền văn hóa tham gia tương tác."
              }
            ]
          }
        }
      ]
    },
    {
      "id": "read12_stage_2",
      "title": "Reading - Module 2 (Stage 2 - HARD)",
      "duration_seconds": 900,
      "description": "Module 2 gồm 4 phần (20 câu hỏi). Hãy hoàn thành trước khi hết 15 phút.",
      "tasks": [
        {
          "id": "read12_m2_t1",
          "title": "Task 1: Complete the Words (Đoạn 2 - Public Transportation)",
          "task_type": "complete_words",
          "content": {
            "instructions": "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn sau:",
            "paragraph": "Public transportation plays a key role in reducing traffic congestion, pollution, and travel costs in urban areas. Efficient sys[tems] allow la[rge] numbers o[f] people to mo[ve] quickly and reli[ably] across cit[ies]. Investments in bu[ses], trains, and subw[ays] contribute to environ[mental] sustainability by lowe[ring] the number of private vehicles on the road. Reliable transportation networks also improve access to employment, education, and healthcare. As cities grow, expanding and modernizing public transport becomes increasingly important. Well-planned systems enhance both economic activity and residents' quality of life.",
            "blanks": [
              {
                "id": "read12_m2_t1_b1",
                "prefix": "sys",
                "missing": "tems",
                "full": "systems"
              },
              {
                "id": "read12_m2_t1_b2",
                "prefix": "la",
                "missing": "rge",
                "full": "large"
              },
              {
                "id": "read12_m2_t1_b3",
                "prefix": "o",
                "missing": "f",
                "full": "of"
              },
              {
                "id": "read12_m2_t1_b4",
                "prefix": "mo",
                "missing": "ve",
                "full": "move"
              },
              {
                "id": "read12_m2_t1_b5",
                "prefix": "reli",
                "missing": "ably",
                "full": "reliably"
              },
              {
                "id": "read12_m2_t1_b6",
                "prefix": "cit",
                "missing": "ies",
                "full": "cities"
              },
              {
                "id": "read12_m2_t1_b7",
                "prefix": "bu",
                "missing": "ses",
                "full": "buses"
              },
              {
                "id": "read12_m2_t1_b8",
                "prefix": "subw",
                "missing": "ays",
                "full": "subways"
              },
              {
                "id": "read12_m2_t1_b9",
                "prefix": "environ",
                "missing": "mental",
                "full": "environmental"
              },
              {
                "id": "read12_m2_t1_b10",
                "prefix": "lowe",
                "missing": "ring",
                "full": "lowering"
              }
            ]
          }
        },
        {
          "id": "read12_m2_t2",
          "title": "Task 2: Read a Travel Blog Entry (Mountain Hiking Experience)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Travel Blog Entry",
            "passage": "Last weekend, I took a short trip to a coastal town located a couple of hours outside the city. What impressed me most was how relaxed and unspoiled the area felt compared to more popular tourist destinations. I spent much of my time browsing outdoor markets, where local craftspeople displayed handmade jewelry, ceramics, and artwork inspired by the region's history. Although the town itself was charming, getting around without a car proved somewhat inconvenient. Public transportation was infrequent, and I ended up waiting nearly an hour for the return bus. Even so, the town's quiet atmosphere and scenic surroundings more than compensated for the minor inconvenience.",
            "questions": [
              {
                "id": "read12_m2_q11",
                "type": "multiple_choice",
                "prompt": "What aspect of the trip did the writer find particularly appealing?",
                "options": {
                  "A": "The variety of entertainment options available after dark.",
                  "B": "The opportunity to explore locally produced crafts and artwork.",
                  "C": "The efficiency of the town's transportation network.",
                  "D": "The large number of modern shopping centers."
                },
                "correct_answer": "B",
                "explanation": "Tác giả bài blog chia sẻ trải nghiệm chinh phục cung đường leo núi và ngắm nhìn cảnh bình minh tuyệt đẹp từ đỉnh núi."
              },
              {
                "id": "read12_m2_q12",
                "type": "multiple_choice",
                "prompt": "Which challenge did the writer encounter during the visit?",
                "options": {
                  "A": "Reaching the town took significantly longer than expected.",
                  "B": "Accommodation costs were higher than anticipated.",
                  "C": "Popular tourist sites were overcrowded throughout the weekend.",
                  "D": "Limited transportation made traveling around the area less convenient."
                },
                "correct_answer": "D",
                "explanation": "Khó khăn lớn nhất trong chuyến đi là thời tiết lạnh giá và sương mù dày đặc vào sáng sớm."
              }
            ]
          }
        },
        {
          "id": "read12_m2_t3",
          "title": "Task 3: Read a Message from a Tutor (Session Rescheduling)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Tutor Advisory Notice",
            "passage": "Hello, Mark. This is your Science tutor with an update regarding our scheduled meeting. Due to a professional development workshop that I have been asked to attend tomorrow afternoon, I need to reschedule your appointment. Instead of meeting at 2:00 p.m., we'll meet at 4:00 p.m. in Room 314 as originally planned. If this revised time creates any conflicts with your schedule, please contact me at your earliest convenience so that we can discuss alternative arrangements.",
            "questions": [
              {
                "id": "read12_m2_q13",
                "type": "multiple_choice",
                "prompt": "What is the main purpose of the message?",
                "options": {
                  "A": "To explain changes to a classroom location.",
                  "B": "To notify a student about a scheduling change.",
                  "C": "To provide details about an upcoming workshop.",
                  "D": "To introduce a new tutoring program."
                },
                "correct_answer": "B",
                "explanation": "Gia sư gửi tin nhắn để thông báo về việc dời buổi học phụ đạo sang một khung giờ khác do có lịch đột xuất."
              },
              {
                "id": "read12_m2_q14",
                "type": "multiple_choice",
                "prompt": "What does the tutor ask the student to do if the new arrangement is unsuitable?",
                "options": {
                  "A": "Contact the department office to request a different room.",
                  "B": "Attend the session remotely instead.",
                  "C": "Contact the tutor to discuss other possible options.",
                  "D": "Arrive earlier and wait until the tutor is available."
                },
                "correct_answer": "C",
                "explanation": "Sinh viên được yêu cầu chuẩn bị trước các câu hỏi và bài tập chưa hiểu để buổi học diễn ra hiệu quả hơn."
              },
              {
                "id": "read12_m2_q15",
                "type": "multiple_choice",
                "prompt": "What can be inferred from the message?",
                "options": {
                  "A": "The tutor expects the workshop to end before 4:00 p.m.",
                  "B": "The meeting will take place online instead of in person.",
                  "C": "The student previously requested a different appointment time.",
                  "D": "The tutor will be unavailable for the rest of the week."
                },
                "correct_answer": "A",
                "explanation": "Buổi học bù sẽ được tổ chức qua phòng học trực tuyến nếu sinh viên không thể đến gặp trực tiếp."
              }
            ]
          }
        },
        {
          "id": "read12_m2_t4",
          "title": "Task 4: Academic Reading (Collective Memory and Social Identity)",
          "task_type": "read_academic",
          "content": {
            "academic_area": "Sociology / Social Psychology",
            "passage": "Collective memory refers to the shared understanding of the past held by a group, community, or society. Unlike individual memory, which is based on personal experiences, collective memory is shaped through stories, traditions, education, and public commemorations. Historical events that become part of a society's collective memory often influence how people understand their identity and their relationship to others. The formation of collective memory is not always a straightforward process. Different groups may remember the same event in different ways depending on their experiences and perspectives. Governments, educational institutions, and media organizations can also play a role in determining which events receive greater attention and how they are interpreted. As a result, collective memory is often selective rather than completely objective. Despite these limitations, collective memory serves important social functions. Shared memories can strengthen social bonds and provide communities with a sense of continuity across generations. At the same time, disagreements about historical events may lead to debates about how the past should be represented. Consequently, collective memory is best understood not as a perfect record of history but as an evolving interpretation of it.",
            "questions": [
              {
                "id": "read12_m2_q16",
                "type": "multiple_choice",
                "prompt": "Which of the following best states the main idea of the passage?",
                "options": {
                  "A": "Collective memory is an inaccurate form of historical record.",
                  "B": "Governments control all public understanding of history.",
                  "C": "Collective memory influences societies and is shaped by multiple factors.",
                  "D": "Historical events are generally remembered in the same way by all groups."
                },
                "correct_answer": "C",
                "explanation": "Ý chính của bài đọc: Ký ức tập thể là sự chia sẻ và ghi nhớ chung về quá khứ của một cộng đồng, định hình nên bản sắc xã hội của họ."
              },
              {
                "id": "read12_m2_q17",
                "type": "multiple_choice",
                "prompt": "The word \"continuity\" in the passage is closest in meaning to",
                "options": {
                  "A": "conflict",
                  "B": "stability",
                  "C": "uncertainty",
                  "D": "separation"
                },
                "correct_answer": "B",
                "explanation": "Từ \"transmitted\" nghĩa là truyền đạt, lưu truyền qua nhiều thế hệ (\"passed down\" / \"communicated\")."
              },
              {
                "id": "read12_m2_q18",
                "type": "multiple_choice",
                "prompt": "According to the passage, all of the following influence collective memory EXCEPT",
                "options": {
                  "A": "education",
                  "B": "public commemorations",
                  "C": "media organizations",
                  "D": "genetic inheritance"
                },
                "correct_answer": "D",
                "explanation": "Các di tích, lễ kỷ niệm và viện bảo tàng đóng vai trò duy trì và tái hiện ký ức tập thể trong ý thức cộng đồng."
              },
              {
                "id": "read12_m2_q19",
                "type": "multiple_choice",
                "prompt": "What is the relationship between paragraphs 2 and 3?",
                "options": {
                  "A": "Paragraph 3 discusses ways of eliminating the limitations described in paragraph 2 and shows the result it can lead to.",
                  "B": "Paragraph 3 contradicts the claim made in paragraph 2.",
                  "C": "Paragraph 3 explains the historical origins of the issues discussed in paragraph 2.",
                  "D": "Paragraph 3 acknowledges the limitations described in paragraph 2 and discusses the functions of the same concept."
                },
                "correct_answer": "D",
                "explanation": "Ký ức tập thể có thể được chọn lọc và diễn giải lại theo thời gian nhằm phục vụ các mục tiêu gắn kết xã hội hiện tại."
              },
              {
                "id": "read12_m2_q20",
                "type": "multiple_choice",
                "prompt": "Which of the following best expresses the essential information in the following sentence? Consequently, collective memory is best understood not as a perfect record of history but as an evolving interpretation of it.",
                "options": {
                  "A": "Collective memory provides a completely accurate account of historical events.",
                  "B": "Collective memory changes over time and reflects how people interpret the past.",
                  "C": "Collective memory becomes less important as societies develop.",
                  "D": "Collective memory is based entirely on personal experiences rather than shared events."
                },
                "correct_answer": "B",
                "explanation": "Ký ức tập thể khác với ký ức cá nhân ở chỗ nó phản ánh quan điểm chung được chia sẻ rộng rãi trong một nhóm xã hội."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const readingTest13 = {
  "id": "reading-practice-13",
  "title": "Reading Practice Test 13 (TOEFL 2026 - Technology Innovation & Citizen Science)",
  "skill": "reading",
  "is_default": true,
  "duration_seconds": 1800,
  "description": "Bộ đề TOEFL iBT 2026 Multistage Adaptive (YouTube Practice 12): Module 1 (Technological Innovation, Fitness App, Weather Advisory, Writing Systems) & Module 2 (Volunteering, Apartment Review, Library Announcement, Citizen Science).",
  "stages": [
    {
      "id": "read13_stage_1",
      "title": "Reading - Module 1 (Stage 1)",
      "duration_seconds": 900,
      "description": "Module 1 gồm 4 phần (20 câu hỏi). Hãy hoàn thành trước khi hết 15 phút.",
      "tasks": [
        {
          "id": "read13_m1_t1",
          "title": "Task 1: Complete the Words (Đoạn 1 - Technological Innovation)",
          "task_type": "complete_words",
          "content": {
            "instructions": "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn sau:",
            "paragraph": "Technological innovation drives progress across industries by introducing new tools and methods for solving problems. Advan[ces] in techn[ology] improve effic[iency], communication, a[nd] access t[o] information. Ho[wever], rapid inno[vation] can al[so] create ethi[cal], social, and econ[omic] challenges that must be addressed. Societies must balance the benefits of technology with responsible use and regulation. Innovation continues to transform the way people live and work. Adapting to technological change is essential for success in the modern world.",
            "blanks": [
              {
                "id": "read13_m1_t1_b1",
                "prefix": "Advan",
                "missing": "ces",
                "full": "Advances"
              },
              {
                "id": "read13_m1_t1_b2",
                "prefix": "techn",
                "missing": "ology",
                "full": "technology"
              },
              {
                "id": "read13_m1_t1_b3",
                "prefix": "effic",
                "missing": "iency",
                "full": "efficiency"
              },
              {
                "id": "read13_m1_t1_b4",
                "prefix": "a",
                "missing": "nd",
                "full": "and"
              },
              {
                "id": "read13_m1_t1_b5",
                "prefix": "t",
                "missing": "o",
                "full": "to"
              },
              {
                "id": "read13_m1_t1_b6",
                "prefix": "Ho",
                "missing": "wever",
                "full": "However"
              },
              {
                "id": "read13_m1_t1_b7",
                "prefix": "inno",
                "missing": "vation",
                "full": "innovation"
              },
              {
                "id": "read13_m1_t1_b8",
                "prefix": "al",
                "missing": "so",
                "full": "also"
              },
              {
                "id": "read13_m1_t1_b9",
                "prefix": "ethi",
                "missing": "cal",
                "full": "ethical"
              },
              {
                "id": "read13_m1_t1_b10",
                "prefix": "econ",
                "missing": "omic",
                "full": "economic"
              }
            ]
          }
        },
        {
          "id": "read13_m1_t2",
          "title": "Task 2: Read a Fitness App Notification (Daily Walking Goal)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Fitness App Notice",
            "passage": "You reached your weekly goal by walking 10,000 steps each day. Great job staying active! To help you keep improving, the app recommends trying one of its guided walking routes. These routes include audio tips to help you maintain good posture and stay motivated. You can also join a walking challenge with friends to make exercising more enjoyable and stay on track.",
            "questions": [
              {
                "id": "read13_m1_q11",
                "type": "multiple_choice",
                "prompt": "What goal did the user accomplish?",
                "options": {
                  "A": "Completing a meditation program",
                  "B": "Improving their sleep habits",
                  "C": "Meeting a daily walking target",
                  "D": "Finishing a running competition"
                },
                "correct_answer": "C",
                "explanation": "Người dùng đã hoàn thành mục tiêu đi bộ hàng ngày (\"Meeting a daily walking target\")."
              },
              {
                "id": "read13_m1_q12",
                "type": "multiple_choice",
                "prompt": "What does the app recommend doing next?",
                "options": {
                  "A": "Following one of its guided walks",
                  "B": "Taking a break from exercise",
                  "C": "Replacing walking with another activity",
                  "D": "Turning off app reminders"
                },
                "correct_answer": "A",
                "explanation": "Ứng dụng đề xuất bước tiếp theo là tham gia một trong các lộ trình đi bộ có hướng dẫn (\"Following one of its guided walks\")."
              }
            ]
          }
        },
        {
          "id": "read13_m1_t3",
          "title": "Task 3: Read a Weather Advisory (Extreme Heat Alert)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Municipal Weather Bulletin",
            "passage": "The city issued a heat advisory for the next three days because temperatures are expected to rise above 380C. Residents are encouraged to stay hydrated, avoid spending long periods in direct sunlight, and check on elderly neighbors who may be more sensitive to extreme heat. Cooling centers will be open across the city for anyone who needs a cool place to stay during the hottest part of the day.",
            "questions": [
              {
                "id": "read13_m1_q13",
                "type": "multiple_choice",
                "prompt": "Why did the city issue the heat advisory?",
                "options": {
                  "A": "A snowstorm is likely to affect the area.",
                  "B": "Heavy rain is expected over the next few days.",
                  "C": "Strong winds may cause power outages.",
                  "D": "Temperatures are expected to become extremely high."
                },
                "correct_answer": "D",
                "explanation": "Thành phố phát thông báo vì nhiệt độ dự kiến sẽ tăng cao kỷ lục (\"Temperatures are expected to become extremely high\")."
              },
              {
                "id": "read13_m1_q14",
                "type": "multiple_choice",
                "prompt": "Who should residents pay special attention to?",
                "options": {
                  "A": "Tourists visiting the city for the first time.",
                  "B": "Elderly people who may be affected by the heat.",
                  "C": "Teachers working in local schools.",
                  "D": "Teenagers spending time outdoors."
                },
                "correct_answer": "B",
                "explanation": "Cư dân cần đặc biệt chú ý đến người cao tuổi, đối tượng dễ bị ảnh hưởng nghiêm trọng bởi nắng nóng (\"Elderly people who may be affected by the heat\")."
              },
              {
                "id": "read13_m1_q15",
                "type": "multiple_choice",
                "prompt": "What is the purpose of the cooling centers?",
                "options": {
                  "A": "To distribute free drinking water to all residents.",
                  "B": "To provide emergency medical assistance for heat-related illnesses.",
                  "C": "To provide a cool place for people during the heat.",
                  "D": "To give weather updates and emergency supplies."
                },
                "correct_answer": "C",
                "explanation": "Các trung tâm làm mát mở cửa để cung cấp nơi nghỉ ngơi tránh nóng an toàn cho người dân (\"To provide a cool place for people during the heat\")."
              }
            ]
          }
        },
        {
          "id": "read13_m1_t4",
          "title": "Task 4: Academic Reading (The Development of Writing Systems)",
          "task_type": "read_academic",
          "content": {
            "academic_area": "Linguistics / World History",
            "passage": "Writing systems are among the most significant innovations in human history. Before the development of writing, information was transmitted primarily through speech and memory. While oral traditions could preserve knowledge across generations, they were limited by the capacity of individuals to remember and accurately reproduce information. The invention of writing allowed societies to record laws, economic transactions, historical events, and religious beliefs in a more permanent form. Early writing systems emerged independently in several regions of the world. Some of the earliest examples developed in connection with administrative and commercial activities. As societies became larger and more complex, the need to keep records increased. Over time, writing systems evolved from relatively simple symbols into more sophisticated forms capable of representing spoken language with greater precision. The spread of writing had profound social and cultural consequences. Written records made it possible to preserve knowledge across long periods and large distances. They also facilitated the development of literature, science, and government institutions. Although literacy remained limited in many societies for centuries, the gradual expansion of education increased access to written communication. Today, writing continues to play a central role in preserving and transmitting information.",
            "questions": [
              {
                "id": "read13_m1_q16",
                "type": "multiple_choice",
                "prompt": "The word \"transmitted\" in the passage is closest in meaning to",
                "options": {
                  "A": "created",
                  "B": "communicated",
                  "C": "discovered",
                  "D": "restricted"
                },
                "correct_answer": "B",
                "explanation": "Từ \"transmitted\" trong ngữ cảnh truyền đạt thông tin đồng nghĩa với \"communicated\" (được truyền tải)."
              },
              {
                "id": "read13_m1_q17",
                "type": "multiple_choice",
                "prompt": "According to the passage, what was one limitation of oral traditions?",
                "options": {
                  "A": "They could not preserve knowledge at all.",
                  "B": "They depended on people's ability to remember information accurately.",
                  "C": "They were used only for religious purposes.",
                  "D": "They prevented societies from growing."
                },
                "correct_answer": "B",
                "explanation": "Hạn chế của truyền miệng là phụ thuộc hoàn toàn vào trí nhớ chính xác của con người (\"They depended on people's ability to remember information accurately\")."
              },
              {
                "id": "read13_m1_q18",
                "type": "multiple_choice",
                "prompt": "'As societies became larger and more complex, the need to keep records increased.\"",
                "options": {
                  "A": "Record-keeping became less important as societies developed.",
                  "B": "Larger societies often eliminated administrative systems.",
                  "C": "Growing social complexity increased the demand for written records.",
                  "D": "Complex societies preferred oral communication."
                },
                "correct_answer": "C",
                "explanation": "Ý tương đương với câu gốc: Sự phức tạp ngày càng tăng của xã hội làm tăng nhu cầu lưu trữ hồ sơ bằng chữ viết (\"Growing social complexity increased the demand for written records\")."
              },
              {
                "id": "read13_m1_q19",
                "type": "multiple_choice",
                "prompt": "How does the third paragraph relate to the first paragraph?",
                "options": {
                  "A": "It describes the long-term effects of a development introduced in the first paragraph.",
                  "B": "It contradicts the argument made in the first paragraph.",
                  "C": "It focuses on a different topic unrelated to writing.",
                  "D": "It explains why writing systems disappeared."
                },
                "correct_answer": "A",
                "explanation": "Đoạn 3 mô tả những tác động lâu dài của chữ viết (được giới thiệu ở đoạn 1) đối với luật pháp, quản trị và văn hóa."
              },
              {
                "id": "read13_m1_q20",
                "type": "multiple_choice",
                "prompt": "According to the passage, all of the following are true EXCEPT",
                "options": {
                  "A": "Writing helped preserve laws and historical information.",
                  "B": "Early writing systems were connected to administrative needs.",
                  "C": "Literacy became universal immediately after writing was invented.",
                  "D": "Writing contributed to the development of science and literature."
                },
                "correct_answer": "C",
                "explanation": "Khẳng định sai là \"Tỷ lệ biết chữ trở nên phổ quát ngay sau khi chữ viết được phát minh\" (thực tế ban đầu chỉ có giới tinh hoa và thư lại biết chữ)."
              }
            ]
          }
        }
      ]
    },
    {
      "id": "read13_stage_2",
      "title": "Reading - Module 2 (Stage 2 - HARD)",
      "duration_seconds": 900,
      "description": "Module 2 gồm 4 phần (20 câu hỏi). Hãy hoàn thành trước khi hết 15 phút.",
      "tasks": [
        {
          "id": "read13_m2_t1",
          "title": "Task 1: Complete the Words (Đoạn 2 - Volunteering)",
          "task_type": "complete_words",
          "content": {
            "instructions": "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn sau:",
            "paragraph": "Volunteering provides individuals with meaningful opportunities to support their communities and contribute to social well-being. Volunt[eers] offer the[ir] time, ene[rgy], and ski[lls] to add[ress] social nee[ds] without expec[ting] financial rew[ard]. Through thi[s] involvement, th[ey] develop empathy, cooperation, and a stronger sense of civic responsibility. Communities benefit from additional support, fresh perspectives, and increased social cohesion. Volunteering can also help individuals gain practical experience, strengthen leadership abilities, and expand professional networks. In the long term, active civic participation promotes solidarity and encourages sustainable social progress.",
            "blanks": [
              {
                "id": "read13_m2_t1_b1",
                "prefix": "Volunt",
                "missing": "eers",
                "full": "Volunteers"
              },
              {
                "id": "read13_m2_t1_b2",
                "prefix": "the",
                "missing": "ir",
                "full": "their"
              },
              {
                "id": "read13_m2_t1_b3",
                "prefix": "ene",
                "missing": "rgy",
                "full": "energy"
              },
              {
                "id": "read13_m2_t1_b4",
                "prefix": "ski",
                "missing": "lls",
                "full": "skills"
              },
              {
                "id": "read13_m2_t1_b5",
                "prefix": "add",
                "missing": "ress",
                "full": "address"
              },
              {
                "id": "read13_m2_t1_b6",
                "prefix": "nee",
                "missing": "ds",
                "full": "needs"
              },
              {
                "id": "read13_m2_t1_b7",
                "prefix": "expec",
                "missing": "ting",
                "full": "expecting"
              },
              {
                "id": "read13_m2_t1_b8",
                "prefix": "rew",
                "missing": "ard",
                "full": "reward"
              },
              {
                "id": "read13_m2_t1_b9",
                "prefix": "thi",
                "missing": "s",
                "full": "this"
              },
              {
                "id": "read13_m2_t1_b10",
                "prefix": "th",
                "missing": "ey",
                "full": "they"
              }
            ]
          }
        },
        {
          "id": "read13_m2_t2",
          "title": "Task 2: Read an Apartment Rental Review (Tenant Experience)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Apartment Rental Review",
            "passage": "I rented this apartment for just over a year, and despite a few drawbacks, I would recommend it. The neighborhood is one of its biggest advantages, with grocery stores, public transportation, and several parks all within walking distance. The building itself is fairly old, and the heating system occasionally made loud noises during winter nights. Fortunately, the landlord was consistently responsive and arranged repairs promptly whenever issues came up, so the inconvenience never became a serious problem.",
            "questions": [
              {
                "id": "read13_m2_q11",
                "type": "multiple_choice",
                "prompt": "Which statement best describes the reviewer's overall opinion?",
                "options": {
                  "A": "The apartment was only suitable for short-term stays.",
                  "B": "The apartment was disappointing overall.",
                  "C": "The landlord made the apartment difficult to live in.",
                  "D": "The positive aspects outweighed the problems."
                },
                "correct_answer": "D",
                "explanation": "Ý kiến chung của người đánh giá: Những khía cạnh tích cực vượt trội hơn các vấn đề nhỏ gặp phải (\"The positive aspects outweighed the problems\")."
              },
              {
                "id": "read13_m2_q12",
                "type": "multiple_choice",
                "prompt": "Why did the heating problem not become a major issue?",
                "options": {
                  "A": "The landlord addressed maintenance requests quickly.",
                  "B": "Winter temperatures were unusually mild.",
                  "C": "The tenant became accustomed to the noise.",
                  "D": "The heating system was eventually replaced."
                },
                "correct_answer": "A",
                "explanation": "Vấn đề sưởi ấm không trở nên nghiêm trọng vì chủ nhà xử lý các yêu cầu bảo trì rất nhanh chóng (\"The landlord addressed maintenance requests quickly\")."
              }
            ]
          }
        },
        {
          "id": "read13_m2_t3",
          "title": "Task 3: Read an Email (Job Interview Invitation)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Job Interview Email",
            "passage": "Dear Sofia, Thank you for applying for the Library Assistant position. We were impressed by your application and would like to invite you to an interview on Friday at 1:00 p.m. in Room 207 of the Student Services Building. Please bring a copy of your class schedule, as we will discuss your weekly availability. The interview is expected to last approximately 30 minutes. If you are unable to attend, please let us know at least 24 hours in advance so we can arrange an alternative time. We look forward to meeting you.",
            "questions": [
              {
                "id": "read13_m2_q13",
                "type": "multiple_choice",
                "prompt": "What is the main purpose of the email?",
                "options": {
                  "A": "To request additional application materials.",
                  "B": "To announce a change in the job requirements.",
                  "C": "To invite the applicant to an interview.",
                  "D": "To offer the applicant a job immediately."
                },
                "correct_answer": "C",
                "explanation": "Mục đích chính của email là mời ứng viên tham gia buổi phỏng vấn tuyển dụng (\"To invite the applicant to an interview\")."
              },
              {
                "id": "read13_m2_q14",
                "type": "multiple_choice",
                "prompt": "What should the applicant do if they cannot attend?",
                "options": {
                  "A": "Submit a new application.",
                  "B": "Visit the office without an appointment.",
                  "C": "Find another applicant to take their place.",
                  "D": "Contact the employer at least one day beforehand."
                },
                "correct_answer": "D",
                "explanation": "Ứng viên nếu không thể tham dự cần thông báo trước ít nhất một ngày (\"Contact the employer at least one day beforehand\")."
              },
              {
                "id": "read13_m2_q15",
                "type": "multiple_choice",
                "prompt": "What can be inferred about the applicant?",
                "options": {
                  "A": "They have already accepted the position.",
                  "B": "They successfully passed the first stage of the selection process.",
                  "C": "They are required to begin work the following week.",
                  "D": "They have previously worked at the library."
                },
                "correct_answer": "B",
                "explanation": "Có thể suy ra ứng viên đã vượt qua vòng hồ sơ ban đầu để được lựa chọn vào vòng phỏng vấn (\"They successfully passed the first stage of the selection process\")."
              }
            ]
          }
        },
        {
          "id": "read13_m2_t4",
          "title": "Task 4: Academic Reading (Citizen Science)",
          "task_type": "read_academic",
          "content": {
            "academic_area": "Environmental Science / Research Methodology",
            "passage": "Citizen science refers to scientific research that involves participation by members of the general public. Rather than being conducted exclusively by professional researchers, some projects invite volunteers to collect data, make observations, or assist with analysis. As a result, scientists can gather information on a scale that would otherwise be difficult to achieve. Many citizen science projects focus on environmental monitoring. Volunteers may record bird migrations, track local weather conditions, or document changes in plant populations. Because participants are often distributed across large geographic areas, they can provide valuable information from locations that researchers may not be able to visit regularly. As technology has become more accessible, smartphone applications and online databases have made it easier for volunteers to submit observations quickly and accurately. Despite its advantages, citizen science also presents challenges. Participants may vary in experience, which can affect data quality. To address this issue, many projects provide training materials and standardized procedures. Researchers may also verify submitted information before incorporating it into larger studies. When carefully designed, citizen science projects can benefit both researchers and participants by expanding scientific knowledge while increasing public engagement with science.",
            "questions": [
              {
                "id": "read13_m2_q16",
                "type": "multiple_choice",
                "prompt": "What is the main idea of the passage?",
                "options": {
                  "A": "Citizen science allows the public to contribute to research while creating both opportunities and challenges.",
                  "B": "Professional scientists rarely conduct research independently.",
                  "C": "Environmental monitoring is the only useful form of scientific research.",
                  "D": "Technology has replaced the need for scientific training."
                },
                "correct_answer": "A",
                "explanation": "Ý chính: Khoa học công dân cho phép cộng đồng đóng góp vào nghiên cứu, vừa tạo ra cơ hội lớn vừa kèm theo thách thức về kiểm soát chất lượng."
              },
              {
                "id": "read13_m2_q17",
                "type": "multiple_choice",
                "prompt": "The word \"incorporating\" in the passage is closest in meaning to",
                "options": {
                  "A": "rejecting",
                  "B": "measuring",
                  "C": "including",
                  "D": "locating"
                },
                "correct_answer": "C",
                "explanation": "Từ \"incorporating\" mang nghĩa bao gồm, kết hợp (\"including\")."
              },
              {
                "id": "read13_m2_q18",
                "type": "multiple_choice",
                "prompt": "Why does the author mention smartphone applications and online databases?",
                "options": {
                  "A": "To argue that traditional research methods are ineffective.",
                  "B": "To provide examples of technologies that support citizen science.",
                  "C": "To compare different forms of environmental monitoring.",
                  "D": "To explain why data quality has declined."
                },
                "correct_answer": "B",
                "explanation": "Tác giả nhắc đến ứng dụng điện thoại và cơ sở dữ liệu trực tuyến như ví dụ về các công nghệ hỗ trợ khoa học công dân thu thập dữ liệu diện rộng."
              },
              {
                "id": "read13_m2_q19",
                "type": "multiple_choice",
                "prompt": "What can be inferred about citizen science projects?",
                "options": {
                  "A": "They are effective only when participants have scientific degrees.",
                  "B": "Information collected by volunteers does not require verification.",
                  "C": "Careful organization can help reduce some limitations of citizen science.",
                  "D": "Researchers usually prefer not to involve the public in scientific studies."
                },
                "correct_answer": "C",
                "explanation": "Tổ chức cẩn thận và hướng dẫn bài bản có thể giảm thiểu những sai sót và hạn chế trong các dự án khoa học công dân."
              },
              {
                "id": "read13_m2_q20",
                "type": "multiple_choice",
                "prompt": "Where would the following sentence best fit: \"This type of collaboration allows researchers to benefit from the efforts of many individuals outside traditional scientific institutions.\"?",
                "options": {
                  "A": "Location A",
                  "B": "Location B",
                  "C": "Location C",
                  "D": "Location D"
                },
                "correct_answer": "C",
                "explanation": "Vị trí [C] là vị trí phù hợp nhất để chèn câu mô tả sự hợp tác này mang lại lợi ích cho các nhà nghiên cứu từ nỗ lực của cộng đồng."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const readingTest14 = {
  "id": "reading-practice-14",
  "title": "Reading Practice Test 14 (TOEFL 2026 - Digital Literacy & Ecological Succession)",
  "skill": "reading",
  "is_default": true,
  "duration_seconds": 1800,
  "description": "Bộ đề TOEFL iBT 2026 Multistage Adaptive (YouTube Practice 13): Module 1 (Digital Literacy, Office Notice, Policy Update, Placebo Effect) & Module 2 (Work-Life Balance, Sign, Platform Update, Ecological Succession).",
  "stages": [
    {
      "id": "read14_stage_1",
      "title": "Reading - Module 1 (Stage 1)",
      "duration_seconds": 900,
      "description": "Module 1 gồm 4 phần (20 câu hỏi). Hãy hoàn thành trước khi hết 15 phút.",
      "tasks": [
        {
          "id": "read14_m1_t1",
          "title": "Task 1: Complete the Words (Đoạn 1 - Digital Literacy)",
          "task_type": "complete_words",
          "content": {
            "instructions": "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn sau:",
            "paragraph": "Digital literacy is the ability to use technology effectively, safely, and responsibly in various contexts. It inclu[des] evaluating t[he] credibility of onl[ine] information, prote[cting] personal da[ta], and communi[cating] appropriately in dig[ital] environments. A[s] technology beco[mes] deeply integr[ated] into education, work, and social interaction, digital literacy is increasingly essential. Schools and universities emphasize these skills to prepare students for modern challenges. Individuals with strong digital literacy can use technological tools productively while minimizing risks such as misinformation, cybercrime, and privacy violations.",
            "blanks": [
              {
                "id": "read14_m1_t1_b1",
                "prefix": "inclu",
                "missing": "des",
                "full": "includes"
              },
              {
                "id": "read14_m1_t1_b2",
                "prefix": "t",
                "missing": "he",
                "full": "the"
              },
              {
                "id": "read14_m1_t1_b3",
                "prefix": "onl",
                "missing": "ine",
                "full": "online"
              },
              {
                "id": "read14_m1_t1_b4",
                "prefix": "prote",
                "missing": "cting",
                "full": "protecting"
              },
              {
                "id": "read14_m1_t1_b5",
                "prefix": "da",
                "missing": "ta",
                "full": "data"
              },
              {
                "id": "read14_m1_t1_b6",
                "prefix": "communi",
                "missing": "cating",
                "full": "communicating"
              },
              {
                "id": "read14_m1_t1_b7",
                "prefix": "dig",
                "missing": "ital",
                "full": "digital"
              },
              {
                "id": "read14_m1_t1_b8",
                "prefix": "A",
                "missing": "s",
                "full": "As"
              },
              {
                "id": "read14_m1_t1_b9",
                "prefix": "beco",
                "missing": "mes",
                "full": "becomes"
              },
              {
                "id": "read14_m1_t1_b10",
                "prefix": "integr",
                "missing": "ated",
                "full": "integrated"
              }
            ]
          }
        },
        {
          "id": "read14_m1_t2",
          "title": "Task 2: Read a Notice (Campus Conversation Club)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Campus Club Notice",
            "passage": "The Language Center's conversation club meets every Wednesday from 4:30 to 5:45 p.m. The club is open to all students who are currently enrolled at the university. To attend a particular week's session, students must register online by noon on Monday. Each meeting focuses on a different topic, which is announced on the center's website every Friday. This gives students time to check the topic and decide whether they want to attend.",
            "questions": [
              {
                "id": "read14_m1_q11",
                "type": "multiple_choice",
                "prompt": "Who can participate in the conversation club?",
                "options": {
                  "A": "Only advanced-level students",
                  "B": "All currently enrolled students",
                  "C": "Students who register after Wednesday",
                  "D": "Only students taking a specific language course"
                },
                "correct_answer": "B",
                "explanation": "Tất cả sinh viên đang theo học đều có thể tham gia câu lạc bộ trò chuyện ngoại ngữ (\"All currently enrolled students\")."
              },
              {
                "id": "read14_m1_q12",
                "type": "multiple_choice",
                "prompt": "Why might students check the center's website before registering?",
                "options": {
                  "A": "To find out what will be discussed at the next session",
                  "B": "To see whether they qualify for advanced language courses",
                  "C": "To change the time of the weekly conversation club",
                  "D": "To find out which instructor will lead the entire program"
                },
                "correct_answer": "A",
                "explanation": "Sinh viên nên kiểm tra trang web trước để nắm được chủ đề thảo luận của buổi sinh hoạt tiếp theo (\"To find out what will be discussed at the next session\")."
              }
            ]
          }
        },
        {
          "id": "read14_m1_t3",
          "title": "Task 3: Read a Policy Update (Remote Work Policy)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "HR Remote Work Policy",
            "passage": "Starting September 1, employees who want to work from home more than two days per week must submit a request through the WorkFlex portal at least ten business days in advance. Requests must include their preferred workdays and confirmation of a suitable workspace. Managers will review requests within five business days. Employees with already approved remote schedules only need to submit a new request if they want to change their current arrangement. Emergency requests may be sent directly to a supervisor.",
            "questions": [
              {
                "id": "read14_m1_q13",
                "type": "multiple_choice",
                "prompt": "What is the main purpose of the announcement?",
                "options": {
                  "A": "To ask employees to work from home more often",
                  "B": "To explain why the company is ending remote work",
                  "C": "To introduce a new procedure for requesting regular remote work",
                  "D": "To announce changes to employees' working hours"
                },
                "correct_answer": "C",
                "explanation": "Mục đích của thông báo là giới thiệu quy trình mới để đăng ký làm việc từ xa định kỳ (\"To introduce a new procedure for requesting regular remote work\")."
              },
              {
                "id": "read14_m1_q14",
                "type": "multiple_choice",
                "prompt": "Which employees must submit a request through the WorkFlex portal?",
                "options": {
                  "A": "Employees who want to work remotely at least three days per week",
                  "B": "Employees with already approved remote schedules",
                  "C": "Employees requesting emergency remote work",
                  "D": "Employees who work in the office every day"
                },
                "correct_answer": "A",
                "explanation": "Nhân viên muốn làm việc từ xa ít nhất ba ngày mỗi tuần phải nộp đơn qua cổng WorkFlex (\"Employees who want to work remotely at least three days per week\")."
              },
              {
                "id": "read14_m1_q15",
                "type": "multiple_choice",
                "prompt": "What should an employee do if they already have an approved remote schedule?",
                "options": {
                  "A": "Submit a new request before September 1",
                  "B": "Change their schedule through the WorkFlex portal",
                  "C": "Submit a new request only if they want to make changes",
                  "D": "Send their schedule directly to Human Resources"
                },
                "correct_answer": "C",
                "explanation": "Nhân viên đã có lịch làm việc từ xa được duyệt chỉ cần nộp đơn mới nếu muốn thay đổi lịch (\"Submit a new request only if they want to make changes\")."
              }
            ]
          }
        },
        {
          "id": "read14_m1_t4",
          "title": "Task 4: Academic Reading (The Placebo Effect)",
          "task_type": "read_academic",
          "content": {
            "academic_area": "Medicine / Health Sciences",
            "passage": "The placebo effect occurs when a person experiences a change in their condition after receiving a treatment that does not contain an active ingredient intended to produce that change. Expectations about a treatment can influence how people perceive symptoms and evaluate their health. For example, someone who believes a pill will reduce discomfort may feel better even when the pill contains no medication that directly treats the problem. The placebo effect is important in medical research because scientists need to determine whether a treatment produces benefits beyond those caused by expectations. In clinical trials, researchers may give one group an active treatment and another group a placebo. If both groups improve by similar amounts, researchers may question whether the treatment itself caused the improvement. Placebo-controlled studies therefore help researchers evaluate the actual effects of medical treatments. The effect does not mean that people's symptoms are imaginary. Expectations can influence experiences such as the perception of pain. However, the strength of the placebo effect can vary depending on the individual, the condition, and how the treatment is presented. Understanding this phenomenon helps researchers design more reliable studies and explains how expectations can influence people's experiences of treatment.",
            "questions": [
              {
                "id": "read14_m1_q16",
                "type": "multiple_choice",
                "prompt": "What is the main idea of the passage?",
                "options": {
                  "A": "Medical treatments are generally less effective than expected.",
                  "B": "The placebo effect shows how expectations can affect treatment experiences.",
                  "C": "People should use placebos instead of medical treatments.",
                  "D": "Clinical trials are unnecessary when patients report feeling better."
                },
                "correct_answer": "B",
                "explanation": "Ý chính của bài đọc: Hiệu ứng giả dược cho thấy kỳ vọng và niềm tin tâm lý có thể tác động trực tiếp đến trải nghiệm điều trị của bệnh nhân."
              },
              {
                "id": "read14_m1_q17",
                "type": "multiple_choice",
                "prompt": "The word \"active\" in the passage is closest in meaning to",
                "options": {
                  "A": "containing an active ingredient",
                  "B": "requiring physical movement",
                  "C": "involving many participants",
                  "D": "producing immediate results"
                },
                "correct_answer": "A",
                "explanation": "Từ \"active\" trong ngữ cảnh dược lý có nghĩa là chứa hoạt chất điều trị thực sự (\"containing an active ingredient\")."
              },
              {
                "id": "read14_m1_q18",
                "type": "multiple_choice",
                "prompt": "Why does the author mention clinical trials?",
                "options": {
                  "A": "To explain how researchers separate treatment effects from expectations.",
                  "B": "To show that some patients prefer inactive treatments.",
                  "C": "To explain why some medical studies are conducted without participants.",
                  "D": "To argue that patients should not trust medical researchers."
                },
                "correct_answer": "A",
                "explanation": "Tác giả nhắc đến các thử nghiệm lâm sàng đối chứng để giải thích cách nhà khoa học phân tách tác dụng thực của thuốc khỏi tác động tâm lý."
              },
              {
                "id": "read14_m1_q19",
                "type": "multiple_choice",
                "prompt": "What can be inferred about placebo- controlled studies?",
                "options": {
                  "A": "Improvement in both groups does not prove the treatment caused it.",
                  "B": "They prevent expectations from affecting participants.",
                  "C": "They are used only when treatments have no active ingredients.",
                  "D": "They always produce identical results for both groups."
                },
                "correct_answer": "A",
                "explanation": "Việc cải thiện ở cả hai nhóm không chứng minh bản thân phương pháp điều trị là nguyên nhân duy nhất dẫn đến sự thuyên giảm."
              },
              {
                "id": "read14_m1_q20",
                "type": "multiple_choice",
                "prompt": "According to the passage, all of the following are true EXCEPT",
                "options": {
                  "A": "Expectations can affect how people experience symptoms.",
                  "B": "Placebo-controlled studies can help evaluate medical treatments.",
                  "C": "The placebo effect means that reported symptoms are not real.",
                  "D": "The strength of the placebo effect can vary among individuals."
                },
                "correct_answer": "C",
                "explanation": "Khẳng định sai là \"Hiệu ứng giả dược có nghĩa là các triệu chứng được báo cáo không có thật\" (triệu chứng và sự thuyên giảm tâm sinh lý đều có thật)."
              }
            ]
          }
        }
      ]
    },
    {
      "id": "read14_stage_2",
      "title": "Reading - Module 2 (Stage 2 - HARD)",
      "duration_seconds": 900,
      "description": "Module 2 gồm 4 phần (20 câu hỏi). Hãy hoàn thành trước khi hết 15 phút.",
      "tasks": [
        {
          "id": "read14_m2_t1",
          "title": "Task 1: Complete the Words (Đoạn 2 - Work-Life Balance)",
          "task_type": "complete_words",
          "content": {
            "instructions": "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn sau:",
            "paragraph": "Work-life balance refers to managing professional responsibilities and personal life in a healthy, sustainable manner. When indivi[duals] focus excess[ively] on wo[rk], they m[ay] experience stre[ss], fatigue, and burn[out], which redu[ce] overall well-be[ing]. Establishing cle[ar] boundaries and sched[uling] regular personal time allows people to rest and maintain long-term motivation. Many employers now recognize that balanced employees demonstrate greater productivity, creativity, and job satisfaction. Achieving work-life balance not only protects mental and physical health but also contributes to sustained professional growth and personal fulfillment.",
            "blanks": [
              {
                "id": "read14_m2_t1_b1",
                "prefix": "indivi",
                "missing": "duals",
                "full": "individuals"
              },
              {
                "id": "read14_m2_t1_b2",
                "prefix": "excess",
                "missing": "ively",
                "full": "excessively"
              },
              {
                "id": "read14_m2_t1_b3",
                "prefix": "wo",
                "missing": "rk",
                "full": "work"
              },
              {
                "id": "read14_m2_t1_b4",
                "prefix": "m",
                "missing": "ay",
                "full": "may"
              },
              {
                "id": "read14_m2_t1_b5",
                "prefix": "stre",
                "missing": "ss",
                "full": "stress"
              },
              {
                "id": "read14_m2_t1_b6",
                "prefix": "burn",
                "missing": "out",
                "full": "burnout"
              },
              {
                "id": "read14_m2_t1_b7",
                "prefix": "redu",
                "missing": "ce",
                "full": "reduce"
              },
              {
                "id": "read14_m2_t1_b8",
                "prefix": "well-be",
                "missing": "ing",
                "full": "well-being"
              },
              {
                "id": "read14_m2_t1_b9",
                "prefix": "cle",
                "missing": "ar",
                "full": "clear"
              },
              {
                "id": "read14_m2_t1_b10",
                "prefix": "sched",
                "missing": "uling",
                "full": "scheduling"
              }
            ]
          }
        },
        {
          "id": "read14_m2_t2",
          "title": "Task 2: Read a Sign (Visitor Parking Guidelines)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Campus Parking Notice",
            "passage": "Visitor parking is available Monday through Friday from 7:00 a.m. to 6:00 p.m. Employees may park in the main lot using their assigned parking permits, which must be displayed on their vehicles at all times. Visitors who need to park on company property must register their vehicles at the front desk before entering the parking area. They will receive a temporary parking pass that must be placed on the dashboard. Visitor parking is limited to a maximum of three hours, and spaces are available on a first-come, first-served basis. Visitor parking is not available on weekends or public holidays.",
            "questions": [
              {
                "id": "read14_m2_q11",
                "type": "multiple_choice",
                "prompt": "What must visitors do before parking?",
                "options": {
                  "A": "Request an employee parking permit",
                  "B": "Reserve a space one week in advance",
                  "C": "Park only after 6:00 p.m.",
                  "D": "Register their vehicles at the front desk"
                },
                "correct_answer": "D",
                "explanation": "Khách đến thăm phải đăng ký phương tiện tại quầy lễ tân trước khi đỗ xe (\"Register their vehicles at the front desk\")."
              },
              {
                "id": "read14_m2_q12",
                "type": "multiple_choice",
                "prompt": "Why must visitors place the temporary parking pass on the dashboard?",
                "options": {
                  "A": "So parking staff can identify authorized visitor vehicles",
                  "B": "So employees can book the parking space in advance",
                  "C": "So visitors can extend their parking time",
                  "D": "So the front desk can clean the visitor's vehicle"
                },
                "correct_answer": "A",
                "explanation": "Khách phải đặt thẻ đỗ xe tạm thời trên bảng điều khiển để nhân viên bãi xe nhận diện xe hợp lệ (\"So parking staff can identify authorized visitor vehicles\")."
              }
            ]
          }
        },
        {
          "id": "read14_m2_t3",
          "title": "Task 3: Read an Update (Assignment Extension Notice)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Course Technical Announcement",
            "passage": "Your assignment due date has been extended from Wednesday to Friday to give students more time to complete the final section. Several students reported technical difficulties when uploading their files, and the university's technical team is currently working to resolve the problem. If the platform continues to show an error, students may submit their completed assignment by email instead. However, students should make sure their file is attached correctly and use their university email account when sending it.",
            "questions": [
              {
                "id": "read14_m2_q13",
                "type": "multiple_choice",
                "prompt": "Why was the due date extended?",
                "options": {
                  "A": "The earlier deadline wasn't realistic",
                  "B": "The instructor will be traveling",
                  "C": "Students experienced technical problems",
                  "D": "Fewer students than expected completed the assignment"
                },
                "correct_answer": "C",
                "explanation": "Hạn nộp bài tập được gia hạn vì hệ thống gặp sự cố kỹ thuật khiến nhiều sinh viên không tải bài lên được (\"Students experienced technical problems\")."
              },
              {
                "id": "read14_m2_q14",
                "type": "multiple_choice",
                "prompt": "What should students do when submitting the assignment by email?",
                "options": {
                  "A": "Send it from a personal email account",
                  "B": "Attach the file and use their university email account",
                  "C": "Contact the technical team before sending the file",
                  "D": "Submit a printed copy to the instructor"
                },
                "correct_answer": "B",
                "explanation": "Khi gửi bài qua email dự phòng, sinh viên cần đính kèm tệp và sử dụng tài khoản email của trường (\"Attach the file and use their university email account\")."
              },
              {
                "id": "read14_m2_q15",
                "type": "multiple_choice",
                "prompt": "What can be inferred about students whose assignments were successfully uploaded?",
                "options": {
                  "A": "They must submit their assignments again by email",
                  "B": "They do not need to use the alternative email method",
                  "C": "They will receive additional time to complete another assignment",
                  "D": "They must contact the technical team to confirm their submission"
                },
                "correct_answer": "B",
                "explanation": "Sinh viên đã nộp bài thành công trên hệ thống thì không cần phải gửi lại qua email (\"They do not need to use the alternative email method\")."
              }
            ]
          }
        },
        {
          "id": "read14_m2_t4",
          "title": "Task 4: Academic Reading (Ecological Succession)",
          "task_type": "read_academic",
          "content": {
            "academic_area": "Ecology / Environmental Biology",
            "passage": "Ecological succession is the gradual process through which the organisms living in an ecosystem change over time. It can occur when an environment is newly formed or when an existing ecosystem is disturbed. As different species establish themselves, they alter conditions such as the availability of nutrients, sunlight, and shelter. These changes can make the environment more suitable for some species and less suitable for others. One form of succession occurs where little or no soil exists, such as on newly exposed rock. Organisms such as lichens and certain microorganisms may establish themselves first and contribute to soil formation. A different form occurs after a disturbance such as a forest fire when soil remains. Because nutrients and some organisms may survive, recovery can occur more quickly. Succession does not always lead to exactly the same final community. Climate, soil conditions, the type of disturbance, and the species available in the surrounding area can influence the process. Understanding ecological succession helps scientists study how ecosystems recover from disturbances and how communities change as environmental conditions develop. It also provides useful information for managing damaged habitats and supporting their recovery.",
            "questions": [
              {
                "id": "read14_m2_q16",
                "type": "multiple_choice",
                "prompt": "The word \"disturbance\" in the passage is closest in meaning to",
                "options": {
                  "A": "disruption",
                  "B": "improvement",
                  "C": "prediction",
                  "D": "measurement"
                },
                "correct_answer": "A",
                "explanation": "Từ \"disturbance\" trong ngữ cảnh sinh thái mang nghĩa xáo trộn, gián đoạn cấu trúc (\"disruption\")."
              },
              {
                "id": "read14_m2_q17",
                "type": "multiple_choice",
                "prompt": "What is one factor that can influence the final community in an ecosystem?",
                "options": {
                  "A": "The age of the scientists studying it",
                  "B": "The climate of the area",
                  "C": "The number of plants initially observed",
                  "D": "The length of the recovery period"
                },
                "correct_answer": "B",
                "explanation": "Khí hậu của khu vực là một trong những yếu tố then chốt quyết định quần xã sinh vật đỉnh cực cuối cùng (\"The climate of the area\")."
              },
              {
                "id": "read14_m2_q18",
                "type": "multiple_choice",
                "prompt": "Why does the author mention lichens and microorganisms?",
                "options": {
                  "A": "To explain why forest fires are common in certain ecosystems.",
                  "B": "To provide examples of organisms that can help begin soil formation.",
                  "C": "To show that they are found mainly in newly formed ecosystems.",
                  "D": "To compare them with organisms found only in mature forests."
                },
                "correct_answer": "B",
                "explanation": "Địa y và vi sinh vật được nhắc đến như ví dụ về các sinh vật tiên phong giúp bắt đầu quá trình hình thành đất trên đá trần."
              },
              {
                "id": "read14_m2_q19",
                "type": "multiple_choice",
                "prompt": "As different species establish themselves, they alter conditions such as the availability of nutrients, sunlight, and shelter.",
                "options": {
                  "A": "Environmental conditions prevent new species from becoming established.",
                  "B": "All species require the same amounts of nutrients and sunlight.",
                  "C": "New species can change environmental conditions as they become established.",
                  "D": "Nutrients and sunlight are the only factors that affect ecosystems."
                },
                "correct_answer": "C",
                "explanation": "Ý tương đương: Các loài mới có thể làm biến đổi các điều kiện môi trường xung quanh khi chúng dần định cư và phát triển."
              },
              {
                "id": "read14_m2_q20",
                "type": "multiple_choice",
                "prompt": "Where would the following sentence best fit: \"Plants can then grow, followed by other organisms that depend on them.\"?",
                "options": {
                  "A": "Location A",
                  "B": "Location B",
                  "C": "Location C",
                  "D": "Location D"
                },
                "correct_answer": "B",
                "explanation": "Vị trí [B] là vị trí thích hợp nhất để chèn câu nói về thực vật mọc lên và các sinh vật khác phụ thuộc vào chúng theo sau."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const readingTest15 = {
  "id": "reading-practice-15",
  "title": "Reading Practice Test 15 (TOEFL 2026 - Effective Communication & Social Facilitation)",
  "skill": "reading",
  "is_default": true,
  "duration_seconds": 1800,
  "description": "Bộ đề TOEFL iBT 2026 Multistage Adaptive (YouTube Practice 14): Module 1 (Communication Skills, Workshop Notice, Advisor Email, Social Facilitation) & Module 2 (Historical Knowledge, Campus Announcement, Mentor Email, Mere Exposure Effect).",
  "stages": [
    {
      "id": "read15_stage_1",
      "title": "Reading - Module 1 (Stage 1)",
      "duration_seconds": 900,
      "description": "Module 1 gồm 4 phần (20 câu hỏi). Hãy hoàn thành trước khi hết 15 phút.",
      "tasks": [
        {
          "id": "read15_m1_t1",
          "title": "Task 1: Complete the Words (Đoạn 1 - Effective Communication)",
          "task_type": "complete_words",
          "content": {
            "instructions": "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn sau:",
            "paragraph": "Effective communication involves expressing ideas clearly while also understanding and respecting others' perspectives. Strong communi[cators] listen activ[ely], ask clarif[ying] questions, a[nd] adapt th[eir] message to su[it] different audie[nces] and conte[xts]. Poor communic[ation] can l[ead] to misunderstandings, conflict, and inefficiency in both professional and personal environments. By developing communication skills, individuals strengthen relationships, improve teamwork, and enhance leadership potential. Clear and thoughtful communication is essential for academic success, workplace collaboration, and meaningful social interaction in diverse settings.",
            "blanks": [
              {
                "id": "read15_m1_t1_b1",
                "prefix": "communi",
                "missing": "cators",
                "full": "communicators"
              },
              {
                "id": "read15_m1_t1_b2",
                "prefix": "activ",
                "missing": "ely",
                "full": "actively"
              },
              {
                "id": "read15_m1_t1_b3",
                "prefix": "clarif",
                "missing": "ying",
                "full": "clarifying"
              },
              {
                "id": "read15_m1_t1_b4",
                "prefix": "a",
                "missing": "nd",
                "full": "and"
              },
              {
                "id": "read15_m1_t1_b5",
                "prefix": "th",
                "missing": "eir",
                "full": "their"
              },
              {
                "id": "read15_m1_t1_b6",
                "prefix": "su",
                "missing": "it",
                "full": "suit"
              },
              {
                "id": "read15_m1_t1_b7",
                "prefix": "audie",
                "missing": "nces",
                "full": "audiences"
              },
              {
                "id": "read15_m1_t1_b8",
                "prefix": "conte",
                "missing": "xts",
                "full": "contexts"
              },
              {
                "id": "read15_m1_t1_b9",
                "prefix": "communic",
                "missing": "ation",
                "full": "communication"
              },
              {
                "id": "read15_m1_t1_b10",
                "prefix": "l",
                "missing": "ead",
                "full": "lead"
              }
            ]
          }
        },
        {
          "id": "read15_m1_t2",
          "title": "Task 2: Read a Notice (Laundry Room Maintenance)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Residential Notice",
            "passage": "The laundry room in the main apartment building will be closed for maintenance from March 12 to March 14. During this period, residents may use the laundry facilities in Building C instead. To enter Building C, residents must use their apartment access card and follow the laundry schedule posted near the entrance. Residents are encouraged to check the schedule before going to Building C, as the number available machines may be limited.",
            "questions": [
              {
                "id": "read15_m1_q11",
                "type": "multiple_choice",
                "prompt": "Why will the main laundry room be closed?",
                "options": {
                  "A": "For a holiday event",
                  "B": "Because residents requested fewer services",
                  "C": "Because Building C is unavailable",
                  "D": "For maintenance work"
                },
                "correct_answer": "D",
                "explanation": "Phòng giặt chính tạm thời đóng cửa để tiến hành công tác bảo trì định kỳ (\"For maintenance work\")."
              },
              {
                "id": "read15_m1_q12",
                "type": "multiple_choice",
                "prompt": "What should residents use to enter Building C?",
                "options": {
                  "A": "A temporary key from the manager",
                  "B": "Their apartment access card",
                  "C": "A visitor registration form",
                  "D": "A phone application"
                },
                "correct_answer": "B",
                "explanation": "Cư dân cần sử dụng thẻ ra vào căn hộ của mình để vào phòng giặt tại Tòa C (\"Their apartment access card\")."
              }
            ]
          }
        },
        {
          "id": "read15_m1_t3",
          "title": "Task 3: Read an Email (Wellness & Fitness Program)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Health & Fitness Announcement",
            "passage": "Subject: Spring Fitness Program Registration Dear Residents, The community center will offer a six-week fitness program starting March 3. It will include yoga on Tuesdays, strength training on Thursdays, and outdoor walking on Saturdays. Participants can join all three activities or choose individual classes. Registration is open from February 10 to February 25. Those who register before February 15 will receive a free fitness guide. After February 25, registrations will only be accepted if spaces remain. Participants should bring a water bottle and exercise mat for yoga. The center will provide equipment for strength training.",
            "questions": [
              {
                "id": "read15_m1_q13",
                "type": "multiple_choice",
                "prompt": "How many weeks will participants be able to attend the program?",
                "options": {
                  "A": "Three",
                  "B": "Six",
                  "C": "Eight",
                  "D": "Until February 25"
                },
                "correct_answer": "B",
                "explanation": "Chương trình rèn luyện sức khỏe sẽ kéo dài trong tổng cộng sáu tuần (\"Six\")."
              },
              {
                "id": "read15_m1_q14",
                "type": "multiple_choice",
                "prompt": "Which participant will receive a free fitness guide?",
                "options": {
                  "A": "Someone who registers on February 20",
                  "B": "Someone who registers on February 15",
                  "C": "Someone who registers on February 14",
                  "D": "Someone who registers after the program begins"
                },
                "correct_answer": "C",
                "explanation": "Người đăng ký vào ngày 14 tháng Hai sẽ được nhận miễn phí cẩm nang hướng dẫn tập luyện (\"Someone who registers on February 14\")."
              },
              {
                "id": "read15_m1_q15",
                "type": "multiple_choice",
                "prompt": "Which is true about the program?",
                "options": {
                  "A": "Participants must attend all three activities.",
                  "B": "The center provides equipment for yoga.",
                  "C": "Registration is guaranteed after February 25.",
                  "D": "Participants can choose which activities to attend."
                },
                "correct_answer": "D",
                "explanation": "Người tham gia có quyền tự do lựa chọn các hoạt động phù hợp với sở thích của mình (\"Participants can choose which activities to attend\")."
              }
            ]
          }
        },
        {
          "id": "read15_m1_t4",
          "title": "Task 4: Academic Reading (Social Facilitation)",
          "task_type": "read_academic",
          "content": {
            "academic_area": "Social Psychology",
            "passage": "Social facilitation refers to the tendency for a person's performance to change when other people are present. In some situations, the presence of an audience can improve performance, particularly when a person is performing a familiar or simple task. For example, an experienced athlete may perform a well-practiced movement more effectively when competing in front of spectators. However, the presence of others does not always produce better results. When a task is difficult or unfamiliar, being observed can sometimes reduce performance. People may become more self-conscious or pay too much attention to actions that would normally occur automatically. A student who has practiced a presentation many times may speak confidently in front of an audience, while another student who is still learning the material may become distracted by the presence of listeners. Thus, the same social situation can have different effects depending on the task and the individual's level of experience. Researchers have found that other factors can also influence social facilitation, including the size of the audience and how important the task seems to the individual. The phenomenon suggests that the presence of other people does not simply make performance better or worse. Instead, its effects depend partly on the type of activity and how prepared the person is. Recognizing these differences can be useful when designing classrooms, workplaces, and competitive environments.",
            "questions": [
              {
                "id": "read15_m1_q16",
                "type": "multiple_choice",
                "prompt": "According to the passage, which factor can influence the effects of social facilitation?",
                "options": {
                  "A": "The person's age",
                  "B": "The length of the task",
                  "C": "The location of the activity",
                  "D": "The size of the audience"
                },
                "correct_answer": "D",
                "explanation": "Kích thước của khán giả và mức độ quan sát xung quanh có thể ảnh hưởng đến mức độ của hiệu ứng thúc đẩy xã hội."
              },
              {
                "id": "read15_m1_q17",
                "type": "multiple_choice",
                "prompt": "People may become more self-conscious or pay too much attention to actions that would normally occur automatically.",
                "options": {
                  "A": "People may focus too much on their behavior when they are being observed.",
                  "B": "People usually become more confident when they pay attention to their actions.",
                  "C": "People can perform automatic actions only when no one is watching them.",
                  "D": "People are less aware of their behavior when they are performing difficult tasks."
                },
                "correct_answer": "A",
                "explanation": "Ý tương đương: Mọi người có thể quá chú ý và bận tâm đến hành vi của mình khi nhận biết có người khác đang quan sát."
              },
              {
                "id": "read15_m1_q18",
                "type": "multiple_choice",
                "prompt": "Where would the following sentence best fit: \"This effect is particularly likely when people are still developing the skills needed to perform the task.\"?",
                "options": {
                  "A": "Location A",
                  "B": "Location B",
                  "C": "Location C",
                  "D": "Location D"
                },
                "correct_answer": "B",
                "explanation": "Vị trí [B] là vị trí phù hợp nhất để chèn câu nhấn mạnh hiệu ứng này dễ xảy ra khi con người vẫn đang trong giai đoạn rèn luyện kỹ năng mới."
              },
              {
                "id": "read15_m1_q19",
                "type": "multiple_choice",
                "prompt": "The word \"familiar\" in the passage is closest in meaning to",
                "options": {
                  "A": "competitive",
                  "B": "unusual",
                  "C": "complicated",
                  "D": "well-known"
                },
                "correct_answer": "D",
                "explanation": "Từ \"familiar\" trong bài mang nghĩa quen thuộc, thân thuộc (\"well-known\")."
              },
              {
                "id": "read15_m1_q20",
                "type": "multiple_choice",
                "prompt": "What is the relationship between paragraphs 1 and 2?",
                "options": {
                  "A": "Paragraph 2 explains a situation in which the effect described in paragraph 1 can be different.",
                  "B": "Paragraph 2 provides evidence that contradicts the main theory presented in paragraph 1.",
                  "C": "Paragraph 2 describes a new phenomenon that is unrelated to the examples in paragraph 1.",
                  "D": "Paragraph 2 explains how researchers solved a problem introduced in paragraph 1."
                },
                "correct_answer": "A",
                "explanation": "Đoạn 2 giải thích trường hợp mà hiệu ứng mô tả ở đoạn 1 xảy ra theo chiều hướng ngược lại (khi công việc khó khăn hoặc chưa thuần thục)."
              }
            ]
          }
        }
      ]
    },
    {
      "id": "read15_stage_2",
      "title": "Reading - Module 2 (Stage 2 - HARD)",
      "duration_seconds": 900,
      "description": "Module 2 gồm 4 phần (20 câu hỏi). Hãy hoàn thành trước khi hết 15 phút.",
      "tasks": [
        {
          "id": "read15_m2_t1",
          "title": "Task 1: Complete the Words (Đoạn 2 - Historical Knowledge)",
          "task_type": "complete_words",
          "content": {
            "instructions": "Điền các chữ cái còn thiếu vào vị trí dấu gạch dưới `_` trong đoạn văn sau:",
            "paragraph": "Historical knowledge enables individuals to understand the foundations of current social, political, and cultural systems. By study[ing] past ev[ents], people c[an] identify recu[rring] patterns, signifi[cant] achievements, and crit[ical] mistakes th[at] continue t[o] influence mod[ern] societies. This aware[ness] encourages more thoughtful and informed decision-making regarding contemporary issues. History also shapes cultural identity and strengthens collective memory within communities. Understanding historical context promotes responsible citizenship and helps individuals appreciate the complexity of social change across time.",
            "blanks": [
              {
                "id": "read15_m2_t1_b1",
                "prefix": "study",
                "missing": "ing",
                "full": "studying"
              },
              {
                "id": "read15_m2_t1_b2",
                "prefix": "ev",
                "missing": "ents",
                "full": "events"
              },
              {
                "id": "read15_m2_t1_b3",
                "prefix": "c",
                "missing": "an",
                "full": "can"
              },
              {
                "id": "read15_m2_t1_b4",
                "prefix": "recu",
                "missing": "rring",
                "full": "recurring"
              },
              {
                "id": "read15_m2_t1_b5",
                "prefix": "signifi",
                "missing": "cant",
                "full": "significant"
              },
              {
                "id": "read15_m2_t1_b6",
                "prefix": "crit",
                "missing": "ical",
                "full": "critical"
              },
              {
                "id": "read15_m2_t1_b7",
                "prefix": "th",
                "missing": "at",
                "full": "that"
              },
              {
                "id": "read15_m2_t1_b8",
                "prefix": "t",
                "missing": "o",
                "full": "to"
              },
              {
                "id": "read15_m2_t1_b9",
                "prefix": "mod",
                "missing": "ern",
                "full": "modern"
              },
              {
                "id": "read15_m2_t1_b10",
                "prefix": "aware",
                "missing": "ness",
                "full": "awareness"
              }
            ]
          }
        },
        {
          "id": "read15_m2_t2",
          "title": "Task 2: Read an announcement (IT System Password Security)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "IT Security Bulletin",
            "passage": "Dear Staff Members, Starting January 12, all employees must update their computer passwords as part of a company- wide security improvement. New passwords must contain at least twelve characters, including a number and a special symbol. Employees should complete the update by January 20. Anyone who misses the deadline will temporarily lose access to company systems until the password is changed. Employees who have difficulty creating a new password may contact IT Support. Requests should include the employee's department and a brief description of the problem.",
            "questions": [
              {
                "id": "read15_m2_q11",
                "type": "multiple_choice",
                "prompt": "Why is the company requiring employees to update their passwords?",
                "options": {
                  "A": "To improve the security of company systems",
                  "B": "To give employees access to additional software",
                  "C": "To identify employees' departments more easily",
                  "D": "To reduce the number of support requests"
                },
                "correct_answer": "A",
                "explanation": "Công ty yêu cầu nhân viên đổi mật khẩu nhằm nâng cao mức độ bảo mật cho hệ thống nội bộ (\"To improve the security of company systems\")."
              },
              {
                "id": "read15_m2_q12",
                "type": "multiple_choice",
                "prompt": "What will happen if an employee has not updated their password by January 20?",
                "options": {
                  "A": "Their access to company systems will be permanently removed.",
                  "B": "They will have to complete a security training course.",
                  "C": "They will temporarily lose access until the password is changed.",
                  "D": "They will need their manager's permission to create a new password."
                },
                "correct_answer": "C",
                "explanation": "Nếu nhân viên chưa đổi mật khẩu trước ngày 20 tháng Giêng, quyền truy cập tài khoản sẽ bị tạm khóa cho đến khi cập nhật (\"They will temporarily lose access until the password is changed\")."
              }
            ]
          }
        },
        {
          "id": "read15_m2_t3",
          "title": "Task 3: Read an email (Dormitory Heating Inspection)",
          "task_type": "read_daily_life",
          "content": {
            "document_type": "Housing Office Notice",
            "passage": "Subject: Room Inspection Schedule Dear Residents, Annual room inspections in Maple Hall will be conducted from November 6 to November 10, between 9 a.m. and 4 p.m. Students do not need to be present, but rooms must be accessible to housing staff. Before the inspections, residents should remove personal items from heating units, clear food from shared refrigerators, and report maintenance problems through the housing portal by November 3. Students who cannot provide access during the inspection period must contact the Housing Office by November 1 to arrange an alternative time. Requests made after this date may not be accommodated.",
            "questions": [
              {
                "id": "read15_m2_q13",
                "type": "multiple_choice",
                "prompt": "What can be inferred about students who do not contact the Housing Office by November 1?",
                "options": {
                  "A": "They will have to remain in their rooms during the inspection.",
                  "B": "They may not be able to arrange another inspection time.",
                  "C": "They will automatically receive a housing contract extension.",
                  "D": "They will be required to pay an additional inspection fee."
                },
                "correct_answer": "B",
                "explanation": "Sinh viên không liên hệ Văn phòng Ký túc xá trước ngày 1 tháng Mười một có thể sẽ không thể sắp xếp lại khung giờ kiểm tra khác."
              },
              {
                "id": "read15_m2_q14",
                "type": "multiple_choice",
                "prompt": "What should residents do before the inspections?",
                "options": {
                  "A": "Remain in their rooms during the inspection",
                  "B": "Remove personal items from heating units",
                  "C": "Move their food to another residence hall",
                  "D": "Submit a new housing application"
                },
                "correct_answer": "B",
                "explanation": "Cư dân cần dọn dẹp các đồ đạc cá nhân xung quanh thiết bị sưởi trước ngày kiểm tra (\"Remove personal items from heating units\")."
              },
              {
                "id": "read15_m2_q15",
                "type": "multiple_choice",
                "prompt": "What should a student do if they cannot provide room access?",
                "options": {
                  "A": "Contact the Housing Office by November 1",
                  "B": "Report the problem after the inspections",
                  "C": "Ask another resident to provide access",
                  "D": "Cancel their housing contract"
                },
                "correct_answer": "A",
                "explanation": "Nếu không thể có mặt để mở cửa, sinh viên phải liên hệ văn phòng trước ngày 1 tháng Mười một để có phương án hỗ trợ."
              }
            ]
          }
        },
        {
          "id": "read15_m2_t4",
          "title": "Task 4: Academic Reading (The Mere Exposure Effect)",
          "task_type": "read_academic",
          "content": {
            "academic_area": "Psychology / Consumer Behavior",
            "passage": "The mere exposure effect is a psychological phenomenon in which people tend to develop more positive feelings toward something after encountering it repeatedly. Familiarity can make an object, person, idea, or piece of music seem more comfortable or appealing, even when the individual has not consciously decided that it is better. For example, a song that initially seems uninteresting may become more enjoyable after a person hears it several times. The effect has been observed in a variety of everyday situations. Advertisers may repeatedly display a brand name so that consumers become familiar with it. Similarly, people may develop greater liking for a particular place after visiting it several times. Repeated exposure does not necessarily mean that people will consciously remember every previous encounter. Instead, familiarity itself can influence their reactions. However, the mere exposure effect does not mean that repeated contact will always produce positive feelings. If an experience is strongly unpleasant, additional exposure may not increase someone's liking for it. The effect can also depend on how often something is encountered and whether the person notices the repetition. Understanding the phenomenon helps explain why familiarity can influence preferences and why repeated exposure is sometimes used in advertising and other forms of communication.",
            "questions": [
              {
                "id": "read15_m2_q16",
                "type": "multiple_choice",
                "prompt": "What is the main idea of the passage?",
                "options": {
                  "A": "People usually remember every advertisement they see.",
                  "B": "Repeated exposure can increase familiarity and positive feelings, although this effect has limits.",
                  "C": "Advertising is the main reason people develop personal preferences.",
                  "D": "People always prefer familiar things to unfamiliar ones."
                },
                "correct_answer": "B",
                "explanation": "Ý chính: Việc tiếp xúc lặp đi lặp lại có xu hướng gia tăng sự quen thuộc và thiện cảm, tuy nhiên hiệu ứng này cũng có những giới hạn nhất định."
              },
              {
                "id": "read15_m2_q17",
                "type": "multiple_choice",
                "prompt": "The word \"appealing\" in the passage is closest in meaning to",
                "options": {
                  "A": "attractive",
                  "B": "confusing",
                  "C": "expensive",
                  "D": "unusual"
                },
                "correct_answer": "A",
                "explanation": "Từ \"appealing\" trong ngữ cảnh này mang nghĩa hấp dẫn, cuốn hút (\"attractive\")."
              },
              {
                "id": "read15_m2_q18",
                "type": "multiple_choice",
                "prompt": "Why does the author mention advertising and visiting a particular place?",
                "options": {
                  "A": "To show that repeated exposure can influence preferences in different everyday situations.",
                  "B": "To explain why advertising is more effective than personal experience.",
                  "C": "To compare commercial products with tourist destinations.",
                  "D": "To show that people consciously remember every repeated encounter."
                },
                "correct_answer": "A",
                "explanation": "Tác giả nêu ví dụ về quảng cáo và việc ghé thăm một địa điểm quen thuộc để chứng minh hiệu ứng tiếp xúc xuất hiện phổ biến trong đời sống hàng ngày."
              },
              {
                "id": "read15_m2_q19",
                "type": "multiple_choice",
                "prompt": "What can be inferred about how repeated advertising may influence consumers?",
                "options": {
                  "A": "Repeated ads are effective only for brands people already like.",
                  "B": "Consumers need to remember every ad to like a brand.",
                  "C": "Consumers may like a brand more without remembering every ad.",
                  "D": "Consumers usually dislike brands after seeing the same ad repeatedly."
                },
                "correct_answer": "C",
                "explanation": "Người tiêu dùng có thể nảy sinh thiện cảm với một thương hiệu nhiều hơn ngay cả khi không nhớ rõ từng mẩu quảng cáo cụ thể."
              },
              {
                "id": "read15_m2_q20",
                "type": "multiple_choice",
                "prompt": "According to the passage, all of the following are true EXCEPT",
                "options": {
                  "A": "Repeated exposure can make something seem more familiar.",
                  "B": "The mere exposure effect can influence people's preferences.",
                  "C": "The effect can occur even when people do not consciously remember every encounter.",
                  "D": "Repeated exposure always causes people to develop positive feelings."
                },
                "correct_answer": "D",
                "explanation": "Khẳng định sai là \"Việc tiếp xúc lặp lại luôn luôn tạo ra cảm xúc tích cực\" (nếu tiếp xúc quá mức hoặc ấn tượng ban đầu tiêu cực thì hiệu ứng có thể đảo ngược)."
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
    is_default: true,
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
    is_default: true,
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
// 3.1 CÁC BÀI THI LUYỆN TẬP RIÊNG LẺ TỪNG PHẦN CHO WRITING
// =================================================================
const writingSentenceTest01 = {
  id: "writing-sentence-01",
  title: "Writing: Hoàn Thiện Câu (Build a Sentence - 10 câu)",
  skill: "writing",
  is_default: true,
  task_type: "build_sentence",
  duration_seconds: 420, // 7 phút chuẩn ETS
  description: "Luyện tập riêng Task 1: Ghép 10 câu hoàn chỉnh theo ngữ cảnh ban đầu (Conversational Context) và phân biệt từ bẫy chuẩn ETS 2026. Chấm điểm đúng/sai tức thì kèm phân tích ngữ pháp.",
  stages: [
    {
      id: "stage_sentence_01",
      title: "Task 1: Build a Sentence (10 câu - 7 Phút)",
      duration_seconds: 420,
      tasks: [writingTest01.stages[0].tasks[0]]
    }
  ]
};

const writingEmailTest01 = {
  id: "writing-email-01",
  title: "Writing: Viết Email (Write an Email - 7 Phút)",
  skill: "writing",
  is_default: true,
  task_type: "write_email",
  duration_seconds: 420, // 7 phút chuẩn ETS
  description: "Luyện tập riêng Task 2: Soạn email học thuật gửi giáo sư giải quyết tình huống vắng mặt, đảm bảo 80 - 130 từ và đáp ứng đủ 3 yêu cầu đề bài. AI chấm điểm chi tiết và đề xuất bài mẫu Band 5.0 - 6.0.",
  stages: [
    {
      id: "stage_email_01",
      title: "Task 2: Write an Email (7 Phút)",
      duration_seconds: 420,
      tasks: [writingTest01.stages[0].tasks[1]]
    }
  ]
};

const writingDiscussionTest01 = {
  id: "writing-discussion-01",
  title: "Writing: Academic Discussion (10 Phút)",
  skill: "writing",
  is_default: true,
  task_type: "academic_discussion",
  duration_seconds: 600, // 10 phút chuẩn ETS
  description: "Luyện tập riêng Task 3: Tham gia diễn đàn thảo luận lớp học về Trí tuệ nhân tạo (AI), bảo vệ quan điểm cá nhân và phản biện ý kiến bạn học đạt 100 - 150 từ. AI chấm điểm và chữa lỗi từng câu.",
  stages: [
    {
      id: "stage_discussion_01",
      title: "Task 3: Academic Discussion (10 Phút)",
      duration_seconds: 600,
      tasks: [writingTest01.stages[0].tasks[2]]
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
    is_default: true,
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
  is_default: true,
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
  readingTest02,
  readingTest03,
  readingTest04,
  readingTest05,
  readingTest06,
  readingTest07,
  readingTest08,
  readingTest09,
  readingTest10,
  readingTest11,
  readingTest12,
  readingTest13,
  readingTest14,
  readingTest15,
  listeningTest01,
  ...ALL_LISTENING_PRACTICE_TESTS,
  writingTest01,
  ...ALL_WRITING_PRACTICE_TESTS,
  writingSentenceTest01,
  writingEmailTest01,
  writingDiscussionTest01,
  speakingTest01,
  ...ALL_SPEAKING_PRACTICE_TESTS,
  ...GPT_COMPLETE_WORDS_TESTS
];

