'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ElementTile from '@/components/ui/ElementTile';
import { PageHeader } from '@/components/ui/Editorial';
import SectionLabel from '@/components/home/premium/SectionLabel';
import InteractiveChemistryTool from '@/components/home/InteractiveChemistryTool';
import { useLanguage } from '@/context/LanguageContext';

const TILES: Record<string, { symbol: string; number: number; name: string }> = {
  organic: { symbol: 'C', number: 6, name: 'Carbon' },
  inorganic: { symbol: 'Co', number: 27, name: 'Cobalt' },
  practical: { symbol: 'Ag', number: 47, name: 'Silver' },
  physical: { symbol: 'H', number: 1, name: 'Hydrogen' },
};

type Mod = { title: string; titleHi: string; topics: string[]; topicsHi: string[] };

const SUBJECT_DETAILS: {
  id: string;
  title: string;
  titleHi: string;
  tagline: string;
  taglineHi: string;
  description: string;
  descriptionHi: string;
  coreModules: Mod[];
  materialsUrl: string;
  papersUrl: string;
}[] = [
  {
    id: 'organic',
    title: 'Organic Chemistry',
    titleHi: 'कार्बनिक रसायन',
    tagline: 'Reaction Mechanisms, Stereochemistry & Synthesis',
    taglineHi: 'अभिक्रिया क्रियाविधि, त्रिविम रसायन एवं संश्लेषण',
    description: 'Organic Chemistry is taught with an unwavering focus on electron displacement effects, reaction intermediates (carbocations, carbanions, free radicals), and transition states. Instead of rote-learning 200+ reactions, students learn how to predict product formation using standard mechanistic rules.',
    descriptionHi: 'कार्बनिक रसायन इलेक्ट्रॉन विस्थापन प्रभावों, अभिक्रियाशील मध्यवर्तियों (कार्बधनायन, कार्बऋणायन, मुक्त मूलक) और संक्रमण अवस्थाओं पर पूरा ध्यान देकर पढ़ाया जाता है। 200 से अधिक अभिक्रियाएँ रटने की जगह विद्यार्थी क्रियाविधि के सामान्य नियमों से उत्पाद का अनुमान लगाना सीखते हैं।',
    coreModules: [
      {
        title: 'General Organic Chemistry (GOC)',
        titleHi: 'सामान्य कार्बनिक रसायन (GOC)',
        topics: ['Inductive & Resonance Effects', 'Hyperconjugation & Aromaticity (Hückel’s Rule)', 'Carbocation, Carbanion & Radical Stabilities', 'Acidic & Basic Strength Comparisons'],
        topicsHi: ['प्रेरणिक एवं अनुनाद प्रभाव', 'अतिसंयुग्मन एवं ऐरोमैटिकता (ह्युकेल नियम)', 'कार्बधनायन, कार्बऋणायन एवं मूलकों का स्थायित्व', 'अम्लीय एवं क्षारीय सामर्थ्य की तुलना'],
      },
      {
        title: 'Reaction Mechanisms',
        titleHi: 'अभिक्रिया क्रियाविधि',
        topics: ['Electrophilic Addition (Markovnikov & Anti-Markovnikov)', 'Nucleophilic Substitution (SN1 vs SN2)', 'Elimination Reactions (E1, E2, Saytzeff vs Hofmann)', 'Electrophilic Aromatic Substitution (Directing Groups)'],
        topicsHi: ['इलेक्ट्रॉनस्नेही योगज (मार्कोवनिकॉफ़ एवं प्रति-मार्कोवनिकॉफ़)', 'नाभिकस्नेही प्रतिस्थापन (SN1 बनाम SN2)', 'विलोपन अभिक्रियाएँ (E1, E2, सेत्ज़ेफ़ बनाम हॉफ़मान)', 'इलेक्ट्रॉनस्नेही ऐरोमैटिक प्रतिस्थापन (निर्देशक समूह)'],
      },
      {
        title: 'Named Reactions & Conversions',
        titleHi: 'नामित अभिक्रियाएँ एवं रूपांतरण',
        topics: ['Aldol & Cannizzaro Condensation', 'Reimer-Tiemann & Kolbe’s Synthesis', 'Wurtz, Fittig & Friedel-Crafts Reactions', 'Hell-Volhard-Zelinsky (HVZ) Reaction'],
        topicsHi: ['ऐल्डोल एवं कैनिज़ारो अभिक्रिया', 'राइमर–टीमन एवं कोल्बे संश्लेषण', 'वुर्ट्ज़, फ़िटिग एवं फ़्रीडेल–क्राफ़्ट्स अभिक्रियाएँ', 'हेल–फ़ोलहार्ड–ज़ेलिंस्की (HVZ) अभिक्रिया'],
      },
      {
        title: 'Functional Groups & Biomolecules',
        titleHi: 'क्रियात्मक समूह एवं जैव-अणु',
        topics: ['Haloalkanes & Haloarenes', 'Alcohols, Phenols & Ethers', 'Carbonyl Compounds (Aldehydes, Ketones, Acids)', 'Amines, Diazonium Salts & Carbohydrates'],
        topicsHi: ['हैलोऐल्केन एवं हैलोऐरीन', 'ऐल्कोहॉल, फ़ीनॉल एवं ईथर', 'कार्बोनिल यौगिक (ऐल्डिहाइड, कीटोन, अम्ल)', 'ऐमीन, डाइऐज़ोनियम लवण एवं कार्बोहाइड्रेट'],
      },
    ],
    materialsUrl: '/study-materials?subject=Organic+Chemistry',
    papersUrl: '/question-papers?subject=Organic+Chemistry',
  },
  {
    id: 'inorganic',
    title: 'Inorganic Chemistry',
    titleHi: 'अकार्बनिक रसायन',
    tagline: 'Periodic Properties, Bonding & Coordination Chemistry',
    taglineHi: 'आवर्ती गुणधर्म, आबंधन एवं उपसहसंयोजन रसायन',
    description: 'Inorganic Chemistry is transformed from a memorization headache into a logical, structured discipline. We emphasize quantum mechanical foundations, shielding effects, lattice energies, and crystal field splitting to naturally explain trends and anomalous behaviors.',
    descriptionHi: 'अकार्बनिक रसायन को रटने के बोझ से निकालकर एक तार्किक, व्यवस्थित विषय बनाया जाता है। प्रवृत्तियों और असामान्य व्यवहार को सहज रूप से समझाने के लिए क्वांटम यांत्रिकी की नींव, परिरक्षण प्रभाव, जालक ऊर्जा और क्रिस्टल क्षेत्र विपाटन पर ज़ोर दिया जाता है।',
    coreModules: [
      {
        title: 'Periodic Classification & Trends',
        titleHi: 'आवर्ती वर्गीकरण एवं प्रवृत्तियाँ',
        topics: ['Effective Nuclear Charge (Zeff) & Slater’s Rules', 'Ionization Enthalpy & Electron Gain Enthalpy', 'Electronegativity Scales & Diagonal Relationships', 'Anomalous 2nd Period Elements Behavior'],
        topicsHi: ['प्रभावी नाभिकीय आवेश (Zeff) एवं स्लेटर नियम', 'आयनन एन्थैल्पी एवं इलेक्ट्रॉन लब्धि एन्थैल्पी', 'विद्युत-ऋणात्मकता पैमाने एवं विकर्ण संबंध', 'दूसरे आवर्त के तत्वों का असामान्य व्यवहार'],
      },
      {
        title: 'Chemical Bonding & MOT',
        titleHi: 'रासायनिक आबंधन एवं MOT',
        topics: ['VSEPR Theory & Lone Pair Repulsions', 'Hybridization (sp, sp², sp³, dsp², d²sp³)', 'Molecular Orbital Theory (MOT Energy Diagrams)', 'Dipole Moments & Hydrogen Bonding Types'],
        topicsHi: ['VSEPR सिद्धांत एवं एकाकी युग्म प्रतिकर्षण', 'संकरण (sp, sp², sp³, dsp², d²sp³)', 'आण्विक कक्षक सिद्धांत (MOT ऊर्जा आरेख)', 'द्विध्रुव आघूर्ण एवं हाइड्रोजन आबंध के प्रकार'],
      },
      {
        title: 'Coordination Compounds',
        titleHi: 'उपसहसंयोजन यौगिक',
        topics: ['Werner’s Theory & IUPAC Nomenclature', 'Isomerism (Geometrical, Optical, Linkage, Ionization)', 'Crystal Field Theory (Octahedral & Tetrahedral Δ)', 'Magnetic Moment Calculations (Spin-Only BM)'],
        topicsHi: ['वर्नर सिद्धांत एवं IUPAC नामकरण', 'समावयवता (ज्यामितीय, प्रकाशिक, बंधनी, आयनन)', 'क्रिस्टल क्षेत्र सिद्धांत (अष्टफलकीय एवं चतुष्फलकीय Δ)', 'चुंबकीय आघूर्ण की गणना (चक्रण-मात्र BM)'],
      },
      {
        title: 'Block Chemistry & Metallurgy',
        titleHi: 'ब्लॉक रसायन एवं धातुकर्म',
        topics: ['p-Block Hydrides, Oxoacids & Halides', 'd- & f-Block Transition Elements & Lanthanoid Contraction', 'Ellingham Diagrams & Metal Extraction Principles'],
        topicsHi: ['p-ब्लॉक के हाइड्राइड, ऑक्सोअम्ल एवं हैलाइड', 'd- एवं f-ब्लॉक संक्रमण तत्व एवं लैन्थेनॉयड संकुचन', 'एलिंघम आरेख एवं धातु निष्कर्षण के सिद्धांत'],
      },
    ],
    materialsUrl: '/study-materials?subject=Inorganic+Chemistry',
    papersUrl: '/question-papers?subject=Inorganic+Chemistry',
  },
  {
    id: 'physical',
    title: 'Physical Chemistry',
    titleHi: 'भौतिक रसायन',
    tagline: 'Concepts, Formulas & Numericals Step by Step',
    taglineHi: 'संकल्पनाएँ, सूत्र एवं न्यूमेरिकल चरण दर चरण',
    description: 'Physical Chemistry is where most marks are won or lost on numericals. Each formula is built from its idea first, so students know when to use it, which units to watch, and how to set out a full-marks answer in boards and competitive exams.',
    descriptionHi: 'भौतिक रसायन में ज़्यादातर अंक न्यूमेरिकल से मिलते या छूटते हैं। हर सूत्र पहले उसके विचार से बनाया जाता है, ताकि विद्यार्थी जानें कि उसे कब लगाना है, किन इकाइयों का ध्यान रखना है और बोर्ड व प्रतियोगी परीक्षा में पूरे अंक वाला उत्तर कैसे लिखना है।',
    coreModules: [
      {
        title: 'Mole Concept & Atomic Structure',
        titleHi: 'मोल संकल्पना एवं परमाणु संरचना',
        topics: ['Mole, Molar Mass & Stoichiometry', 'Limiting Reagent & Concentration Terms', 'Bohr Model & Quantum Numbers', 'Electronic Configuration & Exceptions'],
        topicsHi: ['मोल, मोलर द्रव्यमान एवं रससमीकरणमिति', 'सीमांत अभिकर्मक एवं सांद्रता के पद', 'बोर मॉडल एवं क्वांटम संख्याएँ', 'इलेक्ट्रॉनिक विन्यास एवं अपवाद'],
      },
      {
        title: 'Thermodynamics & Equilibrium',
        titleHi: 'ऊष्मागतिकी एवं साम्यावस्था',
        topics: ['First Law, Enthalpy & Hess’s Law', 'Entropy & Gibbs Energy (ΔG = ΔH − TΔS)', 'Kc, Kp & Le Chatelier’s Principle', 'pH, Buffers & Solubility Product'],
        topicsHi: ['प्रथम नियम, एन्थैल्पी एवं हेस का नियम', 'एन्ट्रॉपी एवं गिब्ज़ ऊर्जा (ΔG = ΔH − TΔS)', 'Kc, Kp एवं ले-शातेलिए सिद्धांत', 'pH, बफ़र एवं विलेयता गुणनफल'],
      },
      {
        title: 'Solutions & Electrochemistry',
        titleHi: 'विलयन एवं वैद्युतरसायन',
        topics: ['Raoult’s Law & Colligative Properties', 'Van’t Hoff Factor', 'Nernst Equation & Cell EMF', 'Conductance & Faraday’s Laws'],
        topicsHi: ['राउल्ट का नियम एवं अणुसंख्य गुणधर्म', 'वान्ट हॉफ़ गुणक', 'नेर्न्स्ट समीकरण एवं सेल विभव', 'चालकत्व एवं फ़ैराडे के नियम'],
      },
      {
        title: 'Chemical Kinetics',
        titleHi: 'रासायनिक बलगतिकी',
        topics: ['Rate Law, Order & Molecularity', 'Zero & First Order Integrated Equations', 'Half-life Calculations', 'Arrhenius Equation & Activation Energy'],
        topicsHi: ['वेग नियम, कोटि एवं आण्विकता', 'शून्य एवं प्रथम कोटि के समाकलित समीकरण', 'अर्ध-आयु की गणना', 'आरेनियस समीकरण एवं सक्रियण ऊर्जा'],
      },
    ],
    materialsUrl: '/study-materials?subject=Physical+Chemistry',
    papersUrl: '/question-papers?subject=Physical+Chemistry',
  },
  {
    id: 'practical',
    title: 'Practical Chemistry',
    titleHi: 'प्रायोगिक रसायन',
    tagline: 'Qualitative Salt Analysis, Titrations & Laboratory Technique',
    taglineHi: 'गुणात्मक लवण विश्लेषण, अनुमापन एवं प्रयोगशाला तकनीक',
    description: 'Hands-on practical understanding guarantees high scores in board practical exams and competitive test experimental questions. Students learn systematic group separation schemes, flame tests, redox calculations, and safety rules.',
    descriptionHi: 'प्रयोगों की हाथों-हाथ समझ बोर्ड की प्रायोगिक परीक्षा और प्रतियोगी परीक्षाओं के प्रायोगिक प्रश्नों में अच्छे अंक दिलाती है। विद्यार्थी समूह पृथक्करण की व्यवस्थित विधि, ज्वाला परीक्षण, अपचयोपचय गणनाएँ और सुरक्षा नियम सीखते हैं।',
    coreModules: [
      {
        title: 'Qualitative Salt Analysis',
        titleHi: 'गुणात्मक लवण विश्लेषण',
        topics: ['Zero Group (Ammonium NH₄⁺) & Nessler’s Test', 'Group I to VI Cation Separation Chemistry', 'Anion Analysis (Carbonate, Sulphate, Nitrate Brown Ring)', 'Chromyl Chloride & Lead Acetate Confirmations'],
        topicsHi: ['शून्य समूह (अमोनियम NH₄⁺) एवं नेस्लर परीक्षण', 'समूह I से VI तक धनायनों का पृथक्करण', 'ऋणायन विश्लेषण (कार्बोनेट, सल्फ़ेट, नाइट्रेट भूरा वलय)', 'क्रोमिल क्लोराइड एवं लेड ऐसीटेट पुष्टि परीक्षण'],
      },
      {
        title: 'Volumetric / Titrimetric Analysis',
        titleHi: 'आयतनमितीय / अनुमापनी विश्लेषण',
        topics: ['Oxalic Acid vs KMnO₄ Redox Titration', 'Mohr’s Salt (Ferrous Ammonium Sulphate) Estimation', 'Normality, Molarity & Strength Calculations', 'Indicator Selection & Endpoint Detection'],
        topicsHi: ['ऑक्सैलिक अम्ल बनाम KMnO₄ अपचयोपचय अनुमापन', 'मोर लवण (फ़ेरस अमोनियम सल्फ़ेट) का आकलन', 'नॉर्मलता, मोलरता एवं सामर्थ्य की गणना', 'सूचक का चयन एवं अंत्य बिंदु की पहचान'],
      },
      {
        title: 'Organic Functional Group Tests',
        titleHi: 'कार्बनिक क्रियात्मक समूह परीक्षण',
        topics: ['Tollens & Fehling Tests for Aldehydes', 'Iodoform Test for Methyl Ketones', 'Ferric Chloride Test for Phenolic Groups', 'Azo Dye Test for Primary Aromatic Amines'],
        topicsHi: ['ऐल्डिहाइड के लिए टॉलेन्स एवं फ़ेहलिंग परीक्षण', 'मेथिल कीटोन के लिए आयोडोफ़ॉर्म परीक्षण', 'फ़ीनॉलिक समूह के लिए फ़ेरिक क्लोराइड परीक्षण', 'प्राथमिक ऐरोमैटिक ऐमीन के लिए ऐज़ो रंजक परीक्षण'],
      },
      {
        title: 'Physical Experiments & Viva Voce',
        titleHi: 'भौतिक प्रयोग एवं मौखिक परीक्षा',
        topics: ['Preparation of Lyophilic & Lyophobic Sols', 'Enthalpy of Neutralization Calorimetry', 'Standard Laboratory Safety & Reagent Handling', 'Comprehensive Viva Voce Question Bank'],
        topicsHi: ['द्रवरागी एवं द्रवविरागी सॉल बनाना', 'उदासीनीकरण एन्थैल्पी का कैलोरीमिति द्वारा मापन', 'प्रयोगशाला सुरक्षा एवं अभिकर्मकों का उपयोग', 'मौखिक परीक्षा (वाइवा) का पूरा प्रश्न बैंक'],
      },
    ],
    materialsUrl: '/study-materials?subject=Practical+Chemistry',
    papersUrl: '/question-papers?subject=Practical+Chemistry',
  },
];

export default function SubjectsPage() {
  const { L } = useLanguage();
  return (
    <>
      <PageHeader
        label={L('Curriculum', 'पाठ्यक्रम')}
        title={L('Chemistry subjects & expertise', 'रसायन विज्ञान के विषय')}
        intro={L(
          'Detailed syllabus breakdowns and the way each part of Chemistry is taught: Organic, Inorganic, Physical and Practical.',
          'हर भाग का विस्तृत पाठ्यक्रम और उसे पढ़ाने का तरीका: कार्बनिक, अकार्बनिक, भौतिक और प्रायोगिक रसायन।',
        )}
        aside={
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label={L('Jump to subject', 'विषय पर जाएँ')}>
            {SUBJECT_DETAILS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="link-underline text-ink">
                {L(s.title, s.titleHi)}
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
                  <SectionLabel index={String(idx + 1).padStart(2, '0')} label={L('Subject', 'विषय')} />
                  <div className="mt-8 flex items-start gap-5">
                    <ElementTile {...tile} size="lg" tone={idx === 0 ? 'accent' : 'light'} />
                    <div>
                      <h2 className="text-4xl sm:text-5xl leading-[1.05] text-ink">{L(subj.title, subj.titleHi)}</h2>
                      <p className="mt-2 text-accent">{L(subj.tagline, subj.taglineHi)}</p>
                    </div>
                  </div>
                  <p className="mt-8 text-[1.02rem] leading-relaxed text-muted">{L(subj.description, subj.descriptionHi)}</p>
                  <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                    <Link href={subj.materialsUrl} className="group inline-flex items-center gap-2 px-6 py-3.5 bg-ink text-paper text-sm font-medium hover:bg-accent transition-colors">
                      {L('Study material', 'अध्ययन सामग्री')}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link href={subj.papersUrl} className="link-underline text-sm font-medium text-ink">
                      {L('Question papers', 'प्रश्न पत्र')}
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 lg:pt-16">
                  {subj.coreModules.map((mod) => (
                    <div key={mod.title} className="border-t border-ink pt-5">
                      <h3 className="font-display text-xl text-ink">{L(mod.title, mod.titleHi)}</h3>
                      <ul className="mt-3">
                        {mod.topics.map((topic, ti) => (
                          <li key={topic} className="py-2 border-b border-line text-[0.92rem] text-muted">
                            {L(topic, mod.topicsHi[ti] || topic)}
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
