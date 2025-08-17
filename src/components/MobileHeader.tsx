import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User, LogOut, Home, Calculator, BarChart3, MapPin, TrendingUp, Gift, DollarSign, PiggyBank, Zap, ArrowLeft, HelpCircle, Mail, FileText, Info } from 'lucide-react';
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
    { id: "home", label: "Home", icon: Home, path: "/", description: "Main dashboard with all tools" },
    { id: "market-dashboard", label: "Market Dashboard", icon: BarChart3, path: "/market-dashboard", description: "Real-time housing & economic data" },
    { id: "housing-analyzer", label: "Housing Analysis", icon: Calculator, path: "/housing-analyzer", description: "Analyze buying vs renting costs" },
    { id: "retirement-planner", label: "Retirement Planning", icon: PiggyBank, path: "/retirement-planner", description: "Plan your financial future" },
    { id: "salary-calculator", label: "Salary Calculator", icon: DollarSign, path: "/salary-calculator", description: "Income needed by city" },
    { id: "benefits-finder", label: "Benefits Finder", icon: Gift, path: "/benefits-finder", description: "Discover government programs" },
  ];

  const supportItems = [
    { id: "faq", label: "FAQ", icon: HelpCircle, path: "/faq", description: "Get answers to common questions", priority: true },
    { id: "contact", label: "Contact Us", icon: Mail, path: "/contact", description: "Get help and support", priority: true },
    { id: "about", label: "About", icon: Info, path: "/about", description: "Learn about MapleMetrics", priority: false },
    { id: "privacy", label: "Privacy Policy", icon: FileText, path: "/privacy", description: "How we protect your data", priority: false },
    { id: "terms", label: "Terms of Service", icon: FileText, path: "/terms", description: "Terms and conditions", priority: false },
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
              <Button variant="ghost" size="sm" className="p-3 hover-scale relative">
                <div className="flex flex-col gap-1">
                  <div className="w-1 h-1 bg-foreground rounded-full"></div>
                  <div className="w-1 h-1 bg-foreground rounded-full"></div>
                  <div className="w-1 h-1 bg-foreground rounded-full"></div>
                </div>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[90vw] max-w-md bg-gradient-to-br from-background to-muted/20 p-0">
              <div className="flex flex-col h-full">
                {/* Enhanced Header */}
                <div className="bg-gradient-primary text-white p-6 animate-fade-in">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={logo} alt="MapleMetrics" className="h-12 w-12 object-contain" />
                    <div>
                      <h2 className="font-bold text-xl text-white">MapleMetrics</h2>
                      <p className="text-sm text-white/80">Canadian Cost Analysis</p>
                    </div>
                  </div>
                  
                  {user ? (
                    <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-white" />
                        <span className="text-sm text-white font-medium">Welcome back!</span>
                      </div>
                      <p className="text-xs text-white/80 truncate">{user.email}</p>
                    </div>
                  ) : (
                    <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                      <p className="text-sm text-white mb-2">Get personalized insights</p>
                      <Button 
                        size="sm" 
                        className="bg-white text-primary hover:bg-white/90 w-full"
                        onClick={() => {
                          navigate('/auth');
                          setIsOpen(false);
                        }}
                      >
                        Sign In
                      </Button>
                    </div>
                  )}
                </div>

                <nav className="flex-1 p-6">
                                      <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4 px-2 flex items-center gap-2">
                          <Calculator className="h-4 w-4" />
                          Financial Tools
                        </h3>
                        <div className="space-y-3">
                        {menuItems.map((item, index) => {
                          const Icon = item.icon;
                          const isActive = location.pathname === item.path || (item.path === "/" && isHomePage);
                                                      return (
                              <div
                                key={item.id}
                                className={`rounded-xl p-4 transition-all duration-300 animate-fade-in hover-scale cursor-pointer min-h-[60px] ${
                                  isActive 
                                    ? 'bg-gradient-primary text-white shadow-lg scale-105 border-2 border-white/20' 
                                    : 'bg-white/50 hover:bg-accent hover:text-accent-foreground hover:translate-x-1 hover:shadow-lg border border-border/50'
                                }`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                                onClick={() => {
                                  window.location.href = item.path;
                                  setIsOpen(false);
                                }}
                              >
                                <div className="flex items-center gap-4">
                                  <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-primary/10'}`}>
                                    <Icon className={`h-5 w-5 transition-transform duration-200 ${
                                      isActive ? 'text-white scale-110' : 'text-primary group-hover:scale-105'
                                    } flex-shrink-0`} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-foreground'}`}>
                                      {item.label}
                                    </div>
                                    <div className={`text-xs mt-1 ${isActive ? 'text-white/80' : 'text-muted-foreground'}`}>
                                      {item.description}
                                    </div>
                                  </div>
                                  {isActive && (
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                  )}
                                </div>
                              </div>
                            );
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-4 px-2 flex items-center gap-2">
                        <HelpCircle className="h-4 w-4" />
                        Support & Info
                      </h3>
                      <div className="space-y-3">
                        {supportItems.map((item, index) => {
                          const Icon = item.icon;
                          const isActive = location.pathname === item.path;
                          const isPriority = item.priority;
                          return (
                            <div
                              key={item.id}
                              className={`rounded-xl p-4 transition-all duration-300 animate-fade-in hover-scale cursor-pointer min-h-[60px] ${
                                isActive 
                                  ? 'bg-accent text-accent-foreground shadow-lg scale-105 border-2 border-primary/20' 
                                  : isPriority
                                  ? 'bg-primary/5 hover:bg-primary/10 hover:text-primary hover:translate-x-1 hover:shadow-lg border-2 border-primary/30'
                                  : 'bg-white/30 hover:bg-accent/50 hover:text-accent-foreground hover:translate-x-1 hover:shadow-md border border-border/50'
                              }`}
                              style={{ animationDelay: `${(menuItems.length + index) * 0.1}s` }}
                              onClick={() => {
                                window.location.href = item.path;
                                setIsOpen(false);
                              }}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-lg ${
                                  isActive ? 'bg-primary/20' : 
                                  isPriority ? 'bg-primary/20' : 'bg-muted/50'
                                }`}>
                                  <Icon className={`h-5 w-5 transition-transform duration-200 flex-shrink-0 ${
                                    isActive ? 'scale-110 text-accent-foreground' : 
                                    isPriority ? 'text-primary scale-105' : 'text-muted-foreground group-hover:scale-105'
                                  }`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className={`font-semibold text-sm ${
                                    isActive ? 'text-accent-foreground' : 
                                    isPriority ? 'text-primary' : 'text-foreground'
                                  }`}>
                                    {item.label}
                                    {isPriority && <span className="ml-2 text-xs bg-primary text-white px-2 py-0.5 rounded-full">Popular</span>}
                                  </div>
                                  <div className={`text-xs mt-1 ${
                                    isActive ? 'text-accent-foreground/70' : 
                                    isPriority ? 'text-primary/80' : 'text-muted-foreground'
                                  }`}>
                                    {item.description}
                                  </div>
                                </div>
                                {isActive && (
                                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </nav>

                <div className="border-t pt-4 mt-auto p-6">
                  {user && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        signOut();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-2 hover-scale transition-all duration-200 mb-4"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  )}
                  
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