
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Bell, Mail, MessageSquare, Phone } from "lucide-react";

interface NotificationPreferences {
  orderUpdates: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  promotions: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  security: {
    email: boolean;
    sms: boolean;
  };
}

const NotificationSettings = () => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    orderUpdates: { email: true, sms: true, push: true },
    promotions: { email: false, sms: false, push: false },
    security: { email: true, sms: true }
  });

  const updatePreference = (category: keyof NotificationPreferences, type: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: value
      }
    }));
  };

  const savePreferences = () => {
    // Here you would typically save to your backend
    toast({
      title: "Preferences Updated",
      description: "Your notification preferences have been saved successfully."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Order Updates */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Order Updates</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <Label htmlFor="order-email">Email notifications</Label>
              </div>
              <Switch
                id="order-email"
                checked={preferences.orderUpdates.email}
                onCheckedChange={(checked) => updatePreference('orderUpdates', 'email', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-gray-500" />
                <Label htmlFor="order-sms">SMS notifications</Label>
              </div>
              <Switch
                id="order-sms"
                checked={preferences.orderUpdates.sms}
                onCheckedChange={(checked) => updatePreference('orderUpdates', 'sms', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-gray-500" />
                <Label htmlFor="order-push">Push notifications</Label>
              </div>
              <Switch
                id="order-push"
                checked={preferences.orderUpdates.push}
                onCheckedChange={(checked) => updatePreference('orderUpdates', 'push', checked)}
              />
            </div>
          </div>
        </div>

        {/* Promotions */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Promotions & Marketing</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <Label htmlFor="promo-email">Email offers</Label>
              </div>
              <Switch
                id="promo-email"
                checked={preferences.promotions.email}
                onCheckedChange={(checked) => updatePreference('promotions', 'email', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-gray-500" />
                <Label htmlFor="promo-sms">SMS offers</Label>
              </div>
              <Switch
                id="promo-sms"
                checked={preferences.promotions.sms}
                onCheckedChange={(checked) => updatePreference('promotions', 'sms', checked)}
              />
            </div>
          </div>
        </div>

        {/* Security */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Security Alerts</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <Label htmlFor="security-email">Email alerts</Label>
              </div>
              <Switch
                id="security-email"
                checked={preferences.security.email}
                onCheckedChange={(checked) => updatePreference('security', 'email', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <Label htmlFor="security-sms">SMS alerts</Label>
              </div>
              <Switch
                id="security-sms"
                checked={preferences.security.sms}
                onCheckedChange={(checked) => updatePreference('security', 'sms', checked)}
              />
            </div>
          </div>
        </div>

        <Button onClick={savePreferences} className="w-full">
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
