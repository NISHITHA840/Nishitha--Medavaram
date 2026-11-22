import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { db, initDatabase } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.resolve(__dirname, '../data/onevision.db');

export const app = express();

app.use(cors());
app.use(express.json());

// Initialize SQLite Schema & Seed
initDatabase();

// 1. Health & Database Inspection
app.get('/api/health', (req, res) => {
  try {
    const stats = fs.statSync(DB_PATH);
    const tables = db.prepare(`
      SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'
    `).all();

    const counts = {};
    for (const t of tables) {
      const c = db.prepare(`SELECT COUNT(*) as count FROM ${t.name}`).get();
      counts[t.name] = c.count;
    }

    res.json({
      status: 'healthy',
      engine: 'SQLite 3.53 (Node.js 24 native DatabaseSync)',
      databasePath: DB_PATH,
      fileSizeBytes: stats.size,
      fileSizeKb: (stats.size / 1024).toFixed(1),
      lastModified: stats.mtime,
      tables: tables.map(t => t.name),
      rowCounts: counts
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// 2. Get All Procedures (enriched with live SQLite vault statistics)
app.get('/api/procedures', (req, res) => {
  try {
    const procedures = db.prepare('SELECT * FROM procedures ORDER BY id').all();

    const enriched = procedures.map(p => {
      // Fetch rates
      const rates = db.prepare('SELECT * FROM procedure_rates WHERE procedure_id = ?').all(p.id);
      const ratesByRegion = {};
      for (const r of rates) {
        ratesByRegion[r.region_id] = {
          cghsNabhRate: r.cghs_nabh_rate,
          cghsNonNabhRate: r.cghs_non_nabh_rate,
          pmjayPackageRate: r.pmjay_package_rate,
          pmjayCode: r.pmjay_code,
          govtHospitalRange: [r.govt_min, r.govt_max],
          trustHospitalRange: [r.trust_min, r.trust_max],
          privateMidRange: [r.private_mid_min, r.private_mid_max],
          privateCorporateRange: [r.corporate_min, r.corporate_max]
        };
      }

      // Fetch breakdown
      const breakdownRows = db.prepare('SELECT * FROM procedure_breakdowns WHERE procedure_id = ?').all(p.id);
      const breakdown = breakdownRows.map(b => ({
        category: b.category,
        percentage: b.percentage,
        typicalAmountGovt: b.typical_amount_govt,
        typicalAmountPrivate: b.typical_amount_private,
        explanation: b.explanation
      }));

      // Calculate dynamic Vault Stats from SQLite bill_vault table for each region
      const regions = ['hyderabad', 'bengaluru', 'delhi', 'jaipur', 'mumbai'];
      const vaultStatsByRegion = {};

      for (const reg of regions) {
        const vaultRows = db.prepare(`
          SELECT billed_amount, bill_date
          FROM bill_vault
          WHERE procedure_id = ? AND region_id = ?
          ORDER BY billed_amount ASC
        `).all(p.id, reg);

        const n = vaultRows.length;
        if (n === 0) {
          vaultStatsByRegion[reg] = {
            sampleSize: 0,
            min: 0,
            median: 0,
            p75: 0,
            max: 0,
            lastUpdated: 'No bills yet',
            dataSourceDescription: `0 crowdsourced bills recorded in ${reg} database table.`,
            confidence: 'insufficient',
            insufficientReason: `No bills on file in SQLite database for ${reg}. First user contribution will initialize live statistical distribution.`
          };
        } else {
          const amounts = vaultRows.map(v => v.billed_amount);
          const min = amounts[0];
          const max = amounts[amounts.length - 1];
          const median = amounts[Math.floor(amounts.length / 2)];
          const p75 = amounts[Math.floor(amounts.length * 0.75)] || max;
          const lastDate = vaultRows[vaultRows.length - 1].bill_date;

          const isInsufficient = n < 5;
          vaultStatsByRegion[reg] = {
            sampleSize: n,
            min,
            median,
            p75,
            max,
            lastUpdated: lastDate,
            dataSourceDescription: `${n} verified bills queried live from SQLite table 'bill_vault'.`,
            confidence: isInsufficient ? 'insufficient' : 'high',
            insufficientReason: isInsufficient
              ? `Sample size is too small (N=${n} < 5 threshold) to calculate reliable statistical medians. Official CGHS/PM-JAY rate card baseline is displayed for reference.`
              : undefined
          };
        }
      }

      return {
        id: p.id,
        name: p.name,
        code: p.code,
        category: p.category,
        colloquialNames: JSON.parse(p.colloquial_names),
        description: p.description,
        setting: p.setting,
        typicalDuration: p.typical_duration,
        preparationAdvice: p.preparation_advice,
        isLowDataPilot: p.is_low_data_pilot === 1,
        ratesByRegion,
        breakdown,
        vaultStatsByRegion
      };
    });

    res.json(enriched);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Get All Facilities
app.get('/api/facilities', (req, res) => {
  try {
    const { regionId, type, district } = req.query;
    let query = 'SELECT * FROM facilities WHERE 1=1';
    const params = [];

    if (regionId) {
      query += ' AND region_id = ?';
      params.push(regionId);
    }
    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }
    if (district) {
      query += ' AND district = ?';
      params.push(district);
    }

    const rows = db.prepare(query).all(...params);
    const facilities = rows.map(r => ({
      id: r.id,
      name: r.name,
      type: r.type,
      regionId: r.region_id,
      district: r.district,
      address: r.address,
      pincode: r.pincode,
      phone: r.phone,
      opdTimings: r.opd_timings,
      hasAyushmanDesk: r.has_ayushman_desk === 1,
      hasEmergency24x7: r.has_emergency_24x7 === 1,
      hasFreeDiagnostics: r.has_free_diagnostics === 1,
      schemesEmpaneled: JSON.parse(r.schemes_empaneled),
      qualityBadges: JSON.parse(r.quality_badges),
      coordinates: { lat: r.lat, lng: r.lng },
      verifiedCostNotes: r.verified_cost_notes,
      procedureCostMultiplier: r.procedure_cost_multiplier
    }));

    res.json(facilities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Get Public Schemes
app.get('/api/schemes', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM schemes').all();
    const schemes = rows.map(r => ({
      id: r.id,
      name: r.name,
      codeName: r.code_name,
      sponsor: r.sponsor,
      regionId: r.region_id,
      coverageAmount: r.coverage_amount,
      description: r.description,
      criteria: JSON.parse(r.criteria),
      benefitsList: JSON.parse(r.benefits_list),
      documentChecklist: JSON.parse(r.document_checklist),
      officialHelpline: r.official_helpline,
      officialPortalUrl: r.official_portal_url,
      nearestEnquiryPoint: r.nearest_enquiry_point
    }));
    res.json(schemes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Get Real Bill Vault Submissions from SQLite
app.get('/api/vault', (req, res) => {
  try {
    const { procedureId, regionId } = req.query;
    let query = 'SELECT * FROM bill_vault WHERE 1=1';
    const params = [];

    if (procedureId) {
      query += ' AND procedure_id = ?';
      params.push(procedureId);
    }
    if (regionId) {
      query += ' AND region_id = ?';
      params.push(regionId);
    }

    query += ' ORDER BY submitted_at DESC';
    const rows = db.prepare(query).all(...params);

    const bills = rows.map(r => ({
      id: r.id,
      procedureId: r.procedure_id,
      procedureName: r.procedure_name,
      regionId: r.region_id,
      district: r.district,
      facilityType: r.facility_type,
      facilityNameAnonymized: r.facility_name_anonymized,
      billedAmount: r.billed_amount,
      billDate: r.bill_date,
      hasInsurance: r.has_insurance === 1,
      outOfPocketPaid: r.out_of_pocket_paid,
      consentGiven: r.consent_given === 1,
      redactedNotes: r.redacted_notes,
      submittedAt: r.submitted_at
    }));

    // Aggregate summary statistics directly in SQL
    const agg = db.prepare(`
      SELECT 
        COUNT(*) as total_bills,
        MIN(billed_amount) as min_billed,
        AVG(billed_amount) as avg_billed,
        MAX(billed_amount) as max_billed
      FROM bill_vault
    `).get();

    res.json({
      bills,
      totalCount: agg.total_bills,
      summary: {
        totalRecords: agg.total_bills,
        min: agg.min_billed,
        avg: Math.round(agg.avg_billed || 0),
        max: agg.max_billed
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Contribute Anonymized Bill to SQLite Database
app.post('/api/vault', (req, res) => {
  try {
    const {
      procedureId,
      procedureName,
      regionId,
      district,
      facilityType,
      facilityNameAnonymized,
      billedAmount,
      billDate,
      hasInsurance,
      outOfPocketPaid,
      consentGiven,
      redactedNotes
    } = req.body;

    if (!consentGiven) {
      return res.status(400).json({ error: 'Consent is mandatory before saving.' });
    }

    const id = `vault-db-${Date.now()}`;
    const submittedAt = new Date().toISOString();

    const insert = db.prepare(`
      INSERT INTO bill_vault (
        id, procedure_id, procedure_name, region_id, district,
        facility_type, facility_name_anonymized, billed_amount,
        bill_date, has_insurance, out_of_pocket_paid, consent_given,
        redacted_notes, submitted_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      id,
      procedureId,
      procedureName,
      regionId,
      district,
      facilityType,
      facilityNameAnonymized || 'Community Contributed Clinic',
      parseFloat(billedAmount) || 0,
      billDate || new Date().toISOString().split('T')[0],
      hasInsurance ? 1 : 0,
      parseFloat(outOfPocketPaid || billedAmount) || 0,
      consentGiven ? 1 : 0,
      redactedNotes || 'De-identified in browser',
      submittedAt
    );

    // Audit log
    db.prepare(`
      INSERT INTO audit_logs (action, metadata)
      VALUES (?, ?)
    `).run('CONTRIBUTE_BILL', JSON.stringify({ id, procedureId, regionId, amount: billedAmount }));

    res.status(201).json({
      success: true,
      id,
      message: 'Bill successfully recorded into SQLite Real Bill Vault.'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Interactive Database Inspector: Run read-only queries
app.post('/api/db/query', (req, res) => {
  try {
    const { sql } = req.body;
    if (!sql || typeof sql !== 'string') {
      return res.status(400).json({ error: 'SQL query required' });
    }

    const trimmed = sql.trim();
    if (!trimmed.toUpperCase().startsWith('SELECT') && !trimmed.toUpperCase().startsWith('PRAGMA')) {
      return res.status(403).json({ error: 'Security restriction: Only SELECT and PRAGMA read queries are permitted.' });
    }

    const results = db.prepare(trimmed).all();
    res.json({ success: true, count: results.length, rows: results });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
