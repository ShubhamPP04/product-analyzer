'use client';

import { CheckCircle, XCircle, AlertCircle, RefreshCw, Pencil, Heart, Ban, AlertTriangle } from 'lucide-react';
import type { AnalysisData } from '../types/analysis';

interface AnalysisResultProps {
  analysis: AnalysisData;
  age: number;
  onAnalyzeAnother: () => void;
  onEditAge: () => void;
}

export default function AnalysisResult({ analysis, age, onAnalyzeAnother, onEditAge }: AnalysisResultProps) {
  const verdictMeta: Record<AnalysisData['momVerdict'], {
    label: string;
    description: string;
    icon: typeof Heart;
    toneClass: string;
    bgClass: string;
    chipText: string;
  }> = {
    take_it: {
      label: 'Recommended',
      description: 'Enjoy this product mindfully and keep portions balanced.',
      icon: Heart,
      toneClass: 'text-emerald-700',
      bgClass: 'bg-emerald-50 border-emerald-200',
      chipText: 'Positive',
    },
    avoid_it: {
      label: 'Not Recommended',
      description: 'Consider a healthier alternative.',
      icon: Ban,
      toneClass: 'text-rose-700',
      bgClass: 'bg-rose-50 border-rose-200',
      chipText: 'Negative',
    },
    think_twice: {
      label: 'Consider with Caution',
      description: 'Consume occasionally and with balanced portions.',
      icon: AlertTriangle,
      toneClass: 'text-amber-700',
      bgClass: 'bg-amber-50 border-amber-200',
      chipText: 'Caution',
    },
  };

  const meta = verdictMeta[analysis.momVerdict] ?? verdictMeta.think_twice;
  const VerdictIcon = meta.icon;

  const getHealthColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthBgColor = (score: number) => {
    if (score >= 70) return 'bg-green-100';
    if (score >= 40) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-green-100">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-1">Analysis Complete</h2>
          <p className="text-gray-600">
            Personalized insights for <span className="font-semibold text-green-600">{age} years</span>
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onEditAge}
            className="inline-flex items-center gap-2 rounded-lg border border-green-200 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50 transition"
            type="button"
          >
            <Pencil className="w-4 h-4" />
            Edit Age
          </button>
          <div className={`${getHealthBgColor(analysis.healthScore)} border border-white/40 rounded-full px-4 sm:px-5 py-3 text-center`}> 
            <div className={`text-3xl font-bold ${getHealthColor(analysis.healthScore)}`}>
              {analysis.healthScore}
            </div>
            <p className="text-xs uppercase tracking-wide text-gray-600 mt-1">Health Score</p>
          </div>
        </div>
      </div>

      <div className={`${meta.bgClass} border rounded-2xl p-5 sm:p-6 mb-6 shadow-inner`}
        role="status"
        aria-live="polite"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white ${meta.toneClass}`}>
              <VerdictIcon className="h-6 w-6" />
            </div>
            <div>
              <p className={`inline-flex items-center rounded-full border border-white/60 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide ${meta.toneClass}`}>
                {meta.chipText}
              </p>
              <h3 className={`mt-2 text-xl font-semibold ${meta.toneClass}`}>{meta.label}</h3>
              <p className="mt-1 text-sm text-slate-600">{meta.description}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-white/60 bg-white/80 p-4 text-sm leading-relaxed text-slate-700">
          {analysis.momAdvice || 'Reminder: Be mindful of your choices to maintain energy and well-being.'}
        </div>
      </div>

      <div className={`${getHealthBgColor(analysis.healthScore)} border-2 ${analysis.healthScore >= 70 ? 'border-green-200' : analysis.healthScore >= 40 ? 'border-yellow-200' : 'border-red-200'} rounded-lg p-6 mb-6`}>
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          {analysis.ageAppropriate ? (
            <CheckCircle className="w-6 h-6 text-green-600" />
          ) : (
            <AlertCircle className="w-6 h-6 text-yellow-600" />
          )}
          Summary
        </h3>
        <p className={`text-base sm:text-lg ${getHealthColor(analysis.healthScore)}`}>
          {analysis.overallHealth}
        </p>
        <div className="mt-3">
          {analysis.ageAppropriate ? (
            <span className="inline-flex items-center gap-1 text-sm text-green-700 font-medium">
              <CheckCircle className="w-4 h-4" />
              Age-Appropriate Product
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-sm text-yellow-700 font-medium">
              <AlertCircle className="w-4 h-4" />
              May Not Be Ideal for Your Age
            </span>
          )}
        </div>
      </div>

      {analysis.ingredients && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-blue-800 mb-3">📝 Detected Ingredients</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{analysis.ingredients}</p>
        </div>
      )}

      {analysis.pros && analysis.pros.length > 0 && (
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6" />
            Positive Aspects
          </h3>
          <ul className="space-y-3">
            {analysis.pros.map((pro, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{pro}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {analysis.cons && analysis.cons.length > 0 && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
            <XCircle className="w-6 h-6" />
            Concerns & Warnings
          </h3>
          <ul className="space-y-3">
            {analysis.cons.map((con, index) => (
              <li key={index} className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
            💡 Recommendations
          </h3>
          <ul className="space-y-3">
            {analysis.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-purple-600 font-bold mt-0.5">{index + 1}.</span>
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8">
        <button
          onClick={onAnalyzeAnother}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg"
          type="button"
        >
          <RefreshCw className="w-5 h-5" />
          Analyze Another Product
        </button>
        <button
          onClick={onEditAge}
          className="flex items-center justify-center gap-2 border border-green-200 text-green-700 font-semibold py-3 px-6 rounded-lg hover:bg-green-50 transition"
          type="button"
        >
          <Pencil className="w-4 h-4" />
          Edit Age
        </button>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800 text-center">
          ⚠️ This analysis is for informational purposes only. Please consult healthcare professionals for medical advice.
        </p>
      </div>
    </div>
  );
}
