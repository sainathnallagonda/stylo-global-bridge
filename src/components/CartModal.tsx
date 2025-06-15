
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '@/contexts/AppStateContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Minus, ShoppingCart, CreditCard } from 'lucide-react';

const CartModal = () => {
  const { 
    isCartOpen, 
    closeCart, 
    cartItems, 
    cartCount, 
    cartTotal, 
    updateQuantity, 
    removeFromCart,
    clearCart 
  } = useAppState();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    closeCart();
    navigate('/payment', { 
      state: { 
        cartItems, 
        total: cartTotal,
        itemCount: cartCount 
      } 
    });
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50" 
        onClick={closeCart}
      />
      
      {/* Modal */}
      <Card className="relative w-full max-w-md max-h-[80vh] mx-4 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart
            {cartCount > 0 && (
              <Badge variant="secondary">{cartCount} items</Badge>
            )}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeCart}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-hidden flex flex-col">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
              <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">Your cart is empty</h3>
              <p className="text-sm text-gray-500 mb-4">Add some delicious items to get started!</p>
              <Button onClick={closeCart} variant="outline">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    {item.image_url && (
                      <img 
                        src={item.image_url} 
                        alt={item.name} 
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-gray-600">
                        {item.currency} {item.price} each
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 text-red-500 hover:text-red-700"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold text-lg">
                    {cartItems[0]?.currency || 'USD'} {cartTotal.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={clearCart}
                    className="flex-1"
                  >
                    Clear Cart
                  </Button>
                  <Button 
                    onClick={handleCheckout}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Checkout
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CartModal;
