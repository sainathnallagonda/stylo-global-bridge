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
      addresses: {
        Row: {
          apartment_unit: string | null
          city: string
          country: string
          created_at: string
          id: string
          is_default: boolean | null
          label: string
          phone: string | null
          postal_code: string
          state_province: string
          street_address: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          apartment_unit?: string | null
          city: string
          country: string
          created_at?: string
          id?: string
          is_default?: boolean | null
          label: string
          phone?: string | null
          postal_code: string
          state_province: string
          street_address: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          apartment_unit?: string | null
          city?: string
          country?: string
          created_at?: string
          id?: string
          is_default?: boolean | null
          label?: string
          phone?: string | null
          postal_code?: string
          state_province?: string
          street_address?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          item_data: Json
          service_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          item_data: Json
          service_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          item_data?: Json
          service_type?: string
          user_id?: string
        }
        Relationships: []
      }
      loyalty_points: {
        Row: {
          created_at: string
          id: string
          order_id: string | null
          points: number
          transaction_reason: string
          transaction_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          order_id?: string | null
          points?: number
          transaction_reason: string
          transaction_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string | null
          points?: number
          transaction_reason?: string
          transaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_points_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string
          expires_at: string | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type?: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      order_tracking: {
        Row: {
          delivery_notes: string | null
          id: string
          location: string | null
          message: string | null
          metadata: Json | null
          order_id: string
          photo_url: string | null
          status: string
          timestamp: string
        }
        Insert: {
          delivery_notes?: string | null
          id?: string
          location?: string | null
          message?: string | null
          metadata?: Json | null
          order_id: string
          photo_url?: string | null
          status: string
          timestamp?: string
        }
        Update: {
          delivery_notes?: string | null
          id?: string
          location?: string | null
          message?: string | null
          metadata?: Json | null
          order_id?: string
          photo_url?: string | null
          status?: string
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_tracking_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          assigned_vendor_id: string | null
          converted_amount: number | null
          converted_currency: string | null
          created_at: string
          currency: string
          delivery_address: Json
          id: string
          items: Json
          recipient_country: string
          recipient_info: Json
          service_type: string
          special_instructions: string | null
          status: string
          total_amount: number
          updated_at: string
          user_id: string
          vendor_status: string | null
        }
        Insert: {
          assigned_vendor_id?: string | null
          converted_amount?: number | null
          converted_currency?: string | null
          created_at?: string
          currency: string
          delivery_address: Json
          id?: string
          items: Json
          recipient_country: string
          recipient_info: Json
          service_type: string
          special_instructions?: string | null
          status?: string
          total_amount: number
          updated_at?: string
          user_id: string
          vendor_status?: string | null
        }
        Update: {
          assigned_vendor_id?: string | null
          converted_amount?: number | null
          converted_currency?: string | null
          created_at?: string
          currency?: string
          delivery_address?: Json
          id?: string
          items?: Json
          recipient_country?: string
          recipient_info?: Json
          service_type?: string
          special_instructions?: string | null
          status?: string
          total_amount?: number
          updated_at?: string
          user_id?: string
          vendor_status?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: Json | null
          avatar_url: string | null
          country: string | null
          created_at: string
          current_location: Json | null
          date_of_birth: string | null
          email: string | null
          full_name: string | null
          gender: string | null
          id: string
          notification_preferences: Json | null
          phone: string | null
          preferred_currency: string | null
          preferred_delivery_address: Json | null
          role: string | null
          updated_at: string
        }
        Insert: {
          address?: Json | null
          avatar_url?: string | null
          country?: string | null
          created_at?: string
          current_location?: Json | null
          date_of_birth?: string | null
          email?: string | null
          full_name?: string | null
          gender?: string | null
          id: string
          notification_preferences?: Json | null
          phone?: string | null
          preferred_currency?: string | null
          preferred_delivery_address?: Json | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          address?: Json | null
          avatar_url?: string | null
          country?: string | null
          created_at?: string
          current_location?: Json | null
          date_of_birth?: string | null
          email?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          notification_preferences?: Json | null
          phone?: string | null
          preferred_currency?: string | null
          preferred_delivery_address?: Json | null
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      recommendations: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          item_data: Json
          reason: string | null
          score: number
          service_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          item_data: Json
          reason?: string | null
          score?: number
          service_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          item_data?: Json
          reason?: string | null
          score?: number
          service_type?: string
          user_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string
          id: string
          item_id: string
          order_id: string | null
          rating: number
          review_text: string | null
          service_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          item_id: string
          order_id?: string | null
          rating: number
          review_text?: string | null
          service_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          item_id?: string
          order_id?: string | null
          rating?: number
          review_text?: string | null
          service_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string
          currency: string
          delivery_address: Json
          frequency: string
          id: string
          items: Json
          next_delivery_date: string
          service_type: string
          status: string
          total_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          currency: string
          delivery_address: Json
          frequency: string
          id?: string
          items: Json
          next_delivery_date: string
          service_type: string
          status?: string
          total_amount: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          currency?: string
          delivery_address?: Json
          frequency?: string
          id?: string
          items?: Json
          next_delivery_date?: string
          service_type?: string
          status?: string
          total_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_wallets: {
        Row: {
          created_at: string
          id: string
          inr_balance: number | null
          updated_at: string
          usd_balance: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          inr_balance?: number | null
          updated_at?: string
          usd_balance?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          inr_balance?: number | null
          updated_at?: string
          usd_balance?: number | null
          user_id?: string
        }
        Relationships: []
      }
      vendor_analytics: {
        Row: {
          average_rating: number | null
          created_at: string
          currency: string
          customer_count: number | null
          date: string
          id: string
          popular_items: Json | null
          total_orders: number | null
          total_revenue: number | null
          updated_at: string
          vendor_id: string
        }
        Insert: {
          average_rating?: number | null
          created_at?: string
          currency?: string
          customer_count?: number | null
          date: string
          id?: string
          popular_items?: Json | null
          total_orders?: number | null
          total_revenue?: number | null
          updated_at?: string
          vendor_id: string
        }
        Update: {
          average_rating?: number | null
          created_at?: string
          currency?: string
          customer_count?: number | null
          date?: string
          id?: string
          popular_items?: Json | null
          total_orders?: number | null
          total_revenue?: number | null
          updated_at?: string
          vendor_id?: string
        }
        Relationships: []
      }
      vendor_foods: {
        Row: {
          category: string
          created_at: string
          currency: string
          delivery_radius: number | null
          description: string | null
          id: string
          image_url: string | null
          is_available: boolean
          name: string
          preparation_time: number
          price: number
          service_areas: Json | null
          updated_at: string
          vendor_id: string
          vendor_location: Json | null
        }
        Insert: {
          category: string
          created_at?: string
          currency?: string
          delivery_radius?: number | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean
          name: string
          preparation_time?: number
          price: number
          service_areas?: Json | null
          updated_at?: string
          vendor_id: string
          vendor_location?: Json | null
        }
        Update: {
          category?: string
          created_at?: string
          currency?: string
          delivery_radius?: number | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean
          name?: string
          preparation_time?: number
          price?: number
          service_areas?: Json | null
          updated_at?: string
          vendor_id?: string
          vendor_location?: Json | null
        }
        Relationships: []
      }
      vendor_profiles: {
        Row: {
          business_address: Json
          business_description: string | null
          business_hours: Json
          business_license: string | null
          business_name: string
          contact_phone: string | null
          created_at: string
          id: string
          is_active: boolean
          is_verified: boolean
          service_areas: Json
          updated_at: string
          vendor_id: string
        }
        Insert: {
          business_address: Json
          business_description?: string | null
          business_hours?: Json
          business_license?: string | null
          business_name: string
          contact_phone?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          is_verified?: boolean
          service_areas?: Json
          updated_at?: string
          vendor_id: string
        }
        Update: {
          business_address?: Json
          business_description?: string | null
          business_hours?: Json
          business_license?: string | null
          business_name?: string
          contact_phone?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          is_verified?: boolean
          service_areas?: Json
          updated_at?: string
          vendor_id?: string
        }
        Relationships: []
      }
      vendor_reviews: {
        Row: {
          created_at: string
          id: string
          is_verified: boolean | null
          order_id: string | null
          rating: number
          review_text: string | null
          updated_at: string
          user_id: string
          vendor_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_verified?: boolean | null
          order_id?: string | null
          rating: number
          review_text?: string | null
          updated_at?: string
          user_id: string
          vendor_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_verified?: boolean | null
          order_id?: string | null
          rating?: number
          review_text?: string | null
          updated_at?: string
          user_id?: string
          vendor_id?: string
        }
        Relationships: []
      }
      wallet_transactions: {
        Row: {
          amount: number
          balance_after: number
          created_at: string
          currency: string
          id: string
          reference_id: string | null
          transaction_reason: string
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          balance_after: number
          created_at?: string
          currency: string
          id?: string
          reference_id?: string | null
          transaction_reason: string
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          balance_after?: number
          created_at?: string
          currency?: string
          id?: string
          reference_id?: string | null
          transaction_reason?: string
          transaction_type?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_order_tracking: {
        Args: {
          order_id: string
          status: string
          message?: string
          location?: string
        }
        Returns: string
      }
      generate_recommendations: {
        Args: { user_uuid: string }
        Returns: undefined
      }
      get_nearby_vendors: {
        Args: { customer_location: Json; service_radius?: number }
        Returns: {
          vendor_id: string
          business_name: string
          distance_km: number
        }[]
      }
      get_user_loyalty_points: {
        Args: { user_uuid: string }
        Returns: number
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
