# scripts/make_batch_151_175.py
import json

BATCH_DATA = [
    # 151: Participatory City Budgets
    {
        "id": "sample_discussion_generated_151",
        "type": "discussion",
        "title": "Participatory City Budgets",
        "topicCategory": "Community & Civic Life",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Professor Rafael Diaz",
            "professorTitle": "Professor of Urban Policy",
            "professorQuestion": "Many municipalities are experimenting with participatory budgeting, allowing neighborhood residents to directly vote on allocating a portion of public infrastructure funds. Should cities let citizens vote directly on local project spending, or should municipal financial experts and urban planners determine all budget allocations?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Direct voting empowers taxpayers. Residents know firsthand whether their neighborhood desperately needs streetlights, crosswalks, or park benches far better than distant bureaucrats in city hall."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Ordinary citizens lack fiscal expertise. Popular votes often favor superficial, attractive amenities over critical, unglamorous investments like sewer pipe upgrades or structural bridge repairs."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Sarah sensibly cautions that untrained citizens might overlook unglamorous infrastructure maintenance like stormwater drainage, I strongly side with Michael's view that participatory budgeting strengthens municipal democracy.\n\nDistant urban planners often rely on abstract demographic statistics, leaving them blind to urgent neighborhood realities. In contrast, local residents navigate their blocks daily; they know exactly which dark intersections endanger pedestrians and which derelict empty lots could be converted into community pocket parks. Direct voting not only delivers tailored civic improvements with high daily utility but also restores public trust in local government. When taxpayers see their collective choices turn into tangible neighborhood assets, voter turnout and civic engagement surge. Allocating a modest ten percent of municipal funds to citizen voting preserves expert oversight for heavy infrastructure while empowering everyday communities.",
        "wordCount": 133,
        "vocabularyHighlights": [
            {
                "term": "participatory budgeting",
                "meaning": "ngân sách có sự tham gia của người dân (dân biểu quyết chi tiêu công)",
                "contextInEssay": "participatory budgeting strengthens municipal democracy"
            },
            {
                "term": "urgent neighborhood realities",
                "meaning": "thực tế bức thiết tại địa phương",
                "contextInEssay": "leaving them blind to urgent neighborhood realities"
            },
            {
                "term": "tangible neighborhood assets",
                "meaning": "những tài sản / công trình hữu hình cho khu phố",
                "contextInEssay": "turn into tangible neighborhood assets"
            },
            {
                "term": "civic engagement surge",
                "meaning": "sự gắn kết và tham gia việc chung của cộng đồng tăng mạnh",
                "contextInEssay": "voter turnout and civic engagement surge"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Thừa nhận lo ngại của Sarah về chi phí ngầm như đường ống cống, nghiêng về Michael ủng hộ người dân bỏ phiếu ngân sách.\n• Góc nhìn thực tế: Người dân đi lại hàng ngày biết rõ ngã tư nào thiếu đèn, khu đất trống nào có thể làm sân chơi hơn các nhà quy hoạch trên giấy tờ.\n• Lợi ích dân chủ: Giúp công chúng khôi phục lòng tin vào chính quyền khi thấy thuế của mình biến thành tiện ích thực tế trước cửa nhà.\n• Giải pháp dung hòa: Dành 10% ngân sách cho dân tự quyết, 90% còn lại vẫn để chuyên gia kỹ thuật quản lý hạ tầng cốt lõi."
    },

    # 152: Volunteering for Graduation
    {
        "id": "sample_discussion_generated_152",
        "type": "discussion",
        "title": "Volunteering for Graduation",
        "topicCategory": "Community & Civic Life",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Professor Rafael Diaz",
            "professorTitle": "Professor of Urban Policy",
            "professorQuestion": "Several high school districts have instituted mandatory community service hours as a prerequisite for graduation. Does requiring volunteer service foster lasting civic responsibility among teenagers, or should schools keep volunteering strictly voluntary?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Making community service compulsory introduces students to social issues outside their social bubble, helping them build empathy and civic duty they would otherwise never develop."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Mandatory service is a contradiction in terms. Forcing overwhelmed students with part-time jobs and family duties breeds resentment and turns meaningful charity into a burdensome chore."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "Although Michael reasonably argues that volunteer work expands adolescent worldviews, I agree with Sarah that making community service a mandatory graduation requirement is counterproductive.\n\nTrue civic altruism cannot be compelled by bureaucratic mandates. When teenagers are forced to log forty volunteer hours simply to earn their diploma, they treat community service as a meaningless box-checking exercise rather than a heartfelt pursuit. Even worse, rigid quotas unfairly penalize low-income students who must work paying jobs after class to support their households or care for younger siblings. A far healthier educational strategy is for schools to actively host volunteer clubs, invite charity organizers to speak, and celebrate student-led initiatives. Inspiring teenagers through positive incentives and flexible elective credits cultivates authentic, lifelong civic responsibility without burdening vulnerable families.",
        "wordCount": 128,
        "vocabularyHighlights": [
            {
                "term": "graduation requirement",
                "meaning": "điều kiện bắt buộc để tốt nghiệp",
                "contextInEssay": "making community service a mandatory graduation requirement is counterproductive"
            },
            {
                "term": "box-checking exercise",
                "meaning": "hoạt động làm cho có để tích dấu hoàn thành hình thức",
                "contextInEssay": "treat community service as a meaningless box-checking exercise"
            },
            {
                "term": "bureaucratic mandates",
                "meaning": "những quy định hành chính áp đặt từ trên xuống",
                "contextInEssay": "cannot be compelled by bureaucratic mandates"
            },
            {
                "term": "authentic, lifelong civic responsibility",
                "meaning": "tinh thần trách nhiệm công dân chân chính, bền bỉ suốt đời",
                "contextInEssay": "cultivates authentic, lifelong civic responsibility without burdening vulnerable families"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận ý định tốt mà Michael nêu, ủng hộ góc nhìn của Sarah rằng bắt buộc thiện nguyện là phản tác dụng.\n• Tác hại của ép buộc: Thiện nguyện xuất phát từ cái tâm, ép tích đủ giờ sẽ biến việc giúp đời thành thủ tục đối phó vô nghĩa.\n• Bất công xã hội: Gây áp lực nặng nề cho học sinh nghèo vốn phải đi làm thêm kiếm sống hoặc trông em sau giờ học.\n• Lối đi thay thế: Nhà trường nên truyền cảm hứng qua câu lạc bộ và cộng điểm khuyến khích thay vì ép buộc bằng bằng tốt nghiệp."
    },

    # 153: Community Fridges
    {
        "id": "sample_discussion_generated_153",
        "type": "discussion",
        "title": "Community Fridges",
        "topicCategory": "Community & Civic Life",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Professor Rafael Diaz",
            "professorTitle": "Professor of Urban Policy",
            "professorQuestion": "Grassroots community fridges—outdoor refrigerators stocked by neighbors with free groceries—have appeared across many cities. Should local governments formally support and permit sidewalk community fridges, or should food aid be concentrated solely in established, regulated food banks?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Community fridges offer immediate, stigma-free nutrition. Anyone can grab fresh milk or vegetables 24/7 without showing identity documents or waiting in humiliating welfare lines."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Unmonitored outdoor fridges present serious food safety hazards. Perishable items can spoil rapidly in summer heat, and spoiled donations can cause severe foodborne illness."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Sarah highlights a legitimate food hygiene concern regarding spoiled perishables, I concur with Michael that community fridges provide indispensable, dignity-preserving relief for hungry residents.\n\nTraditional food banks operate under rigid hours, require invasive income paperwork, and often sit far from low-income residential pockets. In contrast, outdoor community fridges provide immediate, around-the-clock mutual aid. Struggling day laborers and unhoused individuals can discretely take fresh fruit, bread, and milk without enduring bureaucratic scrutiny or social shame. Furthermore, municipalities can easily mitigate bacterial risks by partnering with local volunteer groups to conduct daily temperature checks, enforce strict expiration date labeling, and sanitize shelves regularly. Backing grassroots fridges alongside institutional pantries creates an accessible, empathetic safety net that prevents surplus neighborhood food from rotting in commercial dumpsters.",
        "wordCount": 128,
        "vocabularyHighlights": [
            {
                "term": "dignity-preserving relief",
                "meaning": "sự cứu trợ giữ gìn nhân phẩm cho người nhận",
                "contextInEssay": "provide indispensable, dignity-preserving relief for hungry residents"
            },
            {
                "term": "bureaucratic scrutiny",
                "meaning": "sự xét nét giấy tờ hành chính phiền toái",
                "contextInEssay": "without enduring bureaucratic scrutiny or social shame"
            },
            {
                "term": "mitigate bacterial risks",
                "meaning": "giảm thiểu rủi ro nhiễm khuẩn thực phẩm",
                "contextInEssay": "mitigate bacterial risks by partnering with local volunteer groups"
            },
            {
                "term": "empathetic safety net",
                "meaning": "lưới an sinh xã hội giàu tính nhân văn và thấu cảm",
                "contextInEssay": "creates an accessible, empathetic safety net"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận rủi ro vệ sinh thực phẩm của Sarah, đồng ý với Michael tủ lạnh cộng đồng là cứu trợ thiết thực và nhân văn.\n• Khắc phục rào cản ngân hàng thực phẩm: Không bắt người nghèo phải xếp hàng chứng minh thu nhập hay chịu sự xấu hổ xã hội; mở 24/7.\n• Giải pháp quản lý vệ sinh: Tình nguyện viên kiểm tra nhiệt độ mỗi ngày, dán nhãn hạn sử dụng và lau chùi sát khuẩn thường xuyên.\n• Kết luận: Kết hợp tủ lạnh hè phố với ngân hàng thực phẩm vừa giảm lãng phí đồ ăn vừa tạo lưới an sinh ấm áp."
    },

    # 154: Public Libraries as Cooling Centers
    {
        "id": "sample_discussion_generated_154",
        "type": "discussion",
        "title": "Public Libraries as Cooling Centers",
        "topicCategory": "Community & Civic Life",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Professor Rafael Diaz",
            "professorTitle": "Professor of Urban Policy",
            "professorQuestion": "As climate change triggers unprecedented urban heatwaves, should municipal governments expand public library hours and services to serve as primary cooling centers, or should cities erect dedicated emergency cooling shelters?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Libraries are ideal cooling sanctuaries. They already have air conditioning, drinking water, restrooms, and books, making them welcoming public spaces where vulnerable citizens feel safe."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Overcrowding libraries with heatwave refugees disrupts regular patrons and places unfair medical and social burdens on librarians who are not trained emergency responders."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "Although Sarah validly notes that librarians are educators rather than paramedic responders, I strongly support Michael's proposal to mobilize public libraries as primary neighborhood cooling sanctuaries.\n\nConstructing separate emergency shelters entails exorbitant operational costs and lengthy transit times for vulnerable demographics. In stark contrast, branch libraries already exist in nearly every neighborhood within easy walking distance. They feature heavy industrial air conditioning, potable water, electrical outlets, and dignified seating. Because libraries are familiar community hubs, low-income seniors and unhoused families enter freely without experiencing the social stigma frequently associated with municipal homeless shelters. To prevent staff exhaustion, cities should simply dispatch public health aides to monitor vulnerable visitors during peak afternoon heatwaves. Utilizing existing public buildings is a fiscally responsible, life-saving climate adaptation strategy.",
        "wordCount": 128,
        "vocabularyHighlights": [
            {
                "term": "cooling sanctuaries",
                "meaning": "điểm trú nắng / nơi hạ nhiệt an toàn cho cộng đồng",
                "contextInEssay": "mobilize public libraries as primary neighborhood cooling sanctuaries"
            },
            {
                "term": "exorbitant operational costs",
                "meaning": "chi phí vận hành đắt đỏ, tốn kém",
                "contextInEssay": "Constructing separate emergency shelters entails exorbitant operational costs"
            },
            {
                "term": "potable water",
                "meaning": "nước sạch có thể uống trực tiếp",
                "contextInEssay": "They feature heavy industrial air conditioning, potable water, electrical outlets"
            },
            {
                "term": "climate adaptation strategy",
                "meaning": "chiến lược thích ứng với biến đổi khí hậu",
                "contextInEssay": "is a fiscally responsible, life-saving climate adaptation strategy"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận gánh nặng cho thủ thư do Sarah chỉ ra, ủng hộ Michael biến thư viện thành điểm hạ nhiệt khẩn cấp.\n• Ưu điểm mạng lưới sẵn có: Thư viện có mặt ở mọi ngõ ngách, người già đi bộ tới được, sẵn máy lạnh công suất lớn và nước uống.\n• Xóa bỏ mặc cảm xã hội: Không gian thư viện thân thiện, văn minh, người nghèo vào ngồi đọc sách tránh sốc nhiệt mà không bị kỳ thị.\n• Giải pháp hỗ trợ: Thành phố cử nhân viên y tế cộng đồng túc trực phụ giúp thủ thư vào những ngày nắng nóng đỉnh điểm."
    },

    # 155: Neighborhood Noise Rules
    {
        "id": "sample_discussion_generated_155",
        "type": "discussion",
        "title": "Neighborhood Noise Rules",
        "topicCategory": "Community & Civic Life",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Professor Rafael Diaz",
            "professorTitle": "Professor of Urban Policy",
            "professorQuestion": "Urban density often generates conflict over noise. Should municipal authorities strictly enforce evening residential noise curfews, or should cities offer flexible noise exemptions for cultural festivals, concerts, and weekend neighborhood social gatherings?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Strict noise limits are essential for public health. Chronic evening noise ruins sleep quality, spikes cardiovascular stress, and prevents working parents and children from resting."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Excessive quiet turns cities into sterile, lifeless dormitory zones. Vibrant communities need occasional street music festivals and cultural celebrations to build social cohesion."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Sarah is correct that vibrant street music and communal celebrations foster neighborhood solidarity, I side with Michael that strict baseline evening noise regulations are paramount for public well-being.\n\nQuality sleep is not a disposable luxury; it is a fundamental biological prerequisite for mental health, worker productivity, and childhood development. Chronic acoustic pollution from late-night parties and blaring sound systems elevates hypertension, aggravates anxiety, and disrupts shift workers who need quiet early rest. Allowing unregulated exemptions turns residential neighborhoods into chaotic party corridors where neighbors resent each other. Cities can readily balance cultural vitality and tranquility by permitting outdoor acoustic festivals exclusively on weekend afternoons while strictly enforcing decibel limits and quiet hours after ten o'clock at night. Protecting restorative sleep preserves neighborhood health without extinguishing cultural life.",
        "wordCount": 128,
        "vocabularyHighlights": [
            {
                "term": "baseline evening noise regulations",
                "meaning": "các quy chuẩn khống chế tiếng ồn cơ bản vào buổi tối",
                "contextInEssay": "strict baseline evening noise regulations are paramount for public well-being"
            },
            {
                "term": "biological prerequisite",
                "meaning": "tiền đề sinh học thiết yếu, không thể thiếu",
                "contextInEssay": "fundamental biological prerequisite for mental health"
            },
            {
                "term": "chronic acoustic pollution",
                "meaning": "ô nhiễm tiếng ồn kinh niên, kéo dài",
                "contextInEssay": "Chronic acoustic pollution from late-night parties and blaring sound systems"
            },
            {
                "term": "restorative sleep",
                "meaning": "giấc ngủ phục hồi sức khỏe trọn vẹn",
                "contextInEssay": "Protecting restorative sleep preserves neighborhood health"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Tôn trọng ý kiến lễ hội vui vẻ của Sarah, nghiêng về Michael khẳng định quy định giới hạn tiếng ồn là ưu tiên số một.\n• Tác hại sức khỏe: Giấc ngủ là nhu cầu sinh học cốt tử; tiếng ồn nửa đêm gây căng thẳng, cao huyết áp và mất tập trung ngày hôm sau.\n• Ngăn ngừa xung đột: Không có luật nghiêm, khu dân cư sẽ biến thành nơi mở nhạc ồn ào triền miên gây cãi vã xích mích.\n• Khung giờ hợp lý: Cho phép lễ hội ngoài trời vào chiều thứ Bảy, nhưng sau 10 giờ đêm phải tuyệt đối tuân thủ giờ giới nghiêm âm thanh."
    },

    # 156: Youth Seats on City Councils
    {
        "id": "sample_discussion_generated_156",
        "type": "discussion",
        "title": "Youth Seats on City Councils",
        "topicCategory": "Community & Civic Life",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Professor Rafael Diaz",
            "professorTitle": "Professor of Urban Policy",
            "professorQuestion": "Municipal decisions regarding parks, schools, and transit directly affect young people, yet city councils are almost exclusively older adults. Should city councils establish designated advisory seats for teenagers, or should elected adult officials retain sole governing responsibility?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Youth seats inject fresh perspectives into local government. Young people understand skatepark needs, student bus routes, and digital libraries better than elderly politicians."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Advisory youth seats are symbolic tokenism. Teenagers lack the legal, financial, and administrative experience required to navigate complex zoning laws and multi-million-dollar municipal budgets."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "Although Sarah realistically observes that teenagers lack the technical legal training to draft municipal bonding measures, I agree with Michael that appointing youth advisory representatives on city councils is immensely worthwhile.\n\nLocal governance frequently suffers from generational blind spots. Elderly council members rarely ride late-night municipal buses, utilize skateparks, or navigate digital youth centers. Giving teenagers a formal advisory microphone ensures that city policies directly address the lived realities of upcoming generations. Furthermore, serving on municipal advisory boards transforms civics from an abstract textbook subject into hands-on public service. Young delegates learn parliamentary debate, negotiate consensus, and develop civic maturity. While final legislative voting authority naturally remains with elected adult officials, incorporating youth advisory seats democratizes decision-making and prepares enthusiastic future civic leaders.",
        "wordCount": 126,
        "vocabularyHighlights": [
            {
                "term": "generational blind spots",
                "meaning": "những điểm mù nhận thức giữa các thế hệ",
                "contextInEssay": "governance frequently suffers from generational blind spots"
            },
            {
                "term": "lived realities",
                "meaning": "trải nghiệm thực tế đời thường",
                "contextInEssay": "directly address the lived realities of upcoming generations"
            },
            {
                "term": "hands-on public service",
                "meaning": "hoạt động phục vụ cộng đồng thực tế, trực tiếp",
                "contextInEssay": "transforms civics from an abstract textbook subject into hands-on public service"
            },
            {
                "term": "negotiate consensus",
                "meaning": "thương lượng để đạt được sự đồng thuận chung",
                "contextInEssay": "learn parliamentary debate, negotiate consensus, and develop civic maturity"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận việc thiếu chuyên môn pháp lý của giới trẻ theo Sarah, tán thành Michael lập ghế cố vấn thanh thiếu niên.\n• Xóa điểm mù chính sách: Các đại biểu lớn tuổi ít khi đi xe buýt học sinh hay dùng khu trượt ván; thanh thiếu niên hiểu rõ nhu cầu của mình nhất.\n• Giáo dục công dân thực chiến: Biến bài học chính trị lý thuyết thành trải nghiệm tranh luận, đàm phán và xây dựng giải pháp thực tế.\n• Phân định quyền lực rõ ràng: Giới trẻ cố vấn và đề xuất sáng kiến, còn quyền biểu quyết ngân sách tối hậu vẫn thuộc về các đại biểu đắc cử."
    },

    # 157: Public Restrooms Downtown
    {
        "id": "sample_discussion_generated_157",
        "type": "discussion",
        "title": "Public Restrooms Downtown",
        "topicCategory": "Community & Civic Life",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Professor Rafael Diaz",
            "professorTitle": "Professor of Urban Policy",
            "professorQuestion": "Downtown retail districts often suffer from a severe shortage of public restrooms. Should municipalities invest public capital into building automated, accessible street toilets, or should cities instead incentivize private cafes and shops to open their restrooms to non-customers?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Cities must build dedicated public restrooms. Sanitation is a basic human right, and relying on private cafes unfairly forces people to purchase coffee just to use a toilet."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Standalone public restrooms are notorious maintenance nightmares prone to vandalism. Offering tax rebates to local cafes to welcome the public is far cheaper and cleaner."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Sarah sensibly points out that subsidizing existing cafes avoids heavy municipal plumbing outlays, I share Michael's conviction that downtown public restrooms must be provided as genuine civic infrastructure.\n\nRestroom access is a fundamental biological necessity and public hygiene imperative. Forcing unhoused individuals, budget-conscious tourists, pregnant women, and elderly citizens to purchase five-dollar lattes merely to access a sink is deeply exclusionary. When public options are absent, sidewalks inevitably become contaminated, damaging downtown commerce and dignity. Modern self-cleaning automated toilets successfully counter maintenance issues through tamper-resistant stainless steel and automatic timed disinfection cycles. Furthermore, municipal facilities guarantee wheelchair accessibility and diaper-changing tables that cramped private cafes routinely lack. Investing in municipal public toilets maintains sanitary downtown pavements and upholds universal human dignity.",
        "wordCount": 126,
        "vocabularyHighlights": [
            {
                "term": "civic infrastructure",
                "meaning": "cơ sở hạ tầng công cộng thiết yếu của đô thị",
                "contextInEssay": "must be provided as genuine civic infrastructure"
            },
            {
                "term": "public hygiene imperative",
                "meaning": "yêu cầu cấp bách về vệ sinh dịch tễ cộng đồng",
                "contextInEssay": "biological necessity and public hygiene imperative"
            },
            {
                "term": "tamper-resistant stainless steel",
                "meaning": "thép không gỉ chống phá hoại / chống cạy phá",
                "contextInEssay": "through tamper-resistant stainless steel and automatic timed disinfection cycles"
            },
            {
                "term": "universal human dignity",
                "meaning": "nhân phẩm phổ quát của con người",
                "contextInEssay": "maintains sanitary downtown pavements and upholds universal human dignity"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận giải pháp hỗ trợ quán cà phê của Sarah, đồng thuận với Michael rằng nhà vệ sinh công cộng là hạ tầng bắt buộc.\n• Vấn đề công bằng xã hội: Ép người vô gia cư, người già, phụ nữ mang thai phải mua ly cà phê đắt đỏ chỉ để đi vệ sinh là bất công.\n• Giữ gìn vệ sinh đường phố: Thiếu nhà vệ sinh khiến hè phố bốc mùi hôi thối, làm xấu bộ mặt trung tâm thương mại thành phố.\n• Công nghệ hiện đại: Các buồng vệ sinh tự rửa bằng thép không gỉ giải quyết triệt để vấn đề vệ sinh và đảm bảo tiếp cận cho xe lăn."
    },

    # 158: Neighborhood Tool Libraries
    {
        "id": "sample_discussion_generated_158",
        "type": "discussion",
        "title": "Neighborhood Tool Libraries",
        "topicCategory": "Community & Civic Life",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Professor Rafael Diaz",
            "professorTitle": "Professor of Urban Policy",
            "professorQuestion": "Home improvement tools like pressure washers and drills sit idle ninety-five percent of the time. Should municipal governments establish free community tool-lending libraries, or should tool sharing be left entirely to private hardware rental stores?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Community tool libraries save working families hundreds of dollars, reduce wasteful manufacturing, and empower tenants to repair their own living spaces affordably."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Free tool libraries compete unfairly with local hardware shops. Untrained borrowers will also break delicate machinery or suffer injuries from hazardous power tools."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "Although Sarah raises valid cautions regarding equipment damage and safety liability, I firmly support Michael's view that municipal tool-lending libraries provide exceptional community value.\n\nMost specialized home repair tools—such as tile saws, lawn aerators, and extension ladders—are prohibitively expensive yet used only once or twice a year. Buying individual tools strains household budgets and clutters small apartments with redundant plastic and metal. A public tool library operates just like a book repository: neighbors borrow equipment for weekend maintenance, return it on Monday, and learn hands-on home repair skills. Tool libraries frequently partner with retired carpenters to provide fifteen-minute safety orientations, effectively mitigating accident risks. By democratizing access to expensive machinery, cities foster self-reliance, reduce consumer waste, and help neighborhoods keep their homes well-maintained and aesthetically pleasing.",
        "wordCount": 130,
        "vocabularyHighlights": [
            {
                "term": "tool-lending libraries",
                "meaning": "thư viện cho mượn dụng cụ sửa chữa nhà cửa miễn phí",
                "contextInEssay": "municipal tool-lending libraries provide exceptional community value"
            },
            {
                "term": "prohibitively expensive",
                "meaning": "đắt đỏ quá mức so với khả năng chi trả",
                "contextInEssay": "are prohibitively expensive yet used only once or twice a year"
            },
            {
                "term": "redundant plastic and metal",
                "meaning": "đồ kim loại và nhựa thừa thãi gây lãng phí diện tích",
                "contextInEssay": "clutters small apartments with redundant plastic and metal"
            },
            {
                "term": "democratizing access",
                "meaning": "bình dân hóa / phổ cập quyền tiếp cận cho mọi người",
                "contextInEssay": "By democratizing access to expensive machinery, cities foster self-reliance"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Thừa nhận lo ngại an toàn khi dùng máy móc của Sarah, đứng về phía Michael ủng hộ mô hình thư viện mượn dụng cụ.\n• Chống lãng phí kinh tế: Các thiết bị như máy cắt gạch, thang cao mua rất đắt nhưng cả năm chỉ dùng 1-2 lần; dùng chung tiết kiệm diện tích nhà.\n• Nâng cao kỹ năng tự sửa chữa: Người dân có đồ để tự tôn tạo nhà cửa mà không tốn tiền triệu thuê thợ ngoài.\n• Đảm bảo an toàn: Thư viện có thể nhờ thợ mộc hưu trí hướng dẫn 15 phút trước khi cho mượn máy, vừa an toàn vừa gắn kết tình làng nghĩa xóm."
    },

    # 159: Public Wi-Fi
    {
        "id": "sample_discussion_generated_159",
        "type": "discussion",
        "title": "Public Wi-Fi",
        "topicCategory": "Community & Civic Life",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Professor Rafael Diaz",
            "professorTitle": "Professor of Urban Policy",
            "professorQuestion": "Reliable digital connectivity has become essential for employment, education, and public services. Should cities deploy free municipal Wi-Fi networks in public parks and plazas, or should public subsidies focus exclusively on subsidizing in-home broadband for low-income families?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Outdoor public Wi-Fi bridges the digital divide for gig workers, unhoused individuals, and students who lack steady internet, while activating downtown public spaces."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Park Wi-Fi is spotty, vulnerable to cyber theft, and useless in bad weather. Subsidizing private fiber-optic internet directly inside people's homes delivers far greater educational value."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Sarah makes a compelling argument that domestic fiber connections provide a more secure environment for remote schooling, I agree with Michael that free municipal Wi-Fi in public spaces is an essential civic asset.\n\nRestricting digital subsidies exclusively to fixed home broadband excludes thousands of vulnerable urban residents, including unhoused individuals, migrant workers, and students with turbulent domestic lives who study in public squares. High-speed public Wi-Fi enables delivery couriers to accept shifts, job seekers to check employment portals, and transit commuters to access bus timetables in real time. Moreover, vibrant digital plazas encourage citizens to work outside, revitalizing downtown commerce as connected park visitors frequent neighboring kiosks and cafes. By implementing modern encryption protocols to prevent cyber vulnerabilities, municipal outdoor networks provide a reliable, inclusive digital lifeline across the urban fabric.",
        "wordCount": 133,
        "vocabularyHighlights": [
            {
                "term": "fixed home broadband",
                "meaning": "đường truyền internet cáp quang cố định tại nhà",
                "contextInEssay": "Restricting digital subsidies exclusively to fixed home broadband excludes thousands"
            },
            {
                "term": "vulnerable urban residents",
                "meaning": "cư dân đô thị yếu thế / có hoàn cảnh bấp bênh",
                "contextInEssay": "excludes thousands of vulnerable urban residents"
            },
            {
                "term": "inclusive digital lifeline",
                "meaning": "chiếc phao cứu sinh kỹ thuật số bao trùm, không bỏ rơi ai",
                "contextInEssay": "provide a reliable, inclusive digital lifeline across the urban fabric"
            },
            {
                "term": "revitalizing downtown commerce",
                "meaning": "hồi sinh hoạt động thương mại khu vực trung tâm",
                "contextInEssay": "revitalizing downtown commerce as connected park visitors frequent neighboring kiosks"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Đồng ý với Sarah về độ bảo mật của mạng tại nhà, nhưng ủng hộ Michael phủ Wi-Fi miễn phí nơi công cộng.\n• Không bỏ rơi người yếu thế: Mạng gia đình không tới tay người vô gia cư, tài xế công nghệ hay lao động tự do di chuyển ngoài đường.\n• Tiện ích công cộng tức thì: Giúp người dân tra cứu việc làm, xem lịch xe buýt và hỗ trợ công việc của người giao hàng ngoài phố.\n• Kích cầu kinh tế & an toàn: Khách ngồi làm việc ngoài công viên ghé mua nước ở tiệm lân cận; cài đặt mã hóa bảo mật giải quyết âu lo an ninh mạng."
    },

    # 160: Local Festivals and Residents
    {
        "id": "sample_discussion_generated_160",
        "type": "discussion",
        "title": "Local Festivals and Residents",
        "topicCategory": "Community & Civic Life",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Professor Rafael Diaz",
            "professorTitle": "Professor of Urban Policy",
            "professorQuestion": "Annual street festivals attract thousands of tourists but cause traffic gridlock, street litter, and loud noise for local residents. Should municipalities continue expanding large-scale downtown cultural festivals, or should cities cap attendance and curtail festival permits to preserve neighborhood tranquility?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Festivals are economic and cultural powerhouses. They inject millions into small restaurants and retail shops while celebrating local heritage and unifying diverse neighbors."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Overcrowded festivals displace long-term residents. Blocked driveways, mountains of trash, and rowdy crowds disrupt everyday life and place heavy cleanup costs on local taxpayers."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Sarah rightfully underscores that excessive litter and traffic congestion disrupt daily routines for residents, I side with Michael that municipal cultural festivals provide indispensable community and economic vitality.\n\nUrban neighborhoods thrive when their streets function as communal living rooms rather than mere automotive thoroughfares. Street festivals provide an invaluable launchpad for mom-and-pop restaurants, craft artisans, and musical performers who cannot afford expensive commercial leases. Furthermore, these joyous gatherings weave social capital, bringing longtime elders and new immigrant families together over shared food and music. Rather than banning or downsizing beloved events, city halls should enforce robust organizational standards. Levying small vendor cleanup fees funds dedicated sanitation crews to sweep streets immediately after midnight, and rerouting shuttle buses prevents traffic bottlenecks. Thoughtful event management celebrates local culture while respecting neighborhood comfort.",
        "wordCount": 133,
        "vocabularyHighlights": [
            {
                "term": "communal living rooms",
                "meaning": "không gian sinh hoạt chung ấm cúng của cả cộng đồng",
                "contextInEssay": "streets function as communal living rooms rather than mere automotive thoroughfares"
            },
            {
                "term": "weave social capital",
                "meaning": "dệt nên / xây đắp nguồn vốn xã hội và sự thấu cảm",
                "contextInEssay": "these joyous gatherings weave social capital, bringing longtime elders"
            },
            {
                "term": "mom-and-pop restaurants",
                "meaning": "các quán ăn gia đình nhỏ lẻ tại địa phương",
                "contextInEssay": "invaluable launchpad for mom-and-pop restaurants, craft artisans"
            },
            {
                "term": "traffic bottlenecks",
                "meaning": "tình trạng nút thắt cổ chai gây ùn tắc giao thông",
                "contextInEssay": "rerouting shuttle buses prevents traffic bottlenecks"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận sự phiền toái về rác và tắc đường của Sarah, đồng ý với Michael duy trì và tổ chức lễ hội đường phố.\n• Động lực kinh tế: Lễ hội là cơ hội vàng cho các quán ăn nhỏ, thợ thủ công địa phương buôn bán mà không lo tiền thuê mặt bằng đắt đỏ.\n• Gắn kết văn hóa: Kéo các thế hệ cư dân cũ và người mới chuyển đến cùng hòa nhập qua ẩm thực và âm nhạc truyền thống.\n• Giải pháp quản trị đô thị: Thu một khoản phí dọn dẹp nhỏ từ các gian hàng để điều động đội vệ sinh quét sạch ngay trong đêm, kèm xe buýt đưa đón."
    },

    # 161: Intramural Sports Fees
    {
        "id": "sample_discussion_generated_161",
        "type": "discussion",
        "title": "Intramural Sports Fees",
        "topicCategory": "Sports & Recreation",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Dr. Clara Huang",
            "professorTitle": "Professor of Kinesiology and Recreation",
            "professorQuestion": "University intramural sports leagues promote student health and social bonding, but officiating and equipment require funding. Should universities eliminate all participation fees to make intramural leagues completely free, or should participants pay modest registration fees to cover operational expenses?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Intramurals should be completely free. Even nominal twenty-dollar fees deter low-income students from playing basketball or soccer, widening campus health inequities."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Charging modest fees ensures commitment. When leagues are totally free, students sign up carelessly and fail to show up, ruining scheduled matches for responsible teams."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "Although Sarah insightfully points out that zero registration costs can lead to casual forfeits and ruined schedules, I firmly agree with Michael that university intramural sports leagues should be free for all students.\n\nPhysical fitness and stress relief are vital components of academic wellness, not luxury amenities. Many students already struggle with soaring textbook costs and meal plans; imposing upfront fees on volleyball or soccer leagues erects unnecessary economic barriers that discourage underprivileged students from staying active. Furthermore, physical team sports create spontaneous, interdisciplinary friendships that break down social isolation on sprawling campuses. To solve Sarah's forfeit concern, universities do not need financial barriers; they can simply institute a deposit system where teams deposit twenty dollars that is fully refunded upon completing their season games. Free recreational sports ensure that wellness remains universally accessible to all undergraduates.",
        "wordCount": 133,
        "vocabularyHighlights": [
            {
                "term": "intramural sports leagues",
                "meaning": "các giải đấu thể thao nội bộ giữa các khoa / lớp trong trường đại học",
                "contextInEssay": "university intramural sports leagues should be free for all students"
            },
            {
                "term": "interdisciplinary friendships",
                "meaning": "tình bạn liên ngành giữa sinh viên các khoa khác nhau",
                "contextInEssay": "create spontaneous, interdisciplinary friendships that break down social isolation"
            },
            {
                "term": "casual forfeits",
                "meaning": "việc bỏ giải giữa chừng tùy tiện vì không mất phí",
                "contextInEssay": "zero registration costs can lead to casual forfeits and ruined schedules"
            },
            {
                "term": "refundable deposit system",
                "meaning": "cơ chế đặt cọc có hoàn trả khi hoàn thành đầy đủ",
                "contextInEssay": "institute a deposit system where teams deposit twenty dollars that is fully refunded"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận tình trạng bỏ trận giữa chừng mà Sarah lo ngại, đứng về phía Michael ủng hộ miễn phí giải đấu sinh viên.\n• Sức khỏe tinh thần & rào cản học phí: Sinh viên đã gánh nặng tiền trọ và sách vở; thu thêm tiền chơi bóng rổ sẽ loại trừ các bạn có hoàn cảnh khó khăn.\n• Giá trị kết nối: Thể thao nội bộ giúp giải tỏa áp lực thi cử và kết nối bạn bè các khoa viện lại với nhau.\n• Cơ chế thông minh: Áp dụng cơ chế tiền cọc hoàn lại 100% khi đá đủ các trận để ngăn chặn bỏ giải mà không tước đoạt cơ hội của sinh viên nghèo."
    },

    # 162: Competitive Youth Sports
    {
        "id": "sample_discussion_generated_162",
        "type": "discussion",
        "title": "Competitive Youth Sports",
        "topicCategory": "Sports & Recreation",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Dr. Clara Huang",
            "professorTitle": "Professor of Kinesiology and Recreation",
            "professorQuestion": "Youth sports leagues have become increasingly professionalized and intensely competitive. Should school athletic programs prioritize elite competitive traveling teams, or should schools focus their resources on inclusive, non-competitive intramural recreation for all children?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Elite competitive sports teach grit, discipline, and teamwork under pressure, paving pathways for college athletic scholarships and professional sporting careers."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Hyper-competitive leagues cause childhood burnout, repetitive strain injuries, and severe anxiety. School sports should prioritize fun, physical health, and lifelong movement for everyone."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Michael accurately observes that competitive tournaments instill discipline and high athletic prowess, I strongly align with Sarah's stance that school athletic programs should prioritize inclusive, non-competitive recreation.\n\nThe foundational mission of school physical education is cultivating lifelong healthy habits for the entire student body, not grooming an elite two percent for professional contracts. When athletic budgets funnel predominantly into traveling varsity squads, late-blooming children and uncoordinated students are cut from teams and discouraged from exercising altogether. Even worse, hyper-competitive youth leagues frequently cause overuse bone fractures and psychological burnout from relentless parental pressure. By emphasizing cooperative games, equal playing time, and enjoyable recreational activities, schools ensure every child develops cardiovascular fitness and motor confidence. Fostering a welcoming athletic environment builds enduring wellness habits that benefit students long after graduation.",
        "wordCount": 132,
        "vocabularyHighlights": [
            {
                "term": "foundational mission",
                "meaning": "sứ mệnh nền tảng, cốt lõi",
                "contextInEssay": "The foundational mission of school physical education is cultivating lifelong healthy habits"
            },
            {
                "term": "late-blooming children",
                "meaning": "những đứa trẻ phát triển thể chất muộn hơn bạn đồng trang lứa",
                "contextInEssay": "late-blooming children and uncoordinated students are cut from teams"
            },
            {
                "term": "overuse bone fractures",
                "meaning": "chấn thương rạn nứt xương do thi đấu quá tải",
                "contextInEssay": "youth leagues frequently cause overuse bone fractures and psychological burnout"
            },
            {
                "term": "motor confidence",
                "meaning": "sự tự tin vào khả năng vận động cơ thể",
                "contextInEssay": "every child develops cardiovascular fitness and motor confidence"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Thừa nhận tinh thần kỷ luật từ thi đấu đỉnh cao của Michael, ủng hộ Sarah chú trọng thể thao đại chúng học đường.\n• Mục tiêu giáo dục thể chất: Trường học cần xây dựng thói quen rèn luyện cho 100% học sinh chứ không phải đào tạo gà nòi cho 2% tài năng đặc biệt.\n• Hệ lụy của ganh đua sớm: Trẻ bị loại sớm sinh ra tự ti, sợ vận động; các giải đấu khốc liệt dễ gây chấn thương xương khớp và kiệt sức tinh thần.\n• Hướng tới sự bền bỉ: Thể thao hòa nhập, bình đẳng thời gian ra sân giúp mọi đứa trẻ tự tin vận động suốt đời."
    },

    # 163: Public Pools
    {
        "id": "sample_discussion_generated_163",
        "type": "discussion",
        "title": "Public Pools",
        "topicCategory": "Sports & Recreation",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Dr. Clara Huang",
            "professorTitle": "Professor of Kinesiology and Recreation",
            "professorQuestion": "Municipal swimming pools are costly to operate, requiring lifeguards, chemical filtration, and heating. Should city governments invest public tax dollars into building and subsidizing public swimming pools, or should cities prioritize less costly recreation facilities like jogging paths and sports courts?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Public pools are indispensable. Swimming is a critical life-saving skill that prevents drownings, and pool facilities provide vital joint-friendly cardio exercise for elderly residents."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Pools are financial money pits that drain municipal budgets. Basketball courts and open running tracks serve ten times more residents at a fraction of the maintenance cost."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "Although Sarah makes a prudent fiscal argument that open running tracks and outdoor sports courts boast far cheaper construction and maintenance overhead, I side with Michael that municipal public pools are irreplaceable public assets.\n\nFirst and foremost, aquatic facilities fulfill a critical life safety mandate: drowning remains a leading cause of accidental childhood mortality, and public pools provide affordable swimming lessons to children whose families cannot afford private country clubs. Furthermore, swimming offers unique low-impact cardiovascular exercise essential for pregnant women, recovering patients, and seniors suffering from arthritic joints who cannot jog on hard pavement. During sweltering summer heatwaves, community pools also serve as vital neighborhood cooling sanctuaries that protect vulnerable families from heatstroke. While expensive, municipal pools deliver vital life-saving survival skills and equitable health benefits that dry athletic courts simply cannot replicate.",
        "wordCount": 133,
        "vocabularyHighlights": [
            {
                "term": "aquatic facilities",
                "meaning": "các cơ sở bể bơi và thể thao dưới nước",
                "contextInEssay": "aquatic facilities fulfill a critical life safety mandate"
            },
            {
                "term": "low-impact cardiovascular exercise",
                "meaning": "bài tập tim mạch ít gây áp lực va đập lên xương khớp",
                "contextInEssay": "swimming offers unique low-impact cardiovascular exercise"
            },
            {
                "term": "arthritic joints",
                "meaning": "các khớp xương bị đau viêm thoái hóa ở người cao tuổi",
                "contextInEssay": "seniors suffering from arthritic joints who cannot jog on hard pavement"
            },
            {
                "term": "equitable health benefits",
                "meaning": "lợi ích sức khỏe công bằng cho mọi tầng lớp",
                "contextInEssay": "deliver vital life-saving survival skills and equitable health benefits"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận phân tích tài chính tiết kiệm của Sarah về sân chạy bộ, đồng thuận với Michael rằng hồ bơi công cộng là thiết yếu.\n• Kỹ năng sinh tồn chống đuối nước: Hồ bơi công cộng dạy bơi giá rẻ cho trẻ em nghèo, giảm thiểu tai nạn đuối nước thương tâm.\n• Thể thao cho người già: Bơi lội không dằn xóc khớp, là môn tập lý tưởng cho người thoái hóa khớp, phụ nữ có thai và người phục hồi chấn thương.\n• Nơi tránh nóng mùa hè: Hồ bơi là điểm giải nhiệt quan trọng trong các đợt nắng nóng gay gắt, điều mà sân bóng rổ không làm được."
    },

    # 164: Exercise Credit at University
    {
        "id": "sample_discussion_generated_164",
        "type": "discussion",
        "title": "Exercise Credit at University",
        "topicCategory": "Sports & Recreation",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Dr. Clara Huang",
            "professorTitle": "Professor of Kinesiology and Recreation",
            "professorQuestion": "College students face high rates of sedentary behavior and mental stress. Should universities award academic course credits for physical activity classes like yoga, swimming, or weight training, or should physical exercise remain an uncredited personal extracurricular hobby?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Awarding academic credit incentivizes students to prioritize workouts amidst demanding course loads, improving their sleep, cognitive sharpness, and overall collegiate mental health."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "University degrees should reflect rigorous intellectual mastery. Diluting academic diplomas with grades for jogging or lifting weights undermines higher education standards."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Sarah expresses understandable concern about preserving academic rigor in university coursework, I share Michael's view that offering academic credits for structured physical education provides tremendous collegiate benefits.\n\nModern undergraduates endure intense academic pressure and spend up to ten hours daily sitting hunched over laptop screens. When exercise carries zero course credit, time-crunched students inevitably sacrifice physical activity to cram for exams, resulting in chronic fatigue and clinical anxiety. Granting one or two elective credits for physical kinesiology classes validates wellness as a necessary foundation for cognitive function. Structured courses also teach proper ergonomic lifting form, cardiovascular conditioning, and mindful breathing under qualified athletic instructors. Offering graded or pass/fail physical education credits does not diminish intellectual rigor; rather, it empowers students to build balanced lifestyle habits that boost mental focus and academic stamina.",
        "wordCount": 133,
        "vocabularyHighlights": [
            {
                "term": "structured physical education",
                "meaning": "giáo dục thể chất có giáo trình bài bản",
                "contextInEssay": "offering academic credits for structured physical education provides tremendous collegiate benefits"
            },
            {
                "term": "cardiovascular conditioning",
                "meaning": "sự rèn luyện và tăng cường sức bền hệ tim mạch",
                "contextInEssay": "teach proper ergonomic lifting form, cardiovascular conditioning, and mindful breathing"
            },
            {
                "term": "cognitive function",
                "meaning": "chức năng nhận thức và sự tập trung của não bộ",
                "contextInEssay": "validates wellness as a necessary foundation for cognitive function"
            },
            {
                "term": "academic stamina",
                "meaning": "sức bền và sự dẻo dai trong học tập",
                "contextInEssay": "empowers students to build balanced lifestyle habits that boost mental focus and academic stamina"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Chia sẻ trăn trở về độ hàn lâm của Sarah, nhưng tán đồng Michael rằng tính tín chỉ thể chất là cực kỳ cần thiết.\n• Thực trạng sinh viên ngồi nhiều: Áp lực thi cử khiến sinh viên ngồi lì trước máy tính cả ngày, bỏ bê vận động dẫn đến kiệt sức và lo âu.\n• Khích lệ thực chất: Có tín chỉ sẽ giúp sinh viên mạnh dạn sắp xếp thời gian đi tập bơi, tập gym mà không sợ ảnh hưởng tiến độ học.\n• Lợi ích kép: Rèn luyện cơ thể giúp máu lưu thông lên não tốt hơn, gia tăng sức bền để tiếp thu kiến thức học thuật hiệu quả hơn."
    },

    # 165: Sports Facilities After Hours
    {
        "id": "sample_discussion_generated_165",
        "type": "discussion",
        "title": "Sports Facilities After Hours",
        "topicCategory": "Sports & Recreation",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Dr. Clara Huang",
            "professorTitle": "Professor of Kinesiology and Recreation",
            "professorQuestion": "Many public school gymnasiums, athletic tracks, and soccer fields sit locked and empty after 3:00 PM and on weekends. Should school districts unlock their sports facilities for neighborhood public use after school hours, or should schools keep facilities strictly locked to protect school property?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Schools belong to the community. Opening tracks and basketball courts in the evenings promotes public health and provides neighborhood youth with safe, positive recreation spaces."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Opening campuses after hours invites vandalism, equipment damage, and liability lawsuits. Schools lack the janitorial staff and security to monitor unsupervised public crowds."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "Although Sarah raises valid concerns regarding property damage and the scarcity of evening custodial staffing, I strongly support Michael's proposal to open school athletic facilities to neighborhood residents after hours.\n\nPublic schools are financed directly through local taxpayer dollars. Locking pristine soccer fields, running tracks, and basketball gymnasiums behind barbed wire every afternoon while local neighborhoods suffer from a severe shortage of recreation spaces is an inefficient waste of public infrastructure. Opening these outdoor facilities provides local teenagers with constructive, healthy outlets that keep them off street corners and away from illicit temptations. Furthermore, cities can easily alleviate school liability and cleanup concerns by entering joint-use agreements with municipal parks departments, which provide security monitoring and routine groundskeeping. Unlocking school gates transforms dormant schoolyards into vibrant community health hubs.",
        "wordCount": 130,
        "vocabularyHighlights": [
            {
                "term": "taxpayer dollars",
                "meaning": "tiền thuế đóng góp của người dân địa phương",
                "contextInEssay": "financed directly through local taxpayer dollars"
            },
            {
                "term": "joint-use agreements",
                "meaning": "thỏa thuận đồng sử dụng và quản lý chung giữa các cơ quan",
                "contextInEssay": "entering joint-use agreements with municipal parks departments"
            },
            {
                "term": "constructive, healthy outlets",
                "meaning": "những sân chơi lành mạnh, hữu ích để giải tỏa năng lượng",
                "contextInEssay": "provides local teenagers with constructive, healthy outlets"
            },
            {
                "term": "dormant schoolyards",
                "meaning": "sân trường bị khóa kín, bỏ không lãng phí",
                "contextInEssay": "transforms dormant schoolyards into vibrant community health hubs"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận âu lo về rác và phá hoại tài sản của Sarah, đứng về phía Michael ủng hộ mở cửa sân thể thao trường học buổi tối.\n• Tránh lãng phí tiền thuế: Cơ sở vật chất trường học xây từ tiền thuế dân; khóa kín hàng rào lúc 3 giờ chiều trong khi khu phố thiếu sân chơi là lãng phí.\n• Sân chơi lành mạnh cho thanh thiếu niên: Có sân bóng rổ, đường chạy mở cửa giúp các bạn trẻ tập luyện thể thao, tránh sa đà vào thói hư tật xấu.\n• Cơ chế phối hợp liên ngành: Thành phố có thể ký thỏa thuận cử nhân viên công viên qua bảo vệ và dọn vệ sinh chia sẻ gánh nặng với trường."
    },

    # 166: Nature Trails for Beginners
    {
        "id": "sample_discussion_generated_166",
        "type": "discussion",
        "title": "Nature Trails for Beginners",
        "topicCategory": "Sports & Recreation",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Dr. Clara Huang",
            "professorTitle": "Professor of Kinesiology and Recreation",
            "professorQuestion": "Public parks often face a dilemma when designing hiking routes. Should park authorities invest in wide, paved, gentle nature trails with benches and signage to welcome beginners and families, or should parks preserve rugged, unpaved wilderness trails to protect wildlife habitats?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Accessible, gentle trails encourage sedentary citizens, strollers, and wheelchair users to experience nature, fostering broader public support for environmental conservation."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Paving trails with asphalt and installing electric lights destroys delicate forest ecosystems, causes soil erosion, and drives away shy wildlife species."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Sarah rightly emphasizes the necessity of protecting delicate wilderness habitats from over-development, I side with Michael that parks should build accessible, beginner-friendly nature loops near park entrances.\n\nPeople only protect what they know and cherish. If natural reserves remain exclusively rugged, rocky terrains accessible only to experienced backcountry hikers, the majority of urban dwellers—including seniors, young children, and individuals with limited mobility—remain alienated from nature. Constructing a modest paved or compacted-gravel loop at the forest perimeter allows strollers, wheelchair users, and novice walkers to immerse themselves in greenery safely without trampling off-trail vegetation. Meanwhile, the vast interior wilderness can remain entirely untouched and protected. Designing accessible beginner gateways democratizes outdoor recreation, combats nature-deficit disorders, and cultivates enthusiastic environmental advocates across all demographics.",
        "wordCount": 128,
        "vocabularyHighlights": [
            {
                "term": "accessible, beginner-friendly nature loops",
                "meaning": "đường mòn thiên nhiên dạng vòng khép kín, bằng phẳng cho người mới bắt đầu",
                "contextInEssay": "should build accessible, beginner-friendly nature loops near park entrances"
            },
            {
                "term": "backcountry hikers",
                "meaning": "những người đi bộ đường dài chuyên nghiệp vào rừng sâu hoang dã",
                "contextInEssay": "accessible only to experienced backcountry hikers"
            },
            {
                "term": "off-trail vegetation",
                "meaning": "thảm thực vật tự nhiên bên ngoài lối mòn",
                "contextInEssay": "safely without trampling off-trail vegetation"
            },
            {
                "term": "nature-deficit disorders",
                "meaning": "hội chứng thiếu hụt tiếp xúc với thiên nhiên ở cư dân đô thị",
                "contextInEssay": "democratizes outdoor recreation, combats nature-deficit disorders"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Công nhận giá trị bảo tồn sinh thái của Sarah, ủng hộ Michael làm đường mòn thân thiện cho người mới bắt đầu.\n• Tâm lý yêu thiên nhiên: Muốn dân bảo vệ rừng thì họ phải được trải nghiệm; đường quá gồ ghề hiểm trở sẽ ngăn cản người già, trẻ nhỏ và người đi xe lăn.\n• Phân vùng khôn ngoan: Làm đường rải sỏi êm ái ở ven ngoài cổng để bà con đi dạo không dẫm nát cây cỏ, còn vùng lõi bên trong giữ nguyên rừng nguyên sinh.\n• Lợi ích bền vững: Giúp người dân đô thị giải tỏa ngột ngạt và biến họ thành những người tích cực ủng hộ bảo vệ môi trường."
    },

    # 167: Mixed-Ability Teams
    {
        "id": "sample_discussion_generated_167",
        "type": "discussion",
        "title": "Mixed-Ability Teams",
        "topicCategory": "Sports & Recreation",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Dr. Clara Huang",
            "professorTitle": "Professor of Kinesiology and Recreation",
            "professorQuestion": "When organizing recreational sports leagues for adults and adolescents, should organizers deliberately create mixed-ability teams where skilled players and novices play together, or should leagues group participants strictly into separate skill tiers?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Mixed-ability teams foster mentorship and empathy. Skilled players learn leadership and patience, while beginners improve rapidly by observing experienced teammates."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Tiered leagues create much fairer, more exciting games. Skilled players get frustrated when passing to beginners, and beginners feel embarrassed and intimidated on the court."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "Although Sarah makes a compelling argument that tiered competition ensures evenly balanced matches where skilled athletes feel appropriately challenged, I agree with Michael that recreational leagues should embrace mixed-ability rosters.\n\nRecreational sports exist primarily to build community bonds, encourage fun, and relieve work stress rather than replicate ruthless professional leagues. In strictly tiered formats, beginners often feel stigmatized and abandon sports out of insecurity, while elite divisions turn overly aggressive. Conversely, mixed-ability squads create an enriching environment of peer mentorship. Experienced players naturally assume coaching roles, learning communication and empathy, while novice participants receive patient encouragement in a low-stakes setting. As teammates celebrate collaborative victories regardless of individual athletic prowess, social barriers dissolve. Fostering mixed-ability participation transforms competitive games into cooperative social bridges that welcome everyone to the field.",
        "wordCount": 130,
        "vocabularyHighlights": [
            {
                "term": "mixed-ability rosters",
                "meaning": "danh sách đội hình kết hợp cả người chơi giỏi lẫn người mới bắt đầu",
                "contextInEssay": "recreational leagues should embrace mixed-ability rosters"
            },
            {
                "term": "replicate ruthless professional leagues",
                "meaning": "sao chép sự khốc liệt, ăn thua của các giải đấu nhà nghề",
                "contextInEssay": "relieve work stress rather than replicate ruthless professional leagues"
            },
            {
                "term": "peer mentorship",
                "meaning": "sự dìu dắt, kèm cặp thân thiện giữa các đồng đội",
                "contextInEssay": "mixed-ability squads create an enriching environment of peer mentorship"
            },
            {
                "term": "cooperative social bridges",
                "meaning": "những nhịp cầu xã hội kết nối tinh thần hợp tác",
                "contextInEssay": "transforms competitive games into cooperative social bridges"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận trận đấu cân tài cân sức của Sarah, ủng hộ Michael lập đội hình hòa trộn trình độ trong thể thao phong trào.\n• Mục đích phong trào: Chơi vui, giải tỏa áp lực và gắn kết tình bạn; phân tầng quá khắt khe sẽ khiến người mới tự ti và bỏ cuộc.\n• Tinh thần nâng đỡ: Người chơi giỏi học được tính kiên nhẫn, chỉ bảo kỹ thuật cho bạn mới, tạo bầu không khí ấm áp không đặt nặng thắng thua.\n• Gắn kết xã hội: Tinh thần đồng đội kéo mọi người xích lại gần nhau, xóa bỏ khoảng cách tuổi tác và đẳng cấp thi đấu."
    },

    # 168: Sports Scholarships
    {
        "id": "sample_discussion_generated_168",
        "type": "discussion",
        "title": "Sports Scholarships",
        "topicCategory": "Sports & Recreation",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Dr. Clara Huang",
            "professorTitle": "Professor of Kinesiology and Recreation",
            "professorQuestion": "Universities spend substantial financial resources funding athletic scholarships for varsity sports recruits. Should universities continue offering athletic scholarships, or should those funds be redirected entirely into need-based academic grants for low-income students?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Athletic scholarships provide life-changing opportunities. Many talented student-athletes from disadvantaged communities would never afford a university education without their athletic talent."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Universities exist for higher academic learning. Awarding tuition money for throwing a football rather than academic excellence or financial hardship warps institutional priorities."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Sarah presents a principled argument that higher education institutions should anchor their core funding strictly around academic merit and financial hardship, I agree with Michael that athletic scholarships remain vital instruments of social mobility.\n\nFor countless talented youths from marginalized backgrounds, athletic excellence serves as the only accessible bridge to higher education. Athletic recruits undergo grueling early morning physical conditioning while maintaining rigorous academic coursework, demonstrating tremendous discipline, perseverance, and time management—qualities directly predictive of professional success. Furthermore, university athletic teams generate school spirit, alumni engagement, and lucrative media licensing that often financially subsidizes other campus programs. Rather than abolishing sports grants, universities should enforce strict academic standards ensuring student-athletes graduate with substantive degrees. Preserving athletic scholarships honors diverse forms of dedication while providing life-altering educational pathways for deserving students.",
        "wordCount": 133,
        "vocabularyHighlights": [
            {
                "term": "instruments of social mobility",
                "meaning": "công cụ thúc đẩy sự thăng tiến và đổi đời trong xã hội",
                "contextInEssay": "athletic scholarships remain vital instruments of social mobility"
            },
            {
                "term": "marginalized backgrounds",
                "meaning": "hoàn cảnh gia đình nghèo khó, yếu thế",
                "contextInEssay": "For countless talented youths from marginalized backgrounds"
            },
            {
                "term": "substantive degrees",
                "meaning": "tấm bằng đại học thực chất và có giá trị nghề nghiệp vững chắc",
                "contextInEssay": "ensuring student-athletes graduate with substantive degrees"
            },
            {
                "term": "life-altering educational pathways",
                "meaning": "những con đường học vấn làm thay đổi cả cuộc đời",
                "contextInEssay": "while providing life-altering educational pathways for deserving students"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận quan điểm giữ gìn tính học thuật của Sarah, đồng tình với Michael rằng học bổng thể thao giúp nhiều sinh viên đổi đời.\n• Cơ hội cho học sinh nghèo: Nhiều bạn trẻ nghèo nhờ năng khiếu bóng đá, điền kinh mới có cơ hội bước chân vào giảng đường đại học danh giá.\n• Rèn luyện phẩm chất quý: Vừa tập luyện đổ mồ hôi vừa thi qua môn giúp vận động viên có tính kỷ luật thép và sức chịu đựng áp lực tuyệt vời.\n• Kết nối và nguồn lực: Đội thể thao mang lại bản sắc trường và thu hút tài trợ; chỉ cần siết chặt chuẩn tốt nghiệp để đảm bảo các em học hành nghiêm túc."
    },

    # 169: Bike Share on Campus
    {
        "id": "sample_discussion_generated_169",
        "type": "discussion",
        "title": "Bike Share on Campus",
        "topicCategory": "Sports & Recreation",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Dr. Clara Huang",
            "professorTitle": "Professor of Kinesiology and Recreation",
            "professorQuestion": "To facilitate student transit across sprawling campuses, should universities invest in a dedicated, subsidized bicycle-sharing fleet, or should administrators allocate funding toward widening pedestrian pathways and covered walkways?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Campus bike-share programs enable students to travel between distant lecture halls in five minutes instead of twenty, while promoting cardiovascular health and zero emissions."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Bike shares result in abandoned bicycles, dangerous sidewalk collisions with pedestrians, and high maintenance costs. Wide walkways benefit every single pedestrian reliably."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "Although Sarah raises valid concerns regarding pedestrian collisions and maintenance overhead, I firmly side with Michael that implementing a campus bicycle-sharing program provides superior mobility advantages.\n\nModern university campuses often span hundreds of acres, leaving students with mere ten-minute passing periods to travel between consecutive science labs and humanities lectures. Expecting undergraduates to sprint several miles on foot carrying heavy backpacks inevitably leads to chronic tardiness and exhaustion. Shared bicycles solve this last-mile transit bottleneck effortlessly, cutting travel times by seventy percent while infusing refreshing cardiovascular physical exercise into sedentary study routines. Safety concerns can be systematically managed through designated geofenced parking hubs and separated bike lanes painted along major thoroughfares. Subsidized campus bike shares create a brisk, eco-friendly, and active collegiate lifestyle that walking trails alone cannot deliver.",
        "wordCount": 131,
        "vocabularyHighlights": [
            {
                "term": "campus bicycle-sharing program",
                "meaning": "chương trình xe đạp dùng chung trong khuôn viên trường đại học",
                "contextInEssay": "implementing a campus bicycle-sharing program provides superior mobility advantages"
            },
            {
                "term": "last-mile transit bottleneck",
                "meaning": "nút thắt cổ chai trong việc di chuyển chặng cuối",
                "contextInEssay": "Shared bicycles solve this last-mile transit bottleneck effortlessly"
            },
            {
                "term": "geofenced parking hubs",
                "meaning": "các trạm đỗ xe định vị ranh giới ảo quy chuẩn",
                "contextInEssay": "through designated geofenced parking hubs and separated bike lanes"
            },
            {
                "term": "active collegiate lifestyle",
                "meaning": "lối sống sinh viên năng động, tích cực rèn luyện",
                "contextInEssay": "create a brisk, eco-friendly, and active collegiate lifestyle"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Thừa nhận nguy cơ va chạm giao thông của Sarah, đồng ý với Michael triển khai hệ thống xe đạp dùng chung trong trường.\n• Khuôn viên rộng lớn: Nhiều trường rộng hàng chục hecta, chỉ có 10 phút nghỉ giữa 2 tiết học; đi bộ vác ba lô nặng dễ bị muộn học và kiệt sức.\n• Tiết kiệm 70% thời gian: Xe đạp giúp di chuyển thần tốc giữa các khu giảng đường, đồng thời giúp sinh viên vận động gân cốt sau giờ ngồi học.\n• Quản lý văn minh: Thiết lập trạm đỗ xe có định vị và kẻ làn đường riêng cho xe đạp để tránh va chạm với người đi bộ."
    },

    # 170: Screen-Free Recreation Days
    {
        "id": "sample_discussion_generated_170",
        "type": "discussion",
        "title": "Screen-Free Recreation Days",
        "topicCategory": "Sports & Recreation",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Dr. Clara Huang",
            "professorTitle": "Professor of Kinesiology and Recreation",
            "professorQuestion": "Children and teenagers spend upwards of six hours daily on smartphones and video games. Should primary and secondary schools institute mandatory weekly or monthly screen-free recreation days dedicated to outdoor play, or should schools integrate digital games into recreation?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Screen-free recreation days are urgently needed. They rescue children from digital addiction, force them outdoors into fresh air, and restore authentic, face-to-face social communication."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Banning technology is an unrealistic, backward approach. Schools should instead embrace active exergaming and interactive digital fitness apps that engage modern digital natives."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Sarah makes an innovative point that gamified digital fitness apps can motivate tech-savvy youth, I firmly align with Michael that schools should enforce regular screen-free outdoor recreation days.\n\nExcessive screen exposure has contributed to an epidemic of childhood myopia, postural deformities, and fractured attention spans. Constantly staring at glowing pixels keeps young minds in a state of sensory overstimulation. Designating regular screen-free days compels pupils to unplug, step onto grassy playgrounds, and engage in unscripted, tactile social games like tag, soccer, and obstacle courses. These organic activities develop gross motor coordination, conflict resolution, and authentic friendships that simulated exergaming can never duplicate. Stepping away from digital notifications also restores natural dopamine balance and reduces school-related anxiety. Unplugged outdoor play is an indispensable antidote to the sedentariness and digital saturation of modern childhood.",
        "wordCount": 133,
        "vocabularyHighlights": [
            {
                "term": "fractured attention spans",
                "meaning": "sự suy giảm và phân mảnh khả năng tập trung",
                "contextInEssay": "epidemic of childhood myopia, postural deformities, and fractured attention spans"
            },
            {
                "term": "sensory overstimulation",
                "meaning": "sự kích thích thị giác và thần kinh quá đà",
                "contextInEssay": "keeps young minds in a state of sensory overstimulation"
            },
            {
                "term": "gross motor coordination",
                "meaning": "sự phối hợp các nhóm cơ vận động thô (chạy, nhảy, leo trèo)",
                "contextInEssay": "These organic activities develop gross motor coordination"
            },
            {
                "term": "indispensable antidote",
                "meaning": "liều thuốc giải độc không thể thiếu",
                "contextInEssay": "is an indispensable antidote to the sedentariness and digital saturation"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận tiện ích của ứng dụng game vận động của Sarah, ủng hộ Michael tổ chức ngày sinh hoạt thể thao không màn hình.\n• Cứu vãn thể chất và thị lực: Ngồi dán mắt vào điện thoại gây cận thị, gù lưng và mất tập trung; cần giải phóng đôi mắt và cột sống của trẻ.\n• Vận động tự nhiên ngoài trời: Chạy nhảy trên bãi cỏ, chơi đuổi bắt giúp cơ thể phát triển phản xạ và học kỹ năng giao tiếp mắt đối mắt.\n• Phục hồi cân bằng não bộ: Tạm rời xa thông báo ảo giúp hạ bớt lo âu và tái tạo năng lượng tinh thần sảng khoái cho học sinh."
    },

    # 171: Small Apartments Near Transit
    {
        "id": "sample_discussion_generated_171",
        "type": "discussion",
        "title": "Small Apartments Near Transit",
        "topicCategory": "Housing & Design",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Professor Samuel Okafor",
            "professorTitle": "Professor of Architecture and Urban Planning",
            "professorQuestion": "Urban housing shortages are pricing young professionals and students out of metropolitan cores. Should municipal zoning codes permit the construction of compact 'micro-apartments' near major transit hubs, or should cities mandate minimum apartment sizes to ensure spacious family living?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Permitting micro-units near subway stations expands affordable housing options for single workers and students, reducing commutes and reliance on personal automobiles."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Micro-apartments degrade living standards, creating cramped shoeboxes that harm mental health and encourage greedy developers to abandon family-friendly two-bedroom units."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "Although Sarah raises a legitimate concern that over-relying on micro-apartments might discourage developers from building spacious homes for growing families, I strongly agree with Michael that zoning codes should embrace compact units near transit hubs.\n\nSkyrocketing metropolitan rents force young workers and university graduates to endure exhausting two-hour daily commutes from distant suburban fringes. Well-designed micro-apartments—featuring built-in multifunctional furniture, large windows, and communal lounges—offer affordable, dignified footholds in vibrant downtown centers. Situating compact housing adjacent to subway stations enables car-free living, drastically slashing personal transportation expenses and urban carbon emissions. Moreover, single-person households constitute the fastest-growing demographic in modern cities; refusing to build units tailored to their needs merely drives up rents across existing housing stock. Permitting micro-apartments provides inclusive urban access and sustainable transit-oriented density.",
        "wordCount": 130,
        "vocabularyHighlights": [
            {
                "term": "transit hubs",
                "meaning": "các đầu mối giao thông công cộng trọng điểm (ga tàu điện, bến xe)",
                "contextInEssay": "embrace compact units near transit hubs"
            },
            {
                "term": "dignified footholds",
                "meaning": "chỗ đặt chân vững chắc và đàng hoàng trong thành phố",
                "contextInEssay": "offer affordable, dignified footholds in vibrant downtown centers"
            },
            {
                "term": "car-free living",
                "meaning": "lối sống không cần phụ thuộc vào xe ô tô cá nhân",
                "contextInEssay": "adjacent to subway stations enables car-free living"
            },
            {
                "term": "transit-oriented density",
                "meaning": "mật độ dân cư phát triển theo định hướng giao thông công cộng",
                "contextInEssay": "provides inclusive urban access and sustainable transit-oriented density"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận lo ngại về căn hộ quá chật của Sarah, đứng về phía Michael ủng hộ xây căn hộ nhỏ gần ga tàu điện.\n• Cứu nguy cho người trẻ: Giá thuê trung tâm quá đắt buộc sinh viên và nhân viên mới đi làm phải ở tít ngoại ô, tốn hàng giờ đi lại mệt mỏi.\n• Thiết kế thông minh & cắt giảm chi phí: Căn hộ nhỏ có nội thất gấp gọn, sát ga tàu giúp không cần mua ô tô, tiết kiệm cả đống tiền xăng xe.\n• Nhu cầu thực tế: Số lượng người độc thân ngày càng nhiều; cấp phép căn hộ nhỏ giúp thị trường đa dạng và hạ nhiệt cơn sốt nhà ở đô thị."
    },

    # 172: Green Roofs
    {
        "id": "sample_discussion_generated_172",
        "type": "discussion",
        "title": "Green Roofs",
        "topicCategory": "Housing & Design",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Professor Samuel Okafor",
            "professorTitle": "Professor of Architecture and Urban Planning",
            "professorQuestion": "Urban centers face rising temperatures due to the heat-island effect. Should municipal governments legally mandate that all new commercial and residential buildings install vegetated 'green roofs,' or should developers be permitted to use standard reflective roof coatings?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Green roofs provide enormous environmental returns. Plants absorb stormwater, naturally insulate buildings against heat, improve air quality, and provide sanctuary for urban pollinators."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Mandating living roofs imposes massive structural costs and waterproofing risks. Simple white reflective paint delivers similar cooling at a tiny fraction of the construction expense."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Sarah correctly points out that white reflective coatings offer a far cheaper upfront method for deflecting solar radiation, I share Michael's view that cities should aggressively mandate vegetated green roofs on new construction.\n\nUnlike passive reflective paint, living green roofs provide multifunctional ecological and civic infrastructure. The vegetative layer absorbs up to seventy percent of sudden torrential rainfall, dramatically relieving over-taxed municipal storm sewer systems and preventing urban street flash floods. Furthermore, rooftop sedum plants and soil naturally insulate interiors, slashing building air-conditioning energy consumption during brutal summer months. Rooftop gardens also sequester airborne particulate matter and establish vital habitat corridors for struggling bees and birds in concrete-dense cities. By investing in living architecture, cities not only mitigate the urban heat island effect but also build resilient, biodiverse, and aesthetically restorative urban landscapes.",
        "wordCount": 133,
        "vocabularyHighlights": [
            {
                "term": "vegetated green roofs",
                "meaning": "mái nhà xanh phủ thảm thực vật tự nhiên",
                "contextInEssay": "cities should aggressively mandate vegetated green roofs on new construction"
            },
            {
                "term": "flash floods",
                "meaning": "các trận ngập lụt cục bộ đột ngột trên đường phố",
                "contextInEssay": "preventing urban street flash floods"
            },
            {
                "term": "sequester airborne particulate matter",
                "meaning": "hấp thụ và giữ lại bụi mịn lơ lửng trong không khí",
                "contextInEssay": "sequester airborne particulate matter and establish vital habitat corridors"
            },
            {
                "term": "living architecture",
                "meaning": "kiến trúc sinh thái sống hòa hợp với thiên nhiên",
                "contextInEssay": "By investing in living architecture, cities not only mitigate the urban heat island"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Công nhận sơn phản quang màu trắng rẻ hơn như Sarah nêu, đồng tình với Michael rằng mái nhà xanh đem lại giá trị sinh thái vượt trội.\n• Chống ngập úng đô thị: Thảm thực vật giữ lại tới 70% lượng nước mưa lớn, giảm tải cho hệ thống thoát nước ngầm của thành phố.\n• Tiết kiệm năng lượng: Đất và cây tạo lớp cách nhiệt tự nhiên hoàn hảo, giúp tòa nhà mát rượi và giảm hóa đơn tiền điện máy lạnh.\n• Lợi ích đa chiều: Lọc sạch bụi mịn, tạo nơi trú ngụ cho ong bướm và biến nóc nhà bê tông thô ráp thành cảnh quan xanh mát dễ chịu."
    },

    # 173: Shared Student Kitchens
    {
        "id": "sample_discussion_generated_173",
        "type": "discussion",
        "title": "Shared Student Kitchens",
        "topicCategory": "Housing & Design",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Professor Samuel Okafor",
            "professorTitle": "Professor of Architecture and Urban Planning",
            "professorQuestion": "When designing new university residence halls, should architects prioritize communal cooking kitchens on every dormitory floor, or should universities expand centralized dining halls and require mandatory meal plans for on-campus residents?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Shared dorm kitchens are essential. They teach students lifelong cooking skills, accommodate diverse cultural diets, and allow students to save thousands compared to overpriced campus dining plans."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Dormitory kitchens turn into filthy health hazards. Irresponsible students leave dirty dishes in sinks, steal groceries from shared fridges, and trigger annoying smoke alarms late at night."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "Although Sarah raises valid practical complaints regarding unwashed dishes and communal hygiene squabbles, I strongly agree with Michael that dormitories should incorporate shared communal kitchens.\n\nMandatory campus meal plans are notoriously exorbitant, often burdening low-income undergraduates with thousands in unwanted debt for repetitive cafeteria food. Having access to a floor kitchen empowers students to budget effectively, buy fresh local produce, and master essential culinary and nutritional life skills. Moreover, communal kitchens serve as vital cultural sanctuaries. International students with strict dietary restrictions—such as halal, kosher, or vegan traditions—can prepare authentic comfort foods from home and share meals with roommates from different backgrounds. Routine cleanliness can easily be maintained through assigned cleaning chore rotas and swipe-card kitchen access. Providing shared kitchens nurtures cross-cultural fellowship and personal financial independence.",
        "wordCount": 130,
        "vocabularyHighlights": [
            {
                "term": "communal kitchens",
                "meaning": "gian bếp tập thể dùng chung trong ký túc xá",
                "contextInEssay": "dormitories should incorporate shared communal kitchens"
            },
            {
                "term": "unwanted debt",
                "meaning": "khoản nợ không đáng có do suất ăn đắt đỏ ép buộc",
                "contextInEssay": "burdening low-income undergraduates with thousands in unwanted debt"
            },
            {
                "term": "dietary restrictions",
                "meaning": "các chế độ ăn kiêng hoặc thói quen ăn uống tôn giáo/sức khỏe",
                "contextInEssay": "International students with strict dietary restrictions"
            },
            {
                "term": "cross-cultural fellowship",
                "meaning": "tình bạn gắn kết và sự giao lưu giữa các nền văn hóa",
                "contextInEssay": "nurtures cross-cultural fellowship and personal financial independence"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Chia sẻ phiền toái về chuyện dọn rửa của Sarah, ủng hộ Michael đưa bếp ăn dùng chung vào thiết kế ký túc xá.\n• Tiết kiệm tài chính: Suất ăn căng tin trường ép mua rất đắt; tự nấu ăn giúp sinh viên tiết kiệm tiền triệu và rèn luyện kỹ năng tự lập.\n• Tôn trọng đa dạng văn hóa: Sinh viên quốc tế ăn chay, ăn Halal hay quen đồ ăn quê nhà có thể tự nấu nướng đầm ấm thay vì chịu đựng cơm căn tin đơn điệu.\n• Quản lý văn minh: Lập lịch trực nhật xoay vòng và quẹt thẻ phòng bếp sẽ dẹp tan nỗi lo bừa bộn và mất cắp đồ ăn."
    },

    # 174: Modular Housing
    {
        "id": "sample_discussion_generated_174",
        "type": "discussion",
        "title": "Modular Housing",
        "topicCategory": "Housing & Design",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Professor Samuel Okafor",
            "professorTitle": "Professor of Architecture and Urban Planning",
            "professorQuestion": "Prefabricated modular construction—where residential units are manufactured inside climate-controlled factories and assembled on-site—is gaining momentum. Should cities prioritize modular housing to tackle housing deficits, or should municipalities favor traditional on-site construction methods?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Modular construction cuts building timelines in half, reduces neighborhood construction noise, and drastically lowers labor costs, making homes affordable much faster."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Factory-built modular housing looks bland, repetitive, and cheap. Traditional craftsmanship ensures better long-term durability and architectural harmony with historic neighborhoods."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Sarah understandably values the bespoke architectural character and customized craftsmanship of traditional masonry construction, I firmly side with Michael that cities must prioritize modular prefabricated housing.\n\nModern cities face severe housing emergencies characterized by soaring rents and widespread homelessness. Relying solely on conventional on-site construction means years of weather delays, hazardous street closures, and exorbitant contractor labor bills. In contrast, modular construction occurs in precision-engineered factories where walls, plumbing, and electrical conduits are fabricated simultaneously indoors, cutting project timelines by up to fifty percent. Far from looking monotonous, contemporary modular architecture utilizes varied timber cladding, floor-to-ceiling glass, and flexible layouts that blend seamlessly into urban streetscapes. Accelerating the deployment of high-quality modular housing is the most pragmatic, cost-effective strategy available to conquer urban housing shortages rapidly.",
        "wordCount": 130,
        "vocabularyHighlights": [
            {
                "term": "modular prefabricated housing",
                "meaning": "nhà ở lắp ghép mô-đun chế tạo sẵn từ nhà máy",
                "contextInEssay": "cities must prioritize modular prefabricated housing"
            },
            {
                "term": "bespoke architectural character",
                "meaning": "nét kiến trúc độc bản, được đo ni đóng giày thủ công",
                "contextInEssay": "values the bespoke architectural character and customized craftsmanship"
            },
            {
                "term": "precision-engineered factories",
                "meaning": "các nhà máy sản xuất cơ khí chính xác theo tiêu chuẩn cao",
                "contextInEssay": "modular construction occurs in precision-engineered factories"
            },
            {
                "term": "pragmatic, cost-effective strategy",
                "meaning": "chiến lược thực tế và tiết kiệm chi phí nhất",
                "contextInEssay": "is the most pragmatic, cost-effective strategy available"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận nét đẹp thủ công truyền thống theo Sarah, ủng hộ Michael đẩy mạnh ứng dụng nhà lắp ghép mô-đun.\n• Khủng hoảng nhà ở khẩn cấp: Giá nhà tăng vọt khiến người dân chật vật; xây kiểu truyền thống mất nhiều năm vì vướng thời tiết và nhân công đắt đỏ.\n• Tốc độ và chuẩn xác: Chế tạo cấu kiện trong nhà xưởng sạch sẽ, lắp đặt hoàn thiện nhanh hơn 50% và giảm thiểu tiếng ồn ngoài công trường.\n• Kiến trúc hiện đại: Nhà mô-đun ngày nay ốp gỗ và lắp kính sang trọng, không hề thô cứng, giải quyết bài toán thiếu nhà một cách thần tốc."
    },

    # 175: Rent Caps Near Campuses
    {
        "id": "sample_discussion_generated_175",
        "type": "discussion",
        "title": "Rent Caps Near Campuses",
        "topicCategory": "Housing & Design",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Professor Samuel Okafor",
            "professorTitle": "Professor of Architecture and Urban Planning",
            "professorQuestion": "Students living off-campus frequently face predatory rent spikes from private landlords. Should municipal governments establish strict rent control caps on apartments located near university campuses, or should cities avoid price controls and encourage private developers to build more rental units?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Strict rent caps protect vulnerable college students from price gouging. Without legal limits, greedy landlords exploit housing shortages and drive students into debt or homelessness."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Rent control is an economic disaster. Capping rents discourages investors from building new apartments, deteriorates maintenance, and actually worsens the overall housing shortage."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Sarah accurately points out economic evidence that rigid price ceilings can stifle new housing investment and disincentivize landlord maintenance, I agree with Michael that targeted rent stabilization near university campuses is urgently required.\n\nStudents are uniquely vulnerable consumers: they have limited earning hours, lack established credit histories, and cannot easily relocate mid-semester when confronted with sudden thirty percent rent hikes. Left unchecked, predatory speculative landlords extract outrageous profits while forcing students to live in moldy, overcrowded basements. Implementing sensible rent stabilization—which caps annual rent increases at the rate of inflation—protects student tenants from arbitrary extortion without stopping developers from recovering construction costs. Combining predictable rent stabilization with municipal incentives for new campus-adjacent construction strikes the optimal balance between protecting vulnerable young scholars and maintaining housing development.",
        "wordCount": 128,
        "vocabularyHighlights": [
            {
                "term": "rent stabilization",
                "meaning": "chính sách bình ổn và kiểm soát mức tăng giá thuê nhà",
                "contextInEssay": "targeted rent stabilization near university campuses is urgently required"
            },
            {
                "term": "predatory speculative landlords",
                "meaning": "những chủ trọ đầu cơ chèn ép người thuê nhằm trục lợi",
                "contextInEssay": "predatory speculative landlords extract outrageous profits"
            },
            {
                "term": "arbitrary extortion",
                "meaning": "sự tống tiền / tăng giá vô căn cứ, tùy tiện",
                "contextInEssay": "protects student tenants from arbitrary extortion"
            },
            {
                "term": "campus-adjacent construction",
                "meaning": "việc xây dựng thêm các khu nhà ở liền kề khuôn viên trường",
                "contextInEssay": "incentives for new campus-adjacent construction strikes the optimal balance"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Thừa nhận cảnh báo của Sarah về việc siết giá trần làm nản lòng nhà đầu tư, ủng hộ Michael áp giá trần bảo vệ sinh viên.\n• Sinh viên là đối tượng yếu thế: Không thể làm việc toàn thời gian, giữa kỳ thi mà bị chủ nhà tăng giá ép chuyển đi thì việc học coi như dang dở.\n• Ngăn chặn trục lợi: Chủ trọ hay bắt chẹt vì biết quanh trường lúc nào cũng thiếu phòng, ép sinh viên chen chúc trong phòng ẩm mốc.\n• Bình ổn theo lạm phát: Khống chế tăng tiền nhà theo tỷ lệ lạm phát hàng năm vừa bảo vệ sinh viên vừa đảm bảo lợi nhuận hợp lý cho chủ đầu tư."
    }
]

# Write to scripts/disc_batch_151_175.py
content = "# scripts/disc_batch_151_175.py\n# TOEFL iBT 2026 Writing for an Academic Discussion - Items 151 to 175\n\nDISCUSSIONS_151_175 = " + json.dumps(BATCH_DATA, indent=2, ensure_ascii=False) + "\n"

with open("scripts/disc_batch_151_175.py", "w", encoding="utf-8") as f:
    f.write(content)

print(f"Successfully wrote {len(BATCH_DATA)} items to scripts/disc_batch_151_175.py")

# Validation
errors = []
for item in BATCH_DATA:
    essay = item["modelEssay"]
    wc = len(essay.split())
    if not (110 <= wc <= 145):
        errors.append(f"{item['id']}: word count {wc} out of range [110, 145]")
    for v in item["vocabularyHighlights"]:
        term = v["term"].lower()
        ctx = v["contextInEssay"].lower()
        if term not in essay.lower() and not any(w in essay.lower() for w in term.split()):
            errors.append(f"{item['id']}: term '{v['term']}' not in essay")
        if ctx not in essay.lower():
            errors.append(f"{item['id']}: context '{v['contextInEssay']}' not in essay")

if errors:
    print("Validation errors:")
    for e in errors:
        print(" -", e)
else:
    print("All items in Batch 151-175 validated cleanly!")
