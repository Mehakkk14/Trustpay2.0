import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/lib/providers';

export const metadata: Metadata = {
  title: 'Trust Pay Escrow – Secure Crypto Payments',
  description:
    'Trusted crypto escrow for hirers and freelancers. Lock, release, and dispute funds on-chain with smart contracts.',
  keywords: ['escrow', 'crypto', 'ethereum', 'freelancer', 'defi', 'smart contract'],
  openGraph: {
    title: 'Trust Pay Escrow',
    description: 'Secure crypto escrow powered by smart contracts.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
