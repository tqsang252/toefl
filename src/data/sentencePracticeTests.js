// ==========================================================================
// TOEFL BUILD A SENTENCE PRACTICE TESTS (PRACTICE 01 - 30)
// Dữ liệu trích xuất từ 30 bài thi luyện tập TOEFL Essentials / ETS 2026
// Chỉ xuất hiện trong tab riêng: 'Build a sentence' (skill: 'writing_sentence')
// ==========================================================================

export const sentencePractice01 = {
  "id": "sentence-practice-01",
  "title": "Build a Sentence Practice 01 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 01).",
  "stages": [
    {
      "id": "sp01_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp01_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp01_item01",
                "context": "My roommate plays loud music every night and I can't sleep.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "about",
                  "talked",
                  "the noise",
                  "should",
                  "down",
                  "keeping",
                  "talk to him"
                ],
                "correct_order": [
                  "should",
                  "talk to him",
                  "about",
                  "keeping",
                  "the noise",
                  "down"
                ],
                "correct_sentence": "Should talk to him about keeping the noise.",
                "decoys": [
                  "talked"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'talked' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp01_item02",
                "context": "l need to return these library books but the due date was yesterday.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "renewing",
                  "for free",
                  "at the",
                  "them",
                  "you can",
                  "renew",
                  "front desk"
                ],
                "correct_order": [
                  "you can",
                  "renew",
                  "them",
                  "at the",
                  "front desk",
                  "for free"
                ],
                "correct_sentence": "You can renew them at the front desk for free.",
                "decoys": [
                  "renewing"
                ],
                "explanation": "Cấu trúc ngữ pháp hoàn chỉnh diễn đạt giải pháp hợp lý cho tình huống: Từ bẫy 'renewing' không phù hợp về ngữ pháp và trật tự từ trong câu."
              },
              {
                "id": "sp01_item03",
                "context": "The campus bus stops running after 10 PM and I have a late class tonight.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "asking",
                  "after class",
                  "a classmate",
                  "tonight",
                  "you could ask",
                  "home",
                  "for a ride"
                ],
                "correct_order": [
                  "you could ask",
                  "a classmate",
                  "for a ride",
                  "home",
                  "after class",
                  "tonight"
                ],
                "correct_sentence": "You could ask a classmate for a ride home after Class tonight.",
                "decoys": [
                  "asking"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'asking' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp01_item04",
                "context": "The south dining hall is closed for cleaning every Monday morning.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the student center",
                  "the café",
                  "trying",
                  "on Mondays",
                  "near",
                  "you should",
                  "try"
                ],
                "correct_order": [
                  "you should",
                  "try",
                  "near",
                  "the student center",
                  "the café",
                  "on Mondays"
                ],
                "correct_sentence": "You should try caféé near the student center on %ndays.",
                "decoys": [
                  "trying"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'trying' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp01_item05",
                "context": "l have been sneezing and coughing all week but I haven't seen a doctor yet.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "soon",
                  "making at the",
                  "you really should",
                  "make",
                  "an appointment",
                  "health center"
                ],
                "correct_order": [
                  "you really should",
                  "make",
                  "an appointment",
                  "health center",
                  "soon"
                ],
                "correct_sentence": "You really should make an appointment at the health center soon.",
                "decoys": [
                  "making at the"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'making at the' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp01_item06",
                "context": "There is a free outdoor concert on campus this Friday evening.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "after",
                  "to it",
                  "going",
                  "dinner",
                  "together",
                  "go",
                  "we should definitely"
                ],
                "correct_order": [
                  "we should definitely",
                  "go",
                  "to it",
                  "together",
                  "after",
                  "dinner"
                ],
                "correct_sentence": "We should definitely go to it together after dinner.",
                "decoys": [
                  "going"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'going' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp01_item07",
                "context": "My laptop keeps freezing whenever I try to open more than two applicaféions.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "On your",
                  "clearing",
                  "you might need",
                  "laptop",
                  "to clear",
                  "storage space",
                  "some"
                ],
                "correct_order": [
                  "you might need",
                  "to clear",
                  "some",
                  "storage space",
                  "On your",
                  "laptop"
                ],
                "correct_sentence": "You might need to clear some storage space on your laptop.",
                "decoys": [
                  "clearing"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'clearing' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp01_item08",
                "context": "l really want to join the swimming team but I haven't swum in years.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "practice",
                  "go",
                  "to",
                  "open swim",
                  "by going",
                  "first",
                  "you could Start"
                ],
                "correct_order": [
                  "you could Start",
                  "by going",
                  "to",
                  "open swim",
                  "practice",
                  "first"
                ],
                "correct_sentence": "You could Start by going to open swim practice first.",
                "decoys": [
                  "go"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'go' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp01_item09",
                "context": "Textbooks for my economics class cost over two hundred dollars this semester.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "to borrow",
                  "if the library",
                  "has",
                  "check",
                  "you should",
                  "a copy",
                  "checking"
                ],
                "correct_order": [
                  "you should",
                  "check",
                  "if the library",
                  "has",
                  "a copy",
                  "to borrow"
                ],
                "correct_sentence": "You should check it the library has a copy to borrow.",
                "decoys": [
                  "checking"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'checking' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp01_item10",
                "context": "It is supposed to rain heavily all day tomorrow and my umbrella is broken.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the campus store",
                  "stopped",
                  "today",
                  "a new one",
                  "to get",
                  "stop by",
                  "you could"
                ],
                "correct_order": [
                  "you could",
                  "stop by",
                  "the campus store",
                  "to get",
                  "a new one",
                  "today"
                ],
                "correct_sentence": "You could stop by the campus store to get a new one today.",
                "decoys": [
                  "stopped"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'stopped' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice02 = {
  "id": "sentence-practice-02",
  "title": "Build a Sentence Practice 02 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 02).",
  "stages": [
    {
      "id": "sp02_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp02_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp02_item01",
                "context": "My roommate snores really loudly at night and I can barely get any sleep.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "situation",
                  "use",
                  "earplugs",
                  "improves",
                  "until the",
                  "using",
                  "you could try"
                ],
                "correct_order": [
                  "you could try",
                  "using",
                  "until the",
                  "situation",
                  "improves",
                  "earplugs"
                ],
                "correct_sentence": "You could try using earplt\"s untit the situation improves.",
                "decoys": [
                  "use"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'use' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp02_item02",
                "context": "My group project parther has nof done any of his assigned work and the deadline is.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the professor",
                  "talked",
                  "probably",
                  "today",
                  "about it",
                  "you should",
                  "talk to"
                ],
                "correct_order": [
                  "you should",
                  "probably",
                  "talk to",
                  "the professor",
                  "about it",
                  "today"
                ],
                "correct_sentence": "You should probably talk to the professor about it today.",
                "decoys": [
                  "talked"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'talked' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp02_item03",
                "context": "The last bus to my neighborhood stops running at 11 PM and the party ends at midnight. before it.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "before it",
                  "arranging",
                  "a ride home",
                  "you",
                  "gets late",
                  "might want",
                  "to arrange"
                ],
                "correct_order": [
                  "you",
                  "might want",
                  "to arrange",
                  "a ride home",
                  "before it",
                  "gets late"
                ],
                "correct_sentence": "You might want to arrange a ride home before it gets late.",
                "decoys": [
                  "arranging"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'arranging' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp02_item04",
                "context": "l just found out the restaurant we are going to tonight uses peanut oil in all their dishes. the waiter.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the waiter",
                  "inform",
                  "right away",
                  "informing",
                  "about your",
                  "allergy",
                  "you should"
                ],
                "correct_order": [
                  "you should",
                  "inform",
                  "the waiter",
                  "about your",
                  "allergy",
                  "right away"
                ],
                "correct_sentence": "You should inform the waiter about your allergy right away.",
                "decoys": [
                  "informing"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'informing' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp02_item05",
                "context": "l rolled my ankle during soccer practice this morning and it has been swelling ever.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "rest for",
                  "some ice",
                  "a while",
                  "should put",
                  "you",
                  "on it and",
                  "putting"
                ],
                "correct_order": [
                  "you",
                  "should put",
                  "some ice",
                  "on it and",
                  "rest for",
                  "a while"
                ],
                "correct_sentence": "You should put some ice on it and rest for a while.",
                "decoys": [
                  "putting"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'putting' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp02_item06",
                "context": "The sign-up deadline for the spring study abroad program is this Friday at noon.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "as possible",
                  "tilled",
                  "the",
                  "fill out",
                  "as soon",
                  "you should",
                  "applicaféion form"
                ],
                "correct_order": [
                  "you should",
                  "fill out",
                  "the",
                  "applicaféion form",
                  "as soon",
                  "as possible"
                ],
                "correct_sentence": "You should fill out the applicaféion form as soon as possible.",
                "decoys": [
                  "tilled"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'tilled' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp02_item07",
                "context": "l left my laptop charger in the library and it closes in twenty minutes.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "over there",
                  "hurried",
                  "before",
                  "they lock",
                  "you had",
                  "up",
                  "better hurry"
                ],
                "correct_order": [
                  "you had",
                  "better hurry",
                  "over there",
                  "before",
                  "they lock",
                  "up"
                ],
                "correct_sentence": "You had better hurry over there before they lock up.",
                "decoys": [
                  "hurried"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'hurried' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp02_item08",
                "context": "Our basketball team has its first game of the season this Saturday afternoon.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "and cheer",
                  "showed",
                  "together",
                  "show up",
                  "should all",
                  "them on"
                ],
                "correct_order": [
                  "should all",
                  "show up",
                  "and cheer",
                  "them on",
                  "together"
                ],
                "correct_sentence": "We should all show up and cheer them on together.",
                "decoys": [
                  "showed"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'showed' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp02_item09",
                "context": "We ordered a lof of food at the restaurant but some people in our group left without paying. equally.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "equally",
                  "splitting",
                  "between us",
                  "should split",
                  "the remaining"
                ],
                "correct_order": [
                  "should split",
                  "the remaining",
                  "equally",
                  "between us"
                ],
                "correct_sentence": "We should split the remaining bill equally between us.",
                "decoys": [
                  "splitting"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'splitting' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp02_item10",
                "context": "My coworker keeps taking credit for my ideas during team meetings and it is really frustrating. make your.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "make your",
                  "spoke",
                  "should speak",
                  "contributions",
                  "you",
                  "known",
                  "up and"
                ],
                "correct_order": [
                  "you",
                  "should speak",
                  "up and",
                  "make your",
                  "contributions",
                  "known"
                ],
                "correct_sentence": "You should speak up and make your contributions known.",
                "decoys": [
                  "spoke"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'spoke' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice03 = {
  "id": "sentence-practice-03",
  "title": "Build a Sentence Practice 03 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 03).",
  "stages": [
    {
      "id": "sp03_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp03_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp03_item01",
                "context": "l have been sneezing and have a sore throat since yesterday but I have a big exam.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the health center",
                  "stop by",
                  "stopping",
                  "before",
                  "you should",
                  "just in case",
                  "your exam"
                ],
                "correct_order": [
                  "you should",
                  "stop by",
                  "the health center",
                  "before",
                  "your exam",
                  "just in case"
                ],
                "correct_sentence": "You should stop by the health center before your exam just in case.",
                "decoys": [
                  "stopping"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'stopping' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp03_item02",
                "context": "l want to get in shape but the campus gym is always packed right after classes end.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "try going",
                  "you could",
                  "early in",
                  "when it is less crowded",
                  "the morning",
                  "instead",
                  "go"
                ],
                "correct_order": [
                  "you could",
                  "try going",
                  "early in",
                  "the morning",
                  "when it is less crowded",
                  "instead"
                ],
                "correct_sentence": "You could try going early in the morning Men it is less crowded instead.",
                "decoys": [
                  "go"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'go' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp03_item03",
                "context": "My flatmate has been skipping breakfast every day and complaining about low energy. even something.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "even something",
                  "small like",
                  "a banana",
                  "she should",
                  "every morning",
                  "eating",
                  "eat"
                ],
                "correct_order": [
                  "she should",
                  "eat",
                  "even something",
                  "small like",
                  "a banana",
                  "every morning"
                ],
                "correct_sentence": "She should eat even sornething small like a banana every morning.",
                "decoys": [
                  "eating"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'eating' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp03_item04",
                "context": "My classmate has been looking really stressed and overwhelmed for the past few weeks. to see.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "to see",
                  "with her",
                  "checked",
                  "is okay",
                  "you should",
                  "it she",
                  "check in"
                ],
                "correct_order": [
                  "you should",
                  "check in",
                  "with her",
                  "to see",
                  "it she",
                  "is okay"
                ],
                "correct_sentence": "You should check in with her to see it she is okay.",
                "decoys": [
                  "checked"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'checked' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp03_item05",
                "context": "l stayed up until 3 AM finishing an assignment and my first class starts in two hours.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "short nap",
                  "betore",
                  "to take a",
                  "class starts",
                  "try",
                  "took",
                  "you should"
                ],
                "correct_order": [
                  "you should",
                  "try",
                  "to take a",
                  "short nap",
                  "class starts",
                  "betore"
                ],
                "correct_sentence": "You should try to take a short nap before class starts.",
                "decoys": [
                  "took"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'took' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp03_item06",
                "context": "It is extremely hof today and football practice is going to last for two hours outside.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "to bring",
                  "you should",
                  "water",
                  "make sure",
                  "plenty of",
                  "bringing",
                  "with you"
                ],
                "correct_order": [
                  "you should",
                  "make sure",
                  "to bring",
                  "plenty of",
                  "water",
                  "with you"
                ],
                "correct_sentence": "You should make sure to bring plenty of water with you.",
                "decoys": [
                  "bringing"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'bringing' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp03_item07",
                "context": "l have been squinting to read the board in class and getting headaches by the end of the day. a doctor.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "a doctor",
                  "checking",
                  "your eyes",
                  "checked by",
                  "you",
                  "should probably"
                ],
                "correct_order": [
                  "you",
                  "should probably",
                  "your eyes",
                  "checked by",
                  "a doctor"
                ],
                "correct_sentence": "You should probably get your eyes cnecked by a doctor.",
                "decoys": [
                  "checking"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'checking' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp03_item08",
                "context": "l forgof to take my allergy medicine this morning and my eyes are really itchy and.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "back nome",
                  "taking",
                  "it right",
                  "away",
                  "and take",
                  "should go",
                  "you"
                ],
                "correct_order": [
                  "you",
                  "should go",
                  "back nome",
                  "and take",
                  "it right",
                  "away"
                ],
                "correct_sentence": "You should go back home and take it right away.",
                "decoys": [
                  "taking"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'taking' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp03_item09",
                "context": "My friend hurt her wrist during volleyball practice and says it is painful to move.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "an X-ray",
                  "getting",
                  "she should",
                  "get",
                  "today",
                  "to make sure",
                  "nothing is broken"
                ],
                "correct_order": [
                  "she should",
                  "get",
                  "an X-ray",
                  "today",
                  "to make sure",
                  "nothing is broken"
                ],
                "correct_sentence": "She should get an X•ray today make sure nothing is broken.",
                "decoys": [
                  "getting"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'getting' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp03_item10",
                "context": "Finals week is coming up and my roommate looks completely exhausted and run.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "you could",
                  "maybe ofter",
                  "to study",
                  "with her",
                  "offered",
                  "so she",
                  "feels less alone"
                ],
                "correct_order": [
                  "you could",
                  "maybe ofter",
                  "to study",
                  "with her",
                  "so she",
                  "feels less alone"
                ],
                "correct_sentence": "You could maybe offer to study with her so she feels less alone.",
                "decoys": [
                  "offered"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'offered' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice04 = {
  "id": "sentence-practice-04",
  "title": "Build a Sentence Practice 04 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 04).",
  "stages": [
    {
      "id": "sp04_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp04_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp04_item01",
                "context": "l dropped my phone on the way to class and the screen is completely cracked now.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the repair shop",
                  "take it to",
                  "you should",
                  "before it",
                  "downtown",
                  "taking",
                  "gets worse"
                ],
                "correct_order": [
                  "you should",
                  "take it to",
                  "the repair shop",
                  "downtown",
                  "before it",
                  "gets worse"
                ],
                "correct_sentence": "You should take it to the repair shop downtown before gets worse.",
                "decoys": [
                  "taking"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'taking' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp04_item02",
                "context": "My manager moved the project deadline up by three days and I have barely started.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "ask your manager",
                  "asked",
                  "you should",
                  "for an extension",
                  "or at least",
                  "some extra help",
                  "to get"
                ],
                "correct_order": [
                  "you should",
                  "ask your manager",
                  "for an extension",
                  "or at least",
                  "to get",
                  "some extra help"
                ],
                "correct_sentence": "You should ask your manager for an extension or at least to get some extra help.",
                "decoys": [
                  "asked"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'asked' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp04_item03",
                "context": "The campus Wi-Fi has been completely down all morning and my online assignment is due at noon.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the library",
                  "could try",
                  "submit",
                  "submitting",
                  "trom",
                  "you"
                ],
                "correct_order": [
                  "you",
                  "could try",
                  "submitting",
                  "the library",
                  "trom"
                ],
                "correct_sentence": "You could try submitting it from the library.",
                "decoys": [
                  "submit"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'submit' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp04_item04",
                "context": "The only printer in the student center is broken and my essay needs to be handed in on paper. one nearby.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "one nearby",
                  "there might be",
                  "you should",
                  "a copy shop",
                  "that has",
                  "try",
                  "tried"
                ],
                "correct_order": [
                  "you should",
                  "try",
                  "there might be",
                  "a copy shop",
                  "that has",
                  "one nearby"
                ],
                "correct_sentence": "You should try there might be a copy shop that has one nearby.",
                "decoys": [
                  "tried"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'tried' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp04_item05",
                "context": "l completely forgof about a conference call with my supervisor that started five minutes ago. right now.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "right now",
                  "should (dial in",
                  "dialing",
                  "apologize",
                  "for being late",
                  "you",
                  "and quickly"
                ],
                "correct_order": [
                  "you",
                  "should (dial in",
                  "right now",
                  "and quickly",
                  "for being late",
                  "apologize"
                ],
                "correct_sentence": "You should dial in right now and quSckly apobgize tof beng late.",
                "decoys": [
                  "dialing"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'dialing' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp04_item06",
                "context": "My laptop keeps showing a warning that the storage is almost completely full.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "probably",
                  "get",
                  "replaced",
                  "you should",
                  "replacing",
                  "soon",
                  "the battery"
                ],
                "correct_order": [
                  "you should",
                  "probably",
                  "get",
                  "the battery",
                  "replaced",
                  "soon"
                ],
                "correct_sentence": "You should probably get the battery replaced soon.",
                "decoys": [
                  "replacing"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'replacing' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp04_item07",
                "context": "l submitted my assignment online but the portal keeps saying it was nof received.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "email it",
                  "directly to",
                  "the professor",
                  "just to",
                  "emailing",
                  "be safe",
                  "you should"
                ],
                "correct_order": [
                  "you should",
                  "email it",
                  "directly to",
                  "the professor",
                  "just to",
                  "be safe"
                ],
                "correct_sentence": "You should email it directly to the protessor just to be safe.",
                "decoys": [
                  "emailing"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'emailing' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp04_item08",
                "context": "My headphones stopped working right before my online language class is about to begin. the built-in using.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the built-in",
                  "using",
                  "microphone and speakers",
                  "for today",
                  "use",
                  "you could try",
                  "just"
                ],
                "correct_order": [
                  "you could try",
                  "using",
                  "the built-in",
                  "microphone and speakers",
                  "just",
                  "for today"
                ],
                "correct_sentence": "You could try using the built-in microphone and speakers just for today.",
                "decoys": [
                  "use"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'use' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp04_item09",
                "context": "l have a job interview tomorrow but I just realized my only formal shirt has a stain on.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "could try",
                  "a dry cleaner",
                  "you",
                  "dropping it Ott at",
                  "to have it cleaned",
                  "tonight",
                  "drop"
                ],
                "correct_order": [
                  "you",
                  "could try",
                  "dropping it Ott at",
                  "a dry cleaner",
                  "tonight",
                  "to have it cleaned"
                ],
                "correct_sentence": "You could try dropping it Ott at a dry cleaner tonight to have it cleaned.",
                "decoys": [
                  "drop"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'drop' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp04_item10",
                "context": "l forgof my password to the student portal and the reset link keeps going to my old email. the IT helpdesk.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the IT helpdesk",
                  "should contact",
                  "and ask them",
                  "to update",
                  "contacted",
                  "your email address",
                  "you"
                ],
                "correct_order": [
                  "you",
                  "should contact",
                  "the IT helpdesk",
                  "and ask them",
                  "to update",
                  "your email address"
                ],
                "correct_sentence": "You should contact the IT helpdesk and ask them to update your email address.",
                "decoys": [
                  "contacted"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'contacted' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice05 = {
  "id": "sentence-practice-05",
  "title": "Build a Sentence Practice 05 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 05).",
  "stages": [
    {
      "id": "sp05_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp05_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp05_item01",
                "context": "l ordered a jacket online two weeks ago but they sent me the completely wrong item.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "their customer service",
                  "you should",
                  "contact",
                  "a full refund",
                  "contacted",
                  "right away",
                  "and request"
                ],
                "correct_order": [
                  "you should",
                  "contact",
                  "a full refund",
                  "their customer service",
                  "right away",
                  "and request"
                ],
                "correct_sentence": "You should contact their customer service right away and request a refund.",
                "decoys": [
                  "contacted"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'contacted' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp05_item02",
                "context": "l spent way more than I planned this month and now I am worried about paying rent.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "helping",
                  "to track",
                  "your expenses",
                  "set up",
                  "a budget",
                  "it might",
                  "help to"
                ],
                "correct_order": [
                  "it might",
                  "help to",
                  "set up",
                  "a budget",
                  "to track",
                  "your expenses"
                ],
                "correct_sentence": "It might help to set up a budget to track your expenses.",
                "decoys": [
                  "helping"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'helping' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp05_item03",
                "context": "The shoes I bought last week are too tight but I already threw away the receipt.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "they might still",
                  "exchange them",
                  "without a receipt",
                  "you could ask if",
                  "accept",
                  "accepted",
                  "the Store"
                ],
                "correct_order": [
                  "you could ask if",
                  "the Store",
                  "they might still",
                  "accept",
                  "exchange them",
                  "without a receipt"
                ],
                "correct_sentence": "You could ask if the Store might Still accept exchange them Without a receipt.",
                "decoys": [
                  "accepted"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'accepted' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp05_item04",
                "context": "My bank card was declined at the grocery store even though I know I have money in my account. your bank.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "your bank",
                  "call",
                  "to check if",
                  "called",
                  "you should",
                  "your card",
                  "nas been blocked"
                ],
                "correct_order": [
                  "you should",
                  "call",
                  "your bank",
                  "to check if",
                  "your card",
                  "nas been blocked"
                ],
                "correct_sentence": "You should call your bank to check your card has been blocked.",
                "decoys": [
                  "called"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'called' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp05_item05",
                "context": "l found the same blender at another store for thirty dollars less than where I already bought it. a price match.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "a price match",
                  "most stores",
                  "for",
                  "otter",
                  "if they do",
                  "you could ask",
                  "asking"
                ],
                "correct_order": [
                  "you could ask",
                  "for",
                  "a price match",
                  "most stores",
                  "if they do",
                  "otter"
                ],
                "correct_sentence": "You could ask for a price match most stores offer it they do.",
                "decoys": [
                  "asking"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'asking' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp05_item06",
                "context": "We went out for dinner with six people and everyone is arguing about how to split the.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "just divide",
                  "the total",
                  "equally",
                  "by six",
                  "dividing",
                  "it would be",
                  "easiest to"
                ],
                "correct_order": [
                  "it would be",
                  "easiest to",
                  "just divide",
                  "the total",
                  "equally",
                  "by six"
                ],
                "correct_sentence": "Would be easiest to just divide the total equally by six.",
                "decoys": [
                  "dividing"
                ],
                "explanation": "Cấu trúc ngữ pháp hoàn chỉnh diễn đạt giải pháp hợp lý cho tình huống: Từ bẫy 'dividing' không phù hợp về ngữ pháp và trật tự từ trong câu."
              },
              {
                "id": "sp05_item07",
                "context": "l am trying to find a birthday gift for my professor but I have no idea what to get.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "a gift card",
                  "to the campus bookstore",
                  "might be",
                  "a safe choice",
                  "being",
                  "since",
                  "most people appreciate them"
                ],
                "correct_order": [
                  "a gift card",
                  "to the campus bookstore",
                  "might be",
                  "a safe choice",
                  "since",
                  "most people appreciate them"
                ],
                "correct_sentence": "A gitt card to the campus bookstore might be a safe choice since most people appreciate them.",
                "decoys": [
                  "being"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'being' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp05_item08",
                "context": "There is an ATM fee every time I withdraw money and it is really adding up over the month. switch to.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "switch to",
                  "a bank",
                  "that has",
                  "free ATMS",
                  "on campus",
                  "switching",
                  "you should"
                ],
                "correct_order": [
                  "you should",
                  "switch to",
                  "a bank",
                  "that has",
                  "free ATMS",
                  "on campus"
                ],
                "correct_sentence": "You should switch to a bank that has free ATMs on campus.",
                "decoys": [
                  "switching"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'switching' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp05_item09",
                "context": "l bought a dress for a formal event next week but I think I should exchange it for a larger size. the store.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the store",
                  "the event",
                  "you should",
                  "and exchange it",
                  "go back to",
                  "going",
                  "for the right size"
                ],
                "correct_order": [
                  "you should",
                  "go back to",
                  "the store",
                  "and exchange it",
                  "for the right size",
                  "the event"
                ],
                "correct_sentence": "You should go back to the store and exchange it for the right size before the event.",
                "decoys": [
                  "going"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'going' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp05_item10",
                "context": "My electricity bill has been much higher than usual ever since I started working from.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "turning Ott",
                  "lights and devices",
                  "you should",
                  "when nof in use",
                  "to save on costs",
                  "try",
                  "turn Ott"
                ],
                "correct_order": [
                  "you should",
                  "try",
                  "turning Ott",
                  "lights and devices",
                  "when nof in use",
                  "to save on costs"
                ],
                "correct_sentence": "You should try turning off lights and devices when nof in use to save on costs.",
                "decoys": [
                  "turn Ott"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'turn Ott' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice06 = {
  "id": "sentence-practice-06",
  "title": "Build a Sentence Practice 06 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 06).",
  "stages": [
    {
      "id": "sp06_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp06_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp06_item01",
                "context": "l just realized my passport expires in two months and I need to travel internationally next week. an emergency apply for.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "an emergency",
                  "apply for",
                  "you should",
                  "applied",
                  "passport renewal",
                  "at the nearest office",
                  "right away"
                ],
                "correct_order": [
                  "you should",
                  "apply for",
                  "an emergency",
                  "passport renewal",
                  "right away",
                  "at the nearest office"
                ],
                "correct_sentence": "You should apply for an emergency passport renewal right away at the nearest office.",
                "decoys": [
                  "applied"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'applied' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp06_item02",
                "context": "There is heavy construction on the highway and my flight leaves in less than two hours. the train instead.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the train instead",
                  "take",
                  "which",
                  "you should",
                  "might be faster",
                  "taking",
                  "to the airport"
                ],
                "correct_order": [
                  "you should",
                  "take",
                  "the train instead",
                  "to the airport",
                  "which",
                  "might be faster"
                ],
                "correct_sentence": "You should take the train instead to the airport which might be faster.",
                "decoys": [
                  "taking"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'taking' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp06_item03",
                "context": "My hotel reservation was cancelled last minute and I arrive in the city tonight.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "a hostel nearby",
                  "check if",
                  "you could",
                  "there is",
                  "checking",
                  "available",
                  "any last-minute room"
                ],
                "correct_order": [
                  "you could",
                  "check if",
                  "there is",
                  "a hostel nearby",
                  "any last-minute room",
                  "available"
                ],
                "correct_sentence": "You could check if there iS a hostel nearby With any last-minute room available.",
                "decoys": [
                  "checking"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'checking' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp06_item04",
                "context": "My car broke down on the way to campus and I have an exam starting in forty-five minutes. a rideshare.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "a rideshare",
                  "request",
                  "you should",
                  "right now",
                  "in time",
                  "requesting",
                  "to get there"
                ],
                "correct_order": [
                  "you should",
                  "request",
                  "a rideshare",
                  "right now",
                  "to get there",
                  "in time"
                ],
                "correct_sentence": "You should request a rideshare now to get there in time.",
                "decoys": [
                  "requesting"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'requesting' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp06_item05",
                "context": "l am visiting a new city alone next weekend and I do nof know anyone there.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "joining",
                  "a guided tour",
                  "could be a",
                  "great way",
                  "join",
                  "to explore",
                  "it safely"
                ],
                "correct_order": [
                  "joining",
                  "a guided tour",
                  "could be a",
                  "great way",
                  "to explore",
                  "it safely"
                ],
                "correct_sentence": "Joining a guided Rvur could be a great way to explore it safely.",
                "decoys": [
                  "join"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'join' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp06_item06",
                "context": "The campus parking lof is always completely full by the time I get to school in the morning. riding your bike.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "riding your bike",
                  "might be worth",
                  "trying",
                  "every day",
                  "instead of driving",
                  "try"
                ],
                "correct_order": [
                  "might be worth",
                  "trying",
                  "riding your bike",
                  "instead of driving",
                  "every day"
                ],
                "correct_sentence": "It might be worth trying riding your bike instead of driving every day.",
                "decoys": [
                  "try"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'try' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp06_item07",
                "context": "l am going to Japan next month but I do nof speak any Japanese at all.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "a translation app",
                  "downloading",
                  "before you go",
                  "it would",
                  "download",
                  "would really",
                  "help"
                ],
                "correct_order": [
                  "downloading",
                  "a translation app",
                  "before you go",
                  "it would",
                  "would really",
                  "help"
                ],
                "correct_sentence": "Downloading a translation app before you go would really help.",
                "decoys": [
                  "download"
                ],
                "explanation": "Cấu trúc ngữ pháp hoàn chỉnh diễn đạt giải pháp hợp lý cho tình huống: Từ bẫy 'download' không phù hợp về ngữ pháp và trật tự từ trong câu."
              },
              {
                "id": "sp06_item08",
                "context": "l gof a parking ticket this morning even though I was sure I was parked in a valid spot. you should.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "you should",
                  "appeal it",
                  "it you nave",
                  "proof",
                  "appealing",
                  "that the spot",
                  "was valid"
                ],
                "correct_order": [
                  "you should",
                  "appeal it",
                  "it you nave",
                  "proof",
                  "that the spot",
                  "was valid"
                ],
                "correct_sentence": "You should it if you have proof that the was valid.",
                "decoys": [
                  "appealing"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'appealing' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp06_item09",
                "context": "My luggage did nof arrive when I landed and the airline says it will take three more days. file a claim.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "file a claim",
                  "the airline",
                  "and ask for",
                  "with",
                  "filed",
                  "a daily allowance",
                  "for essentials"
                ],
                "correct_order": [
                  "file a claim",
                  "with",
                  "the airline",
                  "and ask for",
                  "a daily allowance",
                  "for essentials"
                ],
                "correct_sentence": "File a claim with the airline and ask for a daily allowance for essentials.",
                "decoys": [
                  "filed"
                ],
                "explanation": "Cấu trúc ngữ pháp hoàn chỉnh diễn đạt giải pháp hợp lý cho tình huống: Từ bẫy 'filed' không phù hợp về ngữ pháp và trật tự từ trong câu."
              },
              {
                "id": "sp06_item10",
                "context": "The rideshare app is showing surge pricing because of a big event happening downtown tonight.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "waiting",
                  "it might",
                  "be cheaper",
                  "wait",
                  "for about",
                  "to just",
                  "thirty minutes"
                ],
                "correct_order": [
                  "it might",
                  "be cheaper",
                  "to just",
                  "wait",
                  "for about",
                  "thirty minutes"
                ],
                "correct_sentence": "It might be cheaper to just wait for about thirty minutes.",
                "decoys": [
                  "waiting"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'waiting' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice07 = {
  "id": "sentence-practice-07",
  "title": "Build a Sentence Practice 07 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 07).",
  "stages": [
    {
      "id": "sp07_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp07_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp07_item01",
                "context": "The restaurant we wanted to go to for dinner has a two-hour wait on Friday nights.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "make a reservation",
                  "ahead of time",
                  "we should",
                  "to avoid",
                  "next time",
                  "the long wait",
                  "made"
                ],
                "correct_order": [
                  "we should",
                  "make a reservation",
                  "ahead of time",
                  "to avoid",
                  "the long wait",
                  "next time"
                ],
                "correct_sentence": "We should make a reservation ahead of time avoid the Ong wait next time.",
                "decoys": [
                  "made"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'made' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp07_item02",
                "context": "l started making soup and realized I am completely out of salt and seasoning at.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "grab some",
                  "trom the store",
                  "downsfairs",
                  "you could",
                  "quickly run",
                  "running",
                  "betore it is done"
                ],
                "correct_order": [
                  "you could",
                  "quickly run",
                  "downsfairs",
                  "grab some",
                  "trom the store",
                  "betore it is done"
                ],
                "correct_sentence": "You could quickly run downsfairs to grab some trom the store before it is done.",
                "decoys": [
                  "running"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'running' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp07_item03",
                "context": "My friend is a vegetarian and the only restaurant open near us right now serves only meat dishes. ask the chet.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "ask the chet",
                  "something vegetarian",
                  "if they can",
                  "for her instead",
                  "make",
                  "you could",
                  "making"
                ],
                "correct_order": [
                  "you could",
                  "ask the chet",
                  "if they can",
                  "make",
                  "something vegetarian",
                  "for her instead"
                ],
                "correct_sentence": "You could ask the chef if they can make something vegetarian for her instead.",
                "decoys": [
                  "making"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'making' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp07_item04",
                "context": "l left the pasta on the stove too long and it burned completely while I was on a phone call. open the windows.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "open the windows",
                  "you should",
                  "and check if",
                  "to air out",
                  "the smoke",
                  "opened",
                  "the pan is okay"
                ],
                "correct_order": [
                  "you should",
                  "open the windows",
                  "to air out",
                  "the smoke",
                  "and check if",
                  "the pan is okay"
                ],
                "correct_sentence": "You should open the windows to air out the smoke and check it the pan is okay.",
                "decoys": [
                  "opened"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'opened' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp07_item05",
                "context": "The food delivery app sent my order to the wrong address and it was already picked up by someone else.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "contact support",
                  "a refund",
                  "immediately",
                  "and request",
                  "you should",
                  "contacting",
                  "for the full amount"
                ],
                "correct_order": [
                  "you should",
                  "contact support",
                  "a refund",
                  "immediately",
                  "and request",
                  "for the full amount"
                ],
                "correct_sentence": "You should contact support immediately and request a retund for the full amount.",
                "decoys": [
                  "contacting"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'contacting' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp07_item06",
                "context": "l am trying to bake a cake for the first time but the recipe has a lof of complicaféed steps. watch a tutorial.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "watch a tutorial",
                  "you could",
                  "tirst",
                  "for beginners",
                  "to make it easier",
                  "watched",
                  "online"
                ],
                "correct_order": [
                  "you could",
                  "watch a tutorial",
                  "online",
                  "for beginners",
                  "to make it easier",
                  "tirst"
                ],
                "correct_sentence": "You could watch a tutorial online for Oeginners first to make it easier.",
                "decoys": [
                  "watched"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'watched' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp07_item07",
                "context": "The coffee shop on campus has been so busy this week that there is always a twenty-minute line. might be worth.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "might be worth",
                  "order",
                  "ordering ahead",
                  "to skip",
                  "using their app",
                  "the line"
                ],
                "correct_order": [
                  "might be worth",
                  "using their app",
                  "to skip",
                  "the line",
                  "ordering ahead"
                ],
                "correct_sentence": "It might be wonn ordenng anead using their app to skip the line.",
                "decoys": [
                  "order"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'order' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp07_item08",
                "context": "l have a lof of leftover rice and vegetables in the fridge and I am nof sure what to.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "you could",
                  "turn them into",
                  "a simple stir-try",
                  "that only",
                  "turning",
                  "takes about",
                  "ten minutes"
                ],
                "correct_order": [
                  "you could",
                  "turn them into",
                  "a simple stir-try",
                  "that only",
                  "takes about",
                  "ten minutes"
                ],
                "correct_sentence": "You could turn them into a Simple stir-fry that only takes about ten minutes.",
                "decoys": [
                  "turning"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'turning' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp07_item09",
                "context": "My roommate and I have been sharing groceries but she always eats more than her.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "might be better",
                  "buy",
                  "your groceries",
                  "to just",
                  "it might",
                  "separately",
                  "buying"
                ],
                "correct_order": [
                  "it might",
                  "might be better",
                  "to just",
                  "buy",
                  "your groceries",
                  "separately"
                ],
                "correct_sentence": "It might be better to just buy your groceries separately.",
                "decoys": [
                  "buying"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'buying' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp07_item10",
                "context": "l am hosting a dinner for eight people this weekend but I have never cooked for more than two. choosing.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "choosing",
                  "simple dishes",
                  "you should consider",
                  "that can be",
                  "choose",
                  "prepared in advance",
                  "to reduce stress"
                ],
                "correct_order": [
                  "you should consider",
                  "choosing",
                  "simple dishes",
                  "that can be",
                  "prepared in advance",
                  "to reduce stress"
                ],
                "correct_sentence": "You should consider choosing simple dishes that can be prepared in advance to reduce stress.",
                "decoys": [
                  "choose"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'choose' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice08 = {
  "id": "sentence-practice-08",
  "title": "Build a Sentence Practice 08 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 08).",
  "stages": [
    {
      "id": "sp08_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp08_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp08_item01",
                "context": "l completely forgof my best friend's birthday yesterday and she has nof responded to.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "apologize in person",
                  "you should",
                  "and do",
                  "apologizing",
                  "to make it up",
                  "something special",
                  "to her"
                ],
                "correct_order": [
                  "you should",
                  "apologize in person",
                  "and do",
                  "something special",
                  "to make it up",
                  "to her"
                ],
                "correct_sentence": "You should apologize in person and do something special to make it up to her.",
                "decoys": [
                  "apologizing"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'apologizing' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp08_item02",
                "context": "My friend has been in a bad mood all week but she says nothing is wrong when I ask.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "giving her",
                  "some Space",
                  "right now",
                  "might be",
                  "the best thing",
                  "give",
                  "you can do"
                ],
                "correct_order": [
                  "giving her",
                  "some Space",
                  "might be",
                  "the best thing",
                  "you can do",
                  "right now"
                ],
                "correct_sentence": "Giving her some space might be the best thing you can do right now.",
                "decoys": [
                  "give"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'give' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp08_item03",
                "context": "There is a welcome event for new international students this evening at the student center. meet new people.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "meet new people",
                  "you should go",
                  "it is a great chance",
                  "to",
                  "went",
                  "and",
                  "trom around the world"
                ],
                "correct_order": [
                  "you should go",
                  "it is a great chance",
                  "to",
                  "meet new people",
                  "trom around the world",
                  "and"
                ],
                "correct_sentence": "You should go it is a great chance to meet new people from around the world.",
                "decoys": [
                  "went"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'went' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp08_item04",
                "context": "My younger brother and I had a big argument last week and we have nof spoken.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "be the bigger person",
                  "being",
                  "first",
                  "you should",
                  "to apologize",
                  "and reach out",
                  "to him"
                ],
                "correct_order": [
                  "you should",
                  "be the bigger person",
                  "and reach out",
                  "first",
                  "to apologize",
                  "to him"
                ],
                "correct_sentence": "You should be the bigger person and reach out first to apologize to him.",
                "decoys": [
                  "being"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'being' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp08_item05",
                "context": "My classmates are planning a group outing this Saturday but I have nof been invited.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "you could join them",
                  "just",
                  "asking",
                  "you could",
                  "politely",
                  "ask if",
                  "it never hurts"
                ],
                "correct_order": [
                  "you could",
                  "just",
                  "ask if",
                  "you could join them",
                  "it never hurts",
                  "politely"
                ],
                "correct_sentence": "You could just ask il you could join them ;nlitely it never hurts.",
                "decoys": [
                  "asking"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'asking' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp08_item06",
                "context": "My close friend is moving to another country next month for a new job opportunity.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "plan a small",
                  "farewell gathering",
                  "you should",
                  "before she leaves",
                  "with your mutual friends",
                  "planning",
                  "to send her off"
                ],
                "correct_order": [
                  "you should",
                  "plan a small",
                  "farewell gathering",
                  "with your mutual friends",
                  "before she leaves",
                  "to send her off"
                ],
                "correct_sentence": "You should plan a small tarewell gathering with your mutual friends before she leaves to send her Ott.",
                "decoys": [
                  "planning"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'planning' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp08_item07",
                "context": "There is a big networking event for students interested in the tech industry next Thursday. bring some.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "bring some",
                  "you should go",
                  "and make sure to",
                  "business cards",
                  "or your LinkedIn QR code",
                  "bringing",
                  "with you"
                ],
                "correct_order": [
                  "you should go",
                  "and make sure to",
                  "bring some",
                  "business cards",
                  "or your LinkedIn QR code",
                  "with you"
                ],
                "correct_sentence": "You should go and make sure to bring some business cards or your LinkedIn OR code with you.",
                "decoys": [
                  "bringing"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'bringing' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp08_item08",
                "context": "l feel really homesick and I have been missing my family a lof since I moved here.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "schedule a",
                  "video call",
                  "you should",
                  "with your family",
                  "to caféch up",
                  "scheduled",
                  "this weekend"
                ],
                "correct_order": [
                  "you should",
                  "schedule a",
                  "video call",
                  "with your family",
                  "this weekend",
                  "to caféch up"
                ],
                "correct_sentence": "You should schedule a Video call With your family this weekend to caféch up.",
                "decoys": [
                  "scheduled"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'scheduled' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp08_item09",
                "context": "A new student in my class looks like she is having trouble making friends and fitting.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "invite her",
                  "why don't you",
                  "at lunch",
                  "to sit with",
                  "tomorrow",
                  "invited",
                  "your group"
                ],
                "correct_order": [
                  "why don't you",
                  "invite her",
                  "to sit with",
                  "your group",
                  "at lunch",
                  "tomorrow"
                ],
                "correct_sentence": "Why dont you invite her to sit with your group at lunch tomorrow.",
                "decoys": [
                  "invited"
                ],
                "explanation": "Mệnh đề danh ngữ làm chủ ngữ (Wh-cleft / Noun clause): 'Wh-clause + V chính + O/C'. Từ bẫy 'invited' bị loại bỏ vì không phù hợp với thì hoặc cấu trúc động từ chính của câu."
              },
              {
                "id": "sp08_item10",
                "context": "My professor went out of her way to help me pass my hardest exam this semester.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "write her",
                  "a thank you note",
                  "your appreciation",
                  "you should",
                  "to show",
                  "writing",
                  "for all her help"
                ],
                "correct_order": [
                  "you should",
                  "write her",
                  "a thank you note",
                  "your appreciation",
                  "to show",
                  "for all her help"
                ],
                "correct_sentence": "You should write her a thank note show your appreciaton for an her help.",
                "decoys": [
                  "writing"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'writing' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice09 = {
  "id": "sentence-practice-09",
  "title": "Build a Sentence Practice 09 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 09).",
  "stages": [
    {
      "id": "sp09_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp09_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp09_item01",
                "context": "The faucet in my bathroom has been dripping constantly for three days and it is getting louder.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "should report it",
                  "before it",
                  "to the building manager",
                  "you",
                  "reported",
                  "turns into",
                  "a bigger problem"
                ],
                "correct_order": [
                  "you",
                  "should report it",
                  "to the building manager",
                  "before it",
                  "turns into",
                  "a bigger problem"
                ],
                "correct_sentence": "You should report it to the building manager before turns into a bigger problem.",
                "decoys": [
                  "reported"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'reported' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp09_item02",
                "context": "There was a power outage in my building last night and it lasted for over six hours.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "keep some",
                  "flashlights and candles",
                  "it is always good to",
                  "it happens again",
                  "keeping",
                  "on hand",
                  "just in case"
                ],
                "correct_order": [
                  "it is always good to",
                  "it happens again",
                  "keep some",
                  "flashlights and candles",
                  "on hand",
                  "just in case"
                ],
                "correct_sentence": "It is always good to keep some tlashllgnts and candles on hand just in case happens again.",
                "decoys": [
                  "keeping"
                ],
                "explanation": "Cấu trúc ngữ pháp hoàn chỉnh diễn đạt giải pháp hợp lý cho tình huống: Từ bẫy 'keeping' không phù hợp về ngữ pháp và trật tự từ trong câu."
              },
              {
                "id": "sp09_item03",
                "context": "My upsfairs neighbor plays loud music until midnight every night and it is affecting my sleep. politely ask.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "politely ask",
                  "you could",
                  "to keep",
                  "the noise down",
                  "them",
                  "asked",
                  "after 10 PM"
                ],
                "correct_order": [
                  "you could",
                  "politely ask",
                  "them",
                  "to keep",
                  "the noise down",
                  "after 10 PM"
                ],
                "correct_sentence": "You could politely ask them to keep the noise down after IO PM.",
                "decoys": [
                  "asked"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'asked' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp09_item04",
                "context": "l found a mouse in my kitchen this morning and I am nof sure how it gof in.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "Contact your landlord",
                  "to request",
                  "you should",
                  "a pest control inspection",
                  "contacting",
                  "as soon as possible",
                  "today"
                ],
                "correct_order": [
                  "you should",
                  "Contact your landlord",
                  "today",
                  "to request",
                  "a pest control inspection",
                  "as soon as possible"
                ],
                "correct_sentence": "You should contact your landlord today to requesta pest control inspection as soon as possible.",
                "decoys": [
                  "contacting"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'contacting' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp09_item05",
                "context": "The air conditioning in my apartment stopped working and it is the hottest week of the summer.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "file a maintenance request",
                  "you should",
                  "filed",
                  "right away",
                  "since it is",
                  "considered",
                  "an emergency repair"
                ],
                "correct_order": [
                  "you should",
                  "file a maintenance request",
                  "right away",
                  "since it is",
                  "considered",
                  "an emergency repair"
                ],
                "correct_sentence": "You should file a maintenance request right away since it considered an emergency repair.",
                "decoys": [
                  "filed"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'filed' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp09_item06",
                "context": "l accidentally locked myself out of my apartment and my roommate is nof back until tonight.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "call the building manager",
                  "they can",
                  "you should",
                  "and ask it",
                  "called",
                  "let you in",
                  "with a spare key"
                ],
                "correct_order": [
                  "you should",
                  "call the building manager",
                  "and ask it",
                  "they can",
                  "let you in",
                  "with a spare key"
                ],
                "correct_sentence": "You should call the building manager and ask it they can let you in with a spare Bey.",
                "decoys": [
                  "called"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'called' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp09_item07",
                "context": "My internet comection has been cutting out every few minutes since the new router was installed. try restarting.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "try restarting",
                  "the router",
                  "still does nof work",
                  "you should",
                  "and it it",
                  "restart",
                  "call the provider"
                ],
                "correct_order": [
                  "you should",
                  "try restarting",
                  "the router",
                  "and it it",
                  "still does nof work",
                  "call the provider"
                ],
                "correct_sentence": "You should try restarting the router and it it still does nof work call the prowder.",
                "decoys": [
                  "restart"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'restart' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp09_item08",
                "context": "My washing machine started making a very loud banging noise during the spin cycle.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "using it",
                  "stop",
                  "you should",
                  "nas checked it",
                  "until a technician",
                  "to be safe",
                  "stopping"
                ],
                "correct_order": [
                  "you should",
                  "stop",
                  "using it",
                  "until a technician",
                  "nas checked it",
                  "to be safe"
                ],
                "correct_sentence": "You should Stop using it until a technician has checked it to be safe.",
                "decoys": [
                  "stopping"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'stopping' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp09_item09",
                "context": "My lease ends next month and I have nof started looking for a new place to live yet.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "should start",
                  "browsing listings",
                  "to give yourself",
                  "you",
                  "browse",
                  "this week",
                  "enough time to decide"
                ],
                "correct_order": [
                  "you",
                  "should start",
                  "browsing listings",
                  "this week",
                  "to give yourself",
                  "enough time to decide"
                ],
                "correct_sentence": "You should start browsing listings this week to give yourself enough time to decide.",
                "decoys": [
                  "browse"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'browse' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp09_item10",
                "context": "A package I was waiting for was left outside my door and it has disappeared from the hallway.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "check the security footage",
                  "you should",
                  "and report it",
                  "to building management",
                  "checking",
                  "right away",
                  "it possible"
                ],
                "correct_order": [
                  "you should",
                  "check the security footage",
                  "and report it",
                  "to building management",
                  "right away",
                  "it possible"
                ],
                "correct_sentence": "You should check the security footage and report it to building management right away it possible.",
                "decoys": [
                  "checking"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'checking' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice10 = {
  "id": "sentence-practice-10",
  "title": "Build a Sentence Practice 10 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 10).",
  "stages": [
    {
      "id": "sp10_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp10_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp10_item01",
                "context": "The air quality index in our city has been dangerously high for the past several days.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "staying indoors",
                  "as much as possible",
                  "you should consider",
                  "stay",
                  "until the",
                  "air quality improves",
                  "this week"
                ],
                "correct_order": [
                  "you should consider",
                  "staying indoors",
                  "as much as possible",
                  "until the",
                  "air quality improves",
                  "this week"
                ],
                "correct_sentence": "You should consider staying indoors as much as possible until the air quality improves.",
                "decoys": [
                  "stay"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'stay' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp10_item02",
                "context": "My friend wants to go hiking on a trail that has been marked as closed due to recent sforms. you should.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "you should",
                  "talk her out of it",
                  "since going",
                  "on a closed trail",
                  "talked",
                  "could be",
                  "very dangerous"
                ],
                "correct_order": [
                  "you should",
                  "talk her out of it",
                  "since going",
                  "on a closed trail",
                  "could be",
                  "very dangerous"
                ],
                "correct_sentence": "You should talk her out of it since going on a closed trail could be very dangerous.",
                "decoys": [
                  "talked"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'talked' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp10_item03",
                "context": "My university has a recycling program but most students just throw everything in the same bin. posting clear sqns.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "posting clear sqns",
                  "help remind",
                  "people",
                  "could",
                  "above each bin",
                  "post",
                  "what goes where"
                ],
                "correct_order": [
                  "posting clear sqns",
                  "above each bin",
                  "could",
                  "help remind",
                  "people",
                  "what goes where"
                ],
                "correct_sentence": "Posting Clear signs above each bin could help remind people What goes Where.",
                "decoys": [
                  "post"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'post' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp10_item04",
                "context": "It is spring and I have been sneezing constantly because the pollen count is extremely high. antihistamine.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "antihistamine",
                  "taking a",
                  "before going outside",
                  "take",
                  "help a lot",
                  "each day",
                  "could"
                ],
                "correct_order": [
                  "taking a",
                  "antihistamine",
                  "each day",
                  "before going outside",
                  "could",
                  "help a lot"
                ],
                "correct_sentence": "Taking a antihistamine each day before going outside could help a lot.",
                "decoys": [
                  "take"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'take' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp10_item05",
                "context": "The university is encouraging students to reduce their carbon footprint on campus this semester. switching to.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "switching to",
                  "a reusable water bottle",
                  "could be",
                  "switch",
                  "an easy",
                  "first step",
                  "you could take"
                ],
                "correct_order": [
                  "switching to",
                  "a reusable water bottle",
                  "could be",
                  "an easy",
                  "first step",
                  "you could take"
                ],
                "correct_sentence": "Switching to a reusable water bottle could be an easy first step you could take.",
                "decoys": [
                  "switch"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'switch' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp10_item06",
                "context": "There was a severe thundersform warning issued for our area starting at 3 PM today.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "make sure",
                  "you should",
                  "making",
                  "you are indoors",
                  "well before",
                  "and away from windows"
                ],
                "correct_order": [
                  "you should",
                  "make sure",
                  "you are indoors",
                  "and away from windows",
                  "well before"
                ],
                "correct_sentence": "You should make sure you are indoors and away from windows well betore 3 PM.",
                "decoys": [
                  "making"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'making' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp10_item07",
                "context": "l have been leaving my computer and all the lights on overnight even when I am nof using them.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "turning everything Ott",
                  "betore bed",
                  "you should try",
                  "it could reduce",
                  "your electricity bill",
                  "turn",
                  "significantly"
                ],
                "correct_order": [
                  "you should try",
                  "turning everything Ott",
                  "it could reduce",
                  "your electricity bill",
                  "betore bed",
                  "significantly"
                ],
                "correct_sentence": "You should try turning everything o\" before oed it could reduce your electricity bill signiticanüy.",
                "decoys": [
                  "turn"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'turn' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp10_item08",
                "context": "The nature trail near campus is incredibly muddy right now after three straight days of.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "wait a tew days",
                  "might be better to",
                  "before heading out",
                  "so the path",
                  "waiting",
                  "can dry out"
                ],
                "correct_order": [
                  "might be better to",
                  "wait a tew days",
                  "before heading out",
                  "so the path",
                  "can dry out"
                ],
                "correct_sentence": "It might be better to wait a few days before heading out so the path can dry out.",
                "decoys": [
                  "waiting"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'waiting' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp10_item09",
                "context": "Our dorm building uses an enormous amount of energy because students leave the AC on all day. setting the AC.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "setting the AC",
                  "to turn Ott",
                  "you should try",
                  "automatically",
                  "when you leave",
                  "the room",
                  "set"
                ],
                "correct_order": [
                  "you should try",
                  "setting the AC",
                  "to turn Ott",
                  "automatically",
                  "when you leave",
                  "the room"
                ],
                "correct_sentence": "You should try setting the AC to turn Ott automatically when you leave the room.",
                "decoys": [
                  "set"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'set' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp10_item10",
                "context": "A stray café has been coming to our apartment door every evening looking hungry and cold. contact a local.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "contact a local",
                  "animal shelter",
                  "what to do",
                  "you should",
                  "to help it safely",
                  "and ask",
                  "contacted"
                ],
                "correct_order": [
                  "you should",
                  "contact a local",
                  "animal shelter",
                  "and ask",
                  "what to do",
                  "to help it safely"
                ],
                "correct_sentence": "You should contact a local animal shelter and ask what to do help it salely.",
                "decoys": [
                  "contacted"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'contacted' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice11 = {
  "id": "sentence-practice-11",
  "title": "Build a Sentence Practice 11 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 11).",
  "stages": [
    {
      "id": "sp11_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp11_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp11_item01",
                "context": "l missed the professor's office hours today and I have a big exam on Friday.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "you should",
                  "emailing",
                  "email",
                  "right away",
                  "another time",
                  "to schedule",
                  "the professor"
                ],
                "correct_order": [
                  "you should",
                  "email",
                  "the professor",
                  "right away",
                  "to schedule",
                  "another time"
                ],
                "correct_sentence": "You should email the professor right away to schedule another time.",
                "decoys": [
                  "emailing"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'emailing' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp11_item02",
                "context": "The heating in my apartment stopped working and it is freezing outside.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "maintenance",
                  "contact",
                  "immediately",
                  "you need to",
                  "your building",
                  "contacted",
                  "about it"
                ],
                "correct_order": [
                  "you need to",
                  "contact",
                  "your building",
                  "maintenance",
                  "about it",
                  "immediately"
                ],
                "correct_sentence": "You need to contact your building maintenance about it immediately.",
                "decoys": [
                  "contacted"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'contacted' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp11_item03",
                "context": "l spent all my meal plan money before the end of the semester.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "buying",
                  "should consider",
                  "you",
                  "next time",
                  "a smaller",
                  "meal plan",
                  "buy"
                ],
                "correct_order": [
                  "you",
                  "should consider",
                  "buying",
                  "a smaller",
                  "meal plan",
                  "next time"
                ],
                "correct_sentence": "You should consider buying a smaller meal plan next time.",
                "decoys": [
                  "buy"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'buy' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp11_item04",
                "context": "l need a specific textbook but my university library does nof have it.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "request",
                  "try",
                  "requesting",
                  "through interlibrary",
                  "the book",
                  "loan",
                  "you could"
                ],
                "correct_order": [
                  "you could",
                  "try",
                  "requesting",
                  "the book",
                  "through interlibrary",
                  "loan"
                ],
                "correct_sentence": "You could try requesting the book through interlibrary loan.",
                "decoys": [
                  "request"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'request' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp11_item05",
                "context": "l accidentally forgof my best friend's birthday yesterday and she seems upset.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "apologized",
                  "sincerely",
                  "to make it up",
                  "and plan",
                  "apologize",
                  "you should",
                  "something special"
                ],
                "correct_order": [
                  "you should",
                  "apologize",
                  "sincerely",
                  "and plan",
                  "something special",
                  "to make it up"
                ],
                "correct_sentence": "You should apologize sincerely and plan something special to make it up.",
                "decoys": [
                  "apologized"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'apologized' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp11_item06",
                "context": "l gof a parking ticket yesterday because I did nof see the no-parking sign.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the fine",
                  "pay",
                  "it gets",
                  "paid",
                  "before",
                  "you should",
                  "larger"
                ],
                "correct_order": [
                  "you should",
                  "pay",
                  "the fine",
                  "before",
                  "it gets",
                  "larger"
                ],
                "correct_sentence": "You should pay the fine before it gets larger.",
                "decoys": [
                  "paid"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'paid' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp11_item07",
                "context": "l have been feeling exhausted every day even though I sleep eight hours a night.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "to See",
                  "seen",
                  "about your",
                  "iron levels",
                  "a doctor",
                  "soon",
                  "you might want"
                ],
                "correct_order": [
                  "you might want",
                  "to See",
                  "a doctor",
                  "about your",
                  "iron levels",
                  "soon"
                ],
                "correct_sentence": "You might want to see a doctor about your iron levels soon.",
                "decoys": [
                  "seen"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'seen' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp11_item08",
                "context": "The career fair is this Thursday and I still have nof updated my resume.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the writing center",
                  "at",
                  "updating",
                  "you should",
                  "update",
                  "get help",
                  "your resume"
                ],
                "correct_order": [
                  "you should",
                  "get help",
                  "updating",
                  "at",
                  "your resume",
                  "the writing center"
                ],
                "correct_sentence": "You should get help updating your resume at the writing center.",
                "decoys": [
                  "update"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'update' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp11_item09",
                "context": "My phone battery drains completely by noon even on a light day.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "your settings",
                  "checking",
                  "check",
                  "you might",
                  "try",
                  "for apps",
                  "running in the background"
                ],
                "correct_order": [
                  "you might",
                  "try",
                  "checking",
                  "your settings",
                  "for apps",
                  "running in the background"
                ],
                "correct_sentence": "You might try checking your settings for apps running in the background.",
                "decoys": [
                  "check"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'check' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp11_item10",
                "context": "l signed up for the campus 5K race next month but I have nof run in over a year.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "starting",
                  "with short",
                  "start",
                  "you should",
                  "gradually",
                  "runs",
                  "and build up"
                ],
                "correct_order": [
                  "you should",
                  "start",
                  "with short",
                  "runs",
                  "and build up",
                  "gradually"
                ],
                "correct_sentence": "You should start with short runs and build up gradually.",
                "decoys": [
                  "starting"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'starting' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice12 = {
  "id": "sentence-practice-12",
  "title": "Build a Sentence Practice 12 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 12).",
  "stages": [
    {
      "id": "sp12_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp12_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp12_item01",
                "context": "The campus cafeteria ran out of vegetarian options again and I have nof eaten all day. checked.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "checked",
                  "it there is",
                  "a sandwich shop",
                  "nearby",
                  "you could",
                  "open late",
                  "check"
                ],
                "correct_order": [
                  "you could",
                  "check",
                  "it there is",
                  "a sandwich shop",
                  "nearby",
                  "open late"
                ],
                "correct_sentence": "You could check it there is a sandwich shop nearby open late.",
                "decoys": [
                  "checked"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'checked' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp12_item02",
                "context": "My thesis advisor told me my introduction chapter needs a lof of revision.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "an appointment",
                  "made",
                  "you should",
                  "with the",
                  "make",
                  "writing center",
                  "for feedback"
                ],
                "correct_order": [
                  "you should",
                  "make",
                  "an appointment",
                  "with the",
                  "writing center",
                  "for feedback"
                ],
                "correct_sentence": "You should make an appointment with the writing center for feedback.",
                "decoys": [
                  "made"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'made' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp12_item03",
                "context": "My upsfairs neighbor keeps dropping things on the floor late at night.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "politely",
                  "knocked",
                  "knock",
                  "you could",
                  "to be Quieter",
                  "on their door",
                  "and ask them"
                ],
                "correct_order": [
                  "you could",
                  "knock",
                  "on their door",
                  "and ask them",
                  "to be Quieter",
                  "politely"
                ],
                "correct_sentence": "You could knock on their door and ask them to be quieter politely.",
                "decoys": [
                  "knocked"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'knocked' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp12_item04",
                "context": "A snowsform warning was just issued for tonight and tomorrow morning's classes.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "for any",
                  "watch",
                  "you should",
                  "watched",
                  "updates",
                  "about class",
                  "cancellations"
                ],
                "correct_order": [
                  "you should",
                  "watch",
                  "for any",
                  "updates",
                  "about class",
                  "cancellations"
                ],
                "correct_sentence": "You should watch for any updates about class cancellations.",
                "decoys": [
                  "watched"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'watched' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp12_item05",
                "context": "l bought a laptop online last week and it arrived with a cracked screen.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "a return",
                  "file",
                  "filed",
                  "seller",
                  "with the",
                  "request",
                  "you need to"
                ],
                "correct_order": [
                  "you need to",
                  "file",
                  "a return",
                  "request",
                  "with the",
                  "seller"
                ],
                "correct_sentence": "You need to file a return request with the seller.",
                "decoys": [
                  "filed"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'filed' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp12_item06",
                "context": "l have had a headache every afternoon this week and it is affecting my studies.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "keeping",
                  "a headache",
                  "keep",
                  "diary",
                  "you should",
                  "to track",
                  "your triggers"
                ],
                "correct_order": [
                  "you should",
                  "keep",
                  "a headache",
                  "diary",
                  "to track",
                  "your triggers"
                ],
                "correct_sentence": "You should keep a headache diary to track your triggers.",
                "decoys": [
                  "keeping"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'keeping' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp12_item07",
                "context": "l accidentally deleted an important assignment file and it is due in three hours.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "checking",
                  "the recycle",
                  "check",
                  "right now",
                  "you could",
                  "for it"
                ],
                "correct_order": [
                  "you could",
                  "check",
                  "the recycle",
                  "for it",
                  "right now"
                ],
                "correct_sentence": "You coubd check the recycle bin lor it right now.",
                "decoys": [
                  "checking"
                ],
                "explanation": "Cấu trúc ngữ pháp hoàn chỉnh diễn đạt giải pháp hợp lý cho tình huống: Từ bẫy 'checking' không phù hợp về ngữ pháp và trật tự từ trong câu."
              },
              {
                "id": "sp12_item08",
                "context": "The international student orientation is tomorrow but I have nof registered yet.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the international",
                  "office",
                  "student",
                  "Contact",
                  "you should",
                  "contacted",
                  "immediately"
                ],
                "correct_order": [
                  "you should",
                  "Contact",
                  "the international",
                  "student",
                  "office",
                  "immediately"
                ],
                "correct_sentence": "You should contact the international Student Office immediately.",
                "decoys": [
                  "contacted"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'contacted' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp12_item09",
                "context": "My bicycle tire went flat on the way to class and I am going to be late.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "there is",
                  "locked",
                  "lock it",
                  "a repair shop",
                  "and find out if",
                  "nearby",
                  "you should"
                ],
                "correct_order": [
                  "you should",
                  "lock it",
                  "and find out if",
                  "there is",
                  "a repair shop",
                  "nearby"
                ],
                "correct_sentence": "You should lock and tind out it there is a repair shop nearby.",
                "decoys": [
                  "locked"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'locked' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp12_item10",
                "context": "l said something hurtful to my study parther during a stressful group session.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "apologize",
                  "the next",
                  "you should",
                  "sincerely",
                  "apologized",
                  "them",
                  "time you see"
                ],
                "correct_order": [
                  "you should",
                  "apologize",
                  "sincerely",
                  "the next",
                  "time you see",
                  "them"
                ],
                "correct_sentence": "You should apologize sincerely the next time you see them.",
                "decoys": [
                  "apologized"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'apologized' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice13 = {
  "id": "sentence-practice-13",
  "title": "Build a Sentence Practice 13 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 13).",
  "stages": [
    {
      "id": "sp13_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp13_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp13_item01",
                "context": "l failed my midterm exam and I am worried about my final grade in the course.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "spoke",
                  "speak",
                  "to your professor",
                  "you should",
                  "about",
                  "extra credit",
                  "options"
                ],
                "correct_order": [
                  "you should",
                  "speak",
                  "to your professor",
                  "extra credit",
                  "options",
                  "about"
                ],
                "correct_sentence": "You should speak to your professor at•out extra credit options.",
                "decoys": [
                  "spoke"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'spoke' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp13_item02",
                "context": "l need a quiet place to study for finals but all the library rooms are booked.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "trying",
                  "there are",
                  "try",
                  "you could",
                  "any open",
                  "to see if",
                  "study rooms nearby"
                ],
                "correct_order": [
                  "you could",
                  "try",
                  "to see if",
                  "there are",
                  "any open",
                  "study rooms nearby"
                ],
                "correct_sentence": "You could try to see it there are any open study rooms nearby.",
                "decoys": [
                  "trying"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'trying' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp13_item03",
                "context": "My lease is ending next month and I have nof found a new place to live yet.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "starting",
                  "your search",
                  "before all the",
                  "Start",
                  "you should",
                  "immediately",
                  "good options are gone"
                ],
                "correct_order": [
                  "you should",
                  "Start",
                  "your search",
                  "immediately",
                  "before all the",
                  "good options are gone"
                ],
                "correct_sentence": "You should Start your search immediately before the good options are gone.",
                "decoys": [
                  "starting"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'starting' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp13_item04",
                "context": "l have a job interview on campus at noon and I skipped breakfast this morning.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "something light",
                  "grabbing",
                  "you should",
                  "grab",
                  "to eat",
                  "it Starts",
                  "before"
                ],
                "correct_order": [
                  "you should",
                  "grab",
                  "something light",
                  "to eat",
                  "before",
                  "it Starts"
                ],
                "correct_sentence": "You should grab something light to eat before it Stans.",
                "decoys": [
                  "grabbing"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'grabbing' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp13_item05",
                "context": "l pulled a muscle at the gym yesterday and it is still sore today.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "rest",
                  "resting",
                  "for a",
                  "and apply",
                  "tew days",
                  "heat to it",
                  "you need to"
                ],
                "correct_order": [
                  "you need to",
                  "rest",
                  "for a",
                  "tew days",
                  "and apply",
                  "heat to it"
                ],
                "correct_sentence": "You need to rest for a few days and apply heat to.",
                "decoys": [
                  "resting"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'resting' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp13_item06",
                "context": "My student loan payment is due tomorrow and I do nof have enough money in my account. apply for.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "apply for",
                  "applying for",
                  "a determent",
                  "more time",
                  "you could",
                  "try",
                  "to get"
                ],
                "correct_order": [
                  "you could",
                  "try",
                  "applying for",
                  "a determent",
                  "to get",
                  "more time"
                ],
                "correct_sentence": "You could try applying for a determent to get more time.",
                "decoys": [
                  "apply for"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'apply for' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp13_item07",
                "context": "My printer ran out of ink the night before my research paper is due.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "printing",
                  "the campus",
                  "you could",
                  "print it",
                  "computer hb",
                  "at",
                  "library"
                ],
                "correct_order": [
                  "you could",
                  "print it",
                  "at",
                  "the campus",
                  "library",
                  "computer hb"
                ],
                "correct_sentence": "You could print at the campus library computer lab.",
                "decoys": [
                  "printing"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'printing' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp13_item08",
                "context": "l want to join the debate club but I have never done any competitive debating.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "their practice",
                  "attend",
                  "first",
                  "attended",
                  "just",
                  "sessions",
                  "you could"
                ],
                "correct_order": [
                  "you could",
                  "just",
                  "attend",
                  "their practice",
                  "sessions",
                  "first"
                ],
                "correct_sentence": "You could just attend their practice sessions first.",
                "decoys": [
                  "attended"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'attended' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp13_item09",
                "context": "l forgof to bring a jacket today and the temperature dropped suddenly this afternoon.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "borrowing",
                  "trom the",
                  "borrow",
                  "campus store",
                  "lost and found",
                  "a sweatshirt",
                  "you could"
                ],
                "correct_order": [
                  "you could",
                  "borrow",
                  "a sweatshirt",
                  "trom the",
                  "campus store",
                  "lost and found"
                ],
                "correct_sentence": "You could borrow a sweatshirt trom the campus store lost found.",
                "decoys": [
                  "borrowing"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'borrowing' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp13_item10",
                "context": "My roommate and I have completely different sleep schedules and it causes daily conflict. a compromise.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "a compromise",
                  "compromise",
                  "you two should",
                  "sitting down",
                  "together",
                  "to discuss",
                  "try"
                ],
                "correct_order": [
                  "you two should",
                  "try",
                  "sitting down",
                  "to discuss",
                  "a compromise",
                  "together"
                ],
                "correct_sentence": "You you should try sitting down to discuss a compromise together.",
                "decoys": [
                  "compromise"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'compromise' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice14 = {
  "id": "sentence-practice-14",
  "title": "Build a Sentence Practice 14 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 14).",
  "stages": [
    {
      "id": "sp14_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp14_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp14_item01",
                "context": "l have three major assignments all due on the same day next week.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "prioritizing",
                  "prioritize",
                  "by difficulty",
                  "them",
                  "and Start",
                  "you should",
                  "today"
                ],
                "correct_order": [
                  "you should",
                  "prioritize",
                  "them",
                  "by difficulty",
                  "and Start",
                  "today"
                ],
                "correct_sentence": "You should prioritize them by difficulty and start today.",
                "decoys": [
                  "prioritizing"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'prioritizing' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp14_item02",
                "context": "l have been skipping meals to save money and I feel weak all the time.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the food pantry",
                  "look",
                  "on campus",
                  "looked",
                  "into",
                  "you should",
                  "for free meals"
                ],
                "correct_order": [
                  "you should",
                  "into",
                  "the food pantry",
                  "on campus",
                  "for free meals",
                  "look"
                ],
                "correct_sentence": "You should 100K into the food pantry on campus lor free meals.",
                "decoys": [
                  "looked"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'looked' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp14_item03",
                "context": "The road to the airport is closed today and my flight leaves in four hours.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the train",
                  "take",
                  "taken",
                  "to the airport",
                  "instead",
                  "right now",
                  "you should"
                ],
                "correct_order": [
                  "you should",
                  "take",
                  "the train",
                  "to the airport",
                  "instead",
                  "right now"
                ],
                "correct_sentence": "You should take the train to the instead right now.",
                "decoys": [
                  "taken"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'taken' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp14_item04",
                "context": "There is a water leak in my bathroom ceiling and water is dripping onto the floor.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "document it",
                  "documented",
                  "and report it",
                  "you should",
                  "to building",
                  "management",
                  "immediately"
                ],
                "correct_order": [
                  "you should",
                  "document it",
                  "and report it",
                  "to building",
                  "management",
                  "immediately"
                ],
                "correct_sentence": "You should document it and report it to building management immediately.",
                "decoys": [
                  "documented"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'documented' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp14_item05",
                "context": "l just found out I did nof qualify for the scholarship I was counting on this year.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "other",
                  "explore",
                  "explored",
                  "funding",
                  "you should",
                  "options",
                  "like grants or work-study"
                ],
                "correct_order": [
                  "you should",
                  "explore",
                  "options",
                  "like grants or work-study",
                  "other",
                  "explored"
                ],
                "correct_sentence": "You should explore ofher options like grants or work-study.",
                "decoys": [
                  "funding"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'funding' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp14_item06",
                "context": "l need to cite five peer-reviewed journal articles for my paper but I do nof know how to find them. using.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "using",
                  "you could try",
                  "the library's",
                  "use",
                  "database",
                  "for academic",
                  "articles"
                ],
                "correct_order": [
                  "you could try",
                  "using",
                  "the library's",
                  "database",
                  "for academic",
                  "articles"
                ],
                "correct_sentence": "You could try using the library's database for academic articles.",
                "decoys": [
                  "use"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'use' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp14_item07",
                "context": "l missed the first meeting of the student council and do nof know what was discussed. the meeting.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the meeting",
                  "rea d",
                  "minutes",
                  "reading",
                  "you should",
                  "trom the",
                  "club website"
                ],
                "correct_order": [
                  "you should",
                  "rea d",
                  "the meeting",
                  "minutes",
                  "trom the",
                  "club website"
                ],
                "correct_sentence": "You should read the meeting minutes trom the club website.",
                "decoys": [
                  "reading"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'reading' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp14_item08",
                "context": "A classmate I barely know keeps asking to copy my homework every week.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "setting",
                  "set",
                  "clear boundaries",
                  "you should",
                  "and offer",
                  "to study",
                  "together instead"
                ],
                "correct_order": [
                  "you should",
                  "set",
                  "clear boundaries",
                  "and offer",
                  "to study",
                  "together instead"
                ],
                "correct_sentence": "You should set Clear boundaries and Otter to study tcgether instead.",
                "decoys": [
                  "setting"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'setting' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp14_item09",
                "context": "l have been eating fast food every day and I feel sluggish and unwell.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "meal prepping",
                  "meal prep",
                  "on Sundays",
                  "you could try",
                  "for the week",
                  "healthy food",
                  "to save time"
                ],
                "correct_order": [
                  "you could try",
                  "meal prepping",
                  "meal prep",
                  "healthy food",
                  "on Sundays",
                  "to save time"
                ],
                "correct_sentence": "You could try meal prepping healthy food on Sundays to save time.",
                "decoys": [
                  "for the week"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'for the week' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp14_item10",
                "context": "",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "Arrange these tiles a sentence;",
                  "the IT",
                  "contact",
                  "contacted",
                  "help desk",
                  "you should",
                  "right away",
                  "for assistance"
                ],
                "correct_order": [
                  "you should",
                  "contact",
                  "Arrange these tiles a sentence;",
                  "the IT",
                  "help desk",
                  "right away",
                  "for assistance"
                ],
                "correct_sentence": "You should contact the IT help desk right away for assistance.",
                "decoys": [
                  "contacted"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'contacted' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice15 = {
  "id": "sentence-practice-15",
  "title": "Build a Sentence Practice 15 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 15).",
  "stages": [
    {
      "id": "sp15_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp15_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp15_item01",
                "context": "My professor teaches very fast and I cannof keep up with my note-taking during lllectures. recorded.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "recorded",
                  "ask",
                  "record",
                  "you could",
                  "for your own use",
                  "the llectures",
                  "permission to"
                ],
                "correct_order": [
                  "you could",
                  "ask",
                  "permission to",
                  "record",
                  "the llectures",
                  "for your own use"
                ],
                "correct_sentence": "You could ask permission to record the lectures for your own use.",
                "decoys": [
                  "recorded"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'recorded' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp15_item02",
                "context": "l was nof invited to a party that most of my classmates are going to tonight.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "hosting",
                  "host",
                  "you could always",
                  "with close friends",
                  "instead",
                  "something small",
                  "of your own"
                ],
                "correct_order": [
                  "you could always",
                  "host",
                  "something small",
                  "of your own",
                  "with close friends",
                  "instead"
                ],
                "correct_sentence": "You could always host something small of your own with close friends instead.",
                "decoys": [
                  "hosting"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'hosting' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp15_item03",
                "context": "l am spending more than I earn from my part-time job each month.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "tracking",
                  "track",
                  "to",
                  "your expenses",
                  "in a budget",
                  "it might help",
                  "app"
                ],
                "correct_order": [
                  "it might help",
                  "to",
                  "track",
                  "your expenses",
                  "in a budget",
                  "app"
                ],
                "correct_sentence": "It might help to track your expenses in a budget app.",
                "decoys": [
                  "tracking"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'tracking' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp15_item04",
                "context": "My apartment has cockroaches and my landlord has nof responded to my messages for two weeks.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "to the housing",
                  "escalating",
                  "escalate",
                  "authority",
                  "you may need to",
                  "the issue",
                  "in your city"
                ],
                "correct_order": [
                  "you may need to",
                  "escalate",
                  "the issue",
                  "to the housing",
                  "authority",
                  "in your city"
                ],
                "correct_sentence": "You may need to escalate the issue to the housing authority in your city.",
                "decoys": [
                  "escalating"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'escalating' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp15_item05",
                "context": "l feel very anxious before every exam even when I have studied well.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "counseling services",
                  "look",
                  "on campus",
                  "looked",
                  "for Support",
                  "into",
                  "you should"
                ],
                "correct_order": [
                  "you should",
                  "look",
                  "into",
                  "counseling services",
                  "on campus",
                  "for Support"
                ],
                "correct_sentence": "You should look into counseling services on campus for support.",
                "decoys": [
                  "looked"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'looked' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp15_item06",
                "context": "l left my student ID on the campus shuttle this morning and I need it to enter buildings. calling.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "calling",
                  "call",
                  "the transit",
                  "office",
                  "to report it",
                  "you should",
                  "right away"
                ],
                "correct_order": [
                  "you should",
                  "call",
                  "the transit",
                  "right away",
                  "to report it",
                  "office"
                ],
                "correct_sentence": "You should call the transit oftice right away to report it.",
                "decoys": [
                  "calling"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'calling' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp15_item07",
                "context": "My internet comection at home keeps discomecting during my online classes.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "trying",
                  "using",
                  "try",
                  "you could",
                  "instead",
                  "your phone",
                  "as a hotspot"
                ],
                "correct_order": [
                  "you could",
                  "try",
                  "using",
                  "your phone",
                  "as a hotspot",
                  "instead"
                ],
                "correct_sentence": "You could try using your phone as a hotspof instead.",
                "decoys": [
                  "trying"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'trying' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp15_item08",
                "context": "l need to use a special software program for my design class but it is nof on my computer. the campus.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the campus",
                  "checking",
                  "check",
                  "computer labs",
                  "to see if they",
                  "you should",
                  "nave it installed"
                ],
                "correct_order": [
                  "you should",
                  "check",
                  "the campus",
                  "computer labs",
                  "to see if they",
                  "nave it installed"
                ],
                "correct_sentence": "You should check the campus computer labs to see if they have it installed.",
                "decoys": [
                  "checking"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'checking' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp15_item09",
                "context": "l found out I am lactose intolerant and most of my usual dining hall meals contain dairy. spoke.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "spoke",
                  "speaking",
                  "about",
                  "to",
                  "a dietitian",
                  "dairy-free options",
                  "you should consider"
                ],
                "correct_order": [
                  "you should consider",
                  "speaking",
                  "to",
                  "a dietitian",
                  "about",
                  "dairy-free options"
                ],
                "correct_sentence": "You should consider speaking to a dietitian about dairy-free options.",
                "decoys": [
                  "spoke"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'spoke' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp15_item10",
                "context": "l want to present my research at the undergraduate symposium but the deadline is in two days. your abstract.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "your abstract",
                  "submitting",
                  "to meet",
                  "submit",
                  "you need to",
                  "right away",
                  "the deadline"
                ],
                "correct_order": [
                  "you need to",
                  "submit",
                  "your abstract",
                  "right away",
                  "to meet",
                  "the deadline"
                ],
                "correct_sentence": "You need to submit your abstract right away to meet the deadline.",
                "decoys": [
                  "submitting"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'submitting' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice16 = {
  "id": "sentence-practice-16",
  "title": "Build a Sentence Practice 16 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 16).",
  "stages": [
    {
      "id": "sp16_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp16_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp16_item01",
                "context": "l switched majors halfway through my second year and now I am missing several required courses.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "meeting",
                  "your academic",
                  "to plan",
                  "meet with",
                  "you should",
                  "advisor",
                  "a new schedule"
                ],
                "correct_order": [
                  "you should",
                  "meet with",
                  "your academic",
                  "advisor",
                  "to plan",
                  "a new schedule"
                ],
                "correct_sentence": "You should meet with your academic advisor to plan a new schedule.",
                "decoys": [
                  "meeting"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'meeting' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp16_item02",
                "context": "My eyesight seems to have gotten worse and I am struggling to read the board in class. schedule.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "schedule",
                  "scheduled",
                  "an eye",
                  "exam",
                  "soon",
                  "you should",
                  "with an optometrist"
                ],
                "correct_order": [
                  "you should",
                  "schedule",
                  "an eye",
                  "exam",
                  "with an optometrist",
                  "soon"
                ],
                "correct_sentence": "You should schedule an eye exam with an optometrist soon.",
                "decoys": [
                  "scheduled"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'scheduled' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp16_item03",
                "context": "The intramural soccer team I joined requires two practices a week but my schedule is very busy. dropping.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "dropping",
                  "drop",
                  "you might",
                  "one elective",
                  "this semester",
                  "need to",
                  "to free up time"
                ],
                "correct_order": [
                  "you might",
                  "need to",
                  "drop",
                  "one elective",
                  "to free up time",
                  "this semester"
                ],
                "correct_sentence": "You might need to drop one elective to free up time this semester.",
                "decoys": [
                  "dropping"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'dropping' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp16_item04",
                "context": "l have to move out of my dorm by Friday but I have nof packed anything yet.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "packing",
                  "start",
                  "with",
                  "the essentials",
                  "right now",
                  "first",
                  "you should"
                ],
                "correct_order": [
                  "you should",
                  "start",
                  "with",
                  "the essentials",
                  "first",
                  "right now"
                ],
                "correct_sentence": "You should start with the essentiaks first right now.",
                "decoys": [
                  "packing"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'packing' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp16_item05",
                "context": "l have been eating nothing but instant noodles this week because I ran out of meal.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "applying",
                  "apply",
                  "for emergency",
                  "dining assistance",
                  "you could",
                  "through the",
                  "student affairs oflice"
                ],
                "correct_order": [
                  "you could",
                  "for emergency",
                  "dining assistance",
                  "through the",
                  "student affairs oflice",
                  "apply"
                ],
                "correct_sentence": "You could appty for emergency dining assistance through the student affairs office.",
                "decoys": [
                  "applying"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'applying' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp16_item06",
                "context": "l just received a suspicious email asking for my bank account information.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "replied",
                  "reply",
                  "to it",
                  "you should",
                  "to your bank",
                  "never",
                  "and report it"
                ],
                "correct_order": [
                  "you should",
                  "never",
                  "reply",
                  "to it",
                  "and report it",
                  "to your bank"
                ],
                "correct_sentence": "You should never reply to it and report it to your bank.",
                "decoys": [
                  "replied"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'replied' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp16_item07",
                "context": "My car broke down on the highway and I cannof afford a tow truck right now.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "calling",
                  "call",
                  "your insurance Company",
                  "roadside assistance",
                  "you should",
                  "right away",
                  "to request"
                ],
                "correct_order": [
                  "you should",
                  "call",
                  "your insurance Company",
                  "to request",
                  "roadside assistance",
                  "right away"
                ],
                "correct_sentence": "You should call your insurance company to request roadside assistance right away.",
                "decoys": [
                  "calling"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'calling' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp16_item08",
                "context": "l feel left out because my classmates always form groups without asking me to join.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "to introduce",
                  "next class",
                  "before",
                  "introduced",
                  "yourself",
                  "you could try",
                  "to a few people"
                ],
                "correct_order": [
                  "you could try",
                  "to introduce",
                  "yourself",
                  "to a few people",
                  "before",
                  "next class"
                ],
                "correct_sentence": "You could try to introduce yourself to a few people before next class.",
                "decoys": [
                  "introduced"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'introduced' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp16_item09",
                "context": "l forgof my university account password and I am locked out during exam week.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "use",
                  "used",
                  "you need to",
                  "on the Ogin",
                  "the password",
                  "page",
                  "reset option"
                ],
                "correct_order": [
                  "you need to",
                  "use",
                  "the password",
                  "reset option",
                  "on the Ogin",
                  "page"
                ],
                "correct_sentence": "You need to use the password reset option on the login page.",
                "decoys": [
                  "used"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'used' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp16_item10",
                "context": "There is a heat advisory today and my afternoon lab runs for three hours outside.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "bringing",
                  "plenty Of",
                  "bring",
                  "you should",
                  "water",
                  "and wear",
                  "light clothing"
                ],
                "correct_order": [
                  "you should",
                  "bring",
                  "plenty Of",
                  "water",
                  "and wear",
                  "light clothing"
                ],
                "correct_sentence": "You should bring plenty of water and wear light clothing.",
                "decoys": [
                  "bringing"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'bringing' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice17 = {
  "id": "sentence-practice-17",
  "title": "Build a Sentence Practice 17 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 17).",
  "stages": [
    {
      "id": "sp17_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp17_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp17_item01",
                "context": "My research parther dropped the class without telling me and the project is due next week. talk.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "talk",
                  "talked",
                  "to the professor",
                  "you should",
                  "right away",
                  "about",
                  "your situation"
                ],
                "correct_order": [
                  "you should",
                  "talk",
                  "to the professor",
                  "right away",
                  "about",
                  "your situation"
                ],
                "correct_sentence": "You should talk to the professor right away about your situation.",
                "decoys": [
                  "talked"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'talked' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp17_item02",
                "context": "l borrowed a library book three weeks ago and just found out it is overdue.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "return",
                  "returned",
                  "it today",
                  "further",
                  "to avoid",
                  "fees",
                  "you should"
                ],
                "correct_order": [
                  "you should",
                  "return",
                  "it today",
                  "to avoid",
                  "further",
                  "fees"
                ],
                "correct_sentence": "You should return it today to avoid further fees.",
                "decoys": [
                  "returned"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'returned' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp17_item03",
                "context": "l spilled red wine on the shared carpet in my apartment and my roommates are upset. ofter.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "otter",
                  "offered",
                  "to cover",
                  "the cost",
                  "right away",
                  "of cleaning",
                  "you should"
                ],
                "correct_order": [
                  "you should",
                  "to cover",
                  "the cost",
                  "of cleaning",
                  "right away",
                  "offered"
                ],
                "correct_sentence": "You should Offer to cover the cost Of cleaning right away.",
                "decoys": [
                  "otter"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'otter' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp17_item04",
                "context": "l have been sitting at my desk for ten hours straight studying without any breaks.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "a short walk",
                  "take",
                  "every",
                  "hour or so",
                  "taking",
                  "to reset",
                  "you really should"
                ],
                "correct_order": [
                  "you really should",
                  "take",
                  "a short walk",
                  "every",
                  "hour or so",
                  "to reset"
                ],
                "correct_sentence": "You really should take a short walk every hour or so to reset.",
                "decoys": [
                  "taking"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'taking' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp17_item05",
                "context": "My part-time job just cut my hours and I am struggling to pay my rent this month.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the financial",
                  "visiting",
                  "aid office",
                  "visit",
                  "about emergency funds",
                  "you should consider",
                  "to ask"
                ],
                "correct_order": [
                  "you should consider",
                  "visiting",
                  "the financial",
                  "aid office",
                  "to ask",
                  "about emergency funds"
                ],
                "correct_sentence": "You should consider visiting the financial aid oftice to ask about emergency funds.",
                "decoys": [
                  "visit"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'visit' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp17_item06",
                "context": "l want to try out for the tennis team but I have never played tennis before.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "take",
                  "a few",
                  "taken",
                  "you should",
                  "beginner lessons",
                  "before the tryout",
                  "first"
                ],
                "correct_order": [
                  "you should",
                  "take",
                  "a few",
                  "beginner lessons",
                  "before the tryout",
                  "first"
                ],
                "correct_sentence": "You should take a tew beginner lessons before the tryout first.",
                "decoys": [
                  "taken"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'taken' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp17_item07",
                "context": "l forgof to defrost the chicken for tonight's dinner and guests are coming in two hours.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "defrost it",
                  "using",
                  "quickly",
                  "use",
                  "to",
                  "you could",
                  "the microwave"
                ],
                "correct_order": [
                  "you could",
                  "use",
                  "the microwave",
                  "to",
                  "defrost it",
                  "quickly"
                ],
                "correct_sentence": "You could use the microwave to detrost it quickly.",
                "decoys": [
                  "using"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'using' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp17_item08",
                "context": "My friend keeps canceling our plans at the last minute and it is very frustrating.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "how this",
                  "have",
                  "you should",
                  "an honest",
                  "conversation about",
                  "had",
                  "makes you feel"
                ],
                "correct_order": [
                  "you should",
                  "have",
                  "an honest",
                  "conversation about",
                  "how this",
                  "makes you feel"
                ],
                "correct_sentence": "You should have an honest conversation about how this makes you feel.",
                "decoys": [
                  "had"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'had' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp17_item09",
                "context": "The student government is voting on a new tuition increase proposal at tonightg meeting. attending.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "attending",
                  "attend",
                  "to voice",
                  "your opinion",
                  "you should consider",
                  "directly",
                  "the meeting"
                ],
                "correct_order": [
                  "you should consider",
                  "the meeting",
                  "to voice",
                  "your opinion",
                  "directly",
                  "attend"
                ],
                "correct_sentence": "You should consider after%ing the meeting to voice your opinion directly.",
                "decoys": [
                  "attending"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'attending' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp17_item10",
                "context": "l shared my laptop password with a classmate and now I am worried about my private.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "change",
                  "Arrange these tiles into a sentence:",
                  "changed",
                  "your password",
                  "you should",
                  "immediately",
                  "and",
                  "revoke access"
                ],
                "correct_order": [
                  "you should",
                  "change",
                  "your password",
                  "immediately",
                  "and",
                  "revoke access",
                  "changed"
                ],
                "correct_sentence": "You should change your password immediately and revoke access.",
                "decoys": [
                  "Arrange these tiles into a sentence:"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'Arrange these tiles into a sentence:' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice18 = {
  "id": "sentence-practice-18",
  "title": "Build a Sentence Practice 18 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 18).",
  "stages": [
    {
      "id": "sp18_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp18_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp18_item01",
                "context": "l completely blanked during my oral presentation today and stood silent for a whole minute. practiced.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "practiced",
                  "practicing",
                  "beforehand",
                  "out loud",
                  "next time",
                  "you should try",
                  "in front of a mirror"
                ],
                "correct_order": [
                  "you should try",
                  "practicing",
                  "out loud",
                  "in front of a mirror",
                  "beforehand",
                  "next time"
                ],
                "correct_sentence": "You should try practicing out loud in front of a mirror beforehand next time.",
                "decoys": [
                  "practiced"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'practiced' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp18_item02",
                "context": "My landlord is trying to charge me for repairs that were already damaged when I moved in. showing.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "showing",
                  "show",
                  "the move-in",
                  "photos",
                  "and any",
                  "you should",
                  "inspection report"
                ],
                "correct_order": [
                  "you should",
                  "show",
                  "the move-in",
                  "inspection report",
                  "and any",
                  "photos"
                ],
                "correct_sentence": "You should show the move-in inspection report and any photos.",
                "decoys": [
                  "showing"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'showing' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp18_item03",
                "context": "l forgof to file my taxes and the deadline was last month.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "late filing",
                  "filed",
                  "you should",
                  "to reduce penalties",
                  "as Soon as possible"
                ],
                "correct_order": [
                  "you should",
                  "late filing",
                  "as Soon as possible",
                  "to reduce penalties"
                ],
                "correct_sentence": "You should file a late filing as soon as possible to reduce penalties.",
                "decoys": [
                  "filed"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'filed' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp18_item04",
                "context": "l accidentally sent a rude text message to the wrong person in my contact list.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "explain",
                  "explained",
                  "right away",
                  "and",
                  "you should",
                  "the mistake",
                  "apologize"
                ],
                "correct_order": [
                  "you should",
                  "explain",
                  "the mistake",
                  "and",
                  "apologize",
                  "right away"
                ],
                "correct_sentence": "You should explain the mistake and apologize rght away.",
                "decoys": [
                  "explained"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'explained' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp18_item05",
                "context": "There is a cultural festival on campus this weekend featuring food from over twenty.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "going",
                  "go",
                  "it would be",
                  "to",
                  "with a group",
                  "to try new things",
                  "a great opportunity"
                ],
                "correct_order": [
                  "it would be",
                  "a great opportunity",
                  "to",
                  "go",
                  "with a group",
                  "to try new things"
                ],
                "correct_sentence": "It would be a great opportunity to go with a group to try new things.",
                "decoys": [
                  "going"
                ],
                "explanation": "Cấu trúc ngữ pháp hoàn chỉnh diễn đạt giải pháp hợp lý cho tình huống: Từ bẫy 'going' không phù hợp về ngữ pháp và trật tự từ trong câu."
              },
              {
                "id": "sp18_item06",
                "context": "l cannof stop scrolling on my phone at night and I am only getting four hours of sleep.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "setting",
                  "a screen",
                  "time limit",
                  "after 10 PM",
                  "you should try",
                  "on your phone"
                ],
                "correct_order": [
                  "you should try",
                  "setting",
                  "a screen",
                  "time limit",
                  "on your phone"
                ],
                "correct_sentence": "You should try setting a screen time limit on your phone aner IO PM.",
                "decoys": [
                  "after 10 PM"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'after 10 PM' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp18_item07",
                "context": "The grocery store near my apartment only takes cash and I never carry any with me.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "keeping",
                  "Some cash",
                  "keep",
                  "on hand",
                  "like this",
                  "you should Start",
                  "for situations"
                ],
                "correct_order": [
                  "you should Start",
                  "keeping",
                  "Some cash",
                  "on hand",
                  "for situations",
                  "like this"
                ],
                "correct_sentence": "You should start Keeping some cash on hand for Situations like this.",
                "decoys": [
                  "keep"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'keep' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp18_item08",
                "context": "l locked my keys inside my car and I have a class that starts in twenty minutes.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "calling",
                  "call",
                  "campus security",
                  "you unlock it",
                  "you could",
                  "quickly",
                  "to help"
                ],
                "correct_order": [
                  "you could",
                  "call",
                  "campus security",
                  "to help",
                  "you unlock it",
                  "quickly"
                ],
                "correct_sentence": "You could call campus security to help you unlock it quickty.",
                "decoys": [
                  "calling"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'calling' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp18_item09",
                "context": "l hurt my knee last semester and my coach wants me to start training again next week. get.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "get",
                  "clearance",
                  "getting",
                  "you need to",
                  "sports doctor",
                  "trom a",
                  "before returning"
                ],
                "correct_order": [
                  "you need to",
                  "get",
                  "clearance",
                  "trom a",
                  "sports doctor",
                  "before returning"
                ],
                "correct_sentence": "You need to get clearance trom a sports doctor before returning.",
                "decoys": [
                  "getting"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'getting' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp18_item10",
                "context": "l need to read a full novel for class by Thursday but it is four hundred pages long.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "reading",
                  "read",
                  "the chapter",
                  "summaries first",
                  "you could",
                  "to find the",
                  "key points quickly"
                ],
                "correct_order": [
                  "you could",
                  "read",
                  "the chapter",
                  "summaries first",
                  "to find the",
                  "key points quickly"
                ],
                "correct_sentence": "You could read the chapter summaries first to find the key points quickly.",
                "decoys": [
                  "reading"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'reading' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice19 = {
  "id": "sentence-practice-19",
  "title": "Build a Sentence Practice 19 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 19).",
  "stages": [
    {
      "id": "sp19_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp19_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp19_item01",
                "context": "l am struggling with the statistics portion of my research methods class this semester.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "attend",
                  "attended",
                  "the tutoring",
                  "center's",
                  "on statistics",
                  "you should",
                  "weekly workshops"
                ],
                "correct_order": [
                  "you should",
                  "attend",
                  "the tutoring",
                  "center's",
                  "weekly workshops",
                  "on statistics"
                ],
                "correct_sentence": "You should attend the tutoring center's weekly workshops on statistics.",
                "decoys": [
                  "attended"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'attended' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp19_item02",
                "context": "A fornado watch has been issued for the area and I am on the top floor of a ten-story building. right now.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "right now",
                  "move",
                  "moved",
                  "to an interior",
                  "you need to",
                  "room",
                  "on a lower floor"
                ],
                "correct_order": [
                  "you need to",
                  "move",
                  "to an interior",
                  "room",
                  "on a lower floor",
                  "right now"
                ],
                "correct_sentence": "You need to move to an interior room on a lower l'oor right now.",
                "decoys": [
                  "moved"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'moved' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp19_item03",
                "context": "l found an unauthorized transaction on my bank statement this morning.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "call",
                  "called",
                  "your bank",
                  "to dispute",
                  "right away",
                  "you should",
                  "the charge"
                ],
                "correct_order": [
                  "you should",
                  "call",
                  "your bank",
                  "right away",
                  "to dispute",
                  "the charge"
                ],
                "correct_sentence": "You should call your bank right away to dispute the charge.",
                "decoys": [
                  "called"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'called' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp19_item04",
                "context": "l just moved to a new city for graduate school and I do nof know anyone here yet.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "joining",
                  "join",
                  "student clubs",
                  "you should try",
                  "to meet",
                  "people with",
                  "similar interests"
                ],
                "correct_order": [
                  "you should try",
                  "student clubs",
                  "to meet",
                  "people with",
                  "similar interests",
                  "join"
                ],
                "correct_sentence": "You should try student clubs to meet people with similar interests.",
                "decoys": [
                  "joining"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'joining' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp19_item05",
                "context": "My roommate used my expensive skincare products without asking and does nof think.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "discuss",
                  "discussed",
                  "boundaries",
                  "belongings",
                  "about personal",
                  "calmly",
                  "you two should"
                ],
                "correct_order": [
                  "you two should",
                  "discuss",
                  "boundaries",
                  "about personal",
                  "belongings",
                  "calmly"
                ],
                "correct_sentence": "You should discuss boundaries about personal belongings calmly.",
                "decoys": [
                  "discussed"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'discussed' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp19_item06",
                "context": "l want to cook healthy meals but I do nof have any cooking experience at all.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "by watching",
                  "watch",
                  "beginner cooking",
                  "tutorials",
                  "you could Start",
                  "online",
                  "for simple recipes"
                ],
                "correct_order": [
                  "you could Start",
                  "by watching",
                  "beginner cooking",
                  "tutorials",
                  "online",
                  "for simple recipes"
                ],
                "correct_sentence": "You could start by watching beginner cooking tutorials online for simple recipes.",
                "decoys": [
                  "watch"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'watch' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp19_item07",
                "context": "l need to submit my assignment online but the university portal has been down all morning. emailing.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "emailing",
                  "email",
                  "your protessor",
                  "you should",
                  "directly",
                  "to explain",
                  "the situation"
                ],
                "correct_order": [
                  "you should",
                  "email",
                  "your protessor",
                  "directly",
                  "to explain",
                  "the situation"
                ],
                "correct_sentence": "You should email your protessor directly to explan the situation.",
                "decoys": [
                  "emailing"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'emailing' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp19_item08",
                "context": "l have been eating only salads to lose weight for the swim team weigh-in but I feel weak. speak.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "speak",
                  "spoke",
                  "a sports nutritionist",
                  "you really should",
                  "to",
                  "about",
                  "a proper plan"
                ],
                "correct_order": [
                  "you really should",
                  "speak",
                  "to",
                  "a sports nutritionist",
                  "about",
                  "a proper plan"
                ],
                "correct_sentence": "You really Should speak to a sports nutritionist about a proper plan.",
                "decoys": [
                  "spoke"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'spoke' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp19_item09",
                "context": "l found research data from a study I want to cite but the original paper is behind a paywall. asking.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "asking",
                  "ask",
                  "a librarian",
                  "you could",
                  "help you",
                  "to",
                  "access it for free"
                ],
                "correct_order": [
                  "you could",
                  "ask",
                  "a librarian",
                  "to",
                  "help you",
                  "access it for free"
                ],
                "correct_sentence": "You could ask a librarian to help you access it for free.",
                "decoys": [
                  "asking"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'asking' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp19_item10",
                "context": "My professor announced extra credit for students who attend this Friday's guest lecture. mark.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "mark",
                  "marked",
                  "your calendar",
                  "your schedule",
                  "you should definitely",
                  "for it",
                  "and clear"
                ],
                "correct_order": [
                  "you should definitely",
                  "mark",
                  "your calendar",
                  "and clear",
                  "your schedule",
                  "for it"
                ],
                "correct_sentence": "You should definitely mark your calendar and clear your schedule for it.",
                "decoys": [
                  "marked"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'marked' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice20 = {
  "id": "sentence-practice-20",
  "title": "Build a Sentence Practice 20 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 20).",
  "stages": [
    {
      "id": "sp20_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp20_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp20_item01",
                "context": "l gof a much lower grade on my essay than I expected and I do nof understand why.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "requesting",
                  "request",
                  "detailed feedback",
                  "during office hours",
                  "you should try",
                  "about the grade",
                  "from your professor"
                ],
                "correct_order": [
                  "you should try",
                  "requesting",
                  "detailed feedback",
                  "from your professor",
                  "during office hours",
                  "about the grade"
                ],
                "correct_sentence": "You should try requesting detailed feedback trom your professor during office hours about the grade.",
                "decoys": [
                  "request"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'request' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp20_item02",
                "context": "l have been having sharp chest pains during my morning runs this whole week.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "stop",
                  "stopped",
                  "running",
                  "immediately",
                  "before going again",
                  "you should",
                  "and see a doctor"
                ],
                "correct_order": [
                  "you should",
                  "stop",
                  "running",
                  "immediately",
                  "and see a doctor",
                  "before going again"
                ],
                "correct_sentence": "You should stop running immediately and see a doctor betore going again.",
                "decoys": [
                  "stopped"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'stopped' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp20_item03",
                "context": "l missed my train back to campus and the next one does nof leave for three hours.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "seeing",
                  "there is",
                  "that leaves sooner",
                  "you could",
                  "a bus"
                ],
                "correct_order": [
                  "you could",
                  "there is",
                  "a bus",
                  "that leaves sooner"
                ],
                "correct_sentence": "You could see if there is a that leaves sooner.",
                "decoys": [
                  "seeing"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'seeing' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp20_item04",
                "context": "My apartment's fire alarm goes off randomly in the middle of the night for no reason.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "logged",
                  "each incident",
                  "and notify",
                  "in writing",
                  "you should",
                  "your building manager"
                ],
                "correct_order": [
                  "you should",
                  "each incident",
                  "in writing",
                  "and notify",
                  "your building manager"
                ],
                "correct_sentence": "You should log each incident and notify your building manager in.",
                "decoys": [
                  "logged"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'logged' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp20_item05",
                "context": "l embarrassed myself in front of the whole class by mispronouncing the professor's.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "try",
                  "tried",
                  "nof to overthink it",
                  "makes mistakes",
                  "you should",
                  "like that",
                  "eve"
                ],
                "correct_order": [
                  "you should",
                  "try",
                  "nof to overthink it",
                  "eve",
                  "makes mistakes",
                  "like that"
                ],
                "correct_sentence": "You should try nof to overthink it everyone makes mistakes like that.",
                "decoys": [
                  "tried"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'tried' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp20_item06",
                "context": "l am trying to save money for next year's tuition but I spend too much on.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "a monthly",
                  "setting",
                  "entertainment budget",
                  "you could try",
                  "and sticking",
                  "to it",
                  "set"
                ],
                "correct_order": [
                  "you could try",
                  "setting",
                  "a monthly",
                  "entertainment budget",
                  "and sticking",
                  "to it"
                ],
                "correct_sentence": "You could try setting a monthly entertainment budget and sticking to it.",
                "decoys": [
                  "set"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'set' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp20_item07",
                "context": "l lost a library book that was worth sixty dollars and I do nof know what to do.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "reporting",
                  "report",
                  "it lost",
                  "the fine",
                  "and ask about",
                  "you should",
                  "to the library"
                ],
                "correct_order": [
                  "you should",
                  "report",
                  "it lost",
                  "to the library",
                  "and ask about",
                  "the fine"
                ],
                "correct_sentence": "You should report it lost to the library and asK about the fine.",
                "decoys": [
                  "reporting"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'reporting' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp20_item08",
                "context": "The dining hall closes at eight and I always finish my evening classes at eight thirty.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "packing",
                  "pack",
                  "a snack",
                  "trom the",
                  "for after class",
                  "you could",
                  "vending machines"
                ],
                "correct_order": [
                  "you could",
                  "pack",
                  "a snack",
                  "trom the",
                  "vending machines",
                  "for after class"
                ],
                "correct_sentence": "You could pack a snack from the vending machines for after Class.",
                "decoys": [
                  "packing"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'packing' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp20_item09",
                "context": "l have been training hard for a marathon but my running pace has nof improved in a month. working.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "working",
                  "work",
                  "with a coach",
                  "to analyze",
                  "you might benefit",
                  "your form",
                  "trom"
                ],
                "correct_order": [
                  "you might benefit",
                  "working",
                  "with a coach",
                  "to analyze",
                  "your form",
                  "trom"
                ],
                "correct_sentence": "You might benefit from working with a coach to analyze your form.",
                "decoys": [
                  "work"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'work' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp20_item10",
                "context": "l want to start a new student organization on campus but I do nof know the process.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "visiting",
                  "visit",
                  "the student life",
                  "office",
                  "you should start",
                  "by",
                  "for guidance"
                ],
                "correct_order": [
                  "you should start",
                  "by",
                  "visiting",
                  "the student life",
                  "office",
                  "for guidance"
                ],
                "correct_sentence": "You should start by visiting the student life office for guidance.",
                "decoys": [
                  "visit"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'visit' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice21 = {
  "id": "sentence-practice-21",
  "title": "Build a Sentence Practice 21 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 21).",
  "stages": [
    {
      "id": "sp21_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp21_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp21_item01",
                "context": "",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "but no one told us who.",
                  "Arrange these tiles into a sentence:",
                  "who",
                  "It was",
                  "fixing",
                  "the repair",
                  "for our",
                  "the supervisor",
                  "arranged",
                  "dorm"
                ],
                "correct_order": [
                  "It was",
                  "the supervisor",
                  "but no one told us who.",
                  "who",
                  "Arrange these tiles into a sentence:",
                  "arranged",
                  "the repair",
                  "for our",
                  "dorm"
                ],
                "correct_sentence": "It was the supervisor who arranged the repair for our dorm.",
                "decoys": [
                  "fixing"
                ],
                "explanation": "Cấu trúc câu chẻ nhấn mạnh (Cleft sentence): 'It was/is + đối tượng nhấn mạnh + that/who + V...'. Từ bẫy 'fixing' bị loại bỏ do sai dạng ngữ pháp hoặc thừa thành phần bổ ngữ."
              },
              {
                "id": "sp21_item02",
                "context": "My professor always says that the work students do before an exam is just as important as the exam itself.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "truly",
                  "What you",
                  "mattered",
                  "do",
                  "before",
                  "each exam",
                  "matters"
                ],
                "correct_order": [
                  "What you",
                  "do",
                  "before",
                  "each exam",
                  "truly",
                  "matters"
                ],
                "correct_sentence": "What you do before each exam truly matters.",
                "decoys": [
                  "mattered"
                ],
                "explanation": "Mệnh đề danh ngữ làm chủ ngữ (Wh-cleft / Noun clause): 'Wh-clause + V chính + O/C'. Từ bẫy 'mattered' bị loại bỏ vì không phù hợp với thì hoặc cấu trúc động từ chính của câu."
              },
              {
                "id": "sp21_item03",
                "context": "l need to find recent peer-reviewed articles for my thesis but I am nof sure where to.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "checked",
                  "checking",
                  "the library",
                  "database",
                  "for peer-reviewed",
                  "articles",
                  "Have you"
                ],
                "correct_order": [
                  "Have you",
                  "checked",
                  "the library",
                  "database",
                  "for peer-reviewed",
                  "articles"
                ],
                "correct_sentence": "Have you checked the library database for peer-reviewed articles.",
                "decoys": [
                  "checking"
                ],
                "explanation": "Câu hỏi gợi ý/kiểm tra thông tin với trợ động từ: 'Have/Did you + V...?'. Từ bẫy 'checking' sai dạng động từ nguyên mẫu có to/V-ing không phù hợp sau trợ động từ."
              },
              {
                "id": "sp21_item04",
                "context": "The financial aid office reported that scholarship applicaféions have reached an all-time high this year. many students.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "many students",
                  "Never",
                  "for financial",
                  "applied",
                  "applying",
                  "had so"
                ],
                "correct_order": [
                  "Never",
                  "had so",
                  "many students",
                  "applied",
                  "for financial"
                ],
                "correct_sentence": "Never had so many students applied for financial aid.",
                "decoys": [
                  "applying"
                ],
                "explanation": "Cấu trúc đảo ngữ phủ định / giới hạn (Negative inversion): Trạng từ phủ định đứng đầu câu + trợ động từ / to be + S + V chính. Từ bẫy 'applying' sai thì hoặc sai dạng trợ động từ."
              },
              {
                "id": "sp21_item05",
                "context": "The new express campus bus takes a slightly longer route but students say it saves them a lof Of time. the express.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the express",
                  "saving",
                  "Although",
                  "saves time",
                  "each day",
                  "bus",
                  "longer"
                ],
                "correct_order": [
                  "Although",
                  "longer",
                  "the express",
                  "bus",
                  "saves time",
                  "each day"
                ],
                "correct_sentence": "Although longer the express bus saves time each day.",
                "decoys": [
                  "saving"
                ],
                "explanation": "Mệnh đề trạng ngữ chỉ sự nhượng bộ/nguyên nhân: 'Liên từ + Mệnh đề phụ, Mệnh đề chính'. Từ bẫy 'saving' thừa từ hoặc sai cấu trúc nối câu."
              },
              {
                "id": "sp21_item06",
                "context": "A particular app completely changed how I manage my study schedule and assignments each week.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "helped me",
                  "that",
                  "helping",
                  "planner",
                  "It was",
                  "the study",
                  "stay organized"
                ],
                "correct_order": [
                  "It was",
                  "the study",
                  "planner",
                  "that",
                  "helped me",
                  "stay organized"
                ],
                "correct_sentence": "It was the study planner that heoed me stay organized.",
                "decoys": [
                  "helping"
                ],
                "explanation": "Cấu trúc câu chẻ nhấn mạnh (Cleft sentence): 'It was/is + đối tượng nhấn mạnh + that/who + V...'. Từ bẫy 'helping' bị loại bỏ do sai dạng ngữ pháp hoặc thừa thành phần bổ ngữ."
              },
              {
                "id": "sp21_item07",
                "context": "The coach said that mental toughness is the quality that separates good athletes from great ones. stressed most.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "stressed most",
                  "stressing",
                  "coach",
                  "preparation",
                  "was",
                  "What the",
                  "mental"
                ],
                "correct_order": [
                  "What the",
                  "coach",
                  "stressed most",
                  "was",
                  "mental",
                  "preparation"
                ],
                "correct_sentence": "What the coach stressed most was mental preparation.",
                "decoys": [
                  "stressing"
                ],
                "explanation": "Mệnh đề danh ngữ làm chủ ngữ (Wh-cleft / Noun clause): 'Wh-clause + V chính + O/C'. Từ bẫy 'stressing' bị loại bỏ vì không phù hợp với thì hoặc cấu trúc động từ chính của câu."
              },
              {
                "id": "sp21_item08",
                "context": "l have been feeling exhausted every morning this week even after sleeping for eight hours. ways to.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "ways to",
                  "Did your",
                  "improve",
                  "recommending",
                  "your sleep",
                  "quality",
                  "doctor",
                  "recommend"
                ],
                "correct_order": [
                  "Did your",
                  "doctor",
                  "recommend",
                  "ways to",
                  "improve",
                  "your sleep",
                  "quality"
                ],
                "correct_sentence": "Did your doctor recommend ways to improve your sleep quality.",
                "decoys": [
                  "recommending"
                ],
                "explanation": "Câu hỏi gợi ý/kiểm tra thông tin với trợ động từ: 'Have/Did you + V...?'. Từ bẫy 'recommending' sai dạng động từ nguyên mẫu có to/V-ing không phù hợp sau trợ động từ."
              },
              {
                "id": "sp21_item09",
                "context": "The annual spring fair was even more successful this year and raised more money than any previous year.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "fair attract",
                  "Nof only",
                  "did the",
                  "attracting",
                  "also raised",
                  "huge crowds",
                  "more funds",
                  "but it"
                ],
                "correct_order": [
                  "Nof only",
                  "did the",
                  "fair attract",
                  "huge crowds",
                  "but it",
                  "also raised",
                  "more funds"
                ],
                "correct_sentence": "Nof only did the fair attract huge crowds but it also raised more funds.",
                "decoys": [
                  "attracting"
                ],
                "explanation": "Cấu trúc ngữ pháp hoàn chỉnh diễn đạt giải pháp hợp lý cho tình huống: Từ bẫy 'attracting' không phù hợp về ngữ pháp và trật tự từ trong câu."
              },
              {
                "id": "sp21_item10",
                "context": "The cafeteria added more vegetarian dishes to its menu after students repeatedly asked for better options.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "expanded",
                  "the cafeteria",
                  "requesting",
                  "students",
                  "Since many",
                  "requested",
                  "its vegetarian",
                  "menu"
                ],
                "correct_order": [
                  "Since many",
                  "students",
                  "requested",
                  "the cafeteria",
                  "expanded",
                  "its vegetarian",
                  "menu"
                ],
                "correct_sentence": "Since many students requested It the caféeteria expanded its vegetarian menu.",
                "decoys": [
                  "requesting"
                ],
                "explanation": "Mệnh đề trạng ngữ chỉ sự nhượng bộ/nguyên nhân: 'Liên từ + Mệnh đề phụ, Mệnh đề chính'. Từ bẫy 'requesting' thừa từ hoặc sai cấu trúc nối câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice22 = {
  "id": "sentence-practice-22",
  "title": "Build a Sentence Practice 22 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 22).",
  "stages": [
    {
      "id": "sp22_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp22_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp22_item01",
                "context": "A particular teaching method helped me finally understand a concept I had been struggling with all semester.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "making",
                  "the protessor's",
                  "clear",
                  "method",
                  "It was",
                  "that",
                  "made everything"
                ],
                "correct_order": [
                  "It was",
                  "the protessor's",
                  "method",
                  "that",
                  "made everything",
                  "clear"
                ],
                "correct_sentence": "It was the professor's method that made everything.",
                "decoys": [
                  "making"
                ],
                "explanation": "Cấu trúc câu chẻ nhấn mạnh (Cleft sentence): 'It was/is + đối tượng nhấn mạnh + that/who + V...'. Từ bẫy 'making' bị loại bỏ do sai dạng ngữ pháp hoặc thừa thành phần bổ ngữ."
              },
              {
                "id": "sp22_item02",
                "context": "My resident advisor explained that building a good relationship with your roommate takes real effort. communicaféed.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "communicaféed",
                  "is open",
                  "What matters",
                  "most",
                  "communicaféion",
                  "with your",
                  "roommate"
                ],
                "correct_order": [
                  "What matters",
                  "most",
                  "is open",
                  "communicaféion",
                  "with your",
                  "roommate"
                ],
                "correct_sentence": "What matters most is open communicaféion with your roommate.",
                "decoys": [
                  "communicaféed"
                ],
                "explanation": "Mệnh đề danh ngữ làm chủ ngữ (Wh-cleft / Noun clause): 'Wh-clause + V chính + O/C'. Từ bẫy 'communicaféed' bị loại bỏ vì không phù hợp với thì hoặc cấu trúc động từ chính của câu."
              },
              {
                "id": "sp22_item03",
                "context": "There is a career fair next week and I want to find out which companies are attending before I prepare. Did you.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "Did you",
                  "for a",
                  "career center",
                  "of attending",
                  "companies",
                  "checking",
                  "check the"
                ],
                "correct_order": [
                  "Did you",
                  "check the",
                  "career center",
                  "for a",
                  "of attending",
                  "companies"
                ],
                "correct_sentence": "Did you check the career center for a list Of attending companies.",
                "decoys": [
                  "checking"
                ],
                "explanation": "Câu hỏi gợi ý/kiểm tra thông tin với trợ động từ: 'Have/Did you + V...?'. Từ bẫy 'checking' sai dạng động từ nguyên mẫu có to/V-ing không phù hợp sau trợ động từ."
              },
              {
                "id": "sp22_item04",
                "context": "The dormitory policy strictly states that quiet hours must be respected by all residents at all times.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "should residents",
                  "making",
                  "loud noise",
                  "Never",
                  "make",
                  "after midnight"
                ],
                "correct_order": [
                  "Never",
                  "should residents",
                  "make",
                  "loud noise",
                  "after midnight"
                ],
                "correct_sentence": "Never should residents make loud noise after midnight.",
                "decoys": [
                  "making"
                ],
                "explanation": "Cấu trúc đảo ngữ phủ định / giới hạn (Negative inversion): Trạng từ phủ định đứng đầu câu + trợ động từ / to be + S + V chính. Từ bẫy 'making' sai thì hoặc sai dạng trợ động từ."
              },
              {
                "id": "sp22_item05",
                "context": "Many students feel overwhelmed during finals and are nof sure how to manage stress.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "reducing",
                  "Even though",
                  "exams are",
                  "regular exercise",
                  "can significantly",
                  "stressful",
                  "reduce anxiety"
                ],
                "correct_order": [
                  "Even though",
                  "exams are",
                  "stressful",
                  "regular exercise",
                  "can significantly",
                  "reduce anxiety"
                ],
                "correct_sentence": "Even though exams are stressful regular exercise can significantly reduce anxiety.",
                "decoys": [
                  "reducing"
                ],
                "explanation": "Mệnh đề trạng ngữ chỉ sự nhượng bộ/nguyên nhân: 'Liên từ + Mệnh đề phụ, Mệnh đề chính'. Từ bẫy 'reducing' thừa từ hoặc sai cấu trúc nối câu."
              },
              {
                "id": "sp22_item06",
                "context": "One specific training drill had a major impact on our team's ability to work together this.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the",
                  "the daily",
                  "improving",
                  "improved",
                  "It was",
                  "coordination",
                  "that",
                  "passing drill"
                ],
                "correct_order": [
                  "It was",
                  "the",
                  "the daily",
                  "passing drill",
                  "that",
                  "improved",
                  "coordination"
                ],
                "correct_sentence": "It was the daily passing drill that improved the team's coordination.",
                "decoys": [
                  "improving"
                ],
                "explanation": "Cấu trúc câu chẻ nhấn mạnh (Cleft sentence): 'It was/is + đối tượng nhấn mạnh + that/who + V...'. Từ bẫy 'improving' bị loại bỏ do sai dạng ngữ pháp hoặc thừa thành phần bổ ngữ."
              },
              {
                "id": "sp22_item07",
                "context": "My financial advisor says the money habits you build in college follow you for the rest Of your life. shaped.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "shaped",
                  "your money",
                  "your future",
                  "in college",
                  "manage",
                  "shapes",
                  "habits",
                  "How you"
                ],
                "correct_order": [
                  "How you",
                  "manage",
                  "your money",
                  "your future",
                  "in college",
                  "shapes",
                  "habits"
                ],
                "correct_sentence": "How you manage your money in college shapes your tuture habits.",
                "decoys": [
                  "shaped"
                ],
                "explanation": "Mệnh đề danh ngữ làm chủ ngữ (Wh-cleft / Noun clause): 'Wh-clause + V chính + O/C'. Từ bẫy 'shaped' bị loại bỏ vì không phù hợp với thì hoặc cấu trúc động từ chính của câu."
              },
              {
                "id": "sp22_item08",
                "context": "",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "present in class.",
                  "Arrange these tiles into a sentence:",
                  "Have you",
                  "recovered",
                  "using the",
                  "the files",
                  "backup software",
                  "tried",
                  "recovering"
                ],
                "correct_order": [
                  "Have you",
                  "Arrange these tiles into a sentence:",
                  "tried",
                  "recovering",
                  "present in class.",
                  "the files",
                  "using the",
                  "backup software"
                ],
                "correct_sentence": "Have you tried recovering the files using the backup software.",
                "decoys": [
                  "recovered"
                ],
                "explanation": "Câu hỏi gợi ý/kiểm tra thông tin với trợ động từ: 'Have/Did you + V...?'. Từ bẫy 'recovered' sai dạng động từ nguyên mẫu có to/V-ing không phù hợp sau trợ động từ."
              },
              {
                "id": "sp22_item09",
                "context": "Last nights snowsform was the most severe in years and caused major disruptions across the campus.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "shut the",
                  "Seldom",
                  "shutting",
                  "campus down",
                  "has any",
                  "sform",
                  "so completely"
                ],
                "correct_order": [
                  "Seldom",
                  "has any",
                  "sform",
                  "shut the",
                  "campus down",
                  "so completely"
                ],
                "correct_sentence": "Seldom has any sform shut the campus down so completely.",
                "decoys": [
                  "shutting"
                ],
                "explanation": "Cấu trúc đảo ngữ phủ định / giới hạn (Negative inversion): Trạng từ phủ định đứng đầu câu + trợ động từ / to be + S + V chính. Từ bẫy 'shutting' sai thì hoặc sai dạng trợ động từ."
              },
              {
                "id": "sp22_item10",
                "context": "The library extended its opening hours during finals week so that more students could find a place to study.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "it opens",
                  "While",
                  "staying",
                  "until midnight",
                  "for finals",
                  "the library",
                  "closes at",
                  "ten"
                ],
                "correct_order": [
                  "While",
                  "the library",
                  "closes at",
                  "ten",
                  "it opens",
                  "until midnight",
                  "for finals"
                ],
                "correct_sentence": "While the library closes at ten it opens until midnight for finals.",
                "decoys": [
                  "staying"
                ],
                "explanation": "Mệnh đề trạng ngữ chỉ sự nhượng bộ/nguyên nhân: 'Liên từ + Mệnh đề phụ, Mệnh đề chính'. Từ bẫy 'staying' thừa từ hoặc sai cấu trúc nối câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice23 = {
  "id": "sentence-practice-23",
  "title": "Build a Sentence Practice 23 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 23).",
  "stages": [
    {
      "id": "sp23_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp23_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp23_item01",
                "context": "One student discovered a hidden dining hall on the far side of campus that almost no one uses. who first.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "who first",
                  "It was",
                  "discovering",
                  "one student",
                  "the quiet",
                  "dining nall",
                  "discovered"
                ],
                "correct_order": [
                  "It was",
                  "one student",
                  "who first",
                  "discovered",
                  "the quiet",
                  "dining nall"
                ],
                "correct_sentence": "It was one student who first discovered the quiet dining hall.",
                "decoys": [
                  "discovering"
                ],
                "explanation": "Cấu trúc câu chẻ nhấn mạnh (Cleft sentence): 'It was/is + đối tượng nhấn mạnh + that/who + V...'. Từ bẫy 'discovering' bị loại bỏ do sai dạng ngữ pháp hoặc thừa thành phần bổ ngữ."
              },
              {
                "id": "sp23_item02",
                "context": "My advisor says the distance between where you live and campus affects how much time you have to study.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "determined",
                  "on campus",
                  "how long",
                  "determines",
                  "commuting",
                  "Where you",
                  "live",
                  "you spend"
                ],
                "correct_order": [
                  "Where you",
                  "live",
                  "on campus",
                  "determines",
                  "how long",
                  "you spend",
                  "commuting"
                ],
                "correct_sentence": "Where you live on campus determines how long you spend commuting.",
                "decoys": [
                  "determined"
                ],
                "explanation": "Mệnh đề danh ngữ làm chủ ngữ (Wh-cleft / Noun clause): 'Wh-clause + V chính + O/C'. Từ bẫy 'determined' bị loại bỏ vì không phù hợp với thì hoặc cấu trúc động từ chính của câu."
              },
              {
                "id": "sp23_item03",
                "context": "l gof a very poor grade on my chemistry lab report and I cannof figure out where I went wrong. to explain.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "to explain",
                  "Did you",
                  "assistant",
                  "asking",
                  "the teaching",
                  "where you",
                  "lost points",
                  "ask"
                ],
                "correct_order": [
                  "Did you",
                  "the teaching",
                  "assistant",
                  "to explain",
                  "where you",
                  "lost points",
                  "ask"
                ],
                "correct_sentence": "Did you the teaching assistant to explain where you lost points.",
                "decoys": [
                  "asking"
                ],
                "explanation": "Câu hỏi gợi ý/kiểm tra thông tin với trợ động từ: 'Have/Did you + V...?'. Từ bẫy 'asking' sai dạng động từ nguyên mẫu có to/V-ing không phù hợp sau trợ động từ."
              },
              {
                "id": "sp23_item04",
                "context": "The resident advisor made it very clear that overnight guests are nof allowed in the.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "remaining",
                  "may guests",
                  "account",
                  "in the",
                  "On no",
                  "stay",
                  "building",
                  "past eleven"
                ],
                "correct_order": [
                  "On no",
                  "account",
                  "may guests",
                  "stay",
                  "in the",
                  "building",
                  "past eleven"
                ],
                "correct_sentence": "On no account may guests stay in the building past eleven.",
                "decoys": [
                  "remaining"
                ],
                "explanation": "Cấu trúc ngữ pháp hoàn chỉnh diễn đạt giải pháp hợp lý cho tình huống: Từ bẫy 'remaining' không phù hợp về ngữ pháp và trật tự từ trong câu."
              },
              {
                "id": "sp23_item05",
                "context": "Students who submit their housing applicaféions early almost always get their first choice Of dormitory.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "submitting",
                  "receive priority",
                  "you should",
                  "to apply",
                  "Because",
                  "early applicants",
                  "very soon"
                ],
                "correct_order": [
                  "Because",
                  "early applicants",
                  "receive priority",
                  "you should",
                  "to apply",
                  "very soon"
                ],
                "correct_sentence": "Because earty applicants receive priority you should apply very soon.",
                "decoys": [
                  "submitting"
                ],
                "explanation": "Mệnh đề trạng ngữ chỉ sự nhượng bộ/nguyên nhân: 'Liên từ + Mệnh đề phụ, Mệnh đề chính'. Từ bẫy 'submitting' thừa từ hoặc sai cấu trúc nối câu."
              },
              {
                "id": "sp23_item06",
                "context": "A counseling workshop I attended last semester gave me practical tools for dealing with academic stress.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "helping",
                  "that",
                  "the workshop",
                  "It was",
                  "exams",
                  "helped me",
                  "cope with"
                ],
                "correct_order": [
                  "It was",
                  "the workshop",
                  "that",
                  "helped me",
                  "cope with",
                  "exams"
                ],
                "correct_sentence": "It was the workshop that helped me cope with exams.",
                "decoys": [
                  "helping"
                ],
                "explanation": "Cấu trúc câu chẻ nhấn mạnh (Cleft sentence): 'It was/is + đối tượng nhấn mạnh + that/who + V...'. Từ bẫy 'helping' bị loại bỏ do sai dạng ngữ pháp hoặc thừa thành phần bổ ngữ."
              },
              {
                "id": "sp23_item07",
                "context": "My menfor said that the people you spend time with during college have a lasting effect on your career.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "can shape",
                  "shaped",
                  "yourselt with",
                  "Who you",
                  "your future",
                  "surround",
                  "during college"
                ],
                "correct_order": [
                  "Who you",
                  "surround",
                  "yourselt with",
                  "during college",
                  "can shape",
                  "your future"
                ],
                "correct_sentence": "Who you surround yourself with during college can shape your future.",
                "decoys": [
                  "shaped"
                ],
                "explanation": "Mệnh đề danh ngữ làm chủ ngữ (Wh-cleft / Noun clause): 'Wh-clause + V chính + O/C'. Từ bẫy 'shaped' bị loại bỏ vì không phù hợp với thì hoặc cấu trúc động từ chính của câu."
              },
              {
                "id": "sp23_item08",
                "context": "l registered for the community volunteer program a month ago but I have nof heard anything about my placement.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "about your",
                  "Have you",
                  "placement",
                  "with the",
                  "following",
                  "followed up",
                  "volunteer coordinator"
                ],
                "correct_order": [
                  "Have you",
                  "followed up",
                  "with the",
                  "volunteer coordinator",
                  "about your",
                  "placement"
                ],
                "correct_sentence": "Have you followed up With the volunteer coordinafor your placement.",
                "decoys": [
                  "following"
                ],
                "explanation": "Câu hỏi gợi ý/kiểm tra thông tin với trợ động từ: 'Have/Did you + V...?'. Từ bẫy 'following' sai dạng động từ nguyên mẫu có to/V-ing không phù hợp sau trợ động từ."
              },
              {
                "id": "sp23_item09",
                "context": "Our university team nof only won the championship this year but also received an award for sportsmanship.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "did the",
                  "winning",
                  "but they",
                  "also received",
                  "a special",
                  "award",
                  "Nof only",
                  "team win"
                ],
                "correct_order": [
                  "Nof only",
                  "did the",
                  "team win",
                  "but they",
                  "also received",
                  "a special",
                  "award"
                ],
                "correct_sentence": "Nof only did the team win but they also received a special award.",
                "decoys": [
                  "winning"
                ],
                "explanation": "Cấu trúc ngữ pháp hoàn chỉnh diễn đạt giải pháp hợp lý cho tình huống: Từ bẫy 'winning' không phù hợp về ngữ pháp và trật tự từ trong câu."
              },
              {
                "id": "sp23_item10",
                "context": "Online learning tools have made it far easier for students to access course materials at any time. some students.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "some students",
                  "studied",
                  "Although",
                  "the library",
                  "online tools",
                  "still prefer",
                  "are useful"
                ],
                "correct_order": [
                  "Although",
                  "online tools",
                  "are useful",
                  "some students",
                  "still prefer",
                  "the library"
                ],
                "correct_sentence": "Although online tools are useful some students still prefer the library.",
                "decoys": [
                  "studied"
                ],
                "explanation": "Mệnh đề trạng ngữ chỉ sự nhượng bộ/nguyên nhân: 'Liên từ + Mệnh đề phụ, Mệnh đề chính'. Từ bẫy 'studied' thừa từ hoặc sai cấu trúc nối câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice24 = {
  "id": "sentence-practice-24",
  "title": "Build a Sentence Practice 24 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 24).",
  "stages": [
    {
      "id": "sp24_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp24_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp24_item01",
                "context": "One person in my study group explained the most difficult concept in a way that finally made sense to everyone.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "most clearly",
                  "explaining",
                  "It was",
                  "the concept",
                  "Maria",
                  "who explained"
                ],
                "correct_order": [
                  "It was",
                  "Maria",
                  "who explained",
                  "the concept",
                  "most clearly"
                ],
                "correct_sentence": "It was Maria who explained the concept most clearly.",
                "decoys": [
                  "explaining"
                ],
                "explanation": "Cấu trúc câu chẻ nhấn mạnh (Cleft sentence): 'It was/is + đối tượng nhấn mạnh + that/who + V...'. Từ bẫy 'explaining' bị loại bỏ do sai dạng ngữ pháp hoặc thừa thành phần bổ ngữ."
              },
              {
                "id": "sp24_item02",
                "context": "My thesis advisor told me that choosing the right research topic early on is the single most important decision.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "to study",
                  "setting",
                  "first year",
                  "shapes",
                  "your whole",
                  "degree",
                  "What you",
                  "in your"
                ],
                "correct_order": [
                  "What you",
                  "to study",
                  "in your",
                  "first year",
                  "shapes",
                  "your whole",
                  "degree"
                ],
                "correct_sentence": "What you study in your first year shapes your whole degree.",
                "decoys": [
                  "setting"
                ],
                "explanation": "Mệnh đề danh ngữ làm chủ ngữ (Wh-cleft / Noun clause): 'Wh-clause + V chính + O/C'. Từ bẫy 'setting' bị loại bỏ vì không phù hợp với thì hoặc cấu trúc động từ chính của câu."
              },
              {
                "id": "sp24_item03",
                "context": "l put in a request for a room transfer two weeks ago and I have nof received any resiX)nse from the Office.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "about your",
                  "checking",
                  "housing office",
                  "called the",
                  "room request",
                  "Have you"
                ],
                "correct_order": [
                  "Have you",
                  "called the",
                  "housing office",
                  "about your",
                  "room request"
                ],
                "correct_sentence": "Have you called the housing Office about your room request.",
                "decoys": [
                  "checking"
                ],
                "explanation": "Câu hỏi gợi ý/kiểm tra thông tin với trợ động từ: 'Have/Did you + V...?'. Từ bẫy 'checking' sai dạng động từ nguyên mẫu có to/V-ing không phù hợp sau trợ động từ."
              },
              {
                "id": "sp24_item04",
                "context": "The library's special archive section has an extremely strict policy that prohibits all food and drinks. or drinks.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "or drinks",
                  "permitting",
                  "No food",
                  "section",
                  "are permitted",
                  "in the",
                  "archive"
                ],
                "correct_order": [
                  "No food",
                  "or drinks",
                  "are permitted",
                  "in the",
                  "archive",
                  "section"
                ],
                "correct_sentence": "No food or drinks are permitted in the archive section.",
                "decoys": [
                  "permitting"
                ],
                "explanation": "Cấu trúc ngữ pháp hoàn chỉnh diễn đạt giải pháp hợp lý cho tình huống: Từ bẫy 'permitting' không phù hợp về ngữ pháp và trật tự từ trong câu."
              },
              {
                "id": "sp24_item05",
                "context": "Heavy rain is forecast for this weekend and the outdoor graduation ceremony could be affected by the weather.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "be bad",
                  "moving",
                  "the weather",
                  "Should",
                  "moves",
                  "indoors",
                  "the ceremony"
                ],
                "correct_order": [
                  "Should",
                  "the weather",
                  "be bad",
                  "the ceremony",
                  "moves",
                  "indoors"
                ],
                "correct_sentence": "Should the weather be bad the ceremony moves indoors.",
                "decoys": [
                  "moving"
                ],
                "explanation": "Cấu trúc đưa ra lời khuyên hoặc gợi ý với động từ khuyết thiếu (Modal verbs): 'S + should / could / might / had better + V_bare'. Từ bẫy 'moving' dùng sai dạng chia động từ (dư -ing/-ed) nên không thể ghép vào câu."
              },
              {
                "id": "sp24_item06",
                "context": "A specific scholarship program made it possible for me to pay my tuition and continue my studies this year.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "allowing",
                  "that",
                  "the scholarship",
                  "to continue",
                  "It was",
                  "allowed me",
                  "studying"
                ],
                "correct_order": [
                  "It was",
                  "the scholarship",
                  "that",
                  "allowed me",
                  "to continue",
                  "studying"
                ],
                "correct_sentence": "It was the scholarship that allowed me to continue.",
                "decoys": [
                  "allowing"
                ],
                "explanation": "Cấu trúc câu chẻ nhấn mạnh (Cleft sentence): 'It was/is + đối tượng nhấn mạnh + that/who + V...'. Từ bẫy 'allowing' bị loại bỏ do sai dạng ngữ pháp hoặc thừa thành phần bổ ngữ."
              },
              {
                "id": "sp24_item07",
                "context": "The campus doctor told me that poor sleep has a direct and measurable impact on academic performance.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "stressing",
                  "was better",
                  "What the",
                  "doctor",
                  "and performance",
                  "sleep habits",
                  "stressed most"
                ],
                "correct_order": [
                  "What the",
                  "doctor",
                  "stressed most",
                  "was better",
                  "sleep habits",
                  "and performance"
                ],
                "correct_sentence": "What the doctor stressed most was better sleep habits and performance.",
                "decoys": [
                  "stressing"
                ],
                "explanation": "Mệnh đề danh ngữ làm chủ ngữ (Wh-cleft / Noun clause): 'Wh-clause + V chính + O/C'. Từ bẫy 'stressing' bị loại bỏ vì không phù hợp với thì hoặc cấu trúc động từ chính của câu."
              },
              {
                "id": "sp24_item08",
                "context": "The course portal keeps showing an error when I try to submit my assignment and the deadline is tonight. browser cache.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "browser cache",
                  "clearing your",
                  "before uploading",
                  "Did you",
                  "the tile",
                  "clear"
                ],
                "correct_order": [
                  "Did you",
                  "clearing your",
                  "browser cache",
                  "before uploading",
                  "the tile"
                ],
                "correct_sentence": "Did you try clearing your browser cache before uploading the file.",
                "decoys": [
                  "clear"
                ],
                "explanation": "Câu hỏi gợi ý/kiểm tra thông tin với trợ động từ: 'Have/Did you + V...?'. Từ bẫy 'clear' sai dạng động từ nguyên mẫu có to/V-ing không phù hợp sau trợ động từ."
              },
              {
                "id": "sp24_item09",
                "context": "The visiting lecturer gave a presentation that completely captivated everyone in the room from Start to finish.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "Rarely",
                  "engaging",
                  "lecture",
                  "audience felt",
                  "on campus",
                  "so engaged",
                  "had the",
                  "by one"
                ],
                "correct_order": [
                  "Rarely",
                  "had the",
                  "audience felt",
                  "so engaged",
                  "by one",
                  "lecture",
                  "on campus"
                ],
                "correct_sentence": "Rarely had the audience felt so engaged by one lecture on campus.",
                "decoys": [
                  "engaging"
                ],
                "explanation": "Cấu trúc đảo ngữ phủ định / giới hạn (Negative inversion): Trạng từ phủ định đứng đầu câu + trợ động từ / to be + S + V chính. Từ bẫy 'engaging' sai thì hoặc sai dạng trợ động từ."
              },
              {
                "id": "sp24_item10",
                "context": "The university launched a flexible new meal plan that lets students eat at multiple campus locaféions. meal plan.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "meal plan",
                  "eating",
                  "more flexibility",
                  "Since the",
                  "new",
                  "in dining",
                  "students have",
                  "launched"
                ],
                "correct_order": [
                  "Since the",
                  "new",
                  "meal plan",
                  "launched",
                  "students have",
                  "more flexibility",
                  "in dining"
                ],
                "correct_sentence": "Since the new meal plan launched students have more flexibility in dining.",
                "decoys": [
                  "eating"
                ],
                "explanation": "Mệnh đề trạng ngữ chỉ sự nhượng bộ/nguyên nhân: 'Liên từ + Mệnh đề phụ, Mệnh đề chính'. Từ bẫy 'eating' thừa từ hoặc sai cấu trúc nối câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice25 = {
  "id": "sentence-practice-25",
  "title": "Build a Sentence Practice 25 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 25).",
  "stages": [
    {
      "id": "sp25_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp25_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp25_item01",
                "context": "A student organization managed to convince the university to extend the campus bus service to midnight.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "that",
                  "lobbying",
                  "successfully lobbied",
                  "It was",
                  "for later",
                  "bus service",
                  "the student",
                  "council"
                ],
                "correct_order": [
                  "It was",
                  "the student",
                  "council",
                  "that",
                  "successfully lobbied",
                  "for later",
                  "bus service"
                ],
                "correct_sentence": "It was the student council that successfully lobbied for later bus service.",
                "decoys": [
                  "lobbying"
                ],
                "explanation": "Cấu trúc câu chẻ nhấn mạnh (Cleft sentence): 'It was/is + đối tượng nhấn mạnh + that/who + V...'. Từ bẫy 'lobbying' bị loại bỏ do sai dạng ngữ pháp hoặc thừa thành phần bổ ngữ."
              },
              {
                "id": "sp25_item02",
                "context": "My resident advisor explained that the university's noise policy exists to protect every student's right to study.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "quiet hours",
                  "enforcing",
                  "enforces",
                  "Why the",
                  "can study",
                  "all students",
                  "university"
                ],
                "correct_order": [
                  "Why the",
                  "university",
                  "enforces",
                  "quiet hours",
                  "all students",
                  "can study"
                ],
                "correct_sentence": "Why the university enforces quiet hours is so all students can study.",
                "decoys": [
                  "enforcing"
                ],
                "explanation": "Mệnh đề danh ngữ làm chủ ngữ (Wh-cleft / Noun clause): 'Wh-clause + V chính + O/C'. Từ bẫy 'enforcing' bị loại bỏ vì không phù hợp với thì hoặc cấu trúc động từ chính của câu."
              },
              {
                "id": "sp25_item03",
                "context": "My scholarship was revoked last semester because I did nof meet the required grade point average. about appealing.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "about appealing",
                  "speaking",
                  "aid office",
                  "Did you",
                  "speak",
                  "the decision",
                  "with the"
                ],
                "correct_order": [
                  "Did you",
                  "speak",
                  "with the",
                  "aid office",
                  "about appealing",
                  "the decision"
                ],
                "correct_sentence": "Did you speak With the aid Office about appealing the decision.",
                "decoys": [
                  "speaking"
                ],
                "explanation": "Câu hỏi gợi ý/kiểm tra thông tin với trợ động từ: 'Have/Did you + V...?'. Từ bẫy 'speaking' sai dạng động từ nguyên mẫu có to/V-ing không phù hợp sau trợ động từ."
              },
              {
                "id": "sp25_item04",
                "context": "Professor Adams is well known across the department for being absolutely strict about academic honesty.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "accept",
                  "tolerating",
                  "any lorm",
                  "does",
                  "of plagiarism",
                  "Never",
                  "work",
                  "in submitted",
                  "Professor Adams"
                ],
                "correct_order": [
                  "Never",
                  "does",
                  "Professor Adams",
                  "accept",
                  "any lorm",
                  "of plagiarism",
                  "in submitted",
                  "work"
                ],
                "correct_sentence": "Never does professor Adams accept any form of plagiarism in submitted work.",
                "decoys": [
                  "tolerating"
                ],
                "explanation": "Cấu trúc đảo ngữ phủ định / giới hạn (Negative inversion): Trạng từ phủ định đứng đầu câu + trợ động từ / to be + S + V chính. Từ bẫy 'tolerating' sai thì hoặc sai dạng trợ động từ."
              },
              {
                "id": "sp25_item05",
                "context": "The athletics department has a strict rule that student athletes must keep their grades above a certain level.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "demanding",
                  "keeping",
                  "training is",
                  "Although",
                  "keep their",
                  "grades up",
                  "athletes must"
                ],
                "correct_order": [
                  "Although",
                  "training is",
                  "demanding",
                  "athletes must",
                  "keep their",
                  "grades up"
                ],
                "correct_sentence": "Although training is demanding athletes must keep their grades up.",
                "decoys": [
                  "keeping"
                ],
                "explanation": "Mệnh đề trạng ngữ chỉ sự nhượng bộ/nguyên nhân: 'Liên từ + Mệnh đề phụ, Mệnh đề chính'. Từ bẫy 'keeping' thừa từ hoặc sai cấu trúc nối câu."
              },
              {
                "id": "sp25_item06",
                "context": "One piece of specific feedback from my professor completely changed how I approach academic writing. that changed.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "that changed",
                  "changing",
                  "feedback",
                  "It was",
                  "to writing",
                  "my entire",
                  "approach",
                  "the protessor's"
                ],
                "correct_order": [
                  "It was",
                  "the protessor's",
                  "feedback",
                  "that changed",
                  "my entire",
                  "approach",
                  "to writing"
                ],
                "correct_sentence": "It was the professor's feedback that changed my entire approach to writing.",
                "decoys": [
                  "changing"
                ],
                "explanation": "Cấu trúc câu chẻ nhấn mạnh (Cleft sentence): 'It was/is + đối tượng nhấn mạnh + that/who + V...'. Từ bẫy 'changing' bị loại bỏ do sai dạng ngữ pháp hoặc thừa thành phần bổ ngữ."
              },
              {
                "id": "sp25_item07",
                "context": "Students in the orientation survey said the best part of the week was meeting people from Other countries. enjoyed most.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "enjoyed most",
                  "comected",
                  "What students",
                  "classmates",
                  "about orientation",
                  "was comecting",
                  "with international"
                ],
                "correct_order": [
                  "What students",
                  "enjoyed most",
                  "about orientation",
                  "was comecting",
                  "with international",
                  "classmates"
                ],
                "correct_sentence": "What students enjoyed most about orientation was comecting with international classmates.",
                "decoys": [
                  "comected"
                ],
                "explanation": "Mệnh đề danh ngữ làm chủ ngữ (Wh-cleft / Noun clause): 'Wh-clause + V chính + O/C'. Từ bẫy 'comected' bị loại bỏ vì không phù hợp với thì hoặc cấu trúc động từ chính của câu."
              },
              {
                "id": "sp25_item08",
                "context": "l have been dealing with severe test anxiety before every major exam and it is affecting my performance.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "campus counseling",
                  "looking",
                  "Have you",
                  "management",
                  "for stress",
                  "looked into"
                ],
                "correct_order": [
                  "Have you",
                  "looked into",
                  "campus counseling",
                  "for stress",
                  "management"
                ],
                "correct_sentence": "Have you mked into campus counseling services for stress management.",
                "decoys": [
                  "looking"
                ],
                "explanation": "Câu hỏi gợi ý/kiểm tra thông tin với trợ động từ: 'Have/Did you + V...?'. Từ bẫy 'looking' sai dạng động từ nguyên mẫu có to/V-ing không phù hợp sau trợ động từ."
              },
              {
                "id": "sp25_item09",
                "context": "The university's student portal went offline for nearly three days last month due to a major technical failure.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "worked overnight",
                  "restoring",
                  "the technicians",
                  "Only after",
                  "restored",
                  "was the",
                  "system"
                ],
                "correct_order": [
                  "Only after",
                  "the technicians",
                  "worked overnight",
                  "was the",
                  "system",
                  "restored"
                ],
                "correct_sentence": "Only aner the technicians worked overnight was the system restored.",
                "decoys": [
                  "restoring"
                ],
                "explanation": "Cấu trúc đảo ngữ phủ định / giới hạn (Negative inversion): Trạng từ phủ định đứng đầu câu + trợ động từ / to be + S + V chính. Từ bẫy 'restoring' sai thì hoặc sai dạng trợ động từ."
              },
              {
                "id": "sp25_item10",
                "context": "The library launched an online booking system for study rooms after demand became too high to manage informally.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the library",
                  "launching",
                  "launched",
                  "Since rooms",
                  "an online",
                  "booking system",
                  "fast",
                  "till up"
                ],
                "correct_order": [
                  "Since rooms",
                  "till up",
                  "fast",
                  "the library",
                  "launched",
                  "an online",
                  "booking system"
                ],
                "correct_sentence": "Since rooms till up fast the Ibrary launched an online booking system.",
                "decoys": [
                  "launching"
                ],
                "explanation": "Mệnh đề trạng ngữ chỉ sự nhượng bộ/nguyên nhân: 'Liên từ + Mệnh đề phụ, Mệnh đề chính'. Từ bẫy 'launching' thừa từ hoặc sai cấu trúc nối câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice26 = {
  "id": "sentence-practice-26",
  "title": "Build a Sentence Practice 26 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 26).",
  "stages": [
    {
      "id": "sp26_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp26_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp26_item01",
                "context": "morning each day. roufine.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "roufine",
                  "improving",
                  "the yoga",
                  "It was",
                  "and focus",
                  "that improved",
                  "my energy"
                ],
                "correct_order": [
                  "It was",
                  "the yoga",
                  "roufine",
                  "that improved",
                  "my energy",
                  "and focus"
                ],
                "correct_sentence": "It was the yoga roufine that improved my energy and focus.",
                "decoys": [
                  "improving"
                ],
                "explanation": "Cấu trúc câu chẻ nhấn mạnh (Cleft sentence): 'It was/is + đối tượng nhấn mạnh + that/who + V...'. Từ bẫy 'improving' bị loại bỏ do sai dạng ngữ pháp hoặc thừa thành phần bổ ngữ."
              },
              {
                "id": "sp26_item02",
                "context": "The IT department reminded everyone that failing to update software leaves devices open to serious security risks.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "is keeping",
                  "kept",
                  "their devices",
                  "What most",
                  "updated",
                  "students",
                  "overlook"
                ],
                "correct_order": [
                  "What most",
                  "students",
                  "overlook",
                  "is keeping",
                  "their devices",
                  "updated"
                ],
                "correct_sentence": "What most students overlook is keeping their devices updated.",
                "decoys": [
                  "kept"
                ],
                "explanation": "Mệnh đề danh ngữ làm chủ ngữ (Wh-cleft / Noun clause): 'Wh-clause + V chính + O/C'. Từ bẫy 'kept' bị loại bỏ vì không phù hợp với thì hoặc cấu trúc động từ chính của câu."
              },
              {
                "id": "sp26_item03",
                "context": "My friend has been isolating himself and avoiding group activities lately and I am quite worried about him. checking in.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "checking in",
                  "checked",
                  "with him",
                  "Have you",
                  "to ofter",
                  "any support",
                  "considered"
                ],
                "correct_order": [
                  "Have you",
                  "considered",
                  "checking in",
                  "with him",
                  "to ofter",
                  "any support"
                ],
                "correct_sentence": "Have you considered checking in With him to Offer any support.",
                "decoys": [
                  "checked"
                ],
                "explanation": "Câu hỏi gợi ý/kiểm tra thông tin với trợ động từ: 'Have/Did you + V...?'. Từ bẫy 'checked' sai dạng động từ nguyên mẫu có to/V-ing không phù hợp sau trợ động từ."
              },
              {
                "id": "sp26_item04",
                "context": "The new seasonal cafeteria menu with fresh organic produce was met with enthusiastic reviews from students.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "had the",
                  "introducing",
                  "betore students",
                  "launched",
                  "Hardly",
                  "began leaving",
                  "positive reviews",
                  "menu"
                ],
                "correct_order": [
                  "had the",
                  "menu",
                  "launched",
                  "betore students",
                  "began leaving",
                  "positive reviews",
                  "Hardly"
                ],
                "correct_sentence": "Hardy had the menu launched before students began leaving positive reviews.",
                "decoys": [
                  "introducing"
                ],
                "explanation": "Cấu trúc ngữ pháp hoàn chỉnh diễn đạt giải pháp hợp lý cho tình huống: Từ bẫy 'introducing' không phù hợp về ngữ pháp và trật tự từ trong câu."
              },
              {
                "id": "sp26_item05",
                "context": "Many students debate whether to live in university housing or find a cheaper apartment Off campus. is cheaper.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "is cheaper",
                  "ottered",
                  "While",
                  "more community",
                  "off-campus housing",
                  "on-campus living",
                  "offers"
                ],
                "correct_order": [
                  "While",
                  "off-campus housing",
                  "is cheaper",
                  "on-campus living",
                  "more community",
                  "offers"
                ],
                "correct_sentence": "While off-campus housing is cheaper on-campus living ofters more community.",
                "decoys": [
                  "ottered"
                ],
                "explanation": "Mệnh đề trạng ngữ chỉ sự nhượng bộ/nguyên nhân: 'Liên từ + Mệnh đề phụ, Mệnh đề chính'. Từ bẫy 'ottered' thừa từ hoặc sai cấu trúc nối câu."
              },
              {
                "id": "sp26_item06",
                "context": "One professor's public lecture on artificial intelligence drew an unusually large number Of attendees this year.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "lecture",
                  "drawing",
                  "the biggest",
                  "Professor Chen's",
                  "that nad",
                  "this year",
                  "audience",
                  "It was"
                ],
                "correct_order": [
                  "It was",
                  "Professor Chen's",
                  "lecture",
                  "that nad",
                  "the biggest",
                  "audience",
                  "this year"
                ],
                "correct_sentence": "It was professor Chen's lecture that the biggest audience this year.",
                "decoys": [
                  "drawing"
                ],
                "explanation": "Cấu trúc câu chẻ nhấn mạnh (Cleft sentence): 'It was/is + đối tượng nhấn mạnh + that/who + V...'. Từ bẫy 'drawing' bị loại bỏ do sai dạng ngữ pháp hoặc thừa thành phần bổ ngữ."
              },
              {
                "id": "sp26_item07",
                "context": "The athletics coach said that commitment and the ability to work as part of a team are what he values most.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "looked",
                  "in new",
                  "What coaches",
                  "dedicaféion",
                  "look for",
                  "and teamwork",
                  "recruits"
                ],
                "correct_order": [
                  "What coaches",
                  "look for",
                  "in new",
                  "recruits",
                  "dedicaféion",
                  "and teamwork"
                ],
                "correct_sentence": "What coaches look for in new recruits is dedicaféion and teamwork.",
                "decoys": [
                  "looked"
                ],
                "explanation": "Mệnh đề danh ngữ làm chủ ngữ (Wh-cleft / Noun clause): 'Wh-clause + V chính + O/C'. Từ bẫy 'looked' bị loại bỏ vì không phù hợp với thì hoặc cấu trúc động từ chính của câu."
              },
              {
                "id": "sp26_item08",
                "context": "l received an incomplete grade for my history course and I have no idea what effect it will have on my GPA.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "about what",
                  "talking",
                  "an incomplete",
                  "Have you",
                  "talked",
                  "grade means",
                  "registrar",
                  "to the"
                ],
                "correct_order": [
                  "Have you",
                  "talked",
                  "to the",
                  "registrar",
                  "about what",
                  "an incomplete",
                  "grade means"
                ],
                "correct_sentence": "Have you talked to the registrar about What an incomplete grade means.",
                "decoys": [
                  "talking"
                ],
                "explanation": "Câu hỏi gợi ý/kiểm tra thông tin với trợ động từ: 'Have/Did you + V...?'. Từ bẫy 'talking' sai dạng động từ nguyên mẫu có to/V-ing không phù hợp sau trợ động từ."
              },
              {
                "id": "sp26_item09",
                "context": "The university recently expanded the shuttle routes to include several popular off-campus destinations.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "shuttle offered",
                  "ottering",
                  "on-campus routes",
                  "has the",
                  "so many",
                  "Never before",
                  "campus"
                ],
                "correct_order": [
                  "Never before",
                  "has the",
                  "campus",
                  "shuttle offered",
                  "so many",
                  "on-campus routes"
                ],
                "correct_sentence": "Never before has the campus shuttle offered so many off-campus routes.",
                "decoys": [
                  "ottering"
                ],
                "explanation": "Cấu trúc đảo ngữ phủ định / giới hạn (Negative inversion): Trạng từ phủ định đứng đầu câu + trợ động từ / to be + S + V chính. Từ bẫy 'ottering' sai thì hoặc sai dạng trợ động từ."
              },
              {
                "id": "sp26_item10",
                "context": "The university set up an emergency fund to help students who face sudden and unexpected financial problems.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the criteria",
                  "covering",
                  "unexpected expenses",
                  "students meet",
                  "the emergency",
                  "tund",
                  "Provided that",
                  "can cover"
                ],
                "correct_order": [
                  "Provided that",
                  "students meet",
                  "the criteria",
                  "the emergency",
                  "can cover",
                  "unexpected expenses",
                  "tund"
                ],
                "correct_sentence": "Provided that students meet the criteria the emergency fund can cover unexpected expenses.",
                "decoys": [
                  "covering"
                ],
                "explanation": "Mệnh đề trạng ngữ chỉ sự nhượng bộ/nguyên nhân: 'Liên từ + Mệnh đề phụ, Mệnh đề chính'. Từ bẫy 'covering' thừa từ hoặc sai cấu trúc nối câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice27 = {
  "id": "sentence-practice-27",
  "title": "Build a Sentence Practice 27 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 27).",
  "stages": [
    {
      "id": "sp27_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp27_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp27_item01",
                "context": "The renovation of the main library reading room transformed it into a space students actually want to spend time in.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "that",
                  "making",
                  "the redesign",
                  "want to",
                  "It was",
                  "stay longer",
                  "made students"
                ],
                "correct_order": [
                  "It was",
                  "the redesign",
                  "that",
                  "made students",
                  "want to",
                  "stay longer"
                ],
                "correct_sentence": "It was the redesign that made students want to stay longer.",
                "decoys": [
                  "making"
                ],
                "explanation": "Cấu trúc câu chẻ nhấn mạnh (Cleft sentence): 'It was/is + đối tượng nhấn mạnh + that/who + V...'. Từ bẫy 'making' bị loại bỏ do sai dạng ngữ pháp hoặc thừa thành phần bổ ngữ."
              },
              {
                "id": "sp27_item02",
                "context": "My financial advisor told me that starting to save and invest early makes a dramatic difference Over time.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "begin saving",
                  "started",
                  "much you",
                  "than how",
                  "matters more",
                  "save",
                  "When you"
                ],
                "correct_order": [
                  "When you",
                  "begin saving",
                  "matters more",
                  "than how",
                  "much you",
                  "save"
                ],
                "correct_sentence": "When you begin saving matters more than how much you save.",
                "decoys": [
                  "started"
                ],
                "explanation": "Mệnh đề danh ngữ làm chủ ngữ (Wh-cleft / Noun clause): 'Wh-clause + V chính + O/C'. Từ bẫy 'started' bị loại bỏ vì không phù hợp với thì hoặc cấu trúc động từ chính của câu."
              },
              {
                "id": "sp27_item03",
                "context": "l injured my knee during practice last week and I am unsure whether it is safe for me to keep training. about whether.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "about whether",
                  "consulting",
                  "a physiotherapist",
                  "Have you",
                  "you can",
                  "consulted",
                  "practice"
                ],
                "correct_order": [
                  "Have you",
                  "consulted",
                  "a physiotherapist",
                  "about whether",
                  "you can",
                  "practice"
                ],
                "correct_sentence": "Have you consulted a physiotherapist whether you can practice.",
                "decoys": [
                  "consulting"
                ],
                "explanation": "Câu hỏi gợi ý/kiểm tra thông tin với trợ động từ: 'Have/Did you + V...?'. Từ bẫy 'consulting' sai dạng động từ nguyên mẫu có to/V-ing không phù hợp sau trợ động từ."
              },
              {
                "id": "sp27_item04",
                "context": "Our professor was genuinely impressed that our group submitted such a thorough research project well ahead Of time.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "had any",
                  "completing",
                  "completed",
                  "such a",
                  "complex project",
                  "Rarely",
                  "group",
                  "so quickly"
                ],
                "correct_order": [
                  "Rarely",
                  "had any",
                  "group",
                  "completed",
                  "such a",
                  "complex project",
                  "so quickly"
                ],
                "correct_sentence": "Rarely had any group completed such a complex project so quickly.",
                "decoys": [
                  "completing"
                ],
                "explanation": "Cấu trúc đảo ngữ phủ định / giới hạn (Negative inversion): Trạng từ phủ định đứng đầu câu + trợ động từ / to be + S + V chính. Từ bẫy 'completing' sai thì hoặc sai dạng trợ động từ."
              },
              {
                "id": "sp27_item05",
                "context": "The spring career fair is nof mandatory, but students who attend tend to find job opportunities much more quickly.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "is optional",
                  "increased",
                  "the fair",
                  "Although",
                  "improves your",
                  "job prospects",
                  "attending greatly"
                ],
                "correct_order": [
                  "Although",
                  "the fair",
                  "is optional",
                  "attending greatly",
                  "improves your",
                  "job prospects"
                ],
                "correct_sentence": "Although the tail is optional attending greatly improves your job prospects.",
                "decoys": [
                  "increased"
                ],
                "explanation": "Mệnh đề trạng ngữ chỉ sự nhượng bộ/nguyên nhân: 'Liên từ + Mệnh đề phụ, Mệnh đề chính'. Từ bẫy 'increased' thừa từ hoặc sai cấu trúc nối câu."
              },
              {
                "id": "sp27_item06",
                "context": "A private tufor helped me break through the wall I had hit when trying to understand regression analysis.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "who",
                  "helping",
                  "the private",
                  "It was",
                  "finally nelped",
                  "me understand",
                  "regression analysis",
                  "tutor"
                ],
                "correct_order": [
                  "It was",
                  "the private",
                  "who",
                  "finally nelped",
                  "me understand",
                  "regression analysis",
                  "tutor"
                ],
                "correct_sentence": "It was the private tufor who finally helped me understand regression analysis.",
                "decoys": [
                  "helping"
                ],
                "explanation": "Cấu trúc câu chẻ nhấn mạnh (Cleft sentence): 'It was/is + đối tượng nhấn mạnh + that/who + V...'. Từ bẫy 'helping' bị loại bỏ do sai dạng ngữ pháp hoặc thừa thành phần bổ ngữ."
              },
              {
                "id": "sp27_item07",
                "context": "My doctor explained that the speed of recovery from a sports injury depends heavily on how well you rest.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "from an",
                  "recovered",
                  "you recover",
                  "How quickly",
                  "injury",
                  "you rest",
                  "depends on",
                  "how well"
                ],
                "correct_order": [
                  "How quickly",
                  "you recover",
                  "from an",
                  "injury",
                  "depends on",
                  "how well",
                  "you rest"
                ],
                "correct_sentence": "How quickly you recover from an injury depends on how well you rest.",
                "decoys": [
                  "recovered"
                ],
                "explanation": "Mệnh đề danh ngữ làm chủ ngữ (Wh-cleft / Noun clause): 'Wh-clause + V chính + O/C'. Từ bẫy 'recovered' bị loại bỏ vì không phù hợp với thì hoặc cấu trúc động từ chính của câu."
              },
              {
                "id": "sp27_item08",
                "context": "Several students reported getting sick after eating a particular dish at the campus restaurant last week.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "look into",
                  "investigating",
                  "Did the",
                  "the food",
                  "source",
                  "health oftice",
                  "contamination"
                ],
                "correct_order": [
                  "Did the",
                  "health oftice",
                  "look into",
                  "the food",
                  "contamination",
                  "source"
                ],
                "correct_sentence": "Did the health Office look into the food contamination source.",
                "decoys": [
                  "investigating"
                ],
                "explanation": "Cấu trúc ngữ pháp hoàn chỉnh diễn đạt giải pháp hợp lý cho tình huống: Từ bẫy 'investigating' không phù hợp về ngữ pháp và trật tự từ trong câu."
              },
              {
                "id": "sp27_item09",
                "context": "This January has been unusually warm and mild compared to last year when the campus was buried in snow.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "experience",
                  "experienced",
                  "such mi'd",
                  "does the",
                  "temperatures",
                  "Only rarely",
                  "campus",
                  "in January"
                ],
                "correct_order": [
                  "Only rarely",
                  "does the",
                  "campus",
                  "experience",
                  "temperatures",
                  "in January",
                  "experienced"
                ],
                "correct_sentence": "Only rarely does the campus experience such mild temperatures in January.",
                "decoys": [
                  "such mi'd"
                ],
                "explanation": "Cấu trúc đảo ngữ phủ định / giới hạn (Negative inversion): Trạng từ phủ định đứng đầu câu + trợ động từ / to be + S + V chính. Từ bẫy 'such mi'd' sai thì hoặc sai dạng trợ động từ."
              },
              {
                "id": "sp27_item10",
                "context": "The university introduced a new digital library system that gives students access to millions Of academic resources.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "new system",
                  "accessing",
                  "students can",
                  "Since the",
                  "launched",
                  "from anywhere",
                  "now",
                  "access"
                ],
                "correct_order": [
                  "Since the",
                  "new system",
                  "launched",
                  "students can",
                  "now",
                  "access",
                  "from anywhere"
                ],
                "correct_sentence": "Since the new system launched students can now access resources from anywhere.",
                "decoys": [
                  "accessing"
                ],
                "explanation": "Mệnh đề trạng ngữ chỉ sự nhượng bộ/nguyên nhân: 'Liên từ + Mệnh đề phụ, Mệnh đề chính'. Từ bẫy 'accessing' thừa từ hoặc sai cấu trúc nối câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice28 = {
  "id": "sentence-practice-28",
  "title": "Build a Sentence Practice 28 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 28).",
  "stages": [
    {
      "id": "sp28_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp28_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp28_item01",
                "context": "One student's science project stood out among all the entries at the university research competition this year.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "her solar",
                  "winning",
                  "project",
                  "that won",
                  "at the",
                  "fair",
                  "It was",
                  "first prize"
                ],
                "correct_order": [
                  "It was",
                  "her solar",
                  "project",
                  "that won",
                  "first prize",
                  "at the",
                  "fair"
                ],
                "correct_sentence": "It was her solar project that won first prize at the fair.",
                "decoys": [
                  "winning"
                ],
                "explanation": "Cấu trúc câu chẻ nhấn mạnh (Cleft sentence): 'It was/is + đối tượng nhấn mạnh + that/who + V...'. Từ bẫy 'winning' bị loại bỏ do sai dạng ngữ pháp hoặc thừa thành phần bổ ngữ."
              },
              {
                "id": "sp28_item02",
                "context": "The team trainer said that how athletes rest and eat between sessions has a huge impact on their progress.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "is how",
                  "affected",
                  "often ignore",
                  "diet and",
                  "What athletes",
                  "rest affect",
                  "their results"
                ],
                "correct_order": [
                  "What athletes",
                  "often ignore",
                  "is how",
                  "diet and",
                  "rest affect",
                  "their results"
                ],
                "correct_sentence": "What athletes often ignore is how diet and rest affect their results.",
                "decoys": [
                  "affected"
                ],
                "explanation": "Mệnh đề danh ngữ làm chủ ngữ (Wh-cleft / Noun clause): 'Wh-clause + V chính + O/C'. Từ bẫy 'affected' bị loại bỏ vì không phù hợp với thì hoặc cấu trúc động từ chính của câu."
              },
              {
                "id": "sp28_item03",
                "context": "A classmate told me that attending certain guest lllectures this semester could earn extra credit points. which lllectures.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "which llectures",
                  "mentioning",
                  "mention",
                  "Did the",
                  "would count",
                  "extra credit",
                  "toward",
                  "professor"
                ],
                "correct_order": [
                  "Did the",
                  "professor",
                  "mention",
                  "which llectures",
                  "would count",
                  "toward",
                  "extra credit"
                ],
                "correct_sentence": "Did the professor mention Which llectures would count toward extra credit.",
                "decoys": [
                  "mentioning"
                ],
                "explanation": "Cấu trúc ngữ pháp hoàn chỉnh diễn đạt giải pháp hợp lý cho tình huống: Từ bẫy 'mentioning' không phù hợp về ngữ pháp và trật tự từ trong câu."
              },
              {
                "id": "sp28_item04",
                "context": "The campus health center just launched a range of new mental health programs specifically for graduate students.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "had the",
                  "ottering",
                  "ottered",
                  "so many",
                  "Never before",
                  "programs",
                  "mental wellness",
                  "campus"
                ],
                "correct_order": [
                  "Never before",
                  "had the",
                  "campus",
                  "so many",
                  "mental wellness",
                  "programs",
                  "ottered"
                ],
                "correct_sentence": "Never before had the campus offered so many mental wellness programs.",
                "decoys": [
                  "ottering"
                ],
                "explanation": "Cấu trúc đảo ngữ phủ định / giới hạn (Negative inversion): Trạng từ phủ định đứng đầu câu + trợ động từ / to be + S + V chính. Từ bẫy 'ottering' sai thì hoặc sai dạng trợ động từ."
              },
              {
                "id": "sp28_item05",
                "context": "Returning students are given first choice of dormitory rooms, which means new students have fewer options.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "have priority",
                  "ended",
                  "desirable dorms",
                  "returning students",
                  "freshmen often",
                  "Because",
                  "get less"
                ],
                "correct_order": [
                  "Because",
                  "returning students",
                  "have priority",
                  "freshmen often",
                  "get less",
                  "desirable dorms"
                ],
                "correct_sentence": "Because returning students have priority freshmen often get less desirable dorms.",
                "decoys": [
                  "ended"
                ],
                "explanation": "Mệnh đề trạng ngữ chỉ sự nhượng bộ/nguyên nhân: 'Liên từ + Mệnh đề phụ, Mệnh đề chính'. Từ bẫy 'ended' thừa từ hoặc sai cấu trúc nối câu."
              },
              {
                "id": "sp28_item06",
                "context": "One campus club I joined in my first year completely changed my entire experience at this university.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "that",
                  "transforming",
                  "experience",
                  "my university",
                  "It was",
                  "truly transformed",
                  "club"
                ],
                "correct_order": [
                  "It was",
                  "club",
                  "that",
                  "truly transformed",
                  "my university",
                  "experience"
                ],
                "correct_sentence": "It was the debate club that truly transformed my university experience.",
                "decoys": [
                  "transforming"
                ],
                "explanation": "Cấu trúc câu chẻ nhấn mạnh (Cleft sentence): 'It was/is + đối tượng nhấn mạnh + that/who + V...'. Từ bẫy 'transforming' bị loại bỏ do sai dạng ngữ pháp hoặc thừa thành phần bổ ngữ."
              },
              {
                "id": "sp28_item07",
                "context": "The librarian explained that students who organize their research well from the beginning write better papers.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "your notes",
                  "determined",
                  "determines",
                  "early",
                  "your writing",
                  "How you",
                  "organize",
                  "elticiency"
                ],
                "correct_order": [
                  "How you",
                  "organize",
                  "your notes",
                  "early",
                  "determines",
                  "your writing",
                  "elticiency"
                ],
                "correct_sentence": "How you organize your notes early determines your writing efficiency.",
                "decoys": [
                  "determined"
                ],
                "explanation": "Mệnh đề danh ngữ làm chủ ngữ (Wh-cleft / Noun clause): 'Wh-clause + V chính + O/C'. Từ bẫy 'determined' bị loại bỏ vì không phù hợp với thì hoặc cấu trúc động từ chính của câu."
              },
              {
                "id": "sp28_item08",
                "context": "l missed the applicaféion deadline for the university housing subsidy program and I am nof Sure what to do.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the aid",
                  "asking",
                  "it late",
                  "asked the",
                  "Have you",
                  "are accepted",
                  "Ott ice",
                  "applicaféions"
                ],
                "correct_order": [
                  "Have you",
                  "asked the",
                  "the aid",
                  "Ott ice",
                  "it late",
                  "applicaféions",
                  "are accepted"
                ],
                "correct_sentence": "Have you asked the ad Office if late applicaféions are accepted.",
                "decoys": [
                  "asking"
                ],
                "explanation": "Câu hỏi gợi ý/kiểm tra thông tin với trợ động từ: 'Have/Did you + V...?'. Từ bẫy 'asking' sai dạng động từ nguyên mẫu có to/V-ing không phù hợp sau trợ động từ."
              },
              {
                "id": "sp28_item09",
                "context": "The cycling path comecting the main campus to the city center was finally completed after two years Of construction.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the path",
                  "commuted",
                  "begin cycling",
                  "Only when",
                  "opened",
                  "by bicycle",
                  "to campus",
                  "did students"
                ],
                "correct_order": [
                  "Only when",
                  "the path",
                  "opened",
                  "did students",
                  "begin cycling",
                  "to campus",
                  "by bicycle"
                ],
                "correct_sentence": "Only when path opened did students begin cycling campus.",
                "decoys": [
                  "commuted"
                ],
                "explanation": "Cấu trúc đảo ngữ phủ định / giới hạn (Negative inversion): Trạng từ phủ định đứng đầu câu + trợ động từ / to be + S + V chính. Từ bẫy 'commuted' sai thì hoặc sai dạng trợ động từ."
              },
              {
                "id": "sp28_item10",
                "context": "Flooding on the main campus road caused several outdoor events and classes to be cancelled this past weekend.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the flooded",
                  "closing",
                  "road",
                  "the rain",
                  "stopped",
                  "Even though",
                  "remained closed",
                  "all weekend"
                ],
                "correct_order": [
                  "Even though",
                  "the rain",
                  "stopped",
                  "the flooded",
                  "road",
                  "remained closed",
                  "all weekend"
                ],
                "correct_sentence": "Even though the rain stopped the flooded road remained closed all weekend.",
                "decoys": [
                  "closing"
                ],
                "explanation": "Mệnh đề trạng ngữ chỉ sự nhượng bộ/nguyên nhân: 'Liên từ + Mệnh đề phụ, Mệnh đề chính'. Từ bẫy 'closing' thừa từ hoặc sai cấu trúc nối câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice29 = {
  "id": "sentence-practice-29",
  "title": "Build a Sentence Practice 29 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 29).",
  "stages": [
    {
      "id": "sp29_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp29_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp29_item01",
                "context": "A specific grant applicaféion allowed one student to fund his entire laboratory research project this year. that paid.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "that paid",
                  "covering",
                  "for his",
                  "It was",
                  "grant",
                  "entire project",
                  "the research"
                ],
                "correct_order": [
                  "It was",
                  "the research",
                  "grant",
                  "that paid",
                  "for his",
                  "entire project"
                ],
                "correct_sentence": "It was the research grant that pad for his entire project.",
                "decoys": [
                  "covering"
                ],
                "explanation": "Cấu trúc câu chẻ nhấn mạnh (Cleft sentence): 'It was/is + đối tượng nhấn mạnh + that/who + V...'. Từ bẫy 'covering' bị loại bỏ do sai dạng ngữ pháp hoặc thừa thành phần bổ ngữ."
              },
              {
                "id": "sp29_item02",
                "context": "The department head presented data showing that collaborative research consistently outperforms individual work.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "consistently shows",
                  "yield stronger",
                  "showed",
                  "What the",
                  "results",
                  "data",
                  "is that",
                  "collaborative projects"
                ],
                "correct_order": [
                  "What the",
                  "data",
                  "consistently shows",
                  "is that",
                  "collaborative projects",
                  "yield stronger",
                  "results"
                ],
                "correct_sentence": "What the data consistently shows that collaborative projects yield stronger results.",
                "decoys": [
                  "showed"
                ],
                "explanation": "Mệnh đề danh ngữ làm chủ ngữ (Wh-cleft / Noun clause): 'Wh-clause + V chính + O/C'. Từ bẫy 'showed' bị loại bỏ vì không phù hợp với thì hoặc cấu trúc động từ chính của câu."
              },
              {
                "id": "sp29_item03",
                "context": "My student bus pass expired last week and I need to get across campus every day for my internship. whether the.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "whether the",
                  "checking",
                  "emergency",
                  "Did you",
                  "Ottice",
                  "temporary passes",
                  "check",
                  "issues"
                ],
                "correct_order": [
                  "Did you",
                  "check",
                  "whether the",
                  "issues",
                  "emergency",
                  "temporary passes",
                  "Ottice"
                ],
                "correct_sentence": "Did you check Whether the office issues emergency temporary passes.",
                "decoys": [
                  "checking"
                ],
                "explanation": "Câu hỏi gợi ý/kiểm tra thông tin với trợ động từ: 'Have/Did you + V...?'. Từ bẫy 'checking' sai dạng động từ nguyên mẫu có to/V-ing không phù hợp sau trợ động từ."
              },
              {
                "id": "sp29_item04",
                "context": "After the new fire alarm system was installed in the dormitory, evacuation times improved significantly. been installed.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "been installed",
                  "installing",
                  "new alarm",
                  "Had the",
                  "the evacuation",
                  "faster",
                  "would nave",
                  "been faster"
                ],
                "correct_order": [
                  "Had the",
                  "new alarm",
                  "been installed",
                  "the evacuation",
                  "would nave",
                  "been faster",
                  "faster"
                ],
                "correct_sentence": "Had the new alarm been installed earlier the evacuation would have been faster.",
                "decoys": [
                  "installing"
                ],
                "explanation": "Cấu trúc ngữ pháp hoàn chỉnh diễn đạt giải pháp hợp lý cho tình huống: Từ bẫy 'installing' không phù hợp về ngữ pháp và trật tự từ trong câu."
              },
              {
                "id": "sp29_item05",
                "context": "The university opened a vegan-only dining station and it has attracted students with very different food preferences.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "all students",
                  "attracting",
                  "While not",
                  "many diners",
                  "has attracted",
                  "prefer vegan",
                  "food",
                  "the new",
                  "station"
                ],
                "correct_order": [
                  "While not",
                  "all students",
                  "prefer vegan",
                  "the new",
                  "station",
                  "has attracted",
                  "many diners",
                  "food"
                ],
                "correct_sentence": "While nof all students prefer vegan tood the new station has attracted many diners.",
                "decoys": [
                  "attracting"
                ],
                "explanation": "Mệnh đề trạng ngữ chỉ sự nhượng bộ/nguyên nhân: 'Liên từ + Mệnh đề phụ, Mệnh đề chính'. Từ bẫy 'attracting' thừa từ hoặc sai cấu trúc nối câu."
              },
              {
                "id": "sp29_item06",
                "context": "A deadline-tracking app that a classmate recommended completely solved my problem with missing assignment submissions.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "app",
                  "helping",
                  "the deadline",
                  "missing",
                  "It was",
                  "that helped",
                  "submissions",
                  "me stop"
                ],
                "correct_order": [
                  "It was",
                  "the deadline",
                  "app",
                  "that helped",
                  "me stop",
                  "missing",
                  "submissions"
                ],
                "correct_sentence": "It was the deadline app that helped me Stop missing submissions.",
                "decoys": [
                  "helping"
                ],
                "explanation": "Cấu trúc câu chẻ nhấn mạnh (Cleft sentence): 'It was/is + đối tượng nhấn mạnh + that/who + V...'. Từ bẫy 'helping' bị loại bỏ do sai dạng ngữ pháp hoặc thừa thành phần bổ ngữ."
              },
              {
                "id": "sp29_item07",
                "context": "My professor said that the networking events you attend during your degree can open unexpected career doors.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "to network",
                  "brought",
                  "as much",
                  "Where you",
                  "choose",
                  "your skillset",
                  "as your",
                  "can matter"
                ],
                "correct_order": [
                  "Where you",
                  "choose",
                  "to network",
                  "can matter",
                  "as much",
                  "as your",
                  "your skillset"
                ],
                "correct_sentence": "Where you choose to network can mafter as much as your skillset.",
                "decoys": [
                  "brought"
                ],
                "explanation": "Mệnh đề danh ngữ làm chủ ngữ (Wh-cleft / Noun clause): 'Wh-clause + V chính + O/C'. Từ bẫy 'brought' bị loại bỏ vì không phù hợp với thì hoặc cấu trúc động từ chính của câu."
              },
              {
                "id": "sp29_item08",
                "context": "The university gym has an extremely long waitlist for personal training sessions and I really need a trainer.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "whether",
                  "asking",
                  "group fithess",
                  "Did you",
                  "alternative",
                  "as an",
                  "classes",
                  "are available",
                  "ask"
                ],
                "correct_order": [
                  "Did you",
                  "ask",
                  "whether",
                  "group fithess",
                  "classes",
                  "are available",
                  "as an",
                  "alternative"
                ],
                "correct_sentence": "Did you ask whether group fithess classes are available as an alternative.",
                "decoys": [
                  "asking"
                ],
                "explanation": "Câu hỏi gợi ý/kiểm tra thông tin với trợ động từ: 'Have/Did you + V...?'. Từ bẫy 'asking' sai dạng động từ nguyên mẫu có to/V-ing không phù hợp sau trợ động từ."
              },
              {
                "id": "sp29_item09",
                "context": "The university's international festival this year featured performances and cuisine from Over fifty different countries.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "had the",
                  "celebrating",
                  "on such",
                  "Never before",
                  "grand scale",
                  "celebrated",
                  "diversity",
                  "a grand",
                  "campus"
                ],
                "correct_order": [
                  "Never before",
                  "had the",
                  "campus",
                  "celebrated",
                  "diversity",
                  "on such",
                  "a grand",
                  "grand scale"
                ],
                "correct_sentence": "Never before had the campus celebrated diversity on such a grand scale.",
                "decoys": [
                  "celebrating"
                ],
                "explanation": "Cấu trúc đảo ngữ phủ định / giới hạn (Negative inversion): Trạng từ phủ định đứng đầu câu + trợ động từ / to be + S + V chính. Từ bẫy 'celebrating' sai thì hoặc sai dạng trợ động từ."
              },
              {
                "id": "sp29_item10",
                "context": "The university launched a peer support program to comect students who are struggling with stress and anxiety.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "is voluntary",
                  "reported",
                  "students who",
                  "the program",
                  "join",
                  "Although",
                  "report feeling",
                  "less stressed"
                ],
                "correct_order": [
                  "Although",
                  "the program",
                  "is voluntary",
                  "students who",
                  "join",
                  "report feeling",
                  "less stressed"
                ],
                "correct_sentence": "Although the program is voluntary students who join report feeling less stressed.",
                "decoys": [
                  "reported"
                ],
                "explanation": "Mệnh đề trạng ngữ chỉ sự nhượng bộ/nguyên nhân: 'Liên từ + Mệnh đề phụ, Mệnh đề chính'. Từ bẫy 'reported' thừa từ hoặc sai cấu trúc nối câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const sentencePractice30 = {
  "id": "sentence-practice-30",
  "title": "Build a Sentence Practice 30 (10 câu ngữ cảnh giao tiếp)",
  "skill": "writing_sentence",
  "task_type": "build_sentence",
  "is_default": true,
  "duration_seconds": 420,
  "description": "Luyện ghép câu Task 1 Build a Sentence: 10 câu với ngữ cảnh hội thoại thực tế chuẩn TOEFL ETS 2026 (Bộ đề Practice 30).",
  "stages": [
    {
      "id": "sp30_stage_1",
      "title": "Task 1: Build a Sentence",
      "duration_seconds": 420,
      "tasks": [
        {
          "id": "sp30_t1_build_sentence",
          "title": "Build a Sentence (10 câu)",
          "task_type": "build_sentence",
          "content": {
            "instructions": "Mỗi câu có 1 câu ngữ cảnh ban đầu (Conversational Context). Kéo thả hoặc bấm chọn các khối từ bên dưới để ghép thành câu phản hồi hoàn chỉnh, đúng ngữ pháp chuẩn ETS. Chú ý có 1 từ bẫy không được dùng.",
            "items": [
              {
                "id": "sp30_item01",
                "context": "A specific comment in my professor's feedback on my draft completely changed the direction Of my thesis argument.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "teedback",
                  "reshaping",
                  "paters",
                  "It was",
                  "my entire",
                  "thesis argument",
                  "that reshaped"
                ],
                "correct_order": [
                  "It was",
                  "that reshaped",
                  "my entire",
                  "thesis argument",
                  "teedback",
                  "paters"
                ],
                "correct_sentence": "It was Dr. Patel's feedback that reshaped my entire thesis argument.",
                "decoys": [
                  "reshaping"
                ],
                "explanation": "Cấu trúc câu chẻ nhấn mạnh (Cleft sentence): 'It was/is + đối tượng nhấn mạnh + that/who + V...'. Từ bẫy 'reshaping' bị loại bỏ do sai dạng ngữ pháp hoặc thừa thành phần bổ ngữ."
              },
              {
                "id": "sp30_item02",
                "context": "In a recent survey, students said the greatest benefit of attending campus events was building new comections.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "valued most",
                  "built",
                  "What students",
                  "at campus",
                  "new people",
                  "events",
                  "was meeting"
                ],
                "correct_order": [
                  "What students",
                  "valued most",
                  "was meeting",
                  "new people",
                  "at campus",
                  "events"
                ],
                "correct_sentence": "What students valued most was meeting new people at campus events.",
                "decoys": [
                  "built"
                ],
                "explanation": "Mệnh đề danh ngữ làm chủ ngữ (Wh-cleft / Noun clause): 'Wh-clause + V chính + O/C'. Từ bẫy 'built' bị loại bỏ vì không phù hợp với thì hoặc cấu trúc động từ chính của câu."
              },
              {
                "id": "sp30_item03",
                "context": "My apartment lease ends in May and I have nof yet decided whether to renew it or 100k for somewhere new.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "explored all",
                  "exploring",
                  "Have you",
                  "the lease",
                  "sign the",
                  "Delore you",
                  "housing options"
                ],
                "correct_order": [
                  "Have you",
                  "Delore you",
                  "explored all",
                  "housing options",
                  "sign the",
                  "the lease"
                ],
                "correct_sentence": "Have you explored all housing options before you sign the lease.",
                "decoys": [
                  "exploring"
                ],
                "explanation": "Câu hỏi gợi ý/kiểm tra thông tin với trợ động từ: 'Have/Did you + V...?'. Từ bẫy 'exploring' sai dạng động từ nguyên mẫu có to/V-ing không phù hợp sau trợ động từ."
              },
              {
                "id": "sp30_item04",
                "context": "Our swimming team competed against twelve universities this season and came remarkably close to winning the title. had our.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "had our",
                  "coming Only twice the championship",
                  "come so",
                  "to winning",
                  "before",
                  "team",
                  "coming"
                ],
                "correct_order": [
                  "coming Only twice the championship",
                  "before",
                  "had our",
                  "team",
                  "come so",
                  "to winning"
                ],
                "correct_sentence": "Only twice before had our team come so close to winning the championship.",
                "decoys": [
                  "coming"
                ],
                "explanation": "Cấu trúc đảo ngữ phủ định / giới hạn (Negative inversion): Trạng từ phủ định đứng đầu câu + trợ động từ / to be + S + V chính. Từ bẫy 'coming' sai thì hoặc sai dạng trợ động từ."
              },
              {
                "id": "sp30_item05",
                "context": "Some students rely entirely on Al writing tools for their assignments and their critical thinking is suffering.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "are helptul",
                  "undermined",
                  "relying on",
                  "AI tools",
                  "them entirely",
                  "Even it",
                  "weakens",
                  "critical thinking"
                ],
                "correct_order": [
                  "Even it",
                  "AI tools",
                  "are helptul",
                  "relying on",
                  "them entirely",
                  "weakens",
                  "critical thinking"
                ],
                "correct_sentence": "Even it Al tools are helpful relying on them entirely weakens critical thinking.",
                "decoys": [
                  "undermined"
                ],
                "explanation": "Cấu trúc ngữ pháp hoàn chỉnh diễn đạt giải pháp hợp lý cho tình huống: Từ bẫy 'undermined' không phù hợp về ngữ pháp và trật tự từ trong câu."
              },
              {
                "id": "sp30_item06",
                "context": "A cycling campaign launched by the student government led directly to the construction Of new bike lanes on campus.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "the cycling",
                  "prompting",
                  "proposal",
                  "that led",
                  "to the",
                  "It was",
                  "lane project",
                  "new bike"
                ],
                "correct_order": [
                  "It was",
                  "the cycling",
                  "proposal",
                  "that led",
                  "to the",
                  "new bike",
                  "lane project"
                ],
                "correct_sentence": "It was the cycling proposal that led to the new bike lane project.",
                "decoys": [
                  "prompting"
                ],
                "explanation": "Cấu trúc câu chẻ nhấn mạnh (Cleft sentence): 'It was/is + đối tượng nhấn mạnh + that/who + V...'. Từ bẫy 'prompting' bị loại bỏ do sai dạng ngữ pháp hoặc thừa thành phần bổ ngữ."
              },
              {
                "id": "sp30_item07",
                "context": "The campus nutritionist explained that students who eat well tend to have more energy and perform better academically.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "directly impacts",
                  "eating",
                  "levels",
                  "What you",
                  "and academic",
                  "performance",
                  "eat",
                  "your energy"
                ],
                "correct_order": [
                  "What you",
                  "eat",
                  "directly impacts",
                  "your energy",
                  "levels",
                  "and academic",
                  "performance"
                ],
                "correct_sentence": "What you eat directly impacts your energy levels and academic performance.",
                "decoys": [
                  "eating"
                ],
                "explanation": "Mệnh đề danh ngữ làm chủ ngữ (Wh-cleft / Noun clause): 'Wh-clause + V chính + O/C'. Từ bẫy 'eating' bị loại bỏ vì không phù hợp với thì hoặc cấu trúc động từ chính của câu."
              },
              {
                "id": "sp30_item08",
                "context": "l need to access a rare historical manuscript for my research paper but it is kept in a restricted area.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "how to",
                  "explaining",
                  "explain",
                  "Did the",
                  "restricted materials",
                  "librarian",
                  "access to",
                  "request"
                ],
                "correct_order": [
                  "Did the",
                  "librarian",
                  "how to",
                  "request",
                  "access to",
                  "restricted materials",
                  "explain"
                ],
                "correct_sentence": "Did the librarian exp'a.in how to request access to restricted materials.",
                "decoys": [
                  "explaining"
                ],
                "explanation": "Cấu trúc ngữ pháp hoàn chỉnh diễn đạt giải pháp hợp lý cho tình huống: Từ bẫy 'explaining' không phù hợp về ngữ pháp và trật tự từ trong câu."
              },
              {
                "id": "sp30_item09",
                "context": "Working part-time jobs during university gives students both income and practical professional experience.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "provide income",
                  "valuable skills",
                  "building",
                  "but they",
                  "do part-time",
                  "jobs",
                  "Nof only",
                  "also build"
                ],
                "correct_order": [
                  "Nof only",
                  "do part-time",
                  "jobs",
                  "provide income",
                  "but they",
                  "also build",
                  "valuable skills"
                ],
                "correct_sentence": "Nof only do part-time jobs provide income but they also build valuable skills.",
                "decoys": [
                  "building"
                ],
                "explanation": "Cấu trúc ngữ pháp hoàn chỉnh diễn đạt giải pháp hợp lý cho tình huống: Từ bẫy 'building' không phù hợp về ngữ pháp và trật tự từ trong câu."
              },
              {
                "id": "sp30_item10",
                "context": "The campus international student association was set up to help students from abroad adjust to their new environment.",
                "target_prompt": "Hoàn thiện câu phản hồi của bạn:",
                "scrambled": [
                  "was founded",
                  "adapting",
                  "Since the",
                  "it easier",
                  "association",
                  "nave found",
                  "to adapt",
                  "international students"
                ],
                "correct_order": [
                  "Since the",
                  "association",
                  "was founded",
                  "nave found",
                  "international students",
                  "it easier",
                  "to adapt"
                ],
                "correct_sentence": "Since the association was founded international students have found it easier to adapt.",
                "decoys": [
                  "adapting"
                ],
                "explanation": "Mệnh đề trạng ngữ chỉ sự nhượng bộ/nguyên nhân: 'Liên từ + Mệnh đề phụ, Mệnh đề chính'. Từ bẫy 'adapting' thừa từ hoặc sai cấu trúc nối câu."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const ALL_SENTENCE_PRACTICE_TESTS = [
  sentencePractice01,
  sentencePractice02,
  sentencePractice03,
  sentencePractice04,
  sentencePractice05,
  sentencePractice06,
  sentencePractice07,
  sentencePractice08,
  sentencePractice09,
  sentencePractice10,
  sentencePractice11,
  sentencePractice12,
  sentencePractice13,
  sentencePractice14,
  sentencePractice15,
  sentencePractice16,
  sentencePractice17,
  sentencePractice18,
  sentencePractice19,
  sentencePractice20,
  sentencePractice21,
  sentencePractice22,
  sentencePractice23,
  sentencePractice24,
  sentencePractice25,
  sentencePractice26,
  sentencePractice27,
  sentencePractice28,
  sentencePractice29,
  sentencePractice30,
];
