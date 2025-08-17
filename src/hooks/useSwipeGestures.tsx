import { useRef, useEffect, useState, useCallback } from 'react';
import { useIsMobile } from './use-mobile';

export interface SwipeGestureOptions {
  threshold?: number; // Minimum distance for swipe
  velocity?: number; // Minimum velocity for swipe
  preventScroll?: boolean; // Prevent default scroll behavior
  enableHorizontal?: boolean; // Enable horizontal swipes
  enableVertical?: boolean; // Enable vertical swipes
}

export interface SwipeState {
  isSwiping: boolean;
  swipeDirection: 'left' | 'right' | 'up' | 'down' | null;
  swipeDistance: number;
  swipeVelocity: number;
  startPosition: { x: number; y: number };
  currentPosition: { x: number; y: number };
}

const defaultOptions: SwipeGestureOptions = {
  threshold: 50,
  velocity: 0.3,
  preventScroll: false,
  enableHorizontal: true,
  enableVertical: true,
};

export const useSwipeGestures = (
  onSwipe?: (direction: 'left' | 'right' | 'up' | 'down', distance: number) => void,
  options: SwipeGestureOptions = {}
) => {
  const isMobile = useIsMobile();
  const elementRef = useRef<HTMLElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const [swipeState, setSwipeState] = useState<SwipeState>({
    isSwiping: false,
    swipeDirection: null,
    swipeDistance: 0,
    swipeVelocity: 0,
    startPosition: { x: 0, y: 0 },
    currentPosition: { x: 0, y: 0 },
  });

  const config = { ...defaultOptions, ...options };

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    const startPos = { x: touch.clientX, y: touch.clientY };
    
    touchStartRef.current = {
      x: startPos.x,
      y: startPos.y,
      time: Date.now(),
    };

    setSwipeState(prev => ({
      ...prev,
      isSwiping: true,
      startPosition: startPos,
      currentPosition: startPos,
      swipeDirection: null,
      swipeDistance: 0,
      swipeVelocity: 0,
    }));

    if (config.preventScroll) {
      e.preventDefault();
    }
  }, [config.preventScroll]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = e.touches[0];
    const currentPos = { x: touch.clientX, y: touch.clientY };
    const deltaX = currentPos.x - touchStartRef.current.x;
    const deltaY = currentPos.y - touchStartRef.current.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Determine swipe direction
    let direction: 'left' | 'right' | 'up' | 'down' | null = null;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (config.enableHorizontal) {
        direction = deltaX > 0 ? 'right' : 'left';
      }
    } else {
      // Vertical swipe
      if (config.enableVertical) {
        direction = deltaY > 0 ? 'down' : 'up';
      }
    }

    setSwipeState(prev => ({
      ...prev,
      currentPosition: currentPos,
      swipeDirection: direction,
      swipeDistance: distance,
    }));

    // Prevent scroll if swiping horizontally and preventScroll is enabled
    if (config.preventScroll && direction && ['left', 'right'].includes(direction)) {
      e.preventDefault();
    }
  }, [config.enableHorizontal, config.enableVertical, config.preventScroll]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!touchStartRef.current) return;

    const endTime = Date.now();
    const deltaTime = endTime - touchStartRef.current.time;
    const deltaX = swipeState.currentPosition.x - touchStartRef.current.x;
    const deltaY = swipeState.currentPosition.y - touchStartRef.current.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const velocity = distance / deltaTime;

    // Check if swipe meets threshold requirements
    if (distance >= config.threshold! && velocity >= config.velocity!) {
      let direction: 'left' | 'right' | 'up' | 'down' | null = null;
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (config.enableHorizontal) {
          direction = deltaX > 0 ? 'right' : 'left';
        }
      } else {
        // Vertical swipe
        if (config.enableVertical) {
          direction = deltaY > 0 ? 'down' : 'up';
        }
      }

      if (direction && onSwipe) {
        onSwipe(direction, distance);
        
        // Add haptic feedback if available
        if (isMobile && 'vibrate' in navigator) {
          navigator.vibrate(10);
        }
      }
    }

    // Reset state
    setSwipeState(prev => ({
      ...prev,
      isSwiping: false,
      swipeDirection: null,
      swipeDistance: 0,
      swipeVelocity: velocity,
    }));

    touchStartRef.current = null;
  }, [swipeState.currentPosition, config.threshold, config.velocity, config.enableHorizontal, config.enableVertical, onSwipe, isMobile]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !isMobile) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: !config.preventScroll });
    element.addEventListener('touchmove', handleTouchMove, { passive: !config.preventScroll });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, config.preventScroll, isMobile]);

  return {
    ref: elementRef,
    swipeState,
    isSwipeActive: swipeState.isSwiping,
  };
};

// Hook for card swipe interactions (like Tinder-style swipes)
export const useCardSwipe = (
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  options: SwipeGestureOptions = {}
) => {
  const [swipeOffset, setSwipeOffset] = useState({ x: 0, y: 0 });
  const [isSwipeActive, setIsSwipeActive] = useState(false);

  const handleSwipe = (direction: 'left' | 'right' | 'up' | 'down', distance: number) => {
    if (direction === 'left' && onSwipeLeft) {
      onSwipeLeft();
    } else if (direction === 'right' && onSwipeRight) {
      onSwipeRight();
    }
    
    // Reset position after swipe
    setTimeout(() => {
      setSwipeOffset({ x: 0, y: 0 });
      setIsSwipeActive(false);
    }, 300);
  };

  const { ref, swipeState } = useSwipeGestures(handleSwipe, {
    ...options,
    enableVertical: false, // Only horizontal swipes for cards
  });

  // Update visual offset during swipe
  useEffect(() => {
    if (swipeState.isSwiping) {
      const deltaX = swipeState.currentPosition.x - swipeState.startPosition.x;
      setSwipeOffset({ x: deltaX * 0.3, y: 0 }); // Damped movement
      setIsSwipeActive(true);
    }
  }, [swipeState]);

  const getCardStyle = () => {
    const rotation = swipeOffset.x * 0.1; // Slight rotation based on swipe
    const opacity = Math.max(0.5, 1 - Math.abs(swipeOffset.x) / 200);

    return {
      transform: `translateX(${swipeOffset.x}px) rotate(${rotation}deg)`,
      opacity,
      transition: isSwipeActive ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      willChange: 'transform, opacity',
    };
  };

  return {
    ref,
    cardStyle: getCardStyle(),
    isSwipeActive,
    swipeOffset,
  };
};

// Hook for navigation swipes (like iOS back gesture)
export const useNavigationSwipe = (
  onSwipeBack?: () => void,
  onSwipeForward?: () => void
) => {
  const [swipeProgress, setSwipeProgress] = useState(0);

  const handleSwipe = (direction: 'left' | 'right' | 'up' | 'down', distance: number) => {
    if (direction === 'right' && onSwipeBack) {
      onSwipeBack();
    } else if (direction === 'left' && onSwipeForward) {
      onSwipeForward();
    }
    
    // Reset progress
    setTimeout(() => setSwipeProgress(0), 300);
  };

  const { ref, swipeState } = useSwipeGestures(handleSwipe, {
    threshold: 100,
    enableVertical: false,
    preventScroll: false,
  });

  // Update progress during swipe
  useEffect(() => {
    if (swipeState.isSwiping && swipeState.swipeDirection === 'right') {
      const progress = Math.min(swipeState.swipeDistance / 100, 1);
      setSwipeProgress(progress);
    } else {
      setSwipeProgress(0);
    }
  }, [swipeState]);

  const getNavigationStyle = () => ({
    '--swipe-progress': swipeProgress,
    background: `linear-gradient(90deg, rgba(0,0,0,0.05) ${swipeProgress * 100}%, transparent ${swipeProgress * 100}%)`,
    transition: swipeState.isSwiping ? 'none' : 'all 0.3s ease-out',
  });

  return {
    ref,
    navigationStyle: getNavigationStyle(),
    swipeProgress,
    isSwipeActive: swipeState.isSwiping,
  };
};

// Hook for pull-to-refresh gesture
export const usePullToRefresh = (
  onRefresh: () => Promise<void> | void,
  threshold: number = 80
) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [canRefresh, setCanRefresh] = useState(false);

  const handleSwipe = async (direction: 'left' | 'right' | 'up' | 'down', distance: number) => {
    if (direction === 'down' && distance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setTimeout(() => {
          setIsRefreshing(false);
          setPullDistance(0);
          setCanRefresh(false);
        }, 500);
      }
    }
  };

  const { ref, swipeState } = useSwipeGestures(handleSwipe, {
    threshold,
    enableHorizontal: false,
    preventScroll: false,
  });

  // Update pull distance and refresh state
  useEffect(() => {
    if (swipeState.isSwiping && swipeState.swipeDirection === 'down') {
      const distance = Math.min(swipeState.swipeDistance, threshold * 1.5);
      setPullDistance(distance);
      setCanRefresh(distance >= threshold);
    } else if (!isRefreshing) {
      setPullDistance(0);
      setCanRefresh(false);
    }
  }, [swipeState, threshold, isRefreshing]);

  const getPullToRefreshStyle = () => {
    const progress = pullDistance / threshold;
    const rotation = progress * 180;

    return {
      transform: `translateY(${pullDistance * 0.5}px)`,
      '--pull-progress': progress,
      '--pull-rotation': `${rotation}deg`,
      transition: swipeState.isSwiping ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  return {
    ref,
    pullToRefreshStyle: getPullToRefreshStyle(),
    pullDistance,
    canRefresh,
    isRefreshing,
    pullProgress: pullDistance / threshold,
  };
};