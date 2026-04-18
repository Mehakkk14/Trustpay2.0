'use client';

import { useCallback, useState } from 'react';
import { useAccount } from 'wagmi';
import toast from 'react-hot-toast';
import type { Dispute } from '@/types/database';

export function useDispute() {
  const { address } = useAccount();
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDisputes = useCallback(
    async (filters?: { jobId?: string; status?: string; raisedBy?: string }) => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters?.jobId) params.append('job_id', filters.jobId);
        if (filters?.status) params.append('status', filters.status);
        if (filters?.raisedBy) params.append('raised_by', filters.raisedBy);

        const res = await fetch(`/api/disputes?${params.toString()}`);
        const { data } = await res.json();
        setDisputes(data || []);
        return data;
      } catch (err) {
        console.error('Failed to fetch disputes:', err);
        toast.error('Failed to load disputes');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const raiseDispute = useCallback(
    async (jobId: string, raisedAgainst: string, reason: string) => {
      if (!address) {
        toast.error('Connect wallet first');
        return;
      }

      setIsLoading(true);
      const toastId = toast.loading('Raising dispute...');
      try {
        const res = await fetch('/api/disputes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            job_id: jobId,
            raised_by: address,
            raised_against: raisedAgainst,
            reason,
          }),
        });

        if (!res.ok) throw new Error('Failed to raise dispute');

        const { data } = await res.json();
        setDisputes((prev) => [data, ...prev]);
        toast.success('Dispute raised!', { id: toastId });
        return data;
      } catch (err: any) {
        toast.error(err.message || 'Failed to raise dispute', { id: toastId });
      } finally {
        setIsLoading(false);
      }
    },
    [address]
  );

  const resolveDispute = useCallback(
    async (
      disputeId: string,
      status: 'resolved' | 'closed',
      resolution: string,
      refundToClient: boolean,
      amountRefunded?: string
    ) => {
      setIsLoading(true);
      const toastId = toast.loading('Resolving dispute...');
      try {
        const res = await fetch(`/api/disputes/${disputeId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status,
            resolution,
            refund_to_client: refundToClient,
            amount_refunded: amountRefunded,
          }),
        });

        if (!res.ok) throw new Error('Failed to resolve dispute');

        const { data } = await res.json();
        setDisputes((prev) => prev.map((d) => (d.id === disputeId ? data : d)));
        toast.success('Dispute resolved!', { id: toastId });
        return data;
      } catch (err: any) {
        toast.error(err.message || 'Failed to resolve dispute', { id: toastId });
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    disputes,
    isLoading,
    fetchDisputes,
    raiseDispute,
    resolveDispute,
  };
}
