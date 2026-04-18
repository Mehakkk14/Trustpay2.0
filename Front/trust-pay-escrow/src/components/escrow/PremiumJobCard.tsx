'use client';

import { motion } from 'framer-motion';
import { Clock, CheckCircle2, AlertCircle, DollarSign } from 'lucide-react';
import { PremiumCard } from '@/components/shared/PremiumCard';
import { PremiumBadge } from '@/components/shared/PremiumBadge';
import { cn } from '@/lib/utils';

interface JobCardProps {
  title: string;
  description: string;
  budget: string;
  status: 'open' | 'in-progress' | 'completed' | 'disputed';
  timeCreated: string;
  freelancer?: string;
  progressAmount?: number;
  className?: string;
}

const statusConfig = {
  open: {
    badge: { label: 'Open', variant: 'success' as const, icon: '🟢' },
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  'in-progress': {
    badge: { label: 'In Progress', variant: 'info' as const, icon: '🔵' },
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  completed: {
    badge: { label: 'Completed', variant: 'success' as const, icon: '✓' },
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  disputed: {
    badge: { label: 'Disputed', variant: 'error' as const, icon: '⚠️' },
    color: 'text-red-400',
    bg: 'bg-red-500/10',
  },
};

export function PremiumJobCard({
  title,
  description,
  budget,
  status,
  timeCreated,
  freelancer,
  progressAmount,
  className,
}: JobCardProps) {
  const config = statusConfig[status];

  return (
    <PremiumCard
      variant="elevated"
      className={cn('p-6 sm:p-8 cursor-pointer group', className)}
      hover="lift"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex-1 min-w-0">
          <motion.h3
            className="text-lg sm:text-xl font-[700] text-foreground truncate group-hover:text-indigo-400 transition-colors"
            layout
          >
            {title}
          </motion.h3>
          <p className="text-sm text-foreground/60 mt-1 line-clamp-2">
            {description}
          </p>
        </div>
        <PremiumBadge variant={config.badge.variant}>
          {config.badge.icon} {config.badge.label}
        </PremiumBadge>
      </div>

      {/* Content Grid */}
      <div className="space-y-6">
        {/* Budget Section */}
        <div className="flex items-center gap-3">
          <motion.div
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/30"
            whileHover={{ scale: 1.1 }}
          >
            <DollarSign className="h-5 w-5 text-indigo-400" />
          </motion.div>
          <div>
            <p className="text-xs text-foreground/60 font-medium">Budget</p>
            <p className="text-lg font-[700] text-foreground">{budget}</p>
          </div>
        </div>

        {/* Progress Bar (if in-progress) */}
        {status === 'in-progress' && progressAmount && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs text-foreground/60 font-medium">Progress</p>
              <p className="text-xs font-semibold text-indigo-400">{progressAmount}%</p>
            </div>
            <motion.div
              className="w-full h-2 rounded-full bg-white/5 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${progressAmount}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </motion.div>
          </div>
        )}

        {/* Freelancer Info (if assigned) */}
        {freelancer && (
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <p className="text-xs text-foreground/60 font-medium">Assigned to</p>
            <p className="text-sm font-semibold text-foreground mt-1">{freelancer}</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs text-foreground/50">
            <Clock className="h-4 w-4" />
            <span>{timeCreated}</span>
          </div>
          <motion.button
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            whileHover={{ x: 2 }}
          >
            View Details →
          </motion.button>
        </div>
      </div>
    </PremiumCard>
  );
}
