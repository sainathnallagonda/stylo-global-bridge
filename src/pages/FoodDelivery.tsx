
import { useState } from "react";
import { ArrowLeft, Search, Star, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const restaurants = [
  {
    id: 1,
    name: "Punjabi Dhaba",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop",
    rating: 4.2,
    deliveryTime: "30-35 min",
    cuisine: "North Indian, Punjabi",
    location: "Mumbai Central",
    priceForTwo: "₹300"
  },
  {
    id: 2,
    name: "South Spice",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=250&fit=crop",
    rating: 4.5,
    deliveryTime: "25-30 min",
    cuisine: "South Indian, Dosa",
    location: "Bandra West",
    priceForTwo: "₹250"
  },
  {
    id: 3,
    name: "Pizza Corner",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=250&fit=crop",
    rating: 4.0,
    deliveryTime: "35-40 min",
    cuisine: "Italian, Pizza",
    location: "Andheri East",
    priceForTwo: "₹400"
  },
  {
    id: 4,
    name: "Burger Junction",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=250&fit=crop",
    rating: 4.1,
    deliveryTime: "20-25 min",
    cuisine: "American, Burgers",
    location: "Powai",
    priceForTwo: "₹350"
  }
];

const FoodDelivery = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Food Delivery</h1>
          </div>
        </div>
      </div>

      {/* Search and Location */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-red-500" />
            <span className="text-gray-700">Delivering to Mumbai, India</span>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for restaurants, cuisines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>
        </div>
      </div>

      {/* Restaurant List */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {filteredRestaurants.length} restaurants found
          </h2>
          <div className="text-sm text-gray-600 bg-orange-50 px-3 py-1 rounded-full">
            Powered by Zomato
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Card key={restaurant.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-medium flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    {restaurant.rating}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{restaurant.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
                  <p className="text-gray-500 text-sm mb-3">{restaurant.location}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {restaurant.deliveryTime}
                    </div>
                    <div className="text-sm text-gray-600">
                      {restaurant.priceForTwo} for two
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-red-500 hover:bg-red-600">
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
