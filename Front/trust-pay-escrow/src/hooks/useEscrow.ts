'use client';

import { useWriteContract, useAccount } from 'wagmi';
import { parseEther } from 'viem';
import toast from 'react-hot-toast';
import { ESCROW_ABI, ESCROW_ADDRESS } from '@/lib/contract';

export function useEscrow() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  async function createJob(
    freelancerAddress: `0x${string}`,
    amountEth: string,
    deadlineDate: Date,
    onSuccess?: (hash: `0x${string}`) => void
  ) {
    if (!address) { toast.error('Connect your wallet first'); return; }
    const toastId = toast.loading('Creating job on-chain…');
    try {
      const deadlineUnix = BigInt(Math.floor(deadlineDate.getTime() / 1000));
      const amountWei = parseEther(amountEth);
      const hash = await writeContractAsync({
        address: ESCROW_ADDRESS,
        abi: ESCROW_ABI,
        functionName: 'createJob',
        args: [freelancerAddress, amountWei, deadlineUnix],
      });
      toast.success('Job created! Tx: ' + hash.slice(0, 10) + '…', { id: toastId });
      onSuccess?.(hash);
      return hash;
    } catch (err: unknown) {
      const msg = (err as { shortMessage?: string })?.shortMessage || 'Transaction failed';
      toast.error(msg, { id: toastId });
    }
  }

  async function lockFunds(jobId: bigint, amountEth: string, onSuccess?: () => void) {
    if (!address) { toast.error('Connect your wallet first'); return; }
    const toastId = toast.loading('Locking funds in escrow…');
    try {
      const hash = await writeContractAsync({
        address: ESCROW_ADDRESS,
        abi: ESCROW_ABI,
        functionName: 'lockFunds',
        args: [jobId],
        value: parseEther(amountEth),
      });
      toast.success('Funds locked! ✅', { id: toastId });
      onSuccess?.();
      return hash;
    } catch (err: unknown) {
      const msg = (err as { shortMessage?: string })?.shortMessage || 'Transaction failed';
      toast.error(msg, { id: toastId });
    }
  }

  async function releasePayment(jobId: bigint, onSuccess?: () => void) {
    if (!address) { toast.error('Connect your wallet first'); return; }
    const toastId = toast.loading('Releasing payment…');
    try {
      const hash = await writeContractAsync({
        address: ESCROW_ADDRESS,
        abi: ESCROW_ABI,
        functionName: 'releasePayment',
        args: [jobId],
      });
      toast.success('Payment released! 🎉', { id: toastId });
      onSuccess?.();
      return hash;
    } catch (err: any) {
      toast.error(err?.shortMessage || 'Transaction failed', { id: toastId });
    }
  }

  async function withdrawFunds(jobId: bigint, onSuccess?: () => void) {
    if (!address) { toast.error('Connect your wallet first'); return; }
    const toastId = toast.loading('Withdrawing funds…');
    try {
      const hash = await writeContractAsync({
        address: ESCROW_ADDRESS,
        abi: ESCROW_ABI,
        functionName: 'withdrawFunds',
        args: [jobId],
      });
      toast.success('Funds withdrawn!', { id: toastId });
      onSuccess?.();
      return hash;
    } catch (err: any) {
      toast.error(err?.shortMessage || 'Transaction failed', { id: toastId });
    }
  }

  return { createJob, lockFunds, releasePayment, withdrawFunds };
}
