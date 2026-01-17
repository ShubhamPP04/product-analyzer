'use client';

import { ArrowRight, Camera, History, Shield, Heart, Zap, Scan, Search, CheckCircle, Lock, Star, Sparkles, Play, ChevronRight, Users, TrendingUp, Globe } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import FeatureCard from "@/components/FeatureCard";
import StepCard from "@/components/StepCard";
import Accordion from "@/components/Accordion";
import Logo from "@/components/Logo";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Deep Ingredient Scan",
      description: "AI reveals hidden sugars, additives, and allergens instantly with detailed breakdown.",
      accentColor: 'emerald' as const
    },
    {
      icon: Heart,
      title: "Age-Personalized Score",
      description: "Custom health rating tailored for Indian diets and your specific age group.",
      accentColor: 'cyan' as const
    },
    {
      icon: Zap,
      title: "Instant Verdict",
      description: "Get take/avoid/think advice with actionable healthier swap suggestions.",
      accentColor: 'violet' as const
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
      description: "Advanced AI decodes ingredients and nutritional values instantly."
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

  const testimonials = [
    { name: "Priya S.", role: "Nutritionist", text: "Finally an app that understands Indian ingredients! It's been a game changer for my clients.", avatar: "P" },
    { name: "Rahul M.", role: "Fitness Coach", text: "The age-personalized scoring is brilliant. It helps me tailor advice for different age groups instantly.", avatar: "R" },
    { name: "Anjali K.", role: "Mother of two", text: "I use this every time I go grocery shopping. It's so reassuring to know what's really in the packet.", avatar: "A" }
  ];

  const stats = [
    { value: "50K+", label: "Products Scanned", icon: Scan },
    { value: "10K+", label: "Active Users", icon: Users },
    { value: "98%", label: "Accuracy Rate", icon: TrendingUp },
    { value: "100+", label: "Indian Brands", icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[100px] animate-blob" />
        <div className="absolute top-[30%] left-[-10%] w-[400px] h-[400px] bg-cyan-100/40 rounded-full blur-[80px] animate-blob delay-1000" />
        <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-violet-100/30 rounded-full blur-[120px] animate-blob delay-500" />
      </div>

      {/* Dot pattern */}
      <div className="fixed inset-0 bg-dot-pattern opacity-40 pointer-events-none -z-10" />

      <main className="relative pt-28 sm:pt-36 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Hero Section */}
          <section className={`max-w-7xl mx-auto mb-32 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-emerald-700">AI-Powered</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
                <span className="text-sm font-medium text-slate-600">Made for India</span>
              </div>
            </div>

            {/* Main Hero Content */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-8">
                  <span className="text-slate-800">Scan.</span>
                  <br />
                  <span className="text-gradient">Decode.</span>
                  <br />
                  <span className="text-slate-800">Thrive.</span>
                </h1>

                <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-xl">
                  Camera-powered AI that analyzes food labels instantly. Get age-tailored health verdicts, decoded ingredients, and smart swaps for Indian kitchens.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/analyzer"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:scale-105 transition-all duration-300"
                  >
                    <Camera className="w-6 h-6" />
                    <span>Start Scanning</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/history"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg bg-white border border-slate-200 text-slate-700 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <History className="w-5 h-5" />
                    <span>View History</span>
                  </Link>
                </div>

                {/* Quick stats */}
                <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-slate-200">
                  {stats.slice(0, 3).map((stat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                        <p className="text-sm text-slate-500">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero Visual */}
              <div className="relative hidden lg:block">
                <div className="relative w-full aspect-square max-w-lg mx-auto">
                  {/* Decorative rings */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-200 animate-spin-slow" />
                  <div className="absolute inset-8 rounded-full border-2 border-dashed border-cyan-200 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
                  
                  {/* Main card */}
                  <div className="absolute inset-16 bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 overflow-hidden">
                    {/* Scanner line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-shimmer" />
                    
                    {/* Content */}
                    <div className="h-full flex flex-col">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                        <div className="w-3 h-3 rounded-full bg-emerald-400" />
                      </div>

                      <div className="flex-1 flex flex-col justify-center items-center">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4 shadow-lg">
                          <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                        <p className="text-lg font-bold text-slate-800 mb-1">Health Score</p>
                        <p className="text-4xl font-black text-gradient-emerald">85/100</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {['Low Sugar', 'No Additives'].map((tag, i) => (
                          <div key={i} className="px-3 py-2 rounded-lg bg-emerald-50 text-center border border-emerald-100">
                            <span className="text-xs font-medium text-emerald-700">{tag}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Floating cards */}
                  <div className="absolute top-4 right-0 p-4 bg-white rounded-2xl shadow-xl border border-slate-100 animate-float">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Status</p>
                        <p className="text-sm font-bold text-slate-800">Safe to eat</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-0 p-4 bg-white rounded-2xl shadow-xl border border-slate-100 animate-float-delayed">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-cyan-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Analysis</p>
                        <p className="text-sm font-bold text-slate-800">0.3s</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">Powerful Features</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-800 mb-4">
                Why Choose <span className="text-gradient">Product Analyzer?</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Advanced AI technology meets intuitive design to give you the healthiest food choices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </section>

          {/* How It Works Section */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 mb-6">
                <Play className="w-4 h-4 text-cyan-600" />
                <span className="text-sm font-semibold text-cyan-700">Simple Process</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-800 mb-4">
                How It <span className="text-gradient">Works</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Three simple steps to make healthier food choices every day.
              </p>
            </div>

            <div className="relative">
              {/* Desktop connecting line */}
              <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-emerald-200 via-cyan-200 to-violet-200" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {steps.map((step, index) => (
                  <StepCard key={index} {...step} />
                ))}
              </div>
            </div>
          </section>

          {/* Trust & Privacy Section */}
          <section className="mb-32">
            <div className="relative bg-white rounded-3xl p-8 lg:p-16 shadow-xl border border-slate-100 overflow-hidden">
              {/* Background decorations */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-50 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm mb-6">
                    <Lock className="w-4 h-4" />
                    Privacy First
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-black text-slate-800 mb-6">
                    Your Health Data<br />
                    <span className="text-gradient">Stays Yours.</span>
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
                      <li key={i} className="flex items-center gap-4 text-slate-700">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-md">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative flex justify-center">
                  <div className="relative w-64 h-64">
                    {/* Animated rings */}
                    <div className="absolute inset-0 rounded-full border-2 border-emerald-200 animate-pulse" />
                    <div className="absolute inset-6 rounded-full border-2 border-cyan-200 animate-pulse delay-300" />
                    <div className="absolute inset-12 rounded-full border-2 border-violet-200 animate-pulse delay-500" />
                    
                    <div className="absolute inset-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-xl">
                      <Shield className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  {/* Floating badge */}
                  <div className="absolute -bottom-4 left-4 p-4 bg-white rounded-2xl shadow-xl border border-slate-100 animate-float">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Security</p>
                        <p className="text-sm font-bold text-slate-800">Enterprise Grade</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 mb-6">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-sm font-semibold text-amber-700">Testimonials</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-800 mb-4">
                Loved by <span className="text-gradient">Health Enthusiasts</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, i) => (
                <div 
                  key={i} 
                  className={`group relative bg-white p-8 rounded-2xl shadow-lg border transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
                    i === activeTestimonial ? 'border-emerald-200 shadow-emerald-100' : 'border-slate-100'
                  }`}
                >
                  {/* Quote mark */}
                  <div className="absolute top-6 left-6 text-6xl text-emerald-100 font-serif leading-none">&ldquo;</div>
                  
                  <div className="relative z-10">
                    <p className="text-slate-600 mb-8 leading-relaxed text-lg pl-8">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-lg">{testimonial.name}</p>
                        <p className="text-sm text-emerald-600 font-medium">{testimonial.role}</p>
                      </div>
                    </div>

                    <div className="flex gap-1 mt-4 justify-end">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-100 mb-6">
                <Sparkles className="w-4 h-4 text-violet-600" />
                <span className="text-sm font-semibold text-violet-700">Got Questions?</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-800 mb-4">
                Frequently Asked <span className="text-gradient">Questions</span>
              </h2>
            </div>

            <Accordion items={faqs} />
          </section>

          {/* Final CTA Section */}
          <section className="text-center mb-24">
            <div className="relative bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl p-12 lg:p-20 overflow-hidden shadow-2xl">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
                  Ready to Eat Smarter?
                </h2>
                <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                  Join thousands of users making better food choices every day.
                </p>
                <Link
                  href="/analyzer"
                  className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-bold text-xl bg-white text-emerald-600 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <span>Start Scanning Now</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative py-12 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <Logo className="w-12 h-12" />
              <div>
                <h4 className="text-xl font-bold text-slate-800">Product Analyzer</h4>
                <p className="text-emerald-600 text-sm font-medium">Scan Smart, Eat Healthy</p>
              </div>
            </div>
            <div className="flex gap-8 text-sm font-medium">
              <Link href="/privacy" className="text-slate-500 hover:text-emerald-600 transition-colors">Privacy</Link>
              <Link href="/terms" className="text-slate-500 hover:text-emerald-600 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
