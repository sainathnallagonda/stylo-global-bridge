
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
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

const Index = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if we have both user and profile data and we're not loading
    if (!loading && user && profile) {
      console.log('Redirecting user with role:', profile.role);
      try {
        if (profile.role === 'vendor') {
          navigate('/vendor-dashboard');
        } else if (profile.role === 'customer') {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error during navigation:', error);
      }
    }
  }, [user, profile, loading, navigate]);

  // Show loading state
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

  // Show the enhanced homepage for non-authenticated users
  try {
    return (
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
      </div>
    );
  } catch (error) {
    console.error('Error rendering Index page:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="text-gray-600">Please refresh the page or try again later.</p>
        </div>
      </div>
    );
  }
};

export default Index;
