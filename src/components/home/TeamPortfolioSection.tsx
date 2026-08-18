'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, GraduationCap, Building2, Mail, Sparkles, CheckCircle2, Award, FlaskConical, Atom } from 'lucide-react';
import { TeamMember } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import { useLanguage } from '@/context/LanguageContext';
import SafeImage from '@/components/ui/SafeImage';
import { getTeam } from '@/lib/dataService';

export default function TeamPortfolioSection() {
  const { t } = useLanguage();
  const [portfolio, setPortfolio] = useState<TeamMember[]>(initialDatabase.teamMembers);

  useEffect(() => {
    getTeam()
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

        {/* Smart Multi-Center Academic Teaching Hub Dashboard */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl mb-14 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-10">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-bold text-xs">
                  <Building2 className="w-3.5 h-3.5" />
                  {t.portfolio.bannerTag}
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {t.portfolio.bannerHeading}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t.portfolio.bannerSub}
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/about"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold shadow-lg transition-all inline-flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>{t.portfolio.readBio}</span>
                </Link>
              </div>
            </div>

            {/* 3 Coaching Hub Badges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5 hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400">Catalyst Career Institute</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">Sector 14</span>
                </div>
                <p className="text-xs text-slate-300 font-medium">Class 12 & JEE/NEET Target Chemistry</p>
                <p className="text-[11px] text-slate-400">Intensive reaction mechanisms, DPPs & master question series.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5 hover:border-teal-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-400">Apex Science Academy</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">Model Town</span>
                </div>
                <p className="text-xs text-slate-300 font-medium">Class 11 Foundation & Inorganic Concepts</p>
                <p className="text-[11px] text-slate-400">Crystal Field Theory, bonding orbitals & thermodynamics foundation.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5 hover:border-indigo-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-400">Prerana Learning Hub</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">South Ext</span>
                </div>
                <p className="text-xs text-slate-300 font-medium">NEET Chemistry & Practical Lab Workshops</p>
                <p className="text-[11px] text-slate-400">Qualitative salt analysis, volumetric titrations & viva mastery.</p>
              </div>
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
                  // 3. Practical Chemistry: Smart Laboratory & Titration Visualizer Header
                  <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-5 flex flex-col justify-between overflow-hidden border-b border-slate-800 text-white">
                    {/* Ambient Glow */}
                    <div className="absolute top-0 left-0 w-36 h-36 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none"></div>

                    <div className="flex items-center justify-between z-10">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                        <FlaskConical className="w-3 h-3 text-indigo-400" />
                        Volumetric & Salt Analysis
                      </span>
                      <span className="text-[11px] font-mono text-indigo-400/80 font-bold">Redox • Gr 0-VI</span>
                    </div>

                    {/* Styled Titration / Salt Analysis Card */}
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-inner space-y-1.5 z-10">
                      <div className="text-[11px] font-mono font-bold text-indigo-300 flex items-center justify-between">
                        <span>5Fe²⁺ + MnO₄⁻ + 8H⁺</span>
                        <span className="text-slate-400 text-[10px]">⟶</span>
                        <span className="text-rose-400 font-sans text-[10px]">Pink Endpoint</span>
                      </div>
                      <div className="flex flex-wrap gap-1 pt-1">
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">Brown Ring [Fe(H₂O)₅(NO)]²⁺</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Mohr's Salt</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Viva Voce Prep</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-white z-10 pt-1">
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
