
import { ShoppingBag, Gift, Car, Coffee, Plane, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Coffee,
    title: "Food Delivery",
    description: "Order from restaurants in USA/India for your loved ones",
    price: "₹299 ($3.59)",
    gradient: "from-orange-400 to-red-500"
  },
  {
    icon: ShoppingBag,
    title: "Groceries",
    description: "Fresh groceries delivered to their doorstep",
    price: "₹899 ($10.79)",
    gradient: "from-green-400 to-blue-500"
  },
  {
    icon: Gift,
    title: "Gifts & Cakes",
    description: "Surprise them with thoughtful gifts and fresh cakes",
    price: "₹1,499 ($17.99)",
    gradient: "from-purple-400 to-pink-500"
  },
  {
    icon: Car,
    title: "Ride Booking",
    description: "Book rides for safe and comfortable travel",
    price: "₹399 ($4.79)",
    gradient: "from-blue-400 to-indigo-500"
  },
  {
    icon: Plane,
    title: "Travel Companions",
    description: "Find trusted travel buddies for international flights",
    price: "₹2,999 ($35.99)",
    gradient: "from-teal-400 to-cyan-500"
  },
  {
    icon: Heart,
    title: "Care Services",
    description: "Wellness checks and care services for elderly",
    price: "₹599 ($7.19)",
    gradient: "from-rose-400 to-red-500"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            All Services, One Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything your loved ones need, delivered with care across borders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{service.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">{service.price}</span>
                  <button className="text-orange-500 hover:text-orange-600 font-medium transition-colors">
                    Order Now →
                  </button>
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
