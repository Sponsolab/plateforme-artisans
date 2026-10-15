// ⚠️ ATTENTION — CLIENT SERVICE ROLE : il contourne la RLS et a un accès total à la base.
// À utiliser UNIQUEMENT dans les server actions (app/actions/*.ts), après validation Zod.
// Ne jamais l'importer depuis un composant client ni exposer SUPABASE_SERVICE_ROLE_KEY.
import { createClient } from '@supabase/supabase-js';

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    },
  );
}
