
import { useState } from "react";
import { ArrowLeft, Search, Heart, Star, Gift as GiftIcon } from "lucide-react";
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
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=300&h=300&fit=crop&auto=format",
      price: 45,
      category: "Flowers",
      rating: 4.8,
      delivery: "Same day",
      currency: "USD" as const
    },
    {
      id: 2,
      name: "Chocolate Cake",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop&auto=format",
      price: 35,
      category: "Cakes",
      rating: 4.6,
      delivery: "2 hours",
      currency: "USD" as const
    },
    {
      id: 3,
      name: "Teddy Bear",
      image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=300&h=300&fit=crop&auto=format",
      price: 25,
      category: "Soft Toys",
      rating: 4.7,
      delivery: "Next day",
      currency: "USD" as const
    },
    {
      id: 4,
      name: "Wine & Chocolates",
      image: "https://images.unsplash.com/photo-1549007164-93e8ac5e4a8e?w=300&h=300&fit=crop&auto=format",
      price: 65,
      category: "Gift Hampers",
      rating: 4.9,
      delivery: "Same day",
      currency: "USD" as const
    }
  ] : [
    {
      id: 1,
      name: "Red Rose Bouquet",
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=300&h=300&fit=crop&auto=format",
      price: 1200,
      category: "Flowers",
      rating: 4.8,
      delivery: "Same day",
      currency: "INR" as const
    },
    {
      id: 2,
      name: "Chocolate Cake",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop&auto=format",
      price: 899,
      category: "Cakes",
      rating: 4.6,
      delivery: "2 hours",
      currency: "INR" as const
    },
    {
      id: 3,
      name: "Teddy Bear",
      image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=300&h=300&fit=crop&auto=format",
      price: 799,
      category: "Soft Toys",
      rating: 4.7,
      delivery: "Next day",
      currency: "INR" as const
    },
    {
      id: 4,
      name: "Sweets Box",
      image: "https://images.unsplash.com/photo-1601039641847-7857b994d704?w=300&h=300&fit=crop&auto=format",
      price: 1499,
      category: "Traditional Sweets",
      rating: 4.5,
      delivery: "Same day",
      currency: "INR" as const
    }
  ];

  const filteredGifts = gifts.filter(gift =>
    gift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gift.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendGift = (gift: typeof gifts[0]) => {
    navigate("/payment", {
      state: {
        itemName: gift.name,
        price: gift.price,
        currency: gift.currency
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-pink-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="hover:bg-pink-100 rounded-full">
              <ArrowLeft className="h-5 w-5 text-pink-600" />
            </Button>
            <div className="flex items-center gap-3">
              <GiftIcon className="h-7 w-7 text-pink-600" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Gifts & Cakes
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-pink-100">
        <div className="container mx-auto px-4 py-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for gifts, cakes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-4 text-lg rounded-2xl border-pink-200 focus:border-pink-400 focus:ring-pink-200"
            />
          </div>
        </div>
      </div>

      {/* Gifts Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGifts.map((gift) => (
            <Card key={gift.id} className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm cursor-pointer group overflow-hidden">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={gift.image} 
                    alt={gift.name} 
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300" 
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-gray-800">{gift.rating}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {gift.delivery}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-pink-600 transition-colors">
                    {gift.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 bg-gray-100 px-3 py-1 rounded-full inline-block">
                    {gift.category}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      {getCurrencyDisplay(gift.price, gift.currency)}
                    </span>
                    <Button 
                      onClick={() => handleSendGift(gift)}
                      className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl px-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Heart className="h-4 w-4 mr-2" />
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
