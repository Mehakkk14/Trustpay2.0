'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  animate?: boolean;
}

const variantClasses = {
  primary: 'bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400',
  secondary: 'bg-gradient-to-r from-indigo-300 to-purple-300',
  success: 'bg-gradient-to-r from-emerald-400 to-cyan-400',
  warning: 'bg-gradient-to-r from-amber-400 to-orange-400',
};

export function GradientText({
  children,
  className,
  variant = 'primary',
  animate = false,
}: GradientTextProps) {
  return (
    <motion.span
      className={cn(
        'bg-clip-text text-transparent',
        variantClasses[variant],
        className
      )}
      animate={
        animate
          ? {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }
          : {}
      }
      transition={
        animate
          ? {
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          : {}
      }
      style={
        animate
          ? {
              backgroundSize: '200% 200%',
            }
          : {}
      }
    >
      {children}
    </motion.span>
  );
}
