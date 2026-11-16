import { create } from 'zustand';
import { ExamMode, ExamQuestion, ExamSessionState } from '@/types';
import { EXAM_BANK } from '@/data/exam-bank';
import { useAppStore } from './useAppStore';

interface ExamStoreState {
  session: ExamSessionState;
  timerIntervalId: NodeJS.Timeout | null;
  lastFailedQuestions: ExamQuestion[];

  // Actions
  startExam: (mode: ExamMode, customPool?: ExamQuestion[], customTitle?: string) => void;
  selectAnswer: (qIdx: number, optIdx: number) => void;
  toggleFlag: (qIdx: number) => void;
  jumpQuestion: (qIdx: number) => void;
  tickTimer: () => void;
  finishExam: () => void;
  resetExam: () => void;
  retryFailedQuestions: () => void;
}

const shuffle = <T>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const initialSession: ExamSessionState = {
  started: false,
  finished: false,
  mode: 'TIMED',
  questions: [],
  currentIdx: 0,
  answers: {},
  flagged: [],
  secondsLeft: 3600,
};

export const useExamStore = create<ExamStoreState>((set, get) => ({
  session: initialSession,
  timerIntervalId: null,
  lastFailedQuestions: [],

  startExam: (mode, customPool, customTitle) => {
    // Clear previous timer if any
    const existingTimer = get().timerIntervalId;
    if (existingTimer) clearInterval(existingTimer);

    let pool: ExamQuestion[] = [];
    if (customPool && customPool.length > 0) {
      pool = [...customPool];
    } else if (mode === 'TIMED') {
      // Pick 60 random questions from 120 questions bank
      const shuffled = shuffle(EXAM_BANK);
      pool = shuffled.slice(0, 60);
    } else {
      pool = shuffle(EXAM_BANK);
    }

    const newSession: ExamSessionState = {
      started: true,
      finished: false,
      mode,
      questions: pool,
      currentIdx: 0,
      answers: {},
      flagged: [],
      secondsLeft: mode === 'TIMED' ? 3600 : 1800,
      title: customTitle || (mode === 'TIMED' ? 'THI THỬ PEARSON VUE (60 CÂU / 60 PHÚT)' : 'LUYỆN TẬP CHUYÊN SÂU'),
      startedAt: new Date().toISOString(),
    };

    set({ session: newSession });

    if (mode === 'TIMED') {
      const timer = setInterval(() => {
        get().tickTimer();
      }, 1000);
      set({ timerIntervalId: timer });
    }
  },

  selectAnswer: (qIdx, optIdx) => {
    const { session } = get();
    if (session.finished) return;
    const answers = { ...session.answers, [qIdx]: optIdx };
    set({ session: { ...session, answers } });
  },

  toggleFlag: (qIdx) => {
    const { session } = get();
    const flagged = session.flagged.includes(qIdx)
      ? session.flagged.filter((i) => i !== qIdx)
      : [...session.flagged, qIdx];
    set({ session: { ...session, flagged } });
  },

  jumpQuestion: (qIdx) => {
    const { session } = get();
    if (qIdx >= 0 && qIdx < session.questions.length) {
      set({ session: { ...session, currentIdx: qIdx } });
    }
  },

  tickTimer: () => {
    const { session, timerIntervalId } = get();
    if (!session.started || session.finished) {
      if (timerIntervalId) clearInterval(timerIntervalId);
      return;
    }
    const nextSec = Math.max(0, session.secondsLeft - 1);
    if (nextSec === 0) {
      get().finishExam();
    } else {
      set({ session: { ...session, secondsLeft: nextSec } });
    }
  },

  finishExam: () => {
    const { session, timerIntervalId } = get();
    if (timerIntervalId) clearInterval(timerIntervalId);

    let correct = 0;
    const failed: ExamQuestion[] = [];

    session.questions.forEach((q, idx) => {
      if (session.answers[idx] === q.ans) {
        correct++;
      } else {
        failed.push(q);
      }
    });

    const total = session.questions.length;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    const passed = percentage >= 75;

    const initialSeconds = session.mode === 'TIMED' ? 3600 : 1800;
    const timeSpentSeconds = Math.max(1, initialSeconds - session.secondsLeft);

    // Save to attempt history in useAppStore
    useAppStore.getState().recordExamAttempt({
      date: new Date().toISOString(),
      mode: session.mode,
      title: session.title || 'DEP110 Exam',
      score: correct,
      totalQuestions: total,
      percentage,
      passed,
      timeSpentSeconds,
    });

    set({
      session: {
        ...session,
        finished: true,
        score: correct,
        percentage,
        passed,
      },
      lastFailedQuestions: failed,
      timerIntervalId: null,
    });
  },

  resetExam: () => {
    const { timerIntervalId } = get();
    if (timerIntervalId) clearInterval(timerIntervalId);
    set({ session: initialSession, timerIntervalId: null });
  },

  retryFailedQuestions: () => {
    const { lastFailedQuestions } = get();
    if (lastFailedQuestions.length === 0) return;
    get().startExam(
      'PRACTICE',
      shuffle(lastFailedQuestions),
      `LUYỆN TẬP LẠI ${lastFailedQuestions.length} CÂU TRẢ LỜI SAI`
    );
  },
}));
