import ProductAnalyzer from '@/components/ProductAnalyzer';

export default function AnalyzerPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute top-1/3 -left-32 h-[500px] w-[500px] rounded-full bg-cyan-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-amber-100/30 blur-3xl" />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl mb-2">
              Analyze Your Product
            </h1>
            <p className="text-lg text-slate-600">
              Get instant health insights
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-[36px] bg-gradient-to-br from-emerald-200/60 via-white to-emerald-100/50 opacity-80 blur-2xl" />
            <div className="relative rounded-[32px] border border-white/60 bg-white/80 p-4 shadow-[0_40px_100px_-60px_rgba(16,185,129,0.65)] backdrop-blur-xl sm:p-6 md:p-10">
              <ProductAnalyzer />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
