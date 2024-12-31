import React, { createContext, useContext, useReducer } from 'react';
import { Cart, CartItem } from '../types/cart';
import { products } from '../data/products';

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; size: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; size: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const initialState: Cart = {
  items: [],
  total: 0,
};

function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    if (!product) return sum;
    const price = item.deliveryMethod === 'delivery' 
      ? product.deliveredPrice 
      : product.pickupPrice;
    return sum + (price * item.quantity);
  }, 0);
}

function cartReducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.productId === action.payload.productId && item.size === action.payload.size
      );

      let newItems;
      if (existingItemIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [...state.items, action.payload];
      }

      return {
        items: newItems,
        total: calculateTotal(newItems),
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(
        item => !(item.productId === action.payload.productId && item.size === action.payload.size)
      );
      return {
        items: newItems,
        total: calculateTotal(newItems),
      };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.productId === action.payload.productId && item.size === action.payload.size
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        items: newItems,
        total: calculateTotal(newItems),
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
}

const CartContext = createContext<{
  cart: Cart;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
} | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (productId: string, size: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, size } });
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, size, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}