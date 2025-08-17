import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, User, LogOut, Crown, Home } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "/lovable-uploads/2db9d8af-7acb-4523-b08a-e7f36f84d542.png";

interface MobileHeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const MobileHeader = ({ activeSection, setActiveSection }: MobileHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  const navigationItems = [
    { id: "market-dashboard", label: "Market Dashboard", icon: Home },
    { id: "housing-analyzer", label: "Housing Analysis", icon: Home },
    { id: "salary-calculator", label: "Salary Calculator", icon: User },
    { id: "comparison", label: "City Comparison", icon: Home },
    { id: "benefits-finder", label: "Benefits Finder", icon: Home },
  ];

  const handleNavigation = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border safe-top">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={logo} alt="MapleMetrics" className="h-8 w-8 object-contain" />
          <span className="font-bold text-lg text-foreground">MapleMetrics</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 pb-6 border-b">
                  <img src={logo} alt="MapleMetrics" className="h-10 w-10 object-contain" />
                  <div>
                    <h2 className="font-bold text-lg">MapleMetrics</h2>
                    <p className="text-sm text-muted-foreground">Canadian Cost Analysis</p>
                  </div>
                </div>

                {user ? (
                  <div className="py-4 border-b">
                    <div className="flex items-center gap-3 mb-3">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user.email}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={signOut}
                      className="w-full flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="py-4 border-b space-y-2">
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button size="sm" className="w-full">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}

                <nav className="flex-1 py-4 space-y-2">
                  {navigationItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={activeSection === item.id ? "default" : "ghost"}
                      className="w-full justify-start gap-3 h-12"
                      onClick={() => handleNavigation(item.id)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Button>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;