import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';
import { config } from '../config/env';

export const supabase = createClient<Database>(
  config.supabase.url,
  config.supabase.anonKey
);