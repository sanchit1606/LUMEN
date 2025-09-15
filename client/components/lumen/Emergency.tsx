import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import {
  Flame,
  Zap,
  Waves,
  LifeBuoy,
  Syringe,
  PhoneCall,
  Shield,
  HeartPulse,
} from "lucide-react";

const slides = [
  {
    title: "Snakebite",
    steps: [
      "Move away from the snake",
      "Keep limb immobilized",
      "Reach hospital quickly",
    ],
    videoUrl: "https://www.youtube.com/embed/ryJo_A-rJ6Y",
  },
  {
    title: "CPR",
    steps: [
      "Call for help",
      "Check responsiveness",
      "Start chest compressions",
    ],
    videoUrl: "https://www.youtube.com/embed/VSKhM-ev808",
  },
  {
    title: "Fire Burns",
    steps: [
      "Cool burn with water",
      "Cover with clean cloth",
      "Do not pop blisters",
    ],
    videoUrl: "https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb",
  },
  {
    title: "Electric Shock",
    steps: [
      "Switch off power",
      "Do not touch victim directly",
      "Call emergency",
    ],
    videoUrl: "https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb",
  },
];

export default function Emergency() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start" });
  const interval = useRef<number | null>(null);
  const [playing, setPlaying] = useState(true);

  const play = useCallback(() => {
    stop();
    interval.current = window.setInterval(() => embla?.scrollNext(), 3500);
  }, [embla]);

  const stop = useCallback(() => {
    if (interval.current) window.clearInterval(interval.current);
    interval.current = null;
  }, []);

  useEffect(() => {
    if (playing) play();
    else stop();
    return stop;
  }, [playing, play, stop]);

  const speak = (text: string) => {
    try {
      new SpeechSynthesisUtterance();
    } catch {
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-IN";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  return (
    <section id="emergency" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Emergency First Aid
            </h2>
          </div>
        </div>

        <div className="mt-6 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {slides.map((s) => {
              const iconsMap: Record<string, React.ElementType[]> = {
                Snakebite: [Syringe, Shield, HeartPulse],
                CPR: [HeartPulse, LifeBuoy, PhoneCall],
                "Fire Burns": [Flame, HeartPulse, Shield],
                "Electric Shock": [Zap, Shield, PhoneCall],
              };
              const icons = iconsMap[s.title] || [
                HeartPulse,
                Shield,
                PhoneCall,
              ];
              return (
                <div
                  key={s.title}
                  className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%]"
                >
                  <div className="card p-6 h-full flex flex-col">
                    <h3 className="font-semibold">{s.title}</h3>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-xs flex-1">
                      {s.steps.map((step, i) => {
                        const Icon = icons[i % icons.length];
                        return (
                          <div
                            key={i}
                            className="rounded-xl bg-secondary p-3 flex flex-col h-full"
                          >
                            <div className="h-16 rounded-md bg-gradient-to-br from-brand-blue/20 to-brand-teal/20 grid place-items-center">
                              <Icon className="text-brand-blue" size={22} />
                            </div>
                            <p className="mt-2 text-xs leading-tight flex-1 overflow-hidden">
                              {i + 1}. {step}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-4 flex items-center gap-2 flex-nowrap">
                      <InteractiveHoverButton
                        onClick={() =>
                          speak(`${s.title}. ${s.steps.join(". ")}`)
                        }
                        className="min-w-[120px] px-3 py-1.5 text-sm"
                      >
                        Play Audio
                      </InteractiveHoverButton>
                      <HeroVideoDialog
                        videoSrc={s.videoUrl}
                        trigger={
                          <InteractiveHoverButton className="min-w-[120px] px-3 py-1.5 text-sm">
                            Play Video
                          </InteractiveHoverButton>
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
