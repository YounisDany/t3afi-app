'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Gift, Award, Sparkles, Lock, CheckCircle, X, Trophy, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { GlassCard } from '@/components/shared/GlassCard';
import { AnimatedButton } from '@/components/shared/AnimatedButton';

const avatarOptions = ['👤', '🧑', '👨', '👩', '🧔', '👱', '👳', '🧕'];
const avatarColors = ['from-green-400 to-teal-500', 'from-teal-500 to-cyan-500', 'from-orange-500 to-yellow-500', 'from-pink-500 to-rose-500'];

const badges = [
  { id: 'b1', name: 'البداية', description: 'أول يوم ناجح', icon: '🎯', unlocked: true },
  { id: 'b2', name: 'الأسبوع الأول', description: '7 أيام متتالية', icon: '🔥', unlocked: false },
  { id: 'b3', name: 'الشهر الأول', description: '30 يوم متتالي', icon: '👑', unlocked: false },
  { id: 'b4', name: 'المحارب', description: 'إكمال كل المهام لمدة أسبوع', icon: '⚔️', unlocked: false },
  { id: 'b5', name: 'القارئ', description: 'قراءة 10 ساعات', icon: '📚', unlocked: false },
  { id: 'b6', name: 'الرياضي', description: 'ممارسة الرياضة 20 مرة', icon: '💪', unlocked: false },
];

// Quiz Questions
const quizQuestions = [
  {
    question: 'ما هي المدة المتوسطة التي يقضيها الشخص العادي على تطبيقات الفيديو القصير يومياً؟',
    options: ['30 دقيقة', 'ساعة واحدة', 'ساعتين', '3 ساعات أو أكثر'],
    correct: 3,
    explanation: 'الدراسات تشير إلى أن متوسط الاستخدام يتجاوز 3 ساعات يومياً!'
  },
  {
    question: 'ما هو التأثير الأكثر شيوعاً لإدمان المقاطع القصيرة؟',
    options: ['تحسن التركيز', 'صعوبة النوم', 'زيادة الإنتاجية', 'تحسن الذاكرة'],
    correct: 1,
    explanation: 'صعوبة النوم من أكثر الآثار شيوعاً بسبب الضوء الأزرق والتحفيز المستمر.'
  },
  {
    question: 'ما هي "الدوبامين لوب" (Dopamine Loop)؟',
    options: ['نوع من التمارين', 'دورة المكافأة في الدماغ', 'تطبيق مشهور', 'نوع من الفيديوهات'],
    correct: 1,
    explanation: 'الدوبامين لوب هي دورة تجعل الدماغ يطلب المزيد من المحتوى للحصول على نفس الشعور.'
  },
  {
    question: 'كم عدد الساعات التي يمكن توفيرها شهرياً بتقليل الاستخدام ساعتين يومياً؟',
    options: ['30 ساعة', '40 ساعة', '60 ساعة', '80 ساعة'],
    correct: 2,
    explanation: 'ساعتين × 30 يوم = 60 ساعة! هذا يعادل وقت كافٍ لتعلم مهارة جديدة.'
  },
  {
    question: 'ما هي أفضل طريقة للتغلب على إدمان السكرول؟',
    options: ['حذف التطبيقات فوراً', 'الاستمرار بالمشاهدة', 'التدرج في التقليل', 'تجاهل المشكلة'],
    correct: 2,
    explanation: 'التدرج في التقليل هو الأسلوب الأكثر فعالية واستدامة.'
  },
];

export function GamesPage() {
  const { user, addXP } = useAppStore();
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || '👤');
  const [selectedColor, setSelectedColor] = useState(0);
  const [dailyGiftClaimed, setDailyGiftClaimed] = useState(false);
  
  // Quiz Game State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setGameFinished(true);
      // Award XP based on score
      const earnedXP = score * 10;
      addXP(earnedXP);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setGameFinished(false);
  };

  const startGame = () => {
    setIsPlaying(true);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setGameFinished(false);
  };

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
                dailyGiftClaimed ? 'bg-gray-700' : 'bg-green-500/20 animate-pulse'
              }`}>
                <Gift className={`w-8 h-8 ${dailyGiftClaimed ? 'text-gray-500' : 'text-green-400'}`} />
              </div>
              <div className="flex-1 text-right">
                <h3 className="font-bold text-white">الهدايا اليومية</h3>
                <p className="text-sm text-gray-400">
                  {dailyGiftClaimed ? 'تم استلام الهدية اليوم!' : 'هديتك اليومية تنتظرك!'}
                </p>
              </div>
              <AnimatedButton
                onClick={() => {
                  setDailyGiftClaimed(true);
                  addXP(15);
                }}
                disabled={dailyGiftClaimed}
                size="sm"
                variant={dailyGiftClaimed ? 'outline' : 'accent'}
              >
                {dailyGiftClaimed ? 'تم ✓' : 'استلام +15 XP'}
              </AnimatedButton>
            </div>
          </GlassCard>
        </motion.div>

        {/* Main Game - Quiz */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Gamepad2 className="w-5 h-5 text-green-400" />
            <h2 className="text-lg font-bold text-white">اختبار الوعي</h2>
            <span className="text-green-400 text-sm mr-auto">+{score * 10} XP</span>
          </div>

          <AnimatePresence mode="wait">
            {!isPlaying ? (
              <motion.div
                key="intro"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <GlassCard glow="green" className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-4xl mx-auto mb-4">
                    🧠
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">اختبر معلوماتك</h3>
                  <p className="text-gray-400 mb-4">
                    أجب على 5 أسئلة عن آثار إدمان المقاطع القصيرة واكسب نقاط XP
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mb-6">
                    <span>📝 {quizQuestions.length} أسئلة</span>
                    <span>⏱️ وقت مفتوح</span>
                    <span>⭐ {quizQuestions.length * 10} XP</span>
                  </div>
                  <AnimatedButton onClick={startGame} size="lg">
                    ابدأ اللعب 🎮
                  </AnimatedButton>
                </GlassCard>
              </motion.div>
            ) : gameFinished ? (
              <motion.div
                key="finished"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <GlassCard className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-5xl mx-auto mb-4">
                    <Trophy className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">أحسنت! 🎉</h3>
                  <p className="text-gray-400 mb-4">
                    حصلت على {score} من {quizQuestions.length} إجابات صحيحة
                  </p>
                  <div className="bg-green-500/20 rounded-xl p-4 mb-6">
                    <p className="text-green-400 text-xl font-bold">
                      +{score * 10} نقطة XP
                    </p>
                    <p className="text-gray-400 text-sm">تم إضافتها إلى رصيدك</p>
                  </div>
                  <div className="flex gap-3">
                    <AnimatedButton onClick={restartGame} variant="outline" className="flex-1">
                      <RotateCcw className="w-4 h-4 ml-2" />
                      العب مجدداً
                    </AnimatedButton>
                    <AnimatedButton onClick={() => setIsPlaying(false)} className="flex-1">
                      إنهاء
                    </AnimatedButton>
                  </div>
                </GlassCard>
              </motion.div>
            ) : (
              <motion.div
                key="playing"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <GlassCard>
                  {/* Progress */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-400">
                      السؤال {currentQuestion + 1} من {quizQuestions.length}
                    </span>
                    <span className="text-sm text-green-400">
                      النقاط: {score * 10} XP
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-gray-700 rounded-full mb-6">
                    <div 
                      className="h-full gradient-primary rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>

                  {/* Question */}
                  <h3 className="text-lg font-bold text-white mb-6 text-center">
                    {quizQuestions[currentQuestion].question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((option, index) => {
                      const isSelected = selectedAnswer === index;
                      const isCorrect = index === quizQuestions[currentQuestion].correct;
                      const showResult = selectedAnswer !== null;
                      
                      let buttonClass = 'bg-white/5 hover:bg-white/10 border border-transparent';
                      if (showResult) {
                        if (isCorrect) {
                          buttonClass = 'bg-green-500/20 border-green-400 border-2';
                        } else if (isSelected && !isCorrect) {
                          buttonClass = 'bg-red-500/20 border-red-400 border-2';
                        }
                      }
                      
                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswer(index)}
                          disabled={selectedAnswer !== null}
                          className={`w-full p-4 rounded-xl text-right transition-all ${buttonClass}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              showResult && isCorrect ? 'bg-green-500 text-white' :
                              showResult && isSelected && !isCorrect ? 'bg-red-500 text-white' :
                              'bg-gray-700 text-gray-300'
                            }`}>
                              {showResult && isCorrect ? '✓' : 
                               showResult && isSelected && !isCorrect ? '✗' : 
                               index + 1}
                            </span>
                            <span className="text-white">{option}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <AnimatePresence>
                    {showExplanation && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4"
                      >
                        <div className={`p-4 rounded-xl ${
                          selectedAnswer === quizQuestions[currentQuestion].correct 
                            ? 'bg-green-500/10 border border-green-500/30' 
                            : 'bg-orange-500/10 border border-orange-500/30'
                        }`}>
                          <p className={`text-sm ${
                            selectedAnswer === quizQuestions[currentQuestion].correct 
                              ? 'text-green-400' 
                              : 'text-orange-400'
                          }`}>
                            💡 {quizQuestions[currentQuestion].explanation}
                          </p>
                        </div>
                        <AnimatedButton 
                          onClick={nextQuestion} 
                          fullWidth 
                          className="mt-4"
                        >
                          {currentQuestion < quizQuestions.length - 1 ? 'السؤال التالي' : 'عرض النتيجة'}
                        </AnimatedButton>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Avatar Customization */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-green-400" />
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
                        ? 'bg-green-500/30 ring-2 ring-green-400'
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
                    <CheckCircle className="w-4 h-4 text-green-400 mx-auto mt-2" />
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
