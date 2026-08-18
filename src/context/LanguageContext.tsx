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
    callBtn: string;
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
  // Footer
  footer: {
    tagline: string;
    specializationsTitle: string;
    centersTitle: string;
    resourcesTitle: string;
    rightsReserved: string;
  };
}

const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      subjects: 'Subjects',
      updates: 'Updates',
      studyMaterials: 'Study Materials',
      questionPapers: 'Question Papers',
      solutions: 'Solutions',
      contact: 'Contact',
      search: 'Search',
      admin: 'Admin'
    },
    banner: {
      announcement: 'Announcement',
      text: '📢 Admissions Open for Class 11 & 12 Chemistry Master Batch & JEE/NEET Revision. Check Notice Board!',
      viewNotice: 'View Notice'
    },
    hero: {
      badge: '8+ Years of Chemistry Teaching Excellence',
      centersCount: '3 Coaching Centers',
      titleLine1: 'Master Chemistry with',
      titleHighlight: 'Ajay Choudhary Sir',
      description: 'Specialized coaching in Organic Reaction Mechanisms, Conceptual Inorganic Chemistry, and Practical Laboratory Knowledge for CBSE, ISC, JEE & NEET aspirants.',
      organicTitle: 'Organic',
      organicSub: 'Mechanisms & Roadmaps',
      inorganicTitle: 'Inorganic',
      inorganicSub: 'Bonding & Trends',
      practicalTitle: 'Practical',
      practicalSub: 'Salt Analysis & Labs',
      ctaMaterials: 'Explore Study Materials',
      ctaNotices: 'Notice Board & Tests',
      ctaContact: 'Contact Teacher',
      statStudents: '5,000+ Students Mentored',
      statConcept: '100% Concept-First Approach',
      statPapers: 'Free Question Papers & Solutions',
      teacherCardRole: 'Head of Chemistry • 8+ Years',
      teachingAt: 'Teaching At',
      teachingCenters: '3 Coaching Centers',
      teachingExp: 'Teaching Exp',
      experienceYears: '8+ Years'
    },
    stats: {
      expTitle: '8+ Years',
      expDesc: 'Teaching Experience in Board & Competitive Chemistry',
      centersTitle: '3 Coaching Centers',
      centersDesc: 'Teaching across top academic institutes and batches',
      masteryTitle: '100% Conceptual',
      masteryDesc: 'Mechanism-first clarity without rote memorization',
      studentsTitle: '5,000+ Students',
      studentsDesc: 'Mentored for Board 95%+ marks & JEE/NEET ranks'
    },
    subjects: {
      badge: 'Specialized Core Chemistry',
      title: 'Expertise Across 3 Major Pillars of Chemistry',
      subtitle: 'Comprehensive conceptual framework designed to help students master reactions, understand periodic trends, and excel in laboratory examinations.',
      organicName: 'Organic Chemistry',
      organicDesc: 'Curved-arrow reaction mechanisms, inductive/resonance effects, stereochemistry, named reactions, and multi-step synthesis roadmaps.',
      inorganicName: 'Inorganic Chemistry',
      inorganicDesc: 'Crystal Field Theory, coordination complexes, periodic properties, chemical bonding, and molecular orbital diagrams.',
      practicalName: 'Practical Chemistry',
      practicalDesc: 'Qualitative salt analysis, cation/anion detection flowcharts, titrimetric calculations, and board viva voce mastery.',
      exploreBtn: 'View Syllabus & Notes'
    },
    notices: {
      badge: 'Real-time Board Announcements',
      title: 'Latest Notices, Exam Dates & Class Updates',
      subtitle: 'Stay up-to-date with test schedules, homework assignments, doubt session timings, and holiday announcements across all 3 centers.',
      viewAll: 'View All Notices & Archive',
      downloadBtn: 'Download Attachment',
      pinned: 'Pinned Alert',
      allBatches: 'All Batches',
      clickToRead: 'Click to read full announcement'
    },
    materials: {
      badge: 'Download Free Learning Materials',
      title: 'Featured Study Vault & Handwritten Notes',
      subtitle: 'High-yield master reaction maps, formula cheat-sheets, and comprehensive chapter notes prepared by Ajay Choudhary Sir.',
      viewVault: 'Explore All Materials Vault',
      previewBtn: 'Preview PDF',
      downloadBtn: 'Download Notes',
      downloadsText: 'downloads'
    },
    papersSolutions: {
      badge: 'Dual Learning Hub',
      title: 'Latest Question Papers & Verified Solutions',
      subtitle: 'Practice with previous year papers, periodic unit tests, and board mock exams with direct access to official step-by-step solutions.',
      viewSolution: 'View Solution',
      viewPaper: 'View Question Paper',
      downloadPdf: 'Download PDF',
      allPapersBtn: 'Browse All Question Papers',
      allSolutionsBtn: 'Browse All Verified Solutions',
      solutionReady: 'Solution Ready',
      officialKey: 'Official Answer Key & Hints'
    },
    whyLearn: {
      badge: 'Teaching Methodology',
      title: 'Why Learn Chemistry with Ajay Sir?',
      subtitle: 'A proven 6-step conceptual pedagogy that transforms complex chemistry equations into intuitive, logical understanding.',
      pillar1Title: 'First-Principles Understanding',
      pillar1Desc: 'We deconstruct atomic structures and orbital overlaps before writing reaction equations.',
      pillar2Title: 'Visual Reaction Mechanisms',
      pillar2Desc: 'Master electron shifts with curved-arrow notations instead of memorizing products.',
      pillar3Title: 'Laboratory Correlation',
      pillar3Desc: 'Connect classroom theory with real salt precipitates, colors, and titrations.',
      pillar4Title: 'Multi-Tier Practice DPPs',
      pillar4Desc: 'Graduated problem sets from NCERT fundamentals to JEE Advanced level questions.',
      pillar5Title: 'Personal Doubt Resolution',
      pillar5Desc: 'Dedicated doubt-clearing sessions and mistake analysis after every chapter test.',
      pillar6Title: 'Exam Presentation Strategy',
      pillar6Desc: 'Step-by-step answer formatting techniques to score maximum marks in Board exams.'
    },
    portfolio: {
      badge: 'Classroom & Lab Gallery',
      title: 'Teaching Journey & Academic Portfolio',
      subtitle: 'A visual overview of Ajay Choudhary Sir’s interactive classroom lectures, laboratory salt analysis demonstrations, and student mentorship sessions.',
      bannerTag: 'Academic Experience & Lab Mentorship',
      bannerHeading: 'Active Classroom Batches Across 3 Coaching Centers',
      bannerSub: 'Direct individual guidance for Class 11, Class 12, JEE Main & Advanced, and NEET aspirants.',
      readBio: 'Read Full Biography'
    },
    interactive: {
      badge: 'Interactive Learning Tool',
      title: 'Interactive Concept Explorer & Reaction Visualizer',
      subtitle: 'Click on any topic to explore step-by-step mechanisms, reaction conditions, and high-yield examination tips.',
      selectTopic: 'Select Chemistry Topic:',
      reactionBoxTitle: 'Chemical Equation & Reaction Pathway',
      mechanismTitle: 'Step-by-Step Reaction Mechanism:',
      takeawayTitle: 'Key Conceptual Rule:',
      examRelevance: 'Exam Scoring Weightage:'
    },
    cta: {
      badge: 'Admissions & Mentorship',
      title: 'Ready to Score 95%+ in Chemistry & Crack JEE / NEET?',
      description: 'Join Ajay Sir’s classroom batches at Catalyst Career Institute, Apex Science Academy, or Prerana Learning Hub. Limited seats per batch for personalized attention.',
      joinBtn: 'Enroll / Send Inquiry',
      callBtn: 'Call Teacher Directly'
    },
    contact: {
      title: 'Get in Touch with Ajay Choudhary Sir',
      subtitle: 'Have a question regarding batch timings, admissions, or test series? Send an inquiry or reach out directly.',
      nameLabel: 'Your Full Name *',
      emailLabel: 'Email Address *',
      phoneLabel: 'Phone Number (WhatsApp) *',
      classLabel: 'Student Class / Target Exam *',
      messageLabel: 'Your Message or Question *',
      sendBtn: 'Submit Inquiry Message',
      sending: 'Submitting...',
      centersTitle: 'Teaching Coaching Centers & Locations',
      schedulesTitle: 'Weekly Class Schedule',
      faqTitle: 'Frequently Asked Questions'
    },
    footer: {
      tagline: 'Empowering students to master Organic, Inorganic, and Practical Chemistry with 8+ years of academic excellence across 3 coaching centers.',
      specializationsTitle: 'Specializations',
      centersTitle: 'Coaching Centers',
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
      text: '📢 कक्षा 11 एवं 12 रसायन विज्ञान मास्टर बैच और JEE/NEET रिवीज़न के लिए प्रवेश प्रारंभ। नोटिस बोर्ड देखें!',
      viewNotice: 'नोटिस देखें'
    },
    hero: {
      badge: 'रसायन विज्ञान शिक्षण में 8+ वर्षों का उत्कृष्ट अनुभव',
      centersCount: '3 प्रमुख कोचिंग संस्थान',
      titleLine1: 'रसायन विज्ञान में महारत हासिल करें',
      titleHighlight: 'अजय चौधरी सर के साथ',
      description: 'कार्बनिक अभिक्रिया क्रियाविधि (Organic Mechanisms), अकार्बनिक रसायन एवं प्रयोगशाला प्रायोगिक ज्ञान में सीबीएसई, बोर्ड्स, JEE और NEET के छात्रों के लिए विशेष शिक्षण।',
      organicTitle: 'कार्बनिक रसायन',
      organicSub: 'मैकेनिज्म एवं रोडमैप',
      inorganicTitle: 'अकार्बनिक रसायन',
      inorganicSub: 'बॉन्डिंग एवं आवर्त प्रवृत्तियां',
      practicalTitle: 'प्रायोगिक रसायन',
      practicalSub: 'लवण विश्लेषण (Salt Analysis)',
      ctaMaterials: 'अध्ययन सामग्री देखें',
      ctaNotices: 'नोटिस बोर्ड एवं टेस्ट',
      ctaContact: 'शिक्षक से संपर्क करें',
      statStudents: '5,000+ विद्यार्थियों का मार्गदर्शन',
      statConcept: '100% स्पष्ट अवधारणा आधारित पढ़ाई',
      statPapers: 'निःशुल्क प्रश्न पत्र एवं सटीक समाधान',
      teacherCardRole: 'रसायन विज्ञान विभागाध्यक्ष • 8+ वर्ष अनुभव',
      teachingAt: 'अध्यापन केंद्र',
      teachingCenters: '3 कोचिंग सेंटर्स',
      teachingExp: 'शिक्षण अनुभव',
      experienceYears: '8+ वर्ष'
    },
    stats: {
      expTitle: '8+ वर्ष',
      expDesc: 'बोर्ड एवं प्रतियोगी परीक्षाओं में अध्यापन का अनुभव',
      centersTitle: '3 कोचिंग केंद्र',
      centersDesc: 'प्रतिष्ठित संस्थानों में नियमित शिक्षण बैच',
      masteryTitle: '100% वैचारिक स्पष्टता',
      masteryDesc: 'रटने की बजाय हर अभिक्रिया को वैज्ञानिक आधार से समझना',
      studentsTitle: '5,000+ विद्यार्थी',
      studentsDesc: 'बोर्ड्स में 95%+ अंक और JEE/NEET में उत्कृष्ट परिणाम'
    },
    subjects: {
      badge: 'रसायन विज्ञान के मुख्य स्तंभ',
      title: 'रसायन विज्ञान के तीनों अंगों में विशेषज्ञता',
      subtitle: 'विद्यार्थियों को अभिक्रियाओं को समझने, आवर्त सारणी के नियमों को जानने और प्रयोगशाला में पूरे अंक प्राप्त करने के लिए संपूर्ण पाठ्यक्रम।',
      organicName: 'कार्बनिक रसायन (Organic Chemistry)',
      organicDesc: 'इलेक्ट्रॉन स्थानांतरण, प्रेरणिक व अनुनाद प्रभाव, नाम वाली अभिक्रियाएं और बहु-चरणीय रासायनिक संश्लेषण।',
      inorganicName: 'अकार्बनिक रसायन (Inorganic Chemistry)',
      inorganicDesc: 'क्रिस्टल फील्ड सिद्धांत (CFT), उपसहसंयोजक यौगिक, रासायनिक आबंधन एवं आण्विक कक्षक सिद्धांत।',
      practicalName: 'प्रायोगिक रसायन (Practical Chemistry)',
      practicalDesc: 'गुणात्मक लवण विश्लेषण (धनायन/ऋणायन परीक्षण), अनुमापन गणनाएं और बोर्ड प्रायोगिक मौखिक (Viva) की तैयारी।',
      exploreBtn: 'सिलेबस और नोट्स देखें'
    },
    notices: {
      badge: 'नवीनतम घोषणाएं',
      title: 'महत्वपूर्ण नोटिस, परीक्षा तिथियां और कक्षा अपडेट',
      subtitle: 'सभी 3 केंद्रों के टेस्ट शेड्यूल, गृहकार्य, डाउट सेशन और अवकाश की जानकारी प्राप्त करें।',
      viewAll: 'सभी नोटिस देखें',
      downloadBtn: 'फाइल डाउनलोड करें',
      pinned: 'मुख्य सूचना',
      allBatches: 'सभी बैच',
      clickToRead: 'पूरी सूचना पढ़ने के लिए क्लिक करें'
    },
    materials: {
      badge: 'निःशुल्क अध्ययन सामग्री',
      title: 'हस्तलिखित नोट्स एवं फॉर्मूला चार्ट',
      subtitle: 'अजय चौधरी सर द्वारा तैयार किए गए उच्च गुणवत्ता वाले रिएक्शन मैप, फॉर्मूला शीट्स और चैप्टर नोट्स।',
      viewVault: 'सभी सामग्री देखें',
      previewBtn: 'PDF देखें',
      downloadBtn: 'डाउनलोड करें',
      downloadsText: 'डाउनलोड'
    },
    papersSolutions: {
      badge: 'अभ्यास एवं समाधान',
      title: 'नवीनतम प्रश्न पत्र एवं सत्यापित समाधान',
      subtitle: 'गत वर्षों के प्रश्न पत्र, यूनिट टेस्ट और बोर्ड मॉडल पेपर हल करें तथा स्टेप-बाय-स्टेप समाधान देखें।',
      viewSolution: 'समाधान देखें',
      viewPaper: 'प्रश्न पत्र देखें',
      downloadPdf: 'PDF डाउनलोड करें',
      allPapersBtn: 'सभी प्रश्न पत्र देखें',
      allSolutionsBtn: 'सभी समाधान देखें',
      solutionReady: 'समाधान उपलब्ध',
      officialKey: 'सटीक उत्तर कुंजी एवं व्याख्या'
    },
    whyLearn: {
      badge: 'शिक्षण पद्धति',
      title: 'अजय सर से रसायन विज्ञान क्यों पढ़ें?',
      subtitle: 'एक प्रमाणित 6-चरणीय वैज्ञानिक पद्धति जो कठिन से कठिन समीकरणों को भी आसान बनाती है।',
      pillar1Title: 'मूल सिद्धांतों से शुरुआत',
      pillar1Desc: 'हम अभिक्रिया लिखने से पहले परमाणु संरचना और कक्षक संकरण को गहराई से समझते हैं।',
      pillar2Title: 'चित्रात्मक अभिक्रिया मैकेनिज्म',
      pillar2Desc: 'रटने के बजाय तीर चिह्नों (Curved Arrows) द्वारा इलेक्ट्रॉन प्रवाह को समझना।',
      pillar3Title: 'प्रयोगशाला से सीधा संबंध',
      pillar3Desc: 'किताबी सूत्रों को प्रयोगशाला के रंगों, अवक्षेपों और गंध परीक्षणों से जोड़ना।',
      pillar4Title: 'स्तरवार अभ्यास प्रश्न (DPP)',
      pillar4Desc: 'NCERT से लेकर JEE एडवांस और NEET स्तर तक के प्रश्न पत्रों का अभ्यास।',
      pillar5Title: 'व्यक्तिगत संदेह निवारण',
      pillar5Desc: 'हर अध्याय के बाद विशेष डाउट क्लास और गलतियों का सूक्ष्म विश्लेषण।',
      pillar6Title: 'परीक्षा में प्रस्तुति की रणनीति',
      pillar6Desc: 'बोर्ड परीक्षा में 3 और 5 अंक वाले प्रश्नों में पूरे अंक प्राप्त करने की सही शैली।'
    },
    portfolio: {
      badge: 'कक्षा एवं प्रयोगशाला गैलरी',
      title: 'अध्यापन यात्रा एवं कक्षा अनुभव',
      subtitle: 'अजय चौधरी सर की इंटरैक्टिव क्लासरूम, प्रयोगशाला लवण विश्लेषण और विद्यार्थियों के मार्गदर्शन के दृश्य।',
      bannerTag: 'शैक्षणिक अनुभव एवं मेंटरशिप',
      bannerHeading: '3 कोचिंग संस्थानों में सक्रिय कक्षा बैच',
      bannerSub: 'कक्षा 11, 12, JEE मेन/एडवांस्ड और NEET के छात्रों के लिए व्यक्तिगत मार्गदर्शन।',
      readBio: 'पूरा परिचय पढ़ें'
    },
    interactive: {
      badge: 'इंटरैक्टिव लर्निंग टूल',
      title: 'इंटरैक्टिव कॉन्सेप्ट एक्सप्लोरर एवं रिएक्शन टूल',
      subtitle: 'किसी भी विषय पर क्लिक करें और उसकी चरणबद्ध क्रियाविधि, परिस्थितियां और परीक्षा के महत्वपूर्ण बिंदु देखें।',
      selectTopic: 'विषय का चयन करें:',
      reactionBoxTitle: 'रासायनिक समीकरण एवं अभिक्रिया पथ',
      mechanismTitle: 'चरणबद्ध अभिक्रिया क्रियाविधि (Mechanism):',
      takeawayTitle: 'मुख्य वैचारिक नियम:',
      examRelevance: 'परीक्षा अंक भार (Weightage):'
    },
    cta: {
      badge: 'प्रवेश एवं मार्गदर्शन',
      title: 'केमिस्ट्री में 95%+ अंक और JEE / NEET क्रैक करने के लिए तैयार हैं?',
      description: 'कैटेलिस्ट करियर इंस्टीट्यूट, एपेक्स साइंस एकेडमी या प्रेरणा लर्निंग हब में अजय सर के बैच में शामिल हों। व्यक्तिगत ध्यान के लिए सीमित सीटें।',
      joinBtn: 'प्रवेश पूछताछ भेजें',
      callBtn: 'सीधे कॉल करें'
    },
    contact: {
      title: 'अजय चौधरी सर से संपर्क करें',
      subtitle: 'बैच समय, प्रवेश या टेस्ट सीरीज़ के संबंध में कोई प्रश्न है? अपना संदेश भेजें या सीधे संपर्क करें।',
      nameLabel: 'आपका पूरा नाम *',
      emailLabel: 'ईमेल पता *',
      phoneLabel: 'मोबाइल नंबर (WhatsApp) *',
      classLabel: 'कक्षा / लक्ष्य परीक्षा *',
      messageLabel: 'आपका प्रश्न या संदेश *',
      sendBtn: 'संदेश भेजें',
      sending: 'भेजा जा रहा है...',
      centersTitle: 'कोचिंग संस्थान एवं पते',
      schedulesTitle: 'साप्ताहिक कक्षा समय-सारणी',
      faqTitle: 'अक्सर पूछे जाने वाले प्रश्न'
    },
    footer: {
      tagline: '3 प्रमुख कोचिंग केंद्रों में 8+ वर्षों के अनुभव के साथ कार्बनिक, अकार्बनिक एवं प्रायोगिक रसायन में विद्यार्थियों का मार्गदर्शन।',
      specializationsTitle: 'विशेषज्ञता',
      centersTitle: 'कोचिंग सेंटर्स',
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
      ctaContact: 'Sir se Contact Karein',
      statStudents: '5,000+ Students Mentored',
      statConcept: '100% Concept-First Learning',
      statPapers: 'Free Question Papers & Solutions',
      teacherCardRole: 'Head of Chemistry • 8+ Years Exp',
      teachingAt: 'Teaching At',
      teachingCenters: '3 Coaching Centers',
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
      description: 'Catalyst Career Institute, Apex Science Academy ya Prerana Learning Hub mein Ajay Sir ke batches join karein. Personal attention ke liye limited seats.',
      joinBtn: 'Admission Inquiry Bhejein',
      callBtn: 'Direct Call Karein'
    },
    contact: {
      title: 'Ajay Sir se Contact Karein',
      subtitle: 'Batch timings, admissions ya test series se related koi bhi sawal ho toh form fill karein ya WhatsApp karein.',
      nameLabel: 'Aapka Pura Naam *',
      emailLabel: 'Email Address *',
      phoneLabel: 'Phone Number (WhatsApp) *',
      classLabel: 'Class / Target Exam *',
      messageLabel: 'Aapka Message ya Doubt *',
      sendBtn: 'Inquiry Message Bhejein',
      sending: 'Bheja ja raha hai...',
      centersTitle: 'Coaching Centers aur Locations',
      schedulesTitle: 'Weekly Class Timings',
      faqTitle: 'Frequently Asked Questions'
    },
    footer: {
      tagline: '8+ years ke experience ke sath Organic, Inorganic aur Practical Chemistry mein students ko empower karna across 3 coaching centers.',
      specializationsTitle: 'Specializations',
      centersTitle: 'Coaching Centers',
      resourcesTitle: 'Student Resources',
      rightsReserved: 'All rights reserved. Ajay Choudhary Chemistry Platform.'
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('ajay_chem_lang') as Language;
    if (saved && (saved === 'en' || saved === 'hi' || saved === 'hinglish')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('ajay_chem_lang', lang);
  };

  const t = TRANSLATIONS[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
