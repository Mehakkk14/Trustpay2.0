'use client';

import { useAppStore } from '@/store/useAppStore';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export function RoleToggle() {
  const router = useRouter();
  const { role, setRole } = useAppStore();

  const handleRoleChange = (newRole: 'hirer' | 'freelancer') => {
    setRole(newRole);
    router.push(`/dashboard/${newRole}`);
  };

  return (
    <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 p-0.5 text-xs font-medium">
      <button
        onClick={() => handleRoleChange('hirer')}
        className={cn(
          'px-3 py-1.5 rounded-md transition-all duration-200',
          role === 'hirer'
            ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        Hirer
      </button>
      <button
        onClick={() => handleRoleChange('freelancer')}
        className={cn(
          'px-3 py-1.5 rounded-md transition-all duration-200',
          role === 'freelancer'
            ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/30'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        Freelancer
      </button>
    </div>
  );
}
