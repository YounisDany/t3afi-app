'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

export function AnimatedButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  fullWidth = false,
}: AnimatedButtonProps) {
  const variants = {
    primary: 'gradient-primary text-gray-900 shadow-lg shadow-green-500/25',
    secondary: 'gradient-secondary text-white shadow-lg shadow-teal-500/25',
    accent: 'gradient-accent text-white shadow-lg shadow-orange-500/25',
    outline: 'bg-transparent border-2 border-green-500 text-green-400 hover:bg-green-500/10',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'rounded-xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
    >
      {children}
    </motion.button>
  );
}
