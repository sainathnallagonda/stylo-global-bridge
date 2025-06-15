
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

export const useFavorites = (serviceType?: string) => {
  const { user } = useEnhancedAuth();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && serviceType) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [user, serviceType]);

  const fetchFavorites = async () => {
    if (!user || !serviceType) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .eq('service_type', serviceType);

      if (error) throw error;
      
      const favoriteItems = (data || []).map(fav => {
        try {
          const itemData = fav.item_data as any;
          return {
            id: String(itemData.id || ''),
            name: itemData.name || 'Unknown Item',
            price: Number(itemData.price) || 0,
            currency: itemData.currency || 'USD',
            image: itemData.image || '/placeholder.svg',
            category: itemData.category,
          };
        } catch (error) {
          console.error('Error parsing favorite item:', error);
          return null;
        }
      }).filter(Boolean) as FavoriteItem[];
      
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

    if (!serviceType) {
      console.error('Service type is required for favorites');
      return;
    }

    // Validate item data
    if (!item.id || !item.name) {
      toast({
        title: "Error",
        description: "Invalid item data",
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
          item_data: {
            id: item.id,
            name: item.name,
            price: item.price,
            currency: item.currency,
            image: item.image,
            category: item.category
          }
        });

      if (error) throw error;
      
      setFavorites(prev => [...prev, item]);
      toast({
        title: "Added to Favorites",
        description: `${item.name} has been added to your favorites`
      });
    } catch (error: any) {
      console.error('Error adding to favorites:', error);
      
      // Handle duplicate entry error gracefully
      if (error.code === '23505') {
        toast({
          title: "Already in Favorites",
          description: "This item is already in your favorites"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to add to favorites",
          variant: "destructive"
        });
      }
    }
  };

  const removeFromFavorites = async (itemId: string) => {
    if (!user || !serviceType) return;

    try {
      // First get all favorites to find the one to delete
      const { data: existingFavorites, error: fetchError } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .eq('service_type', serviceType);

      if (fetchError) throw fetchError;

      // Find the favorite with matching item id
      const favoriteToDelete = existingFavorites?.find(fav => {
        const itemData = fav.item_data as any;
        return String(itemData.id) === String(itemId);
      });

      if (!favoriteToDelete) {
        console.log('Favorite not found for deletion');
        return;
      }

      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', favoriteToDelete.id);

      if (error) throw error;
      
      setFavorites(prev => prev.filter(item => String(item.id) !== String(itemId)));
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
    if (!itemId) return false;
    return favorites.some(item => String(item.id) === String(itemId));
  };

  const toggleFavorite = async (item: FavoriteItem) => {
    if (!item?.id) {
      console.error('Invalid item for toggle favorite:', item);
      return;
    }
    
    if (isFavorite(item.id)) {
      await removeFromFavorites(item.id);
    } else {
      await addToFavorites(item);
    }
  };

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite
  };
};
