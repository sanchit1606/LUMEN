import React from "react";
import Navbar from "@/components/lumen/Navbar";
import Footer from "@/components/lumen/Footer";
import Particles from "@/components/ui/particles";
import { Link } from "react-router-dom";
import PyramidLoader from "@/components/lumen/PyramidLoader";

export default function PearlPage() {
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
            <div className="card overflow-hidden">
              <div className="relative p-8 sm:p-12">
                <div className="max-w-3xl">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                    <span className="block font-surgena font-extrabold">
                      PEARL
                    </span>
                  </h1>
                  <p className="mt-2 text-sm sm:text-base font-medium text-brand-blue">
                    Personalized Estimated Anatomic Reconstruction
                  </p>
                  <div className="mt-6 flex justify-center">
                    <PyramidLoader />
                  </div>
                  <p className="mt-4 text-lg text-muted-foreground">
                    3D CT Low‑Dose Reconstruction & Viewer
                  </p>

                  <div className="mt-6 inline-flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 text-amber-700 px-3 py-1 text-xs font-semibold shadow-sm">
                      Under Development
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-semibold shadow-sm">
                      Student Innovation
                    </span>
                  </div>

                  <p className="mt-6 text-muted-foreground max-w-prose">
                    We’re actively building a safe, accessible CT reconstruction
                    workflow designed for lower radiation doses. The viewer
                    prototype will land here with interactive volume rendering,
                    slice navigation, and real‑time denoising.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      to="/"
                      className="px-6 py-3 rounded-lg border border-input bg-background font-semibold hover:bg-accent"
                    >
                      Back to Home
                    </Link>
                  </div>
                </div>

                <div className="pointer-events-none absolute -right-28 -bottom-28 h-[460px] w-[460px] gradient-orb rounded-full blur-2xl opacity-50" />
              </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="card p-6">
                <h2 className="text-xl font-semibold">What’s coming</h2>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc pl-5">
                  <li>Low‑dose reconstruction with deep priors</li>
                  <li>Volume and MPR viewing, window/level controls</li>
                  <li>Noise/artifact reduction and quality metrics</li>
                </ul>
              </div>
              <div className="card p-6">
                <h2 className="text-xl font-semibold">Safety & Ethics</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  PEARL is for educational and research purposes while in
                  development. It is not a medical device and should not be used
                  for diagnosis or treatment.
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
