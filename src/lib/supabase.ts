// Supabase REST API helper
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabaseHeaders = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Prefer': 'return=representation',
};

export function supabaseUrl(table: string, query = '') {
  return `${SUPABASE_URL}/rest/v1/${table}${query ? '?' + query : ''}`;
}
