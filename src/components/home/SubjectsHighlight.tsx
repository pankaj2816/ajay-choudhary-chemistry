'use client';

import React from 'react';
import Link from 'next/link';
import { Atom, Sparkles, TestTubes, ArrowRight, CheckCircle2, BookOpen, FileText } from 'lucide-react';

const SUBJECTS_DATA = [
  {
    id: 'organic',
    title: 'Organic Chemistry',
    tagline: 'Reaction Mechanisms & Synthesis',
    badge: 'Specialized Expertise',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800',
    description: 'Master electron movements, electrophilic & nucleophilic attacks, named reactions, functional group conversions, and stereochemistry without memorization panic.',
    topics: [
      'General Organic Chemistry (GOC)',
      'Reaction Mechanisms & Curved Arrows',
      'Named Reactions & Conversions',
      'Hydrocarbons & Haloalkanes',
      'Aldehydes, Ketones & Carboxylic Acids',
      'Isomerism & Stereochemistry'
    ],
    materialsLink: '/study-materials?subject=Organic+Chemistry',
    papersLink: '/question-papers?subject=Organic+Chemistry',
    accentColor: 'from-cyan-600 to-blue-600',
    icon: Atom,
    iconBg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
  },
  {
    id: 'inorganic',
    title: 'Inorganic Chemistry',
    tagline: 'Periodic Trends & Coordination Complexes',
    badge: 'Conceptual Mastery',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800',
    description: 'Understand the underlying quantum principles behind periodic properties, chemical bonding, molecular orbital theory, and transition metal coordination chemistry.',
    topics: [
      'Periodic Classification & Atomic Trends',
      'Chemical Bonding & MOT Diagrams',
      'Coordination Compounds & CFT Splitting',
      'p-Block & d-Block Chemistry',
      'Metallurgy & Extraction Principles',
      'Inorganic Reaction Trends'
    ],
    materialsLink: '/study-materials?subject=Inorganic+Chemistry',
    papersLink: '/question-papers?subject=Inorganic+Chemistry',
    accentColor: 'from-teal-600 to-emerald-600',
    icon: Sparkles,
    iconBg: 'bg-teal-500/10 text-teal-600 dark:text-teal-400'
  },
  {
    id: 'practical',
    title: 'Practical Chemistry',
    tagline: 'Qualitative Analysis & Lab Techniques',
    badge: 'Hands-on & Viva Prep',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800',
    description: 'Connect classroom theory with laboratory experiments. Master systematic cation/anion salt analysis flowcharts, titration calculations, and functional group tests.',
    topics: [
      'Qualitative Salt Analysis (Group 0 to VI)',
      'Volumetric Titration & Calculations',
      'Organic Functional Group Tests',
      'Flame & Borax Bead Confirmations',
      'Laboratory Safety & Apparatus Setup',
      'Board Viva Voce Preparation'
    ],
    materialsLink: '/study-materials?subject=Practical+Chemistry',
    papersLink: '/question-papers?subject=Practical+Chemistry',
    accentColor: 'from-indigo-600 to-purple-600',
    icon: TestTubes,
    iconBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
  }
];

export default function SubjectsHighlight() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 font-bold text-xs">
            <Atom className="w-3.5 h-3.5" />
            Core Specializations
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Comprehensive Chemistry Expertise
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Delivering deep conceptual clarity across the three foundational pillars of Senior Secondary and Competitive Chemistry.
          </p>
        </div>

        {/* 3 Subject Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SUBJECTS_DATA.map((subj) => {
            const Icon = subj.icon;
            return (
              <div
                key={subj.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div className="space-y-4">
                  
                  {/* Top Icon & Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className={`w-12 h-12 rounded-2xl ${subj.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${subj.badgeColor}`}>
                      {subj.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-cyan-700 transition-colors">
                      {subj.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      {subj.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {subj.description}
                  </p>

                  {/* Topic Checklist */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Core Syllabus Modules
                    </span>
                    <ul className="space-y-1.5">
                      {subj.topics.map((topic, i) => (
                        <li key={i} className="text-xs text-slate-700 font-medium flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span className="truncate">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Bottom Actions */}
                <div className="pt-6 mt-6 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <Link
                    href={subj.materialsLink}
                    className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Study Notes</span>
                  </Link>

                  <Link
                    href={subj.papersLink}
                    className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-600" />
                    <span>Test Papers</span>
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Explorer Link */}
        <div className="text-center mt-12">
          <Link
            href="/subjects"
            className="inline-flex items-center gap-2 text-sm font-bold text-cyan-700 hover:text-cyan-800 hover:underline"
          >
            <span>Explore Complete Subject Syllabi & Chapter Breakdown</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
