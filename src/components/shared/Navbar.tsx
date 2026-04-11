'use client';

import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { AnimatedButton } from './AnimatedButton';

interface NavbarProps {
  onStartClick: () => void;
  showAuthButton?: boolean;
}

export function Navbar({ onStartClick, showAuthButton = true }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'الرئيسية', href: '#hero' },
    { label: 'المميزات', href: '#features' },
    { label: 'كيف يعمل', href: '#how-it-works' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/t3afi-logo.png" alt="تعافي" className="h-10 w-10 sm:h-12 sm:w-12" />
            <span className="text-xl sm:text-2xl font-bold gradient-text">تعافي</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
            {showAuthButton && (
              <AnimatedButton onClick={onStartClick} size="sm">
                ابدأ الآن
              </AnimatedButton>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 space-y-4"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-gray-300 hover:text-white transition-colors font-medium py-2"
              >
                {item.label}
              </a>
            ))}
            {showAuthButton && (
              <AnimatedButton onClick={onStartClick} size="sm" fullWidth>
                ابدأ الآن
              </AnimatedButton>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
