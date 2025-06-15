
import { ArrowRight, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="pt-24 pb-12 px-4">
      <div className="container mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent animate-fade-in">
            Care Beyond Borders
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-fade-in">
            Order food, gifts, groceries, and services for your loved ones across India and USA. 
            Pay in your currency, deliver with love.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
            <div className="flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg">
              <img src="https://flagcdn.com/w40/in.png" alt="India" className="w-8 h-6 rounded" />
              <span className="text-gray-700 font-medium">India</span>
            </div>
            <div className="flex items-center gap-3">
              <Heart className="text-red-500 animate-pulse" size={24} />
              <ArrowRight className="text-blue-600" size={24} />
              <Heart className="text-red-500 animate-pulse" size={24} />
            </div>
            <div className="flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg">
              <img src="https://flagcdn.com/w40/us.png" alt="USA" className="w-8 h-6 rounded" />
              <span className="text-gray-700 font-medium">USA</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6">
              Start Caring <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 hover:bg-gray-50">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
