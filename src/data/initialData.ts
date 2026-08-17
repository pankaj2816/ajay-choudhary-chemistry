import { DatabaseSchema } from '@/lib/types';

export const initialDatabase: DatabaseSchema = {
  settings: {
    teacherName: 'Ajay Choudhary',
    tagline: 'Experienced Chemistry Educator | 8+ Years of Academic Excellence',
    bioShort: 'Empowering students to master Organic Chemistry, Inorganic Chemistry, and Laboratory Practicals through first-principles conceptual clarity and systematic problem solving.',
    experienceYears: 8,
    centersCount: 3,
    studentsCount: '5,000+',
    email: 'contact@ajaychemistry.com',
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    bannerActive: true,
    bannerAlert: '📢 Admissions Open for Class 11 & 12 Chemistry Master Batch & JEE/NEET Revision. Check Notice Board!',
    bannerLink: '/updates',
    coachingCenters: [
      {
        id: 'center-1',
        name: 'Catalyst Career Institute',
        location: 'Central Campus, Sector 14',
        address: 'Plot 42, Knowledge Park, Sector 14, Metro Pillar 128',
        batches: 'Class 12 Board + JEE Target / Dropper Masterclass',
        schedule: 'Mon, Wed, Fri (4:00 PM – 7:30 PM)',
        contactNumber: '+91 98765 43210'
      },
      {
        id: 'center-2',
        name: 'Apex Science Academy',
        location: 'North Wing, Model Town',
        address: 'B-Block Main Market, Opposite City Park, Model Town',
        batches: 'Class 11 Foundation Chemistry & Organic Basics',
        schedule: 'Tue, Thu, Sat (3:30 PM – 7:00 PM)',
        contactNumber: '+91 98765 43211'
      },
      {
        id: 'center-3',
        name: 'Prerana Learning Hub',
        location: 'South Extension Centre',
        address: '3rd Floor, Scholar Towers, Near Central Library',
        batches: 'NEET Chemistry Intensive & Practical Lab Sessions',
        schedule: 'Sunday Special Batches (8:30 AM – 2:00 PM)',
        contactNumber: '+91 98765 43212'
      }
    ]
  },

  taxonomies: {
    subjects: [
      'Organic Chemistry',
      'Inorganic Chemistry',
      'Practical Chemistry',
      'Physical Chemistry'
    ],
    classes: [
      'Class 11',
      'Class 12',
      'Dropper / JEE / NEET',
      'All Classes'
    ],
    chapters: {
      'Organic Chemistry': [
        'General Organic Chemistry (GOC)',
        'Hydrocarbons (Alkanes, Alkenes, Alkynes)',
        'Haloalkanes and Haloarenes',
        'Alcohols, Phenols and Ethers',
        'Aldehydes, Ketones and Carboxylic Acids',
        'Amines and Diazonium Salts',
        'Biomolecules & Polymers',
        'Organic Reaction Mechanisms'
      ],
      'Inorganic Chemistry': [
        'Periodic Classification & Trends',
        'Chemical Bonding & Molecular Structure',
        'Coordination Compounds',
        'p-Block Elements (Group 15-18)',
        'd and f Block Elements',
        'Metallurgy & Isolation Principles',
        'Hydrogen & s-Block Elements'
      ],
      'Practical Chemistry': [
        'Qualitative Salt Analysis (Cations & Anions)',
        'Volumetric Analysis (Titration Calculations)',
        'Organic Functional Group Identification Tests',
        'Preparation of Lyophilic & Lyophobic Sols',
        'Laboratory Safety Protocols & Apparatus Setup'
      ],
      'Physical Chemistry': [
        'Some Basic Concepts of Chemistry (Mole Concept)',
        'Structure of Atom',
        'Chemical Thermodynamics & Energetics',
        'Equilibrium (Chemical & Ionic)',
        'Solutions & Colligative Properties',
        'Electrochemistry',
        'Chemical Kinetics'
      ]
    },
    resourceTypes: [
      'Chapter Notes',
      'Reaction Sheet',
      'Formula Sheet',
      'Important Questions',
      'Practice Worksheet',
      'Practical Manual',
      'Revision Material'
    ],
    testTypes: [
      'Unit Test',
      'Periodic Test',
      'Term Examination',
      'Board Mock Test',
      'JEE Main & Adv DPP',
      'NEET Practice'
    ],
    noticeCategories: [
      'Important Notice',
      'Class Update',
      'Test / Examination',
      'Assignment',
      'Study Material',
      'Question Paper',
      'General Announcement'
    ]
  },

  teamMembers: [
    {
      id: 'team-1',
      name: 'Ajay Choudhary',
      role: 'Organic Chemistry & Reaction Mechanisms',
      designation: 'M.Sc. Chemistry, B.Ed (8+ Years Experience)',
      specialization: 'Reaction Mechanisms, Stereochemistry & Synthesis Roadmaps',
      experience: '8+ Years teaching over 5,000+ board & competitive aspirants.',
      centers: 'Catalyst Career Institute (Sector 14)',
      image: '/images/ajay-choudhary.jpg',
      bio: 'Renowned for his systematic, step-by-step breakdown of difficult reaction mechanisms and crystal-clear visual explanation of molecular orbitals and curved-arrow electron flow.',
      email: 'ajay@ajaychemistry.com'
    },
    {
      id: 'team-2',
      name: 'Ajay Choudhary',
      role: 'Practical Chemistry & Laboratory Specialist',
      designation: 'Senior Chemistry Faculty & Lab Instructor',
      specialization: 'Qualitative Salt Analysis, Titrations & Viva Voce Preparation',
      experience: '8+ Years hands-on laboratory coaching and practical workshops.',
      centers: 'Prerana Learning Hub (South Extension)',
      image: '/images/chemistry-lab-hero.jpg',
      bio: 'Leading structured laboratory salt analysis workshops, brown ring tests, redox titration estimations, and comprehensive practical viva training.',
      email: 'contact@ajaychemistry.com'
    },
    {
      id: 'team-3',
      name: 'Ajay Choudhary',
      role: 'Inorganic Chemistry & Conceptual Bonding',
      designation: 'Inorganic Chemistry Educator',
      specialization: 'Coordination Chemistry, Periodic Trends & Crystal Field Theory',
      experience: '8+ Years mentoring JEE, NEET & Board toppers.',
      centers: 'Apex Science Academy (Model Town)',
      image: '/images/teaching-team.jpg',
      bio: 'Specialist in demystifying inorganic periodic trends, transition metals, crystal field energy splitting (Δo), and molecular orbital theory without rote memorization.',
      email: 'contact@ajaychemistry.com'
    }
  ],

  updates: [
    {
      id: 'notif-1',
      title: 'Class 12 Organic Chemistry Grand Revision & Mechanism Workshop',
      category: 'Class Update',
      description: 'Special weekend intensive on Electrophilic Aromatic Substitution, Aldol Condensation, and Cannizzaro mechanisms.',
      content: `### Weekend Special Masterclass Announcement\n\nAll Class 12 students across **Catalyst**, **Apex**, and **Prerana** centers are required to attend the special Organic Reaction Mechanisms Bootcamp this Saturday.\n\n**Topics Covered:**\n- Nucleophilic addition to carbonyl compounds\n- Enolate chemistry & Named Reactions\n- Directing groups in aromatic ring conversions\n- High-yield JEE/NEET multi-step synthesis pathways\n\n*Please bring your Organic Chemistry Roadmaps and solved DPPs.*`,
      date: '2026-08-16',
      isPinned: true,
      isPublished: true,
      attachmentName: 'Organic_Reaction_Roadmap_2026.pdf',
      attachmentUrl: '/uploads/sample_organic_roadmap.pdf',
      attachmentSize: '2.4 MB',
      targetClass: 'Class 12'
    },
    {
      id: 'notif-2',
      title: 'Unit Test 04: Coordination Compounds & Chemical Bonding Results Declared',
      category: 'Test / Examination',
      description: 'Detailed answer key, model answers, and student rank list uploaded. Review solutions before Friday.',
      content: `### Test Assessment & Solution Sheet Uploaded\n\nThe evaluation for **Unit Test 04 (Coordination Chemistry & Bonding)** is complete. Students can now check the detailed step-by-step solution from the Solutions section.\n\n**Key Highlights:**\n- Class average: 78%\n- Common mistake area: Crystal field splitting energy (CFSE) calculations for high spin vs low spin $d^6$ complexes.\n- One-on-one doubt resolution slots are available post-lecture on Thursday.`,
      date: '2026-08-14',
      isPinned: true,
      isPublished: true,
      attachmentName: 'Coordination_Compounds_Unit_Test_04_Solution.pdf',
      attachmentUrl: '/uploads/sample_coordination_solution.pdf',
      attachmentSize: '1.8 MB',
      targetClass: 'Class 12'
    },
    {
      id: 'notif-3',
      title: 'Practical Chemistry Lab Session: Systematic Qualitative Salt Analysis',
      category: 'Important Notice',
      description: 'Mandatory laboratory sessions for Class 11 & 12 students covering cation and anion zero to VI group testing.',
      content: `### Laboratory Practical Schedule\n\nPractical sessions for qualitative salt analysis (identification of acid and basic radicals) are scheduled as per the batches below:\n\n- **Batch A (Apex Center):** Saturday 9:00 AM – 11:30 AM\n- **Batch B (Catalyst Center):** Saturday 2:00 PM – 4:30 PM\n- **Batch C (Prerana Center):** Sunday 10:00 AM – 12:30 PM\n\n*Lab coats and safety goggles are strictly compulsory.*`,
      date: '2026-08-10',
      isPinned: false,
      isPublished: true,
      attachmentName: 'Salt_Analysis_Practical_Manual_2026.pdf',
      attachmentUrl: '/uploads/sample_salt_analysis_manual.pdf',
      attachmentSize: '3.1 MB',
      targetClass: 'All Classes'
    },
    {
      id: 'notif-4',
      title: 'New Daily Practice Problem (DPP 08) on Hydrocarbons Uploaded',
      category: 'Assignment',
      description: 'Class 11 students must complete DPP 08 on Markovnikov addition and ozonolysis before Tuesday class.',
      content: `### Assignment Submission Deadline\n\nDPP 08 containing 25 targeted questions covering Alkene addition reactions, Anti-Markovnikov peroxide effect, and Ozonolysis product identification has been published in the Study Materials section.`,
      date: '2026-08-08',
      isPinned: false,
      isPublished: true,
      attachmentName: 'DPP_08_Hydrocarbons_Class11.pdf',
      attachmentUrl: '/uploads/sample_dpp_hydrocarbons.pdf',
      attachmentSize: '1.2 MB',
      targetClass: 'Class 11'
    }
  ],

  questionPapers: [
    {
      id: 'qp-101',
      title: 'Organic Chemistry – Unit Test 01: Hydrocarbons & Basic Reaction Mechanisms',
      subject: 'Organic Chemistry',
      className: 'Class 11',
      chapter: 'Hydrocarbons (Alkanes, Alkenes, Alkynes)',
      testType: 'Unit Test',
      year: '2026',
      uploadDate: '2026-08-12',
      totalMarks: 50,
      duration: '90 Minutes',
      description: 'Comprehensive test covering free radical halogenation, electrophilic addition to alkenes, Markovnikov vs Kharasch effect, ozonolysis, and acidic nature of alkynes.',
      fileUrl: '/uploads/qp_organic_hydrocarbons_ut01.pdf',
      fileName: 'QP_Organic_Hydrocarbons_UT01.pdf',
      fileSize: '1.4 MB',
      hasSolution: true,
      solutionId: 'sol-101'
    },
    {
      id: 'qp-102',
      title: 'Inorganic Chemistry – Periodic Test: Coordination Compounds & IUPAC Nomenclature',
      subject: 'Inorganic Chemistry',
      className: 'Class 12',
      chapter: 'Coordination Compounds',
      testType: 'Periodic Test',
      year: '2026',
      uploadDate: '2026-08-05',
      totalMarks: 40,
      duration: '75 Minutes',
      description: 'Focuses on Werner theory, IUPAC naming of coordination complexes, isomerism (structural and stereoisomerism), CFT splitting in octahedral and tetrahedral fields, and magnetic moments.',
      fileUrl: '/uploads/qp_inorganic_coordination_compounds.pdf',
      fileName: 'QP_Coordination_Compounds_PT02.pdf',
      fileSize: '1.6 MB',
      hasSolution: true,
      solutionId: 'sol-102'
    },
    {
      id: 'qp-103',
      title: 'Organic Chemistry – Board Mock Exam: Aldehydes, Ketones & Carboxylic Acids',
      subject: 'Organic Chemistry',
      className: 'Class 12',
      chapter: 'Aldehydes, Ketones and Carboxylic Acids',
      testType: 'Board Mock Test',
      year: '2026',
      uploadDate: '2026-07-28',
      totalMarks: 70,
      duration: '3 Hours',
      description: 'Full syllabus chapter mock covering nucleophilic addition, Tollens and Fehling tests, Aldol and Cross-Aldol condensation, Cannizzaro reaction, Hell-Volhard-Zelinsky (HVZ) reaction, and acidity comparisons.',
      fileUrl: '/uploads/qp_aldehydes_ketones_mock.pdf',
      fileName: 'QP_Aldehydes_Ketones_FullMock.pdf',
      fileSize: '2.1 MB',
      hasSolution: true,
      solutionId: 'sol-103'
    },
    {
      id: 'qp-104',
      title: 'Practical Chemistry – Laboratory Exam & Salt Analysis Viva Prep',
      subject: 'Practical Chemistry',
      className: 'Class 12',
      chapter: 'Qualitative Salt Analysis (Cations & Anions)',
      testType: 'Term Examination',
      year: '2026',
      uploadDate: '2026-07-15',
      totalMarks: 30,
      duration: '60 Minutes',
      description: 'Written diagnostic test on systematic group reagent tests, confirmatory tests for basic and acid radicals (Lead, Copper, Aluminium, Iron, Zinc, Barium, Carbonate, Nitrate, Chloride), and error analysis.',
      fileUrl: '/uploads/qp_practical_salt_analysis.pdf',
      fileName: 'QP_Practical_Salt_Analysis_Term01.pdf',
      fileSize: '1.1 MB',
      hasSolution: true,
      solutionId: 'sol-104'
    },
    {
      id: 'qp-105',
      title: 'JEE Target DPP: Chemical Bonding, Molecular Orbital Theory & Hybridization',
      subject: 'Inorganic Chemistry',
      className: 'Dropper / JEE / NEET',
      chapter: 'Chemical Bonding & Molecular Structure',
      testType: 'JEE Main & Adv DPP',
      year: '2026',
      uploadDate: '2026-07-02',
      totalMarks: 100,
      duration: '60 Minutes',
      description: 'High-difficulty single correct, multi-correct, and numerical answer type questions on bond order, dipole moment calculations, MOT energy diagrams, and VSEPR exceptions.',
      fileUrl: '/uploads/qp_jee_chemical_bonding.pdf',
      fileName: 'QP_JEE_Adv_Chemical_Bonding_DPP.pdf',
      fileSize: '1.9 MB',
      hasSolution: false
    }
  ],

  solutions: [
    {
      id: 'sol-101',
      title: 'Detailed Step-by-Step Solution: Hydrocarbons Unit Test 01',
      questionPaperId: 'qp-101',
      questionPaperTitle: 'Organic Chemistry – Unit Test 01: Hydrocarbons & Basic Reaction Mechanisms',
      subject: 'Organic Chemistry',
      chapter: 'Hydrocarbons (Alkanes, Alkenes, Alkynes)',
      className: 'Class 11',
      uploadDate: '2026-08-13',
      description: 'Complete verified solutions with detailed curved-arrow reaction mechanisms, intermediate stability explanations, and stereochemical outcomes for all 15 questions.',
      solutionPdfUrl: '/uploads/sol_organic_hydrocarbons_ut01.pdf',
      solutionPdfName: 'Solution_Organic_Hydrocarbons_UT01.pdf',
      solutionPdfSize: '2.2 MB',
      verifiedBy: 'Ajay Choudhary (Master Chemistry Educator)',
      stepByStepContent: `### Section A: Detailed Step-by-Step Solutions

#### Question 1: Electrophilic Addition of HBr to Propene
Reaction Equation:
CH₃-CH=CH₂  +  HBr  ➔  CH₃-CH(Br)-CH₃  (Major Product: 2-Bromopropane)

Step-by-Step Reaction Mechanism:
1. Protonation of Alkene: The electrophilic proton (H⁺) attacks the pi electron cloud of the double bond to generate the more stable 2° carbocation intermediate (CH₃-CH⁺-CH₃) rather than the less stable 1° carbocation (CH₃-CH₂-CH₂⁺).
2. Nucleophilic Attack: The nucleophilic bromide ion (Br⁻) attacks the planar 2° carbocation intermediate to form 2-bromopropane as the major product (Markovnikov's Rule).

#### Question 2: Reductive Ozonolysis of 2-Methylbut-2-ene
Reaction Equation:
(CH₃)₂C=CH-CH₃  +  O₃  ──[Zn / H₂O]──➔  CH₃-CO-CH₃ (Acetone)  +  CH₃-CHO (Ethanal)

Key Conceptual Highlights:
- The carbon-carbon double bond is cleaved oxidatively by Ozone (O₃) to form an ozonide intermediate.
- Reduction with Zinc dust and water prevents further oxidation of acetaldehyde into acetic acid, cleanly isolating Acetone and Ethanal.`,
      answerKey: [
        { questionNo: 'Q1', answer: '2-Bromopropane (Option B)', explanation: 'Markovnikov addition via stable 2° carbocation intermediate.' },
        { questionNo: 'Q2', answer: 'Acetone + Ethanal (Option C)', explanation: 'Reductive ozonolysis cleavage of carbon-carbon double bond.' },
        { questionNo: 'Q3', answer: 'Sodium metal in dry ether (Wurtz)', explanation: 'Coupling of alkyl halides to form symmetrical higher alkanes.' },
        { questionNo: 'Q4', answer: 'Acidic nature of Terminal Alkynes (Option A)', explanation: 'sp hybridized carbon has 50% s-character, making acetylenic hydrogen acidic.' }
      ]
    },
    {
      id: 'sol-102',
      title: 'Verified Solutions & Crystal Field Diagram: Coordination Compounds PT 02',
      questionPaperId: 'qp-102',
      questionPaperTitle: 'Inorganic Chemistry – Periodic Test: Coordination Compounds & IUPAC Nomenclature',
      subject: 'Inorganic Chemistry',
      chapter: 'Coordination Compounds',
      className: 'Class 12',
      uploadDate: '2026-08-06',
      description: 'Includes CFT energy splitting calculations, hybridization diagrams (inner vs outer orbital complexes), and IUPAC naming step-by-step.',
      solutionPdfUrl: '/uploads/sol_inorganic_coordination_compounds.pdf',
      solutionPdfName: 'Solution_Coordination_Compounds_PT02.pdf',
      solutionPdfSize: '2.5 MB',
      verifiedBy: 'Ajay Choudhary (Master Chemistry Educator)',
      stepByStepContent: `### Section A: Coordination Chemistry Solutions

#### Question 1: IUPAC Nomenclature for [Co(NH₃)₄Cl(NO₂)]Cl
Step-by-Step Derivation:
1. Identify the central metal atom: Cobalt.
2. Order ligands alphabetically: tetraammine, chlorido, nitrito-N.
3. Calculate oxidation state: x + 4(0) + (-1) + (-1) = +1  ➔  x = +3.
4. Correct IUPAC Name: Tetraamminechloridonitrito-N-cobalt(III) chloride.

#### Question 2: Magnetic Moment Comparison: [Fe(CN)₆]⁴⁻ vs [Fe(H₂O)₆]²⁺
Conceptual Breakdown:
1. For [Fe(CN)₆]⁴⁻ (Low Spin Complex):
   - Fe²⁺ ground state electronic configuration: 3d⁶.
   - Cyanide (CN⁻) is a strong field ligand (Δo > Pairing Energy).
   - Electron configuration: t₂g⁶ e_g⁰. Number of unpaired electrons n = 0.
   - Magnetic Moment: μ = 0 BM (Diamagnetic).

2. For [Fe(H₂O)₆]²⁺ (High Spin Complex):
   - H₂O is a weak field ligand (Δo < Pairing Energy).
   - Electron configuration: t₂g⁴ e_g². Number of unpaired electrons n = 4.
   - Magnetic Moment: μ = √(4 × 6) = √24 ≈ 4.90 BM (Paramagnetic).`,
      answerKey: [
        { questionNo: 'Q1', answer: 'Tetraamminechloridonitrito-N-cobalt(III) chloride', explanation: 'Alphabetical ligand ordering with metal oxidation state.' },
        { questionNo: 'Q2', answer: 'Diamagnetic (0 BM) & Paramagnetic (4.9 BM)', explanation: 'CFT pairing energy vs ligand field strength.' },
        { questionNo: 'Q3', answer: 'd2sp3 (Inner orbital, Octahedral)', explanation: 'Strong field ligand forces electrons into 3d subshell pairing.' }
      ]
    },
    {
      id: 'sol-103',
      title: 'Model Answer Script: Aldehydes, Ketones & Carboxylic Acids Board Mock',
      questionPaperId: 'qp-103',
      questionPaperTitle: 'Organic Chemistry – Board Mock Exam: Aldehydes, Ketones & Carboxylic Acids',
      subject: 'Organic Chemistry',
      chapter: 'Aldehydes, Ketones and Carboxylic Acids',
      className: 'Class 12',
      uploadDate: '2026-07-29',
      description: 'Complete 70-mark board model answer sheet with step-wise marks distribution, chemical equations, and chemical distinction tests.',
      solutionPdfUrl: '/uploads/sol_aldehydes_ketones_mock.pdf',
      solutionPdfName: 'Solution_Aldehydes_Ketones_BoardMock.pdf',
      solutionPdfSize: '3.0 MB',
      verifiedBy: 'Ajay Choudhary',
      stepByStepContent: `### Board Marking Scheme & Chemical Tests

#### Question 1: Chemical Distinction between Propanal and Propanone
1. Tollens' Silver Mirror Test:
   - Propanal reacts with ammoniacal silver nitrate [Ag(NH₃)₂]⁺ to precipitate shiny metallic silver mirror on the test tube wall.
   - Propanone (a ketone) does NOT reduce Tollens' reagent.

2. Iodoform Test:
   - Propanone contains a methyl ketone group (CH₃-CO-) and forms a bright yellow precipitate of Iodoform (CHI₃) when warmed with I₂ and NaOH.
   - Propanal does NOT give a positive iodoform test.

#### Question 2: Mechanism of Base-Catalyzed Aldol Condensation
Reaction Equation:
2 CH₃-CHO  ──[Dilute NaOH, Heat]──➔  CH₃-CH=CH-CHO (But-2-enal / Crotonaldehyde)  +  H₂O

Step-by-Step Reaction Mechanism:
1. Enolate Formation: Hydroxide ion (OH⁻) removes an acidic α-hydrogen from acetaldehyde to create a resonance-stabilized enolate nucleophile (:CH₂-CHO⁻).
2. Nucleophilic Addition: The enolate ion attacks the electrophilic carbonyl carbon of the second acetaldehyde molecule.
3. Protonation & Dehydration: Proton transfer yields 3-hydroxybutanal (Aldol), which upon gentle heating loses water (H₂O) to give the conjugated α,β-unsaturated aldehyde: But-2-enal.`,
      answerKey: [
        { questionNo: 'Q1', answer: 'Tollens Test & Iodoform Test', explanation: 'Aldehydes reduce Tollens reagent; methyl ketones form yellow iodoform ppt.' },
        { questionNo: 'Q2', answer: 'But-2-enal (Crotonaldehyde)', explanation: 'Self-aldol condensation followed by dehydration on warming.' },
        { questionNo: 'Q3', answer: 'Trichloroacetic acid > Chloroacetic acid > Acetic acid', explanation: '-I inductive effect of electronegative chlorine atoms stabilizes the conjugate carboxylate base.' }
      ]
    },
    {
      id: 'sol-104',
      title: 'Complete Salt Analysis Viva & Lab Flowchart Guide',
      questionPaperId: 'qp-104',
      questionPaperTitle: 'Practical Chemistry – Laboratory Exam & Salt Analysis Viva Prep',
      subject: 'Practical Chemistry',
      chapter: 'Qualitative Salt Analysis (Cations & Anions)',
      className: 'Class 12',
      uploadDate: '2026-07-16',
      description: 'Systematic flowchart from zero group (NH4+) to group VI (Mg2+), along with confirmatory reactions for chromyl chloride and brown ring test.',
      solutionPdfUrl: '/uploads/sol_practical_salt_analysis.pdf',
      solutionPdfName: 'Solution_Salt_Analysis_Practical_Guide.pdf',
      solutionPdfSize: '1.7 MB',
      verifiedBy: 'Ajay Choudhary (Master Chemistry Educator)',
      stepByStepContent: `### Practical Chemistry Laboratory Guide

#### Experiment 1: Confirmatory Brown Ring Test for Nitrate Ion (NO₃⁻)
Procedure & Observation:
1. Add freshly prepared ferrous sulphate solution (FeSO₄) to the aqueous salt extract.
2. Incline the test tube and slowly trickle concentrated Sulfuric Acid (conc. H₂SO₄) down the inner wall.
3. Observation: A distinct dark brown ring forms at the liquid junction.

Chemical Reaction:
Fe²⁺  +  NO₃⁻  +  H⁺  ➔  Fe³⁺  +  NO  +  H₂O
[Fe(H₂O)₆]²⁺  +  NO  ➔  [Fe(H₂O)₅(NO)]²⁺ (Pentaaquanitrosyliron(II) complex - Brown Ring)

#### Experiment 2: Chromyl Chloride Test for Chloride Ion (Cl⁻)
Procedure & Observation:
1. Mix solid chloride salt with solid Potassium Dichromate (K₂Cr₂O₇) and add conc. H₂SO₄.
2. Heat gently: Deep reddish-brown vapors of Chromyl Chloride (CrO₂Cl₂) evolve.
3. Pass vapors through NaOH: Solution turns yellow due to Sodium Chromate (Na₂CrO₄).
4. Acidify with acetic acid and add Lead Acetate: A bright yellow precipitate of Lead Chromate (PbCrO₄) confirms Chloride.`,
      answerKey: [
        { questionNo: 'Q1', answer: '[Fe(H2O)5(NO)]2+ complex', explanation: 'Nitrosyl ferrous sulphate brown ring formed at junction.' },
        { questionNo: 'Q2', answer: 'CrO2Cl2 (Chromyl Chloride)', explanation: 'Specific test for ionic chlorides; distinguishes from bromides and iodides.' },
        { questionNo: 'Q3', answer: 'Nessler’s Reagent (K2[HgI4]) gives brown ppt', explanation: 'Formation of iodide of Millon’s base for NH4+ cation detection.' }
      ]
    }
  ],

  studyMaterials: [
    {
      id: 'mat-201',
      title: 'Organic Chemistry Master Reaction Mechanism Map (All Classes)',
      subject: 'Organic Chemistry',
      className: 'Class 12',
      chapter: 'Organic Reaction Mechanisms',
      resourceType: 'Reaction Sheet',
      description: 'Comprehensive high-resolution visual reaction flowchart connecting Hydrocarbons, Alkyl Halides, Alcohols, Carbonyls, and Amines with reagents, temperatures, and catalysts.',
      fileUrl: '/uploads/organic_master_reaction_map.pdf',
      fileName: 'Organic_Master_Reaction_Map_2026.pdf',
      fileSize: '4.2 MB',
      uploadDate: '2026-08-15',
      downloadsCount: 1420,
      isFeatured: true
    },
    {
      id: 'mat-202',
      title: 'Class 11 General Organic Chemistry (GOC) Complete Handwritten Notes',
      subject: 'Organic Chemistry',
      className: 'Class 11',
      chapter: 'General Organic Chemistry (GOC)',
      resourceType: 'Chapter Notes',
      description: 'Comprehensive handwritten classroom notes covering Inductive effect, Resonance & Mesomeric effect, Hyperconjugation, Electromeric effect, Aromaticity (Hückel rule), and Acid-Base strengths.',
      fileUrl: '/uploads/goc_complete_notes_class11.pdf',
      fileName: 'GOC_Class11_Complete_Notes.pdf',
      fileSize: '6.8 MB',
      uploadDate: '2026-08-11',
      downloadsCount: 2310,
      isFeatured: true
    },
    {
      id: 'mat-203',
      title: 'Coordination Chemistry Formula & IUPAC Quick Reference Handbook',
      subject: 'Inorganic Chemistry',
      className: 'Class 12',
      chapter: 'Coordination Compounds',
      resourceType: 'Formula Sheet',
      description: 'Handy pocket summary of ligand classification (chelating, ambidentate), spectrochemical series, crystal field splitting factors, and stability constants.',
      fileUrl: '/uploads/coordination_compounds_handbook.pdf',
      fileName: 'Coordination_Compounds_Formula_Sheet.pdf',
      fileSize: '1.9 MB',
      uploadDate: '2026-08-04',
      downloadsCount: 980,
      isFeatured: true
    },
    {
      id: 'mat-204',
      title: 'Qualitative Salt Analysis Laboratory Manual & Cation-Anion Flowcharts',
      subject: 'Practical Chemistry',
      className: 'All Classes',
      chapter: 'Qualitative Salt Analysis (Cations & Anions)',
      resourceType: 'Practical Manual',
      description: 'Step-by-step practical manual with color indicators, group reagents, flame tests, borax bead tests, and viva voce questions for CBSE, ISC, and State Boards.',
      fileUrl: '/uploads/salt_analysis_practical_manual.pdf',
      fileName: 'Salt_Analysis_Practical_Manual.pdf',
      fileSize: '3.5 MB',
      uploadDate: '2026-07-25',
      downloadsCount: 1670,
      isFeatured: true
    },
    {
      id: 'mat-205',
      title: 'p-Block Elements (Group 15 to 18) Trends & Anomalous Behavior Notes',
      subject: 'Inorganic Chemistry',
      className: 'Class 12',
      chapter: 'p-Block Elements (Group 15-18)',
      resourceType: 'Chapter Notes',
      description: 'Point-wise comparative notes on oxidation states, thermal stability of hydrides, oxoacids of phosphorus and sulfur, interhalogen compounds, and xenon fluorides.',
      fileUrl: '/uploads/p_block_elements_notes.pdf',
      fileName: 'p_Block_Elements_Class12_Notes.pdf',
      fileSize: '5.1 MB',
      uploadDate: '2026-07-18',
      downloadsCount: 840,
      isFeatured: false
    },
    {
      id: 'mat-206',
      title: 'Chemical Bonding & VSEPR Hybridization High-Yield Practice Worksheet',
      subject: 'Inorganic Chemistry',
      className: 'Class 11',
      chapter: 'Chemical Bonding & Molecular Structure',
      resourceType: 'Practice Worksheet',
      description: '60 curated problem sets covering lone pair repulsions, bent rule, Berry pseudorotation, and molecular orbital configurations for homonuclear & heteronuclear diatomics.',
      fileUrl: '/uploads/chemical_bonding_practice_worksheet.pdf',
      fileName: 'Chemical_Bonding_Worksheet_Class11.pdf',
      fileSize: '2.3 MB',
      uploadDate: '2026-07-10',
      downloadsCount: 1120,
      isFeatured: false
    },
    {
      id: 'mat-207',
      title: 'Physical Chemistry Quick Formula Sheet & Conversion Factors',
      subject: 'Physical Chemistry',
      className: 'Dropper / JEE / NEET',
      chapter: 'Solutions & Colligative Properties',
      resourceType: 'Formula Sheet',
      description: 'All formulas for Raoult’s law, van ’t Hoff factor (i), depression in freezing point, elevation in boiling point, Nernst equation, and Arrhenius equation in one printable cheat-sheet.',
      fileUrl: '/uploads/physical_chemistry_formula_sheet.pdf',
      fileName: 'Physical_Chemistry_Formula_Sheet.pdf',
      fileSize: '1.5 MB',
      uploadDate: '2026-06-28',
      downloadsCount: 1890,
      isFeatured: false
    }
  ],

  contactMessages: [
    {
      id: 'msg-1',
      name: 'Rohan Deshmukh',
      email: 'rohan.deshmukh@gmail.com',
      phone: '+91 98234 56789',
      studentClass: 'Class 12',
      subject: 'Enquiry for Class 12 Board + JEE Target Chemistry Batch',
      message: 'Hello Ajay Sir, I am currently preparing for Class 12 Boards and JEE Main. I am facing difficulty with Organic reaction conversions and would like to join the Catalyst Center evening batch. Please share admission process and batch timings.',
      date: '2026-08-16T18:45:00Z',
      isRead: false,
      isArchived: false,
      replyStatus: 'Pending'
    },
    {
      id: 'msg-2',
      name: 'Pooja Agarwal (Parent)',
      email: 'pooja.agarwal@outlook.com',
      phone: '+91 98111 22334',
      studentClass: 'Class 11',
      subject: 'Weekend Foundation Chemistry Batch at Apex Academy',
      message: 'Respected Sir, My daughter has just entered Class 11 and wants strong foundation in Chemistry right from the start. We heard excellent recommendations about your conceptual teaching methodology. Can we meet this Saturday at Apex Academy?',
      date: '2026-08-15T11:20:00Z',
      isRead: true,
      isArchived: false,
      replyStatus: 'Replied'
    }
  ]
};
