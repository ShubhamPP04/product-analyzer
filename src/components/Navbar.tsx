'use client';

import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { Home, History, Camera, Menu, X, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Logo from './Logo';
import { usePathname } from 'next/navigation';

// Static data moved outside component
const NAV_ITEMS = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Analyzer', href: '/analyzer', icon: Camera },
  { name: 'History', href: '/history', icon: History },
];

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Throttled scroll handler using requestAnimationFrame
  useEffect(() => {
    const handleScroll = () => {
      lastScrollY.current = window.scrollY;
      
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrolled(lastScrollY.current > 20);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = useCallback((href: string) => pathname === href, [pathname]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-slate-200/50 py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative z-50">
              <Logo className="h-10 w-10 sm:h-11 sm:w-11 group-hover:scale-110 transition-transform duration-300" />
              <div className="block">
                <h1 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight leading-tight">
                  Product Analyzer
                </h1>
                <p className="text-[10px] sm:text-xs font-medium text-emerald-600 tracking-wide uppercase">
                  Smart Health Insights
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2 bg-white/80 backdrop-blur-xl rounded-2xl p-1.5 shadow-lg border border-slate-100">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative flex items-center gap-2 rounded-xl px-5 py-2.5 font-medium transition-all duration-300 ${
                      active
                        ? 'text-white'
                        : 'text-slate-500 hover:text-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    {active && (
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg" />
                    )}
                    <Icon className={`relative z-10 h-4 w-4 ${active ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/analyzer"
                className="group flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                <span>Scan Now</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="relative z-50 rounded-xl p-3 btn-touch bg-white border border-slate-200 hover:bg-slate-50 transition-all duration-300 active:scale-95 block lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-slate-700" />
              ) : (
                <Menu className="h-6 w-6 text-slate-600" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 bg-white shadow-2xl transition-transform duration-500 ease-out lg:hidden pt-24 pb-8 rounded-b-3xl ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`relative flex items-center gap-4 rounded-2xl px-5 py-4 font-medium transition-all overflow-hidden ${
                    active
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className={`p-2 rounded-xl ${active ? 'bg-white/20' : 'bg-slate-100'}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-lg">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile CTA */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <Link
              href="/analyzer"
              onClick={closeMobileMenu}
              className="flex items-center justify-center gap-2 w-full px-5 py-4 rounded-2xl font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
            >
              <Sparkles className="w-5 h-5" />
              <span>Start Scanning</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Navbar);
