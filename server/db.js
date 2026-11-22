import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';
import { SEED_PROCEDURES, SEED_FACILITIES, SEED_SCHEMES, SEED_BILLS } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const DB_PATH = path.join(DATA_DIR, 'onevision.db');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export const db = new DatabaseSync(DB_PATH);

// Enable WAL mode & foreign keys for high performance & relational integrity
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;
`);

export function initDatabase() {
  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS db_metadata (
      key TEXT PRIMARY KEY,
      value TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS procedures (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      code TEXT NOT NULL,
      category TEXT NOT NULL,
      colloquial_names TEXT NOT NULL, -- JSON array
      description TEXT NOT NULL,
      setting TEXT NOT NULL,
      typical_duration TEXT NOT NULL,
      preparation_advice TEXT NOT NULL,
      is_low_data_pilot INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS procedure_rates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      procedure_id TEXT NOT NULL,
      region_id TEXT NOT NULL,
      cghs_nabh_rate REAL NOT NULL,
      cghs_non_nabh_rate REAL NOT NULL,
      pmjay_package_rate REAL NOT NULL,
      pmjay_code TEXT,
      govt_min REAL NOT NULL,
      govt_max REAL NOT NULL,
      trust_min REAL NOT NULL,
      trust_max REAL NOT NULL,
      private_mid_min REAL NOT NULL,
      private_mid_max REAL NOT NULL,
      corporate_min REAL NOT NULL,
      corporate_max REAL NOT NULL,
      FOREIGN KEY (procedure_id) REFERENCES procedures(id) ON DELETE CASCADE,
      UNIQUE(procedure_id, region_id)
    );

    CREATE TABLE IF NOT EXISTS procedure_breakdowns (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      procedure_id TEXT NOT NULL,
      category TEXT NOT NULL,
      percentage REAL NOT NULL,
      typical_amount_govt REAL NOT NULL,
      typical_amount_private REAL NOT NULL,
      explanation TEXT NOT NULL,
      FOREIGN KEY (procedure_id) REFERENCES procedures(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS facilities (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      region_id TEXT NOT NULL,
      district TEXT NOT NULL,
      address TEXT NOT NULL,
      pincode TEXT NOT NULL,
      phone TEXT NOT NULL,
      opd_timings TEXT NOT NULL,
      has_ayushman_desk INTEGER NOT NULL DEFAULT 0,
      has_emergency_24x7 INTEGER NOT NULL DEFAULT 0,
      has_free_diagnostics INTEGER NOT NULL DEFAULT 0,
      schemes_empaneled TEXT NOT NULL, -- JSON array
      quality_badges TEXT NOT NULL, -- JSON array
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      verified_cost_notes TEXT,
      procedure_cost_multiplier REAL NOT NULL DEFAULT 1.0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS schemes (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      code_name TEXT NOT NULL,
      sponsor TEXT NOT NULL,
      region_id TEXT,
      coverage_amount REAL NOT NULL,
      description TEXT NOT NULL,
      criteria TEXT NOT NULL, -- JSON object
      benefits_list TEXT NOT NULL, -- JSON array
      document_checklist TEXT NOT NULL, -- JSON array
      official_helpline TEXT NOT NULL,
      official_portal_url TEXT NOT NULL,
      nearest_enquiry_point TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS bill_vault (
      id TEXT PRIMARY KEY,
      procedure_id TEXT NOT NULL,
      procedure_name TEXT NOT NULL,
      region_id TEXT NOT NULL,
      district TEXT NOT NULL,
      facility_type TEXT NOT NULL,
      facility_name_anonymized TEXT NOT NULL,
      billed_amount REAL NOT NULL,
      bill_date TEXT NOT NULL,
      has_insurance INTEGER DEFAULT 0,
      out_of_pocket_paid REAL NOT NULL,
      consent_given INTEGER NOT NULL,
      redacted_notes TEXT,
      submitted_at TEXT NOT NULL,
      FOREIGN KEY (procedure_id) REFERENCES procedures(id)
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      action TEXT NOT NULL,
      metadata TEXT,
      ip_hash TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Performance & Query Indexes
    CREATE INDEX IF NOT EXISTS idx_proc_category ON procedures(category);
    CREATE INDEX IF NOT EXISTS idx_rates_region ON procedure_rates(region_id);
    CREATE INDEX IF NOT EXISTS idx_facilities_region ON facilities(region_id, district);
    CREATE INDEX IF NOT EXISTS idx_vault_proc_region ON bill_vault(procedure_id, region_id);
    CREATE INDEX IF NOT EXISTS idx_vault_date ON bill_vault(bill_date);
  `);

  // Check if initial seeding is required
  const check = db.prepare('SELECT COUNT(*) as count FROM procedures').get();
  if (check.count === 0) {
    seedDatabase();
  }
}

function seedDatabase() {
  console.log('[SQLite DB] Initializing tables and seeding initial medical records...');

  // 1. Seed Procedures & Rates
  const procInsert = db.prepare(`
    INSERT INTO procedures (
      id, name, code, category, colloquial_names, description,
      setting, typical_duration, preparation_advice, is_low_data_pilot
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const rateInsert = db.prepare(`
    INSERT INTO procedure_rates (
      procedure_id, region_id, cghs_nabh_rate, cghs_non_nabh_rate,
      pmjay_package_rate, pmjay_code, govt_min, govt_max, trust_min,
      trust_max, private_mid_min, private_mid_max, corporate_min, corporate_max
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const breakdownInsert = db.prepare(`
    INSERT INTO procedure_breakdowns (
      procedure_id, category, percentage, typical_amount_govt,
      typical_amount_private, explanation
    ) VALUES (?, ?, ?, ?, ?, ?)
  `);

  for (const proc of SEED_PROCEDURES) {
    procInsert.run(
      proc.id,
      proc.name,
      proc.code,
      proc.category,
      JSON.stringify(proc.colloquialNames),
      proc.description,
      proc.setting,
      proc.typicalDuration,
      proc.preparationAdvice,
      proc.isLowDataPilot ? 1 : 0
    );

    for (const [regionId, rate] of Object.entries(proc.rates)) {
      rateInsert.run(
        proc.id,
        regionId,
        rate.cghsNabhRate,
        rate.cghsNonNabhRate,
        rate.pmjayPackageRate,
        rate.pmjayCode || null,
        rate.govt[0],
        rate.govt[1],
        rate.trust[0],
        rate.trust[1],
        rate.mid[0],
        rate.mid[1],
        rate.corp[0],
        rate.corp[1]
      );
    }

    for (const b of proc.breakdown) {
      breakdownInsert.run(
        proc.id,
        b.category,
        b.percentage,
        b.govt,
        b.private,
        b.explanation
      );
    }
  }

  // 2. Seed Facilities
  const facInsert = db.prepare(`
    INSERT INTO facilities (
      id, name, type, region_id, district, address, pincode,
      phone, opd_timings, has_ayushman_desk, has_emergency_24x7,
      has_free_diagnostics, schemes_empaneled, quality_badges,
      lat, lng, verified_cost_notes, procedure_cost_multiplier
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const f of SEED_FACILITIES) {
    facInsert.run(
      f.id,
      f.name,
      f.type,
      f.regionId,
      f.district,
      f.address,
      f.pincode,
      f.phone,
      f.opdTimings,
      f.hasAyushmanDesk ? 1 : 0,
      f.hasEmergency24x7 ? 1 : 0,
      f.hasFreeDiagnostics ? 1 : 0,
      JSON.stringify(f.schemesEmpaneled),
      JSON.stringify(f.qualityBadges),
      f.lat,
      f.lng,
      f.verifiedCostNotes || null,
      f.procedureCostMultiplier
    );
  }

  // 3. Seed Schemes
  const schemeInsert = db.prepare(`
    INSERT INTO schemes (
      id, name, code_name, sponsor, region_id, coverage_amount,
      description, criteria, benefits_list, document_checklist,
      official_helpline, official_portal_url, nearest_enquiry_point
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const s of SEED_SCHEMES) {
    schemeInsert.run(
      s.id,
      s.name,
      s.codeName,
      s.sponsor,
      s.regionId || null,
      s.coverageAmount,
      s.description,
      JSON.stringify(s.criteria),
      JSON.stringify(s.benefitsList),
      JSON.stringify(s.documentChecklist),
      s.officialHelpline,
      s.officialPortalUrl,
      s.nearestEnquiryPoint
    );
  }

  // 4. Seed Bill Vault
  const vaultInsert = db.prepare(`
    INSERT INTO bill_vault (
      id, procedure_id, procedure_name, region_id, district,
      facility_type, facility_name_anonymized, billed_amount,
      bill_date, has_insurance, out_of_pocket_paid, consent_given,
      redacted_notes, submitted_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const b of SEED_BILLS) {
    vaultInsert.run(
      b.id,
      b.procedureId,
      b.procedureName,
      b.regionId,
      b.district,
      b.facilityType,
      b.facilityNameAnonymized,
      b.billedAmount,
      b.billDate,
      b.hasInsurance,
      b.outOfPocketPaid,
      b.consentGiven,
      b.redactedNotes,
      b.submittedAt
    );
  }

  // 5. Record metadata
  db.prepare(`
    INSERT OR REPLACE INTO db_metadata (key, value)
    VALUES ('schema_version', '1.0.0'), ('seeded_at', datetime('now'))
  `).run();

  console.log('[SQLite DB] Seed complete! Active database ready at data/onevision.db');
}
