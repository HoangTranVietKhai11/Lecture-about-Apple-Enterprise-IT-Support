import { create } from 'zustand';
import { Language, Theme, ExamAttemptRecord } from '@/types';

interface AppStoreState {
  language: Language;
  theme: Theme;
  activeChapter: number;
  completedChapters: number[];
  completedMissions: string[];
  masteredTerms: string[];
  chapterNotes: Record<number, string>;
  solvedLabs: string[];
  bestExamPct: number | null;
  examHistory: ExamAttemptRecord[];

  // Actions
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setActiveChapter: (chId: number) => void;
  toggleChapterComplete: (chId: number) => void;
  completeMission: (missionId: string) => void;
  toggleMasteredTerm: (term: string) => void;
  setChapterNote: (chId: number, note: string) => void;
  markLabSolved: (labId: string) => void;
  setBestExamPct: (pct: number) => void;
  recordExamAttempt: (attempt: Omit<ExamAttemptRecord, 'id'>) => void;
  clearExamHistory: () => void;
  resetAllProgress: () => void;
}

const STORAGE_KEY = 'dep110_app_state_v1';

const getInitialState = () => {
  if (typeof window === 'undefined') {
    return {
      language: 'vi' as Language,
      theme: 'light' as Theme,
      activeChapter: 1,
      completedChapters: [],
      completedMissions: [],
      masteredTerms: [],
      chapterNotes: {},
      solvedLabs: [],
      bestExamPct: null,
      examHistory: [],
    };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...parsed,
        examHistory: Array.isArray(parsed.examHistory) ? parsed.examHistory : [],
      };
    }
  } catch (e) {
    // fallback
  }
  return {
    language: 'vi' as Language,
    theme: 'light' as Theme,
    activeChapter: 1,
    completedChapters: [],
    completedMissions: [],
    masteredTerms: [],
    chapterNotes: {},
    solvedLabs: [],
    bestExamPct: null,
    examHistory: [],
  };
};

export const useAppStore = create<AppStoreState>((set, get) => {
  const init = getInitialState();

  const persist = (partial: Partial<AppStoreState>) => {
    if (typeof window !== 'undefined') {
      const current = get();
      const updated = { ...current, ...partial };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  };

  return {
    ...init,

    setLanguage: (language) => {
      set({ language });
      persist({ language });
    },

    toggleLanguage: () => {
      const nextLang = get().language === 'vi' ? 'en' : 'vi';
      set({ language: nextLang });
      persist({ language: nextLang });
    },

    setTheme: (theme) => {
      set({ theme });
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme);
      }
      persist({ theme });
    },

    toggleTheme: () => {
      const nextTheme = get().theme === 'light' ? 'dark' : 'light';
      set({ theme: nextTheme });
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', nextTheme);
      }
      persist({ theme: nextTheme });
    },

    setActiveChapter: (activeChapter) => {
      set({ activeChapter });
      persist({ activeChapter });
    },

    toggleChapterComplete: (chId) => {
      const current = get().completedChapters;
      const next = current.includes(chId)
        ? current.filter((id) => id !== chId)
        : [...current, chId];
      set({ completedChapters: next });
      persist({ completedChapters: next });
    },

    completeMission: (missionId) => {
      const current = get().completedMissions;
      if (!current.includes(missionId)) {
        const next = [...current, missionId];
        set({ completedMissions: next });
        persist({ completedMissions: next });
      }
    },

    toggleMasteredTerm: (term) => {
      const current = get().masteredTerms;
      const next = current.includes(term)
        ? current.filter((t) => t !== term)
        : [...current, term];
      set({ masteredTerms: next });
      persist({ masteredTerms: next });
    },

    setChapterNote: (chId, note) => {
      const notes = { ...get().chapterNotes, [chId]: note };
      set({ chapterNotes: notes });
      persist({ chapterNotes: notes });
    },

    markLabSolved: (labId) => {
      const current = get().solvedLabs;
      if (!current.includes(labId)) {
        const next = [...current, labId];
        set({ solvedLabs: next });
        persist({ solvedLabs: next });
      }
    },

    setBestExamPct: (pct) => {
      const current = get().bestExamPct;
      if (current === null || pct > current) {
        set({ bestExamPct: pct });
        persist({ bestExamPct: pct });
      }
    },

    recordExamAttempt: (attempt) => {
      const id = `att_${Date.now()}`;
      const record: ExamAttemptRecord = { ...attempt, id };
      const current = get().examHistory || [];
      const updated = [record, ...current].slice(0, 50); // keep last 50 attempts
      set({ examHistory: updated });
      persist({ examHistory: updated });

      // Auto update bestExamPct
      get().setBestExamPct(attempt.percentage);
    },

    clearExamHistory: () => {
      set({ examHistory: [] });
      persist({ examHistory: [] });
    },

    resetAllProgress: () => {
      const reset = {
        completedChapters: [],
        completedMissions: [],
        masteredTerms: [],
        chapterNotes: {},
        solvedLabs: [],
        bestExamPct: null,
        examHistory: [],
      };
      set(reset);
      persist(reset);
    },
  };
});
