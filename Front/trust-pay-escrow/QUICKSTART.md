# TrustPay Quick Start Guide

Get the project running in 5 minutes!

## Step 1: Install & Setup (2 minutes)

```bash
cd Front/trust-pay-escrow

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
```

## Step 2: Configure Supabase (2 minutes)

1. Go to https://app.supabase.com and create a project
2. Copy your project URL and anon key
3. Paste into `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

## Step 3: Create Database (1 minute - Optional for Local Testing)

For now, you can skip this and use mock data. When ready:
1. Open Supabase SQL Editor
2. Copy all SQL from `DATABASE_SETUP.md`
3. Paste and run

## Step 4: Add Smart Contract Addresses

Get these from your deployed contracts or use test addresses:

```env
NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS=0x...your_address
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x...your_address
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

## Step 5: Run!

```bash
npm run dev
```

Open http://localhost:3000

## Test the System

### With Mock Data (No Supabase needed yet):
1. Connect wallet (MetaMask)
2. Switch to Sepolia testnet
3. Browse jobs, create jobs, etc.

### With Real Database:
1. Follow Database setup on [DATABASE_SETUP.md](DATABASE_SETUP.md)
2. Test with real data persistent across sessions

## File Structure

```
src/
├── app/
│   ├── dashboard/           # Main dashboards
│   │   ├── hirer/           # Client dashboard
│   │   ├── freelancer/      # Freelancer dashboard
│   │   └── profile/         # Profile management
│   └── api/
│       ├── users/           # User profile API
│       ├── jobs/            # Job management API
│       └── disputes/        # Dispute API
├── components/
│   ├── escrow/              # Escrow-related components
│   │   ├── WorkSubmissionForm.tsx    # NEW ✨
│   │   ├── WorkSubmissionView.tsx    # NEW ✨
│   │   └── DisputeForm.tsx           # NEW ✨
│   └── profile/
│       └── ProfileSetup.tsx          # NEW ✨
├── hooks/
│   ├── useUserProfile.ts    # NEW ✨
│   ├── useWorkSubmission.ts # NEW ✨
│   └── useDispute.ts        # NEW ✨
└── lib/
    ├── supabase.ts          # NEW ✨ Database client
    └── contract.ts          # Smart contract ABIs
```

## Key Components to Use

### 1. Profile Setup
```jsx
import { ProfileSetup } from '@/components/profile/ProfileSetup';

export default function MyPage() {
  return <ProfileSetup />;
}
```

### 2. Work Submission
```jsx
import { WorkSubmissionForm } from '@/components/escrow/WorkSubmissionForm';

export default function JobDetailPage() {
  const job = /* load job */;
  return <WorkSubmissionForm job={job} />;
}
```

### 3. Work Review
```jsx
import { WorkSubmissionView } from '@/components/escrow/WorkSubmissionView';

export default function JobDetailPage() {
  const submissions = /* load submissions */;
  return <WorkSubmissionView submissions={submissions} isClient={true} />;
}
```

### 4. Raise Dispute
```jsx
import { DisputeForm } from '@/components/escrow/DisputeForm';

export default function JobDetailPage() {
  const job = /* load job */;
  return <DisputeForm job={job} />;
}
```

## Common Tasks

### Create New Job (Client)
1. Go to `/dashboard/hirer`
2. Click "New Job"
3. Fill form and submit
4. Click "Lock ETH" to fund escrow

### Submit Work (Freelancer)
1. Go to `/dashboard/freelancer`
2. Click "My Active Jobs"
3. Find your job
4. Click "Submit Work"
5. Fill form and submit

### Approve Work (Client)
1. Click job to view details
2. See "Work Submissions" section
3. Review submission
4. Click "Approve" or "Request Changes"
5. If approved, "Release Payment" becomes active

### Raise Dispute
1. If unhappy with work
2. Scroll to "Raise Dispute"
3. Explain reason
4. Submit
5. Payment locked until resolved

## Hooks Reference

All new hooks follow Next.js conventions:

```javascript
// Profile
const { profile, fetchProfile, updateProfile, createProfile } = useUserProfile();

// Work
const { submitWork, approveSubmission, rejectSubmission, fetchSubmissions } = useWorkSubmission();

// Disputes
const { raiseDispute, resolveDispute, fetchDisputes } = useDispute();
```

## Environment Variables Explained

```env
# Supabase - Database & Auth
NEXT_PUBLIC_SUPABASE_URL          # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY     # Public API key

# Smart Contracts
NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS   # Deployed escrow contract
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS      # Deployed NFT contract
NEXT_PUBLIC_CHAIN_ID                  # 11155111 = Sepolia testnet

# Wallet Connection
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID  # From WalletConnect Cloud

# IPFS (Optional)
NEXT_PUBLIC_WEB3_STORAGE_TOKEN        # For persistent IPFS uploads
```

## Troubleshooting

### "Contract address not found"
→ Add `NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS` to `.env.local`

### "Supabase connection error"
→ Check URL and key in `.env.local`
→ Supabase tables might not be created yet

### "Wallet not connecting"
→ Install MetaMask or other web3 wallet
→ Switch to Sepolia testnet
→ Reload page

### "IPFS upload fails"
→ That's OK - falls back to memory
→ Add Web3.storage token for persistence

## Next Steps

1. ✅ Test with mock data
2. ✅ Connect real wallet
3. ✅ Create Supabase project
4. ✅ Deploy smart contracts
5. ✅ Create database tables
6. ✅ Configure environment variables
7. ✅ Test with real data
8. ✅ Deploy to production

## Documentation

For more details, see:
- `IMPLEMENTATION_GUIDE.md` - Complete system guide
- `DATABASE_SETUP.md` - Database schema
- `COMPLETION_SUMMARY.md` - Full feature list
- `DESIGN_SYSTEM.md` - UI/UX guidelines

## Join the Community

Issues? Questions? Ideas?
→ Open an issue in GitHub
→ Check existing discussions
→ Read the full docs

---

## You're All Set! 🚀

The project is ready to run. Start with:

```bash
npm run dev
```

Then explore:
- http://localhost:3000 - Homepage
- http://localhost:3000/dashboard/hirer - Create jobs
- http://localhost:3000/dashboard/freelancer - Find jobs
- http://localhost:3000/dashboard/profile - Your profile

---

**TrustPay - Secure Blockchain Escrow for Freelancers** ✨

Enjoy building the future of freelance work!
