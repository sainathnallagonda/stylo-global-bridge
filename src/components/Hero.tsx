
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

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden min-h-[80vh]">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-pink-25 to-blue-50">
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-20 h-20 bg-pink-200 rounded-2xl transform rotate-12 opacity-40 hero-float"></div>
        <div className="absolute top-40 right-40 w-16 h-16 bg-orange-200 rounded-xl transform -rotate-12 opacity-40 hero-float-delayed"></div>
        <div className="absolute bottom-40 right-60 w-24 h-24 bg-blue-200 rounded-3xl transform rotate-45 opacity-40 hero-float"></div>
        <div className="absolute top-60 right-80 w-12 h-12 bg-yellow-200 rounded-lg transform rotate-45 opacity-40 hero-float-delayed"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              Send Love to
              <span className="block text-blue-600 mt-2">{toCountry}</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Order premium {toCountry === 'USA' ? 'American' : 'Indian'} products and services for your loved ones in {toCountry === 'USA' ? 'the USA' : 'India'}, pay in {toCountry === 'USA' ? 'INR' : 'USD'} with no hidden fees.
            </p>
            
            <div className="space-y-6">
              <CountrySelector />

              {/* Address input */}
              <div className="relative max-w-md mx-auto">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Enter recipient's address"
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white shadow-sm"
                />
              </div>

              {/* CTA Button */}
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                onClick={handleGetStarted}
              >
                Find Services
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </div>

            {/* Stats section */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
                <div className="text-sm text-gray-600">Happy Families</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">50K+</div>
                <div className="text-sm text-gray-600">Orders Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">99%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
