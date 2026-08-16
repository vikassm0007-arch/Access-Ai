export type SupportedLanguage = 'en' | 'kn' | 'hi';
export type FontSizeScale = 'normal' | 'large' | 'xlarge';

export interface DocumentAnalysisResult {
  documentType: string;
  category: string;
  issuingAuthority: string;
  summary: string;
  plainLanguageExplanation: Record<SupportedLanguage, string>;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedMinutes: number;
  extractedFields: {
    key: string;
    label: string;
    value: string;
    confidence: number;
    status: 'verified' | 'flagged' | 'missing';
  }[];
  missingFields: string[];
  requiredDocuments: string[];
  importantDates: {
    event: string;
    date: string;
    urgency: 'high' | 'medium' | 'low';
  }[];
  confidenceScore: number;
}

export interface RecommendationMatch {
  id: string;
  title: string;
  category: string;
  matchPercentage: number;
  description: string;
  eligibilityCriteria: string[];
  benefitAmount?: string;
  deadline?: string;
  requiredDocs: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
  formSchema: {
    steps: {
      stepNumber: number;
      stepTitle: string;
      fields: {
        id: string;
        label: string;
        type: 'text' | 'number' | 'select' | 'file' | 'date';
        placeholder?: string;
        options?: string[];
        required: boolean;
        helpText?: string;
      }[];
    }[];
  };
}

export interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: FontSizeScale;
  language: SupportedLanguage;
  simplifiedLanguage: boolean;
  speechRate: number;
  speechPitch: number;
}
