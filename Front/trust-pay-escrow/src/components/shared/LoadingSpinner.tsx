'use client';

import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizes = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-10 w-10' };
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-white/20 border-t-indigo-500',
        sizes[size],
        className
      )}
    />
  );
}

export function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <LoadingSpinner size="lg" />
      <p className="text-sm text-muted-foreground animate-pulse">Loading…</p>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5 animate-pulse space-y-3">
      <div className="h-4 w-2/3 rounded bg-white/10" />
      <div className="h-3 w-full rounded bg-white/10" />
      <div className="h-3 w-4/5 rounded bg-white/10" />
      <div className="h-8 w-1/3 rounded-lg bg-white/10 mt-4" />
    </div>
  );
}
