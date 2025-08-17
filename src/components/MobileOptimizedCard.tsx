import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MobileOptimizedCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

const MobileOptimizedCard: React.FC<MobileOptimizedCardProps> = ({
  title,
  children,
  className,
  onClick,
  interactive = false
}) => {
  return (
    <Card 
      className={cn(
        "touch-manipulation", // Optimize for touch
        interactive && "cursor-pointer hover:shadow-md active:scale-[0.98] transition-all duration-200",
        "md:hover:shadow-lg", // Only hover effects on larger screens
        className
      )}
      onClick={onClick}
    >
      {title && (
        <CardHeader className="pb-3">
          <CardTitle className="text-base md:text-lg leading-tight">
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-3 md:space-y-4">
        {children}
      </CardContent>
    </Card>
  );
};

export default MobileOptimizedCard;