import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useCountAnimation } from '@/hooks/useAnimations';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
  separator?: string;
  microInteraction?: boolean;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1000,
  prefix = '',
  suffix = '',
  className,
  decimals = 0,
  separator = ',',
  microInteraction = true,
}) => {
  const { currentValue, isAnimating } = useCountAnimation(value, duration);

  const formatNumber = (num: number) => {
    const fixed = num.toFixed(decimals);
    const parts = fixed.split('.');
    
    // Add thousand separators
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    
    return parts.join('.');
  };

  return (
    <span 
      className={cn(
        "inline-block font-mono font-bold tabular-nums",
        microInteraction && [
          "transition-all duration-200",
          isAnimating && "count-up"
        ],
        className
      )}
      style={{
        willChange: isAnimating ? 'transform, opacity' : 'auto',
      }}
    >
      {prefix}{formatNumber(currentValue)}{suffix}
    </span>
  );
};

export default AnimatedCounter;