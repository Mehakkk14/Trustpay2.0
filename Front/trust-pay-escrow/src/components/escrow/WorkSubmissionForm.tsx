'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useWorkSubmission } from '@/hooks/useWorkSubmission';
import { useIPFS } from '@/hooks/useIPFS';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { FileText, Upload } from 'lucide-react';
import type { Job } from '@/types';

const schema = z.object({
  submissionText: z.string().min(20, 'Please provide details about your work'),
  workLink: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface WorkSubmissionFormProps {
  job: Job;
  onSubmitted?: () => void;
}

export function WorkSubmissionForm({ job, onSubmitted }: WorkSubmissionFormProps) {
  const { submitWork } = useWorkSubmission();
  const { uploadText } = useIPFS();
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
      // Upload submission to IPFS
      const cid = await uploadText(
        JSON.stringify({
          text: data.submissionText,
          link: data.workLink,
          submittedAt: new Date().toISOString(),
        })
      );

      if (!cid) throw new Error('IPFS upload failed');

      // Save to database
      await submitWork(job.id.toString(), cid, data.submissionText);

      reset();
      onSubmitted?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 space-y-6">
      <div>
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Upload className="h-5 w-5 text-emerald-400" />
          Submit Your Work
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Describe what you&apos;ve completed and provide details about the deliverables.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Submission Text */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 text-emerald-400" />
            Work Description
          </label>
          <textarea
            {...register('submissionText')}
            rows={5}
            placeholder="Describe your work, what you delivered, and any relevant details…"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
          />
          {errors.submissionText && (
            <p className="text-xs text-red-400">{errors.submissionText.message}</p>
          )}
        </div>

        {/* Work Link (Optional) */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Work Link (Optional)</label>
          <input
            {...register('workLink')}
            type="url"
            placeholder="https://github.com/... or any relevant link"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/50 px-4 py-2.5 text-sm font-medium text-white transition-all"
        >
          {isSubmitting ? <LoadingSpinner size="sm" /> : <Upload className="h-4 w-4" />}
          {isSubmitting ? 'Submitting...' : 'Submit Work'}
        </button>
      </form>
    </div>
  );
}
