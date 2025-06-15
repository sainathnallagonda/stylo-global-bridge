
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Package, Truck, CheckCircle, Camera } from "lucide-react";

interface OrderTrackerProps {
  orders: Array<{
    id: string;
    title: string;
    status: string;
    progress: number;
    estimatedDelivery: string;
    photoConfirmation?: string;
  }>;
}

const OrderTracker = ({ orders }: OrderTrackerProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'shipped': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-blue-600" />
          Recent Orders
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{order.title}</h4>
              <Badge className={`${getStatusColor(order.status)} text-white`}>
                {getStatusIcon(order.status)}
                <span className="ml-1 capitalize">{order.status}</span>
              </Badge>
            </div>
            <Progress value={order.progress} className="mb-2" />
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Estimated delivery: {order.estimatedDelivery}
              </p>
              {order.status === 'delivered' && (
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <Camera className="h-3 w-3" />
                  Photo confirmed
                </div>
              )}
            </div>
            {order.photoConfirmation && (
              <div className="mt-2">
                <img 
                  src={order.photoConfirmation} 
                  alt="Delivery confirmation" 
                  className="w-16 h-16 object-cover rounded border"
                />
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default OrderTracker;
