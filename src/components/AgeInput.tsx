'use client';

import { useEffect, useState } from 'react';
import { User, X } from 'lucide-react';

interface AgeInputProps {
  onSubmit: (age: number) => void;
  initialAge?: number | null;
  onCancel?: () => void;
}

export default function AgeInput({ onSubmit, initialAge = null, onCancel }: AgeInputProps) {
  const [age, setAge] = useState('');
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
    onSubmit(ageNum);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 border-2 border-green-100">
      {onCancel && (
        <button
          onClick={onCancel}
          className="ml-auto mb-4 flex items-center gap-2 text-base text-gray-500 hover:text-gray-700 transition"
          type="button"
        >
          <X className="w-5 h-5" />
          Cancel
        </button>
      )}
      <div className="flex justify-center mb-8">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-3xl shadow-xl">
          <User className="w-16 h-16 text-white" />
        </div>
      </div>
      
      <h2 className="text-3xl sm:text-4xl font-bold text-green-800 text-center mb-4">
        {initialAge ? 'Update Your Age' : 'Welcome! Let&apos;s Get Started'}
      </h2>
      <p className="text-xl text-gray-600 text-center mb-10 leading-relaxed">
        {initialAge
          ? 'Adjust your age to keep recommendations accurate.'
          : 'Please enter your age to get personalized health insights.'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="age" className="block text-2xl font-semibold text-gray-700 mb-3">
            Your Age
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-6 py-5 text-2xl border-2 border-green-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/50 focus:border-green-500 transition"
            placeholder="Enter your age"
            min="1"
            max="120"
          />
          {error && (
            <p className="mt-3 text-red-600 text-lg">{error}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xl font-bold py-5 px-6 rounded-2xl transition duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            {initialAge ? 'Save Age' : 'Continue to Camera'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full border-2 border-green-200 text-green-700 text-xl font-bold py-5 px-6 rounded-2xl hover:bg-green-50 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-10 p-6 bg-green-50 rounded-2xl border border-green-200">
        <p className="text-lg text-green-800 text-center font-medium">
          🔒 Your information is private and secure
        </p>
      </div>
    </div>
  );
}
