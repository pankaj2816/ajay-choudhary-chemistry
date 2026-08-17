'use client';

import React from 'react';
import { Award, Building2, Atom, Sparkles, TestTubes, Users } from 'lucide-react';

const STATS = [
  {
    icon: Award,
    value: '8+',
    label: 'Years Experience',
    subtext: 'Dedicated Chemistry Teaching',
    color: 'from-cyan-500 to-blue-600',
    bgLight: 'bg-cyan-500/10 text-cyan-600'
  },
  {
    icon: Building2,
    value: '3',
    label: 'Coaching Centers',
    subtext: 'Active Batches & Mentorship',
    color: 'from-teal-500 to-emerald-600',
    bgLight: 'bg-teal-500/10 text-teal-600'
  },
  {
    icon: Atom,
    value: '100%',
    label: 'Organic Mastery',
    subtext: 'Mechanisms & Named Reactions',
    color: 'from-indigo-500 to-purple-600',
    bgLight: 'bg-indigo-500/10 text-indigo-600'
  },
  {
    icon: TestTubes,
    value: '5,000+',
    label: 'Students Mentored',
    subtext: 'Boards, JEE & NEET Success',
    color: 'from-amber-500 to-rose-600',
    bgLight: 'bg-amber-500/10 text-amber-600'
  }
];

export default function StatsSection() {
  return (
    <section className="py-12 bg-slate-900 border-b border-slate-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 transform hover:-translate-y-1 shadow-lg group"
              >
                <div className={`w-10 h-10 rounded-xl ${stat.bgLight} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-200 mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
