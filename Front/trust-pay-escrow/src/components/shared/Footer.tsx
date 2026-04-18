'use client';

import { Shield, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background/60 backdrop-blur-xl mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Trust Pay Escrow
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Secure, trusted crypto escrow for freelancers and hirers. Powered by smart contracts on Ethereum.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3 text-foreground">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/dashboard/hirer" className="hover:text-foreground transition-colors">Hirer Dashboard</Link></li>
              <li><Link href="/dashboard/freelancer" className="hover:text-foreground transition-colors">Freelancer Dashboard</Link></li>
              <li><Link href="/dashboard/profile" className="hover:text-foreground transition-colors">My Profile</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3 text-foreground">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Smart Contract</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Audit Report</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 Trust Pay Escrow. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1 text-xs">
              <ExternalLink className="h-4 w-4" /> GitHub
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1 text-xs">
              <ExternalLink className="h-4 w-4" /> Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
