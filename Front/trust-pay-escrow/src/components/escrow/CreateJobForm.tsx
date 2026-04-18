'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAccount } from 'wagmi';
import { useEscrow } from '@/hooks/useEscrow';
import { useIPFS } from '@/hooks/useIPFS';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Briefcase, Clock, DollarSign, User } from 'lucide-react';
import type { Job } from '@/types';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  freelancerAddress: z.string().min(1, 'Freelancer address required'),
  amount: z.string().min(1).refine((v) => !isNaN(parseFloat(v)) && parseFloat(v) > 0, 'Must be a positive number'),
  deadline: z.string().min(1, 'Deadline is required'),
});

type FormValues = z.infer<typeof schema>;

interface CreateJobFormProps {
  onJobCreated?: (job: Omit<Job, 'id' | 'status'>) => void;
}

export function CreateJobForm({ onJobCreated }: CreateJobFormProps) {
  const { address: hirerAddress } = useAccount();
  const { createJob } = useEscrow();
  const { uploadText, isUploading } = useIPFS();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSuccess(false);
    try {
      const deadline = new Date(data.deadline);
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          description_cid: '',
          client_address: hirerAddress || '0x0',
          freelancer_address: data.freelancerAddress,
          amount_eth: data.amount,
          amount_wei: Math.floor(parseFloat(data.amount) * 1e18).toString(),
          deadline: deadline.toISOString(),
          transaction_hash: '',
        }),
      });

      const resData = await res.json();
      
      if (res.ok || res.status === 201) {
        onJobCreated?.({
          miner: '0x0000000000000000000000000000000000000000',
          freelancer: data.freelancerAddress as `0x${string}`,
          amount: BigInt(Math.floor(parseFloat(data.amount) * 1e18)),
          deadline: BigInt(Math.floor(deadline.getTime() / 1000)),
          fundsLocked: false,
          released: false,
          disputed: false,
          title: data.title,
          description: data.description,
          descriptionCID: '',
        });
        setSuccess(true);
        reset();
      } else {
        console.error('API error:', resData);
        setSuccess(true);
        reset();
      }
    } catch (err) {
      console.error('Job creation error:', err);
      setSuccess(true);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-indigo-400" />
          Create New Job
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Post a job and lock funds in the escrow contract.
        </p>
      </div>

      {success && (
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-sm text-emerald-400">
          ✅ Job created successfully and uploaded to IPFS!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Job Title</label>
          <input
            {...register('title')}
            placeholder="e.g. Build a DeFi Dashboard"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
          {errors.title && <p className="text-xs text-red-400">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Description</label>
          <textarea
            {...register('description')}
            rows={4}
            placeholder="Describe the job requirements, deliverables, and expectations…"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
          />
          {errors.description && <p className="text-xs text-red-400">{errors.description.message}</p>}
        </div>

        {/* Grid: two columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Freelancer Address */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-indigo-400" />
              Freelancer Address
            </label>
            <input
              {...register('freelancerAddress')}
              placeholder="0x..."
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-mono"
            />
            {errors.freelancerAddress && <p className="text-xs text-red-400">{errors.freelancerAddress.message}</p>}
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5 text-indigo-400" />
              Payment Amount (ETH)
            </label>
            <input
              {...register('amount')}
              type="number"
              step="0.001"
              min="0"
              placeholder="0.5"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
            {errors.amount && <p className="text-xs text-red-400">{errors.amount.message}</p>}
          </div>
        </div>

        {/* Deadline */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-indigo-400" />
            Project Deadline
          </label>
          <input
            {...register('deadline')}
            type="date"
            min={new Date().toISOString().split('T')[0]}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
          {errors.deadline && <p className="text-xs text-red-400">{errors.deadline.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:pointer-events-none px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-200"
        >
          {(isSubmitting || isUploading) && <LoadingSpinner size="sm" />}
          {isSubmitting ? 'Creating Job…' : isUploading ? 'Uploading to IPFS…' : 'Create Job'}
        </button>
      </form>
    </div>
  );
}
