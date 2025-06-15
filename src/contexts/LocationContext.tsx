
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
  const [exchangeRate, setExchangeRate] = useState<number>(83);
  const [isLoadingRate, setIsLoadingRate] = useState<boolean>(false);

  const fetchExchangeRate = async () => {
    setIsLoadingRate(true);
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      if (data.rates && data.rates.INR) {
        setExchangeRate(data.rates.INR);
        localStorage.setItem('exchangeRate', data.rates.INR.toString());
        localStorage.setItem('lastUpdated', Date.now().toString());
      }
    } catch (error) {
      console.error('Failed to fetch exchange rate:', error);
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
    const cachedRate = localStorage.getItem('exchangeRate');
    const lastUpdated = localStorage.getItem('lastUpdated');
    const oneHour = 60 * 60 * 1000;
    
    if (cachedRate && lastUpdated && (Date.now() - parseInt(lastUpdated)) < oneHour) {
      setExchangeRate(parseFloat(cachedRate));
    } else {
      fetchExchangeRate();
    }

    const interval = setInterval(fetchExchangeRate, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const swapCountries = () => {
    const temp = fromCountry;
    setFromCountry(toCountry);
    setToCountry(temp);
  };

  // Simplified currency display - show prices based on destination country
  const getCurrencyDisplay = (amount: number, originalCurrency: 'INR' | 'USD') => {
    if (toCountry === 'USA') {
      return `$${amount}`;
    } else {
      return `₹${amount}`;
    }
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
