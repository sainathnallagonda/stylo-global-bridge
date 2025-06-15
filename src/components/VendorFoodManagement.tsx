
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Clock, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VendorFood {
  id: string;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  image_url: string | null;
  category: string;
  is_available: boolean;
  preparation_time: number;
  created_at: string;
  updated_at: string;
}

const VendorFoodManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [foods, setFoods] = useState<VendorFood[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialog, setEditDialog] = useState(false);
  const [editingFood, setEditingFood] = useState<Partial<VendorFood> | null>(null);

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
    if (user) {
      fetchFoods();
    }
  }, [user]);

  const fetchFoods = async () => {
    if (!user) return;

    try {
      const { data, error } = await (supabase as any)
        .from('vendor_foods')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFoods(data || []);
    } catch (error) {
      console.error('Error fetching foods:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveFood = async () => {
    if (!user || !editingFood) return;

    // Validate required fields
    if (!editingFood.name || !editingFood.price || !editingFood.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      if (editingFood.id) {
        const { error } = await (supabase as any)
          .from('vendor_foods')
          .update({
            name: editingFood.name,
            description: editingFood.description,
            price: editingFood.price,
            currency: editingFood.currency || 'USD',
            image_url: editingFood.image_url,
            category: editingFood.category,
            is_available: editingFood.is_available ?? true,
            preparation_time: editingFood.preparation_time || 30,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingFood.id);

        if (error) throw error;
      } else {
        const { error } = await (supabase as any)
          .from('vendor_foods')
          .insert({
            vendor_id: user.id,
            name: editingFood.name,
            description: editingFood.description,
            price: editingFood.price,
            currency: editingFood.currency || 'USD',
            image_url: editingFood.image_url,
            category: editingFood.category,
            is_available: editingFood.is_available ?? true,
            preparation_time: editingFood.preparation_time || 30
          });

        if (error) throw error;
      }

      toast({
        title: "Food Item Saved",
        description: "Food item has been saved successfully",
      });

      setEditDialog(false);
      setEditingFood(null);
      fetchFoods();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save food item",
        variant: "destructive"
      });
    }
  };

  const deleteFood = async (id: string) => {
    try {
      const { error } = await (supabase as any)
        .from('vendor_foods')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Food Item Deleted",
        description: "Food item has been removed",
      });

      fetchFoods();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete food item",
        variant: "destructive"
      });
    }
  };

  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await (supabase as any)
        .from('vendor_foods')
        .update({ 
          is_available: !currentStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Availability Updated",
        description: `Food item is now ${!currentStatus ? 'available' : 'unavailable'}`,
      });

      fetchFoods();
    } catch (error) {
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
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Food Management
          </CardTitle>
          <Dialog open={editDialog} onOpenChange={setEditDialog}>
            <DialogTrigger asChild>
              <Button 
                size="sm"
                onClick={() => {
                  setEditingFood({
                    name: '',
                    description: '',
                    price: 0,
                    currency: 'USD',
                    category: '',
                    is_available: true,
                    preparation_time: 30
                  });
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Food Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingFood?.id ? 'Edit Food Item' : 'Add New Food Item'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Name *</label>
                  <Input
                    value={editingFood?.name || ''}
                    onChange={(e) => setEditingFood(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Food item name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={editingFood?.description || ''}
                    onChange={(e) => setEditingFood(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your food item"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm font-medium">Price *</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={editingFood?.price || ''}
                      onChange={(e) => setEditingFood(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Currency</label>
                    <Select 
                      value={editingFood?.currency || 'USD'} 
                      onValueChange={(value) => setEditingFood(prev => ({ ...prev, currency: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="INR">INR</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Category *</label>
                  <Select 
                    value={editingFood?.category || ''} 
                    onValueChange={(value) => setEditingFood(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Preparation Time (minutes)</label>
                  <Input
                    type="number"
                    value={editingFood?.preparation_time || 30}
                    onChange={(e) => setEditingFood(prev => ({ ...prev, preparation_time: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={editingFood?.is_available ?? true}
                    onCheckedChange={(checked) => setEditingFood(prev => ({ ...prev, is_available: checked }))}
                  />
                  <label className="text-sm font-medium">Available</label>
                </div>
                <Button onClick={saveFood} className="w-full">
                  {editingFood?.id ? 'Update Food Item' : 'Add Food Item'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {foods.length === 0 ? (
          <div className="text-center py-8">
            <DollarSign className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No food items added yet. Add your first item!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {foods.map((food) => (
              <div key={food.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{food.name}</h4>
                    <p className="text-gray-600 text-sm">{food.description}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingFood(food);
                        setEditDialog(true);
                      }}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteFood(food.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{food.category}</Badge>
                  <Badge className={food.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {food.is_available ? 'Available' : 'Unavailable'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-blue-600">
                      {food.currency} {food.price}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {food.preparation_time} min
                    </span>
                  </div>
                  <Switch
                    checked={food.is_available}
                    onCheckedChange={() => toggleAvailability(food.id, food.is_available)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VendorFoodManagement;
