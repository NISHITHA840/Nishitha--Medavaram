import React, { useState, useEffect } from 'react';
import { 
  Database, 
  X, 
  RefreshCw, 
  Table, 
  Terminal, 
  CheckCircle2, 
  HardDrive, 
  Play, 
  Layers, 
  Lock,
  Server
} from 'lucide-react';
import { DatabaseStatus, fetchDatabaseHealth, executeSqlInspection } from '../services/api';

interface DatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  isHighContrast: boolean;
}

export const DatabaseModal: React.FC<DatabaseModalProps> = ({
  isOpen,
  onClose,
  isHighContrast
}) => {
  const [dbStatus, setDbStatus] = useState<DatabaseStatus | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // SQL Query Runner state
  const [activeQuery, setActiveQuery] = useState<string>(
    'SELECT procedure_name, region_id, district, billed_amount, bill_date, facility_type FROM bill_vault ORDER BY billed_amount DESC'
  );
  const [queryResults, setQueryResults] = useState<{ count: number; rows: any[] } | null>(null);
  const [queryError, setQueryError] = useState<string | null>(null);
  const [isRunningQuery, setIsRunningQuery] = useState<boolean>(false);

  const queryPresets = [
    {
      label: 'Real Bill Vault Records',
      sql: 'SELECT procedure_name, region_id, district, billed_amount, bill_date, facility_type FROM bill_vault ORDER BY submitted_at DESC'
    },
    {
      label: 'Vault Aggregates (AVG, MIN, MAX)',
      sql: 'SELECT COUNT(*) as total_bills, ROUND(AVG(billed_amount)) as avg_amount, MIN(billed_amount) as min_amount, MAX(billed_amount) as max_amount FROM bill_vault'
    },
    {
      label: 'Procedures Catalog',
      sql: 'SELECT id, name, category, setting, typical_duration, is_low_data_pilot FROM procedures'
    },
    {
      label: 'Rate Cards Sample',
      sql: 'SELECT procedure_id, region_id, cghs_nabh_rate, pmjay_package_rate, private_mid_min, private_mid_max FROM procedure_rates LIMIT 8'
    },
    {
      label: 'Healthcare Facilities',
      sql: 'SELECT id, name, type, district, phone, has_ayushman_desk FROM facilities'
    }
  ];

  const refreshHealth = async () => {
    setIsLoading(true);
    const data = await fetchDatabaseHealth();
    setDbStatus(data);
    setIsLoading(false);
  };

  const handleRunQuery = async (sqlToRun?: string) => {
    const q = sqlToRun || activeQuery;
    setIsRunningQuery(true);
    setQueryError(null);
    const res = await executeSqlInspection(q);
    setIsRunningQuery(false);

    if (res.success) {
      setQueryResults({ count: res.count, rows: res.rows });
    } else {
      setQueryError(res.error || 'Failed to execute query');
      setQueryResults(null);
    }
  };

  useEffect(() => {
    if (isOpen) {
      refreshHealth();
      handleRunQuery(activeQuery);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className={`w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden max-h-[92vh] flex flex-col ${
        isHighContrast 
          ? 'bg-black text-yellow-300 border-yellow-400' 
          : 'bg-white text-slate-800 border-slate-200 dark:bg-slate-900 dark:border-slate-800'
      }`}>
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                  SQLite Database & Schema Architecture
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Live Persistent
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Native SQLite engine powered by Node.js 24 • Zero external daemon required
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={refreshHealth}
              disabled={isLoading}
              title="Refresh database status"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* Metadata Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                <Server className="w-3.5 h-3.5 text-blue-600" /> Database Engine
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1 block">
                {dbStatus?.engine || 'SQLite 3.53'}
              </span>
              <span className="text-[10px] text-slate-400">WAL mode & Foreign Keys</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                <HardDrive className="w-3.5 h-3.5 text-emerald-600" /> Database File Size
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1 block">
                {dbStatus?.fileSizeKb ? `${dbStatus.fileSizeKb} KB` : 'Active on Disk'}
              </span>
              <span className="text-[10px] text-slate-400">data/onevision.db</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                <Table className="w-3.5 h-3.5 text-purple-600" /> Active Tables
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1 block">
                {dbStatus?.tables?.length || 7} Relational Tables
              </span>
              <span className="text-[10px] text-slate-400">Indexed schema</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-amber-600" /> Total Rows
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1 block">
                {dbStatus?.rowCounts 
                  ? Object.values(dbStatus.rowCounts).reduce((a, b) => a + b, 0)
                  : 'Seeded & Synced'}
              </span>
              <span className="text-[10px] text-slate-400">Procedures, Rates, Facilities</span>
            </div>
          </div>

          {/* Table Breakdown Badges */}
          {dbStatus?.rowCounts && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-2 flex items-center gap-1.5">
                <Table className="w-3.5 h-3.5 text-emerald-600" />
                Live Table Records in SQLite Database:
              </span>
              <div className="flex flex-wrap gap-2">
                {Object.entries(dbStatus.rowCounts).map(([tbl, cnt]) => (
                  <div key={tbl} className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                    <span className="font-mono text-slate-600 dark:text-slate-400 font-semibold">{tbl}</span>
                    <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[10px]">
                      {cnt}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive SQL Query Console */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-emerald-600" />
                Interactive SQL Query Console (SELECT only):
              </span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Lock className="w-3 h-3 text-slate-400" />
                Read-only sandbox guard enabled
              </span>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-1.5">
              {queryPresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveQuery(preset.sql);
                    handleRunQuery(preset.sql);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all ${
                    activeQuery === preset.sql
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* SQL Input Box */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={activeQuery}
                  onChange={(e) => setActiveQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRunQuery();
                  }}
                  placeholder="Enter custom SQL query (e.g. SELECT * FROM bill_vault)"
                  className="w-full font-mono text-xs p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-900 text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRunQuery()}
                disabled={isRunningQuery}
                className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-sm transition-all shrink-0"
              >
                <Play className={`w-3.5 h-3.5 ${isRunningQuery ? 'animate-spin' : ''}`} />
                <span>Execute SQL</span>
              </button>
            </div>

            {/* Error or Results Table */}
            {queryError && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 text-red-700 dark:text-red-300 text-xs">
                {queryError}
              </div>
            )}

            {queryResults && (
              <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
                <div className="bg-slate-50 dark:bg-slate-800 px-3 py-2 border-b border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-500 flex items-center justify-between">
                  <span>Returned {queryResults.count} records</span>
                  <span className="font-mono text-emerald-600">SQLite 3.53 Engine</span>
                </div>

                <div className="max-h-64 overflow-x-auto overflow-y-auto">
                  {queryResults.rows.length === 0 ? (
                    <div className="p-4 text-center text-slate-400 text-xs">No records matched.</div>
                  ) : (
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 sticky top-0 text-[10px]">
                        <tr>
                          {Object.keys(queryResults.rows[0]).map((key) => (
                            <th key={key} className="p-2 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap">
                              {key}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {queryResults.rows.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                            {Object.values(row).map((val: any, j) => (
                              <td key={j} className="p-2 whitespace-nowrap text-slate-800 dark:text-slate-200 text-[11px]">
                                {val === null ? <span className="text-slate-400 italic">null</span> : String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Relational SQLite active with transactional integrity</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white dark:bg-slate-100 dark:text-black hover:bg-slate-800"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
