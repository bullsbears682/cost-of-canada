import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import UserProfileButton from '@/components/UserProfileButton';
import { 
  DollarSign, 
  Gift, 
  HelpCircle, 
  Mail, 
  Info, 
  FileText, 
  LogOut, 
  User,
  Settings,
  Shield,
  MessageSquare
} from 'lucide-react';

const More: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const tools = [
    { id: 'salary', label: 'Salary Calculator', icon: DollarSign, path: '/salary-calculator', description: 'Calculate required income by city' },
    { id: 'benefits', label: 'Benefits Finder', icon: Gift, path: '/benefits-finder', description: 'Find government programs' },
  ];

  const support = [
    { id: 'faq', label: 'FAQ', icon: HelpCircle, path: '/faq', description: 'Frequently asked questions' },
    { id: 'contact', label: 'Contact Us', icon: Mail, path: '/contact', description: 'Get help and support' },
    { id: 'about', label: 'About', icon: Info, path: '/about', description: 'Learn about MapleMetrics' },
  ];

  const legal = [
    { id: 'privacy', label: 'Privacy Policy', icon: Shield, path: '/privacy', description: 'How we protect your data' },
    { id: 'terms', label: 'Terms of Service', icon: FileText, path: '/terms', description: 'Terms and conditions' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground">More</h1>
          <p className="text-sm text-muted-foreground">Additional tools and information</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* User Section */}
        {user ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{user.email}</p>
                  <p className="text-sm text-muted-foreground">Signed in</p>
                </div>
                <UserProfileButton />
              </div>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={signOut}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <User className="h-12 w-12 mx-auto text-muted-foreground" />
                <div>
                  <h3 className="font-semibold">Sign in to save your progress</h3>
                  <p className="text-sm text-muted-foreground">Access your saved calculations and preferences</p>
                </div>
                <Button onClick={() => navigate('/auth')} className="w-full">
                  Sign In
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Additional Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              More Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => handleNavigation(tool.path)}
                  className="w-full p-3 rounded-lg hover:bg-accent transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground">{tool.label}</div>
                      <div className="text-xs text-muted-foreground">{tool.description}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {support.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className="w-full p-3 rounded-lg hover:bg-accent transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Legal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Legal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {legal.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className="w-full p-3 rounded-lg hover:bg-accent transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* App Info */}
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-sm text-muted-foreground space-y-1">
              <p>MapleMetrics v1.0.0</p>
              <p>© 2025 MapleMetrics</p>
              <p>Built for Canadians 🇨🇦</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default More;