
import { useState } from "react";
import { ArrowLeft, MapPin, Car, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "@/contexts/LocationContext";
import { useToast } from "@/hooks/use-toast";
import CleanHeader from "@/components/navigation/CleanHeader";
import BackButton from "@/components/BackButton";

const Rides = () => {
  const navigate = useNavigate();
  const { toCountry, getCurrencyDisplay } = useLocation();
  const { toast } = useToast();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const rideOptions = toCountry === 'USA' ? [
    {
      id: "r1",
      name: "Economy",
      description: "Affordable rides",
      price: 12.50,
      currency: "USD" as const,
      eta: "5 min",
      capacity: "4 passengers",
      icon: "🚗"
    },
    {
      id: "r2",
      name: "Premium",
      description: "Comfortable rides",
      price: 18.75,
      currency: "USD" as const,
      eta: "3 min",
      capacity: "4 passengers",
      icon: "🚙"
    },
    {
      id: "r3",
      name: "XL",
      description: "Extra space",
      price: 25.00,
      currency: "USD" as const,
      eta: "8 min",
      capacity: "6 passengers",
      icon: "🚐"
    }
  ] : [
    {
      id: "r1",
      name: "Auto",
      description: "Quick & affordable",
      price: 85,
      currency: "INR" as const,
      eta: "3 min",
      capacity: "3 passengers",
      icon: "🛺"
    },
    {
      id: "r2",
      name: "Cab",
      description: "Comfortable rides",
      price: 150,
      currency: "INR" as const,
      eta: "5 min",
      capacity: "4 passengers",
      icon: "🚗"
    },
    {
      id: "r3",
      name: "Bike",
      description: "Quick delivery",
      price: 45,
      currency: "INR" as const,
      eta: "2 min",
      capacity: "1 passenger",
      icon: "🏍️"
    }
  ];

  const handleBookRide = (ride: typeof rideOptions[0]) => {
    if (!pickup || !destination) {
      toast({
        title: "Location Required",
        description: "Please enter pickup and destination locations",
        variant: "destructive"
      });
      return;
    }

    navigate("/payment", {
      state: {
        itemName: `${ride.name} Ride`,
        price: ride.price,
        currency: ride.currency,
        details: {
          pickup,
          destination,
          eta: ride.eta,
          capacity: ride.capacity
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <CleanHeader />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <BackButton fallbackPath="/" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Book a Ride</h1>
            <p className="text-gray-600">Get a ride to your destination</p>
          </div>
        </div>

        {/* Location Inputs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border mb-6">
          <div className="space-y-4">
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 h-5 w-5" />
              <Input
                placeholder="Enter pickup location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="pl-12 py-4 text-lg rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
              <Input
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pl-12 py-4 text-lg rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200"
              />
            </div>
          </div>
        </div>

        {/* Ride Options */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose your ride</h2>
          {rideOptions.map((ride) => (
            <Card key={ride.id} className="hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{ride.icon}</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{ride.name}</h3>
                      <p className="text-gray-600 text-sm">{ride.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {ride.eta}
                        </div>
                        <div className="flex items-center gap-1">
                          <Car className="h-4 w-4" />
                          {ride.capacity}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      {getCurrencyDisplay(ride.price, ride.currency)}
                    </div>
                    <Button 
                      onClick={() => handleBookRide(ride)}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl px-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Ride Information</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• All rides include GPS tracking for your safety</li>
            <li>• Cancel within 5 minutes for no charge</li>
            <li>• Drivers are verified and rated by customers</li>
            <li>• 24/7 customer support available</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Rides;
