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
  goals?: string[];
}

export type NutritionGoal = 'low-sugar' | 'high-protein' | 'vegan' | 'nut-free' | 'dairy-free' | 'low-salt' | 'low-fat' | 'gluten-free';

export interface AnalysisError {
  error: string;
}

export interface ProductHistoryEntry {
  id: string;
  analyzedAt: string;
  age: number;
  goals: NutritionGoal[];
  analysis: AnalysisData;
}
