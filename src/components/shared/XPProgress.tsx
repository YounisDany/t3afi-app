'use client';

import { motion } from 'framer-motion';
import { Flame, Star } from 'lucide-react';
import { useAppStore, getLevelName, getXPProgress } from '@/lib/store';

export function XPProgress() {
  const { user } = useAppStore();
  
  if (!user) return null;

  const progress = getXPProgress(user.xp);
  const levelName = getLevelName(user.level);

  return (
    <div className="flex items-center gap-4">
      {/* Streak */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30">
        <Flame className="w-4 h-4 text-orange-400" />
        <span className="text-sm font-bold text-orange-400">{user.streak}</span>
      </div>

      {/* Level & XP */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
            <span className="text-sm font-bold text-gray-900">{user.level}</span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center">
            <Star className="w-2.5 h-2.5 text-yellow-900" />
          </div>
        </div>

        <div className="hidden sm:block">
          <div className="text-sm font-medium text-white">{levelName}</div>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 rounded-full bg-gray-700 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="h-full gradient-primary rounded-full"
              />
            </div>
            <span className="text-xs text-gray-400">{user.xp} XP</span>
          </div>
        </div>
      </div>
    </div>
  );
}
