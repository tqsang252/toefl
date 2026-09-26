/**
 * BẢNG 25 PATTERN CẤU TRÚC CÂU CHUẨN TOEFL WRITING TASK 1 (BUILD A SENTENCE)
 * Bảng tra cứu, công thức, ví dụ và từ khóa nhận diện
 */

export const TOEFL_SENTENCE_PATTERNS = [
  {
    id: 1,
    pattern: "Basic statement",
    category: "Cơ bản",
    formula: "S + V + O/C",
    example: "the committee approved the proposal",
    desc: "Cấu trúc chủ vị cơ bản nhất: Chủ ngữ (S) + Động từ (V) + Tân ngữ (O) hoặc Bổ ngữ (C).",
    keywords: ["approved", "completed", "supported", "submitted", "received", "announced"]
  },
  {
    id: 2,
    pattern: "Modal verb",
    category: "Trợ động từ",
    formula: "S + modal + V",
    example: "students must submit the form online",
    desc: "Động từ khuyết thiếu (can, could, must, should, will, would, might) đi liền với động từ nguyên mẫu không 'to'.",
    keywords: ["must", "should", "could", "would", "might", "can", "will"]
  },
  {
    id: 3,
    pattern: "Perfect tense",
    category: "Thì hoàn thành",
    formula: "S + have/has/had + V3",
    example: "the researchers had completed the analysis",
    desc: "Thì Hiện tại hoàn thành hoặc Quá khứ hoàn thành diễn tả hành động hoàn tất trước một thời điểm.",
    keywords: ["have", "has", "had"]
  },
  {
    id: 4,
    pattern: "Passive voice",
    category: "Thể bị động",
    formula: "S + be + V3",
    example: "the results were published recently",
    desc: "Thể bị động tiêu chuẩn: Chủ ngữ nhận tác động của hành động (am/is/are/was/were/been + V3/ed).",
    keywords: ["was", "were", "is", "are", "been"]
  },
  {
    id: 5,
    pattern: "Modal passive",
    category: "Thể bị động",
    formula: "S + modal + be + V3",
    example: "the form must be submitted online",
    desc: "Thể bị động với động từ khuyết thiếu: modal (must, should, can, will) + be + V3/ed.",
    keywords: ["must be", "should be", "can be", "will be", "could be"]
  },
  {
    id: 6,
    pattern: "Perfect passive",
    category: "Thể bị động",
    formula: "S + have/has/had + been + V3",
    example: "the samples have been analyzed",
    desc: "Thể bị động ở các thì hoàn thành: have/has/had + been + V3/ed.",
    keywords: ["have been", "has been", "had been"]
  },
  {
    id: 7,
    pattern: "Verb + infinitive",
    category: "Động từ đi kèm",
    formula: "S + V + to + V",
    example: "the team decided to repeat the experiment",
    desc: "Động từ chính đi trực tiếp với to-infinitive (decide, plan, hope, fail, aim, tend, intend to V).",
    keywords: ["decided to", "plans to", "hopes to", "failed to", "aims to", "agreed to", "attempted to"]
  },
  {
    id: 8,
    pattern: "Verb + object + infinitive",
    category: "Động từ đi kèm",
    formula: "S + V + O + to + V",
    example: "the professor encouraged students to participate",
    desc: "Động từ tác động lên tân ngữ thực hiện hành động: advise/encourage/remind/allow/require someone to V.",
    keywords: ["encouraged", "advised", "reminded", "allowed", "required", "told", "urged", "warned"]
  },
  {
    id: 9,
    pattern: "Gerund subject",
    category: "Danh động từ",
    formula: "V-ing + ... + singular V",
    example: "analyzing complex data requires patience",
    desc: "Danh động từ (V-ing) đứng đầu câu đóng vai trò chủ ngữ số ít, động từ vị ngữ chia ở dạng số ít (s/es/is/was).",
    keywords: ["analyzing", "studying", "implementing", "developing", "learning", "reading", "conducting"]
  },
  {
    id: 10,
    pattern: "Reported speech / that-clause",
    category: "Mệnh đề danh từ",
    formula: "S + reporting V + (that) + S + V",
    example: "she said the deadline had changed",
    desc: "Mệnh đề danh từ với that đứng sau động từ trần thuật/báo cáo (say, mentioned, report, announce, claim, confirm, believe).",
    keywords: ["said that", "mentioned that", "reported that", "believed that", "argued that", "confirmed that"]
  },
  {
    id: 11,
    pattern: "Wh-noun clause",
    category: "Mệnh đề danh từ",
    formula: "what/why/how/whether + S + V",
    example: "whether the results are reliable remains unclear",
    desc: "Mệnh đề danh từ mở đầu bằng What/Why/How/Whether làm chủ ngữ cho toàn câu (thường đi với remains unclear, is uncertain).",
    keywords: ["whether", "what", "how", "why", "remains unclear", "is uncertain", "remains to be seen"]
  },
  {
    id: 12,
    pattern: "Embedded question",
    category: "Câu hỏi gián tiếp",
    formula: "S + V + wh + S + V",
    example: "we do not know why the reaction occurred",
    desc: "Câu hỏi lồng/nhúng trong câu trần thuật: Giữ trật tự từ S + V chuẩn, không đảo trợ động từ lên trước chủ ngữ.",
    keywords: ["know why", "wonder how", "understand what", "explain where", "ask whether"]
  },
  {
    id: 13,
    pattern: "Relative clause",
    category: "Mệnh đề quan hệ",
    formula: "noun + who/which/that + clause",
    example: "students who attend regularly perform better",
    desc: "Mệnh đề quan hệ bổ nghĩa cho danh từ đứng trước bằng đại từ quan hệ who, which, that.",
    keywords: ["who", "which", "that"]
  },
  {
    id: 14,
    pattern: "Because / since clause",
    category: "Nguyên nhân",
    formula: "because/since + S + V + main clause",
    example: "because the data were incomplete the analysis was delayed",
    desc: "Mệnh đề chỉ nguyên nhân - kết quả với liên từ Because, Since, As.",
    keywords: ["because", "since", "as"]
  },
  {
    id: 15,
    pattern: "Although / even though",
    category: "Nhượng bộ",
    formula: "although + S + V + main clause",
    example: "although the evidence was limited the study continued",
    desc: "Mệnh đề chỉ sự nhượng bộ, tương phản logic giữa 2 vế câu bằng Although, Even though, Though.",
    keywords: ["although", "even though", "though", "despite"]
  },
  {
    id: 16,
    pattern: "Time clause",
    category: "Thời gian",
    formula: "after/before/when/while + S + V",
    example: "after the lecture ended students asked questions",
    desc: "Mệnh đề trạng ngữ chỉ thời gian với liên từ When, While, After, Before, As soon as, Until.",
    keywords: ["after", "before", "when", "while", "as soon as", "until"]
  },
  {
    id: 17,
    pattern: "Purpose",
    category: "Mục đích",
    formula: "to + V / so that + clause",
    example: "the team repeated the test to verify the results",
    desc: "Mệnh đề hoặc cụm từ chỉ mục đích hành động với to + V, in order to + V, hoặc so that + S + can/could + V.",
    keywords: ["in order to", "so that", "to verify", "to ensure", "to prevent"]
  },
  {
    id: 18,
    pattern: "If conditional",
    category: "Điều kiện",
    formula: "if + clause + main clause",
    example: "if funding increases the project will continue",
    desc: "Câu điều kiện If loại 0, 1, 2, 3 hoặc Unless (trừ khi).",
    keywords: ["if", "provided that", "unless", "as long as"]
  },
  {
    id: 19,
    pattern: "Comparative",
    category: "So sánh",
    formula: "comparative + than",
    example: "the second method was more accurate than the first",
    desc: "Cấu trúc so sánh hơn giữa hai đối tượng: more + adj/adv + than, hoặc adj-er + than.",
    keywords: ["more", "than", "less", "better than", "higher than", "faster than"]
  },
  {
    id: 20,
    pattern: "Correlative comparative",
    category: "So sánh kép",
    formula: "the more..., the more...",
    example: "the more students practice the more confident they become",
    desc: "Cấu trúc so sánh lũy tiến càng... càng... (The + comparative + S + V, the + comparative + S + V).",
    keywords: ["the more", "the higher", "the better", "the greater", "the less"]
  },
  {
    id: 21,
    pattern: "Reporting passive",
    category: "Bị động đặc biệt",
    formula: "S + be + considered/expected/believed + to V",
    example: "the method is considered to be reliable",
    desc: "Thể bị động tường thuật mang tính khách quan: S + is/are thought/believed/expected/considered + to-V.",
    keywords: ["considered to", "expected to", "believed to", "thought to", "estimated to"]
  },
  {
    id: 22,
    pattern: "Participle clause",
    category: "Mệnh đề phân từ",
    formula: "V-ing / having + V3..., S + V",
    example: "having reviewed the data they identified the error",
    desc: "Rút gọn mệnh đề đồng chủ ngữ bằng Hiện tại phân từ (V-ing) hoặc Hoàn thành phân từ (Having + V3).",
    keywords: ["having", "reviewing", "realizing", "knowing", "recognizing"]
  },
  {
    id: 23,
    pattern: "It-cleft / What-cleft",
    category: "Câu chẻ (Nhấn mạnh)",
    formula: "it + be + X + that... / what... + be...",
    example: "it was the error that caused the problem",
    desc: "Câu chẻ nhấn mạnh: It + is/was + [thành phần cần nhấn mạnh] + that/who + ...",
    keywords: ["it was", "it is", "that caused", "what we need is", "it is the"]
  },
  {
    id: 24,
    pattern: "Question formation",
    category: "Câu hỏi",
    formula: "wh + auxiliary + S + V",
    example: "why did the researchers repeat the experiment",
    desc: "Cấu trúc câu hỏi trực tiếp: Từ hỏi Wh- + Trợ động từ (do/does/did/can/will) + Chủ ngữ + Động từ.",
    keywords: ["why did", "what does", "how can", "where will", "when did"]
  },
  {
    id: 25,
    pattern: "Inversion",
    category: "Đảo ngữ",
    formula: "rarely/never/seldom + aux + S + V OR had + S + V3",
    example: "rarely have researchers observed this behavior",
    desc: "Đảo ngữ khi trạng từ phủ định hoặc bán phủ định đứng đầu câu (rarely, seldom, hardly, never, not only).",
    keywords: ["rarely", "seldom", "never", "hardly", "scarcely", "not only", "under no circumstances"]
  }
];

/**
 * Thuật toán Heuristic quét nhanh cấu trúc câu phù hợp dựa trên danh sách từ
 * Trả về pattern khớp nhất ngay lập tức (0ms latency)
 */
export function matchPatternHeuristically(scrambledWords = [], context = '', correctSentenceHint = '') {
  const words = (scrambledWords || []).map(w => String(w).toLowerCase().trim());
  const wordString = ' ' + words.join(' ') + ' ';
  const fullText = (wordString + ' ' + (context || '') + ' ' + (correctSentenceHint || '')).toLowerCase();

  // 1. Inversion (#25)
  if (words.some(w => ['rarely', 'seldom', 'scarcely', 'hardly'].includes(w)) || fullText.includes('not only')) {
    return 25;
  }

  // 2. Correlative comparative (#20)
  if (words.filter(w => w === 'the').length >= 2 && words.some(w => ['more', 'less', 'greater', 'higher', 'better'].includes(w))) {
    return 20;
  }

  // 3. It-cleft (#23)
  if ((words.includes('it') && (words.includes('was') || words.includes('is')) && words.includes('that'))) {
    return 23;
  }

  // 4. Wh-noun clause as subject (#11)
  if (words.includes('whether') || (words.some(w => ['what', 'why', 'how'].includes(w)) && words.some(w => ['remains', 'is', 'unclear', 'uncertain'].includes(w)))) {
    return 11;
  }

  // 5. Participle clause (#22)
  if (words.includes('having')) {
    return 22;
  }

  // 6. Reporting passive (#21)
  if (words.some(w => ['considered', 'believed', 'expected', 'thought'].includes(w)) && words.includes('to')) {
    return 21;
  }

  // 7. Reported speech / that-clause (#10)
  if (words.some(w => ['mentioned', 'said', 'reported', 'argued', 'claimed', 'confirmed', 'believed'].includes(w)) && words.includes('that')) {
    return 10;
  }

  // 8. Embedded question (#12)
  if (words.some(w => ['know', 'wonder', 'understand', 'explain'].includes(w)) && words.some(w => ['why', 'how', 'what', 'where'].includes(w))) {
    return 12;
  }

  // 9. Although / Even though (#15)
  if (words.includes('although') || words.includes('even') || fullText.includes('even though')) {
    return 15;
  }

  // 10. Because / Since (#14)
  if (words.includes('because') || words.includes('since')) {
    return 14;
  }

  // 11. Time clause (#16)
  if (words.some(w => ['after', 'before', 'while', 'until'].includes(w))) {
    return 16;
  }

  // 12. If conditional (#18)
  if (words.includes('if') || words.includes('unless') || words.includes('provided')) {
    return 18;
  }

  // 13. Purpose (#17)
  if (words.includes('so') && words.includes('that')) {
    return 17;
  }

  // 14. Verb + Object + Infinitive (#8)
  if (words.some(w => ['advised', 'encouraged', 'reminded', 'allowed', 'required', 'urged'].includes(w)) && words.includes('to')) {
    return 8;
  }

  // 15. Verb + Infinitive (#7)
  if (words.some(w => ['decided', 'plans', 'hopes', 'failed', 'aims', 'agreed', 'attempted', 'hesitated'].includes(w)) && words.includes('to')) {
    return 7;
  }

  // 16. Comparative (#19)
  if (words.includes('than') && words.some(w => ['more', 'less', 'better', 'worse', 'higher', 'lower'].includes(w))) {
    return 19;
  }

  // 17. Relative clause (#13)
  if (words.some(w => ['who', 'which'].includes(w))) {
    return 13;
  }

  // 18. Perfect passive (#6)
  if (words.some(w => ['have', 'has', 'had'].includes(w)) && words.includes('been')) {
    return 6;
  }

  // 19. Modal passive (#5)
  if (words.some(w => ['must', 'should', 'can', 'could', 'will', 'would', 'might'].includes(w)) && words.includes('be')) {
    return 5;
  }

  // 20. Perfect tense (#3)
  if (words.some(w => ['have', 'has', 'had'].includes(w))) {
    return 3;
  }

  // 21. Modal verb (#2)
  if (words.some(w => ['must', 'should', 'could', 'would', 'might', 'can', 'will'].includes(w))) {
    return 2;
  }

  // 22. Passive voice (#4)
  if (words.some(w => ['was', 'were', 'is', 'are', 'been'].includes(w))) {
    return 4;
  }

  // 23. Direct question (#24)
  if (words.some(w => ['did', 'does', 'do', 'can', 'will'].includes(w)) && words.some(w => ['why', 'what', 'how', 'when', 'where'].includes(w))) {
    return 24;
  }

  return 1; // Basic statement
}
