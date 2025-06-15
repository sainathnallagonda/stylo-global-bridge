import { useState } from "react";
import { ArrowLeft, Search, Plus, Minus, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "@/contexts/LocationContext";

const Groceries = () => {
  const navigate = useNavigate();
  const { toCountry, getCurrencyDisplay } = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<{[key: number]: number}>({});

  const categories = [
    { id: 1, name: "Fruits & Vegetables", icon: "🥕" },
    { id: 2, name: "Dairy & Bakery", icon: "🥛" },
    { id: 3, name: "Snacks & Beverages", icon: "🥤" },
    { id: 4, name: "Personal Care", icon: "🧴" },
    { id: 5, name: "Household", icon: "🧽" },
    { id: 6, name: "Baby Care", icon: "👶" }
  ];

  const products = toCountry === 'USA' ? [
    {
      id: 1,
      name: "Fresh Bananas",
      image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=200&h=200&fit=crop&auto=format",
      price: 3,
      unit: "per bunch",
      category: "Fruits & Vegetables"
    },
    {
      id: 2,
      name: "Whole Milk",
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop&auto=format",
      price: 4,
      unit: "1 gallon",
      category: "Dairy & Bakery"
    },
    {
      id: 3,
      name: "Lay's Chips",
      image: "https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=200&h=200&fit=crop&auto=format",
      price: 2,
      unit: "per pack",
      category: "Snacks & Beverages"
    },
    {
      id: 4,
      name: "Colgate Toothpaste",
      image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=200&h=200&fit=crop&auto=format",
      price: 5,
      unit: "4oz tube",
      category: "Personal Care"
    }
  ] : [
    {
      id: 1,
      name: "Fresh Bananas",
      image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=200&h=200&fit=crop&auto=format",
      price: 40,
      unit: "per dozen",
      category: "Fruits & Vegetables"
    },
    {
      id: 2,
      name: "Amul Fresh Milk",
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop&auto=format",
      price: 25,
      unit: "500ml",
      category: "Dairy & Bakery"
    },
    {
      id: 3,
      name: "Lays Chips",
      image: "https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=200&h=200&fit=crop&auto=format",
      price: 20,
      unit: "per pack",
      category: "Snacks & Beverages"
    },
    {
      id: 4,
      name: "Colgate Toothpaste",
      image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=200&h=200&fit=crop&auto=format",
      price: 85,
      unit: "100g",
      category: "Personal Care"
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const updateCart = (productId: number, change: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + change)
    }));
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const partnerName = toCountry === 'USA' ? 'Instacart' : 'Zepto';
  const deliveryTime = toCountry === 'USA' ? '1-hour' : '10-minute';
  const locationName = toCountry === 'USA' ? 'New York' : 'Mumbai';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-800">Groceries</h1>
            </div>
            {getTotalItems() > 0 && (
              <div className="flex items-center gap-2 bg-purple-100 px-3 py-2 rounded-lg">
                <ShoppingCart className="h-4 w-4 text-purple-600" />
                <span className="text-purple-600 font-medium">{getTotalItems()} items</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="bg-purple-50 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-purple-700 font-medium">⚡ {deliveryTime} delivery to {locationName}</span>
            <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">
              Powered by {partnerName}
            </span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for groceries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === "All" ? "default" : "outline"}
              onClick={() => setSelectedCategory("All")}
              className="whitespace-nowrap"
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.name ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.name)}
                className="whitespace-nowrap"
              >
                {category.icon} {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                <p className="text-xs text-gray-600 mb-2">{product.unit}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">
                    {getCurrencyDisplay(product.price, toCountry === 'USA' ? 'USD' : 'INR')}
                  </span>
                  {cart[product.id] > 0 ? (
                    <div className="flex items-center gap-2 bg-purple-100 rounded-lg px-2 py-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6"
                        onClick={() => updateCart(product.id, -1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium">{cart[product.id]}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6"
                        onClick={() => updateCart(product.id, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => updateCart(product.id, 1)}
                      className="bg-purple-600 hover:bg-purple-700 text-xs px-3 py-1"
                    >
                      ADD
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Groceries;
