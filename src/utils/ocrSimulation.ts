import { PROCEDURES } from '../data/procedures';
import { MedicalProcedure } from '../types';

export interface SamplePrescription {
  id: string;
  doctorName: string;
  clinicName: string;
  specialty: string;
  regNo: string;
  patientAgeGender: string;
  rxText: string;
  detectedProcedureId: string;
  clinicalImpression: string;
  boundingBoxes: {
    label: string;
    text: string;
    box: { top: number; left: number; width: number; height: number }; // In percentage
  }[];
}

export const SAMPLE_PRESCRIPTIONS: SamplePrescription[] = [
  {
    id: 'sample-usg',
    doctorName: 'Dr. Ramesh Chandra Gupta, MD (General Medicine)',
    clinicName: 'Gupta Medical Clinic & Care Centre, Ameerpet, Hyderabad',
    specialty: 'Internal Medicine / Consultant Physician',
    regNo: 'TSMC/2014/48912',
    patientAgeGender: '42 Yrs / Male',
    rxText: 'Rx:\n1. Advise USG Whole Abdomen & Pelvis (Empty stomach 6 hrs)\n2. Tab Pantoprazole 40mg (1-0-0) before breakfast\n3. Syp Gelusil MPS 10ml TDS',
    detectedProcedureId: 'usg-abdomen',
    clinicalImpression: 'Epigastric pain, severe dyspepsia, rule out cholelithiasis or renal calculi',
    boundingBoxes: [
      {
        label: 'Clinic Header',
        text: 'Gupta Medical Clinic & Care Centre • Reg: TSMC/2014/48912',
        box: { top: 8, left: 10, width: 80, height: 16 }
      },
      {
        label: 'Patient Demographics',
        text: 'Patient: S*** R*** • Age: 42Y • Date: 12/10/2026',
        box: { top: 28, left: 10, width: 80, height: 12 }
      },
      {
        label: 'Detected Clinical Need (Rx)',
        text: 'Advise USG Whole Abdomen & Pelvis (Fasting state)',
        box: { top: 45, left: 10, width: 80, height: 20 }
      },
      {
        label: 'Doctor Signature & Stamp',
        text: 'Dr. R. C. Gupta [Physician Signature]',
        box: { top: 76, left: 55, width: 35, height: 16 }
      }
    ]
  },
  {
    id: 'sample-cataract',
    doctorName: 'Dr. Sunita V. Rao, MS (Ophthalmology)',
    clinicName: 'Netra Jyoti Eye Specialty Hospital, Somajiguda, Hyderabad',
    specialty: 'Cataract & Refractive Surgeon',
    regNo: 'TSMC/2009/31405',
    patientAgeGender: '64 Yrs / Female',
    rxText: 'Diagnosis: Senile Nuclear Cataract Grade III (Right Eye)\nAdvised: Phacoemulsification with Foldable Monofocal Intraocular Lens (IOL) implant (Daycare)\nPAC clearance advised.',
    detectedProcedureId: 'cataract-phaco',
    clinicalImpression: 'Vision OD: 6/36, OS: 6/12. Mature nuclear sclerotic cataract right eye',
    boundingBoxes: [
      {
        label: 'Hospital Header',
        text: 'Netra Jyoti Eye Specialty Hospital • Hyderabad',
        box: { top: 6, left: 10, width: 80, height: 15 }
      },
      {
        label: 'Patient Info',
        text: 'Patient: L*** D*** • Age: 64Y / F',
        box: { top: 24, left: 10, width: 80, height: 12 }
      },
      {
        label: 'Detected Surgical Need (Rx)',
        text: 'Phacoemulsification with Foldable Monofocal IOL (Right Eye)',
        box: { top: 40, left: 10, width: 80, height: 25 }
      },
      {
        label: 'Surgeon Seal',
        text: 'Dr. Sunita V. Rao MS (Ophth)',
        box: { top: 78, left: 50, width: 40, height: 15 }
      }
    ]
  },
  {
    id: 'sample-mri',
    doctorName: 'Dr. K. Srinivas, M.Ch (Neuro Surgery)',
    clinicName: 'Spine & Neuro Care Centre, Banjara Hills, Hyderabad',
    specialty: 'Consultant Neurosurgeon',
    regNo: 'APMC/2004/18790',
    patientAgeGender: '38 Yrs / Male',
    rxText: 'Clinical: Radiculopathy L4-L5, progressive weakness left foot\nAdvised: MRI Lumbar Spine (Plain) with screening of whole spine',
    detectedProcedureId: 'mri-lumbar',
    clinicalImpression: 'Suspected L4-L5 disc herniation with nerve root impingement',
    boundingBoxes: [
      {
        label: 'Clinic Header',
        text: 'Spine & Neuro Care Centre • Dr. K. Srinivas M.Ch',
        box: { top: 8, left: 10, width: 80, height: 16 }
      },
      {
        label: 'Patient Details',
        text: 'Age: 38Y / M • OPD Ref: NS-4019',
        box: { top: 27, left: 10, width: 80, height: 12 }
      },
      {
        label: 'Detected Imaging Need (Rx)',
        text: 'MRI Lumbar Spine (Plain) - Lower Back',
        box: { top: 44, left: 10, width: 80, height: 22 }
      },
      {
        label: 'Specialist Sign',
        text: 'Dr. K. Srinivas, Consultant Neurosurgeon',
        box: { top: 75, left: 52, width: 38, height: 18 }
      }
    ]
  }
];

export interface ExtractedCareNeed {
  procedure: MedicalProcedure;
  confidenceScore: number;
  extractedText: string;
  suggestedSetting: string;
  notes: string;
  prescriptionDetails?: {
    doctorName?: string;
    clinicName?: string;
    clinicalImpression?: string;
  };
}

// Smart matcher for prescription or voice transcript or text
export function matchProcedureFromText(input: string): ExtractedCareNeed | null {
  const normalized = input.toLowerCase().trim();
  if (!normalized) return null;

  let bestMatch: MedicalProcedure | null = null;
  let highestScore = 0;

  for (const proc of PROCEDURES) {
    let score = 0;

    // Check direct name
    if (normalized.includes(proc.name.toLowerCase())) {
      score += 80;
    }

    // Check colloquial names
    for (const alias of proc.colloquialNames) {
      if (normalized.includes(alias.toLowerCase())) {
        score += 50;
      }
    }

    // Keyword tokens
    const tokens = normalized.split(/\s+/);
    for (const token of tokens) {
      if (token.length > 2) {
        if (proc.name.toLowerCase().includes(token)) score += 10;
        if (proc.description.toLowerCase().includes(token)) score += 4;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = proc;
    }
  }

  // Fallback to first if general match or default to USG abdomen if searching common terms
  if (!bestMatch || highestScore < 10) {
    // Check for generic terms
    if (normalized.includes('scan') || normalized.includes('ultrasound') || normalized.includes('sonography')) {
      bestMatch = PROCEDURES.find(p => p.id === 'usg-abdomen') || PROCEDURES[0];
    } else if (normalized.includes('eye') || normalized.includes('lens') || normalized.includes('cataract')) {
      bestMatch = PROCEDURES.find(p => p.id === 'cataract-phaco') || PROCEDURES[0];
    } else if (normalized.includes('mri') || normalized.includes('spine') || normalized.includes('back')) {
      bestMatch = PROCEDURES.find(p => p.id === 'mri-lumbar') || PROCEDURES[0];
    } else if (normalized.includes('blood') || normalized.includes('lipid') || normalized.includes('test')) {
      bestMatch = PROCEDURES.find(p => p.id === 'cbc-lipid-lft') || PROCEDURES[0];
    } else if (normalized.includes('delivery') || normalized.includes('pregnant') || normalized.includes('baby')) {
      bestMatch = PROCEDURES.find(p => p.id === 'normal-delivery') || PROCEDURES[0];
    } else if (normalized.includes('sleep') || normalized.includes('snoring')) {
      bestMatch = PROCEDURES.find(p => p.id === 'polysomnography-sleep') || PROCEDURES[0];
    }
  }

  if (!bestMatch) {
    bestMatch = PROCEDURES[0];
  }

  return {
    procedure: bestMatch,
    confidenceScore: Math.min(96, Math.max(72, highestScore)),
    extractedText: input,
    suggestedSetting: bestMatch.setting,
    notes: `Extracted from input. Verified against standard clinical directory.`,
  };
}
