# LUMEN - Localized Unified Medical Engine for Triage

**Team LUMEN**
Sanchit Nipanikar - Final Yr, CS, VIT
Priyal Patange - Final Yr, IT, VIT
Paras Patil - Final Yr, IT, VIT
Kshitij Kalrao - Final Yr, IT, VIT

**Institution:** Bansilal Ramnath Agarwal Charitable Trust's Vishwakarma Institute of Technology, Pune
(An autonomous Institute of Savitribai Phule Pune University)

**Theme:** AI for Societal Good + Learn Smarter: AI in Education + Open Innovation

A modern, multilingual, AI‑powered healthcare assistant designed for India. LUMEN integrates triage, specialist guidance, PEARL CT reconstruction, lab report analysis, government scheme discovery, emergency education, and specialized women's health modules into a single, accessible product.

> Disclaimer: LUMEN is a research prototype and does not replace professional medical advice.

## Table of Contents

- [Problem Statement](#problem-statement)
- [Proposed Solution](#proposed-solution)
  - [Normal Features](#normal-features)
  - [Unique Differentiators ](#unique-differentiators-student-innovation)
- [Role of OpenAI Tools](#role-of-openai-tools)
- [Tech Stack](#tech-stack)
- [User Flow](#user-flow)
- [System Architecture](#system-architecture)
- [How It Works](#how-it-works)
- [Module Details](#module-details)
  - [Symptoms‑Based Diagnosis &amp; Guidance](#symptoms-based-diagnosis--guidance)
  - [AI Specialist Modules](#ai-specialist-modules)
  - [PEARL CT Reconstruction](#pearl-ct-reconstruction)
  - [Lab Report Analyzer &amp; Follow‑Up Generator](#lab-report-analyzer--follow-up-generator)
  - [Government Schemes &amp; Benefits Assistant](#government-schemes--benefits-assistant)
  - [Preliminary Triage &amp; Emergency Education](#preliminary-triage--emergency-education)
- [Impact](#impact)
- [Ethical Design &amp; Safety](#ethical-design--safety)
- [Local Development](#local-development)
- [References (IEEE‑style)](#references-ieee-style)

---

## Problem Statement

How do we ensure that rural women and families get timely, affordable, and reliable healthcare? Why are preventable deaths still common in villages despite government schemes and technology progress?

India's rural healthcare system faces critical gaps that result in preventable deaths, untreated conditions, and rising costs.

### Limited Access & Workforce Shortage

- Over 900 million rural residents (65% of the population) face inadequate infrastructure, with 16% fewer PHCs and 50% fewer CHCs than required
- Shortages are severe: 8% PHCs lack doctors, 38% lack lab technicians, and workforce density is 20.6 per 10,000, far below the WHO norm of 44.5
- Doctor/nurse/midwife density is 20.6 per 10,000 vs WHO recommendation 44.5 per 10,000

### Emergency Care Deficiencies

- Snakebites alone cause 58,000 deaths annually, 70% in rural areas where delays and lack of first-aid knowledge prevail
- Many victims first turn to traditional healers, worsening outcomes

### Women's Health & Menstrual Hygiene Gaps

- Disorders like PCOS (6–10% prevalence) and endometriosis remain underdiagnosed, with low awareness in rural India
- Only 42–43% of adolescent girls use hygienic menstrual products; poor practices increase risk of infections
- Stigma and taboos limit discussion and treatment, while awareness of government schemes like MHS and Jan Aushadhi remains low, adding travel and wage-loss costs for women

These gaps result in avoidable morbidity, mortality, and economic strain, while existing policies remain fragmented and underutilized. A holistic, context-aware intervention is urgently needed.

## Proposed Solution

LUMEN: a multilingual, voice‑first, AI assistant tailored for India, integrating high‑impact modules to bridge access, knowledge, and diagnostics.

### Normal Features

1. Symptoms‑Based Diagnosis & Guidance
   - Accepts multimodal inputs (text/audio/image).
   - Probable diagnosis with severity categorization (Green/Yellow/Red).
   - Clear next steps in voice, text, and visuals (home care, clinic, or emergency).
2. AI Specialist Modules
   - Dermatology, Radiology, Cardiology (extensible).
   - Patient‑friendly advice and clinician‑grade summaries.
3. Multilingual Voice‑First Chatbot
   - Five Indian languages initially.
   - Whisper for ASR; GPT for natural, empathetic explanations.

### Unique Differentiators

1. PEARL Integration - Personalized Estimated Anatomic Reconstruction & Lifecare
   - Hybrid CT pipeline: geometry‑aware modeling (PerX2CT) → diffusion refinement (XctDiff) → NeRF detail polishing (SAX‑NeRF).
   - Generates estimated CT volumes with voxel‑level uncertainty to enable safer, lower‑dose follow‑up imaging.
2. Lab Report Analyzer & Follow‑Up Generator
   - Parses PDFs/images, compares values to age/sex reference ranges, flags abnormalities, provides diet/lifestyle advice, and recommends follow‑ups.
   - Example: Hemoglobin 9.8 g/dL (F, 30y) → “Eat iron‑rich foods such as spinach, dal, jaggery; consider vitamin‑C fruits; consult if symptomatic.” Severity: Moderate (1–2 weeks).
3. Government Schemes & Benefits Assistant
   - Retrieves up‑to‑date national/state health schemes; explains eligibility and steps in local language.
   - Example: “Dialysis help in UP?” → PMJAY/UP State Health Scheme guidance, docs needed, and helpline 14555. Eligibility: Green.
4. Preliminary Triage & Emergency Education
   - Life‑saving steps for snakebite, drowning, burns, electric shock.
   - 3‑step pictorials + audio playback in the chosen language.
5. GynaeCare - Specialized Women's Health Module
   - Symptom Screening & Awareness: Private Q&A to flag possible issues like PCOD/PCOS (irregular cycles, acne, hormonal imbalance) and Endometriosis (severe pelvic pain, painful periods)
   - Guided Next Steps: Early red-flag alerts on when to seek medical help, plus low-cost self-care tips (diet, activity, stress management)
   - Sanitation & Hygiene Education: Safe use of cloth pads, menstrual cups, biodegradable pads, with proper disposal methods (ash pits, eco-friendly options)
   - Govt Schemes & Support: Links to Jan Aushadhi (affordable medicines), Menstrual Hygiene Scheme (MHS), and connects users with local ASHA/anganwadi workers

## Role of OpenAI Tools

| LUMEN Feature             | OpenAI Model                         | Usecase                                                                                                  |
| ------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| Symptom Triage & Guidance | gpt-4o                               | Provides empathetic triage and severity classification from patient symptoms                             |
| AI Specialist Summaries   | gpt-4o-mini                          | Summarizes AI-ML Model outputs into doctor-style report                                                  |
| Lab Report Analyzer       | gpt-4o                               | Interprets OCR lab values and explains results in patient-friendly terms                                 |
| Govt Schemes Assistant    | text-embedding-3-small + gpt-4o-mini | Retrieves and explains govt health scheme eligibility in simple language                                 |
| Emergency Protocols       | gpt-4o-mini                          | Gives fast, step-by-step emergency medical instructions                                                  |
| Voice Input (ASR)         | whisper-1                            | Converts patient speech to text for symptom entry                                                        |
| Voice Output (TTS)        | gpt-4o-audio/Azure TTS               | Delivers AI responses as a natural voice for accessibility                                               |
| Chatbot                   | gpt-4o                               | Provides 24/7 conversational support, guiding users across triage, lab results, schemes, and emergencies |

## Tech Stack

<table>
<tr>
<td width="50%">

### Detailed Technology Breakdown

| Layer                   | Tech                                                                       | Use                                                                                                          |
| ----------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Frontend                | React (TypeScript), Next.js, Tailwind CSS                                  | Multilingual, responsive web UI for symptom input, lab uploads, CT viewing, chatbot; SSR for speed & SEO     |
| Backend                 | FastAPI                                                                    | High-performance backend framework; implements REST API endpoints for frontend and AI/ML model communication |
| Primary DB              | PostgreSQL                                                                 | Stores user profiles, triage history, lab values, CT metadata, government scheme eligibility                 |
| Cache                   | Redis                                                                      | Session caching, language translation caching                                                                |
| Vector DB               | Pinecone                                                                   | Fully managed vector database for semantic search and embeddings of medical protocols and government schemes |
| Object Storage          | AWS S3                                                                     | Scalable, secure storage for CT scans, lab reports, medical images; HIPAA/GDPR compliant                     |
| AI/ML Core              | PyTorch, Hugging Face Transformers, OpenAI APIs (GPT-4o, Whisper, DALL·E) | Hosts AI models (e.g., PEARL CT, dermatology AI) and supports language and vision tasks via OpenAI           |
| Security                | JWT, OAuth2                                                                | Authentication and authorization mechanisms                                                                  |
| Infrastructure & Deploy | Docker, Kubernetes (K8s) on AWS/GCP/Azure, CDN                             | Containerized deployment, GPU-enabled nodes for AI, CDN for frontend assets delivery                         |

## User Flow

![LUMEN User Flow Diagram](./user%20flow%20d.png)

The user flow diagram illustrates the complete journey from user interaction to system output:

1. **User Input**: Rural patients or health workers submit symptoms, lab reports, CT scans, or emergency requests
2. **Frontend Processing**: React/Next.js interface handles multilingual input and file uploads
3. **API Gateway**: FastAPI routes requests to appropriate AI/ML modules with security validation
4. **AI/ML Processing**: Specialized modules process different types of medical data
5. **Data Storage**: Results stored in PostgreSQL, Redis cache, Vector DB, and S3
6. **Output Generation**: System delivers triage results, medical summaries, and guidance in multiple formats

## System Architecture

![LUMEN System Architecture Diagram](./sys%20arch.png)

### Core Components

**Frontend (React + Next.js)**

- Multilingual interface supporting 5 Indian languages
- Voice-first design with Whisper ASR integration
- File upload capabilities for lab reports and CT scans
- Real-time triage visualization and emergency guidance

**API Gateway (FastAPI + Python)**

- RESTful API endpoints for all frontend interactions
- Request routing to appropriate AI/ML modules
- Security layer with JWT authentication and HIPAA/GDPR compliance
- Audit logging for all user interactions

**AI/ML Core**

- **GPT-4o Symptom Triage**: Intelligent symptom analysis and severity classification
- **Specialist AI Modules**: Cardiology, Radiology, Dermatology specialists
- **PEARL CT Reconstruction**: Low-dose CT reconstruction with uncertainty mapping
- **Lab Analysis**: Automated lab report parsing and interpretation
- **Whisper ASR**: Speech-to-text conversion for voice inputs
- **Text-to-Speech**: Natural voice output for accessibility

**Databases & Storage**

- **PostgreSQL**: User profiles, triage history, medical records
- **Redis**: Session caching and job queue management
- **Vector Database**: Medical embeddings for semantic search
- **AWS S3**: Secure storage for CT scans and lab reports

**Security Layer**

- End-to-end encryption with SSL/TLS
- JWT-based authentication
- HIPAA/GDPR compliance
- Audit logging for all data access

### Data Flow

1. **User Input** → Frontend processes multimodal input (text/audio/image)
2. **API Gateway** → Routes requests with security validation
3. **AI/ML Core** → Processes data using specialized models
4. **Databases** → Stores results and retrieves relevant context
5. **Output Generation** → Delivers results in text, voice, and visual formats

This repo ships a production‑ready React + Express monorepo with shared types.

- Frontend: React 18, Vite, TailwindCSS, framer‑motion, R3F demo previews.
- Server: Express (integrated with Vite dev server) exposing `/api/*`.
- Shared: TypeScript types in `shared/`.
- AI Services: Pluggable adapters for Whisper/GPT/Embeddings (to be wired via server endpoints or serverless functions, keeping keys server‑side).
- Data: Vector DB (e.g., pgvector/Weaviate/FAISS/Supabase) for grounding; file/object storage for uploads.
- Privacy: CT models can run on device/edge where feasible; PHI never logged.

## How It Works

1. User Input (text/audio/image, language selection)
2. AI Processing (Whisper → retrieval‑augmented GPT → module logic)
3. Clear Outputs (diagnosis, severity, steps, visuals, links)
4. User Action (self‑care, clinic, emergency, benefits enrollment)

## Module Details

### Symptoms‑Based Diagnosis & Guidance

- Severity tiers: Green (self‑care), Yellow (clinic), Red (emergency).
- Outputs include do/don’t lists, local language voice prompts, and follow‑up timing.

### AI Specialist Modules

- Tabs for Dermatology, Radiology, Cardiology; extensible registry for more modules.
- Dual output: layperson narrative + clinician summary.

### PEARL CT Reconstruction

- Pipeline: PerX2CT (geometry) → XctDiff (denoising/refinement) → SAX‑NeRF (detail polish).
- Exposes uncertainty maps and dose‑reduction configuration for follow‑up studies.

### Lab Report Analyzer & Follow‑Up Generator

- Field extraction, reference range comparison, abnormality ranking.
- Recommendations aligned to reputable guidelines; configurable locality and diet preferences.

### Government Schemes & Benefits Assistant

- Retrieval over central/state scheme corpus; eligibility/steps generation; helplines and docs.

### Preliminary Triage & Emergency Education

- Scenario tiles (snakebite, drowning, burns, electric shock) → 3‑step pictorial + audio.

## Feasibility

### Technical Feasibility

- **Resources & Technology:**
  - Prototype: Hugging Face free models (Indic-GPT, Donut, Whisper-small)
  - Production: OpenAI APIs (GPT-4o, Whisper, DALL·E) + custom PEARL CT pipeline
- **Infrastructure:**
  - Frontend: React + Tailwind CSS
  - Backend: FastAPI (Python) with Docker
  - Deployment: Netlify (frontend), AWS/GCP (production)
- **Assessment:** Existing technologies are sufficient. Only CT reconstruction pipeline requires GPU resources, which are available on cloud platforms.

### Operational Feasibility

- **Problem Fit:** Addresses rural healthcare gaps (900M+ residents), triage delays, and lab follow-up inefficiencies
- **Ease of Operation:**
  - Multilingual voice-first chatbot lowers digital literacy barriers
  - Offline-first design ensures use even in low-connectivity areas
- **Assessment:** Operationally feasible, since workflows mirror real-world healthcare interactions (symptom → guidance → follow-up)

### Economic Feasibility

- **Prototype Cost:** Minimal (free tiers: Hugging Face, Netlify, Firebase)
- **Production Cost:** API usage (OpenAI GPT, Whisper), GPU compute (CT), and storage (AWS S3)
- **ROI:**
  - Reducing preventable deaths (e.g., 58,000 annual snakebite fatalities)
  - Saving costs from unnecessary clinic visits & repeated CT scans
- **Assessment:** Strong cost-benefit justification; socially impactful and scalable

### Legal Feasibility

- **Compliance Requirements:**
  - Data protection → GDPR/HIPAA-like standards
  - Informed consent → required for data use
- **Assessment:** Legally feasible with proper compliance in production; no major barriers

### Market Feasibility

- **Target Users:** 900M+ rural/semi-urban Indians lacking timely healthcare
- **Market Trend:** Rising smartphone penetration (67%+ rural households with access)
- **Competition:** Existing health apps (Practo, 1mg) focus on urban users; none combine triage + lab reports + CT + schemes in one system
- **Assessment:** High demand, underserved market, unique positioning

## Impact

### Quantitative Benefits

- **Reduction in Preventable Morbidity and Mortality:** By providing immediate symptom-based triage, emergency education, and guidance, LUMEN aims to significantly reduce the 58,000 annual deaths from snakebites and other emergencies in rural India
- **Cost Savings for Patients:** Early and accurate triage can help avoid 20–30% unnecessary hospital visits and repeat CT scans. Since a single CT costs ₹3,000–₹8,000 and a hospital visit costs ₹500–₹2,000, this translates to an average saving of ₹1,200–₹2,800 ($50–$200) per patient
- **Improved Diagnostic Efficiency:** Automated analysis of lab reports and specialist modules can reduce diagnostic delays from 2–7 days down to under 1 hour (98% faster turnaround). This efficiency also frees up doctors' time, enabling them to see 2–3 additional patients per hour and reducing complication-related treatment costs by 15–20% in time-sensitive conditions

### Potential Beneficiaries

- **Rural and Semi-Urban Populations:** Over 900 million residents with limited access to qualified medical professionals
- **Primary Health Centers (PHCs) & Community Health Centers (CHCs):** Equipped with decision support for frontline healthcare workers
- **Government Health Schemes Beneficiaries:** Increased awareness and access to schemes like Ayushman Bharat, ensuring eligible patients receive entitled benefits

### Awareness & Accessibility Gains

- **Multilingual, Voice-First Interface:** Supports five Indian languages, enabling accessibility for illiterate or non-English-speaking users
- **Awareness of Government Schemes:** Reduces the knowledge gap regarding available health benefits, empowering users to claim entitlements without intermediary assistance

## Future Scope

### Language Expansion

- Extend support to more Indian regional languages and dialects to further improve inclusivity and reach across diverse linguistic regions of India

### Additional Specialist Modules

- Incorporate more AI-driven modules in fields such as Pediatrics, Obstetrics & Gynecology, Psychiatry, and Neurology for broader diagnostic support and guidance

### NGO & Hospital Integrations

- Collaborate with NGOs and hospitals to integrate LUMEN into field operations, enabling real-time reporting and referrals from remote areas to specialized centers

### Predictive Healthcare Analytics

- Leverage patient data and interaction history to provide predictive health risk analytics and early warnings for chronic diseases

## Ethical Design & Safety

- Privacy by design; on‑device/edge inference where possible.
- Retrieval‑grounded answers; conservative escalation; transparent uncertainty.
- Clear disclaimers and escalation triggers; no replacement for clinicians.

## Local Development

Requirements: Node 18+, pnpm.

```bash
pnpm install
pnpm dev          # client + server with hot reload on port 8080
pnpm build        # production build
pnpm start        # run the built server
pnpm test         # vitest --run
pnpm typecheck    # tsc
```

Environment variables (example — keep secrets server‑side):

```
# .env (not committed)
OPENAI_API_KEY=...
VECTOR_DB_URL=...
```

## References (IEEE‑style)

[1] "Healthcare Access in Rural Communities in India," Ballard Brief, 18‑Dec‑2024. Available: Ballard Brief

[2] A. P. Ugargol et al., "In search of a fix to the primary health care chasm in India," PMC, 2023. PMC

[3] A. Nair et al., "Workforce problems at rural public health‑centres in India," Human Resources for Health, vol. 19, Art. 147, 2022. BioMed Central

[4] W. Suraweera et al., "Trends in snakebite deaths in India from 2000 to 2019," eLife, vol. 9, e54076, 2020. eLifePMC

[5] "Snakebite," Wikipedia, last month. Wikipedia

[6] "India still struggles with rural doctor shortages … doctor, nurses, and midwives per 10,000 people," ResearchGate, 2025. ResearchGateAxios

[7] "Healthcare Access in Rural India," docboxmed.com, 23‑Sep‑2024. DocBox

[8] "Multiple incidents of snakebites in UP ... approx 50,000 deaths annually," Times of India, recent. The Times of India

[9] "Traditional cure do more harm than good in snakebite cases," Times of India, last month. The Times of India

---

Copyright © 2025 Sanchit Nipanikar. All rights reserved.
