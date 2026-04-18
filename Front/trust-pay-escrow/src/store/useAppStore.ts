import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Role } from '@/types';
import type { UserProfile } from '@/types/database';

interface AppState {
  role: Role;
  setRole: (role: Role) => void;
  address: `0x${string}` | null;
  setAddress: (address: `0x${string}` | null) => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;
  network: string;
  setNetwork: (network: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      role: 'hirer',
      setRole: (role) => set({ role }),
      address: null,
      setAddress: (address) => set({ address }),
      userProfile: null,
      setUserProfile: (profile) => set({ userProfile: profile }),
      isConnected: false,
      setIsConnected: (connected) => set({ isConnected: connected }),
      network: 'sepolia',
      setNetwork: (network) => set({ network }),
    }),
    { name: 'trust-pay-app-store' }
  )
);
