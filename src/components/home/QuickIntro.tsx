'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Sparkles, BookOpen, Layers, Target } from 'lucide-react';

export default function QuickIntro() {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Visual Box (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-xl border border-slate-800">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                Educator Philosophy
              </span>

              <blockquote className="mt-4 text-lg sm:text-xl font-bold text-slate-100 leading-snug">
                &ldquo;Chemistry is not a subject of rote memorization. When you visualize electron movements, understand energy profiles, and connect theory with lab experiments, Chemistry becomes your strongest scoring subject.&rdquo;
              </blockquote>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-white text-sm">Ajay Choudhary Sir</div>
                  <div className="text-xs text-slate-400">Head Chemistry Educator</div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-semibold">
                  8+ Years
                </span>
              </div>
            </div>
          </div>

          {/* Right Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              Welcome to Ajay Sir&apos;s Chemistry Portal
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Building Strong Fundamentals, Conceptual Clarity & Exam Confidence
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Ajay Choudhary Sir is an experienced Chemistry educator with over 8 years of teaching experience. Currently teaching students across <strong>three premier coaching centers</strong>, he specializes in <strong>Organic Chemistry, Inorganic Chemistry, and practical laboratory-based Chemistry</strong>.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              His teaching methodology is centered on breaking down complex chemical mechanisms into intuitive, step-by-step mental models, rigorous question practice, and linking textbook theory to real laboratory observations.
            </p>

            {/* Bullet points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Step-by-step reaction mechanisms</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Periodic trends & crystal field theory</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Hands-on salt analysis viva prep</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Regular DPPs, test series & solutions</span>
              </div>
            </div>

            <div className="pt-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow transition-all group"
              >
                <span>Know More About Ajay Sir</span>
                <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
