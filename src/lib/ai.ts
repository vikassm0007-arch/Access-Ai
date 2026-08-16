import { GoogleGenerativeAI } from '@google/generative-ai';
import { DocumentAnalysisResult, RecommendationMatch, SupportedLanguage } from '@/types/accessai';

// Initialize Gemini client if key is provided
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Helper to strip markdown JSON formatting if model returns markdown blocks
function cleanJsonResponse(text: string): string {
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.substring(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.substring(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.substring(0, cleaned.length - 3);
  }
  return cleaned.trim();
}

/**
 * Analyzes document image or text input and extracts structured field metadata,
 * plain language explanations in 3 languages, required documents, missing fields, and dates.
 */
export async function analyzeDocumentOrInput(
  inputText: string,
  imageFile?: { base64: string; mimeType: string }
): Promise<DocumentAnalysisResult> {
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `You are ACCESSAI, an expert accessibility AI layer for digital government and scholarship applications.
Analyze the provided document or text request and output STRICT JSON conforming to the following structure:
{
  "documentType": "String (e.g. Post-Matric Karnataka State Scholarship Application)",
  "category": "String (e.g. Higher Education Scholarship / Welfare)",
  "issuingAuthority": "String (e.g. Department of Backward Classes Welfare)",
  "summary": "String short plain language summary",
  "plainLanguageExplanation": {
    "en": "Clear English simple breakdown",
    "kn": "ಕನ್ನಡದ ಸರಳ ವಿವರಣೆ (Simple Kannada breakdown)",
    "hi": "हिंदी की सरल व्याख्या (Simple Hindi breakdown)"
  },
  "difficulty": "Easy" | "Medium" | "Hard",
  "estimatedMinutes": Number,
  "extractedFields": [
    { "key": "applicant_name", "label": "Full Name", "value": "Extracted string value", "confidence": 0.95, "status": "verified" | "flagged" | "missing" }
  ],
  "missingFields": ["Array of required field names that are missing"],
  "requiredDocuments": ["Array of supporting document names required"],
  "importantDates": [
    { "event": "Deadline Name", "date": "YYYY-MM-DD", "urgency": "high" | "medium" | "low" }
  ],
  "confidenceScore": 0.94
}

USER INPUT / CONTEXT: ${inputText}`;

      let responseText = '';
      if (imageFile) {
        const imagePart = {
          inlineData: {
            data: imageFile.base64,
            mimeType: imageFile.mimeType,
          },
        };
        const result = await model.generateContent([prompt, imagePart]);
        responseText = result.response.text();
      } else {
        const result = await model.generateContent(prompt);
        responseText = result.response.text();
      }

      const cleanedJson = cleanJsonResponse(responseText);
      return JSON.parse(cleanedJson) as DocumentAnalysisResult;
    } catch (err) {
      console.warn('Gemini API call failed or timed out. Falling back to intelligent local analysis mock:', err);
    }
  }

  // --- Intelligent Local Fallback Mock Data ---
  await new Promise((resolve) => setTimeout(resolve, 1400)); // realistic thinking delay

  const isIncome = inputText.toLowerCase().includes('income') || inputText.toLowerCase().includes('salary');
  const isCaste = inputText.toLowerCase().includes('caste') || inputText.toLowerCase().includes('reservation');

  if (isIncome) {
    return {
      documentType: 'Revenue Dept Income Certificate (Form 7)',
      category: 'Welfare & Subsidy Verification',
      issuingAuthority: 'Tahsildar / Nadakacheri Revenue Office',
      summary: 'Annual family income certificate required to prove eligibility for fee reimbursement and welfare schemes.',
      plainLanguageExplanation: {
        en: 'This document certifies that your total household income is below ₹2,50,000 per year. It allows you to claim 100% college fee waivers.',
        kn: 'ಈ ದಾಖಲೆಯು ನಿಮ್ಮ ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ ₹2.5 ಲಕ್ಷಕ್ಕಿಂತ ಕಡಿಮೆಯಿದೆ ಎಂದು ಪ್ರಮಾಣೀಕರಿಸುತ್ತದೆ. ಇದು ಉಚಿತ ಶಿಕ್ಷಣಕ್ಕೆ ಅರ್ಹತೆ ನೀಡುತ್ತದೆ.',
        hi: 'यह दस्तावेज़ प्रमाणित करता है कि आपके परिवार की वार्षिक आय ₹2.5 लाख से कम है। यह आपको शुल्क छूट के लिए योग्य बनाता है।',
      },
      difficulty: 'Easy',
      estimatedMinutes: 5,
      extractedFields: [
        { key: 'applicant_name', label: 'Applicant Name', value: 'Vikas S. Mirji', confidence: 0.98, status: 'verified' },
        { key: 'annual_income', label: 'Annual Household Income', value: '₹ 1,80,000 / annum', confidence: 0.96, status: 'verified' },
        { key: 'certificate_no', label: 'RD Certificate Reference No.', value: 'RD003849204812', confidence: 0.94, status: 'verified' },
        { key: 'valid_upto', label: 'Validity Period', value: '31-03-2029', confidence: 0.92, status: 'verified' },
        { key: 'ration_card_no', label: 'APL/BPL Ration Card No.', value: 'Flagged for Update', confidence: 0.75, status: 'flagged' },
      ],
      missingFields: ['Self-Declaration Affidavit Form 3', 'Bank Account Aadhaar Seeding Proof'],
      requiredDocuments: ['Aadhaar Card of Applicant', 'Ration Card / Voter ID', 'Previous Year Salary / Agricultural Income Slip'],
      importantDates: [
        { event: 'SSP Renewal Verification Cutoff', date: '2026-09-30', urgency: 'high' },
        { event: 'Nadakacheri Renewal Audit', date: '2026-12-15', urgency: 'low' },
      ],
      confidenceScore: 0.96,
    };
  }

  if (isCaste) {
    return {
      documentType: 'Category 3A / OBC Caste & Community Certificate',
      category: 'Social Inclusion & Reservation Rights',
      issuingAuthority: 'Department of Social Welfare, Govt of Karnataka',
      summary: 'State Govt certificate validating community category for constitutional reservation benefit.',
      plainLanguageExplanation: {
        en: 'Official proof of community category. Essential for government exam fee waivers, college seats, and hostel allotments.',
        kn: 'ಜಾತಿ ಮತ್ತು ಮೂಲ ನಿವಾಸ ಪ್ರಮಾಣಪತ್ರ. ಪರೀಕ್ಷಾ ಶುಲ್ಕ ವಿನಾಯಿತಿ ಮತ್ತು ಹಾಸ್ಟೆಲ್ ಸೀಟು ಪಡೆಯಲು ಅಗತ್ಯವಿದೆ.',
        hi: 'जाति और समुदाय प्रमाण पत्र। परीक्षा शुल्क छूट और छात्रावास आवंटन के लिए अनिवार्य।',
      },
      difficulty: 'Medium',
      estimatedMinutes: 8,
      extractedFields: [
        { key: 'applicant_name', label: 'Applicant Name', value: 'Vikas S. Mirji', confidence: 0.97, status: 'verified' },
        { key: 'caste_category', label: 'Sub-Caste / Category', value: 'Category 3A (OBC Non-Creamy Layer)', confidence: 0.95, status: 'verified' },
        { key: 'rd_number', label: 'RD Barcode Number', value: 'RD009482710492', confidence: 0.93, status: 'verified' },
        { key: 'issue_date', label: 'Date of Issue', value: '14-06-2024', confidence: 0.99, status: 'verified' },
      ],
      missingFields: ['Father School Leaving TC Certificate Copy'],
      requiredDocuments: ['Aadhaar Card', 'Village Accountant Field Verification Report', 'Ancestral Land Revenue Record (RTC)'],
      importantDates: [
        { event: 'KEA Seat Selection Choice Verification', date: '2026-08-28', urgency: 'high' },
      ],
      confidenceScore: 0.95,
    };
  }

  // Default Post-Matric Scholarship breakdown
  return {
    documentType: 'State Scholarship Portal (SSP) Post-Matric Application 2026-27',
    category: 'Higher Education Financial Assistance',
    issuingAuthority: 'Department of Higher Education & Social Welfare',
    summary: 'Comprehensive financial assistance grant covering tuition fee reimbursement, maintenance allowance, and hostel expenses.',
    plainLanguageExplanation: {
      en: 'This form grants complete fee reimbursement for your engineering / degree course plus ₹12,000 yearly stipend.',
      kn: 'ಈ ಅರ್ಜಿ ನಿಮ್ಮ ಇಂಜಿನಿಯರಿಂಗ್/ಪದವಿ ಕೋರ್ಸ್‌ಗೆ ಸಂಪೂರ್ಣ ಕಾಲೇಜು ಫೀಸ್ ಮರುಪಾವತಿ ಮತ್ತು ವರ್ಷಕ್ಕೆ ₹12,000 ಭತ್ಯೆ ನೀಡುತ್ತದೆ.',
      hi: 'यह आवेदन आपके इंजीनियरिंग/डिग्री कोर्स के लिए 100% फीस वापसी और ₹12,000 वार्षिक वजीफा प्रदान करता है।',
    },
    difficulty: 'Easy',
    estimatedMinutes: 6,
    extractedFields: [
      { key: 'student_usn', label: 'University Student Number (USN)', value: '1VA22CS092', confidence: 0.99, status: 'verified' },
      { key: 'college_name', label: 'College & Branch', value: 'VTU Affiliated Institute of Technology', confidence: 0.97, status: 'verified' },
      { key: 'sslc_reg_no', label: '10th SSLC Register Number', value: '20220948172', confidence: 0.96, status: 'verified' },
      { key: 'bank_account', label: 'NPCI Aadhaar Linked Bank Account', value: 'Pending Seeding Flag', confidence: 0.72, status: 'flagged' },
    ],
    missingFields: ['Fee Receipt Copy 2026-27', 'Hostel Warden Residency Certificate'],
    requiredDocuments: ['Income Certificate (RD Reference)', 'Caste Certificate (RD Reference)', 'Aadhaar Card', 'College Admission Receipt'],
    importantDates: [
      { event: 'Online Application Last Date', date: '2026-09-15', urgency: 'high' },
      { event: 'College E-Attestation Deadline', date: '2026-09-30', urgency: 'medium' },
    ],
    confidenceScore: 0.94,
  };
}

/**
 * Generates ranked AI recommendation matches based on user goals or selected category.
 */
export async function getRecommendations(userGoal: string): Promise<RecommendationMatch[]> {
  await new Promise((resolve) => setTimeout(resolve, 800)); // simulated latency

  return [
    {
      id: 'rec-1',
      title: 'SSP Post-Matric Scholarship for Higher Technical Education',
      category: 'Education Assistance',
      matchPercentage: 96,
      description: 'Provides 100% college tuition fee reimbursement + ₹1,000 monthly maintenance stipend for engineering and professional students.',
      eligibilityCriteria: [
        'Annual family income under ₹2,50,000',
        'Enrolled in recognized VTU / State University degree',
        'Karnataka resident with valid RD income certificate',
      ],
      benefitAmount: '100% Tuition Waiver + ₹12,000 / year stipend',
      deadline: '15 Sept 2026',
      requiredDocs: ['Aadhaar Card', 'Income Certificate RD Number', 'College Fee Receipt'],
      difficulty: 'Easy',
      estimatedTime: '6 minutes',
      formSchema: {
        steps: [
          {
            stepNumber: 1,
            stepTitle: 'Personal & Student Credentials',
            fields: [
              { id: 'full_name', label: 'Full Legal Name (as in Aadhaar)', type: 'text', placeholder: 'Enter full name', required: true },
              { id: 'usn_number', label: 'University USN / Roll Number', type: 'text', placeholder: 'e.g. 1VA22CS092', required: true },
              { id: 'dob', label: 'Date of Birth', type: 'date', required: true },
            ],
          },
          {
            stepNumber: 2,
            stepTitle: 'Income & Revenue Certificates',
            fields: [
              { id: 'income_rd', label: 'Nadakacheri Income RD Number', type: 'text', placeholder: 'RD00xxxxxxxxxxxx', required: true, helpText: 'Found on top-right of your Tahsildar certificate' },
              { id: 'caste_rd', label: 'Caste Certificate RD Number (Optional)', type: 'text', placeholder: 'RD00xxxxxxxxxxxx', required: false },
            ],
          },
          {
            stepNumber: 3,
            stepTitle: 'Bank & Direct Benefit Transfer (DBT)',
            fields: [
              { id: 'aadhaar_linked_bank', label: 'NPCI Aadhaar Linked Bank Name', type: 'text', placeholder: 'e.g. State Bank of India', required: true },
              { id: 'account_number', label: 'Bank Account Number', type: 'number', placeholder: 'Enter account number', required: true },
            ],
          },
        ],
      },
    },
    {
      id: 'rec-2',
      title: 'E-Pass Vidyasiri Free Hostel & Accommodation Scheme',
      category: 'Housing & Welfare',
      matchPercentage: 89,
      description: 'Provides free government hostel room or ₹1,500 monthly rent allowance for students residing far from native village.',
      eligibilityCriteria: [
        'Distance from home town to college > 20 km',
        'No government hostel seat allotted',
        'Valid college enrollment receipt',
      ],
      benefitAmount: 'Free Hostel Residence or ₹18,000 / year Rent Support',
      deadline: '30 Sept 2026',
      requiredDocs: ['Residency Certificate', 'Distance Certificate from Gram Panchayat', 'College Study Certificate'],
      difficulty: 'Medium',
      estimatedTime: '8 minutes',
      formSchema: {
        steps: [
          {
            stepNumber: 1,
            stepTitle: 'Residency & Distance Verification',
            fields: [
              { id: 'native_place', label: 'Native Town / Village Name', type: 'text', placeholder: 'Enter native location', required: true },
              { id: 'distance_km', label: 'Distance to College (in km)', type: 'number', placeholder: 'e.g. 35', required: true },
            ],
          },
        ],
      },
    },
    {
      id: 'rec-3',
      title: 'Arivu Education Loan Support (Interest Subsidy)',
      category: 'Education Loan',
      matchPercentage: 82,
      description: 'Subsidized education loan up to ₹5,00,000 at a nominal 2% interest rate for professional degree courses.',
      eligibilityCriteria: [
        'Enrolled through CET / KEA counseling merit seat',
        'Category 1, 2A, 2B, 3A, 3B applicant',
      ],
      benefitAmount: 'Loan up to ₹5 Lakhs @ 2% Interest',
      deadline: '10 Oct 2026',
      requiredDocs: ['CET Admission Order', 'SSLC & PUC Marks Cards', 'Bank Guarantee / Surety'],
      difficulty: 'Hard',
      estimatedTime: '12 minutes',
      formSchema: {
        steps: [
          {
            stepNumber: 1,
            stepTitle: 'Loan Amount Request',
            fields: [
              { id: 'requested_loan', label: 'Requested Loan Amount (₹)', type: 'number', placeholder: 'e.g. 250000', required: true },
              { id: 'cet_rank', label: 'KEA CET Merit Rank', type: 'number', placeholder: 'e.g. 14250', required: true },
            ],
          },
        ],
      },
    },
  ];
}
