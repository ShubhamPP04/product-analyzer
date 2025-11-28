'use client';

import { useState, useEffect } from 'react';
import { X, Check, Leaf, WheatOff, MilkOff, NutOff, EggOff } from 'lucide-react';

export type DietaryPreference =
    | 'vegetarian'
    | 'non_vegetarian'
    | 'vegan'
    | 'jain'
    | 'gluten_free'
    | 'lactose_free'
    | 'nut_free'
    | 'egg_free';

interface DietarySettingsProps {
    isOpen: boolean;
    onClose: () => void;
    preferences: DietaryPreference[];
    onSave: (prefs: DietaryPreference[]) => void;
}

const PREFERENCE_OPTIONS: { id: DietaryPreference; label: string; icon: React.ComponentType<{ className?: string }>; color: string; description: string }[] = [
    {
        id: 'vegetarian',
        label: 'Vegetarian',
        icon: Leaf,
        color: 'text-emerald-600',
        description: 'No meat, fish, or poultry'
    },
    {
        id: 'vegan',
        label: 'Vegan',
        icon: Leaf,
        color: 'text-green-600',
        description: 'No animal products whatsoever'
    },
    {
        id: 'jain',
        label: 'Jain',
        icon: Leaf,
        color: 'text-emerald-700',
        description: 'Vegetarian + no root vegetables (onion, garlic, etc.)'
    },
    {
        id: 'gluten_free',
        label: 'Gluten Free',
        icon: WheatOff,
        color: 'text-amber-600',
        description: 'No wheat, barley, rye'
    },
    {
        id: 'lactose_free',
        label: 'Lactose Free',
        icon: MilkOff,
        color: 'text-blue-500',
        description: 'No dairy lactose'
    },
    {
        id: 'nut_free',
        label: 'Nut Free',
        icon: NutOff,
        color: 'text-orange-700',
        description: 'No tree nuts or peanuts'
    },
    {
        id: 'egg_free',
        label: 'Egg Free',
        icon: EggOff,
        color: 'text-yellow-600',
        description: 'No eggs'
    },
];

export default function DietarySettings({ isOpen, onClose, preferences, onSave }: DietarySettingsProps) {
    const [selected, setSelected] = useState<DietaryPreference[]>(preferences);

    useEffect(() => {
        setSelected(preferences);
    }, [preferences, isOpen]);

    const togglePreference = (id: DietaryPreference) => {
        setSelected(prev => {
            if (prev.includes(id)) {
                return prev.filter(p => p !== id);
            } else {
                // Handle mutually exclusive options if necessary (e.g., vegetarian vs non-vegetarian logic, though here we just select constraints)
                return [...prev, id];
            }
        });
    };

    const handleSave = () => {
        onSave(selected);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">Dietary Preferences</h2>
                        <p className="text-slate-500 text-sm">Select what applies to you</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X className="w-6 h-6 text-slate-400" />
                    </button>
                </div>

                {/* Options */}
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    <div className="grid gap-4">
                        {PREFERENCE_OPTIONS.map((option) => {
                            const isSelected = selected.includes(option.id);
                            const Icon = option.icon;

                            return (
                                <button
                                    key={option.id}
                                    onClick={() => togglePreference(option.id)}
                                    className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all text-left group ${isSelected
                                        ? 'border-emerald-500 bg-emerald-50/50'
                                        : 'border-slate-100 hover:border-emerald-200 hover:bg-slate-50'
                                        }`}
                                >
                                    <div className={`mt-1 p-2 rounded-full ${isSelected ? 'bg-emerald-100' : 'bg-slate-100 group-hover:bg-white'} transition-colors`}>
                                        <Icon className={`w-5 h-5 ${isSelected ? option.color : 'text-slate-400'}`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className={`font-bold ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>
                                                {option.label}
                                            </span>
                                            {isSelected && <Check className="w-5 h-5 text-emerald-500" />}
                                        </div>
                                        <p className="text-xs text-slate-500 font-medium">{option.description}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                    <button
                        onClick={handleSave}
                        className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 active:scale-[0.98] transition-all shadow-xl shadow-slate-900/20"
                    >
                        Save Preferences
                    </button>
                </div>

            </div>
        </div>
    );
}
