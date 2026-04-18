# TrustPay Complete Implementation Guide

## Overview

TrustPay is a fully-featured blockchain-based escrow platform for secure freelance work transactions. This guide covers all implemented features and how to use them.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     User Interface                           │
│          (Next.js 14 + React 18 + TailwindCSS)              │
└──────────────────┬──────────────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
┌───────▼─────────┐  ┌───────▼──────────────┐
│   Smart Contract│  │  Backend/Database   │
│   (Ethereum)    │  │  (Supabase)         │
│  - Lock Funds   │  │  - User Profiles    │
│  - Release Pay  │  │  - Job Management   │
│  - Refund Logic │  │  - Work Submissions │
│                 │  │  - Disputes         │
└─────────────────┘  │  - Transactions     │
                     └────────────────────┘
```

## Core Features Implemented

### 1. User Management

#### User Roles
- **Client**: Posts jobs and locks payments
- **Freelancer**: Completes jobs and submits work
- **Both**: Users can be both client and freelancer

#### Profile System
- Create/update user profiles
- Upload profile information
- Skills tracking
- Hourly rate management
- Rating system (structure in place)
- IPFS image storage support

**API Endpoints:**
```
GET    /api/users/[address]              - Get user profile
POST   /api/users/[address]              - Create profile
PUT    /api/users/[address]              - Update profile
```

**Hook Usage:**
```javascript
const { profile, fetchProfile, updateProfile, createProfile } = useUserProfile();
```

### 2. Job Lifecycle Management

#### Job Statuses
- **open**: Created but not locked
- **accepted**: Freelancer accepted the job
- **in_progress**: Work is being done
- **submitted**: Freelancer submitted work
- **approved**: Work approved by client
- **completed**: Payment released
- **disputed**: Under dispute
- **cancelled**: Cancelled by client

#### Full Job Flow
1. Client creates job with title, description, payment amount, deadline
2. Description uploaded to IPFS
3. Payment locked in smart contract
4. Freelancer accepts and works on job
5. Freelancer submits work with description/link
6. Client reviews and either:
   - Approves → Payment released (trigger smart contract)
   - Requests changes → Back to in_progress
   - Raises dispute → Payment locked until resolved

**API Endpoints:**
```
GET    /api/jobs                         - List jobs (with filters)
POST   /api/jobs                         - Create new job
GET    /api/jobs/[id]                    - Get job details
PUT    /api/jobs/[id]                    - Update job status
```

**Database Fields:**
```typescript
- id: UUID (unique job identifier)
- job_number: Auto-increment for display
- title, description: Job details
- client_address, freelancer_address: Wallet addresses
- amount_eth, amount_wei: Payment amounts
- deadline: Job deadline (ISO format)
- status: Current job status
- funds_locked, funds_released: Payment state
- transaction_hash: Blockchain transaction
- work_submission_cid: IPFS reference to work
```

### 3. Work Submission System

Freelancers can submit their completed work with description and optional link.

#### Features:
- Text description of work
- Optional link to external work (GitHub, Figma, etc.)
- IPFS storage of submission
- DB tracking of submission status
- Client feedback on rejection

**API Endpoints:**
```
GET    /api/jobs/[jobId]/submissions           - Get submissions
POST   /api/jobs/[jobId]/submissions           - Submit work
PUT    /api/jobs/[jobId]/submissions/[id]      - Approve/reject

```

**Hook Usage:**
```javascript
const { 
  submitWork, 
  approveSubmission, 
  rejectSubmission, 
  fetchSubmissions 
} = useWorkSubmission();
```

**Components:**
```javascript
<WorkSubmissionForm job={job} />           // For freelancers to submit
<WorkSubmissionView submissions={[...]} /> // For clients to review
```

### 4. Dispute Resolution System

When a client is unsatisfied with work:

#### Dispute Workflow:
1. Client raises dispute with detailed reason
2. Payment remains locked in smart contract
3. System marks job as "disputed"
4. Admin can review and resolve:
   - Release payment to freelancer (work approved)
   - Refund client (work rejected)
5. Payment released based on resolution

#### Dispute States:
- **open**: Newly raised dispute
- **under_review**: Being reviewed
- **resolved**: Decision made
- **closed**: Resolved and funds transferred

**API Endpoints:**
```
GET    /api/disputes                      - List disputes
POST   /api/disputes                      - Raise dispute
PUT    /api/disputes/[id]                 - Resolve dispute
```

**Hook Usage:**
```javascript
const { raiseDispute, resolveDispute, fetchDisputes } = useDispute();
```

**Component:**
```javascript
<DisputeForm job={job} />  // For raising disputes
```

### 5. Payment & Transaction Tracking

#### Transaction Types:
- **lock**: Client locks payment in escrow
- **release**: Payment sent to freelancer on approval
- **refund**: Payment returned to client (dispute)
- **withdraw**: Freelancer withdraws funds

#### Transaction Tracking:
- Hash storage for blockchain verification
- Status: pending, confirmed, failed
- Block number tracking
- Complete audit trail

**Database Schema:**
```sql
transactions(
  id, job_id, transaction_hash, 
  from_address, to_address, amount_eth,
  transaction_type, status, block_number
)
```

### 6. Smart Contract Integration

Existing integration with escrow smart contract:

**Functions Called:**
```solidity
// Client - Create job and lock funds
createJob(freelancerAddress, amountWei, deadline)
lockFunds(jobId) // pays amountWei

// Client - Release or refund
releasePayment(jobId)  // transfer to freelancer
withdrawFunds(jobId)   // fallback for refund

// View functions
getJobDetails(jobId)   // returns job state
```

**Hook:**
```javascript
const { createJob, lockFunds, releasePayment, withdrawFunds } = useEscrow();
```

## Setup Instructions

### Prerequisites
- Node.js 18+
- Git
- Ethereum wallet (MetaMask or similar)
- Supabase account
- Web3.storage account (optional, for IPFS)

### Step 1: Install Dependencies

```bash
cd Front/trust-pay-escrow
npm install
```

Then run:
```
npm install @supabase/supabase-js
```

The package.json has been updated to include Supabase.

### Step 2: Set Up Supabase

1. Create a Supabase project at https://app.supabase.com
2. Run SQL commands from `DATABASE_SETUP.md`
3. Get your API keys from Settings → API
4. Configure RLS policies (optional but recommended)

### Step 3: Configure Environment Variables

Create `.env.local` in `Front/trust-pay-escrow/`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Smart Contracts (deploy these or use existing)
NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_CHAIN_ID=11155111

# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-project-id

# IPFS (Optional)
NEXT_PUBLIC_WEB3_STORAGE_TOKEN=your-token
```

### Step 4: Deploy Smart Contracts

You need to deploy two smart contracts:

#### A. Escrow Contract (`contracts/Escrow.sol`)
```solidity
// Core functions needed:
- createJob(freelancer, amount, deadline) → jobId
- lockFunds(jobId) payable
- releasePayment(jobId)
- withdrawFunds(jobId)
- getJobDetails(jobId) → struct
```

#### B. NFT Contract (`contracts/NFT.sol`)
```solidity
// For membership tiers:
- mint(tokenId) payable
- balanceOf(owner, tokenId) → uint256
```

Update contract addresses in `.env.local` after deployment.

### Step 5: Start Development Server

```bash
npm run dev
```

Navigate to http://localhost:3000

## Usage Workflows

### Client (Hirer) Workflow

1. **Setup Profile**
   - Navigate to `/dashboard/profile`
   - Create profile with details
   - Role: Client or Both

2. **Create Job**
   - Go to `/dashboard/hirer`
   - Click "New Job"
   - Fill in:
     - Job title
     - Description
     - Freelancer address
     - Payment amount (ETH)
     - Deadline
   - Click "Create Job"
   - Description uploaded to IPFS

3. **Lock Payment**
   - Job appears in your jobs list
   - Click "Lock 0.5 ETH" (or amount)
   - Confirm MetaMask transaction
   - Funds locked in smart contract

4. **Review Work**
   - When freelancer submits, see submission in job details
   - Review their work description and link
   - Option to:
     - **Approve** → Click button → Release payment
     - **Reject with feedback** → Provide comments → Back to pending
     - **Raise dispute** → If significant issue

5. **Release Payment**
   - Once satisfied, click "Release Payment"
   - Confirm transaction
   - Freelancer receives funds

### Freelancer Workflow

1. **Setup Profile**
   - Create profile with skills, hourly rate
   - Role: Freelancer or Both

2. **Browse Jobs**
   - Go to `/dashboard/freelancer`
   - See "Browse Jobs" tab
   - Filter by skills/payment/deadline
   - View job details

3. **Accept & Work**
   - Click "Accept Job"
   - Status changes to "in_progress"
   - Do your work off-platform

4. **Submit Work**
   - Go to job details
   - Click "Submit Work"
   - Describe what you completed
   - Add link to GitHub/file/etc (optional)
   - Submit

5. **Track Status**
   - "My Active Jobs" shows your submitted work
   - Wait for client to review
   - If rejected, get feedback and resubmit
   - Once approved, payment released automatically

### Dispute Workflow

**Raised by Client:**
1. Review submitted work
2. If not acceptable, click "Raise Dispute"
3. Explain reason in detail
4. Payment stays locked
5. Admin reviews
6. Funds either released or refunded based on decision

**Raised by Freelancer:**
1. If payment not released after long time
2. Can raise counter-dispute
3. Evidence can be provided
4. System admin or oracle resolves

## Hooks Reference

### useEscrow()
```javascript
const { createJob, lockFunds, releasePayment, withdrawFunds } = useEscrow();

await createJob(freelancerAddress, "0.5", deadline);
await lockFunds(jobId, "0.5");
await releasePayment(jobId);
await withdrawFunds(jobId);
```

### useJobs()
```javascript
const { 
  jobs, 
  hirerJobs,        // Client's created jobs
  freelancerActiveJobs,  // Assigned to this freelancer
  openJobs,          // Available to apply for
  addJob,
  updateJob
} = useJobs();
```

### useUserProfile()
```javascript
const { profile, fetchProfile, updateProfile, createProfile } = useUserProfile();

await fetchProfile(address);
await createProfile({
  name: "John",
  bio: "...",
  skills: ["React", "Solidity"],
  hourly_rate: "50",
  role: "freelancer"
});
```

### useWorkSubmission()
```javascript
const { 
  submitWork, 
  approveSubmission, 
  rejectSubmission,
  fetchSubmissions
} = useWorkSubmission();

await submitWork(jobId, ipfsCid, submissionText);
await approveSubmission(jobId, submissionId);
await rejectSubmission(jobId, submissionId, feedback);
```

### useDispute()
```javascript
const { raiseDispute, resolveDispute, fetchDisputes } = useDispute();

await raiseDispute(jobId, raisedAgainst, reason);
await resolveDispute(disputeId, "resolved", resolution, true, refundAmount);
```

## Component Reference

### Existing Components (Pre-built)
- `Navbar` - Header with wallet connect
- `ConnectButton` - Wallet connection
- `JobCard` - Display job info
- `JobTable` - List jobs with filters
- `EscrowActions` - Lock/Release buttons

### New Components (Just Built)
- `ProfileSetup` - User profile creation
- `WorkSubmissionForm` - Submit work
- `WorkSubmissionView` - Approve/reject work
- `DisputeForm` - Raise disputes

### Usage Example:
```jsx
import { WorkSubmissionForm } from '@/components/escrow/WorkSubmissionForm';
import { ProfileSetup } from '@/components/profile/ProfileSetup';

export default function MyPage() {
  const [job, setJob] = useState(null);
  
  return (
    <>
      <ProfileSetup />
      {job && <WorkSubmissionForm job={job} />}
    </>
  );
}
```

## Database Schema

See `DATABASE_SETUP.md` for complete SQL to create:
- `user_profiles` - User data and ratings
- `jobs` - Job listings and states
- `work_submissions` - Submitted work tracking
- `disputes` - Dispute management
- `transactions` - Transaction audit trail
- `auto_release_tasks` - Deadline-based automation

## API Routes Summary

Complete REST API endpoints:

```
USER MANAGEMENT
├── GET    /api/users/[address]
├── POST   /api/users/[address]
└── PUT    /api/users/[address]

JOBS
├── GET    /api/jobs?status=open&client=0x...
├── POST   /api/jobs
├── GET    /api/jobs/[id]
└── PUT    /api/jobs/[id]

WORK SUBMISSIONS
├── GET    /api/jobs/[jobId]/submissions
├── POST   /api/jobs/[jobId]/submissions
└── PUT    /api/jobs/[jobId]/submissions/[id]

DISPUTES
├── GET    /api/disputes?job_id=...&status=open
├── POST   /api/disputes
├── GET    /api/disputes/[id]
└── PUT    /api/disputes/[id]
```

## Testing the System

### Test Flow (Admin/Demo Account):

1. **Setup**
   ```bash
   npm run dev
   ```

2. **Create Test Accounts**
   - Account 1 (Client): 0x111...
   - Account 2 (Freelancer): 0x222...

3. **Complete Flow**
   - Client: Create job for Freelancer
   - Client: Lock 0.5 ETH
   - Freelancer: Accept job
   - Freelancer: Submit work
   - Client: Approve work
   - System: Release payment
   - Verify transaction on blockchain

4. **Dispute Test**
   - Create new job
   - Freelancer submits
   - Client raises dispute
   - Admin resolves with refund
   - Verify funds returned

## Monitoring & Debugging

### Supabase Console
- View real-time data
- Monitor API calls
- Check RLS policies
- View logs

### Browser Console
- GraphQL queries/mutations
- Network tab for API calls
- Redux DevTools for state

### Contract Events
- Listen to smart contract events
- Monitor fund transfers
- Track payment releases

## Production Deployment

1. **Deploy Smart Contracts** to mainnet
2. **Deploy Database** on Supabase (prod tier)
3. **Deploy Frontend** on Vercel/AWS
4. **Enable RLS** on all tables
5. **Set environment variables** for production
6. **Configure webhook** for transaction confirmations
7. **Monitoring** - Set up alerts for failures

## Common Issues & Solutions

### "Connect wallet first"
- Ensure MetaMask installed and connected
- Check network is Sepolia testnet
- See `NetworkChecker` component

### Supabase Connection Error
- Verify NEXT_PUBLIC_SUPABASE_URL and KEY
- Check RLS policies allow read/write
- Verify tables exist in database

### Transaction Failed
- Check account has enough ETH
- Verify contract address is correct
- Check gas prices aren't too high

### IPFS Upload Fails
- Ensure web3.storage API key set (optional)
- Falls back to in-memory storage
- Add error handling in useIPFS

## Next Steps & Enhancements

Future features to add:
- [ ] Automated deadline-based payment release
- [ ] Reputation/rating system with reviews
- [ ] Escrow arbitration with oracle
- [ ] Multi-currency support
- [ ] Batch job creation
- [ ] Advanced filtering and search
- [ ] Email notifications
- [ ] Real-time chat/messaging
- [ ] Portfolio showcase for freelancers
- [ ] Advanced analytics dashboard

## Support & Resources

- Smart Contract Docs: See `/contracts` folder
- Supabase Docs: https://supabase.com/docs
- Wagmi/Viem: https://wagmi.sh
- Next.js: https://nextjs.org/docs

---

**TrustPay - Secure Blockchain Escrow for Freelancers** ✨
