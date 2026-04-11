'use client';

import { motion } from 'framer-motion';
import { BarChart3, CheckCircle, Trophy, Users } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';

const features = [
  {
    icon: BarChart3,
    title: 'تتبع الإدمان',
    description: 'راقب وقتك واكتشف أنماط استهلاكك للفيديوهات القصيرة',
    color: 'purple' as const,
  },
  {
    icon: CheckCircle,
    title: 'نظام المهام',
    description: 'مهام يومية تساعدك على التغيير التدريجي والبناء',
    color: 'teal' as const,
  },
  {
    icon: Trophy,
    title: 'نظام المستوى',
    description: 'تقدم واكسب نقاط XP وشارات تميز تحفزك على الاستمرار',
    color: 'orange' as const,
  },
  {
    icon: Users,
    title: 'أصدقاء وتحفيز',
    description: 'شارك رحلتك واحصل على دعم المجتمع والأصدقاء',
    color: 'purple' as const,
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">مميزات </span>
            <span className="gradient-text">تعافي</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            أدوات متكاملة تساعدك على التحرر من الإدمان وبناء عادات صحية
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorClasses = {
              purple: 'text-purple-400 bg-purple-500/20',
              teal: 'text-teal-400 bg-teal-500/20',
              orange: 'text-orange-400 bg-orange-500/20',
            };

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard glow={feature.color} className="h-full text-center" hover>
                  <div className={`w-16 h-16 rounded-2xl ${colorClasses[feature.color]} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
