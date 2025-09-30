import { Sparkles, ShieldCheck, Camera, History, ArrowRight, Heart, Zap, Users } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Analysis',
    description: 'Advanced Gemini AI reads and understands product labels instantly.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: ShieldCheck,
    title: 'Age-Specific Guidance',
    description: 'Get personalized recommendations based on your age and health needs.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Heart,
    title: 'Mom-Style Care',
    description: 'Warm, caring advice that feels like talking to your mother.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Snap a photo and get comprehensive health insights in seconds.',
    color: 'from-amber-500 to-orange-500',
  },
];

const steps = [
  {
    number: '1',
    title: 'Enter Your Age',
    description: 'Tell us your age for personalized insights',
  },
  {
    number: '2',
    title: 'Capture Label',
    description: 'Take a photo of the product ingredients',
  },
  {
    number: '3',
    title: 'Get Insights',
    description: 'Receive detailed health analysis instantly',
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute top-1/3 -left-32 h-[500px] w-[500px] rounded-full bg-cyan-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-amber-100/30 blur-3xl" />
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/80 px-5 py-2.5 shadow-sm backdrop-blur">
              <span className="text-2xl">🇮🇳</span>
              <span className="text-sm font-semibold text-green-700">Built for Indian Families</span>
            </div>
            
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
              Know What You&apos;re
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> Eating</span>
            </h1>
            
            <p className="mb-10 text-lg text-slate-600 md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
              Scan any product label and get instant health insights with caring, mom-style guidance. Make informed choices for your family&apos;s wellness.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/analyzer"
                className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-green-200 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-green-300"
              >
                <Camera className="h-6 w-6" />
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                href="/history"
                className="flex items-center gap-3 rounded-2xl border-2 border-green-600 bg-white px-8 py-4 text-lg font-semibold text-green-600 transition-all hover:bg-green-50"
              >
                <History className="h-6 w-6" />
                <span>View History</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-16 md:py-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Why Choose Product Analyzer?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Powerful features designed to help you make healthier choices for your family
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-6 shadow-lg backdrop-blur transition-all hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className={`mb-4 inline-flex rounded-2xl bg-gradient-to-br ${feature.color} p-4 text-white shadow-lg`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                  <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent transition duration-300 group-hover:scale-x-100" />
                </div>
              );
            })}
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                Simple as 1-2-3
              </h2>
              <p className="text-lg text-slate-600">
                Getting health insights is easier than ever
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.number} className="relative">
                  <div className="relative rounded-2xl border-2 border-green-200 bg-white p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-3xl font-bold text-white shadow-lg">
                      {step.number}
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-slate-900">{step.title}</h3>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 z-10">
                      <ArrowRight className="h-8 w-8 text-green-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/analyzer"
                className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 px-10 py-5 text-xl font-semibold text-white shadow-xl shadow-green-200 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-green-300"
              >
                <Camera className="h-6 w-6" />
                <span>Start Analyzing Now</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-4xl rounded-3xl border border-green-200 bg-gradient-to-br from-green-50 via-white to-emerald-50 p-8 md:p-12 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-xl">
                <Users className="h-12 w-12 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="mb-3 text-2xl font-bold text-slate-900 md:text-3xl">
                  Trusted by Indian Families
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Join thousands of families making healthier choices every day. Our AI-powered analysis helps you understand what&apos;s really in your food, with guidance that feels like home.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-green-100 bg-white/50 backdrop-blur">
          <div className="container mx-auto px-4 py-8">
            <p className="text-center text-sm text-slate-500">
              Made with 💚 for India • Product insights are for informational purposes only
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

