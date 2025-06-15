
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Home, 
  Package, 
  MessageSquare, 
  Users, 
  Wallet, 
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DashboardSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Order Services", path: "/dashboard/services", color: "text-blue-600" },
    { icon: Package, label: "Track Orders", path: "/dashboard/orders", color: "text-green-600" },
    { icon: MessageSquare, label: "Feedback", path: "/dashboard/feedback", color: "text-purple-600" },
    { icon: Users, label: "Travel Buddy", path: "/travel", color: "text-orange-600" },
    { icon: Wallet, label: "My Wallet", path: "/dashboard/wallet", color: "text-emerald-600" },
    { icon: Settings, label: "Settings", path: "/profile", color: "text-gray-600" }
  ];

  return (
    <div className={cn(
      "h-full bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hover:bg-gray-100"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.path}
              variant="ghost"
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full justify-start transition-all duration-200 hover:bg-gray-50 hover:scale-105",
                isActive && "bg-blue-50 border-l-4 border-blue-500",
                isCollapsed ? "px-2" : "px-4"
              )}
            >
              <item.icon className={cn("h-5 w-5", item.color)} />
              {!isCollapsed && (
                <span className="ml-3 text-gray-700">{item.label}</span>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardSidebar;
