'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { term } from '@/lib/terms';
import SectionLabel from '@/components/home/premium/SectionLabel';

type Bi = { en: string; hi: string };

interface ChemistryTopic {
  id: string;
  title: Bi;
  category: string;
  summary: Bi;
  reaction: string;
  steps: Bi[];
  rule: Bi;
  exam: Bi;
}

const TOPICS: ChemistryTopic[] = [
  {
    id: 'markovnikov',
    title: { en: 'Markovnikov addition to alkenes', hi: 'ऐल्कीन पर मार्कोवनिकॉफ़ योगज' },
    category: 'Organic Chemistry',
    summary: {
      en: 'Adding HX to an unsymmetrical alkene goes through the most stable carbocation.',
      hi: 'असममित ऐल्कीन पर HX का योग सबसे स्थायी कार्बधनायन से होकर होता है।',
    },
    reaction: 'CH₃–CH=CH₂ + HBr ⟶ CH₃–CH(Br)–CH₃ (major product)',
    steps: [
      { en: 'The π electrons of the double bond attack H⁺.', hi: 'द्वि-आबंध के π इलेक्ट्रॉन H⁺ पर आक्रमण करते हैं।' },
      {
        en: 'The more stable 2° carbocation forms (hyperconjugation and +I effect).',
        hi: 'अधिक स्थायी 2° कार्बधनायन बनता है (अतिसंयुग्मन और +I प्रभाव)।',
      },
      { en: 'Br⁻ attacks quickly and gives 2-bromopropane.', hi: 'Br⁻ जल्दी आक्रमण करके 2-ब्रोमोप्रोपेन बनाता है।' },
    ],
    rule: {
      en: 'Hydrogen goes to the carbon that already has more hydrogens.',
      hi: 'हाइड्रोजन उस कार्बन पर जाता है जिस पर पहले से अधिक हाइड्रोजन हैं।',
    },
    exam: {
      en: 'Asked often in CBSE boards and NEET organic questions.',
      hi: 'CBSE बोर्ड और NEET के कार्बनिक प्रश्नों में अक्सर पूछा जाता है।',
    },
  },
  {
    id: 'aldol',
    title: { en: 'Aldol condensation', hi: 'ऐल्डोल संघनन' },
    category: 'Organic Chemistry',
    summary: {
      en: 'Aldehydes and ketones with at least one α-hydrogen join in dilute base to give β-hydroxy compounds.',
      hi: 'कम से कम एक α-हाइड्रोजन वाले ऐल्डिहाइड और कीटोन तनु क्षार में जुड़कर β-हाइड्रॉक्सी यौगिक बनाते हैं।',
    },
    reaction: '2 CH₃–CHO ⟶ CH₃–CH(OH)–CH₂–CHO ⟶ CH₃–CH=CH–CHO + H₂O',
    steps: [
      { en: 'OH⁻ removes an α-hydrogen and forms an enolate.', hi: 'OH⁻ एक α-हाइड्रोजन हटाकर ईनोलेट बनाता है।' },
      {
        en: 'The enolate attacks the carbonyl carbon of a second molecule.',
        hi: 'ईनोलेट दूसरे अणु के कार्बोनिल कार्बन पर आक्रमण करता है।',
      },
      {
        en: 'Protonation gives the aldol; heating removes water to give an α,β-unsaturated aldehyde.',
        hi: 'प्रोटॉनीकरण से ऐल्डोल बनता है; गर्म करने पर जल निकलकर α,β-असंतृप्त ऐल्डिहाइड बनता है।',
      },
    ],
    rule: {
      en: 'Needs an α-hydrogen. Without one (HCHO, C₆H₅CHO), Cannizzaro reaction happens instead.',
      hi: 'α-हाइड्रोजन ज़रूरी है। उसके बिना (HCHO, C₆H₅CHO) कैनिज़ारो अभिक्रिया होती है।',
    },
    exam: {
      en: 'A favourite named reaction in conversions for JEE and boards.',
      hi: 'JEE और बोर्ड में रूपांतरण वाले प्रश्नों की पसंदीदा नामित अभिक्रिया।',
    },
  },
  {
    id: 'cft',
    title: { en: 'Crystal field splitting (octahedral)', hi: 'क्रिस्टल क्षेत्र विपाटन (अष्टफलकीय)' },
    category: 'Inorganic Chemistry',
    summary: {
      en: 'In an octahedral field the five d-orbitals split into a lower t₂g set and a higher e_g set.',
      hi: 'अष्टफलकीय क्षेत्र में पाँच d-कक्षक निचले t₂g और ऊपरी e_g समूह में बँट जाते हैं।',
    },
    reaction: 'd ⟶ t₂g (dxy, dyz, dxz) [−0.4 Δₒ] + e_g (dx²−y², dz²) [+0.6 Δₒ]',
    steps: [
      { en: 'Ligands approach the metal along the x, y and z axes.', hi: 'लिगैंड x, y और z अक्षों के साथ धातु के पास आते हैं।' },
      {
        en: 'Orbitals on the axes (dx²−y², dz²) are repelled most and rise in energy.',
        hi: 'अक्षों पर स्थित कक्षक (dx²−y², dz²) सबसे अधिक प्रतिकर्षित होकर ऊपर जाते हैं।',
      },
      {
        en: 'Orbitals between the axes (dxy, dyz, dxz) are repelled less and drop in energy.',
        hi: 'अक्षों के बीच के कक्षक (dxy, dyz, dxz) कम प्रतिकर्षित होकर नीचे आते हैं।',
      },
    ],
    rule: {
      en: 'Strong-field ligands (CN⁻, CO) give a large Δₒ and low spin; weak-field ligands (F⁻, Cl⁻, H₂O) give high spin.',
      hi: 'प्रबल क्षेत्र लिगैंड (CN⁻, CO) बड़ा Δₒ और निम्न चक्रण देते हैं; दुर्बल क्षेत्र लिगैंड (F⁻, Cl⁻, H₂O) उच्च चक्रण।',
    },
    exam: {
      en: 'Needed for magnetic moment and colour questions.',
      hi: 'चुंबकीय आघूर्ण और रंग वाले प्रश्नों के लिए ज़रूरी।',
    },
  },
  {
    id: 'salt-analysis',
    title: { en: 'Brown ring test for nitrate', hi: 'नाइट्रेट का भूरा वलय परीक्षण' },
    category: 'Practical Chemistry',
    summary: {
      en: 'The confirmatory test for the nitrate ion in salt analysis.',
      hi: 'लवण विश्लेषण में नाइट्रेट आयन का पुष्टि परीक्षण।',
    },
    reaction: 'NO₃⁻ + 3Fe²⁺ + 4H⁺ ⟶ NO + 3Fe³⁺ + 2H₂O\n[Fe(H₂O)₆]²⁺ + NO ⟶ [Fe(H₂O)₅(NO)]²⁺ (brown ring) + H₂O',
    steps: [
      { en: 'Mix freshly made FeSO₄ solution with the salt solution.', hi: 'ताज़ा बना FeSO₄ विलयन लवण के विलयन में मिलाएँ।' },
      {
        en: 'Pour concentrated H₂SO₄ slowly down the side of the test tube.',
        hi: 'सांद्र H₂SO₄ को परखनली की दीवार के सहारे धीरे-धीरे डालें।',
      },
      {
        en: 'A brown ring appears where the two layers meet.',
        hi: 'जहाँ दोनों परतें मिलती हैं, वहाँ भूरा वलय दिखता है।',
      },
    ],
    rule: {
      en: 'Do not shake the tube, and always use fresh FeSO₄.',
      hi: 'परखनली को न हिलाएँ, और हमेशा ताज़ा FeSO₄ लें।',
    },
    exam: {
      en: 'A common viva question and a must-do practical.',
      hi: 'वाइवा का आम प्रश्न और ज़रूरी प्रैक्टिकल।',
    },
  },
  {
    id: 'nernst',
    title: { en: 'Nernst equation', hi: 'नेर्न्स्ट समीकरण' },
    category: 'Physical Chemistry',
    summary: {
      en: 'Gives the cell voltage when concentrations are not standard.',
      hi: 'सांद्रता मानक न हो तब सेल का विभव बताता है।',
    },
    reaction: 'E_cell = E°_cell − (0.059 / n) log Q   (298 K)',
    steps: [
      { en: 'Write the anode and cathode half-reactions.', hi: 'ऐनोड और कैथोड की अर्ध-अभिक्रियाएँ लिखें।' },
      { en: 'Find E°_cell = E°_cathode − E°_anode.', hi: 'E°_cell = E°_cathode − E°_anode निकालें।' },
      { en: 'Count the electrons transferred (n).', hi: 'स्थानांतरित इलेक्ट्रॉन (n) गिनें।' },
      { en: 'Put Q into the equation to get E_cell.', hi: 'Q को समीकरण में रखकर E_cell निकालें।' },
    ],
    rule: {
      en: 'At equilibrium E_cell = 0 and Q = K, so K can be found from E°_cell.',
      hi: 'साम्य पर E_cell = 0 और Q = K, इसलिए E°_cell से K निकाला जा सकता है।',
    },
    exam: {
      en: 'A standard numerical in Class 12 boards, JEE Main and NEET.',
      hi: 'कक्षा 12 बोर्ड, JEE मेन और NEET का मानक संख्यात्मक प्रश्न।',
    },
  },
];

export default function InteractiveChemistryTool() {
  const { t, L, isHi } = useLanguage();
  const [activeId, setActiveId] = useState(TOPICS[0].id);
  const active = TOPICS.find((x) => x.id === activeId) || TOPICS[0];
  const b = (x: Bi) => L(x.en, x.hi);

  return (
    <section className="bg-paper-deep border-t border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <SectionLabel index="" label={t.interactive.badge} />
          <h2 className="mt-6 text-4xl sm:text-5xl leading-[1.08] text-ink">{t.interactive.title}</h2>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-muted">{t.interactive.subtitle}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-2" role="tablist" aria-label={L('Topics', 'विषय')}>
            {TOPICS.map((topic) => {
              const on = topic.id === active.id;
              return (
                <button
                  key={topic.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActiveId(topic.id)}
                  className={`w-full text-left px-5 py-4 rounded-xl border transition-colors flex items-center justify-between gap-4 ${
                    on ? 'bg-white border-accent' : 'bg-transparent border-line hover:border-ink/40'
                  }`}
                >
                  <span>
                    <span className={`block text-xs font-medium ${on ? 'text-accent' : 'text-muted'}`}>{term(topic.category, isHi)}</span>
                    <span className="mt-0.5 block font-semibold text-ink">{b(topic.title)}</span>
                  </span>
                  <ArrowRight className={`w-4 h-4 shrink-0 ${on ? 'text-accent' : 'text-muted'}`} />
                </button>
              );
            })}
            <Link
              href="/notes"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-deep"
            >
              {L('Read full chapter notes', 'पूरे अध्याय के नोट्स पढ़ें')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="lg:col-span-8 bg-white border border-line rounded-2xl p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">{term(active.category, isHi)}</p>
            <h3 className="mt-2 text-2xl sm:text-3xl font-semibold text-ink">{b(active.title)}</h3>
            <p className="mt-3 text-muted leading-relaxed">{b(active.summary)}</p>

            <div className="mt-6 p-4 rounded-xl bg-paper-deep border border-line overflow-x-auto">
              <p className="text-xs font-medium text-muted">{L('Equation', 'समीकरण')}</p>
              <p className="mt-1 font-mono text-sm sm:text-[0.95rem] text-ink whitespace-pre-wrap">{active.reaction}</p>
            </div>

            <h4 className="mt-7 text-sm font-semibold text-ink">{L('Step by step', 'चरण दर चरण')}</h4>
            <ol className="mt-3 space-y-2">
              {active.steps.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-[0.95rem] text-ink">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-accent-soft text-accent text-xs font-semibold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{b(s)}</span>
                </li>
              ))}
            </ol>

            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-line">
              <div>
                <p className="text-sm font-semibold text-ink">{L('Rule to remember', 'याद रखने का नियम')}</p>
                <p className="mt-1 text-[0.92rem] leading-relaxed text-muted">{b(active.rule)}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">{L('Why it matters in exams', 'परीक्षा में महत्व')}</p>
                <p className="mt-1 text-[0.92rem] leading-relaxed text-muted">{b(active.exam)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
