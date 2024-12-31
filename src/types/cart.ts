export interface CartItem {
  productId: string;
  quantity: number;
  size: string;
  deliveryMethod: 'delivery' | 'pickup';
}

export interface Cart {
  items: CartItem[];
  total: number;
}