'use client';

import { useNFT } from '@/hooks/useNFT';
import { NFTCard } from './NFTCard';
import { Gem } from 'lucide-react';

export function NFTSection() {
  const { tiers } = useNFT();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Gem className="h-6 w-6 text-purple-400" />
          NFT Membership Tiers
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Unlock exclusive benefits by minting a membership NFT. Higher tiers offer reduced fees, priority job access, and more.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiers.map((tier) => (
          <NFTCard key={tier.id} tier={tier} />
        ))}
      </div>
    </div>
  );
}
