
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Plus, Star, Leaf, Flame, MapPin } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type VendorFood = Tables<'vendor_foods'>;

interface ImprovedFoodCardProps {
  food: VendorFood & {
    vendor_info?: {
      business_name: string;
      average_rating: number;
      total_reviews: number;
    };
    dietary_restrictions?: string[];
    spice_level?: number;
  };
  onAddToCart?: (food: VendorFood) => void;
}

const ImprovedFoodCard = ({ food, onAddToCart }: ImprovedFoodCardProps) => {
  const handleAddToCart = () => {
    if (onAddToCart && food.is_available) {
      onAddToCart(food);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop';
  };

  const getSpiceLevel = (level?: number) => {
    if (!level) return null;
    return Array.from({ length: level }, (_, i) => (
      <Flame key={i} className="h-3 w-3 text-red-500 fill-current" />
    ));
  };

  const getDietaryBadges = () => {
    const badges = [];
    const restrictions = food.dietary_restrictions || [];
    
    if (restrictions.includes('vegetarian')) {
      badges.push(
        <Badge key="veg" variant="secondary" className="bg-green-100 text-green-800 text-xs">
          <Leaf className="h-2 w-2 mr-1" />
          Veg
        </Badge>
      );
    }
    
    if (restrictions.includes('vegan')) {
      badges.push(
        <Badge key="vegan" variant="secondary" className="bg-green-100 text-green-800 text-xs">
          <Leaf className="h-2 w-2 mr-1" />
          Vegan
        </Badge>
      );
    }

    return badges;
  };

  return (
    <Card className="group h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md overflow-hidden">
      {/* Image Section */}
      <div className="relative w-full h-48 overflow-hidden">
        <img 
          src={food.image_url || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop'} 
          alt={food.name || 'Food item'}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={handleImageError}
        />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Rating Badge */}
        {food.vendor_info && food.vendor_info.average_rating > 0 && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
              <span className="text-xs font-semibold">{food.vendor_info.average_rating}</span>
            </div>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-white/90 text-gray-800 text-xs font-medium">
            {food.category || 'Food'}
          </Badge>
        </div>

        {/* Availability Overlay */}
        {!food.is_available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm">Currently Unavailable</Badge>
          </div>
        )}

        {/* Price Tag */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="font-bold text-lg text-blue-600">
              {food.currency || 'USD'} {food.price || '0.00'}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="p-4 space-y-3">
        {/* Title and Vendor */}
        <div className="space-y-1">
          <h3 className="font-semibold text-lg leading-tight line-clamp-1">
            {food.name || 'Unnamed Item'}
          </h3>
          {food.vendor_info?.business_name && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="h-3 w-3" />
              <span>{food.vendor_info.business_name}</span>
            </div>
          )}
        </div>
        
        {/* Description */}
        {food.description && (
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
            {food.description}
          </p>
        )}

        {/* Tags and Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            {getDietaryBadges()}
            {food.spice_level && food.spice_level > 0 && (
              <div className="flex items-center gap-1">
                {getSpiceLevel(food.spice_level)}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="h-3 w-3" />
            <span>{food.preparation_time || 30}m</span>
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <Button 
          onClick={handleAddToCart}
          disabled={!food.is_available}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group-hover:scale-105"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          {food.is_available ? 'Add to Cart' : 'Unavailable'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ImprovedFoodCard;
