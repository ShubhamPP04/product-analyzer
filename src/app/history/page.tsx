'use client';

import { useEffect, useState } from 'react';
import { Clock, History, ArrowUpRight, Heart, Ban, AlertTriangle, Trash2, Camera, ChevronRight } from 'lucide-react';
import { ProductHistoryEntry } from '@/types/analysis';
import Link from 'next/link';

const HISTORY_STORAGE_KEY = 'product-analyzer-history';

const verdictChips: Record<ProductHistoryEntry['analysis']['momVerdict'], {
  label: string;
  icon: typeof Heart;
  className: string;
  bgClass: string;
}> = {
  take_it: {
    label: 'Recommended',
    icon: Heart,
    className: 'text-emerald-700',
    bgClass: 'bg-emerald-100/80',
  },
  avoid_it: {
    label: 'Not Recommended',
    icon: Ban,
    className: 'text-rose-700',
    bgClass: 'bg-rose-100/80',
  },
  think_twice: {
    label: 'Caution',
    icon: AlertTriangle,
    className: 'text-amber-700',
    bgClass: 'bg-amber-100/80',
  },
};

const formatter = typeof Intl !== 'undefined'
  ? new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
  : null;

function formatTimestamp(timestamp: string) {
  try {
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) {
      return 'Unknown date';
    }
    return formatter ? formatter.format(date) : date.toLocaleString();
  } catch {
    return 'Unknown date';
  }
}

export default function HistoryPage() {
  const [history, setHistory] = useState<ProductHistoryEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<ProductHistoryEntry | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory) as ProductHistoryEntry[];
        setHistory(parsedHistory);
        if (parsedHistory.length > 0) {
          setSelectedEntry(parsedHistory[0]);
        }
      } catch (error) {
        console.warn('Failed to parse history from storage', error);
      }
    }
  }, []);

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all history?')) {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
      setHistory([]);
      setSelectedEntry(null);
    }
  };

  const deleteEntry = (id: string) => {
    const updatedHistory = history.filter(entry => entry.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
    if (selectedEntry?.id === id) {
      setSelectedEntry(null);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc]">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] sm:w-[50%] h-[50%] bg-emerald-200/30 rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[120px] animate-blob" />
        <div className="absolute top-[-10%] right-[-10%] w-[70%] sm:w-[50%] h-[50%] bg-cyan-200/30 rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[120px] animate-blob animation-delay-2000" />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-20 sm:py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 sm:mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 animate-fade-in-up">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Analysis History
              </h1>
              <p className="text-slate-600 text-sm sm:text-base">
                View and manage your past product analyses
              </p>
            </div>
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm px-4 py-3 sm:py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-rose-600 hover:border-rose-200 shadow-sm active:scale-95"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </button>
              )}
              <Link
                href="/analyzer"
                className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 sm:py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200/50 transition hover:bg-emerald-700 hover:scale-105 hover:shadow-emerald-300/50 active:scale-95"
              >
                <Camera className="h-4 w-4" />
                New Analysis
              </Link>
            </div>
          </div>

          {history.length === 0 ? (
            <div className="glass-panel rounded-3xl p-8 sm:p-16 text-center animate-fade-in-up delay-100">
              <div className="mx-auto mb-6 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-emerald-50 border border-emerald-100">
                <History className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-600/50" />
              </div>
              <h3 className="mb-3 text-xl sm:text-2xl font-bold text-slate-900">No History Yet</h3>
              <p className="mb-8 text-sm sm:text-base text-slate-600 max-w-md mx-auto">
                Start analyzing products to build your personal health database. Your scan results will appear here.
              </p>
              <Link
                href="/analyzer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 sm:px-8 sm:py-4 font-semibold text-white shadow-xl shadow-emerald-200/50 transition hover:bg-emerald-700 hover:scale-105 active:scale-95"
              >
                <Camera className="h-5 w-5" />
                Analyze Your First Product
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 lg:gap-8 lg:grid-cols-[1fr_1.5fr] animate-fade-in-up delay-100">
              {/* History List */}
              <div className="glass-panel rounded-3xl p-4 sm:p-6 h-[50vh] lg:h-[calc(100vh-200px)] flex flex-col">
                <h2 className="mb-4 text-lg font-bold text-slate-900 px-2">Recent Scans</h2>
                <div className="space-y-3 overflow-y-auto pr-2 flex-1 custom-scrollbar">
                  {history.map((entry) => {
                    const chip = verdictChips[entry.analysis.momVerdict] ?? verdictChips.think_twice;
                    const ChipIcon = chip.icon;
                    const isSelected = selectedEntry?.id === entry.id;

                    return (
                      <div key={entry.id} className="group relative">
                        <button
                          type="button"
                          onClick={() => setSelectedEntry(entry)}
                          className={`w-full text-left transition-all duration-200 ${isSelected ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                            }`}
                        >
                          <div className={`rounded-2xl border p-4 sm:p-5 transition-all duration-200 ${isSelected
                            ? 'border-emerald-500 bg-emerald-50/50 shadow-md'
                            : 'border-slate-100 bg-white/50 hover:border-emerald-200 hover:bg-white hover:shadow-sm'
                            }`}>
                            <div className="mb-3 flex items-start justify-between">
                              <div className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wide ${chip.bgClass} ${chip.className}`}>
                                <ChipIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                {chip.label}
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteEntry(entry.id);
                                }}
                                className="rounded-lg p-1.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50 hover:text-rose-600"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="flex items-end justify-between">
                              <div>
                                <p className="text-[10px] sm:text-xs text-slate-500 mb-1 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {formatTimestamp(entry.analyzedAt)}
                                </p>
                                <div className="text-xs sm:text-sm font-medium text-slate-900">
                                  Health Score: <span className={`font-bold ${entry.analysis.healthScore >= 70 ? 'text-emerald-600' : entry.analysis.healthScore >= 40 ? 'text-amber-600' : 'text-rose-600'}`}>{entry.analysis.healthScore}</span>
                                </div>
                              </div>
                              {isSelected && <ChevronRight className="h-5 w-5 text-emerald-500" />}
                            </div>
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Detail View */}
              <div className="glass-panel rounded-3xl p-5 sm:p-8 h-auto lg:h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
                {selectedEntry ? (
                  <div className="space-y-6 sm:space-y-8">
                    <div className="flex items-start justify-between border-b border-slate-100 pb-6">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Analysis Details</h2>
                          <span className="bg-slate-100 text-slate-600 text-[10px] sm:text-xs px-2 py-1 rounded-lg font-medium">
                            Age: {selectedEntry.age}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          Analyzed on {formatTimestamp(selectedEntry.analyzedAt)}
                        </p>
                      </div>
                      <div className={`flex flex-col items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-2xl ${selectedEntry.analysis.healthScore >= 70 ? 'bg-emerald-100 text-emerald-700' : selectedEntry.analysis.healthScore >= 40 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                        <span className="text-2xl sm:text-3xl font-bold">{selectedEntry.analysis.healthScore}</span>
                        <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wide opacity-80">Score</span>
                      </div>
                    </div>

                    <div className="bg-emerald-50/50 rounded-2xl p-5 sm:p-6 border border-emerald-100">
                      <h3 className="mb-3 font-bold text-emerald-800 flex items-center gap-2 text-base sm:text-lg">
                        <Heart className="h-5 w-5" />
                        Mom&apos;s Advice
                      </h3>
                      <p className="text-slate-700 leading-relaxed text-sm sm:text-lg">
                        {selectedEntry.analysis.momAdvice}
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-3 font-bold text-slate-900 text-base sm:text-lg">Overall Assessment</h3>
                      <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                        {selectedEntry.analysis.overallHealth}
                      </p>
                    </div>

                    {selectedEntry.analysis.ingredients && (
                      <div>
                        <h3 className="mb-3 font-bold text-slate-900 text-base sm:text-lg">Detected Ingredients</h3>
                        <div className="rounded-2xl bg-slate-50 p-4 sm:p-5 border border-slate-100">
                          <p className="text-xs sm:text-sm text-slate-600 whitespace-pre-wrap font-mono">
                            {selectedEntry.analysis.ingredients}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      {selectedEntry.analysis.pros.length > 0 && (
                        <div>
                          <h3 className="mb-4 font-bold text-emerald-700 flex items-center gap-2 text-base sm:text-lg">
                            <span className="bg-emerald-100 p-1 rounded-md"><ArrowUpRight className="h-4 w-4" /></span>
                            Positives
                          </h3>
                          <ul className="space-y-3">
                            {selectedEntry.analysis.pros.map((pro, index) => (
                              <li key={index} className="flex items-start gap-3 text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                <span className="mt-0.5 text-emerald-500 font-bold">✓</span>
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedEntry.analysis.cons.length > 0 && (
                        <div>
                          <h3 className="mb-4 font-bold text-rose-700 flex items-center gap-2 text-base sm:text-lg">
                            <span className="bg-rose-100 p-1 rounded-md"><AlertTriangle className="h-4 w-4" /></span>
                            Concerns
                          </h3>
                          <ul className="space-y-3">
                            {selectedEntry.analysis.cons.map((con, index) => (
                              <li key={index} className="flex items-start gap-3 text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                <span className="mt-0.5 text-rose-500 font-bold">✗</span>
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {selectedEntry.analysis.recommendations.length > 0 && (
                      <div>
                        <h3 className="mb-4 font-bold text-slate-900 text-base sm:text-lg">Recommendations</h3>
                        <div className="grid gap-3">
                          {selectedEntry.analysis.recommendations.map((rec, index) => (
                            <div key={index} className="flex items-start gap-4 bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                                {index + 1}
                              </span>
                              <span className="text-slate-700 text-sm sm:text-base">{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-center p-8">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50 border border-slate-100 shadow-sm">
                      <ArrowUpRight className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-slate-900">
                      Select an Analysis
                    </h3>
                    <p className="text-slate-500 max-w-xs">
                      Click on any item from the list on the left to view full details
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
