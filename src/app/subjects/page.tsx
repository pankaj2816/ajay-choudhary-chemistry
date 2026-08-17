'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Atom, 
  Sparkles, 
  TestTubes, 
  Calculator, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  Download,
  Layers
} from 'lucide-react';

const SUBJECT_DETAILS = [
  {
    id: 'organic',
    title: 'Organic Chemistry',
    tagline: 'Reaction Mechanisms, Stereochemistry & Synthesis',
    icon: Atom,
    color: 'from-cyan-600 to-blue-600',
    lightBg: 'bg-cyan-50 border-cyan-200 text-cyan-800',
    description: 'Organic Chemistry is taught with an unwavering focus on electron displacement effects, reaction intermediates (carbocations, carbanions, free radicals), and transition states. Instead of rote-learning 200+ reactions, students learn how to predict product formation using standard mechanistic rules.',
    coreModules: [
      {
        title: 'General Organic Chemistry (GOC)',
        topics: ['Inductive & Resonance Effects', 'Hyperconjugation & Aromaticity (Hückel’s Rule)', 'Carbocation, Carbanion & Radical Stabilities', 'Acidic & Basic Strength Comparisons']
      },
      {
        title: 'Reaction Mechanisms',
        topics: ['Electrophilic Addition (Markovnikov & Anti-Markovnikov)', 'Nucleophilic Substitution (SN1 vs SN2)', 'Elimination Reactions (E1, E2, Saytzeff vs Hofmann)', 'Electrophilic Aromatic Substitution (Directing Groups)']
      },
      {
        title: 'Named Reactions & Conversions',
        topics: ['Aldol & Cannizzaro Condensation', 'Reimer-Tiemann & Kolbe’s Synthesis', 'Wurtz, Fittig & Friedel-Crafts Reactions', 'Hell-Volhard-Zelinsky (HVZ) Reaction']
      },
      {
        title: 'Functional Groups & Biomolecules',
        topics: ['Haloalkanes & Haloarenes', 'Alcohols, Phenols & Ethers', 'Carbonyl Compounds (Aldehydes, Ketones, Acids)', 'Amines, Diazonium Salts & Carbohydrates']
      }
    ],
    materialsUrl: '/study-materials?subject=Organic+Chemistry',
    papersUrl: '/question-papers?subject=Organic+Chemistry'
  },
  {
    id: 'inorganic',
    title: 'Inorganic Chemistry',
    tagline: 'Periodic Properties, Bonding & Coordination Chemistry',
    icon: Sparkles,
    color: 'from-teal-600 to-emerald-600',
    lightBg: 'bg-teal-50 border-teal-200 text-teal-800',
    description: 'Inorganic Chemistry is transformed from a memorization headache into a logical, structured discipline. We emphasize quantum mechanical foundations, shielding effects, lattice energies, and crystal field splitting to naturally explain trends and anomalous behaviors.',
    coreModules: [
      {
        title: 'Periodic Classification & Trends',
        topics: ['Effective Nuclear Charge (Zeff) & Slater’s Rules', 'Ionization Enthalpy & Electron Gain Enthalpy', 'Electronegativity Scales & Diagonal Relationships', 'Anomalous 2nd Period Elements Behavior']
      },
      {
        title: 'Chemical Bonding & MOT',
        topics: ['VSEPR Theory & Lone Pair Repulsions', 'Hybridization (sp, sp², sp³, dsp², d²sp³)', 'Molecular Orbital Theory (MOT Energy Diagrams)', 'Dipole Moments & Hydrogen Bonding Types']
      },
      {
        title: 'Coordination Compounds',
        topics: ['Werner’s Theory & IUPAC Nomenclature', 'Isomerism (Geometrical, Optical, Linkage, Ionization)', 'Crystal Field Theory (Octahedral & Tetrahedral Δ)', 'Magnetic Moment Calculations (Spin-Only BM)']
      },
      {
        title: 'Block Chemistry & Metallurgy',
        topics: ['p-Block Hydrides, Oxoacids & Halides', 'd- & f-Block Transition Elements & Lanthanoid Contraction', 'Ellingham Diagrams & Metal Extraction Principles']
      }
    ],
    materialsUrl: '/study-materials?subject=Inorganic+Chemistry',
    papersUrl: '/question-papers?subject=Inorganic+Chemistry'
  },
  {
    id: 'practical',
    title: 'Practical Chemistry',
    tagline: 'Qualitative Salt Analysis, Titrations & Laboratory Technique',
    icon: TestTubes,
    color: 'from-indigo-600 to-purple-600',
    lightBg: 'bg-indigo-50 border-indigo-200 text-indigo-800',
    description: 'Hands-on practical understanding guarantees high scores in board practical exams and competitive test experimental questions. Students learn systematic group separation schemes, flame tests, redox calculations, and safety rules.',
    coreModules: [
      {
        title: 'Qualitative Salt Analysis',
        topics: ['Zero Group (Ammonium NH₄⁺) & Nessler’s Test', 'Group I to VI Cation Separation Chemistry', 'Anion Analysis (Carbonate, Sulphate, Nitrate Brown Ring)', 'Chromyl Chloride & Lead Acetate Confirmations']
      },
      {
        title: 'Volumetric / Titrimetric Analysis',
        topics: ['Oxalic Acid vs KMnO₄ Redox Titration', 'Mohr’s Salt (Ferrous Ammonium Sulphate) Estimation', 'Normality, Molarity & Strength Calculations', 'Indicator Selection & Endpoint Detection']
      },
      {
        title: 'Organic Functional Group Tests',
        topics: ['Tollens & Fehling Tests for Aldehydes', 'Iodoform Test for Methyl Ketones', 'Ferric Chloride Test for Phenolic Groups', 'Azo Dye Test for Primary Aromatic Amines']
      },
      {
        title: 'Physical Experiments & Viva Voce',
        topics: ['Preparation of Lyophilic & Lyophobic Sols', 'Enthalpy of Neutralization Calorimetry', 'Standard Laboratory Safety & Reagent Handling', 'Comprehensive Viva Voce Question Bank']
      }
    ],
    materialsUrl: '/study-materials?subject=Practical+Chemistry',
    papersUrl: '/question-papers?subject=Practical+Chemistry'
  }
];

export default function SubjectsPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Header Banner */}
      <section className="bg-slate-950 text-white chem-hero-gradient py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-bold text-xs">
              <BookOpen className="w-3.5 h-3.5" />
              Curriculum & Specializations
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              Chemistry Subjects & Expertise
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
              Explore the detailed syllabus breakdowns, conceptual frameworks, and dedicated resources for Organic, Inorganic, and Practical Chemistry.
            </p>
          </div>
        </div>
      </section>

      {/* Main Subjects Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16">
        {SUBJECT_DETAILS.map((subj, idx) => {
          const Icon = subj.icon;
          return (
            <div
              key={subj.id}
              id={subj.id}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-8 scroll-mt-24"
            >
              {/* Subject Title & Overview */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${subj.color} text-white flex items-center justify-center shadow-lg shrink-0`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${subj.lightBg}`}>
                      Core Specialty
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                      {subj.title}
                    </h2>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500">
                      {subj.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href={subj.materialsUrl}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span>View Study Materials</span>
                  </Link>

                  <Link
                    href={subj.papersUrl}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-slate-600" />
                    <span>View Question Papers</span>
                  </Link>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {subj.description}
              </p>

              {/* Core Syllabus Modules Grid */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Comprehensive Syllabus Modules Covered
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subj.coreModules.map((module, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3"
                    >
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-600"></span>
                        {module.title}
                      </h4>
                      <ul className="space-y-1.5 pl-4">
                        {module.topics.map((topic, tIdx) => (
                          <li key={tIdx} className="text-xs text-slate-600 flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
