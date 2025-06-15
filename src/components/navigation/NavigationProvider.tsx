
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationContextType {
  goBack: () => void;
  canGoBack: boolean;
  navigationHistory: string[];
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['/']);
  const navigate = useNavigate();

  const goBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop(); // Remove current page
      const previousPage = newHistory[newHistory.length - 1];
      setNavigationHistory(newHistory);
      navigate(previousPage);
    } else {
      navigate('/');
    }
  };

  const canGoBack = navigationHistory.length > 1;

  return (
    <NavigationContext.Provider value={{ goBack, canGoBack, navigationHistory }}>
      {children}
    </NavigationContext.Provider>
  );
};
