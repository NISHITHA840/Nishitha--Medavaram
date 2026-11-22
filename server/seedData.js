// Clean seed data for SQLite initialization
export const SEED_PROCEDURES = [
  {
    id: 'usg-abdomen',
    name: 'Ultrasound (USG) Whole Abdomen & Pelvis',
    code: 'USG-ABD-01',
    colloquialNames: [
      'stomach scan',
      'sonography',
      'pet ka scan',
      'pet ki sonography',
      'ultrasound abdomen',
      'kallu scan',
      'abdomen scanning',
      'pelvic ultrasound'
    ],
    category: 'diagnostic_imaging',
    description: 'High-frequency sound wave scan of stomach organs (liver, gallbladder, kidneys, pancreas, spleen, bladder). Non-invasive and safe with no radiation.',
    setting: 'OPD',
    typicalDuration: '20 - 30 minutes',
    preparationAdvice: 'Requires 6 to 8 hours of fasting (empty stomach) and a full bladder (drink 3-4 glasses of water 1 hour before scan).',
    isLowDataPilot: false,
    rates: {
      hyderabad: { cghsNabhRate: 645, cghsNonNabhRate: 548, pmjayPackageRate: 600, pmjayCode: 'DI001', govt: [0, 50], trust: [450, 750], mid: [1100, 1650], corp: [2200, 3400] },
      bengaluru: { cghsNabhRate: 690, cghsNonNabhRate: 585, pmjayPackageRate: 650, pmjayCode: 'DI001', govt: [0, 60], trust: [500, 800], mid: [1200, 1800], corp: [2400, 3600] },
      delhi: { cghsNabhRate: 645, cghsNonNabhRate: 548, pmjayPackageRate: 600, pmjayCode: 'DI001', govt: [0, 50], trust: [400, 700], mid: [1150, 1700], corp: [2500, 3800] },
      jaipur: { cghsNabhRate: 550, cghsNonNabhRate: 468, pmjayPackageRate: 500, pmjayCode: 'DI001', govt: [0, 40], trust: [380, 600], mid: [950, 1400], corp: [1900, 2900] },
      mumbai: { cghsNabhRate: 720, cghsNonNabhRate: 612, pmjayPackageRate: 680, pmjayCode: 'DI001', govt: [0, 60], trust: [550, 900], mid: [1350, 2100], corp: [2800, 4200] }
    },
    breakdown: [
      { category: 'Radiologist Consultation & Reporting', percentage: 45, govt: 0, private: 650, explanation: 'Expert certified radiologist scanning and digital clinical interpretation.' },
      { category: 'Equipment & Sonography Machine Usage', percentage: 35, govt: 0, private: 500, explanation: 'High-resolution Doppler transducer and calibrated imaging probe.' },
      { category: 'Consumables (Gel, Probe covers, Films/CD)', percentage: 20, govt: 30, private: 250, explanation: 'Medical ultrasound coupling gel, sanitized disposable paper, thermal photo film & printed reporting kit.' }
    ]
  },
  {
    id: 'mri-lumbar',
    name: 'MRI Lumbar Spine (Lower Back Scan)',
    code: 'MRI-LUMB-02',
    colloquialNames: [
      'mri lower back',
      'kamar ka mri',
      'back bone scan',
      'disc problem scan',
      'spine mri',
      'vertebra scan',
      'ridh ki haddi ka scan'
    ],
    category: 'diagnostic_imaging',
    description: 'High-definition 1.5T / 3.0T magnetic resonance imaging of lumbar vertebrae, intervertebral discs, nerve roots, and spinal canal.',
    setting: 'OPD',
    typicalDuration: '30 - 45 minutes',
    preparationAdvice: 'Remove all metallic objects, jewelry, watches, hearing aids, and dental clips. Inform staff if you have a cardiac pacemaker, aneurysm clips, or claustrophobia.',
    isLowDataPilot: false,
    rates: {
      hyderabad: { cghsNabhRate: 2500, cghsNonNabhRate: 2125, pmjayPackageRate: 2300, pmjayCode: 'DI025', govt: [0, 1500], trust: [2200, 3500], mid: [4500, 6800], corp: [7500, 11500] },
      bengaluru: { cghsNabhRate: 2700, cghsNonNabhRate: 2295, pmjayPackageRate: 2450, pmjayCode: 'DI025', govt: [0, 1600], trust: [2400, 3800], mid: [4800, 7200], corp: [8000, 12000] },
      delhi: { cghsNabhRate: 2500, cghsNonNabhRate: 2125, pmjayPackageRate: 2300, pmjayCode: 'DI025', govt: [0, 1500], trust: [2100, 3400], mid: [4600, 7000], corp: [7800, 12500] },
      jaipur: { cghsNabhRate: 2200, cghsNonNabhRate: 1870, pmjayPackageRate: 2000, pmjayCode: 'DI025', govt: [0, 1200], trust: [1900, 3000], mid: [3800, 5800], corp: [6500, 9800] },
      mumbai: { cghsNabhRate: 2800, cghsNonNabhRate: 2380, pmjayPackageRate: 2550, pmjayCode: 'DI025', govt: [0, 1800], trust: [2600, 4200], mid: [5200, 7800], corp: [8500, 13500] }
    },
    breakdown: [
      { category: 'MRI Superconducting Scanner Time', percentage: 50, govt: 1000, private: 3200, explanation: 'Liquid helium cooling, gradient coil and high-tesla RF pulse sequencing.' },
      { category: 'Senior Neuro-Radiologist Protocoling & Reporting', percentage: 35, govt: 0, private: 2200, explanation: 'Detailed T1, T2, STIR sequence multi-planar reconstruction and nerve root evaluation.' },
      { category: 'Films, PACS Cloud Archive & Reporting CD', percentage: 15, govt: 200, private: 900, explanation: 'High-contrast laser medical films and secure digital DICOM repository link.' }
    ]
  },
  {
    id: 'ct-chest',
    name: 'CT Scan Chest (HRCT Thorax Plain)',
    code: 'CT-CHEST-03',
    colloquialNames: ['chest ct scan', 'hrct chest', 'fephdo ka scan', 'lung scan', 'chest scan', 'cough ct scan'],
    category: 'diagnostic_imaging',
    description: 'High-resolution cross-sectional tomographic imaging of lungs, bronchial passages, pleura, and mediastinum for pneumonia, fibrosis, or nodules.',
    setting: 'OPD',
    typicalDuration: '10 - 15 minutes',
    preparationAdvice: 'Wear comfortable loose cotton clothing. Remove metallic necklaces or chest piercings. Fasting not required unless contrast agent is indicated.',
    isLowDataPilot: false,
    rates: {
      hyderabad: { cghsNabhRate: 1800, cghsNonNabhRate: 1530, pmjayPackageRate: 1650, pmjayCode: 'DI018', govt: [0, 800], trust: [1500, 2200], mid: [2800, 4200], corp: [4800, 7200] },
      bengaluru: { cghsNabhRate: 1950, cghsNonNabhRate: 1658, pmjayPackageRate: 1750, pmjayCode: 'DI018', govt: [0, 850], trust: [1600, 2400], mid: [3000, 4500], corp: [5000, 7500] },
      delhi: { cghsNabhRate: 1800, cghsNonNabhRate: 1530, pmjayPackageRate: 1650, pmjayCode: 'DI018', govt: [0, 800], trust: [1400, 2100], mid: [2700, 4100], corp: [4700, 7000] },
      jaipur: { cghsNabhRate: 1550, cghsNonNabhRate: 1318, pmjayPackageRate: 1400, pmjayCode: 'DI018', govt: [0, 650], trust: [1200, 1800], mid: [2300, 3500], corp: [3900, 5800] },
      mumbai: { cghsNabhRate: 2000, cghsNonNabhRate: 1700, pmjayPackageRate: 1850, pmjayCode: 'DI018', govt: [0, 950], trust: [1750, 2600], mid: [3200, 4800], corp: [5400, 8000] }
    },
    breakdown: [
      { category: 'Multi-slice CT Scanner & Detector Operations', percentage: 45, govt: 500, private: 1600, explanation: 'Low-dose radiation multi-detector spiral gantry time.' },
      { category: 'Radiologist High-Resolution Lung Reconstruction', percentage: 40, govt: 0, private: 1400, explanation: 'Parenchymal evaluation, CORADS / severity score documentation.' },
      { category: 'Printed Films & Digital Report Copy', percentage: 15, govt: 100, private: 500, explanation: 'Digital storage and physical cross-sectional multi-window plates.' }
    ]
  },
  {
    id: 'cataract-phaco',
    name: 'Cataract Surgery (Phacoemulsification with Foldable Monofocal IOL)',
    code: 'SURG-CAT-04',
    colloquialNames: ['cataract operation', 'motiyabind operation', 'motiya bindu', 'eye lens surgery', 'kanla operation', 'phaco eye surgery'],
    category: 'daycare_procedure',
    description: 'Micro-incision ultrasound breakdown of cloudy natural eye lens followed by implantation of an artificial biocompatible foldable intraocular lens (IOL). Done under local/topical anesthesia.',
    setting: 'Daycare',
    typicalDuration: '15 - 25 minutes (Daycare stay: 2-3 hours)',
    preparationAdvice: 'Use prescribed antibiotic drops 1 day prior. Fasting of 3 hours before surgery. Arrange for an accompanying family member to assist in traveling back.',
    isLowDataPilot: false,
    rates: {
      hyderabad: { cghsNabhRate: 10500, cghsNonNabhRate: 8925, pmjayPackageRate: 10000, pmjayCode: 'OP004', govt: [0, 500], trust: [4500, 9000], mid: [18000, 28000], corp: [38000, 62000] },
      bengaluru: { cghsNabhRate: 11200, cghsNonNabhRate: 9520, pmjayPackageRate: 10500, pmjayCode: 'OP004', govt: [0, 600], trust: [5000, 9500], mid: [20000, 31000], corp: [42000, 68000] },
      delhi: { cghsNabhRate: 10500, cghsNonNabhRate: 8925, pmjayPackageRate: 10000, pmjayCode: 'OP004', govt: [0, 500], trust: [4200, 8800], mid: [19000, 29000], corp: [40000, 65000] },
      jaipur: { cghsNabhRate: 9200, cghsNonNabhRate: 7820, pmjayPackageRate: 9000, pmjayCode: 'OP004', govt: [0, 400], trust: [3800, 7500], mid: [15000, 23000], corp: [32000, 50000] },
      mumbai: { cghsNabhRate: 11800, cghsNonNabhRate: 10030, pmjayPackageRate: 11000, pmjayCode: 'OP004', govt: [0, 700], trust: [5500, 10500], mid: [22000, 34000], corp: [45000, 75000] }
    },
    breakdown: [
      { category: 'Intraocular Lens (Foldable Monofocal Hydrophobic IOL)', percentage: 35, govt: 0, private: 7500, explanation: 'Standard certified Indian/US-FDA approved biocompatible artificial lens.' },
      { category: 'Ophthalmic Surgeon & OT Consumables (Viscoelastic, blade, tubing)', percentage: 40, govt: 0, private: 9000, explanation: 'Specialized sterile phaco pack, micro-incisional keratome blades & surgeon operating charges.' },
      { category: 'Daycare Bed, Post-op Drops & Shield kit', percentage: 25, govt: 100, private: 4500, explanation: 'Day recovery recliner, sterilization protocol, protective dark glasses & post-op drop regimen.' }
    ]
  },
  {
    id: 'cbc-lipid-lft',
    name: 'Comprehensive Health Panel (CBC + Lipid Profile + LFT + KFT)',
    code: 'LAB-PANEL-05',
    colloquialNames: ['blood test package', 'full blood test', 'cholesterol liver kidney test', 'khoon ki jaanch', 'routine blood test'],
    category: 'pathology_lab',
    description: 'Routine blood examination covering Hemoglobin & Complete Hemogram (CBC), Cholesterol & Triglycerides (Lipid), Liver Function Enzymes (LFT), and Kidney Function & Creatinine (KFT).',
    setting: 'OPD',
    typicalDuration: 'Sample collection: 5 mins (Results: same day 4-6 hours)',
    preparationAdvice: 'Mandatory 10 to 12 hours overnight fasting. Water intake is allowed and encouraged to facilitate easy venous blood draw.',
    isLowDataPilot: false,
    rates: {
      hyderabad: { cghsNabhRate: 480, cghsNonNabhRate: 408, pmjayPackageRate: 450, pmjayCode: 'LB012', govt: [0, 40], trust: [300, 500], mid: [800, 1300], corp: [1600, 2600] },
      bengaluru: { cghsNabhRate: 510, cghsNonNabhRate: 434, pmjayPackageRate: 480, pmjayCode: 'LB012', govt: [0, 50], trust: [350, 550], mid: [850, 1400], corp: [1750, 2800] },
      delhi: { cghsNabhRate: 480, cghsNonNabhRate: 408, pmjayPackageRate: 450, pmjayCode: 'LB012', govt: [0, 40], trust: [280, 480], mid: [780, 1300], corp: [1650, 2700] },
      jaipur: { cghsNabhRate: 410, cghsNonNabhRate: 349, pmjayPackageRate: 390, pmjayCode: 'LB012', govt: [0, 30], trust: [250, 420], mid: [650, 1100], corp: [1400, 2200] },
      mumbai: { cghsNabhRate: 530, cghsNonNabhRate: 451, pmjayPackageRate: 500, pmjayCode: 'LB012', govt: [0, 50], trust: [380, 600], mid: [950, 1550], corp: [1900, 3100] }
    },
    breakdown: [
      { category: 'Automated Biochemical Analyzer Reagents', percentage: 45, govt: 0, private: 450, explanation: 'Enzymatic reagents, lipid calibration standards, and hematology lysing reagents.' },
      { category: 'Pathologist Verification & Differential Review', percentage: 35, govt: 0, private: 350, explanation: 'MD Pathologist manual microscopic smear verification and quality control clearance.' },
      { category: 'Sterile Vacutainer Tubes, Phlebotomy & Digital Reporting', percentage: 20, govt: 20, private: 200, explanation: 'K2-EDTA and Gel-clot activator tubes, safety butterfly needle, and WhatsApp/SMS PDF report.' }
    ]
  },
  {
    id: 'dialysis-session',
    name: 'Hemodialysis (Single Outpatient Session)',
    code: 'PROC-DIAL-06',
    colloquialNames: ['kidney dialysis', 'dialysis per session', 'gurda dialysis', 'blood filter dialysis', 'renal dialysis'],
    category: 'daycare_procedure',
    description: 'Extracorporeal blood purification session using an artificial kidney (dialyzer machine) to remove urea, creatinine, excess fluid, and balance electrolytes for renal failure patients.',
    setting: 'Daycare',
    typicalDuration: '3.5 - 4 hours per session',
    preparationAdvice: 'Check weight prior to sitting. Keep AV fistula arm clean. Adhere strictly to dry-weight protocol and bring past dialysis record book.',
    isLowDataPilot: false,
    rates: {
      hyderabad: { cghsNabhRate: 1100, cghsNonNabhRate: 935, pmjayPackageRate: 1500, pmjayCode: 'NE001', govt: [0, 0], trust: [600, 950], mid: [1600, 2300], corp: [2800, 4200] },
      bengaluru: { cghsNabhRate: 1180, cghsNonNabhRate: 1003, pmjayPackageRate: 1550, pmjayCode: 'NE001', govt: [0, 100], trust: [700, 1050], mid: [1750, 2500], corp: [3000, 4500] },
      delhi: { cghsNabhRate: 1100, cghsNonNabhRate: 935, pmjayPackageRate: 1500, pmjayCode: 'NE001', govt: [0, 50], trust: [650, 1000], mid: [1700, 2400], corp: [2900, 4400] },
      jaipur: { cghsNabhRate: 980, cghsNonNabhRate: 833, pmjayPackageRate: 1350, pmjayCode: 'NE001', govt: [0, 0], trust: [550, 850], mid: [1400, 2000], corp: [2400, 3600] },
      mumbai: { cghsNabhRate: 1250, cghsNonNabhRate: 1063, pmjayPackageRate: 1650, pmjayCode: 'NE001', govt: [0, 100], trust: [750, 1150], mid: [1900, 2700], corp: [3200, 4800] }
    },
    breakdown: [
      { category: 'Dialyzer Filter, Blood Tubing & Acid/Bicarb Concentrate', percentage: 50, govt: 0, private: 900, explanation: 'Single-use or sanitized re-use dialyzer cartridge, heparin anticoagulant & RO purified water.' },
      { category: 'Hemodialysis Technician & Nephrologist Monitoring', percentage: 35, govt: 0, private: 650, explanation: 'Fistula needle cannulation, continuous vital signs monitoring, and emergency nephrologist cover.' },
      { category: 'Dialysis Bed / Recliner & Biomedical Waste Management', percentage: 15, govt: 50, private: 300, explanation: 'Comfortable sanitized recliner, sterile linens, and infectious bio-hazard disposal.' }
    ]
  },
  {
    id: 'normal-delivery',
    name: 'Normal Vaginal Delivery (Standard Maternal Care)',
    code: 'MAT-DEL-07',
    colloquialNames: ['normal delivery', 'prashuti', 'bachha paida hone ka kharcha', 'delivery hospital cost', 'maternity normal'],
    category: 'inpatient_surgery',
    description: 'Full-term uncomplicated spontaneous vaginal delivery including intrapartum fetal monitoring, episiotomy/perineal repair if needed, newborn APGAR care, pediatrician examination, and 24-48 hours postpartum hospital room.',
    setting: '1-2 Days Admission',
    typicalDuration: '1 to 2 days hospital stay',
    preparationAdvice: 'Carry all ante-natal checkup files, ultrasound records, blood group report, Mother-Child Protection (MCP) card, and baby clothing.',
    isLowDataPilot: false,
    rates: {
      hyderabad: { cghsNabhRate: 12000, cghsNonNabhRate: 10200, pmjayPackageRate: 9000, pmjayCode: 'OB001', govt: [0, 300], trust: [8000, 15000], mid: [24000, 38000], corp: [52000, 85000] },
      bengaluru: { cghsNabhRate: 13000, cghsNonNabhRate: 11050, pmjayPackageRate: 9500, pmjayCode: 'OB001', govt: [0, 400], trust: [9000, 16500], mid: [26000, 42000], corp: [56000, 92000] },
      delhi: { cghsNabhRate: 12000, cghsNonNabhRate: 10200, pmjayPackageRate: 9000, pmjayCode: 'OB001', govt: [0, 350], trust: [8500, 15500], mid: [25000, 40000], corp: [54000, 88000] },
      jaipur: { cghsNabhRate: 10500, cghsNonNabhRate: 8925, pmjayPackageRate: 8200, pmjayCode: 'OB001', govt: [0, 250], trust: [7000, 13000], mid: [20000, 32000], corp: [42000, 68000] },
      mumbai: { cghsNabhRate: 13800, cghsNonNabhRate: 11730, pmjayPackageRate: 10000, pmjayCode: 'OB001', govt: [0, 500], trust: [10000, 18500], mid: [29000, 48000], corp: [62000, 105000] }
    },
    breakdown: [
      { category: 'Obstetrician & Labor Room Delivery Nursing', percentage: 40, govt: 0, private: 12000, explanation: 'Consultant obstetrician delivery charges, labor room monitoring, and episiotomy suturing.' },
      { category: 'Maternity Room & Postpartum Stay (Twin-sharing / Semi-private)', percentage: 35, govt: 0, private: 9000, explanation: '2 days in-patient room, nursing round-the-clock observation, maternal diet & hygiene.' },
      { category: 'Pediatrician Newborn Resuscitation & Initial Vaccinations', percentage: 25, govt: 50, private: 6000, explanation: 'Newborn care, Vitamin K1 injection, Hepatitis-B & BCG vaccination, and blood group test.' }
    ]
  },
  {
    id: 'lap-cholecystectomy',
    name: 'Laparoscopic Cholecystectomy (Gallbladder Stone Removal)',
    code: 'SURG-LAP-08',
    colloquialNames: ['gallbladder stone surgery', 'pathari operation', 'pitte ki pathari', 'gall bladder operation', 'durbin se surgery'],
    category: 'inpatient_surgery',
    description: 'Minimally invasive keyhole laparoscopic removal of the gallbladder (cholecystectomy) through 3-4 tiny ports under general anesthesia.',
    setting: '1-2 Days Admission',
    typicalDuration: '45 - 75 minutes (Hospital stay: 1 to 2 days)',
    preparationAdvice: 'Fasting from midnight (8 hours minimum). Pre-anesthetic checkup (PAC) including ECG, chest X-ray and blood clotting profile required.',
    isLowDataPilot: false,
    rates: {
      hyderabad: { cghsNabhRate: 22000, cghsNonNabhRate: 18700, pmjayPackageRate: 19500, pmjayCode: 'GS014', govt: [0, 1500], trust: [16000, 26000], mid: [42000, 62000], corp: [82000, 135000] },
      bengaluru: { cghsNabhRate: 23500, cghsNonNabhRate: 19975, pmjayPackageRate: 20500, pmjayCode: 'GS014', govt: [0, 1600], trust: [18000, 28000], mid: [45000, 66000], corp: [88000, 145000] },
      delhi: { cghsNabhRate: 22000, cghsNonNabhRate: 18700, pmjayPackageRate: 19500, pmjayCode: 'GS014', govt: [0, 1500], trust: [16500, 26500], mid: [43000, 63000], corp: [85000, 140000] },
      jaipur: { cghsNabhRate: 19500, cghsNonNabhRate: 16575, pmjayPackageRate: 17500, pmjayCode: 'GS014', govt: [0, 1200], trust: [14000, 22000], mid: [35000, 52000], corp: [68000, 110000] },
      mumbai: { cghsNabhRate: 24500, cghsNonNabhRate: 20825, pmjayPackageRate: 21500, pmjayCode: 'GS014', govt: [0, 1800], trust: [19500, 31000], mid: [49000, 72000], corp: [95000, 160000] }
    },
    breakdown: [
      { category: 'Laparoscopic Surgical Team & Anesthetist Charges', percentage: 42, govt: 0, private: 19000, explanation: 'Consultant laparoscopic general surgeon, assistant surgeon, and senior consultant anesthetist.' },
      { category: 'Operation Theatre, HD Tower & Laparoscopic Clip Disposables', percentage: 38, govt: 1200, private: 17000, explanation: 'CO2 insufflation, harmonic scalpel / bipolar energy device, titanium clips & trocars.' },
      { category: 'Inpatient Hospital Bed, IV Antibiotics & Post-op Recovery', percentage: 20, govt: 300, private: 9000, explanation: '2 days room tariff, nursing vigilance, IV analgesics and sterile wound dressings.' }
    ]
  },
  {
    id: 'polysomnography-sleep',
    name: 'Overnight Polysomnography (Level 1 Comprehensive Sleep Apnea Study)',
    code: 'TEST-SLEEP-09',
    colloquialNames: ['sleep study', 'sleep apnea test', 'kharrate ki jaanch', 'snoring test', 'polysomnogram'],
    category: 'diagnostic_imaging',
    description: 'Specialized overnight diagnostic sleep investigation recording brain waves (EEG), blood oxygen saturation (SpO2), heart rate, airflow, and chest movements to diagnose obstructive sleep apnea.',
    setting: '1-2 Days Admission',
    typicalDuration: 'Overnight in sleep laboratory (8 - 10 hours)',
    preparationAdvice: 'Avoid caffeine, sedatives, and daytime naps on the test day. Wash hair with mild shampoo and do not apply hair oils or gels before electrode placement.',
    isLowDataPilot: true,
    rates: {
      hyderabad: { cghsNabhRate: 4500, cghsNonNabhRate: 3825, pmjayPackageRate: 4000, pmjayCode: 'PU009', govt: [0, 1500], trust: [3800, 5500], mid: [8500, 13000], corp: [16000, 24000] },
      bengaluru: { cghsNabhRate: 4800, cghsNonNabhRate: 4080, pmjayPackageRate: 4200, pmjayCode: 'PU009', govt: [0, 1600], trust: [4000, 6000], mid: [9000, 14000], corp: [17000, 26000] },
      delhi: { cghsNabhRate: 4500, cghsNonNabhRate: 3825, pmjayPackageRate: 4000, pmjayCode: 'PU009', govt: [0, 1500], trust: [3600, 5400], mid: [8500, 13500], corp: [16500, 25000] },
      jaipur: { cghsNabhRate: 3900, cghsNonNabhRate: 3315, pmjayPackageRate: 3500, pmjayCode: 'PU009', govt: [0, 1200], trust: [3200, 4800], mid: [7200, 11000], corp: [14000, 20000] },
      mumbai: { cghsNabhRate: 5000, cghsNonNabhRate: 4250, pmjayPackageRate: 4500, pmjayCode: 'PU009', govt: [0, 1800], trust: [4200, 6500], mid: [9800, 15500], corp: [18500, 28000] }
    },
    breakdown: [
      { category: 'Sleep Lab Room & Multi-channel Polygraph Sensors', percentage: 50, govt: 1200, private: 6000, explanation: 'Sound-proof monitored sleep suite, 16-channel EEG, EMG, ECG, thermistor & respiratory effort bands.' },
      { category: 'All-night Registered Sleep Technologist Monitoring', percentage: 30, govt: 0, private: 3600, explanation: 'Real-time observation of hypopnea, desaturations, and electrode calibration throughout the night.' },
      { category: 'Pulmonologist / Sleep Specialist Scoring & Report', percentage: 20, govt: 0, private: 2400, explanation: 'Scoring Apnea-Hypopnea Index (AHI), sleep staging architecture, and CPAP pressure titration.' }
    ]
  }
];

export const SEED_FACILITIES = [
  {
    id: 'hyd-osmania-govt',
    name: 'Osmania General Hospital & Medical College',
    type: 'govt',
    regionId: 'hyderabad',
    district: 'Hyderabad Urban',
    address: 'Afzal Gunj, High Court Road, Hyderabad, Telangana 500012',
    pincode: '500012',
    phone: '040-24600121',
    opdTimings: '08:30 AM - 01:00 PM (OPD), 24x7 Casualty',
    hasAyushmanDesk: true,
    hasEmergency24x7: true,
    hasFreeDiagnostics: true,
    schemesEmpaneled: ['PM-JAY', 'Aarogyasri', 'CGHS', 'ESIC'],
    qualityBadges: [{ id: 'PMJAY_Gold', label: 'PM-JAY Empaneled Apex Centre', authority: 'National Health Authority (NHA)', officialSourceUrl: 'https://hospitals.pmjay.gov.in', verifiedOn: '2026-08-15' }],
    lat: 17.3713,
    lng: 78.4739,
    verifiedCostNotes: 'Most outpatient diagnostic tests and generic medicines are provided free of cost or at nominal registration fee (₹10 - ₹50) under Telangana Aarogyasri Trust mandate.',
    procedureCostMultiplier: 0.05
  },
  {
    id: 'hyd-mahavir-trust',
    name: 'Bhagwan Mahavir Hospital & Research Centre',
    type: 'trust',
    regionId: 'hyderabad',
    district: 'Hyderabad Urban',
    address: '10-1-1, AC Guards, Mahavir Marg, Masab Tank, Hyderabad, Telangana 500004',
    pincode: '500004',
    phone: '040-23393134',
    opdTimings: '08:00 AM - 06:00 PM',
    hasAyushmanDesk: true,
    hasEmergency24x7: true,
    hasFreeDiagnostics: false,
    schemesEmpaneled: ['PM-JAY', 'Aarogyasri', 'CGHS'],
    qualityBadges: [{ id: 'NABH_Full', label: 'NABH Accredited Hospital', authority: 'National Accreditation Board for Hospitals & Healthcare Providers (NABH)', officialSourceUrl: 'https://nabh.co/accreditedhospitals.aspx', verifiedOn: '2026-06-20' }],
    lat: 17.4019,
    lng: 78.4552,
    verifiedCostNotes: 'Charitable trust hospital providing subsidized daycare, dialysis, and cataract care at near-cost tariffs for low & middle income families.',
    procedureCostMultiplier: 0.55
  },
  {
    id: 'hyd-vijaya-diag',
    name: 'Vijaya Diagnostic Centre (Central Hub)',
    type: 'private_mid',
    regionId: 'hyderabad',
    district: 'Hyderabad Urban',
    address: '3-6-16/1, Himayatnagar Main Road, Hyderabad, Telangana 500029',
    pincode: '500029',
    phone: '040-23420420',
    opdTimings: '07:00 AM - 09:00 PM (Labs), 24x7 Emergency Scans',
    hasAyushmanDesk: false,
    hasEmergency24x7: false,
    hasFreeDiagnostics: false,
    schemesEmpaneled: ['CGHS'],
    qualityBadges: [
      { id: 'NABL_Certified', label: 'NABL Accredited Medical Testing Lab', authority: 'National Accreditation Board for Testing and Calibration Laboratories (NABL)', officialSourceUrl: 'https://nabl-india.org/directory', verifiedOn: '2026-05-10' },
      { id: 'NABH_Full', label: 'NABH Certified Imaging Centre', authority: 'NABH MIS Portal', officialSourceUrl: 'https://nabh.co', verifiedOn: '2026-07-12' }
    ],
    lat: 17.3995,
    lng: 78.4831,
    verifiedCostNotes: 'CGHS empaneled rate card honored for central government beneficiaries. Fixed transparent rate list displayed in waiting hall.',
    procedureCostMultiplier: 0.95
  },
  {
    id: 'hyd-yashoda-corp',
    name: 'Yashoda Hospitals (Secunderabad Unit)',
    type: 'private_corp',
    regionId: 'hyderabad',
    district: 'Medchal-Malkajgiri',
    address: 'Alexander Road, Shivaji Nagar, Secunderabad, Telangana 500003',
    pincode: '500003',
    phone: '040-45674567',
    opdTimings: '08:00 AM - 08:00 PM (OPD), 24x7 Emergency',
    hasAyushmanDesk: true,
    hasEmergency24x7: true,
    hasFreeDiagnostics: false,
    schemesEmpaneled: ['Aarogyasri', 'PM-JAY', 'CGHS', 'ECHS'],
    qualityBadges: [
      { id: 'NABH_Full', label: 'NABH 5th Edition Accredited Tertiary Centre', authority: 'National Accreditation Board for Hospitals', officialSourceUrl: 'https://nabh.co', verifiedOn: '2026-09-01' },
      { id: 'NABL_Certified', label: 'NABL Certified Pathology Laboratory', authority: 'NABL Quality Council of India', officialSourceUrl: 'https://nabl-india.org', verifiedOn: '2026-04-18' }
    ],
    lat: 17.4428,
    lng: 78.4984,
    verifiedCostNotes: 'Tertiary corporate hospital. Cashless admission desk available for PM-JAY and Aarogyasri with designated Ayushman Mitra desk at Gate 2.',
    procedureCostMultiplier: 1.6
  },
  {
    id: 'hyd-sri-krishna-clinic',
    name: 'Sri Krishna Community Nursing & Diagnostic Home',
    type: 'private_mid',
    regionId: 'hyderabad',
    district: 'Rangareddy',
    address: 'Plot 45, Chandanagar Main Road, Serilingampally, Hyderabad, Telangana 500050',
    pincode: '500050',
    phone: '040-23034988',
    opdTimings: '09:00 AM - 08:30 PM',
    hasAyushmanDesk: false,
    hasEmergency24x7: false,
    hasFreeDiagnostics: false,
    schemesEmpaneled: [],
    qualityBadges: [],
    lat: 17.4938,
    lng: 78.3241,
    verifiedCostNotes: 'Neighborhood nursing home. Does not hold third-party NABH accreditation. Offers affordable local cash-pay rates.',
    procedureCostMultiplier: 0.85
  },
  {
    id: 'blr-victoria-govt',
    name: 'Victoria Hospital (Bangalore Medical College Campus)',
    type: 'govt',
    regionId: 'bengaluru',
    district: 'Bengaluru Urban',
    address: 'Fort Road, Near City Market, Kalasipalya, Bengaluru, Karnataka 560002',
    pincode: '560002',
    phone: '080-26701150',
    opdTimings: '08:30 AM - 01:30 PM (OPD), 24x7 Casualty',
    hasAyushmanDesk: true,
    hasEmergency24x7: true,
    hasFreeDiagnostics: true,
    schemesEmpaneled: ['PM-JAY', 'Arogya Karnataka (AB-ArK)', 'CGHS', 'ESIC'],
    qualityBadges: [{ id: 'PMJAY_Gold', label: 'Ayushman Bharat AB-ArK State Hub', authority: 'Suvarna Arogya Suraksha Trust (SAST)', officialSourceUrl: 'https://arogya.karnataka.gov.in', verifiedOn: '2026-07-15' }],
    lat: 12.9627,
    lng: 77.5753,
    verifiedCostNotes: 'Government tertiary apex hospital. Tests and daycare procedures free under BPL Arogya Karnataka card with Suvarna referral.',
    procedureCostMultiplier: 0.05
  },
  {
    id: 'del-safdarjung-govt',
    name: 'Vardhman Mahavir Medical College & Safdarjung Hospital',
    type: 'govt',
    regionId: 'delhi',
    district: 'South Delhi',
    address: 'Ring Road, Opposite AIIMS, Ansari Nagar West, New Delhi, Delhi 110029',
    pincode: '110029',
    phone: '011-26165060',
    opdTimings: '08:00 AM - 01:00 PM (OPD), 24x7 Emergency',
    hasAyushmanDesk: true,
    hasEmergency24x7: true,
    hasFreeDiagnostics: true,
    schemesEmpaneled: ['PM-JAY', 'CGHS', 'Delhi Arogya Kosh (DAK)'],
    qualityBadges: [{ id: 'PMJAY_Gold', label: 'Central Govt Super Specialty Apex Centre', authority: 'Ministry of Health & Family Welfare', officialSourceUrl: 'https://mohfw.gov.in', verifiedOn: '2026-06-15' }],
    lat: 28.5684,
    lng: 77.2069,
    verifiedCostNotes: 'Central government institution. Outpatient consultations, imaging, pathology, and institutional deliveries are completely free under MoHFW guidelines.',
    procedureCostMultiplier: 0.05
  }
];

export const SEED_SCHEMES = [
  {
    id: 'pmjay-central',
    name: 'Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    codeName: 'PM-JAY',
    sponsor: 'Central',
    coverageAmount: 500000,
    description: 'Flagship national health protection scheme providing ₹5,00,000 annual secondary and tertiary hospitalization cover per family for bottom 40% vulnerable households.',
    criteria: {
      incomeLimitAnnual: 180000,
      acceptedRationCards: ['BPL', 'AAY', 'PHH', 'White_Card'],
      vulnerableGroups: ['Informal Worker', 'BOCW Construction', 'Farmer (PM-KISAN)', 'Street Vendor', 'Senior Citizen 70+'],
      domicileRequired: false
    },
    benefitsList: [
      'Cashless in-patient treatment up to ₹5 Lakhs per family per year.',
      'Covers 1,949 medical packages across public and empaneled private hospitals nationwide.',
      'Pre-existing conditions covered from Day 1.',
      'Senior citizens aged 70+ now receive a dedicated Ayushman Vay Vandana card with separate top-up coverage.'
    ],
    documentChecklist: [
      'Ration Card (NFSA Antyodaya Anna Yojana AAY or Priority Household PHH / BPL Card)',
      'Government Photo ID (Aadhaar / Voter ID / Ration Card photo for kiosk verification)',
      'Active mobile number to receive OTP at Ayushman Mitra counter'
    ],
    officialHelpline: '14555 (Toll-Free National) / 1800-111-565',
    officialPortalUrl: 'https://mera.pmjay.gov.in',
    nearestEnquiryPoint: 'Ayushman Mitra Helpdesk at any Government District Hospital or Common Service Centre (CSC) VLE kiosk in your Gram Panchayat.'
  },
  {
    id: 'aarogyasri-ts',
    name: 'Telangana Aarogyasri Health Care Scheme',
    codeName: 'Aarogyasri-TS',
    sponsor: 'State',
    regionId: 'hyderabad',
    coverageAmount: 1000000,
    description: 'Telangana state government scheme providing end-to-end cashless coverage up to ₹10,00,000 per family per year for catastrophic illnesses and identified surgical therapies.',
    criteria: {
      incomeLimitAnnual: 250000,
      acceptedRationCards: ['White_Card', 'BPL', 'AAY', 'PHH'],
      vulnerableGroups: ['Informal Worker', 'BOCW Construction', 'Farmer (PM-KISAN)', 'Street Vendor', 'Disabled'],
      domicileRequired: true
    },
    benefitsList: [
      'Cashless hospitalization coverage enhanced up to ₹10,00,000 per BPL family.',
      'Over 1,672 identified surgical and medical procedures covered without copay.',
      'Cashless outpatient dialysis and chemotherapy sessions in network hospitals.'
    ],
    documentChecklist: [
      'Telangana Food Security White Card (Civil Supplies Department FSC Card)',
      'Aadhaar Card for patient identity verification at Aarogya Mithra kiosk',
      'Doctor referral slip / outpatient case sheet from Government Hospital'
    ],
    officialHelpline: '104 (Toll-free Medical Helpline) / 1800-599-4455',
    officialPortalUrl: 'https://aarogyasri.telangana.gov.in',
    nearestEnquiryPoint: 'Aarogya Mithra helpdesk located at Gandhi Hospital, Osmania General Hospital, or network private hospitals.'
  }
];

export const SEED_BILLS = [
  {
    id: 'vault-seed-01',
    procedureId: 'usg-abdomen',
    procedureName: 'Ultrasound (USG) Whole Abdomen & Pelvis',
    regionId: 'hyderabad',
    district: 'Hyderabad Urban',
    facilityType: 'private_mid',
    facilityNameAnonymized: 'Diagnostic Centre, Himayatnagar',
    billedAmount: 1200,
    billDate: '2026-10-14',
    hasInsurance: 0,
    outOfPocketPaid: 1200,
    consentGiven: 1,
    redactedNotes: 'Scrubbed: Patient Name, Doctor Phone, Case No.',
    submittedAt: '2026-10-14T11:20:00Z'
  },
  {
    id: 'vault-seed-02',
    procedureId: 'usg-abdomen',
    procedureName: 'Ultrasound (USG) Whole Abdomen & Pelvis',
    regionId: 'hyderabad',
    district: 'Hyderabad Urban',
    facilityType: 'trust',
    facilityNameAnonymized: 'Charitable Hospital, Masab Tank',
    billedAmount: 600,
    billDate: '2026-10-18',
    hasInsurance: 0,
    outOfPocketPaid: 600,
    consentGiven: 1,
    redactedNotes: 'Scrubbed: Patient ID, OPD Token',
    submittedAt: '2026-10-18T14:45:00Z'
  },
  {
    id: 'vault-seed-03',
    procedureId: 'cataract-phaco',
    procedureName: 'Cataract Surgery (Phacoemulsification with Foldable Monofocal IOL)',
    regionId: 'hyderabad',
    district: 'Hyderabad Urban',
    facilityType: 'private_mid',
    facilityNameAnonymized: 'Eye Care Specialty, Somajiguda',
    billedAmount: 22000,
    billDate: '2026-09-25',
    hasInsurance: 1,
    outOfPocketPaid: 4500,
    consentGiven: 1,
    redactedNotes: 'Scrubbed: Policy No, Patient Name, Room 204',
    submittedAt: '2026-09-25T16:10:00Z'
  },
  {
    id: 'vault-seed-04',
    procedureId: 'mri-lumbar',
    procedureName: 'MRI Lumbar Spine (Lower Back Scan)',
    regionId: 'hyderabad',
    district: 'Hyderabad Urban',
    facilityType: 'private_mid',
    facilityNameAnonymized: 'Scanning Centre, Nampally',
    billedAmount: 5200,
    billDate: '2026-10-02',
    hasInsurance: 0,
    outOfPocketPaid: 5200,
    consentGiven: 1,
    redactedNotes: 'Scrubbed: Name, Radiologist Mobile',
    submittedAt: '2026-10-02T10:15:00Z'
  },
  {
    id: 'vault-seed-05',
    procedureId: 'polysomnography-sleep',
    procedureName: 'Overnight Polysomnography (Sleep Apnea Study)',
    regionId: 'hyderabad',
    district: 'Hyderabad Urban',
    facilityType: 'private_mid',
    facilityNameAnonymized: 'Sleep Clinic, Banjara Hills',
    billedAmount: 11500,
    billDate: '2026-04-10',
    hasInsurance: 0,
    outOfPocketPaid: 11500,
    consentGiven: 1,
    redactedNotes: 'Scrubbed: Patient File, Sleep Lab Bed 2',
    submittedAt: '2026-04-10T09:30:00Z'
  },
  {
    id: 'vault-seed-06',
    procedureId: 'polysomnography-sleep',
    procedureName: 'Overnight Polysomnography (Sleep Apnea Study)',
    regionId: 'hyderabad',
    district: 'Hyderabad Urban',
    facilityType: 'private_corp',
    facilityNameAnonymized: 'Super Specialty Hospital, Somajiguda',
    billedAmount: 13000,
    billDate: '2026-04-12',
    hasInsurance: 0,
    outOfPocketPaid: 13000,
    consentGiven: 1,
    redactedNotes: 'Scrubbed: UHID, Consultant Name',
    submittedAt: '2026-04-12T14:10:00Z'
  }
];
