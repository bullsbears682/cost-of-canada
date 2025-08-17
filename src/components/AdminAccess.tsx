import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AdminAccessProps {
  onAccessGranted: () => void;
}

const AdminAccess: React.FC<AdminAccessProps> = ({ onAccessGranted }) => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useAuth();

  // Admin access codes (you can change these)
  const ADMIN_CODES = ['admin2024', 'maplemetrics', 'canada2024'];
  
  const handleAdminAccess = () => {
    if (ADMIN_CODES.includes(adminCode.toLowerCase())) {
      onAccessGranted();
      // Redirect to admin dashboard
      window.location.href = '/admin-dashboard';
    } else {
      alert('Invalid admin code');
    }
  };

  const handleSecretTap = () => {
    // Secret way to access admin panel (tap 5 times quickly)
    setShowAdminPanel(true);
  };

  // Only show for specific admin emails
  const isPotentialAdmin = user?.email === 'admin@maplemetrics.com' || 
                          user?.email?.includes('admin') ||
                          user?.user_metadata?.role === 'admin';

  if (!isPotentialAdmin) {
    return null; // Don't show anything for regular users
  }

  return (
    <>
      {/* Hidden admin trigger - tap 5 times on the logo */}
      <div 
        className="fixed top-4 left-4 z-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
        onClick={handleSecretTap}
        title="Admin Access"
      >
        <Shield className="h-6 w-6 text-gray-400" />
      </div>

      {/* Admin Access Modal */}
      {showAdminPanel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 mx-auto text-blue-500 mb-4" />
              <CardTitle>Admin Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin code"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  onClick={handleAdminAccess}
                  className="flex-1"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Access Admin
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowAdminPanel(false)}
                >
                  Cancel
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 text-center">
                Admin access is restricted to authorized personnel only.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default AdminAccess;