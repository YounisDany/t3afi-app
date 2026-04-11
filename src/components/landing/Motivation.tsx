'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const quotes = [
  {
    text: 'كل يوم بدون سكرول هو انتصار جديد',
    author: 'مبدأ تعافي',
  },
  {
    text: 'أنت أقوى من خوارزميات الإدمان',
    author: 'فلسفة تعافي',
  },
  {
    text: 'بدايتك اليوم تغير غدك بالكامل',
    author: 'حكمة',
  },
];

export function Motivation() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg opacity-50" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">كلمات تلهمك</span>
          </h2>
        </motion.div>

        {/* Quotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="glass rounded-2xl p-6 sm:p-8 h-full">
                <Quote className="w-8 h-8 text-purple-500/50 mb-4" />
                <p className="text-xl sm:text-2xl font-bold text-white mb-4 leading-relaxed">
                  "{quote.text}"
                </p>
                <p className="text-gray-400 text-sm">— {quote.author}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
