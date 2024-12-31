import { Product, ProductCategory } from '../types/product';

export function transformProduct(product: Partial<Product>): Partial<Product> {
  return {
    ...product,
    category: mapCategory(product.category),
  };
}

function mapCategory(category: string | undefined): ProductCategory {
  if (!category) return 'other';
  
  const normalizedCategory = category.toLowerCase();
  
  switch (normalizedCategory) {
    case 'nitrile':
      return 'nitrile';
    case 'latex':
      return 'latex';
    case 'vinyl':
      return 'vinyl';
    case 'tpe':
      return 'tpe';
    case 'industrial':
      return 'nitrile'; // Map industrial to nitrile since they're typically nitrile gloves
    default:
      return 'other';
  }
}