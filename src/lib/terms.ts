import { CLASS_LIST } from './classes';

/**
 * Hindi names for fixed labels stored in the data (subjects, classes, types,
 * categories). Anything not listed is shown as stored.
 */
const HI: Record<string, string> = {
  // Subjects
  'Organic Chemistry': 'कार्बनिक रसायन',
  'Inorganic Chemistry': 'अकार्बनिक रसायन',
  'Practical Chemistry': 'प्रायोगिक रसायन',
  'Physical Chemistry': 'भौतिक रसायन',
  Science: 'विज्ञान',
  // Classes
  'Class 9': 'कक्षा 9',
  'Class 10': 'कक्षा 10',
  'Class 11': 'कक्षा 11',
  'Class 12': 'कक्षा 12',
  'Dropper / JEE / NEET': 'ड्रॉपर / JEE / NEET',
  'All Classes': 'सभी कक्षाएँ',
  // Resource types
  'Chapter Notes': 'अध्याय नोट्स',
  'Reaction Sheet': 'अभिक्रिया शीट',
  'Formula Sheet': 'सूत्र शीट',
  'Important Questions': 'महत्वपूर्ण प्रश्न',
  'Practice Worksheet': 'अभ्यास वर्कशीट',
  'Practical Manual': 'प्रायोगिक मैनुअल',
  'Revision Material': 'रिवीज़न सामग्री',
  Book: 'पुस्तक',
  Other: 'अन्य',
  // Test types
  'Unit Test': 'यूनिट टेस्ट',
  'Periodic Test': 'आवधिक परीक्षा',
  'Term Examination': 'सत्र परीक्षा',
  'Board Mock Test': 'बोर्ड मॉक टेस्ट',
  'JEE Main & Adv DPP': 'JEE मेन व एडवांस्ड DPP',
  'NEET Practice': 'NEET अभ्यास',
  // Notice categories
  'Important Notice': 'महत्वपूर्ण सूचना',
  'Class Update': 'कक्षा अपडेट',
  'Test / Examination': 'टेस्ट / परीक्षा',
  Assignment: 'असाइनमेंट',
  'Study Material': 'अध्ययन सामग्री',
  'Question Paper': 'प्रश्न पत्र',
  'General Announcement': 'सामान्य घोषणा',
  // Chapters (taxonomy names used in uploads)
  'General Organic Chemistry (GOC)': 'सामान्य कार्बनिक रसायन (GOC)',
  'Hydrocarbons (Alkanes, Alkenes, Alkynes)': 'हाइड्रोकार्बन (ऐल्केन, ऐल्कीन, ऐल्काइन)',
  'Haloalkanes and Haloarenes': 'हैलोऐल्केन तथा हैलोऐरीन',
  'Haloalkanes & Haloarenes': 'हैलोऐल्केन तथा हैलोऐरीन',
  'Alcohols, Phenols and Ethers': 'ऐल्कोहॉल, फ़ीनॉल एवं ईथर',
  'Aldehydes, Ketones and Carboxylic Acids': 'ऐल्डिहाइड, कीटोन एवं कार्बोक्सिलिक अम्ल',
  'Aldehydes, Ketones & Carboxylic Acids': 'ऐल्डिहाइड, कीटोन एवं कार्बोक्सिलिक अम्ल',
  'Amines and Diazonium Salts': 'ऐमीन एवं डाइऐज़ोनियम लवण',
  'Biomolecules & Polymers': 'जैव-अणु एवं बहुलक',
  'Organic Reaction Mechanisms': 'कार्बनिक अभिक्रिया क्रियाविधि',
  'Benzene & Aromatic Hydrocarbons': 'बेन्ज़ीन एवं ऐरोमैटिक हाइड्रोकार्बन',
  'Periodic Classification & Trends': 'आवर्ती वर्गीकरण एवं प्रवृत्तियाँ',
  'Chemical Bonding & Molecular Structure': 'रासायनिक आबंधन तथा आण्विक संरचना',
  'Coordination Compounds': 'उपसहसंयोजन यौगिक',
  'p-Block Elements (Group 15-18)': 'p-ब्लॉक तत्व (वर्ग 15-18)',
  'd and f Block Elements': 'd- एवं f- ब्लॉक तत्व',
  'Metallurgy & Isolation Principles': 'धातुकर्म एवं निष्कर्षण के सिद्धांत',
  'Hydrogen & s-Block Elements': 'हाइड्रोजन एवं s-ब्लॉक तत्व',
  'Qualitative Salt Analysis (Cations & Anions)': 'गुणात्मक लवण विश्लेषण (धनायन व ऋणायन)',
  'Volumetric Analysis (Titration Calculations)': 'आयतनमितीय विश्लेषण (अनुमापन गणनाएँ)',
  'Organic Functional Group Identification Tests': 'कार्बनिक क्रियात्मक समूहों के पहचान परीक्षण',
  'Preparation of Lyophilic & Lyophobic Sols': 'द्रवरागी एवं द्रवविरागी सॉल बनाना',
  'Laboratory Safety Protocols & Apparatus Setup': 'प्रयोगशाला सुरक्षा नियम एवं उपकरण व्यवस्था',
  'Some Basic Concepts of Chemistry (Mole Concept)': 'रसायन विज्ञान की कुछ मूल अवधारणाएँ (मोल संकल्पना)',
  'Structure of Atom': 'परमाणु की संरचना',
  'Chemical Thermodynamics & Energetics': 'रासायनिक ऊष्मागतिकी एवं ऊर्जिकी',
  'Equilibrium (Chemical & Ionic)': 'साम्यावस्था (रासायनिक व आयनिक)',
  'Solutions & Colligative Properties': 'विलयन एवं अणुसंख्य गुणधर्म',
  Electrochemistry: 'वैद्युतरसायन',
  // Article tags
  'Chemical bonding': 'रासायनिक आबंधन',
  'Structure of atom': 'परमाणु की संरचना',
  Practical: 'प्रैक्टिकल',
  'Everyday chemistry': 'रोज़मर्रा का रसायन',
  Redox: 'अपचयोपचय',
  Biomolecules: 'जैव-अणु',
  'Chemical Kinetics': 'रासायनिक बलगतिकी',
};

const CHAPTER_HI: Record<string, string> = Object.fromEntries(
  CLASS_LIST.flatMap((c) => c.chapters.map((ch) => [ch.name, ch.nameHi] as const)),
);

export function term(value: string | undefined, isHi: boolean): string {
  if (!value) return '';
  return isHi ? HI[value] || CHAPTER_HI[value] || value : value;
}

/** Counts like "3 items" in either language. */
export function count(n: number, en: [string, string], hi: string, isHi: boolean) {
  return isHi ? `${n} ${hi}` : `${n} ${n === 1 ? en[0] : en[1]}`;
}

/** "90 Minutes" / "3 Hours" → Hindi */
export function duration(value: string | undefined, isHi: boolean): string {
  if (!value) return '';
  if (!isHi) return value;
  return value
    .replace(/\bMinutes?\b|\bMins?\b/i, 'मिनट')
    .replace(/\bHours?\b|\bHrs?\b/i, 'घंटे');
}

export function formatDate(iso: string, isHi: boolean, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(isHi ? 'hi-IN' : 'en-IN', opts);
}
