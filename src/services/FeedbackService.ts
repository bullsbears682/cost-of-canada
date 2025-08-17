import { supabase } from "@/integrations/supabase/client";

export interface FeedbackData {
  rating: number;
  category?: string;
  message: string;
  email?: string;
}

export interface FeedbackRecord extends FeedbackData {
  id: string;
  user_id?: string;
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export class FeedbackService {
  static async submitFeedback(data: FeedbackData): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: user } = await supabase.auth.getUser();
      
      const feedbackData = {
        user_id: user?.user?.id || null,
        email: data.email || user?.user?.email || null,
        rating: data.rating,
        category: data.category,
        message: data.message,
        status: 'new' as const
      };

      const { error } = await supabase
        .from('feedback')
        .insert([feedbackData]);

      if (error) {
        console.error('Error submitting feedback:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Unexpected error submitting feedback:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  static async getFeedbackForUser(): Promise<{ data: FeedbackRecord[] | null; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching feedback:', error);
        return { data: null, error: error.message };
      }

      return { data };
    } catch (error) {
      console.error('Unexpected error fetching feedback:', error);
      return { data: null, error: 'An unexpected error occurred' };
    }
  }

  static async getAllFeedback(): Promise<{ data: FeedbackRecord[] | null; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select(`
          *,
          profiles:user_id (
            display_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching all feedback:', error);
        return { data: null, error: error.message };
      }

      return { data };
    } catch (error) {
      console.error('Unexpected error fetching all feedback:', error);
      return { data: null, error: 'An unexpected error occurred' };
    }
  }

  static async updateFeedbackStatus(
    id: string, 
    status: 'new' | 'in_progress' | 'resolved' | 'closed',
    adminNotes?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const updateData: any = { status };
      if (adminNotes !== undefined) {
        updateData.admin_notes = adminNotes;
      }

      const { error } = await supabase
        .from('feedback')
        .update(updateData)
        .eq('id', id);

      if (error) {
        console.error('Error updating feedback:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Unexpected error updating feedback:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }
}