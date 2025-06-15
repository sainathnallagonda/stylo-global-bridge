
import { Calendar, MapPin, Star, User, Shield, Clock, Award, Filter, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const companions = [
  {
    name: "Priya Sharma",
    route: "Delhi to New York (JFK)",
    date: "June 20, 2025",
    rating: 4.8,
    trips: 58,
    languages: "English, Hindi",
    purpose: "First-time assistance",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    badges: ["ID Verified", "Background Check", "Frequent Traveler"],
    experience: "Helps with customs, connecting flights, and cultural transition"
  },
  {
    name: "Michael Johnson", 
    route: "Chicago to Mumbai",
    date: "June 25, 2025",
    rating: 4.7,
    trips: 32,
    languages: "English",
    purpose: "Business travel",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    badges: ["ID Verified", "Background Check", "Medical Training"],
    experience: "Business traveler with medical training, great for elderly passengers"
  },
  {
    name: "Rahul Patel",
    route: "Mumbai to San Francisco",
    date: "June 18, 2025", 
    rating: 5.0,
    trips: 41,
    languages: "English, Hindi, Gujarati",
    purpose: "Family visits",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    badges: ["ID Verified", "Background Check", "Super Companion"],
    experience: "Specializes in family travel assistance and cultural guidance"
  }
];

const TravelCompanions = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    travelDate: "",
    route: "India to USA",
    gender: "Any Gender",
    language: "Any Language",
    purpose: "Any Purpose"
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleFindCompanions = () => {
    const searchParams = new URLSearchParams({
      date: preferences.travelDate,
      route: preferences.route,
      gender: preferences.gender,
      language: preferences.language,
      purpose: preferences.purpose,
      search: searchQuery
    });
    navigate(`/travel?${searchParams.toString()}`);
  };

  const filteredCompanions = companions.filter(companion => {
    const matchesSearch = searchQuery === "" || 
      companion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      companion.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      companion.languages.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRoute = preferences.route === "Any Route" || 
      (preferences.route === "India to USA" && companion.route.includes("to")) ||
      (preferences.route === "USA to India" && companion.route.includes("to"));
    
    return matchesSearch && matchesRoute;
  });

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Find Your Travel Companion
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connect with verified travel buddies for international flights. Perfect for first-time travelers, 
            elderly passengers, or anyone needing assistance during their journey.
          </p>
        </div>

        {/* Enhanced Search Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                placeholder="Search by name, route, or language..." 
                className="pl-10 h-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid md:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Travel Dates</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input 
                    type="date"
                    className="pl-10 h-10"
                    value={preferences.travelDate}
                    onChange={(e) => setPreferences(prev => ({ ...prev, travelDate: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Route</label>
                <select 
                  className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  value={preferences.route}
                  onChange={(e) => setPreferences(prev => ({ ...prev, route: e.target.value }))}
                >
                  <option>Any Route</option>
                  <option>India to USA</option>
                  <option>USA to India</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select 
                  className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  value={preferences.language}
                  onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                >
                  <option>Any Language</option>
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Gujarati</option>
                  <option>Tamil</option>
                  <option>Telugu</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Purpose</label>
                <select 
                  className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  value={preferences.purpose}
                  onChange={(e) => setPreferences(prev => ({ ...prev, purpose: e.target.value }))}
                >
                  <option>Any Purpose</option>
                  <option>First-time assistance</option>
                  <option>Business travel</option>
                  <option>Family visits</option>
                  <option>Medical support</option>
                  <option>Cultural guidance</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select 
                  className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  value={preferences.gender}
                  onChange={(e) => setPreferences(prev => ({ ...prev, gender: e.target.value }))}
                >
                  <option>Any Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8"
              onClick={handleFindCompanions}
            >
              Find Travel Companions
            </Button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-8 text-center">
          <p className="text-gray-600">
            Found <span className="font-semibold text-blue-600">{filteredCompanions.length}</span> travel companions
            {searchQuery && <span> matching "{searchQuery}"</span>}
          </p>
        </div>

        {/* Enhanced Companions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredCompanions.map((companion, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white overflow-hidden">
              <CardContent className="p-0">
                {/* Header with Image and Basic Info */}
                <div className="relative h-24 bg-gradient-to-r from-blue-500 to-purple-600">
                  <img 
                    src={companion.image} 
                    alt={companion.name}
                    className="absolute bottom-0 left-6 w-20 h-20 rounded-full border-4 border-white object-cover transform translate-y-1/2"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center bg-white/90 rounded-full px-2 py-1">
                      <Star className="text-amber-400 fill-current h-4 w-4" />
                      <span className="text-sm font-semibold ml-1">{companion.rating}</span>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="pt-12 p-6">
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 text-xl mb-1">{companion.name}</h3>
                    <p className="text-sm text-gray-500">{companion.trips} successful trips</p>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0" />
                      <span className="text-sm">{companion.route}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0" />
                      <span className="text-sm">{companion.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <User className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0" />
                      <span className="text-sm">Speaks: {companion.languages}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Award className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0" />
                      <span className="text-sm">{companion.purpose}</span>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-600 italic">"{companion.experience}"</p>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1 mb-4">
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
                    onClick={handleFindCompanions}
                  >
                    Connect with {companion.name.split(' ')[0]}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
            onClick={handleFindCompanions}
          >
            View All Companions
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TravelCompanions;
