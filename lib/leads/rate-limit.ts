import 'server-only';
import { createHmac } from 'node:crypto';
import type { SupabaseClient } from '@supabase/supabase-js';
import { headers } from 'next/headers';
import type { Database } from '@/types/database';

const MAX_LEADS_PER_HOUR = 5;

// HMAC de l'IP : on ne stocke jamais l'adresse en clair.
export async function getIpHash(): Promise<string | null> {
  const h = await headers();
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip');
  if (!ip) return null;
  return createHmac('sha256', process.env.SUPABASE_SERVICE_ROLE_KEY!).update(ip).digest('hex');
}

export async function isRateLimited(supabase: SupabaseClient<Database>, ipHash: string | null) {
  if (!ipHash) return false;
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count, error } = await supabase
    .from('leads')
    .select('id', { count: 'exact', head: true })
    .eq('ip_hash', ipHash)
    .gte('created_at', since);
  if (error) throw error;
  return (count ?? 0) >= MAX_LEADS_PER_HOUR;
}
