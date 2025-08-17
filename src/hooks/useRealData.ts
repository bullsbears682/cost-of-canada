import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface RealDataState {
  demographics: any;
  housing: any;
  economic: any;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

export const useRealData = (dataType: 'demographics' | 'housing' | 'economic' | 'all' = 'all') => {
  const [state, setState] = useState<RealDataState>({
    demographics: null,
    housing: null,
    economic: null,
    loading: true,
    error: null,
    lastUpdated: null
  });

  const fetchData = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const { data, error } = await supabase.functions.invoke('fetch-real-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type: dataType })
      });

      if (error) {
        throw new Error(error.message);
      }

      if (dataType === 'all') {
        setState(prev => ({
          ...prev,
          demographics: data.demographics,
          housing: data.housing,
          economic: data.economic,
          loading: false,
          lastUpdated: data.metadata?.fetchedAt || new Date().toISOString()
        }));
      } else {
        setState(prev => ({
          ...prev,
          [dataType]: data,
          loading: false,
          lastUpdated: data.lastUpdated || new Date().toISOString()
        }));
      }
    } catch (error) {
      console.error('Error fetching real data:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch real data'
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [dataType]);

  const refetch = () => {
    fetchData();
  };

  return {
    ...state,
    refetch
  };
};