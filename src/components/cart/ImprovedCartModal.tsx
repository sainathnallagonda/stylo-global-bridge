
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '@/contexts/AppStateContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Minus, ShoppingCart, CreditCard, Trash2 } from 'lucide-react';

const ImprovedCartModal = () => {
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
    
    console.log('Proceeding to checkout with items:', cartItems);
    console.log('Total amount:', cartTotal);
    
    closeCart();
    navigate('/payment', { 
      state: { 
        cartItems, 
        total: cartTotal,
        itemCount: cartCount 
      } 
    });
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeCart();
    }
  };

  if (!isCartOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={handleOverlayClick}
    >
      {/* Modal */}
      <Card className="relative w-full max-w-md max-h-[85vh] mx-auto flex flex-col animate-scale-in shadow-2xl bg-white border border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b bg-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShoppingCart className="h-5 w-5 text-blue-600" />
            Your Cart
            {cartCount > 0 && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </Badge>
            )}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeCart}
            className="h-8 w-8 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-hidden flex flex-col p-4 bg-white">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8 space-y-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-10 w-10 text-gray-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
                <p className="text-sm text-gray-500">Add some delicious items to get started!</p>
              </div>
              <Button onClick={closeCart} variant="outline" className="mt-4">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    {item.image_url && (
                      <img 
                        src={item.image_url} 
                        alt={item.name} 
                        className="w-12 h-12 object-cover rounded-lg shadow-sm"
                      />
                    )}
                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-600">
                          {item.currency} {item.price} each
                        </p>
                        <p className="text-sm font-semibold text-blue-600">
                          {item.currency} {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-white rounded-lg border">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="border-t pt-4 space-y-4 bg-white">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold text-blue-600">
                    {cartItems[0]?.currency || 'USD'} {cartTotal.toFixed(2)}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    onClick={clearCart}
                    className="flex items-center gap-2 hover:bg-red-50 hover:border-red-200"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear
                  </Button>
                  <Button 
                    onClick={handleCheckout}
                    className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                    disabled={cartItems.length === 0}
                  >
                    <CreditCard className="h-4 w-4" />
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

export default ImprovedCartModal;
