'use client';

import { motion } from 'framer-motion';
import { Gamepad2, Gift, Award, Sparkles, Lock, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { GlassCard } from '@/components/shared/GlassCard';
import { AnimatedButton } from '@/components/shared/AnimatedButton';

const avatarOptions = ['👤', '🧑', '👨', '👩', '🧔', '👱', '👳', '🧕'];
const avatarColors = ['from-purple-500 to-pink-500', 'from-teal-500 to-cyan-500', 'from-orange-500 to-yellow-500', 'from-pink-500 to-rose-500'];

const badges = [
  { id: 'b1', name: 'البداية', description: 'أول يوم ناجح', icon: '🎯', unlocked: true },
  { id: 'b2', name: 'الأسبوع الأول', description: '7 أيام متتالية', icon: '🔥', unlocked: false },
  { id: 'b3', name: 'الشهر الأول', description: '30 يوم متتالي', icon: '👑', unlocked: false },
  { id: 'b4', name: 'المحارب', description: 'إكمال كل المهام لمدة أسبوع', icon: '⚔️', unlocked: false },
  { id: 'b5', name: 'القارئ', description: 'قراءة 10 ساعات', icon: '📚', unlocked: false },
  { id: 'b6', name: 'الرياضي', description: 'ممارسة الرياضة 20 مرة', icon: '💪', unlocked: false },
];

const miniGames = [
  { id: 1, name: 'اختبار الوعي', description: 'اختبر معلوماتك عن آثار الإدمان', icon: '🧠', xp: 20 },
  { id: 2, name: 'تنفس بعمق', description: 'تمرين تنفس للاسترخاء', icon: '🌬️', xp: 15 },
  { id: 3, name: 'تحدي التركيز', description: 'اختبر قوة تركيزك', icon: '🎯', xp: 25 },
];

export function GamesPage() {
  const { user } = useAppStore();
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || '👤');
  const [selectedColor, setSelectedColor] = useState(0);
  const [activeGame, setActiveGame] = useState<number | null>(null);
  const [dailyGiftClaimed, setDailyGiftClaimed] = useState(false);

  return (
    <div className="pb-24 pt-4 px-4">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">الألعاب والأفاتار</h1>
          <p className="text-gray-400">خصص شخصيتك والعب واكسب مكافآت</p>
        </div>

        {/* Daily Gift */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard glow={dailyGiftClaimed ? 'none' : 'orange'} className="text-center">
            <div className="flex items-center justify-center gap-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${
                dailyGiftClaimed ? 'bg-gray-700' : 'bg-orange-500/20 animate-pulse'
              }`}>
                <Gift className={`w-8 h-8 ${dailyGiftClaimed ? 'text-gray-500' : 'text-orange-400'}`} />
              </div>
              <div className="flex-1 text-right">
                <h3 className="font-bold text-white">الهدايا اليومية</h3>
                <p className="text-sm text-gray-400">
                  {dailyGiftClaimed ? 'تم استلام الهدية اليوم!' : 'هديتك اليومية تنتظرك!'}
                </p>
              </div>
              <AnimatedButton
                onClick={() => setDailyGiftClaimed(true)}
                disabled={dailyGiftClaimed}
                size="sm"
                variant={dailyGiftClaimed ? 'outline' : 'accent'}
              >
                {dailyGiftClaimed ? 'تم ✓' : 'استلام'}
              </AnimatedButton>
            </div>
          </GlassCard>
        </motion.div>

        {/* Avatar Customization */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-bold text-white">تخصيص الأفاتار</h2>
          </div>

          <GlassCard>
            {/* Avatar Preview */}
            <div className="flex justify-center mb-6">
              <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${avatarColors[selectedColor]} flex items-center justify-center text-5xl shadow-lg`}>
                {selectedAvatar}
              </div>
            </div>

            {/* Avatar Selection */}
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-3">اختر الشكل:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {avatarOptions.map((avatar) => (
                  <button
                    key={avatar}
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${
                      selectedAvatar === avatar
                        ? 'bg-purple-500/30 ring-2 ring-purple-400'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <p className="text-sm text-gray-400 mb-3">اختر اللون:</p>
              <div className="flex justify-center gap-3">
                {avatarColors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} transition-all ${
                      selectedColor === index ? 'ring-2 ring-white ring-offset-2 ring-offset-background' : ''
                    }`}
                  />
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Mini Games */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Gamepad2 className="w-5 h-5 text-teal-400" />
            <h2 className="text-lg font-bold text-white">ألعاب مصغرة</h2>
          </div>

          <div className="space-y-3">
            {miniGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard hover glow="teal">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-teal-500/20 flex items-center justify-center text-2xl">
                      {game.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{game.name}</h3>
                      <p className="text-sm text-gray-400">{game.description}</p>
                    </div>
                    <div className="text-center">
                      <div className="text-purple-400 font-bold">+{game.xp} XP</div>
                      <AnimatedButton size="sm" onClick={() => setActiveGame(game.id)}>
                        العب
                      </AnimatedButton>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-bold text-white">الشارات والإنجازات</h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard
                  className={`text-center ${!badge.unlocked && 'opacity-50'}`}
                >
                  <div className={`w-14 h-14 rounded-xl mx-auto mb-2 flex items-center justify-center text-2xl ${
                    badge.unlocked ? 'bg-yellow-500/20' : 'bg-gray-700'
                  }`}>
                    {badge.unlocked ? badge.icon : <Lock className="w-5 h-5 text-gray-500" />}
                  </div>
                  <h4 className="font-medium text-white text-sm">{badge.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
                  {badge.unlocked && (
                    <CheckCircle className="w-4 h-4 text-teal-400 mx-auto mt-2" />
                  )}
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
