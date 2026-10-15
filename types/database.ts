
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  
  "graphql_public": {
          Tables: {
            [_ in never]: never
          }
          Views: {
            [_ in never]: never
          }
          Functions: {
            "graphql":
{ Args: { "extensions"?: Json,"operationName"?: string,"query"?: string,"variables"?: Json }; Returns: Json
                           }
          }
          Enums: {
            [_ in never]: never
          }
          CompositeTypes: {
            [_ in never]: never
          }
        },"public": {
          Tables: {
            "activities": {
                  Row: {
                    "artisan_id": string | null,"assignment_id": string | null,"auteur": string | null,"contenu": string | null,"created_at": string,"id": string,"lead_id": string | null,"metadata": Json | null,"type": string
                  }
                  ComputedFields: never
                  Insert: {
                    "artisan_id"?: string | null,"assignment_id"?: string | null,"auteur"?: string | null,"contenu"?: string | null,"created_at"?: string,"id"?: string,"lead_id"?: string | null,"metadata"?: Json | null,"type": string
                  }
                  Update: {
                    "artisan_id"?: string | null,"assignment_id"?: string | null,"auteur"?: string | null,"contenu"?: string | null,"created_at"?: string,"id"?: string,"lead_id"?: string | null,"metadata"?: Json | null,"type"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "activities_artisan_id_fkey"
      columns: ["artisan_id"]
isOneToOne: false
      referencedRelation: "artisans"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "activities_assignment_id_fkey"
      columns: ["assignment_id"]
isOneToOne: false
      referencedRelation: "assignments"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "activities_lead_id_fkey"
      columns: ["lead_id"]
isOneToOne: false
      referencedRelation: "leads"
      referencedColumns: ["id"]
    }
                  ]
                },"artisans": {
                  Row: {
                    "contact_nom": string | null,"created_at": string,"decennale_assureur": string | null,"decennale_expire_le": string | null,"decennale_numero": string | null,"departements": (string)[],"derniere_relance": string | null,"email": string | null,"id": string,"metier_id": string | null,"notes": string | null,"prochaine_relance": string | null,"raison_sociale": string,"siret": string,"siret_verifie_le": string | null,"source": string | null,"status": Database["public"]['Enums']["artisan_status"],"telephone": string | null,"updated_at": string
                  }
                  ComputedFields: never
                  Insert: {
                    "contact_nom"?: string | null,"created_at"?: string,"decennale_assureur"?: string | null,"decennale_expire_le"?: string | null,"decennale_numero"?: string | null,"departements"?: (string)[],"derniere_relance"?: string | null,"email"?: string | null,"id"?: string,"metier_id"?: string | null,"notes"?: string | null,"prochaine_relance"?: string | null,"raison_sociale": string,"siret": string,"siret_verifie_le"?: string | null,"source"?: string | null,"status"?: Database["public"]['Enums']["artisan_status"],"telephone"?: string | null,"updated_at"?: string
                  }
                  Update: {
                    "contact_nom"?: string | null,"created_at"?: string,"decennale_assureur"?: string | null,"decennale_expire_le"?: string | null,"decennale_numero"?: string | null,"departements"?: (string)[],"derniere_relance"?: string | null,"email"?: string | null,"id"?: string,"metier_id"?: string | null,"notes"?: string | null,"prochaine_relance"?: string | null,"raison_sociale"?: string,"siret"?: string,"siret_verifie_le"?: string | null,"source"?: string | null,"status"?: Database["public"]['Enums']["artisan_status"],"telephone"?: string | null,"updated_at"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "artisans_metier_id_fkey"
      columns: ["metier_id"]
isOneToOne: false
      referencedRelation: "metiers"
      referencedColumns: ["id"]
    }
                  ]
                },"assignments": {
                  Row: {
                    "accepte_le": string | null,"artisan_id": string,"commission_montant": number | null,"commission_pct": number,"created_at": string,"devis_signe_le": string | null,"id": string,"lead_id": string,"montant_devis_ht": number | null,"status": Database["public"]['Enums']["assignment_status"],"transmis_le": string | null,"updated_at": string
                  }
                  ComputedFields: never
                  Insert: {
                    "accepte_le"?: string | null,"artisan_id": string,"commission_montant"?: number | null,"commission_pct": number,"created_at"?: string,"devis_signe_le"?: string | null,"id"?: string,"lead_id": string,"montant_devis_ht"?: number | null,"status"?: Database["public"]['Enums']["assignment_status"],"transmis_le"?: string | null,"updated_at"?: string
                  }
                  Update: {
                    "accepte_le"?: string | null,"artisan_id"?: string,"commission_montant"?: number | null,"commission_pct"?: number,"created_at"?: string,"devis_signe_le"?: string | null,"id"?: string,"lead_id"?: string,"montant_devis_ht"?: number | null,"status"?: Database["public"]['Enums']["assignment_status"],"transmis_le"?: string | null,"updated_at"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "assignments_artisan_id_fkey"
      columns: ["artisan_id"]
isOneToOne: false
      referencedRelation: "artisans"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "assignments_lead_id_fkey"
      columns: ["lead_id"]
isOneToOne: false
      referencedRelation: "leads"
      referencedColumns: ["id"]
    }
                  ]
                },"departements": {
                  Row: {
                    "code": string,"created_at": string,"nom": string,"region": string
                  }
                  ComputedFields: never
                  Insert: {
                    "code": string,"created_at"?: string,"nom": string,"region": string
                  }
                  Update: {
                    "code"?: string,"created_at"?: string,"nom"?: string,"region"?: string
                  }
                  Relationships: [
                    
                  ]
                },"invoices": {
                  Row: {
                    "artisan_id": string,"assignment_id": string,"created_at": string,"emise_le": string | null,"id": string,"montant_ht": number,"montant_ttc": number,"payee_le": string | null,"status": string,"stripe_invoice_id": string | null,"tva_pct": number,"updated_at": string
                  }
                  ComputedFields: never
                  Insert: {
                    "artisan_id": string,"assignment_id": string,"created_at"?: string,"emise_le"?: string | null,"id"?: string,"montant_ht": number,"montant_ttc": number,"payee_le"?: string | null,"status"?: string,"stripe_invoice_id"?: string | null,"tva_pct"?: number,"updated_at"?: string
                  }
                  Update: {
                    "artisan_id"?: string,"assignment_id"?: string,"created_at"?: string,"emise_le"?: string | null,"id"?: string,"montant_ht"?: number,"montant_ttc"?: number,"payee_le"?: string | null,"status"?: string,"stripe_invoice_id"?: string | null,"tva_pct"?: number,"updated_at"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "invoices_artisan_id_fkey"
      columns: ["artisan_id"]
isOneToOne: false
      referencedRelation: "artisans"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "invoices_assignment_id_fkey"
      columns: ["assignment_id"]
isOneToOne: true
      referencedRelation: "assignments"
      referencedColumns: ["id"]
    }
                  ]
                },"leads": {
                  Row: {
                    "adresse": string,"budget_estime": string | null,"code_postal": string,"consentement_rgpd_at": string,"created_at": string,"departement_code": string,"description": string,"email": string,"id": string,"ip_hash": string | null,"metier_id": string,"nom": string,"notes_internes": string | null,"photos": (string)[],"reference": string,"source": string | null,"sous_type": string | null,"status": Database["public"]['Enums']["lead_status"],"telephone": string,"updated_at": string,"urgence": string,"utm": Json | null,"ville": string
                  }
                  ComputedFields: never
                  Insert: {
                    "adresse": string,"budget_estime"?: string | null,"code_postal": string,"consentement_rgpd_at": string,"created_at"?: string,"departement_code": string,"description": string,"email": string,"id"?: string,"ip_hash"?: string | null,"metier_id": string,"nom": string,"notes_internes"?: string | null,"photos"?: (string)[],"reference": string,"source"?: string | null,"sous_type"?: string | null,"status"?: Database["public"]['Enums']["lead_status"],"telephone": string,"updated_at"?: string,"urgence": string,"utm"?: Json | null,"ville": string
                  }
                  Update: {
                    "adresse"?: string,"budget_estime"?: string | null,"code_postal"?: string,"consentement_rgpd_at"?: string,"created_at"?: string,"departement_code"?: string,"description"?: string,"email"?: string,"id"?: string,"ip_hash"?: string | null,"metier_id"?: string,"nom"?: string,"notes_internes"?: string | null,"photos"?: (string)[],"reference"?: string,"source"?: string | null,"sous_type"?: string | null,"status"?: Database["public"]['Enums']["lead_status"],"telephone"?: string,"updated_at"?: string,"urgence"?: string,"utm"?: Json | null,"ville"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "leads_departement_code_fkey"
      columns: ["departement_code"]
isOneToOne: false
      referencedRelation: "departements"
      referencedColumns: ["code"]
    },{
      foreignKeyName: "leads_metier_id_fkey"
      columns: ["metier_id"]
isOneToOne: false
      referencedRelation: "metiers"
      referencedColumns: ["id"]
    }
                  ]
                },"metiers": {
                  Row: {
                    "actif": boolean,"commission_pct": number,"created_at": string,"id": string,"label": string,"slug": string
                  }
                  ComputedFields: never
                  Insert: {
                    "actif"?: boolean,"commission_pct": number,"created_at"?: string,"id"?: string,"label": string,"slug": string
                  }
                  Update: {
                    "actif"?: boolean,"commission_pct"?: number,"created_at"?: string,"id"?: string,"label"?: string,"slug"?: string
                  }
                  Relationships: [
                    
                  ]
                }
          }
          Views: {
            [_ in never]: never
          }
          Functions: {
            [_ in never]: never
          }
          Enums: {
            "artisan_status": "a_appeler"|"contacte"|"interesse"|"partenaire"|"refuse"|"inactif","assignment_status": "propose"|"accepte"|"devis_envoye"|"devis_signe"|"refuse"|"expire"|"annule","lead_status": "nouveau"|"qualifie"|"transmis"|"devis_signe"|"perdu"|"rejete"
          }
          CompositeTypes: {
            [_ in never]: never
          }
        }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  "graphql_public": {
          Enums: {
            
          }
        },"public": {
          Enums: {
            "artisan_status": ["a_appeler", "contacte", "interesse", "partenaire", "refuse", "inactif"],"assignment_status": ["propose", "accepte", "devis_envoye", "devis_signe", "refuse", "expire", "annule"],"lead_status": ["nouveau", "qualifie", "transmis", "devis_signe", "perdu", "rejete"]
          }
        }
} as const
