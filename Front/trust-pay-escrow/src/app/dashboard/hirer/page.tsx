'use client';

import { useAccount } from 'wagmi';
import { useJobs } from '@/hooks/useJobs';
import { CreateJobForm } from '@/components/escrow/CreateJobForm';
import { JobTable } from '@/components/escrow/JobTable';
import { NetworkChecker } from '@/components/wallet/NetworkChecker';
import { Briefcase, PlusCircle, Wallet } from 'lucide-react';
import type { Job } from '@/types';
import { useState } from 'react';

export default function HirerPage() {
  const { isConnected, address } = useAccount();
  const { hirerJobs, isLoading, addJob, updateJob } = useJobs();
  const [showForm, setShowForm] = useState(true);

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-5 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
          <Wallet className="h-8 w-8 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Connect Your Wallet</h2>
        <p className="text-muted-foreground max-w-sm">
          Please connect your wallet to access the Hirer dashboard and start posting jobs.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground flex items-center gap-2">
            <Briefcase className="h-7 w-7 text-indigo-400" />
            Hirer Dashboard
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Post jobs, lock funds in escrow, and release payment when work is done.
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 px-4 py-2.5 text-sm font-medium text-indigo-400 transition-all"
        >
          <PlusCircle className="h-4 w-4" />
          {showForm ? 'Hide Form' : 'New Job'}
        </button>
      </div>

      <NetworkChecker />

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Jobs', value: hirerJobs.length },
          { label: 'Open', value: hirerJobs.filter(j => !j.fundsLocked && !j.released).length },
          { label: 'Active', value: hirerJobs.filter(j => j.fundsLocked && !j.released).length },
          { label: 'Completed', value: hirerJobs.filter(j => j.released).length },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
            <p className="text-3xl font-bold text-indigo-400">{s.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Create Job Form */}
      {showForm && (
        <CreateJobForm
          onJobCreated={(job) => {
            addJob({ ...job, miner: address as `0x${string}` });
          }}
        />
      )}

      {/* Jobs Table */}
      <JobTable
        jobs={hirerJobs}
        role="hirer"
        isLoading={isLoading}
        onUpdate={updateJob}
        title="Your Jobs"
        emptyMessage="You haven't posted any jobs yet. Create your first job above!"
      />
    </div>
  );
}
