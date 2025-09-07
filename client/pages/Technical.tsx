import React from "react";
import Navbar from "@/components/lumen/Navbar";
import Footer from "@/components/lumen/Footer";
import TechnicalContent from "@/components/lumen/Technical";
// Removed FlickeringGrid for default page background

export default function TechnicalPage() {
  return (
    <div className="relative">
      <Navbar />
      <main className="pt-24 relative z-10">
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-center video-text">
              Technical Documentation
            </h1>
            <p className="mt-3 text-center text-muted-foreground max-w-2xl mx-auto">
              Deep dive into architecture, workflows, and implementation notes
              for LUMEN.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="spinner" />
            </div>
            <style>
              {`/* From Uiverse.io by satyamchaudharydev */
              .spinner {
               --size: 30px;
               --first-block-clr: #005bba;
               --second-block-clr: #fed500;
               --clr: #111;
               width: 100px;
               height: 100px;
               position: relative;
              }

              .spinner::after,.spinner::before {
               box-sizing: border-box;
               position: absolute;
               content: "";
               width: var(--size);
               height: var(--size);
               top: 50%;
               animation: up 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
               left: 50%;
               background: var(--first-block-clr);
              }

              .spinner::after {
               background: var(--second-block-clr);
               top: calc(50% - var(--size));
               left: calc(50% - var(--size));
               animation: down 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
              }

              @keyframes down {
               0%, 100% {
                transform: none;
               }

               25% {
                transform: translateX(100%);
               }

               50% {
                transform: translateX(100%) translateY(100%);
               }

               75% {
                transform: translateY(100%);
               }
              }

              @keyframes up {
               0%, 100% {
                transform: none;
               }

               25% {
                transform: translateX(-100%);
               }

               50% {
                transform: translateX(-100%) translateY(-100%);
               }

               75% {
                transform: translateY(-100%);
               }
              }`}
            </style>
          </div>
        </section>
        <TechnicalContent />
      </main>
      <Footer />
    </div>
  );
}
