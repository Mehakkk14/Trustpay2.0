'use client';

import { useState } from 'react';
import { formatEther } from 'viem';
import { Clock, User, DollarSign, Lock, CheckCircle, AlertCircle, Send, Loader2 } from 'lucide-react';
import type { Job } from '@/types';
import { shortenAddress, formatDeadline, getJobStatus, getStatusColor } from '@/lib/utils';
import { EscrowActions } from './EscrowActions';
import toast from 'react-hot-toast';

interface JobCardProps {
  job: Job;
  role: 'hirer' | 'freelancer';
  onUpdate?: (jobId: bigint, updates: Partial<Job>) => void;
}

export function JobCard({ job, role, onUpdate }: JobCardProps) {
  const status = getJobStatus(job);
  const statusColor = getStatusColor(status);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleApply = async () => {
    setApplying(true);
    // Simulate applying — in production this would call the contract
    await new Promise((r) => setTimeout(r, 1200));
    setApplying(false);
    setApplied(true);
    toast.success('Application submitted! Waiting for hirer to assign you.');
  };

  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 hover:border-indigo-500/30 hover:bg-white/[0.07] transition-all duration-300 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{job.title || `Job #${job.id.toString()}`}</h3>
          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
            {job.description || 'No description provided.'}
          </p>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${statusColor}`}>
          {status}
        </span>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <DollarSign className="h-3 w-3" /> Payment
          </p>
          <p className="font-semibold text-indigo-400">
            {parseFloat(formatEther(job.amount)).toFixed(4)} ETH
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" /> Deadline
          </p>
          <p className="font-medium text-foreground/80">{formatDeadline(job.deadline)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <User className="h-3 w-3" /> Freelancer
          </p>
          <p className="font-mono text-xs text-foreground/70">{shortenAddress(job.freelancer)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Lock className="h-3 w-3" /> Escrow
          </p>
          <p className="text-xs">
            {job.fundsLocked ? (
              <span className="text-amber-400 flex items-center gap-1">
                <Lock className="h-3 w-3" /> Locked
              </span>
            ) : (
              <span className="text-muted-foreground">Not locked</span>
            )}
          </p>
        </div>
      </div>

      {/* Actions */}
      {role === 'hirer' && (
        <EscrowActions job={job} onUpdate={onUpdate} />
      )}

      {role === 'freelancer' && !job.fundsLocked && !job.released && (
        <button
          onClick={handleApply}
          disabled={applying || applied}
          className="flex items-center gap-2 w-full justify-center rounded-lg bg-purple-500/20 border border-purple-500/30 hover:bg-purple-500/30 px-3 py-2 text-xs font-medium text-purple-400 transition-all disabled:opacity-60 disabled:pointer-events-none"
        >
          {applying ? (
            <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Submitting…</>
          ) : applied ? (
            <><CheckCircle className="h-3.5 w-3.5" /> Applied!</>
          ) : (
            <><Send className="h-3.5 w-3.5" /> Apply for this Job</>
          )}
        </button>
      )}

      {role === 'freelancer' && job.fundsLocked && !job.released && (
        <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
          <Lock className="h-3.5 w-3.5" />
          Funds locked — complete work to receive payment
        </div>
      )}
    </div>
  );
}
