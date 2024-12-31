import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '../types/product';

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [size, setSize] = useState<string>(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      quantity,
      size,
      deliveryMethod,
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="block w-full sm:w-24 h-9 text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {product.sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
          className="block w-full sm:w-20 h-9 text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 text-sm">
        <label className="flex items-center flex-1">
          <input
            type="radio"
            value="delivery"
            checked={deliveryMethod === 'delivery'}
            onChange={(e) => setDeliveryMethod(e.target.value as 'delivery' | 'pickup')}
            className="mr-2"
          />
          Delivery (${product.deliveredPrice})
        </label>
        <label className="flex items-center flex-1">
          <input
            type="radio"
            value="pickup"
            checked={deliveryMethod === 'pickup'}
            onChange={(e) => setDeliveryMethod(e.target.value as 'delivery' | 'pickup')}
            className="mr-2"
          />
          Pickup (${product.pickupPrice})
        </label>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full bg-blue-600 text-white py-2 px-4 text-sm rounded-md hover:bg-blue-700 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
}