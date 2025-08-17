import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User, LogOut, Home, Calculator, BarChart3, MapPin, TrendingUp, Gift, DollarSign, PiggyBank, Zap, ArrowLeft } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import logo from "/lovable-uploads/2db9d8af-7acb-4523-b08a-e7f36f84d542.png";

interface MobileHeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const menuItems = [
    { id: "market-dashboard", label: "Market Dashboard", icon: BarChart3, path: "/market-dashboard" },
    { id: "housing-analyzer", label: "Housing Analysis", icon: Home, path: "/housing-analyzer" },
    { id: "retirement-planner", label: "Retirement Planning", icon: PiggyBank, path: "/retirement-planner" },
    { id: "salary-calculator", label: "Salary Calculator", icon: DollarSign, path: "/salary-calculator" },
    { id: "benefits-finder", label: "Benefits Finder", icon: Gift, path: "/benefits-finder" },
    { id: "utility-optimizer", label: "Utility Optimizer", icon: Zap, path: "#" },
    { id: "comparison", label: "City Comparison", icon: MapPin, path: "#" },
    { id: "regional", label: "Regional Overview", icon: TrendingUp, path: "#" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {!isHomePage && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-accent"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <img src={logo} alt="MapleMetrics" className="h-8 w-8 object-contain animate-fade-in" />
          <span className="font-bold text-lg text-foreground">MapleMetrics</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2 hover-scale">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-gradient-to-br from-background to-muted/20">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 pb-6 border-b animate-fade-in">
                  <img src={logo} alt="MapleMetrics" className="h-10 w-10 object-contain" />
                  <div>
                    <h2 className="font-bold text-lg">MapleMetrics</h2>
                    <p className="text-sm text-muted-foreground">Canadian Cost Analysis</p>
                  </div>
                </div>

                {user ? (
                  <div className="py-4 border-b">
                    <div className="flex items-center gap-3 mb-3 animate-fade-in">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user.email}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={signOut}
                      className="w-full flex items-center gap-2 hover-scale transition-all duration-200"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="py-4 border-b space-y-2 animate-fade-in">
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full hover-scale">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button size="sm" className="w-full hover-scale">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}

                <nav className="flex-1 py-6">
                  <div className="space-y-2">
                    {menuItems.map((item, index) => {
                      const Icon = item.icon;
                      const isActive = activeSection === item.id;
                      return (
                        <Button
                          key={item.id}
                          variant={isActive ? "default" : "ghost"}
                          className={`w-full justify-start text-left h-12 transition-all duration-300 animate-fade-in hover-scale ${
                            isActive 
                              ? 'bg-gradient-primary text-white shadow-lg scale-105' 
                              : 'hover:bg-accent hover:text-accent-foreground hover:translate-x-2 hover:shadow-md'
                          }`}
                          style={{ animationDelay: `${index * 0.05}s` }}
                          onClick={() => {
                            if (item.path && item.path !== "#") {
                              window.location.href = item.path;
                            } else {
                              setActiveSection(item.id);
                            }
                            setIsOpen(false);
                          }}
                        >
                          <Icon className={`h-5 w-5 mr-3 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
                          {item.label}
                        </Button>
                      );
                    })}
                  </div>
                </nav>

                <div className="border-t pt-4 mt-auto">
                  <div className="text-center text-xs text-muted-foreground animate-fade-in">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-canada-red rounded-full animate-pulse"></div>
                      <span>Built for Canadians</span>
                    </div>
                    <p>© 2025 MapleMetrics</p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;