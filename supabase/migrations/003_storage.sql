-- 003_storage.sql — bucket privé pour les photos des leads.
--
-- Création du bucket UNIQUEMENT. Aucune policy sur storage.objects : la RLS y est activée
-- par défaut, donc aucun accès via la clé anon ou authenticated. Tout passe par le client
-- admin (service role key) dans les server actions, qui génèrera des URL signées pour l'admin.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'lead-photos',
  'lead-photos',
  false,
  5242880, -- 5 Mo par fichier
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;
