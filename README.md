# ACCESSAI — Adaptive AI Accessibility Interface

> **Frontend Development using AI 2026 — YS Innovation Hub Hackathon Project**

ACCESSAI is an AI-powered accessibility layer that transforms dense, confusing government/scholarship/service forms into a simple, adaptive, multilingual interface.

### 🌟 Core Value Story
> **Input (document/text/goal/category) → AI understands intent → AI adapts the UI itself → User completes the task.**

---

## 🚀 Key Features

1. **Multimodal Document OCR & Form Analyzer**
   - Upload scans (PDF, PNG, JPG) or select pre-loaded sample documents (Income Certificate, SSP Scholarship Form, Caste Category Certificate).
   - AI extracts field values, confidence metrics, missing fields, and mandatory attachments.

2. **Trilingual Legal Simplifier**
   - Turns legal and bureaucrat jargon into plain, easy-to-understand summaries.
   - Built-in support for **English**, **Kannada (ಕನ್ನಡ)**, and **Hindi (हिंदी)**.
   - Browser Web Speech API integration for instant Text-to-Speech (TTS) read-aloud.

3. **Dynamic Recommendation Engine & Generated Step Forms**
   - Match % algorithm with animated percentage bars (e.g. 96% Match).
   - Synthesizes dynamic, adaptive 3-step forms pre-filled with extracted OCR fields.

4. **WCAG 2.1 AAA Accessibility Center**
   - High-contrast pitch-black mode `#000000` with zero decorative clutter.
   - Typography scale controls (100% Standard, 112% Large, 125% Extra Large).
   - Multi-layer reactive background backdrop (`InteractiveNeuralMesh`, `AmbientOrbs`, `MicroGrid`).

5. **Insights & Analytics Dashboard**
   - Recharts visual telemetry tracking tasks completed, documents analyzed, hours saved, and AI confidence scores.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 18 + TypeScript, Vite
- **Styling & Motion**: Tailwind CSS, Framer Motion, Lucide Icons
- **AI Multimodal Model**: Gemini 1.5 Flash (via `@google/generative-ai` with structured JSON prompting & instant fallback simulation engine)
- **Voice Output**: Web Speech API (`SpeechSynthesisUtterance`)
- **Analytics Charts**: Recharts

---

## 💻 How to Run Locally

1. **Clone or navigate to project directory**:
   ```bash
   cd files
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional)**:
   Create a `.env` file from `.env.example`:
   ```bash
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *(Note: If no API key is provided, ACCESSAI automatically uses its intelligent fallback simulation engine for zero-downtime offline demos).*

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🏆 Hackathon Submission Checklist

- [x] **Live Deployed Web App** (Vercel-ready static build)
- [x] **Trilingual Voice & Legal Simplifier** (English, Kannada, Hindi)
- [x] **Adaptive Form UI Generator** (AI generates step-by-step forms, not just chat text)
- [x] **WCAG High Contrast & Responsive Typography**
- [x] **Recharts Metrics & Insights Dashboard**
