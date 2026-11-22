import React from 'react';
import { 
  HeartHandshake, 
  Globe, 
  Volume2, 
  VolumeX, 
  Type, 
  SunMoon, 
  MapPin, 
  PhoneCall, 
  ShieldAlert,
  Database
} from 'lucide-react';
import { LanguageCode, PilotRegion } from '../types';
import { PILOT_REGIONS } from '../data/regions';
import { TRANSLATIONS } from '../i18n/translations';
import { speakText, stopSpeaking } from '../utils/speech';

interface HeaderProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  selectedRegion: PilotRegion;
  onRegionChange: (region: PilotRegion) => void;
  isLargeText: boolean;
  onToggleLargeText: () => void;
  isHighContrast: boolean;
  onToggleHighContrast: () => void;
  onOpenDatabaseModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  selectedRegion,
  onRegionChange,
  isLargeText,
  onToggleLargeText,
  isHighContrast,
  onToggleHighContrast,
  onOpenDatabaseModal
}) => {
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const t = TRANSLATIONS[currentLang];

  const handleReadAloud = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      const summaryText = `${t.appName}. ${t.tagline}. ${t.disclaimerBanner}. ${t.regionSelector.label}: ${selectedRegion.localName[currentLang]}.`;
      setIsSpeaking(true);
      speakText(summaryText, currentLang, () => setIsSpeaking(false));
    }
  };

  const languages: { code: LanguageCode; label: string; scriptName: string }[] = [
    { code: 'en', label: 'English', scriptName: 'English' },
    { code: 'hi', label: 'Hindi', scriptName: 'हिन्दी' },
    { code: 'te', label: 'Telugu', scriptName: 'తెలుగు' },
    { code: 'ta', label: 'Tamil', scriptName: 'தமிழ்' },
    { code: 'kn', label: 'Kannada', scriptName: 'ಕನ್ನಡ' },
    { code: 'bn', label: 'Bengali', scriptName: 'বাংলা' }
  ];

  return (
    <header className={`border-b sticky top-0 z-40 transition-colors ${
      isHighContrast ? 'bg-black text-yellow-300 border-yellow-400' : 'bg-white text-slate-800 border-slate-200'
    }`}>
      {/* Top emergency & non-diagnostic notice bar */}
      <div className={`${isHighContrast ? 'bg-yellow-400 text-black' : 'bg-emerald-700 text-white'} px-4 py-1.5 text-xs font-medium`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{t.disclaimerBanner}</span>
          </div>
          <div className="flex items-center gap-3 shrink-0 text-xs">
            <span className="flex items-center gap-1 font-semibold">
              <PhoneCall className="w-3.5 h-3.5" /> Emergency: 108
            </span>
            <span className="opacity-75">|</span>
            <span>Ayushman Call: 14555</span>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-sm ${
            isHighContrast ? 'bg-yellow-400 text-black' : 'bg-emerald-600 text-white'
          }`}>
            <HeartHandshake className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{t.appName}</h1>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                isHighContrast 
                  ? 'bg-yellow-300 text-black' 
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}>
                {t.badge}
              </span>
            </div>
            <p className="text-xs opacity-75 hidden sm:block">{t.tagline}</p>
          </div>
        </div>

        {/* Region & Controls bar */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Pilot Region Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <select
              aria-label={t.regionSelector.label}
              value={selectedRegion.id}
              onChange={(e) => {
                const found = PILOT_REGIONS.find(r => r.id === e.target.value);
                if (found) onRegionChange(found);
              }}
              className="bg-transparent font-medium focus:outline-none cursor-pointer"
            >
              {PILOT_REGIONS.map(reg => (
                <option key={reg.id} value={reg.id} className="text-slate-800 bg-white">
                  {reg.localName[currentLang] || reg.name}
                </option>
              ))}
            </select>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <select
              aria-label="Select Language"
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
              className="bg-transparent font-medium focus:outline-none cursor-pointer"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code} className="text-slate-800 bg-white">
                  {lang.scriptName} ({lang.label})
                </option>
              ))}
            </select>
          </div>

          {/* SQLite Database Live Badge */}
          {onOpenDatabaseModal && (
            <button
              type="button"
              onClick={onOpenDatabaseModal}
              title="Inspect Live SQLite Database (Tables, Schema, SQL Console)"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:border-emerald-700 text-xs font-bold hover:bg-emerald-100 transition-all shadow-sm"
            >
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">DB:</span> SQLite
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </button>
          )}

          {/* Accessibility Controls */}
          <div className="flex items-center gap-1 border-l border-slate-300 dark:border-slate-700 pl-2">
            {/* Audio Read-Aloud (TTS) */}
            <button
              type="button"
              onClick={handleReadAloud}
              title={isSpeaking ? t.accessibility.stopSpeech : t.accessibility.readAloud}
              aria-label={isSpeaking ? t.accessibility.stopSpeech : t.accessibility.readAloud}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                isSpeaking 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : isHighContrast 
                    ? 'bg-yellow-400 text-black' 
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden md:inline">{isSpeaking ? t.accessibility.stopSpeech : t.accessibility.readAloud}</span>
            </button>

            {/* Font Size Toggle */}
            <button
              type="button"
              onClick={onToggleLargeText}
              title={t.accessibility.largeText}
              aria-label={t.accessibility.largeText}
              className={`p-2 rounded-lg text-xs flex items-center transition-all ${
                isLargeText 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Type className="w-4 h-4" />
            </button>

            {/* High Contrast Mode Toggle */}
            <button
              type="button"
              onClick={onToggleHighContrast}
              title={t.accessibility.highContrast}
              aria-label={t.accessibility.highContrast}
              className={`p-2 rounded-lg text-xs flex items-center transition-all ${
                isHighContrast 
                  ? 'bg-yellow-400 text-black font-bold' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <SunMoon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
