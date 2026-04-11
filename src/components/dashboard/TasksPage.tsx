'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Clock, Trophy, Star } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { GlassCard } from '@/components/shared/GlassCard';
import { Progress } from '@/components/ui/progress';

export function TasksPage() {
  const { dailyTasks, challengeTasks, completeTask, user } = useAppStore();

  const completedDailyTasks = dailyTasks.filter(t => t.completed).length;
  const dailyProgress = (completedDailyTasks / dailyTasks.length) * 100;

  const handleCompleteTask = (taskId: string) => {
    const task = [...dailyTasks, ...challengeTasks].find(t => t.id === taskId);
    if (task && !task.completed) {
      completeTask(taskId);
    }
  };

  return (
    <div className="pb-24 pt-4 px-4">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">المهام</h1>
          <p className="text-gray-400">أكمل المهام واكسب نقاط XP</p>
        </div>

        {/* Daily Progress */}
        <GlassCard>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-white">تقدم اليوم</h2>
            <span className="text-sm text-gray-400">{completedDailyTasks}/{dailyTasks.length}</span>
          </div>
          <Progress value={dailyProgress} className="h-3" />
          {completedDailyTasks === dailyTasks.length && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-teal-400 mt-3 font-medium"
            >
              🎉 أحسنت! أكملت جميع مهام اليوم!
            </motion.p>
          )}
        </GlassCard>

        {/* Daily Tasks */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-bold text-white">المهام اليومية</h2>
          </div>

          <div className="space-y-3">
            {dailyTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard
                  glow={task.completed ? 'teal' : 'none'}
                  onClick={() => handleCompleteTask(task.id)}
                  className={`transition-all ${!task.completed && 'cursor-pointer hover:border-purple-500/50'}`}
                  hover={!task.completed}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        task.completed
                          ? 'border-teal-400 bg-teal-400'
                          : 'border-gray-500 hover:border-purple-400'
                      }`}
                    >
                      {task.completed && <CheckCircle className="w-5 h-5 text-white" />}
                    </div>

                    <div className="flex-1">
                      <h3 className={`font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                        {task.title}
                      </h3>
                      <p className="text-sm text-gray-500">{task.description}</p>
                    </div>

                    <div className={`flex items-center gap-1 ${task.completed ? 'text-teal-400' : 'text-purple-400'}`}>
                      <Star className="w-4 h-4" />
                      <span className="font-bold">+{task.xpReward}</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Challenge Tasks */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg font-bold text-white">تحديات خاصة</h2>
          </div>

          <div className="space-y-3">
            {challengeTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <GlassCard
                  glow={task.completed ? 'orange' : 'none'}
                  className={task.completed ? '' : 'opacity-80'}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        task.completed ? 'bg-orange-500/30' : 'bg-gray-700'
                      }`}
                    >
                      <Trophy className={`w-5 h-5 ${task.completed ? 'text-orange-400' : 'text-gray-400'}`} />
                    </div>

                    <div className="flex-1">
                      <h3 className={`font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                        {task.title}
                      </h3>
                      <p className="text-sm text-gray-500">{task.description}</p>
                    </div>

                    <div className={`flex items-center gap-1 ${task.completed ? 'text-orange-400' : 'text-orange-400'}`}>
                      <Star className="w-4 h-4" />
                      <span className="font-bold">+{task.xpReward}</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Completed History */}
        {user && user.completedTasks.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-teal-400" />
              <h2 className="text-lg font-bold text-white">سجل الإنجازات</h2>
            </div>

            <GlassCard>
              <div className="text-center py-4">
                <div className="text-4xl font-bold gradient-text mb-2">{user.completedTasks.length}</div>
                <p className="text-gray-400">مهمة مكتملة</p>
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
}
