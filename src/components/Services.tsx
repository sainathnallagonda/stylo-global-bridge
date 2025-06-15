
import { ShoppingBag, Gift, Car, Coffee, Plane, Heart, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLocation } from "@/contexts/LocationContext";
import { useAuth } from "@/contexts/AuthContext";

const Services = () => {
  const navigate = useNavigate();
  const { toCountry, formatPrice } = useLocation();
  const { user } = useAuth();

  const baseServices = [
    {
      icon: Coffee,
      title: "Food Delivery",
      description: toCountry === 'india' 
        ? "Order from restaurants via Zomato for your loved ones" 
        : "Order from DoorDash, Uber Eats for your loved ones",
      price: 299,
      gradient: "from-orange-400 to-red-500",
      partner: toCountry === 'india' ? "Powered by Zomato" : "Powered by DoorDash",
      route: "/food-delivery"
    },
    {
      icon: ShoppingBag,
      title: "Groceries",
      description: toCountry === 'india' 
        ? "Fresh groceries delivered via Zepto in minutes" 
        : "Fresh groceries via Instacart, Amazon Fresh",
      price: 899,
      gradient: "from-green-400 to-blue-500",
      partner: toCountry === 'india' ? "Powered by Zepto" : "Powered by Instacart",
      route: "/groceries"
    },
    {
      icon: Gift,
      title: "Gifts & Cakes",
      description: toCountry === 'india' 
        ? "Surprise them with thoughtful gifts and fresh cakes" 
        : "Surprise them with Amazon gifts and local bakeries",
      price: 1499,
      gradient: "from-purple-400 to-pink-500",
      partner: "Curated Selection",
      route: "/gifts"
    },
    {
      icon: Car,
      title: "Ride Booking",
      description: toCountry === 'india' 
        ? "Book rides via Ola/Uber for safe travel" 
        : "Book rides via Uber/Lyft for safe travel",
      price: 399,
      gradient: "from-blue-400 to-indigo-500",
      partner: toCountry === 'india' ? "Powered by Ola & Uber" : "Powered by Uber & Lyft",
      route: "/rides"
    },
    {
      icon: Plane,
      title: "Travel Companions",
      description: "Find trusted travel buddies for international flights",
      price: 2999,
      gradient: "from-teal-400 to-cyan-500",
      partner: "Verified Network",
      route: "/travel"
    },
    {
      icon: Heart,
      title: "Care Services",
      description: toCountry === 'india' 
        ? "Wellness checks and care services for elderly" 
        : "Healthcare assistance and wellness checks",
      price: 599,
      gradient: "from-rose-400 to-red-500",
      partner: "Trusted Partners",
      route: "/care"
    }
  ];

  const handleOrderNow = (route: string) => {
    navigate(route);
  };

  const handleViewOrders = () => {
    if (user) {
      navigate('/orders');
    } else {
      navigate('/auth');
    }
  };

  return (
    <section id="services" className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
            All Services, One Platform
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything your loved ones need, delivered with love across borders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {baseServices.map((service, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-8 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className={`w-18 h-18 rounded-3xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <service.icon className="text-white" size={32} />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-3 leading-relaxed text-sm">
                  {service.description}
                </p>
                
                <p className="text-sm text-blue-600 font-medium mb-4 bg-blue-50 px-3 py-1 rounded-full inline-block">
                  {service.partner}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">
                    {formatPrice(service.price)}
                  </span>
                  <Button 
                    onClick={() => handleOrderNow(service.route)}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500 text-white border-0 rounded-full px-6 py-2 font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    Order Now →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Orders Section */}
        <div className="text-center">
          <Card className="max-w-md mx-auto bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white shadow-2xl">
            <CardContent className="p-8">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 mx-auto">
                <Package className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Track Your Orders</h3>
              <p className="text-white/90 mb-6">View all your orders and track their delivery status in real-time</p>
              <Button 
                onClick={handleViewOrders}
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                {user ? 'View Orders' : 'Login to View Orders'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;
