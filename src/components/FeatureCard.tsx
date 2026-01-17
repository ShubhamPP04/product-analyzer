import React, { memo } from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    accentColor?: 'emerald' | 'cyan' | 'violet';
}

const colors = {
    emerald: {
        gradient: 'from-emerald-500 to-teal-500',
        bg: 'bg-emerald-50',
        text: 'text-emerald-600',
        border: 'border-emerald-100',
        shadow: 'hover:shadow-emerald-100/50'
    },
    cyan: {
        gradient: 'from-cyan-500 to-blue-500',
        bg: 'bg-cyan-50',
        text: 'text-cyan-600',
        border: 'border-cyan-100',
        shadow: 'hover:shadow-cyan-100/50'
    },
    violet: {
        gradient: 'from-violet-500 to-purple-500',
        bg: 'bg-violet-50',
        text: 'text-violet-600',
        border: 'border-violet-100',
        shadow: 'hover:shadow-violet-100/50'
    }
};

function FeatureCard({ 
    icon: Icon, 
    title, 
    description, 
    accentColor = 'emerald' 
}: FeatureCardProps) {
    const c = colors[accentColor];

    return (
        <div className="relative group cursor-pointer h-full">
            <div className={`relative h-full p-8 rounded-3xl bg-white border ${c.border} transition-all duration-500 hover:shadow-2xl ${c.shadow} hover:-translate-y-2`}>
                {/* Subtle gradient overlay on hover */}
                <div className={`absolute inset-0 rounded-3xl ${c.bg} opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center h-full">
                    {/* Icon */}
                    <div className={`relative mb-6 w-20 h-20 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                        <Icon className="w-10 h-10 text-white" />
                        
                        {/* Glow effect */}
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500`} />
                    </div>

                    {/* Title */}
                    <h3 className={`text-xl font-bold text-slate-800 mb-3 group-hover:${c.text} transition-colors duration-300`}>
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-500 leading-relaxed text-sm flex-grow">
                        {description}
                    </p>

                    {/* Bottom accent */}
                    <div className={`mt-6 w-12 h-1 rounded-full bg-gradient-to-r ${c.gradient} opacity-0 group-hover:opacity-100 group-hover:w-20 transition-all duration-500`} />
                </div>
            </div>
        </div>
    );
}

export default memo(FeatureCard);
