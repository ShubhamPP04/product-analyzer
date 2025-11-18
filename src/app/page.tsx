'use client';

import { ArrowRight, Camera, History, Heart, Shield, Zap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-emerald-600" />,
      title: "Ingredient Analysis",
      description: "Deep AI analysis of product ingredients to uncover hidden health impacts."
    },
    {
      icon: <Heart className="h-8 w-8 text-rose-500" />,
      title: "Health Rating",
      description: "Personalized health score tailored to your specific dietary needs and age."
    },
    {
      icon: <Zap className="h-8 w-8 text-amber-500" />,
      title: "Instant Insights",
      description: "Get comprehensive results in seconds with our advanced scanning technology."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] overflow-hidden">
      <main className="relative pt-24 sm:pt-32 pb-20 sm:pb-24">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[70%] sm:w-[50%] h-[50%] bg-emerald-200/30 rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[120px] animate-blob" />
          <div className="absolute top-[-10%] right-[-10%] w-[70%] sm:w-[50%] h-[50%] bg-cyan-200/30 rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[120px] animate-blob animation-delay-2000" />
          <div className="absolute bottom-[-10%] left-[20%] w-[70%] sm:w-[50%] h-[50%] bg-teal-200/30 rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[120px] animate-blob animation-delay-4000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-5xl mx-auto text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-100 shadow-sm mb-6 sm:mb-8 animate-fade-in-up">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs sm:text-sm font-medium text-emerald-800">India&apos;s #1 Health Companion</span>
            </div>

            {/* Hero Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 mb-6 sm:mb-8 leading-[1.1] animate-fade-in-up delay-100">
              Know What You&apos;re{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600">
                Eating
              </span>
            </h1>

            {/* Hero Description */}
            <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 mb-10 sm:mb-12 leading-relaxed animate-fade-in-up delay-200 px-4">
              Scan any product label and get instant, AI-powered health insights.
              Make smarter choices for you and your family&apos;s wellness.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center mb-16 sm:mb-24 animate-fade-in-up delay-300 px-4 sm:px-0">
              <Link
                href="/analyzer"
                className="group relative flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-emerald-200/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-300/50 hover:-translate-y-1 overflow-hidden w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Camera className="h-6 w-6" />
                <span>Start Scanning</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/history"
                className="group flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-semibold text-slate-700 shadow-lg shadow-slate-200/50 border border-slate-100 transition-all duration-300 hover:shadow-xl hover:shadow-slate-300/50 hover:-translate-y-1 hover:text-emerald-600 w-full sm:w-auto"
              >
                <History className="h-6 w-6 transition-colors group-hover:text-emerald-600" />
                <span>View History</span>
              </Link>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto animate-fade-in-up delay-300 px-2 sm:px-0">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="glass-panel rounded-3xl p-6 sm:p-8 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group"
                >
                  <div className="mb-4 sm:mb-6 inline-flex p-3 sm:p-4 rounded-2xl bg-slate-50 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3 group-hover:text-emerald-700 transition-colors">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="py-10 sm:py-12 border-t border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                🇮🇳
              </div>
              <p className="text-sm font-medium text-slate-600">
                Made with 💚 for a healthier India
              </p>
            </div>
            <div className="flex gap-6 sm:gap-8">
              <Link href="/privacy" className="text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}