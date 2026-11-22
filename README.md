# OneVision 🩺🇮🇳
> **Multilingual, Voice-Friendly Healthcare Cost & Care Navigation for India**

OneVision empowers Indian citizens and families to navigate healthcare expenses, estimate treatment costs transparently, discover accredited local public & private facilities, check possible public health scheme eligibility (PM-JAY & State schemes like Aarogyasri, AB-ArK, Chiranjeevi, DAK), and contribute anonymized bills to a collective Real Bill Vault with client-side privacy scrubbing.

---

## 🚀 Key Features & MVP Scope

### 1. Describe or Scan a Care Need
- **Text Search & Quick Chips:** Instant lookup with colloquial Indian terms (e.g., "stomach scan", "pet ka ultrasound", "motiyabind operation", "delivery", "kamar ka MRI").
- **Multilingual Voice Input:** Browser-native Web Speech recognition (`webkitSpeechRecognition`) supporting English, Hindi, Telugu, Tamil, Kannada, and Bengali with speech wave feedback + simulated voice scenario clips.
- **Prescription Slip OCR Scanner:** Interactive photo upload or one-click realistic Indian clinic prescription slips (Dr. Gupta Internal Medicine, Dr. Rao Eye Specialty, Dr. Srinivas Spine Surgery) with visual bounding box highlights.
- **Mandatory Review & Correction Step:** Extracted clinical procedure, proposed district, and clinical setting (OPD/Daycare/Inpatient) are displayed for explicit user verification and adjustment before cost calculation.

### 2. Estimate Likely Costs
- **4-Tier Facility Pricing:**
  - **Government Hospitals:** Free to nominal registration (₹0 - ₹50) under welfare mandates.
  - **Charitable / Trust Hospitals:** Subsidized non-profit tariffs (e.g. Mahavir Hospital, St. John's).
  - **Private Mid-tier Clinics & Nursing Homes:** Typical self-pay commercial rates.
  - **Corporate Tertiary Centers:** Luxury tertiary multi-specialty tariffs.
- **Official Government Benchmark Rate Cards:**
  - **CGHS 2023 Rate Card:** NABH and Non-NABH circular rates for the selected pilot city.
  - **PM-JAY Package Rates:** National Health Benefit Package (HBP 2.2) tariffs.
- **Real Bill Vault Statistics:** Real-world sample size ($N$), median cost, interquartile spread (25th - 75th percentile), minimum/maximum recorded amounts, and last-updated date.
- **Insufficient Data Safeguard:** When regional records are sparse ($N < 5$, e.g. Sleep Apnea Study), a clear amber advisory explains data limitations and defaults to the official CGHS rate card.
- **Transparent Cost Breakdown:** Visual breakdown into surgeon/doctor fees, bed & nursing, diagnostic consumables, and pharmacy.

### 3. Explore Nearby Facilities
- **Proximity & Dynamic Distance:** Calculates real-time distance from user's chosen locality or district (e.g. Hyderabad Urban, Rangareddy, Bengaluru Urban, South Delhi, Jaipur Urban).
- **Quality Indicators Only With Verifiable Sources:**
  - **NABH Accredited:** With direct verification link to the National Accreditation Board for Hospitals & Healthcare Providers.
  - **NABL Certified:** With link to the Quality Council of India registry.
  - **PM-JAY Apex Empaneled:** Verified against NHA registry.
  - Unaccredited facilities explicitly show: *"Accreditation: Not registered or in progress"*.
- **Objective Ordering Rationale Banner:** Facilities with PM-JAY / State Scheme empanelment are ranked first to maximize free care, followed by proximity and affordability. No hospital pays for placement.

### 4. Check Possible Scheme Eligibility
- **Zero PII Collection:** Never asks for or requires Aadhaar or ABHA credentials.
- **4 Simple Questions:** State of residence, Household ration card category (BPL/AAY/White/Pink), Annual household income bracket, and Occupation/Vulnerability category.
- **Analyzed Welfare Programs:**
  - **PM-JAY (Ayushman Bharat):** ₹5 Lakhs annual secondary & tertiary cover + Ayushman Vay Vandana for senior citizens (70+).
  - **Telangana Aarogyasri:** ₹10 Lakhs cashless hospitalization for Food Security White Card holders.
  - **Karnataka AB-ArK:** Universal tiered scheme with ₹5 Lakhs BPL cover and 30% APL co-pay concession.
  - **Delhi Arogya Kosh (DAK):** 100% free high-end diagnostics in empaneled private labs for Delhi residents.
  - **Rajasthan Chiranjeevi / MAAY:** ₹25 Lakhs comprehensive family protection.
- **Checklist & Official Verification:** Interactive document checklist (Ration card, Photo ID, Income certificate) + 24x7 National Toll-Free **14555** & official `https://mera.pmjay.gov.in` portal links.

### 5. Contribute to Real Bill Vault
- **Community Empowerment:** Explains how crowdsourcing rate cards prevents predatory pricing.
- **Client-Side Privacy Scrubber:** Automatically scrubs patient names, phone numbers, and hospital registration numbers *inside the user's browser* prior to saving.
- **Explicit Informed Consent:** User must confirm that personal details have been redacted before anonymous submission.
- **Live Persistence:** Uses local storage to update regional sample counts immediately upon contribution.

### 6. Accessibility & Low-Bandwidth Indian Context
- **6 Indian Languages:** English, Hindi (हिन्दी), Telugu (తెలుగు), Tamil (தமிழ்), Kannada (ಕನ್ನಡ), Bengali (বাংলা).
- **Text-to-Speech (TTS):** Spoken audio assistance in all supported Indian languages.
- **Accessibility Modes:** Large Text mode and High Contrast mode for low-vision and elderly users.
- **Offline Resilient:** Bundled as an ultra-lightweight SPA with zero network overhead after initial load.

---

## 🛠️ Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Framework** | React 18 + TypeScript | Type safety, maintainability, clean state model |
| **Build Tool** | Vite 5 | Instant HMR, ultra-lightweight output (< 100 KB gzipped) |
| **Styling** | Tailwind CSS | Mobile-first responsive UI, accessible contrast themes |
| **Icons** | Lucide React | High readability visual cues for low-literacy users |
| **Speech** | Web Speech API | Native in-browser speech recognition and synthesis |
| **Storage & DB** | SQLite 3.53 (Node.js 24 Native `DatabaseSync`) | Zero-daemon, disk-persistent relational database with WAL mode and foreign key integrity |
| **API Layer** | Express REST API / Vite Connect Middleware | Unified single-port dev & production serving (`/api/*` and UI on `http://localhost:3000`) |
| **Styling** | Tailwind CSS | Mobile-first responsive UI, accessible contrast themes |
| **Icons** | Lucide React | High readability visual cues for low-literacy users |
| **Speech** | Web Speech API | Native in-browser speech recognition and synthesis |

---

## 🗄️ Relational Database Architecture

The application is backed by a disk-persistent **SQLite** relational database located at `data/onevision.db`:

```
data/
└── onevision.db       # Persistent SQLite 3 database file with WAL journal
```

### Relational Schema & Tables

1. **`procedures`**: Common outpatient and diagnostic procedures (id, name, code, category, colloquial_names JSON, description, setting, preparation_advice, is_low_data_pilot).
2. **`procedure_rates`**: Official CGHS (NABH & Non-NABH) circular benchmarks, PM-JAY HBP 2.2 rates, and 4-tier cost ranges (Govt, Charitable, Mid Private, Corporate) per pilot region.
3. **`procedure_breakdowns`**: Component cost splits (Consultation, Facilities, Diagnostics, Pharmacy).
4. **`facilities`**: Hospitals, diagnostic centres, and nursing homes with coordinates, district, accreditation badges (NABH/NABL/PM-JAY), and public scheme empanelment.
5. **`schemes`**: Public health welfare programs (PM-JAY, Telangana Aarogyasri, Karnataka AB-ArK, Delhi Arogya Kosh, Rajasthan Chiranjeevi) with eligibility criteria, checklists, and helplines.
6. **`bill_vault`**: Crowdsourced hospital bills contributed by patients with client-scrubbed de-identification, timestamps, and out-of-pocket costs.
7. **`audit_logs`**: Anonymous action audit tracking.
8. **`db_metadata`**: Schema migration version and seed timestamp.

### Built-in SQLite REST API Endpoints

- `GET /api/health` — Checks database file size, SQLite engine version, and row counts across all tables.
- `GET /api/procedures` — Queries all procedures joined with live statistical medians computed in SQLite.
- `GET /api/facilities?regionId=hyderabad` — Queries facilities filtered by pilot region and empanelment.
- `GET /api/schemes` — Retrieves public scheme rules and document checklists.
- `GET /api/vault` — Returns real crowdsourced patient bills and dynamic aggregates (`COUNT`, `AVG`, `MIN`, `MAX`).
- `POST /api/vault` — Inserts an anonymized patient bill into SQLite with client-side & server-side privacy scrubbing.
- `POST /api/db/query` — Sandbox-guarded `SELECT` query runner powering the interactive Database Inspector in the UI.

### In-App SQLite Database Inspector
Click the **"SQLite DB"** badge in the top navigation bar to open the live Database Inspector:
- View live table row counts and disk file size (`data/onevision.db`).
- Execute instant preset SQL queries (e.g. `SELECT * FROM bill_vault ORDER BY billed_amount DESC`).
- Run any custom `SELECT` query with table results.

---

## 🏃 Quick Setup & Run Instructions

### Prerequisites
- Node.js (v18+ or v24+)
- npm (v9+)

### Installation & Launch
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

The web application will open on `http://localhost:3000`.

### Production Build
```bash
npm run build
npm run preview
```

---

## 🧪 Short Verification Checklist

1. **Test Care Need Search & Extraction:**
   - On the homepage, type `"ultrasound abdomen"` or tap the quick chip **"Ultrasound Abdomen"**.
   - Notice the **Review & Confirm Extracted Details** card appears with 98% confidence score.
   - Try the **Voice** tab: click the sample voice button *"Doctor advised ultrasound scan for severe stomach pain"*.
   - Try the **Scan Prescription (Rx)** tab: click *"Gupta Medical Clinic"*. Notice the bounding box highlight and extracted clinical advice.
   - Click **"See Estimated Costs & Options"**.

2. **Verify Cost Estimation & Low Data Alert:**
   - Inspect the 4-tier price ranges (Government ₹0-50, Charitable ₹450-750, Private ₹1100-1650, Corporate ₹2200-3400).
   - Check the **Official CGHS Rate Card** (₹645) vs **Real Bill Vault** ($N=46$ bills, median ₹1,250).
   - Now switch the procedure dropdown to **"Overnight Polysomnography (Sleep Apnea Study)"**.
   - Notice the amber **"Limited Regional Records Available (Sample N=2 < 5)"** alert explaining data scarcity.

3. **Explore Facilities & Accreditation Badges:**
   - Click the **"2. Find Care"** tab.
   - Read the **Facility Ordering Rationale** banner explaining that empaneled and affordable centers rank first.
   - Inspect Osmania General Hospital: note the **PM-JAY Gold** badge.
   - Inspect Vijaya Diagnostic / Mahavir Hospital: hover/click the **NABH / NABL** badges with external verification link.
   - Notice Sri Krishna Clinic has no badges and explicitly displays *"Quality accreditation: Not registered or in progress"*.

4. **Verify Scheme Eligibility (Zero PII):**
   - Click the **"3. Check Schemes"** tab.
   - Select **BPL Ration Card** + **Below ₹1.5L Income** + **Informal Worker**.
   - Click **Check Potential Scheme Matches**.
   - Confirm **High Potential Match** is shown for PM-JAY and State Scheme (e.g. Telangana Aarogyasri with ₹10 Lakhs cover).
   - Check off items in the **Document Checklist**.
   - Note the **14555 Helpline** and non-guarantee disclaimer.

5. **Contribute an Anonymous Bill:**
   - Click **"Share Bill"** (top right) or visit the **Real Bill Vault** tab.
   - In the notes field, enter: *"Patient: Ramesh Kumar, Phone: 9849012345, Billed Rs. 1400"*.
   - Observe the **Client-Side Privacy Scrubber** immediately masking the name and phone number.
   - Check the consent checkbox and click **Submit to Real Bill Vault**.
   - Observe the success confirmation and live sample count increase!

6. **Accessibility & Language Verification:**
   - Switch language to **हिन्दी (Hindi)**, **తెలుగు (Telugu)**, or **தமிழ் (Tamil)** from the top navbar.
   - Click the **Listen (Audio)** button to hear the spoken translation.
   - Click the **Large Text** (`Type` icon) and **High Contrast** (`SunMoon` icon) toggles.
