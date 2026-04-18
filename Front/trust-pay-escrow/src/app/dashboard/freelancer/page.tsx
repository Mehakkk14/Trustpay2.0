'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useJobs } from '@/hooks/useJobs';
import { JobTable } from '@/components/escrow/JobTable';
import { NFTSection } from '@/components/nft/NFTSection';
import { NetworkChecker } from '@/components/wallet/NetworkChecker';
import { Wallet, Layers, Briefcase, Gem, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tab = 'sent' | 'active' | 'browse' | 'nft';

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'sent', label: 'Jobs Sent to Me', icon: Mail },
  { id: 'active', label: 'My Active Jobs', icon: Briefcase },
  { id: 'browse', label: 'Browse All Jobs', icon: Layers },
  { id: 'nft', label: 'NFT Membership', icon: Gem },
];

export default function FreelancerPage() {
  const { isConnected, address } = useAccount();
  const { openJobs, jobsSentToMe, freelancerActiveJobs, isLoading } = useJobs();
  const [tab, setTab] = useState<Tab>('sent');

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-5 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/20">
          <Wallet className="h-8 w-8 text-purple-400" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Connect Your Wallet</h2>
        <p className="text-muted-foreground max-w-sm">
          Please connect your wallet to browse available jobs and manage your freelance work.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-foreground flex items-center gap-2">
          <Layers className="h-7 w-7 text-purple-400" />
          Freelancer Dashboard
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Accept jobs, manage your active contracts, and unlock premium membership tiers.
        </p>
      </div>

      <NetworkChecker />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Jobs Sent to Me', value: jobsSentToMe.length, color: 'text-blue-400' },
          { label: 'Active Jobs', value: freelancerActiveJobs.length, color: 'text-amber-400' },
          { label: 'Open Jobs', value: openJobs.length, color: 'text-emerald-400' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tab Bar */}
      <div className="flex gap-1 rounded-xl border border-white/10 bg-white/5 p-1 w-fit">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              tab === t.id
                ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/20'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === 'sent' && (
        <JobTable
          jobs={jobsSentToMe}
          role="freelancer"
          isLoading={isLoading}
          title="Jobs Sent to Me"
          emptyMessage="No jobs sent to you yet. Browse open jobs to find work!"
        />
      )}

      {tab === 'active' && (
        <JobTable
          jobs={freelancerActiveJobs}
          role="freelancer"
          isLoading={isLoading}
          title="My Active Jobs"
          emptyMessage="You have no active jobs. Accept a job sent to you to get started!"
        />
      )}

      {tab === 'browse' && (
        <JobTable
          jobs={openJobs}
          role="freelancer"
          isLoading={isLoading}
          title="Open Jobs"
          emptyMessage="No open jobs available right now. Check back soon!"
        />
      )}

      {tab === 'nft' && <NFTSection />}
    </div>
  );
}
