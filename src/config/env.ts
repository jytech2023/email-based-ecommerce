interface Config {
  supabase: {
    url: string;
    anonKey: string;
  };
  web3FormsKey: string;
}

export const config: Config = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  },
  web3FormsKey: import.meta.env.VITE_WEB3FORMS_KEY || '',
};