# 🚀 ExtConverter Backend API

A secure and scalable backend API for file conversion (PDF ↔ Word) using Cloudmersive API. Built with Node.js and Express.

---

## ✨ Features

- 📄 PDF to Word conversion
- 📄 Word to PDF conversion
- ⚡ Fast API response
- 🔐 Secure API key handling (.env)
- 📦 File upload handling (Multer)
- 🔄 Direct file download response (no storage required)
- 🌐 CORS enabled for frontend integration

---

## 🛠️ Tech Stack

- ⚙️ Node.js
- 🚀 Express.js
- 📁 Multer (file handling)
- 🌍 Cloudmersive API
- 🔐 dotenv (environment variables)
- 🔗 REST API

---

---

## 🚀 Getting Started

### 1. Clone repository

```bash
git clone https://github.com/programmERR12/extConverter_backend.git
```

---

### 2. Install dependencies

```bash id="b3r0op"
npm install
```

---

### 3. Setup environment variables

Create a `.env` file in root:

```env id="env1"
API_KEY=your_cloudmersive_api_key
PORT=4000
```

---

### 4. Run server (development)

```bash id="b4r1pq"
npm run dev
```

OR

```bash id="b4r1pq2"
node index.js
```

---

## 🌐 API Endpoints

### 📄 PDF → Word

```http id="api1"
POST /api/convert/pdf-to-word
```

### 📄 Word → PDF

```http id="api2"
POST /api/convert/word-to-pdf
```

---

## 📤 Request Format

Use `multipart/form-data`

| Key  | Value        |
|------|-------------|
| file | upload file |

---

## 📥 Response

👉 Returns converted file directly as download.

---

## ⚠️ Important Notes

- API key must be valid in `.env`
- Only PDF and DOCX files supported
- No file is permanently stored (memory processing recommended)
- Ensure correct CORS setup for frontend

---

## 🔥 Future Improvements

- 📊 Conversion history database
- 🔐 User authentication (JWT)
- ☁️ Cloud storage (AWS S3 / Firebase)
- 📈 Rate limiting & security layer
- 📂 Batch file conversion

---

## 👨‍💻 Author

- Developed by **Divyanshu Sharma**
- GitHub: [programmERR12](https://github.com/programmERR12)

---

## 📜 License

This project is open-source and free to use.
```

---

# 💯 PRO TIP (interview level)

Agar tum README me ye line add kar do:

> “This backend is stateless and does not store files, ensuring high scalability.”

👉 interviewer impression 🔥 ho jata hai

---

Agar chaho toh main tumhe next bana ke de sakta hoon:
- 🔥 Full-stack README (1 page SaaS style)
- 🔥 GitHub profile portfolio README
- 🔥 Resume project description (best ATS format)

bas bol 👍


