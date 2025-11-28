'use client';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductHistoryEntry } from '@/types/analysis';
import { motion } from 'framer-motion';

interface Props {
  entries: ProductHistoryEntry[];
  selected: ProductHistoryEntry[];
  onClose: () => void;
}

export default function ComparisonModal({ entries, selected, onClose }: Props) {
  const [currentPair, setCurrentPair] = useState(0);

  if (selected.length < 2) return null;

  const pair = selected.slice(currentPair * 2, (currentPair + 1) * 2);
  const left = pair[0]!;
  const right = pair[1] || pair[0];

  const diffScore = Math.abs(left.analysis.healthScore - right.analysis.healthScore);
  const verdictDiff = left.analysis.momVerdict !== right.analysis.momVerdict;

  const getChip = (verdict: ProductHistoryEntry['analysis']['momVerdict']) => ({
    take_it: { label: 'Approved', className: 'text-emerald-400 bg-emerald-500/20 border-emerald-400/50' },
    avoid_it: { label: 'Avoid', className: 'text-red-400 bg-red-500/20 border-red-400/50' },
    think_twice: { label: 'Caution', className: 'text-amber-400 bg-amber-500/20 border-amber-400/50' },
  }[verdict] || { label: 'Caution', className: 'text-amber-400 bg-amber-500/20 border-amber-400/50' });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, rotateX: -10 }}
        animate={{ scale: 1, rotateX: 0 }}
        className="w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl glass-panel shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 p-6 bg-slate-900/80 backdrop-blur-md border-b border-cyan-500/20 flex items-center justify-between font-orbitron">
          <h2 className="text-2xl text-cyan-400 tracking-wider animate-pulse-slow">
            PRODUCT COMPARISON [{selected.length}]
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-orange-500/20 rounded-xl">
            <X className="w-6 h-6 text-slate-400 hover:text-orange-400 transition-colors" />
          </button>
        </div>

        <div className="p-8 grid lg:grid-cols-2 gap-8 relative">
          {/* Vein overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0">
            <defs>
              <filter id="vein-glow">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id="veinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f5ff"/>
                <stop offset="50%" stopColor="#ff9500"/>
                <stop offset="100%" stopColor="#00f5ff"/>
              </linearGradient>
            </defs>
            <path d="M 0 0 L 100vw 50vh L 0 100vh Z" fill="none" stroke="url(#veinGrad)" strokeWidth="1.5" className="bio-vein" pathLength="1"/>
          </svg>

          {/* Left */}
          <motion.section initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="relative z-10 space-y-6">
            <div className="text-center">
              <div className={`inline-block px-6 py-3 rounded-xl font-orbitron text-3xl font-black border-4 ${getChip(left.analysis.momVerdict).className} animate-pulse`}>
                {left.analysis.healthScore}
              </div>
              <p className="text-slate-400 mt-2 font-exo uppercase tracking-wide">{left.analysis.momVerdict.replace('_', ' ').toUpperCase()}</p>
            </div>
            <ul className="space-y-2">
              {left.analysis.pros?.map((pro, i) => (
                <li key={i} className="flex items-center text-emerald-400 font-exo">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-ping-slow"/> {pro}
                </li>
              ))}
              {left.analysis.cons?.map((con, i) => (
                <li key={i} className="flex items-center text-red-400 font-exo">
                  <div className="w-2 h-2 bg-red-400 rounded-full mr-3 animate-ping-slow"/> {con}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Right */}
          <motion.section initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="relative z-10 space-y-6">
            <div className="text-center">
              <div className={`inline-block px-6 py-3 rounded-xl font-orbitron text-3xl font-black border-4 ${getChip(right.analysis.momVerdict).className} animate-pulse`}>
                {right.analysis.healthScore}
              </div>
              <p className="text-slate-400 mt-2 font-exo uppercase tracking-wide">{right.analysis.momVerdict.replace('_', ' ').toUpperCase()}</p>
            </div>
            <ul className="space-y-2">
              {right.analysis.pros?.map((pro, i) => (
                <li key={i} className="flex items-center text-emerald-400 font-exo">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-ping-slow"/> {pro}
                </li>
              ))}
              {right.analysis.cons?.map((con, i) => (
                <li key={i} className="flex items-center text-red-400 font-exo">
                  <div className="w-2 h-2 bg-red-400 rounded-full mr-3 animate-ping-slow"/> {con}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Diff */}
          {diffScore > 20 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="col-span-full p-6 bg-orange-500/10 border-2 border-orange-500/30 rounded-xl mt-8 font-orbitron">
              <h3 className="text-orange-400 mb-2 text-xl">VITALITY DELTA: {diffScore}%</h3>
              <p className="text-slate-300">{verdictDiff ? 'CRITICAL SHIFT DETECTED' : 'PROFILES ALIGNED'}</p>
            </motion.div>
          )}
        </div>

        {/* Pagination if more */}
        {selected.length > 2 && (
          <div className="p-6 flex justify-center items-center gap-4 bg-slate-900/50 border-t border-cyan-500/20 font-exo">
            <ChevronLeft className="w-8 h-8 text-cyan-400 cursor-pointer hover:scale-110 transition-transform p-2 rounded-lg hover:bg-cyan-500/20" onClick={() => setCurrentPair(Math.max(0, currentPair - 1))} />
            <span className="text-slate-400">{currentPair + 1} / {Math.ceil(selected.length / 2)}</span>
            <ChevronRight className="w-8 h-8 text-cyan-400 cursor-pointer hover:scale-110 transition-transform p-2 rounded-lg hover:bg-cyan-500/20" onClick={() => setCurrentPair(Math.min(Math.ceil(selected.length / 2) - 1, currentPair + 1))} />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}