import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { scrapeProducts } from '../utils/scraper.ts'
import { transformProduct } from '../utils/transformer.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Scrape and transform products
    const scrapedProducts = await scrapeProducts()
    const products = scrapedProducts.map(transformProduct)

    // Upsert products to database
    const { error } = await supabaseClient
      .from('products')
      .upsert(
        products.map(product => ({
          ...product,
          updated_at: new Date().toISOString()
        })),
        { onConflict: 'id' }
      )

    if (error) throw error

    return new Response(
      JSON.stringify({ success: true, count: products.length }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})