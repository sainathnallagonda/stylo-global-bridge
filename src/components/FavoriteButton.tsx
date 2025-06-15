
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  item: any;
  serviceType: string;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'ghost' | 'outline';
}

const FavoriteButton = ({ item, serviceType, className, size = 'sm', variant = 'ghost' }: FavoriteButtonProps) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isItemFavorite = isFavorite(item.id);

  return (
    <Button
      variant={variant}
      size={size}
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(item, serviceType);
      }}
      className={cn(
        "hover:bg-red-50 transition-colors",
        className
      )}
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
