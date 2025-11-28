import { LucideIcon } from 'lucide-react';

interface StepCardProps {
    number: number;
    icon: LucideIcon;
    title: string;
    description: string;
}

export default function StepCard({ number, icon: Icon, title, description }: StepCardProps) {
    return (
        <div className="relative flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-lg border border-emerald-100 flex items-center justify-center mb-6 z-10 relative group-hover:scale-110 transition-transform duration-500">
                <Icon className="w-8 h-8 text-emerald-600" />
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {number}
                </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
            <p className="text-slate-600 leading-relaxed max-w-xs mx-auto">
                {description}
            </p>
        </div>
    );
}
