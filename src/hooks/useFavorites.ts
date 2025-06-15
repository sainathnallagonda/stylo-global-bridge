
import { useState, useEffect } from 'react';
import { useEnhancedAuth } from '@/contexts/EnhancedAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  currency: string;
  image?: string;
  category?: string;
}

export const useFavorites = (serviceType: string) => {
  const { user } = useEnhancedAuth();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user, serviceType]);

  const fetchFavorites = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .eq('service_type', serviceType);

      if (error) throw error;
      
      const favoriteItems = data?.map(fav => ({
        id: fav.item_data.id,
        name: fav.item_data.name,
        price: fav.item_data.price,
        currency: fav.item_data.currency,
        image: fav.item_data.image,
        category: fav.item_data.category,
      })) || [];
      
      setFavorites(favoriteItems);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (item: FavoriteItem) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add favorites",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('favorites')
        .insert({
          user_id: user.id,
          service_type: serviceType,
          item_data: item
        });

      if (error) throw error;
      
      setFavorites(prev => [...prev, item]);
      toast({
        title: "Added to Favorites",
        description: `${item.name} has been added to your favorites`
      });
    } catch (error) {
      console.error('Error adding to favorites:', error);
      toast({
        title: "Error",
        description: "Failed to add to favorites",
        variant: "destructive"
      });
    }
  };

  const removeFromFavorites = async (itemId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('service_type', serviceType)
        .eq('item_data->id', itemId);

      if (error) throw error;
      
      setFavorites(prev => prev.filter(item => item.id !== itemId));
      toast({
        title: "Removed from Favorites",
        description: "Item has been removed from your favorites"
      });
    } catch (error) {
      console.error('Error removing from favorites:', error);
      toast({
        title: "Error",
        description: "Failed to remove from favorites",
        variant: "destructive"
      });
    }
  };

  const isFavorite = (itemId: string) => {
    return favorites.some(item => item.id === itemId);
  };

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };
};
