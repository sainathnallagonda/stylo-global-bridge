
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import TravelCompanions from "@/components/TravelCompanions";
import FlightServiceBundle from "@/components/FlightServiceBundle";
import TrustSecurity from "@/components/TrustSecurity";
import Footer from "@/components/Footer";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Services />
      <HowItWorks />
      <TravelCompanions />
      <FlightServiceBundle />
      <TrustSecurity />
      <Footer />
    </div>
  );
};

export default Index;
