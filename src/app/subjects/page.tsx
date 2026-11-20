'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ElementTile from '@/components/ui/ElementTile';
import { PageHeader } from '@/components/ui/Editorial';
import SectionLabel from '@/components/home/premium/SectionLabel';
import InteractiveChemistryTool from '@/components/home/InteractiveChemistryTool';

const TILES: Record<string, { symbol: string; number: number; name: string }> = {
  organic: { symbol: 'C', number: 6, name: 'Carbon' },
  inorganic: { symbol: 'Co', number: 27, name: 'Cobalt' },
  practical: { symbol: 'Ag', number: 47, name: 'Silver' },
  physical: { symbol: 'H', number: 1, name: 'Hydrogen' },
};

const SUBJECT_DETAILS = [
  {
    id: 'organic',
    title: 'Organic Chemistry',
    tagline: 'Reaction Mechanisms, Stereochemistry & Synthesis',
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
    <>
      <PageHeader
        label="Curriculum"
        title="Chemistry subjects & expertise"
        intro="Detailed syllabus breakdowns and the way each part of Chemistry is taught: Organic, Inorganic and Practical."
        aside={
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Jump to subject">
            {SUBJECT_DETAILS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="link-underline text-ink">
                {s.title}
              </a>
            ))}
          </nav>
        }
      />

      {SUBJECT_DETAILS.map((subj, idx) => {
        const tile = TILES[subj.id] || TILES.organic;
        return (
          <section
            key={subj.id}
            id={subj.id}
            className={`scroll-mt-20 ${idx % 2 === 1 ? 'bg-paper-deep border-y border-line' : 'bg-paper'}`}
          >
            <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
                <div className="lg:col-span-5">
                  <SectionLabel index={String(idx + 1).padStart(2, '0')} label="Subject" />
                  <div className="mt-8 flex items-start gap-5">
                    <ElementTile {...tile} size="lg" tone={idx === 0 ? 'accent' : 'light'} />
                    <div>
                      <h2 className="text-4xl sm:text-5xl leading-[1.05] text-ink">{subj.title}</h2>
                      <p className="mt-2 text-accent">{subj.tagline}</p>
                    </div>
                  </div>
                  <p className="mt-8 text-[1.02rem] leading-relaxed text-muted">{subj.description}</p>
                  <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                    <Link href={subj.materialsUrl} className="group inline-flex items-center gap-2 px-6 py-3.5 bg-ink text-paper text-sm font-medium hover:bg-accent transition-colors">
                      Study material
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link href={subj.papersUrl} className="link-underline text-sm font-medium text-ink">
                      Question papers
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 lg:pt-16">
                  {subj.coreModules.map((mod) => (
                    <div key={mod.title} className="border-t border-ink pt-5">
                      <h3 className="font-display text-xl text-ink">{mod.title}</h3>
                      <ul className="mt-3">
                        {mod.topics.map((topic) => (
                          <li key={topic} className="py-2 border-b border-line text-[0.92rem] text-muted">
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <InteractiveChemistryTool />
    </>
  );
}
