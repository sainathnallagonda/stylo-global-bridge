
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Plus } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type VendorFood = Tables<'vendor_foods'>;

interface FoodCardProps {
  food: VendorFood;
  onAddToCart?: (food: VendorFood) => void;
}

const FoodCard = ({ food, onAddToCart }: FoodCardProps) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-4">
        {food.image_url && (
          <div className="w-full h-48 bg-gray-200 rounded-lg mb-3 overflow-hidden">
            <img 
              src={food.image_url} 
              alt={food.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop';
              }}
            />
          </div>
        )}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg line-clamp-1">{food.name}</h3>
            <Badge variant="outline" className="ml-2 shrink-0">
              {food.category}
            </Badge>
          </div>
          {food.description && (
            <p className="text-gray-600 text-sm line-clamp-2">{food.description}</p>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-blue-600">
              {food.currency} {food.price}
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {food.preparation_time} min
            </span>
          </div>
        </div>
        <Button 
          onClick={() => onAddToCart?.(food)}
          className="w-full"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default FoodCard;
