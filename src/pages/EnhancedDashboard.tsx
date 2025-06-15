
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "@/contexts/LocationContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import ServiceCard from "@/components/dashboard/ServiceCard";
import OrderTracker from "@/components/dashboard/OrderTracker";
import WalletCard from "@/components/dashboard/WalletCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Gift, Car, Coffee, Plane, Heart, MapPin, Star } from "lucide-react";

const EnhancedDashboard = () => {
  const { user } = useAuth();
  const { toCountry, getCurrencyDisplay } = useLocation();
  const [recommendations, setRecommendations] = useState([]);

  const services = [
    {
      icon: Coffee,
      title: "Food Delivery",
      description: "Order from top restaurants and have it delivered to your loved ones' doorstep.",
      price: getCurrencyDisplay(toCountry === 'USA' ? 15 : 299, toCountry === 'USA' ? 'USD' : 'INR'),
      route: "/food-delivery",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=250&fit=crop&auto=format",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      rating: 4.8,
      popular: true
    },
    {
      icon: ShoppingBag,
      title: "Grocery Shopping",
      description: "Send essential groceries and household items to family members across borders.",
      price: getCurrencyDisplay(toCountry === 'USA' ? 25 : 899, toCountry === 'USA' ? 'USD' : 'INR'),
      route: "/groceries",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=250&fit=crop&auto=format",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      rating: 4.6
    },
    {
      icon: Gift,
      title: "Gifts & Flowers",
      description: "Send thoughtful gifts, flowers, and personalized items for special occasions.",
      price: getCurrencyDisplay(toCountry === 'USA' ? 35 : 1499, toCountry === 'USA' ? 'USD' : 'INR'),
      route: "/gifts",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop&auto=format",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
      rating: 4.9
    },
    {
      icon: Car,
      title: "Ride Booking",
      description: "Book rides for your family members for airport pickups, appointments, or daily commutes.",
      price: getCurrencyDisplay(toCountry === 'USA' ? 12 : 399, toCountry === 'USA' ? 'USD' : 'INR'),
      route: "/rides",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=250&fit=crop&auto=format",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      rating: 4.7
    }
  ];

  const mockOrders = [
    {
      id: "1",
      title: "Food Delivery - Pizza Palace",
      status: "processing",
      progress: 65,
      estimatedDelivery: "Tomorrow, 2:30 PM"
    },
    {
      id: "2", 
      title: "Gift - Birthday Flowers",
      status: "shipped",
      progress: 85,
      estimatedDelivery: "Today, 6:00 PM"
    },
    {
      id: "3",
      title: "Groceries - Weekly Essentials",
      status: "delivered",
      progress: 100,
      estimatedDelivery: "Delivered"
    }
  ];

  const locationBasedRecommendations = toCountry === 'USA' ? [
    { name: "Whole Foods Market", type: "Groceries", rating: 4.8, distance: "0.8 miles" },
    { name: "Local Pizza Co.", type: "Food", rating: 4.6, distance: "1.2 miles" },
    { name: "Flower Shop NYC", type: "Gifts", rating: 4.9, distance: "0.5 miles" }
  ] : [
    { name: "Big Bazaar", type: "Groceries", rating: 4.5, distance: "2 km" },
    { name: "Domino's Pizza", type: "Food", rating: 4.3, distance: "1.5 km" },
    { name: "Ferns N Petals", type: "Gifts", rating: 4.7, distance: "3 km" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <div className="pt-20 flex">
        <DashboardSidebar />
        
        <div className="flex-1 p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome back, {user?.email?.split('@')[0]}! 👋
            </h1>
            <p className="text-gray-600">Manage your care packages and services for loved ones</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Active Orders</p>
                    <p className="text-3xl font-bold">3</p>
                  </div>
                  <ShoppingBag className="h-8 w-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Completed</p>
                    <p className="text-3xl font-bold">28</p>
                  </div>
                  <Gift className="h-8 w-8 text-green-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Travel Buddies</p>
                    <p className="text-3xl font-bold">5</p>
                  </div>
                  <Plane className="h-8 w-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
            
            <WalletCard />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Services Section */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Heart className="h-6 w-6 text-red-500" />
                Order Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {services.map((service, index) => (
                  <ServiceCard key={index} {...service} />
                ))}
              </div>

              {/* Location-based Recommendations */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    Recommended for {toCountry}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {locationBasedRecommendations.map((rec, index) => (
                      <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div>
                          <h4 className="font-medium">{rec.name}</h4>
                          <p className="text-sm text-gray-600">{rec.type} • {rec.distance}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{rec.rating}</span>
                          </div>
                          <Badge variant="outline">Popular</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              <OrderTracker orders={mockOrders} />
              
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <button className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
                    <div className="font-medium">Reorder Last Purchase</div>
                    <div className="text-sm text-gray-600">Pizza Palace - $28.50</div>
                  </button>
                  <button className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
                    <div className="font-medium">Schedule Weekly Groceries</div>
                    <div className="text-sm text-gray-600">Set up recurring orders</div>
                  </button>
                  <button className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
                    <div className="font-medium">Find Travel Companion</div>
                    <div className="text-sm text-gray-600">For your next trip</div>
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EnhancedDashboard;
