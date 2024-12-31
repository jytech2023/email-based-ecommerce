import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function CartButton() {
  const { cart } = useCart();
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button className="relative p-2">
      <ShoppingBag className="w-6 h-6 text-gray-600" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
}