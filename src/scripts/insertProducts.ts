import { supabase } from '../lib/supabase.node';
import { products } from '../data/products';
import { transformProduct } from '../utils/productTransformer';
import type { Product } from '../types/product';

async function insertProducts() {
  try {
    const transformedProducts = products.map((product) => {
      const baseProduct: Partial<Product> = {
        name: product.name,
        description: product.description,
        image: product.image,
        color: product.color,
        msrp: product.originalPrice,
        cost: Math.round(product.discountPrice * 0.6 * 100) / 100,
        sellingPrice: product.discountPrice,
        delivered_price: product.deliveredPrice,
        pickup_price: product.pickupPrice,
        sizes: product.sizes,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      return transformProduct(baseProduct);
    });

    const { error } = await supabase
      .from('products')
      .upsert(transformedProducts, {
        onConflict: 'id',
      });

    if (error) {
      throw error;
    }

    console.log('Products inserted successfully!');
  } catch (error) {
    console.error('Error inserting products:', error);
  }
}

insertProducts();