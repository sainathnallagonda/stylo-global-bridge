
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  Clock, 
  MapPin, 
  Gift, 
  Utensils,
  Car,
  Plane,
  Users,
  Package
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEnhancedAuth } from '@/contexts/EnhancedAuthContext';
import { useAppState } from '@/contexts/AppStateContext';
import CleanHeader from '@/components/navigation/CleanHeader';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { profile } = useEnhancedAuth();
  const { cartCount, openCart } = useAppState();

  const services = [
    {
      title: 'Food Delivery',
      description: 'Order delicious meals from local restaurants',
      icon: Utensils,
      path: '/food-delivery',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Groceries',
      description: 'Fresh groceries delivered to your door',
      icon: ShoppingCart,
      path: '/groceries',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Gifts & Flowers',
      description: 'Send gifts and flowers to your loved ones',
      icon: Gift,
      path: '/gifts',
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: 'Rides',
      description: 'Book a ride to your destination',
      icon: Car,
      path: '/rides',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Travel',
      description: 'Book flights and plan your trips',
      icon: Plane,
      path: '/travel',
      color: 'from-purple-500 to-violet-500'
    },
    {
      title: 'Care Services',
      description: 'Healthcare and wellness services',
      icon: Users,
      path: '/care',
      color: 'from-teal-500 to-green-500'
    }
  ];

  const quickActions = [
    {
      title: 'View Cart',
      description: `${cartCount} items in cart`,
      icon: ShoppingCart,
      action: openCart,
      color: 'bg-blue-500'
    },
    {
      title: 'Order History',
      description: 'View past orders',
      icon: Package,
      action: () => navigate('/orders'),
      color: 'bg-green-500'
    },
    {
      title: 'Favorites',
      description: 'Your saved items',
      icon: Heart,
      action: () => navigate('/favorites'),
      color: 'bg-red-500'
    },
    {
      title: 'Track Orders',
      description: 'Live order tracking',
      icon: MapPin,
      action: () => navigate('/orders'),
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <CleanHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {profile?.full_name || 'Customer'}!
          </h1>
          <p className="text-gray-600">
            What would you like to order today?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-0"
                onClick={action.action}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{action.title}</h3>
                  <p className="text-xs text-gray-600">{action.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Services */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card 
                  key={index}
                  className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 overflow-hidden group"
                  onClick={() => navigate(service.path)}
                >
                  <CardContent className="p-0">
                    <div className={`h-32 bg-gradient-to-r ${service.color} flex items-center justify-center relative overflow-hidden`}>
                      <IconComponent className="h-16 w-16 text-white group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                      >
                        Explore Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
            <CardContent className="p-8 text-center">
              <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No recent activity</h3>
              <p className="text-gray-600">Start ordering to see your activity here!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
