
import { useState } from "react";
import { Plus, MessageCircle, Phone, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionItem {
  icon: React.ElementType;
  label: string;
  action: () => void;
  color: string;
}

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions: ActionItem[] = [
    {
      icon: MessageCircle,
      label: "Live Chat",
      action: () => console.log("Open chat"),
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: Phone,
      label: "Call Support",
      action: () => window.open("tel:+1234567890"),
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      icon: Mail,
      label: "Email Us",
      action: () => window.open("mailto:support@stylo.com"),
      color: "bg-purple-500 hover:bg-purple-600"
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action items */}
      <div className={cn(
        "flex flex-col items-end gap-3 mb-3 transition-all duration-300",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}>
        {actions.map((action, index) => (
          <div
            key={index}
            className="flex items-center gap-3 animate-slide-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="bg-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium text-gray-700 whitespace-nowrap">
              {action.label}
            </div>
            <Button
              size="sm"
              onClick={action.action}
              className={cn(
                "w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
                action.color
              )}
            >
              <action.icon className="h-5 w-5" />
            </Button>
          </div>
        ))}
      </div>

      {/* Main FAB */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-110",
          isOpen && "rotate-45"
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Plus className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default FloatingActionButton;
