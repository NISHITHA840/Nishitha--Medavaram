import { SCHEMES } from '../data/schemes';
import { SchemeAssessmentInput, SchemeAssessmentResult, SchemeInfo } from '../types';

export function assessSchemeEligibility(input: SchemeAssessmentInput): SchemeAssessmentResult {
  const matchedSchemes: SchemeInfo[] = [];
  let isBplOrPriority = ['BPL', 'AAY', 'PHH', 'White_Card'].includes(input.rationCardType);
  let isVulnerableWorker = [
    'Informal Worker',
    'BOCW Construction',
    'Farmer (PM-KISAN)',
    'Street Vendor',
    'Senior Citizen 70+'
  ].includes(input.vulnerabilityCategory);

  // 1. Check Central PM-JAY
  const pmjay = SCHEMES.find(s => s.id === 'pmjay-central');
  if (pmjay) {
    if (isBplOrPriority || input.vulnerabilityCategory === 'Senior Citizen 70+' || isVulnerableWorker) {
      matchedSchemes.push(pmjay);
    }
  }

  // 2. Check State Schemes based on pilot region
  if (input.regionId === 'hyderabad') {
    const aarogyasri = SCHEMES.find(s => s.id === 'aarogyasri-ts');
    if (aarogyasri && (isBplOrPriority || input.annualIncomeBracket === 'below_1_5l' || input.annualIncomeBracket === '1_5l_to_2_5l')) {
      matchedSchemes.push(aarogyasri);
    }
  } else if (input.regionId === 'bengaluru') {
    const ark = SCHEMES.find(s => s.id === 'ab-ark');
    if (ark) {
      matchedSchemes.push(ark);
    }
  } else if (input.regionId === 'delhi') {
    const dak = SCHEMES.find(s => s.id === 'dak-delhi');
    if (dak && (isBplOrPriority || input.isResident)) {
      matchedSchemes.push(dak);
    }
  } else if (input.regionId === 'jaipur') {
    const chiranjeevi = SCHEMES.find(s => s.id === 'chiranjeevi-rj');
    if (chiranjeevi) {
      matchedSchemes.push(chiranjeevi);
    }
  }

  // Determine Match Level
  let matchLevel: SchemeAssessmentResult['matchLevel'] = 'MODERATE_POTENTIAL';
  let summary = '';

  if (isBplOrPriority || input.vulnerabilityCategory === 'Senior Citizen 70+') {
    matchLevel = 'HIGH_POTENTIAL';
    summary = 'Strong potential eligibility identified based on NFSA Priority / BPL Ration Card category and welfare criteria.';
  } else if (isVulnerableWorker || input.annualIncomeBracket === 'below_1_5l') {
    matchLevel = 'HIGH_POTENTIAL';
    summary = 'High potential eligibility based on verified vulnerable worker category or income threshold.';
  } else if (input.annualIncomeBracket === '1_5l_to_2_5l' || input.annualIncomeBracket === '2_5l_to_5l') {
    matchLevel = 'MODERATE_POTENTIAL';
    summary = 'Moderate potential match. You may qualify for state scheme co-pay subsidies or specific central welfare categories.';
  } else {
    matchLevel = 'APL_EXPLORE_CENTRAL';
    summary = 'General / APL category identified. Universal state scheme provisions (such as Rajasthan Chiranjeevi or Karnataka AB-ArK General) or Ayushman Vay Vandana for senior citizens (70+) apply.';
  }

  // Compile unified document checklist
  const docSet = new Set<string>();
  matchedSchemes.forEach(s => s.documentChecklist.forEach(doc => docSet.add(doc)));
  
  if (docSet.size === 0) {
    docSet.add('Food Security Ration Card or State Resident Card');
    docSet.add('Photo Identity Proof (Aadhaar / Voter ID) for counter verification');
    docSet.add('Income Certificate issued by Revenue Authority (Tahsildar)');
  }

  return {
    matchLevel,
    matchedSchemes,
    matchSummary: summary,
    documentChecklist: Array.from(docSet),
    verificationSteps: [
      'Locate your nearest Government District Hospital, Community Health Centre (CHC), or empaneled network private hospital.',
      'Head to the designated "Ayushman Mitra" or "Aarogya Mithra" kiosk located at the main reception/OPD counter.',
      'Present your Ration Card and Aadhaar/Voter ID for instant electronic database lookup (BIS 2.0 / TMS Portal).',
      'If eligible, the kiosk coordinator will capture your photo and e-KYC to print your Ayushman PVC Card or generate your digital approval token free of charge.'
    ],
    helpline: '14555 (Toll-Free National) / 104 (State Health Helpline)',
    portalUrl: 'https://mera.pmjay.gov.in',
    disclaimer: 'Notice: OneVision does not issue cards, collect personal identity records, or guarantee eligibility. Final determination is made by the National Health Authority (NHA) or State Health Agency at authorized registration kiosks.'
  };
}
