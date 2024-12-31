import { Product } from '../types/product';
import { generateId } from '../utils/idGenerator';

export function transformProduct(scrapedProduct: Partial<Product>): Product {
  // Map category based on product name
  const category = determineCategory(scrapedProduct.name || '');
  
  // Map color based on product description
  const color = determineColor(scrapedProduct.name || '');

  return {
    id: generateId(scrapedProduct.name || ''),
    name: scrapedProduct.name || '',
    description: scrapedProduct.description || '',
    image: '', // Will need to be updated manually or with proper image URLs
    originalPrice: scrapedProduct.originalPrice || 0,
    discountPrice: scrapedProduct.discountPrice || 0,
    deliveredPrice: scrapedProduct.deliveredPrice || 0,
    pickupPrice: scrapedProduct.pickupPrice || 0,
    sizes: scrapedProduct.sizes || ['S', 'M', 'L'],
    color,
    category,
  };
}

function determineCategory(name: string): string {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('nitrile')) return 'nitrile';
  if (lowerName.includes('latex')) return 'latex';
  if (lowerName.includes('vinyl')) return 'vinyl';
  if (lowerName.includes('tpe')) return 'tpe';
  return 'other';
}

function determineColor(name: string): string {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('blue')) return 'blue';
  if (lowerName.includes('black')) return 'black';
  if (lowerName.includes('white')) return 'white';
  if (lowerName.includes('purple')) return 'purple';
  return 'clear';
}