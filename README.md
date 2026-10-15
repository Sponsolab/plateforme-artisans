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

Voir `CLAUDE.md` pour l'architecture et les conventions.
