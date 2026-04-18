'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import { config } from './config';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <RainbowKitProvider
            theme={{
              lightMode: lightTheme({ accentColor: '#6366f1', borderRadius: 'medium' }),
              darkMode: darkTheme({ accentColor: '#818cf8', borderRadius: 'medium', overlayBlur: 'small' }),
            }}
          >
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: '#1e1e2e',
                  color: '#cdd6f4',
                  border: '1px solid #313244',
                },
              }}
            />
          </RainbowKitProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
