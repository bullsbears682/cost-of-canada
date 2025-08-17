import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileHeader from './MobileHeader';
import MobileBottomNavigation from './MobileBottomNavigation';

interface MobileLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  setActiveSection: (section: string) => void;
  showBottomNav?: boolean;
  showHeader?: boolean;
  className?: string;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  activeSection,
  setActiveSection,
  showBottomNav = true,
  showHeader = true,
  className
}) => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {showHeader && (
        <MobileHeader 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      )}
      
      <main className={cn(
        "flex-1 overflow-x-hidden",
        showHeader && "pt-16", // Account for fixed header
        showBottomNav && "pb-20", // Account for fixed bottom nav
        className
      )}>
        <div className="px-4 py-6 space-y-6 max-w-screen-lg mx-auto">
          {children}
        </div>
      </main>

      {showBottomNav && (
        <MobileBottomNavigation
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      )}
    </div>
  );
};

export default MobileLayout;