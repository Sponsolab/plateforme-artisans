#!/usr/bin/env bash
# Génère les types TypeScript depuis la base Supabase locale (doit être démarrée : npx supabase start).
set -euo pipefail

cd "$(dirname "$0")/.."
npx supabase gen types typescript --local > types/database.ts
echo "types/database.ts généré."
