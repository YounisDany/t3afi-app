'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: 'green' | 'teal' | 'orange' | 'none';
  hover?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className, glow = 'none', hover = false, onClick }: GlassCardProps) {
  const glowStyles = {
    green: 'shadow-[0_0_30px_rgba(74,222,128,0.2)]',
    teal: 'hover:shadow-[0_0_30px_rgba(20,184,166,0.3)]',
    orange: 'shadow-[0_0_30px_rgba(249,115,22,0.2)]',
    none: '',
  };

  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
      whileTap={hover ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={cn(
        'glass rounded-2xl p-4 sm:p-6 transition-all duration-300',
        hover && 'cursor-pointer',
        glowStyles[glow],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
