import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
    return (
        <div className="group relative rounded-3xl p-8 md:p-10 backdrop-blur-xl bg-white/60 border border-white/30 shadow-xl hover:shadow-2xl hover:shadow-emerald-300/50 transition-all duration-500 hover:-translate-y-4 h-full flex flex-col justify-between cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/70 to-cyan-50/70 opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10" />

            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-all duration-500 mx-auto">
                <Icon className="h-8 w-8 md:h-10 md:w-10 text-white drop-shadow-lg" />
            </div>

            <div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4 tracking-tight group-hover:text-emerald-600 transition-all drop-shadow-lg text-center">
                    {title}
                </h3>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed text-center opacity-95">
                    {description}
                </p>
            </div>

            <div className="absolute bottom-4 right-4 w-20 h-20 bg-white/40 rounded-2xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75" />
        </div>
    );
}
