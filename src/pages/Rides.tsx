
import { useState } from "react";
import { ArrowLeft, MapPin, Clock, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "@/contexts/LocationContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Rides = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const { toCountry, formatPrice } = useLocation();

  const rideOptions = [
    {
      id: 1,
      type: "Economy",
      provider: toCountry === 'india' ? 'Ola' : 'Uber',
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=200&h=150&fit=crop",
      price: 299,
      eta: "5-8 min",
      capacity: "4 seats"
    },
    {
      id: 2,
      type: "Premium",
      provider: toCountry === 'india' ? 'Ola' : 'Lyft',
      image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=200&h=150&fit=crop",
      price: 599,
      eta: "3-5 min",
      capacity: "4 seats"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />
      
      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Book a Ride
            </h1>
            <p className="text-gray-600 mt-2">
              Reliable rides in {toCountry === 'india' ? 'India' : 'USA'}
            </p>
          </div>
        </div>

        {/* Location Inputs */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-5 w-5" />
                <Input
                  placeholder="Pickup location"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="pl-10 py-3"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
                <Input
                  placeholder="Destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pl-10 py-3"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ride Options */}
        <div className="space-y-4">
          {rideOptions.map((ride) => (
            <Card key={ride.id} className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 cursor-pointer hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={ride.image}
                      alt={ride.type}
                      className="w-16 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{ride.type}</h3>
                      <p className="text-gray-600 text-sm">via {ride.provider}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {ride.eta}
                        </span>
                        <span className="flex items-center gap-1">
                          <Car className="h-3 w-3" />
                          {ride.capacity}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-600 mb-2">
                      {formatPrice(ride.price)}
                    </div>
                    <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 rounded-full">
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Rides;
