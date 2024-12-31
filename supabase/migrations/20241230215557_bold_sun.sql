/*
  # Update product schema to match product.ts

  1. Changes
    - Rename columns to match TypeScript interface
    - Add missing columns
    - Update column types and constraints

  2. Security
    - Maintain existing RLS policies
    - Ensure data integrity
*/

-- Rename price columns to match TypeScript interface
ALTER TABLE products 
RENAME COLUMN original_price TO msrp;

ALTER TABLE products 
RENAME COLUMN discount_price TO "sellingPrice";

-- Add missing columns
ALTER TABLE products
ADD COLUMN IF NOT EXISTS cost numeric(10, 2) NOT NULL DEFAULT 0;

-- Add comments for clarity
COMMENT ON COLUMN products.msrp IS 'Manufacturer''s Suggested Retail Price';
COMMENT ON COLUMN products."sellingPrice" IS 'Current selling price';
COMMENT ON COLUMN products.cost IS 'Product cost price';

-- Create enum type for product category if it doesn't exist
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'product_category'
  ) THEN
    CREATE TYPE product_category AS ENUM ('nitrile', 'latex', 'vinyl', 'tpe', 'other');
  END IF;
END $$;

-- Safely convert category column to use enum
ALTER TABLE products
ALTER COLUMN category TYPE product_category USING category::product_category;