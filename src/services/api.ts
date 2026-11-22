import { MedicalProcedure, HealthcareFacility, SchemeInfo, RealBillContribution } from '../types';
import { PROCEDURES } from '../data/procedures';
import { FACILITIES } from '../data/facilities';
import { SCHEMES } from '../data/schemes';
import { getVaultContributions, saveVaultContribution } from './vaultStorage';

export interface DatabaseStatus {
  status: 'healthy' | 'offline' | 'error';
  engine: string;
  databasePath: string;
  fileSizeBytes: number;
  fileSizeKb: string;
  tables: string[];
  rowCounts: Record<string, number>;
}

// 1. Check Database Health
export async function fetchDatabaseHealth(): Promise<DatabaseStatus | null> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) throw new Error('DB health check failed');
    return await res.json();
  } catch (err) {
    console.warn('API /api/health unavailable, using offline fallback:', err);
    return null;
  }
}

// 2. Fetch Procedures from Database
export async function fetchProceduresFromDb(): Promise<MedicalProcedure[]> {
  try {
    const res = await fetch('/api/procedures');
    if (!res.ok) throw new Error('Failed to fetch procedures from database');
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('Failed to load procedures from DB, falling back to local dataset:', err);
    return PROCEDURES;
  }
}

// 3. Fetch Facilities from Database
export async function fetchFacilitiesFromDb(regionId?: string): Promise<HealthcareFacility[]> {
  try {
    const url = regionId ? `/api/facilities?regionId=${encodeURIComponent(regionId)}` : '/api/facilities';
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch facilities from database');
    return await res.json();
  } catch (err) {
    console.warn('Failed to load facilities from DB, falling back to local dataset:', err);
    return regionId ? FACILITIES.filter(f => f.regionId === regionId) : FACILITIES;
  }
}

// 4. Fetch Public Schemes from Database
export async function fetchSchemesFromDb(): Promise<SchemeInfo[]> {
  try {
    const res = await fetch('/api/schemes');
    if (!res.ok) throw new Error('Failed to fetch schemes from database');
    return await res.json();
  } catch (err) {
    console.warn('Failed to load schemes from DB, falling back to local dataset:', err);
    return SCHEMES;
  }
}

// 5. Fetch Vault Submissions from Database
export async function fetchVaultBillsFromDb(): Promise<{ bills: RealBillContribution[]; totalCount: number }> {
  try {
    const res = await fetch('/api/vault');
    if (!res.ok) throw new Error('Failed to fetch vault bills from database');
    const data = await res.json();
    return {
      bills: data.bills,
      totalCount: data.totalCount
    };
  } catch (err) {
    console.warn('Failed to load vault bills from DB, falling back to local storage:', err);
    const local = getVaultContributions();
    return {
      bills: local,
      totalCount: local.length
    };
  }
}

// 6. Contribute Anonymized Bill to Database
export async function submitVaultBillToDb(
  bill: Omit<RealBillContribution, 'id' | 'submittedAt'>
): Promise<{ success: boolean; id: string; message: string }> {
  try {
    const res = await fetch('/api/vault', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bill)
    });

    if (res.ok) {
      const data = await res.json();
      // Also sync to local storage for offline redundancy
      saveVaultContribution(bill);
      return data;
    }
  } catch (err) {
    console.warn('Server offline, saving contribution to browser storage:', err);
  }

  // Fallback to local storage
  const saved = saveVaultContribution(bill);
  return {
    success: true,
    id: saved.id,
    message: 'Saved to local secure vault (offline cache synchronized).'
  };
}

// 7. Execute custom read-only SQL for database inspector
export async function executeSqlInspection(sql: string): Promise<{ success: boolean; count: number; rows: any[]; error?: string }> {
  try {
    const res = await fetch('/api/db/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sql })
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, count: 0, rows: [], error: err.message };
  }
}
