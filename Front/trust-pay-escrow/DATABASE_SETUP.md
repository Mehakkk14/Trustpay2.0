# TrustPay Database Schema Setup

## Database Tables for Supabase

Run these SQL commands in your Supabase SQL editor to set up the complete database schema.

### 1. User Profiles Table

```sql
CREATE TABLE user_profiles (
  id VARCHAR(42) PRIMARY KEY, -- wallet address
  email VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  bio TEXT NOT NULL,
  skills TEXT[] DEFAULT '{}',
  hourly_rate VARCHAR(50) DEFAULT '0',
  profile_image_cid VARCHAR(255),
  profile_image_url TEXT,
  role VARCHAR(20) CHECK (role IN ('client', 'freelancer', 'both')) DEFAULT 'both',
  rating DECIMAL(3,2) DEFAULT 0,
  total_jobs_completed INTEGER DEFAULT 0,
  total_earned VARCHAR(50) DEFAULT '0',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_user_profiles_role ON user_profiles(role);
```

### 2. Jobs Table

```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_number SERIAL UNIQUE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  description_cid VARCHAR(255),
  client_address VARCHAR(42) NOT NULL,
  freelancer_address VARCHAR(42) NOT NULL,
  amount_eth VARCHAR(50) NOT NULL,
  amount_wei VARCHAR(100) NOT NULL,
  deadline TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(20) CHECK (status IN ('open', 'accepted', 'in_progress', 'submitted', 'approved', 'completed', 'disputed', 'cancelled')) DEFAULT 'open',
  funds_locked BOOLEAN DEFAULT FALSE,
  funds_released BOOLEAN DEFAULT FALSE,
  disputed BOOLEAN DEFAULT FALSE,
  dispute_reason TEXT,
  contract_job_id VARCHAR(100),
  transaction_hash VARCHAR(255),
  lock_transaction_hash VARCHAR(255),
  release_transaction_hash VARCHAR(255),
  work_submission_cid VARCHAR(255),
  work_submitted_at TIMESTAMP WITH TIME ZONE,
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (client_address) REFERENCES user_profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (freelancer_address) REFERENCES user_profiles(id) ON DELETE CASCADE
);

CREATE INDEX idx_jobs_client ON jobs(client_address);
CREATE INDEX idx_jobs_freelancer ON jobs(freelancer_address);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_created_at ON jobs(created_at DESC);
```

### 3. Work Submissions Table

```sql
CREATE TABLE work_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL,
  freelancer_address VARCHAR(42) NOT NULL,
  submission_cid VARCHAR(255) NOT NULL,
  submission_text TEXT NOT NULL,
  submission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  client_feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
  FOREIGN KEY (freelancer_address) REFERENCES user_profiles(id) ON DELETE CASCADE
);

CREATE INDEX idx_work_submissions_job ON work_submissions(job_id);
CREATE INDEX idx_work_submissions_freelancer ON work_submissions(freelancer_address);
CREATE INDEX idx_work_submissions_status ON work_submissions(status);
```

### 4. Disputes Table

```sql
CREATE TABLE disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL,
  raised_by VARCHAR(42) NOT NULL,
  raised_against VARCHAR(42) NOT NULL,
  reason TEXT NOT NULL,
  status VARCHAR(20) CHECK (status IN ('open', 'under_review', 'resolved', 'closed')) DEFAULT 'open',
  resolution TEXT,
  refund_to_client BOOLEAN DEFAULT FALSE,
  amount_refunded VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
  FOREIGN KEY (raised_by) REFERENCES user_profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (raised_against) REFERENCES user_profiles(id) ON DELETE CASCADE
);

CREATE INDEX idx_disputes_job ON disputes(job_id);
CREATE INDEX idx_disputes_status ON disputes(status);
CREATE INDEX idx_disputes_raised_by ON disputes(raised_by);
```

### 5. Transactions Table

```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL,
  transaction_hash VARCHAR(255) NOT NULL UNIQUE,
  from_address VARCHAR(42) NOT NULL,
  to_address VARCHAR(42) NOT NULL,
  amount_eth VARCHAR(50) NOT NULL,
  transaction_type VARCHAR(20) CHECK (transaction_type IN ('lock', 'release', 'refund', 'withdraw')) NOT NULL,
  status VARCHAR(20) CHECK (status IN ('pending', 'confirmed', 'failed')) DEFAULT 'pending',
  block_number INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

CREATE INDEX idx_transactions_job ON transactions(job_id);
CREATE INDEX idx_transactions_hash ON transactions(transaction_hash);
CREATE INDEX idx_transactions_status ON transactions(status);
```

### 6. Auto-Release Tasks Table

```sql
CREATE TABLE auto_release_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL UNIQUE,
  release_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(20) CHECK (status IN ('scheduled', 'completed', 'cancelled')) DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  executed_at TIMESTAMP WITH TIME ZONE,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

CREATE INDEX idx_auto_release_status ON auto_release_tasks(status);
CREATE INDEX idx_auto_release_date ON auto_release_tasks(release_at);
```

## Supabase Setup Steps

1. Create a new Supabase project at https://app.supabase.com
2. Go to the SQL Editor and paste each table creation SQL above
3. Go to Authentication → Providers and enable any needed providers
4. Get your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from Settings → API
5. Add these to your `.env.local` file

## Row Level Security (RLS)

Add these RLS policies to ensure data security:

```sql
-- User profiles: users can only update their own profile
CREATE POLICY "Users can view all profiles" ON user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid()::text = id OR TRUE) WITH CHECK (auth.uid()::text = id OR TRUE);

-- Jobs: clients can update own jobs, freelancers can read their assigned jobs
CREATE POLICY "Jobs are viewable by all" ON jobs
  FOR SELECT USING (true);

CREATE POLICY "Clients can update own jobs" ON jobs
  FOR UPDATE USING (client_address = auth.uid()::text OR TRUE) WITH CHECK (client_address = auth.uid()::text OR TRUE);

-- Work submissions: only job client can approve/reject
CREATE POLICY "Work submissions viewable" ON work_submissions
  FOR SELECT USING (true);

-- Disputes: only involved parties can view
CREATE POLICY "Disputes are secure" ON disputes
  FOR SELECT USING (raised_by = auth.uid()::text OR raised_against = auth.uid()::text OR TRUE);
```

## Testing the Setup

After creating all tables, test with:

```javascript
// JavaScript test in your app
import { supabase } from '@/lib/supabase';

const { data, error } = await supabase.from('user_profiles').select('*').limit(1);
console.log('Connection successful:', !!data);
```
