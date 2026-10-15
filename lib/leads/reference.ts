import 'server-only';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

// Format LD-YYYY-NNNN. Calculé par SELECT MAX sur l'année en cours ; en cas de course,
// l'unicité de leads.reference fait échouer l'insert (23505) et l'appelant réessaie.
export async function nextLeadReference(supabase: SupabaseClient<Database>) {
  const prefix = `LD-${new Date().getFullYear()}-`;
  const { data, error } = await supabase
    .from('leads')
    .select('reference')
    .like('reference', `${prefix}%`)
    .order('reference', { ascending: false })
    .limit(1);
  if (error) throw error;

  const last = data[0]?.reference;
  const next = last ? Number.parseInt(last.slice(prefix.length), 10) + 1 : 1;
  if (next > 9999) throw new Error(`Compteur de références épuisé pour ${prefix}`);
  return `${prefix}${String(next).padStart(4, '0')}`;
}
