
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Plus, Edit, Trash2, Star, Home, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Address {
  id: string;
  label: string;
  type: string;
  street_address: string;
  apartment_unit: string | null;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  phone: string | null;
  is_default: boolean;
}

const AddressBook = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialog, setEditDialog] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Partial<Address> | null>(null);

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .order('is_default', { ascending: false });

      if (error) throw error;
      setAddresses(data || []);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveAddress = async () => {
    if (!user || !editingAddress) return;

    try {
      if (editingAddress.id) {
        const { error } = await supabase
          .from('addresses')
          .update({
            ...editingAddress,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingAddress.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('addresses')
          .insert({
            ...editingAddress,
            user_id: user.id
          });

        if (error) throw error;
      }

      toast({
        title: "Address Saved",
        description: "Address has been saved successfully",
      });

      setEditDialog(false);
      setEditingAddress(null);
      fetchAddresses();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save address",
        variant: "destructive"
      });
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
        title: "Address Deleted",
        description: "Address has been removed",
      });

      fetchAddresses();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete address",
        variant: "destructive"
      });
    }
  };

  const setDefaultAddress = async (id: string) => {
    try {
      const { error } = await supabase
        .from('addresses')
        .update({ is_default: true })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Default Address Set",
        description: "This address is now your default",
      });

      fetchAddresses();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to set default address",
        variant: "destructive"
      });
    }
  };

  const getAddressTypeIcon = (type: string) => {
    switch (type) {
      case 'home': return <Home className="h-4 w-4" />;
      case 'work': return <Building className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
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
            <MapPin className="h-5 w-5 text-blue-600" />
            Address Book
          </CardTitle>
          <Dialog open={editDialog} onOpenChange={setEditDialog}>
            <DialogTrigger asChild>
              <Button 
                size="sm"
                onClick={() => {
                  setEditingAddress({
                    label: '',
                    type: 'home',
                    street_address: '',
                    city: '',
                    state_province: '',
                    postal_code: '',
                    country: '',
                    is_default: false
                  });
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Address
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingAddress?.id ? 'Edit Address' : 'Add New Address'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Label</label>
                  <Input
                    value={editingAddress?.label || ''}
                    onChange={(e) => setEditingAddress(prev => ({ ...prev, label: e.target.value }))}
                    placeholder="e.g., Home, Work"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <Select 
                    value={editingAddress?.type || 'home'} 
                    onValueChange={(value) => setEditingAddress(prev => ({ ...prev, type: value }))}
                  >
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
                <div>
                  <label className="text-sm font-medium">Street Address</label>
                  <Input
                    value={editingAddress?.street_address || ''}
                    onChange={(e) => setEditingAddress(prev => ({ ...prev, street_address: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm font-medium">City</label>
                    <Input
                      value={editingAddress?.city || ''}
                      onChange={(e) => setEditingAddress(prev => ({ ...prev, city: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">State</label>
                    <Input
                      value={editingAddress?.state_province || ''}
                      onChange={(e) => setEditingAddress(prev => ({ ...prev, state_province: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm font-medium">Postal Code</label>
                    <Input
                      value={editingAddress?.postal_code || ''}
                      onChange={(e) => setEditingAddress(prev => ({ ...prev, postal_code: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Country</label>
                    <Input
                      value={editingAddress?.country || ''}
                      onChange={(e) => setEditingAddress(prev => ({ ...prev, country: e.target.value }))}
                    />
                  </div>
                </div>
                <Button onClick={saveAddress} className="w-full">
                  {editingAddress?.id ? 'Update Address' : 'Add Address'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {addresses.length === 0 ? (
          <div className="text-center py-8">
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No addresses saved. Add your first address!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div key={address.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getAddressTypeIcon(address.type)}
                    <h4 className="font-medium">{address.label}</h4>
                    {address.is_default && (
                      <Badge className="bg-yellow-100 text-yellow-800">
                        <Star className="h-3 w-3 mr-1" />
                        Default
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingAddress(address);
                        setEditDialog(true);
                      }}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteAddress(address.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  {address.street_address}
                  {address.apartment_unit && `, ${address.apartment_unit}`}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  {address.city}, {address.state_province} {address.postal_code}
                </p>
                <p className="text-gray-600 text-sm mb-3">{address.country}</p>
                {!address.is_default && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setDefaultAddress(address.id)}
                  >
                    <Star className="h-3 w-3 mr-1" />
                    Set as Default
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AddressBook;
