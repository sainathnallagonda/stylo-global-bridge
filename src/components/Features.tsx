
import { Shield, Globe, CreditCard, Clock, MapPin, Star, Sparkles, Heart } from "lucide-react";

const features = [
  {
    icon: CreditCard,
    title: "Multi-Currency Support",
    description: "Pay in INR or USD - we handle the conversion seamlessly",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50"
  },
  {
    icon: Shield,
    title: "Secure & Trusted",
    description: "End-to-end encryption and verified service providers",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50"
  },
  {
    icon: Clock,
    title: "Real-time Tracking",
    description: "Track your orders and get live updates on delivery status",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50"
  },
  {
    icon: Globe,
    title: "Cultural Bridge",
    description: "Navigate cultural differences with our smart recommendations",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50"
  },
  {
    icon: MapPin,
    title: "Local Expertise",
    description: "Local partners who understand the neighborhood best",
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50"
  },
  {
    icon: Star,
    title: "Quality Assured",
    description: "5-star rated services with money-back guarantee",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 px-4 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-purple-200/50 rounded-full px-6 py-2 mb-6">
            <Heart className="w-4 h-4 text-purple-600" />
            <span className="text-purple-700 font-medium">Why Choose Stylo</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Built for the
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Global Family
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Features that make distance disappear and bring hearts closer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group text-center p-8 rounded-3xl ${feature.bgColor} border border-white/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer`}
            >
              <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <feature.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-purple-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              
              {/* Decorative element */}
              <div className="mt-4 w-12 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
