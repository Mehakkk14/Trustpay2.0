'use client';

import { useState, useCallback } from 'react';
import { useAccount } from 'wagmi';
import type { Job } from '@/types';
import { formatEther } from 'viem';

// Mock data for demo (replace with real contract reads)
const MOCK_JOBS: Job[] = [
  {
    id: BigInt(1),
    miner: '0x1234567890123456789012345678901234567890',
    freelancer: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
    amount: BigInt('500000000000000000'), // 0.5 ETH
    deadline: BigInt(Math.floor(Date.now() / 1000) + 86400 * 7),
    fundsLocked: false,
    released: false,
    disputed: false,
    title: 'Build a landing page',
    description: 'Create a modern responsive landing page with animations.',
    descriptionCID: '',
    status: 'open',
  },
  {
    id: BigInt(2),
    miner: '0x1234567890123456789012345678901234567890',
    freelancer: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
    amount: BigInt('1000000000000000000'), // 1 ETH
    deadline: BigInt(Math.floor(Date.now() / 1000) + 86400 * 14),
    fundsLocked: true,
    released: false,
    disputed: false,
    title: 'Smart contract audit',
    description: 'Audit a DeFi protocol smart contract for vulnerabilities.',
    descriptionCID: '',
    status: 'active',
  },
  {
    id: BigInt(3),
    miner: '0x2222222222222222222222222222222222222222',
    freelancer: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
    amount: BigInt('200000000000000000'), // 0.2 ETH
    deadline: BigInt(Math.floor(Date.now() / 1000) + 86400 * 3),
    fundsLocked: false,
    released: false,
    disputed: false,
    title: 'Design logo and brand assets',
    description: 'Create a complete brand identity including logo, colors, and typography.',
    descriptionCID: '',
    status: 'open',
  },
  {
    id: BigInt(4),
    miner: '0x3333333333333333333333333333333333333333',
    freelancer: '0x9999999999999999999999999999999999999999',
    amount: BigInt('750000000000000000'), // 0.75 ETH
    deadline: BigInt(Math.floor(Date.now() / 1000) - 86400),
    fundsLocked: false,
    released: true,
    disputed: false,
    title: 'Backend API development',
    description: 'Build REST API for a marketplace application.',
    descriptionCID: '',
    status: 'completed',
  },
];

export function useJobs() {
  const { address } = useAccount();
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(() => {
    // In production, re-query the contract here
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const addJob = useCallback((job: Omit<Job, 'id' | 'status'>) => {
    setJobs((prev) => [
      ...prev,
      {
        ...job,
        id: BigInt(prev.length + 1),
        status: 'open',
      },
    ]);
  }, []);

  const updateJob = useCallback((jobId: bigint, updates: Partial<Job>) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, ...updates } : j))
    );
  }, []);

  // Filtered views
  const hirerJobs = jobs.filter(
    (j) => address && j.miner.toLowerCase() === address.toLowerCase()
  );
  const jobsSentToMe = jobs.filter(
    (j) => address && j.freelancer.toLowerCase() === address.toLowerCase()
  );
  const freelancerActiveJobs = jobsSentToMe.filter(
    (j) => j.fundsLocked && !j.released
  );
  const openJobs = jobs.filter((j) => !j.fundsLocked && !j.released && !j.disputed);

  return {
    jobs,
    hirerJobs,
    jobsSentToMe,
    freelancerActiveJobs,
    openJobs,
    isLoading,
    refetch,
    addJob,
    updateJob,
  };
}
