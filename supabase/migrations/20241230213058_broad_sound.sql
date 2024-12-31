/*
  # Improved Products Schema

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `sku` (text, unique) - Product SKU/Item code
      - `name` (text) - Product name
      - `description` (text) - Product description
      - `image` (text) - Product image URL
      - `category` (text) - Product category (nitrile, latex, vinyl, tpe)
      - `color` (text) - Product color
      - `thickness` (decimal) - Glove thickness in mil
      - `pieces_per_case` (integer) - Number of pieces per case
      - `pieces_per_box` (integer) - Number of pieces per box
      - `boxes_per_case` (integer) - Number of boxes per case
      - `original_price` (decimal) - Original MSRP price
      - `discount_price` (decimal) - Discounted price
      - `delivered_price` (decimal) - Delivered case price
      - `pickup_price` (decimal) - Pickup case price
      - `sizes` (text[]) - Available sizes
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on products table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sku text UNIQUE,
  name text NOT NULL,
  description text,
  image text,
  category text NOT NULL,
  color text,
  thickness decimal(4,1),
  pieces_per_case integer,
  pieces_per_box integer,
  boxes_per_case integer,
  original_price decimal(10,2) NOT NULL,
  discount_price decimal(10,2) NOT NULL,
  delivered_price decimal(10,2) NOT NULL,
  pickup_price decimal(10,2) NOT NULL,
  sizes text[] NOT NULL DEFAULT ARRAY['XS', 'S', 'M', 'L', 'XL'],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add a trigger to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Allow public read access to products"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS products_category_idx ON products(category);
CREATE INDEX IF NOT EXISTS products_color_idx ON products(color);
CREATE INDEX IF NOT EXISTS products_sku_idx ON products(sku);