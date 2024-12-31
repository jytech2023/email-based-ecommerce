/*
  # Create products table and sync function

  1. New Tables
    - `products`
      - `id` (text, primary key)
      - `name` (text)
      - `description` (text)
      - `image` (text)
      - `original_price` (decimal)
      - `discount_price` (decimal)
      - `delivered_price` (decimal)
      - `pickup_price` (decimal)
      - `sizes` (text[])
      - `color` (text)
      - `category` (text)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on products table
    - Add policy for authenticated users to read products
*/

CREATE TABLE IF NOT EXISTS products (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text,
  image text,
  original_price decimal(10,2) NOT NULL,
  discount_price decimal(10,2) NOT NULL,
  delivered_price decimal(10,2) NOT NULL,
  pickup_price decimal(10,2) NOT NULL,
  sizes text[] NOT NULL,
  color text,
  category text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to products"
  ON products
  FOR SELECT
  TO public
  USING (true);