
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Services from "@/components/Services";
import TravelCompanions from "@/components/TravelCompanions";
import FlightServiceBundle from "@/components/FlightServiceBundle";
import HowItWorks from "@/components/HowItWorks";
import TrustSecurity from "@/components/TrustSecurity";
import Footer from "@/components/Footer";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Services />
      <TravelCompanions />
      <FlightServiceBundle />
      <HowItWorks />
      <TrustSecurity />
      <Footer />
    </div>
  );
};

export default Index;
