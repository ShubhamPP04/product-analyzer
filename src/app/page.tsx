'use client';

import { ArrowRight, Camera, History, Shield, Heart, Zap, Scan, Search, CheckCircle, Lock, Star } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import FeatureCard from "@/components/FeatureCard";
import StepCard from "@/components/StepCard";
import Accordion from "@/components/Accordion";
import Logo from "@/components/Logo";

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

  const steps = [
    {
      number: 1,
      icon: Scan,
      title: "Scan Product",
      description: "Point your camera at any packaged food ingredient label."
    },
    {
      number: 2,
      icon: Search,
      title: "AI Analysis",
      description: "Our advanced AI decodes ingredients and nutritional values instantly."
    },
    {
      number: 3,
      icon: CheckCircle,
      title: "Get Verdict",
      description: "Receive a clear health score and personalized recommendations."
    }
  ];

  const faqs = [
    {
      title: "How accurate is the analysis?",
      content: "Our AI is trained on a vast database of food ingredients and nutritional guidelines. While highly accurate, we always recommend verifying with a professional for serious medical conditions."
    },
    {
      title: "Is my data private?",
      content: "Yes! All processing happens locally on your device where possible, and we do not store images of your food scans. Your health data remains yours."
    },
    {
      title: "Does it work for Indian products?",
      content: "Absolutely. We have specifically tuned our model to recognize common Indian ingredients, brands, and dietary habits."
    },
    {
      title: "Is it free to use?",
      content: "Yes, the core scanning and analysis features are completely free to use to help you make healthier choices."
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
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
            <div className="mb-24 lg:mb-32">
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

              {/* CTAs */}
              <div className="flex flex-col lg:flex-row gap-6 mb-16 items-stretch lg:items-center">
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
            </div>

            {/* Features */}
            <div className="mb-32">
              <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-16 text-center tracking-tight">
                Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">Product Analyzer?</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 h-fit">
                {features.map((feature, index) => (
                  <FeatureCard key={index} {...feature} />
                ))}
              </div>
            </div>

            {/* How It Works */}
            <div className="mb-32">
              <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-16 text-center tracking-tight">
                How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">Works</span>
              </h2>
              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-emerald-200 via-cyan-200 to-emerald-200 border-t-2 border-dashed border-emerald-300/50 -z-10" />

                {steps.map((step, index) => (
                  <StepCard key={index} {...step} />
                ))}
              </div>
            </div>

            {/* Trust & Privacy */}
            <div className="mb-32 bg-white/40 backdrop-blur-xl rounded-[3rem] p-8 lg:p-16 border border-white/50 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/50 text-emerald-700 font-bold text-sm mb-6">
                    <Lock className="w-4 h-4" /> Privacy First
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                    Your Health Data <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">Stays Yours.</span>
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed mb-8">
                    We believe in privacy by design. Your food scans are processed locally whenever possible, and we never sell your personal health data to third parties.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Local processing for faster results",
                      "No hidden tracking",
                      "Transparent algorithms"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-3xl bg-gradient-to-br from-slate-100 to-white shadow-2xl border border-white/50 flex items-center justify-center p-8">
                    <Shield className="w-32 h-32 text-emerald-500 drop-shadow-2xl" />
                  </div>
                  {/* Floating Elements */}
                  <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-emerald-100 animate-float">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Lock className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-semibold">Security</p>
                        <p className="text-sm font-bold text-slate-900">Enterprise Grade</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="mb-32">
              <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-16 text-center tracking-tight">
                Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">Health Enthusiasts</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "Priya S.", role: "Nutritionist", text: "Finally an app that understands Indian ingredients! It's been a game changer for my clients." },
                  { name: "Rahul M.", role: "Fitness Coach", text: "The age-personalized scoring is brilliant. It helps me tailor advice for different age groups instantly." },
                  { name: "Anjali K.", role: "Mother of two", text: "I use this every time I go grocery shopping. It's so reassuring to know what's really in the packet." }
                ].map((testimonial, i) => (
                  <div key={i} className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-lg hover:shadow-xl transition-all">
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-slate-700 mb-6 leading-relaxed">&quot;{testimonial.text}&quot;</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-white font-bold">
                        {testimonial.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{testimonial.name}</p>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="mb-32">
              <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-16 text-center tracking-tight">
                Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">Questions</span>
              </h2>
              <Accordion items={faqs} />
            </div>

            {/* Final CTA */}
            <div className="text-center mb-24">
              <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-8 tracking-tight">
                Ready to Eat <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">Smarter?</span>
              </h2>
              <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
                Join thousands of users making better food choices every day.
              </p>
              <Link
                href="/analyzer"
                className="inline-flex items-center gap-3 bg-slate-900 text-white font-bold text-xl px-12 py-6 rounded-full hover:bg-slate-800 hover:scale-105 transition-all shadow-2xl shadow-slate-900/30"
              >
                Start Scanning Now <ArrowRight className="w-6 h-6" />
              </Link>
            </div>

          </div>
        </div>
      </main>

      <footer className="relative py-16 bg-gradient-to-t from-slate-50/50 to-transparent backdrop-blur-xl border-t border-white/30 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 text-center lg:text-left">
            <div className="flex items-center gap-4">
              <Logo className="w-14 h-14" />
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