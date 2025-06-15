
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FavoriteItem {
  id: number;
  name: string;
  image: string;
  price: number;
  currency: string;
  category?: string;
  restaurant?: string;
}

export const useFavorites = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      fetchUserFavorites();
    }
  }, [user]);

  const fetchUserFavorites = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('item_data')
        .eq('user_id', user.id);

      if (error) throw error;
      
      const favoriteIds = data?.map(fav => {
        const itemData = fav.item_data as Record<string, any>;
        return itemData.id?.toString() || '';
      }).filter(id => id) || [];
      setFavorites(favoriteIds);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const toggleFavorite = async (item: FavoriteItem, serviceType: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add favorites"
      });
      return;
    }

    const itemId = item.id.toString();
    const isFavorite = favorites.includes(itemId);

    try {
      if (isFavorite) {
        // Remove from favorites
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('item_data->id', item.id);

        if (error) throw error;

        setFavorites(prev => prev.filter(id => id !== itemId));
        toast({
          title: "Removed from favorites",
          description: `${item.name} has been removed from your favorites`
        });
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            service_type: serviceType,
            item_data: item
          });

        if (error) throw error;

        setFavorites(prev => [...prev, itemId]);
        toast({
          title: "Added to favorites",
          description: `${item.name} has been added to your favorites`
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Error",
        description: "Failed to update favorites",
        variant: "destructive"
      });
    }
  };

  const isFavorite = (itemId: number | string) => {
    return favorites.includes(itemId.toString());
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    refetch: fetchUserFavorites
  };
};
