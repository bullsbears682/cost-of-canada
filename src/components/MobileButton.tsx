import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Loader2 } from 'lucide-react';

interface MobileButtonProps extends ButtonProps {
  loading?: boolean;
  fullWidth?: boolean;
  haptic?: boolean;
}

const MobileButton: React.FC<MobileButtonProps> = ({
  children,
  className,
  loading = false,
  fullWidth = false,
  haptic = true,
  disabled,
  onClick,
  ...props
}) => {
  const isMobile = useIsMobile();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Add haptic feedback on mobile
    if (haptic && isMobile && 'vibrate' in navigator) {
      navigator.vibrate(10); // Short vibration
    }
    
    if (onClick && !loading && !disabled) {
      onClick(e);
    }
  };

  return (
    <Button
      {...props}
      disabled={disabled || loading}
      onClick={handleClick}
      className={cn(
        // Base mobile optimizations
        "touch-manipulation select-none transition-all duration-200",
        
        // Mobile-specific sizing and spacing
        isMobile && [
          "min-h-[48px] px-6", // Larger touch target (48px minimum)
          "text-base font-medium", // Better readability
          "rounded-xl", // Larger border radius
        ],
        
        // Full width option
        fullWidth && "w-full",
        
        // Enhanced active states for mobile
        isMobile && !disabled && !loading && [
          "active:scale-[0.98]",
          "active:shadow-sm",
          props.variant === "default" && "active:bg-primary/90",
          props.variant === "secondary" && "active:bg-secondary/90",
          props.variant === "outline" && "active:bg-accent/50",
        ],
        
        // Loading state
        loading && "cursor-not-allowed opacity-70",
        
        className
      )}
    >
      {loading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {children}
    </Button>
  );
};

export default MobileButton;