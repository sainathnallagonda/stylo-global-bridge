
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface FavoriteButtonProps {
  item: any;
  serviceType: string;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'ghost' | 'outline';
}

const FavoriteButton = ({ item, serviceType, className, size = 'sm', variant = 'ghost' }: FavoriteButtonProps) => {
  const { toggleFavorite, isFavorite } = useFavorites(serviceType);
  const { toast } = useToast();
  
  // Safely check if item is favorite
  const isItemFavorite = item?.id ? isFavorite(item.id) : false;

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Validate item data
    if (!item || !item.id) {
      console.error('Invalid item data for favorite button:', item);
      toast({
        title: "Error",
        description: "Invalid item data",
        variant: "destructive"
      });
      return;
    }

    // Validate required item properties
    if (!item.name || typeof item.price === 'undefined') {
      console.error('Missing required item properties:', item);
      toast({
        title: "Error",
        description: "Item is missing required information",
        variant: "destructive"
      });
      return;
    }

    try {
      await toggleFavorite({
        id: item.id,
        name: item.name,
        price: Number(item.price) || 0,
        currency: item.currency || 'USD',
        image: item.image || item.image_url || '/placeholder.svg',
        category: item.category
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Error",
        description: "Failed to update favorites. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggle}
      className={cn(
        "hover:bg-red-50 transition-colors",
        className
      )}
      aria-label={isItemFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart 
        className={cn(
          "h-4 w-4 transition-colors",
          isItemFavorite ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
        )} 
      />
    </Button>
  );
};

export default FavoriteButton;
