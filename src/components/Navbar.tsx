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

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'History', href: '/history', icon: History },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm py-3'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-600 shadow-lg shadow-emerald-200/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-emerald-300/50 overflow-hidden">
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-2xl relative z-10">🇮🇳</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Product Analyzer</h1>
              <p className="text-xs font-medium text-emerald-600 tracking-wide uppercase">Smart Health Insights</p>
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
            className="md:hidden rounded-xl p-2.5 text-slate-600 bg-white/50 backdrop-blur-md border border-white/40 hover:bg-white hover:text-emerald-600 transition-all shadow-sm"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 px-4 pb-4 animate-fade-in-up">
            <div className="glass-panel rounded-2xl p-2 flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3.5 font-medium transition-all ${active
                        ? 'bg-emerald-50/80 text-emerald-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-600'
                      }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
