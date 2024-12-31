import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts'

export async function scrapeProducts() {
  const response = await fetch('https://usproglove.com/products/')
  const html = await response.text()
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const products = []

  // Select all product rows
  const rows = doc.querySelectorAll('tr')
  for (const row of rows) {
    const cells = row.querySelectorAll('td')
    if (cells.length > 0) {
      products.push({
        name: cells[2]?.textContent?.trim(),
        description: '', // Will be populated from product details
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        originalPrice: parseFloat(cells[cells.length - 3]?.textContent?.replace('$', '')?.trim()) || 0,
        discountPrice: parseFloat(cells[cells.length - 2]?.textContent?.replace('$', '')?.trim()) || 0,
        deliveredPrice: parseFloat(cells[cells.length - 2]?.textContent?.replace('$', '')?.trim()) || 0,
        pickupPrice: parseFloat(cells[cells.length - 1]?.textContent?.replace('$', '')?.trim()) || 0,
      })
    }
  }

  return products
}