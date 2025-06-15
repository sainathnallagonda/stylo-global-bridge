import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Package, Clock, DollarSign, Play, Pause, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Subscription {
  id: string;
  service_type: string;
  frequency: string;
  total_amount: number;
  currency: string;
  status: string;
  next_delivery_date: string;
  items: any[];
  delivery_address: any;
  created_at: string;
}

const SubscriptionManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSubscriptions();
    }
  }, [user]);

  const fetchSubscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        // Transform database data to match our interface
        const transformedData = data.map(item => ({
          id: item.id,
          service_type: item.service_type,
          frequency: item.frequency,
          total_amount: item.total_amount,
          currency: item.currency,
          status: item.status,
          next_delivery_date: item.next_delivery_date,
          items: Array.isArray(item.items) ? item.items : [],
          delivery_address: typeof item.delivery_address === 'object' ? item.delivery_address : {},
          created_at: item.created_at
        }));
        setSubscriptions(transformedData);
      } else {
        // Show mock subscriptions for demonstration
        const mockSubscriptions: Subscription[] = [
          {
            id: '1',
            service_type: 'food_delivery',
            frequency: 'weekly',
            total_amount: 150,
            currency: 'USD',
            status: 'active',
            next_delivery_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            items: [
              { name: 'Butter Chicken', quantity: 2, price: 25 },
              { name: 'Basmati Rice', quantity: 1, price: 15 }
            ],
            delivery_address: {
              street: '123 Main St',
              city: 'New York',
              state: 'NY',
              zip: '10001'
            },
            created_at: new Date().toISOString()
          },
          {
            id: '2',
            service_type: 'groceries',
            frequency: 'bi-weekly',
            total_amount: 200,
            currency: 'USD',
            status: 'paused',
            next_delivery_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            items: [
              { name: 'Fresh Vegetables', quantity: 1, price: 50 },
              { name: 'Dairy Products', quantity: 1, price: 30 }
            ],
            delivery_address: {
              street: '123 Main St',
              city: 'New York',
              state: 'NY',
              zip: '10001'
            },
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];
        setSubscriptions(mockSubscriptions);
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSubscriptionStatus = async (subscriptionId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ status: newStatus })
        .eq('id', subscriptionId);

      if (error) throw error;

      setSubscriptions(prev =>
        prev.map(sub =>
          sub.id === subscriptionId ? { ...sub, status: newStatus } : sub
        )
      );

      toast({
        title: "Subscription Updated",
        description: `Subscription ${newStatus === 'active' ? 'resumed' : newStatus}`,
      });
    } catch (error) {
      console.error('Error updating subscription:', error);
      toast({
        title: "Error",
        description: "Failed to update subscription",
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
      case 'weekly': return 'Every week';
      case 'bi-weekly': return 'Every 2 weeks';
      case 'monthly': return 'Every month';
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
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-blue-600" />
          Subscription Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        {subscriptions.length === 0 ? (
          <div className="text-center py-8">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No active subscriptions</p>
            <Button>Create Subscription</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {subscriptions.map((subscription) => (
              <Card key={subscription.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold capitalize">
                          {subscription.service_type.replace('_', ' ')}
                        </h3>
                        <Badge className={getStatusColor(subscription.status)}>
                          {subscription.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {getFrequencyText(subscription.frequency)}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {subscription.currency} {subscription.total_amount}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Next: {new Date(subscription.next_delivery_date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {subscription.status === 'active' ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateSubscriptionStatus(subscription.id, 'paused')}
                        >
                          <Pause className="h-3 w-3 mr-1" />
                          Pause
                        </Button>
                      ) : subscription.status === 'paused' ? (
                        <Button
                          size="sm"
                          onClick={() => updateSubscriptionStatus(subscription.id, 'active')}
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Resume
                        </Button>
                      ) : null}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateSubscriptionStatus(subscription.id, 'cancelled')}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Items</h4>
                      <div className="space-y-1">
                        {subscription.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.name} (x{item.quantity})</span>
                            <span>{subscription.currency} {item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Delivery Address</h4>
                      <div className="text-sm text-gray-600">
                        <p>{subscription.delivery_address.street}</p>
                        <p>
                          {subscription.delivery_address.city}, {subscription.delivery_address.state} {subscription.delivery_address.zip}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionManager;
