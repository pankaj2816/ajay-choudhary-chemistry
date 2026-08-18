import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

UPLOADS_DIR = r"d:\Work\Teacher_Website\public\uploads"
os.makedirs(UPLOADS_DIR, exist_ok=True)

PDF_METADATA = [
    {
        "filename": "organic_master_reaction_map.pdf",
        "title": "Organic Chemistry Master Reaction Roadmap",
        "subtitle": "Class 12 CBSE & JEE/NEET Revision Sheet",
        "chapter": "Haloalkanes, Alcohols, Aldehydes, Ketones & Amines",
        "content": [
            ("I. Alkane & Alkene Functional Group Interconversions",
             "1. Alkene + HBr (in presence of Peroxide) -> Anti-Markovnikov 1-Bromoalkane\n"
             "2. Alkene + HBr (no peroxide) -> Markovnikov 2-Bromoalkane (Carbocation intermediate)\n"
             "3. Alkene + cold dilute alkaline KMnO4 (Baeyer's Reagent) -> Vicinal Diols"),
            ("II. Oxidation Roadmaps (Alcohols to Carboxylic Acids)",
             "1. Primary Alcohol (R-CH2-OH) + PCC / CrO3 -> Aldehyde (R-CHO)\n"
             "2. Primary Alcohol + Alkaline KMnO4 / Acidified K2Cr2O7 -> Carboxylic Acid (R-COOH)\n"
             "3. Secondary Alcohol (R-CH(OH)-R') + CrO3 -> Ketone (R-CO-R')\n"
             "4. Tertiary Alcohol + Cu / 573 K -> Dehydration to Alkene (2-Methylpropene)"),
            ("III. Key Named Reaction Mechanism Summary",
             "• Aldol Condensation: Requires alpha-hydrogen, forms beta-hydroxyaldehyde.\n"
             "• Cannizzaro Reaction: Formaldehyde / Benzaldehyde (no alpha-H) + 50% NaOH -> Alcohol + Carboxylate.\n"
             "• Reimer-Tiemann Reaction: Phenol + CHCl3 + aq. NaOH -> Salicylaldehyde.\n"
             "• Kolbe's Reaction: Phenol + NaOH + CO2 (400 K, 4-7 atm) -> Salicylic Acid.")
        ]
    },
    {
        "filename": "goc_complete_notes_class11.pdf",
        "title": "General Organic Chemistry (GOC) Comprehensive Notes",
        "subtitle": "Class 11 Foundation & Advanced Electron Effects",
        "chapter": "Basic Principles and Techniques in Organic Chemistry",
        "content": [
            ("1. Electronic Displacement Effects",
             "• Inductive Effect (+I / -I): Permanent, sigma-bond polarization. Decreases rapidly with distance.\n"
             "  -I series: -NO2 > -CN > -COOH > -F > -Cl > -Br > -I > -OH > -NH2 > -C6H5 > -H\n"
             "  +I series: -O(-) > -COO(-) > -C(CH3)3 > -CH(CH3)2 > -CH2CH3 > -CH3 > -T > -D > -H"),
            ("2. Resonance & Mesomeric Effects",
             "• Delocalization of pi-electrons in conjugated systems.\n"
             "• +M groups (+R): -OH, -NH2, -OCH3, -Cl (ortho/para-directing in EAS).\n"
             "• -M groups (-R): -NO2, -CHO, -COOH, -SO3H (meta-directing, strongly deactivating)."),
            ("3. Reaction Intermediates & Stability Order",
             "• Carbocations (sp2, planar): Tropylium > Benzyl > Allyl > 3° > 2° > 1° > Methyl.\n"
             "• Carbanions (sp3, pyramidal): Methyl > 1° > 2° > 3° (stabilized by -I/-M groups).\n"
             "• Free Radicals (sp2/planar): 3° > 2° > 1° > Methyl (stabilized by hyperconjugation).")
        ]
    },
    {
        "filename": "coordination_compounds_handbook.pdf",
        "title": "Coordination Compounds Master Handbook",
        "subtitle": "Class 12 CBSE & JEE Advanced Special Edition",
        "chapter": "Coordination Chemistry & Crystal Field Theory",
        "content": [
            ("1. Werner's Coordination Theory & IUPAC Nomenclature",
             "• Primary Valency: Ionizable, corresponds to oxidation state of central metal ion.\n"
             "• Secondary Valency: Non-ionizable, corresponds to coordination number (geometry).\n"
             "• IUPAC Naming: Cation named first, anionic ligands end in -o (chlorido, cyanido)."),
            ("2. Valence Bond Theory vs Crystal Field Theory",
             "• Octahedral Splitting (Δo): d-orbitals split into lower t2g (dxy, dyz, dxz) and higher eg (dx2-y2, dz2).\n"
             "• Spectrochemical Series: I- < Br- < S2- < SCN- < Cl- < F- < OH- < C2O4(2-) < H2O < NCS- < EDTA(4-) < NH3 < en < CN- < CO\n"
             "• Strong field ligands (CN-, CO) cause large Δo (Δo > P), resulting in low-spin complexes (inner orbital d2sp3)."),
            ("3. Isomerism in Coordination Complexes",
             "• Geometrical Isomerism: [Pt(NH3)2Cl2] has cis-platin (anti-tumor agent) and trans-platin.\n"
             "• Optical Isomerism: [Co(en)3]3+ exhibits d- and l- enantiomers.")
        ]
    },
    {
        "filename": "salt_analysis_practical_manual.pdf",
        "title": "Qualitative Inorganic Salt Analysis Manual",
        "subtitle": "Complete Practical & Viva-Voce Guide (Group 0 to VI)",
        "chapter": "Class 11 & 12 Laboratory Practical Chemistry",
        "content": [
            ("1. Systematic Anion Identification",
             "• Dilute H2SO4 Group: Carbonate (CO2 effervescence with lime water), Sulphide (H2S rotten egg smell), Acetate (vinegar smell).\n"
             "• Concentrated H2SO4 Group: Chloride (pungent HCl gas, white fumes with NH4OH), Nitrate (Brown Ring Test [Fe(H2O)5(NO)]2+).\n"
             "• Independent Group: Sulphate (BaCl2 -> White BaSO4 ppt insoluble in conc. HCl)."),
            ("2. Systematic Cation Separation Scheme",
             "• Zero Group: NH4+ + NaOH -> NH3 gas (turns red litmus blue, Nessler's reagent -> brown ppt).\n"
             "• Group I: Pb2+ + Dil. HCl -> White PbCl2 precipitate (soluble in hot water).\n"
             "• Group II: Cu2+ + H2S in acidic medium -> Black CuS precipitate.\n"
             "• Group III: Fe3+, Al3+ + NH4Cl + NH4OH -> Reddish-brown Fe(OH)3 or gelatinous white Al(OH)3.\n"
             "• Group IV: Zn2+, Ni2+, Mn2+ + H2S in ammoniacal medium -> ZnS (dirty white), NiS (black).\n"
             "• Group V: Ba2+, Sr2+, Ca2+ + (NH4)2CO3 -> White carbonate precipitates (flame test confirmation).")
        ]
    },
    {
        "filename": "p_block_elements_notes.pdf",
        "title": "p-Block Elements Complete High-Yield Notes",
        "subtitle": "Group 15, 16, 17 and 18 Comprehensive Study Sheet",
        "chapter": "Inorganic Chemistry Class 12",
        "content": [
            ("1. Group 15 (Nitrogen Family)",
             "• Anomalous behavior of Nitrogen due to small size, high electronegativity, and absence of d-orbitals.\n"
             "• Oxides of Nitrogen: N2O (laughing gas, neutral), NO (neutral), NO2 (brown gas, acidic).\n"
             "• Haber's Process for Ammonia: N2 + 3H2 <-> 2NH3 (Fe catalyst, Mo promoter, 700 K, 200 atm)."),
            ("2. Group 16 & 17 Trends",
             "• Contact Process for H2SO4: V2O5 catalyst at 720 K and 2 bar pressure.\n"
             "• Anomalous behavior of Fluorine: Lower electron gain enthalpy than Chlorine due to interelectronic repulsions in small 2p orbital.\n"
             "• Oxoacids of Halogens & Bleaching action of Cl2 via oxidation.")
        ]
    },
    {
        "filename": "chemical_bonding_practice_worksheet.pdf",
        "title": "Chemical Bonding & Molecular Structure Worksheet",
        "subtitle": "VSEPR, Hybridization & Molecular Orbital Theory Drill",
        "chapter": "Class 11 Foundation & JEE/NEET Target",
        "content": [
            ("1. Hybridization & Geometry Problems",
             "• Calculate steric number for SF4 (sp3d, see-saw shape, 1 lone pair).\n"
             "• Calculate steric number for XeF4 (sp3d2, square planar shape, 2 lone pairs).\n"
             "• Predict bond angles in H2O (104.5°), NH3 (107°), and CH4 (109.5°) using VSEPR theory."),
            ("2. Molecular Orbital Theory (MOT) Applications",
             "• Oxygen Molecule (O2): Bond order = (10 - 6)/2 = 2. Paramagnetic due to 2 unpaired electrons in pi*(2px) and pi*(2py).\n"
             "• Nitrogen Molecule (N2): Bond order = (10 - 4)/2 = 3. Diamagnetic." )
        ]
    },
    {
        "filename": "physical_chemistry_formula_sheet.pdf",
        "title": "Physical Chemistry Master Formula Sheet",
        "subtitle": "Solutions, Electrochemistry, Kinetics & Thermodynamics",
        "chapter": "Class 11 & 12 Physical Chemistry Formula Handbook",
        "content": [
            ("1. Solutions & Colligative Properties",
             "• Raoult's Law: P_total = pA°*xA + pB°*xB\n"
             "• Relative Lowering of Vapour Pressure: (p° - p)/p° = i * x_solute\n"
             "• Elevation in Boiling Point: ΔTb = i * Kb * m\n"
             "• Depression in Freezing Point: ΔTf = i * Kf * m\n"
             "• Osmotic Pressure: π = i * C * R * T"),
            ("2. Electrochemistry & Chemical Kinetics",
             "• Nernst Equation: E_cell = E°_cell - (0.0591/n) * log(Q) at 298 K\n"
             "• Kohlrausch's Law: Λ°m = ν+ * λ°+ + ν- * λ°-\n"
             "• First Order Kinetics: k = (2.303/t) * log([A]0/[A]t), t_1/2 = 0.693/k\n"
             "• Arrhenius Equation: k = A * exp(-Ea / RT), log(k2/k1) = (Ea/2.303R) * (1/T1 - 1/T2)")
        ]
    },
    {
        "filename": "qp_organic_hydrocarbons_ut01.pdf",
        "title": "Unit Test 01: Hydrocarbons & Reaction Mechanisms",
        "subtitle": "Class 11 & 12 Chemistry Assessment (Max Marks: 40, Time: 90 Mins)",
        "chapter": "Organic Chemistry - Hydrocarbons & Alkyl Halides",
        "content": [
            ("Section A: Multiple Choice Questions (1 Mark Each)",
             "Q1. Which of the following carbocations is most stable?\n"
             "   (a) (CH3)3C(+)   (b) (CH3)2CH(+)   (c) CH3CH2(+)   (d) CH3(+)\n"
             "Q2. The ozonolysis of 2-butene followed by Zn/H2O gives:\n"
             "   (a) Methanal   (b) Ethanal   (c) Propanal   (d) Butanone"),
            ("Section B: Short Answer Questions (2-3 Marks Each)",
             "Q3. State and explain Markovnikov's rule with a suitable reaction mechanism of propene with HBr.\n"
             "Q4. How will you convert benzene to nitrobenzene and then to aniline? Give complete reagents and conditions.\n"
             "Q5. Explain hyperconjugation in propene and draw all possible no-bond resonance structures."),
            ("Section C: Long Answer Problem (5 Marks)",
             "Q6. An organic compound (A) with molecular formula C4H9Br on reaction with alcoholic KOH forms compound (B). Compound (B) on ozonolysis gives two moles of formaldehyde and one mole of acetone. Identify (A) and (B) and write all steps involved.")
        ]
    },
    {
        "filename": "sol_organic_hydrocarbons_ut01.pdf",
        "title": "Step-by-Step Solutions: Unit Test 01 Hydrocarbons",
        "subtitle": "Official Verified Marking Scheme by Ajay Choudhary Sir",
        "chapter": "Organic Chemistry - Model Solutions & Rubrics",
        "content": [
            ("Detailed Solutions & Marking Rubrics",
             "Ans 1. (a) (CH3)3C(+) - 3° Carbocation with 9 hyperconjugative alpha-hydrogens. [1 Mark]\n"
             "Ans 2. (b) Ethanal (CH3CHO) - Symmetrical cleavage at double bond. [1 Mark]\n"
             "Ans 3. Mechanism: Electrophilic addition of H(+) creates 2° carbocation intermediate (CH3-CH(+)-CH3), followed by fast nucleophilic attack of Br(-). [2 Marks]\n"
             "Ans 4. Step 1: Benzene + Conc. HNO3 + Conc. H2SO4 at 330 K -> Nitrobenzene. Step 2: Nitrobenzene + Sn/HCl (or Fe/HCl) -> Aniline. [3 Marks]\n"
             "Ans 6. Compound A is 1-Bromo-2-methylpropane / tert-Butyl bromide. Compound B is 2-Methylpropene (CH3)2C=CH2. Ozonolysis cleaves C=C giving acetone and formaldehyde. [5 Marks]")
        ]
    },
    {
        "filename": "qp_inorganic_coordination_compounds.pdf",
        "title": "Mid-Term Examination: Coordination Chemistry",
        "subtitle": "Class 12 Board & JEE Level Test (Max Marks: 50, Time: 2 Hours)",
        "chapter": "Inorganic Chemistry - Coordination Compounds",
        "content": [
            ("Section A: Conceptual & Objective Questions",
             "Q1. Write the IUPAC name of [Co(NH3)5(CO3)]Cl and [Pt(NH3)2Cl(NO2)].\n"
             "Q2. What is the magnetic behavior and hybridisation of [Ni(CN)4]2- and [NiCl4]2- on the basis of VBT?"),
            ("Section B: Analytical & Derivation Questions",
             "Q3. On the basis of Crystal Field Theory, write the electronic configuration of d4 in strong field (Δo > P) and weak field (Δo < P) octahedral complexes.\n"
             "Q4. Explain linkage isomerism, ionization isomerism, and coordination isomerism with one example each.\n"
             "Q5. Why is [Ti(H2O)6]3+ colored while [Sc(H2O)6]3+ is colorless? Explain on the basis of d-d transitions.")
        ]
    },
    {
        "filename": "sol_inorganic_coordination_compounds.pdf",
        "title": "Solutions & Marking Scheme: Coordination Chemistry",
        "subtitle": "Official Step-by-Step Marking Scheme by Ajay Choudhary Sir",
        "chapter": "Inorganic Chemistry Solutions",
        "content": [
            ("Marking Scheme & Model Answers",
             "Ans 1. Pentaamminecarbonatocobalt(III) chloride and Diamminechloridonitrito-N-platinum(II). [2 Marks]\n"
             "Ans 2. [Ni(CN)4]2-: CN- is strong field ligand, pairs 3d electrons -> dsp2 (Square planar, Diamagnetic).\n"
             "       [NiCl4]2-: Cl- is weak field ligand, no pairing -> sp3 (Tetrahedral, Paramagnetic with 2 unpaired electrons). [4 Marks]\n"
             "Ans 3. Weak field (Δo < P): t2g3 eg1. Strong field (Δo > P): t2g4 eg0. [3 Marks]\n"
             "Ans 5. Ti3+ has 3d1 configuration (single d-electron undergoes visible light excitation from t2g to eg). Sc3+ has 3d0 configuration with no d-electrons, hence colorless. [3 Marks]")
        ]
    },
    {
        "filename": "qp_aldehydes_ketones_mock.pdf",
        "title": "Board Mock Examination: Aldehydes, Ketones & Carboxylic Acids",
        "subtitle": "Class 12 CBSE Mock Test Series (Max Marks: 70)",
        "chapter": "Organic Chemistry - Carbonyl Compounds",
        "content": [
            ("Section A & B Questions",
             "Q1. How will you distinguish between Propanal and Propanone using a chemical test?\n"
             "Q2. Explain the mechanism of nucleophilic addition of HCN to ethanal.\n"
             "Q3. Give the chemical reactions for:\n"
             "    (a) Wolff-Kishner reduction of Acetophenone\n"
             "    (b) Hell-Volhard-Zelinsky (HVZ) reaction of Propanoic acid\n"
             "    (c) Rosenmund reduction of Benzoyl chloride"),
            ("Section C: Multi-Step Organic Synthesis",
             "Q4. Carry out the following conversions in not more than 2 steps:\n"
             "    (i) Bromobenzene to 1-Phenylethanol\n"
             "    (ii) Benzaldehyde to 3-Phenylprop-2-en-1-al (Cinnamaldehyde)")
        ]
    },
    {
        "filename": "sol_aldehydes_ketones_mock.pdf",
        "title": "Solutions & Scoring Rubrics: Aldehydes & Ketones Mock",
        "subtitle": "Complete Model Answers by Ajay Choudhary Sir",
        "chapter": "Class 12 Organic Chemistry Solutions",
        "content": [
            ("Official Model Solutions",
             "Ans 1. Tollen's Test: Propanal gives silver mirror with [Ag(NH3)2]+, Propanone does not. Alternatively, Iodoform test gives yellow CHI3 ppt with propanone but not propanal. [2 Marks]\n"
             "Ans 2. Step 1: CN(-) nucleophile attacks electrophilic carbonyl carbon (sp2 to sp3 tetrahedral alkoxide). Step 2: Protonation of alkoxide by HCN gives cyanohydrin. [3 Marks]\n"
             "Ans 3 (a): C6H5COCH3 + NH2NH2 -> Hydrazone -> (KOH/Ethylene glycol, heat) -> C6H5CH2CH3 (Ethylbenzene). [2 Marks]\n"
             "Ans 3 (b): CH3CH2COOH + Cl2/Red P -> CH3CH(Cl)COOH (2-Chloropropanoic acid). [2 Marks]\n"
             "Ans 3 (c): C6H5COCl + H2 (Pd/BaSO4, poisoned by quinoline/S) -> C6H5CHO (Benzaldehyde). [2 Marks]")
        ]
    },
    {
        "filename": "qp_practical_salt_analysis.pdf",
        "title": "Laboratory Practical Examination & Viva Question Paper",
        "subtitle": "CBSE Board Practical Chemistry (Max Marks: 30, Time: 3 Hours)",
        "chapter": "Practical Chemistry & Qualitative Analysis",
        "content": [
            ("Core Practical Experiments (30 Marks)",
             "Exercise 1 (8 Marks): Volumetric Analysis - Determine the molarity and strength of KMnO4 using standard M/20 Mohr's Salt solution.\n"
             "Exercise 2 (8 Marks): Qualitative Salt Analysis - Identify one cation and one anion in the given inorganic salt sample 'M-4'. Write systematic group separation and confirmatory tests.\n"
             "Exercise 3 (6 Marks): Content-based experiment (Chromatography / Preparation of Lyophilic sol).\n"
             "Exercise 4 (4 Marks): Practical Record Book & Project Report.\n"
             "Exercise 5 (4 Marks): Viva-Voce oral examination with external examiner.")
        ]
    },
    {
        "filename": "sol_practical_salt_analysis.pdf",
        "title": "Practical Chemistry Model Record & Viva Answers",
        "subtitle": "Step-by-Step Observation Tables & Top 25 Viva Questions",
        "chapter": "Practical Chemistry Solutions",
        "content": [
            ("Volumetric Calculations & Top Viva Voce Answers",
             "1. Calculation Formula: (M1 * V1)/n1 = (M2 * V2)/n2\n"
             "   Where n1 = 2 (for KMnO4) and n2 = 10 (for Mohr's Salt). Strength = Molarity * Molar Mass (158 g/mol).\n"
             "2. Why is dil. H2SO4 used instead of HCl or HNO3 in KMnO4 titrations?\n"
             "   Answer: HCl is oxidized by KMnO4 into Cl2 gas, giving higher titre value. HNO3 is itself a strong oxidizing agent. H2SO4 is stable and provides required acidic medium.\n"
             "3. What is the chemistry of the Brown Ring Test for Nitrate?\n"
             "   Answer: Nitrate is reduced to NO by Fe2+, which complexes with [Fe(H2O)6]2+ to form brown nitroso ferrous sulphate [Fe(H2O)5(NO)]2+.")
        ]
    },
    {
        "filename": "qp_jee_chemical_bonding.pdf",
        "title": "JEE Main & Advanced Test: Chemical Bonding",
        "subtitle": "Intensive Advanced Problem Set (Max Marks: 100)",
        "chapter": "Chemical Bonding & Advanced MOT",
        "content": [
            ("Section 1: Single Correct Option (+4, -1)",
             "Q1. The species having bond order equal to 2.5 and paramagnetic in nature is:\n"
             "    (a) NO   (b) O2(+)   (c) CN(-)   (d) Both (a) and (b)\n"
             "Q2. The correct order of dipole moments is:\n"
             "    (a) NH3 > NF3 > BF3   (b) NF3 > NH3 > BF3   (c) BF3 > NH3 > NF3   (d) NH3 > BF3 > NF3"),
            ("Section 2: Multi-Correct & Numerical Value Problems",
             "Q3. Among the following, which species have see-saw molecular geometry? (SF4, XeF4, ClF3, IOF3-)\n"
             "Q4. Total number of non-bonding lone pairs in XeOF4 is ______.")
        ]
    },
    {
        "filename": "sample_chemistry_notes.pdf",
        "title": "Comprehensive Chemistry Lecture Summary",
        "subtitle": "Ajay Choudhary Sir Classroom Notes",
        "chapter": "Physical, Organic & Inorganic Chemistry",
        "content": [
            ("Welcome to Ajay Choudhary Sir's Chemistry Classroom",
             "This verified study material contains essential concepts, key derivations, reaction mechanism pathways, and board exam tips.\n"
             "• 100% Concept-first methodology\n"
             "• Step-by-step problem solving\n"
             "• NCERT-aligned line-by-line coverage"),
            ("Study Tips from Ajay Sir",
             "1. Always write reaction mechanisms showing arrow pushes for electron transfer.\n"
             "2. Regularly revise the periodic trends and d-orbital splitting patterns.\n"
             "3. Practice numerical problems from Solutions and Electrochemistry with units.")
        ]
    },
    {
        "filename": "sample_question_paper.pdf",
        "title": "Master Chemistry Sample Question Paper",
        "subtitle": "Standard Examination Format for Class 11 & 12",
        "chapter": "All Units Chemistry Test",
        "content": [
            ("General Instructions",
             "1. All questions are compulsory.\n"
             "2. Section A has 16 MCQs of 1 mark each.\n"
             "3. Section B has 5 Short Answer questions of 2 marks each.\n"
             "4. Section C has 7 Short Answer questions of 3 marks each.\n"
             "5. Section D has 3 Long Answer questions of 5 marks each.")
        ]
    },
    {
        "filename": "sample_coordination_solution.pdf",
        "title": "Coordination Compounds Practice Solutions",
        "subtitle": "Model Answers & Step-by-Step Mark Breakdown",
        "chapter": "Class 12 Inorganic Chemistry",
        "content": [
            ("Coordination Solutions & Rules",
             "• Step-by-step oxidation state calculation.\n"
             "• Crystal Field splitting energy (CFSE) calculation for d1 to d10 ions.\n"
             "• Color prediction based on absorption spectra.")
        ]
    },
    {
        "filename": "sample_dpp_hydrocarbons.pdf",
        "title": "Daily Practice Problem (DPP): Hydrocarbons",
        "subtitle": "Daily Chemistry Practice Sheet (25 Problems)",
        "chapter": "Organic Chemistry Class 11 & 12",
        "content": [
            ("Practice Problem Set",
             "1. Electrophilic aromatic substitution mechanism on substituted benzenes.\n"
             "2. Preparation of alkanes via Wurtz reaction, Kolbe's electrolytic synthesis, and Corey-House synthesis.\n"
             "3. Acidity of terminal alkynes and test with Tollen's reagent.")
        ]
    },
    {
        "filename": "sample_organic_roadmap.pdf",
        "title": "Organic Synthesis Master Roadmap",
        "subtitle": "Complete Flowchart from Aliphatic to Aromatic Derivatives",
        "chapter": "Class 12 Organic Chemistry",
        "content": [
            ("Synthesis Pathways",
             "• Alkyl Halide -> Alcohol -> Aldehyde -> Carboxylic Acid -> Amide -> Amine\n"
             "• Benzene -> Nitrobenzene -> Aniline -> Diazonium Salt -> Phenol / Benzoic Acid / Chlorobenzene")
        ]
    },
    {
        "filename": "sample_salt_analysis_manual.pdf",
        "title": "Quick Salt Analysis Viva Guide",
        "subtitle": "Class 11 & 12 Laboratory Quick Reference",
        "chapter": "Practical Chemistry",
        "content": [
            ("Viva Voce High-Yield Flashcard Summary",
             "• Dry test, wet test, and confirmatory flame tests.\n"
             "• Group reagents and group precipitates summary for Group 0 through VI.")
        ]
    }
]

def generate_pdf(doc_info):
    file_path = os.path.join(UPLOADS_DIR, doc_info["filename"])
    doc = SimpleDocTemplate(file_path, pagesize=letter,
                            rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40)
    
    styles = getSampleStyleSheet()
    
    primary_color = colors.HexColor("#0891b2") # Cyan 600
    dark_color = colors.HexColor("#0f172a") # Slate 900
    sub_color = colors.HexColor("#334155") # Slate 700
    border_color = colors.HexColor("#cbd5e1") # Slate 300
    bg_color = colors.HexColor("#f8fafc") # Slate 50
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontSize=18,
        leading=22,
        textColor=dark_color,
        fontName='Helvetica-Bold',
        alignment=1 # Center
    )
    
    sub_style = ParagraphStyle(
        'DocSub',
        parent=styles['Normal'],
        fontSize=11,
        leading=14,
        textColor=primary_color,
        fontName='Helvetica-Bold',
        alignment=1
    )
    
    teacher_style = ParagraphStyle(
        'TeacherBanner',
        parent=styles['Normal'],
        fontSize=10,
        leading=13,
        textColor=sub_color,
        alignment=1
    )
    
    section_head_style = ParagraphStyle(
        'SectionHead',
        parent=styles['Heading2'],
        fontSize=12,
        leading=16,
        textColor=dark_color,
        fontName='Helvetica-Bold',
        spaceBefore=10,
        spaceAfter=4
    )
    
    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontSize=9.5,
        leading=14,
        textColor=sub_color,
        fontName='Helvetica'
    )
    
    story = []
    
    # Header Banner
    story.append(Paragraph(f"<b>AJAY CHOUDHARY SIR &bull; CHEMISTRY ACADEMY</b>", teacher_style))
    story.append(Paragraph(f"8+ Years Teaching Excellence &bull; Organic | Inorganic | Practical Chemistry", teacher_style))
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=2, color=primary_color, spaceBefore=2, spaceAfter=8))
    
    story.append(Paragraph(doc_info["title"], title_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph(doc_info["subtitle"], sub_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph(f"<b>Chapter / Focus Area:</b> {doc_info['chapter']}", teacher_style))
    story.append(Spacer(1, 10))
    story.append(HRFlowable(width="100%", thickness=1, color=border_color, spaceBefore=4, spaceAfter=12))
    
    # Sections
    for sec_title, sec_body in doc_info["content"]:
        story.append(Paragraph(sec_title, section_head_style))
        for line in sec_body.split('\n'):
            if line.strip():
                story.append(Paragraph(line, body_style))
                story.append(Spacer(1, 3))
        story.append(Spacer(1, 6))
        story.append(HRFlowable(width="100%", thickness=0.5, color=border_color, spaceBefore=4, spaceAfter=8))
        
    # Footer note
    story.append(Spacer(1, 10))
    footer_text = "<b>Official Verified Study Resource &bull; Mentored by Ajay Choudhary Sir</b><br/>Web: https://pankaj2816.github.io/ajay-choudhary-chemistry/ &bull; Contact: contact@ajaychemistry.com"
    story.append(Paragraph(footer_text, teacher_style))
    
    doc.build(story)
    print(f"Generated valid PDF: {doc_info['filename']} ({os.path.getsize(file_path)} bytes)")

def main():
    print(f"Generating {len(PDF_METADATA)} genuine, valid chemistry PDFs in {UPLOADS_DIR}...")
    for doc_info in PDF_METADATA:
        generate_pdf(doc_info)
    print("SUCCESS: All chemistry PDFs generated successfully!")

if __name__ == "__main__":
    main()
