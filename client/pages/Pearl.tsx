import React, { useState } from "react";
import Navbar from "@/components/lumen/Navbar";
import Footer from "@/components/lumen/Footer";
import Particles from "@/components/ui/particles";
import { Link } from "react-router-dom";
import PyramidLoader from "@/components/lumen/PyramidLoader";

export default function PearlPage() {
  const [inputType, setInputType] = useState<"chest" | "head" | "foot">("chest");
  const [outputType, setOutputType] = useState<"static" | "dynamic">("static");
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  const [resultUrl, setResultUrl] = useState<string>("");

  const startReconstruction = async () => {
    setStatus("running");
    setMessage("Starting reconstruction...");
    setResultUrl("");
    try {
      const res = await fetch("/api/pearl/reconstruct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: inputType,
          output: outputType === "static" ? "png" : "gif",
        }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      setResultUrl(data.outputUrl || "");
      setMessage("Reconstruction completed.");
      setStatus("success");
    } catch (err) {
      console.error(err);
      setMessage("Reconstruction failed. Please ensure the PEARL service is running.");
      setStatus("error");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="relative flex-1">
        <div className="absolute inset-0">
          <Particles className="absolute inset-0 opacity-80" />
          <div className="absolute inset-0 wave-bg" />
        </div>

        <section className="relative pt-28 pb-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="card overflow-hidden pearl-glass">
              <div className="relative p-8 sm:p-12">
                <div className="max-w-3xl mx-auto text-center">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-center">
                    <span className="block font-surgena font-extrabold">
                      PEARL
                    </span>
                  </h1>
                  <p className="mt-2 text-sm sm:text-base font-medium text-brand-blue text-center">
                    Personalized Estimated Anatomic Reconstruction
                  </p>
                  <div className="mt-6 flex justify-center">
                    <PyramidLoader />
                  </div>
                  <p className="mt-4 text-lg text-muted-foreground text-center">
                    3D CT Low‑Dose Reconstruction & Viewer
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 text-amber-700 px-3 py-1 text-xs font-semibold shadow-sm">
                      Under Development
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-semibold shadow-sm">
                      Student Innovation
                    </span>
                  </div>

                  <p className="mt-6 text-muted-foreground max-w-prose mx-auto text-center">
                    We’re actively building a safe, accessible CT reconstruction
                    workflow designed for lower radiation doses. The viewer
                    prototype will land here with interactive volume rendering,
                    slice navigation, and real‑time denoising.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3 justify-center">
                    <Link to="/" className="bubble-btn">
                      Back to Home
                    </Link>
                    <a href="#pearl-test" className="bubble-btn">
                      TEST PEAL
                    </a>
                  </div>
                </div>

                <div className="pointer-events-none absolute -right-28 -bottom-28 h-[460px] w-[460px] gradient-orb rounded-full blur-2xl opacity-50" />
              </div>
            </div>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <style>{`
            /* Glassy card style for PEARL cards */
            .pearl-glass {
              box-sizing: border-box;
              background: rgba(255, 255, 255, 0.7);
              border: 1px solid rgba(255, 255, 255, 0.9);
              box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
              backdrop-filter: blur(6px);
              border-radius: 17px;
              transition: all 0.5s;
            }
            .pearl-glass:hover {
              border: 1px solid #000;
              transform: scale(1.02);
            }
            .pearl-glass:active {
              transform: scale(0.98) rotateZ(1deg);
            }
            /* From Uiverse.io by aguerquin – discord-style flip button */
            :root {
              --discord-box: 60px;           /* icon square */
              --discord-cube-width: 220px;   /* text block width */
              --discord-cube-height: 47px;   /* text block height */
            }
            .button-icon {
              display: inline-flex;
              align-items: center;
              gap: 0;
              border: 3px #fff solid;
              width: fit-content;
              height: fit-content;
              cursor: pointer;
              text-decoration: none;
              transform: translateZ(0);
              perspective: 600px;
              padding: 2px;
            }
            .button-icon .icon {
              background-color: #fff;
              width: var(--discord-box);
              height: var(--discord-box);
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .button-icon .icon svg {
              width: 28px;
              height: 28px;
              display: block;
            }
            .button-icon .cube {
              position: relative;
              transition: all 0.4s;
              transform-style: preserve-3d;
              width: var(--discord-cube-width);
              height: var(--discord-cube-height);
            }
            .button-icon:hover {
              border-color: #ff98a2;
            }
            .button-icon:hover .cube {
              transform: rotateX(90deg);
            }
            .button-icon .side {
              position: absolute;
              height: var(--discord-cube-height);
              width: var(--discord-cube-width);
              display: flex;
              font-size: 0.75em;
              justify-content: center;
              align-items: center;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              font-weight: bold;
              backface-visibility: hidden;
            }
            .button-icon .top {
              background: #ff98a2;
              color: #fff;
              transform: rotateX(-90deg) translate3d(0, calc(var(--discord-cube-height)/2 - 3px), 2em);
            }
            .button-icon .front {
              background: #222229;
              color: #fff;
              transform: translate3d(0, 0, 1em);
            }
            /* From Uiverse.io by zjssun – bubble buttons */
            .bubble-btn {
              position: relative;
              padding: 10px 22px;
              border-radius: 6px;
              border: none;
              color: #fff;
              cursor: pointer;
              background-color: #7d2ae8;
              transition: all 0.2s ease;
              text-decoration: none;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              font-weight: 600;
            }
            .bubble-btn:active {
              transform: scale(0.96);
            }
            .bubble-btn:before,
            .bubble-btn:after {
              position: absolute;
              content: "";
              width: 150%;
              left: 50%;
              height: 100%;
              transform: translateX(-50%);
              z-index: -1000;
              background-repeat: no-repeat;
            }
            .bubble-btn:hover:before {
              top: -70%;
              background-image: radial-gradient(circle, #7d2ae8 20%, transparent 20%),
                radial-gradient(circle, transparent 20%, #7d2ae8 20%, transparent 30%),
                radial-gradient(circle, #7d2ae8 20%, transparent 20%),
                radial-gradient(circle, #7d2ae8 20%, transparent 20%),
                radial-gradient(circle, transparent 10%, #7d2ae8 15%, transparent 20%),
                radial-gradient(circle, #7d2ae8 20%, transparent 20%),
                radial-gradient(circle, #7d2ae8 20%, transparent 20%),
                radial-gradient(circle, #7d2ae8 20%, transparent 20%),
                radial-gradient(circle, #7d2ae8 20%, transparent 20%);
              background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%,
                10% 10%, 18% 18%;
              background-position: 50% 120%;
              animation: greentopBubbles 0.6s ease;
            }
            @keyframes greentopBubbles {
              0% {
                background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%,
                  40% 90%, 55% 90%, 70% 90%;
              }
              50% {
                background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%,
                  50% 50%, 65% 20%, 90% 30%;
              }
              100% {
                background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%,
                  50% 40%, 65% 10%, 90% 20%;
                background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
              }
            }
            .bubble-btn:hover::after {
              bottom: -70%;
              background-image: radial-gradient(circle, #7d2ae8 20%, transparent 20%),
                radial-gradient(circle, #7d2ae8 20%, transparent 20%),
                radial-gradient(circle, transparent 10%, #7d2ae8 15%, transparent 20%),
                radial-gradient(circle, #7d2ae8 20%, transparent 20%),
                radial-gradient(circle, #7d2ae8 20%, transparent 20%),
                radial-gradient(circle, #7d2ae8 20%, transparent 20%),
                radial-gradient(circle, #7d2ae8 20%, transparent 20%);
              background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 20% 20%, 18% 18%;
              background-position: 50% 0%;
              animation: greenbottomBubbles 0.6s ease;
            }
            @keyframes greenbottomBubbles {
              0% {
                background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%,
                  70% -10%, 70% 0%;
              }
              50% {
                background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%,
                  105% 0%;
              }
              100% {
                background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%,
                  110% 10%;
                background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
              }
            }
            /* From Uiverse.io by Gaurav-WebDev – CTA button */
            .cta-btn {
              height: 50px;
              width: 260px;
              position: relative;
              background-color: transparent;
              cursor: pointer;
              border: 2px solid #252525;
              overflow: hidden;
              border-radius: 30px;
              color: #333;
              transition: all 0.5s ease-in-out;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              text-decoration: none;
            }
            .cta-btn .btn-txt {
              z-index: 1;
              font-weight: 800;
              letter-spacing: 2px;
              font-size: 0.9rem;
              text-transform: uppercase;
            }
            .cta-btn.type1::after {
              content: "";
              position: absolute;
              left: 0;
              top: 0;
              transition: all 0.5s ease-in-out;
              background-color: #333;
              border-radius: 30px;
              visibility: hidden;
              height: 10px;
              width: 10px;
              z-index: -1;
            }
            .cta-btn:hover {
              box-shadow: 1px 1px 200px #252525;
              color: #fff;
              border: none;
            }
            .cta-btn.type1:hover::after {
              visibility: visible;
              transform: scale(100) translateX(2px);
            }
          `}</style>
          <div className="card p-6 md:col-span-2 pearl-glass">
            <h2 className="text-xl font-extrabold text-center font-surgena">THE PROBLEM</h2>
            <div className="mt-4">
              <video
                className="w-full max-w-2xl mx-auto h-auto max-h-[420px] rounded-lg border border-border bg-black object-contain"
                controls
                controlsList="nodownload"
                playsInline
                preload="metadata"
              >
                <source src="/peart-ct-problem-statement-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div className="card p-6 md:col-span-2 pearl-glass">
            <h2 className="text-xl font-extrabold text-center font-surgena">THE SOLUTION</h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground text-center">
              CT-Former (PEARL) reconstructs a full 3D CT volume from sparse or even single X-ray views,
              combining a NeRF-style implicit radiodensity field with transformer reasoning along rays and
              masked local-global sampling to cut streaks and preserve fine anatomy.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>Implicit radiodensity field (NeRF) models the continuous 3D volume.</li>
              <li>Line-segment transformer shares context along rays for sharper, coherent reconstructions.</li>
              <li>Masked local-global ray sampling focuses compute on informative regions while keeping context.</li>
              <li>Delivers cleaner volumes with fewer artifacts at low view counts.</li>
                </ul>
          </div>
          {/* PEARL test harness */}
          <div className="card p-6 md:col-span-2 space-y-8 pearl-glass" id="pearl-test">
            <h2 className="text-xl font-extrabold text-center font-surgena">TEST PEARL (CT-Former)</h2>
            <style>{`
              /* From Uiverse.io by AqFox – 3D spinner */
              .spinner {
                width: 44px;
                height: 44px;
                animation: spinner-y0fdc1 2s infinite ease;
                transform-style: preserve-3d;
                margin: 0 auto;
              }
              .spinner > div {
                background-color: rgba(0,77,255,0.2);
                height: 100%;
                position: absolute;
                width: 100%;
                border: 2px solid #004dff;
              }
              .spinner div:nth-of-type(1) {
                transform: translateZ(-22px) rotateY(180deg);
              }
              .spinner div:nth-of-type(2) {
                transform: rotateY(-270deg) translateX(50%);
                transform-origin: top right;
              }
              .spinner div:nth-of-type(3) {
                transform: rotateY(270deg) translateX(-50%);
                transform-origin: center left;
              }
              .spinner div:nth-of-type(4) {
                transform: rotateX(90deg) translateY(-50%);
                transform-origin: top center;
              }
              .spinner div:nth-of-type(5) {
                transform: rotateX(-90deg) translateY(50%);
                transform-origin: bottom center;
              }
              .spinner div:nth-of-type(6) {
                transform: translateZ(22px);
              }
              @keyframes spinner-y0fdc1 {
                0% { transform: rotate(45deg) rotateX(-25deg) rotateY(25deg); }
                50% { transform: rotate(45deg) rotateX(-385deg) rotateY(25deg); }
                100% { transform: rotate(45deg) rotateX(-385deg) rotateY(385deg); }
              }
            `}</style>
            <div className="spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Choose input anatomy and output type, then start reconstruction. Progress is shown in real time.
              Static PNG reconstruction usually takes ~30s on a laptop; speed may vary with your computational power.
            </p>
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="space-y-4">
                <label className="text-sm font-medium text-foreground">Input</label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={inputType}
                  onChange={(e) => setInputType(e.target.value as "chest" | "head" | "foot")}
                >
                  <option value="chest">Chest</option>
                  <option value="head">Head</option>
                  <option value="foot">Foot</option>
                </select>
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-foreground">Output type</label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={outputType}
                  onChange={(e) => setOutputType(e.target.value as "static" | "dynamic")}
                >
                  <option value="static">Static PNG</option>
                  <option value="dynamic">Dynamic GIF</option>
                </select>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={startReconstruction}
                disabled={status === "running"}
                className="cta-btn type1"
              >
                <span className="btn-txt">
                  {status === "running" ? "Reconstructing..." : "Start reconstruction"}
                </span>
              </button>
            </div>

            {status === "running" && (
              <div className="space-y-2">
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-1/3 animate-pulse bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Running PEARL scripts (3D visualization). This may take ~30s; speed depends on your hardware.
                </p>
              </div>
            )}

            {message && (
              <p
                className={`text-sm ${
                  status === "error" ? "text-red-600" : status === "success" ? "text-green-600" : "text-muted-foreground"
                }`}
              >
                {message}
              </p>
            )}

            {status === "success" && resultUrl && (
              <div className="space-y-2">
                <div className="rounded-md border border-dashed border-border p-3 text-sm text-muted-foreground">
                  Output ready: <span className="font-medium text-foreground">{resultUrl}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-accent"
                    href={resultUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open output
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-2 flex flex-col items-center gap-3 mt-4">
            <a
              className="button-icon"
              href="https://github.com/sanchit1606/major-project.git"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit GitHub repository for CT reconstruction details"
            >
              <span className="icon">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.088 3.292 9.395 7.863 10.915.575.105.787-.25.787-.556 0-.274-.01-1.183-.015-2.147-3.198.695-3.874-1.35-3.874-1.35-.523-1.328-1.277-1.682-1.277-1.682-1.044-.714.08-.699.08-.699 1.154.081 1.762 1.185 1.762 1.185 1.027 1.76 2.695 1.252 3.35.958.104-.744.402-1.252.73-1.54-2.553-.291-5.236-1.277-5.236-5.683 0-1.255.45-2.28 1.185-3.082-.12-.29-.513-1.462.113-3.05 0 0 .965-.309 3.163 1.178A10.99 10.99 0 0 1 12 6.82c.977.004 1.962.132 2.88.387 2.196-1.487 3.16-1.178 3.16-1.178.627 1.588.235 2.76.116 3.05.737.802 1.183 1.827 1.183 3.082 0 4.418-2.687 5.388-5.248 5.673.409.351.774 1.047.774 2.11 0 1.523-.014 2.75-.014 3.125 0 .309.208.668.794.555C20.71 21.39 24 17.086 24 12 24 5.648 18.352.5 12 .5Z" />
                </svg>
              </span>
              <div className="cube">
                <span className="side front">visit repo</span>
                <span className="side top">open github</span>
              </div>
            </a>
            <p className="text-sm text-muted-foreground text-center">
              for any technical details regarding working of CT reconstruction, please visit my GitHub repo
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
