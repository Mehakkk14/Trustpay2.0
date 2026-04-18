export type Role = 'hirer' | 'freelancer';

export interface Job {
  id: bigint;
  miner: `0x${string}`;
  freelancer: `0x${string}`;
  amount: bigint;
  deadline: bigint;
  fundsLocked: boolean;
  released: boolean;
  disputed: boolean;
  title?: string;
  description?: string;
  descriptionCID?: string;
  status: JobStatus;
}

export type JobStatus =
  | 'open'         // created, funds not locked
  | 'active'       // funds locked
  | 'completed'    // payment released
  | 'disputed'
  | 'cancelled';

export interface NFTTier {
  id: number;
  tokenId: number;
  name: string;
  description: string;
  benefits: string[];
  color: string;
  gradient: string;
  icon: string;
  price: string;
}

export interface UserProfile {
  address: string;
  name: string;
  bio: string;
  skills: string[];
  hourlyRate: string;
  profileImageCID?: string;
  profileImageUrl?: string;
  joinedAt: string;
}

export interface CreateJobInput {
  title: string;
  description: string;
  freelancerAddress: `0x${string}`;
  amount: string; // in ETH
  deadline: Date;
}

export interface TransactionState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  hash?: `0x${string}`;
  error?: Error | null;
}
