import React from 'react';
import { Cart } from '../../types/cart';
import { products } from '../../data/products';

interface OrderSummaryProps {
  cart: Cart;
}

export function OrderSummary({ cart }: OrderSummaryProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Order Summary</h3>
      
      <div className="space-y-2">
        {cart.items.map((item) => {
          const product = products.find(p => p.id === item.productId);
          if (!product) return null;

          const price = item.deliveryMethod === 'delivery' 
            ? product.deliveredPrice 
            : product.pickupPrice;

          return (
            <div key={`${item.productId}-${item.size}`} className="flex justify-between text-sm">
              <span>
                {product.name} ({item.size}) x {item.quantity}
              </span>
              <span>${(price * item.quantity).toFixed(2)}</span>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t">
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>${cart.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}