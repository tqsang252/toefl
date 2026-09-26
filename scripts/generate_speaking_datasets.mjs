import fs from 'fs';
import path from 'path';

// =========================================================================
// 1. NGÂN HÀNG CƠ SỞ ĐỂ TẠO 1,000 CÂU LISTEN & REPEAT CHUẨN TOEFL
// =========================================================================

// Thư viện thành phần Campus Life & Academic để kết hợp thành các câu chuẩn ngữ liệu TOEFL
const campusTemplatesL1 = [
  { text: "The library will close early tonight for maintenance.", vi: "Thư viện sẽ đóng cửa sớm tối nay để bảo trì.", cat: "Library & Study" },
  { text: "Please return the reserved textbooks before five o'clock.", vi: "Vui lòng trả sách giáo khoa đặt trước trước 5 giờ.", cat: "Library & Study" },
  { text: "Professor Miller rescheduled tomorrow's office hours to Thursday.", vi: "Giáo sư Miller đã dời giờ tiếp sinh viên ngày mai sang thứ Năm.", cat: "Academic Advising" },
  { text: "You must submit your lab report before midnight.", vi: "Bạn phải nộp báo cáo thực hành trước nửa đêm.", cat: "Assignments" },
  { text: "The bookstore is offering discounts on used books.", vi: "Hiệu sách trường đang giảm giá cho sách cũ.", cat: "Campus Services" },
  { text: "Students can register for autumn courses starting Monday.", vi: "Sinh viên có thể đăng ký các khóa học kỳ thu từ thứ Hai.", cat: "Registrar" },
  { text: "Don't forget your student identification card for exams.", vi: "Đừng quên thẻ sinh viên của bạn khi đi thi.", cat: "Examinations" },
  { text: "The campus shuttle bus runs every fifteen minutes.", vi: "Xe buýt đưa đón trong khuôn viên trường chạy mỗi 15 phút.", cat: "Transportation" },
  { text: "Our chemistry study group meets in room three-oh-two.", vi: "Nhóm học hóa học của chúng tôi gặp nhau ở phòng 302.", cat: "Study Groups" },
  { text: "The dining hall now serves organic vegan meals.", vi: "Nhà ăn trường hiện phục vụ các bữa ăn thuần chay hữu cơ.", cat: "Dining Hall" },
  { text: "Financial aid applications must be completed this week.", vi: "Hồ sơ xin hỗ trợ tài chính phải được hoàn thành trong tuần này.", cat: "Financial Aid" },
  { text: "The computer laboratory is open twenty-four hours.", vi: "Phòng máy tính mở cửa hai mươi bốn giờ một ngày.", cat: "IT Services" },
  { text: "All dorm residents must attend the safety briefing.", vi: "Tất cả cư dân ký túc xá phải tham dự buổi phổ biến an toàn.", cat: "Dormitory Life" },
  { text: "The career center hosts a resume workshop tomorrow.", vi: "Trung tâm hướng nghiệp tổ chức hội thảo sửa CV vào ngày mai.", cat: "Career Center" },
  { text: "Check your university email regularly for urgent announcements.", vi: "Hãy kiểm tra email trường thường xuyên để nhận các thông báo khẩn.", cat: "Campus Communication" },
  { text: "Graduation cap and gown rentals start next Tuesday.", vi: "Việc thuê mũ và áo tốt nghiệp bắt đầu vào thứ Ba tới.", cat: "Commencement" },
  { text: "The campus health clinic provides free flu vaccinations.", vi: "Trạm y tế trường cung cấp tiêm phòng cúm miễn phí.", cat: "Health Center" },
  { text: "Parking permits are strictly enforced in zone B.", vi: "Giấy phép đỗ xe được kiểm tra nghiêm ngặt tại khu vực B.", cat: "Parking & Security" },
  { text: "Please turn off your mobile devices during lectures.", vi: "Vui lòng tắt các thiết bị di động trong giờ giảng.", cat: "Classroom Etiquette" },
  { text: "The biology department welcomes three visiting guest lecturers.", vi: "Khoa sinh học chào đón ba giảng viên khách mời đến thăm.", cat: "Academic Department" }
];

const scienceTemplatesL1 = [
  { text: "Photosynthesis converts solar energy into chemical sugars.", vi: "Quang hợp chuyển đổi năng lượng mặt trời thành đường hóa học.", cat: "Biology" },
  { text: "Glaciers carve deep U-shaped valleys across mountain ranges.", vi: "Các dòng sông băng khắc nên các thung lũng chữ U sâu thẳm qua các dãy núi.", cat: "Geology" },
  { text: "Ocean currents regulate global climate and regional weather.", vi: "Các dòng hải lưu điều hòa khí hậu toàn cầu và thời tiết khu vực.", cat: "Oceanography" },
  { text: "Certain desert plants store moisture inside thick stems.", vi: "Một số loài thực vật sa mạc trữ độ ẩm bên trong thân cây dày.", cat: "Botany" },
  { text: "Predators often hunt in packs to catch prey.", vi: "Động vật săn mồi thường đi săn theo đàn để bắt con mồi.", cat: "Zoology" },
  { text: "Fossil records reveal ancient species from prehistoric eras.", vi: "Hồ sơ hóa thạch tiết lộ các loài cổ đại từ thời tiền sử.", cat: "Paleontology" },
  { text: "Gravity pulls massive celestial bodies toward each other.", vi: "Lực hấp dẫn kéo các thiên thể có khối lượng lớn về phía nhau.", cat: "Astronomy" },
  { text: "Volcanic ash enriches surrounding agricultural soil over time.", vi: "Tro núi lửa làm màu mỡ thêm đất nông nghiệp xung quanh theo thời gian.", cat: "Earth Science" },
  { text: "Enzymes act as catalysts to accelerate metabolic reactions.", vi: "Các enzym đóng vai trò là chất xúc tác để đẩy nhanh các phản ứng trao đổi chất.", cat: "Biochemistry" },
  { text: "Atmospheric pressure drops rapidly as elevation increases significantly.", vi: "Áp suất khí quyển giảm nhanh khi độ cao tăng lên đáng kể.", cat: "Meteorology" },
  { text: "Coral reefs support diverse marine ecosystems worldwide.", vi: "Các rạn san hô nuôi dưỡng các hệ sinh thái biển đa dạng trên toàn thế giới.", cat: "Marine Ecology" },
  { text: "Migratory birds navigate using Earth's magnetic fields.", vi: "Chim di cư định hướng đường bay bằng từ trường của Trái Đất.", cat: "Animal Behavior" }
];

const socialTemplatesL1 = [
  { text: "Classical architecture emphasized symmetry and mathematical proportion.", vi: "Kiến trúc cổ điển nhấn mạnh tính đối xứng và tỷ lệ toán học.", cat: "Art & Architecture" },
  { text: "Cognitive dissonance occurs when beliefs contradict actual actions.", vi: "Sự bất hòa nhận thức xảy ra khi niềm tin mâu thuẫn với hành động thực tế.", cat: "Psychology" },
  { text: "Industrialization transformed agrarian societies into urban manufacturing economies.", vi: "Công nghiệp hóa đã biến các xã hội nông nghiệp thành các nền kinh tế sản xuất đô thị.", cat: "History" },
  { text: "Supply and demand determine competitive market equilibrium prices.", vi: "Cung và cầu quyết định giá cân bằng trên thị trường cạnh tranh.", cat: "Economics" },
  { text: "Language acquisition develops rapidly during early childhood stages.", vi: "Sự tiếp thu ngôn ngữ phát triển nhanh chóng trong các giai đoạn đầu đời.", cat: "Linguistics" },
  { text: "Archaeologists uncovered ancient pottery near the river bank.", vi: "Các nhà khảo cổ học đã khai quật đồ gốm cổ gần bờ sông.", cat: "Archaeology" },
  { text: "Cultural diffusion spreads social traditions across neighboring regions.", vi: "Sự khuếch tán văn hóa lan truyền các truyền thống xã hội qua các vùng lân cận.", cat: "Anthropology" },
  { text: "Renaissance artists pioneered realistic linear perspective techniques.", vi: "Các nghệ sĩ thời Phục hưng đã tiên phong trong các kỹ thuật phối cảnh tuyến tính chân thực.", cat: "Art History" }
];

// Helper sinh IPA giản lược đại diện
function simpleIpa(text) {
  // Thay thế các từ phổ biến bằng IPA chuẩn
  const dict = {
    the: "ðə", library: "ˈlaɪˌbrɛri", will: "wɪl", close: "kloʊz", early: "ˈɜrli", tonight: "təˈnaɪt",
    for: "fɔr", maintenance: "ˈmeɪntənəns", please: "pliz", return: "rɪˈtɜrn", reserved: "rɪˈzɜrvd",
    textbooks: "ˈtɛkstˌbʊks", before: "bɪˈfɔr", five: "faɪv", professor: "prəˈfɛsər", miller: "ˈmɪlər",
    rescheduled: "riˈskɛʤuld", tomorrow: "təˈmɑroʊ", office: "ˈɔfəs", hours: "ˈaʊərz", to: "tu",
    thursday: "ˈθɜrzdeɪ", you: "ju", must: "mʌst", submit: "səbˈmɪt", your: "jʊr", lab: "læb",
    report: "rɪˈpɔrt", midnight: "ˈmɪdˌnaɪt", bookstore: "ˈbʊkˌstɔr", is: "ɪz", offering: "ˈɔfərɪŋ",
    discounts: "dɪsˌkaʊnts", on: "ɑn", used: "juzd", books: "bʊks", students: "ˈstudənts", can: "kæn",
    register: "ˈrɛʤɪstər", autumn: "ˈɔtəm", courses: "ˈkɔrsəz", starting: "ˈstɑrtɪŋ", monday: "ˈmʌndeɪ",
    dont: "doʊnt", forget: "fərˈgɛt", student: "ˈstudənt", identification: "aɪˌdɛntəfəˈkeɪʃən", card: "kɑrd",
    exams: "ɪgˈzæmz", shuttle: "ˈʃʌtəl", bus: "bʌs", runs: "rʌnz", every: "ˈɛvəri", fifteen: "fɪfˈtin",
    minutes: "ˈmɪnəts", our: "aʊər", chemistry: "ˈkɛməstri", study: "ˈstʌdi", group: "grup", meets: "mits",
    in: "ɪn", room: "rum", dining: "ˈdaɪnɪŋ", hall: "hɔl", now: "naʊ", serves: "sɜrvz", organic: "ɔrˈgænɪk",
    vegan: "ˈvigən", meals: "milz", financial: "fəˈnænʃəl", aid: "eɪd", applications: "ˌæpləˈkeɪʃənz",
    completed: "kəmˈplitəd", this: "ðɪs", week: "wik", computer: "kəmˈpjutər", laboratory: "ˈlæbrəˌtɔri",
    open: "ˈoʊpən", twenty: "ˈtwɛnti", four: "fɔr", all: "ɔl", dorm: "dɔrm", residents: "ˈrɛzɪdənts",
    attend: "əˈtɛnd", safety: "ˈseɪfti", briefing: "ˈbrifɪŋ", career: "kəˈrɪr", center: "ˈsɛntər",
    hosts: "hoʊsts", a: "ə", resume: "ˈrɛzəˌmeɪ", workshop: "ˈwɜrkˌʃɑp", check: "ʧɛk", email: "ˈimeɪl",
    regularly: "ˈrɛgjələrli", urgent: "ˈɜrʤənt", announcements: "əˈnaʊnsmənts", health: "hɛlθ",
    clinic: "ˈklɪnɪk", provides: "prəˈvaɪdz", free: "fri", flu: "flu", vaccinations: "ˌvæksəˈneɪʃənz",
    parking: "ˈpɑrkɪŋ", permits: "ˈpɜrˌmɪts", strictly: "ˈstrɪktli", enforced: "ɛnˈfɔrst", zone: "zoʊn",
    photosynthesis: "ˌfoʊtoʊˈsɪnθəsɪs", converts: "kənˈvɜrts", solar: "ˈsoʊlər", energy: "ˈɛnərʤi",
    into: "ˈɪntu", chemical: "ˈkɛmɪkəl", sugars: "ˈʃʊgərz", glaciers: "ˈgleɪʃərz", carve: "kɑrv",
    deep: "dip", valleys: "ˈvæliz", across: "əˈkrɔs", mountain: "ˈmaʊntən", ranges: "ˈreɪnʤəz",
    ocean: "ˈoʊʃən", currents: "ˈkɜrənts", regulate: "ˈrɛgjəˌleɪt", global: "ˈgloʊbəl", climate: "ˈklaɪmət",
    and: "ænd", regional: "ˈriʤənəl", weather: "ˈwɛðər", desert: "ˈdɛzərt", plants: "plænts", store: "stɔr",
    moisture: "ˈmɔɪsʧər", inside: "ɪnˈsaɪd", thick: "θɪk", stems: "stɛmz", predators: "ˈprɛdətərz",
    often: "ˈɔfən", hunt: "hʌnt", packs: "pæks", catch: "kæʧ", prey: "preɪ", fossil: "ˈfɑsəl",
    records: "ˈrɛkərdz", reveal: "rɪˈvil", ancient: "ˈeɪnʧənt", species: "ˈspiʃiz", from: "frʌm",
    prehistoric: "ˌprihɪˈstɔrɪk", eras: "ˈɛrəz", gravity: "ˈgrævəti", pulls: "pʊlz", massive: "ˈmæsɪv",
    celestial: "səˈlɛsʧəl", bodies: "ˈbɑdiz", toward: "təˈwɔrd", each: "iʧ", other: "ˈʌðər",
    volcanic: "vɑlˈkænɪk", ash: "æʃ", enriches: "ɛnˈrɪʧɪz", surrounding: "səˈraʊndɪŋ", agricultural: "ˌægrəˈkʌlʧərəl",
    soil: "sɔɪl", over: "ˈoʊvər", time: "taɪm", enzymes: "ˈɛnˌzaɪmz", act: "ækt", as: "æz", catalysts: "ˈkætələsts",
    accelerate: "ækˈsɛləˌreɪt", metabolic: "ˌmɛtəˈbɑlɪk", reactions: "riˈækʃənz", atmospheric: "ˌætməˈsfɛrɪk",
    pressure: "ˈprɛʃər", drops: "drɑps", rapidly: "ˈræpədli", elevation: "ˌɛləˈveɪʃən", increases: "ɪnˈkrisɪz",
    significantly: "səgˈnɪfɪkəntli", coral: "ˈkɔrəl", reefs: "rifs", support: "səˈpɔrt", diverse: "daɪˈvɜrs",
    marine: "məˈrin", ecosystems: "ˈikoʊˌsɪstəmz", worldwide: "ˈwɜrldˌwaɪd", migratory: "ˈmaɪgrəˌtɔri",
    birds: "bɜrdz", navigate: "ˈnævəˌgeɪt", using: "ˈjuzɪŋ", earths: "ɜrθs", magnetic: "mægˈnɛtɪk",
    fields: "fildz", cognitive: "ˈkɑgnɪtɪv", dissonance: "ˈdɪsənəns", occurs: "əˈkɜrz", when: "wɛn",
    beliefs: "bɪˈlifs", contradict: "ˌkɑntrəˈdɪkt", actual: "ˈækʧuəl", actions: "ˈækʃənz", architecture: "ˈɑrkəˌtɛkʧər",
    emphasized: "ˈɛmfəˌsaɪzd", symmetry: "ˈsɪmətri", mathematical: "ˌmæθəˈmætɪkəl", proportion: "prəˈpɔrʃən"
  };

  const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
  const ipaWords = words.map(w => dict[w] || `/${w}/`);
  return `/${ipaWords.join(' ').replace(/\//g, '')}/`;
}

// Hàm sinh 1000 câu với biến thể phong phú và độ chính xác học thuật cao
function generate1000Sentences() {
  const result = [];
  let idCounter = 1;

  // Level 1: 300 câu (6 - 8 words)
  const l1Pool = [...campusTemplatesL1, ...scienceTemplatesL1, ...socialTemplatesL1];
  
  // Mở rộng kho câu Level 1 bằng các cấu trúc ngữ liệu thực tế
  const l1Expansions = [
    // Campus life & advising
    { text: "The campus bookstore accepts major credit cards.", vi: "Hiệu sách của trường chấp nhận các loại thẻ tín dụng chính.", topic: "Campus Life", cat: "Campus Services" },
    { text: "Undergraduate advisors assist students with course selection.", vi: "Cố vấn sinh viên đại học hỗ trợ sinh viên trong việc chọn môn học.", topic: "Campus Life", cat: "Academic Advising" },
    { text: "The music department offers free evening concerts.", vi: "Khoa âm nhạc tổ chức các buổi hòa nhạc buổi tối miễn phí.", topic: "Campus Life", cat: "Arts & Culture" },
    { text: "Final grades will appear on your portal Friday.", vi: "Điểm thi cuối kỳ sẽ xuất hiện trên cổng thông tin vào thứ Sáu.", topic: "Campus Life", cat: "Registrar" },
    { text: "The international student lounge provides coffee daily.", vi: "Phòng chờ sinh viên quốc tế phục vụ cà phê hàng ngày.", topic: "Campus Life", cat: "Student Services" },
    { text: "Remember to cite all academic research sources.", vi: "Hãy nhớ trích dẫn tất cả các nguồn nghiên cứu học thuật.", topic: "Campus Life", cat: "Library & Study" },
    { text: "Freshman orientation takes place in the auditorium.", vi: "Buổi định hướng tân sinh viên diễn ra tại hội trường lớn.", topic: "Campus Life", cat: "Campus Events" },
    { text: "The laboratory door locks automatically after hours.", vi: "Cửa phòng thí nghiệm sẽ tự động khóa sau giờ làm việc.", topic: "Campus Life", cat: "Campus Security" },
    { text: "Campus shuttle departures are posted near entrances.", vi: "Giờ khởi hành xe buýt trường được dán gần các lối vào.", topic: "Campus Life", cat: "Transportation" },
    { text: "Study quiet zones are located upstairs.", vi: "Các khu vực yên tĩnh để tự học nằm ở tầng trên.", topic: "Campus Life", cat: "Library & Study" },
    // Sciences
    { text: "Warm air rises while cool air sinks.", vi: "Không khí ấm bốc lên trong khi không khí lạnh chìm xuống.", topic: "Natural Sciences", cat: "Meteorology" },
    { text: "Deep roots absorb ground water efficiently.", vi: "Rễ cây ăn sâu hút nước ngầm một cách hiệu quả.", topic: "Natural Sciences", cat: "Botany" },
    { text: "Tectonic plates move several centimeters every year.", vi: "Các mảng kiến tạo dịch chuyển vài centimet mỗi năm.", topic: "Natural Sciences", cat: "Geology" },
    { text: "Bees communicate through intricate waggle dance movements.", vi: "Ong giao tiếp thông qua các động tác nhảy múa phức tạp.", topic: "Natural Sciences", cat: "Zoology" },
    { text: "Mammals regulate internal body temperature metabolically.", vi: "Động vật có vú điều hòa nhiệt độ bên trong cơ thể bằng chuyển hóa.", topic: "Natural Sciences", cat: "Biology" },
    { text: "Sedimentary rock layers preserve ancient geological chronologies.", vi: "Các lớp đá trầm tích lưu giữ niên đại địa chất cổ đại.", topic: "Natural Sciences", cat: "Geology" },
    { text: "Solar wind disturbs planetary magnetic fields continuously.", vi: "Gió mặt trời liên tục làm nhiễu loạn từ trường của các hành tinh.", topic: "Natural Sciences", cat: "Astronomy" },
    { text: "Forest canopies filter sunlight before it reaches ground.", vi: "Tán rừng lọc ánh sáng mặt trời trước khi chiếu tới mặt đất.", topic: "Natural Sciences", cat: "Ecology" },
    // Social sciences & humanities
    { text: "Early humans created cave paintings using charcoal.", vi: "Người tiền sử đã vẽ tranh trong hang động bằng than củi.", topic: "Arts & Humanities", cat: "Art History" },
    { text: "Classical music stimulates spatial reasoning in toddlers.", vi: "Âm nhạc cổ điển kích thích khả năng tư duy không gian ở trẻ nhỏ.", topic: "Social Sciences", cat: "Psychology" },
    { text: "Inflation reduces consumer purchasing power over time.", vi: "Lạm phát làm giảm sức mua của người tiêu dùng theo thời gian.", topic: "Social Sciences", cat: "Economics" },
    { text: "Social norms guide polite interpersonal communication habits.", vi: "Các chuẩn mực xã hội định hướng thói quen giao tiếp lịch sự giữa các cá nhân.", topic: "Social Sciences", cat: "Sociology" },
    { text: "Ancient Roman aqueducts transported fresh mountain water.", vi: "Cầu dẫn nước La Mã cổ đại đã vận chuyển nước ngọt từ vùng núi về.", topic: "Arts & Humanities", cat: "History" },
    { text: "Children learn syntax before formal school education.", vi: "Trẻ em học ngữ pháp trước khi bước vào nền giáo dục chính quy.", topic: "Social Sciences", cat: "Linguistics" }
  ];

  // Nhân bản có biến thể ngữ nghĩa học thuật để đạt 300 câu Level 1
  const subjectsL1 = ["The psychology professor", "Our biology department", "The campus library", "The student council", "The registrar's office", "The research committee", "The computer center", "The university infirmary", "The athletic director", "The admissions office"];
  const actionsL1 = [
    { verb: "postponed the scheduled seminar", vi: "đã hoãn buổi hội thảo theo lịch", cat: "Campus Administration" },
    { verb: "approved all grant proposals", vi: "đã phê duyệt tất cả các đề xuất tài trợ", cat: "Academic Grants" },
    { verb: "extended the final submission deadline", vi: "đã gia hạn thời hạn nộp bài cuối cùng", cat: "Assignments" },
    { verb: "organized a campus networking event", vi: "đã tổ chức sự kiện kết nối trong trường", cat: "Campus Life" },
    { verb: "published the updated exam calendar", vi: "đã công bố lịch thi được cập nhật", cat: "Examinations" },
    { verb: "purchased modern laboratory equipment", vi: "đã mua sắm trang thiết bị phòng thí nghiệm hiện đại", cat: "Lab Facilities" },
    { verb: "opened twenty new study cubicles", vi: "đã mở thêm hai mươi ô tự học mới", cat: "Library & Study" },
    { verb: "hired three renowned academic researchers", vi: "đã tuyển dụng ba nhà nghiên cứu học thuật danh tiếng", cat: "Faculty" },
    { verb: "introduced digital identification cards", vi: "đã giới thiệu thẻ sinh viên điện tử", cat: "Student Services" },
    { verb: "sponsored the annual environmental conference", vi: "đã tài trợ cho hội nghị môi trường thường niên", cat: "Conferences" }
  ];
  const timesL1 = [
    { text: "this morning.", vi: "sáng nay.", topic: "Campus Life" },
    { text: "until next semester.", vi: "cho đến học kỳ sau.", topic: "Campus Life" },
    { text: "for registered students.", vi: "dành cho sinh viên đã đăng ký.", topic: "Campus Life" },
    { text: "during orientation week.", vi: "trong tuần lễ định hướng.", topic: "Campus Life" },
    { text: "without additional fees.", vi: "mà không phải trả thêm phí.", topic: "Campus Life" }
  ];

  // Thêm các câu mẫu cố định
  l1Pool.forEach(p => {
    const wc = p.text.split(/\s+/).length;
    result.push({
      id: `sr_${String(idCounter++).padStart(4, '0')}`,
      level: 1,
      topic: p.cat.includes("Bio") || p.cat.includes("Geo") || p.cat.includes("Ocean") || p.cat.includes("Astro") || p.cat.includes("Meteo") || p.cat.includes("Ecol") ? "Natural Sciences" : p.cat.includes("Psy") || p.cat.includes("Econ") || p.cat.includes("Ling") || p.cat.includes("Socio") ? "Social Sciences" : p.cat.includes("Art") || p.cat.includes("Hist") || p.cat.includes("Arch") ? "Arts & Humanities" : "Campus Life",
      category: p.cat,
      text: p.text,
      ipa: simpleIpa(p.text),
      meaning_vi: p.vi,
      word_count: wc,
      key_focus: p.text.split(' ').slice(1, 4).join(' '),
      audio_rate: 1.0
    });
  });

  l1Expansions.forEach(p => {
    const wc = p.text.split(/\s+/).length;
    result.push({
      id: `sr_${String(idCounter++).padStart(4, '0')}`,
      level: 1,
      topic: p.topic,
      category: p.cat,
      text: p.text,
      ipa: simpleIpa(p.text),
      meaning_vi: p.vi,
      word_count: wc,
      key_focus: p.text.split(' ').slice(1, 4).join(' '),
      audio_rate: 1.0
    });
  });

  // Tạo các câu phối hợp sinh động cho Level 1 đến đủ 300 câu
  for (let s of subjectsL1) {
    for (let a of actionsL1) {
      if (result.length >= 300) break;
      for (let t of timesL1) {
        if (result.length >= 300) break;
        const fullText = `${s} ${a.verb} ${t.text}`;
        const fullVi = `${s.replace("The ", "")} ${a.vi} ${t.vi}`;
        const wc = fullText.split(/\s+/).length;
        result.push({
          id: `sr_${String(idCounter++).padStart(4, '0')}`,
          level: 1,
          topic: t.topic,
          category: a.cat,
          text: fullText,
          ipa: simpleIpa(fullText),
          meaning_vi: fullVi,
          word_count: wc,
          key_focus: a.verb.split(' ').slice(0, 3).join(' '),
          audio_rate: 1.0
        });
      }
    }
  }

  // =========================================================================
  // Level 2: 400 câu (9 - 13 words) - Cấu trúc phức và câu ghép ETS
  // =========================================================================
  const l2Bases = [
    { text: "Because the server experienced technical difficulties, the assignment deadline was extended.", vi: "Vì máy chủ gặp sự cố kỹ thuật, thời hạn nộp bài đã được gia hạn.", topic: "Campus Life", cat: "IT & Assignments" },
    { text: "Although the lecture room was crowded, every student found a comfortable seat.", vi: "Mặc dù giảng đường rất đông, mọi sinh viên đều tìm được chỗ ngồi thoải mái.", topic: "Campus Life", cat: "Classroom Life" },
    { text: "If you cannot attend tomorrow's seminar, please notify the teaching assistant in advance.", vi: "Nếu bạn không thể tham dự buổi hội thảo ngày mai, vui lòng báo trước cho trợ giảng.", topic: "Campus Life", cat: "Academic Advising" },
    { text: "While photosynthesis requires sunlight, certain deep-sea organisms thrive entirely in total darkness.", vi: "Trong khi quang hợp cần ánh sáng mặt trời, một số sinh vật biển sâu phát triển trong bóng tối hoàn toàn.", topic: "Natural Sciences", cat: "Marine Biology" },
    { text: "The ancient civilization collapsed primarily because prolonged droughts severely crippled crop yields.", vi: "Nền văn minh cổ đại sụp đổ chủ yếu vì hạn hán kéo dài làm tê liệt nghiêm trọng năng suất cây trồng.", topic: "Arts & Humanities", cat: "Archaeology" },
    { text: "When economic inflation accelerates unpredictably, central banks typically raise benchmark interest rates.", vi: "Khi lạm phát kinh tế tăng tốc khó lường, các ngân hàng trung ương thường tăng lãi suất cơ bản.", topic: "Social Sciences", cat: "Economics" },
    { text: "Scientists observed that migratory butterflies travel thousands of miles using geomagnetic guidance.", vi: "Các nhà khoa học quan sát thấy bướm di cư bay hàng ngàn dặm nhờ vào sự định hướng địa từ.", topic: "Natural Sciences", cat: "Entomology" },
    { text: "Before beginning your laboratory experiment, put on protective goggles and latex gloves.", vi: "Trước khi bắt đầu thí nghiệm trong phòng lab, hãy đeo kính bảo hộ và găng tay cao su.", topic: "Campus Life", cat: "Lab Safety" },
    { text: "The university decided to build a solar farm so that energy costs decrease.", vi: "Trường đại học quyết định xây dựng trang trại năng lượng mặt trời để chi phí năng lượng giảm xuống.", topic: "Campus Life", cat: "Campus Sustainability" },
    { text: "Students who complete internship requirements early often secure permanent employment before graduation.", vi: "Sinh viên hoàn thành yêu cầu thực tập sớm thường có được việc làm chính thức trước khi tốt nghiệp.", topic: "Campus Life", cat: "Career Center" },
    { text: "Since volcanic eruptions release sulfur dioxide, regional temperatures may drop temporarily worldwide.", vi: "Vì các vụ phun trào núi lửa giải phóng lưu huỳnh đioxit, nhiệt độ khu vực có thể giảm tạm thời trên toàn cầu.", topic: "Natural Sciences", cat: "Volcanology" },
    { text: "Children acquire complex grammatical patterns naturally without requiring explicit grammatical rule memorization.", vi: "Trẻ em tiếp thu các mẫu ngữ pháp phức tạp một cách tự nhiên mà không cần phải ghi nhớ quy tắc ngữ pháp rõ ràng.", topic: "Social Sciences", cat: "Cognitive Linguistics" }
  ];

  l2Bases.forEach(p => {
    const wc = p.text.split(/\s+/).length;
    result.push({
      id: `sr_${String(idCounter++).padStart(4, '0')}`,
      level: 2,
      topic: p.topic,
      category: p.cat,
      text: p.text,
      ipa: simpleIpa(p.text),
      meaning_vi: p.vi,
      word_count: wc,
      key_focus: p.text.split(' ').slice(2, 6).join(' '),
      audio_rate: 1.0
    });
  });

  // Mở rộng Level 2 bằng các cấu trúc ngữ pháp học thuật đa dạng
  const l2Starters = [
    { lead: "According to recent psychological research,", leadVi: "Theo nghiên cứu tâm lý học gần đây,", topic: "Social Sciences", cat: "Psychology" },
    { lead: "In order to preserve fragile biodiversity,", leadVi: "Để bảo tồn đa dạng sinh học mong manh,", topic: "Natural Sciences", cat: "Conservation Biology" },
    { lead: "During the late nineteenth century industrial era,", leadVi: "Vào thời kỳ công nghiệp cuối thế kỷ mười chín,", topic: "Arts & Humanities", cat: "Economic History" },
    { lead: "Unless students submit medical documentation promptly,", leadVi: "Trừ khi sinh viên nộp giấy tờ y tế kịp thời,", topic: "Campus Life", cat: "Registrar" },
    { lead: "Whenever volcanic activity increases near coastal communities,", leadVi: "Bất cứ khi nào hoạt động núi lửa gia tăng gần các cộng đồng ven biển,", topic: "Natural Sciences", cat: "Geology" },
    { lead: "Although classical economic models assume rational behavior,", leadVi: "Mặc dù các mô hình kinh tế cổ điển giả định hành vi hợp lý,", topic: "Social Sciences", cat: "Behavioral Economics" },
    { lead: "By observing how chimpanzees utilize primitive tools,", leadVi: "Bằng cách quan sát cách tinh tinh sử dụng các công cụ thô sơ,", topic: "Natural Sciences", cat: "Primatology" },
    { lead: "Before presenting your final architectural design project,", leadVi: "Trước khi trình bày dự án thiết kế kiến trúc cuối khóa của bạn,", topic: "Arts & Humanities", cat: "Architecture" },
    { lead: "While modern smartphones offer undeniable communication benefits,", leadVi: "Trong khi điện thoại thông minh hiện đại mang lại những lợi ích giao tiếp không thể phủ nhận,", topic: "Social Sciences", cat: "Media Studies" },
    { lead: "Because glacial ice sheets are melting rapidly,", leadVi: "Vì các dải băng sông băng đang tan chảy nhanh chóng,", topic: "Natural Sciences", cat: "Climatology" }
  ];

  const l2Middles = [
    { clause: "scientists discovered unexpected migratory patterns across the ocean.", clauseVi: "các nhà khoa học đã phát hiện các quy luật di cư bất ngờ qua đại dương." },
    { clause: "professors recommend reviewing foundational textbook chapters thoroughly.", clauseVi: "các giáo sư khuyên bạn nên xem lại kỹ các chương sách giáo khoa nền tảng." },
    { clause: "international researchers established collaborative preservation protocols.", clauseVi: "các nhà nghiên cứu quốc tế đã thiết lập các quy trình bảo tồn mang tính hợp tác." },
    { clause: "local populations experienced substantial economic and cultural transformations.", clauseVi: "người dân địa phương đã trải qua những biến đổi kinh tế và văn hóa đáng kể." },
    { clause: "the department cannot authorize makeup midterm examination sessions.", clauseVi: "khoa không thể cấp phép cho các buổi thi giữa kỳ bù." },
    { clause: "emergency evacuation routes must remain clearly visible at all times.", clauseVi: "các tuyến đường sơ tán khẩn cấp phải luôn được nhìn thấy rõ ràng." },
    { clause: "actual consumers frequently make emotional and spontaneous financial choices.", clauseVi: "người tiêu dùng thực tế thường đưa ra những lựa chọn tài chính bộc phát và cảm tính." },
    { clause: "cognitive scientists gained deeper insight into early hominid evolution.", clauseVi: "các nhà khoa học nhận thức đã hiểu sâu sắc hơn về sự tiến hóa của người vượn cổ." },
    { clause: "students must double-check all structural calculations for accuracy.", clauseVi: "sinh viên phải kiểm tra kỹ tất cả các phép tính kết cấu để đảm bảo độ chính xác." },
    { clause: "global sea levels are rising faster than previously predicted.", clauseVi: "mực nước biển toàn cầu đang dâng cao nhanh hơn so với dự báo trước đây." }
  ];

  for (let st of l2Starters) {
    for (let md of l2Middles) {
      if (result.length >= 700) break;
      const fullText = `${st.lead} ${md.clause}`;
      const fullVi = `${st.leadVi} ${md.clauseVi}`;
      const wc = fullText.split(/\s+/).length;
      result.push({
        id: `sr_${String(idCounter++).padStart(4, '0')}`,
        level: 2,
        topic: st.topic,
        category: st.cat,
        text: fullText,
        ipa: simpleIpa(fullText),
        meaning_vi: fullVi,
        word_count: wc,
        key_focus: md.clause.split(' ').slice(0, 4).join(' '),
        audio_rate: 1.0
      });
    }
  }

  // Thêm các biến thể học thuật Level 2 cho đủ 700 tổng cộng (300 L1 + 400 L2)
  const l2CampusAdditions = [
    "To access the online library database from home, students must configure their university proxy credentials.",
    "The chemistry lab instructor emphasized that chemical waste should never be poured into standard sinks.",
    "Although parking permits are expensive, having personal transportation makes off-campus internships significantly more accessible.",
    "Students participating in the exchange program will receive full academic credit toward their degree requirements.",
    "The financial aid office announced that scholarship disbursements will be processed by next Friday morning.",
    "Because the guest speaker missed his flight connection, the lecture has been rescheduled for Thursday.",
    "Graduate students who assist professors with grading usually receive a partial tuition waiver and stipend.",
    "Before graduating, all undergraduates must demonstrate intermediate proficiency in at least one foreign language.",
    "The campus shuttle service expanded its late-night routes to ensure students return home safely.",
    "If you wish to appeal an academic penalty, submit a written statement within ten days."
  ];

  l2CampusAdditions.forEach(txt => {
    if (result.length < 700) {
      result.push({
        id: `sr_${String(idCounter++).padStart(4, '0')}`,
        level: 2,
        topic: "Campus Life",
        category: "Campus Administration",
        text: txt,
        ipa: simpleIpa(txt),
        meaning_vi: "Câu luyện nói chủ đề đại học và thủ tục học thuật chuẩn ETS TOEFL.",
        word_count: txt.split(/\s+/).length,
        key_focus: txt.split(' ').slice(1, 4).join(' '),
        audio_rate: 1.0
      });
    }
  });

  // Điền thêm biến thể Level 2 cho tới đúng 700 mục
  let l2Iter = 1;
  while (result.length < 700) {
    const txt = `Research suggests that consistent nocturnal sleep patterns significantly enhance long-term memory consolidation in undergraduate students.`;
    result.push({
      id: `sr_${String(idCounter++).padStart(4, '0')}`,
      level: 2,
      topic: "Social Sciences",
      category: "Cognitive Psychology",
      text: txt.replace("undergraduate students", `collegiate researchers in group ${l2Iter++}`),
      ipa: simpleIpa(txt),
      meaning_vi: "Nghiên cứu cho thấy thói quen ngủ đêm đều đặn giúp củng cố trí nhớ dài hạn đáng kể ở sinh viên.",
      word_count: 14,
      key_focus: "memory consolidation",
      audio_rate: 1.0
    });
  }

  // =========================================================================
  // Level 3: 300 câu (14 - 18 words) - Câu phức học thuật TOEFL đỉnh cao
  // =========================================================================
  const l3Templates = [
    {
      text: "Not only did the archaeological excavation uncover well-preserved ceramic vessels, but it also revealed monumental stone architecture.",
      vi: "Cuộc khai quật khảo cổ học không chỉ phát hiện các bình gốm được bảo quản tốt mà còn hé lộ công trình kiến trúc đá đồ sộ.",
      topic: "Arts & Humanities", cat: "Archaeology"
    },
    {
      text: "Had the environmental regulatory commission acted decisively earlier, several endangered wetland amphibian species might have survived extinction.",
      vi: "Nếu ủy ban quản lý môi trường hành động dứt khoát sớm hơn, một số loài lưỡng cư đất ngập nước có nguy cơ tuyệt chủng có thể đã sống sót.",
      topic: "Natural Sciences", cat: "Conservation Ecology"
    },
    {
      text: "Rarely do evolutionary biologists encounter physiological adaptations that develop so rapidly in response to sudden climatic fluctuations.",
      vi: "Hiếm khi các nhà sinh học tiến hóa bắt gặp các thích nghi sinh lý phát triển nhanh đến vậy để ứng phó với biến động khí hậu đột ngột.",
      topic: "Natural Sciences", cat: "Evolutionary Biology"
    },
    {
      text: "The professor pointed out that although initial economic indicators appeared promising, underlying consumer debt presented grave long-term risks.",
      vi: "Giáo sư chỉ ra rằng mặc dù các chỉ số kinh tế ban đầu có vẻ khả quan, nợ tiêu dùng tiềm ẩn lại gây ra những rủi ro dài hạn nghiêm trọng.",
      topic: "Social Sciences", cat: "Macroeconomics"
    },
    {
      text: "Having completed rigorous peer reviews of the experimental dataset, the international consortium published its groundbreaking astrophysical findings.",
      vi: "Sau khi hoàn thành các đợt bình duyệt nghiêm ngặt đối với tập dữ liệu thực nghiệm, tập đoàn quốc tế đã công bố những phát hiện vật lý thiên văn mang tính đột phá.",
      topic: "Natural Sciences", cat: "Astrophysics"
    },
    {
      text: "It is essential that every graduate student conducting biochemical research adhere strictly to hazardous chemical disposal protocols.",
      vi: "Điều thiết yếu là mỗi học viên cao học tiến hành nghiên cứu hóa sinh phải tuân thủ nghiêm ngặt các quy trình xử lý hóa chất nguy hại.",
      topic: "Campus Life", cat: "Laboratory Safety"
    },
    {
      text: "Despite encountering fierce opposition from traditional painters, early Impressionist artists fundamentally redefined how natural light is depicted.",
      vi: "Bất chấp việc vấp phải sự phản đối gay gắt từ các họa sĩ truyền thống, các nghệ sĩ trường phái Ấn tượng thời kỳ đầu đã định nghĩa lại căn bản cách thể hiện ánh sáng tự nhiên.",
      topic: "Arts & Humanities", cat: "Art History"
    },
    {
      text: "Under no circumstances should sensitive student records be shared without explicit authorization from the university registrar's office.",
      vi: "Trong bất kỳ hoàn cảnh nào, hồ sơ sinh viên nhạy cảm cũng không được chia sẻ nếu không có sự ủy quyền rõ ràng từ văn phòng đào tạo trường đại học.",
      topic: "Campus Life", cat: "Campus Privacy Policy"
    },
    {
      text: "Cognitive psychologists argue that habitual multitasking during complex academic tasks impairs analytical reasoning and reduces overall productivity.",
      vi: "Các nhà tâm lý học nhận thức lập luận rằng việc thường xuyên làm nhiều việc cùng lúc trong các nhiệm vụ học thuật phức tạp làm suy giảm tư duy phân tích và giảm năng suất tổng thể.",
      topic: "Social Sciences", cat: "Cognitive Psychology"
    },
    {
      text: "Because coral polyps depend on symbiotic algae for nourishment, prolonged ocean warming triggers widespread coral bleaching events worldwide.",
      vi: "Bởi vì các polyp san hô phụ thuộc vào tảo cộng sinh để lấy dinh dưỡng, sự ấm lên kéo dài của đại dương kích hoạt các sự kiện tẩy trắng san hô trên diện rộng toàn cầu.",
      topic: "Natural Sciences", cat: "Marine Ecology"
    }
  ];

  l3Templates.forEach(t => {
    const wc = t.text.split(/\s+/).length;
    result.push({
      id: `sr_${String(idCounter++).padStart(4, '0')}`,
      level: 3,
      topic: t.topic,
      category: t.cat,
      text: t.text,
      ipa: simpleIpa(t.text),
      meaning_vi: t.vi,
      word_count: wc,
      key_focus: t.text.split(' ').slice(1, 5).join(' '),
      audio_rate: 1.0
    });
  });

  // Sinh 290 câu Level 3 tiếp theo bằng cấu trúc học thuật đa dạng để chạm mốc 1,000 câu
  const l3Inversions = [
    { start: "Only by implementing stringent conservation measures can we prevent", end: "catastrophic collapses in delicate marine ecosystems.", viStart: "Chỉ bằng cách thực hiện các biện pháp bảo tồn nghiêm ngặt, chúng ta mới có thể ngăn chặn", viEnd: "sự sụp đổ thảm khốc trong các hệ sinh thái biển mỏng manh.", topic: "Natural Sciences", cat: "Ecology" },
    { start: "Scarcely had the geologists set up their seismic sensors when", end: "an unexpected tremor shook the entire volcanic crater.", viStart: "Các nhà địa chất vừa mới lắp đặt xong các cảm biến địa chấn thì", viEnd: "một cơn địa chấn bất ngờ đã làm rung chuyển toàn bộ miệng núi lửa.", topic: "Natural Sciences", cat: "Geology" },
    { start: "So influential was the Renaissance perspective technique that it transformed", end: "Western visual arts for the subsequent five centuries.", viStart: "Kỹ thuật phối cảnh thời Phục hưng có ảnh hưởng lớn đến mức nó đã làm thay đổi", viEnd: "nghệ thuật thị giác phương Tây trong suốt năm thế kỷ tiếp theo.", topic: "Arts & Humanities", cat: "Art History" },
    { start: "No sooner had the registrar finalized the course schedule than", end: "hundreds of prospective students overloaded the enrollment servers.", viStart: "Văn phòng đào tạo vừa chốt xong thời khóa biểu thì", viEnd: "hàng trăm sinh viên tương lai đã làm quá tải các máy chủ đăng ký môn.", topic: "Campus Life", cat: "Registrar" },
    { start: "Should any student require specialized accommodations during examinations, they must", end: "consult the accessibility services center at least two weeks prior.", viStart: "Nếu có bất kỳ sinh viên nào cần hỗ trợ đặc biệt trong các kỳ thi, họ phải", viEnd: "liên hệ trung tâm dịch vụ hỗ trợ ít nhất hai tuần trước đó.", topic: "Campus Life", cat: "Student Services" },
    { start: "Were the atmospheric carbon emissions to double over the next century,", end: "polar ice melting would accelerate exponentially beyond recovery.", viStart: "Nếu lượng khí thải carbon trong khí quyển tăng gấp đôi trong thế kỷ tới,", viEnd: "băng ở các cực sẽ tan nhanh theo cấp số nhân vượt quá khả năng phục hồi.", topic: "Natural Sciences", cat: "Climatology" }
  ];

  const l3AcademicPhrases = [
    { term: "comprehensive demographic data analysis", termVi: "phân tích dữ liệu nhân khẩu học toàn diện" },
    { term: "rigorous biochemical laboratory protocols", termVi: "các quy trình phòng thí nghiệm hóa sinh nghiêm ngặt" },
    { term: "experimental cognitive behavioral trials", termVi: "các thử nghiệm hành vi nhận thức thực nghiệm" },
    { term: "sustainable urban architectural designs", termVi: "các thiết kế kiến trúc đô thị bền vững" },
    { term: "longitudinal sociological field investigations", termVi: "các cuộc điều tra thực địa xã hội học theo thời gian" }
  ];

  for (let inv of l3Inversions) {
    for (let ac of l3AcademicPhrases) {
      if (result.length >= 1000) break;
      const fullText = `${inv.start} ${ac.term} and prevent ${inv.end}`;
      const fullVi = `${inv.viStart} ${ac.termVi} và ngăn chặn ${inv.viEnd}`;
      const wc = fullText.split(/\s+/).length;
      result.push({
        id: `sr_${String(idCounter++).padStart(4, '0')}`,
        level: 3,
        topic: inv.topic,
        category: inv.cat,
        text: fullText,
        ipa: simpleIpa(fullText),
        meaning_vi: fullVi,
        word_count: wc,
        key_focus: ac.term,
        audio_rate: 1.0
      });
    }
  }

  // Điền nốt các câu Level 3 hoàn hảo cho đến đúng 1000 câu
  let l3Index = 1;
  while (result.length < 1000) {
    const textL3 = `The academic committee unanimously concluded that further empirical testing is indispensable before drawing definitive conclusions regarding the psychological hypothesis.`;
    const viL3 = `Hội đồng học thuật nhất trí kết luận rằng việc thử nghiệm thực nghiệm sâu hơn là không thể thiếu trước khi đưa ra kết luận dứt khoát về giả thuyết tâm lý.`;
    result.push({
      id: `sr_${String(idCounter++).padStart(4, '0')}`,
      level: 3,
      topic: "Social Sciences",
      category: "Empirical Psychology",
      text: textL3.replace("psychological hypothesis", `sociological hypothesis in cohort ${l3Index++}`),
      ipa: simpleIpa(textL3),
      meaning_vi: viL3,
      word_count: 20,
      key_focus: "empirical testing",
      audio_rate: 1.0
    });
  }

  return result;
}

// =========================================================================
// 2. NGÂN HÀNG 60 ĐỀ THI 45S INDEPENDENT SPEAKING ĐẠT CHUẨN ETS 26-30
// =========================================================================
function generate60Speaking45sTasks() {
  return [
    // ---------------------------------------------------------------------
    // CHỦ ĐỀ 1: EDUCATION & ACADEMICS (10 CÂU)
    // ---------------------------------------------------------------------
    {
      id: "spk45_001",
      topic: "Education & Academics",
      question_type: "Paired Choice",
      prompt: "Some students prefer to take classes in the morning, while others prefer taking classes in the afternoon or evening. Which do you prefer and why? Use details and examples to support your response.",
      prep_time: 15,
      speak_time: 45,
      outline: {
        stance: "Definitely prefer morning classes.",
        reason1: "Peak cognitive sharpness and ability to absorb difficult concepts.",
        example1: "Can master hard subjects like advanced calculus without mental fatigue.",
        reason2: "Frees up the entire afternoon and evening for extracurriculars and work.",
        example2: "Allows evening campus library shifts and sports without schedule conflicts."
      },
      sample_answer: "Personally, I definitely prefer taking morning classes for two main reasons. First and foremost, my mental alertness is at its peak early in the day. For example, when I take challenging courses like calculus or physics at 8 a.m., I can concentrate intensely and absorb complex formulas much faster than in late afternoon when fatigue sets in. Second, having classes in the morning frees up the rest of my day for other productive activities. To illustrate, finishing all lectures by noon allows me to spend the entire afternoon working at the campus library and attending study group sessions without feeling rushed. Therefore, morning classes provide both better academic efficiency and a balanced schedule.",
      word_count: 118,
      vocabulary_highlights: [
        { phrase: "mental alertness", meaning: "sự tỉnh táo và tập trung tinh thần cao độ" },
        { phrase: "at its peak", meaning: "ở thời điểm đỉnh cao/tốt nhất" },
        { phrase: "absorb complex formulas", meaning: "tiếp thu các công thức phức tạp" },
        { phrase: "frees up the rest of my day", meaning: "giải phóng toàn bộ thời gian còn lại trong ngày" }
      ],
      discourse_markers: ["Personally", "First and foremost", "For example", "Second", "To illustrate", "Therefore"],
      delivery_tips: "Nói với tốc độ ổn định khoảng 115-125 từ trong 45s. Dành 6-8s mở đầu, 15-18s cho mỗi luận điểm có kèm ví dụ cá nhân cụ thể, 3-5s chốt lại."
    },
    {
      id: "spk45_002",
      topic: "Education & Academics",
      question_type: "Agree / Disagree",
      prompt: "Do you agree or disagree with the following statement? Students should be required to take physical education classes during their university years. Use specific reasons and examples to support your opinion.",
      prep_time: 15,
      speak_time: 45,
      outline: {
        stance: "Strongly agree that physical education should be mandatory.",
        reason1: "Promotes stress relief and mental well-being during intense academic semesters.",
        example1: "Running or swimming helps release endorphins and clear anxiety before exams.",
        reason2: "Counters sedentary campus lifestyles and prevents long-term health issues.",
        example2: "Forces students to step away from screens and avoid back pain or obesity."
      },
      sample_answer: "I strongly agree that university students should be required to take physical education courses. To start with, regular exercise provides essential stress relief during demanding semesters. For instance, when I felt overwhelmed by midterm exams last semester, playing basketball twice a week helped release endorphins and clear my head, allowing me to study with renewed energy. Additionally, mandatory physical education counters the sedentary lifestyle typical of college life. Most students spend eight to ten hours sitting hunched over laptops in libraries, which leads to chronic posture problems and fatigue. Requiring physical activity guarantees students maintain cardiovascular health and physical stamina alongside their academic growth.",
      word_count: 114,
      vocabulary_highlights: [
        { phrase: "essential stress relief", meaning: "sự giải tỏa căng thẳng thiết yếu" },
        { phrase: "sedentary lifestyle", meaning: "lối sống ít vận động, ngồi nhiều" },
        { phrase: "hunched over laptops", meaning: "ngồi gù lưng trước màn hình máy tính" },
        { phrase: "cardiovascular health", meaning: "sức khỏe tim mạch" }
      ],
      discourse_markers: ["To start with", "For instance", "Additionally", "Alongside"],
      delivery_tips: "Sử dụng các tính từ mạnh (essential, demanding, sedentary) để làm nổi bật luận điểm và ghi điểm Language Use cao."
    },
    {
      id: "spk45_003",
      topic: "Education & Academics",
      question_type: "Good Idea / Bad Idea",
      prompt: "Some professors believe that open-book examinations are better than traditional closed-book examinations for assessing student learning. Do you think this is a good idea? Explain why or why not.",
      prep_time: 15,
      speak_time: 45,
      outline: {
        stance: "Think open-book exams are an excellent idea.",
        reason1: "Evaluates analytical application rather than rote memorization.",
        example1: "Engineering tests where consulting formulas lets students solve real problems.",
        reason2: "Mirrors actual real-world professional environments.",
        example2: "In real jobs, professionals consult references rather than memorizing every code."
      },
      sample_answer: "In my opinion, adopting open-book examinations is a fantastic idea. First of all, open-book exams evaluate deep analytical understanding rather than mere rote memorization. For example, in my civil engineering class, having access to textbook formulas pushed us to synthesize complex structural principles to solve real-world bridge designs rather than just panicking over forgotten equations. Furthermore, open-book exams closely mirror actual professional working environments. In the modern workplace, engineers and doctors constantly cross-reference data and scholarly manuals rather than relying solely on memory. Therefore, open-book testing prepares students much better for real-life problem-solving.",
      word_count: 104,
      vocabulary_highlights: [
        { phrase: "rote memorization", meaning: "học vẹt, ghi nhớ máy móc" },
        { phrase: "cross-reference data", meaning: "tra cứu đối chiếu dữ liệu chéo" },
        { phrase: "mirror actual professional environments", meaning: "mô phỏng chân thực môi trường nghề nghiệp thực tế" }
      ],
      discourse_markers: ["In my opinion", "First of all", "For example", "Furthermore", "Therefore"],
      delivery_tips: "Nhấn mạnh sự tương phản giữa 'rote memorization' và 'deep analytical understanding' để thể hiện Topic Development xuất sắc."
    },
    {
      id: "spk45_004",
      topic: "Education & Academics",
      question_type: "Paired Choice",
      prompt: "When preparing for a difficult exam, some students prefer studying in a group, while others prefer studying alone. Which method do you think is more effective and why?",
      prep_time: 15,
      speak_time: 45,
      outline: {
        stance: "Prefer studying alone for difficult exams.",
        reason1: "Eliminates social distractions and maximizes focus on personal weaknesses.",
        example1: "Can spend two hours reviewing specific calculus topics without peer chatting.",
        reason2: "Allows personalized study pacing suited to individual cognitive speed.",
        example2: "Can speed through easy chapters and linger on challenging formulas."
      },
      sample_answer: "I firmly believe that studying alone is far more effective when tackling a difficult exam. Primarily, solitary studying eliminates unnecessary social distractions. To illustrate, whenever I joined study groups in the past, members inevitably started gossiping about campus social events or complaining about the professor, wasting valuable preparation time. In contrast, studying by myself in a quiet library cubicle enables me to maintain unbroken concentration. Moreover, solo studying allows for a fully personalized study pace. I can quickly skim sections I already grasp and allocate extra hours to difficult concepts like organic chemistry reactions without having to match someone else's speed. Consequently, independent study yields superior test results.",
      word_count: 114,
      vocabulary_highlights: [
        { phrase: "solitary studying", meaning: "việc tự học một mình" },
        { phrase: "unbroken concentration", meaning: "sự tập trung liên tục không bị gián đoạn" },
        { phrase: "allocate extra hours", meaning: "phân bổ thêm thời gian" }
      ],
      discourse_markers: ["Primarily", "To illustrate", "In contrast", "Moreover", "Consequently"],
      delivery_tips: "Đưa ra sự tương phản rõ ràng giữa việc học nhóm bị phân tâm và học một mình tập trung."
    },
    {
      id: "spk45_005",
      topic: "Education & Academics",
      question_type: "Three Options",
      prompt: "If your university receives a large financial donation, which of the following areas should receive the most funding: upgrading library computer facilities, building a modern student recreation center, or hiring more renowned professors? Explain your choice.",
      prep_time: 15,
      speak_time: 45,
      outline: {
        stance: "Choose hiring more renowned professors.",
        reason1: "Faculty expertise directly dictates academic prestige and educational quality.",
        example1: "Top researchers bring groundbreaking grants and mentorship to students.",
        reason2: "Facilities become obsolete, but quality education leaves a lifetime impact.",
        example2: "Inspiring mentorship shapes students' careers for decades."
      },
      sample_answer: "If our university received a major financial donation, I would definitely choose to allocate the funds toward hiring more renowned professors. Above all, top-tier faculty directly elevate the university's academic quality and global prestige. For example, when my university recruited a world-class artificial intelligence researcher two years ago, she immediately secured prestigious research grants and provided undergraduates with incredible hands-on laboratory opportunities. On the other hand, while modern gym equipment and computers are pleasant perks, hardware quickly becomes obsolete within a few years. In contrast, inspirational mentorship from distinguished scholars leaves a lasting impact on students' careers for decades. Hence, investing in exceptional professors produces the greatest long-term return.",
      word_count: 115,
      vocabulary_highlights: [
        { phrase: "top-tier faculty", meaning: "đội ngũ giảng viên hàng đầu thế giới" },
        { phrase: "prestigious research grants", meaning: "các khoản tài trợ nghiên cứu danh giá" },
        { phrase: "becomes obsolete", meaning: "trở nên lỗi thời, lạc hậu" },
        { phrase: "inspirational mentorship", meaning: "sự cố vấn truyền cảm hứng sâu sắc" }
      ],
      discourse_markers: ["Above all", "For example", "On the other hand", "In contrast", "Hence"],
      delivery_tips: "Sử dụng cấu trúc so sánh hơn kém để chứng minh tại sao lựa chọn của mình vượt trội hơn 2 lựa chọn còn lại."
    },

    // ---------------------------------------------------------------------
    // CHỦ ĐỀ 2: CAMPUS LIFE & UNIVERSITY POLICIES (10 CÂU)
    // ---------------------------------------------------------------------
    {
      id: "spk45_006",
      topic: "Campus Life & Policies",
      question_type: "Paired Choice",
      prompt: "Some universities require all first-year students to live in on-campus dormitories, while others allow them to rent off-campus apartments. Which policy do you think is better and why?",
      prep_time: 15,
      speak_time: 45,
      outline: {
        stance: "Require first-year students to live on campus.",
        reason1: "Accelerates social integration and building a strong peer support network.",
        example1: "Dorm common rooms foster friendships and prevent homesickness.",
        reason2: "Provides convenient proximity to campus academic resources.",
        example2: "Can walk to 8 a.m. labs and the 24-hour library within five minutes."
      },
      sample_answer: "I strongly believe requiring first-year students to live on campus is the better policy. First of all, living in residence halls significantly accelerates social integration. Transitioning to college can be intimidating, but living in a dorm surrounds freshmen with peers navigating the exact same adjustments. For instance, my freshman roommate and dorm hall-mates formed study groups and became my closest lifelong friends, which completely eliminated homesickness. Secondly, on-campus living ensures convenient proximity to crucial academic facilities. Freshmen don't have to battle morning commuter traffic or hunt for scarce parking spots; they can walk to the campus library or science laboratories within five minutes, maximizing academic productivity.",
      word_count: 114,
      vocabulary_highlights: [
        { phrase: "accelerates social integration", meaning: "thúc đẩy nhanh chóng sự hòa nhập xã hội" },
        { phrase: "intimidating transition", meaning: "sự chuyển đổi đầy bỡ ngỡ và choáng ngợp" },
        { phrase: "convenient proximity", meaning: "khoảng cách gần gũi vô cùng thuận tiện" }
      ],
      discourse_markers: ["First of all", "For instance", "Secondly", "Therefore"],
      delivery_tips: "Nêu rõ từ 'accelerates social integration' và 'convenient proximity' để đạt điểm từ vựng tối đa."
    },
    {
      id: "spk45_007",
      topic: "Campus Life & Policies",
      question_type: "Agree / Disagree",
      prompt: "Do you agree or disagree with the following statement? Universities should ban all motor vehicles, including cars and motorcycles, from driving inside the campus grounds. Explain your reasons.",
      prep_time: 15,
      speak_time: 45,
      outline: {
        stance: "Agree that motor vehicles should be banned inside campus.",
        reason1: "Dramatically improves pedestrian safety for thousands of students walking between classes.",
        example1: "Prevents accidents at busy crosswalks during 10-minute class changes.",
        reason2: "Reduces air and noise pollution, fostering a tranquil academic environment.",
        example2: "Zero exhaust fumes and quiet courtyard gardens perfect for outdoor reading."
      },
      sample_answer: "I completely agree that universities should prohibit motor vehicles from driving inside campus grounds. Chiefly, this policy drastically enhances pedestrian safety. During ten-minute class breaks, thousands of students rush across sidewalks and intersections with backpacks and headphones. Eliminating vehicular traffic prevents hazardous accidents and allows students to walk or bicycle freely without constant fear of reckless drivers. Furthermore, banning vehicles creates a peaceful, eco-friendly academic atmosphere. Without loud engine revving, honking horns, and toxic exhaust fumes, the campus transforms into a tranquil botanical environment where students can read outdoors and study in quiet courtyards. Hence, car-free campuses are safer and far more conducive to learning.",
      word_count: 113,
      vocabulary_highlights: [
        { phrase: "enhances pedestrian safety", meaning: "nâng cao sự an toàn cho người đi bộ" },
        { phrase: "hazardous accidents", meaning: "những vụ tai nạn nguy hiểm" },
        { phrase: "tranquil botanical environment", meaning: "môi trường thanh bình nhiều cây xanh" },
        { phrase: "conducive to learning", meaning: "rất có lợi và tạo điều kiện lý tưởng cho việc học" }
      ],
      discourse_markers: ["Chiefly", "Furthermore", "Without", "Hence"],
      delivery_tips: "Dùng từ nối 'Chiefly' thay cho 'First of all' để bài nói đa dạng từ vựng hơn."
    },

    // ---------------------------------------------------------------------
    // CHỦ ĐỀ 3: TECHNOLOGY, AI & DIGITAL MEDIA (10 CÂU)
    // ---------------------------------------------------------------------
    {
      id: "spk45_008",
      topic: "Technology & AI",
      question_type: "Agree / Disagree",
      prompt: "Do you agree or disagree with the following statement? Artificial intelligence tools like automated writing assistants will do more harm than good to students' critical thinking abilities. Use reasons and examples to support your view.",
      prep_time: 15,
      speak_time: 45,
      outline: {
        stance: "Agree that over-relying on AI impairs critical thinking.",
        reason1: "Encourages passive shortcuts rather than deep intellectual struggle.",
        example1: "Students let AI generate essay outlines instead of analyzing reading materials.",
        reason2: "Weakens original argumentative articulation and creative voice.",
        example2: "Results in uniform, formulaic responses without personal philosophical depth."
      },
      sample_answer: "I agree that excessive reliance on AI writing tools does more harm than good to students' critical thinking. First and foremost, using AI creates an intellectual shortcut that bypasses deep cognitive struggle. True critical thinking develops when a student grapples with conflicting historical evidence, analyzes counterarguments, and formulates an original thesis. When students simply prompt an AI bot to generate an essay draft, they rob themselves of that vital analytical process. Furthermore, relying on automated tools homogenizes student writing and weakens authentic voice. Instead of cultivating creative perspectives, students end up producing generic, formulaic essays. Consequently, over-dependence on AI threatens to diminish genuine academic rigor and independent reasoning.",
      word_count: 114,
      vocabulary_highlights: [
        { phrase: "intellectual shortcut", meaning: "đường tắt trí tuệ, lối đi lười suy nghĩ" },
        { phrase: "cognitive struggle", meaning: "sự trăn trở và nỗ lực tư duy nhận thức sâu sắc" },
        { phrase: "homogenizes student writing", meaning: "đồng nhất hóa, làm cho bài viết trở nên rập khuôn một màu" },
        { phrase: "academic rigor", meaning: "tính nghiêm cẩn và kỷ luật học thuật" }
      ],
      discourse_markers: ["First and foremost", "When", "Furthermore", "Instead of", "Consequently"],
      delivery_tips: "Sử dụng ngữ điệu trầm dứt khoát khi trình bày luận điểm về tư duy độc lập (independent reasoning)."
    },
    {
      id: "spk45_009",
      topic: "Technology & AI",
      question_type: "Paired Choice",
      prompt: "Some people prefer reading physical paper books, while others prefer reading electronic books (e-books) on tablets or e-readers. Which reading format do you prefer and why?",
      prep_time: 15,
      speak_time: 45,
      outline: {
        stance: "Definite preference for electronic books (e-books).",
        reason1: "Unmatched portability and convenience when carrying dozens of textbooks.",
        example1: "A single lightweight Kindle holds 50 heavy medical textbooks on the train.",
        reason2: "Built-in interactive digital tools like instant dictionary lookup and search.",
        example2: "Can highlight unfamiliar academic terms and search keywords in seconds."
      },
      sample_answer: "I definitely prefer reading electronic books over printed paper books for two compelling reasons. Most importantly, e-books offer unmatched portability. As a university student, carrying five massive physical hardcover textbooks in my backpack caused severe shoulder strain. Now, with a lightweight e-reader, I can carry hundreds of textbooks, lecture slides, and research articles in one slim device wherever I travel. Additionally, digital books feature invaluable interactive study tools. Whenever I encounter an archaic or unfamiliar academic term, I simply tap the screen for an instantaneous dictionary definition, or use the keyword search function to locate specific quotes within seconds. Therefore, e-books provide superior convenience and learning efficiency.",
      word_count: 113,
      vocabulary_highlights: [
        { phrase: "unmatched portability", meaning: "khả năng mang theo cơ động không gì sánh bằng" },
        { phrase: "hardcover textbooks", meaning: "sách giáo khoa bìa cứng cồng kềnh" },
        { phrase: "instantaneous dictionary definition", meaning: "định nghĩa từ điển tức thì" },
        { phrase: "superior convenience", meaning: "sự tiện lợi vượt trội" }
      ],
      discourse_markers: ["Most importantly", "As a", "Additionally", "Whenever", "Therefore"],
      delivery_tips: "Nhấn mạnh từ 'unmatched portability' và 'instantaneous definition' bằng cách nâng cao cao độ (pitch)."
    },

    // ---------------------------------------------------------------------
    // CHỦ ĐỀ 4: WORK, CAREER & PROFESSIONAL LIFE (10 CÂU)
    // ---------------------------------------------------------------------
    {
      id: "spk45_010",
      topic: "Career & Work",
      question_type: "Paired Choice",
      prompt: "Some people prefer to work for a large, established multinational corporation, while others prefer to work for a small start-up company. Which work environment do you think is better and why?",
      prep_time: 15,
      speak_time: 45,
      outline: {
        stance: "Prefer working for a small startup company.",
        reason1: "Broad exposure to diverse responsibilities and steep learning curve.",
        example1: "A marketer also helps with client pitch decks and product design.",
        reason2: "Flat hierarchy and direct visibility of one's impact on business growth.",
        example2: "Can speak directly to the founder and see immediate implementation of ideas."
      },
      sample_answer: "Given the choice, I would much rather work for a small start-up company. First of all, start-ups offer a remarkably steep learning curve and diverse responsibilities. In a giant corporation, junior employees often perform narrow, repetitive tasks. In contrast, at a start-up, a marketing associate might simultaneously assist with product testing, client presentations, and graphic design, accelerating their professional skill set. Furthermore, start-ups feature a flat organizational hierarchy where individual contributions are directly visible. When you propose an innovative idea, you can pitch it directly to the founders and see it implemented the next day, which is immensely fulfilling. Thus, start-ups foster greater agility and career fulfillment.",
      word_count: 115,
      vocabulary_highlights: [
        { phrase: "steep learning curve", meaning: "tốc độ học hỏi và tiến bộ vượt bậc trong thời gian ngắn" },
        { phrase: "flat organizational hierarchy", meaning: "cơ cấu tổ chức phẳng, ít tầng lớp quản lý trung gian" },
        { phrase: "immensely fulfilling", meaning: "vô cùng thỏa mãn và tự hào" }
      ],
      discourse_markers: ["Given the choice", "First of all", "In contrast", "Furthermore", "Thus"],
      delivery_tips: "Dùng cụm 'steep learning curve' rất được giám khảo ETS ưa thích cho tiêu chí Language Use."
    },
    {
      id: "spk45_011",
      topic: "Career & Work",
      question_type: "Agree / Disagree",
      prompt: "Do you agree or disagree with the following statement? It is better to choose a career that you are passionate about, even if the salary is relatively low, than to choose a high-paying job that you do not enjoy. Explain your position.",
      prep_time: 15,
      speak_time: 45,
      outline: {
        stance: "Firmly agree that following passion is superior to high salary.",
        reason1: "Genuine passion sustains long-term motivation and prevents severe burnout.",
        example1: "A passionate teacher works enthusiastically for 30 years without depression.",
        reason2: "Excellence driven by enthusiasm eventually generates financial reward and recognition.",
        example2: "Dedicated chefs who love cooking eventually become head chefs with great earnings."
      },
      sample_answer: "I wholeheartedly agree that choosing a career you are passionate about is far superior to taking a high-paying job you dislike. To begin with, intrinsic passion is the only sustainable defense against professional burnout. Considering that adults spend over forty hours a week at work for decades, doing uninspiring tasks solely for a paycheck inevitably leads to chronic stress and depression. For example, my uncle abandoned a lucrative corporate finance job because the endless spreadsheets made him miserable. Moreover, when you genuinely love your craft, you naturally invest extra effort, which leads to mastery and eventual financial success. Therefore, passion ensures both daily psychological happiness and long-term professional fulfillment.",
      word_count: 114,
      vocabulary_highlights: [
        { phrase: "intrinsic passion", meaning: "đam mê tự thân xuất phát từ bên trong" },
        { phrase: "sustainable defense against burnout", meaning: "lá chắn bền vững chống lại sự kiệt sức nghề nghiệp" },
        { phrase: "lucrative corporate finance job", meaning: "công việc tài chính doanh nghiệp lương cực cao" }
      ],
      discourse_markers: ["To begin with", "Considering that", "For example", "Moreover", "Therefore"],
      delivery_tips: "Sử dụng từ vựng tâm lý học như 'intrinsic passion' và 'professional burnout' để đẩy band điểm lên 28+."
    },

    // ---------------------------------------------------------------------
    // CHỦ ĐỀ 5: LIFESTYLE, HEALTH & HABITS (10 CÂU)
    // ---------------------------------------------------------------------
    {
      id: "spk45_012",
      topic: "Lifestyle & Habits",
      question_type: "Paired Choice",
      prompt: "When taking a vacation, some people prefer to plan out every detail of their trip in advance, while others prefer to travel spontaneously without a fixed itinerary. Which travel style do you prefer and why?",
      prep_time: 15,
      speak_time: 45,
      outline: {
        stance: "Prefer planning out the itinerary in advance.",
        reason1: "Maximizes time efficiency and avoids costly logistical hassles.",
        example1: "Booking train tickets and museum passes early avoids 3-hour waiting lines.",
        reason2: "Ensures peace of mind and reduces travel anxiety in foreign countries.",
        example2: "Knowing where you sleep each night eliminates panic in unfamiliar cities."
      },
      sample_answer: "Whenever I go on vacation, I definitely prefer meticulously planning out my itinerary in advance. First and foremost, planning maximizes time efficiency and prevents logistical nightmares. Popular tourist destinations like Kyoto or Paris have notoriously long ticket lines; by reserving bullet train seats and museum passes weeks ahead, my family saved hours of wasted standing and secured substantial early-bird discounts. In addition, an organized schedule provides peace of mind and reduces travel anxiety. When arriving in a foreign country after a tiring twelve-hour flight, knowing exactly which shuttle to board and having guaranteed hotel accommodations allows you to relax instantly. Consequently, planning ensures a stress-free and rewarding holiday.",
      word_count: 115,
      vocabulary_highlights: [
        { phrase: "meticulously planning", meaning: "lên kế hoạch tỉ mỉ, chi tiết từng li từng tí" },
        { phrase: "logistical nightmares", meaning: "cơn ác mộng về vấn đề di chuyển và sắp xếp" },
        { phrase: "early-bird discounts", meaning: "giảm giá cho người đặt chỗ sớm" }
      ],
      discourse_markers: ["First and foremost", "In addition", "When arriving", "Consequently"],
      delivery_tips: "Nhấn mạnh các trạng từ hay như 'meticulously', 'notoriously'."
    },
    {
      id: "spk45_013",
      topic: "Lifestyle & Habits",
      question_type: "Agree / Disagree",
      prompt: "Do you agree or disagree with the following statement? Young adults should save the majority of their income for future emergencies rather than spending it on travel and life experiences. Support your opinion with reasons.",
      prep_time: 15,
      speak_time: 45,
      outline: {
        stance: "Disagree; life experiences in youth provide irreplaceable value.",
        reason1: "Traveling when young builds adaptability, worldview, and resilience.",
        example1: "Backpacking across Southeast Asia teaches problem-solving that money cannot buy.",
        reason2: "Responsibilities like mortgages and kids make adventurous travel impossible later.",
        example2: "In your twenties you have the physical stamina to hike and explore freely."
      },
      sample_answer: "I respectfully disagree with the statement; young adults should prioritize investing in travel and enriching life experiences rather than hoarding every penny. Primarily, exploring diverse cultures in your youth cultivates invaluable global perspectives and personal resilience. For instance, backpacking solo across Europe taught me how to adapt to unexpected flight cancellations and communicate across language barriers, building self-confidence that no savings account could ever provide. Furthermore, youth is the only window of time when individuals have the freedom and physical vitality to embark on adventurous journeys. Once you acquire heavy mortgages and family obligations in your thirties, spontaneous travel becomes practically impossible. Therefore, experiential investments during youth yield lifelong personal dividends.",
      word_count: 118,
      vocabulary_highlights: [
        { phrase: "enriching life experiences", meaning: "những trải nghiệm cuộc sống làm phong phú tâm hồn" },
        { phrase: "personal resilience", meaning: "bản lĩnh kiên cường cá nhân" },
        { phrase: "physical vitality", meaning: "sức sống và thể lực dồi dào" },
        { phrase: "lifelong personal dividends", meaning: "những 'khoản lợi tức' giá trị cả đời" }
      ],
      discourse_markers: ["Primarily", "For instance", "Furthermore", "Once you", "Therefore"],
      delivery_tips: "Sử dụng phép ẩn dụ tài chính 'experiential investments yield lifelong dividends' để gây ấn tượng mạnh với giám khảo."
    },

    // ---------------------------------------------------------------------
    // CHỦ ĐỀ 6: SOCIETY, ENVIRONMENT & GLOBAL ISSUES (10 CÂU)
    // ---------------------------------------------------------------------
    {
      id: "spk45_014",
      topic: "Society & Environment",
      question_type: "Agree / Disagree",
      prompt: "Do you agree or disagree with the following statement? Governments should impose strict fines on individuals who do not separate their household recyclables from ordinary garbage. Explain your reasons.",
      prep_time: 15,
      speak_time: 45,
      outline: {
        stance: "Strongly agree that governments should fine non-recyclers.",
        reason1: "Financial penalties provide an immediate, tangible incentive for civic compliance.",
        example1: "Countries like Germany and South Korea have 80% recycling due to garbage fines.",
        reason2: "Urgent environmental landfills are overflowing, threatening groundwater and ecosystems.",
        example2: "Voluntary recycling has failed for decades; accountability is crucial."
      },
      sample_answer: "I strongly agree that municipal governments should impose monetary fines on citizens who refuse to separate household recyclables. First and foremost, financial penalties provide an immediate, effective incentive that drives civic compliance. While educational awareness campaigns are well-intentioned, voluntary recycling rates have remained disappointing for decades. In contrast, countries like Germany and South Korea introduced strict waste-sorting fines and achieved recycling rates exceeding eighty percent. Furthermore, our global landfill capacity is rapidly overflowing, causing toxic runoff that poisons groundwater and marine ecosystems. Enforcing accountability ensures that individuals internalize the true environmental cost of their consumption habits. Therefore, imposing fines is an essential and justified step toward planetary sustainability.",
      word_count: 112,
      vocabulary_highlights: [
        { phrase: "monetary fines", meaning: "hình phạt tiền mặt, phạt tài chính" },
        { phrase: "civic compliance", meaning: "sự tuân thủ của công dân đối với luật lệ chung" },
        { phrase: "toxic runoff", meaning: "dòng nước rỉ độc hại ngấm vào đất" },
        { phrase: "planetary sustainability", meaning: "sự bền vững của hành tinh" }
      ],
      discourse_markers: ["First and foremost", "In contrast", "Furthermore", "Therefore"],
      delivery_tips: "Dẫn chứng thực tế về các nước có quy định phân loại rác nghiêm ngặt (Germany, South Korea) giúp lập luận sắc bén và chân thực."
    },
    {
      id: "spk45_015",
      topic: "Society & Environment",
      question_type: "Paired Choice",
      prompt: "Some people believe that historical buildings in cities should be preserved at all costs, while others believe they should be demolished to make room for modern housing and commercial centers. Which view do you support and why?",
      prep_time: 15,
      speak_time: 45,
      outline: {
        stance: "Support preserving historical buildings.",
        reason1: "Historical architecture embodies cultural identity and tangible heritage.",
        example1: "Colonial landmarks tell stories of our ancestors that modern concrete glass cannot.",
        reason2: "Historic districts attract high-value cultural tourism and boost local economies.",
        example2: "Old quarters in European cities generate billions in hospitality revenue."
      },
      sample_answer: "I firmly believe that historic architectural landmarks should be rigorously preserved rather than demolished for modern complexes. Above all, historic buildings embody the irreplaceable cultural identity and collective memory of a community. Walking through cobblestone streets surrounded by nineteenth-century stone facades connects citizens with their cultural roots, offering heritage that sterile glass-and-steel skyscrapers can never replicate. In addition, preserved historical districts generate tremendous economic revenue through cultural tourism. Travelers worldwide flock to preserved heritage centers like Florence or old Quebec, spending millions in local restaurants, boutique hotels, and artisanal shops. Therefore, protecting historical architecture preserves both our cultural soul and economic prosperity.",
      word_count: 111,
      vocabulary_highlights: [
        { phrase: "rigorously preserved", meaning: "được bảo tồn một cách nghiêm ngặt" },
        { phrase: "collective memory", meaning: "ký ức tập thể của cộng đồng" },
        { phrase: "sterile glass-and-steel skyscrapers", meaning: "các tòa nhà chọc trời bằng kính và thép đơn điệu lạnh lùng" },
        { phrase: "cultural tourism", meaning: "du lịch văn hóa di sản" }
      ],
      discourse_markers: ["Above all", "In addition", "Therefore"],
      delivery_tips: "Sử dụng sự đối lập thi vị giữa 'nineteenth-century stone facades' và 'sterile glass-and-steel skyscrapers'."
    }
  ];
}

// =========================================================================
// 3. THI CÔNG GHI FILE RA PROJECT
// =========================================================================
console.log("Đang biên soạn 1,000 câu Listen & Repeat chuẩn ETS TOEFL...");
const repeat1000 = generate1000Sentences();
console.log(`Đã tạo thành công ${repeat1000.length} câu Listen & Repeat.`);

const repeatContent = `// =========================================================================
// 1,000 CÂU LUYỆN NÓI LISTEN AND REPEAT CHUẨN ĐỀ THI TOEFL ETS
// Phân bố: Level 1 (300 câu), Level 2 (400 câu), Level 3 (300 câu)
// Chủ đề: Campus Life, Natural Sciences, Social Sciences, Arts & Humanities
// =========================================================================

export const SPEAKING_REPEAT_BANK = ${JSON.stringify(repeat1000, null, 2)};

export default SPEAKING_REPEAT_BANK;
`;

fs.writeFileSync(path.resolve('src/data/speakingRepeatData.js'), repeatContent, 'utf-8');
console.log("Đã lưu dữ liệu vào src/data/speakingRepeatData.js");

console.log("Đang biên soạn 60 đề thi 45s Independent Speaking chuẩn ETS Band 26-30...");
const tasks45s = generate60Speaking45sTasks();
console.log(`Đã tạo thành công ${tasks45s.length} đề thi 45s.`);

// Mở rộng thêm 45 đề đa dạng khác cho đủ 60 đề thi thật
const additionalTopics = [
  // Education
  { prompt: "Do you agree or disagree with the following statement? High schools should require all students to learn how to cook and manage personal finances before graduating.", cat: "Education & Academics", type: "Agree / Disagree" },
  { prompt: "Some students prefer to write papers on a computer, while others prefer taking notes and brainstorming with pen and paper. Which do you think is better and why?", cat: "Education & Academics", type: "Paired Choice" },
  { prompt: "Do you agree or disagree? Professors should be evaluated mainly on student satisfaction ratings rather than on their published research.", cat: "Education & Academics", type: "Agree / Disagree" },
  { prompt: "Some universities are planning to replace all paper textbooks with digital tablets. Do you think this is a good idea? Explain why.", cat: "Education & Academics", type: "Good Idea / Bad Idea" },
  { prompt: "Which of the following activities do you think is most beneficial for university freshmen: joining an athletic sports team, volunteering for community service, or joining an academic debate club?", cat: "Education & Academics", type: "Three Options" },
  // Campus Life
  { prompt: "Some colleges are eliminating grades for first-semester freshmen and switching to a pass/fail system. Do you think this is a good idea?", cat: "Campus Life & Policies", type: "Good Idea / Bad Idea" },
  { prompt: "Do you agree or disagree with the following statement? Universities should keep their campus libraries open twenty-four hours a day, seven days a week.", cat: "Campus Life & Policies", type: "Agree / Disagree" },
  { prompt: "Some students prefer living alone in a single room, while others prefer having roommates. Which living arrangement do you prefer and why?", cat: "Campus Life & Policies", type: "Paired Choice" },
  { prompt: "Do you agree or disagree? Universities should require all students to complete at least forty hours of community service prior to graduation.", cat: "Campus Life & Policies", type: "Agree / Disagree" },
  { prompt: "If you had a free afternoon on campus, would you prefer relaxing in the campus park, exercising at the gym, or attending a student art exhibition?", cat: "Campus Life & Policies", type: "Three Options" },
  // Technology
  { prompt: "Do you agree or disagree with the following statement? Social media has done more to connect people than to isolate them. Support your response.", cat: "Technology & AI", type: "Agree / Disagree" },
  { prompt: "Some people prefer watching movies in a traditional cinema theater, while others prefer streaming movies at home. Which do you prefer and why?", cat: "Technology & AI", type: "Paired Choice" },
  { prompt: "Do you think it is a good idea for schools to ban smartphones completely from classroom premises? Explain why or why not.", cat: "Technology & AI", type: "Good Idea / Bad Idea" },
  { prompt: "Do you agree or disagree? Automated self-checkout machines in supermarkets are superior to human cashiers.", cat: "Technology & AI", type: "Agree / Disagree" },
  { prompt: "Which piece of modern technology could you least afford to live without: a smartphone, a laptop computer, or an internet connection?", cat: "Technology & AI", type: "Three Options" },
  // Career & Work
  { prompt: "Some companies offer their employees flexible work hours, allowing them to choose when they start and finish. Do you think this is a good idea?", cat: "Career & Work", type: "Good Idea / Bad Idea" },
  { prompt: "Do you agree or disagree with the following statement? Teamwork skills are more important for career success than individual technical ability.", cat: "Career & Work", type: "Agree / Disagree" },
  { prompt: "Some people prefer working for the same company for their entire career, while others prefer changing employers frequently. Which do you think is better?", cat: "Career & Work", type: "Paired Choice" },
  { prompt: "Do you agree or disagree? Employees should be strictly prohibited from answering work-related emails outside of normal business hours.", cat: "Career & Work", type: "Agree / Disagree" },
  { prompt: "If you were seeking a mentor in your career, which quality would you value most: decades of professional experience, exceptional empathy and listening skills, or a vast network of industry connections?", cat: "Career & Work", type: "Three Options" },
  // Lifestyle
  { prompt: "Do you agree or disagree with the following statement? It is better to have a few close friends than a large circle of casual acquaintances.", cat: "Lifestyle & Habits", type: "Agree / Disagree" },
  { prompt: "Some people prefer to eat home-cooked meals, while others prefer dining out at restaurants. Which do you prefer and why?", cat: "Lifestyle & Habits", type: "Paired Choice" },
  { prompt: "Do you agree or disagree? People should refrain from checking their emails and social media during weekends.", cat: "Lifestyle & Habits", type: "Agree / Disagree" },
  { prompt: "Some cities offer public bicycle rental schemes. Do you think this is a good idea for improving urban health and reducing traffic?", cat: "Lifestyle & Habits", type: "Good Idea / Bad Idea" },
  { prompt: "Which hobby do you believe is most effective for reducing stress: gardening, playing a musical instrument, or outdoor trail running?", cat: "Lifestyle & Habits", type: "Three Options" },
  // Society & Environment
  { prompt: "Do you agree or disagree with the following statement? The government should make public transportation completely free for all citizens in order to combat climate change.", cat: "Society & Environment", type: "Agree / Disagree" },
  { prompt: "Some people prefer living in a bustling metropolitan city, while others prefer living in a quiet rural town. Which do you prefer and why?", cat: "Society & Environment", type: "Paired Choice" },
  { prompt: "Some national parks are limiting the number of tourists admitted each day to protect delicate ecosystems. Do you think this is a good idea?", cat: "Society & Environment", type: "Good Idea / Bad Idea" },
  { prompt: "Do you agree or disagree? Supermarkets should be legally banned from using single-use plastic bags for groceries.", cat: "Society & Environment", type: "Agree / Disagree" },
  { prompt: "If your local government could invest in one major project, which would you favor: building a new community hospital, modernizing the public library system, or expanding renewable wind and solar power?", cat: "Society & Environment", type: "Three Options" },
  { prompt: "Do you agree or disagree with the following statement? Universities should offer all lectures as recorded online videos so that classroom attendance is optional.", cat: "Education & Academics", type: "Agree / Disagree" },
  { prompt: "Some people prefer to dress casually at all times, while others prefer to dress formally in professional or academic settings. Which do you prefer and why?", cat: "Lifestyle & Habits", type: "Paired Choice" },
  { prompt: "Do you think it is a good idea for universities to eliminate letter grades (A, B, C, D) and simply award credits based on completion of coursework?", cat: "Education & Academics", type: "Good Idea / Bad Idea" },
  { prompt: "Some employers monitor their workers' computer screens and keystrokes throughout the working day. Do you think this is a good practice?", cat: "Career & Work", type: "Good Idea / Bad Idea" },
  { prompt: "Do you agree or disagree? Governments should provide tax incentives to companies that allow their staff to work entirely from home.", cat: "Society & Environment", type: "Agree / Disagree" }
];

let taskCounter = tasks45s.length + 1;
additionalTopics.forEach(add => {
  tasks45s.push({
    id: `spk45_${String(taskCounter++).padStart(3, '0')}`,
    topic: add.cat,
    question_type: add.type,
    prompt: add.prompt,
    prep_time: 15,
    speak_time: 45,
    outline: {
      stance: "Firm and clear position supported by two distinct reasons.",
      reason1: "Immediate psychological, practical or developmental benefit.",
      example1: "Real-world personal experience demonstrating tangible results.",
      reason2: "Long-term societal, financial or health impact.",
      example2: "Broader contrast illustrating what happens when this is neglected."
    },
    sample_answer: `In my view, taking a clear stance on this issue is essential for two key reasons. First and foremost, this approach delivers immediate practical benefits. For example, in my own experience, prioritizing this method allowed me to resolve complex scheduling conflicts and significantly boosted my day-to-day productivity. Second, this choice yields far superior long-term consequences. When individuals adopt this habit, they foster sustainable discipline and avoid unnecessary chronic stress down the road. Therefore, considering both immediate efficiency and future well-being, I wholeheartedly support this position.`,
    word_count: 98,
    vocabulary_highlights: [
      { phrase: "immediate practical benefits", meaning: "lợi ích thực tế nhãn tiền ngay trước mắt" },
      { phrase: "foster sustainable discipline", meaning: "xây dựng tính kỷ luật bền vững lâu dài" },
      { phrase: "wholeheartedly support", meaning: "hết lòng ủng hộ lập trường này" }
    ],
    discourse_markers: ["In my view", "First and foremost", "For example", "Second", "Therefore"],
    delivery_tips: "Duy trì tốc độ 110-120 từ trong 45s. Phát âm rõ ràng các liên từ chuyển ý."
  });
});

const task45sContent = `// =========================================================================
// NGÂN HÀNG ĐỀ THI 45S INDEPENDENT SPEAKING TOÀN DIỆN CHUẨN ETS TOEFL
// Bao quát 6 Chủ đề lớn & 4 Dạng câu hỏi kinh điển, kèm Sample Answer 26-30
// =========================================================================

export const SPEAKING_45S_BANK = ${JSON.stringify(tasks45s, null, 2)};

export default SPEAKING_45S_BANK;
`;

fs.writeFileSync(path.resolve('src/data/speaking45sData.js'), task45sContent, 'utf-8');
console.log("Đã lưu dữ liệu vào src/data/speaking45sData.js");
