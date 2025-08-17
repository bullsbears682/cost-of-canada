import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, BarChart3, Calculator, PiggyBank, DollarSign, Gift, HelpCircle } from 'lucide-react';

interface TabItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  badge?: number;
}

const BottomTabNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs: TabItem[] = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'market', label: 'Market', icon: BarChart3, path: '/market-dashboard' },
    { id: 'housing', label: 'Housing', icon: Calculator, path: '/housing-analyzer' },
    { id: 'retirement', label: 'Retirement', icon: PiggyBank, path: '/retirement-planner' },
    { id: 'more', label: 'More', icon: HelpCircle, path: '/more' },
  ];

  const handleTabClick = (tab: TabItem) => {
    if (tab.id === 'more') {
      // Handle "More" tab - could open a modal or navigate to more options
      // For now, let's navigate to FAQ
      navigate('/faq');
    } else {
      navigate(tab.path);
    }
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Spacer to prevent content from being hidden behind fixed bottom nav */}
      <div className="h-20 md:hidden" />
      
      {/* Bottom Tab Navigation - Only show on mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-md border-t border-border">
        <div className="safe-bottom">
          <div className="flex items-center justify-around px-2 py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = isActive(tab.path) || (tab.id === 'more' && ['/faq', '/contact', '/about'].includes(location.pathname));
              
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab)}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-0 flex-1 relative ${
                    active
                      ? 'text-primary bg-primary/10 scale-105'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  {/* Badge for notifications */}
                  {tab.badge && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {tab.badge > 99 ? '99+' : tab.badge}
                    </div>
                  )}
                  
                  <Icon className={`h-5 w-5 mb-1 transition-transform duration-200 ${
                    active ? 'scale-110' : 'group-hover:scale-105'
                  }`} />
                  
                  <span className={`text-xs font-medium truncate w-full text-center ${
                    active ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {tab.label}
                  </span>
                  
                  {/* Active indicator */}
                  {active && (
                    <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomTabNavigation;