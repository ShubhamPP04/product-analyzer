import { History, ShieldCheck, Sparkles, Scan } from 'lucide-react';
import ProductAnalyzer from '@/components/ProductAnalyzer';

const highlights = [
  {
    icon: Sparkles,
    title: 'Gemini 2.5 Flash Lite',
    description: 'High-context AI vision built right in, no extra setup needed.',
  },
  {
    icon: ShieldCheck,
    title: 'Age-Safe Guidance',
    description: 'Recommendations adapt instantly when you update your age.',
  },
  {
    icon: Scan,
    title: 'Camera-First Workflow',
    description: 'Switch cameras, preview captures, and track analysis progress.',
  },
  {
    icon: History,
    title: 'Smart History',
    description: 'Jump back into recent products with the insights you already trust.',
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute top-1/3 -left-28 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-amber-100/30 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent" />
      </div>

      <main className="relative z-10 container mx-auto px-4 pb-16 pt-12 md:pt-16">
        <header className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/80 px-4 py-2 text-sm font-medium text-green-700 shadow-sm backdrop-blur">
            🇮🇳 Built for mindful choices
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Decode your daily products with a health companion that feels human.
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Capture any label, get a personalized wellness score, and build a living history of the items your family uses every day.
          </p>
        </header>

        <section className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2">
          {highlights.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-5 shadow-lg shadow-emerald-100/40 transition duration-200 hover:-translate-y-1 hover:bg-white/90 hover:shadow-xl backdrop-blur"
            >
              <div className="mb-4 inline-flex rounded-full bg-emerald-600/10 p-3 text-emerald-700">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-600">{description}</p>
              <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent transition duration-300 group-hover:scale-x-100" />
            </div>
          ))}
        </section>

        <section className="relative mx-auto mt-12 max-w-6xl">
          <div className="absolute -inset-1 rounded-[36px] bg-gradient-to-br from-emerald-200/60 via-white to-emerald-100/50 opacity-80 blur-2xl" />
          <div className="relative rounded-[32px] border border-white/60 bg-white/80 p-4 shadow-[0_40px_100px_-60px_rgba(16,185,129,0.65)] backdrop-blur-xl sm:p-6 md:p-10">
            <ProductAnalyzer />
          </div>
        </section>

        <footer className="mx-auto mt-12 max-w-3xl text-center text-sm text-slate-500">
          Product insights leverage clinical guidelines but are not a substitute for medical advice. Always consult a qualified professional for diagnosis or treatment.
        </footer>
      </main>
    </div>
  );
}
