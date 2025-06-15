
import { Plane, Users, Star, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const companions = [
  {
    name: "Priya Sharma",
    route: "Delhi → New York",
    date: "March 15, 2024",
    rating: 4.9,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1494790108755-2616b96d4bb1?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "John Miller",
    route: "Los Angeles → Mumbai",
    date: "March 18, 2024",
    rating: 4.8,
    reviews: 93,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Anita Patel",
    route: "Chicago → Bangalore",
    date: "March 22, 2024",
    rating: 5.0,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  }
];

const TravelCompanions = () => {
  return (
    <section id="travel" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            Travel Companions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find trusted travel buddies for your international journeys between India and USA
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {companions.map((companion, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={companion.image} 
                    alt={companion.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800">{companion.name}</h3>
                    <div className="flex items-center">
                      <Star className="text-yellow-400 fill-current" size={16} />
                      <span className="text-sm text-gray-600 ml-1">
                        {companion.rating} ({companion.reviews})
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center text-gray-600 mb-2">
                    <Plane size={16} className="mr-2" />
                    <span className="text-sm font-medium">{companion.route}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm">{companion.date}</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600">
                  Connect
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
            <Users className="mr-2" size={20} />
            View All Companions
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TravelCompanions;
