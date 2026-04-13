import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
export interface Task {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  category: 'daily' | 'challenge';
  completedAt?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  streak: number;
  xp: number;
  level: number;
  status: 'online' | 'offline';
}

export interface AssessmentAnswers {
  dailyHours: string;
  triggerTime: string;
  guiltFeeling: string;
  impactOnLife: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  challengeDays: number;
  goal: string;
  assessmentAnswers: AssessmentAnswers;
  badges: Badge[];
  completedTasks: string[];
  joinedAt: string;
}

interface AppState {
  // User state
  user: User | null;
  isLoggedIn: boolean;
  hasCompletedOnboarding: boolean;
  onboardingStep: number;
  
  // Tasks
  dailyTasks: Task[];
  challengeTasks: Task[];
  
  // Friends
  friends: Friend[];
  
  // UI State
  currentPage: 'landing' | 'dashboard' | 'tasks' | 'friends' | 'games' | 'profile';
  showLoginModal: boolean;
  
  // Actions
  login: (name: string) => void;
  logout: () => void;
  skipLogin: () => void;
  setOnboardingStep: (step: number) => void;
  completeOnboarding: (answers: AssessmentAnswers, goal: string, challengeDays: number) => void;
  
  // Tasks
  completeTask: (taskId: string) => void;
  resetDailyTasks: () => void;
  
  // XP & Level
  addXP: (amount: number) => void;
  updateStreak: () => void;
  
  // Navigation
  setCurrentPage: (page: AppState['currentPage']) => void;
  setShowLoginModal: (show: boolean) => void;
  
  // Friends
  addFriend: (friend: Friend) => void;
}

// Default tasks
const defaultDailyTasks: Task[] = [
  { id: '1', title: 'تجنب فتح TikTok/Reels', description: 'لا تفتح أي منصة فيديو قصير اليوم', xpReward: 50, completed: false, category: 'daily' },
  { id: '2', title: 'قراءة 15 دقيقة', description: 'اقرأ كتاب أو مقال مفيد', xpReward: 30, completed: false, category: 'daily' },
  { id: '3', title: 'ممارسة الرياضة 30 دقيقة', description: 'ممارسة أي نشاط رياضي', xpReward: 40, completed: false, category: 'daily' },
  { id: '4', title: 'التأمل 10 دقائق', description: 'جلسة تأمل وتركيز', xpReward: 25, completed: false, category: 'daily' },
  { id: '5', title: 'التواصل مع صديق', description: 'تواصل حقيقي مع شخص مقرب', xpReward: 20, completed: false, category: 'daily' },
];

const defaultChallengeTasks: Task[] = [
  { id: 'c1', title: 'أسبوع بدون منصات', description: '7 أيام متتالية بدون TikTok أو Reels', xpReward: 500, completed: false, category: 'challenge' },
  { id: 'c2', title: 'شهر من الالتزام', description: '30 يوم متواصل من الالتزام', xpReward: 2000, completed: false, category: 'challenge' },
  { id: 'c3', title: 'إكمال جميع المهام اليومية', description: 'أكمل جميع المهام اليومية لمدة أسبوع', xpReward: 700, completed: false, category: 'challenge' },
];

const defaultBadges: Badge[] = [
  { id: 'b1', name: 'البداية', description: 'أول يوم ناجح', icon: '🎯', unlocked: false },
  { id: 'b2', name: 'الأسبوع الأول', description: '7 أيام متتالية', icon: '🔥', unlocked: false },
  { id: 'b3', name: 'الشهر الأول', description: '30 يوم متتالي', icon: '👑', unlocked: false },
  { id: 'b4', name: 'المحارب', description: 'إكمال كل المهام لمدة أسبوع', icon: '⚔️', unlocked: false },
  { id: 'b5', name: 'القارئ', description: 'قراءة 10 ساعات', icon: '📚', unlocked: false },
  { id: 'b6', name: 'الرياضي', description: 'ممارسة الرياضة 20 مرة', icon: '💪', unlocked: false },
];

const defaultFriends: Friend[] = [
  { id: 'f1', name: 'أحمد محمد', avatar: '👨', streak: 15, xp: 1250, level: 4, status: 'online' },
  { id: 'f2', name: 'سارة علي', avatar: '👩', streak: 22, xp: 2100, level: 5, status: 'online' },
  { id: 'f3', name: 'خالد عبدالله', avatar: '👨', streak: 8, xp: 650, level: 3, status: 'offline' },
  { id: 'f4', name: 'نورة أحمد', avatar: '👩', streak: 30, xp: 3200, level: 5, status: 'online' },
  { id: 'f5', name: 'عمر سعيد', avatar: '👨', streak: 5, xp: 400, level: 2, status: 'offline' },
];

// Helper function to calculate level from XP
function calculateLevel(xp: number): number {
  if (xp >= 1000) return 5;
  if (xp >= 600) return 4;
  if (xp >= 300) return 3;
  if (xp >= 100) return 2;
  return 1;
}

// Helper function to get level name
export function getLevelName(level: number): string {
  const names = {
    1: 'مبتدئ',
    2: 'متحمس',
    3: 'منظم',
    4: 'ملهم',
    5: 'محرر',
  };
  return names[level as keyof typeof names] || 'مبتدئ';
}

// Helper function to get XP needed for next level
export function getXPForNextLevel(level: number): number {
  const thresholds = [100, 300, 600, 1000, Infinity];
  return thresholds[level - 1] || Infinity;
}

// Helper function to get XP progress in current level
export function getXPProgress(xp: number): number {
  const thresholds = [0, 100, 300, 600, 1000];
  const currentLevel = calculateLevel(xp);
  
  if (currentLevel >= 5) return 100;
  
  const currentThreshold = thresholds[currentLevel - 1];
  const nextThreshold = thresholds[currentLevel];
  
  return ((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isLoggedIn: false,
      hasCompletedOnboarding: false,
      onboardingStep: 0,
      dailyTasks: defaultDailyTasks,
      challengeTasks: defaultChallengeTasks,
      friends: defaultFriends,
      currentPage: 'landing',
      showLoginModal: false,

      // Actions
      login: (name: string) => {
        const newUser: User = {
          id: Date.now().toString(),
          name,
          avatar: '👤',
          xp: 0,
          level: 1,
          streak: 0,
          lastActiveDate: new Date().toDateString(),
          challengeDays: 30,
          goal: 'تقليل الاستخدام',
          assessmentAnswers: {
            dailyHours: '',
            triggerTime: '',
            guiltFeeling: '',
            impactOnLife: '',
          },
          badges: defaultBadges,
          completedTasks: [],
          joinedAt: new Date().toISOString(),
        };
        set({ user: newUser, isLoggedIn: true, showLoginModal: false });
      },

      logout: () => {
        set({
          user: null,
          isLoggedIn: false,
          hasCompletedOnboarding: false,
          onboardingStep: 0,
          dailyTasks: defaultDailyTasks,
          challengeTasks: defaultChallengeTasks,
          currentPage: 'landing',
        });
      },

      skipLogin: () => {
        const guestUser: User = {
          id: 'guest-' + Date.now(),
          name: 'زائر',
          avatar: '👤',
          xp: 0,
          level: 1,
          streak: 0,
          lastActiveDate: new Date().toDateString(),
          challengeDays: 30,
          goal: 'تقليل الاستخدام',
          assessmentAnswers: {
            dailyHours: '',
            triggerTime: '',
            guiltFeeling: '',
            impactOnLife: '',
          },
          badges: defaultBadges,
          completedTasks: [],
          joinedAt: new Date().toISOString(),
        };
        set({ user: guestUser, isLoggedIn: true, showLoginModal: false, hasCompletedOnboarding: true });
      },

      setOnboardingStep: (step: number) => set({ onboardingStep: step }),

      completeOnboarding: (answers: AssessmentAnswers, goal: string, challengeDays: number) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              assessmentAnswers: answers,
              goal,
              challengeDays,
            },
            hasCompletedOnboarding: true,
          });
        }
      },

      completeTask: (taskId: string) => {
        const { user, dailyTasks, challengeTasks } = get();
        
        // Find and update the task
        const updatedDailyTasks = dailyTasks.map(task =>
          task.id === taskId ? { ...task, completed: true, completedAt: new Date().toISOString() } : task
        );
        const updatedChallengeTasks = challengeTasks.map(task =>
          task.id === taskId ? { ...task, completed: true, completedAt: new Date().toISOString() } : task
        );

        // Find the completed task to get XP
        const completedTask = [...dailyTasks, ...challengeTasks].find(t => t.id === taskId);
        
        if (completedTask && user) {
          const newXP = user.xp + completedTask.xpReward;
          const newLevel = calculateLevel(newXP);
          
          set({
            dailyTasks: updatedDailyTasks,
            challengeTasks: updatedChallengeTasks,
            user: {
              ...user,
              xp: newXP,
              level: newLevel,
              completedTasks: [...user.completedTasks, taskId],
            },
          });
        }
      },

      resetDailyTasks: () => {
        set({
          dailyTasks: defaultDailyTasks.map(task => ({ ...task, completed: false, completedAt: undefined })),
        });
      },

      addXP: (amount: number) => {
        const { user } = get();
        if (user) {
          const newXP = user.xp + amount;
          const newLevel = calculateLevel(newXP);
          set({
            user: { ...user, xp: newXP, level: newLevel },
          });
        }
      },

      updateStreak: () => {
        const { user } = get();
        if (user) {
          const today = new Date().toDateString();
          const lastActive = user.lastActiveDate;
          
          if (lastActive !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastActive === yesterday.toDateString()) {
              // Continue streak
              set({
                user: { ...user, streak: user.streak + 1, lastActiveDate: today },
              });
            } else if (lastActive !== today) {
              // Streak broken
              set({
                user: { ...user, streak: 1, lastActiveDate: today },
              });
            }
          }
        }
      },

      setCurrentPage: (page) => set({ currentPage: page }),
      setShowLoginModal: (show) => set({ showLoginModal: show }),
      
      addFriend: (friend: Friend) => {
        const { friends } = get();
        if (!friends.some(f => f.id === friend.id)) {
          set({ friends: [...friends, friend] });
        }
      },
    }),
    {
      name: 't3afi-storage',
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        dailyTasks: state.dailyTasks,
        challengeTasks: state.challengeTasks,
      }),
    }
  )
);
