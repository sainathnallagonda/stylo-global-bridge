
import { useState } from "react";
import { ArrowLeft, Package, Clock, CheckCircle, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Orders = () => {
  const navigate = useNavigate();

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
      tracking: [
        { status: "Order Placed", time: "2:00 PM", completed: true },
        { status: "Restaurant Confirmed", time: "2:05 PM", completed: true },
        { status: "Food Prepared", time: "2:25 PM", completed: true },
        { status: "Out for Delivery", time: "2:30 PM", completed: true },
        { status: "Delivered", time: "2:35 PM", completed: true }
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
      tracking: [
        { status: "Order Placed", time: "3:00 PM", completed: true },
        { status: "Items Being Picked", time: "3:02 PM", completed: true },
        { status: "Packed", time: "", completed: false },
        { status: "Out for Delivery", time: "", completed: false },
        { status: "Delivered", time: "", completed: false }
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
      tracking: [
        { status: "Order Placed", time: "1:00 PM", completed: true },
        { status: "Confirmed", time: "1:10 PM", completed: true },
        { status: "Preparing", time: "", completed: false },
        { status: "Out for Delivery", time: "", completed: false },
        { status: "Delivered", time: "", completed: false }
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
            <Card key={order.id} className="overflow-hidden">
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
                    <h4 className="font-medium mb-3">Order Tracking</h4>
                    <div className="space-y-3">
                      {order.tracking.map((step, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            step.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`} />
                          <div className="flex-1">
                            <p className={`text-sm ${
                              step.completed ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {step.status}
                            </p>
                            {step.time && (
                              <p className="text-xs text-gray-500">{step.time}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    Track Order
                  </Button>
                  <Button variant="outline" size="sm">
                    Reorder
                  </Button>
                  {order.status === 'delivered' && (
                    <Button variant="outline" size="sm">
                      Rate Order
                    </Button>
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
