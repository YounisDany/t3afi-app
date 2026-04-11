'use client';

import { motion } from 'framer-motion';
import { Flame, Star, CheckCircle, Clock, ChevronLeft } from 'lucide-react';
import { useAppStore, getLevelName, getXPProgress } from '@/lib/store';
import { GlassCard } from '@/components/shared/GlassCard';
import { Progress } from '@/components/ui/progress';
import { XPProgress } from '@/components/shared/XPProgress';

const motivationQuotes = [
  'كل يوم ناجح يقربك من حريتك',
  'أنت أقوى من خوارزميات الإدمان',
  'التغيير يبدأ بخطوة واحدة',
  'صبرك اليوم هو انتصارك غداً',
  'لا تستسلم، كل يوم هو فرصة جديدة',
];

export function Dashboard() {
  const { user, dailyTasks, setCurrentPage } = useAppStore();

  if (!user) return null;

  const completedTasks = dailyTasks.filter(t => t.completed).length;
  const totalTasks = dailyTasks.length;
  const progress = getXPProgress(user.xp);
  const levelName = getLevelName(user.level);
  const randomQuote = motivationQuotes[Math.floor(Math.random() * motivationQuotes.length)];

  // Calculate saved time (assume 2 hours saved per day of streak)
  const savedHours = user.streak * 2;

  return (
    <div className="pb-24 pt-4 px-4">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-2xl">
                {user.avatar}
              </div>
              <div className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold text-white border-2 border-background">
                {user.level}
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">{user.name}</h1>
              <p className="text-sm text-gray-400">{levelName}</p>
            </div>
          </div>
          <XPProgress />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard className="text-center">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mx-auto mb-2">
                <Flame className="w-6 h-6 text-orange-400" />
              </div>
              <div className="text-2xl font-bold text-white">{user.streak}</div>
              <div className="text-sm text-gray-400">أيام متتالية</div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="text-center">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-2">
                <Star className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white">{user.xp}</div>
              <div className="text-sm text-gray-400">نقطة XP</div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="text-center">
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-teal-400" />
              </div>
              <div className="text-2xl font-bold text-white">{user.completedTasks.length}</div>
              <div className="text-sm text-gray-400">مهمة مكتملة</div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard className="text-center">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-white">{savedHours}</div>
              <div className="text-sm text-gray-400">ساعة موفرة</div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Today's Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">مهام اليوم</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">{completedTasks}/{totalTasks}</span>
                <button
                  onClick={() => setCurrentPage('tasks')}
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <Progress value={(completedTasks / totalTasks) * 100} className="h-2 mb-4" />

            {/* Tasks List */}
            <div className="space-y-3">
              {dailyTasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    task.completed ? 'bg-teal-500/10' : 'bg-white/5'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      task.completed
                        ? 'border-teal-400 bg-teal-400'
                        : 'border-gray-500'
                    }`}
                  >
                    {task.completed && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                      {task.title}
                    </p>
                  </div>
                  <div className={`text-sm font-bold ${task.completed ? 'text-teal-400' : 'text-gray-400'}`}>
                    +{task.xpReward} XP
                  </div>
                </div>
              ))}
            </div>

            {completedTasks < totalTasks && (
              <button
                onClick={() => setCurrentPage('tasks')}
                className="text-green-400 hover:text-green-300 transition-colors text-sm"
              >
                عرض جميع المهام
              </button>
            )}
          </GlassCard>
        </motion.div>

        {/* Weekly Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <GlassCard>
            <h2 className="text-lg font-bold text-white mb-4">التقدم الأسبوعي</h2>
            <div className="flex items-end justify-between h-32 gap-2">
              {['س', 'ح', 'ن', 'ث', 'ر', 'خ', 'ج'].map((day, index) => {
                const height = Math.random() * 100;
                const isToday = index === new Date().getDay();
                return (
                  <div key={day} className="flex flex-col items-center gap-2 flex-1">
                    <div
                      className={`w-full rounded-t-lg ${
                        isToday ? 'gradient-primary' : 'bg-gray-700'
                      }`}
                      style={{ height: `${Math.max(20, height)}%` }}
                    />
                    <span className={`text-xs ${isToday ? 'text-purple-400 font-bold' : 'text-gray-500'}`}>
                      {day}
                    </span>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>

        {/* Motivation Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <GlassCard className="text-center">
            <p className="text-lg text-gray-300 italic">"{randomQuote}"</p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
