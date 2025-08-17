import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, BarChart3, Calculator, PiggyBank, Gift, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface MobileBottomNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const MobileBottomNavigation: React.FC<MobileBottomNavigationProps> = ({ 
  activeSection, 
  setActiveSection 
}) => {
  const location = useLocation();
  
  const navItems = [
    { 
      id: "home", 
      label: "Home", 
      icon: Home, 
      path: "/",
      isActive: location.pathname === '/'
    },
    { 
      id: "market-dashboard", 
      label: "Market", 
      icon: BarChart3, 
      path: "/market-dashboard",
      isActive: location.pathname === '/market-dashboard'
    },
    { 
      id: "housing-analyzer", 
      label: "Housing", 
      icon: Calculator, 
      path: "/housing-analyzer",
      isActive: location.pathname === '/housing-analyzer'
    },
    { 
      id: "retirement-planner", 
      label: "Retire", 
      icon: PiggyBank, 
      path: "/retirement-planner",
      isActive: location.pathname === '/retirement-planner'
    },
    { 
      id: "benefits-finder", 
      label: "Benefits", 
      icon: Gift, 
      path: "/benefits-finder",
      isActive: location.pathname === '/benefits-finder'
    },
  ];

  const handleNavClick = (itemId: string) => {
    setActiveSection(itemId);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border shadow-lg safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => handleNavClick(item.id)}
              className="flex-1"
            >
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "flex flex-col items-center justify-center gap-1 h-16 w-full rounded-xl transition-all duration-200 touch-manipulation",
                  "active:scale-95 active:bg-accent/50",
                  item.isActive 
                    ? "bg-primary/10 text-primary border-primary/20" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                )}
              >
                <Icon 
                  className={cn(
                    "transition-all duration-200",
                    item.isActive ? "h-6 w-6" : "h-5 w-5"
                  )} 
                />
                <span className={cn(
                  "text-xs font-medium transition-all duration-200",
                  item.isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  {item.label}
                </span>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNavigation;