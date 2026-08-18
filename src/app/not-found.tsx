'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FlaskConical, 
  Search, 
  BookOpen, 
  FileText, 
  CheckCircle, 
  Home, 
  ArrowRight,
  Mail,
  Sparkles
} from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center px-4 py-16 relative overflow-hidden">
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-2xl w-full text-center space-y-6 relative z-10">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-bold text-xs shadow-lg">
          <FlaskConical className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Reaction Error: 404 - Element Not Found</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
          Chemical Formula <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Missing</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-md mx-auto leading-relaxed">
          The requested page, note, or experiment document has dissolved or was moved. Let&rsquo;s get you back on track with Ajay Sir&rsquo;s chemistry repository.
        </p>

        {/* Quick Search Shortcut */}
        <div className="pt-2">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-white text-xs sm:text-sm font-medium transition-all shadow-md group"
          >
            <Search className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Search Study Notes, Papers & Solutions...</span>
            <kbd className="hidden sm:inline bg-slate-800 text-[10px] px-2 py-0.5 rounded text-slate-400 border border-slate-700">⌘K</kbd>
          </Link>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 text-left">
          <Link
            href="/study-materials"
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all group"
          >
            <BookOpen className="w-5 h-5 text-cyan-400 mb-2 group-hover:translate-x-0.5 transition-transform" />
            <h3 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">Study Materials</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Handwritten notes & reaction maps</p>
          </Link>

          <Link
            href="/question-papers"
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/40 transition-all group"
          >
            <FileText className="w-5 h-5 text-teal-400 mb-2 group-hover:translate-x-0.5 transition-transform" />
            <h3 className="text-xs font-bold text-white group-hover:text-teal-300 transition-colors">Question Papers</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Unit tests & Board mock exams</p>
          </Link>

          <Link
            href="/solutions"
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 transition-all group"
          >
            <CheckCircle className="w-5 h-5 text-indigo-400 mb-2 group-hover:translate-x-0.5 transition-transform" />
            <h3 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">Verified Solutions</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Step-by-step mechanisms & keys</p>
          </Link>
        </div>

        {/* Home & Contact Buttons */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Ask Ajay Sir</span>
          </Link>
        </div>

      </div>

    </div>
  );
}
