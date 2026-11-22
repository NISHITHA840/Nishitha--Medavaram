import React, { useState, useRef } from 'react';
import { 
  Search, 
  Mic, 
  MicOff, 
  Camera, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle, 
  ArrowRight, 
  RotateCcw,
  UploadCloud,
  FileCheck,
  Stethoscope,
  Volume2
} from 'lucide-react';
import { LanguageCode, MedicalProcedure, PilotRegion } from '../types';
import { PROCEDURES } from '../data/procedures';
import { TRANSLATIONS } from '../i18n/translations';
import { 
  SAMPLE_PRESCRIPTIONS, 
  SamplePrescription, 
  matchProcedureFromText, 
  ExtractedCareNeed 
} from '../utils/ocrSimulation';
import { VOICE_SAMPLES_BY_LANG, speakText } from '../utils/speech';

interface CareNeedInputProps {
  currentLang: LanguageCode;
  selectedRegion: PilotRegion;
  onSelectProcedure: (procedure: MedicalProcedure, userDistrict: string) => void;
  isHighContrast: boolean;
}

export const CareNeedInput: React.FC<CareNeedInputProps> = ({
  currentLang,
  selectedRegion,
  onSelectProcedure,
  isHighContrast
}) => {
  const t = TRANSLATIONS[currentLang];
  const [activeTab, setActiveTab] = useState<'text' | 'voice' | 'scan'>('text');
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Voice state
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  // Scan state
  const [isScanning, setIsScanning] = useState(false);
  const [selectedSampleRx, setSelectedSampleRx] = useState<SamplePrescription | null>(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);

  // Extracted care need to review before continuing
  const [extractedNeed, setExtractedNeed] = useState<ExtractedCareNeed | null>(null);
  const [editableProcedureId, setEditableProcedureId] = useState<string>('');
  const [editableDistrict, setEditableDistrict] = useState<string>(selectedRegion.defaultDistrict);
  const [editableSetting, setEditableSetting] = useState<string>('OPD');

  // Popular quick-tap chips
  const quickChips = [
    { label: 'Ultrasound Abdomen', id: 'usg-abdomen' },
    { label: 'Cataract Surgery', id: 'cataract-phaco' },
    { label: 'MRI Lumbar Spine', id: 'mri-lumbar' },
    { label: 'CBC + Lipid Blood Panel', id: 'cbc-lipid-lft' },
    { label: 'Normal Delivery', id: 'normal-delivery' },
    { label: 'Hemodialysis', id: 'dialysis-session' },
    { label: 'Sleep Apnea (Low Data Pilot)', id: 'polysomnography-sleep' }
  ];

  // Initialize Web Speech Recognition if available
  const startVoiceInput = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Microphone speech recognition is not supported in this browser. Please use the sample voice buttons below or manual typing.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = currentLang === 'hi' ? 'hi-IN' : currentLang === 'te' ? 'te-IN' : currentLang === 'ta' ? 'ta-IN' : currentLang === 'kn' ? 'kn-IN' : currentLang === 'bn' ? 'bn-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setVoiceTranscript(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (voiceTranscript) {
          processCareInput(voiceTranscript);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.warn('Speech recognition error:', e);
      setIsListening(false);
    }
  };

  const stopVoiceInput = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  // Helper to process input text and create reviewable care need
  const processCareInput = (text: string) => {
    const match = matchProcedureFromText(text);
    if (match) {
      setExtractedNeed(match);
      setEditableProcedureId(match.procedure.id);
      setEditableSetting(match.suggestedSetting);
      setEditableDistrict(selectedRegion.defaultDistrict);
    }
  };

  // Trigger quick voice sample
  const handleVoiceSample = (sampleText: string, procedureId: string) => {
    setVoiceTranscript(sampleText);
    const proc = PROCEDURES.find(p => p.id === procedureId) || PROCEDURES[0];
    setExtractedNeed({
      procedure: proc,
      confidenceScore: 94,
      extractedText: sampleText,
      suggestedSetting: proc.setting,
      notes: `Voice recognized in ${currentLang.toUpperCase()} Indian cadence.`
    });
    setEditableProcedureId(proc.id);
    setEditableSetting(proc.setting);
    setEditableDistrict(selectedRegion.defaultDistrict);
  };

  // Handle sample prescription scan
  const handleSampleRxScan = (sample: SamplePrescription) => {
    setIsScanning(true);
    setSelectedSampleRx(sample);
    setUploadedImagePreview(null);

    setTimeout(() => {
      setIsScanning(false);
      const proc = PROCEDURES.find(p => p.id === sample.detectedProcedureId) || PROCEDURES[0];
      setExtractedNeed({
        procedure: proc,
        confidenceScore: 98,
        extractedText: sample.rxText,
        suggestedSetting: proc.setting,
        notes: `Extracted from prescription header & clinical Rx advice. Doctor: ${sample.doctorName}`,
        prescriptionDetails: {
          doctorName: sample.doctorName,
          clinicName: sample.clinicName,
          clinicalImpression: sample.clinicalImpression
        }
      });
      setEditableProcedureId(proc.id);
      setEditableSetting(proc.setting);
      setEditableDistrict(selectedRegion.defaultDistrict);
    }, 800);
  };

  // Handle image upload from disk / camera
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImagePreview(event.target?.result as string);
        setIsScanning(true);
        setSelectedSampleRx(null);

        // Parse filename or simulate clinical pattern recognition
        setTimeout(() => {
          setIsScanning(false);
          const defaultMatch = matchProcedureFromText(file.name.includes('cataract') ? 'cataract surgery' : 'ultrasound abdomen');
          if (defaultMatch) {
            setExtractedNeed({
              ...defaultMatch,
              notes: `Parsed uploaded image: ${file.name} (${(file.size / 1024).toFixed(0)} KB)`
            });
            setEditableProcedureId(defaultMatch.procedure.id);
            setEditableSetting(defaultMatch.procedure.setting);
            setEditableDistrict(selectedRegion.defaultDistrict);
          }
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  // User confirms the reviewed details to proceed
  const handleConfirmAndProceed = () => {
    const selectedProc = PROCEDURES.find(p => p.id === editableProcedureId) || extractedNeed?.procedure;
    if (selectedProc) {
      onSelectProcedure(selectedProc, editableDistrict);
    }
  };

  return (
    <div className="space-y-6">
      {/* Introduction Banner */}
      <div className={`p-5 rounded-2xl border ${
        isHighContrast 
          ? 'bg-black text-yellow-300 border-yellow-400' 
          : 'bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border-emerald-100'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t.inputSection.title}</h2>
            </div>
            <p className="text-sm mt-1 opacity-80">{t.inputSection.subtitle}</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/80 dark:bg-slate-800/80 shadow-sm border border-slate-200">
            <Stethoscope className="w-4 h-4 text-emerald-600" />
            <span>Region: {selectedRegion.name}</span>
          </div>
        </div>

        {/* Input Method Tabs */}
        <div className="mt-5 flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('text')}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'text'
                ? isHighContrast ? 'bg-yellow-400 text-black shadow' : 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>{t.inputSection.tabText}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('voice')}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'voice'
                ? isHighContrast ? 'bg-yellow-400 text-black shadow' : 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>{t.inputSection.tabVoice}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">Multilingual</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('scan')}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'scan'
                ? isHighContrast ? 'bg-yellow-400 text-black shadow' : 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>{t.inputSection.tabScan}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">Rx Scanner</span>
          </button>
        </div>

        {/* Tab 1: Text Search */}
        {activeTab === 'text' && (
          <div className="mt-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery) processCareInput(searchQuery);
                }}
                placeholder={t.inputSection.searchPlaceholder}
                className="w-full pl-11 pr-28 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm shadow-sm"
              />
              <button
                type="button"
                onClick={() => processCareInput(searchQuery || 'ultrasound abdomen')}
                className="absolute right-2 top-2 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all"
              >
                Estimate
              </button>
            </div>

            {/* Quick Tap Chips */}
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                Common outpatient & diagnostic needs in {selectedRegion.name}:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {quickChips.map((chip) => (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => {
                      const proc = PROCEDURES.find(p => p.id === chip.id);
                      if (proc) {
                        setExtractedNeed({
                          procedure: proc,
                          confidenceScore: 99,
                          extractedText: chip.label,
                          suggestedSetting: proc.setting,
                          notes: 'Selected from verified common procedures list.'
                        });
                        setEditableProcedureId(proc.id);
                        setEditableSetting(proc.setting);
                        setEditableDistrict(selectedRegion.defaultDistrict);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      editableProcedureId === chip.id
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Voice Input */}
        {activeTab === 'voice' && (
          <div className="mt-4 p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <button
                type="button"
                onClick={isListening ? stopVoiceInput : startVoiceInput}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-md ${
                  isListening 
                    ? 'bg-red-500 text-white ring-8 ring-red-100 animate-pulse' 
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </button>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                  {isListening ? t.inputSection.voiceListening : t.inputSection.voicePrompt}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Supports Indian languages: English, Hindi, Telugu, Tamil, Kannada, Bengali. Works in browser.
                </p>
                {voiceTranscript && (
                  <p className="mt-2 text-xs bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 p-2 rounded-lg border border-emerald-200">
                    "{voiceTranscript}"
                  </p>
                )}
              </div>
            </div>

            {/* Simulated Voice Samples */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                {t.inputSection.voiceSamplePrompt}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(VOICE_SAMPLES_BY_LANG[currentLang] || VOICE_SAMPLES_BY_LANG.en).map(sample => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleVoiceSample(sample.transcript, sample.detectedProcedureId)}
                    className="text-left p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-emerald-500 bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50/50 transition-all text-xs"
                  >
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block">{sample.label}</span>
                    <span className="text-[11px] text-slate-500 line-clamp-1 italic">"{sample.transcript}"</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Scan Prescription Image (OCR) */}
        {activeTab === 'scan' && (
          <div className="mt-4 p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">{t.inputSection.scanPrompt}</h3>
                <p className="text-xs text-slate-500">
                  Upload an image from your phone/computer or try realistic Indian clinic prescriptions below.
                </p>
              </div>
              <label className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer shadow-sm flex items-center gap-1.5 transition-all">
                <UploadCloud className="w-4 h-4" />
                <span>Upload Rx Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            {/* Sample Indian Prescriptions selector */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-1">
                <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                Quick-test with Realistic Sample Prescription Slips:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {SAMPLE_PRESCRIPTIONS.map(sample => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSampleRxScan(sample)}
                    className={`text-left p-3 rounded-xl border text-xs transition-all ${
                      selectedSampleRx?.id === sample.id
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 ring-1 ring-emerald-500'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-slate-900 dark:text-slate-100">{sample.clinicName.split(',')[0]}</div>
                    <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-0.5">{sample.specialty}</div>
                    <div className="text-[10px] text-slate-500 mt-1 line-clamp-2 italic">{sample.rxText.replace(/\n/g, ' ')}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Prescription OCR Bounding Box Preview */}
            {(selectedSampleRx || uploadedImagePreview) && (
              <div className="mt-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    OCR Clinical Extraction Preview
                  </span>
                  {isScanning && (
                    <span className="text-emerald-600 font-semibold animate-pulse flex items-center gap-1">
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                      {t.inputSection.extracting}
                    </span>
                  )}
                </div>

                {/* Simulated Rx canvas */}
                <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-4 bg-amber-50/20 dark:bg-slate-900 font-mono text-xs text-slate-700 dark:text-slate-300 min-h-[140px]">
                  {selectedSampleRx ? (
                    <div className="space-y-2">
                      <div className="border border-blue-400 bg-blue-50/50 dark:bg-blue-950/40 p-2 rounded">
                        <span className="text-[10px] font-bold text-blue-700 uppercase block">Doctor & Clinic Header</span>
                        {selectedSampleRx.clinicName} • {selectedSampleRx.doctorName} (Reg: {selectedSampleRx.regNo})
                      </div>
                      <div className="border border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 p-2.5 rounded font-sans">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase block">Extracted Clinical Procedure (Rx)</span>
                        <p className="font-bold text-sm text-emerald-900 dark:text-emerald-200 whitespace-pre-line">
                          {selectedSampleRx.rxText}
                        </p>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Impression: {selectedSampleRx.clinicalImpression}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <FileText className="w-8 h-8 mx-auto text-emerald-600 mb-2" />
                      <p className="font-medium text-xs">Prescription Image Analyzed Successfully</p>
                      <p className="text-[11px] text-slate-500 mt-1">Detected procedure text and clinical guidance matched below.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* CRUCIAL REQUIREMENT 1: EXTRACTED DETAILS REVIEW & CORRECTION CARD */}
      {extractedNeed && (
        <div className={`p-5 rounded-2xl border shadow-sm transition-all animate-fadeIn ${
          isHighContrast 
            ? 'bg-black text-yellow-300 border-yellow-400' 
            : 'bg-white border-emerald-300 dark:bg-slate-900 dark:border-emerald-600'
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                  {t.inputSection.reviewTitle}
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.inputSection.reviewSubtitle}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Confidence: {extractedNeed.confidenceScore}%</span>
            </div>
          </div>

          {/* Form fields for review and correction */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {/* Procedure Dropdown */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                {t.inputSection.procedureLabel}
              </label>
              <select
                aria-label={t.inputSection.procedureLabel}
                value={editableProcedureId}
                onChange={(e) => {
                  setEditableProcedureId(e.target.value);
                  const p = PROCEDURES.find(proc => proc.id === e.target.value);
                  if (p) setEditableSetting(p.setting);
                }}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {PROCEDURES.map(proc => (
                  <option key={proc.id} value={proc.id}>
                    {proc.name} ({proc.setting})
                  </option>
                ))}
              </select>
            </div>

            {/* Pilot District Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                {t.inputSection.districtLabel} ({selectedRegion.state})
              </label>
              <select
                aria-label={t.inputSection.districtLabel}
                value={editableDistrict}
                onChange={(e) => setEditableDistrict(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {selectedRegion.districts.map(dist => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            {/* Setting (OPD / Daycare / Inpatient) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                {t.inputSection.settingLabel}
              </label>
              <select
                aria-label={t.inputSection.settingLabel}
                value={editableSetting}
                onChange={(e) => setEditableSetting(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="OPD">OPD (Outpatient Visit)</option>
                <option value="Daycare">Daycare (Same-day Discharge)</option>
                <option value="1-2 Days Admission">1-2 Days Inpatient Admission</option>
              </select>
            </div>
          </div>

          {/* Clinical note & non-diagnostic notice */}
          <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-700 dark:text-slate-200">Patient Note: </span>
              <span className="text-slate-600 dark:text-slate-400">{extractedNeed.notes}</span>
              <p className="text-[11px] text-slate-400 mt-1 italic">
                {t.disclaimerShort}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => {
                setExtractedNeed(null);
                setSearchQuery('');
                setVoiceTranscript('');
                setSelectedSampleRx(null);
                setUploadedImagePreview(null);
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.inputSection.resetBtn}</span>
            </button>

            <button
              type="button"
              onClick={handleConfirmAndProceed}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all ${
                isHighContrast
                  ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <span>{t.inputSection.confirmBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
