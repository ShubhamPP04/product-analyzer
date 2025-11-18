import ProductAnalyzer from '@/components/ProductAnalyzer';

export default function AnalyzerPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc]">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] sm:w-[50%] h-[50%] bg-emerald-200/30 rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[120px] animate-blob" />
        <div className="absolute top-[-10%] right-[-10%] w-[70%] sm:w-[50%] h-[50%] bg-cyan-200/30 rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[70%] sm:w-[50%] h-[50%] bg-teal-200/30 rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[120px] animate-blob animation-delay-4000" />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-20 sm:py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 sm:mb-12 text-center animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-3 sm:mb-4">
              Analyze Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">Product</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-2">
              Upload or capture a photo of the ingredients label to get instant, AI-powered health insights tailored to you.
            </p>
          </div>

          <div className="relative animate-fade-in-up delay-100">
            <div className="absolute -inset-1 rounded-[36px] bg-gradient-to-br from-emerald-400/30 via-cyan-400/30 to-teal-400/30 blur-2xl opacity-50" />
            <div className="relative">
              <ProductAnalyzer />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
