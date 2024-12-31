import axios from 'axios';
import * as cheerio from 'cheerio';
import { Product } from '../types/product';

export async function scrapeProducts(): Promise<Partial<Product>[]> {
  try {
    const response = await axios.get('https://usproglove.com/products/');
    const $ = cheerio.load(response.data);
    const products: Partial<Product>[] = [];

    // Select the product table rows
    $('tr').each((_, element) => {
      const cells = $(element).find('td');
      if (cells.length > 0) {
        const product: Partial<Product> = {
          name: $(cells[2]).text().trim(),
          description: '', // Will be populated from product details
          sizes: ['XS', 'S', 'M', 'L', 'XL'],
          originalPrice: parseFloat($(cells[cells.length - 3]).text().replace('$', '').trim()) || 0,
          discountPrice: parseFloat($(cells[cells.length - 2]).text().replace('$', '').trim()) || 0,
          deliveredPrice: parseFloat($(cells[cells.length - 2]).text().replace('$', '').trim()) || 0,
          pickupPrice: parseFloat($(cells[cells.length - 1]).text().replace('$', '').trim()) || 0,
        };
        
        if (Object.values(product).some(value => value !== undefined)) {
          products.push(product);
        }
      }
    });

    return products;
  } catch (error) {
    console.error('Error scraping products:', error);
    return [];
  }
}