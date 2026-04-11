'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { AnimatedButton } from '@/components/shared/AnimatedButton';

interface CTAProps {
  onStartClick: () => void;
}

export function CTA({ onStartClick }: CTAProps) {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Icon */}
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-primary mb-8 glow-purple"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">جاهز لبدء </span>
            <span className="gradient-text">رحلتك؟</span>
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
            آلاف الأشخاص بدأوا رحلتهم بالفعل. انضم إليهم اليوم واكتشف حياة بدون إدمان.
          </p>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatedButton onClick={onStartClick} size="lg" className="text-lg px-12">
              ابدأ رحلتك الآن
              <ArrowLeft className="w-5 h-5 mr-2" />
            </AnimatedButton>
          </motion.div>

          {/* Trust Text */}
          <p className="text-gray-500 text-sm mt-6">
            مجاني بالكامل • لا حاجة للتسجيل • ابدأ فوراً
          </p>
        </motion.div>
      </div>
    </section>
  );
}
