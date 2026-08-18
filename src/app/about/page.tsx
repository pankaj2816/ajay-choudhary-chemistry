'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Award, 
  Building2, 
  Atom, 
  Sparkles, 
  CheckCircle2, 
  GraduationCap, 
  Users, 
  FlaskConical
} from 'lucide-react';
import { TeamMember } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import SafeImage from '@/components/ui/SafeImage';
import { useLanguage } from '@/context/LanguageContext';
import { getTeam } from '@/lib/dataService';

export default function AboutPage() {
  const { t } = useLanguage();
  const [team, setTeam] = useState<TeamMember[]>(initialDatabase.teamMembers);

  useEffect(() => {
    getTeam()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setTeam(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const methodologySteps = [
    {
      step: '01',
      title: t.about.step1Title,
      description: t.about.step1Desc
    },
    {
      step: '02',
      title: t.about.step2Title,
      description: t.about.step2Desc
    },
    {
      step: '03',
      title: t.about.step3Title,
      description: t.about.step3Desc
    },
    {
      step: '04',
      title: t.about.step4Title,
      description: t.about.step4Desc
    },
    {
      step: '05',
      title: t.about.step5Title,
      description: t.about.step5Desc
    },
    {
      step: '06',
      title: t.about.step6Title,
      description: t.about.step6Desc
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Top Hero Banner */}
      <section className="bg-slate-950 text-white chem-hero-gradient py-16 sm:py-20 border-b border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-bold text-xs">
              <GraduationCap className="w-3.5 h-3.5" />
              {t.about.heroBadge}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              {t.about.heroTitle}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
              {t.about.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Main Bio Section */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Portrait Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/5] w-full max-w-md mx-auto">
                <SafeImage
                  src="/images/ajay-choudhary.jpg"
                  alt="Ajay Choudhary Sir Chemistry Teacher"
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <h3 className="text-xl font-black">Ajay Choudhary Sir</h3>
                  <p className="text-xs text-cyan-400 font-semibold">M.Sc. Chemistry, B.Ed (8+ Years Exp)</p>
                  <p className="text-[11px] text-slate-300">Catalyst • Apex • Prerana Learning Centers</p>
                </div>
              </div>
            </div>

            {/* Bio Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">
                  {t.about.journeyBadge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {t.about.journeyTitle}
                </h2>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {t.about.journeyP1}
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {t.about.journeyP2}
              </p>

              {/* Stat Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-2xl font-black text-slate-900">{t.about.statExp}</div>
                  <div className="text-xs font-bold text-slate-600">{t.about.statExpLabel}</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-2xl font-black text-cyan-700">{t.about.statCenters}</div>
                  <div className="text-xs font-bold text-slate-600">{t.about.statCentersLabel}</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                  <div className="text-2xl font-black text-teal-700">{t.about.statStudents}</div>
                  <div className="text-xs font-bold text-slate-600">{t.about.statStudentsLabel}</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Teaching Philosophy & 6-Step Methodology */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              {t.about.philosophyBadge}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              {t.about.philosophyQuote}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {t.about.philosophySub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {methodologySteps.map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 font-mono font-black text-sm flex items-center justify-center border border-cyan-500/30">
                  {item.step}
                </div>
                <h3 className="text-base font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3 Coaching Centers Section */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-bold text-xs">
              <Building2 className="w-3.5 h-3.5" />
              {t.about.centersBadge}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t.about.centersTitle}
            </h2>
            <p className="text-sm text-slate-600">
              {t.about.centersSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t.about.center1Name}</h3>
              <p className="text-xs text-slate-600">Plot 42, Knowledge Park, Sector 14</p>
              <div className="pt-2 border-t border-slate-200 space-y-1.5 text-xs text-slate-700">
                <div><strong>Batch:</strong> {t.about.center1Batch}</div>
                <div><strong>Schedule:</strong> {t.about.center1Schedule}</div>
              </div>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t.about.center2Name}</h3>
              <p className="text-xs text-slate-600">B-Block Main Market, Model Town</p>
              <div className="pt-2 border-t border-slate-200 space-y-1.5 text-xs text-slate-700">
                <div><strong>Batch:</strong> {t.about.center2Batch}</div>
                <div><strong>Schedule:</strong> {t.about.center2Schedule}</div>
              </div>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t.about.center3Name}</h3>
              <p className="text-xs text-slate-600">3rd Floor, Scholar Towers, South Extension</p>
              <div className="pt-2 border-t border-slate-200 space-y-1.5 text-xs text-slate-700">
                <div><strong>Batch:</strong> {t.about.center3Batch}</div>
                <div><strong>Schedule:</strong> {t.about.center3Schedule}</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Teaching Portfolio & Classroom Gallery */}
      <section id="portfolio" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 font-bold text-xs">
              <Users className="w-3.5 h-3.5" />
              {t.portfolio.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t.portfolio.title}
            </h2>
            <p className="text-sm text-slate-600">
              {t.portfolio.subtitle}
            </p>
          </div>

          {/* Multi-Center Academic Teaching Hub */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl mb-12 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                  {t.portfolio.bannerTag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {t.portfolio.bannerHeading}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {t.portfolio.bannerSub}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-cyan-400 block">{t.about.center1Name}</span>
                  <span className="text-[11px] text-slate-300 font-medium">Sector 14 Center</span>
                  <p className="text-[11px] text-slate-400">{t.about.center1Batch}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-teal-400 block">{t.about.center2Name}</span>
                  <span className="text-[11px] text-slate-300 font-medium">Model Town Center</span>
                  <p className="text-[11px] text-slate-400">{t.about.center2Batch}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-indigo-400 block">{t.about.center3Name}</span>
                  <span className="text-[11px] text-slate-300 font-medium">South Extension Center</span>
                  <p className="text-[11px] text-slate-400">{t.about.center3Batch}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {member.id === 'team-1' ? (
                    <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-5 flex flex-col justify-between overflow-hidden border-b border-slate-800 text-white">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                          <Atom className="w-3 h-3 text-cyan-400" />
                          Mechanism Roadmap
                        </span>
                        <span className="text-[11px] font-mono text-cyan-400/80 font-bold">GOC • Synthesis</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-inner space-y-1">
                        <div className="text-[11px] font-mono font-bold text-cyan-300 flex items-center justify-between">
                          <span>R-CH₂-OH</span>
                          <span className="text-slate-400 text-[10px]">⟶ [O] ⟶</span>
                          <span className="text-emerald-400">R-COOH</span>
                        </div>
                        <div className="flex flex-wrap gap-1 pt-1">
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">Curved Arrows</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">SN1 / SN2</span>
                        </div>
                      </div>
                      <div className="text-xs font-bold bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-700 w-fit">
                        {member.role}
                      </div>
                    </div>
                  ) : member.id === 'team-3' ? (
                    <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 p-5 flex flex-col justify-between overflow-hidden border-b border-slate-800 text-white">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-teal-400" />
                          CFT & Periodic Trends
                        </span>
                        <span className="text-[11px] font-mono text-teal-400/80 font-bold">MOT • d-Block</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-inner space-y-1">
                        <div className="text-[11px] font-mono font-bold text-teal-300 flex items-center justify-between">
                          <span>[Fe(CN)₆]³⁻</span>
                          <span className="text-xs text-amber-400 font-sans">Δₒ Splitting</span>
                          <span className="text-teal-400">t₂g⁵ eg⁰</span>
                        </div>
                        <div className="flex flex-wrap gap-1 pt-1">
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">Low Spin</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Lanthanoids</span>
                        </div>
                      </div>
                      <div className="text-xs font-bold bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-700 w-fit">
                        {member.role}
                      </div>
                    </div>
                  ) : (
                    <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-5 flex flex-col justify-between overflow-hidden border-b border-slate-800 text-white">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                          <FlaskConical className="w-3 h-3 text-indigo-400" />
                          Volumetric & Salt Analysis
                        </span>
                        <span className="text-[11px] font-mono text-indigo-400/80 font-bold">Redox • Gr 0-VI</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-inner space-y-1">
                        <div className="text-[11px] font-mono font-bold text-indigo-300 flex items-center justify-between">
                          <span>5Fe²⁺ + MnO₄⁻ + 8H⁺</span>
                          <span className="text-slate-400 text-[10px]">⟶</span>
                          <span className="text-rose-400 text-[10px] font-sans">Pink Endpoint</span>
                        </div>
                        <div className="flex flex-wrap gap-1 pt-1">
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">Brown Ring</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Mohr&apos;s Salt</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Viva Voce Prep</span>
                        </div>
                      </div>
                      <div className="text-xs font-bold bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-700 w-fit">
                        {member.role}
                      </div>
                    </div>
                  )}

                  <div className="p-6 space-y-3">
                    <div>
                      <h3 className="text-lg font-black text-slate-900">{member.name}</h3>
                      <p className="text-xs font-semibold text-cyan-700">{member.designation}</p>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1">
                      <p><strong>Specialization:</strong> {member.specialization}</p>
                      <p><strong>Centers:</strong> {member.centers}</p>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
                      {member.bio}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
                  <span className="font-semibold">{member.experience}</span>
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="text-cyan-700 font-bold hover:underline">
                      Email
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black text-white">{t.about.ctaTitle}</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            {t.about.ctaSub}
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs sm:text-sm font-bold shadow transition-colors"
            >
              {t.about.ctaContactBtn}
            </Link>
            <Link
              href="/study-materials"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-bold transition-colors"
            >
              {t.about.ctaNotesBtn}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
