
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import TravelCompanions from "@/components/TravelCompanions";
import FlightServiceBundle from "@/components/FlightServiceBundle";
import TrustSecurity from "@/components/TrustSecurity";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <HowItWorks />
      <Features />
      <TravelCompanions />
      <FlightServiceBundle />
      <TrustSecurity />
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default Index;
