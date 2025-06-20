
import { useState, useEffect } from 'react';
import { useEnhancedAuth } from '@/contexts/EnhancedAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Heart, Trash, ShoppingCart, UtensilsCrossed, Gift, Car, Plane } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FavoriteItemData {
  id: string | number;
  name: string;
  image: string;
  price: number;
  currency: string;
  category?: string;
  restaurant?: string;
}

interface Favorite {
  id: string;
  service_type: string;
  item_data: FavoriteItemData;
  created_at: string;
}

const FavoritesSection = () => {
  const { user } = useEnhancedAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchFavorites = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Safely parse the item_data with proper error handling
      const typedFavorites: Favorite[] = (data || []).map(fav => {
        try {
          const rawItemData = fav.item_data as any;
          
          // Ensure we have valid data before processing
          if (!rawItemData || typeof rawItemData !== 'object') {
            console.warn('Invalid item_data for favorite:', fav.id);
            return null;
          }
          
          const itemData: FavoriteItemData = {
            id: rawItemData.id || '0',
            name: rawItemData.name || 'Unknown Item',
            image: rawItemData.image || '/placeholder.svg',
            price: Number(rawItemData.price) || 0,
            currency: rawItemData.currency || 'USD',
            category: rawItemData.category,
            restaurant: rawItemData.restaurant
          };
          
          return {
            id: fav.id,
            service_type: fav.service_type,
            item_data: itemData,
            created_at: fav.created_at
          };
        } catch (error) {
          console.error('Error parsing favorite item:', error);
          return null;
        }
      }).filter(Boolean) as Favorite[];
      
      setFavorites(typedFavorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast({
        title: "Error",
        description: "Failed to load favorites",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (id: string) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setFavorites(prev => prev.filter(fav => fav.id !== id));
      toast({
        title: "Removed",
        description: "Item removed from favorites"
      });
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast({
        title: "Error",
        description: "Failed to remove favorite",
        variant: "destructive"
      });
    }
  };

  const reorderItem = (favorite: Favorite) => {
    try {
      navigate('/payment', {
        state: {
          itemName: favorite.item_data.name,
          price: favorite.item_data.price,
          currency: favorite.item_data.currency,
          serviceType: favorite.service_type
        }
      });
    } catch (error) {
      console.error('Error navigating to payment:', error);
      toast({
        title: "Error",
        description: "Failed to proceed to checkout",
        variant: "destructive"
      });
    }
  };

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case 'food': return <UtensilsCrossed className="h-4 w-4" />;
      case 'groceries': return <ShoppingCart className="h-4 w-4" />;
      case 'gifts': return <Gift className="h-4 w-4" />;
      case 'rides': return <Car className="h-4 w-4" />;
      case 'travel': return <Plane className="h-4 w-4" />;
      default: return <Heart className="h-4 w-4" />;
    }
  };

  const getServiceLabel = (serviceType: string) => {
    switch (serviceType) {
      case 'food': return 'Food';
      case 'groceries': return 'Groceries';
      case 'gifts': return 'Gifts';
      case 'rides': return 'Rides';
      case 'travel': return 'Travel';
      default: return serviceType.charAt(0).toUpperCase() + serviceType.slice(1);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Loading favorites...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Favorites</h2>

      {favorites.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No favorites yet</p>
            <p className="text-sm text-gray-400">Add items to favorites while browsing to see them here</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((favorite) => (
            <Card key={favorite.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={favorite.item_data.image} 
                  alt={favorite.item_data.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => removeFavorite(favorite.id)}
                >
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
                <Badge 
                  className="absolute top-2 left-2 bg-white/90 text-gray-800"
                  variant="secondary"
                >
                  <div className="flex items-center gap-1">
                    {getServiceIcon(favorite.service_type)}
                    {getServiceLabel(favorite.service_type)}
                  </div>
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1">{favorite.item_data.name}</h3>
                {favorite.item_data.category && (
                  <p className="text-sm text-gray-600 mb-2">{favorite.item_data.category}</p>
                )}
                {favorite.item_data.restaurant && (
                  <p className="text-sm text-gray-600 mb-2">from {favorite.item_data.restaurant}</p>
                )}
                
                <div className="flex items-center justify-between mt-4">
                  <span className="font-bold text-lg">
                    {favorite.item_data.currency === 'USD' ? '$' : '₹'}{favorite.item_data.price}
                  </span>
                  <Button 
                    size="sm"
                    onClick={() => reorderItem(favorite)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Order Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesSection;
