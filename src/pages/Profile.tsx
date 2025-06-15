
import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Edit, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEnhancedAuth } from "@/contexts/EnhancedAuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import CleanHeader from "@/components/navigation/CleanHeader";
import BackButton from "@/components/BackButton";

const Profile = () => {
  const { user, profile, refreshProfile } = useEnhancedAuth();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    country: '',
    preferred_currency: 'USD'
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        country: profile.country || '',
        preferred_currency: profile.preferred_currency || 'USD'
      });
    }
  }, [profile]);

  const handleSave = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update(formData)
        .eq('id', user.id);

      if (error) throw error;
      
      await refreshProfile();
      setEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated."
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        country: profile.country || '',
        preferred_currency: profile.preferred_currency || 'USD'
      });
    }
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <CleanHeader />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <BackButton fallbackPath="/" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">Manage your account information</p>
          </div>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <User className="h-6 w-6 text-blue-600" />
                Profile Information
              </CardTitle>
              {!editing ? (
                <Button 
                  variant="outline" 
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={handleCancel}
                    className="flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="h-4 w-4" />
                    {loading ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Email (Read-only) */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-700">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input 
                value={user?.email || ''} 
                disabled 
                className="bg-gray-50"
              />
              <p className="text-xs text-gray-500">Email cannot be changed</p>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-700">
                <User className="h-4 w-4" />
                Full Name
              </Label>
              <Input 
                value={formData.full_name}
                onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                disabled={!editing}
                placeholder="Enter your full name"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-700">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              <Input 
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                disabled={!editing}
                placeholder="Enter your phone number"
              />
            </div>

            {/* Country */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-700">
                <MapPin className="h-4 w-4" />
                Country
              </Label>
              <Input 
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                disabled={!editing}
                placeholder="Enter your country"
              />
            </div>

            {/* Preferred Currency */}
            <div className="space-y-2">
              <Label className="text-gray-700">Preferred Currency</Label>
              <select
                value={formData.preferred_currency}
                onChange={(e) => setFormData(prev => ({ ...prev, preferred_currency: e.target.value }))}
                disabled={!editing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
              </select>
            </div>

            {/* Account Type */}
            <div className="space-y-2">
              <Label className="text-gray-700">Account Type</Label>
              <Input 
                value={profile?.role?.charAt(0).toUpperCase() + profile?.role?.slice(1) || 'Customer'} 
                disabled 
                className="bg-gray-50"
              />
              <p className="text-xs text-gray-500">Account type cannot be changed</p>
            </div>
          </CardContent>
        </Card>

        {/* Account Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-900">0</h3>
              <p className="text-sm text-gray-600">Total Orders</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-900">0</h3>
              <p className="text-sm text-gray-600">Favorites</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-900">Member</h3>
              <p className="text-sm text-gray-600">Status</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
