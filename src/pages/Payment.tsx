
import { useState } from "react";
import { ArrowLeft, CreditCard, Wallet, Building2, Smartphone, Shield, CheckCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useLocation as useLocationContext } from "@/contexts/LocationContext";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toCountry, getCurrencyDisplay } = useLocationContext();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });

  // Get order details from navigation state
  const orderDetails = location.state || {
    itemName: "Selected Item",
    price: toCountry === 'USA' ? 25 : 899,
    currency: toCountry === 'USA' ? 'USD' : 'INR'
  };

  const usaPaymentMethods = [
    {
      id: "visa",
      name: "Visa",
      icon: CreditCard,
      description: "Pay with Visa credit/debit card",
      popular: true
    },
    {
      id: "mastercard", 
      name: "Mastercard",
      icon: CreditCard,
      description: "Pay with Mastercard credit/debit card",
      popular: true
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: Wallet,
      description: "Pay securely with PayPal",
      popular: false
    },
    {
      id: "apple_pay",
      name: "Apple Pay",
      icon: Smartphone,
      description: "Pay with Touch ID or Face ID",
      popular: false
    },
    {
      id: "bank_transfer",
      name: "Bank Transfer",
      icon: Building2,
      description: "Direct bank transfer (ACH)",
      popular: false
    }
  ];

  const indiaPaymentMethods = [
    {
      id: "razorpay",
      name: "Razorpay",
      icon: CreditCard,
      description: "Pay with cards, UPI, netbanking",
      popular: true
    },
    {
      id: "paytm",
      name: "Paytm",
      icon: Wallet,
      description: "Pay with Paytm wallet",
      popular: true
    },
    {
      id: "phonepe",
      name: "PhonePe",
      icon: Smartphone,
      description: "Pay with PhonePe UPI",
      popular: true
    },
    {
      id: "gpay",
      name: "Google Pay",
      icon: Smartphone,
      description: "Pay with Google Pay UPI",
      popular: true
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: Building2,
      description: "Pay with your bank account",
      popular: false
    }
  ];

  const paymentMethods = toCountry === 'USA' ? usaPaymentMethods : indiaPaymentMethods;

  const handlePayment = () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method");
      return;
    }
    
    // Simulate payment processing
    alert(`Payment of ${getCurrencyDisplay(orderDetails.price, orderDetails.currency)} processed successfully via ${selectedPaymentMethod}!`);
    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-blue-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="hover:bg-blue-100 rounded-full"
            >
              <ArrowLeft className="h-5 w-5 text-blue-600" />
            </Button>
            <div className="flex items-center gap-3">
              <Shield className="h-7 w-7 text-blue-600" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Secure Payment
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                  Payment Methods
                  <span className="ml-auto text-sm font-normal bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {toCountry}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="relative">
                        <Label
                          htmlFor={method.id}
                          className="flex items-center space-x-4 p-4 border-2 rounded-xl cursor-pointer hover:bg-blue-50 transition-all duration-200"
                          style={{
                            borderColor: selectedPaymentMethod === method.id ? '#3b82f6' : '#e5e7eb'
                          }}
                        >
                          <RadioGroupItem value={method.id} id={method.id} />
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <method.icon className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-800">{method.name}</span>
                                {method.popular && (
                                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                                    Popular
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{method.description}</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                {/* Card Details Form (shown when card payment is selected) */}
                {(selectedPaymentMethod === "visa" || selectedPaymentMethod === "mastercard" || selectedPaymentMethod === "razorpay") && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-semibold text-gray-800 mb-4">Card Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-800">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Item</span>
                    <span className="font-semibold text-gray-800">{orderDetails.itemName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price</span>
                    <span className="font-semibold text-gray-800">
                      {getCurrencyDisplay(orderDetails.price, orderDetails.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">
                        {getCurrencyDisplay(orderDetails.price, orderDetails.currency)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={!selectedPaymentMethod}
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Pay {getCurrencyDisplay(orderDetails.price, orderDetails.currency)}
                </Button>

                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Shield className="h-4 w-4" />
                  Your payment is secured with 256-bit SSL encryption
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
