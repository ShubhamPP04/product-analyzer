'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface AccordionItemProps {
    title: string;
    content: string;
    isOpen: boolean;
    onClick: () => void;
    index: number;
}

function AccordionItem({ title, content, isOpen, onClick, index }: AccordionItemProps) {
    return (
        <div className={`relative border-b border-slate-100 last:border-0 transition-all duration-300 ${isOpen ? 'bg-emerald-50/50' : ''}`}>
            {/* Left accent bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 to-cyan-500 rounded-full transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />

            <button
                className="w-full py-6 px-6 flex items-center justify-between text-left focus:outline-none group"
                onClick={onClick}
            >
                <div className="flex items-center gap-4">
                    <span className={`text-sm font-mono transition-colors duration-300 ${isOpen ? 'text-emerald-600' : 'text-slate-400'}`}>
                        0{index + 1}
                    </span>
                    
                    <span className={`text-lg font-semibold transition-all duration-300 ${isOpen ? 'text-emerald-700' : 'text-slate-700 group-hover:text-emerald-600'}`}>
                        {title}
                    </span>
                </div>

                <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-emerald-500 rotate-180' : 'bg-slate-100 group-hover:bg-emerald-100'}`}>
                    <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-slate-500 group-hover:text-emerald-600'}`} />
                </div>
            </button>

            <div className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 pl-16">
                    <p className="text-slate-600 leading-relaxed">
                        {content}
                    </p>
                </div>
            </div>
        </div>
    );
}

interface AccordionProps {
    items: { title: string; content: string }[];
}

export default function Accordion({ items }: AccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full max-w-3xl mx-auto relative">
            {/* Card container */}
            <div className="relative bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 flex items-center gap-3 border-b border-slate-100 bg-slate-50/50">
                    <HelpCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-semibold text-slate-600">Quick Answers</span>
                </div>

                {/* Accordion items */}
                <div>
                    {items.map((item, index) => (
                        <AccordionItem
                            key={index}
                            title={item.title}
                            content={item.content}
                            isOpen={openIndex === index}
                            onClick={() => handleClick(index)}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
