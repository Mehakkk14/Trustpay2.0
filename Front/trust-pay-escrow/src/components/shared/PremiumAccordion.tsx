'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface PremiumAccordionItem {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

interface PremiumAccordionProps {
  items: PremiumAccordionItem[];
  className?: string;
  allowMultiple?: boolean;
  defaultOpenId?: string;
}

export function PremiumAccordion({
  items,
  className,
  allowMultiple = false,
  defaultOpenId,
}: PremiumAccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenId ? [defaultOpenId] : []);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <motion.div key={item.id}>
            <motion.button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center gap-4 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] px-6 py-4 text-left transition-all duration-300"
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
            >
              {item.icon && <div className="flex-shrink-0">{item.icon}</div>}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground text-lg">{item.title}</h3>
                  {item.badge && (
                    <span
                      className={cn(
                        'text-xs font-medium px-2 py-1 rounded-full',
                        item.badgeColor ||
                          'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="text-sm text-foreground/60 mt-1">{item.description}</p>
                )}
              </div>

              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0"
              >
                <ChevronDown className="h-5 w-5 text-foreground/60" />
              </motion.div>
            </motion.button>

            <motion.div
              initial={false}
              animate={{
                height: isOpen ? 'auto' : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 py-4 border-t border-white/[0.08] rounded-b-xl bg-white/[0.01]">
                {item.content}
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
