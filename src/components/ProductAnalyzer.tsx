'use client';

import { useEffect, useRef, useState } from 'react';
import AgeInput from './AgeInput';
import CameraCapture from './CameraCapture';
import AnalysisResult from './AnalysisResult';
import ProductHistory from './ProductHistory';
import { AnalysisData, ProductHistoryEntry } from '../types/analysis';

type Step = 'age' | 'camera' | 'result';

const AGE_STORAGE_KEY = 'product-analyzer-age';
const HISTORY_STORAGE_KEY = 'product-analyzer-history';

const createHistoryEntry = (age: number, analysis: AnalysisData): ProductHistoryEntry => ({
  id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
  analyzedAt: new Date().toISOString(),
  age,
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
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [history, setHistory] = useState<ProductHistoryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [editingAge, setEditingAge] = useState(false);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedAge = loadNumber(localStorage.getItem(AGE_STORAGE_KEY));
    if (storedAge) {
      setAge(storedAge);
      setStep('camera');
    }

    const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory) as ProductHistoryEntry[];
        setHistory(parsedHistory);
      } catch (error) {
        console.warn('Failed to parse history from storage', error);
      }
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

  const persistAge = (value: number) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(AGE_STORAGE_KEY, String(value));
  };

  const handleAgeSubmit = (userAge: number) => {
    setAge(userAge);
    persistAge(userAge);
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
        }),
      });

      if (!response.ok) {
        throw new Error(`Analysis failed with status ${response.status}`);
      }

      const data = (await response.json()) as AnalysisData;
      setAnalysis(data);
      setStep('result');

      const entry = createHistoryEntry(age, data);
      setHistory((prev) => {
        const updated = [entry, ...prev].slice(0, 12);
        persistHistory(updated);
        return updated;
      });
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

  const handleSelectHistory = (entry: ProductHistoryEntry) => {
    setAnalysis(entry.analysis);
    setAge(entry.age);
    persistAge(entry.age);
    setStep('result');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {step === 'age' && (
        <AgeInput
          onSubmit={handleAgeSubmit}
          initialAge={age}
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
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <AnalysisResult
            analysis={analysis}
            age={age}
            onAnalyzeAnother={handleAnalyzeAnother}
            onEditAge={handleEditAge}
          />
          <ProductHistory history={history} onSelect={handleSelectHistory} />
        </div>
      )}

      {step !== 'result' && history.length > 0 && (
        <div className="mt-4">
          <ProductHistory history={history} onSelect={handleSelectHistory} compact />
        </div>
      )}
    </div>
  );
}
