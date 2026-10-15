// ⚠️ ATTENTION — CLIENT SERVICE ROLE : il contourne la RLS et a un accès total à la base.
// À utiliser UNIQUEMENT côté serveur (server actions et server components), jamais côté client.
// Les écritures passent par un server action avec validation Zod préalable.
// `server-only` fait échouer le build si ce module est importé depuis un composant client.
// Ne jamais exposer SUPABASE_SERVICE_ROLE_KEY.
import 'server-only';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
