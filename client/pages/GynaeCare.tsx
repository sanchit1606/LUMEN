import React from "react";
import Navbar from "@/components/lumen/Navbar";
import Footer from "@/components/lumen/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedMap } from "@/components/lumen/DottedMap";

export default function GynaeCarePage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="relative flex-1 pt-24 pb-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
          <DottedMap
            width={900}
            height={540}
            mapSamples={9000}
            dotRadius={0.3}
            className="w-full h-full scale-150 text-gray-900"
          />
        </div>
        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-center z-10">
          <style>{`
            .gyn-card {
              box-sizing: border-box;
              background: rgba(255, 255, 255, 0.7);
              border: 1px solid rgba(255, 255, 255, 0.9);
              box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
              backdrop-filter: blur(6px);
              border-radius: 17px;
              transition: all 0.5s;
            }
            .gyn-card:hover {
              border: 1px solid #000;
              transform: scale(1.02);
            }
            .gyn-card:active {
              transform: scale(0.98) rotateZ(1deg);
            }
          `}</style>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center font-surgena">
              GynaeCare
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto">
              Quick, trustworthy guidance for menstrual health, hygiene, screenings, pregnancy basics, and red flags—designed to educate and support women and anyone needing gynecologic care.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="gyn-card">
              <CardHeader>
            <CardTitle className="text-lg font-semibold">What is GynaeCare</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2 text-left">
                <p>Evidence-informed tips for menstrual health, hygiene, screening reminders, and when to seek care.</p>
                <p>Not a medical device; always consult a clinician for personal care.</p>
              </CardContent>
            </Card>

            <Card className="gyn-card">
              <CardHeader>
            <CardTitle className="text-lg font-semibold">Daily Healthy Practices</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2 text-left">
                <ul className="list-disc list-inside space-y-1">
                  <li>Sleep 7–9h, hydrate 2–3L water/day.</li>
                  <li>Balanced plate: iron, calcium, protein, fiber.</li>
                  <li>30–45 min moderate activity most days.</li>
                  <li>Stress care: breathing, walks, limit screens before bed.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="gyn-card">
              <CardHeader>
            <CardTitle className="text-lg font-semibold">Cycle Care & Pain Relief</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2 text-left">
                <ul className="list-disc list-inside space-y-1">
                  <li>Track cycle length, flow, cramps; note changes.</li>
                  <li>Heat pads, light stretches, NSAIDs if advised.</li>
                  <li>Heavy bleeding/clots &gt;2–3 hours → see a clinician.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="gyn-card">
              <CardHeader>
            <CardTitle className="text-lg font-semibold">Red Flags & When to Seek Care</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2 text-left">
                <ul className="list-disc list-inside space-y-1">
                  <li>Sudden severe pelvic pain, fainting, fever.</li>
                  <li>Bleeding after sex, between periods, or post-menopause.</li>
                  <li>Foul discharge, itching, burning urination.</li>
                  <li>Breast lump/skin change, nipple discharge.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="gyn-card">
              <CardHeader>
            <CardTitle className="text-lg font-semibold">Screenings & Vaccines</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2 text-left">
                <ul className="list-disc list-inside space-y-1">
                  <li>HPV vaccine as eligible.</li>
                  <li>Pap/HPV tests as per age/doctor guidance.</li>
                  <li>Breast self-awareness; mammogram schedule per risk/age.</li>
                  <li>Anemia, thyroid, vitamin D/B12 checks if symptomatic.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="gyn-card">
              <CardHeader>
            <CardTitle className="text-lg font-semibold">Hygiene & Safe Sex</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2 text-left">
                <ul className="list-disc list-inside space-y-1">
                  <li>Change pads/tampons/cups as directed; wash hands before/after.</li>
                  <li>Use clean water; avoid harsh soaps/douching.</li>
                  <li>Condoms for STI protection; discuss contraception options.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="gyn-card">
              <CardHeader>
            <CardTitle className="text-lg font-semibold">Mental Wellbeing</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2 text-left">
                <ul className="list-disc list-inside space-y-1">
                  <li>Track mood changes around cycle; prioritize sleep and support.</li>
                  <li>Seek help for persistent low mood, anxiety, or intrusive thoughts.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="gyn-card">
              <CardHeader>
            <CardTitle className="text-lg font-semibold">Pregnancy & Postpartum Basics</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2 text-left">
                <ul className="list-disc list-inside space-y-1">
                  <li>Prenatal vitamins (folate/iron) per clinician; regular antenatal visits.</li>
                  <li>Watch for swelling, headaches, vision changes—seek care promptly.</li>
                  <li>Postpartum: rest, hydration, watch bleeding, mood; get support if overwhelmed.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="gyn-card">
              <CardHeader>
            <CardTitle className="text-lg font-semibold">Emergency Steps</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2 text-left">
                <ul className="list-disc list-inside space-y-1">
                  <li>Severe abdominal pain, heavy bleeding, fainting, or high fever: seek emergency care.</li>
                  <li>Shortness of breath, chest pain, sudden leg swelling/pain: go to ER.</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="text-xs text-muted-foreground max-w-3xl mx-auto">
            This is educational content and not a substitute for professional medical advice, diagnosis, or treatment. Please consult a qualified clinician for personalized care.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

