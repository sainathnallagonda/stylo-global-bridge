
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Package, Play, Pause, X, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Subscription {
  id: string;
  service_type: string;
  frequency: string;
  items: any;
  total_amount: number;
  currency: string;
  status: string;
  next_delivery_date: string;
  created_at: string;
}

const SubscriptionManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialog, setCreateDialog] = useState(false);
  const [newSubscription, setNewSubscription] = useState({
    service_type: '',
    frequency: '',
    items: [],
    total_amount: 0,
    currency: 'USD'
  });

  useEffect(() => {
    if (user) {
      fetchSubscriptions();
    }
  }, [user]);

  const fetchSubscriptions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubscriptions(data || []);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSubscriptionStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Subscription Updated",
        description: `Subscription ${status} successfully`,
      });

      fetchSubscriptions();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update subscription",
        variant: "destructive"
      });
    }
  };

  const createSubscription = async () => {
    if (!user) return;

    try {
      const nextDeliveryDate = new Date();
      nextDeliveryDate.setDate(nextDeliveryDate.getDate() + 7); // Default to next week

      const { error } = await supabase
        .from('subscriptions')
        .insert({
          user_id: user.id,
          service_type: newSubscription.service_type,
          frequency: newSubscription.frequency,
          items: { items: ['Sample Item'] },
          delivery_address: { address: 'Default Address' },
          total_amount: newSubscription.total_amount,
          currency: newSubscription.currency,
          next_delivery_date: nextDeliveryDate.toISOString().split('T')[0]
        });

      if (error) throw error;

      toast({
        title: "Subscription Created",
        description: "Your subscription has been set up successfully",
      });

      setCreateDialog(false);
      fetchSubscriptions();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create subscription",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case 'weekly': return 'Every Week';
      case 'bi-weekly': return 'Every 2 Weeks';
      case 'monthly': return 'Every Month';
      default: return frequency;
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
            <Package className="h-5 w-5 text-blue-600" />
            Subscription Services
          </CardTitle>
          <Dialog open={createDialog} onOpenChange={setCreateDialog}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Subscription
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Subscription</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Service Type</label>
                  <Select value={newSubscription.service_type} onValueChange={(value) => 
                    setNewSubscription(prev => ({ ...prev, service_type: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">Food Delivery</SelectItem>
                      <SelectItem value="groceries">Groceries</SelectItem>
                      <SelectItem value="gifts">Gifts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Frequency</label>
                  <Select value={newSubscription.frequency} onValueChange={(value) => 
                    setNewSubscription(prev => ({ ...prev, frequency: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={createSubscription} className="w-full">
                  Create Subscription
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {subscriptions.length === 0 ? (
          <div className="text-center py-8">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No subscriptions yet. Create your first recurring delivery!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {subscriptions.map((sub) => (
              <div key={sub.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium capitalize">{sub.service_type} Subscription</h4>
                    <p className="text-sm text-gray-600">{getFrequencyText(sub.frequency)}</p>
                  </div>
                  <Badge className={getStatusColor(sub.status)}>
                    {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    Next delivery: {new Date(sub.next_delivery_date).toLocaleDateString()}
                  </div>
                  <span className="font-bold text-blue-600">
                    {sub.currency} {sub.total_amount}
                  </span>
                </div>

                <div className="flex gap-2">
                  {sub.status === 'active' ? (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateSubscriptionStatus(sub.id, 'paused')}
                    >
                      <Pause className="h-3 w-3 mr-1" />
                      Pause
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateSubscriptionStatus(sub.id, 'active')}
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Resume
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => updateSubscriptionStatus(sub.id, 'cancelled')}
                  >
                    <X className="h-3 w-3 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionManager;
