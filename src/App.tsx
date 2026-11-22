import React, { useState } from 'react';
import { 
  Calculator, 
  Building2, 
  ShieldCheck, 
  HeartHandshake, 
  HelpCircle, 
  Sparkles, 
  FilePlus, 
  Wifi, 
  PhoneCall, 
  ShieldAlert,
  ArrowRight,
  RotateCcw,
  Database
} from 'lucide-react';

import { LanguageCode, MedicalProcedure, PilotRegion } from './types';
import { PILOT_REGIONS } from './data/regions';
import { PROCEDURES } from './data/procedures';
import { TRANSLATIONS } from './i18n/translations';
import { getVaultContributions } from './services/vaultStorage';
import { fetchVaultBillsFromDb, fetchProceduresFromDb } from './services/api';

import { Header } from './components/Header';
import { CareNeedInput } from './components/CareNeedInput';
import { CostEstimator } from './components/CostEstimator';
import { FacilityExplorer } from './components/FacilityExplorer';
import { SchemeChecker } from './components/SchemeChecker';
import { BillVaultModal } from './components/BillVaultModal';
import { TrustDisclaimerModal } from './components/TrustDisclaimerModal';
import { DatabaseModal } from './components/DatabaseModal';

export function App() {
  // Global App States
  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');
  const [selectedRegion, setSelectedRegion] = useState<PilotRegion>(PILOT_REGIONS[0]);
  const [userDistrict, setUserDistrict] = useState<string>(PILOT_REGIONS[0].defaultDistrict);
  
  // Selected procedure for cost & facilities navigation
  const [selectedProcedure, setSelectedProcedure] = useState<MedicalProcedure>(PROCEDURES[0]);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'cost' | 'facilities' | 'schemes' | 'vault'>('cost');

  // Accessibility States
  const [isLargeText, setIsLargeText] = useState<boolean>(false);
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);

  // Modals
  const [isVaultModalOpen, setIsVaultModalOpen] = useState<boolean>(false);
  const [isTrustModalOpen, setIsTrustModalOpen] = useState<boolean>(false);
  const [isDatabaseModalOpen, setIsDatabaseModalOpen] = useState<boolean>(false);

  // Live vault contributions count & list synced with SQLite
  const [vaultCount, setVaultCount] = useState<number>(() => getVaultContributions().length);
  const [vaultBillsList, setVaultBillsList] = useState<any[]>(() => getVaultContributions());

  const t = TRANSLATIONS[currentLang];

  // Sync with SQLite on load
  React.useEffect(() => {
    fetchVaultBillsFromDb().then(data => {
      if (data && data.bills) {
        setVaultBillsList(data.bills);
        setVaultCount(data.totalCount);
      }
    });
  }, []);

  // Callback when a procedure is confirmed from the input step
  const handleSelectProcedure = (procedure: MedicalProcedure, district: string) => {
    setSelectedProcedure(procedure);
    setUserDistrict(district);
    setActiveTab('cost');
    // Scroll smoothly to cost section
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleRegionChange = (newRegion: PilotRegion) => {
    setSelectedRegion(newRegion);
    setUserDistrict(newRegion.defaultDistrict);
  };

  const refreshVaultCount = () => {
    fetchVaultBillsFromDb().then(data => {
      if (data && data.bills) {
        setVaultBillsList(data.bills);
        setVaultCount(data.totalCount);
      }
    });
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors ${
      isHighContrast ? 'bg-black text-yellow-300' : 'bg-slate-50 text-slate-800'
    } ${isLargeText ? 'text-base font-medium' : 'text-sm'}`}>
      
      {/* Universal Header with Lang & Region Selectors */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        selectedRegion={selectedRegion}
        onRegionChange={handleRegionChange}
        isLargeText={isLargeText}
        onToggleLargeText={() => setIsLargeText(!isLargeText)}
        isHighContrast={isHighContrast}
        onToggleHighContrast={() => setIsHighContrast(!isHighContrast)}
        onOpenDatabaseModal={() => setIsDatabaseModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 space-y-6">
        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <nav className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('cost')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'cost'
                  ? isHighContrast ? 'bg-yellow-400 text-black shadow' : 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>{t.tabs.findCost}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('facilities')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'facilities'
                  ? isHighContrast ? 'bg-yellow-400 text-black shadow' : 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>{t.tabs.facilities}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('schemes')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'schemes'
                  ? isHighContrast ? 'bg-yellow-400 text-black shadow' : 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t.tabs.schemes}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('vault')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'vault'
                  ? isHighContrast ? 'bg-yellow-400 text-black shadow' : 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <HeartHandshake className="w-4 h-4" />
              <span>{t.tabs.vault}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                {vaultCount} Bills
              </span>
            </button>
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsDatabaseModalOpen(true)}
              title="Inspect SQLite Database & Relational Schema"
              className="px-3 py-2 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 hover:bg-blue-100 flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Database className="w-4 h-4 text-blue-600" />
              <span className="hidden sm:inline">SQLite DB</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </button>

            <button
              type="button"
              onClick={() => setIsVaultModalOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 flex items-center gap-1.5 shadow-sm transition-all"
            >
              <FilePlus className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">{t.vaultSection.contributeBtn}</span>
              <span className="sm:hidden">Share Bill</span>
            </button>

            <button
              type="button"
              onClick={() => setIsTrustModalOpen(true)}
              title="View Non-Diagnostic & Privacy Charter"
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-200 flex items-center gap-1 transition-all"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden md:inline">Trust & Charter</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Cost Estimation Flow */}
        {activeTab === 'cost' && (
          <div className="space-y-8">
            {/* MVP Scope 1: Describe or Scan Care Need */}
            <CareNeedInput
              currentLang={currentLang}
              selectedRegion={selectedRegion}
              onSelectProcedure={handleSelectProcedure}
              isHighContrast={isHighContrast}
            />

            {/* MVP Scope 2: Estimate Likely Costs */}
            <div id="cost-results-anchor">
              <CostEstimator
                currentLang={currentLang}
                procedure={selectedProcedure}
                selectedRegion={selectedRegion}
                userDistrict={userDistrict}
                isHighContrast={isHighContrast}
                onExploreFacilities={() => setActiveTab('facilities')}
                onCheckSchemes={() => setActiveTab('schemes')}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Nearby Care Facilities */}
        {activeTab === 'facilities' && (
          <FacilityExplorer
            currentLang={currentLang}
            selectedRegion={selectedRegion}
            userDistrict={userDistrict}
            selectedProcedure={selectedProcedure}
            isHighContrast={isHighContrast}
          />
        )}

        {/* Tab 3: Scheme Eligibility Checker */}
        {activeTab === 'schemes' && (
          <SchemeChecker
            currentLang={currentLang}
            selectedRegion={selectedRegion}
            isHighContrast={isHighContrast}
          />
        )}

        {/* Tab 4: Real Bill Vault Community Table */}
        {activeTab === 'vault' && (
          <div className="space-y-6 animate-fadeIn">
            <div className={`p-6 rounded-2xl border ${
              isHighContrast 
                ? 'bg-black text-yellow-300 border-yellow-400' 
                : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <HeartHandshake className="w-5 h-5 text-emerald-600" />
                    {t.vaultSection.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {t.vaultSection.subtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsVaultModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center gap-1.5 transition-all"
                >
                  <FilePlus className="w-4 h-4" />
                  <span>{t.vaultSection.contributeBtn}</span>
                </button>
              </div>

              {/* Verified Submissions Table */}
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Procedure</th>
                      <th className="p-3">Region / District</th>
                      <th className="p-3">Facility Type</th>
                      <th className="p-3">Amount Billed</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Client Privacy Masking</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {(vaultBillsList.length > 0 ? vaultBillsList : getVaultContributions()).map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                        <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">
                          {item.procedureName}
                        </td>
                        <td className="p-3 text-slate-600 dark:text-slate-400">
                          {item.district} ({item.regionId})
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 capitalize">
                            {item.facilityType.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="p-3 font-extrabold text-emerald-700 dark:text-emerald-400">
                          ₹{item.billedAmount.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3 text-slate-500 font-mono text-[11px]">
                          {item.billDate}
                        </td>
                        <td className="p-3 text-[11px] text-slate-500 italic max-w-xs truncate">
                          {item.redactedNotes || 'Personal identity scrubbed'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Trust & Privacy Disclaimer Banner at Bottom */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center md:justify-start gap-1.5">
              <ShieldAlert className="w-4 h-4 text-emerald-600" />
              <span>OneVision Pilot Navigation App • Independent & Non-Commercial</span>
            </p>
            <p className="text-[11px] text-slate-400 max-w-2xl">
              Figures are indicative benchmarks derived from CGHS 2023 rate circulars and crowdsourced anonymous receipts. OneVision does not provide medical diagnoses or guarantee treatment fees.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
              <Wifi className="w-3.5 h-3.5" /> Offline-Ready PWA
            </span>
            <button 
              type="button"
              onClick={() => setIsTrustModalOpen(true)}
              className="text-slate-600 hover:text-emerald-600 underline font-semibold"
            >
              Privacy & Trust Charter
            </button>
            <a 
              href="https://mera.pmjay.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-emerald-600 underline font-semibold"
            >
              PM-JAY Portal
            </a>
          </div>
        </div>
      </footer>

      {/* Bill Contribution Modal */}
      <BillVaultModal
        isOpen={isVaultModalOpen}
        onClose={() => setIsVaultModalOpen(false)}
        currentLang={currentLang}
        selectedRegion={selectedRegion}
        initialProcedure={selectedProcedure}
        isHighContrast={isHighContrast}
        onContributionAdded={refreshVaultCount}
      />

      {/* Trust & Privacy Charter Modal */}
      <TrustDisclaimerModal
        isOpen={isTrustModalOpen}
        onClose={() => setIsTrustModalOpen(false)}
        currentLang={currentLang}
        isHighContrast={isHighContrast}
      />

      {/* SQLite Database & Schema Inspector Modal */}
      <DatabaseModal
        isOpen={isDatabaseModalOpen}
        onClose={() => setIsDatabaseModalOpen(false)}
        isHighContrast={isHighContrast}
      />
    </div>
  );
}
