
import { useState } from "react";
import { ArrowLeft, MapPin, Clock, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "@/contexts/LocationContext";

const Rides = () => {
  const navigate = useNavigate();
  const { toCountry, getCurrencyDisplay } = useLocation();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const rideOptions = toCountry === 'USA' ? [
    {
      id: 1,
      type: "UberX",
      time: "5 min",
      price: 12,
      seats: 4,
      description: "Affordable rides for everyday use"
    },
    {
      id: 2,
      type: "Lyft",
      time: "7 min",
      price: 10,
      seats: 4,
      description: "Friendly rides at great prices"
    },
    {
      id: 3,
      type: "Uber Comfort",
      time: "8 min",
      price: 18,
      seats: 4,
      description: "Newer cars with extra legroom"
    }
  ] : [
    {
      id: 1,
      type: "Ola Mini",
      time: "5 min",
      price: 120,
      seats: 4,
      description: "Affordable rides for everyday use"
    },
    {
      id: 2,
      type: "Uber Go",
      time: "7 min",
      price: 150,
      seats: 4,
      description: "Reliable rides at budget prices"
    },
    {
      id: 3,
      type: "Ola Prime",
      time: "8 min",
      price: 200,
      seats: 4,
      description: "Comfortable sedans for a premium experience"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Book a Ride</h1>
          </div>
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
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
                placeholder="Where to?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pl-10 py-3"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <h2 className="text-lg font-semibold mb-4">Choose a ride</h2>
        <div className="space-y-4">
          {rideOptions.map((ride) => (
            <Card key={ride.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Car className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{ride.type}</h3>
                      <p className="text-gray-600 text-sm">{ride.description}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {ride.time}
                        </span>
                        <span>{ride.seats} seats</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      {getCurrencyDisplay(ride.price, toCountry === 'USA' ? 'USD' : 'INR')}
                    </p>
                    <Button size="sm" className="mt-2">
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rides;
