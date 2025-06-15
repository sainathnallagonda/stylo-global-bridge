
import { useEffect, useState } from 'react';
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, Eye, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Order {
  id: string;
  service_type: string;
  status: string;
  total_amount: number;
  currency: string;
  recipient_country: string;
  created_at: string;
  recipient_info: any;
}

interface OrderTracking {
  id: string;
  status: string;
  message: string;
  location: string;
  timestamp: string;
}

const Orders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [tracking, setTracking] = useState<OrderTracking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTracking = async (orderId: string) => {
    try {
      const { data, error } = await supabase
        .from('order_tracking')
        .select('*')
        .eq('order_id', orderId)
        .order('timestamp', { ascending: false });

      if (error) throw error;
      setTracking(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch tracking information",
        variant: "destructive"
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'confirmed':
      case 'processing':
        return <Package className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'confirmed':
      case 'processing':
        return 'bg-blue-500';
      case 'shipped':
        return 'bg-purple-500';
      case 'delivered':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredOrders = orders.filter(order =>
    order.service_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.recipient_country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your Orders
            </h1>
            <p className="text-gray-600 mt-2">Track and manage all your orders in one place</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/80 backdrop-blur-sm border-gray-200 rounded-xl"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Orders List */}
          <div>
            {filteredOrders.length === 0 ? (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-12 text-center">
                  <Package className="h-20 w-20 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders yet</h3>
                  <p className="text-gray-600 mb-6">Start sending love across borders!</p>
                  <Button 
                    onClick={() => navigate('/')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600"
                  >
                    Browse Services
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <Card key={order.id} className="cursor-pointer hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(order.status)}
                          <Badge className={`${getStatusColor(order.status)} text-white border-0`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedOrder(order);
                            fetchTracking(order.id);
                          }}
                          className="rounded-full"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Track
                        </Button>
                      </div>
                      
                      <h3 className="font-bold text-lg mb-2 text-gray-800">
                        {order.service_type.charAt(0).toUpperCase() + order.service_type.slice(1)} Order
                      </h3>
                      
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-600">
                          <span className="font-medium">To:</span> {order.recipient_country.charAt(0).toUpperCase() + order.recipient_country.slice(1)}
                        </p>
                        <p className="text-lg font-bold text-blue-600">
                          {order.currency} {order.total_amount}
                        </p>
                        <p className="text-gray-500">
                          {new Date(order.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Order Tracking */}
          <div>
            {selectedOrder ? (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Order #{selectedOrder.id.slice(0, 8)}
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    {selectedOrder.service_type.charAt(0).toUpperCase() + selectedOrder.service_type.slice(1)} delivery to {selectedOrder.recipient_country}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {tracking.length === 0 ? (
                    <div className="text-center py-8">
                      <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No tracking information available yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {tracking.map((track, index) => (
                        <div key={track.id} className="flex items-start space-x-4">
                          <div className={`w-4 h-4 rounded-full mt-2 ${getStatusColor(track.status)} shadow-lg`}></div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-gray-800">
                                {track.status.charAt(0).toUpperCase() + track.status.slice(1)}
                              </h4>
                              <span className="text-sm text-gray-500">
                                {new Date(track.timestamp).toLocaleString()}
                              </span>
                            </div>
                            {track.message && (
                              <p className="text-gray-600 mb-1">{track.message}</p>
                            )}
                            {track.location && (
                              <p className="text-sm text-gray-500 flex items-center gap-1">
                                📍 {track.location}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-12 text-center">
                  <Package className="h-20 w-20 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Select an Order</h3>
                  <p className="text-gray-600">Choose an order from the list to view detailed tracking information</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Orders;
