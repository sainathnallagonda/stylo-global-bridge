
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import EnhancedFoodCard from './EnhancedFoodCard';
import SearchAndFilter from './SearchAndFilter';
import { useToast } from '@/hooks/use-toast';
import { useAppState } from '@/contexts/AppStateContext';
import type { Tables } from '@/integrations/supabase/types';

type VendorFood = Tables<'vendor_foods'>;

interface SearchFilters {
  searchTerm: string;
  category: string;
  priceRange: [number, number];
  rating: number;
  dietaryRestrictions: string[];
  spiceLevel: number[];
  preparationTime: number;
  sortBy: string;
}

interface ExtendedVendorFood extends VendorFood {
  vendor_info?: {
    business_name: string;
    average_rating: number;
    total_reviews: number;
  };
  dietary_restrictions?: string[];
  allergens?: string[];
  spice_level?: number;
  nutritional_info?: any;
}

const CustomerFoodDisplay = () => {
  const [foods, setFoods] = useState<ExtendedVendorFood[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<ExtendedVendorFood[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cartCount, openCart } = useAppState();
  const { toast } = useToast();

  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    category: 'all',
    priceRange: [0, 100],
    rating: 0,
    dietaryRestrictions: [],
    spiceLevel: [],
    preparationTime: 120,
    sortBy: 'relevance'
  });

  const categories = [
    'Fast Food',
    'Indian',
    'Chinese',
    'Italian',
    'Mexican',
    'Desserts',
    'Beverages',
    'Healthy',
    'Pizza',
    'Burgers'
  ];

  useEffect(() => {
    fetchFoods();
  }, []);

  useEffect(() => {
    filterAndSortFoods();
  }, [foods, filters]);

  const fetchFoods = async () => {
    try {
      console.log('Fetching foods...');
      const { data, error } = await supabase
        .from('vendor_foods')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching foods:', error);
        throw error;
      }
      
      console.log('Foods fetched successfully:', data?.length || 0);
      // Extend the food items with placeholder vendor info for now
      const extendedFoods: ExtendedVendorFood[] = (data || []).map(food => ({
        ...food,
        vendor_info: {
          business_name: 'Local Vendor',
          average_rating: 4.2,
          total_reviews: 15
        },
        dietary_restrictions: [],
        allergens: [],
        spice_level: 0,
        nutritional_info: null
      }));
      
      setFoods(extendedFoods);
    } catch (error) {
      console.error('Error in fetchFoods:', error);
      toast({
        title: "Error",
        description: "Failed to load food items",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortFoods = () => {
    try {
      let filtered = foods;

      // Search filter
      if (filters.searchTerm) {
        filtered = filtered.filter(food => 
          food.name?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          food.description?.toLowerCase().includes(filters.searchTerm.toLowerCase())
        );
      }

      // Category filter
      if (filters.category !== 'all') {
        filtered = filtered.filter(food => food.category === filters.category);
      }

      // Price range filter
      filtered = filtered.filter(food => 
        food.price >= filters.priceRange[0] && food.price <= filters.priceRange[1]
      );

      // Preparation time filter
      if (filters.preparationTime < 120) {
        filtered = filtered.filter(food => 
          (food.preparation_time || 30) <= filters.preparationTime
        );
      }

      // Dietary restrictions filter
      if (filters.dietaryRestrictions.length > 0) {
        filtered = filtered.filter(food => 
          filters.dietaryRestrictions.some(restriction => 
            food.dietary_restrictions?.includes(restriction)
          )
        );
      }

      // Spice level filter
      if (filters.spiceLevel.length > 0) {
        filtered = filtered.filter(food => 
          food.spice_level && filters.spiceLevel.includes(food.spice_level)
        );
      }

      // Sorting
      switch (filters.sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => (b.vendor_info?.average_rating || 0) - (a.vendor_info?.average_rating || 0));
          break;
        case 'preparation-time':
          filtered.sort((a, b) => (a.preparation_time || 30) - (b.preparation_time || 30));
          break;
        case 'newest':
          filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          break;
        default:
          // relevance - keep original order
          break;
      }

      setFilteredFoods(filtered);
    } catch (error) {
      console.error('Error in filterAndSortFoods:', error);
      setFilteredFoods([]);
    }
  };

  const handleAddToCart = (food: VendorFood) => {
    try {
      addToCart(food);
      toast({
        title: "Added to Cart",
        description: `${food.name} has been added to your cart`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Available Food Items</h2>
        <button 
          onClick={openCart}
          className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-colors"
        >
          <ShoppingCart className="h-5 w-5 text-gray-600" />
          <Badge variant="outline">
            {cartCount} items in cart
          </Badge>
        </button>
      </div>

      <SearchAndFilter 
        filters={filters}
        onFiltersChange={setFilters}
        categories={categories}
      />

      {/* Results Summary */}
      <div className="text-sm text-gray-600">
        Showing {filteredFoods.length} of {foods.length} items
      </div>

      {/* Food Items Grid */}
      {filteredFoods.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              {foods.length === 0 
                ? 'No food items available yet. Check back later!' 
                : 'No items match your search criteria.'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map((food) => (
            <EnhancedFoodCard 
              key={food.id} 
              food={food} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerFoodDisplay;
