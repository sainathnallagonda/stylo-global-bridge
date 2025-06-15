import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MapPin, Plus, Edit, Trash, Home, Briefcase, MapIcon } from 'lucide-react';

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  label: string;
  street_address: string;
  apartment_unit?: string | null;
  city: string;
  state_province: string;
  postal_code: string;
  country: 'USA' | 'India';
  phone?: string | null;
  is_default: boolean | null;
}

const AddressManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    type: 'home' as 'home' | 'work' | 'other',
    label: '',
    street_address: '',
    apartment_unit: '',
    city: '',
    state_province: '',
    postal_code: '',
    country: 'USA' as 'USA' | 'India',
    phone: '',
    is_default: false
  });

  useEffect(() => {
    fetchAddresses();
  }, [user]);

  const fetchAddresses = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false });

      if (error) throw error;
      
      const typedAddresses: Address[] = (data || []).map(addr => ({
        id: addr.id,
        type: addr.type as 'home' | 'work' | 'other',
        label: addr.label,
        street_address: addr.street_address,
        apartment_unit: addr.apartment_unit,
        city: addr.city,
        state_province: addr.state_province,
        postal_code: addr.postal_code,
        country: addr.country as 'USA' | 'India',
        phone: addr.phone,
        is_default: addr.is_default
      }));
      
      setAddresses(typedAddresses);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast({
        title: "Error",
        description: "Failed to load addresses",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      type: 'home',
      label: '',
      street_address: '',
      apartment_unit: '',
      city: '',
      state_province: '',
      postal_code: '',
      country: 'USA',
      phone: '',
      is_default: false
    });
    setEditingAddress(null);
  };

  const openEditDialog = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      type: address.type,
      label: address.label,
      street_address: address.street_address,
      apartment_unit: address.apartment_unit || '',
      city: address.city,
      state_province: address.state_province,
      postal_code: address.postal_code,
      country: address.country,
      phone: address.phone || '',
      is_default: address.is_default || false
    });
    setIsDialogOpen(true);
  };

  const saveAddress = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const addressData = {
        ...formData,
        user_id: user.id,
        updated_at: new Date().toISOString()
      };

      if (editingAddress) {
        const { error } = await supabase
          .from('addresses')
          .update(addressData)
          .eq('id', editingAddress.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('addresses')
          .insert(addressData);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: editingAddress ? "Address updated successfully" : "Address added successfully"
      });

      setIsDialogOpen(false);
      resetForm();
      fetchAddresses();
    } catch (error) {
      console.error('Error saving address:', error);
      toast({
        title: "Error",
        description: "Failed to save address",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (id: string) => {
    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Address deleted successfully"
      });

      fetchAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
      toast({
        title: "Error",
        description: "Failed to delete address",
        variant: "destructive"
      });
    }
  };

  const getAddressTypeIcon = (type: string) => {
    switch (type) {
      case 'home': return <Home className="h-4 w-4" />;
      case 'work': return <Briefcase className="h-4 w-4" />;
      default: return <MapIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Delivery Addresses</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Address
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={formData.type} onValueChange={(value: any) => setFormData(prev => ({...prev, type: value}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">Home</SelectItem>
                      <SelectItem value="work">Work</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Label</Label>
                  <Input
                    value={formData.label}
                    onChange={(e) => setFormData(prev => ({...prev, label: e.target.value}))}
                    placeholder="e.g., Home, Office"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Street Address</Label>
                <Input
                  value={formData.street_address}
                  onChange={(e) => setFormData(prev => ({...prev, street_address: e.target.value}))}
                  placeholder="Street address"
                />
              </div>

              <div className="space-y-2">
                <Label>Apartment/Unit (Optional)</Label>
                <Input
                  value={formData.apartment_unit}
                  onChange={(e) => setFormData(prev => ({...prev, apartment_unit: e.target.value}))}
                  placeholder="Apt, Suite, Unit"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({...prev, city: e.target.value}))}
                    placeholder="City"
                  />
                </div>
                <div className="space-y-2">
                  <Label>State/Province</Label>
                  <Input
                    value={formData.state_province}
                    onChange={(e) => setFormData(prev => ({...prev, state_province: e.target.value}))}
                    placeholder="State/Province"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Postal Code</Label>
                  <Input
                    value={formData.postal_code}
                    onChange={(e) => setFormData(prev => ({...prev, postal_code: e.target.value}))}
                    placeholder="Postal Code"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Select value={formData.country} onValueChange={(value: any) => setFormData(prev => ({...prev, country: value}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USA">United States</SelectItem>
                      <SelectItem value="India">India</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Phone (Optional)</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                  placeholder="Phone number"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="default-address"
                  checked={formData.is_default}
                  onCheckedChange={(checked) => setFormData(prev => ({...prev, is_default: checked}))}
                />
                <Label htmlFor="default-address">Set as default address</Label>
              </div>

              <Button onClick={saveAddress} disabled={loading} className="w-full">
                {loading ? 'Saving...' : editingAddress ? 'Update Address' : 'Add Address'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {addresses.map((address) => (
          <Card key={address.id} className={`relative ${address.is_default ? 'ring-2 ring-blue-500' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getAddressTypeIcon(address.type)}
                  <CardTitle className="text-lg">{address.label}</CardTitle>
                  {address.is_default && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Default</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => openEditDialog(address)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteAddress(address.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600">
                <p>{address.street_address}</p>
                {address.apartment_unit && <p>{address.apartment_unit}</p>}
                <p>{address.city}, {address.state_province} {address.postal_code}</p>
                <p>{address.country}</p>
                {address.phone && <p>Phone: {address.phone}</p>}
              </div>
            </CardContent>
          </Card>
        ))}

        {addresses.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No addresses added yet</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Address
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AddressManagement;
