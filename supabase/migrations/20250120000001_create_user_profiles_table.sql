-- Create user_profiles table for comprehensive user data
CREATE TABLE public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  email TEXT,
  location_preferences JSONB DEFAULT '{}',
  financial_profile JSONB DEFAULT '{}',
  saved_calculations JSONB DEFAULT '[]',
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can view their own profile
CREATE POLICY "Users can view their own profile" 
ON public.user_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can insert their own profile
CREATE POLICY "Users can insert their own profile" 
ON public.user_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile" 
ON public.user_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Admins can view all profiles (for support)
CREATE POLICY "Admins can view all profiles" 
ON public.user_profiles 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.is_admin = true
  )
);

-- Add trigger for timestamps
CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON public.user_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_user_profiles_user_id ON public.user_profiles(user_id);
CREATE INDEX idx_user_profiles_updated_at ON public.user_profiles(updated_at DESC);

-- Create app_statistics table for real-time stats
CREATE TABLE public.app_statistics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name TEXT NOT NULL UNIQUE,
  metric_value BIGINT NOT NULL DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'
);

-- Initialize key statistics with realistic starting values
INSERT INTO public.app_statistics (metric_name, metric_value, metadata) VALUES
('total_users', 1, '{"description": "Total registered users"}'),
('total_calculations', 0, '{"description": "Total calculations performed"}'),
('cities_covered', 50, '{"description": "Number of Canadian cities with data"}'),
('data_sources', 15, '{"description": "Number of official data sources"}'),
('active_users_monthly', 0, '{"description": "Monthly active users"}');

-- Create function to update statistics
CREATE OR REPLACE FUNCTION update_app_statistics()
RETURNS TRIGGER AS $$
BEGIN
  -- Update total users count
  UPDATE public.app_statistics 
  SET metric_value = (SELECT COUNT(*) FROM auth.users WHERE deleted_at IS NULL),
      last_updated = now()
  WHERE metric_name = 'total_users';
  
  -- Update total calculations count
  UPDATE public.app_statistics 
  SET metric_value = (
    SELECT COALESCE(SUM(jsonb_array_length(saved_calculations)), 0) 
    FROM public.user_profiles 
    WHERE saved_calculations IS NOT NULL
  ),
  last_updated = now()
  WHERE metric_name = 'total_calculations';
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update statistics
CREATE TRIGGER update_stats_on_user_change
  AFTER INSERT OR UPDATE OR DELETE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION update_app_statistics();

CREATE TRIGGER update_stats_on_profile_change
  AFTER INSERT OR UPDATE OR DELETE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_app_statistics();

-- Enable RLS on app_statistics
ALTER TABLE public.app_statistics ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read statistics
CREATE POLICY "Anyone can read app statistics" 
ON public.app_statistics 
FOR SELECT 
USING (true);

-- Only admins can update statistics
CREATE POLICY "Admins can update statistics" 
ON public.app_statistics 
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.is_admin = true
  )
);

-- Create function to get user profile with fallback
CREATE OR REPLACE FUNCTION get_or_create_user_profile(user_uuid UUID)
RETURNS public.user_profiles AS $$
DECLARE
  profile_record public.user_profiles;
BEGIN
  -- Try to get existing profile
  SELECT * INTO profile_record 
  FROM public.user_profiles 
  WHERE user_id = user_uuid;
  
  -- If no profile exists, create one
  IF NOT FOUND THEN
    INSERT INTO public.user_profiles (user_id, display_name, email)
    SELECT 
      user_uuid,
      (auth.users.raw_user_meta_data ->> 'display_name'),
      auth.users.email
    FROM auth.users 
    WHERE auth.users.id = user_uuid
    RETURNING * INTO profile_record;
  END IF;
  
  RETURN profile_record;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;