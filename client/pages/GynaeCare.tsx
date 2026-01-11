import React, { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/lumen/Navbar";
import Footer from "@/components/lumen/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);
import {
  Heart,
  Shield,
  Stethoscope,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Baby,
  Activity,
  Droplet,
  Brain,
  Sparkles,
  Award,
  Users,
  FileText,
  Phone,
  ExternalLink,
  TrendingUp,
} from "lucide-react";

export default function GynaeCarePage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const fluidSectionRef = useRef<HTMLElement>(null);
  const fluidListRef = useRef<HTMLUListElement>(null);

  const healthTopics = [
    "understand.",
    "educate.",
    "nourish.",
    "screen.",
    "protect.",
    "prevent.",
    "care.",
    "thrive.",
    "empower.",
    "live well.",
  ];

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false,
      lerp: 0.08,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // GSAP Fluid Scroll Animation
    if (fluidListRef.current && fluidSectionRef.current) {
      const items = gsap.utils.toArray<HTMLLIElement>(fluidListRef.current.querySelectorAll("li"));
      
      // Set initial opacity
      gsap.set(items, { opacity: (i) => (i === 0 ? 1 : 0.2) });

      // Create dimmer animation with brightness effect
      const dimmer = gsap
        .timeline()
        .to(items.slice(1), {
          opacity: 1,
          filter: "brightness(1.2)",
          stagger: 0.5,
        })
        .to(
          items.slice(0, items.length - 1),
          {
            opacity: 0.2,
            filter: "brightness(1)",
            stagger: 0.5,
          },
          0
        );

      ScrollTrigger.create({
        trigger: items[0],
        endTrigger: items[items.length - 1],
        start: "center center",
        end: "center center",
        animation: dimmer,
        scrub: 0.2,
      });
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const facts = [
    { stat: "1 in 4", label: "Women experience PCOS globally" },
    { stat: "80%", label: "Of cervical cancers are preventable" },
    { stat: "50%", label: "Of women face period pain monthly" },
    { stat: "1 in 8", label: "Women develop breast cancer" },
  ];

  const govtSchemes = [
    {
      name: "Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)",
      description: "Free antenatal checkups on 9th of every month",
      icon: <Baby className="w-8 h-8" />,
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "Janani Suraksha Yojana (JSY)",
      description: "Cash assistance for institutional deliveries",
      icon: <Shield className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
      description: "Financial support for pregnant & lactating mothers",
      icon: <Award className="w-8 h-8" />,
      color: "from-purple-500 to-indigo-500",
    },
    {
      name: "Menstrual Hygiene Scheme",
      description: "Free sanitary napkins in rural areas",
      icon: <Droplet className="w-8 h-8" />,
      color: "from-red-500 to-pink-500",
    },
  ];

  const healthCards = [
    {
      title: "Daily Healthy Practices",
      icon: <Activity className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
      items: [
        "Sleep 7–9h, hydrate 2–3L water/day",
        "Balanced plate: iron, calcium, protein, fiber",
        "30–45 min moderate activity most days",
        "Stress care: breathing, walks, limit screens before bed",
      ],
      gradient: "from-green-400 to-emerald-600",
    },
    {
      title: "Cycle Care & Pain Relief",
      icon: <Calendar className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
      items: [
        "Track cycle length, flow, cramps; note changes",
        "Heat pads, light stretches, NSAIDs if advised",
        "Heavy bleeding/clots >2–3 hours → see a clinician",
      ],
      gradient: "from-pink-400 to-rose-600",
    },
    {
      title: "Red Flags & When to Seek Care",
      icon: <AlertTriangle className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop",
      items: [
        "Sudden severe pelvic pain, fainting, fever",
        "Bleeding after sex, between periods, or post-menopause",
        "Foul discharge, itching, burning urination",
        "Breast lump/skin change, nipple discharge",
      ],
      gradient: "from-red-400 to-orange-600",
    },
    {
      title: "Screenings & Vaccines",
      icon: <Stethoscope className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=400&fit=crop",
      items: [
        "HPV vaccine as eligible",
        "Pap/HPV tests as per age/doctor guidance",
        "Breast self-awareness; mammogram schedule per risk/age",
        "Anemia, thyroid, vitamin D/B12 checks if symptomatic",
      ],
      gradient: "from-blue-400 to-indigo-600",
    },
    {
      title: "Hygiene & Safe Sex",
      icon: <Shield className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop",
      items: [
        "Change pads/tampons/cups as directed; wash hands before/after",
        "Use clean water; avoid harsh soaps/douching",
        "Condoms for STI protection; discuss contraception options",
      ],
      gradient: "from-purple-400 to-violet-600",
    },
    {
      title: "Mental Wellbeing",
      icon: <Brain className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop",
      items: [
        "Track mood changes around cycle; prioritize sleep and support",
        "Seek help for persistent low mood, anxiety, or intrusive thoughts",
      ],
      gradient: "from-indigo-400 to-purple-600",
    },
    {
      title: "Pregnancy & Postpartum",
      icon: <Baby className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
      items: [
        "Prenatal vitamins (folate/iron) per clinician; regular antenatal visits",
        "Watch for swelling, headaches, vision changes—seek care promptly",
        "Postpartum: rest, hydration, watch bleeding, mood; get support if overwhelmed",
      ],
      gradient: "from-cyan-400 to-blue-600",
    },
    {
      title: "Emergency Steps",
      icon: <Phone className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop",
      items: [
        "Severe abdominal pain, heavy bleeding, fainting, or high fever: seek emergency care",
        "Shortness of breath, chest pain, sudden leg swelling/pain: go to ER",
      ],
      gradient: "from-red-500 to-pink-600",
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Navbar />
      <main className="relative flex-1 pt-28 md:pt-32 pb-16">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 p-6 md:p-8 text-white">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-block mb-3"
              >
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1 text-xs">
                  <Sparkles className="w-3 h-3 mr-1.5 inline" />
                  Empowering Women's Health
                </Badge>
              </motion.div>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-3 font-surgena">
                Gynae<span className="text-yellow-300">Care</span>
              </h1>
              <p className="text-base md:text-lg max-w-3xl mb-4 opacity-95 leading-relaxed">
                Evidence-based guidance for menstrual health, hygiene, screenings, and wellness—designed to educate and support women everywhere.
              </p>
              <div className="flex flex-wrap gap-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm"
                >
                  <Heart className="w-4 h-4" />
                  <span className="font-semibold">Trusted Information</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm"
                >
                  <Users className="w-4 h-4" />
                  <span className="font-semibold">Community Support</span>
                </motion.div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          </div>
        </motion.section>

        {/* Fluid Scroll Section */}
        <section
          ref={fluidSectionRef}
          className="fluid-scroll-section min-h-screen flex items-center justify-center pt-8 pb-20"
          style={{
            "--start": "300",
            "--end": "360",
            "--count": healthTopics.length.toString(),
            "--step": `calc((360 - 300) / (${healthTopics.length} - 1))`,
          } as React.CSSProperties}
        >
          <div className="w-full px-8 md:px-20">
            <h2 className="fluid-text text-center mb-12">
              <span className="sr-only">You can take charge of your health.</span>
              <span aria-hidden="true">you can&nbsp;</span>
            </h2>
            <ul
              ref={fluidListRef}
              className="fluid-list text-center"
              aria-hidden="true"
              style={{ "--count": healthTopics.length.toString() } as React.CSSProperties}
            >
              {healthTopics.map((topic, index) => (
                <li
                  key={index}
                  style={
                    {
                      "--i": index.toString(),
                      color: `oklch(65% 0.3 ${300 + (index * 60) / (healthTopics.length - 1)})`,
                    } as React.CSSProperties
                  }
                >
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Facts Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
            <TrendingUp className="w-8 h-8 inline-block mr-3 text-pink-500" />
            Women's Health Facts
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {facts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-pink-100 hover:border-pink-300 transition-all"
              >
                <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">{fact.stat}</div>
                <div className="text-sm md:text-base text-gray-600">{fact.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Government Schemes Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              <Award className="w-8 h-8 inline-block mr-3 text-purple-500" />
              Government Benefits & Schemes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore government programs designed to support women's health and wellbeing
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {govtSchemes.map((scheme, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-100"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${scheme.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative p-6">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${scheme.color} text-white mb-4`}>
                    {scheme.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{scheme.name}</h3>
                  <p className="text-gray-600 mb-4">{scheme.description}</p>
                  <button className="text-sm font-semibold text-pink-600 hover:text-pink-700 flex items-center gap-1">
                    Learn More <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Health Cards Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            <Stethoscope className="w-8 h-8 inline-block mr-3 text-blue-500" />
            Comprehensive Health Guide
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group relative"
              >
                <Card className="h-full overflow-hidden border-2 border-gray-100 hover:border-pink-300 transition-all duration-300 hover:shadow-2xl">
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: hoveredCard === index ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${card.gradient} opacity-60`}></div>
                    <div className="absolute top-4 left-4">
                      <div className={`p-3 rounded-xl bg-white/90 backdrop-blur-sm text-gray-800`}>
                        {card.icon}
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white drop-shadow-lg">{card.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {card.items.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + itemIndex * 0.05 }}
                          className="flex items-start gap-3 text-sm text-gray-700"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Disclaimer */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-yellow-900 mb-2">Important Disclaimer</h3>
                <p className="text-sm text-yellow-800 leading-relaxed">
                  This is educational content and not a substitute for professional medical advice, diagnosis, or treatment. 
                  Always consult a qualified healthcare professional for personalized care. For emergencies, contact your local 
                  emergency services immediately.
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />

      <style>{`
        .fluid-scroll-section {
          position: relative;
          overflow: hidden;
        }

        .fluid-text {
          --font-level: 6;
          font-size: clamp(2rem, 8vw, 6rem);
          font-weight: 600;
          line-height: 1.25;
          margin-bottom: 2rem;
          background: linear-gradient(
            currentColor 50%,
            color-mix(in oklch, currentColor, transparent 50%)
          );
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .fluid-list {
          list-style: none;
          padding: 0;
          margin: 0;
          font-weight: 600;
          font-size: clamp(2rem, 8vw, 6rem);
          line-height: 1.25;
        }

        .fluid-list li {
          display: block;
          transition: opacity 0.3s ease, filter 0.3s ease;
          opacity: 0.2;
        }

        .fluid-list li:first-of-type {
          opacity: 1;
        }

        .fluid-list li:last-of-type {
          opacity: 0.2;
          background: linear-gradient(
            currentColor 50%,
            color-mix(in oklch, currentColor, transparent 50%)
          );
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        @media (max-width: 768px) {
          .fluid-text,
          .fluid-list {
            font-size: clamp(1.5rem, 6vw, 4rem);
          }
        }
      `}</style>
    </div>
  );
}
