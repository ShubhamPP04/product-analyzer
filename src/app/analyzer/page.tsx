import ProductAnalyzer from '@/components/ProductAnalyzer';
import { Camera, Sparkles } from 'lucide-react';

export default function AnalyzerPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-hero">
      {/* Background Elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-100/50 rounded-full blur-[120px] animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-cyan-100/50 rounded-full blur-[100px] animate-blob delay-1000" />
        <div className="absolute bottom-[-10%] left-[30%] w-[600px] h-[600px] bg-violet-100/40 rounded-full blur-[120px] animate-blob delay-500" />
      </div>

      {/* Dot pattern */}
      <div className="fixed inset-0 bg-dot-pattern opacity-40 pointer-events-none -z-10" />

      <main className="relative z-10 container mx-auto px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl">
          {/* Header Section */}
          <div className="mb-8 sm:mb-12 text-center animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
              <Camera className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">AI Scanner</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-800 mb-4">
              Analyze Your <span className="text-gradient">Product</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Upload or capture a photo of the ingredients label to get instant, AI-powered health insights tailored to you.
            </p>
          </div>

          {/* Analyzer Card */}
          <div className="relative animate-fade-up delay-100">
            {/* Glow effect behind card */}
            <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-br from-emerald-200/40 via-cyan-200/30 to-violet-200/40 blur-3xl opacity-60" />
            
            <div className="relative bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden">
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500" />
              
              <div className="p-2 sm:p-4">
                <ProductAnalyzer />
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>AI-Powered Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-500" />
              <span>Instant Results</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-violet-500" />
              <span>Privacy First</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
