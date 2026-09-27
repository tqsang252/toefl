/**
 * Storage and default seed data for Skill Notes & Cheat Sheets Hub
 */

export const INITIAL_PREPOSITION_NOTE = {
  id: 'note_62_prepositions',
  title: '62 Cụm Từ Đi Với Giới Từ Xịn Học Một Lần Dùng Cả Đời',
  category: 'Grammar & Prepositions',
  tags: ['preposition', 'collocation', 'essential_phrases', 'ets_standard'],
  summary: 'Tổng hợp 62 cụm tính từ, động từ và danh từ đi liền với giới từ thông dụng và học thuật nhất trong các đề thi TOEFL iBT.',
  created_at: new Date().toISOString(),
  original_image_url: null,
  items: [
    {
      id: 1,
      term: 'proud of',
      type: 'adj + prep',
      meaning: 'tự hào về',
      example: 'The faculty was immensely proud of the student team for winning the national robotics symposium.',
      blank_sentence: 'The university faculty was immensely proud ___ the team for their academic breakthrough.',
      correct_answer: 'of',
      options: ['of', 'about', 'for', 'with']
    },
    {
      id: 2,
      term: 'famous for',
      type: 'adj + prep',
      meaning: 'nổi tiếng vì',
      example: 'The ancient Mediterranean port was famous for its sophisticated aqueducts and maritime commerce.',
      blank_sentence: 'The Galapagos archipelago is worldwide famous ___ its extraordinarily high rate of endemic species.',
      correct_answer: 'for',
      options: ['for', 'with', 'about', 'by']
    },
    {
      id: 3,
      term: 'angry with',
      type: 'adj + prep',
      meaning: 'giận một người',
      example: 'The laboratory director was angry with the research assistants for neglecting the safety protocols.',
      blank_sentence: 'The professor was visibly angry ___ the laboratory staff for misplacing the geological specimens.',
      correct_answer: 'with',
      options: ['with', 'about', 'to', 'for']
    },
    {
      id: 4,
      term: 'angry about',
      type: 'adj + prep',
      meaning: 'tức giận về một việc',
      example: 'Local residents were angry about the municipal decision to rezone the botanical garden for commercial real estate.',
      blank_sentence: 'Environmental advocates were legitimately angry ___ the lack of strict carbon-emission restrictions.',
      correct_answer: 'about',
      options: ['about', 'with', 'at', 'against']
    },
    {
      id: 5,
      term: 'pleased with',
      type: 'adj + prep',
      meaning: 'hài lòng với',
      example: 'The department head was highly pleased with the statistical rigor demonstrated in the dissertation.',
      blank_sentence: 'The committee was well pleased ___ the outcome of the environmental restoration project.',
      correct_answer: 'with',
      options: ['with', 'about', 'by', 'of']
    },
    {
      id: 6,
      term: 'worried about',
      type: 'adj + prep',
      meaning: 'lo lắng về',
      example: 'Marine ecologists are increasingly worried about ocean acidification and coral bleaching.',
      blank_sentence: 'Economists remain deeply worried ___ the long-term inflationary pressures on developing economies.',
      correct_answer: 'about',
      options: ['about', 'for', 'of', 'over']
    },
    {
      id: 7,
      term: 'different from',
      type: 'adj + prep',
      meaning: 'khác với',
      example: 'The linguistic structure of Basque is fundamentally different from any other Indo-European language.',
      blank_sentence: 'Modern adaptive testing algorithms are markedly different ___ traditional fixed-length paper exams.',
      correct_answer: 'from',
      options: ['from', 'with', 'to', 'than']
    },
    {
      id: 8,
      term: 'similar to',
      type: 'adj + prep',
      meaning: 'tương tự',
      example: 'The hunting behavior of prehistoric dire wolves was strikingly similar to modern gray wolf packs.',
      blank_sentence: 'The sensory navigation mechanisms of bats are remarkably similar ___ artificial sonar systems.',
      correct_answer: 'to',
      options: ['to', 'with', 'as', 'like']
    },
    {
      id: 9,
      term: 'responsible for',
      type: 'adj + prep',
      meaning: 'chịu trách nhiệm về',
      example: 'Greenhouse gas emissions are largely responsible for global surface temperature anomalies.',
      blank_sentence: 'The lead climatologist is directly responsible ___ compiling the annual atmospheric survey.',
      correct_answer: 'for',
      options: ['for', 'of', 'with', 'to']
    },
    {
      id: 10,
      term: 'capable of',
      type: 'adj + prep',
      meaning: 'có khả năng làm gì',
      example: 'Deep neural networks are now capable of analyzing complex seismic waveforms in real time.',
      blank_sentence: 'Migratory raptors are physically capable ___ covering thousands of kilometers without landing.',
      correct_answer: 'of',
      options: ['of', 'to', 'for', 'with']
    },
    {
      id: 11,
      term: 'aware of',
      type: 'adj + prep',
      meaning: 'nhận thức được, biết về',
      example: 'Public health officials must ensure citizens are fully aware of viral transmission risks.',
      blank_sentence: 'Before undertaking field expeditions, researchers must be acutely aware ___ extreme weather hazards.',
      correct_answer: 'of',
      options: ['of', 'about', 'with', 'to']
    },
    {
      id: 12,
      term: 'grateful to',
      type: 'adj + prep',
      meaning: 'biết ơn ai',
      example: 'The doctoral candidate was deeply grateful to her mentor for continuous guidance.',
      blank_sentence: 'The scholarship recipients expressed sincere gratitude and were grateful ___ the alumni foundation.',
      correct_answer: 'to',
      options: ['to', 'with', 'for', 'towards']
    },
    {
      id: 13,
      term: 'depend on',
      type: 'verb + prep',
      meaning: 'phụ thuộc vào',
      example: 'Many Arctic predators heavily depend on pack ice thickness for successful hunting.',
      blank_sentence: 'Whether geothermal energy is commercially viable will depend largely ___ subterranean geological formations.',
      correct_answer: 'on',
      options: ['on', 'to', 'with', 'of']
    },
    {
      id: 14,
      term: 'rely on',
      type: 'verb + prep',
      meaning: 'dựa vào, tin cậy',
      example: 'Archaeologists rely on radiocarbon dating techniques to establish accurate historical chronologies.',
      blank_sentence: 'Spacecraft navigation systems rely heavily ___ pulsar timing signals for deep-space positioning.',
      correct_answer: 'on',
      options: ['on', 'in', 'to', 'with']
    },
    {
      id: 15,
      term: 'look after',
      type: 'phrasal verb',
      meaning: 'chăm sóc',
      example: 'Certain bird species exhibit cooperative breeding, where non-breeding helpers look after nestlings.',
      blank_sentence: 'In penguin colonies, both parents take turns to look ___ the newly hatched chick.',
      correct_answer: 'after',
      options: ['after', 'for', 'to', 'at']
    },
    {
      id: 16,
      term: 'agree on',
      type: 'verb + prep',
      meaning: 'thống nhất về một vấn đề',
      example: 'Delegates from fifty nations finally managed to agree on stricter international fishing quotas.',
      blank_sentence: 'The panel of astrophysicists could not agree ___ the precise mechanisms behind dark matter clustering.',
      correct_answer: 'on',
      options: ['on', 'with', 'to', 'about']
    },
    {
      id: 17,
      term: 'apologize for',
      type: 'verb + prep',
      meaning: 'xin lỗi vì một việc',
      example: 'The university spokesperson publicly apologized for the administrative oversight during registration.',
      blank_sentence: 'The laboratory director had to formally apologize ___ the delayed release of the trial results.',
      correct_answer: 'for',
      options: ['for', 'to', 'about', 'with']
    },
    {
      id: 18,
      term: 'apologize to',
      type: 'verb + prep',
      meaning: 'xin lỗi một người',
      example: 'The dean felt obligated to apologize to the student council for canceling the annual academic symposium.',
      blank_sentence: 'The company CEO was summoned to apologize directly ___ the affected community members.',
      correct_answer: 'to',
      options: ['to', 'for', 'with', 'towards']
    },
    {
      id: 19,
      term: 'apply for',
      type: 'verb + prep',
      meaning: 'ứng tuyển / xin một vị trí',
      example: 'Graduating seniors are encouraged to apply for competitive research fellowships early.',
      blank_sentence: 'Over five hundred postgraduates chose to apply ___ the newly funded climate science grant.',
      correct_answer: 'for',
      options: ['for', 'to', 'in', 'into']
    },
    {
      id: 20,
      term: 'apply to',
      type: 'verb + prep',
      meaning: 'nộp đơn vào một tổ chức; áp dụng cho',
      example: 'International applicants must satisfy rigorous English proficiency benchmarks when they apply to Ivy League institutions.',
      blank_sentence: 'The theoretical principles formulated in quantum mechanics do not directly apply ___ macro-scale physics.',
      correct_answer: 'to',
      options: ['to', 'for', 'into', 'with']
    },
    {
      id: 21,
      term: 'care about',
      type: 'verb + prep',
      meaning: 'quan tâm đến',
      example: 'Civic organizations care about equitable access to clean public drinking water.',
      blank_sentence: 'Modern consumers increasingly care ___ the environmental footprint of electronic goods.',
      correct_answer: 'about',
      options: ['about', 'for', 'to', 'with']
    },
    {
      id: 22,
      term: 'care for',
      type: 'verb + prep',
      meaning: 'chăm sóc, yêu thích',
      example: 'Nurses and hospice staff work tirelessly to care for terminally ill patients.',
      blank_sentence: 'In wild chimpanzee communities, older siblings often assist their mothers to care ___ younger offspring.',
      correct_answer: 'for',
      options: ['for', 'about', 'after', 'to']
    },
    {
      id: 23,
      term: 'complain about',
      type: 'verb + prep',
      meaning: 'phàn nàn về',
      example: 'Dormitory residents frequently complain about inadequate heating during sub-zero winter spells.',
      blank_sentence: 'Graduate students routinely complain ___ the excessive bureaucratic hurdles in grant approvals.',
      correct_answer: 'about',
      options: ['about', 'of', 'for', 'against']
    },
    {
      id: 24,
      term: 'concentrate on',
      type: 'verb + prep',
      meaning: 'tập trung vào',
      example: 'The revised curriculum encourages students to concentrate on critical thinking rather than rote memorization.',
      blank_sentence: 'Researchers must concentrate their efforts ___ identifying carbon sequestration alternatives.',
      correct_answer: 'on',
      options: ['on', 'in', 'to', 'at']
    },
    {
      id: 25,
      term: 'consist of',
      type: 'verb + prep',
      meaning: 'bao gồm',
      example: 'The examination module will consist of both quantitative reasoning problems and essay evaluations.',
      blank_sentence: 'A volcanic caldera often consists ___ a massive crater formed following explosive magma evacuation.',
      correct_answer: 'of',
      options: ['of', 'in', 'with', 'from']
    },
    {
      id: 26,
      term: 'deal with',
      type: 'verb + prep',
      meaning: 'xử lý, giải quyết',
      example: 'Urban planners must devise resilient infrastructure to deal with escalating sea-level rise.',
      blank_sentence: 'Psychologists have developed behavioral therapies to help individuals deal ___ severe social anxiety.',
      correct_answer: 'with',
      options: ['with', 'to', 'for', 'about']
    },
    {
      id: 27,
      term: 'suffer from',
      type: 'verb + prep',
      meaning: 'mắc phải, chịu ảnh hưởng từ',
      example: 'Children raised in densely polluted industrial corridors often suffer from chronic asthma.',
      blank_sentence: 'Developing arid regions suffer acutely ___ widespread drought and desertification.',
      correct_answer: 'from',
      options: ['from', 'of', 'with', 'by']
    },
    {
      id: 28,
      term: 'succeed in',
      type: 'verb + prep',
      meaning: 'thành công trong việc',
      example: 'Geneticists finally succeeded in synthesizing the targeted enzyme under controlled laboratory conditions.',
      blank_sentence: 'The conservation team succeeded ___ restoring the native wetland vegetation within three seasons.',
      correct_answer: 'in',
      options: ['in', 'at', 'with', 'to']
    },
    {
      id: 29,
      term: 'participate in',
      type: 'verb + prep',
      meaning: 'tham gia',
      example: 'Undergraduate volunteers were eager to participate in the sociological field surveys.',
      blank_sentence: 'Over thirty nations agreed to participate ___ the transnational satellite observation project.',
      correct_answer: 'in',
      options: ['in', 'into', 'to', 'with']
    },
    {
      id: 30,
      term: 'object to',
      type: 'verb + prep',
      meaning: 'phản đối',
      example: 'Several preservation societies object to constructing high-speed rail lines across historic battlefields.',
      blank_sentence: 'Bioethicists strongly object ___ unmonitored human germline editing without international oversight.',
      correct_answer: 'to',
      options: ['to', 'against', 'for', 'with']
    },
    {
      id: 31,
      term: 'insist on',
      type: 'verb + prep',
      meaning: 'nhất quyết làm / đòi hỏi',
      example: 'The journal editor insisted on peer reviewers submitting their evaluations within twenty-one days.',
      blank_sentence: 'The thesis committee will insist ___ seeing verifiable experimental reproducibility before sign-off.',
      correct_answer: 'on',
      options: ['on', 'in', 'upon', 'to']
    },
    {
      id: 32,
      term: 'recover from',
      type: 'verb + prep',
      meaning: 'hồi phục sau',
      example: 'Ecosystems often take decades to fully recover from catastrophic forest fires and soil erosion.',
      blank_sentence: 'The patient required six weeks of intensive physiotherapy to recover ___ the orthopedic trauma.',
      correct_answer: 'from',
      options: ['from', 'of', 'out', 'after']
    },
    {
      id: 33,
      term: 'think of',
      type: 'verb + prep',
      meaning: 'nghĩ gì về, đánh giá thế nào về',
      example: 'Historians frequently think of the printing press as the quintessential catalyst of the Enlightenment.',
      blank_sentence: 'What do prominent economists think ___ the prospect of central bank digital currencies replacing cash?',
      correct_answer: 'of',
      options: ['of', 'about', 'for', 'with']
    },
    {
      id: 34,
      term: 'prevent ... from',
      type: 'verb + obj + prep',
      meaning: 'ngăn ai / cái gì làm một việc',
      example: 'Vaccination campaigns seek to prevent contagious pathogens from spreading across vulnerable communities.',
      blank_sentence: 'Strict regulatory firewalls are deployed to prevent unauthorized intruders ___ accessing classified servers.',
      correct_answer: 'from',
      options: ['from', 'to', 'against', 'off']
    },
    {
      id: 35,
      term: 'protect ... from',
      type: 'verb + obj + prep',
      meaning: 'bảo vệ ai / cái gì khỏi',
      example: 'The Earth\'s magnetosphere protects the planetary biosphere from lethal solar wind particles.',
      blank_sentence: 'Mangrove forests serve as living barricades that protect coastal settlements ___ storm surges.',
      correct_answer: 'from',
      options: ['from', 'against', 'of', 'off']
    },
    {
      id: 36,
      term: 'provide ... with',
      type: 'verb + obj + prep',
      meaning: 'cung cấp cho ai cái gì',
      example: 'The university library provides registered scholars with complimentary access to digitized archival manuscripts.',
      blank_sentence: 'The federal relief initiative will provide displaced families ___ emergency subsidies and clean water.',
      correct_answer: 'with',
      options: ['with', 'to', 'for', 'of']
    },
    {
      id: 37,
      term: 'solution to',
      type: 'noun + prep',
      meaning: 'giải pháp cho',
      example: 'Renewable microgrid integration offers a sustainable solution to chronic rural energy deficits.',
      blank_sentence: 'Researchers have yet to pinpoint an infallible algorithmic solution ___ the traveling salesperson problem.',
      correct_answer: 'to',
      options: ['to', 'for', 'of', 'with']
    },
    {
      id: 38,
      term: 'reply to',
      type: 'noun / verb + prep',
      meaning: 'lời hồi đáp cho / phản hồi',
      example: 'The diplomat formulated an official reply to the diplomatic inquiry issued by the United Nations.',
      blank_sentence: 'Applicants are required to promptly reply ___ the admissions committee\'s interview offer.',
      correct_answer: 'to',
      options: ['to', 'for', 'with', 'at']
    },
    {
      id: 39,
      term: 'invitation to',
      type: 'noun + prep',
      meaning: 'lời mời tham dự',
      example: 'The keynote speaker graciously accepted an invitation to the annual neuroscience conference.',
      blank_sentence: 'Distinguished scholars received a formal invitation ___ attend the Royal Society colloquium.',
      correct_answer: 'to',
      options: ['to', 'for', 'into', 'with']
    },
    {
      id: 40,
      term: 'damage to',
      type: 'noun + prep',
      meaning: 'thiệt hại đối với',
      example: 'The category-5 cyclone caused catastrophic structural damage to offshore oil rigs.',
      blank_sentence: 'Excessive ultraviolet radiation can cause irreversible cellular damage ___ retinal tissue.',
      correct_answer: 'to',
      options: ['to', 'for', 'on', 'with']
    },
    {
      id: 41,
      term: 'increase in',
      type: 'noun + prep',
      meaning: 'sự gia tăng về',
      example: 'Atmospheric observatories recorded a sharp increase in carbon dioxide concentration over the past decade.',
      blank_sentence: 'Public health surveys demonstrated a noticeable increase ___ adolescent sedentary screen time.',
      correct_answer: 'in',
      options: ['in', 'of', 'to', 'with']
    },
    {
      id: 42,
      term: 'decrease in',
      type: 'noun + prep',
      meaning: 'sự sụt giảm về',
      example: 'Strict anti-poaching measures led to a measurable decrease in illegal wildlife trafficking.',
      blank_sentence: 'The seasonal report documented a 15% decrease ___ domestic manufacturing output.',
      correct_answer: 'in',
      options: ['in', 'of', 'from', 'with']
    },
    {
      id: 43,
      term: 'demand for',
      type: 'noun + prep',
      meaning: 'nhu cầu đối với',
      example: 'The transition toward electric vehicles has sparked skyrocketing international demand for cobalt and lithium.',
      blank_sentence: 'Global demand ___ certified organic agricultural produce has surged across major metropolitan hubs.',
      correct_answer: 'for',
      options: ['for', 'of', 'in', 'to']
    },
    {
      id: 44,
      term: 'relationship with',
      type: 'noun + prep',
      meaning: 'mối quan hệ với',
      example: 'Anthropologists explore the intricate symbiotic relationship with domestic canines throughout early human migration.',
      blank_sentence: 'The research university maintains an exceptional collaborative relationship ___ several biotech startups.',
      correct_answer: 'with',
      options: ['with', 'to', 'between', 'among']
    },
    {
      id: 45,
      term: 'connection with',
      type: 'noun + prep',
      meaning: 'mối liên hệ với',
      example: 'Epidemiologists uncovered a direct causal connection with contaminated municipal groundwater wells.',
      blank_sentence: 'The sociologist investigated the correlation and close connection ___ poverty rates and school dropout numbers.',
      correct_answer: 'with',
      options: ['with', 'between', 'to', 'for']
    },
    {
      id: 46,
      term: 'difference between',
      type: 'noun + prep',
      meaning: 'sự khác biệt giữa',
      example: 'The genetic difference between the two hominid subspecies was remarkably subtle.',
      blank_sentence: 'Neuroscientists are investigating the fundamental difference ___ REM sleep and deep slow-wave slumber.',
      correct_answer: 'between',
      options: ['between', 'with', 'from', 'among']
    },
    {
      id: 47,
      term: 'advantage of',
      type: 'noun + prep',
      meaning: 'ưu điểm của',
      example: 'One distinct advantage of solar photovoltaic panels is their minimal operational carbon footprint.',
      blank_sentence: 'The chief comparative advantage ___ algorithmic trading is its ability to execute orders in microseconds.',
      correct_answer: 'of',
      options: ['of', 'for', 'with', 'in']
    },
    {
      id: 48,
      term: 'disadvantage of',
      type: 'noun + prep',
      meaning: 'nhược điểm của',
      example: 'A recognized disadvantage of wind energy turbines is their intermittent generation profile.',
      blank_sentence: 'A major technical disadvantage ___ early lithium batteries was their susceptibility to thermal runaway.',
      correct_answer: 'of',
      options: ['of', 'with', 'for', 'to']
    },
    {
      id: 49,
      term: 'effect on',
      type: 'noun + prep',
      meaning: 'tác động đến',
      example: 'Chronic sleep deprivation exercises a profound detrimental effect on cognitive executive function.',
      blank_sentence: 'The new fiscal policy is forecasted to exert an immediate stabilizing effect ___ the currency market.',
      correct_answer: 'on',
      options: ['on', 'to', 'for', 'with']
    },
    {
      id: 50,
      term: 'experience of',
      type: 'noun + prep',
      meaning: 'kinh nghiệm làm việc gì',
      example: 'Candidates with direct practical experience of conducting archaeological field digs are given preference.',
      blank_sentence: 'Her extensive prior experience ___ managing multinational logistics teams proved invaluable.',
      correct_answer: 'of',
      options: ['of', 'with', 'in', 'for']
    },
    {
      id: 51,
      term: 'addicted to',
      type: 'adj + prep',
      meaning: 'nghiện',
      example: 'Neurochemical research reveals how dopamine surges cause individuals to become addicted to algorithmic feeds.',
      blank_sentence: 'Laboratory rats quickly became physiologically addicted ___ the synthetic sucrose stimulant.',
      correct_answer: 'to',
      options: ['to', 'with', 'in', 'on']
    },
    {
      id: 52,
      term: 'accustomed to',
      type: 'adj + prep',
      meaning: 'quen với',
      example: 'Highland indigenous communities have genetically grown accustomed to low ambient oxygen concentrations.',
      blank_sentence: 'Astronauts stationed on the ISS must become accustomed ___ living under microgravity conditions.',
      correct_answer: 'to',
      options: ['to', 'with', 'for', 'in']
    },
    {
      id: 53,
      term: 'allergic to',
      type: 'adj + prep',
      meaning: 'dị ứng với',
      example: 'An estimated two percent of school-age children are severely allergic to tree nuts and legumes.',
      blank_sentence: 'Immunological diagnostics confirmed that the patient was acutely allergic ___ synthetic penicillin.',
      correct_answer: 'to',
      options: ['to', 'with', 'from', 'against']
    },
    {
      id: 54,
      term: 'amazed at',
      type: 'adj + prep',
      meaning: 'kinh ngạc trước',
      example: 'Planetary scientists were amazed at the sheer complexity of geyser plumes erupting from Saturn\'s moon Enceladus.',
      blank_sentence: 'Early European voyagers were utterly amazed ___ the botanical diversity of the Amazonian rainforest.',
      correct_answer: 'at',
      options: ['at', 'with', 'by', 'of']
    },
    {
      id: 55,
      term: 'ashamed of',
      type: 'adj + prep',
      meaning: 'xấu hổ về',
      example: 'The politician felt visibly ashamed of the unethical campaign financing tactics used by his committee.',
      blank_sentence: 'No student should feel ashamed ___ asking for academic clarification during lectures.',
      correct_answer: 'of',
      options: ['of', 'for', 'about', 'with']
    },
    {
      id: 56,
      term: 'bored with',
      type: 'adj + prep',
      meaning: 'chán',
      example: 'Gifted pupils often grow bored with repetitive classroom drills when not offered enriched curriculum materials.',
      blank_sentence: 'Experimental subjects quickly became bored ___ performing redundant sensory recognition tasks.',
      correct_answer: 'with',
      options: ['with', 'of', 'about', 'by']
    },
    {
      id: 57,
      term: 'concerned about',
      type: 'adj + prep',
      meaning: 'quan ngại, lo lắng về',
      example: 'Global agricultural economists are deeply concerned about the depletion of the Ogallala Aquifer.',
      blank_sentence: 'Urban health authorities remain concerned ___ persistent particulate pollution in the subway system.',
      correct_answer: 'about',
      options: ['about', 'with', 'for', 'to']
    },
    {
      id: 58,
      term: 'crowded with',
      type: 'adj + prep',
      meaning: 'đông kín, đầy ắp',
      example: 'During peak morning hours, the central commuter transit terminus was completely crowded with commuters.',
      blank_sentence: 'The ancient bazaar was bustling and crowded ___ merchants trading spices and silk tapestries.',
      correct_answer: 'with',
      options: ['with', 'of', 'by', 'in']
    },
    {
      id: 59,
      term: 'disappointed with',
      type: 'adj + prep',
      meaning: 'thất vọng về',
      example: 'The lead investigator was disappointed with the inconclusive statistical correlation in the clinical trial.',
      blank_sentence: 'Consumers were disappointed ___ the lack of noticeable battery enhancements in the latest flagship model.',
      correct_answer: 'with',
      options: ['with', 'about', 'at', 'of']
    },
    {
      id: 60,
      term: 'familiar with',
      type: 'adj + prep',
      meaning: 'quen thuộc với',
      example: 'All graduate research assistants must become thoroughly familiar with institutional lab biosafety regulations.',
      blank_sentence: 'Exam candidates should be intimately familiar ___ the revised ETS TOEFL 2026 adaptive interface.',
      correct_answer: 'with',
      options: ['with', 'to', 'about', 'for']
    },
    {
      id: 61,
      term: 'keen on',
      type: 'adj + prep',
      meaning: 'rất thích, say mê',
      example: 'Young ornithologists are exceptionally keen on monitoring raptor migratory patterns along coastal thermals.',
      blank_sentence: 'Venture capitalists are increasingly keen ___ financing scalable oceanic wave-energy startups.',
      correct_answer: 'on',
      options: ['on', 'in', 'at', 'to']
    },
    {
      id: 62,
      term: 'suitable for',
      type: 'adj + prep',
      meaning: 'phù hợp với',
      example: 'Temperate volcanic soils with high nitrogen content are exceptionally suitable for viticulture.',
      blank_sentence: 'The alpine shelter was designed to be suitable ___ endurance expeditions under extreme blizzard conditions.',
      correct_answer: 'for',
      options: ['for', 'to', 'with', 'in']
    }
  ]
};

const STORAGE_KEY = 'toefl_study_notes_v1';

/**
 * Lấy toàn bộ danh sách ghi chú học tập
 */
export function getStoredNotes() {
  if (typeof window === 'undefined') return [INITIAL_PREPOSITION_NOTE];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([INITIAL_PREPOSITION_NOTE]));
      return [INITIAL_PREPOSITION_NOTE];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([INITIAL_PREPOSITION_NOTE]));
      return [INITIAL_PREPOSITION_NOTE];
    }
    return parsed;
  } catch (err) {
    console.error('Lỗi khi đọc study notes từ localStorage:', err);
    return [INITIAL_PREPOSITION_NOTE];
  }
}

/**
 * Lưu 1 ghi chú mới
 */
export function saveStudyNote(newNote) {
  if (typeof window === 'undefined') return;
  const current = getStoredNotes();
  const index = current.findIndex(n => n.id === newNote.id);
  let updated;
  if (index >= 0) {
    updated = current.map(n => n.id === newNote.id ? newNote : n);
  } else {
    updated = [newNote, ...current];
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

/**
 * Xóa 1 ghi chú theo ID
 */
export function deleteStudyNote(noteId) {
  if (typeof window === 'undefined') return;
  const current = getStoredNotes();
  const updated = current.filter(n => n.id !== noteId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

/**
 * Reset về dữ liệu mẫu mặc định
 */
export function resetStudyNotes() {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify([INITIAL_PREPOSITION_NOTE]));
  return [INITIAL_PREPOSITION_NOTE];
}
