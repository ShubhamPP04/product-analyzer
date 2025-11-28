'use client';

import { useEffect, useState } from 'react';
import { History, ArrowUpRight, Heart, Ban, AlertTriangle, Trash2, Camera, X, Calendar, Download } from 'lucide-react';
import { ProductHistoryEntry } from '@/types/analysis';
import Link from 'next/link';
import Achievements from '@/components/Achievements';

const HISTORY_STORAGE_KEY = 'product-analyzer-history';

const verdictChips: Record<ProductHistoryEntry['analysis']['momVerdict'], {
  label: string;
  icon: typeof Heart;
  className: string;
  bgClass: string;
  borderClass: string;
}> = {
  take_it: {
    label: 'Expert Approved',
    icon: Heart,
    className: 'text-emerald-700',
    bgClass: 'bg-emerald-50',
    borderClass: 'border-emerald-200',
  },
  avoid_it: {
    label: 'Not Recommended',
    icon: Ban,
    className: 'text-rose-700',
    bgClass: 'bg-rose-50',
    borderClass: 'border-rose-200',
  },
  think_twice: {
    label: 'Expert Caution',
    icon: AlertTriangle,
    className: 'text-amber-700',
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-200',
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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory) as ProductHistoryEntry[];
        // Sort by date descending just in case
        parsedHistory.sort((a, b) => new Date(b.analyzedAt).getTime() - new Date(a.analyzedAt).getTime());
        setHistory(parsedHistory);
      } catch (error) {
        console.warn('Failed to parse history from storage', error);
      }
    }
    setIsLoaded(true);
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

  const handleExport = () => {
    if (history.length === 0) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "product-analysis-history.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc] overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-emerald-50/50 to-transparent" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-24 sm:py-32">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-20 animate-fade-in-up">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                Your Health <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">Journey</span>
              </h1>
              <p className="text-slate-600 text-lg max-w-md">
                Track every scan, analyze your habits, and make better choices over time.
              </p>
            </div>
            <div className="flex gap-4">
              {history.length > 0 && (
                <>
                  <button
                    onClick={handleExport}
                    className="px-4 py-3 rounded-2xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-95 flex items-center gap-2"
                    title="Export Data"
                  >
                    <Download className="w-5 h-5" />
                    <span className="hidden sm:inline">Export</span>
                  </button>
                  <button
                    onClick={clearHistory}
                    className="px-4 py-3 rounded-2xl border border-slate-200 text-slate-600 font-bold hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all active:scale-95 flex items-center gap-2"
                    title="Clear History"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span className="hidden sm:inline">Clear</span>
                  </button>
                </>
              )}
              <Link
                href="/analyzer"
                className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold shadow-xl hover:bg-slate-800 hover:scale-105 transition-all active:scale-95 flex items-center gap-2"
              >
                <Camera className="w-5 h-5" />
                <span className="hidden sm:inline">Scan New</span>
              </Link>
            </div>
          </div>

          <Achievements />

          {/* Timeline */}
          {history.length === 0 && isLoaded ? (
            <div className="text-center py-20 animate-fade-in-up">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <History className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No scans yet</h3>
              <p className="text-slate-500 mb-8">Start scanning products to build your timeline.</p>
            </div>
          ) : (
            <div className="relative">
              {/* Center Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-200 via-cyan-200 to-transparent md:-translate-x-1/2" />

              <div className="space-y-12 md:space-y-24">
                {history.map((entry, index) => {
                  const chip = verdictChips[entry.analysis.momVerdict] ?? verdictChips.think_twice;
                  const ChipIcon = chip.icon;
                  const isEven = index % 2 === 0;

                  return (
                    <div key={entry.id} className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-center ${isEven ? 'md:flex-row-reverse' : ''} group`}>

                      {/* Timeline Dot */}
                      <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-white border-4 border-emerald-500 rounded-full z-20 md:-translate-x-1/2 shadow-lg shadow-emerald-500/30 group-hover:scale-150 transition-transform duration-500" />

                      {/* Date Label (Desktop) */}
                      <div className={`hidden md:block w-1/2 text-center px-12 ${isEven ? 'text-right' : 'text-left'}`}>
                        <span className="inline-block py-1 px-3 rounded-full bg-slate-100 text-slate-500 text-sm font-bold">
                          {formatTimestamp(entry.analyzedAt)}
                        </span>
                      </div>

                      {/* Card */}
                      <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                        <div
                          onClick={() => setSelectedEntry(entry)}
                          className="bg-white/60 backdrop-blur-xl border border-white/50 p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 cursor-pointer hover:-translate-y-2 group-hover:border-emerald-200/50 relative overflow-hidden"
                        >
                          <div className={`absolute top-0 left-0 w-1.5 h-full ${chip.bgClass.replace('bg-', 'bg-').replace('/80', '-500')}`} />

                          <div className="flex items-start justify-between mb-4">
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide ${chip.bgClass} ${chip.className} ${chip.borderClass} border`}>
                              <ChipIcon className="w-3.5 h-3.5" />
                              {chip.label}
                            </div>
                            <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl ${entry.analysis.healthScore >= 70 ? 'bg-emerald-100 text-emerald-700' : entry.analysis.healthScore >= 40 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                              <span className="text-lg font-bold">{entry.analysis.healthScore}</span>
                            </div>
                          </div>

                          <p className="text-slate-700 font-medium line-clamp-2 mb-4 leading-relaxed">
                            {entry.analysis.overallHealth}
                          </p>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400 md:hidden">{formatTimestamp(entry.analyzedAt)}</span>
                            <span className="text-emerald-600 font-bold flex items-center gap-1 group-hover:gap-2 transition-all ml-auto">
                              View Details <ArrowUpRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedEntry(null)}
          />
          <div className="relative w-full max-w-2xl bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-fade-in-up">

            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-slate-100 flex items-start justify-between bg-white/50">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatTimestamp(selectedEntry.analyzedAt)}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Analysis Report</h2>
              </div>
              <button
                onClick={() => setSelectedEntry(null)}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
              <div className="flex items-center gap-6 mb-8">
                <div className={`flex flex-col items-center justify-center w-24 h-24 rounded-3xl ${selectedEntry.analysis.healthScore >= 70 ? 'bg-emerald-100 text-emerald-700' : selectedEntry.analysis.healthScore >= 40 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                  <span className="text-4xl font-bold">{selectedEntry.analysis.healthScore}</span>
                  <span className="text-xs font-bold uppercase opacity-70">Score</span>
                </div>
                <div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-bold uppercase tracking-wide mb-2 ${verdictChips[selectedEntry.analysis.momVerdict].bgClass} ${verdictChips[selectedEntry.analysis.momVerdict].className}`}>
                    {(() => {
                      const ChipIcon = verdictChips[selectedEntry.analysis.momVerdict].icon;
                      return <ChipIcon className="w-4 h-4" />;
                    })()}
                    {verdictChips[selectedEntry.analysis.momVerdict].label}
                  </div>
                  <p className="text-slate-600 font-medium">
                    Age Group: <span className="text-slate-900">{selectedEntry.age} years</span>
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-emerald-500" />
                    Expert&apos;s Advice
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedEntry.analysis.momAdvice}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {selectedEntry.analysis.pros.length > 0 && (
                    <div>
                      <h3 className="font-bold text-emerald-700 mb-4 flex items-center gap-2">
                        Positives
                      </h3>
                      <ul className="space-y-3">
                        {selectedEntry.analysis.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selectedEntry.analysis.cons.length > 0 && (
                    <div>
                      <h3 className="font-bold text-rose-700 mb-4 flex items-center gap-2">
                        Concerns
                      </h3>
                      <ul className="space-y-3">
                        {selectedEntry.analysis.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {selectedEntry.analysis.ingredients && (
                  <div>
                    <h3 className="font-bold text-slate-900 mb-4">Detected Ingredients</h3>
                    {typeof selectedEntry.analysis.ingredients === 'string' ? (
                      <div className="bg-slate-50 rounded-2xl p-4 text-sm text-slate-600 font-mono border border-slate-100">
                        {selectedEntry.analysis.ingredients}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedEntry.analysis.ingredients.map((ing, idx) => (
                          <div key={idx} className="p-3 rounded-xl border bg-slate-50 border-slate-100">
                            <div className="font-bold text-slate-900 text-sm mb-1">{ing.name}</div>
                            <p className="text-xs text-slate-500 line-clamp-2">{ing.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
              <button
                onClick={() => {
                  deleteEntry(selectedEntry.id);
                  setSelectedEntry(null);
                }}
                className="text-rose-600 font-bold hover:text-rose-700 flex items-center gap-2 text-sm"
              >
                <Trash2 className="w-4 h-4" />
                Delete Entry
              </button>
              <button
                onClick={() => setSelectedEntry(null)}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
