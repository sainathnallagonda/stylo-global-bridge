
import { useState, useEffect } from "react";
import { ShoppingBag, Gift, Car, Coffee, Plane, Heart, ArrowRight, Star, Clock, Bookmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useLocation } from "@/contexts/LocationContext";
import SkeletonCard from "@/components/ui/skeleton-card";

const Services = () => {
  const navigate = useNavigate();
  const { toCountry, getCurrencyDisplay } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = (serviceTitle: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(serviceTitle)) {
      newFavorites.delete(serviceTitle);
    } else {
      newFavorites.add(serviceTitle);
    }
    setFavorites(newFavorites);
  };

  const services = [
    {
      icon: Coffee,
      title: "Food Delivery",
      description: "Order from top restaurants in USA or India and have it delivered to your loved ones' doorstep with real-time tracking.",
      price: getCurrencyDisplay(toCountry === 'USA' ? 15 : 299, toCountry === 'USA' ? 'USD' : 'INR'),
      originalPrice: getCurrencyDisplay(toCountry === 'USA' ? 20 : 399, toCountry === 'USA' ? 'USD' : 'INR'),
      route: "/food-delivery",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=250&fit=crop&auto=format",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      popular: true,
      rating: 4.8,
      deliveryTime: "30-45 min",
      discount: "25% OFF"
    },
    {
      icon: ShoppingBag,
      title: "Grocery Shopping",
      description: "Send essential groceries and household items to family members across borders with fresh quality guarantee.",
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
      description: "Send thoughtful gifts, flowers, and personalized items for special occasions with custom message cards.",
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
      description: "Book reliable rides for your family members for airport pickups, appointments, or daily commutes with trusted drivers.",
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
      description: "Find verified and experienced travel buddies for safe international flights between USA and India.",
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
      description: "Celebrate birthdays, anniversaries, and special days with cakes, decorations, and party supplies delivered fresh.",
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
    <section id="services-section" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 animate-fade-in">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in">
            Send anything from anywhere to your loved ones with just a few clicks, regardless of where you are.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : (
            services.map((service, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-white cursor-pointer overflow-hidden relative transform hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => handleOrderNow(service.route)}
              >
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  {service.popular && (
                    <Badge className="bg-blue-600 hover:bg-blue-600 animate-pulse shadow-lg">
                      Popular
                    </Badge>
                  )}
                  {service.discount && (
                    <Badge className="bg-red-500 hover:bg-red-500 text-white shadow-lg">
                      {service.discount}
                    </Badge>
                  )}
                </div>

                {/* Favorite Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(service.title);
                  }}
                >
                  <Bookmark 
                    className={`h-4 w-4 ${
                      favorites.has(service.title) 
                        ? 'fill-blue-600 text-blue-600' 
                        : 'text-gray-600'
                    }`} 
                  />
                </Button>
                
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl ${service.bgColor} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className={service.iconColor} size={24} />
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 font-medium">{service.rating}</span>
                    </div>
                    <span className="text-sm text-gray-400">•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{service.deliveryTime}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Starting from</div>
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold text-gray-900">
                          {service.price}
                        </div>
                        {service.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            {service.originalPrice}
                          </div>
                        )}
                      </div>
                    </div>
                    <Button 
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white group-hover:bg-blue-700 transform group-hover:translate-x-1 transition-all duration-300 shadow-lg"
                    >
                      Order Now
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">50K+</div>
              <div className="text-sm text-gray-600">Orders Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">4.8★</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-gray-600">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">2</div>
              <div className="text-sm text-gray-600">Countries Served</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
