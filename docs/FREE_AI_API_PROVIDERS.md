# 🌐 TỔNG HỢP CÁC NGUỒN AI CUNG CẤP FREE API KEY (2026)

> **Tài liệu tham khảo & Hướng dẫn tích hợp cho dự án TOEFL iBT Platform**  
> *Mục đích:* Lưu trữ danh sách các nhà cung cấp AI miễn phí uy tín, hạn mức (free quota), endpoint và mã nguồn mẫu để sẵn sàng tích hợp làm tầng dự phòng (fallback fallback layers) cho hệ thống chấm thi, dịch nghĩa và tra từ điển khi cần thiết.

---

## 📊 Bảng tổng hợp các nhà cung cấp AI Free Tier

| # | Nhà cung cấp | Models tiêu biểu | Hạn mức miễn phí | Chuẩn kết nối | Link đăng ký lấy Key | Điểm mạnh nhất |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **GitHub Models** ⭐ *(Khuyên dùng)* | `gpt-4o`, `gpt-4o-mini`, `meta-llama-3.3-70b-instruct`, `phi-4` | **~150 req/ngày** (Reset mỗi 24h) | OpenAI Compatible | [github.com/marketplace/models](https://github.com/marketplace/models) | Dùng ngay tài khoản GitHub cá nhân, được xài **GPT-4o / 4o-mini chính chủ** hoàn toàn miễn phí. |
| **2** | **Mistral AI** ⭐ *(Khuyên dùng)* | `mistral-small-latest`, `codestral-latest`, `ministral-8b` | **Miễn phí vĩnh viễn** (~1 req/s, 1 tỷ tokens/tháng) | OpenAI Compatible | [console.mistral.ai](https://console.mistral.ai/) | Không cần thẻ visa, cực giỏi ngữ pháp & dịch thuật học thuật Anh - Việt. |
| **3** | **Cerebras Cloud** | `llama-3.3-70b`, `llama-3.1-8b`, `qwen-2.5-32b` | **1,000,000 tokens / ngày** (Reset mỗi 24h) | OpenAI Compatible | [cloud.cerebras.ai](https://cloud.cerebras.ai/) | Chip CS-3 siêu tốc **~1,800 tokens/s**, trả lời từ điển gần như tức thì (< 0.2s). |
| **4** | **Cloudflare Workers AI** | `llama-3.3-70b-instruct`, `mistral-7b-instruct`, `@cf/openai/whisper` | **10,000 Neurons / ngày** (Khoảng vài ngàn request/ngày) | REST / Cloudflare SDK | [dash.cloudflare.com](https://dash.cloudflare.com/) | Edge Server 300+ thành phố toàn cầu (có server tại VN), độ trễ thấp nhất. |
| **5** | **Hugging Face Serverless** | `Qwen/Qwen2.5-72B-Instruct`, `meta-llama/Llama-3.3-70B-Instruct`, `deepseek-ai/DeepSeek-R1` | Miễn phí hàng nghìn request/tháng | OpenAI Compatible | [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens) | Kho mô hình Open Source phong phú nhất thế giới. |
| **6** | **Cohere** | `command-r-plus`, `command-r`, `embed-multilingual-v3.0` | **1,000 requests / tháng** (Trial Key vĩnh viễn) | OpenAI / Cohere REST | [cohere.com](https://cohere.com/) | Khả năng phân tích ngữ nghĩa, scoring bài luận văn học thuật cực kỳ chuẩn xác. |
| **7** | **Pollinations.ai** 🛡️ *(Cứu cánh)* | `openai` (GPT-4o mini), `mistral`, `claude-hybrid` | **Không giới hạn** (**KHÔNG CẦN API KEY**) | REST / OpenAI format | [text.pollinations.ai](https://text.pollinations.ai/) | Miễn phí 100%, không cần đăng ký tài khoản, gọi API trực tiếp không sợ bị khóa hay hết quota. |

---

## 🛠️ Hướng dẫn chi tiết & Code mẫu từng bên

### 1. GitHub Models (Khuyên dùng số 1)
* **Ưu điểm:** Bạn đã có tài khoản GitHub, không phải tạo thêm account lạ. Được cấp quyền truy cập mô hình GPT-4o và GPT-4o-mini của OpenAI mà không tốn 1 xu.
* **Cách lấy Token:**
  1. Vào link: [github.com/settings/tokens](https://github.com/settings/tokens)
  2. Bấm **Generate new token (classic)**.
  3. Đặt Note (ví dụ: `TOEFL App AI`) và chọn hạn sử dụng `No expiration`. Không cần tích bất kỳ quyền (scope) nào khác nếu chỉ dùng gọi Models.
  4. Copy chuỗi token bắt đầu bằng `ghp_...`.
* **Thông số kết nối:**
  - **Base URL:** `https://models.inference.ai.azure.com`
  - **Headers:** `Authorization: Bearer ghp_...`
  - **Model:** `gpt-4o-mini` hoặc `meta-llama-3.3-70b-instruct`
* **Mã nguồn JavaScript (Fetch):**
```javascript
export async function callGitHubModels(prompt, githubToken) {
  const response = await fetch("https://models.inference.ai.azure.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${githubToken}`
    },
    body: JSON.stringify({
      messages: [
        { role: "system", content: "You are an expert TOEFL iBT tutor." },
        { role: "user", content: prompt }
      ],
      model: "gpt-4o-mini",
      temperature: 0.3
    })
  });
  const data = await response.json();
  return data.choices[0].message.content;
}
```

---

### 2. Mistral AI (La Plateforme)
* **Ưu điểm:** Nhà cung cấp AI hàng đầu châu Âu, không bắt nhập thẻ tín dụng cho Free Tier. Rất mạnh về văn phong học thuật, chấm bài viết logic.
* **Cách lấy Key:**
  1. Đăng ký tại [console.mistral.ai](https://console.mistral.ai/) (dùng tài khoản Google hoặc GitHub).
  2. Vào mục **API Keys** ở thanh điều hướng bên trái.
  3. Bấm **Create new key** và lưu lại.
* **Thông số kết nối:**
  - **Base URL:** `https://api.mistral.ai/v1/chat/completions`
  - **Headers:** `Authorization: Bearer <MISTRAL_API_KEY>`
  - **Model:** `mistral-small-latest` (cho từ điển, bài tập) hoặc `codestral-latest`
* **Mã nguồn JavaScript (Fetch):**
```javascript
export async function callMistralAI(prompt, mistralKey) {
  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${mistralKey}`
    },
    body: JSON.stringify({
      model: "mistral-small-latest",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2
    })
  });
  const data = await response.json();
  return data.choices[0].message.content;
}
```

---

### 3. Cerebras Cloud (Siêu tốc độ LPU)
* **Ưu điểm:** Chạy trên wafer-scale engine lớn nhất thế giới, tốc độ đạt 1.500 - 2.000 tokens/giây (nhanh tương đương hoặc hơn Groq). Hạn mức 1 triệu tokens/ngày hoàn toàn miễn phí.
* **Cách lấy Key:**
  1. Đăng ký tại [cloud.cerebras.ai](https://cloud.cerebras.ai/).
  2. Bấm vào mục **API Keys** > **Create API Key**.
* **Thông số kết nối:**
  - **Base URL:** `https://api.cerebras.ai/v1/chat/completions`
  - **Headers:** `Authorization: Bearer <CEREBRAS_API_KEY>`
  - **Model:** `llama3.3-70b` hoặc `llama3.1-8b`
* **Mã nguồn JavaScript (Fetch):**
```javascript
export async function callCerebras(prompt, apiKey) {
  const response = await fetch("https://api.cerebras.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "llama3.3-70b",
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await response.json();
  return data.choices[0].message.content;
}
```

---

### 4. Pollinations.ai (Tầng cứu sinh - Không cần API Key)
* **Ưu điểm:** Hoàn toàn công cộng, không yêu cầu thẻ tín dụng, không cần đăng nhập hay truyền API Key. Lý tưởng khi mọi API Key cá nhân của người dùng bị quá hạn mức hoặc gặp sự cố mạng.
* **Thông số kết nối:**
  - **Base URL:** `https://text.pollinations.ai/`
  - **Method:** `POST`
  - **Headers:** `Content-Type: application/json`
  - **Model:** `openai` (GPT-4o mini) hoặc `mistral`
* **Mã nguồn JavaScript (Fetch):**
```javascript
export async function callPollinationsFallback(prompt) {
  const response = await fetch("https://text.pollinations.ai/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [
        { role: "system", content: "You are an English-Vietnamese academic dictionary assistant." },
        { role: "user", content: prompt }
      ],
      model: "openai",
      jsonMode: true // Nếu cần kết quả dạng JSON
    })
  });
  return await response.text();
}
```

---

### 5. Cloudflare Workers AI
* **Ưu điểm:** Hạn mức 10,000 Neurons/ngày miễn phí vĩnh viễn cho mọi tài khoản Cloudflare. Có hỗ trợ cả mô hình nhận dạng giọng nói Whisper `@cf/openai/whisper`.
* **Cách lấy Key:**
  1. Vào [dash.cloudflare.com](https://dash.cloudflare.com/) > Chọn mục **Workers & Pages** > **Overview**.
  2. Lấy **Account ID** ở cột bên phải.
  3. Vào mục **API Tokens** > Tạo Token có quyền `Workers AI: Read`.
* **Thông số kết nối:**
  - **Base URL:** `https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/meta/llama-3.3-70b-instruct`
  - **Headers:** `Authorization: Bearer <CLOUDFLARE_API_TOKEN>`

---

## 🏗️ Chiến lược tích hợp vào dự án TOEFL (Waterfall Fallback Architecture)

Hệ thống AI đa tầng được thiết kế để tự động chuyển sang tầng tiếp theo nếu tầng trước bị lỗi `429 Too Many Requests`, `Quota Exceeded` hoặc mất kết nối:

```
[Người dùng yêu cầu tra từ / dịch / chấm bài]
                      │
                      ▼
 ┌──────────────────────────────────────────┐
 │  Tầng 1: Gemini 2.5 Flash / 1.5 Flash   │  (Google AI Studio - 15 RPM Free)
 └────────────────────┬─────────────────────┘
                      │ (Nếu lỗi 429 / hết quota)
                      ▼
 ┌──────────────────────────────────────────┐
 │  Tầng 2: GitHub Models (GPT-4o mini)     │  (150 req/ngày - OpenAI chất lượng cao)
 └────────────────────┬─────────────────────┘
                      │ (Nếu lỗi 429)
                      ▼
 ┌──────────────────────────────────────────┐
 │  Tầng 3: Groq (openai/gpt-oss-120b)      │  (Siêu tốc độ inference)
 └────────────────────┬─────────────────────┘
                      │ (Nếu lỗi 429)
                      ▼
 ┌──────────────────────────────────────────┐
 │  Tầng 4: Mistral AI / Cerebras Cloud     │  (Dịch thuật học thuật & ngữ pháp)
 └────────────────────┬─────────────────────┘
                      │ (Nếu tất cả các key đều lỗi)
                      ▼
 ┌──────────────────────────────────────────┐
 │  Tầng Cứu Sinh: Pollinations.ai         │  (Không cần Key - Chạy 24/7)
 └──────────────────────────────────────────┘
```

---

## 📌 Các file trong dự án cần cập nhật khi tích hợp:
1. `src/lib/gemini.js`: Bổ sung hàm gọi API của nhà cung cấp mới vào chuỗi waterfall fallback.
2. `src/components/modals/SettingsModal.jsx`: Thêm ô nhập API Key tương ứng (GitHub Token, Mistral Key, Cerebras Key) để người dùng có thể tự cấu hình.
3. `.env.example`: Bổ sung các biến môi trường dự phòng:
   ```env
   VITE_GITHUB_MODELS_KEY=
   VITE_MISTRAL_API_KEY=
   VITE_CEREBRAS_API_KEY=
   ```
