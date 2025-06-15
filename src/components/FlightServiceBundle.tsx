
import { useState } from "react";
import { Calendar, MapPin, User, Plane, Package, Car, Home } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocation } from "@/contexts/LocationContext";
import { useNavigate } from "react-router-dom";

const FlightServiceBundle = () => {
  const { fromCountry, toCountry, getCurrencyDisplay } = useLocation();
  const navigate = useNavigate();
  
  const [flightDetails, setFlightDetails] = useState({
    arrivalDate: "",
    arrivalTime: "",
    flightNumber: "",
    airport: ""
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const bundleServices = [
    {
      id: "airport-pickup",
      icon: Car,
      title: "Airport Pickup",
      description: "Professional driver for airport pickup and drop-off",
      price: toCountry === 'USA' ? 45 : 1899,
      duration: "1-2 hours"
    },
    {
      id: "home-essentials",
      icon: Home,
      title: "Home Essentials Kit",
      description: "Basic groceries, toiletries, and household items delivered before arrival",
      price: toCountry === 'USA' ? 75 : 2999,
      duration: "Pre-arrival"
    },
    {
      id: "welcome-meal",
      icon: Package,
      title: "Welcome Meal Package",
      description: "Traditional home-style meal delivered on arrival day",
      price: toCountry === 'USA' ? 35 : 1499,
      duration: "Same day"
    },
    {
      id: "sim-card",
      icon: Plane,
      title: "Local SIM Card Setup",
      description: "Local phone number and data plan activation",
      price: toCountry === 'USA' ? 25 : 999,
      duration: "Pre-arrival"
    }
  ];

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotal = () => {
    return bundleServices
      .filter(service => selectedServices.includes(service.id))
      .reduce((total, service) => total + service.price, 0);
  };

  const handleBookBundle = () => {
    const bundleData = {
      flightDetails,
      selectedServices: bundleServices.filter(service => 
        selectedServices.includes(service.id)
      ),
      total: calculateTotal()
    };
    
    // Navigate to payment with bundle data
    navigate('/payment', { state: { bundleData, serviceType: 'flight-bundle' } });
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Flight + Services Bundle
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Pre-arrange essential services for your loved one's arrival. Everything ready when they land.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Flight Details */}
          <Card className="p-6">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Plane className="h-6 w-6 text-blue-600" />
              Flight Information
            </h3>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Arrival Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input 
                      type="date"
                      className="pl-10"
                      value={flightDetails.arrivalDate}
                      onChange={(e) => setFlightDetails(prev => ({ ...prev, arrivalDate: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Arrival Time
                  </label>
                  <Input 
                    type="time"
                    value={flightDetails.arrivalTime}
                    onChange={(e) => setFlightDetails(prev => ({ ...prev, arrivalTime: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Flight Number
                </label>
                <Input 
                  placeholder="e.g., AI 127"
                  value={flightDetails.flightNumber}
                  onChange={(e) => setFlightDetails(prev => ({ ...prev, flightNumber: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Arrival Airport
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input 
                    placeholder={`Select airport in ${toCountry}`}
                    className="pl-10"
                    value={flightDetails.airport}
                    onChange={(e) => setFlightDetails(prev => ({ ...prev, airport: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Service Selection */}
          <Card className="p-6">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Package className="h-6 w-6 text-green-600" />
              Select Services
            </h3>
            
            <div className="space-y-4">
              {bundleServices.map((service) => (
                <div key={service.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      checked={selectedServices.includes(service.id)}
                      onCheckedChange={() => handleServiceToggle(service.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <service.icon className="h-5 w-5 text-blue-600" />
                        <h4 className="font-semibold text-gray-900">{service.title}</h4>
                        <span className="ml-auto font-bold text-green-600">
                          {getCurrencyDisplay(service.price, toCountry === 'USA' ? 'USD' : 'INR')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{service.description}</p>
                      <p className="text-xs text-blue-600">Duration: {service.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedServices.length > 0 && (
              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total Bundle Price:</span>
                  <span className="text-2xl font-bold text-green-600">
                    {getCurrencyDisplay(calculateTotal(), toCountry === 'USA' ? 'USD' : 'INR')}
                  </span>
                </div>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleBookBundle}
                  disabled={!flightDetails.arrivalDate || !flightDetails.flightNumber}
                >
                  Book Bundle Package
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 bg-white rounded-2xl p-8">
          <h3 className="text-2xl font-semibold mb-6 text-center">Bundle Benefits</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Seamless Arrival</h4>
              <p className="text-sm text-gray-600">Everything coordinated for a smooth landing experience</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Bundle Savings</h4>
              <p className="text-sm text-gray-600">Save up to 20% compared to individual service bookings</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">Real-time Updates</h4>
              <p className="text-sm text-gray-600">Track all services and get flight arrival notifications</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlightServiceBundle;
