
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Features from "@/components/Features";
import TravelCompanions from "@/components/TravelCompanions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { LocationProvider } from "@/contexts/LocationContext";

const Index = () => {
  return (
    <LocationProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <Hero />
        <Services />
        <Features />
        <TravelCompanions />
        <Footer />
      </div>
    </LocationProvider>
  );
};

export default Index;
