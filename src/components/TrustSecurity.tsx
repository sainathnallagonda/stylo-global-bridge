
import { Shield, UserCheck, Clock, Award, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const trustFeatures = [
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Your payment information is encrypted and never stored. Pay securely in your local currency.",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    icon: UserCheck,
    title: "Verified Partners",
    description: "All service providers and travel companions undergo rigorous background checks and verification.",
    iconBg: "bg-purple-100", 
    iconColor: "text-purple-600"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our international support team is available around the clock to assist with any issues or questions.",
    iconBg: "bg-green-100",
    iconColor: "text-green-600"
  },
  {
    icon: Award,
    title: "Satisfaction Guarantee",
    description: "If you're not satisfied with the service, we offer hassle-free refunds and replacements.",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600"
  }
];

const testimonials = [
  {
    name: "Anita Desai",
    location: "New York, USA",
    text: "I was able to order my mom's favorite cake for her birthday in Mumbai while sitting in New York. The delivery was on time and the cake was exactly what I wanted. Thank you Stylo for making my mom's day special!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Vikram Mehta", 
    location: "Bangalore, India",
    text: "Found a travel companion for my elderly father who was traveling to the US for the first time. The companion was professional, helpful, and made my father feel comfortable throughout the journey. Highly recommend this service!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Raj Patel",
    location: "San Francisco, USA", 
    text: "I used Stylo to order groceries for my parents in Delhi. The app was easy to use, I could pay in USD, and my parents received everything within hours. It's like I'm right there taking care of them even though I'm thousands of miles away.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  }
];

const partners = [
  { name: "Visa", logo: "💳" },
  { name: "Mastercard", logo: "💳" },
  { name: "PayPal", logo: "💰" },
  { name: "Amazon", logo: "📦" },
  { name: "Uber", logo: "🚗" },
  { name: "Airlines", logo: "✈️" }
];

const TrustSecurity = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        {/* Trust & Security Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Trust & Security
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We prioritize your safety and satisfaction with every order across borders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 ${feature.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Customer Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-gray-900">
              What Our Customers Say
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 text-sm leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                      <div className="text-gray-500 text-xs">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partners Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8 text-gray-900">Our Partners</h3>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-600">
                <span className="text-2xl">{partner.logo}</span>
                <span className="font-medium">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSecurity;
