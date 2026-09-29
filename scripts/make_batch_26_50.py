# scripts/make_batch_26_50.py
import json

BATCH_DATA = [
    # 26: Job Training Versus Cash Aid
    {
        "id": "sample_discussion_generated_26",
        "type": "discussion",
        "title": "Job Training Versus Cash Aid",
        "topicCategory": "Work & Economy",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Dr. Maya Chen",
            "professorTitle": "Professor of Labor Economics",
            "professorQuestion": "When addressing long-term unemployment and poverty, should governments prioritize funding technical vocational retraining programs, or should welfare authorities distribute direct cash assistance directly to unemployed citizens?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Vocational job training is the only lasting path to self-sufficiency. Teaching unemployed workers coding, precision manufacturing, or green energy trades gives them marketable skills that ensure lifelong financial security."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Direct cash assistance provides immediate survival relief. Hungry families cannot focus on lengthy retraining seminars when facing imminent eviction, utility shutoffs, and immediate food insecurity."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Sarah emphasizes the undeniable urgency of immediate financial survival for families facing eviction, I firmly agree with Michael that governments should prioritize funding comprehensive technical job retraining programs.\n\nHanding out direct cash assistance provides temporary comfort, but it acts merely as a temporary band-aid rather than a permanent cure. Without upgrading their qualifications, low-skilled workers remain trapped in low-wage cycles and chronically vulnerable to automation and economic downturns. In contrast, tuition-free vocational training in high-demand fields—such as solar panel installation, advanced healthcare nursing, and software maintenance—empowers unemployed individuals with durable, marketable skills that command family-supporting salaries. To support learners during their studies, governments can offer modest training stipends. Investing in human capital transforms dependent welfare recipients into productive, tax-paying professionals, creating enduring economic mobility and personal dignity.",
        "wordCount": 133,
        "vocabularyHighlights": [
            {
                "term": "vocational retraining programs",
                "meaning": "các chương trình đào tạo nghề và chuyển đổi kỹ năng",
                "contextInEssay": "governments should prioritize funding comprehensive technical job retraining programs"
            },
            {
                "term": "temporary band-aid",
                "meaning": "biện pháp xoa dịu tạm thời, giải pháp tình thế",
                "contextInEssay": "acts merely as a temporary band-aid rather than a permanent cure"
            },
            {
                "term": "durable, marketable skills",
                "meaning": "kỹ năng nghề nghiệp bền vững, có giá trị cao trên thị trường",
                "contextInEssay": "empowers unemployed individuals with durable, marketable skills"
            },
            {
                "term": "enduring economic mobility",
                "meaning": "sự thăng tiến và tự chủ kinh tế lâu dài",
                "contextInEssay": "creating enduring economic mobility and personal dignity"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Thừa nhận nhu cầu cấp bách chống đói nghèo của Sarah, ủng hộ Michael ưu tiên đào tạo nghề chuyên sâu.\n• Hạn chế của trợ cấp tiền mặt: Phát tiền chỉ là biện pháp tình thế; không nâng cao tay nghề thì người lao động mãi luẩn quẩn trong vòng xoáy bấp bênh.\n• Kỹ năng tạo tương lai bền vững: Học nghề lắp pin mặt trời hay điều dưỡng giúp người thất nghiệp có công việc thu nhập cao, miễn nhiễm với làn sóng tự động hóa.\n• Giải pháp tối ưu: Hỗ trợ sinh hoạt phí trong thời gian học nghề để người học yên tâm nâng cao tay nghề và thoát nghèo tự lực."
    },

    # 27: Flexible Start Times
    {
        "id": "sample_discussion_generated_27",
        "type": "discussion",
        "title": "Flexible Start Times",
        "topicCategory": "Work & Economy",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Dr. Maya Chen",
            "professorTitle": "Professor of Labor Economics",
            "professorQuestion": "Many companies are abandoning the rigid 9-to-5 workday in favor of flexible starting hours between 7:00 AM and 10:00 AM. Should businesses offer flexible arrival times to all employees, or should workplaces maintain uniform start times for synchronized team collaboration?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Flexible start times dramatically boost productivity and morale. Workers bypass grueling rush-hour traffic gridlock and can easily balance morning school drop-offs or medical appointments."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Uniform start times ensure organizational efficiency. When teammates arrive at unpredictable hours, scheduling group meetings becomes chaotic and urgent client queries go unanswered."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "Although Sarah raises a practical concern regarding meeting scheduling and team availability, I strongly agree with Michael that implementing flexible working hours delivers immense corporate and personal benefits.\n\nForcing hundreds of employees to clock in at the exact same minute forces everyone into stressful, exhausting rush-hour traffic jams, depleting their mental energy before they even open their laptops. Allowing employees to choose arrival times between 7:00 and 10:00 AM empowers working parents to manage childcare seamlessly and lets natural morning larks or night owls work during their peak biological focus windows. Modern offices can easily maintain collaboration by establishing core hours—such as mandatory shared presence from 10:00 AM to 3:00 PM for team huddles—while keeping peripheral hours flexible. Granting scheduling autonomy reduces absenteeism, enhances job retention, and creates a happier, more energetic workforce.",
        "wordCount": 133,
        "vocabularyHighlights": [
            {
                "term": "flexible working hours",
                "meaning": "thời gian làm việc linh hoạt, không gò bó giờ vào ca",
                "contextInEssay": "implementing flexible working hours delivers immense corporate and personal benefits"
            },
            {
                "term": "rush-hour traffic jams",
                "meaning": "ùn tắc giao thông nghiêm trọng vào giờ cao điểm",
                "contextInEssay": "exhausting rush-hour traffic jams, depleting their mental energy"
            },
            {
                "term": "peak biological focus windows",
                "meaning": "khung giờ vàng tập trung cao nhất theo đồng hồ sinh học",
                "contextInEssay": "work during their peak biological focus windows"
            },
            {
                "term": "scheduling autonomy",
                "meaning": "quyền tự chủ sắp xếp lịch trình làm việc cá nhân",
                "contextInEssay": "Granting scheduling autonomy reduces absenteeism, enhances job retention"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận khó khăn khi xếp lịch họp nhóm của Sarah, ủng hộ Michael áp dụng khung giờ đi làm linh hoạt.\n• Tránh lãng phí năng lượng: Ép cùng đến lúc 8 giờ sáng khiến nhân viên mệt mỏi vì kẹt xe, tiêu hao hết năng lượng trước khi vào việc.\n• Tối ưu đồng hồ sinh học & gia đình: Người có con nhỏ đưa đón con thuận tiện, người thích làm việc sớm hay muộn đều được phát huy tối đa năng suất.\n• Khung giờ cốt lõi thông minh: Quy định có mặt chung từ 10h đến 15h để họp nhóm, các giờ còn lại tự do giúp giữ vững kỷ luật và sự hài lòng."
    },

    # 28: Employee Ownership
    {
        "id": "sample_discussion_generated_28",
        "type": "discussion",
        "title": "Employee Ownership",
        "topicCategory": "Work & Economy",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Dr. Maya Chen",
            "professorTitle": "Professor of Labor Economics",
            "professorQuestion": "Worker cooperatives and employee stock ownership plans (ESOPs) grant staff direct ownership equity and voting shares in companies. Should economic policies incentivize employee-owned businesses, or is traditional hierarchical shareholder management more effective for economic growth?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Employee ownership aligns worker success with company prosperity. When workers share corporate profits, dedication surges, wealth inequality narrows, and businesses weather recessions much better."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Democratic management slows decision-making. Fast-moving global markets require decisive executive leadership, and workers risk losing both their paychecks and retirement savings if the firm fails."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Sarah makes a valid point that complex strategic decisions often require swift executive leadership rather than consensus voting, I side with Michael that promoting employee-owned businesses fosters a far healthier, more resilient economy.\n\nIn conventional corporations, wealth concentrates overwhelmingly among passive institutional shareholders, while frontline employees endure wage stagnation and frequent corporate layoffs. In contrast, employee ownership models transform workers from interchangeable cogs into vested stakeholders. When employees hold equity shares, they take immense pride in craftmanship, actively eliminate operational waste, and innovate spontaneously because business profitability directly enriches their own retirement portfolios. Extensive empirical research shows that worker-owned enterprises experience significantly lower turnover rates and protect community jobs during downturns instead of slashing payroll to please Wall Street. Expanding employee ownership democratizes wealth generation and builds a fairer economic foundation.",
        "wordCount": 131,
        "vocabularyHighlights": [
            {
                "term": "employee-owned businesses",
                "meaning": "doanh nghiệp do chính người lao động làm chủ cổ phần",
                "contextInEssay": "promoting employee-owned businesses fosters a far healthier, more resilient economy"
            },
            {
                "term": "vested stakeholders",
                "meaning": "những bên có quyền lợi và trách nhiệm gắn bó chặt chẽ",
                "contextInEssay": "transform workers from interchangeable cogs into vested stakeholders"
            },
            {
                "term": "eliminate operational waste",
                "meaning": "loại bỏ lãng phí trong quy trình vận hành sản xuất",
                "contextInEssay": "take immense pride in craftmanship, actively eliminate operational waste"
            },
            {
                "term": "democratizes wealth generation",
                "meaning": "dân chủ hóa và phân bổ công bằng nguồn của cải xã hội",
                "contextInEssay": "Expanding employee ownership democratizes wealth generation"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận sự quyết đoán của ban lãnh đạo theo Sarah, ủng hộ Michael khuyến khích mô hình doanh nghiệp thuộc sở hữu nhân viên.\n• Xóa bỏ sự bất công tư bản: Mô hình cũ dồn lợi nhuận cho cổ đông tài chính, người lao động dễ bị sa thải; cổ phần hóa nhân viên giúp chia đều thành quả.\n• Tinh thần trách nhiệm cao: Khi được làm chủ, công nhân chủ động tiết kiệm nguyên vật liệu, cải tiến quy trình vì doanh thu cao là tiền túi của mình.\n• Bền vững trước suy thoái: Công ty do nhân viên làm chủ ít sa thải hàng loạt lúc khó khăn, giúp bảo vệ việc làm ổn định cho cộng đồng."
    },

    # 29: Tourism Jobs and Seasonality
    {
        "id": "sample_discussion_generated_29",
        "type": "discussion",
        "title": "Tourism Jobs and Seasonality",
        "topicCategory": "Work & Economy",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Dr. Maya Chen",
            "professorTitle": "Professor of Labor Economics",
            "professorQuestion": "Tourism-dependent coastal and mountain regions experience intense seasonal booms followed by winter slumps and mass unemployment. Should local governments invest tax revenue in developing off-season tourist attractions, or should municipalities subsidize year-round non-tourism industries like light manufacturing or tech?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Doubling down on off-season tourism—like winter cultural festivals and indoor sports centers—capitalizes on existing hotel infrastructure and keeps hospitality workers employed all twelve months."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Tourism jobs are notoriously low-wage and precarious. Regions must diversify into clean tech and manufacturing to create stable, high-paying career paths immune to tourism cycles."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "Although Michael reasonably argues that hosting off-season winter festivals maximizes existing hospitality venues, I firmly align with Sarah that regional municipalities must prioritize subsidizing year-round non-tourism industries.\n\nOver-reliance on the tourism sector creates an inherently fragile, boom-and-bust regional economy. Hospitality jobs—such as hotel housekeeping, tour guiding, and restaurant waitstaff—are overwhelmingly minimum-wage, lack healthcare benefits, and evaporate overnight during economic recessions or adverse weather events. Subsidizing local light manufacturing, data centers, and agricultural food processing establishments builds permanent economic diversification. Non-tourism industries provide steady twelve-month employment with stable salaries, career apprenticeships, and pension plans. This stable economic backbone prevents talented local youth from fleeing seasonal coastal towns in search of steady work elsewhere. Broadening the industrial base ensures genuine, recession-proof economic stability that seasonal tourism alone can never achieve.",
        "wordCount": 131,
        "vocabularyHighlights": [
            {
                "term": "boom-and-bust regional economy",
                "meaning": "nền kinh tế địa phương bấp bênh theo chu kỳ bùng nổ rồi suy thoái",
                "contextInEssay": "creates an inherently fragile, boom-and-bust regional economy"
            },
            {
                "term": "permanent economic diversification",
                "meaning": "sự đa dạng hóa kinh tế lâu dài, bền vững",
                "contextInEssay": "processing establishments builds permanent economic diversification"
            },
            {
                "term": "stable economic backbone",
                "meaning": "xương sống kinh tế vững vàng, làm điểm tựa",
                "contextInEssay": "This stable economic backbone prevents talented local youth from fleeing"
            },
            {
                "term": "recession-proof economic stability",
                "meaning": "sự ổn định kinh tế có khả năng chống chịu suy thoái",
                "contextInEssay": "ensures genuine, recession-proof economic stability"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận giải pháp lễ hội mùa đông của Michael, đứng về phía Sarah ủng hộ đa dạng hóa sang các ngành phi du lịch.\n• Bấp bênh của nghề du lịch: Nghề phục vụ phòng, bồi bàn lương thấp, không có bảo hiểm và lập tức thất nghiệp trắng tay khi hết mùa hè.\n• Việc làm quanh năm thực chất: Phát triển xưởng chế biến nông sản, trung tâm dữ liệu tạo việc làm đủ 12 tháng với chế độ đãi ngộ đàng hoàng.\n• Giữ chân người trẻ: Thu nhập ổn định quanh năm giúp thanh niên gắn bó lập nghiệp tại quê nhà thay vì bỏ xứ đi nơi khác tìm việc."
    },

    # 30: Public Funding for Startups
    {
        "id": "sample_discussion_generated_30",
        "type": "discussion",
        "title": "Public Funding for Startups",
        "topicCategory": "Work & Economy",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Dr. Maya Chen",
            "professorTitle": "Professor of Labor Economics",
            "professorQuestion": "To stimulate local economic revitalization, should municipal governments provide direct tax-funded incubator grants and seed capital to technological startups, or should public investments be reserved for repairing basic municipal infrastructure like roads and water systems?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Funding tech startups creates high-skilled jobs and positions the city as an innovation hub, attracting venture capital and ambitious young talent from around the country."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Most startups fail within three years, wasting public tax money. Potholed roads, lead water pipes, and broken bridges damage all local commerce and must be fixed first."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Michael is right that emerging technology startups can generate high-paying jobs and prestige, I firmly agree with Sarah that municipal budgets must prioritize repairing foundational public infrastructure before gambling on private ventures.\n\nUsing taxpayer dollars to finance speculative tech startups is an irresponsible gamble. Venture capital data proves that nearly ninety percent of tech startups collapse within their first few years, meaning public subsidies routinely vanish with zero public return. In sharp contrast, modernizing crumbling bridges, repaving arterial avenues, and upgrading drinking water pipes provides immediate, tangible benefits to every citizen and business in the city. Reliable public infrastructure is the indispensable foundation that attracts sustainable private investment in the first place; no tech entrepreneur or corporate employer will relocate to a city plagued by power blackouts and burst water mains. Upgrading civic basics represents the only responsible, risk-free public investment.",
        "wordCount": 137,
        "vocabularyHighlights": [
            {
                "term": "foundational public infrastructure",
                "meaning": "cơ sở hạ tầng công cộng nền tảng (đường sá, cầu cống, cấp thoát nước)",
                "contextInEssay": "must prioritize repairing foundational public infrastructure before gambling"
            },
            {
                "term": "speculative tech startups",
                "meaning": "các công ty khởi nghiệp công nghệ mang tính đầu cơ mạo hiểm",
                "contextInEssay": "finance speculative tech startups is an irresponsible gamble"
            },
            {
                "term": "arterial avenues",
                "meaning": "các trục đường giao thông huyết mạch của thành phố",
                "contextInEssay": "repaving arterial avenues, and upgrading drinking water pipes"
            },
            {
                "term": "risk-free public investment",
                "meaning": "khoản đầu tư công an toàn, không có rủi ro thất thoát",
                "contextInEssay": "civic basics represents the only responsible, risk-free public investment"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận sức hút công nghệ của Michael, ủng hộ Sarah dùng ngân sách nhà nước sửa đường sá, cầu cống trước tiên.\n• Rủi ro startup cực lớn: 90% công ty công nghệ phá sản sau 3 năm, dùng tiền thuế tài trợ khởi nghiệp rất dễ bị mất trắng không thu lại gì.\n• Nền tảng của nền kinh tế: Đường sá êm ái, nguồn nước sạch phục vụ toàn bộ người dân và mọi doanh nghiệp nhỏ buôn bán thuận tiện.\n• Sức hút tự nhiên: Hạ tầng đô thị tốt tự khắc sẽ thu hút nhà đầu tư tư nhân tự rót vốn vào công nghệ mà không cần tiêu tốn tiền thuế."
    },

    # 31: Urban Tree Planting
    {
        "id": "sample_discussion_generated_31",
        "type": "discussion",
        "title": "Urban Tree Planting",
        "topicCategory": "Environment & Climate",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Professor Luis Ortega",
            "professorTitle": "Professor of Environmental Sciences",
            "professorQuestion": "Urban concrete canyons suffer from severe heat and smog. Should municipal governments legally mandate and fund extensive street tree canopies along every sidewalk, or should cities focus environmental budgets on installing solar-powered sidewalk misting stations and shade structures?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Planting trees is nature's ultimate cooling solution. Trees naturally cool ambient air through evapotranspiration, absorb poisonous carbon monoxide, and provide welcoming shade."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Trees take twenty years to mature, require costly watering, and their roots buckle underground pipes and sidewalks. Metal shade pavilions and misting fans provide immediate cooling."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Sarah accurately points out that artificial misting pavilions deliver instant thermal relief without waiting decades for seedlings to grow, I firmly agree with Michael that investing in urban tree canopies provides superior long-term ecological returns.\n\nUnlike mechanical misting fans that consume municipal water and require constant repairs, mature shade trees function as self-sustaining biological powerhouses. Street trees naturally lower neighborhood temperatures by several degrees through evapotranspiration and leaf canopies, shielding asphalt from absorbing solar heat. Furthermore, urban trees actively filter airborne particulate soot, absorb torrential stormwater runoff through root networks, and sequester tons of carbon dioxide annually. Modern arboricultural methods—such as using subterranean structural soil cells—completely prevent tree roots from cracking pavement or damaging utilities. Planting shade trees today is a permanent, cost-effective investment that heals urban ecology and enriches public health for future generations.",
        "wordCount": 133,
        "vocabularyHighlights": [
            {
                "term": "urban tree canopies",
                "meaning": "tán cây xanh bóng mát che phủ trên các đường phố đô thị",
                "contextInEssay": "investing in urban tree canopies provides superior long-term ecological returns"
            },
            {
                "term": "evapotranspiration",
                "meaning": "hiện tượng thoát hơi nước làm mát tự nhiên qua lá cây",
                "contextInEssay": "several degrees through evapotranspiration and leaf canopies"
            },
            {
                "term": "particulate soot",
                "meaning": "bụi mịn và muội than độc hại trong khí thải đô thị",
                "contextInEssay": "filter airborne particulate soot, absorb torrential stormwater runoff"
            },
            {
                "term": "subterranean structural soil cells",
                "meaning": "các ô đất kỹ thuật ngầm dưới lòng đất định hướng rễ cây",
                "contextInEssay": "arboricultural methods—such as using subterranean structural soil cells"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận giải pháp làm mát tức thì của mái che kim loại theo Sarah, đồng thuận với Michael rằng trồng cây xanh là vượt trội.\n• Cỗ máy sinh thái tự nhiên: Cây to làm mát không khí qua thoát hơi nước, chặn ánh nắng thiêu đốt mặt đường nhựa mà không tốn điện bảo trì.\n• Lợi ích môi trường toàn diện: Lọc sạch khói bụi độc hại, rễ cây thấm hút nước mưa chống ngập và hấp thụ khí nhà kính.\n• Kỹ thuật nông nghiệp hiện đại: Công nghệ rãnh đất ngầm định hướng rễ cây mọc thẳng xuống dưới, dẹp tan nỗi lo nứt vỉa hè hay vỡ ống nước."
    },

    # 32: Rewilding City Parks
    {
        "id": "sample_discussion_generated_32",
        "type": "discussion",
        "title": "Rewilding City Parks",
        "topicCategory": "Environment & Climate",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Professor Luis Ortega",
            "professorTitle": "Professor of Environmental Sciences",
            "professorQuestion": "Urban park maintenance traditionally involves manicured lawns, gas mowers, and chemical fertilizers. Should cities 'rewild' portions of public parks by allowing native wildflowers, wetlands, and tall grasses to grow naturally, or should parks preserve traditional manicured lawns for human sports?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Rewilding restores vanishing biodiversity. Native meadows create essential sanctuaries for bees, butterflies, and songbirds while saving millions on fuel and chemical pesticides."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Overgrown rewilded meadows look abandoned, harbor ticks and pollen allergies, and steal open recreational turf where families picnic, kick soccer balls, and walk dogs."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "Although Sarah raises valid practical points about preserving flat recreational turf for soccer games and family picnics, I strongly side with Michael that municipal parks should rewild significant sections into native meadows.\n\nTraditional manicured turf grass represents an ecological wasteland. Maintaining uniform green lawns demands thousands of gallons of potable water, noisy gas-powered mowers that pollute urban air, and chemical pesticides that poison local waterways. In stark contrast, rewilding dedicated park zones with native wildflowers, native shrubs, and wetland swales creates biodiverse sanctuaries where endangered pollinators and migratory birds flourish. Furthermore, native deep-rooted grasses absorb heavy urban stormwater runoff, significantly mitigating flash flooding. Cities can maintain harmonious park balance by reserving central lawns for athletics while converting perimeter borders into rewilded nature corridors with clear walking paths and educational signage. Rewilding saves taxpayer money while reconnecting city residents with authentic nature.",
        "wordCount": 137,
        "vocabularyHighlights": [
            {
                "term": "ecological wasteland",
                "meaning": "hoang mạc sinh thái (vùng đất xanh hình thức nhưng vô giá trị cho muôn loài)",
                "contextInEssay": "Traditional manicured turf grass represents an ecological wasteland"
            },
            {
                "term": "endangered pollinators",
                "meaning": "các loài thụ phấn đang có nguy cơ tuyệt chủng (ong, bướm)",
                "contextInEssay": "biodiverse sanctuaries where endangered pollinators and migratory birds flourish"
            },
            {
                "term": "wetland swales",
                "meaning": "các dải trũng đất ngập nước tự nhiên điều tiết thủy văn",
                "contextInEssay": "native shrubs, and wetland swales creates biodiverse sanctuaries"
            },
            {
                "term": "harmonious park balance",
                "meaning": "sự cân bằng hài hòa trong công viên giữa thể thao và bảo tồn",
                "contextInEssay": "Cities can maintain harmonious park balance by reserving central lawns"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Thừa nhận nhu cầu đá bóng và dã ngoại bãi cỏ của Sarah, ủng hộ Michael trả lại tự nhiên cho các góc công viên.\n• Sự lãng phí của cỏ nhân tạo: Cắt tỉa cỏ tốn hàng ngàn lít nước sạch, máy cắt cỏ xả khói mù mịt và hóa chất diệt sâu làm độc nguồn nước ngầm.\n• Thiên đường cho ong bướm: Cây cỏ dại bản địa tạo nơi trú ngụ cho ong bướm thụ phấn và chim muông, rễ sâu giúp chống ngập úng mùa mưa.\n• Quy hoạch hài hòa: Giữ thảm cỏ trung tâm cho trẻ con đá bóng, các dải ven bờ thả cỏ hoa tự nhiên vừa đẹp mắt vừa tiết kiệm tiền thuế."
    },

    # 33: Repair Cafés
    {
        "id": "sample_discussion_generated_33",
        "type": "discussion",
        "title": "Repair Cafés",
        "topicCategory": "Environment & Climate",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Professor Luis Ortega",
            "professorTitle": "Professor of Environmental Sciences",
            "professorQuestion": "Consumer electronics and small appliances are routinely discarded after minor breakdowns. Should municipal governments fund and organize free neighborhood 'repair cafés' where volunteer technicians help citizens fix broken toasters, lamps, and bicycles, or should communities rely on existing recycling streams?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Repair cafés tackle the root problem of waste. Teaching people to solder a loose wire keeps functional items out of landfills and empowers citizens with practical repair skills."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Repairing modern digital appliances requires specialized proprietary parts. Expanding efficient municipal electronics recycling is far more scalable and avoids dangerous electrical hazards."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Sarah is correct that recycling recovers precious metals and that high-tech microelectronics require factory equipment to repair, I strongly agree with Michael that municipal repair cafés provide unmatched environmental and social value.\n\nRecycling is energy-intensive and often serves as an excuse for relentless consumer overconsumption. The overwhelming majority of discarded household goods—such as desk lamps with frayed cords, bicycles with rusted chains, and toasters with stuck levers—require only basic mechanical adjustments. Repair cafés bring volunteer retired electricians and handy neighbors together to fix these items freely and safely. In doing so, they divert tons of solid waste from municipal incinerators while saving low-income families hundreds in replacement costs. More importantly, repairing items alongside experienced mentors demystifies technology, restores a culture of stewardship, and builds heartwarming intergenerational community friendships. Prevention and reuse must always take priority over recycling.",
        "wordCount": 133,
        "vocabularyHighlights": [
            {
                "term": "relentless consumer overconsumption",
                "meaning": "thói quen tiêu dùng thái quá và mua sắm lãng phí không ngừng",
                "contextInEssay": "excuse for relentless consumer overconsumption"
            },
            {
                "term": "basic mechanical adjustments",
                "meaning": "những sự căn chỉnh cơ khí cơ bản, đơn giản",
                "contextInEssay": "require only basic mechanical adjustments"
            },
            {
                "term": "culture of stewardship",
                "meaning": "văn hóa giữ gìn, trân quý và bảo quản đồ dùng",
                "contextInEssay": "demystifies technology, restores a culture of stewardship"
            },
            {
                "term": "intergenerational community friendships",
                "meaning": "tình bạn cộng đồng gắn kết nhiều thế hệ",
                "contextInEssay": "builds heartwarming intergenerational community friendships"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận sự phức tạp của vi mạch điện tử theo Sarah, đồng thuận với Michael mở các tiệm cà phê sửa chữa đồ gia dụng.\n• Tái chế tốn năng lượng: Tái chế là phương án cuối; rất nhiều đồ dùng chỉ lỏng sợi dây điện hay kẹt lò xo mà bị vứt bỏ rất lãng phí.\n• Tình nguyện vì cộng đồng: Các bác thợ điện hưu trí hướng dẫn người dân tự tay hàn dây, sửa quạt, vừa cứu bãi rác vừa tiết kiệm tiền mua mới.\n• Xây dựng lối sống văn minh: Biến văn hóa 'hỏng là vứt' thành thói quen nâng niu, sửa chữa và gắn kết tình làng nghĩa xóm."
    },

    # 34: Plastic Bag Fees
    {
        "id": "sample_discussion_generated_34",
        "type": "discussion",
        "title": "Plastic Bag Fees",
        "topicCategory": "Environment & Climate",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Professor Luis Ortega",
            "professorTitle": "Professor of Environmental Sciences",
            "professorQuestion": "Single-use plastic bags choke marine life and clutter streets. Should municipal governments impose a mandatory monetary fee on single-use grocery bags, or should cities rely on voluntary educational campaigns encouraging shoppers to bring reusable totes?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Mandatory fees produce instant behavioral changes. When consumers must pay ten cents per bag at the checkout, over eighty percent immediately switch to reusable cloth bags."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Bag fees act as a regressive tax that penalizes low-income shoppers. Friendly public awareness posters and distributing free reusable bags achieve sustainable change without punitive charges."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Sarah expresses humane concern regarding financial burdens on low-income shoppers, I firmly side with Michael that imposing mandatory fees on single-use bags is the only truly effective environmental policy.\n\nDecades of voluntary public education campaigns have proven toothless against consumer convenience; when single-use plastic bags are handed out for free, shoppers mindlessly consume dozens each week. In contrast, behavioral economics demonstrates that even a modest ten-cent fee creates a powerful psychological friction at checkout. Shoppers immediately pause, remember their canvas bags, and form permanent habits. Municipalities that enacted small bag fees observed an immediate eighty percent plummet in plastic bag litter in waterways and storm drains. To protect economically disadvantaged families, cities can distribute sturdy free reusable totes through public libraries and community food pantries. A modest charge effectively curtails environmental degradation without burdening vulnerable citizens.",
        "wordCount": 131,
        "vocabularyHighlights": [
            {
                "term": "mandatory fees",
                "meaning": "các khoản thu phí bắt buộc",
                "contextInEssay": "imposing mandatory fees on single-use bags is the only truly effective environmental policy"
            },
            {
                "term": "psychological friction",
                "meaning": "sự khựng lại trong tâm lý khiến người ta cân nhắc lại hành vi",
                "contextInEssay": "creates a powerful psychological friction at checkout"
            },
            {
                "term": "plummet in plastic bag litter",
                "meaning": "sự sụt giảm mạnh mẽ lượng rác túi ni-lông xả ra môi trường",
                "contextInEssay": "immediate eighty percent plummet in plastic bag litter in waterways"
            },
            {
                "term": "environmental degradation",
                "meaning": "sự suy thoái và tàn phá môi trường sinh thái",
                "contextInEssay": "effectively curtails environmental degradation without burdening vulnerable citizens"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Chia sẻ lo âu về người nghèo của Sarah, đồng ý với Michael bắt buộc thu phí túi ni-lông dùng một lần.\n• Tuyên truyền suông không hiệu quả: Cho túi miễn phí thì người mua vẫn tiện tay lấy vô tội vạ, hô hào khẩu hiệu không làm đổi thói quen.\n• Hiệu ứng tâm lý từ đồng tiền: Phí dù chỉ vài ngàn đồng nhưng tạo điểm ngắt tâm lý ở quầy thu ngân, nhắc nhở người dân mang túi vải theo.\n• Hỗ trợ người khó khăn: Tặng túi vải bền miễn phí tại siêu thị và thư viện cho người nghèo giúp vừa sạch môi trường vừa nhân văn."
    },

    # 35: Water Limits in Droughts
    {
        "id": "sample_discussion_generated_35",
        "type": "discussion",
        "title": "Water Limits in Droughts",
        "topicCategory": "Environment & Climate",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Professor Luis Ortega",
            "professorTitle": "Professor of Environmental Sciences",
            "professorQuestion": "Severe climate droughts are threatening municipal water reservoirs. Should city authorities enforce strict legal limits banning residential lawn watering and private swimming pool refills, or should cities raise water utility prices steeply during shortages?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Enforcing clear legal bans on ornamental lawn watering treats water as a precious shared resource and ensures that basic human drinking needs take absolute priority."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Strict bans are hard to police. Raising volumetric water rates lets the market conserve water naturally, allowing individuals who value outdoor greenery to pay for it."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "Although Sarah argues that volumetric pricing uses market mechanics to encourage conservation without intrusive policing, I strongly side with Michael that cities must enforce direct legal prohibitions on cosmetic lawn watering during severe droughts.\n\nWater is not a speculative market commodity to be bought by the highest bidder; it is an irreplaceable biological necessity. Relying purely on price increases creates deeply inequitable outcomes: wealthy suburban homeowners gladly pay exorbitant utility surcharges to keep vanity bluegrass lawns lush and swimming pools full, while struggling families cut back on essential showers and cooking. In contrast, outright prohibitions on non-essential ornamental irrigation establish clear civic fairness: every citizen shares the sacrifice equally to protect community reservoir supplies for firefighting, hospitals, and basic hydration. Mandating water conservation through enforceable community regulations treats vital natural resources with the urgency and equity that climate emergencies demand.",
        "wordCount": 133,
        "vocabularyHighlights": [
            {
                "term": "cosmetic lawn watering",
                "meaning": "việc tưới cỏ làm đẹp cảnh quan đơn thuần",
                "contextInEssay": "direct legal prohibitions on cosmetic lawn watering during severe droughts"
            },
            {
                "term": "speculative market commodity",
                "meaning": "mặt hàng đầu cơ thương mại đơn thuần trên thị trường",
                "contextInEssay": "Water is not a speculative market commodity to be bought by the highest bidder"
            },
            {
                "term": "ornamental irrigation",
                "meaning": "hoạt động tưới tiêu cho cây cảnh trang trí",
                "contextInEssay": "outright prohibitions on non-essential ornamental irrigation establish clear civic fairness"
            },
            {
                "term": "reservoir supplies",
                "meaning": "nguồn nước dự trữ trong hồ chứa của thành phố",
                "contextInEssay": "protect community reservoir supplies for firefighting, hospitals"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận cơ chế giá thị trường của Sarah, ủng hộ Michael ra lệnh cấm tưới cỏ cảnh quan khi hạn hán nghiêm trọng.\n• Nước sạch là sự sống, không phải hàng đầu cơ: Tăng giá nước chỉ làm người nghèo khổ thêm, trong khi đại gia sẵn sàng trả tiền để giữ cỏ xanh mướt.\n• Công bằng xã hội thời khủng hoảng: Lệnh cấm tưới cỏ áp dụng đồng đều cho tất cả mọi người, bảo vệ nguồn nước cho bệnh viện và sinh hoạt thiết yếu.\n• Ý thức vì cộng đồng: Ban hành luật cấm rõ ràng tạo nên sự đồng lòng, cứu hồ chứa nước ngọt trước nguy cơ cạn kiệt."
    },

    # 36: Solar Panels on Schools
    {
        "id": "sample_discussion_generated_36",
        "type": "discussion",
        "title": "Solar Panels on Schools",
        "topicCategory": "Environment & Climate",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Professor Luis Ortega",
            "professorTitle": "Professor of Environmental Sciences",
            "professorQuestion": "Public school buildings possess massive, unshaded rooftops. Should school districts prioritize investing bond funds into installing photovoltaic solar panels on school roofs, or should limited educational capital be reserved entirely for modernizing science labs and classroom technology?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Solar rooftops generate immense financial and environmental savings. Lower utility bills free up millions for teacher salaries, and panels serve as real-world science learning tools."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Solar installations require high upfront capital and years to break even. Schools exist to educate, so budgets must go directly to textbooks, computers, and smaller class sizes."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Sarah sensibly emphasizes that funding instructional materials directly impacts daily student learning, I agree with Michael that installing rooftop solar arrays on public schools is an exceptional, forward-thinking investment.\n\nPublic schools spend staggering percentages of their operating budgets on electricity to heat, cool, and illuminate sprawling academic complexes. Escalating commercial utility rates drain vital funding away from academic programs every year. Installing photovoltaic panels eliminates massive recurring utility expenses, redirecting hundreds of thousands of dollars directly back into teacher compensation, library resources, and art classes for decades to come. Furthermore, on-site solar systems turn school roofs into interactive STEM laboratories: students can monitor real-time photovoltaic output data, study renewable physics, and understand climate solutions firsthand. Solarizing educational rooftops simultaneously secures fiscal independence for school districts and delivers profound ecological education to the next generation.",
        "wordCount": 130,
        "vocabularyHighlights": [
            {
                "term": "rooftop solar arrays",
                "meaning": "dàn pin năng lượng mặt trời lắp trên mái nhà",
                "contextInEssay": "installing rooftop solar arrays on public schools is an exceptional"
            },
            {
                "term": "recurring utility expenses",
                "meaning": "chi phí điện nước định kỳ hàng tháng tốn kém",
                "contextInEssay": "photovoltaic panels eliminates massive recurring utility expenses"
            },
            {
                "term": "interactive STEM laboratories",
                "meaning": "phòng thí nghiệm khoa học công nghệ tương tác thực tế",
                "contextInEssay": "turn school roofs into interactive STEM laboratories"
            },
            {
                "term": "fiscal independence",
                "meaning": "sự tự chủ và vững mạnh về tài chính ngân sách",
                "contextInEssay": "secures fiscal independence for school districts and delivers profound ecological education"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Tôn trọng ý kiến mua sắm thiết bị dạy học của Sarah, nghiêng về Michael đầu tư điện mặt trời áp mái trường học.\n• Cắt giảm chi phí định kỳ khổng lồ: Tiền điện hàng tháng ngốn ngân sách rất lớn; tự sản xuất điện giúp dôi dư hàng tỷ đồng để tăng lương cho giáo viên.\n• Giáo cụ trực quan tuyệt vời: Biến mái trường thành phòng thí nghiệm STEM sống động, học sinh tự đo đạc công suất và học vật lý thực tế.\n• Lợi ích kép bền vững: Vừa giúp nhà trường tự chủ tài chính lâu dài vừa giáo dục ý thức bảo vệ môi trường cho thế hệ tương lai."
    },

    # 37: Electric Buses
    {
        "id": "sample_discussion_generated_37",
        "type": "discussion",
        "title": "Electric Buses",
        "topicCategory": "Environment & Climate",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Professor Luis Ortega",
            "professorTitle": "Professor of Environmental Sciences",
            "professorQuestion": "Urban diesel transit fleets produce significant greenhouse emissions and fine particulate soot. Should municipal transit authorities aggressively replace diesel fleets with battery-electric buses, or should cities prioritize expanding bus route coverage using cheaper hybrid vehicles?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Electric buses eliminate tailpipe smog entirely. Clean air immediately reduces childhood asthma along congested bus corridors and slashes greenhouse gases to fight climate change."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Electric buses are twice as expensive and require charging depots. Spending that capital on cheaper hybrids lets cities expand routes to underserved transit-desert neighborhoods."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "Although Sarah raises a pragmatic point that purchasing cheaper hybrid buses allows cities to stretch capital budgets and expand route coverage quickly, I strongly agree with Michael that transitioning fully to battery-electric buses is essential.\n\nDiesel exhaust is a certified carcinogen and a primary catalyst for respiratory illnesses, disproportionately sickening low-income urban residents who live along congested transit avenues. Hybrid buses still burn fossil fuels and spew particulate matter onto crowded sidewalks. In sharp contrast, battery-electric buses produce zero tailpipe emissions, delivering immediate, life-saving public health improvements in vulnerable neighborhoods. Furthermore, electric drivetrains contain far fewer moving mechanical components than internal combustion engines, slashing lifetime maintenance expenses and fuel costs by up to seventy percent over the vehicle's lifespan. Prioritizing zero-emission electric buses eliminates toxic street-level air pollution and leads the fight against climate catastrophe.",
        "wordCount": 131,
        "vocabularyHighlights": [
            {
                "term": "battery-electric buses",
                "meaning": "xe buýt chạy hoàn toàn bằng pin điện không xả khói",
                "contextInEssay": "transitioning fully to battery-electric buses is essential"
            },
            {
                "term": "zero tailpipe emissions",
                "meaning": "không phát thải bất kỳ khí độc hại nào từ ống xả",
                "contextInEssay": "battery-electric buses produce zero tailpipe emissions"
            },
            {
                "term": "internal combustion engines",
                "meaning": "động cơ đốt trong truyền thống chạy bằng nhiên liệu hóa thạch",
                "contextInEssay": "fewer moving mechanical components than internal combustion engines"
            },
            {
                "term": "toxic street-level air pollution",
                "meaning": "ô nhiễm không khí độc hại ngay tầm thở trên đường phố",
                "contextInEssay": "eliminates toxic street-level air pollution and leads the fight"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận tính kinh tế mở rộng tuyến của xe buýt lai theo Sarah, đồng tình với Michael phải chuyển hẳn sang xe buýt thuần điện.\n• Cứu lá phổi người dân: Khói dầu diesel chứa chất gây ung thư và hen suyễn cho người nghèo sống ven đường; xe điện sạch tuyệt đối không khói.\n• Tiết kiệm chi phí bảo dưỡng: Động cơ điện cấu tạo đơn giản, không cần thay dầu bugi, tiết kiệm 70% chi phí nhiên liệu và sửa chữa cả đời xe.\n• Tầm nhìn khí hậu xanh: Xóa bỏ hoàn toàn khí thải đô thị là bước đi tất yếu để hiện đại hóa giao thông công cộng."
    },

    # 38: Food Waste Collection
    {
        "id": "sample_discussion_generated_38",
        "type": "discussion",
        "title": "Food Waste Collection",
        "topicCategory": "Environment & Climate",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Professor Luis Ortega",
            "professorTitle": "Professor of Environmental Sciences",
            "professorQuestion": "Food waste trapped in landfills generates dangerous amounts of methane gas. Should municipal sanitation departments implement mandatory curbside organic composting collection for all households, or should composting remain voluntary while cities subsidize commercial supermarket food donation programs?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Mandatory curbside composting is crucial. Organic scraps make up thirty percent of household trash; diverting them produces valuable compost and eliminates catastrophic methane emissions."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Mandatory food bins attract rats, maggots, and foul odors to neighborhoods. Enforcing rules on private residents is difficult; targeting grocery store waste is far more efficient."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Sarah raises understandable concerns regarding rodent pests and enforcement difficulties, I firmly align with Michael that municipal sanitation departments must institute mandatory curbside organic waste collection.\n\nOrganic discards represent over one-third of total residential waste. When buried under dense landfill layers without oxygen, rotting food generates methane—a potent greenhouse gas eighty times more destructive than carbon dioxide. Leaving composting voluntary inevitably fails, as busy households simply take the path of least resistance and toss scraps into regular trash bins. Providing sealed, rodent-proof green bins alongside aerated countertop pails solves pest complaints effortlessly while turning biological waste into rich, nutrient-dense organic fertilizer for regional agriculture and community parks. Cities like San Francisco and Seoul prove that clear sorting guidelines and universal participation achieve ninety percent waste diversion. Mandatory composting is an indispensable weapon against runaway climate change.",
        "wordCount": 133,
        "vocabularyHighlights": [
            {
                "term": "mandatory curbside organic waste collection",
                "meaning": "thu gom rác hữu cơ thực phẩm bắt buộc tại lề đường từng nhà",
                "contextInEssay": "must institute mandatory curbside organic waste collection"
            },
            {
                "term": "potent greenhouse gas",
                "meaning": "khí nhà kính có sức tàn phá cực mạnh (như khí mê-tan)",
                "contextInEssay": "rotting food generates methane—a potent greenhouse gas"
            },
            {
                "term": "nutrient-dense organic fertilizer",
                "meaning": "phân bón hữu cơ giàu dinh dưỡng cho đất đai",
                "contextInEssay": "biological waste into rich, nutrient-dense organic fertilizer"
            },
            {
                "term": "waste diversion",
                "meaning": "tỷ lệ chuyển hướng và phân loại rác thải tránh chôn lấp",
                "contextInEssay": "clear sorting guidelines and universal participation achieve ninety percent waste diversion"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận nỗi sợ chuột bọ và mùi hôi của Sarah, đứng về phía Michael ủng hộ bắt buộc thu gom rác thực phẩm tận nhà.\n• Nguy cơ sinh khí mê-tan: Thức ăn thừa chôn dưới bãi rác không có oxy sinh ra khí mê-tan độc hại, làm biến đổi khí hậu nhanh gấp 80 lần CO2.\n• Tự nguyện không hiệu quả: Nếu không bắt buộc, người dân sẽ tiện tay ném tất cả vào một thùng rác chung gây thất bại hoàn toàn.\n• Thùng rác chống chuột chuyên dụng: Cấp thùng xanh có khóa nắp chặt chẽ vừa sạch sẽ vừa biến rác hữu cơ thành phân bón tốt cho nông nghiệp."
    },

    # 39: Floodplain Construction
    {
        "id": "sample_discussion_generated_39",
        "type": "discussion",
        "title": "Floodplain Construction",
        "topicCategory": "Environment & Climate",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Professor Luis Ortega",
            "professorTitle": "Professor of Environmental Sciences",
            "professorQuestion": "As severe storms intensify, rivers repeatedly inundate newly built riverside suburbs. Should municipal zoning boards outright ban all new residential construction on designated floodplains, or should developers be permitted to build if they elevate homes on stilts and install flood barriers?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Banning construction on floodplains saves lives and billions in disaster relief. Rivers naturally need room to overflow, and wetlands act as sponges that protect existing cities."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Outright bans worsen severe urban housing shortages. Advanced engineering, stilts, and elevated retaining levees allow safe waterfront living without blocking economic growth."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "Although Sarah points out that engineering adaptations like stilts can protect elevated buildings while expanding housing supply, I firmly agree with Michael that cities must enact total prohibitions against new construction on natural floodplains.\n\nBuilding in recognized flood zones is a disastrous gamble against increasingly erratic climate extremes. While elevated stilts may spare a living room, floodwaters still sever electrical grids, rupture sewer pipes, submerge access roads, and trap residents, endangering emergency rescue personnel. Furthermore, paving over natural floodplains with concrete driveways destroys the natural sponge capacity of wetlands, forcing excess water downstream into older established neighborhoods. Taxpayers end up footing multi-billion-dollar emergency relief bills and subsidized flood insurance bailouts when engineered levees inevitably fail. Preserving floodplains as public greenways and riparian wetlands restores natural flood buffering, saves taxpayer fortunes, and permanently shields human lives.",
        "wordCount": 133,
        "vocabularyHighlights": [
            {
                "term": "natural floodplains",
                "meaning": "các vùng đồng bằng châu thổ ngập lụt tự nhiên của sông ngòi",
                "contextInEssay": "total prohibitions against new construction on natural floodplains"
            },
            {
                "term": "erratic climate extremes",
                "meaning": "những hiện tượng thời tiết cực đoan, thất thường do biến đổi khí hậu",
                "contextInEssay": "disastrous gamble against increasingly erratic climate extremes"
            },
            {
                "term": "natural sponge capacity",
                "meaning": "dung tích và khả năng thẩm thấu nước tự nhiên như bọt biển của đầm lầy",
                "contextInEssay": "destroys the natural sponge capacity of wetlands"
            },
            {
                "term": "riparian wetlands",
                "meaning": "vùng đất ngập nước ven sông tự nhiên",
                "contextInEssay": "Preserving floodplains as public greenways and riparian wetlands"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận giải pháp nhà sàn bê tông của Sarah, đồng tình với Michael cấm tuyệt đối xây nhà trên vùng trũng thoát lũ.\n• Nguy hiểm rình rập: Nhà xây trên cọc cao thì nước vẫn ngập đường sá, đứt dây điện, vỡ ống cống khiến lính cứu hộ phải bơi vào cứu người nguy hiểm.\n• Hiệu ứng dồn nước: Bê tông hóa vùng ngập nước làm mất khả năng thấm nước tự nhiên, đẩy nước lũ tràn sang nhấn chìm các khu dân cư cũ lân cận.\n• Giải pháp bền vững: Để vùng thoát lũ làm công viên sinh thái ngập nước, vừa tạo lá chắn tự nhiên vừa tiết kiệm hàng tỷ đô la cứu trợ."
    },

    # 40: Environmental Labels on Products
    {
        "id": "sample_discussion_generated_40",
        "type": "discussion",
        "title": "Environmental Labels on Products",
        "topicCategory": "Environment & Climate",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Professor Luis Ortega",
            "professorTitle": "Professor of Environmental Sciences",
            "professorQuestion": "Consumer manufacturing contributes heavily to greenhouse emissions. Should regulatory agencies mandate standardized 'carbon and environmental footprint' labels on all consumer retail products—similar to nutritional facts on food—or should eco-labeling remain voluntary for manufacturers?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Mandatory eco-labels provide transparency. When consumers can compare the exact carbon footprint of two shirts or cereals, market competition forces corporations to clean up supply chains."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Calculating precise lifecycle carbon costs is bureaucratic and wildly expensive for small businesses. Shoppers are already overwhelmed by labels and prioritize price and quality anyway."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Sarah raises a fair point regarding the accounting complexity and auditing costs for small artisan businesses, I strongly side with Michael that standardized environmental footprint labels should be legally mandated on consumer goods.\n\nWithout standardized, verified metrics, corporate 'greenwashing' runs rampant: companies make misleading, vague marketing claims like 'eco-friendly' or 'all-natural' without making genuine ecological reforms. Just as mandatory nutritional facts transformed consumer food choices and forced food manufacturers to eliminate harmful trans fats, mandatory carbon footprint scores empower shoppers to vote with their wallets. When consumers can instantly see that one pair of shoes generated forty kilograms of carbon while another generated only eight, green brands thrive. Standardized color-coded labels simplify purchasing decisions and create intense market incentives for global manufacturers to decarbonize logistics, eliminate plastic packaging, and reduce factory emissions.",
        "wordCount": 133,
        "vocabularyHighlights": [
            {
                "term": "standardized environmental footprint labels",
                "meaning": "nhãn chuẩn hóa về dấu chân carbon và mức tác động môi trường",
                "contextInEssay": "standardized environmental footprint labels should be legally mandated"
            },
            {
                "term": "corporate 'greenwashing'",
                "meaning": "chiêu trò 'tẩy xanh' giả tạo của các doanh nghiệp nhằm đánh bóng tên tuổi",
                "contextInEssay": "Without standardized, verified metrics, corporate 'greenwashing' runs rampant"
            },
            {
                "term": "vote with their wallets",
                "meaning": "bỏ phiếu bằng ví tiền (chọn mua sản phẩm thân thiện với môi trường)",
                "contextInEssay": "mandatory carbon footprint scores empower shoppers to vote with their wallets"
            },
            {
                "term": "decarbonize logistics",
                "meaning": "khử carbon và giảm phát thải trong chuỗi cung ứng logistics",
                "contextInEssay": "market incentives for global manufacturers to decarbonize logistics"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận chi phí kiểm toán của Sarah, ủng hộ Michael bắt buộc dán nhãn mức độ phát thải carbon trên hàng hóa.\n• Chấm dứt chiêu trò 'tẩy xanh': Thiếu số liệu kiểm định khiến các công ty tự nhận là 'thân thiện môi trường' lừa dối người tiêu dùng.\n• Sức mạnh của thông tin minh bạch: Giống như bảng dinh dưỡng calo trên đồ ăn, nhãn carbon giúp người mua dễ dàng chọn đồ ít xả thải ra Trái Đất.\n• Thúc đẩy cạnh tranh sạch: Doanh nghiệp muốn bán được hàng buộc phải tối ưu khâu vận chuyển, dùng năng lượng sạch để hạ điểm số carbon."
    },

    # 41: Healthy Meals in Schools
    {
        "id": "sample_discussion_generated_41",
        "type": "discussion",
        "title": "Healthy Meals in Schools",
        "topicCategory": "Public Health & Food",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Dr. Hannah Lee",
            "professorTitle": "Professor of Nutritional Sciences",
            "professorQuestion": "Childhood obesity and nutritional deficiencies are rising. Should public school systems strictly ban processed chicken nuggets, pizzas, and french fries from cafeterias in favor of entirely whole-grain, vegetable-centered meals, or should cafeterias offer balanced choices including familiar comfort foods?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Strict bans are essential. Schools should model optimal nutrition; allowing greasy junk foods normalizes unhealthy eating habits that lead to childhood diabetes and heart disease."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Drastic bans backfire horribly. Picky children simply throw whole-grain meals into the trash or bring junk food from home, leaving hungry students unable to focus in class."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "Although Sarah points out the realistic risk that rigid culinary mandates can lead to cafeteria food waste and empty bellies, I side with Michael that schools must replace ultra-processed junk food with wholesome, nutritious meals.\n\nSchools have a fundamental duty of care to cultivate healthy developmental foundations. When school cafeterias serve sodium-laden chicken nuggets and greasy french fries, they implicitly endorse dietary patterns that trigger childhood obesity, hypertension, and lethargy. Conversely, providing delicious, colorful whole foods—such as brown rice bowls, savory roasted vegetables, and fresh seasonal fruit—trains young palates to appreciate natural flavors. To prevent the food waste Sarah fears, schools can involve culinary chefs in making healthy food flavorful through herbs and mild spices, accompanied by interactive nutrition education. Establishing uncompromising standards in school dining halls protects children's long-term cardiovascular health and ensures equitable access to nourishing food.",
        "wordCount": 133,
        "vocabularyHighlights": [
            {
                "term": "ultra-processed junk food",
                "meaning": "thực phẩm rác siêu chế biến, nghèo dinh dưỡng",
                "contextInEssay": "replace ultra-processed junk food with wholesome, nutritious meals"
            },
            {
                "term": "developmental foundations",
                "meaning": "nền tảng phát triển thể chất và trí tuệ đầu đời của trẻ",
                "contextInEssay": "duty of care to cultivate healthy developmental foundations"
            },
            {
                "term": "trains young palates",
                "meaning": "rèn luyện khẩu vị và sở thích ăn uống lành mạnh từ nhỏ",
                "contextInEssay": "trains young palates to appreciate natural flavors"
            },
            {
                "term": "cardiovascular health",
                "meaning": "sức khỏe hệ tim mạch và tuần hoàn",
                "contextInEssay": "protects children's long-term cardiovascular health"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận thực tế học sinh lãng phí bỏ ăn của Sarah, đứng về phía Michael kiên quyết loại bỏ đồ ăn nhanh trong trường.\n• Trách nhiệm của nhà trường: Bán gà rán, khoai chiên dầu mỡ là gián tiếp tiếp tay cho bệnh tiểu đường và béo phì ở lứa tuổi học đường.\n• Rèn luyện vị giác tự nhiên: Đưa cơm gạo lứt, rau củ nướng thơm ngon giúp trẻ làm quen với hương vị lành mạnh thay vì nghiện gia vị công nghiệp.\n• Nấu ăn ngon & giáo dục: Đầu bếp nêm nếm gia vị thảo mộc hấp dẫn sẽ giúp các em thích ăn rau củ và bảo vệ trái tim khỏe mạnh."
    },

    # 42: Sugary Drink Taxes
    {
        "id": "sample_discussion_generated_42",
        "type": "discussion",
        "title": "Sugary Drink Taxes",
        "topicCategory": "Public Health & Food",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Dr. Hannah Lee",
            "professorTitle": "Professor of Nutritional Sciences",
            "professorQuestion": "Sugar-sweetened beverages are primary drivers of diabetes, tooth decay, and obesity. Should municipal governments enact a specific excise tax on sodas and energy drinks, or should public health authorities focus their efforts on voluntary nutrition education in community centers?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Excise taxes work like magic. Raising soda prices by twenty percent prompts shoppers to drink water instead, and the tax proceeds directly fund community parks and school clinics."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Soda taxes are regressive and unfair. Low-income families bear the brunt of higher grocery costs; educating people on balanced diets respects personal consumer freedom."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Sarah compassionately argues that soda taxes place a regressive financial burden on working-class grocery budgets, I firmly agree with Michael that implementing dedicated excise taxes on sugar-sweetened beverages is essential.\n\nVoluntary educational campaigns are vastly outspent by billions in predatory corporate soda advertising aimed at young children. Price signals, by contrast, create immediate, decisive behavioral change. In jurisdictions that implemented a one-cent-per-ounce soda tax, consumption of sugary beverages dropped by over twenty percent within months, resulting in measurable declines in childhood cavities and type 2 diabetes. Furthermore, the tax is not punitive; water and unsweetened alternatives remain completely untaxed. Critically, municipal soda tax revenues are legally earmarked to build neighborhood sports fields and provide clean drinking water stations in underprivileged schools. Soda taxes effectively correct market failure and protect public health without restricting dietary freedom.",
        "wordCount": 133,
        "vocabularyHighlights": [
            {
                "term": "sugar-sweetened beverages",
                "meaning": "đồ uống có đường (nước ngọt có gas, nước tăng lực)",
                "contextInEssay": "dedicated excise taxes on sugar-sweetened beverages is essential"
            },
            {
                "term": "price signals",
                "meaning": "tín hiệu giá cả tác động trực tiếp đến quyết định mua hàng",
                "contextInEssay": "Price signals, by contrast, create immediate, decisive behavioral change"
            },
            {
                "term": "type 2 diabetes",
                "meaning": "bệnh tiểu đường tuýp 2 do lối sống và ăn uống dư đường",
                "contextInEssay": "childhood cavities and type 2 diabetes"
            },
            {
                "term": "legally earmarked",
                "meaning": "được quy định pháp lý dùng cho mục đích cụ thể",
                "contextInEssay": "revenues are legally earmarked to build neighborhood sports fields"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận sự lo ngại về gánh nặng tài chính của Sarah, ủng hộ Michael đánh thuế tiêu thụ đặc biệt lên nước ngọt.\n• Tác dụng mạnh mẽ của giá cả: Tuyên truyền giáo dục không lại được quảng cáo nước ngọt; tăng giá 20% lập tức khiến người dân chuyển sang uống nước lọc.\n• Giảm bệnh tật rõ rệt: Các thành phố áp thuế ghi nhận tỷ lệ sâu răng và tiểu đường tuýp 2 giảm mạnh chỉ sau vài tháng triển khai.\n• Dùng tiền thuế tái đầu tư: Nước lọc không bị đánh thuế; tiền thu được từ nước ngọt lại dùng để xây sân chơi và máy lọc nước miễn phí cho học sinh."
    },

    # 43: Mental Health Days for Students
    {
        "id": "sample_discussion_generated_43",
        "type": "discussion",
        "title": "Mental Health Days for Students",
        "topicCategory": "Public Health & Food",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Dr. Hannah Lee",
            "professorTitle": "Professor of Nutritional Sciences",
            "professorQuestion": "Under intense academic pressure, adolescents suffer from rising anxiety and burnout. Should secondary schools legally permit students to take two or three excused 'mental health days' per semester, or should schools require medical notes for all excused absences?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Mental health days destigmatize psychological wellness. Allowing students a sanctioned pause prevents severe emotional breakdown and validates that mental rest is just as important as physical rest."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Students will abuse mental health days to skip difficult exams and sleep in. Missing class actually compounds academic stress when students fall behind on coursework."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "Although Sarah raises a realistic concern that some pupils might opportunistically use mental health days to avoid difficult examinations, I firmly side with Michael that schools should officially permit designated mental wellness absences.\n\nEquating physical illness with genuine legitimacy while dismissing mental exhaustion as mere laziness is a dangerous relic of the past. Academic burnout, depression, and severe anxiety are biologically authentic conditions that paralyze cognitive functioning. Forcing an emotionally overwhelmed student to sit silently in class achieves zero learning and frequently culminates in acute crisis. Permitting two excused mental health days per semester provides a crucial emotional safety valve, allowing students to decompress, sleep, and reset their nervous systems without guilt. Guardrails can be instituted: mental health days cannot be used during scheduled midterms, and multiple absences prompt proactive check-ins from counselors. Destigmatizing rest protects adolescent mental health and fosters long-term academic resilience.",
        "wordCount": 137,
        "vocabularyHighlights": [
            {
                "term": "mental wellness absences",
                "meaning": "những ngày nghỉ phép được công nhận vì lý do sức khỏe tinh thần",
                "contextInEssay": "should officially permit designated mental wellness absences"
            },
            {
                "term": "academic burnout",
                "meaning": "hội chứng kiệt sức vì áp lực học tập và thi cử dồn dập",
                "contextInEssay": "Academic burnout, depression, and severe anxiety are biologically authentic"
            },
            {
                "term": "emotional safety valve",
                "meaning": "chiếc van an toàn cảm xúc giúp giải tỏa áp lực đúng lúc",
                "contextInEssay": "provides a crucial emotional safety valve, allowing students to decompress"
            },
            {
                "term": "academic resilience",
                "meaning": "sự bền bỉ và phục hồi dẻo dai trong học tập",
                "contextInEssay": "protects adolescent mental health and fosters long-term academic resilience"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận khả năng lạm dụng trốn thi của Sarah, tán thành Michael cho phép học sinh nghỉ vài ngày để giải tỏa tâm lý.\n• Sức khỏe tinh thần quan trọng như thể chất: Kiệt sức tinh thần là triệu chứng sinh học thật sự; ép ngồi trong lớp khi tinh thần hoảng loạn là vô ích.\n• Chiếc van an toàn cảm xúc: 1-2 ngày nghỉ đúng lúc giúp hạ nhiệt thần kinh, ngủ đủ giấc để phục hồi trạng thái sẵn sàng học tập.\n• Quy định chặt chẽ: Cấm nghỉ vào ngày thi học kỳ, nếu nghỉ quá nhiều thầy cô tâm lý sẽ chủ động liên hệ hỗ trợ kịp thời."
    },

    # 44: Food Labels in Cafeterias
    {
        "id": "sample_discussion_generated_44",
        "type": "discussion",
        "title": "Food Labels in Cafeterias",
        "topicCategory": "Public Health & Food",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Dr. Hannah Lee",
            "professorTitle": "Professor of Nutritional Sciences",
            "professorQuestion": "Food allergies and dietary restrictions are prevalent among university students. Should university cafeterias display comprehensive, conspicuous allergen placards and nutritional breakdowns for every dish, or should students rely on asking cafeteria culinary staff directly?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Clear allergen labels save lives. Students with life-threatening peanut, gluten, or dairy allergies can make safe decisions immediately without holding up long lunch queues."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Placards can be outdated if chefs swap ingredients mid-shift. Direct verbal communication with kitchen managers ensures accurate, real-time safety checks against cross-contamination."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Sarah rightly emphasizes that kitchen cross-contamination and last-minute ingredient substitutions require vigilance, I strongly agree with Michael that university cafeterias must display prominent, standardized allergen and dietary labels at every food station.\n\nFor students with severe anaphylactic allergies, eating in a bustling dining hall is an anxiety-ridden experience. Requiring allergic students to interrogate hurried dining hall staff during chaotic peak lunch hours is humiliating and inefficient, creating long bottlenecks and frequently yielding inaccurate verbal answers from uninformed student workers. In contrast, standardized digital or laminated placards displaying clear universal symbols for common allergens—including peanuts, dairy, shellfish, and gluten—empower students to navigate food lines autonomously and safely. Dining services can maintain strict safety by establishing an ironclad protocol requiring culinary chefs to update placards whenever recipes change. Conspicuous labeling prevents medical emergencies and fosters an inclusive campus dining environment.",
        "wordCount": 133,
        "vocabularyHighlights": [
            {
                "term": "severe anaphylactic allergies",
                "meaning": "dị ứng sốc phản vệ nghiêm trọng đe dọa tính mạng",
                "contextInEssay": "students with severe anaphylactic allergies, eating in a bustling dining hall"
            },
            {
                "term": "universal symbols",
                "meaning": "các biểu tượng hình vẽ quy chuẩn quốc tế dễ nhận biết",
                "contextInEssay": "displaying clear universal symbols for common allergens"
            },
            {
                "term": "ironclad protocol",
                "meaning": "quy trình chuẩn ngặt nghèo, bất di bất dịch",
                "contextInEssay": "establishing an ironclad protocol requiring culinary chefs to update placards"
            },
            {
                "term": "conspicuous labeling",
                "meaning": "việc dán nhãn thông tin rõ ràng, nổi bật, dễ nhìn",
                "contextInEssay": "Conspicuous labeling prevents medical emergencies and fosters an inclusive campus"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận rủi ro thay đổi nguyên liệu đột xuất của Sarah, đồng tình với Michael phải dán biển nhãn dị ứng nổi bật.\n• An toàn tính mạng & tránh ách tắc: Người bị dị ứng lạc hay hải sản có thể sốc phản vệ chết người; bắt hỏi miệng từng nhân viên giờ ăn rất dễ nhầm lẫn.\n• Biểu tượng trực quan quốc tế: Các ký hiệu hình ảnh đơn giản giúp sinh viên nhìn vào là biết món nào an toàn, chọn món nhanh gọn tự chủ.\n• Quy trình cập nhật nghiêm ngặt: Đầu bếp thay đổi gia vị là phải lập tức đổi biển nhãn, đảm bảo an toàn tuyệt đối cho sinh viên."
    },

    # 45: Walking Meetings
    {
        "id": "sample_discussion_generated_45",
        "type": "discussion",
        "title": "Walking Meetings",
        "topicCategory": "Public Health & Food",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Dr. Hannah Lee",
            "professorTitle": "Professor of Nutritional Sciences",
            "professorQuestion": "Office workers spend eight hours daily seated in stagnant chairs. Should organizations institute a corporate policy encouraging 'walking meetings'—conducting one-on-one and small group discussions while strolling outdoors—or should meetings remain seated in conference rooms?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Walking meetings are fantastic for health and creativity. Physical movement increases cerebral blood circulation, sparks innovative brainstorming, and combats sedentary corporate diseases."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Walking meetings are impractical for serious work. Strolling colleagues cannot take detailed notes, view spreadsheets, or ensure privacy, and outdoor distractions ruin professional focus."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Sarah makes a valid point that complex data presentations and spreadsheet reviews require computer monitors and quiet conference tables, I side with Michael that organizations should actively embrace walking meetings for discussions.\n\nSedentary office routines are catastrophic for cardiovascular health, promoting spinal strain, obesity, and afternoon sluggishness. Forcing colleagues to sit beneath fluorescent lights for every casual status update is stifling and counterproductive. In contrast, walking side-by-side outdoors breaks down intimidating corporate hierarchies, fostering candid, collaborative communication. Cognitive neuroscience demonstrates that light aerobic locomotion stimulates dopamine and blood flow to the prefrontal cortex, significantly boosting creative problem-solving. Walking meetings do not replace all formal seated sessions; rather, they are ideal for one-on-one mentoring, performance feedback, and creative ideation. Integrating walking meetings infuses physical vitality into corporate life, transforming routine discussions into energizing experiences.",
        "wordCount": 133,
        "vocabularyHighlights": [
            {
                "term": "sedentary office routines",
                "meaning": "thói quen ngồi lì làm việc văn phòng suốt cả ngày",
                "contextInEssay": "Sedentary office routines are catastrophic for cardiovascular health"
            },
            {
                "term": "intimidating corporate hierarchies",
                "meaning": "sự phân cấp thứ bậc cứng nhắc, gò bó trong công sở",
                "contextInEssay": "breaks down intimidating corporate hierarchies, fostering candid, collaborative"
            },
            {
                "term": "light aerobic locomotion",
                "meaning": "hoạt động vận động đi bộ nhẹ nhàng tiếp oxy cho cơ thể",
                "contextInEssay": "light aerobic locomotion stimulates dopamine and blood flow"
            },
            {
                "term": "creative ideation",
                "meaning": "quá trình hình thành ý tưởng sáng tạo đột phá",
                "contextInEssay": "one-on-one mentoring, performance feedback, and creative ideation"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Thừa nhận những cuộc họp xem số liệu cần màn hình theo Sarah, ủng hộ Michael khuyến khích vừa đi dạo vừa trao đổi công việc.\n• Thoát khỏi ghế văn phòng: Ngồi suốt 8 tiếng dưới ánh đèn nhân tạo làm cơ thể mệt mỏi, đau lưng và ức chế khả năng sáng tạo.\n• Bình đẳng và cởi mở: Cùng đi dạo ngoài trời giúp xóa tan khoảng cách sếp và nhân viên, nói chuyện chân thành và thoải mái hơn.\n• Kích thích tư duy: Đi bộ nhẹ nhàng giúp máu bơm lên não tốt hơn, cực kỳ phù hợp cho các buổi góp ý công việc và tìm ý tưởng mới."
    },

    # 46: Public Exercise Spaces
    {
        "id": "sample_discussion_generated_46",
        "type": "discussion",
        "title": "Public Exercise Spaces",
        "topicCategory": "Public Health & Food",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Dr. Hannah Lee",
            "professorTitle": "Professor of Nutritional Sciences",
            "professorQuestion": "Private gym memberships are prohibitively expensive for low-income citizens. Should municipal governments invest tax capital into installing free, weather-resistant outdoor fitness equipment in public parks, or should cities hire public fitness instructors to run group classes in community centers?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Outdoor gym equipment provides permanent, 24/7 fitness access. Anyone can do pull-ups, chest presses, and leg lifts anytime without paying fees or adhering to class schedules."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Without certified guidance, beginners use outdoor machinery with terrible form and injure their joints. Group instructors provide motivation, safety instruction, and personalized encouragement."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "Although Sarah insightfully points out that certified trainers provide valuable form correction and motivational coaching, I firmly agree with Michael that installing permanent outdoor fitness stations in public parks is the superior public health investment.\n\nHiring fitness instructors involves recurring salary obligations and restricts exercise to rigid class times that shift workers, hourly laborers, and busy parents cannot attend. In contrast, heavy-duty outdoor gym equipment—such as calisthenics bars, chest presses, and elliptical machines—represents a one-time capital investment that delivers continuous, cost-free public health access for decades. Park equipment removes all economic hurdles, enabling residents to exercise spontaneously on their own schedules. To address Sarah's injury concerns, modern park equipment features clear pictorial diagrams and QR codes linking to thirty-second instructional safety videos. Installing outdoor public gyms democratizes fitness and promotes universal preventative health across urban neighborhoods.",
        "wordCount": 133,
        "vocabularyHighlights": [
            {
                "term": "permanent outdoor fitness stations",
                "meaning": "các trạm thiết bị tập thể dục ngoài trời kiên cố tại công viên",
                "contextInEssay": "installing permanent outdoor fitness stations in public parks is the superior"
            },
            {
                "term": "recurring salary obligations",
                "meaning": "các cam kết chi trả lương định kỳ tốn kém ngân sách",
                "contextInEssay": "involves recurring salary obligations and restricts exercise"
            },
            {
                "term": "pictorial diagrams",
                "meaning": "các sơ đồ minh họa hình ảnh hướng dẫn động tác trực quan",
                "contextInEssay": "features clear pictorial diagrams and QR codes linking to thirty-second"
            },
            {
                "term": "preventative health",
                "meaning": "chăm sóc sức khỏe phòng ngừa chủ động từ sớm",
                "contextInEssay": "democratizes fitness and promotes universal preventative health across urban neighborhoods"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận vai trò chỉnh sửa tư thế của huấn luyện viên theo Sarah, tán thành Michael lắp đặt máy tập ngoài công viên.\n• Đầu tư một lần dùng lâu dài: Thuê huấn luyện viên tốn tiền trả lương hàng tháng và cố định giờ giấc; máy tập ngoài trời mở cửa 24/7 cho mọi người.\n• Phù hợp với mọi tầng lớp: Người lao động tự do hay công nhân tan ca đêm đều có thể ra công viên tập luyện miễn phí bất cứ lúc nào.\n• Hướng dẫn an toàn thông minh: Dán hình minh họa và mã QR quét video 30 giây giúp người tập làm đúng động tác mà không sợ chấn thương."
    },

    # 47: Community Gardens and Nutrition
    {
        "id": "sample_discussion_generated_47",
        "type": "discussion",
        "title": "Community Gardens and Nutrition",
        "topicCategory": "Public Health & Food",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Dr. Hannah Lee",
            "professorTitle": "Professor of Nutritional Sciences",
            "professorQuestion": "Low-income urban neighborhoods frequently suffer as 'food deserts,' lacking fresh produce. Should cities transform vacant municipal lots into community vegetable gardens where residents grow their own food, or should municipal governments subsidize traditional supermarket chains to open stores in underserved areas?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Community gardens provide organic produce, teach agricultural skills, build neighborly solidarity, and transform neglected urban eyesores into vibrant green spaces."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Gardens cannot feed entire neighborhoods. Busy working parents do not have hours to weed and harvest tomatoes; bringing real supermarkets provides reliable, comprehensive food access."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Sarah accurately points out that small community plots cannot match the massive volume and diversity of commercial grocery stores, I firmly agree with Michael that cultivating neighborhood community gardens provides irreplaceable nutritional and social benefits.\n\nSubsidizing corporate supermarket chains often fails, as private grocers abandon low-margin urban stores whenever profits decline. In contrast, community gardens take root directly within neighborhoods. Growing organic vegetables, leafy greens, and culinary herbs reconnects urban families with wholesome food production, significantly increasing fruit and vegetable consumption among participating households. Furthermore, gardening serves as therapeutic outdoor exercise that combats chronic stress and builds deep cross-generational camaraderie among neighbors sharing tools, seeds, and recipes. Transforming derelict asphalt lots into lush gardens also lowers neighborhood summer temperatures and purifies urban air. Community gardens foster food self-sufficiency, social cohesion, and holistic public health.",
        "wordCount": 133,
        "vocabularyHighlights": [
            {
                "term": "community gardens",
                "meaning": "vườn rau cộng đồng chung của khu phố",
                "contextInEssay": "cultivating neighborhood community gardens provides irreplaceable nutritional and social benefits"
            },
            {
                "term": "food self-sufficiency",
                "meaning": "sự tự chủ và tự cung tự cấp về nguồn thực phẩm sạch",
                "contextInEssay": "foster food self-sufficiency, social cohesion, and holistic public health"
            },
            {
                "term": "cross-generational camaraderie",
                "meaning": "tình thân ái, gắn bó giữa các thế hệ trong khu phố",
                "contextInEssay": "builds deep cross-generational camaraderie among neighbors sharing tools"
            },
            {
                "term": "derelict asphalt lots",
                "meaning": "các khu đất rải nhựa bỏ hoang, nhếch nhác",
                "contextInEssay": "Transforming derelict asphalt lots into lush gardens also lowers"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Thừa nhận siêu thị cung cấp khối lượng thức ăn lớn hơn theo Sarah, ủng hộ Michael lập vườn rau cộng đồng tại các bãi đất trống.\n• Siêu thị tư nhân không bền: Trợ cấp cho siêu thị lớn dễ bị họ rút đi khi thấy lợi nhuận thấp; vườn cộng đồng là tài sản bền vững của cư dân.\n• Thay đổi thói quen ăn uống: Tự tay trồng rau củ giúp các gia đình ăn nhiều chất xơ hơn, trẻ con thích ăn rau do chính mình chăm sóc.\n• Giá trị tinh thần và môi trường: Làm vườn là liều thuốc thư giãn đầu óc, gắn kết tình làng nghĩa xóm và làm dịu mát khu phố mùa hè."
    },

    # 48: Health Advice on Social Media
    {
        "id": "sample_discussion_generated_48",
        "type": "discussion",
        "title": "Health Advice on Social Media",
        "topicCategory": "Public Health & Food",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Dr. Hannah Lee",
            "professorTitle": "Professor of Nutritional Sciences",
            "professorQuestion": "Social media platforms are saturated with trendy dietary fads and unverified medical advice. Should public health agencies invest substantial resources into producing engaging short-form videos on TikTok and Instagram to counteract misinformation, or should health budgets be reserved for expanding local clinic staffing?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Public agencies must meet people where they are. Engaging, doctor-led short videos can debunk dangerous medical myths and deliver preventative health tips to millions instantly."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Social media algorithms favor sensationalism over nuanced science. Funding local clinics provides real medical treatments and personal doctor relationships that no thirty-second video can match."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "Although Sarah correctly observes that short video clips cannot substitute for hands-on medical diagnosis and personalized clinical treatment, I agree with Michael that public health agencies must actively create engaging digital content on social media.\n\nModern health decisions are increasingly shaped by viral misinformation. Millions of teenagers and young adults turn to TikTok and Instagram for dietary and mental wellness advice, falling prey to unscientific detox scams and dangerous medical falsehoods promoted by unregulated influencers. If certified physicians and public health authorities refuse to engage on digital platforms, they leave a dangerous vacuum filled by fraudsters. Creating concise, engaging, doctor-verified clips dismantles medical myths, explains vaccination science clearly, and provides trustworthy lifestyle advice to millions at negligible marginal cost. Leveraging social media allows public health agencies to practice proactive preventative medicine on a nationwide scale.",
        "wordCount": 133,
        "vocabularyHighlights": [
            {
                "term": "viral misinformation",
                "meaning": "thông tin sai lệch lan truyền với tốc độ chóng mặt trên mạng",
                "contextInEssay": "health decisions are increasingly shaped by viral misinformation"
            },
            {
                "term": "unregulated influencers",
                "meaning": "những người có ảnh hưởng trên mạng không qua kiểm duyệt chuyên môn",
                "contextInEssay": "dangerous medical falsehoods promoted by unregulated influencers"
            },
            {
                "term": "dismantles medical myths",
                "meaning": "đập tan và vạch trần các hiểu lầm / tin đồn y tế thất thiệt",
                "contextInEssay": "doctor-verified clips dismantles medical myths, explains vaccination science"
            },
            {
                "term": "proactive preventative medicine",
                "meaning": "y học phòng ngừa chủ động trên diện rộng",
                "contextInEssay": "practice proactive preventative medicine on a nationwide scale"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận vai trò khám chữa bệnh trực tiếp tại trạm xá của Sarah, đồng ý với Michael cơ quan y tế phải làm video ngắn trên mạng.\n• Mảnh đất màu mỡ của tin giả: Giới trẻ ngày nay tìm kiếm thông tin trên TikTok; nếu bác sĩ chính thống không lên tiếng thì tin giả sẽ chiếm lĩnh mạng xã hội.\n• Tiếp cận hàng triệu người miễn phí: Video bác sĩ thật giải thích dễ hiểu giúp đập tan các trò lừa uống thuốc giảm cân hay nhịn ăn nguy hiểm.\n• Phòng bệnh từ sớm: Chi phí làm video rất rẻ nhưng bảo vệ được cả triệu người trước khi họ phải vào bệnh viện điều trị."
    },

    # 49: Quiet Spaces at Work
    {
        "id": "sample_discussion_generated_49",
        "type": "discussion",
        "title": "Quiet Spaces at Work",
        "topicCategory": "Public Health & Food",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Dr. Hannah Lee",
            "professorTitle": "Professor of Nutritional Sciences",
            "professorQuestion": "Modern open-plan offices generate constant noise, ringing phones, and visual interruptions. Should corporate employers designate dedicated soundproof 'quiet wellness rooms' where employees can meditate, pray, or sit silently without screens, or should employers prioritize managing workload expectations directly?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Quiet rooms provide immediate neurological relief. A quiet ten-minute break from sensory overload calms heart rates, lowers cortisol, and restores cognitive sharpness."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Quiet rooms are superficial band-aids. If workers are overwhelmed by sixty-hour workloads and unachievable deadlines, sitting silently in a dark room does nothing to cure workplace stress."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "While Sarah is completely right that quiet rooms cannot fix systemic overwork and exploitative corporate deadlines, I side with Michael that establishing dedicated soundproof quiet sanctuaries is an essential workplace wellness requirement.\n\nOpen-plan office environments expose workers to chronic acoustic overstimulation: overheard sales calls, clattering keyboards, and footsteps keep nervous systems in perpetual high alert. Even employees with reasonable workloads experience acute cognitive fatigue from constant interruptions. A screen-free quiet room offers a sanctuary where employees can practice deep breathing, conduct daily prayers, or decompress in tranquil silence. Neuroscientific research confirms that taking a ten-minute sensory respite down-regulates sympathetic nervous stress, relieves tension headaches, and enhances mental clarity upon returning to one's desk. Providing quiet rooms is an affordable, compassionate environmental accommodation that protects employee mental hygiene.",
        "wordCount": 128,
        "vocabularyHighlights": [
            {
                "term": "chronic acoustic overstimulation",
                "meaning": "sự kích thích thính giác và tiếng ồn quá đà kéo dài",
                "contextInEssay": "expose workers to chronic acoustic overstimulation"
            },
            {
                "term": "perpetual high alert",
                "meaning": "trạng thái thần kinh luôn căng như dây đàn, cảnh giác liên tục",
                "contextInEssay": "keep nervous systems in perpetual high alert"
            },
            {
                "term": "sensory respite",
                "meaning": "khoảng thời gian tạm nghỉ ngơi, giải phóng các giác quan",
                "contextInEssay": "taking a ten-minute sensory respite down-regulates sympathetic nervous stress"
            },
            {
                "term": "mental hygiene",
                "meaning": "vệ sinh và chăm sóc sức khỏe tinh thần",
                "contextInEssay": "environmental accommodation that protects employee mental hygiene"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Đồng tình với Sarah rằng không thể dùng phòng yên tĩnh để lấp liếm việc bắt làm thêm giờ, nhưng ủng hộ Michael phải có phòng yên tĩnh.\n• Căng thẳng tiếng ồn công sở: Văn phòng mở đầy tiếng gõ phím, chuông điện thoại khiến não bộ bị kích thích liên tục, gây đau đầu và mất tập trung.\n• Không gian phục hồi tức thì: Phòng cách âm không màn hình cho phép nhân viên thiền thở, cầu nguyện hay nhắm mắt 10 phút để hạ nhịp tim.\n• Nâng cao hiệu suất: Não bộ được nghỉ ngơi ngắn sẽ phục hồi sự minh mẫn và sáng suốt, giúp làm việc buổi chiều hiệu quả hơn."
    },

    # 50: Nutrition Classes for Children
    {
        "id": "sample_discussion_generated_50",
        "type": "discussion",
        "title": "Nutrition Classes for Children",
        "topicCategory": "Public Health & Food",
        "sourceType": "ai_generated",
        "targetBand": "Band 5.0 / 5.0",
        "prompt": {
            "professorName": "Dr. Hannah Lee",
            "professorTitle": "Professor of Nutritional Sciences",
            "professorQuestion": "Children consume unprecedented amounts of ultra-processed packaged snacks. Should primary schools incorporate mandatory hands-on culinary nutrition and cooking classes into the weekly curriculum, or should instructional time be reserved strictly for core academic subjects like mathematics and reading?",
            "studentOpinions": [
                {
                    "student": "Michael",
                    "avatar_bg": "bg-blue-600",
                    "stance": "Cooking is a vital survival skill. Teaching kids to prepare fresh vegetables, read food labels, and cook basic meals empowers them to make healthy food choices for the rest of their lives."
                },
                {
                    "student": "Sarah",
                    "avatar_bg": "bg-emerald-600",
                    "stance": "Curriculum schedules are already strained. Schools must prioritize reading and math proficiency; cooking and nutrition are parental responsibilities best learned at home."
                }
            ],
            "recommendedWords": "100 - 140 words (10 minutes)"
        },
        "modelEssay": "Although Sarah reasonably emphasizes that schools must maintain high standards in foundational reading and mathematics literacy, I strongly agree with Michael that teaching hands-on culinary nutrition in primary schools is an indispensable life skill.\n\nRelying on parents to teach cooking overlooks modern economic realities: millions of time-crunched working parents lack cooking skills themselves and rely entirely on packaged convenience foods. When schools treat nutrition as an irrelevant extracurricular hobby, children grow up dependent on sugary fast food, paving the way for chronic adult illnesses. In contrast, teaching children to peel carrots, assemble colorful salads, and understand ingredient labels demystifies fresh food and instills pride in culinary creation. Integrating cooking also reinforces academic concepts: measuring flour teaches fractions, and studying baking chemical reactions teaches practical science. Culinary nutrition classes cultivate self-reliance and build a lifelong foundation of vibrant personal wellness.",
        "wordCount": 133,
        "vocabularyHighlights": [
            {
                "term": "hands-on culinary nutrition",
                "meaning": "dinh dưỡng ẩm thực và thực hành nấu ăn trực tiếp",
                "contextInEssay": "teaching hands-on culinary nutrition in primary schools is an indispensable"
            },
            {
                "term": "packaged convenience foods",
                "meaning": "thực phẩm tiện lợi chế biến sẵn đóng hộp/gói",
                "contextInEssay": "rely entirely on packaged convenience foods"
            },
            {
                "term": "demystifies fresh food",
                "meaning": "giúp trẻ gần gũi, hiểu rõ và không còn sợ hãi thức ăn tươi sống",
                "contextInEssay": "ingredient labels demystifies fresh food and instills pride in culinary creation"
            },
            {
                "term": "vibrant personal wellness",
                "meaning": "sức khỏe dồi dào, tràn đầy sinh lực cho cá nhân",
                "contextInEssay": "lifelong foundation of vibrant personal wellness"
            }
        ],
        "structureAnalysis": "• Mở đầu & Lập trường: Ghi nhận tầm quan trọng của Toán và Tiếng Anh theo Sarah, ủng hộ Michael đưa môn nấu ăn dinh dưỡng vào tiểu học.\n• Thực tế gia đình bận rộn: Nhiều phụ huynh đi làm suốt ngày không biết nấu ăn, phụ thuộc đồ chế biến sẵn nên không thể tự dạy con ở nhà.\n• Kỹ năng sinh tồn tự lập: Dạy trẻ gọt củ cà rốt, trộn món salad giúp các em hào hứng ăn rau xanh và không bị lệ thuộc thức ăn nhanh nhiều đường.\n• Lồng ghép kiến thức tự nhiên: Đong đếm gia vị giúp học phân số toán học, nướng bánh giúp học hóa học, vừa bổ ích vừa xây dựng sức khỏe trọn đời."
    }
]

# Write to scripts/disc_batch_26_50.py
content = "# scripts/disc_batch_26_50.py\n# TOEFL iBT 2026 Writing for an Academic Discussion - Items 26 to 50\n\nDISCUSSIONS_26_50 = " + json.dumps(BATCH_DATA, indent=2, ensure_ascii=False) + "\n"

with open("scripts/disc_batch_26_50.py", "w", encoding="utf-8") as f:
    f.write(content)

print(f"Successfully wrote {len(BATCH_DATA)} items to scripts/disc_batch_26_50.py")

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
    print("All items in Batch 26-50 validated cleanly!")
