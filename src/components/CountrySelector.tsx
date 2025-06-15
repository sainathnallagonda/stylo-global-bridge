
import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/contexts/LocationContext";

const CountrySelector = () => {
  const { fromCountry, toCountry, swapCountries } = useLocation();

  return (
    <div className="flex items-center justify-start gap-4 mb-8">
      <div className="flex items-center gap-4 bg-white rounded-xl px-6 py-3 shadow-sm border border-gray-100">
        <div className="flex flex-col">
          <div className="text-xs text-gray-500 mb-1">From Country</div>
          <div className="flex items-center gap-2">
            <img 
              src={fromCountry === 'India' ? "https://flagcdn.com/w40/in.png" : "https://flagcdn.com/w40/us.png"} 
              alt={fromCountry} 
              className="w-6 h-4 rounded" 
            />
            <span className="text-gray-900 font-medium text-sm">{fromCountry}</span>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={swapCountries}
          className="rounded-full w-8 h-8 border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
        >
          <ArrowLeftRight className="h-3 w-3" />
        </Button>
        
        <div className="flex flex-col">
          <div className="text-xs text-gray-500 mb-1">To Country</div>
          <div className="flex items-center gap-2">
            <img 
              src={toCountry === 'India' ? "https://flagcdn.com/w40/in.png" : "https://flagcdn.com/w40/us.png"} 
              alt={toCountry} 
              className="w-6 h-4 rounded" 
            />
            <span className="text-gray-900 font-medium text-sm">{toCountry}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountrySelector;
