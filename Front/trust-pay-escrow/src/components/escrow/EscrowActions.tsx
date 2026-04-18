'use client';

import { useState } from 'react';
import { formatEther } from 'viem';
import { useEscrow } from '@/hooks/useEscrow';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Lock, CheckCircle, Undo2 } from 'lucide-react';
import type { Job } from '@/types';

interface EscrowActionsProps {
  job: Job;
  onUpdate?: (jobId: bigint, updates: Partial<Job>) => void;
}

export function EscrowActions({ job, onUpdate }: EscrowActionsProps) {
  const { lockFunds, releasePayment, withdrawFunds } = useEscrow();
  const [loading, setLoading] = useState<string | null>(null);

  const amountEth = parseFloat(formatEther(job.amount)).toFixed(6);

  const handle = async (action: string, fn: () => Promise<any>) => {
    setLoading(action);
    await fn();
    setLoading(null);
  };

  if (job.released) {
    return (
      <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">
        <CheckCircle className="h-3.5 w-3.5" />
        Payment released
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {/* Lock Funds */}
      {!job.fundsLocked && !job.released && (
        <button
          disabled={loading !== null}
          onClick={() =>
            handle('lock', () =>
              lockFunds(job.id, amountEth, () =>
                onUpdate?.(job.id, { fundsLocked: true, status: 'active' })
              )
            )
          }
          className="flex items-center gap-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30 px-3 py-1.5 text-xs font-medium text-amber-400 transition-all disabled:opacity-50"
        >
          {loading === 'lock' ? <LoadingSpinner size="sm" /> : <Lock className="h-3.5 w-3.5" />}
          Lock {amountEth} ETH
        </button>
      )}

      {/* Release Payment */}
      {job.fundsLocked && !job.released && (
        <button
          disabled={loading !== null}
          onClick={() =>
            handle('release', () =>
              releasePayment(job.id, () =>
                onUpdate?.(job.id, { released: true, status: 'completed' })
              )
            )
          }
          className="flex items-center gap-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 hover:bg-emerald-500/30 px-3 py-1.5 text-xs font-medium text-emerald-400 transition-all disabled:opacity-50"
        >
          {loading === 'release' ? <LoadingSpinner size="sm" /> : <CheckCircle className="h-3.5 w-3.5" />}
          Release Payment
        </button>
      )}

      {/* Withdraw */}
      {job.fundsLocked && !job.released && (
        <button
          disabled={loading !== null}
          onClick={() =>
            handle('withdraw', () =>
              withdrawFunds(job.id, () =>
                onUpdate?.(job.id, { fundsLocked: false })
              )
            )
          }
          className="flex items-center gap-1.5 rounded-lg bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 px-3 py-1.5 text-xs font-medium text-red-400 transition-all disabled:opacity-50"
        >
          {loading === 'withdraw' ? <LoadingSpinner size="sm" /> : <Undo2 className="h-3.5 w-3.5" />}
          Withdraw
        </button>
      )}
    </div>
  );
}
