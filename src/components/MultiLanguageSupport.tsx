
import { useState, createContext, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Check } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface Translation {
  [key: string]: string;
}

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (code: string) => void;
  translate: (key: string) => string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' }
];

const translations: { [key: string]: Translation } = {
  en: {
    welcome: 'Welcome',
    foodDelivery: 'Food Delivery',
    groceries: 'Groceries',
    gifts: 'Gifts & Flowers',
    rides: 'Ride Booking',
    orderNow: 'Order Now',
    viewDetails: 'View Details',
    addToCart: 'Add to Cart',
    checkout: 'Checkout',
    total: 'Total',
    delivery: 'Delivery',
    pickup: 'Pickup',
    orderTracking: 'Order Tracking',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    reviews: 'Reviews',
    rating: 'Rating'
  },
  hi: {
    welcome: 'स्वागत है',
    foodDelivery: 'खाना डिलीवरी',
    groceries: 'किराना',
    gifts: 'उपहार और फूल',
    rides: 'राइड बुकिंग',
    orderNow: 'अभी ऑर्डर करें',
    viewDetails: 'विवरण देखें',
    addToCart: 'कार्ट में जोड़ें',
    checkout: 'चेकआउट',
    total: 'कुल',
    delivery: 'डिलीवरी',
    pickup: 'पिकअप',
    orderTracking: 'ऑर्डर ट्रैकिंग',
    profile: 'प्रोफ़ाइल',
    settings: 'सेटिंग्स',
    logout: 'लॉगआउट',
    search: 'खोजें',
    filter: 'फ़िल्टर',
    sort: 'सॉर्ट',
    reviews: 'समीक्षाएं',
    rating: 'रेटिंग'
  },
  es: {
    welcome: 'Bienvenido',
    foodDelivery: 'Entrega de Comida',
    groceries: 'Comestibles',
    gifts: 'Regalos y Flores',
    rides: 'Reservar Viaje',
    orderNow: 'Ordenar Ahora',
    viewDetails: 'Ver Detalles',
    addToCart: 'Agregar al Carrito',
    checkout: 'Finalizar Compra',
    total: 'Total',
    delivery: 'Entrega',
    pickup: 'Recoger',
    orderTracking: 'Seguimiento de Pedido',
    profile: 'Perfil',
    settings: 'Configuración',
    logout: 'Cerrar Sesión',
    search: 'Buscar',
    filter: 'Filtrar',
    sort: 'Ordenar',
    reviews: 'Reseñas',
    rating: 'Calificación'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const setLanguage = (code: string) => {
    setCurrentLanguage(code);
    localStorage.setItem('preferredLanguage', code);
  };

  const translate = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

interface LanguageSelectorProps {
  showFlags?: boolean;
  compact?: boolean;
}

const LanguageSelector = ({ showFlags = true, compact = false }: LanguageSelectorProps) => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [showLanguages, setShowLanguages] = useState(false);

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  if (compact) {
    return (
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowLanguages(!showLanguages)}
          className="flex items-center gap-2"
        >
          {showFlags && <span>{currentLang?.flag}</span>}
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLang?.name}</span>
        </Button>

        {showLanguages && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => {
                    setLanguage(language.code);
                    setShowLanguages(false);
                  }}
                  className={`w-full flex items-center gap-3 p-2 rounded hover:bg-gray-100 text-left ${
                    currentLanguage === language.code ? 'bg-blue-50 text-blue-600' : ''
                  }`}
                >
                  {showFlags && <span>{language.flag}</span>}
                  <div className="flex-1">
                    <div className="font-medium">{language.nativeName}</div>
                    <div className="text-xs text-gray-500">{language.name}</div>
                  </div>
                  {currentLanguage === language.code && (
                    <Check className="h-4 w-4 text-blue-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="h-5 w-5 text-blue-600" />
          <h3 className="font-medium">Select Language</h3>
          <Badge variant="outline" className="ml-auto">
            {languages.length} languages
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => setLanguage(language.code)}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                currentLanguage === language.code
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {showFlags && <span className="text-xl">{language.flag}</span>}
              <div className="flex-1">
                <div className="font-medium">{language.nativeName}</div>
                <div className="text-sm text-gray-500">{language.name}</div>
              </div>
              {currentLanguage === language.code && (
                <Check className="h-4 w-4 text-blue-600" />
              )}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LanguageSelector;
