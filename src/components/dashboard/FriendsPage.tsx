'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Users, Trophy, Plus, Search, Crown, Medal, UserPlus, X, Check, Phone, Copy, Share2 } from 'lucide-react';
import { useState } from 'react';
import { useAppStore, Friend } from '@/lib/store';
import { GlassCard } from '@/components/shared/GlassCard';
import { AnimatedButton } from '@/components/shared/AnimatedButton';
import { Input } from '@/components/ui/input';

// Sample users to add as friends
const sampleUsers = [
  { id: 'u1', name: 'محمد أحمد', avatar: '👨', streak: 12, xp: 890, level: 3, status: 'online' as const },
  { id: 'u2', name: 'فاطمة علي', avatar: '👩', streak: 8, xp: 560, level: 2, status: 'offline' as const },
  { id: 'u3', name: 'عبدالله سعيد', avatar: '👨', streak: 20, xp: 1800, level: 4, status: 'online' as const },
  { id: 'u4', name: 'مريم خالد', avatar: '👩', streak: 5, xp: 320, level: 2, status: 'online' as const },
  { id: 'u5', name: 'يوسف محمد', avatar: '👨', streak: 3, xp: 180, level: 1, status: 'offline' as const },
  { id: 'u6', name: 'هند عبدالرحمن', avatar: '👩', streak: 15, xp: 1100, level: 4, status: 'online' as const },
  { id: 'u7', name: 'عمر فهد', avatar: '👨', streak: 7, xp: 450, level: 2, status: 'offline' as const },
  { id: 'u8', name: 'سارة إبراهيم', avatar: '👩', streak: 25, xp: 2500, level: 5, status: 'online' as const },
];

export function FriendsPage() {
  const { friends, user, addFriend } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [addFriendQuery, setAddFriendQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [friendRequestSent, setFriendRequestSent] = useState<string[]>([]);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  // Sort friends by XP for leaderboard
  const sortedFriends = [...friends].sort((a, b) => b.xp - a.xp);
  
  // Add current user to leaderboard
  const leaderboard = user ? [...sortedFriends, { ...user, status: 'online' as const }].sort((a, b) => b.xp - a.xp) : sortedFriends;

  const filteredFriends = friends.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter users that are not already friends
  const availableUsers = sampleUsers.filter(u => 
    !friends.some(f => f.id === u.id) &&
    u.name.toLowerCase().includes(addFriendQuery.toLowerCase())
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

  const handleAddFriend = (friend: typeof sampleUsers[0]) => {
    // Simulate adding friend
    const newFriend: Friend = {
      id: friend.id,
      name: friend.name,
      avatar: friend.avatar,
      streak: friend.streak,
      xp: friend.xp,
      level: friend.level,
      status: friend.status,
    };
    // Add to local state
    setFriendRequestSent([...friendRequestSent, friend.id]);
    
    // Close modal after short delay
    setTimeout(() => {
      setShowAddFriend(false);
      setFriendRequestSent([]);
    }, 1500);
  };

  const copyInviteLink = () => {
    const link = `https://t3afi.app/invite/${user?.id || 'guest'}`;
    navigator.clipboard?.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareInvite = async () => {
    const link = `https://t3afi.app/invite/${user?.id || 'guest'}`;
    const text = 'انضم إليّ في تطبيق تعافي للتخلص من إدمان المقاطع القصيرة! 🌱';
    
    if (navigator.share) {
      try {
        await navigator.share({ title: 'تعافي', text, url: link });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      copyInviteLink();
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

        {/* Action Buttons */}
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
          <AnimatedButton onClick={() => setShowAddFriend(true)} size="sm">
            <UserPlus className="w-5 h-5" />
          </AnimatedButton>
          <AnimatedButton onClick={() => setShowInvite(true)} variant="secondary" size="sm">
            <Share2 className="w-5 h-5" />
          </AnimatedButton>
        </div>

        {/* Phone Contact */}
        <GlassCard className="cursor-pointer" onClick={() => setShowPhoneNumber(!showPhoneNumber)}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <Phone className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-white">تواصل معنا</h3>
              <p className="text-sm text-gray-400">للمساعدة والدعم الفني</p>
            </div>
            <AnimatePresence>
              {showPhoneNumber && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-green-400 font-bold text-lg"
                >
                  0563494180
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </GlassCard>

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
                    className={`flex items-center gap-4 p-4 ${isCurrentUser ? 'bg-green-500/10' : ''}`}
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
                        {isCurrentUser && <span className="text-xs text-green-400">(أنت)</span>}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span>المستوى {friend.level}</span>
                        <span className="text-orange-400">🔥 {friend.streak}</span>
                      </div>
                    </div>

                    <div className="text-left">
                      <div className="font-bold text-green-400">{friend.xp} XP</div>
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
                <GlassCard hover glow="green">
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
                      <div className="font-bold text-green-400">{friend.xp} XP</div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Add Friend Modal */}
        <AnimatePresence>
          {showAddFriend && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowAddFriend(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-sm glass rounded-2xl p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">إضافة صديق</h2>
                  <button onClick={() => setShowAddFriend(false)} className="text-gray-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="relative mb-4">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    value={addFriendQuery}
                    onChange={(e) => setAddFriendQuery(e.target.value)}
                    placeholder="ابحث بالاسم..."
                    className="pr-10 bg-white/5 border-gray-600"
                    autoFocus
                  />
                </div>

                <div className="max-h-64 overflow-y-auto space-y-2">
                  {availableUsers.length > 0 ? (
                    availableUsers.map((u) => (
                      <motion.div
                        key={u.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full gradient-secondary flex items-center justify-center text-lg">
                            {u.avatar}
                          </div>
                          <div className={`absolute -bottom-1 -left-1 w-3 h-3 rounded-full border-2 border-background ${
                            u.status === 'online' ? 'bg-green-400' : 'bg-gray-500'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-white text-sm">{u.name}</h3>
                          <p className="text-xs text-gray-400">المستوى {u.level} • {u.xp} XP</p>
                        </div>
                        <button
                          onClick={() => handleAddFriend(u)}
                          disabled={friendRequestSent.includes(u.id)}
                          className={`p-2 rounded-full transition-all ${
                            friendRequestSent.includes(u.id)
                              ? 'bg-green-500 text-white'
                              : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                          }`}
                        >
                          {friendRequestSent.includes(u.id) ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </button>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                      <p className="text-gray-400">لا يوجد مستخدمين بهذا الاسم</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Invite Modal */}
        <AnimatePresence>
          {showInvite && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowInvite(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-sm glass rounded-2xl p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">دعوة صديق</h2>
                  <button onClick={() => setShowInvite(false)} className="text-gray-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                    <Share2 className="w-8 h-8 text-gray-900" />
                  </div>
                  <p className="text-gray-400">
                    شارك رابط الدعوة مع أصدقائك واكسب 50 XP لكل صديق ينضم!
                  </p>
                </div>
                
                <div className="p-4 bg-white/5 rounded-xl mb-4">
                  <code className="text-sm text-green-400 break-all">
                    https://t3afi.app/invite/{user?.id || 'guest'}
                  </code>
                </div>
                
                <div className="flex gap-3">
                  <AnimatedButton onClick={copyInviteLink} variant="outline" className="flex-1">
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 ml-2" />
                        تم النسخ
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 ml-2" />
                        نسخ
                      </>
                    )}
                  </AnimatedButton>
                  <AnimatedButton onClick={shareInvite} className="flex-1">
                    <Share2 className="w-4 h-4 ml-2" />
                    مشاركة
                  </AnimatedButton>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
