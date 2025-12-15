import React from "react";
import Navbar from "@/components/lumen/Navbar";
import Footer from "@/components/lumen/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Scheme = { name: string; description: string; url: string };

const unionSchemes: Scheme[] = [
  {
    name: "Ayushman Bharat – PM-JAY",
    description:
      "National health assurance providing cashless secondary & tertiary care for poor and vulnerable families.",
    url: "https://pmjay.gov.in",
  },
  {
    name: "ABHA (Ayushman Bharat Health Account)",
    description:
      "Create your digital health ID to securely access and share health records across providers.",
    url: "https://abha.abdm.gov.in",
  },
  {
    name: "eSanjeevani (Telemedicine)",
    description:
      "Free online OPD and doctor-to-doctor teleconsultation services by MoHFW.",
    url: "https://esanjeevani.mohfw.gov.in",
  },
  {
    name: "Jan Aushadhi (Affordable Generic Medicines)",
    description:
      "Pradhan Mantri Bhartiya Janaushadhi Pariyojana – quality generic medicines at affordable prices.",
    url: "https://janaushadhi.gov.in",
  },
  {
    name: "Nikshay (National TB Elimination Programme)",
    description: "TB patient support, treatment adherence and DBT benefits.",
    url: "https://www.nikshay.in",
  },
  {
    name: "PMMVY (Pradhan Mantri Matru Vandana Yojana)",
    description: "Conditional cash benefit for pregnant and lactating women.",
    url: "https://pmmvy.wcd.gov.in",
  },
  {
    name: "Janani Suraksha Yojana (NHM)",
    description:
      "Safe motherhood intervention to promote institutional deliveries.",
    url: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309",
  },
  {
    name: "NOTTO (Organ Donation/Transplant)",
    description:
      "National Organ & Tissue Transplant Organization – information and registration.",
    url: "https://notto.gov.in",
  },
];

const stateOptions = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Gujarat",
  "Haryana",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
] as const;

type StateKey = (typeof stateOptions)[number];

const stateSchemes: Record<StateKey, Scheme[]> = {
  "Andhra Pradesh": [
    {
      name: "Dr. YSR Aarogyasri",
      description:
        "Cashless treatment for BPL families at empanelled hospitals.",
      url: "https://www.ysraarogyasri.ap.gov.in",
    },
  ],
  Assam: [
    {
      name: "Atal Amrit Abhiyan",
      description: "Health assurance scheme for specified critical illnesses.",
      url: "https://aaa.assam.gov.in",
    },
  ],
  Bihar: [
    {
      name: "Bihar Mukhyamantri Chikitsa Sahayata Kosh",
      description: "Financial assistance for critical illness treatment.",
      url: "https://state.bihar.gov.in/health/",
    },
  ],
  Chhattisgarh: [
    {
      name: "Dr. Khubchand Baghel Swasthya Sahayata Yojana",
      description: "State health assistance scheme for eligible families.",
      url: "https://cghealth.nic.in",
    },
  ],
  Delhi: [
    {
      name: "Delhi Arogya Kosh",
      description:
        "Financial assistance for high-end diagnostics and procedures.",
      url: "https://arogyakosh.delhi.gov.in",
    },
    {
      name: "Farishte Dilli Ke",
      description:
        "Free emergency treatment for road accident victims in Delhi.",
      url: "https://health.delhi.gov.in",
    },
  ],
  Gujarat: [
    {
      name: "Mukhyamantri Amrutam (MA) & MA Vatsalya",
      description:
        "Catastrophic illness coverage for poor and lower middle class.",
      url: "https://maa.gujarat.gov.in",
    },
  ],
  Haryana: [
    {
      name: "Chirayu Haryana",
      description: "State extension of PM-JAY benefits for eligible families.",
      url: "https://chirayuayushman.haryana.gov.in",
    },
  ],
  Jharkhand: [
    {
      name: "Mukhyamantri Jan Arogya Yojana (MJAY)",
      description: "Health coverage to eligible households in Jharkhand.",
      url: "https://jayah.jharkhand.gov.in",
    },
  ],
  Karnataka: [
    {
      name: "Ayushman Bharat – Arogya Karnataka (AB-ArK)",
      description: "Universal health coverage convergence in Karnataka.",
      url: "https://sast.gov.in",
    },
  ],
  Kerala: [
    {
      name: "Karunya Benevolent Fund",
      description: "Financial assistance for major ailments and surgeries.",
      url: "https://karunya.kerala.gov.in",
    },
  ],
  "Madhya Pradesh": [
    {
      name: "Mukhyamantri Jan Arogya Abhiyan (PM-JAY MP)",
      description: "State implementation of PM-JAY with convergence.",
      url: "https://ayushmanbhav.mp.gov.in",
    },
  ],
  Maharashtra: [
    {
      name: "Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY)",
      description: "Cashless quality medical care for serious ailments.",
      url: "https://mjpjy.gov.in",
    },
  ],
  Odisha: [
    {
      name: "Biju Swasthya Kalyan Yojana (BSKY)",
      description: "Universal health coverage for Odisha residents.",
      url: "https://bsky.odisha.gov.in",
    },
  ],
  Punjab: [
    {
      name: "Sarbat Sehat Bima Yojana (PM-JAY Punjab)",
      description: "Health insurance cover for eligible families in Punjab.",
      url: "https://sha.punjab.gov.in",
    },
  ],
  Rajasthan: [
    {
      name: "Mukhyamantri Chiranjeevi Swasthya Bima Yojana",
      description: "Cashless treatment up to the scheme limit for residents.",
      url: "https://chiranjeevi.rajasthan.gov.in",
    },
  ],
  "Tamil Nadu": [
    {
      name: "CM Comprehensive Health Insurance Scheme (CMCHIS)",
      description: "Cashless treatment for eligible families in TN.",
      url: "https://www.cmchistn.com",
    },
  ],
  Telangana: [
    {
      name: "Aarogyasri (Telangana)",
      description: "Tertiary care coverage for eligible beneficiaries.",
      url: "https://aarogyasri.telangana.gov.in",
    },
  ],
  "Uttar Pradesh": [
    {
      name: "Ayushman Bharat – PM-JAY (UP State Portal)",
      description: "State portal for PM-JAY services and e-cards.",
      url: "https://ayushmanup.in",
    },
  ],
  Uttarakhand: [
    {
      name: "Atal Ayushman Uttarakhand Yojana (AAUY)",
      description: "Universal health coverage for residents of Uttarakhand.",
      url: "https://ayushmanuk.gov.in",
    },
  ],
  "West Bengal": [
    {
      name: "Swasthya Sathi",
      description: "Cashless health scheme for families of West Bengal.",
      url: "https://swasthyasathi.gov.in",
    },
  ],
};

function SchemeItem({ s }: { s: Scheme }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border p-4">
      <div>
        <div className="font-medium">{s.name}</div>
        <p className="text-sm text-muted-foreground mt-1">{s.description}</p>
      </div>
      <a
        className="btn-cta shrink-0"
        target="_blank"
        rel="noopener noreferrer"
        href={s.url}
      >
        Visit
      </a>
    </div>
  );
}

function HexSocket() {
  const gels = Array.from({ length: 37 }, (_, i) => i + 1);
  return (
    <div className="relative inline-block">
      <div className="socket">
        <div className="gel center-gel">
          <div className="hex-brick"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        {gels.map((i) => {
          const r = i % 3 === 1 ? "r1" : i % 3 === 2 ? "r2" : "r3";
          return (
            <div key={i} className={`gel c${i} ${r}`}>
              <div className="hex-brick"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SchemesPage() {
  const [state, setState] = React.useState<StateKey | undefined>(undefined);
  const current = state ? stateSchemes[state] : [];

  return (
    <div className="relative">
      <Navbar />
      <main className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold">
              Government Schemes & Benefits Assistant
            </h1>
            <p className="mt-3 text-muted-foreground">
              Explore and access national and state-specific healthcare and welfare schemes
              relevant to LUMEN users. All links go to official portals.
            </p>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6 items-start">
            <Card>
              <CardHeader>
                <CardTitle>Union Government Schemes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {unionSchemes.map((s) => (
                  <SchemeItem key={s.url} s={s} />
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>State Schemes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Select your state
                    </label>
                    <Select
                      value={state}
                      onValueChange={(v) => setState(v as StateKey)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a state" />
                      </SelectTrigger>
                      <SelectContent>
                        {stateOptions.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {state ? (
                    current && current.length ? (
                      <div className="mt-2 space-y-3">
                        {current.map((s) => (
                          <SchemeItem key={s.url} s={s} />
                        ))}
                      </div>
                    ) : (
                      <div className="mt-2 rounded-lg border p-4 text-sm text-muted-foreground">
                        No state-specific schemes are listed yet. Please check
                        back soon or visit your state health department portal.
                      </div>
                    )
                  ) : (
                    <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                      Select a state to view available schemes.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
