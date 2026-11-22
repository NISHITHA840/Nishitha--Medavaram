import React, { useState } from 'react';
import { 
  ShieldCheck, 
  X, 
  UploadCloud, 
  Lock, 
  FileCheck2, 
  CheckCircle, 
  AlertTriangle,
  IndianRupee,
  Eye,
  HeartHandshake
} from 'lucide-react';
import { LanguageCode, MedicalProcedure, PilotRegion, FacilityType } from '../types';
import { PROCEDURES } from '../data/procedures';
import { TRANSLATIONS } from '../i18n/translations';
import { scrubPrescriptionOrBillText, saveVaultContribution, getVaultContributions } from '../services/vaultStorage';
import { submitVaultBillToDb } from '../services/api';

interface BillVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: LanguageCode;
  selectedRegion: PilotRegion;
  initialProcedure?: MedicalProcedure;
  isHighContrast: boolean;
  onContributionAdded: () => void;
}

export const BillVaultModal: React.FC<BillVaultModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  selectedRegion,
  initialProcedure,
  isHighContrast,
  onContributionAdded
}) => {
  const t = TRANSLATIONS[currentLang];

  const [procedureId, setProcedureId] = useState<string>(initialProcedure?.id || PROCEDURES[0].id);
  const [district, setDistrict] = useState<string>(selectedRegion.defaultDistrict);
  const [facilityType, setFacilityType] = useState<FacilityType>('private_mid');
  const [facilityName, setFacilityName] = useState<string>('Local Diagnostic & Nursing Home');
  const [billedAmount, setBilledAmount] = useState<string>('1250');
  const [billDate, setBillDate] = useState<string>('2026-10-15');
  const [rawBillNotes, setRawBillNotes] = useState<string>(
    'Patient: Sunita Devi, Ph: 9849012345, Hospital: Care Hospital Hyderabad, Total Billed: Rs. 1250 for USG Abdomen'
  );

  const [hasScrubbed, setHasScrubbed] = useState<boolean>(true);
  const [scrubbedText, setScrubbedText] = useState<string>('');
  const [redactedCount, setRedactedCount] = useState<number>(2);
  const [consentGiven, setConsentGiven] = useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);

  // Auto-scrub notes on change
  React.useEffect(() => {
    const res = scrubPrescriptionOrBillText(rawBillNotes);
    setScrubbedText(res.scrubbedText);
    setRedactedCount(res.redactedCount);
  }, [rawBillNotes]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentGiven) {
      alert('Please check the consent box to confirm de-identification.');
      return;
    }

    const proc = PROCEDURES.find(p => p.id === procedureId) || PROCEDURES[0];
    const amount = parseFloat(billedAmount) || 0;

    await submitVaultBillToDb({
      procedureId: proc.id,
      procedureName: proc.name,
      regionId: selectedRegion.id,
      district,
      facilityType,
      facilityNameAnonymized: facilityName,
      billedAmount: amount,
      billDate,
      hasInsurance: false,
      outOfPocketPaid: amount,
      consentGiven: true,
      redactedNotes: scrubbedText
    });

    setSubmittedSuccess(true);
    onContributionAdded();
    setTimeout(() => {
      setSubmittedSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden max-h-[90vh] flex flex-col ${
        isHighContrast 
          ? 'bg-black text-yellow-300 border-yellow-400' 
          : 'bg-white text-slate-800 border-slate-200 dark:bg-slate-900 dark:border-slate-800'
      }`}>
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                {t.vaultSection.title}
              </h2>
              <p className="text-xs text-slate-500">
                {t.vaultSection.subtitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {submittedSuccess ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {t.vaultSection.successMessage}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Your anonymous contribution has calibrated the community price distribution for {selectedRegion.name}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Educational Notice: How it will be used */}
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  {t.vaultSection.whyTitle}
                </span>
                <p className="text-[11px] leading-relaxed">
                  Hospital costs in India vary wildly between clinics. By contributing your actual receipt, you empower fellow citizens with realistic out-of-pocket benchmarks.
                </p>
              </div>

              {/* Bill Details Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Procedure or Diagnostic Test
                  </label>
                  <select
                    aria-label="Procedure or Diagnostic Test"
                    value={procedureId}
                    onChange={(e) => setProcedureId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {PROCEDURES.map(proc => (
                      <option key={proc.id} value={proc.id}>{proc.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Total Amount Billed (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      required
                      value={billedAmount}
                      onChange={(e) => setBilledAmount(e.target.value)}
                      className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    District / Locality
                  </label>
                  <select
                    aria-label="District / Locality"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {selectedRegion.districts.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Facility Type
                  </label>
                  <select
                    aria-label="Facility Type"
                    value={facilityType}
                    onChange={(e) => setFacilityType(e.target.value as FacilityType)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="govt">Government Hospital</option>
                    <option value="trust">Charitable Trust Hospital</option>
                    <option value="private_mid">Private Nursing Home / Diagnostic</option>
                    <option value="private_corp">Large Corporate Tertiary Hospital</option>
                  </select>
                </div>
              </div>

              {/* CRUCIAL REQUIREMENT 5: CLIENT-SIDE PRIVACY SCRUBBER DEMONSTRATION */}
              <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-blue-600" />
                    {t.vaultSection.scrubberTitle}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">
                    Client-Side Masking Active
                  </span>
                </div>

                <p className="text-[11px] text-blue-800 dark:text-blue-300">
                  {t.vaultSection.privacyNotice}
                </p>

                {/* Scrubber Preview Box */}
                <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Redacted Preview (Ready for Submission):
                  </p>
                  <p className="text-emerald-700 dark:text-emerald-400 font-semibold">
                    {scrubbedText}
                  </p>
                  <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Identified {redactedCount} sensitive fields masked prior to storage.</span>
                  </div>
                </div>
              </div>

              {/* CRUCIAL REQUIREMENT 5: REQUEST CONSENT BEFORE SUBMISSION */}
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                  />
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    {t.vaultSection.consentCheckbox}
                  </span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 dark:border-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!consentGiven}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 ${
                    consentGiven 
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>{t.vaultSection.submitBillBtn}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
