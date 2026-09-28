/**
 * Storage and default seed data for Writing Model Samples (Email & Discussion)
 */

import { getSupabaseClient, isSupabaseConfigured } from './supabase.js';

export const INITIAL_EMAIL_SAMPLES = [
  {
    id: 'sample_email_01',
    type: 'email',
    title: 'Request for Lab Equipment Replacement & Assignment Extension',
    topicCategory: 'Sciences & Laboratory Work',
    sourceType: 'ets_curated',
    targetBand: '5.0 / 5.0',
    prompt: {
      scenario: 'You are taking an Advanced Biochemistry course. During your lab session, the spectrophotometer you were assigned malfunctioned, preventing you from completing your measurement data for the upcoming lab report due this Friday. Write an email to your professor, Dr. Higgins.',
      requirements: [
        'Explain the technical problem that occurred in the laboratory',
        'Request a brief extension on the lab report submission deadline',
        'Ask for permission to access the lab facility to repeat the measurements'
      ],
      recommendedWords: '100 - 130 words'
    },
    modelEssay: `Dear Professor Higgins,\n\nI am writing to inform you of an unforeseen technical difficulty I encountered during yesterday's biochemistry laboratory session. While conducting the protein quantification assay, my assigned spectrophotometer consistently produced erratic absorbance readings and subsequently powered off, which prevented me from obtaining reliable data for Friday's lab report.\n\nGiven these circumstances, I would be extremely grateful if you could grant me a two-day extension, until Sunday evening, to submit my completed report. Additionally, could I please obtain permission to briefly access the laboratory tomorrow afternoon during open hours to recalibrate the equipment and repeat the final measurement series?\n\nThank you very much for your understanding and consideration. I look forward to hearing from you.\n\nSincerely,\nAlex Morgan`,
    wordCount: 122,
    vocabularyHighlights: [
      {
        term: 'unforeseen technical difficulty',
        meaning: 'sự cố kỹ thuật ngoài dự kiến',
        contextInEssay: 'I am writing to inform you of an unforeseen technical difficulty...'
      },
      {
        term: 'erratic absorbance readings',
        meaning: 'chỉ số hấp thụ chập chờn, bất thường',
        contextInEssay: '...consistently produced erratic absorbance readings...'
      },
      {
        term: 'extremely grateful if you could grant',
        meaning: 'vô cùng biết ơn nếu thầy có thể cho phép/chấp thuận',
        contextInEssay: 'I would be extremely grateful if you could grant me a two-day extension...'
      },
      {
        term: 'recalibrate the equipment',
        meaning: 'hiệu chuẩn lại thiết bị đo đạc',
        contextInEssay: '...permission to briefly access the laboratory tomorrow afternoon to recalibrate the equipment...'
      }
    ],
    structureAnalysis: '• Opening (1 câu): Nêu rõ lý do viết thư một cách lịch sự, trang trọng.\n• Problem Explanation (2 câu): Giải thích cụ thể sự cố (máy quang phổ bị lỗi dẫn tới số liệu sai lệch).\n• Actionable Requests (2 câu): Đề xuất giải pháp và xin gia hạn 2 ngày kèm lịch vào phòng lab đo lại.\n• Formal Sign-off: Lời cảm ơn và kết thư trang nhã chuẩn mực học thuật.',
    created_at: '2026-09-28T08:00:00.000Z'
  },
  {
    id: 'sample_email_02',
    type: 'email',
    title: 'Inquiry Regarding Summer Undergraduate Research Fellowship',
    topicCategory: 'Academic Advising & Research',
    sourceType: 'ets_curated',
    targetBand: '5.0 / 5.0',
    prompt: {
      scenario: 'You are an undergraduate environmental science student interested in joining Professor Vance’s summer research team studying coastal wetlands. Write an email to Professor Vance expressing your interest.',
      requirements: [
        'State your academic background and interest in her published wetland restoration papers',
        'Inquire whether there are open research assistant positions available for undergraduates',
        'Request an opportunity for a brief meeting during her office hours to discuss qualifications'
      ],
      recommendedWords: '100 - 130 words'
    },
    modelEssay: `Dear Professor Vance,\n\nI hope this email finds you well. As a third-year Environmental Science major, I have closely followed your recent research publications regarding tidal wetland restoration in the Chesapeake Bay, which closely align with my own academic interests in estuarine ecology.\n\nI am writing to respectfully inquire whether you have any undergraduate research assistant openings available in your laboratory for the upcoming summer fellowship program. Having completed advanced coursework in aquatic chemistry and field sampling methodologies, I am eager to contribute meaningfully to your ongoing field surveys.\n\nWould it be possible to schedule a brief 10-minute meeting during your upcoming office hours to discuss how my background might support your research? I have attached my curriculum vitae for your reference.\n\nThank you for your time and guidance.\n\nRespectfully,\nJordan Lee`,
    wordCount: 131,
    vocabularyHighlights: [
      {
        term: 'closely align with my academic interests',
        meaning: 'hoàn toàn trùng khớp với định hướng học thuật của tôi',
        contextInEssay: '...which closely align with my own academic interests in estuarine ecology.'
      },
      {
        term: 'respectfully inquire whether',
        meaning: 'kính cẩn hỏi thăm xem liệu rằng',
        contextInEssay: 'I am writing to respectfully inquire whether you have any openings...'
      },
      {
        term: 'contribute meaningfully to',
        meaning: 'đóng góp thiết thực, có giá trị vào',
        contextInEssay: '...I am eager to contribute meaningfully to your ongoing field surveys.'
      }
    ],
    structureAnalysis: '• Salutation & Connection: Lời chào học thuật và nêu sự am hiểu về các công trình đã xuất bản của giáo sư.\n• Core Purpose & Value Proposition: Giới thiệu năng lực bản thân (aquatic chemistry & field sampling) để chứng minh mình có ích cho dự án.\n• Call to Action: Xin lịch gặp ngắn 10 phút và đính kèm CV chuyên nghiệp.',
    created_at: '2026-09-28T08:15:00.000Z'
  },
  {
    id: 'sample_email_03',
    type: 'email',
    title: 'Clarification on Final Capstone Project Grading Rubric',
    topicCategory: 'Coursework & Grading',
    sourceType: 'ets_curated',
    targetBand: '5.0 / 5.0',
    prompt: {
      scenario: 'You recently received feedback on your group capstone proposal from Dr. Davenport, but your team is uncertain about how the statistical modeling criteria will be evaluated. Write an email to request clarification.',
      requirements: [
        'Thank the professor for the initial proposal feedback',
        'Politely point out the specific section concerning statistical modeling criteria that needs clarification',
        'Propose a specific time to discuss the feedback after tomorrow’s lecture'
      ],
      recommendedWords: '100 - 130 words'
    },
    modelEssay: `Dear Dr. Davenport,\n\nThank you very much for providing such comprehensive feedback on our group's capstone project proposal yesterday. My team members and I found your comments on our literature review exceptionally insightful and constructive.\n\nHowever, we would appreciate some additional clarification regarding the statistical modeling criteria outlined in section three. We want to ensure that our proposed multivariate regression analysis fully satisfies your expectations before we begin primary data collection. Could our team speak with you briefly for five minutes following tomorrow morning's lecture, or would an alternative time during your afternoon office hours be more convenient?\n\nWe genuinely appreciate your continued mentorship and look forward to refining our methodology.\n\nWarm regards,\nSamantha Reed\nLead Coordinator, Capstone Team B`,
    wordCount: 121,
    vocabularyHighlights: [
      {
        term: 'comprehensive feedback',
        meaning: 'nhận xét toàn diện, chi tiết',
        contextInEssay: 'Thank you very much for providing such comprehensive feedback...'
      },
      {
        term: 'exceptionally insightful and constructive',
        meaning: 'vô cùng sâu sắc và mang tính xây dựng',
        contextInEssay: '...found your comments exceptionally insightful and constructive.'
      },
      {
        term: 'multivariate regression analysis',
        meaning: 'phân tích hồi quy đa biến (thuật ngữ học thuật)',
        contextInEssay: '...ensure that our proposed multivariate regression analysis fully satisfies your expectations...'
      }
    ],
    structureAnalysis: '• Appreciation (1 câu): Cảm ơn chân thành về lời nhận xét giúp tạo thiện cảm.\n• Specific Query (2 câu): Chỉ rõ vướng mắc cụ thể ở phần mô hình thống kê, tránh chung chung.\n• Scheduling Option: Đưa ra 2 lựa chọn thời gian linh hoạt thuận tiện cho giáo sư.\n• Professional Closing: Chữ ký kèm chức danh trong nhóm.',
    created_at: '2026-09-28T08:30:00.000Z'
  }
];

export const INITIAL_DISCUSSION_SAMPLES = [
  {
    id: 'sample_discussion_01',
    type: 'discussion',
    title: 'Integration of Generative AI in Higher Education Coursework',
    topicCategory: 'Technology & Education Policy',
    sourceType: 'ets_curated',
    targetBand: '5.0 / 5.0',
    prompt: {
      professorName: 'Dr. Katherine Miller',
      professorTitle: 'Professor of Sociology & Digital Media',
      professorQuestion: 'Many universities are currently debating whether generative AI tools should be actively integrated into coursework or strictly banned from academic assignments. In your discussion post, explain your perspective on whether generative AI enhances or hinders students’ critical thinking skills. Whose point of view do you agree with, and why?',
      studentOpinions: [
        {
          student: 'Michael',
          avatar_bg: 'bg-blue-600',
          opinion: 'Generative AI serves as an intellectual crutch. If students rely on algorithms to formulate arguments and summarize texts, they bypass the essential cognitive struggle required to develop genuine analytical independence.'
        },
        {
          student: 'Sarah',
          avatar_bg: 'bg-emerald-600',
          opinion: 'When utilized responsibly as an exploratory partner, AI can stimulate deeper inquiry by automating mundane clerical tasks and challenging students to synthesize multifaceted viewpoints.'
        }
      ],
      recommendedWords: '100 - 140 words'
    },
    modelEssay: `While Michael raises a legitimate concern regarding overreliance on automated tools, I firmly agree with Sarah that generative AI, when governed by clear pedagogical guidelines, substantially enhances students' analytical rigor. \n\nRather than eliminating cognitive exertion, AI can serve as a catalyst for advanced synthesis. For instance, in social science courses, students can utilize language models to generate counterarguments to their preliminary hypotheses, thereby forcing them to anticipate objections and refine their logic before submitting essays. Furthermore, learning to critically cross-examine AI-generated outputs for factual hallucinations cultivates digital discernment—an essential competency in our information-saturated economy. Consequently, instead of banning these technologies, universities should mandate AI literacy curricula that teach students how to interrogate algorithmic responses rather than accept them passively.`,
    wordCount: 127,
    vocabularyHighlights: [
      {
        term: 'raises a legitimate concern regarding',
        meaning: 'đưa ra một mối quan ngại hoàn toàn chính đáng về',
        contextInEssay: 'While Michael raises a legitimate concern regarding overreliance on automated tools...'
      },
      {
        term: 'catalyst for advanced synthesis',
        meaning: 'chất xúc tác cho sự tổng hợp kiến thức bậc cao',
        contextInEssay: '...AI can serve as a catalyst for advanced synthesis.'
      },
      {
        term: 'anticipate objections and refine logic',
        meaning: 'dự đoán trước các phản biện và mài giũa tư duy lập luận',
        contextInEssay: '...forcing them to anticipate objections and refine their logic...'
      },
      {
        term: 'cultivates digital discernment',
        meaning: 'trau dồi khả năng phân định, đánh giá thông tin số',
        contextInEssay: '...cross-examine outputs for factual hallucinations cultivates digital discernment...'
      }
    ],
    structureAnalysis: '• Nuanced Hook & Stance: Thừa nhận ý của Michael nhưng đồng tình với Sarah kèm điều kiện ("when governed by clear pedagogical guidelines").\n• Concrete Elaboration: Đưa ví dụ cụ thể về việc dùng AI để tìm phản biện cho giả thuyết nghiên cứu.\n• Broader Implication: Nhấn mạnh kỹ năng "digital discernment" cần thiết cho thị trường lao động tương lai.\n• Strategic Conclusion: Đưa ra kiến nghị chính sách (mandate AI literacy curricula).',
    created_at: '2026-09-28T09:00:00.000Z'
  },
  {
    id: 'sample_discussion_02',
    type: 'discussion',
    title: 'Government Subsidies for Renewable Energy vs Market-Driven Innovation',
    topicCategory: 'Economics & Environmental Policy',
    sourceType: 'ets_curated',
    targetBand: '5.0 / 5.0',
    prompt: {
      professorName: 'Dr. Gregory Davis',
      professorTitle: 'Professor of Public Economics',
      professorQuestion: 'To accelerate the transition to carbon neutrality, should national governments heavily subsidize renewable energy enterprises, or should the green transition be driven primarily by free-market consumer demand? Present your stance and support it with compelling reasoning.',
      studentOpinions: [
        {
          student: 'David',
          avatar_bg: 'bg-indigo-600',
          opinion: 'Subsidies risk distorting market pricing and propping up unviable corporations that cannot survive once fiscal incentives diminish.'
        },
        {
          student: 'Emily',
          avatar_bg: 'bg-rose-600',
          opinion: 'Climate change is an existential crisis with profound externalities that standard market mechanisms cannot rectify quickly enough without substantial state funding.'
        }
      ],
      recommendedWords: '100 - 140 words'
    },
    modelEssay: `Although David rightly points out the economic peril of market distortion, I align squarely with Emily in asserting that robust public subsidies are indispensable for averting catastrophic climate shifts. \n\nPrivate capital naturally gravitates toward short-term profitability, rendering high-risk capital-intensive ventures—such as grid-scale battery storage and green hydrogen facilities—prohibitively risky without government guarantees. Public subsidies effectively bridge this "valley of death" during nascent technological phases. For instance, substantial federal tax credits were instrumental in lowering photovoltaic production costs by over eighty percent over the past decade, ultimately making solar power cheaper than fossil fuels. Therefore, government intervention does not stifle market forces; rather, it rapidly de-risks green infrastructure so that private markets can scale sustainable solutions before critical planetary tipping points are breached.`,
    wordCount: 133,
    vocabularyHighlights: [
      {
        term: 'align squarely with ... in asserting that',
        meaning: 'hoàn toàn đồng thuận với ... trong khẳng định rằng',
        contextInEssay: '...I align squarely with Emily in asserting that robust public subsidies are indispensable...'
      },
      {
        term: 'high-risk capital-intensive ventures',
        meaning: 'các dự án đầu tư mạo hiểm đòi hỏi nguồn vốn khổng lồ',
        contextInEssay: '...rendering high-risk capital-intensive ventures prohibitively risky...'
      },
      {
        term: 'bridge the "valley of death"',
        meaning: 'vượt qua "thung lũng chết" (giai đoạn rủi ro trước khi thương mại hóa)',
        contextInEssay: 'Public subsidies effectively bridge this "valley of death" during nascent phases.'
      },
      {
        term: 'planetary tipping points are breached',
        meaning: 'các ngưỡng giới hạn sinh thái của hành tinh bị vượt qua',
        contextInEssay: '...sustainable solutions before critical planetary tipping points are breached.'
      }
    ],
    structureAnalysis: '• Concession & Thesis: Bác bỏ lập luận thị trường tự do, nhấn mạnh tính cấp bách của khủng hoảng khí hậu.\n• Core Economic Rationale: Giải thích tại sao vốn tư nhân ngại rủi ro lớn trong giai đoạn sơ khai (nascent phases).\n• Evidentiary Proof: Dẫn chứng thực tế về năng lượng mặt trời giảm 80% chi phí nhờ trợ cấp chính phủ.\n• Synthesized Conclusion: Tái khẳng định trợ cấp nhà nước là đòn bẩy kích thích thị trường tư nhân.',
    created_at: '2026-09-28T09:15:00.000Z'
  },
  {
    id: 'sample_discussion_03',
    type: 'discussion',
    title: 'Remote Work Policies and Urban Economic Vitality',
    topicCategory: 'Urban Studies & Labor Economics',
    sourceType: 'ets_curated',
    targetBand: '5.0 / 5.0',
    prompt: {
      professorName: 'Dr. Arthur Henderson',
      professorTitle: 'Professor of Urban Planning',
      professorQuestion: 'As telecommuting becomes institutionalized across knowledge-based sectors, should municipal governments incentivize corporations to bring employees back into downtown offices to revive urban centers, or should cities adapt to permanent decentralized work patterns?',
      studentOpinions: [
        {
          student: 'Jessica',
          avatar_bg: 'bg-purple-600',
          opinion: 'Downtown commerce relies heavily on office foot traffic. Without returning commuters, local small businesses, restaurants, and transit systems will collapse.'
        },
        {
          student: 'Ryan',
          avatar_bg: 'bg-teal-600',
          opinion: 'Trying to force workers back is counterproductive. Cities should embrace remote work and rezone commercial districts into affordable residential housing.'
        }
      ],
      recommendedWords: '100 - 140 words'
    },
    modelEssay: `While Jessica underscores the immediate fiscal distress confronting downtown retailers, I strongly support Ryan's progressive vision that municipal leadership must proactively adapt to decentralized work rather than cling to an obsolete commuter model. \n\nAttempting to mandate office attendance is inherently unsustainable because hybrid flexibility has evolved into a baseline workforce expectation that enhances employee well-being and mitigates urban traffic congestion. Instead of artificially subsidizing commercial occupancy, forward-thinking municipalities should seize this historic opportunity to rezone vacant office towers into mixed-income residential developments and public green spaces. By diversifying single-use commercial districts into vibrant, twenty-four-hour neighborhoods, cities can cultivate sustainable resident-driven commerce that fosters long-term economic resilience, outlasting the fragile paradigm of nine-to-five commuter dependency.`,
    wordCount: 122,
    vocabularyHighlights: [
      {
        term: 'cling to an obsolete commuter model',
        meaning: 'bám víu vào mô hình di chuyển đi lại đã lỗi thời',
        contextInEssay: '...rather than cling to an obsolete commuter model.'
      },
      {
        term: 'baseline workforce expectation',
        meaning: 'kỳ vọng tối thiểu, tiêu chuẩn của lực lượng lao động hiện đại',
        contextInEssay: '...hybrid flexibility has evolved into a baseline workforce expectation...'
      },
      {
        term: 'rezone vacant office towers into',
        meaning: 'quy hoạch lại các tòa nhà văn phòng bỏ trống thành',
        contextInEssay: '...rezone vacant office towers into mixed-income residential developments...'
      },
      {
        term: 'fosters long-term economic resilience',
        meaning: 'thúc đẩy sức bền, khả năng chống chịu kinh tế dài hạn',
        contextInEssay: '...resident-driven commerce that fosters long-term economic resilience...'
      }
    ],
    structureAnalysis: '• Position Taking: Khẳng định việc bắt buộc đến công ty là lỗi thời và ủng hộ chuyển dịch linh hoạt.\n• Worker Perspective: Nhấn mạnh lợi ích về sức khỏe tinh thần và giảm tải giao thông đô thị.\n• Solution-Oriented Policy: Đề xuất chuyển đổi tòa nhà văn phòng bỏ trống thành nhà ở xã hội (mixed-income housing).\n• High-Impact Closing: Dự phóng một mô hình đô thị bền vững 24/7 thay vì 9-to-5.',
    created_at: '2026-09-28T09:30:00.000Z'
  }
];

const STORAGE_KEYS = {
  email: 'toefl_writing_email_samples',
  discussion: 'toefl_writing_discussion_samples'
};

/**
 * Lấy danh sách bài mẫu theo loại ('email' | 'discussion')
 */
export function getStoredSamples(type = 'email') {
  if (typeof window === 'undefined') {
    return type === 'email' ? INITIAL_EMAIL_SAMPLES : INITIAL_DISCUSSION_SAMPLES;
  }

  const key = STORAGE_KEYS[type] || STORAGE_KEYS.email;
  const initial = type === 'email' ? INITIAL_EMAIL_SAMPLES : INITIAL_DISCUSSION_SAMPLES;

  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(initial));
      return initial;
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(key, JSON.stringify(initial));
      return initial;
    }

    // Đảm bảo các bài mẫu mặc định ETS luôn hiện diện
    let hasChanges = false;
    const combined = [...parsed];
    for (const defItem of initial) {
      if (!combined.some(s => s.id === defItem.id)) {
        combined.push(defItem);
        hasChanges = true;
      }
    }

    // Tự động làm sạch targetBand nếu chứa các đoạn chú thích dài gây tràn viền
    combined.forEach(s => {
      if (s.targetBand && (s.targetBand.includes('(') || s.targetBand.length > 20)) {
        s.targetBand = s.targetBand.split('(')[0].trim() || 'Band 5.5+';
        hasChanges = true;
      }
    });

    if (hasChanges) {
      localStorage.setItem(key, JSON.stringify(combined));
    }

    return combined;
  } catch (err) {
    console.error(`Lỗi đọc samples ${type} từ localStorage:`, err);
    return initial;
  }
}

/**
 * Đồng bộ hai chiều với cơ sở dữ liệu Supabase Cloud
 */
export async function syncWritingSamplesFromSupabase(type = 'email') {
  if (typeof window === 'undefined') return getStoredSamples(type);
  const client = getSupabaseClient();
  if (!isSupabaseConfigured() || !client) return getStoredSamples(type);

  try {
    const { data, error } = await client
      .from('writing_samples')
      .select('*')
      .eq('type', type)
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      const initial = type === 'email' ? INITIAL_EMAIL_SAMPLES : INITIAL_DISCUSSION_SAMPLES;
      const key = STORAGE_KEYS[type] || STORAGE_KEYS.email;
      const current = getStoredSamples(type);

      // Chuyển đổi từ snake_case của Postgres sang camelCase của JS
      const cloudSamples = data.map(row => ({
        id: row.id,
        type: row.type,
        title: row.title,
        topicCategory: row.topic_category || 'Tài liệu bổ sung',
        sourceType: row.source_type || 'external_upload',
        targetBand: row.target_band || '5.5+ / 6.0',
        prompt: row.prompt,
        modelEssay: row.model_essay,
        wordCount: row.word_count || row.model_essay?.split(/\s+/).filter(Boolean).length || 0,
        vocabularyHighlights: row.vocabulary_highlights || [],
        structureAnalysis: row.structure_analysis || '',
        userOriginalResponse: row.user_original_response || null,
        personalNotes: row.personal_notes || '',
        created_at: row.created_at
      }));

      // Hợp nhất dữ liệu Cloud và Local
      const mergedMap = new Map();
      cloudSamples.forEach(s => mergedMap.set(s.id, s));
      current.forEach(s => {
        if (!mergedMap.has(s.id)) {
          mergedMap.set(s.id, s);
        }
      });
      initial.forEach(def => {
        if (!mergedMap.has(def.id)) {
          mergedMap.set(def.id, def);
        }
      });

      const combined = Array.from(mergedMap.values());
      localStorage.setItem(key, JSON.stringify(combined));
      return combined;
    }
  } catch (err) {
    console.warn(`Supabase writing_samples sync notice (${type}):`, err.message);
  }

  return getStoredSamples(type);
}

/**
 * Lưu 1 bài mẫu mới hoặc cập nhật bài mẫu hiện có
 */
export function saveWritingSample(sample) {
  if (typeof window === 'undefined' || !sample) return;
  const type = sample.type === 'discussion' ? 'discussion' : 'email';
  const key = STORAGE_KEYS[type];
  const current = getStoredSamples(type);

  const index = current.findIndex(s => s.id === sample.id);
  let updated;
  if (index >= 0) {
    updated = current.map(s => s.id === sample.id ? sample : s);
  } else {
    updated = [sample, ...current];
  }

  localStorage.setItem(key, JSON.stringify(updated));

  // Đồng bộ lên Supabase nếu có cấu hình
  try {
    const client = getSupabaseClient();
    if (isSupabaseConfigured() && client) {
      Promise.resolve(
        client.from('writing_samples').upsert({
          id: sample.id,
          type: sample.type,
          title: sample.title,
          topic_category: sample.topicCategory,
          source_type: sample.sourceType,
          prompt: sample.prompt,
          model_essay: sample.modelEssay,
          word_count: sample.wordCount,
          target_band: sample.targetBand,
          vocabulary_highlights: sample.vocabularyHighlights || [],
          structure_analysis: sample.structureAnalysis || '',
          user_original_response: sample.userOriginalResponse || null,
          personal_notes: sample.personalNotes || '',
          created_at: sample.created_at || new Date().toISOString()
        })
      ).catch(err => {
        console.warn('Supabase writing_samples sync notice (ignorable):', err.message);
      });
    }
  } catch (syncErr) {
    console.warn('Supabase writing_samples sync error:', syncErr.message);
  }

  return updated;
}

/**
 * Xóa 1 bài mẫu theo ID
 */
export function deleteWritingSample(sampleId, type = 'email') {
  if (typeof window === 'undefined') return;
  const key = STORAGE_KEYS[type] || STORAGE_KEYS.email;
  const current = getStoredSamples(type);
  const updated = current.filter(s => s.id !== sampleId);
  localStorage.setItem(key, JSON.stringify(updated));

  // Xóa trên Supabase nếu có
  try {
    const client = getSupabaseClient();
    if (isSupabaseConfigured() && client) {
      Promise.resolve(
        client.from('writing_samples').delete().eq('id', sampleId)
      ).catch(() => {});
    }
  } catch (e) {}

  return updated;
}

/**
 * Xóa sạch toàn bộ các bài mẫu đã upload / nhập sai của dạng này
 * @param {string} type - 'email' | 'discussion'
 * @param {boolean} keepDefaultsOnly - Nếu true: chỉ giữ lại 3 bài mẫu gốc ETS chuẩn, xóa sạch toàn bộ bài upload/nhập sai. Nếu false: xóa sạch 100%.
 */
export async function clearAllWritingSamples(type = 'email', keepDefaultsOnly = true) {
  if (typeof window === 'undefined') return [];
  const key = STORAGE_KEYS[type] || STORAGE_KEYS.email;
  const initial = type === 'email' ? INITIAL_EMAIL_SAMPLES : INITIAL_DISCUSSION_SAMPLES;
  const targetSamples = keepDefaultsOnly ? [...initial] : [];

  localStorage.setItem(key, JSON.stringify(targetSamples));

  // Đồng bộ xóa trên Supabase nếu có cấu hình
  try {
    const client = getSupabaseClient();
    if (isSupabaseConfigured() && client) {
      if (keepDefaultsOnly) {
        const defaultIds = initial.map(s => s.id);
        await client
          .from('writing_samples')
          .delete()
          .eq('type', type)
          .not('id', 'in', `(${defaultIds.map(id => `'${id}'`).join(',')})`);
      } else {
        await client
          .from('writing_samples')
          .delete()
          .eq('type', type);
      }
    }
  } catch (err) {
    console.warn(`Supabase clear writing_samples notice (${type}):`, err.message);
  }

  return targetSamples;
}

/**
 * Khôi phục lại các bài mẫu mặc định (xóa sạch bài upload/nhập sai)
 */
export function resetWritingSamples(type = 'email') {
  if (typeof window === 'undefined') return [];
  clearAllWritingSamples(type, true);
  const key = STORAGE_KEYS[type] || STORAGE_KEYS.email;
  const initial = type === 'email' ? INITIAL_EMAIL_SAMPLES : INITIAL_DISCUSSION_SAMPLES;
  localStorage.setItem(key, JSON.stringify(initial));
  return initial;
}

/**
 * Tạo nhanh 1 bài mẫu được liên kết từ bài làm thực tế của User
 */
export function createSampleFromUserAttempt({
  type = 'email',
  testTitle,
  testId,
  prompt,
  userDraft,
  userScore,
  aiImprovedEssay,
  aiFeedbackSummary,
  vocabList = [],
  structureNotes = ''
}) {
  const finalEssay = (aiImprovedEssay && aiImprovedEssay.trim()) ? aiImprovedEssay.trim() : userDraft;
  const wordCount = finalEssay ? finalEssay.trim().split(/\s+/).length : 0;

  const newSample = {
    id: `sample_${type}_user_${Date.now()}`,
    type,
    title: testTitle || (type === 'email' ? 'Bài làm Email của tôi' : 'Bài làm Discussion của tôi'),
    topicCategory: 'Bài làm thực tế của tôi',
    sourceType: 'user_exam',
    targetBand: userScore ? `${userScore}/5.0` : '5.0 / 5.0',
    prompt: typeof prompt === 'object' ? prompt : { scenario: String(prompt || '') },
    modelEssay: finalEssay,
    wordCount,
    vocabularyHighlights: vocabList,
    structureAnalysis: structureNotes || 'Bài viết được lưu trực tiếp từ bài thi thử thực tế của bạn, bao gồm các chỉnh sửa từ AI để nâng cấp chuẩn Band 5.0.',
    userOriginalResponse: {
      testId: testId || '',
      testTitle: testTitle || '',
      userDraft: userDraft || '',
      userScore: userScore || 0,
      aiFeedbackSummary: aiFeedbackSummary || '',
      completedAt: new Date().toISOString()
    },
    created_at: new Date().toISOString()
  };

  return saveWritingSample(newSample);
}

/**
 * Nhập hàng loạt bài mẫu từ mảng hoặc đối tượng JSON
 */
export function importBatchWritingSamples(samplesInput, defaultType = 'email') {
  if (typeof window === 'undefined') return { success: false, count: 0, samples: [] };

  let rawList = [];
  if (Array.isArray(samplesInput)) {
    rawList = samplesInput;
  } else if (samplesInput && Array.isArray(samplesInput.samples)) {
    rawList = samplesInput.samples;
  } else if (samplesInput && Array.isArray(samplesInput.data)) {
    rawList = samplesInput.data;
  } else if (samplesInput && typeof samplesInput === 'object') {
    rawList = [samplesInput];
  }

  if (rawList.length === 0) {
    throw new Error('Không tìm thấy danh sách bài mẫu hợp lệ trong dữ liệu JSON.');
  }

  const validSamples = [];
  const now = new Date().toISOString();

  for (let idx = 0; idx < rawList.length; idx++) {
    const item = rawList[idx];
    if (!item) continue;

    // Tự động nhận diện dạng bài nếu chưa có
    let inferredType = item.type;
    if (!inferredType) {
      if (item.prompt?.professorQuestion || item.prompt?.studentOpinions || item.studentOpinions || item.professor) {
        inferredType = 'discussion';
      } else if (item.prompt?.scenario || item.prompt?.requirements || item.scenario || item.requirements) {
        inferredType = 'email';
      } else {
        inferredType = defaultType || 'email';
      }
    }
    inferredType = inferredType.toLowerCase().includes('discuss') ? 'discussion' : 'email';

    // Chuẩn hóa prompt
    let promptObj = item.prompt || {};
    if (typeof promptObj === 'string') {
      promptObj = inferredType === 'email' ? { scenario: promptObj } : { professorQuestion: promptObj };
    }
    if (item.scenario && !promptObj.scenario) promptObj.scenario = item.scenario;
    if (item.requirements && !promptObj.requirements) promptObj.requirements = item.requirements;
    if (item.professorQuestion && !promptObj.professorQuestion) promptObj.professorQuestion = item.professorQuestion;
    if (item.studentOpinions && !promptObj.studentOpinions) promptObj.studentOpinions = item.studentOpinions;

    const essay = (item.modelEssay || item.model_essay || item.essay || '').trim();
    if (!essay) continue;

    const words = item.wordCount || item.word_count || essay.split(/\s+/).filter(Boolean).length;

    const sampleObj = {
      id: item.id || `sample_${inferredType}_import_${Date.now()}_${idx + 1}`,
      type: inferredType,
      title: item.title || (inferredType === 'email' ? `Bài mẫu Email #${idx + 1}` : `Bài mẫu Discussion #${idx + 1}`),
      topicCategory: item.topicCategory || item.topic_category || item.category || 'Tài liệu bổ sung',
      sourceType: 'ai_generated',
      targetBand: (item.targetBand || item.target_band || 'Band 5.5+ / 6.0').split('(')[0].trim(),
      prompt: promptObj,
      modelEssay: essay,
      wordCount: words,
      vocabularyHighlights: Array.isArray(item.vocabularyHighlights || item.vocabulary_highlights || item.vocabulary)
        ? (item.vocabularyHighlights || item.vocabulary_highlights || item.vocabulary).map(v => ({
            term: v.term || v.word || '',
            meaning: v.meaning || v.vietnamese_meaning || '',
            contextInEssay: v.contextInEssay || v.context_in_essay || v.context || ''
          }))
        : [],
      structureAnalysis: item.structureAnalysis || item.structure_analysis || item.analysis || '',
      created_at: item.created_at || now
    };

    saveWritingSample(sampleObj);
    validSamples.push(sampleObj);
  }

  if (validSamples.length === 0) {
    throw new Error('Dữ liệu JSON không chứa bài viết mẫu hợp lệ (thiếu trường modelEssay hoặc essay).');
  }

  return {
    success: true,
    count: validSamples.length,
    samples: validSamples
  };
}
