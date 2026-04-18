'use client';

import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { AlertTriangle } from 'lucide-react';

export function NetworkChecker() {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { isConnected } = useAccount();

  if (!isConnected || chainId === sepolia.id) return null;

  return (
    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-center gap-3 text-sm">
      <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0" />
      <div>
        <p className="font-medium text-amber-400">Wrong Network</p>
        <p className="text-muted-foreground text-xs">Please switch to Sepolia testnet.</p>
      </div>
      <button
        onClick={() => switchChain({ chainId: sepolia.id })}
        className="ml-auto rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 px-4 py-1.5 text-xs font-medium text-amber-400 transition-all"
      >
        Switch Network
      </button>
    </div>
  );
}
