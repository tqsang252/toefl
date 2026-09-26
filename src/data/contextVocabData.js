/**
 * BỘ NGÂN HÀNG 50 BÀI ĐỌC & CÂU HỎI TỪ VỰNG TRONG NGỮ CẢNH (VOCABULARY IN CONTEXT) CHUẨN TOEFL iBT
 * Mỗi item gồm:
 * - passage: Bài đọc đầy đủ (250-350 từ) chuẩn ETS với bối cảnh học thuật phong phú.
 * - target_word: Từ vựng được gạch chân / in đậm trong bài đọc.
 * - paragraph_index: Vị trí đoạn văn chứa từ (đã kiểm định 100% chính xác).
 * - question: Câu hỏi trắc nghiệm chuẩn "closest in meaning to".
 * - options: 4 phương án A, B, C, D (1 đúng + 3 bẫy kinh điển: liên tưởng chủ đề, trái nghĩa, nghĩa phụ).
 * - clue_type: Phân loại 5 dạng manh mối chuẩn ETS (Cause-Effect, Contrast, Definition, Collocation, Elaboration).
 * - clue_signal: Cụm từ / câu phát tín hiệu manh mối trong bài.
 * - explanation: Giải mã chuyên sâu, Thử nghiệm thế chỗ (Substitution Test) và Bóc trần bẫy ETS.
 */

export const CONTEXT_VOCAB_BANK = [
  {
    "id": "vic_01",
    "title": "Ancient Maritime Migration in the Mediterranean",
    "topic": "Archaeology & Anthropology",
    "target_word": "deliberate",
    "paragraph_index": 1,
    "passage": "For much of the twentieth century, archaeologists assumed that substantial open-water voyages began only after farming societies developed sophisticated boats. Discoveries on islands that were never connected to continental landmasses have complicated this view. Stone tools and animal remains found on several Mediterranean islands indicate human visits thousands of years before agriculture became established there. Because reaching these islands required crossing visible stretches of sea, even relatively early travelers must have possessed some capacity for deliberate maritime movement.\n\nDetermining the sophistication of that capacity is difficult. Watercraft made from reeds, wood, or animal skins rarely survive archaeologically, so researchers often rely on indirect evidence. One approach compares stone from island sites with geological sources on neighboring mainland regions. When the chemical composition of an artifact matches a distant source, archaeologists can infer that either people or materials crossed the sea. Yet such evidence does not necessarily demonstrate direct long-distance navigation. Obsidian, for example, might have moved through a sequence of short voyages and exchanges rather than a single expedition.\n\nExperimental archaeology has provided another perspective. Researchers have constructed simple vessels using materials and techniques likely available to prehistoric communities and demonstrated that such craft can survive moderate sea crossings. These experiments suggest that voyaging did not require monumental ships, only purposeful navigation and basic maritime skill.",
    "question": "The word 'deliberate' in paragraph 1 is closest in meaning to:",
    "options": {
      "A": "dangerous",
      "B": "frequent",
      "C": "unrecorded",
      "D": "intentional"
    },
    "correct_answer": "D",
    "clue_type": "Cause & Effect (Nguyên nhân - Hệ quả)",
    "clue_signal": "Because reaching these islands required crossing visible stretches of sea... must have possessed some capacity for...",
    "explanation": {
      "meaning": "Trong ngữ cảnh hàng hải học thuật, 'deliberate' là tính từ mang nghĩa 'có chủ đích, có định hướng rõ ràng' (đối lập với trôi dạt ngẫu nhiên theo sóng gió).",
      "substitution": "Thế chỗ: 'capacity for intentional maritime movement' (khả năng di chuyển trên biển có chủ đích) hoàn toàn khớp với lập luận người tiền sử chủ động vượt biển đến các hòn đảo.",
      "trap_breakdown": {
        "A": "dangerous (nguy hiểm) — Bẫy liên tưởng: Vượt biển thời tiền sử nghe có vẻ nguy hiểm, nhưng câu văn đang nhấn mạnh năng lực định hướng chứ không phải mức độ rủi ro.",
        "B": "frequent (thường xuyên) — Bẫy tần suất: Không có dữ kiện nào trong câu nói về số lần hay tần suất di chuyển.",
        "C": "unrecorded (chưa được ghi nhận) — Bẫy chủ đề khảo cổ: Thí sinh hay liên tưởng vì bài đọc nói di tích khảo cổ hiếm khi tồn tại, nhưng 'unrecorded' hoàn toàn sai nghĩa của deliberate."
      },
      "synonyms": [
        "intentional",
        "purposeful",
        "planned",
        "calculated"
      ]
    }
  },
  {
    "id": "vic_02",
    "title": "Hydrothermal Vents and Deep-Sea Chemosynthesis",
    "topic": "Marine Biology",
    "target_word": "ubiquitous",
    "paragraph_index": 2,
    "passage": "Prior to the late 1970s, marine biologists operated under the consensus that all marine ecosystems were directly or indirectly reliant upon solar radiation for primary production. Sunlight-driven photosynthesis in epipelagic surface waters was deemed the indispensable foundation of oceanic food webs. This paradigm was upended with the discovery of hydrothermal vents along mid-ocean spreading ridges, thousands of meters beneath the euphotic zone.\n\nIn these pitch-black abyssal environments, microbial chemosynthesis replaces photosynthesis. Chemolithoautotrophic bacteria oxidize hydrogen sulfide and other reduced inorganic compounds discharging from superheated geothermal plumes, fixing dissolved carbon into organic biomass. While sunlight is ubiquitous in terrestrial and shallow marine zones, its total absence in the bathypelagic realm makes these sulfide-oxidizing microbes the sole primary producers supporting dense communities of giant tube worms, blind shrimp, and benthic crabs.\n\nThese chemosynthetic organisms demonstrate remarkable physiological adaptations. Giant tube worms (Riftia pachyptila), which lack a functional digestive tract, harbor dense colonies of symbiotic bacteria within a specialized vascular organ called the trophosome. The worms' crimson plumes bind hydrogen sulfide and oxygen simultaneously, shuttling both metabolites through unique hemoglobin molecules directly to their internal symbionts.",
    "question": "The word 'ubiquitous' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "ever-present",
      "B": "diminishing",
      "C": "temporary",
      "D": "hazardous"
    },
    "correct_answer": "A",
    "clue_type": "Contrast & Opposition (Tương phản - Đối lập)",
    "clue_signal": "While sunlight is ubiquitous in terrestrial and shallow marine zones, its total absence in the bathypelagic realm...",
    "explanation": {
      "meaning": "'Ubiquitous' mang nghĩa có mặt ở khắp mọi nơi, luôn luôn hiện diện.",
      "substitution": "Thế chỗ: 'While sunlight is ever-present in terrestrial and shallow marine zones' đối lập hoàn hảo với vế sau 'its total absence' (sự vắng mặt hoàn toàn ở tầng đáy sâu).",
      "trap_breakdown": {
        "B": "diminishing (giảm dần) — Bẫy suy diễn: Ánh sáng giảm dần theo độ sâu, nhưng 'ubiquitous' ở đây nói về vùng cạn và trên cạn nơi ánh nắng luôn tràn ngập.",
        "C": "temporary (tạm thời) — Sai nghĩa: Ánh nắng trên bề mặt là hiện tượng thường xuyên, không phải tạm bợ.",
        "D": "hazardous (nguy hiểm) — Sai hoàn toàn ngữ cảnh học thuật."
      },
      "synonyms": [
        "omnipresent",
        "ever-present",
        "pervasive",
        "widespread"
      ]
    }
  },
  {
    "id": "vic_03",
    "title": "The Industrial Revolution and Urban Sanitation",
    "topic": "History & Public Health",
    "target_word": "precipitated",
    "paragraph_index": 2,
    "passage": "The unprecedented demographic migration from rural agrarian hamlets to manufacturing centers during the nineteenth century placed catastrophic strain on municipal infrastructure. Cities like Manchester and London grew at rates that overwhelmed rudimentary drainage systems, cesspools, and local aquifers. Raw domestic waste and industrial effluents were routinely discharged directly into tributary rivers that simultaneously served as municipal culinary water supplies.\n\nThis pervasive lack of sanitation precipitated recurring epidemics of waterborne pathogens, most notably Asiatic cholera. Throughout the 1830s and 1840s, cholera outbreaks decimated working-class tenements with appalling swiftness. Public health officials initially ascribed the disease to 'miasma'—foul airborne vapor emanating from decomposing refuse. It was not until physician John Snow mapped cholera fatalities around the Broad Street water pump in Soho in 1854 that the causal linkage between contaminated well water and disease transmission was empirically substantiated.\n\nSnow's epidemiological breakthrough catalyzed massive municipal engineering reforms. Metropolitan boards commissioned subterranean brick sewer networks to divert wastewater far downriver from metropolitan intake points, fundamentally transforming nineteenth-century urban demography.",
    "question": "The word 'precipitated' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "triggered",
      "B": "prevented",
      "C": "documented",
      "D": "alleviated"
    },
    "correct_answer": "A",
    "clue_type": "Cause & Effect (Nguyên nhân - Hệ quả)",
    "clue_signal": "This pervasive lack of sanitation precipitated recurring epidemics... outbreaks decimated working-class tenements...",
    "explanation": {
      "meaning": "'Precipitate' trong văn cảnh lịch sử/khoa học là ngoại động từ có nghĩa là 'châm ngòi, thúc đẩy, gây ra đột ngột' một biến cố nghiêm trọng.",
      "substitution": "Thế chỗ: 'This pervasive lack of sanitation triggered recurring epidemics' (Tình trạng mất vệ sinh tràn lan này đã châm ngòi cho các đợt dịch bệnh bùng phát).",
      "trap_breakdown": {
        "B": "prevented (ngăn chặn) — Bẫy trái nghĩa hoàn toàn với nguyên nhân dẫn đến dịch bệnh.",
        "C": "documented (ghi chép lại) — Bẫy hành động nghiên cứu: Việc ghi chép chỉ diễn ra sau đó, không phải là hệ quả trực tiếp từ ô nhiễm.",
        "D": "alleviated (làm giảm nhẹ) — Bẫy trái nghĩa: Ô nhiễm làm bệnh bùng phát chứ không giảm bớt."
      },
      "synonyms": [
        "triggered",
        "instigated",
        "brought about",
        "sparked"
      ]
    }
  },
  {
    "id": "vic_04",
    "title": "Cognitive Load Theory and Multimedia Learning",
    "topic": "Cognitive Science & Education",
    "target_word": "extraneous",
    "paragraph_index": 3,
    "passage": "Cognitive Load Theory posits that human working memory possesses a strictly finite capacity when processing novel incoming informational cues. Unlike long-term memory, which functions as an essentially boundless repository for structured mental schemas, working memory can manipulate only a handful of discrete informational chunks simultaneously before cognitive overload impairs schema acquisition.\n\nEducational psychologists delineate cognitive load into three distinct dimensions: intrinsic, germane, and extraneous. Intrinsic load reflects the innate complexity of the subject matter itself, while germane load denotes the productive mental processing dedicated to schema formation. In contrast, extraneous cognitive load arises from suboptimal instructional design, such as redundant text, confusing navigational interfaces, or decorative background animations. Eliminating extraneous demands is vital, as unnecessary sensory processing squanders cognitive bandwidth that learners would otherwise channel into synthesizing core concepts.\n\nEmpirical studies confirm that when instructional materials coordinate synchronized visual graphics and spoken narration rather than displaying dense on-screen text alongside images, extraneous load declines substantially. This phenomenon, known as the modality effect, leverages dual processing channels in working memory.",
    "question": "The word 'extraneous' in paragraph 3 is closest in meaning to:",
    "options": {
      "A": "unnecessary",
      "B": "fundamental",
      "C": "complex",
      "D": "beneficial"
    },
    "correct_answer": "A",
    "clue_type": "Contrast & Elaboration (Tương phản & Diễn giải)",
    "clue_signal": "suboptimal instructional design... Eliminating extraneous demands is vital, as unnecessary sensory processing squanders...",
    "explanation": {
      "meaning": "'Extraneous' mang nghĩa 'không liên quan, thừa thãi, không cần thiết'.",
      "substitution": "Thế chỗ: 'Eliminating unnecessary demands is vital' hoàn toàn tương thích với câu tiếp theo 'unnecessary sensory processing squanders cognitive bandwidth'.",
      "trap_breakdown": {
        "B": "fundamental (cơ bản, cốt lõi) — Bẫy trái nghĩa: Extraneous load là phụ tải thừa thãi, đối lập với cái căn bản.",
        "C": "complex (phức tạp) — Bẫy gây nhiễu: Nội dung phức tạp thuộc về intrinsic load, không phải extraneous load.",
        "D": "beneficial (có lợi) — Bẫy sai đánh giá: Tác giả nhấn mạnh loại tải này gây lãng phí năng lực não bộ."
      },
      "synonyms": [
        "unnecessary",
        "irrelevant",
        "superfluous",
        "redundant"
      ]
    }
  },
  {
    "id": "vic_05",
    "title": "Glacial Ice Core Records and Paleoclimate",
    "topic": "Paleoclimatology & Geology",
    "target_word": "pristine",
    "paragraph_index": 1,
    "passage": "Deep polar ice sheets in central Greenland and the Antarctic continental interior represent unparalleled paleoenvironmental archives. As annual snowfall accumulates layer upon layer without melting, ambient atmospheric gases become trapped within microscopic air bubbles sealed off during the firn-to-ice transition. Because these interior plateaus experience minimal sublimation and zero seasonal melting, the deeply buried strata preserve a pristine chronological sequence of primordial atmospheric chemistry.\n\nBy analyzing stable isotopic ratios—particularly deuterium and oxygen-18—within the solid ice lattice, paleoclimatologists reconstruct past sea surface temperatures and planetary evaporation regimes spanning hundreds of thousands of years. Simultaneously, mass spectrometry of the encapsulated gas bubbles yields precise measurements of historical carbon dioxide and methane concentrations.\n\nThese records reveal an intimate, synchronized coupling between greenhouse gas atmospheric concentrations and global temperature variations across multiple glacial-interglacial Milankovitch cycles. Whenever greenhouse gases peaked, planetary temperatures responded in tandem, corroborating thermodynamic climate forcing models.",
    "question": "The word 'pristine' in paragraph 1 is closest in meaning to:",
    "options": {
      "A": "undamaged",
      "B": "artificial",
      "C": "temporary",
      "D": "hazardous"
    },
    "correct_answer": "A",
    "clue_type": "Cause & Effect / Definition (Nguyên nhân & Định nghĩa)",
    "clue_signal": "without melting... minimal sublimation and zero seasonal melting, the deeply buried strata preserve a pristine chronological sequence...",
    "explanation": {
      "meaning": "'Pristine' mang nghĩa nguyên sơ, không bị tổn hại hay thay đổi, còn nguyên trạng thái ban đầu.",
      "substitution": "Thế chỗ: 'preserve an undamaged / intact chronological sequence' hoàn toàn khớp với tiền đề không có sự tan chảy hay thăng hoa làm xáo trộn lớp băng.",
      "trap_breakdown": {
        "B": "artificial (nhân tạo) — Bẫy trái nghĩa: Băng hình thành hoàn toàn tự nhiên hàng trăm ngàn năm.",
        "C": "temporary (tạm thời) — Bẫy trái nghĩa: Các lớp băng tồn tại vĩnh cửu hàng triệu năm.",
        "D": "hazardous (nguy hiểm) — Không liên quan ngữ cảnh khoa học địa chất."
      },
      "synonyms": [
        "undamaged",
        "unspoiled",
        "intact",
        "flawless",
        "immaculate"
      ]
    }
  },
  {
    "id": "vic_06",
    "title": "Bees and Floral Communication Signals",
    "topic": "Botany & Zoology",
    "target_word": "conspicuous",
    "paragraph_index": 2,
    "passage": "Angiosperm evolution has been intrinsically linked to the sensory capabilities of insect pollinators for over one hundred million years. Flowering plants invest substantial metabolic energy into synthesizing volatile organic compounds, energetic nectar secretions, and vivid petal pigments designed specifically to attract winged foraging agents such as bumblebees and honeybees.\n\nVisual signaling operates across multiple spectral wavelengths. While humans perceive color primarily within the 400 to 700 nanometer spectrum, hymenopteran visual receptors possess photoreceptors sensitive to near-ultraviolet radiation. Consequently, flowers display conspicuous ultraviolet bullseye patterns invisible to mammalian predators but intensely luminous to approaching bees. These patterns, known as floral nectar guides, function as directional landing strips steering insects directly toward reproductive anthers and nectaries.\n\nFurthermore, recent biophysical research demonstrates that visiting bees alter the electrostatic potential of flowers. As a flying bee accumulates positive atmospheric charge via air friction, landing on a negatively charged flower creates a subtle electric field shift. Neighboring foraging bees detect this shift, allowing them to assess whether a blossom has recently been depleted of nectar without wasting time landing.",
    "question": "The word 'conspicuous' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "noticeable",
      "B": "concealed",
      "C": "fragile",
      "D": "unreliable"
    },
    "correct_answer": "A",
    "clue_type": "Elaboration & Definition (Mở rộng & Diễn giải)",
    "clue_signal": "display conspicuous ultraviolet bullseye patterns... intensely luminous to approaching bees... function as directional landing strips...",
    "explanation": {
      "meaning": "'Conspicuous' là tính từ chỉ những thứ dễ thấy, nổi bật, thu hút sự chú ý rõ rệt.",
      "substitution": "Thế chỗ: 'flowers display noticeable / prominent ultraviolet patterns' ăn khớp hoàn toàn với việc các hoa văn này phát sáng rực rỡ để dẫn đường cho ong đáp xuống.",
      "trap_breakdown": {
        "B": "concealed (ẩn giấu) — Bẫy nhầm lẫn: Tuy hoa văn này ẩn với mắt người (invisible to mammalian predators) nhưng với loài ong nó lại cực kỳ nổi bật, và câu đang nói về góc nhìn của ong.",
        "C": "fragile (mỏng manh) — Bẫy liên tưởng về cánh hoa mỏng manh, không phải nghĩa của từ.",
        "D": "unreliable (không đáng tin) — Sai lệch logic sinh học."
      },
      "synonyms": [
        "noticeable",
        "prominent",
        "striking",
        "discernible"
      ]
    }
  },
  {
    "id": "vic_07",
    "title": "The Collapse of the Late Bronze Age Civilizations",
    "topic": "Ancient History",
    "target_word": "cataclysmic",
    "paragraph_index": 1,
    "passage": "Around 1200 BCE, the eastern Mediterranean experienced an unprecedented systemic disintegration that abruptly terminated centuries of sophisticated diplomatic, cultural, and mercantile interaction. Flourishing palatial economies—including the Mycenaean kingdoms of mainland Greece, the Hittite Empire in central Anatolia, and prosperous Levantine trading emporia like Ugarit—collapsed within a span of merely several decades. This cataclysmic disintegration wiped out literate bureaucratic administration and inaugurated a protracted regional dark age.\n\nHistorians long debated a monocausal explanation for this synchronized downfall. Early twentieth-century scholars frequently attributed the destruction exclusively to marauding seafaring invaders known collectively in Egyptian inscriptions as the 'Sea Peoples.' However, contemporary archaeological excavations illuminate a far more convoluted systems collapse. Palaces sustained severe localized burns, but sediment core data also indicate prolonged, severe regional megadroughts that devastated agricultural yields and spurred widespread famine.\n\nThe interconnected nature of Bronze Age globalization proved fatal. Because these palace economies maintained intense interdependent trade networks reliant on copper from Cyprus and tin from Afghanistan for bronze manufacture, the collapse of any single node reverberated violently through the entire geopolitical architecture.",
    "question": "The word 'cataclysmic' in paragraph 1 is closest in meaning to:",
    "options": {
      "A": "disastrous",
      "B": "gradual",
      "C": "beneficial",
      "D": "anticipated"
    },
    "correct_answer": "A",
    "clue_type": "Restatement & Context (Diễn giải & Ngữ cảnh)",
    "clue_signal": "collapsed within a span of merely several decades. This cataclysmic disintegration wiped out... regional dark age.",
    "explanation": {
      "meaning": "'Cataclysmic' xuất phát từ gốc địa chấn/thảm họa, mang nghĩa 'mang tính thảm họa hủy diệt dữ dội'.",
      "substitution": "Thế chỗ: 'This disastrous / devastating disintegration wiped out literate bureaucratic administration' (Sự sụp đổ thảm khốc này đã quét sạch bộ máy cai trị...).",
      "trap_breakdown": {
        "B": "gradual (dần dần) — Bẫy sai thời gian: Bài đọc nhấn mạnh biến cố xảy ra nhanh chóng chỉ trong vài thập kỷ (merely several decades), không phải chậm rãi.",
        "C": "beneficial (có lợi) — Trái ngược hoàn toàn với việc dẫn tới thời kỳ đen tối (regional dark age).",
        "D": "anticipated (được dự báo trước) — Biến cố xảy ra đột ngột và bất ngờ, không ai lường trước."
      },
      "synonyms": [
        "disastrous",
        "calamitous",
        "devastating",
        "catastrophic"
      ]
    }
  },
  {
    "id": "vic_08",
    "title": "Cellular Senescence and Aging Biology",
    "topic": "Genetics & Cell Biology",
    "target_word": "perpetual",
    "paragraph_index": 1,
    "passage": "Normal mammalian somatic cells do not possess the capacity for perpetual mitotic proliferation. In the early 1960s, cell biologist Leonard Hayflick demonstrated that cultured human diploid fibroblasts could divide only approximately fifty times before entering an irreversible state of proliferative arrest. This phenomenon, subsequently designated the 'Hayflick limit,' established that cellular replication is strictly bounded rather than intrinsically infinite.\n\nThe molecular mechanism governing this proliferative ceiling resides in the architecture of linear chromosomes. During DNA replication, conventional DNA polymerase enzymes cannot fully duplicate the extreme terminal ends of the lagging DNA strand—a biochemical limitation termed the 'end-replication problem.' Consequently, specialized repetitive hexamer sequences called telomeres shorten progressively with each successive division cycle. When telomeric caps erode to a critically truncated length, the cell interprets exposed chromosome ends as double-strand DNA breaks, activating permanent cell-cycle checkpoints.\n\nAlthough senescent cells cease replication, they remain metabolically active. They secrete an array of proinflammatory cytokines, chemokines, and matrix metalloproteinases collectively designated the senescence-associated secretory phenotype (SASP), which degrades surrounding extracellular matrix and promotes tissue degradation.",
    "question": "The word 'perpetual' in paragraph 1 is closest in meaning to:",
    "options": {
      "A": "continuous",
      "B": "temporary",
      "C": "accidental",
      "D": "unfavorable"
    },
    "correct_answer": "A",
    "clue_type": "Contrast & Definition (Tương phản & Định nghĩa)",
    "clue_signal": "do not possess the capacity for perpetual mitotic proliferation... replication is strictly bounded rather than intrinsically infinite.",
    "explanation": {
      "meaning": "'Perpetual' là tính từ mang nghĩa bất tận, không ngừng nghỉ, vĩnh viễn liên tục.",
      "substitution": "Thế chỗ: 'do not possess the capacity for continuous / unending mitotic proliferation' tương phản trực tiếp với câu sau: tế bào bị giới hạn chỉ khoảng 50 lần phân chia.",
      "trap_breakdown": {
        "B": "temporary (tạm thời) — Bẫy trái nghĩa: Sự phân chia thực tế là tạm thời vì có giới hạn, nhưng câu đang phủ định 'do not possess perpetual' nghĩa là tế bào KHÔNG THỂ phân chia vĩnh viễn.",
        "C": "accidental (ngẫu nhiên) — Quá trình phân bào là có cơ chế sinh học, không phải ngẫu nhiên.",
        "D": "unfavorable (bất lợi) — Không phù hợp ngữ cảnh khoa học tế bào."
      },
      "synonyms": [
        "continuous",
        "unceasing",
        "everlasting",
        "perennial"
      ]
    }
  },
  {
    "id": "vic_09",
    "title": "Urban Microclimates and the Heat Island Effect",
    "topic": "Urban Geography & Architecture",
    "target_word": "exacerbate",
    "paragraph_index": 2,
    "passage": "Metropolitan agglomerations modify local thermodynamic regimes profoundly, creating localized atmospheric anomalies known as urban heat islands (UHIs). In typical metropolitan core areas, ambient air temperatures frequently exceed surrounding rural baselines by as much as four to eight degrees Celsius during calm nocturnal hours. This thermal differential alters localized precipitation convective patterns and increases peak energy demands for indoor air conditioning.\n\nMultiple structural and material factors exacerbate this thermal disparity. Traditional building materials such as asphalt paving, poured concrete, and roofing tiles possess high thermal admittance and bulk heat capacities, causing them to absorb massive quantities of incident solar radiation throughout daytime hours and reradiate thermal infrared slowly throughout the night. Moreover, the vertical geometry of urban street canyons impedes radiative cooling by trapping reflected heat between high-rise facades, while the widespread scarcity of vegetative canopy cover curtails natural evaporative cooling.\n\nTo mitigate metropolitan heat retention, contemporary urban planners advocate high-albedo cool roofs and extensive vegetative retrofits. Planting reflective deciduous street trees provides seasonal solar shading in summer while facilitating winter radiative penetration when leaves drop.",
    "question": "The word 'exacerbate' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "intensify",
      "B": "eliminate",
      "C": "disguise",
      "D": "stabilize"
    },
    "correct_answer": "A",
    "clue_type": "Elaboration / Cause (Mở rộng & Nguyên nhân)",
    "clue_signal": "Multiple structural and material factors exacerbate this thermal disparity. Traditional materials... absorb massive quantities... reradiate slowly...",
    "explanation": {
      "meaning": "'Exacerbate' là ngoại động từ chỉ hành động làm trầm trọng thêm, làm gia tăng mức độ tiêu cực của một vấn đề.",
      "substitution": "Thế chỗ: 'Multiple factors intensify / worsen this thermal disparity' (Nhiều yếu tố cấu trúc làm trầm trọng thêm sự chênh lệch nhiệt độ này).",
      "trap_breakdown": {
        "B": "eliminate (loại bỏ) — Bẫy trái nghĩa: Các yếu tố này làm hiện tượng nóng thêm chứ không hề xóa bỏ nó.",
        "C": "disguise (che giấu) — Hiện tượng nhiệt độ chênh lệch là hoàn toàn rõ ràng đo đạc được.",
        "D": "stabilize (ổn định) — Ngược với việc làm gia tăng biên độ nhiệt."
      },
      "synonyms": [
        "intensify",
        "worsen",
        "aggravate",
        "magnify"
      ]
    }
  },
  {
    "id": "vic_10",
    "title": "Echolocation and Auditory Processing in Bats",
    "topic": "Zoology & Acoustics",
    "target_word": "discern",
    "paragraph_index": 2,
    "passage": "Microchiropteran bats navigate and forage through complete nocturnal darkness via biosonar, a biological auditory mechanism known as echolocation. While flying at high velocity, these mammals emit intense ultrasonic vocalizations—often exceeding 110 decibels—through their larynx or specialized nasal structures, subsequently analyzing the returning echo reflections to construct a real-time multidimensional acoustic map of their physical surroundings.\n\nThe acoustic precision of this sensory system is extraordinary. By comparing the minute temporal delay between pulse emission and echo reception, bats compute the precise distance to airborne prey. Furthermore, subtle Doppler frequency shifts in returning echoes enable hunting bats to discern whether a target insect is fluttering toward or away from them, as well as calculate its instantaneous wingbeat frequency.\n\nTo prevent self-induced deafness caused by their deafening ultrasonic cries, bats possess a specialized auditory reflex. Tiny middle-ear muscles (the stapedius and tensor tympani) contract milliseconds prior to each laryngeal vocalization, mechanically damping the acoustic transmission across the ossicular bones, and then immediately relax to capture the faint returning echoes.",
    "question": "The word 'discern' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "distinguish",
      "B": "ignore",
      "C": "provoke",
      "D": "accelerate"
    },
    "correct_answer": "A",
    "clue_type": "Syntactic Fit & Meaning (Sắc thái ngữ pháp & Nghĩa)",
    "clue_signal": "enable hunting bats to discern whether a target insect is fluttering toward or away from them, as well as calculate...",
    "explanation": {
      "meaning": "'Discern' mang nghĩa nhận biết, phân biệt rõ ràng giữa hai hoặc nhiều trạng thái bằng giác quan hoặc trí tuệ.",
      "substitution": "Thế chỗ: 'enable hunting bats to distinguish / detect whether a target insect is fluttering toward or away' (giúp dơi săn mồi phân biệt được côn trùng đang bay lại gần hay bay ra xa).",
      "trap_breakdown": {
        "B": "ignore (phớt lờ) — Bẫy trái nghĩa: Dơi cần phân tích chi tiết để bắt mồi chứ không phớt lờ.",
        "C": "provoke (khiêu khích) — Không phù hợp về mặt ngữ nghĩa sinh học.",
        "D": "accelerate (tăng tốc) — Bẫy nhầm lẫn do trong câu có nhắc tới bay nhanh và tần số cánh đập."
      },
      "synonyms": [
        "distinguish",
        "differentiate",
        "detect",
        "perceive"
      ]
    }
  },
  {
    "id": "vic_11",
    "title": "Planetary Accretion and Earth's Early Core",
    "topic": "Astronomy & Geophysics",
    "target_word": "homogeneous",
    "paragraph_index": 1,
    "passage": "Modern astrophysical models demonstrate that terrestrial planets coalesced roughly 4.5 billion years ago via the gravitational accretion of solid planetesimals within the protoplanetary nebula. In the initial phases of accretion, the proto-Earth was likely a relatively homogeneous mixture of silicate rock, metallic iron, and volatile ice compounds, lacking the distinct concentric compositional layers observable today.\n\nAs kinetic impacts from colliding asteroidal bodies deposited colossal energy, radioactive decay of short-lived isotopes such as aluminum-26 compounded planetary heating. Eventually, temperatures throughout the mantle reached the melting point of iron-nickel alloys. Because liquid metal is significantly denser than ambient silicate magma, gravitationally driven segregation occurred: molten metallic iron percolated downward toward the planetary center, displacing buoyant silicate melts upward.\n\nThis planetary differentiation fundamentally transformed Earth's geophysics. The descending metallic iron released immense gravitational potential energy as additional heat, accelerating internal stratification and establishing the molten outer core that sustains Earth's protective geomagnetic shield today.",
    "question": "The word 'homogeneous' in paragraph 1 is closest in meaning to:",
    "options": {
      "A": "uniform",
      "B": "fragmented",
      "C": "turbulent",
      "D": "transparent"
    },
    "correct_answer": "A",
    "clue_type": "Contrast & Definition (Tương phản & Định nghĩa)",
    "clue_signal": "relatively homogeneous mixture... lacking the distinct concentric compositional layers observable today.",
    "explanation": {
      "meaning": "'Homogeneous' mang nghĩa đồng nhất, phân bố đều đặn thành một khối thống nhất không phân tầng.",
      "substitution": "Thế chỗ: 'relatively uniform mixture... lacking distinct layers' (hỗn hợp tương đối đồng nhất, chưa có các tầng lớp tách biệt như ngày nay).",
      "trap_breakdown": {
        "B": "fragmented (bị chia cắt, vụn vặt) — Bẫy nhầm lẫn: Ban đầu là do các tiểu hành tinh va chạm tạo nên, nhưng vật chất hòa trộn thành một khối đồng nhất.",
        "C": "turbulent (hỗn loạn) — Bẫy miêu tả sự va chạm nhưng không phản ánh tính chất cấu trúc đồng nhất.",
        "D": "transparent (trong suốt) — Không liên quan đến tính chất địa chất."
      },
      "synonyms": [
        "uniform",
        "consistent",
        "unvarying",
        "homogenous"
      ]
    }
  },
  {
    "id": "vic_12",
    "title": "Plant Hormone Auxin and Phototropism",
    "topic": "Plant Physiology",
    "target_word": "elicit",
    "paragraph_index": 3,
    "passage": "Sessile terrestrial plants lack muscular motility and must therefore optimize environmental resource acquisition through directional growth movements termed tropisms. Among the most extensively documented physiological responses is phototropism—the capacity of young vegetative stems to bend toward an incident light source to maximize photosynthetic capture.\n\nCharles Darwin and his son Francis initiated the experimental investigation of this phenomenon by shielding the apical coleoptiles of canary grass seedlings with opaque foil, demonstrating that the sensory perception of light occurs exclusively at the tip. Decades later, Frits Went demonstrated that an endogenous diffusible biochemical agent, subsequently identified as the phytohormone auxin (indole-3-acetic acid), was responsible for directional bending. Light does not destroy auxin; rather, unilateral illumination causes auxin to redistribute asymmetrically to the shaded side of the stem.\n\nAccumulated auxin molecules on the shaded flank elicit rapid cell wall loosening by activating proton pumps that acidify the apoplastic space. This cellular acidification activates expansin enzymes, permitting internal turgor pressure to elongate shaded cells faster than illuminated cells, mechanically forcing the stem tip to curve toward the light.",
    "question": "The word 'elicit' in paragraph 3 is closest in meaning to:",
    "options": {
      "A": "prompt",
      "B": "repress",
      "C": "delay",
      "D": "withhold"
    },
    "correct_answer": "A",
    "clue_type": "Cause & Effect (Nguyên nhân - Hệ quả)",
    "clue_signal": "Accumulated auxin molecules... elicit rapid cell wall loosening by activating proton pumps that acidify...",
    "explanation": {
      "meaning": "'Elicit' là ngoại động từ chỉ hành động khơi gợi, kích hoạt, thúc đẩy một phản ứng sinh hóa hoặc cảm xúc.",
      "substitution": "Thế chỗ: 'Auxin molecules on the shaded flank prompt / trigger rapid cell wall loosening' (Các phân tử auxin tích tụ làm kích hoạt sự nới lỏng vách tế bào).",
      "trap_breakdown": {
        "B": "repress (kìm hãm) — Bẫy trái nghĩa: Auxin kích thích kéo dài tế bào chứ không kìm nén.",
        "C": "delay (trì hoãn) — Trái ngược với từ 'rapid' (nhanh chóng) ngay phía sau.",
        "D": "withhold (giữ lại, từ chối đưa ra) — Sai lệch hoàn toàn ngữ cảnh sinh lý thực vật."
      },
      "synonyms": [
        "prompt",
        "trigger",
        "induce",
        "stimulate"
      ]
    }
  },
  {
    "id": "vic_13",
    "title": "Vocal Learning in Songbirds and Humans",
    "topic": "Ethology & Linguistics",
    "target_word": "rudimentary",
    "paragraph_index": 2,
    "passage": "Vocal learning—the capacity to acquire complex vocalizations through acoustic experience and imitation—is an exceptionally rare neurobiological trait across the animal kingdom. While innate calls conveying basic alarm or distress are widespread among vertebrates, true learned vocal repertoires are restricted to humans, cetaceans, pinnipeds, elephants, and three divergent clades of birds: songbirds (oscines), parrots, and hummingbirds.\n\nIn songbirds such as the zebra finch (Taeniopygia guttata), vocal development proceeds through distinct behavioral phases that exhibit uncanny parallels to human infant speech acquisition. During the initial sensory phase, juvenile fledglings listen attentively to adult male tutors, encoding a neural template of the species-typical song. In the subsequent sensorimotor phase, juveniles begin producing rudimentary, unstructured vocal babbling termed 'subsong.' Through continuous auditory feedback, the young bird compares its own acoustic output with the stored neural template, progressively refining pitch, syllable syntax, and temporal cadence.\n\nLesion and electrophysiological studies demonstrate that this developmental trajectory relies on a specialized forebrain circuit called the song system, which shares functional and transcriptional homologies with human cortical-basal ganglia motor loops.",
    "question": "The word 'rudimentary' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "primitive",
      "B": "sophisticated",
      "C": "melodious",
      "D": "permanent"
    },
    "correct_answer": "A",
    "clue_type": "Restatement & Context (Diễn giải & Đồng nghĩa bối cảnh)",
    "clue_signal": "juveniles begin producing rudimentary, unstructured vocal babbling termed 'subsong.' Through continuous... progressively refining...",
    "explanation": {
      "meaning": "'Rudimentary' nghĩa là sơ đẳng, thô sơ, chưa hoàn thiện ở giai đoạn đầu.",
      "substitution": "Thế chỗ: 'produce primitive / basic, unstructured vocal babbling' ăn khớp với từ 'unstructured' (chưa có cấu trúc) và 'babbling' (bập bẹ tiếng kêu đầu đời).",
      "trap_breakdown": {
        "B": "sophisticated (tinh vi, phức tạp) — Bẫy trái nghĩa hoàn toàn: Tiếng bập bẹ non nớt chưa thể tinh vi.",
        "C": "melodious (du dương) — Tiếng kêu chưa hoàn thiện 'unstructured babbling' thì chưa du dương được.",
        "D": "permanent (vĩnh viễn) — Bẫy nhầm lẫn: Tiếng kêu này sẽ được hoàn thiện dần theo thời gian (progressively refining)."
      },
      "synonyms": [
        "primitive",
        "basic",
        "elementary",
        "crude"
      ]
    }
  },
  {
    "id": "vic_14",
    "title": "Renaissance Fresco Pigments and Preservation",
    "topic": "Art History & Chemistry",
    "target_word": "impervious",
    "paragraph_index": 2,
    "passage": "The Buon Fresco technique mastered by Italian Renaissance painters such as Giotto and Michelangelo required rigorous technical discipline and extensive knowledge of chemical geology. Unlike secco painting, in which pigments are applied onto dry plaster with organic binders, Buon Fresco demanded that finely ground mineral pigments suspended exclusively in pure water be applied directly onto freshly spread, moist lime plaster (the intonaco).\n\nThe chemical durability of Buon Fresco relies on a carbonation reaction. As the moist calcium hydroxide plaster absorbs carbon dioxide from ambient air, it converts into insoluble calcium carbonate, integrating the pigment particles permanently into the mineral crystalline matrix of the wall itself. Once fully cured, the painted surface becomes essentially impervious to surface moisture and organic bacterial degradation, preserving vivid tonal saturation for centuries.\n\nHowever, this medium severely restricted the artist's chromatic palette. Pigments containing copper, such as azurite and malachite, turn brownish-black or degrade when exposed to the alkaline environment of caustic lime. Consequently, artists were forced to apply blue accents in secco after the wall had dried, explaining why sky backgrounds in many Renaissance frescoes have flaked away while underlying figure drapery remains intact.",
    "question": "The word 'impervious' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "resistant",
      "B": "vulnerable",
      "C": "transparent",
      "D": "sensitive"
    },
    "correct_answer": "A",
    "clue_type": "Definition & Result (Định nghĩa & Kết quả hóa học)",
    "clue_signal": "converts into insoluble calcium carbonate... painted surface becomes essentially impervious to surface moisture... preserving vivid tonal saturation for centuries.",
    "explanation": {
      "meaning": "'Impervious' mang nghĩa không thể thấm qua, có khả năng đề kháng hoặc miễn nhiễm với các tác động bên ngoài.",
      "substitution": "Thế chỗ: 'the painted surface becomes essentially resistant / immune to surface moisture' (bề mặt tranh trở nên hoàn toàn đề kháng / không thấm nước ẩm bên ngoài).",
      "trap_breakdown": {
        "B": "vulnerable (dễ bị tổn thương) — Bẫy trái nghĩa: Tranh fresco có độ bền cực cao qua nhiều thế kỷ chứ không dễ hỏng.",
        "C": "transparent (trong suốt) — Không liên quan tính chất cơ lý hóa.",
        "D": "sensitive (nhạy cảm) — Trái nghĩa với khả năng bảo quản bền vững hàng thế kỷ."
      },
      "synonyms": [
        "resistant",
        "impenetrable",
        "immune",
        "unaffected"
      ]
    }
  },
  {
    "id": "vic_15",
    "title": "Prehistoric Megaherbivore Extinctions in the Americas",
    "topic": "Paleontology & Ecology",
    "target_word": "debilitating",
    "paragraph_index": 2,
    "passage": "At the close of the Pleistocene epoch roughly 11,700 years ago, North and South America witnessed the catastrophic extinction of over seventy percent of their native megafaunal genera. Spectacular mammalian herbivores, including Columbian mammoths, mastodons, giant ground sloths (Megatherium), and glyptodonts, vanished completely from the fossil record within a geological blink of an eye.\n\nPaleoecologists have vigorously contested two divergent hypotheses to explain this rapid demise. The 'overkill hypothesis,' popularized by Paul Martin, posits that arriving Clovis hunters equipped with bifacial fluted projectile points acted as an invasive apex predator, decimating naive megafaunal populations that had evolved without human predation pressure. Conversely, the climate change hypothesis underscores the debilitating environmental stress caused by abrupt deglaciation oscillations, such as the Younger Dryas cold reversal, which radically fragmented vegetation zones and reduced available forage.\n\nRecent multidisciplinary syntheses indicate that neither climate nor human overhunting operated in isolation. Rather, climatic stress contracted megaherbivore ranges into localized ecological refugia, where burgeoning human hunter populations delivered the final coup de grace to already destabilized breeding populations.",
    "question": "The word 'debilitating' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "weakening",
      "B": "negligible",
      "C": "invigorating",
      "D": "beneficial"
    },
    "correct_answer": "A",
    "clue_type": "Cause & Effect (Nguyên nhân - Hệ quả sinh thái)",
    "clue_signal": "underscores the debilitating environmental stress caused by abrupt deglaciation... radically fragmented vegetation zones and reduced available forage.",
    "explanation": {
      "meaning": "'Debilitating' là tính từ mang nghĩa làm suy kiệt, làm kiệt quệ sức lực, gây suy yếu nghiêm trọng.",
      "substitution": "Thế chỗ: 'underscores the weakening / incapacitating environmental stress' (nhấn mạnh áp lực môi trường gây suy kiệt các đàn thú lớn).",
      "trap_breakdown": {
        "B": "negligible (không đáng kể) — Trái ngược với hậu quả gây ra tuyệt chủng trên diện rộng.",
        "C": "invigorating (tiếp thêm sinh lực) — Trái nghĩa hoàn toàn.",
        "D": "beneficial (có lợi) — Trái nghĩa với hoàn cảnh thảm khốc của biến đổi khí hậu băng hà."
      },
      "synonyms": [
        "weakening",
        "incapacitating",
        "crippling",
        "enervating"
      ]
    }
  },
  {
    "id": "vic_16",
    "title": "The Physics of Superconductivity and BCS Theory",
    "topic": "Solid-State Physics",
    "target_word": "vanishing",
    "paragraph_index": 1,
    "passage": "Superconductivity represents one of the most striking quantum macroscopic phenomena discovered in condensed-matter physics. When certain metallic elements and chemical alloys are cooled beneath a discrete material-specific transition threshold termed the critical temperature (Tc), their electrical resistivity drops abruptly to precisely zero. Currents introduced into a closed superconducting ring will circulate without measurable decay for years, indicative of vanishing ohmic resistance.\n\nIn addition to perfect electrical conductivity, superconductors exhibit the Meissner effect—the complete expulsion of internal magnetic flux lines from their bulk interior. When a superconductor is placed within an external magnetic field, screening surface currents spontaneously emerge to generate an opposing interior field that cancels the applied flux, causing the material to levitate stably above permanent magnets.\n\nThe microscopic explanation for conventional low-temperature superconductivity was articulated in 1957 by John Bardeen, Leon Cooper, and John Robert Schrieffer (BCS theory). They demonstrated that subtle electron-phonon lattice vibrations overcome electrostatic Coulomb repulsion, binding conduction electrons into correlated pairs known as Cooper pairs that traverse crystal lattices without scattering.",
    "question": "The word 'vanishing' in paragraph 1 is closest in meaning to:",
    "options": {
      "A": "disappearing",
      "B": "expanding",
      "C": "unpredictable",
      "D": "fluctuating"
    },
    "correct_answer": "A",
    "clue_type": "Restatement & Context (Diễn giải & Đồng nghĩa ngữ cảnh)",
    "clue_signal": "electrical resistivity drops abruptly to precisely zero... circulate without measurable decay for years, indicative of vanishing ohmic resistance.",
    "explanation": {
      "meaning": "'Vanishing' trong vật lý/toán học chỉ trạng thái tiêu biến, giảm dần về con số 0.",
      "substitution": "Thế chỗ: 'indicative of disappearing / zero ohmic resistance' (biểu hiện của điện trở tiêu biến hoàn toàn về 0).",
      "trap_breakdown": {
        "B": "expanding (mở rộng) — Bẫy trái nghĩa: Điện trở giảm về 0 chứ không tăng lên.",
        "C": "unpredictable (không đoán trước được) — Tính chất siêu dẫn tuân thủ định luật vật lý chính xác.",
        "D": "fluctuating (dao động) — Dòng điện chạy ổn định liên tục, không hề biến thiên hay dao động."
      },
      "synonyms": [
        "disappearing",
        "diminishing",
        "fading",
        "evanescent"
      ]
    }
  },
  {
    "id": "vic_17",
    "title": "Termite Mound Architecture and Biomimetic Engineering",
    "topic": "Architecture & Entomology",
    "target_word": "ingenious",
    "paragraph_index": 2,
    "passage": "Macrotermes bellicosus, a mound-building fungus-growing termite species endemic to tropical African savannas, constructs towering earthen biostructures that can exceed eight meters in vertical height. These biogenic mounds must maintain a remarkably stable internal environment: the termites cultivate subterranean monocultures of a delicate symbiotic fungus (Termitomyces) that perish if nest temperatures deviate beyond a narrow band centered around 30 degrees Celsius or if ambient carbon dioxide exceeds two percent.\n\nTo maintain these strict microclimatic tolerances under extreme diurnal savanna temperature swings, termites utilize an ingenious passive ventilation architecture. The outer walls of the spire contain thousands of micro-porous channels that interface with subterranean vertical conduits. Metabolic heat generated by millions of respiring insects and fungal comb beds acts as a thermal chimney, propelling warm, stale air upward through a central shaft, while fresh, oxygen-rich ambient air is siphoned inward through peripheral low-pressure conduits.\n\nHuman architects have embraced this biological model to curtail mechanical HVAC energy consumption. Mick Pearce designed the Eastgate Centre in Harare, Zimbabwe, drawing direct inspiration from termite ventilation dynamics to cool the multi-story complex passively without conventional air conditioning units.",
    "question": "The word 'ingenious' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "clever",
      "B": "cumbersome",
      "C": "inefficient",
      "D": "hazardous"
    },
    "correct_answer": "A",
    "clue_type": "Elaboration & Definition (Mở rộng & Diễn giải)",
    "clue_signal": "termites utilize an ingenious passive ventilation architecture. The outer walls contain thousands of micro-porous channels... thermal chimney...",
    "explanation": {
      "meaning": "'Ingenious' là tính từ chỉ những giải pháp tài tình, khéo léo, mang tính sáng tạo đột phá.",
      "substitution": "Thế chỗ: 'termites utilize a clever / brilliant passive ventilation architecture' (loài mối sử dụng một cấu trúc thông gió thụ động hết sức tài tình).",
      "trap_breakdown": {
        "B": "cumbersome (cồng kềnh, nặng nề) — Bẫy liên tưởng tổ mối to lớn, nhưng cấu trúc vận hành của nó rất tinh tế.",
        "C": "inefficient (kém hiệu quả) — Trái nghĩa: Hệ thống làm mát này hiệu quả đến mức con người phải học tập.",
        "D": "hazardous (nguy hiểm) — Không liên quan đến tính chất sáng tạo kỹ thuật."
      },
      "synonyms": [
        "clever",
        "inventive",
        "resourceful",
        "brilliant"
      ]
    }
  },
  {
    "id": "vic_18",
    "title": "The Evolution of Avian Feathers from Theropod Dinosaurs",
    "topic": "Evolutionary Biology & Paleontology",
    "target_word": "exaptation",
    "paragraph_index": 2,
    "passage": "The discovery of exceptionally preserved non-avian theropod fossils throughout the Liaoning Province of northeastern China during the late 1990s revolutionized vertebrate paleontology. Imprints within fine-grained lacustrine tuffaceous shales demonstrated that long before the emergence of powered aerodynamic flight, numerous terrestrial carnivorous coelurosaurs possessed plumage remarkably similar to modern avian feathers.\n\nThis anatomical sequence exemplifies evolutionary exaptation—the shift in the biological function of a physical trait during evolution. Primitive 'protofeathers' found on basal compsognathids and tyrannosauroids were simple unbranched hollow filaments termed stage I feathers. Because these diminutive ancestral structures were aerodynamically useless for generating lift, biologists deduce they originally evolved for thermoregulatory insulation in small, active endothermic dinosaurs or for vivid chromatic sociosexual display.\n\nOnly millions of years later did complex branching, asymmetrical vanes, and interlocking microscopic barbules emerge in maniraptoran clades such as Microraptor and Archaeopteryx, co-opting pre-existing thermal plumulaceous structures for gliding and active powered flapping.",
    "question": "The word 'exaptation' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "functional repurposing",
      "B": "sudden extinction",
      "C": "mechanical failure",
      "D": "genetic mutation"
    },
    "correct_answer": "A",
    "clue_type": "Definition & Restatement (Định nghĩa trực tiếp ngay sau dấu gạch ngang)",
    "clue_signal": "evolutionary exaptation—the shift in the biological function of a physical trait during evolution.",
    "explanation": {
      "meaning": "'Exaptation' là thuật ngữ sinh học tiến hóa chỉ sự chuyển đổi công năng của một cơ quan (ban đầu sinh ra với mục đích A, sau này thích nghi để phục vụ mục đích B).",
      "substitution": "Thế chỗ: 'exemplifies functional repurposing—the shift in the biological function' hoàn toàn trùng khớp với định nghĩa tác giả đưa ra ngay sau dấu gạch ngang '—'.",
      "trap_breakdown": {
        "B": "sudden extinction (tuyệt chủng đột ngột) — Bẫy liên tưởng khủng long tuyệt chủng, hoàn toàn sai nghĩa của exaptation.",
        "C": "mechanical failure (lỗi cơ học) — Không liên quan ngữ cảnh tiến hóa.",
        "D": "genetic mutation (đột biến gen) — Đột biến là nguyên nhân phân tử, còn exaptation là sự thay đổi công năng sinh học cấp độ kiểu hình."
      },
      "synonyms": [
        "functional repurposing",
        "co-option",
        "adaptation shift"
      ]
    }
  },
  {
    "id": "vic_19",
    "title": "Atmospheric Methane and Clathrate Hydrate Instability",
    "topic": "Geochemistry & Climatology",
    "target_word": "catastrophic",
    "paragraph_index": 2,
    "passage": "Methane clathrate hydrate is a solid, crystalline ice-like substance in which vast quantities of methane gas molecules are physically trapped within hydrogen-bonded cages of water molecules. Formed under conditions of high hydrostatic pressure and low ambient temperature, oceanic methane clathrates reside in vast sedimentary reservoirs along continental margins and beneath high-latitude Arctic terrestrial permafrost.\n\nThe physical stability of these marine hydrate deposits is acutely sensitive to ocean thermal anomalies. If bottom ocean temperatures increase by merely a few degrees Celsius, the clathrate thermodynamic stability zone contracts upward, triggering thermal dissociation that releases massive quantities of gaseous methane into the water column. Because methane is a greenhouse gas with a global warming potential more than twenty-five times greater than carbon dioxide over a century timescale, large-scale venting could incite a catastrophic positive feedback runaway warming loop.\n\nGeological precedents suggest this mechanism triggered past hyperthermal events. During the Paleocene-Eocene Thermal Maximum (PETM) approximately 56 million years ago, widespread benthic carbon isotope excursions coincided with a five-to-eight degree spike in planetary temperature, consistent with massive submarine clathrate desiccation.",
    "question": "The word 'catastrophic' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "disastrous",
      "B": "beneficial",
      "C": "gradual",
      "D": "temporary"
    },
    "correct_answer": "A",
    "clue_type": "Cause & Effect / Collocation (Nguyên nhân & Kết hợp từ)",
    "clue_signal": "global warming potential more than twenty-five times greater... large-scale venting could incite a catastrophic positive feedback runaway warming loop.",
    "explanation": {
      "meaning": "'Catastrophic' mang nghĩa thảm họa, thảm khốc, gây hủy hoại nghiêm trọng trên quy mô lớn.",
      "substitution": "Thế chỗ: 'incite a disastrous / ruinous positive feedback runaway warming loop' (châm ngòi cho một vòng lặp ấm lên mất kiểm soát mang tính thảm họa).",
      "trap_breakdown": {
        "B": "beneficial (có lợi) — Trái ngược hoàn toàn với nguy cơ ấm lên toàn cầu mất kiểm soát.",
        "C": "gradual (từ từ) — 'Runaway warming' chỉ sự bùng nổ mất kiểm soát nhanh chóng.",
        "D": "temporary (tạm thời) — Chu trình khí hậu này kéo dài hàng chục ngàn năm, không hề tạm thời."
      },
      "synonyms": [
        "disastrous",
        "calamitous",
        "devastating",
        "ruinous"
      ]
    }
  },
  {
    "id": "vic_20",
    "title": "Roman Concrete and Hydraulic Lime Durability",
    "topic": "Civil Engineering & History",
    "target_word": "unrivaled",
    "paragraph_index": 1,
    "passage": "While modern Portland cement structures frequently deteriorate within fifty to one hundred years under continuous exposure to marine waves, maritime harbor structures constructed by Roman engineers over two thousand years ago remain structurally robust today. The maritime breakwaters at Caesarea Maritima and Pozzuoli exhibit an unrivaled resilience that has captivated civil engineers and materials scientists for decades.\n\nThe secret behind this enduring durability lies in the unique chemical formulation of opus caementicium. Roman builders combined volcanic ash—specifically pozzolana excavated from regions surrounding the Gulf of Naples—with slaked lime and volcanic tuff aggregate. When immersed in seawater, this formulation underwent an active post-curing chemical transformation rather than passive weathering.\n\nRecent high-resolution synchrotron X-ray microdiffraction reveals that saline water percolating through the porous concrete dissolved volcanic glass components, precipitating rare interlocking aluminum-tobermorite crystals alongside phillipsite. These mineral growths mechanically reinforced microcracks within the mortar over millennia, effectively endowing Roman concrete with self-healing capacity in salt water.",
    "question": "The word 'unrivaled' in paragraph 1 is closest in meaning to:",
    "options": {
      "A": "peerless",
      "B": "ordinary",
      "C": "hazardous",
      "D": "unreliable"
    },
    "correct_answer": "A",
    "clue_type": "Contrast & Degree (Tương phản & Cấp độ vượt trội)",
    "clue_signal": "While modern structures frequently deteriorate within fifty to one hundred years... Roman structures constructed over two thousand years ago remain structurally robust... exhibit an unrivaled resilience...",
    "explanation": {
      "meaning": "'Unrivaled' là tính từ mang nghĩa không có đối thủ, vô song, vượt trội hơn tất cả (peerless / unmatched).",
      "substitution": "Thế chỗ: 'exhibit a peerless / unmatched resilience' (thể hiện một sức bền vô song) tương phản với bê tông hiện đại vốn nhanh hỏng sau 50-100 năm.",
      "trap_breakdown": {
        "B": "ordinary (bình thường) — Bẫy trái nghĩa: Sức bền 2000 năm của người La Mã là phi thường, không hề bình thường.",
        "C": "hazardous (nguy hiểm) — Không liên quan đến chất lượng độ bền công trình.",
        "D": "unreliable (không đáng tin) — Trái nghĩa: Bê tông La Mã đã trụ vững hơn 2000 năm chứng minh độ bền bỉ đáng kinh ngạc."
      },
      "synonyms": [
        "peerless",
        "unmatched",
        "unparalleled",
        "incomparable"
      ]
    }
  },
  {
    "id": "vic_21",
    "title": "Epigenetics and Chromatin Remodeling",
    "topic": "Molecular Genetics",
    "target_word": "reversible",
    "paragraph_index": 2,
    "passage": "Classical Mendelian genetics conceptualized the DNA nucleotide sequence as an inflexible blueprint dictating cellular phenotype through transcription and translation. However, the burgeoning discipline of epigenetics demonstrates that gene expression can be profoundly modulated without altering the underlying genetic code. Chemical tags appended directly to DNA nucleotides or histones govern which genetic loci are accessible to transcription factors.\n\nTwo primary epigenetic modifications dominate chromatin architecture: DNA methylation and histone acetylation. The covalent addition of methyl groups to cytosine residues typically represses transcription by condensing open euchromatin into dense heterochromatin. Conversely, histone acetyltransferases transfer acetyl groups to lysine residues, neutralizing positive charges on histone tails and relaxing chromatin coils to permit transcriptional machinery access. Unlike genetic mutations, which represent permanent alterations to DNA sequences, epigenetic modifications are inherently reversible, permitting dynamic cellular responsiveness to nutritional, stress, and environmental cues.\n\nThis malleability carries profound biomedical ramifications. Pharmaceutical inhibitors targeting aberrant DNA methyltransferases or histone deacetylases can reactivate silenced tumor suppressor genes in cancerous lineages without inducing permanent genetic damage.",
    "question": "The word 'reversible' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "changeable",
      "B": "permanent",
      "C": "destructive",
      "D": "lethal"
    },
    "correct_answer": "A",
    "clue_type": "Contrast & Opposition (Tương phản trực tiếp với permanent)",
    "clue_signal": "Unlike genetic mutations, which represent permanent alterations to DNA sequences, epigenetic modifications are inherently reversible...",
    "explanation": {
      "meaning": "'Reversible' mang nghĩa có thể đảo ngược, có thể hoàn nguyên hoặc thay đổi linh hoạt.",
      "substitution": "Thế chỗ: 'epigenetic modifications are inherently changeable / capable of being undone' đối lập trực tiếp với 'permanent alterations' (thay đổi vĩnh viễn) của đột biến gen.",
      "trap_breakdown": {
        "B": "permanent (vĩnh viễn) — Bẫy trái nghĩa trực tiếp được đưa ra để kiểm tra thí sinh có nhìn ra cấu trúc 'Unlike X, Y is...'.",
        "C": "destructive (phá hủy) — Thay đổi biểu sinh giúp điều hòa tế bào chứ không phải phá hủy.",
        "D": "lethal (gây chết) — Không liên quan đến tính thuận nghịch của phản ứng sinh hóa."
      },
      "synonyms": [
        "changeable",
        "alterable",
        "capable of being undone",
        "mutable"
      ]
    }
  },
  {
    "id": "vic_22",
    "title": "K-Selected versus r-Selected Reproductive Strategies",
    "topic": "Ecology & Population Biology",
    "target_word": "prolific",
    "paragraph_index": 2,
    "passage": "In evolutionary ecology, MacArthur and Wilson formulated r/K selection theory to model how disparate selective pressures govern the reproductive trade-offs of organismal life histories. Organisms occupy a continuum between two evolutionary endpoints: r-strategists, which maximize reproductive rate in unstable environments, and K-strategists, which optimize competitive fitness near environmental carrying capacity.\n\nSpecies exemplifying r-selection—such as dandelions, ephemeral insects, and marine oysters—are prolific breeders. They mature rapidly, allocate immense energetic capital toward producing thousands of minute offspring, and invest zero parental care in progeny survival. Consequently, individual juvenile mortality rates are extraordinarily steep, but sheer reproductive volume ensures that some individuals colonize newly available, disturbed ecological niches before competitors arrive.\n\nIn stark contrast, K-selected species, including elephants, blue whales, and humans, exhibit extended developmental intervals, delayed sexual maturity, and produce small litters. Parents invest prolonged metabolic energy in nurturing, protecting, and educating each offspring, guaranteeing superior individual competitive survival in saturated habitats.",
    "question": "The word 'prolific' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "highly productive",
      "B": "extremely scarce",
      "C": "physically frail",
      "D": "socially cooperative"
    },
    "correct_answer": "A",
    "clue_type": "Elaboration & Definition (Mở rộng & Diễn giải phía sau)",
    "clue_signal": "are prolific breeders. They mature rapidly, allocate immense energetic capital toward producing thousands of minute offspring...",
    "explanation": {
      "meaning": "'Prolific' là tính từ chỉ khả năng sinh sản nhiều, tạo ra số lượng cực lớn các cá thể hoặc tác phẩm (sinh sôi nảy nở mạnh mẽ).",
      "substitution": "Thế chỗ: 'are highly productive / abundant breeders' hoàn toàn khớp với câu giải thích tiếp theo 'producing thousands of offspring'.",
      "trap_breakdown": {
        "B": "extremely scarce (cực kỳ khan hiếm) — Bẫy trái nghĩa hoàn toàn với khả năng đẻ hàng ngàn con.",
        "C": "physically frail (yếu ớt về thể chất) — Bẫy gây nhiễu vì con non nhỏ bé (minute offspring), nhưng prolific nói về khả năng sinh sản của cả loài.",
        "D": "socially cooperative (hợp tác xã hội) — Bẫy nhầm lẫn: Loài này không chăm sóc con cái (zero parental care) nên không phải hợp tác."
      },
      "synonyms": [
        "highly productive",
        "copious",
        "fecund",
        "fruitful",
        "fertile"
      ]
    }
  },
  {
    "id": "vic_23",
    "title": "Gravitational Lensing as a Probe for Dark Matter",
    "topic": "Astrophysics & Cosmology",
    "target_word": "distorted",
    "paragraph_index": 2,
    "passage": "General relativity predicts that the presence of mass warps the geometry of spacetime around it. Consequently, when electromagnetic radiation emitted by a remote luminous background source—such as a distant quasar or young starburst galaxy—traverses the gravitational potential well of an intervening massive cluster of galaxies, the trajectory of the light rays deflects.\n\nThis deflection produces striking observational signatures known as gravitational lensing. Depending on the precise alignment along the cosmic line of sight, background images appear dramatically magnified, multiplied, or sheared into elongated, distorted arclets curving around the lensing cluster core. By mathematically modeling these optical deformations, cosmologists reconstruct the precise total gravitational mass responsible for the lensing effect.\n\nCrucially, the inferred mass consistently exceeds the observable baryonic mass (luminous stars and X-ray-emitting hot gas) by a ratio of roughly six to one. This pronounced discrepancy provides compelling empirical verification for the existence of non-baryonic cold dark matter permeating cosmic halos.",
    "question": "The word 'distorted' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "deformed",
      "B": "sharpened",
      "C": "authentic",
      "D": "extinguished"
    },
    "correct_answer": "A",
    "clue_type": "Collocation & Restatement (Kết hợp từ & Diễn giải)",
    "clue_signal": "sheared into elongated, distorted arclets curving around... modeling these optical deformations...",
    "explanation": {
      "meaning": "'Distorted' mang nghĩa bị bẻ cong, biến dạng, làm méo mó so với hình dạng chuẩn ban đầu.",
      "substitution": "Thế chỗ: 'sheared into elongated, deformed arclets... modeling these optical deformations' (bị kéo dài và biến dạng thành các vòng cung).",
      "trap_breakdown": {
        "B": "sharpened (sắc nét hơn) — Bẫy trái nghĩa: Hình ảnh bị kéo cong và méo mó chứ không sắc sảo quang học.",
        "C": "authentic (nguyên bản) — Bẫy trái nghĩa: Hình ảnh quan sát được đã bị biến đổi so với vật thể thật.",
        "D": "extinguished (bị dập tắt) — Ánh sáng vẫn đến được kính thiên văn chứ không bị dập tắt."
      },
      "synonyms": [
        "deformed",
        "warped",
        "twisted",
        "misrepresented"
      ]
    }
  },
  {
    "id": "vic_24",
    "title": "The Transition from Hunter-Gatherer to Sedentary Agriculture",
    "topic": "Anthropology & Archaeology",
    "target_word": "precarious",
    "paragraph_index": 1,
    "passage": "The agricultural transition during the early Holocene epoch, colloquially designated the Neolithic Revolution, represented arguably the most consequential socioeconomic transformation in human history. For hundreds of millennia, anatomically modern humans sustained themselves through nomadic foraging, hunting wild game, and collecting seasonal flora. While popular imagination long envisioned this foraging lifestyle as a precarious existence fraught with chronic starvation, ethnographic and paleopathological evidence challenges this bleak characterization.\n\nContemporary hunter-gatherers studied in marginal environments frequently enjoy diverse dietary intake and devote fewer weekly hours to subsistence acquisition than agrarian peasant laborers. Furthermore, skeletal comparisons between pre-agricultural Natufian foragers and early Levantine farmers reveal an unexpected paradox: early agriculturalists exhibited higher rates of dental caries, iron-deficiency anemia, and stunted stature.\n\nThe transition to sedentary farming appears to have been propelled not by an immediate improvement in personal quality of life, but by demographic pressures and climate stabilization that made intense grain cultivation necessary to feed expanding populations.",
    "question": "The word 'precarious' in paragraph 1 is closest in meaning to:",
    "options": {
      "A": "unstable",
      "B": "prosperous",
      "C": "organized",
      "D": "peaceful"
    },
    "correct_answer": "A",
    "clue_type": "Contrast & Parallelism (Tương phản & Song hành với rủi ro)",
    "clue_signal": "envisioned this foraging lifestyle as a precarious existence fraught with chronic starvation, ethnographic evidence challenges this bleak characterization.",
    "explanation": {
      "meaning": "'Precarious' mang nghĩa bấp bênh, mong manh, đầy rủi ro và không ổn định.",
      "substitution": "Thế chỗ: 'a precarious / unstable existence fraught with chronic starvation' (một cuộc sống bấp bênh đầy rẫy hiểm họa đói ăn triền miên).",
      "trap_breakdown": {
        "B": "prosperous (thịnh vượng) — Bẫy trái nghĩa với tình cảnh đói ăn (starvation).",
        "C": "organized (có tổ chức) — Không phù hợp miêu tả sự bấp bênh của đời sống du mục tiền sử.",
        "D": "peaceful (thanh bình) — Lạc đề hoàn toàn."
      },
      "synonyms": [
        "unstable",
        "insecure",
        "perilous",
        "uncertain",
        "hazardous"
      ]
    }
  },
  {
    "id": "vic_25",
    "title": "Bioluminescence in Deep-Sea Cephalopods",
    "topic": "Marine Biology & Optics",
    "target_word": "conceal",
    "paragraph_index": 2,
    "passage": "In the ocean's mesopelagic 'twilight zone'—stretching between 200 and 1,000 meters below the surface—ambient downwelling sunlight is too feeble to sustain photosynthesis but sufficiently bright to silhouette swimming organisms against the illuminated surface. Predators scanning upward easily detect opaque prey outlined against the faint bluish skylight above.\n\nTo survive in this predator-dense corridor, numerous midwater squid and teleost fish utilize counterillumination, an active optical camouflage mechanism. Midwater squids possess specialized ventral photophores—light-producing organs containing luciferin and luciferase enzymes. By regulating the intensity, angular distribution, and wavelength of the ventral light they emit, these cephalopods precisely match downwelling sunlight. This counterillumination allows them to conceal their silhouette completely from upward-looking pelagic predators swimming below.\n\nRemarkably, some squid species adjust their photophore emission in real time as cloud cover passes over the surface ocean above, utilizing dedicated extraocular photoreceptors to detect shifts in ambient light and modulate their photophore output accordingly.",
    "question": "The word 'conceal' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "hide",
      "B": "magnify",
      "C": "broadcast",
      "D": "abandon"
    },
    "correct_answer": "A",
    "clue_type": "Definition & Purpose (Mục đích ngụy trang quang học)",
    "clue_signal": "active optical camouflage mechanism... match downwelling sunlight. This counterillumination allows them to conceal their silhouette completely...",
    "explanation": {
      "meaning": "'Conceal' là ngoại động từ chỉ hành động che giấu, ngụy trang để không bị phát hiện.",
      "substitution": "Thế chỗ: 'allows them to hide / disguise their silhouette completely from predators' (cho phép chúng che giấu hoàn toàn bóng đen cơ thể khỏi kẻ săn mồi).",
      "trap_breakdown": {
        "B": "magnify (phóng đại) — Bẫy trái nghĩa: Phát sáng là để triệt tiêu bóng đen, không phải phóng đại bóng đen lên.",
        "C": "broadcast (phát sóng, truyền tin) — Mực phát sáng để ẩn nấp chứ không phải để thông báo sự hiện diện của mình.",
        "D": "abandon (bỏ rơi) — Sai lệch logic ngụy trang."
      },
      "synonyms": [
        "hide",
        "disguise",
        "mask",
        "obscure",
        "camouflage"
      ]
    }
  }
];

export const EXTENDED_CONTEXT_VOCAB_BANK = [
  {
    "id": "vic_01",
    "title": "Ancient Maritime Migration in the Mediterranean",
    "topic": "Archaeology & Anthropology",
    "target_word": "deliberate",
    "paragraph_index": 1,
    "passage": "For much of the twentieth century, archaeologists assumed that substantial open-water voyages began only after farming societies developed sophisticated boats. Discoveries on islands that were never connected to continental landmasses have complicated this view. Stone tools and animal remains found on several Mediterranean islands indicate human visits thousands of years before agriculture became established there. Because reaching these islands required crossing visible stretches of sea, even relatively early travelers must have possessed some capacity for deliberate maritime movement.\n\nDetermining the sophistication of that capacity is difficult. Watercraft made from reeds, wood, or animal skins rarely survive archaeologically, so researchers often rely on indirect evidence. One approach compares stone from island sites with geological sources on neighboring mainland regions. When the chemical composition of an artifact matches a distant source, archaeologists can infer that either people or materials crossed the sea. Yet such evidence does not necessarily demonstrate direct long-distance navigation. Obsidian, for example, might have moved through a sequence of short voyages and exchanges rather than a single expedition.\n\nExperimental archaeology has provided another perspective. Researchers have constructed simple vessels using materials and techniques likely available to prehistoric communities and demonstrated that such craft can survive moderate sea crossings. These experiments suggest that voyaging did not require monumental ships, only purposeful navigation and basic maritime skill.",
    "question": "The word 'deliberate' in paragraph 1 is closest in meaning to:",
    "options": {
      "A": "dangerous",
      "B": "frequent",
      "C": "unrecorded",
      "D": "intentional"
    },
    "correct_answer": "D",
    "clue_type": "Cause & Effect (Nguyên nhân - Hệ quả)",
    "clue_signal": "Because reaching these islands required crossing visible stretches of sea... must have possessed some capacity for...",
    "explanation": {
      "meaning": "Trong ngữ cảnh hàng hải học thuật, 'deliberate' là tính từ mang nghĩa 'có chủ đích, có định hướng rõ ràng' (đối lập với trôi dạt ngẫu nhiên theo sóng gió).",
      "substitution": "Thế chỗ: 'capacity for intentional maritime movement' (khả năng di chuyển trên biển có chủ đích) hoàn toàn khớp với lập luận người tiền sử chủ động vượt biển đến các hòn đảo.",
      "trap_breakdown": {
        "A": "dangerous (nguy hiểm) — Bẫy liên tưởng: Vượt biển thời tiền sử nghe có vẻ nguy hiểm, nhưng câu văn đang nhấn mạnh năng lực định hướng chứ không phải mức độ rủi ro.",
        "B": "frequent (thường xuyên) — Bẫy tần suất: Không có dữ kiện nào trong câu nói về số lần hay tần suất di chuyển.",
        "C": "unrecorded (chưa được ghi nhận) — Bẫy chủ đề khảo cổ: Thí sinh hay liên tưởng vì bài đọc nói di tích khảo cổ hiếm khi tồn tại, nhưng 'unrecorded' hoàn toàn sai nghĩa của deliberate."
      },
      "synonyms": [
        "intentional",
        "purposeful",
        "planned",
        "calculated"
      ]
    }
  },
  {
    "id": "vic_02",
    "title": "Hydrothermal Vents and Deep-Sea Chemosynthesis",
    "topic": "Marine Biology",
    "target_word": "ubiquitous",
    "paragraph_index": 2,
    "passage": "Prior to the late 1970s, marine biologists operated under the consensus that all marine ecosystems were directly or indirectly reliant upon solar radiation for primary production. Sunlight-driven photosynthesis in epipelagic surface waters was deemed the indispensable foundation of oceanic food webs. This paradigm was upended with the discovery of hydrothermal vents along mid-ocean spreading ridges, thousands of meters beneath the euphotic zone.\n\nIn these pitch-black abyssal environments, microbial chemosynthesis replaces photosynthesis. Chemolithoautotrophic bacteria oxidize hydrogen sulfide and other reduced inorganic compounds discharging from superheated geothermal plumes, fixing dissolved carbon into organic biomass. While sunlight is ubiquitous in terrestrial and shallow marine zones, its total absence in the bathypelagic realm makes these sulfide-oxidizing microbes the sole primary producers supporting dense communities of giant tube worms, blind shrimp, and benthic crabs.\n\nThese chemosynthetic organisms demonstrate remarkable physiological adaptations. Giant tube worms (Riftia pachyptila), which lack a functional digestive tract, harbor dense colonies of symbiotic bacteria within a specialized vascular organ called the trophosome. The worms' crimson plumes bind hydrogen sulfide and oxygen simultaneously, shuttling both metabolites through unique hemoglobin molecules directly to their internal symbionts.",
    "question": "The word 'ubiquitous' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "ever-present",
      "B": "diminishing",
      "C": "temporary",
      "D": "hazardous"
    },
    "correct_answer": "A",
    "clue_type": "Contrast & Opposition (Tương phản - Đối lập)",
    "clue_signal": "While sunlight is ubiquitous in terrestrial and shallow marine zones, its total absence in the bathypelagic realm...",
    "explanation": {
      "meaning": "'Ubiquitous' mang nghĩa có mặt ở khắp mọi nơi, luôn luôn hiện diện.",
      "substitution": "Thế chỗ: 'While sunlight is ever-present in terrestrial and shallow marine zones' đối lập hoàn hảo với vế sau 'its total absence' (sự vắng mặt hoàn toàn ở tầng đáy sâu).",
      "trap_breakdown": {
        "B": "diminishing (giảm dần) — Bẫy suy diễn: Ánh sáng giảm dần theo độ sâu, nhưng 'ubiquitous' ở đây nói về vùng cạn và trên cạn nơi ánh nắng luôn tràn ngập.",
        "C": "temporary (tạm thời) — Sai nghĩa: Ánh nắng trên bề mặt là hiện tượng thường xuyên, không phải tạm bợ.",
        "D": "hazardous (nguy hiểm) — Sai hoàn toàn ngữ cảnh học thuật."
      },
      "synonyms": [
        "omnipresent",
        "ever-present",
        "pervasive",
        "widespread"
      ]
    }
  },
  {
    "id": "vic_03",
    "title": "The Industrial Revolution and Urban Sanitation",
    "topic": "History & Public Health",
    "target_word": "precipitated",
    "paragraph_index": 2,
    "passage": "The unprecedented demographic migration from rural agrarian hamlets to manufacturing centers during the nineteenth century placed catastrophic strain on municipal infrastructure. Cities like Manchester and London grew at rates that overwhelmed rudimentary drainage systems, cesspools, and local aquifers. Raw domestic waste and industrial effluents were routinely discharged directly into tributary rivers that simultaneously served as municipal culinary water supplies.\n\nThis pervasive lack of sanitation precipitated recurring epidemics of waterborne pathogens, most notably Asiatic cholera. Throughout the 1830s and 1840s, cholera outbreaks decimated working-class tenements with appalling swiftness. Public health officials initially ascribed the disease to 'miasma'—foul airborne vapor emanating from decomposing refuse. It was not until physician John Snow mapped cholera fatalities around the Broad Street water pump in Soho in 1854 that the causal linkage between contaminated well water and disease transmission was empirically substantiated.\n\nSnow's epidemiological breakthrough catalyzed massive municipal engineering reforms. Metropolitan boards commissioned subterranean brick sewer networks to divert wastewater far downriver from metropolitan intake points, fundamentally transforming nineteenth-century urban demography.",
    "question": "The word 'precipitated' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "triggered",
      "B": "prevented",
      "C": "documented",
      "D": "alleviated"
    },
    "correct_answer": "A",
    "clue_type": "Cause & Effect (Nguyên nhân - Hệ quả)",
    "clue_signal": "This pervasive lack of sanitation precipitated recurring epidemics... outbreaks decimated working-class tenements...",
    "explanation": {
      "meaning": "'Precipitate' trong văn cảnh lịch sử/khoa học là ngoại động từ có nghĩa là 'châm ngòi, thúc đẩy, gây ra đột ngột' một biến cố nghiêm trọng.",
      "substitution": "Thế chỗ: 'This pervasive lack of sanitation triggered recurring epidemics' (Tình trạng mất vệ sinh tràn lan này đã châm ngòi cho các đợt dịch bệnh bùng phát).",
      "trap_breakdown": {
        "B": "prevented (ngăn chặn) — Bẫy trái nghĩa hoàn toàn với nguyên nhân dẫn đến dịch bệnh.",
        "C": "documented (ghi chép lại) — Bẫy hành động nghiên cứu: Việc ghi chép chỉ diễn ra sau đó, không phải là hệ quả trực tiếp từ ô nhiễm.",
        "D": "alleviated (làm giảm nhẹ) — Bẫy trái nghĩa: Ô nhiễm làm bệnh bùng phát chứ không giảm bớt."
      },
      "synonyms": [
        "triggered",
        "instigated",
        "brought about",
        "sparked"
      ]
    }
  },
  {
    "id": "vic_04",
    "title": "Cognitive Load Theory and Multimedia Learning",
    "topic": "Cognitive Science & Education",
    "target_word": "extraneous",
    "paragraph_index": 3,
    "passage": "Cognitive Load Theory posits that human working memory possesses a strictly finite capacity when processing novel incoming informational cues. Unlike long-term memory, which functions as an essentially boundless repository for structured mental schemas, working memory can manipulate only a handful of discrete informational chunks simultaneously before cognitive overload impairs schema acquisition.\n\nEducational psychologists delineate cognitive load into three distinct dimensions: intrinsic, germane, and extraneous. Intrinsic load reflects the innate complexity of the subject matter itself, while germane load denotes the productive mental processing dedicated to schema formation. In contrast, extraneous cognitive load arises from suboptimal instructional design, such as redundant text, confusing navigational interfaces, or decorative background animations. Eliminating extraneous demands is vital, as unnecessary sensory processing squanders cognitive bandwidth that learners would otherwise channel into synthesizing core concepts.\n\nEmpirical studies confirm that when instructional materials coordinate synchronized visual graphics and spoken narration rather than displaying dense on-screen text alongside images, extraneous load declines substantially. This phenomenon, known as the modality effect, leverages dual processing channels in working memory.",
    "question": "The word 'extraneous' in paragraph 3 is closest in meaning to:",
    "options": {
      "A": "unnecessary",
      "B": "fundamental",
      "C": "complex",
      "D": "beneficial"
    },
    "correct_answer": "A",
    "clue_type": "Contrast & Elaboration (Tương phản & Diễn giải)",
    "clue_signal": "suboptimal instructional design... Eliminating extraneous demands is vital, as unnecessary sensory processing squanders...",
    "explanation": {
      "meaning": "'Extraneous' mang nghĩa 'không liên quan, thừa thãi, không cần thiết'.",
      "substitution": "Thế chỗ: 'Eliminating unnecessary demands is vital' hoàn toàn tương thích với câu tiếp theo 'unnecessary sensory processing squanders cognitive bandwidth'.",
      "trap_breakdown": {
        "B": "fundamental (cơ bản, cốt lõi) — Bẫy trái nghĩa: Extraneous load là phụ tải thừa thãi, đối lập với cái căn bản.",
        "C": "complex (phức tạp) — Bẫy gây nhiễu: Nội dung phức tạp thuộc về intrinsic load, không phải extraneous load.",
        "D": "beneficial (có lợi) — Bẫy sai đánh giá: Tác giả nhấn mạnh loại tải này gây lãng phí năng lực não bộ."
      },
      "synonyms": [
        "unnecessary",
        "irrelevant",
        "superfluous",
        "redundant"
      ]
    }
  },
  {
    "id": "vic_05",
    "title": "Glacial Ice Core Records and Paleoclimate",
    "topic": "Paleoclimatology & Geology",
    "target_word": "pristine",
    "paragraph_index": 1,
    "passage": "Deep polar ice sheets in central Greenland and the Antarctic continental interior represent unparalleled paleoenvironmental archives. As annual snowfall accumulates layer upon layer without melting, ambient atmospheric gases become trapped within microscopic air bubbles sealed off during the firn-to-ice transition. Because these interior plateaus experience minimal sublimation and zero seasonal melting, the deeply buried strata preserve a pristine chronological sequence of primordial atmospheric chemistry.\n\nBy analyzing stable isotopic ratios—particularly deuterium and oxygen-18—within the solid ice lattice, paleoclimatologists reconstruct past sea surface temperatures and planetary evaporation regimes spanning hundreds of thousands of years. Simultaneously, mass spectrometry of the encapsulated gas bubbles yields precise measurements of historical carbon dioxide and methane concentrations.\n\nThese records reveal an intimate, synchronized coupling between greenhouse gas atmospheric concentrations and global temperature variations across multiple glacial-interglacial Milankovitch cycles. Whenever greenhouse gases peaked, planetary temperatures responded in tandem, corroborating thermodynamic climate forcing models.",
    "question": "The word 'pristine' in paragraph 1 is closest in meaning to:",
    "options": {
      "A": "undamaged",
      "B": "artificial",
      "C": "temporary",
      "D": "hazardous"
    },
    "correct_answer": "A",
    "clue_type": "Cause & Effect / Definition (Nguyên nhân & Định nghĩa)",
    "clue_signal": "without melting... minimal sublimation and zero seasonal melting, the deeply buried strata preserve a pristine chronological sequence...",
    "explanation": {
      "meaning": "'Pristine' mang nghĩa nguyên sơ, không bị tổn hại hay thay đổi, còn nguyên trạng thái ban đầu.",
      "substitution": "Thế chỗ: 'preserve an undamaged / intact chronological sequence' hoàn toàn khớp với tiền đề không có sự tan chảy hay thăng hoa làm xáo trộn lớp băng.",
      "trap_breakdown": {
        "B": "artificial (nhân tạo) — Bẫy trái nghĩa: Băng hình thành hoàn toàn tự nhiên hàng trăm ngàn năm.",
        "C": "temporary (tạm thời) — Bẫy trái nghĩa: Các lớp băng tồn tại vĩnh cửu hàng triệu năm.",
        "D": "hazardous (nguy hiểm) — Không liên quan ngữ cảnh khoa học địa chất."
      },
      "synonyms": [
        "undamaged",
        "unspoiled",
        "intact",
        "flawless",
        "immaculate"
      ]
    }
  },
  {
    "id": "vic_06",
    "title": "Bees and Floral Communication Signals",
    "topic": "Botany & Zoology",
    "target_word": "conspicuous",
    "paragraph_index": 2,
    "passage": "Angiosperm evolution has been intrinsically linked to the sensory capabilities of insect pollinators for over one hundred million years. Flowering plants invest substantial metabolic energy into synthesizing volatile organic compounds, energetic nectar secretions, and vivid petal pigments designed specifically to attract winged foraging agents such as bumblebees and honeybees.\n\nVisual signaling operates across multiple spectral wavelengths. While humans perceive color primarily within the 400 to 700 nanometer spectrum, hymenopteran visual receptors possess photoreceptors sensitive to near-ultraviolet radiation. Consequently, flowers display conspicuous ultraviolet bullseye patterns invisible to mammalian predators but intensely luminous to approaching bees. These patterns, known as floral nectar guides, function as directional landing strips steering insects directly toward reproductive anthers and nectaries.\n\nFurthermore, recent biophysical research demonstrates that visiting bees alter the electrostatic potential of flowers. As a flying bee accumulates positive atmospheric charge via air friction, landing on a negatively charged flower creates a subtle electric field shift. Neighboring foraging bees detect this shift, allowing them to assess whether a blossom has recently been depleted of nectar without wasting time landing.",
    "question": "The word 'conspicuous' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "noticeable",
      "B": "concealed",
      "C": "fragile",
      "D": "unreliable"
    },
    "correct_answer": "A",
    "clue_type": "Elaboration & Definition (Mở rộng & Diễn giải)",
    "clue_signal": "display conspicuous ultraviolet bullseye patterns... intensely luminous to approaching bees... function as directional landing strips...",
    "explanation": {
      "meaning": "'Conspicuous' là tính từ chỉ những thứ dễ thấy, nổi bật, thu hút sự chú ý rõ rệt.",
      "substitution": "Thế chỗ: 'flowers display noticeable / prominent ultraviolet patterns' ăn khớp hoàn toàn với việc các hoa văn này phát sáng rực rỡ để dẫn đường cho ong đáp xuống.",
      "trap_breakdown": {
        "B": "concealed (ẩn giấu) — Bẫy nhầm lẫn: Tuy hoa văn này ẩn với mắt người (invisible to mammalian predators) nhưng với loài ong nó lại cực kỳ nổi bật, và câu đang nói về góc nhìn của ong.",
        "C": "fragile (mỏng manh) — Bẫy liên tưởng về cánh hoa mỏng manh, không phải nghĩa của từ.",
        "D": "unreliable (không đáng tin) — Sai lệch logic sinh học."
      },
      "synonyms": [
        "noticeable",
        "prominent",
        "striking",
        "discernible"
      ]
    }
  },
  {
    "id": "vic_07",
    "title": "The Collapse of the Late Bronze Age Civilizations",
    "topic": "Ancient History",
    "target_word": "cataclysmic",
    "paragraph_index": 1,
    "passage": "Around 1200 BCE, the eastern Mediterranean experienced an unprecedented systemic disintegration that abruptly terminated centuries of sophisticated diplomatic, cultural, and mercantile interaction. Flourishing palatial economies—including the Mycenaean kingdoms of mainland Greece, the Hittite Empire in central Anatolia, and prosperous Levantine trading emporia like Ugarit—collapsed within a span of merely several decades. This cataclysmic disintegration wiped out literate bureaucratic administration and inaugurated a protracted regional dark age.\n\nHistorians long debated a monocausal explanation for this synchronized downfall. Early twentieth-century scholars frequently attributed the destruction exclusively to marauding seafaring invaders known collectively in Egyptian inscriptions as the 'Sea Peoples.' However, contemporary archaeological excavations illuminate a far more convoluted systems collapse. Palaces sustained severe localized burns, but sediment core data also indicate prolonged, severe regional megadroughts that devastated agricultural yields and spurred widespread famine.\n\nThe interconnected nature of Bronze Age globalization proved fatal. Because these palace economies maintained intense interdependent trade networks reliant on copper from Cyprus and tin from Afghanistan for bronze manufacture, the collapse of any single node reverberated violently through the entire geopolitical architecture.",
    "question": "The word 'cataclysmic' in paragraph 1 is closest in meaning to:",
    "options": {
      "A": "disastrous",
      "B": "gradual",
      "C": "beneficial",
      "D": "anticipated"
    },
    "correct_answer": "A",
    "clue_type": "Restatement & Context (Diễn giải & Ngữ cảnh)",
    "clue_signal": "collapsed within a span of merely several decades. This cataclysmic disintegration wiped out... regional dark age.",
    "explanation": {
      "meaning": "'Cataclysmic' xuất phát từ gốc địa chấn/thảm họa, mang nghĩa 'mang tính thảm họa hủy diệt dữ dội'.",
      "substitution": "Thế chỗ: 'This disastrous / devastating disintegration wiped out literate bureaucratic administration' (Sự sụp đổ thảm khốc này đã quét sạch bộ máy cai trị...).",
      "trap_breakdown": {
        "B": "gradual (dần dần) — Bẫy sai thời gian: Bài đọc nhấn mạnh biến cố xảy ra nhanh chóng chỉ trong vài thập kỷ (merely several decades), không phải chậm rãi.",
        "C": "beneficial (có lợi) — Trái ngược hoàn toàn với việc dẫn tới thời kỳ đen tối (regional dark age).",
        "D": "anticipated (được dự báo trước) — Biến cố xảy ra đột ngột và bất ngờ, không ai lường trước."
      },
      "synonyms": [
        "disastrous",
        "calamitous",
        "devastating",
        "catastrophic"
      ]
    }
  },
  {
    "id": "vic_08",
    "title": "Cellular Senescence and Aging Biology",
    "topic": "Genetics & Cell Biology",
    "target_word": "perpetual",
    "paragraph_index": 1,
    "passage": "Normal mammalian somatic cells do not possess the capacity for perpetual mitotic proliferation. In the early 1960s, cell biologist Leonard Hayflick demonstrated that cultured human diploid fibroblasts could divide only approximately fifty times before entering an irreversible state of proliferative arrest. This phenomenon, subsequently designated the 'Hayflick limit,' established that cellular replication is strictly bounded rather than intrinsically infinite.\n\nThe molecular mechanism governing this proliferative ceiling resides in the architecture of linear chromosomes. During DNA replication, conventional DNA polymerase enzymes cannot fully duplicate the extreme terminal ends of the lagging DNA strand—a biochemical limitation termed the 'end-replication problem.' Consequently, specialized repetitive hexamer sequences called telomeres shorten progressively with each successive division cycle. When telomeric caps erode to a critically truncated length, the cell interprets exposed chromosome ends as double-strand DNA breaks, activating permanent cell-cycle checkpoints.\n\nAlthough senescent cells cease replication, they remain metabolically active. They secrete an array of proinflammatory cytokines, chemokines, and matrix metalloproteinases collectively designated the senescence-associated secretory phenotype (SASP), which degrades surrounding extracellular matrix and promotes tissue degradation.",
    "question": "The word 'perpetual' in paragraph 1 is closest in meaning to:",
    "options": {
      "A": "continuous",
      "B": "temporary",
      "C": "accidental",
      "D": "unfavorable"
    },
    "correct_answer": "A",
    "clue_type": "Contrast & Definition (Tương phản & Định nghĩa)",
    "clue_signal": "do not possess the capacity for perpetual mitotic proliferation... replication is strictly bounded rather than intrinsically infinite.",
    "explanation": {
      "meaning": "'Perpetual' là tính từ mang nghĩa bất tận, không ngừng nghỉ, vĩnh viễn liên tục.",
      "substitution": "Thế chỗ: 'do not possess the capacity for continuous / unending mitotic proliferation' tương phản trực tiếp với câu sau: tế bào bị giới hạn chỉ khoảng 50 lần phân chia.",
      "trap_breakdown": {
        "B": "temporary (tạm thời) — Bẫy trái nghĩa: Sự phân chia thực tế là tạm thời vì có giới hạn, nhưng câu đang phủ định 'do not possess perpetual' nghĩa là tế bào KHÔNG THỂ phân chia vĩnh viễn.",
        "C": "accidental (ngẫu nhiên) — Quá trình phân bào là có cơ chế sinh học, không phải ngẫu nhiên.",
        "D": "unfavorable (bất lợi) — Không phù hợp ngữ cảnh khoa học tế bào."
      },
      "synonyms": [
        "continuous",
        "unceasing",
        "everlasting",
        "perennial"
      ]
    }
  },
  {
    "id": "vic_09",
    "title": "Urban Microclimates and the Heat Island Effect",
    "topic": "Urban Geography & Architecture",
    "target_word": "exacerbate",
    "paragraph_index": 2,
    "passage": "Metropolitan agglomerations modify local thermodynamic regimes profoundly, creating localized atmospheric anomalies known as urban heat islands (UHIs). In typical metropolitan core areas, ambient air temperatures frequently exceed surrounding rural baselines by as much as four to eight degrees Celsius during calm nocturnal hours. This thermal differential alters localized precipitation convective patterns and increases peak energy demands for indoor air conditioning.\n\nMultiple structural and material factors exacerbate this thermal disparity. Traditional building materials such as asphalt paving, poured concrete, and roofing tiles possess high thermal admittance and bulk heat capacities, causing them to absorb massive quantities of incident solar radiation throughout daytime hours and reradiate thermal infrared slowly throughout the night. Moreover, the vertical geometry of urban street canyons impedes radiative cooling by trapping reflected heat between high-rise facades, while the widespread scarcity of vegetative canopy cover curtails natural evaporative cooling.\n\nTo mitigate metropolitan heat retention, contemporary urban planners advocate high-albedo cool roofs and extensive vegetative retrofits. Planting reflective deciduous street trees provides seasonal solar shading in summer while facilitating winter radiative penetration when leaves drop.",
    "question": "The word 'exacerbate' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "intensify",
      "B": "eliminate",
      "C": "disguise",
      "D": "stabilize"
    },
    "correct_answer": "A",
    "clue_type": "Elaboration / Cause (Mở rộng & Nguyên nhân)",
    "clue_signal": "Multiple structural and material factors exacerbate this thermal disparity. Traditional materials... absorb massive quantities... reradiate slowly...",
    "explanation": {
      "meaning": "'Exacerbate' là ngoại động từ chỉ hành động làm trầm trọng thêm, làm gia tăng mức độ tiêu cực của một vấn đề.",
      "substitution": "Thế chỗ: 'Multiple factors intensify / worsen this thermal disparity' (Nhiều yếu tố cấu trúc làm trầm trọng thêm sự chênh lệch nhiệt độ này).",
      "trap_breakdown": {
        "B": "eliminate (loại bỏ) — Bẫy trái nghĩa: Các yếu tố này làm hiện tượng nóng thêm chứ không hề xóa bỏ nó.",
        "C": "disguise (che giấu) — Hiện tượng nhiệt độ chênh lệch là hoàn toàn rõ ràng đo đạc được.",
        "D": "stabilize (ổn định) — Ngược với việc làm gia tăng biên độ nhiệt."
      },
      "synonyms": [
        "intensify",
        "worsen",
        "aggravate",
        "magnify"
      ]
    }
  },
  {
    "id": "vic_10",
    "title": "Echolocation and Auditory Processing in Bats",
    "topic": "Zoology & Acoustics",
    "target_word": "discern",
    "paragraph_index": 2,
    "passage": "Microchiropteran bats navigate and forage through complete nocturnal darkness via biosonar, a biological auditory mechanism known as echolocation. While flying at high velocity, these mammals emit intense ultrasonic vocalizations—often exceeding 110 decibels—through their larynx or specialized nasal structures, subsequently analyzing the returning echo reflections to construct a real-time multidimensional acoustic map of their physical surroundings.\n\nThe acoustic precision of this sensory system is extraordinary. By comparing the minute temporal delay between pulse emission and echo reception, bats compute the precise distance to airborne prey. Furthermore, subtle Doppler frequency shifts in returning echoes enable hunting bats to discern whether a target insect is fluttering toward or away from them, as well as calculate its instantaneous wingbeat frequency.\n\nTo prevent self-induced deafness caused by their deafening ultrasonic cries, bats possess a specialized auditory reflex. Tiny middle-ear muscles (the stapedius and tensor tympani) contract milliseconds prior to each laryngeal vocalization, mechanically damping the acoustic transmission across the ossicular bones, and then immediately relax to capture the faint returning echoes.",
    "question": "The word 'discern' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "distinguish",
      "B": "ignore",
      "C": "provoke",
      "D": "accelerate"
    },
    "correct_answer": "A",
    "clue_type": "Syntactic Fit & Meaning (Sắc thái ngữ pháp & Nghĩa)",
    "clue_signal": "enable hunting bats to discern whether a target insect is fluttering toward or away from them, as well as calculate...",
    "explanation": {
      "meaning": "'Discern' mang nghĩa nhận biết, phân biệt rõ ràng giữa hai hoặc nhiều trạng thái bằng giác quan hoặc trí tuệ.",
      "substitution": "Thế chỗ: 'enable hunting bats to distinguish / detect whether a target insect is fluttering toward or away' (giúp dơi săn mồi phân biệt được côn trùng đang bay lại gần hay bay ra xa).",
      "trap_breakdown": {
        "B": "ignore (phớt lờ) — Bẫy trái nghĩa: Dơi cần phân tích chi tiết để bắt mồi chứ không phớt lờ.",
        "C": "provoke (khiêu khích) — Không phù hợp về mặt ngữ nghĩa sinh học.",
        "D": "accelerate (tăng tốc) — Bẫy nhầm lẫn do trong câu có nhắc tới bay nhanh và tần số cánh đập."
      },
      "synonyms": [
        "distinguish",
        "differentiate",
        "detect",
        "perceive"
      ]
    }
  },
  {
    "id": "vic_11",
    "title": "Planetary Accretion and Earth's Early Core",
    "topic": "Astronomy & Geophysics",
    "target_word": "homogeneous",
    "paragraph_index": 1,
    "passage": "Modern astrophysical models demonstrate that terrestrial planets coalesced roughly 4.5 billion years ago via the gravitational accretion of solid planetesimals within the protoplanetary nebula. In the initial phases of accretion, the proto-Earth was likely a relatively homogeneous mixture of silicate rock, metallic iron, and volatile ice compounds, lacking the distinct concentric compositional layers observable today.\n\nAs kinetic impacts from colliding asteroidal bodies deposited colossal energy, radioactive decay of short-lived isotopes such as aluminum-26 compounded planetary heating. Eventually, temperatures throughout the mantle reached the melting point of iron-nickel alloys. Because liquid metal is significantly denser than ambient silicate magma, gravitationally driven segregation occurred: molten metallic iron percolated downward toward the planetary center, displacing buoyant silicate melts upward.\n\nThis planetary differentiation fundamentally transformed Earth's geophysics. The descending metallic iron released immense gravitational potential energy as additional heat, accelerating internal stratification and establishing the molten outer core that sustains Earth's protective geomagnetic shield today.",
    "question": "The word 'homogeneous' in paragraph 1 is closest in meaning to:",
    "options": {
      "A": "uniform",
      "B": "fragmented",
      "C": "turbulent",
      "D": "transparent"
    },
    "correct_answer": "A",
    "clue_type": "Contrast & Definition (Tương phản & Định nghĩa)",
    "clue_signal": "relatively homogeneous mixture... lacking the distinct concentric compositional layers observable today.",
    "explanation": {
      "meaning": "'Homogeneous' mang nghĩa đồng nhất, phân bố đều đặn thành một khối thống nhất không phân tầng.",
      "substitution": "Thế chỗ: 'relatively uniform mixture... lacking distinct layers' (hỗn hợp tương đối đồng nhất, chưa có các tầng lớp tách biệt như ngày nay).",
      "trap_breakdown": {
        "B": "fragmented (bị chia cắt, vụn vặt) — Bẫy nhầm lẫn: Ban đầu là do các tiểu hành tinh va chạm tạo nên, nhưng vật chất hòa trộn thành một khối đồng nhất.",
        "C": "turbulent (hỗn loạn) — Bẫy miêu tả sự va chạm nhưng không phản ánh tính chất cấu trúc đồng nhất.",
        "D": "transparent (trong suốt) — Không liên quan đến tính chất địa chất."
      },
      "synonyms": [
        "uniform",
        "consistent",
        "unvarying",
        "homogenous"
      ]
    }
  },
  {
    "id": "vic_12",
    "title": "Plant Hormone Auxin and Phototropism",
    "topic": "Plant Physiology",
    "target_word": "elicit",
    "paragraph_index": 3,
    "passage": "Sessile terrestrial plants lack muscular motility and must therefore optimize environmental resource acquisition through directional growth movements termed tropisms. Among the most extensively documented physiological responses is phototropism—the capacity of young vegetative stems to bend toward an incident light source to maximize photosynthetic capture.\n\nCharles Darwin and his son Francis initiated the experimental investigation of this phenomenon by shielding the apical coleoptiles of canary grass seedlings with opaque foil, demonstrating that the sensory perception of light occurs exclusively at the tip. Decades later, Frits Went demonstrated that an endogenous diffusible biochemical agent, subsequently identified as the phytohormone auxin (indole-3-acetic acid), was responsible for directional bending. Light does not destroy auxin; rather, unilateral illumination causes auxin to redistribute asymmetrically to the shaded side of the stem.\n\nAccumulated auxin molecules on the shaded flank elicit rapid cell wall loosening by activating proton pumps that acidify the apoplastic space. This cellular acidification activates expansin enzymes, permitting internal turgor pressure to elongate shaded cells faster than illuminated cells, mechanically forcing the stem tip to curve toward the light.",
    "question": "The word 'elicit' in paragraph 3 is closest in meaning to:",
    "options": {
      "A": "prompt",
      "B": "repress",
      "C": "delay",
      "D": "withhold"
    },
    "correct_answer": "A",
    "clue_type": "Cause & Effect (Nguyên nhân - Hệ quả)",
    "clue_signal": "Accumulated auxin molecules... elicit rapid cell wall loosening by activating proton pumps that acidify...",
    "explanation": {
      "meaning": "'Elicit' là ngoại động từ chỉ hành động khơi gợi, kích hoạt, thúc đẩy một phản ứng sinh hóa hoặc cảm xúc.",
      "substitution": "Thế chỗ: 'Auxin molecules on the shaded flank prompt / trigger rapid cell wall loosening' (Các phân tử auxin tích tụ làm kích hoạt sự nới lỏng vách tế bào).",
      "trap_breakdown": {
        "B": "repress (kìm hãm) — Bẫy trái nghĩa: Auxin kích thích kéo dài tế bào chứ không kìm nén.",
        "C": "delay (trì hoãn) — Trái ngược với từ 'rapid' (nhanh chóng) ngay phía sau.",
        "D": "withhold (giữ lại, từ chối đưa ra) — Sai lệch hoàn toàn ngữ cảnh sinh lý thực vật."
      },
      "synonyms": [
        "prompt",
        "trigger",
        "induce",
        "stimulate"
      ]
    }
  },
  {
    "id": "vic_13",
    "title": "Vocal Learning in Songbirds and Humans",
    "topic": "Ethology & Linguistics",
    "target_word": "rudimentary",
    "paragraph_index": 2,
    "passage": "Vocal learning—the capacity to acquire complex vocalizations through acoustic experience and imitation—is an exceptionally rare neurobiological trait across the animal kingdom. While innate calls conveying basic alarm or distress are widespread among vertebrates, true learned vocal repertoires are restricted to humans, cetaceans, pinnipeds, elephants, and three divergent clades of birds: songbirds (oscines), parrots, and hummingbirds.\n\nIn songbirds such as the zebra finch (Taeniopygia guttata), vocal development proceeds through distinct behavioral phases that exhibit uncanny parallels to human infant speech acquisition. During the initial sensory phase, juvenile fledglings listen attentively to adult male tutors, encoding a neural template of the species-typical song. In the subsequent sensorimotor phase, juveniles begin producing rudimentary, unstructured vocal babbling termed 'subsong.' Through continuous auditory feedback, the young bird compares its own acoustic output with the stored neural template, progressively refining pitch, syllable syntax, and temporal cadence.\n\nLesion and electrophysiological studies demonstrate that this developmental trajectory relies on a specialized forebrain circuit called the song system, which shares functional and transcriptional homologies with human cortical-basal ganglia motor loops.",
    "question": "The word 'rudimentary' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "primitive",
      "B": "sophisticated",
      "C": "melodious",
      "D": "permanent"
    },
    "correct_answer": "A",
    "clue_type": "Restatement & Context (Diễn giải & Đồng nghĩa bối cảnh)",
    "clue_signal": "juveniles begin producing rudimentary, unstructured vocal babbling termed 'subsong.' Through continuous... progressively refining...",
    "explanation": {
      "meaning": "'Rudimentary' nghĩa là sơ đẳng, thô sơ, chưa hoàn thiện ở giai đoạn đầu.",
      "substitution": "Thế chỗ: 'produce primitive / basic, unstructured vocal babbling' ăn khớp với từ 'unstructured' (chưa có cấu trúc) và 'babbling' (bập bẹ tiếng kêu đầu đời).",
      "trap_breakdown": {
        "B": "sophisticated (tinh vi, phức tạp) — Bẫy trái nghĩa hoàn toàn: Tiếng bập bẹ non nớt chưa thể tinh vi.",
        "C": "melodious (du dương) — Tiếng kêu chưa hoàn thiện 'unstructured babbling' thì chưa du dương được.",
        "D": "permanent (vĩnh viễn) — Bẫy nhầm lẫn: Tiếng kêu này sẽ được hoàn thiện dần theo thời gian (progressively refining)."
      },
      "synonyms": [
        "primitive",
        "basic",
        "elementary",
        "crude"
      ]
    }
  },
  {
    "id": "vic_14",
    "title": "Renaissance Fresco Pigments and Preservation",
    "topic": "Art History & Chemistry",
    "target_word": "impervious",
    "paragraph_index": 2,
    "passage": "The Buon Fresco technique mastered by Italian Renaissance painters such as Giotto and Michelangelo required rigorous technical discipline and extensive knowledge of chemical geology. Unlike secco painting, in which pigments are applied onto dry plaster with organic binders, Buon Fresco demanded that finely ground mineral pigments suspended exclusively in pure water be applied directly onto freshly spread, moist lime plaster (the intonaco).\n\nThe chemical durability of Buon Fresco relies on a carbonation reaction. As the moist calcium hydroxide plaster absorbs carbon dioxide from ambient air, it converts into insoluble calcium carbonate, integrating the pigment particles permanently into the mineral crystalline matrix of the wall itself. Once fully cured, the painted surface becomes essentially impervious to surface moisture and organic bacterial degradation, preserving vivid tonal saturation for centuries.\n\nHowever, this medium severely restricted the artist's chromatic palette. Pigments containing copper, such as azurite and malachite, turn brownish-black or degrade when exposed to the alkaline environment of caustic lime. Consequently, artists were forced to apply blue accents in secco after the wall had dried, explaining why sky backgrounds in many Renaissance frescoes have flaked away while underlying figure drapery remains intact.",
    "question": "The word 'impervious' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "resistant",
      "B": "vulnerable",
      "C": "transparent",
      "D": "sensitive"
    },
    "correct_answer": "A",
    "clue_type": "Definition & Result (Định nghĩa & Kết quả hóa học)",
    "clue_signal": "converts into insoluble calcium carbonate... painted surface becomes essentially impervious to surface moisture... preserving vivid tonal saturation for centuries.",
    "explanation": {
      "meaning": "'Impervious' mang nghĩa không thể thấm qua, có khả năng đề kháng hoặc miễn nhiễm với các tác động bên ngoài.",
      "substitution": "Thế chỗ: 'the painted surface becomes essentially resistant / immune to surface moisture' (bề mặt tranh trở nên hoàn toàn đề kháng / không thấm nước ẩm bên ngoài).",
      "trap_breakdown": {
        "B": "vulnerable (dễ bị tổn thương) — Bẫy trái nghĩa: Tranh fresco có độ bền cực cao qua nhiều thế kỷ chứ không dễ hỏng.",
        "C": "transparent (trong suốt) — Không liên quan tính chất cơ lý hóa.",
        "D": "sensitive (nhạy cảm) — Trái nghĩa với khả năng bảo quản bền vững hàng thế kỷ."
      },
      "synonyms": [
        "resistant",
        "impenetrable",
        "immune",
        "unaffected"
      ]
    }
  },
  {
    "id": "vic_15",
    "title": "Prehistoric Megaherbivore Extinctions in the Americas",
    "topic": "Paleontology & Ecology",
    "target_word": "debilitating",
    "paragraph_index": 2,
    "passage": "At the close of the Pleistocene epoch roughly 11,700 years ago, North and South America witnessed the catastrophic extinction of over seventy percent of their native megafaunal genera. Spectacular mammalian herbivores, including Columbian mammoths, mastodons, giant ground sloths (Megatherium), and glyptodonts, vanished completely from the fossil record within a geological blink of an eye.\n\nPaleoecologists have vigorously contested two divergent hypotheses to explain this rapid demise. The 'overkill hypothesis,' popularized by Paul Martin, posits that arriving Clovis hunters equipped with bifacial fluted projectile points acted as an invasive apex predator, decimating naive megafaunal populations that had evolved without human predation pressure. Conversely, the climate change hypothesis underscores the debilitating environmental stress caused by abrupt deglaciation oscillations, such as the Younger Dryas cold reversal, which radically fragmented vegetation zones and reduced available forage.\n\nRecent multidisciplinary syntheses indicate that neither climate nor human overhunting operated in isolation. Rather, climatic stress contracted megaherbivore ranges into localized ecological refugia, where burgeoning human hunter populations delivered the final coup de grace to already destabilized breeding populations.",
    "question": "The word 'debilitating' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "weakening",
      "B": "negligible",
      "C": "invigorating",
      "D": "beneficial"
    },
    "correct_answer": "A",
    "clue_type": "Cause & Effect (Nguyên nhân - Hệ quả sinh thái)",
    "clue_signal": "underscores the debilitating environmental stress caused by abrupt deglaciation... radically fragmented vegetation zones and reduced available forage.",
    "explanation": {
      "meaning": "'Debilitating' là tính từ mang nghĩa làm suy kiệt, làm kiệt quệ sức lực, gây suy yếu nghiêm trọng.",
      "substitution": "Thế chỗ: 'underscores the weakening / incapacitating environmental stress' (nhấn mạnh áp lực môi trường gây suy kiệt các đàn thú lớn).",
      "trap_breakdown": {
        "B": "negligible (không đáng kể) — Trái ngược với hậu quả gây ra tuyệt chủng trên diện rộng.",
        "C": "invigorating (tiếp thêm sinh lực) — Trái nghĩa hoàn toàn.",
        "D": "beneficial (có lợi) — Trái nghĩa với hoàn cảnh thảm khốc của biến đổi khí hậu băng hà."
      },
      "synonyms": [
        "weakening",
        "incapacitating",
        "crippling",
        "enervating"
      ]
    }
  },
  {
    "id": "vic_16",
    "title": "The Physics of Superconductivity and BCS Theory",
    "topic": "Solid-State Physics",
    "target_word": "vanishing",
    "paragraph_index": 1,
    "passage": "Superconductivity represents one of the most striking quantum macroscopic phenomena discovered in condensed-matter physics. When certain metallic elements and chemical alloys are cooled beneath a discrete material-specific transition threshold termed the critical temperature (Tc), their electrical resistivity drops abruptly to precisely zero. Currents introduced into a closed superconducting ring will circulate without measurable decay for years, indicative of vanishing ohmic resistance.\n\nIn addition to perfect electrical conductivity, superconductors exhibit the Meissner effect—the complete expulsion of internal magnetic flux lines from their bulk interior. When a superconductor is placed within an external magnetic field, screening surface currents spontaneously emerge to generate an opposing interior field that cancels the applied flux, causing the material to levitate stably above permanent magnets.\n\nThe microscopic explanation for conventional low-temperature superconductivity was articulated in 1957 by John Bardeen, Leon Cooper, and John Robert Schrieffer (BCS theory). They demonstrated that subtle electron-phonon lattice vibrations overcome electrostatic Coulomb repulsion, binding conduction electrons into correlated pairs known as Cooper pairs that traverse crystal lattices without scattering.",
    "question": "The word 'vanishing' in paragraph 1 is closest in meaning to:",
    "options": {
      "A": "disappearing",
      "B": "expanding",
      "C": "unpredictable",
      "D": "fluctuating"
    },
    "correct_answer": "A",
    "clue_type": "Restatement & Context (Diễn giải & Đồng nghĩa ngữ cảnh)",
    "clue_signal": "electrical resistivity drops abruptly to precisely zero... circulate without measurable decay for years, indicative of vanishing ohmic resistance.",
    "explanation": {
      "meaning": "'Vanishing' trong vật lý/toán học chỉ trạng thái tiêu biến, giảm dần về con số 0.",
      "substitution": "Thế chỗ: 'indicative of disappearing / zero ohmic resistance' (biểu hiện của điện trở tiêu biến hoàn toàn về 0).",
      "trap_breakdown": {
        "B": "expanding (mở rộng) — Bẫy trái nghĩa: Điện trở giảm về 0 chứ không tăng lên.",
        "C": "unpredictable (không đoán trước được) — Tính chất siêu dẫn tuân thủ định luật vật lý chính xác.",
        "D": "fluctuating (dao động) — Dòng điện chạy ổn định liên tục, không hề biến thiên hay dao động."
      },
      "synonyms": [
        "disappearing",
        "diminishing",
        "fading",
        "evanescent"
      ]
    }
  },
  {
    "id": "vic_17",
    "title": "Termite Mound Architecture and Biomimetic Engineering",
    "topic": "Architecture & Entomology",
    "target_word": "ingenious",
    "paragraph_index": 2,
    "passage": "Macrotermes bellicosus, a mound-building fungus-growing termite species endemic to tropical African savannas, constructs towering earthen biostructures that can exceed eight meters in vertical height. These biogenic mounds must maintain a remarkably stable internal environment: the termites cultivate subterranean monocultures of a delicate symbiotic fungus (Termitomyces) that perish if nest temperatures deviate beyond a narrow band centered around 30 degrees Celsius or if ambient carbon dioxide exceeds two percent.\n\nTo maintain these strict microclimatic tolerances under extreme diurnal savanna temperature swings, termites utilize an ingenious passive ventilation architecture. The outer walls of the spire contain thousands of micro-porous channels that interface with subterranean vertical conduits. Metabolic heat generated by millions of respiring insects and fungal comb beds acts as a thermal chimney, propelling warm, stale air upward through a central shaft, while fresh, oxygen-rich ambient air is siphoned inward through peripheral low-pressure conduits.\n\nHuman architects have embraced this biological model to curtail mechanical HVAC energy consumption. Mick Pearce designed the Eastgate Centre in Harare, Zimbabwe, drawing direct inspiration from termite ventilation dynamics to cool the multi-story complex passively without conventional air conditioning units.",
    "question": "The word 'ingenious' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "clever",
      "B": "cumbersome",
      "C": "inefficient",
      "D": "hazardous"
    },
    "correct_answer": "A",
    "clue_type": "Elaboration & Definition (Mở rộng & Diễn giải)",
    "clue_signal": "termites utilize an ingenious passive ventilation architecture. The outer walls contain thousands of micro-porous channels... thermal chimney...",
    "explanation": {
      "meaning": "'Ingenious' là tính từ chỉ những giải pháp tài tình, khéo léo, mang tính sáng tạo đột phá.",
      "substitution": "Thế chỗ: 'termites utilize a clever / brilliant passive ventilation architecture' (loài mối sử dụng một cấu trúc thông gió thụ động hết sức tài tình).",
      "trap_breakdown": {
        "B": "cumbersome (cồng kềnh, nặng nề) — Bẫy liên tưởng tổ mối to lớn, nhưng cấu trúc vận hành của nó rất tinh tế.",
        "C": "inefficient (kém hiệu quả) — Trái nghĩa: Hệ thống làm mát này hiệu quả đến mức con người phải học tập.",
        "D": "hazardous (nguy hiểm) — Không liên quan đến tính chất sáng tạo kỹ thuật."
      },
      "synonyms": [
        "clever",
        "inventive",
        "resourceful",
        "brilliant"
      ]
    }
  },
  {
    "id": "vic_18",
    "title": "The Evolution of Avian Feathers from Theropod Dinosaurs",
    "topic": "Evolutionary Biology & Paleontology",
    "target_word": "exaptation",
    "paragraph_index": 2,
    "passage": "The discovery of exceptionally preserved non-avian theropod fossils throughout the Liaoning Province of northeastern China during the late 1990s revolutionized vertebrate paleontology. Imprints within fine-grained lacustrine tuffaceous shales demonstrated that long before the emergence of powered aerodynamic flight, numerous terrestrial carnivorous coelurosaurs possessed plumage remarkably similar to modern avian feathers.\n\nThis anatomical sequence exemplifies evolutionary exaptation—the shift in the biological function of a physical trait during evolution. Primitive 'protofeathers' found on basal compsognathids and tyrannosauroids were simple unbranched hollow filaments termed stage I feathers. Because these diminutive ancestral structures were aerodynamically useless for generating lift, biologists deduce they originally evolved for thermoregulatory insulation in small, active endothermic dinosaurs or for vivid chromatic sociosexual display.\n\nOnly millions of years later did complex branching, asymmetrical vanes, and interlocking microscopic barbules emerge in maniraptoran clades such as Microraptor and Archaeopteryx, co-opting pre-existing thermal plumulaceous structures for gliding and active powered flapping.",
    "question": "The word 'exaptation' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "functional repurposing",
      "B": "sudden extinction",
      "C": "mechanical failure",
      "D": "genetic mutation"
    },
    "correct_answer": "A",
    "clue_type": "Definition & Restatement (Định nghĩa trực tiếp ngay sau dấu gạch ngang)",
    "clue_signal": "evolutionary exaptation—the shift in the biological function of a physical trait during evolution.",
    "explanation": {
      "meaning": "'Exaptation' là thuật ngữ sinh học tiến hóa chỉ sự chuyển đổi công năng của một cơ quan (ban đầu sinh ra với mục đích A, sau này thích nghi để phục vụ mục đích B).",
      "substitution": "Thế chỗ: 'exemplifies functional repurposing—the shift in the biological function' hoàn toàn trùng khớp với định nghĩa tác giả đưa ra ngay sau dấu gạch ngang '—'.",
      "trap_breakdown": {
        "B": "sudden extinction (tuyệt chủng đột ngột) — Bẫy liên tưởng khủng long tuyệt chủng, hoàn toàn sai nghĩa của exaptation.",
        "C": "mechanical failure (lỗi cơ học) — Không liên quan ngữ cảnh tiến hóa.",
        "D": "genetic mutation (đột biến gen) — Đột biến là nguyên nhân phân tử, còn exaptation là sự thay đổi công năng sinh học cấp độ kiểu hình."
      },
      "synonyms": [
        "functional repurposing",
        "co-option",
        "adaptation shift"
      ]
    }
  },
  {
    "id": "vic_19",
    "title": "Atmospheric Methane and Clathrate Hydrate Instability",
    "topic": "Geochemistry & Climatology",
    "target_word": "catastrophic",
    "paragraph_index": 2,
    "passage": "Methane clathrate hydrate is a solid, crystalline ice-like substance in which vast quantities of methane gas molecules are physically trapped within hydrogen-bonded cages of water molecules. Formed under conditions of high hydrostatic pressure and low ambient temperature, oceanic methane clathrates reside in vast sedimentary reservoirs along continental margins and beneath high-latitude Arctic terrestrial permafrost.\n\nThe physical stability of these marine hydrate deposits is acutely sensitive to ocean thermal anomalies. If bottom ocean temperatures increase by merely a few degrees Celsius, the clathrate thermodynamic stability zone contracts upward, triggering thermal dissociation that releases massive quantities of gaseous methane into the water column. Because methane is a greenhouse gas with a global warming potential more than twenty-five times greater than carbon dioxide over a century timescale, large-scale venting could incite a catastrophic positive feedback runaway warming loop.\n\nGeological precedents suggest this mechanism triggered past hyperthermal events. During the Paleocene-Eocene Thermal Maximum (PETM) approximately 56 million years ago, widespread benthic carbon isotope excursions coincided with a five-to-eight degree spike in planetary temperature, consistent with massive submarine clathrate desiccation.",
    "question": "The word 'catastrophic' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "disastrous",
      "B": "beneficial",
      "C": "gradual",
      "D": "temporary"
    },
    "correct_answer": "A",
    "clue_type": "Cause & Effect / Collocation (Nguyên nhân & Kết hợp từ)",
    "clue_signal": "global warming potential more than twenty-five times greater... large-scale venting could incite a catastrophic positive feedback runaway warming loop.",
    "explanation": {
      "meaning": "'Catastrophic' mang nghĩa thảm họa, thảm khốc, gây hủy hoại nghiêm trọng trên quy mô lớn.",
      "substitution": "Thế chỗ: 'incite a disastrous / ruinous positive feedback runaway warming loop' (châm ngòi cho một vòng lặp ấm lên mất kiểm soát mang tính thảm họa).",
      "trap_breakdown": {
        "B": "beneficial (có lợi) — Trái ngược hoàn toàn với nguy cơ ấm lên toàn cầu mất kiểm soát.",
        "C": "gradual (từ từ) — 'Runaway warming' chỉ sự bùng nổ mất kiểm soát nhanh chóng.",
        "D": "temporary (tạm thời) — Chu trình khí hậu này kéo dài hàng chục ngàn năm, không hề tạm thời."
      },
      "synonyms": [
        "disastrous",
        "calamitous",
        "devastating",
        "ruinous"
      ]
    }
  },
  {
    "id": "vic_20",
    "title": "Roman Concrete and Hydraulic Lime Durability",
    "topic": "Civil Engineering & History",
    "target_word": "unrivaled",
    "paragraph_index": 1,
    "passage": "While modern Portland cement structures frequently deteriorate within fifty to one hundred years under continuous exposure to marine waves, maritime harbor structures constructed by Roman engineers over two thousand years ago remain structurally robust today. The maritime breakwaters at Caesarea Maritima and Pozzuoli exhibit an unrivaled resilience that has captivated civil engineers and materials scientists for decades.\n\nThe secret behind this enduring durability lies in the unique chemical formulation of opus caementicium. Roman builders combined volcanic ash—specifically pozzolana excavated from regions surrounding the Gulf of Naples—with slaked lime and volcanic tuff aggregate. When immersed in seawater, this formulation underwent an active post-curing chemical transformation rather than passive weathering.\n\nRecent high-resolution synchrotron X-ray microdiffraction reveals that saline water percolating through the porous concrete dissolved volcanic glass components, precipitating rare interlocking aluminum-tobermorite crystals alongside phillipsite. These mineral growths mechanically reinforced microcracks within the mortar over millennia, effectively endowing Roman concrete with self-healing capacity in salt water.",
    "question": "The word 'unrivaled' in paragraph 1 is closest in meaning to:",
    "options": {
      "A": "peerless",
      "B": "ordinary",
      "C": "hazardous",
      "D": "unreliable"
    },
    "correct_answer": "A",
    "clue_type": "Contrast & Degree (Tương phản & Cấp độ vượt trội)",
    "clue_signal": "While modern structures frequently deteriorate within fifty to one hundred years... Roman structures constructed over two thousand years ago remain structurally robust... exhibit an unrivaled resilience...",
    "explanation": {
      "meaning": "'Unrivaled' là tính từ mang nghĩa không có đối thủ, vô song, vượt trội hơn tất cả (peerless / unmatched).",
      "substitution": "Thế chỗ: 'exhibit a peerless / unmatched resilience' (thể hiện một sức bền vô song) tương phản với bê tông hiện đại vốn nhanh hỏng sau 50-100 năm.",
      "trap_breakdown": {
        "B": "ordinary (bình thường) — Bẫy trái nghĩa: Sức bền 2000 năm của người La Mã là phi thường, không hề bình thường.",
        "C": "hazardous (nguy hiểm) — Không liên quan đến chất lượng độ bền công trình.",
        "D": "unreliable (không đáng tin) — Trái nghĩa: Bê tông La Mã đã trụ vững hơn 2000 năm chứng minh độ bền bỉ đáng kinh ngạc."
      },
      "synonyms": [
        "peerless",
        "unmatched",
        "unparalleled",
        "incomparable"
      ]
    }
  },
  {
    "id": "vic_21",
    "title": "Epigenetics and Chromatin Remodeling",
    "topic": "Molecular Genetics",
    "target_word": "reversible",
    "paragraph_index": 2,
    "passage": "Classical Mendelian genetics conceptualized the DNA nucleotide sequence as an inflexible blueprint dictating cellular phenotype through transcription and translation. However, the burgeoning discipline of epigenetics demonstrates that gene expression can be profoundly modulated without altering the underlying genetic code. Chemical tags appended directly to DNA nucleotides or histones govern which genetic loci are accessible to transcription factors.\n\nTwo primary epigenetic modifications dominate chromatin architecture: DNA methylation and histone acetylation. The covalent addition of methyl groups to cytosine residues typically represses transcription by condensing open euchromatin into dense heterochromatin. Conversely, histone acetyltransferases transfer acetyl groups to lysine residues, neutralizing positive charges on histone tails and relaxing chromatin coils to permit transcriptional machinery access. Unlike genetic mutations, which represent permanent alterations to DNA sequences, epigenetic modifications are inherently reversible, permitting dynamic cellular responsiveness to nutritional, stress, and environmental cues.\n\nThis malleability carries profound biomedical ramifications. Pharmaceutical inhibitors targeting aberrant DNA methyltransferases or histone deacetylases can reactivate silenced tumor suppressor genes in cancerous lineages without inducing permanent genetic damage.",
    "question": "The word 'reversible' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "changeable",
      "B": "permanent",
      "C": "destructive",
      "D": "lethal"
    },
    "correct_answer": "A",
    "clue_type": "Contrast & Opposition (Tương phản trực tiếp với permanent)",
    "clue_signal": "Unlike genetic mutations, which represent permanent alterations to DNA sequences, epigenetic modifications are inherently reversible...",
    "explanation": {
      "meaning": "'Reversible' mang nghĩa có thể đảo ngược, có thể hoàn nguyên hoặc thay đổi linh hoạt.",
      "substitution": "Thế chỗ: 'epigenetic modifications are inherently changeable / capable of being undone' đối lập trực tiếp với 'permanent alterations' (thay đổi vĩnh viễn) của đột biến gen.",
      "trap_breakdown": {
        "B": "permanent (vĩnh viễn) — Bẫy trái nghĩa trực tiếp được đưa ra để kiểm tra thí sinh có nhìn ra cấu trúc 'Unlike X, Y is...'.",
        "C": "destructive (phá hủy) — Thay đổi biểu sinh giúp điều hòa tế bào chứ không phải phá hủy.",
        "D": "lethal (gây chết) — Không liên quan đến tính thuận nghịch của phản ứng sinh hóa."
      },
      "synonyms": [
        "changeable",
        "alterable",
        "capable of being undone",
        "mutable"
      ]
    }
  },
  {
    "id": "vic_22",
    "title": "K-Selected versus r-Selected Reproductive Strategies",
    "topic": "Ecology & Population Biology",
    "target_word": "prolific",
    "paragraph_index": 2,
    "passage": "In evolutionary ecology, MacArthur and Wilson formulated r/K selection theory to model how disparate selective pressures govern the reproductive trade-offs of organismal life histories. Organisms occupy a continuum between two evolutionary endpoints: r-strategists, which maximize reproductive rate in unstable environments, and K-strategists, which optimize competitive fitness near environmental carrying capacity.\n\nSpecies exemplifying r-selection—such as dandelions, ephemeral insects, and marine oysters—are prolific breeders. They mature rapidly, allocate immense energetic capital toward producing thousands of minute offspring, and invest zero parental care in progeny survival. Consequently, individual juvenile mortality rates are extraordinarily steep, but sheer reproductive volume ensures that some individuals colonize newly available, disturbed ecological niches before competitors arrive.\n\nIn stark contrast, K-selected species, including elephants, blue whales, and humans, exhibit extended developmental intervals, delayed sexual maturity, and produce small litters. Parents invest prolonged metabolic energy in nurturing, protecting, and educating each offspring, guaranteeing superior individual competitive survival in saturated habitats.",
    "question": "The word 'prolific' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "highly productive",
      "B": "extremely scarce",
      "C": "physically frail",
      "D": "socially cooperative"
    },
    "correct_answer": "A",
    "clue_type": "Elaboration & Definition (Mở rộng & Diễn giải phía sau)",
    "clue_signal": "are prolific breeders. They mature rapidly, allocate immense energetic capital toward producing thousands of minute offspring...",
    "explanation": {
      "meaning": "'Prolific' là tính từ chỉ khả năng sinh sản nhiều, tạo ra số lượng cực lớn các cá thể hoặc tác phẩm (sinh sôi nảy nở mạnh mẽ).",
      "substitution": "Thế chỗ: 'are highly productive / abundant breeders' hoàn toàn khớp với câu giải thích tiếp theo 'producing thousands of offspring'.",
      "trap_breakdown": {
        "B": "extremely scarce (cực kỳ khan hiếm) — Bẫy trái nghĩa hoàn toàn với khả năng đẻ hàng ngàn con.",
        "C": "physically frail (yếu ớt về thể chất) — Bẫy gây nhiễu vì con non nhỏ bé (minute offspring), nhưng prolific nói về khả năng sinh sản của cả loài.",
        "D": "socially cooperative (hợp tác xã hội) — Bẫy nhầm lẫn: Loài này không chăm sóc con cái (zero parental care) nên không phải hợp tác."
      },
      "synonyms": [
        "highly productive",
        "copious",
        "fecund",
        "fruitful",
        "fertile"
      ]
    }
  },
  {
    "id": "vic_23",
    "title": "Gravitational Lensing as a Probe for Dark Matter",
    "topic": "Astrophysics & Cosmology",
    "target_word": "distorted",
    "paragraph_index": 2,
    "passage": "General relativity predicts that the presence of mass warps the geometry of spacetime around it. Consequently, when electromagnetic radiation emitted by a remote luminous background source—such as a distant quasar or young starburst galaxy—traverses the gravitational potential well of an intervening massive cluster of galaxies, the trajectory of the light rays deflects.\n\nThis deflection produces striking observational signatures known as gravitational lensing. Depending on the precise alignment along the cosmic line of sight, background images appear dramatically magnified, multiplied, or sheared into elongated, distorted arclets curving around the lensing cluster core. By mathematically modeling these optical deformations, cosmologists reconstruct the precise total gravitational mass responsible for the lensing effect.\n\nCrucially, the inferred mass consistently exceeds the observable baryonic mass (luminous stars and X-ray-emitting hot gas) by a ratio of roughly six to one. This pronounced discrepancy provides compelling empirical verification for the existence of non-baryonic cold dark matter permeating cosmic halos.",
    "question": "The word 'distorted' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "deformed",
      "B": "sharpened",
      "C": "authentic",
      "D": "extinguished"
    },
    "correct_answer": "A",
    "clue_type": "Collocation & Restatement (Kết hợp từ & Diễn giải)",
    "clue_signal": "sheared into elongated, distorted arclets curving around... modeling these optical deformations...",
    "explanation": {
      "meaning": "'Distorted' mang nghĩa bị bẻ cong, biến dạng, làm méo mó so với hình dạng chuẩn ban đầu.",
      "substitution": "Thế chỗ: 'sheared into elongated, deformed arclets... modeling these optical deformations' (bị kéo dài và biến dạng thành các vòng cung).",
      "trap_breakdown": {
        "B": "sharpened (sắc nét hơn) — Bẫy trái nghĩa: Hình ảnh bị kéo cong và méo mó chứ không sắc sảo quang học.",
        "C": "authentic (nguyên bản) — Bẫy trái nghĩa: Hình ảnh quan sát được đã bị biến đổi so với vật thể thật.",
        "D": "extinguished (bị dập tắt) — Ánh sáng vẫn đến được kính thiên văn chứ không bị dập tắt."
      },
      "synonyms": [
        "deformed",
        "warped",
        "twisted",
        "misrepresented"
      ]
    }
  },
  {
    "id": "vic_24",
    "title": "The Transition from Hunter-Gatherer to Sedentary Agriculture",
    "topic": "Anthropology & Archaeology",
    "target_word": "precarious",
    "paragraph_index": 1,
    "passage": "The agricultural transition during the early Holocene epoch, colloquially designated the Neolithic Revolution, represented arguably the most consequential socioeconomic transformation in human history. For hundreds of millennia, anatomically modern humans sustained themselves through nomadic foraging, hunting wild game, and collecting seasonal flora. While popular imagination long envisioned this foraging lifestyle as a precarious existence fraught with chronic starvation, ethnographic and paleopathological evidence challenges this bleak characterization.\n\nContemporary hunter-gatherers studied in marginal environments frequently enjoy diverse dietary intake and devote fewer weekly hours to subsistence acquisition than agrarian peasant laborers. Furthermore, skeletal comparisons between pre-agricultural Natufian foragers and early Levantine farmers reveal an unexpected paradox: early agriculturalists exhibited higher rates of dental caries, iron-deficiency anemia, and stunted stature.\n\nThe transition to sedentary farming appears to have been propelled not by an immediate improvement in personal quality of life, but by demographic pressures and climate stabilization that made intense grain cultivation necessary to feed expanding populations.",
    "question": "The word 'precarious' in paragraph 1 is closest in meaning to:",
    "options": {
      "A": "unstable",
      "B": "prosperous",
      "C": "organized",
      "D": "peaceful"
    },
    "correct_answer": "A",
    "clue_type": "Contrast & Parallelism (Tương phản & Song hành với rủi ro)",
    "clue_signal": "envisioned this foraging lifestyle as a precarious existence fraught with chronic starvation, ethnographic evidence challenges this bleak characterization.",
    "explanation": {
      "meaning": "'Precarious' mang nghĩa bấp bênh, mong manh, đầy rủi ro và không ổn định.",
      "substitution": "Thế chỗ: 'a precarious / unstable existence fraught with chronic starvation' (một cuộc sống bấp bênh đầy rẫy hiểm họa đói ăn triền miên).",
      "trap_breakdown": {
        "B": "prosperous (thịnh vượng) — Bẫy trái nghĩa với tình cảnh đói ăn (starvation).",
        "C": "organized (có tổ chức) — Không phù hợp miêu tả sự bấp bênh của đời sống du mục tiền sử.",
        "D": "peaceful (thanh bình) — Lạc đề hoàn toàn."
      },
      "synonyms": [
        "unstable",
        "insecure",
        "perilous",
        "uncertain",
        "hazardous"
      ]
    }
  },
  {
    "id": "vic_25",
    "title": "Bioluminescence in Deep-Sea Cephalopods",
    "topic": "Marine Biology & Optics",
    "target_word": "conceal",
    "paragraph_index": 2,
    "passage": "In the ocean's mesopelagic 'twilight zone'—stretching between 200 and 1,000 meters below the surface—ambient downwelling sunlight is too feeble to sustain photosynthesis but sufficiently bright to silhouette swimming organisms against the illuminated surface. Predators scanning upward easily detect opaque prey outlined against the faint bluish skylight above.\n\nTo survive in this predator-dense corridor, numerous midwater squid and teleost fish utilize counterillumination, an active optical camouflage mechanism. Midwater squids possess specialized ventral photophores—light-producing organs containing luciferin and luciferase enzymes. By regulating the intensity, angular distribution, and wavelength of the ventral light they emit, these cephalopods precisely match downwelling sunlight. This counterillumination allows them to conceal their silhouette completely from upward-looking pelagic predators swimming below.\n\nRemarkably, some squid species adjust their photophore emission in real time as cloud cover passes over the surface ocean above, utilizing dedicated extraocular photoreceptors to detect shifts in ambient light and modulate their photophore output accordingly.",
    "question": "The word 'conceal' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "hide",
      "B": "magnify",
      "C": "broadcast",
      "D": "abandon"
    },
    "correct_answer": "A",
    "clue_type": "Definition & Purpose (Mục đích ngụy trang quang học)",
    "clue_signal": "active optical camouflage mechanism... match downwelling sunlight. This counterillumination allows them to conceal their silhouette completely...",
    "explanation": {
      "meaning": "'Conceal' là ngoại động từ chỉ hành động che giấu, ngụy trang để không bị phát hiện.",
      "substitution": "Thế chỗ: 'allows them to hide / disguise their silhouette completely from predators' (cho phép chúng che giấu hoàn toàn bóng đen cơ thể khỏi kẻ săn mồi).",
      "trap_breakdown": {
        "B": "magnify (phóng đại) — Bẫy trái nghĩa: Phát sáng là để triệt tiêu bóng đen, không phải phóng đại bóng đen lên.",
        "C": "broadcast (phát sóng, truyền tin) — Mực phát sáng để ẩn nấp chứ không phải để thông báo sự hiện diện của mình.",
        "D": "abandon (bỏ rơi) — Sai lệch logic ngụy trang."
      },
      "synonyms": [
        "hide",
        "disguise",
        "mask",
        "obscure",
        "camouflage"
      ]
    }
  },
  {
    "id": "vic_26",
    "title": "The Printing Press and Early Modern Typography",
    "topic": "History of Technology",
    "target_word": "proliferated",
    "paragraph_index": 2,
    "passage": "Johannes Gutenberg's mid-fifteenth-century invention of movable metal type, oil-based ink, and the screw press represented a monumental technical paradigm shift in Western information dissemination. Prior to this innovation, the transcription of manuscripts depended exclusively on the laborious manual labor of monastic scribes, rendering codices luxury possessions reserved for aristocratic elites.\n\nOnce printing workshops were established in Mainz, technical know-how spread across European trade routes with astonishing velocity. By 1500, printing establishments proliferated throughout over two hundred cities across the continent, producing an estimated twenty million volumes in under fifty years. This mass dissemination broke the ecclesiastical monopoly over scriptural interpretation and sparked regional scientific inquiries.",
    "question": "The word 'proliferated' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "multiplied",
      "B": "declined",
      "C": "collapsed",
      "D": "relocated"
    },
    "correct_answer": "A",
    "clue_type": "Elaboration / Number Increase (Mở rộng & Gia tăng số lượng)",
    "clue_signal": "established in Mainz, spread across European trade routes... proliferated throughout over two hundred cities... producing twenty million volumes...",
    "explanation": {
      "meaning": "'Proliferate' là động từ chỉ sự sinh sôi nảy nở nhanh chóng, nhân lên gấp nhiều lần về số lượng.",
      "substitution": "Thế chỗ: 'printing establishments multiplied / spread rapidly throughout over two hundred cities' ăn khớp hoàn toàn với con số 20 triệu cuốn sách xuất bản trong 50 năm.",
      "trap_breakdown": {
        "B": "declined (suy giảm) — Bẫy trái nghĩa với làn sóng bùng nổ của nhà in.",
        "C": "collapsed (sụp đổ) — Trái ngược hoàn toàn sự phát triển vũ bão.",
        "D": "relocated (di dời) — Các xưởng in mới được thành lập và mở rộng thêm chứ không phải di chuyển từ chỗ này sang chỗ khác."
      },
      "synonyms": [
        "multiplied",
        "mushroomed",
        "expanded rapidly",
        "burgeoned"
      ]
    }
  },
  {
    "id": "vic_27",
    "title": "Photosynthetic Carbon Fixation: C3 versus C4 Pathways",
    "topic": "Plant Biology & Biochemistry",
    "target_word": "deleterious",
    "paragraph_index": 2,
    "passage": "In typical C3 photosynthetic plants, carbon dioxide is captured directly from the atmosphere by the enzyme ribulose-1,5-bisphosphate carboxylase-oxygenase (RuBisCO). However, RuBisCO evolved during the primordial Archean era when atmospheric oxygen was virtually absent, leaving the catalytic active site susceptible to competitive binding with oxygen molecules.\n\nUnder hot, arid conditions, when plants must close their stomata to prevent dehydration, internal oxygen concentrations rise while carbon dioxide diminishes. Under these conditions, RuBisCO binds oxygen instead of carbon dioxide, initiating photorespiration. This deleterious pathway consumes ATP and expels previously fixed carbon without generating sugar, reducing photosynthetic efficiency by as much as forty percent.\n\nTo evade this energetic loss, C4 plants like maize and sugarcane evolved a specialized Kranz anatomy that physically segregates initial carbon capture from the Calvin cycle, utilizing PEP carboxylase to concentrate carbon dioxide around RuBisCO.",
    "question": "The word 'deleterious' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "harmful",
      "B": "beneficial",
      "C": "accidental",
      "D": "imperceptible"
    },
    "correct_answer": "A",
    "clue_type": "Cause & Effect (Nguyên nhân - Hệ quả tiêu cực)",
    "clue_signal": "consumes ATP and expels previously fixed carbon without generating sugar, reducing photosynthetic efficiency by as much as forty percent.",
    "explanation": {
      "meaning": "'Deleterious' là tính từ học thuật mang nghĩa có hại, gây tổn hại hoặc làm suy giảm hiệu suất.",
      "substitution": "Thế chỗ: 'This harmful / detrimental pathway consumes ATP... reducing efficiency by 40%' hoàn toàn logic với tác hại làm mất năng lượng của quang hô hấp.",
      "trap_breakdown": {
        "B": "beneficial (có lợi) — Bẫy trái nghĩa: Quá trình này làm mất năng lượng và giảm 40% sản lượng quang hợp nên không thể có lợi.",
        "C": "accidental (ngẫu nhiên) — Đây là con đường sinh hóa tất yếu của enzyme chứ không phải tai nạn ngẫu nhiên.",
        "D": "imperceptible (không thể nhận thấy) — Sự sụt giảm 40% là con số khổng lồ, hoàn toàn thấy rõ."
      },
      "synonyms": [
        "harmful",
        "detrimental",
        "injurious",
        "damaging"
      ]
    }
  },
  {
    "id": "vic_28",
    "title": "Tectonic Subduction Zones and Megathrust Earthquakes",
    "topic": "Geophysics & Seismology",
    "target_word": "abruptly",
    "paragraph_index": 2,
    "passage": "Convergent tectonic plate boundaries, where dense oceanic lithosphere descends beneath buoyant continental crust in subduction zones, generate Earth's most powerful seismic events. As the subducting oceanic plate slides downward, immense frictional resistance along the contact interface locks the plates together, preventing smooth steady-state sliding.\n\nOver centuries of continuous plate convergence, elastic strain energy accumulates in the locked upper plate, causing the leading edge of the continental margin to flex downward and compress laterally. When accumulated stress finally exceeds the shear strength of the fault asperities, the locked zone ruptures abruptly, unleashing a megathrust earthquake that slips meters in seconds and displaces massive volumes of seawater to generate transoceanic tsunamis.",
    "question": "The word 'abruptly' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "suddenly",
      "B": "gradually",
      "C": "quietly",
      "D": "reliably"
    },
    "correct_answer": "A",
    "clue_type": "Contrast & Speed (Tương phản giữa tích lũy hàng thế kỷ và đứt gãy tức thì)",
    "clue_signal": "Over centuries of continuous plate convergence... When accumulated stress exceeds... ruptures abruptly, unleashing a megathrust earthquake that slips meters in seconds...",
    "explanation": {
      "meaning": "'Abruptly' là phó từ chỉ hành động xảy ra bất thình lình, đột ngột không báo trước.",
      "substitution": "Thế chỗ: 'the locked zone ruptures suddenly / instantaneously' tương phản với hàng thế kỷ tích lũy năng lượng và trượt hàng mét chỉ trong vài giây.",
      "trap_breakdown": {
        "B": "gradually (dần dần) — Bẫy trái nghĩa: Đứt gãy động đất xảy ra trong vài giây, hoàn toàn đối lập với tích lũy từ từ.",
        "C": "quietly (lặng lẽ) — Động đất megathrust là biến cố rung chuyển dữ dội, không hề yên lặng.",
        "D": "reliably (đáng tin cậy) — Không phù hợp miêu tả sự đứt gãy địa chất."
      },
      "synonyms": [
        "suddenly",
        "unexpectedly",
        "precipitously",
        "instantaneously"
      ]
    }
  },
  {
    "id": "vic_29",
    "title": "Symbiotic Nitrogen Fixation in Legume Nodules",
    "topic": "Agronomy & Microbiology",
    "target_word": "inhibit",
    "paragraph_index": 2,
    "passage": "Atmospheric nitrogen gas constitutes seventy-eight percent of dry air, yet its strong diatomic triple covalent bond makes it chemically inaccessible to eukaryotic plants. To overcome this limitation, leguminous plants form an intimate mutualistic symbiosis with soil-dwelling bacteria of the genus Rhizobium.\n\nThe biochemical engine of nitrogen reduction is the nitrogenase enzyme complex, which converts dinitrogen gas into bioavailable ammonium. However, nitrogenase is extraordinarily sensitive to molecular oxygen; even trace levels of free oxygen irreversible denature the enzyme and completely inhibit catalytic activity. To resolve this paradox—as rhizobia require oxygen for aerobic ATP synthesis to fuel the costly reaction—the plant synthesizes leghemoglobin, a high-affinity oxygen-binding metalloprotein that buffers free oxygen concentrations while delivering oxygen precisely to bacterial respiratory chains.",
    "question": "The word 'inhibit' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "suppress",
      "B": "accelerate",
      "C": "verify",
      "D": "replicate"
    },
    "correct_answer": "A",
    "clue_type": "Cause & Effect (Nguyên nhân - Hệ quả ức chế enzyme)",
    "clue_signal": "nitrogenase is extraordinarily sensitive to molecular oxygen; even trace levels of free oxygen irreversible denature the enzyme and completely inhibit catalytic activity.",
    "explanation": {
      "meaning": "'Inhibit' là ngoại động từ chỉ hành động ức chế, ngăn cản, triệt tiêu hoạt động của một phản ứng hoặc quá trình.",
      "substitution": "Thế chỗ: 'denature the enzyme and completely suppress / block catalytic activity' (làm biến tính enzyme và ức chế hoàn toàn hoạt tính xúc tác).",
      "trap_breakdown": {
        "B": "accelerate (thúc đẩy nhanh) — Bẫy trái nghĩa hoàn toàn: Khí oxy làm hỏng enzyme chứ không thúc đẩy.",
        "C": "verify (xác thực) — Lạc đề ngữ cảnh sinh học.",
        "D": "replicate (sao chép) — Không liên quan đến hoạt động xúc tác hóa sinh."
      },
      "synonyms": [
        "suppress",
        "hinder",
        "impede",
        "block",
        "stymie"
      ]
    }
  },
  {
    "id": "vic_30",
    "title": "Maya Hieroglyphic Decipherment and Epigraphy",
    "topic": "Linguistics & Epigraphy",
    "target_word": "erroneous",
    "paragraph_index": 1,
    "passage": "For over a century, Mesoamerican scholars operated under the conviction that Classic Maya glyphic writing was purely ideographic or symbolic, representing mystical astronomical cycles and esoteric religious abstractions rather than spoken phonemes. This erroneous presupposition was championed by prominent British Mayanist J. Eric S. Thompson, who firmly rejected any phonetic linguistic basis for Maya script.\n\nThe breakthrough occurred in the 1950s when Russian linguist Yuri Knorozov applied comparative epigraphic methodologies to Diego de Landa's sixteenth-century manuscript. Knorozov realized that Maya writing was logosyllabic—combining logograms with phonetic syllables. Subsequent epigraphers corroborated Knorozov's thesis, revealing that Maya monuments did not record timeless astronomical mysticism, but detailed historical chronologies of royal accessions, military alliances, and dynastic conquests.",
    "question": "The word 'erroneous' in paragraph 1 is closest in meaning to:",
    "options": {
      "A": "incorrect",
      "B": "universal",
      "C": "lucrative",
      "D": "insightful"
    },
    "correct_answer": "A",
    "clue_type": "Contrast & Correction (Tương phản với bước đột phá đúng đắn)",
    "clue_signal": "This erroneous presupposition was championed by... The breakthrough occurred when... revealing that Maya monuments did not record mysticism, but historical chronologies...",
    "explanation": {
      "meaning": "'Erroneous' là tính từ mang nghĩa sai lầm, dựa trên nhận định không đúng thực tế.",
      "substitution": "Thế chỗ: 'This incorrect / mistaken presupposition was championed' tương phản với bước đột phá sau đó của Yuri Knorozov khi chứng minh chữ Maya là ngữ âm.",
      "trap_breakdown": {
        "B": "universal (phổ quát) — Bẫy gây nhiễu vì nhiều người từng tin theo, nhưng trọng tâm là giả định này bị sai.",
        "C": "lucrative (sinh lời) — Không liên quan đến nghiên cứu khảo cổ học.",
        "D": "insightful (sâu sắc) — Bẫy trái nghĩa: Quan điểm này đã kìm hãm ngành giải mã cổ ngữ suốt một thế kỷ."
      },
      "synonyms": [
        "incorrect",
        "flawed",
        "mistaken",
        "inaccurate"
      ]
    }
  },
  {
    "id": "vic_31",
    "title": "Metamorphic Core Complexes and Crustal Extension",
    "topic": "Structural Geology",
    "target_word": "exhumed",
    "paragraph_index": 2,
    "passage": "In regional tectonic extensional regimes, such as the Basin and Range province of western North America, the continental crust experiences severe horizontal stretching. While the upper brittle crust accommodates this tension by breaking along steep planar normal faults that form alternating mountain blocks and downdropped grabens, the deeper ductile crust flows horizontally.\n\nWhere crustal extension is particularly acute, low-angle detachment faults decapitate the brittle upper crust. This displacement enables deeply buried, ductilely deformed mid-crustal rocks to be exhumed to the surface as metamorphic core complexes. These exhumed footwall domes exhibit prominent mylonitic shear zones and pervasive stretching lineations that record extreme ductile deformation kilometers beneath ancient mountain belts.",
    "question": "The word 'exhumed' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "brought to light",
      "B": "buried deeper",
      "C": "completely liquefied",
      "D": "chemically dissolved"
    },
    "correct_answer": "A",
    "clue_type": "Direction & Context (Hướng di chuyển địa chất: từ sâu lên bề mặt)",
    "clue_signal": "enables deeply buried, ductilely deformed mid-crustal rocks to be exhumed to the surface as metamorphic core complexes.",
    "explanation": {
      "meaning": "'Exhume' trong địa chất học mang nghĩa đưa các tầng đá bị chôn vùi dưới sâu lộ lên trên bề mặt đất.",
      "substitution": "Thế chỗ: 'rocks to be brought to light / brought to the surface' khớp hoàn hảo với cụm từ 'to the surface' ngay sau đó.",
      "trap_breakdown": {
        "B": "buried deeper (chôn sâu hơn) — Bẫy trái nghĩa hoàn toàn với việc đưa lên bề mặt.",
        "C": "completely liquefied (hóa lỏng hoàn toàn) — Đá biến chất vẫn ở thể rắn, không phải mắc-ma lỏng.",
        "D": "chemically dissolved (hòa tan hóa học) — Không liên quan đến chuyển động kiến tạo mảng."
      },
      "synonyms": [
        "brought to light",
        "uncovered",
        "exposed",
        "unearthed"
      ]
    }
  },
  {
    "id": "vic_32",
    "title": "Keystone Species and Trophic Cascades in Ecology",
    "topic": "Ecology & Conservation",
    "target_word": "disproportionate",
    "paragraph_index": 2,
    "passage": "In 1966, marine ecologist Robert Paine introduced the keystone species concept following pioneering intertidal field manipulation experiments in Makah Bay, Washington. Paine mechanically removed the apex predatory sea star Pisaster ochraceus from experimental rocky intertidal plots while leaving adjacent control plots undisturbed. Within months, the common mussel Mytilus californianus—the sea star's primary prey—monopolized available rocky substrate, outcompeting twenty-five species of algae, barnacles, and limpets and halving overall local species richness.\n\nPaine demonstrated that certain apex organisms exert a disproportionate influence on ecological community architecture relative to their numerical biomass. Although keystone predators may constitute merely a minor fraction of total ecological biomass, their selective consumption suppresses dominant competitors, forestalling competitive exclusion and preserving structural biodiversity across entire trophic networks.",
    "question": "The word 'disproportionate' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "out of proportion",
      "B": "negligible",
      "C": "predictable",
      "D": "equivalent"
    },
    "correct_answer": "A",
    "clue_type": "Elaboration & Contrast (Diễn giải so sánh giữa số lượng nhỏ và tác động khổng lồ)",
    "clue_signal": "disproportionate influence on community architecture relative to their biomass. Although they constitute merely a minor fraction...",
    "explanation": {
      "meaning": "'Disproportionate' mang nghĩa không tương xứng, vượt trội hơn rất nhiều so với tỷ lệ kích thước hay số lượng thực tế.",
      "substitution": "Thế chỗ: 'exert an out-of-proportion / excessively large influence relative to their biomass' (gây ra một tầm ảnh hưởng vượt trội bất cân xứng so với sinh khối nhỏ bé của chúng).",
      "trap_breakdown": {
        "B": "negligible (không đáng kể) — Bẫy trái nghĩa: Tác động của loài keystone là quyết định đến toàn hệ sinh thái.",
        "C": "predictable (dự đoán được) — Không nói về tính chất quy luật dự đoán.",
        "D": "equivalent (tương đương, cân bằng) — Bẫy trái nghĩa: 'Disproportionate' là không tương đương."
      },
      "synonyms": [
        "out of proportion",
        "inordinate",
        "unequal",
        "outsized"
      ]
    }
  },
  {
    "id": "vic_33",
    "title": "The Industrialization of Papermaking",
    "topic": "Economic History",
    "target_word": "scarcity",
    "paragraph_index": 2,
    "passage": "Prior to the mid-nineteenth century, papermaking relied almost exclusively on cellulose fibers harvested from recycled linen and cotton rags. Papermakers pulped discarded cloth textiles, formed individual sheets on handheld wire moulds, and sun-dried them in well-ventilated lofts. As literacy expanded rapidly with the spread of universal primary schooling and popular newspapers, paper mills experienced severe chronic raw material shortages.\n\nThis acute rag scarcity constrained publishing output and inflated book prices across Europe and North America. Inventors experimented frantically with substitutes including straw, seaweed, and asbestos, but none yielded viable printing paper. The breakthrough occurred in the 1840s when German inventor Friedrich Gottlob Keller patented a wood-grinding machine that pulverized softwood timber into mechanical wood pulp. Combined with subsequent chemical sulfite and sulfate digestion processes, wood pulp unlocked an essentially limitless supply of affordable fibrous feedstock.",
    "question": "The word 'scarcity' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "shortage",
      "B": "abundance",
      "C": "purity",
      "D": "durability"
    },
    "correct_answer": "A",
    "clue_type": "Restatement & Parallelism (Diễn giải lặp lại cụm từ trước đó)",
    "clue_signal": "mills experienced severe chronic raw material shortages. This acute rag scarcity constrained publishing output...",
    "explanation": {
      "meaning": "'Scarcity' là danh từ chỉ sự khan hiếm, thiếu thốn nguồn cung cấp trầm trọng.",
      "substitution": "Thế chỗ: 'This acute rag shortage / deficit constrained publishing output' đồng nghĩa trực tiếp với cụm 'material shortages' ở câu ngay trước đó.",
      "trap_breakdown": {
        "B": "abundance (sự dồi dào) — Bẫy trái nghĩa hoàn toàn.",
        "C": "purity (độ tinh khiết) — Không liên quan đến số lượng nguyên liệu.",
        "D": "durability (độ bền) — Giấy làm từ vải rất bền nhưng bài đọc đang nói về số lượng thiếu hụt."
      },
      "synonyms": [
        "shortage",
        "dearth",
        "deficiency",
        "paucity"
      ]
    }
  },
  {
    "id": "vic_34",
    "title": "Neuroplasticity and Cortical Reorganization",
    "topic": "Neuroscience",
    "target_word": "malleable",
    "paragraph_index": 2,
    "passage": "Early twentieth-century neuroscience maintained that the structural architecture of the adult mammalian brain was rigid and immutable following a critical developmental window in early childhood. Cortical sensory maps—such as the somatosensory homunculus or tonotopic auditory representations—were presumed hardwired once neurodevelopment concluded.\n\nThis static dogma was dismantled through seminal primate sensory deprivation experiments conducted by Michael Merzenich in the late 1970s. When peripheral sensory nerves in adult owl monkeys were transected, adjacent uninjured cortical territories expanded into the deactivated zones within weeks. These findings demonstrated that adult neural circuitry remains remarkably malleable throughout life. Synaptic connections continuously strengthen, weaken, or sprout de novo in direct response to behavioral experience, environmental enrichment, and localized neurological injury.",
    "question": "The word 'malleable' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "adaptable",
      "B": "rigid",
      "C": "deteriorating",
      "D": "fragile"
    },
    "correct_answer": "A",
    "clue_type": "Contrast & Opposition (Tương phản với rigid and immutable)",
    "clue_signal": "brain was rigid and immutable... This static dogma was dismantled... adult neural circuitry remains remarkably malleable...",
    "explanation": {
      "meaning": "'Malleable' (gốc từ kim loại dễ uốn) trong khoa học thần kinh mang nghĩa dễ uốn nắn, linh hoạt thích nghi và tái cấu trúc.",
      "substitution": "Thế chỗ: 'adult neural circuitry remains remarkably adaptable / plastic' đối lập trực tiếp với quan điểm cũ coi não bộ là 'rigid and immutable' (cứng nhắc và bất biến).",
      "trap_breakdown": {
        "B": "rigid (cứng nhắc) — Bẫy trái nghĩa trực tiếp từ quan điểm cũ đã bị bác bỏ.",
        "C": "deteriorating (suy thoái) — Thần kinh tái tổ chức linh hoạt chứ không phải thoái hóa.",
        "D": "fragile (dễ vỡ) — Không phản ánh năng lực tái tạo thích nghi."
      },
      "synonyms": [
        "adaptable",
        "pliable",
        "flexible",
        "plastic",
        "moldable"
      ]
    }
  },
  {
    "id": "vic_35",
    "title": "Ocean Acidification and Coral Calcification",
    "topic": "Marine Chemistry & Climate",
    "target_word": "jeopardize",
    "paragraph_index": 2,
    "passage": "Since the dawn of the Industrial Revolution, world oceans have sequestered approximately thirty percent of anthropogenic carbon dioxide emissions, acting as a massive global thermodynamic and chemical sink. While ocean uptake blunts atmospheric greenhouse warming, dissolving carbon dioxide drives fundamental seawater chemistry changes, a systemic phenomenon termed ocean acidification.\n\nWhen carbon dioxide dissolves in water, it forms carbonic acid, which dissociates into hydrogen ions and bicarbonate ions. The surplus hydrogen ions bind with ambient carbonate ions (CO3^2-), severely depleting the concentration of free carbonate available for marine calcifiers. For organisms such as stony scleractinian corals, pteropods, and coccolithophores, this carbonate deficit makes precipitating aragonite skeletons energetically prohibitive. Reduced saturation states jeopardize the structural integrity of tropical barrier reefs, predisposing existing coral frameworks to accelerated bioerosion and wave dissolution.",
    "question": "The word 'jeopardize' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "threaten",
      "B": "fortify",
      "C": "guarantee",
      "D": "conceal"
    },
    "correct_answer": "A",
    "clue_type": "Cause & Effect (Nguyên nhân - Hệ quả nguy hại)",
    "clue_signal": "carbonate deficit makes precipitating skeletons energetically prohibitive. Reduced saturation states jeopardize the structural integrity...",
    "explanation": {
      "meaning": "'Jeopardize' là ngoại động từ chỉ hành động gây nguy hiểm, đe dọa làm tổn hại nghiêm trọng.",
      "substitution": "Thế chỗ: 'Reduced saturation states threaten / endanger the structural integrity' (Làm đe dọa sự vững chắc của các rạn san hô).",
      "trap_breakdown": {
        "B": "fortify (củng cố, gia cố) — Bẫy trái nghĩa hoàn toàn.",
        "C": "guarantee (đảm bảo) — Bẫy trái nghĩa.",
        "D": "conceal (che giấu) — Lạc đề ngữ cảnh hóa học môi trường."
      },
      "synonyms": [
        "threaten",
        "endanger",
        "imperil",
        "risk"
      ]
    }
  },
  {
    "id": "vic_36",
    "title": "The Domestication of the Horse in the Eurasian Steppe",
    "topic": "Archaeology & Steppe History",
    "target_word": "unprecedented",
    "paragraph_index": 2,
    "passage": "The pastoral communities of the Pontic-Caspian steppe initiated horse domestication around 3500 BCE, as attested by wear patterns on fossilized premolars from the Botai culture of Kazakhstan. Initially managed as pastoral livestock for meat and mare's milk in harsh continental winters, the horse soon underwent a revolutionary behavioral and functional transition with the development of bridle control and riding.\n\nEquine mobility endowed steppe pastoralists with unprecedented geographic range. Whereas foot foragers were confined to localized river valleys and seasonal foraging territories, mounted herders traversed vast expanses of open grassland in days. This mobility accelerated intercontinental trade, fostered gene flow, and catalyzed rapid language expansions—most notably the dispersal of Proto-Indo-European dialects across Eurasia.",
    "question": "The word 'unprecedented' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "never seen before",
      "B": "strictly restricted",
      "C": "slowly declining",
      "D": "historically documented"
    },
    "correct_answer": "A",
    "clue_type": "Contrast & Magnitude (Tương phản với phạm vi đi bộ bị giới hạn trước đó)",
    "clue_signal": "endowed steppe pastoralists with unprecedented geographic range. Whereas foot foragers were confined to localized river valleys...",
    "explanation": {
      "meaning": "'Unprecedented' mang nghĩa chưa từng có tiền lệ, chưa bao giờ thấy trước đây.",
      "substitution": "Thế chỗ: 'endowed pastoralists with never seen before / novel geographic range' tương phản với việc trước đó con người chỉ đi bộ bị giam chân ở các thung lũng hẹp.",
      "trap_breakdown": {
        "B": "strictly restricted (bị giới hạn nghiêm ngặt) — Bẫy trái nghĩa: Cưỡi ngựa giúp mở rộng phạm vi chứ không hề giới hạn.",
        "C": "slowly declining (suy giảm dần) — Trái nghĩa.",
        "D": "historically documented (được ghi chép lịch sử) — Thời điểm 3500 TCN là tiền sử, chưa có chữ viết ghi chép."
      },
      "synonyms": [
        "never seen before",
        "unparalleled",
        "novel",
        "groundbreaking"
      ]
    }
  },
  {
    "id": "vic_37",
    "title": "Avian Migration and Geomagnetic Navigation",
    "topic": "Ornithology & Biophysics",
    "target_word": "innate",
    "paragraph_index": 1,
    "passage": "Every autumn, billions of migratory songbirds journey thousands of kilometers across featureless oceanic waters and continental landmasses to reach precise overwintering habitats. Young songbirds embarking on their inaugural transatlantic flight without experienced adult conspecifics accomplish this navigational feat through an innate vector navigation program encoded in their genome.\n\nThis inherited genetic program dictates both flight direction and duration. When displacement experiments transport naive juvenile birds thousands of kilometers off their migratory corridor, they continue flying along their genetically programmed vector rather than correcting toward their destination, proving the initial navigational instinct is unlearned.\n\nDecades of neurobiological investigation reveal that avian magnetoreception operates via radical pair quantum reactions in cryptochrome proteins within retinal photoreceptors. Blue photon excitation creates entangled electron pairs sensitive to the inclination angle of Earth's geomagnetic field lines, allowing birds to 'see' the planetary magnetic field.",
    "question": "The word 'innate' in paragraph 1 is closest in meaning to:",
    "options": {
      "A": "inborn",
      "B": "acquired",
      "C": "erratic",
      "D": "artificial"
    },
    "correct_answer": "A",
    "clue_type": "Restatement & Definition (Diễn giải lặp lại ở câu tiếp theo)",
    "clue_signal": "encoded in their genome... inherited genetic program... proving the initial navigational instinct is unlearned.",
    "explanation": {
      "meaning": "'Innate' là tính từ chỉ bản năng bẩm sinh, có sẵn trong gen di truyền từ khi sinh ra.",
      "substitution": "Thế chỗ: 'accomplish this navigational feat through an inborn / genetic vector program' đồng nghĩa trực tiếp với 'unlearned' (không cần học) và 'inherited' (di truyền).",
      "trap_breakdown": {
        "B": "acquired (học được, thu được) — Bẫy trái nghĩa: Chim non bay lần đầu một mình không có chim lớn hướng dẫn nên không phải do học hỏi.",
        "C": "erratic (thất thường) — Định vị của chim rất chính xác hàng ngàn km, không thất thường.",
        "D": "artificial (nhân tạo) — Là bản năng sinh học tự nhiên."
      },
      "synonyms": [
        "inborn",
        "congenital",
        "hereditary",
        "instinctive"
      ]
    }
  },
  {
    "id": "vic_38",
    "title": "Paleolithic Cave Art and Pigment Technology",
    "topic": "Prehistoric Art & Archaeology",
    "target_word": "meticulously",
    "paragraph_index": 2,
    "passage": "The polychrome cave paintings of Chauvet, Lascaux, and Altamira demonstrate that Upper Paleolithic hunter-gatherers possessed advanced chemical pyrotechnology and visual aesthetic mastery. Rather than smearing crude charcoal randomly onto cavern walls, prehistoric artisans selected mineral pigments with discriminating precision.\n\nHematite (iron oxide) for vivid ochre reds and pyrolusite (manganese dioxide) for rich velvety blacks were meticulously ground into micro-fine powders using stone mortars. Chemical analyses reveal that artists compounded these mineral pigments with organic extenders—including animal marrow fats, blood, and calcium-rich cave water—to alter viscosity, enhance surface adhesion onto damp limestone, and prevent pigment cracking. Artists applied paint utilizing bird-bone blowpipes as spray guns, animal hair brushes, and finger pads, creating sophisticated volumetric shading and dynamic animal silhouettes.",
    "question": "The word 'meticulously' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "carefully",
      "B": "haphazardly",
      "C": "hastily",
      "D": "clumsily"
    },
    "correct_answer": "A",
    "clue_type": "Contrast & Elaboration (Tương phản với làm ẩu 'crude charcoal randomly')",
    "clue_signal": "Rather than smearing crude charcoal randomly... selected mineral pigments with discriminating precision... meticulously ground into micro-fine powders...",
    "explanation": {
      "meaning": "'Meticulously' là phó từ chỉ sự tỉ mỉ, cẩn thận, chăm chút đến từng chi tiết nhỏ nhất.",
      "substitution": "Thế chỗ: 'pigments were carefully / painstakingly ground into micro-fine powders' tương phản hoàn toàn với hành động bôi vẽ ẩu thả (smearing randomly).",
      "trap_breakdown": {
        "B": "haphazardly (tùy tiện, bừa bãi) — Bẫy trái nghĩa hoàn toàn.",
        "C": "hastily (vội vã) — Làm vội không thể tạo ra bột siêu mịn đồng đều.",
        "D": "clumsily (vụng về) — Trái ngược với trình độ bậc thầy (mastery) của nghệ nhân."
      },
      "synonyms": [
        "carefully",
        "painstakingly",
        "scrupulously",
        "thoroughly"
      ]
    }
  },
  {
    "id": "vic_39",
    "title": "Plate Tectonics and the Wilson Cycle",
    "topic": "Geology & Geodynamics",
    "target_word": "quiescent",
    "paragraph_index": 2,
    "passage": "Canadian geophysicist J. Tuzo Wilson proposed that Earth's oceanic basins undergo continuous cyclical opening and closing spanning 300 to 500 million years, a macro-geological paradigm now termed the Wilson Cycle. The cycle commences with continental rifting driven by upwelling thermal plumes, followed by seafloor spreading, oceanic subduction, and culminates in continental collision that forms supercontinental landmasses like Pangaea.\n\nThe passive continental margins generated during ocean basin maturation—such as modern Atlantic coastlines of North America and western Africa—experience prolonged quiescent tectonic intervals. Lacking active subduction zones or volcanism, these trailing edges accumulate massive wedge-shaped sedimentary prisms without being deformed by violent seismic or orogenic disruption. Eventually, as the oceanic lithosphere cools, thickens, and densifies over scores of millions of years, it founders under its own weight, initiating subduction and transitioning the margin from passive tranquility into an active collision zone.",
    "question": "The word 'quiescent' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "inactive",
      "B": "explosive",
      "C": "destructive",
      "D": "turbulent"
    },
    "correct_answer": "A",
    "clue_type": "Definition & Elaboration (Định nghĩa ở câu tiếp theo)",
    "clue_signal": "experience prolonged quiescent tectonic intervals. Lacking active subduction zones or volcanism... without being deformed by violent seismic disruption...",
    "explanation": {
      "meaning": "'Quiescent' là tính từ địa chất/khoa học mang nghĩa yên tĩnh, bất hoạt, không có hoạt động địa chấn hay núi lửa.",
      "substitution": "Thế chỗ: 'experience prolonged inactive / dormant tectonic intervals' giải thích trực tiếp cho việc 'lacking active volcanism' (không có núi lửa hoạt động).",
      "trap_breakdown": {
        "B": "explosive (bùng nổ) — Bẫy trái nghĩa hoàn toàn.",
        "C": "destructive (phá hủy) — Trái ngược với việc không có biến dạng địa chấn (without violent seismic disruption).",
        "D": "turbulent (hỗn loạn) — Bẫy trái nghĩa với trạng thái yên bình tĩnh lặng (passive tranquility)."
      },
      "synonyms": [
        "inactive",
        "dormant",
        "peaceful",
        "tranquil"
      ]
    }
  },
  {
    "id": "vic_40",
    "title": "Ant Social Organization and Pheromonal Trails",
    "topic": "Entomology & Chemical Ecology",
    "target_word": "dissipates",
    "paragraph_index": 2,
    "passage": "Eusocial hymenopteran insects, particularly ants, coordinate collective foraging activities involving hundreds of thousands of sterile workers without centralized executive hierarchy. Instead, colonies leverage decentralized self-organizing feedback loops mediated by volatile chemical exocrine secretions termed recruitment pheromones.\n\nWhen a scout ant discovers a rich, localized nutritional bonanza, such as a dead insect or sugar secretion, it feeds and lays a trail of abdominal glandular pheromone while returning to the nest. Passing nestmates detect this trail with their mobile antennae and follow it to the food. As each recruited worker returns with food, it reinforces the chemical trail by depositing additional pheromone, strengthening the positive feedback signal. If the food cache is exhausted, returning ants cease marking, and the chemical trail dissipates rapidly into the atmosphere, naturally redirecting colony foraging labor toward productive sites.",
    "question": "The word 'dissipates' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "disperses",
      "B": "accumulates",
      "C": "strengthens",
      "D": "solidifies"
    },
    "correct_answer": "A",
    "clue_type": "Contrast & Result (Hệ quả khi hết mồi đối lập với củng cố trail)",
    "clue_signal": "If the food cache is exhausted, returning ants cease marking, and the chemical trail dissipates rapidly into the atmosphere...",
    "explanation": {
      "meaning": "'Dissipate' là động từ chỉ chất khí, mùi hương hoặc năng lượng bay hơi, phân tán tan biến vào không khí.",
      "substitution": "Thế chỗ: 'the chemical trail disperses / evaporates rapidly into the atmosphere' đối lập hoàn toàn với giai đoạn trước khi mùi hương được củng cố (reinforces trail).",
      "trap_breakdown": {
        "B": "accumulates (tích tụ) — Bẫy trái nghĩa: Kiến ngừng đánh dấu thì mùi hương bay đi chứ không tích tụ.",
        "C": "strengthens (mạnh lên) — Trái nghĩa.",
        "D": "solidifies (đông cứng lại) — Mùi hương là chất hóa học bay hơi trong không khí, không đông cứng."
      },
      "synonyms": [
        "disperses",
        "evaporates",
        "scatters",
        "vanishes"
      ]
    }
  },
  {
    "id": "vic_41",
    "title": "The Bronze Age Invention of Glassmaking",
    "topic": "Materials Science & Archaeology",
    "target_word": "opaque",
    "paragraph_index": 2,
    "passage": "True synthetic glass production originated in Mesopotamia and northern Syria during the late third millennium BCE before reaching technical maturity under Egypt's New Kingdom. Early artisans recognized that fusing silica sand with alkali plant ashes and calcium carbonate fluxes at elevated furnace temperatures produced a novel vitreous amorphous solid.\n\nUnlike modern transparent architectural window panes, ancient Bronze Age glass vessels were intensely colored, heavily clouded, and virtually opaque. Primitive wood-fired ceramic kilns could not attain the sustained 1,500 degree Celsius temperatures required to fully degas molten silica and eliminate microscopic gas bubbles. Artisans compensated for this optical opacity by treating glass like precious mineral lapis lazuli and turquoise, carving and winding polychrome decorative threads across cosmetic jars and amulets.",
    "question": "The word 'opaque' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "impenetrable to light",
      "B": "completely clear",
      "C": "highly fragile",
      "D": "naturally occurring"
    },
    "correct_answer": "A",
    "clue_type": "Contrast & Definition (Tương phản trực tiếp với transparent)",
    "clue_signal": "Unlike modern transparent architectural window panes, ancient Bronze Age glass vessels were... heavily clouded, and virtually opaque.",
    "explanation": {
      "meaning": "'Opaque' là tính từ chỉ vật thể đục, không cho ánh sáng xuyên qua (đối lập với transparent).",
      "substitution": "Thế chỗ: 'vessels were heavily clouded, and virtually impenetrable to light' tương phản trực tiếp với 'modern transparent window panes' (kính cửa sổ trong suốt hiện đại).",
      "trap_breakdown": {
        "B": "completely clear (hoàn toàn trong trẻo) — Bẫy trái nghĩa trực tiếp từ 'transparent'.",
        "C": "highly fragile (rất dễ vỡ) — Kính vỡ là tính chất cơ học, nhưng 'opaque' nói về độ truyền sáng.",
        "D": "naturally occurring (có sẵn trong tự nhiên) — Thủy tinh ở đây là sản phẩm nhân tạo nấu trong lò nung."
      },
      "synonyms": [
        "impenetrable to light",
        "nontransparent",
        "clouded",
        "murky"
      ]
    }
  },
  {
    "id": "vic_42",
    "title": "Island Biogeography and Colonization Dynamics",
    "topic": "Biogeography & Ecology",
    "target_word": "impediment",
    "paragraph_index": 2,
    "passage": "Robert MacArthur and E. O. Wilson's Equilibrium Theory of Island Biogeography formalizes the predictive relationship between insular geographic properties and biological equilibrium species richness. Two fundamental parameters govern insular species counts: the rate of new immigrant species colonization and the extinction rate of established populations.\n\nGeographic distance from the continental mainland functions as a severe impediment to successful colonization. Because dispersal across vast marine expanses entails substantial mortality for terrestrial organisms lacking powered flight, remote oceanic archipelagos—such as the Hawaiian chain—experience minuscule natural immigration events, often estimated at one successful colonization every several tens of thousands of years. Conversely, proximate continental shelf islands receive continuous genetic and species inflows.",
    "question": "The word 'impediment' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "obstacle",
      "B": "catalyst",
      "C": "advantage",
      "D": "incentive"
    },
    "correct_answer": "A",
    "clue_type": "Cause & Effect (Nguyên nhân cản trở sinh vật vượt biển)",
    "clue_signal": "functions as a severe impediment to colonization. Because dispersal across marine expanses entails substantial mortality...",
    "explanation": {
      "meaning": "'Impediment' là danh từ chỉ vật chướng ngại, rào cản ngăn chặn sự di chuyển hay phát triển.",
      "substitution": "Thế chỗ: 'functions as a severe obstacle / barrier to successful colonization' giải thích vì sao vượt biển dẫn đến tỷ lệ tử vong cao và các đảo xa rất ít sinh vật đặt chân đến.",
      "trap_breakdown": {
        "B": "catalyst (chất xúc tác) — Bẫy trái nghĩa: Khoảng cách xa cản trở di cư chứ không thúc đẩy di cư.",
        "C": "advantage (lợi thế) — Khoảng cách xa là điểm bất lợi cho sinh vật.",
        "D": "incentive (sự khuyến khích) — Trái nghĩa."
      },
      "synonyms": [
        "obstacle",
        "barrier",
        "hindrance",
        "obstruction"
      ]
    }
  },
  {
    "id": "vic_43",
    "title": "The Industrial Manufacture of Synthetic Ammonia",
    "topic": "Chemical History & Agriculture",
    "target_word": "breakthrough",
    "paragraph_index": 2,
    "passage": "By the late nineteenth century, European agricultural productivity faced a looming planetary bottleneck. Soil nitrogen exhaustion threatened catastrophic famine unless external nitrogenous fertilizer imports—principally sodium nitrate mined from Chilean caliche desert deposits and Peruvian guano—could be supplemented with synthetic alternatives.\n\nGerman chemist Fritz Haber achieved the decisive laboratory breakthrough in 1909 by synthesizing ammonia directly from atmospheric nitrogen and hydrogen gas under high pressures and temperatures using an osmium-uranium catalyst. Chemical engineer Carl Bosch subsequent scaled this benchtop reaction into a massive industrial synthesis process (the Haber-Bosch process). Today, synthetic nitrogen fertilizer derived from Haber-Bosch feeds nearly half the human planetary population, fundamentally transforming planetary demographic carrying capacity.",
    "question": "The word 'breakthrough' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "significant advance",
      "B": "costly failure",
      "C": "gradual decline",
      "D": "accidental explosion"
    },
    "correct_answer": "A",
    "clue_type": "Positive Outcome & Context (Thành tựu mang tính bước ngoặt giải quyết nạn đói)",
    "clue_signal": "faced a looming planetary bottleneck... achieved the decisive laboratory breakthrough... synthesizing ammonia... feeds nearly half the human population...",
    "explanation": {
      "meaning": "'Breakthrough' là danh từ chỉ bước tiến đột phá, bước ngoặt khoa học mở ra giải pháp cho một vấn đề bế tắc kéo dài.",
      "substitution": "Thế chỗ: 'achieved the decisive significant advance / milestone in 1909' giải tỏa hoàn toàn nguy cơ tắc nghẽn lương thực được nêu ở đoạn 1.",
      "trap_breakdown": {
        "B": "costly failure (thất bại tốn kém) — Bẫy trái nghĩa hoàn toàn.",
        "C": "gradual decline (suy tàn dần) — Trái nghĩa với thành tựu rực rỡ.",
        "D": "accidental explosion (vụ nổ tai nạn) — Bẫy liên tưởng hóa chất áp suất cao dễ nổ, không phản ánh thành tựu khoa học."
      },
      "synonyms": [
        "significant advance",
        "milestone",
        "quantum leap",
        "discovery"
      ]
    }
  },
  {
    "id": "vic_44",
    "title": "Chauvet Cave Art and Radiocarbon Calibration",
    "topic": "Archaeology & Geochronology",
    "target_word": "corroborated",
    "paragraph_index": 2,
    "passage": "When speleologists discovered the Chauvet-Pont d'Arc cave in southeastern France in 1994, art historians were initially incredulous regarding the prehistoric antiquity of the artworks. The exquisite dynamic shading, anatomical precision, and sophisticated perspective of the lions and rhinoceroses appeared far too refined for the Aurignacian period, which traditional models considered a primitive developmental phase.\n\nTo resolve the controversy, geochronologists applied accelerator mass spectrometry (AMS) radiocarbon dating to charcoal pigments scraped directly from the animal drawings. The resulting dates clustered between 36,000 and 30,000 years before present, astonishing the archaeological community. Independent geological dating of collapsed limestone overhangs sealing the cavern entrance further corroborated the radiocarbon results, confirming that humans had not entered the chamber since 21,000 years ago.",
    "question": "The word 'corroborated' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "confirmed",
      "B": "contradicted",
      "C": "dismissed",
      "D": "obscured"
    },
    "correct_answer": "A",
    "clue_type": "Restatement & Evidence (Dẫn chứng củng cố kết quả)",
    "clue_signal": "Independent geological dating of collapsed overhangs sealing the entrance further corroborated the radiocarbon results, confirming that...",
    "explanation": {
      "meaning": "'Corroborate' là ngoại động từ học thuật mang nghĩa chứng thực, củng cố thêm độ tin cậy của một giả thuyết hoặc kết quả bằng chứng cứ mới.",
      "substitution": "Thế chỗ: 'further confirmed / substantiated the radiocarbon results' đi kèm với từ 'confirming' ngay sau dấu phẩy.",
      "trap_breakdown": {
        "B": "contradicted (mâu thuẫn với) — Bẫy trái nghĩa: Hai phương pháp đo độc lập cho ra kết quả trùng khớp nhau.",
        "C": "dismissed (bác bỏ) — Trái nghĩa.",
        "D": "obscured (làm mờ mịt) — Bằng chứng địa chất làm sáng tỏ và chứng minh tuổi của hang động."
      },
      "synonyms": [
        "confirmed",
        "substantiated",
        "authenticated",
        "validated"
      ]
    }
  },
  {
    "id": "vic_45",
    "title": "The Physics of Tidal Locking in Planetary Satellites",
    "topic": "Astrophysics & Orbital Mechanics",
    "target_word": "synchronous",
    "paragraph_index": 1,
    "passage": "The Moon presents only a single hemisphere toward Earth, a phenomenon known as synchronous rotation or tidal locking. For billions of years, observers on Earth could only view the near side of the Moon; its heavily cratered far side remained completely veiled until the Soviet Luna 3 spacecraft transmitted preliminary orbital photographs in 1959.\n\nTidal locking is not a fortuitous coincidence, but the inevitable thermodynamic consequence of gravitational tidal dissipation. When the Moon formed, it likely rotated rapidly on its axis. However, Earth's gravitational gradient exerted asymmetric differential pulls on the near and far lunar crust, distorting the solid satellite into a subtle prolate spheroid. Because the Moon rotated faster than its orbital period, this tidal bulge was carried ahead of the Earth-Moon axis. Frictional deformation dissipated rotational kinetic energy as heat, braking the Moon's spin until its rotational period precisely matched its orbital period.",
    "question": "The word 'synchronous' in paragraph 1 is closest in meaning to:",
    "options": {
      "A": "simultaneous",
      "B": "erratic",
      "C": "backward",
      "D": "accelerated"
    },
    "correct_answer": "A",
    "clue_type": "Definition & Mathematical match (Khớp thời gian hoàn hảo)",
    "clue_signal": "phenomenon known as synchronous rotation... until its rotational period precisely matched its orbital period.",
    "explanation": {
      "meaning": "'Synchronous' là tính từ chỉ sự đồng bộ, xảy ra cùng lúc, trùng khớp hoàn toàn về chu kỳ thời gian.",
      "substitution": "Thế chỗ: 'simultaneous / synchronized rotation' giải thích cho việc thời gian tự quay quanh trục khớp chính xác với thời gian quay quanh Trái Đất.",
      "trap_breakdown": {
        "B": "erratic (thất thường) — Chuyển động đồng bộ là cực kỳ chính xác và ổn định.",
        "C": "backward (ngược chiều) — Mặt Trăng quay cùng chiều chứ không quay ngược.",
        "D": "accelerated (tăng tốc) — Quá trình này làm chậm lực quay (braking spin) chứ không tăng tốc."
      },
      "synonyms": [
        "simultaneous",
        "synchronized",
        "concurrent",
        "coincident"
      ]
    }
  },
  {
    "id": "vic_46",
    "title": "Paleolithic Fluted Stone Projectiles and Big-Game Hunting",
    "topic": "Lithic Archaeology",
    "target_word": "lethal",
    "paragraph_index": 2,
    "passage": "The Clovis culture, which emerged across North America approximately 13,000 years ago, is universally recognized for its distinctive fluted lanceolate stone projectile points. Crafted from high-grade chert, chalcedony, and obsidian, Clovis points exhibit concave flutes struck longitudinally from the base toward the tip along both facial faces, facilitating secure hafting onto split wooden foreshafts.\n\nExperimental ballistics demonstrates that these fluted points functioned as remarkably lethal hunting armaments. When propelled with an atlatl (spearthrower), the aerodynamic dart penetrated deeply past the thick hide and ribcages of massive Columbian mammoths and mastodons, cutting major cardiovascular arteries and inducing fatal internal hemorrhaging. This specialized lithic technology gave Clovis foraging bands the capacity to harvest massive apex herbivores across diverse late-glacial biomes.",
    "question": "The word 'lethal' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "deadly",
      "B": "clumsy",
      "C": "ornamental",
      "D": "ineffective"
    },
    "correct_answer": "A",
    "clue_type": "Restatement & Consequence (Hệ quả đâm thủng và gây tử vong)",
    "clue_signal": "penetrated deeply past the thick hide... cutting major arteries and inducing fatal internal hemorrhaging.",
    "explanation": {
      "meaning": "'Lethal' là tính từ mang nghĩa gây chết người, có tính sát thương gây tử vong (deadly / fatal).",
      "substitution": "Thế chỗ: 'functioned as remarkably deadly / fatal hunting armaments' tương thích trực tiếp với cụm 'inducing fatal internal hemorrhaging' (gây xuất huyết tử vong).",
      "trap_breakdown": {
        "B": "clumsy (vụng về) — Mũi tên được chế tác tinh vi khí động học, không hề vụng về.",
        "C": "ornamental (chỉ để trang trí) — Đây là vũ khí săn thú thật sự.",
        "D": "ineffective (không hiệu quả) — Bẫy trái nghĩa: Mũi giáo đâm xuyên qua cả xương sườn voi mammoth."
      },
      "synonyms": [
        "deadly",
        "fatal",
        "mortal",
        "destructive"
      ]
    }
  },
  {
    "id": "vic_47",
    "title": "Mycorrhizal Fungal Networks in Forest Ecology",
    "topic": "Mycology & Forestry",
    "target_word": "reciprocal",
    "paragraph_index": 2,
    "passage": "In temperate and boreal forests, subterranean ecosystems are dominated by mycorrhizal associations—intimate mutualistic symbioses between vegetative plant root systems and soil fungi. Ectomycorrhizal fungal hyphae form dense sheath mantles around tree root tips, extending microscopic subterranean filaments kilometers into the surrounding soil profile.\n\nThis biological partnership is fundamentally reciprocal. The expansive fungal hyphal network extracts scarce inorganic soil nutrients, particularly phosphorus and nitrogen, as well as moisture, transferring them directly into the host plant's vascular cylinder. In return, the photosynthetic tree allocates up to thirty percent of its solar-synthesized photoassimilates (glucose and sucrose) to nourish its fungal partners, which cannot synthesize their own organic carbon.",
    "question": "The word 'reciprocal' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "mutual",
      "B": "one-sided",
      "C": "competitive",
      "D": "parasitic"
    },
    "correct_answer": "A",
    "clue_type": "Definition & Two-way Exchange (Trao đổi hai chiều 'In return')",
    "clue_signal": "transferring them directly into the host plant... In return, the photosynthetic tree allocates up to thirty percent...",
    "explanation": {
      "meaning": "'Reciprocal' mang nghĩa hỗ tương, có qua có lại, hai bên cùng trao đổi qua lại (mutual).",
      "substitution": "Thế chỗ: 'This biological partnership is fundamentally mutual / two-sided' được chứng minh bằng vế 'In return' (đổi lại nấm nhận đường từ cây).",
      "trap_breakdown": {
        "B": "one-sided (một chiều) — Bẫy trái nghĩa hoàn toàn.",
        "C": "competitive (cạnh tranh) — Đây là quan hệ cộng sinh giúp đỡ nhau, không phải cạnh tranh loại trừ.",
        "D": "parasitic (ký sinh) — Nấm ký sinh chỉ hút mà không cho, trong khi ở đây nấm cung cấp khoáng chất và nước."
      },
      "synonyms": [
        "mutual",
        "complementary",
        "two-way",
        "interdependent"
      ]
    }
  },
  {
    "id": "vic_48",
    "title": "The Architectural Engineering of Gothic Cathedrals",
    "topic": "Architecture & Medieval History",
    "target_word": "soaring",
    "paragraph_index": 2,
    "passage": "The transition from Romanesque to Gothic architecture during the twelfth century in the Île-de-France region represented an extraordinary structural engineering revolution. Romanesque churches were characterized by massive load-bearing masonry walls, stout piers, and heavy barrel vaults that severely restricted wall height and limited window apertures to small slits.\n\nThe introduction of the pointed arch, the ribbed groin vault, and external flying buttresses dismantled these structural constraints. By channeling downward and lateral ceiling thrusts onto slender external masonry piers detached from the main building nave, flying buttresses enabled builders to erect soaring vertical stone naves exceeding forty meters in height. The relieved curtain walls could then be replaced with vast expanses of polychrome stained glass, transforming cavernous interiors into luminous sacred spaces filled with colored celestial light.",
    "question": "The word 'soaring' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "towering",
      "B": "collapsing",
      "C": "concealed",
      "D": "unstable"
    },
    "correct_answer": "A",
    "clue_type": "Elaboration & Metric Detail (Chi tiết số đo chiều cao vượt bậc)",
    "clue_signal": "enabled builders to erect soaring vertical stone naves exceeding forty meters in height.",
    "explanation": {
      "meaning": "'Soaring' là tính từ miêu tả chiều cao chọc trời, vươn cao vút lên không trung.",
      "substitution": "Thế chỗ: 'erect towering / lofty stone naves exceeding forty meters' khớp với con số chiều cao hơn 40 mét.",
      "trap_breakdown": {
        "B": "collapsing (sụp đổ) — Bẫy trái nghĩa: Trụ đỡ giúp công trình vươn cao đứng vững.",
        "C": "concealed (bị che khuất) — Nhà thờ Gothic sừng sững nổi bật từ xa.",
        "D": "unstable (không vững) — Kết cấu vòm Gothic rất vững chãi."
      },
      "synonyms": [
        "towering",
        "lofty",
        "elevated",
        "monumental"
      ]
    }
  },
  {
    "id": "vic_49",
    "title": "The Discovery of Deep Geothermal Energy Mechanisms",
    "topic": "Renewable Energy & Thermodynamics",
    "target_word": "abundant",
    "paragraph_index": 2,
    "passage": "Deep geothermal energy utilizes the immense heat reservoir generated by primordial planetary accretion and the ongoing radioactive decay of unstable isotopes (uranium, thorium, and potassium) within Earth's mantle and continental crust. While conventional hydrothermal energy systems require naturally occurring subsurface steam reservoirs located near volcanic margins, enhanced geothermal systems (EGS) access heat from impermeable hot dry rock formations located kilometers beneath virtually any global coordinate.\n\nThe theoretical energy resource stored in deep crystalline bedrock is virtually abundant. Thermodynamic calculations indicate that extracting merely one percent of the thermal energy stored in continental crust down to a depth of ten kilometers would satisfy global civilization's electricity demands for thousands of years without emitting combustion greenhouse effluents.",
    "question": "The word 'abundant' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "plentiful",
      "B": "scarce",
      "C": "temporary",
      "D": "toxic"
    },
    "correct_answer": "A",
    "clue_type": "Restatement & Quantitative Proof (Chứng minh bằng số lượng khổng lồ)",
    "clue_signal": "energy resource is virtually abundant. Thermodynamic calculations indicate that extracting merely one percent... would satisfy demands for thousands of years...",
    "explanation": {
      "meaning": "'Abundant' mang nghĩa dồi dào, phong phú, có trữ lượng khổng lồ.",
      "substitution": "Thế chỗ: 'energy resource stored in deep bedrock is virtually plentiful / inexhaustible' được chứng minh bởi dữ kiện: chỉ cần 1% là đủ nuôi sống toàn bộ nền văn minh hàng ngàn năm.",
      "trap_breakdown": {
        "B": "scarce (khan hiếm) — Bẫy trái nghĩa hoàn toàn.",
        "C": "temporary (tạm thời) — Nguồn nhiệt hành tinh tồn tại hàng tỷ năm.",
        "D": "toxic (độc hại) — Bài đọc đang nhấn mạnh năng lượng sạch không phát thải."
      },
      "synonyms": [
        "plentiful",
        "copious",
        "bountiful",
        "ample"
      ]
    }
  },
  {
    "id": "vic_50",
    "title": "Cognitive Dissonance and Belief Preservation",
    "topic": "Social Psychology",
    "target_word": "discrepancy",
    "paragraph_index": 2,
    "passage": "In 1957, social psychologist Leon Festinger formulated the theory of cognitive dissonance to elucidate how human beings respond when confronted with psychological inconsistencies between their entrenched beliefs and newly encountered factual evidence. Festinger asserted that harboring mutually incompatible cognitions induces an acutely uncomfortable state of mental tension that motivates individuals to restore internal cognitive harmony.\n\nWhen an undeniable discrepancy emerges between a person's behavior and their self-conception, people rarely abandon their cherished beliefs. Instead, the unconscious mind initiates defensive rationalizations: individuals dismiss the credibility of contrary empirical evidence, misremember original outcomes, or fabricate secondary justifications to explain away contradictions, preserving psychological equilibrium at the expense of objective reality.",
    "question": "The word 'discrepancy' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "inconsistency",
      "B": "harmony",
      "C": "similarity",
      "D": "reassurance"
    },
    "correct_answer": "A",
    "clue_type": "Restatement & Synonym Parallel (Song hành với từ ở câu trước)",
    "clue_signal": "psychological inconsistencies between their beliefs and newly encountered factual evidence... When an undeniable discrepancy emerges between behavior and self-conception...",
    "explanation": {
      "meaning": "'Discrepancy' là danh từ chỉ sự mâu thuẫn, bất đồng, không khớp nhau giữa hai hay nhiều dữ kiện.",
      "substitution": "Thế chỗ: 'When an undeniable inconsistency / divergence emerges' đồng nghĩa trực tiếp với từ 'inconsistencies' ở câu ngay trước đó.",
      "trap_breakdown": {
        "B": "harmony (sự hài hòa) — Bẫy trái nghĩa: Dissonance là mâu thuẫn đối lập với hài hòa.",
        "C": "similarity (sự tương đồng) — Bẫy trái nghĩa: Discrepancy là sự khác biệt mâu thuẫn.",
        "D": "reassurance (sự trấn an) — Không phù hợp ngữ cảnh xung đột nhận thức."
      },
      "synonyms": [
        "inconsistency",
        "disparity",
        "divergence",
        "contradiction"
      ]
    }
  }
];

export default EXTENDED_CONTEXT_VOCAB_BANK;
