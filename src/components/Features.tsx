
import { Shield, Globe, CreditCard, Clock, MapPin, Star } from "lucide-react";

const features = [
  {
    icon: CreditCard,
    title: "Multi-Currency Support",
    description: "Pay in INR or USD - we handle the conversion seamlessly"
  },
  {
    icon: Shield,
    title: "Secure & Trusted",
    description: "End-to-end encryption and verified service providers"
  },
  {
    icon: Clock,
    title: "Real-time Tracking",
    description: "Track your orders and get live updates on delivery status"
  },
  {
    icon: Globe,
    title: "Cultural Bridge",
    description: "Navigate cultural differences with our smart recommendations"
  },
  {
    icon: MapPin,
    title: "Local Expertise",
    description: "Local partners who understand the neighborhood best"
  },
  {
    icon: Star,
    title: "Quality Assured",
    description: "5-star rated services with money-back guarantee"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-4 bg-gradient-to-r from-blue-50 to-orange-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            Why Choose Stylo?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Built for the global family - features that make distance disappear
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
