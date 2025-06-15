
import { useState } from "react";
import { ArrowLeft, Search, Star, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "@/contexts/LocationContext";

const FoodDelivery = () => {
  const navigate = useNavigate();
  const { toCountry, getCurrencyDisplay } = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const restaurants = toCountry === 'USA' ? [
    {
      id: 1,
      name: "McDonald's",
      image: "https://images.unsplash.com/photo-1552566090-a41d55113505?w=400&h=250&fit=crop&auto=format",
      rating: 4.2,
      deliveryTime: "20-30 min",
      cuisine: "Fast Food, Burgers",
      location: "New York, NY",
      priceForTwo: getCurrencyDisplay(25, 'USD')
    },
    {
      id: 2,
      name: "Chipotle Mexican Grill",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop&auto=format",
      rating: 4.5,
      deliveryTime: "15-25 min",
      cuisine: "Mexican, Bowls",
      location: "Manhattan, NY",
      priceForTwo: getCurrencyDisplay(18, 'USD')
    },
    {
      id: 3,
      name: "Pizza Hut",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=250&fit=crop&auto=format",
      rating: 4.0,
      deliveryTime: "30-40 min",
      cuisine: "Italian, Pizza",
      location: "Brooklyn, NY",
      priceForTwo: getCurrencyDisplay(22, 'USD')
    },
    {
      id: 4,
      name: "Subway",
      image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=250&fit=crop&auto=format",
      rating: 4.1,
      deliveryTime: "10-20 min",
      cuisine: "Sandwiches, Healthy",
      location: "Queens, NY",
      priceForTwo: getCurrencyDisplay(15, 'USD')
    }
  ] : [
    {
      id: 1,
      name: "Punjabi Dhaba",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop&auto=format",
      rating: 4.2,
      deliveryTime: "30-35 min",
      cuisine: "North Indian, Punjabi",
      location: "Mumbai Central",
      priceForTwo: getCurrencyDisplay(300, 'INR')
    },
    {
      id: 2,
      name: "South Spice",
      image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=250&fit=crop&auto=format",
      rating: 4.5,
      deliveryTime: "25-30 min",
      cuisine: "South Indian, Dosa",
      location: "Bandra West",
      priceForTwo: getCurrencyDisplay(250, 'INR')
    },
    {
      id: 3,
      name: "Pizza Corner",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=250&fit=crop&auto=format",
      rating: 4.0,
      deliveryTime: "35-40 min",
      cuisine: "Italian, Pizza",
      location: "Andheri East",
      priceForTwo: getCurrencyDisplay(400, 'INR')
    },
    {
      id: 4,
      name: "Biryani House",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d29c?w=400&h=250&fit=crop&auto=format",
      rating: 4.3,
      deliveryTime: "40-45 min",
      cuisine: "Biryani, Mughlai",
      location: "Powai",
      priceForTwo: getCurrencyDisplay(350, 'INR')
    }
  ];

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const partnerName = toCountry === 'USA' ? 'DoorDash' : 'Zomato';
  const locationName = toCountry === 'USA' ? 'New York, USA' : 'Mumbai, India';

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-orange-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="hover:bg-orange-100 rounded-full"
            >
              <ArrowLeft className="h-5 w-5 text-orange-600" />
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Food Delivery
            </h1>
          </div>
        </div>
      </div>

      {/* Search and Location */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-orange-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="h-5 w-5 text-red-500" />
            <span className="text-gray-700 font-medium">Delivering to {locationName}</span>
            <div className="ml-auto bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
              Powered by {partnerName}
            </div>
          </div>
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for restaurants, cuisines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-4 text-lg rounded-2xl border-orange-200 focus:border-orange-400 focus:ring-orange-200"
            />
          </div>
        </div>
      </div>

      {/* Restaurant List */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {filteredRestaurants.length} restaurants found
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRestaurants.map((restaurant) => (
            <Card key={restaurant.id} className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm cursor-pointer group overflow-hidden">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {restaurant.rating}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Fast Delivery
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-orange-600 transition-colors">
                    {restaurant.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
                  <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {restaurant.location}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-orange-500" />
                      {restaurant.deliveryTime}
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      {restaurant.priceForTwo} for two
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Order Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodDelivery;
