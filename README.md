# Plateforme Artisans

Plateforme de génération de leads qualifiés dans le BTP et les services à domicile : les clients déposent une demande de devis, le lead est transmis en exclusivité à un artisan partenaire, et nous facturons une commission sur le devis signé.

## Prérequis

- Node 22
- npm
- Un projet Supabase, un compte Resend et un compte Stripe

## Démarrage

```bash
npm install
cp .env.example .env.local   # puis renseigner les variables
npm run dev
```

## Commandes npm

| Commande            | Description                             |
| ------------------- | --------------------------------------- |
| `npm run dev`       | Serveur de développement                |
| `npm run build`     | Build de production                     |
| `npm run start`     | Serveur de production (après build)     |
| `npm run lint`      | ESLint                                  |
| `npm run typecheck` | Vérification des types (`tsc --noEmit`) |
| `npm run format`    | Formatage Prettier                      |

## Base de données

Supabase en local (nécessite Docker). Les ports sont décalés (553xx) dans `supabase/config.toml` pour ne pas entrer en conflit avec un autre projet Supabase local.

```bash
npx supabase start          # démarre Postgres + Auth en local
npx supabase db reset       # rejoue les migrations (001_init, 002_seed) sur une base vierge
npx supabase db push        # applique les migrations sur le projet distant lié
./scripts/generate-types.sh # régénère types/database.ts depuis la base locale
npx supabase stop           # arrête la stack locale
```

Le schéma est figé dans `supabase/migrations/001_init.sql` ; ne pas le modifier sans validation. Les référentiels (départements, métiers) sont semés par `002_seed.sql`. Après toute évolution du schéma, relancer `./scripts/generate-types.sh`.

Voir `CLAUDE.md` pour l'architecture et les conventions.
