import React from 'react';
import { Button } from '@/components/ui/button';
import { Crown, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import logo from "/lovable-uploads/2db9d8af-7acb-4523-b08a-e7f36f84d542.png";

const PageHeader = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="MapleMetrics" className="h-8 w-8 object-contain" />
            <span className="font-bold text-xl text-foreground">MapleMetrics</span>
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.email}</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/auth">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link to="/auth">
                  <Button size="sm">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;