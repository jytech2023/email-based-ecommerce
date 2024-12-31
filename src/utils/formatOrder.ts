import { CartItem } from '../types/cart';
import { products } from '../data/products';

export function formatOrderEmail(items: CartItem[], total: number): string {
  const orderDetails = items.map(item => {
    const product = products.find(p => p.id === item.productId);
    if (!product) return '';
    
    return `
Product: ${product.name}
Description: ${product.description}
Size: ${item.size}
Quantity: ${item.quantity}
Delivery Method: ${item.deliveryMethod}
Price: $${(item.deliveryMethod === 'delivery' ? product.deliveredPrice : product.pickupPrice).toFixed(2)}
    `;
  }).join('\n');

  return `
New Order Details:

${orderDetails}

Total Amount: $${total.toFixed(2)}
  `;
}