'use client';

import { useState, useEffect } from 'react';
import { Home, History, Camera, Menu, X, Heart } from 'lucide-react';
import Link from 'next/link';
import Logo from './Logo';
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
    { name: 'Analyzer', href: '/analyzer', icon: Camera },  // Added import Camera from 'lucide-react' below
    { name: 'History', href: '/history', icon: History },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileMenuOpen
          ? 'bg-white/90 backdrop-blur-2xl border-b border-white/30 shadow-xl shadow-white/20 py-3'
          : 'bg-transparent/80 backdrop-blur-xl py-4 sm:py-5'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative z-50">
              <Logo className="h-10 w-10 sm:h-11 sm:w-11 group-hover:scale-110 transition-transform duration-300" />
              <div className="block">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-tight">Product Analyzer</h1>
                <p className="text-[10px] sm:text-xs font-medium text-emerald-600 tracking-wide uppercase">Smart Health Insights</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-3 bg-white/80 backdrop-blur-2xl rounded-3xl p-2.5 shadow-2xl shadow-white/30 backdrop-blur-md">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-medium transition-all duration-300 ${active
                      ? 'bg-white/95 backdrop-blur-lg text-emerald-700 shadow-xl shadow-emerald-200/60 scale-105'
                      : 'text-slate-400 hover:bg-white/90 hover:text-emerald-600 hover:shadow-sm hover:shadow-emerald-50/30 hover:scale-105'
                      }`}
                  >
                    <Icon className={`h-4 w-4 ${active ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button - Hidden on desktop */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative z-50 rounded-2xl p-3 btn-touch text-slate-400 bg-white/80 backdrop-blur-xl border-transparent hover:bg-white/90 hover:text-emerald-600 transition-all duration-300 shadow-lg shadow-white/40 hover:shadow-xl hover:shadow-emerald-100/50 active:scale-95 block lg:!hidden"
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
        className={`fixed inset-0 z-40 bg-white/20 backdrop-blur-2xl transition-all duration-500 lg:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-2xl shadow-2xl shadow-white/50 transition-transform duration-500 ease-out lg:hidden pt-24 pb-8 rounded-b-4xl ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
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
                    ? 'bg-gradient-to-r from-emerald-50/90 to-cyan-50/90 text-emerald-700 shadow-lg shadow-emerald-200/50'
                    : 'text-slate-400 hover:bg-white/80 hover:text-emerald-600 border-transparent'
                    }`}
                >
                  <div className={`p-2 rounded-xl ${active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-50 text-slate-400'}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-lg">{item.name}</span>
                </Link>
              );
            })}
          </div>


        </div>
      </div>
    </>
  );
}
