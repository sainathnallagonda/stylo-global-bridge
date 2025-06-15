
import { useState } from "react";
import { ArrowLeft, Plane, Calendar, Users, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "@/contexts/LocationContext";

const Travel = () => {
  const navigate = useNavigate();
  const { fromCountry, toCountry, getCurrencyDisplay } = useLocation();

  const travelCompanions = [
    {
      id: 1,
      name: "Priya Sharma",
      route: `${fromCountry} → ${toCountry}`,
      date: "June 20, 2024",
      airline: "Emirates",
      verified: true,
      rating: 4.8,
      trips: 15,
      price: fromCountry === 'India' ? 2500 : 35,
      bio: "Experienced traveler, always happy to help with customs and connections."
    },
    {
      id: 2,
      name: "John Davis",
      route: `${fromCountry} → ${toCountry}`,
      date: "June 22, 2024",
      airline: "British Airways",
      verified: true,
      rating: 4.9,
      trips: 23,
      price: fromCountry === 'India' ? 2000 : 30,
      bio: "Business traveler who can assist with document guidance."
    },
    {
      id: 3,
      name: "Sarah Wilson",
      route: `${fromCountry} → ${toCountry}`,
      date: "June 25, 2024",
      airline: "Air India",
      verified: true,
      rating: 4.7,
      trips: 12,
      price: fromCountry === 'India' ? 1800 : 25,
      bio: "Friendly companion, great for first-time travelers."
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
            <h1 className="text-2xl font-bold text-gray-800">Travel Companions</h1>
          </div>
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5" />
              <Input placeholder="From" className="pl-10" defaultValue={fromCountry} readOnly />
            </div>
            <div className="relative">
              <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 h-5 w-5" />
              <Input placeholder="To" className="pl-10" defaultValue={toCountry} readOnly />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input placeholder="Travel date" className="pl-10" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Available Travel Companions</h2>
          <div className="text-sm text-gray-600 bg-teal-50 px-3 py-1 rounded-full">
            Verified Network
          </div>
        </div>

        <div className="space-y-6">
          {travelCompanions.map((companion) => (
            <Card key={companion.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {companion.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold">{companion.name}</h3>
                        {companion.verified && (
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{companion.route}</p>
                      <p className="text-sm text-gray-500 mb-2">{companion.airline} • {companion.date}</p>
                      <p className="text-sm text-gray-700 mb-3">{companion.bio}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{companion.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span>{companion.trips} trips</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-teal-600 mb-2">
                      {getCurrencyDisplay(companion.price, fromCountry === 'India' ? 'INR' : 'USD')}
                    </p>
                    <Button className="bg-teal-600 hover:bg-teal-700">
                      Connect
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

export default Travel;
