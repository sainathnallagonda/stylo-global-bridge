
import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/contexts/LocationContext";

const CountrySelector = () => {
  const { fromCountry, toCountry, swapCountries } = useLocation();

  return (
    <div className="flex items-center justify-center gap-6 mb-8">
      <div className="flex items-center gap-4 bg-white rounded-xl px-6 py-4 shadow-lg border border-gray-100">
        <div className="flex items-center gap-3">
          <img 
            src={fromCountry === 'India' ? "https://flagcdn.com/w40/in.png" : "https://flagcdn.com/w40/us.png"} 
            alt={fromCountry} 
            className="w-8 h-6 rounded" 
          />
          <span className="text-gray-700 font-medium">{fromCountry}</span>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={swapCountries}
          className="rounded-full bg-primary-blue border-0 text-white hover:bg-primary-blue-dark transition-all duration-300"
        >
          <ArrowLeftRight className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center gap-3">
          <img 
            src={toCountry === 'India' ? "https://flagcdn.com/w40/in.png" : "https://flagcdn.com/w40/us.png"} 
            alt={toCountry} 
            className="w-8 h-6 rounded" 
          />
          <span className="text-gray-700 font-medium">{toCountry}</span>
        </div>
      </div>
    </div>
  );
};

export default CountrySelector;
