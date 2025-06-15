
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Filter, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEnhancedAuth } from '@/contexts/EnhancedAuthContext';
import CleanHeader from '@/components/navigation/CleanHeader';
import ImprovedCartModal from '@/components/cart/ImprovedCartModal';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAppState } from '@/contexts/AppStateContext';
import ImprovedFoodCard from '@/components/food/ImprovedFoodCard';
import type { Tables } from '@/integrations/supabase/types';

type VendorFood = Tables<'vendor_foods'>;

interface ExtendedVendorFood extends VendorFood {
  vendor_info?: {
    business_name: string;
    average_rating: number;
    total_reviews: number;
  };
  dietary_restrictions?: string[];
  spice_level?: number;
}

const ImprovedFoodDelivery = () => {
  const navigate = useNavigate();
  const { isCustomer, profile } = useEnhancedAuth();
  const { addToCart } = useAppState();
  const { toast } = useToast();
  
  const [foods, setFoods] = useState<ExtendedVendorFood[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<ExtendedVendorFood[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentLocation, setCurrentLocation] = useState<string>('Select Location');

  const categories = ['all', 'Fast Food', 'Indian', 'Chinese', 'Italian', 'Mexican', 'Desserts', 'Beverages'];

  useEffect(() => {
    if (profile?.current_location) {
      setCurrentLocation(profile.current_location.address || 'Current Location');
    }
  }, [profile]);

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

      if (error) throw error;
      
      // Extend foods with mock vendor info
      const extendedFoods: ExtendedVendorFood[] = (data || []).map(food => ({
        ...food,
        vendor_info: {
          business_name: 'Local Restaurant',
          average_rating: 4.2,
          total_reviews: 15
        },
        dietary_restrictions: [],
        spice_level: 0
      }));
      
      setFoods(extendedFoods);
    } catch (error) {
      console.error('Error fetching foods:', error);
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

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <CleanHeader />
      <ImprovedCartModal />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="flex items-center gap-2 hover:bg-white/80"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Food Delivery</h1>
              <div className="flex items-center gap-2 text-gray-600 mt-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{currentLocation}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for food items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white/50"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white/50"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        {!isCustomer ? (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-sm border max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Please log in as a customer to browse food options
              </h2>
              <Button onClick={() => navigate('/customer-auth')} className="bg-blue-600 hover:bg-blue-700">
                Customer Login
              </Button>
            </div>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white/50 animate-pulse rounded-xl h-80"></div>
            ))}
          </div>
        ) : filteredFoods.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-sm border max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No food items found</h3>
              <p className="text-gray-600">Try adjusting your search or category filter.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFoods.map((food) => (
              <ImprovedFoodCard 
                key={food.id} 
                food={food} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}

        {/* Results Info */}
        {filteredFoods.length > 0 && (
          <div className="mt-8 text-center text-sm text-gray-600">
            Showing {filteredFoods.length} of {foods.length} items
          </div>
        )}
      </div>
    </div>
  );
};

export default ImprovedFoodDelivery;
