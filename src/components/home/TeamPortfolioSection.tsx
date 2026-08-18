'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, GraduationCap, Building2, Mail, Sparkles, CheckCircle2, Award, FlaskConical, Atom } from 'lucide-react';
import { TeamMember } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import { useLanguage } from '@/context/LanguageContext';
import SafeImage from '@/components/ui/SafeImage';

export default function TeamPortfolioSection() {
  const { t } = useLanguage();
  const [portfolio, setPortfolio] = useState<TeamMember[]>(initialDatabase.teamMembers);

  useEffect(() => {
    fetch('/api/team')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setPortfolio(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 font-bold text-xs">
            <Camera className="w-3.5 h-3.5 text-cyan-600" />
            {t.portfolio.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.portfolio.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.portfolio.subtitle}
          </p>
        </div>

        {/* Big Portfolio Photo Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl mb-14 bg-slate-900 group">
          <div className="relative h-64 sm:h-80 md:h-96 w-full">
            <SafeImage
              src="/images/teaching-team.jpg"
              alt="Ajay Choudhary Chemistry Laboratory Practical Demonstration"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          </div>

          <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                {t.portfolio.bannerTag}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {t.portfolio.bannerHeading}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {t.portfolio.bannerSub}
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/about"
                className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs sm:text-sm font-bold shadow-lg transition-colors inline-flex items-center gap-1.5"
              >
                <GraduationCap className="w-4 h-4" />
                <span>{t.portfolio.readBio}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Individual Specialization / Teaching Focus Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolio.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                {/* Smart Domain Visual Header */}
                {item.id === 'team-1' ? (
                  // 1. Organic Chemistry Smart Visualizer Header
                  <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-5 flex flex-col justify-between overflow-hidden border-b border-slate-800 text-white">
                    {/* Ambient Glow */}
                    <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none"></div>
                    
                    <div className="flex items-center justify-between z-10">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                        <Atom className="w-3 h-3 text-cyan-400" />
                        Mechanism Roadmap
                      </span>
                      <span className="text-[11px] font-mono text-cyan-400/80 font-bold">GOC • Named Reactions</span>
                    </div>

                    {/* Styled Reaction Card */}
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-inner space-y-1.5 z-10">
                      <div className="text-[11px] font-mono font-bold text-cyan-300 flex items-center justify-between">
                        <span>R-CH₂-OH</span>
                        <span className="text-slate-400 text-[10px]">⟶ [O] ⟶</span>
                        <span>R-CHO</span>
                        <span className="text-slate-400 text-[10px]">⟶ [O] ⟶</span>
                        <span className="text-emerald-400">R-COOH</span>
                      </div>
                      <div className="flex flex-wrap gap-1 pt-1">
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">Curved Arrows</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Carbocation Stability</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">SN1 / SN2</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-white z-10 pt-1">
                      <span className="text-xs font-bold bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-700">
                        {item.role}
                      </span>
                    </div>
                  </div>
                ) : item.id === 'team-3' ? (
                  // 2. Inorganic Chemistry Smart Visualizer Header
                  <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 p-5 flex flex-col justify-between overflow-hidden border-b border-slate-800 text-white">
                    {/* Ambient Glow */}
                    <div className="absolute bottom-0 right-0 w-36 h-36 bg-teal-500/15 rounded-full blur-2xl pointer-events-none"></div>

                    <div className="flex items-center justify-between z-10">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-teal-400" />
                        CFT & Periodic Models
                      </span>
                      <span className="text-[11px] font-mono text-teal-400/80 font-bold">MOT • d & f Block</span>
                    </div>

                    {/* Styled Coordination / CFT Card */}
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-inner space-y-1.5 z-10">
                      <div className="text-[11px] font-mono font-bold text-teal-300 flex items-center justify-between">
                        <span>[Fe(CN)₆]³⁻</span>
                        <span className="text-xs text-amber-400 font-sans">Δₒ Splitting</span>
                        <span className="text-teal-400">t₂g⁵ eg⁰</span>
                      </div>
                      <div className="flex flex-wrap gap-1 pt-1">
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">Low Spin Pairing</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Lanthanoid Contraction</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Coordination Isomerism</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-white z-10 pt-1">
                      <span className="text-xs font-bold bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-700">
                        {item.role}
                      </span>
                    </div>
                  </div>
                ) : (
                  // 3. Practical Chemistry: Genuine Laboratory Photo
                  <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                    <SafeImage
                      src="/images/ajay-lab-practical.jpg"
                      alt={item.role}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                      <span className="text-xs font-bold bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-700">
                        {item.role}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-cyan-700 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs font-semibold text-cyan-700">
                      {item.designation}
                    </p>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1.5">
                    <div className="flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                      <span><strong>Domain:</strong> {item.specialization}</span>
                    </div>

                    <div className="flex items-start gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span className="truncate"><strong>Center:</strong> {item.centers}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed pt-1 border-t border-slate-100">
                    {item.bio}
                  </p>
                </div>
              </div>

              <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold text-slate-700">{item.experience}</span>
                <Link
                  href="/contact"
                  className="text-cyan-700 hover:text-cyan-900 font-bold flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Inquire</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
