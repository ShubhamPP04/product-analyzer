'use client';

import { Trophy, Star, Search, Zap, Lock } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    condition: (stats: UserStats) => boolean;
}

export interface UserStats {
    scanCount: number;
    healthyCount: number;
    ingredientClicks: number;
}

export const ACHIEVEMENTS: Achievement[] = [
    {
        id: 'first_step',
        title: 'First Step',
        description: 'Complete your first product scan',
        icon: Search,
        condition: (stats) => stats.scanCount >= 1,
    },
    {
        id: 'health_nut',
        title: 'Health Nut',
        description: 'Find 5 "Recommended" products',
        icon: HeartIcon,
        condition: (stats) => stats.healthyCount >= 5,
    },
    {
        id: 'detective',
        title: 'Detective',
        description: 'Complete 10 scans',
        icon: Search,
        condition: (stats) => stats.scanCount >= 10,
    },
    {
        id: 'ingredient_expert',
        title: 'Ingredient Expert',
        description: 'Explore 5 ingredient details',
        icon: Zap,
        condition: (stats) => stats.ingredientClicks >= 5,
    },
    {
        id: 'super_scanner',
        title: 'Super Scanner',
        description: 'Complete 50 scans',
        icon: Trophy,
        condition: (stats) => stats.scanCount >= 50,
    },
];

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 14c1.49-1.28 3.6-2.33 3.6-5.27 0-3-2.54-5.27-5.4-5.27a5.4 5.4 0 0 0-4.2 2.22A5.4 5.4 0 0 0 8.8 3.46C5.94 3.46 3.4 5.73 3.4 8.73c0 2.94 2.11 3.99 3.6 5.27L12 21l7-7Z" />
        </svg>
    );
}

export default function Achievements() {
    const [unlocked, setUnlocked] = useState<string[]>([]);

    useEffect(() => {
        const storedStats = localStorage.getItem('product-analyzer-stats');
        if (storedStats) {
            const parsedStats = JSON.parse(storedStats);

            const unlockedIds = ACHIEVEMENTS.filter(a => a.condition(parsedStats)).map(a => a.id);
            setUnlocked(unlockedIds);
        }
    }, []);

    return (
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/50 shadow-lg mb-12">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-amber-100 rounded-2xl text-amber-600">
                    <Trophy className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Achievements</h2>
                    <p className="text-slate-500 text-sm">Unlock badges as you scan</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ACHIEVEMENTS.map((achievement) => {
                    const isUnlocked = unlocked.includes(achievement.id);
                    const Icon = achievement.icon;

                    return (
                        <div
                            key={achievement.id}
                            className={`relative p-4 rounded-2xl border transition-all duration-300 ${isUnlocked
                                ? 'bg-gradient-to-br from-white to-amber-50 border-amber-200 shadow-md'
                                : 'bg-slate-50 border-slate-100 opacity-70 grayscale'
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-xl ${isUnlocked ? 'bg-amber-100 text-amber-600' : 'bg-slate-200 text-slate-400'
                                    }`}>
                                    {isUnlocked ? <Icon className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                                </div>
                                <div>
                                    <h3 className={`font-bold ${isUnlocked ? 'text-slate-900' : 'text-slate-500'}`}>
                                        {achievement.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                        {achievement.description}
                                    </p>
                                </div>
                            </div>
                            {isUnlocked && (
                                <div className="absolute top-2 right-2">
                                    <Star className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
