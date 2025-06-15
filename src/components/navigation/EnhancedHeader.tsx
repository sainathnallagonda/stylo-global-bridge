
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  User, 
  ShoppingCart, 
  Menu, 
  X, 
  Home,
  Utensils,
  ShoppingBag,
  Gift,
  Car,
  LogOut,
  Settings
} from 'lucide-react';
import { useEnhancedAuth } from '@/contexts/EnhancedAuthContext';
import { useAppState } from '@/contexts/AppStateContext';

const EnhancedHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, isVendor, isCustomer, signOut } = useEnhancedAuth();
  const { cartCount, openCart } = useAppState();
  const navigate = useNavigate();
  const location = useLocation();

  const customerNavItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Food Delivery', href: '/food-delivery', icon: Utensils },
    { name: 'Groceries', href: '/groceries', icon: ShoppingBag },
    { name: 'Gifts', href: '/gifts', icon: Gift },
    { name: 'Rides', href: '/rides', icon: Car },
  ];

  const vendorNavItems = [
    { name: 'Dashboard', href: '/vendor-dashboard', icon: Home },
    { name: 'Orders', href: '/vendor-orders', icon: ShoppingBag },
    { name: 'Menu', href: '/vendor-menu', icon: Utensils },
    { name: 'Analytics', href: '/vendor-analytics', icon: Settings },
  ];

  const navItems = isVendor ? vendorNavItems : customerNavItems;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleDashboardClick = () => {
    if (isVendor) {
      navigate('/vendor-dashboard');
    } else if (isCustomer) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
    setIsMenuOpen(false);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Stylo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActivePath(item.href)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart (Customer only) */}
            {isCustomer && (
              <button
                onClick={openCart}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </Badge>
                )}
              </button>
            )}

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={handleDashboardClick}
                  className="flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {profile?.full_name || 'Dashboard'}
                  </span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="hidden sm:flex items-center space-x-1"
                >
                  <LogOut className="h-3 w-3" />
                  <span>Sign Out</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/customer-auth')}
                  className="text-sm"
                >
                  Customer Login
                </Button>
                <Button
                  onClick={() => navigate('/vendor-auth')}
                  className="text-sm"
                >
                  Vendor Login
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActivePath(item.href)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {user && (
                <div className="pt-4 mt-4 border-t space-y-2">
                  <button
                    onClick={handleDashboardClick}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 w-full"
                  >
                    <User className="h-4 w-4" />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 w-full"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default EnhancedHeader;
