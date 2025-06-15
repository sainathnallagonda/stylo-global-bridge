
import { ArrowRight, Heart, Sparkles } from "lucide-react";
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
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-purple-300/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-blue-300/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-indigo-300/20 rounded-full animate-pulse"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Brand badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-purple-200/50 rounded-full px-6 py-2 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-purple-700 font-medium">Stylo - Send to Your Loved Ones</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in">
              Send Love
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in">
              Across Borders
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed animate-fade-in max-w-3xl mx-auto">
            Order food, gifts, groceries, and services for your loved ones across 
            <span className="font-semibold text-purple-700"> India and USA</span>. 
            Pay in your currency, deliver with love.
          </p>
          
          <CountrySelector />

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white text-lg px-10 py-7 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 group"
              onClick={handleGetStarted}
            >
              <Heart className="mr-3 group-hover:animate-pulse" size={20} />
              {user ? 'Go to Dashboard' : 'Get Started'} 
              <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-10 py-7 rounded-2xl border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 text-purple-700 font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <Sparkles className="mr-2" size={18} />
              Watch Demo
            </Button>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
            <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-purple-100/50 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold text-purple-700 mb-2">10K+</div>
              <div className="text-gray-600">Happy Families</div>
            </div>
            <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-blue-100/50 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold text-blue-700 mb-2">50K+</div>
              <div className="text-gray-600">Orders Delivered</div>
            </div>
            <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-indigo-100/50 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold text-indigo-700 mb-2">99%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
