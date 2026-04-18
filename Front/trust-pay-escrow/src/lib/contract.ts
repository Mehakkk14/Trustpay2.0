export const ESCROW_ABI = [
  {
    name: 'createJob',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'freelancer', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
    outputs: [{ name: 'jobId', type: 'uint256' }],
  },
  {
    name: 'lockFunds',
    type: 'function',
    stateMutability: 'payable',
    inputs: [{ name: 'jobId', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'releasePayment',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'jobId', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'withdrawFunds',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'jobId', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'getJobDetails',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'jobId', type: 'uint256' }],
    outputs: [
      { name: 'miner', type: 'address' },
      { name: 'freelancer', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
      { name: 'fundsLocked', type: 'bool' },
      { name: 'released', type: 'bool' },
      { name: 'disputed', type: 'bool' },
    ],
  },
  {
    name: 'JobCreated',
    type: 'event',
    inputs: [
      { name: 'jobId', type: 'uint256', indexed: true },
      { name: 'miner', type: 'address', indexed: true },
      { name: 'freelancer', type: 'address', indexed: true },
      { name: 'amount', type: 'uint256', indexed: false },
      { name: 'deadline', type: 'uint256', indexed: false },
    ],
  },
  {
    name: 'FundsLocked',
    type: 'event',
    inputs: [
      { name: 'jobId', type: 'uint256', indexed: true },
      { name: 'amount', type: 'uint256', indexed: false },
    ],
  },
  {
    name: 'PaymentReleased',
    type: 'event',
    inputs: [{ name: 'jobId', type: 'uint256', indexed: true }],
  },
] as const;

export const NFT_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'ownerOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [{ name: '', type: 'address' }],
  },
  {
    name: 'mint',
    type: 'function',
    stateMutability: 'payable',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [],
  },
] as const;

export const ESCROW_ADDRESS = (process.env.NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS ||
  '0x0000000000000000000000000000000000000000') as `0x${string}`;

export const NFT_ADDRESS = (process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS ||
  '0x0000000000000000000000000000000000000000') as `0x${string}`;
