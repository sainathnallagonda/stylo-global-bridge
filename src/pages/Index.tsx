
import { useAuth } from "@/contexts/AuthContext";
import { AppStateProvider } from "@/contexts/AppStateContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AnimatedStats from "@/components/AnimatedStats";
import TrustBadges from "@/components/TrustBadges";
import Services from "@/components/Services";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import TrustSecurity from "@/components/TrustSecurity";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import FloatingActionButton from "@/components/FloatingActionButton";
import CartModal from "@/components/CartModal";

const Index = () => {
  const { loading } = useAuth();

  // Show loading state only during initial auth check
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your personalized experience...</p>
        </div>
      </div>
    );
  }

  // Always show the homepage - don't redirect based on auth status
  return (
    <AppStateProvider>
      <div className="min-h-screen">
        <Header />
        <Hero />
        <AnimatedStats />
        <TrustBadges />
        <Services />
        <TestimonialsCarousel />
        <Features />
        <HowItWorks />
        <TrustSecurity />
        <Footer />
        <Chatbot />
        <FloatingActionButton />
        <CartModal />
      </div>
    </AppStateProvider>
  );
};

export default Index;
