'use client';

import { useState } from 'react';
import { useNFT } from '@/hooks/useNFT';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

interface NFTCardProps {
  tier: {
    id: number;
    tokenId: number;
    name: string;
    description: string;
    benefits: string[];
    gradient: string;
    borderColor: string;
    icon: string;
    price: string;
  };
}

export function NFTCard({ tier }: NFTCardProps) {
  const { mintTier, isTierOwned } = useNFT();
  const [isMinting, setIsMinting] = useState(false);
  const owned = isTierOwned(tier.tokenId);

  const handleMint = async () => {
    setIsMinting(true);
    await mintTier(tier.tokenId, tier.price.replace(' ETH', ''));
    setIsMinting(false);
  };

  return (
    <div
      className={cn(
        'relative rounded-2xl border bg-gradient-to-br p-6 space-y-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl',
        tier.gradient,
        tier.borderColor,
        owned && 'ring-2 ring-emerald-500/40'
      )}
    >
      {/* Owned badge */}
      {owned && (
        <div className="absolute top-3 right-3 flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-2 py-1">
          <CheckCircle className="h-3 w-3" />
          Owned
        </div>
      )}

      {/* Icon + Name */}
      <div>
        <span className="text-4xl">{tier.icon}</span>
        <h3 className="text-xl font-bold text-foreground mt-2">{tier.name}</h3>
        <p className="text-sm text-muted-foreground">{tier.description}</p>
      </div>

      {/* Price */}
      <p className="text-2xl font-bold text-foreground">{tier.price}</p>

      {/* Benefits */}
      <ul className="space-y-1.5">
        {tier.benefits.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
            <CheckCircle className="h-3.5 w-3.5 mt-0.5 text-emerald-400 flex-shrink-0" />
            {b}
          </li>
        ))}
      </ul>

      {/* Mint Button */}
      <button
        onClick={handleMint}
        disabled={isMinting || owned}
        className={cn(
          'w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all duration-200',
          owned
            ? 'bg-emerald-500/20 text-emerald-400 cursor-default'
            : 'bg-white/10 hover:bg-white/20 text-foreground disabled:opacity-50'
        )}
      >
        {isMinting && <LoadingSpinner size="sm" />}
        {owned ? '✓ Already Owned' : isMinting ? 'Minting…' : `Mint ${tier.name} NFT`}
      </button>
    </div>
  );
}
