
import { useState, useEffect } from 'react';
import { useEnhancedAuth } from '@/contexts/EnhancedAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type VendorFood = Tables<'vendor_foods'>;

interface NewFoodItem {
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  preparation_time: number;
  currency: string;
}

const VendorFoodManagement = () => {
  const { user } = useEnhancedAuth();
  const { toast } = useToast();
  const [foods, setFoods] = useState<VendorFood[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFood, setNewFood] = useState<NewFoodItem>({
    name: '',
    description: '',
    price: 0,
    category: '',
    image_url: '',
    preparation_time: 30,
    currency: 'USD'
  });

  useEffect(() => {
    if (user) {
      fetchFoods();
    }
  }, [user]);

  const fetchFoods = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('vendor_foods')
        .select('*')
        .eq('vendor_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFoods(data || []);
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

  const handleAddFood = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('vendor_foods')
        .insert({
          ...newFood,
          vendor_id: user.id
        });

      if (error) throw error;
      
      setNewFood({
        name: '',
        description: '',
        price: 0,
        category: '',
        image_url: '',
        preparation_time: 30,
        currency: 'USD'
      });
      setShowAddForm(false);
      fetchFoods();
      
      toast({
        title: "Success",
        description: "Food item added successfully"
      });
    } catch (error) {
      console.error('Error adding food:', error);
      toast({
        title: "Error",
        description: "Failed to add food item",
        variant: "destructive"
      });
    }
  };

  const handleDeleteFood = async (id: string) => {
    try {
      const { error } = await supabase
        .from('vendor_foods')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      fetchFoods();
      toast({
        title: "Success",
        description: "Food item deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting food:', error);
      toast({
        title: "Error",
        description: "Failed to delete food item",
        variant: "destructive"
      });
    }
  };

  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('vendor_foods')
        .update({ is_available: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      
      fetchFoods();
      toast({
        title: "Success",
        description: `Food item ${!currentStatus ? 'enabled' : 'disabled'}`
      });
    } catch (error) {
      console.error('Error updating availability:', error);
      toast({
        title: "Error",
        description: "Failed to update availability",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Food Menu Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Food Menu Management</CardTitle>
          <Button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Food Item
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Form */}
        {showAddForm && (
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Add New Food Item</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddForm(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newFood.name}
                    onChange={(e) => setNewFood(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Food item name"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newFood.category}
                    onChange={(e) => setNewFood(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="e.g., Fast Food, Indian, Chinese"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newFood.price}
                    onChange={(e) => setNewFood(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="prep-time">Preparation Time (minutes)</Label>
                  <Input
                    id="prep-time"
                    type="number"
                    value={newFood.preparation_time}
                    onChange={(e) => setNewFood(prev => ({ ...prev, preparation_time: parseInt(e.target.value) || 30 }))}
                    placeholder="30"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newFood.description}
                  onChange={(e) => setNewFood(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your food item..."
                />
              </div>
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={newFood.image_url}
                  onChange={(e) => setNewFood(prev => ({ ...prev, image_url: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <Button onClick={handleAddFood} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Add Food Item
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Food Items List */}
        {foods.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No food items yet. Add your first item to get started!</p>
          </div>
        ) : (
          foods.map((food) => (
            <Card key={food.id} className="border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {food.image_url && (
                      <img
                        src={food.image_url}
                        alt={food.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-lg">{food.name}</h3>
                      <p className="text-gray-600 text-sm">{food.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{food.category}</Badge>
                        <Badge variant={food.is_available ? "default" : "destructive"}>
                          {food.is_available ? 'Available' : 'Unavailable'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-blue-600">
                      {food.currency} {food.price}
                    </p>
                    <p className="text-sm text-gray-600">
                      {food.preparation_time} min prep
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleAvailability(food.id, food.is_available)}
                      >
                        {food.is_available ? 'Disable' : 'Enable'}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteFood(food.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default VendorFoodManagement;
