'use client';

import { motion } from 'framer-motion';
import { Settings, LogOut, Bell, Moon, Globe, Shield, HelpCircle, ChevronLeft, FileText, Phone, Lock } from 'lucide-react';
import { useState } from 'react';
import { useAppStore, getLevelName, getXPProgress } from '@/lib/store';
import { GlassCard } from '@/components/shared/GlassCard';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { TermsModal } from '@/components/legal/TermsModal';
import { PrivacyModal } from '@/components/legal/PrivacyModal';

export function ProfilePage() {
  const { user, logout, setCurrentPage } = useAppStore();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [arabicLang, setArabicLang] = useState(true);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  if (!user) return null;

  const progress = getXPProgress(user.xp);
  const levelName = getLevelName(user.level);

  const handleLogout = () => {
    logout();
    setCurrentPage('landing');
  };

  return (
    <div className="pb-24 pt-4 px-4">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center text-5xl">
              {user.avatar}
            </div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center font-bold text-white border-4 border-background">
              {user.level}
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-white mt-4">{user.name}</h1>
          <p className="text-gray-400">{levelName}</p>
          
          {/* XP Progress */}
          <div className="mt-4 max-w-xs mx-auto">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-400">{user.xp} XP</span>
              <span className="text-green-400">المستوى التالي</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard>
            <div className="grid grid-cols-3 divide-x divide-gray-700/50 text-center">
              <div className="py-2">
                <div className="text-2xl font-bold text-white">{user.streak}</div>
                <div className="text-xs text-gray-400">أيام متتالية</div>
              </div>
              <div className="py-2">
                <div className="text-2xl font-bold text-white">{user.completedTasks.length}</div>
                <div className="text-xs text-gray-400">مهمة مكتملة</div>
              </div>
              <div className="py-2">
                <div className="text-2xl font-bold text-white">{user.xp}</div>
                <div className="text-xs text-gray-400">نقطة XP</div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Goal & Challenge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard>
            <h2 className="font-bold text-white mb-3">خطتي</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">الهدف:</span>
                <span className="text-white">{user.goal}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">مدة التحدي:</span>
                <span className="text-white">{user.challengeDays} يوم</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">تاريخ الانضمام:</span>
                <span className="text-white">{new Date(user.joinedAt).toLocaleDateString('ar-SA')}</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Settings Menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard className="p-0">
            <div className="divide-y divide-gray-700/50">
              {/* Notifications */}
              <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <span className="text-white">الإشعارات</span>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>

              {/* Dark Mode */}
              <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5 text-gray-400" />
                  <span className="text-white">الوضع الداكن</span>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>

              {/* Language */}
              <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <span className="text-white">اللغة العربية</span>
                </div>
                <Switch checked={arabicLang} onCheckedChange={setArabicLang} />
              </div>

              {/* Help */}
              <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                  <span className="text-white">المساعدة</span>
                </div>
                <ChevronLeft className="w-5 h-5 text-gray-500" />
              </div>

              {/* Settings */}
              <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-gray-400" />
                  <span className="text-white">الإعدادات</span>
                </div>
                <ChevronLeft className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Legal & Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <GlassCard className="p-0">
            <div className="divide-y divide-gray-700/50">
              {/* Phone */}
              <div 
                className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() => setShowPhone(!showPhone)}
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-400" />
                  <span className="text-white">تواصل معنا</span>
                </div>
                {showPhone ? (
                  <span className="text-green-400 font-bold">0563494180</span>
                ) : (
                  <ChevronLeft className="w-5 h-5 text-gray-500" />
                )}
              </div>

              {/* Terms */}
              <div 
                className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() => setShowTerms(true)}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-teal-400" />
                  <span className="text-white">الشروط والأحكام</span>
                </div>
                <ChevronLeft className="w-5 h-5 text-gray-500" />
              </div>

              {/* Privacy */}
              <div 
                className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() => setShowPrivacy(true)}
              >
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-orange-400" />
                  <span className="text-white">سياسة الخصوصية</span>
                </div>
                <ChevronLeft className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">تسجيل الخروج</span>
          </button>
        </motion.div>

        {/* App Version */}
        <div className="text-center text-sm text-gray-500">
          تعافي v1.0.0
        </div>
      </div>

      {/* Terms Modal */}
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
      
      {/* Privacy Modal */}
      <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </div>
  );
}
