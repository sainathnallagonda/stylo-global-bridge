
import { ShoppingBag, Gift, Car, Coffee, Plane, Heart, ArrowRight, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useLocation } from "@/contexts/LocationContext";

const Services = () => {
  const navigate = useNavigate();
  const { toCountry, getCurrencyDisplay } = useLocation();

  const services = [
    {
      icon: Coffee,
      title: "Food Delivery",
      description: "Order from top restaurants in USA or India and have it delivered to your loved ones' doorstep.",
      price: getCurrencyDisplay(toCountry === 'USA' ? 15 : 299, toCountry === 'USA' ? 'USD' : 'INR'),
      route: "/food-delivery",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=250&fit=crop&auto=format",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      popular: true,
      rating: 4.8,
      deliveryTime: "30-45 min"
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
      popular: false,
      rating: 4.6,
      deliveryTime: "1-2 hours"
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
      popular: true,
      rating: 4.9,
      deliveryTime: "Same day"
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
      popular: false,
      rating: 4.7,
      deliveryTime: "10-15 min"
    },
    {
      icon: Plane,
      title: "Travel Companion",
      description: "Find verified travel buddies for international flights between USA and India.",
      price: getCurrencyDisplay(toCountry === 'USA' ? 50 : 2999, toCountry === 'USA' ? 'USD' : 'INR'),
      route: "/travel",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=250&fit=crop&auto=format",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      popular: false,
      rating: 4.5,
      deliveryTime: "Instant match"
    },
    {
      icon: Heart,
      title: "Special Occasions",
      description: "Celebrate birthdays, anniversaries, and special days with cakes, decorations, and party supplies.",
      price: getCurrencyDisplay(toCountry === 'USA' ? 20 : 599, toCountry === 'USA' ? 'USD' : 'INR'),
      route: "/care",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=250&fit=crop&auto=format",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      popular: true,
      rating: 4.8,
      deliveryTime: "24 hours"
    }
  ];

  const handleOrderNow = (route: string) => {
    navigate(route);
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Send anything from anywhere to your loved ones with just a few clicks, regardless of where you are.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-sm bg-white cursor-pointer overflow-hidden relative"
              onClick={() => handleOrderNow(service.route)}
            >
              {service.popular && (
                <Badge className="absolute top-4 right-4 z-10 bg-blue-600 hover:bg-blue-600">
                  Popular
                </Badge>
              )}
              
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl ${service.bgColor} flex items-center justify-center shadow-lg`}>
                  <service.icon className={service.iconColor} size={24} />
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {service.title}
                  </h3>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{service.rating}</span>
                  </div>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-600">{service.deliveryTime}</span>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Starting from</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {service.price}
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white group-hover:bg-blue-700"
                  >
                    Order Now
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Support Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
              <div className="text-sm text-gray-600">Cities Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">4.8★</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
