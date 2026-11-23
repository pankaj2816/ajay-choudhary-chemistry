import { ClassLevel } from '@/lib/types';

export type Grade = '9' | '10' | '11' | '12';

export interface ClassInfo {
  grade: Grade;
  level: ClassLevel;
  href: string;
  /** Short subtitle shown on cards and headers */
  course: string;
  courseHi: string;
  /** NCERT chemistry chapters, with a keyword used to filter items */
  chapters: { name: string; nameHi: string; key: string }[];
}

export const CLASS_LIST: ClassInfo[] = [
  {
    grade: '9',
    level: 'Class 9',
    href: '/class-9',
    course: 'Science: Chemistry',
    courseHi: 'विज्ञान: रसायन',
    chapters: [
      { name: 'Matter in Our Surroundings', nameHi: 'हमारे आस-पास के पदार्थ', key: 'matter' },
      { name: 'Is Matter Around Us Pure?', nameHi: 'क्या हमारे आस-पास के पदार्थ शुद्ध हैं?', key: 'pure' },
      { name: 'Atoms and Molecules', nameHi: 'परमाणु एवं अणु', key: 'molecule' },
      { name: 'Structure of the Atom', nameHi: 'परमाणु की संरचना', key: 'atom' },
    ],
  },
  {
    grade: '10',
    level: 'Class 10',
    href: '/class-10',
    course: 'Science: Chemistry',
    courseHi: 'विज्ञान: रसायन',
    chapters: [
      { name: 'Chemical Reactions and Equations', nameHi: 'रासायनिक अभिक्रियाएँ एवं समीकरण', key: 'reaction' },
      { name: 'Acids, Bases and Salts', nameHi: 'अम्ल, क्षारक एवं लवण', key: 'acid' },
      { name: 'Metals and Non-metals', nameHi: 'धातु एवं अधातु', key: 'metal' },
      { name: 'Carbon and its Compounds', nameHi: 'कार्बन एवं उसके यौगिक', key: 'carbon' },
    ],
  },
  {
    grade: '11',
    level: 'Class 11',
    href: '/class-11',
    course: 'Chemistry · Boards, JEE & NEET',
    courseHi: 'रसायन · बोर्ड, JEE और NEET',
    chapters: [
      { name: 'Some Basic Concepts of Chemistry', nameHi: 'रसायन विज्ञान की कुछ मूल अवधारणाएँ', key: 'basic concept' },
      { name: 'Structure of Atom', nameHi: 'परमाणु की संरचना', key: 'atom' },
      { name: 'Periodic Classification', nameHi: 'तत्वों का आवर्ती वर्गीकरण', key: 'periodic' },
      { name: 'Chemical Bonding', nameHi: 'रासायनिक आबंधन', key: 'bonding' },
      { name: 'Thermodynamics', nameHi: 'ऊष्मागतिकी', key: 'thermo' },
      { name: 'Equilibrium', nameHi: 'साम्यावस्था', key: 'equilibri' },
      { name: 'Redox Reactions', nameHi: 'अपचयोपचय अभिक्रियाएँ', key: 'redox' },
      { name: 'Organic Chemistry: Basic Principles (GOC)', nameHi: 'कार्बनिक रसायन: मूल सिद्धांत (GOC)', key: 'goc' },
      { name: 'Hydrocarbons', nameHi: 'हाइड्रोकार्बन', key: 'hydrocarbon' },
    ],
  },
  {
    grade: '12',
    level: 'Class 12',
    href: '/class-12',
    course: 'Chemistry · Boards, JEE & NEET',
    courseHi: 'रसायन · बोर्ड, JEE और NEET',
    chapters: [
      { name: 'Solutions', nameHi: 'विलयन', key: 'solution' },
      { name: 'Electrochemistry', nameHi: 'वैद्युत रसायन', key: 'electro' },
      { name: 'Chemical Kinetics', nameHi: 'रासायनिक बलगतिकी', key: 'kinetic' },
      { name: 'd- and f-Block Elements', nameHi: 'd- एवं f-ब्लॉक के तत्व', key: 'block' },
      { name: 'Coordination Compounds', nameHi: 'उपसहसंयोजन यौगिक', key: 'coordination' },
      { name: 'Haloalkanes and Haloarenes', nameHi: 'हैलोऐल्केन तथा हैलोऐरीन', key: 'halo' },
      { name: 'Alcohols, Phenols and Ethers', nameHi: 'ऐल्कोहॉल, फ़ीनॉल एवं ईथर', key: 'alcohol' },
      { name: 'Aldehydes, Ketones and Carboxylic Acids', nameHi: 'ऐल्डिहाइड, कीटोन एवं कार्बोक्सिलिक अम्ल', key: 'aldehyde' },
      { name: 'Amines', nameHi: 'ऐमीन', key: 'amine' },
      { name: 'Biomolecules', nameHi: 'जैव-अणु', key: 'biomolecule' },
    ],
  },
];

export const getClassInfo = (grade: Grade) => CLASS_LIST.find((c) => c.grade === grade)!;

/** True if an item tagged with `itemClass` belongs on the page for `level`. */
export function belongsToClass(itemClass: string | undefined, level: ClassLevel): boolean {
  if (!itemClass || itemClass === 'All Classes') return true;
  return itemClass === level;
}
