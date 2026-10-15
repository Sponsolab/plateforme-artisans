import { z } from 'zod';

export const URGENCES = ['immediat', 'semaine', 'mois', 'projet'] as const;

// Téléphone français : 0X XX XX XX XX, +33 X XX XX XX XX ou 0033 X XX XX XX XX
const telephoneFr = /^(?:(?:\+|00)33|0)\s?[1-9](?:[\s.-]?\d{2}){4}$/;

export const leadSchema = z.object({
  metier_id: z.string().uuid(),
  sous_type: z.string().trim().max(100).optional(),
  urgence: z.enum(URGENCES),
  description: z.string().trim().min(20).max(2000),
  photos: z.array(z.string().url()).max(5),
  budget_estime: z.string().trim().max(100).optional(),
  adresse: z.string().trim().min(1).max(200),
  code_postal: z.string().regex(/^\d{5}$/, 'Code postal à 5 chiffres'),
  ville: z.string().trim().min(1).max(100),
  departement_code: z.string().min(2).max(3),
  nom: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  telephone: z.string().trim().regex(telephoneFr, 'Numéro de téléphone français invalide'),
  consentement_rgpd: z.literal(true),
  // Champ caché anti-spam : un humain le laisse vide.
  honeypot: z.literal(''),
});

export type LeadInput = z.infer<typeof leadSchema>;
