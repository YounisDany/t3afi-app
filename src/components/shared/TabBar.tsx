'use client';

import { motion } from 'framer-motion';
import { Home, CheckSquare, Users, Gamepad2, User } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export function TabBar() {
  const { currentPage, setCurrentPage } = useAppStore();

  const tabs = [
    { id: 'dashboard' as const, label: 'الرئيسية', icon: Home },
    { id: 'tasks' as const, label: 'المهام', icon: CheckSquare },
    { id: 'friends' as const, label: 'الأصدقاء', icon: Users },
    { id: 'games' as const, label: 'الألعاب', icon: Gamepad2 },
    { id: 'profile' as const, label: 'حسابي', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-dark safe-bottom">
      <div className="max-w-lg mx-auto px-2">
        <div className="flex items-center justify-around h-16">
          {tabs.map((tab) => {
            const isActive = currentPage === tab.id;
            const Icon = tab.icon;
            
            return (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentPage(tab.id)}
                className={cn(
                  'flex flex-col items-center justify-center py-2 px-3 sm:px-4 transition-all duration-200',
                  isActive ? 'text-purple-400' : 'text-gray-400 hover:text-gray-300'
                )}
              >
                <div className="relative">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  {isActive && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </div>
                <span className="text-xs mt-1 font-medium">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
