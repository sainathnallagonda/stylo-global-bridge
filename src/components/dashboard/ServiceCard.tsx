
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: React.ElementType;
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={cn(
        "group cursor-pointer border-0 shadow-lg transition-all duration-300 hover:shadow-2xl overflow-hidden",
        "transform hover:-translate-y-2 hover:scale-105"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(route)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            isHovered && "scale-110"
          )}
        />
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300",
          isHovered && "opacity-75"
        )} />
        
        {/* Icon */}
        <div className={cn(
          "absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300",
          bgColor,
          isHovered && "scale-110"
        )}>
          <Icon className={cn(iconColor, "h-6 w-6")} />
        </div>

        {/* Popular Badge */}
        {popular && (
          <Badge className="absolute top-4 right-4 bg-red-500 text-white">
            Popular
          </Badge>
        )}

        {/* Rating */}
        {rating && (
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm font-medium">{rating}</span>
          </div>
        )}
      </div>
      
      <CardContent className="p-6">
        <h3 className={cn(
          "text-xl font-semibold mb-3 text-gray-900 transition-colors duration-200",
          isHovered && "text-blue-600"
        )}>
          {title}
        </h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500 mb-1">Starting from</div>
            <div className="text-lg font-semibold text-gray-900">
              {price}
            </div>
          </div>
          <Button 
            size="sm"
            className={cn(
              "transition-all duration-200 transform",
              isHovered && "bg-blue-600 text-white scale-105"
            )}
            variant={isHovered ? "default" : "outline"}
          >
            Order Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
