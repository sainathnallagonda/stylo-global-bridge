
import { useState, useEffect } from "react";
import { Package, Clock, CheckCircle, XCircle, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEnhancedAuth } from "@/contexts/EnhancedAuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import CleanHeader from "@/components/navigation/CleanHeader";
import BackButton from "@/components/BackButton";
import type { Tables } from "@/integrations/supabase/types";

type Order = Tables<'orders'>;

const Orders = () => {
  const { user } = useEnhancedAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to load orders",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'preparing':
        return <Package className="h-4 w-4 text-orange-500" />;
      case 'out_for_delivery':
        return <Truck className="h-4 w-4 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'pending': 'outline',
      'confirmed': 'default',
      'preparing': 'secondary',
      'out_for_delivery': 'default',
      'delivered': 'default',
      'cancelled': 'destructive'
    };

    return (
      <Badge variant={variants[status] || 'outline'} className="flex items-center gap-1">
        {getStatusIcon(status)}
        {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <CleanHeader />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-6">
            <BackButton fallbackPath="/" />
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/50 animate-pulse rounded-xl h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <CleanHeader />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <BackButton fallbackPath="/" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-600">Track your order history and status</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-sm border max-w-md mx-auto">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-600">Start ordering to see your order history here.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Package className="h-5 w-5 text-blue-600" />
                      Order #{order.id.slice(-8)}
                    </CardTitle>
                    {getStatusBadge(order.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{order.service_type}</span>
                    <span>•</span>
                    <span>{new Date(order.created_at).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="font-medium">
                      {order.currency} {order.total_amount}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Order Items */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Items:</h4>
                      <div className="space-y-1">
                        {Array.isArray(order.items) ? order.items.map((item: any, index: number) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.name || 'Item'}</span>
                            <span>{item.quantity || 1}x</span>
                          </div>
                        )) : (
                          <div className="text-sm text-gray-600">Order details</div>
                        )}
                      </div>
                    </div>

                    {/* Delivery Address */}
                    {order.delivery_address && typeof order.delivery_address === 'object' && (order.delivery_address as any).address && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Delivery Address:</h4>
                        <p className="text-sm text-gray-600">{(order.delivery_address as any).address}</p>
                      </div>
                    )}

                    {/* Special Instructions */}
                    {order.special_instructions && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Special Instructions:</h4>
                        <p className="text-sm text-gray-600">{order.special_instructions}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
