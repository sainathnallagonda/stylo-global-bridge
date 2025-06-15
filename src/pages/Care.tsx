
import { useState } from "react";
import { ArrowLeft, Heart, Clock, Phone, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "@/contexts/LocationContext";

const Care = () => {
  const navigate = useNavigate();
  const { toCountry, getCurrencyDisplay } = useLocation();

  const careServices = toCountry === 'USA' ? [
    {
      id: 1,
      name: "Wellness Check",
      description: "Regular health and wellness visits",
      duration: "30 min",
      price: 25,
      features: ["Vital signs check", "Medication reminder", "General wellness"],
      icon: Heart,
      available: "Today"
    },
    {
      id: 2,
      name: "Companion Care",
      description: "Social companionship and light assistance",
      duration: "2 hours",
      price: 45,
      features: ["Conversation", "Light housekeeping", "Meal preparation"],
      icon: Phone,
      available: "Tomorrow"
    },
    {
      id: 3,
      name: "Emergency Response",
      description: "24/7 emergency response service",
      duration: "Ongoing",
      price: 35,
      features: ["24/7 monitoring", "Emergency contacts", "Medical alert"],
      icon: Shield,
      available: "Immediate"
    }
  ] : [
    {
      id: 1,
      name: "Wellness Check",
      description: "Regular health and wellness visits",
      duration: "30 min",
      price: 500,
      features: ["Vital signs check", "Medication reminder", "General wellness"],
      icon: Heart,
      available: "Today"
    },
    {
      id: 2,
      name: "Companion Care",
      description: "Social companionship and light assistance",
      duration: "2 hours",
      price: 800,
      features: ["Conversation", "Light housekeeping", "Meal preparation"],
      icon: Phone,
      available: "Tomorrow"
    },
    {
      id: 3,
      name: "Emergency Response",
      description: "24/7 emergency response service",
      duration: "Ongoing",
      price: 1200,
      features: ["24/7 monitoring", "Emergency contacts", "Medical alert"],
      icon: Shield,
      available: "Immediate"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Care Services</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Caring for Your Loved Ones</h2>
          <p className="text-gray-600">Professional care services to ensure their health and happiness</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-red-500 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <div className="space-y-2 mb-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{service.duration}</span>
                    </div>
                    <span className="text-sm text-green-600 font-medium">Available {service.available}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-rose-600">
                      {getCurrencyDisplay(service.price, toCountry === 'USA' ? 'USD' : 'INR')}
                    </span>
                    <Button className="bg-rose-500 hover:bg-rose-600">
                      Book Service
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Trusted Partners</h3>
            <p className="text-gray-600">All our care providers are background-checked, trained professionals with years of experience in elderly care and health services.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Care;
