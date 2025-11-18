'use client';

import { CheckCircle, XCircle, AlertCircle, RefreshCw, Pencil, Heart, Ban, AlertTriangle, ArrowUpRight } from 'lucide-react';
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
    borderClass: string;
    chipText: string;
  }> = {
    take_it: {
      label: 'Recommended',
      description: 'Enjoy this product mindfully and keep portions balanced.',
      icon: Heart,
      toneClass: 'text-emerald-700',
      bgClass: 'bg-emerald-50/80',
      borderClass: 'border-emerald-200',
      chipText: 'Mom Approved',
    },
    avoid_it: {
      label: 'Not Recommended',
      description: 'Consider a healthier alternative.',
      icon: Ban,
      toneClass: 'text-rose-700',
      bgClass: 'bg-rose-50/80',
      borderClass: 'border-rose-200',
      chipText: 'Avoid It',
    },
    think_twice: {
      label: 'Consider with Caution',
      description: 'Consume occasionally and with balanced portions.',
      icon: AlertTriangle,
      toneClass: 'text-amber-700',
      bgClass: 'bg-amber-50/80',
      borderClass: 'border-amber-200',
      chipText: 'Caution',
    },
  };

  const meta = verdictMeta[analysis.momVerdict] ?? verdictMeta.think_twice;
  const VerdictIcon = meta.icon;

  const getHealthColor = (score: number) => {
    if (score >= 70) return 'text-emerald-600';
    if (score >= 40) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getHealthBgColor = (score: number) => {
    if (score >= 70) return 'bg-emerald-100 text-emerald-800';
    if (score >= 40) return 'bg-amber-100 text-amber-800';
    return 'bg-rose-100 text-rose-800';
  };

  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-8 md:p-10 animate-fade-in-up">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between mb-6 sm:mb-8 border-b border-slate-100 pb-6 sm:pb-8">
        <div className="text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Analysis Complete</h2>
            <div className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-600 uppercase tracking-wide">
              Age: {age}
            </div>
          </div>
          <p className="text-sm sm:text-base text-slate-500">
            Here are your personalized health insights
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onEditAge}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
            title="Edit Age"
            type="button"
          >
            <Pencil className="w-5 h-5" />
          </button>
          <div className={`flex flex-col items-center justify-center h-20 w-20 sm:h-24 sm:w-24 rounded-2xl ${getHealthBgColor(analysis.healthScore)}`}>
            <span className="text-3xl sm:text-4xl font-bold">{analysis.healthScore}</span>
            <span className="text-[10px] font-bold uppercase tracking-wide opacity-80">Score</span>
          </div>
        </div>
      </div>

      <div className={`${meta.bgClass} ${meta.borderClass} border rounded-2xl p-5 sm:p-6 mb-6 sm:mb-8 shadow-sm relative overflow-hidden`}>
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-20 rounded-full blur-xl"></div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start relative z-10">
          <div className={`flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ${meta.toneClass}`}>
            <VerdictIcon className="h-6 w-6 sm:h-7 sm:w-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
              <h3 className={`text-lg sm:text-xl font-bold ${meta.toneClass}`}>{meta.label}</h3>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-white/50 border border-white/20 ${meta.toneClass}`}>
                {meta.chipText}
              </span>
            </div>
            <p className="text-slate-700 text-sm sm:text-base font-medium mb-3">{meta.description}</p>
            <div className="bg-white/60 rounded-xl p-4 text-sm leading-relaxed text-slate-800 border border-white/40 shadow-sm">
              <span className="font-bold block mb-1 opacity-70 text-xs uppercase tracking-wider">Mom&apos;s Advice</span>
              {analysis.momAdvice || 'Reminder: Be mindful of your choices to maintain energy and well-being.'}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span className="bg-slate-100 p-1.5 rounded-lg"><ArrowUpRight className="w-4 h-4 text-slate-600" /></span>
          Summary
        </h3>
        <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-100">
          <p className="text-slate-700 leading-relaxed text-base sm:text-lg mb-4">
            {analysis.overallHealth}
          </p>
          <div className="flex items-center gap-2">
            {analysis.ageAppropriate ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-sm font-bold">
                <CheckCircle className="w-4 h-4" />
                Age-Appropriate
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100 text-amber-800 text-sm font-bold">
                <AlertCircle className="w-4 h-4" />
                Check Age Suitability
              </span>
            )}
          </div>
        </div>
      </div>

      {analysis.ingredients && (
        <div className="mb-6 sm:mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Detected Ingredients</h3>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <p className="text-slate-600 text-sm font-mono leading-relaxed">{analysis.ingredients}</p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-6 sm:mb-8">
        {analysis.pros && analysis.pros.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-emerald-700 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Positives
            </h3>
            <ul className="space-y-3">
              {analysis.pros.map((pro, index) => (
                <li key={index} className="flex items-start gap-3 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/50">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-slate-700 text-sm">{pro}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {analysis.cons && analysis.cons.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-rose-700 mb-4 flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              Concerns
            </h3>
            <ul className="space-y-3">
              {analysis.cons.map((con, index) => (
                <li key={index} className="flex items-start gap-3 bg-rose-50/50 p-3 rounded-xl border border-rose-100/50">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0" />
                  <span className="text-slate-700 text-sm">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <div className="mb-8 sm:mb-10">
          <h3 className="text-lg font-bold text-indigo-900 mb-4">Recommendations</h3>
          <div className="grid gap-3">
            {analysis.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-4 bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600 border border-indigo-200">
                  {index + 1}
                </span>
                <span className="text-slate-700 text-sm sm:text-base">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 border-t border-slate-100">
        <button
          onClick={onAnalyzeAnother}
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-2xl transition duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
          type="button"
        >
          <RefreshCw className="w-5 h-5" />
          Analyze Another
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-slate-400">
          AI-generated analysis. Consult a professional for medical advice.
        </p>
      </div>
    </div>
  );
}
