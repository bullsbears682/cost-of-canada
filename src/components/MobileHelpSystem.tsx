import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, X, ArrowRight, ArrowLeft, Lightbulb, Calculator, Home, PiggyBank } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface HelpTopic {
  id: string;
  title: string;
  content: string;
  icon: React.ComponentType<any>;
  category: 'calculator' | 'navigation' | 'features' | 'tips';
}

const helpTopics: HelpTopic[] = [
  {
    id: 'retirement-calculator',
    title: 'Retirement Calculator',
    content: 'Enter your current age, desired retirement age, and monthly savings to see if you\'re on track for retirement. The calculator uses inflation-adjusted projections.',
    icon: PiggyBank,
    category: 'calculator'
  },
  {
    id: 'housing-analyzer',
    title: 'Housing Affordability',
    content: 'Analyze housing costs across Canadian provinces. Enter your income and see which areas are most affordable for your budget.',
    icon: Home,
    category: 'calculator'
  },
  {
    id: 'navigation-tips',
    title: 'Navigation Tips',
    content: 'Swipe left/right between sections, pull down to refresh data, and tap the bottom navigation for quick access to tools.',
    icon: ArrowRight,
    category: 'navigation'
  },
  {
    id: 'data-accuracy',
    title: 'Real-time Data',
    content: 'Our data comes from official Canadian government sources and is updated regularly. Look for the green "Real Data" indicators.',
    icon: Lightbulb,
    category: 'features'
  }
];

interface MobileHelpSystemProps {
  currentPage?: string;
  className?: string;
}

const MobileHelpSystem: React.FC<MobileHelpSystemProps> = ({
  currentPage = 'home',
  className
}) => {
  const [showHelp, setShowHelp] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(0);
  const [hasSeenHelp, setHasSeenHelp] = useState(false);
  const isMobile = useIsMobile();

  // Show help hint for first-time users
  useEffect(() => {
    const seen = localStorage.getItem('maplemetrics-help-seen');
    if (!seen && isMobile) {
      setTimeout(() => {
        setHasSeenHelp(false);
      }, 3000);
    } else {
      setHasSeenHelp(true);
    }
  }, [isMobile]);

  const filteredTopics = helpTopics.filter(topic => {
    if (currentPage === 'retirement-planner') return topic.category === 'calculator' || topic.id === 'retirement-calculator';
    if (currentPage === 'housing-analyzer') return topic.category === 'calculator' || topic.id === 'housing-analyzer';
    return true;
  });

  const handleOpenHelp = () => {
    setShowHelp(true);
    setHasSeenHelp(true);
    localStorage.setItem('maplemetrics-help-seen', 'true');
    
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  const handleCloseHelp = () => {
    setShowHelp(false);
    setCurrentTopic(0);
  };

  const nextTopic = () => {
    if (currentTopic < filteredTopics.length - 1) {
      setCurrentTopic(prev => prev + 1);
    }
  };

  const prevTopic = () => {
    if (currentTopic > 0) {
      setCurrentTopic(prev => prev - 1);
    }
  };

  if (!isMobile) return null;

  return (
    <>
      {/* Floating Help Button */}
      <div className={cn("fixed bottom-24 right-4 z-40", className)}>
        <Button
          onClick={handleOpenHelp}
          className={cn(
            "rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90",
            "transition-all duration-300 touch-manipulation",
            "min-h-[44px] min-w-[44px]", // Minimum touch target
            !hasSeenHelp && "animate-pulse ring-4 ring-primary/30"
          )}
        >
          <HelpCircle className="h-6 w-6" />
        </Button>
        
        {/* Help hint for new users */}
        {!hasSeenHelp && (
          <div className="absolute -top-12 -left-20 bg-primary text-white text-xs px-3 py-2 rounded-lg shadow-lg animate-bounce">
            Need help?
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary"></div>
            </div>
          </div>
        )}
      </div>

      {/* Help Overlay */}
      {showHelp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
          <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-md mx-auto animate-scale-in shadow-2xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    Quick Help
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCloseHelp}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Progress indicators */}
                <div className="flex gap-2 mt-3">
                  {filteredTopics.map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        "h-2 flex-1 rounded-full transition-all duration-200",
                        index === currentTopic ? "bg-primary" : "bg-muted"
                      )}
                    />
                  ))}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {filteredTopics[currentTopic] && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      {React.createElement(filteredTopics[currentTopic].icon, {
                        className: "h-8 w-8 text-primary"
                      })}
                      <div>
                        <h3 className="font-semibold text-base">
                          {filteredTopics[currentTopic].title}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {filteredTopics[currentTopic].category}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {filteredTopics[currentTopic].content}
                    </p>
                  </div>
                )}
                
                {/* Navigation buttons */}
                <div className="flex justify-between items-center pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevTopic}
                    disabled={currentTopic === 0}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  
                  <span className="text-sm text-muted-foreground">
                    {currentTopic + 1} of {filteredTopics.length}
                  </span>
                  
                  {currentTopic < filteredTopics.length - 1 ? (
                    <Button
                      size="sm"
                      onClick={nextTopic}
                      className="flex items-center gap-2"
                    >
                      Next
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={handleCloseHelp}
                      className="flex items-center gap-2"
                    >
                      Got it!
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileHelpSystem;