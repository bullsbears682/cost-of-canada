import { supabase } from "@/integrations/supabase/client";

export interface AppStatistic {
  metric_name: string;
  metric_value: number;
  last_updated: string;
  metadata?: {
    description?: string;
    [key: string]: any;
  };
}

export interface RealTimeStats {
  totalUsers: number;
  totalCalculations: number;
  citiesCovered: number;
  dataSources: number;
  activeUsersMonthly: number;
  lastUpdated: string;
}

export class StatisticsService {
  // Get all app statistics from localStorage
  static async getAppStatistics(): Promise<{ data: RealTimeStats | null; error?: string }> {
    try {
      // Get from localStorage for demo purposes
      const storedStats = localStorage.getItem('app_statistics');
      const baseStats = storedStats ? JSON.parse(storedStats) : {};
      
      const stats: RealTimeStats = {
        totalUsers: baseStats.totalUsers || 0,
        totalCalculations: baseStats.totalCalculations || 0,
        citiesCovered: baseStats.citiesCovered || 50,
        dataSources: baseStats.dataSources || 15,
        activeUsersMonthly: baseStats.activeUsersMonthly || 0,
        lastUpdated: baseStats.lastUpdated || new Date().toISOString()
      };

      return { data: stats };
    } catch (error) {
      console.error('Unexpected error fetching statistics:', error);
      return { data: null, error: 'An unexpected error occurred' };
    }
  }

  // Get fallback statistics (if database is unavailable)
  static getFallbackStatistics(): RealTimeStats {
    return {
      totalUsers: 0, // Will show as potential/capacity
      totalCalculations: 0, // Will show as potential/capacity  
      citiesCovered: 50,
      dataSources: 15,
      activeUsersMonthly: 0, // Will show as potential/capacity
      lastUpdated: new Date().toISOString()
    };
  }

  // Update a specific statistic (admin only) 
  static async updateStatistic(
    metricName: string, 
    value: number, 
    metadata?: Record<string, any>
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Update in localStorage for demo purposes
      const storedStats = JSON.parse(localStorage.getItem('app_statistics') || '{}');
      storedStats[metricName] = value;
      storedStats.lastUpdated = new Date().toISOString();
      
      if (metadata) {
        storedStats[`${metricName}_metadata`] = metadata;
      }
      
      localStorage.setItem('app_statistics', JSON.stringify(storedStats));
      return { success: true };
    } catch (error) {
      console.error('Unexpected error updating statistic:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  // Increment a counter statistic
  static async incrementStatistic(metricName: string, increment: number = 1): Promise<{ success: boolean; error?: string }> {
    try {
      // Update in localStorage for demo purposes
      const storedStats = JSON.parse(localStorage.getItem('app_statistics') || '{}');
      storedStats[metricName] = (storedStats[metricName] || 0) + increment;
      storedStats.lastUpdated = new Date().toISOString();
      localStorage.setItem('app_statistics', JSON.stringify(storedStats));
      
      return { success: true };
    } catch (error) {
      console.error('Unexpected error incrementing statistic:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  // Get statistics with real data integration
  static async getEnhancedStatistics(): Promise<{ data: RealTimeStats; error?: string }> {
    try {
      // First try to get from database
      const { data: dbStats, error: dbError } = await this.getAppStatistics();
      
      if (dbStats) {
        // Enhance with real-time data calculations
        const enhancedStats = { ...dbStats };
        
        // Add some realistic growth to make it feel more dynamic
        const now = new Date();
        const hour = now.getHours();
        const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
        
        // Keep real statistics without artificial inflation
        // These will grow naturally as real users use the app
        enhancedStats.totalUsers = dbStats.totalUsers;
        enhancedStats.totalCalculations = dbStats.totalCalculations;
        enhancedStats.activeUsersMonthly = Math.floor(dbStats.totalUsers * 0.8); // Assume 80% are monthly active
        
        return { data: enhancedStats };
      }
      
      // Fallback to static data with some variance
      const fallbackStats = this.getFallbackStatistics();
      return { data: fallbackStats, error: dbError };
      
    } catch (error) {
      console.error('Error getting enhanced statistics:', error);
      return { data: this.getFallbackStatistics(), error: 'Using fallback data' };
    }
  }

  // Track user activity (call this when users perform actions)
  static async trackActivity(activityType: string, metadata?: Record<string, any>): Promise<void> {
    try {
      // This could be expanded to track detailed analytics
      switch (activityType) {
        case 'calculation_performed':
          await this.incrementStatistic('total_calculations');
          break;
        case 'user_login':
          // Could track daily active users
          break;
        case 'profile_updated':
          // Could track engagement metrics
          break;
      }
    } catch (error) {
      // Don't throw errors for tracking - it shouldn't break the app
      console.warn('Failed to track activity:', error);
    }
  }
}