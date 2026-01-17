'use client';

import { LucideIcon } from 'lucide-react';

interface StepCardProps {
    number: number;
    icon: LucideIcon;
    title: string;
    description: string;
}

export default function StepCard({ number, icon: Icon, title, description }: StepCardProps) {
    const stepColors = [
        { gradient: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50', text: 'text-emerald-600' },
        { gradient: 'from-cyan-500 to-blue-500', bg: 'bg-cyan-50', text: 'text-cyan-600' },
        { gradient: 'from-violet-500 to-purple-500', bg: 'bg-violet-50', text: 'text-violet-600' }
    ];
    
    const colors = stepColors[(number - 1) % stepColors.length];

    return (
        <div className="relative flex flex-col items-center text-center group">
            {/* Main icon container */}
            <div className="relative mb-8">
                {/* Icon box */}
                <div className={`relative w-20 h-20 rounded-2xl bg-white border border-slate-100 shadow-lg flex items-center justify-center transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500`}>
                    <Icon className={`w-9 h-9 ${colors.text}`} />
                    
                    {/* Hover background */}
                    <div className={`absolute inset-0 rounded-2xl ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />
                </div>

                {/* Step number badge */}
                <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                    <span className="text-white font-bold text-sm">{number}</span>
                </div>

                {/* Decorative rings on hover */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-slate-200 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500`} />
            </div>

            {/* Content */}
            <div className="relative z-10">
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                    {title}
                </h3>
                <p className="text-slate-500 leading-relaxed max-w-xs mx-auto text-sm">
                    {description}
                </p>
            </div>
        </div>
    );
}
