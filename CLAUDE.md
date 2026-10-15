# CLAUDE.md — Plateforme de mise en relation artisans

## Règle absolue

Toute écriture en base de données passe par un server action utilisant la clé service role Supabase. Jamais de clé service côté client. RLS activée sur toutes les tables, zéro policy publique. Le client navigateur n'a aucun accès direct à la DB.

## Description du projet

Plateforme de génération de leads qualifiés dans le BTP et les services à domicile. Les clients déposent une demande de devis (métier + département). Nous transmettons le lead en exclusivité à un artisan partenaire du secteur. L'artisan réalise le devis et le chantier. Nous facturons une commission sur le devis signé.

Modèle : apporteur d'affaires. Nous ne réalisons pas les travaux, nous ne produisons pas les devis, nous n'encaissons pas l'argent du client.

## Stack technique

- Next.js 15 App Router + TypeScript strict
- Tailwind CSS + shadcn/ui pour les composants
- Supabase : Postgres + Auth (magic link) + Storage (photos)
- Server Actions pour toute écriture — pas d'API routes inutiles
- Zod pour la validation de tous les inputs
- Resend + React Email pour les emails transactionnels
- Stripe Invoicing pour les commissions
- Vercel pour l'hébergement + preview deployments

## Architecture des dossiers

app/
(public)/ # Landing, pages SEO, formulaire
[metier]/
[departement]/
demande/
legal/
(admin)/ # Espace admin protégé
admin/
leads/
artisans/
pipeline/
factures/
actions/ # Server actions (toute écriture DB)
api/ # Uniquement webhooks et cron
components/
ui/ # shadcn/ui — ne jamais modifier
forms/ # Formulaires métier
admin/ # Composants admin
lib/
supabase/ # Clients Supabase (server + admin)
validators/ # Schémas Zod
email/ # Helpers Resend
utils/ # Fonctions pures
emails/ # Templates React Email
supabase/
migrations/ # Migrations SQL versionnées
types/
database.ts # Types générés par supabase gen types

## Conventions de code

- Server actions dans app/actions/\*.ts, nommées par verbe (submitLead, assignLead, createInvoice)
- Chaque server action retourne { ok: true, data } ou { ok: false, error }
- Validation Zod systématique avant toute écriture
- Un fichier = une responsabilité. Maximum 200 lignes.
- Composants UI dans components/ui (shadcn), composants métier ailleurs
- Emails React Email dans emails/\*.tsx
- Pas de fetch côté client vers Supabase — tout passe par server action
- Nommage DB : snake_case, tables au pluriel
- Imports absolus avec @/ — pas de chemins relatifs ../../

## Base de données

Schéma figé dans supabase/migrations/001_init.sql. Ne jamais modifier le schéma sans le demander explicitement.

Tables principales :

- metiers — catalogue des métiers (slug, label, commission_pct)
- departements — référentiel géographique (code, nom, région)
- leads — demandes de devis clients
- artisans — base partenaires (SIRET, zones, assurances, statut cold call)
- assignments — liaison lead ↔ artisan avec statut et commission
- activities — timeline (appels, emails, changements de statut)
- invoices — factures de commission

Contrainte critique : un index unique sur assignments.lead_id pour les statuts actifs garantit l'exclusivité — un lead ne part qu'à un seul artisan à la fois.

## Workflow de développement

Avant de coder une phase :

1. Afficher le plan : liste des fichiers à créer et modifier
2. Attendre la validation
3. Coder
4. Proposer un message de commit conventionnel

Après chaque phase :

- Vérifier que npm run build passe sans erreur
- Vérifier que npm run lint passe
- Mettre à jour ce fichier si de nouvelles conventions émergent

## Commandes utiles

npm run dev # Serveur de développement
npm run build # Build de production
npm run lint # ESLint
npm run typecheck # tsc --noEmit
npx supabase gen types typescript --local > types/database.ts
npx supabase db push # Appliquer les migrations

## Emails transactionnels

- lead-confirmation.tsx — accusé de réception au client
- lead-notification-interne.tsx — alerte interne nouveau lead
- artisan-lead-transmis.tsx — envoi du lead à l'artisan
- artisan-relance.tsx — relance J+2 si pas de réponse
- facture-commission.tsx — notification de facture

## Sécurité

- RLS activée partout, aucune policy publique
- Auth admin par magic link avec whitelist d'emails (ADMIN_EMAILS)
- Rate limiting sur submitLead (par IP)
- Honeypot anti-spam sur le formulaire public
- Consentement RGPD obligatoire avec mention explicite du transfert aux artisans
- Ne jamais exposer SUPABASE_SERVICE_ROLE_KEY côté client
- Le client admin (lib/supabase/admin.ts) s'utilise côté serveur uniquement (server actions et server components), protégé par `server-only`
- Rate limit submitLead : 5 leads max par heure et par ip_hash (HMAC de l'IP), calculé depuis la table leads
- Photos des leads : bucket privé lead-photos, chemins stockés dans leads.photos, accès par URL signées via le client admin

## Environnement

Variables requises dans .env.local :
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
RESEND_FROM_EMAIL (défaut : onboarding@resend.dev ; domaine vérifié en production)
STRIPE_SECRET_KEY
NEXT_PUBLIC_SITE_URL
ADMIN_EMAILS=email1@x.com,email2@x.com

## Ce qu'il ne faut PAS faire

- Ne pas improviser le schéma DB au fil des features
- Ne pas créer d'API routes pour des opérations CRUD — utiliser des server actions
- Ne pas encaisser l'argent du client pour l'artisan (risque de requalification en intermédiaire de paiement)
- Ne pas transmettre un lead à un artisan sans vérifier sa décennale
- Ne pas lancer plus d'un métier et trois départements pour le MVP
