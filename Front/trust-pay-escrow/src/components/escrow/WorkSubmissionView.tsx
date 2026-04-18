'use client';

import { useState } from 'react';
import { useWorkSubmission } from '@/hooks/useWorkSubmission';
import { formatDeadline } from '@/lib/utils';
import { CheckCircle, MessageSquare, X, Eye } from 'lucide-react';
import type { WorkSubmission } from '@/types/database';

interface WorkSubmissionViewProps {
  jobId: string;
  submissions: WorkSubmission[];
  isClient: boolean;
  onApproved?: () => void;
}

export function WorkSubmissionView({
  jobId,
  submissions,
  isClient,
  onApproved,
}: WorkSubmissionViewProps) {
  const { approveSubmission, rejectSubmission } = useWorkSubmission();
  const [feedback, setFeedback] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!submissions.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <Eye className="h-8 w-8 text-muted-foreground mx-auto mb-3 opacity-50" />
        <p className="text-muted-foreground">No work submitted yet</p>
      </div>
    );
  }

  const handleApprove = async (submissionId: string) => {
    setIsProcessing(true);
    try {
      await approveSubmission(jobId, submissionId);
      onApproved?.();
    } finally {
      setIsProcessing(false);
      setSelectedSubmission(null);
    }
  };

  const handleReject = async (submissionId: string) => {
    if (!feedback.trim()) {
      alert('Please provide feedback');
      return;
    }
    setIsProcessing(true);
    try {
      await rejectSubmission(jobId, submissionId, feedback);
      setFeedback('');
    } finally {
      setIsProcessing(false);
      setSelectedSubmission(null);
    }
  };

  return (
    <div className="space-y-4">
      {submissions.map((sub) => (
        <div
          key={sub.id}
          className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-all"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-medium text-foreground truncate">
                  {sub.freelancer_address.slice(0, 10)}...{sub.freelancer_address.slice(-8)}
                </p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    sub.status === 'approved'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : sub.status === 'rejected'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {sub.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {formatDeadline(BigInt(new Date(sub.submission_date).getTime() / 1000))}
              </p>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                {sub.submission_text}
              </p>
            </div>

            {isClient && sub.status === 'pending' && (
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedSubmission(sub.id)}
                  disabled={isProcessing}
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 hover:bg-emerald-500/30 px-2.5 py-1.5 text-xs font-medium text-emerald-400 transition-all disabled:opacity-50"
                >
                  <CheckCircle className="h-3.5 w-3.5" />
                  Approve
                </button>
                <button
                  onClick={() => setSelectedSubmission(sub.id)}
                  disabled={isProcessing}
                  className="flex items-center gap-1.5 rounded-lg bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 px-2.5 py-1.5 text-xs font-medium text-red-400 transition-all disabled:opacity-50"
                >
                  <X className="h-3.5 w-3.5" />
                  Reject
                </button>
              </div>
            )}
          </div>

          {/* Feedback Form */}
          {selectedSubmission === sub.id && isClient && sub.status === 'pending' && (
            <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
              <div>
                <label className="text-xs font-medium text-foreground flex items-center gap-1.5 mb-2">
                  <MessageSquare className="h-3.5 w-3.5 text-amber-400" />
                  Your Feedback
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Approved! or Needs revision in..."
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(sub.id)}
                  disabled={isProcessing}
                  className="flex-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/50 px-3 py-1.5 text-xs font-medium text-white transition-all"
                >
                  Approve Work
                </button>
                <button
                  onClick={() => handleReject(sub.id)}
                  disabled={isProcessing || !feedback}
                  className="flex-1 rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 px-3 py-1.5 text-xs font-medium text-white transition-all"
                >
                  Reject & Send Feedback
                </button>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  disabled={isProcessing}
                  className="rounded-lg border border-white/10 hover:bg-white/5 px-3 py-1.5 text-xs font-medium transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
