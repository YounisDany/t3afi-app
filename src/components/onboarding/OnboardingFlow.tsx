'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Clock, Target, Calendar } from 'lucide-react';
import { useAppStore, AssessmentAnswers } from '@/lib/store';
import { AnimatedButton } from '@/components/shared/AnimatedButton';
import { GlassCard } from '@/components/shared/GlassCard';

const assessmentQuestions = [
  {
    key: 'dailyHours' as keyof AssessmentAnswers,
    question: 'كم ساعة تقضي يومياً على منصات الفيديو القصير؟',
    options: [
      { value: 'less-1', label: 'أقل من ساعة' },
      { value: '1-2', label: '1-2 ساعة' },
      { value: '2-4', label: '2-4 ساعات' },
      { value: 'more-4', label: 'أكثر من 4 ساعات' },
    ],
  },
  {
    key: 'triggerTime' as keyof AssessmentAnswers,
    question: 'متى تشعر بالحاجة لمشاهدة المقاطع؟',
    options: [
      { value: 'morning', label: 'صباحاً' },
      { value: 'afternoon', label: 'بعد الظهر' },
      { value: 'evening', label: 'مساءً' },
      { value: 'before-sleep', label: 'قبل النوم' },
      { value: 'all-day', label: 'طوال اليوم' },
    ],
  },
  {
    key: 'guiltFeeling' as keyof AssessmentAnswers,
    question: 'هل تشعر بالذنب بعد قضاء وقت طويل؟',
    options: [
      { value: 'always', label: 'نعم دائماً' },
      { value: 'sometimes', label: 'أحياناً' },
      { value: 'rarely', label: 'نادراً' },
      { value: 'never', label: 'لا أبداً' },
    ],
  },
  {
    key: 'impactOnLife' as keyof AssessmentAnswers,
    question: 'هل يؤثر على نومك أو عملك؟',
    options: [
      { value: 'highly', label: 'نعم بشكل كبير' },
      { value: 'moderately', label: 'إلى حد ما' },
      { value: 'slightly', label: 'قليلاً' },
      { value: 'no', label: 'لا' },
    ],
  },
];

const goals = [
  { value: 'reduce', label: 'تقليل الاستخدام', icon: '📉' },
  { value: 'stop', label: 'التوقف التام', icon: '🚫' },
  { value: 'control', label: 'التحكم في الوقت', icon: '⏰' },
];

const challengeOptions = [
  { value: 7, label: '7 أيام', description: 'تحدي سريع' },
  { value: 14, label: '14 يوم', description: 'تحدي متوسط' },
  { value: 21, label: '21 يوم', description: 'تحدي مكثف' },
  { value: 30, label: '30 يوم', description: 'تحدي كامل' },
];

export function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({
    dailyHours: '',
    triggerTime: '',
    guiltFeeling: '',
    impactOnLife: '',
  });
  const [goal, setGoal] = useState('');
  const [challengeDays, setChallengeDays] = useState(30);
  
  const { completeOnboarding, user } = useAppStore();

  const handleAnswerSelect = (key: keyof AssessmentAnswers, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      completeOnboarding(answers, goal, challengeDays);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const canProceed = () => {
    if (step === 0) {
      return Object.values(answers).every(v => v !== '');
    }
    if (step === 1) {
      return goal !== '';
    }
    return true;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[0, 1, 2].map((s) => (
              <div
                key={s}
                className={`flex items-center ${s < 2 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    s <= step
                      ? 'gradient-primary text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {s + 1}
                </div>
                {s < 2 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                      s < step ? 'bg-purple-500' : 'bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {/* Step 1: Assessment */}
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-500/20 mb-4">
                  <Clock className="w-8 h-8 text-purple-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  تقييم مستوى الإدمان
                </h2>
                <p className="text-gray-400">أجب على الأسئلة التالية لفهم وضعك الحالي</p>
              </div>

              <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 no-scrollbar">
                {assessmentQuestions.map((q, qIndex) => (
                  <div key={q.key}>
                    <p className="text-white font-medium mb-3">
                      {qIndex + 1}. {q.question}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {q.options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleAnswerSelect(q.key, opt.value)}
                          className={`p-3 rounded-xl text-sm transition-all ${
                            answers[q.key] === opt.value
                              ? 'bg-purple-500 text-white border-2 border-purple-400'
                              : 'glass hover:border-purple-500/50 text-gray-300 border-2 border-transparent'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Goal */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-500/20 mb-4">
                  <Target className="w-8 h-8 text-teal-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  ما هدفك الرئيسي؟
                </h2>
                <p className="text-gray-400">حدد ما تريد تحقيقه</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {goals.map((g) => (
                  <GlassCard
                    key={g.value}
                    glow={goal === g.value ? 'teal' : 'none'}
                    onClick={() => setGoal(g.value)}
                    className={`cursor-pointer text-center ${
                      goal === g.value ? 'ring-2 ring-teal-400' : ''
                    }`}
                    hover
                  >
                    <div className="text-4xl mb-3">{g.icon}</div>
                    <h3 className="text-lg font-bold text-white">{g.label}</h3>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Challenge */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-500/20 mb-4">
                  <Calendar className="w-8 h-8 text-orange-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  اختر مدة التحدي
                </h2>
                <p className="text-gray-400">حدد المدة التي تريد الالتزام بها</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {challengeOptions.map((opt) => (
                  <GlassCard
                    key={opt.value}
                    glow={challengeDays === opt.value ? 'orange' : 'none'}
                    onClick={() => setChallengeDays(opt.value)}
                    className={`cursor-pointer text-center ${
                      challengeDays === opt.value ? 'ring-2 ring-orange-400' : ''
                    }`}
                    hover
                  >
                    <div className="text-3xl font-bold text-white mb-1">{opt.label}</div>
                    <div className="text-sm text-gray-400">{opt.description}</div>
                  </GlassCard>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-8 p-4 glass rounded-xl">
                <h4 className="font-bold text-white mb-2">ملخص خطةك:</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• الهدف: {goals.find(g => g.value === goal)?.label}</li>
                  <li>• المدة: {challengeDays} يوم</li>
                  <li>• ستبدأ رحلتك فور الضغط على "ابدأ التحدي"</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              step === 0
                ? 'text-gray-600 cursor-not-allowed'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <ArrowRight className="w-5 h-5" />
            رجوع
          </button>

          <AnimatedButton onClick={handleNext} disabled={!canProceed()}>
            {step === 2 ? 'ابدأ التحدي' : 'التالي'}
            <ArrowLeft className="w-5 h-5 mr-2" />
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
}
