'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Shield, Zap } from 'lucide-react';
import { AnimatedButton } from '@/components/shared/AnimatedButton';

interface HeroProps {
  onStartClick: () => void;
}

export function Hero({ onStartClick }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-gray-300">أول تطبيق عربي لمكافحة إدمان المقاطع القصيرة</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="text-white">تحرر من إدمان</span>
          <br />
          <span className="gradient-text">المقاطع القصيرة</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto"
        >
          رحلتك نحو حياة أكثر إنتاجية وتركيزاً تبدأ هنا
          <br className="hidden sm:block" />
          انضم لآلاف المستخدمين الذين غيروا حياتهم
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <AnimatedButton onClick={onStartClick} size="lg">
            ابدأ الآن
            <ArrowLeft className="w-5 h-5 mr-2" />
          </AnimatedButton>
          <AnimatedButton variant="outline" size="lg">
            شاهد كيف يعمل
          </AnimatedButton>
        </motion.div>

        {/* Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-xs mx-auto"
        >
          <div className="relative">
            {/* Phone Frame */}
            <div className="relative w-64 h-[520px] mx-auto rounded-[3rem] border-4 border-gray-700 bg-gray-900 shadow-2xl overflow-hidden">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10" />
              
              {/* Screen Content */}
              <div className="absolute inset-2 top-4 rounded-[2.5rem] bg-gradient-to-b from-[#0F0F1A] to-[#1A1A2E] overflow-hidden">
                {/* App Header */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full gradient-primary" />
                      <div>
                        <div className="text-sm font-bold text-white">أحمد</div>
                        <div className="text-xs text-gray-400">المستوى 3</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500/20">
                      <span className="text-xs text-orange-400">🔥</span>
                      <span className="text-xs font-bold text-orange-400">15</span>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="p-3 rounded-xl bg-purple-500/20">
                      <div className="text-lg font-bold text-purple-400">1,250</div>
                      <div className="text-xs text-gray-400">نقطة XP</div>
                    </div>
                    <div className="p-3 rounded-xl bg-teal-500/20">
                      <div className="text-lg font-bold text-teal-400">12</div>
                      <div className="text-xs text-gray-400">مهمة مكتملة</div>
                    </div>
                  </div>
                  
                  {/* Tasks */}
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-white/5 flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-teal-400 flex items-center justify-center text-teal-400 text-xs">✓</div>
                      <div className="text-sm text-gray-300">قراءة 15 دقيقة</div>
                      <div className="mr-auto text-xs text-teal-400">+30 XP</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-500" />
                      <div className="text-sm text-gray-300">ممارسة الرياضة</div>
                      <div className="mr-auto text-xs text-gray-400">+40 XP</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 p-3 glass rounded-2xl"
            >
              <Shield className="w-6 h-6 text-purple-400" />
            </motion.div>
            
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 p-3 glass rounded-2xl"
            >
              <Zap className="w-6 h-6 text-orange-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-8 text-gray-400"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2 space-x-reverse">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-gray-800 bg-gradient-to-br from-purple-500 to-teal-500"
                />
              ))}
            </div>
            <span className="text-sm">+5,000 مستخدم نشط</span>
          </div>
          <div className="flex items-center gap-1">
            {'⭐'.repeat(5)}
            <span className="text-sm mr-1">4.9/5</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
