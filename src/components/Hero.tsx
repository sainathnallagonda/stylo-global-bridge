
import { ArrowRight, MapPin, Users, Store, Search } from "lucide-react";
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
      return "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";
    } else {
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
        {/* Enhanced Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/75"></div>
      </div>

      {/* Animated decorative elements */}
      <div className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg transform rotate-12 opacity-70 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
        <div className="w-full h-full flex items-center justify-center text-2xl">🎁</div>
      </div>
      <div className="absolute top-32 right-32 w-12 h-12 bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg transform -rotate-12 opacity-70 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>
        <div className="w-full h-full flex items-center justify-center text-xl">🎀</div>
      </div>
      <div className="absolute top-40 right-48 w-14 h-14 bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg transform rotate-45 opacity-70 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }}>
        <div className="w-full h-full flex items-center justify-center text-xl">💝</div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl">
          {/* Enhanced Main Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium animate-fade-in">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
                Trusted by 25,000+ families worldwide
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight animate-fade-in">
                Send Love to
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-2">
                  {toCountry}
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Order premium {toCountry === 'USA' ? 'American' : 'Indian'} products and services for your loved ones in {toCountry === 'USA' ? 'the USA' : 'India'}, pay in {toCountry === 'USA' ? 'INR' : 'USD'} with no hidden fees.
              </p>
            </div>
            
            <div className="space-y-6 max-w-lg animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <CountrySelector />

              {/* Enhanced Address input */}
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors" />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Enter recipient's address or postal code"
                  className="w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group-focus-within:shadow-xl"
                />
              </div>

              {/* Enhanced Login Buttons */}
              {!user && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white text-lg px-6 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group w-full transform hover:scale-105"
                      onClick={() => navigate('/customer-login')}
                    >
                      <Users className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      Customer Login
                    </Button>
                    
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-lg px-6 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group w-full transform hover:scale-105"
                      onClick={() => navigate('/vendor-login')}
                    >
                      <Store className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      Vendor Login
                    </Button>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-2">Or browse without logging in</p>
                  </div>
                </div>
              )}

              {/* Enhanced CTA Button */}
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group w-full transform hover:scale-105"
                onClick={handleFindServices}
              >
                <span className="mr-3">Find Services</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
