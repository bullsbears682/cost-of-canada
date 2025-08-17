import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from './use-mobile';

// Animation presets for different interaction types
export const animationPresets = {
  // Button interactions
  buttonPress: {
    scale: 0.95,
    duration: 150,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  buttonHover: {
    scale: 1.02,
    duration: 200,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Card interactions
  cardHover: {
    translateY: -4,
    scale: 1.01,
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  cardPress: {
    scale: 0.98,
    duration: 100,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Loading animations
  pulse: {
    scale: [1, 1.05, 1],
    duration: 1000,
    repeat: Infinity,
    easing: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
  bounce: {
    translateY: [0, -10, 0],
    duration: 600,
    repeat: Infinity,
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Page transitions
  slideInLeft: {
    translateX: [-100, 0],
    opacity: [0, 1],
    duration: 400,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  slideInRight: {
    translateX: [100, 0],
    opacity: [0, 1],
    duration: 400,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  fadeIn: {
    opacity: [0, 1],
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Success/Error feedback
  success: {
    scale: [1, 1.1, 1],
    duration: 500,
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  error: {
    translateX: [0, -10, 10, -5, 5, 0],
    duration: 400,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Number counting
  countUp: {
    scale: [0.8, 1.1, 1],
    opacity: [0, 1, 1],
    duration: 600,
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
};

// Hook for button animations
export const useButtonAnimation = () => {
  const isMobile = useIsMobile();
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getButtonStyle = () => {
    let transform = 'translateZ(0)'; // Hardware acceleration
    let transition = 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)';

    if (isPressed) {
      transform += ' scale(0.95)';
    } else if (isHovered && !isMobile) {
      transform += ' scale(1.02) translateY(-1px)';
    }

    return {
      transform,
      transition,
      willChange: 'transform',
    };
  };

  const handlers = {
    onMouseDown: () => setIsPressed(true),
    onMouseUp: () => setIsPressed(false),
    onMouseLeave: () => {
      setIsPressed(false);
      setIsHovered(false);
    },
    onMouseEnter: () => !isMobile && setIsHovered(true),
    onTouchStart: () => setIsPressed(true),
    onTouchEnd: () => setIsPressed(false),
  };

  return { style: getButtonStyle(), handlers };
};

// Hook for card animations
export const useCardAnimation = () => {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const getCardStyle = () => {
    let transform = 'translateZ(0)';
    let transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    let boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';

    if (isPressed && isMobile) {
      transform += ' scale(0.98)';
      boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
    } else if (isHovered && !isMobile) {
      transform += ' translateY(-4px) scale(1.01)';
      boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
    }

    return {
      transform,
      transition,
      boxShadow,
      willChange: 'transform, box-shadow',
    };
  };

  const handlers = {
    onMouseEnter: () => !isMobile && setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onTouchStart: () => setIsPressed(true),
    onTouchEnd: () => setIsPressed(false),
  };

  return { style: getCardStyle(), handlers };
};

// Hook for loading animations
export const useLoadingAnimation = (type: 'pulse' | 'bounce' | 'spin' = 'pulse') => {
  const getLoadingStyle = () => {
    const animations = {
      pulse: {
        animation: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      bounce: {
        animation: 'bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite',
      },
      spin: {
        animation: 'spin 1s linear infinite',
      },
    };

    return animations[type];
  };

  return { style: getLoadingStyle() };
};

// Hook for success/error feedback animations
export const useFeedbackAnimation = () => {
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const triggerSuccess = () => {
    setFeedback('success');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setFeedback(null), 500);
  };

  const triggerError = () => {
    setFeedback('error');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setFeedback(null), 400);
  };

  const getFeedbackStyle = () => {
    if (!feedback) return {};

    return {
      animation: feedback === 'success' 
        ? 'successPulse 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)' 
        : 'errorShake 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { 
    style: getFeedbackStyle(), 
    triggerSuccess, 
    triggerError, 
    isAnimating: feedback !== null 
  };
};

// Hook for number counting animation
export const useCountAnimation = (targetValue: number, duration: number = 1000) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const animateCount = () => {
    setIsAnimating(true);
    const startTime = Date.now();
    const startValue = currentValue;
    const difference = targetValue - startValue;

    const updateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const newValue = Math.round(startValue + (difference * easeOut));
      
      setCurrentValue(newValue);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(updateCount);
  };

  useEffect(() => {
    if (targetValue !== currentValue) {
      animateCount();
    }
  }, [targetValue]);

  return { currentValue, isAnimating };
};

// Hook for page transition animations
export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState<'slideLeft' | 'slideRight' | 'fade'>('fade');

  const startTransition = (type: 'slideLeft' | 'slideRight' | 'fade' = 'fade') => {
    setTransitionType(type);
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const getTransitionStyle = () => {
    if (!isTransitioning) return {};

    const transitions = {
      slideLeft: {
        animation: 'slideInLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      slideRight: {
        animation: 'slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      fade: {
        animation: 'fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
    };

    return transitions[transitionType];
  };

  return { style: getTransitionStyle(), startTransition, isTransitioning };
};

// Hook for staggered animations (for lists)
export const useStaggeredAnimation = (itemCount: number, delay: number = 100) => {
  const [visibleItems, setVisibleItems] = useState(0);

  const startStagger = () => {
    setVisibleItems(0);
    for (let i = 0; i < itemCount; i++) {
      setTimeout(() => {
        setVisibleItems(prev => prev + 1);
      }, i * delay);
    }
  };

  const getItemStyle = (index: number) => {
    const isVisible = index < visibleItems;
    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`,
    };
  };

  return { getItemStyle, startStagger, visibleItems };
};