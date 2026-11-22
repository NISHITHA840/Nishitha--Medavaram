import { RealBillContribution, FacilityType } from '../types';

const VAULT_STORAGE_KEY = 'onevision_vault_contributions_v1';

// Initial verified sample contributions for the Real Bill Vault (clearly attributed demo data)
const SEED_CONTRIBUTIONS: RealBillContribution[] = [
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
    hasInsurance: false,
    outOfPocketPaid: 1200,
    consentGiven: true,
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
    hasInsurance: false,
    outOfPocketPaid: 600,
    consentGiven: true,
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
    hasInsurance: true,
    outOfPocketPaid: 4500,
    consentGiven: true,
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
    hasInsurance: false,
    outOfPocketPaid: 5200,
    consentGiven: true,
    redactedNotes: 'Scrubbed: Name, Radiologist Mobile',
    submittedAt: '2026-10-02T10:15:00Z'
  }
];

export function getVaultContributions(): RealBillContribution[] {
  if (typeof window === 'undefined') return SEED_CONTRIBUTIONS;
  try {
    const raw = localStorage.getItem(VAULT_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(SEED_CONTRIBUTIONS));
      return SEED_CONTRIBUTIONS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read vault records:', e);
    return SEED_CONTRIBUTIONS;
  }
}

export function saveVaultContribution(contribution: Omit<RealBillContribution, 'id' | 'submittedAt'>): RealBillContribution {
  const current = getVaultContributions();
  const newRecord: RealBillContribution = {
    ...contribution,
    id: `vault-user-${Date.now()}`,
    submittedAt: new Date().toISOString()
  };

  const updated = [newRecord, ...current];
  try {
    localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save vault record:', e);
  }
  return newRecord;
}

// Client-side privacy scrubber: masks identifying terms
export function scrubPrescriptionOrBillText(rawText: string): {
  scrubbedText: string;
  redactedCount: number;
} {
  let count = 0;
  let text = rawText;

  // Mask Indian phone numbers (10 digits, +91, 0...)
  const phoneRegex = /(\+91[\-\s]?)?[6789]\d{9}/g;
  text = text.replace(phoneRegex, () => {
    count++;
    return '[PHONE REDACTED]';
  });

  // Mask 12-digit Aadhaar pattern
  const aadhaarRegex = /\b\d{4}[\s\-]?\d{4}[\s\-]?\d{4}\b/g;
  text = text.replace(aadhaarRegex, () => {
    count++;
    return '[ID/AADHAAR REDACTED]';
  });

  // Mask names following "Patient:", "Name:", "Shri", "Smt", "Mr.", "Mrs."
  const nameRegex = /(Patient Name|Name|Pt\.|Mr\.|Mrs\.|Smt\.|Shri)\s*[:\-]?\s*([A-Za-z\s]{3,25})/gi;
  text = text.replace(nameRegex, (_match, prefix) => {
    count++;
    return `${prefix}: [PATIENT NAME REDACTED]`;
  });

  // Mask IPD/OPD numbers
  const regRegex = /(OPD|IPD|UHID|Reg No|Bill No)\s*[:\-]?\s*([A-Za-z0-9\-\/]{4,20})/gi;
  text = text.replace(regRegex, (_match, prefix) => {
    count++;
    return `${prefix}: [RECORD NUMBER REDACTED]`;
  });

  return {
    scrubbedText: text,
    redactedCount: count
  };
}
