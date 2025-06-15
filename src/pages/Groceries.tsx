import { useState } from "react";
import { ArrowLeft, Search, Plus, Minus, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { id: 1, name: "Fruits & Vegetables", icon: "🥕" },
  { id: 2, name: "Dairy & Bakery", icon: "🥛" },
  { id: 3, name: "Snacks & Beverages", icon: "🥤" },
  { id: 4, name: "Personal Care", icon: "🧴" },
  { id: 5, name: "Household", icon: "🧽" },
  { id: 6, name: "Baby Care", icon: "👶" }
];

const products = [
  {
    id: 1,
    name: "Fresh Bananas",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&h=200&fit=crop",
    price: 40,
    unit: "per dozen",
    category: "Fruits & Vegetables"
  },
  {
    id: 2,
    name: "Amul Fresh Milk",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop",
    price: 25,
    unit: "500ml",
    category: "Dairy & Bakery"
  },
  {
    id: 3,
    name: "Lays Chips",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200&h=200&fit=crop",
    price: 20,
    unit: "per pack",
    category: "Snacks & Beverages"
  },
  {
    id: 4,
    name: "Colgate Toothpaste",
    image: "https://images.unsplash.com/photo-1585735428165-cdac1b7fb4b8?w=200&h=200&fit=crop",
    price: 85,
    unit: "100g",
    category: "Personal Care"
  }
];

const Groceries = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<{[key: number]: number}>({});

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Groceries
              </h1>
              <p className="text-gray-600 mt-2">
                Delivering to {toCountry === 'india' ? 'India via Zepto' : 'USA via Instacart'}
              </p>
            </div>
          </div>
          {getTotalItems() > 0 && (
            <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full shadow-lg">
              <ShoppingCart className="h-4 w-4 text-purple-600" />
              <span className="text-purple-600 font-medium">{getTotalItems()} items</span>
            </div>
          )}
        </div>

        {/* Delivery Info */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl p-4 mb-8 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="font-semibold flex items-center gap-2">
              ⚡ {toCountry === 'india' ? '10-minute delivery' : 'Same-day delivery'}
            </span>
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
              {toCountry === 'india' ? 'Powered by Zepto' : 'Powered by Instacart'}
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search for groceries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-3 bg-white/80 backdrop-blur-sm rounded-xl"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          <Button
            variant={selectedCategory === "All" ? "default" : "outline"}
            onClick={() => setSelectedCategory("All")}
            className="whitespace-nowrap rounded-full"
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.name ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.name)}
              className="whitespace-nowrap rounded-full"
            >
              {category.icon} {category.name}
            </Button>
          ))}
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 hover:-translate-y-1">
              <CardContent className="p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-xl mb-4 shadow-sm"
                />
                <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                <p className="text-xs text-gray-600 mb-3">{product.unit}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-green-600">
                    {formatPrice(product.price, false)}
                  </span>
                  {cart[product.id] > 0 ? (
                    <div className="flex items-center gap-2 bg-purple-100 rounded-xl px-3 py-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 hover:bg-purple-200"
                        onClick={() => updateCart(product.id, -1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium">{cart[product.id]}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 hover:bg-purple-200"
                        onClick={() => updateCart(product.id, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => updateCart(product.id, 1)}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-600 hover:to-purple-600 text-xs px-4 py-1 rounded-full"
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
      
      <Footer />
    </div>
  );
};

export default Groceries;
