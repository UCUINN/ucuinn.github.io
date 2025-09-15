import React from 'react';
import { cn } from '../../utils/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'medium' | 'dark';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  variant = 'light',
  blur = 'md',
  border = true,
  shadow = 'lg'
}) => {
  const variantClasses = {
    light: 'bg-white/10 backdrop-blur-md',
    medium: 'bg-white/20 backdrop-blur-lg',
    dark: 'bg-black/20 backdrop-blur-lg'
  };

  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl'
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  const borderClasses = border ? 'border border-white/20' : '';

  return (
    <div
      className={cn(
        'rounded-lg',
        variantClasses[variant],
        blurClasses[blur],
        shadowClasses[shadow],
        borderClasses,
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;