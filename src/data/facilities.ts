import { HealthcareFacility } from '../types';

export const FACILITIES: HealthcareFacility[] = [
  // --- HYDERABAD & TELANGANA ---
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
    qualityBadges: [
      {
        id: 'PMJAY_Gold',
        label: 'PM-JAY Empaneled Apex Centre',
        authority: 'National Health Authority (NHA)',
        officialSourceUrl: 'https://hospitals.pmjay.gov.in',
        verifiedOn: '2026-08-15'
      }
    ],
    coordinates: { lat: 17.3713, lng: 78.4739 },
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
    qualityBadges: [
      {
        id: 'NABH_Full',
        label: 'NABH Accredited Hospital',
        authority: 'National Accreditation Board for Hospitals & Healthcare Providers (NABH)',
        officialSourceUrl: 'https://nabh.co/accreditedhospitals.aspx',
        verifiedOn: '2026-06-20'
      }
    ],
    coordinates: { lat: 17.4019, lng: 78.4552 },
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
      {
        id: 'NABL_Certified',
        label: 'NABL Accredited Medical Testing Lab',
        authority: 'National Accreditation Board for Testing and Calibration Laboratories (NABL)',
        officialSourceUrl: 'https://nabl-india.org/directory',
        verifiedOn: '2026-05-10'
      },
      {
        id: 'NABH_Full',
        label: 'NABH Certified Imaging Centre',
        authority: 'NABH MIS Portal',
        officialSourceUrl: 'https://nabh.co',
        verifiedOn: '2026-07-12'
      }
    ],
    coordinates: { lat: 17.3995, lng: 78.4831 },
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
      {
        id: 'NABH_Full',
        label: 'NABH 5th Edition Accredited Tertiary Centre',
        authority: 'National Accreditation Board for Hospitals',
        officialSourceUrl: 'https://nabh.co',
        verifiedOn: '2026-09-01'
      },
      {
        id: 'NABL_Certified',
        label: 'NABL Certified Pathology Laboratory',
        authority: 'NABL Quality Council of India',
        officialSourceUrl: 'https://nabl-india.org',
        verifiedOn: '2026-04-18'
      }
    ],
    coordinates: { lat: 17.4428, lng: 78.4984 },
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
    // Deliberately empty quality badges to test: "Only display quality indicators when their sources are available"
    qualityBadges: [],
    coordinates: { lat: 17.4938, lng: 78.3241 },
    verifiedCostNotes: 'Neighborhood nursing home. Does not hold third-party NABH accreditation. Offers affordable local cash-pay rates.',
    procedureCostMultiplier: 0.85
  },

  // --- BENGALURU & KARNATAKA ---
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
    qualityBadges: [
      {
        id: 'PMJAY_Gold',
        label: 'Ayushman Bharat AB-ArK State Hub',
        authority: 'Suvarna Arogya Suraksha Trust (SAST)',
        officialSourceUrl: 'https://arogya.karnataka.gov.in',
        verifiedOn: '2026-07-15'
      }
    ],
    coordinates: { lat: 12.9627, lng: 77.5753 },
    verifiedCostNotes: 'Government tertiary apex hospital. Tests and daycare procedures free under BPL Arogya Karnataka card with Suvarna referral.',
    procedureCostMultiplier: 0.05
  },
  {
    id: 'blr-st-johns-trust',
    name: 'St. John’s Medical College & Memorial Hospital',
    type: 'trust',
    regionId: 'bengaluru',
    district: 'Bengaluru South',
    address: 'Sarjapur Main Road, John Nagar, Koramangala, Bengaluru, Karnataka 560034',
    pincode: '560034',
    phone: '080-22065000',
    opdTimings: '08:00 AM - 04:30 PM (OPD)',
    hasAyushmanDesk: true,
    hasEmergency24x7: true,
    hasFreeDiagnostics: false,
    schemesEmpaneled: ['PM-JAY', 'Arogya Karnataka (AB-ArK)', 'CGHS'],
    qualityBadges: [
      {
        id: 'NABH_Full',
        label: 'NABH Accredited Teaching Hospital',
        authority: 'National Accreditation Board for Hospitals',
        officialSourceUrl: 'https://nabh.co',
        verifiedOn: '2026-05-30'
      },
      {
        id: 'NABL_Certified',
        label: 'NABL Accredited Central Pathology Laboratory',
        authority: 'NABL Quality Council of India',
        officialSourceUrl: 'https://nabl-india.org',
        verifiedOn: '2026-03-22'
      }
    ],
    coordinates: { lat: 12.9279, lng: 77.6189 },
    verifiedCostNotes: 'Non-profit Catholic medical institution with subsidized general ward pricing and concessions for financially challenged patients.',
    procedureCostMultiplier: 0.6
  },
  {
    id: 'blr-anand-diag',
    name: 'Anand Diagnostic Laboratory (Neuberg Group)',
    type: 'private_mid',
    regionId: 'bengaluru',
    district: 'Bengaluru Urban',
    address: '54, Bowring Hospital Road, Shivaji Nagar, Bengaluru, Karnataka 560001',
    pincode: '560001',
    phone: '080-25591082',
    opdTimings: '07:00 AM - 08:30 PM',
    hasAyushmanDesk: false,
    hasEmergency24x7: false,
    hasFreeDiagnostics: false,
    schemesEmpaneled: ['CGHS'],
    qualityBadges: [
      {
        id: 'NABL_Certified',
        label: 'NABL Accredited Diagnostic Network',
        authority: 'NABL India',
        officialSourceUrl: 'https://nabl-india.org',
        verifiedOn: '2026-08-10'
      }
    ],
    coordinates: { lat: 12.9818, lng: 77.6047 },
    verifiedCostNotes: 'ISO & NABL accredited lab with digital patient report portal. Fixed rates published on-site.',
    procedureCostMultiplier: 1.0
  },

  // --- DELHI-NCR ---
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
    qualityBadges: [
      {
        id: 'PMJAY_Gold',
        label: 'Central Govt Super Specialty Apex Centre',
        authority: 'Ministry of Health & Family Welfare',
        officialSourceUrl: 'https://mohfw.gov.in',
        verifiedOn: '2026-06-15'
      }
    ],
    coordinates: { lat: 28.5684, lng: 77.2069 },
    verifiedCostNotes: 'Central government institution. Outpatient consultations, imaging, pathology, and institutional deliveries are completely free under MoHFW guidelines.',
    procedureCostMultiplier: 0.05
  },
  {
    id: 'del-holy-family-trust',
    name: 'Holy Family Hospital (Okhla)',
    type: 'trust',
    regionId: 'delhi',
    district: 'South Delhi',
    address: 'Okhla Road, Jamia Nagar, New Delhi, Delhi 110025',
    pincode: '110025',
    phone: '011-26845201',
    opdTimings: '08:30 AM - 05:00 PM',
    hasAyushmanDesk: true,
    hasEmergency24x7: true,
    hasFreeDiagnostics: false,
    schemesEmpaneled: ['PM-JAY', 'CGHS', 'ECHS'],
    qualityBadges: [
      {
        id: 'NABH_Full',
        label: 'NABH Accredited Charitable Hospital',
        authority: 'NABH India',
        officialSourceUrl: 'https://nabh.co',
        verifiedOn: '2026-04-12'
      }
    ],
    coordinates: { lat: 28.5619, lng: 77.2798 },
    verifiedCostNotes: 'Faith-based non-profit multi-specialty institution known for subsidized maternal and general surgery care.',
    procedureCostMultiplier: 0.65
  },
  {
    id: 'del-lalpath-diag',
    name: 'Dr. Lal PathLabs National Reference Lab',
    type: 'private_mid',
    regionId: 'delhi',
    district: 'West Delhi',
    address: 'Block E, Sector 18, Rohini, New Delhi, Delhi 110085',
    pincode: '110085',
    phone: '011-39885050',
    opdTimings: '07:30 AM - 08:30 PM',
    hasAyushmanDesk: false,
    hasEmergency24x7: false,
    hasFreeDiagnostics: false,
    schemesEmpaneled: ['CGHS', 'Delhi Arogya Kosh (Empaneled Diagnostic)'],
    qualityBadges: [
      {
        id: 'NABL_Certified',
        label: 'NABL Accredited & CAP Certified Reference Lab',
        authority: 'National Accreditation Board for Testing and Calibration Laboratories',
        officialSourceUrl: 'https://nabl-india.org',
        verifiedOn: '2026-09-14'
      }
    ],
    coordinates: { lat: 28.7183, lng: 77.1264 },
    verifiedCostNotes: 'Empaneled under Delhi Govt Free Diagnostic Scheme for referred patients from Delhi Government dispensaries and Mohalla Clinics.',
    procedureCostMultiplier: 0.95
  },

  // --- JAIPUR & RAJASTHAN ---
  {
    id: 'jpr-sms-govt',
    name: 'Sawai Man Singh (SMS) Medical College & Hospital',
    type: 'govt',
    regionId: 'jaipur',
    district: 'Jaipur Urban',
    address: 'JLN Marg, Ashok Nagar, Jaipur, Rajasthan 302004',
    pincode: '302004',
    phone: '0141-2560291',
    opdTimings: '08:00 AM - 02:00 PM (OPD), 24x7 Casualty',
    hasAyushmanDesk: true,
    hasEmergency24x7: true,
    hasFreeDiagnostics: true,
    schemesEmpaneled: ['PM-JAY', 'Mukhyamantri Ayushman Arogya (Chiranjeevi)', 'RGHS'],
    qualityBadges: [
      {
        id: 'PMJAY_Gold',
        label: 'State Apex Medical College Hub',
        authority: 'Rajasthan State Health Assurance Agency',
        officialSourceUrl: 'https://health.rajasthan.gov.in',
        verifiedOn: '2026-05-18'
      }
    ],
    coordinates: { lat: 26.8998, lng: 75.8166 },
    verifiedCostNotes: 'All outdoor and indoor treatments, medicines (Nirogi Rajasthan), and diagnostics are provided 100% free for Rajasthan Jan Aadhaar holders.',
    procedureCostMultiplier: 0.05
  },

  // --- MUMBAI & MAHARASHTRA ---
  {
    id: 'mum-kem-govt',
    name: 'King Edward Memorial (KEM) Hospital & Seth GS Medical College',
    type: 'govt',
    regionId: 'mumbai',
    district: 'Mumbai City',
    address: 'Acharya Donde Marg, Parel, Mumbai, Maharashtra 400012',
    pincode: '400012',
    phone: '022-24107000',
    opdTimings: '08:00 AM - 12:30 PM (OPD), 24x7 Emergency',
    hasAyushmanDesk: true,
    hasEmergency24x7: true,
    hasFreeDiagnostics: true,
    schemesEmpaneled: ['PM-JAY', 'Mahatma Jyotirao Phule Jan Arogya (MJPJAY)', 'CGHS'],
    qualityBadges: [
      {
        id: 'PMJAY_Gold',
        label: 'Apex Municipal Teaching Hospital',
        authority: 'Brihanmumbai Municipal Corporation (BMC)',
        officialSourceUrl: 'https://mcgm.gov.in',
        verifiedOn: '2026-08-20'
      }
    ],
    coordinates: { lat: 19.0028, lng: 72.8428 },
    verifiedCostNotes: 'Municipal teaching hospital offering heavily subsidized care and cashless packages for MJPJAY ration card categories.',
    procedureCostMultiplier: 0.05
  }
];

// Helper to calculate approximate distance based on target district coordinates
export function calculateDistanceKm(
  facility: HealthcareFacility,
  userDistrict: string
): number {
  // Approximate centroid coordinates for common pilot districts
  const districtCentroids: Record<string, { lat: number; lng: number }> = {
    'Hyderabad Urban': { lat: 17.3850, lng: 78.4867 },
    'Rangareddy': { lat: 17.4399, lng: 78.3392 },
    'Medchal-Malkajgiri': { lat: 17.5169, lng: 78.5447 },
    'Sangareddy': { lat: 17.6190, lng: 78.0816 },
    'Bengaluru Urban': { lat: 12.9716, lng: 77.5946 },
    'Bengaluru South': { lat: 12.9141, lng: 77.6101 },
    'Bengaluru North': { lat: 13.0358, lng: 77.5970 },
    'Bengaluru Rural': { lat: 13.2847, lng: 77.5802 },
    'South Delhi': { lat: 28.5355, lng: 77.2005 },
    'Central Delhi': { lat: 28.6448, lng: 77.2167 },
    'West Delhi': { lat: 28.6663, lng: 77.0674 },
    'Noida-Gautam Buddha Nagar': { lat: 28.5355, lng: 77.3910 },
    'Gurugram': { lat: 28.4595, lng: 77.0266 },
    'Jaipur Urban': { lat: 26.9124, lng: 75.7873 },
    'Jaipur Rural': { lat: 26.9855, lng: 75.9234 },
    'Dausa': { lat: 26.8924, lng: 76.3375 },
    'Mumbai City': { lat: 18.9388, lng: 72.8354 },
    'Mumbai Suburban': { lat: 19.1136, lng: 72.8697 },
    'Thane': { lat: 19.2183, lng: 72.9781 },
    'Navi Mumbai': { lat: 19.0330, lng: 73.0297 }
  };

  const center = districtCentroids[userDistrict] || { lat: facility.coordinates.lat - 0.05, lng: facility.coordinates.lng - 0.05 };
  
  // Haversine formula
  const R = 6371; // Earth radius in km
  const dLat = (facility.coordinates.lat - center.lat) * (Math.PI / 180);
  const dLng = (facility.coordinates.lng - center.lng) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(center.lat * (Math.PI / 180)) *
      Math.cos(facility.coordinates.lat * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  // Round to 1 decimal place with a minimum of 0.8 km
  return Math.max(0.8, Math.round(d * 10) / 10);
}
