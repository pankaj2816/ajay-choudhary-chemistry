'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FlaskConical, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  BookOpen,
  GraduationCap
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Educator Identity (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <FlaskConical className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <h3 className="font-extrabold text-white text-lg tracking-tight">Ajay Choudhary</h3>
                <p className="text-xs text-cyan-400 font-medium">Senior Chemistry Educator (8+ Years Exp)</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering students to excel in CBSE, ISC, JEE, and NEET Chemistry through first-principles conceptual clarity, visual reaction mechanisms, and practical laboratory insight.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1.5 max-w-sm">
              <div className="flex items-center gap-2 font-semibold text-cyan-400">
                <Sparkles className="w-3.5 h-3.5" />
                Teaching Motto
              </div>
              <p className="italic text-slate-300">
                &ldquo;Chemistry becomes effortless when concepts are understood, not just memorized.&rdquo;
              </p>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Student Portal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-cyan-500/60" /> About Ajay Sir
                </Link>
              </li>
              <li>
                <Link href="/subjects" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-cyan-500/60" /> Chemistry Subjects
                </Link>
              </li>
              <li>
                <Link href="/updates" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-cyan-500/60" /> Notice Board & Tests
                </Link>
              </li>
              <li>
                <Link href="/study-materials" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-cyan-500/60" /> Study Notes & Sheets
                </Link>
              </li>
              <li>
                <Link href="/question-papers" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-cyan-500/60" /> Question Papers
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-cyan-500/60" /> Verified Solutions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-cyan-500/60" /> Contact & Admissions
                </Link>
              </li>
            </ul>
          </div>

          {/* Chemistry Domains */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Specializations</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/subjects#organic" className="hover:text-cyan-400 transition-colors block">
                  <strong className="text-slate-300 block">Organic Chemistry</strong>
                  <span className="text-[11px] text-slate-500">Mechanisms, Named Reactions & Conversions</span>
                </Link>
              </li>
              <li>
                <Link href="/subjects#inorganic" className="hover:text-cyan-400 transition-colors block">
                  <strong className="text-slate-300 block">Inorganic Chemistry</strong>
                  <span className="text-[11px] text-slate-500">Coordination, Bonding & Periodic Trends</span>
                </Link>
              </li>
              <li>
                <Link href="/subjects#practical" className="hover:text-cyan-400 transition-colors block">
                  <strong className="text-slate-300 block">Practical Chemistry</strong>
                  <span className="text-[11px] text-slate-500">Qualitative Salt Analysis & Titrations</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Coaching Centers Summary */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Teaching Centers</h4>
            <ul className="space-y-2 text-xs">
              <li className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <strong className="text-slate-200 block text-xs">Catalyst Career Institute</strong>
                <span className="text-[11px] text-slate-400">Class 12 & JEE/NEET Target</span>
              </li>
              <li className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <strong className="text-slate-200 block text-xs">Apex Science Academy</strong>
                <span className="text-[11px] text-slate-400">Class 11 Foundation & GOC</span>
              </li>
              <li className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <strong className="text-slate-200 block text-xs">Prerana Learning Hub</strong>
                <span className="text-[11px] text-slate-400">NEET & Practical Lab Workshops</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Admin Login Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Ajay Choudhary Chemistry Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Student Helpdesk
            </Link>
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              Faculty Profile
            </Link>
            <Link 
              href="/admin/login" 
              className="inline-flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Teacher Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
