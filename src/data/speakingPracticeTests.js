// ==========================================================================
// TOEFL SPEAKING PRACTICE TESTS (EXTRACTED FROM ETS 2026 FORMAT PLAYLIST)
// Total: 12 Full Practice Tests (Task 1: Listen & Repeat, Task 2: Interview)
// ==========================================================================

export const speakingPractice01 = {
  "id": "speaking-practice-01",
  "title": "Speaking Practice Test 01 (TOEFL 2026 - Main Student Cafeteria & Scholarship to Study Abroad)",
  "skill": "speaking",
  "is_default": true,
  "duration_seconds": 480,
  "description": "Bộ đề luyện thi TOEFL Speaking 2026 chuẩn ETS: Task 1 (Main Student Cafeteria - 7 câu Listen & Repeat), Task 2 (Take an Interview: Scholarship to Study Abroad - 4 câu phỏng vấn 45 giây). Hoàn toàn không có thời gian chuẩn bị (No Prep Time).",
  "stages": [
    {
      "id": "sp1_stage_1",
      "title": "Speaking Section (Linear - 8 Mins)",
      "duration_seconds": 480,
      "tasks": [
        {
          "id": "sp1_t1",
          "title": "Task 1: Listen and Repeat (7 câu)",
          "task_type": "listen_and_repeat",
          "content": {
            "instructions": "Bạn sẽ nghe 7 câu nói một lần duy nhất với ngữ cảnh trường học. Ngay sau tiếng bíp, hãy lặp lại chính xác từng từ vừa nghe vào micro trong thời gian quy định (không có thời gian chuẩn bị).",
            "items": [
              {
                "id": "sp1_t1_i1",
                "context": "Main Student Cafeteria Notice 1",
                "audio_text": "This is the main student cafeteria.",
                "word_count": 6,
                "speak_seconds": 8,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp1_t1_i2",
                "context": "Main Student Cafeteria Notice 2",
                "audio_text": "Breakfast is served until 10:30.",
                "word_count": 5,
                "speak_seconds": 8,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp1_t1_i3",
                "context": "Main Student Cafeteria Notice 3",
                "audio_text": "Hot meals are available for lunch and dinner.",
                "word_count": 8,
                "speak_seconds": 10,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp1_t1_i4",
                "context": "Main Student Cafeteria Notice 4",
                "audio_text": "Vegetarian and gluten-free options are clearly labeled.",
                "word_count": 7,
                "speak_seconds": 9,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp1_t1_i5",
                "context": "Main Student Cafeteria Notice 5",
                "audio_text": "Please return your trays after finishing your meal.",
                "word_count": 8,
                "speak_seconds": 10,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp1_t1_i6",
                "context": "Main Student Cafeteria Notice 6",
                "audio_text": "You can pay with your student card or credit card at the register.",
                "word_count": 13,
                "speak_seconds": 14,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp1_t1_i7",
                "context": "Main Student Cafeteria Notice 7",
                "audio_text": "Weekly menus are posted online and on the notice board.",
                "word_count": 10,
                "speak_seconds": 13,
                "sample_audio": null,
                "phonetic_guide": null
              }
            ]
          }
        },
        {
          "id": "sp1_t2",
          "title": "Task 2: Take an Interview (4 câu)",
          "task_type": "take_an_interview",
          "content": {
            "topic": "Scholarship to Study Abroad",
            "interviewer": {
              "name": "Dr. Committee",
              "title": "Committee Member",
              "avatar_initials": "CO"
            },
            "instructions": "Người phỏng vấn sẽ lần lượt đặt 4 câu hỏi về một chủ đề quen thuộc. Sau mỗi câu hỏi, hãy trả lời ngay lập tức trong 45 giây. Hoàn toàn không có thời gian chuẩn bị.",
            "questions": [
              {
                "id": "sp1_t2_q1",
                "question_number": 1,
                "audio_text": "Thank you for applying for this scholarship. To begin, have you ever traveled to another country? If yes, where did you go and for how long?",
                "prompt": "Tell the interviewer if you have traveled abroad, where you went, and how long you stayed.",
                "speak_seconds": 45,
                "sample_answer": "Yes, I have traveled abroad before. Last year, I spent three weeks in Japan participating in a cultural exchange program. During my stay, I lived with a host family in Tokyo, attended daily language classes, and visited several historical landmarks. This experience significantly broadened my global perspective and improved my cross-cultural communication skills, which is why I am eager to pursue further international study.",
                "key_points": [
                  "Confirmed previous international travel",
                  "Specified destination (Japan) and duration (three weeks)",
                  "Briefly mentioned the purpose and personal impact"
                ]
              },
              {
                "id": "sp1_t2_q2",
                "question_number": 2,
                "audio_text": "Studying abroad can be exciting, but also challenging. What do you think would be the most exciting and the most difficult aspects of studying abroad for you personally?",
                "prompt": "Explain what you would find most exciting and most challenging about studying abroad.",
                "speak_seconds": 45,
                "sample_answer": "The most exciting aspect for me would be immersing myself in a completely new academic environment and building a global network of friends and mentors. On the other hand, the most difficult challenge would likely be dealing with the initial culture shock and managing homesickness during the first few weeks. However, I am confident that my adaptability and open-mindedness will help me overcome these hurdles successfully.",
                "key_points": [
                  "Identified academic immersion and networking as exciting",
                  "Acknowledged culture shock and homesickness as challenges",
                  "Expressed confidence in personal adaptability"
                ]
              },
              {
                "id": "sp1_t2_q3",
                "question_number": 3,
                "audio_text": "Some people believe studying abroad helps students become more independent and adaptable. Others think it can create difficulties with culture shock and loneliness. What is your opinion and why?",
                "prompt": "Share your opinion on whether studying abroad fosters independence or causes difficulties like loneliness.",
                "speak_seconds": 45,
                "sample_answer": "In my opinion, studying abroad fosters both independence and resilience, though it certainly comes with temporary difficulties like loneliness and culture shock. Being away from your familiar support system forces you to solve problems on your own, manage your finances, and navigate unfamiliar environments. While the initial adjustment phase can be tough, the long-term personal growth far outweighs the temporary challenges.",
                "key_points": [
                  "Stated clear opinion supporting personal growth",
                  "Discussed both independence and loneliness",
                  "Concluded that benefits outweigh challenges"
                ]
              },
              {
                "id": "sp1_t2_q4",
                "question_number": 4,
                "audio_text": "Finally, in your view, should governments encourage more students to study abroad, or should they focus on improving education at home?",
                "prompt": "Give your view on whether governments should support studying abroad or focus on domestic education.",
                "speak_seconds": 45,
                "sample_answer": "I believe governments should pursue a balanced approach rather than choosing just one. While investing in domestic education is crucial for national development, encouraging students to study abroad brings back invaluable international insights, innovative ideas, and global perspectives that ultimately benefit the home country. Therefore, funding international scholarship programs should be seen as a strategic investment in a globally connected workforce.",
                "key_points": [
                  "Advocated for a balanced approach",
                  "Highlighted the return of global insights to the home country",
                  "Framed international study as a strategic investment"
                ]
              }
            ]
          }
        }
      ]
    }
  ]
};

export const speakingPractice02 = {
  "id": "speaking-practice-02",
  "title": "Speaking Practice Test 02 (TOEFL 2026 - University Orientation & Online Education)",
  "skill": "speaking",
  "is_default": true,
  "duration_seconds": 480,
  "description": "Bộ đề luyện thi TOEFL Speaking 2026 chuẩn ETS: Task 1 (University Orientation - 7 câu Listen & Repeat), Task 2 (Take an Interview: Online Education - 4 câu phỏng vấn 45 giây). Hoàn toàn không có thời gian chuẩn bị (No Prep Time).",
  "stages": [
    {
      "id": "sp2_stage_1",
      "title": "Speaking Section (Linear - 8 Mins)",
      "duration_seconds": 480,
      "tasks": [
        {
          "id": "sp2_t1",
          "title": "Task 1: Listen and Repeat (7 câu)",
          "task_type": "listen_and_repeat",
          "content": {
            "instructions": "Bạn sẽ nghe 7 câu nói một lần duy nhất với ngữ cảnh trường học. Ngay sau tiếng bíp, hãy lặp lại chính xác từng từ vừa nghe vào micro trong thời gian quy định (không có thời gian chuẩn bị).",
            "items": [
              {
                "id": "sp2_t1_i1",
                "context": "University Orientation Notice 1",
                "audio_text": "Welcome to our university.",
                "word_count": 4,
                "speak_seconds": 8,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp2_t1_i2",
                "context": "University Orientation Notice 2",
                "audio_text": "Orientation session start at 9:00 in the auditorium.",
                "word_count": 8,
                "speak_seconds": 10,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp2_t1_i3",
                "context": "University Orientation Notice 3",
                "audio_text": "After the session, student guides will show you around campus.",
                "word_count": 10,
                "speak_seconds": 13,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp2_t1_i4",
                "context": "University Orientation Notice 4",
                "audio_text": "Please carry your ID card with you at all times.",
                "word_count": 10,
                "speak_seconds": 13,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp2_t1_i5",
                "context": "University Orientation Notice 5",
                "audio_text": "Housing assistance is available at the residence office.",
                "word_count": 8,
                "speak_seconds": 10,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp2_t1_i6",
                "context": "University Orientation Notice 6",
                "audio_text": "You will also receive information about clubs and organizations.",
                "word_count": 9,
                "speak_seconds": 11,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp2_t1_i7",
                "context": "University Orientation Notice 7",
                "audio_text": "If you have questions, our staff will gladly help.",
                "word_count": 9,
                "speak_seconds": 11,
                "sample_audio": null,
                "phonetic_guide": null
              }
            ]
          }
        },
        {
          "id": "sp2_t2",
          "title": "Task 2: Take an Interview (4 câu)",
          "task_type": "take_an_interview",
          "content": {
            "topic": "Online Education",
            "interviewer": {
              "name": "Dr. Researcher",
              "title": "Researcher",
              "avatar_initials": "RE"
            },
            "instructions": "Người phỏng vấn sẽ lần lượt đặt 4 câu hỏi về một chủ đề quen thuộc. Sau mỗi câu hỏi, hãy trả lời ngay lập tức trong 45 giây. Hoàn toàn không có thời gian chuẩn bị.",
            "questions": [
              {
                "id": "sp2_t2_q1",
                "question_number": 1,
                "audio_text": "First, have you ever taken an online class? If so, what was it about?",
                "prompt": "Tell the interviewer if you have ever taken an online class and describe what it was about.",
                "speak_seconds": 45,
                "sample_answer": "Yes, I have taken several online classes. The most recent one was an intermediate Python programming course that I completed last semester. It covered data structures, algorithms, and basic web scraping using popular libraries like BeautifulSoup and Pandas. The course format included pre-recorded video lectures, weekly coding assignments, and a peer-reviewed final project where we built a small web application.",
                "key_points": [
                  "Confirm prior experience with online classes",
                  "Specify the subject or course topic",
                  "Briefly describe the course format or content"
                ]
              },
              {
                "id": "sp2_t2_q2",
                "question_number": 2,
                "audio_text": "What do you think are the main advantages and disadvantages of online learning compared to traditional classroom learning?",
                "prompt": "Explain the main advantages and disadvantages of online learning versus traditional classroom learning.",
                "speak_seconds": 45,
                "sample_answer": "The main advantage of online learning is flexibility, as it allows students to study at their own pace and manage their schedules around work or other commitments. It also eliminates commuting time. However, the primary disadvantage is the lack of face-to-face interaction with instructors and peers, which can make networking difficult and sometimes leads to feelings of isolation. Additionally, online learning requires a high level of self-discipline to stay on track.",
                "key_points": [
                  "Discuss flexibility and convenience as advantages",
                  "Mention lack of social interaction or discipline as disadvantages",
                  "Compare directly with traditional classroom settings"
                ]
              },
              {
                "id": "sp2_t2_q3",
                "question_number": 3,
                "audio_text": "Some people argue that online education is just as effective as in-person classes. Others strongly disagree. What is your opinion? Please explain.",
                "prompt": "State your opinion on whether online education is as effective as in-person classes and provide reasons.",
                "speak_seconds": 45,
                "sample_answer": "In my opinion, online education can be just as effective as in-person classes, but it depends heavily on the subject matter and the student's learning style. For lecture-based or tech-related courses, online platforms often provide superior resources like re-watchable videos and instant quizzes. However, for hands-on subjects like chemistry labs or performing arts, in-person instruction remains irreplaceable.",
                "key_points": [
                  "State a clear position on effectiveness",
                  "Explain that effectiveness depends on the subject or student",
                  "Provide supporting reasons with examples"
                ]
              },
              {
                "id": "sp2_t2_q4",
                "question_number": 4,
                "audio_text": "Looking to the future, how do you think the growth of online learning might change universities over the next 20 years?",
                "prompt": "Discuss how the growth of online learning might change universities in the next 20 years.",
                "speak_seconds": 45,
                "sample_answer": "Over the next 20 years, I believe universities will shift toward a hybrid model where physical campuses focus primarily on collaborative research, hands-on workshops, and social experiences, while theoretical lectures move almost entirely online. This could make higher education more accessible and affordable globally, while transforming traditional brick-and-mortar universities into innovation hubs rather than just lecture halls.",
                "key_points": [
                  "Predict a hybrid or blended university model",
                  "Discuss changes to physical campuses and lectures",
                  "Address global accessibility and affordability"
                ]
              }
            ]
          }
        }
      ]
    }
  ]
};

export const speakingPractice03 = {
  "id": "speaking-practice-03",
  "title": "Speaking Practice Test 03 (TOEFL 2026 - Chemistry Laboratory & Student Leadership Program)",
  "skill": "speaking",
  "is_default": true,
  "duration_seconds": 480,
  "description": "Bộ đề luyện thi TOEFL Speaking 2026 chuẩn ETS: Task 1 (Chemistry Laboratory - 7 câu Listen & Repeat), Task 2 (Take an Interview: Student Leadership Program - 4 câu phỏng vấn 45 giây). Hoàn toàn không có thời gian chuẩn bị (No Prep Time).",
  "stages": [
    {
      "id": "sp3_stage_1",
      "title": "Speaking Section (Linear - 8 Mins)",
      "duration_seconds": 480,
      "tasks": [
        {
          "id": "sp3_t1",
          "title": "Task 1: Listen and Repeat (7 câu)",
          "task_type": "listen_and_repeat",
          "content": {
            "instructions": "Bạn sẽ nghe 7 câu nói một lần duy nhất với ngữ cảnh trường học. Ngay sau tiếng bíp, hãy lặp lại chính xác từng từ vừa nghe vào micro trong thời gian quy định (không có thời gian chuẩn bị).",
            "items": [
              {
                "id": "sp3_t1_i1",
                "context": "Chemistry Laboratory Notice 1",
                "audio_text": "This is our chemistry laboratory.",
                "word_count": 5,
                "speak_seconds": 8,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp3_t1_i2",
                "context": "Chemistry Laboratory Notice 2",
                "audio_text": "Safety goggles are required at all times.",
                "word_count": 7,
                "speak_seconds": 9,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp3_t1_i3",
                "context": "Chemistry Laboratory Notice 3",
                "audio_text": "Lab coats and gloves are available near the entrance.",
                "word_count": 9,
                "speak_seconds": 11,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp3_t1_i4",
                "context": "Chemistry Laboratory Notice 4",
                "audio_text": "Please review the safety manual before starting any experiments.",
                "word_count": 9,
                "speak_seconds": 11,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp3_t1_i5",
                "context": "Chemistry Laboratory Notice 5",
                "audio_text": "Do not handle chemicals without proper supervision.",
                "word_count": 7,
                "speak_seconds": 9,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp3_t1_i6",
                "context": "Chemistry Laboratory Notice 6",
                "audio_text": "Waste materials must be disposed of in designated containers.",
                "word_count": 9,
                "speak_seconds": 11,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp3_t1_i7",
                "context": "Chemistry Laboratory Notice 7",
                "audio_text": "If an emergency occurs, follow the evacuation signs to the nearest exit.",
                "word_count": 12,
                "speak_seconds": 14,
                "sample_audio": null,
                "phonetic_guide": null
              }
            ]
          }
        },
        {
          "id": "sp3_t2",
          "title": "Task 2: Take an Interview (4 câu)",
          "task_type": "take_an_interview",
          "content": {
            "topic": "Student Leadership Program",
            "interviewer": {
              "name": "Dr. Program",
              "title": "Program Director",
              "avatar_initials": "PR"
            },
            "instructions": "Người phỏng vấn sẽ lần lượt đặt 4 câu hỏi về một chủ đề quen thuộc. Sau mỗi câu hỏi, hãy trả lời ngay lập tức trong 45 giây. Hoàn toàn không có thời gian chuẩn bị.",
            "questions": [
              {
                "id": "sp3_t2_q1",
                "question_number": 1,
                "audio_text": "First, have you ever participated in a club, organization, or volunteer activity before? If so, what was your role?",
                "prompt": "Tell the interviewer about your past involvement in clubs, organizations, or volunteer activities and describe your role.",
                "speak_seconds": 45,
                "sample_answer": "Yes, I have been actively involved in several extracurricular activities during my undergraduate studies. Most notably, I served as the treasurer of the Environmental Science Club for two years. In this role, I managed our annual budget, coordinated fundraising events, and organized campus recycling drives. This experience taught me valuable lessons in financial planning, teamwork, and how to motivate my peers toward a common goal.",
                "key_points": [
                  "Mention past involvement in clubs or volunteer work",
                  "Specify the exact role or position held",
                  "Describe key responsibilities and personal achievements"
                ]
              },
              {
                "id": "sp3_t2_q2",
                "question_number": 2,
                "audio_text": "Leadership requires good communication skills. What do you think is more important for a leader: listening carefully or giving clear instructions, and why?",
                "prompt": "Discuss whether listening carefully or giving clear instructions is more important for a leader, and explain why.",
                "speak_seconds": 45,
                "sample_answer": "While both skills are essential, I believe that listening carefully is ultimately more important for an effective leader. When a leader listens actively to team members' concerns, ideas, and feedback, it builds trust and fosters an inclusive environment where everyone feels valued. Clear instructions are certainly necessary to guide tasks, but they are much more impactful when they are based on a thorough understanding of the team's capabilities and perspectives gathered through attentive listening.",
                "key_points": [
                  "Choose between listening carefully and giving clear instructions",
                  "Provide clear justification and reasoning for your choice",
                  "Explain how this skill impacts team collaboration and success"
                ]
              },
              {
                "id": "sp3_t2_q3",
                "question_number": 3,
                "audio_text": "Some people say that leadership programs are essential because they prepare students for future careers. Others believe students should just focus on academic courses. What is your opinion?",
                "prompt": "State your opinion on whether leadership programs are essential for career preparation or if students should solely focus on academic courses.",
                "speak_seconds": 45,
                "sample_answer": "In my opinion, leadership programs are just as important as academic courses for comprehensive student development. While academics provide the necessary theoretical knowledge, leadership programs cultivate crucial soft skills such as conflict resolution, project management, and public speaking. Employers today actively look for graduates who can lead teams and adapt to dynamic workplace environments, making these programs an invaluable component of higher education.",
                "key_points": [
                  "State a clear position on leadership programs versus academics",
                  "Highlight the practical benefits of leadership training",
                  "Connect leadership skills to future career success"
                ]
              },
              {
                "id": "sp3_t2_q4",
                "question_number": 4,
                "audio_text": "Finally, what do you think universities could do to better prepare students for leadership roles in society?",
                "prompt": "Suggest strategies or initiatives that universities can implement to better prepare students for leadership roles in society.",
                "speak_seconds": 45,
                "sample_answer": "I believe universities can better prepare students by integrating more experiential learning opportunities into the standard curriculum, such as community-based projects and mandatory group internships. Additionally, institutions should offer regular workshops on emotional intelligence, cross-cultural communication, and ethical decision-making. By connecting students with alumni mentors who are active community leaders, universities can bridge the gap between classroom theory and real-world leadership impact.",
                "key_points": [
                  "Propose practical initiatives for universities",
                  "Focus on bridging classroom learning with real-world applications",
                  "Emphasize community engagement and mentorship"
                ]
              }
            ]
          }
        }
      ]
    }
  ]
};

export const speakingPractice04 = {
  "id": "speaking-practice-04",
  "title": "Speaking Practice Test 04 (TOEFL 2026 - Main Library & Daily Health Habits)",
  "skill": "speaking",
  "is_default": true,
  "duration_seconds": 480,
  "description": "Bộ đề luyện thi TOEFL Speaking 2026 chuẩn ETS: Task 1 (Main Library - 7 câu Listen & Repeat), Task 2 (Take an Interview: Daily Health Habits - 4 câu phỏng vấn 45 giây). Hoàn toàn không có thời gian chuẩn bị (No Prep Time).",
  "stages": [
    {
      "id": "sp4_stage_1",
      "title": "Speaking Section (Linear - 8 Mins)",
      "duration_seconds": 480,
      "tasks": [
        {
          "id": "sp4_t1",
          "title": "Task 1: Listen and Repeat (7 câu)",
          "task_type": "listen_and_repeat",
          "content": {
            "instructions": "Bạn sẽ nghe 7 câu nói một lần duy nhất với ngữ cảnh trường học. Ngay sau tiếng bíp, hãy lặp lại chính xác từng từ vừa nghe vào micro trong thời gian quy định (không có thời gian chuẩn bị).",
            "items": [
              {
                "id": "sp4_t1_i1",
                "context": "Main Library Notice 1",
                "audio_text": "Welcome to the main library.",
                "word_count": 5,
                "speak_seconds": 8,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp4_t1_i2",
                "context": "Main Library Notice 2",
                "audio_text": "The circulation desk is just past the entrance.",
                "word_count": 8,
                "speak_seconds": 10,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp4_t1_i3",
                "context": "Main Library Notice 3",
                "audio_text": "Computers for research are located on the second floor.",
                "word_count": 9,
                "speak_seconds": 11,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp4_t1_i4",
                "context": "Main Library Notice 4",
                "audio_text": "Please keep your voice low in the study areas.",
                "word_count": 9,
                "speak_seconds": 11,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp4_t1_i5",
                "context": "Main Library Notice 5",
                "audio_text": "Food and drinks are only allowed in the cafe downstairs.",
                "word_count": 10,
                "speak_seconds": 13,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp4_t1_i6",
                "context": "Main Library Notice 6",
                "audio_text": "If you need help, librarians are available at the reference desk.",
                "word_count": 11,
                "speak_seconds": 14,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp4_t1_i7",
                "context": "Main Library Notice 7",
                "audio_text": "Don't forget you can access thousands of e-books through our online system.",
                "word_count": 12,
                "speak_seconds": 14,
                "sample_audio": null,
                "phonetic_guide": null
              }
            ]
          }
        },
        {
          "id": "sp4_t2",
          "title": "Task 2: Take an Interview (4 câu)",
          "task_type": "take_an_interview",
          "content": {
            "topic": "Daily Health Habits",
            "interviewer": {
              "name": "Dr. University",
              "title": "University Researcher",
              "avatar_initials": "UN"
            },
            "instructions": "Người phỏng vấn sẽ lần lượt đặt 4 câu hỏi về một chủ đề quen thuộc. Sau mỗi câu hỏi, hãy trả lời ngay lập tức trong 45 giây. Hoàn toàn không có thời gian chuẩn bị.",
            "questions": [
              {
                "id": "sp4_t2_q1",
                "question_number": 1,
                "audio_text": "To start, do you usually exercise, and if so, what kind of exercise do you do?",
                "prompt": "Tell the researcher if you usually exercise, and if so, what kind of exercise you do.",
                "speak_seconds": 45,
                "sample_answer": "Yes, I try to exercise regularly. Usually, I go for a jog three times a week and do yoga on the weekends to stay active and reduce stress.",
                "key_points": [
                  "Acknowledge whether you exercise",
                  "Describe the types of exercise you do",
                  "Mention the frequency of your workouts"
                ]
              },
              {
                "id": "sp4_t2_q2",
                "question_number": 2,
                "audio_text": "In your opinion, is it easier to build healthy habits like regular sleep and exercise when living at home or when living on campus, and why?",
                "prompt": "Explain whether it is easier to build healthy habits at home or on campus, and give reasons.",
                "speak_seconds": 45,
                "sample_answer": "I think it can be easier to build healthy habits when living on campus because universities often provide great facilities like gyms and dining halls with healthy options. However, living at home might offer better support and homemade meals.",
                "key_points": [
                  "State your opinion clearly",
                  "Compare living at home versus living on campus",
                  "Provide supporting reasons such as facilities or support systems"
                ]
              },
              {
                "id": "sp4_t2_q3",
                "question_number": 3,
                "audio_text": "Some people believe universities should require all students to take physical education or wellness classes. Do you agree or disagree? Explain.",
                "prompt": "State whether you agree or disagree that universities should require physical education or wellness classes for all students, and explain why.",
                "speak_seconds": 45,
                "sample_answer": "I agree with making wellness classes mandatory because many students neglect their health due to heavy academic workloads. Requiring these classes encourages a balanced lifestyle and teaches stress management skills.",
                "key_points": [
                  "State whether you agree or disagree",
                  "Give reasons related to student health and academics",
                  "Explain the potential benefits of mandatory wellness classes"
                ]
              },
              {
                "id": "sp4_t2_q4",
                "question_number": 4,
                "audio_text": "Finally, what do you think governments could do to encourage people to adopt healthier lifestyles?",
                "prompt": "Suggest what governments could do to encourage people to adopt healthier lifestyles.",
                "speak_seconds": 45,
                "sample_answer": "Governments could invest more in public parks and recreation centers to make exercise accessible to everyone. They could also subsidize healthy foods and run awareness campaigns about nutrition and physical activity.",
                "key_points": [
                  "Propose government initiatives",
                  "Focus on accessibility and affordability of healthy choices",
                  "Mention public education or infrastructure improvements"
                ]
              }
            ]
          }
        }
      ]
    }
  ]
};

export const speakingPractice05 = {
  "id": "speaking-practice-05",
  "title": "Speaking Practice Test 05 (TOEFL 2026 - Student Health Center & Part-Time Job at a Campus Bookstore)",
  "skill": "speaking",
  "is_default": true,
  "duration_seconds": 480,
  "description": "Bộ đề luyện thi TOEFL Speaking 2026 chuẩn ETS: Task 1 (Student Health Center - 7 câu Listen & Repeat), Task 2 (Take an Interview: Part-Time Job at a Campus Bookstore - 4 câu phỏng vấn 45 giây). Hoàn toàn không có thời gian chuẩn bị (No Prep Time).",
  "stages": [
    {
      "id": "sp5_stage_1",
      "title": "Speaking Section (Linear - 8 Mins)",
      "duration_seconds": 480,
      "tasks": [
        {
          "id": "sp5_t1",
          "title": "Task 1: Listen and Repeat (7 câu)",
          "task_type": "listen_and_repeat",
          "content": {
            "instructions": "Bạn sẽ nghe 7 câu nói một lần duy nhất với ngữ cảnh trường học. Ngay sau tiếng bíp, hãy lặp lại chính xác từng từ vừa nghe vào micro trong thời gian quy định (không có thời gian chuẩn bị).",
            "items": [
              {
                "id": "sp5_t1_i1",
                "context": "Student Health Center Notice 1",
                "audio_text": "The student health center is open every weekday from 9 to 5.",
                "word_count": 12,
                "speak_seconds": 14,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp5_t1_i2",
                "context": "Student Health Center Notice 2",
                "audio_text": "Walk straight down this road for two blocks until you reach the intersection.",
                "word_count": 13,
                "speak_seconds": 14,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp5_t1_i3",
                "context": "Student Health Center Notice 3",
                "audio_text": "Turn left at the large science building, which has a glass entrance.",
                "word_count": 12,
                "speak_seconds": 14,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp5_t1_i4",
                "context": "Student Health Center Notice 4",
                "audio_text": "You'll see the student health center on your right, just across from the gym.",
                "word_count": 14,
                "speak_seconds": 14,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp5_t1_i5",
                "context": "Student Health Center Notice 5",
                "audio_text": "Doctors and nurses are available for checkups and minor treatments.",
                "word_count": 10,
                "speak_seconds": 13,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp5_t1_i6",
                "context": "Student Health Center Notice 6",
                "audio_text": "Counseling services are also offered for free, providing support for stress or anxiety.",
                "word_count": 13,
                "speak_seconds": 14,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp5_t1_i7",
                "context": "Student Health Center Notice 7",
                "audio_text": "In case of medical emergencies, dial campus security immediately and they'll send help.",
                "word_count": 13,
                "speak_seconds": 14,
                "sample_audio": null,
                "phonetic_guide": null
              }
            ]
          }
        },
        {
          "id": "sp5_t2",
          "title": "Task 2: Take an Interview (4 câu)",
          "task_type": "take_an_interview",
          "content": {
            "topic": "Part-Time Job at a Campus Bookstore",
            "interviewer": {
              "name": "Dr. Campus",
              "title": "Campus Bookstore Manager",
              "avatar_initials": "CA"
            },
            "instructions": "Người phỏng vấn sẽ lần lượt đặt 4 câu hỏi về một chủ đề quen thuộc. Sau mỗi câu hỏi, hãy trả lời ngay lập tức trong 45 giây. Hoàn toàn không có thời gian chuẩn bị.",
            "questions": [
              {
                "id": "sp5_t2_q1",
                "question_number": 1,
                "audio_text": "Thank you for applying. Have you ever worked in customer service before? If so, what did you do?",
                "prompt": "Tell the interviewer if you have ever worked in customer service and describe your experience.",
                "speak_seconds": 45,
                "sample_answer": "Yes, I have worked in customer service before. Last year, I had a part-time job as a cashier at a local coffee shop. My responsibilities included greeting customers, taking orders, handling cash and card transactions, and ensuring the seating area remained clean and welcoming. This experience helped me develop strong communication skills and taught me how to handle busy situations calmly.",
                "key_points": [
                  "Acknowledge prior customer service experience",
                  "Describe specific role and responsibilities",
                  "Highlight learned skills such as communication and stress management"
                ]
              },
              {
                "id": "sp5_t2_q2",
                "question_number": 2,
                "audio_text": "Imagine the store is very busy. Do you think it's more important to work quickly or to make sure every customer feels personally cared for and why?",
                "prompt": "Explain whether speed or personal care is more important when the store is busy, and explain your reasoning.",
                "speak_seconds": 45,
                "sample_answer": "In a busy retail environment, I believe finding a balance between efficiency and personal care is crucial. While working quickly helps move the queue and prevents long waiting times, making sure each customer feels valued is what builds brand loyalty. If I had to prioritize, I would focus on delivering genuine, warm service even under pressure, because a positive interaction leaves a lasting impression, whereas rushed service can drive customers away.",
                "key_points": [
                  "Address both speed and personal care",
                  "Explain the importance of customer loyalty and satisfaction",
                  "Provide a balanced and reasoned perspective"
                ]
              },
              {
                "id": "sp5_t2_q3",
                "question_number": 3,
                "audio_text": "Some people believe that part-time jobs can help students build important skills. Others think they distract from academic responsibilities. What is your opinion?",
                "prompt": "Share your opinion on whether part-time jobs help students build skills or distract from academics.",
                "speak_seconds": 45,
                "sample_answer": "In my opinion, part-time jobs are extremely beneficial for students because they teach essential life skills like time management, financial responsibility, and teamwork that cannot be learned in a classroom. While it is true that balancing work and studies can be challenging, proper scheduling and organization allow students to successfully manage both without hurting their academic performance.",
                "key_points": [
                  "State clear opinion favoring part-time work",
                  "Mention specific skills gained (time management, teamwork)",
                  "Address the counterargument regarding academic distraction"
                ]
              },
              {
                "id": "sp5_t2_q4",
                "question_number": 4,
                "audio_text": "Finally, how do you think working during college might influence your career opportunities after graduation?",
                "prompt": "Explain how working during college might influence your career opportunities after graduation.",
                "speak_seconds": 45,
                "sample_answer": "Working during college significantly boosts post-graduation career opportunities by giving students practical, real-world experience before they even graduate. It adds valuable entries to a resume, helps build a professional network with colleagues and customers, and demonstrates strong work ethic and adaptability to potential future employers.",
                "key_points": [
                  "Connect current work experience to future career success",
                  "Mention resume building and professional networking",
                  "Highlight employer expectations such as work ethic"
                ]
              }
            ]
          }
        }
      ]
    }
  ]
};

export const speakingPractice06 = {
  "id": "speaking-practice-06",
  "title": "Speaking Practice Test 06 (TOEFL 2026 - University Residence Hall Orientation & Community Center Volunteer Program)",
  "skill": "speaking",
  "is_default": true,
  "duration_seconds": 480,
  "description": "Bộ đề luyện thi TOEFL Speaking 2026 chuẩn ETS: Task 1 (University Residence Hall Orientation - 7 câu Listen & Repeat), Task 2 (Take an Interview: Community Center Volunteer Program - 4 câu phỏng vấn 45 giây). Hoàn toàn không có thời gian chuẩn bị (No Prep Time).",
  "stages": [
    {
      "id": "sp6_stage_1",
      "title": "Speaking Section (Linear - 8 Mins)",
      "duration_seconds": 480,
      "tasks": [
        {
          "id": "sp6_t1",
          "title": "Task 1: Listen and Repeat (7 câu)",
          "task_type": "listen_and_repeat",
          "content": {
            "instructions": "Bạn sẽ nghe 7 câu nói một lần duy nhất với ngữ cảnh trường học. Ngay sau tiếng bíp, hãy lặp lại chính xác từng từ vừa nghe vào micro trong thời gian quy định (không có thời gian chuẩn bị).",
            "items": [
              {
                "id": "sp6_t1_i1",
                "context": "University Residence Hall Orientation Notice 1",
                "audio_text": "Welcome to your new dormitory.",
                "word_count": 5,
                "speak_seconds": 8,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp6_t1_i2",
                "context": "University Residence Hall Orientation Notice 2",
                "audio_text": "Quiet hours begin at 10 o'clock each night.",
                "word_count": 8,
                "speak_seconds": 10,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp6_t1_i3",
                "context": "University Residence Hall Orientation Notice 3",
                "audio_text": "Please lock your door whenever you leave the room.",
                "word_count": 9,
                "speak_seconds": 11,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp6_t1_i4",
                "context": "University Residence Hall Orientation Notice 4",
                "audio_text": "Cooking is allowed only in the common kitchen area.",
                "word_count": 9,
                "speak_seconds": 11,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp6_t1_i5",
                "context": "University Residence Hall Orientation Notice 5",
                "audio_text": "Guests must sign in at the front desk before entering.",
                "word_count": 10,
                "speak_seconds": 13,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp6_t1_i6",
                "context": "University Residence Hall Orientation Notice 6",
                "audio_text": "Keep hallways clear and avoid leaving personal belongings outside.",
                "word_count": 9,
                "speak_seconds": 11,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp6_t1_i7",
                "context": "University Residence Hall Orientation Notice 7",
                "audio_text": "Respect your roommates and neighbors as this helps everyone enjoy a safe and pleasant living environment.",
                "word_count": 16,
                "speak_seconds": 14,
                "sample_audio": null,
                "phonetic_guide": null
              }
            ]
          }
        },
        {
          "id": "sp6_t2",
          "title": "Task 2: Take an Interview (4 câu)",
          "task_type": "take_an_interview",
          "content": {
            "topic": "Community Center Volunteer Program",
            "interviewer": {
              "name": "Dr. Program",
              "title": "Program Coordinator",
              "avatar_initials": "PR"
            },
            "instructions": "Người phỏng vấn sẽ lần lượt đặt 4 câu hỏi về một chủ đề quen thuộc. Sau mỗi câu hỏi, hãy trả lời ngay lập tức trong 45 giây. Hoàn toàn không có thời gian chuẩn bị.",
            "questions": [
              {
                "id": "sp6_t2_q1",
                "question_number": 1,
                "audio_text": "To begin, have you ever done volunteer work before? If so, what did you do?",
                "prompt": "Tell the interviewer if you have done volunteer work before and describe what you did.",
                "speak_seconds": 45,
                "sample_answer": "Yes, I have volunteered several times in the past. Most recently, I spent six months helping out at a local food bank every weekend. My main responsibilities included organizing donated food items, packing grocery boxes for low-income families, and assisting guests as they arrived. It was a very rewarding experience because I got to interact directly with people in need and see the immediate impact of our community's generosity.",
                "key_points": [
                  "State whether you have prior volunteer experience",
                  "Describe specific roles or tasks performed",
                  "Explain the personal significance or impact of the experience"
                ]
              },
              {
                "id": "sp6_t2_q2",
                "question_number": 2,
                "audio_text": "Volunteers often need patience and flexibility. Which quality do you think is more important for a volunteer to have? Why?",
                "prompt": "Discuss whether patience or flexibility is more important for a volunteer and explain why.",
                "speak_seconds": 45,
                "sample_answer": "I believe both qualities are crucial, but if I had to choose, I would say flexibility is slightly more important. When volunteering, unexpected situations arise constantly—schedule changes, shortages of supplies, or shifts in community needs. Being adaptable allows volunteers to remain calm and transition smoothly to new tasks. However, patience is equally vital when dealing with people who may be stressed or confused, ensuring every visitor feels welcomed and supported.",
                "key_points": [
                  "Choose between patience and flexibility",
                  "Provide a clear justification with examples",
                  "Acknowledge the value of the other quality briefly"
                ]
              },
              {
                "id": "sp6_t2_q3",
                "question_number": 3,
                "audio_text": "Some people believe all university students should be required to do community service. Others believe it should always be voluntary. What is your opinion?",
                "prompt": "State your opinion on whether community service should be mandatory or voluntary for university students.",
                "speak_seconds": 45,
                "sample_answer": "In my opinion, community service should remain entirely voluntary rather than mandatory. While mandatory service might introduce students to volunteering, forcing participation often dilutes the spirit of altruism and genuine commitment. When students choose to volunteer based on their personal passions and career interests, they are far more likely to be enthusiastic, reliable, and truly invested in making a positive difference in their communities.",
                "key_points": [
                  "Take a clear stand on mandatory versus voluntary service",
                  "Provide logical arguments supporting your view",
                  "Address potential drawbacks of the opposing viewpoint"
                ]
              },
              {
                "id": "sp6_t2_q4",
                "question_number": 4,
                "audio_text": "Finally, how do you think volunteer work benefits not only the community, but also the volunteers themselves?",
                "prompt": "Explain how volunteer work benefits both the community and the volunteers.",
                "speak_seconds": 45,
                "sample_answer": "Volunteer work creates a powerful cycle of mutual benefit. For the community, it provides essential resources, strengthens social bonds, and supports vulnerable populations. For the volunteers, it offers incredible personal growth. It helps individuals develop practical soft skills like communication and teamwork, builds empathy, expands their professional network, and provides a profound sense of purpose and personal fulfillment.",
                "key_points": [
                  "Explain benefits to the community",
                  "Detail personal benefits for the volunteer",
                  "Summarize how the two aspects reinforce each other"
                ]
              }
            ]
          }
        }
      ]
    }
  ]
};

export const speakingPractice07 = {
  "id": "speaking-practice-07",
  "title": "Speaking Practice Test 07 (TOEFL 2026 - Biology Lecture Hall & Movies and Cinema)",
  "skill": "speaking",
  "is_default": true,
  "duration_seconds": 480,
  "description": "Bộ đề luyện thi TOEFL Speaking 2026 chuẩn ETS: Task 1 (Biology Lecture Hall - 7 câu Listen & Repeat), Task 2 (Take an Interview: Movies and Cinema - 4 câu phỏng vấn 45 giây). Hoàn toàn không có thời gian chuẩn bị (No Prep Time).",
  "stages": [
    {
      "id": "sp7_stage_1",
      "title": "Speaking Section (Linear - 8 Mins)",
      "duration_seconds": 480,
      "tasks": [
        {
          "id": "sp7_t1",
          "title": "Task 1: Listen and Repeat (7 câu)",
          "task_type": "listen_and_repeat",
          "content": {
            "instructions": "Bạn sẽ nghe 7 câu nói một lần duy nhất với ngữ cảnh trường học. Ngay sau tiếng bíp, hãy lặp lại chính xác từng từ vừa nghe vào micro trong thời gian quy định (không có thời gian chuẩn bị).",
            "items": [
              {
                "id": "sp7_t1_i1",
                "context": "Biology Lecture Hall Notice 1",
                "audio_text": "Welcome to the biology lecture hall.",
                "word_count": 6,
                "speak_seconds": 8,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp7_t1_i2",
                "context": "Biology Lecture Hall Notice 2",
                "audio_text": "Please silence your phones before class begins.",
                "word_count": 7,
                "speak_seconds": 9,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp7_t1_i3",
                "context": "Biology Lecture Hall Notice 3",
                "audio_text": "All lecture slides will be posted after each session.",
                "word_count": 9,
                "speak_seconds": 11,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp7_t1_i4",
                "context": "Biology Lecture Hall Notice 4",
                "audio_text": "If you have questions, you may ask them during designated times.",
                "word_count": 11,
                "speak_seconds": 14,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp7_t1_i5",
                "context": "Biology Lecture Hall Notice 5",
                "audio_text": "Attendance is recorded automatically through your student ID scan.",
                "word_count": 9,
                "speak_seconds": 11,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp7_t1_i6",
                "context": "Biology Lecture Hall Notice 6",
                "audio_text": "Please avoid blocking the aisles to ensure safe movement in the hall.",
                "word_count": 12,
                "speak_seconds": 14,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp7_t1_i7",
                "context": "Biology Lecture Hall Notice 7",
                "audio_text": "This course introduces key biological concepts that will prepare you for advanced science classes.",
                "word_count": 14,
                "speak_seconds": 14,
                "sample_audio": null,
                "phonetic_guide": null
              }
            ]
          }
        },
        {
          "id": "sp7_t2",
          "title": "Task 2: Take an Interview (4 câu)",
          "task_type": "take_an_interview",
          "content": {
            "topic": "Movies and Cinema",
            "interviewer": {
              "name": "Dr. Interviewer",
              "title": "Interviewer",
              "avatar_initials": "IN"
            },
            "instructions": "Người phỏng vấn sẽ lần lượt đặt 4 câu hỏi về một chủ đề quen thuộc. Sau mỗi câu hỏi, hãy trả lời ngay lập tức trong 45 giây. Hoàn toàn không có thời gian chuẩn bị.",
            "questions": [
              {
                "id": "sp7_t2_q1",
                "question_number": 1,
                "audio_text": "To start, how often do you go to the cinema?",
                "prompt": "Tell the interviewer how often you go to the cinema.",
                "speak_seconds": 45,
                "sample_answer": "I generally go to the cinema about once or twice a month, depending on what new releases are playing. I really enjoy the big screen experience and the sound quality you cannot get at home, so I make it a point to see major blockbuster movies or critically acclaimed films in theaters whenever I have free time on weekends.",
                "key_points": [
                  "Frequency of cinema visits",
                  "Reasons for going to theaters",
                  "Types of movies watched"
                ]
              },
              {
                "id": "sp7_t2_q2",
                "question_number": 2,
                "audio_text": "Could you describe a movie you have watched recently?",
                "prompt": "Describe a movie you have watched recently.",
                "speak_seconds": 45,
                "sample_answer": "Recently, I watched a science fiction thriller called Dune: Part Two. It was an incredible cinematic experience with stunning visual effects and an immersive musical score. The story follows Paul Atreides as he unites with the desert people of Arrakis to seek revenge against the conspirators who destroyed his family, offering deep themes of power, destiny, and survival.",
                "key_points": [
                  "Name of the movie",
                  "Genre and plot summary",
                  "Personal impression or highlights"
                ]
              },
              {
                "id": "sp7_t2_q3",
                "question_number": 3,
                "audio_text": "Which do you prefer, watching movies at the cinema or at home? Why?",
                "prompt": "Explain whether you prefer watching movies at the cinema or at home and give reasons.",
                "speak_seconds": 45,
                "sample_answer": "I prefer watching movies at the cinema because of the immersive atmosphere, superior picture quality, and massive screen. Unlike watching at home, where distractions are everywhere, the theater allows me to completely focus on the film without interruptions, making the storytelling much more engaging and memorable.",
                "key_points": [
                  "State preference clearly",
                  "Compare cinema vs home viewing",
                  "Provide supporting reasons"
                ]
              },
              {
                "id": "sp7_t2_q4",
                "question_number": 4,
                "audio_text": "Finally, do you think watching movies at the cinema will continue to be popular in the future? Why or why not?",
                "prompt": "Share your opinion on whether cinema viewing will remain popular in the future and why.",
                "speak_seconds": 45,
                "sample_answer": "Yes, I believe going to the cinema will remain popular in the future because it is not just about watching a film, it is a social activity and an outing experience. While streaming services offer convenience at home, they cannot replicate the shared emotional energy of a live audience and the scale of a theatrical presentation.",
                "key_points": [
                  "State future outlook",
                  "Discuss competition from streaming",
                  "Highlight unique value of cinemas"
                ]
              }
            ]
          }
        }
      ]
    }
  ]
};

export const speakingPractice08 = {
  "id": "speaking-practice-08",
  "title": "Speaking Practice Test 08 (TOEFL 2026 - Campus Bookstore orientation & Travel Preferences and Habits)",
  "skill": "speaking",
  "is_default": true,
  "duration_seconds": 480,
  "description": "Bộ đề luyện thi TOEFL Speaking 2026 chuẩn ETS: Task 1 (Campus Bookstore orientation - 7 câu Listen & Repeat), Task 2 (Take an Interview: Travel Preferences and Habits - 4 câu phỏng vấn 45 giây). Hoàn toàn không có thời gian chuẩn bị (No Prep Time).",
  "stages": [
    {
      "id": "sp8_stage_1",
      "title": "Speaking Section (Linear - 8 Mins)",
      "duration_seconds": 480,
      "tasks": [
        {
          "id": "sp8_t1",
          "title": "Task 1: Listen and Repeat (7 câu)",
          "task_type": "listen_and_repeat",
          "content": {
            "instructions": "Bạn sẽ nghe 7 câu nói một lần duy nhất với ngữ cảnh trường học. Ngay sau tiếng bíp, hãy lặp lại chính xác từng từ vừa nghe vào micro trong thời gian quy định (không có thời gian chuẩn bị).",
            "items": [
              {
                "id": "sp8_t1_i1",
                "context": "Campus Bookstore orientation Notice 1",
                "audio_text": "Welcome to the campus bookstore.",
                "word_count": 5,
                "speak_seconds": 8,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp8_t1_i2",
                "context": "Campus Bookstore orientation Notice 2",
                "audio_text": "School supplies are displayed near the front checkout counter.",
                "word_count": 9,
                "speak_seconds": 11,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp8_t1_i3",
                "context": "Campus Bookstore orientation Notice 3",
                "audio_text": "University merchandise is located in the back section.",
                "word_count": 8,
                "speak_seconds": 10,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp8_t1_i4",
                "context": "Campus Bookstore orientation Notice 4",
                "audio_text": "Required textbooks are organized by course number for easy searching.",
                "word_count": 10,
                "speak_seconds": 13,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp8_t1_i5",
                "context": "Campus Bookstore orientation Notice 5",
                "audio_text": "Students can order unavailable textbooks online through the bookstore website.",
                "word_count": 10,
                "speak_seconds": 13,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp8_t1_i6",
                "context": "Campus Bookstore orientation Notice 6",
                "audio_text": "Staff members are available to assist students in locating required materials.",
                "word_count": 11,
                "speak_seconds": 14,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp8_t1_i7",
                "context": "Campus Bookstore orientation Notice 7",
                "audio_text": "Receipts must be presented for all returns or exchanges within the bookstore policy period.",
                "word_count": 14,
                "speak_seconds": 14,
                "sample_audio": null,
                "phonetic_guide": null
              }
            ]
          }
        },
        {
          "id": "sp8_t2",
          "title": "Task 2: Take an Interview (4 câu)",
          "task_type": "take_an_interview",
          "content": {
            "topic": "Travel Preferences and Habits",
            "interviewer": {
              "name": "Dr. Lead",
              "title": "Lead Researcher",
              "avatar_initials": "LE"
            },
            "instructions": "Người phỏng vấn sẽ lần lượt đặt 4 câu hỏi về một chủ đề quen thuộc. Sau mỗi câu hỏi, hãy trả lời ngay lập tức trong 45 giây. Hoàn toàn không có thời gian chuẩn bị.",
            "questions": [
              {
                "id": "sp8_t2_q1",
                "question_number": 1,
                "audio_text": "Thank you for speaking with me today. I'm studying people's travel habits. First, how often do you travel, and what kinds of places do you usually like to visit?",
                "prompt": "Tell the researcher how often you travel and what kinds of places you like to visit.",
                "speak_seconds": 45,
                "sample_answer": "I typically travel two or three times a year, mostly during university breaks. I prefer visiting historical cities and cultural hubs because I love exploring museums, architecture, and local cuisine. Occasionally, I also enjoy nature trips like hiking in the mountains to unwind from my studies.",
                "key_points": [
                  "Frequency of travel",
                  "Types of places visited",
                  "Reasons for preference"
                ]
              },
              {
                "id": "sp8_t2_q2",
                "question_number": 2,
                "audio_text": "Great. Many people say traveling helps them learn about different cultures. What do you think people gain from traveling?",
                "prompt": "Explain what people gain from traveling according to your opinion.",
                "speak_seconds": 45,
                "sample_answer": "I believe traveling offers immense personal growth. It broadens our worldview by exposing us to diverse lifestyles, traditions, and perspectives that we wouldn't encounter in our hometowns. It also fosters empathy, adaptability, and independence as we navigate unfamiliar environments and communicate with people from different backgrounds.",
                "key_points": [
                  "Broadening worldview",
                  "Experiencing new traditions",
                  "Developing independence and adaptability"
                ]
              },
              {
                "id": "sp8_t2_q3",
                "question_number": 3,
                "audio_text": "Some people prefer carefully planned trips, while others prefer spontaneous travel. Which do you prefer, and why?",
                "prompt": "State whether you prefer planned or spontaneous travel and explain why.",
                "speak_seconds": 45,
                "sample_answer": "I definitely prefer carefully planned trips. Having a well-researched itinerary helps me make the most of my time and budget, ensuring I don't miss major attractions or logistics. While spontaneity can be exciting, planning reduces stress and gives me peace of mind, especially when traveling to foreign countries.",
                "key_points": [
                  "Preference for planned vs. spontaneous",
                  "Maximizing time and budget",
                  "Reducing stress and uncertainty"
                ]
              },
              {
                "id": "sp8_t2_q4",
                "question_number": 4,
                "audio_text": "Looking ahead, what is one destination you would love to visit in the future, and what would you want to do there?",
                "prompt": "Describe a future destination you want to visit and what you would do there.",
                "speak_seconds": 45,
                "sample_answer": "One destination at the top of my bucket list is Japan. If I get the chance to visit, I would love to explore the historic temples of Kyoto, experience the modern technology and vibrant culture of Tokyo, and try authentic local dishes like ramen and sushi. It has always seemed like a fascinating blend of ancient tradition and futuristic innovation.",
                "key_points": [
                  "Chosen destination",
                  "Specific activities planned",
                  "Reasons for choosing the destination"
                ]
              }
            ]
          }
        }
      ]
    }
  ]
};

export const speakingPractice09 = {
  "id": "speaking-practice-09",
  "title": "Speaking Practice Test 09 (TOEFL 2026 - University Advising Center & Student Studying Habits and Learning Strategies)",
  "skill": "speaking",
  "is_default": true,
  "duration_seconds": 480,
  "description": "Bộ đề luyện thi TOEFL Speaking 2026 chuẩn ETS: Task 1 (University Advising Center - 7 câu Listen & Repeat), Task 2 (Take an Interview: Student Studying Habits and Learning Strategies - 4 câu phỏng vấn 45 giây). Hoàn toàn không có thời gian chuẩn bị (No Prep Time).",
  "stages": [
    {
      "id": "sp9_stage_1",
      "title": "Speaking Section (Linear - 8 Mins)",
      "duration_seconds": 480,
      "tasks": [
        {
          "id": "sp9_t1",
          "title": "Task 1: Listen and Repeat (7 câu)",
          "task_type": "listen_and_repeat",
          "content": {
            "instructions": "Bạn sẽ nghe 7 câu nói một lần duy nhất với ngữ cảnh trường học. Ngay sau tiếng bíp, hãy lặp lại chính xác từng từ vừa nghe vào micro trong thời gian quy định (không có thời gian chuẩn bị).",
            "items": [
              {
                "id": "sp9_t1_i1",
                "context": "University Advising Center Notice 1",
                "audio_text": "Welcome to the advising center.",
                "word_count": 5,
                "speak_seconds": 8,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp9_t1_i2",
                "context": "University Advising Center Notice 2",
                "audio_text": "Appointment check-in is completed at the reception desk.",
                "word_count": 8,
                "speak_seconds": 10,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp9_t1_i3",
                "context": "University Advising Center Notice 3",
                "audio_text": "Academic advisors help students plan schedules and choose courses.",
                "word_count": 9,
                "speak_seconds": 11,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp9_t1_i4",
                "context": "University Advising Center Notice 4",
                "audio_text": "Career development resources are available in the resource room.",
                "word_count": 9,
                "speak_seconds": 11,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp9_t1_i5",
                "context": "University Advising Center Notice 5",
                "audio_text": "Workshops covering academic success strategies are offered regularly.",
                "word_count": 8,
                "speak_seconds": 10,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp9_t1_i6",
                "context": "University Advising Center Notice 6",
                "audio_text": "Walk-in advising services are provided during limited hours for urgent concerns.",
                "word_count": 11,
                "speak_seconds": 14,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp9_t1_i7",
                "context": "University Advising Center Notice 7",
                "audio_text": "Please arrive early for scheduled appointments to allow adequate preparation time.",
                "word_count": 11,
                "speak_seconds": 14,
                "sample_audio": null,
                "phonetic_guide": null
              }
            ]
          }
        },
        {
          "id": "sp9_t2",
          "title": "Task 2: Take an Interview (4 câu)",
          "task_type": "take_an_interview",
          "content": {
            "topic": "Student Studying Habits and Learning Strategies",
            "interviewer": {
              "name": "Dr. University",
              "title": "University Researcher",
              "avatar_initials": "UN"
            },
            "instructions": "Người phỏng vấn sẽ lần lượt đặt 4 câu hỏi về một chủ đề quen thuộc. Sau mỗi câu hỏi, hãy trả lời ngay lập tức trong 45 giây. Hoàn toàn không có thời gian chuẩn bị.",
            "questions": [
              {
                "id": "sp9_t2_q1",
                "question_number": 1,
                "audio_text": "First, how many hours do you usually study each week and where do you prefer to study?",
                "prompt": "Tell the interviewer how many hours you study each week and where you prefer to study.",
                "speak_seconds": 45,
                "sample_answer": "I typically study about twenty to twenty-five hours each week, depending on my course load. I usually prefer studying in the quiet study rooms on the third floor of the university library because it provides a distraction-free environment and access to reference materials. Sometimes, when I need to collaborate on group projects, I study in the student union or a coffee shop, but for independent deep work, the library is definitely my go-to spot.",
                "key_points": [
                  "State weekly study hours (e.g., 20-25 hours)",
                  "Specify preferred study location (e.g., library quiet rooms)",
                  "Explain the reasons for choosing that location"
                ]
              },
              {
                "id": "sp9_t2_q2",
                "question_number": 2,
                "audio_text": "Students often use different strategies to learn effectively and memorize information more quickly. What study methods work best for you and why?",
                "prompt": "Describe the study methods that work best for you and explain why they are effective.",
                "speak_seconds": 45,
                "sample_answer": "The study methods that work best for me are active recall and spaced repetition. Instead of just rereading textbooks, I create flashcards using apps like Anki and test myself regularly. This forces my brain to retrieve information actively, which significantly improves long-term retention. Additionally, I use the Pomodoro technique—studying in focused twenty-five-minute blocks with short breaks—to maintain high concentration levels and prevent mental fatigue throughout long study sessions.",
                "key_points": [
                  "Mention specific methods like active recall or spaced repetition",
                  "Explain how the methods are applied (e.g., flashcards, self-testing)",
                  "Discuss the benefits for memory retention and focus"
                ]
              },
              {
                "id": "sp9_t2_q3",
                "question_number": 3,
                "audio_text": "Okay. Some students prefer studying early in the morning, while others study in the evenings. Which do you think is more effective and why?",
                "prompt": "Discuss whether studying in the morning or evening is more effective and give your reasons.",
                "speak_seconds": 45,
                "sample_answer": "In my opinion, studying early in the morning is far more effective. After a good night's sleep, my mind is completely refreshed, and there are fewer distractions and interruptions compared to later in the day. Morning study sessions help me absorb complex material much faster and retain information longer. While some night owls claim they are more creative at night, I find that my cognitive stamina is highest right after breakfast, leading to much more productive study hours.",
                "key_points": [
                  "State preference (early morning vs. evening)",
                  "Give reasons related to alertness, energy, and lack of distractions",
                  "Acknowledge other perspectives while supporting your choice"
                ]
              },
              {
                "id": "sp9_t2_q4",
                "question_number": 4,
                "audio_text": "Good points. Finally, some universities encourage students to attend workshops about study skills. Do you think these programs are useful? Why or why not?",
                "prompt": "State whether you think university study skills workshops are useful and explain why or why not.",
                "speak_seconds": 45,
                "sample_answer": "Yes, I believe university study skills workshops are extremely useful, especially for incoming freshmen who are transitioning from high school to higher education. These programs teach practical techniques like time management, effective note-taking, and stress management, which students might not figure out on their own. Even for senior students, attending refresher workshops can introduce new digital productivity tools and advanced research strategies that enhance overall academic performance.",
                "key_points": [
                  "Give a clear opinion on the usefulness of study skills workshops",
                  "Provide examples of skills taught (time management, note-taking)",
                  "Explain benefits for different student groups (freshmen and seniors)"
                ]
              }
            ]
          }
        }
      ]
    }
  ]
};

export const speakingPractice10 = {
  "id": "speaking-practice-10",
  "title": "Speaking Practice Test 10 (TOEFL 2026 - Academic Integrity and Writing Center Guidance & Food Habits and Nutrition)",
  "skill": "speaking",
  "is_default": true,
  "duration_seconds": 480,
  "description": "Bộ đề luyện thi TOEFL Speaking 2026 chuẩn ETS: Task 1 (Academic Integrity and Writing Center Guidance - 7 câu Listen & Repeat), Task 2 (Take an Interview: Food Habits and Nutrition - 4 câu phỏng vấn 45 giây). Hoàn toàn không có thời gian chuẩn bị (No Prep Time).",
  "stages": [
    {
      "id": "sp10_stage_1",
      "title": "Speaking Section (Linear - 8 Mins)",
      "duration_seconds": 480,
      "tasks": [
        {
          "id": "sp10_t1",
          "title": "Task 1: Listen and Repeat (7 câu)",
          "task_type": "listen_and_repeat",
          "content": {
            "instructions": "Bạn sẽ nghe 7 câu nói một lần duy nhất với ngữ cảnh trường học. Ngay sau tiếng bíp, hãy lặp lại chính xác từng từ vừa nghe vào micro trong thời gian quy định (không có thời gian chuẩn bị).",
            "items": [
              {
                "id": "sp10_t1_i1",
                "context": "Academic Integrity and Writing Center Guidance Notice 1",
                "audio_text": "All written work must be original.",
                "word_count": 6,
                "speak_seconds": 8,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp10_t1_i2",
                "context": "Academic Integrity and Writing Center Guidance Notice 2",
                "audio_text": "Sources must be cited using the required format.",
                "word_count": 8,
                "speak_seconds": 10,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp10_t1_i3",
                "context": "Academic Integrity and Writing Center Guidance Notice 3",
                "audio_text": "Copying text without giving credit is considered plagiarism.",
                "word_count": 8,
                "speak_seconds": 10,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp10_t1_i4",
                "context": "Academic Integrity and Writing Center Guidance Notice 4",
                "audio_text": "Violations of academic integrity rules may result in serious consequences.",
                "word_count": 10,
                "speak_seconds": 13,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp10_t1_i5",
                "context": "Academic Integrity and Writing Center Guidance Notice 5",
                "audio_text": "The writing center can teach you techniques to paraphrase sources correctly.",
                "word_count": 11,
                "speak_seconds": 14,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp10_t1_i6",
                "context": "Academic Integrity and Writing Center Guidance Notice 6",
                "audio_text": "Online tools can help you check whether your citations follow the correct format.",
                "word_count": 13,
                "speak_seconds": 14,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp10_t1_i7",
                "context": "Academic Integrity and Writing Center Guidance Notice 7",
                "audio_text": "Collaboration is allowed only when the professor clearly permits students to work together.",
                "word_count": 13,
                "speak_seconds": 14,
                "sample_audio": null,
                "phonetic_guide": null
              }
            ]
          }
        },
        {
          "id": "sp10_t2",
          "title": "Task 2: Take an Interview (4 câu)",
          "task_type": "take_an_interview",
          "content": {
            "topic": "Food Habits and Nutrition",
            "interviewer": {
              "name": "Dr. Research",
              "title": "Research Study Coordinator",
              "avatar_initials": "RE"
            },
            "instructions": "Người phỏng vấn sẽ lần lượt đặt 4 câu hỏi về một chủ đề quen thuộc. Sau mỗi câu hỏi, hãy trả lời ngay lập tức trong 45 giây. Hoàn toàn không có thời gian chuẩn bị.",
            "questions": [
              {
                "id": "sp10_t2_q1",
                "question_number": 1,
                "audio_text": "Thank you for participating today. I'm studying people's eating habits. First, what kinds of food do you usually eat during a typical day?",
                "prompt": "Tell the interviewer what kinds of food you usually eat during a typical day.",
                "speak_seconds": 45,
                "sample_answer": "During a typical day, I usually eat a balanced diet that includes a mix of carbohydrates, proteins, and vegetables. For breakfast, I often have oatmeal with fruit or eggs with whole-wheat toast. Lunch is usually a turkey sandwich or a salad with chicken, and dinner consists of rice or pasta with vegetables and a protein like fish or tofu.",
                "key_points": [
                  "Balanced diet overview",
                  "Specific meal examples (breakfast, lunch, dinner)",
                  "Inclusion of different food groups"
                ]
              },
              {
                "id": "sp10_t2_q2",
                "question_number": 2,
                "audio_text": "I see. Some people cook most of their meals at home, while others prefer eating at restaurants or ordering food. What do you usually do? Why?",
                "prompt": "Explain whether you usually cook meals at home or eat at restaurants/order food, and state why.",
                "speak_seconds": 45,
                "sample_answer": "I generally prefer cooking my meals at home because it is much healthier and more cost-effective. When I cook, I have total control over the ingredients, reducing oil, salt, and sugar. Additionally, preparing meals is a relaxing way for me to unwind after a busy day of studying, whereas eating out is usually reserved for social gatherings with friends.",
                "key_points": [
                  "Personal preference (cooking at home)",
                  "Reasons (health benefits, cost savings)",
                  "Contrast with eating out"
                ]
              },
              {
                "id": "sp10_t2_q3",
                "question_number": 3,
                "audio_text": "Good points. Many people are becoming more concerned about healthy eating. How important is healthy food in your daily life?",
                "prompt": "Discuss how important healthy food is in your daily life and why.",
                "speak_seconds": 45,
                "sample_answer": "Healthy food is extremely important in my daily life because it directly affects my energy levels, concentration, and long-term well-being. Eating nutritious meals helps me stay focused during lectures and gives me the stamina needed for physical activities. I make a conscious effort to include fresh fruits, vegetables, and lean proteins in every meal to maintain my health.",
                "key_points": [
                  "High importance of healthy food",
                  "Impact on energy and focus",
                  "Conscious dietary choices"
                ]
              },
              {
                "id": "sp10_t2_q4",
                "question_number": 4,
                "audio_text": "Thank you. Finally, some experts believe schools should teach students more about nutrition and healthy eating. Do you agree or disagree? Why?",
                "prompt": "State whether you agree or disagree that schools should teach students more about nutrition and healthy eating, and explain why.",
                "speak_seconds": 45,
                "sample_answer": "I strongly agree that schools should teach students more about nutrition and healthy eating. Educating young people early on helps them build lifelong healthy habits and prevents diet-related health issues later in life. If students learn how to read nutrition labels and understand balanced diets, they can make informed choices both inside and outside the school environment.",
                "key_points": [
                  "Strong agreement with the statement",
                  "Long-term benefits of early education",
                  "Practical skills like reading labels"
                ]
              }
            ]
          }
        }
      ]
    }
  ]
};

export const speakingPractice11 = {
  "id": "speaking-practice-11",
  "title": "Speaking Practice Test 11 (TOEFL 2026 - University Computer Center & Free Time Activities)",
  "skill": "speaking",
  "is_default": true,
  "duration_seconds": 480,
  "description": "Bộ đề luyện thi TOEFL Speaking 2026 chuẩn ETS: Task 1 (University Computer Center - 7 câu Listen & Repeat), Task 2 (Take an Interview: Free Time Activities - 4 câu phỏng vấn 45 giây). Hoàn toàn không có thời gian chuẩn bị (No Prep Time).",
  "stages": [
    {
      "id": "sp11_stage_1",
      "title": "Speaking Section (Linear - 8 Mins)",
      "duration_seconds": 480,
      "tasks": [
        {
          "id": "sp11_t1",
          "title": "Task 1: Listen and Repeat (7 câu)",
          "task_type": "listen_and_repeat",
          "content": {
            "instructions": "Bạn sẽ nghe 7 câu nói một lần duy nhất với ngữ cảnh trường học. Ngay sau tiếng bíp, hãy lặp lại chính xác từng từ vừa nghe vào micro trong thời gian quy định (không có thời gian chuẩn bị).",
            "items": [
              {
                "id": "sp11_t1_i1",
                "context": "University Computer Center Notice 1",
                "audio_text": "Welcome to the computer center.",
                "word_count": 5,
                "speak_seconds": 8,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp11_t1_i2",
                "context": "University Computer Center Notice 2",
                "audio_text": "Workstations are available during operating hours.",
                "word_count": 6,
                "speak_seconds": 8,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp11_t1_i3",
                "context": "University Computer Center Notice 3",
                "audio_text": "Printing and scanning services are located near the back wall.",
                "word_count": 10,
                "speak_seconds": 13,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp11_t1_i4",
                "context": "University Computer Center Notice 4",
                "audio_text": "Technical support staff can assist students with hardware or software issues.",
                "word_count": 11,
                "speak_seconds": 14,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp11_t1_i5",
                "context": "University Computer Center Notice 5",
                "audio_text": "Headphones must be used to avoid disturbing others nearby.",
                "word_count": 9,
                "speak_seconds": 11,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp11_t1_i6",
                "context": "University Computer Center Notice 6",
                "audio_text": "Important files should be saved to personal storage devices before logging out.",
                "word_count": 12,
                "speak_seconds": 14,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp11_t1_i7",
                "context": "University Computer Center Notice 7",
                "audio_text": "Please remember to log out completely before leaving your workstation.",
                "word_count": 10,
                "speak_seconds": 13,
                "sample_audio": null,
                "phonetic_guide": null
              }
            ]
          }
        },
        {
          "id": "sp11_t2",
          "title": "Task 2: Take an Interview (4 câu)",
          "task_type": "take_an_interview",
          "content": {
            "topic": "Free Time Activities",
            "interviewer": {
              "name": "Dr. University",
              "title": "University Researcher",
              "avatar_initials": "UN"
            },
            "instructions": "Người phỏng vấn sẽ lần lượt đặt 4 câu hỏi về một chủ đề quen thuộc. Sau mỗi câu hỏi, hãy trả lời ngay lập tức trong 45 giây. Hoàn toàn không có thời gian chuẩn bị.",
            "questions": [
              {
                "id": "sp11_t2_q1",
                "question_number": 1,
                "audio_text": "First, what activities do you usually do in your free time?",
                "prompt": "Tell the researcher what activities you usually do in your free time.",
                "speak_seconds": 45,
                "sample_answer": "In my free time, I enjoy doing a variety of activities to relax and unwind after a busy week of studying. Most of the time, I like to read books, especially fiction and biographies, because they help me escape into different worlds. Additionally, I make sure to stay active by going for a jog in the park or visiting the gym at least three times a week. When I want to spend time with friends, we often play board games or try out new local restaurants together.",
                "key_points": [
                  "Reading fiction and biographies",
                  "Staying active through jogging and gym workouts",
                  "Socializing with friends via board games and dining out"
                ]
              },
              {
                "id": "sp11_t2_q2",
                "question_number": 2,
                "audio_text": "Interesting. Free time activities can help people relax and reduce stress. Which activities help you relax the most? Why?",
                "prompt": "Explain which free-time activity helps you relax the most and give reasons why.",
                "speak_seconds": 45,
                "sample_answer": "The activity that helps me relax the most is listening to instrumental music while sketching. When I sit down with my sketchbook and put on some calm, acoustic melodies, I completely lose track of time. It allows me to express my creativity without any pressure or academic deadlines. Focusing on the lines and shading takes my mind completely off daily stressors and brings a deep sense of calm and mental clarity.",
                "key_points": [
                  "Listening to instrumental music and sketching",
                  "Expressing creativity without pressure",
                  "Escaping daily stressors and achieving mental clarity"
                ]
              },
              {
                "id": "sp11_t2_q3",
                "question_number": 3,
                "audio_text": "Okay. Some people prefer spending their free time alone, while others prefer social activities with friends. What do you prefer? Why?",
                "prompt": "State whether you prefer spending free time alone or with friends and explain why.",
                "speak_seconds": 45,
                "sample_answer": "I actually prefer a healthy balance of both, but if I had to choose one, I lean slightly toward spending time alone. As a student, my schedule is constantly filled with group projects, lectures, and social interactions. Having dedicated solo time allows me to recharge my social battery, reflect on my personal goals, and enjoy quiet hobbies like reading or listening to podcasts without any external distractions.",
                "key_points": [
                  "Preferring a balance, but leaning toward alone time",
                  "Recharging from a busy academic schedule",
                  "Reflecting on personal goals and enjoying quiet hobbies"
                ]
              },
              {
                "id": "sp11_t2_q4",
                "question_number": 4,
                "audio_text": "Good point. Finally, some experts believe people should spend more time on hobbies instead of passive activities like watching television. Do you agree or disagree? Why?",
                "prompt": "State whether you agree or disagree that people should spend more time on hobbies instead of passive activities like watching TV, and explain why.",
                "speak_seconds": 45,
                "sample_answer": "I strongly agree with that perspective. While watching television can be an easy way to unwind, it is a passive activity that doesn't actively stimulate the brain or foster personal growth. On the other hand, pursuing active hobbies like learning a musical instrument, painting, or gardening requires focus and skill development. These activities provide a greater sense of accomplishment and contribute much more positively to mental well-being over the long term.",
                "key_points": [
                  "Strong agreement with the statement",
                  "Contasting passive TV watching with active skill development",
                  "Achieving a greater sense of accomplishment and mental well-being"
                ]
              }
            ]
          }
        }
      ]
    }
  ]
};

export const speakingPractice12 = {
  "id": "speaking-practice-12",
  "title": "Speaking Practice Test 12 (TOEFL 2026 - University Career Services Center & Campus Internships & Career Preparedness)",
  "skill": "speaking",
  "is_default": true,
  "duration_seconds": 480,
  "description": "Bộ đề luyện thi TOEFL Speaking 2026 chuẩn ETS: Task 1 (University Career Services Center - 7 câu Listen & Repeat), Task 2 (Take an Interview: Campus Internships & Career Preparedness - 4 câu phỏng vấn 45 giây). Hoàn toàn không có thời gian chuẩn bị (No Prep Time).",
  "stages": [
    {
      "id": "sp12_stage_1",
      "title": "Speaking Section (Linear - 8 Mins)",
      "duration_seconds": 480,
      "tasks": [
        {
          "id": "sp12_t1",
          "title": "Task 1: Listen and Repeat (7 câu)",
          "task_type": "listen_and_repeat",
          "content": {
            "instructions": "Bạn sẽ nghe 7 câu nói một lần duy nhất với ngữ cảnh trường học. Ngay sau tiếng bíp, hãy lặp lại chính xác từng từ vừa nghe vào micro trong thời gian quy định (không có thời gian chuẩn bị).",
            "items": [
              {
                "id": "sp12_t1_i1",
                "context": "University Career Services Center Notice 1",
                "audio_text": "Welcome to the university career development center.",
                "word_count": 7,
                "speak_seconds": 9,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp12_t1_i2",
                "context": "University Career Services Center Notice 2",
                "audio_text": "Career advisors provide personalized feedback on student resumes.",
                "word_count": 8,
                "speak_seconds": 10,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp12_t1_i3",
                "context": "University Career Services Center Notice 3",
                "audio_text": "The annual spring internship fair takes place next Thursday.",
                "word_count": 9,
                "speak_seconds": 11,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp12_t1_i4",
                "context": "University Career Services Center Notice 4",
                "audio_text": "Professional dress is recommended for all networking events.",
                "word_count": 8,
                "speak_seconds": 10,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp12_t1_i5",
                "context": "University Career Services Center Notice 5",
                "audio_text": "Students should bring several printed copies of their CV.",
                "word_count": 9,
                "speak_seconds": 11,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp12_t1_i6",
                "context": "University Career Services Center Notice 6",
                "audio_text": "Mock interview sessions can be booked through the student portal.",
                "word_count": 10,
                "speak_seconds": 13,
                "sample_audio": null,
                "phonetic_guide": null
              },
              {
                "id": "sp12_t1_i7",
                "context": "University Career Services Center Notice 7",
                "audio_text": "Connecting with alumni provides valuable insights into industry trends.",
                "word_count": 9,
                "speak_seconds": 11,
                "sample_audio": null,
                "phonetic_guide": null
              }
            ]
          }
        },
        {
          "id": "sp12_t2",
          "title": "Task 2: Take an Interview (4 câu)",
          "task_type": "take_an_interview",
          "content": {
            "topic": "Campus Internships & Career Preparedness",
            "interviewer": {
              "name": "Dr. Career",
              "title": "Career Development Director",
              "avatar_initials": "CA"
            },
            "instructions": "Người phỏng vấn sẽ lần lượt đặt 4 câu hỏi về một chủ đề quen thuộc. Sau mỗi câu hỏi, hãy trả lời ngay lập tức trong 45 giây. Hoàn toàn không có thời gian chuẩn bị.",
            "questions": [
              {
                "id": "sp12_t2_q1",
                "question_number": 1,
                "audio_text": "To begin our conversation today, could you tell me about what career field or industry you are most interested in pursuing after graduation, and why?",
                "prompt": "Tell the interviewer what career field you want to pursue and why:",
                "speak_seconds": 45,
                "sample_answer": "After graduation, I aspire to pursue a career in software development and data analytics. I have always been fascinated by how technology can solve real-world logistical problems and improve daily convenience. During my coursework, analyzing complex datasets and building web applications has shown me how fulfilling it is to create digital tools that help people.",
                "key_points": [
                  "Nêu rõ ngành nghề hoặc lĩnh vực quan tâm sau khi tốt nghiệp",
                  "Giải thích lý do yêu thích và truyền cảm hứng",
                  "Đưa ra ví dụ môn học hoặc dự án thực tế đã từng làm"
                ]
              },
              {
                "id": "sp12_t2_q2",
                "question_number": 2,
                "audio_text": "In your opinion, is it more important for university students to focus primarily on achieving high academic grades or on gaining practical internship experience, and why?",
                "prompt": "Compare the importance of high grades versus internship experience:",
                "speak_seconds": 45,
                "sample_answer": "In my opinion, gaining practical internship experience is considerably more important than solely focusing on top grades. While high marks demonstrate discipline, internships teach indispensable workplace abilities like cross-functional collaboration, client communication, and navigating deadlines. Employers today prioritize candidates who have already demonstrated problem-solving in real business environments.",
                "key_points": [
                  "Chọn quan điểm rõ ràng (kinh nghiệm thực tập quan trọng hơn)",
                  "Nêu các kỹ năng mềm chỉ có được từ môi trường làm việc thực tế",
                  "Giải thích góc nhìn từ nhà tuyển dụng khi chọn ứng viên"
                ]
              },
              {
                "id": "sp12_t2_q3",
                "question_number": 3,
                "audio_text": "Some universities require all undergraduate students to complete an internship before they can graduate. Do you agree or disagree with this graduation requirement, and why?",
                "prompt": "Explain whether universities should require internships for graduation:",
                "speak_seconds": 45,
                "sample_answer": "I strongly agree with making internships mandatory for graduation. Many students struggle to transition from academic theory into the corporate world because they lack exposure to professional workflows. A required internship bridges this gap, ensuring that every graduate enters the job market with hands-on credentials, professional references, and a clear understanding of workplace expectations.",
                "key_points": [
                  "Bày tỏ sự đồng thuận với chính sách thực tập bắt buộc",
                  "Phân tích khoảng cách giữa lý thuyết học đường và thực tế công việc",
                  "Nêu lợi ích thiết thực: thư giới thiệu, mạng lưới quan hệ và sự tự tin"
                ]
              },
              {
                "id": "sp12_t2_q4",
                "question_number": 4,
                "audio_text": "Finally, looking ahead to the future, what skills or personal qualities do you believe will be most crucial for young graduates to succeed in the modern workplace over the next decade?",
                "prompt": "Identify crucial skills for future workplace success:",
                "speak_seconds": 45,
                "sample_answer": "Looking ahead, I believe adaptability and digital literacy will be the two most critical qualities. As automation and artificial intelligence transform industries rapidly, specific technical tools may become obsolete. Consequently, professionals who can continuously teach themselves new software, embrace change with resilience, and communicate effectively across multicultural teams will thrive.",
                "key_points": [
                  "Xác định 2 phẩm chất then chốt (khả năng thích ứng & hiểu biết công nghệ)",
                  "Đề cập đến xu hướng chuyển đổi số và trí tuệ nhân tạo",
                  "Nhấn mạnh tinh thần học tập suốt đời (lifelong learning)"
                ]
              }
            ]
          }
        }
      ]
    }
  ]
};

export const ALL_SPEAKING_PRACTICE_TESTS = [
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
];
