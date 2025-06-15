
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/contexts/LocationContext";

const CurrencyToggle = () => {
  const { currency, setCurrency, exchangeRate, isLoadingRate, refreshExchangeRate } = useLocation();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg border border-gray-200">
        <Button
          size="sm"
          variant={currency === 'INR' ? 'default' : 'ghost'}
          onClick={() => setCurrency('INR')}
          className={`rounded-full text-xs px-4 py-2 font-medium transition-all duration-200 ${
            currency === 'INR' 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
              : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
          }`}
        >
          ₹ INR
        </Button>
        <Button
          size="sm"
          variant={currency === 'USD' ? 'default' : 'ghost'}
          onClick={() => setCurrency('USD')}
          className={`rounded-full text-xs px-4 py-2 font-medium transition-all duration-200 ${
            currency === 'USD' 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
              : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
          }`}
        >
          $ USD
        </Button>
      </div>
      
      <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg border border-gray-200">
        <div className="text-xs text-gray-600">
          <span className="font-medium">1 USD = ₹{exchangeRate.toFixed(2)}</span>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={refreshExchangeRate}
          disabled={isLoadingRate}
          className="p-1 h-auto hover:bg-blue-50 rounded-full"
        >
          <RefreshCw className={`h-3 w-3 text-gray-500 ${isLoadingRate ? 'animate-spin' : ''}`} />
        </Button>
      </div>
    </div>
  );
};

export default CurrencyToggle;
