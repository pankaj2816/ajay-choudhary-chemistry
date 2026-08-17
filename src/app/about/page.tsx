'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Award, 
  Building2, 
  Atom, 
  Sparkles, 
  TestTubes, 
  CheckCircle2, 
  BookOpen, 
  GraduationCap, 
  Users, 
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Mail,
  PhoneCall
} from 'lucide-react';
import { TeamMember } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';

const METHODOLOGY_STEPS = [
  {
    step: '01',
    title: 'Build Strong Fundamentals',
    description: 'Deconstruct core chemical principles, atomic structure, and electronic configurations before tackling complex problems.'
  },
  {
    step: '02',
    title: 'Deep Conceptual Visualization',
    description: 'Master reaction pathways through curved-arrow notation, steric factors, and molecular orbital models instead of rote memorization.'
  },
  {
    step: '03',
    title: 'Connect Theory with Practical Experiments',
    description: 'Reinforce chemical equations by correlating them with qualitative salt analysis colors, precipitates, and titrimetric endpoints.'
  },
  {
    step: '04',
    title: 'Targeted Multi-Tier Practice',
    description: 'Progressive problem solving from NCERT & Board exemplar questions to high-yield JEE Main, Advanced, and NEET DPPs.'
  },
  {
    step: '05',
    title: 'Detailed Mistake Analysis & Remediation',
    description: 'Regular unit test reviews, pinpointing conceptual traps, calculation errors, and common examiner tricks.'
  },
  {
    step: '06',
    title: 'Systematic Examination Temperament',
    description: 'Time management drills, structured presentation methods for 3-mark & 5-mark board answers, and speed tactics for MCQs.'
  }
];

export default function AboutPage() {
  const [team, setTeam] = useState<TeamMember[]>(initialDatabase.teamMembers);

  useEffect(() => {
    fetch('/api/team')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setTeam(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Top Hero Banner */}
      <section className="bg-slate-950 text-white chem-hero-gradient py-16 sm:py-20 border-b border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-bold text-xs">
              <GraduationCap className="w-3.5 h-3.5" />
              Faculty Profile
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              About Ajay Choudhary
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
              Senior Chemistry Educator with 8+ years of dedicated experience mentoring board toppers and competitive exam rankers across three premier coaching institutions.
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
                <Image
                  src="/images/ajay-choudhary.jpg"
                  alt="Ajay Choudhary Chemistry Teacher"
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <h3 className="text-xl font-black">Ajay Choudhary</h3>
                  <p className="text-xs text-cyan-400 font-semibold">M.Sc. Chemistry, B.Ed (8+ Years Exp)</p>
                  <p className="text-[11px] text-slate-300">Catalyst • Apex • Prerana Learning Centers</p>
                </div>
              </div>
            </div>

            {/* Bio Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">
                  Pedagogical Journey
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Demystifying Chemistry Through Logic, Clarity & Laboratory Insights
                </h2>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Ajay Choudhary began his teaching career with a single goal: to dismantle the widespread myth that Chemistry requires endless mechanical memorization. Over the past <strong>8+ years</strong>, he has guided more than <strong>5,000 students</strong> across Class 11, Class 12, CBSE/ISC Boards, JEE Main, and NEET.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Currently engaged as Senior Chemistry Faculty across <strong>three renowned coaching centers</strong>, Ajay Sir specializes in creating intuitive mental maps for <strong>Organic Reaction Mechanisms</strong>, explaining quantum principles behind <strong>Inorganic Periodic Trends</strong>, and conducting comprehensive <strong>Practical Chemistry & Qualitative Salt Analysis workshops</strong>.
              </p>

              {/* Stat Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-2xl font-black text-slate-900">8+</div>
                  <div className="text-xs font-bold text-slate-600">Years Experience</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-2xl font-black text-cyan-700">3</div>
                  <div className="text-xs font-bold text-slate-600">Coaching Centers</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                  <div className="text-2xl font-black text-teal-700">5,000+</div>
                  <div className="text-xs font-bold text-slate-600">Students Mentored</div>
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
              Teaching Philosophy
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              &ldquo;Chemistry becomes effortless when concepts are understood, not just memorized.&rdquo;
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              The 6-step systematic methodology implemented across all batch lectures and doubt clinics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {METHODOLOGY_STEPS.map((item) => (
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
              Teaching Locations
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Active Coaching Center Batches
            </h2>
            <p className="text-sm text-slate-600">
              Ajay Sir conducts offline lectures, laboratory workshops, and weekly test series at these three established coaching institutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900">Catalyst Career Institute</h3>
              <p className="text-xs text-slate-600">Plot 42, Knowledge Park, Sector 14</p>
              <div className="pt-2 border-t border-slate-200 space-y-1.5 text-xs text-slate-700">
                <div><strong>Target Batches:</strong> Class 12 Board + JEE Main/Adv</div>
                <div><strong>Schedule:</strong> Mon, Wed, Fri (4:00 PM – 7:30 PM)</div>
              </div>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900">Apex Science Academy</h3>
              <p className="text-xs text-slate-600">B-Block Main Market, Model Town</p>
              <div className="pt-2 border-t border-slate-200 space-y-1.5 text-xs text-slate-700">
                <div><strong>Target Batches:</strong> Class 11 Foundation & GOC</div>
                <div><strong>Schedule:</strong> Tue, Thu, Sat (3:30 PM – 7:00 PM)</div>
              </div>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900">Prerana Learning Hub</h3>
              <p className="text-xs text-slate-600">3rd Floor, Scholar Towers, South Extension</p>
              <div className="pt-2 border-t border-slate-200 space-y-1.5 text-xs text-slate-700">
                <div><strong>Target Batches:</strong> NEET Chemistry & Lab Sessions</div>
                <div><strong>Schedule:</strong> Sunday Intensive (8:30 AM – 2:00 PM)</div>
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
              Teaching Gallery
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Ajay Sir&apos;s Teaching Journey & Classroom Portfolio
            </h2>
            <p className="text-sm text-slate-600">
              A glimpse into Ajay Choudhary&apos;s laboratory demonstrations, classroom lectures, and student mentorship across his three teaching centers.
            </p>
          </div>

          {/* Group Photo Showcase */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-300 shadow-xl mb-12 bg-slate-900">
            <div className="relative h-72 sm:h-96 w-full">
              <Image
                src="/images/teaching-team.jpg"
                alt="Ajay Choudhary Classroom and Laboratory Portfolio"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                Classroom & Laboratory Moments
              </span>
              <h3 className="text-xl sm:text-2xl font-black mt-1">
                8+ Years of Chemistry Teaching Excellence Across 3 Centers
              </h3>
            </div>
          </div>

          {/* Portfolio Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full bg-slate-100">
                    <Image
                      src={member.image || '/images/ajay-choudhary.jpg'}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                    />
                    <div className="absolute bottom-3 left-3 bg-slate-900/90 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                      {member.role}
                    </div>
                  </div>

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
                      Contact
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <h3 className="text-2xl font-black text-white">Join Ajay Sir&apos;s Next Batch</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Book a counseling session, attend a demo lecture, or download recent question papers.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs sm:text-sm font-bold shadow transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/study-materials"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-bold transition-colors"
            >
              Explore Study Materials
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
