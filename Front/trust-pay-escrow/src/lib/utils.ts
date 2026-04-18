import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatEther } from 'viem';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenAddress(address: string, chars = 4): string {
  if (!address) return '';
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function formatETH(wei: bigint, decimals = 4): string {
  const eth = formatEther(wei);
  return `${parseFloat(eth).toFixed(decimals)} ETH`;
}

export function formatDeadline(unix: bigint): string {
  const date = new Date(Number(unix) * 1000);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function isDeadlinePassed(unix: bigint): boolean {
  return Date.now() > Number(unix) * 1000;
}

export function getJobStatus(job: {
  fundsLocked: boolean;
  released: boolean;
  disputed: boolean;
  deadline: bigint;
}): string {
  if (job.released) return 'Completed';
  if (job.disputed) return 'Disputed';
  if (job.fundsLocked) return 'Active';
  if (isDeadlinePassed(job.deadline)) return 'Expired';
  return 'Open';
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    Open: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    Active: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    Completed: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    Disputed: 'bg-red-500/20 text-red-400 border border-red-500/30',
    Expired: 'bg-zinc-500/20 text-zinc-400 border border-zinc-500/30',
  };
  return map[status] || 'bg-zinc-500/20 text-zinc-400';
}

export const NFT_TIERS = [
  {
    id: 1,
    tokenId: 1,
    name: 'Bronze',
    description: 'Entry-level membership for new freelancers',
    benefits: [
      'Access to standard job listings',
      'Basic profile badge',
      'Community forum access',
      'Up to 3 active jobs',
    ],
    color: '#CD7F32',
    gradient: 'from-amber-900/40 to-amber-700/20',
    borderColor: 'border-amber-700/40',
    icon: '🥉',
    price: '0.01 ETH',
  },
  {
    id: 2,
    tokenId: 2,
    name: 'Silver',
    description: 'Enhanced visibility and job priority',
    benefits: [
      'Priority job notifications',
      'Silver profile badge',
      'Dispute resolution support',
      'Up to 10 active jobs',
    ],
    color: '#C0C0C0',
    gradient: 'from-slate-700/40 to-slate-500/20',
    borderColor: 'border-slate-400/40',
    icon: '🥈',
    price: '0.05 ETH',
  },
  {
    id: 3,
    tokenId: 3,
    name: 'Gold',
    description: 'Premium access with reduced platform fees',
    benefits: [
      'Featured in job recommendations',
      'Gold profile badge',
      'Reduced platform fee (1%)',
      'Unlimited active jobs',
      'Priority dispute resolution',
    ],
    color: '#FFD700',
    gradient: 'from-yellow-700/40 to-yellow-500/20',
    borderColor: 'border-yellow-500/40',
    icon: '🥇',
    price: '0.1 ETH',
  },
  {
    id: 4,
    tokenId: 4,
    name: 'Diamond',
    description: 'Elite status with exclusive benefits',
    benefits: [
      'Top placement in search results',
      'Diamond profile badge',
      'Zero platform fees',
      'Dedicated account manager',
      'Early access to new features',
      'Revenue sharing program',
    ],
    color: '#B9F2FF',
    gradient: 'from-cyan-700/40 to-cyan-400/20',
    borderColor: 'border-cyan-400/40',
    icon: '💎',
    price: '0.5 ETH',
  },
];
