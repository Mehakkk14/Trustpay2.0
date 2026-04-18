'use client';

import Link from 'next/link';
import { Shield, Lock, Zap, Globe, ArrowRight, Star, Sparkles, TrendingUp, Users, CheckCircle2 } from 'lucide-react';
import { ConnectButton } from '@/components/wallet/ConnectButton';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { motion } from 'framer-motion';
import { useState } from 'react';

const FEATURES = [
  {
    icon: Lock,
    title: 'Non-Custodial Escrow',
    description: 'Funds locked in smart contracts, not held by any third party. Only the hirer can release payment.',
    color: 'text-indigo-400',
    gradient: 'from-indigo-500/20 to-indigo-600/20',
    border: 'border-indigo-500/30',
  },
  {
    icon: Zap,
    title: 'Instant Settlement',
    description: 'Payments released on-chain in seconds once work is approved. No wire transfers, no delays.',
    color: 'text-amber-400',
    gradient: 'from-amber-500/20 to-amber-600/20',
    border: 'border-amber-500/30',
  },
  {
    icon: Globe,
    title: 'Global & Permissionless',
    description: 'Hire or work as a freelancer from anywhere in the world with just a crypto wallet.',
    color: 'text-emerald-400',
    gradient: 'from-emerald-500/20 to-emerald-600/20',
    border: 'border-emerald-500/30',
  },
  {
    icon: Star,
    title: 'NFT Membership Tiers',
    description: 'Earn exclusive benefits, reduced fees, and priority access by holding membership NFTs.',
    color: 'text-purple-400',
    gradient: 'from-purple-500/20 to-purple-600/20',
    border: 'border-purple-500/30',
  },
];

const STATS = [
  { value: '$2.4M+', label: 'Secured in Escrow', icon: TrendingUp },
  { value: '1,200+', label: 'Jobs Completed', icon: CheckCircle2 },
  { value: '0%', label: 'Platform Downtime', icon: Shield },
  { value: '4', label: 'Supported Networks', icon: Globe },
];

const STEPS = [
  { step: '01', title: 'Connect Wallet', desc: 'Link your MetaMask, WalletConnect, or Coinbase wallet in one click.' },
  { step: '02', title: 'Post a Job', desc: 'Describe your project, set payment, and assign a freelancer.' },
  { step: '03', title: 'Lock Funds', desc: 'Deposit payment into the escrow smart contract — funds are safu.' },
  { step: '04', title: 'Release & Earn', desc: 'Approve the work and funds are instantly sent to the freelancer.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.23, 1, 0.320, 1] },
  },
};

const floatingVariants = {
  initial: { y: 0, opacity: 0.8 },
  animate: {
    y: [0, -20, 0],
    opacity: [0.8, 1, 0.8],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
};

export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background via-background to-foreground/[0.02]">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-40 -left-40 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-purple-600/20 to-pink-600/10 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full border border-indigo-500/10 blur-xl"
        />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <motion.div className="flex items-center gap-2.5 font-bold text-lg">
            <motion.div 
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)' }}
            >
              <Shield className="h-4 w-4 text-white" />
            </motion.div>
            <span className="gradient-text-primary font-[800]">Trust Pay</span>
            <span className="text-foreground/50 font-normal text-xs tracking-wide">ESCROW</span>
          </motion.div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <ConnectButton />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/select-role"
                className="hidden sm:flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:shadow-indigo-500/40"
              >
                Launch App <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-4 py-32 overflow-hidden">
        <motion.div 
          className="relative z-10 space-y-6 max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-4 py-2 text-sm font-medium text-indigo-300 backdrop-blur-xl"
          >
            <Sparkles className="h-4 w-4" />
            <span>Powered by smart contracts</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-title-lg"
          >
            <span className="text-foreground block">The Trusted Platform for</span>
            <motion.span 
              className="gradient-text block py-2"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              style={{ backgroundSize: '200% 200%' }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              Crypto Escrow
            </motion.span>
            <span className="text-foreground block">Services</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-body-lg text-foreground/70 max-w-2xl mx-auto"
          >
            Hire freelancers and lock payment in a smart contract. Funds released only when work is approved — no middlemen, no disputes, no BS.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/select-role"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300"
              >
                Get Started <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/select-role"
                className="flex items-center gap-2 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 px-8 py-4 text-base font-semibold text-foreground backdrop-blur-xl transition-all duration-300"
              >
                Browse Jobs
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative border-y border-white/[0.08] bg-gradient-to-r from-white/[0.02] to-transparent py-16 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {STATS.map((stat, i) => (
              <motion.div 
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <motion.div
                  className="flex justify-center mb-3"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
                >
                  <stat.icon className="h-6 w-6 text-indigo-400 opacity-60" />
                </motion.div>
                <p className="text-3xl sm:text-4xl font-[900] gradient-text">{stat.value}</p>
                <p className="text-sm text-foreground/60 mt-2 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 relative z-10">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-title-md text-foreground mb-3">Why Trust Pay?</h2>
            <p className="text-body-lg text-foreground/60 max-w-2xl mx-auto">
              Built for the decentralized future of work with security, speed, and trust.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                variants={itemVariants}
                onHoverStart={() => setHoveredFeature(i)}
                onHoverEnd={() => setHoveredFeature(null)}
                className="group relative"
              >
                <motion.div 
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  animate={{
                    opacity: hoveredFeature === i ? 0.1 : 0,
                  }}
                />
                <motion.div
                  className={`relative rounded-2xl border ${f.border} bg-white/[0.02] backdrop-blur-xl p-8 space-y-4 transition-all duration-300 hover:border-opacity-60`}
                  whileHover={{ y: -8 }}
                >
                  <motion.div 
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.08] border border-white/10 ${f.color}`}
                    animate={hoveredFeature === i ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <f.icon className="h-6 w-6" />
                  </motion.div>
                  <h3 className="font-[700] text-foreground text-lg">{f.title}</h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">{f.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-gradient-to-b from-foreground/[0.02] to-transparent border-t border-white/[0.08] relative z-10">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-title-md text-foreground mb-3">How It Works</h2>
            <p className="text-body-lg text-foreground/60">Four simple steps to secure your next project.</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {STEPS.map((s, i) => (
              <motion.div 
                key={s.step} 
                variants={itemVariants}
                className="relative group"
              >
                {/* Connection line */}
                {i < STEPS.length - 1 && (
                  <motion.div 
                    className="hidden lg:block absolute -right-4 top-8 w-8 h-1 bg-gradient-to-r from-indigo-500/50 to-transparent"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  />
                )}
                
                <div>
                  <motion.div 
                    className="text-5xl sm:text-6xl font-[900] text-gradient-text mb-4 opacity-30"
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                  >
                    {s.step}
                  </motion.div>
                  <h3 className="font-[700] text-foreground mb-2 text-lg">{s.title}</h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-24 px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl"
        >
          <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/[0.08] via-purple-600/[0.05] to-pink-600/[0.08] p-12 sm:p-16 text-center space-y-8 backdrop-blur-xl">
            {/* Background effect */}
            <motion.div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              animate={{
                background: [
                  'radial-gradient(circle, rgba(99,102,241,0) 0%, rgba(99,102,241,0) 100%)',
                  'radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0) 70%)',
                  'radial-gradient(circle, rgba(99,102,241,0) 0%, rgba(99,102,241,0) 100%)',
                ],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative z-10"
            >
              <Shield className="h-12 w-12 text-indigo-400 mx-auto" />
            </motion.div>

            <div className="relative z-10">
              <h2 className="text-title-sm text-foreground mb-3">Ready to work with trust?</h2>
              <p className="text-body-lg text-foreground/70 max-w-xl mx-auto">
                Connect your wallet and post your first job in under 2 minutes. Join hundreds of hirers and freelancers already using Trust Pay.
              </p>
            </div>

            <motion.div
              className="relative z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/select-role"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-8 py-4 font-semibold text-white shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300"
              >
                Launch App <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative border-t border-white/[0.08] py-12 text-center text-sm text-foreground/50 z-10"
      >
        <div className="mx-auto max-w-6xl px-4">
          <p>© 2024 Trust Pay Escrow · Built on Ethereum · <span className="text-foreground/40">Open Source</span></p>
        </div>
      </motion.footer>
    </div>
  );
}
