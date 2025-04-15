export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            profiles: {
                Row: {
                    avatar_url: string | null
                    created_at: string
                    email: string | null
                    full_name: string | null
                    id: string
                    updated_at: string
                }
                Insert: {
                    avatar_url?: string | null
                    created_at?: string
                    email?: string | null
                    full_name?: string | null
                    id: string
                    updated_at?: string
                }
                Update: {
                    avatar_url?: string | null
                    created_at?: string
                    email?: string | null
                    full_name?: string | null
                    id?: string
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "profiles_id_fkey"
                        columns: ["id"]
                        isOneToOne: true
                        referencedRelation: "referral_stats"
                        referencedColumns: ["user_id"]
                    },
                ]
            }
            referral_codes: {
                Row: {
                    code: string
                    created_at: string | null
                    id: string
                    user_id: string
                }
                Insert: {
                    code: string
                    created_at?: string | null
                    id?: string
                    user_id: string
                }
                Update: {
                    code?: string
                    created_at?: string | null
                    id?: string
                    user_id?: string
                }
                Relationships: []
            }
            referral_uses: {
                Row: {
                    created_at: string | null
                    id: string
                    referral_code: string
                    used_by: string
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    referral_code: string
                    used_by: string
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    referral_code?: string
                    used_by?: string
                }
                Relationships: []
            }
            saved_arguments: {
                Row: {
                    content: Json
                    created_at: string
                    id: string
                    strength_score: number | null
                    suggestions_applied: number | null
                    title: string
                    updated_at: string
                    user_id: string
                }
                Insert: {
                    content: Json
                    created_at?: string
                    id?: string
                    strength_score?: number | null
                    suggestions_applied?: number | null
                    title: string
                    updated_at?: string
                    user_id: string
                }
                Update: {
                    content?: Json
                    created_at?: string
                    id?: string
                    strength_score?: number | null
                    suggestions_applied?: number | null
                    title?: string
                    updated_at?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "saved_arguments_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "referral_stats"
                        referencedColumns: ["user_id"]
                    },
                ]
            }
            user_activity: {
                Row: {
                    action_type: string
                    credit_type: string
                    credits_used: number
                    id: string
                    performed_at: string
                    user_id: string
                }
                Insert: {
                    action_type: string
                    credit_type?: string
                    credits_used?: number
                    id?: string
                    performed_at?: string
                    user_id: string
                }
                Update: {
                    action_type?: string
                    credit_type?: string
                    credits_used?: number
                    id?: string
                    performed_at?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "user_activity_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "referral_stats"
                        referencedColumns: ["user_id"]
                    },
                ]
            }
            user_subscriptions: {
                Row: {
                    advanced_credits_remaining: number
                    basic_credits_remaining: number
                    created_at: string
                    id: string
                    is_active: boolean
                    stripe_customer_id: string | null
                    stripe_subscription_id: string | null
                    subscription_end: string | null
                    subscription_start: string
                    tier: string
                    updated_at: string
                    user_id: string
                }
                Insert: {
                    advanced_credits_remaining?: number
                    basic_credits_remaining?: number
                    created_at?: string
                    id?: string
                    is_active?: boolean
                    stripe_customer_id?: string | null
                    stripe_subscription_id?: string | null
                    subscription_end?: string | null
                    subscription_start?: string
                    tier?: string
                    updated_at?: string
                    user_id: string
                }
                Update: {
                    advanced_credits_remaining?: number
                    basic_credits_remaining?: number
                    created_at?: string
                    id?: string
                    is_active?: boolean
                    stripe_customer_id?: string | null
                    stripe_subscription_id?: string | null
                    subscription_end?: string | null
                    subscription_start?: string
                    tier?: string
                    updated_at?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "user_subscriptions_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "referral_stats"
                        referencedColumns: ["user_id"]
                    },
                ]
            }
        }
        Views: {
            referral_stats: {
                Row: {
                    referral_code: string | null
                    used_by_count: number | null
                    user_id: string | null
                }
                Relationships: []
            }
        }
        Functions: {
            apply_referral_bonus: {
                Args:
                    | { _referral_code: string; _referred_user_id: string }
                    | { referral_code: string; referred_user_id: string }
                Returns: boolean
            }
            create_default_subscription: {
                Args: { user_id: string }
                Returns: undefined
            }
            create_referral_code_for_new_user_manual: {
                Args: { user_id: string }
                Returns: boolean
            }
            generate_random_code: {
                Args: Record<PropertyKey, never>
                Returns: string
            }
            get_user_referral_info: {
                Args: Record<PropertyKey, never>
                Returns: {
                    code: string
                    used_by_count: number
                }[]
            }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
    DefaultSchemaTableNameOrOptions extends
            | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
        | { schema: keyof Database },
    TableName extends DefaultSchemaTableNameOrOptions extends {
            schema: keyof Database
        }
        ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
            Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
        : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
    ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
        ? R
        : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
            DefaultSchema["Views"])
        ? (DefaultSchema["Tables"] &
            DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
                Row: infer R
            }
            ? R
            : never
        : never

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends
            | keyof DefaultSchema["Tables"]
        | { schema: keyof Database },
    TableName extends DefaultSchemaTableNameOrOptions extends {
            schema: keyof Database
        }
        ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
    ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
        | { schema: keyof Database },
    TableName extends DefaultSchemaTableNameOrOptions extends {
            schema: keyof Database
        }
        ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
    ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
        | { schema: keyof Database },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
            schema: keyof Database
        }
        ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
        : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
    ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
        ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
        : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
            | keyof DefaultSchema["CompositeTypes"]
        | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
            schema: keyof Database
        }
        ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
        : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
        ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
        : never

export const Constants = {
    public: {
        Enums: {},
    },
} as const
