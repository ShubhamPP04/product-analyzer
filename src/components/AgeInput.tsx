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
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-green-100">
      {onCancel && (
        <button
          onClick={onCancel}
          className="ml-auto mb-2 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition"
          type="button"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      )}
      <div className="flex justify-center mb-6">
        <div className="bg-green-100 p-4 rounded-full">
          <User className="w-12 h-12 text-green-600" />
        </div>
      </div>
      
      <h2 className="text-2xl sm:text-3xl font-bold text-green-800 text-center mb-3">
        {initialAge ? 'Update Your Age' : 'Welcome! Let’s Get Started'}
      </h2>
      <p className="text-gray-600 text-center mb-8">
        {initialAge
          ? 'Adjust your age to keep recommendations accurate.'
          : 'Please enter your age to get personalized health insights.'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="age" className="block text-lg font-medium text-gray-700 mb-2">
            Your Age
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-3 text-lg border-2 border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            placeholder="Enter your age"
            min="1"
            max="120"
          />
          {error && (
            <p className="mt-2 text-red-600 text-sm">{error}</p>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            {initialAge ? 'Save Age' : 'Continue to Camera'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full border border-green-200 text-green-700 font-semibold py-3 px-6 rounded-lg hover:bg-green-50 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-8 p-4 bg-green-50 rounded-lg">
        <p className="text-sm text-green-800 text-center">
          🔒 Your information is private and secure
        </p>
      </div>
    </div>
  );
}
