import { MedicalProcedure } from '../types';

export const PROCEDURES: MedicalProcedure[] = [
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
    breakdown: [
      {
        category: 'Radiologist Consultation & Reporting',
        percentage: 45,
        typicalAmountGovt: 0,
        typicalAmountPrivate: 650,
        explanation: 'Expert certified radiologist scanning and digital clinical interpretation.'
      },
      {
        category: 'Equipment & Sonography Machine Usage',
        percentage: 35,
        typicalAmountGovt: 0,
        typicalAmountPrivate: 500,
        explanation: 'High-resolution Doppler transducer and calibrated imaging probe.'
      },
      {
        category: 'Consumables (Gel, Probe covers, Films/CD)',
        percentage: 20,
        typicalAmountGovt: 30,
        typicalAmountPrivate: 250,
        explanation: 'Medical ultrasound coupling gel, sanitized disposable paper, thermal photo film & printed reporting kit.'
      }
    ],
    ratesByRegion: {
      hyderabad: {
        cghsNabhRate: 645,
        cghsNonNabhRate: 548,
        pmjayPackageRate: 600,
        pmjayCode: 'DI001',
        govtHospitalRange: [0, 50],
        trustHospitalRange: [450, 750],
        privateMidRange: [1100, 1650],
        privateCorporateRange: [2200, 3400]
      },
      bengaluru: {
        cghsNabhRate: 690,
        cghsNonNabhRate: 585,
        pmjayPackageRate: 650,
        pmjayCode: 'DI001',
        govtHospitalRange: [0, 60],
        trustHospitalRange: [500, 800],
        privateMidRange: [1200, 1800],
        privateCorporateRange: [2400, 3600]
      },
      delhi: {
        cghsNabhRate: 645,
        cghsNonNabhRate: 548,
        pmjayPackageRate: 600,
        pmjayCode: 'DI001',
        govtHospitalRange: [0, 50],
        trustHospitalRange: [400, 700],
        privateMidRange: [1150, 1700],
        privateCorporateRange: [2500, 3800]
      },
      jaipur: {
        cghsNabhRate: 550,
        cghsNonNabhRate: 468,
        pmjayPackageRate: 500,
        pmjayCode: 'DI001',
        govtHospitalRange: [0, 40],
        trustHospitalRange: [380, 600],
        privateMidRange: [950, 1400],
        privateCorporateRange: [1900, 2900]
      },
      mumbai: {
        cghsNabhRate: 720,
        cghsNonNabhRate: 612,
        pmjayPackageRate: 680,
        pmjayCode: 'DI001',
        govtHospitalRange: [0, 60],
        trustHospitalRange: [550, 900],
        privateMidRange: [1350, 2100],
        privateCorporateRange: [2800, 4200]
      }
    },
    vaultStatsByRegion: {
      hyderabad: {
        sampleSize: 46,
        min: 550,
        median: 1250,
        p75: 1600,
        max: 3200,
        lastUpdated: '2026-10-18',
        dataSourceDescription: '46 crowdsourced bills from Secunderabad, Banjara Hills, Kukatpally, and Charminar clinics.',
        confidence: 'high'
      },
      bengaluru: {
        sampleSize: 38,
        min: 600,
        median: 1350,
        p75: 1750,
        max: 3500,
        lastUpdated: '2026-10-04',
        dataSourceDescription: '38 patient bills from Jayanagar, Whitefield, Malleshwaram & Koramangala.',
        confidence: 'high'
      },
      delhi: {
        sampleSize: 52,
        min: 500,
        median: 1300,
        p75: 1650,
        max: 3600,
        lastUpdated: '2026-11-01',
        dataSourceDescription: '52 patient receipts from AIIMS vicinity, Saket, Dwarka, and Rohini.',
        confidence: 'high'
      },
      jaipur: {
        sampleSize: 21,
        min: 450,
        median: 1050,
        p75: 1350,
        max: 2800,
        lastUpdated: '2026-09-22',
        dataSourceDescription: '21 crowdsourced bills from Malviya Nagar & Mansarovar.',
        confidence: 'moderate'
      },
      mumbai: {
        sampleSize: 34,
        min: 650,
        median: 1550,
        p75: 2000,
        max: 4100,
        lastUpdated: '2026-10-25',
        dataSourceDescription: '34 de-identified receipts from Dadar, Andheri West, and Thane.',
        confidence: 'high'
      }
    }
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
    breakdown: [
      {
        category: 'MRI Superconducting Scanner Time',
        percentage: 50,
        typicalAmountGovt: 1000,
        typicalAmountPrivate: 3200,
        explanation: 'Liquid helium cooling, gradient coil and high-tesla RF pulse sequencing.'
      },
      {
        category: 'Senior Neuro-Radiologist Protocoling & Reporting',
        percentage: 35,
        typicalAmountGovt: 0,
        typicalAmountPrivate: 2200,
        explanation: 'Detailed T1, T2, STIR sequence multi-planar reconstruction and nerve root evaluation.'
      },
      {
        category: 'Films, PACS Cloud Archive & Reporting CD',
        percentage: 15,
        typicalAmountGovt: 200,
        typicalAmountPrivate: 900,
        explanation: 'High-contrast laser medical films and secure digital DICOM repository link.'
      }
    ],
    ratesByRegion: {
      hyderabad: {
        cghsNabhRate: 2500,
        cghsNonNabhRate: 2125,
        pmjayPackageRate: 2300,
        pmjayCode: 'DI025',
        govtHospitalRange: [0, 1500],
        trustHospitalRange: [2200, 3500],
        privateMidRange: [4500, 6800],
        privateCorporateRange: [7500, 11500]
      },
      bengaluru: {
        cghsNabhRate: 2700,
        cghsNonNabhRate: 2295,
        pmjayPackageRate: 2450,
        pmjayCode: 'DI025',
        govtHospitalRange: [0, 1600],
        trustHospitalRange: [2400, 3800],
        privateMidRange: [4800, 7200],
        privateCorporateRange: [8000, 12000]
      },
      delhi: {
        cghsNabhRate: 2500,
        cghsNonNabhRate: 2125,
        pmjayPackageRate: 2300,
        pmjayCode: 'DI025',
        govtHospitalRange: [0, 1500],
        trustHospitalRange: [2100, 3400],
        privateMidRange: [4600, 7000],
        privateCorporateRange: [7800, 12500]
      },
      jaipur: {
        cghsNabhRate: 2200,
        cghsNonNabhRate: 1870,
        pmjayPackageRate: 2000,
        pmjayCode: 'DI025',
        govtHospitalRange: [0, 1200],
        trustHospitalRange: [1900, 3000],
        privateMidRange: [3800, 5800],
        privateCorporateRange: [6500, 9800]
      },
      mumbai: {
        cghsNabhRate: 2800,
        cghsNonNabhRate: 2380,
        pmjayPackageRate: 2550,
        pmjayCode: 'DI025',
        govtHospitalRange: [0, 1800],
        trustHospitalRange: [2600, 4200],
        privateMidRange: [5200, 7800],
        privateCorporateRange: [8500, 13500]
      }
    },
    vaultStatsByRegion: {
      hyderabad: {
        sampleSize: 28,
        min: 2400,
        median: 5400,
        p75: 6900,
        max: 11000,
        lastUpdated: '2026-10-12',
        dataSourceDescription: '28 MRI diagnostic receipts verified from Nampally, Somajiguda, and Gachibowli.',
        confidence: 'high'
      },
      bengaluru: {
        sampleSize: 22,
        min: 2600,
        median: 5800,
        p75: 7400,
        max: 11800,
        lastUpdated: '2026-09-28',
        dataSourceDescription: '22 verified patient bills from Rajajinagar and Indiranagar centers.',
        confidence: 'high'
      },
      delhi: {
        sampleSize: 31,
        min: 2300,
        median: 5500,
        p75: 7100,
        max: 12000,
        lastUpdated: '2026-10-20',
        dataSourceDescription: '31 bills from Delhi-NCR diagnostic centres under CGHS/Private.',
        confidence: 'high'
      },
      jaipur: {
        sampleSize: 14,
        min: 2100,
        median: 4600,
        p75: 5900,
        max: 9500,
        lastUpdated: '2026-08-30',
        dataSourceDescription: '14 crowdsourced bills from Jaipur medical zone.',
        confidence: 'moderate'
      },
      mumbai: {
        sampleSize: 20,
        min: 2800,
        median: 6200,
        p75: 7900,
        max: 13200,
        lastUpdated: '2026-10-19',
        dataSourceDescription: '20 crowdsourced bills across Mumbai Suburban and South Mumbai.',
        confidence: 'high'
      }
    }
  },
  {
    id: 'ct-chest',
    name: 'CT Scan Chest (HRCT Thorax Plain)',
    code: 'CT-CHEST-03',
    colloquialNames: [
      'chest ct scan',
      'hrct chest',
      'fephdo ka scan',
      'lung scan',
      'chest scan',
      'cough ct scan'
    ],
    category: 'diagnostic_imaging',
    description: 'High-resolution cross-sectional tomographic imaging of lungs, bronchial passages, pleura, and mediastinum for pneumonia, fibrosis, or nodules.',
    setting: 'OPD',
    typicalDuration: '10 - 15 minutes',
    preparationAdvice: 'Wear comfortable loose cotton clothing. Remove metallic necklaces or chest piercings. Fasting not required unless contrast agent is indicated.',
    breakdown: [
      {
        category: 'Multi-slice CT Scanner & Detector Operations',
        percentage: 45,
        typicalAmountGovt: 500,
        typicalAmountPrivate: 1600,
        explanation: 'Low-dose radiation multi-detector spiral gantry time.'
      },
      {
        category: 'Radiologist High-Resolution Lung Reconstruction',
        percentage: 40,
        typicalAmountGovt: 0,
        typicalAmountPrivate: 1400,
        explanation: 'Parenchymal evaluation, CORADS / severity score documentation.'
      },
      {
        category: 'Printed Films & Digital Report Copy',
        percentage: 15,
        typicalAmountGovt: 100,
        typicalAmountPrivate: 500,
        explanation: 'Digital storage and physical cross-sectional multi-window plates.'
      }
    ],
    ratesByRegion: {
      hyderabad: {
        cghsNabhRate: 1800,
        cghsNonNabhRate: 1530,
        pmjayPackageRate: 1650,
        pmjayCode: 'DI018',
        govtHospitalRange: [0, 800],
        trustHospitalRange: [1500, 2200],
        privateMidRange: [2800, 4200],
        privateCorporateRange: [4800, 7200]
      },
      bengaluru: {
        cghsNabhRate: 1950,
        cghsNonNabhRate: 1658,
        pmjayPackageRate: 1750,
        pmjayCode: 'DI018',
        govtHospitalRange: [0, 850],
        trustHospitalRange: [1600, 2400],
        privateMidRange: [3000, 4500],
        privateCorporateRange: [5000, 7500]
      },
      delhi: {
        cghsNabhRate: 1800,
        cghsNonNabhRate: 1530,
        pmjayPackageRate: 1650,
        pmjayCode: 'DI018',
        govtHospitalRange: [0, 800],
        trustHospitalRange: [1400, 2100],
        privateMidRange: [2700, 4100],
        privateCorporateRange: [4700, 7000]
      },
      jaipur: {
        cghsNabhRate: 1550,
        cghsNonNabhRate: 1318,
        pmjayPackageRate: 1400,
        pmjayCode: 'DI018',
        govtHospitalRange: [0, 650],
        trustHospitalRange: [1200, 1800],
        privateMidRange: [2300, 3500],
        privateCorporateRange: [3900, 5800]
      },
      mumbai: {
        cghsNabhRate: 2000,
        cghsNonNabhRate: 1700,
        pmjayPackageRate: 1850,
        pmjayCode: 'DI018',
        govtHospitalRange: [0, 950],
        trustHospitalRange: [1750, 2600],
        privateMidRange: [3200, 4800],
        privateCorporateRange: [5400, 8000]
      }
    },
    vaultStatsByRegion: {
      hyderabad: {
        sampleSize: 33,
        min: 1600,
        median: 3400,
        p75: 4300,
        max: 6800,
        lastUpdated: '2026-10-14',
        dataSourceDescription: '33 patient bills from Secunderabad, Dilsukhnagar, and Ameerpet.',
        confidence: 'high'
      },
      bengaluru: {
        sampleSize: 26,
        min: 1700,
        median: 3600,
        p75: 4600,
        max: 7200,
        lastUpdated: '2026-09-19',
        dataSourceDescription: '26 patient bills from Bangalore Central and East.',
        confidence: 'high'
      },
      delhi: {
        sampleSize: 37,
        min: 1500,
        median: 3300,
        p75: 4200,
        max: 6900,
        lastUpdated: '2026-10-29',
        dataSourceDescription: '37 bills from Delhi NCR diagnostic labs.',
        confidence: 'high'
      },
      jaipur: {
        sampleSize: 11,
        min: 1300,
        median: 2800,
        p75: 3600,
        max: 5600,
        lastUpdated: '2026-09-05',
        dataSourceDescription: '11 verified bills from Jaipur.',
        confidence: 'moderate'
      },
      mumbai: {
        sampleSize: 23,
        min: 1800,
        median: 3800,
        p75: 4900,
        max: 7600,
        lastUpdated: '2026-10-11',
        dataSourceDescription: '23 verified bills from Mumbai.',
        confidence: 'high'
      }
    }
  },
  {
    id: 'cataract-phaco',
    name: 'Cataract Surgery (Phacoemulsification with Foldable Monofocal IOL)',
    code: 'SURG-CAT-04',
    colloquialNames: [
      'cataract operation',
      'motiyabind operation',
      'motiya bindu',
      'eye lens surgery',
      'kanla operation',
      'motia bind op',
      'phaco eye surgery'
    ],
    category: 'daycare_procedure',
    description: 'Micro-incision ultrasound breakdown of cloudy natural eye lens followed by implantation of an artificial biocompatible foldable intraocular lens (IOL). Done under local/topical anesthesia.',
    setting: 'Daycare',
    typicalDuration: '15 - 25 minutes (Daycare stay: 2-3 hours)',
    preparationAdvice: 'Use prescribed antibiotic drops 1 day prior. Fasting of 3 hours before surgery. Arrange for an accompanying family member to assist in traveling back.',
    breakdown: [
      {
        category: 'Intraocular Lens (Foldable Monofocal Hydrophobic IOL)',
        percentage: 35,
        typicalAmountGovt: 0,
        typicalAmountPrivate: 7500,
        explanation: 'Standard certified Indian/US-FDA approved biocompatible artificial lens.'
      },
      {
        category: 'Ophthalmic Surgeon & OT Consumables (Viscoelastic, blade, tubing)',
        percentage: 40,
        typicalAmountGovt: 0,
        typicalAmountPrivate: 9000,
        explanation: 'Specialized sterile phaco pack, micro-incisional keratome blades & surgeon operating charges.'
      },
      {
        category: 'Daycare Bed, Post-op Drops & Shield kit',
        percentage: 25,
        typicalAmountGovt: 100,
        typicalAmountPrivate: 4500,
        explanation: 'Day recovery recliner, sterilization protocol, protective dark glasses & post-op drop regimen.'
      }
    ],
    ratesByRegion: {
      hyderabad: {
        cghsNabhRate: 10500,
        cghsNonNabhRate: 8925,
        pmjayPackageRate: 10000,
        pmjayCode: 'OP004',
        govtHospitalRange: [0, 500],
        trustHospitalRange: [4500, 9000],
        privateMidRange: [18000, 28000],
        privateCorporateRange: [38000, 62000]
      },
      bengaluru: {
        cghsNabhRate: 11200,
        cghsNonNabhRate: 9520,
        pmjayPackageRate: 10500,
        pmjayCode: 'OP004',
        govtHospitalRange: [0, 600],
        trustHospitalRange: [5000, 9500],
        privateMidRange: [20000, 31000],
        privateCorporateRange: [42000, 68000]
      },
      delhi: {
        cghsNabhRate: 10500,
        cghsNonNabhRate: 8925,
        pmjayPackageRate: 10000,
        pmjayCode: 'OP004',
        govtHospitalRange: [0, 500],
        trustHospitalRange: [4200, 8800],
        privateMidRange: [19000, 29000],
        privateCorporateRange: [40000, 65000]
      },
      jaipur: {
        cghsNabhRate: 9200,
        cghsNonNabhRate: 7820,
        pmjayPackageRate: 9000,
        pmjayCode: 'OP004',
        govtHospitalRange: [0, 400],
        trustHospitalRange: [3800, 7500],
        privateMidRange: [15000, 23000],
        privateCorporateRange: [32000, 50000]
      },
      mumbai: {
        cghsNabhRate: 11800,
        cghsNonNabhRate: 10030,
        pmjayPackageRate: 11000,
        pmjayCode: 'OP004',
        govtHospitalRange: [0, 700],
        trustHospitalRange: [5500, 10500],
        privateMidRange: [22000, 34000],
        privateCorporateRange: [45000, 75000]
      }
    },
    vaultStatsByRegion: {
      hyderabad: {
        sampleSize: 42,
        min: 4500,
        median: 22500,
        p75: 28000,
        max: 58000,
        lastUpdated: '2026-10-22',
        dataSourceDescription: '42 hospital final discharge slips from eye institutes in Hyderabad & Secunderabad.',
        confidence: 'high'
      },
      bengaluru: {
        sampleSize: 35,
        min: 5000,
        median: 24500,
        p75: 31000,
        max: 64000,
        lastUpdated: '2026-09-30',
        dataSourceDescription: '35 patient discharge bills from eye hospitals in Bengaluru.',
        confidence: 'high'
      },
      delhi: {
        sampleSize: 48,
        min: 4200,
        median: 23500,
        p75: 29500,
        max: 62000,
        lastUpdated: '2026-11-03',
        dataSourceDescription: '48 patient receipts from Delhi NCR eye centers.',
        confidence: 'high'
      },
      jaipur: {
        sampleSize: 18,
        min: 3800,
        median: 18500,
        p75: 23500,
        max: 48000,
        lastUpdated: '2026-08-25',
        dataSourceDescription: '18 bills from Jaipur eye hospitals.',
        confidence: 'moderate'
      },
      mumbai: {
        sampleSize: 29,
        min: 5500,
        median: 27000,
        p75: 34500,
        max: 72000,
        lastUpdated: '2026-10-18',
        dataSourceDescription: '29 hospital bills across Mumbai suburbs.',
        confidence: 'high'
      }
    }
  },
  {
    id: 'cbc-lipid-lft',
    name: 'Comprehensive Health Panel (CBC + Lipid Profile + LFT + KFT)',
    code: 'LAB-PANEL-05',
    colloquialNames: [
      'blood test package',
      'full blood test',
      'cholesterol liver kidney test',
      'khoon ki jaanch',
      'routine blood test',
      'executive health checkup tests'
    ],
    category: 'pathology_lab',
    description: 'Routine blood examination covering Hemoglobin & Complete Hemogram (CBC), Cholesterol & Triglycerides (Lipid), Liver Function Enzymes (LFT), and Kidney Function & Creatinine (KFT).',
    setting: 'OPD',
    typicalDuration: 'Sample collection: 5 mins (Results: same day 4-6 hours)',
    preparationAdvice: 'Mandatory 10 to 12 hours overnight fasting. Water intake is allowed and encouraged to facilitate easy venous blood draw.',
    breakdown: [
      {
        category: 'Automated Biochemical Analyzer Reagents',
        percentage: 45,
        typicalAmountGovt: 0,
        typicalAmountPrivate: 450,
        explanation: 'Enzymatic reagents, lipid calibration standards, and hematology lysing reagents.'
      },
      {
        category: 'Pathologist Verification & Differential Review',
        percentage: 35,
        typicalAmountGovt: 0,
        typicalAmountPrivate: 350,
        explanation: 'MD Pathologist manual microscopic smear verification and quality control clearance.'
      },
      {
        category: 'Sterile Vacutainer Tubes, Phlebotomy & Digital Reporting',
        percentage: 20,
        typicalAmountGovt: 20,
        typicalAmountPrivate: 200,
        explanation: 'K2-EDTA and Gel-clot activator tubes, safety butterfly needle, and WhatsApp/SMS PDF report.'
      }
    ],
    ratesByRegion: {
      hyderabad: {
        cghsNabhRate: 480,
        cghsNonNabhRate: 408,
        pmjayPackageRate: 450,
        pmjayCode: 'LB012',
        govtHospitalRange: [0, 40],
        trustHospitalRange: [300, 500],
        privateMidRange: [800, 1300],
        privateCorporateRange: [1600, 2600]
      },
      bengaluru: {
        cghsNabhRate: 510,
        cghsNonNabhRate: 434,
        pmjayPackageRate: 480,
        pmjayCode: 'LB012',
        govtHospitalRange: [0, 50],
        trustHospitalRange: [350, 550],
        privateMidRange: [850, 1400],
        privateCorporateRange: [1750, 2800]
      },
      delhi: {
        cghsNabhRate: 480,
        cghsNonNabhRate: 408,
        pmjayPackageRate: 450,
        pmjayCode: 'LB012',
        govtHospitalRange: [0, 40],
        trustHospitalRange: [280, 480],
        privateMidRange: [780, 1300],
        privateCorporateRange: [1650, 2700]
      },
      jaipur: {
        cghsNabhRate: 410,
        cghsNonNabhRate: 349,
        pmjayPackageRate: 390,
        pmjayCode: 'LB012',
        govtHospitalRange: [0, 30],
        trustHospitalRange: [250, 420],
        privateMidRange: [650, 1100],
        privateCorporateRange: [1400, 2200]
      },
      mumbai: {
        cghsNabhRate: 530,
        cghsNonNabhRate: 451,
        pmjayPackageRate: 500,
        pmjayCode: 'LB012',
        govtHospitalRange: [0, 50],
        trustHospitalRange: [380, 600],
        privateMidRange: [950, 1550],
        privateCorporateRange: [1900, 3100]
      }
    },
    vaultStatsByRegion: {
      hyderabad: {
        sampleSize: 64,
        min: 350,
        median: 950,
        p75: 1250,
        max: 2400,
        lastUpdated: '2026-11-05',
        dataSourceDescription: '64 diagnostic receipts collected from Hyderabad and Secunderabad.',
        confidence: 'high'
      },
      bengaluru: {
        sampleSize: 58,
        min: 400,
        median: 1050,
        p75: 1350,
        max: 2600,
        lastUpdated: '2026-10-27',
        dataSourceDescription: '58 receipts from laboratory networks across Bengaluru.',
        confidence: 'high'
      },
      delhi: {
        sampleSize: 72,
        min: 320,
        median: 900,
        p75: 1200,
        max: 2500,
        lastUpdated: '2026-11-10',
        dataSourceDescription: '72 lab receipts from South & West Delhi.',
        confidence: 'high'
      },
      jaipur: {
        sampleSize: 26,
        min: 280,
        median: 800,
        p75: 1050,
        max: 2100,
        lastUpdated: '2026-09-15',
        dataSourceDescription: '26 lab bills from Jaipur diagnostic centres.',
        confidence: 'moderate'
      },
      mumbai: {
        sampleSize: 45,
        min: 420,
        median: 1150,
        p75: 1450,
        max: 2900,
        lastUpdated: '2026-10-31',
        dataSourceDescription: '45 diagnostic bills across Mumbai metropolitan region.',
        confidence: 'high'
      }
    }
  },
  {
    id: 'dialysis-session',
    name: 'Hemodialysis (Single Outpatient Session)',
    code: 'PROC-DIAL-06',
    colloquialNames: [
      'kidney dialysis',
      'dialysis per session',
      'gurda dialysis',
      'blood filter dialysis',
      'renal dialysis'
    ],
    category: 'daycare_procedure',
    description: 'Extracorporeal blood purification session using an artificial kidney (dialyzer machine) to remove urea, creatinine, excess fluid, and balance electrolytes for renal failure patients.',
    setting: 'Daycare',
    typicalDuration: '3.5 - 4 hours per session',
    preparationAdvice: 'Check weight prior to sitting. Keep AV fistula arm clean. Adhere strictly to dry-weight protocol and bring past dialysis record book.',
    breakdown: [
      {
        category: 'Dialyzer Filter, Blood Tubing & Acid/Bicarb Concentrate',
        percentage: 50,
        typicalAmountGovt: 0,
        typicalAmountPrivate: 900,
        explanation: 'Single-use or sanitized re-use dialyzer cartridge, heparin anticoagulant & RO purified water.'
      },
      {
        category: 'Hemodialysis Technician & Nephrologist Monitoring',
        percentage: 35,
        typicalAmountGovt: 0,
        typicalAmountPrivate: 650,
        explanation: 'Fistula needle cannulation, continuous vital signs monitoring, and emergency nephrologist cover.'
      },
      {
        category: 'Dialysis Bed / Recliner & Biomedical Waste Management',
        percentage: 15,
        typicalAmountGovt: 50,
        typicalAmountPrivate: 300,
        explanation: 'Comfortable sanitized recliner, sterile linens, and infectious bio-hazard disposal.'
      }
    ],
    ratesByRegion: {
      hyderabad: {
        cghsNabhRate: 1100,
        cghsNonNabhRate: 935,
        pmjayPackageRate: 1500, // Includes consumables
        pmjayCode: 'NE001',
        govtHospitalRange: [0, 0], // Free in Aarogyasri Telangana Govt centers
        trustHospitalRange: [600, 950],
        privateMidRange: [1600, 2300],
        privateCorporateRange: [2800, 4200]
      },
      bengaluru: {
        cghsNabhRate: 1180,
        cghsNonNabhRate: 1003,
        pmjayPackageRate: 1550,
        pmjayCode: 'NE001',
        govtHospitalRange: [0, 100],
        trustHospitalRange: [700, 1050],
        privateMidRange: [1750, 2500],
        privateCorporateRange: [3000, 4500]
      },
      delhi: {
        cghsNabhRate: 1100,
        cghsNonNabhRate: 935,
        pmjayPackageRate: 1500,
        pmjayCode: 'NE001',
        govtHospitalRange: [0, 50],
        trustHospitalRange: [650, 1000],
        privateMidRange: [1700, 2400],
        privateCorporateRange: [2900, 4400]
      },
      jaipur: {
        cghsNabhRate: 980,
        cghsNonNabhRate: 833,
        pmjayPackageRate: 1350,
        pmjayCode: 'NE001',
        govtHospitalRange: [0, 0],
        trustHospitalRange: [550, 850],
        privateMidRange: [1400, 2000],
        privateCorporateRange: [2400, 3600]
      },
      mumbai: {
        cghsNabhRate: 1250,
        cghsNonNabhRate: 1063,
        pmjayPackageRate: 1650,
        pmjayCode: 'NE001',
        govtHospitalRange: [0, 100],
        trustHospitalRange: [750, 1150],
        privateMidRange: [1900, 2700],
        privateCorporateRange: [3200, 4800]
      }
    },
    vaultStatsByRegion: {
      hyderabad: {
        sampleSize: 31,
        min: 650,
        median: 1850,
        p75: 2200,
        max: 3900,
        lastUpdated: '2026-10-29',
        dataSourceDescription: '31 session receipts from dialysis networks across Hyderabad.',
        confidence: 'high'
      },
      bengaluru: {
        sampleSize: 24,
        min: 750,
        median: 2000,
        p75: 2450,
        max: 4200,
        lastUpdated: '2026-10-08',
        dataSourceDescription: '24 dialysis center receipts from Bengaluru.',
        confidence: 'high'
      },
      delhi: {
        sampleSize: 29,
        min: 700,
        median: 1950,
        p75: 2350,
        max: 4100,
        lastUpdated: '2026-11-04',
        dataSourceDescription: '29 dialysis bills from Delhi-NCR standalone & hospital units.',
        confidence: 'high'
      },
      jaipur: {
        sampleSize: 12,
        min: 600,
        median: 1600,
        p75: 1950,
        max: 3400,
        lastUpdated: '2026-09-12',
        dataSourceDescription: '12 bills from Jaipur.',
        confidence: 'moderate'
      },
      mumbai: {
        sampleSize: 20,
        min: 800,
        median: 2150,
        p75: 2650,
        max: 4600,
        lastUpdated: '2026-10-15',
        dataSourceDescription: '20 bills from dialysis centres in Mumbai & Navi Mumbai.',
        confidence: 'high'
      }
    }
  },
  {
    id: 'normal-delivery',
    name: 'Normal Vaginal Delivery (Standard Maternal Care)',
    code: 'MAT-DEL-07',
    colloquialNames: [
      'normal delivery',
      'prashuti',
      'bachha paida hone ka kharcha',
      'delivery hospital cost',
      'maternity normal'
    ],
    category: 'inpatient_surgery',
    description: 'Full-term uncomplicated spontaneous vaginal delivery including intrapartum fetal monitoring, episiotomy/perineal repair if needed, newborn APGAR care, pediatrician examination, and 24-48 hours postpartum hospital room.',
    setting: '1-2 Days Admission',
    typicalDuration: '1 to 2 days hospital stay',
    preparationAdvice: 'Carry all ante-natal checkup files, ultrasound records, blood group report, Mother-Child Protection (MCP) card, and baby clothing.',
    breakdown: [
      {
        category: 'Obstetrician & Labor Room Delivery Nursing',
        percentage: 40,
        typicalAmountGovt: 0,
        typicalAmountPrivate: 12000,
        explanation: 'Consultant obstetrician delivery charges, labor room monitoring, and episiotomy suturing.'
      },
      {
        category: 'Maternity Room & Postpartum Stay (Twin-sharing / Semi-private)',
        percentage: 35,
        typicalAmountGovt: 0,
        typicalAmountPrivate: 9000,
        explanation: '2 days in-patient room, nursing round-the-clock observation, maternal diet & hygiene.'
      },
      {
        category: 'Pediatrician Newborn Resuscitation & Initial Vaccinations',
        percentage: 25,
        typicalAmountGovt: 50,
        typicalAmountPrivate: 6000,
        explanation: 'Newborn care, Vitamin K1 injection, Hepatitis-B & BCG vaccination, and blood group test.'
      }
    ],
    ratesByRegion: {
      hyderabad: {
        cghsNabhRate: 12000,
        cghsNonNabhRate: 10200,
        pmjayPackageRate: 9000,
        pmjayCode: 'OB001',
        govtHospitalRange: [0, 300], // Free + KCR Kit incentive in Telangana Govt
        trustHospitalRange: [8000, 15000],
        privateMidRange: [24000, 38000],
        privateCorporateRange: [52000, 85000]
      },
      bengaluru: {
        cghsNabhRate: 13000,
        cghsNonNabhRate: 11050,
        pmjayPackageRate: 9500,
        pmjayCode: 'OB001',
        govtHospitalRange: [0, 400],
        trustHospitalRange: [9000, 16500],
        privateMidRange: [26000, 42000],
        privateCorporateRange: [56000, 92000]
      },
      delhi: {
        cghsNabhRate: 12000,
        cghsNonNabhRate: 10200,
        pmjayPackageRate: 9000,
        pmjayCode: 'OB001',
        govtHospitalRange: [0, 350],
        trustHospitalRange: [8500, 15500],
        privateMidRange: [25000, 40000],
        privateCorporateRange: [54000, 88000]
      },
      jaipur: {
        cghsNabhRate: 10500,
        cghsNonNabhRate: 8925,
        pmjayPackageRate: 8200,
        pmjayCode: 'OB001',
        govtHospitalRange: [0, 250],
        trustHospitalRange: [7000, 13000],
        privateMidRange: [20000, 32000],
        privateCorporateRange: [42000, 68000]
      },
      mumbai: {
        cghsNabhRate: 13800,
        cghsNonNabhRate: 11730,
        pmjayPackageRate: 10000,
        pmjayCode: 'OB001',
        govtHospitalRange: [0, 500],
        trustHospitalRange: [10000, 18500],
        privateMidRange: [29000, 48000],
        privateCorporateRange: [62000, 105000]
      }
    },
    vaultStatsByRegion: {
      hyderabad: {
        sampleSize: 39,
        min: 8500,
        median: 31000,
        p75: 41000,
        max: 82000,
        lastUpdated: '2026-10-15',
        dataSourceDescription: '39 discharge summary receipts from maternity homes & hospitals.',
        confidence: 'high'
      },
      bengaluru: {
        sampleSize: 32,
        min: 9200,
        median: 34000,
        p75: 45000,
        max: 90000,
        lastUpdated: '2026-10-02',
        dataSourceDescription: '32 bills from maternity nursing homes across Bengaluru.',
        confidence: 'high'
      },
      delhi: {
        sampleSize: 41,
        min: 8800,
        median: 32500,
        p75: 43000,
        max: 86000,
        lastUpdated: '2026-10-24',
        dataSourceDescription: '41 bills from Delhi-NCR maternity centres.',
        confidence: 'high'
      },
      jaipur: {
        sampleSize: 15,
        min: 7200,
        median: 25000,
        p75: 33000,
        max: 65000,
        lastUpdated: '2026-08-20',
        dataSourceDescription: '15 bills from Jaipur nursing homes.',
        confidence: 'moderate'
      },
      mumbai: {
        sampleSize: 28,
        min: 10500,
        median: 38000,
        p75: 51000,
        max: 98000,
        lastUpdated: '2026-10-21',
        dataSourceDescription: '28 bills from Mumbai hospitals.',
        confidence: 'high'
      }
    }
  },
  {
    id: 'lap-cholecystectomy',
    name: 'Laparoscopic Cholecystectomy (Gallbladder Stone Removal)',
    code: 'SURG-LAP-08',
    colloquialNames: [
      'gallbladder stone surgery',
      'pathari operation',
      'pitte ki pathari',
      'gall bladder operation',
      'durbin se surgery'
    ],
    category: 'inpatient_surgery',
    description: 'Minimally invasive keyhole laparoscopic removal of the gallbladder (cholecystectomy) through 3-4 tiny ports under general anesthesia.',
    setting: '1-2 Days Admission',
    typicalDuration: '45 - 75 minutes (Hospital stay: 1 to 2 days)',
    preparationAdvice: 'Fasting from midnight (8 hours minimum). Pre-anesthetic checkup (PAC) including ECG, chest X-ray and blood clotting profile required.',
    breakdown: [
      {
        category: 'Laparoscopic Surgical Team & Anesthetist Charges',
        percentage: 42,
        typicalAmountGovt: 0,
        typicalAmountPrivate: 19000,
        explanation: 'Consultant laparoscopic general surgeon, assistant surgeon, and senior consultant anesthetist.'
      },
      {
        category: 'Operation Theatre, HD Tower & Laparoscopic Clip Disposables',
        percentage: 38,
        typicalAmountGovt: 1200,
        typicalAmountPrivate: 17000,
        explanation: 'CO2 insufflation, harmonic scalpel / bipolar energy device, titanium clips & trocars.'
      },
      {
        category: 'Inpatient Hospital Bed, IV Antibiotics & Post-op Recovery',
        percentage: 20,
        typicalAmountGovt: 300,
        typicalAmountPrivate: 9000,
        explanation: '2 days room tariff, nursing vigilance, IV analgesics and sterile wound dressings.'
      }
    ],
    ratesByRegion: {
      hyderabad: {
        cghsNabhRate: 22000,
        cghsNonNabhRate: 18700,
        pmjayPackageRate: 19500,
        pmjayCode: 'GS014',
        govtHospitalRange: [0, 1500],
        trustHospitalRange: [16000, 26000],
        privateMidRange: [42000, 62000],
        privateCorporateRange: [82000, 135000]
      },
      bengaluru: {
        cghsNabhRate: 23500,
        cghsNonNabhRate: 19975,
        pmjayPackageRate: 20500,
        pmjayCode: 'GS014',
        govtHospitalRange: [0, 1600],
        trustHospitalRange: [18000, 28000],
        privateMidRange: [45000, 66000],
        privateCorporateRange: [88000, 145000]
      },
      delhi: {
        cghsNabhRate: 22000,
        cghsNonNabhRate: 18700,
        pmjayPackageRate: 19500,
        pmjayCode: 'GS014',
        govtHospitalRange: [0, 1500],
        trustHospitalRange: [16500, 26500],
        privateMidRange: [43000, 63000],
        privateCorporateRange: [85000, 140000]
      },
      jaipur: {
        cghsNabhRate: 19500,
        cghsNonNabhRate: 16575,
        pmjayPackageRate: 17500,
        pmjayCode: 'GS014',
        govtHospitalRange: [0, 1200],
        trustHospitalRange: [14000, 22000],
        privateMidRange: [35000, 52000],
        privateCorporateRange: [68000, 110000]
      },
      mumbai: {
        cghsNabhRate: 24500,
        cghsNonNabhRate: 20825,
        pmjayPackageRate: 21500,
        pmjayCode: 'GS014',
        govtHospitalRange: [0, 1800],
        trustHospitalRange: [19500, 31000],
        privateMidRange: [49000, 72000],
        privateCorporateRange: [95000, 160000]
      }
    },
    vaultStatsByRegion: {
      hyderabad: {
        sampleSize: 27,
        min: 17500,
        median: 51000,
        p75: 64000,
        max: 128000,
        lastUpdated: '2026-10-10',
        dataSourceDescription: '27 verified surgical discharge bills from surgical centers across Hyderabad.',
        confidence: 'high'
      },
      bengaluru: {
        sampleSize: 21,
        min: 19000,
        median: 54000,
        p75: 68000,
        max: 136000,
        lastUpdated: '2026-09-25',
        dataSourceDescription: '21 hospital discharge summaries from Bengaluru.',
        confidence: 'high'
      },
      delhi: {
        sampleSize: 34,
        min: 18000,
        median: 52000,
        p75: 66000,
        max: 132000,
        lastUpdated: '2026-10-22',
        dataSourceDescription: '34 patient bills across Delhi-NCR hospitals.',
        confidence: 'high'
      },
      jaipur: {
        sampleSize: 10,
        min: 15000,
        median: 42000,
        p75: 54000,
        max: 105000,
        lastUpdated: '2026-08-18',
        dataSourceDescription: '10 bills from Jaipur surgical hospitals.',
        confidence: 'moderate'
      },
      mumbai: {
        sampleSize: 19,
        min: 21000,
        median: 58000,
        p75: 75000,
        max: 152000,
        lastUpdated: '2026-10-09',
        dataSourceDescription: '19 bills from Mumbai hospitals.',
        confidence: 'high'
      }
    }
  },
  {
    id: 'polysomnography-sleep',
    name: 'Overnight Polysomnography (Level 1 Comprehensive Sleep Apnea Study)',
    code: 'TEST-SLEEP-09',
    colloquialNames: [
      'sleep study',
      'sleep apnea test',
      'kharrate ki jaanch',
      'snoring test',
      'polysomnogram'
    ],
    category: 'diagnostic_imaging',
    description: 'Specialized overnight diagnostic sleep investigation recording brain waves (EEG), blood oxygen saturation (SpO2), heart rate, airflow, and chest movements to diagnose obstructive sleep apnea.',
    setting: '1-2 Days Admission',
    typicalDuration: 'Overnight in sleep laboratory (8 - 10 hours)',
    preparationAdvice: 'Avoid caffeine, sedatives, and daytime naps on the test day. Wash hair with mild shampoo and do not apply hair oils or gels before electrode placement.',
    isLowDataPilot: true, // Specifically demonstrates Requirement #2: "Explain when there is too little information for a reliable estimate."
    breakdown: [
      {
        category: 'Sleep Lab Room & Multi-channel Polygraph Sensors',
        percentage: 50,
        typicalAmountGovt: 1200,
        typicalAmountPrivate: 6000,
        explanation: 'Sound-proof monitored sleep suite, 16-channel EEG, EMG, ECG, thermistor & respiratory effort bands.'
      },
      {
        category: 'All-night Registered Sleep Technologist Monitoring',
        percentage: 30,
        typicalAmountGovt: 0,
        typicalAmountPrivate: 3600,
        explanation: 'Real-time observation of hypopnea, desaturations, and electrode calibration throughout the night.'
      },
      {
        category: 'Pulmonologist / Sleep Specialist Scoring & Report',
        percentage: 20,
        typicalAmountGovt: 0,
        typicalAmountPrivate: 2400,
        explanation: 'Scoring Apnea-Hypopnea Index (AHI), sleep staging architecture, and CPAP pressure titration.'
      }
    ],
    ratesByRegion: {
      hyderabad: {
        cghsNabhRate: 4500,
        cghsNonNabhRate: 3825,
        pmjayPackageRate: 4000,
        pmjayCode: 'PU009',
        govtHospitalRange: [0, 1500],
        trustHospitalRange: [3800, 5500],
        privateMidRange: [8500, 13000],
        privateCorporateRange: [16000, 24000]
      },
      bengaluru: {
        cghsNabhRate: 4800,
        cghsNonNabhRate: 4080,
        pmjayPackageRate: 4200,
        pmjayCode: 'PU009',
        govtHospitalRange: [0, 1600],
        trustHospitalRange: [4000, 6000],
        privateMidRange: [9000, 14000],
        privateCorporateRange: [17000, 26000]
      },
      delhi: {
        cghsNabhRate: 4500,
        cghsNonNabhRate: 3825,
        pmjayPackageRate: 4000,
        pmjayCode: 'PU009',
        govtHospitalRange: [0, 1500],
        trustHospitalRange: [3600, 5400],
        privateMidRange: [8500, 13500],
        privateCorporateRange: [16500, 25000]
      },
      jaipur: {
        cghsNabhRate: 3900,
        cghsNonNabhRate: 3315,
        pmjayPackageRate: 3500,
        pmjayCode: 'PU009',
        govtHospitalRange: [0, 1200],
        trustHospitalRange: [3200, 4800],
        privateMidRange: [7200, 11000],
        privateCorporateRange: [14000, 20000]
      },
      mumbai: {
        cghsNabhRate: 5000,
        cghsNonNabhRate: 4250,
        pmjayPackageRate: 4500,
        pmjayCode: 'PU009',
        govtHospitalRange: [0, 1800],
        trustHospitalRange: [4200, 6500],
        privateMidRange: [9800, 15500],
        privateCorporateRange: [18500, 28000]
      }
    },
    vaultStatsByRegion: {
      hyderabad: {
        sampleSize: 2, // INSUFFICIENT DATA EXAMPLE
        min: 9000,
        median: 11500,
        p75: 12500,
        max: 13000,
        lastUpdated: '2026-04-10',
        dataSourceDescription: 'Only 2 crowdsourced records available in Hyderabad Urban.',
        confidence: 'insufficient',
        insufficientReason: 'Sample size is too small (N=2 < 5 threshold) to calculate reliable statistical medians. Official CGHS/PM-JAY rate card baseline is displayed for reference.'
      },
      bengaluru: {
        sampleSize: 1, // INSUFFICIENT DATA EXAMPLE
        min: 12000,
        median: 12000,
        p75: 12000,
        max: 12000,
        lastUpdated: '2026-03-05',
        dataSourceDescription: 'Only 1 record submitted from Bengaluru South.',
        confidence: 'insufficient',
        insufficientReason: 'Insufficient local bill submissions in Bengaluru. Official CGHS baseline shown.'
      },
      delhi: {
        sampleSize: 3,
        min: 8500,
        median: 11000,
        p75: 13000,
        max: 14500,
        lastUpdated: '2026-05-12',
        dataSourceDescription: 'Only 3 records available from Delhi NCR.',
        confidence: 'insufficient',
        insufficientReason: 'Less than 5 verified bills on record. Showing government rate card tariffs.'
      },
      jaipur: {
        sampleSize: 0,
        min: 0,
        median: 0,
        p75: 0,
        max: 0,
        lastUpdated: 'Never',
        dataSourceDescription: 'Zero crowdsourced bills in Jaipur repository.',
        confidence: 'insufficient',
        insufficientReason: 'No crowdsourced bills yet received for sleep study in Jaipur. Contributed bills will unlock regional analytics.'
      },
      mumbai: {
        sampleSize: 2,
        min: 10500,
        median: 13500,
        p75: 14000,
        max: 15000,
        lastUpdated: '2026-02-18',
        dataSourceDescription: '2 records on file for Mumbai.',
        confidence: 'insufficient',
        insufficientReason: 'Under 5 records available. Rate card benchmarks provided.'
      }
    }
  }
];
