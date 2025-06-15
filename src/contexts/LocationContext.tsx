
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Country = 'India' | 'USA';

interface LocationContextType {
  fromCountry: Country;
  toCountry: Country;
  setFromCountry: (country: Country) => void;
  setToCountry: (country: Country) => void;
  swapCountries: () => void;
  getCurrencyDisplay: (amount: number, currency: 'INR' | 'USD') => string;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [fromCountry, setFromCountry] = useState<Country>('India');
  const [toCountry, setToCountry] = useState<Country>('USA');

  const swapCountries = () => {
    const temp = fromCountry;
    setFromCountry(toCountry);
    setToCountry(temp);
  };

  const getCurrencyDisplay = (amount: number, currency: 'INR' | 'USD') => {
    if (toCountry === 'USA') {
      if (currency === 'USD') {
        const inrAmount = (amount * 83).toFixed(0);
        return `$${amount} (₹${inrAmount})`;
      } else {
        const usdAmount = (amount / 83).toFixed(2);
        return `₹${amount} ($${usdAmount})`;
      }
    } else {
      if (currency === 'INR') {
        const usdAmount = (amount / 83).toFixed(2);
        return `₹${amount} ($${usdAmount})`;
      } else {
        const inrAmount = (amount * 83).toFixed(0);
        return `$${amount} (₹${inrAmount})`;
      }
    }
  };

  return (
    <LocationContext.Provider value={{
      fromCountry,
      toCountry,
      setFromCountry,
      setToCountry,
      swapCountries,
      getCurrencyDisplay
    }}>
      {children}
    </LocationContext.Provider>
  );
};
