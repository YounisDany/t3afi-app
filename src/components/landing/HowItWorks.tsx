'use client';

import { motion } from 'framer-motion';
import { ClipboardList, Target, TrendingUp, Unlock } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    title: 'قيّم نفسك',
    description: 'أجب على أسئلة تقييم الإدمان لفهم مستواك الحالي',
    number: '01',
  },
  {
    icon: Target,
    title: 'ابدأ التحدي',
    description: 'حدد أهدافك وخطتك الشخصية للتحرر التدريجي',
    number: '02',
  },
  {
    icon: TrendingUp,
    title: 'تابع تقدمك',
    description: 'راقب إحصائياتك وإنجازاتك اليومية',
    number: '03',
  },
  {
    icon: Unlock,
    title: 'تحرر',
    description: 'احصل على حريتك واستمتع بحياتك بدون قيود',
    number: '04',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">كيف يعمل </span>
            <span className="gradient-text">تعافي؟</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            أربع خطوات بسيطة نحو حياة أفضل
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-l from-purple-500/50 to-transparent" />
                )}

                <div className="relative text-center">
                  {/* Number Badge */}
                  <div className="absolute -top-3 right-4 text-6xl font-bold text-purple-500/10">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-2xl gradient-primary opacity-20" />
                    <div className="relative w-full h-full rounded-2xl glass flex items-center justify-center">
                      <Icon className="w-8 h-8 text-purple-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
