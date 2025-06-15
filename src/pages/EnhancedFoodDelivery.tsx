
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEnhancedAuth } from '@/contexts/EnhancedAuthContext';
import CustomerFoodDisplay from '@/components/CustomerFoodDisplay';
import EnhancedHeader from '@/components/navigation/EnhancedHeader';

const EnhancedFoodDelivery = () => {
  const navigate = useNavigate();
  const { isCustomer, profile } = useEnhancedAuth();
  const [currentLocation, setCurrentLocation] = useState<string>('Select Location');

  useEffect(() => {
    if (profile?.current_location) {
      setCurrentLocation(profile.current_location.address || 'Current Location');
    }
  }, [profile]);

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Food Delivery</h1>
              <div className="flex items-center gap-2 text-gray-600 mt-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{currentLocation}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Food Display */}
        {isCustomer ? (
          <CustomerFoodDisplay />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Please log in as a customer to browse food options
            </h2>
            <Button onClick={() => navigate('/customer-auth')}>
              Customer Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedFoodDelivery;
