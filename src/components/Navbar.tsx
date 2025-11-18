'use client';

import { useState, useEffect } from 'react';
import { Home, History, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'History', href: '/history', icon: History },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileMenuOpen
          ? 'bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm py-3'
          : 'bg-transparent py-4 sm:py-5'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative z-50">
              <div className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-600 shadow-lg shadow-emerald-200/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-emerald-300/50 overflow-hidden">
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-xl sm:text-2xl relative z-10">🇮🇳</span>
              </div>
              <div className="block">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-tight">Product Analyzer</h1>
                <p className="text-[10px] sm:text-xs font-medium text-emerald-600 tracking-wide uppercase hidden sm:block">Smart Health Insights</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2 bg-white/50 backdrop-blur-md rounded-full p-1.5 border border-white/40 shadow-sm">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-medium transition-all duration-300 ${active
                      ? 'bg-white text-emerald-700 shadow-md shadow-emerald-100/50'
                      : 'text-slate-600 hover:bg-white/60 hover:text-emerald-600'
                      }`}
                  >
                    <Icon className={`h-4 w-4 ${active ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative z-50 rounded-xl p-2 text-slate-600 bg-white/50 backdrop-blur-md border border-white/40 hover:bg-white hover:text-emerald-600 transition-all shadow-sm active:scale-95"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 bg-white shadow-xl transition-transform duration-300 ease-in-out md:hidden pt-24 pb-6 rounded-b-3xl ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-4 rounded-2xl px-5 py-4 font-medium transition-all ${active
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-600 border border-transparent'
                    }`}
                >
                  <div className={`p-2 rounded-xl ${active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-lg">{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs font-medium text-slate-400">
              Made with 💚 for a healthier India
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
