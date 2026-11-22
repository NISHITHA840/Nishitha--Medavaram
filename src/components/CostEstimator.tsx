import React from 'react';
import { 
  IndianRupee, 
  Building2, 
  ShieldCheck, 
  FileSpreadsheet, 
  Info, 
  AlertTriangle, 
  Calendar, 
  Users, 
  HelpCircle,
  Clock,
  Layers,
  ArrowRight
} from 'lucide-react';
import { LanguageCode, MedicalProcedure, PilotRegion } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface CostEstimatorProps {
  currentLang: LanguageCode;
  procedure: MedicalProcedure;
  selectedRegion: PilotRegion;
  userDistrict: string;
  isHighContrast: boolean;
  onExploreFacilities: () => void;
  onCheckSchemes: () => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({
  currentLang,
  procedure,
  selectedRegion,
  userDistrict,
  isHighContrast,
  onExploreFacilities,
  onCheckSchemes
}) => {
  const t = TRANSLATIONS[currentLang];
  const regionRates = procedure.ratesByRegion[selectedRegion.id] || procedure.ratesByRegion['hyderabad'];
  const vaultStats = procedure.vaultStatsByRegion[selectedRegion.id] || procedure.vaultStatsByRegion['hyderabad'];

  const isLowData = vaultStats.confidence === 'insufficient' || vaultStats.sampleSize < 5;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title & Procedure Overview */}
      <div className={`p-6 rounded-2xl border ${
        isHighContrast 
          ? 'bg-black text-yellow-300 border-yellow-400' 
          : 'bg-white text-slate-800 border-slate-200 dark:bg-slate-900 dark:border-slate-800'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 uppercase tracking-wider">
              <span>{procedure.category.replace('_', ' ')}</span>
              <span>•</span>
              <span>Code: {procedure.code}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {procedure.typicalDuration}
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight mt-1 text-slate-900 dark:text-slate-100">
              {procedure.name}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Estimated for: <strong className="text-slate-700 dark:text-slate-300">{userDistrict} ({selectedRegion.name})</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCheckSchemes}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 flex items-center gap-1.5 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Check Free Govt Schemes</span>
            </button>
            <button
              type="button"
              onClick={onExploreFacilities}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm flex items-center gap-1.5 transition-all"
            >
              <span>Nearby Hospitals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Clinical Note & Prep advice */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            <strong>About this procedure: </strong>{procedure.description}
          </p>
          <div className="mt-2 text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-medium">
            <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Preparation: {procedure.preparationAdvice}</span>
          </div>
        </div>
      </div>

      {/* CRUCIAL REQUIREMENT 2: EXPLAIN WHEN THERE IS TOO LITTLE INFORMATION FOR A RELIABLE ESTIMATE */}
      {isLowData && (
        <div className="p-4 rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <h4 className="font-bold text-sm text-amber-900 dark:text-amber-100">
              {t.costSection.lowDataWarningTitle} (Sample N={vaultStats.sampleSize})
            </h4>
            <p className="mt-1 leading-relaxed">
              {vaultStats.insufficientReason || t.costSection.lowDataWarningDesc}
            </p>
            <p className="mt-1 font-semibold text-amber-800 dark:text-amber-300">
              * Showing official CGHS & PM-JAY tariff baseline below to prevent misleading commercial estimates.
            </p>
          </div>
        </div>
      )}

      {/* 4-Tier Price Ranges */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-emerald-600" />
            {t.costSection.priceRangeTitle}
          </h3>
          <span className="text-[11px] text-slate-500 italic">
            Rates in Indian Rupees (₹)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tier 1: Government Hospital */}
          <div className="p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-800 dark:text-emerald-300">
              <span className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                {t.costSection.govtFreeTier}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-[10px]">
                Subsidized
              </span>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400">
                ₹{regionRates.govtHospitalRange[0]} - ₹{regionRates.govtHospitalRange[1]}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Often 100% free with PM-JAY or State Card (Aarogyasri / Jan Aadhaar). Nominal OPD fee.
              </p>
            </div>
          </div>

          {/* Tier 2: Charitable / Trust Hospital */}
          <div className="p-4 rounded-2xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
            <div className="flex items-center justify-between text-xs font-semibold text-blue-800 dark:text-blue-300">
              <span className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                {t.costSection.trustTier}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-[10px]">
                Non-Profit
              </span>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-extrabold text-blue-700 dark:text-blue-400">
                ₹{regionRates.trustHospitalRange[0].toLocaleString('en-IN')} - ₹{regionRates.trustHospitalRange[1].toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Run by charitable foundations or religious trusts; subsidized quality care.
              </p>
            </div>
          </div>

          {/* Tier 3: Private Mid-tier / Nursing Home */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                {t.costSection.privateMidTier}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px]">
                Typical Private
              </span>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
                ₹{regionRates.privateMidRange[0].toLocaleString('en-IN')} - ₹{regionRates.privateMidRange[1].toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Local private diagnostic labs and multi-specialty nursing homes.
              </p>
            </div>
          </div>

          {/* Tier 4: Private Corporate */}
          <div className="p-4 rounded-2xl border border-purple-200 dark:border-purple-800 bg-purple-50/40 dark:bg-purple-950/20">
            <div className="flex items-center justify-between text-xs font-semibold text-purple-800 dark:text-purple-300">
              <span className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                {t.costSection.privateCorpTier}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-[10px]">
                Tertiary Corp
              </span>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-extrabold text-purple-700 dark:text-purple-400">
                ₹{regionRates.privateCorporateRange[0].toLocaleString('en-IN')} - ₹{regionRates.privateCorporateRange[1].toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Large corporate healthcare chains with luxury amenities and private suites.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Official Rate Cards & Real Bill Vault Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Official Rate Cards */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <FileSpreadsheet className="w-4 h-4 text-blue-600" />
              {t.costSection.officialRateCard}
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold">
              Official Tariffs
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
              <div>
                <span className="font-semibold block text-slate-800 dark:text-slate-200">CGHS NABH Empaneled Rate</span>
                <span className="text-[11px] text-slate-500">{selectedRegion.cghsRateCity} Circular</span>
              </div>
              <span className="font-bold text-base text-blue-700 dark:text-blue-400">
                ₹{regionRates.cghsNabhRate.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
              <div>
                <span className="font-semibold block text-slate-800 dark:text-slate-200">CGHS Non-NABH Rate</span>
                <span className="text-[11px] text-slate-500">Standard Baseline (-15%)</span>
              </div>
              <span className="font-bold text-base text-slate-700 dark:text-slate-300">
                ₹{regionRates.cghsNonNabhRate.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
              <div>
                <span className="font-semibold block text-slate-800 dark:text-slate-200">PM-JAY Health Benefit Package</span>
                <span className="text-[11px] text-slate-500">NHA HBP 2.2 Package Rate</span>
              </div>
              <span className="font-bold text-base text-emerald-700 dark:text-emerald-400">
                ₹{regionRates.pmjayPackageRate.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            Official rates are legally binding for empaneled beneficiaries and act as reference price benchmarks.
          </p>
        </div>

        {/* Real Bill Vault Stats */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-600" />
              {t.costSection.vaultHeading}
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
              Crowdsourced (N={vaultStats.sampleSize})
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
              <span className="text-slate-500 block text-[11px]">{t.costSection.medianLabel}</span>
              <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {vaultStats.median > 0 ? `₹${vaultStats.median.toLocaleString('en-IN')}` : 'Insufficient Data'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
              <span className="text-slate-500 block text-[11px]">Interquartile (25th - 75th)</span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {vaultStats.min > 0 ? `₹${vaultStats.min.toLocaleString('en-IN')} - ₹${vaultStats.p75.toLocaleString('en-IN')}` : 'N/A'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
              <span className="text-slate-500 block text-[11px]">Verified Range (Min - Max)</span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {vaultStats.max > 0 ? `₹${vaultStats.min.toLocaleString('en-IN')} - ₹${vaultStats.max.toLocaleString('en-IN')}` : 'N/A'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
              <span className="text-slate-500 block text-[11px] flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                {t.costSection.lastUpdatedLabel}
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {vaultStats.lastUpdated}
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-300 text-[11px]">
            <strong>Data Source: </strong>{vaultStats.dataSourceDescription}
          </div>
        </div>
      </div>

      {/* Component Breakdown: Where Does The Money Go? */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-emerald-600" />
          {t.costSection.breakdownTitle}
        </h3>

        <div className="space-y-3">
          {procedure.breakdown.map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {item.category} ({item.percentage}%)
                </span>
                <span className="text-slate-500 font-mono">
                  Govt: ₹{item.typicalAmountGovt} • Private: ~₹{item.typicalAmountPrivate}
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full" 
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                {item.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
