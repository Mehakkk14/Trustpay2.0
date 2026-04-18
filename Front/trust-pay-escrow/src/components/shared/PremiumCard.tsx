'use client';

import { motion, MotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PremiumCardProps extends MotionProps {
  children: ReactNode;
  className?: string;
  hover?: 'lift' | 'glow' | 'border' | 'none';
  interactive?: boolean;
  variant?: 'default' | 'elevated' | 'glass' | 'gradient';
}

const variantClasses = {
  default: 'border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl',
  elevated: 'border border-white/10 bg-white/[0.08] backdrop-blur-2xl shadow-xl shadow-indigo-500/5',
  glass: 'border border-white/10 bg-white/5 backdrop-blur-3xl',
  gradient: 'border border-gradient-to-r from-indigo-500/30 to-purple-500/30 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 backdrop-blur-xl',
};

export function PremiumCard({
  children,
  className,
  hover = 'lift',
  interactive = true,
  variant = 'default',
  ...motionProps
}: PremiumCardProps) {
  const hoverVariants: Record<string, any> = {
    lift: {
      y: -8,
      boxShadow: '0 20px 40px rgba(99, 102, 241, 0.15)',
      transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
    },
    glow: {
      boxShadow: '0 0 30px rgba(99, 102, 241, 0.3), 0 0 60px rgba(168, 85, 247, 0.15)',
      transition: { duration: 0.3 },
    },
    border: {
      borderColor: 'rgba(99, 102, 241, 0.5)',
      transition: { duration: 0.3 },
    },
    none: {},
  };

  return (
    <motion.div
      className={cn(
        'rounded-2xl transition-all duration-300',
        variantClasses[variant],
        className
      )}
      whileHover={interactive && hover !== 'none' ? (hoverVariants[hover] as any) : undefined}
      whileTap={interactive ? { scale: 0.98 } : undefined}
      {...(motionProps as any)}
    >
      {children}
    </motion.div>
  );
}
