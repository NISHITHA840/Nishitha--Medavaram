import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Award, 
  ShieldCheck, 
  Clock, 
  Filter, 
  ExternalLink, 
  Info,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { HealthcareFacility, LanguageCode, MedicalProcedure, PilotRegion } from '../types';
import { FACILITIES, calculateDistanceKm } from '../data/facilities';
import { TRANSLATIONS } from '../i18n/translations';

interface FacilityExplorerProps {
  currentLang: LanguageCode;
  selectedRegion: PilotRegion;
  userDistrict: string;
  selectedProcedure: MedicalProcedure;
  isHighContrast: boolean;
}

export const FacilityExplorer: React.FC<FacilityExplorerProps> = ({
  currentLang,
  selectedRegion,
  userDistrict,
  selectedProcedure,
  isHighContrast
}) => {
  const t = TRANSLATIONS[currentLang];
  const [filterType, setFilterType] = useState<'all' | 'govt' | 'trust' | 'empaneled'>('all');
  const [sortBy, setSortBy] = useState<'distance' | 'cost'>('distance');

  // Filter facilities by region
  const regionFacilities = FACILITIES.filter(f => f.regionId === selectedRegion.id);

  // Compute dynamic distance & estimated procedure cost
  const baselineRate = selectedProcedure.ratesByRegion[selectedRegion.id]?.privateMidRange[0] || 1200;

  const enrichedFacilities = regionFacilities.map(f => {
    const dist = calculateDistanceKm(f, userDistrict);
    const estCost = Math.round(baselineRate * f.procedureCostMultiplier);
    return {
      ...f,
      distanceKm: dist,
      estimatedProcedureCost: f.type === 'govt' ? 0 : estCost
    };
  });

  // Filter
  const filtered = enrichedFacilities.filter(f => {
    if (filterType === 'govt') return f.type === 'govt';
    if (filterType === 'trust') return f.type === 'trust';
    if (filterType === 'empaneled') return f.schemesEmpaneled.length > 0;
    return true;
  });

  // Sort: Empaneled first, then chosen sort
  filtered.sort((a, b) => {
    // Empaneled priority
    const aEmp = a.schemesEmpaneled.length > 0 ? 1 : 0;
    const bEmp = b.schemesEmpaneled.length > 0 ? 1 : 0;
    if (aEmp !== bEmp) return bEmp - aEmp;

    if (sortBy === 'distance') {
      return (a.distanceKm || 0) - (b.distanceKm || 0);
    } else {
      return a.estimatedProcedureCost - b.estimatedProcedureCost;
    }
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title & Sorting Explanation */}
      <div className={`p-5 rounded-2xl border ${
        isHighContrast 
          ? 'bg-black text-yellow-300 border-yellow-400' 
          : 'bg-white text-slate-800 border-slate-200 dark:bg-slate-900 dark:border-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {t.facilitySection.title}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing options for <strong className="text-slate-700 dark:text-slate-300">{selectedProcedure.name}</strong> near <strong className="text-slate-700 dark:text-slate-300">{userDistrict}</strong>
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Pilot Region: {selectedRegion.name}</span>
          </div>
        </div>

        {/* CRUCIAL REQUIREMENT 3: EXPLAIN HOW FACILITIES ARE ORDERED */}
        <div className="mt-3 p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Facility Ordering Rationale: </span>
            {t.facilitySection.sortExplanation}
            <span className="block text-[11px] text-blue-700 dark:text-blue-300 mt-0.5">
              * Independent and objective: No healthcare facility or diagnostic lab pays for sponsorship or promoted ranking.
            </span>
          </div>
        </div>

        {/* Controls: Filter and Sort */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-semibold mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterType === 'all'
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-black font-semibold'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {t.facilitySection.filterAll} ({regionFacilities.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('empaneled')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterType === 'empaneled'
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {t.facilitySection.filterEmpaneled}
            </button>
            <button
              type="button"
              onClick={() => setFilterType('govt')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterType === 'govt'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {t.facilitySection.filterGovt}
            </button>
            <button
              type="button"
              onClick={() => setFilterType('trust')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterType === 'trust'
                  ? 'bg-purple-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {t.facilitySection.filterTrust}
            </button>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-semibold">Sort:</span>
            <select
              aria-label="Sort facilities"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-3 py-1.5 rounded-lg font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="distance">{t.facilitySection.sortByDistance}</option>
              <option value="cost">{t.facilitySection.sortByCost}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Facilities Cards List */}
      <div className="space-y-4">
        {filtered.map(facility => (
          <div 
            key={facility.id}
            className={`p-5 rounded-2xl border transition-all ${
              isHighContrast
                ? 'bg-black text-yellow-300 border-yellow-400'
                : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 hover:shadow-md'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              {/* Left Details */}
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    facility.type === 'govt' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : facility.type === 'trust'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
                  }`}>
                    {facility.type === 'govt' ? 'Government Hospital' : facility.type === 'trust' ? 'Charitable Trust' : 'Private Facility'}
                  </span>

                  {facility.hasAyushmanDesk && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Ayushman Mitra Desk
                    </span>
                  )}

                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    ~{facility.distanceKm} km away
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {facility.name}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {facility.address}
                </p>

                {/* Empaneled Schemes */}
                {facility.schemesEmpaneled.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="text-slate-500 font-semibold text-[11px]">Empaneled with:</span>
                    {facility.schemesEmpaneled.map(scheme => (
                      <span 
                        key={scheme} 
                        className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold"
                      >
                        {scheme} Cashless
                      </span>
                    ))}
                  </div>
                )}

                {/* CRUCIAL REQUIREMENT 3: ONLY DISPLAY QUALITY INDICATORS WHEN THEIR SOURCES ARE AVAILABLE */}
                <div className="pt-1">
                  {facility.qualityBadges && facility.qualityBadges.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        Accreditation:
                      </span>
                      {facility.qualityBadges.map(badge => (
                        <div 
                          key={badge.id}
                          className="group relative inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800 text-[11px] font-bold cursor-help"
                          title={`Verified by ${badge.authority} on ${badge.verifiedOn}. Click to inspect official registry.`}
                        >
                          <ShieldCheck className="w-3 h-3 text-amber-600" />
                          <span>{badge.label}</span>
                          <a 
                            href={badge.officialSourceUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-amber-600 hover:text-amber-900 inline-block ml-0.5"
                          >
                            <ExternalLink className="w-2.5 h-2.5 inline" />
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 italic">
                      <AlertCircle className="w-3 h-3 text-slate-400" />
                      Quality accreditation: Not registered / in progress with NABH registry.
                    </div>
                  )}
                </div>

                {/* Facility verified cost notes */}
                {facility.verifiedCostNotes && (
                  <p className="text-[11px] text-slate-500 bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                    {facility.verifiedCostNotes}
                  </p>
                )}
              </div>

              {/* Right: Estimated Cost & Call Action */}
              <div className="shrink-0 flex flex-col sm:items-end justify-between gap-3 border-t md:border-t-0 pt-3 md:pt-0">
                <div className="sm:text-right">
                  <span className="text-[11px] text-slate-500 block">Est. Cost for {selectedProcedure.name.split(' ')[0]}</span>
                  <span className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                    {facility.type === 'govt' ? '₹0 - Subsidized' : `~₹${facility.estimatedProcedureCost.toLocaleString('en-IN')}`}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {facility.schemesEmpaneled.length > 0 ? 'Free with active scheme card' : 'Self-pay estimate'}
                  </span>
                </div>

                <div className="space-y-1.5 w-full sm:w-auto">
                  <a
                    href={`tel:${facility.phone}`}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white dark:bg-slate-100 dark:text-black hover:bg-slate-800 flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{t.facilitySection.callNow} ({facility.phone})</span>
                  </a>

                  <div className="text-[10px] text-slate-500 flex items-center justify-center sm:justify-end gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{facility.opdTimings}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
