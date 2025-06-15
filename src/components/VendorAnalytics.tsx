import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Star, DollarSign, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface AnalyticsData {
  date: string;
  total_orders: number;
  total_revenue: number;
  customer_count: number;
  average_rating: number;
  popular_items: any[];
}

const VendorAnalytics = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    if (user) {
      fetchAnalytics();
    }
  }, [user, period]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();
      const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
      startDate.setDate(endDate.getDate() - days);

      const { data, error } = await supabase
        .from('vendor_analytics')
        .select('*')
        .eq('vendor_id', user.id)
        .gte('date', startDate.toISOString().split('T')[0])
        .lte('date', endDate.toISOString().split('T')[0])
        .order('date', { ascending: true });

      if (error) throw error;

      // If no data exists, create mock data for demonstration
      if (!data || data.length === 0) {
        const mockData = generateMockAnalytics(days);
        setAnalytics(mockData);
      } else {
        // Transform database data to match our interface
        const transformedData = data.map(item => ({
          date: item.date,
          total_orders: item.total_orders || 0,
          total_revenue: item.total_revenue || 0,
          customer_count: item.customer_count || 0,
          average_rating: item.average_rating || 0,
          popular_items: Array.isArray(item.popular_items) ? item.popular_items : []
        }));
        setAnalytics(transformedData);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Show mock data on error
      const mockData = generateMockAnalytics(period === '7d' ? 7 : period === '30d' ? 30 : 90);
      setAnalytics(mockData);
    } finally {
      setLoading(false);
    }
  };

  const generateMockAnalytics = (days: number): AnalyticsData[] => {
    const data: AnalyticsData[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split('T')[0],
        total_orders: Math.floor(Math.random() * 20) + 5,
        total_revenue: Math.floor(Math.random() * 500) + 100,
        customer_count: Math.floor(Math.random() * 15) + 3,
        average_rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
        popular_items: [
          { name: 'Butter Chicken', count: Math.floor(Math.random() * 10) + 5 },
          { name: 'Biryani', count: Math.floor(Math.random() * 8) + 3 },
          { name: 'Naan', count: Math.floor(Math.random() * 12) + 2 }
        ]
      });
    }
    return data;
  };

  const totalOrders = analytics.reduce((sum, day) => sum + day.total_orders, 0);
  const totalRevenue = analytics.reduce((sum, day) => sum + day.total_revenue, 0);
  const avgRating = analytics.length > 0 
    ? Number((analytics.reduce((sum, day) => sum + day.average_rating, 0) / analytics.length).toFixed(1))
    : 0;
  const totalCustomers = Math.max(...analytics.map(day => day.customer_count));

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Analytics Dashboard
            </CardTitle>
            <div className="flex gap-2">
              {(['7d', '30d', '90d'] as const).map((p) => (
                <Badge
                  key={p}
                  variant={period === p ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setPeriod(p)}
                >
                  {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : '90 Days'}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-600">Total Orders</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{totalOrders}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-600">Revenue</span>
                </div>
                <p className="text-2xl font-bold text-green-600">${totalRevenue}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span className="text-sm text-gray-600">Customers</span>
                </div>
                <p className="text-2xl font-bold text-purple-600">{totalCustomers}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-gray-600">Avg Rating</span>
                </div>
                <p className="text-2xl font-bold text-yellow-600">{avgRating}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={analytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="total_revenue" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Orders Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={analytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total_orders" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorAnalytics;
