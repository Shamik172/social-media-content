#  Social Media Content Analyzer

A full-stack application that analyzes uploaded **PDFs and images** and provides:

- **Normal (rule-based) text analysis**
- **AI-powered insights using Google Gemini**
- **OCR text extraction from images**
- **PDF text extraction**
- **Social media optimization suggestions**

Built with **MERN + Vite + Tailwind**, and fully deployable on **Render**.

---

## Project Overview

This project enables users to upload any PDF/image and get both:
1. **Normal analysis** (sentiment, readability etc.)  
2. **AI analysis** (summary, rewritten caption, hashtags, suggestions)

It uses:
- **pdf-parse** for PDFs  
- **Tesseract.js** for OCR  
- **Gemini 2.5 Flash** for AI improvements  

---

## Technologies Used

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React (Vite), Tailwind | UI, file upload, result display |
| Backend | Node + Express | File handling, routing |
| OCR | Tesseract.js | Extract text from images |
| PDF Parsing | pdf-parse-fixed | Extract text from PDFs |
| AI Layer | Google Gemini API | Generate captions, hashtags, summaries |
| Storage | Multer | File upload middleware |

---

## Folder Structure
```
/social-media-analyzer
│
├── client/ # Frontend (React + Vite)
│ ├── src/
│ │ ├── components/
│ │ │ ├── FileUpload.jsx
│ │ │ ├── ResultPanel.jsx
│ │ │ └── AIResultPanel.jsx
│ │ ├── utils/api.js
│ │ └── App.jsx
│ ├── public/
│ ├── vite.config.js
│ ├── tailwind.config.js
│ └── package.json
│
└── server/ # Backend (Node + Express)
├── controllers/
│ └── uploadController.js
├── middleware/
│ └── upload.js
├── routes/
│ ├── uploadRoutes.js
│ └── uploadAIRoutes.js
├── services/
│ ├── pdfService.js
│ ├── ocrService.js
│ ├── analysisService.js
│ └── aiService.js
├── uploads/ # Auto-created, temporary files deleted
├── index.js
├── .env
└── package.json
```
## How It Works

### 1. User Uploads a File
The user can upload a **PDF** or an **Image**.

- **PDF** → processed using `pdf-parse`  
- **Image** → scanned using **Tesseract OCR** for text extraction

---

### 2. Normal Analysis (Rule-Based)
After extracting text, the backend computes:

- **Word count**
- **Hashtags**
- **Emoji count**
- **Sentiment score (positive / neutral / negative)**
- **Engagement score** (0–100)
- **Suggestions** for improving the content

---

### 3. AI Analysis (Gemini)
If the user selects the **AI mode**, the extracted text is sent to **Gemini**, which returns structured JSON:

```json
{
  "summary": "...",
  "rewritten": "...",
  "hashtags": ["#tag1", "#tag2"],
  "suggestions": ["...", "..."]
}

