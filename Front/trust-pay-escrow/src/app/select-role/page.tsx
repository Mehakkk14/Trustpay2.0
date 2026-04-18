'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import {
  Briefcase,
  Code2,
  ArrowRight,
  CheckCircle,
  Shield,
  Star,
  Zap,
  Users,
  DollarSign,
  Clock,
} from 'lucide-react';
import { motion } from 'framer-motion';

const HIRER_PERKS = [
  { icon: Shield, text: 'Funds locked in smart contract — fully secure' },
  { icon: Users, text: 'Access global pool of verified freelancers' },
  { icon: Zap, text: 'Instant payment release on approval' },
  { icon: CheckCircle, text: 'Dispute protection built-in' },
];

const FREELANCER_PERKS = [
  { icon: DollarSign, text: 'Guaranteed payment via escrow — no scams' },
  { icon: Star, text: 'Earn NFT membership tiers for premium perks' },
  { icon: Clock, text: 'Browse & apply to open jobs instantly' },
  { icon: Zap, text: 'Receive funds directly to your wallet' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};

export default function SelectRolePage() {
  const { setRole } = useAppStore();
  const router = useRouter();

  const handleSelect = (role: 'hirer' | 'freelancer') => {
    setRole(role);
    router.push(`/login`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden bg-gradient-to-b from-background via-background to-foreground/[0.02]">
      {/* Animated Background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-1/4 -left-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-600/30 to-transparent blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute bottom-1/4 -right-32 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-purple-600/30 to-transparent blur-3xl"
        />
      </div>

      <motion.div 
        className="relative z-10 w-full max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="text-center mb-16 space-y-4" variants={itemVariants}>
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-lg group">
            <motion.div 
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)' }}
            >
              <Shield className="h-5 w-5 text-white" />
            </motion.div>
            <span className="gradient-text-primary font-[800]">Trust Pay</span>
            <span className="text-foreground/50 font-normal text-xs tracking-wide">ESCROW</span>
          </Link>

          <motion.div 
            className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-4 py-2 text-sm font-medium text-indigo-400 backdrop-blur-xl"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Zap className="h-4 w-4" />
            Choose your role to get started
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-[900] text-foreground leading-tight">
            How will you use
            <motion.span 
              className="gradient-text block"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              style={{ backgroundSize: '200% 200%' }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              Trust Pay?
            </motion.span>
          </h1>
          <p className="text-foreground/70 text-lg max-w-xl mx-auto">
            Select your role. You can always switch between them from the dashboard navbar.
          </p>
        </motion.div>

        {/* Role Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          {/* Hirer Card */}
          <motion.button
            onClick={() => handleSelect('hirer')}
            className="group relative text-left rounded-2xl overflow-hidden cursor-pointer"
            variants={itemVariants}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            {/* Card background */}
            <div className="absolute inset-0 rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/[0.08] via-white/[0.02] to-transparent backdrop-blur-xl" />

            {/* Hover glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{ opacity: [0, 0.1, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
              }}
            />

            <div className="relative p-8 sm:p-10 space-y-8 h-full flex flex-col">
              {/* Icon */}
              <motion.div
                className="flex h-18 w-18 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-xl shadow-indigo-500/30"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Briefcase className="h-9 w-9 text-white" />
              </motion.div>

              {/* Title */}
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-2xl sm:text-3xl font-[800] text-foreground">I'm a Hirer</h2>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="h-6 w-6 text-indigo-400" />
                  </motion.div>
                </div>
                <p className="text-foreground/70 mt-3 text-base leading-relaxed font-medium">
                  Post jobs, select freelancers, lock funds in escrow, and release payment when work is done.
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-indigo-500/20 to-transparent" />

              {/* Perks */}
              <ul className="space-y-3.5 flex-1">
                {HIRER_PERKS.map((perk, i) => (
                  <motion.li
                    key={perk.text}
                    className="flex items-start gap-3.5"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                  >
                    <motion.div 
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 border border-indigo-500/30 mt-0.5"
                      whileHover={{ scale: 1.1 }}
                    >
                      <perk.icon className="h-3.5 w-3.5 text-indigo-400" />
                    </motion.div>
                    <span className="text-sm text-foreground/70 group-hover:text-foreground/90 transition-colors font-medium">
                      {perk.text}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <motion.div 
                className="inline-flex items-center gap-2 text-base font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors"
                whileHover={{ x: 4 }}
              >
                Enter Hirer Dashboard
                <motion.div animate={{ x: [0, 2, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </motion.div>
            </div>
          </motion.button>

          {/* Freelancer Card */}
          <motion.button
            onClick={() => handleSelect('freelancer')}
            className="group relative text-left rounded-2xl overflow-hidden cursor-pointer"
            variants={itemVariants}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            {/* Card background */}
            <div className="absolute inset-0 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-600/[0.08] via-white/[0.02] to-transparent backdrop-blur-xl" />

            {/* Hover glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{ opacity: [0, 0.1, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              style={{
                background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
              }}
            />

            <div className="relative p-8 sm:p-10 space-y-8 h-full flex flex-col">
              {/* Icon */}
              <motion.div
                className="flex h-18 w-18 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 shadow-xl shadow-purple-500/30"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Code2 className="h-9 w-9 text-white" />
              </motion.div>

              {/* Title */}
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-2xl sm:text-3xl font-[800] text-foreground">I'm a Freelancer</h2>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="h-6 w-6 text-purple-400" />
                  </motion.div>
                </div>
                <p className="text-foreground/70 mt-3 text-base leading-relaxed font-medium">
                  Browse open jobs, apply with your wallet, complete work, and get paid instantly in crypto.
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-purple-500/20 to-transparent" />

              {/* Perks */}
              <ul className="space-y-3.5 flex-1">
                {FREELANCER_PERKS.map((perk, i) => (
                  <motion.li
                    key={perk.text}
                    className="flex items-start gap-3.5"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                  >
                    <motion.div 
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/20 border border-purple-500/30 mt-0.5"
                      whileHover={{ scale: 1.1 }}
                    >
                      <perk.icon className="h-3.5 w-3.5 text-purple-400" />
                    </motion.div>
                    <span className="text-sm text-foreground/70 group-hover:text-foreground/90 transition-colors font-medium">
                      {perk.text}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <motion.div 
                className="inline-flex items-center gap-2 text-base font-semibold text-purple-400 group-hover:text-purple-300 transition-colors"
                whileHover={{ x: 4 }}
              >
                Enter Freelancer Dashboard
                <motion.div animate={{ x: [0, 2, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </motion.div>
            </div>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
