import type { EnvironmentConfig } from './types';

export const config: EnvironmentConfig = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  },
  web3FormsKey: import.meta.env.VITE_WEB3FORMS_KEY || '',
};