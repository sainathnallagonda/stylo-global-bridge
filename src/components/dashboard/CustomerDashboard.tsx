
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useEnhancedAuth } from '@/contexts/EnhancedAuthContext';
import { supabase } from '@/integrations/supabase/client';
import CleanHeader from '@/components/navigation/CleanHeader';
import { 
  ShoppingBag, 
  Clock, 
  Star, 
  Utensils, 
  Car, 
  Gift,
  Wallet,
  User,
  Bell,
  TrendingUp
} from 'lucide-react';

interface RecentOrder {
  id: string;
  service_type: string;
  total_amount: number;
  currency: string;
  status: string;
  created_at: string;
  items: any;
}

const CustomerDashboard = () => {
  const { profile, user } = useEnhancedAuth();
  const navigate = useNavigate();
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [walletBalance, setWalletBalance] = useState({ usd: 0, inr: 0 });
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      console.log('Fetching dashboard data for user:', user.id);
      
      // Fetch recent orders
      const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (orders) setRecentOrders(orders);

      // Fetch wallet balance
      const { data: wallet } = await supabase
        .from('user_wallets')
        .select('usd_balance, inr_balance')
        .eq('user_id', user.id)
        .single();

      if (wallet) {
        setWalletBalance({
          usd: wallet.usd_balance || 0,
          inr: wallet.inr_balance || 0
        });
      }

      // Fetch loyalty points
      const { data: points } = await supabase
        .rpc('get_user_loyalty_points', { user_uuid: user.id });

      if (points) setLoyaltyPoints(points);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const serviceCards = [
    {
      title: 'Food Delivery',
      description: 'Order from your favorite restaurants',
      icon: Utensils,
      color: 'bg-orange-500',
      route: '/food-delivery'
    },
    {
      title: 'Groceries',
      description: 'Fresh groceries delivered to your door',
      icon: ShoppingBag,
      color: 'bg-green-500',
      route: '/groceries'
    },
    {
      title: 'Gifts',
      description: 'Send gifts to your loved ones',
      icon: Gift,
      color: 'bg-purple-500',
      route: '/gifts'
    },
    {
      title: 'Rides',
      description: 'Book rides anywhere, anytime',
      icon: Car,
      color: 'bg-blue-500',
      route: '/rides'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <CleanHeader />
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <CleanHeader />
      
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {profile?.full_name || 'Customer'}! 👋
            </h1>
            <p className="text-gray-600 mt-1">Ready to explore our services?</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/profile')}>
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{recentOrders.length}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Wallet Balance</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${walletBalance.usd} | ₹{walletBalance.inr}
                  </p>
                </div>
                <Wallet className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Loyalty Points</p>
                  <p className="text-2xl font-bold text-gray-900">{loyaltyPoints}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service Cards */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCards.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card 
                  key={index} 
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => navigate(service.route)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-lg ${service.color} text-white group-hover:scale-110 transition-transform`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No orders yet. Start exploring our services!</p>
                <Button className="mt-4" onClick={() => navigate('/food-delivery')}>
                  Order Now
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <ShoppingBag className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 capitalize">
                          {order.service_type.replace('-', ' ')}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      <p className="font-semibold text-gray-900">
                        {order.currency} {order.total_amount}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="text-center pt-4">
                  <Button variant="outline" onClick={() => navigate('/orders')}>
                    View All Orders
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDashboard;
