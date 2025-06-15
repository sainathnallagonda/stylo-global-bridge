
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, ShoppingCart } from 'lucide-react';
import FoodCard from './FoodCard';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type VendorFood = Tables<'vendor_foods'>;

const CustomerFoodDisplay = () => {
  const [foods, setFoods] = useState<VendorFood[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<VendorFood[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cartItems, setCartItems] = useState<VendorFood[]>([]);
  const { toast } = useToast();

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
    filterFoods();
  }, [foods, searchTerm, selectedCategory]);

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
      setFoods(data || []);
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

  const filterFoods = () => {
    try {
      let filtered = foods;

      if (searchTerm) {
        filtered = filtered.filter(food => 
          food.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          food.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedCategory !== 'all') {
        filtered = filtered.filter(food => food.category === selectedCategory);
      }

      setFilteredFoods(filtered);
    } catch (error) {
      console.error('Error in filterFoods:', error);
      setFilteredFoods([]);
    }
  };

  const addToCart = (food: VendorFood) => {
    try {
      setCartItems(prev => [...prev, food]);
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
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-gray-600" />
          <Badge variant="outline">
            {cartItems.length} items in cart
          </Badge>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for food items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

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
            <FoodCard 
              key={food.id} 
              food={food} 
              onAddToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerFoodDisplay;
