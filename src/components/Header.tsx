
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useAppState } from "@/contexts/AppStateContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, ShoppingCart, LayoutDashboard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import EnhancedNotificationSystem from "./EnhancedNotificationSystem";
import LanguageSelector from "./MultiLanguageSupport";

const Header = () => {
  const { user, profile, signOut } = useAuth();
  const { cartCount, openCart } = useAppState();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleDashboardClick = () => {
    if (profile?.role === 'vendor') {
      navigate('/vendor-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  const navItems = [
    { name: "Food", path: "/food-delivery" },
    { name: "Groceries", path: "/groceries" },
    { name: "Gifts", path: "/gifts" },
    { name: "Rides", path: "/rides" },
    { name: "Travel Companion", path: "/travel" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <h1 
                onClick={() => navigate("/")}
                className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-700 transition-colors"
              >
                Stylo
              </h1>
              <span className="text-sm text-gray-500 hidden sm:block">Send to Your Loved Ones</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium px-3 py-2 rounded-lg hover:bg-blue-50"
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {/* Language Selector */}
              <LanguageSelector compact showFlags />
              
              {/* Notifications */}
              {user && <EnhancedNotificationSystem />}
              
              {/* Cart */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-gray-100"
                onClick={openCart}
              >
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                {cartCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {cartCount > 9 ? '9+' : cartCount}
                  </Badge>
                )}
              </Button>
              
              {user ? (
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={handleDashboardClick}
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    {profile?.role === 'vendor' ? 'Vendor Dashboard' : 'Dashboard'}
                  </Button>
                  <Button
                    onClick={() => navigate("/profile")}
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button 
                    onClick={() => navigate("/customer-auth")}
                    variant="outline"
                    size="sm"
                  >
                    Customer Login
                  </Button>
                  <Button 
                    onClick={() => navigate("/vendor-auth")}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                  >
                    Vendor Login
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col space-y-4">
              {/* Cart for mobile */}
              <Button
                onClick={() => {
                  openCart();
                  setIsMenuOpen(false);
                }}
                variant="ghost"
                className="justify-start hover:bg-blue-50"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart ({cartCount})
              </Button>
              
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-gray-600 hover:text-blue-600 transition-colors py-2 px-3 rounded-lg hover:bg-blue-50"
                >
                  {item.name}
                </button>
              ))}
              
              {user ? (
                <div className="flex flex-col space-y-2">
                  <Button
                    onClick={() => {
                      handleDashboardClick();
                      setIsMenuOpen(false);
                    }}
                    variant="ghost"
                    className="justify-start hover:bg-blue-50"
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    {profile?.role === 'vendor' ? 'Vendor Dashboard' : 'Dashboard'}
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/profile");
                      setIsMenuOpen(false);
                    }}
                    variant="ghost"
                    className="justify-start hover:bg-blue-50"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                  <Button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    variant="ghost"
                    className="justify-start text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button 
                    onClick={() => {
                      navigate("/customer-auth");
                      setIsMenuOpen(false);
                    }}
                    variant="outline"
                  >
                    Customer Login
                  </Button>
                  <Button 
                    onClick={() => {
                      navigate("/vendor-auth");
                      setIsMenuOpen(false);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Vendor Login
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
