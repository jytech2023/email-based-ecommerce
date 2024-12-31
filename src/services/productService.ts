import { supabase } from '../lib/supabase'
import type { Product } from '../types/product'

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data as Product[]
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data as Product
}