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
    ? 'bg-white rounded-2xl shadow-md border border-green-100 p-5'
    : 'bg-white rounded-2xl shadow-xl border border-green-100 p-6 sm:p-7';

  const visibleHistory = compact ? history.slice(0, 3) : history.slice(0, 6);

  return (
    <div className={cardClasses}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 rounded-full p-3">
            <History className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-800">Recent Analyses</h3>
            <p className="text-sm text-gray-500">Tap an item to revisit its insights.</p>
          </div>
        </div>
        {!compact && history.length > 6 && (
          <span className="text-sm text-gray-400">Showing latest 6</span>
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
                <div className="rounded-xl border border-green-100 group-hover:border-green-300 group-hover:bg-green-50 transition p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                    <span className="inline-flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {formatTimestamp(entry.analyzedAt)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-green-700 font-medium">
                      View
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${chip.className}`}>
                      <ChipIcon className="h-4 w-4" />
                      {chip.label}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 text-right">
                      {entry.analysis.overallHealth}
                    </p>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Health Score: {entry.analysis.healthScore}</p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">For age {entry.age}</p>
                    </div>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {!compact && history.length === 0 && (
        <p className="text-sm text-gray-500 text-center">No history yet. Analyze a product to see it here.</p>
      )}
    </div>
  );
}
