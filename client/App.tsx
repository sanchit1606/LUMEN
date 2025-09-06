import "./global.css";

import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TechnicalPage from "./pages/Technical";
import PearlPage from "./pages/Pearl";
import DevelopersPage from "./pages/Developers";
import LabPage from "./pages/Lab";
import SchemesPage from "./pages/Schemes";
import DiagnosisPage from "./pages/Diagnosis";

const queryClient = new QueryClient();

function ScrollToHash() {
  const { pathname, hash } = useLocation();
  React.useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else
        setTimeout(() => {
          const el2 = document.getElementById(id);
          if (el2) el2.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/technical" element={<TechnicalPage />} />
          <Route path="/pearl" element={<PearlPage />} />
          <Route path="/lab" element={<LabPage />} />
          <Route path="/schemes" element={<SchemesPage />} />
          <Route path="/diagnosis" element={<DiagnosisPage />} />
          <Route path="/developers" element={<DevelopersPage />} />
          <Route path="/Developers" element={<DevelopersPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const container = document.getElementById("root")!;

declare global {
  interface Window {
    __lumen_root?: import("react-dom/client").Root;
  }
}

if ((window as any).__lumen_root) {
  (window as any).__lumen_root.render(<App />);
} else {
  const root = createRoot(container);
  (window as any).__lumen_root = root;
  root.render(<App />);
}
