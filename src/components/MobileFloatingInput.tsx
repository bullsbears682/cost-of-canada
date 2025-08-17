import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface MobileFloatingInputProps {
  label: string;
  type?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  className?: string;
  inputClassName?: string;
  icon?: React.ReactNode;
}

const MobileFloatingInput: React.FC<MobileFloatingInputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  disabled = false,
  error,
  required = false,
  min,
  max,
  step,
  className,
  inputClassName,
  icon,
}) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHasValue(value !== undefined && value !== null && value !== '');
  }, [value]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    
    // Haptic feedback for mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(5);
    }
    
    onFocus?.();
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    setHasValue(e.target.value.length > 0);
    onBlur?.();
  };

  const isFloating = focused || hasValue;

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10">
            {icon}
          </div>
        )}
        
        <Input
          ref={inputRef}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={focused ? placeholder : ''}
          disabled={disabled}
          required={required}
          min={min}
          max={max}
          step={step}
          className={cn(
            "w-full h-14 px-4 pt-6 pb-2 text-base border-2 rounded-xl transition-all duration-200",
            "focus:ring-2 focus:ring-primary/20 focus:border-primary",
            "touch-manipulation", // Better touch handling
            error && "border-destructive focus:border-destructive focus:ring-destructive/20",
            icon && "pl-12",
            disabled && "opacity-60 cursor-not-allowed",
            inputClassName
          )}
          style={{
            fontSize: '16px', // Prevents zoom on iOS
          }}
        />
        
        <Label
          htmlFor={inputRef.current?.id}
          className={cn(
            "absolute left-4 transition-all duration-200 pointer-events-none select-none",
            "origin-left transform-gpu", // Better performance
            isFloating
              ? "top-2 text-xs scale-90 text-primary font-medium"
              : "top-1/2 -translate-y-1/2 text-base text-muted-foreground",
            error && isFloating && "text-destructive",
            icon && !isFloating && "left-12",
            icon && isFloating && "left-4"
          )}
        >
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
      </div>
      
      {error && (
        <p className="mt-1 text-xs text-destructive font-medium animate-slide-up">
          {error}
        </p>
      )}
    </div>
  );
};

export default MobileFloatingInput;