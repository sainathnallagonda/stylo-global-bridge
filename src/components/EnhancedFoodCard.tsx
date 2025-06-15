
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Plus, Star, Leaf, Flame, AlertTriangle } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type VendorFood = Tables<'vendor_foods'>;

interface EnhancedFoodCardProps {
  food: VendorFood & {
    vendor_info?: {
      business_name: string;
      average_rating: number;
      total_reviews: number;
    };
  };
  onAddToCart?: (food: VendorFood) => void;
  onQuickView?: (food: VendorFood) => void;
}

const EnhancedFoodCard = ({ food, onAddToCart, onQuickView }: EnhancedFoodCardProps) => {
  const handleAddToCart = () => {
    try {
      if (onAddToCart) {
        onAddToCart(food);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    try {
      e.currentTarget.src = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop';
    } catch (error) {
      console.error('Error handling image error:', error);
    }
  };

  const getSpiceLevel = (level: number | null) => {
    if (!level) return null;
    return Array.from({ length: level }, (_, i) => (
      <Flame key={i} className="h-3 w-3 text-red-500 fill-current" />
    ));
  };

  const getDietaryBadges = () => {
    const badges = [];
    
    if (food.dietary_restrictions?.includes('vegetarian')) {
      badges.push(
        <Badge key="veg" className="bg-green-100 text-green-800 text-xs">
          <Leaf className="h-2 w-2 mr-1" />
          Veg
        </Badge>
      );
    }
    
    if (food.dietary_restrictions?.includes('vegan')) {
      badges.push(
        <Badge key="vegan" className="bg-green-100 text-green-800 text-xs">
          <Leaf className="h-2 w-2 mr-1" />
          Vegan
        </Badge>
      );
    }

    if (food.dietary_restrictions?.includes('gluten-free')) {
      badges.push(
        <Badge key="gf" className="bg-blue-100 text-blue-800 text-xs">
          GF
        </Badge>
      );
    }

    return badges;
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group">
      <CardHeader className="p-4">
        {food.image_url && (
          <div className="relative w-full h-48 bg-gray-200 rounded-lg mb-3 overflow-hidden">
            <img 
              src={food.image_url} 
              alt={food.name || 'Food item'}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={handleImageError}
            />
            {food.vendor_info && food.vendor_info.average_rating > 0 && (
              <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-full shadow-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs font-medium">{food.vendor_info.average_rating}</span>
                </div>
              </div>
            )}
            {!food.is_available && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Badge variant="destructive">Unavailable</Badge>
              </div>
            )}
          </div>
        )}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg line-clamp-1">{food.name || 'Unnamed Item'}</h3>
            <Badge variant="outline" className="ml-2 shrink-0">
              {food.category || 'Other'}
            </Badge>
          </div>
          
          {food.vendor_info?.business_name && (
            <p className="text-sm text-gray-500">by {food.vendor_info.business_name}</p>
          )}
          
          {food.description && (
            <p className="text-gray-600 text-sm line-clamp-2">{food.description}</p>
          )}

          {/* Dietary restrictions and spice level */}
          <div className="flex items-center gap-2 flex-wrap">
            {getDietaryBadges()}
            {food.spice_level && food.spice_level > 0 && (
              <div className="flex items-center gap-1">
                {getSpiceLevel(food.spice_level)}
              </div>
            )}
          </div>

          {/* Allergens warning */}
          {food.allergens && food.allergens.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-orange-600">
              <AlertTriangle className="h-3 w-3" />
              <span>Contains: {food.allergens.join(', ')}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-blue-600">
              {food.currency || 'USD'} {food.price || '0.00'}
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {food.preparation_time || 30} min
            </span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={handleAddToCart}
            className="flex-1"
            size="sm"
            disabled={!food.is_available}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          {onQuickView && (
            <Button 
              onClick={() => onQuickView(food)}
              variant="outline"
              size="sm"
            >
              Quick View
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedFoodCard;
