import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  ExternalLink, 
  PhoneCall, 
  HelpCircle, 
  Info,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { LanguageCode, PilotRegion, SchemeAssessmentResult } from '../types';
import { assessSchemeEligibility } from '../utils/schemeChecker';
import { TRANSLATIONS } from '../i18n/translations';

interface SchemeCheckerProps {
  currentLang: LanguageCode;
  selectedRegion: PilotRegion;
  isHighContrast: boolean;
}

export const SchemeChecker: React.FC<SchemeCheckerProps> = ({
  currentLang,
  selectedRegion,
  isHighContrast
}) => {
  const t = TRANSLATIONS[currentLang];

  // Minimal form states (zero Aadhaar/ABHA collected)
  const [rationCardType, setRationCardType] = useState<string>('BPL');
  const [annualIncome, setAnnualIncome] = useState<string>('below_1_5l');
  const [vulnerability, setVulnerability] = useState<string>('Informal Worker');
  const [isResident, setIsResident] = useState<boolean>(true);

  // Result state
  const [result, setResult] = useState<SchemeAssessmentResult | null>(() => {
    return assessSchemeEligibility({
      regionId: selectedRegion.id,
      rationCardType: 'BPL',
      annualIncomeBracket: 'below_1_5l',
      vulnerabilityCategory: 'Informal Worker',
      isResident: true
    });
  });

  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const handleAssess = () => {
    const res = assessSchemeEligibility({
      regionId: selectedRegion.id,
      rationCardType,
      annualIncomeBracket: annualIncome,
      vulnerabilityCategory: vulnerability,
      isResident
    });
    setResult(res);
  };

  const toggleDoc = (doc: string) => {
    setCheckedDocs(prev => ({
      ...prev,
      [doc]: !prev[doc]
    }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title & Privacy Header */}
      <div className={`p-5 rounded-2xl border ${
        isHighContrast 
          ? 'bg-black text-yellow-300 border-yellow-400' 
          : 'bg-white text-slate-800 border-slate-200 dark:bg-slate-900 dark:border-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {t.schemeSection.title}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.schemeSection.subtitle}
            </p>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 shrink-0">
            Zero PII • No Aadhaar Required
          </span>
        </div>

        {/* Minimal 4-Question Questionnaire */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {/* Question 1: State / Region */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              {t.schemeSection.qState}
            </label>
            <div className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200">
              {selectedRegion.state} ({selectedRegion.name.split(' ')[0]})
            </div>
          </div>

          {/* Question 2: Ration Card Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              {t.schemeSection.qRationCard}
            </label>
            <select
              aria-label={t.schemeSection.qRationCard}
              value={rationCardType}
              onChange={(e) => {
                setRationCardType(e.target.value);
              }}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="BPL">BPL / Priority Household (PHH) Card</option>
              <option value="AAY">Antyodaya Anna Yojana (AAY) Card</option>
              <option value="White_Card">Telangana Food Security White Card</option>
              <option value="Pink_Card">Above Poverty Line (APL / Pink Card)</option>
              <option value="None">No Ration Card / General</option>
            </select>
          </div>

          {/* Question 3: Annual Household Income */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              {t.schemeSection.qIncome}
            </label>
            <select
              aria-label={t.schemeSection.qIncome}
              value={annualIncome}
              onChange={(e) => {
                setAnnualIncome(e.target.value);
              }}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="below_1_5l">Under ₹1,50,000 / year</option>
              <option value="1_5l_to_2_5l">₹1,50,000 to ₹2,50,000 / year</option>
              <option value="2_5l_to_5l">₹2,50,000 to ₹5,00,000 / year</option>
              <option value="above_5l">Above ₹5,00,000 / year</option>
            </select>
          </div>

          {/* Question 4: Vulnerability / Occupation */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              {t.schemeSection.qVulnerability}
            </label>
            <select
              aria-label={t.schemeSection.qVulnerability}
              value={vulnerability}
              onChange={(e) => {
                setVulnerability(e.target.value);
              }}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Informal Worker">Informal / Daily Wage Worker</option>
              <option value="Farmer (PM-KISAN)">Small / Marginal Farmer (PM-KISAN)</option>
              <option value="BOCW Construction">Registered Construction Worker (BOCW)</option>
              <option value="Street Vendor">Street Vendor / PM SVANidhi</option>
              <option value="Senior Citizen 70+">Senior Citizen (Aged 70+)</option>
              <option value="Salaried Corporate">Salaried / Corporate Employee</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleAssess}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all ${
              isHighContrast
                ? 'bg-yellow-400 text-black'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.schemeSection.checkEligibilityBtn}</span>
          </button>
        </div>
      </div>

      {/* Assessment Outcome Card */}
      {result && (
        <div className="space-y-6">
          {/* Match Level Banner */}
          <div className={`p-5 rounded-2xl border ${
            result.matchLevel === 'HIGH_POTENTIAL'
              ? 'bg-emerald-50 border-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-700 text-emerald-900 dark:text-emerald-100'
              : result.matchLevel === 'MODERATE_POTENTIAL'
                ? 'bg-blue-50 border-blue-300 dark:bg-blue-950/40 dark:border-blue-700 text-blue-900 dark:text-blue-100'
                : 'bg-amber-50 border-amber-300 dark:bg-amber-950/40 dark:border-amber-700 text-amber-900 dark:text-amber-100'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider block">
                    {result.matchLevel === 'HIGH_POTENTIAL' 
                      ? t.schemeSection.matchHigh 
                      : result.matchLevel === 'MODERATE_POTENTIAL' 
                        ? t.schemeSection.matchModerate 
                        : t.schemeSection.matchGeneral}
                  </span>
                  <h3 className="text-lg font-bold">
                    {result.matchSummary}
                  </h3>
                </div>
              </div>

              <div className="shrink-0 text-left sm:text-right">
                <span className="text-[11px] opacity-75 block">Potential Cashless Protection</span>
                <span className="text-xl font-black">
                  {result.matchedSchemes.length > 0 
                    ? `Up to ₹${Math.max(...result.matchedSchemes.map(s => s.coverageAmount)).toLocaleString('en-IN')}/year`
                    : 'Universal Basic Cover'}
                </span>
              </div>
            </div>
          </div>

          {/* Matched Schemes List */}
          <div className="space-y-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              Configured Public Health Schemes Analyzed:
            </h3>

            {result.matchedSchemes.map(scheme => (
              <div 
                key={scheme.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-blue-100 text-blue-800 mr-2">
                      {scheme.sponsor} Sponsored
                    </span>
                    <strong className="text-base text-slate-900 dark:text-slate-100">{scheme.name}</strong>
                  </div>
                  <span className="text-emerald-700 dark:text-emerald-400 font-extrabold text-sm">
                    Coverage: ₹{(scheme.coverageAmount / 100000).toFixed(0)} Lakhs / family
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {scheme.description}
                </p>

                {/* Key Benefits */}
                <div className="text-xs space-y-1">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">Key Package Benefits:</span>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-600 dark:text-slate-400">
                    {scheme.benefitsList.map((benefit, bidx) => (
                      <li key={bidx}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Document Checklist & Verification Guide */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Checklist */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                {t.schemeSection.docChecklistTitle}
              </h3>
              <p className="text-[11px] text-slate-500">
                Tick the documents you have ready before visiting your nearest registration kiosk:
              </p>

              <div className="space-y-2 text-xs">
                {result.documentChecklist.map((doc, idx) => (
                  <label 
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 cursor-pointer transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={!!checkedDocs[doc]}
                      onChange={() => toggleDoc(doc)}
                      className="mt-0.5 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                    />
                    <span className={`text-xs ${checkedDocs[doc] ? 'line-through text-slate-400 font-medium' : 'text-slate-800 dark:text-slate-200 font-semibold'}`}>
                      {doc}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Official Next Steps & Verification */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-blue-600" />
                {t.schemeSection.officialHelplineTitle}
              </h3>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 text-blue-900 dark:text-blue-200">
                  <span className="font-bold block">National Toll-Free Helpline:</span>
                  <a href="tel:14555" className="text-base font-extrabold text-blue-700 dark:text-blue-300 hover:underline">
                    14555 / 1800-111-565 (24x7)
                  </a>
                  <p className="text-[10px] text-blue-700/80 dark:text-blue-300/80 mt-0.5">
                    Call directly from any mobile or landline for eligibility verification in Hindi, English, or regional language.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="font-bold block text-slate-800 dark:text-slate-200">Official Web Portal:</span>
                  <a 
                    href={result.portalUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs font-semibold text-emerald-600 hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <span>{result.portalUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="font-bold block text-slate-800 dark:text-slate-200">Nearest Kiosk Desk:</span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                    Visit the "Ayushman Mitra" counter at any Government District Hospital or CSC Digital Seva Kendra in your village.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CRUCIAL REQUIREMENT: TRUST, PRIVACY, NO-GUARANTEE DISCLAIMER */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Important Trust Disclaimer: </span>
              {result.disclaimer}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
