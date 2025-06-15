
import { ArrowLeft, Heart, Phone, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "@/contexts/LocationContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Care = () => {
  const navigate = useNavigate();
  const { toCountry, formatPrice } = useLocation();

  const careServices = [
    {
      id: 1,
      name: "Wellness Check Call",
      description: "Regular phone calls to check on your loved ones",
      price: 299,
      icon: Phone,
      duration: "30 min call"
    },
    {
      id: 2,
      name: "Medical Appointment Companion",
      description: "Accompany to doctor visits and provide updates",
      price: 899,
      icon: Calendar,
      duration: "2-3 hours"
    },
    {
      id: 3,
      name: "Emergency Support",
      description: "24/7 emergency contact and coordination",
      price: 1499,
      icon: Heart,
      duration: "Monthly plan"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-50">
      <Header />
      
      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
              Care Services
            </h1>
            <p className="text-gray-600 mt-2">
              Professional care services in {toCountry === 'india' ? 'India' : 'USA'}
            </p>
          </div>
        </div>

        {/* Care Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careServices.map((service) => (
            <Card key={service.id} className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <service.icon className="text-white" size={28} />
                </div>
                <h3 className="font-bold text-xl mb-3">{service.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                <div className="text-sm text-gray-500 mb-4">{service.duration}</div>
                <div className="text-2xl font-bold text-rose-600 mb-6">
                  {formatPrice(service.price)}
                </div>
                <Button className="w-full bg-gradient-to-r from-rose-500 to-red-500 hover:from-red-500 hover:to-rose-500 rounded-full">
                  Book Service
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Care;
