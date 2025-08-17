import { supabase } from "@/integrations/supabase/client";

export interface UserProfile {
  id?: string;
  user_id: string;
  display_name?: string;
  email?: string;
  location_preferences?: LocationPreferences;
  financial_profile?: FinancialProfile;
  saved_calculations?: SavedCalculation[];
  preferences?: UserPreferences;
  created_at?: string;
  updated_at?: string;
}

export interface LocationPreferences {
  current_province?: string;
  current_city?: string;
  target_provinces?: string[];
  target_cities?: string[];
  preferred_regions?: string[];
}

export interface FinancialProfile {
  annual_income?: number;
  monthly_income?: number;
  current_savings?: number;
  monthly_expenses?: number;
  debt_amount?: number;
  credit_score_range?: string;
  employment_status?: string;
  household_size?: number;
  dependents?: number;
}

export interface SavedCalculation {
  id: string;
  type: 'housing' | 'retirement' | 'salary' | 'benefits' | 'cost_comparison';
  name: string;
  parameters: Record<string, any>;
  results: Record<string, any>;
  created_at: string;
  notes?: string;
}

export interface UserPreferences {
  currency_format?: 'CAD' | 'USD';
  language?: 'en' | 'fr';
  notifications?: {
    market_updates?: boolean;
    rate_changes?: boolean;
    new_features?: boolean;
  };
  privacy?: {
    share_anonymous_data?: boolean;
    marketing_emails?: boolean;
  };
  dashboard_layout?: string[];
  favorite_tools?: string[];
}

export class UserProfileService {
  // Get user profile
  static async getUserProfile(userId: string): Promise<{ data: UserProfile | null; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error fetching user profile:', error);
        return { data: null, error: error.message };
      }

      return { data: data || null };
    } catch (error) {
      console.error('Unexpected error fetching user profile:', error);
      return { data: null, error: 'An unexpected error occurred' };
    }
  }

  // Create or update user profile
  static async upsertUserProfile(profile: UserProfile): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert([profile], {
          onConflict: 'user_id',
          ignoreDuplicates: false
        });

      if (error) {
        console.error('Error upserting user profile:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Unexpected error upserting user profile:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  // Save a calculation
  static async saveCalculation(
    userId: string, 
    calculation: Omit<SavedCalculation, 'id' | 'created_at'>
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // First get the user's profile
      const { data: profile } = await this.getUserProfile(userId);
      
      const newCalculation: SavedCalculation = {
        ...calculation,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString()
      };

      const savedCalculations = profile?.saved_calculations || [];
      savedCalculations.unshift(newCalculation); // Add to beginning

      // Keep only the last 50 calculations
      const trimmedCalculations = savedCalculations.slice(0, 50);

      const updatedProfile: UserProfile = {
        ...profile,
        user_id: userId,
        saved_calculations: trimmedCalculations,
        updated_at: new Date().toISOString()
      };

      return await this.upsertUserProfile(updatedProfile);
    } catch (error) {
      console.error('Unexpected error saving calculation:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  // Get saved calculations
  static async getSavedCalculations(userId: string, type?: string): Promise<{ data: SavedCalculation[]; error?: string }> {
    try {
      const { data: profile, error } = await this.getUserProfile(userId);
      
      if (error) {
        return { data: [], error };
      }

      let calculations = profile?.saved_calculations || [];
      
      if (type) {
        calculations = calculations.filter(calc => calc.type === type);
      }

      return { data: calculations };
    } catch (error) {
      console.error('Unexpected error fetching calculations:', error);
      return { data: [], error: 'An unexpected error occurred' };
    }
  }

  // Delete a saved calculation
  static async deleteCalculation(userId: string, calculationId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: profile } = await this.getUserProfile(userId);
      
      if (!profile?.saved_calculations) {
        return { success: true }; // Nothing to delete
      }

      const updatedCalculations = profile.saved_calculations.filter(
        calc => calc.id !== calculationId
      );

      const updatedProfile: UserProfile = {
        ...profile,
        saved_calculations: updatedCalculations,
        updated_at: new Date().toISOString()
      };

      return await this.upsertUserProfile(updatedProfile);
    } catch (error) {
      console.error('Unexpected error deleting calculation:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  // Update location preferences
  static async updateLocationPreferences(
    userId: string, 
    preferences: LocationPreferences
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: profile } = await this.getUserProfile(userId);

      const updatedProfile: UserProfile = {
        ...profile,
        user_id: userId,
        location_preferences: preferences,
        updated_at: new Date().toISOString()
      };

      return await this.upsertUserProfile(updatedProfile);
    } catch (error) {
      console.error('Unexpected error updating location preferences:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  // Update financial profile
  static async updateFinancialProfile(
    userId: string, 
    financialProfile: FinancialProfile
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: profile } = await this.getUserProfile(userId);

      const updatedProfile: UserProfile = {
        ...profile,
        user_id: userId,
        financial_profile: financialProfile,
        updated_at: new Date().toISOString()
      };

      return await this.upsertUserProfile(updatedProfile);
    } catch (error) {
      console.error('Unexpected error updating financial profile:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  // Update user preferences
  static async updatePreferences(
    userId: string, 
    preferences: UserPreferences
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: profile } = await this.getUserProfile(userId);

      const updatedProfile: UserProfile = {
        ...profile,
        user_id: userId,
        preferences: preferences,
        updated_at: new Date().toISOString()
      };

      return await this.upsertUserProfile(updatedProfile);
    } catch (error) {
      console.error('Unexpected error updating preferences:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  // Get user statistics (for dashboard)
  static async getUserStatistics(userId: string): Promise<{
    totalCalculations: number;
    favoriteTools: string[];
    recentActivity: SavedCalculation[];
    profileCompleteness: number;
  }> {
    try {
      const { data: profile } = await this.getUserProfile(userId);
      
      const totalCalculations = profile?.saved_calculations?.length || 0;
      const favoriteTools = profile?.preferences?.favorite_tools || [];
      const recentActivity = profile?.saved_calculations?.slice(0, 5) || [];
      
      // Calculate profile completeness
      let completeness = 0;
      if (profile?.display_name) completeness += 10;
      if (profile?.location_preferences?.current_province) completeness += 20;
      if (profile?.financial_profile?.annual_income) completeness += 30;
      if (profile?.financial_profile?.current_savings) completeness += 20;
      if (profile?.preferences?.notifications) completeness += 20;

      return {
        totalCalculations,
        favoriteTools,
        recentActivity,
        profileCompleteness: Math.min(completeness, 100)
      };
    } catch (error) {
      console.error('Error getting user statistics:', error);
      return {
        totalCalculations: 0,
        favoriteTools: [],
        recentActivity: [],
        profileCompleteness: 0
      };
    }
  }
}