'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PremiumInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  icon?: ReactNode;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export function PremiumInput({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  icon,
  error,
  disabled = false,
  required = false,
  className,
}: PremiumInputProps) {
  return (
    <motion.div className="space-y-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      {label && (
        <label className="block text-sm font-semibold text-foreground">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <motion.div className="relative" whileFocus={{ scale: 1.01 }}>
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50">{icon}</div>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={cn(
            'w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-foreground placeholder:text-foreground/40',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50',
            'transition-all duration-200',
            icon && 'pl-11',
            error && 'border-red-500/50 focus:ring-red-500/40',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
        />
      </motion.div>
      {error && <p className="text-xs text-red-400 font-medium">{error}</p>}
    </motion.div>
  );
}

interface PremiumTextareaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  className?: string;
}

export function PremiumTextarea({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  rows = 4,
  className,
}: PremiumTextareaProps) {
  return (
    <motion.div className="space-y-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      {label && (
        <label className="block text-sm font-semibold text-foreground">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <motion.textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        className={cn(
          'w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-foreground placeholder:text-foreground/40',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50',
          'transition-all duration-200 resize-none',
          error && 'border-red-500/50 focus:ring-red-500/40',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      />
      {error && <p className="text-xs text-red-400 font-medium">{error}</p>}
    </motion.div>
  );
}

interface PremiumFormProps {
  children: ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
}

export function PremiumForm({ children, onSubmit, className }: PremiumFormProps) {
  return (
    <motion.form
      onSubmit={onSubmit}
      className={cn('space-y-6', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, staggerChildren: 0.1 }}
    >
      {children}
    </motion.form>
  );
}
