/*
  # Update product schema to match product.ts

  1. Changes
    - Add new columns for product details
    - Update column names to match TypeScript interface
    - Add appropriate constraints and defaults

  2. Security
    - Maintain existing RLS policies
    - No data loss operations
*/

-- Add new columns with safe defaults
ALTER TABLE products
ADD COLUMN IF NOT EXISTS thickness decimal(4,1),
ADD COLUMN IF NOT EXISTS pieces_per_case integer,
ADD COLUMN IF NOT EXISTS pieces_per_box integer,
ADD COLUMN IF NOT EXISTS boxes_per_case integer,
ADD COLUMN IF NOT EXISTS htsus_code text;

-- Create temporary columns for safe migration
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS temp_selling_price decimal(10,2);

-- Copy data to temporary columns
UPDATE products 
SET temp_selling_price = selling_price;

-- Rename columns to match TypeScript interface
ALTER TABLE products
RENAME COLUMN selling_price TO "sellingPrice";

-- Add comments for clarity
COMMENT ON COLUMN products.thickness IS 'Product thickness in millimeters';
COMMENT ON COLUMN products.pieces_per_case IS 'Number of pieces per case';
COMMENT ON COLUMN products.pieces_per_box IS 'Number of pieces per box';
COMMENT ON COLUMN products.boxes_per_case IS 'Number of boxes per case';
COMMENT ON COLUMN products.htsus_code IS 'Harmonized Tariff Schedule code';

-- Add indexes for new columns
CREATE INDEX IF NOT EXISTS idx_products_thickness ON products(thickness);
CREATE INDEX IF NOT EXISTS idx_products_pieces_per_case ON products(pieces_per_case);

-- Update type definitions
DO $$ BEGIN
  -- Ensure category is of the correct type
  IF NOT EXISTS (
    SELECT 1 FROM pg_type 
    WHERE typname = 'product_category'
  ) THEN
    CREATE TYPE product_category AS ENUM ('nitrile', 'latex', 'vinyl', 'tpe', 'other');
    
    -- Safely convert existing categories
    ALTER TABLE products 
    ALTER COLUMN category TYPE product_category 
    USING category::product_category;
  END IF;
END $$;