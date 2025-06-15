
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useEnhancedAuth } from '@/contexts/EnhancedAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type VendorFood = Tables<'vendor_foods'>;

const VendorFoodManagement = () => {
  const { user } = useEnhancedAuth();
  const { toast } = useToast();
  const [foods, setFoods] = useState<VendorFood[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingFood, setIsAddingFood] = useState(false);
  const [editingFood, setEditingFood] = useState<VendorFood | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image_url: '',
    preparation_time: '30',
    currency: 'USD'
  });

  useEffect(() => {
    if (user) {
      fetchVendorFoods();
    }
  }, [user]);

  const fetchVendorFoods = async () => {
    if (!user) return;

    try {
      console.log('Fetching vendor foods for vendor:', user.id);
      const { data, error } = await supabase
        .from('vendor_foods')
        .select('*')
        .eq('vendor_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setFoods(data || []);
    } catch (error) {
      console.error('Error fetching vendor foods:', error);
      toast({
        title: "Error",
        description: "Failed to load food items",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const foodData = {
        vendor_id: user.id,
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        image_url: formData.image_url || null,
        preparation_time: parseInt(formData.preparation_time),
        currency: formData.currency,
        is_available: true
      };

      let error;
      
      if (editingFood) {
        ({ error } = await supabase
          .from('vendor_foods')
          .update(foodData)
          .eq('id', editingFood.id));
      } else {
        ({ error } = await supabase
          .from('vendor_foods')
          .insert([foodData]));
      }

      if (error) throw error;

      toast({
        title: "Success",
        description: `Food item ${editingFood ? 'updated' : 'added'} successfully`
      });

      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        image_url: '',
        preparation_time: '30',
        currency: 'USD'
      });
      setIsAddingFood(false);
      setEditingFood(null);
      fetchVendorFoods();
    } catch (error) {
      console.error('Error saving food item:', error);
      toast({
        title: "Error",
        description: "Failed to save food item",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (food: VendorFood) => {
    setEditingFood(food);
    setFormData({
      name: food.name || '',
      description: food.description || '',
      price: food.price?.toString() || '',
      category: food.category || '',
      image_url: food.image_url || '',
      preparation_time: food.preparation_time?.toString() || '30',
      currency: food.currency || 'USD'
    });
    setIsAddingFood(true);
  };

  const handleDelete = async (foodId: string) => {
    try {
      const { error } = await supabase
        .from('vendor_foods')
        .delete()
        .eq('id', foodId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Food item deleted successfully"
      });

      fetchVendorFoods();
    } catch (error) {
      console.error('Error deleting food item:', error);
      toast({
        title: "Error",
        description: "Failed to delete food item",
        variant: "destructive"
      });
    }
  };

  const toggleAvailability = async (food: VendorFood) => {
    try {
      const { error } = await supabase
        .from('vendor_foods')
        .update({ is_available: !food.is_available })
        .eq('id', food.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Food item ${!food.is_available ? 'enabled' : 'disabled'}`
      });

      fetchVendorFoods();
    } catch (error) {
      console.error('Error toggling availability:', error);
      toast({
        title: "Error",
        description: "Failed to update availability",
        variant: "destructive"
      });
    }
  };

  const categories = ['Fast Food', 'Indian', 'Chinese', 'Italian', 'Mexican', 'Desserts', 'Beverages'];

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu items...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Menu Management</h2>
        <Button 
          onClick={() => {
            setIsAddingFood(true);
            setEditingFood(null);
            setFormData({
              name: '',
              description: '',
              price: '',
              category: '',
              image_url: '',
              preparation_time: '30',
              currency: 'USD'
            });
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Food Item
        </Button>
      </div>

      {/* Add/Edit Form */}
      {isAddingFood && (
        <Card>
          <CardHeader>
            <CardTitle>{editingFood ? 'Edit' : 'Add'} Food Item</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Food item name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Currency</label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({...formData, currency: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="USD">USD</option>
                    <option value="INR">INR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Preparation Time (minutes)</label>
                  <Input
                    type="number"
                    value={formData.preparation_time}
                    onChange={(e) => setFormData({...formData, preparation_time: e.target.value})}
                    placeholder="30"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <Input
                    value={formData.image_url}
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your food item"
                  rows={3}
                />
              </div>
              <div className="flex gap-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {editingFood ? 'Update' : 'Add'} Item
                </Button>
                <Button type="button" variant="outline" onClick={() => {
                  setIsAddingFood(false);
                  setEditingFood(null);
                }}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Food Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food) => (
          <Card key={food.id} className={`${!food.is_available ? 'opacity-50' : ''}`}>
            <CardContent className="p-4">
              {food.image_url && (
                <img 
                  src={food.image_url} 
                  alt={food.name || 'Food item'} 
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
              )}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{food.name}</h3>
                  <Badge variant={food.is_available ? "default" : "secondary"}>
                    {food.is_available ? 'Available' : 'Unavailable'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{food.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-600">
                    {food.currency} {food.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    {food.preparation_time}min
                  </span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(food)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleAvailability(food)}
                  >
                    {food.is_available ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(food.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {foods.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-400 mb-4">
              <Plus className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No menu items yet</h3>
            <p className="text-gray-600 mb-4">Start building your menu by adding your first food item.</p>
            <Button onClick={() => {
              setIsAddingFood(true);
              setEditingFood(null);
            }}>
              Add Your First Item
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VendorFoodManagement;
