export interface AnalysisData {
  overallHealth: string;
  healthScore: number;
  ageAppropriate: boolean;
  pros: string[];
  cons: string[];
  ingredients: string;
  recommendations: string[];
  momAdvice: string;
  momVerdict: 'take_it' | 'avoid_it' | 'think_twice';
}

export interface AnalysisRequest {
  image: string;
  age: number;
}

export interface AnalysisError {
  error: string;
}

export interface ProductHistoryEntry {
  id: string;
  analyzedAt: string;
  age: number;
  analysis: AnalysisData;
}
