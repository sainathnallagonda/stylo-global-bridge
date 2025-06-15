
import { useState } from "react";
import { ArrowLeft, Plane, Calendar, MapPin, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "@/contexts/LocationContext";
import { useToast } from "@/hooks/use-toast";
import CleanHeader from "@/components/navigation/CleanHeader";
import BackButton from "@/components/BackButton";

const Travel = () => {
  const navigate = useNavigate();
  const { toCountry, getCurrencyDisplay } = useLocation();
  const { toast } = useToast();
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    departure: "",
    passengers: "1"
  });

  const flightOffers = toCountry === 'USA' ? [
    {
      id: "f1",
      airline: "American Airlines",
      from: "New York",
      to: "Los Angeles",
      departure: "08:30",
      arrival: "11:45",
      duration: "5h 15m",
      price: 299,
      currency: "USD" as const,
      stops: "Direct"
    },
    {
      id: "f2",
      airline: "Delta",
      from: "Chicago",
      to: "Miami",
      departure: "14:20",
      arrival: "18:30",
      duration: "3h 10m",
      price: 189,
      currency: "USD" as const,
      stops: "Direct"
    },
    {
      id: "f3",
      airline: "United",
      from: "San Francisco",
      to: "Seattle",
      departure: "11:15",
      arrival: "13:45",
      duration: "2h 30m",
      price: 149,
      currency: "USD" as const,
      stops: "Direct"
    }
  ] : [
    {
      id: "f1",
      airline: "IndiGo",
      from: "Delhi",
      to: "Mumbai",
      departure: "09:30",
      arrival: "11:45",
      duration: "2h 15m",
      price: 4500,
      currency: "INR" as const,
      stops: "Direct"
    },
    {
      id: "f2",
      airline: "Air India",
      from: "Bangalore",
      to: "Chennai",
      departure: "15:20",
      arrival: "16:30",
      duration: "1h 10m",
      price: 3200,
      currency: "INR" as const,
      stops: "Direct"
    },
    {
      id: "f3",
      airline: "SpiceJet",
      from: "Pune",
      to: "Goa",
      departure: "12:15",
      arrival: "13:45",
      duration: "1h 30m",
      price: 2800,
      currency: "INR" as const,
      stops: "Direct"
    }
  ];

  const handleBookFlight = (flight: typeof flightOffers[0]) => {
    navigate("/payment", {
      state: {
        itemName: `${flight.airline} Flight`,
        price: flight.price,
        currency: flight.currency,
        details: {
          from: flight.from,
          to: flight.to,
          departure: flight.departure,
          arrival: flight.arrival,
          duration: flight.duration,
          passengers: searchData.passengers
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <CleanHeader />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <BackButton fallbackPath="/" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Flight Booking</h1>
            <p className="text-gray-600">Find and book your perfect flight</p>
          </div>
        </div>

        {/* Search Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5" />
              <Input
                placeholder="From"
                value={searchData.from}
                onChange={(e) => setSearchData(prev => ({ ...prev, from: e.target.value }))}
                className="pl-12 py-3 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
              <Input
                placeholder="To"
                value={searchData.to}
                onChange={(e) => setSearchData(prev => ({ ...prev, to: e.target.value }))}
                className="pl-12 py-3 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                type="date"
                value={searchData.departure}
                onChange={(e) => setSearchData(prev => ({ ...prev, departure: e.target.value }))}
                className="pl-12 py-3 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200"
              />
            </div>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <select
                value={searchData.passengers}
                onChange={(e) => setSearchData(prev => ({ ...prev, passengers: e.target.value }))}
                className="w-full pl-12 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-blue-200 bg-white"
              >
                <option value="1">1 Passenger</option>
                <option value="2">2 Passengers</option>
                <option value="3">3 Passengers</option>
                <option value="4">4 Passengers</option>
              </select>
            </div>
          </div>
        </div>

        {/* Flight Results */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Flights</h2>
          {flightOffers.map((flight) => (
            <Card key={flight.id} className="hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <Plane className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">{flight.airline}</p>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{flight.departure}</p>
                        <p className="text-sm text-gray-600">{flight.from}</p>
                      </div>
                      <div className="text-center px-4">
                        <p className="text-sm text-gray-500">{flight.duration}</p>
                        <div className="w-20 h-px bg-gray-300 my-2"></div>
                        <p className="text-xs text-gray-500">{flight.stops}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{flight.arrival}</p>
                        <p className="text-sm text-gray-600">{flight.to}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent mb-2">
                      {getCurrencyDisplay(flight.price, flight.currency)}
                    </div>
                    <Button 
                      onClick={() => handleBookFlight(flight)}
                      className="bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white rounded-xl px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Book Flight
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Travel Tips */}
        <div className="mt-8 bg-sky-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Travel Tips</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Check-in online 24 hours before departure</li>
            <li>• Arrive at airport 2 hours early for domestic flights</li>
            <li>• Keep your ID and boarding pass handy</li>
            <li>• Check baggage allowance before packing</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Travel;
