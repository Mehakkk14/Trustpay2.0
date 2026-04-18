'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';

export default function DashboardIndexPage() {
  const { role } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    router.replace(role === 'hirer' ? '/dashboard/hirer' : '/dashboard/freelancer');
  }, [role, router]);

  return null;
}
