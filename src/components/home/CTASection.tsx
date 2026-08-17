'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, BookOpen, Bell, PhoneCall } from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-cyan-950 via-slate-950 to-indigo-950 text-white relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold text-xs">
          <Sparkles className="w-3.5 h-3.5" />
          {t.cta.badge}
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
          {t.cta.title}
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t.cta.description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-cyan-600/30 transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2"
          >
            <Bell className="w-4 h-4" />
            <span>{t.cta.joinBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/study-materials"
            className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-sm border border-slate-700 shadow-md transition-all inline-flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>{t.hero.ctaMaterials}</span>
          </Link>

          <a
            href="tel:+919876543210"
            className="px-5 py-3.5 rounded-xl bg-slate-900/50 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 font-semibold text-sm border border-slate-800 transition-all inline-flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{t.cta.callBtn}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
