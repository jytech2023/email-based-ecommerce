import { scrapeProducts } from './productScraper';
import { transformProduct } from './productTransformer';
import fs from 'fs/promises';
import path from 'path';

async function importProducts() {
  try {
    // Scrape products
    console.log('Scraping products...');
    const scrapedProducts = await scrapeProducts();

    // Transform products
    console.log('Transforming products...');
    const products = scrapedProducts.map(transformProduct);

    // Generate TypeScript file content
    const fileContent = `import { Product } from '../types/product';

export const products: Product[] = ${JSON.stringify(products, null, 2)};
`;

    // Write to products.ts
    const outputPath = path.join(process.cwd(), 'src', 'data', 'products.ts');
    await fs.writeFile(outputPath, fileContent, 'utf-8');
    
    console.log('Products imported successfully!');
  } catch (error) {
    console.error('Error importing products:', error);
  }
}