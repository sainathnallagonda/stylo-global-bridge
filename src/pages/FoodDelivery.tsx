
import { useState, useEffect } from "react";
import { ArrowLeft, Search, Star, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "@/contexts/LocationContext";
import { supabase } from "@/integrations/supabase/client";

interface VendorFood {
  id: string;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  image_url: string | null;
  category: string;
  is_available: boolean;
  preparation_time: number;
  vendor_id: string;
  profiles?: {
    full_name: string;
  };
}

const FoodDelivery = () => {
  const navigate = useNavigate();
  const { toCountry, getCurrencyDisplay } = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [vendorFoods, setVendorFoods] = useState<VendorFood[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendorFoods();
  }, []);

  const fetchVendorFoods = async () => {
    try {
      const { data, error } = await supabase
        .from('vendor_foods')
        .select(`
          *,
          profiles:vendor_id(full_name)
        `)
        .eq('is_available', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVendorFoods(data || []);
    } catch (error) {
      console.error('Error fetching vendor foods:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fallback data for when no vendor foods are available
  const fallbackRestaurants = toCountry === 'USA' ? [
    {
      id: 1,
      name: "McDonald's",
      image: "https://images.unsplash.com/photo-1552566090-a52406b9d330?w=400&h=250&fit=crop&auto=format",
      rating: 4.2,
      deliveryTime: "20-30 min",
      cuisine: "Fast Food, Burgers",
      location: "New York, NY",
      priceForTwo: getCurrencyDisplay(25, 'USD'),
      avgPrice: 25,
      currency: "USD" as const
    },
    {
      id: 2,
      name: "Chipotle Mexican Grill",
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=250&fit=crop&auto=format",
      rating: 4.5,
      deliveryTime: "15-25 min",
      cuisine: "Mexican, Bowls",
      location: "Manhattan, NY",
      priceForTwo: getCurrencyDisplay(18, 'USD'),
      avgPrice: 18,
      currency: "USD" as const
    }
  ] : [
    {
      id: 1,
      name: "Punjabi Dhaba",
      image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=250&fit=crop&auto=format",
      rating: 4.2,
      deliveryTime: "30-35 min",
      cuisine: "North Indian, Punjabi",
      location: "Mumbai Central",
      priceForTwo: getCurrencyDisplay(300, 'INR'),
      avgPrice: 300,
      currency: "INR" as const
    }
  ];

  const filteredVendorFoods = vendorFoods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    food.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    food.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const partnerName = toCountry === 'USA' ? 'DoorDash' : 'Zomato';
  const locationName = toCountry === 'USA' ? 'New York, USA' : 'Mumbai, India';

  const handleOrderNow = (food: VendorFood) => {
    navigate("/payment", {
      state: {
        itemName: food.name,
        price: food.price,
        currency: food.currency
      }
    });
  };

  const handleFallbackOrderNow = (restaurant: typeof fallbackRestaurants[0]) => {
    navigate("/payment", {
      state: {
        itemName: `Food from ${restaurant.name}`,
        price: restaurant.avgPrice,
        currency: restaurant.currency
      }
    });
  };

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
              placeholder="Search for food items, categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-4 text-lg rounded-2xl border-orange-200 focus:border-orange-400 focus:ring-orange-200"
            />
          </div>
        </div>
      </div>

      {/* Food List */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading food items...</p>
          </div>
        ) : (
          <>
            {filteredVendorFoods.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {filteredVendorFoods.length} items available from vendors
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {filteredVendorFoods.map((food) => (
                    <Card key={food.id} className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm cursor-pointer group overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden">
                          <img
                            src={food.image_url || "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop&auto=format"}
                            alt={food.name}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            4.5
                          </div>
                          <div className="absolute bottom-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                            Available
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-orange-600 transition-colors">
                            {food.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">{food.description}</p>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{food.category}</Badge>
                            {food.profiles?.full_name && (
                              <Badge variant="secondary">by {food.profiles.full_name}</Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Clock className="h-4 w-4 text-orange-500" />
                              {food.preparation_time} min
                            </div>
                            <div className="text-lg font-bold text-orange-600">
                              {food.currency} {food.price}
                            </div>
                          </div>
                          <Button 
                            onClick={() => handleOrderNow(food)}
                            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            Order Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : null}

            {/* Fallback restaurants */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                {filteredVendorFoods.length === 0 ? 'Featured restaurants' : 'More restaurants'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fallbackRestaurants.map((restaurant) => (
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
                      <Button 
                        onClick={() => handleFallbackOrderNow(restaurant)}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Order Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FoodDelivery;
