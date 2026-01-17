'use client';

import { CheckCircle, XCircle, AlertCircle, RefreshCw, Pencil, Heart, Ban, AlertTriangle, ArrowUpRight, Info, Share2 } from 'lucide-react';
import type { AnalysisData, Ingredient } from '../types/analysis';
import { useState, useCallback, useMemo, memo } from 'react';

interface AnalysisResultProps {
  analysis: AnalysisData;
  age: number;
  onAnalyzeAnother: () => void;
  onEditAge: () => void;
}

// Move static data outside component
const VERDICT_META: Record<AnalysisData['momVerdict'], {
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
    bgClass: 'bg-emerald-50',
    borderClass: 'border-emerald-200',
    chipText: 'Expert Approved',
  },
  avoid_it: {
    label: 'Not Recommended',
    description: 'Consider a healthier alternative.',
    icon: Ban,
    toneClass: 'text-rose-700',
    bgClass: 'bg-rose-50',
    borderClass: 'border-rose-200',
    chipText: 'Avoid It',
  },
  think_twice: {
    label: 'Consider with Caution',
    description: 'Consume occasionally and with balanced portions.',
    icon: AlertTriangle,
    toneClass: 'text-amber-700',
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-200',
    chipText: 'Caution',
  },
};

const getHealthBgColor = (score: number) => {
  if (score >= 70) return 'bg-emerald-100 text-emerald-800';
  if (score >= 40) return 'bg-amber-100 text-amber-800';
  return 'bg-rose-100 text-rose-800';
};

const STATS_STORAGE_KEY = 'product-analyzer-stats';

function AnalysisResult({ analysis, age, onAnalyzeAnother, onEditAge }: AnalysisResultProps) {
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);

  const meta = useMemo(() => VERDICT_META[analysis.momVerdict] ?? VERDICT_META.think_twice, [analysis.momVerdict]);
  const VerdictIcon = meta.icon;
  const healthBgColor = useMemo(() => getHealthBgColor(analysis.healthScore), [analysis.healthScore]);

  const handleIngredientClick = useCallback((ing: Ingredient) => {
    setSelectedIngredient(ing);
    if (typeof window !== 'undefined') {
      try {
        const storedStats = localStorage.getItem(STATS_STORAGE_KEY);
        const stats = storedStats ? JSON.parse(storedStats) : { scanCount: 0, healthyCount: 0, ingredientClicks: 0 };
        stats.ingredientClicks += 1;
        localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
      } catch (e) {
        // Ignore localStorage errors
      }
    }
  }, []);

  const closeModal = useCallback(() => {
    setSelectedIngredient(null);
  }, []);

  const handleShare = useCallback(() => {
    const text = `Product Analysis for Age ${age}:\n\nScore: ${analysis.healthScore}/100\nVerdict: ${meta.label}\n\n${analysis.overallHealth}\n\nCheck it out on Product Analyzer!`;
    if (navigator.share) {
      navigator.share({
        title: 'Product Health Analysis',
        text: text,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(text);
      alert('Analysis copied to clipboard!');
    }
  }, [age, analysis.healthScore, analysis.overallHealth, meta.label]);

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-8 md:p-10 shadow-xl border border-slate-200 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between mb-6 sm:mb-8 border-b border-slate-100 pb-6 sm:pb-8">
        <div className="text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Analysis Complete</h2>
            <div className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-600 uppercase tracking-wide border border-slate-200">
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
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition border border-transparent hover:border-slate-200"
            title="Edit Age"
            type="button"
          >
            <Pencil className="w-5 h-5" />
          </button>
          <div className={`flex flex-col items-center justify-center h-20 w-20 sm:h-24 sm:w-24 rounded-2xl ${healthBgColor} shadow-lg`}>
            <span className="text-3xl sm:text-4xl font-bold">{analysis.healthScore}</span>
            <span className="text-[10px] font-bold uppercase tracking-wide opacity-80">Score</span>
          </div>
        </div>
      </div>

      {/* Verdict Card */}
      <div className={`${meta.bgClass} ${meta.borderClass} border-2 rounded-2xl p-5 sm:p-6 mb-6 sm:mb-8 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-20 rounded-full blur-2xl"></div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start relative z-10">
          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-md ${meta.toneClass}`}>
            <VerdictIcon className="h-7 w-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
              <h3 className={`text-xl font-bold ${meta.toneClass}`}>{meta.label}</h3>
              <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase bg-white/70 border ${meta.borderClass} ${meta.toneClass}`}>
                {meta.chipText}
              </span>
            </div>
            <p className="text-slate-700 text-sm sm:text-base font-medium mb-4">{meta.description}</p>
            <div className="bg-white/80 rounded-xl p-4 text-sm leading-relaxed text-slate-700 border border-white shadow-sm">
              <span className="font-bold block mb-1 text-slate-500 text-xs uppercase tracking-wider">Expert&apos;s Advice</span>
              {analysis.momAdvice || 'Reminder: Be mindful of your choices to maintain energy and well-being.'}
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="bg-slate-100 p-2 rounded-xl border border-slate-200"><ArrowUpRight className="w-4 h-4 text-slate-600" /></span>
          Summary
        </h3>
        <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-100">
          <p className="text-slate-700 leading-relaxed text-base sm:text-lg mb-4">
            {analysis.overallHealth}
          </p>
          <div className="flex items-center gap-2">
            {analysis.ageAppropriate ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-sm font-bold border border-emerald-200">
                <CheckCircle className="w-4 h-4" />
                Age-Appropriate
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100 text-amber-800 text-sm font-bold border border-amber-200">
                <AlertCircle className="w-4 h-4" />
                Check Age Suitability
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Dietary Warnings */}
      {analysis.dietaryWarnings && analysis.dietaryWarnings.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <h3 className="text-lg font-bold text-rose-700 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Dietary Warnings
          </h3>
          <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-5">
            <ul className="space-y-3">
              {analysis.dietaryWarnings.map((warning, index) => (
                <li key={index} className="flex items-start gap-3 text-rose-800 font-semibold">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-rose-500 shrink-0" />
                  {warning}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Ingredients */}
      {analysis.ingredients && (
        <div className="mb-6 sm:mb-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Detected Ingredients</h3>
          {typeof analysis.ingredients === 'string' ? (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <p className="text-slate-600 text-sm font-mono leading-relaxed">{analysis.ingredients}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {analysis.ingredients.map((ing, idx) => (
                <button
                  key={idx}
                  onClick={() => handleIngredientClick(ing)}
                  className={`text-left p-4 rounded-xl border-2 transition-all hover:shadow-md ${ing.healthImpact === 'negative' ? 'bg-rose-50 border-rose-200 hover:border-rose-300' :
                    ing.healthImpact === 'positive' ? 'bg-emerald-50 border-emerald-200 hover:border-emerald-300' :
                      'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-800 text-sm">{ing.name}</span>
                    <Info className="w-4 h-4 text-slate-400" />
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">{ing.description}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Ingredient Detail Modal */}
      {selectedIngredient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-800">{selectedIngredient.name}</h3>
              <button onClick={closeModal} className="p-1.5 rounded-full hover:bg-slate-100 border border-slate-200">
                <XCircle className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-4 ${selectedIngredient.healthImpact === 'negative' ? 'bg-rose-100 text-rose-700 border border-rose-200' :
              selectedIngredient.healthImpact === 'positive' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                'bg-slate-100 text-slate-700 border border-slate-200'
              }`}>
              {selectedIngredient.healthImpact} Impact
            </div>
            <p className="text-slate-600 leading-relaxed">
              {selectedIngredient.description}
            </p>
          </div>
        </div>
      )}

      {/* Pros & Cons */}
      <div className="grid md:grid-cols-2 gap-6 mb-6 sm:mb-8">
        {analysis.pros && analysis.pros.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-emerald-700 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Positives
            </h3>
            <ul className="space-y-3">
              {analysis.pros.map((pro, index) => (
                <li key={index} className="flex items-start gap-3 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
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
                <li key={index} className="flex items-start gap-3 bg-rose-50 p-3 rounded-xl border border-rose-100">
                  <span className="mt-1 h-2 w-2 rounded-full bg-rose-500 shrink-0" />
                  <span className="text-slate-700 text-sm">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Recommendations */}
      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <div className="mb-8 sm:mb-10">
          <h3 className="text-lg font-bold text-violet-800 mb-4">Recommendations</h3>
          <div className="grid gap-3">
            {analysis.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-4 bg-violet-50 p-4 rounded-2xl border border-violet-100">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-200 text-xs font-bold text-violet-700">
                  {index + 1}
                </span>
                <span className="text-slate-700 text-sm sm:text-base">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t border-slate-100">
        <button
          onClick={onAnalyzeAnother}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-4 px-8 rounded-2xl transition duration-200 shadow-lg shadow-emerald-200 hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
          type="button"
        >
          <RefreshCw className="w-5 h-5" />
          Analyze Another
        </button>

        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-bold py-4 px-8 rounded-2xl transition duration-200 shadow-sm hover:shadow-md active:scale-95"
          type="button"
        >
          <Share2 className="w-5 h-5" />
          Share Result
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

export default memo(AnalysisResult);
