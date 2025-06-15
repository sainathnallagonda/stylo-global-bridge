
import { useState } from "react";
import { ArrowLeft, Search, ShoppingCart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "@/contexts/LocationContext";
import { useAppState } from "@/contexts/AppStateContext";
import { useToast } from "@/hooks/use-toast";
import FavoriteButton from "@/components/FavoriteButton";
import CleanHeader from "@/components/navigation/CleanHeader";
import BackButton from "@/components/BackButton";

const Groceries = () => {
  const navigate = useNavigate();
  const { toCountry, getCurrencyDisplay } = useLocation();
  const { addToCart } = useAppState();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const groceries = toCountry === 'USA' ? [
    {
      id: "g1",
      name: "Fresh Bananas",
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop",
      price: 2.99,
      category: "Fruits",
      rating: 4.5,
      currency: "USD" as const,
      unit: "per lb"
    },
    {
      id: "g2", 
      name: "Organic Milk",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop",
      price: 4.99,
      category: "Dairy",
      rating: 4.8,
      currency: "USD" as const,
      unit: "1 gallon"
    },
    {
      id: "g3",
      name: "Whole Wheat Bread",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop",
      price: 3.49,
      category: "Bakery",
      rating: 4.3,
      currency: "USD" as const,
      unit: "per loaf"
    },
    {
      id: "g4",
      name: "Fresh Eggs",
      image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&h=300&fit=crop",
      price: 3.99,
      category: "Dairy",
      rating: 4.7,
      currency: "USD" as const,
      unit: "dozen"
    }
  ] : [
    {
      id: "g1",
      name: "Fresh Bananas",
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop",
      price: 60,
      category: "Fruits",
      rating: 4.5,
      currency: "INR" as const,
      unit: "per kg"
    },
    {
      id: "g2",
      name: "Fresh Milk",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop",
      price: 65,
      category: "Dairy", 
      rating: 4.8,
      currency: "INR" as const,
      unit: "1 liter"
    },
    {
      id: "g3",
      name: "Wheat Bread",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop",
      price: 40,
      category: "Bakery",
      rating: 4.3,
      currency: "INR" as const,
      unit: "per loaf"
    },
    {
      id: "g4",
      name: "Farm Eggs",
      image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&h=300&fit=crop",
      price: 120,
      category: "Dairy",
      rating: 4.7,
      currency: "INR" as const,
      unit: "dozen"
    }
  ];

  const filteredGroceries = groceries.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (item: typeof groceries[0]) => {
    try {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        currency: item.currency,
        image_url: item.image,
        category: item.category,
        description: `${item.unit}`,
        vendor_id: "grocery-store",
        is_available: true,
        preparation_time: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        delivery_radius: 10,
        vendor_location: null,
        service_areas: []
      });
      
      toast({
        title: "Added to Cart",
        description: `${item.name} has been added to your cart`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <CleanHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <BackButton fallbackPath="/" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Groceries</h1>
            <p className="text-gray-600">Fresh groceries delivered to your door</p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border mb-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for groceries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-4 text-lg rounded-2xl border-green-200 focus:border-green-400 focus:ring-green-200"
            />
          </div>
        </div>

        {/* Groceries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGroceries.map((item) => (
            <Card key={item.id} className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden group">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300" 
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-gray-800">{item.rating}</span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <FavoriteButton item={item} serviceType="groceries" className="bg-white/90 backdrop-blur-sm rounded-full" />
                  </div>
                  <div className="absolute bottom-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {item.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-green-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{item.unit}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      {getCurrencyDisplay(item.price, item.currency)}
                    </span>
                    <Button 
                      onClick={() => handleAddToCart(item)}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl px-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGroceries.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-sm border max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No groceries found</h3>
              <p className="text-gray-600">Try adjusting your search term.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Groceries;
