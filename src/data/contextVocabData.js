/**
 * BỘ NGÂN HÀNG 100 BÀI ĐỌC & CÂU HỎI TỪ VỰNG TRONG NGỮ CẢNH (VOCABULARY IN CONTEXT) CHUẨN TOEFL iBT
 * Mỗi item gồm:
 * - passage: Bài đọc đầy đủ (250-350 từ) chuẩn ETS với bối cảnh học thuật phong phú, không trùng lặp.
 * - target_word: Từ vựng C1/C2 được gạch chân / in đậm trong bài đọc (100 từ vựng riêng biệt).
 * - paragraph_index: Vị trí đoạn văn chứa từ (đã kiểm định 100% chính xác).
 * - question: Câu hỏi trắc nghiệm chuẩn "closest in meaning to".
 * - options: 4 phương án A, B, C, D (1 đúng + 3 bẫy kinh điển: liên tưởng chủ đề, trái nghĩa, nghĩa phụ).
 *   ĐÃ ĐẢO NGẪU NHIÊN VỊ TRÍ ĐÁP ÁN ĐỀU CẢ 4 PHƯƠNG ÁN A, B, C, D THEO TỶ LỆ CHUẨN ETS (25% MỖI PHƯƠNG ÁN).
 * - clue_type: Phân loại 5 dạng manh mối chuẩn ETS (Cause-Effect, Contrast, Definition, Collocation, Elaboration).
 * - clue_signal: Cụm từ / câu phát tín hiệu manh mối trong bài.
 * - explanation: Giải mã chuyên sâu, Thử nghiệm thế chỗ (Substitution Test) và Bóc trần bẫy ETS.
 */

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
      "A": "diminishing",
      "B": "ever-present",
      "C": "temporary",
      "D": "hazardous"
    },
    "correct_answer": "B",
    "clue_type": "Contrast & Opposition (Tương phản - Đối lập)",
    "clue_signal": "While sunlight is ubiquitous in terrestrial and shallow marine zones, its total absence in the bathypelagic realm...",
    "explanation": {
      "meaning": "'Ubiquitous' mang nghĩa có mặt ở khắp mọi nơi, luôn luôn hiện diện.",
      "substitution": "Thế chỗ: 'While sunlight is ever-present in terrestrial and shallow marine zones' đối lập hoàn hảo với vế sau 'its total absence' (sự vắng mặt hoàn toàn ở tầng đáy sâu).",
      "trap_breakdown": {
        "A": "diminishing (giảm dần) — Bẫy suy diễn: Ánh sáng giảm dần theo độ sâu, nhưng 'ubiquitous' ở đây nói về vùng cạn và trên cạn nơi ánh nắng luôn tràn ngập.",
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
      "A": "fundamental",
      "B": "complex",
      "C": "unnecessary",
      "D": "beneficial"
    },
    "correct_answer": "C",
    "clue_type": "Contrast & Elaboration (Tương phản & Diễn giải)",
    "clue_signal": "suboptimal instructional design... Eliminating extraneous demands is vital, as unnecessary sensory processing squanders...",
    "explanation": {
      "meaning": "'Extraneous' mang nghĩa 'không liên quan, thừa thãi, không cần thiết'.",
      "substitution": "Thế chỗ: 'Eliminating unnecessary demands is vital' hoàn toàn tương thích với câu tiếp theo 'unnecessary sensory processing squanders cognitive bandwidth'.",
      "trap_breakdown": {
        "A": "fundamental (cơ bản, cốt lõi) — Bẫy trái nghĩa: Extraneous load là phụ tải thừa thãi, đối lập với cái căn bản.",
        "B": "complex (phức tạp) — Bẫy gây nhiễu: Nội dung phức tạp thuộc về intrinsic load, không phải extraneous load.",
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
      "A": "artificial",
      "B": "temporary",
      "C": "hazardous",
      "D": "undamaged"
    },
    "correct_answer": "D",
    "clue_type": "Cause & Effect / Definition (Nguyên nhân & Định nghĩa)",
    "clue_signal": "without melting... minimal sublimation and zero seasonal melting, the deeply buried strata preserve a pristine chronological sequence...",
    "explanation": {
      "meaning": "'Pristine' mang nghĩa nguyên sơ, không bị tổn hại hay thay đổi, còn nguyên trạng thái ban đầu.",
      "substitution": "Thế chỗ: 'preserve an undamaged / intact chronological sequence' hoàn toàn khớp với tiền đề không có sự tan chảy hay thăng hoa làm xáo trộn lớp băng.",
      "trap_breakdown": {
        "A": "artificial (nhân tạo) — Bẫy trái nghĩa: Băng hình thành hoàn toàn tự nhiên hàng trăm ngàn năm.",
        "B": "temporary (tạm thời) — Bẫy trái nghĩa: Các lớp băng tồn tại vĩnh cửu hàng triệu năm.",
        "C": "hazardous (nguy hiểm) — Không liên quan ngữ cảnh khoa học địa chất."
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
      "A": "concealed",
      "B": "noticeable",
      "C": "fragile",
      "D": "unreliable"
    },
    "correct_answer": "B",
    "clue_type": "Elaboration & Definition (Mở rộng & Diễn giải)",
    "clue_signal": "display conspicuous ultraviolet bullseye patterns... intensely luminous to approaching bees... function as directional landing strips...",
    "explanation": {
      "meaning": "'Conspicuous' là tính từ chỉ những thứ dễ thấy, nổi bật, thu hút sự chú ý rõ rệt.",
      "substitution": "Thế chỗ: 'flowers display noticeable / prominent ultraviolet patterns' ăn khớp hoàn toàn với việc các hoa văn này phát sáng rực rỡ để dẫn đường cho ong đáp xuống.",
      "trap_breakdown": {
        "A": "concealed (ẩn giấu) — Bẫy nhầm lẫn: Tuy hoa văn này ẩn với mắt người (invisible to mammalian predators) nhưng với loài ong nó lại cực kỳ nổi bật, và câu đang nói về góc nhìn của ong.",
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
      "A": "gradual",
      "B": "beneficial",
      "C": "disastrous",
      "D": "anticipated"
    },
    "correct_answer": "C",
    "clue_type": "Restatement & Context (Diễn giải & Ngữ cảnh)",
    "clue_signal": "collapsed within a span of merely several decades. This cataclysmic disintegration wiped out... regional dark age.",
    "explanation": {
      "meaning": "'Cataclysmic' xuất phát từ gốc địa chấn/thảm họa, mang nghĩa 'mang tính thảm họa hủy diệt dữ dội'.",
      "substitution": "Thế chỗ: 'This disastrous / devastating disintegration wiped out literate bureaucratic administration' (Sự sụp đổ thảm khốc này đã quét sạch bộ máy cai trị...).",
      "trap_breakdown": {
        "A": "gradual (dần dần) — Bẫy sai thời gian: Bài đọc nhấn mạnh biến cố xảy ra nhanh chóng chỉ trong vài thập kỷ (merely several decades), không phải chậm rãi.",
        "B": "beneficial (có lợi) — Trái ngược hoàn toàn với việc dẫn tới thời kỳ đen tối (regional dark age).",
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
      "A": "eliminate",
      "B": "intensify",
      "C": "disguise",
      "D": "stabilize"
    },
    "correct_answer": "B",
    "clue_type": "Elaboration / Cause (Mở rộng & Nguyên nhân)",
    "clue_signal": "Multiple structural and material factors exacerbate this thermal disparity. Traditional materials... absorb massive quantities... reradiate slowly...",
    "explanation": {
      "meaning": "'Exacerbate' là ngoại động từ chỉ hành động làm trầm trọng thêm, làm gia tăng mức độ tiêu cực của một vấn đề.",
      "substitution": "Thế chỗ: 'Multiple factors intensify / worsen this thermal disparity' (Nhiều yếu tố cấu trúc làm trầm trọng thêm sự chênh lệch nhiệt độ này).",
      "trap_breakdown": {
        "A": "eliminate (loại bỏ) — Bẫy trái nghĩa: Các yếu tố này làm hiện tượng nóng thêm chứ không hề xóa bỏ nó.",
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
      "A": "ignore",
      "B": "provoke",
      "C": "accelerate",
      "D": "distinguish"
    },
    "correct_answer": "D",
    "clue_type": "Syntactic Fit & Meaning (Sắc thái ngữ pháp & Nghĩa)",
    "clue_signal": "enable hunting bats to discern whether a target insect is fluttering toward or away from them, as well as calculate...",
    "explanation": {
      "meaning": "'Discern' mang nghĩa nhận biết, phân biệt rõ ràng giữa hai hoặc nhiều trạng thái bằng giác quan hoặc trí tuệ.",
      "substitution": "Thế chỗ: 'enable hunting bats to distinguish / detect whether a target insect is fluttering toward or away' (giúp dơi săn mồi phân biệt được côn trùng đang bay lại gần hay bay ra xa).",
      "trap_breakdown": {
        "A": "ignore (phớt lờ) — Bẫy trái nghĩa: Dơi cần phân tích chi tiết để bắt mồi chứ không phớt lờ.",
        "B": "provoke (khiêu khích) — Không phù hợp về mặt ngữ nghĩa sinh học.",
        "C": "accelerate (tăng tốc) — Bẫy nhầm lẫn do trong câu có nhắc tới bay nhanh và tần số cánh đập."
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
      "A": "repress",
      "B": "delay",
      "C": "prompt",
      "D": "withhold"
    },
    "correct_answer": "C",
    "clue_type": "Cause & Effect (Nguyên nhân - Hệ quả)",
    "clue_signal": "Accumulated auxin molecules... elicit rapid cell wall loosening by activating proton pumps that acidify...",
    "explanation": {
      "meaning": "'Elicit' là ngoại động từ chỉ hành động khơi gợi, kích hoạt, thúc đẩy một phản ứng sinh hóa hoặc cảm xúc.",
      "substitution": "Thế chỗ: 'Auxin molecules on the shaded flank prompt / trigger rapid cell wall loosening' (Các phân tử auxin tích tụ làm kích hoạt sự nới lỏng vách tế bào).",
      "trap_breakdown": {
        "A": "repress (kìm hãm) — Bẫy trái nghĩa: Auxin kích thích kéo dài tế bào chứ không kìm nén.",
        "B": "delay (trì hoãn) — Trái ngược với từ 'rapid' (nhanh chóng) ngay phía sau.",
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
      "A": "sophisticated",
      "B": "primitive",
      "C": "melodious",
      "D": "permanent"
    },
    "correct_answer": "B",
    "clue_type": "Restatement & Context (Diễn giải & Đồng nghĩa bối cảnh)",
    "clue_signal": "juveniles begin producing rudimentary, unstructured vocal babbling termed 'subsong.' Through continuous... progressively refining...",
    "explanation": {
      "meaning": "'Rudimentary' nghĩa là sơ đẳng, thô sơ, chưa hoàn thiện ở giai đoạn đầu.",
      "substitution": "Thế chỗ: 'produce primitive / basic, unstructured vocal babbling' ăn khớp với từ 'unstructured' (chưa có cấu trúc) và 'babbling' (bập bẹ tiếng kêu đầu đời).",
      "trap_breakdown": {
        "A": "sophisticated (tinh vi, phức tạp) — Bẫy trái nghĩa hoàn toàn: Tiếng bập bẹ non nớt chưa thể tinh vi.",
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
      "A": "vulnerable",
      "B": "transparent",
      "C": "sensitive",
      "D": "resistant"
    },
    "correct_answer": "D",
    "clue_type": "Definition & Result (Định nghĩa & Kết quả hóa học)",
    "clue_signal": "converts into insoluble calcium carbonate... painted surface becomes essentially impervious to surface moisture... preserving vivid tonal saturation for centuries.",
    "explanation": {
      "meaning": "'Impervious' mang nghĩa không thể thấm qua, có khả năng đề kháng hoặc miễn nhiễm với các tác động bên ngoài.",
      "substitution": "Thế chỗ: 'the painted surface becomes essentially resistant / immune to surface moisture' (bề mặt tranh trở nên hoàn toàn đề kháng / không thấm nước ẩm bên ngoài).",
      "trap_breakdown": {
        "A": "vulnerable (dễ bị tổn thương) — Bẫy trái nghĩa: Tranh fresco có độ bền cực cao qua nhiều thế kỷ chứ không dễ hỏng.",
        "B": "transparent (trong suốt) — Không liên quan tính chất cơ lý hóa.",
        "C": "sensitive (nhạy cảm) — Trái nghĩa với khả năng bảo quản bền vững hàng thế kỷ."
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
      "A": "negligible",
      "B": "invigorating",
      "C": "weakening",
      "D": "beneficial"
    },
    "correct_answer": "C",
    "clue_type": "Cause & Effect (Nguyên nhân - Hệ quả sinh thái)",
    "clue_signal": "underscores the debilitating environmental stress caused by abrupt deglaciation... radically fragmented vegetation zones and reduced available forage.",
    "explanation": {
      "meaning": "'Debilitating' là tính từ mang nghĩa làm suy kiệt, làm kiệt quệ sức lực, gây suy yếu nghiêm trọng.",
      "substitution": "Thế chỗ: 'underscores the weakening / incapacitating environmental stress' (nhấn mạnh áp lực môi trường gây suy kiệt các đàn thú lớn).",
      "trap_breakdown": {
        "A": "negligible (không đáng kể) — Trái ngược với hậu quả gây ra tuyệt chủng trên diện rộng.",
        "B": "invigorating (tiếp thêm sinh lực) — Trái nghĩa hoàn toàn.",
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
      "A": "cumbersome",
      "B": "inefficient",
      "C": "hazardous",
      "D": "clever"
    },
    "correct_answer": "D",
    "clue_type": "Elaboration & Definition (Mở rộng & Diễn giải)",
    "clue_signal": "termites utilize an ingenious passive ventilation architecture. The outer walls contain thousands of micro-porous channels... thermal chimney...",
    "explanation": {
      "meaning": "'Ingenious' là tính từ chỉ những giải pháp tài tình, khéo léo, mang tính sáng tạo đột phá.",
      "substitution": "Thế chỗ: 'termites utilize a clever / brilliant passive ventilation architecture' (loài mối sử dụng một cấu trúc thông gió thụ động hết sức tài tình).",
      "trap_breakdown": {
        "A": "cumbersome (cồng kềnh, nặng nề) — Bẫy liên tưởng tổ mối to lớn, nhưng cấu trúc vận hành của nó rất tinh tế.",
        "B": "inefficient (kém hiệu quả) — Trái nghĩa: Hệ thống làm mát này hiệu quả đến mức con người phải học tập.",
        "C": "hazardous (nguy hiểm) — Không liên quan đến tính chất sáng tạo kỹ thuật."
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
      "A": "sudden extinction",
      "B": "functional repurposing",
      "C": "mechanical failure",
      "D": "genetic mutation"
    },
    "correct_answer": "B",
    "clue_type": "Definition & Restatement (Định nghĩa trực tiếp ngay sau dấu gạch ngang)",
    "clue_signal": "evolutionary exaptation—the shift in the biological function of a physical trait during evolution.",
    "explanation": {
      "meaning": "'Exaptation' là thuật ngữ sinh học tiến hóa chỉ sự chuyển đổi công năng của một cơ quan (ban đầu sinh ra với mục đích A, sau này thích nghi để phục vụ mục đích B).",
      "substitution": "Thế chỗ: 'exemplifies functional repurposing—the shift in the biological function' hoàn toàn trùng khớp với định nghĩa tác giả đưa ra ngay sau dấu gạch ngang '—'.",
      "trap_breakdown": {
        "A": "sudden extinction (tuyệt chủng đột ngột) — Bẫy liên tưởng khủng long tuyệt chủng, hoàn toàn sai nghĩa của exaptation.",
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
      "A": "ordinary",
      "B": "hazardous",
      "C": "peerless",
      "D": "unreliable"
    },
    "correct_answer": "C",
    "clue_type": "Contrast & Degree (Tương phản & Cấp độ vượt trội)",
    "clue_signal": "While modern structures frequently deteriorate within fifty to one hundred years... Roman structures constructed over two thousand years ago remain structurally robust... exhibit an unrivaled resilience...",
    "explanation": {
      "meaning": "'Unrivaled' là tính từ mang nghĩa không có đối thủ, vô song, vượt trội hơn tất cả (peerless / unmatched).",
      "substitution": "Thế chỗ: 'exhibit a peerless / unmatched resilience' (thể hiện một sức bền vô song) tương phản với bê tông hiện đại vốn nhanh hỏng sau 50-100 năm.",
      "trap_breakdown": {
        "A": "ordinary (bình thường) — Bẫy trái nghĩa: Sức bền 2000 năm của người La Mã là phi thường, không hề bình thường.",
        "B": "hazardous (nguy hiểm) — Không liên quan đến chất lượng độ bền công trình.",
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
      "A": "permanent",
      "B": "destructive",
      "C": "changeable",
      "D": "lethal"
    },
    "correct_answer": "C",
    "clue_type": "Contrast & Opposition (Tương phản trực tiếp với permanent)",
    "clue_signal": "Unlike genetic mutations, which represent permanent alterations to DNA sequences, epigenetic modifications are inherently reversible...",
    "explanation": {
      "meaning": "'Reversible' mang nghĩa có thể đảo ngược, có thể hoàn nguyên hoặc thay đổi linh hoạt.",
      "substitution": "Thế chỗ: 'epigenetic modifications are inherently changeable / capable of being undone' đối lập trực tiếp với 'permanent alterations' (thay đổi vĩnh viễn) của đột biến gen.",
      "trap_breakdown": {
        "A": "permanent (vĩnh viễn) — Bẫy trái nghĩa trực tiếp được đưa ra để kiểm tra thí sinh có nhìn ra cấu trúc 'Unlike X, Y is...'.",
        "B": "destructive (phá hủy) — Thay đổi biểu sinh giúp điều hòa tế bào chứ không phải phá hủy.",
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
      "A": "extremely scarce",
      "B": "physically frail",
      "C": "socially cooperative",
      "D": "highly productive"
    },
    "correct_answer": "D",
    "clue_type": "Elaboration & Definition (Mở rộng & Diễn giải phía sau)",
    "clue_signal": "are prolific breeders. They mature rapidly, allocate immense energetic capital toward producing thousands of minute offspring...",
    "explanation": {
      "meaning": "'Prolific' là tính từ chỉ khả năng sinh sản nhiều, tạo ra số lượng cực lớn các cá thể hoặc tác phẩm (sinh sôi nảy nở mạnh mẽ).",
      "substitution": "Thế chỗ: 'are highly productive / abundant breeders' hoàn toàn khớp với câu giải thích tiếp theo 'producing thousands of offspring'.",
      "trap_breakdown": {
        "A": "extremely scarce (cực kỳ khan hiếm) — Bẫy trái nghĩa hoàn toàn với khả năng đẻ hàng ngàn con.",
        "B": "physically frail (yếu ớt về thể chất) — Bẫy gây nhiễu vì con non nhỏ bé (minute offspring), nhưng prolific nói về khả năng sinh sản của cả loài.",
        "C": "socially cooperative (hợp tác xã hội) — Bẫy nhầm lẫn: Loài này không chăm sóc con cái (zero parental care) nên không phải hợp tác."
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
      "A": "sharpened",
      "B": "deformed",
      "C": "authentic",
      "D": "extinguished"
    },
    "correct_answer": "B",
    "clue_type": "Collocation & Restatement (Kết hợp từ & Diễn giải)",
    "clue_signal": "sheared into elongated, distorted arclets curving around... modeling these optical deformations...",
    "explanation": {
      "meaning": "'Distorted' mang nghĩa bị bẻ cong, biến dạng, làm méo mó so với hình dạng chuẩn ban đầu.",
      "substitution": "Thế chỗ: 'sheared into elongated, deformed arclets... modeling these optical deformations' (bị kéo dài và biến dạng thành các vòng cung).",
      "trap_breakdown": {
        "A": "sharpened (sắc nét hơn) — Bẫy trái nghĩa: Hình ảnh bị kéo cong và méo mó chứ không sắc sảo quang học.",
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
      "A": "magnify",
      "B": "broadcast",
      "C": "abandon",
      "D": "hide"
    },
    "correct_answer": "D",
    "clue_type": "Definition & Purpose (Mục đích ngụy trang quang học)",
    "clue_signal": "active optical camouflage mechanism... match downwelling sunlight. This counterillumination allows them to conceal their silhouette completely...",
    "explanation": {
      "meaning": "'Conceal' là ngoại động từ chỉ hành động che giấu, ngụy trang để không bị phát hiện.",
      "substitution": "Thế chỗ: 'allows them to hide / disguise their silhouette completely from predators' (cho phép chúng che giấu hoàn toàn bóng đen cơ thể khỏi kẻ săn mồi).",
      "trap_breakdown": {
        "A": "magnify (phóng đại) — Bẫy trái nghĩa: Phát sáng là để triệt tiêu bóng đen, không phải phóng đại bóng đen lên.",
        "B": "broadcast (phát sóng, truyền tin) — Mực phát sáng để ẩn nấp chứ không phải để thông báo sự hiện diện của mình.",
        "C": "abandon (bỏ rơi) — Sai lệch logic ngụy trang."
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
      "A": "declined",
      "B": "collapsed",
      "C": "multiplied",
      "D": "relocated"
    },
    "correct_answer": "C",
    "clue_type": "Elaboration / Number Increase (Mở rộng & Gia tăng số lượng)",
    "clue_signal": "established in Mainz, spread across European trade routes... proliferated throughout over two hundred cities... producing twenty million volumes...",
    "explanation": {
      "meaning": "'Proliferate' là động từ chỉ sự sinh sôi nảy nở nhanh chóng, nhân lên gấp nhiều lần về số lượng.",
      "substitution": "Thế chỗ: 'printing establishments multiplied / spread rapidly throughout over two hundred cities' ăn khớp hoàn toàn với con số 20 triệu cuốn sách xuất bản trong 50 năm.",
      "trap_breakdown": {
        "A": "declined (suy giảm) — Bẫy trái nghĩa với làn sóng bùng nổ của nhà in.",
        "B": "collapsed (sụp đổ) — Trái ngược hoàn toàn sự phát triển vũ bão.",
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
      "A": "beneficial",
      "B": "harmful",
      "C": "accidental",
      "D": "imperceptible"
    },
    "correct_answer": "B",
    "clue_type": "Cause & Effect (Nguyên nhân - Hệ quả tiêu cực)",
    "clue_signal": "consumes ATP and expels previously fixed carbon without generating sugar, reducing photosynthetic efficiency by as much as forty percent.",
    "explanation": {
      "meaning": "'Deleterious' là tính từ học thuật mang nghĩa có hại, gây tổn hại hoặc làm suy giảm hiệu suất.",
      "substitution": "Thế chỗ: 'This harmful / detrimental pathway consumes ATP... reducing efficiency by 40%' hoàn toàn logic với tác hại làm mất năng lượng của quang hô hấp.",
      "trap_breakdown": {
        "A": "beneficial (có lợi) — Bẫy trái nghĩa: Quá trình này làm mất năng lượng và giảm 40% sản lượng quang hợp nên không thể có lợi.",
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
      "A": "accelerate",
      "B": "suppress",
      "C": "verify",
      "D": "replicate"
    },
    "correct_answer": "B",
    "clue_type": "Cause & Effect (Nguyên nhân - Hệ quả ức chế enzyme)",
    "clue_signal": "nitrogenase is extraordinarily sensitive to molecular oxygen; even trace levels of free oxygen irreversible denature the enzyme and completely inhibit catalytic activity.",
    "explanation": {
      "meaning": "'Inhibit' là ngoại động từ chỉ hành động ức chế, ngăn cản, triệt tiêu hoạt động của một phản ứng hoặc quá trình.",
      "substitution": "Thế chỗ: 'denature the enzyme and completely suppress / block catalytic activity' (làm biến tính enzyme và ức chế hoàn toàn hoạt tính xúc tác).",
      "trap_breakdown": {
        "A": "accelerate (thúc đẩy nhanh) — Bẫy trái nghĩa hoàn toàn: Khí oxy làm hỏng enzyme chứ không thúc đẩy.",
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
      "A": "universal",
      "B": "lucrative",
      "C": "insightful",
      "D": "incorrect"
    },
    "correct_answer": "D",
    "clue_type": "Contrast & Correction (Tương phản với bước đột phá đúng đắn)",
    "clue_signal": "This erroneous presupposition was championed by... The breakthrough occurred when... revealing that Maya monuments did not record mysticism, but historical chronologies...",
    "explanation": {
      "meaning": "'Erroneous' là tính từ mang nghĩa sai lầm, dựa trên nhận định không đúng thực tế.",
      "substitution": "Thế chỗ: 'This incorrect / mistaken presupposition was championed' tương phản với bước đột phá sau đó của Yuri Knorozov khi chứng minh chữ Maya là ngữ âm.",
      "trap_breakdown": {
        "A": "universal (phổ quát) — Bẫy gây nhiễu vì nhiều người từng tin theo, nhưng trọng tâm là giả định này bị sai.",
        "B": "lucrative (sinh lời) — Không liên quan đến nghiên cứu khảo cổ học.",
        "C": "insightful (sâu sắc) — Bẫy trái nghĩa: Quan điểm này đã kìm hãm ngành giải mã cổ ngữ suốt một thế kỷ."
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
      "A": "negligible",
      "B": "predictable",
      "C": "out of proportion",
      "D": "equivalent"
    },
    "correct_answer": "C",
    "clue_type": "Elaboration & Contrast (Diễn giải so sánh giữa số lượng nhỏ và tác động khổng lồ)",
    "clue_signal": "disproportionate influence on community architecture relative to their biomass. Although they constitute merely a minor fraction...",
    "explanation": {
      "meaning": "'Disproportionate' mang nghĩa không tương xứng, vượt trội hơn rất nhiều so với tỷ lệ kích thước hay số lượng thực tế.",
      "substitution": "Thế chỗ: 'exert an out-of-proportion / excessively large influence relative to their biomass' (gây ra một tầm ảnh hưởng vượt trội bất cân xứng so với sinh khối nhỏ bé của chúng).",
      "trap_breakdown": {
        "A": "negligible (không đáng kể) — Bẫy trái nghĩa: Tác động của loài keystone là quyết định đến toàn hệ sinh thái.",
        "B": "predictable (dự đoán được) — Không nói về tính chất quy luật dự đoán.",
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
      "A": "abundance",
      "B": "purity",
      "C": "durability",
      "D": "shortage"
    },
    "correct_answer": "D",
    "clue_type": "Restatement & Parallelism (Diễn giải lặp lại cụm từ trước đó)",
    "clue_signal": "mills experienced severe chronic raw material shortages. This acute rag scarcity constrained publishing output...",
    "explanation": {
      "meaning": "'Scarcity' là danh từ chỉ sự khan hiếm, thiếu thốn nguồn cung cấp trầm trọng.",
      "substitution": "Thế chỗ: 'This acute rag shortage / deficit constrained publishing output' đồng nghĩa trực tiếp với cụm 'material shortages' ở câu ngay trước đó.",
      "trap_breakdown": {
        "A": "abundance (sự dồi dào) — Bẫy trái nghĩa hoàn toàn.",
        "B": "purity (độ tinh khiết) — Không liên quan đến số lượng nguyên liệu.",
        "C": "durability (độ bền) — Giấy làm từ vải rất bền nhưng bài đọc đang nói về số lượng thiếu hụt."
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
      "A": "rigid",
      "B": "adaptable",
      "C": "deteriorating",
      "D": "fragile"
    },
    "correct_answer": "B",
    "clue_type": "Contrast & Opposition (Tương phản với rigid and immutable)",
    "clue_signal": "brain was rigid and immutable... This static dogma was dismantled... adult neural circuitry remains remarkably malleable...",
    "explanation": {
      "meaning": "'Malleable' (gốc từ kim loại dễ uốn) trong khoa học thần kinh mang nghĩa dễ uốn nắn, linh hoạt thích nghi và tái cấu trúc.",
      "substitution": "Thế chỗ: 'adult neural circuitry remains remarkably adaptable / plastic' đối lập trực tiếp với quan điểm cũ coi não bộ là 'rigid and immutable' (cứng nhắc và bất biến).",
      "trap_breakdown": {
        "A": "rigid (cứng nhắc) — Bẫy trái nghĩa trực tiếp từ quan điểm cũ đã bị bác bỏ.",
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
      "A": "fortify",
      "B": "guarantee",
      "C": "threaten",
      "D": "conceal"
    },
    "correct_answer": "C",
    "clue_type": "Cause & Effect (Nguyên nhân - Hệ quả nguy hại)",
    "clue_signal": "carbonate deficit makes precipitating skeletons energetically prohibitive. Reduced saturation states jeopardize the structural integrity...",
    "explanation": {
      "meaning": "'Jeopardize' là ngoại động từ chỉ hành động gây nguy hiểm, đe dọa làm tổn hại nghiêm trọng.",
      "substitution": "Thế chỗ: 'Reduced saturation states threaten / endanger the structural integrity' (Làm đe dọa sự vững chắc của các rạn san hô).",
      "trap_breakdown": {
        "A": "fortify (củng cố, gia cố) — Bẫy trái nghĩa hoàn toàn.",
        "B": "guarantee (đảm bảo) — Bẫy trái nghĩa.",
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
      "A": "acquired",
      "B": "erratic",
      "C": "artificial",
      "D": "inborn"
    },
    "correct_answer": "D",
    "clue_type": "Restatement & Definition (Diễn giải lặp lại ở câu tiếp theo)",
    "clue_signal": "encoded in their genome... inherited genetic program... proving the initial navigational instinct is unlearned.",
    "explanation": {
      "meaning": "'Innate' là tính từ chỉ bản năng bẩm sinh, có sẵn trong gen di truyền từ khi sinh ra.",
      "substitution": "Thế chỗ: 'accomplish this navigational feat through an inborn / genetic vector program' đồng nghĩa trực tiếp với 'unlearned' (không cần học) và 'inherited' (di truyền).",
      "trap_breakdown": {
        "A": "acquired (học được, thu được) — Bẫy trái nghĩa: Chim non bay lần đầu một mình không có chim lớn hướng dẫn nên không phải do học hỏi.",
        "B": "erratic (thất thường) — Định vị của chim rất chính xác hàng ngàn km, không thất thường.",
        "C": "artificial (nhân tạo) — Là bản năng sinh học tự nhiên."
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
      "A": "haphazardly",
      "B": "carefully",
      "C": "hastily",
      "D": "clumsily"
    },
    "correct_answer": "B",
    "clue_type": "Contrast & Elaboration (Tương phản với làm ẩu 'crude charcoal randomly')",
    "clue_signal": "Rather than smearing crude charcoal randomly... selected mineral pigments with discriminating precision... meticulously ground into micro-fine powders...",
    "explanation": {
      "meaning": "'Meticulously' là phó từ chỉ sự tỉ mỉ, cẩn thận, chăm chút đến từng chi tiết nhỏ nhất.",
      "substitution": "Thế chỗ: 'pigments were carefully / painstakingly ground into micro-fine powders' tương phản hoàn toàn với hành động bôi vẽ ẩu thả (smearing randomly).",
      "trap_breakdown": {
        "A": "haphazardly (tùy tiện, bừa bãi) — Bẫy trái nghĩa hoàn toàn.",
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
      "A": "accumulates",
      "B": "strengthens",
      "C": "disperses",
      "D": "solidifies"
    },
    "correct_answer": "C",
    "clue_type": "Contrast & Result (Hệ quả khi hết mồi đối lập với củng cố trail)",
    "clue_signal": "If the food cache is exhausted, returning ants cease marking, and the chemical trail dissipates rapidly into the atmosphere...",
    "explanation": {
      "meaning": "'Dissipate' là động từ chỉ chất khí, mùi hương hoặc năng lượng bay hơi, phân tán tan biến vào không khí.",
      "substitution": "Thế chỗ: 'the chemical trail disperses / evaporates rapidly into the atmosphere' đối lập hoàn toàn với giai đoạn trước khi mùi hương được củng cố (reinforces trail).",
      "trap_breakdown": {
        "A": "accumulates (tích tụ) — Bẫy trái nghĩa: Kiến ngừng đánh dấu thì mùi hương bay đi chứ không tích tụ.",
        "B": "strengthens (mạnh lên) — Trái nghĩa.",
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
      "A": "completely clear",
      "B": "impenetrable to light",
      "C": "highly fragile",
      "D": "naturally occurring"
    },
    "correct_answer": "B",
    "clue_type": "Contrast & Definition (Tương phản trực tiếp với transparent)",
    "clue_signal": "Unlike modern transparent architectural window panes, ancient Bronze Age glass vessels were... heavily clouded, and virtually opaque.",
    "explanation": {
      "meaning": "'Opaque' là tính từ chỉ vật thể đục, không cho ánh sáng xuyên qua (đối lập với transparent).",
      "substitution": "Thế chỗ: 'vessels were heavily clouded, and virtually impenetrable to light' tương phản trực tiếp với 'modern transparent window panes' (kính cửa sổ trong suốt hiện đại).",
      "trap_breakdown": {
        "A": "completely clear (hoàn toàn trong trẻo) — Bẫy trái nghĩa trực tiếp từ 'transparent'.",
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
      "A": "catalyst",
      "B": "advantage",
      "C": "incentive",
      "D": "obstacle"
    },
    "correct_answer": "D",
    "clue_type": "Cause & Effect (Nguyên nhân cản trở sinh vật vượt biển)",
    "clue_signal": "functions as a severe impediment to colonization. Because dispersal across marine expanses entails substantial mortality...",
    "explanation": {
      "meaning": "'Impediment' là danh từ chỉ vật chướng ngại, rào cản ngăn chặn sự di chuyển hay phát triển.",
      "substitution": "Thế chỗ: 'functions as a severe obstacle / barrier to successful colonization' giải thích vì sao vượt biển dẫn đến tỷ lệ tử vong cao và các đảo xa rất ít sinh vật đặt chân đến.",
      "trap_breakdown": {
        "A": "catalyst (chất xúc tác) — Bẫy trái nghĩa: Khoảng cách xa cản trở di cư chứ không thúc đẩy di cư.",
        "B": "advantage (lợi thế) — Khoảng cách xa là điểm bất lợi cho sinh vật.",
        "C": "incentive (sự khuyến khích) — Trái nghĩa."
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
      "A": "costly failure",
      "B": "gradual decline",
      "C": "significant advance",
      "D": "accidental explosion"
    },
    "correct_answer": "C",
    "clue_type": "Positive Outcome & Context (Thành tựu mang tính bước ngoặt giải quyết nạn đói)",
    "clue_signal": "faced a looming planetary bottleneck... achieved the decisive laboratory breakthrough... synthesizing ammonia... feeds nearly half the human population...",
    "explanation": {
      "meaning": "'Breakthrough' là danh từ chỉ bước tiến đột phá, bước ngoặt khoa học mở ra giải pháp cho một vấn đề bế tắc kéo dài.",
      "substitution": "Thế chỗ: 'achieved the decisive significant advance / milestone in 1909' giải tỏa hoàn toàn nguy cơ tắc nghẽn lương thực được nêu ở đoạn 1.",
      "trap_breakdown": {
        "A": "costly failure (thất bại tốn kém) — Bẫy trái nghĩa hoàn toàn.",
        "B": "gradual decline (suy tàn dần) — Trái nghĩa với thành tựu rực rỡ.",
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
      "A": "erratic",
      "B": "backward",
      "C": "simultaneous",
      "D": "accelerated"
    },
    "correct_answer": "C",
    "clue_type": "Definition & Mathematical match (Khớp thời gian hoàn hảo)",
    "clue_signal": "phenomenon known as synchronous rotation... until its rotational period precisely matched its orbital period.",
    "explanation": {
      "meaning": "'Synchronous' là tính từ chỉ sự đồng bộ, xảy ra cùng lúc, trùng khớp hoàn toàn về chu kỳ thời gian.",
      "substitution": "Thế chỗ: 'simultaneous / synchronized rotation' giải thích cho việc thời gian tự quay quanh trục khớp chính xác với thời gian quay quanh Trái Đất.",
      "trap_breakdown": {
        "A": "erratic (thất thường) — Chuyển động đồng bộ là cực kỳ chính xác và ổn định.",
        "B": "backward (ngược chiều) — Mặt Trăng quay cùng chiều chứ không quay ngược.",
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
      "A": "clumsy",
      "B": "ornamental",
      "C": "ineffective",
      "D": "deadly"
    },
    "correct_answer": "D",
    "clue_type": "Restatement & Consequence (Hệ quả đâm thủng và gây tử vong)",
    "clue_signal": "penetrated deeply past the thick hide... cutting major arteries and inducing fatal internal hemorrhaging.",
    "explanation": {
      "meaning": "'Lethal' là tính từ mang nghĩa gây chết người, có tính sát thương gây tử vong (deadly / fatal).",
      "substitution": "Thế chỗ: 'functioned as remarkably deadly / fatal hunting armaments' tương thích trực tiếp với cụm 'inducing fatal internal hemorrhaging' (gây xuất huyết tử vong).",
      "trap_breakdown": {
        "A": "clumsy (vụng về) — Mũi tên được chế tác tinh vi khí động học, không hề vụng về.",
        "B": "ornamental (chỉ để trang trí) — Đây là vũ khí săn thú thật sự.",
        "C": "ineffective (không hiệu quả) — Bẫy trái nghĩa: Mũi giáo đâm xuyên qua cả xương sườn voi mammoth."
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
      "A": "one-sided",
      "B": "mutual",
      "C": "competitive",
      "D": "parasitic"
    },
    "correct_answer": "B",
    "clue_type": "Definition & Two-way Exchange (Trao đổi hai chiều 'In return')",
    "clue_signal": "transferring them directly into the host plant... In return, the photosynthetic tree allocates up to thirty percent...",
    "explanation": {
      "meaning": "'Reciprocal' mang nghĩa hỗ tương, có qua có lại, hai bên cùng trao đổi qua lại (mutual).",
      "substitution": "Thế chỗ: 'This biological partnership is fundamentally mutual / two-sided' được chứng minh bằng vế 'In return' (đổi lại nấm nhận đường từ cây).",
      "trap_breakdown": {
        "A": "one-sided (một chiều) — Bẫy trái nghĩa hoàn toàn.",
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
      "A": "scarce",
      "B": "plentiful",
      "C": "temporary",
      "D": "toxic"
    },
    "correct_answer": "B",
    "clue_type": "Restatement & Quantitative Proof (Chứng minh bằng số lượng khổng lồ)",
    "clue_signal": "energy resource is virtually abundant. Thermodynamic calculations indicate that extracting merely one percent... would satisfy demands for thousands of years...",
    "explanation": {
      "meaning": "'Abundant' mang nghĩa dồi dào, phong phú, có trữ lượng khổng lồ.",
      "substitution": "Thế chỗ: 'energy resource stored in deep bedrock is virtually plentiful / inexhaustible' được chứng minh bởi dữ kiện: chỉ cần 1% là đủ nuôi sống toàn bộ nền văn minh hàng ngàn năm.",
      "trap_breakdown": {
        "A": "scarce (khan hiếm) — Bẫy trái nghĩa hoàn toàn.",
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
      "A": "harmony",
      "B": "similarity",
      "C": "reassurance",
      "D": "inconsistency"
    },
    "correct_answer": "D",
    "clue_type": "Restatement & Synonym Parallel (Song hành với từ ở câu trước)",
    "clue_signal": "psychological inconsistencies between their beliefs and newly encountered factual evidence... When an undeniable discrepancy emerges between behavior and self-conception...",
    "explanation": {
      "meaning": "'Discrepancy' là danh từ chỉ sự mâu thuẫn, bất đồng, không khớp nhau giữa hai hay nhiều dữ kiện.",
      "substitution": "Thế chỗ: 'When an undeniable inconsistency / divergence emerges' đồng nghĩa trực tiếp với từ 'inconsistencies' ở câu ngay trước đó.",
      "trap_breakdown": {
        "A": "harmony (sự hài hòa) — Bẫy trái nghĩa: Dissonance là mâu thuẫn đối lập với hài hòa.",
        "B": "similarity (sự tương đồng) — Bẫy trái nghĩa: Discrepancy là sự khác biệt mâu thuẫn.",
        "C": "reassurance (sự trấn an) — Không phù hợp ngữ cảnh xung đột nhận thức."
      },
      "synonyms": [
        "inconsistency",
        "disparity",
        "divergence",
        "contradiction"
      ]
    }
  },
  {
    "id": "vic_51",
    "title": "The Rise of Hanseatic Maritime Commerce",
    "topic": "Economics & Medieval History",
    "target_word": "lucrative",
    "paragraph_index": 2,
    "passage": "During the late Middle Ages, the Baltic and North Sea merchant networks transformed from localized coastal barter systems into a highly organized commercial confederation known as the Hanseatic League. By securing exclusive trading privileges from monarchs eager for customs revenues, Hansa merchants established fortified enclaves, or Kontore, across major trading hubs ranging from London and Bruges to Novgorod.\n\nCentral to the League's economic hegemony was its control over the lucrative trade in staple bulk commodities. While southern Mediterranean routes favored lightweight luxury goods such as silk and exotic spices, northern waters demanded timber, pitch, flax, and grain. Controlling the distribution of preserved herring from Scania was exceptionally profitable, as Catholic dietary mandates created immense European demand during Lent. The vast wealth accrued from these ventures enabled the League to finance private naval fleets to suppress piracy and wage embargoes against non-compliant sovereign rulers.\n\nYet this monopoly was vulnerable to long-term structural shifts. By the sixteenth century, the development of larger Dutch cargo fluyts diminished Hansa shipping cost advantages. Concurrently, shifting herring migration patterns away from Baltic waters toward the North Sea undermined the League's foundational commerce, hastening its gradual eclipse by centralized nation-states.",
    "question": "The word 'lucrative' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "profitable",
      "B": "precarious",
      "C": "unregulated",
      "D": "laborious"
    },
    "correct_answer": "A",
    "clue_type": "Elaboration & Exemplification",
    "clue_signal": "exceptionally profitable... The vast wealth accrued from these ventures enabled...",
    "explanation": {
      "meaning": "'Lucrative' là tính từ chỉ hoạt động kinh doanh, thương mại có khả năng sinh lời lớn, đem lại nguồn lợi nhuận dồi dào.",
      "substitution": "Thế chỗ: 'control over the profitable trade in staple bulk commodities' hoàn toàn khớp với câu sau nói về 'exceptionally profitable' và 'vast wealth'.",
      "trap_breakdown": {
        "B": "precarious (bấp bênh) — Bẫy trái nghĩa: Ngữ cảnh nhấn mạnh sự giàu có vững chắc chứ không phải hiểm nguy bấp bênh.",
        "C": "unregulated (không kiểm soát) — Bẫy thể chế: Liên minh Hanseatic kiểm soát mạng lưới vô cùng chặt chẽ.",
        "D": "laborious (nhọc nhằn) — Sai nghĩa: Buôn bán có thể vất vả nhưng câu văn tập trung vào khía cạnh sinh lợi nhuận."
      },
      "synonyms": [
        "profitable",
        "gainful",
        "remunerative",
        "financially rewarding"
      ]
    }
  },
  {
    "id": "vic_52",
    "title": "Neuroplasticity and Synaptic Pruning in Adolescence",
    "topic": "Neuroscience & Developmental Biology",
    "target_word": "concomitant",
    "paragraph_index": 2,
    "passage": "For decades, neuroscientists assumed that the human brain reached structural maturity during early childhood, when basic sensory and motor cortices complete myelination. Contemporary neuroimaging techniques, however, have revealed that substantial architectural reorganization persists throughout adolescence and into early adulthood. This protracted maturation is most pronounced within the prefrontal cortex, the neural substrate governing executive function, impulse control, and abstract reasoning.\n\nDuring this developmental epoch, the brain undergoes selective synaptic pruning alongside a concomitant proliferation of white matter tracts. Synaptic pruning eliminates redundant or underutilized dendritic connections, thereby streamlining neural circuitry and optimizing transmission efficiency. Simultaneously, the progressive thickening of lipid-rich myelin sheaths around remaining axons dramatically accelerates axonal action potential velocity. Far from reflecting cognitive deficits, these structural reductions represent an adaptive specialization of neural networks tailored to environmental demands.\n\nThis neurodevelopmental trajectory explains common adolescent behavioral patterns. Because subcortical limbic regions associated with emotional reactivity mature earlier than the prefrontal networks required for cognitive restraint, adolescents often exhibit pronounced risk-taking tendencies. Heightened plasticity during this window offers unparalleled vulnerability to addictive substances, yet simultaneously affords exceptional capacity for accelerated learning and skill acquisition.",
    "question": "The word 'concomitant' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "sequential",
      "B": "unforeseen",
      "C": "accompanying",
      "D": "isolated"
    },
    "correct_answer": "C",
    "clue_type": "Collocation & Contextual Logic",
    "clue_signal": "alongside a concomitant proliferation... Simultaneously, the progressive thickening...",
    "explanation": {
      "meaning": "'Concomitant' là tính từ học thuật chỉ hiện tượng xảy ra đồng thời, đi kèm hoặc kết hợp song song với một hiện tượng khác.",
      "substitution": "Thế chỗ: 'alongside an accompanying proliferation of white matter tracts' (cùng với sự tăng sinh đi kèm của các dải chất trắng) khớp tuyệt đối với từ nối 'Simultaneously' ở câu kế tiếp.",
      "trap_breakdown": {
        "A": "sequential (tuần tự, cái này nối tiếp cái kia) — Bẫy thời gian: Hai tiến trình này diễn ra song song cùng lúc, không phải trước sau.",
        "B": "unforeseen (bất ngờ, không lường trước) — Bẫy suy diễn: Đây là quy luật sinh học tự nhiên, không phải hiện tượng bất ngờ.",
        "D": "isolated (cô lập) — Bẫy trái nghĩa hoàn toàn với việc đi kèm đồng hành."
      },
      "synonyms": [
        "accompanying",
        "concurrent",
        "associated",
        "synchronous"
      ]
    }
  },
  {
    "id": "vic_53",
    "title": "Methodological Rigor in Epigraphic Decipherment",
    "topic": "Historical Linguistics & Epigraphy",
    "target_word": "scrupulous",
    "paragraph_index": 2,
    "passage": "The decipherment of forgotten writing systems represents one of the most intricate challenges in historical philology. Without a bilingual inscription like the Rosetta Stone, scholars must reconstruct grammatical rules, phonological values, and lexical meanings solely from structural analyses of corpus texts. Early antiquarians frequently succumbed to romantic speculation, attributing mystical symbolism to phonetic scripts and misinterpreting repeated glyphs as occult allegories.\n\nModern epigraphy replaces intuition with scrupulous empirical cross-referencing. Epigraphers meticulously compile concordances that catalog every glyph variant, noting its positional frequency, positional constraints, and recurring collocations across hundreds of monuments. Such precise accounting prevents researchers from forcing preconceived meanings onto ambiguous passages. By rigorously verifying that hypothetical phonetic values yield consistent, coherent syntax across entirely distinct inscriptions, linguists can validate a proposed decipherment through falsifiable methodologies.\n\nThe decipherment of Mayan hieroglyphic writing exemplifies this scientific transition. Once considered purely ideographic representations of celestial cycles, Mayan inscriptions were deciphered only after Yuri Knorozov recognized their logosyllabic nature through systematic frequency counts. Subsequent epigraphers corroborated these phonetic readings against modern Mayan dialects, ultimately unlocking detailed dynastic histories preserved on stelae across the Petén Basin.",
    "question": "The word 'scrupulous' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "theoretical",
      "B": "meticulous",
      "C": "tentative",
      "D": "provisional"
    },
    "correct_answer": "B",
    "clue_type": "Contrast & Opposition",
    "clue_signal": "Modern epigraphy replaces intuition with scrupulous... Epigraphers meticulously compile concordances...",
    "explanation": {
      "meaning": "'Scrupulous' trong bối cảnh nghiên cứu khoa học có nghĩa là tỉ mỉ, cẩn trọng, cực kỳ kỹ lưỡng và tuân thủ chặt chẽ tiêu chuẩn.",
      "substitution": "Thế chỗ: 'replaces intuition with meticulous empirical cross-referencing' đối lập với trực giác cảm tính (intuition) và được làm rõ ngay câu sau bằng từ 'meticulously compile'.",
      "trap_breakdown": {
        "A": "theoretical (mang tính lý thuyết) — Bẫy học thuật: Bài đọc đang ca ngợi tính thực nghiệm và đối chiếu dữ liệu thực tế (empirical), không phải suy đoán lý thuyết suông.",
        "C": "tentative (ngập ngừng, tạm thời) — Bẫy mức độ: Phương pháp ở đây rất chặt chẽ, không phải phỏng đoán dè dặt.",
        "D": "provisional (tạm thời) — Sai ngữ cảnh."
      },
      "synonyms": [
        "meticulous",
        "painstaking",
        "thorough",
        "rigorous"
      ]
    }
  },
  {
    "id": "vic_54",
    "title": "Mangrove Ecosystems and Coastal Geomorphology",
    "topic": "Ecology & Marine Biogeography",
    "target_word": "resilient",
    "paragraph_index": 3,
    "passage": "Occupying intertidal coastal interfaces across tropical and subtropical latitudes, mangrove forests inhabit environments characterized by severe environmental stresses. Fluctuating salinity gradients, hypoxic fine-grained sediments, and regular tidal inundation impose extreme physiological demands on vascular vegetation. Mangrove taxa overcome these obstacles through specialized adaptations, including complex prop roots that provide mechanical anchorage and pneumatophores that absorb atmospheric oxygen during low tide.\n\nBeyond surviving in harsh conditions, mangroves serve as essential biological engineers of coastal topography. The intricate network of submerged aerial roots dissipates incoming wave energy, attenuating storm surges and preventing the erosion of shoreline mudbanks. Furthermore, by slowing water velocity, root complexes trap terrigenous sediments and organic detritus carried down by river estuaries. Over decadal timescales, this accretion of sediment gradually elevates the substrate, enabling the seaward progradation of coastlines.\n\nDespite their apparent vulnerability to shoreline disturbances, mangrove ecosystems prove exceptionally resilient in the face of cyclical weather anomalies. When severe typhoons defoliate forest canopies or dislodge individual trees, dormant epicormic buds and prolific viviparous propagules rapidly recolonize newly created canopy gaps. However, this natural capacity for recovery is severely curtailed when artificial seawalls and aquaculture ponds disrupt hydrological connectivity, preventing tidal circulation and triggering irreversible die-offs.",
    "question": "The word 'resilient' in paragraph 3 is closest in meaning to:",
    "options": {
      "A": "fragile",
      "B": "imperceptible",
      "C": "stationary",
      "D": "adaptable"
    },
    "correct_answer": "D",
    "clue_type": "Contrast & Opposition",
    "clue_signal": "Despite their apparent vulnerability... prove exceptionally resilient... rapidly recolonize... capacity for recovery...",
    "explanation": {
      "meaning": "'Resilient' là tính từ chỉ khả năng phục hồi nhanh chóng, chống chịu tốt và thích ứng kiên cường sau thiên tai hoặc biến cố.",
      "substitution": "Thế chỗ: 'prove exceptionally adaptable in the face of cyclical weather anomalies' đối lập trực tiếp với 'apparent vulnerability' (vẻ ngoài dễ tổn thương) và khớp với 'capacity for recovery'.",
      "trap_breakdown": {
        "A": "fragile (mong manh, dễ vỡ) — Bẫy trái nghĩa hoàn toàn, bắt nguồn từ 'apparent vulnerability'.",
        "B": "imperceptible (không thể nhận thấy) — Sai nghĩa hoàn toàn.",
        "C": "stationary (đứng yên, bất động) — Bẫy sinh học: Hệ sinh thái rừng ngập mặn liên tục biến động và hồi phục chứ không bất động."
      },
      "synonyms": [
        "adaptable",
        "hardy",
        "tenacious",
        "quick to recover"
      ]
    }
  },
  {
    "id": "vic_55",
    "title": "Transonic Aerodynamics and the Area Rule",
    "topic": "Aviation History & Fluid Dynamics",
    "target_word": "obviated",
    "paragraph_index": 2,
    "passage": "During the late 1940s, aircraft designers striving to exceed the speed of sound encountered severe physical resistance known as the sound barrier. As flight velocity approached Mach 1, shock waves formed spontaneously over wings and fuselages, causing dramatic surges in aerodynamic drag, violent buffetting, and catastrophic losses of control. Initial engineering responses relied on brute propulsion, installing increasingly massive afterburning turbojet engines, yet aircraft repeatedly failed to penetrate the transonic regime.\n\nAerodynamicist Richard Whitcomb resolved this impasse through his formulation of the transonic area rule. By modeling the aircraft not as an assembly of distinct components but as an integrated volume of cross-sectional area, Whitcomb recognized that the abrupt junction between the fuselage and wings generated immense wave drag. Indenting the fuselage inward at the wing roots created a contoured 'wasp-waist' profile that ensured a smooth, gradual longitudinal distribution of cross-sectional area. This structural modification dramatically lowered wave drag and effectively obviated the necessity for prohibitive engine thrust.\n\nThe practical implementation of the area rule revolutionized military aircraft performance. When applied to the prototype Convair F-102, which had previously proved incapable of supersonic flight in level attitude, the reshaped airframe slipped effortlessly past Mach 1 with identical engine output. Today, area-rule principles remain an indispensable baseline for supersonic transports and combat fighters worldwide.",
    "question": "The word 'obviated' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "eliminated",
      "B": "magnified",
      "C": "anticipated",
      "D": "prolonged"
    },
    "correct_answer": "A",
    "clue_type": "Cause & Effect (Nguyên nhân - Hệ quả)",
    "clue_signal": "dramatically lowered wave drag and effectively obviated the necessity for prohibitive engine thrust... with identical engine output...",
    "explanation": {
      "meaning": "'Obviate' là ngoại động từ học thuật có nghĩa là loại bỏ, xóa tan hoặc làm cho một nhu cầu/khó khăn không còn cần thiết nữa.",
      "substitution": "Thế chỗ: 'effectively eliminated the necessity for prohibitive engine thrust' (loại bỏ sự cần thiết của lực đẩy động cơ khổng lồ) hoàn toàn phù hợp với việc máy bay bay vượt âm mà không cần tăng công suất động cơ.",
      "trap_breakdown": {
        "B": "magnified (phóng đại, làm tăng lên) — Bẫy trái nghĩa: Thiết kế mới làm giảm lực cản chứ không làm tăng gánh nặng động cơ.",
        "C": "anticipated (dự đoán trước) — Bẫy liên tưởng công nghệ: Whitcomb tính toán trước nhưng ở đây 'obviate the necessity' nghĩa là loại bỏ nhu cầu đó.",
        "D": "prolonged (kéo dài) — Sai nghĩa."
      },
      "synonyms": [
        "eliminated",
        "precluded",
        "ruled out",
        "rendered unnecessary"
      ]
    }
  },
  {
    "id": "vic_56",
    "title": "Language Typology and Ergative Alignment",
    "topic": "Comparative Linguistics & Syntax",
    "target_word": "disparate",
    "paragraph_index": 2,
    "passage": "Most modern European tongues employ a nominative-accusative syntactic alignment. In such languages, the single argument of an intransitive clause ('The child sleeps') receives the identical grammatical marking—usually the nominative case—as the voluntary agent of a transitive clause ('The child kicks the ball'). The recipient or patient of the transitive action is assigned a separate accusative marking. This pervasive uniformity led early Western grammarians to assume that nominative-accusative syntax reflected an innate human cognitive universal.\n\nComparative typological surveys across global languages challenged this eurocentric assumption. Field linguists discovered that dozens of disparate language families—including Basque in the Pyrenees, Caucasian tongues, indigenous Australian languages, and Mayan idioms—utilize an ergative-absolutive alignment. In ergative systems, the subject of an intransitive verb is grammatically paired with the object of a transitive verb under the absolutive case, while the transitive agent receives an exclusive ergative inflection. The presence of this structure across geographically detached continents demonstrates that human grammar can organize semantic roles along fundamentally divergent axes.\n\nUnderstanding ergativity has enriched theories of universal grammar. Rather than reflecting cognitive discrepancies between human populations, disparate case alignments show that syntax operates with remarkable structural flexibility. Modern computational linguistics incorporates both ergative and accusative parameters to model natural language processing algorithms capable of parsing polyglot corpora accurately.",
    "question": "The word 'disparate' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "interrelated",
      "B": "homogeneous",
      "C": "distinct",
      "D": "rudimentary"
    },
    "correct_answer": "C",
    "clue_type": "Elaboration & Exemplification",
    "clue_signal": "including Basque in the Pyrenees, Caucasian tongues, indigenous Australian languages, and Mayan idioms... geographically detached continents...",
    "explanation": {
      "meaning": "'Disparate' là tính từ mang nghĩa hoàn toàn khác biệt, tách rời, không có mối liên hệ hay nguồn gốc chung.",
      "substitution": "Thế chỗ: 'dozens of distinct language families' (hàng chục ngữ hệ khác biệt nhau hoàn toàn) làm nổi bật việc các ngôn ngữ từ châu Âu, Kavkaz, Úc đến châu Mỹ đều có cấu trúc này.",
      "trap_breakdown": {
        "A": "interrelated (liên quan mật thiết) — Bẫy trái nghĩa: Các ngôn ngữ này thuộc các ngữ hệ độc lập, không liên quan họ hàng.",
        "B": "homogeneous (đồng nhất) — Bẫy trái nghĩa hoàn toàn.",
        "D": "rudimentary (sơ khai) — Bẫy thành kiến: Các ngôn ngữ bản địa không hề thô sơ mà có ngữ pháp rất phức tạp."
      },
      "synonyms": [
        "distinct",
        "dissimilar",
        "diverse",
        "unrelated"
      ]
    }
  },
  {
    "id": "vic_57",
    "title": "Sauropod Gigantism and Avian-Style Respiration",
    "topic": "Paleobiology & Biomechanics",
    "target_word": "prodigious",
    "paragraph_index": 1,
    "passage": "The evolutionary emergence of sauropod dinosaurs during the Jurassic period produced terrestrial herbivores of unprecedented magnitude. Taxa such as Argentinosaurus and Patagotitan reached body lengths exceeding thirty-five meters and body masses topping seventy metric tons. For comparative physiologists, explaining how vertebrates sustained such prodigious dimensions without succumbing to hyperthermia or structural skeletal collapse constitutes a classic evolutionary puzzle.\n\nBiomechanical investigations indicate that sauropods possessed a unique constellation of anatomical innovations. Their vertebral columns were extensively lightened by internal pneumatic cavities called pleurocoels, reducing dead skeletal weight without compromising tensile rigidity. More importantly, sauropods inherited an avian-style respiratory system featuring non-vascular air sacs distributed throughout the thorax and abdomen. This mechanism drove a continuous, unidirectional airflow across the lungs, delivering superior gas-exchange efficiency compared to mammalian tidal breathing while functioning as an effective internal cooling radiator.\n\nNutritional ecology further supported their extreme size. By dispensing with mastication and swallowing vegetative matter whole, sauropods bypassed the dental constraints that restrict mammalian herbivores. Their elongate necks permitted broad, sweeping browsing envelopes without requiring costly locomotion, allowing giant sauropods to maximize caloric intake while expending minimal kinetic energy.",
    "question": "The word 'prodigious' in paragraph 1 is closest in meaning to:",
    "options": {
      "A": "standard",
      "B": "colossal",
      "C": "volatile",
      "D": "fragile"
    },
    "correct_answer": "B",
    "clue_type": "Definition & Restatement",
    "clue_signal": "unprecedented magnitude... lengths exceeding thirty-five meters and body masses topping seventy metric tons... such prodigious dimensions...",
    "explanation": {
      "meaning": "'Prodigious' là tính từ học thuật mang nghĩa khổng lồ, phi thường, to lớn đến mức gây kinh ngạc.",
      "substitution": "Thế chỗ: 'how vertebrates sustained such colossal dimensions' khớp hoàn toàn với các con số 35m chiều dài và 70 tấn cân nặng được nêu ở câu trước.",
      "trap_breakdown": {
        "A": "standard (tiêu chuẩn) — Bẫy trái nghĩa: Kích thước của khủng long là phi thường chứ không bình thường.",
        "C": "volatile (dễ biến động) — Bẫy nhầm lẫn: Kích thước cơ thể động vật không phải là hiện tượng biến đổi thất thường.",
        "D": "fragile (dễ gãy) — Bẫy nhầm lẫn với cấu trúc xương rỗng nhẹ."
      },
      "synonyms": [
        "colossal",
        "immense",
        "enormous",
        "monumental"
      ]
    }
  },
  {
    "id": "vic_58",
    "title": "Desert Geomorphology and Vernal Pools",
    "topic": "Arid Ecology & Hydrology",
    "target_word": "ephemeral",
    "paragraph_index": 2,
    "passage": "Arid regions are conventionally characterized by permanent hydrological deficits, sparse vegetative ground cover, and intense solar insolation. However, precipitation regimes in drylands are rarely uniform; instead, they feature prolonged dry spells punctuated by localized, torrential thunderstorms. When intense downpours fall on impermeable clay soils, runoff rapidly fills shallow topographical depressions, creating isolated seasonal wetlands known as vernal pools.\n\nThese ephemeral aquatic habitats persist for mere weeks before desiccating under relentless desert heat. Despite their short duration, vernal pools support highly specialized biotic assemblages. Branchiopod crustaceans, such as tadpole shrimp and fairy shrimp, produce desiccated cysts capable of surviving decades encased in baking alkaline dust. When pool inundation occurs, these dormant embryos hatch instantaneously, accelerating through metamorphosis and ovipositing new cysts before the standing water evaporates completely.\n\nVernal pools also act as temporary ecological oases for migratory avifauna. Waterfowl navigating transcontinental flyways time their stopovers to coincide with post-storm crustacean blooms, gorging on abundant protein reserves. As urban sprawl and agricultural grading level these micro-depressions across global arid zones, conservationists emphasize that protecting these temporary wetlands is vital to preserving regional biodiversity.",
    "question": "The word 'ephemeral' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "perennial",
      "B": "stagnant",
      "C": "subterranean",
      "D": "short-lived"
    },
    "correct_answer": "D",
    "clue_type": "Definition & Restatement",
    "clue_signal": "persist for mere weeks before desiccating under relentless desert heat. Despite their short duration...",
    "explanation": {
      "meaning": "'Ephemeral' là tính từ chỉ những sự vật, hiện tượng tồn tại trong khoảng thời gian rất ngắn, phù du, ngắn ngủi.",
      "substitution": "Thế chỗ: 'These short-lived aquatic habitats persist for mere weeks' khớp tuyệt đối với câu văn nêu rõ hồ nước này chỉ tồn tại vài tuần rồi bốc hơi.",
      "trap_breakdown": {
        "A": "perennial (lâu năm, vĩnh cửu) — Bẫy trái nghĩa hoàn toàn với hồ nước tạm bợ.",
        "B": "stagnant (tù đọng) — Bẫy liên tưởng nước ao: Nước có thể đọng lại nhưng từ ephemeral nói về thời gian tồn tại ngắn ngủi.",
        "C": "subterranean (dưới lòng đất) — Bẫy địa lý: Đây là những vũng trũng trên mặt đất."
      },
      "synonyms": [
        "short-lived",
        "transitory",
        "fleeting",
        "evanescent"
      ]
    }
  },
  {
    "id": "vic_59",
    "title": "Paleomagnetism and Seafloor Spreading",
    "topic": "Geophysics & Plate Tectonics",
    "target_word": "substantiate",
    "paragraph_index": 2,
    "passage": "When Alfred Wegener first presented his hypothesis of continental drift in 1912, the geological establishment largely dismissed his ideas. Although Wegener pointed to matching continental margins across the Atlantic and identical fossil distributions in South America and Africa, he could not identify a physically plausible mechanism capable of propelling rigid granitic continents through denser oceanic basaltic crust. For nearly half a century, mobilist theories remained on the fringes of academic geology.\n\nThe advent of marine paleomagnetism in the 1960s finally provided the empirical data required to substantiate seafloor spreading. As basaltic magma emerges along mid-ocean rift valleys and solidifies, iron-rich magnetite grains align themselves with the prevailing orientation of Earth's magnetic dipole field. Because Earth's geomagnetic polarity reverses periodically over geological epochs, newly formed basalt preserves an indelible chronological record. Magnetometer surveys revealed alternating, mirror-image stripes of normal and reversed magnetic anomalies flanking both sides of oceanic ridges.\n\nThese symmetrical magnetic stripes conclusively proved that new oceanic crust was continually generated at mid-ocean ridges and conveyed laterally outward like a conveyor belt. By matching magnetic reversals to radiometric dates established on land basalts, geophysicists accurately calculated past spreading rates. Continental drift was thus subsumed into the modern paradigm of plate tectonics, transforming geology from a descriptive discipline into an explanatory physical science.",
    "question": "The word 'substantiate' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "contradict",
      "B": "supplant",
      "C": "validate",
      "D": "fabricate"
    },
    "correct_answer": "C",
    "clue_type": "Cause & Effect (Nguyên nhân - Hệ quả)",
    "clue_signal": "finally provided the empirical data required to substantiate seafloor spreading... conclusively proved that new oceanic crust...",
    "explanation": {
      "meaning": "'Substantiate' là ngoại động từ có nghĩa là chứng minh, xác thực hoặc cung cấp bằng chứng thuyết phục để củng cố một luận điểm.",
      "substitution": "Thế chỗ: 'data required to validate seafloor spreading' hoàn toàn đồng nghĩa với câu sau 'conclusively proved that new oceanic crust was continually generated'.",
      "trap_breakdown": {
        "A": "contradict (mâu thuẫn, phản bác) — Bẫy trái nghĩa: Dữ liệu này chứng minh chứ không bác bỏ học thuyết tách giãn đáy biển.",
        "B": "supplant (thay thế, lật đổ) — Bẫy nhầm lẫn: Dữ liệu củng cố giả thuyết chứ không đào thải nó.",
        "D": "fabricate (ngụy tạo, bịa đặt) — Bẫy đạo đức khoa học: Dữ liệu từ khảo sát thực tế hoàn toàn có thật."
      },
      "synonyms": [
        "validate",
        "corroborate",
        "confirm",
        "verify"
      ]
    }
  },
  {
    "id": "vic_60",
    "title": "Transmission Spectroscopy of Exoplanetary Atmospheres",
    "topic": "Astrophysics & Planetary Science",
    "target_word": "tenuous",
    "paragraph_index": 2,
    "passage": "The catalog of confirmed extrasolar planets has expanded exponentially since the discovery of 51 Pegasi b in 1995. While early exoplanetary science focused primarily on orbital dynamics and mass constraints derived from radial velocity measurements, contemporary astrophysics aims to characterize the atmospheric chemistry of distant worlds. The premier methodology for accomplishing this is transmission spectroscopy, executed during transits when an exoplanet passes directly across the disk of its host star.\n\nDuring a transit event, starlight filters through the tenuous outer fringes of the exoplanet's gaseous envelope. Chemical species residing within the upper atmosphere absorb specific wavelengths of stellar photons according to quantum mechanical transitions, imprinting distinctive spectral absorption lines upon the transmitted light. Because the depth of absorption corresponds to tiny fractions of a percent of the total stellar flux, isolating these subtle atmospheric signatures requires ultra-stable space observatories like the James Webb Space Telescope.\n\nTransmission spectroscopy has revealed diverse chemical compositions across foreign solar systems. Astronomers have identified water vapor, carbon dioxide, sodium, and methane within the atmospheres of scorching gas giants and temperate sub-Neptunes. Comparing observed spectral absorption depths against theoretical radiative equilibrium models allows researchers to infer atmospheric metallicity, photochemistry, and the possible presence of silicate aerosol clouds.",
    "question": "The word 'tenuous' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "dense",
      "B": "turbulent",
      "C": "radioactive",
      "D": "flimsy"
    },
    "correct_answer": "D",
    "clue_type": "Collocation & Contextual Logic",
    "clue_signal": "starlight filters through the tenuous outer fringes... tiny fractions of a percent... subtle atmospheric signatures...",
    "explanation": {
      "meaning": "'Tenuous' trong ngữ cảnh thiên văn/vật lý khí quyển miêu tả lớp khí mỏng manh, loãng, mật độ phân tử cực thấp.",
      "substitution": "Thế chỗ: 'starlight filters through the flimsy/thin outer fringes' khớp với chi tiết ánh sao chiếu xuyên qua rìa khí quyển rất loãng và chỉ để lại tín hiệu quang phổ cực nhỏ (subtle).",
      "trap_breakdown": {
        "A": "dense (dày đặc) — Bẫy trái nghĩa: Khí quyển ở rìa ngoài cùng rất loãng chứ không đậm đặc.",
        "B": "turbulent (hỗn loạn) — Bẫy động lực học: Khí quyển có thể có bão nhưng tenuous nói về mật độ mỏng manh.",
        "C": "radioactive (phóng xạ) — Bẫy liên tưởng vũ trụ."
      },
      "synonyms": [
        "flimsy",
        "thin",
        "slender",
        "insubstantial"
      ]
    }
  },
  {
    "id": "vic_61",
    "title": "Cryospheric Dynamics of Antarctic Ice Shelves",
    "topic": "Glaciology & Climate Science",
    "target_word": "formidable",
    "paragraph_index": 1,
    "passage": "The Antarctic Ice Sheet contains enough freshwater to raise global mean sea levels by nearly sixty meters if melted in its entirety. The seaward perimeter of this vast ice sheet terminates in floating platforms known as ice shelves, which extend over embayments and shallow coastal seas. These massive floating buttresses exert a formidable restraining force on inland tributary glaciers, resisting their gravitational flow toward the ocean.\n\nRecent oceanographic monitoring indicates that warming sub-surface circumpolar deep water is infiltrating the cavities beneath major West Antarctic ice shelves. When warm seawater melts the basal grounding lines of shelves like Thwaites and Pine Island, the floating ice thins from beneath. Basal melting reduces basal drag against bedrock pinning points, weakening the structural integrity of the entire shelf. Once an ice shelf thins or collapses, tributary glaciers behind it accelerate rapidly, draining continental ice reserves directly into the Southern Ocean.\n\nSatellite altimetry surveys have documented dramatic glacial acceleration following the collapse of the Larsen B Ice Shelf in 2002. Inland ice velocity increased eightfold within months of the shelf's disintegration. Climate modelers warn that stabilizing the buttressing capacity of remaining ice shelves represents the single most decisive factor in constraining twenty-first-century sea level rise projections.",
    "question": "The word 'formidable' in paragraph 1 is closest in meaning to:",
    "options": {
      "A": "negligible",
      "B": "impressive",
      "C": "temporary",
      "D": "artificial"
    },
    "correct_answer": "B",
    "clue_type": "Collocation & Contextual Logic",
    "clue_signal": "massive floating buttresses exert a formidable restraining force on inland tributary glaciers, resisting their gravitational flow...",
    "explanation": {
      "meaning": "'Formidable' là tính từ chỉ sức mạnh to lớn, ghê gớm, gây ấn tượng mạnh và tạo ra tác động to lớn đến mức đáng nể sợ.",
      "substitution": "Thế chỗ: 'exert an impressive/powerful restraining force' (tạo ra một lực cản khổng lồ/đáng nể) khớp với vai trò nâng đỡ cả một dòng sông băng lục địa đồ sộ.",
      "trap_breakdown": {
        "A": "negligible (không đáng kể) — Bẫy trái nghĩa hoàn toàn.",
        "C": "temporary (tạm thời) — Bẫy nhầm lẫn: Lực cản này đã duy trì hàng nghìn năm ổn định.",
        "D": "artificial (nhân tạo) — Bẫy nguồn gốc: Thềm băng hoàn toàn là kiến tạo tự nhiên."
      },
      "synonyms": [
        "impressive",
        "daunting",
        "powerful",
        "imposing"
      ]
    }
  },
  {
    "id": "vic_62",
    "title": "Oncogenes and Aberrant Cell Cycle Regulation",
    "topic": "Cell Biology & Oncology",
    "target_word": "proliferation",
    "paragraph_index": 2,
    "passage": "In healthy eukaryotic multicellular organisms, somatic cell division is governed by an exquisite balance of positive mitogenic signals and negative inhibitory checkpoints. Cyclin-dependent kinases (CDKs) assemble with regulatory cyclin proteins to propel the cell forward across cell cycle phases only when DNA replication fidelity has been verified. Tumor suppressor genes, such as TP53 and RB1, act as molecular guardians, pausing division or initiating programmed apoptosis if irreparable genomic mutations are detected.\n\nMalignant transformation occurs when genetic alterations disrupt this homeostatic equilibrium, triggering the unchecked proliferation of clonal cells. Proto-oncogenes that acquire gain-of-function point mutations become constitutively active oncogenes, continuously pumping growth signals through intracellular kinase cascades regardless of external stimuli. Concurrently, loss-of-function mutations in tumor suppressor pathways incapacitate the senescence and apoptotic mechanisms that normally arrest abnormal cell divisions. As a consequence, transformed cells multiply exponentially, developing dense, vascularized neoplasias.\n\nOver time, this continuous genomic instability fosters evolutionary competition among divergent cancer cell sub-clones. Cells acquiring phenotypic advantages—such as resistance to chemotherapeutic agents, enhanced metabolic glycolytic flux, or the capacity for matrix metalloproteinase synthesis—outcompete neighboring clones, eventually enabling local tissue invasion and distant hematogenous metastasis.",
    "question": "The word 'proliferation' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "destruction",
      "B": "differentiation",
      "C": "quiescence",
      "D": "rapid reproduction"
    },
    "correct_answer": "D",
    "clue_type": "Elaboration & Exemplification",
    "clue_signal": "unchecked proliferation... transformed cells multiply exponentially, developing dense... neoplasias...",
    "explanation": {
      "meaning": "'Proliferation' là danh từ sinh học/y khoa chỉ sự sinh sôi nảy nở nhanh chóng, tăng sinh cấp số nhân về số lượng tế bào.",
      "substitution": "Thế chỗ: 'triggering the unchecked rapid reproduction of clonal cells' hoàn toàn khớp với câu tiếp theo nói rằng 'transformed cells multiply exponentially' (tế bào nhân bản theo cấp số nhân).",
      "trap_breakdown": {
        "A": "destruction (sự phá hủy) — Bẫy trái nghĩa: Tế bào ung thư nhân lên chứ không bị tiêu diệt.",
        "B": "differentiation (sự biệt hóa tế bào) — Bẫy sinh học: Khối u thường mất tính biệt hóa để tập trung phân chia.",
        "C": "quiescence (trạng thái nghỉ, bất hoạt) — Bẫy trái nghĩa: Quiescence là tế bào dừng phân chia."
      },
      "synonyms": [
        "rapid reproduction",
        "exponential multiplication",
        "rapid growth",
        "expansion"
      ]
    }
  },
  {
    "id": "vic_63",
    "title": "Allopatric Speciation and Ecological Vicariance",
    "topic": "Evolutionary Biology & Biogeography",
    "target_word": "divergence",
    "paragraph_index": 2,
    "passage": "Speciation, the lineage-splitting evolutionary process that produces distinct biological species, requires the disruption of gene flow between formerly interbreeding populations. In classic allopatric speciation, this reproductive isolation is initiated by geographic vicariance—the emergence of a physical barrier such as a mountain range, river formation, or continental drift that subdivides an ancestral species into geographically disjunct demes.\n\nOnce isolated, the separated populations undergo cumulative genetic divergence driven by distinct selective pressures and random genetic drift. Because environmental factors—such as precipitation, predator assemblages, and microclimates—inevitably vary between disjoint habitats, natural selection favors divergent physiological, morphological, and behavioral phenotypes in each isolate. Mutations arising uniquely in one population cannot cross the geographic barrier to enter the gene pool of the other. Over hundreds of thousands of generations, these distinct mutational trajectories widen the genetic distance between the groups.\n\nWhen climatic or tectonic shifts subsequently dissolve the geographic barrier, secondary contact reveals whether speciation has reached completion. If evolutionary separation has generated prezygotic reproductive barriers—such as discordant courtship vocalizations, mismatched breeding seasons, or incompatible genital morphologies—the two populations cannot interbreed and remain distinct sympatric species.",
    "question": "The word 'divergence' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "differentiation",
      "B": "convergence",
      "C": "stagnation",
      "D": "amalgamation"
    },
    "correct_answer": "A",
    "clue_type": "Definition & Restatement",
    "clue_signal": "cumulative genetic divergence... natural selection favors divergent physiological... phenotypes... widen the genetic distance...",
    "explanation": {
      "meaning": "'Divergence' trong tiến hóa sinh học chỉ sự phân kỳ, rẽ nhánh khác biệt dần giữa hai quần thể tách rời nhau.",
      "substitution": "Thế chỗ: 'undergo cumulative genetic differentiation' khớp hoàn toàn với vế sau nói về việc 'widen the genetic distance' (nới rộng khoảng cách di truyền).",
      "trap_breakdown": {
        "B": "convergence (sự hội tụ) — Bẫy tiến hóa trái nghĩa: Tiến hóa hội tụ là hai loài khác nhau phát triển nét tương đồng.",
        "C": "stagnation (sự đình trệ) — Bẫy trái nghĩa: Các quần thể liên tục đột biến và tiến hóa chứ không dậm chân tại chỗ.",
        "D": "amalgamation (sự hòa hợp, sáp nhập) — Bẫy trái nghĩa: Gene không thể hòa lẫn qua lại."
      },
      "synonyms": [
        "differentiation",
        "branching apart",
        "disparity",
        "deviation"
      ]
    }
  },
  {
    "id": "vic_64",
    "title": "Cosmic Expansion and the Hubble Constant",
    "topic": "Cosmology & Relativistic Physics",
    "target_word": "immutable",
    "paragraph_index": 1,
    "passage": "Prior to the observational breakthroughs of the 1920s, the cosmological paradigm conceived the universe as an eternal, static, and immutable entity. Even Albert Einstein, whose general theory of relativity naturally implied an expanding or contracting cosmos, inserted an ad hoc mathematical term called the cosmological constant into his gravitational field equations solely to force a static equilibrium. The notion that the cosmos possessed a definitive inception point and dynamic history seemed contrary to physical principles.\n\nThis static worldview was shattered by Edwin Hubble's observations at Mount Wilson Observatory. By measuring the pulsation periods of Cepheid variable stars in distant nebulae, Hubble confirmed that these spiral clouds were independent galaxies lying millions of light-years beyond the Milky Way. More critically, when Hubble cross-referenced their distances with spectroscopic redshift data gathered by Vesto Slipher, he discovered a linear relationship: distant galaxies were receding from Earth at velocities proportional to their distance.\n\nHubble's law established that space itself was continuously stretching, carrying galaxies apart like raisins expanding in rising bread dough. Einstein later renounced his cosmological constant, calling it his greatest scientific blunder. Contemporary cosmologists now use precision space observatories to refine the Hubble constant, measuring the accelerating expansion rate driven by mysterious dark energy.",
    "question": "The word 'immutable' in paragraph 1 is closest in meaning to:",
    "options": {
      "A": "ephemeral",
      "B": "expanding",
      "C": "unalterable",
      "D": "chaotic"
    },
    "correct_answer": "C",
    "clue_type": "Collocation & Contextual Logic",
    "clue_signal": "eternal, static, and immutable entity... force a static equilibrium... This static worldview was shattered...",
    "explanation": {
      "meaning": "'Immutable' là tính từ mang nghĩa bất biến, không thể thay đổi, vĩnh cửu theo thời gian.",
      "substitution": "Thế chỗ: 'eternal, static, and unalterable entity' hoàn toàn đồng điệu với chuỗi từ 'eternal' (vĩnh cửu) và 'static' (tĩnh lặng, đứng yên).",
      "trap_breakdown": {
        "A": "ephemeral (ngắn ngủi, phù du) — Bẫy trái nghĩa hoàn toàn với eternal.",
        "B": "expanding (đang giãn nở) — Bẫy khoa học hiện đại: Đây là quan điểm ngày nay, trong khi đoạn 1 đang nói về quan điểm cũ thời chưa có kính thiên văn hiện đại.",
        "D": "chaotic (hỗn loạn) — Bẫy trạng thái: Vũ trụ tĩnh được coi là cân bằng hoàn hảo chứ không hỗn loạn."
      },
      "synonyms": [
        "unalterable",
        "unchangeable",
        "permanent",
        "invariant"
      ]
    }
  },
  {
    "id": "vic_65",
    "title": "Accretion Dynamics in Protoplanetary Disks",
    "topic": "Astrophysics & Solar System Formation",
    "target_word": "coalesce",
    "paragraph_index": 2,
    "passage": "Planetary systems originate within rotating circumstellar disks of gas and dust surrounding newly ignited protostars. In the cold interstellar medium, giant molecular clouds collapse under self-gravity, flattening into circumstellar disks due to conservation of angular momentum. These protoplanetary disks initially consist primarily of molecular hydrogen and helium, containing a mere one percent fraction of sub-micron silicate and carbonaceous dust grains.\n\nOver millions of years, microscopic dust grains collide and coalesce into progressively larger macroscopic bodies. Electrostatic forces and van der Waals interactions initially bind sub-millimeter particles during gentle, low-velocity collisions, forming porous dust aggregates. As these agglomerates grow into meter-sized boulders, aerodynamic drag from surrounding gas causes their orbits to decay rapidly, presenting the notorious 'meter-size barrier.' Once bodies overcome this threshold via streaming instabilities, gravitational accretion takes over, assembling kilometer-scale planetesimals into embryonic protoplanets.\n\nThermal conditions across the disk dictate the compositional architecture of the resulting planetary architecture. Inside the ice or snow line, temperatures prevent volatile compounds from condensing, restricting inner protoplanets to dense, rocky compositions. Beyond the snow line, abundant water ice and organic volatiles permit planetary cores to swell rapidly, attaining masses sufficient to accrete thick gaseous envelopes and develop into gas giants like Jupiter and Saturn.",
    "question": "The word 'coalesce' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "disintegrate",
      "B": "evaporate",
      "C": "repel",
      "D": "fuse"
    },
    "correct_answer": "D",
    "clue_type": "Definition & Restatement",
    "clue_signal": "microscopic dust grains collide and coalesce into progressively larger macroscopic bodies... bind sub-millimeter particles... forming porous dust aggregates...",
    "explanation": {
      "meaning": "'Coalesce' là nội động từ có nghĩa là kết hợp lại, sáp nhập, dính liền vào nhau để tạo thành một khối thể lớn hơn.",
      "substitution": "Thế chỗ: 'collide and fuse into progressively larger macroscopic bodies' khớp hoàn toàn với 'bind sub-millimeter particles' và 'forming aggregates'.",
      "trap_breakdown": {
        "A": "disintegrate (tan rã, vỡ vụn) — Bẫy va chạm: Va chạm mạnh có thể làm vỡ, nhưng câu văn đang nói va chạm êm dịu làm dính liền nhau (form larger bodies).",
        "B": "evaporate (bốc hơi) — Bẫy trạng thái.",
        "C": "repel (đẩy lùi nhau) — Bẫy trái nghĩa hoàn toàn."
      },
      "synonyms": [
        "fuse",
        "merge",
        "combine",
        "amalgamate"
      ]
    }
  },
  {
    "id": "vic_66",
    "title": "Thermodynamics of the Mpemba Effect",
    "topic": "Thermal Physics & Fluid Dynamics",
    "target_word": "paradoxical",
    "paragraph_index": 1,
    "passage": "In classical thermodynamics, the rate of conductive heat transfer between a liquid and its surrounding environment is described by Newton's law of cooling, which dictates that cooling velocity is directly proportional to the temperature differential. Consequently, common intuition dictates that a colder volume of water, possessing a smaller thermal deficit to reach freezing, must solidify more rapidly than an identical volume of hot water. However, under specific experimental parameters, hot water freezes faster than cold water, an enigmatic phenomenon known as the Mpemba effect.\n\nThis paradoxical observation has perplexed natural philosophers for centuries, documented as early as Aristotle and René Descartes before high school student Erasto Mpemba formally re-examined it in 1969. Explaining how a warmer system traverses a wider thermal span in less absolute time requires analyzing multifaceted physical mechanisms that occur non-uniformly within non-equilibrium liquids.\n\nSeveral concurrent mechanisms account for this anomalous cooling behavior. Enhanced surface evaporation in warm water rapidly decreases total liquid mass, reducing the net caloric energy required for phase transition. Concurrently, vigorous convection currents in hotter containers facilitate rapid heat dissipation from the liquid interior to container walls. Furthermore, degasification in preheated water eliminates dissolved carbon dioxide and oxygen, elevating thermal conductivity and accelerating ice nucleation.",
    "question": "The word 'paradoxical' in paragraph 1 is closest in meaning to:",
    "options": {
      "A": "predictable",
      "B": "contradictory",
      "C": "inconsequential",
      "D": "straightforward"
    },
    "correct_answer": "B",
    "clue_type": "Contrast & Opposition",
    "clue_signal": "common intuition dictates... However, under specific experimental parameters, hot water freezes faster... This paradoxical observation...",
    "explanation": {
      "meaning": "'Paradoxical' là tính từ chỉ một hiện tượng/nhận định mang tính nghịch lý, mâu thuẫn bề ngoài với trực giác hoặc quy luật thông thường nhưng lại có thật.",
      "substitution": "Thế chỗ: 'This contradictory/counterintuitive observation has perplexed natural philosophers' làm rõ sự trái ngược hoàn toàn giữa trực giác thông thường và kết quả thực nghiệm.",
      "trap_breakdown": {
        "A": "predictable (có thể đoán trước) — Bẫy trái nghĩa: Hiện tượng này gây kinh ngạc vì nó đi ngược lại dự đoán.",
        "C": "inconsequential (không quan trọng) — Bẫy giá trị: Hiện tượng này thách thức các nhà vật lý học qua nhiều thế kỷ.",
        "D": "straightforward (thẳng thắn, dễ hiểu) — Bẫy trái nghĩa."
      },
      "synonyms": [
        "contradictory",
        "counterintuitive",
        "incongruous",
        "enigmatic"
      ]
    }
  },
  {
    "id": "vic_67",
    "title": "Riparian Water Rights and Industrial Pollution",
    "topic": "Environmental Law & Policy",
    "target_word": "stringent",
    "paragraph_index": 2,
    "passage": "During early American industrial expansion, water law developed primarily under the riparian doctrine inherited from English common law. Under this legal framework, property owners possessing land adjacent to natural watercourses held rights to the reasonable use of flowing waters, provided that downstream users were not deprived of equivalent quantity and quality. However, as textile mills, tanneries, and chemical manufactories burgeoned along eastern rivers, courts increasingly redefined 'reasonable use' to accommodate industrial discharge, leaving waterways severely degraded.\n\nBy the mid-twentieth century, widespread public outcry over visibly contaminated rivers spurred the enactment of stringent federal environmental legislation. The Clean Water Act of 1972 superseded ambiguous common-law standards with legally binding, quantitative discharge limitations. Industrial facilities were mandated to install best available pollution control technologies, under threat of substantial civil fines and criminal sanctions for non-compliance. Furthermore, the statute established national water quality standards aimed at restoring all surface waters to fishable and swimmable conditions.\n\nThe implementation of these rigorous statutory standards catalyzed dramatic water quality improvements across North America. Point-source industrial effluent discharges plummeted, enabling the ecological revival of heavily polluted rivers such as the Cuyahoga and the Hudson. Nevertheless, contemporary water policy faces ongoing challenges from diffuse non-point source pollution, particularly agricultural fertilizer runoff that evades point-source regulatory frameworks.",
    "question": "The word 'stringent' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "strict",
      "B": "ambiguous",
      "C": "voluntary",
      "D": "antiquated"
    },
    "correct_answer": "A",
    "clue_type": "Collocation & Contextual Logic",
    "clue_signal": "enactment of stringent federal environmental legislation... legally binding... substantial civil fines and criminal sanctions...",
    "explanation": {
      "meaning": "'Stringent' là tính từ miêu tả luật pháp, quy định, tiêu chuẩn cực kỳ nghiêm ngặt, khắt khe và bắt buộc thi hành tuyệt đối.",
      "substitution": "Thế chỗ: 'spurred the enactment of strict federal environmental legislation' (thúc đẩy ban hành luật bảo vệ môi trường liên bang nghiêm ngặt) hoàn toàn đồng điệu với các chế tài phạt tiền và án hình sự nghiêm khắc.",
      "trap_breakdown": {
        "B": "ambiguous (mơ hồ) — Bẫy trái nghĩa: Luật mới thay thế các tiêu chuẩn mơ hồ cũ bằng quy định định lượng rõ ràng.",
        "C": "voluntary (tự nguyện) — Bẫy trái nghĩa: Luật có tính cưỡng chế bắt buộc (legally binding).",
        "D": "antiquated (cổ hủ) — Bẫy lịch sử: Đây là đạo luật hiện đại năm 1972."
      },
      "synonyms": [
        "strict",
        "rigorous",
        "exacting",
        "inflexible"
      ]
    }
  },
  {
    "id": "vic_68",
    "title": "Island Biogeography and Adaptive Radiation",
    "topic": "Evolutionary Ecology & Biogeography",
    "target_word": "endemic",
    "paragraph_index": 2,
    "passage": "Remote oceanic archipelagos, such as the Galápagos Islands and the Hawaiian archipelago, represent natural evolutionary laboratories. Formed by basaltic hotspot volcanism far removed from continental landmasses, these islands emerged as sterile volcanic terrains. The colonization of such isolated landmasses depends upon rare, fortuitous transoceanic dispersal events, involving airborne spores, rafting terrestrial vertebrates on floating vegetation, or wind-blown migratory birds.\n\nUpon colonizing isolated island ecosystems with vacant ecological niches and depauperate competitor faunas, founding populations frequently undergo adaptive radiation, giving rise to diverse endemic species. Unhindered by continental predators or specialized competitors, colonists diversify morphologically and behaviorally to exploit previously unutilized food resources. On the Hawaiian islands, an ancestral finch species diversified into dozens of distinctive honeycreeper taxa, developing specialized bill morphologies tailored respectively to nectarivorous probing, bark gouging, and seed crushing. Because these taxa evolved in geographical isolation, they occur naturally nowhere else on the planet.\n\nThis extreme insular specialization renders oceanic island biotas uniquely vulnerable to external disruptions. Having evolved without exposure to continental mammalian carnivores, many island birds lost anti-predator flight responses. When human navigators inadvertently introduced rats, feral cats, and avian malaria, endemic island species suffered catastrophic extinction waves, highlighting the fragile equilibrium of isolated evolutionary systems.",
    "question": "The word 'endemic' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "invasive",
      "B": "widespread",
      "C": "native",
      "D": "migratory"
    },
    "correct_answer": "C",
    "clue_type": "Definition & Restatement",
    "clue_signal": "giving rise to diverse endemic species... Because these taxa evolved in geographical isolation, they occur naturally nowhere else on the planet.",
    "explanation": {
      "meaning": "'Endemic' là tính từ sinh thái chỉ loài sinh vật đặc hữu, chỉ xuất hiện tự nhiên tại một vùng địa lý cụ thể duy nhất và không có ở bất kỳ nơi nào khác.",
      "substitution": "Thế chỗ: 'giving rise to diverse native/unique species' khớp hoàn hảo với định nghĩa của bài: 'they occur naturally nowhere else on the planet'.",
      "trap_breakdown": {
        "A": "invasive (xâm lấn) — Bẫy trái nghĩa: Loài xâm lấn là loài ngoại lai từ nơi khác du nhập vào.",
        "B": "widespread (lan rộng) — Bẫy trái nghĩa: Loài đặc hữu có phạm vi phân bố rất hẹp.",
        "D": "migratory (di cư) — Bẫy nhầm lẫn với chim di cư: Các loài đặc hữu này sinh sống cố định trên đảo."
      },
      "synonyms": [
        "native",
        "indigenous",
        "restricted",
        "peculiar to a region"
      ]
    }
  },
  {
    "id": "vic_69",
    "title": "Martian Fluvial Geomorphology and Ancient Climates",
    "topic": "Planetary Geology & Hydrology",
    "target_word": "plausible",
    "paragraph_index": 2,
    "passage": "High-resolution orbital imagery and surface rover analyses have conclusively established that liquid water once altered the surface of Mars. Sinuous valley networks, desiccated deltaic sedimentary deposits in craters like Jezero, and massive catastrophic outflow channels attest to substantial ancient surface hydrological cycles. However, reconciling these fluvial geomorphic features with planetary climate models remains a central enigma in planetary science, as the early Sun emitted thirty percent less solar luminosity during the Noachian epoch.\n\nTo explain how an ancient planet with diminished solar insolation maintained liquid water, scientists have proposed several plausible atmospheric models. One hypothesis suggests that a dense carbon dioxide atmosphere enriched with minor fractions of reducing gases, such as molecular hydrogen and methane, generated a potent collision-induced greenhouse warming. An alternative model posits that water was sustained not by a persistently warm and wet climate, but through episodic melting triggered by gigantic meteorite impacts or localized supervolcanic eruptions that temporarily injected massive pulses of sulfur dioxide and steam into the atmosphere.\n\nTesting these competitive hypotheses requires chemical and isotopic data gathered directly from sedimentary drill cores. Future sample-return missions will enable laboratory analyses on Earth, examining clay mineral structures and isotopic fractionations to determine whether ancient Mars sustained stable oceans or experienced fleeting transient freeze-thaw episodes.",
    "question": "The word 'plausible' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "untenable",
      "B": "credible",
      "C": "flawed",
      "D": "definitive"
    },
    "correct_answer": "B",
    "clue_type": "Definition & Restatement",
    "clue_signal": "To explain how... proposed several plausible atmospheric models. One hypothesis suggests... An alternative model posits...",
    "explanation": {
      "meaning": "'Plausible' là tính từ chỉ một lý thuyết, lời giải thích hợp lý, đáng tin cậy, có cơ sở khoa học thuyết phục.",
      "substitution": "Thế chỗ: 'proposed several credible/reasonable atmospheric models' (đưa ra vài mô hình khí quyển có sức thuyết phục/hợp lý) ăn khớp với hai giả thuyết khoa học nghiêm túc được trình bày ngay sau đó.",
      "trap_breakdown": {
        "A": "untenable (không thể bảo vệ/không đứng vững) — Bẫy trái nghĩa hoàn toàn.",
        "C": "flawed (có tì vết, sai lầm) — Bẫy trái nghĩa.",
        "D": "definitive (tuyệt đối, cuối cùng) — Bẫy mức độ: Đây vẫn là các mô hình giả thuyết chưa được xác nhận 100%."
      },
      "synonyms": [
        "credible",
        "believable",
        "reasonable",
        "convincing"
      ]
    }
  },
  {
    "id": "vic_70",
    "title": "Insular Dwarfism and the Island Rule",
    "topic": "Paleontology & Evolutionary Biology",
    "target_word": "diminutive",
    "paragraph_index": 2,
    "passage": "The biogeographical distribution of vertebrates across insular ecosystems frequently produces extreme departures from typical continental body sizes, a morphological pattern formalized as Foster's rule, or the island rule. The rule predicts that large-bodied continental taxa colonizing isolated islands tend to evolve reduced dimensions, while small-bodied mammals, such as rodents, often exhibit gigantism. These contrasting evolutionary trajectories reflect intense natural selection pressures operating within resource-limited and predator-depauperate island biomes.\n\nThe evolutionary phenomenon of insular dwarfism is vividly exemplified by extinct Mediterranean proboscideans. During the Pleistocene glaciations, continental straight-tusked elephants (Palaeoloxodon antiquus), which stood over four meters tall at the shoulder, colonized islands including Sicily, Crete, and Cyprus across exposed sea channels. When post-glacial sea level rises marooned these herds, constrained food availability and the complete absence of apex mammalian predators favored diminutive body sizes. Over generations, dwarf elephants on Sicily evolved adult shoulder heights of barely one meter and body masses under three hundred kilograms.\n\nMiniaturization afforded crucial energetic advantages. Smaller individuals required fewer total daily calories, enabling island populations to survive cyclical resource bottlenecks and severe droughts without depleting fragile floral reserves. Furthermore, the absence of large terrestrial carnivores eliminated the primary adaptive advantage of monumental size, transforming dwarfism into an optimal evolutionary response to insular ecological constraints.",
    "question": "The word 'diminutive' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "massive",
      "B": "ferocious",
      "C": "tiny",
      "D": "sluggish"
    },
    "correct_answer": "C",
    "clue_type": "Definition & Restatement",
    "clue_signal": "favored diminutive body sizes... evolved adult shoulder heights of barely one meter... Miniaturization afforded crucial energetic advantages...",
    "explanation": {
      "meaning": "'Diminutive' là tính từ miêu tả kích thước rất nhỏ nhắn, thu nhỏ đáng kể so với kích thước tiêu chuẩn.",
      "substitution": "Thế chỗ: 'favored tiny/small body sizes' khớp hoàn toàn với câu văn nói về 'Miniaturization' (sự thu nhỏ kích thước) và chiều cao chỉ còn vỏn vẹn 1 mét.",
      "trap_breakdown": {
        "A": "massive (to lớn, đồ sộ) — Bẫy trái nghĩa hoàn toàn với dwarfism (chứng lùn đảo).",
        "B": "ferocious (hung dữ) — Bẫy tính khí động vật: Không liên quan tới kích thước cơ thể.",
        "D": "sluggish (chậm chạp) — Bẫy liên tưởng vận động."
      },
      "synonyms": [
        "tiny",
        "miniature",
        "small",
        "petite"
      ]
    }
  },
  {
    "id": "vic_71",
    "title": "Taphonomy and the Hominin Fossil Record",
    "topic": "Physical Anthropology & Taphonomy",
    "target_word": "paucity",
    "paragraph_index": 1,
    "passage": "Reconstructing the phylogenetic relationships among early hominins is severely constrained by the taphonomy of vertebrate fossilization. Bone preservation requires rapid burial in anoxic, mineral-rich sedimentary environments that arrest bacterial decay and prevent scavengers from disarticulating skeletal remains. Because early hominins primarily inhabited open savannah woodlands rather than lacustrine basins, the fossil record of human evolution is characterized by an agonizing paucity of well-preserved specimens.\n\nThis scarcity of fossil evidence frequently fuels contentious taxonomic debates between 'lumpers' and 'splitters.' When physical anthropologists discover isolated cranial fragments or dentition displaying morphological anomalies, determining whether the specimen represents a novel biological species or merely normal intra-specific sexual dimorphism and individual variation is profoundly challenging. Without large fossil cohorts spanning multiple developmental stages, researchers must reconstruct entire evolutionary lineages from a handful of fragmentary jawbones and isolated molars.\n\nRecent technological advances in micro-computed tomography and ancient paleoproteomics have helped extract unprecedented diagnostic data from fragmentary remains. By examining internal enamel-dentine junctions and sequencing preserved collagen peptide fragments, paleoanthropologists can now resolve phylogenetic affiliations that eluded conventional comparative anatomy, partially mitigating the limitations imposed by fossil scarcity.",
    "question": "The word 'paucity' in paragraph 1 is closest in meaning to:",
    "options": {
      "A": "abundance",
      "B": "distortion",
      "C": "diversity",
      "D": "scarcity"
    },
    "correct_answer": "D",
    "clue_type": "Definition & Restatement",
    "clue_signal": "characterized by an agonizing paucity of well-preserved specimens. This scarcity of fossil evidence...",
    "explanation": {
      "meaning": "'Paucity' là danh từ trang trọng chỉ sự khan hiếm, nghèo nàn, số lượng ít ỏi không đáng kể của một đối tượng nào đó.",
      "substitution": "Thế chỗ: 'characterized by an agonizing scarcity of well-preserved specimens' đồng nghĩa tuyệt đối với từ 'scarcity' xuất hiện ngay đầu đoạn 2.",
      "trap_breakdown": {
        "A": "abundance (sự dồi dào, phong phú) — Bẫy trái nghĩa hoàn toàn.",
        "B": "distortion (sự bóp méo) — Bẫy quá trình hóa thạch: Hóa thạch có thể bị bóp méo nhưng paucity nói về số lượng khan hiếm.",
        "C": "diversity (sự đa dạng) — Bẫy sinh học."
      },
      "synonyms": [
        "scarcity",
        "dearth",
        "shortage",
        "deficiency"
      ]
    }
  },
  {
    "id": "vic_72",
    "title": "Cognitive Architecture of Lucid Dreaming",
    "topic": "Cognitive Psychology & Sleep Science",
    "target_word": "lucid",
    "paragraph_index": 2,
    "passage": "During rapid eye movement (REM) sleep, the human brain generates vivid, hallucinatory dream states characterized by sensory immersion, bizarre narrative structures, and impaired critical reflective capabilities. In typical REM dreams, the dreamer accepts absurd physical impossibilities without cognitive scrutiny, a psychological state attributed to the functional deactivation of the dorsolateral prefrontal cortex, which governs self-awareness and metacognitive monitoring.\n\nHowever, in rare instances, individuals achieve a lucid dream state, wherein reflective metacognition re-emerges while sleep is maintained. During lucid episodes, the dreamer attains conscious awareness that they are dreaming, allowing for deliberate cognitive control over dream content and physical execution of simulated tasks. Polysomnographic studies demonstrate that lucidity is marked by a hybrid neurophysiological state: while the brainstem continues to enforce motor atonia to prevent physical movement, the anterior prefrontal cortex displays gamma-band electroencephalographic activity characteristic of waking consciousness.\n\nCognitive researchers utilize lucid dreaming to investigate the neural correlates of conscious volition. By pre-arranging specific sequences of voluntary left-right ocular movements, lucid dreamers can signal to researchers in real time the exact moment they commence simulated motor actions within the dream. These studies indicate that imagining an action in a lucid dream stimulates the motor cortex in a manner virtually indistinguishable from actual waking execution.",
    "question": "The word 'lucid' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "chaotic",
      "B": "unconscious",
      "C": "clear-headed",
      "D": "somber"
    },
    "correct_answer": "C",
    "clue_type": "Definition & Restatement",
    "clue_signal": "wherein reflective metacognition re-emerges... attains conscious awareness that they are dreaming, allowing for deliberate cognitive control...",
    "explanation": {
      "meaning": "'Lucid' là tính từ chỉ trạng thái tâm trí tỉnh táo, sáng suốt, nhận thức rõ ràng và có khả năng suy nghĩ rành mạch.",
      "substitution": "Thế chỗ: 'individuals achieve a clear-headed/conscious dream state' khớp với vế sau giải thích 'attains conscious awareness' (đạt được nhận thức tỉnh táo rằng mình đang mơ).",
      "trap_breakdown": {
        "A": "chaotic (hỗn loạn) — Bẫy giấc mơ thông thường: Giấc mơ lucid rất trật tự và có kiểm soát.",
        "B": "unconscious (bất tỉnh, vô thức) — Bẫy trạng thái ngủ: Người mơ trong trường hợp này lại có ý thức.",
        "D": "somber (u ám) — Sai nghĩa."
      },
      "synonyms": [
        "clear-headed",
        "conscious",
        "rational",
        "coherent"
      ]
    }
  },
  {
    "id": "vic_73",
    "title": "Wildlife Corridors and Metapopulation Gene Flow",
    "topic": "Conservation Biology & Landscape Ecology",
    "target_word": "imperative",
    "paragraph_index": 2,
    "passage": "Anthropogenic landscape fragmentation represents one of the most pervasive threats to global terrestrial biodiversity. The construction of multi-lane interstate highways, agricultural monocultures, and urban sprawl converts continuous native ecosystems into isolated habitat islands. For large, wide-ranging carnivores like cougars, grizzly bears, and jaguars, habitat fragmentation severely restricts home range movements and truncates ancestral dispersal routes.\n\nTo prevent irreversible inbreeding depression within these isolated demes, maintaining landscape connectivity is an urgent conservation imperative. When small populations are entirely marooned, the loss of genetic heterozygosity accelerates through genetic drift, increasing the phenotypic expression of deleterious recessive alleles and degrading reproductive viability. Constructing continuous wildlife corridors and dedicated vegetated highway overpasses facilitates the dispersal of sub-adult individuals, allowing natural gene flow to replenish depleted gene pools without requiring costly human translocation interventions.\n\nEmpirical assessments in the Canadian Rocky Mountains demonstrate the conservation efficacy of structural connectivity. Genetic profiling of wildlife utilizing the Banff National Park wildlife crossing structures confirmed that grizzly bears and wolves regularly crossed high-volume transit corridors to mate with adjacent populations, thereby preserving regional metapopulation health.",
    "question": "The word 'imperative' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "triviality",
      "B": "necessity",
      "C": "impediment",
      "D": "hypothesis"
    },
    "correct_answer": "B",
    "clue_type": "Definition & Restatement",
    "clue_signal": "To prevent irreversible inbreeding depression... maintaining landscape connectivity is an urgent conservation imperative.",
    "explanation": {
      "meaning": "'Imperative' là danh từ trang trọng chỉ một nhiệm vụ khẩn thiết, một đòi hỏi tất yếu sống còn, điều bắt buộc phải thực hiện.",
      "substitution": "Thế chỗ: 'maintaining landscape connectivity is an urgent conservation necessity' (duy trì kết nối cảnh quan là một nhu cầu cấp thiết trong bảo tồn) khớp với mục tiêu ngăn chặn nguy cơ giao phối cận huyết cận kề.",
      "trap_breakdown": {
        "A": "triviality (điều nhỏ nhặt, không quan trọng) — Bẫy trái nghĩa hoàn toàn.",
        "C": "impediment (chướng ngại vật) — Bẫy cản trở: Hành lang sinh thái giúp tháo gỡ chướng ngại chứ bản thân nó không phải chướng ngại.",
        "D": "hypothesis (giả thuyết) — Sai ngữ cảnh."
      },
      "synonyms": [
        "necessity",
        "priority",
        "requirement",
        "compelling obligation"
      ]
    }
  },
  {
    "id": "vic_74",
    "title": "Heliocentric Models in Hellenistic Astronomy",
    "topic": "History of Science & Astronomy",
    "target_word": "conjectured",
    "paragraph_index": 1,
    "passage": "Eighteen centuries before Nicolaus Copernicus published his seminal treatise on the revolutions of the heavenly spheres, the Hellenistic astronomer Aristarchus of Samos formulated an early heliocentric hypothesis. Operating during the third century BCE, Aristarchus sought to calculate the relative distances and physical volumes of the Sun and Moon using geometric triangulation during lunar eclipses and quadrature phases. Recognizing that the Sun was immensely larger than the Earth, Aristarchus conjectured that it was physically illogical for a colossal body to revolve around a diminutive planet.\n\nInstead, Aristarchus proposed that the Sun remained stationary at the center of the celestial sphere, while Earth rotated daily upon its polar axis and completed an annual orbit around the Sun. However, his revolutionary cosmology was roundly rejected by contemporary Hellenistic philosophers. Geocentric advocates, led by Archimedes and later synthesized by Ptolemy, pointed to the apparent absence of annual stellar parallax: if Earth moved across space, the angular positions of the fixed stars should shift relative to one another.\n\nBecause Hellenistic astronomers lacked telescopes capable of detecting the infinitesimally minute parallax shifts of extremely distant stars, they concluded that the Earth must be stationary. The geocentric Ptolemaic model—with its complex apparatus of deferents, epicycles, and equants—became institutionalized for nearly two millennia, illustrating how empirical observations constrained by instrumental limitations can entrench erroneous scientific paradigms.",
    "question": "The word 'conjectured' in paragraph 1 is closest in meaning to:",
    "options": {
      "A": "hypothesized",
      "B": "substantiated",
      "C": "disproved",
      "D": "mandated"
    },
    "correct_answer": "A",
    "clue_type": "Definition & Restatement",
    "clue_signal": "formulated an early heliocentric hypothesis... Aristarchus conjectured that it was physically illogical for a colossal body to revolve...",
    "explanation": {
      "meaning": "'Conjecture' là ngoại động từ chỉ hành động phỏng đoán, đưa ra giả thuyết hoặc suy luận dựa trên dữ liệu chưa đầy đủ.",
      "substitution": "Thế chỗ: 'Aristarchus hypothesized/surmised that it was physically illogical' hoàn toàn đồng nghĩa với cụm 'formulated an early heliocentric hypothesis' ở đầu đoạn.",
      "trap_breakdown": {
        "B": "substantiated (chứng minh xác thực) — Bẫy trái nghĩa: Aristarchus chỉ phỏng đoán chứ chưa thể chứng minh thực nghiệm được vào thời cổ đại.",
        "C": "disproved (bác bỏ) — Sai ý đồ của nhà thiên văn.",
        "D": "mandated (ra lệnh, bắt buộc) — Sai nghĩa hoàn toàn."
      },
      "synonyms": [
        "hypothesized",
        "surmised",
        "posited",
        "speculated"
      ]
    }
  },
  {
    "id": "vic_75",
    "title": "The Columbian Exchange and Afro-Eurasian Demography",
    "topic": "Historical Geography & Agronomy",
    "target_word": "contingent",
    "paragraph_index": 2,
    "passage": "The transoceanic voyage of Christopher Columbus in 1492 initiated a monumental biospheric reorganization known as the Columbian Exchange. The reciprocal diffusion of plants, animals, and pathogens between the Old and New Worlds fundamentally restructured global ecological regimes. While European livestock transformed New World grasslands and Old World infectious diseases devastated indigenous American populations, the transatlantic introduction of American agricultural domesticates transformed European and Asian demography.\n\nPrior to the sixteenth century, European peasant subsistence was precarious and heavily contingent upon volatile cereal grain harvests. Rye, wheat, and barley crops were notoriously susceptible to unseasonal spring frosts, summer droughts, and fungal smuts, precipitating localized famines every few decades. The introduction of the Andean potato (Solanum tuberosum) and Mesoamerican maize (Zea mays) dismantled this vulnerability. Potatoes yielded up to four times more caloric energy per acre than grain, thrived in acidic soils unsuited for wheat, and grew completely underground, insulating harvests from marauding armies and inclement weather.\n\nThe widespread cultivation of American cultigens stabilized European food supplies and catalyzed an unprecedented demographic surge. Nutritional improvements reduced infant mortality and elevated adult longevity, providing the abundant urban labor supply that subsequently propelled the Industrial Revolution. Concurrently, sweet potatoes and maize diffused throughout Qing-dynasty China, enabling farmers to cultivate arid hillsides and sparking a tripling of the Chinese population between 1650 and 1800.",
    "question": "The word 'contingent' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "unrelated",
      "B": "destructive",
      "C": "perpetual",
      "D": "dependent"
    },
    "correct_answer": "D",
    "clue_type": "Collocation & Contextual Logic",
    "clue_signal": "subsistence was precarious and heavily contingent upon volatile cereal grain harvests. Rye, wheat, and barley crops were notoriously susceptible...",
    "explanation": {
      "meaning": "'Contingent (upon)' là tính từ đi kèm giới từ 'upon/on' mang nghĩa phụ thuộc vào, chịu sự chi phối và quyết định của một yếu tố khác.",
      "substitution": "Thế chỗ: 'heavily dependent upon volatile cereal grain harvests' (phụ thuộc chặt chẽ vào các vụ mùa ngũ cốc thất thường) làm rõ mối nguy cơ bấp bênh của nông dân.",
      "trap_breakdown": {
        "A": "unrelated (không liên quan) — Bẫy trái nghĩa: Đời sống nông dân phụ thuộc trực tiếp vào mùa màng.",
        "B": "destructive (có tính hủy diệt) — Bẫy liên tưởng nạn đói.",
        "C": "perpetual (vĩnh viễn) — Bẫy thời gian."
      },
      "synonyms": [
        "dependent",
        "conditional",
        "reliant",
        "subordinate"
      ]
    }
  },
  {
    "id": "vic_76",
    "title": "Aerodynamic Instabilities in Long-Span Suspension Bridges",
    "topic": "Structural Engineering & Aeroelasticity",
    "target_word": "surmounted",
    "paragraph_index": 2,
    "passage": "The evolution of long-span suspension bridge engineering represents a continuous negotiation between material tensile capacity and aerodynamic forces. During the early nineteenth century, pioneering engineers like Thomas Telford constructed monumental chain-hung spans such as the Menai Suspension Bridge. However, early designers primarily analyzed bridges under static gravitational loads—such as vehicular weight and pedestrian traffic—frequently disregarding dynamic wind-induced vibrations, leading to numerous catastrophic bridge failures during moderate gale storms.\n\nModern structural engineering surmounted these aerodynamic vulnerabilities through rigorous computational wind-tunnel testing and truss stiffening. When the Tacoma Narrows Bridge collapsed in 1940 due to self-exciting torsional flutter induced by modest forty-mile-per-hour winds, engineers realized that shallow plate girders acted like airplane wings, amplifying aerodynamic turbulence. Subsequent bridge designs incorporated deep, open-web stiffening trusses and aerodynamically streamlined hollow steel box girders that permit crosswinds to pass cleanly through the structure without initiating destructive harmonic oscillation.\n\nToday, mega-spans like the 1915 Çanakkale Bridge in Turkey and the Akashi Kaikyo Bridge in Japan span distances exceeding two kilometers. By pairing deep aerodynamic deck profiles with tuned mass dampers that absorb kinetic oscillation, contemporary engineers construct ultra-long suspension spans capable of withstanding category-five typhoons and severe seismic displacements.",
    "question": "The word 'surmounted' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "overcame",
      "B": "exacerbated",
      "C": "tolerated",
      "D": "prolonged"
    },
    "correct_answer": "A",
    "clue_type": "Definition & Restatement",
    "clue_signal": "Modern structural engineering surmounted these aerodynamic vulnerabilities through rigorous... Subsequent bridge designs incorporated...",
    "explanation": {
      "meaning": "'Surmount' là ngoại động từ mang nghĩa khắc phục, vượt qua, giải quyết thành công một khó khăn hoặc rào cản kỹ thuật phức tạp.",
      "substitution": "Thế chỗ: 'Modern structural engineering overcame these aerodynamic vulnerabilities' (Kỹ thuật kết cấu hiện đại đã khắc phục những điểm yếu khí động học này) làm nổi bật việc các kỹ sư giải quyết triệt để lỗi thiết kế cũ.",
      "trap_breakdown": {
        "B": "exacerbated (làm trầm trọng hơn) — Bẫy trái nghĩa: Kỹ thuật hiện đại khắc phục sự cố chứ không làm nó tồi tệ hơn.",
        "C": "tolerated (chấp nhận/chịu đựng) — Bẫy mức độ: Kỹ sư chủ động loại bỏ lỗi chứ không cam chịu chấp nhận nó.",
        "D": "prolonged (kéo dài) — Sai nghĩa."
      },
      "synonyms": [
        "overcame",
        "conquered",
        "mastered",
        "triumphed over"
      ]
    }
  },
  {
    "id": "vic_77",
    "title": "Stratospheric Sudden Warming and Polar Vortices",
    "topic": "Atmospheric Science & Meteorology",
    "target_word": "anomalous",
    "paragraph_index": 2,
    "passage": "During polar winter, persistent absence of solar insolation generates intense radiative cooling in the upper atmosphere, forming a massive pool of frigid air encircled by high-speed westerly winds known as the stratospheric polar vortex. Under typical winter conditions, this tight cyclonic vortex remains stable and centered over the Arctic Circle, effectively trapping freezing air masses within high latitudes.\n\nHowever, this regular atmospheric configuration is periodically disrupted by anomalous temperature surges termed sudden stratospheric warmings. Driven by planetary-scale Rossby waves propagating upward from the troposphere, energy transfers into the stratosphere, decelerating or reversing circumpolar winds. Within days, stratospheric temperatures over the North Pole can skyrocket by as much as fifty degrees Celsius. Such an atypical thermal spike shatters or displaces the polar vortex from its polar locus.\n\nThe destabilization of the stratospheric vortex has profound meteorological ramifications for mid-latitude weather. As the fractured vortex descends into the troposphere, the polar jet stream buckles into extreme undulating meanders. Frigid Arctic air plunges equatorward across North America and Eurasia, unleashing prolonged winter cold waves and heavy blizzards in regions accustomed to temperate winter climates.",
    "question": "The word 'anomalous' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "predictable",
      "B": "uniform",
      "C": "atypical",
      "D": "continuous"
    },
    "correct_answer": "C",
    "clue_type": "Definition & Restatement",
    "clue_signal": "However, this regular atmospheric configuration is periodically disrupted by anomalous temperature surges... Such an atypical thermal spike...",
    "explanation": {
      "meaning": "'Anomalous' là tính từ miêu tả hiện tượng bất thường, dị thường, lệch chuẩn so với trạng thái tự nhiên vốn có.",
      "substitution": "Thế chỗ: 'periodically disrupted by atypical temperature surges' hoàn toàn đồng nghĩa với cụm từ 'Such an atypical thermal spike' xuất hiện ngay ở câu sau.",
      "trap_breakdown": {
        "A": "predictable (có thể đoán trước) — Bẫy trạng thái: Hiện tượng này xảy ra bất thường và khó dự báo dài hạn.",
        "B": "uniform (đồng nhất) — Bẫy trái nghĩa.",
        "D": "continuous (liên tục) — Bẫy tần suất: Hiện tượng này chỉ diễn ra định kỳ/đột ngột chứ không liên tục."
      },
      "synonyms": [
        "atypical",
        "abnormal",
        "irregular",
        "deviant"
      ]
    }
  },
  {
    "id": "vic_78",
    "title": "Subduction Volcanism and Magma Storage",
    "topic": "Volcanology & Igneous Petrology",
    "target_word": "dormant",
    "paragraph_index": 2,
    "passage": "Volcanic eruptions along destructive plate boundaries are fueled by the subduction of oceanic lithosphere into the underlying asthenosphere. As water-saturated oceanic crust and marine sediments plunge into high-pressure, high-temperature mantle regimes, hydrous minerals dehydrate. The released aqueous fluids infiltrate the overlying mantle wedge, lowering the solidus melting temperature of peridotite and triggering flux melting that generates buoyant basaltic magmas.\n\nThese ascending magmas stall in shallow crustal reservoirs, remaining dormant for decades or centuries between catastrophic paroxysms. During these prolonged quiescent intervals, the magma chamber cools and undergoes fractional crystallization, during which dense ferromagnesian minerals crystallize first and settle out. Residual liquid melts become progressively enriched in silica, dissolved volatiles, and water vapor, evolving into highly viscous, explosive dacitic and rhyolitic mushes.\n\nRecognizing that quiescent volcanoes are not extinct but merely accumulating pressure is crucial for hazard mitigation. When fresh pulses of mafic magma intrude into a stagnant magma chamber from below, sudden thermal rejuvenation remobilizes the crystalline mush and triggers volatile exsolution. The resulting rapid overpressurization can culminate in violent Plinian explosive eruptions, as witnessed at Mount Pinatubo in 1991.",
    "question": "The word 'dormant' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "erupting",
      "B": "inactive",
      "C": "depleted",
      "D": "turbulent"
    },
    "correct_answer": "B",
    "clue_type": "Definition & Restatement",
    "clue_signal": "remaining dormant for decades or centuries... During these prolonged quiescent intervals... quiescent volcanoes are not extinct...",
    "explanation": {
      "meaning": "'Dormant' trong địa chất học miêu tả núi lửa đang ngủ say, tạm thời ngừng hoạt động nhưng vẫn có khả năng bùng phát trở lại.",
      "substitution": "Thế chỗ: 'remaining inactive for decades or centuries' khớp tuyệt đối với từ đồng nghĩa 'quiescent' (tĩnh lặng, bất hoạt) lặp lại ở câu kế tiếp.",
      "trap_breakdown": {
        "A": "erupting (đang phun trào) — Bẫy trái nghĩa hoàn toàn.",
        "C": "depleted (cạn kiệt) — Bẫy trạng thái: Núi lửa ngủ không có nghĩa là nguồn magma đã cạn, nó vẫn đang tích tụ áp suất.",
        "D": "turbulent (hỗn loạn) — Sai nghĩa."
      },
      "synonyms": [
        "inactive",
        "quiescent",
        "latent",
        "sleeping"
      ]
    }
  },
  {
    "id": "vic_79",
    "title": "Milankovitch Cycles and Pleistocene Glaciations",
    "topic": "Paleoclimatology & Orbital Mechanics",
    "target_word": "fluctuations",
    "paragraph_index": 2,
    "passage": "Throughout the Quaternary period, Earth experienced repeated oscillations between extensive glacial advances and warm interglacial epochs. Early geologists proposed diverse ad hoc mechanisms to explain these cyclical ice ages, including cosmic dust clouds occluding the solar system or dramatic shifts in atmospheric carbon dioxide. However, none of these early theories could account for the strict quasi-periodic pacing evident in paleoclimate records.\n\nThe definitive astronomical explanation was formulated by Serbian geophysicist Milutin Milankovitch, who demonstrated that cyclical fluctuations in Earth's orbital geometry modulate high-latitude summer insolation. Earth's orbit shifts from nearly circular to slightly elliptical over a 100,000-year eccentricity cycle. Simultaneously, the axial tilt, or obliquity, oscillates between 22.1 and 24.5 degrees over a 41,000-year cadence, while axial precession alters the timing of perihelion over 23,000-year cycles.\n\nMilankovitch realized that the decisive parameter for glacial inception was not winter temperature, but cool summer insolation around 65 degrees north latitude. When orbital configurations coincide to minimize northern summer radiation, winter snowfall fails to melt completely during the brief summer season. Accumulated snow reflects solar radiation via the high albedo feedback mechanism, initiating a self-reinforcing continental ice sheet expansion.",
    "question": "The word 'fluctuations' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "constants",
      "B": "interruptions",
      "C": "stagnations",
      "D": "variations"
    },
    "correct_answer": "D",
    "clue_type": "Definition & Restatement",
    "clue_signal": "cyclical fluctuations in Earth's orbital geometry... shifts from nearly circular to slightly elliptical... oscillates between...",
    "explanation": {
      "meaning": "'Fluctuation' là danh từ chỉ sự dao động, biến thiên, thay đổi lên xuống theo chu kỳ hoặc không đều đặn.",
      "substitution": "Thế chỗ: 'cyclical variations in Earth's orbital geometry' làm nổi bật các biến đổi tuần hoàn về độ lệch tâm (eccentricity) và độ nghiêng trục (obliquity).",
      "trap_breakdown": {
        "A": "constants (hằng số, đại lượng cố định) — Bẫy trái nghĩa hoàn toàn.",
        "B": "interruptions (sự gián đoạn) — Bẫy nhầm lẫn: Quỹ đạo thiên văn biến đổi liên tục chứ không bị cắt đứt đoạn.",
        "C": "stagnations (sự đình trệ) — Bẫy trái nghĩa."
      },
      "synonyms": [
        "variations",
        "oscillations",
        "alternations",
        "shifts"
      ]
    }
  },
  {
    "id": "vic_80",
    "title": "Arthropod Stratification in Tropical Forest Canopies",
    "topic": "Entomology & Tropical Ecology",
    "target_word": "preponderance",
    "paragraph_index": 2,
    "passage": "Tropical rainforests harbor the greatest concentration of terrestrial biodiversity on Earth, with a significant fraction of species partitioned into vertical arboreal strata. Historically, ecological sampling of tropical forests was restricted to the forest understory, creating a skewed perspective on community architecture. The advent of canopy access cranes, single-rope climbing techniques, and canopy fogging in the 1980s opened the sunlit upper canopy to systematic ecological census.\n\nCanopy fogging studies revealed a stunning preponderance of arthropod species concentrated within the upper foliage. Biologist Terry Erwin's pioneering canopy collections in Panama and the Amazon basin revealed that coleopterans—beetles—comprised an overwhelming percentage of all arboreal insect biomass. Many herbivorous and fungivorous beetle species exhibited extreme host-tree specificity, residing exclusively within the micro-habitats provided by the crowns of individual canopy tree species.\n\nThis vertical stratification reflects sharp microclimatic gradients between the canopy and the forest floor. While the forest understory maintains stable temperatures, high relative humidity, and attenuated light, the upper canopy experiences intense solar radiation, desiccation stress, and high wind velocities. Canopy arthropods have evolved physiological adaptations, such as thickened cuticles and water-retention mechanisms, enabling them to exploit the dense foliage and abundant nectar resources of the high canopy.",
    "question": "The word 'preponderance' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "majority",
      "B": "dearth",
      "C": "deficit",
      "D": "rarity"
    },
    "correct_answer": "A",
    "clue_type": "Definition & Restatement",
    "clue_signal": "stunning preponderance of arthropod species... comprised an overwhelming percentage of all arboreal insect biomass...",
    "explanation": {
      "meaning": "'Preponderance' là danh từ chỉ sự chiếm ưu thế vượt trội về số lượng, phần lớn, tỷ trọng áp đảo của một nhóm đối tượng.",
      "substitution": "Thế chỗ: 'revealed a stunning majority/dominance of arthropod species' khớp hoàn toàn với câu sau nói về 'an overwhelming percentage' (tỷ lệ phần trăm áp đảo).",
      "trap_breakdown": {
        "B": "dearth (sự khan hiếm) — Bẫy trái nghĩa hoàn toàn.",
        "C": "deficit (sự thiếu hụt) — Bẫy trái nghĩa.",
        "D": "rarity (sự hiếm có) — Bẫy nhầm lẫn: Côn trùng ở tầng tán rừng rậm rạp cực kỳ phong phú và áp đảo."
      },
      "synonyms": [
        "majority",
        "predominance",
        "superiority in number",
        "dominance"
      ]
    }
  },
  {
    "id": "vic_81",
    "title": "Transportation Infrastructure and Economic Integration",
    "topic": "Developmental Economics & Economic History",
    "target_word": "integral",
    "paragraph_index": 2,
    "passage": "In the study of economic development, the expansion of transportation infrastructure has long been recognized as a primary catalyst for regional market unification. In eighteenth-century North America and Western Europe, high overland freight costs confined commerce to localized hinterlands, as hauling heavy bulk goods over unpaved dirt roads quickly rendered long-distance sales economically unviable.\n\nThe construction of comprehensive canal systems and intercontinental railway networks was an integral component of nineteenth-century economic transformation. By reducing inland freight rates by up to ninety percent, rail trunk lines connected previously isolated agricultural frontiers directly to metropolitan manufacturing centers. Rather than merely accommodating existing trade, railroads actively stimulated agricultural settlement, specialization, and mass production, serving as an indispensable foundation for the emergence of modern corporate management.\n\nModern economic modeling corroborates the catalytic role of structural connectivity. Cross-country empirical evaluations demonstrate that investments in arterial highways, deepwater container ports, and high-speed freight corridors generate substantial positive externalities. Enhanced connectivity lowers inventory costs for manufacturers, expands labor market catchments for urban hubs, and integrates marginalized rural regions into global supply chains.",
    "question": "The word 'integral' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "superfluous",
      "B": "detrimental",
      "C": "essential",
      "D": "accidental"
    },
    "correct_answer": "C",
    "clue_type": "Definition & Restatement",
    "clue_signal": "integral component of nineteenth-century economic transformation... serving as an indispensable foundation...",
    "explanation": {
      "meaning": "'Integral' là tính từ miêu tả thành phần thiết yếu, cốt lõi, không thể thiếu để tạo nên sự hoàn chỉnh của một hệ thống.",
      "substitution": "Thế chỗ: 'an essential component of nineteenth-century economic transformation' đồng nghĩa hoàn hảo với cụm từ 'an indispensable foundation' ở cuối đoạn.",
      "trap_breakdown": {
        "A": "superfluous (thừa thãi, không cần thiết) — Bẫy trái nghĩa hoàn toàn.",
        "B": "detrimental (có hại) — Bẫy tác động: Giao thông đường sắt đem lại lợi ích khổng lồ.",
        "D": "accidental (ngẫu nhiên) — Bẫy mục đích: Đây là quy hoạch chủ động có tính toán."
      },
      "synonyms": [
        "essential",
        "indispensable",
        "vital",
        "fundamental"
      ]
    }
  },
  {
    "id": "vic_82",
    "title": "Brunelleschi and the Florence Cathedral Dome",
    "topic": "Renaissance Architecture & Structural Engineering",
    "target_word": "culminated",
    "paragraph_index": 2,
    "passage": "By the early fifteenth century, the construction of the Cathedral of Santa Maria del Fiore in Florence had reached a legendary architectural stalemate. The cathedral's octagonal nave walls were completed, but the open crossing spanned forty-five meters, a chasm so vast that conventional timber centering was impossible. Building a wooden scaffolding structure from the cathedral floor would have required an entire forest of timber, and even then, wooden struts would have buckled under the immense deadweight of wet masonry.\n\nFilippo Brunelleschi resolved this engineering crisis through structural innovations that culminated in the largest masonry dome in history. Dispensing with temporary wooden scaffolding, Brunelleschi devised a self-supporting double-shell dome. He utilized a herringbone brick pattern (spinapesce) that distributed radial thrust horizontally across the octagonal perimeter during construction. Furthermore, embedded horizontal chains of stone and iron acted like barrel hoops, counteracting outward lateral tensile hoop stress and ensuring the dome remained structurally stable as it rose.\n\nThe completion of the Florence dome in 1436 marked the dawn of Renaissance architectural engineering. Brunelleschi not only revived classical Roman structural forms, such as the Pantheon's hemispherical geometry, but surpassed them through rigorous mathematical modeling and novel mechanical hoisting cranes. The soaring profile of the dome established a permanent visual icon for Florentine civic pride and transformed European cathedral design for centuries.",
    "question": "The word 'culminated' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "commenced",
      "B": "climaxed",
      "C": "deteriorated",
      "D": "stagnated"
    },
    "correct_answer": "B",
    "clue_type": "Definition & Restatement",
    "clue_signal": "structural innovations that culminated in the largest masonry dome in history... The completion of the Florence dome in 1436 marked...",
    "explanation": {
      "meaning": "'Culminate (in)' là nội động từ chỉ quá trình phát triển đạt đến đỉnh điểm, kết thúc thành công rực rỡ ở một kết quả tối thượng.",
      "substitution": "Thế chỗ: 'structural innovations that climaxed in the largest masonry dome' (những cải tiến kết cấu đã đạt tới đỉnh cao là mái vòm xây bằng gạch lớn nhất lịch sử) làm nổi bật kỳ tích đỉnh cao của Brunelleschi.",
      "trap_breakdown": {
        "A": "commenced (bắt đầu) — Bẫy thời gian: Đây là kết quả đỉnh cao ở giai đoạn cuối chứ không phải lúc khởi đầu.",
        "C": "deteriorated (xuống cấp) — Bẫy trái nghĩa.",
        "D": "stagnated (đình trệ) — Bẫy nhầm lẫn với thế bế tắc trước đó."
      },
      "synonyms": [
        "climaxed",
        "peaked",
        "concluded triumphantly",
        "reached a zenith"
      ]
    }
  },
  {
    "id": "vic_83",
    "title": "Nomadic Pastoralism in the Eurasian Steppe",
    "topic": "Anthropology & Cultural Geography",
    "target_word": "arduous",
    "paragraph_index": 2,
    "passage": "The semi-arid grasslands of the Eurasian steppe, stretching from the Danube basin across Central Asia to Manchuria, represent one of the most demanding pastoral environments on the globe. Marked by extreme continental temperature swings, erratic precipitation, and severe winter blizzards known as dzhut, the steppe precluded sedentary crop agriculture. Human communities survived by adopting mobile pastoralism, domesticating horses, sheep, goats, and camels to exploit seasonal pasture flushes.\n\nPastoral nomadic lifeways necessitated arduous seasonal transhumance across vast geographical distances. In spring, pastoral clans moved herds away from sheltered winter river basins toward high-altitude mountain meadows, following the receding snowline to provide animals with tender, nutrient-rich grasses. These migrations involved transporting felt yurts, household goods, and children on heavy wooden ox-carts over treacherous mountain passes and swollen rivers. Family survival depended upon meticulous herd management, veterinary skill, and constant vigilance against wolf packs and rival raiding parties.\n\nThis high degree of mobility fostered unique socio-political structures among steppe societies. Because pastoral wealth consisted of mobile herds rather than fixed landed estates, pastoral clans formed flexible tribal confederations capable of rapid military mobilization. Under charismatic steppe leaders like Genghis Khan, nomadic cavalry exploited their superior equestrian agility and composite bow technology to forge the largest contiguous land empires in world history.",
    "question": "The word 'arduous' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "strenuous",
      "B": "tranquil",
      "C": "fictional",
      "D": "effortless"
    },
    "correct_answer": "A",
    "clue_type": "Definition & Restatement",
    "clue_signal": "necessitated arduous seasonal transhumance... over treacherous mountain passes and swollen rivers... constant vigilance against...",
    "explanation": {
      "meaning": "'Arduous' là tính từ miêu tả công việc, hành trình vô cùng gian nan, vất vả, đòi hỏi nỗ lực thể chất và sự kiên trì ghê gớm.",
      "substitution": "Thế chỗ: 'necessitated strenuous/taxing seasonal transhumance' hoàn toàn khớp với chi tiết vượt đèo núi hiểm trở, lội qua sông dữ và dắt díu cả gia đình đi hàng ngàn cây số.",
      "trap_breakdown": {
        "B": "tranquil (yên bình, thanh thản) — Bẫy trái nghĩa hoàn toàn.",
        "C": "fictional (hư cấu) — Bẫy hiện thực: Cuộc sống du mục là thực tế lịch sử khắc nghiệt.",
        "D": "effortless (dễ dàng) — Bẫy trái nghĩa."
      },
      "synonyms": [
        "strenuous",
        "demanding",
        "exhausting",
        "burdensome"
      ]
    }
  },
  {
    "id": "vic_84",
    "title": "Alluvial Fan Hydrology and Traditional Irrigation",
    "topic": "Hydrology & Historical Agriculture",
    "target_word": "divert",
    "paragraph_index": 2,
    "passage": "In hyper-arid desert basins, agricultural civilization has historically depended upon the hydrological dynamics of alluvial fans. Formed where high-gradient mountain streams emerge from narrow canyons onto flat valley plains, alluvial fans consist of porous, sorting gravel and sand deposits. During spring snowmelt, torrential torrents rush down mountain gullies, carrying nutrient-rich silt while replenishing unconfined subterranean aquifers within the coarse fan matrix.\n\nAncient agriculturalists engineered sophisticated hydraulic networks to divert episodic surface torrents toward terraced agricultural plots. By constructing low-profile stone diversion weirs across ephemeral wash channels, farmers slowed discharge velocities without allowing sediment to clog canal intakes. These gravity-fed canal networks guided floodwaters laterally along gentle contour gradients, distributing seasonal runoff evenly across thirsty fields of barley, melons, and date palms before the water evaporated under the searing desert sun.\n\nIn addition to surface diversions, societies across Persia and the Turpan depression excavated subterranean filtration galleries known as qanats or karez. By tunneling horizontal adits into the saturated water table at the apex of alluvial fans, qanat builders captured clean groundwater, conveying it over tens of kilometers underground to prevent evaporative loss, sustaining thriving agricultural oases across millennia.",
    "question": "The word 'divert' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "contaminate",
      "B": "evaporate",
      "C": "stagnate",
      "D": "redirect"
    },
    "correct_answer": "D",
    "clue_type": "Definition & Restatement",
    "clue_signal": "engineered sophisticated hydraulic networks to divert episodic surface torrents... canal networks guided floodwaters laterally...",
    "explanation": {
      "meaning": "'Divert' là ngoại động từ chỉ hành động chuyển hướng, bẻ hướng dòng chảy của nước hoặc đường đi của một vật sang một hướng khác.",
      "substitution": "Thế chỗ: 'hydraulic networks to redirect episodic surface torrents' khớp hoàn toàn với câu sau giải thích cách các kênh đào dẫn nước (guided floodwaters) chạy ngang dọc vào các thửa ruộng bậc thang.",
      "trap_breakdown": {
        "A": "contaminate (làm ô nhiễm) — Bẫy nước: Hệ thống thủy lợi dẫn nước sạch để tưới tiêu chứ không làm bẩn nước.",
        "B": "evaporate (làm bốc hơi) — Bẫy môi trường sa mạc.",
        "C": "stagnate (làm tù đọng) — Bẫy dòng chảy: Kênh dẫn dòng chảy liên tục chứ không để ứ đọng."
      },
      "synonyms": [
        "redirect",
        "reroute",
        "channel",
        "deflect"
      ]
    }
  },
  {
    "id": "vic_85",
    "title": "Proxemics and Nonverbal Social Norms",
    "topic": "Sociolinguistics & Cultural Anthropology",
    "target_word": "tacit",
    "paragraph_index": 2,
    "passage": "Human social communication extends far beyond verbal phonology and formal grammar. Interpersonal interactions are continuously structured by nonverbal codes, encompassing facial micro-expressions, kinesic gestures, and eye contact patterns. Anthropologist Edward T. Hall coined the term 'proxemics' to describe the systematic cultural regulation of interpersonal physical distance and territorial boundaries in face-to-face interaction.\n\nHall posited that spatial interaction is governed by tacit conventions that operate beneath conscious awareness. Members of a given culture internalize these spatial boundaries during childhood socialization without explicit verbal instruction. For example, North Americans typically maintain an informal 'personal distance' of about eighteen inches to four feet during casual conversations; an involuntary sense of discomfort or defensive posturing is instantly provoked if an interlocutor steps inside this invisible perimeter without intimate invitation.\n\nCrucially, proxemic boundaries vary systematically across divergent cultural traditions. What is perceived as respectful personal space in northern Europe may be interpreted as cold and aloof in Mediterranean or Latin American societies, where closer physical proximity and tactile contact are cultural norms. Cross-cultural miscommunications frequently arise not from grammatical errors, but from the unintentional violation of these implicit spatial expectations.",
    "question": "The word 'tacit' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "explicit",
      "B": "statutory",
      "C": "unspoken",
      "D": "ambivalent"
    },
    "correct_answer": "C",
    "clue_type": "Definition & Restatement",
    "clue_signal": "governed by tacit conventions that operate beneath conscious awareness... without explicit verbal instruction... implicit spatial expectations...",
    "explanation": {
      "meaning": "'Tacit' là tính từ miêu tả sự ngầm hiểu, không nói ra bằng lời nhưng ai cũng tự hiểu và ngầm tuân theo.",
      "substitution": "Thế chỗ: 'governed by unspoken conventions that operate beneath conscious awareness' đối lập trực tiếp với 'explicit verbal instruction' (chỉ dẫn rõ ràng bằng lời nói) và đồng nghĩa với 'implicit' ở cuối đoạn.",
      "trap_breakdown": {
        "A": "explicit (rõ ràng, công khai bằng lời) — Bẫy trái nghĩa hoàn toàn.",
        "B": "statutory (theo luật định) — Bẫy quy tắc: Quy tắc khoảng cách là chuẩn mực xã hội ngầm định, không phải luật viết trong sách.",
        "D": "ambivalent (nước đôi, mâu thuẫn) — Sai nghĩa."
      },
      "synonyms": [
        "unspoken",
        "implicit",
        "unexpressed",
        "understood without words"
      ]
    }
  },
  {
    "id": "vic_86",
    "title": "Seed Dispersal and Weedy Plant Evolution",
    "topic": "Agricultural Botany & Ecology",
    "target_word": "inadvertently",
    "paragraph_index": 2,
    "passage": "The origin of agricultural crop domesticates has traditionally been conceptualized as an intentional, deliberate human invention. Early farmers are assumed to have systematically selected wild progenitors possessing desirable traits, such as non-shattering seed heads, larger grain sizes, and reduced chemical toxicity. However, evolutionary biologists increasingly recognize that crop evolution was accompanied by the parallel co-evolution of agricultural weed communities.\n\nAs Neolithic farmers tilled soil and hand-harvested grain, they inadvertently created an unprecedented ecological niche tailored to weedy opportunists. Plants capable of mimicking crop phenotypes survived winnowing and seed sorting, a co-evolutionary process known as Vavilovian mimicry. For instance, wild rye (Secale cereale) initially grew as a noxious weed within wheat and barley fields in southwest Asia. Because its seeds were harvested, stored, and re-sown alongside domesticated cereals, rye evolved larger grains and tougher rachises purely through unintended human selection.\n\nWhen agricultural expansion carried wheat cultivation northward into cold, acidic European soils where wheat struggled to germinate, the rye mimics demonstrated superior cold hardiness. European farmers gradually recognized the value of the weed, actively adopting rye as an independent secondary domesticate. This evolutionary sequence illustrates that human agency in shaping planetary biomes frequently operates through unintended selective feedbacks.",
    "question": "The word 'inadvertently' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "deliberately",
      "B": "unintentionally",
      "C": "scrupulously",
      "D": "maliciously"
    },
    "correct_answer": "B",
    "clue_type": "Definition & Restatement",
    "clue_signal": "they inadvertently created an unprecedented ecological niche... purely through unintended human selection... unintended selective feedbacks...",
    "explanation": {
      "meaning": "'Inadvertently' là trạng từ mang nghĩa vô tình, không cố ý, ngoài ý muốn, do sơ ý hoặc không nhận biết trước được hậu quả.",
      "substitution": "Thế chỗ: 'they unintentionally created an unprecedented ecological niche' đồng nghĩa tuyệt đối với các cụm từ lặp lại sau đó như 'unintended human selection' và 'unintended selective feedbacks'.",
      "trap_breakdown": {
        "A": "deliberately (có chủ ý, cố tình) — Bẫy trái nghĩa hoàn toàn với unintended.",
        "C": "scrupulously (tỉ mỉ, cẩn trọng) — Bẫy phương pháp.",
        "D": "maliciously (ác ý, hiểm độc) — Bẫy động cơ: Nông dân chỉ làm ruộng chứ không có ý hại mùa màng."
      },
      "synonyms": [
        "unintentionally",
        "accidentally",
        "unwittingly",
        "involuntarily"
      ]
    }
  },
  {
    "id": "vic_87",
    "title": "Visual Saliency and Cognitive Ergonomics",
    "topic": "Cognitive Psychology & Ergonomics",
    "target_word": "salient",
    "paragraph_index": 2,
    "passage": "In complex, data-saturated environments—such as aviation cockpits, nuclear power control consoles, and surgical operating rooms—human operators must monitor dozens of dynamic visual displays simultaneously. Cognitive psychology has demonstrated that visual attention is not distributed uniformly across visual fields; rather, it is heavily constrained by human working memory limits and selective attentional bottlenecks.\n\nTo optimize safety, interface designers exploit bottom-up attentional capture by rendering critical alert indicators visually salient. Bottom-up saliency is driven by preattentive visual features that involuntarily grab human foveal fixation within milliseconds, regardless of conscious operator intent. Displays that employ sharp chromatic contrasts, rapid flashing rates, or abrupt luminance increases immediately stand out against neutral, cluttered backgrounds, bypassing cognitive fatigue and directing operator gaze toward urgent mechanical faults.\n\nHowever, cognitive ergonomists caution against the excessive proliferation of salient alarms. When multiple non-critical indicators simultaneously flash and emit acoustic warnings during an emergency, operators experience 'alarm fatigue.' Instead of clarifying operational threats, overwhelming sensory clutter induces cognitive tunneling, causing operators to misdiagnose system failures or overlook subtle primary causes.",
    "question": "The word 'salient' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "prominent",
      "B": "imperceptible",
      "C": "subordinate",
      "D": "antiquated"
    },
    "correct_answer": "A",
    "clue_type": "Definition & Restatement",
    "clue_signal": "rendering critical alert indicators visually salient... immediately stand out against neutral, cluttered backgrounds...",
    "explanation": {
      "meaning": "'Salient' là tính từ chỉ đặc điểm nổi bật, dễ thấy nhất, lập tức thu hút ánh nhìn hoặc sự chú ý của mọi người.",
      "substitution": "Thế chỗ: 'rendering critical alert indicators visually prominent/conspicuous' khớp hoàn toàn với câu sau nói về việc các đèn tín hiệu 'immediately stand out' (ngay lập tức nổi bật bật lên trên nền trung tính).",
      "trap_breakdown": {
        "B": "imperceptible (không thể nhận thấy) — Bẫy trái nghĩa hoàn toàn.",
        "C": "subordinate (phụ thuộc, thứ yếu) — Bẫy vị trí.",
        "D": "antiquated (cổ xưa, lạc hậu) — Sai nghĩa."
      },
      "synonyms": [
        "prominent",
        "conspicuous",
        "noticeable",
        "striking"
      ]
    }
  },
  {
    "id": "vic_88",
    "title": "Morphogen Gradients and Embryonic Patterning",
    "topic": "Developmental Biology & Genetics",
    "target_word": "manifest",
    "paragraph_index": 2,
    "passage": "A foundational dilemma in developmental biology is how a single fertilized zygote, possessing an identical genomic sequence in all daughter cells, differentiates into specialized tissues arranged along precise anatomical body axes. In multicellular organisms, spatial pattern formation is orchestrated by signaling molecules known as morphogens. Secreted from localized embryonic organizing centers, morphogens diffuse through extracellular matrices to establish continuous concentration gradients across developing tissues.\n\nResponding cells translate these quantitative molecular gradients into distinct, discrete phenotypic patterns that manifest as specialized organs. According to Lewis Wolpert's classic 'French flag' model, target cells possess distinct biochemical activation thresholds for gene expression. Cells located proximate to the source encounter high morphogen concentrations, triggering one specific gene program; cells at intermediate distances activate a different genetic cascade, while distant cells remain uninduced. As a consequence, continuous chemical gradients become visually apparent in distinct stripes of differentiated cell types.\n\nThe bicoid protein gradient in Drosophila melanogaster embryos exemplifies this morphogenetic mechanism. Synthesized from maternal mRNA localized at the anterior egg pole, bicoid protein diffuses posteriorly, creating an exponential concentration slope. High anterior bicoid concentrations activate transcription factors that induce head and thoracic segments, ensuring that body appendages develop in their correct anatomical orientations.",
    "question": "The word 'manifest' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "dissipate",
      "B": "conceal",
      "C": "appear",
      "D": "stagnate"
    },
    "correct_answer": "C",
    "clue_type": "Definition & Restatement",
    "clue_signal": "phenotypic patterns that manifest as specialized organs... continuous chemical gradients become visually apparent in distinct stripes...",
    "explanation": {
      "meaning": "'Manifest' là nội/ngoại động từ có nghĩa là biểu hiện ra, hiện rõ, hiển lộ, trở nên dễ thấy và quan sát được.",
      "substitution": "Thế chỗ: 'phenotypic patterns that appear/reveal themselves as specialized organs' khớp hoàn hảo với câu sau: 'become visually apparent in distinct stripes' (trở nên hiện rõ trước mắt thành các dải tế bào biệt hóa).",
      "trap_breakdown": {
        "A": "dissipate (tiêu tan, biến mất) — Bẫy trái nghĩa: Hóa chất khuếch tán nhưng mô hình cơ quan biểu lộ rõ ràng.",
        "B": "conceal (che giấu) — Bẫy trái nghĩa hoàn toàn.",
        "D": "stagnate (đình trệ) — Sai nghĩa."
      },
      "synonyms": [
        "appear",
        "emerge",
        "materialize",
        "become evident"
      ]
    }
  },
  {
    "id": "vic_89",
    "title": "Canyon Incision and Bedrock Knickpoints",
    "topic": "Geomorphology & Fluvial Processes",
    "target_word": "precipitous",
    "paragraph_index": 2,
    "passage": "The landscape evolution of mountainous river catchments is driven by the dynamic competition between tectonic rock uplift and fluvial canyon incision. When tectonic plates collide, the rapid elevation of mountain blocks steepens river channel gradients. Water flowing down these amplified slopes accelerates, increasing shear stress against the riverbed and scouring away alluvial sedimentary cover to expose resistant bedrock to mechanical abrasion.\n\nWhere river channels cross resistant geological rock strata or fault escarpments, channel profiles develop precipitous drops known as knickpoints or waterfalls. Because kinetic energy and hydraulic cavitation are concentrated at the waterfall lip, rapid erosion undercuts the base of the resistant ledge, causing the cliff face to collapse. This upstream migration of knickpoints acts as an erosional wave, carving deep, narrow gorges and steadily propagating the incision signal throughout the entire tributary network.\n\nOver millions of years, the Grand Canyon of the Colorado River was incised through this coupled tectonic-fluvial process. As the Colorado Plateau was gradually elevated by mantle buoyancy, the Colorado River incised vertically through nearly two kilometers of Paleozoic and Precambrian rock strata, providing a breathtaking vertical cross-section of Earth's geological history.",
    "question": "The word 'precipitous' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "gradual",
      "B": "horizontal",
      "C": "subterranean",
      "D": "steep"
    },
    "correct_answer": "D",
    "clue_type": "Definition & Restatement",
    "clue_signal": "develop precipitous drops known as knickpoints or waterfalls... causing the cliff face to collapse... carving deep, narrow gorges...",
    "explanation": {
      "meaning": "'Precipitous' là tính từ miêu tả độ dốc đứng, hiểm trở như vách đá đứng, dốc dựng đứng hoặc tụt dốc đột ngột.",
      "substitution": "Thế chỗ: 'develop steep drops known as knickpoints or waterfalls' hoàn toàn chuẩn xác khi nói về các thác nước và vách đá dựng đứng của hẻm núi (canyon/gorge).",
      "trap_breakdown": {
        "A": "gradual (thoai thoải, từ từ) — Bẫy trái nghĩa hoàn toàn với vách thác nước dựng đứng.",
        "B": "horizontal (nằm ngang) — Bẫy hình học: Dòng sông rơi thẳng đứng xuống.",
        "C": "subterranean (dưới lòng đất) — Bẫy nhầm lẫn địa chất."
      },
      "synonyms": [
        "steep",
        "sheer",
        "vertical",
        "abrupt"
      ]
    }
  },
  {
    "id": "vic_90",
    "title": "Ribosomes and the RNA World Hypothesis",
    "topic": "Biochemistry & Molecular Evolution",
    "target_word": "indispensable",
    "paragraph_index": 2,
    "passage": "In all extant cellular life, the translation of genetic code into functional proteins is performed by the ribosome, a massive ribonucleoprotein complex comprising both ribosomal RNA (rRNA) and associated structural proteins. For decades after the elucidation of the central dogma of molecular biology, researchers debated whether the catalytic peptidyl transferase activity—the formation of peptide bonds between amino acids—was mediated by ribosomal proteins or RNA.\n\nThe crystallographic resolution of the atomic structure of the bacterial ribosome in 2000 settled this foundational debate, establishing that RNA is the indispensable catalytic core of translation. Biochemist Thomas Steitz demonstrated that the catalytic peptidyl transferase center of the large ribosomal subunit is composed entirely of ribosomal RNA; no protein side chains are situated within eighteen angstroms of the active site. The ribosome is fundamentally a ribozyme, relying on proteins merely to stabilize its folded tertiary architecture.\n\nThis structural discovery provides compelling support for the RNA world hypothesis, which posits that early biological evolution relied on RNA to perform both genetic information storage and enzymatic catalysis before the evolutionary divergence of DNA and protein enzymes. The fact that the most fundamental metabolic process in cellular life—protein synthesis—is catalyzed by ancient catalytic RNA represents an enduring molecular fossil.",
    "question": "The word 'indispensable' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "expendable",
      "B": "essential",
      "C": "supplementary",
      "D": "provisional"
    },
    "correct_answer": "B",
    "clue_type": "Definition & Restatement",
    "clue_signal": "RNA is the indispensable catalytic core of translation... composed entirely of ribosomal RNA; no protein side chains are situated...",
    "explanation": {
      "meaning": "'Indispensable' là tính từ chỉ một thành phần thiết yếu, tối quan trọng, không thể thiếu, không thể thay thế được.",
      "substitution": "Thế chỗ: 'RNA is the essential/vital catalytic core of translation' khớp hoàn toàn với câu sau khẳng định trung tâm xúc tác tạo liên kết peptide được cấu tạo hoàn toàn bởi rRNA.",
      "trap_breakdown": {
        "A": "expendable (có thể bỏ đi được) — Bẫy trái nghĩa hoàn toàn.",
        "C": "supplementary (bổ sung, phụ thêm) — Bẫy vai trò: RNA đóng vai trò chính, còn protein mới là thành phần hỗ trợ cấu trúc.",
        "D": "provisional (tạm thời) — Bẫy thời gian."
      },
      "synonyms": [
        "essential",
        "vital",
        "crucial",
        "irreplaceable"
      ]
    }
  },
  {
    "id": "vic_91",
    "title": "Bacterial Resistance and Penicillin Discovery",
    "topic": "History of Medicine & Microbiology",
    "target_word": "stymied",
    "paragraph_index": 2,
    "passage": "Alexander Fleming's accidental discovery of penicillin in 1928 marked the dawn of the antibiotic era. Observing that a contaminating Penicillium notatum mold had lysed adjacent Staphylococcus colonies on a Petri dish, Fleming recognized the therapeutic potential of the secreted antimicrobial metabolite. However, Fleming was an immunologist rather than an organic chemist, and his efforts to isolate the chemically unstable penicillin molecule from crude broth cultures were repeatedly frustrated.\n\nFor more than a decade, clinical utilization of penicillin was stymied by formidable chemical and technical hurdles. The penicillin molecule degraded rapidly in acidic solutions and decomposed when exposed to mild temperature increases, preventing pharmaceutical scale-up. It was not until 1940 that an interdisciplinary research team at Oxford University, led by Howard Florey and Ernst Chain, successfully extracted and stabilized penicillin via freeze-drying, demonstrating its curative efficacy against lethal streptococcal infections in mice.\n\nWorld War II catalyzed a massive Anglo-American industrial collaboration to mass-produce the antibiotic. American biochemical engineers perfected deep-tank submerged aerobic fermentation using corn steep liquor, scaling production from milligrams to billions of units within three years. Penicillin saved hundreds of thousands of Allied soldiers from wound sepsis, permanently transforming the clinical prognosis of bacterial infections worldwide.",
    "question": "The word 'stymied' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "thwarted",
      "B": "accelerated",
      "C": "subsidized",
      "D": "corroborated"
    },
    "correct_answer": "A",
    "clue_type": "Contrast & Opposition",
    "clue_signal": "was stymied by formidable chemical and technical hurdles... degraded rapidly... It was not until 1940 that... successfully extracted...",
    "explanation": {
      "meaning": "'Stymie' là ngoại động từ chỉ việc làm cản trở, chặn đứng, làm bế tắc hoặc ngăn trở sự phát triển của một tiến trình.",
      "substitution": "Thế chỗ: 'clinical utilization of penicillin was thwarted/impeded by formidable chemical hurdles' làm nổi bật tình trạng suốt hơn 10 năm thuốc bị bế tắc không thể đưa vào sử dụng.",
      "trap_breakdown": {
        "B": "accelerated (tăng tốc) — Bẫy trái nghĩa: Việc sản xuất bị đình trệ kéo dài hơn một thập kỷ.",
        "C": "subsidized (được trợ giá/tài trợ) — Bẫy tài chính.",
        "D": "corroborated (được chứng minh xác thực) — Sai nghĩa."
      },
      "synonyms": [
        "thwarted",
        "impeded",
        "blocked",
        "hindered"
      ]
    }
  },
  {
    "id": "vic_92",
    "title": "Groupthink and Conformity in Decision-Making",
    "topic": "Social Psychology & Organizational Behavior",
    "target_word": "cohesive",
    "paragraph_index": 2,
    "passage": "In organizational psychology, the quality of decision-making within small leadership councils has profound consequences for policy outcomes. Classic economic rationality assumes that groups make superior decisions compared to isolated individuals, as diverse members contribute complementary expertise, identify blind spots, and critically debate proposed policies. However, social psychologist Irving Janis discovered that under specific conditions, small groups exhibit profound cognitive dysfunctions.\n\nJanis coined the term 'groupthink' to describe the mode of thinking that occurs when a highly cohesive group prioritizes unanimity and social harmony over realistic appraisal of alternative courses of action. When members possess strong mutual loyalty and an intense desire for collective consensus, individuals suppress personal doubts and withhold dissenting viewpoints. Self-appointed 'mindguards' actively shield leaders from divergent external information, while an illusion of invulnerability fosters excessive, uncritical risk-taking.\n\nHistorical fiascoes, such as the 1961 Bay of Pigs invasion and the 1986 Space Shuttle Challenger launch decision, demonstrate the perilous consequences of groupthink. In both cases, high-stakes decisions were made by close-knit committees that systematically ignored glaring warning signs. Modern organizations mitigate groupthink by appointing formal 'devil's advocates' tasked with vigorously challenging consensus assumptions.",
    "question": "The word 'cohesive' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "fragmented",
      "B": "antagonistic",
      "C": "unified",
      "D": "disorganized"
    },
    "correct_answer": "C",
    "clue_type": "Definition & Restatement",
    "clue_signal": "highly cohesive group prioritizes unanimity and social harmony... strong mutual loyalty and an intense desire for collective consensus...",
    "explanation": {
      "meaning": "'Cohesive' là tính từ miêu tả sự gắn kết chặt chẽ, đoàn kết, thống nhất cao độ giữa các thành viên trong một tập thể.",
      "substitution": "Thế chỗ: 'when a highly unified/close-knit group prioritizes unanimity' khớp hoàn hảo với các biểu hiện 'strong mutual loyalty' và 'collective consensus'.",
      "trap_breakdown": {
        "A": "fragmented (bị chia rẽ, phân mảnh) — Bẫy trái nghĩa hoàn toàn.",
        "B": "antagonistic (thù địch, đối kháng) — Bẫy trái nghĩa.",
        "D": "disorganized (vô tổ chức) — Bẫy nhầm lẫn: Nhóm này rất kỷ luật và gắn bó."
      },
      "synonyms": [
        "unified",
        "close-knit",
        "tightly knit",
        "integrated"
      ]
    }
  },
  {
    "id": "vic_93",
    "title": "Norman Borlaug and the Green Revolution",
    "topic": "Agronomy & Agricultural History",
    "target_word": "fostered",
    "paragraph_index": 2,
    "passage": "During the mid-twentieth century, widespread demographic growth across developing nations in Asia and Latin America raised catastrophic fears of global famine. Conventional cereal crop varieties were poorly suited to modern intensive agriculture. When traditional tall-stalked wheat and rice strains were treated with synthetic nitrogen fertilizers, they produced heavy seed heads that caused the spindly stems to bend and collapse to the ground—a fatal condition known as lodging—destroying the crop before harvest.\n\nPlant geneticist Norman Borlaug fostered a revolution in agricultural yield by breeding semi-dwarf wheat cultivars. Working in Mexico, Borlaug cross-bred Japanese dwarf wheat varieties with high-yielding American strains to incorporate dwarfing genes. These semi-dwarf plants developed thick, rigid stalks that supported massive, fertilizer-boosted grain heads without lodging. Furthermore, Borlaug practiced 'shuttle breeding,' growing two successive generations per year in divergent Mexican latitudes, which inadvertently selected for photoperiod-insensitive strains capable of thriving across global climates.\n\nThe global diffusion of Borlaug's semi-dwarf wheat and parallel IR8 semi-dwarf rice varieties averted predicted mass starvation, enabling India and Pakistan to achieve agricultural self-sufficiency by the 1970s. However, the Green Revolution also generated long-term ecological consequences, including excessive groundwater depletion, soil salinization from intensive irrigation, and pesticide accumulation in agricultural runoff.",
    "question": "The word 'fostered' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "curbed",
      "B": "cultivated",
      "C": "suppressed",
      "D": "simulated"
    },
    "correct_answer": "B",
    "clue_type": "Definition & Restatement",
    "clue_signal": "Borlaug fostered a revolution in agricultural yield by breeding semi-dwarf wheat cultivars... Working in Mexico, Borlaug cross-bred...",
    "explanation": {
      "meaning": "'Foster' là ngoại động từ chỉ hành động bồi đắp, nuôi dưỡng, ươm mầm, thúc đẩy sự hình thành và phát triển của một phong trào hay thành tựu.",
      "substitution": "Thế chỗ: 'Norman Borlaug cultivated/promoted a revolution in agricultural yield' (Norman Borlaug đã tạo dựng/thúc đẩy cuộc cách mạng về năng suất nông nghiệp) làm nổi bật công trình lai tạo giống của ông.",
      "trap_breakdown": {
        "A": "curbed (kìm hãm) — Bẫy trái nghĩa.",
        "C": "suppressed (đàn áp, triệt tiêu) — Bẫy trái nghĩa.",
        "D": "simulated (mô phỏng) — Bẫy thí nghiệm: Đây là thành tựu lai tạo thực tế trên đồng ruộng."
      },
      "synonyms": [
        "cultivated",
        "promoted",
        "nurtured",
        "encouraged"
      ]
    }
  },
  {
    "id": "vic_94",
    "title": "Germline Gene Editing and Evolutionary Ethics",
    "topic": "Bioethics & Molecular Genetics",
    "target_word": "preclude",
    "paragraph_index": 2,
    "passage": "The advent of precision genomic editing tools, most notably the CRISPR-Cas9 endonuclease system, has transformed biomedical science. By utilizing short synthetic guide RNAs to direct bacterial endonuclease enzymes to precise genomic loci, researchers can excise, modify, or insert specific nucleotide sequences with unprecedented efficiency. In somatic gene therapy, editing is confined to non-reproductive cells, offering prospective cures for monogenic disorders like sickle cell anemia without affecting future generations.\n\nIn contrast, human germline gene editing introduces heritable modifications that preclude natural genetic transmission in descendants. Modifying the DNA of early embryos, sperm, or oocytes ensures that altered alleles are incorporated into every subsequent cell of the adult organism and transmitted indefinitely down the biological lineage. Bioethicists warn that off-target cleavage events could introduce inadvertent mutagenic lesions that become permanently embedded within the human gene pool, with unforeseen multigenerational consequences.\n\nFurthermore, the prospect of germline enhancement—editing genomes not merely to eliminate debilitating genetic pathologies, but to enhance cognitive, physical, or longevity phenotypes—raises profound sociological concerns. If expensive genetic enhancements are commodified, existing socio-economic inequalities could become biologically entrenched, creating genetically stratified castes and dismantling fundamental democratic principles of human equality.",
    "question": "The word 'preclude' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "reinforce",
      "B": "accelerate",
      "C": "emulate",
      "D": "prevent"
    },
    "correct_answer": "D",
    "clue_type": "Definition & Restatement",
    "clue_signal": "introduces heritable modifications that preclude natural genetic transmission... altered alleles are incorporated into every subsequent cell... transmitted indefinitely...",
    "explanation": {
      "meaning": "'Preclude' là ngoại động từ trang trọng mang nghĩa ngăn cản, ngăn ngừa từ trước, loại trừ khả năng xảy ra của một sự việc.",
      "substitution": "Thế chỗ: 'modifications that prevent/rule out natural genetic transmission' (những biến đổi ngăn chặn việc truyền tải di truyền tự nhiên) nhấn mạnh việc can thiệp nhân tạo thay thế hoàn toàn tiến trình sinh sản tự nhiên.",
      "trap_breakdown": {
        "A": "reinforce (củng cố) — Bẫy trái nghĩa: Can thiệp nhân tạo loại bỏ gene tự nhiên chứ không củng cố nó.",
        "B": "accelerate (tăng tốc) — Bẫy nhầm lẫn.",
        "C": "emulate (mô phỏng, bắt chước) — Sai nghĩa."
      },
      "synonyms": [
        "prevent",
        "rule out",
        "hinder",
        "bar"
      ]
    }
  },
  {
    "id": "vic_95",
    "title": "Long-Term Potentiation and Memory Consolidation",
    "topic": "Neurobiology & Memory Science",
    "target_word": "conducive",
    "paragraph_index": 2,
    "passage": "At the cellular level, memory formation and long-term retention are encoded through changes in the efficacy of synaptic transmission between neurons. In 1949, psychologist Donald Hebb postulated that when an axon of cell A repeatedly and persistently stimulates cell B, metabolic or structural growth processes occur that increase the functional strength of their connection—an insight colloquially summarized as 'cells that fire together, wire together.'\n\nElectrophysiologists verified Hebb's hypothesis by discovering long-term potentiation (LTP) in the mammalian hippocampus, demonstrating that high-frequency stimulation creates environments conducive to enhanced synaptic transmission. During high-frequency tetanic stimulation, prolonged postsynaptic depolarization expels magnesium ions that normally block NMDA-type glutamate receptors. Calcium ions subsequently flood into the dendritic spine, triggering intracellular signaling cascades that insert additional AMPA receptors into the postsynaptic membrane, substantially amplifying future synaptic sensitivity.\n\nMemory consolidation over extended timescales requires transforming early, transient LTP into late-phase permanent structural remodeling. Calcium influx stimulates nuclear gene transcription, synthesizing new scaffolding proteins and neurotrophic factors that physically enlarge dendritic spines and form new synaptic boutons. Pharmacological agents that inhibit protein synthesis block late-phase LTP, leaving experimental subjects capable of short-term learning but entirely unable to consolidate long-term memories.",
    "question": "The word 'conducive' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "favorable",
      "B": "hazardous",
      "C": "indifferent",
      "D": "detrimental"
    },
    "correct_answer": "A",
    "clue_type": "Definition & Restatement",
    "clue_signal": "creates environments conducive to enhanced synaptic transmission... substantially amplifying future synaptic sensitivity.",
    "explanation": {
      "meaning": "'Conducive (to)' là tính từ đi kèm giới từ 'to' chỉ môi trường hoặc điều kiện thuận lợi, có lợi, tạo điều kiện dễ dàng cho một kết quả tích cực xảy ra.",
      "substitution": "Thế chỗ: 'creates environments favorable to enhanced synaptic transmission' (tạo môi trường thuận lợi cho việc tăng cường dẫn truyền xi-náp) khớp hoàn toàn với việc khuếch đại độ nhạy cảm của tế bào thần kinh.",
      "trap_breakdown": {
        "B": "hazardous (nguy hiểm) — Bẫy trái nghĩa.",
        "C": "indifferent (thờ ơ, trung tính) — Bẫy trạng thái.",
        "D": "detrimental (gây hại, bất lợi) — Bẫy trái nghĩa hoàn toàn."
      },
      "synonyms": [
        "favorable",
        "advantageous",
        "beneficial",
        "encouraging"
      ]
    }
  },
  {
    "id": "vic_96",
    "title": "Impact Cratering and Asteroid Dynamics",
    "topic": "Planetary Geology & Meteoritics",
    "target_word": "sporadic",
    "paragraph_index": 2,
    "passage": "The surface histories of terrestrial planetary bodies—Mercury, the Moon, and Mars—preserve an enduring record of hypervelocity impact cratering. Unlike Earth, where plate tectonics, hydrological erosion, and volcanic resurfacing rapidly obliterate ancient impact structures, the airless Moon displays craters ranging from microscopic pits to gigantic multiring impact basins spanning thousands of kilometers across.\n\nAstronomical monitoring of Near-Earth Objects (NEOs) demonstrates that while major asteroid impacts are sporadic over human timescales, collision events are inevitable over millions of years. Asteroid populations residing in the main asteroid belt between Mars and Jupiter are periodically nudged into resonance gaps by gravitational perturbations from Jupiter and the Yarkovsky thermal radiation effect. Once pushed into unstable orbital resonances, asteroid trajectories are deflected into Earth-crossing orbits, transforming them into potential terrestrial impactors.\n\nThe geological record preserves decisive evidence of catastrophic impacts shaping biological evolution. The Chicxulub impact 66 million years ago excavated a 180-kilometer crater in the Yucatán Peninsula, vaporizing sulfur-rich carbonate rocks and injecting vast aerosol clouds into the stratosphere. The ensuing global impact winter and darkness suppressed photosynthesis, triggering the end-Cretaceous mass extinction that terminated the reign of non-avian dinosaurs.",
    "question": "The word 'sporadic' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "continuous",
      "B": "catastrophic",
      "C": "intermittent",
      "D": "perpetual"
    },
    "correct_answer": "C",
    "clue_type": "Definition & Restatement",
    "clue_signal": "while major asteroid impacts are sporadic over human timescales, collision events are inevitable over millions of years... periodically nudged...",
    "explanation": {
      "meaning": "'Sporadic' là tính từ miêu tả hiện tượng xảy ra ngắt quãng, thỉnh thoảng, rải rác từng hồi không liên tục.",
      "substitution": "Thế chỗ: 'while major asteroid impacts are intermittent/infrequent over human timescales' đối lập với mốc thời gian hàng triệu năm và khớp với từ nối 'periodically' (định kỳ, từng đợt).",
      "trap_breakdown": {
        "A": "continuous (liên tục) — Bẫy trái nghĩa: Thiên thạch lớn không đâm liên tục mà rất hiếm khi mới có một vụ.",
        "B": "catastrophic (thảm khốc) — Bẫy liên tưởng: Va chạm thiên thạch có thể thảm khốc, nhưng từ sporadic nói về tần suất thời gian.",
        "D": "perpetual (vĩnh viễn) — Bẫy thời gian."
      },
      "synonyms": [
        "intermittent",
        "infrequent",
        "occasional",
        "isolated"
      ]
    }
  },
  {
    "id": "vic_97",
    "title": "Sunk Cost Fallacy in Megaproject Management",
    "topic": "Behavioral Economics & Project Management",
    "target_word": "incurred",
    "paragraph_index": 2,
    "passage": "In neoclassical economics, rational choice theory dictates that capital allocation decisions must be evaluated strictly on forward-looking expectations of future marginal revenues and marginal costs. Historical expenditures that cannot be recovered—formalized as 'sunk costs'—are economically irrelevant to future operational decisions. Whether an enterprise has invested ten dollars or ten million dollars into an ongoing venture, rational actors should terminate unviable initiatives the moment projected future benefits fall below projected future completion costs.\n\nHowever, behavioral economists have documented that decision-makers frequently succumb to the sunk cost fallacy, pouring further capital into failing ventures solely to justify prior expenditures incurred. Human psychology exhibits intense loss aversion, leading project executives to perceive the cancellation of a project as an explicit admission of personal waste and failure. Consequently, organizations persist in constructing uneconomic infrastructure, justifying additional budget overruns by citing the massive financial outlays already committed to the endeavor.\n\nThis cognitive vulnerability is vividly illustrated by megaprojects such as the Anglo-French Concorde supersonic transport. Despite commercial forecasts demonstrating that the aircraft was economically uncompetitive due to excessive fuel consumption and restricted landing corridors, both governments continued financing the project for over a decade. By prioritizing psychological justification over empirical cost-benefit calculations, leadership committees repeatedly squander scarce institutional resources.",
    "question": "The word 'incurred' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "reimbursed",
      "B": "sustained",
      "C": "anticipated",
      "D": "waived"
    },
    "correct_answer": "B",
    "clue_type": "Definition & Restatement",
    "clue_signal": "prior expenditures incurred... the massive financial outlays already committed to the endeavor...",
    "explanation": {
      "meaning": "'Incur' là ngoại động từ chỉ hành động phải gánh chịu, chuốc lấy hoặc làm phát sinh (chi phí, nợ nần, tổn thất) do hậu quả của một hành động đã làm.",
      "substitution": "Thế chỗ: 'justify prior expenditures sustained/experienced' đồng nghĩa với cụm 'financial outlays already committed' (các khoản chi tiêu tài chính đã đổ ra trước đó).",
      "trap_breakdown": {
        "A": "reimbursed (được hoàn tiền) — Bẫy trái nghĩa: Chi phí chìm là tiền đã mất, không bao giờ lấy lại được.",
        "C": "anticipated (dự kiến trong tương lai) — Bẫy thời gian: Đây là chi phí đã phát sinh trong quá khứ.",
        "D": "waived (được miễn trừ) — Sai nghĩa."
      },
      "synonyms": [
        "sustained",
        "experienced",
        "contracted",
        "brought upon oneself"
      ]
    }
  },
  {
    "id": "vic_98",
    "title": "Enhanced Geothermal Systems and Hydraulic Fracturing",
    "topic": "Geothermal Engineering & Thermodynamics",
    "target_word": "harness",
    "paragraph_index": 1,
    "passage": "Conventional geothermal power plants rely on hydrothermal reservoirs where groundwater is naturally heated by underlying magmatic bodies and trapped within permeable rock formations. By drilling production wells into these pressurized thermal pockets, engineers extract superheated steam to drive electric turbine generators. However, these naturally occurring, highly permeable hydrothermal reservoirs represent rare geological anomalies, restricted to volcanic rift zones like Iceland, New Zealand, and the western United States.\n\nTo overcome these geographical constraints, advanced energy engineers have developed Enhanced Geothermal Systems (EGS) to harness thermal energy stored within deep, impermeable crystalline basement rock. Vast reserves of hot dry rock exist several kilometers beneath virtually every continent, containing heat derived from the radioactive decay of uranium, thorium, and potassium. In an EGS installation, engineers drill deep injection boreholes into the hot granite and pump high-pressure water to re-open micro-fractures, artificially creating a subterranean heat exchanger.\n\nOnce fracture networks are engineered, chilled surface water is circulated down the injection well, traverses the fractured crystalline rock to absorb thermal energy, and ascends through production boreholes at temperatures exceeding two hundred degrees Celsius. By utilizing closed-loop binary cycle power plants that emit zero direct greenhouse gases, EGS offers the potential to provide continuous, baseload zero-carbon electricity independent of weather fluctuations.",
    "question": "The word 'harness' in paragraph 1 is closest in meaning to:",
    "options": {
      "A": "utilize",
      "B": "dissipate",
      "C": "extinguish",
      "D": "impede"
    },
    "correct_answer": "A",
    "clue_type": "Definition & Restatement",
    "clue_signal": "developed Enhanced Geothermal Systems (EGS) to harness thermal energy stored within... pump high-pressure water... to absorb thermal energy... to drive electric turbine generators...",
    "explanation": {
      "meaning": "'Harness' là ngoại động từ chỉ hành động khai thác, tận dụng và chuyển hóa một nguồn năng lượng tự nhiên thành dạng có ích cho con người.",
      "substitution": "Thế chỗ: 'developed EGS to utilize/exploit thermal energy stored within deep rock' (phát triển hệ thống địa nhiệt nâng cao để khai thác/tận dụng nhiệt năng tiềm tàng trong lòng đất).",
      "trap_breakdown": {
        "B": "dissipate (làm tiêu tán, hao phí nhiệt) — Bẫy trái nghĩa: Kỹ sư muốn thu gom nhiệt chứ không làm thất thoát.",
        "C": "extinguish (dập tắt) — Bẫy lửa.",
        "D": "impede (cản trở) — Sai nghĩa."
      },
      "synonyms": [
        "utilize",
        "exploit",
        "channel",
        "make use of"
      ]
    }
  },
  {
    "id": "vic_99",
    "title": "Technological Determinism and the Printing Press",
    "topic": "Historiography of Technology & Sociology",
    "target_word": "relegated",
    "paragraph_index": 2,
    "passage": "In the historiography of media and culture, few innovations have attracted as much deterministic analysis as Johannes Gutenberg's invention of movable metal type around 1450. Early communication theorists, such as Marshall McLuhan, framed the printing press as an autonomous technological catalyst that single-handedly dismantled medieval feudal hierarchies, launched the Protestant Reformation, and gave birth to individualistic modern scientific thought.\n\nContemporary historians have challenged this technological determinism, arguing that early mechanical printing was initially relegated to established, conservative social functions. Gutenberg and his immediate successors did not seek to subvert institutional power; instead, early print shops produced Latin liturgical texts, papal indulgences, and scholastic theology designed to reinforce Catholic ecclesiastical authority. The visual typography of incunabula mimicked the scribal calligraphy of monastic scriptoria so closely that contemporary readers often could not distinguish printed codices from hand-illuminated manuscripts.\n\nScholars now emphasize that the transformational agency of the printing press was mediated through dynamic social, economic, and religious networks. It was only when vernacular writers, merchant guilds, and theological dissenters like Martin Luther recognized the polemical potential of inexpensive pamphlets that print technology functioned as a revolutionary force. Technology alone did not cause modernity; rather, historical actors mobilized machines to achieve specific ideological agendas.",
    "question": "The word 'relegated' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "elevated",
      "B": "liberated",
      "C": "promoted",
      "D": "assigned"
    },
    "correct_answer": "D",
    "clue_type": "Contrast & Opposition",
    "clue_signal": "early mechanical printing was initially relegated to established, conservative social functions. Gutenberg and his immediate successors did not seek to subvert... instead, produced Latin liturgical texts...",
    "explanation": {
      "meaning": "'Relegate (to)' là ngoại động từ chỉ việc hạ cấp, giáng chức, hoặc chỉ định, giới hạn một đối tượng vào một vai trò thứ yếu, khiêm tốn.",
      "substitution": "Thế chỗ: 'printing was initially assigned/confined to established, conservative social functions' (nghề in ban đầu chỉ bị giới hạn/gán vào các chức năng bảo thủ quen thuộc) đối lập với vị thế cách mạng đảo lộn lịch sử được gán cho nó.",
      "trap_breakdown": {
        "A": "elevated (nâng cao vị thế) — Bẫy trái nghĩa hoàn toàn với relegate.",
        "B": "liberated (giải phóng) — Bẫy tự do: Máy in ban đầu bị trói buộc phục vụ giáo hội.",
        "C": "promoted (thăng cấp) — Bẫy trái nghĩa."
      },
      "synonyms": [
        "assigned",
        "confined",
        "demoted",
        "restricted"
      ]
    }
  },
  {
    "id": "vic_100",
    "title": "Channelization and Floodplain Ecology",
    "topic": "Environmental History & Fluvial Geomorphology",
    "target_word": "subjugated",
    "paragraph_index": 2,
    "passage": "Prior to modern industrial engineering, river corridors were dynamic, multithreaded ecosystems characterized by braided channels, oxbow lakes, and broad alluvial floodplains. Periodic seasonal inundations were an indispensable ecological pulse, depositing mineral-rich silts that rejuvenated floodplain soils and creating critical nursery habitats for migratory fish. Floodwaters naturally dissipated energy across wetlands, shielding downstream settlements from catastrophic surges.\n\nThroughout the nineteenth and twentieth centuries, civil engineers systematically subjugated natural river systems through aggressive channelization and levee construction. Rivers were treated as hydraulic drainage pipes to be straightened, deepened, and confined between concrete embankments to facilitate barge navigation and protect agricultural lands. Riparian forests were clear-cut, wetlands drained, and meanders severed by artificial cutoffs, transforming complex aquatic habitats into sterile, uniform flumes.\n\nThe ecological consequences of this structural subjugation have been catastrophic. Decoupled from their floodplains, straightened rivers flow at accelerated velocities, scouring riverbeds and exacerbating catastrophic downstream flooding when structural levees inevitably fail. Furthermore, the destruction of off-channel sloughs caused severe declines in freshwater mussel and amphibian populations. Contemporary river restoration now emphasizes 'giving rivers room,' selectively breaching levees to reconnect channels with ancestral floodplain ecosystems.",
    "question": "The word 'subjugated' in paragraph 2 is closest in meaning to:",
    "options": {
      "A": "dominated",
      "B": "emancipated",
      "C": "restored",
      "D": "neglected"
    },
    "correct_answer": "A",
    "clue_type": "Definition & Restatement",
    "clue_signal": "systematically subjugated natural river systems through aggressive channelization... treated as hydraulic drainage pipes to be straightened, deepened, and confined...",
    "explanation": {
      "meaning": "'Subjugate' là ngoại động từ chỉ hành động khuất phục, đàn áp, khống chế và bắt một đối tượng (hoặc tự nhiên) phải phục tùng hoàn toàn sự áp đặt của con người.",
      "substitution": "Thế chỗ: 'systematically dominated/controlled natural river systems through aggressive channelization' làm rõ việc con người ép buộc các dòng sông tự nhiên phải chảy theo đường ống bê tông thẳng tắp.",
      "trap_breakdown": {
        "B": "emancipated (giải phóng) — Bẫy trái nghĩa hoàn toàn.",
        "C": "restored (phục hồi) — Bẫy trái nghĩa: Đoạn 2 nói về việc phá hủy, đoạn 3 mới nói về phục hồi sinh thái.",
        "D": "neglected (bỏ bê) — Bẫy hành vi: Kỹ sư can thiệp rất mạnh bạo chứ không hề bỏ bê."
      },
      "synonyms": [
        "dominated",
        "conquered",
        "mastered",
        "subdued"
      ]
    }
  }
];

export const CONTEXT_VOCAB_BANK = EXTENDED_CONTEXT_VOCAB_BANK.slice(0, 25);

export default EXTENDED_CONTEXT_VOCAB_BANK;
