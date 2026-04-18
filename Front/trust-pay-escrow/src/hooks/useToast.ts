'use client';

import toast from 'react-hot-toast';

export function useToast() {
  const success = (msg: string) => toast.success(msg);
  const error = (msg: string) => toast.error(msg);
  const loading = (msg: string) => toast.loading(msg);
  const dismiss = (id?: string) => toast.dismiss(id);
  const promise = <T>(
    p: Promise<T>,
    msgs: { loading: string; success: string; error: string }
  ) => toast.promise(p, msgs);

  return { success, error, loading, dismiss, promise };
}
