'use client';

import { useCallback, useState } from 'react';
import { useAccount } from 'wagmi';
import toast from 'react-hot-toast';
import type { WorkSubmission } from '@/types/database';

export function useWorkSubmission() {
  const { address } = useAccount();
  const [submissions, setSubmissions] = useState<WorkSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSubmissions = useCallback(async (jobId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/jobs/${jobId}/submissions`);
      const { data } = await res.json();
      setSubmissions(data || []);
      return data;
    } catch (err) {
      console.error('Failed to fetch submissions:', err);
      toast.error('Failed to load submissions');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitWork = useCallback(
    async (jobId: string, submissionCid: string, submissionText: string) => {
      if (!address) {
        toast.error('Connect wallet first');
        return;
      }

      setIsLoading(true);
      const toastId = toast.loading('Submitting work...');
      try {
        const res = await fetch(`/api/jobs/${jobId}/submissions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            freelancer_address: address,
            submission_cid: submissionCid,
            submission_text: submissionText,
          }),
        });

        if (!res.ok) throw new Error('Submission failed');

        const { data } = await res.json();
        setSubmissions((prev) => [data, ...prev]);
        toast.success('Work submitted!', { id: toastId });
        return data;
      } catch (err: any) {
        toast.error(err.message || 'Submission failed', { id: toastId });
      } finally {
        setIsLoading(false);
      }
    },
    [address]
  );

  const approveSubmission = useCallback(
    async (jobId: string, submissionId: string) => {
      setIsLoading(true);
      const toastId = toast.loading('Approving work...');
      try {
        const res = await fetch(`/api/jobs/${jobId}/submissions`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: submissionId,
            status: 'approved',
          }),
        });

        if (!res.ok) throw new Error('Approval failed');

        const { data } = await res.json();
        setSubmissions((prev) =>
          prev.map((s) => (s.id === submissionId ? { ...s, status: 'approved' } : s))
        );
        toast.success('Work approved!', { id: toastId });
        return data;
      } catch (err: any) {
        toast.error(err.message || 'Approval failed', { id: toastId });
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const rejectSubmission = useCallback(
    async (jobId: string, submissionId: string, feedback: string) => {
      setIsLoading(true);
      const toastId = toast.loading('Rejecting work...');
      try {
        const res = await fetch(`/api/jobs/${jobId}/submissions`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: submissionId,
            status: 'rejected',
            client_feedback: feedback,
          }),
        });

        if (!res.ok) throw new Error('Rejection failed');

        const { data } = await res.json();
        setSubmissions((prev) =>
          prev.map((s) => (s.id === submissionId ? { ...s, status: 'rejected' } : s))
        );
        toast.success('Work rejected', { id: toastId });
        return data;
      } catch (err: any) {
        toast.error(err.message || 'Rejection failed', { id: toastId });
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    submissions,
    isLoading,
    fetchSubmissions,
    submitWork,
    approveSubmission,
    rejectSubmission,
  };
}
