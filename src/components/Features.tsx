
import { Shield, Globe, CreditCard, Clock, MapPin, Star } from "lucide-react";

const features = [
  {
    icon: CreditCard,
    title: "Pay in Local Currency",
    description: "Pay in INR or USD - we handle the conversion seamlessly with live exchange rates",
    color: "text-blue-600"
  },
  {
    icon: Shield,
    title: "Secure & Trusted",
    description: "End-to-end encryption and verified service providers ensure your transactions are safe",
    color: "text-blue-600"
  },
  {
    icon: Clock,
    title: "Real-time Tracking",
    description: "Track your orders and get live updates on delivery status from start to finish",
    color: "text-blue-600"
  },
  {
    icon: Globe,
    title: "Cross-Border Made Easy",
    description: "Navigate cultural differences with our smart recommendations and local expertise",
    color: "text-blue-600"
  },
  {
    icon: MapPin,
    title: "Local Partners",
    description: "Trusted local partners who understand the neighborhood and deliver with care",
    color: "text-blue-600"
  },
  {
    icon: Star,
    title: "Quality Assured",
    description: "5-star rated services with money-back guarantee for your peace of mind",
    color: "text-blue-600"
  }
];

const Features = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sending love across borders has never been easier. Follow these simple steps to make someone's day special.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-16">
          {[
            { number: "1", title: "Select Service & Location", description: "Choose what you want to send and where" },
            { number: "2", title: "Choose Products", description: "Browse and select from local options" },
            { number: "3", title: "Schedule Delivery", description: "Pick the perfect time for delivery" },
            { number: "4", title: "Pay in Local Currency", description: "Secure payment in INR or USD" },
            { number: "5", title: "Track & Receive", description: "Real-time updates until delivery" }
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center max-w-xs">
              <div className="w-12 h-12 bg-primary-blue text-white rounded-full flex items-center justify-center font-bold text-lg mb-3">
                {step.number}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-lg border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-50 rounded-lg flex items-center justify-center">
                <feature.icon className={feature.color} size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
