
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, ShoppingBag, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEnhancedAuth } from "@/contexts/EnhancedAuthContext";
import { supabase } from "@/integrations/supabase/client";
import CleanHeader from "@/components/navigation/CleanHeader";

interface PaymentItem {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity?: number;
  image_url?: string;
}

interface PaymentData {
  itemName?: string;
  price?: number;
  currency?: string;
  serviceType?: string;
  cartItems?: PaymentItem[];
  total?: number;
  itemCount?: number;
}

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useEnhancedAuth();
  
  const [loading, setLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [loadingRate, setLoadingRate] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet'>('card');
  
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const paymentData = location.state as PaymentData;

  useEffect(() => {
    if (!paymentData || (!paymentData.itemName && !paymentData.cartItems)) {
      toast({
        title: "Error",
        description: "No payment information found",
        variant: "destructive"
      });
      navigate('/dashboard');
      return;
    }

    // Simulate getting exchange rate (in real app, you'd call an API)
    fetchExchangeRate();
  }, [paymentData, navigate, toast]);

  const fetchExchangeRate = async () => {
    setLoadingRate(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock exchange rate (USD to INR)
      if (paymentData?.currency === 'USD') {
        setExchangeRate(83.12); // 1 USD = 83.12 INR (mock rate)
      } else {
        setExchangeRate(1);
      }
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      setExchangeRate(1);
    } finally {
      setLoadingRate(false);
    }
  };

  const validateCardDetails = () => {
    if (!cardDetails.number || cardDetails.number.length < 16) {
      toast({
        title: "Invalid Card",
        description: "Please enter a valid card number",
        variant: "destructive"
      });
      return false;
    }
    if (!cardDetails.expiry || !/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
      toast({
        title: "Invalid Expiry",
        description: "Please enter expiry in MM/YY format",
        variant: "destructive"
      });
      return false;
    }
    if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
      toast({
        title: "Invalid CVV",
        description: "Please enter a valid CVV",
        variant: "destructive"
      });
      return false;
    }
    if (!cardDetails.name.trim()) {
      toast({
        title: "Missing Name",
        description: "Please enter cardholder name",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const validateDeliveryInfo = () => {
    if (!deliveryInfo.fullName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your full name",
        variant: "destructive"
      });
      return false;
    }
    if (!deliveryInfo.phone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your phone number",
        variant: "destructive"
      });
      return false;
    }
    if (!deliveryInfo.address.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your address",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to complete payment",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    if (!validateDeliveryInfo()) return;
    
    if (paymentMethod === 'card' && !validateCardDetails()) return;

    setLoading(true);
    try {
      // Calculate totals
      const baseAmount = paymentData.cartItems 
        ? paymentData.total || 0
        : paymentData.price || 0;
      
      const convertedAmount = paymentData.currency === 'USD' 
        ? baseAmount * exchangeRate 
        : baseAmount;

      // Prepare order items
      const orderItems = paymentData.cartItems || [{
        id: '1',
        name: paymentData.itemName || 'Unknown Item',
        price: paymentData.price || 0,
        currency: paymentData.currency || 'USD',
        quantity: 1
      }];

      // Create order in database
      const { data: order, error } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          service_type: paymentData.serviceType || 'general',
          items: orderItems,
          total_amount: baseAmount,
          currency: paymentData.currency || 'USD',
          converted_amount: convertedAmount,
          converted_currency: paymentData.currency === 'USD' ? 'INR' : paymentData.currency,
          delivery_address: {
            fullName: deliveryInfo.fullName,
            phone: deliveryInfo.phone,
            address: deliveryInfo.address,
            city: deliveryInfo.city,
            zipCode: deliveryInfo.zipCode
          },
          recipient_info: {
            name: deliveryInfo.fullName,
            phone: deliveryInfo.phone
          },
          recipient_country: paymentData.currency === 'USD' ? 'USA' : 'India',
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Payment Successful!",
        description: `Order #${order.id.slice(0, 8)} has been placed successfully`,
      });

      // Navigate to orders page or success page
      navigate('/orders', { 
        state: { 
          newOrderId: order.id,
          successMessage: "Your order has been placed successfully!" 
        } 
      });

    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: error.message || "There was an error processing your payment",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Payment Error</h3>
            <p className="text-gray-600 mb-4">No payment information found</p>
            <Button onClick={() => navigate('/dashboard')}>
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const baseAmount = paymentData.cartItems ? paymentData.total || 0 : paymentData.price || 0;
  const convertedAmount = paymentData.currency === 'USD' ? baseAmount * exchangeRate : baseAmount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <CleanHeader />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
            <p className="text-gray-600">Complete your payment securely</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentData.cartItems ? (
                  // Multiple items from cart
                  paymentData.cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-600">Qty: {item.quantity || 1}</p>
                      </div>
                      <span className="font-medium">
                        {item.currency} {(item.price * (item.quantity || 1)).toFixed(2)}
                      </span>
                    </div>
                  ))
                ) : (
                  // Single item
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <h4 className="font-medium">{paymentData.itemName}</h4>
                      <Badge variant="secondary">{paymentData.serviceType}</Badge>
                    </div>
                    <span className="font-bold text-lg">
                      {paymentData.currency} {paymentData.price?.toFixed(2)}
                    </span>
                  </div>
                )}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>{paymentData.currency} {baseAmount.toFixed(2)}</span>
                  </div>
                  
                  {paymentData.currency === 'USD' && (
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Converted to INR:</span>
                      {loadingRate ? (
                        <span className="animate-pulse">Loading...</span>
                      ) : (
                        <span>₹ {convertedAmount.toFixed(2)}</span>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee:</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-blue-600">
                      {paymentData.currency} {baseAmount.toFixed(2)}
                      {paymentData.currency === 'USD' && !loadingRate && (
                        <span className="text-sm text-gray-600 block">
                          (₹ {convertedAmount.toFixed(2)})
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={deliveryInfo.fullName}
                      onChange={(e) => setDeliveryInfo(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="Enter recipient's full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={deliveryInfo.phone}
                      onChange={(e) => setDeliveryInfo(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={deliveryInfo.address}
                    onChange={(e) => setDeliveryInfo(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter full address"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={deliveryInfo.city}
                      onChange={(e) => setDeliveryInfo(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="Enter city"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                    <Input
                      id="zipCode"
                      value={deliveryInfo.zipCode}
                      onChange={(e) => setDeliveryInfo(prev => ({ ...prev, zipCode: e.target.value }))}
                      placeholder="Enter ZIP code"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Button
                    variant={paymentMethod === 'card' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('card')}
                    className="flex-1"
                  >
                    Credit/Debit Card
                  </Button>
                  <Button
                    variant={paymentMethod === 'wallet' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('wallet')}
                    className="flex-1"
                  >
                    Wallet (Demo)
                  </Button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardName">Cardholder Name *</Label>
                      <Input
                        id="cardName"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value.replace(/\D/g, '').slice(0, 16) }))}
                        placeholder="1234 5678 9012 3456"
                        maxLength={16}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cardExpiry">Expiry Date *</Label>
                        <Input
                          id="cardExpiry"
                          value={cardDetails.expiry}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length >= 2) {
                              value = value.slice(0, 2) + '/' + value.slice(2, 4);
                            }
                            setCardDetails(prev => ({ ...prev, expiry: value }));
                          }}
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardCvv">CVV *</Label>
                        <Input
                          id="cardCvv"
                          type="password"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                          placeholder="123"
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'wallet' && (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <p className="text-gray-600">Demo wallet payment selected</p>
                    <p className="text-sm text-gray-500">This is a demo - no actual payment will be processed</p>
                  </div>
                )}

                <Button 
                  onClick={handlePayment} 
                  className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
                  disabled={loading || loadingRate}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    <>
                      Complete Payment • {paymentData.currency} {baseAmount.toFixed(2)}
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  This is a demo payment system. No actual charges will be made.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
