import { SupportedLanguage } from '@/types/accessai';

export interface Translations {
  [key: string]: {
    en: string;
    kn: string;
    hi: string;
  };
}

export const translations: Translations = {
  // Brand & Navbar
  brandName: { en: 'ACCESS', kn: 'ACCESS', hi: 'ACCESS' },
  brandSub: { en: 'Adaptive Accessibility Layer', kn: 'ಅಡಾಪ್ಟಿವ್ ಪ್ರವೇಶಸಾಧ್ಯತೆ ಲೇಯರ್', hi: 'अनुकूली पहुंच क्षमता स्तर' },
  aiReady: { en: 'AI Ready', kn: 'AI ಸಿದ್ಧವಾಗಿದೆ', hi: 'एआई तैयार है' },
  aiListening: { en: 'AI Listening…', kn: 'AI ಆಲಿಸುತ್ತಿದೆ…', hi: 'एआई सुन रहा है…' },
  aiProcessing: { en: 'AI Processing…', kn: 'AI ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುತ್ತಿದೆ…', hi: 'एआई प्रसंस्करण जारी है…' },
  aiDocUpload: { en: 'Analyzing Document', kn: 'ದಾಖಲೆ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ', hi: 'दस्तावेज़ का विश्लेषण हो रहा है' },

  // Navigation Links
  navHome: { en: 'Home', kn: 'ಮುಖಪುಟ', hi: 'होम' },
  navWorkspace: { en: 'AI Workspace', kn: 'AI ವರ್ಕ್‌ಸ್ಪೇಸ್', hi: 'एआई कार्यक्षेत्र' },
  navAnalyzer: { en: 'Analyzer', kn: 'ವಿಶ್ಲೇಷಕ', hi: 'विश्लेषक' },
  navRecommendations: { en: 'Matches & Forms', kn: 'ವಿದ್ಯಾರ್ಥಿವೇತನ ಮತ್ತು ಫಾರ್ಮ್‌ಗಳು', hi: 'मैच और फॉर्म' },
  navAccessibility: { en: 'Accessibility', kn: 'ಪ್ರವೇಶಸಾಧ್ಯತೆ', hi: 'पहुंच क्षमता' },
  navInsights: { en: 'Insights', kn: 'ಒಳನೋಟಗಳು', hi: 'अंतर्दृष्टि' },

  // Read & Audio Controls
  btnRead: { en: 'Read', kn: 'ಓದಿ (ಧ್ವನಿ)', hi: 'पढ़ें (आवाज)' },
  btnStopVoice: { en: 'Stop Voice', kn: 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ', hi: 'आवाज रोकें' },
  readPageIntro: {
    en: 'Welcome to ACCESS AI. An adaptive accessibility layer for digital services.',
    kn: 'ಆಕ್ಸೆಸ್ AI ಗೆ ಸುಸ್ವಾಗತ. ಡಿಜಿಟಲ್ ಸೇವೆಗಳಿಗಾಗಿ ಅನುಕೂಲಕರ ಪ್ರವೇಶಸಾಧ್ಯತಾ ವ್ಯವಸ್ಥೆ.',
    hi: 'एक्सेस AI में आपका स्वागत है। डिजिटल सेवाओं के लिए अनुकूलन योग्य पहुंच क्षमता स्तर।',
  },

  // Hero Section
  heroBadge: { en: 'Universal Accessibility AI Engine', kn: 'ಸಾರ್ವತ್ರಿಕ ಪ್ರವೇಶಸಾಧ್ಯತೆ AI ಎಂಜಿನ್', hi: 'सार्वभौमिक पहुंच एआई इंजन' },
  heroTitle1: { en: 'Bridging Digital Divide with', kn: 'ಡಿಜಿಟಲ್ ಕಂದಕವನ್ನು ನಿವಾರಿಸಿ', hi: 'डिजिटल विभाजन को दूर करें' },
  heroTitle2: { en: 'Adaptive AI & Multilingual Voice', kn: 'ಅಡಾಪ್ಟಿವ್ AI ಮತ್ತು ಬಹುಭಾಷಾ ಧ್ವನಿಯೊಂದಿಗೆ', hi: 'अनुकूली एआई और बहुभाषी आवाज के साथ' },
  heroSubtitle: {
    en: 'Simplifying government schemes, scholarship forms, and document inspection with instant Kannada, Hindi, and English voice synthesis.',
    kn: 'ತತ್ಕ್ಷಣದ ಕನ್ನಡ, ಹಿಂದಿ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಧ್ವನಿ ಸಂಶ್ಲೇಷಣೆಯೊಂದಿಗೆ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು, ವಿದ್ಯಾರ್ಥಿವೇತನ ಅರ್ಜಿಗಳು ಮತ್ತು ದಾಖಲೆ ಪರಿಶೀಲನೆಯನ್ನು ಸರಳಗೊಳಿಸುವುದು.',
    hi: 'तत्काल कन्नड़, हिंदी और अंग्रेजी आवाज संश्लेषण के साथ सरकारी योजनाओं, छात्रवृत्ति फार्मों और दस्तावेज़ निरीक्षक को सरल बनाना।',
  },
  btnLaunchWorkspace: { en: 'Launch AI Workspace', kn: 'AI ವರ್ಕ್‌ಸ್ಪೇಸ್ ಪ್ರಾರಂಭಿಸಿ', hi: 'एआई कार्यक्षेत्र प्रारंभ करें' },
  btnInspectDoc: { en: 'Inspect Document', kn: 'ದಾಖಲೆ ಪರಿಶೀಲಿಸಿ', hi: 'दस्तावेज़ की जांच करें' },
  btnFindScholarships: { en: 'Find Scholarships', kn: 'ವಿದ್ಯಾರ್ಥಿವೇತನ ಹುಡುಕಿ', hi: 'छात्रवृत्तियां खोजें' },

  // Features Section
  featuresTitle: { en: 'Empowering Citizens Through Inclusive AI', kn: 'ಸಮಗ್ರ AI ಮೂಲಕ ನಾಗರಿಕರ ಸಬಲೀಕರಣ', hi: 'समावेशी एआई के माध्यम से नागरिकों का सशक्तिकरण' },
  featuresSubtitle: {
    en: 'Designed from the ground up for low-literacy, multi-dialect, and accessible digital governance.',
    kn: 'ಕಡಿಮೆ ಸಾಕ್ಷರತೆ, ಬಹು-ಉಪಭಾಷೆಗಳು ಮತ್ತು ಪ್ರವೇಶಿಸಬಹುದಾದ ಡಿಜಿಟಲ್ ಆಡಳಿತಕ್ಕಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.',
    hi: 'कम साक्षरता, बहु-बोली और सुलभ डिजिटल शासन के लिए पूरी तरह से डिज़ाइन किया गया।'
  },
  feat1Title: { en: 'Trilingual AI Voice', kn: 'ತ್ರಿಭಾಷಾ AI ಧ್ವನಿ', hi: 'त्रिभाषी एआई आवाज' },
  feat1Desc: { en: 'Instant natural voice playback in English, Kannada (ಕನ್ನಡ), and Hindi (हिंदी).', kn: 'ಇಂಗ್ಲಿಷ್, ಕನ್ನಡ ಮತ್ತು ಹಿಂದಿಯಲ್ಲಿ ತತ್ಕ್ಷಣದ ನೈಸರ್ಗಿಕ ಧ್ವನಿ ಪುನರಾವರ್ತನೆ.', hi: 'अंग्रेजी, कन्नड़ (ಕನ್ನಡ) और हिंदी (हिंदी) में तत्काल प्राकृतिक आवाज प्लेबैक।' },
  feat2Title: { en: 'Smart Document Inspector', kn: 'ಸ್ಮಾರ್ಟ್ ದಾಖಲೆ ಪರಿಶೀಲಕ', hi: 'स्मार्ट दस्तावेज़ निरीक्षक' },
  feat2Desc: { en: 'OCR scanning and instant plain-language explanation of complex legal forms.', kn: 'ಸಂಕೀರ್ಣ ಸರ್ಕಾರಿ ನಮೂನೆಗಳ ಒಸಿಆರ್ ಸ್ಕ್ಯಾನಿಂಗ್ ಮತ್ತು ಸರಳ ಭಾಷೆಯ ವಿವರಣೆ.', hi: 'जटिल सरकारी फॉर्मों का ओसीआर स्कैनिंग और तत्काल सरल भाषा स्पष्टीकरण।' },
  feat3Title: { en: 'Scholarship Matching', kn: 'ವಿದ್ಯಾರ್ಥಿವೇತನ ಪಂದ್ಯಗಳು', hi: 'छात्रवृत्ति मिलान' },
  feat3Desc: { en: 'AI matches citizens to eligible government schemes and auto-fills applications.', kn: 'AI ನಾಗರಿಕರನ್ನು ಅರ್ಹ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳಿಗೆ ಹೊಂದಿಸುತ್ತದೆ ಮತ್ತು ಅರ್ಜಿಗಳನ್ನು ಸ್ವಯಂ-ಭರ್ತಿ ಮಾಡುತ್ತದೆ.', hi: 'एआई नागरिकों को पात्र सरकारी योजनाओं से मिलाता है और आवेदनों को स्वतः भरता है।' },
  feat4Title: { en: 'High Contrast & Dyslexia Friendly', kn: 'ಹೆಚ್ಚಿನ ವ್ಯತಿರಿಕ್ತತೆ ಮತ್ತು ಓದುವ ಸುಲಭತೆ', hi: 'उच्च कंट्रास्ट और पढ़ने में आसानी' },
  feat4Desc: { en: 'Instant visual theme transformations, font scaling, and simplified summaries.', kn: 'ತತ್ಕ್ಷಣದ ದೃಶ್ಯ ಥೀಮ್ ರೂಪಾಂತರಗಳು, ಫಾಂಟ್ ಗ್ರೇಡಿಂಗ್ ಮತ್ತು ಸರಳೀಕೃತ ಸಾರಾಂಶಗಳು.', hi: 'तत्काल दृश्य थीम परिवर्तन, फ़ॉन्ट स्केलिंग और सरलीकृत सारांश।' },

  // Workspace Page
  workspaceTitle: { en: 'Interactive AI Accessibility Workspace', kn: 'ಇಂಟರಾಕ್ಟಿವ್ AI ಪ್ರವೇಶಸಾಧ್ಯತೆ ವರ್ಕ್‌ಸ್ಪೇಸ್', hi: 'इंटरएक्टिव एआई पहुंच क्षमता कार्यक्षेत्र' },
  workspaceSubtitle: {
    en: 'Ask questions about schemes, upload document images, or get voice assistance in your native language.',
    kn: 'ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ, ದಾಖಲೆ ಚಿತ್ರಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಧ್ವನಿ ನೆರವು ಪಡೆಯಿರಿ.',
    hi: 'योजनाओं के बारे में प्रश्न पूछें, दस्तावेज़ चित्र अपलोड करें, या अपनी मातृभाषा में आवाज सहायता प्राप्त करें।'
  },
  inputPlaceholder: {
    en: 'Ask anything about scholarships, Post-Matric Karnataka schemes, PM-Kisan, or paste application text...',
    kn: 'ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು, ಕರ್ನಾಟಕ ಪೋಸ್ಟ್-ಮೆಟ್ರಿಕ್ ಯೋಜನೆಗಳು, ಪಿಎಂ-ಕಿಸಾನ್ ಬಗ್ಗೆ ಏನನ್ನಾದರೂ ಕೇಳಿ...',
    hi: 'छात्रवृत्ति, कर्नाटक पोस्ट-मैट्रिक योजनाओं, पीएम-किसान के बारे में कुछ भी पूछें या टेक्स्ट पेस्ट करें...'
  },
  btnSend: { en: 'Ask AI', kn: 'AI ಗೆ ಕೇಳಿ', hi: 'एआई से पूछें' },
  btnClear: { en: 'Clear', kn: 'ಅಳಿಸು', hi: 'साफ़ करें' },
  sampleQueriesTitle: { en: 'Suggested Accessibility Queries', kn: 'ಸೂಚಿಸಿದ ಪ್ರವೇಶಸಾಧ್ಯತೆ ಪ್ರಶ್ನೆಗಳು', hi: 'सुझाए गए पहुंच क्षमता प्रश्न' },

  // Analyzer Page
  analyzerTitle: { en: 'Smart Document Inspector & Summarizer', kn: 'ಸ್ಮಾರ್ಟ್ ದಾಖಲೆ ಪರಿಶೀಲಕ ಮತ್ತು ಸಾರಾಂಶಕಾರ', hi: 'स्मार्ट दस्तावेज़ निरीक्षक और सारांशकर्ता' },
  analyzerSubtitle: {
    en: 'Upload or select a government application document image to extract fields, missing criteria, and plain language audio breakdown.',
    kn: 'ಕ್ಷೇತ್ರಗಳನ್ನು, ಕೊರತೆಯಿರುವ ಮಾನದಂಡಗಳನ್ನು ಮತ್ತು ಧ್ವನಿ ವಿವರಣೆಯನ್ನು ಹೊರತೆಗೆಯಲು ಸರ್ಕಾರಿ ಅರ್ಜಿ ದಾಖಲೆಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',
    hi: 'फ़ील्ड्स, गायब मानदंडों और आवाज विवरण को निकालने के लिए सरकारी आवेदन दस्तावेज़ अपलोड करें।'
  },
  dropzoneText: { en: 'Drag & Drop document image here, or click to browse', kn: 'ದಾಖಲೆ ಚಿತ್ರವನ್ನು ಇಲ್ಲಿ ಎಳೆಯಿರಿ ಮತ್ತು ಬಿಡಿ, ಅಥವಾ ಬ್ರೌಸ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ', hi: 'दस्तावेज़ छवि को यहां खींचें और छोड़ें, या ब्राउज़ करने के लिए क्लिक करें' },
  btnAnalyzeSample: { en: 'Try Sample Application', kn: 'ಮಾದರಿ ಅರ್ಜಿಯನ್ನು ಪ್ರಯತ್ನಿಸಿ', hi: 'नमूना आवेदन का प्रयास करें' },
  fieldBreakdown: { en: 'Extracted Field Breakdown', kn: 'ಹೊರತೆಗೆದ ಕ್ಷೇತ್ರ ವಿವರಣೆ', hi: 'निकाले गए फ़ील्ड विवरण' },
  plainExplanation: { en: 'Plain Language Audio Explanation', kn: 'ಸರಳ ಭಾಷೆಯ ಧ್ವನಿ ವಿವರಣೆ', hi: 'सरल भाषा में ऑडियो स्पष्टीकरण' },
  requiredDocs: { en: 'Required Supporting Documents', kn: 'ಅಗತ್ಯವಿರುವ ಬೆಂಬಲಿತ ದಾಖಲೆಗಳು', hi: 'आवश्यक सहायक दस्तावेज़' },

  // Recommendations & Forms Page
  recommendationsTitle: { en: 'Scholarship & Scheme Matching Engine', kn: 'ವಿದ್ಯಾರ್ಥಿವೇತನ ಮತ್ತು ಯೋಜನೆ ಪಂದ್ಯ ಎಂಜಿನ್', hi: 'छात्रवृत्ति एवं योजना मिलान इंजन' },
  recommendationsSubtitle: {
    en: 'Personalized government welfare scheme recommendations based on citizen criteria with automated smart form filling.',
    kn: 'ಸ್ವಯಂಚಾಲಿತ ಸ್ಮಾರ್ಟ್ ಫಾರ್ಮ್ ಭರ್ತಿಯೊಂದಿಗೆ ನಾಗರಿಕ ಮಾನದಂಡಗಳ ಆಧಾರದ ಮೇಲೆ ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಸರ್ಕಾರಿ ಕಲ್ಯಾಣ ಯೋಜನೆ ಶಿಫಾರಸುಗಳು.',
    hi: 'स्वचालित स्मार्ट फॉर्म भरने के साथ नागरिक मानदंडों के आधार पर व्यक्तिगत सरकारी कल्याण योजना की सिफारिशें।'
  },
  matchScore: { en: 'Match Score', kn: 'ಹೊಂದಾಣಿಕೆ ಅಂಕ', hi: 'मैच स्कोर' },
  btnFillForm: { en: 'Auto-Fill Application', kn: 'ಅರ್ಜಿಯನ್ನು ಸ್ವಯಂ-ಭರ್ತಿ ಮಾಡಿ', hi: 'आवेदन स्वतः भरें' },
  btnVoiceGuide: { en: 'Voice Guided Application', kn: 'ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ ಅಪ್ಲಿಕೇಶನ್', hi: 'आवाज निर्देशित आवेदन' },

  // Accessibility Page
  accessCenterTitle: { en: 'Accessibility & Customization Center', kn: 'ಪ್ರವೇಶಸಾಧ್ಯತೆ ಮತ್ತು ಗ್ರಾಹಕೀಕರಣ ಕೇಂದ್ರ', hi: 'पहुंच क्षमता और अनुकूलन केंद्र' },
  accessCenterSubtitle: {
    en: 'Customize high contrast mode, typography scaling, trilingual audio output, and simplified language.',
    kn: 'ಹೆಚ್ಚಿನ ವ್ಯತಿರಿಕ್ತ ಮೋಡ್, ಫಾಂಟ್ ಗಾತ್ರ, ತ್ರಿಭಾಷಾ ಧ್ವನಿ ಮತ್ತು ಸರಳೀಕೃತ ಭಾಷೆಯನ್ನು ಕಸ್ಟಮೈಸ್ ಮಾಡಿ.',
    hi: 'उच्च कंट्रास्ट मोड, फ़ॉन्ट आकार, त्रिभाषी ऑडियो और सरलीकृत भाषा को अनुकूलित करें।'
  },
  themeTitle: { en: 'Visual Contrast Theme', kn: 'ದೃಶ್ಯ ವ್ಯತಿರಿಕ್ತ ಥೀಮ್', hi: 'दृश्य कंट्रास्ट थीम' },
  highContrastLabel: { en: 'High Contrast Mode (Solid Dark & High Contrast Text)', kn: 'ಹೆಚ್ಚಿನ ವ್ಯತಿರಿಕ್ತ ಮೋಡ್ (ಗಾಢ ಹಿನ್ನೆಲೆ ಮತ್ತು ಹೈ ಕಾಂಟ್ರಾಸ್ಟ್)', hi: 'उच्च कंट्रास्ट मोड (डार्क बैकग्राउंड और हाई कंट्रास्ट)' },
  fontSizeTitle: { en: 'Font Scale & Typography', kn: 'ಫಾಂಟ್ ಪ್ರಮಾಣ ಮತ್ತು ಅಕ್ಷರ ಶೈಲಿ', hi: 'फ़ॉन्ट स्केल और फ़ॉन्ट शैली' },
  fontNormal: { en: 'Standard (16px)', kn: 'ಸಾಮಾನ್ಯ (16px)', hi: 'सामान्य (16px)' },
  fontLarge: { en: 'Large (18px)', kn: 'ದೊಡ್ಡದು (18px)', hi: 'बड़ा (18px)' },
  fontXLarge: { en: 'Extra Large (20px)', kn: 'ಅತಿ ದೊಡ್ಡದು (20px)', hi: 'अत्यधिक बड़ा (20px)' },
  langSelectionTitle: { en: 'Language & Voice Synthesis Settings', kn: 'ಭಾಷೆ ಮತ್ತು ಧ್ವನಿ ಸಂಶ್ಲೇಷಣೆ ಸಂಯೋಜನೆಗಳು', hi: 'भाषा और आवाज संश्लेषण सेटिंग्स' },
  btnTestVoice: { en: 'Test Voice Output', kn: 'ಧ್ವನಿ ಔಟ್‌ಪುಟ್ ಪರೀಕ್ಷಿಸಿ', hi: 'आवाज आउटपुट का परीक्षण करें' },

  // Insights Page
  insightsTitle: { en: 'Accessibility Metrics & Impact Dashboard', kn: 'ಪ್ರವೇಶಸಾಧ್ಯತೆ ಮೆಟ್ರಿಕ್ಸ್ ಮತ್ತು ಪ್ರಭಾವದ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', hi: 'पहुंच क्षमता मेट्रिक्स और प्रभाव डैशबोर्ड' },
  insightsSubtitle: {
    en: 'Real-time telemetry on citizen interactions, voice query resolution rates, and multi-language adoption.',
    kn: 'ನಾಗರಿಕರ ಸಂವಹನಗಳು, ಧ್ವನಿ ಪ್ರಶ್ನೆ ಪರಿಹಾರ ದರಗಳು ಮತ್ತು ಬಹು-ಭಾಷಾ ಬಳಕೆಯ ನೈಜ-ಸಮಯದ ಡೇಟಾ.',
    hi: 'नागरिक सहभागिता, आवाज उत्तर दर और बहु-भाषा उपयोग का वास्तविक समय डेटा।'
  },

  // Footer
  footerTitle: { en: 'ACCESS AI - Universal Accessibility Layer', kn: 'ACCESS AI - ಸಾರ್ವತ್ರಿಕ ಪ್ರವೇಶಸಾಧ್ಯತೆ ಲೇಯರ್', hi: 'ACCESS AI - सार्वभौमिक पहुंच क्षमता स्तर' },
  footerTagline: { en: 'Empowering every citizen with voice, simplified language, and adaptive digital governance.', kn: 'ಧ್ವನಿ, ಸರಳ ಭಾಷೆ ಮತ್ತು ಅಡಾಪ್ಟಿವ್ ಡಿಜಿಟಲ್ ಆಡಳಿತದೊಂದಿಗೆ ಪ್ರತಿಯೊಬ್ಬ ನಾಗರಿಕನನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುವುದು.', hi: 'आवाज, सरल भाषा और अनुकूली डिजिटल शासन के साथ प्रत्येक नागरिक को सशक्त बनाना।' },
  copyrightNotice: { en: '© 2026 ACCESS AI. All rights reserved.', kn: '© 2026 ACCESS AI. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.', hi: '© 2026 ACCESS AI. सर्वाधिकार सुरक्षित।' }
};

export function getTranslation(key: string, lang: SupportedLanguage = 'en'): string {
  const item = translations[key];
  if (!item) return key;
  return item[lang] || item.en || key;
}
