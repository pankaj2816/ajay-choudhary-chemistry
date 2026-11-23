import { ClassLevel } from '@/lib/types';

export type Grade = '9' | '10' | '11' | '12';

export interface ClassInfo {
  grade: Grade;
  level: ClassLevel;
  href: string;
  /** Short subtitle shown on cards and headers */
  course: string;
  /** NCERT chemistry chapters, with a keyword used to filter items */
  chapters: { name: string; key: string }[];
}

export const CLASS_LIST: ClassInfo[] = [
  {
    grade: '9',
    level: 'Class 9',
    href: '/class-9',
    course: 'Science: Chemistry',
    chapters: [
      { name: 'Matter in Our Surroundings', key: 'matter' },
      { name: 'Is Matter Around Us Pure?', key: 'pure' },
      { name: 'Atoms and Molecules', key: 'molecule' },
      { name: 'Structure of the Atom', key: 'atom' },
    ],
  },
  {
    grade: '10',
    level: 'Class 10',
    href: '/class-10',
    course: 'Science: Chemistry',
    chapters: [
      { name: 'Chemical Reactions and Equations', key: 'reaction' },
      { name: 'Acids, Bases and Salts', key: 'acid' },
      { name: 'Metals and Non-metals', key: 'metal' },
      { name: 'Carbon and its Compounds', key: 'carbon' },
    ],
  },
  {
    grade: '11',
    level: 'Class 11',
    href: '/class-11',
    course: 'Chemistry · Boards, JEE & NEET',
    chapters: [
      { name: 'Some Basic Concepts of Chemistry', key: 'basic concept' },
      { name: 'Structure of Atom', key: 'atom' },
      { name: 'Periodic Classification', key: 'periodic' },
      { name: 'Chemical Bonding', key: 'bonding' },
      { name: 'Thermodynamics', key: 'thermo' },
      { name: 'Equilibrium', key: 'equilibri' },
      { name: 'Redox Reactions', key: 'redox' },
      { name: 'Organic Chemistry: Basic Principles (GOC)', key: 'goc' },
      { name: 'Hydrocarbons', key: 'hydrocarbon' },
    ],
  },
  {
    grade: '12',
    level: 'Class 12',
    href: '/class-12',
    course: 'Chemistry · Boards, JEE & NEET',
    chapters: [
      { name: 'Solutions', key: 'solution' },
      { name: 'Electrochemistry', key: 'electro' },
      { name: 'Chemical Kinetics', key: 'kinetic' },
      { name: 'd- and f-Block Elements', key: 'block' },
      { name: 'Coordination Compounds', key: 'coordination' },
      { name: 'Haloalkanes and Haloarenes', key: 'halo' },
      { name: 'Alcohols, Phenols and Ethers', key: 'alcohol' },
      { name: 'Aldehydes, Ketones and Carboxylic Acids', key: 'aldehyde' },
      { name: 'Amines', key: 'amine' },
      { name: 'Biomolecules', key: 'biomolecule' },
    ],
  },
];

export const getClassInfo = (grade: Grade) => CLASS_LIST.find((c) => c.grade === grade)!;

/** True if an item tagged with `itemClass` belongs on the page for `level`. */
export function belongsToClass(itemClass: string | undefined, level: ClassLevel): boolean {
  if (!itemClass || itemClass === 'All Classes') return true;
  return itemClass === level;
}
