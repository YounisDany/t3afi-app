'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { Navbar } from '@/components/shared/Navbar';
import { TabBar } from '@/components/shared/TabBar';
import { LoginModal } from '@/components/shared/LoginModal';

// Landing Components
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Motivation } from '@/components/landing/Motivation';
import { CTA } from '@/components/landing/CTA';
import { Footer } from '@/components/landing/Footer';

// Onboarding
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';

// Dashboard Pages
import { Dashboard } from '@/components/dashboard/Dashboard';
import { TasksPage } from '@/components/dashboard/TasksPage';
import { FriendsPage } from '@/components/dashboard/FriendsPage';
import { GamesPage } from '@/components/dashboard/GamesPage';
import { ProfilePage } from '@/components/dashboard/ProfilePage';

export default function Home() {
  const { 
    isLoggedIn, 
    hasCompletedOnboarding, 
    currentPage, 
    showLoginModal, 
    setShowLoginModal 
  } = useAppStore();

  // Show Landing Page for non-logged in users
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar onStartClick={() => setShowLoginModal(true)} />
        <Hero onStartClick={() => setShowLoginModal(true)} />
        <Features />
        <HowItWorks />
        <Motivation />
        <CTA onStartClick={() => setShowLoginModal(true)} />
        <Footer />
        <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      </div>
    );
  }

  // Show Onboarding for logged in users who haven't completed it
  if (!hasCompletedOnboarding) {
    return (
      <div className="min-h-screen bg-background">
        <OnboardingFlow />
      </div>
    );
  }

  // Show Main App
  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {currentPage === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Dashboard />
          </motion.div>
        )}

        {currentPage === 'tasks' && (
          <motion.div
            key="tasks"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <TasksPage />
          </motion.div>
        )}

        {currentPage === 'friends' && (
          <motion.div
            key="friends"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <FriendsPage />
          </motion.div>
        )}

        {currentPage === 'games' && (
          <motion.div
            key="games"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <GamesPage />
          </motion.div>
        )}

        {currentPage === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <ProfilePage />
          </motion.div>
        )}
      </AnimatePresence>

      <TabBar />
    </div>
  );
}
