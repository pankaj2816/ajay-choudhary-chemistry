'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FlaskConical, 
  Search, 
  Menu, 
  X, 
  ShieldCheck, 
  Bell, 
  BookOpen, 
  FileText, 
  CheckCircle, 
  User, 
  PhoneCall,
  Sparkles
} from 'lucide-react';
import SearchModal from '@/components/ui/SearchModal';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Subjects', href: '/subjects' },
  { label: 'Updates', href: '/updates', hasBadge: true },
  { label: 'Study Materials', href: '/study-materials' },
  { label: 'Question Papers', href: '/question-papers' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <>
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-slate-950/90 backdrop-blur-md shadow-lg border-b border-slate-800/80 py-2.5' 
            : 'bg-slate-950 border-b border-slate-800/50 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo & Teacher Brand */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-indigo-600 p-0.5 shadow-md group-hover:shadow-cyan-500/20 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white text-base sm:text-lg tracking-tight group-hover:text-cyan-400 transition-colors">
                  Ajay Choudhary
                </span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded">
                  8+ Yrs
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                Chemistry Educator • Organic | Inorganic | Practical
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-950/60 shadow-sm border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                  {link.hasBadge && (
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Tools */}
          <div className="flex items-center gap-2.5">
            {/* Search Trigger Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-xl text-xs transition-all shadow-inner group"
              title="Search website (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-block bg-slate-800 text-slate-400 text-[10px] px-1.5 py-0.5 rounded border border-slate-700 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Admin Portal Link */}
            <Link
              href="/admin"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 text-xs font-semibold border border-slate-700/80 transition-colors"
              title="Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Admin</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold ${
                      isActive
                        ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800/80'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.hasBadge && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-800"
              >
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                <span>Search Topics & Notes</span>
              </button>

              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-4 rounded-xl bg-cyan-950 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 border border-cyan-500/30"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
