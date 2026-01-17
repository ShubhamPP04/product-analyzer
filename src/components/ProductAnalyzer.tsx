'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import AgeInput from './AgeInput';
import CameraCapture from './CameraCapture';
import AnalysisResult from './AnalysisResult';
import { AnalysisData, ProductHistoryEntry } from '../types/analysis';
import DietarySettings, { DietaryPreference } from './DietarySettings';

type Step = 'age' | 'camera' | 'result';

const AGE_STORAGE_KEY = 'product-analyzer-age';
const HISTORY_STORAGE_KEY = 'product-analyzer-history';
const PREFS_STORAGE_KEY = 'product-analyzer-dietary-prefs';
const STATS_STORAGE_KEY = 'product-analyzer-stats';

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
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [editingAge, setEditingAge] = useState(false);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedAge = loadNumber(localStorage.getItem(AGE_STORAGE_KEY));
    if (storedAge) {
      setAge(storedAge);
      setStep('camera');
    }

    const storedPrefs = localStorage.getItem(PREFS_STORAGE_KEY);
    if (storedPrefs) {
      try {
        setDietaryPreferences(JSON.parse(storedPrefs));
      } catch (e) {
        console.error('Failed to parse dietary preferences', e);
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

  const startProgress = useCallback(() => {
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
  }, []);

  const finishProgress = useCallback(() => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    setProgress(100);
    setTimeout(() => {
      setProgress(0);
    }, 400);
  }, []);

  const persistHistory = useCallback((entries: ProductHistoryEntry[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(entries));
  }, []);

  const persistAge = useCallback((value: number) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(AGE_STORAGE_KEY, String(value));
  }, []);

  const handleAgeSubmit = useCallback((userAge: number) => {
    setAge(userAge);
    persistAge(userAge);
    setEditingAge(false);
    setAnalysis(null);
    setStep('camera');
  }, [persistAge]);

  const handleSavePreferences = useCallback((prefs: string[]) => {
    setDietaryPreferences(prefs);
    if (typeof window !== 'undefined') {
      localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(prefs));
    }
  }, []);

  const handleImageCapture = useCallback(async (captureData: string) => {
    if (!age) {
      alert('Please set your age before analyzing a product.');
      setStep('age');
      return;
    }

    setLoading(true);
    startProgress();

    try {
      const isText = captureData.startsWith('TEXT:');
      const payload = {
        age,
        dietaryPreferences,
        [isText ? 'text' : 'image']: isText ? captureData.substring(5) : captureData,
      };

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Analysis failed with status ${response.status}`);
      }

      const data = (await response.json()) as AnalysisData;
      setAnalysis(data);
      setStep('result');

      const entry = createHistoryEntry(age, data);
      if (typeof window !== 'undefined') {
        const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
        const history = storedHistory ? JSON.parse(storedHistory) : [];
        const updated = [entry, ...history].slice(0, 12);
        persistHistory(updated);

        // Update User Stats for Gamification
        const storedStats = localStorage.getItem(STATS_STORAGE_KEY);
        const stats = storedStats ? JSON.parse(storedStats) : { scanCount: 0, healthyCount: 0, ingredientClicks: 0 };
        stats.scanCount += 1;
        if (data.momVerdict === 'take_it') {
          stats.healthyCount += 1;
        }
        localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
      }
    } catch (error) {
      console.error('Error analyzing product:', error);
      alert('Failed to analyze product. Please try again in a moment.');
    } finally {
      finishProgress();
      setLoading(false);
    }
  }, [age, dietaryPreferences, startProgress, finishProgress, persistHistory]);

  const handleAnalyzeAnother = useCallback(() => {
    setAnalysis(null);
    setStep('camera');
  }, []);

  const handleEditAge = useCallback(() => {
    setEditingAge(true);
    setStep('age');
  }, []);

  const handleCancelAgeEdit = useCallback(() => {
    setEditingAge(false);
    if (analysis) {
      setStep('result');
    } else if (age) {
      setStep('camera');
    } else {
      setStep('age');
    }
  }, [analysis, age]);

  const openSettings = useCallback(() => {
    setIsSettingsOpen(true);
  }, []);

  const closeSettings = useCallback(() => {
    setIsSettingsOpen(false);
  }, []);

  const handleBack = useCallback(() => {
    setEditingAge(true);
    setStep('age');
  }, []);

  return (
    <div className="w-full">
      {/* Settings Button (Visible in Camera Step) */}
      {step === 'camera' && !loading && (
        <div className="absolute top-4 left-4 z-20">
          <button
            onClick={openSettings}
            className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/30 transition-all"
            title="Dietary Preferences"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings-2"><path d="M20 7h-9" /><path d="M14 17H5" /><circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" /></svg>
          </button>
        </div>
      )}

      <DietarySettings
        isOpen={isSettingsOpen}
        onClose={closeSettings}
        preferences={dietaryPreferences as DietaryPreference[]}
        onSave={handleSavePreferences}
      />

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
          onBack={handleBack}
        />
      )}

      {step === 'result' && analysis && age !== null && (
        <AnalysisResult
          analysis={analysis}
          age={age}
          onAnalyzeAnother={handleAnalyzeAnother}
          onEditAge={handleEditAge}
        />
      )}
    </div>
  );
}
