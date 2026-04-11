'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, User } from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { AnimatedButton } from './AnimatedButton';
import { Input } from '@/components/ui/input';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [name, setName] = useState('');
  const { login, skipLogin } = useAppStore();

  const handleStart = () => {
    if (name.trim()) {
      login(name.trim());
      onClose();
    }
  };

  const handleSkip = () => {
    skipLogin();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md glass rounded-3xl p-6 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/30"
                />
                <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center glow-purple">
                  <img src="/t3afi-logo.png" alt="تعافي" className="w-16 h-16" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
              <span className="gradient-text">مرحباً بك في تعافي</span>
            </h2>
            <p className="text-gray-400 text-center mb-8">
              أدخل اسمك للبدء في رحلتك نحو التحرر
            </p>

            {/* Input */}
            <div className="relative mb-6">
              <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اسمك"
                className="w-full pr-12 h-14 bg-white/5 border-gray-600 focus:border-purple-500 text-white placeholder:text-gray-500 rounded-xl"
                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
              />
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <AnimatedButton
                onClick={handleStart}
                fullWidth
                disabled={!name.trim()}
              >
                ابدأ الآن
              </AnimatedButton>

              <button
                onClick={handleSkip}
                className="w-full py-3 text-gray-400 hover:text-white transition-colors text-sm"
              >
                تخطي الآن
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
