import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatisticsService, RealTimeStats } from '@/services/StatisticsService';
import { FeedbackService, FeedbackRecord } from '@/services/FeedbackService';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { BarChart3, Users, Calculator, MessageSquare, Settings } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<RealTimeStats | null>(null);
  const [feedback, setFeedback] = useState<FeedbackRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Admin check - only allow specific email
  const isAdmin = user?.email === 'support@maplemetrics.site';

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsResult, feedbackResult] = await Promise.all([
          StatisticsService.getEnhancedStatistics(),
          FeedbackService.getAllFeedback()
        ]);

        if (statsResult.data) {
          setStats(statsResult.data);
        }

        if (feedbackResult.data) {
          setFeedback(feedbackResult.data);
        }
      } catch (error) {
        console.error('Error loading admin data:', error);
        toast.error('Error loading dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  const handleUpdateStatistic = async (metric: string, value: number) => {
    try {
      await StatisticsService.updateStatistic(metric, value);
      const { data: updatedStats } = await StatisticsService.getEnhancedStatistics();
      if (updatedStats) {
        setStats(updatedStats);
      }
      toast.success('Statistic updated successfully');
    } catch (error) {
      toast.error('Error updating statistic');
    }
  };

  const handleUpdateFeedbackStatus = async (id: string, status: string, notes?: string) => {
    try {
      await FeedbackService.updateFeedbackStatus(id, status as any, notes);
      const { data: updatedFeedback } = await FeedbackService.getAllFeedback();
      if (updatedFeedback) {
        setFeedback(updatedFeedback);
      }
      toast.success('Feedback status updated');
    } catch (error) {
      toast.error('Error updating feedback status');
    }
  };

  // Redirect non-admins
  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading admin dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage MapleMetrics application</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
                <p className="text-xs text-muted-foreground">
                  +{stats?.activeUsersMonthly || 0} monthly active
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Calculations</CardTitle>
                <Calculator className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalCalculations || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Total calculations performed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cities Covered</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.citiesCovered || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Across Canada
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Feedback Items</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{feedback.length}</div>
                <p className="text-xs text-muted-foreground">
                  {feedback.filter(f => f.status === 'new').length} new items
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedback.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={item.status === 'new' ? 'default' : 'secondary'}>
                          {item.status}
                        </Badge>
                        <span className="text-sm font-medium">Rating: {item.rating}/5</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Update Statistics</CardTitle>
              <CardDescription>Manually update application statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="totalUsers">Total Users</Label>
                  <div className="flex gap-2">
                    <Input
                      id="totalUsers"
                      type="number"
                      placeholder={String(stats?.totalUsers || 0)}
                      onBlur={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          handleUpdateStatistic('totalUsers', value);
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalCalculations">Total Calculations</Label>
                  <div className="flex gap-2">
                    <Input
                      id="totalCalculations"
                      type="number"
                      placeholder={String(stats?.totalCalculations || 0)}
                      onBlur={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          handleUpdateStatistic('totalCalculations', value);
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="citiesCovered">Cities Covered</Label>
                  <div className="flex gap-2">
                    <Input
                      id="citiesCovered"
                      type="number"
                      placeholder={String(stats?.citiesCovered || 0)}
                      onBlur={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          handleUpdateStatistic('citiesCovered', value);
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataSources">Data Sources</Label>
                  <div className="flex gap-2">
                    <Input
                      id="dataSources"
                      type="number"
                      placeholder={String(stats?.dataSources || 0)}
                      onBlur={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          handleUpdateStatistic('dataSources', value);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Manage Feedback</CardTitle>
              <CardDescription>Review and respond to user feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedback.map((item) => (
                  <Card key={item.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant={item.status === 'new' ? 'default' : 'secondary'}>
                            {item.status}
                          </Badge>
                          <span className="text-sm font-medium">Rating: {item.rating}/5</span>
                          {item.category && (
                            <Badge variant="outline">{item.category}</Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(item.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm">{item.message}</p>
                      {item.email && (
                        <p className="text-xs text-muted-foreground">Contact: {item.email}</p>
                      )}
                      
                      <div className="flex items-center gap-2">
                        <Select
                          value={item.status}
                          onValueChange={(status) => handleUpdateFeedbackStatus(item.id, status)}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        {item.admin_notes && (
                          <p className="text-xs text-muted-foreground flex-1">
                            Notes: {item.admin_notes}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Settings</CardTitle>
              <CardDescription>Configure application-wide settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>Last updated: {stats?.lastUpdated ? new Date(stats.lastUpdated).toLocaleString() : 'Never'}</p>
                <p>Admin user: {user?.email}</p>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Quick Actions</h4>
                <div className="grid gap-2 md:grid-cols-2">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      localStorage.clear();
                      toast.success('Local storage cleared');
                    }}
                  >
                    Clear Local Storage
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      const data = {
                        stats,
                        feedback,
                        timestamp: new Date().toISOString()
                      };
                      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `maplemetrics-export-${new Date().toISOString().split('T')[0]}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                      toast.success('Data exported');
                    }}
                  >
                    Export Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;