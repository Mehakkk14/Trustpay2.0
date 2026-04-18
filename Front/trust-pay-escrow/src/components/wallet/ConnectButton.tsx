'use client';

import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import { Wallet } from 'lucide-react';

export function ConnectButton() {
  return (
    <RainbowConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        if (!ready) return <div className="h-9 w-28 rounded-lg bg-white/5 animate-pulse" />;

        if (!connected) {
          return (
            <button
              onClick={openConnectModal}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200"
            >
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </button>
          );
        }

        if (chain.unsupported) {
          return (
            <button
              onClick={openChainModal}
              className="flex items-center gap-2 rounded-lg bg-red-600 hover:bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-all"
            >
              Wrong Network
            </button>
          );
        }

        return (
          <div className="flex items-center gap-2">
            <button
              onClick={openChainModal}
              className="hidden sm:flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-all"
            >
              {chain.hasIcon && chain.iconUrl && (
                <img src={chain.iconUrl} alt={chain.name} className="h-3.5 w-3.5 rounded-full" />
              )}
              {chain.name}
            </button>
            <button
              onClick={openAccountModal}
              className="flex items-center gap-2 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-2 text-sm font-medium text-indigo-400 hover:bg-indigo-500/20 transition-all"
            >
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              {account.displayName}
            </button>
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
}
