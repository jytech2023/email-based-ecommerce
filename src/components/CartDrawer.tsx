import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { CheckoutForm } from './checkout/CheckoutForm';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeItem, updateQuantity } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleCheckout = () => {
    setIsCheckingOut(true);
  };

  const handleOrderSuccess = () => {
    setOrderStatus('success');
    setIsCheckingOut(false);
    setTimeout(() => {
      onClose();
      setOrderStatus('idle');
    }, 2000);
  };

  const handleOrderError = (error: string) => {
    setOrderStatus('error');
    setErrorMessage(error);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">
            {isCheckingOut ? 'Checkout' : 'Shopping Cart'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-5rem)]">
          {orderStatus === 'success' && (
            <div className="bg-green-50 p-4 rounded-md">
              <p className="text-green-800">Order submitted successfully!</p>
            </div>
          )}

          {orderStatus === 'error' && (
            <div className="bg-red-50 p-4 rounded-md">
              <p className="text-red-800">{errorMessage}</p>
            </div>
          )}

          {isCheckingOut ? (
            <CheckoutForm />
          ) : (
            <>
              {cart.items.map((item) => {
                const product = products.find(p => p.id === item.productId);
                if (!product) return null;

                return (
                  <div key={`${item.productId}-${item.size}`} className="flex gap-3 py-4 border-b">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm sm:text-base truncate">{product.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">Size: {item.size}</p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {item.deliveryMethod === 'delivery' ? 'Delivery' : 'Pickup'}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.productId, item.size, parseInt(e.target.value))}
                          className="w-16 h-8 rounded-md border-gray-300 shadow-sm text-sm"
                        />
                        <button
                          onClick={() => removeItem(item.productId, item.size)}
                          className="text-red-600 text-xs sm:text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm sm:text-base">
                        ${(item.deliveryMethod === 'delivery' ? product.deliveredPrice : product.pickupPrice).toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}

              {cart.items.length === 0 && (
                <p className="text-center text-gray-500">Your cart is empty</p>
              )}

              {cart.items.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full mt-4 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}