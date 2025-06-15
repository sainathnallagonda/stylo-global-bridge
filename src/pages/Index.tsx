
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import TravelCompanions from "@/components/TravelCompanions";
import TrustSecurity from "@/components/TrustSecurity";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Services />
      <HowItWorks />
      <TravelCompanions />
      <TrustSecurity />
      <Footer />
    </div>
  );
};

export default Index;
