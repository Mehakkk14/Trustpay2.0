'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PremiumBadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  animated?: boolean;
}

const variantClasses = {
  primary: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
  success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  warning: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  error: 'bg-red-500/10 border-red-500/30 text-red-400',
  info: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
};

const sizeClasses = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
};

export function PremiumBadge({
  children,
  className,
  variant = 'primary',
  size = 'md',
  icon,
  animated = false,
}: PremiumBadgeProps) {
  return (
    <motion.div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium backdrop-blur-xl',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      animate={animated ? { scale: [1, 1.02, 1], opacity: [0.8, 1, 0.8] } : {}}
      transition={
        animated
          ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
          : undefined
      }
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </motion.div>
  );
}
