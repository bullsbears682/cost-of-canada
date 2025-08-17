import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCardAnimation } from '@/hooks/useAnimations';
import { useSwipeGestures } from '@/hooks/useSwipeGestures';

interface MobileOptimizedCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
  fullWidth?: boolean;
  noPadding?: boolean;
  microInteraction?: 'hover' | 'press' | 'glow' | 'none';
  swipeEnabled?: boolean;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  staggerIndex?: number;
}

const MobileOptimizedCard: React.FC<MobileOptimizedCardProps> = ({
  title,
  children,
  className,
  onClick,
  interactive = false,
  fullWidth = false,
  noPadding = false,
  microInteraction = 'hover',
  swipeEnabled = false,
  onSwipeLeft,
  onSwipeRight,
  staggerIndex
}) => {
  const isMobile = useIsMobile();
  const { style: cardStyle, handlers: cardHandlers } = useCardAnimation();
  
  // Swipe gesture setup
  const handleSwipe = (direction: 'left' | 'right' | 'up' | 'down', distance: number) => {
    if (direction === 'left' && onSwipeLeft) {
      onSwipeLeft();
    } else if (direction === 'right' && onSwipeRight) {
      onSwipeRight();
    }
  };

  const { ref: swipeRef, isSwipeActive } = useSwipeGestures(
    swipeEnabled ? handleSwipe : undefined,
    {
      threshold: 60,
      enableVertical: false,
      preventScroll: true,
    }
  );

  const getMicroInteractionClass = () => {
    if (microInteraction === 'none' || !interactive) return '';
    
    const interactions = {
      hover: 'card-micro',
      press: 'mobile-scale-tap',
      glow: 'micro-glow',
    };
    
    return interactions[microInteraction];
  };

  const getStaggerStyle = () => {
    if (staggerIndex === undefined) return {};
    
    return {
      animationDelay: `${staggerIndex * 0.1}s`,
    };
  };

  const combinedHandlers = {
    ...cardHandlers,
    onClick: (e: React.MouseEvent) => {
      if (onClick && !isSwipeActive) {
        onClick();
      }
    },
  };

  return (
    <Card 
      ref={swipeEnabled ? swipeRef : undefined}
      style={{
        ...cardStyle,
        ...getStaggerStyle(),
      }}
      {...combinedHandlers}
      className={cn(
        "touch-manipulation transition-all duration-200", // Optimize for touch
        
        // Micro-interaction classes
        getMicroInteractionClass(),
        
        // Stagger animation
        staggerIndex !== undefined && "stagger-item",
        
        interactive && [
          "cursor-pointer select-none",
          "hover:shadow-lg hover:shadow-primary/5",
          "active:scale-[0.98] active:shadow-md",
          "md:hover:shadow-xl md:hover:shadow-primary/10"
        ],
        fullWidth && "w-full",
        
        // Mobile-specific improvements
        isMobile && [
          "border-border/50 shadow-sm",
          "rounded-xl", // Larger border radius for mobile
          interactive && "active:bg-accent/20"
        ],
        
        // Swipe feedback
        swipeEnabled && [
          "swipe-indicator",
          isSwipeActive && "swiping"
        ],
        
        className
      )}
    >
      {title && (
        <CardHeader className={cn(
          "pb-3 transition-all duration-200",
          isMobile ? "px-4 pt-4" : "px-6 pt-6"
        )}>
          <CardTitle className={cn(
            "leading-tight font-semibold transition-all duration-200",
            isMobile ? "text-lg" : "text-xl"
          )}>
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn(
        !noPadding && (isMobile ? "p-4" : "p-6"),
        noPadding && "p-0",
        title && !noPadding && (isMobile ? "pt-0" : "pt-0"),
        "space-y-4 transition-all duration-200"
      )}>
        {children}
      </CardContent>
      
      {/* Swipe hint indicators */}
      {swipeEnabled && (onSwipeLeft || onSwipeRight) && (
        <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full px-4 pointer-events-none opacity-30">
          {onSwipeLeft && (
            <div className="text-xs text-muted-foreground">← Swipe</div>
          )}
          {onSwipeRight && (
            <div className="text-xs text-muted-foreground">Swipe →</div>
          )}
        </div>
      )}
    </Card>
  );
};

export default MobileOptimizedCard;