export type ProductCategory = 'nitrile' | 'latex' | 'vinyl' | 'tpe' | 'other';

export interface Product {
  id: string;
  sku?: string;
  name: string;
  description?: string;
  image?: string;
  category: ProductCategory;
  color?: string;
  thickness?: number;
  piecesPerCase?: number;
  piecesPerBox?: number;
  boxesPerCase?: number;
  msrp: number;
  cost: number;
  sellingPrice: number;
  deliveredPrice: number;
  pickupPrice: number;
  sizes: string[];
  htsusCode?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type SizeOption = 'XS' | 'S' | 'M' | 'L' | 'XL';