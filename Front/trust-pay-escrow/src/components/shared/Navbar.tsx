'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useAccount } from 'wagmi';
import { useAppStore } from '@/store/useAppStore';
import { ConnectButton } from '@/components/wallet/ConnectButton';
import { RoleToggle } from '@/components/shared/RoleToggle';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Navbar() {
  const { isConnected } = useAccount();

  const itemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-background/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg group">
          <motion.div 
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Shield className="h-4 w-4 text-white" />
          </motion.div>
          <span className="gradient-text-primary font-[800]">
            Trust Pay
          </span>
          <span className="text-foreground/50 font-normal text-xs tracking-wide">ESCROW</span>
        </Link>

        {/* Nav Links - Hidden on mobile */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="hidden md:flex items-center gap-8 text-sm"
        >
          {['Hirer', 'Freelancer', 'Profile'].map((item, i) => (
            <motion.div key={item} variants={itemVariants}>
              <Link 
                href={`/dashboard/${item.toLowerCase()}`} 
                className="text-foreground/70 hover:text-foreground transition-colors duration-200 font-medium"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Right side controls */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } }
          }}
          className="flex items-center gap-3"
        >
          {isConnected && (
            <motion.div variants={itemVariants}>
              <RoleToggle />
            </motion.div>
          )}
          <motion.div variants={itemVariants}>
            <ThemeToggle />
          </motion.div>
          <motion.div variants={itemVariants}>
            <ConnectButton />
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
