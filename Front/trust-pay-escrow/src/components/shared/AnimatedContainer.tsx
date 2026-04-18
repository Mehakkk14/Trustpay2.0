'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  type?: 'fadeIn' | 'slideIn' | 'scaleIn' | 'staggerChildren';
}

const animationVariants: Record<string, any> = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
  },
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  },
};

export function AnimatedContainer({
  children,
  className,
  delay = 0,
  duration = 0.5,
  type = 'slideIn',
}: AnimatedContainerProps) {
  const variants = animationVariants[type];

  return (
    <motion.div
      className={className}
      initial={variants.initial || variants.animate}
      whileInView={variants.animate}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration,
        delay,
        ease: [0.23, 1, 0.32, 1] as const,
      }}
    >
      {children}
    </motion.div>
  );
}
