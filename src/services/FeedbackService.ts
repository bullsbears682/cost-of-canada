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
      // For now, just log feedback since we don't have the feedback table
      console.log('Feedback submitted:', data);
      
      // You could store this in localStorage or send to an external service
      const feedbackData = {
        id: crypto.randomUUID(),
        user_id: null,
        email: data.email,
        rating: data.rating,
        category: data.category,
        message: data.message,
        status: 'new' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Store in localStorage for now
      const existingFeedback = JSON.parse(localStorage.getItem('app_feedback') || '[]');
      existingFeedback.push(feedbackData);
      localStorage.setItem('app_feedback', JSON.stringify(existingFeedback));

      return { success: true };
    } catch (error) {
      console.error('Unexpected error submitting feedback:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  static async getFeedbackForUser(): Promise<{ data: FeedbackRecord[] | null; error?: string }> {
    try {
      // Get from localStorage for now
      const feedbackData = JSON.parse(localStorage.getItem('app_feedback') || '[]') as FeedbackRecord[];
      return { data: feedbackData };
    } catch (error) {
      console.error('Unexpected error fetching feedback:', error);
      return { data: null, error: 'An unexpected error occurred' };
    }
  }

  static async getAllFeedback(): Promise<{ data: FeedbackRecord[] | null; error?: string }> {
    try {
      // Get from localStorage for now
      const feedbackData = JSON.parse(localStorage.getItem('app_feedback') || '[]') as FeedbackRecord[];
      return { data: feedbackData };
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
      // Update in localStorage
      const existingFeedback = JSON.parse(localStorage.getItem('app_feedback') || '[]') as FeedbackRecord[];
      const updatedFeedback = existingFeedback.map(item => {
        if (item.id === id) {
          return {
            ...item,
            status,
            admin_notes: adminNotes,
            updated_at: new Date().toISOString()
          };
        }
        return item;
      });
      localStorage.setItem('app_feedback', JSON.stringify(updatedFeedback));

      return { success: true };
    } catch (error) {
      console.error('Unexpected error updating feedback:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }
}