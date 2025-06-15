
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Features from "@/components/Features";
import TravelCompanions from "@/components/TravelCompanions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Services />
      <Features />
      <TravelCompanions />
      <Footer />
    </div>
  );
};

export default Index;
