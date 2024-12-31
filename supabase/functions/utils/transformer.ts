export function transformProduct(scrapedProduct) {
  const category = determineCategory(scrapedProduct.name || '')
  const color = determineColor(scrapedProduct.name || '')

  return {
    id: generateId(scrapedProduct.name || ''),
    name: scrapedProduct.name || '',
    description: scrapedProduct.description || '',
    image: '', // Will need to be updated manually
    original_price: scrapedProduct.originalPrice || 0,
    discount_price: scrapedProduct.discountPrice || 0,
    delivered_price: scrapedProduct.deliveredPrice || 0,
    pickup_price: scrapedProduct.pickupPrice || 0,
    sizes: scrapedProduct.sizes || ['S', 'M', 'L'],
    color,
    category,
  }
}

function generateId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function determineCategory(name: string): string {
  const lowerName = name.toLowerCase()
  if (lowerName.includes('nitrile')) return 'nitrile'
  if (lowerName.includes('latex')) return 'latex'
  if (lowerName.includes('vinyl')) return 'vinyl'
  if (lowerName.includes('tpe')) return 'tpe'
  return 'other'
}

function determineColor(name: string): string {
  const lowerName = name.toLowerCase()
  if (lowerName.includes('blue')) return 'blue'
  if (lowerName.includes('black')) return 'black'
  if (lowerName.includes('white')) return 'white'
  if (lowerName.includes('purple')) return 'purple'
  return 'clear'
}