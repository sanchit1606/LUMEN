import React from "react";
import Navbar from "@/components/lumen/Navbar";
import Footer from "@/components/lumen/Footer";
import { DottedMap } from "@/components/lumen/DottedMap";
import LabAnalyzer, { AnalyzeResponse } from "@/components/lumen/LabAnalyzer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Bell,
  CalendarDays,
  ClipboardList,
  Download,
  Trash2,
  Check,
} from "lucide-react";

interface FollowUpPlan {
  id: string;
  kind: "retest" | "consultation" | "lifestyle";
  dateISO: string; // start date/time
  notes: string;
  severity?: "green" | "yellow" | "red";
  abnormal?: { key: string; status: string; value: string }[];
  done?: boolean;
}

function formatDateTimeLocal(d: Date) {
  const pad = (n: number) => `${n}`.padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function toICS(plan: FollowUpPlan) {
  const start = new Date(plan.dateISO);
  const dt = start
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
  const end = new Date(start.getTime() + 45 * 60 * 1000)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
  const titleMap = {
    retest: "Re-test Labs",
    consultation: "Doctor Consultation",
    lifestyle: "Lifestyle Plan Check-in",
  } as const;
  const title = `LUMEN: ${titleMap[plan.kind]}`;
  const descLines = [
    `Severity: ${plan.severity || "n/a"}`,
    plan.abnormal && plan.abnormal.length
      ? `Abnormal: ${plan.abnormal.map((a) => `${a.key} (${a.status}: ${a.value})`).join(", ")}`
      : "",
    plan.notes,
  ].filter(Boolean);
  const desc = descLines.join("\\n");
  return `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//LUMEN//Lab Follow Up//EN\nBEGIN:VEVENT\nUID:${plan.id}@lumen\nDTSTAMP:${dt}\nDTSTART:${dt}\nDTEND:${end}\nSUMMARY:${title}\nDESCRIPTION:${desc.replace(/\n/g, "\\n")}\nEND:VEVENT\nEND:VCALENDAR`;
}

function useLocalPlans() {
  const key = "lab.followups";
  const [plans, setPlans] = React.useState<FollowUpPlan[]>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as FollowUpPlan[]) : [];
    } catch {
      return [];
    }
  });
  const persist = React.useCallback((next: FollowUpPlan[]) => {
    setPlans(next);
    localStorage.setItem(key, JSON.stringify(next));
  }, []);
  return {
    plans,
    add: (p: FollowUpPlan) => persist([p, ...plans]),
    toggleDone: (id: string) =>
      persist(plans.map((p) => (p.id === id ? { ...p, done: !p.done } : p))),
    remove: (id: string) => persist(plans.filter((p) => p.id !== id)),
  };
}

function FollowUpPlanner({ result }: { result: AnalyzeResponse | null }) {
  const { plans, add, toggleDone, remove } = useLocalPlans();
  const [kind, setKind] = React.useState<FollowUpPlan["kind"]>("retest");
  const [date, setDate] = React.useState<Date>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    d.setHours(9, 0, 0, 0);
    return d;
  });
  const [timeLocal, setTimeLocal] = React.useState<string>(() =>
    formatDateTimeLocal(new Date()),
  );
  const [notes, setNotes] = React.useState<string>("");

  React.useEffect(() => {
    if (result?.summary) {
      const base = result.summary;
      const abn = (result.items || []).filter(
        (i) => i.status === "low" || i.status === "high",
      );
      const suggestion =
        result.severity === "red"
          ? "Book a clinician consult within 48 hours."
          : result.severity === "yellow"
            ? "Re-test and review diet/medication."
            : "Maintain routine checkups.";
      setNotes(`${base} ${suggestion}`.trim());
    }
  }, [result]);

  React.useEffect(() => {
    const d = new Date(date);
    const [_, tm] = timeLocal.split("T");
    if (tm) {
      const [hh, mm] = tm.split(":");
      d.setHours(Number(hh || 9), Number(mm || 0), 0, 0);
      setDate(d);
    }
  }, [timeLocal]);

  const abnormal = (result?.items || []).filter(
    (i) => i.status === "low" || i.status === "high",
  );

  const savePlan = () => {
    const plan: FollowUpPlan = {
      id: `${Date.now()}`,
      kind,
      dateISO: date.toISOString(),
      notes,
      severity: result?.severity,
      abnormal: abnormal.map((i) => ({
        key: i.key,
        status: i.status,
        value: i.value,
      })),
    };
    add(plan);
  };

  const downloadICS = (p: FollowUpPlan) => {
    const blob = new Blob([toICS(p)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lumen-follow-up-${p.id}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-brand-blue" /> Plan Follow‑Up
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Type</label>
              <Select value={kind} onValueChange={(v) => setKind(v as any)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retest">Re-test labs</SelectItem>
                  <SelectItem value="consultation">
                    Doctor consultation
                  </SelectItem>
                  <SelectItem value="lifestyle">Lifestyle check-in</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Date & Time</label>
              <div className="mt-1 grid grid-cols-1 gap-2">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && setDate(d)}
                  className="rounded-md border"
                />
                <Input
                  type="datetime-local"
                  value={formatDateTimeLocal(date)}
                  onChange={(e) => setTimeLocal(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Notes</label>
            <Textarea
              className="mt-1"
              placeholder="Next steps, questions for your doctor, lifestyle changes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {abnormal.length > 0 && (
            <div className="text-sm">
              <div className="font-medium mb-1">Abnormal values</div>
              <ul className="grid sm:grid-cols-2 gap-2">
                {abnormal.map((i) => (
                  <li
                    key={i.key}
                    className="rounded-md border p-2 flex items-center justify-between"
                  >
                    <span>
                      {i.key}: {i.value}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${i.status === "high" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}
                    >
                      {i.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-2 pt-1">
            <Button onClick={savePlan} className="flex items-center gap-2">
              <Bell className="w-4 h-4" /> Save Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-brand-blue" /> Saved Plans
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {plans.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No follow‑ups yet. Create one on the left.
            </p>
          ) : (
            <ul className="space-y-2">
              {plans.map((p) => (
                <li key={p.id} className="rounded-md border p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="font-medium">
                        {p.kind === "retest"
                          ? "Re-test labs"
                          : p.kind === "consultation"
                            ? "Doctor consultation"
                            : "Lifestyle check-in"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(p.dateISO).toLocaleString()}{" "}
                        {p.severity ? `• ${p.severity}` : ""}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={p.done ? "outline" : "default"}
                        onClick={() => toggleDone(p.id)}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />{" "}
                        {p.done ? "Mark Undone" : "Mark Done"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => downloadICS(p)}
                        className="flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" /> Calendar
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => remove(p.id)}
                        className="flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" /> Remove
                      </Button>
                    </div>
                  </div>
                  {p.notes && <div className="mt-2 text-sm">{p.notes}</div>}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function LabPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="relative flex-1 pt-24 pb-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-90">
          <DottedMap
            width={900}
            height={540}
            mapSamples={9000}
            dotRadius={0.3}
            className="w-full h-full scale-150 text-gray-900"
          />
        </div>
        <section className="relative max-w-3xl mx-auto px-4 space-y-10 text-center z-10">
          <style>{`
            /* Glassy card style (inspired by Uiverse.io by SteveBloX) */
            .lab-glass {
              box-sizing: border-box;
              background: rgba(255, 255, 255, 0.7);
              border: 1px solid rgba(255, 255, 255, 0.9);
              box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
              backdrop-filter: blur(6px);
              border-radius: 17px;
              transition: all 0.5s;
            }
            .lab-glass:hover {
              border: 1px solid #000;
              transform: scale(1.03);
            }
            .lab-glass:active {
              transform: scale(0.98) rotateZ(1.7deg);
            }
          `}</style>
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center font-surgena">
              Lab Report Analyzer
            </h1>
            {/* From Uiverse.io by andrew-manzyk */}
            <div className="flex justify-center">
              <style>{`
                .loader {
                  --color-one: #ffbf48;
                  --color-two: #be4a1d;
                  --color-three: #ffbf4780;
                  --color-four: #bf4a1d80;
                  --color-five: #ffbf4740;
                  --time-animation: 2s;
                  --size: 1;
                  position: relative;
                  border-radius: 50%;
                  transform: scale(var(--size));
                  box-shadow:
                    0 0 25px 0 var(--color-three),
                    0 20px 50px 0 var(--color-four);
                  animation: colorize calc(var(--time-animation) * 3) ease-in-out infinite;
                }
                .loader::before {
                  content: "";
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100px;
                  height: 100px;
                  border-radius: 50%;
                  border-top: solid 1px var(--color-one);
                  border-bottom: solid 1px var(--color-two);
                  background: linear-gradient(180deg, var(--color-five), var(--color-four));
                  box-shadow:
                    inset 0 10px 10px 0 var(--color-three),
                    inset 0 -10px 10px 0 var(--color-four);
                }
                .loader .box {
                  width: 100px;
                  height: 100px;
                  background: linear-gradient(
                    180deg,
                    var(--color-one) 30%,
                    var(--color-two) 70%
                  );
                  mask: url(#clipping);
                  -webkit-mask: url(#clipping);
                }
                .loader svg {
                  position: absolute;
                }
                .loader svg #clipping {
                  filter: contrast(15);
                  animation: roundness calc(var(--time-animation) / 2) linear infinite;
                }
                .loader svg #clipping polygon {
                  filter: blur(7px);
                }
                .loader svg #clipping polygon:nth-child(1) {
                  transform-origin: 75% 25%;
                  transform: rotate(90deg);
                }
                .loader svg #clipping polygon:nth-child(2) {
                  transform-origin: 50% 50%;
                  animation: rotation var(--time-animation) linear infinite reverse;
                }
                .loader svg #clipping polygon:nth-child(3) {
                  transform-origin: 50% 60%;
                  animation: rotation var(--time-animation) linear infinite;
                  animation-delay: calc(var(--time-animation) / -3);
                }
                .loader svg #clipping polygon:nth-child(4) {
                  transform-origin: 40% 40%;
                  animation: rotation var(--time-animation) linear infinite reverse;
                }
                .loader svg #clipping polygon:nth-child(5) {
                  transform-origin: 40% 40%;
                  animation: rotation var(--time-animation) linear infinite reverse;
                  animation-delay: calc(var(--time-animation) / -2);
                }
                .loader svg #clipping polygon:nth-child(6) {
                  transform-origin: 60% 40%;
                  animation: rotation var(--time-animation) linear infinite;
                }
                .loader svg #clipping polygon:nth-child(7) {
                  transform-origin: 60% 40%;
                  animation: rotation var(--time-animation) linear infinite;
                  animation-delay: calc(var(--time-animation) / -1.5);
                }
                @keyframes rotation {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
                @keyframes roundness {
                  0% { filter: contrast(15); }
                  20% { filter: contrast(3); }
                  40% { filter: contrast(3); }
                  60% { filter: contrast(15); }
                  100% { filter: contrast(15); }
                }
                @keyframes colorize {
                  0% { filter: hue-rotate(0deg); }
                  20% { filter: hue-rotate(-30deg); }
                  40% { filter: hue-rotate(-60deg); }
                  60% { filter: hue-rotate(-90deg); }
                  80% { filter: hue-rotate(-45deg); }
                  100% { filter: hue-rotate(0deg); }
                }
              `}</style>
              <div className="loader">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <defs>
                    <mask id="clipping">
                      <polygon points="0,0 100,0 100,100 0,100" fill="black"></polygon>
                      <polygon points="25,25 75,25 50,75" fill="white"></polygon>
                      <polygon points="50,25 75,75 25,75" fill="white"></polygon>
                      <polygon points="35,35 65,35 50,65" fill="white"></polygon>
                      <polygon points="35,35 65,35 50,65" fill="white"></polygon>
                      <polygon points="35,35 65,35 50,65" fill="white"></polygon>
                      <polygon points="35,35 65,35 50,65" fill="white"></polygon>
                    </mask>
                  </defs>
                </svg>
                <div className="box"></div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base">
              How it works: upload your lab report (PNG/JPEG/PDF/DOC/DOCX) → Donut (Hugging Face DocVQA, free)
              reads the text and tables → we extract key values, compare against typical adult ranges, and return
              a concise summary with suggested next steps.
            </p>
          </div>

          <Card className="lab-glass">
            <CardHeader className="text-center">
              <CardTitle className="text-lg font-semibold">Upload & Analyze</CardTitle>
            </CardHeader>
            <CardContent>
              <LabAnalyzer />
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
