
import { useState } from "react";
import { ArrowLeft, Package, Clock, CheckCircle, Truck, Star, Camera, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const Orders = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [feedbackDialog, setFeedbackDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const orders = [
    {
      id: "ORD-001",
      type: "Food Delivery",
      restaurant: "Punjabi Dhaba",
      status: "delivered",
      orderDate: "2024-06-14",
      deliveryTime: "35 min",
      amount: "₹299 ($3.59)",
      items: ["Butter Chicken", "Naan", "Rice"],
      progress: 100,
      tracking: [
        { status: "Order Placed", time: "2:00 PM", completed: true, description: "Your order has been received" },
        { status: "Restaurant Confirmed", time: "2:05 PM", completed: true, description: "Restaurant is preparing your order" },
        { status: "Food Prepared", time: "2:25 PM", completed: true, description: "Food is ready for pickup" },
        { status: "Out for Delivery", time: "2:30 PM", completed: true, description: "Delivery partner is on the way" },
        { status: "Delivered", time: "2:35 PM", completed: true, description: "Order delivered successfully" }
      ]
    },
    {
      id: "ORD-002",
      type: "Groceries",
      restaurant: "Zepto",
      status: "preparing",
      orderDate: "2024-06-15",
      deliveryTime: "10 min",
      amount: "₹450 ($5.41)",
      items: ["Milk", "Bread", "Bananas", "Eggs"],
      progress: 60,
      tracking: [
        { status: "Order Placed", time: "3:00 PM", completed: true, description: "Your grocery order is confirmed" },
        { status: "Items Being Picked", time: "3:02 PM", completed: true, description: "Store staff is collecting items" },
        { status: "Packed", time: "3:05 PM", completed: true, description: "Items packed and ready" },
        { status: "Out for Delivery", time: "", completed: false, description: "Delivery partner will pick up soon" },
        { status: "Delivered", time: "", completed: false, description: "Estimated delivery in 5 minutes" }
      ]
    },
    {
      id: "ORD-003",
      type: "Gift",
      restaurant: "Flower Boutique",
      status: "confirmed",
      orderDate: "2024-06-15",
      deliveryTime: "2 hours",
      amount: "₹1,200 ($14.41)",
      items: ["Rose Bouquet", "Greeting Card"],
      progress: 25,
      tracking: [
        { status: "Order Placed", time: "1:00 PM", completed: true, description: "Gift order received" },
        { status: "Confirmed", time: "1:10 PM", completed: true, description: "Florist confirmed availability" },
        { status: "Preparing", time: "", completed: false, description: "Creating your beautiful bouquet" },
        { status: "Out for Delivery", time: "", completed: false, description: "Will be dispatched soon" },
        { status: "Delivered", time: "", completed: false, description: "Expected by 3:00 PM" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'preparing': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'preparing': return <Clock className="h-4 w-4" />;
      case 'confirmed': return <Package className="h-4 w-4" />;
      default: return <Truck className="h-4 w-4" />;
    }
  };

  const handleFeedback = (orderId: string) => {
    setSelectedOrder(orderId);
    setFeedbackDialog(true);
  };

  const submitFeedback = () => {
    console.log(`Feedback for ${selectedOrder}: ${rating} stars, "${comment}"`);
    setFeedbackDialog(false);
    setRating(0);
    setComment("");
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{order.type}</h3>
                    <p className="text-gray-600">{order.restaurant}</p>
                    <p className="text-sm text-gray-500">Order #{order.id}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={`${getStatusColor(order.status)} mb-2`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </Badge>
                    <p className="text-lg font-bold">{order.amount}</p>
                  </div>
                </div>

                {/* Real-time Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Order Progress</span>
                    <span>{order.progress}%</span>
                  </div>
                  <Progress value={order.progress} className="h-2" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Order Items</h4>
                    <ul className="text-gray-600 space-y-1">
                      {order.items.map((item, index) => (
                        <li key={index} className="text-sm">• {item}</li>
                      ))}
                    </ul>
                    <div className="mt-4 text-sm text-gray-500">
                      <p>Ordered on {order.orderDate}</p>
                      <p>Expected delivery: {order.deliveryTime}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Real-time Tracking</h4>
                    <div className="space-y-3">
                      {order.tracking.map((step, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className={`w-3 h-3 rounded-full mt-1 ${
                            step.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`} />
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${
                              step.completed ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {step.status}
                            </p>
                            <p className="text-xs text-gray-500">{step.description}</p>
                            {step.time && (
                              <p className="text-xs text-gray-400">{step.time}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    Track Live
                  </Button>
                  <Button variant="outline" size="sm">
                    Reorder
                  </Button>
                  {order.status === 'delivered' && (
                    <Dialog open={feedbackDialog} onOpenChange={setFeedbackDialog}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleFeedback(order.id)}
                        >
                          <Star className="h-4 w-4 mr-1" />
                          Rate Order
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Rate Your Order</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-3">How was your experience?</p>
                            <div className="flex justify-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  onClick={() => setRating(star)}
                                  className="p-1"
                                >
                                  <Star 
                                    className={`h-8 w-8 ${
                                      star <= rating 
                                        ? 'fill-yellow-400 text-yellow-400' 
                                        : 'text-gray-300'
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium">Comments (optional)</label>
                            <Textarea
                              placeholder="Share your feedback..."
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              className="mt-1"
                            />
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" className="flex-1">
                              <Camera className="h-4 w-4 mr-2" />
                              Add Photo
                            </Button>
                            <Button 
                              onClick={submitFeedback}
                              className="flex-1"
                              disabled={rating === 0}
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
