'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'hinglish';

export interface Translations {
  // Nav
  nav: {
    home: string;
    about: string;
    subjects: string;
    updates: string;
    studyMaterials: string;
    questionPapers: string;
    solutions: string;
    contact: string;
    search: string;
    admin: string;
  };
  // Banner
  banner: {
    announcement: string;
    text: string;
    viewNotice: string;
  };
  // Hero
  hero: {
    badge: string;
    centersCount: string;
    titleLine1: string;
    titleHighlight: string;
    description: string;
    organicTitle: string;
    organicSub: string;
    inorganicTitle: string;
    inorganicSub: string;
    practicalTitle: string;
    practicalSub: string;
    ctaMaterials: string;
    ctaNotices: string;
    ctaContact: string;
    statStudents: string;
    statConcept: string;
    statPapers: string;
    teacherCardRole: string;
    teachingAt: string;
    teachingCenters: string;
    teachingExp: string;
    experienceYears: string;
  };
  // Stats
  stats: {
    expTitle: string;
    expDesc: string;
    centersTitle: string;
    centersDesc: string;
    masteryTitle: string;
    masteryDesc: string;
    studentsTitle: string;
    studentsDesc: string;
  };
  // Subjects
  subjects: {
    badge: string;
    title: string;
    subtitle: string;
    organicName: string;
    organicDesc: string;
    inorganicName: string;
    inorganicDesc: string;
    physicalName: string;
    physicalDesc: string;
    practicalName: string;
    practicalDesc: string;
    exploreBtn: string;
  };
  // Notice board
  notices: {
    badge: string;
    title: string;
    subtitle: string;
    viewAll: string;
    downloadBtn: string;
    pinned: string;
    allBatches: string;
    clickToRead: string;
  };
  // Featured Materials
  materials: {
    badge: string;
    title: string;
    subtitle: string;
    viewVault: string;
    previewBtn: string;
    downloadBtn: string;
    downloadsText: string;
  };
  // Papers & Solutions
  papersSolutions: {
    badge: string;
    title: string;
    subtitle: string;
    viewSolution: string;
    viewPaper: string;
    downloadPdf: string;
    allPapersBtn: string;
    allSolutionsBtn: string;
    solutionReady: string;
    officialKey: string;
  };
  // Why Learn
  whyLearn: {
    badge: string;
    title: string;
    subtitle: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    pillar4Title: string;
    pillar4Desc: string;
    pillar5Title: string;
    pillar5Desc: string;
    pillar6Title: string;
    pillar6Desc: string;
  };
  // Portfolio
  portfolio: {
    badge: string;
    title: string;
    subtitle: string;
    bannerTag: string;
    bannerHeading: string;
    bannerSub: string;
    readBio: string;
  };
  // Interactive Tool
  interactive: {
    badge: string;
    title: string;
    subtitle: string;
    selectTopic: string;
    reactionBoxTitle: string;
    mechanismTitle: string;
    takeawayTitle: string;
    examRelevance: string;
  };
  // CTA
  cta: {
    badge: string;
    title: string;
    description: string;
    joinBtn: string;
    emailBtn: string;
  };
  // Contact
  contact: {
    title: string;
    subtitle: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    classLabel: string;
    messageLabel: string;
    sendBtn: string;
    sending: string;
    centersTitle: string;
    schedulesTitle: string;
    faqTitle: string;
  };
  // About Page
  about: {
    heroBadge: string;
    heroTitle: string;
    heroDesc: string;
    journeyBadge: string;
    journeyTitle: string;
    journeyP1: string;
    journeyP2: string;
    statExp: string;
    statExpLabel: string;
    statCenters: string;
    statCentersLabel: string;
    statStudents: string;
    statStudentsLabel: string;
    philosophyBadge: string;
    philosophyQuote: string;
    philosophySub: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    step5Title: string;
    step5Desc: string;
    step6Title: string;
    step6Desc: string;
    centersBadge: string;
    centersTitle: string;
    centersSub: string;
    center1Name: string;
    center1Batch: string;
    center1Schedule: string;
    center2Name: string;
    center2Batch: string;
    center2Schedule: string;
    center3Name: string;
    center3Batch: string;
    center3Schedule: string;
    credentialsBadge: string;
    credentialsTitle: string;
    credentialsSub: string;
    qual1Title: string;
    qual1Desc: string;
    qual2Title: string;
    qual2Desc: string;
    qual3Title: string;
    qual3Desc: string;
    qual4Title: string;
    qual4Desc: string;
    ctaTitle: string;
    ctaSub: string;
    ctaContactBtn: string;
    ctaNotesBtn: string;
  };
  // Inner Pages Common
  pages: {
    allClasses: string;
    allSubjects: string;
    allCategories: string;
    allTypes: string;
    searchPlaceholder: string;
    downloadBtn: string;
    previewBtn: string;
    viewSolutionBtn: string;
    viewPaperBtn: string;
    closeBtn: string;
    noResults: string;
    noResultsSub: string;
  };
  // Premium home page
  home: {
    eyebrow: string;
    factYears: string;
    factCenters: string;
    factStudents: string;
    secAbout: string;
    aboutTitle: string;
    readProfile: string;
    secSubjects: string;
    secMethod: string;
    methodTitle: string;
    secResources: string;
    resourcesTitle: string;
    latestNotes: string;
    latestPapers: string;
    download: string;
    paper: string;
    solution: string;
    viewAll: string;
    secNotices: string;
    readNotice: string;
    secVisit: string;
    visitTitle: string;
    visitSub: string;
    enquire: string;
    whatsapp: string;
    call: string;
    footerLine: string;
    resources: string;
    notesNav: string;
    articlesNav: string;
    learnLabel: string;
    learnTitle: string;
    learnSub: string;
    notesForClass: string;
    allNotes: string;
    allArticles: string;
  };
  // Class pages
  classes: {
    navLabel: string;
    chooseLabel: string;
    chooseTitle: string;
    chooseSub: string;
    pageLabel: string;
    everything: string;
    notesBooks: string;
    papers: string;
    solutions: string;
    notices: string;
    chapters: string;
    share: string;
    copyLink: string;
    copied: string;
    emptyTitle: string;
    emptyBody: string;
    item: string;
    items: string;
    open: string;
    searchPlaceholder: string;
  };
  // Footer
  footer: {
    tagline: string;
    specializationsTitle: string;
    centersTitle: string;
    resourcesTitle: string;
    rightsReserved: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      subjects: 'Subjects',
      updates: 'Notice Board',
      studyMaterials: 'Study Materials',
      questionPapers: 'Question Papers',
      solutions: 'Solutions',
      contact: 'Contact',
      search: 'Search',
      admin: 'Admin'
    },
    banner: {
      announcement: 'Important Announcement',
      text: '📢 Admissions Open for Class 11 & 12 Chemistry Master Batch & JEE/NEET Revision. Check Notice Board!',
      viewNotice: 'View Notice'
    },
    hero: {
      badge: '8+ Years of Chemistry Teaching Excellence',
      centersCount: '3 schools in Alwar',
      titleLine1: 'Master Chemistry with',
      titleHighlight: 'Ajay Choudhary Sir',
      description: 'Organic reaction mechanisms, inorganic chemistry, physical chemistry numericals and lab practicals, explained from first principles for Class 11 & 12 Boards, JEE and NEET.',
      organicTitle: 'Organic Chemistry',
      organicSub: 'Reaction Mechanisms & Roadmaps',
      inorganicTitle: 'Inorganic Chemistry',
      inorganicSub: 'Periodic Trends & CFT Bonding',
      practicalTitle: 'Practical Chemistry',
      practicalSub: 'Qualitative Salt Analysis & Viva Prep',
      ctaMaterials: 'Access Study Materials',
      ctaNotices: 'Notice Board & Updates',
      ctaContact: 'Email Ajay Sir',
      statStudents: '5,000+ Students Mentored',
      statConcept: '100% Concept-Driven Learning',
      statPapers: 'Free Question Papers & Solutions',
      teacherCardRole: 'Senior Chemistry Faculty • 8+ Years Exp',
      teachingAt: 'Teaching At',
      teachingCenters: '3 schools in Alwar',
      teachingExp: 'Experience',
      experienceYears: '8+ Years'
    },
    stats: {
      expTitle: '8+ Years',
      expDesc: 'Of dedicated classroom and board exam chemistry mentoring',
      centersTitle: '3 schools',
      centersDesc: 'Class 11 & 12 Board classes in Alwar, Rajasthan',
      masteryTitle: '100% Conceptual',
      masteryDesc: 'Mechanisms & orbital logic over rote memorization',
      studentsTitle: '5,000+ Students',
      studentsDesc: 'Mentored to 95%+ in Boards & top JEE/NEET percentiles'
    },
    subjects: {
      badge: 'Core Chemistry Curriculum',
      title: 'Four parts of chemistry, one clear method',
      subtitle: 'A first-principles approach that helps students picture reactions, understand periodic trends, solve physical chemistry numericals and score well in practical exams.',
      organicName: 'Organic Chemistry',
      organicDesc: 'Curved-arrow mechanisms, resonance stabilization, stereochemistry, named reactions, and multi-step synthesis roadmaps.',
      inorganicName: 'Inorganic Chemistry',
      inorganicDesc: 'Crystal Field Theory (CFT), coordination compounds, periodic trends, chemical bonding, and molecular orbital diagrams.',
      physicalName: 'Physical Chemistry',
      physicalDesc: 'Mole concept, thermodynamics, equilibrium, electrochemistry and kinetics, with numericals solved step by step.',
      practicalName: 'Practical Chemistry',
      practicalDesc: 'Qualitative salt analysis, cation/anion identification flowcharts, titrimetric calculations, and board viva voce mastery.',
      exploreBtn: 'Explore Topics & Notes'
    },
    notices: {
      badge: 'Official Announcements',
      title: 'Latest Notices, Exam Dates & Batch Updates',
      subtitle: 'Test dates, homework, doubt classes and holiday notices for students at all three schools.',
      viewAll: 'View All Notices',
      downloadBtn: 'Download Attachment',
      pinned: 'Pinned Announcement',
      allBatches: 'All Batches',
      clickToRead: 'Click to read full announcement'
    },
    materials: {
      badge: 'Free Academic Vault',
      title: 'Featured Chapter Notes & Formula Sheets',
      subtitle: 'Download curated PDF notes, reaction roadmaps, and revision cheat-sheets authored directly by Ajay Choudhary Sir.',
      viewVault: 'View Full Study Vault',
      previewBtn: 'Preview PDF',
      downloadBtn: 'Download PDF',
      downloadsText: 'downloads'
    },
    papersSolutions: {
      badge: 'Practice & Validate',
      title: 'Latest Question Papers & Verified Solutions',
      subtitle: 'Practice with previous year papers, unit tests, and board mock exams with detailed step-by-step verified solution keys.',
      viewSolution: 'View Solution',
      viewPaper: 'View Paper',
      downloadPdf: 'Download PDF',
      allPapersBtn: 'Browse All Papers',
      allSolutionsBtn: 'Browse All Solutions',
      solutionReady: 'Solution Available',
      officialKey: 'Verified Solution & Marking Key'
    },
    whyLearn: {
      badge: 'Teaching Methodology',
      title: 'Why Learn Chemistry with Ajay Sir?',
      subtitle: 'A 6-step systematic methodology that turns complex chemical reactions into intuitive, logical understanding.',
      pillar1Title: 'First-Principles Foundation',
      pillar1Desc: 'Deconstruct atomic structures, hybridization, and electronic configurations before tackling complex problems.',
      pillar2Title: 'Visual Reaction Mechanisms',
      pillar2Desc: 'Master electron movements with curved-arrow notation instead of memorizing hundreds of disconnected equations.',
      pillar3Title: 'Lab Practical Integration',
      pillar3Desc: 'Correlate textbook equations with real laboratory precipitate colors, flame tests, and titration endpoints.',
      pillar4Title: 'Graduated Multi-Tier Practice',
      pillar4Desc: 'Progressive problem solving from NCERT & Board exemplars to high-yield JEE Main and NEET DPPs.',
      pillar5Title: 'Mistake Analysis & Doubts',
      pillar5Desc: 'Regular unit test reviews, identifying conceptual traps, calculation errors, and examiner tricks.',
      pillar6Title: 'Board Exam Presentation Tactics',
      pillar6Desc: 'Structured methods for 3-mark & 5-mark answers with balanced equations, ensuring zero marks lost.'
    },
    portfolio: {
      badge: 'Classroom & Laboratory',
      title: 'Academic Experience & Teaching Portfolio',
      subtitle: 'Explore Ajay Sir’s classroom lectures, practical lab demonstrations, and student mentorship sessions.',
      bannerTag: 'Dedicated Academic Mentorship',
      bannerHeading: 'Teaching at 3 schools in Alwar',
      bannerSub: 'Guiding Class 11, Class 12, JEE Main, and NEET aspirants to conceptual mastery.',
      readBio: 'Read Full Faculty Bio'
    },
    interactive: {
      badge: 'Concept explorer',
      title: 'Five key ideas, step by step',
      subtitle: 'Pick a topic to see the equation, the steps and why it matters in exams.',
      selectTopic: 'Select Chemistry Topic:',
      reactionBoxTitle: 'Chemical Equation & Reaction Pathway',
      mechanismTitle: 'Step-by-Step Reaction Mechanism:',
      takeawayTitle: 'Key Concept Rule:',
      examRelevance: 'Exam Scoring Weightage:'
    },
    cta: {
      badge: 'Admissions & Guidance',
      title: 'Ready to Score 95%+ in Chemistry & Crack JEE/NEET?',
      description: 'Learn chemistry with Ajay Sir at Vasundhara, Poddar or Indra Public School in Alwar, or send an enquiry.',
      joinBtn: 'Send Admission Inquiry',
      emailBtn: 'Contact via Email'
    },
    contact: {
      title: 'Get in Touch with Ajay Choudhary Sir',
      subtitle: 'Have a question regarding batch timings, admissions, or test series? Send an inquiry or reach out directly.',
      nameLabel: 'Your Full Name *',
      emailLabel: 'Email Address *',
      phoneLabel: 'Phone Number (Optional)',
      classLabel: 'Student Class / Academic Level',
      messageLabel: 'Your Message or Question *',
      sendBtn: 'Submit Inquiry Message',
      sending: 'Submitting...',
      centersTitle: 'Schools & locations',
      schedulesTitle: 'Weekly Class Schedule',
      faqTitle: 'Frequently Asked Questions'
    },
    about: {
      heroBadge: 'Faculty Profile',
      heroTitle: 'About Ajay Choudhary Sir',
      heroDesc: 'Senior Chemistry teacher with 8+ years of experience, teaching Class 11 and 12 Board students at three schools in Alwar, Rajasthan.',
      journeyBadge: 'Pedagogical Journey',
      journeyTitle: 'Demystifying Chemistry Through Logic, Clarity & Laboratory Insights',
      journeyP1: 'Ajay Choudhary Sir began his teaching career with a single goal: to dismantle the widespread myth that Chemistry requires endless mechanical memorization. Over the past 8+ years, he has guided more than 5,000 students across Class 11, Class 12, CBSE/ISC Boards, JEE Main, and NEET.',
      journeyP2: 'Ajay Sir currently teaches Class 11 and 12 Chemistry at three schools in Alwar district, Rajasthan. He is known for clear mental maps of organic reaction mechanisms, explaining the reasons behind inorganic trends, making physical chemistry numericals simple, and hands-on practical and salt analysis sessions.',
      statExp: '8+',
      statExpLabel: 'Years Experience',
      statCenters: '3',
      statCentersLabel: 'Schools',
      statStudents: '5,000+',
      statStudentsLabel: 'Students Mentored',
      philosophyBadge: 'Teaching Philosophy',
      philosophyQuote: '“Chemistry becomes effortless when concepts are understood, not just memorized.”',
      philosophySub: 'The 6-step systematic methodology implemented across all batch lectures and doubt clinics.',
      step1Title: '1. Build Strong Fundamentals',
      step1Desc: 'Deconstruct core chemical principles, atomic structure, and electronic configurations before tackling complex problems.',
      step2Title: '2. Deep Conceptual Visualization',
      step2Desc: 'Master reaction pathways through curved-arrow notation and molecular orbital models instead of rote memorization.',
      step3Title: '3. Connect Theory with Practical Experiments',
      step3Desc: 'Reinforce chemical equations by correlating them with qualitative salt analysis colors, precipitates, and titrimetric endpoints.',
      step4Title: '4. Targeted Multi-Tier Practice',
      step4Desc: 'Progressive problem solving from NCERT & Board exemplar questions to high-yield JEE Main, Advanced, and NEET DPPs.',
      step5Title: '5. Detailed Mistake Analysis',
      step5Desc: 'Regular unit test reviews, pinpointing conceptual traps, calculation errors, and common examiner tricks.',
      step6Title: '6. Systematic Examination Temperament',
      step6Desc: 'Time management drills, structured presentation methods for 3-mark & 5-mark board answers, and speed tactics for MCQs.',
      centersBadge: 'Where he teaches',
      centersTitle: 'Schools where Ajay Sir teaches',
      centersSub: 'Ajay Sir teaches Class 11 and 12 Board Chemistry at these three schools in Alwar, Rajasthan.',
      center1Name: 'Vasundhara Senior Secondary School',
      center1Batch: 'Class 11th and 12th Board',
      center1Schedule: '',
      center2Name: 'Poddar Senior Secondary School',
      center2Batch: 'Class 11th and 12th Board, Foundation Chemistry',
      center2Schedule: '',
      center3Name: 'Indra Public School',
      center3Batch: 'Class 11th and 12th Board',
      center3Schedule: '',
      credentialsBadge: 'Verified Qualifications',
      credentialsTitle: 'Academic Credentials & Honors',
      credentialsSub: 'Formal qualifications and pedagogical training backing Ajay Sir’s teaching excellence.',
      qual1Title: 'Master of Science (M.Sc.) in Chemistry',
      qual1Desc: 'Specialization in Organic Synthesis, Reaction Kinetics & Spectroscopy with First Division Honors.',
      qual2Title: 'Bachelor of Education (B.Ed)',
      qual2Desc: 'Certified in Modern Science Pedagogy, Diagnostic Assessment & Remedial Teaching Methodologies.',
      qual3Title: '8+ Years Senior Chemistry Faculty',
      qual3Desc: 'Mentored over 5,000 students with numerous 95%+ Board scorers and top 1% JEE/NEET ranks.',
      qual4Title: 'Practical Chemistry Specialist',
      qual4Desc: 'Conducted 100+ hands-on Salt Analysis and Volumetric Titration laboratory workshops.',
      ctaTitle: 'Learn Chemistry with Total Conceptual Clarity',
      ctaSub: 'Connect with Ajay Sir for batch admissions, study materials, or academic guidance.',
      ctaContactBtn: 'Send Inquiry Message',
      ctaNotesBtn: 'Explore Study Materials'
    },
    pages: {
      allClasses: 'All Classes',
      allSubjects: 'All Subjects',
      allCategories: 'All Categories',
      allTypes: 'All Types',
      searchPlaceholder: 'Search by topic, chapter, or keyword...',
      downloadBtn: 'Download PDF',
      previewBtn: 'Preview PDF',
      viewSolutionBtn: 'View Solution',
      viewPaperBtn: 'View Paper',
      closeBtn: 'Close',
      noResults: 'No materials found matching your search criteria.',
      noResultsSub: 'Try adjusting your search keywords or removing selected filters.'
    },
    home: {
      eyebrow: 'Chemistry · Class 11 & 12 · JEE · NEET',
      factYears: 'years of teaching',
      factCenters: 'schools',
      factStudents: 'students taught',
      secAbout: 'About',
      aboutTitle: 'Concepts first. The marks follow.',
      readProfile: 'Read full profile',
      secSubjects: 'What he teaches',
      secMethod: 'Method',
      methodTitle: 'How a chapter is taught',
      secResources: 'Free resources',
      resourcesTitle: 'Notes, papers and worked solutions',
      latestNotes: 'Latest study material',
      latestPapers: 'Recent question papers',
      download: 'Download',
      paper: 'Paper',
      solution: 'Solution',
      viewAll: 'View all',
      secNotices: 'Notice board',
      readNotice: 'Read notice',
      secVisit: 'Join a batch',
      visitTitle: 'Study with Ajay Sir at a school near you.',
      visitSub: 'Ask about batch timings, fees or a free demo class. You will get a reply within a day.',
      enquire: 'Send an enquiry',
      whatsapp: 'WhatsApp',
      call: 'Call',
      footerLine: 'Chemistry, understood.',
      resources: 'Resources',
      notesNav: 'Concept notes',
      articlesNav: 'Articles',
      learnLabel: 'Read & learn',
      learnTitle: 'Chemistry around you',
      learnSub: 'Short illustrated articles and simple chapter notes that make concepts click.',
      notesForClass: 'Concept notes for this class',
      allNotes: 'All concept notes',
      allArticles: 'All articles'
    },
    classes: {
      navLabel: 'Classes',
      chooseLabel: 'Your class',
      chooseTitle: 'Choose your class',
      chooseSub: 'Everything for your class in one place: notes, books, test papers, solutions and notices.',
      pageLabel: 'Class',
      everything: 'Everything',
      notesBooks: 'Notes & books',
      papers: 'Question papers',
      solutions: 'Solutions',
      notices: 'Notices',
      chapters: 'Chapters',
      share: 'Share on WhatsApp',
      copyLink: 'Copy link',
      copied: 'Link copied',
      emptyTitle: 'Nothing here yet',
      emptyBody: 'Ajay Sir will add material for this class soon. Please check back later.',
      item: 'item',
      items: 'items',
      open: 'Open',
      searchPlaceholder: 'Search this class…'
    },
    footer: {
      tagline: 'Helping students master Organic, Inorganic, Physical and Practical Chemistry, with 8+ years of teaching at schools in Alwar, Rajasthan.',
      specializationsTitle: 'Specializations',
      centersTitle: 'Schools',
      resourcesTitle: 'Student Resources',
      rightsReserved: 'All rights reserved. Ajay Choudhary Chemistry Platform.'
    }
  },

  hi: {
    nav: {
      home: 'होम',
      about: 'परिचय',
      subjects: 'विषय',
      updates: 'नोटिस बोर्ड',
      studyMaterials: 'अध्ययन सामग्री',
      questionPapers: 'प्रश्न पत्र',
      solutions: 'समाधान',
      contact: 'संपर्क करें',
      search: 'खोजें',
      admin: 'एडमिन'
    },
    banner: {
      announcement: 'महत्वपूर्ण सूचना',
      text: '📢 कक्षा 11 एवं 12 रसायन विज्ञान मास्टर बैच और JEE/NEET रिवीज़न के लिए नए प्रवेश प्रारंभ। नोटिस बोर्ड देखें!',
      viewNotice: 'नोटिस देखें'
    },
    hero: {
      badge: 'रसायन विज्ञान शिक्षण में 8+ वर्षों का अनुभव',
      centersCount: 'अलवर के 3 विद्यालय',
      titleLine1: 'केमिस्ट्री को आसान बनाएं',
      titleHighlight: 'अजय चौधरी सर के साथ',
      description: 'ऑर्गेनिक रिएक्शन मैकेनिज्म, इनऑर्गेनिक केमिस्ट्री, फ़िज़िकल केमिस्ट्री के न्यूमेरिकल और लैब प्रैक्टिकल को आसान लॉजिक के साथ समझें। कक्षा 11वीं, 12वीं बोर्ड, JEE और NEET के लिए सरल मार्गदर्शन।',
      organicTitle: 'कार्बनिक रसायन',
      organicSub: 'रिएक्शन मैकेनिज्म और रोडमैप',
      inorganicTitle: 'अकार्बनिक रसायन',
      inorganicSub: 'बॉन्डिंग और आवर्त सारणी',
      practicalTitle: 'प्रायोगिक रसायन',
      practicalSub: 'साल्ट एनालिसिस और वाइवा तैयारी',
      ctaMaterials: 'नोट्स डाउनलोड करें',
      ctaNotices: 'नोटिस बोर्ड देखें',
      ctaContact: 'सर को ईमेल भेजें',
      statStudents: '5,000+ विद्यार्थियों को पढ़ाया',
      statConcept: '100% कॉन्सेप्ट-आधारित पढ़ाई',
      statPapers: 'फ्री प्रश्न पत्र और सटीक समाधान',
      teacherCardRole: 'सीनियर केमिस्ट्री फैकल्टी • 8+ वर्ष अनुभव',
      teachingAt: 'जहाँ पढ़ाते हैं',
      teachingCenters: 'अलवर के 3 विद्यालय',
      teachingExp: 'अनुभव',
      experienceYears: '8+ वर्ष'
    },
    stats: {
      expTitle: '8+ वर्ष',
      expDesc: 'बोर्ड और प्रतियोगी परीक्षाओं में पढ़ाने का लंबा अनुभव',
      centersTitle: '3 विद्यालय',
      centersDesc: 'अलवर (राजस्थान) में कक्षा 11 और 12 बोर्ड की कक्षाएँ',
      masteryTitle: '100% कॉन्सेप्ट',
      masteryDesc: 'बिना रटे हर रिएक्शन को लॉजिक से समझने की सीख',
      studentsTitle: '5,000+ विद्यार्थी',
      studentsDesc: 'बोर्ड परीक्षा में 95%+ अंक और JEE/NEET में बेहतरीन परिणाम'
    },
    subjects: {
      badge: 'केमिस्ट्री के मुख्य भाग',
      title: 'रसायन विज्ञान के चार भाग, एक साफ़ तरीका',
      subtitle: 'रिएक्शन आसानी से समझने, आवर्त सारणी के नियम पकड़ने, फ़िज़िकल केमिस्ट्री के न्यूमेरिकल हल करने और लैब प्रैक्टिकल में पूरे अंक लाने के लिए तैयार किया गया कोर्स।',
      organicName: 'कार्बनिक रसायन',
      organicDesc: 'इलेक्ट्रॉन शिफ्ट, रेजोनेंस, नाम वाली रिएक्शन और स्टेप-बाय-स्टेप केमिकल कन्वर्जन।',
      inorganicName: 'अकार्बनिक रसायन',
      inorganicDesc: 'क्रिस्टल फील्ड थ्योरी, कोऑर्डिनेशन कम्पाउंड, आवर्त सारणी के नियम और केमिकल बॉन्डिंग।',
      physicalName: 'भौतिक रसायन',
      physicalDesc: 'मोल संकल्पना, ऊष्मागतिकी, साम्यावस्था, वैद्युतरसायन और बलगतिकी, न्यूमेरिकल चरण दर चरण हल करके।',
      practicalName: 'प्रायोगिक रसायन',
      practicalDesc: 'साल्ट एनालिसिस (धनायन/ऋणायन टेस्ट), टाइट्रेशन और बोर्ड प्रैक्टिकल वाइवा की पूरी तैयारी।',
      exploreBtn: 'सिलेबस और नोट्स देखें'
    },
    notices: {
      badge: 'कक्षा सूचनाएं',
      title: 'ताज़ा नोटिस, परीक्षा तिथियां और क्लास अपडेट',
      subtitle: 'तीनों विद्यालयों के विद्यार्थियों के लिए टेस्ट की तारीखें, होमवर्क, डाउट क्लास और छुट्टी की सूचनाएँ।',
      viewAll: 'सभी नोटिस देखें',
      downloadBtn: 'फाइल डाउनलोड करें',
      pinned: 'मुख्य नोटिस',
      allBatches: 'सभी बैच',
      clickToRead: 'पूरी सूचना पढ़ने के लिए क्लिक करें'
    },
    materials: {
      badge: 'मुफ़्त अध्ययन सामग्री',
      title: 'चैप्टर नोट्स और फॉर्मूला शीट्स',
      subtitle: 'अजय चौधरी सर द्वारा बनाए गए आसान रिएक्शन मैप, फॉर्मूला चार्ट और विस्तृत रिवीजन नोट्स डाउनलोड करें।',
      viewVault: 'सभी नोट्स देखें',
      previewBtn: 'PDF देखें',
      downloadBtn: 'डाउनलोड करें',
      downloadsText: 'डाउनलोड'
    },
    papersSolutions: {
      badge: 'अभ्यास और समाधान',
      title: 'प्रश्न पत्र और आसान समाधान',
      subtitle: 'पिछले वर्षों के पेपर्स, यूनिट टेस्ट और मॉडल पेपर हल करें तथा स्टेप-बाय-स्टेप सही समाधान से जांचें।',
      viewSolution: 'समाधान देखें',
      viewPaper: 'पेपर देखें',
      downloadPdf: 'PDF डाउनलोड करें',
      allPapersBtn: 'सभी प्रश्न पत्र',
      allSolutionsBtn: 'सभी समाधान',
      solutionReady: 'समाधान उपलब्ध',
      officialKey: 'सत्यापित उत्तर कुंजी और व्याख्या'
    },
    whyLearn: {
      badge: 'पढ़ाने का तरीका',
      title: 'अजय सर से केमिस्ट्री क्यों पढ़ें?',
      subtitle: 'एक आसान और असरदार 6-चरणीय तरीका जो कठिन से कठिन टॉपिक्स को भी आसान बना देता है।',
      pillar1Title: '1. बुनियादी बातें मजबूत करना',
      pillar1Desc: 'कठिन सवालों से पहले फॉर्मूलों और बेसिक नियमों को अच्छी तरह समझना।',
      pillar2Title: '2. रटने के बजाय विज़ुअलाइज़ करना',
      pillar2Desc: 'रिएक्शन में इलेक्ट्रॉन के बहाव को समझें, रट्टा मारने की कोई जरूरत नहीं।',
      pillar3Title: '3. थ्योरी के साथ प्रैक्टिकल प्रयोग',
      pillar3Desc: 'किताबी बातों को लैब के रंगों, टेस्ट और प्रयोगों से जोड़कर देखना।',
      pillar4Title: '4. चरणबद्ध प्रश्न अभ्यास (DPP)',
      pillar4Desc: 'NCERT से लेकर बोर्ड, JEE मेन और NEET स्तर तक के प्रश्नों की तैयारी।',
      pillar5Title: '5. गलतियों का विश्लेषण और समाधान',
      pillar5Desc: 'हर टेस्ट के बाद कमजोर टॉपिक्स की पहचान और डाउट्स का तुरंत समाधान।',
      pillar6Title: '6. परीक्षा में उत्तर लिखने की सही कला',
      pillar6Desc: 'बोर्ड परीक्षा में पूरे अंक पाने के लिए सही स्टेप्स और समीकरण लिखने का तरीका।'
    },
    portfolio: {
      badge: 'क्लासरूम और लैब गैलरी',
      title: 'शिक्षण यात्रा और क्लासरूम अनुभव',
      subtitle: 'अजय सर की क्लासरूम, लैब साल्ट एनालिसिस और छात्रों के मार्गदर्शन की कुछ झलकियां।',
      bannerTag: 'अनुभव और मेंटरशिप',
      bannerHeading: 'अलवर के 3 विद्यालयों में पढ़ाते हैं',
      bannerSub: 'कक्षा 11वीं, 12वीं, JEE और NEET के छात्रों के लिए विशेष मार्गदर्शन।',
      readBio: 'पूरा परिचय पढ़ें'
    },
    interactive: {
      badge: 'कॉन्सेप्ट एक्सप्लोरर',
      title: 'पाँच मुख्य विचार, चरण दर चरण',
      subtitle: 'कोई विषय चुनें और उसका समीकरण, चरण और परीक्षा में उसका महत्व देखें।',
      selectTopic: 'केमिस्ट्री टॉपिक चुनें:',
      reactionBoxTitle: 'रासायनिक समीकरण और रिएक्शन पाथ',
      mechanismTitle: 'स्टेप-बाय-स्टेप रिएक्शन मैकेनिज्म:',
      takeawayTitle: 'मुख्य नियम:',
      examRelevance: 'परीक्षा में वेटेज:'
    },
    cta: {
      badge: 'प्रवेश और मार्गदर्शन',
      title: 'केमिस्ट्री में 95%+ अंक और JEE / NEET क्रैक करने के लिए तैयार हैं?',
      description: 'अलवर के वसुंधरा, पोद्दार या इंद्रा पब्लिक स्कूल में अजय सर से केमिस्ट्री पढ़ें, या पूछताछ भेजें।',
      joinBtn: 'पूछताछ फॉर्म भरें',
      emailBtn: 'ईमेल से संपर्क करें'
    },
    contact: {
      title: 'अजय चौधरी सर से संपर्क करें',
      subtitle: 'बैच समय, नए एडमिशन या टेस्ट सीरीज से जुड़ा कोई भी सवाल हो, फॉर्म भरें या ईमेल करें।',
      nameLabel: 'विद्यार्थी / अभिभावक का नाम *',
      emailLabel: 'ईमेल पता (जवाब पाने के लिए) *',
      phoneLabel: 'मोबाइल नंबर (वैकल्पिक)',
      classLabel: 'कक्षा / लक्ष्य परीक्षा',
      messageLabel: 'आपका प्रश्न या संदेश *',
      sendBtn: 'पूछताछ संदेश भेजें',
      sending: 'भेजा जा रहा है...',
      centersTitle: 'विद्यालय और पते',
      schedulesTitle: 'साप्ताहिक क्लास समय',
      faqTitle: 'अक्सर पूछे जाने वाले सवाल'
    },
    about: {
      heroBadge: 'शिक्षक परिचय',
      heroTitle: 'अजय चौधरी सर के बारे में',
      heroDesc: '8+ वर्षों के अनुभवी वरिष्ठ रसायन विज्ञान शिक्षक, जो अलवर (राजस्थान) के तीन विद्यालयों में कक्षा 11 और 12 बोर्ड के विद्यार्थियों को पढ़ाते हैं।',
      journeyBadge: 'शिक्षण यात्रा',
      journeyTitle: 'रसायन विज्ञान को समझें तर्क, स्पष्टता और प्रयोगों के साथ',
      journeyP1: 'अजय चौधरी सर ने शिक्षण की शुरुआत इस सोच के साथ की कि रसायन विज्ञान को बिना रटे, लॉजिक और कॉन्सेप्ट से आसानी से सीखा जा सकता है। पिछले 8+ वर्षों में उन्होंने 5,000+ से अधिक विद्यार्थियों को कक्षा 11वीं, 12वीं, सीबीएसई/आईएससी बोर्ड और JEE/NEET परीक्षाओं में सफलता दिलाई है।',
      journeyP2: 'वर्तमान में अजय सर अलवर ज़िले (राजस्थान) के तीन विद्यालयों में कक्षा 11 और 12 को रसायन विज्ञान पढ़ाते हैं। वे ऑर्गेनिक रिएक्शन मैकेनिज्म, इनऑर्गेनिक बॉन्डिंग, फ़िज़िकल केमिस्ट्री के न्यूमेरिकल और प्रैक्टिकल साल्ट एनालिसिस को आसान ट्रिक्स और स्पष्ट लॉजिक के साथ समझाने के लिए जाने जाते हैं।',
      statExp: '8+',
      statExpLabel: 'वर्षों का अनुभव',
      statCenters: '3',
      statCentersLabel: 'विद्यालय',
      statStudents: '5,000+',
      statStudentsLabel: 'सफल विद्यार्थी',
      philosophyBadge: 'शिक्षण का सिद्धांत',
      philosophyQuote: '“जब कॉन्सेप्ट समझ में आ जाते हैं, तो केमिस्ट्री याद रखना बहुत आसान हो जाता है।”',
      philosophySub: 'कक्षा में पढ़ाने और डाउट्स दूर करने का 6-चरणीय सरल तरीका।',
      step1Title: '1. बुनियादी बातें मजबूत करना',
      step1Desc: 'कठिन सवालों से पहले फॉर्मूलों, परमाणु संरचना और बेसिक सिद्धांतों को अच्छी तरह समझना।',
      step2Title: '2. रटने के बजाय गहराई से समझना',
      step2Desc: 'रिएक्शन मैकेनिज्म और मॉलिक्यूल्स को 3D मॉडल और एरो नोटेशन से समझना।',
      step3Title: '3. थ्योरी के साथ प्रैक्टिकल प्रयोग',
      step3Desc: 'किताबी ज्ञान को लैब के साल्ट एनालिसिस और टाइट्रेशन से जोड़कर देखना।',
      step4Title: '4. चरणबद्ध प्रश्न अभ्यास',
      step4Desc: 'NCERT से लेकर पिछले वर्षों के बोर्ड और JEE/NEET पेपर्स की नियमित प्रैक्टिस।',
      step5Title: '5. गलतियों का विश्लेषण',
      step5Desc: 'हर टेस्ट के बाद कमजोर टॉपिक्स की पहचान और उनका तुरंत समाधान।',
      step6Title: '6. परीक्षा में सही रणनीति',
      step6Desc: 'बोर्ड और प्रतियोगी परीक्षा में समय प्रबंधन और अच्छे मार्क्स लाने की ट्रिक्स।',
      centersBadge: 'जहाँ पढ़ाते हैं',
      centersTitle: 'विद्यालय जहाँ अजय सर पढ़ाते हैं',
      centersSub: 'अजय सर अलवर (राजस्थान) के इन तीन विद्यालयों में कक्षा 11 और 12 बोर्ड की केमिस्ट्री पढ़ाते हैं।',
      center1Name: 'वसुंधरा सीनियर सेकेंडरी स्कूल',
      center1Batch: 'कक्षा 11 और 12 बोर्ड',
      center1Schedule: '',
      center2Name: 'पोद्दार सीनियर सेकेंडरी स्कूल',
      center2Batch: 'कक्षा 11 और 12 बोर्ड, फ़ाउंडेशन केमिस्ट्री',
      center2Schedule: '',
      center3Name: 'इंद्रा पब्लिक स्कूल',
      center3Batch: 'कक्षा 11 और 12 बोर्ड',
      center3Schedule: '',
      credentialsBadge: 'शैक्षणिक योग्यता',
      credentialsTitle: 'योग्यता और अनुभव',
      credentialsSub: 'अजय सर की औपचारिक उच्च शैक्षणिक डिग्रियां और शिक्षण प्रशिक्षण।',
      qual1Title: 'मास्टर ऑफ साइंस (M.Sc.) केमिस्ट्री',
      qual1Desc: 'ऑर्गेनिक सिंथेसिस और स्पेक्ट्रोस्कोपी में प्रथम श्रेणी के साथ स्नातकोत्तर डिग्री।',
      qual2Title: 'बैचलर ऑफ एजुकेशन (B.Ed)',
      qual2Desc: 'आधुनिक विज्ञान शिक्षण पद्धति और सुधारात्मक शिक्षण में प्रमाणित।',
      qual3Title: '8+ वर्ष सीनियर केमिस्ट्री फैकल्टी',
      qual3Desc: '5,000+ से अधिक छात्रों को पढ़ाया, जिनमें कई बोर्ड टॉपर्स और JEE/NEET रैंकर्स शामिल हैं।',
      qual4Title: 'प्रैक्टिकल केमिस्ट्री विशेषज्ञ',
      qual4Desc: '100+ से अधिक साल्ट एनालिसिस और वॉल्यूमेट्रिक टाइट्रेशन लैब वर्कशॉप आयोजित किए।',
      ctaTitle: 'केमिस्ट्री को आसान और स्पष्ट तरीके से समझें',
      ctaSub: 'बैच में एडमिशन, नोट्स या पढ़ाई से जुड़े किसी भी सवाल के लिए अजय सर से जुड़ें।',
      ctaContactBtn: 'पूछताछ संदेश भेजें',
      ctaNotesBtn: 'अध्ययन सामग्री देखें'
    },
    pages: {
      allClasses: 'सभी कक्षाएं',
      allSubjects: 'सभी विषय',
      allCategories: 'सभी श्रेणियां',
      allTypes: 'सभी प्रकार',
      searchPlaceholder: 'टॉपिक, चैप्टर या कीवर्ड से खोजें...',
      downloadBtn: 'डाउनलोड PDF',
      previewBtn: 'PDF देखें',
      viewSolutionBtn: 'समाधान देखें',
      viewPaperBtn: 'पेपर देखें',
      closeBtn: 'बंद करें',
      noResults: 'आपकी खोज से मिलता-जुलता कोई कंटेंट नहीं मिला।',
      noResultsSub: 'कृपया कोई दूसरा कीवर्ड खोजें या फिल्टर हटाएं।'
    },
    home: {
      eyebrow: 'रसायन विज्ञान · कक्षा 11 और 12 · JEE · NEET',
      factYears: 'वर्षों का शिक्षण',
      factCenters: 'विद्यालय',
      factStudents: 'विद्यार्थियों को पढ़ाया',
      secAbout: 'परिचय',
      aboutTitle: 'पहले कॉन्सेप्ट, फिर अंक अपने आप।',
      readProfile: 'पूरा परिचय पढ़ें',
      secSubjects: 'क्या पढ़ाते हैं',
      secMethod: 'पढ़ाने का तरीका',
      methodTitle: 'एक अध्याय कैसे पढ़ाया जाता है',
      secResources: 'मुफ़्त सामग्री',
      resourcesTitle: 'नोट्स, प्रश्न पत्र और हल',
      latestNotes: 'नई अध्ययन सामग्री',
      latestPapers: 'हाल के प्रश्न पत्र',
      download: 'डाउनलोड',
      paper: 'प्रश्न पत्र',
      solution: 'हल',
      viewAll: 'सभी देखें',
      secNotices: 'नोटिस बोर्ड',
      readNotice: 'नोटिस पढ़ें',
      secVisit: 'बैच से जुड़ें',
      visitTitle: 'अपने नज़दीकी विद्यालय में अजय सर से पढ़ें।',
      visitSub: 'बैच का समय, फ़ीस या फ्री डेमो क्लास के बारे में पूछें। एक दिन के भीतर जवाब मिलेगा।',
      enquire: 'पूछताछ भेजें',
      whatsapp: 'व्हाट्सऐप',
      call: 'कॉल करें',
      footerLine: 'केमिस्ट्री, समझ के साथ।',
      resources: 'अध्ययन सामग्री',
      notesNav: 'आसान नोट्स',
      articlesNav: 'लेख',
      learnLabel: 'पढ़ें और सीखें',
      learnTitle: 'हमारे आसपास की केमिस्ट्री',
      learnSub: 'चित्रों वाले छोटे लेख और आसान अध्याय नोट्स, जिनसे कॉन्सेप्ट जल्दी समझ आएँ।',
      notesForClass: 'इस कक्षा के आसान नोट्स',
      allNotes: 'सभी नोट्स',
      allArticles: 'सभी लेख'
    },
    classes: {
      navLabel: 'कक्षाएँ',
      chooseLabel: 'आपकी कक्षा',
      chooseTitle: 'अपनी कक्षा चुनें',
      chooseSub: 'आपकी कक्षा की हर चीज़ एक जगह: नोट्स, किताबें, टेस्ट पेपर, हल और नोटिस।',
      pageLabel: 'कक्षा',
      everything: 'सब कुछ',
      notesBooks: 'नोट्स और किताबें',
      papers: 'प्रश्न पत्र',
      solutions: 'हल',
      notices: 'नोटिस',
      chapters: 'अध्याय',
      share: 'व्हाट्सऐप पर भेजें',
      copyLink: 'लिंक कॉपी करें',
      copied: 'लिंक कॉपी हो गया',
      emptyTitle: 'अभी यहाँ कुछ नहीं है',
      emptyBody: 'अजय सर जल्द ही इस कक्षा की सामग्री जोड़ेंगे। कृपया बाद में देखें।',
      item: 'सामग्री',
      items: 'सामग्री',
      open: 'खोलें',
      searchPlaceholder: 'इस कक्षा में खोजें…'
    },
    footer: {
      tagline: 'अलवर (राजस्थान) के विद्यालयों में 8+ वर्षों के अनुभव के साथ कार्बनिक, अकार्बनिक, भौतिक एवं प्रायोगिक रसायन में विद्यार्थियों का मार्गदर्शन।',
      specializationsTitle: 'विशेषज्ञता',
      centersTitle: 'विद्यालय',
      resourcesTitle: 'छात्र संसाधन',
      rightsReserved: 'सर्वाधिकार सुरक्षित। अजय चौधरी केमिस्ट्री प्लेटफॉर्म।'
    }
  },

  hinglish: {
    nav: {
      home: 'Home',
      about: 'About Sir',
      subjects: 'Subjects',
      updates: 'Notice Board',
      studyMaterials: 'Study Notes',
      questionPapers: 'Question Papers',
      solutions: 'Solutions',
      contact: 'Contact Karein',
      search: 'Search',
      admin: 'Admin'
    },
    banner: {
      announcement: 'Important Announcement',
      text: '📢 Class 11 & 12 Chemistry Master Batch aur JEE/NEET Revision ke admissions open hain. Notice Board check karein!',
      viewNotice: 'Notice Dekhein'
    },
    hero: {
      badge: '8+ Years of Chemistry Teaching Excellence',
      centersCount: '3 Top Coaching Centers',
      titleLine1: 'Chemistry Master Karein',
      titleHighlight: 'Ajay Choudhary Sir ke sath',
      description: 'Organic Reaction Mechanisms, Conceptual Inorganic Chemistry aur Practical Lab Knowledge ko samjhein first-principles se. CBSE, Boards, JEE aur NEET ke liye best guidance.',
      organicTitle: 'Organic Chemistry',
      organicSub: 'Mechanisms & Roadmaps',
      inorganicTitle: 'Inorganic Chemistry',
      inorganicSub: 'Bonding & Periodic Trends',
      practicalTitle: 'Practical Chemistry',
      practicalSub: 'Salt Analysis & Viva Prep',
      ctaMaterials: 'Study Materials Dekhein',
      ctaNotices: 'Notice Board & Tests',
      ctaContact: 'Sir se Email par Contact Karein',
      statStudents: '5,000+ Students Mentored',
      statConcept: '100% Concept-First Learning',
      statPapers: 'Free Question Papers & Solutions',
      teacherCardRole: 'Head of Chemistry • 8+ Years Exp',
      teachingAt: 'Teaching At',
      teachingCenters: '3 schools in Alwar',
      teachingExp: 'Experience',
      experienceYears: '8+ Years'
    },
    stats: {
      expTitle: '8+ Years',
      expDesc: 'Board aur Competitive Chemistry padhane ka rich experience',
      centersTitle: '3 Coaching Centers',
      centersDesc: 'Top institutes mein regular active batches',
      masteryTitle: '100% Conceptual',
      masteryDesc: 'Ratta maarne ke bina pure concepts aur electron mechanisms',
      studentsTitle: '5,000+ Students',
      studentsDesc: 'Boards mein 95%+ marks aur JEE/NEET mein top ranks'
    },
    subjects: {
      badge: 'Core Chemistry Pillars',
      title: 'Chemistry ke Teeno Main Pillars mein Mastery',
      subtitle: 'Complete conceptual approach jo aapko reactions samajhne, periodic trends yaad rakhne aur lab practicals mein full marks laane mein madad karega.',
      organicName: 'Organic Chemistry',
      organicDesc: 'Curved-arrow reaction mechanisms, resonance/inductive effects, stereochemistry, named reactions aur multi-step conversions.',
      inorganicName: 'Inorganic Chemistry',
      inorganicDesc: 'Crystal Field Theory (CFT), coordination complexes, periodic trends, chemical bonding aur MOT diagrams.',
      physicalName: 'Physical Chemistry',
      physicalDesc: 'Mole concept, thermodynamics, equilibrium, electrochemistry aur kinetics ke numericals step by step.',
      practicalName: 'Practical Chemistry',
      practicalDesc: 'Qualitative salt analysis, cation/anion test flowcharts, titration calculations aur board viva voce preparation.',
      exploreBtn: 'Syllabus aur Notes Dekhein'
    },
    notices: {
      badge: 'Real-time Announcements',
      title: 'Latest Notices, Exam Dates aur Class Updates',
      subtitle: 'Teeno centers ke test dates, homework assignments, doubt sessions aur holiday updates ke sath hamesha updated rahein.',
      viewAll: 'Sabhi Notices Dekhein',
      downloadBtn: 'Attachment Download Karein',
      pinned: 'Pinned Notice',
      allBatches: 'All Batches',
      clickToRead: 'Full announcement padhne ke liye click karein'
    },
    materials: {
      badge: 'Free Study Vault',
      title: 'Featured Handwritten Notes aur Formula Sheets',
      subtitle: 'Ajay Sir ke high-yield reaction maps, formula cheat-sheets aur detailed chapter notes download karein.',
      viewVault: 'Poora Study Vault Dekhein',
      previewBtn: 'PDF Preview',
      downloadBtn: 'Download Karein',
      downloadsText: 'downloads'
    },
    papersSolutions: {
      badge: 'Practice & Master',
      title: 'Latest Question Papers aur Verified Solutions',
      subtitle: 'Chapter-wise tests, unit exams aur board mock papers solve karein aur step-by-step solution se match karein.',
      viewSolution: 'Solution Dekhein',
      viewPaper: 'Paper Dekhein',
      downloadPdf: 'Download PDF',
      allPapersBtn: 'Sabhi Question Papers',
      allSolutionsBtn: 'Sabhi Solutions',
      solutionReady: 'Solution Ready',
      officialKey: 'Answer Key aur Explanations'
    },
    whyLearn: {
      badge: 'Teaching Pedagogy',
      title: 'Ajay Sir se Chemistry kyu padhein?',
      subtitle: 'Ek proven 6-step conceptual method jo tough se tough reactions ko simple aur logical banata hai.',
      pillar1Title: 'First-Principles se Basics',
      pillar1Desc: 'Reactions likhne se pehle atomic structure aur orbital overlap samajhte hain.',
      pillar2Title: 'Visual Reaction Mechanisms',
      pillar2Desc: 'Curved-arrow notation se electron shift samajhein, ratta maarne ki zaroorat nahi.',
      pillar3Title: 'Lab Practical Connect',
      pillar3Desc: 'Theory ko actual salt analysis colors aur precipitates se relate karte hain.',
      pillar4Title: 'Graduated Level DPPs',
      pillar4Desc: 'NCERT basics se lekar JEE Advanced aur NEET level tak targeted practice.',
      pillar5Title: 'Personal Doubt Sessions',
      pillar5Desc: 'Har test ke baad mistakes ka detailed analysis aur personal doubt clearing.',
      pillar6Title: 'Board Exam Presentation',
      pillar6Desc: 'Step-by-step presentation techniques taaki board exams mein ek bhi number na kate.'
    },
    portfolio: {
      badge: 'Classroom & Lab Gallery',
      title: 'Teaching Journey aur Classroom Portfolio',
      subtitle: 'Ajay Sir ke interactive lectures, lab salt analysis demonstrations aur student mentoring ki jhalak.',
      bannerTag: 'Academic Experience & Mentorship',
      bannerHeading: '3 Coaching Centers mein Active Batches',
      bannerSub: 'Class 11, 12, JEE aur NEET aspirants ke liye personalized guidance.',
      readBio: 'Poora Bio Padhein'
    },
    interactive: {
      badge: 'Interactive Learning Tool',
      title: 'Interactive Concept Explorer aur Reaction Visualizer',
      subtitle: 'Kisi bhi topic par click karein aur step-by-step mechanisms, reaction conditions aur exam tips explore karein.',
      selectTopic: 'Topic Select Karein:',
      reactionBoxTitle: 'Chemical Equation aur Reaction Pathway',
      mechanismTitle: 'Step-by-Step Reaction Mechanism:',
      takeawayTitle: 'Key Concept Rule:',
      examRelevance: 'Exam Scoring Weightage:'
    },
    cta: {
      badge: 'Admissions & Guidance',
      title: 'Chemistry mein 95%+ aur JEE / NEET crack karne ke liye ready hain?',
      description: 'Alwar ke Vasundhara, Poddar ya Indra Public School mein Ajay Sir se chemistry padhein, ya enquiry bhejein.',
      joinBtn: 'Admission Inquiry Bhejein',
      emailBtn: 'Email Se Contact Karein'
    },
    contact: {
      title: 'Ajay Sir se Contact Karein',
      subtitle: 'Batch timings, admissions ya test series se related koi bhi sawal ho toh form fill karein ya email bhejein.',
      nameLabel: 'Aapka Pura Naam *',
      emailLabel: 'Email Address *',
      phoneLabel: 'Phone Number (Optional)',
      classLabel: 'Class / Target Exam',
      messageLabel: 'Aapka Message ya Doubt *',
      sendBtn: 'Inquiry Message Bhejein',
      sending: 'Bheja ja raha hai...',
      centersTitle: 'Coaching Centers aur Locations',
      schedulesTitle: 'Weekly Class Timings',
      faqTitle: 'Frequently Asked Questions'
    },
    about: {
      heroBadge: 'Faculty Profile',
      heroTitle: 'Ajay Choudhary Sir ke baare mein',
      heroDesc: 'Senior Chemistry Educator jinka 8+ saal ka rich experience hai board toppers aur competitive rankers ko mentor karne ka across 3 coaching institutes.',
      journeyBadge: 'Pedagogical Journey',
      journeyTitle: 'Chemistry ko samjhein Logic, Clarity aur Lab Insights ke sath',
      journeyP1: 'Ajay Choudhary Sir ne padhana is vision se shuru kiya tha ki Chemistry se rattebaazi ka dar khatam kiya ja sake. Pichhle 8+ saalon mein unhone 5,000+ se zyada students ko Class 11, 12, CBSE/ISC Boards aur JEE/NEET ke liye guide kiya hai.',
      journeyP2: 'Currently teen top coaching centers mein Senior Chemistry Faculty ke taur par Ajay Sir Organic Mechanisms, Inorganic Periodic Trends aur Practical Salt Analysis workshops conduct karte hain.',
      statExp: '8+',
      statExpLabel: 'Years Experience',
      statCenters: '3',
      statCentersLabel: 'Schools',
      statStudents: '5,000+',
      statStudentsLabel: 'Students Mentored',
      philosophyBadge: 'Teaching Philosophy',
      philosophyQuote: '“Chemistry bahut aasan ban jaati hai jab concepts ko samjha jaye, ratta na mara jaye.”',
      philosophySub: '6-step method jo har batch lecture aur doubt session mein use hota hai.',
      step1Title: '1. Strong Fundamentals',
      step1Desc: 'Tough sawalon se pehle atomic structure aur basic chemical rules ko crystal-clear karna.',
      step2Title: '2. Deep Conceptual Visualization',
      step2Desc: 'Curved arrows se reaction mechanism samajhna bina equations ratte.',
      step3Title: '3. Theory aur Practical Connection',
      step3Desc: 'Kitabi equations ko laboratory salt analysis aur titration experiments se relate karna.',
      step4Title: '4. Targeted Multi-Tier Practice',
      step4Desc: 'NCERT basics se lekar JEE Main, Advanced aur NEET level ke DPPs solve karna.',
      step5Title: '5. Detailed Mistake Analysis',
      step5Desc: 'Regular unit test reviews jahan calculation aur conceptual traps highlight kiye jaate hain.',
      step6Title: '6. Board Exam Presentation',
      step6Desc: 'Step-by-step scoring presentation aur time management tricks board exams ke liye.',
      centersBadge: 'Teaching Locations',
      centersTitle: 'Active Batches Across 3 Centers',
      centersSub: 'Ajay Sir offline lectures, lab sessions aur weekly test series in 3 institutes mein conduct karte hain.',
      center1Name: 'Vasundhara Senior Secondary School',
      center1Batch: 'Class 11th and 12th Board',
      center1Schedule: '',
      center2Name: 'Poddar Senior Secondary School',
      center2Batch: 'Class 11th and 12th Board, Foundation Chemistry',
      center2Schedule: '',
      center3Name: 'Indra Public School',
      center3Batch: 'Class 11th and 12th Board',
      center3Schedule: '',
      credentialsBadge: 'Verified Qualifications',
      credentialsTitle: 'Academic Degrees & Experience',
      credentialsSub: 'Ajay Sir ke formal academic degrees aur professional credentials.',
      qual1Title: 'Master of Science (M.Sc.) Chemistry',
      qual1Desc: 'Organic Synthesis, Kinetics aur Spectroscopy mein First Division Honours degree.',
      qual2Title: 'Bachelor of Education (B.Ed)',
      qual2Desc: 'Certified in Modern Science Pedagogy aur Remedial Teaching methods.',
      qual3Title: '8+ Years Senior Chemistry Faculty',
      qual3Desc: '5,000+ students ko mentor kiya with 95%+ Board scorers aur top JEE/NEET ranks.',
      qual4Title: 'Practical Chemistry Specialist',
      qual4Desc: '100+ hands-on Salt Analysis aur Titration lab workshops conduct kiye.',
      ctaTitle: 'Chemistry ko Pure Concept ke sath Seekhein',
      ctaSub: 'Batch admissions ya notes ke liye Ajay Sir se connect karein.',
      ctaContactBtn: 'Inquiry Bhejein',
      ctaNotesBtn: 'Study Materials Dekhein'
    },
    pages: {
      allClasses: 'All Classes',
      allSubjects: 'All Subjects',
      allCategories: 'All Categories',
      allTypes: 'All Types',
      searchPlaceholder: 'Topic, chapter ya keyword search karein...',
      downloadBtn: 'Download PDF',
      previewBtn: 'Preview PDF',
      viewSolutionBtn: 'Solution Dekhein',
      viewPaperBtn: 'Paper Dekhein',
      closeBtn: 'Close',
      noResults: 'Aapki search se match karta koi material nahi mila.',
      noResultsSub: 'Kripya koi doosra keyword search karein ya filter hatayein.'
    },
    home: {
      eyebrow: 'Chemistry · Class 11 & 12 · JEE · NEET',
      factYears: 'saal ka teaching experience',
      factCenters: 'schools',
      factStudents: 'students ko padhaya',
      secAbout: 'About',
      aboutTitle: 'Pehle concept, marks apne aap aayenge.',
      readProfile: 'Poora profile padhein',
      secSubjects: 'Kya padhate hain',
      secMethod: 'Method',
      methodTitle: 'Ek chapter kaise padhaya jata hai',
      secResources: 'Free resources',
      resourcesTitle: 'Notes, papers aur solutions',
      latestNotes: 'Latest study material',
      latestPapers: 'Recent question papers',
      download: 'Download',
      paper: 'Paper',
      solution: 'Solution',
      viewAll: 'Sab dekhein',
      secNotices: 'Notice board',
      readNotice: 'Notice padhein',
      secVisit: 'Batch join karein',
      visitTitle: 'Apne nazdeeki centre par Ajay Sir se padhein.',
      visitSub: 'Batch timings, fees ya free demo class ke baare mein poochein. Ek din ke andar reply milega.',
      enquire: 'Enquiry bhejein',
      whatsapp: 'WhatsApp',
      call: 'Call karein',
      footerLine: 'Chemistry, samajh ke saath.',
      resources: 'Resources',
      notesNav: 'Concept notes',
      articlesNav: 'Articles',
      learnLabel: 'Padhein aur seekhein',
      learnTitle: 'Aas-paas ki Chemistry',
      learnSub: 'Chitron wale chhote articles aur aasaan chapter notes, jinse concepts jaldi samajh aayein.',
      notesForClass: 'Is class ke concept notes',
      allNotes: 'Saare notes',
      allArticles: 'Saare articles'
    },
    classes: {
      navLabel: 'Classes',
      chooseLabel: 'Aapki class',
      chooseTitle: 'Apni class chunein',
      chooseSub: 'Aapki class ki har cheez ek jagah: notes, books, test papers, solutions aur notices.',
      pageLabel: 'Class',
      everything: 'Sab kuch',
      notesBooks: 'Notes & books',
      papers: 'Question papers',
      solutions: 'Solutions',
      notices: 'Notices',
      chapters: 'Chapters',
      share: 'WhatsApp par bhejein',
      copyLink: 'Link copy karein',
      copied: 'Link copy ho gaya',
      emptyTitle: 'Abhi yahan kuch nahi hai',
      emptyBody: 'Ajay Sir jaldi hi is class ka material add karenge. Thodi der baad dekhein.',
      item: 'item',
      items: 'items',
      open: 'Kholein',
      searchPlaceholder: 'Is class mein search karein…'
    },
    footer: {
      tagline: '8+ years ke experience ke sath Organic, Inorganic aur Practical Chemistry mein students ko empower karna across 3 coaching centers.',
      specializationsTitle: 'Specializations',
      centersTitle: 'Schools',
      resourcesTitle: 'Student Resources',
      rightsReserved: 'All rights reserved. Ajay Choudhary Chemistry Platform.'
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  /** True when Hindi is selected */
  isHi: boolean;
  /** Inline bilingual string: L('Download', 'डाउनलोड') */
  L: (en: string, hi: string) => string;
  /** Content field with optional Hindi version: pick(item.title, item.titleHi) */
  pick: (en: string | undefined, hi?: string | undefined) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem('ajay_chem_lang');
    } catch {
      // storage unavailable
    }
    // The site offers English and Hindi; an older "Hinglish" choice falls back to English.
    if (saved === 'hi') {
      // Restores the saved choice after mount; state update is intentional.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState('hi');
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === 'hi' ? 'hi' : 'en';
  }, [language]);

  const setLanguage = (lang: Language) => {
    const next: Language = lang === 'hi' ? 'hi' : 'en';
    setLanguageState(next);
    try {
      localStorage.setItem('ajay_chem_lang', next);
    } catch {
      // storage unavailable
    }
  };

  const isHi = language === 'hi';
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const L = (en: string, hi: string) => (isHi ? hi : en);
  const pick = (en: string | undefined, hi?: string | undefined) => (isHi && hi && hi.trim() ? hi : en || '');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isHi, L, pick }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
