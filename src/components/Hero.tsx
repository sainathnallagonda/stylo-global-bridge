
import { ArrowRight, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import CountrySelector from "./CountrySelector";

const Hero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Background with gifts and landmarks */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-100 via-pink-50 to-blue-50">
        <div className="absolute right-0 top-0 w-2/3 h-full bg-cover bg-center opacity-20"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M20,20 L30,10 L40,20 L30,30 Z' fill='%23ff6b9d' opacity='0.3'/%3E%3Cpath d='M60,30 L70,20 L80,30 L70,40 Z' fill='%23f093fb' opacity='0.3'/%3E%3Cpath d='M40,60 L50,50 L60,60 L50,70 Z' fill='%23ff9a9e' opacity='0.3'/%3E%3C/svg%3E")`
             }}>
        </div>
        
        {/* Gift boxes decoration */}
        <div className="absolute top-20 right-20 w-16 h-16 bg-pink-200 rounded-lg transform rotate-12 opacity-60"></div>
        <div className="absolute top-40 right-40 w-12 h-12 bg-orange-200 rounded-lg transform -rotate-12 opacity-60"></div>
        <div className="absolute bottom-40 right-60 w-20 h-20 bg-blue-200 rounded-lg transform rotate-45 opacity-60"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="text-left">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                Send Love to USA
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Order premium American products and services for your loved ones in the USA, pay in INR with no hidden fees.
              </p>
              
              <CountrySelector />

              {/* Address input */}
              <div className="mb-8">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Enter recipient's address"
                    className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                  />
                </div>
              </div>

              {/* CTA Button */}
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-12 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-8"
                onClick={handleGetStarted}
              >
                Find Services
                <ArrowRight className="ml-2" size={20} />
              </Button>

              {/* Stats section */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">10K+</div>
                  <div className="text-sm text-gray-600">Happy Families</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">50K+</div>
                  <div className="text-sm text-gray-600">Orders Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">99%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Right side - Visual elements (gifts, landmarks) */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-pink-100 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🎁</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Gifts & Flowers</div>
                      <div className="text-sm text-gray-600">Special occasions made memorable</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🍕</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Food Delivery</div>
                      <div className="text-sm text-gray-600">From top restaurants</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🛒</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Grocery Shopping</div>
                      <div className="text-sm text-gray-600">Essential items delivered</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
