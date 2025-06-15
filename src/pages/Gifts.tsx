
import { useState } from "react";
import { ArrowLeft, Search, Star, Truck, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "@/contexts/LocationContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Gifts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { toCountry, formatPrice } = useLocation();

  const gifts = [
    {
      id: 1,
      name: "Birthday Chocolate Cake",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop",
      price: 899,
      rating: 4.8,
      deliveryTime: "2-3 hours",
      category: "Cakes"
    },
    {
      id: 2,
      name: "Fresh Flower Bouquet",
      image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=300&h=300&fit=crop",
      price: 1299,
      rating: 4.7,
      deliveryTime: "1-2 hours",
      category: "Flowers"
    },
    {
      id: 3,
      name: "Premium Gift Hamper",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&h=300&fit=crop",
      price: 2499,
      rating: 4.9,
      deliveryTime: "Same day",
      category: "Hampers"
    }
  ];

  const filteredGifts = gifts.filter(gift =>
    gift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gift.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Gifts & Cakes
            </h1>
            <p className="text-gray-600 mt-2">
              Delivering to {toCountry === 'india' ? 'India' : 'USA'}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search gifts and cakes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/80 backdrop-blur-sm"
          />
        </div>

        {/* Gift Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGifts.map((gift) => (
            <Card key={gift.id} className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 hover:-translate-y-2">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={gift.image}
                    alt={gift.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-medium flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    {gift.rating}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{gift.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{gift.category}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Truck className="h-4 w-4" />
                      {gift.deliveryTime}
                    </div>
                    <span className="text-lg font-bold text-purple-600">
                      {formatPrice(gift.price)}
                    </span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 rounded-full">
                    <Gift className="h-4 w-4 mr-2" />
                    Send Gift
                  </Button>
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

export default Gifts;
