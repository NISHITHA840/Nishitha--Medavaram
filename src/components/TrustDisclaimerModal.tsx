import React from 'react';
import { 
  ShieldAlert, 
  X, 
  CheckCircle, 
  Lock, 
  Scale, 
  PhoneCall, 
  FileSpreadsheet,
  AlertTriangle
} from 'lucide-react';
import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface TrustDisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: LanguageCode;
  isHighContrast: boolean;
}

export const TrustDisclaimerModal: React.FC<TrustDisclaimerModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  isHighContrast
}) => {
  const t = TRANSLATIONS[currentLang];
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden max-h-[90vh] flex flex-col ${
        isHighContrast 
          ? 'bg-black text-yellow-300 border-yellow-400' 
          : 'bg-white text-slate-800 border-slate-200 dark:bg-slate-900 dark:border-slate-800'
      }`}>
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                Trust, Privacy & Non-Diagnostic Charter
              </h2>
              <p className="text-xs text-slate-500">
                Ethical boundaries and accuracy commitments of OneVision
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

        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Commitment 1: Non-diagnostic */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-emerald-600" />
              1. Non-Diagnostic Medical Scope
            </span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              OneVision is an administrative care navigation and cost estimation tool. <strong>We do not diagnose symptoms, interpret pathology results, or recommend clinical treatments.</strong> Always consult a qualified registered medical practitioner (MBBS/MD/MS) for medical decisions.
            </p>
          </div>

          {/* Commitment 2: No Price or Benefit Guarantee */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              2. No Guaranteed Pricing or Scheme Coverage
            </span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Hospital charges can vary based on patient co-morbidities, room choice, and complication management. Figures presented here are benchmark estimates derived from official circulars (CGHS 2023, PM-JAY HBP 2.2) and verified crowdsourced receipts. Final hospital billing is determined exclusively by the treating hospital.
            </p>
          </div>

          {/* Commitment 3: Minimal PII & Privacy */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-blue-600" />
              3. Zero PII Storage & No Aadhaar / ABHA Mandatory Requirement
            </span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We uphold strict data minimization. You do not need to disclose your 12-digit Aadhaar number or ABHA credentials to use any feature of this tool. For bill contributions to the Real Bill Vault, our in-browser privacy scrubber masks identifying details before saving.
            </p>
          </div>

          {/* Commitment 4: Transparent Data Labels */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <FileSpreadsheet className="w-4 h-4 text-purple-600" />
              4. Honest Sample Data Attribution
            </span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Every estimate visibly states the data source, sample size ($N$), and last updated date. When verified records are insufficient ($N &lt; 5$), a warning banner alerts the user rather than inventing artificial data.
            </p>
          </div>

          {/* Emergency contacts */}
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 text-red-900 dark:text-red-200 space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-red-600" />
              In Emergency Situations:
            </span>
            <p className="text-[11px] leading-relaxed">
              If someone is experiencing chest pain, difficulty breathing, trauma, or active bleeding, do not wait for estimates. Dial <strong>108</strong> (National Emergency Ambulance) or <strong>102</strong> immediately.
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white dark:bg-slate-100 dark:text-black hover:bg-slate-800"
          >
            I Understand & Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};
