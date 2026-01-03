export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          password_hash: string // Note: ne jamais renvoyer au front en prod réelle via API directe
          company_name: string
          ninea: string | null
          rc_number: string | null
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          company_name: string
          ninea?: string | null
          rc_number?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          company_name?: string
          ninea?: string | null
          rc_number?: string | null
          updated_at?: string
        }
      }
      appels_offres: {
        Row: {
          id: string
          reference: string
          title: string
          authority: string
          country: string
          sector: string
          description: string
          full_content: string | null
          deadline: string
          budget: string | null
          is_premium: boolean
          risk_score: number | null
          created_at: string
          updated_at: string
        }
      }
      candidatures: {
        Row: {
          id: string
          user_id: string
          tender_id: string
          status: 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'REJECTED' | 'ACCEPTED'
          cover_letter: string | null
          documents_url: Json | null
          submitted_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          tender_id: string
          status?: string
          cover_letter?: string | null
          documents_url?: Json | null
        }
      }
      search_profiles: {
        Row: {
          id: string
          user_id: string
          name: string
          keywords: string[] | null
          target_countries: string[] | null
          target_sectors: string[] | null
          frequency: 'DAILY' | 'WEEKLY' | 'INSTANT'
          created_at: string
          updated_at: string
        }
      }
    }
  }
}
