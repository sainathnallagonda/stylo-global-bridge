import { ShoppingBag, Gift, Car, Coffee, Plane, Heart, Package, ArrowRight } from "lucide-react";
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
      description: `Order from top restaurants in USA or India and have it delivered to your loved ones' doorstep.`,
      price: getCurrencyDisplay(toCountry === 'USA' ? 15 : 299, toCountry === 'USA' ? 'USD' : 'INR'),
      route: "/food-delivery",
      color: "text-blue-600"
    },
    {
      icon: ShoppingBag,
      title: "Grocery Shopping",
      description: `Send essential groceries and household items to family members across borders.`,
      price: getCurrencyDisplay(toCountry === 'USA' ? 25 : 899, toCountry === 'USA' ? 'USD' : 'INR'),
      route: "/groceries",
      color: "text-blue-600"
    },
    {
      icon: Gift,
      title: "Gifts & Flowers",
      description: "Send thoughtful gifts, flowers, and personalized items for special occasions.",
      price: getCurrencyDisplay(toCountry === 'USA' ? 35 : 1499, toCountry === 'USA' ? 'USD' : 'INR'),
      route: "/gifts",
      color: "text-blue-600"
    },
    {
      icon: Car,
      title: "Ride Booking",
      description: `Book rides for your family members for airport pickups, appointments, or daily commutes.`,
      price: getCurrencyDisplay(toCountry === 'USA' ? 12 : 399, toCountry === 'USA' ? 'USD' : 'INR'),
      route: "/rides",
      color: "text-blue-600"
    },
    {
      icon: Plane,
      title: "Travel Companion",
      description: "Find verified travel buddies for international flights between USA and India.",
      price: getCurrencyDisplay(toCountry === 'USA' ? 50 : 2999, toCountry === 'USA' ? 'USD' : 'INR'),
      route: "/travel",
      color: "text-blue-600"
    },
    {
      icon: Heart,
      title: "Special Occasions",
      description: "Celebrate birthdays, anniversaries, and special days with cakes, decorations, and party supplies.",
      price: getCurrencyDisplay(toCountry === 'USA' ? 20 : 599, toCountry === 'USA' ? 'USD' : 'INR'),
      route: "/care",
      color: "text-blue-600"
    }
  ];

  const handleOrderNow = (route: string) => {
    navigate(route);
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Send anything from anywhere to your loved ones with just a few clicks,
            <br />
            regardless of where you are.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-white cursor-pointer"
              onClick={() => handleOrderNow(service.route)}
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4`}>
                  <service.icon className={`${service.color}`} size={24} />
                </div>
                
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-800">
                    Starting from {service.price}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-primary-blue hover:text-primary-blue-dark hover:bg-blue-50 p-2"
                  >
                    Explore
                    <ArrowRight size={16} className="ml-1" />
                  </Button>
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
