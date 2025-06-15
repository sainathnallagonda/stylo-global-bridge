
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, ShoppingCart } from "lucide-react";
import CurrencyToggle from "./CurrencyToggle";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleAuthClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
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
            <CurrencyToggle />
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Button>
              
              {user ? (
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => navigate("/dashboard")}
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
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
                <Button 
                  onClick={handleAuthClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Get Started
                </Button>
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
              
              <div className="pt-4 border-t border-gray-100">
                <CurrencyToggle />
              </div>
              
              {user ? (
                <div className="flex flex-col space-y-2">
                  <Button
                    onClick={() => {
                      navigate("/dashboard");
                      setIsMenuOpen(false);
                    }}
                    variant="ghost"
                    className="justify-start hover:bg-blue-50"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
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
                <Button 
                  onClick={() => {
                    handleAuthClick();
                    setIsMenuOpen(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Get Started
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
