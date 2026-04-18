'use client';

import { cn } from '@/lib/utils';

type Filter = 'all' | 'open' | 'active' | 'completed';

interface JobFiltersProps {
  value: Filter;
  onChange: (value: Filter) => void;
}

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export function JobFilters({ value, onChange }: JobFiltersProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 p-0.5 text-xs font-medium">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={cn(
            'px-3 py-1.5 rounded-md transition-all duration-200',
            value === f.value
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
