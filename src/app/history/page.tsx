'use client';

import { useEffect, useState } from 'react';
import { Clock, History, ArrowUpRight, Heart, Ban, AlertTriangle, Trash2, Camera } from 'lucide-react';
import { ProductHistoryEntry } from '@/types/analysis';
import Link from 'next/link';

const HISTORY_STORAGE_KEY = 'product-analyzer-history';

const verdictChips: Record<ProductHistoryEntry['analysis']['momVerdict'], {
  label: string;
  icon: typeof Heart;
  className: string;
}> = {
  take_it: {
    label: 'Mom-approved',
    icon: Heart,
    className: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  },
  avoid_it: {
    label: 'Mom said no',
    icon: Ban,
    className: 'bg-rose-100 text-rose-700 border border-rose-200',
  },
  think_twice: {
    label: 'Have with care',
    icon: AlertTriangle,
    className: 'bg-amber-100 text-amber-700 border border-amber-200',
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
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute top-1/3 -left-32 h-[500px] w-[500px] rounded-full bg-cyan-200/30 blur-3xl" />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-100 rounded-full p-3">
                  <History className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
                  Analysis History
                </h1>
              </div>
              <p className="text-lg text-slate-600">
                View and manage your past product analyses
              </p>
            </div>
            <div className="flex gap-3">
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="flex items-center gap-2 rounded-xl border-2 border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </button>
              )}
              <Link
                href="/analyzer"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
              >
                <Camera className="h-4 w-4" />
                New Analysis
              </Link>
            </div>
          </div>

          {history.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-green-200 bg-white/70 p-12 text-center backdrop-blur">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <History className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-slate-900">No History Yet</h3>
              <p className="mb-6 text-slate-600">
                Start analyzing products to see them here
              </p>
              <Link
                href="/analyzer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
              >
                <Camera className="h-5 w-5" />
                Analyze Your First Product
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
              {/* History List */}
              <div className="rounded-2xl border border-green-100 bg-white/70 p-6 shadow-xl backdrop-blur">
                <h2 className="mb-4 text-xl font-bold text-slate-900">Recent Analyses</h2>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {history.map((entry) => {
                    const chip = verdictChips[entry.analysis.momVerdict] ?? verdictChips.think_twice;
                    const ChipIcon = chip.icon;
                    const isSelected = selectedEntry?.id === entry.id;

                    return (
                      <div key={entry.id} className="group relative">
                        <button
                          type="button"
                          onClick={() => setSelectedEntry(entry)}
                          className={`w-full text-left transition-all ${
                            isSelected ? 'scale-[0.98]' : ''
                          }`}
                        >
                          <div className={`rounded-xl border-2 p-4 transition-all ${
                            isSelected
                              ? 'border-green-400 bg-green-50 shadow-lg'
                              : 'border-green-100 bg-white hover:border-green-300 hover:bg-green-50'
                          }`}>
                            <div className="mb-3 flex items-start justify-between">
                              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${chip.className}`}>
                                <ChipIcon className="h-3.5 w-3.5" />
                                {chip.label}
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteEntry(entry.id);
                                }}
                                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <p className="mb-2 text-sm font-semibold text-slate-700">
                              Health Score: {entry.analysis.healthScore}
                            </p>
                            
                            <div className="flex items-center text-xs text-slate-500">
                              <Clock className="mr-1.5 h-3.5 w-3.5" />
                              {formatTimestamp(entry.analyzedAt)}
                            </div>
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Detail View */}
              <div className="rounded-2xl border border-green-100 bg-white/70 p-6 md:p-8 shadow-xl backdrop-blur">
                {selectedEntry ? (
                  <div className="space-y-6">
                    <div>
                      <div className="mb-4 flex items-start justify-between">
                        <h2 className="text-2xl font-bold text-slate-900">Analysis Details</h2>
                        <div className="rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 px-4 py-2 text-center shadow-lg">
                          <div className="text-2xl font-bold text-white">{selectedEntry.analysis.healthScore}</div>
                          <p className="text-xs text-white/90">Health Score</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500">
                        Analyzed on {formatTimestamp(selectedEntry.analyzedAt)} • Age: {selectedEntry.age} years
                      </p>
                    </div>

                    <div className="rounded-xl border-2 border-green-200 bg-green-50/50 p-5">
                      <h3 className="mb-2 font-semibold text-green-800">Mom&apos;s Advice</h3>
                      <p className="text-slate-700 leading-relaxed">
                        {selectedEntry.analysis.momAdvice}
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-3 font-semibold text-slate-900">Overall Assessment</h3>
                      <p className="text-slate-700 leading-relaxed">
                        {selectedEntry.analysis.overallHealth}
                      </p>
                    </div>

                    {selectedEntry.analysis.ingredients && (
                      <div>
                        <h3 className="mb-3 font-semibold text-slate-900">Detected Ingredients</h3>
                        <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4">
                          <p className="text-sm text-slate-700 whitespace-pre-wrap">
                            {selectedEntry.analysis.ingredients}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedEntry.analysis.pros.length > 0 && (
                      <div>
                        <h3 className="mb-3 font-semibold text-green-800">Positive Aspects</h3>
                        <ul className="space-y-2">
                          {selectedEntry.analysis.pros.map((pro, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                              <span className="mt-0.5 text-green-600">✓</span>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedEntry.analysis.cons.length > 0 && (
                      <div>
                        <h3 className="mb-3 font-semibold text-red-800">Concerns</h3>
                        <ul className="space-y-2">
                          {selectedEntry.analysis.cons.map((con, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                              <span className="mt-0.5 text-red-600">✗</span>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedEntry.analysis.recommendations.length > 0 && (
                      <div>
                        <h3 className="mb-3 font-semibold text-purple-800">Recommendations</h3>
                        <ul className="space-y-2">
                          {selectedEntry.analysis.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                              <span className="font-semibold text-purple-600">{index + 1}.</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex h-full min-h-[400px] items-center justify-center text-center">
                    <div>
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <ArrowUpRight className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-slate-900">
                        Select an Analysis
                      </h3>
                      <p className="text-slate-600">
                        Click on any item from the list to view details
                      </p>
                    </div>
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
