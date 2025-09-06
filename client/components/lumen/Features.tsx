import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { 
  Mic, 
  Image as ImageIcon, 
  Upload, 
  BadgeAlert, 
  Stethoscope,
  FileText,
  Brain,
  Shield,
  Zap,
  Heart
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import LabAnalyzer from "./LabAnalyzer";
import PyramidLoader from "./PyramidLoader";

export default function Features() {
  const handleDiagnosisClick = () => {
    window.location.href = '/diagnosis';
  };

  const features = [
    // 5.1 Symptoms-Based Diagnosis & Guidance
    {
      Icon: Stethoscope,
      name: "Symptoms-Based Diagnosis & Guidance",
      description: "Input via text, audio, or image. Output includes urgency.",
      href: "/diagnosis",
      cta: "Try Diagnosis Interface",
      onClick: handleDiagnosisClick,
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30"></div>
      ),
      className: "lg:col-span-1 lg:row-span-1",
      poweredBy: "GPT-4 / GPT-5, Whisper, OpenAI TTS"
    },
    
    // 5.2 AI Specialist Modules
    {
      Icon: Brain,
      name: "AI Specialist Modules",
      description: "Dermatology, Radiology, and Cardiology specialist AI modules.",
      href: "/",
      cta: "Learn more",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30"></div>
      ),
      className: "lg:col-span-1 lg:row-span-1",
      poweredBy: "GPT-4-Vision"
    },

    // 5.3 Enhanced CT Reconstruction
    {
      Icon: Zap,
      name: "Enhanced CT Reconstruction",
      description: "PEARL-inspired preview for clearer, lower-dose imaging.",
      href: "/pearl",
      cta: "View PEARL Demo",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30"></div>
      ),
      className: "lg:col-span-1 lg:row-span-1",
      poweredBy: "Custom PEARL algorithms"
    },

    // 5.4 Lab Report Analyzer
    {
      Icon: FileText,
      name: "Lab Report Analyzer",
      description: "Upload lab reports, get extracted values, risk flags, and follow-up suggestions.",
      href: "/lab",
      cta: "Try Lab Analyzer",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30"></div>
      ),
      className: "lg:col-span-1 lg:row-span-1",
      poweredBy: "GPT-4 / GPT-5"
    },

    // 5.5 Government Schemes Assistant
    {
      Icon: Shield,
      name: "Government Schemes Assistant",
      description: "Find eligible healthcare schemes and benefits with step-by-step guidance.",
      href: "/schemes",
      cta: "Open Assistant",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30"></div>
      ),
      className: "lg:col-span-1 lg:row-span-1",
      poweredBy: "GPT-4 / GPT-5"
    },

    // 5.6 Emergency Education
    {
      Icon: Heart,
      name: "Emergency Education",
      description: "Interactive emergency response training with visual guides.",
      href: "/",
      cta: "Learn more",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30"></div>
      ),
      className: "lg:col-span-1 lg:row-span-1",
      poweredBy: "GPT-4 / GPT-5"
    }
  ];

  return (
    <section id="features" className="py-20 scroll-mt-28 md:scroll-mt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">
          Powerful Features
        </h2>
        <p className="mt-3 text-center text-muted-foreground max-w-2xl mx-auto">
          Each module includes interactive examples and micro‑interactions.
        </p>

        <div className="mt-10">
          <BentoGrid className="lg:grid-rows-2 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {features.map((feature) => (
              <BentoCard 
                key={feature.name}
                {...feature}
              />
            ))}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
}