
import { useState } from "react";
import { ArrowLeft, Search, Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "@/contexts/LocationContext";

const Gifts = () => {
  const navigate = useNavigate();
  const { toCountry, getCurrencyDisplay } = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const gifts = toCountry === 'USA' ? [
    {
      id: 1,
      name: "Red Rose Bouquet",
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=300&h=300&fit=crop",
      price: 45,
      category: "Flowers",
      rating: 4.8,
      delivery: "Same day"
    },
    {
      id: 2,
      name: "Chocolate Cake",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop",
      price: 35,
      category: "Cakes",
      rating: 4.6,
      delivery: "2 hours"
    },
    {
      id: 3,
      name: "Teddy Bear",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop",
      price: 25,
      category: "Soft Toys",
      rating: 4.7,
      delivery: "Next day"
    }
  ] : [
    {
      id: 1,
      name: "Red Rose Bouquet",
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=300&h=300&fit=crop",
      price: 1200,
      category: "Flowers",
      rating: 4.8,
      delivery: "Same day"
    },
    {
      id: 2,
      name: "Chocolate Cake",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop",
      price: 899,
      category: "Cakes",
      rating: 4.6,
      delivery: "2 hours"
    },
    {
      id: 3,
      name: "Teddy Bear",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop",
      price: 799,
      category: "Soft Toys",
      rating: 4.7,
      delivery: "Next day"
    }
  ];

  const filteredGifts = gifts.filter(gift =>
    gift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gift.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Gifts & Cakes</h1>
          </div>
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for gifts, cakes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGifts.map((gift) => (
            <Card key={gift.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-0">
                <div className="relative">
                  <img src={gift.image} alt={gift.name} className="w-full h-48 object-cover rounded-t-lg" />
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{gift.rating}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{gift.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{gift.category}</p>
                  <p className="text-gray-500 text-sm mb-3">Delivery: {gift.delivery}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-pink-600">
                      {getCurrencyDisplay(gift.price, toCountry === 'USA' ? 'USD' : 'INR')}
                    </span>
                    <Button className="bg-pink-500 hover:bg-pink-600">
                      <Heart className="h-4 w-4 mr-1" />
                      Send Gift
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

export default Gifts;
