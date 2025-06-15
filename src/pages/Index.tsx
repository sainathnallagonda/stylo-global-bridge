
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Features from "@/components/Features";
import TravelCompanions from "@/components/TravelCompanions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
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
