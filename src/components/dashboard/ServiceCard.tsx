
import { useState } from "react";
import { Star, ArrowRight, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CulturalTips from "@/components/CulturalTips";

interface ServiceCardProps {
  icon: any;
  title: string;
  description: string;
  price: string;
  route: string;
  image: string;
  bgColor: string;
  iconColor: string;
  rating?: number;
  popular?: boolean;
}

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  price,
  route,
  image,
  bgColor,
  iconColor,
  rating,
  popular
}: ServiceCardProps) => {
  const navigate = useNavigate();
  const [showCulturalTips, setShowCulturalTips] = useState(false);

  const getServiceType = (route: string) => {
    if (route.includes('food')) return 'food-delivery';
    if (route.includes('groceries')) return 'groceries';
    if (route.includes('gifts')) return 'gifts';
    if (route.includes('rides')) return 'rides';
    return 'food-delivery';
  };

  return (
    <>
      <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden bg-white border-0 shadow-lg">
        <div className="relative">
          <img 
            src={image} 
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-4 left-4 flex gap-2">
            {popular && <Badge className="bg-green-500 text-white">Popular</Badge>}
            {rating && (
              <Badge variant="secondary" className="bg-white/90 text-gray-800">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                {rating}
              </Badge>
            )}
          </div>
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowCulturalTips(true)}
              className="bg-white/90 hover:bg-white text-gray-800 h-8 w-8"
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className={`${bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
          
          <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            {description}
          </p>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-500">Starting from</span>
              <p className="text-2xl font-bold text-blue-600">{price}</p>
            </div>
            
            <Button 
              onClick={() => navigate(route)}
              className="bg-blue-600 hover:bg-blue-700 text-white group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300"
            >
              Order Now
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <CulturalTips 
        serviceType={getServiceType(route)}
        region="USA"
        isOpen={showCulturalTips}
        onClose={() => setShowCulturalTips(false)}
      />
    </>
  );
};

export default ServiceCard;
