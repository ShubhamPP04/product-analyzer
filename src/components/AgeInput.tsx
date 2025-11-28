'use client';

import { useEffect, useState } from 'react';
import { User, X, ArrowRight } from 'lucide-react';

import GoalsProfile from './GoalsProfile';
import type { NutritionGoal } from '@/types/analysis';

interface AgeInputProps {
  onSubmit: (age: number, goals: NutritionGoal[]) => void;
  initialAge?: number | null;
  initialGoals?: NutritionGoal[];
  onCancel?: () => void;
}

export default function AgeInput({ onSubmit, initialAge = null, initialGoals = [], onCancel }: AgeInputProps) {
  const [age, setAge] = useState('');
  const [goals, setGoals] = useState<NutritionGoal[]>(initialGoals);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialAge) {
      setAge(String(initialAge));
    }
  }, [initialAge]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ageNum = parseInt(age);

    if (!age || isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      setError('Please enter a valid age between 1 and 120');
      return;
    }

    setError('');
    onSubmit(ageNum, goals);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-12 max-w-2xl mx-auto animate-fade-in-up">
      {onCancel && (
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
          type="button"
        >
          <X className="w-6 h-6" />
        </button>
      )}

      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex justify-center items-center h-16 w-16 sm:h-20 sm:w-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-600 shadow-lg shadow-emerald-200/50 mb-4 sm:mb-6">
          <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 sm:mb-3">
          {initialAge ? 'Update Your Age' : 'Tell us about yourself'}
        </h2>
        <p className="text-base sm:text-lg text-slate-600">
          {initialAge
            ? 'Adjust your age to keep recommendations accurate.'
            : 'We use your age to provide personalized health insights tailored to your life stage.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        <div>
          <label htmlFor="age" className="block text-sm font-bold uppercase tracking-wide text-slate-500 mb-2 sm:mb-3 ml-1">
            Your Age
          </label>
          <div className="relative">
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-6 py-4 sm:py-5 text-2xl sm:text-3xl font-bold text-slate-900 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-slate-300"
              placeholder="e.g. 25"
              min="1"
              max="120"
              autoFocus
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-base sm:text-lg pointer-events-none">
              years
            </div>
          </div>
          {error && (
            <p className="mt-3 text-rose-600 text-sm font-medium flex items-center gap-2 animate-fade-in-up">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose-600" />
              {error}
            </p>
          )}
        </div>

        <GoalsProfile goals={goals} onChange={setGoals} />

        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
          <button
            type="submit"
            className="w-full group flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-orange-400 hover:from-cyan-600 hover:to-orange-500 text-white text-lg font-bold py-3 sm:py-4 px-6 rounded-2xl font-orbitron tracking-wide transition-all duration-300 shadow-lg shadow-cyan-300/50 hover:shadow-xl hover:shadow-orange-400/50 hover:-translate-y-0.5 active:scale-95"
          >
            {initialAge ? 'Save Profile' : 'Continue'}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full border-2 border-slate-600/50 text-slate-400 hover:text-slate-200 hover:border-cyan-400/50 hover:bg-slate-900/50 backdrop-blur-sm text-lg font-bold py-3 sm:py-4 px-6 rounded-2xl font-exo transition-all duration-200 active:scale-95"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-400">
        <span className="h-3 w-3 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </span>
        Your data is stored locally on your device
      </div>
    </div>
  );
}
