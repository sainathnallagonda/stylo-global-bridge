
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/contexts/LocationContext";

const CurrencyToggle = () => {
  const { currency, setCurrency, exchangeRate, isLoadingRate, refreshExchangeRate } = useLocation();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
        <Button
          size="sm"
          variant={currency === 'INR' ? 'default' : 'ghost'}
          onClick={() => setCurrency('INR')}
          className={`rounded-md text-xs px-3 py-1 font-medium transition-all duration-200 ${
            currency === 'INR' 
              ? 'bg-primary-blue text-white' 
              : 'text-gray-600 hover:bg-white hover:text-primary-blue'
          }`}
        >
          ₹ INR
        </Button>
        <Button
          size="sm"
          variant={currency === 'USD' ? 'default' : 'ghost'}
          onClick={() => setCurrency('USD')}
          className={`rounded-md text-xs px-3 py-1 font-medium transition-all duration-200 ${
            currency === 'USD' 
              ? 'bg-primary-blue text-white' 
              : 'text-gray-600 hover:bg-white hover:text-primary-blue'
          }`}
        >
          $ USD
        </Button>
      </div>
      
      <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
        <div className="text-xs text-gray-600">
          <span className="font-medium">1 USD = ₹{exchangeRate.toFixed(2)}</span>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={refreshExchangeRate}
          disabled={isLoadingRate}
          className="p-1 h-auto hover:bg-white rounded-md"
        >
          <RefreshCw className={`h-3 w-3 text-gray-500 ${isLoadingRate ? 'animate-spin' : ''}`} />
        </Button>
      </div>
    </div>
  );
};

export default CurrencyToggle;
