import { LanguageCode } from '../types';

export interface VoiceSample {
  id: string;
  label: string;
  transcript: string;
  detectedProcedureId: string;
}

export const VOICE_SAMPLES_BY_LANG: Record<LanguageCode, VoiceSample[]> = {
  en: [
    {
      id: 'en-usg',
      label: 'Doctor asked for ultrasound abdomen',
      transcript: 'Doctor advised ultrasound scan for severe stomach pain and indigestion.',
      detectedProcedureId: 'usg-abdomen'
    },
    {
      id: 'en-cataract',
      label: 'Cataract surgery cost in right eye',
      transcript: 'Need likely hospital cost for cataract surgery with monofocal lens for my mother.',
      detectedProcedureId: 'cataract-phaco'
    },
    {
      id: 'en-mri',
      label: 'MRI scan lower back / spine',
      transcript: 'Prescription says MRI lumbar spine for chronic lower back and nerve pain.',
      detectedProcedureId: 'mri-lumbar'
    },
    {
      id: 'en-dialysis',
      label: 'Regular dialysis session charges',
      transcript: 'What is the private and government hospital cost for a single hemodialysis session?',
      detectedProcedureId: 'dialysis-session'
    }
  ],
  hi: [
    {
      id: 'hi-usg',
      label: 'पेट का अल्ट्रासाउंड / सोनोग्राफी',
      transcript: 'डॉक्टर ने पेट में दर्द के लिए पूरे पेट की सोनोग्राफी अल्ट्रासाउंड लिखा है।',
      detectedProcedureId: 'usg-abdomen'
    },
    {
      id: 'hi-cataract',
      label: 'मोतियाबिंद का ऑपरेशन',
      transcript: 'माताजी की दाहिनी आंख में मोतियाबिंद का फेको ऑपरेशन और लेंस डलवाना है।',
      detectedProcedureId: 'cataract-phaco'
    },
    {
      id: 'hi-delivery',
      label: 'सामान्य डिलीवरी का अस्पताल खर्च',
      transcript: 'सरकारी और निजी अस्पताल में नॉर्मल डिलीवरी का कुल कितना खर्च आता है?',
      detectedProcedureId: 'normal-delivery'
    },
    {
      id: 'hi-blood',
      label: 'खून की जांच और लिपिड प्रोफाइल',
      transcript: 'डॉक्टर ने कम्पलीट ब्लड काउंट और लिपिड प्रोफाइल की जांच लिखी है।',
      detectedProcedureId: 'cbc-lipid-lft'
    }
  ],
  te: [
    {
      id: 'te-usg',
      label: 'కడుపు అల్ట్రాసౌండ్ స్కానింగ్',
      transcript: 'కడుపు నొప్పి కోసం డాక్టర్ గారు అబ్డామిన్ అల్ట్రాసౌండ్ స్కానింగ్ రాశారు.',
      detectedProcedureId: 'usg-abdomen'
    },
    {
      id: 'te-cataract',
      label: 'కంటి శుక్లాల ఆపరేషన్ ఖర్చు',
      transcript: 'కంటిలో క్యాటరాక్ట్ ఆపరేషన్ లెన్స్ వేయడానికి ఎంత ఖర్చవుతుంది?',
      detectedProcedureId: 'cataract-phaco'
    },
    {
      id: 'te-mri',
      label: 'వెన్నుపూస ఎంఆర్ఐ స్కానింగ్',
      transcript: 'నడుము నొప్పికి లంబార్ స్పైన్ ఎంఆర్ఐ స్కాన్ చేయించాలి.',
      detectedProcedureId: 'mri-lumbar'
    }
  ],
  ta: [
    {
      id: 'ta-usg',
      label: 'வயிற்றுப் பகுதி அல்ட்ராசவுண்ட் ஸ்கேன்',
      transcript: 'வயிற்று வலிக்கு மருத்துவர் அல்ட்ராசவுண்ட் ஸ்கேன் பரிந்துரைத்துள்ளார்.',
      detectedProcedureId: 'usg-abdomen'
    },
    {
      id: 'ta-cataract',
      label: 'கண்புரை அறுவை சிகிச்சை',
      transcript: 'கண்புரை கேட்ராக்ட் ஆபரேஷன் லென்ஸ் சிகிச்சைக்கான கட்டணம் என்ன?',
      detectedProcedureId: 'cataract-phaco'
    }
  ],
  kn: [
    {
      id: 'kn-usg',
      label: 'ಹೊಟ್ಟೆಯ ಅಲ್ಟ್ರಾಸೌಂಡ್ ಸ್ಕ್ಯಾನಿಂಗ್',
      transcript: 'ಹೊಟ್ಟೆ ನೋವಿಗೆ ವೈದ್ಯರು ಅಲ್ಟ್ರಾಸೌಂಡ್ ಸ್ಕ್ಯಾನಿಂಗ್ ಮಾಡಲು ಹೇಳಿದ್ದಾರೆ.',
      detectedProcedureId: 'usg-abdomen'
    },
    {
      id: 'kn-mri',
      label: 'ಬೆನ್ನು ಮೂಳೆಯ ಎಂಆರ್‌ಐ ಸ್ಕ್ಯಾನ್',
      transcript: 'ಬೆನ್ನು ನೋವಿಗೆ ಲಂಬಾರ್ ಸ್ಪೈನ್ ಎಂಆರ್‌ಐ ಪರೀಕ್ಷೆ ಅಗತ್ಯವಿದೆ.',
      detectedProcedureId: 'mri-lumbar'
    }
  ],
  bn: [
    {
      id: 'bn-usg',
      label: 'পেটের আল্ট্রাসাউন্ড বা সোনোগ্রাফি',
      transcript: 'পেটের ব্যথার জন্য ডাক্তার পুরো পেটের আল্ট্রাসাউন্ড টেস্ট করতে বলেছেন।',
      detectedProcedureId: 'usg-abdomen'
    },
    {
      id: 'bn-cataract',
      label: 'ছানি অপারেশনের সম্ভাব্য খরচ',
      transcript: 'চোখের ক্যাটারাক্ট ছানি অপারেশনের মোট আনুমানিক খরচ কত?',
      detectedProcedureId: 'cataract-phaco'
    }
  ]
};

// Text-to-speech helper
export function speakText(text: string, lang: LanguageCode, onEnd?: () => void): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return false;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set appropriate BCP-47 locale
  const langMap: Record<LanguageCode, string> = {
    en: 'en-IN',
    hi: 'hi-IN',
    te: 'te-IN',
    ta: 'ta-IN',
    kn: 'kn-IN',
    bn: 'bn-IN'
  };

  utterance.lang = langMap[lang] || 'en-IN';
  utterance.rate = 0.95; // Slightly slower for clear Indian cadence
  utterance.pitch = 1.0;

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  try {
    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.error('Speech synthesis error:', err);
    return false;
  }
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
