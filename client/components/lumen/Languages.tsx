import React from "react";

const langs = ["हिन्दी", "English", "தமிழ்", "বাংলা", "मराठी", "ગુજરાતી", "ಕನ್ನಡ", "മലയാളം", "ଓଡ଼ିଆ", "ਪੰਜਾਬੀ", "తెలుగు", "اردو"];

export default function Languages() {
  return (
    <section id="languages" className="py-20 bg-gradient-to-b from-background to-blue-50/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Built for India's Languages
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Nawsome loader */}
          <div className="flex items-center justify-center">
            <svg className="pl pl-lg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <g fill="none" strokeLinecap="round">
                <circle className="pl__ring pl__ring--a" cx="80" cy="80" r="60" pathLength="660" strokeWidth="20" />
                <circle className="pl__ring pl__ring--b" cx="80" cy="80" r="35" pathLength="220" strokeWidth="20" />
                <circle className="pl__ring pl__ring--c" cx="80" cy="80" r="50" pathLength="440" strokeWidth="20" />
                <circle className="pl__ring pl__ring--d" cx="80" cy="80" r="50" pathLength="440" strokeWidth="20" />
              </g>
            </svg>
          </div>

          {/* Right: Language Buttons */}
          <div className="flex flex-col max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {langs.map((lang, index) => (
                <button
                  key={lang}
                  className="px-6 py-3 rounded-full bg-white/70 backdrop-blur-sm border border-blue-200/50 hover:bg-white hover:shadow-lg hover:border-blue-300 hover:scale-105 transition-all duration-300 text-sm font-medium"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {lang}
                </button>
              ))}
            </div>
            <div className="text-center lg:text-left">
              <p className="text-lg text-muted-foreground">
                LUMEN understands and responds in <span className="font-semibold text-blue-600">12+ Indian languages</span>, making healthcare accessible to everyone across the nation.
              </p>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        /* From Uiverse.io by Nawsome */ 
        .pl {
          width: 6em;
          height: 6em;
        }

        .pl.pl-lg {
          width: 9em;
          height: 9em;
        }

        .pl__ring {
          animation: ringA 2s linear infinite;
        }

        .pl__ring--a {
          stroke: #f42f25;
        }

        .pl__ring--b {
          animation-name: ringB;
          stroke: #f49725;
        }

        .pl__ring--c {
          animation-name: ringC;
          stroke: #255ff4;
        }

        .pl__ring--d {
          animation-name: ringD;
          stroke: #f42582;
        }

        /* Animations */
        @keyframes ringA {
          from, 4% {
            stroke-dasharray: 0 660;
            stroke-width: 20;
            stroke-dashoffset: -330;
          }

          12% {
            stroke-dasharray: 60 600;
            stroke-width: 30;
            stroke-dashoffset: -335;
          }

          32% {
            stroke-dasharray: 60 600;
            stroke-width: 30;
            stroke-dashoffset: -595;
          }

          40%, 54% {
            stroke-dasharray: 0 660;
            stroke-width: 20;
            stroke-dashoffset: -660;
          }

          62% {
            stroke-dasharray: 60 600;
            stroke-width: 30;
            stroke-dashoffset: -665;
          }

          82% {
            stroke-dasharray: 60 600;
            stroke-width: 30;
            stroke-dashoffset: -925;
          }

          90%, to {
            stroke-dasharray: 0 660;
            stroke-width: 20;
            stroke-dashoffset: -990;
          }
        }

        @keyframes ringB {
          from, 12% {
            stroke-dasharray: 0 220;
            stroke-width: 20;
            stroke-dashoffset: -110;
          }

          20% {
            stroke-dasharray: 20 200;
            stroke-width: 30;
            stroke-dashoffset: -115;
          }

          40% {
            stroke-dasharray: 20 200;
            stroke-width: 30;
            stroke-dashoffset: -195;
          }

          48%, 62% {
            stroke-dasharray: 0 220;
            stroke-width: 20;
            stroke-dashoffset: -220;
          }

          70% {
            stroke-dasharray: 20 200;
            stroke-width: 30;
            stroke-dashoffset: -225;
          }

          90% {
            stroke-dasharray: 20 200;
            stroke-width: 30;
            stroke-dashoffset: -305;
          }

          98%, to {
            stroke-dasharray: 0 220;
            stroke-width: 20;
            stroke-dashoffset: -330;
          }
        }

        @keyframes ringC {
          from {
            stroke-dasharray: 0 440;
            stroke-width: 20;
            stroke-dashoffset: 0;
          }

          8% {
            stroke-dasharray: 40 400;
            stroke-width: 30;
            stroke-dashoffset: -5;
          }

          28% {
            stroke-dasharray: 40 400;
            stroke-width: 30;
            stroke-dashoffset: -175;
          }

          36%, 58% {
            stroke-dasharray: 0 440;
            stroke-width: 20;
            stroke-dashoffset: -220;
          }

          66% {
            stroke-dasharray: 40 400;
            stroke-width: 30;
            stroke-dashoffset: -225;
          }

          86% {
            stroke-dasharray: 40 400;
            stroke-width: 30;
            stroke-dashoffset: -395;
          }

          94%, to {
            stroke-dasharray: 0 440;
            stroke-width: 20;
            stroke-dashoffset: -440;
          }
        }

        @keyframes ringD {
          from, 8% {
            stroke-dasharray: 0 440;
            stroke-width: 20;
            stroke-dashoffset: 0;
          }

          16% {
            stroke-dasharray: 40 400;
            stroke-width: 30;
            stroke-dashoffset: -5;
          }

          36% {
            stroke-dasharray: 40 400;
            stroke-width: 30;
            stroke-dashoffset: -175;
          }

          44%, 50% {
            stroke-dasharray: 0 440;
            stroke-width: 20;
            stroke-dashoffset: -220;
          }

          58% {
            stroke-dasharray: 40 400;
            stroke-width: 30;
            stroke-dashoffset: -225;
          }

          78% {
            stroke-dasharray: 40 400;
            stroke-width: 30;
            stroke-dashoffset: -395;
          }

          86%, to {
            stroke-dasharray: 0 440;
            stroke-width: 20;
            stroke-dashoffset: -440;
          }
        }
      `}</style>
    </section>
  );
}
