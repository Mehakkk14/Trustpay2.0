// Database Types for Supabase

export interface UserProfile {
  id: string; // wallet address
  email?: string;
  name: string;
  bio: string;
  skills: string[];
  hourly_rate: string;
  profile_image_cid?: string;
  profile_image_url?: string;
  role: 'client' | 'freelancer' | 'both';
  rating: number;
  total_jobs_completed: number;
  total_earned: string;
  joined_at: string;
  updated_at: string;
}

export interface JobData {
  id: string; // UUID
  job_number: number; // auto-increment for display
  title: string;
  description: string;
  description_cid?: string;
  client_address: string; // wallet address
  freelancer_address: string; // wallet address
  amount_eth: string;
  amount_wei: string; // BigInt as string
  deadline: string; // ISO date
  status: 'open' | 'accepted' | 'in_progress' | 'submitted' | 'approved' | 'completed' | 'disputed' | 'cancelled';
  funds_locked: boolean;
  funds_released: boolean;
  disputed: boolean;
  dispute_reason?: string;
  contract_job_id?: string; // ID from blockchain
  transaction_hash?: string;
  lock_transaction_hash?: string;
  release_transaction_hash?: string;
  work_submission_cid?: string;
  work_submitted_at?: string;
  approved_at?: string;
  created_at: string;
  updated_at: string;
}

export interface WorkSubmission {
  id: string; // UUID
  job_id: string; // FK to JobData
  freelancer_address: string;
  submission_cid: string; // IPFS CID
  submission_text: string;
  submission_date: string; // ISO date
  status: 'pending' | 'approved' | 'rejected';
  client_feedback?: string;
  created_at: string;
  updated_at: string;
}

export interface Dispute {
  id: string; // UUID
  job_id: string; // FK to JobData
  raised_by: string; // wallet address
  raised_against: string; // wallet address
  reason: string;
  status: 'open' | 'under_review' | 'resolved' | 'closed';
  resolution?: string;
  refund_to_client: boolean;
  amount_refunded?: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string; // UUID
  job_id: string; // FK to JobData
  transaction_hash: string;
  from_address: string;
  to_address: string;
  amount_eth: string;
  transaction_type: 'lock' | 'release' | 'refund' | 'withdraw';
  status: 'pending' | 'confirmed' | 'failed';
  block_number?: number;
  created_at: string;
}

export interface AutoReleaseTask {
  id: string; // UUID
  job_id: string; // FK to JobData
  release_at: string; // ISO date
  status: 'scheduled' | 'completed' | 'cancelled';
  created_at: string;
  executed_at?: string;
}
