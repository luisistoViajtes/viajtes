"use client";

import { useState, useEffect } from "react";
import { ServiceSlug } from "@/features/landing/types";
import Header from "@/features/landing/components/Header";
import HeroSection from "@/features/landing/components/HeroSection";
import AsesorTuristicoSection from "@/features/landing/components/AsesorTuristicoSection";
import AuthoritySection from "@/features/landing/components/AuthoritySection";
import LogosCarousel from "@/features/landing/components/LogosCarousel";
import TestimonialsSection from "@/features/landing/components/TestimonialsSection";
import ServicesGrid from "@/features/landing/components/ServicesGrid";
import SocialSection from "@/features/landing/components/SocialSection";
import DestinationsSection from "@/features/landing/components/DestinationsSection";
import PautaSection from "@/features/landing/components/PautaSection";
import LeadForm from "@/features/landing/components/LeadForm";
import FinalCTA from "@/features/landing/components/FinalCTA";
import Footer from "@/features/landing/components/Footer";
import WhatsAppFloatingButton from "@/features/landing/components/WhatsAppFloatingButton";
import TripTicker from "@/features/landing/components/TripTicker";
import HowItWorksSection from "@/features/landing/components/HowItWorksSection";
import ViajaConLuisitoSection from "@/features/landing/components/ViajaConLuisitoSection";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceSlug | "">("");

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleServiceSelect = (slug: ServiceSlug) => {
    setSelectedService(slug);
    // Small delay so the section scroll feels intentional
    setTimeout(() => scrollToSection("contacto"), 50);
  };

  return (
    <div className="bg-brand-base text-brand-text overflow-x-hidden">
      <Header
        isScrolled={isScrolled}
        onContactClick={() => scrollToSection("contacto")}
      />
      <HeroSection onServicesClick={() => scrollToSection("servicios")} />
      <TripTicker />
      <AsesorTuristicoSection />
      <AuthoritySection />
      <LogosCarousel />
      <HowItWorksSection />
      <TestimonialsSection />
      <ServicesGrid onServiceSelect={handleServiceSelect} />
      <SocialSection />
      <DestinationsSection />
      <ViajaConLuisitoSection />
      <PautaSection onContactClick={() => scrollToSection("contacto")} />
      <LeadForm
        selectedService={selectedService}
        onServiceChange={setSelectedService}
      />
      <FinalCTA />
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
