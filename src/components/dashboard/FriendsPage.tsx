'use client';

import { motion } from 'framer-motion';
import { Users, Trophy, Plus, Search, Crown, Medal } from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { GlassCard } from '@/components/shared/GlassCard';
import { AnimatedButton } from '@/components/shared/AnimatedButton';
import { Input } from '@/components/ui/input';

export function FriendsPage() {
  const { friends, user } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showInvite, setShowInvite] = useState(false);

  // Sort friends by XP for leaderboard
  const sortedFriends = [...friends].sort((a, b) => b.xp - a.xp);
  
  // Add current user to leaderboard
  const leaderboard = user ? [...sortedFriends, { ...user, status: 'online' as const }].sort((a, b) => b.xp - a.xp) : sortedFriends;

  const filteredFriends = friends.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-300" />;
      case 3:
        return <Medal className="w-5 h-5 text-orange-400" />;
      default:
        return <span className="text-gray-400 font-bold">{rank}</span>;
    }
  };

  return (
    <div className="pb-24 pt-4 px-4">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">الأصدقاء</h1>
          <p className="text-gray-400">تحدى أصدقاءك وشجعهم</p>
        </div>

        {/* Add Friend */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن صديق..."
              className="pr-10 bg-white/5 border-gray-600"
            />
          </div>
          <AnimatedButton onClick={() => setShowInvite(true)} size="sm">
            <Plus className="w-5 h-5" />
          </AnimatedButton>
        </div>

        {/* Leaderboard */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-bold text-white">لوحة المتصدرين</h2>
          </div>

          <GlassCard className="overflow-hidden p-0">
            <div className="divide-y divide-gray-700/50">
              {leaderboard.slice(0, 5).map((friend, index) => {
                const rank = index + 1;
                const isCurrentUser = user && friend.id === user.id;
                
                return (
                  <motion.div
                    key={friend.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center gap-4 p-4 ${isCurrentUser ? 'bg-purple-500/10' : ''}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                      {getRankIcon(rank)}
                    </div>

                    <div className="w-10 h-10 rounded-full gradient-secondary flex items-center justify-center text-lg">
                      {friend.avatar || '👤'}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium text-white flex items-center gap-2">
                        {friend.name}
                        {isCurrentUser && <span className="text-xs text-purple-400">(أنت)</span>}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span>المستوى {friend.level}</span>
                        <span className="text-orange-400">🔥 {friend.streak}</span>
                      </div>
                    </div>

                    <div className="text-left">
                      <div className="font-bold text-purple-400">{friend.xp} XP</div>
                      <div className={`w-2 h-2 rounded-full ${friend.status === 'online' ? 'bg-green-400' : 'bg-gray-500'} inline-block`} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* Friends List */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-teal-400" />
            <h2 className="text-lg font-bold text-white">أصدقاؤك</h2>
            <span className="text-sm text-gray-400">({filteredFriends.length})</span>
          </div>

          <div className="space-y-3">
            {filteredFriends.map((friend, index) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard hover glow="purple">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full gradient-secondary flex items-center justify-center text-xl">
                        {friend.avatar}
                      </div>
                      <div
                        className={`absolute -bottom-1 -left-1 w-4 h-4 rounded-full border-2 border-background ${
                          friend.status === 'online' ? 'bg-green-400' : 'bg-gray-500'
                        }`}
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium text-white">{friend.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span>المستوى {friend.level}</span>
                        <span className="text-orange-400">🔥 {friend.streak}</span>
                      </div>
                    </div>

                    <div className="text-left">
                      <div className="font-bold text-purple-400">{friend.xp} XP</div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Invite Modal */}
        {showInvite && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowInvite(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-sm glass rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-white mb-4 text-center">دعوة صديق</h2>
              <p className="text-gray-400 text-center mb-6">
                شارك رابط الدعوة مع أصدقائك
              </p>
              <div className="p-4 bg-white/5 rounded-xl mb-4">
                <code className="text-sm text-purple-400 break-all">
                  t3afi.app/invite/{user?.id || 'guest'}
                </code>
              </div>
              <AnimatedButton onClick={() => setShowInvite(false)} fullWidth>
                نسخ الرابط
              </AnimatedButton>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
