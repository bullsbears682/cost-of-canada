import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useCardSwipe } from '@/hooks/useSwipeGestures';
import { useFeedbackAnimation } from '@/hooks/useAnimations';
import { ChevronLeft, ChevronRight, Star, Bookmark } from 'lucide-react';
import MobileButton from './MobileButton';

interface SwipeableToolCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  onClick: () => void;
  onFavorite?: () => void;
  onBookmark?: () => void;
  isFavorited?: boolean;
  isBookmarked?: boolean;
  className?: string;
}

const SwipeableToolCard: React.FC<SwipeableToolCardProps> = ({
  title,
  description,
  icon: Icon,
  color,
  onClick,
  onFavorite,
  onBookmark,
  isFavorited = false,
  isBookmarked = false,
  className,
}) => {
  const [showActions, setShowActions] = useState(false);
  const { triggerSuccess, style: feedbackStyle } = useFeedbackAnimation();

  const handleSwipeLeft = () => {
    if (onBookmark) {
      onBookmark();
      triggerSuccess();
      setShowActions(false);
    }
  };

  const handleSwipeRight = () => {
    if (onFavorite) {
      onFavorite();
      triggerSuccess();
      setShowActions(false);
    }
  };

  const { ref, cardStyle, isSwipeActive, swipeOffset } = useCardSwipe(
    handleSwipeLeft,
    handleSwipeRight,
    { threshold: 80 }
  );

  const getActionVisibility = () => {
    const threshold = 40;
    const leftVisible = swipeOffset.x > threshold;
    const rightVisible = swipeOffset.x < -threshold;
    
    return { leftVisible, rightVisible };
  };

  const { leftVisible, rightVisible } = getActionVisibility();

  return (
    <div className="relative">
      {/* Background action buttons */}
      <div className="absolute inset-0 flex items-center justify-between px-4 rounded-xl">
        {/* Left action (Favorite) */}
        <div className={cn(
          "flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500 text-white transition-all duration-200",
          leftVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
        )}>
          <Star className="h-6 w-6" fill={isFavorited ? "currentColor" : "none"} />
        </div>
        
        {/* Right action (Bookmark) */}
        <div className={cn(
          "flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white transition-all duration-200",
          rightVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
        )}>
          <Bookmark className="h-6 w-6" fill={isBookmarked ? "currentColor" : "none"} />
        </div>
      </div>

      {/* Main card */}
      <Card
        ref={ref}
        style={{
          ...cardStyle,
          ...feedbackStyle,
        }}
        className={cn(
          "cursor-pointer touch-manipulation transition-all duration-200 relative z-10",
          "hover:shadow-lg active:scale-[0.98]",
          "bg-background border-border/50",
          isSwipeActive && "shadow-xl",
          className
        )}
        onClick={!isSwipeActive ? onClick : undefined}
      >
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            {/* Icon with gradient background */}
            <div className={cn(
              "flex items-center justify-center w-12 h-12 rounded-xl shadow-lg transition-all duration-200",
              `bg-gradient-to-br ${color}`
            )}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base leading-tight text-foreground mb-1">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {description}
              </p>
            </div>
            
            {/* Status indicators */}
            <div className="flex flex-col items-center space-y-1">
              {isFavorited && (
                <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
              )}
              {isBookmarked && (
                <Bookmark className="h-4 w-4 text-blue-500" fill="currentColor" />
              )}
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          {/* Swipe progress indicator */}
          {isSwipeActive && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-100 rounded-full"
                  style={{
                    width: `${Math.min(Math.abs(swipeOffset.x) / 80 * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Swipe hints */}
      {!isSwipeActive && (onFavorite || onBookmark) && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground text-center">
          Swipe for actions
        </div>
      )}
    </div>
  );
};

export default SwipeableToolCard;