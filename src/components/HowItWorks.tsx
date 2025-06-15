
import { MapPin, ShoppingCart, Calendar, CreditCard, Package, CheckCircle } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: MapPin,
    title: "Select Service & Location",
    description: "Choose the service you want to send and enter the recipient's location.",
    color: "bg-blue-600",
    details: "Browse our services and select your recipient's city"
  },
  {
    number: 2,
    icon: ShoppingCart,
    title: "Choose Items/Services",
    description: "Browse and select from local options available at the recipient's location.",
    color: "bg-green-600",
    details: "Pick from verified local vendors and service providers"
  },
  {
    number: 3,
    icon: Calendar,
    title: "Schedule Delivery",
    description: "Choose when you want the items to be delivered or services to be provided.",
    color: "bg-purple-600",
    details: "Flexible scheduling including same-day delivery options"
  },
  {
    number: 4,
    icon: CreditCard,
    title: "Secure Payment",
    description: "Pay securely in your local currency with transparent pricing.",
    color: "bg-orange-600",
    details: "Multiple payment methods with secure encryption"
  },
  {
    number: 5,
    icon: Package,
    title: "Track & Receive",
    description: "Track the order in real-time and get confirmation when it's delivered.",
    color: "bg-red-600",
    details: "Real-time updates via SMS, email, and app notifications"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Sending love across borders has never been easier. Follow these simple steps
            to make someone's day special.
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-8 left-8 right-8 h-0.5 bg-gray-200 z-0"></div>
            
            <div className="grid grid-cols-5 gap-8 relative z-10">
              {steps.map((step, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <span className="text-xl font-bold text-white">{step.number}</span>
                    </div>
                    <div className="w-12 h-12 bg-white border-4 border-gray-100 rounded-xl flex items-center justify-center mx-auto -mt-6 relative z-10 group-hover:border-blue-200 transition-colors">
                      <step.icon className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-2">{step.description}</p>
                  <p className="text-xs text-gray-500">{step.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                <span className="text-lg font-bold text-white">{step.number}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <step.icon className="h-5 w-5 text-gray-600" />
                  <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-1">{step.description}</p>
                <p className="text-xs text-gray-500">{step.details}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold mb-8 text-center text-gray-900">Why Choose Our Platform?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1 text-gray-900">Verified Partners</h4>
                <p className="text-sm text-gray-600">All our service partners are thoroughly verified and rated by users</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1 text-gray-900">Transparent Pricing</h4>
                <p className="text-sm text-gray-600">No hidden fees - see exactly what you pay before confirming</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1 text-gray-900">24/7 Support</h4>
                <p className="text-sm text-gray-600">Round-the-clock customer support in multiple languages</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
