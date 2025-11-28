'use client';

import { useEffect, useRef, useState } from 'react';
import AgeInput from './AgeInput';
import CameraCapture from './CameraCapture';
import AnalysisResult from './AnalysisResult';
import { AnalysisData, ProductHistoryEntry, NutritionGoal } from '../types/analysis';

type Step = 'age' | 'camera' | 'result';

const AGE_STORAGE_KEY = 'product-analyzer-age';
const GOALS_STORAGE_KEY = 'product-analyzer-goals';
const HISTORY_STORAGE_KEY = 'product-analyzer-history';

const createHistoryEntry = (age: number, goals: NutritionGoal[], analysis: AnalysisData): ProductHistoryEntry => ({
  id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
  analyzedAt: new Date().toISOString(),
  age,
  goals,
  analysis,
});

const loadNumber = (value: string | null) => {
  if (!value) return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? null : parsed;
};

export default function ProductAnalyzer() {
  const [step, setStep] = useState<Step>('age');
  const [age, setAge] = useState<number | null>(null);
  const [goals, setGoals] = useState<NutritionGoal[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [editingAge, setEditingAge] = useState(false);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedAge = loadNumber(localStorage.getItem(AGE_STORAGE_KEY));
    const storedGoals = localStorage.getItem(GOALS_STORAGE_KEY);
    if (storedAge) {
      setAge(storedAge);
      if (storedGoals) {
        setGoals(JSON.parse(storedGoals) as NutritionGoal[]);
      }
      setStep('camera');
    }
  }, []);

  useEffect(() => {
    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, []);

  const startProgress = () => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
    }
    setProgress(8);
    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        const next = prev + Math.random() * 9 + 1;
        return Math.min(next, 95);
      });
    }, 350);
  };

  const finishProgress = () => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    setProgress(100);
    setTimeout(() => {
      setProgress(0);
    }, 400);
  };

  const persistHistory = (entries: ProductHistoryEntry[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(entries));
  };

  const persistGoals = (value: NutritionGoal[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(value));
  };

  const persistAge = (value: number) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(AGE_STORAGE_KEY, String(value));
  };

  const handleAgeSubmit = (userAge: number, userGoals: NutritionGoal[]) => {
    setAge(userAge);
    setGoals(userGoals);
    persistAge(userAge);
    persistGoals(userGoals);
    setEditingAge(false);
    setAnalysis(null);
    setStep('camera');
  };

  const handleImageCapture = async (imageData: string) => {
    if (!age) {
      alert('Please set your age before analyzing a product.');
      setStep('age');
      return;
    }

    setLoading(true);
    startProgress();

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imageData,
          age,
          goals,
        }),
      });

      if (!response.ok) {
        throw new Error(`Analysis failed with status ${response.status}`);
      }

      const data = (await response.json()) as AnalysisData;
      setAnalysis(data);
      setStep('result');

      const entry = createHistoryEntry(age, goals, data);
      if (typeof window !== 'undefined') {
        const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
        const history = storedHistory ? JSON.parse(storedHistory) : [];
        const updated = [entry, ...history].slice(0, 12);
        persistHistory(updated);
      }
    } catch (error) {
      console.error('Error analyzing product:', error);
      alert('Failed to analyze product. Please try again in a moment.');
    } finally {
      finishProgress();
      setLoading(false);
    }
  };

  const handleAnalyzeAnother = () => {
    setAnalysis(null);
    setStep('camera');
  };

  const handleEditAge = () => {
    setEditingAge(true);
    setStep('age');
  };

  const handleCancelAgeEdit = () => {
    setEditingAge(false);
    if (analysis) {
      setStep('result');
    } else if (age) {
      setStep('camera');
    } else {
      setStep('age');
    }
  };

  return (
    <div className="w-full">
      {step === 'age' && (
        <AgeInput
          onSubmit={handleAgeSubmit}
          initialAge={age}
          initialGoals={goals}
          onCancel={editingAge ? handleCancelAgeEdit : undefined}
        />
      )}

      {step === 'camera' && (
        <CameraCapture
          onCapture={handleImageCapture}
          loading={loading}
          progress={progress}
          onBack={() => {
            setEditingAge(true);
            setStep('age');
          }}
        />
      )}

      {step === 'result' && analysis && age !== null && (
        <AnalysisResult
          analysis={analysis}
          age={age}
          goals={goals}
          onAnalyzeAnother={handleAnalyzeAnother}
          onEditAge={handleEditAge}
        />
      )}
    </div>
  );
}
