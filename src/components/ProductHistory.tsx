'use client';

import { Clock, History, ArrowUpRight, Heart, Ban, AlertTriangle } from 'lucide-react';
import { ProductHistoryEntry } from '../types/analysis';

interface ProductHistoryProps {
  history: ProductHistoryEntry[];
  onSelect: (entry: ProductHistoryEntry) => void;
  compact?: boolean;
}

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

export default function ProductHistory({ history, onSelect, compact = false }: ProductHistoryProps) {
  if (!history.length) {
    return null;
  }

  const cardClasses = compact
    ? 'glass-panel rounded-3xl p-5 sm:p-6'
    : 'glass-panel rounded-3xl p-5 sm:p-8';

  const visibleHistory = compact ? history.slice(0, 3) : history.slice(0, 6);

  return (
    <div className={cardClasses}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 rounded-2xl p-3">
            <History className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Recent Analyses</h3>
            <p className="text-sm text-slate-500">Tap an item to revisit its insights.</p>
          </div>
        </div>
        {!compact && history.length > 6 && (
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Latest 6</span>
        )}
      </div>

      <ul className="space-y-4">
        {visibleHistory.map((entry) => {
          const chip = verdictChips[entry.analysis.momVerdict] ?? verdictChips.think_twice;
          const ChipIcon = chip.icon;

          return (
            <li key={entry.id}>
              <button
                type="button"
                onClick={() => onSelect(entry)}
                className="w-full text-left group"
              >
                <div className="rounded-2xl border border-slate-100 bg-white/50 hover:bg-white hover:shadow-lg hover:border-emerald-100 transition-all duration-300 p-4 sm:p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs sm:text-sm text-slate-400 font-medium">
                    <span className="inline-flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {formatTimestamp(entry.analyzedAt)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                      View
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold ${chip.className}`}>
                      <ChipIcon className="h-4 w-4" />
                      {chip.label}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wide text-slate-400">Score</span>
                      <span className={`text-lg font-bold ${entry.analysis.healthScore >= 70 ? 'text-emerald-600' : entry.analysis.healthScore >= 40 ? 'text-amber-600' : 'text-rose-600'}`}>
                        {entry.analysis.healthScore}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {entry.analysis.overallHealth}
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {!compact && history.length === 0 && (
        <p className="text-sm text-slate-500 text-center py-8">No history yet. Analyze a product to see it here.</p>
      )}
    </div>
  );
}
