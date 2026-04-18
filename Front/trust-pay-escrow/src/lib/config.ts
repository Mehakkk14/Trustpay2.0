import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, polygonMumbai, mainnet } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Trust Pay Escrow',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [sepolia, polygonMumbai, mainnet],
  ssr: true,
});
