
import { ArrowRight, Heart } from "lucide-react";
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
    <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-100/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
              ✨ Send Love Across Borders
            </span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent animate-fade-in leading-tight">
            Send to Your
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Loved Ones
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-12 animate-fade-in leading-relaxed font-medium">
            Order food, gifts, groceries, and services for your loved ones across India and USA. 
            <br />
            <span className="text-blue-600 font-semibold">Pay in your currency, deliver with love.</span>
          </p>
          
          <CountrySelector />

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 hover:from-orange-500 hover:via-purple-600 hover:to-blue-600 text-white text-lg px-10 py-6 rounded-2xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border-0"
              onClick={handleGetStarted}
            >
              {user ? '🚀 Go to Dashboard' : '🎯 Get Started'} 
              <ArrowRight className="ml-3" size={24} />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-10 py-6 rounded-2xl font-semibold border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-lg bg-white/80 backdrop-blur-sm"
            >
              🎬 Watch Demo
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Heart className="text-red-500" size={16} />
              <span>Trusted by 10,000+ families</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="flex items-center gap-2">
              <span>⭐ 4.9/5 rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
