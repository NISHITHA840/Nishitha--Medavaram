import { SchemeInfo } from '../types';

export const SCHEMES: SchemeInfo[] = [
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
      vulnerableGroups: [
        'Informal Worker',
        'BOCW Construction',
        'Farmer (PM-KISAN)',
        'Street Vendor',
        'Senior Citizen 70+'
      ],
      domicileRequired: false
    },
    benefitsList: [
      'Cashless in-patient treatment up to ₹5 Lakhs per family per year.',
      'Covers 1,949 medical packages across public and empaneled private hospitals nationwide.',
      'Pre-existing conditions covered from Day 1.',
      'Includes 3 days pre-hospitalization and 15 days post-hospitalization medicines & tests.',
      'Senior citizens aged 70+ now receive a dedicated Ayushman Vay Vandana card with separate top-up coverage regardless of income.'
    ],
    documentChecklist: [
      'Ration Card (NFSA Antyodaya Anna Yojana AAY or Priority Household PHH / BPL Card)',
      'Government Photo ID (Aadhaar / Voter ID / Ration Card photo for kiosk verification)',
      'Active mobile number to receive OTP at Ayushman Mitra counter',
      'Old RSBY or PM-JAY Family ID letter (if previously received by post)'
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
      vulnerableGroups: [
        'Informal Worker',
        'BOCW Construction',
        'Farmer (PM-KISAN)',
        'Street Vendor',
        'Disabled'
      ],
      domicileRequired: true
    },
    benefitsList: [
      'Cashless hospitalization coverage enhanced up to ₹10,00,000 per BPL family.',
      'Over 1,672 identified surgical and medical procedures covered without copay.',
      'Includes all pre-op investigations, ICU, surgeon fee, and 10 days post-discharge medicines.',
      'Cashless outpatient dialysis and chemotherapy sessions in network hospitals.',
      'Round-the-clock Aarogyamithra support in all network hospitals.'
    ],
    documentChecklist: [
      'Telangana Food Security White Card (Civil Supplies Department FSC Card)',
      'Aadhaar Card for patient identity verification at Aarogya Mithra kiosk',
      'Doctor referral slip / outpatient case sheet from Government Hospital or primary health centre'
    ],
    officialHelpline: '104 (Toll-free Medical Helpline) / 1800-599-4455',
    officialPortalUrl: 'https://aarogyasri.telangana.gov.in',
    nearestEnquiryPoint: 'Aarogya Mithra helpdesk located at Gandhi Hospital, Osmania General Hospital, or any network private hospital admission counter.'
  },
  {
    id: 'ab-ark',
    name: 'Ayushman Bharat - Arogya Karnataka (AB-ArK)',
    codeName: 'AB-ArK',
    sponsor: 'Joint',
    regionId: 'bengaluru',
    coverageAmount: 500000,
    description: 'Co-branded Karnataka health scheme offering ₹5,00,000 cashless tertiary cover for "Eligible" (BPL) families, and 30% financial copay subsidy for "General" (APL) households.',
    criteria: {
      incomeLimitAnnual: 200000,
      acceptedRationCards: ['BPL', 'AAY', 'PHH', 'White_Card'],
      vulnerableGroups: ['Informal Worker', 'Farmer (PM-KISAN)', 'Senior Citizen 70+'],
      domicileRequired: true
    },
    benefitsList: [
      'Cashless secondary and tertiary treatment up to ₹5 Lakhs for BPL/Eligible card holders.',
      'General (APL) families get 30% concession / government-subsidized package rates.',
      'Referral system from Taluk/District public hospitals to super-specialty network.',
      'Covers emergency care directly without prior referral.'
    ],
    documentChecklist: [
      'Karnataka Food and Civil Supplies BPL (Food Security) or AAY Ration Card',
      'Aadhaar card of patient and head of family',
      'ArK Referral Letter (from Government Taluk / District Hospital if elective procedure)'
    ],
    officialHelpline: '1800-425-8330 (Suvarna Arogya Suraksha Trust)',
    officialPortalUrl: 'https://arogya.karnataka.gov.in',
    nearestEnquiryPoint: 'Arogya Mitra desk at Victoria Hospital, Bowring & Lady Curzon Hospital, or any district government hospital.'
  },
  {
    id: 'dak-delhi',
    name: 'Delhi Arogya Kosh (DAK) & Free Diagnostic Scheme',
    codeName: 'DAK-Delhi',
    sponsor: 'State',
    regionId: 'delhi',
    coverageAmount: 500000,
    description: 'Delhi Government initiative providing financial aid up to ₹5,00,000 for complex surgeries, plus 100% free high-end diagnostics (MRI, CT Scan, PET Scan, 450+ Lab tests) at empaneled private labs for Delhi residents.',
    criteria: {
      incomeLimitAnnual: 300000,
      acceptedRationCards: ['BPL', 'AAY', 'PHH', 'Delhi_Resident'],
      vulnerableGroups: ['Informal Worker', 'Street Vendor', 'Senior Citizen 70+'],
      domicileRequired: true
    },
    benefitsList: [
      'Free MRI, CT scan, Ultrasound & high-end diagnostics in certified private diagnostic centers within 48-72 hours if waiting at Delhi Govt hospital exceeds 30 days.',
      'Financial assistance up to ₹5 Lakhs for implants, heart surgeries, and neurosurgeries for low-income families.',
      'Cashless emergency care for road accident and burn victims under Farishte Dilli Ke.'
    ],
    documentChecklist: [
      'Delhi Voter ID Card / Proof of 3+ years residence in NCT of Delhi',
      'Referral requisition form stamped by a Delhi Govt hospital doctor or Mohalla Clinic physician',
      'Family Income certificate issued by SDM / Tehsildar (for surgical grant component)'
    ],
    officialHelpline: '1031 (Delhi Govt Citizens Helpline) / 011-22376824',
    officialPortalUrl: 'https://health.delhi.gov.in',
    nearestEnquiryPoint: 'Medical Superintendent office at Safdarjung, LNJP Hospital, or DAK help desk at Delhi Secretariat.'
  },
  {
    id: 'chiranjeevi-rj',
    name: 'Mukhyamantri Ayushman Arogya Yojana (Chiranjeevi)',
    codeName: 'MAAY-Rajasthan',
    sponsor: 'State',
    regionId: 'jaipur',
    coverageAmount: 2500000,
    description: 'Universal health insurance in Rajasthan offering up to ₹25,00,000 cashless hospitalization coverage for NFSA, small farmers, contractual staff, and general families paying nominal ₹850/year premium.',
    criteria: {
      incomeLimitAnnual: 800000,
      acceptedRationCards: ['BPL', 'AAY', 'PHH', 'Jan_Aadhaar'],
      vulnerableGroups: ['Informal Worker', 'Farmer (PM-KISAN)', 'Senior Citizen 70+', 'BOCW Construction'],
      domicileRequired: true
    },
    benefitsList: [
      'Up to ₹25 Lakhs per family annual cashless treatment cover.',
      'Includes organ transplants (Kidney, Liver, Heart, Bone Marrow) and oncology packages.',
      'Jan Aadhaar linked universal coverage throughout Rajasthan network hospitals.',
      'Outpatient medicines and tests 100% free under Nirogi Rajasthan in state hospitals.'
    ],
    documentChecklist: [
      'Rajasthan Jan Aadhaar Card with updated family members list',
      'Aadhaar card of patient'
    ],
    officialHelpline: '181 (Rajasthan Sampark Helpline)',
    officialPortalUrl: 'https://health.rajasthan.gov.in',
    nearestEnquiryPoint: 'Jan Aadhaar Helpdesk at SMS Hospital Jaipur or nearest e-Mitra kiosk.'
  }
];
