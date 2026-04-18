'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PremiumButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

const variantClasses = {
  primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50',
  secondary: 'bg-white/10 hover:bg-white/20 text-foreground border border-white/20 hover:border-white/40',
  outline: 'border-2 border-indigo-500/50 hover:border-indigo-500 text-indigo-400 hover:text-indigo-300',
  ghost: 'hover:bg-white/5 text-foreground/80 hover:text-foreground',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm font-medium',
  md: 'px-4 py-2.5 text-base font-semibold',
  lg: 'px-6 py-3.5 text-lg font-semibold',
};

export function PremiumButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  icon,
  iconPosition = 'right',
}: PremiumButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'rounded-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2',
        'focus-ring disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
    >
      {loading && (
        <motion.div
          className="h-4 w-4 rounded-full border-2 border-current border-r-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
      )}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
    </motion.button>
  );
}
