
import EnhancedHeader from '@/components/navigation/EnhancedHeader';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <EnhancedHeader />
      <Hero />
      <Services />
      <Features />
      <HowItWorks />
      <TestimonialsCarousel />
      <Footer />
    </div>
  );
};

export default Index;
