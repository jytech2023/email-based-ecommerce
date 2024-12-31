import React from 'react';
import { Product } from '../types/product';
import { AddToCartButton } from './AddToCartButton';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
        <div className="mt-3 sm:mt-4 flex items-baseline gap-2">
          <span className="text-lg sm:text-xl font-bold text-gray-900">
            ${product.discountPrice.toFixed(2)}
          </span>
          {product.originalPrice > product.discountPrice && (
            <span className="text-xs sm:text-sm text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <div className="mt-3 sm:mt-4">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}