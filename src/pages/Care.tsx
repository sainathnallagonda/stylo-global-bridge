
import { useState } from "react";
import { ArrowLeft, Heart, Clock, Star, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "@/contexts/LocationContext";
import { useToast } from "@/hooks/use-toast";
import CleanHeader from "@/components/navigation/CleanHeader";
import BackButton from "@/components/BackButton";

const Care = () => {
  const navigate = useNavigate();
  const { toCountry, getCurrencyDisplay } = useLocation();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const careServices = toCountry === 'USA' ? [
    {
      id: "c1",
      name: "Dr. Sarah Johnson",
      specialty: "General Physician",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop",
      rating: 4.8,
      experience: "15 years",
      price: 120,
      currency: "USD" as const,
      availability: "Available now",
      type: "consultation"
    },
    {
      id: "c2",
      name: "Home Nursing Care",
      specialty: "Registered Nurse",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=300&fit=crop",
      rating: 4.9,
      experience: "24/7 Care",
      price: 45,
      currency: "USD" as const,
      availability: "24/7 Available",
      type: "nursing"
    },
    {
      id: "c3",
      name: "Mental Health Support",
      specialty: "Licensed Therapist",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop",
      rating: 4.7,
      experience: "10 years",
      price: 150,
      currency: "USD" as const,
      availability: "Today 3 PM",
      type: "therapy"
    },
    {
      id: "c4",
      name: "Elderly Care",
      specialty: "Senior Care Specialist",
      image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=300&h=300&fit=crop",
      rating: 4.9,
      experience: "12 years",
      price: 35,
      currency: "USD" as const,
      availability: "Available",
      type: "elderly"
    }
  ] : [
    {
      id: "c1",
      name: "Dr. Priya Sharma",
      specialty: "General Physician",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop",
      rating: 4.8,
      experience: "15 years",
      price: 500,
      currency: "INR" as const,
      availability: "Available now",
      type: "consultation"
    },
    {
      id: "c2",
      name: "Home Nursing Care",
      specialty: "Registered Nurse",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=300&fit=crop",
      rating: 4.9,
      experience: "24/7 Care",
      price: 300,
      currency: "INR" as const,
      availability: "24/7 Available",
      type: "nursing"
    },
    {
      id: "c3",
      name: "Mental Health Support",
      specialty: "Licensed Therapist",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop",
      rating: 4.7,
      experience: "10 years",
      price: 800,
      currency: "INR" as const,
      availability: "Today 3 PM",
      type: "therapy"
    },
    {
      id: "c4",
      name: "Elderly Care",
      specialty: "Senior Care Specialist",
      image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=300&h=300&fit=crop",
      rating: 4.9,
      experience: "12 years",
      price: 250,
      currency: "INR" as const,
      availability: "Available",
      type: "elderly"
    }
  ];

  const filteredServices = careServices.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookService = (service: typeof careServices[0]) => {
    navigate("/payment", {
      state: {
        itemName: `${service.name} - ${service.specialty}`,
        price: service.price,
        currency: service.currency,
        details: {
          specialty: service.specialty,
          experience: service.experience,
          availability: service.availability,
          rating: service.rating
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-green-50">
      <CleanHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <BackButton fallbackPath="/" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Healthcare Services</h1>
            <p className="text-gray-600">Professional healthcare at your doorstep</p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border mb-6">
          <div className="relative max-w-2xl">
            <Heart className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-500 h-5 w-5" />
            <Input
              placeholder="Search for healthcare services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-4 text-lg rounded-2xl border-teal-200 focus:border-teal-400 focus:ring-teal-200"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden group">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300" 
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-gray-800">{service.rating}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {service.availability}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-1 text-gray-800 group-hover:text-teal-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-teal-600 text-sm font-medium mb-2">{service.specialty}</p>
                  <p className="text-gray-600 text-xs mb-4">{service.experience} experience</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
                      {getCurrencyDisplay(service.price, service.currency)}
                      <span className="text-sm text-gray-500 font-normal">/session</span>
                    </span>
                    <Button 
                      onClick={() => handleBookService(service)}
                      className="bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white rounded-xl px-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Book
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-sm border max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-600">Try adjusting your search term.</p>
            </div>
          </div>
        )}

        {/* Emergency Info */}
        <div className="mt-8 bg-red-50 rounded-xl p-6 border border-red-200">
          <h3 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Emergency Services
          </h3>
          <p className="text-sm text-red-700">
            For medical emergencies, call {toCountry === 'USA' ? '911' : '108'} immediately. 
            Our platform is for non-emergency healthcare services only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Care;
