
import { useState } from "react";
import { Button } from "@/components/ui/button";

const CurrencyToggle = () => {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
      <Button
        size="sm"
        variant={currency === 'INR' ? 'default' : 'ghost'}
        onClick={() => setCurrency('INR')}
        className={`rounded-full text-xs px-3 ${
          currency === 'INR' 
            ? 'bg-blue-600 text-white' 
            : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        ₹ INR
      </Button>
      <Button
        size="sm"
        variant={currency === 'USD' ? 'default' : 'ghost'}
        onClick={() => setCurrency('USD')}
        className={`rounded-full text-xs px-3 ${
          currency === 'USD' 
            ? 'bg-blue-600 text-white' 
            : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        $ USD
      </Button>
    </div>
  );
};

export default CurrencyToggle;
