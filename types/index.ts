import type { Enums, Tables, TablesInsert } from '@/types/database';

export type Metier = Tables<'metiers'>;
export type Departement = Tables<'departements'>;
export type Lead = Tables<'leads'>;
export type Artisan = Tables<'artisans'>;
export type Assignment = Tables<'assignments'>;
export type Activity = Tables<'activities'>;
export type Invoice = Tables<'invoices'>;

export type LeadInsert = TablesInsert<'leads'>;
export type ArtisanInsert = TablesInsert<'artisans'>;
export type AssignmentInsert = TablesInsert<'assignments'>;

export type LeadStatus = Enums<'lead_status'>;
export type AssignmentStatus = Enums<'assignment_status'>;
export type ArtisanStatus = Enums<'artisan_status'>;
