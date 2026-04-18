'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispute } from '@/hooks/useDispute';
import { AlertTriangle, Send } from 'lucide-react';
import type { Job } from '@/types';

const schema = z.object({
  reason: z.string().min(20, 'Please provide a detailed reason for the dispute'),
});

type FormValues = z.infer<typeof schema>;

interface DisputeFormProps {
  job: Job;
  onDisputeRaised?: () => void;
}

export function DisputeForm({ job, onDisputeRaised }: DisputeFormProps) {
  const { raiseDispute } = useDispute();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await raiseDispute(job.id.toString(), job.freelancer, data.reason);
      reset();
      onDisputeRaised?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-red-500/30 bg-red-500/10 backdrop-blur-sm p-6 space-y-4">
      <div>
        <h3 className="text-lg font-bold text-red-400 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Raise a Dispute
        </h3>
        <p className="text-sm text-red-300/70 mt-1">
          If you believe the work doesn&apos;t meet requirements, you can raise a dispute and lock the payment until resolution.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Dispute Reason</label>
          <textarea
            {...register('reason')}
            rows={4}
            placeholder="Explain why you believe there's a dispute. Be specific about what doesn't meet the requirements…"
            className="w-full rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all resize-none"
          />
          {errors.reason && <p className="text-xs text-red-400">{errors.reason.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 px-4 py-2.5 text-sm font-medium text-white transition-all"
        >
          <Send className="h-4 w-4" />
          {isSubmitting ? 'Submitting...' : 'Raise Dispute'}
        </button>
      </form>
    </div>
  );
}
