
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useEnhancedAuth } from '@/contexts/EnhancedAuthContext';
import { supabase } from '@/integrations/supabase/client';
import CleanHeader from '@/components/navigation/CleanHeader';
import VendorFoodManagement from '@/components/VendorFoodManagement';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  ShoppingBag,
  Clock,
  Star,
  Settings,
  Bell,
  BarChart3,
  Package
} from 'lucide-react';

interface VendorOrder {
  id: string;
  service_type: string;
  total_amount: number;
  currency: string;
  status: string;
  vendor_status: string;
  created_at: string;
  items: any;
  recipient_info: any;
}

interface VendorStats {
  totalRevenue: number;
  totalOrders: number;
  averageRating: number;
  totalCustomers: number;
}

const VendorDashboard = () => {
  const { profile, vendorProfile, user } = useEnhancedAuth();
  const navigate = useNavigate();
  const [recentOrders, setRecentOrders] = useState<VendorOrder[]>([]);
  const [stats, setStats] = useState<VendorStats>({
    totalRevenue: 0,
    totalOrders: 0,
    averageRating: 4.5,
    totalCustomers: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'menu' | 'analytics'>('overview');

  useEffect(() => {
    if (user) {
      fetchVendorData();
    }
  }, [user]);

  const fetchVendorData = async () => {
    if (!user) return;

    try {
      console.log('Fetching vendor data for user:', user.id);
      
      // Fetch vendor orders
      const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('assigned_vendor_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (orders) {
        setRecentOrders(orders);
        
        // Calculate stats from orders
        const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total_amount), 0);
        const uniqueCustomers = new Set(orders.map(order => order.user_id)).size;

        setStats({
          totalRevenue,
          totalOrders: orders.length,
          averageRating: 4.5, // This would come from reviews
          totalCustomers: uniqueCustomers
        });
      }
    } catch (error) {
      console.error('Error fetching vendor data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ vendor_status: status })
        .eq('id', orderId);

      if (!error) {
        fetchVendorData(); // Refresh data
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-yellow-100 text-yellow-800';
      case 'ready': return 'bg-purple-100 text-purple-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <CleanHeader />
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <CleanHeader />
      
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {vendorProfile?.business_name || 'Vendor Dashboard'} 🏪
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your business and track performance
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" onClick={() => navigate('/profile')}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                </div>
                <ShoppingBag className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Customers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'menu', label: 'Menu Management', icon: Package },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
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
                  <p className="text-gray-600">No orders yet. Start promoting your business!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentOrders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <ShoppingBag className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            Order #{order.id.slice(0, 8)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className={getStatusColor(order.vendor_status)}>
                          {order.vendor_status}
                        </Badge>
                        <p className="font-semibold text-gray-900">
                          {order.currency} {order.total_amount}
                        </p>
                        {order.vendor_status === 'pending' && (
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => updateOrderStatus(order.id, 'accepted')}>
                              Accept
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => updateOrderStatus(order.id, 'rejected')}>
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === 'orders' && (
          <Card>
            <CardHeader>
              <CardTitle>All Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <ShoppingBag className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Order #{order.id.slice(0, 8)}</p>
                        <p className="text-sm text-gray-600">{new Date(order.created_at).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">
                          Customer: {order.recipient_info?.name || 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={getStatusColor(order.vendor_status)}>
                        {order.vendor_status}
                      </Badge>
                      <p className="font-semibold text-gray-900">{order.currency} {order.total_amount}</p>
                      <select
                        value={order.vendor_status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="px-3 py-1 border rounded-md text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="preparing">Preparing</option>
                        <option value="ready">Ready</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'menu' && <VendorFoodManagement />}

        {activeTab === 'analytics' && (
          <Card>
            <CardHeader>
              <CardTitle>Business Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Revenue Trend</h3>
                  <p className="text-2xl font-bold text-blue-600">${stats.totalRevenue.toFixed(2)}</p>
                  <p className="text-sm text-blue-600">Total this month</p>
                </div>
                <div className="p-6 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Order Growth</h3>
                  <p className="text-2xl font-bold text-green-600">{stats.totalOrders}</p>
                  <p className="text-sm text-green-600">Orders this month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;
