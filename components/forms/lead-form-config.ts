import { leadSchema } from '@/lib/validators/lead';

export type FormValues = {
  metier_id: string;
  urgence: string;
  adresse: string;
  code_postal: string;
  ville: string;
  departement_code: string;
  description: string;
  sous_type: string;
  budget_estime: string;
  nom: string;
  email: string;
  telephone: string;
  consentement_rgpd: boolean;
  honeypot: string;
};

export type FieldErrors = Partial<Record<keyof FormValues, string>>;

export const INITIAL_VALUES: FormValues = {
  metier_id: '',
  urgence: '',
  adresse: '',
  code_postal: '',
  ville: '',
  departement_code: '',
  description: '',
  sous_type: '',
  budget_estime: '',
  nom: '',
  email: '',
  telephone: '',
  consentement_rgpd: false,
  honeypot: '',
};

export const URGENCE_LABELS = [
  { value: 'immediat', label: 'Immédiat (urgence)' },
  { value: 'semaine', label: 'Dans la semaine' },
  { value: 'mois', label: 'Dans le mois' },
  { value: 'projet', label: 'Simple projet, pas de date' },
];

export const STEP_TITLES = ['Votre projet', 'Localisation', 'Description', 'Vos coordonnées'];

export const STEP_SCHEMAS = [
  leadSchema.pick({ metier_id: true, urgence: true }),
  leadSchema.pick({ adresse: true, code_postal: true, ville: true, departement_code: true }),
  leadSchema.pick({ description: true, sous_type: true, budget_estime: true }),
  leadSchema.pick({ nom: true, email: true, telephone: true, consentement_rgpd: true }),
];

export const FIELD_MESSAGES: Partial<Record<keyof FormValues, string>> = {
  metier_id: 'Choisissez un métier.',
  urgence: "Indiquez l'urgence.",
  adresse: 'Indiquez votre adresse.',
  code_postal: 'Code postal à 5 chiffres (France).',
  departement_code: 'Code postal non reconnu.',
  ville: 'Indiquez votre ville.',
  description: 'Décrivez votre projet (20 caractères minimum).',
  nom: 'Indiquez votre nom.',
  email: 'Adresse email invalide.',
  telephone: 'Numéro de téléphone français invalide.',
  consentement_rgpd: 'Votre consentement est nécessaire pour envoyer la demande.',
};
