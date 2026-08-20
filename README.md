#  ACCESSAI — Adaptive AI Accessibility Interface

<p align="center">
  <img src="https://img.shields.io/badge/AI-Powered-8A2BE2?style=for-the-badge&logo=google-gemini&logoColor=white" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini-Multimodal-4285F4?style=for-the-badge&logo=google&logoColor=white" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Accessibility-WCAG%202.1-00A86B?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Languages-EN%20%7C%20KN%20%7C%20HI-FF6F00?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Hackathon-Frontend%20Development%20using%20AI%202026-111827?style=for-the-badge" />
  <img src="https://img.shields.io/github/license/vikassm0007-arch/ACCESSAI?style=for-the-badge" />
</p>

<h3 align="center">
  🧠 AI that understands the user — and adapts the interface accordingly.
</h3>

<p align="center">
  ACCESSAI transforms complex government, scholarship and public-service documents into
  <b>simple, accessible, multilingual and personalized digital experiences.</b>
</p>

---

## 🏆 Frontend Development using AI 2026

**Organized by:** YS Innovation Hub
**Participation:** Individual
**Category:** Frontend Development + Artificial Intelligence

ACCESSAI was designed around one core question:

> **What if an interface could understand what a user needs and automatically adapt itself to help them complete the task?**

Instead of forcing users to understand complicated forms, ACCESSAI uses AI to analyze the document, identify important information, simplify difficult language and generate an adaptive workflow.

---

# 🚀 The Problem

Government and public-service forms often contain:

* Complex bureaucratic terminology
* Long and confusing instructions
* Multiple mandatory fields
* Difficult documentation requirements
* Language barriers
* Poor accessibility
* Forms designed without considering different user abilities

For many users, **the problem isn't accessing the form — it's understanding the form.**

ACCESSAI addresses this gap by introducing an **AI-powered accessibility layer** between the user and the original information.

---

# 💡 Our Solution

ACCESSAI follows a simple intelligence pipeline:

```text
┌──────────────────────────────┐
│        USER INPUT            │
│ Document / Goal / Category   │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│       AI UNDERSTANDING       │
│ OCR + Intent + Classification│
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│      INFORMATION LAYER       │
│ Fields + Requirements +      │
│ Confidence + Missing Data    │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│       ADAPTIVE UI ENGINE     │
│ Simplify + Translate + Guide │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│       USER COMPLETES TASK    │
│ Simple • Accessible • Guided │
└──────────────────────────────┘
```

### Core Value Proposition

> **Input → AI understands intent → AI adapts the interface → User completes the task**

This makes ACCESSAI more than a chatbot.

**The AI changes the interface itself.**

---

# ✨ Key Features

## 01 — 🧠 Multimodal Document Intelligence

Upload:

* PDF
* PNG
* JPG
* Scanned documents
* Government forms
* Scholarship documents
* Certificates

ACCESSAI analyzes the document and extracts:

| Information     | Example                         |
| --------------- | ------------------------------- |
| Fields          | Name, DOB, Income               |
| Values          | Extracted field values          |
| Confidence      | 96%                             |
| Required Fields | Mandatory information           |
| Missing Fields  | Information still required      |
| Attachments     | Documents that must be uploaded |

### Sample Flow

```text
Document
   ↓
AI Vision Analysis
   ↓
OCR Extraction
   ↓
Field Detection
   ↓
Confidence Scoring
   ↓
Missing Information Detection
   ↓
Adaptive Form
```

---

# 02 — 🌐 Trilingual Legal Simplifier

ACCESSAI converts complicated bureaucratic language into simple explanations.

### Supported Languages

🇬🇧 **English**

🇮🇳 **Kannada — ಕನ್ನಡ**

🇮🇳 **Hindi — हिंदी**

Instead of:

> "The applicant shall furnish documentary evidence substantiating the annual family income..."

ACCESSAI provides:

> **"Upload a document that proves your family's yearly income."**

### 🔊 Voice Accessibility

ACCESSAI integrates the browser's **Web Speech API** to provide text-to-speech functionality.

Users can:

* Listen to instructions
* Hear simplified explanations
* Navigate information more easily
* Use the application without continuously reading text

---

# 03 — 🎯 AI Recommendation Engine

ACCESSAI analyzes user information and available services to calculate relevance.

Example:

```text
Scholarship Recommendation

████████████████████░░ 96%

96% Match

✓ Income criteria satisfied
✓ Academic criteria satisfied
✓ Category requirement satisfied
✓ Required documents available
```

The recommendation engine converts complicated eligibility requirements into an understandable experience.

---

# 04 — 🧩 AI-Generated Adaptive Forms

ACCESSAI doesn't simply explain a form.

It **generates a guided workflow.**

Example:

```text
STEP 1
Personal Information
        ↓
STEP 2
Income & Eligibility
        ↓
STEP 3
Required Documents
        ↓
SUBMIT
```

Extracted information can automatically pre-fill relevant fields.

This reduces:

* Repetitive typing
* Cognitive load
* User confusion
* Form completion time

---

# 05 — ♿ Accessibility Center

Accessibility is built into the product rather than added as an afterthought.

### High Contrast Mode

```text
Background: #000000
Text:       High Contrast
UI:         Minimal
```

### Typography Controls

```text
100% → Standard
112% → Large
125% → Extra Large
```

### Accessibility Goals

* High contrast
* Larger typography
* Reduced visual clutter
* Keyboard-friendly interaction
* Clear hierarchy
* Read-aloud support
* Responsive layouts
* Multilingual interaction

---

# 06 — 📊 Insights & Analytics

The dashboard provides visual telemetry using Recharts.

### Tracked Metrics

* Documents analyzed
* Tasks completed
* Hours saved
* AI confidence
* Recommendation matches
* Form completion progress

Example:

```text
Documents Analyzed       128
Tasks Completed           94
Hours Saved               37
Average AI Confidence     96%
```

---

# 🧠 AI Architecture

```text
                    USER
                      │
                      ▼
             ┌────────────────┐
             │   React UI     │
             └───────┬────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │ Input / Document     │
          │ / Goal / Category    │
          └──────────┬───────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │   Gemini AI Layer    │
          │                      │
          │ • OCR                │
          │ • Classification     │
          │ • Extraction         │
          │ • Simplification     │
          │ • Recommendation     │
          └──────────┬───────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │ Structured JSON      │
          │ Response             │
          └──────────┬───────────┘
                     │
                     ▼
       ┌────────────────────────────┐
       │ Adaptive Interface Engine  │
       │                            │
       │ • Dynamic Forms            │
       │ • Language                 │
       │ • Accessibility            │
       │ • Recommendations          │
       └─────────────┬──────────────┘
                     │
                     ▼
                 USER TASK
```

---

# 🛠️ Technology Stack

### Frontend

| Technology    | Purpose                     |
| ------------- | --------------------------- |
| React 18      | UI development              |
| TypeScript    | Type safety                 |
| Vite          | Development & build tooling |
| Tailwind CSS  | Styling                     |
| Framer Motion | UI animations               |
| Lucide Icons  | Interface icons             |

### Artificial Intelligence

| Technology                | Purpose                 |
| ------------------------- | ----------------------- |
| Gemini                    | Multimodal AI           |
| Structured JSON Prompting | Reliable AI output      |
| Fallback Engine           | Offline/demo resilience |

### Accessibility

| Technology            | Purpose              |
| --------------------- | -------------------- |
| Web Speech API        | Text-to-Speech       |
| Responsive Typography | Readability          |
| High Contrast UI      | Visual accessibility |
| Keyboard-friendly UI  | Navigation           |

### Data Visualization

**Recharts**

Used for:

* Analytics
* AI confidence
* Task statistics
* Productivity metrics

---

# 📁 Project Architecture

```text
ACCESSAI/
│
├── public/
│   ├── samples/
│   └── assets/
│
├── src/
│   │
│   ├── components/
│   │   ├── accessibility/
│   │   ├── dashboard/
│   │   ├── document/
│   │   ├── forms/
│   │   ├── layout/
│   │   └── ui/
│   │
│   ├── services/
│   │   ├── gemini/
│   │   ├── ocr/
│   │   ├── recommendations/
│   │   └── speech/
│   │
│   ├── hooks/
│   │   ├── useAccessibility.ts
│   │   ├── useLanguage.ts
│   │   └── useSpeech.ts
│   │
│   ├── data/
│   │   ├── samples.ts
│   │   └── translations.ts
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Analyzer.tsx
│   │   ├── Recommendations.tsx
│   │   ├── AdaptiveForm.tsx
│   │   └── Insights.tsx
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── .env.example
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

# ⚙️ How to Run Locally

## 1. Clone the Repository

```bash
git clone https://github.com/vikassm0007-arch/ACCESSAI.git
cd ACCESSAI
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create a `.env` file:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

> ⚠️ Never commit your real API key to GitHub.

## 4. Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 5. Production Build

```bash
npm run build
```

---

# 🔐 AI Fallback Architecture

ACCESSAI is designed to remain demo-ready even when the Gemini API is unavailable.

```text
             AI Request
                 │
                 ▼
          Gemini Available?
           /           \
         YES            NO
          │              │
          ▼              ▼
      Gemini AI      Fallback Engine
          │              │
          └──────┬───────┘
                 ▼
          Structured Result
                 │
                 ▼
           Adaptive UI
```

This provides:

* Better hackathon reliability
* Offline demonstration capability
* Predictable sample outputs
* Graceful API failure handling

---

# 🎨 UX Philosophy

ACCESSAI follows five principles:

### 1. Understand First

Users should not need to understand bureaucratic terminology before using the system.

### 2. Simplify, Don't Hide

Complex information is translated into simpler language while preserving the original intent.

### 3. Guide, Don't Overwhelm

Long forms are divided into smaller actionable steps.

### 4. Adapt to the User

Font size, contrast, language and voice support can change according to user needs.

### 5. AI Should Change the Experience

The AI isn't simply a chat window.

It directly influences the interface.

---

# 📈 Example User Journey

```text
1. User uploads scholarship document
              ↓
2. ACCESSAI analyzes document
              ↓
3. AI extracts 18 fields
              ↓
4. Missing information identified
              ↓
5. Legal instructions simplified
              ↓
6. User switches to Kannada
              ↓
7. User activates Read Aloud
              ↓
8. AI generates 3-step form
              ↓
9. Extracted information pre-filled
              ↓
10. User completes application
```

### Result

**Less confusion.
Less repetition.
Less time.
More accessibility.**

---

# 🏆 Why ACCESSAI Stands Out

Most AI frontend projects demonstrate:

```text
User → Prompt → Chatbot → Response
```

ACCESSAI demonstrates:

```text
User
  ↓
Real-world document
  ↓
Multimodal AI
  ↓
Understanding
  ↓
Personalization
  ↓
Adaptive Interface
  ↓
Accessible Task Completion
```

### Our Differentiator

> **We don't just use AI to generate content. We use AI to generate the user's experience.**

---

# 🌍 Real-World Applications

ACCESSAI can be extended beyond hackathon demonstrations.

### 🏛 Government Services

Simplify government application processes.

### 🎓 Scholarships

Help students understand eligibility and required documents.

### 🏥 Healthcare

Convert complicated healthcare instructions into accessible explanations.

### 💼 Employment

Simplify government employment and welfare applications.

### 🧾 Public Services

Guide citizens through complex administrative workflows.

---

# 🔮 Future Roadmap

### Phase 1 — Current

* [x] Multimodal document analysis
* [x] OCR field extraction
* [x] Trilingual support
* [x] Legal simplification
* [x] Text-to-Speech
* [x] Adaptive forms
* [x] Accessibility controls
* [x] Analytics dashboard

### Phase 2 — Next

* [ ] Real-time document validation
* [ ] More Indian regional languages
* [ ] Voice-based form filling
* [ ] Personalized accessibility profiles
* [ ] Advanced eligibility prediction
* [ ] Government-service API integrations

### Phase 3 — Vision

```text
AI Accessibility Agent
        ↓
Understands User
        ↓
Understands Document
        ↓
Understands Service
        ↓
Builds Personalized Workflow
        ↓
Guides User Until Completion
```

---

# 📊 Impact Metrics

ACCESSAI is designed around measurable outcomes.

| Metric               | Goal      |
| -------------------- | --------- |
| Form Completion Time | ↓ Reduce  |
| User Confusion       | ↓ Reduce  |
| Repeated Data Entry  | ↓ Reduce  |
| Accessibility        | ↑ Improve |
| Language Barrier     | ↓ Reduce  |
| AI Understanding     | ↑ Improve |
| Task Completion      | ↑ Improve |

---

# 🧪 Sample Documents

The demo includes sample workflows for:

* Income Certificate
* SSP Scholarship Form
* Caste Category Certificate

These provide judges/users with immediate real-world scenarios to test the platform.

---

# 🏅 Hackathon Submission Checklist

* [x] AI-powered frontend
* [x] Multimodal document analysis
* [x] Gemini integration
* [x] Structured AI responses
* [x] AI-generated adaptive forms
* [x] English + Kannada + Hindi
* [x] Text-to-Speech
* [x] High-contrast accessibility mode
* [x] Dynamic typography
* [x] Recommendation engine
* [x] Analytics dashboard
* [x] Responsive interface
* [x] Fallback simulation engine
* [x] Vercel-ready production build

---

# 🚀 Deployment

ACCESSAI is designed for modern frontend deployment platforms.

Recommended deployment:

```text
GitHub
   ↓
Vercel
   ↓
Production Build
   ↓
ACCESSAI Web App
```

Before deployment, configure:

```env
VITE_GEMINI_API_KEY=your_api_key
```

---

# 👨‍💻 Developer

<p align="center">

<b>Vikas S Mirji</b>

<br>

Final Year Computer Science & Engineering Student

<br><br>

<a href="https://github.com/vikassm0007-arch">
  <img src="https://img.shields.io/badge/GitHub-vikassm0007--arch-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>

</p>

---

# 💬 Final Thought

> ### "Accessibility shouldn't be a setting. It should be the intelligence behind the interface."

ACCESSAI aims to make digital public services **understandable, adaptive and accessible to everyone.**

---

<p align="center">

### ♿ ACCESSAI

**Understand. Adapt. Simplify. Empower.**

⭐ If you find this project meaningful, consider giving the repository a star.

</p>
