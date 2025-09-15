import React from 'react';
import { cn } from '../../utils/utils';

interface GlassCardAdvancedProps {
  children: React.ReactNode;
  className?: string;
  glassmorphism?: {
    background?: string;
    backdropBlur?: string;
    border?: string;
    borderRadius?: string;
    boxShadow?: string;
  };
  hover?: boolean;
  gradient?: {
    from: string;
    to: string;
    direction?: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-tr' | 'to-tl' | 'to-br' | 'to-bl';
  };
  onClick?: () => void;
  style?: React.CSSProperties;
}

const GlassCardAdvanced: React.FC<GlassCardAdvancedProps> = ({
  children,
  className = '',
  glassmorphism = {},
  hover = false,
  gradient,
  onClick,
  style = {}
}) => {
  const {
    background = 'rgba(255, 255, 255, 0.1)',
    backdropBlur = '10px',
    border = '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius = '12px',
    boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
  } = glassmorphism;

  const customStyle: React.CSSProperties = {
    background: gradient
      ? `linear-gradient(${gradient.direction || 'to-r'}, ${gradient.from}, ${gradient.to})`
      : background,
    backdropFilter: `blur(${backdropBlur})`,
    WebkitBackdropFilter: `blur(${backdropBlur})`,
    border,
    borderRadius,
    boxShadow,
    ...style
  };

  const hoverClasses = hover
    ? 'transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/20 cursor-pointer'
    : '';

  return (
    <div
      className={cn(
        'relative',
        hoverClasses,
        className
      )}
      style={customStyle}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Preset configurations for common use cases
export const GlassPresets = {
  card: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropBlur: '10px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
  },
  modal: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropBlur: '15px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '16px',
    boxShadow: '0 15px 35px 0 rgba(31, 38, 135, 0.4)'
  },
  navbar: {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropBlur: '8px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '0px',
    boxShadow: '0 2px 16px 0 rgba(31, 38, 135, 0.2)'
  },
  button: {
    background: 'rgba(255, 255, 255, 0.12)',
    backdropBlur: '6px',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    borderRadius: '8px',
    boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.3)'
  }
};

export default GlassCardAdvanced;