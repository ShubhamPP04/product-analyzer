import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
    return (
        <div className="relative group flex flex-col items-center text-center p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 overflow-hidden">
            {/* Background Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

            {/* Icon */}
            <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 text-white text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 ease-in-out">
                <Icon className="w-10 h-10 drop-shadow-md" />
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow" />
            </div>

            {/* Content */}
            <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-emerald-700 transition-colors duration-300">
                {title}
            </h3>
            <p className="text-slate-600 leading-relaxed">
                {description}
            </p>
        </div>
    );
}
