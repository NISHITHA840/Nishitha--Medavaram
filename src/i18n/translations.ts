import { LanguageCode } from '../types';

export interface AppTranslation {
  appName: string;
  tagline: string;
  badge: string;
  disclaimerBanner: string;
  disclaimerShort: string;
  tabs: {
    findCost: string;
    facilities: string;
    schemes: string;
    vault: string;
    about: string;
  };
  regionSelector: {
    label: string;
    changeRegion: string;
    selectedDistrict: string;
  };
  inputSection: {
    title: string;
    subtitle: string;
    tabText: string;
    tabVoice: string;
    tabScan: string;
    searchPlaceholder: string;
    voicePrompt: string;
    voiceListening: string;
    voiceSamplePrompt: string;
    scanPrompt: string;
    scanUploadText: string;
    scanSampleBtn: string;
    extracting: string;
    reviewTitle: string;
    reviewSubtitle: string;
    procedureLabel: string;
    regionLabel: string;
    districtLabel: string;
    settingLabel: string;
    confirmBtn: string;
    resetBtn: string;
  };
  costSection: {
    title: string;
    priceRangeTitle: string;
    officialRateCard: string;
    vaultHeading: string;
    sampleSizeLabel: string;
    medianLabel: string;
    lastUpdatedLabel: string;
    breakdownTitle: string;
    lowDataWarningTitle: string;
    lowDataWarningDesc: string;
    govtFreeTier: string;
    trustTier: string;
    privateMidTier: string;
    privateCorpTier: string;
  };
  facilitySection: {
    title: string;
    subtitle: string;
    sortExplanation: string;
    filterAll: string;
    filterGovt: string;
    filterTrust: string;
    filterEmpaneled: string;
    sortByDistance: string;
    sortByCost: string;
    callNow: string;
    openHours: string;
    ayushmanHelpdesk: string;
    qualityBadgeTitle: string;
    qualitySourceNotice: string;
  };
  schemeSection: {
    title: string;
    subtitle: string;
    qState: string;
    qRationCard: string;
    qIncome: string;
    qVulnerability: string;
    checkEligibilityBtn: string;
    matchHigh: string;
    matchModerate: string;
    matchGeneral: string;
    docChecklistTitle: string;
    officialHelplineTitle: string;
    visitPortalBtn: string;
    helplineNotice: string;
    noGuaranteeNote: string;
  };
  vaultSection: {
    title: string;
    subtitle: string;
    contributeBtn: string;
    whyTitle: string;
    privacyNotice: string;
    scrubberTitle: string;
    scrubberDesc: string;
    redactedFieldsNotice: string;
    consentCheckbox: string;
    submitBillBtn: string;
    successMessage: string;
  };
  accessibility: {
    largeText: string;
    highContrast: string;
    readAloud: string;
    stopSpeech: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, AppTranslation> = {
  en: {
    appName: 'OneVision',
    tagline: 'Healthcare Cost & Care Navigation for India',
    badge: 'Pilot MVP • Non-Diagnostic',
    disclaimerBanner: 'OneVision does not diagnose conditions or guarantee costs or scheme benefits. Figures are indicative benchmarks from rate cards and crowdsourced bills. In emergency, call 108.',
    disclaimerShort: 'Informational estimate only. Not a medical diagnosis or hospital quotation.',
    tabs: {
      findCost: '1. Estimate Cost',
      facilities: '2. Find Care',
      schemes: '3. Check Schemes',
      vault: '4. Real Bill Vault',
      about: 'Trust & Privacy'
    },
    regionSelector: {
      label: 'Pilot Region',
      changeRegion: 'Change Region',
      selectedDistrict: 'District'
    },
    inputSection: {
      title: 'Describe or scan your healthcare need',
      subtitle: 'Type a test name, speak in your language, or upload a doctor’s prescription slip.',
      tabText: 'Type Search',
      tabVoice: 'Speak / Voice',
      tabScan: 'Scan Prescription (Rx)',
      searchPlaceholder: 'Search ultrasound, cataract, MRI, blood test, delivery...',
      voicePrompt: 'Tap microphone and speak your doctor’s advice',
      voiceListening: 'Listening to your voice... Speak clearly',
      voiceSamplePrompt: 'Or try quick voice sample:',
      scanPrompt: 'Upload or snap a prescription photo (Prescription / Test slip)',
      scanUploadText: 'Drag & drop image or click to select slip',
      scanSampleBtn: 'Try with Sample Indian Prescription',
      extracting: 'Analyzing clinical details...',
      reviewTitle: 'Review & Confirm Extracted Details',
      reviewSubtitle: 'Please verify the details below before estimating costs. You can edit any field.',
      procedureLabel: 'Procedure / Test Needed',
      regionLabel: 'Selected Pilot Region',
      districtLabel: 'District / Locality',
      settingLabel: 'Clinical Setting',
      confirmBtn: 'See Estimated Costs & Options',
      resetBtn: 'Start Over'
    },
    costSection: {
      title: 'Likely Treatment Cost Estimate',
      priceRangeTitle: 'Estimated Cost Ranges by Facility Tier',
      officialRateCard: 'Official Government Rate Cards (Benchmarked)',
      vaultHeading: 'Real Bill Vault (Community Submissions)',
      sampleSizeLabel: 'Verified Bills on Record',
      medianLabel: 'Median Crowdsourced Cost',
      lastUpdatedLabel: 'Last Updated',
      breakdownTitle: 'Where Does The Money Go? (Cost Breakdown)',
      lowDataWarningTitle: 'Limited Regional Records Available',
      lowDataWarningDesc: 'We have fewer than 5 verified patient bills for this specific procedure in this district. Showing official CGHS rate card as baseline.',
      govtFreeTier: 'Government Hospital',
      trustTier: 'Charitable / Trust',
      privateMidTier: 'Private Nursing / Mid',
      privateCorpTier: 'Private Corporate'
    },
    facilitySection: {
      title: 'Nearby Care Facilities',
      subtitle: 'Sorted by empanelment first, followed by proximity & transparent costs. Quality badges shown only with verified accreditation.',
      sortExplanation: 'Ordering: Empaneled facilities (PM-JAY/State schemes) listed first, then ordered by proximity and affordability.',
      filterAll: 'All Facilities',
      filterGovt: 'Government (Free/Subsidized)',
      filterTrust: 'Charitable Trust',
      filterEmpaneled: 'Scheme Empaneled',
      sortByDistance: 'Sort by Distance',
      sortByCost: 'Sort by Lowest Cost',
      callNow: 'Call Facility',
      openHours: 'Timings',
      ayushmanHelpdesk: 'Ayushman Mitra Helpdesk Available',
      qualityBadgeTitle: 'Accreditation',
      qualitySourceNotice: 'Quality indicators verified against NABH/NABL public registries.'
    },
    schemeSection: {
      title: 'Check Possible Scheme Eligibility',
      subtitle: 'Answer 4 simple questions without sharing Aadhaar or ABHA to find matching health programs.',
      qState: 'State of Residence',
      qRationCard: 'Household Ration Card Type',
      qIncome: 'Estimated Annual Family Income',
      qVulnerability: 'Family Occupation / Category',
      checkEligibilityBtn: 'Check Potential Scheme Matches',
      matchHigh: 'High Potential Match',
      matchModerate: 'Moderate Potential Match',
      matchGeneral: 'General / APL Category',
      docChecklistTitle: 'Recommended Document Checklist',
      officialHelplineTitle: 'Official Contact & Verification Points',
      visitPortalBtn: 'Visit Official Verification Portal',
      helplineNotice: 'Call National Toll-Free: 14555 (24x7) for official eligibility status.',
      noGuaranteeNote: 'Note: OneVision is an independent informational guide. Only government kiosks can issue eligibility cards.'
    },
    vaultSection: {
      title: 'Real Bill Vault: Powering Fair Healthcare',
      subtitle: 'Help other Indian families avoid hospital overcharging. Share your anonymized medical bill.',
      contributeBtn: 'Contribute a Bill Anonymously',
      whyTitle: 'Why Contribute?',
      privacyNotice: 'Zero personal data is stored. Our in-browser privacy scrubber redacts names, phone numbers, and addresses before saving.',
      scrubberTitle: 'Client-side Privacy Scrubber Preview',
      scrubberDesc: 'The following identifying elements have been masked locally on your device:',
      redactedFieldsNotice: 'Patient Name [MASKED], Phone [MASKED], Hospital Registration No. [MASKED]',
      consentCheckbox: 'I confirm that identifying details are redacted, and I voluntarily consent to pooling this rate data to assist fellow citizens.',
      submitBillBtn: 'Submit to Real Bill Vault',
      successMessage: 'Thank you! Your submission has updated the local dataset.'
    },
    accessibility: {
      largeText: 'Large Text',
      highContrast: 'High Contrast',
      readAloud: 'Listen (Audio)',
      stopSpeech: 'Stop Audio'
    }
  },

  hi: {
    appName: 'वनविज़न (OneVision)',
    tagline: 'भारत के नागरिकों के लिए स्वास्थ्य खर्च एवं उपचार मार्गदर्शक',
    badge: 'पायलट संस्करण • केवल जानकारी हेतु',
    disclaimerBanner: 'वनविज़न किसी बीमारी की जांच नहीं करता और न ही किसी अस्पताल खर्च या योजना लाभ की गारंटी देता है। आपातकाल में 108 डायल करें।',
    disclaimerShort: 'केवल अनुमानित जानकारी। यह चिकित्सकीय परामर्श नहीं है।',
    tabs: {
      findCost: '1. खर्च का अनुमान',
      facilities: '2. अस्पताल खोजें',
      schemes: '3. सरकारी योजनाएं',
      vault: '4. रियल बिल वॉल्ट',
      about: 'गोपनीयता व भरोसा'
    },
    regionSelector: {
      label: 'पायलट क्षेत्र',
      changeRegion: 'क्षेत्र बदलें',
      selectedDistrict: 'ज़िला'
    },
    inputSection: {
      title: 'उपचार या टेस्ट बताएं अथवा पर्ची स्कैन करें',
      subtitle: 'टेस्ट का नाम लिखें, अपनी भाषा में बोलें या डॉक्टर की पर्ची की तस्वीर अपलोड करें।',
      tabText: 'लिखकर खोजें',
      tabVoice: 'बोलकर बताएं',
      tabScan: 'पर्ची स्कैन करें (Rx)',
      searchPlaceholder: 'सर्च करें: सोनोग्राफी, मोतियाबिंद, एमआरआई, ब्लड टेस्ट, डिलीवरी...',
      voicePrompt: 'माइक दबाएं और डॉक्टर की सलाह बोलें',
      voiceListening: 'आपकी आवाज सुनी जा रही है... साफ बोलें',
      voiceSamplePrompt: 'या तुरंत आवाज़ का नमूना चुनें:',
      scanPrompt: 'डॉक्टर की पर्ची या टेस्ट रसीद अपलोड करें',
      scanUploadText: 'पर्ची की फोटो यहां खींचें या अपलोड करें',
      scanSampleBtn: 'नमूना भारतीय पर्ची से परखें',
      extracting: 'पर्ची से जानकारी पहचानी जा रही है...',
      reviewTitle: 'पहचानी गई जानकारी की जांच करें',
      reviewSubtitle: 'आगे बढ़ने से पहले कृपया विवरण जांचें। आप इसे बदल भी सकते हैं।',
      procedureLabel: 'आवश्यक टेस्ट या उपचार',
      regionLabel: 'चुना हुआ क्षेत्र',
      districtLabel: 'ज़िला / इलाका',
      settingLabel: 'उपचार का प्रकार',
      confirmBtn: 'अनुमानित खर्च और अस्पताल देखें',
      resetBtn: 'पुनः शुरू करें'
    },
    costSection: {
      title: 'अनुमानित उपचार खर्च',
      priceRangeTitle: 'अस्पताल श्रेणी के अनुसार संभावित खर्च',
      officialRateCard: 'सरकारी दर सूची (CGHS व PM-JAY दरें)',
      vaultHeading: 'रियल बिल वॉल्ट (नागरिकों द्वारा साझा बिल)',
      sampleSizeLabel: 'सत्यापित बिलों की संख्या',
      medianLabel: 'औसत वास्तविक खर्च (Median)',
      lastUpdatedLabel: 'अंतिम अपडेट',
      breakdownTitle: 'पैसे कहां खर्च होते हैं? (खर्च का विवरण)',
      lowDataWarningTitle: 'सीमित स्थानीय आंकड़े उपलब्ध',
      lowDataWarningDesc: 'इस ज़िले में इस टेस्ट के 5 से कम बिल मिले हैं। आधार दर के रूप में सरकारी CGHS दर सूची दिखाई जा रही है।',
      govtFreeTier: 'सरकारी अस्पताल',
      trustTier: 'चैरिटेबल / ट्रस्ट',
      privateMidTier: 'निजी नर्सिंग होम',
      privateCorpTier: 'बड़ा प्राइवेट अस्पताल'
    },
    facilitySection: {
      title: 'नज़दीकी अस्पताल व केंद्र',
      subtitle: 'योजना से जुड़े अस्पताल पहले दिखाए गए हैं, उसके बाद दूरी और सही दरों के आधार पर।',
      sortExplanation: 'क्रम: सरकारी योजना (PM-JAY/राज्य योजना) से जुड़े अस्पताल पहले, फिर कम दूरी और किफायती खर्च।',
      filterAll: 'सभी अस्पताल',
      filterGovt: 'सरकारी (निःशुल्क/कम खर्च)',
      filterTrust: 'चैरिटेबल ट्रस्ट',
      filterEmpaneled: 'योजना से जुड़े अस्पताल',
      sortByDistance: 'दूरी के अनुसार',
      sortByCost: 'कम खर्च के अनुसार',
      callNow: 'फोन करें',
      openHours: 'समय',
      ayushmanHelpdesk: 'आयुष्मान मित्र हेल्पडेस्क उपलब्ध',
      qualityBadgeTitle: 'गुणवत्ता प्रमाणन',
      qualitySourceNotice: 'प्रमाणपत्र आधिकारिक NABH/NABL रिकॉर्ड से सत्यापित हैं।'
    },
    schemeSection: {
      title: 'सरकारी स्वास्थ्य योजना पात्रता जांचें',
      subtitle: 'बिना आधार या आभा नंबर दिए 4 आसान सवालों के जवाब देकर संभावित योजना जानें।',
      qState: 'आपका राज्य',
      qRationCard: 'राशन कार्ड का प्रकार',
      qIncome: 'परिवार की अनुमानित वार्षिक आय',
      qVulnerability: 'पेशा / पारिवारिक श्रेणी',
      checkEligibilityBtn: 'पात्रता की संभावना जांचें',
      matchHigh: 'उच्च पात्रता संभावना',
      matchModerate: 'मध्यम पात्रता संभावना',
      matchGeneral: 'सामान्य (APL) श्रेणी',
      docChecklistTitle: 'ज़रूरी दस्तावेज़ों की सूची',
      officialHelplineTitle: 'आधिकारिक सहायता और केंद्र',
      visitPortalBtn: 'आधिकारिक पोर्टल खोलें',
      helplineNotice: 'पुष्टि के लिए राष्ट्रीय टोल-फ्री 14555 (24x7) पर कॉल करें।',
      noGuaranteeNote: 'सूचना: वनविज़न केवल मार्गदर्शक है। कार्ड केवल सरकारी केंद्रों पर ही जारी होते हैं।'
    },
    vaultSection: {
      title: 'रियल बिल वॉल्ट: पारदर्शी स्वास्थ्य सेवा',
      subtitle: 'दूसरे परिवारों को अधिक बिल से बचाएं। अपना अनाम अस्पताल बिल साझा करें।',
      contributeBtn: 'अनाम बिल साझा करें',
      whyTitle: 'बिल क्यों साझा करें?',
      privacyNotice: 'कोई व्यक्तिगत जानकारी सुरक्षित नहीं की जाती। नाम, फोन और पता आपके फोन में ही मिटा दिया जाता है।',
      scrubberTitle: 'गोपनीयता सुरक्षा पूर्वावलोकन',
      scrubberDesc: 'आपकी सुरक्षा के लिए ये विवरण तुरंत हटा दिए गए हैं:',
      redactedFieldsNotice: 'मरीज़ का नाम [गोपनीय], मोबाइल [गोपनीय], अस्पताल पंजीकरण [गोपनीय]',
      consentCheckbox: 'मैं पुष्टि करता/करती हूं कि पहचान संबंधी विवरण मिटा दिए गए हैं और मैं स्वेच्छा से यह दर जानकारी साझा कर रहा/रही हूं।',
      submitBillBtn: 'वॉल्ट में सुरक्षित दर्ज करें',
      successMessage: 'धन्यवाद! आपके बिल से हमारे क्षेत्र के आंकड़ों में सुधार हुआ है।'
    },
    accessibility: {
      largeText: 'बड़ा अक्षर',
      highContrast: 'हाई कंट्रास्ट',
      readAloud: 'सुनें (ऑडियो)',
      stopSpeech: 'ऑडियो रोकें'
    }
  },

  te: {
    appName: 'వన్ విజన్ (OneVision)',
    tagline: 'వైద్య ఖర్చులు & సేవల మార్గదర్శి',
    badge: 'పైలట్ వెర్షన్ • సమాచార నిమిత్తం మాత్రమే',
    disclaimerBanner: 'వన్ విజన్ వ్యాధి నిర్ధారణ చేయదు, ఆసుపత్రి ఖర్చులు లేదా పథకాలకు హామీ ఇవ్వదు. అత్యవసర సమయంలో 108కి కాల్ చేయండి.',
    disclaimerShort: 'సమాచార అంచనా మాత్రమే. వైద్య సలహా కాదు.',
    tabs: {
      findCost: '1. ఖర్చు అంచనా',
      facilities: '2. ఆసుపత్రులు',
      schemes: '3. ఆరోగ్య పథకాలు',
      vault: '4. రియల్ బిల్ వాల్ట్',
      about: 'భరోసా & గోప్యత'
    },
    regionSelector: {
      label: 'పైలట్ ప్రాంతం',
      changeRegion: 'ప్రాంతం మార్చండి',
      selectedDistrict: 'జిల్లా'
    },
    inputSection: {
      title: 'వైద్య అవసరాన్ని తెలపండి లేదా ప్రిస్క్రిప్షన్ స్కాన్ చేయండి',
      subtitle: 'టెస్ట్ పేరు రాయండి, మీ భాషలో మాట్లాడండి లేదా డాక్టర్ చీటీ ఫోటో అప్‌లోడ్ చేయండి.',
      tabText: 'టైప్ చేయండి',
      tabVoice: 'వాయిస్ / మాట్లాడండి',
      tabScan: 'ప్రిస్క్రిప్షన్ స్కాన్ (Rx)',
      searchPlaceholder: 'స్కాన్, క్యాటరాక్ట్, అల్ట్రాసౌండ్, రక్త పరీక్ష, డెలివరీ మొదలైనవి...',
      voicePrompt: 'మైక్ నొక్కి డాక్టర్ చెప్పిన వివరాలు మాట్లాడండి',
      voiceListening: 'వాయిస్ రికార్డ్ అవుతోంది... స్పష్టంగా మాట్లాడండి',
      voiceSamplePrompt: 'లేదా నమూనా వాయిస్ ఎంచుకోండి:',
      scanPrompt: 'డాక్టర్ ప్రిస్క్రిప్షన్ లేదా బిల్ స్లిప్ అప్‌లోడ్ చేయండి',
      scanUploadText: 'ఇక్కడ ఫోటోను డ్రాగ్ చేయండి లేదా క్లిక్ చేయండి',
      scanSampleBtn: 'తెలుగు నమూనా చీటీతో ప్రయత్నించండి',
      extracting: 'వివరాలు పరిశీలిస్తున్నాము...',
      reviewTitle: 'గుర్తించిన వివరాలను సమీక్షించండి',
      reviewSubtitle: 'ముందుకు వెళ్లేముందు ఈ వివరాలు సరిచూసుకోండి. అవసరమైతే మార్చవచ్చు.',
      procedureLabel: 'కావలసిన పరీక్ష / శస్త్రచికిత్స',
      regionLabel: 'ఎంచుకున్న ప్రాంతం',
      districtLabel: 'జిల్లా',
      settingLabel: 'చికిత్స రకం',
      confirmBtn: 'అంచనా ఖర్చులు & ఆసుపత్రులు చూడండి',
      resetBtn: 'మళ్లీ ప్రారంభించండి'
    },
    costSection: {
      title: 'అంచనా వేయబడిన చికిత్స ఖర్చు',
      priceRangeTitle: 'ఆసుపత్రి రకాన్ని బట్టి సాధ్యమయ్యే ఖర్చులు',
      officialRateCard: 'ప్రభుత్వ రేట్ కార్డులు (CGHS & ఆరోగ్యశ్రీ రేట్లు)',
      vaultHeading: 'రియల్ బిల్ వాల్ట్ (ప్రజలు పంచుకున్న బిల్లులు)',
      sampleSizeLabel: 'ధృవీకరించబడిన బిల్లులు',
      medianLabel: 'సగటు వాస్తవ ఖర్చు (Median)',
      lastUpdatedLabel: 'చివరి నవీకరణ',
      breakdownTitle: 'డబ్బు దేనికి ఖర్చవుతుంది? (విభజన)',
      lowDataWarningTitle: 'పరిమిత స్థానిక సమాచారం అందుబాటులో ఉంది',
      lowDataWarningDesc: 'ఈ జిల్లాలో ఈ పరీక్షకు 5 కంటే తక్కువ బిల్లులు ఉన్నాయి. ప్రభుత్వ CGHS ప్రాథమిక రేటు చూపబడుతోంది.',
      govtFreeTier: 'ప్రభుత్వ ఆసుపత్రి',
      trustTier: 'ట్రస్ట్ / ధార్మిక ఆసుపత్రి',
      privateMidTier: 'ప్రైవేట్ నర్సింగ్ హోమ్',
      privateCorpTier: 'కార్పొరేట్ ఆసుపత్రి'
    },
    facilitySection: {
      title: 'సమీపంలోని ఆసుపత్రులు',
      subtitle: 'ఆరోగ్యశ్రీ/PM-JAY ఆసుపత్రులు మొదట, ఆపై దూరం మరియు సరసమైన ఖర్చుల ప్రకారం చూపబడతాయి.',
      sortExplanation: 'క్రమం: ప్రభుత్వ పథకాలు ఉన్న ఆసుపత్రులు ముందుగా, ఆపై దూరం & పారదర్శక ఖర్చులు.',
      filterAll: 'అన్ని ఆసుపత్రులు',
      filterGovt: 'ప్రభుత్వ (ఉచిత/రాయితీ)',
      filterTrust: 'ట్రస్ట్ ఆసుపత్రులు',
      filterEmpaneled: 'పథకం ఉన్న ఆసుపత్రులు',
      sortByDistance: 'దూరం ప్రకారం',
      sortByCost: 'తక్కువ ఖర్చు ప్రకారం',
      callNow: 'కాల్ చేయండి',
      openHours: 'సమయాలు',
      ayushmanHelpdesk: 'ఆరోగ్యమిత్ర సహాయ కేంద్రం కలదు',
      qualityBadgeTitle: 'నాణ్యత గుర్తింపు',
      qualitySourceNotice: 'NABH/NABL అధికారిక పోర్టల్ ద్వారా ధృవీకరించబడింది.'
    },
    schemeSection: {
      title: 'ప్రభుత్వ పథకాల అర్హతను తనిఖీ చేయండి',
      subtitle: 'ఆధార్ లేదా ABHA అవసరం లేకుండా 4 సాధారణ ప్రశ్నలకు సమాధానమివ్వండి.',
      qState: 'నివాస రాష్ట్రం',
      qRationCard: 'రేషన్ కార్డు రకం',
      qIncome: 'కుటుంబ వార్షిక ఆదాయం',
      qVulnerability: 'వృత్తి / విభాగం',
      checkEligibilityBtn: 'అర్హత అవకాశాలను చూడండి',
      matchHigh: 'అధిక అర్హత అవకాశం',
      matchModerate: 'మధ్యస్థ అర్హత అవకాశం',
      matchGeneral: 'సాధారణ (APL) విభాగం',
      docChecklistTitle: 'అవసరమైన పత్రాల జాబితా',
      officialHelplineTitle: 'అధికారిక హెల్ప్‌లైన్ & కేంద్రాలు',
      visitPortalBtn: 'అధికారిక పోర్టల్ సందర్శించండి',
      helplineNotice: 'ధృవీకరణ కొరకు 14555 లేదా 104 టోల్ ఫ్రీ నంబరుకు కాల్ చేయండి.',
      noGuaranteeNote: 'గమనిక: వన్ విజన్ కేవలం సమాచార మార్గదర్శి మాత్రమే.'
    },
    vaultSection: {
      title: 'రియల్ బిల్ వాల్ట్: పారదర్శక ఆరోగ్య సేవలు',
      subtitle: 'ఇతర కుటుంబాలు మోసపోకుండా మీ అనామక ఆసుపత్రి బిల్లును పంచుకోండి.',
      contributeBtn: 'అనామక బిల్లును సమర్పించండి',
      whyTitle: 'ఎందుకు పంచుకోవాలి?',
      privacyNotice: 'వ్యక్తిగత వివరాలు ఏవీ సేకరించబడవు. పేరు, ఫోన్ నంబర్లు మీ ఫోన్‌లోనే తొలగించబడతాయి.',
      scrubberTitle: 'గోప్యతా ప్రివ్యూ',
      scrubberDesc: 'మీ రక్షణ కొరకు ఈ క్రింది వివరాలు తొలగించబడ్డాయి:',
      redactedFieldsNotice: 'రోగి పేరు [తొలగించబడింది], ఫోన్ [తొలగించబడింది]',
      consentCheckbox: 'నా వివరాలు తొలగించబడ్డాయని ధృవీకరిస్తున్నాను మరియు ప్రజల ప్రయోజనం కొరకు ఈ రేటు వివరాలను స్వచ్ఛందంగా సమర్పిస్తున్నాను.',
      submitBillBtn: 'వాల్ట్‌లో నమోదు చేయండి',
      successMessage: 'ధన్యవాదాలు! మీ బిల్లు సమాచారం జోడించబడింది.'
    },
    accessibility: {
      largeText: 'పెద్ద అక్షరాలు',
      highContrast: 'హై కాంట్రాస్ట్',
      readAloud: 'వినండి (ఆడియో)',
      stopSpeech: 'ఆపండి'
    }
  },

  ta: {
    appName: 'ஒன்விஷன் (OneVision)',
    tagline: 'மருத்துவச் செலவு மற்றும் வழிகாட்டி',
    badge: 'முன்னோடித் திட்டம் • தகவல் மட்டுமே',
    disclaimerBanner: 'ஒன்விஷன் (OneVision) மருத்துவப் பரிசோதனை செய்வதோ அல்லது கட்டணங்களுக்கு உத்தரவாதமோ அளிப்பதில்லை. அவசரத்திற்கு 108 ஐ அழைக்கவும்.',
    disclaimerShort: 'தகவல் மதிப்பீடு மட்டுமே. மருத்துவ ஆலோசனை அல்ல.',
    tabs: {
      findCost: '1. செலவு மதிப்பீடு',
      facilities: '2. மருத்துவமனைகள்',
      schemes: '3. அரசுத் திட்டங்கள்',
      vault: '4. ரசீது பெட்டகம்',
      about: 'நம்பகத்தன்மை'
    },
    regionSelector: {
      label: 'பிராந்தியம்',
      changeRegion: 'மாற்றுக',
      selectedDistrict: 'மாவட்டம்'
    },
    inputSection: {
      title: 'தேவையை உள்ளிடவும் அல்லது சீட்டை ஸ்கேன் செய்யவும்',
      subtitle: 'பரிசோதனை பெயரை எழுதவும், பேசவும் அல்லது மருந்துச் சீட்டைப் பதிவேற்றவும்.',
      tabText: 'எழுதுக',
      tabVoice: 'குரல்வழி',
      tabScan: 'சீட்டு ஸ்கேன் (Rx)',
      searchPlaceholder: 'அல்ட்ராசவுண்ட், கண்புரை, எம்.ஆர்.ஐ, இரத்தப் பரிசோதனை...',
      voicePrompt: 'மைக்கை அழுத்தி மருத்துவத் தேவையைப் பேசவும்',
      voiceListening: 'கேட்கிறது... தெளிவாகப் பேசவும்',
      voiceSamplePrompt: 'மாதிரி குரல் முயற்சி செய்க:',
      scanPrompt: 'மருத்துவர் சீட்டு புகைப்படத்தைப் பதிவேற்றவும்',
      scanUploadText: 'படத்தை இங்கே இழுக்கவும் அல்லது கிளிக் செய்யவும்',
      scanSampleBtn: 'மாதிரி சீட்டு மூலம் சோதிக்கவும்',
      extracting: 'விவரங்கள் ஆராயப்படுகின்றன...',
      reviewTitle: 'விவரங்களைச் சரிபார்க்கவும்',
      reviewSubtitle: 'செலவைக் கணக்கிடும் முன் விவரங்களைச் சரிபார்க்கவும்.',
      procedureLabel: 'பரிசோதனை / சிகிச்சை',
      regionLabel: 'தேர்ந்தெடுக்கப்பட்ட பகுதி',
      districtLabel: 'மாவட்டம்',
      settingLabel: 'சிகிச்சை வகை',
      confirmBtn: 'செலவு மற்றும் விவரங்களைக் காண்க',
      resetBtn: 'மீண்டும் தொடங்குக'
    },
    costSection: {
      title: 'தோராயமான சிகிச்சைச் செலவு',
      priceRangeTitle: 'மருத்துவமனை வகைக்கேற்ப உத்தேசச் செலவு',
      officialRateCard: 'அரசு அங்கீகரிக்கப்பட்ட கட்டண அட்டை (CGHS & PM-JAY)',
      vaultHeading: 'மக்கள் பகிர்ந்த மருத்துவ ரசீதுகள் (Vault)',
      sampleSizeLabel: 'சரிபார்க்கப்பட்ட ரசீதுகள்',
      medianLabel: 'சராசரி செலவு (Median)',
      lastUpdatedLabel: 'கடைசி புதுப்பிப்பு',
      breakdownTitle: 'செலவுப் பிரிவுகள் (Breakdown)',
      lowDataWarningTitle: 'குறைந்த பதிவுகள் மட்டுமே உள்ளன',
      lowDataWarningDesc: 'இப்பகுதியில் 5 க்கும் குறைவான ரசீதுகள் மட்டுமே உள்ளன. அரசு CGHS விகிதம் காட்டப்படுகிறது.',
      govtFreeTier: 'அரசு மருத்துவமனை',
      trustTier: 'அறக்கட்டளை',
      privateMidTier: 'தனியார் நர்சிங் ஹோம்',
      privateCorpTier: 'கார்ப்பரேட் மருத்துவமனை'
    },
    facilitySection: {
      title: 'அருகிலுள்ள மருத்துவமனைகள்',
      subtitle: 'திட்ட அங்கீகாரம் பெற்றவை முதலில் வரிசைப்படுத்தப்பட்டுள்ளன.',
      sortExplanation: 'வரிசை: அரசு காப்பீட்டுத் திட்டங்கள் உள்ளவை முதலில், பின் அருகாமை & நியாயமான கட்டணம்.',
      filterAll: 'அனைத்தும்',
      filterGovt: 'அரசு (இலவசம்/மானியக் கட்டணம்)',
      filterTrust: 'அறக்கட்டளை',
      filterEmpaneled: 'திட்டம் உள்ளவை',
      sortByDistance: 'தூரம் வாரியாக',
      sortByCost: 'குறைந்த கட்டணம் வாரியாக',
      callNow: 'அழைக்க',
      openHours: 'நேரம்',
      ayushmanHelpdesk: 'ஆயுஷ்மான் மித்ரா உதவி மையம் உள்ளது',
      qualityBadgeTitle: 'தரச் சான்றிதழ்',
      qualitySourceNotice: 'NABH/NABL இணையதளத்திலிருந்து சரிபார்க்கப்பட்டது.'
    },
    schemeSection: {
      title: 'அரசு மருத்துவக் காப்பீட்டுத் தகுதி',
      subtitle: 'ஆதார் இன்றி 4 எளிய கேள்விகளுக்குப் பதிலளித்து தகுதியை அறியவும்.',
      qState: 'வசிக்கும் மாநிலம்',
      qRationCard: 'ரேஷன் அட்டை வகை',
      qIncome: 'குடும்ப ஆண்டு வருமானம்',
      qVulnerability: 'தொழில் / பிரிவு',
      checkEligibilityBtn: 'தகுதியைச் சரிபார்க்கவும்',
      matchHigh: 'அதிக சாத்தியம்',
      matchModerate: 'மிதமான சாத்தியம்',
      matchGeneral: 'பொது (APL) பிரிவு',
      docChecklistTitle: 'தேவையான ஆவணங்கள்',
      officialHelplineTitle: 'உதவி எண் & மையங்கள்',
      visitPortalBtn: 'அதிகாரப்பூர்வ தளம் செல்க',
      helplineNotice: 'உறுதிப்படுத்த 14555 அல்லது 104 ஐ அழைக்கவும்.',
      noGuaranteeNote: 'குறிப்பு: இது தகவல் வழிகாட்டி மட்டுமே.'
    },
    vaultSection: {
      title: 'ரியல் பில் வால்ட்: வெளிப்படையான மருத்துவம்',
      subtitle: 'மற்ற குடும்பங்களுக்கு உதவ உங்கள் மருத்துவ ரசீதை அடையாளமின்றிப் பகிருங்கள்.',
      contributeBtn: 'ரசீதைப் பகிரவும்',
      whyTitle: 'ஏன் பகிர வேண்டும்?',
      privacyNotice: 'பெயர், தொலைபேசி எண்கள் உங்கள் சாதனத்திலேயே அழிக்கப்பட்டுவிடும்.',
      scrubberTitle: 'பாதுகாப்பு முன்னோட்டம்',
      scrubberDesc: 'தனிநபர் விவரங்கள் நீக்கப்பட்டுள்ளன:',
      redactedFieldsNotice: 'நோயாளி பெயர் [மறைக்கப்பட்டது], போன் [மறைக்கப்பட்டது]',
      consentCheckbox: 'விவரங்கள் மறைக்கப்பட்டுள்ளதை உறுதிசெய்து, பொது நலனுக்காக வழங்க ஒப்புக்கொள்கிறேன்.',
      submitBillBtn: 'பதிவு செய்க',
      successMessage: 'நன்றி! உங்கள் ரசீது தகவல் சேர்க்கப்பட்டது.'
    },
    accessibility: {
      largeText: 'பெரிய எழுத்து',
      highContrast: 'ஹை கான்ட்ராஸ்ட்',
      readAloud: 'கேட்க (Audio)',
      stopSpeech: 'நிறுத்துக'
    }
  },

  kn: {
    appName: 'ಒನ್ ವಿಷನ್ (OneVision)',
    tagline: 'ಆರೋಗ್ಯ ವೆಚ್ಚ ಮತ್ತು ಆರೈಕೆ ಮಾರ್ಗದರ್ಶಿ',
    badge: 'ಪ್ರಾಯೋಗಿಕ ಆವೃತ್ತಿ • ಮಾಹಿತಿ ಉದ್ದೇಶಕ್ಕೆ ಮಾತ್ರ',
    disclaimerBanner: 'ಒನ್ ವಿಷನ್ (OneVision) ರೋಗನಿರ್ಣಯ ಮಾಡುವುದಿಲ್ಲ ಅಥವಾ ದರಗಳಿಗೆ ಖಾತರಿ ನೀಡುವುದಿಲ್ಲ. ತುರ್ತು ಸಂದರ್ಭದಲ್ಲಿ 108 ಕರೆ ಮಾಡಿ.',
    disclaimerShort: 'ಮಾಹಿತಿ ಅಂದಾಜು ಮಾತ್ರ. ವೈದ್ಯಕೀಯ ಸಲಹೆಯಲ್ಲ.',
    tabs: {
      findCost: '1. ವೆಚ್ಚ ಅಂದಾಜು',
      facilities: '2. ಆಸ್ಪತ್ರೆಗಳು',
      schemes: '3. ಆರೋಗ್ಯ ಯೋಜನೆಗಳು',
      vault: '4. ರಿಯಲ್ ಬಿಲ್ ವಾಲ್ಟ್',
      about: 'ಭರವಸೆ ಮತ್ತು ಗೌಪ್ಯತೆ'
    },
    regionSelector: {
      label: 'ಪ್ರಾಯೋಗಿಕ ಪ್ರದೇಶ',
      changeRegion: 'ಪ್ರದೇಶ ಬದಲಿಸಿ',
      selectedDistrict: 'ಜಿಲ್ಲೆ'
    },
    inputSection: {
      title: 'ವೈದ್ಯಕೀಯ ಅಗತ್ಯ ತಿಳಿಸಿ ಅಥವಾ ಚೀಟಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
      subtitle: 'ಪರೀಕ್ಷೆಯ ಹೆಸರು ಬರೆಯಿರಿ, ಧ್ವನಿ ಬಳಸಿ ಮಾತನಾಡಿ ಅಥವಾ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಫೋಟೋ ಅಪ್ಲೋಡ್ ಮಾಡಿ.',
      tabText: 'ಬರೆದು ಹುಡುಕಿ',
      tabVoice: 'ಧ್ವನಿ / ಮಾತನಾಡಿ',
      tabScan: 'ಚೀಟಿ ಸ್ಕ್ಯಾನ್ (Rx)',
      searchPlaceholder: 'ಅಲ್ಟ್ರಾಸೌಂಡ್, ಕಣ್ಣಿನ ಪೊರೆ, ಎಂಆರ್‌ಐ, ರಕ್ತ ಪರೀಕ್ಷೆ...',
      voicePrompt: 'ಮೈಕ್ ಒತ್ತಿ ವೈದ್ಯರ ಸಲಹೆಯನ್ನು ಮಾತನಾಡಿ',
      voiceListening: 'ಧ್ವನಿ ಆಲಿಸಲಾಗುತ್ತಿದೆ... ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಿ',
      voiceSamplePrompt: 'ಮಾದರಿ ಧ್ವನಿ ಪ್ರಯತ್ನಿಸಿ:',
      scanPrompt: 'ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಫೋಟೋ ಅಪ್ಲೋಡ್ ಮಾಡಿ',
      scanUploadText: 'ಚಿತ್ರವನ್ನು ಇಲ್ಲಿ ಎಳೆಯಿರಿ ಅಥವಾ ಕ್ಲಿಕ್ ಮಾಡಿ',
      scanSampleBtn: 'ಮಾದರಿ ಚೀಟಿಯೊಂದಿಗೆ ಪರೀಕ್ಷಿಸಿ',
      extracting: 'ವಿವರಗಳನ್ನು ಗುರುತಿಸಲಾಗುತ್ತಿದೆ...',
      reviewTitle: 'ಗುರುತಿಸಲಾದ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ',
      reviewSubtitle: 'ವೆಚ್ಚ ನೋಡುವ ಮುನ್ನ ವಿವರಗಳನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.',
      procedureLabel: 'ಅಗತ್ಯವಿರುವ ಪರೀಕ್ಷೆ / ಚಿಕಿತ್ಸೆ',
      regionLabel: 'ಆಯ್ಕೆಮಾಡಿದ ಪ್ರದೇಶ',
      districtLabel: 'ಜಿಲ್ಲೆ',
      settingLabel: 'ಚಿಕಿತ್ಸಾ ವಿಧಾನ',
      confirmBtn: 'ಅಂದಾಜು ವೆಚ್ಚ ಮತ್ತು ಆಸ್ಪತ್ರೆಗಳನ್ನು ನೋಡಿ',
      resetBtn: 'ಮತ್ತೆ ಪ್ರಾರಂಭಿಸಿ'
    },
    costSection: {
      title: 'ಅಂದಾಜು ಚಿಕಿತ್ಸಾ ವೆಚ್ಚ',
      priceRangeTitle: 'ಆಸ್ಪತ್ರೆಯ ಪ್ರಕಾರ ಸಂಭವನೀಯ ವೆಚ್ಚಗಳು',
      officialRateCard: 'ಸರ್ಕಾರಿ ದರಪಟ್ಟಿ (CGHS & AB-ArK)',
      vaultHeading: 'ರಿಯಲ್ ಬಿಲ್ ವಾಲ್ಟ್ (ಜನರು ಹಂಚಿಕೊಂಡ ಬಿಲ್‌ಗಳು)',
      sampleSizeLabel: 'ದೃಢೀಕರಿಸಿದ ಬಿಲ್‌ಗಳು',
      medianLabel: 'ಸರಾಸರಿ ವೆಚ್ಚ (Median)',
      lastUpdatedLabel: 'ಕೊನೆಯ ನವೀಕರಣ',
      breakdownTitle: 'ವೆಚ್ಚದ ವಿವರಗಳು (Breakdown)',
      lowDataWarningTitle: 'ಕಡಿಮೆ ಮಾಹಿತಿ ಲಭ್ಯವಿದೆ',
      lowDataWarningDesc: 'ಈ ಜಿಲ್ಲೆಯಲ್ಲಿ 5 ಕ್ಕಿಂತ ಕಡಿಮೆ ಬಿಲ್‌ಗಳಿವೆ. ಸರ್ಕಾರಿ CGHS ದರ ತೋರಿಸಲಾಗುತ್ತಿದೆ.',
      govtFreeTier: 'ಸರ್ಕಾರಿ ಆಸ್ಪತ್ರೆ',
      trustTier: 'ಟ್ರಸ್ಟ್ / ಚಾರಿಟೇಬಲ್',
      privateMidTier: 'ಖಾಸಗಿ ನರ್ಸಿಂಗ್ ಹೋಮ್',
      privateCorpTier: 'ಕಾರ್ಪೊರೇಟ್ ಆಸ್ಪತ್ರೆ'
    },
    facilitySection: {
      title: 'ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗಳು',
      subtitle: 'ಯೋಜನೆ ಹೊಂದಿರುವ ಆಸ್ಪತ್ರೆಗಳನ್ನು ಮೊದಲಿಗೆ ತೋರಿಸಲಾಗಿದೆ.',
      sortExplanation: 'ಕ್ರಮ: ಸರ್ಕಾರಿ ಯೋಜನೆಗಳಿರುವ ಆಸ್ಪತ್ರೆಗಳು ಮೊದಲು, ನಂತರ ಸಾಮೀಪ್ಯ ಮತ್ತು ಕೈಗೆಟುಕುವ ವೆಚ್ಚ.',
      filterAll: 'ಎಲ್ಲಾ ಆಸ್ಪತ್ರೆಗಳು',
      filterGovt: 'ಸರ್ಕಾರಿ (ಉಚಿತ/ರಿಯಾಯಿತಿ)',
      filterTrust: 'ಟ್ರಸ್ಟ್ ಆಸ್ಪತ್ರೆಗಳು',
      filterEmpaneled: 'ಯೋಜನೆ ಹೊಂದಿರುವ ಆಸ್ಪತ್ರೆಗಳು',
      sortByDistance: 'ದೂರದ ಪ್ರಕಾರ',
      sortByCost: 'ಕಡಿಮೆ ವೆಚ್ಚದ ಪ್ರಕಾರ',
      callNow: 'ಕರೆ ಮಾಡಿ',
      openHours: 'ಸಮಯ',
      ayushmanHelpdesk: 'ಆರೋಗ್ಯ ಮಿತ್ರ ಕೇಂದ್ರ ಲಭ್ಯವಿದೆ',
      qualityBadgeTitle: 'ಗುಣಮಟ್ಟ ಪ್ರಮಾಣಪತ್ರ',
      qualitySourceNotice: 'NABH/NABL ನಿಂದ ದೃಢೀಕರಿಸಲಾಗಿದೆ.'
    },
    schemeSection: {
      title: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ',
      subtitle: 'ಆಧಾರ್ ನೀಡದೆ 4 ಸರಳ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ.',
      qState: 'ವಾಸಿಸುವ ರಾಜ್ಯ',
      qRationCard: 'ಪಡಿತರ ಚೀಟಿ ಪ್ರಕಾರ',
      qIncome: 'ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ',
      qVulnerability: 'ಉದ್ಯೋಗ / ವರ್ಗ',
      checkEligibilityBtn: 'ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ',
      matchHigh: 'ಹೆಚ್ಚಿನ ಅರ್ಹತೆ',
      matchModerate: 'ಮಧ್ಯಮ ಅರ್ಹತೆ',
      matchGeneral: 'ಸಾಮಾನ್ಯ (APL) ವರ್ಗ',
      docChecklistTitle: 'ಅಗತ್ಯ ದಾಖಲೆಗಳು',
      officialHelplineTitle: 'ಸಹಾಯವಾಣಿ ಮತ್ತು ಕೇಂದ್ರಗಳು',
      visitPortalBtn: 'ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ',
      helplineNotice: 'ದೃಢೀಕರಣಕ್ಕಾಗಿ 14555 ಕರೆ ಮಾಡಿ.',
      noGuaranteeNote: 'ಗಮನಿಸಿ: ಒನ್ ವಿಷನ್ ಕೇವಲ ಮಾಹಿತಿ ಮಾರ್ಗದರ್ಶಿ.'
    },
    vaultSection: {
      title: 'ರಿಯಲ್ ಬಿಲ್ ವಾಲ್ಟ್: ಪಾರದರ್ಶಕ ಆರೋಗ್ಯ',
      subtitle: 'ಇತರ ಕುಟುಂಬಗಳಿಗೆ ನೆರವಾಗಲು ನಿಮ್ಮ ಬಿಲ್ ಹಂಚಿಕೊಳ್ಳಿ.',
      contributeBtn: 'ಅನಾಮಧೇಯ ಬಿಲ್ ಹಂಚಿಕೊಳ್ಳಿ',
      whyTitle: 'ಏಕೆ ಹಂಚಿಕೊಳ್ಳಬೇಕು?',
      privacyNotice: 'ಹೆಸರು ಮತ್ತು ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗಳನ್ನು ನಿಮ್ಮ ಫೋನ್‌ನಲ್ಲೇ ಅಳಿಸಲಾಗುತ್ತದೆ.',
      scrubberTitle: 'ಗೌಪ್ಯತೆ ರಕ್ಷಣೆ',
      scrubberDesc: 'ವೈಯಕ್ತಿಕ ವಿವರಗಳನ್ನು ತೆಗೆದುಹಾಕಲಾಗಿದೆ:',
      redactedFieldsNotice: 'ರೋಗಿಯ ಹೆಸರು [ರದ್ದುಮಾಡಲಾಗಿದೆ], ಫೋನ್ [ರದ್ದುಮಾಡಲಾಗಿದೆ]',
      consentCheckbox: 'ವಿವರಗಳು ಗೌಪ್ಯವಾಗಿವೆ ಎಂದು ಖಚಿತಪಡಿಸಿ ಸಾರ್ವಜನಿಕ ಹಿತದೃಷ್ಟಿಯಿಂದ ಹಂಚಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ.',
      submitBillBtn: 'ವಾಲ್ಟ್‌ಗೆ ಸಲ್ಲಿಸಿ',
      successMessage: 'ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಬಿಲ್ ಮಾಹಿತಿ ಸೇರಿಸಲಾಗಿದೆ.'
    },
    accessibility: {
      largeText: 'ದೊಡ್ಡ ಅಕ್ಷರಗಳು',
      highContrast: 'ಹೈ ಕಾಂಟ್ರಾಸ್ಟ್',
      readAloud: 'ಕೇಳಿ (Audio)',
      stopSpeech: 'ನಿಲ್ಲಿಸಿ'
    }
  },

  bn: {
    appName: 'ওয়ানভিশন (OneVision)',
    tagline: 'স্বাস্থ্যসেবা খরচ এবং সঠিক চিকিৎসার সহায়িকা',
    badge: 'পাইলট সংস্করণ • শুধুমাত্র তথ্যের জন্য',
    disclaimerBanner: 'ওয়ানভিশন (OneVision) রোগ নির্ণয় করে না বা খরচের গ্যারান্টি দেয় না। জরুরি অবস্থায় ১০৮ ডায়াল করুন।',
    disclaimerShort: 'শুধুমাত্র আনুমানিক তথ্য। এটি কোনো চিকিৎসা পরামর্শ নয়।',
    tabs: {
      findCost: '১. খরচ অনুমান',
      facilities: '২. হাসপাতাল খুঁজুন',
      schemes: '৩. সরকারি প্রকল্প',
      vault: '৪. রিয়েল বিল ভল্ট',
      about: 'বিশ্বাস ও গোপনীয়তা'
    },
    regionSelector: {
      label: 'পাইলট অঞ্চল',
      changeRegion: 'অঞ্চল পরিবর্তন করুন',
      selectedDistrict: 'জেলা'
    },
    inputSection: {
      title: 'প্রয়োজনীয় টেস্ট জানান বা প্রেসক্রিপশন স্ক্যান করুন',
      subtitle: 'টেস্টের নাম লিখুন, মুখে বলুন অথবা ডাক্তারের প্রেসক্রিপশনের ছবি আপলোড করুন।',
      tabText: 'লিখে খুঁজুন',
      tabVoice: 'ভয়েস / বলুন',
      tabScan: 'প্রেসক্রিপশন স্ক্যান (Rx)',
      searchPlaceholder: 'আল্ট্রাসাউন্ড, ছানি অপারেশন, এমআরআই, রক্ত পরীক্ষা...',
      voicePrompt: 'মাইক্রোফোন টিপে আপনার প্রেসক্রিপশন বলুন',
      voiceListening: 'শোনা হচ্ছে... পরিষ্কারভাবে বলুন',
      voiceSamplePrompt: 'অথবা নমুনা ভয়েস ট্রাই করুন:',
      scanPrompt: 'ডাক্তারের প্রেসক্রিপশন বা টেস্টের রসিদ আপলোড করুন',
      scanUploadText: 'এখানে ছবি টানুন বা ক্লিক করে বাছুন',
      scanSampleBtn: 'নমুনা প্রেসক্রিপশন দিয়ে চেষ্টা করুন',
      extracting: 'তথ্য বিশ্লেষণ করা হচ্ছে...',
      reviewTitle: 'শনাক্ত করা তথ্য যাচাই করুন',
      reviewSubtitle: 'খরচ দেখার আগে তথ্যগুলো ঠিক আছে কিনা দেখুন। আপনি পরিবর্তনও করতে পারেন।',
      procedureLabel: 'প্রয়োজনীয় পরীক্ষা / চিকিৎসা',
      regionLabel: 'নির্বাচিত অঞ্চল',
      districtLabel: 'জেলা',
      settingLabel: 'চিকিৎসার ধরন',
      confirmBtn: 'আনুমানিক খরচ ও বিকল্প দেখুন',
      resetBtn: 'নতুন করে শুরু করুন'
    },
    costSection: {
      title: 'সম্ভাব্য চিকিৎসা খরচ',
      priceRangeTitle: 'হাসপাতালের ধরন অনুযায়ী সম্ভাব্য খরচ',
      officialRateCard: 'সরকারি নির্ধারিত রেট কার্ড (CGHS ও PM-JAY)',
      vaultHeading: 'রিয়েল বিল ভল্ট (জনগণের শেয়ার করা বিল)',
      sampleSizeLabel: 'যাচাইকৃত বিলের সংখ্যা',
      medianLabel: 'গড় বাস্তব খরচ (Median)',
      lastUpdatedLabel: 'সর্বশেষ আপডেট',
      breakdownTitle: 'খরচের বিভাজন (Cost Breakdown)',
      lowDataWarningTitle: 'সীমিত তথ্য উপলব্ধ',
      lowDataWarningDesc: 'এই জেলায় ৫টির কম বিল সংগৃহীত হয়েছে। সরকারি CGHS রেট বেসলাইন হিসেবে দেখানো হচ্ছে।',
      govtFreeTier: 'সরকারি হাসপাতাল',
      trustTier: 'চ্যারিটেবল ট্রাস্ট',
      privateMidTier: 'প্রাইভেট নার্সিং হোম',
      privateCorpTier: 'কর্পোরেট হাসপাতাল'
    },
    facilitySection: {
      title: 'কাছের হাসপাতাল ও ডায়াগনস্টিক',
      subtitle: 'সরকারি প্রকল্পের অন্তর্ভুক্ত হাসপাতালগুলো আগে দেখানো হয়েছে।',
      sortExplanation: 'ক্রম: সরকারি স্বাস্থ্য প্রকল্প যুক্ত হাসপাতাল প্রথমে, তারপর দূরত্ব ও সঠিক খরচ।',
      filterAll: 'সব হাসপাতাল',
      filterGovt: 'সরকারি (বিনামূল্যে/ভর্তুকি)',
      filterTrust: 'চ্যারিটেবল ট্রাস্ট',
      filterEmpaneled: 'প্রকল্প যুক্ত হাসপাতাল',
      sortByDistance: 'দূরত্ব অনুযায়ী',
      sortByCost: 'কম খরচ অনুযায়ী',
      callNow: 'ফোন করুন',
      openHours: 'সময়সূচি',
      ayushmanHelpdesk: 'আয়ুষ্মান মিত্র হেল্পডেস্ক আছে',
      qualityBadgeTitle: 'গুণমান স্বীকৃতি',
      qualitySourceNotice: 'NABH/NABL সরকারি পোর্টাল থেকে যাচাইকৃত।'
    },
    schemeSection: {
      title: 'সরকারি স্বাস্থ্য প্রকল্পের যোগ্যতা যাচাই',
      subtitle: 'আধার বা আভা নম্বর ছাড়াই ৪টি সহজ প্রশ্নের উত্তর দিয়ে সম্ভাব্য প্রকল্প জানুন।',
      qState: 'বসবাসের রাজ্য',
      qRationCard: 'রেশন কার্ডের ধরন',
      qIncome: 'পরিবারের আনুমানিক বার্ষিক আয়',
      qVulnerability: 'পেশা / সামাজিক শ্রেণি',
      checkEligibilityBtn: 'যোগ্যতার সম্ভাবনা দেখুন',
      matchHigh: 'উচ্চ সম্ভাবনা',
      matchModerate: 'মাঝারি সম্ভাবনা',
      matchGeneral: 'সাধারণ (APL) শ্রেণি',
      docChecklistTitle: 'প্রয়োজনীয় নথিপত্রের তালিকা',
      officialHelplineTitle: 'সরকারি হেল্পলাইন ও কেন্দ্র',
      visitPortalBtn: 'সরকারি পোর্টালে যান',
      helplineNotice: 'নিশ্চিত করার জন্য টোল-ফ্রি ১৪৫৫৫ নম্বরে কল করুন।',
      noGuaranteeNote: 'বিজ্ঞপ্তি: ওয়ানভিশন শুধুমাত্র একটি তথ্য নির্দেশিকা।'
    },
    vaultSection: {
      title: 'রিয়েল বিল ভল্ট: স্বচ্ছ স্বাস্থ্যসেবা',
      subtitle: 'অন্যান্য পরিবারকে অতিরিক্ত খরচ থেকে বাঁচাতে আপনার বেনামী বিল শেয়ার করুন।',
      contributeBtn: 'বেনামী বিল শেয়ার করুন',
      whyTitle: 'কেন শেয়ার করবেন?',
      privacyNotice: 'আপনার নাম ও ফোন নম্বর ডিভাইসেই মুছে ফেলা হয়। কোনো ব্যক্তিগত তথ্য থাকে না।',
      scrubberTitle: 'গোপনীয়তা প্রিভিউ',
      scrubberDesc: 'আপনার নিরাপত্তার জন্য এই তথ্যগুলো মুছে ফেলা হয়েছে:',
      redactedFieldsNotice: 'রোগীর নাম [গোপন], ফোন [গোপন]',
      consentCheckbox: 'আমি নিশ্চিত করছি যে ব্যক্তিগত তথ্য মুছে ফেলা হয়েছে এবং স্বেচ্ছায় এটি শেয়ার করছি।',
      submitBillBtn: 'ভল্টে সংরক্ষণ করুন',
      successMessage: 'ধন্যবাদ! আপনার শেয়ার করা তথ্যে আমাদের ডাটাবেস সমৃদ্ধ হয়েছে।'
    },
    accessibility: {
      largeText: 'বড় হরফ',
      highContrast: 'হাই কন্ট্রাস্ট',
      readAloud: 'শুনুন (Audio)',
      stopSpeech: 'বন্ধ করুন'
    }
  }
};
