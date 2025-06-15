
import { ArrowLeftRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/contexts/LocationContext";

const CountrySelector = () => {
  const { fromCountry, toCountry, swapCountries } = useLocation();

  return (
    <div className="flex items-center justify-center gap-6 mb-12">
      <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md rounded-2xl px-8 py-4 shadow-xl border border-purple-100/50 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={fromCountry === 'India' ? "https://flagcdn.com/w40/in.png" : "https://flagcdn.com/w40/us.png"} 
              alt={fromCountry} 
              className="w-10 h-7 rounded-md shadow-sm" 
            />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <span className="text-gray-800 font-semibold text-lg">{fromCountry}</span>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={swapCountries}
          className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 border-0 text-white hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        >
          <ArrowLeftRight className="h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={toCountry === 'India' ? "https://flagcdn.com/w40/in.png" : "https://flagcdn.com/w40/us.png"} 
              alt={toCountry} 
              className="w-10 h-7 rounded-md shadow-sm" 
            />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
          </div>
          <span className="text-gray-800 font-semibold text-lg">{toCountry}</span>
        </div>
      </div>
    </div>
  );
};

export default CountrySelector;
