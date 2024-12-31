import { config as dotenvConfig } from 'dotenv';
import type { EnvironmentConfig } from './types';

dotenvConfig();

export const config: EnvironmentConfig = {
  supabase: {
    url: process.env.VITE_SUPABASE_URL || '',
    anonKey: process.env.VITE_SUPABASE_ANON_KEY || '',
  },
  web3FormsKey: process.env.VITE_WEB3FORMS_KEY || '',
};