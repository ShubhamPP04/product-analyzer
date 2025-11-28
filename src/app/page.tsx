'use client';

import { ArrowRight, Camera, History, Shield, Heart, Zap } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Deep Ingredient Scan",
      description: "AI reveals hidden sugars, additives, allergens instantly."
    },
    {
      icon: Heart,
      title: "Age-Personalized Score",
      description: "Custom health rating for Indian diets & your age."
    },
    {
      icon: Zap,
      title: "Instant Verdict",
      description: "Take/avoid/think advice with actionable swaps."
    }
  ];

  const cursorStyle = {
    left: `${mousePos.x}px`,
    top: `${mousePos.y}px`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-cyan-50 overflow-hidden relative">
      {/* Custom Cursor */}
      <div
        className="fixed w-2 h-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full z-50 mix-blend-difference pointer-events-none transition-all duration-300 opacity-60 blur-sm scale-150 cursor-follow"
        style={cursorStyle}
      />

      <main className="relative pt-24 sm:pt-32 pb-20 sm:pb-24">
        {/* Dynamic Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-200/20 rounded-[60%] rotate-12 pulse-slow" />
          <div className="absolute top-1/2 right-[-20%] w-[70vh] h-[70vh] bg-cyan-200/20 rounded-[40%] -rotate-6 pulse delay-2000" />
          <div className="absolute -bottom-40 left-1/4 w-80 h-80 bg-gradient-to-br from-teal-200/30 to-emerald-300/20 rounded-full blur-3xl float" />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-tl from-rose-200/20 to-cyan-200/20 rounded-[50%] blur-xl spin-slow" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className={`max-w-7xl mx-auto transition-all duration-[1200ms] cubic-bezier(0.23,1,0.32,1) ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>

            {/* Badge */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mb-12 lg:mb-16 -skew-x-3 lg:hover:skew-x-0 transition-transform duration-500 group">
              <div className="bg-gradient-to-r from-emerald-500/90 to-cyan-500/90 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/30 shadow-2xl shadow-emerald-500/20 -skew-x-3 group-hover:skew-x-0">
                <span className="text-sm font-bold text-white drop-shadow-lg tracking-wide flex items-center gap-2">
                  <div className="w-2 h-2 bg-white/80 rounded-full ping-slow" />
                  AI Health Scanner • India-First
                </span>
              </div>
            </div>

            {/* Hero */}
            <div className="mb-16 lg:mb-24">
              <div className="relative">
                <h1 className="text-[5rem] lg:text-[9rem] xl:text-[10rem] font-black tracking-[-0.05em] text-slate-900 leading-[0.85] mb-8 -skew-y-3 hover:skew-y-0 transition-all duration-700 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 bg-clip-text text-transparent drop-shadow-2xl">
                  Scan.
                  <br />
                  <span className="text-transparent bg-gradient-to-r from-emerald-600 via-cyan-500 to-emerald-400 bg-clip-text drop-shadow-3xl -skew-x-6 inline-block">
                    Know.
                  </span>
                  <br />
                  Thrive.
                </h1>
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-emerald-400/30 to-cyan-400/30 rounded-full blur-3xl spin-slow -z-10" />
              </div>
              <p className="text-xl lg:text-2xl font-light text-slate-600/90 max-w-2xl leading-relaxed tracking-wide mb-12 opacity-90 drop-shadow-sm">
                Camera-powered AI analyzes labels instantly. Get age-tailored verdicts, ingredients decoded,
                and smart swaps for Indian kitchens.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col lg:flex-row gap-6 mb-24 lg:mb-32 items-stretch lg:items-center">
              <Link
                href="/analyzer"
                className="group relative flex-1 lg:flex-none bg-gradient-to-b from-emerald-500 to-emerald-600 text-white font-bold text-lg px-12 py-8 rounded-3xl shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-600/60 hover:-translate-y-3 transition-all duration-500 overflow-hidden border border-emerald-400/30 backdrop-blur-md"
              >
                <div className="absolute inset-0 bg-white/10 -skew-y-6 rotate-1 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0 transition-all duration-700" />
                <div className="relative flex items-center gap-4">
                  <Camera className="h-8 w-8 drop-shadow-lg group-hover:scale-110 transition-transform" />
                  <span>Scan Now</span>
                  <ArrowRight className="h-6 w-6 ml-auto group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
              <Link
                href="/history"
                className="group flex-1 lg:flex-none justify-center items-center gap-4 bg-white/80 backdrop-blur-xl rounded-3xl px-12 py-8 font-bold text-lg text-slate-800 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-emerald-300/30 hover:text-emerald-600 border border-slate-200/50 hover:border-emerald-300/50 transition-all duration-500 hover:-translate-y-2"
              >
                <History className="h-7 w-7 opacity-80 group-hover:opacity-100 group-hover:rotate-12 transition-all" />
                Past Scans
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 h-fit">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative rounded-3xl p-8 md:p-10 backdrop-blur-xl bg-white/60 border border-white/30 shadow-xl hover:shadow-2xl hover:shadow-emerald-300/50 transition-all duration-500 hover:-translate-y-4 h-full flex flex-col justify-between cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/70 to-cyan-50/70 opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10" />
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-all duration-500 mx-auto">
                    <feature.icon className="h-8 w-8 md:h-10 md:w-10 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4 tracking-tight group-hover:text-emerald-600 transition-all drop-shadow-lg text-center">{feature.title}</h3>
                    <p className="text-base md:text-lg text-slate-700 leading-relaxed text-center opacity-95">{feature.description}</p>
                  </div>
                  <div className="absolute bottom-4 right-4 w-20 h-20 bg-white/40 rounded-2xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="relative py-16 bg-gradient-to-t from-slate-50/50 to-transparent backdrop-blur-xl border-t border-white/30 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 text-center lg:text-left">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-2xl border-4 border-white/50">
                <span className="text-2xl font-bold">🇮🇳</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-1">Product Analyzer</h4>
                <p className="text-emerald-600 font-semibold">Scan Smart, Eat Healthy</p>
              </div>
            </div>
            <div className="flex gap-8 text-sm font-medium">
              <Link href="/privacy" className="text-slate-600 hover:text-emerald-600 transition-all hover:underline underline-offset-4">Privacy</Link>
              <Link href="/terms" className="text-slate-600 hover:text-emerald-600 transition-all hover:underline underline-offset-4">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}