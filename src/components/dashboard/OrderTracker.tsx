
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Package, Truck, CheckCircle, Eye } from 'lucide-react';
import RealTimeOrderTracking from '../RealTimeOrderTracking';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Order {
  id: string;
  title: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  progress: number;
  estimatedDelivery: string;
}

interface OrderTrackerProps {
  orders: Order[];
}

const OrderTracker = ({ orders }: OrderTrackerProps) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [showRealTimeTracking, setShowRealTimeTracking] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-4 w-4 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Package className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
    setShowRealTimeTracking(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-600" />
            Active Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{order.title}</h4>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${order.progress}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    {getStatusIcon(order.status)}
                    <span>{order.estimatedDelivery}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(order.id)}
                    className="text-xs"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Track Live
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showRealTimeTracking} onOpenChange={setShowRealTimeTracking}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Real-Time Order Tracking</DialogTitle>
          </DialogHeader>
          {selectedOrderId && (
            <RealTimeOrderTracking
              orderId={selectedOrderId}
              onStatusChange={(status) => {
                console.log('Order status changed:', status);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderTracker;
