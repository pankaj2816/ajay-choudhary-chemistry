'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Atom, 
  Sparkles, 
  TestTubes, 
  Layers, 
  ArrowRight, 
  BookOpen, 
  CheckCircle,
  HelpCircle,
  Calculator
} from 'lucide-react';

interface ChemistryTopic {
  id: string;
  title: string;
  category: string;
  summary: string;
  reaction: string;
  mechanismSteps: string[];
  keyTakeaway: string;
  examRelevance: string;
}

const TOPICS: ChemistryTopic[] = [
  {
    id: 'markovnikov',
    title: 'Markovnikov Addition to Alkenes',
    category: 'Organic Chemistry',
    summary: 'Electrophilic addition of protic acids (HX) to asymmetrical alkenes proceeds via the most stable carbocation intermediate.',
    reaction: 'CH₃–CH=CH₂ + HBr ⟶ CH₃–CH(Br)–CH₃ (Major Product)',
    mechanismSteps: [
      'Step 1: Double bond π-electrons attack H⁺ electrophile.',
      'Step 2: Generation of more stable 2° carbocation (hyperconjugation + inductive stabilization).',
      'Step 3: Rapid nucleophilic attack by Br⁻ giving 2-Bromopropane.'
    ],
    keyTakeaway: 'The hydrogen atom bonds to the carbon with the greatest number of hydrogen atoms.',
    examRelevance: 'Guaranteed 2-3 marks in CBSE Boards & NEET Organic questions.'
  },
  {
    id: 'aldol',
    title: 'Aldol Condensation & Enolate Chemistry',
    category: 'Organic Chemistry',
    summary: 'Carbonyl compounds possessing at least one α-hydrogen undergo base-catalyzed dimerisation to form β-hydroxy aldehydes/ketones.',
    reaction: '2 CH₃–CHO ⟶ [CH₃–CH(OH)–CH₂–CHO] ⟶ CH₃–CH=CH–CHO + H₂O',
    mechanismSteps: [
      'Step 1: OH⁻ base abstracts acidic α-hydrogen forming resonance-stabilized enolate.',
      'Step 2: Nucleophilic attack of enolate on carbonyl carbon of second aldehyde.',
      'Step 3: Protonation yields aldol; subsequent heating eliminates H₂O to form conjugated α,β-unsaturated aldehyde.'
    ],
    keyTakeaway: 'Requires acidic α-hydrogen. Carbonyls with no α-hydrogen (e.g. HCHO, C₆H₅CHO) undergo Cannizzaro reaction instead.',
    examRelevance: 'Frequently asked named reaction and multi-step synthesis conversion in JEE & Boards.'
  },
  {
    id: 'cft',
    title: 'Crystal Field Theory: Octahedral Splitting (Δₒ)',
    category: 'Inorganic Chemistry',
    summary: 'In an octahedral ligand field, the five degenerate d-orbitals split into lower energy t₂g and higher energy eg sets due to electrostatic repulsion.',
    reaction: 'd-orbitals ⟶ 3 t₂g orbitals (dxy, dyz, dxz) [−0.4 Δₒ] + 2 eg orbitals (dx²−y², dz²) [+0.6 Δₒ]',
    mechanismSteps: [
      'Ligands approach central metal along the Cartesian axes (x, y, z).',
      'Axial orbitals (dx²−y², dz²) experience maximum direct repulsion and rise in energy (eg).',
      'Non-axial orbitals (dxy, dyz, dxz) lie between axes, experience less repulsion, and drop in energy (t₂g).'
    ],
    keyTakeaway: 'Strong field ligands (CN⁻, CO) give large Δₒ (low spin, pairing), while weak field ligands (F⁻, Cl⁻, H₂O) give small Δₒ (high spin).',
    examRelevance: 'Core concept for calculating magnetic moments (BM) and predicting complex geometry.'
  },
  {
    id: 'salt-analysis',
    title: 'Brown Ring Test for Nitrate Radical (NO₃⁻)',
    category: 'Practical Chemistry',
    summary: 'Sensitive laboratory confirmatory test for nitrate anion in qualitative salt analysis.',
    reaction: 'NO₃⁻ + 3Fe²⁺ + 4H⁺ ⟶ NO + 3Fe³⁺ + 2H₂O\n[Fe(H₂O)₆]²⁺ + NO ⟶ [Fe(H₂O)₅(NO)]²⁺ (Brown Ring) + H₂O',
    mechanismSteps: [
      'Step 1: Freshly prepared FeSO₄ solution is mixed with nitrate salt solution.',
      'Step 2: Concentrated H₂SO₄ is slowly trickled along inner test-tube wall.',
      'Step 3: A dense brown ring forms at junction of two liquid layers due to pentaaquanitrosyliron(II) complex.'
    ],
    keyTakeaway: 'Test tube must not be shaken; always use freshly prepared FeSO₄ to prevent oxidation into Fe³⁺.',
    examRelevance: 'Essential viva-voce question and practical examination mandatory experiment.'
  }
];

import { useLanguage } from '@/context/LanguageContext';

export default function InteractiveChemistryTool() {
  const { t } = useLanguage();
  const [activeTopic, setActiveTopic] = useState<ChemistryTopic>(TOPICS[0]);

  return (
    <section className="py-16 sm:py-24 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-bold text-xs">
            <Atom className="w-3.5 h-3.5" />
            {t.interactive.badge}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            {t.interactive.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {t.interactive.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Buttons (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            {TOPICS.map((topic) => {
              const isSelected = activeTopic.id === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setActiveTopic(topic)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between group ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-950 to-slate-900 border-cyan-500 text-white shadow-lg shadow-cyan-950/50'
                      : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                      isSelected ? 'text-cyan-400' : 'text-slate-500'
                    }`}>
                      {topic.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-white">
                      {topic.title}
                    </h4>
                  </div>
                  <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600 group-hover:text-slate-400'
                  }`} />
                </button>
              );
            })}

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-2 mt-4">
              <div className="flex items-center gap-1.5 font-bold text-slate-200">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                Want complete chapter roadmaps?
              </div>
              <p>Explore over 40+ curated chemistry formula sheets and reaction maps in the study materials vault.</p>
              <Link
                href="/study-materials"
                className="inline-flex items-center gap-1 text-cyan-400 hover:underline font-bold text-xs mt-1"
              >
                Access Complete Vault <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Right Concept Breakdown Canvas (8 cols) */}
          <div className="lg:col-span-8 bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-500/30">
                  {activeTopic.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                  {activeTopic.title}
                </h3>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/20">
                <CheckCircle className="w-3.5 h-3.5" /> High-Yield Topic
              </span>
            </div>

            {/* Reaction Formula Display */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 mb-6 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto shadow-inner">
              <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest block mb-1">
                Chemical Equation / Profile:
              </span>
              <div className="whitespace-pre-wrap">{activeTopic.reaction}</div>
            </div>

            {/* Mechanism Steps */}
            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Step-by-Step Conceptual Mechanism:
              </h4>
              <div className="space-y-2">
                {activeTopic.mechanismSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-slate-300 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key takeaway & Exam Relevance Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs">
                <strong className="text-cyan-300 block mb-1">Key Conceptual Rule:</strong>
                <p className="text-slate-300 leading-relaxed">{activeTopic.keyTakeaway}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs">
                <strong className="text-indigo-300 block mb-1">Board & Competitive Exam Focus:</strong>
                <p className="text-slate-300 leading-relaxed">{activeTopic.examRelevance}</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
