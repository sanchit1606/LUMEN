# LUMEN - Localized Unified Medical ENgine for Triage

A modern, multilingual, AI‑powered healthcare assistant designed for India. LUMEN integrates triage, specialist guidance, PEARL CT reconstruction, lab report analysis, government scheme discovery, and emergency education into a single, accessible product.

> Disclaimer: LUMEN is a research prototype and does not replace professional medical advice.

## Table of Contents

- [Problem Statement](#problem-statement)
- [Proposed Solution](#proposed-solution)
  - [Normal Features](#normal-features)
  - [Unique Differentiators (Student Innovation)](#unique-differentiators-student-innovation)
- [Role of OpenAI Tools](#role-of-openai-tools)
- [System Architecture](#system-architecture)
- [How It Works](#how-it-works)
- [Module Details](#module-details)
  - [Symptoms‑Based Diagnosis & Guidance](#symptoms-based-diagnosis--guidance)
  - [AI Specialist Modules](#ai-specialist-modules)
  - [PEARL CT Reconstruction](#pearl-ct-reconstruction)
  - [Lab Report Analyzer & Follow‑Up Generator](#lab-report-analyzer--follow-up-generator)
  - [Government Schemes & Benefits Assistant](#government-schemes--benefits-assistant)
  - [Preliminary Triage & Emergency Education](#preliminary-triage--emergency-education)
- [Impact](#impact)
- [Ethical Design & Safety](#ethical-design--safety)
- [Local Development](#local-development)
- [Testing & Type Safety](#testing--type-safety)
- [Deploying](#deploying)
- [Folder Structure](#folder-structure)
- [References (IEEE‑style)](#references-ieee-style)

---

## Problem Statement

A significant portion of India’s population, especially in rural and semi‑urban areas, lacks timely access to qualified medical care, suffers preventable morbidity and mortality due to inadequate triage knowledge, and faces high costs and radiation exposure from repeated CT scans.

Key facts:

- ~900M rural residents (~65% of population) face poor healthcare access with 16% fewer PHCs and 50% fewer CHCs than prescribed standards. [DocBox]
- PHC staffing gaps (2015): >8% lacked doctors, 38% lacked lab technicians, 22% had no pharmacists; specialist vacancies at CHCs ranged 76–83%. [Ballard] [BriefPMC]
- Doctor/nurse/midwife density is 20.6 per 10,000 vs WHO recommendation 44.5 per 10,000. [BioMed] [CentralAxios]
- Snakebites cause ~58,000 deaths annually (≈1 in 250 before age 70); ~70% in rural areas due to delays and lack of first‑aid knowledge. [PMCeLifeWikipedia]
- Reliance on traditional healers and delays further increase preventable mortality. [The Times of India+1]

These gaps cause unnecessary deaths, inefficient referrals, repeated costly imaging (and radiation), and low awareness of government entitlements.

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

### Unique Differentiators (Student Innovation)

1. PEARL Integration — Personalized Estimated Anatomic Reconstruction & Lifecare
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

## Role of OpenAI Tools

- Whisper: Multilingual ASR for symptoms and emergency commands.
- GPT (chat models):
  - Empathetic triage guidance and emergency instructions.
  - Simplified lab summaries + personalized follow‑ups.
  - Clinician‑grade summaries for specialist modules with low‑temperature prompts and retrieval to minimize hallucination.
- Embeddings + Vector DB: Index authoritative sources (WHO, MoHFW, state schemes) to ground responses and improve factuality.
- Optional DALL·E: Contextually appropriate visuals for education.

## System Architecture

This repo ships a production‑ready React + Express monorepo with shared types.

- Frontend: React 18, Vite, TailwindCSS, framer‑motion, R3F demo previews.
- Server: Express (integrated with Vite dev server) exposing `/api/*`.
- Shared: TypeScript types in `shared/`.
- AI Services: Pluggable adapters for Whisper/GPT/Embeddings (to be wired via server endpoints or serverless functions, keeping keys server‑side).
- Data: Vector DB (e.g., pgvector/Weaviate/FAISS/Supabase) for grounding; file/object storage for uploads.
- Privacy: CT models can run on device/edge where feasible; PHI never logged.

Data flow (high level):

1. User input (text/audio/image) → 2) Pre‑processing (ASR/OCR) → 3) Retrieval (Embeddings + KB) → 4) GPT reasoning (guard‑railed) → 5) Structured outputs (triage, steps, eligibility) → 6) UI rendering with urgency badges and educational visuals.

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

## Impact

- Reduce delay‑related deaths (e.g., snakebite) via immediate, correct first aid.
- Serve ~900M rural Indians with multilingual guidance and benefits awareness.
- Lower unnecessary imaging and radiation via PEARL’s uncertainty‑aware reconstructions.

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

## Testing & Type Safety

- Vitest for unit tests (`pnpm test`).
- Shared types in `shared/` to keep client/server/API aligned.

## Deploying

Recommended: Netlify or Vercel.

- Netlify: Builds from source; set environment variables in the dashboard; use serverless functions (see `netlify/functions/`).
- Vercel: Configure project; environment variables in dashboard; serverless/edge functions as needed.

## Folder Structure

```
client/         # React SPA (pages, components, UI)
server/         # Express API (integrated with Vite)
shared/         # Shared TypeScript types
public/         # Static assets (favicon, etc.)
```

## References (IEEE‑style)

[1] “Healthcare Access in Rural Communities in India,” Ballard Brief, 18‑Dec‑2024. (Ballard Brief)
[2] A. P. Ugargol et al., “In search of a fix to the primary health care chasm in India,” 2023. (PMC)
[3] A. Nair et al., “Workforce problems at rural public health‑centres in India,” Human Resources for Health, vol. 19, Art. 147, 2022. (BioMed Central)
[4] W. Suraweera et al., “Trends in snakebite deaths in India from 2000 to 2019,” eLife, vol. 9, e54076, 2020. (eLife/PMC)
[5] “Snakebite,” Wikipedia, last month. (Wikipedia)
[6] “India still struggles with rural doctor shortages … per 10,000 people,” 2025. (ResearchGate/Axios)
[7] “Healthcare Access in Rural India,” docboxmed.com, 23‑Sep‑2024. (DocBox)
[8] “Multiple incidents of snakebites in UP ... approx 50,000 deaths annually,” Times of India, recent. (TOI)
[9] “Traditional cures do more harm than good in snakebite cases,” Times of India, last month. (TOI)

---

Copyright © 2025 Sanchit Nipanikar. All rights reserved.
