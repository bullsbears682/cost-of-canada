import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { UserProfileService, UserProfile, SavedCalculation } from '@/services/UserProfileService';
import { User, Save, History, Settings, MapPin, DollarSign, Trash2, Star } from 'lucide-react';
import { format } from 'date-fns';

interface UserProfileButtonProps {
  onSaveCalculation?: (calculation: Omit<SavedCalculation, 'id' | 'created_at'>) => void;
  currentCalculation?: {
    type: 'housing' | 'retirement' | 'salary' | 'benefits' | 'cost_comparison';
    name: string;
    parameters: Record<string, any>;
    results: Record<string, any>;
  };
}

const UserProfileButton: React.FC<UserProfileButtonProps> = ({ onSaveCalculation, currentCalculation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [savedCalculations, setSavedCalculations] = useState<SavedCalculation[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Form states
  const [displayName, setDisplayName] = useState('');
  const [currentProvince, setCurrentProvince] = useState('');
  const [currentCity, setCurrentCity] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [householdSize, setHouseholdSize] = useState('');

  const { user } = useAuth();
  const { toast } = useToast();

  const provinces = [
    'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
    'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island',
    'Quebec', 'Saskatchewan', 'Yukon'
  ];

  useEffect(() => {
    if (user && isOpen) {
      loadUserProfile();
    }
  }, [user, isOpen]);

  const loadUserProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data: profileData } = await UserProfileService.getUserProfile(user.id);
      const { data: calculations } = await UserProfileService.getSavedCalculations(user.id);
      
      if (profileData) {
        setProfile(profileData);
        setDisplayName(profileData.display_name || '');
        setCurrentProvince(profileData.location_preferences?.current_province || '');
        setCurrentCity(profileData.location_preferences?.current_city || '');
        setAnnualIncome(profileData.financial_profile?.annual_income?.toString() || '');
        setCurrentSavings(profileData.financial_profile?.current_savings?.toString() || '');
        setHouseholdSize(profileData.financial_profile?.household_size?.toString() || '');
      }
      
      setSavedCalculations(calculations);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const updatedProfile: UserProfile = {
        ...profile,
        user_id: user.id,
        display_name: displayName,
        email: user.email,
        location_preferences: {
          current_province: currentProvince,
          current_city: currentCity,
        },
        financial_profile: {
          annual_income: annualIncome ? parseFloat(annualIncome) : undefined,
          current_savings: currentSavings ? parseFloat(currentSavings) : undefined,
          household_size: householdSize ? parseInt(householdSize) : undefined,
        },
        updated_at: new Date().toISOString()
      };

      const result = await UserProfileService.upsertUserProfile(updatedProfile);
      
      if (result.success) {
        toast({
          title: "Profile Updated",
          description: "Your profile has been saved successfully.",
        });
        setProfile(updatedProfile);
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to save profile.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCurrentCalculation = async () => {
    if (!user || !currentCalculation) return;
    
    const calculationName = `${currentCalculation.name} - ${format(new Date(), 'MMM dd, yyyy')}`;
    
    const result = await UserProfileService.saveCalculation(user.id, {
      ...currentCalculation,
      name: calculationName,
    });

    if (result.success) {
      toast({
        title: "Calculation Saved",
        description: "Your calculation has been saved to your profile.",
      });
      loadUserProfile(); // Refresh the saved calculations
      if (onSaveCalculation) {
        onSaveCalculation({
          ...currentCalculation,
          name: calculationName,
        });
      }
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to save calculation.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCalculation = async (calculationId: string) => {
    if (!user) return;
    
    const result = await UserProfileService.deleteCalculation(user.id, calculationId);
    
    if (result.success) {
      toast({
        title: "Calculation Deleted",
        description: "The calculation has been removed from your profile.",
      });
      setSavedCalculations(prev => prev.filter(calc => calc.id !== calculationId));
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to delete calculation.",
        variant: "destructive",
      });
    }
  };



  const getCalculationTypeColor = (type: string) => {
    switch (type) {
      case 'housing': return 'bg-blue-100 text-blue-800';
      case 'retirement': return 'bg-green-100 text-green-800';
      case 'salary': return 'bg-purple-100 text-purple-800';
      case 'benefits': return 'bg-orange-100 text-orange-800';
      case 'cost_comparison': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <User className="h-4 w-4" />
          Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            User Profile
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="calculations">Saved Calculations ({savedCalculations.length})</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="currentProvince">Current Province</Label>
                  <Select value={currentProvince} onValueChange={setCurrentProvince}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map(province => (
                        <SelectItem key={province} value={province}>
                          {province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="currentCity">Current City</Label>
                  <Input
                    id="currentCity"
                    value={currentCity}
                    onChange={(e) => setCurrentCity(e.target.value)}
                    placeholder="Your city"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="annualIncome">Annual Income (CAD)</Label>
                  <Input
                    id="annualIncome"
                    type="number"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(e.target.value)}
                    placeholder="75000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="currentSavings">Current Savings (CAD)</Label>
                  <Input
                    id="currentSavings"
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(e.target.value)}
                    placeholder="25000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="householdSize">Household Size</Label>
                  <Select value={householdSize} onValueChange={setHouseholdSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(size => (
                        <SelectItem key={size} value={size.toString()}>
                          {size} {size === 1 ? 'person' : 'people'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 justify-end pt-4">
              {currentCalculation && (
                <Button onClick={handleSaveCurrentCalculation} variant="outline" className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Current Calculation
                </Button>
              )}
              <Button onClick={handleSaveProfile} disabled={loading} className="gap-2">
                <Save className="h-4 w-4" />
                {loading ? 'Saving...' : 'Save Profile'}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="calculations" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Your Saved Calculations</h3>
              {currentCalculation && (
                <Button onClick={handleSaveCurrentCalculation} size="sm" className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Current
                </Button>
              )}
            </div>
            
            {savedCalculations.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No saved calculations yet</h3>
                  <p className="text-muted-foreground">
                    Use any of our calculators and save your results to access them later.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {savedCalculations.map((calculation) => (
                  <Card key={calculation.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge className={getCalculationTypeColor(calculation.type)}>
                            {calculation.type.replace('_', ' ')}
                          </Badge>
                          <div>
                            <CardTitle className="text-base">{calculation.name}</CardTitle>
                            <CardDescription>
                              {format(new Date(calculation.created_at), 'MMM dd, yyyy • HH:mm')}
                            </CardDescription>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCalculation(calculation.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    {calculation.notes && (
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground">{calculation.notes}</p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Member Since</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(user.created_at || ''), 'MMMM yyyy')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Profile Completeness</p>
                    <p className="text-sm text-muted-foreground">
                      {profile ? 'Complete your profile to get personalized insights' : 'Loading...'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileButton;