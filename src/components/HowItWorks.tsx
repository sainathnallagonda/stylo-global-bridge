
import { MapPin, ShoppingCart, Calendar, CreditCard, Package } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: MapPin,
    title: "Select Service & Location",
    description: "Choose the service you want to send and enter the recipient's location.",
    color: "bg-blue-600"
  },
  {
    number: 2,
    icon: ShoppingCart,
    title: "Choose Items/Services",
    description: "Browse and select from local options available at the recipient's location.",
    color: "bg-blue-600"
  },
  {
    number: 3,
    icon: Calendar,
    title: "Schedule Delivery",
    description: "Choose when you want the items to be delivered or services to be provided.",
    color: "bg-blue-600"
  },
  {
    number: 4,
    icon: CreditCard,
    title: "Pay in Local Currency",
    description: "Pay in your local currency (INR or USD) with no hidden conversion fees.",
    color: "bg-blue-600"
  },
  {
    number: 5,
    icon: Package,
    title: "Track & Receive",
    description: "Track the order in real-time and get confirmation when it's delivered.",
    color: "bg-blue-600"
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

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto -mt-6 relative z-10">
                  <step.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
