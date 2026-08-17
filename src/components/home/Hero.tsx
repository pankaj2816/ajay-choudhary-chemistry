'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FlaskConical, 
  Atom, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  BookOpen, 
  CheckCircle2, 
  GraduationCap, 
  PhoneCall, 
  ShieldCheck, 
  Compass,
  TestTubes
} from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white chem-hero-gradient pt-8 sm:pt-14 pb-16 sm:pb-24 border-b border-slate-800">
      {/* Background Molecular Grid Accents */}
      <div className="absolute inset-0 chem-grid-pattern opacity-40 pointer-events-none"></div>

      {/* Floating Glowing Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Subtitle, Badges, CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Experience Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold shadow-inner">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>8+ Years of Chemistry Teaching Excellence</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">3 Coaching Centers</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.12]">
              Master Chemistry with <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-300">
                Ajay Choudhary
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Specialized coaching in <strong className="text-cyan-300 font-semibold">Organic Reaction Mechanisms</strong>, <strong className="text-cyan-300 font-semibold">Conceptual Inorganic Chemistry</strong>, and <strong className="text-cyan-300 font-semibold">Practical Laboratory Knowledge</strong> for CBSE, ISC, JEE & NEET aspirants.
            </p>

            {/* Specialization Highlights */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-1 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-2">
                <Atom className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Organic</h4>
                  <p className="text-[10px] text-slate-400">Mechanisms & Roadmaps</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Inorganic</h4>
                  <p className="text-[10px] text-slate-400">Bonding & Trends</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-2">
                <TestTubes className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Practical</h4>
                  <p className="text-[10px] text-slate-400">Salt Analysis & Labs</p>
                </div>
              </div>
            </div>

            {/* Professional CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
              <Link
                href="/study-materials"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-cyan-600/25 transition-all transform hover:-translate-y-0.5"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explore Study Materials</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/updates"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700 shadow-sm transition-all"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Notice Board & Tests</span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 hover:text-cyan-300 font-medium text-sm border border-slate-800 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Contact Teacher</span>
              </Link>
            </div>

            {/* Fast Stats Row */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>5,000+ Students Mentored</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Concept-First Approach</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Free Question Papers & Solutions</span>
              </div>
            </div>

          </div>

          {/* Right Column: Teacher Portrait & Floating Credentials Card (5 cols) */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Glowing Backdrop */}
            <div className="relative w-full max-w-sm sm:max-w-md">
              <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500/30 to-indigo-500/30 rounded-3xl blur-xl"></div>
              
              <div className="relative rounded-3xl overflow-hidden border-2 border-slate-700/80 bg-slate-900 shadow-2xl">
                <div className="relative aspect-[4/4.4] w-full">
                  <Image
                    src="/images/ajay-choudhary.jpg"
                    alt="Ajay Choudhary Chemistry Teacher"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  {/* Subtle Dark Gradient at bottom of image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                </div>

                {/* Floating Profile Info at bottom of portrait */}
                <div className="p-4 bg-slate-950/90 backdrop-blur-md border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-extrabold text-base">Ajay Choudhary</h3>
                    <p className="text-xs text-cyan-400 font-medium">Head of Chemistry • 8+ Years</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-semibold text-slate-400 block">Teaching At</span>
                    <span className="text-xs font-bold text-slate-200">3 Coaching Centers</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Top Right */}
              <div className="absolute -top-4 -right-4 p-3 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 shadow-xl flex items-center gap-2.5 animate-float-slow">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">8+ Years</div>
                  <div className="text-[10px] text-slate-400">Teaching Exp</div>
                </div>
              </div>

              {/* Floating Badge 2: Bottom Left */}
              <div className="absolute -bottom-4 -left-4 p-3 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-emerald-500/40 shadow-xl flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Organic & Lab</div>
                  <div className="text-[10px] text-slate-400">Specialist</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
