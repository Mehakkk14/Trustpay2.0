'use client';

import { useAccount } from 'wagmi';
import { NFT_ADDRESS } from '@/lib/contract';
import { NFT_ABI } from '@/lib/contract';
import { NFT_TIERS } from '@/lib/utils';
import { useWriteContract } from 'wagmi';
import { parseEther } from 'viem';
import toast from 'react-hot-toast';

export function useNFT() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  // For demo: simulate owned tiers based on mock data
  const ownedTiers = [1]; // Mock: user owns Bronze

  async function mintTier(tokenId: number, priceEth: string) {
    if (!address) { toast.error('Connect your wallet first'); return; }
    const toastId = toast.loading(`Minting ${NFT_TIERS[tokenId - 1]?.name} NFT…`);
    try {
      const hash = await writeContractAsync({
        address: NFT_ADDRESS,
        abi: NFT_ABI,
        functionName: 'mint',
        args: [BigInt(tokenId)],
        value: parseEther(priceEth),
      });
      toast.success(`NFT Minted! 🎉`, { id: toastId });
      return hash;
    } catch (err: unknown) {
      const msg = (err as { shortMessage?: string })?.shortMessage || 'Mint failed';
      toast.error(msg, { id: toastId });
    }
  }

  function isTierOwned(tokenId: number): boolean {
    return ownedTiers.includes(tokenId);
  }

  return { ownedTiers, mintTier, isTierOwned, tiers: NFT_TIERS };
}
