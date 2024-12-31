/*
  # Allow anonymous product inserts
  
  1. Security Changes
    - Add RLS policy to allow anonymous users to insert products
    - Maintain existing read-only policy
*/

-- Add policy for anonymous inserts
CREATE POLICY "Allow anonymous inserts to products"
  ON products
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE products ENABLE ROW LEVEL SECURITY;