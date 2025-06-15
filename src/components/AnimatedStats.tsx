
import { useState, useEffect } from "react";
import { Users, Package, Globe, Star } from "lucide-react";

interface StatItem {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix?: string;
  color: string;
}

const AnimatedStats = () => {
  const [isVisible, setIsVisible] = useState(false);

  const stats: StatItem[] = [
    {
      icon: Package,
      value: 50000,
      label: "Orders Delivered",
      suffix: "+",
      color: "text-blue-600"
    },
    {
      icon: Users,
      value: 25000,
      label: "Happy Customers",
      suffix: "+",
      color: "text-green-600"
    },
    {
      icon: Globe,
      value: 2,
      label: "Countries Served",
      color: "text-purple-600"
    },
    {
      icon: Star,
      value: 4.9,
      label: "Average Rating",
      color: "text-yellow-600"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const AnimatedNumber = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, [isVisible, value]);

    return (
      <span>
        {displayValue.toLocaleString()}{suffix}
      </span>
    );
  };

  return (
    <section id="stats-section" className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Thousands Worldwide
          </h2>
          <p className="text-lg text-gray-600">
            Connecting families across borders with reliable service
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-medium text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedStats;
