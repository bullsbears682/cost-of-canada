import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BarChart3, 
  Settings, 
  Shield, 
  Activity, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Home,
  Calculator,
  Gift,
  Zap,
  MapPin,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  RefreshCw,
  Lock,
  Unlock
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { StatisticsService } from '@/services/StatisticsService';
import { UserProfileService } from '@/services/UserProfileService';

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalCalculations: number;
  avgHousingAffordability: number;
  topCities: Array<{ name: string; affordability: number }>;
}

interface UserData {
  id: string;
  email: string;
  created_at: string;
  last_sign_in: string;
  calculations_count: number;
  is_active: boolean;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Check if user is admin (you can implement your own admin check)
  const isAdmin = user?.email === 'admin@maplemetrics.com' || user?.user_metadata?.role === 'admin';

  useEffect(() => {
    if (isAdmin) {
      loadAdminData();
    }
  }, [isAdmin]);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      // Load statistics
      const statsData = await StatisticsService.getEnhancedStatistics();
      setStats(statsData.data);

      // Load user data (mock data for now)
      setUsers([
        {
          id: '1',
          email: 'user1@example.com',
          created_at: '2024-01-15',
          last_sign_in: '2024-08-17',
          calculations_count: 15,
          is_active: true
        },
        {
          id: '2',
          email: 'user2@example.com',
          created_at: '2024-02-20',
          last_sign_in: '2024-08-16',
          calculations_count: 8,
          is_active: true
        },
        {
          id: '3',
          email: 'user3@example.com',
          created_at: '2024-03-10',
          last_sign_in: '2024-08-10',
          calculations_count: 3,
          is_active: false
        }
      ]);
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (userId: string, action: 'activate' | 'deactivate' | 'delete') => {
    try {
      // Implement user management actions
      console.log(`${action} user ${userId}`);
      await loadAdminData(); // Refresh data
    } catch (error) {
      console.error(`Failed to ${action} user:`, error);
    }
  };

  const exportData = async (type: 'users' | 'stats' | 'calculations') => {
    try {
      // Implement data export
      console.log(`Exporting ${type} data`);
    } catch (error) {
      console.error('Failed to export data:', error);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 mx-auto text-red-500 mb-4" />
            <CardTitle className="text-xl">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              You don't have permission to access the admin dashboard.
            </p>
            <Button onClick={() => window.history.back()}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 mx-auto animate-spin text-blue-500 mb-4" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">MapleMetrics Administration</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-600 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Admin
              </Badge>
              <Button variant="outline" size="sm" onClick={loadAdminData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalUsers?.toLocaleString() || '15,420'}</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.activeUsers?.toLocaleString() || '2,847'}</div>
                  <p className="text-xs text-muted-foreground">
                    +8% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Calculations</CardTitle>
                  <Calculator className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalCalculations?.toLocaleString() || '4,521'}</div>
                  <p className="text-xs text-muted-foreground">
                    +15% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Affordability</CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.avgHousingAffordability?.toFixed(1) || '42.8'}%</div>
                  <p className="text-xs text-muted-foreground">
                    -2% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <Download className="h-6 w-6" />
                    <span className="text-sm">Export Data</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <Upload className="h-6 w-6" />
                    <span className="text-sm">Import Data</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <Settings className="h-6 w-6" />
                    <span className="text-sm">System Settings</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <Shield className="h-6 w-6" />
                    <span className="text-sm">Security</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>User Management</CardTitle>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users
                    .filter(user => 
                      user.email.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-medium">{user.email}</p>
                            <p className="text-sm text-gray-500">
                              Joined: {new Date(user.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={user.is_active ? "default" : "secondary"}>
                            {user.is_active ? "Active" : "Inactive"}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {user.calculations_count} calculations
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUserAction(user.id, user.is_active ? 'deactivate' : 'activate')}
                          >
                            {user.is_active ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUserAction(user.id, 'delete')}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Usage Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-4">Most Used Features</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Housing Analysis</span>
                        <Badge>45%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Market Dashboard</span>
                        <Badge>32%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Retirement Planning</span>
                        <Badge>18%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Salary Calculator</span>
                        <Badge>5%</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-4">Top Cities</h3>
                    <div className="space-y-3">
                      {stats?.topCities?.slice(0, 5).map((city, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm">{city.name}</span>
                          <Badge variant="outline">{city.affordability}%</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="maintenance">Maintenance Mode</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button variant="outline" size="sm">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Enable
                        </Button>
                        <span className="text-sm text-gray-500">Currently disabled</span>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="notifications">Admin Notifications</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button variant="outline" size="sm">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Enabled
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="backup">Auto Backup</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button variant="outline" size="sm">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Enabled
                        </Button>
                        <span className="text-sm text-gray-500">Daily at 2 AM</span>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="updates">Auto Updates</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button variant="outline" size="sm">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Enabled
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;