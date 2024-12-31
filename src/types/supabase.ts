export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type ProductCategory = 'nitrile' | 'latex' | 'vinyl' | 'tpe' | 'other';

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          sku: string | null
          name: string
          description: string | null
          image: string | null
          category: ProductCategory
          color: string | null
          thickness: number | null
          pieces_per_case: number | null
          pieces_per_box: number | null
          boxes_per_case: number | null
          msrp: number
          cost: number
          sellingPrice: number
          delivered_price: number
          pickup_price: number
          sizes: string[]
          htsus_code: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sku?: string | null
          name: string
          description?: string | null
          image?: string | null
          category: ProductCategory
          color?: string | null
          thickness?: number | null
          pieces_per_case?: number | null
          pieces_per_box?: number | null
          boxes_per_case?: number | null
          msrp: number
          cost: number
          sellingPrice: number
          delivered_price: number
          pickup_price: number
          sizes?: string[]
          htsus_code?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sku?: string | null
          name?: string
          description?: string | null
          image?: string | null
          category?: ProductCategory
          color?: string | null
          thickness?: number | null
          pieces_per_case?: number | null
          pieces_per_box?: number | null
          boxes_per_case?: number | null
          msrp?: number
          cost?: number
          sellingPrice?: number
          delivered_price?: number
          pickup_price?: number
          sizes?: string[]
          htsus_code?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      product_category: ProductCategory
    }
  }
}