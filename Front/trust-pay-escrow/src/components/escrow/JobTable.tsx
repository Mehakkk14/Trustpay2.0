'use client';

import { useState } from 'react';
import type { Job } from '@/types';
import { JobCard } from './JobCard';
import { JobFilters } from './JobFilters';
import { CardSkeleton } from '@/components/shared/LoadingSpinner';

interface JobTableProps {
  jobs: Job[];
  role: 'hirer' | 'freelancer';
  isLoading?: boolean;
  onUpdate?: (jobId: bigint, updates: Partial<Job>) => void;
  title?: string;
  emptyMessage?: string;
}

export function JobTable({
  jobs,
  role,
  isLoading,
  onUpdate,
  title = 'Jobs',
  emptyMessage = 'No jobs found.',
}: JobTableProps) {
  const [filter, setFilter] = useState<'all' | 'open' | 'active' | 'completed'>('all');

  const filtered = filter === 'all' ? jobs : jobs.filter((j) => {
    if (filter === 'open') return !j.fundsLocked && !j.released;
    if (filter === 'active') return j.fundsLocked && !j.released;
    if (filter === 'completed') return j.released;
    return true;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        <JobFilters value={filter} onChange={setFilter} />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-16 text-center">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((job) => (
            <JobCard key={job.id.toString()} job={job} role={role} onUpdate={onUpdate} />
          ))}
        </div>
      )}
    </div>
  );
}
