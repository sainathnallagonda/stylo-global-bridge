
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/contexts/LocationContext";

const CurrencyToggle = () => {
  const { currency, setCurrency, exchangeRate, isLoadingRate, refreshExchangeRate } = useLocation();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
        <Button
          size="sm"
          variant={currency === 'INR' ? 'default' : 'ghost'}
          onClick={() => setCurrency('INR')}
          className={`rounded-md text-xs px-3 py-1 font-medium transition-all duration-200 ${
            currency === 'INR' 
              ? 'bg-blue-600 text-white shadow-sm' 
              : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
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
              ? 'bg-blue-600 text-white shadow-sm' 
              : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
          }`}
        >
          $ USD
        </Button>
      </div>
      
      <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200">
        <div className="text-xs text-gray-700">
          <span className="font-medium">1 USD = ₹{exchangeRate.toFixed(2)}</span>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={refreshExchangeRate}
          disabled={isLoadingRate}
          className="p-1 h-auto hover:bg-gray-100 rounded-md"
        >
          <RefreshCw className={`h-3 w-3 text-gray-600 ${isLoadingRate ? 'animate-spin' : ''}`} />
        </Button>
      </div>
    </div>
  );
};

export default CurrencyToggle;
