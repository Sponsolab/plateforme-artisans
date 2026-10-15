import 'server-only';
import { createAdminClient } from '@/lib/supabase/admin';
import type { Metier } from '@/types';

export async function getActiveMetiers(): Promise<Metier[]> {
  try {
    const { data, error } = await createAdminClient()
      .from('metiers')
      .select('*')
      .eq('actif', true)
      .order('label');
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('getActiveMetiers:', err);
    return [];
  }
}
