
import React, { createContext, useContext, useState, useEffect } from 'react';

type Country = 'india' | 'usa';
type Currency = 'INR' | 'USD';

interface LocationContextType {
  fromCountry: Country;
  toCountry: Country;
  currency: Currency;
  secondaryCurrency: Currency;
  setFromCountry: (country: Country) => void;
  setToCountry: (country: Country) => void;
  toggleDirection: () => void;
  formatPrice: (amount: number, showSecondary?: boolean) => string;
  convertCurrency: (amount: number, fromCur: Currency, toCur: Currency) => number;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const EXCHANGE_RATES = {
  'USD_TO_INR': 83.50,
  'INR_TO_USD': 0.012
};

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fromCountry, setFromCountry] = useState<Country>('usa');
  const [toCountry, setToCountry] = useState<Country>('india');

  const currency = fromCountry === 'usa' ? 'USD' : 'INR';
  const secondaryCurrency = fromCountry === 'usa' ? 'INR' : 'USD';

  const toggleDirection = () => {
    const newFrom = toCountry;
    const newTo = fromCountry;
    setFromCountry(newFrom);
    setToCountry(newTo);
  };

  const convertCurrency = (amount: number, fromCur: Currency, toCur: Currency): number => {
    if (fromCur === toCur) return amount;
    
    if (fromCur === 'USD' && toCur === 'INR') {
      return amount * EXCHANGE_RATES.USD_TO_INR;
    } else if (fromCur === 'INR' && toCur === 'USD') {
      return amount * EXCHANGE_RATES.INR_TO_USD;
    }
    
    return amount;
  };

  const formatPrice = (amount: number, showSecondary: boolean = true): string => {
    const primarySymbol = currency === 'USD' ? '$' : '₹';
    const secondarySymbol = secondaryCurrency === 'USD' ? '$' : '₹';
    
    if (!showSecondary) {
      return `${primarySymbol}${amount.toFixed(2)}`;
    }
    
    const convertedAmount = convertCurrency(amount, currency, secondaryCurrency);
    return `${primarySymbol}${amount.toFixed(2)} (${secondarySymbol}${convertedAmount.toFixed(2)})`;
  };

  return (
    <LocationContext.Provider value={{
      fromCountry,
      toCountry,
      currency,
      secondaryCurrency,
      setFromCountry,
      setToCountry,
      toggleDirection,
      formatPrice,
      convertCurrency
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
