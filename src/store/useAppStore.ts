import { create } from 'zustand';
import { Language, Theme, ExamAttemptRecord, SyncPayload, SyncMode } from '@/types';

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
  syncPasskey: string;
  lastSyncedAt: string | null;
  syncModalOpen: boolean;

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
  setSyncModalOpen: (open: boolean) => void;
  setSyncPasskey: (key: string) => void;
  exportSyncPayload: () => SyncPayload;
  applySyncPayload: (payload: SyncPayload, mode: SyncMode) => void;
}

const STORAGE_KEY = 'dep110_app_state_v1';

const getInitialState = () => {
  const defaults = {
    language: 'vi' as Language,
    theme: 'light' as Theme,
    activeChapter: 1,
    completedChapters: [] as number[],
    completedMissions: [] as string[],
    masteredTerms: [] as string[],
    chapterNotes: {} as Record<number, string>,
    solvedLabs: [] as string[],
    bestExamPct: null as number | null,
    examHistory: [] as ExamAttemptRecord[],
    syncPasskey: '',
    lastSyncedAt: null as string | null,
    syncModalOpen: false,
  };

  if (typeof window === 'undefined') {
    return defaults;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...defaults,
        ...parsed,
        examHistory: Array.isArray(parsed.examHistory) ? parsed.examHistory : [],
        syncPasskey: typeof parsed.syncPasskey === 'string' ? parsed.syncPasskey : '',
        lastSyncedAt: typeof parsed.lastSyncedAt === 'string' ? parsed.lastSyncedAt : null,
        syncModalOpen: false,
      };
    }
  } catch {
    // Fallback to default state if localStorage JSON is corrupted or blocked
  }
  return defaults;
};

export const useAppStore = create<AppStoreState>((set, get) => {
  const init = getInitialState();

  const persist = (partial: Partial<AppStoreState>) => {
    if (typeof window !== 'undefined') {
      const current = get();
      const merged = { ...current, ...partial };
      const serializable = {
        language: merged.language,
        theme: merged.theme,
        activeChapter: merged.activeChapter,
        completedChapters: merged.completedChapters,
        completedMissions: merged.completedMissions,
        masteredTerms: merged.masteredTerms,
        chapterNotes: merged.chapterNotes,
        solvedLabs: merged.solvedLabs,
        bestExamPct: merged.bestExamPct,
        examHistory: merged.examHistory,
        syncPasskey: merged.syncPasskey,
        lastSyncedAt: merged.lastSyncedAt,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
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
      const updated = [record, ...current].slice(0, 50);
      set({ examHistory: updated });
      persist({ examHistory: updated });
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

    setSyncModalOpen: (syncModalOpen) => {
      set({ syncModalOpen });
    },

    setSyncPasskey: (syncPasskey) => {
      set({ syncPasskey });
      persist({ syncPasskey });
    },

    exportSyncPayload: () => {
      const s = get();
      return {
        version: 1,
        exportedAt: new Date().toISOString(),
        completedChapters: s.completedChapters,
        completedMissions: s.completedMissions,
        masteredTerms: s.masteredTerms,
        chapterNotes: s.chapterNotes,
        solvedLabs: s.solvedLabs,
        bestExamPct: s.bestExamPct,
        examHistory: s.examHistory,
      };
    },

    applySyncPayload: (payload, mode) => {
      const nowIso = new Date().toISOString();
      if (mode === 'REPLACE') {
        const replaced = {
          completedChapters: [...payload.completedChapters].sort((a, b) => a - b),
          completedMissions: [...payload.completedMissions],
          masteredTerms: [...payload.masteredTerms],
          chapterNotes: { ...payload.chapterNotes },
          solvedLabs: [...payload.solvedLabs],
          bestExamPct: payload.bestExamPct,
          examHistory: [...payload.examHistory],
          lastSyncedAt: nowIso,
        };
        set(replaced);
        persist(replaced);
        return;
      }

      // Smart MERGE: union of progress without losing work from either device
      const cur = get();
      const completedChapters = Array.from(
        new Set([...cur.completedChapters, ...payload.completedChapters])
      ).sort((a, b) => a - b);
      const completedMissions = Array.from(
        new Set([...cur.completedMissions, ...payload.completedMissions])
      );
      const masteredTerms = Array.from(
        new Set([...cur.masteredTerms, ...payload.masteredTerms])
      );
      const solvedLabs = Array.from(
        new Set([...cur.solvedLabs, ...payload.solvedLabs])
      );

      const chapterNotes: Record<number, string> = { ...cur.chapterNotes };
      for (const [keyStr, incomingVal] of Object.entries(payload.chapterNotes)) {
        const chId = Number(keyStr);
        const existingVal = chapterNotes[chId];
        if (!existingVal || !existingVal.trim()) {
          chapterNotes[chId] = incomingVal;
        } else if (incomingVal.trim() && existingVal.trim() !== incomingVal.trim()) {
          if (incomingVal.includes(existingVal.trim())) {
            chapterNotes[chId] = incomingVal;
          } else if (!existingVal.includes(incomingVal.trim())) {
            chapterNotes[chId] = `${existingVal.trim()}\n\n---\n\n${incomingVal.trim()}`;
          }
        }
      }

      const historyMap = new Map<string, ExamAttemptRecord>();
      for (const item of [...cur.examHistory, ...payload.examHistory]) {
        const dedupeKey = `${item.id}_${item.date}`;
        if (!historyMap.has(dedupeKey)) {
          historyMap.set(dedupeKey, item);
        }
      }
      const examHistory = Array.from(historyMap.values())
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 50);

      const candidates = [
        cur.bestExamPct,
        payload.bestExamPct,
        ...examHistory.map((h) => h.percentage),
      ].filter((v): v is number => typeof v === 'number');
      const bestExamPct = candidates.length > 0 ? Math.max(...candidates) : null;

      const merged = {
        completedChapters,
        completedMissions,
        masteredTerms,
        chapterNotes,
        solvedLabs,
        bestExamPct,
        examHistory,
        lastSyncedAt: nowIso,
      };
      set(merged);
      persist(merged);
    },
  };
});
