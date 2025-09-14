import React, { useRef } from "react";
import {
  BookOpen,
  Cpu,
  Shield,
  Workflow,
  Link2,
  Github,
  Linkedin,
  User as UserIcon,
  Mic,
  Image as ImageIcon,
  Upload,
  BadgeAlert,
  Stethoscope,
  Languages,
  Landmark,
  FlaskConical,
  Activity,
} from "lucide-react";

import ZoomableImage from "./ZoomableImage";
import { AnimatedBeam } from "./AnimatedBeam";
import DevProfileCard from "./DevProfileCard";

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold flex items-center gap-2">{title}</h3>
      <div className="mt-3 text-sm text-muted-foreground space-y-3">
        {children}
      </div>
    </div>
  );
}

function BeamShowcase() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const userRef = useRef<HTMLDivElement | null>(null);
  const openaiRef = useRef<HTMLDivElement | null>(null);
  const featureRefs = [
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
  ];

  const features = [
    { label: "Audio", Icon: Mic },
    { label: "Image", Icon: ImageIcon },
    { label: "Upload", Icon: Upload },
    { label: "Alerts", Icon: BadgeAlert },
  ];

  return (
    <div ref={containerRef} className="relative h-72 w-full">
      {/* Beams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userRef}
        toRef={openaiRef}
        curvature={-60}
        pathColor="#60A5FA"
        pathWidth={2}
        gradientStartColor="#60A5FA"
        gradientStopColor="#22D3EE"
      />
      {featureRefs.map((ref, i) => (
        <AnimatedBeam
          key={i}
          containerRef={containerRef}
          fromRef={openaiRef}
          toRef={ref}
          curvature={-40 - i * 6}
          delay={i * 0.2}
          pathColor="#60A5FA"
          pathWidth={2}
          gradientStartColor="#60A5FA"
          gradientStopColor="#22D3EE"
        />
      ))}

      {/* Nodes */}
      <div className="absolute inset-0 grid grid-cols-[1fr_auto_1fr] items-center">
        {/* Left: User */}
        <div className="flex flex-col items-center">
          <div
            ref={userRef}
            className="ml-2 size-16 rounded-full bg-secondary border border-border shadow grid place-items-center"
          >
            <img
              src="https://cdn.simpleicons.org/openai/1B8EE6"
              alt="OpenAI"
              className="h-6 w-6"
            />
          </div>
          <span className="mt-2 text-sm font-medium">User</span>
        </div>

        {/* Center: OpenAI */}
        <div className="flex flex-col items-center">
          <div
            ref={openaiRef}
            className="size-20 rounded-full bg-gradient-to-tr from-brand-blue/20 to-brand-teal/30 border border-border shadow grid place-items-center"
          >
            <img
              src="https://cdn.simpleicons.org/openai/1B8EE6"
              alt="OpenAI"
              className="h-6 w-6"
            />
          </div>
          <div className="mt-2 inline-flex items-center text-xs text-muted-foreground">
            <Link2 className="mr-1 h-3 w-3" /> LUMEN Runtime
          </div>
        </div>

        {/* Right: Features */}
        <div className="flex justify-end pr-2">
          <div className="grid gap-3">
            {features.map(({ label, Icon }, idx) => (
              <div key={label} className="flex items-center gap-2 justify-end">
                <div
                  ref={featureRefs[idx]}
                  className="size-12 rounded-full bg-white shadow border border-border grid place-items-center"
                >
                  <Icon className="text-brand-blue" size={18} />
                </div>
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TechStackGrid() {
  const techs = [
    { slug: "openai", label: "OpenAI", color: "1B8EE6" },
    { slug: "huggingface", label: "Hugging Face", color: "FF6A00" },
    { slug: "react", label: "React", color: "61DAFB" },
    { slug: "tailwindcss", label: "Tailwind CSS", color: "06B6D4" },
    { slug: "framer", label: "Framer Motion", color: "0055FF" },
    { slug: "nodedotjs", label: "Node.js", color: "339933" },
    { slug: "express", label: "Express", color: "000000" },
    { slug: "netlify", label: "Netlify", color: "00C7B4" },
    { slug: "github", label: "GitHub", color: "181717" },
    // Added remaining stack icons
    { slug: "postgresql", label: "PostgreSQL", color: "4169E1" },
    { slug: "redis", label: "Redis", color: "DC382D" },
    { slug: "pytorch", label: "PyTorch", color: "EE4C2C" },
    { slug: "jsonwebtoken", label: "JWT", color: "000000" },
    { slug: "docker", label: "Docker", color: "2496ED" },
    { slug: "kubernetes", label: "Kubernetes", color: "326CE5" },
    { slug: "amazonaws", label: "AWS", color: "FF9900" },
    { slug: "googlecloud", label: "GCP", color: "4285F4" },
    { slug: "microsoftazure", label: "Azure", color: "0078D4" },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 w-full">
      {techs.map((t) => (
        <div
          key={t.slug}
          className="flex flex-col items-center p-3 bg-card/80 border border-border rounded-lg shadow-sm hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-white grid place-items-center p-2">
            <img
              src={`https://cdn.simpleicons.org/${t.slug}/${t.color}`}
              alt={t.label}
              className="w-8 h-8"
            />
          </div>
          <span className="mt-2 text-xs font-medium text-center">
            {t.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function TeamCard({
  name,
  role,
  photo,
  github,
  linkedin,
}: {
  name: string;
  role: string;
  photo?: string;
  github?: string;
  linkedin?: string;
}) {
  return (
    <div className="relative w-full max-w-[380px] h-[384px] flex flex-col items-center rounded-[20px] bg-white shadow-lg border border-gray-100">
      {/* Triangular Background Pattern */}
      <div className="h-48 w-full rounded-t-[20px] overflow-hidden relative pr-7">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background: `
              linear-gradient(60deg, hsl(var(--brand-blue)) 25%, transparent 25.5%, transparent 75%, hsl(var(--brand-blue)) 75%, hsl(var(--brand-blue))),
              linear-gradient(120deg, hsl(var(--brand-teal)) 25%, transparent 25.5%, transparent 75%, hsl(var(--brand-teal)) 75%, hsl(var(--brand-teal))),
              linear-gradient(60deg, hsl(var(--brand-blue)) 25%, transparent 25.5%, transparent 75%, hsl(var(--brand-blue)) 75%, hsl(var(--brand-blue))),
              linear-gradient(120deg, hsl(var(--brand-teal)) 25%, transparent 25.5%, transparent 75%, hsl(var(--brand-teal)) 75%, hsl(var(--brand-teal)))
            `,
            backgroundSize: "40px 40px",
            backgroundPosition: "0 0, 0 0, 20px 20px, 20px 20px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      </div>

      {/* Avatar */}
      <div className="absolute w-[114px] h-[114px] bg-white rounded-full flex justify-center items-center top-[calc(50%-57px)] border-4 border-white shadow-lg">
        {photo ? (
          <img
            src={photo}
            alt={`${name} photo`}
            className="w-[100px] h-[100px] rounded-full object-cover object-top"
          />
        ) : (
          <div className="w-[100px] h-[100px] rounded-full bg-muted grid place-items-center text-muted-foreground text-xs">
            Photo
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col items-center pt-[60px] px-4">
        <h3 className="font-medium text-lg text-black">{name}</h3>
        <p className="mt-2.5 font-normal text-[15px] text-[#78858F] text-center">
          {role}
        </p>

        <div className="mt-4 flex gap-2">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-input bg-background text-sm font-medium hover:bg-accent transition-all duration-300"
            >
              <Github size={16} />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-input bg-background text-sm font-medium hover:bg-accent transition-all duration-300"
            >
              <Linkedin size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Technical() {
  return (
    <section id="technical" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cover Page (non-card) */}
        <div id="cover" className="mt-6 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              LUMEN – Localized Unified Medical ENgine for Triage
            </h2>
            <p className="mt-2 text-muted-foreground max-w-3xl mx-auto">
              Unified assistant for preliminary triage, diagnostics explanation,
              CT reconstruction previews, lab report interpretation, and mapping
              citizens to government schemes.
            </p>
            <div className="mt-4 flex items-center justify-center gap-4">
              <a
                href="https://cdn.builder.io/o/assets%2Fe8cc9787598e48f9b1b2ad55c5185cb9%2F571a64ddd41b44f284f7d10cabf79f52?alt=media&token=4b269a9a-f6c3-4192-b784-d6c79921c82c&apiKey=e8cc9787598e48f9b1b2ad55c5185cb9"
                target="_blank"
                rel="noopener noreferrer"
                className="download-button"
              >
                <div className="docs">
                  <span>View DOCX</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7,10 12,15 17,10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </div>
                <div className="download">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7,10 12,15 17,10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </div>
              </a>
              <div className="group relative">
                <a
                  href="https://github.com/sanchit1606/LUMEN.git"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>
                    <svg strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" className="w-8 hover:scale-125 duration-200 hover:stroke-blue-500">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </button>
                </a>
                <span className="absolute -top-14 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                  GitHub
                </span>
              </div>
            </div>
            <style>
              {`/* From Uiverse.io by barisdogansutcu */
              .download-button {
                position: relative;
                border-width: 0;
                color: white;
                font-size: 15px;
                font-weight: 600;
                cursor: pointer;
                border-radius: 4px;
                z-index: 1;
              }

              .download-button .docs {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
                min-height: 40px;
                padding: 0 10px;
                border-radius: 4px;
                z-index: 1;
                background-color: #242a35;
                border: solid 1px #e8e8e82d;
                transition: all 0.5s cubic-bezier(0.77, 0, 0.175, 1);
              }

              .download-button:hover {
                box-shadow:
                  rgba(0, 0, 0, 0.25) 0px 54px 55px,
                  rgba(0, 0, 0, 0.12) 0px -12px 30px,
                  rgba(0, 0, 0, 0.12) 0px 4px 6px,
                  rgba(0, 0, 0, 0.17) 0px 12px 13px,
                  rgba(0, 0, 0, 0.09) 0px -3px 5px;
              }

              .download {
                position: absolute;
                inset: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                max-width: 90%;
                margin: 0 auto;
                z-index: -1;
                border-radius: 4px;
                transform: translateY(0%);
                background-color: #01e056;
                border: solid 1px #01e0572d;
                transition: all 0.5s cubic-bezier(0.77, 0, 0.175, 1);
              }

              .download-button:hover .download {
                transform: translateY(100%);
              }

              .download svg polyline,
              .download svg line {
                animation: docs 1s infinite;
              }

              @keyframes docs {
                0% {
                  transform: translateY(0%);
                }

                50% {
                  transform: translateY(-15%);
                }

                100% {
                  transform: translateY(0%);
                }
              }`}
            </style>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg border p-3 bg-secondary/40">
              <div className="text-xs text-muted-foreground">Institution</div>
              <div className="font-medium">
                Vishwakarma Institute of Technology, Pune
              </div>
              <div className="text-sm">
                Department of Computer Engineering & IT
              </div>
            </div>
            <div className="rounded-lg border p-3 bg-secondary/40">
              <div className="font-medium">Team LUMEN</div>
              <ul className="mt-1 list-disc pl-5 text-sm">
                <li>Sanchit Nipanikar</li>
                <li>Priyal Patange</li>
                <li>Paras Patil</li>
                <li>Kshitij Kalrao</li>
              </ul>
            </div>
          </div>
        </div>

        <div id="toc" className="mt-8 grid lg:grid-cols-1 gap-6">
          <Card title="Table of Contents">
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              <li>
                <a href="#cover" className="text-brand-blue underline">
                  Cover Page
                </a>
                <ol className="list-decimal pl-5 mt-1 space-y-1" />
              </li>
              <li>
                <a href="#problem" className="text-brand-blue underline">
                  Problem Statement
                </a>
              </li>
              <li>
                <a href="#solution" className="text-brand-blue underline">
                  Proposed Solution
                </a>
                <ol className="list-decimal pl-5 mt-1 space-y-1" />
              </li>
              <li>
                <a href="#features" className="text-brand-blue underline">
                  Features
                </a>
              </li>
              <li>
                <a href="#openai" className="text-brand-blue underline">
                  Role of OpenAI Tools
                </a>
                <ol className="list-decimal pl-5 mt-1 space-y-1" />
              </li>
              <li>
                <a href="#techstack" className="text-brand-blue underline">
                  Tech Stack
                </a>
              </li>
              <li>
                <a href="#feasibility" className="text-brand-blue underline">
                  Feasibility
                </a>
              </li>
              <li>
                <a href="#novelty" className="text-brand-blue underline">
                  Novelty
                </a>
              </li>
              <li>
                <a href="#impact" className="text-brand-blue underline">
                  Impact & Benefits
                </a>
              </li>
              <li>
                <a href="#future" className="text-brand-blue underline">
                  Future Scope
                </a>
              </li>
              <li>
                <a href="#references" className="text-brand-blue underline">
                  References (IEEE)
                </a>
              </li>
            </ol>
          </Card>
        </div>

        {/* Problem Statement */}
        <div id="problem" className="mt-10 grid lg:grid-cols-1 gap-6">
          <Card title="Problem Statement">
            <div className="space-y-3 text-sm">
              <p>
                How can we address the critical gaps in India’s rural healthcare
                system, where millions suffer preventable morbidity and
                mortality due to lack of timely access, poor triage knowledge,
                and over‑reliance on costly, repeated imaging?
              </p>
              <p>
                A significant portion of India’s population, especially in rural
                and semi‑urban areas, lacks timely access to qualified medical
                care, suffers preventable morbidity and mortality due to
                inadequate triage knowledge, and faces high costs and radiation
                exposure from repeated CT scans.
              </p>
              <div className="font-medium">2.1 Healthcare Gaps in India</div>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Over 900M rural residents (~65% of population) face poor
                  access; PHCs/CHCs are below prescribed standards.
                </li>
                <li>
                  PHC staffing gaps: missing doctors, lab technicians, and
                  pharmacists; CHCs face 76–83% specialist vacancies.
                </li>
              </ul>
              <div className="font-medium">2.2 Statistics & Citations</div>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Doctor/nurse/midwife density: 20.6 per 10,000 vs WHO’s 44.5
                  benchmark.
                </li>
                <li>
                  Snakebites cause ~58,000 deaths annually; ~70% in rural areas
                  due to delays and lack of first‑aid knowledge.
                </li>
              </ul>
              <div className="font-medium">
                2.3 Impact on Rural and Semi‑Urban Populations
              </div>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Unnecessary deaths, inefficient referrals, repeated costly
                  imaging.
                </li>
                <li>
                  Low awareness of government health schemes and benefits.
                </li>
              </ul>
            </div>
          </Card>
        </div>


        {/* Proposed Solution – Interactive Architecture Diagram */}
        <div id="architecture" className="mt-6 grid lg:grid-cols-1 gap-6">
          <Card title="Proposed Solution – Interactive Architecture Diagram">
            <div className="space-y-3">
              <p>High‑level architecture for LUMEN.</p>
              <ZoomableImage
                src="https://cdn.builder.io/api/v1/image/assets%2Fe8cc9787598e48f9b1b2ad55c5185cb9%2Fad244af8291d4e11bb71aab855e6e750?format=webp&width=800"
                alt="LUMEN System Architecture"
              />
            </div>
          </Card>
        </div>

        {/* Features */}
        <div id="features" className="mt-10 grid lg:grid-cols-1 gap-6">
          <Card title="Features">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Stethoscope className="text-brand-blue" />
                  <div>
                    <div className="font-medium">
                      4.1 Symptoms‑Based Diagnosis & Guidance
                    </div>
                    <p>Severity bands with clear next steps.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Cpu className="text-brand-blue" />
                  <div>
                    <div className="font-medium">4.2 AI Specialist Modules</div>
                    <p>Dermatology, radiology, cardiology decision aids.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Languages className="text-brand-blue" />
                  <div>
                    <div className="font-medium">
                      4.3 Multilingual Voice‑First Chatbot
                    </div>
                    <p>Indic languages with TTS.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Activity className="text-brand-teal" />
                  <div>
                    <div className="font-medium">4.4 PEARL CT Reconstruction</div>
                    <p>Low‑dose previews with guidance.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FlaskConical className="text-brand-teal" />
                  <div>
                    <div className="font-medium">
                      4.5 Lab Report Analyzer & Follow‑Up Generator
                    </div>
                    <p>OCR, reference ranges, actionable follow‑ups.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Landmark className="text-brand-teal" />
                  <div>
                    <div className="font-medium">
                      4.6 Government Schemes & Benefits Assistant
                    </div>
                    <p>Eligibility checks via embeddings + vector DB.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BadgeAlert className="text-cta" />
                  <div>
                    <div className="font-medium">
                      4.7 Preliminary Triage & Emergency Education
                    </div>
                    <p>Audio‑guided first aid tiles.</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Role of OpenAI Tools */}
        <div id="openai" className="mt-6">
          <div className="grid lg:grid-cols-1 gap-6">
            <Card title="Role of OpenAI Tools">
              <div className="p-2">
                <div className="font-medium mb-2">5. Role of OpenAI Tools</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm table-auto">
                    <thead>
                      <tr className="text-left text-xs text-muted-foreground">
                        <th className="px-3 py-2">LUMEN Feature</th>
                        <th className="px-3 py-2">OpenAI Model</th>
                        <th className="px-3 py-2">Usecase</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top">Symptom Triage & Guidance</td>
                        <td className="px-3 py-2 align-top">gpt-4o</td>
                        <td className="px-3 py-2 align-top">Provides empathetic triage and severity classification from patient symptoms</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top">AI Specialist Summaries</td>
                        <td className="px-3 py-2 align-top">gpt-4o-mini</td>
                        <td className="px-3 py-2 align-top">Summarizes AI-ML Model outputs into doctor-style report</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top">Lab Report Analyzer</td>
                        <td className="px-3 py-2 align-top">gpt-4o</td>
                        <td className="px-3 py-2 align-top">Interprets OCR lab values and explains results in patient-friendly terms</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top">Govt Schemes Assistant</td>
                        <td className="px-3 py-2 align-top">text-embedding-3-small + gpt-4o-mini</td>
                        <td className="px-3 py-2 align-top">Retrieves and explains govt health scheme eligibility in simple language.</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top">Emergency Protocols</td>
                        <td className="px-3 py-2 align-top">gpt-4o-mini</td>
                        <td className="px-3 py-2 align-top">Gives fast, step-by-step emergency medical instructions.</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top">Voice Input (ASR)</td>
                        <td className="px-3 py-2 align-top">whisper-1</td>
                        <td className="px-3 py-2 align-top">Converts patient speech to text for symptom entry</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top">Voice Output (TTS)</td>
                        <td className="px-3 py-2 align-top">gpt-4o-audio / Azure TTS</td>
                        <td className="px-3 py-2 align-top">Delivers AI responses as a natural voice for accessibility.</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-3 py-2 align-top">Chatbot</td>
                        <td className="px-3 py-2 align-top">gpt-4o</td>
                        <td className="px-3 py-2 align-top">Provides 24/7 conversational support, guiding users across triage, lab results, schemes, and emergencies</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Tech Stack */}
        <div id="techstack" className="mt-6">
          <div className="grid lg:grid-cols-1 gap-6">
            <Card title="Tech Stack">
              <div className="overflow-x-auto">
                <table className="w-full text-sm table-auto">
                  <thead>
                    <tr className="text-left text-xs text-muted-foreground">
                      <th className="px-3 py-2">Layer</th>
                      <th className="px-3 py-2">Technology / Tools Used</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-3 py-2 align-top">Frontend</td>
                      <td className="px-3 py-2 align-top">
                        React (TypeScript) + Next.js, Tailwind CSS (for UI), Multilingual support
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 py-2 align-top">Backend / API</td>
                      <td className="px-3 py-2 align-top">
                        FastAPI (Python) – REST/GraphQL API server, integrates AI/ML models and handles routing
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 py-2 align-top">Database</td>
                      <td className="px-3 py-2 align-top">
                        PostgreSQL (structured medical records, lab values, CT metadata)
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 py-2 align-top">Cache & Queue</td>
                      <td className="px-3 py-2 align-top">
                        Redis (cache + task queue) + Celery (background jobs like CT reconstruction, PDF parsing)
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 py-2 align-top">Vector Database</td>
                      <td className="px-3 py-2 align-top">
                        Weaviate / Pinecone (semantic search on medical guidelines, govt schemes)
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 py-2 align-top">Object Storage</td>
                      <td className="px-3 py-2 align-top">
                        AWS S3 / MinIO (self-hosted alternative) – for CT scans, lab reports, medical images
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 py-2 align-top">AI/ML Core</td>
                      <td className="px-3 py-2 align-top">
                        PyTorch + Hugging Face Transformers (embeddings, multilingual models, PEARL CT, dermatology AI, lab parser) + OpenAI APIs (GPT-4o, Whisper, DALL·E)
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 py-2 align-top">Security</td>
                      <td className="px-3 py-2 align-top">
                        JWT + OAuth2, TLS/SSL, AES-256 encryption, HIPAA/GDPR compliance
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 py-2 align-top">Infrastructure & Deployment</td>
                      <td className="px-3 py-2 align-top">
                        Docker + Kubernetes (K8s) on AWS/GCP/Azure with GPU nodes; CDN for static assets
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 flex justify-center">
                <TechStackGrid />
              </div>
            </Card>
          </div>
        </div>

        {/* Feasibility */}
        <div id="feasibility" className="mt-6 grid lg:grid-cols-1 gap-6">
          <Card title="Feasibility">
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {/* Left column */}
              <div className="space-y-4">
                <div className="p-4 bg-card/80 border border-border rounded-lg shadow-sm hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
                  <div className="font-medium">7.1 Technical Feasibility</div>
                  <div className="mt-2">
                    <div className="font-medium">Resources & Technology:</div>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Prototype: Hugging Face free models (Indic-GPT, Donut, Whisper-small).</li>
                      <li>Production: OpenAI APIs (GPT-4o, Whisper, DALL·E) + custom PEARL CT pipeline.</li>
                    </ul>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium">Infrastructure:</div>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Frontend: React + Tailwind CSS.</li>
                      <li>Backend: FastAPI (Python) with Docker.</li>
                      <li>Deployment: Netlify (frontend), AWS/GCP (production).</li>
                    </ul>
                  </div>
                  <p className="mt-2">Assessment: Existing technologies are sufficient. Only CT reconstruction pipeline requires GPU resources, which are available on cloud platforms.</p>
                </div>
                <div className="p-4 bg-card/80 border border-border rounded-lg shadow-sm hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
                  <div className="font-medium">7.2 Operational Feasibility</div>
                  <div className="mt-2">
                    <div className="font-medium">Problem Fit:</div>
                    <p>Addresses rural healthcare gaps (900M+ residents), triage delays, and lab follow-up inefficiencies.</p>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium">Ease of Operation:</div>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Multilingual voice-first chatbot lowers digital literacy barriers.</li>
                      <li>Offline-first design ensures use even in low-connectivity areas.</li>
                    </ul>
                  </div>
                  <p className="mt-2">Assessment: Operationally feasible, since workflows mirror real-world healthcare interactions (symptom → guidance → follow-up).</p>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-4">
                <div className="p-4 bg-card/80 border border-border rounded-lg shadow-sm hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
                  <div className="font-medium">7.3 Economic Feasibility</div>
                  <div className="mt-2">
                    <div className="font-medium">Prototype Cost:</div>
                    <p>Minimal (free tiers: Hugging Face, Netlify, Firebase).</p>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium">Production Cost:</div>
                    <p>API usage (OpenAI GPT, Whisper), GPU compute (CT), and storage (AWS S3).</p>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium">ROI:</div>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Reducing preventable deaths (e.g., 58,000 annual snakebite fatalities).</li>
                      <li>Saving costs from unnecessary clinic visits & repeated CT scans.</li>
                    </ul>
                  </div>
                  <p className="mt-2">Assessment: Strong cost-benefit justification; socially impactful and scalable.</p>
                </div>
                <div className="p-4 bg-card/80 border border-border rounded-lg shadow-sm hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
                  <div className="font-medium">7.4 Legal Feasibility</div>
                  <div className="mt-2">
                    <div className="font-medium">Compliance Requirements:</div>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Data protection → GDPR/HIPAA-like standards.</li>
                      <li>Informed consent → required for data use.</li>
                    </ul>
                  </div>
                  <p className="mt-2">Assessment: Legally feasible with proper compliance in production; no major barriers.</p>
                </div>
                <div className="p-4 bg-card/80 border border-border rounded-lg shadow-sm hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
                  <div className="font-medium">7.5 Market Feasibility</div>
                  <div className="mt-2">
                    <div className="font-medium">Target Users:</div>
                    <p>900M+ rural/semi-urban Indians lacking timely healthcare.</p>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium">Market Trend:</div>
                    <p>Rising smartphone penetration (67%+ rural households with access).</p>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium">Competition:</div>
                    <p>Existing health apps (Practo, 1mg) focus on urban users; none combine triage + lab reports + CT + schemes in one system.</p>
                  </div>
                  <p className="mt-2">Assessment: High demand, underserved market, unique positioning.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Novelty */}
        <div id="novelty" className="mt-10">
          <div className="grid lg:grid-cols-1 gap-6">
            <Card title="Novelty">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card 1: PEARL CT Reconstruction */}
                <div className="w-64 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden">
                  <div className="w-24 h-24 bg-violet-500 rounded-full absolute -right-5 -top-7">
                    <p className="absolute bottom-6 left-7 text-white text-2xl">01</p>
                </div>
                  <div className="fill-violet-500 w-12">
                    <svg viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg">
                      <path d="m24,6.928v13.072h-11.5v3h5v1H6.5v-1h5v-3H0V4.5c0-1.379,1.122-2.5,2.5-2.5h12.98c-.253.295-.54.631-.856,1H2.5c-.827,0-1.5.673-1.5,1.5v14.5h22v-10.993l1-1.079Zm-12.749,3.094C19.058.891,19.093.855,19.11.838c1.118-1.115,2.936-1.113,4.052.002,1.114,1.117,1.114,2.936,0,4.052l-8.185,8.828c-.116,1.826-1.623,3.281-3.478,3.281h-5.59l.097-.582c.043-.257,1.086-6.16,5.244-6.396Zm2.749,3.478c0-1.379-1.122-2.5-2.5-2.5-2.834,0-4.018,3.569-4.378,5h4.378c1.378,0,2.5-1.121,2.5-2.5Zm.814-1.073l2.066-2.229c-.332-1.186-1.371-2.057-2.606-2.172-.641.749-1.261,1.475-1.817,2.125,1.117.321,1.998,1.176,2.357,2.277Zm.208-5.276c1.162.313,2.125,1.134,2.617,2.229l4.803-5.18c.737-.741.737-1.925.012-2.653-.724-.725-1.908-.727-2.637,0-.069.08-2.435,2.846-4.795,5.606Z"></path>
                    </svg>
                  </div>
                  <h1 className="font-bold text-xl">PEARL CT Reconstruction</h1>
                  <p className="text-sm text-zinc-500 leading-6">
                    Tri-model pipeline (PerX2CT + XctDiff + SAX-NeRF) for low-dose CT estimation with voxel-level uncertainty
                  </p>
                </div>

                {/* Card 2: Integrated AI Healthcare Engine */}
                <div className="w-64 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden">
                  <div className="w-24 h-24 bg-violet-500 rounded-full absolute -right-5 -top-7">
                    <p className="absolute bottom-6 left-7 text-white text-2xl">02</p>
                  </div>
                  <div className="fill-violet-500 w-12">
                    <svg viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg">
                      <path d="m24,6.928v13.072h-11.5v3h5v1H6.5v-1h5v-3H0V4.5c0-1.379,1.122-2.5,2.5-2.5h12.98c-.253.295-.54.631-.856,1H2.5c-.827,0-1.5.673-1.5,1.5v14.5h22v-10.993l1-1.079Zm-12.749,3.094C19.058.891,19.093.855,19.11.838c1.118-1.115,2.936-1.113,4.052.002,1.114,1.117,1.114,2.936,0,4.052l-8.185,8.828c-.116,1.826-1.623,3.281-3.478,3.281h-5.59l.097-.582c.043-.257,1.086-6.16,5.244-6.396Zm2.749,3.478c0-1.379-1.122-2.5-2.5-2.5-2.834,0-4.018,3.569-4.378,5h4.378c1.378,0,2.5-1.121,2.5-2.5Zm.814-1.073l2.066-2.229c-.332-1.186-1.371-2.057-2.606-2.172-.641.749-1.261,1.475-1.817,2.125,1.117.321,1.998,1.176,2.357,2.277Zm.208-5.276c1.162.313,2.125,1.134,2.617,2.229l4.803-5.18c.737-.741.737-1.925.012-2.653-.724-.725-1.908-.727-2.637,0-.069.08-2.435,2.846-4.795,5.606Z"></path>
                    </svg>
                  </div>
                  <h1 className="font-bold text-xl">Integrated AI Healthcare Engine</h1>
                  <p className="text-sm text-zinc-500 leading-6">
                    Combining triage, specialist modules, lab parsing, and scheme retrieval in one unified system
                  </p>
                </div>

                {/* Card 3: Multilingual Voice-First */}
                <div className="w-64 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden">
                  <div className="w-24 h-24 bg-violet-500 rounded-full absolute -right-5 -top-7">
                    <p className="absolute bottom-6 left-7 text-white text-2xl">03</p>
                  </div>
                  <div className="fill-violet-500 w-12">
                    <svg viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg">
                      <path d="m24,6.928v13.072h-11.5v3h5v1H6.5v-1h5v-3H0V4.5c0-1.379,1.122-2.5,2.5-2.5h12.98c-.253.295-.54.631-.856,1H2.5c-.827,0-1.5.673-1.5,1.5v14.5h22v-10.993l1-1.079Zm-12.749,3.094C19.058.891,19.093.855,19.11.838c1.118-1.115,2.936-1.113,4.052.002,1.114,1.117,1.114,2.936,0,4.052l-8.185,8.828c-.116,1.826-1.623,3.281-3.478,3.281h-5.59l.097-.582c.043-.257,1.086-6.16,5.244-6.396Zm2.749,3.478c0-1.379-1.122-2.5-2.5-2.5-2.834,0-4.018,3.569-4.378,5h4.378c1.378,0,2.5-1.121,2.5-2.5Zm.814-1.073l2.066-2.229c-.332-1.186-1.371-2.057-2.606-2.172-.641.749-1.261,1.475-1.817,2.125,1.117.321,1.998,1.176,2.357,2.277Zm.208-5.276c1.162.313,2.125,1.134,2.617,2.229l4.803-5.18c.737-.741.737-1.925.012-2.653-.724-.725-1.908-.727-2.637,0-.069.08-2.435,2.846-4.795,5.606Z"></path>
                    </svg>
                  </div>
                  <h1 className="font-bold text-xl">Multilingual Voice-First</h1>
                  <p className="text-sm text-zinc-500 leading-6">
                    Accessibility using Whisper + GPT for 5+ Indian languages with voice-first interface
                  </p>
                </div>

                {/* Card 4: Emergency Education */}
                <div className="w-64 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden">
                  <div className="w-24 h-24 bg-violet-500 rounded-full absolute -right-5 -top-7">
                    <p className="absolute bottom-6 left-7 text-white text-2xl">04</p>
                  </div>
                  <div className="fill-violet-500 w-12">
                    <svg viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg">
                      <path d="m24,6.928v13.072h-11.5v3h5v1H6.5v-1h5v-3H0V4.5c0-1.379,1.122-2.5,2.5-2.5h12.98c-.253.295-.54.631-.856,1H2.5c-.827,0-1.5.673-1.5,1.5v14.5h22v-10.993l1-1.079Zm-12.749,3.094C19.058.891,19.093.855,19.11.838c1.118-1.115,2.936-1.113,4.052.002,1.114,1.117,1.114,2.936,0,4.052l-8.185,8.828c-.116,1.826-1.623,3.281-3.478,3.281h-5.59l.097-.582c.043-.257,1.086-6.16,5.244-6.396Zm2.749,3.478c0-1.379-1.122-2.5-2.5-2.5-2.834,0-4.018,3.569-4.378,5h4.378c1.378,0,2.5-1.121,2.5-2.5Zm.814-1.073l2.066-2.229c-.332-1.186-1.371-2.057-2.606-2.172-.641.749-1.261,1.475-1.817,2.125,1.117.321,1.998,1.176,2.357,2.277Zm.208-5.276c1.162.313,2.125,1.134,2.617,2.229l4.803-5.18c.737-.741.737-1.925.012-2.653-.724-.725-1.908-.727-2.637,0-.069.08-2.435,2.846-4.795,5.606Z"></path>
                    </svg>
                  </div>
                  <h1 className="font-bold text-xl">Emergency Education</h1>
                  <p className="text-sm text-zinc-500 leading-6">
                    First-aid & triage education with voice/text/visuals in local languages for rural areas
                  </p>
                </div>

                {/* Card 5: Government Schemes Assistant */}
                <div className="w-64 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden">
                  <div className="w-24 h-24 bg-violet-500 rounded-full absolute -right-5 -top-7">
                    <p className="absolute bottom-6 left-7 text-white text-2xl">05</p>
                  </div>
                  <div className="fill-violet-500 w-12">
                    <svg viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg">
                      <path d="m24,6.928v13.072h-11.5v3h5v1H6.5v-1h5v-3H0V4.5c0-1.379,1.122-2.5,2.5-2.5h12.98c-.253.295-.54.631-.856,1H2.5c-.827,0-1.5.673-1.5,1.5v14.5h22v-10.993l1-1.079Zm-12.749,3.094C19.058.891,19.093.855,19.11.838c1.118-1.115,2.936-1.113,4.052.002,1.114,1.117,1.114,2.936,0,4.052l-8.185,8.828c-.116,1.826-1.623,3.281-3.478,3.281h-5.59l.097-.582c.043-.257,1.086-6.16,5.244-6.396Zm2.749,3.478c0-1.379-1.122-2.5-2.5-2.5-2.834,0-4.018,3.569-4.378,5h4.378c1.378,0,2.5-1.121,2.5-2.5Zm.814-1.073l2.066-2.229c-.332-1.186-1.371-2.057-2.606-2.172-.641.749-1.261,1.475-1.817,2.125,1.117.321,1.998,1.176,2.357,2.277Zm.208-5.276c1.162.313,2.125,1.134,2.617,2.229l4.803-5.18c.737-.741.737-1.925.012-2.653-.724-.725-1.908-.727-2.637,0-.069.08-2.435,2.846-4.795,5.606Z"></path>
                    </svg>
                  </div>
                  <h1 className="font-bold text-xl">Government Schemes Assistant</h1>
                  <p className="text-sm text-zinc-500 leading-6">
                    Explaining eligibility and steps for government health schemes in local language
                  </p>
                </div>

                {/* Card 6: Lab Report Analyzer */}
                <div className="w-64 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden">
                  <div className="w-24 h-24 bg-violet-500 rounded-full absolute -right-5 -top-7">
                    <p className="absolute bottom-6 left-7 text-white text-2xl">06</p>
                  </div>
                  <div className="fill-violet-500 w-12">
                    <svg viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg">
                      <path d="m24,6.928v13.072h-11.5v3h5v1H6.5v-1h5v-3H0V4.5c0-1.379,1.122-2.5,2.5-2.5h12.98c-.253.295-.54.631-.856,1H2.5c-.827,0-1.5.673-1.5,1.5v14.5h22v-10.993l1-1.079Zm-12.749,3.094C19.058.891,19.093.855,19.11.838c1.118-1.115,2.936-1.113,4.052.002,1.114,1.117,1.114,2.936,0,4.052l-8.185,8.828c-.116,1.826-1.623,3.281-3.478,3.281h-5.59l.097-.582c.043-.257,1.086-6.16,5.244-6.396Zm2.749,3.478c0-1.379-1.122-2.5-2.5-2.5-2.834,0-4.018,3.569-4.378,5h4.378c1.378,0,2.5-1.121,2.5-2.5Zm.814-1.073l2.066-2.229c-.332-1.186-1.371-2.057-2.606-2.172-.641.749-1.261,1.475-1.817,2.125,1.117.321,1.998,1.176,2.357,2.277Zm.208-5.276c1.162.313,2.125,1.134,2.617,2.229l4.803-5.18c.737-.741.737-1.925.012-2.653-.724-.725-1.908-.727-2.637,0-.069.08-2.435,2.846-4.795,5.606Z"></path>
                    </svg>
                  </div>
                  <h1 className="font-bold text-xl">Lab Report Analyzer</h1>
                  <p className="text-sm text-zinc-500 leading-6">
                    OCR-based lab report interpretation with actionable diet and lifestyle guidance recommendations
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Impact & Benefits */}
        <div id="impact" className="mt-6 grid lg:grid-cols-2 gap-6">
          <Card title="Impact & Benefits">
            <div className="space-y-2 text-sm">
              <div className="font-medium">9.1 Quantitative Benefits</div>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Reduction in preventable morbidity and mortality (e.g., ~58k
                  annual snakebite deaths).
                </li>
                <li>
                  Cost savings via better triage and fewer repeated CT scans.
                </li>
                <li>
                  Improved diagnostic efficiency with automated labs and
                  specialist guidance.
                </li>
              </ul>
              <div className="font-medium">9.2 Potential Beneficiaries</div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Rural and semi‑urban populations (900M+).</li>
                <li>PHCs & CHCs: decision support for frontline workers.</li>
                <li>
                  Government scheme beneficiaries (e.g., Ayushman Bharat).
                </li>
              </ul>
              <div className="font-medium">
                9.3 Awareness & Accessibility Gains
              </div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Multilingual, voice‑first interface.</li>
                <li>Offline‑first design for low/no connectivity.</li>
                <li>Greater awareness of entitlements and benefits.</li>
              </ul>
            </div>
          </Card>
          <Card title="Future Scope">
            <div id="future" />
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Language expansion for more Indian languages and dialects.
              </li>
              <li>
                Additional specialist modules (Pediatrics, OBGYN, Psychiatry,
                Neurology).
              </li>
              <li>
                NGO & hospital integrations for field operations and referrals.
              </li>
              <li>
                Offline‑first Android app with preloaded protocols and schemes.
              </li>
              <li>Predictive healthcare analytics for early risk warnings.</li>
            </ul>
          </Card>
        </div>

        {/* References */}
        <div id="references" className="mt-6 grid lg:grid-cols-1 gap-6">
          <Card title="References (IEEE Format)">
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              <li>
                “Healthcare Access in Rural Communities in India,” Ballard
                Brief, 18‑Dec‑2024.
              </li>
              <li>
                A. P. Ugargol et al., “In search of a fix to the primary health
                care chasm in India,” PMC, 2023.
              </li>
              <li>
                A. Nair et al., “Workforce problems at rural public
                health‑centres in India,” Human Resources for Health, 2022.
              </li>
              <li>
                W. Suraweera et al., “Trends in snakebite deaths in India from
                2000 to 2019,” eLife, 2020.
              </li>
              <li>“Snakebite,” Wikipedia, 2025.</li>
              <li>
                “India still struggles with rural doctor shortages,”
                ResearchGate/Axios, 2025.
              </li>
              <li>
                “Healthcare Access in Rural India,” docboxmed.com, 23‑Sep‑2024.
              </li>
              <li>
                Times of India reports on snakebite incidents and outcomes,
                2025.
              </li>
            </ol>
          </Card>
        </div>
      </div>
    </section>
  );
}