
import { ShoppingBag, Gift, Car, Coffee, Plane, Heart, Package, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useLocation } from "@/contexts/LocationContext";

const Services = () => {
  const navigate = useNavigate();
  const { toCountry, getCurrencyDisplay } = useLocation();

  const services = [
    {
      icon: Coffee,
      title: "Food Delivery",
      description: `Order from restaurants via ${toCountry === 'USA' ? 'DoorDash/Uber Eats' : 'Zomato'} for your loved ones`,
      price: getCurrencyDisplay(toCountry === 'USA' ? 15 : 299, toCountry === 'USA' ? 'USD' : 'INR'),
      gradient: "from-orange-400 via-red-400 to-pink-500",
      iconBg: "bg-gradient-to-br from-orange-500 to-red-500",
      partner: `Powered by ${toCountry === 'USA' ? 'DoorDash' : 'Zomato'}`,
      route: "/food-delivery",
      hoverColor: "hover:shadow-orange-200"
    },
    {
      icon: ShoppingBag,
      title: "Groceries",
      description: `Fresh groceries delivered via ${toCountry === 'USA' ? 'Instacart' : 'Zepto'} in minutes`,
      price: getCurrencyDisplay(toCountry === 'USA' ? 25 : 899, toCountry === 'USA' ? 'USD' : 'INR'),
      gradient: "from-green-400 via-emerald-400 to-teal-500",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-500",
      partner: `Powered by ${toCountry === 'USA' ? 'Instacart' : 'Zepto'}`,
      route: "/groceries",
      hoverColor: "hover:shadow-green-200"
    },
    {
      icon: Gift,
      title: "Gifts & Cakes",
      description: "Surprise them with thoughtful gifts and fresh cakes",
      price: getCurrencyDisplay(toCountry === 'USA' ? 35 : 1499, toCountry === 'USA' ? 'USD' : 'INR'),
      gradient: "from-purple-400 via-pink-400 to-rose-500",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
      partner: "Curated Selection",
      route: "/gifts",
      hoverColor: "hover:shadow-purple-200"
    },
    {
      icon: Car,
      title: "Ride Booking",
      description: `Book rides via ${toCountry === 'USA' ? 'Uber/Lyft' : 'Ola/Uber'} for safe travel`,
      price: getCurrencyDisplay(toCountry === 'USA' ? 12 : 399, toCountry === 'USA' ? 'USD' : 'INR'),
      gradient: "from-blue-400 via-cyan-400 to-indigo-500",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
      partner: `Powered by ${toCountry === 'USA' ? 'Uber & Lyft' : 'Ola & Uber'}`,
      route: "/rides",
      hoverColor: "hover:shadow-blue-200"
    },
    {
      icon: Plane,
      title: "Travel Companions",
      description: "Find trusted travel buddies for international flights",
      price: getCurrencyDisplay(toCountry === 'USA' ? 50 : 2999, toCountry === 'USA' ? 'USD' : 'INR'),
      gradient: "from-teal-400 via-cyan-400 to-blue-500",
      iconBg: "bg-gradient-to-br from-teal-500 to-cyan-500",
      partner: "Verified Network",
      route: "/travel",
      hoverColor: "hover:shadow-teal-200"
    },
    {
      icon: Heart,
      title: "Care Services",
      description: "Wellness checks and care services for elderly",
      price: getCurrencyDisplay(toCountry === 'USA' ? 20 : 599, toCountry === 'USA' ? 'USD' : 'INR'),
      gradient: "from-rose-400 via-pink-400 to-red-500",
      iconBg: "bg-gradient-to-br from-rose-500 to-pink-500",
      partner: "Trusted Partners",
      route: "/care",
      hoverColor: "hover:shadow-rose-200"
    },
    {
      icon: Package,
      title: "Orders",
      description: "Track all your orders and delivery status",
      price: "Free",
      gradient: "from-indigo-400 via-purple-400 to-violet-500",
      iconBg: "bg-gradient-to-br from-indigo-500 to-purple-500",
      partner: "Real-time Tracking",
      route: "/orders",
      hoverColor: "hover:shadow-indigo-200"
    }
  ];

  const handleOrderNow = (route: string) => {
    navigate(route);
  };

  return (
    <section id="services" className="py-24 px-4 bg-gradient-to-b from-transparent via-white/50 to-purple-50/30">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-purple-200/50 rounded-full px-6 py-2 mb-6">
            <Star className="w-4 h-4 text-purple-600" />
            <span className="text-purple-700 font-medium">Premium Services</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              All Services
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              One Platform
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Everything your loved ones need, delivered with care across borders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg bg-white/80 backdrop-blur-sm ${service.hoverColor} cursor-pointer overflow-hidden`}
              onClick={() => handleOrderNow(service.route)}
            >
              <CardContent className="p-8 relative">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${service.gradient}`}></div>
                </div>
                
                <div className={`w-18 h-18 rounded-3xl ${service.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <service.icon className="text-white" size={32} />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-purple-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-3 leading-relaxed text-sm">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                  <p className="text-sm text-purple-600 font-medium">{service.partner}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {service.price}
                  </span>
                  <div className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors group-hover:gap-3 group-hover:translate-x-1 transition-all duration-300">
                    <span className="text-sm">
                      {service.title === 'Orders' ? 'View Orders' : 'Order Now'}
                    </span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
