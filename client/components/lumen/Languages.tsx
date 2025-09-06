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
          <p className="text-muted-foreground">
            Globe spins and language toggles glow on hover.
          </p>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Globe Card */}
          <div className="flex justify-center">
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 overflow-visible">
              {/* Stars Container */}
              <div className="relative w-[300px] h-[300px] flex items-center justify-center overflow-visible">
                {/* Stars */}
                <div className="absolute inset-0 z-10">
                  <div className="curved-corner-star" id="star-1">
                    <div id="curved-corner-topleft"></div>
                    <div id="curved-corner-topright"></div>
                    <div id="curved-corner-bottomleft"></div>
                    <div id="curved-corner-bottomright"></div>
                  </div>
                  <div className="curved-corner-star" id="star-2">
                    <div id="curved-corner-topleft"></div>
                    <div id="curved-corner-topright"></div>
                    <div id="curved-corner-bottomleft"></div>
                    <div id="curved-corner-bottomright"></div>
                  </div>
                  <div className="curved-corner-star" id="star-3">
                    <div id="curved-corner-topleft"></div>
                    <div id="curved-corner-topright"></div>
                    <div id="curved-corner-bottomleft"></div>
                    <div id="curved-corner-bottomright"></div>
                  </div>
                  <div className="curved-corner-star" id="star-4">
                    <div id="curved-corner-topleft"></div>
                    <div id="curved-corner-topright"></div>
                    <div id="curved-corner-bottomleft"></div>
                    <div id="curved-corner-bottomright"></div>
                  </div>
                  <div className="curved-corner-star" id="star-5">
                    <div id="curved-corner-topleft"></div>
                    <div id="curved-corner-topright"></div>
                    <div id="curved-corner-bottomleft"></div>
                    <div id="curved-corner-bottomright"></div>
                  </div>
                  <div className="curved-corner-star" id="star-6">
                    <div id="curved-corner-topleft"></div>
                    <div id="curved-corner-topright"></div>
                    <div id="curved-corner-bottomleft"></div>
                    <div id="curved-corner-bottomright"></div>
                  </div>
                  <div className="curved-corner-star" id="star-7">
                    <div id="curved-corner-topleft"></div>
                    <div id="curved-corner-topright"></div>
                    <div id="curved-corner-bottomleft"></div>
                    <div id="curved-corner-bottomright"></div>
                  </div>
                </div>
                
                {/* Spinning Earth */}
                <div className="section-banner relative z-20"></div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Language Buttons */}
          <div className="flex flex-col">
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
        .section-banner {
          height: 250px;
          width: 250px;
          position: relative;
          z-index: 50;
          transition: left 0.3s linear;
          background: url("data:image/jpeg;base64,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");
          background-size: cover;
          background-position: left;
          bottom: 0px;
          border-radius: 50%;
          animation: earthRotate 30s linear 0s infinite;
          box-shadow: 0px 0 20px rgba(255, 255, 255, 0.2), -5px 0px 8px #c3f4ff inset,
            15px 2px 25px #000 inset, -24px -2px 34px #c3f4ff99 inset,
            250px 0px 44px #00000066 inset, 150px 0px 38px #000000aa inset;
        }
        
        @keyframes earthRotate {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 400px 0;
          }
        }

        .curved-corner-star {
          display: flex;
          position: relative;
        }

        #curved-corner-bottomleft,
        #curved-corner-bottomright,
        #curved-corner-topleft,
        #curved-corner-topright {
          width: 4px;
          height: 5px;
          overflow: hidden;
          position: relative;
        }

        #curved-corner-bottomleft:before,
        #curved-corner-bottomright:before,
        #curved-corner-topleft:before,
        #curved-corner-topright:before {
          content: "";
          display: block;
          width: 200%;
          height: 200%;
          position: absolute;
          border-radius: 50%;
        }

        #curved-corner-bottomleft:before {
          bottom: 0;
          left: 0;
          box-shadow: -5px 5px 0 0 white;
        }

        #curved-corner-bottomright:before {
          bottom: 0;
          right: 0;
          box-shadow: 5px 5px 0 0 white;
        }

        #curved-corner-topleft:before {
          top: 0;
          left: 0;
          box-shadow: -5px -5px 0 0 white;
        }

        #curved-corner-topright:before {
          top: 0;
          right: 0;
          box-shadow: 5px -5px 0 0 white;
        }

        @keyframes twinkling {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 1;
          }
        }

        #star-1 {
          position: absolute;
          left: -20px;
          animation: twinkling 3s infinite;
        }

        #star-2 {
          position: absolute;
          left: -40px;
          top: 30px;
          animation: twinkling 2s infinite;
        }
        
        #star-3 {
          position: absolute;
          left: 350px;
          top: 90px;
          animation: twinkling 4s infinite;
        }
        
        #star-4 {
          position: absolute;
          left: 200px;
          top: 290px;
          animation: twinkling 3s infinite;
        }
        
        #star-5 {
          position: absolute;
          left: 50px;
          top: 270px;
          animation: twinkling 1.5s infinite;
        }

        #star-6 {
          position: absolute;
          left: 250px;
          top: -50px;
          animation: twinkling 4s infinite;
        }
        
        #star-7 {
          position: absolute;
          left: 290px;
          top: 60px;
          animation: twinkling 2s infinite;
        }
      `}</style>
    </section>
  );
}
