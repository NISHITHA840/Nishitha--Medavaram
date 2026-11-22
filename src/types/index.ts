export type LanguageCode = 'en' | 'hi' | 'te' | 'ta' | 'kn' | 'bn';

export interface PilotRegion {
  id: string;
  name: string;
  state: string;
  localName: Record<LanguageCode, string>;
  districts: string[];
  defaultDistrict: string;
  currency: string;
  primaryStateSchemeId: string;
  cghsRateCity: string;
  disclaimerNote: string;
}

export type ProcedureCategory = 
  | 'diagnostic_imaging' 
  | 'pathology_lab' 
  | 'daycare_procedure' 
  | 'inpatient_surgery';

export interface CostBreakdownItem {
  category: string; // e.g. Doctor / Consultation, Bed & Nursing, Consumables & Tests, Medicines
  percentage: number; // e.g. 35%
  typicalAmountGovt: number;
  typicalAmountPrivate: number;
  explanation: string;
}

export interface BillVaultStats {
  sampleSize: number; // e.g., 38
  min: number;
  median: number;
  p75: number;
  max: number;
  lastUpdated: string;
  dataSourceDescription: string;
  confidence: 'high' | 'moderate' | 'insufficient'; // when sample size < 5 or no recent records
  insufficientReason?: string;
}

export interface ProcedureRateCard {
  cghsNabhRate: number; // CGHS Empaneled NABH Hospital rate
  cghsNonNabhRate: number; // CGHS Non-NABH rate
  pmjayPackageRate: number; // Ayushman Bharat HBP rate
  pmjayCode?: string;
  govtHospitalRange: [number, number]; // e.g. 0 to 50
  trustHospitalRange: [number, number]; // e.g. 400 to 700
  privateMidRange: [number, number]; // e.g. 1000 to 1800
  privateCorporateRange: [number, number]; // e.g. 2400 to 4500
}

export interface MedicalProcedure {
  id: string;
  name: string;
  code: string;
  colloquialNames: string[]; // e.g., "stomach scan", "pet ka ultrasound", "motiya bindu"
  category: ProcedureCategory;
  description: string;
  setting: 'OPD' | 'Daycare' | '1-2 Days Admission' | 'ICU/Multi-day';
  typicalDuration: string;
  preparationAdvice: string; // e.g., "Fasting for 6 hours required"
  ratesByRegion: Record<string, ProcedureRateCard>;
  breakdown: CostBreakdownItem[];
  vaultStatsByRegion: Record<string, BillVaultStats>;
  isLowDataPilot?: boolean; // Demonstrates the requirement: "Explain when there is too little information for a reliable estimate"
}

export type FacilityType = 'govt' | 'trust' | 'private_mid' | 'private_corp';

export interface QualityBadge {
  id: 'NABH_Full' | 'NABH_Entry' | 'NABL_Certified' | 'PMJAY_Gold' | 'Aarogyasri_Trust' | 'ISO_Medical';
  label: string;
  authority: string; // e.g. National Accreditation Board for Hospitals
  officialSourceUrl: string;
  verifiedOn: string;
}

export interface HealthcareFacility {
  id: string;
  name: string;
  type: FacilityType;
  regionId: string;
  district: string;
  address: string;
  pincode: string;
  phone: string;
  opdTimings: string;
  hasAyushmanDesk: boolean;
  hasEmergency24x7: boolean;
  hasFreeDiagnostics: boolean;
  schemesEmpaneled: string[]; // ['PM-JAY', 'Aarogyasri', 'CGHS']
  qualityBadges: QualityBadge[];
  distanceKm?: number; // Calculated dynamically
  coordinates: {
    lat: number;
    lng: number;
  };
  verifiedCostNotes?: string;
  procedureCostMultiplier: number; // Ratio against baseline rate
}

export interface SchemeRuleCriteria {
  incomeLimitAnnual?: number;
  acceptedRationCards: string[]; // 'BPL', 'AAY', 'PHH', 'White_Card', 'Pink_Card', 'Annapurna'
  vulnerableGroups: string[]; // 'Informal Worker', 'BOCW Construction', 'Farmer (PM-KISAN)', 'Street Vendor', 'Senior Citizen', 'Disabled'
  domicileRequired: boolean;
}

export interface SchemeInfo {
  id: string;
  name: string;
  codeName: string;
  sponsor: 'Central' | 'State' | 'Joint';
  regionId?: string; // empty means all-India
  coverageAmount: number; // e.g. 500000 or 1000000
  description: string;
  criteria: SchemeRuleCriteria;
  benefitsList: string[];
  documentChecklist: string[];
  officialHelpline: string;
  officialPortalUrl: string;
  nearestEnquiryPoint: string;
}

export interface SchemeAssessmentInput {
  regionId: string;
  rationCardType: string;
  annualIncomeBracket: string;
  vulnerabilityCategory: string;
  isResident: boolean;
}

export interface SchemeAssessmentResult {
  matchLevel: 'HIGH_POTENTIAL' | 'MODERATE_POTENTIAL' | 'APL_EXPLORE_CENTRAL' | 'NOT_ELIGIBLE';
  matchedSchemes: SchemeInfo[];
  matchSummary: string;
  documentChecklist: string[];
  verificationSteps: string[];
  helpline: string;
  portalUrl: string;
  disclaimer: string;
}

export interface RealBillContribution {
  id: string;
  procedureId: string;
  procedureName: string;
  regionId: string;
  district: string;
  facilityType: FacilityType;
  facilityNameAnonymized: string;
  billedAmount: number;
  billDate: string; // e.g. "2026-09-12"
  hasInsurance: boolean;
  outOfPocketPaid: number;
  consentGiven: boolean;
  redactedNotes?: string;
  submittedAt: string;
}
