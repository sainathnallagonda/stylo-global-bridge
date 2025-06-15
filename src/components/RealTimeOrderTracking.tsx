
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Truck, CheckCircle, AlertCircle } from 'lucide-react';

interface TrackingUpdate {
  id: string;
  order_id: string;
  status: string;
  message?: string;
  location?: string;
  timestamp: string;
}

interface OrderTrackingProps {
  orderId: string;
  onStatusChange?: (status: string) => void;
}

const RealTimeOrderTracking = ({ orderId, onStatusChange }: OrderTrackingProps) => {
  const [trackingUpdates, setTrackingUpdates] = useState<TrackingUpdate[]>([]);
  const [currentStatus, setCurrentStatus] = useState<string>('pending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate mock tracking data for demo
    const mockUpdates = generateMockTrackingData();
    setTrackingUpdates(mockUpdates);
    setCurrentStatus(mockUpdates[mockUpdates.length - 1].status);
    setLoading(false);
    onStatusChange?.(mockUpdates[mockUpdates.length - 1].status);
  }, [orderId, onStatusChange]);

  const generateMockTrackingData = (): TrackingUpdate[] => [
    {
      id: '1',
      order_id: orderId,
      status: 'confirmed',
      message: 'Order confirmed and being prepared',
      location: 'Restaurant Kitchen',
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: '2',
      order_id: orderId,
      status: 'preparing',
      message: 'Your order is being prepared with care',
      location: 'Restaurant Kitchen',
      timestamp: new Date(Date.now() - 2400000).toISOString()
    },
    {
      id: '3',
      order_id: orderId,
      status: 'ready',
      message: 'Order ready for pickup',
      location: 'Restaurant Counter',
      timestamp: new Date(Date.now() - 1200000).toISOString()
    },
    {
      id: '4',
      order_id: orderId,
      status: 'out_for_delivery',
      message: 'Driver has picked up your order',
      location: 'En route to delivery address',
      timestamp: new Date(Date.now() - 600000).toISOString()
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'preparing':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'ready':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'out_for_delivery':
        return <Truck className="h-4 w-4 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'ready':
        return 'bg-orange-100 text-orange-800';
      case 'out_for_delivery':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          Real-Time Tracking
          <Badge className={getStatusColor(currentStatus)}>
            {currentStatus.replace('_', ' ').toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trackingUpdates.map((update) => (
            <div key={update.id} className="flex items-start gap-4 p-3 rounded-lg bg-gray-50">
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(update.status)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-sm">
                    {update.status.replace('_', ' ').toUpperCase()}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {new Date(update.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                {update.message && (
                  <p className="text-sm text-gray-700 mb-1">{update.message}</p>
                )}
                {update.location && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="h-3 w-3" />
                    {update.location}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {currentStatus !== 'delivered' && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              🚚 Your order is being processed. You'll receive real-time updates as it progresses.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RealTimeOrderTracking;
