
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
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Plus, Edit, Trash2, Clock, DollarSign, Flame } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type VendorFood = Tables<'vendor_foods'>;
type VendorFoodInsert = TablesInsert<'vendor_foods'>;
type VendorFoodUpdate = TablesUpdate<'vendor_foods'>;

interface ExtendedVendorFood extends VendorFood {
  dietary_restrictions?: string[];
  allergens?: string[];
  spice_level?: number;
  nutritional_info?: any;
}

const VendorFoodManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [foods, setFoods] = useState<ExtendedVendorFood[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialog, setEditDialog] = useState(false);
  const [editingFood, setEditingFood] = useState<Partial<ExtendedVendorFood> | null>(null);

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

  const dietaryOptions = [
    'vegetarian',
    'vegan',
    'gluten-free',
    'dairy-free',
    'nut-free',
    'keto',
    'low-carb',
    'organic'
  ];

  const allergenOptions = [
    'nuts',
    'dairy',
    'eggs',
    'soy',
    'wheat',
    'shellfish',
    'fish',
    'sesame'
  ];

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
      
      // Extend foods with placeholder data for new fields
      const extendedFoods: ExtendedVendorFood[] = (data || []).map(food => ({
        ...food,
        dietary_restrictions: [],
        allergens: [],
        spice_level: 0,
        nutritional_info: null
      }));
      
      setFoods(extendedFoods);
    } catch (error) {
      console.error('Error fetching foods:', error);
      toast({
        title: "Error",
        description: "Failed to load your food items",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const saveFood = async () => {
    if (!user || !editingFood) return;

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
        const updateData: VendorFoodUpdate = {
          name: editingFood.name,
          description: editingFood.description,
          price: editingFood.price,
          currency: editingFood.currency || 'USD',
          image_url: editingFood.image_url,
          category: editingFood.category,
          is_available: editingFood.is_available ?? true,
          preparation_time: editingFood.preparation_time || 30,
          updated_at: new Date().toISOString()
        };

        const { error } = await supabase
          .from('vendor_foods')
          .update(updateData)
          .eq('id', editingFood.id);

        if (error) throw error;
      } else {
        const insertData: VendorFoodInsert = {
          vendor_id: user.id,
          name: editingFood.name,
          description: editingFood.description,
          price: editingFood.price!,
          currency: editingFood.currency || 'USD',
          image_url: editingFood.image_url,
          category: editingFood.category!,
          is_available: editingFood.is_available ?? true,
          preparation_time: editingFood.preparation_time || 30
        };

        const { error } = await supabase
          .from('vendor_foods')
          .insert(insertData);

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
      console.error('Error saving food item:', error);
      toast({
        title: "Error",
        description: "Failed to save food item",
        variant: "destructive"
      });
    }
  };

  const deleteFood = async (id: string) => {
    try {
      const { error } = await supabase
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
      console.error('Error deleting food item:', error);
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
      console.error('Error updating availability:', error);
      toast({
        title: "Error",
        description: "Failed to update availability",
        variant: "destructive"
      });
    }
  };

  const toggleDietaryRestriction = (restriction: string) => {
    const current = editingFood?.dietary_restrictions || [];
    const updated = current.includes(restriction)
      ? current.filter(r => r !== restriction)
      : [...current, restriction];
    setEditingFood(prev => ({ ...prev, dietary_restrictions: updated }));
  };

  const toggleAllergen = (allergen: string) => {
    const current = editingFood?.allergens || [];
    const updated = current.includes(allergen)
      ? current.filter(a => a !== allergen)
      : [...current, allergen];
    setEditingFood(prev => ({ ...prev, allergens: updated }));
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
                    preparation_time: 30,
                    dietary_restrictions: [],
                    allergens: [],
                    spice_level: 0
                  });
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Food Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingFood?.id ? 'Edit Food Item' : 'Add New Food Item'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {/* Basic Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Name *</label>
                    <Input
                      value={editingFood?.name || ''}
                      onChange={(e) => setEditingFood(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Food item name"
                    />
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
                </div>

                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={editingFood?.description || ''}
                    onChange={(e) => setEditingFood(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your food item"
                  />
                </div>

                {/* Price and Time */}
                <div className="grid grid-cols-3 gap-4">
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
                  <div>
                    <label className="text-sm font-medium">Prep Time (min)</label>
                    <Input
                      type="number"
                      value={editingFood?.preparation_time || 30}
                      onChange={(e) => setEditingFood(prev => ({ ...prev, preparation_time: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>

                {/* Spice Level */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Spice Level: {editingFood?.spice_level || 0} 
                    {editingFood?.spice_level && editingFood.spice_level > 0 && (
                      <span className="ml-2">
                        {Array.from({ length: editingFood.spice_level }, (_, i) => (
                          <Flame key={i} className="inline h-3 w-3 text-red-500 fill-current" />
                        ))}
                      </span>
                    )}
                  </label>
                  <Slider
                    value={[editingFood?.spice_level || 0]}
                    onValueChange={(value) => setEditingFood(prev => ({ ...prev, spice_level: value[0] }))}
                    max={5}
                    step={1}
                    className="mt-2"
                  />
                </div>

                {/* Dietary Restrictions */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Dietary Information</label>
                  <div className="grid grid-cols-2 gap-3">
                    {dietaryOptions.map(option => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`diet-${option}`}
                          checked={editingFood?.dietary_restrictions?.includes(option) || false}
                          onCheckedChange={() => toggleDietaryRestriction(option)}
                        />
                        <label htmlFor={`diet-${option}`} className="text-sm capitalize">
                          {option.replace('-', ' ')}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Allergens */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Contains Allergens</label>
                  <div className="grid grid-cols-2 gap-3">
                    {allergenOptions.map(allergen => (
                      <div key={allergen} className="flex items-center space-x-2">
                        <Checkbox
                          id={`allergen-${allergen}`}
                          checked={editingFood?.allergens?.includes(allergen) || false}
                          onCheckedChange={() => toggleAllergen(allergen)}
                        />
                        <label htmlFor={`allergen-${allergen}`} className="text-sm capitalize">
                          {allergen}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Image URL</label>
                  <Input
                    value={editingFood?.image_url || ''}
                    onChange={(e) => setEditingFood(prev => ({ ...prev, image_url: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
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
                
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge variant="outline">{food.category}</Badge>
                  <Badge className={food.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {food.is_available ? 'Available' : 'Unavailable'}
                  </Badge>
                  {food.dietary_restrictions?.map(restriction => (
                    <Badge key={restriction} className="bg-blue-100 text-blue-800 text-xs">
                      {restriction}
                    </Badge>
                  ))}
                  {food.spice_level && food.spice_level > 0 && (
                    <Badge className="bg-red-100 text-red-800 text-xs">
                      {Array.from({ length: food.spice_level }, (_, i) => '🌶️').join('')}
                    </Badge>
                  )}
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
                
                {food.allergens && food.allergens.length > 0 && (
                  <div className="mt-2 text-xs text-orange-600">
                    ⚠️ Contains: {food.allergens.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VendorFoodManagement;
