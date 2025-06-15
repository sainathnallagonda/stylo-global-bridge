
import { Shield, Award, Clock, Heart, CheckCircle, Users } from "lucide-react";

const TrustBadges = () => {
  const badges = [
    {
      icon: Shield,
      title: "Secure Payments",
      description: "256-bit SSL encryption",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Award,
      title: "Verified Partners",
      description: "Background checked vendors",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round the clock assistance",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Heart,
      title: "Family First",
      description: "Caring for your loved ones",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: CheckCircle,
      title: "Quality Guaranteed",
      description: "100% satisfaction promise",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: Users,
      title: "Trusted by 25K+",
      description: "Happy customers worldwide",
      color: "bg-indigo-100 text-indigo-600"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Why Families Trust Stylo
          </h3>
          <p className="text-gray-600">
            Your peace of mind is our priority
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
            >
              <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${badge.color} flex items-center justify-center`}>
                <badge.icon className="h-6 w-6" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                {badge.title}
              </h4>
              <p className="text-xs text-gray-600">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
