/*
  # Update Products Schema

  1. Changes
    - Add new columns:
      - `msrp` (decimal) - Manufacturer's Suggested Retail Price
      - `cost` (decimal) - Product cost
      - `htsus_code` (text) - Harmonized Tariff Schedule code
    - Rename columns for consistency:
      - `original_price` -> `msrp`
      - `discount_price` -> `selling_price`
    - Add indexes for performance

  2. Data Migration
    - Safely migrate existing data to new structure
    - Preserve all existing records
*/

-- Add new columns
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS cost decimal(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS htsus_code text;

-- Create temporary columns for safe migration
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS temp_msrp decimal(10,2),
ADD COLUMN IF NOT EXISTS temp_selling_price decimal(10,2);

-- Copy data to temporary columns
UPDATE products 
SET 
  temp_msrp = original_price,
  temp_selling_price = discount_price;

-- Drop old columns
ALTER TABLE products 
DROP COLUMN IF EXISTS original_price,
DROP COLUMN IF EXISTS discount_price;

-- Rename temporary columns to final names
ALTER TABLE products 
RENAME COLUMN temp_msrp TO msrp;

ALTER TABLE products 
RENAME COLUMN temp_selling_price TO selling_price;

-- Add new indexes
CREATE INDEX IF NOT EXISTS products_msrp_idx ON products(msrp);
CREATE INDEX IF NOT EXISTS products_selling_price_idx ON products(selling_price);
CREATE INDEX IF NOT EXISTS products_htsus_code_idx ON products(htsus_code);

-- Update column comments
COMMENT ON COLUMN products.msrp IS 'Manufacturer''s Suggested Retail Price';
COMMENT ON COLUMN products.cost IS 'Product cost price';
COMMENT ON COLUMN products.selling_price IS 'Current selling price';
COMMENT ON COLUMN products.htsus_code IS 'Harmonized Tariff Schedule code';