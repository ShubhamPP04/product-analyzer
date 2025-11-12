'use client';

import { ArrowRight, Camera, History, Heart, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Shield className="h-10 w-10 text-emerald-600" />,
      title: "Ingredient Analysis",
      description: "Deep analysis of product ingredients and their health impact"
    },
    {
      icon: <Heart className="h-10 w-10 text-emerald-600" />,
      title: "Health Rating",
      description: "Personalized health score based on your age and dietary needs"
    },
    {
      icon: <Zap className="h-10 w-10 text-emerald-600" />,
      title: "Instant Insights",
      description: "Get results in seconds with our advanced AI technology"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50">
      <main className="flex-grow pt-16 pb-24">
        <div className="relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute top-1/3 right-10 w-80 h-80 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="max-w-4xl mx-auto text-center mb-16 mt-12">
                <div className="inline-block mb-6">
                  <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium">
                    India&apos;s #1 Product Analyzer
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
                  Know What You&apos;re{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">
                    Eating
                  </span>
                </h1>

                <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-12">
                  Scan any product label and get instant health insights. Make informed choices for your family&apos;s wellness with AI-powered analysis.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                  <Link
                    href="/analyzer"
                    className="group relative flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-5 text-lg font-semibold text-white shadow-lg shadow-emerald-200 transition-all duration-300 hover:from-emerald-700 hover:to-emerald-800 hover:scale-105 hover:shadow-xl"
                  >
                    <Camera className="h-6 w-6" />
                    <span>Get Started</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    <div className="absolute inset-0 rounded-full border border-white/10" />
                  </Link>

                  <Link
                    href="/history"
                    className="group flex items-center justify-center gap-3 rounded-full border-2 border-emerald-600 bg-white/80 backdrop-blur-sm px-8 py-5 text-lg font-semibold text-emerald-700 transition-all duration-300 hover:bg-emerald-50 hover:scale-105 shadow-md"
                  >
                    <History className="h-6 w-6" />
                    <span>View History</span>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {features.map((feature, index) => (
                    <div 
                      key={index} 
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex justify-center mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center text-sm text-gray-600 mb-4 md:mb-0">
              Made with 💚 for India
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-emerald-700 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-emerald-700 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}