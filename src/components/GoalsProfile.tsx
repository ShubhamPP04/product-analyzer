'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { NutritionGoal } from '@/types/analysis';

interface Props {
  goals: NutritionGoal[];
  onChange: (goals: NutritionGoal[]) => void;
}

const GOALS: NutritionGoal[] = [
  'low-sugar',
  'high-protein',
  'vegan',
  'nut-free',
  'dairy-free',
  'low-salt',
  'low-fat',
  'gluten-free'
];

const goalLabels: Record<NutritionGoal, string> = {
  'low-sugar': 'Low Sugar',
  'high-protein': 'High Protein',
  'vegan': 'Vegan',
  'nut-free': 'Nut-Free',
  'dairy-free': 'Dairy-Free',
  'low-salt': 'Low Salt',
  'low-fat': 'Low Fat',
  'gluten-free': 'Gluten-Free'
};

export default function GoalsProfile({ goals, onChange }: Props) {
  const toggleGoal = (goal: NutritionGoal) => {
    const newGoals = goals.includes(goal)
      ? goals.filter(g => g !== goal)
      : [...goals, goal];
    onChange(newGoals);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-bold uppercase tracking-wide text-slate-400 mb-4 font-orbitron">
        Nutrition Goals
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {GOALS.map((goal) => {
          const active = goals.includes(goal);
          return (
            <motion.button
              key={goal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`group relative p-4 rounded-xl border-2 transition-all font-exo text-sm font-bold h-20 flex flex-col items-center justify-center backdrop-blur-sm ${
                active
                  ? 'border-cyan-400/70 bg-gradient-to-br from-cyan-500/30 to-orange-500/20 text-cyan-200 shadow-2xl shadow-cyan-500/30 animate-pulse-slow'
                  : 'border-slate-600/30 bg-slate-900/30 text-slate-400 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-200 hover:shadow-cyan-500/20'
              }`}
              onClick={() => toggleGoal(goal)}
            >
              <div className={`w-5 h-5 rounded-full mb-1 transition-all group-hover:rotate-12 shadow-md ${
                active ? 'bg-gradient-to-r from-cyan-400 to-orange-400 shadow-cyan-500/50 animate-ping-slow' : 'bg-slate-700/50'
              }`}>
                {active && <Check className="w-3.5 h-3.5 m-0.5 text-slate-900 font-bold" />}
              </div>
              <span className="text-xs tracking-wide capitalize leading-tight">{goalLabels[goal]}</span>
            </motion.button>
          );
        })}
      </div>
      {goals.length === 0 && (
        <p className="text-slate-500 text-xs italic text-center font-exo">
          Select goals for personalized analysis (optional)
        </p>
      )}
    </div>
  );
}
