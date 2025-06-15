
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
  const isItemFavorite = isFavorite(item.id);

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!item || !item.id) {
      toast({
        title: "Error",
        description: "Invalid item data",
        variant: "destructive"
      });
      return;
    }

    try {
      await toggleFavorite(item);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Error",
        description: "Failed to update favorites",
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
