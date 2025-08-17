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
              <Button variant="ghost" size="sm" className="p-2 hover-scale">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm bg-gradient-to-br from-background to-muted/20">
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
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2 px-2">Tools</h3>
                      <div className="space-y-2">
                        {menuItems.map((item, index) => {
                          const Icon = item.icon;
                          const isActive = location.pathname === item.path || (item.path === "/" && isHomePage);
                          return (
                            <div
                              key={item.id}
                              className={`rounded-lg p-3 transition-all duration-300 animate-fade-in hover-scale cursor-pointer ${
                                isActive 
                                  ? 'bg-gradient-primary text-white shadow-lg scale-105' 
                                  : 'hover:bg-accent hover:text-accent-foreground hover:translate-x-1 hover:shadow-md'
                              }`}
                              style={{ animationDelay: `${index * 0.05}s` }}
                              onClick={() => {
                                window.location.href = item.path;
                                setIsOpen(false);
                              }}
                            >
                              <div className="flex items-start gap-3">
                                <Icon className={`h-5 w-5 mt-0.5 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'} flex-shrink-0`} />
                                <div className="flex-1 min-w-0">
                                  <div className={`font-medium ${isActive ? 'text-white' : 'text-foreground'}`}>
                                    {item.label}
                                  </div>
                                  <div className={`text-xs mt-0.5 ${isActive ? 'text-white/80' : 'text-muted-foreground'}`}>
                                    {item.description}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-3 px-2 flex items-center gap-2">
                        <HelpCircle className="h-4 w-4" />
                        Support & Info
                      </h3>
                      <div className="space-y-2">
                        {supportItems.map((item, index) => {
                          const Icon = item.icon;
                          const isActive = location.pathname === item.path;
                          const isPriority = item.priority;
                          return (
                            <div
                              key={item.id}
                              className={`rounded-lg p-3 transition-all duration-300 animate-fade-in hover-scale cursor-pointer ${
                                isActive 
                                  ? 'bg-accent text-accent-foreground shadow-md scale-105' 
                                  : isPriority
                                  ? 'hover:bg-primary/10 hover:text-primary hover:translate-x-1 hover:shadow-md border border-primary/20'
                                  : 'hover:bg-accent/30 hover:text-accent-foreground hover:translate-x-1 hover:shadow-sm'
                              }`}
                              style={{ animationDelay: `${(menuItems.length + index) * 0.05}s` }}
                              onClick={() => {
                                window.location.href = item.path;
                                setIsOpen(false);
                              }}
                            >
                              <div className="flex items-start gap-3">
                                <Icon className={`h-4 w-4 mt-0.5 transition-transform duration-200 flex-shrink-0 ${
                                  isActive ? 'scale-110 text-accent-foreground' : 
                                  isPriority ? 'text-primary scale-105' : 'text-muted-foreground group-hover:scale-105'
                                }`} />
                                <div className="flex-1 min-w-0">
                                  <div className={`font-medium text-sm ${
                                    isActive ? 'text-accent-foreground' : 
                                    isPriority ? 'text-primary font-semibold' : 'text-foreground'
                                  }`}>
                                    {item.label}
                                    {isPriority && <span className="ml-1 text-xs text-primary">•</span>}
                                  </div>
                                  <div className={`text-xs mt-0.5 ${
                                    isActive ? 'text-accent-foreground/70' : 
                                    isPriority ? 'text-primary/80' : 'text-muted-foreground'
                                  }`}>
                                    {item.description}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
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