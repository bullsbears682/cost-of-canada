import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileOptimizedCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
  fullWidth?: boolean;
  noPadding?: boolean;
}

const MobileOptimizedCard: React.FC<MobileOptimizedCardProps> = ({
  title,
  children,
  className,
  onClick,
  interactive = false,
  fullWidth = false,
  noPadding = false
}) => {
  const isMobile = useIsMobile();

  return (
    <Card 
      className={cn(
        "touch-manipulation transition-all duration-200", // Optimize for touch
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
        className
      )}
      onClick={onClick}
    >
      {title && (
        <CardHeader className={cn(
          "pb-3",
          isMobile ? "px-4 pt-4" : "px-6 pt-6"
        )}>
          <CardTitle className={cn(
            "leading-tight font-semibold",
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
        "space-y-4"
      )}>
        {children}
      </CardContent>
    </Card>
  );
};

export default MobileOptimizedCard;