
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Country = 'India' | 'USA';
type Currency = 'INR' | 'USD';

interface LocationContextType {
  fromCountry: Country;
  toCountry: Country;
  currency: Currency;
  exchangeRate: number;
  isLoadingRate: boolean;
  setFromCountry: (country: Country) => void;
  setToCountry: (country: Country) => void;
  setCurrency: (currency: Currency) => void;
  swapCountries: () => void;
  getCurrencyDisplay: (amount: number, originalCurrency: 'INR' | 'USD') => string;
  refreshExchangeRate: () => void;
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
  const [currency, setCurrency] = useState<Currency>('INR');
  const [exchangeRate, setExchangeRate] = useState<number>(83); // Default fallback rate
  const [isLoadingRate, setIsLoadingRate] = useState<boolean>(false);

  const fetchExchangeRate = async () => {
    setIsLoadingRate(true);
    try {
      // Using a free exchange rate API
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      if (data.rates && data.rates.INR) {
        setExchangeRate(data.rates.INR);
        localStorage.setItem('exchangeRate', data.rates.INR.toString());
        localStorage.setItem('lastUpdated', Date.now().toString());
      }
    } catch (error) {
      console.error('Failed to fetch exchange rate:', error);
      // Try to get cached rate
      const cachedRate = localStorage.getItem('exchangeRate');
      if (cachedRate) {
        setExchangeRate(parseFloat(cachedRate));
      }
    } finally {
      setIsLoadingRate(false);
    }
  };

  const refreshExchangeRate = () => {
    fetchExchangeRate();
  };

  useEffect(() => {
    // Check if we have a cached rate and if it's recent (less than 1 hour old)
    const cachedRate = localStorage.getItem('exchangeRate');
    const lastUpdated = localStorage.getItem('lastUpdated');
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
    
    if (cachedRate && lastUpdated && (Date.now() - parseInt(lastUpdated)) < oneHour) {
      setExchangeRate(parseFloat(cachedRate));
    } else {
      fetchExchangeRate();
    }

    // Update exchange rate every 5 minutes
    const interval = setInterval(fetchExchangeRate, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const swapCountries = () => {
    const temp = fromCountry;
    setFromCountry(toCountry);
    setToCountry(temp);
  };

  const getCurrencyDisplay = (amount: number, originalCurrency: 'INR' | 'USD') => {
    if (currency === originalCurrency) {
      // Show in selected currency with conversion in parentheses
      if (currency === 'USD') {
        const inrAmount = (amount * exchangeRate).toFixed(0);
        return `$${amount} (₹${inrAmount})`;
      } else {
        const usdAmount = (amount / exchangeRate).toFixed(2);
        return `₹${amount} ($${usdAmount})`;
      }
    } else {
      // Convert and show in selected currency
      if (currency === 'USD' && originalCurrency === 'INR') {
        const convertedAmount = (amount / exchangeRate).toFixed(2);
        return `$${convertedAmount} (₹${amount})`;
      } else if (currency === 'INR' && originalCurrency === 'USD') {
        const convertedAmount = (amount * exchangeRate).toFixed(0);
        return `₹${convertedAmount} ($${amount})`;
      }
    }
    
    // Fallback
    return currency === 'USD' ? `$${amount}` : `₹${amount}`;
  };

  return (
    <LocationContext.Provider value={{
      fromCountry,
      toCountry,
      currency,
      exchangeRate,
      isLoadingRate,
      setFromCountry,
      setToCountry,
      setCurrency,
      swapCountries,
      getCurrencyDisplay,
      refreshExchangeRate
    }}>
      {children}
    </LocationContext.Provider>
  );
};
