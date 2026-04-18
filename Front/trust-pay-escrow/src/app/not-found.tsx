import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-center px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
        <Shield className="h-8 w-8 text-indigo-400" />
      </div>
      <h1 className="text-6xl font-black text-indigo-400">404</h1>
      <h2 className="text-2xl font-bold text-foreground">Page Not Found</h2>
      <p className="text-muted-foreground max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-6 py-3 text-sm font-semibold text-white transition-all"
      >
        Go Home
      </Link>
    </div>
  );
}
