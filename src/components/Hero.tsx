
import { ArrowRight, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "@/contexts/LocationContext";
import CountrySelector from "./CountrySelector";

const Hero = () => {
  const { user } = useAuth();
  const { toCountry } = useLocation();
  const navigate = useNavigate();

  const handleFindServices = () => {
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Get background image based on destination country
  const getBackgroundImage = () => {
    if (toCountry === 'India') {
      // Taj Mahal for USA to India
      return "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";
    } else {
      // Modern USA building for India to USA
      return "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";
    }
  };

  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden min-h-[90vh]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${getBackgroundImage()})`,
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent"></div>
      </div>

      {/* Decorative floating gift boxes */}
      <div className="absolute top-20 right-20 w-16 h-16 bg-pink-200 rounded-lg transform rotate-12 opacity-60 hero-float">
        🎁
      </div>
      <div className="absolute top-32 right-32 w-12 h-12 bg-orange-200 rounded-lg transform -rotate-12 opacity-60 hero-float-delayed">
        🎀
      </div>
      <div className="absolute top-40 right-48 w-14 h-14 bg-blue-200 rounded-lg transform rotate-45 opacity-60 hero-float">
        💝
      </div>
      <div className="absolute top-60 right-60 w-10 h-10 bg-yellow-200 rounded-lg transform rotate-45 opacity-60 hero-float-delayed">
        🎊
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl">
          {/* Main Content - Left aligned */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              Send Love to
              <span className="block text-blue-600 mt-2">{toCountry}</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              Order premium {toCountry === 'USA' ? 'American' : 'Indian'} products and services for your loved ones in {toCountry === 'USA' ? 'the USA' : 'India'}, pay in {toCountry === 'USA' ? 'INR' : 'USD'} with no hidden fees.
            </p>
            
            <div className="space-y-6 max-w-lg">
              <CountrySelector />

              {/* Address input */}
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Enter recipient's address"
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white/90 backdrop-blur-sm shadow-sm"
                />
              </div>

              {/* CTA Button */}
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group w-full"
                onClick={handleFindServices}
              >
                Find Services
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
