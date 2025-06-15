
import { ArrowLeftRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/contexts/LocationContext";

const CountrySelector = () => {
  const { fromCountry, toCountry, toggleDirection } = useLocation();

  const countryData = {
    usa: {
      name: "USA",
      flag: "https://flagcdn.com/w40/us.png",
      gradient: "from-blue-500 to-red-500"
    },
    india: {
      name: "India",
      flag: "https://flagcdn.com/w40/in.png",
      gradient: "from-orange-500 to-green-500"
    }
  };

  return (
    <div className="flex items-center justify-center gap-6 mb-8">
      <div className="flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl border border-white/20">
        <div className="flex items-center gap-3">
          <img 
            src={countryData[fromCountry].flag} 
            alt={countryData[fromCountry].name} 
            className="w-10 h-7 rounded-md shadow-sm" 
          />
          <div>
            <p className="font-semibold text-gray-800">{countryData[fromCountry].name}</p>
            <p className="text-xs text-gray-600 flex items-center gap-1">
              <MapPin size={12} />
              From
            </p>
          </div>
        </div>

        <Button
          onClick={toggleDirection}
          variant="outline"
          size="icon"
          className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-0 text-white hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
        >
          <ArrowLeftRight size={16} />
        </Button>

        <div className="flex items-center gap-3">
          <img 
            src={countryData[toCountry].flag} 
            alt={countryData[toCountry].name} 
            className="w-10 h-7 rounded-md shadow-sm" 
          />
          <div>
            <p className="font-semibold text-gray-800">{countryData[toCountry].name}</p>
            <p className="text-xs text-gray-600 flex items-center gap-1">
              <MapPin size={12} />
              To
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountrySelector;
