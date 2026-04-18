'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  badge?: string;
  badgeVariant?: 'primary' | 'success' | 'warning' | 'info';
  className?: string;
}

const badgeVariants = {
  primary: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30',
  success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
  warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
  info: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30',
};

export function DashboardPageHeader({
  title,
  description,
  icon,
  action,
  badge,
  badgeVariant = 'primary',
  className,
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn('space-y-4', className)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {icon && (
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex-shrink-0"
              >
                {icon}
              </motion.div>
            )}
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-[800] text-foreground">
                {title}
              </h1>
              {badge && (
                <span
                  className={cn(
                    'text-xs font-semibold px-3 py-1 rounded-full',
                    badgeVariants[badgeVariant]
                  )}
                >
                  {badge}
                </span>
              )}
            </div>
          </div>
          {description && (
            <p className="text-base text-foreground/70">{description}</p>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </motion.div>
  );
}

interface DashboardSectionProps {
  children: ReactNode;
  className?: string;
}

export function DashboardSection({ children, className }: DashboardSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={cn('rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-8', className)}
    >
      {children}
    </motion.div>
  );
}

interface DashboardLayoutProps {
  children: ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn('space-y-8', className)}
    >
      {children}
    </motion.div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: ReactNode;
  className?: string;
}

export function DashboardStatCard({
  label,
  value,
  change,
  changeType = 'neutral',
  icon,
  className,
}: StatCardProps) {
  const changeColor = {
    positive: 'text-emerald-400',
    negative: 'text-red-400',
    neutral: 'text-foreground/60',
  }[changeType];

  return (
    <motion.div
      className={cn(
        'rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6',
        className
      )}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground/70">{label}</p>
          <motion.p
            className="text-2xl sm:text-3xl font-[800] text-foreground mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {value}
          </motion.p>
          {change && (
            <p className={cn('text-xs font-semibold mt-2', changeColor)}>
              {change}
            </p>
          )}
        </div>
        {icon && (
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {icon}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
