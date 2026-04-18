'use client';

import { useCallback, useState } from 'react';
import { useAccount } from 'wagmi';
import toast from 'react-hot-toast';
import type { UserProfile } from '@/types/database';

export function useUserProfile() {
  const { address } = useAccount();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfile = useCallback(async (userAddress?: string) => {
    const addr = userAddress || address;
    if (!addr) return;

    setIsLoading(true);
    try {
      const res = await fetch(`/api/users/${addr}`);
      const { data } = await res.json();
      setProfile(data);
      return data;
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      toast.error('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  }, [address]);

  const updateProfile = useCallback(
    async (updates: Partial<UserProfile>) => {
      if (!address) {
        toast.error('Connect wallet first');
        return;
      }

      setIsLoading(true);
      const toastId = toast.loading('Updating profile...');
      try {
        const res = await fetch(`/api/users/${address}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        });

        if (!res.ok) throw new Error('Update failed');

        const { data } = await res.json();
        setProfile(data);
        toast.success('Profile updated!', { id: toastId });
        return data;
      } catch (err: any) {
        toast.error(err.message || 'Profile update failed', { id: toastId });
      } finally {
        setIsLoading(false);
      }
    },
    [address]
  );

  const createProfile = useCallback(
    async (profileData: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>) => {
      if (!address) {
        toast.error('Connect wallet first');
        return;
      }

      setIsLoading(true);
      const toastId = toast.loading('Creating profile...');
      try {
        const res = await fetch(`/api/users/${address}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileData),
        });

        if (!res.ok) throw new Error('Creation failed');

        const { data } = await res.json();
        setProfile(data);
        toast.success('Profile created!', { id: toastId });
        return data;
      } catch (err: any) {
        toast.error(err.message || 'Profile creation failed', { id: toastId });
      } finally {
        setIsLoading(false);
      }
    },
    [address]
  );

  return {
    profile,
    isLoading,
    fetchProfile,
    updateProfile,
    createProfile,
  };
}
