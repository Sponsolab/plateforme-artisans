-- 001_init.sql — schéma initial de la plateforme artisans.
-- RLS activée sur toutes les tables, AUCUNE policy : seul le service role (server actions) accède à la DB.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Types enum
-- ---------------------------------------------------------------------------

create type lead_status as enum (
  'nouveau', 'qualifie', 'transmis', 'devis_signe', 'perdu', 'rejete'
);

create type assignment_status as enum (
  'propose', 'accepte', 'devis_envoye', 'devis_signe', 'refuse', 'expire', 'annule'
);

create type artisan_status as enum (
  'a_appeler', 'contacte', 'interesse', 'partenaire', 'refuse', 'inactif'
);

-- ---------------------------------------------------------------------------
-- Fonction utilitaire : mise à jour automatique de updated_at
-- ---------------------------------------------------------------------------

create function set_updated_at() returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Référentiels
-- ---------------------------------------------------------------------------

create table metiers (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  label text not null,
  commission_pct numeric(5,2) not null check (commission_pct >= 0 and commission_pct <= 100),
  actif boolean not null default true,
  created_at timestamptz not null default now()
);

create table departements (
  code text primary key check (char_length(code) between 2 and 3),
  nom text not null,
  region text not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Leads
-- ---------------------------------------------------------------------------

create table leads (
  id uuid primary key default gen_random_uuid(),
  -- Format LD-YYYY-NNNN, généré côté server action (SELECT MAX sur l'année + retry sur conflit).
  -- L'unicité est garantie ici : en cas de race condition, l'insert échoue et l'action réessaie.
  reference text not null unique check (reference ~ '^LD-[0-9]{4}-[0-9]{4}$'),
  metier_id uuid not null references metiers (id),
  sous_type text,
  urgence text not null check (urgence in ('immediat', 'semaine', 'mois', 'projet')),
  description text not null,
  photos text[] not null default '{}',
  budget_estime text,
  adresse text not null,
  code_postal text not null check (code_postal ~ '^[0-9]{5}$'),
  ville text not null,
  departement_code text not null references departements (code),
  nom text not null,
  email text not null,
  telephone text not null,
  status lead_status not null default 'nouveau',
  consentement_rgpd_at timestamptz not null,
  ip_hash text,
  notes_internes text,
  source text,
  utm jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index leads_status_created_at_idx on leads (status, created_at desc);
create index leads_departement_metier_idx on leads (departement_code, metier_id);

create trigger leads_set_updated_at before update on leads
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Artisans
-- ---------------------------------------------------------------------------

create table artisans (
  id uuid primary key default gen_random_uuid(),
  raison_sociale text not null,
  siret text not null unique check (siret ~ '^[0-9]{14}$'),
  siret_verifie_le date,
  contact_nom text,
  email text,
  telephone text,
  metier_id uuid references metiers (id),
  -- NOTE V2 : migrer departements vers une table de liaison artisan_departements
  -- (artisan_id, departement_code) pour garantir l'intégrité référentielle (FK vers departements).
  departements text[] not null default '{}',
  decennale_assureur text,
  decennale_numero text,
  decennale_expire_le date,
  status artisan_status not null default 'a_appeler',
  source text,
  derniere_relance timestamptz,
  prochaine_relance timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index artisans_status_relance_idx on artisans (status, prochaine_relance);

create trigger artisans_set_updated_at before update on artisans
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Assignments (liaison lead <-> artisan)
-- ---------------------------------------------------------------------------

create table assignments (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads (id),
  artisan_id uuid not null references artisans (id),
  status assignment_status not null default 'propose',
  commission_pct numeric(5,2) not null check (commission_pct >= 0 and commission_pct <= 100),
  montant_devis_ht numeric(12,2) check (montant_devis_ht >= 0),
  commission_montant numeric(12,2) check (commission_montant >= 0),
  transmis_le timestamptz,
  accepte_le timestamptz,
  devis_signe_le timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Exclusivité : un lead ne peut avoir qu'une seule assignation active à la fois.
create unique index assignments_lead_actif_uniq on assignments (lead_id)
  where status in ('propose', 'accepte', 'devis_envoye', 'devis_signe');

create index assignments_artisan_idx on assignments (artisan_id);

create trigger assignments_set_updated_at before update on assignments
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Activities (timeline)
-- ---------------------------------------------------------------------------

create table activities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads (id),
  artisan_id uuid references artisans (id),
  assignment_id uuid references assignments (id),
  type text not null check (type in ('appel', 'email', 'changement_statut', 'note')),
  contenu text,
  auteur text,
  metadata jsonb,
  created_at timestamptz not null default now(),
  check (lead_id is not null or artisan_id is not null or assignment_id is not null)
);

create index activities_lead_idx on activities (lead_id, created_at desc);
create index activities_artisan_idx on activities (artisan_id, created_at desc);

-- ---------------------------------------------------------------------------
-- Invoices (factures de commission)
-- ---------------------------------------------------------------------------

create table invoices (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null unique references assignments (id),
  artisan_id uuid not null references artisans (id),
  montant_ht numeric(12,2) not null check (montant_ht >= 0),
  tva_pct numeric(5,2) not null default 20 check (tva_pct >= 0 and tva_pct <= 100),
  montant_ttc numeric(12,2) not null check (montant_ttc >= 0),
  status text not null default 'brouillon'
    check (status in ('brouillon', 'emise', 'payee', 'annulee')),
  stripe_invoice_id text unique,
  emise_le timestamptz,
  payee_le timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index invoices_artisan_idx on invoices (artisan_id);

create trigger invoices_set_updated_at before update on invoices
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security : activée partout, aucune policy (accès service role uniquement)
-- ---------------------------------------------------------------------------

alter table metiers enable row level security;
alter table departements enable row level security;
alter table leads enable row level security;
alter table artisans enable row level security;
alter table assignments enable row level security;
alter table activities enable row level security;
alter table invoices enable row level security;
