
import { Calendar, MapPin, Star, User, Shield, Clock, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const companions = [
  {
    name: "Priya Sharma",
    route: "Delhi to New York (JFK)",
    date: "June 20, 2025",
    rating: 4.8,
    trips: 58,
    languages: "English, Hindi",
    image: "https://images.unsplash.com/photo-1494790108755-2616b96d4bb1?w=150&h=150&fit=crop&crop=face",
    badges: ["ID Verified", "Background Check", "Frequent Traveler"]
  },
  {
    name: "Michael Johnson", 
    route: "Chicago to Mumbai",
    date: "June 25, 2025",
    rating: 4.7,
    trips: 32,
    languages: "English",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    badges: ["ID Verified", "Background Check", "Medical Training"]
  },
  {
    name: "Rahul Patel",
    route: "Mumbai to San Francisco",
    date: "June 18, 2025", 
    rating: 5.0,
    trips: 41,
    languages: "English, Hindi, Gujarati",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    badges: ["ID Verified", "Background Check", "Super Companion"]
  }
];

const TravelCompanions = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Travel Companion
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find verified travel buddies for international flights between USA and India.
            Perfect for first-time travelers, elderly, or those needing assistance.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Travel Dates</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input placeholder="mm/dd/yyyy" className="pl-10 h-12" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Route</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>India to USA</option>
                  <option>USA to India</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferences</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Any Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>
            <div className="flex items-end">
              <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium">
                Find Companions
              </Button>
            </div>
          </div>
        </div>

        {/* Companions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {companions.map((companion, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={companion.image} 
                    alt={companion.name}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">{companion.name}</h3>
                    <div className="flex items-center mt-1">
                      <Star className="text-amber-400 fill-current h-4 w-4" />
                      <span className="text-sm text-gray-600 ml-1">
                        {companion.rating} ({companion.trips} trips)
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                    <span className="text-sm">{companion.route}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                    <span className="text-sm">{companion.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <User className="h-4 w-4 mr-2 text-blue-600" />
                    <span className="text-sm">Languages: {companion.languages}</span>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {companion.badges.map((badge, badgeIndex) => (
                    <span 
                      key={badgeIndex}
                      className={`text-xs px-2 py-1 rounded-full ${
                        badge === 'ID Verified' ? 'bg-green-100 text-green-700' :
                        badge === 'Background Check' ? 'bg-blue-100 text-blue-700' :
                        badge === 'Frequent Traveler' ? 'bg-purple-100 text-purple-700' :
                        badge === 'Medical Training' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => navigate('/travel')}
                >
                  Contact {companion.name.split(' ')[0]}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
            onClick={() => navigate('/travel')}
          >
            View All Companions
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TravelCompanions;
