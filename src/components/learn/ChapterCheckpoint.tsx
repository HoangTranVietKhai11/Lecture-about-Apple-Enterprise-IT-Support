'use client';

import React, { useState } from 'react';
import { CheckpointQuestion } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import { useMentorStore } from '@/store/useMentorStore';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

interface ChapterCheckpointProps {
  chapterId: number;
  questions: CheckpointQuestion[];
}

export const ChapterCheckpoint: React.FC<ChapterCheckpointProps> = ({ chapterId, questions }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const { language, toggleChapterComplete, completedChapters } = useAppStore();
  const { openWithContext } = useMentorStore();
  const isVi = language === 'vi';

  if (!questions || questions.length === 0) {
    return (
      <div className="p-5 bg-card border border-border rounded-lg text-center text-xs text-secondary">
        {isVi ? 'Chưa có câu hỏi checkpoint cho chương này.' : 'No checkpoint questions for this chapter.'}
      </div>
    );
  }

  const q = questions[currentIdx];
  const picked = selectedAnswers[currentIdx];
  const isAnswered = typeof picked === 'number';
  const isCorrect = isAnswered && picked === q.ans;
  const isChapterCompleted = completedChapters.includes(chapterId);

  const letters = ['A', 'B', 'C', 'D'];

  const handlePickOption = (optIdx: number) => {
    if (isAnswered) return;
    const updated = { ...selectedAnswers, [currentIdx]: optIdx };
    setSelectedAnswers(updated);

    // If all questions are answered, check if we should auto-complete the chapter
    const allDone = questions.every((_, idx) => typeof updated[idx] === 'number');
    if (allDone && !isChapterCompleted) {
      toggleChapterComplete(chapterId);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
  };

  return (
    <div className="flex flex-col gap-4 bg-card border border-border rounded-lg p-4 max-w-3xl">
      <div className="flex justify-between items-center pb-2.5 border-b border-border">
        <span className="text-[11px] font-semibold font-mono text-secondary uppercase tracking-wider">
          {isVi
            ? `Checkpoint Mini-Quiz • Câu ${currentIdx + 1} / ${questions.length}`
            : `Checkpoint Mini-Quiz • Question ${currentIdx + 1} / ${questions.length}`}
        </span>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-secondary hover:text-foreground"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{isVi ? 'Làm lại' : 'Reset'}</span>
        </button>
      </div>

      <h3 className="text-[15px] font-semibold text-foreground leading-snug">
        {q.q}
      </h3>

      <div className="flex flex-col gap-2">
        {q.opts.map((opt, idx) => {
          let btnClass = 'border-border bg-card hover:bg-surface-high text-foreground';
          let letterClass = 'bg-sidebar text-secondary border border-border';

          if (isAnswered) {
            if (idx === q.ans) {
              btnClass = 'border-positive/40 bg-positive/10 text-foreground font-medium';
              letterClass = 'bg-positive text-white border-positive';
            } else if (idx === picked) {
              btnClass = 'border-error/40 bg-error/10 text-foreground';
              letterClass = 'bg-error text-white border-error';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={isAnswered}
              onClick={() => handlePickOption(idx)}
              className={`flex items-start gap-3 w-full p-3 rounded-md border text-left text-xs transition-colors ${btnClass}`}
            >
              <span
                className={`w-5 h-5 rounded flex items-center justify-center font-mono font-bold text-[11px] flex-shrink-0 ${letterClass}`}
              >
                {letters[idx]}
              </span>
              <span className="flex-1 pt-0.5 leading-relaxed">{opt}</span>
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div
          className={`p-3 rounded-md border text-xs flex flex-col gap-1 ${
            isCorrect
              ? 'border-border border-l-4 border-l-positive bg-card'
              : 'border-border border-l-4 border-l-error bg-card'
          }`}
        >
          <div className="flex items-center gap-1.5 font-semibold">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-positive" />
                <span className="text-positive">{isVi ? 'Chính xác' : 'Correct'}</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-error" />
                <span className="text-error">
                  {isVi ? `Chưa chính xác (Đáp án đúng: ${letters[q.ans]})` : `Incorrect (Correct: ${letters[q.ans]})`}
                </span>
              </>
            )}
          </div>
          <p className="text-secondary leading-relaxed pl-5">{q.exp}</p>
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={() => {
                openWithContext({
                  question: q.q,
                  userSelected: `${letters[picked]}: ${q.opts[picked]}`,
                  correctAnswer: `${letters[q.ans]}: ${q.opts[q.ans]}`,
                  context: `Chương ${chapterId} Checkpoint`,
                });
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 text-[11px] font-medium transition-colors"
            >
              <Sparkles className="w-3 h-3" />
              <span>{isVi ? 'Hỏi Apple Mentor giải thích sâu hơn' : 'Ask Apple Mentor for In-depth Rationale'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-2 border-t border-border">
        <button
          type="button"
          disabled={currentIdx === 0}
          onClick={() => setCurrentIdx((c) => Math.max(0, c - 1))}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-border bg-card text-xs font-medium text-secondary hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isVi ? 'Câu trước' : 'Previous'}</span>
        </button>

        <span className="text-[11px] font-mono text-secondary">
          {currentIdx + 1} / {questions.length}
        </span>

        <button
          type="button"
          disabled={currentIdx === questions.length - 1}
          onClick={() => setCurrentIdx((c) => Math.min(questions.length - 1, c + 1))}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-primary text-white text-xs font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <span>{isVi ? 'Câu sau' : 'Next'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
