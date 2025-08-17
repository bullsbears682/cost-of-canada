import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useButtonAnimation, useFeedbackAnimation } from '@/hooks/useAnimations';
import { Loader2 } from 'lucide-react';

interface MobileButtonProps extends ButtonProps {
  loading?: boolean;
  fullWidth?: boolean;
  haptic?: boolean;
  microInteraction?: 'bounce' | 'pulse' | 'glow' | 'ripple' | 'none';
  success?: boolean;
  error?: boolean;
}

const MobileButton: React.FC<MobileButtonProps> = ({
  children,
  className,
  loading = false,
  fullWidth = false,
  haptic = true,
  microInteraction = 'ripple',
  success = false,
  error = false,
  disabled,
  onClick,
  ...props
}) => {
  const isMobile = useIsMobile();
  const { style: buttonStyle, handlers } = useButtonAnimation();
  const { style: feedbackStyle, triggerSuccess, triggerError } = useFeedbackAnimation();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Add haptic feedback on mobile
    if (haptic && isMobile && 'vibrate' in navigator) {
      const vibrationPattern = success ? [10, 50, 10] : error ? [20] : [10];
      navigator.vibrate(vibrationPattern);
    }
    
    // Trigger visual feedback
    if (success) {
      triggerSuccess();
    } else if (error) {
      triggerError();
    }
    
    if (onClick && !loading && !disabled) {
      onClick(e);
    }
  };

  const getMicroInteractionClass = () => {
    if (microInteraction === 'none' || disabled || loading) return '';
    
    const interactions = {
      bounce: 'micro-bounce',
      pulse: 'micro-pulse',
      glow: 'micro-glow',
      ripple: 'micro-ripple',
    };
    
    return interactions[microInteraction];
  };

  return (
    <Button
      {...props}
      {...handlers}
      disabled={disabled || loading}
      onClick={handleClick}
      style={{
        ...buttonStyle,
        ...feedbackStyle,
      }}
      className={cn(
        // Base mobile optimizations
        "touch-manipulation select-none transition-all duration-200 relative overflow-hidden",
        
        // Micro-interaction classes
        getMicroInteractionClass(),
        
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
          "active:scale-[0.96]",
          "active:shadow-sm",
          props.variant === "default" && "active:bg-primary/90",
          props.variant === "secondary" && "active:bg-secondary/90",
          props.variant === "outline" && "active:bg-accent/50",
        ],
        
        // Loading state
        loading && "cursor-not-allowed opacity-70",
        
        // Success/Error states
        success && "bg-green-500 hover:bg-green-600 text-white border-green-500",
        error && "bg-red-500 hover:bg-red-600 text-white border-red-500",
        
        className
      )}
    >
      {loading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {children}
      
      {/* Ripple effect overlay */}
      {microInteraction === 'ripple' && !disabled && !loading && (
        <span className="absolute inset-0 overflow-hidden rounded-inherit">
          <span className="absolute inset-0 bg-white/20 rounded-inherit transform scale-0 group-active:scale-100 transition-transform duration-300 origin-center" />
        </span>
      )}
    </Button>
  );
};

export default MobileButton;