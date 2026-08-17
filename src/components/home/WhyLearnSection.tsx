'use client';

import React from 'react';
import { 
  Award, 
  Building2, 
  Lightbulb, 
  Atom, 
  TestTubes, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';

const PILLARS = [
  {
    icon: Award,
    title: '8+ Years of Academic Mastery',
    description: 'Years of dedicated classroom teaching provide deep insight into exact student stumbling blocks in Organic conversions and equilibrium calculations.',
    badge: 'Proven Pedagogy',
    color: 'bg-cyan-500/10 text-cyan-600'
  },
  {
    icon: Building2,
    title: 'Active Across 3 Coaching Hubs',
    description: 'Regular classroom batches, personalized student mentorship, and intensive revision clinics conducted across Catalyst, Apex, and Prerana centers.',
    badge: 'Multi-Center Reach',
    color: 'bg-teal-500/10 text-teal-600'
  },
  {
    icon: Lightbulb,
    title: 'Concept-First, Zero Rote-Learning',
    description: 'No blindly memorizing reactions. Students master curved-arrow electron flow, intermediate stability, and periodic thermodynamics from first principles.',
    badge: 'Logic Over Memory',
    color: 'bg-amber-500/10 text-amber-600'
  },
  {
    icon: Atom,
    title: 'Structured Organic & Inorganic Roadmaps',
    description: 'Custom reaction flowcharts, functional group synthesis pathways, and crystal field splitting models designed for maximum retention.',
    badge: 'Visual Chemistry',
    color: 'bg-indigo-500/10 text-indigo-600'
  },
  {
    icon: TestTubes,
    title: 'Practical Laboratory Insight & Viva Prep',
    description: 'Bridging textbook theory with qualitative salt analysis, flame tests, redox titrations, and group separation logic for full practical marks.',
    badge: 'Hands-on Science',
    color: 'bg-emerald-500/10 text-emerald-600'
  },
  {
    icon: Sparkles,
    title: 'Instant Online Resources & Solutions',
    description: 'Students get immediate access to notice board updates, downloadable test question papers, model answer keys, and handwritten notes.',
    badge: '24/7 Digital Platform',
    color: 'bg-rose-500/10 text-rose-600'
  }
];

import { useLanguage } from '@/context/LanguageContext';

export default function WhyLearnSection() {
  const { t } = useLanguage();

  const pillars = [
    {
      icon: Award,
      title: t.whyLearn.pillar1Title,
      description: t.whyLearn.pillar1Desc,
      badge: 'Proven Pedagogy',
      color: 'bg-cyan-500/10 text-cyan-600'
    },
    {
      icon: Building2,
      title: t.whyLearn.pillar2Title,
      description: t.whyLearn.pillar2Desc,
      badge: 'Multi-Center Reach',
      color: 'bg-teal-500/10 text-teal-600'
    },
    {
      icon: Lightbulb,
      title: t.whyLearn.pillar3Title,
      description: t.whyLearn.pillar3Desc,
      badge: 'Logic Over Memory',
      color: 'bg-amber-500/10 text-amber-600'
    },
    {
      icon: Atom,
      title: t.whyLearn.pillar4Title,
      description: t.whyLearn.pillar4Desc,
      badge: 'Visual Chemistry',
      color: 'bg-indigo-500/10 text-indigo-600'
    },
    {
      icon: TestTubes,
      title: t.whyLearn.pillar5Title,
      description: t.whyLearn.pillar5Desc,
      badge: 'Hands-on Science',
      color: 'bg-emerald-500/10 text-emerald-600'
    },
    {
      icon: Sparkles,
      title: t.whyLearn.pillar6Title,
      description: t.whyLearn.pillar6Desc,
      badge: '24/7 Digital Platform',
      color: 'bg-rose-500/10 text-rose-600'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 font-bold text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            {t.whyLearn.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.whyLearn.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.whyLearn.subtitle}
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl ${pillar.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-teal-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>Concept-First Pedagogy</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
