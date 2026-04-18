# Trust Pay Escrow 🔐

A production-ready crypto escrow platform built with **Next.js 14**, **RainbowKit v2**, **wagmi v2**, **viem v2**, and **Tailwind CSS**.

---

## ✨ Features

- **Multi-Wallet Support** – MetaMask, WalletConnect, Coinbase Wallet via RainbowKit v2
- **Role-Based Dashboards** – Hirer (post jobs, lock funds, release payment) & Freelancer (browse jobs, active contracts)
- **Smart Contract Escrow** – `createJob`, `lockFunds`, `releasePayment`, `withdrawFunds`
- **IPFS Integration** – Job descriptions uploaded via web3.storage; profile images pinned to IPFS
- **NFT Membership Tiers** – Bronze, Silver, Gold, Diamond with benefits and mint flow
- **Profile Page** – Edit name, bio, skills, hourly rate; avatar upload to IPFS
- **Dark / Light Theme** – next-themes with Tailwind CSS
- **Toast Notifications** – react-hot-toast for all transactions
- **Network Guard** – Warns and switches to Sepolia if on wrong chain

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and set at minimum:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

> Get a free Project ID at [cloud.walletconnect.com](https://cloud.walletconnect.com)

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (dashboard)/
│   │   ├── hirer/page.tsx       # Hirer dashboard
│   │   ├── freelancer/page.tsx  # Freelancer dashboard + NFT tiers
│   │   └── profile/page.tsx     # User profile editor
│   ├── layout.tsx               # Root layout + providers
│   └── page.tsx                 # Landing page
├── components/
│   ├── escrow/                  # CreateJobForm, JobCard, JobTable, EscrowActions
│   ├── nft/                     # NFTCard, NFTSection
│   ├── shared/                  # Navbar, Footer, ThemeToggle, RoleToggle
│   └── wallet/                  # ConnectButton, NetworkChecker
├── hooks/
│   ├── useEscrow.ts             # Contract write hooks
│   ├── useJobs.ts               # Job state + mock data
│   ├── useNFT.ts                # NFT ownership + mint
│   ├── useIPFS.ts               # web3.storage upload
│   └── useToast.ts              # Toast wrapper
├── lib/
│   ├── config.ts                # wagmi + RainbowKit config
│   ├── contract.ts              # ABIs + addresses
│   ├── providers.tsx            # Root providers component
│   └── utils.ts                 # cn, formatETH, NFT_TIERS, etc.
├── store/
│   └── useAppStore.ts           # Zustand global store (role, address)
└── types/
    └── index.ts                 # TypeScript types
```

---

## 🔧 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | ✅ | WalletConnect Cloud project ID |
| `NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS` | Optional | Deployed escrow contract address |
| `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS` | Optional | Deployed NFT contract address |
| `NEXT_PUBLIC_CHAIN_ID` | Optional | Default chain (11155111 = Sepolia) |
| `NEXT_PUBLIC_WEB3_STORAGE_TOKEN` | Optional | web3.storage API token for real IPFS |

---

## 🏗️ Tech Stack

| Package | Version |
|---|---|
| Next.js | 14 (App Router) |
| RainbowKit | v2 |
| wagmi | v2 |
| viem | v2 |
| Zustand | latest |
| Tailwind CSS | v3 |
| Framer Motion | latest |
| react-hot-toast | latest |
| react-hook-form + zod | latest |

---

## 🧩 Smart Contract ABI

The escrow contract interface:

```solidity
function createJob(address freelancer, uint256 amount, uint256 deadline) external returns (uint256 jobId)
function lockFunds(uint256 jobId) external payable
function releasePayment(uint256 jobId) external
function withdrawFunds(uint256 jobId) external
function getJobDetails(uint256 jobId) external view returns (...)
```

---

## 📄 License

MIT
